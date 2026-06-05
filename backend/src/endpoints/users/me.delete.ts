import { eq, sql } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { users, appStorage, media } from '../../db/schema/index.js';
import { unauthorized, badRequest, parseBody } from '../../utils/errorHandling.js';
import { deleteFromR2, keyFromUrl } from '../../lib/r2.js';

export const meDelete = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) throw unauthorized();

  const body = await parseBody<{ email?: string }>(c);

  if (!body.email || body.email.trim().toLowerCase() !== session.user.email.toLowerCase()) {
    throw badRequest('Email confirmation does not match');
  }

  const userId = session.user.id;

  // Fetch user row (need avatar URL) and all media files before deletion
  const [userRow] = await db.select({ image: users.image }).from(users).where(eq(users.id, userId));

  const userMedia = await db.select().from(media).where(eq(media.userId, userId));

  const totalMediaBytes = userMedia.reduce((sum, f) => sum + f.sizeBytes, 0);

  // Delete all R2 objects: uploaded media files + avatar (best-effort)
  const r2Deletions: Promise<void>[] = userMedia.map(f => {
    const key = keyFromUrl(f.url);
    return key ? deleteFromR2(key) : Promise.resolve();
  });

  if (userRow?.image) {
    const avatarKey = keyFromUrl(userRow.image);
    if (avatarKey) r2Deletions.push(deleteFromR2(avatarKey));
  }

  await Promise.allSettled(r2Deletions);

  // Delete user — cascades to: sessions, accounts, media, portfolios → pages → blocks,
  // collections → collectionItems
  await db.transaction(async tx => {
    await tx.delete(users).where(eq(users.id, userId));

    if (totalMediaBytes > 0) {
      await tx
        .update(appStorage)
        .set({
          totalBytesUsed: sql`GREATEST(0, ${appStorage.totalBytesUsed} - ${totalMediaBytes})`,
          updatedAt: new Date(),
        })
        .where(eq(appStorage.id, 1));
    }
  });

  // Sessions are cascade-deleted with the user row above, so the session
  // cookie is already invalid. Nothing more to revoke.

  return c.json({ success: true });
});
