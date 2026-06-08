import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { db } from '../../db/client.js';
import { collectionItems, collections, portfolios } from '../../db/schema/index.js';
import { notFound } from '../../utils/errorHandling.js';

export const portfolioCollectionByIdGet = factory.createHandlers(async c => {
  const slug = c.req.param('slug') as string;
  const collectionId = c.req.param('collectionId') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.slug, slug), eq(portfolios.isPublished, true)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  // Verify the collection belongs to this portfolio
  const [collection] = await db
    .select({ id: collections.id })
    .from(collections)
    .where(and(eq(collections.id, collectionId), eq(collections.portfolioId, portfolio.id)));

  if (!collection) {
    return c.json({ items: [] });
  }

  const rows = await db
    .select()
    .from(collectionItems)
    .where(
      and(eq(collectionItems.collectionId, collection.id), eq(collectionItems.isPublished, true)),
    )
    .orderBy(collectionItems.sortOrder, collectionItems.createdAt);

  return c.json({ items: rows });
});
