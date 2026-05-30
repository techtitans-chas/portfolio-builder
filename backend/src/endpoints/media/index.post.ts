import { eq, sql } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
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

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
] as const;

const CONVERTIBLE_TO_WEBP = new Set(['image/jpeg', 'image/png']);

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB post-conversion limit for raster images

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

  const mimeType = file.type;
  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)) {
    throw badRequest(
      `Unsupported file type "${mimeType}". Allowed types: jpg, png, gif, webp, svg, pdf.`,
    );
  }

  const rawBuffer = Buffer.from(await file.arrayBuffer());
  if (rawBuffer.byteLength > MAX_FILE_SIZE) {
    throw badRequest(
      `File too large (${(rawBuffer.byteLength / 1024 / 1024).toFixed(1)} MB). Maximum size is 10 MB.`,
    );
  }

  const [user] = await db
    .select({ storageBytesUsed: users.storageBytesUsed })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) throw notFound('User not found');

  // Use raw file size for quota pre-check (conservative; actual stored size may be smaller after WebP conversion).
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

  const convertToWebp = CONVERTIBLE_TO_WEBP.has(mimeType);
  const buffer = convertToWebp
    ? await sharp(rawBuffer)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer()
    : rawBuffer;

  if (convertToWebp && buffer.byteLength > MAX_IMAGE_SIZE) {
    throw badRequest(
      `Image is too large after conversion (${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB). Maximum is 2 MB.`,
    );
  }

  const storedMimeType = convertToWebp ? 'image/webp' : mimeType;
  const ext = convertToWebp ? 'webp' : (file.name.split('.').pop() ?? 'bin');
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
