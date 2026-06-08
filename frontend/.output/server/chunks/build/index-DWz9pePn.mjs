import { p as portfolioSlugKey, d as usePortfolio, _ as __nuxt_component_0 } from './usePortfolio-CUdxQeA9.mjs';
import { _ as __nuxt_component_3 } from './Renderer-BaU1WY6M.mjs';
import { defineComponent, provide, withAsyncContext, computed, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { a8 as useRoute, O as useAsyncData, l as createError, aa as useSeoMeta, a1 as useHead } from './server.mjs';
import { u as usePageBlocks, a as useRequestURL } from './url-kg4mDMg0.mjs';
import './Main-CoIIuktv.mjs';
import './overlay-BWwBD9XH.mjs';
import '@vueuse/core';
import 'aria-hidden';
import '@vueuse/shared';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import './usePrefix-DEbZTxVe.mjs';
import 'sortablejs';
import '@tiptap/vue-3';
import '@tiptap/starter-kit';
import '@tiptap/extension-text-align';
import '@tiptap/extension-placeholder';
import './collectionTypes-6EiXkZ_r.mjs';
import './Separator-CgixisDT.mjs';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'perfect-debounce';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    provide(portfolioSlugKey, slug);
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
    [__temp, __restore] = withAsyncContext(() => useAsyncData(
      `portfolio-${slug}`,
      () => $fetch(`/api/portfolios/${slug}`, { baseURL })
    )), await __temp, __restore();
    const { contentBlocks } = usePageBlocks(slug, "home");
    const headerContent = computed(
      () => headerBlock.value?.content
    );
    const footerContent = computed(
      () => footerBlock.value?.content
    );
    if (portfolioError.value || !portfolio.value) {
      throw createError({ statusCode: 404, statusMessage: "Portfolio not found" });
    }
    const seoMeta = computed(
      () => portfolio.value?.seoMeta
    );
    const pageTitle = computed(
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
      _push(ssrRenderComponent(_component_PortfolioLayout, mergeProps({
        "css-vars": unref(cssVars),
        "portfolio-mode": unref(portfolioMode),
        "site-name": unref(portfolio)?.title || unref(portfolio)?.slug || "",
        "home-url": `/p/${unref(slug)}`,
        "nav-links": unref(navLinks),
        "header-content": unref(headerContent),
        "footer-content": unref(footerContent),
        "google-fonts-url": unref(googleFontsUrl),
        "logo-url": unref(logoLight),
        "logo-url-dark": unref(logoDark)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(contentBlocks), (block) => {
              _push2(ssrRenderComponent(_component_BlocksRenderer, {
                key: block.id,
                block
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(contentBlocks), (block) => {
                return openBlock(), createBlock(_component_BlocksRenderer, {
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
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/p/[slug]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DWz9pePn.mjs.map
