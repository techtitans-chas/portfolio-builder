import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { projects, portfolios } from '../../db/schema/index.js';
import { unauthorized, badRequest, notFound, parseBody } from '../../utils/errorHandling.js';

const linkSchema = z.object({
  id: z.string(),
  title: z.string().max(100),
  url: z.string().max(500),
  icon: z.string().max(100).optional().nullable(),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

const projectSchema = z.object({
  title: z.string().max(200).default(''),
  description: z.string().max(2000).nullable().optional(),
  time: z.string().max(100).nullable().optional(),
  isPublished: z.boolean().default(false),
  sortOrder: z.number().optional(),
  links: z.array(linkSchema).default([]),
  previewImageUrl: z.string().max(500).nullable().optional(),
  tags: z.array(z.string().max(50)).default([]),
});

export const projectsPost = factory.createHandlers(async c => {
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
  const result = projectSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const [created] = await db
    .insert(projects)
    .values({
      portfolioId: portfolio.id,
      ...result.data,
    })
    .returning();

  return c.json({ project: created }, 201);
});
