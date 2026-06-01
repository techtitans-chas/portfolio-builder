import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { pages, portfolios } from '../../db/schema/index.js';
import {
  unauthorized,
  notFound,
  conflict,
  badRequest,
  parseBody,
} from '../../utils/errorHandling.js';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const pagePatchSchema = z.object({
  title: z.string().max(200).optional(),
  slug: z.string().max(200).optional(),
  isPublished: z.boolean().optional(),
  showInMenu: z.boolean().optional(),
  sortOrder: z.number().optional(),
  seoTitle: z.string().max(200).nullable().optional(),
  seoDescription: z.string().max(500).nullable().optional(),
  seoOgImageUrl: z.string().max(500).nullable().optional(),
});

export const pagePatch = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const portfolioId = c.req.param('portfolioId') as string;
  const pageId = c.req.param('pageId') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.id, portfolioId), eq(portfolios.userId, session.user.id)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const body = await parseBody(c);
  const result = pagePatchSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const { slug: rawSlug, ...rest } = result.data;
  const slug = rawSlug ? slugify(rawSlug) : undefined;

  if (slug) {
    const [existing] = await db
      .select({ id: pages.id })
      .from(pages)
      .where(and(eq(pages.portfolioId, portfolio.id), eq(pages.slug, slug)));

    if (existing && existing.id !== pageId) {
      throw conflict('A page with that slug already exists in this portfolio');
    }
  }

  const [updated] = await db
    .update(pages)
    .set({ ...rest, ...(slug ? { slug } : {}), updatedAt: new Date() })
    .where(and(eq(pages.id, pageId), eq(pages.portfolioId, portfolio.id)))
    .returning();

  if (!updated) {
    throw notFound('Page not found');
  }

  return c.json({ page: updated });
});
