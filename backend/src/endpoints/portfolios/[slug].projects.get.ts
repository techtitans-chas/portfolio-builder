import { eq, and } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { db } from '../../db/client.js';
import { projects, portfolios } from '../../db/schema/index.js';
import { notFound } from '../../utils/errorHandling.js';

export const portfolioProjectsGet = factory.createHandlers(async c => {
  const slug = c.req.param('slug') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.slug, slug), eq(portfolios.isPublished, true)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const rows = await db
    .select()
    .from(projects)
    .where(and(eq(projects.portfolioId, portfolio.id), eq(projects.isPublished, true)))
    .orderBy(projects.sortOrder, projects.createdAt);

  return c.json({ projects: rows });
});
