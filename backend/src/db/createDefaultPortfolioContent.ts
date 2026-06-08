import { db } from './client.js';
import { pages, blocks } from './schema/index.js';

const defaultPages = [
  { title: 'Home', slug: 'home', isPublished: true, showInMenu: false, sortOrder: 0, isMandatory: true },
  { title: 'About', slug: 'about', isPublished: true, showInMenu: true, sortOrder: 1, isMandatory: false },
  { title: 'Projects', slug: 'projects', isPublished: true, showInMenu: true, sortOrder: 2, isMandatory: false },
  { title: 'Contact', slug: 'contact', isPublished: true, showInMenu: true, sortOrder: 3, isMandatory: false },
];

export async function createDefaultPortfolioContent(portfolioId: string, title: string) {
  const pageRows = defaultPages.map(p => ({ ...p, id: crypto.randomUUID(), portfolioId }));
  await db.insert(pages).values(pageRows);

  const heroContentBySlug: Record<string, { heading: string; subheading: string }> = {
    home: { heading: title, subheading: '' },
    about: { heading: 'About Me', subheading: 'Learn more about who I am and what I do.' },
    projects: { heading: 'Projects', subheading: 'A selection of things I have built.' },
    contact: { heading: 'Contact', subheading: "I'd love to hear from you. Let's talk." },
  };

  for (const page of pageRows) {
    const heroContent = heroContentBySlug[page.slug] ?? { heading: page.slug, subheading: '' };
    await db.insert(blocks).values([
      {
        pageId: page.id,
        type: 'header',
        sortOrder: 0,
        isVisible: true,
        isMandatory: true,
        content: {
          siteName: title,
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
          logoSize: 'md',
          logoStacked: false,
          brandingDisplay: 'logo-and-title',
          background: null,
          navStyle: { variant: 'ghost', radius: 'md', size: 'sm', spacing: 4, uppercase: false, letterSpacing: 0 },
          ctaStyle: { variant: 'solid', radius: 'md', size: 'sm', spacing: 4, uppercase: false, letterSpacing: 0 },
          padding: 16,
          borderWidth: 1,
          maxWidth: '7xl',
          position: 'static',
          mobileMenuTitle: '',
          mobileBackground: null,
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
          subheading: `<p>${heroContent.subheading}</p>`,
          alignH: 'center',
          alignV: 'center',
          showButton1: true,
          button1Label: 'View my work',
          button1Url: '#projects',
          button1Style: { variant: 'solid', radius: 'md', size: 'md', spacing: 4, uppercase: false, letterSpacing: 0 },
          showButton2: true,
          button2Label: 'Get in touch',
          button2Url: '#contact',
          button2Style: { variant: 'outline', radius: 'md', size: 'md', spacing: 4, uppercase: false, letterSpacing: 0 },
          image: null,
          imagePosition: 'right',
          headingFont: null,
          background: null,
          backgroundImage: null,
          backgroundFixed: false,
          overlayEnabled: false,
          overlayType: 'solid',
          overlayColor: null,
          overlayColor2: null,
          overlayDegree: 180,
          overlayOpacity: 40,
          textShadow: false,
          fullHeight: false,
          height: 500,
          maxWidth: 'md',
        },
        styles: {},
      },
      {
        pageId: page.id,
        type: 'footer',
        sortOrder: 9999,
        isVisible: true,
        isMandatory: true,
        content: { siteName: title, copyrightText: '' },
        styles: {},
      },
    ]);
  }
}
