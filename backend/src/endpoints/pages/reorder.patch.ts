import { eq, and, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { pages, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest, parseBody } from '../../utils/errorHandling.js';

const reorderSchema = z.object({
  pageIds: z.array(z.string().uuid()).min(1),
});

export const pagesReorder = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const portfolioId = c.req.param('portfolioId') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.id, portfolioId), eq(portfolios.userId, session.user.id)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const body = await parseBody(c);
  const result = reorderSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const { pageIds } = result.data;

  // Verify all IDs belong to this portfolio
  const existing = await db
    .select({ id: pages.id })
    .from(pages)
    .where(and(eq(pages.portfolioId, portfolio.id), inArray(pages.id, pageIds)));

  if (existing.length !== pageIds.length) {
    throw badRequest('One or more page IDs are invalid');
  }

  await db.transaction(async tx => {
    for (let i = 0; i < pageIds.length; i++) {
      await tx
        .update(pages)
        .set({ sortOrder: i, updatedAt: new Date() })
        .where(eq(pages.id, pageIds[i]!));
    }
  });

  return c.json({ ok: true });
});
