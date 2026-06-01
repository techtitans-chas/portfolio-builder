import { eq, and, max } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { blocks, pages, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest, parseBody } from '../../utils/errorHandling.js';

const blockPostSchema = z.object({
  type: z.string().max(100),
  sortOrder: z.number().optional(),
  content: z.record(z.string(), z.unknown()).default({}),
  styles: z.record(z.string(), z.unknown()).default({}),
  isMandatory: z.boolean().default(false),
});

export const blocksPost = factory.createHandlers(async c => {
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
  const result = blockPostSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const { sortOrder: providedOrder, ...rest } = result.data;

  let sortOrder = providedOrder;
  if (sortOrder === undefined) {
    const [maxRow] = await db
      .select({ maxOrder: max(blocks.sortOrder) })
      .from(blocks)
      .where(eq(blocks.pageId, page.id));
    sortOrder = (maxRow?.maxOrder ?? -1) + 1;
  }

  const [created] = await db
    .insert(blocks)
    .values({ pageId: page.id, sortOrder, ...rest })
    .returning();

  return c.json({ block: created }, 201);
});
