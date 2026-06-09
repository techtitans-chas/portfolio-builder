import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { collections, portfolios } from '../../db/schema/index.js';
import { unauthorized, badRequest, notFound, parseBody } from '../../utils/errorHandling.js';

const collectionPatchSchema = z.object({
  name: z.string().max(200).optional(),
  sortOrder: z.number().optional(),
});

export const collectionPatch = factory.createHandlers(async c => {
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

  const body = await parseBody(c);
  const result = collectionPatchSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  await db
    .update(collections)
    .set({ ...result.data, updatedAt: new Date() })
    .where(and(eq(collections.id, id), eq(collections.portfolioId, portfolio.id)));

  const [updated] = await db
    .select()
    .from(collections)
    .where(and(eq(collections.id, id), eq(collections.portfolioId, portfolio.id)));

  if (!updated) {
    throw notFound('Collection not found');
  }

  return c.json({ collection: updated });
});
