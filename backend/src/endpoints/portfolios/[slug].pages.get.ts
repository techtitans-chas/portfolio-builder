import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { db } from '../../db/client.js';
import { pages, portfolios } from '../../db/schema/index.js';
import { notFound } from '../../utils/errorHandling.js';

export const portfolioPagesGet = factory.createHandlers(async c => {
  const slug = c.req.param('slug') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.slug, slug), eq(portfolios.isPublished, true)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const rows = await db
    .select()
    .from(pages)
    .where(and(eq(pages.portfolioId, portfolio.id), eq(pages.isPublished, true)))
    .orderBy(pages.sortOrder, pages.createdAt);

  return c.json({ pages: rows });
});
