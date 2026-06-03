import '../lib/auth.js'; // ensure better-auth is initialized before db client
import { eq } from 'drizzle-orm';
import { db } from './client.js';
import { users, portfolios, pages, blocks, collections, collectionItems } from './schema/index.js';
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
    collections: [
      {
        type: 'projects',
        name: 'Projects',
        items: [
          {
            isPublished: true,
            sortOrder: 0,
            data: {
              title: 'E-commerce Platform',
              description: 'A full-stack online store built with Next.js and Stripe.',
              time: '2024',
              tags: ['Next.js', 'TypeScript', 'Stripe'],
            },
          },
          {
            isPublished: true,
            sortOrder: 1,
            data: {
              title: 'Real-time Chat App',
              description: 'WebSocket-based chat with rooms and presence indicators.',
              time: '2023',
              tags: ['Node.js', 'Socket.io', 'React'],
            },
          },
          {
            isPublished: true,
            sortOrder: 2,
            data: {
              title: 'CLI Task Manager',
              description: 'A terminal-based productivity tool written in Go.',
              time: '2023',
              tags: ['Go', 'CLI'],
            },
          },
        ],
      },
      {
        type: 'experiences',
        name: 'Experiences',
        items: [
          {
            isPublished: true,
            sortOrder: 0,
            data: {
              title: 'Fullstack Developer',
              place: 'Spotify',
              location: 'Stockholm',
              time: '2022 – present',
              description: 'Building internal tooling and developer platform features.',
              tags: ['React', 'Python', 'Kubernetes'],
            },
          },
          {
            isPublished: true,
            sortOrder: 1,
            data: {
              title: 'Frontend Developer',
              place: 'Klarna',
              location: 'Stockholm',
              time: '2020 – 2022',
              description: 'Worked on the consumer checkout experience across multiple markets.',
              tags: ['React', 'TypeScript', 'A/B Testing'],
            },
          },
        ],
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
    collections: [
      {
        type: 'projects',
        name: 'Projects',
        items: [
          {
            isPublished: true,
            sortOrder: 0,
            data: {
              title: 'Portfolio Builder',
              description:
                'A drag-and-drop portfolio builder with live theming and block-based pages.',
              time: '2025',
              tags: ['Vue', 'Nuxt', 'Hono', 'Drizzle'],
            },
          },
          {
            isPublished: true,
            sortOrder: 1,
            data: {
              title: 'Design System',
              description: 'Component library and design token system for a fintech startup.',
              time: '2024',
              tags: ['Figma', 'Storybook', 'CSS'],
            },
          },
        ],
      },
      {
        type: 'experiences',
        name: 'Experiences',
        items: [
          {
            isPublished: true,
            sortOrder: 0,
            data: {
              title: 'UX Engineer',
              place: 'IKEA Digital',
              location: 'Malmö',
              time: '2023 – present',
              description: 'Bridging design and engineering for the IKEA web platform.',
              tags: ['Vue', 'Figma', 'Accessibility'],
            },
          },
          {
            isPublished: true,
            sortOrder: 1,
            data: {
              title: 'Frontend Developer',
              place: 'Tretton37',
              location: 'Remote',
              time: '2021 – 2023',
              description:
                'Consulting on frontend architecture and UI component design for various clients.',
              tags: ['React', 'TypeScript', 'GraphQL'],
            },
          },
          {
            isPublished: true,
            sortOrder: 2,
            data: {
              title: 'Web Developer Intern',
              place: 'Chas Academy',
              location: 'Stockholm',
              time: '2020',
              description: 'Developed internal tools and helped with the student portal.',
              tags: ['HTML', 'CSS', 'JavaScript'],
            },
          },
        ],
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

    // --- Delete and recreate pages + blocks ---
    const existingPages = await db
      .select({ id: pages.id })
      .from(pages)
      .where(eq(pages.portfolioId, portfolio.id));

    for (const page of existingPages) {
      await db.delete(blocks).where(eq(blocks.pageId, page.id));
    }
    await db.delete(pages).where(eq(pages.portfolioId, portfolio.id));

    const allPages = await db
      .insert(pages)
      .values(defaultPages.map(p => ({ ...p, portfolioId: portfolio.id })))
      .returning({ id: pages.id, slug: pages.slug });
    console.log(`  Created ${allPages.length} pages`);

    // --- Create blocks for each page ---
    const heroContentBySlug: Record<string, { heading: string; subheading: string }> = {
      home: { heading: user.title, subheading: user.description },
      about: { heading: 'About Me', subheading: 'Learn more about who I am and what I do.' },
      projects: { heading: 'Projects', subheading: 'A selection of things I have built.' },
      contact: { heading: 'Contact', subheading: "I'd love to hear from you. Let's talk." },
    };

    for (const page of allPages) {
      const heroContent = heroContentBySlug[page.slug] ?? { heading: page.slug, subheading: '' };

      await db.insert(blocks).values([
        {
          pageId: page.id,
          type: 'header',
          sortOrder: 0,
          isVisible: true,
          isMandatory: true,
          content: {
            siteName: user.title,
            layout: 'single',
            leftOrder: ['logo', 'nav'],
            centerOrder: [],
            rightOrder: ['cta'],
            topOrder: ['logo'],
            ctaButtons: [{ id: crypto.randomUUID(), label: 'Hire me', url: '#contact', style: 'filled' }],
            socialLinks: [],
            showLogo: true,
            showNav: true,
            showCta: true,
            showSocials: false,
            showColorModeToggle: false,
            brandingDisplay: 'logo-and-title',
            background: null,
            textColor: null,
            logoTint: null,
            logoDark: false,
            navStyle: 'plain',
            height: 'normal',
          },
          styles: {},
        },
        {
          pageId: page.id,
          type: 'hero',
          sortOrder: 1,
          isVisible: true,
          isMandatory: false,
          content: {
            heading: heroContent.heading,
            subheading: heroContent.subheading,
            ctaButtons: [
              { id: crypto.randomUUID(), label: 'View my work', url: '#projects' },
              { id: crypto.randomUUID(), label: 'Get in touch', url: '#contact' },
            ],
          },
          styles: {},
        },
        {
          pageId: page.id,
          type: 'footer',
          sortOrder: 9999,
          isVisible: true,
          isMandatory: true,
          content: { siteName: user.title, copyrightText: '' },
          styles: {},
        },
      ]);
      console.log(`  Created blocks for "${page.slug}"`);
    }

    // --- Delete and recreate collections + items ---
    await db.delete(collections).where(eq(collections.portfolioId, portfolio.id));

    for (const [i, col] of user.collections.entries()) {
      const [inserted] = await db
        .insert(collections)
        .values({ portfolioId: portfolio.id, type: col.type, name: col.name, sortOrder: i })
        .returning({ id: collections.id });

      if (!inserted) continue;

      if (col.items.length) {
        await db
          .insert(collectionItems)
          .values(col.items.map(item => ({ collectionId: inserted.id, ...item })));
      }

      console.log(`  Created collection "${col.name}" with ${col.items.length} items`);
    }
  }

  console.log('Seed complete');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
