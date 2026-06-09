import { p as portfolioSlugKey, d as usePortfolio, _ as __nuxt_component_0 } from './usePortfolio-CK_RoBPh.mjs';
import { _ as __nuxt_component_3 } from './Renderer-Czl07ndm.mjs';
import { av as useRoute, a9 as useAsyncData, m as createError, ax as useSeoMeta, am as useHead } from './server.mjs';
import { u as usePageBlocks, a as useRequestURL } from './url-DZmzzBYU.mjs';
import { o as vueExports, f as ssrRenderComponent_1, g as ssrRenderList_1 } from '../routes/renderer.mjs';
import './Main-DmrC9lpa.mjs';
import './overlay-BWwBD9XH.mjs';
import './usePrefix-DEbZTxVe.mjs';
import '../_/shared.cjs.prod.mjs';
import '../_/index.mjs';
import './collectionTypes-6EiXkZ_r.mjs';
import './Separator-Bd9m4VAI.mjs';
import '../nitro/nitro.mjs';
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
import 'node:stream';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "[page]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    const pageSlug = route.params.page;
    vueExports.provide(portfolioSlugKey, slug);
    const {
      portfolioMode,
      cssVars,
      googleFontsUrl,
      navLinks,
      headerBlock,
      footerBlock,
      baseURL,
      logoLight,
      logoDark
    } = usePortfolio(slug);
    const [{ data: portfolioAwaitedData, error: portfolioAwaitedError }, { data: pagesAwaitedData }] = ([__temp, __restore] = vueExports.withAsyncContext(() => Promise.all([
      useAsyncData(
        `portfolio-${slug}`,
        () => $fetch(`/api/portfolios/${slug}`, { baseURL })
      ),
      useAsyncData(
        `portfolio-${slug}-pages`,
        () => $fetch(`/api/portfolios/${slug}/pages`, { baseURL })
      )
    ])), __temp = await __temp, __restore(), __temp);
    const { contentBlocks } = usePageBlocks(slug, pageSlug);
    const headerContent = vueExports.computed(
      () => headerBlock.value?.content
    );
    const footerContent = vueExports.computed(
      () => footerBlock.value?.content
    );
    const canonicalUrl = `${useRequestURL().origin}/p/${slug}/${pageSlug}`;
    if (portfolioAwaitedError.value || !portfolioAwaitedData.value?.portfolio) {
      throw createError({ statusCode: 404, statusMessage: "Portfolio not found" });
    }
    const currentPage = (pagesAwaitedData.value?.pages ?? []).find((p2) => p2.slug === pageSlug) ?? null;
    if (!currentPage) {
      throw createError({ statusCode: 404, statusMessage: "Page not found" });
    }
    const p = portfolioAwaitedData.value.portfolio;
    const portfolioSeoMeta = p.seoMeta;
    useSeoMeta({
      title: currentPage.seoTitle || currentPage.title || portfolioSeoMeta?.seoTitle || p.title || "Portfolio",
      ogTitle: currentPage.seoTitle || currentPage.title || portfolioSeoMeta?.seoTitle || p.title || "Portfolio",
      description: currentPage.seoDescription || portfolioSeoMeta?.seoDescription || p.description || void 0,
      ogDescription: currentPage.seoDescription || portfolioSeoMeta?.seoDescription || p.description || void 0,
      ogImage: currentPage.seoOgImageUrl || p.ogImageUrl || void 0,
      ogUrl: canonicalUrl
    });
    useHead({
      link: [{ rel: "sitemap", type: "application/xml", href: `/p/${slug}/sitemap.xml` }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PortfolioLayout = __nuxt_component_0;
      const _component_BlocksRenderer = __nuxt_component_3;
      _push(ssrRenderComponent_1(_component_PortfolioLayout, vueExports.mergeProps({
        "css-vars": vueExports.unref(cssVars),
        "portfolio-mode": vueExports.unref(portfolioMode),
        "site-name": vueExports.unref(p).title || vueExports.unref(p).slug || "",
        "home-url": `/p/${vueExports.unref(slug)}`,
        "nav-links": vueExports.unref(navLinks),
        "header-content": vueExports.unref(headerContent),
        "footer-content": vueExports.unref(footerContent),
        "google-fonts-url": vueExports.unref(googleFontsUrl),
        "logo-url": vueExports.unref(logoLight),
        "logo-url-dark": vueExports.unref(logoDark)
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList_1(vueExports.unref(contentBlocks), (block) => {
              _push2(ssrRenderComponent_1(_component_BlocksRenderer, {
                key: block.id,
                block
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(contentBlocks), (block) => {
                return vueExports.openBlock(), vueExports.createBlock(_component_BlocksRenderer, {
                  key: block.id,
                  block
                }, null, 8, ["block"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/p/[slug]/[page].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_page_-BaDKw-FY.mjs.map
