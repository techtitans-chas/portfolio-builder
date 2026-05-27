import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

// ---------------------------------------------------------------------------
// Cloudflare R2 client (S3-compatible)
// ---------------------------------------------------------------------------

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

export const R2_BUCKET = process.env.R2_BUCKET_NAME ?? 'portfolio-builder';

/**
 * The public base URL for R2-hosted assets, e.g. "https://pub-<hash>.r2.dev".
 * Trailing slash is stripped so callers can safely append "/<key>".
 */
export const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '');

export const r2 =
  accountId && accessKeyId && secretAccessKey
    ? new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: { accessKeyId, secretAccessKey },
      })
    : null;

// ---------------------------------------------------------------------------
// Storage limits
// ---------------------------------------------------------------------------

/** Maximum bytes a single user may store in R2 (25 MB). */
export const USER_STORAGE_LIMIT = 25 * 1024 * 1024;

/** Maximum bytes the entire application may store in R2 (500 MB). */
export const APP_STORAGE_LIMIT = 500 * 1024 * 1024;

/** Maximum size for a single uploaded file (10 MB — server resizes before storing). */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/** Accepted MIME types for avatar uploads. */
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const;

/** Avatar output size in pixels (applied to both width and height). */
export const AVATAR_SIZE_PX = 200;

/**
 * Resize and convert an image buffer to a 200×200 WebP avatar.
 * The image is fit inside the box with `cover` (cropped to fill), then
 * converted to WebP at quality 85. The output is always much smaller than
 * the original, so storage cost is minimal regardless of what was uploaded.
 */
export async function processAvatar(input: Buffer): Promise<Buffer> {
  return sharp(input)
    .resize(AVATAR_SIZE_PX, AVATAR_SIZE_PX, { fit: 'cover', position: 'centre' })
    .webp({ quality: 85 })
    .toBuffer();
}

// ---------------------------------------------------------------------------
// Upload helper
// ---------------------------------------------------------------------------

export interface UploadResult {
  /** R2 object key, e.g. "avatars/<userId>/<uuid>.webp" */
  key: string;
  /** Full public URL for the uploaded file. */
  url: string;
}

/**
 * Upload a buffer to R2 and return the public URL.
 * Throws if the R2 client is not configured.
 */
export async function uploadToR2(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<UploadResult> {
  if (!r2) {
    throw new Error('R2 is not configured — set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY');
  }

  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );

  return { key, url: `${R2_PUBLIC_URL}/${key}` };
}

/**
 * Delete an object from R2 by key.
 * Silently succeeds if the client is not configured or the key is absent.
 */
export async function deleteFromR2(key: string): Promise<void> {
  if (!r2) return;
  await r2.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key }));
}

/**
 * Derive the R2 object key from a stored public URL.
 * Returns null if the URL does not belong to this R2 bucket.
 */
export function keyFromUrl(url: string): string | null {
  if (!R2_PUBLIC_URL || !url.startsWith(R2_PUBLIC_URL)) return null;
  return url.slice(R2_PUBLIC_URL.length + 1); // strip leading "/"
}
