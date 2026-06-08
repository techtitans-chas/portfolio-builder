import { eq, sql } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import sanitizeHtml from 'sanitize-html';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { users, appStorage, media } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest, forbidden } from '../../utils/errorHandling.js';
import sharp from 'sharp';
import {
  uploadToR2,
  MAX_FILE_SIZE,
  USER_STORAGE_LIMIT,
  APP_STORAGE_LIMIT,
  r2,
} from '../../lib/r2.js';

// ---------------------------------------------------------------------------
// Allowed MIME types
// ---------------------------------------------------------------------------

const ALLOWED_MIME_TYPES = [
  // Images
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  // Documents
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  // Spreadsheets
  'application/vnd.ms-excel', // .xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'text/csv',
  'text/plain',
] as const;

type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

const MIME_EXTENSIONS: Record<AllowedMimeType, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'text/csv': 'csv',
  'text/plain': 'txt',
};

const CONVERTIBLE_TO_WEBP = new Set(['image/jpeg', 'image/png']);

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB post-conversion limit for raster images

// ---------------------------------------------------------------------------
// Magic byte signatures — verify the buffer actually matches the declared type
// ---------------------------------------------------------------------------

type MagicCheck = (buf: Buffer) => boolean;

const MAGIC: Partial<Record<AllowedMimeType, MagicCheck>> = {
  'image/jpeg': b => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  'image/png': b => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  'image/gif': b => b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46,
  'image/webp': b =>
    b[0] === 0x52 &&
    b[1] === 0x49 &&
    b[2] === 0x46 &&
    b[3] === 0x46 &&
    b[8] === 0x57 &&
    b[9] === 0x45 &&
    b[10] === 0x42 &&
    b[11] === 0x50,
  'application/pdf': b => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46,
  // Office Open XML (.docx, .xlsx) and legacy Office (.doc, .xls) are zip/OLE2 containers —
  // we verify the container signature and trust the declared sub-type.
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': b =>
    b[0] === 0x50 && b[1] === 0x4b, // ZIP
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': b =>
    b[0] === 0x50 && b[1] === 0x4b, // ZIP
  'application/msword': b => b[0] === 0xd0 && b[1] === 0xcf && b[2] === 0x11 && b[3] === 0xe0, // OLE2
  'application/vnd.ms-excel': b => b[0] === 0xd0 && b[1] === 0xcf && b[2] === 0x11 && b[3] === 0xe0, // OLE2
  // SVG, CSV, TXT are text — no reliable magic bytes, skip check.
};

function checkMagicBytes(mimeType: AllowedMimeType, buf: Buffer): boolean {
  const check = MAGIC[mimeType];
  return check ? check(buf) : true; // no signature defined → pass
}

// ---------------------------------------------------------------------------
// SVG sanitisation — strip scripts and event handlers before storing
// ---------------------------------------------------------------------------

function sanitizeSvg(input: Buffer): Buffer {
  const cleaned = sanitizeHtml(input.toString('utf8'), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'svg',
      'path',
      'circle',
      'ellipse',
      'line',
      'polyline',
      'polygon',
      'rect',
      'text',
      'tspan',
      'g',
      'defs',
      'symbol',
      'use',
      'image',
      'linearGradient',
      'radialGradient',
      'stop',
      'clipPath',
      'mask',
      'filter',
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feFlood',
      'feGaussianBlur',
      'feImage',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'feSpecularLighting',
      'feTile',
      'feTurbulence',
      'title',
      'desc',
    ]),
    allowedAttributes: {
      '*': [
        'id',
        'class',
        'style',
        'fill',
        'fill-opacity',
        'fill-rule',
        'stroke',
        'stroke-width',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-dasharray',
        'stroke-opacity',
        'opacity',
        'transform',
        'clip-path',
        'mask',
        'filter',
        'd',
        'cx',
        'cy',
        'r',
        'rx',
        'ry',
        'x',
        'y',
        'x1',
        'y1',
        'x2',
        'y2',
        'width',
        'height',
        'viewBox',
        'preserveAspectRatio',
        'xmlns',
        'xmlns:xlink',
        'xlink:href',
        'href',
        'points',
        'offset',
        'stdDeviation',
        'result',
        'in',
        'in2',
        'mode',
        'type',
        'values',
        'gradientUnits',
        'gradientTransform',
        'patternUnits',
        'patternTransform',
        'clipPathUnits',
        'maskUnits',
        'font-size',
        'font-family',
        'font-weight',
        'text-anchor',
        'dominant-baseline',
        'letter-spacing',
      ],
    },
    // Drop everything not on the allowlist — this removes <script>, event attrs, etc.
    disallowedTagsMode: 'discard',
  });
  return Buffer.from(cleaned, 'utf8');
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export const mediaPost = factory.createHandlers(async c => {
  if (!r2) throw forbidden('File storage is not configured');

  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) throw unauthorized();

  const formData = await c.req.formData();
  const file = formData.get('file');
  const purpose = formData.get('purpose');

  if (!file || !(file instanceof File)) {
    throw badRequest('No file provided — send a multipart field named "file"');
  }

  const mimeType = file.type as AllowedMimeType;
  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)) {
    throw badRequest(
      `Unsupported file type "${mimeType}". Allowed: images (jpg, png, gif, webp, svg), ` +
        `documents (pdf, doc, docx), spreadsheets (xls, xlsx, csv), and plain text.`,
    );
  }

  const rawBuffer = Buffer.from(await file.arrayBuffer());
  if (rawBuffer.byteLength > MAX_FILE_SIZE) {
    throw badRequest(
      `File too large (${(rawBuffer.byteLength / 1024 / 1024).toFixed(1)} MB). Maximum size is 10 MB.`,
    );
  }

  // Verify magic bytes match the declared MIME type
  if (!checkMagicBytes(mimeType, rawBuffer)) {
    throw badRequest(
      `File content does not match the declared type "${mimeType}". ` +
        `Please upload a valid file.`,
    );
  }

  const [user] = await db
    .select({ storageBytesUsed: users.storageBytesUsed })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) throw notFound('User not found');

  const projectedUserUsage = user.storageBytesUsed + rawBuffer.byteLength;
  if (projectedUserUsage > USER_STORAGE_LIMIT) {
    throw forbidden(
      `Upload would exceed your personal storage limit of 25 MB. ` +
        `You are currently using ${(user.storageBytesUsed / 1024 / 1024).toFixed(1)} MB.`,
    );
  }

  const [appStorageRow] = await db.select().from(appStorage).where(eq(appStorage.id, 1));
  const currentAppTotal = appStorageRow?.totalBytesUsed ?? 0;
  if (currentAppTotal + rawBuffer.byteLength > APP_STORAGE_LIMIT) {
    throw forbidden('The application storage limit has been reached. Please contact support.');
  }

  // Process the buffer: convert raster images to WebP, sanitise SVGs, pass the rest through.
  let buffer: Buffer;
  let storedMimeType: string;

  if (CONVERTIBLE_TO_WEBP.has(mimeType)) {
    buffer = await sharp(rawBuffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    storedMimeType = 'image/webp';
    if (buffer.byteLength > MAX_IMAGE_SIZE) {
      throw badRequest(
        `Image is too large after conversion (${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB). Maximum is 2 MB.`,
      );
    }
  } else if (mimeType === 'image/svg+xml') {
    buffer = sanitizeSvg(rawBuffer);
    storedMimeType = mimeType;
  } else {
    buffer = rawBuffer;
    storedMimeType = mimeType;
  }

  const ext = CONVERTIBLE_TO_WEBP.has(mimeType) ? 'webp' : MIME_EXTENSIONS[mimeType];
  const key = `media/${session.user.id}/${randomUUID()}.${ext}`;
  const { url } = await uploadToR2(key, buffer, storedMimeType);

  const [inserted] = await db.transaction(async tx => {
    const [row] = await tx
      .insert(media)
      .values({
        userId: session.user.id,
        url,
        filename: file.name.replace(/\.[^.]+$/, ''),
        fileType: storedMimeType,
        sizeBytes: buffer.byteLength,
        purpose: typeof purpose === 'string' ? purpose : null,
      })
      .returning();

    await tx
      .update(users)
      .set({
        storageBytesUsed: sql`${users.storageBytesUsed} + ${buffer.byteLength}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    await tx
      .insert(appStorage)
      .values({ id: 1, totalBytesUsed: currentAppTotal + buffer.byteLength })
      .onConflictDoUpdate({
        target: appStorage.id,
        set: {
          totalBytesUsed: sql`${appStorage.totalBytesUsed} + ${buffer.byteLength}`,
          updatedAt: new Date(),
        },
      });

    return [row];
  });

  return c.json({ media: inserted }, 201);
});
