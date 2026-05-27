import { eq, sql } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { users, appStorage } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest, forbidden } from '../../utils/errorHandling.js';
import {
  uploadToR2,
  deleteFromR2,
  keyFromUrl,
  MAX_FILE_SIZE,
  ALLOWED_MIME_TYPES,
  USER_STORAGE_LIMIT,
  APP_STORAGE_LIMIT,
} from '../../lib/r2.js';

export const meAvatarPost = factory.createHandlers(async c => {
  // -------------------------------------------------------------------------
  // Auth
  // -------------------------------------------------------------------------
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) throw unauthorized();

  // -------------------------------------------------------------------------
  // Parse multipart form data
  // -------------------------------------------------------------------------
  const formData = await c.req.formData();
  const file = formData.get('avatar');

  if (!file || !(file instanceof File)) {
    throw badRequest('No file provided — send a multipart field named "avatar"');
  }

  // -------------------------------------------------------------------------
  // Validate MIME type
  // -------------------------------------------------------------------------
  const mimeType = file.type;
  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)) {
    throw badRequest(
      `Unsupported file type "${mimeType}". Allowed types: jpg, png, gif, webp.`,
    );
  }

  // -------------------------------------------------------------------------
  // Read into buffer & validate size
  // -------------------------------------------------------------------------
  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.byteLength > MAX_FILE_SIZE) {
    throw badRequest(
      `File too large (${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB). Maximum size is 5 MB.`,
    );
  }

  // -------------------------------------------------------------------------
  // Load current user (need existing image URL + current storage usage)
  // -------------------------------------------------------------------------
  const [user] = await db
    .select({
      id: users.id,
      image: users.image,
      storageBytesUsed: users.storageBytesUsed,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) throw notFound('User not found');

  // -------------------------------------------------------------------------
  // Ensure we stay within per-user storage limit
  // -------------------------------------------------------------------------
  // If the user currently has an R2-hosted avatar, that file's size is already
  // counted in storageBytesUsed. Replacing it means we subtract the old size.
  const oldIsR2 = user.image ? !user.image.startsWith('/') : false;
  const previousFileSize = oldIsR2 ? user.storageBytesUsed : 0;
  const projectedUserUsage = user.storageBytesUsed - previousFileSize + buffer.byteLength;

  if (projectedUserUsage > USER_STORAGE_LIMIT) {
    throw forbidden(
      `Upload would exceed your personal storage limit of 25 MB. ` +
        `You are currently using ${(user.storageBytesUsed / 1024 / 1024).toFixed(1)} MB.`,
    );
  }

  // -------------------------------------------------------------------------
  // Ensure we stay within app-wide storage limit
  // -------------------------------------------------------------------------
  const [appStorageRow] = await db.select().from(appStorage).where(eq(appStorage.id, 1));
  const currentAppTotal = appStorageRow?.totalBytesUsed ?? 0;
  const projectedAppTotal = currentAppTotal - previousFileSize + buffer.byteLength;

  if (projectedAppTotal > APP_STORAGE_LIMIT) {
    throw forbidden('The application storage limit has been reached. Please contact support.');
  }

  // -------------------------------------------------------------------------
  // Upload new file to R2
  // -------------------------------------------------------------------------
  const extension = (mimeType.split('/')[1] ?? 'jpg').replace('jpeg', 'jpg');
  const key = `avatars/${user.id}/${randomUUID()}.${extension}`;
  const { url } = await uploadToR2(key, buffer, mimeType);

  // -------------------------------------------------------------------------
  // Delete old R2 file (if it was an R2 upload, not a default avatar)
  // -------------------------------------------------------------------------
  if (user.image) {
    const oldKey = keyFromUrl(user.image);
    if (oldKey) await deleteFromR2(oldKey);
  }

  // -------------------------------------------------------------------------
  // Persist updated image URL + storage counters
  // -------------------------------------------------------------------------
  const bytesDelta = buffer.byteLength - previousFileSize;

  await db.transaction(async tx => {
    await tx
      .update(users)
      .set({
        image: url,
        storageBytesUsed: sql`${users.storageBytesUsed} + ${bytesDelta}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Upsert the singleton app_storage row
    await tx
      .insert(appStorage)
      .values({ id: 1, totalBytesUsed: Math.max(0, currentAppTotal + bytesDelta) })
      .onConflictDoUpdate({
        target: appStorage.id,
        set: {
          totalBytesUsed: sql`${appStorage.totalBytesUsed} + ${bytesDelta}`,
          updatedAt: new Date(),
        },
      });
  });

  return c.json({ image: url });
});

