import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { collectionItems, collections, portfolios } from '../../db/schema/index.js';
import { unauthorized, badRequest, notFound, parseBody } from '../../utils/errorHandling.js';

const itemSchema = z.object({
  data: z.record(z.string(), z.unknown()).default({}),
  isPublished: z.boolean().default(false),
  sortOrder: z.number().optional(),
});

export const collectionItemsPost = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const collectionId = c.req.param('collectionId') as string;

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

  const body = await parseBody(c);
  const result = itemSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const [created] = await db
    .insert(collectionItems)
    .values({
      collectionId,
      data: result.data.data,
      isPublished: result.data.isPublished,
      sortOrder: result.data.sortOrder ?? 0,
    })
    .returning();

  return c.json({ item: created }, 201);
});
