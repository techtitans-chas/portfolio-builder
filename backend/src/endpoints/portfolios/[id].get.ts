import { eq } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { db } from '../../db/client.js';
import { portfolios } from '../../db/schema/index.js';
import { notFound } from '../../utils/errorHandling.js';

export const portfolioGet = factory.createHandlers(async c => {
  const slug = c.req.param('slug') as string;

  const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.slug, slug));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  if (!portfolio.isPublished) {
    throw notFound('Portfolio not found');
  }

  return c.json({ portfolio });
});
