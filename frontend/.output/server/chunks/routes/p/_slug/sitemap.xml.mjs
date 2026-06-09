import { e as defineEventHandler, w as getRouterParam, L as useRuntimeConfig, c as createError, J as setResponseHeader } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'node:util';
import 'node:process';
import 'node:tty';

const sitemap_xml = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const config = useRuntimeConfig(event);
  const apiBase = config.apiUrl;
  const frontendBase = config.public.frontendUrl;
  let pages;
  try {
    const [portfolioRes, pagesRes] = await Promise.all([
      $fetch(`/api/portfolios/${slug}`, { baseURL: apiBase }),
      $fetch(`/api/portfolios/${slug}/pages`, {
        baseURL: apiBase
      })
    ]);
    void portfolioRes;
    pages = pagesRes.pages;
  } catch {
    throw createError({ statusCode: 404, statusMessage: "Portfolio not found" });
  }
  const urls = pages.map((page) => {
    const loc = page.slug === "home" ? `${frontendBase}/p/${slug}` : `${frontendBase}/p/${slug}/${page.slug}`;
    const lastmod = new Date(page.updatedAt).toISOString().split("T")[0];
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
  }).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  setResponseHeader(event, "Content-Type", "application/xml; charset=UTF-8");
  return xml;
});

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
