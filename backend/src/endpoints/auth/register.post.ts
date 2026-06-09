import { eq } from 'drizzle-orm';
import { registerSchema } from '@portfolio-builder/shared/schemas';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { users, portfolios } from '../../db/schema/index.js';
import { conflict, badRequest, parseBody, AppError } from '../../utils/errorHandling.js';
import { resendEnabled } from '../../lib/resend.js';
import { createDefaultPortfolioContent } from '../../db/createDefaultPortfolioContent.js';

export const registerPost = factory.createHandlers(async c => {
  if (!resendEnabled) {
    throw new AppError(503, 'Registration is disabled: email service is not configured');
  }

  const body = await parseBody(c);
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', { issues: result.error.issues });
  }

  const { name, email, password, slug } = result.data;

  // Check for duplicate email
  const existingUser = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
  if (existingUser.length > 0) {
    throw conflict('An account with that email address already exists');
  }

  // Check for duplicate slug
  const existingSlug = await db
    .select({ id: portfolios.id })
    .from(portfolios)
    .where(eq(portfolios.slug, slug));
  if (existingSlug.length > 0) {
    throw conflict('That portfolio URL is already taken');
  }

  // Create user via better-auth (handles password hashing + sends verification email)
  const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
  const signUpResult = await auth.api.signUpEmail({
    body: { name, email, password, callbackURL: `${frontendUrl}/verified` },
  });

  if (!signUpResult?.user?.id) {
    throw badRequest('Registration failed');
  }

  // Create linked portfolio with default pages and blocks
  const portfolioTitle = name || 'My Portfolio';
  const portfolioId = crypto.randomUUID();
  await db.insert(portfolios).values({
    id: portfolioId,
    userId: signUpResult.user.id,
    slug,
    title: portfolioTitle,
  });
  await createDefaultPortfolioContent(portfolioId, portfolioTitle);

  return c.json(
    { message: 'Registration successful. Please check your email to verify your account.' },
    201,
  );
});
