import { eq } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { experiences, portfolios } from '../../db/schema/index.js';
import { unauthorized } from '../../utils/errorHandling.js';

export const experiencesGet = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(eq(portfolios.userId, session.user.id));

  if (!portfolio) {
    return c.json({ experiences: [] });
  }

  const rows = await db
    .select()
    .from(experiences)
    .where(eq(experiences.portfolioId, portfolio.id))
    .orderBy(experiences.sortOrder, experiences.createdAt);

  return c.json({ experiences: rows });
});
