import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { experiences, portfolios } from '../../db/schema/index.js';
import { unauthorized, badRequest, notFound, parseBody } from '../../utils/errorHandling.js';

const experiencePatchSchema = z.object({
  title: z.string().max(200).optional(),
  place: z.string().max(200).nullable().optional(),
  location: z.string().max(200).nullable().optional(),
  time: z.string().max(100).nullable().optional(),
  description: z.string().max(2000).nullable().optional(),
  isPublished: z.boolean().optional(),
  sortOrder: z.number().optional(),
  tags: z.array(z.string().max(50)).optional(),
});

export const experiencePatch = factory.createHandlers(async c => {
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
  const result = experiencePatchSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const [updated] = await db
    .update(experiences)
    .set({ ...result.data, updatedAt: new Date() })
    .where(and(eq(experiences.id, id), eq(experiences.portfolioId, portfolio.id)))
    .returning();

  if (!updated) {
    throw notFound('Experience not found');
  }

  return c.json({ experience: updated });
});
