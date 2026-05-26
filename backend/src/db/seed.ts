import '../lib/auth.js'; // ensure better-auth is initialized before db client
import { eq } from 'drizzle-orm';
import { db } from './client.js';
import { users, portfolios } from './schema/index.js';
import { auth } from '../lib/auth.js';

const seeds = [
  {
    name: 'Martin Södersten',
    email: 'martin.sodersten@chasacademy.se',
    password: 'Martin1234!',
    slug: 'martin',
  },
  {
    name: 'Ida Öhlén',
    email: 'ida-alexandra.ohlen@chasacademy.se',
    password: 'Ida1234!',
    slug: 'ida',
  },
];

async function seed() {
  for (const user of seeds) {
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, user.email));

    if (existing.length > 0) {
      console.log(`Skipping ${user.email} — already exists`);
      continue;
    }

    const result = await auth.api.signUpEmail({
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    if (!result?.user?.id) {
      console.error(`Failed to create user ${user.email}`);
      continue;
    }

    // Mark email as verified so they can log in immediately
    await db.update(users).set({ emailVerified: true }).where(eq(users.id, result.user.id));

    const slugExists = await db
      .select({ id: portfolios.id })
      .from(portfolios)
      .where(eq(portfolios.slug, user.slug));

    if (slugExists.length === 0) {
      await db.insert(portfolios).values({ userId: result.user.id, slug: user.slug });
    }

    console.log(`Created ${user.email} with portfolio slug "${user.slug}"`);
  }

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
