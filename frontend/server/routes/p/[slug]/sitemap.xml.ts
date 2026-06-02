export default defineEventHandler(async event => {
  const slug = getRouterParam(event, 'slug') as string;
  const config = useRuntimeConfig(event);
  const apiBase = config.apiUrl as string;
  const frontendBase = config.public.frontendUrl as string;

  // Fetch portfolio — backend returns 404 if not found or not published
  let pages: { slug: string; updatedAt: string }[];
  try {
    const [portfolioRes, pagesRes] = await Promise.all([
      $fetch<{ portfolio: unknown }>(`/api/portfolios/${slug}`, { baseURL: apiBase }),
      $fetch<{ pages: { slug: string; updatedAt: string }[] }>(`/api/portfolios/${slug}/pages`, {
        baseURL: apiBase,
      }),
    ]);
    void portfolioRes; // existence confirmed — 404 would have thrown
    pages = pagesRes.pages;
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Portfolio not found' });
  }

  const urls = pages
    .map(page => {
      const loc =
        page.slug === 'home'
          ? `${frontendBase}/p/${slug}`
          : `${frontendBase}/p/${slug}/${page.slug}`;
      const lastmod = new Date(page.updatedAt).toISOString().split('T')[0];
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  setResponseHeader(event, 'Content-Type', 'application/xml; charset=UTF-8');
  return xml;
});
