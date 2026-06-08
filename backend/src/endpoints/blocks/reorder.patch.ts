import { eq, and, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { blocks, pages, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest, parseBody } from '../../utils/errorHandling.js';

const reorderSchema = z.object({
  blockIds: z.array(z.string().uuid()).min(1),
});

export const blocksReorder = factory.createHandlers(async c => {
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
    .select({ id: pages.id })
    .from(pages)
    .where(and(eq(pages.id, pageId), eq(pages.portfolioId, portfolio.id)));

  if (!page) {
    throw notFound('Page not found');
  }

  const body = await parseBody(c);
  const result = reorderSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const { blockIds } = result.data;

  const existing = await db
    .select({ id: blocks.id })
    .from(blocks)
    .where(and(eq(blocks.pageId, page.id), inArray(blocks.id, blockIds)));

  if (existing.length !== blockIds.length) {
    throw badRequest('One or more block IDs are invalid');
  }

  await db.transaction(async tx => {
    for (let i = 0; i < blockIds.length; i++) {
      await tx
        .update(blocks)
        .set({ sortOrder: i, updatedAt: new Date() })
        .where(eq(blocks.id, blockIds[i]!));
    }
  });

  return c.json({ ok: true });
});
