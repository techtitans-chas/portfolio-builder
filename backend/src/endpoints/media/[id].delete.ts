import { eq, sql, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { users, appStorage, media } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest } from '../../utils/errorHandling.js';
import { deleteFromR2, keyFromUrl } from '../../lib/r2.js';

export const mediaDelete = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) throw unauthorized();

  const id = c.req.param('id');
  if (!id) throw badRequest('Missing media id');

  const [file] = await db
    .select()
    .from(media)
    .where(and(eq(media.id, id), eq(media.userId, session.user.id)));

  if (!file) throw notFound('Media not found');

  const key = keyFromUrl(file.url);
  if (key) await deleteFromR2(key);

  await db.transaction(async tx => {
    await tx.delete(media).where(eq(media.id, id));

    await tx
      .update(users)
      .set({
        storageBytesUsed: sql`GREATEST(0, ${users.storageBytesUsed} - ${file.sizeBytes})`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    await tx
      .update(appStorage)
      .set({
        totalBytesUsed: sql`GREATEST(0, ${appStorage.totalBytesUsed} - ${file.sizeBytes})`,
        updatedAt: new Date(),
      })
      .where(eq(appStorage.id, 1));
  });

  return c.json({ success: true });
});
