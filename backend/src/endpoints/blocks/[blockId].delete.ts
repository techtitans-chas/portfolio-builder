import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { blocks, pages, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound, forbidden } from '../../utils/errorHandling.js';

export const blockDelete = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const portfolioId = c.req.param('portfolioId') as string;
  const pageId = c.req.param('pageId') as string;
  const blockId = c.req.param('blockId') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.id, portfolioId), eq(portfolios.userId, session.user.id)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const [page] = await db
    .select({ id: pages.id })
    .from(pages)
    .where(and(eq(pages.id, pageId), eq(pages.portfolioId, portfolio.id)));

  if (!page) {
    throw notFound('Page not found');
  }

  const [block] = await db
    .select({ id: blocks.id, isMandatory: blocks.isMandatory })
    .from(blocks)
    .where(and(eq(blocks.id, blockId), eq(blocks.pageId, page.id)));

  if (!block) {
    throw notFound('Block not found');
  }

  if (block.isMandatory) {
    throw forbidden('This block cannot be deleted');
  }

  await db.delete(blocks).where(eq(blocks.id, blockId));

  return c.json({ id: blockId });
});
