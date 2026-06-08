import { O as useAsyncData, a9 as useRuntimeConfig, a3 as useNuxtApp, ab as useState, a1 as useHead, e as _sfc_main$d } from './server.mjs';
import { u as useColorMode, _ as _sfc_main$4, b as _sfc_main$2$1, a as _sfc_main$1$1 } from './Main-CoIIuktv.mjs';
import { computed, watchEffect, defineComponent, useTemplateRef, mergeProps, withCtx, renderSlot, inject, watch, nextTick, ref, unref, isRef, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, withDirectives, vShow, createCommentVNode, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import Sortable from 'sortablejs';

const inlineEditorKey = /* @__PURE__ */ Symbol();
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "HeaderWidget",
  __ssrInlineRender: true,
  props: {
    widget: {},
    inEditor: { type: Boolean },
    showLogoImg: { type: [Boolean, null] },
    logoUrl: {},
    logoSizeStyle: {},
    logoStacked: { type: Boolean },
    logoTitleSizeClass: {},
    siteName: {},
    showTitle: { type: Boolean },
    homeUrl: {},
    textStyle: {},
    navLinks: {},
    navLinkClass: {},
    navLinkStyle: {},
    navGapStyle: {},
    mutedTextStyle: {},
    resolvedCtaButtons: {},
    ctaButtonClass: { type: Function },
    ctaButtonStyle: { type: Function },
    ctaGapStyle: {},
    socialLinks: {},
    showColorModeToggle: { type: Boolean }
  },
  setup(__props) {
    const SOCIAL_ICONS = {
      twitter: "i-simple-icons-x",
      instagram: "i-simple-icons-instagram",
      linkedin: "i-simple-icons-linkedin",
      github: "i-simple-icons-github",
      youtube: "i-simple-icons-youtube",
      tiktok: "i-simple-icons-tiktok",
      facebook: "i-simple-icons-facebook",
      dribbble: "i-simple-icons-dribbble",
      behance: "i-simple-icons-behance"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_UColorModeButton = _sfc_main$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
        "data-widget": __props.widget,
        class: ["flex items-center shrink-0", __props.inEditor ? "cursor-grab active:cursor-grabbing select-none" : ""],
        draggable: __props.inEditor ? "true" : "false"
      }, _attrs))}>`);
      if (__props.widget === "logo") {
        _push(`<a${ssrRenderAttr("href", __props.inEditor ? void 0 : __props.homeUrl)} class="${ssrRenderClass([[
          __props.logoStacked ? "flex-col items-center gap-1.5" : "flex-row items-center gap-2.5",
          __props.inEditor && "pointer-events-none"
        ], "flex shrink-0"])}">`);
        if (__props.showLogoImg) {
          _push(`<img${ssrRenderAttr("src", __props.logoUrl)}${ssrRenderAttr("alt", __props.siteName)} class="max-w-48 object-contain" style="${ssrRenderStyle(__props.logoSizeStyle)}">`);
        } else {
          _push(`<!---->`);
        }
        if (__props.showTitle && __props.siteName) {
          _push(`<span class="${ssrRenderClass([__props.logoTitleSizeClass, "font-bold leading-none"])}" style="${ssrRenderStyle(__props.textStyle)}">${ssrInterpolate(__props.siteName)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</a>`);
      } else if (__props.widget === "nav" && __props.navLinks.length) {
        _push(`<nav class="${ssrRenderClass([__props.inEditor && "pointer-events-none", "flex text-sm"])}" style="${ssrRenderStyle(__props.navGapStyle)}"><!--[-->`);
        ssrRenderList(__props.navLinks, (link) => {
          _push(`<a${ssrRenderAttr("href", __props.inEditor ? void 0 : link.url)} class="${ssrRenderClass(__props.navLinkClass)}" style="${ssrRenderStyle(__props.navLinkStyle)}">${ssrInterpolate(link.label)}</a>`);
        });
        _push(`<!--]--></nav>`);
      } else if (__props.widget === "cta" && __props.resolvedCtaButtons.length) {
        _push(`<div class="${ssrRenderClass([__props.inEditor && "pointer-events-none", "flex items-center"])}" style="${ssrRenderStyle(__props.ctaGapStyle)}"><!--[-->`);
        ssrRenderList(__props.resolvedCtaButtons, (btn) => {
          _push(`<a${ssrRenderAttr("href", __props.inEditor ? void 0 : btn.url)} class="${ssrRenderClass(__props.ctaButtonClass(btn.style))}" style="${ssrRenderStyle(__props.ctaButtonStyle(btn.style))}">${ssrInterpolate(btn.label)}</a>`);
        });
        _push(`<!--]--></div>`);
      } else if (__props.widget === "socials" && __props.socialLinks.length) {
        _push(`<div class="${ssrRenderClass([__props.inEditor && "pointer-events-none", "flex items-center gap-2"])}" style="${ssrRenderStyle(__props.mutedTextStyle)}"><!--[-->`);
        ssrRenderList(__props.socialLinks, (s) => {
          _push(`<a${ssrRenderAttr("href", __props.inEditor ? void 0 : s.url)}${ssrRenderAttr("target", __props.inEditor ? void 0 : "_blank")} rel="noopener noreferrer" class="hover:opacity-70 transition-opacity">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: SOCIAL_ICONS[s.platform] ?? "i-lucide-link",
            class: "size-4"
          }, null, _parent));
          _push(`</a>`);
        });
        _push(`<!--]--></div>`);
      } else if (__props.widget === "toggle" && __props.showColorModeToggle) {
        _push(`<div class="${ssrRenderClass(__props.inEditor && "pointer-events-none")}" style="${ssrRenderStyle(__props.textStyle)}">`);
        _push(ssrRenderComponent(_component_UColorModeButton, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/HeaderWidget.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const HeaderWidget = Object.assign(_sfc_main$3, { __name: "BlocksHeaderWidget" });
function useThemes() {
  const { $themes } = useNuxtApp();
  return $themes;
}
function useActivePalette() {
  const activeThemeId = useState("active-theme-id", () => null);
  const activeThemeMode = useState("active-theme-mode", () => "light");
  const allThemes = useThemes();
  const activeTheme = computed(
    () => allThemes.value.find((t) => t.id === activeThemeId.value) ?? allThemes.value[0] ?? null
  );
  const isDark = computed(() => activeThemeMode.value === "dark");
  const palette = computed(() => activeTheme.value?.palette ?? []);
  function resolveColor(key) {
    if (!key) return null;
    const entry = palette.value.find((p) => p.key === key);
    if (!entry) return null;
    return (isDark.value ? entry.dark : entry.light) ?? null;
  }
  function hexLuminance(hex) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    const toLinear = (c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }
  function resolvePrimary(key) {
    if (key) {
      const entry = palette.value.find((p) => p.key === key);
      const override = isDark.value ? entry?.primaryDark : entry?.primaryLight;
      if (override) return override;
    }
    return isDark.value ? activeTheme.value?.dark.primary ?? "var(--primary)" : activeTheme.value?.light.primary ?? "var(--primary)";
  }
  function resolveSecondary(key) {
    if (key) {
      const entry = palette.value.find((p) => p.key === key);
      const override = isDark.value ? entry?.secondaryDark : entry?.secondaryLight;
      if (override) return override;
    }
    return isDark.value ? activeTheme.value?.dark.secondary ?? "var(--secondary)" : activeTheme.value?.light.secondary ?? "var(--secondary)";
  }
  function resolveTextColor(key) {
    if (!key) return null;
    const entry = palette.value.find((p) => p.key === key);
    if (!entry) return null;
    const defined = isDark.value ? entry.textDark : entry.textLight;
    if (defined) return defined;
    const bg = isDark.value ? entry.dark : entry.light;
    if (!bg || !bg.startsWith("#")) return null;
    return hexLuminance(bg) > 0.179 ? "#1a1a1a" : "#ffffff";
  }
  return {
    activeThemeId,
    activeThemeMode,
    palette,
    resolveColor,
    resolveTextColor,
    resolvePrimary,
    resolveSecondary
  };
}
function useHeaderSlots(orders, visibility, onReorder) {
  function filterVisible(order) {
    const v = visibility.value;
    return order.filter((w) => {
      if (w === "logo") return v.showLogo;
      if (w === "nav") return v.showNav;
      if (w === "cta") return v.showCta;
      if (w === "socials") return v.showSocials;
      if (w === "toggle") return v.showColorModeToggle;
      return true;
    });
  }
  function buildZones(o) {
    const seen = /* @__PURE__ */ new Set();
    const dedup = (order) => filterVisible([...order].filter((w) => !seen.has(w) && (seen.add(w), true)));
    if (o.layout === "stacked") {
      const top = dedup(o.topOrder);
      const left = dedup(o.leftOrder);
      const center = dedup(o.centerOrder);
      const right = dedup(o.rightOrder);
      return { top, left, center, right };
    } else {
      const left = dedup(o.leftOrder);
      const center = dedup(o.centerOrder);
      const right = dedup(o.rightOrder);
      const top = filterVisible(o.topOrder.filter((w) => !seen.has(w)));
      return { top, left, center, right };
    }
  }
  const zones = reactive(buildZones(orders.value));
  const isDragging = ref(false);
  watch(orders, ({ leftOrder, centerOrder, rightOrder, topOrder, layout }) => {
    if (isDragging.value) return;
    const seen = /* @__PURE__ */ new Set();
    const dedup = (order) => filterVisible([...order].filter((w) => !seen.has(w) && (seen.add(w), true)));
    if (layout === "stacked") {
      zones.top = dedup([...topOrder]);
      zones.left = dedup([...leftOrder]);
      zones.center = dedup([...centerOrder]);
      zones.right = dedup([...rightOrder]);
    } else {
      zones.left = dedup([...leftOrder]);
      zones.center = dedup([...centerOrder]);
      zones.right = dedup([...rightOrder]);
      zones.top = filterVisible([...topOrder].filter((w) => !seen.has(w)));
    }
  });
  watch(visibility, (newVis) => {
    if (isDragging.value) return;
    const o = orders.value;
    const allOrdered = /* @__PURE__ */ new Set([...o.leftOrder, ...o.centerOrder, ...o.rightOrder, ...o.topOrder]);
    const widgetToShow = [
      { widget: "logo", visKey: "showLogo" },
      { widget: "nav", visKey: "showNav" },
      { widget: "cta", visKey: "showCta" },
      { widget: "socials", visKey: "showSocials" },
      { widget: "toggle", visKey: "showColorModeToggle" }
    ];
    const extraRight = [];
    for (const { widget, visKey } of widgetToShow) {
      if (newVis[visKey] && !allOrdered.has(widget)) {
        extraRight.push(widget);
      }
    }
    const effectiveOrders = extraRight.length ? { ...o, rightOrder: [...o.rightOrder, ...extraRight] } : o;
    const rebuilt = buildZones(effectiveOrders);
    zones.left = rebuilt.left;
    zones.center = rebuilt.center;
    zones.right = rebuilt.right;
    zones.top = rebuilt.top;
    if (extraRight.length) {
      onReorder?.({
        leftOrder: zones.left,
        centerOrder: zones.center,
        rightOrder: zones.right,
        topOrder: zones.top,
        layout: orders.value.layout
      });
    }
  });
  const sortables = [];
  const elToZone = /* @__PURE__ */ new Map();
  function initSortable(el, zone) {
    elToZone.set(el, zone);
    const instance = Sortable.create(el, {
      group: "header-widgets",
      animation: 150,
      ghostClass: "header-sortable-ghost",
      chosenClass: "header-sortable-chosen",
      dragClass: "header-sortable-drag",
      onStart() {
        isDragging.value = true;
      },
      onEnd(evt) {
        isDragging.value = false;
        function readZone(zoneKey) {
          const el2 = [...elToZone.entries()].find(([, k]) => k === zoneKey)?.[0];
          if (!el2) return [...zones[zoneKey]];
          return [...el2.querySelectorAll("[data-widget]")].map((node) => node.dataset.widget).filter(Boolean);
        }
        const fromZone = elToZone.get(evt.from);
        const toZone = elToZone.get(evt.to);
        if (!fromZone || !toZone) return;
        nextTick(() => {
          zones.left = readZone("left");
          zones.center = readZone("center");
          zones.right = readZone("right");
          zones.top = readZone("top");
          onReorder?.({
            leftOrder: zones.left,
            centerOrder: zones.center,
            rightOrder: zones.right,
            topOrder: zones.top,
            layout: orders.value.layout
          });
        });
      }
    });
    sortables.push(instance);
  }
  function destroySortables() {
    sortables.forEach((s) => s.destroy());
    sortables.length = 0;
    elToZone.clear();
  }
  const slotOrder = computed(() => ({
    leftOrder: [...zones.left],
    centerOrder: [...zones.center],
    rightOrder: [...zones.right],
    topOrder: [...zones.top]
  }));
  return { zones, slotOrder, initSortable, destroySortables, isDragging };
}
const MIN_X_PADDING = 16;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    siteName: { default: "" },
    homeUrl: { default: "/" },
    navLinks: { default: () => [] },
    ctaButtons: { default: () => [] },
    socialLinks: { default: () => [] },
    showColorModeToggle: { type: Boolean, default: false },
    layout: { default: "single" },
    position: { default: "static" },
    leftOrder: { default: () => ["logo", "nav"] },
    centerOrder: { default: () => [] },
    rightOrder: { default: () => ["cta"] },
    topOrder: { default: () => ["logo"] },
    logoUrl: { default: null },
    logoUrlDark: { default: null },
    logoSize: { default: "md" },
    logoStacked: { type: Boolean, default: false },
    brandingDisplay: { default: "logo-and-title" },
    background: { default: null },
    navStyle: { default: null },
    ctaStyle: { default: null },
    padding: { default: 16 },
    borderWidth: { default: 1 },
    maxWidth: { default: "7xl" },
    showLogo: { type: Boolean, default: true },
    showNav: { type: Boolean, default: true },
    showCta: { type: Boolean, default: true },
    showSocials: { type: Boolean, default: false },
    mobileMenuTitle: { default: "" },
    mobileMenuBg: { default: null },
    mobileBackground: { default: null },
    isEditor: { type: Boolean, default: false },
    onSlotReorder: { type: Function, default: void 0 },
    cta: { default: null }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const inlineEditor = inject(inlineEditorKey, null);
    const inEditor = computed(() => props.isEditor || !!inlineEditor);
    const { resolveColor, resolveTextColor, resolvePrimary, resolveSecondary } = useActivePalette();
    const paddingStyle = computed(() => {
      const p = props.padding ?? 16;
      const x = Math.max(p, MIN_X_PADDING);
      return {
        paddingTop: `${p}px`,
        paddingBottom: `${p}px`,
        paddingLeft: `${x}px`,
        paddingRight: `${x}px`
      };
    });
    const bgColor = computed(() => props.background ? resolveColor(props.background) : null);
    const bgStyle = computed(
      () => bgColor.value ? { backgroundColor: bgColor.value } : { backgroundColor: "var(--bg-nav)" }
    );
    function hexLuminance(hex) {
      const h = hex.replace("#", "");
      const r = parseInt(h.slice(0, 2), 16) / 255;
      const g = parseInt(h.slice(2, 4), 16) / 255;
      const b = parseInt(h.slice(4, 6), 16) / 255;
      const toLinear = (c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    }
    const autoTextColor = computed(
      () => props.background ? resolveTextColor(props.background) : null
    );
    const bgPrimary = computed(() => resolvePrimary(props.background));
    const bgSecondary = computed(() => resolveSecondary(props.background));
    const textStyle = computed(
      () => autoTextColor.value ? { color: autoTextColor.value } : { color: "var(--text-primary)" }
    );
    const zoneOutlineColor = computed(() => {
      const auto = autoTextColor.value;
      if (!auto?.startsWith("#")) return "rgba(128,128,128,0.25)";
      return hexLuminance(auto) > 0.5 ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.18)";
    });
    const mutedTextStyle = computed(
      () => autoTextColor.value ? { color: autoTextColor.value, opacity: "0.7" } : { color: "var(--text-secondary)", opacity: "1" }
    );
    const mobileMenuBgStyle = computed(() => {
      const hex = props.mobileBackground ? resolveColor(props.mobileBackground) : null;
      return hex ? { backgroundColor: hex } : { backgroundColor: "var(--bg-mobile-menu)" };
    });
    const mobileMenuTextColor = computed(
      () => props.mobileBackground ? resolveTextColor(props.mobileBackground) : null
    );
    const mobileMenuTextStyle = computed(
      () => mobileMenuTextColor.value ? { color: mobileMenuTextColor.value } : { color: "var(--text-primary)" }
    );
    const mobileMenuMutedStyle = computed(
      () => mobileMenuTextColor.value ? { color: mobileMenuTextColor.value, opacity: "0.7" } : { color: "var(--text-secondary)", opacity: "1" }
    );
    const LOGO_HEIGHTS = { xs: 24, sm: 32, md: 40, lg: 52, xl: 68 };
    const LOGO_HEIGHTS_STACKED = { xs: 40, sm: 56, md: 72, lg: 96, xl: 128 };
    const logoHeightPx = computed(() => {
      const map = props.logoStacked ? LOGO_HEIGHTS_STACKED : LOGO_HEIGHTS;
      return map[props.logoSize ?? "md"] ?? 40;
    });
    const logoSizeStyle = computed(() => ({ height: `${logoHeightPx.value}px`, width: "auto" }));
    const logoTitleSizeClass = computed(() => {
      const s = props.logoSize ?? "md";
      if (s === "xs") return "text-sm";
      if (s === "sm") return "text-base";
      if (s === "lg") return "text-xl";
      if (s === "xl") return "text-2xl";
      return "text-lg";
    });
    const resolvedLogoUrl = computed(() => {
      if (!props.logoUrlDark) return props.logoUrl ?? null;
      const text = autoTextColor.value;
      const useDark = text?.startsWith("#") ? hexLuminance(text) > 0.179 : false;
      return useDark ? props.logoUrlDark : props.logoUrl ?? props.logoUrlDark;
    });
    const navColorResolved = computed(() => bgPrimary.value);
    const NAV_DEFAULTS = {
      variant: "ghost",
      radius: "md",
      size: "sm",
      spacing: 4,
      uppercase: false,
      letterSpacing: 0
    };
    const CTA_DEFAULTS = {
      variant: "solid",
      radius: "md",
      size: "sm",
      spacing: 4,
      uppercase: false,
      letterSpacing: 0
    };
    const navStyleResolved = computed(() => ({ ...NAV_DEFAULTS, ...props.navStyle }));
    const ctaStyleResolved = computed(() => ({ ...CTA_DEFAULTS, ...props.ctaStyle }));
    function radiusClass(r) {
      if (r === "none") return "rounded-none";
      if (r === "sm") return "rounded-sm";
      if (r === "lg") return "rounded-lg";
      if (r === "full") return "rounded-full";
      return "rounded-md";
    }
    function sizeClass(s) {
      if (s === "xs") return { text: "text-xs", pad: "px-2 py-0.5" };
      if (s === "md") return { text: "text-base", pad: "px-3 py-1.5" };
      if (s === "lg") return { text: "text-lg", pad: "px-4 py-2" };
      return { text: "text-sm", pad: "px-2.5 py-1" };
    }
    function buttonTextStyle(style) {
      return {
        ...style.uppercase ? { textTransform: "uppercase" } : {},
        ...style.letterSpacing > 0 ? { letterSpacing: `${(style.letterSpacing * 0.0625).toFixed(4)}em` } : {}
      };
    }
    const navRadiusClass = computed(() => radiusClass(navStyleResolved.value.radius));
    const navSizeClass = computed(() => sizeClass(navStyleResolved.value.size));
    const navLinkClass = computed(() => {
      const v = navStyleResolved.value.variant;
      const r = navRadiusClass.value;
      const { text, pad } = navSizeClass.value;
      const base = `nav-link ${text} ${pad} transition-colors ${r}`;
      if (v === "solid") return `${base} font-medium`;
      if (v === "soft") return `${base}`;
      if (v === "outline") return `${base} border`;
      if (v === "link")
        return `nav-link ${text} transition-opacity hover:opacity-70 underline-offset-4 hover:underline`;
      return `${base} nav-link-ghost`;
    });
    const navGapStyle = computed(() => ({ gap: `${navStyleResolved.value.spacing}px` }));
    const navLinkStyle = computed(() => {
      const v = navStyleResolved.value.variant;
      const primary = navColorResolved.value;
      const text = autoTextColor.value ?? "var(--text-primary)";
      const extraStyle = buttonTextStyle(navStyleResolved.value);
      if (v === "solid") {
        const navTextColor = props.background ? resolveTextColor(props.background) ?? (hexLuminance(primary) > 0.179 ? "#1a1a1a" : "#ffffff") : hexLuminance(primary) > 0.179 ? "#1a1a1a" : "#ffffff";
        return { backgroundColor: primary, color: navTextColor, ...extraStyle };
      }
      if (v === "soft") {
        return {
          backgroundColor: `color-mix(in srgb, ${primary} 15%, transparent)`,
          color: primary,
          ...extraStyle
        };
      }
      if (v === "outline") {
        return { borderColor: primary, color: primary, ...extraStyle };
      }
      if (v === "link") {
        return { color: primary, ...extraStyle };
      }
      return {
        color: text,
        "--nav-ghost-hover": `color-mix(in srgb, ${text} 12%, transparent)`,
        ...extraStyle
      };
    });
    const MAX_WIDTH_CLASSES = {
      full: "w-full",
      sm: "max-w-sm mx-auto w-full",
      md: "max-w-md mx-auto w-full",
      lg: "max-w-lg mx-auto w-full",
      xl: "max-w-xl mx-auto w-full",
      "2xl": "max-w-2xl mx-auto w-full",
      "3xl": "max-w-3xl mx-auto w-full",
      "4xl": "max-w-4xl mx-auto w-full",
      "5xl": "max-w-5xl mx-auto w-full",
      "6xl": "max-w-6xl mx-auto w-full",
      "7xl": "max-w-7xl mx-auto w-full"
    };
    const innerMaxWidthClass = computed(() => MAX_WIDTH_CLASSES[props.maxWidth ?? "7xl"] ?? "w-full");
    const borderStyle = computed(() => {
      const w = props.borderWidth ?? 1;
      if (w === 0) return { borderBottomWidth: "0px" };
      return {
        borderBottomWidth: `${w}px`,
        borderColor: "color-mix(in srgb, var(--text-primary) 12%, transparent)"
      };
    });
    const showLogoImg = computed(
      () => !!props.logoUrl && props.brandingDisplay !== "title-only"
    );
    const showTitle = computed(() => props.brandingDisplay !== "logo-only");
    const resolvedCtaButtons = computed(() => {
      if (props.ctaButtons.length > 0) return props.ctaButtons;
      if (props.cta)
        return [
          {
            id: "legacy",
            label: props.cta.label,
            url: props.cta.url,
            style: props.cta.style ?? "filled"
          }
        ];
      return [];
    });
    const ctaRadiusClass = computed(() => radiusClass(ctaStyleResolved.value.radius));
    const ctaSizeClass = computed(() => sizeClass(ctaStyleResolved.value.size));
    const ctaGapStyle = computed(() => ({ gap: `${ctaStyleResolved.value.spacing}px` }));
    function ctaButtonStyle(style) {
      const secondary = bgSecondary.value;
      const extraStyle = buttonTextStyle(ctaStyleResolved.value);
      if (style === "outline")
        return {
          border: `1.5px solid ${secondary}`,
          backgroundColor: "transparent",
          color: secondary,
          ...extraStyle
        };
      if (style === "ghost")
        return { backgroundColor: "transparent", color: secondary, border: "none", ...extraStyle };
      const filledText = hexLuminance(secondary) > 0.179 ? "#1a1a1a" : "#ffffff";
      return { backgroundColor: secondary, color: filledText, border: "none", ...extraStyle };
    }
    function ctaButtonClass(style) {
      const { text, pad } = ctaSizeClass.value;
      const r = ctaRadiusClass.value;
      return `${pad} ${r} ${text} font-medium transition-opacity ` + (style === "filled" ? "hover:opacity-90" : "hover:opacity-70");
    }
    const slotOrders = computed(() => ({
      leftOrder: props.leftOrder,
      centerOrder: props.centerOrder,
      rightOrder: props.rightOrder,
      topOrder: props.topOrder,
      layout: props.layout ?? "single"
    }));
    const slotVisibility = computed(() => ({
      showLogo: props.showLogo ?? true,
      showNav: props.showNav ?? true,
      showCta: props.showCta ?? true,
      showSocials: props.showSocials ?? false,
      showColorModeToggle: props.showColorModeToggle ?? false
    }));
    const { zones, slotOrder, initSortable, destroySortables } = useHeaderSlots(
      slotOrders,
      slotVisibility,
      props.onSlotReorder
    );
    __expose({ slotOrder });
    const zoneRefs = {
      top: useTemplateRef("zone-top"),
      left: useTemplateRef("zone-left"),
      center: useTemplateRef("zone-center"),
      right: useTemplateRef("zone-right")
    };
    watch(
      inEditor,
      (active) => {
        destroySortables();
        if (!active) return;
        nextTick(() => {
          for (const [zone, ref2] of Object.entries(zoneRefs)) {
            if (ref2.value) initSortable(ref2.value, zone);
          }
        });
      },
      { immediate: true }
    );
    watch(
      () => props.layout,
      () => {
        if (!inEditor.value) return;
        destroySortables();
        nextTick(() => {
          for (const [zone, ref2] of Object.entries(zoneRefs)) {
            if (ref2.value) initSortable(ref2.value, zone);
          }
        });
      }
    );
    const mobileMenuOpen = ref(false);
    const isMounted = ref(false);
    const hasMobileMenu = computed(
      () => props.showNav && props.navLinks.length > 0 || props.showCta && resolvedCtaButtons.value.length > 0 || props.showSocials && props.socialLinks.length > 0
    );
    const SOCIAL_ICONS = {
      twitter: "i-simple-icons-x",
      instagram: "i-simple-icons-instagram",
      linkedin: "i-simple-icons-linkedin",
      github: "i-simple-icons-github",
      youtube: "i-simple-icons-youtube",
      tiktok: "i-simple-icons-tiktok",
      facebook: "i-simple-icons-facebook",
      dribbble: "i-simple-icons-dribbble",
      behance: "i-simple-icons-behance"
    };
    const widgetProps = computed(() => ({
      inEditor: inEditor.value,
      showLogoImg: showLogoImg.value,
      logoUrl: resolvedLogoUrl.value,
      logoSizeStyle: logoSizeStyle.value,
      logoStacked: props.logoStacked ?? false,
      logoTitleSizeClass: logoTitleSizeClass.value,
      siteName: props.siteName,
      showTitle: showTitle.value,
      homeUrl: props.homeUrl,
      textStyle: textStyle.value,
      mutedTextStyle: mutedTextStyle.value,
      navLinks: props.navLinks,
      navLinkClass: navLinkClass.value,
      navLinkStyle: navLinkStyle.value,
      navGapStyle: navGapStyle.value,
      resolvedCtaButtons: resolvedCtaButtons.value,
      ctaButtonClass,
      ctaButtonStyle,
      ctaGapStyle: ctaGapStyle.value,
      socialLinks: props.socialLinks,
      showColorModeToggle: props.showColorModeToggle
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_USlideover = _sfc_main$2$1;
      _push(`<!--[--><header class="${ssrRenderClass([__props.position === "sticky" ? "sticky top-0 z-10 w-full" : "relative"])}" style="${ssrRenderStyle({ ...unref(bgStyle), ...unref(borderStyle), ...unref(paddingStyle) })}"><div class="${ssrRenderClass(unref(innerMaxWidthClass))}"><div class="flex items-center justify-between min-h-9 @4xl:hidden"><a${ssrRenderAttr("href", unref(inEditor) ? void 0 : __props.homeUrl)} class="${ssrRenderClass([[
        props.logoStacked ? "flex-col items-center gap-1.5" : "flex-row items-center gap-2.5",
        unref(inEditor) && "pointer-events-none"
      ], "flex shrink-0"])}">`);
      if (unref(showLogoImg)) {
        _push(`<img${ssrRenderAttr("src", unref(resolvedLogoUrl))}${ssrRenderAttr("alt", props.siteName)} class="max-w-48 object-contain" style="${ssrRenderStyle({ "height": "32px", "width": "auto" })}">`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showTitle) && props.siteName) {
        _push(`<span class="font-bold leading-none text-base" style="${ssrRenderStyle(unref(textStyle))}">${ssrInterpolate(props.siteName)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</a>`);
      if (unref(hasMobileMenu) && !unref(inEditor)) {
        _push(`<button class="flex items-center justify-center w-9 h-9 rounded-md transition-colors hover:bg-black/10" style="${ssrRenderStyle(unref(textStyle))}" aria-label="Open menu">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-menu",
          class: "size-5"
        }, null, _parent));
        _push(`</button>`);
      } else if (unref(hasMobileMenu) && unref(inEditor)) {
        _push(`<div class="flex items-center justify-center w-9 h-9 rounded-md opacity-50" style="${ssrRenderStyle(unref(textStyle))}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-menu",
          class: "size-5"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden @4xl:block">`);
      if (__props.layout === "stacked") {
        _push(`<!--[--><div class="flex justify-center mb-2"><div class="${ssrRenderClass([unref(inEditor) && "rounded px-2 min-w-16", "flex items-center gap-3 min-h-9"])}" style="${ssrRenderStyle(unref(inEditor) ? { outline: `1px dashed ${unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList(unref(zones).top, (widget) => {
          _push(ssrRenderComponent(HeaderWidget, mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div></div><div class="grid items-center gap-4" style="${ssrRenderStyle({ "grid-template-columns": "1fr auto 1fr" })}"><div class="${ssrRenderClass([unref(inEditor) && "rounded px-2", "flex items-center gap-3 min-h-9"])}" style="${ssrRenderStyle(unref(inEditor) ? { outline: `1px dashed ${unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList(unref(zones).left, (widget) => {
          _push(ssrRenderComponent(HeaderWidget, mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div><div class="${ssrRenderClass([unref(inEditor) && "rounded px-2 min-w-16", "flex items-center gap-3 justify-center min-h-9"])}" style="${ssrRenderStyle(unref(inEditor) ? { outline: `1px dashed ${unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList(unref(zones).center, (widget) => {
          _push(ssrRenderComponent(HeaderWidget, mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div><div class="${ssrRenderClass([unref(inEditor) && "rounded px-2", "flex items-center gap-3 justify-end min-h-9"])}" style="${ssrRenderStyle(unref(inEditor) ? { outline: `1px dashed ${unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList(unref(zones).right, (widget) => {
          _push(ssrRenderComponent(HeaderWidget, mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div></div><!--]-->`);
      } else {
        _push(`<div class="grid items-center gap-4" style="${ssrRenderStyle({ "grid-template-columns": "1fr auto 1fr" })}"><div class="${ssrRenderClass([unref(inEditor) && "rounded px-2", "flex items-center gap-3 min-h-9"])}" style="${ssrRenderStyle(unref(inEditor) ? { outline: `1px dashed ${unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList(unref(zones).left, (widget) => {
          _push(ssrRenderComponent(HeaderWidget, mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div><div class="${ssrRenderClass([unref(inEditor) && "rounded px-2 min-w-16", "flex items-center gap-3 justify-center min-h-9"])}" style="${ssrRenderStyle(unref(inEditor) ? { outline: `1px dashed ${unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList(unref(zones).center, (widget) => {
          _push(ssrRenderComponent(HeaderWidget, mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div><div class="${ssrRenderClass([unref(inEditor) && "rounded px-2", "flex items-center gap-3 justify-end min-h-9"])}" style="${ssrRenderStyle(unref(inEditor) ? { outline: `1px dashed ${unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList(unref(zones).right, (widget) => {
          _push(ssrRenderComponent(HeaderWidget, mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</div></div></header>`);
      if (unref(isMounted)) {
        _push(ssrRenderComponent(_component_USlideover, {
          open: unref(mobileMenuOpen),
          "onUpdate:open": ($event) => isRef(mobileMenuOpen) ? mobileMenuOpen.value = $event : null,
          side: "right",
          class: "@4xl:hidden"
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-col h-full overflow-y-auto" style="${ssrRenderStyle(unref(mobileMenuBgStyle))}"${_scopeId}><div class="flex items-center justify-between px-4 py-3 border-b shrink-0" style="${ssrRenderStyle({
                borderColor: unref(mobileMenuTextColor) ? `color-mix(in srgb, ${unref(mobileMenuTextColor)} 12%, transparent)` : "var(--color-default-200)"
              })}"${_scopeId}><span class="font-semibold text-sm" style="${ssrRenderStyle(unref(mobileMenuTextStyle))}"${_scopeId}>${ssrInterpolate(props.mobileMenuTitle || "Menu")}</span><button class="flex items-center justify-center w-8 h-8 rounded-md transition-opacity hover:opacity-70" style="${ssrRenderStyle(unref(mobileMenuTextStyle))}" aria-label="Close menu"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-x",
                class: "size-4"
              }, null, _parent2, _scopeId));
              _push2(`</button></div><div class="flex flex-col gap-6 p-4 flex-1"${_scopeId}>`);
              if (props.showNav && props.navLinks.length || props.showCta && unref(resolvedCtaButtons).length) {
                _push2(`<nav class="flex flex-col gap-1"${_scopeId}><!--[-->`);
                ssrRenderList(props.navLinks, (link) => {
                  _push2(`<a${ssrRenderAttr("href", link.url)} class="px-3 py-2 rounded-md text-sm transition-opacity hover:opacity-70" style="${ssrRenderStyle([
                    unref(mobileMenuTextStyle),
                    props.showNav ? null : { display: "none" }
                  ])}"${_scopeId}>${ssrInterpolate(link.label)}</a>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(unref(resolvedCtaButtons), (btn) => {
                  _push2(`<a${ssrRenderAttr("href", btn.url)} class="px-3 py-2 rounded-md text-sm transition-opacity hover:opacity-70" style="${ssrRenderStyle([
                    unref(mobileMenuTextStyle),
                    props.showCta ? null : { display: "none" }
                  ])}"${_scopeId}>${ssrInterpolate(btn.label)}</a>`);
                });
                _push2(`<!--]--></nav>`);
              } else {
                _push2(`<!---->`);
              }
              if (props.showSocials && props.socialLinks.length) {
                _push2(`<div class="flex items-center gap-3"${_scopeId}><!--[-->`);
                ssrRenderList(props.socialLinks, (s) => {
                  _push2(`<a${ssrRenderAttr("href", s.url)} target="_blank" rel="noopener noreferrer" class="hover:opacity-70 transition-opacity" style="${ssrRenderStyle(unref(mobileMenuMutedStyle))}"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: SOCIAL_ICONS[s.platform] ?? "i-lucide-link",
                    class: "size-5"
                  }, null, _parent2, _scopeId));
                  _push2(`</a>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", {
                  class: "flex flex-col h-full overflow-y-auto",
                  style: unref(mobileMenuBgStyle)
                }, [
                  createVNode("div", {
                    class: "flex items-center justify-between px-4 py-3 border-b shrink-0",
                    style: {
                      borderColor: unref(mobileMenuTextColor) ? `color-mix(in srgb, ${unref(mobileMenuTextColor)} 12%, transparent)` : "var(--color-default-200)"
                    }
                  }, [
                    createVNode("span", {
                      class: "font-semibold text-sm",
                      style: unref(mobileMenuTextStyle)
                    }, toDisplayString(props.mobileMenuTitle || "Menu"), 5),
                    createVNode("button", {
                      class: "flex items-center justify-center w-8 h-8 rounded-md transition-opacity hover:opacity-70",
                      style: unref(mobileMenuTextStyle),
                      "aria-label": "Close menu",
                      onClick: ($event) => mobileMenuOpen.value = false
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-x",
                        class: "size-4"
                      })
                    ], 12, ["onClick"])
                  ], 4),
                  createVNode("div", { class: "flex flex-col gap-6 p-4 flex-1" }, [
                    props.showNav && props.navLinks.length || props.showCta && unref(resolvedCtaButtons).length ? (openBlock(), createBlock("nav", {
                      key: 0,
                      class: "flex flex-col gap-1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.navLinks, (link) => {
                        return withDirectives((openBlock(), createBlock("a", {
                          key: link.url,
                          href: link.url,
                          class: "px-3 py-2 rounded-md text-sm transition-opacity hover:opacity-70",
                          style: unref(mobileMenuTextStyle),
                          onClick: ($event) => mobileMenuOpen.value = false
                        }, toDisplayString(link.label), 13, ["href", "onClick"])), [
                          [vShow, props.showNav]
                        ]);
                      }), 128)),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(resolvedCtaButtons), (btn) => {
                        return withDirectives((openBlock(), createBlock("a", {
                          key: btn.id,
                          href: btn.url,
                          class: "px-3 py-2 rounded-md text-sm transition-opacity hover:opacity-70",
                          style: unref(mobileMenuTextStyle),
                          onClick: ($event) => mobileMenuOpen.value = false
                        }, toDisplayString(btn.label), 13, ["href", "onClick"])), [
                          [vShow, props.showCta]
                        ]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    props.showSocials && props.socialLinks.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex items-center gap-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(props.socialLinks, (s) => {
                        return openBlock(), createBlock("a", {
                          key: s.id,
                          href: s.url,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          class: "hover:opacity-70 transition-opacity",
                          style: unref(mobileMenuMutedStyle)
                        }, [
                          createVNode(_component_UIcon, {
                            name: SOCIAL_ICONS[s.platform] ?? "i-lucide-link",
                            class: "size-5"
                          }, null, 8, ["name"])
                        ], 12, ["href"]);
                      }), 128))
                    ])) : createCommentVNode("", true)
                  ])
                ], 4)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BlocksHeader = Object.assign(_sfc_main$2, { __name: "BlocksHeader" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  props: {
    siteName: { default: "" },
    links: { default: () => [] },
    copyrightText: { default: "" }
  },
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({
        class: "px-8 py-8 border-t",
        style: {
          backgroundColor: "var(--bg-nav)",
          color: "var(--text-secondary)",
          borderColor: "color-mix(in srgb, var(--text-primary) 12%, transparent)"
        }
      }, _attrs))}><div class="max-w-5xl mx-auto flex flex-col @sm:flex-row items-center justify-between gap-4"><span class="font-semibold text-sm" style="${ssrRenderStyle({ color: "var(--text-primary)" })}">${ssrInterpolate(__props.siteName)}</span>`);
      if (__props.links.length) {
        _push(`<nav class="flex gap-6 text-sm"><!--[-->`);
        ssrRenderList(__props.links, (link) => {
          _push(`<a${ssrRenderAttr("href", link.url)} class="hover:opacity-80 transition-opacity">${ssrInterpolate(link.label)}</a>`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-sm">${ssrInterpolate(__props.copyrightText || `© ${unref(year)} ${__props.siteName}`)}</span></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BlocksFooter = Object.assign(_sfc_main$1, { __name: "BlocksFooter" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PortfolioLayout",
  __ssrInlineRender: true,
  props: {
    cssVars: {},
    portfolioMode: {},
    siteName: {},
    homeUrl: {},
    navLinks: {},
    headerContent: {},
    footerContent: {},
    isEditor: { type: Boolean },
    googleFontsUrl: {},
    logoUrl: {},
    logoUrlDark: {},
    onSlotReorder: { type: Function }
  },
  emits: ["select-header", "select-footer"],
  setup(__props, { expose: __expose }) {
    const props = __props;
    const headerRef = useTemplateRef("headerBlock");
    __expose({ headerRef });
    useHead(
      computed(() => ({
        link: props.googleFontsUrl ? [{ rel: "stylesheet", href: props.googleFontsUrl }] : []
      }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksHeader = BlocksHeader;
      const _component_UMain = _sfc_main$4;
      const _component_BlocksFooter = BlocksFooter;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "portfolio-root @container min-h-screen",
        style: {
          ...__props.cssVars,
          backgroundColor: "var(--bg-page)",
          color: "var(--text-primary)",
          fontFamily: __props.cssVars["--font-body"] ?? void 0
        }
      }, _attrs))}>`);
      if (__props.isEditor) {
        _push(`<div class="relative after:absolute after:inset-0 after:pointer-events-none after:ring-2 after:ring-inset after:ring-transparent hover:after:ring-primary/60 after:transition-shadow after:duration-150">`);
        _push(ssrRenderComponent(_component_BlocksHeader, mergeProps({ ref: "headerBlock" }, __props.headerContent, {
          "site-name": __props.headerContent?.siteName || __props.siteName,
          "home-url": __props.homeUrl,
          "nav-links": __props.navLinks,
          "logo-url": __props.logoUrl,
          "logo-url-dark": __props.logoUrlDark,
          "mobile-menu-bg": __props.cssVars["--bg-mobile-menu"] ?? null,
          "show-color-mode-toggle": __props.portfolioMode === "both" && !!__props.headerContent?.showColorModeToggle,
          "is-editor": true,
          "on-slot-reorder": __props.onSlotReorder
        }), null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_BlocksHeader, mergeProps(__props.headerContent, {
          "site-name": __props.headerContent?.siteName || __props.siteName,
          "home-url": __props.homeUrl,
          "nav-links": __props.navLinks,
          "logo-url": __props.logoUrl,
          "logo-url-dark": __props.logoUrlDark,
          "mobile-menu-bg": __props.cssVars["--bg-mobile-menu"] ?? null,
          "show-color-mode-toggle": __props.portfolioMode === "both" && !!__props.headerContent?.showColorModeToggle
        }), null, _parent));
      }
      _push(ssrRenderComponent(_component_UMain, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
      if (__props.isEditor) {
        _push(`<div class="relative cursor-pointer after:absolute after:inset-0 after:pointer-events-none after:ring-2 after:ring-inset after:ring-transparent hover:after:ring-primary/60 after:transition-shadow after:duration-150">`);
        _push(ssrRenderComponent(_component_BlocksFooter, mergeProps(__props.footerContent, {
          "site-name": __props.footerContent?.siteName || __props.siteName,
          links: __props.navLinks
        }), null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_BlocksFooter, mergeProps(__props.footerContent, {
          "site-name": __props.footerContent?.siteName || __props.siteName,
          links: __props.navLinks
        }), null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PortfolioLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "PortfolioLayout" });
function sanitizeHtml(html) {
  return html;
}
function visibleTags(tags) {
  return tags.filter((t) => !t.startsWith("::"));
}
const portfolioSlugKey = /* @__PURE__ */ Symbol();
const MAX_CONTENT_WIDTH_OPTIONS = [
  { label: "Small (48rem)", value: "sm" },
  { label: "Medium (56rem)", value: "md" },
  { label: "Large (64rem)", value: "lg" },
  { label: "Extra large (80rem)", value: "xl" },
  { label: "Full width", value: "full" }
];
const MAX_CONTENT_WIDTH_CLASS = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-none"
};
function useLayoutSettings() {
  const maxContentWidth = useState("layout-max-content-width", () => "sm");
  return { maxContentWidth };
}
function usePortfolio(slug, themeOverride) {
  const config = useRuntimeConfig();
  const colorMode = useColorMode();
  const baseURL = config.apiUrl;
  const { data: portfolioData, error: portfolioError } = useAsyncData(
    `portfolio-${slug}`,
    () => $fetch(`/api/portfolios/${slug}`, { baseURL })
  );
  const { data: pagesData } = useAsyncData(
    `portfolio-${slug}-pages`,
    () => $fetch(`/api/portfolios/${slug}/pages`, { baseURL })
  );
  const allThemesRef = useThemes();
  const { data: layoutBlocksData } = useAsyncData(
    `portfolio-${slug}-layout-blocks`,
    () => $fetch(`/api/portfolios/${slug}/pages/home/blocks`, { baseURL })
  );
  const portfolio = computed(() => portfolioData.value?.portfolio ?? null);
  const publishedPages = computed(() => pagesData.value?.pages ?? []);
  const dbThemeSettings = computed(
    () => portfolio.value?.themeSettings
  );
  const themeSettings = computed(
    () => themeOverride?.value ? { ...dbThemeSettings.value, ...themeOverride.value } : dbThemeSettings.value
  );
  const allThemes = computed(() => allThemesRef.value ?? []);
  const selectedTheme = computed(
    () => allThemes.value.find((t) => t.id === themeSettings.value?.themeId) ?? allThemes.value[0] ?? null
  );
  const portfolioMode = computed(() => themeSettings.value?.mode ?? "light");
  const isDark = computed(() => {
    if (portfolioMode.value === "dark") return true;
    if (portfolioMode.value === "light") return false;
    return colorMode.value === "dark";
  });
  const { activeThemeId, activeThemeMode } = useActivePalette();
  watchEffect(
    () => {
      activeThemeId.value = selectedTheme.value?.id ?? null;
    },
    { flush: "sync" }
  );
  watchEffect(
    () => {
      activeThemeMode.value = isDark.value ? "dark" : "light";
    },
    { flush: "sync" }
  );
  const { maxContentWidth: activeMaxContentWidth } = useLayoutSettings();
  watchEffect(
    () => {
      activeMaxContentWidth.value = themeSettings.value?.maxContentWidth ?? "sm";
    },
    { flush: "sync" }
  );
  function buildCssVars(colors, theme, dark) {
    const vars = {
      "--bg-page": colors.bgPage,
      "--bg-surface": colors.bgSurface,
      "--bg-nav": colors.bgNav,
      "--bg-mobile-menu": colors.bgMobileMenu ?? colors.bgSurface,
      "--primary": colors.primary,
      "--secondary": colors.secondary,
      "--text-primary": colors.textPrimary,
      "--text-secondary": colors.textSecondary,
      "--border": colors.border ?? (dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")
    };
    for (const entry of theme.palette ?? []) {
      const color = dark ? entry.dark : entry.light;
      if (color) vars[`--palette-${entry.key}`] = color;
    }
    return vars;
  }
  const selectedFonts = computed(() => themeSettings.value?.fonts ?? null);
  const logoLight = computed(() => themeSettings.value?.logoLight ?? null);
  const logoDark = computed(() => themeSettings.value?.logoDark ?? null);
  const activeLogo = computed(() => {
    if (isDark.value) return logoDark.value ?? logoLight.value;
    return logoLight.value ?? logoDark.value;
  });
  const googleFontsUrl = computed(() => {
    const fonts = selectedFonts.value;
    if (!fonts) return null;
    const families = [.../* @__PURE__ */ new Set([fonts.heading, fonts.body])].map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700`).join("&");
    return `https://fonts.googleapis.com/css2?${families}&display=swap`;
  });
  const cssVars = computed(() => {
    const colorVars = selectedTheme.value ? buildCssVars(
      isDark.value ? selectedTheme.value.dark : selectedTheme.value.light,
      selectedTheme.value,
      isDark.value
    ) : {};
    const fonts = selectedFonts.value;
    if (!fonts) return colorVars;
    return {
      ...colorVars,
      "--font-heading": `"${fonts.heading}", sans-serif`,
      "--font-body": `"${fonts.body}", sans-serif`
    };
  });
  const navLinks = computed(
    () => publishedPages.value.filter((p) => p.showInMenu).map((p) => ({ label: p.title, url: `/p/${slug}/${p.slug}` }))
  );
  const layoutBlocks = computed(() => layoutBlocksData.value?.blocks ?? []);
  const headerBlock = computed(() => layoutBlocks.value.find((b) => b.type === "header") ?? null);
  const footerBlock = computed(() => layoutBlocks.value.find((b) => b.type === "footer") ?? null);
  return {
    portfolioError,
    portfolio,
    publishedPages,
    portfolioMode,
    cssVars,
    googleFontsUrl,
    navLinks,
    headerBlock,
    footerBlock,
    baseURL,
    activeLogo,
    logoLight,
    logoDark
  };
}

export { BlocksFooter as B, MAX_CONTENT_WIDTH_CLASS as M, __nuxt_component_0 as _, BlocksHeader as a, MAX_CONTENT_WIDTH_OPTIONS as b, useLayoutSettings as c, usePortfolio as d, useThemes as e, inlineEditorKey as i, portfolioSlugKey as p, sanitizeHtml as s, useActivePalette as u, visibleTags as v };
//# sourceMappingURL=usePortfolio-CUdxQeA9.mjs.map
