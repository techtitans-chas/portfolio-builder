import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { pages, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound } from '../../utils/errorHandling.js';

export const pagesGet = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const portfolioId = c.req.param('portfolioId') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.id, portfolioId), eq(portfolios.userId, session.user.id)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const rows = await db
    .select()
    .from(pages)
    .where(eq(pages.portfolioId, portfolio.id))
    .orderBy(pages.sortOrder, pages.createdAt);

  return c.json({ pages: rows });
});
