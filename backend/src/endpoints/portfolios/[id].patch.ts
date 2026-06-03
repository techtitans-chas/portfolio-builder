import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest, parseBody } from '../../utils/errorHandling.js';

const seoMetaSchema = z.object({
  seoTitle: z.string().max(100).nullable().optional(),
  seoDescription: z.string().max(300).nullable().optional(),
});

const fontsSchema = z.object({
  heading: z.string().max(100),
  body: z.string().max(100),
});

const themeSettingsSchema = z.object({
  themeId: z.string().nullable().optional(),
  mode: z.enum(['light', 'dark', 'both']).optional(),
  fonts: fontsSchema.nullable().optional(),
  logoLight: z.url().nullable().optional(),
  logoDark: z.url().nullable().optional(),
});

const settingsSchema = z.object({
  title: z.string().max(100).optional(),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug may only contain lowercase letters, numbers, and hyphens')
    .optional(),
  description: z.string().max(300).nullable().optional(),
  ogImageUrl: z.url().nullable().optional(),
  seoMeta: seoMetaSchema.nullable().optional(),
  themeSettings: themeSettingsSchema.nullable().optional(),
  isPublished: z.boolean().optional(),
});

export const portfolioPatch = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const id = c.req.param('id') as string;

  const body = await parseBody(c);
  const result = settingsSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  const [updated] = await db
    .update(portfolios)
    .set({ ...result.data, updatedAt: new Date() })
    .where(and(eq(portfolios.id, id), eq(portfolios.userId, session.user.id)))
    .returning();

  if (!updated) {
    throw notFound('Portfolio not found');
  }

  return c.json({ portfolio: updated });
});
