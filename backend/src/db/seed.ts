import '../lib/auth.js'; // ensure better-auth is initialized before db client
import { eq } from 'drizzle-orm';
import { db } from './client.js';
import { users, portfolios, pages } from './schema/index.js';
import { auth } from '../lib/auth.js';

const defaultPages = [
  {
    title: 'Home',
    slug: 'home',
    isPublished: true,
    showInMenu: false,
    sortOrder: 0,
    isMandatory: true,
  },
  {
    title: 'About',
    slug: 'about',
    isPublished: true,
    showInMenu: true,
    sortOrder: 1,
    isMandatory: false,
  },
  {
    title: 'Projects',
    slug: 'projects',
    isPublished: true,
    showInMenu: true,
    sortOrder: 2,
    isMandatory: false,
  },
  {
    title: 'Contact',
    slug: 'contact',
    isPublished: true,
    showInMenu: true,
    sortOrder: 3,
    isMandatory: false,
  },
];

const seeds = [
  {
    name: 'Martin Södersten',
    email: 'martin.sodersten@chasacademy.se',
    password: 'Martin1234!',
    slug: 'martin',
    title: 'Martin Södersten',
    description: "Martin's Portfolio",
  },
  {
    name: 'Ida Öhlén',
    email: 'ida-alexandra.ohlen@chasacademy.se',
    password: 'Ida1234!',
    slug: 'ida',
    title: 'Ida Öhlén',
    description: "Ida's Portfolio",
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

    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
    const result = await auth.api.signUpEmail({
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        callbackURL: `${frontendUrl}/verified`,
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
      const [portfolio] = await db
        .insert(portfolios)
        .values({
          userId: result.user.id,
          slug: user.slug,
          isPublished: true,
          title: user.title,
          description: user.description,
        })
        .returning({ id: portfolios.id });

      if (portfolio) {
        await db.insert(pages).values(defaultPages.map(p => ({ ...p, portfolioId: portfolio.id })));
      }
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
