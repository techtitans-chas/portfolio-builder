import { eq } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { projects, portfolios } from '../../db/schema/index.js';
import { unauthorized } from '../../utils/errorHandling.js';

export const projectsGet = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(eq(portfolios.userId, session.user.id));

  if (!portfolio) {
    return c.json({ projects: [] });
  }

  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.portfolioId, portfolio.id))
    .orderBy(projects.sortOrder, projects.createdAt);

  return c.json({ projects: rows });
});
