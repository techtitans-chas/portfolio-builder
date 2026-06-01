import '../lib/auth.js'; // ensure better-auth is initialized before db client
import { eq } from 'drizzle-orm';
import { db } from './client.js';
import { users, portfolios, pages, blocks, projects, experiences } from './schema/index.js';
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
    projects: [
      {
        title: 'E-commerce Platform',
        description: 'A full-stack online store built with Next.js and Stripe.',
        time: '2024',
        isPublished: true,
        sortOrder: 0,
        tags: ['Next.js', 'TypeScript', 'Stripe'],
        links: [],
      },
      {
        title: 'Real-time Chat App',
        description: 'WebSocket-based chat with rooms and presence indicators.',
        time: '2023',
        isPublished: true,
        sortOrder: 1,
        tags: ['Node.js', 'Socket.io', 'React'],
        links: [],
      },
      {
        title: 'CLI Task Manager',
        description: 'A terminal-based productivity tool written in Go.',
        time: '2023',
        isPublished: true,
        sortOrder: 2,
        tags: ['Go', 'CLI'],
        links: [],
      },
    ],
    experiences: [
      {
        title: 'Fullstack Developer',
        place: 'Spotify',
        location: 'Stockholm',
        time: '2022 – present',
        description: 'Building internal tooling and developer platform features.',
        isPublished: true,
        sortOrder: 0,
        tags: ['React', 'Python', 'Kubernetes'],
      },
      {
        title: 'Frontend Developer',
        place: 'Klarna',
        location: 'Stockholm',
        time: '2020 – 2022',
        description: 'Worked on the consumer checkout experience across multiple markets.',
        isPublished: true,
        sortOrder: 1,
        tags: ['React', 'TypeScript', 'A/B Testing'],
      },
    ],
  },
  {
    name: 'Ida Öhlén',
    email: 'ida-alexandra.ohlen@chasacademy.se',
    password: 'Ida1234!',
    slug: 'ida',
    title: 'Ida Öhlén',
    description: "Ida's Portfolio",
    projects: [
      {
        title: 'Portfolio Builder',
        description: 'A drag-and-drop portfolio builder with live theming and block-based pages.',
        time: '2025',
        isPublished: true,
        sortOrder: 0,
        tags: ['Vue', 'Nuxt', 'Hono', 'Drizzle'],
        links: [],
      },
      {
        title: 'Design System',
        description: 'Component library and design token system for a fintech startup.',
        time: '2024',
        isPublished: true,
        sortOrder: 1,
        tags: ['Figma', 'Storybook', 'CSS'],
        links: [],
      },
    ],
    experiences: [
      {
        title: 'UX Engineer',
        place: 'IKEA Digital',
        location: 'Malmö',
        time: '2023 – present',
        description: 'Bridging design and engineering for the IKEA web platform.',
        isPublished: true,
        sortOrder: 0,
        tags: ['Vue', 'Figma', 'Accessibility'],
      },
      {
        title: 'Frontend Developer',
        place: 'Tretton37',
        location: 'Remote',
        time: '2021 – 2023',
        description:
          'Consulting on frontend architecture and UI component design for various clients.',
        isPublished: true,
        sortOrder: 1,
        tags: ['React', 'TypeScript', 'GraphQL'],
      },
      {
        title: 'Web Developer Intern',
        place: 'Chas Academy',
        location: 'Stockholm',
        time: '2020',
        description: 'Developed internal tools and helped with the student portal.',
        isPublished: true,
        sortOrder: 2,
        tags: ['HTML', 'CSS', 'JavaScript'],
      },
    ],
  },
];

async function seed() {
  for (const user of seeds) {
    // --- Ensure user exists ---
    let [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, user.email));

    if (!existingUser) {
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

      await db.update(users).set({ emailVerified: true }).where(eq(users.id, result.user.id));
      existingUser = { id: result.user.id };
      console.log(`Created user ${user.email}`);
    } else {
      console.log(`User ${user.email} already exists, checking for missing seed data…`);
    }

    // --- Ensure portfolio exists ---
    let [portfolio] = await db
      .select({ id: portfolios.id })
      .from(portfolios)
      .where(eq(portfolios.slug, user.slug));

    if (!portfolio) {
      [portfolio] = await db
        .insert(portfolios)
        .values({
          userId: existingUser.id,
          slug: user.slug,
          isPublished: true,
          title: user.title,
          description: user.description,
        })
        .returning({ id: portfolios.id });
      console.log(`  Created portfolio "${user.slug}"`);
    }

    if (!portfolio) continue;

    // --- Ensure pages exist ---
    const existingPages = await db
      .select({ id: pages.id, slug: pages.slug })
      .from(pages)
      .where(eq(pages.portfolioId, portfolio.id));

    let allPages = existingPages;
    if (existingPages.length === 0) {
      allPages = await db
        .insert(pages)
        .values(defaultPages.map(p => ({ ...p, portfolioId: portfolio.id })))
        .returning({ id: pages.id, slug: pages.slug });
      console.log(`  Created ${allPages.length} pages`);
    }

    // --- Ensure layout blocks exist on home page ---
    const homePage = allPages.find(p => p.slug === 'home');
    if (homePage) {
      const existingBlocks = await db
        .select({ id: blocks.id })
        .from(blocks)
        .where(eq(blocks.pageId, homePage.id));

      if (existingBlocks.length === 0) {
        await db.insert(blocks).values([
          {
            pageId: homePage.id,
            type: 'header',
            sortOrder: 0,
            isVisible: true,
            isMandatory: true,
            content: { siteName: user.title, cta: { label: 'Hire me', url: '#contact' } },
            styles: {},
          },
          {
            pageId: homePage.id,
            type: 'hero',
            sortOrder: 1,
            isVisible: true,
            isMandatory: false,
            content: {
              heading: user.title,
              subheading: user.description,
              primaryCta: { label: 'View my work', url: '#projects' },
              secondaryCta: { label: 'Get in touch', url: '#contact' },
            },
            styles: {},
          },
          {
            pageId: homePage.id,
            type: 'footer',
            sortOrder: 9999,
            isVisible: true,
            isMandatory: true,
            content: { siteName: user.title, copyrightText: '' },
            styles: {},
          },
        ]);
        console.log(`  Created layout blocks`);
      }
    }

    // --- Ensure projects exist ---
    const [existingProject] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.portfolioId, portfolio.id));

    if (!existingProject) {
      await db
        .insert(projects)
        .values(user.projects.map(p => ({ ...p, portfolioId: portfolio.id })));
      console.log(`  Created ${user.projects.length} projects`);
    }

    // --- Ensure experiences exist ---
    const [existingExperience] = await db
      .select({ id: experiences.id })
      .from(experiences)
      .where(eq(experiences.portfolioId, portfolio.id));

    if (!existingExperience) {
      await db
        .insert(experiences)
        .values(user.experiences.map(e => ({ ...e, portfolioId: portfolio.id })));
      console.log(`  Created ${user.experiences.length} experiences`);
    }
  }

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
