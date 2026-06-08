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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[page]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    const pageSlug = route.params.page;
    provide(portfolioSlugKey, slug);
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
    const [{ data: portfolioAwaitedData, error: portfolioAwaitedError }, { data: pagesAwaitedData }] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
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
    const headerContent = computed(
      () => headerBlock.value?.content
    );
    const footerContent = computed(
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
      _push(ssrRenderComponent(_component_PortfolioLayout, mergeProps({
        "css-vars": unref(cssVars),
        "portfolio-mode": unref(portfolioMode),
        "site-name": unref(p).title || unref(p).slug || "",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/p/[slug]/[page].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_page_-B-iQx51Q.mjs.map
