import { eq, and } from 'drizzle-orm';
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

const projectPatchSchema = z.object({
  title: z.string().max(200).optional(),
  description: z.string().max(2000).nullable().optional(),
  time: z.string().max(100).nullable().optional(),
  isPublished: z.boolean().optional(),
  sortOrder: z.number().optional(),
  links: z.array(linkSchema).optional(),
  previewImageUrl: z.string().max(500).nullable().optional(),
  tags: z.array(z.string().max(50)).optional(),
});

export const projectPatch = factory.createHandlers(async c => {
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
  const result = projectPatchSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const [updated] = await db
    .update(projects)
    .set({ ...result.data, updatedAt: new Date() })
    .where(and(eq(projects.id, id), eq(projects.portfolioId, portfolio.id)))
    .returning();

  if (!updated) {
    throw notFound('Project not found');
  }

  return c.json({ project: updated });
});
