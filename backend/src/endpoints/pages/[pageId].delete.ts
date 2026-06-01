import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { pages, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound, forbidden } from '../../utils/errorHandling.js';

export const pageDelete = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const portfolioId = c.req.param('portfolioId') as string;
  const pageId = c.req.param('pageId') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.id, portfolioId), eq(portfolios.userId, session.user.id)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const [page] = await db
    .select({ id: pages.id, isMandatory: pages.isMandatory })
    .from(pages)
    .where(and(eq(pages.id, pageId), eq(pages.portfolioId, portfolio.id)));

  if (!page) {
    throw notFound('Page not found');
  }

  if (page.isMandatory) {
    throw forbidden('This page cannot be deleted');
  }

  // Blocks are cascade-deleted by the FK constraint on page_id
  await db.delete(pages).where(eq(pages.id, pageId));

  return c.json({ id: pageId });
});
