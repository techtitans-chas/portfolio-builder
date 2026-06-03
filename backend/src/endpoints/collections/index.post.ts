import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { collections, portfolios } from '../../db/schema/index.js';
import { unauthorized, badRequest, notFound, parseBody } from '../../utils/errorHandling.js';
import { collectionTypes } from '@portfolio-builder/shared/types';

const collectionSchema = z.object({
  type: z.string().max(100),
  name: z.string().max(200).default(''),
  sortOrder: z.number().optional(),
});

export const collectionsPost = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(eq(portfolios.userId, session.user.id));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const body = await parseBody(c);
  const result = collectionSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const knownType = collectionTypes.find(ct => ct.type === result.data.type);
  if (!knownType) {
    throw badRequest('Unknown collection type');
  }

  const [created] = await db
    .insert(collections)
    .values({
      portfolioId: portfolio.id,
      type: result.data.type,
      name: result.data.name || knownType.label,
      sortOrder: result.data.sortOrder ?? 0,
    })
    .returning();

  return c.json({ collection: created }, 201);
});
