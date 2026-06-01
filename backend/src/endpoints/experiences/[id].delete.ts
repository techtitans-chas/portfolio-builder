import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { experiences, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound } from '../../utils/errorHandling.js';

export const experienceDelete = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const id = c.req.param('id') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(eq(portfolios.userId, session.user.id));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const [deleted] = await db
    .delete(experiences)
    .where(and(eq(experiences.id, id), eq(experiences.portfolioId, portfolio.id)))
    .returning({ id: experiences.id });

  if (!deleted) {
    throw notFound('Experience not found');
  }

  return c.json({ id: deleted.id });
});
