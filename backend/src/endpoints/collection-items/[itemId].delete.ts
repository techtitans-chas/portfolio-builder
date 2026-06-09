import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { collectionItems, collections, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound } from '../../utils/errorHandling.js';

export const collectionItemDelete = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const collectionId = c.req.param('collectionId') as string;
  const itemId = c.req.param('itemId') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(eq(portfolios.userId, session.user.id));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const [collection] = await db
    .select({ id: collections.id })
    .from(collections)
    .where(and(eq(collections.id, collectionId), eq(collections.portfolioId, portfolio.id)));

  if (!collection) {
    throw notFound('Collection not found');
  }

  // MySQL has no RETURNING — confirm the row exists, then delete.
  const [existing] = await db
    .select({ id: collectionItems.id })
    .from(collectionItems)
    .where(and(eq(collectionItems.id, itemId), eq(collectionItems.collectionId, collectionId)));

  if (!existing) {
    throw notFound('Item not found');
  }

  await db
    .delete(collectionItems)
    .where(and(eq(collectionItems.id, itemId), eq(collectionItems.collectionId, collectionId)));

  return c.json({ id: existing.id });
});
