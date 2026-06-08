import { p as portfolioSlugKey, d as usePortfolio, _ as __nuxt_component_0, v as visibleTags, s as sanitizeHtml } from './usePortfolio-CUdxQeA9.mjs';
import { defineComponent, provide, withAsyncContext, computed, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { g as getCollectionType } from './collectionTypes-6EiXkZ_r.mjs';
import { a8 as useRoute, l as createError, O as useAsyncData, aa as useSeoMeta } from './server.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProjectDetail",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const tags = computed(() => visibleTags(props.item.data.tags ?? []));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "px-8 py-16 max-w-3xl mx-auto" }, _attrs))}>`);
      if (__props.item.data.previewImageUrl) {
        _push(`<div class="w-full h-64 rounded-2xl overflow-hidden mb-8"><img${ssrRenderAttr("src", __props.item.data.previewImageUrl)}${ssrRenderAttr("alt", __props.item.data.title)} class="w-full h-full object-cover"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 class="text-4xl font-bold mb-3" style="${ssrRenderStyle({ fontFamily: "var(--font-heading)", color: "var(--text-primary)" })}">${ssrInterpolate(__props.item.data.title)}</h1><div class="flex flex-wrap items-center gap-3 mb-6">`);
      if (__props.item.data.time) {
        _push(`<span class="text-sm" style="${ssrRenderStyle({ color: "var(--text-secondary)" })}">${ssrInterpolate(__props.item.data.time)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(tags), (tag) => {
        _push(`<span class="text-xs px-2 py-0.5 rounded-full" style="${ssrRenderStyle({
          backgroundColor: "color-mix(in srgb, var(--primary) 15%, var(--bg-surface))",
          color: "var(--primary)"
        })}">${ssrInterpolate(tag)}</span>`);
      });
      _push(`<!--]--></div>`);
      if (__props.item.data.description) {
        _push(`<p class="text-lg mb-8 leading-relaxed" style="${ssrRenderStyle({ color: "var(--text-secondary)" })}">${ssrInterpolate(__props.item.data.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.pageBody) {
        _push(`<div class="rich-text" style="${ssrRenderStyle({ color: "var(--text-primary)" })}">${unref(sanitizeHtml)(__props.item.pageBody) ?? ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/collection-pages/ProjectDetail.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "CollectionPagesProjectDetail" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PostDetail",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const tags = computed(() => visibleTags(props.item.data.tags ?? []));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "px-8 py-16 max-w-3xl mx-auto" }, _attrs))}>`);
      if (unref(tags).length) {
        _push(`<div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
        ssrRenderList(unref(tags), (tag) => {
          _push(`<span class="text-xs px-2 py-0.5 rounded-full" style="${ssrRenderStyle({
            backgroundColor: "color-mix(in srgb, var(--primary) 25%, var(--bg-page))",
            color: "var(--primary)"
          })}">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 class="text-4xl font-bold mb-4 leading-tight" style="${ssrRenderStyle({ fontFamily: "var(--font-heading)", color: "var(--text-primary)" })}">${ssrInterpolate(__props.item.data.title)}</h1><div class="flex items-center gap-2 mb-6 text-sm" style="${ssrRenderStyle({ color: "var(--text-secondary)" })}">`);
      if (__props.item.data.author) {
        _push(`<span class="font-semibold uppercase tracking-wide">${ssrInterpolate(__props.item.data.author)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.author && __props.item.data.date) {
        _push(`<span>/</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.date) {
        _push(`<span>${ssrInterpolate(__props.item.data.date)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.item.data.excerpt) {
        _push(`<p class="text-base mb-8 leading-relaxed italic" style="${ssrRenderStyle({ color: "var(--text-secondary)" })}">${ssrInterpolate(__props.item.data.excerpt)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.data.coverImageUrl) {
        _push(`<div class="w-full rounded-2xl overflow-hidden mb-8"><img${ssrRenderAttr("src", __props.item.data.coverImageUrl)}${ssrRenderAttr("alt", __props.item.data.title)} class="w-full object-cover"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.item.pageBody) {
        _push(`<div class="rich-text" style="${ssrRenderStyle({ color: "var(--text-primary)" })}">${unref(sanitizeHtml)(__props.item.pageBody) ?? ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/collection-pages/PostDetail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "CollectionPagesPostDetail" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[itemId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    const collectionType = route.params.collectionType;
    const itemId = route.params.itemId;
    provide(portfolioSlugKey, slug);
    const typeDef = getCollectionType(collectionType);
    if (!typeDef?.pageTemplate) {
      throw createError({ statusCode: 404, statusMessage: "Page not found" });
    }
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
    const [{ error: portfolioAwaitedError }, { data: itemData, error: itemError }] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      useAsyncData(
        `portfolio-${slug}`,
        () => $fetch(`/api/portfolios/${slug}`, { baseURL })
      ),
      useAsyncData(
        `portfolio-${slug}-${collectionType}-${itemId}`,
        () => $fetch(
          `/api/portfolios/${slug}/collections/${collectionType}/${itemId}`,
          { baseURL }
        )
      )
    ])), __temp = await __temp, __restore(), __temp);
    if (portfolioAwaitedError.value || portfolioError.value || !portfolio.value) {
      throw createError({ statusCode: 404, statusMessage: "Portfolio not found" });
    }
    if (itemError.value || !itemData.value?.item) {
      throw createError({ statusCode: 404, statusMessage: "Item not found" });
    }
    const item = itemData.value.item;
    const headerContent = computed(
      () => headerBlock.value?.content
    );
    const footerContent = computed(
      () => footerBlock.value?.content
    );
    const p = portfolio.value;
    const portfolioSeoMeta = p.seoMeta;
    const itemTitle = item.data.title || typeDef.label;
    useSeoMeta({
      title: `${itemTitle} — ${p.title || portfolioSeoMeta?.seoTitle || "Portfolio"}`,
      ogTitle: itemTitle,
      description: item.data.description || portfolioSeoMeta?.seoDescription || void 0,
      ogDescription: item.data.description || portfolioSeoMeta?.seoDescription || void 0,
      ogImage: item.data.previewImageUrl || p.ogImageUrl || void 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PortfolioLayout = __nuxt_component_0;
      const _component_CollectionPagesProjectDetail = __nuxt_component_1;
      const _component_CollectionPagesPostDetail = __nuxt_component_2;
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
            if (unref(typeDef).pageTemplate === "ProjectDetail") {
              _push2(ssrRenderComponent(_component_CollectionPagesProjectDetail, { item: unref(item) }, null, _parent2, _scopeId));
            } else if (unref(typeDef).pageTemplate === "PostDetail") {
              _push2(ssrRenderComponent(_component_CollectionPagesPostDetail, { item: unref(item) }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(typeDef).pageTemplate === "ProjectDetail" ? (openBlock(), createBlock(_component_CollectionPagesProjectDetail, {
                key: 0,
                item: unref(item)
              }, null, 8, ["item"])) : unref(typeDef).pageTemplate === "PostDetail" ? (openBlock(), createBlock(_component_CollectionPagesPostDetail, {
                key: 1,
                item: unref(item)
              }, null, 8, ["item"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/p/[slug]/[collectionType]/[itemId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_itemId_-B3Yo2G4i.mjs.map
