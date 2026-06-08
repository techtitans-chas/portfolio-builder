import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { media } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest } from '../../utils/errorHandling.js';

export const mediaPatch = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) throw unauthorized();

  const id = c.req.param('id');
  if (!id) throw badRequest('Missing media id');

  const body = await c.req.json().catch(() => null);
  const name = typeof body?.name === 'string' ? body.name.trim() : null;
  if (!name) throw badRequest('Missing or invalid "name" field');

  const [file] = await db
    .select()
    .from(media)
    .where(and(eq(media.id, id), eq(media.userId, session.user.id)));

  if (!file) throw notFound('Media not found');

  await db.update(media).set({ filename: name, updatedAt: new Date() }).where(eq(media.id, id));

  const [updated] = await db.select().from(media).where(eq(media.id, id));

  return c.json({ media: updated });
});
