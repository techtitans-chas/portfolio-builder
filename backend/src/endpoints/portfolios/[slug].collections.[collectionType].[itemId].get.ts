import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { db } from '../../db/client.js';
import { collectionItems, collections, portfolios } from '../../db/schema/index.js';
import { notFound } from '../../utils/errorHandling.js';

export const portfolioCollectionItemGet = factory.createHandlers(async c => {
  const slug = c.req.param('slug') as string;
  const collectionType = c.req.param('collectionType') as string;
  const itemId = c.req.param('itemId') as string;

  const [row] = await db
    .select({ item: collectionItems })
    .from(collectionItems)
    .innerJoin(collections, eq(collectionItems.collectionId, collections.id))
    .innerJoin(portfolios, eq(collections.portfolioId, portfolios.id))
    .where(
      and(
        eq(collectionItems.id, itemId),
        eq(collectionItems.isPublished, true),
        eq(collections.type, collectionType),
        eq(portfolios.slug, slug),
        eq(portfolios.isPublished, true),
      ),
    );

  if (!row) {
    throw notFound('Item not found');
  }

  return c.json({ item: row.item });
});
