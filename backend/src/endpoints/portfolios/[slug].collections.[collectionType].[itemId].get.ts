import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { db } from '../../db/client.js';
import { collectionItems, collections, portfolios } from '../../db/schema/index.js';
import { notFound } from '../../utils/errorHandling.js';

export const portfolioCollectionItemGet = factory.createHandlers(async c => {
  const slug = c.req.param('slug') as string;
  const collectionType = c.req.param('collectionType') as string;
  const itemId = c.req.param('itemId') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.slug, slug), eq(portfolios.isPublished, true)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const [collection] = await db
    .select({ id: collections.id })
    .from(collections)
    .where(and(eq(collections.portfolioId, portfolio.id), eq(collections.type, collectionType)));

  if (!collection) {
    throw notFound('Collection not found');
  }

  const [item] = await db
    .select()
    .from(collectionItems)
    .where(
      and(
        eq(collectionItems.id, itemId),
        eq(collectionItems.collectionId, collection.id),
        eq(collectionItems.isPublished, true),
      ),
    );

  if (!item) {
    throw notFound('Item not found');
  }

  return c.json({ item });
});
