import { eq } from 'drizzle-orm';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { users, portfolios } from '../../db/schema/index.js';
import { unauthorized, notFound } from '../../utils/errorHandling.js';

export const meGet = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      emailVerified: users.emailVerified,
      image: users.image,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) {
    throw notFound('User not found');
  }

  const [portfolio] = await db
    .select({
      id: portfolios.id,
      slug: portfolios.slug,
      title: portfolios.title,
      description: portfolios.description,
      ogImageUrl: portfolios.ogImageUrl,
      themeSettings: portfolios.themeSettings,
      isPublished: portfolios.isPublished,
      publishedAt: portfolios.publishedAt,
      createdAt: portfolios.createdAt,
    })
    .from(portfolios)
    .where(eq(portfolios.userId, session.user.id));

  return c.json({ user, portfolio: portfolio ?? null });
});
