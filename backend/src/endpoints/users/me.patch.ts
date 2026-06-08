import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { factory } from '../../lib/factory.js';
import { auth } from '../../lib/auth.js';
import { db } from '../../db/client.js';
import { users } from '../../db/schema/index.js';
import { unauthorized, notFound, badRequest, parseBody } from '../../utils/errorHandling.js';

const updateMeSchema = z.object({
  name: z.string().min(1),
});

export const mePatch = factory.createHandlers(async c => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session?.user) {
    throw unauthorized();
  }

  const body = await parseBody(c);
  const result = updateMeSchema.safeParse(body);

  if (!result.success) {
    throw badRequest('Validation failed', result.error.issues);
  }

  await db
    .update(users)
    .set({ name: result.data.name, updatedAt: new Date() })
    .where(eq(users.id, session.user.id));

  const [updated] = await db
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

  if (!updated) {
    throw notFound('User not found');
  }

  return c.json({ user: updated });
});
