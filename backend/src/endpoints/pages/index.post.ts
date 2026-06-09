import { eq, and, max, count } from 'drizzle-orm';
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
  forbidden,
  parseBody,
} from '../../utils/errorHandling.js';
import { MAX_PAGES_PER_PORTFOLIO } from '@portfolio-builder/shared/schemas';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const pagePostSchema = z.object({
  title: z.string().max(200).default(''),
  slug: z.string().max(200).optional(),
  isPublished: z.boolean().default(false),
  showInMenu: z.boolean().default(true),
  isMandatory: z.boolean().default(false),
  seoTitle: z.string().max(200).nullable().optional(),
  seoDescription: z.string().max(500).nullable().optional(),
  seoOgImageUrl: z.string().max(500).nullable().optional(),
});

export const pagesPost = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const portfolioId = c.req.param('portfolioId') as string;

  const [portfolio] = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(and(eq(portfolios.id, portfolioId), eq(portfolios.userId, session.user.id)));

  if (!portfolio) {
    throw notFound('Portfolio not found');
  }

  const body = await parseBody(c);
  const result = pagePostSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const { slug: rawSlug, title, ...rest } = result.data;
  const slug = rawSlug ? slugify(rawSlug) : slugify(title || 'page');

  const [countRow] = await db
    .select({ total: count() })
    .from(pages)
    .where(eq(pages.portfolioId, portfolio.id));

  if ((countRow?.total ?? 0) >= MAX_PAGES_PER_PORTFOLIO) {
    throw forbidden(
      `Page limit reached — portfolios may have at most ${MAX_PAGES_PER_PORTFOLIO} pages.`,
    );
  }

  const [existing] = await db
    .select({ id: pages.id })
    .from(pages)
    .where(and(eq(pages.portfolioId, portfolio.id), eq(pages.slug, slug)));

  if (existing) {
    throw conflict('A page with that slug already exists in this portfolio');
  }

  const [maxRow] = await db
    .select({ maxOrder: max(pages.sortOrder) })
    .from(pages)
    .where(eq(pages.portfolioId, portfolio.id));

  const sortOrder = (maxRow?.maxOrder ?? -1) + 1;

  const id = crypto.randomUUID();
  await db.insert(pages).values({ id, portfolioId: portfolio.id, title, slug, sortOrder, ...rest });
  const [created] = await db.select().from(pages).where(eq(pages.id, id));

  return c.json({ page: created }, 201);
});
