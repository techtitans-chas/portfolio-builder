import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { db } from '../../db/client.js';
import { collectionItems, collections, portfolios } from '../../db/schema/index.js';
import { notFound } from '../../utils/errorHandling.js';

export const portfolioCollectionItemsGet = factory.createHandlers(async c => {
  const slug = c.req.param('slug') as string;
  const collectionType = c.req.param('collectionType') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.slug, slug), eq(portfolios.isPublished, true)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const rows = await db
    .select({ item: collectionItems })
    .from(collectionItems)
    .innerJoin(collections, eq(collectionItems.collectionId, collections.id))
    .where(
      and(
        eq(collections.portfolioId, portfolio.id),
        eq(collections.type, collectionType),
        eq(collectionItems.isPublished, true),
      ),
    )
    .orderBy(collectionItems.sortOrder, collectionItems.createdAt);

  return c.json({ items: rows.map(r => r.item) });
});
