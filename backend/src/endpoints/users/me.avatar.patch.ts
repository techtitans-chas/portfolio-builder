import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { users, appStorage } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest } from '../../utils/errorHandling.js';
import { deleteFromR2, keyFromUrl } from '../../lib/r2.js';

const schema = z.object({
  /** Relative path to a default avatar, e.g. "/avatars/avatar-1.png" */
  image: z
    .string()
    .min(1)
    .refine(v => v.startsWith('/avatars/'), {
      message: 'Default avatar path must start with "/avatars/"',
    }),
});

/**
 * PATCH /api/users/me/avatar
 *
 * Select a default (pre-supplied) avatar image.
 * Deletes any existing R2-uploaded avatar and resets the user's storage counter.
 */
export const meAvatarPatch = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) throw unauthorized();

  const body = await c.req.json().catch(() => {
    throw badRequest('Request body must be valid JSON');
  });

  const result = schema.safeParse(body);
  if (!result.success) throw badRequest('Validation failed', result.error.issues);

  const [user] = await db
    .select({ id: users.id, image: users.image, storageBytesUsed: users.storageBytesUsed })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) throw notFound('User not found');

  // If the user previously had an R2-hosted avatar, delete it and free quota
  const oldIsR2 = user.image ? !user.image.startsWith('/') : false;
  const freedBytes = oldIsR2 ? user.storageBytesUsed : 0;

  if (oldIsR2 && user.image) {
    const oldKey = keyFromUrl(user.image);
    if (oldKey) await deleteFromR2(oldKey);
  }

  await db.transaction(async tx => {
    await tx
      .update(users)
      .set({ image: result.data.image, storageBytesUsed: 0, updatedAt: new Date() })
      .where(eq(users.id, user.id));

    if (freedBytes > 0) {
      await tx
        .insert(appStorage)
        .values({ id: 1, totalBytesUsed: 0 })
        .onDuplicateKeyUpdate({
          set: {
            totalBytesUsed: sql`GREATEST(0, ${appStorage.totalBytesUsed} - ${freedBytes})`,
            updatedAt: new Date(),
          },
        });
    }
  });

  return c.json({ image: result.data.image });
});
