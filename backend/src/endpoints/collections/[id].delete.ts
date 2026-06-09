import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { collections, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound } from '../../utils/errorHandling.js';

export const collectionDelete = factory.createHandlers(async c => {
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

  // MySQL has no RETURNING — confirm the row exists, then delete.
  const [existing] = await db
    .select({ id: collections.id })
    .from(collections)
    .where(and(eq(collections.id, id), eq(collections.portfolioId, portfolio.id)));

  if (!existing) {
    throw notFound('Collection not found');
  }

  await db
    .delete(collections)
    .where(and(eq(collections.id, id), eq(collections.portfolioId, portfolio.id)));

  return c.json({ id: existing.id });
});
