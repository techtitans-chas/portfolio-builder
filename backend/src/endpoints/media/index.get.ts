import { eq, desc } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { media } from '../../db/schema/index.js';
import { unauthorized } from '../../utils/errorHandling.js';

export const mediaGet = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) throw unauthorized();

  const files = await db
    .select()
    .from(media)
    .where(eq(media.userId, session.user.id))
    .orderBy(desc(media.createdAt));

  return c.json({ media: files });
});
