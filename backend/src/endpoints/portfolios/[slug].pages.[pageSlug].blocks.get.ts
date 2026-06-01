import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { db } from '../../db/client.js';
import { blocks, pages, portfolios } from '../../db/schema/index.js';
import { notFound } from '../../utils/errorHandling.js';

export const portfolioPageBlocksGet = factory.createHandlers(async c => {
  const slug = c.req.param('slug') as string;
  const pageSlug = c.req.param('pageSlug') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.slug, slug), eq(portfolios.isPublished, true)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const [page] = await db
    .select({ id: pages.id })
    .from(pages)
    .where(
      and(
        eq(pages.portfolioId, portfolio.id),
        eq(pages.slug, pageSlug),
        eq(pages.isPublished, true),
      ),
    );

  if (!page) {
    throw notFound('Page not found');
  }

  const rows = await db
    .select()
    .from(blocks)
    .where(eq(blocks.pageId, page.id))
    .orderBy(blocks.sortOrder, blocks.createdAt);

  return c.json({ blocks: rows });
});
