import { p as portfolioSlugKey, d as usePortfolio, _ as __nuxt_component_0 } from './usePortfolio-DF7bLLR2.mjs';
import { _ as __nuxt_component_3 } from './Renderer-BcdheZ52.mjs';
import { aO as vueExports, aG as useRoute, ak as useAsyncData, m as createError, aI as useSeoMeta, ax as useHead, a7 as ssrRenderComponent_1, a8 as ssrRenderList_1 } from './server.mjs';
import { u as usePageBlocks, a as useRequestURL } from './url-kg4mDMg0.mjs';
import './Main-CoIIuktv.mjs';
import './overlay-BWwBD9XH.mjs';
import './usePrefix-DEbZTxVe.mjs';
import '../_/shared.cjs.prod.mjs';
import '../_/index.mjs';
import '../routes/renderer.mjs';
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
import './collectionTypes-6EiXkZ_r.mjs';
import './Separator-CgixisDT.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    vueExports.provide(portfolioSlugKey, slug);
    const {
      portfolio,
      portfolioError,
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
    [__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      `portfolio-${slug}`,
      () => $fetch(`/api/portfolios/${slug}`, { baseURL })
    )), await __temp, __restore();
    const { contentBlocks } = usePageBlocks(slug, "home");
    const headerContent = vueExports.computed(
      () => headerBlock.value?.content
    );
    const footerContent = vueExports.computed(
      () => footerBlock.value?.content
    );
    if (portfolioError.value || !portfolio.value) {
      throw createError({ statusCode: 404, statusMessage: "Portfolio not found" });
    }
    const seoMeta = vueExports.computed(
      () => portfolio.value?.seoMeta
    );
    const pageTitle = vueExports.computed(
      () => seoMeta.value?.seoTitle || portfolio.value?.title || "Portfolio"
    );
    const canonicalUrl = `${useRequestURL().origin}/p/${slug}`;
    useSeoMeta({
      title: () => pageTitle.value,
      ogTitle: () => pageTitle.value,
      description: () => seoMeta.value?.seoDescription ?? portfolio.value?.description ?? void 0,
      ogDescription: () => seoMeta.value?.seoDescription ?? portfolio.value?.description ?? void 0,
      ogImage: () => portfolio.value?.ogImageUrl ?? void 0,
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
        "site-name": vueExports.unref(portfolio)?.title || vueExports.unref(portfolio)?.slug || "",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/p/[slug]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BtyFbedT.mjs.map
