import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { blocks, pages, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest, parseBody } from '../../utils/errorHandling.js';

const blockPatchSchema = z.object({
  type: z.string().max(100).optional(),
  sortOrder: z.number().optional(),
  content: z.record(z.unknown()).optional(),
  styles: z.record(z.unknown()).optional(),
});

export const blockPatch = factory.createHandlers(async c => {
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

  const body = await parseBody(c);
  const result = blockPatchSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const [updated] = await db
    .update(blocks)
    .set({ ...result.data, updatedAt: new Date() })
    .where(and(eq(blocks.id, blockId), eq(blocks.pageId, page.id)))
    .returning();

  if (!updated) {
    throw notFound('Block not found');
  }

  return c.json({ block: updated });
});
