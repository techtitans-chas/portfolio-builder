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

  // Fetch all media files so we can delete them from R2
  const userMedia = await db.select().from(media).where(eq(media.userId, userId));

  const totalMediaBytes = userMedia.reduce((sum, f) => sum + f.sizeBytes, 0);

  // Delete files from R2 (best-effort, don't fail the request if R2 is down)
  await Promise.allSettled(
    userMedia.map(f => {
      const key = keyFromUrl(f.url);
      return key ? deleteFromR2(key) : Promise.resolve();
    }),
  );

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
