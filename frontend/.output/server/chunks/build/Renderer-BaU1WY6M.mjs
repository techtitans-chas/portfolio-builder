import { a as BlocksHeader, B as BlocksFooter, b as MAX_CONTENT_WIDTH_OPTIONS, u as useActivePalette, s as sanitizeHtml, i as inlineEditorKey, c as useLayoutSettings, M as MAX_CONTENT_WIDTH_CLASS, p as portfolioSlugKey, v as visibleTags } from './usePortfolio-CUdxQeA9.mjs';
import { aJ as useState, aO as vueExports, ac as ssrRenderVNode, a3 as ssrInterpolate_1, a5 as ssrRenderAttrs_1, a4 as ssrRenderAttr_1, aa as ssrRenderStyle_1, a6 as ssrRenderClass_1, a7 as ssrRenderComponent_1, ak as useAsyncData, a8 as ssrRenderList_1, j as _sfc_main$d$1, d as _export_sfc, aH as useRuntimeConfig, a9 as ssrRenderSlot_1, ab as ssrRenderTeleport_1 } from './server.mjs';
import { u as useEditor, i as index_default, a as index_default$1, b as index_default$2, E as EditorContent } from '../_/index.mjs';
import { g as getCollectionType } from './collectionTypes-6EiXkZ_r.mjs';
import { _ as _sfc_main$h } from './Separator-CgixisDT.mjs';

const styleColorSection = {
  label: "Colors",
  fields: [
    { key: "background", label: "Background", type: "theme-color" },
    { key: "surfaceColor", label: "Surface", type: "theme-color" }
  ]
};
const styleBackgroundImageSection = {
  label: "Background image",
  fields: [
    { key: "backgroundImage", label: "Image", type: "image" },
    {
      key: "backgroundOpacity",
      label: "Image opacity",
      type: "slider",
      min: 0,
      max: 100,
      step: 5,
      unit: "%",
      showIf: { key: "backgroundImage", value: "truthy" }
    },
    {
      key: "backgroundFixed",
      label: "Fixed / parallax",
      type: "switch",
      showIf: { key: "backgroundImage", value: "truthy" }
    }
  ]
};
const styleOverlaySection = {
  label: "Overlay",
  fields: [
    { key: "overlayEnabled", label: "Enable overlay", type: "switch" },
    {
      key: "overlayType",
      label: "Type",
      type: "select",
      options: [
        { label: "Solid", value: "solid" },
        { label: "Gradient", value: "gradient" }
      ],
      showIf: { key: "overlayEnabled", value: true }
    },
    {
      key: "overlayColor",
      label: "Color",
      type: "theme-color",
      showIf: { key: "overlayEnabled", value: true }
    },
    {
      key: "overlayColor2",
      label: "Gradient end color",
      type: "theme-color",
      showIfAll: [
        { key: "overlayEnabled", value: true },
        { key: "overlayType", value: "gradient" }
      ]
    },
    {
      key: "overlayDegree",
      label: "Gradient direction",
      type: "slider",
      min: 0,
      max: 360,
      step: 15,
      unit: "°",
      showIfAll: [
        { key: "overlayEnabled", value: true },
        { key: "overlayType", value: "gradient" }
      ]
    },
    {
      key: "overlayOpacity",
      label: "Opacity",
      type: "slider",
      min: 0,
      max: 100,
      step: 5,
      unit: "%",
      showIf: { key: "overlayEnabled", value: true }
    }
  ]
};
const styleTab = {
  label: "Style",
  icon: "i-lucide-palette",
  sections: [styleColorSection, styleBackgroundImageSection, styleOverlaySection]
};
const styleDefaults = {
  background: null,
  surfaceColor: null,
  backgroundImage: null,
  backgroundOpacity: 100,
  backgroundFixed: false,
  overlayEnabled: false,
  overlayType: "solid",
  overlayColor: null,
  overlayColor2: null,
  overlayDegree: 180,
  overlayOpacity: 40
};
const PLATFORM_OPTIONS = [
  { label: "Twitter / X", value: "twitter" },
  { label: "Instagram", value: "instagram" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "GitHub", value: "github" },
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
  { label: "Facebook", value: "facebook" },
  { label: "Dribbble", value: "dribbble" },
  { label: "Behance", value: "behance" }
];
const headerDefinition = {
  type: "header",
  label: "Header",
  icon: "i-lucide-panel-top",
  component: BlocksHeader,
  defaultContent: {
    layout: "single",
    leftOrder: ["logo", "nav"],
    centerOrder: [],
    rightOrder: ["cta"],
    topOrder: ["logo"],
    showLogo: true,
    showNav: true,
    showCta: true,
    showSocials: false,
    showColorModeToggle: false,
    siteName: "",
    ctaButtons: [],
    socialLinks: [],
    logoSize: "md",
    logoStacked: false,
    brandingDisplay: "logo-and-title",
    ...styleDefaults,
    navStyle: {
      variant: "ghost",
      radius: "md",
      size: "sm",
      spacing: 4,
      uppercase: false,
      letterSpacing: 0
    },
    ctaStyle: {
      variant: "solid",
      radius: "md",
      size: "sm",
      spacing: 4,
      uppercase: false,
      letterSpacing: 0
    },
    padding: 16,
    borderWidth: 1,
    maxWidth: "7xl",
    position: "static",
    mobileMenuTitle: "",
    mobileBackground: null
  },
  tabs: [
    {
      label: "Layout",
      icon: "i-lucide-layout-panel-left",
      sections: [
        {
          label: "Layout",
          fields: [
            {
              key: "layout",
              label: "Header layout",
              type: "select",
              options: [
                { label: "Single row", value: "single" },
                { label: "Stacked", value: "stacked" }
              ]
            },
            {
              key: "position",
              label: "Position",
              type: "select",
              options: [
                { label: "Static", value: "static" },
                { label: "Sticky", value: "sticky" }
              ]
            },
            {
              key: "padding",
              label: "Padding",
              type: "slider",
              min: 0,
              max: 64,
              step: 2
            },
            {
              key: "borderWidth",
              label: "Border size",
              type: "slider",
              min: 0,
              max: 15,
              step: 1
            },
            {
              key: "maxWidth",
              label: "Inner max width",
              type: "select",
              options: [
                { label: "Full", value: "full" },
                { label: "SM (640px)", value: "sm" },
                { label: "MD (768px)", value: "md" },
                { label: "LG (1024px)", value: "lg" },
                { label: "XL (1280px)", value: "xl" },
                { label: "2XL (1536px)", value: "2xl" },
                { label: "3XL (1792px)", value: "3xl" },
                { label: "4XL (2048px)", value: "4xl" },
                { label: "5XL (2560px)", value: "5xl" },
                { label: "6XL (3072px)", value: "6xl" },
                { label: "7XL (3584px)", value: "7xl" }
              ]
            }
          ]
        }
      ]
    },
    {
      label: "Branding",
      icon: "i-lucide-building-2",
      sections: [
        {
          fields: [
            { key: "siteName", label: "Site name", type: "text", placeholder: "Your name" },
            { key: "showLogo", label: "Show logo", type: "switch" },
            {
              key: "logoSize",
              label: "Logo size",
              type: "select",
              showIf: { key: "showLogo", value: true },
              options: [
                { label: "XS", value: "xs" },
                { label: "Small", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Large", value: "lg" },
                { label: "XL", value: "xl" }
              ]
            },
            {
              key: "logoStacked",
              label: "Stack logo above title",
              type: "switch",
              showIf: { key: "showLogo", value: true }
            },
            {
              key: "brandingDisplay",
              label: "Display",
              type: "select",
              showIf: { key: "showLogo", value: true },
              options: [
                { label: "Logo & title", value: "logo-and-title" },
                { label: "Logo only", value: "logo-only" },
                { label: "Title only", value: "title-only" }
              ]
            }
          ]
        }
      ]
    },
    {
      label: "Navigation",
      icon: "i-lucide-navigation",
      sections: [
        {
          fields: [
            { key: "showNav", label: "Show navigation", type: "switch" },
            {
              key: "navStyle",
              label: "Links style",
              type: "button-style",
              showIf: { key: "showNav", value: true }
            }
          ]
        }
      ]
    },
    {
      label: "Widgets",
      icon: "i-lucide-layout-template",
      sections: [
        {
          label: "CTA buttons",
          fields: [
            { key: "showCta", label: "Show CTA buttons", type: "switch" },
            {
              key: "ctaStyle",
              label: "Button style",
              type: "button-style",
              showIf: { key: "showCta", value: true }
            },
            {
              key: "ctaButtons",
              label: "Buttons",
              type: "list",
              showIf: { key: "showCta", value: true },
              itemLabel: "Button",
              defaultItem: () => ({
                id: crypto.randomUUID(),
                label: "Hire me",
                url: "#contact",
                style: "filled"
              }),
              itemFields: [
                { key: "label", label: "Label", placeholder: "Hire me", inline: true },
                { key: "url", label: "URL", placeholder: "#contact", type: "url" },
                {
                  key: "style",
                  label: "Style",
                  type: "select",
                  options: [
                    { label: "Filled", value: "filled" },
                    { label: "Outline", value: "outline" },
                    { label: "Ghost", value: "ghost" }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "Social links",
          fields: [
            { key: "showSocials", label: "Show social links", type: "switch" },
            {
              key: "socialLinks",
              label: "Accounts",
              type: "list",
              showIf: { key: "showSocials", value: true },
              itemLabel: "Account",
              defaultItem: () => ({ id: crypto.randomUUID(), platform: "instagram", url: "" }),
              itemFields: [
                {
                  key: "platform",
                  label: "Platform",
                  inline: true,
                  type: "select",
                  options: PLATFORM_OPTIONS
                },
                { key: "url", label: "URL", placeholder: "https://...", type: "url" }
              ]
            }
          ]
        },
        {
          label: "Color mode toggle",
          fields: [{ key: "showColorModeToggle", label: "Show toggle", type: "switch" }]
        }
      ]
    },
    {
      label: "Mobile",
      icon: "i-lucide-smartphone",
      sections: [
        {
          fields: [
            {
              key: "mobileMenuTitle",
              label: "Menu header text",
              type: "text",
              placeholder: "Menu"
            },
            { key: "mobileBackground", label: "Menu background", type: "theme-color" }
          ]
        }
      ]
    },
    styleTab
  ]
};
const footerDefinition = {
  type: "footer",
  label: "Footer",
  icon: "i-lucide-panel-bottom",
  component: BlocksFooter,
  defaultContent: {
    siteName: "",
    copyrightText: ""
  },
  sections: [
    {
      label: "Branding",
      fields: [{ key: "siteName", label: "Site name", type: "text", placeholder: "Your name" }]
    },
    {
      label: "Copyright",
      fields: [
        {
          key: "copyrightText",
          label: "Copyright text",
          type: "text",
          placeholder: "© 2025 Your name (leave blank for auto)"
        }
      ]
    }
  ]
};
function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object") return acc[key];
    return void 0;
  }, obj);
}
function setPath(obj, path, value) {
  const keys = path.split(".");
  const result = { ...obj };
  let cursor = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    const nextIsIndex = /^\d+$/.test(nextKey);
    const existing = cursor[key];
    if (nextIsIndex) {
      cursor[key] = Array.isArray(existing) ? [...existing] : [];
    } else {
      cursor[key] = existing && typeof existing === "object" && !Array.isArray(existing) ? { ...existing } : {};
    }
    cursor = cursor[key];
  }
  cursor[keys[keys.length - 1]] = value;
  return result;
}
const _sfc_main$g = /* @__PURE__ */ vueExports.defineComponent({
  ...{ inheritAttrs: false },
  __name: "InlineTextField",
  __ssrInlineRender: true,
  props: {
    fieldKey: {},
    tag: {}
  },
  setup(__props) {
    const props = __props;
    const ctx = vueExports.inject(inlineEditorKey, null);
    const value = vueExports.computed(() => ctx ? String(getPath(ctx.blockContent, props.fieldKey) ?? "") : "");
    const elRef = vueExports.useTemplateRef("el");
    const isFocused = vueExports.ref(false);
    vueExports.watch(value, (v) => {
      if (elRef.value && (void 0).activeElement !== elRef.value) {
        elRef.value.innerText = v;
      }
    });
    function onBlur(e) {
      isFocused.value = false;
      ctx?.setField(props.fieldKey, e.target.innerText);
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (vueExports.unref(ctx)) {
        ssrRenderVNode(_push, vueExports.createVNode(vueExports.resolveDynamicComponent(__props.tag ?? "span"), vueExports.mergeProps({
          ref: "el",
          contenteditable: vueExports.unref(ctx).isActive
        }, _ctx.$attrs, {
          class: vueExports.unref(ctx).isActive ? "outline-none cursor-text empty:before:content-[attr(data-placeholder)] empty:before:opacity-40" : "",
          style: vueExports.unref(isFocused) ? "outline: 1px solid var(--ui-secondary); outline-offset: 4px; border-radius: 2px;" : "",
          onFocus: ($event) => isFocused.value = true,
          onBlur,
          onKeydown: ($event) => vueExports.unref(elRef)?.blur()
        }, _attrs), null), _parent);
      } else {
        ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push, _parent);
      }
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editor/InlineTextField.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$g, { __name: "EditorInlineTextField" });
const _sfc_main$f = /* @__PURE__ */ vueExports.defineComponent({
  ...{ inheritAttrs: false },
  __name: "InlineRichField",
  __ssrInlineRender: true,
  props: {
    fieldKey: {},
    placeholder: {},
    html: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const ctx = vueExports.inject(inlineEditorKey, null);
    const value = vueExports.computed(() => ctx ? String(getPath(ctx.blockContent, props.fieldKey) ?? "") : "");
    const toolbarVisible = vueExports.ref(false);
    const isFocused = vueExports.ref(false);
    const toolbarStyle = vueExports.ref({});
    const toolbarRef = vueExports.useTemplateRef("toolbar");
    const openPanel = vueExports.ref(null);
    const linkUrl = vueExports.ref("");
    const fmt = vueExports.reactive({
      bold: false,
      italic: false,
      strike: false,
      code: false,
      underline: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      bulletList: false,
      orderedList: false,
      blockquote: false,
      alignLeft: false,
      alignCenter: false,
      alignRight: false,
      link: false
    });
    const activeHeading = vueExports.computed(() => {
      if (fmt.h1) return "H1";
      if (fmt.h2) return "H2";
      if (fmt.h3) return "H3";
      if (fmt.h4) return "H4";
      if (fmt.h5) return "H5";
      if (fmt.h6) return "H6";
      return "H";
    });
    const activeAlign = vueExports.computed(() => {
      if (fmt.alignCenter) return "i-lucide-align-center";
      if (fmt.alignRight) return "i-lucide-align-right";
      return "i-lucide-align-left";
    });
    const activeList = vueExports.computed(() => {
      if (fmt.orderedList) return "1.";
      if (fmt.bulletList) return "•";
      return "i-lucide-list";
    });
    function updateToolbar() {
      const ed = editor?.value;
      if (!ed) return;
      const { empty } = ed.state.selection;
      fmt.bold = ed.isActive("bold");
      fmt.italic = ed.isActive("italic");
      fmt.strike = ed.isActive("strike");
      fmt.code = ed.isActive("code");
      fmt.underline = ed.isActive("underline");
      fmt.h1 = ed.isActive("heading", { level: 1 });
      fmt.h2 = ed.isActive("heading", { level: 2 });
      fmt.h3 = ed.isActive("heading", { level: 3 });
      fmt.h4 = ed.isActive("heading", { level: 4 });
      fmt.h5 = ed.isActive("heading", { level: 5 });
      fmt.h6 = ed.isActive("heading", { level: 6 });
      fmt.bulletList = ed.isActive("bulletList");
      fmt.orderedList = ed.isActive("orderedList");
      fmt.blockquote = ed.isActive("blockquote");
      fmt.alignLeft = ed.isActive({ textAlign: "left" });
      fmt.alignCenter = ed.isActive({ textAlign: "center" });
      fmt.alignRight = ed.isActive({ textAlign: "right" });
      fmt.link = ed.isActive("link");
      if (empty && openPanel.value === null) {
        toolbarVisible.value = false;
        return;
      }
      const domSelection = (void 0).getSelection();
      if (!domSelection || domSelection.rangeCount === 0) return;
      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (!rect.width && empty) return;
      toolbarVisible.value = true;
      toolbarStyle.value = {
        position: "fixed",
        top: `${rect.top - 44}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: "translateX(-50%)",
        zIndex: "9999"
      };
    }
    const editor = ctx ? useEditor({
      content: value.value,
      editable: ctx.isActive,
      extensions: [
        index_default,
        index_default$1.configure({ types: ["heading", "paragraph"] }),
        index_default$2.configure({ placeholder: props.placeholder ?? "" })
      ],
      editorProps: { attributes: { class: "outline-none cursor-text rich-text" } },
      onUpdate({ editor: editor2 }) {
        ctx.setField(props.fieldKey, props.html ? editor2.getHTML() : editor2.getText());
        updateToolbar();
      },
      onSelectionUpdate() {
        updateToolbar();
      },
      onBlur() {
        isFocused.value = false;
        setTimeout(() => {
          if (!toolbarRef.value?.matches(":focus-within")) {
            toolbarVisible.value = false;
            openPanel.value = null;
          }
        }, 150);
      },
      onFocus() {
        isFocused.value = true;
        updateToolbar();
      }
    }) : null;
    vueExports.watch(value, (v) => {
      if (!editor?.value || editor.value.isFocused) return;
      const current = props.html ? editor.value.getHTML() : editor.value.getText();
      if (current !== v) editor.value.commands.setContent(v);
    });
    vueExports.watch(
      () => ctx?.isActive,
      (active) => {
        if (!editor?.value) return;
        editor.value.setEditable(!!active, false);
        if (!active) {
          editor.value.commands.blur();
          toolbarVisible.value = false;
          openPanel.value = null;
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d$1;
      if (vueExports.unref(ctx) && vueExports.unref(editor)) {
        _push(`<!--[-->`);
        ssrRenderTeleport_1(_push, (_push2) => {
          if (vueExports.unref(toolbarVisible)) {
            _push2(`<div style="${ssrRenderStyle_1(vueExports.unref(toolbarStyle))}" class="relative" data-v-983cf2f1>`);
            if (vueExports.unref(openPanel) === "heading") {
              _push2(`<div class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5" data-v-983cf2f1><!--[-->`);
              ssrRenderList_1([1, 2, 3, 4, 5, 6], (lvl) => {
                _push2(`<button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt)[`h${lvl}`] }, "tiptap-toolbar-btn text-xs font-semibold w-7"])}" data-v-983cf2f1> H${ssrInterpolate_1(lvl)}</button>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(openPanel) === "list") {
              _push2(`<div class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5" data-v-983cf2f1><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).bulletList }, "tiptap-toolbar-btn text-xs"])}" title="Bullet list" data-v-983cf2f1>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-list",
                class: "size-3.5"
              }, null, _parent));
              _push2(`</button><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).orderedList }, "tiptap-toolbar-btn text-xs"])}" title="Numbered list" data-v-983cf2f1>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-list-ordered",
                class: "size-3.5"
              }, null, _parent));
              _push2(`</button><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).blockquote }, "tiptap-toolbar-btn text-xs"])}" title="Blockquote" data-v-983cf2f1>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-quote",
                class: "size-3.5"
              }, null, _parent));
              _push2(`</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(openPanel) === "align") {
              _push2(`<div class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5" data-v-983cf2f1><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).alignLeft }, "tiptap-toolbar-btn text-xs"])}" title="Align left" data-v-983cf2f1>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-align-left",
                class: "size-3.5"
              }, null, _parent));
              _push2(`</button><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).alignCenter }, "tiptap-toolbar-btn text-xs"])}" title="Align center" data-v-983cf2f1>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-align-center",
                class: "size-3.5"
              }, null, _parent));
              _push2(`</button><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).alignRight }, "tiptap-toolbar-btn text-xs"])}" title="Align right" data-v-983cf2f1>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-align-right",
                class: "size-3.5"
              }, null, _parent));
              _push2(`</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(openPanel) === "link") {
              _push2(`<div class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-900 text-white rounded-lg shadow-xl p-1.5 flex items-center gap-1 min-w-48" data-v-983cf2f1><input${ssrRenderAttr_1("value", vueExports.unref(linkUrl))} placeholder="https://..." class="flex-1 bg-white/10 rounded px-2 py-0.5 text-xs outline-none placeholder:text-white/40" data-v-983cf2f1><button class="tiptap-toolbar-btn text-xs bg-white/20 hover:bg-white/30" data-v-983cf2f1> Apply </button>`);
              if (vueExports.unref(fmt).link) {
                _push2(`<button class="tiptap-toolbar-btn text-xs text-red-400" data-v-983cf2f1>`);
                _push2(ssrRenderComponent_1(_component_UIcon, {
                  name: "i-lucide-unlink",
                  class: "size-3.5"
                }, null, _parent));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center gap-0.5 bg-neutral-900 text-white rounded-lg shadow-xl px-1.5 py-1 text-sm select-none" data-v-983cf2f1><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).bold }, "tiptap-toolbar-btn font-bold"])}" title="Bold" data-v-983cf2f1> B </button><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).italic }, "tiptap-toolbar-btn italic"])}" title="Italic" data-v-983cf2f1><em data-v-983cf2f1>I</em></button><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).underline }, "tiptap-toolbar-btn underline text-xs"])}" title="Underline" data-v-983cf2f1> U </button><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).strike }, "tiptap-toolbar-btn line-through text-xs"])}" title="Strikethrough" data-v-983cf2f1> S </button><button class="${ssrRenderClass_1([{ active: vueExports.unref(fmt).code }, "tiptap-toolbar-btn font-mono text-xs"])}" title="Inline code" data-v-983cf2f1> &lt;/&gt; </button><div class="tiptap-toolbar-divider" data-v-983cf2f1></div><button class="${ssrRenderClass_1([{
              active: vueExports.unref(openPanel) === "heading" || vueExports.unref(fmt).h1 || vueExports.unref(fmt).h2 || vueExports.unref(fmt).h3 || vueExports.unref(fmt).h4 || vueExports.unref(fmt).h5 || vueExports.unref(fmt).h6
            }, "tiptap-toolbar-btn text-xs font-semibold w-7"])}" title="Headings" data-v-983cf2f1>${ssrInterpolate_1(vueExports.unref(activeHeading))}</button><button class="${ssrRenderClass_1([{
              active: vueExports.unref(openPanel) === "list" || vueExports.unref(fmt).bulletList || vueExports.unref(fmt).orderedList || vueExports.unref(fmt).blockquote
            }, "tiptap-toolbar-btn text-xs"])}" title="Lists" data-v-983cf2f1>`);
            _push2(ssrRenderComponent_1(_component_UIcon, {
              name: typeof vueExports.unref(activeList) === "string" && vueExports.unref(activeList).startsWith("i-") ? vueExports.unref(activeList) : "i-lucide-list",
              class: "size-3.5"
            }, null, _parent));
            _push2(`</button><button class="${ssrRenderClass_1([{ active: vueExports.unref(openPanel) === "align" || vueExports.unref(fmt).alignCenter || vueExports.unref(fmt).alignRight }, "tiptap-toolbar-btn text-xs"])}" title="Text alignment" data-v-983cf2f1>`);
            _push2(ssrRenderComponent_1(_component_UIcon, {
              name: vueExports.unref(activeAlign),
              class: "size-3.5"
            }, null, _parent));
            _push2(`</button><div class="tiptap-toolbar-divider" data-v-983cf2f1></div><button class="${ssrRenderClass_1([{ active: vueExports.unref(openPanel) === "link" || vueExports.unref(fmt).link }, "tiptap-toolbar-btn text-xs"])}" title="Link" data-v-983cf2f1>`);
            _push2(ssrRenderComponent_1(_component_UIcon, {
              name: "i-lucide-link",
              class: "size-3.5"
            }, null, _parent));
            _push2(`</button><button class="tiptap-toolbar-btn text-xs" title="Horizontal rule" data-v-983cf2f1>`);
            _push2(ssrRenderComponent_1(_component_UIcon, {
              name: "i-lucide-minus",
              class: "size-3.5"
            }, null, _parent));
            _push2(`</button><div class="tiptap-toolbar-divider" data-v-983cf2f1></div><button class="tiptap-toolbar-btn text-xs" title="Undo" data-v-983cf2f1>`);
            _push2(ssrRenderComponent_1(_component_UIcon, {
              name: "i-lucide-undo-2",
              class: "size-3.5"
            }, null, _parent));
            _push2(`</button><button class="tiptap-toolbar-btn text-xs" title="Redo" data-v-983cf2f1>`);
            _push2(ssrRenderComponent_1(_component_UIcon, {
              name: "i-lucide-redo-2",
              class: "size-3.5"
            }, null, _parent));
            _push2(`</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
        }, "body", false, _parent);
        _push(`<div style="${ssrRenderStyle_1(
          vueExports.unref(isFocused) ? "outline: 1px solid var(--ui-secondary); outline-offset: 4px; border-radius: 2px;" : ""
        )}" data-v-983cf2f1>`);
        _push(ssrRenderComponent_1(vueExports.unref(EditorContent), {
          editor: vueExports.unref(editor),
          class: _ctx.$attrs.class
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else {
        ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push, _parent);
      }
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editor/InlineRichField.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$f, [["__scopeId", "data-v-983cf2f1"]]), { __name: "EditorInlineRichField" });
function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
function useBlockBackground(background) {
  const { resolveTextColor } = useActivePalette();
  const autoTextColor = vueExports.computed(() => {
    const key = vueExports.toValue(background);
    return key ? resolveTextColor(key) : null;
  });
  const textColorStyle = vueExports.computed(
    () => autoTextColor.value ? { color: autoTextColor.value } : {}
  );
  const textPrimaryStyle = vueExports.computed(
    () => autoTextColor.value ? { color: autoTextColor.value } : { color: "var(--text-primary)" }
  );
  const textMutedStyle = vueExports.computed(
    () => autoTextColor.value ? { color: autoTextColor.value, opacity: "0.6" } : { color: "var(--text-secondary)" }
  );
  return { autoTextColor, textColorStyle, textPrimaryStyle, textMutedStyle };
}
function useBlockSurface(surfaceColor) {
  const { resolveColor, resolveTextColor, resolvePrimary, resolveSecondary } = useActivePalette();
  const surfaceHex = vueExports.computed(() => {
    const key = vueExports.toValue(surfaceColor);
    return key ? resolveColor(key) : null;
  });
  const surfaceHexOrDefault = vueExports.computed(() => surfaceHex.value ?? "var(--bg-surface)");
  const surfaceStyle = vueExports.computed(
    () => surfaceHex.value ? { backgroundColor: surfaceHex.value } : { backgroundColor: "var(--bg-surface)" }
  );
  const surfaceTextColor = vueExports.computed(() => {
    const key = vueExports.toValue(surfaceColor);
    return key ? resolveTextColor(key) : null;
  });
  const surfaceTextStyle = vueExports.computed(
    () => surfaceTextColor.value ? { color: surfaceTextColor.value } : { color: "var(--text-primary)" }
  );
  const surfaceTextMutedStyle = vueExports.computed(
    () => surfaceTextColor.value ? { color: surfaceTextColor.value, opacity: "0.6" } : { color: "var(--text-secondary)" }
  );
  const surfacePrimary = vueExports.computed(() => resolvePrimary(vueExports.toValue(surfaceColor)));
  const surfaceSecondary = vueExports.computed(() => resolveSecondary(vueExports.toValue(surfaceColor)));
  return {
    surfaceHex,
    surfaceHexOrDefault,
    surfaceStyle,
    surfaceTextColor,
    surfaceTextStyle,
    surfaceTextMutedStyle,
    surfacePrimary,
    surfaceSecondary
  };
}
const _sfc_main$e = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Hero",
  __ssrInlineRender: true,
  props: {
    heading: { default: "" },
    showSubheading: { type: Boolean, default: true },
    subheading: { default: "" },
    alignH: { default: "center" },
    alignV: { default: "center" },
    showButton1: { type: Boolean, default: true },
    button1Label: { default: "View my work" },
    button1Url: { default: "#projects" },
    button1Style: { default: null },
    showButton2: { type: Boolean, default: true },
    button2Label: { default: "Get in touch" },
    button2Url: { default: "#contact" },
    button2Style: { default: null },
    image: { default: null },
    imagePosition: { default: "right" },
    imageSize: { default: "md" },
    imageRadius: { default: 12 },
    imageAspect: { default: "auto" },
    headingFont: { default: null },
    background: { default: null },
    surfaceColor: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    textShadow: { type: Boolean, default: false },
    fullHeight: { type: Boolean, default: false },
    height: { default: 500 },
    padding: { default: 48 },
    maxWidth: { default: "md" }
  },
  setup(__props) {
    const B1_DEFAULTS = {
      variant: "solid",
      radius: "md",
      size: "md",
      spacing: 4,
      uppercase: false,
      letterSpacing: 0
    };
    const B2_DEFAULTS = {
      variant: "outline",
      radius: "md",
      size: "md",
      spacing: 4,
      uppercase: false,
      letterSpacing: 0
    };
    const props = __props;
    const { resolveColor, resolveTextColor, resolvePrimary, resolveSecondary } = useActivePalette();
    const bgHex = vueExports.computed(() => props.background ? resolveColor(props.background) : null);
    const autoTextColor = vueExports.computed(
      () => props.background ? resolveTextColor(props.background) : null
    );
    const hasBackgroundImage = vueExports.computed(() => !!props.backgroundImage);
    const headingColor = vueExports.computed(() => autoTextColor.value ?? "var(--text-primary)");
    const subheadingColor = vueExports.computed(() => autoTextColor.value ?? "var(--text-secondary)");
    const textShadowColor = vueExports.computed(() => {
      const c = autoTextColor.value;
      if (!c || !c.startsWith("#")) return "rgba(0,0,0,0.6)";
      const h = c.replace("#", "");
      const r = parseInt(h.slice(0, 2), 16) / 255;
      const g = parseInt(h.slice(2, 4), 16) / 255;
      const b = parseInt(h.slice(4, 6), 16) / 255;
      const lin = (x) => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
      const lum = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
      return lum > 0.5 ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)";
    });
    const overlayColorHex = vueExports.computed(
      () => props.overlayColor ? resolveColor(props.overlayColor) : null
    );
    const overlayColor2Hex = vueExports.computed(
      () => props.overlayColor2 ? resolveColor(props.overlayColor2) : null
    );
    const overlayStyle = vueExports.computed(() => {
      if (!props.overlayEnabled) return null;
      const opacity = (props.overlayOpacity ?? 40) / 100;
      const c1 = hexToRgba(overlayColorHex.value ?? "#000000", opacity);
      const bg = props.overlayType === "gradient" ? `linear-gradient(${props.overlayDegree ?? 180}deg, ${c1}, ${hexToRgba(overlayColor2Hex.value ?? "#000000", opacity)})` : c1;
      return { background: bg };
    });
    const sectionStyle = vueExports.computed(() => ({
      minHeight: props.fullHeight ? "100vh" : `${props.height}px`,
      paddingTop: `${props.padding}px`,
      paddingBottom: `${props.padding}px`,
      ...bgHex.value ? { backgroundColor: bgHex.value } : {},
      // When fixed/parallax is on, bg image must be applied as CSS background-image (position:fixed on <img> breaks layout)
      ...hasBackgroundImage.value && props.backgroundFixed ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        opacity: void 0
      } : {}
    }));
    const bgImageStyle = vueExports.computed(() => ({
      opacity: (props.backgroundOpacity ?? 100) / 100
    }));
    const maxWidthClass = vueExports.computed(() => {
      if (props.maxWidth === "sm") return "max-w-xl";
      if (props.maxWidth === "lg") return "max-w-5xl";
      if (props.maxWidth === "full") return "max-w-none";
      return "max-w-3xl";
    });
    const textAlignClass = vueExports.computed(() => {
      if (props.alignH === "left") return "items-start text-left";
      if (props.alignH === "right") return "items-end text-right";
      return "items-center text-center";
    });
    const justifyHClass = vueExports.computed(() => {
      if (props.alignH === "left") return "justify-start";
      if (props.alignH === "right") return "justify-end";
      return "justify-center";
    });
    const justifyVClass = vueExports.computed(() => {
      if (props.alignV === "top") return "justify-start";
      if (props.alignV === "bottom") return "justify-end";
      return "justify-center";
    });
    const hasImage = vueExports.computed(() => !!props.image);
    const isVerticalImage = vueExports.computed(
      () => props.imagePosition === "above" || props.imagePosition === "below"
    );
    const contentLayout = vueExports.computed(() => {
      if (!hasImage.value) return "flex-col";
      return isVerticalImage.value ? "flex-col" : "flex-row gap-12";
    });
    const imageOrderClass = vueExports.computed(() => {
      if (props.imagePosition === "left" || props.imagePosition === "above") return "order-first";
      return "order-last";
    });
    const imageSizeClass = vueExports.computed(() => {
      if (isVerticalImage.value) {
        const map2 = { sm: "max-w-xs", md: "max-w-sm", lg: "max-w-lg", xl: "max-w-2xl" };
        return map2[props.imageSize ?? "md"];
      }
      const map = { sm: "sm:max-w-[200px]", md: "sm:max-w-xs", lg: "sm:max-w-sm", xl: "sm:max-w-md" };
      return map[props.imageSize ?? "md"];
    });
    const imageAspectClass = vueExports.computed(() => {
      const map = {
        auto: "",
        square: "aspect-square",
        portrait: "aspect-[3/4]",
        video: "aspect-video"
      };
      return map[props.imageAspect ?? "auto"];
    });
    const imageRadiusStyle = vueExports.computed(() => ({ borderRadius: `${props.imageRadius ?? 12}px` }));
    const textShadowStyle = vueExports.computed(
      () => props.textShadow ? { textShadow: `0 1px 4px ${textShadowColor.value}` } : {}
    );
    function btnRadiusClass(radius) {
      if (radius === "none") return "rounded-none";
      if (radius === "sm") return "rounded-sm";
      if (radius === "lg") return "rounded-lg";
      if (radius === "full") return "rounded-full";
      return "rounded-md";
    }
    function btnSizeClass(size) {
      if (size === "xs") return "px-2 py-0.5 text-xs";
      if (size === "md") return "px-4 py-2 text-base";
      if (size === "lg") return "px-5 py-2.5 text-lg";
      return "px-3 py-1.5 text-sm";
    }
    function btnTextStyle(style) {
      return {
        ...style.uppercase ? { textTransform: "uppercase" } : {},
        ...style.letterSpacing > 0 ? { letterSpacing: `${(style.letterSpacing * 0.0625).toFixed(4)}em` } : {}
      };
    }
    const bgPrimary = vueExports.computed(() => resolvePrimary(props.background));
    const bgSecondary = vueExports.computed(() => resolveSecondary(props.background));
    function btnStyle(bStyle, color) {
      const text = btnTextStyle(bStyle);
      const luminance = (hex) => {
        const h = hex.replace("#", "");
        const r = parseInt(h.slice(0, 2), 16) / 255;
        const g = parseInt(h.slice(2, 4), 16) / 255;
        const b = parseInt(h.slice(4, 6), 16) / 255;
        const lin = (c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
      };
      const variant = bStyle.variant;
      if (variant === "solid") {
        const contrast = color.startsWith("#") && luminance(color) > 0.179 ? "#1a1a1a" : "#ffffff";
        return { backgroundColor: color, color: contrast, ...text };
      }
      if (variant === "soft") {
        return { backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color, ...text };
      }
      if (variant === "outline") {
        if (hasBackgroundImage.value)
          return { border: "1px solid rgba(255,255,255,0.6)", color: "#ffffff", ...text };
        return { border: `1px solid ${color}`, color, backgroundColor: "transparent", ...text };
      }
      if (variant === "link") {
        return { color, textDecoration: "underline", textUnderlineOffset: "4px", ...text };
      }
      return { color, backgroundColor: "transparent", ...text };
    }
    const btn1Resolved = vueExports.computed(() => ({ ...B1_DEFAULTS, ...props.button1Style }));
    const btn2Resolved = vueExports.computed(() => ({ ...B2_DEFAULTS, ...props.button2Style }));
    const btn1Class = vueExports.computed(
      () => `font-medium transition-opacity hover:opacity-90 ${btnRadiusClass(btn1Resolved.value.radius)} ${btnSizeClass(btn1Resolved.value.size)}`
    );
    const btn2Class = vueExports.computed(
      () => `font-medium transition-opacity hover:opacity-90 ${btnRadiusClass(btn2Resolved.value.radius)} ${btnSizeClass(btn2Resolved.value.size)}`
    );
    const btn1StyleVal = vueExports.computed(() => btnStyle(btn1Resolved.value, bgPrimary.value));
    const btn2StyleVal = vueExports.computed(() => btnStyle(btn2Resolved.value, bgSecondary.value));
    const subheadingIsEmpty = vueExports.computed(() => {
      const t = props.subheading?.trim() ?? "";
      return !t || t === "<p></p>";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EditorInlineTextField = __nuxt_component_1;
      const _component_EditorInlineRichField = __nuxt_component_3$1;
      _push(`<section${ssrRenderAttrs_1(vueExports.mergeProps({
        class: ["relative px-8 flex flex-col", vueExports.unref(justifyVClass)],
        style: vueExports.unref(sectionStyle)
      }, _attrs))}>`);
      if (__props.backgroundImage && !__props.backgroundFixed) {
        _push(`<img${ssrRenderAttr_1("src", __props.backgroundImage)} aria-hidden="true" class="absolute inset-0 w-full h-full object-cover pointer-events-none" style="${ssrRenderStyle_1(vueExports.unref(bgImageStyle))}">`);
      } else {
        _push(`<!---->`);
      }
      if (__props.overlayEnabled && vueExports.unref(overlayStyle)) {
        _push(`<div class="absolute inset-0 pointer-events-none" style="${ssrRenderStyle_1(vueExports.unref(overlayStyle))}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass_1([vueExports.unref(maxWidthClass), "relative w-full mx-auto"])}"><div class="${ssrRenderClass_1([[vueExports.unref(contentLayout), vueExports.unref(textAlignClass)], "flex flex-wrap w-full"])}"><div class="${ssrRenderClass_1([vueExports.unref(textAlignClass), "flex flex-col flex-1 min-w-0"])}">`);
      _push(ssrRenderComponent_1(_component_EditorInlineTextField, {
        "field-key": "heading",
        tag: "h1",
        class: "text-5xl font-bold leading-tight",
        style: {
          color: vueExports.unref(headingColor),
          fontFamily: __props.headingFont ?? void 0,
          ...vueExports.unref(textShadowStyle)
        }
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-5xl font-bold leading-tight" style="${ssrRenderStyle_1({
              color: vueExports.unref(headingColor),
              fontFamily: __props.headingFont ?? void 0,
              ...vueExports.unref(textShadowStyle)
            })}"${_scopeId}>${ssrInterpolate_1(__props.heading)}</h1>`);
          } else {
            return [
              vueExports.createVNode("h1", {
                class: "text-5xl font-bold leading-tight",
                style: {
                  color: vueExports.unref(headingColor),
                  fontFamily: __props.headingFont ?? void 0,
                  ...vueExports.unref(textShadowStyle)
                }
              }, vueExports.toDisplayString(__props.heading), 5)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.showSubheading) {
        _push(`<div style="${ssrRenderStyle_1({ color: vueExports.unref(subheadingColor), ...vueExports.unref(textShadowStyle) })}">`);
        _push(ssrRenderComponent_1(_component_EditorInlineRichField, {
          "field-key": "subheading",
          placeholder: "Your tagline",
          class: "text-lg mt-4 max-w-xl rich-text"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (!vueExports.unref(subheadingIsEmpty)) {
                _push2(`<div class="text-lg mt-4 max-w-xl rich-text"${_scopeId}>${vueExports.unref(sanitizeHtml)(__props.subheading ?? "") ?? ""}</div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                !vueExports.unref(subheadingIsEmpty) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "text-lg mt-4 max-w-xl rich-text",
                  innerHTML: vueExports.unref(sanitizeHtml)(__props.subheading ?? "")
                }, null, 8, ["innerHTML"])) : vueExports.createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showButton1 || __props.showButton2) {
        _push(`<div class="${ssrRenderClass_1([vueExports.unref(justifyHClass), "flex flex-wrap gap-3 mt-8"])}">`);
        if (__props.showButton1) {
          _push(`<a${ssrRenderAttr_1("href", __props.button1Url)} class="${ssrRenderClass_1(vueExports.unref(btn1Class))}" style="${ssrRenderStyle_1(vueExports.unref(btn1StyleVal))}">`);
          _push(ssrRenderComponent_1(_component_EditorInlineTextField, {
            "field-key": "button1Label",
            "data-placeholder": __props.button1Label
          }, {
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate_1(__props.button1Label)}`);
              } else {
                return [
                  vueExports.createTextVNode(vueExports.toDisplayString(__props.button1Label), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</a>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.showButton2) {
          _push(`<a${ssrRenderAttr_1("href", __props.button2Url)} class="${ssrRenderClass_1(vueExports.unref(btn2Class))}" style="${ssrRenderStyle_1(vueExports.unref(btn2StyleVal))}">`);
          _push(ssrRenderComponent_1(_component_EditorInlineTextField, {
            "field-key": "button2Label",
            "data-placeholder": __props.button2Label
          }, {
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate_1(__props.button2Label)}`);
              } else {
                return [
                  vueExports.createTextVNode(vueExports.toDisplayString(__props.button2Label), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.image) {
        _push(`<div class="${ssrRenderClass_1([
          vueExports.unref(imageOrderClass),
          vueExports.unref(imageSizeClass),
          vueExports.unref(isVerticalImage) ? "w-full mx-auto" : "shrink-0 w-full sm:w-auto"
        ])}"><img${ssrRenderAttr_1("src", __props.image)} alt="" class="${ssrRenderClass_1([vueExports.unref(imageAspectClass) || "h-auto", "w-full object-cover"])}" style="${ssrRenderStyle_1(vueExports.unref(imageRadiusStyle))}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Hero.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const BlocksHero = Object.assign(_sfc_main$e, { __name: "BlocksHero" });
const heroDefinition = {
  type: "hero",
  label: "Hero",
  icon: "i-lucide-monitor",
  component: BlocksHero,
  defaultContent: {
    heading: "Your name",
    showSubheading: true,
    subheading: "<p>Your tagline</p>",
    alignH: "center",
    alignV: "center",
    showButton1: true,
    button1Label: "View my work",
    button1Url: "#projects",
    button1Style: {
      variant: "solid",
      radius: "md",
      size: "md",
      spacing: 4,
      uppercase: false,
      letterSpacing: 0
    },
    showButton2: true,
    button2Label: "Get in touch",
    button2Url: "#contact",
    button2Style: {
      variant: "outline",
      radius: "md",
      size: "md",
      spacing: 4,
      uppercase: false,
      letterSpacing: 0
    },
    image: null,
    imagePosition: "right",
    imageSize: "md",
    imageRadius: 12,
    imageAspect: "auto",
    headingFont: null,
    textShadow: false,
    fullHeight: false,
    height: 500,
    padding: 48,
    maxWidth: "md",
    ...styleDefaults
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [
        {
          label: "Text",
          fields: [
            { key: "heading", label: "Heading", type: "inline-text", placeholder: "Your name" },
            { key: "showSubheading", label: "Show tagline", type: "switch" },
            {
              key: "subheading",
              label: "Subheading",
              type: "inline-rich",
              placeholder: "Your tagline",
              showIf: { key: "showSubheading", value: true }
            },
            { key: "headingFont", label: "Heading font", type: "font" }
          ]
        },
        {
          label: "Button 1",
          fields: [
            { key: "showButton1", label: "Show button 1", type: "switch" },
            {
              key: "button1Label",
              label: "Label",
              type: "text",
              placeholder: "View my work",
              showIf: { key: "showButton1", value: true }
            },
            {
              key: "button1Url",
              label: "URL",
              type: "url",
              placeholder: "#projects",
              showIf: { key: "showButton1", value: true }
            },
            {
              key: "button1Style",
              label: "Button style",
              type: "button-style",
              showIf: { key: "showButton1", value: true }
            }
          ]
        },
        {
          label: "Button 2",
          fields: [
            { key: "showButton2", label: "Show button 2", type: "switch" },
            {
              key: "button2Label",
              label: "Label",
              type: "text",
              placeholder: "Get in touch",
              showIf: { key: "showButton2", value: true }
            },
            {
              key: "button2Url",
              label: "URL",
              type: "url",
              placeholder: "#contact",
              showIf: { key: "showButton2", value: true }
            },
            {
              key: "button2Style",
              label: "Button style",
              type: "button-style",
              showIf: { key: "showButton2", value: true }
            }
          ]
        }
      ]
    },
    {
      label: "Layout",
      icon: "i-lucide-layout",
      sections: [
        {
          fields: [
            {
              key: "alignH",
              label: "Horizontal alignment",
              type: "select",
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" }
              ]
            },
            {
              key: "alignV",
              label: "Vertical alignment",
              type: "select",
              options: [
                { label: "Top", value: "top" },
                { label: "Center", value: "center" },
                { label: "Bottom", value: "bottom" }
              ]
            },
            {
              key: "maxWidth",
              label: "Content width",
              type: "select",
              options: [
                { label: "Narrow", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Wide", value: "lg" },
                { label: "Full", value: "full" }
              ]
            },
            { key: "fullHeight", label: "Full viewport height", type: "switch" },
            {
              key: "height",
              label: "Height",
              type: "slider",
              min: 200,
              max: 900,
              step: 50,
              showIf: { key: "fullHeight", value: false }
            },
            {
              key: "padding",
              label: "Padding",
              type: "slider",
              min: 0,
              max: 192,
              step: 8
            },
            { key: "textShadow", label: "Text shadow", type: "switch" }
          ]
        }
      ]
    },
    {
      label: "Side image",
      icon: "i-lucide-image",
      sections: [
        {
          fields: [
            { key: "image", label: "Image", type: "image" },
            {
              key: "imagePosition",
              label: "Position",
              type: "select",
              options: [
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
                { label: "Above", value: "above" },
                { label: "Below", value: "below" }
              ],
              showIf: { key: "image", value: "truthy" }
            },
            {
              key: "imageSize",
              label: "Size",
              type: "select",
              options: [
                { label: "Small", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Large", value: "lg" },
                { label: "Extra large", value: "xl" }
              ],
              showIf: { key: "image", value: "truthy" }
            },
            {
              key: "imageAspect",
              label: "Aspect ratio",
              type: "select",
              options: [
                { label: "Auto", value: "auto" },
                { label: "Square (1:1)", value: "square" },
                { label: "Portrait (3:4)", value: "portrait" },
                { label: "Video (16:9)", value: "video" }
              ],
              showIf: { key: "image", value: "truthy" }
            },
            {
              key: "imageRadius",
              label: "Corner radius",
              type: "slider",
              min: 0,
              max: 200,
              step: 1,
              unit: "px",
              showIf: { key: "image", value: "truthy" }
            }
          ]
        }
      ]
    },
    styleTab
  ]
};
const _sfc_main$d = /* @__PURE__ */ vueExports.defineComponent({
  ...{ inheritAttrs: false },
  __name: "BlockWrapper",
  __ssrInlineRender: true,
  props: {
    background: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    class: { default: "px-8 py-16" }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { resolveColor } = useActivePalette();
    const bgHex = vueExports.computed(() => props.background ? resolveColor(props.background) : null);
    const hasBackgroundImage = vueExports.computed(() => !!props.backgroundImage);
    const sectionStyle = vueExports.computed(() => ({
      ...bgHex.value ? { backgroundColor: bgHex.value } : {},
      // Fixed/parallax must use CSS background-image — position:fixed on <img> breaks layout
      ...hasBackgroundImage.value && props.backgroundFixed ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      } : {}
    }));
    const bgImageStyle = vueExports.computed(() => ({
      opacity: (props.backgroundOpacity ?? 100) / 100
    }));
    const overlayColorHex = vueExports.computed(
      () => props.overlayColor ? resolveColor(props.overlayColor) : null
    );
    const overlayColor2Hex = vueExports.computed(
      () => props.overlayColor2 ? resolveColor(props.overlayColor2) : null
    );
    const overlayStyle = vueExports.computed(() => {
      if (!props.overlayEnabled) return null;
      const opacity = (props.overlayOpacity ?? 40) / 100;
      const c1 = hexToRgba(overlayColorHex.value ?? "#000000", opacity);
      const bg = props.overlayType === "gradient" ? `linear-gradient(${props.overlayDegree ?? 180}deg, ${c1}, ${hexToRgba(overlayColor2Hex.value ?? "#000000", opacity)})` : c1;
      return { background: bg };
    });
    const sectionEl = vueExports.useTemplateRef("sectionEl");
    __expose({ el: sectionEl });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs_1(vueExports.mergeProps({
        ref_key: "sectionEl",
        ref: sectionEl,
        class: ["relative", props.class],
        style: vueExports.unref(sectionStyle)
      }, _attrs))}>`);
      if (__props.backgroundImage && !__props.backgroundFixed) {
        _push(`<img${ssrRenderAttr_1("src", __props.backgroundImage)} aria-hidden="true" class="absolute inset-0 w-full h-full object-cover pointer-events-none" style="${ssrRenderStyle_1(vueExports.unref(bgImageStyle))}">`);
      } else {
        _push(`<!---->`);
      }
      if (__props.overlayEnabled && vueExports.unref(overlayStyle)) {
        _push(`<div class="absolute inset-0 pointer-events-none" style="${ssrRenderStyle_1(vueExports.unref(overlayStyle))}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative">`);
      ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/BlockWrapper.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$d, { __name: "BlocksBlockWrapper" });
const _sfc_main$c = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Text",
  __ssrInlineRender: true,
  props: {
    background: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    surfaceColor: { default: null },
    content: { default: "" },
    align: { default: "left" }
  },
  setup(__props) {
    const props = __props;
    const inEditor = Boolean(vueExports.inject(inlineEditorKey, null));
    const isEmpty = vueExports.computed(() => {
      const t = props.content?.trim() ?? "";
      return !t || t === "<p></p>";
    });
    const { autoTextColor } = useBlockBackground(() => props.background);
    const { maxContentWidth } = useLayoutSettings();
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksBlockWrapper = __nuxt_component_0;
      const _component_EditorInlineRichField = __nuxt_component_3$1;
      if (vueExports.unref(inEditor) || !vueExports.unref(isEmpty)) {
        _push(ssrRenderComponent_1(_component_BlocksBlockWrapper, vueExports.mergeProps({ class: "px-8 py-12" }, {
          background: __props.background,
          backgroundImage: __props.backgroundImage,
          backgroundOpacity: __props.backgroundOpacity,
          backgroundFixed: __props.backgroundFixed,
          overlayEnabled: __props.overlayEnabled,
          overlayType: __props.overlayType,
          overlayColor: __props.overlayColor,
          overlayColor2: __props.overlayColor2,
          overlayDegree: __props.overlayDegree,
          overlayOpacity: __props.overlayOpacity
        }, _attrs), {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass_1([[
                vueExports.unref(maxWidthClass),
                {
                  "text-left": __props.align === "left",
                  "text-center": __props.align === "center",
                  "text-right": __props.align === "right"
                }
              ], "mx-auto rich-text"])}" style="${ssrRenderStyle_1(vueExports.unref(autoTextColor) ? { color: vueExports.unref(autoTextColor) } : {})}"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_EditorInlineRichField, {
                "field-key": "content",
                placeholder: "Start typing...",
                html: "",
                class: "w-full"
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (__props.content) {
                      _push3(`<div${_scopeId2}>${vueExports.unref(sanitizeHtml)(__props.content) ?? ""}</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      __props.content ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        innerHTML: vueExports.unref(sanitizeHtml)(__props.content)
                      }, null, 8, ["innerHTML"])) : vueExports.createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                vueExports.createVNode("div", {
                  class: ["mx-auto rich-text", [
                    vueExports.unref(maxWidthClass),
                    {
                      "text-left": __props.align === "left",
                      "text-center": __props.align === "center",
                      "text-right": __props.align === "right"
                    }
                  ]],
                  style: vueExports.unref(autoTextColor) ? { color: vueExports.unref(autoTextColor) } : {}
                }, [
                  vueExports.createVNode(_component_EditorInlineRichField, {
                    "field-key": "content",
                    placeholder: "Start typing...",
                    html: "",
                    class: "w-full"
                  }, {
                    default: vueExports.withCtx(() => [
                      __props.content ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        innerHTML: vueExports.unref(sanitizeHtml)(__props.content)
                      }, null, 8, ["innerHTML"])) : vueExports.createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ], 6)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Text.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const BlocksText = Object.assign(_sfc_main$c, { __name: "BlocksText" });
const textDefinition = {
  type: "text",
  label: "Text",
  icon: "i-lucide-text",
  component: BlocksText,
  defaultContent: {
    content: "",
    align: "left",
    ...styleDefaults
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [
        {
          label: "Content",
          fields: [
            {
              key: "content",
              label: "Content",
              type: "inline-rich",
              placeholder: "Start typing..."
            }
          ]
        },
        {
          label: "Layout",
          fields: [
            {
              key: "align",
              label: "Text alignment",
              type: "select",
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" }
              ]
            }
          ]
        }
      ]
    },
    styleTab
  ]
};
const _sfc_main$b = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Projects",
  __ssrInlineRender: true,
  props: {
    background: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    surfaceColor: { default: null },
    heading: { default: "Projects" },
    showHeading: { type: Boolean, default: true },
    filterTag: { default: "" },
    linkToPage: { type: Boolean, default: true },
    collectionId: { default: "" }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const slug = vueExports.inject(portfolioSlugKey, "");
    const config = useRuntimeConfig();
    const baseURL = config.apiUrl;
    const { maxContentWidth } = useLayoutSettings();
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
    const { resolvePrimary, resolveSecondary } = useActivePalette();
    const bgPrimary = vueExports.computed(() => resolvePrimary(props.background));
    const bgSecondary = vueExports.computed(() => resolveSecondary(props.background));
    const { autoTextColor, textColorStyle } = useBlockBackground(() => props.background);
    const { surfaceHex, surfaceStyle, surfaceTextStyle, surfaceTextMutedStyle, surfacePrimary } = useBlockSurface(() => props.surfaceColor);
    const { data } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      () => `portfolio-${slug}-projects-${props.collectionId || "default"}`,
      () => {
        const url = props.collectionId ? `/api/portfolios/${slug}/collections/by-id/${props.collectionId}` : `/api/portfolios/${slug}/collections/projects`;
        return $fetch(url, { baseURL });
      },
      "$J64TZpMVvD"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const projects = vueExports.computed(() => {
      const all = data.value?.items ?? [];
      return props.filterTag ? all.filter((p) => p.data.tags?.includes(props.filterTag)) : all;
    });
    const hasDetailPage = !!getCollectionType("projects")?.pageTemplate;
    const isLinked = vueExports.computed(() => hasDetailPage && props.linkToPage);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksBlockWrapper = __nuxt_component_0;
      const _component_EditorInlineTextField = __nuxt_component_1;
      if (vueExports.unref(projects).length) {
        _push(ssrRenderComponent_1(_component_BlocksBlockWrapper, vueExports.mergeProps({ class: "px-8 py-16" }, {
          background: __props.background,
          backgroundImage: __props.backgroundImage,
          backgroundOpacity: __props.backgroundOpacity,
          backgroundFixed: __props.backgroundFixed,
          overlayEnabled: __props.overlayEnabled,
          overlayType: __props.overlayType,
          overlayColor: __props.overlayColor,
          overlayColor2: __props.overlayColor2,
          overlayDegree: __props.overlayDegree,
          overlayOpacity: __props.overlayOpacity
        }, _attrs), {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass_1([[vueExports.unref(maxWidthClass)], "mx-auto"])}"${_scopeId}>`);
              if (__props.showHeading) {
                _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                  "field-key": "heading",
                  tag: "h2",
                  class: "text-3xl font-bold mb-8",
                  style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<h2 class="text-3xl font-bold mb-8" style="${ssrRenderStyle_1({
                        ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                        fontFamily: "var(--font-heading)"
                      })}"${_scopeId2}>${ssrInterpolate_1(__props.heading)}</h2>`);
                    } else {
                      return [
                        vueExports.createVNode("h2", {
                          class: "text-3xl font-bold mb-8",
                          style: {
                            ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                            fontFamily: "var(--font-heading)"
                          }
                        }, vueExports.toDisplayString(__props.heading), 5)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(projects), (project, i) => {
                ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref(isLinked) ? "a" : "div"), {
                  key: project.id,
                  class: ["rounded-xl p-6 flex flex-col gap-3 transition-opacity hover:opacity-80", { "cursor-pointer": vueExports.unref(isLinked) }],
                  href: vueExports.unref(isLinked) ? `/p/${vueExports.unref(slug)}/projects/${project.id}` : void 0,
                  style: vueExports.unref(surfaceStyle)
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="h-32 rounded-lg overflow-hidden" style="${ssrRenderStyle_1({
                        backgroundColor: i % 2 === 0 ? `color-mix(in srgb, ${vueExports.unref(bgSecondary)} 20%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})` : `color-mix(in srgb, ${vueExports.unref(bgPrimary)} 20%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})`
                      })}"${_scopeId2}>`);
                      if (project.data.previewImageUrl) {
                        _push3(`<img${ssrRenderAttr_1("src", project.data.previewImageUrl)}${ssrRenderAttr_1("alt", project.data.title)} class="w-full h-full object-cover"${_scopeId2}>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><h3 class="font-semibold text-lg" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextStyle))}"${_scopeId2}>${ssrInterpolate_1(project.data.title)}</h3>`);
                      if (project.data.time) {
                        _push3(`<p class="text-sm" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId2}>${ssrInterpolate_1(project.data.time)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (project.data.description) {
                        _push3(`<p class="text-sm" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId2}>${ssrInterpolate_1(project.data.description)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (vueExports.unref(visibleTags)(project.data.tags ?? []).length) {
                        _push3(`<div class="flex flex-wrap gap-1 mt-auto"${_scopeId2}><!--[-->`);
                        ssrRenderList_1(vueExports.unref(visibleTags)(project.data.tags ?? []), (tag) => {
                          _push3(`<span class="text-xs px-2 py-0.5 rounded-full" style="${ssrRenderStyle_1({
                            backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})`,
                            color: vueExports.unref(surfacePrimary)
                          })}"${_scopeId2}>${ssrInterpolate_1(tag)}</span>`);
                        });
                        _push3(`<!--]--></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        vueExports.createVNode("div", {
                          class: "h-32 rounded-lg overflow-hidden",
                          style: {
                            backgroundColor: i % 2 === 0 ? `color-mix(in srgb, ${vueExports.unref(bgSecondary)} 20%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})` : `color-mix(in srgb, ${vueExports.unref(bgPrimary)} 20%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})`
                          }
                        }, [
                          project.data.previewImageUrl ? (vueExports.openBlock(), vueExports.createBlock("img", {
                            key: 0,
                            src: project.data.previewImageUrl,
                            alt: project.data.title,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src", "alt"])) : vueExports.createCommentVNode("", true)
                        ], 4),
                        vueExports.createVNode("h3", {
                          class: "font-semibold text-lg",
                          style: vueExports.unref(surfaceTextStyle)
                        }, vueExports.toDisplayString(project.data.title), 5),
                        project.data.time ? (vueExports.openBlock(), vueExports.createBlock("p", {
                          key: 0,
                          class: "text-sm",
                          style: vueExports.unref(surfaceTextMutedStyle)
                        }, vueExports.toDisplayString(project.data.time), 5)) : vueExports.createCommentVNode("", true),
                        project.data.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                          key: 1,
                          class: "text-sm",
                          style: vueExports.unref(surfaceTextMutedStyle)
                        }, vueExports.toDisplayString(project.data.description), 5)) : vueExports.createCommentVNode("", true),
                        vueExports.unref(visibleTags)(project.data.tags ?? []).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 2,
                          class: "flex flex-wrap gap-1 mt-auto"
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(visibleTags)(project.data.tags ?? []), (tag) => {
                            return vueExports.openBlock(), vueExports.createBlock("span", {
                              key: tag,
                              class: "text-xs px-2 py-0.5 rounded-full",
                              style: {
                                backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})`,
                                color: vueExports.unref(surfacePrimary)
                              }
                            }, vueExports.toDisplayString(tag), 5);
                          }), 128))
                        ])) : vueExports.createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }), _parent2, _scopeId);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              return [
                vueExports.createVNode("div", {
                  class: ["mx-auto", [vueExports.unref(maxWidthClass)]]
                }, [
                  __props.showHeading ? (vueExports.openBlock(), vueExports.createBlock(_component_EditorInlineTextField, {
                    key: 0,
                    "field-key": "heading",
                    tag: "h2",
                    class: "text-3xl font-bold mb-8",
                    style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("h2", {
                        class: "text-3xl font-bold mb-8",
                        style: {
                          ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                          fontFamily: "var(--font-heading)"
                        }
                      }, vueExports.toDisplayString(__props.heading), 5)
                    ]),
                    _: 1
                  }, 8, ["style"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(projects), (project, i) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(isLinked) ? "a" : "div"), {
                        key: project.id,
                        class: ["rounded-xl p-6 flex flex-col gap-3 transition-opacity hover:opacity-80", { "cursor-pointer": vueExports.unref(isLinked) }],
                        href: vueExports.unref(isLinked) ? `/p/${vueExports.unref(slug)}/projects/${project.id}` : void 0,
                        style: vueExports.unref(surfaceStyle)
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode("div", {
                            class: "h-32 rounded-lg overflow-hidden",
                            style: {
                              backgroundColor: i % 2 === 0 ? `color-mix(in srgb, ${vueExports.unref(bgSecondary)} 20%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})` : `color-mix(in srgb, ${vueExports.unref(bgPrimary)} 20%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})`
                            }
                          }, [
                            project.data.previewImageUrl ? (vueExports.openBlock(), vueExports.createBlock("img", {
                              key: 0,
                              src: project.data.previewImageUrl,
                              alt: project.data.title,
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src", "alt"])) : vueExports.createCommentVNode("", true)
                          ], 4),
                          vueExports.createVNode("h3", {
                            class: "font-semibold text-lg",
                            style: vueExports.unref(surfaceTextStyle)
                          }, vueExports.toDisplayString(project.data.title), 5),
                          project.data.time ? (vueExports.openBlock(), vueExports.createBlock("p", {
                            key: 0,
                            class: "text-sm",
                            style: vueExports.unref(surfaceTextMutedStyle)
                          }, vueExports.toDisplayString(project.data.time), 5)) : vueExports.createCommentVNode("", true),
                          project.data.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                            key: 1,
                            class: "text-sm",
                            style: vueExports.unref(surfaceTextMutedStyle)
                          }, vueExports.toDisplayString(project.data.description), 5)) : vueExports.createCommentVNode("", true),
                          vueExports.unref(visibleTags)(project.data.tags ?? []).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 2,
                            class: "flex flex-wrap gap-1 mt-auto"
                          }, [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(visibleTags)(project.data.tags ?? []), (tag) => {
                              return vueExports.openBlock(), vueExports.createBlock("span", {
                                key: tag,
                                class: "text-xs px-2 py-0.5 rounded-full",
                                style: {
                                  backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})`,
                                  color: vueExports.unref(surfacePrimary)
                                }
                              }, vueExports.toDisplayString(tag), 5);
                            }), 128))
                          ])) : vueExports.createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["class", "href", "style"]);
                    }), 128))
                  ])
                ], 2)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Projects.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const BlocksProjects = Object.assign(_sfc_main$b, { __name: "BlocksProjects" });
const _sfc_main$a = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ProjectList",
  __ssrInlineRender: true,
  props: {
    background: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    surfaceColor: { default: null },
    heading: { default: "Projects" },
    showHeading: { type: Boolean, default: true },
    filterTag: { default: "" },
    linkToPage: { type: Boolean, default: true },
    collectionId: { default: "" }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const slug = vueExports.inject(portfolioSlugKey, "");
    const config = useRuntimeConfig();
    const baseURL = config.apiUrl;
    const { maxContentWidth } = useLayoutSettings();
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
    const { resolveColor, resolveTextColor, resolvePrimary } = useActivePalette();
    const autoTextColor = vueExports.computed(
      () => props.background ? resolveTextColor(props.background) : null
    );
    const textColorStyle = vueExports.computed(() => autoTextColor.value ? { color: autoTextColor.value } : {});
    const surfaceHex = vueExports.computed(() => props.surfaceColor ? resolveColor(props.surfaceColor) : null);
    const surfaceTextColor = vueExports.computed(
      () => props.surfaceColor ? resolveTextColor(props.surfaceColor) : null
    );
    const surfaceTextStyle = vueExports.computed(
      () => surfaceTextColor.value ? { color: surfaceTextColor.value } : { color: "var(--text-primary)" }
    );
    const surfaceTextMutedStyle = vueExports.computed(
      () => surfaceTextColor.value ? { color: surfaceTextColor.value, opacity: "0.6" } : { color: "var(--text-secondary)" }
    );
    const surfacePrimary = vueExports.computed(() => resolvePrimary(props.surfaceColor));
    const surfaceHexOrDefault = vueExports.computed(() => surfaceHex.value ?? "var(--bg-surface)");
    const borderStyle = vueExports.computed(() => ({
      borderTop: `1px solid ${autoTextColor.value ? `color-mix(in srgb, ${autoTextColor.value} 15%, transparent)` : "var(--border)"}`
    }));
    const { data } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      () => `portfolio-${slug}-projects-${props.collectionId || "default"}`,
      () => {
        const url = props.collectionId ? `/api/portfolios/${slug}/collections/by-id/${props.collectionId}` : `/api/portfolios/${slug}/collections/projects`;
        return $fetch(url, { baseURL });
      },
      "$BVEKjC_2BI"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const projects = vueExports.computed(() => {
      const all = data.value?.items ?? [];
      return props.filterTag ? all.filter((p) => p.data.tags?.includes(props.filterTag)) : all;
    });
    const hasDetailPage = !!getCollectionType("projects")?.pageTemplate;
    const isLinked = vueExports.computed(() => hasDetailPage && props.linkToPage);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksBlockWrapper = __nuxt_component_0;
      const _component_EditorInlineTextField = __nuxt_component_1;
      if (vueExports.unref(projects).length) {
        _push(ssrRenderComponent_1(_component_BlocksBlockWrapper, vueExports.mergeProps({ class: "px-8 py-16" }, {
          background: __props.background,
          backgroundImage: __props.backgroundImage,
          backgroundOpacity: __props.backgroundOpacity,
          backgroundFixed: __props.backgroundFixed,
          overlayEnabled: __props.overlayEnabled,
          overlayType: __props.overlayType,
          overlayColor: __props.overlayColor,
          overlayColor2: __props.overlayColor2,
          overlayDegree: __props.overlayDegree,
          overlayOpacity: __props.overlayOpacity
        }, _attrs), {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass_1([vueExports.unref(maxWidthClass), "mx-auto"])}"${_scopeId}>`);
              if (__props.showHeading) {
                _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                  "field-key": "heading",
                  tag: "h2",
                  class: "text-3xl font-bold mb-8",
                  style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<h2 class="text-3xl font-bold mb-8" style="${ssrRenderStyle_1({
                        ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                        fontFamily: "var(--font-heading)"
                      })}"${_scopeId2}>${ssrInterpolate_1(__props.heading)}</h2>`);
                    } else {
                      return [
                        vueExports.createVNode("h2", {
                          class: "text-3xl font-bold mb-8",
                          style: {
                            ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                            fontFamily: "var(--font-heading)"
                          }
                        }, vueExports.toDisplayString(__props.heading), 5)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex flex-col"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(projects), (project, i) => {
                ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref(isLinked) ? "a" : "div"), {
                  key: project.id,
                  class: ["flex gap-4 py-5 transition-opacity hover:opacity-80", { "cursor-pointer": vueExports.unref(isLinked) }],
                  style: i > 0 ? vueExports.unref(borderStyle) : {},
                  href: vueExports.unref(isLinked) ? `/p/${vueExports.unref(slug)}/projects/${project.id}` : void 0
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="w-24 h-20 shrink-0 rounded-lg overflow-hidden" style="${ssrRenderStyle_1({
                        backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`
                      })}"${_scopeId2}>`);
                      if (project.data.previewImageUrl) {
                        _push3(`<img${ssrRenderAttr_1("src", project.data.previewImageUrl)}${ssrRenderAttr_1("alt", project.data.title)} class="w-full h-full object-cover"${_scopeId2}>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="flex flex-col gap-1 min-w-0 flex-1 justify-center"${_scopeId2}><div class="flex items-start justify-between gap-2"${_scopeId2}><h3 class="font-semibold text-base leading-snug" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextStyle))}"${_scopeId2}>${ssrInterpolate_1(project.data.title)}</h3>`);
                      if (project.data.time) {
                        _push3(`<span class="text-xs shrink-0 pt-0.5" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId2}>${ssrInterpolate_1(project.data.time)}</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                      if (project.data.description) {
                        _push3(`<p class="text-sm line-clamp-2" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId2}>${ssrInterpolate_1(project.data.description)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (vueExports.unref(visibleTags)(project.data.tags ?? []).length) {
                        _push3(`<div class="flex flex-wrap gap-1 mt-1"${_scopeId2}><!--[-->`);
                        ssrRenderList_1(vueExports.unref(visibleTags)(project.data.tags ?? []), (tag) => {
                          _push3(`<span class="text-xs px-2 py-0.5 rounded-full" style="${ssrRenderStyle_1({
                            backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`,
                            color: vueExports.unref(surfacePrimary)
                          })}"${_scopeId2}>${ssrInterpolate_1(tag)}</span>`);
                        });
                        _push3(`<!--]--></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      return [
                        vueExports.createVNode("div", {
                          class: "w-24 h-20 shrink-0 rounded-lg overflow-hidden",
                          style: {
                            backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`
                          }
                        }, [
                          project.data.previewImageUrl ? (vueExports.openBlock(), vueExports.createBlock("img", {
                            key: 0,
                            src: project.data.previewImageUrl,
                            alt: project.data.title,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src", "alt"])) : vueExports.createCommentVNode("", true)
                        ], 4),
                        vueExports.createVNode("div", { class: "flex flex-col gap-1 min-w-0 flex-1 justify-center" }, [
                          vueExports.createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                            vueExports.createVNode("h3", {
                              class: "font-semibold text-base leading-snug",
                              style: vueExports.unref(surfaceTextStyle)
                            }, vueExports.toDisplayString(project.data.title), 5),
                            project.data.time ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 0,
                              class: "text-xs shrink-0 pt-0.5",
                              style: vueExports.unref(surfaceTextMutedStyle)
                            }, vueExports.toDisplayString(project.data.time), 5)) : vueExports.createCommentVNode("", true)
                          ]),
                          project.data.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                            key: 0,
                            class: "text-sm line-clamp-2",
                            style: vueExports.unref(surfaceTextMutedStyle)
                          }, vueExports.toDisplayString(project.data.description), 5)) : vueExports.createCommentVNode("", true),
                          vueExports.unref(visibleTags)(project.data.tags ?? []).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 1,
                            class: "flex flex-wrap gap-1 mt-1"
                          }, [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(visibleTags)(project.data.tags ?? []), (tag) => {
                              return vueExports.openBlock(), vueExports.createBlock("span", {
                                key: tag,
                                class: "text-xs px-2 py-0.5 rounded-full",
                                style: {
                                  backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`,
                                  color: vueExports.unref(surfacePrimary)
                                }
                              }, vueExports.toDisplayString(tag), 5);
                            }), 128))
                          ])) : vueExports.createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }), _parent2, _scopeId);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              return [
                vueExports.createVNode("div", {
                  class: ["mx-auto", vueExports.unref(maxWidthClass)]
                }, [
                  __props.showHeading ? (vueExports.openBlock(), vueExports.createBlock(_component_EditorInlineTextField, {
                    key: 0,
                    "field-key": "heading",
                    tag: "h2",
                    class: "text-3xl font-bold mb-8",
                    style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("h2", {
                        class: "text-3xl font-bold mb-8",
                        style: {
                          ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                          fontFamily: "var(--font-heading)"
                        }
                      }, vueExports.toDisplayString(__props.heading), 5)
                    ]),
                    _: 1
                  }, 8, ["style"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode("div", { class: "flex flex-col" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(projects), (project, i) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(isLinked) ? "a" : "div"), {
                        key: project.id,
                        class: ["flex gap-4 py-5 transition-opacity hover:opacity-80", { "cursor-pointer": vueExports.unref(isLinked) }],
                        style: i > 0 ? vueExports.unref(borderStyle) : {},
                        href: vueExports.unref(isLinked) ? `/p/${vueExports.unref(slug)}/projects/${project.id}` : void 0
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode("div", {
                            class: "w-24 h-20 shrink-0 rounded-lg overflow-hidden",
                            style: {
                              backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`
                            }
                          }, [
                            project.data.previewImageUrl ? (vueExports.openBlock(), vueExports.createBlock("img", {
                              key: 0,
                              src: project.data.previewImageUrl,
                              alt: project.data.title,
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src", "alt"])) : vueExports.createCommentVNode("", true)
                          ], 4),
                          vueExports.createVNode("div", { class: "flex flex-col gap-1 min-w-0 flex-1 justify-center" }, [
                            vueExports.createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                              vueExports.createVNode("h3", {
                                class: "font-semibold text-base leading-snug",
                                style: vueExports.unref(surfaceTextStyle)
                              }, vueExports.toDisplayString(project.data.title), 5),
                              project.data.time ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                key: 0,
                                class: "text-xs shrink-0 pt-0.5",
                                style: vueExports.unref(surfaceTextMutedStyle)
                              }, vueExports.toDisplayString(project.data.time), 5)) : vueExports.createCommentVNode("", true)
                            ]),
                            project.data.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                              key: 0,
                              class: "text-sm line-clamp-2",
                              style: vueExports.unref(surfaceTextMutedStyle)
                            }, vueExports.toDisplayString(project.data.description), 5)) : vueExports.createCommentVNode("", true),
                            vueExports.unref(visibleTags)(project.data.tags ?? []).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 1,
                              class: "flex flex-wrap gap-1 mt-1"
                            }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(visibleTags)(project.data.tags ?? []), (tag) => {
                                return vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: tag,
                                  class: "text-xs px-2 py-0.5 rounded-full",
                                  style: {
                                    backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`,
                                    color: vueExports.unref(surfacePrimary)
                                  }
                                }, vueExports.toDisplayString(tag), 5);
                              }), 128))
                            ])) : vueExports.createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["class", "style", "href"]);
                    }), 128))
                  ])
                ], 2)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/ProjectList.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const BlocksProjectList = Object.assign(_sfc_main$a, { __name: "BlocksProjectList" });
const sharedFields$1 = [
  { key: "heading", label: "Heading", type: "inline-text" },
  { key: "showHeading", label: "Show heading", type: "switch" },
  { key: "linkToPage", label: "Link to project page", type: "switch" },
  {
    key: "collectionId",
    label: "Collection",
    type: "collection-select",
    collectionType: "projects"
  },
  {
    key: "filterTag",
    label: "Filter by tag",
    type: "text",
    placeholder: "Leave empty to show all"
  }
];
const projectsDefinition = {
  type: "projects",
  label: "Project cards",
  icon: "i-lucide-layout-grid",
  component: BlocksProjects,
  allowedCollections: ["projects"],
  defaultContent: {
    heading: "Projects",
    showHeading: true,
    filterTag: "",
    linkToPage: true,
    ...styleDefaults
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [{ label: "Settings", fields: sharedFields$1 }]
    },
    styleTab
  ]
};
const projectListDefinition = {
  type: "project-list",
  label: "Project list",
  icon: "i-lucide-list",
  component: BlocksProjectList,
  allowedCollections: ["projects"],
  defaultContent: {
    heading: "Projects",
    showHeading: true,
    filterTag: "",
    linkToPage: true,
    ...styleDefaults
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [{ label: "Settings", fields: sharedFields$1 }]
    },
    styleTab
  ]
};
const _sfc_main$9 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Experiences",
  __ssrInlineRender: true,
  props: {
    background: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    surfaceColor: { default: null },
    heading: { default: "Experience" },
    showHeading: { type: Boolean, default: true },
    filterTag: { default: "" },
    collectionId: { default: "" }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const slug = vueExports.inject(portfolioSlugKey, "");
    const config = useRuntimeConfig();
    const baseURL = config.apiUrl;
    const { maxContentWidth } = useLayoutSettings();
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
    const { autoTextColor, textColorStyle } = useBlockBackground(() => props.background);
    const {
      surfaceHexOrDefault,
      surfaceStyle,
      surfaceTextStyle,
      surfaceTextMutedStyle,
      surfaceSecondary
    } = useBlockSurface(() => props.surfaceColor);
    const { data } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      () => `portfolio-${slug}-experiences-${props.collectionId || "default"}`,
      () => {
        const url = props.collectionId ? `/api/portfolios/${slug}/collections/by-id/${props.collectionId}` : `/api/portfolios/${slug}/collections/experiences`;
        return $fetch(url, { baseURL });
      },
      "$MnuZ8N0mw6"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const experiences = vueExports.computed(() => {
      const all = data.value?.items ?? [];
      return props.filterTag ? all.filter((e) => e.data.tags?.includes(props.filterTag)) : all;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksBlockWrapper = __nuxt_component_0;
      const _component_EditorInlineTextField = __nuxt_component_1;
      if (vueExports.unref(experiences).length) {
        _push(ssrRenderComponent_1(_component_BlocksBlockWrapper, vueExports.mergeProps({ class: "py-16" }, {
          background: __props.background,
          backgroundImage: __props.backgroundImage,
          backgroundOpacity: __props.backgroundOpacity,
          backgroundFixed: __props.backgroundFixed,
          overlayEnabled: __props.overlayEnabled,
          overlayType: __props.overlayType,
          overlayColor: __props.overlayColor,
          overlayColor2: __props.overlayColor2,
          overlayDegree: __props.overlayDegree,
          overlayOpacity: __props.overlayOpacity
        }, _attrs), {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass_1([[vueExports.unref(maxWidthClass)], "px-8 mx-auto"])}"${_scopeId}>`);
              if (__props.showHeading) {
                _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                  "field-key": "heading",
                  tag: "h2",
                  class: "text-3xl font-bold mb-8",
                  style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<h2 class="text-3xl font-bold mb-8" style="${ssrRenderStyle_1({
                        ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                        fontFamily: "var(--font-heading)"
                      })}"${_scopeId2}>${ssrInterpolate_1(__props.heading)}</h2>`);
                    } else {
                      return [
                        vueExports.createVNode("h2", {
                          class: "text-3xl font-bold mb-8",
                          style: {
                            ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                            fontFamily: "var(--font-heading)"
                          }
                        }, vueExports.toDisplayString(__props.heading), 5)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<ul class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(experiences), (experience) => {
                _push2(`<li class="rounded-xl p-6" style="${ssrRenderStyle_1(vueExports.unref(surfaceStyle))}"${_scopeId}><p class="font-semibold text-lg" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextStyle))}"${_scopeId}>${ssrInterpolate_1(experience.data.title)}</p>`);
                if (experience.data.place || experience.data.time) {
                  _push2(`<p class="text-sm mt-1" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId}>`);
                  if (experience.data.place) {
                    _push2(`<span${_scopeId}>${ssrInterpolate_1(experience.data.place)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (experience.data.place && experience.data.time) {
                    _push2(`<span${_scopeId}> · </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (experience.data.time) {
                    _push2(`<span${_scopeId}>${ssrInterpolate_1(experience.data.time)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (experience.data.location) {
                    _push2(`<span${_scopeId}> · ${ssrInterpolate_1(experience.data.location)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (experience.data.description) {
                  _push2(`<p class="text-sm mt-2" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId}>${ssrInterpolate_1(experience.data.description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (vueExports.unref(visibleTags)(experience.data.tags ?? []).length) {
                  _push2(`<div class="flex flex-wrap gap-1 mt-3"${_scopeId}><!--[-->`);
                  ssrRenderList_1(vueExports.unref(visibleTags)(experience.data.tags ?? []), (tag) => {
                    _push2(`<span class="text-xs px-2 py-0.5 rounded-full" style="${ssrRenderStyle_1({
                      backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfaceSecondary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`,
                      color: vueExports.unref(surfaceSecondary)
                    })}"${_scopeId}>${ssrInterpolate_1(tag)}</span>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              return [
                vueExports.createVNode("div", {
                  class: ["px-8 mx-auto", [vueExports.unref(maxWidthClass)]]
                }, [
                  __props.showHeading ? (vueExports.openBlock(), vueExports.createBlock(_component_EditorInlineTextField, {
                    key: 0,
                    "field-key": "heading",
                    tag: "h2",
                    class: "text-3xl font-bold mb-8",
                    style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("h2", {
                        class: "text-3xl font-bold mb-8",
                        style: {
                          ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                          fontFamily: "var(--font-heading)"
                        }
                      }, vueExports.toDisplayString(__props.heading), 5)
                    ]),
                    _: 1
                  }, 8, ["style"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode("ul", { class: "space-y-6" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(experiences), (experience) => {
                      return vueExports.openBlock(), vueExports.createBlock("li", {
                        key: experience.id,
                        class: "rounded-xl p-6",
                        style: vueExports.unref(surfaceStyle)
                      }, [
                        vueExports.createVNode("p", {
                          class: "font-semibold text-lg",
                          style: vueExports.unref(surfaceTextStyle)
                        }, vueExports.toDisplayString(experience.data.title), 5),
                        experience.data.place || experience.data.time ? (vueExports.openBlock(), vueExports.createBlock("p", {
                          key: 0,
                          class: "text-sm mt-1",
                          style: vueExports.unref(surfaceTextMutedStyle)
                        }, [
                          experience.data.place ? (vueExports.openBlock(), vueExports.createBlock("span", { key: 0 }, vueExports.toDisplayString(experience.data.place), 1)) : vueExports.createCommentVNode("", true),
                          experience.data.place && experience.data.time ? (vueExports.openBlock(), vueExports.createBlock("span", { key: 1 }, " · ")) : vueExports.createCommentVNode("", true),
                          experience.data.time ? (vueExports.openBlock(), vueExports.createBlock("span", { key: 2 }, vueExports.toDisplayString(experience.data.time), 1)) : vueExports.createCommentVNode("", true),
                          experience.data.location ? (vueExports.openBlock(), vueExports.createBlock("span", { key: 3 }, " · " + vueExports.toDisplayString(experience.data.location), 1)) : vueExports.createCommentVNode("", true)
                        ], 4)) : vueExports.createCommentVNode("", true),
                        experience.data.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                          key: 1,
                          class: "text-sm mt-2",
                          style: vueExports.unref(surfaceTextMutedStyle)
                        }, vueExports.toDisplayString(experience.data.description), 5)) : vueExports.createCommentVNode("", true),
                        vueExports.unref(visibleTags)(experience.data.tags ?? []).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 2,
                          class: "flex flex-wrap gap-1 mt-3"
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(visibleTags)(experience.data.tags ?? []), (tag) => {
                            return vueExports.openBlock(), vueExports.createBlock("span", {
                              key: tag,
                              class: "text-xs px-2 py-0.5 rounded-full",
                              style: {
                                backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfaceSecondary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`,
                                color: vueExports.unref(surfaceSecondary)
                              }
                            }, vueExports.toDisplayString(tag), 5);
                          }), 128))
                        ])) : vueExports.createCommentVNode("", true)
                      ], 4);
                    }), 128))
                  ])
                ], 2)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Experiences.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const BlocksExperiences = Object.assign(_sfc_main$9, { __name: "BlocksExperiences" });
const experiencesDefinition = {
  type: "experiences",
  label: "Experience",
  icon: "i-lucide-briefcase",
  component: BlocksExperiences,
  allowedCollections: ["experiences"],
  defaultContent: {
    heading: "Experience",
    showHeading: true,
    filterTag: "",
    ...styleDefaults
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [
        {
          label: "Settings",
          fields: [
            { key: "heading", label: "Heading", type: "text", placeholder: "Experience" },
            { key: "showHeading", label: "Show heading", type: "checkbox" },
            {
              key: "collectionId",
              label: "Collection",
              type: "collection-select",
              collectionType: "experiences"
            },
            {
              key: "filterTag",
              label: "Filter by tag",
              type: "text",
              placeholder: "Leave empty to show all"
            }
          ]
        }
      ]
    },
    styleTab
  ]
};
const _sfc_main$8 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "PostCards",
  __ssrInlineRender: true,
  props: {
    heading: { default: "Posts" },
    showHeading: { type: Boolean, default: true },
    collectionId: { default: "" },
    filterTag: { default: "" },
    pageSize: { default: 6 },
    background: { default: null },
    surfaceColor: { default: null },
    backgroundImage: { default: null },
    backgroundFixed: { type: Boolean, default: false }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const slug = vueExports.inject(portfolioSlugKey, "");
    const config = useRuntimeConfig();
    const baseURL = config.apiUrl;
    const { maxContentWidth } = useLayoutSettings();
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
    const { resolveColor, resolveTextColor, resolvePrimary } = useActivePalette();
    const bgHex = vueExports.computed(() => props.background ? resolveColor(props.background) : null);
    const surfaceHex = vueExports.computed(() => props.surfaceColor ? resolveColor(props.surfaceColor) : null);
    const sectionStyle = vueExports.computed(() => ({
      ...bgHex.value ? { backgroundColor: bgHex.value } : {},
      ...props.backgroundImage ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: props.backgroundFixed ? "fixed" : "scroll"
      } : {}
    }));
    const autoTextColor = vueExports.computed(
      () => props.background ? resolveTextColor(props.background) : null
    );
    const textColorStyle = vueExports.computed(() => autoTextColor.value ? { color: autoTextColor.value } : {});
    const surfaceStyle = vueExports.computed(
      () => surfaceHex.value ? { backgroundColor: surfaceHex.value } : { backgroundColor: "var(--bg-surface)" }
    );
    const surfaceTextColor = vueExports.computed(
      () => props.surfaceColor ? resolveTextColor(props.surfaceColor) : null
    );
    const surfaceTextStyle = vueExports.computed(
      () => surfaceTextColor.value ? { color: surfaceTextColor.value } : { color: "var(--text-primary)" }
    );
    const surfaceTextMutedStyle = vueExports.computed(
      () => surfaceTextColor.value ? { color: surfaceTextColor.value, opacity: "0.6" } : { color: "var(--text-secondary)" }
    );
    const surfacePrimary = vueExports.computed(() => resolvePrimary(props.surfaceColor));
    const bgPrimary = vueExports.computed(() => resolvePrimary(props.background));
    const surfaceHexOrDefault = vueExports.computed(() => surfaceHex.value ?? "var(--bg-surface)");
    const { data } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      () => `portfolio-${slug}-posts-${props.collectionId || "default"}`,
      () => {
        const url = props.collectionId ? `/api/portfolios/${slug}/collections/by-id/${props.collectionId}` : `/api/portfolios/${slug}/collections/posts`;
        return $fetch(url, { baseURL });
      },
      "$2z00L-kAGV"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const hasDetailPage = !!getCollectionType("posts")?.pageTemplate;
    const allPosts = vueExports.computed(() => {
      const all = data.value?.items ?? [];
      return props.filterTag ? all.filter((p) => p.data.tags?.includes(props.filterTag)) : all;
    });
    const page = vueExports.ref(1);
    const totalPages = vueExports.computed(() => Math.ceil(allPosts.value.length / props.pageSize));
    const posts = vueExports.computed(() => {
      const start = (page.value - 1) * props.pageSize;
      return allPosts.value.slice(start, start + props.pageSize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EditorInlineTextField = __nuxt_component_1;
      if (vueExports.unref(allPosts).length) {
        _push(`<section${ssrRenderAttrs_1(vueExports.mergeProps({
          class: "px-8 py-16",
          style: vueExports.unref(sectionStyle)
        }, _attrs))}><div class="${ssrRenderClass_1([[vueExports.unref(maxWidthClass)], "mx-auto"])}">`);
        if (__props.showHeading) {
          _push(ssrRenderComponent_1(_component_EditorInlineTextField, {
            "field-key": "heading",
            tag: "h2",
            class: "text-3xl font-bold mb-8",
            style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
          }, {
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h2 class="text-3xl font-bold mb-8" style="${ssrRenderStyle_1({
                  ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                  fontFamily: "var(--font-heading)"
                })}"${_scopeId}>${ssrInterpolate_1(__props.heading)}</h2>`);
              } else {
                return [
                  vueExports.createVNode("h2", {
                    class: "text-3xl font-bold mb-8",
                    style: {
                      ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                      fontFamily: "var(--font-heading)"
                    }
                  }, vueExports.toDisplayString(__props.heading), 5)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><!--[-->`);
        ssrRenderList_1(vueExports.unref(posts), (post) => {
          ssrRenderVNode(_push, vueExports.createVNode(vueExports.resolveDynamicComponent(hasDetailPage ? "a" : "div"), {
            key: post.id,
            class: ["rounded-xl overflow-hidden flex flex-col transition-opacity hover:opacity-80", { "cursor-pointer": hasDetailPage }],
            href: hasDetailPage ? `/p/${vueExports.unref(slug)}/posts/${post.id}` : void 0,
            style: vueExports.unref(surfaceStyle)
          }, {
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="h-44 w-full overflow-hidden shrink-0" style="${ssrRenderStyle_1({
                  backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`
                })}"${_scopeId}>`);
                if (post.data.coverImageUrl) {
                  _push2(`<img${ssrRenderAttr_1("src", post.data.coverImageUrl)}${ssrRenderAttr_1("alt", post.data.title)} class="w-full h-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="p-5 flex flex-col gap-2 flex-1"${_scopeId}><div class="flex items-start justify-between gap-2"${_scopeId}><h3 class="font-semibold text-base leading-snug" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextStyle))}"${_scopeId}>${ssrInterpolate_1(post.data.title)}</h3>`);
                if (post.data.date) {
                  _push2(`<span class="text-xs shrink-0 pt-0.5" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId}>${ssrInterpolate_1(post.data.date)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if (post.data.excerpt) {
                  _push2(`<p class="text-sm line-clamp-3" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId}>${ssrInterpolate_1(post.data.excerpt)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (vueExports.unref(visibleTags)(post.data.tags ?? []).length) {
                  _push2(`<div class="flex flex-wrap gap-1 mt-auto pt-2"${_scopeId}><!--[-->`);
                  ssrRenderList_1(vueExports.unref(visibleTags)(post.data.tags ?? []), (tag) => {
                    _push2(`<span class="text-xs px-2 py-0.5 rounded-full" style="${ssrRenderStyle_1({
                      backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`,
                      color: vueExports.unref(surfacePrimary)
                    })}"${_scopeId}>${ssrInterpolate_1(tag)}</span>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (hasDetailPage) {
                  _push2(`<span class="text-xs font-medium mt-auto pt-1" style="${ssrRenderStyle_1({ color: vueExports.unref(surfacePrimary) })}"${_scopeId}> Read more → </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  vueExports.createVNode("div", {
                    class: "h-44 w-full overflow-hidden shrink-0",
                    style: {
                      backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`
                    }
                  }, [
                    post.data.coverImageUrl ? (vueExports.openBlock(), vueExports.createBlock("img", {
                      key: 0,
                      src: post.data.coverImageUrl,
                      alt: post.data.title,
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src", "alt"])) : vueExports.createCommentVNode("", true)
                  ], 4),
                  vueExports.createVNode("div", { class: "p-5 flex flex-col gap-2 flex-1" }, [
                    vueExports.createVNode("div", { class: "flex items-start justify-between gap-2" }, [
                      vueExports.createVNode("h3", {
                        class: "font-semibold text-base leading-snug",
                        style: vueExports.unref(surfaceTextStyle)
                      }, vueExports.toDisplayString(post.data.title), 5),
                      post.data.date ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 0,
                        class: "text-xs shrink-0 pt-0.5",
                        style: vueExports.unref(surfaceTextMutedStyle)
                      }, vueExports.toDisplayString(post.data.date), 5)) : vueExports.createCommentVNode("", true)
                    ]),
                    post.data.excerpt ? (vueExports.openBlock(), vueExports.createBlock("p", {
                      key: 0,
                      class: "text-sm line-clamp-3",
                      style: vueExports.unref(surfaceTextMutedStyle)
                    }, vueExports.toDisplayString(post.data.excerpt), 5)) : vueExports.createCommentVNode("", true),
                    vueExports.unref(visibleTags)(post.data.tags ?? []).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 1,
                      class: "flex flex-wrap gap-1 mt-auto pt-2"
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(visibleTags)(post.data.tags ?? []), (tag) => {
                        return vueExports.openBlock(), vueExports.createBlock("span", {
                          key: tag,
                          class: "text-xs px-2 py-0.5 rounded-full",
                          style: {
                            backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`,
                            color: vueExports.unref(surfacePrimary)
                          }
                        }, vueExports.toDisplayString(tag), 5);
                      }), 128))
                    ])) : vueExports.createCommentVNode("", true),
                    hasDetailPage ? (vueExports.openBlock(), vueExports.createBlock("span", {
                      key: 2,
                      class: "text-xs font-medium mt-auto pt-1",
                      style: { color: vueExports.unref(surfacePrimary) }
                    }, " Read more → ", 4)) : vueExports.createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }), _parent);
        });
        _push(`<!--]--></div>`);
        if (vueExports.unref(totalPages) > 1) {
          _push(`<div class="flex justify-center gap-2 mt-10"><!--[-->`);
          ssrRenderList_1(vueExports.unref(totalPages), (p) => {
            _push(`<button class="w-8 h-8 rounded-full text-sm transition-colors" style="${ssrRenderStyle_1(
              p === vueExports.unref(page) ? { backgroundColor: vueExports.unref(bgPrimary), color: vueExports.unref(bgHex) ?? "var(--bg-page)" } : { ...vueExports.unref(surfaceStyle), ...vueExports.unref(surfaceTextMutedStyle) }
            )}">${ssrInterpolate_1(p)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/PostCards.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const BlocksPostCards = Object.assign(_sfc_main$8, { __name: "BlocksPostCards" });
const _sfc_main$7 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "PostFeed",
  __ssrInlineRender: true,
  props: {
    background: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    surfaceColor: { default: null },
    heading: { default: "Posts" },
    showHeading: { type: Boolean, default: true },
    collectionId: { default: "" },
    filterTag: { default: "" },
    pageSize: { default: 6 }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const slug = vueExports.inject(portfolioSlugKey, "");
    const config = useRuntimeConfig();
    const baseURL = config.apiUrl;
    const { maxContentWidth } = useLayoutSettings();
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
    const { resolveColor, resolvePrimary } = useActivePalette();
    const bgHex = vueExports.computed(() => props.background ? resolveColor(props.background) : null);
    const bgPrimary = vueExports.computed(() => resolvePrimary(props.background));
    const { autoTextColor, textColorStyle } = useBlockBackground(() => props.background);
    const {
      surfaceHexOrDefault,
      surfaceStyle,
      surfaceTextStyle,
      surfaceTextMutedStyle,
      surfacePrimary
    } = useBlockSurface(() => props.surfaceColor);
    const { data } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      () => `portfolio-${slug}-posts-${props.collectionId || "default"}`,
      () => {
        const url = props.collectionId ? `/api/portfolios/${slug}/collections/by-id/${props.collectionId}` : `/api/portfolios/${slug}/collections/posts`;
        return $fetch(url, { baseURL });
      },
      "$KJDonY9AQd"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const hasDetailPage = !!getCollectionType("posts")?.pageTemplate;
    const allPosts = vueExports.computed(() => {
      const all = data.value?.items ?? [];
      return props.filterTag ? all.filter((p) => p.data.tags?.includes(props.filterTag)) : all;
    });
    const page = vueExports.ref(1);
    const totalPages = vueExports.computed(() => Math.ceil(allPosts.value.length / props.pageSize));
    const posts = vueExports.computed(() => {
      const start = (page.value - 1) * props.pageSize;
      return allPosts.value.slice(start, start + props.pageSize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksBlockWrapper = __nuxt_component_0;
      const _component_EditorInlineTextField = __nuxt_component_1;
      if (vueExports.unref(allPosts).length) {
        _push(ssrRenderComponent_1(_component_BlocksBlockWrapper, vueExports.mergeProps({ class: "py-16" }, {
          background: __props.background,
          backgroundImage: __props.backgroundImage,
          backgroundOpacity: __props.backgroundOpacity,
          backgroundFixed: __props.backgroundFixed,
          overlayEnabled: __props.overlayEnabled,
          overlayType: __props.overlayType,
          overlayColor: __props.overlayColor,
          overlayColor2: __props.overlayColor2,
          overlayDegree: __props.overlayDegree,
          overlayOpacity: __props.overlayOpacity
        }, _attrs), {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass_1([[vueExports.unref(maxWidthClass)], "mx-auto"])}"${_scopeId}>`);
              if (__props.showHeading) {
                _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                  "field-key": "heading",
                  tag: "h2",
                  class: "text-3xl font-bold mb-8",
                  style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<h2 class="text-3xl font-bold mb-8" style="${ssrRenderStyle_1({
                        ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                        fontFamily: "var(--font-heading)"
                      })}"${_scopeId2}>${ssrInterpolate_1(__props.heading)}</h2>`);
                    } else {
                      return [
                        vueExports.createVNode("h2", {
                          class: "text-3xl font-bold mb-8",
                          style: {
                            ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                            fontFamily: "var(--font-heading)"
                          }
                        }, vueExports.toDisplayString(__props.heading), 5)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex flex-col gap-4"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(posts), (post) => {
                ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(hasDetailPage ? "a" : "div"), {
                  key: post.id,
                  class: ["rounded-xl overflow-hidden flex flex-row transition-opacity hover:opacity-80", { "cursor-pointer": hasDetailPage }],
                  href: hasDetailPage ? `/p/${vueExports.unref(slug)}/posts/${post.id}` : void 0,
                  style: vueExports.unref(surfaceStyle)
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="relative w-40 sm:w-52 shrink-0 overflow-hidden" style="${ssrRenderStyle_1({
                        backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`
                      })}"${_scopeId2}>`);
                      if (post.data.coverImageUrl) {
                        _push3(`<img${ssrRenderAttr_1("src", post.data.coverImageUrl)}${ssrRenderAttr_1("alt", post.data.title)} class="w-full h-full object-cover absolute inset-0"${_scopeId2}>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (vueExports.unref(visibleTags)(post.data.tags ?? []).length) {
                        _push3(`<span class="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-md font-medium" style="${ssrRenderStyle_1({
                          backgroundColor: vueExports.unref(surfacePrimary),
                          color: vueExports.unref(surfaceHexOrDefault)
                        })}"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(visibleTags)(post.data.tags ?? [])[0])}</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="p-5 flex flex-col gap-2 flex-1 min-w-0"${_scopeId2}><div class="flex justify-between items-center gap-3 text-xs" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId2}>`);
                      if (post.data.date) {
                        _push3(`<span${_scopeId2}>${ssrInterpolate_1(post.data.date)}</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><h3 class="font-bold text-base leading-snug" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextStyle))}"${_scopeId2}>${ssrInterpolate_1(post.data.title)}</h3>`);
                      if (post.data.excerpt) {
                        _push3(`<p class="text-sm line-clamp-2" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId2}>${ssrInterpolate_1(post.data.excerpt)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex items-center justify-between gap-2 mt-auto pt-2"${_scopeId2}>`);
                      if (vueExports.unref(visibleTags)(post.data.tags ?? []).length > 1) {
                        _push3(`<div class="flex flex-wrap gap-x-1.5 gap-y-1" style="${ssrRenderStyle_1({
                          color: vueExports.unref(surfacePrimary)
                        })}"${_scopeId2}><!--[-->`);
                        ssrRenderList_1(vueExports.unref(visibleTags)(post.data.tags ?? []).slice(1), (tag) => {
                          _push3(`<span class="text-xs px-2 py-0.5 rounded-full" style="${ssrRenderStyle_1({
                            backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`,
                            color: vueExports.unref(surfacePrimary)
                          })}"${_scopeId2}>${ssrInterpolate_1(tag)}</span>`);
                        });
                        _push3(`<!--]--></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (post.data.author) {
                        _push3(`<span class="text-xs shrink-0 flex items-center gap-1.5" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId2}><span class="w-1.5 h-1.5 rounded-full inline-block" style="${ssrRenderStyle_1({ backgroundColor: vueExports.unref(surfacePrimary) })}"${_scopeId2}></span> ${ssrInterpolate_1(post.data.author)}</span>`);
                      } else {
                        _push3(`<div class="flex-1"${_scopeId2}></div>`);
                      }
                      _push3(`</div></div>`);
                    } else {
                      return [
                        vueExports.createVNode("div", {
                          class: "relative w-40 sm:w-52 shrink-0 overflow-hidden",
                          style: {
                            backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`
                          }
                        }, [
                          post.data.coverImageUrl ? (vueExports.openBlock(), vueExports.createBlock("img", {
                            key: 0,
                            src: post.data.coverImageUrl,
                            alt: post.data.title,
                            class: "w-full h-full object-cover absolute inset-0"
                          }, null, 8, ["src", "alt"])) : vueExports.createCommentVNode("", true),
                          vueExports.unref(visibleTags)(post.data.tags ?? []).length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 1,
                            class: "absolute top-3 left-3 text-xs px-2.5 py-1 rounded-md font-medium",
                            style: {
                              backgroundColor: vueExports.unref(surfacePrimary),
                              color: vueExports.unref(surfaceHexOrDefault)
                            }
                          }, vueExports.toDisplayString(vueExports.unref(visibleTags)(post.data.tags ?? [])[0]), 5)) : vueExports.createCommentVNode("", true)
                        ], 4),
                        vueExports.createVNode("div", { class: "p-5 flex flex-col gap-2 flex-1 min-w-0" }, [
                          vueExports.createVNode("div", {
                            class: "flex justify-between items-center gap-3 text-xs",
                            style: vueExports.unref(surfaceTextMutedStyle)
                          }, [
                            post.data.date ? (vueExports.openBlock(), vueExports.createBlock("span", { key: 0 }, vueExports.toDisplayString(post.data.date), 1)) : vueExports.createCommentVNode("", true)
                          ], 4),
                          vueExports.createVNode("h3", {
                            class: "font-bold text-base leading-snug",
                            style: vueExports.unref(surfaceTextStyle)
                          }, vueExports.toDisplayString(post.data.title), 5),
                          post.data.excerpt ? (vueExports.openBlock(), vueExports.createBlock("p", {
                            key: 0,
                            class: "text-sm line-clamp-2",
                            style: vueExports.unref(surfaceTextMutedStyle)
                          }, vueExports.toDisplayString(post.data.excerpt), 5)) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode("div", { class: "flex items-center justify-between gap-2 mt-auto pt-2" }, [
                            vueExports.unref(visibleTags)(post.data.tags ?? []).length > 1 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 0,
                              class: "flex flex-wrap gap-x-1.5 gap-y-1",
                              style: {
                                color: vueExports.unref(surfacePrimary)
                              }
                            }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(visibleTags)(post.data.tags ?? []).slice(1), (tag) => {
                                return vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: tag,
                                  class: "text-xs px-2 py-0.5 rounded-full",
                                  style: {
                                    backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`,
                                    color: vueExports.unref(surfacePrimary)
                                  }
                                }, vueExports.toDisplayString(tag), 5);
                              }), 128))
                            ], 4)) : vueExports.createCommentVNode("", true),
                            post.data.author ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 1,
                              class: "text-xs shrink-0 flex items-center gap-1.5",
                              style: vueExports.unref(surfaceTextMutedStyle)
                            }, [
                              vueExports.createVNode("span", {
                                class: "w-1.5 h-1.5 rounded-full inline-block",
                                style: { backgroundColor: vueExports.unref(surfacePrimary) }
                              }, null, 4),
                              vueExports.createTextVNode(" " + vueExports.toDisplayString(post.data.author), 1)
                            ], 4)) : (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 2,
                              class: "flex-1"
                            }))
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }), _parent2, _scopeId);
              });
              _push2(`<!--]--></div>`);
              if (vueExports.unref(totalPages) > 1) {
                _push2(`<div class="flex justify-center gap-2 mt-10"${_scopeId}><!--[-->`);
                ssrRenderList_1(vueExports.unref(totalPages), (p) => {
                  _push2(`<button class="w-8 h-8 rounded-full text-sm transition-colors" style="${ssrRenderStyle_1(
                    p === vueExports.unref(page) ? { backgroundColor: vueExports.unref(bgPrimary), color: vueExports.unref(bgHex) ?? "var(--bg-page)" } : { ...vueExports.unref(surfaceStyle), ...vueExports.unref(surfaceTextMutedStyle) }
                  )}"${_scopeId}>${ssrInterpolate_1(p)}</button>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                vueExports.createVNode("div", {
                  class: ["mx-auto", [vueExports.unref(maxWidthClass)]]
                }, [
                  __props.showHeading ? (vueExports.openBlock(), vueExports.createBlock(_component_EditorInlineTextField, {
                    key: 0,
                    "field-key": "heading",
                    tag: "h2",
                    class: "text-3xl font-bold mb-8",
                    style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("h2", {
                        class: "text-3xl font-bold mb-8",
                        style: {
                          ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                          fontFamily: "var(--font-heading)"
                        }
                      }, vueExports.toDisplayString(__props.heading), 5)
                    ]),
                    _: 1
                  }, 8, ["style"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode("div", { class: "flex flex-col gap-4" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(posts), (post) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(hasDetailPage ? "a" : "div"), {
                        key: post.id,
                        class: ["rounded-xl overflow-hidden flex flex-row transition-opacity hover:opacity-80", { "cursor-pointer": hasDetailPage }],
                        href: hasDetailPage ? `/p/${vueExports.unref(slug)}/posts/${post.id}` : void 0,
                        style: vueExports.unref(surfaceStyle)
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode("div", {
                            class: "relative w-40 sm:w-52 shrink-0 overflow-hidden",
                            style: {
                              backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`
                            }
                          }, [
                            post.data.coverImageUrl ? (vueExports.openBlock(), vueExports.createBlock("img", {
                              key: 0,
                              src: post.data.coverImageUrl,
                              alt: post.data.title,
                              class: "w-full h-full object-cover absolute inset-0"
                            }, null, 8, ["src", "alt"])) : vueExports.createCommentVNode("", true),
                            vueExports.unref(visibleTags)(post.data.tags ?? []).length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 1,
                              class: "absolute top-3 left-3 text-xs px-2.5 py-1 rounded-md font-medium",
                              style: {
                                backgroundColor: vueExports.unref(surfacePrimary),
                                color: vueExports.unref(surfaceHexOrDefault)
                              }
                            }, vueExports.toDisplayString(vueExports.unref(visibleTags)(post.data.tags ?? [])[0]), 5)) : vueExports.createCommentVNode("", true)
                          ], 4),
                          vueExports.createVNode("div", { class: "p-5 flex flex-col gap-2 flex-1 min-w-0" }, [
                            vueExports.createVNode("div", {
                              class: "flex justify-between items-center gap-3 text-xs",
                              style: vueExports.unref(surfaceTextMutedStyle)
                            }, [
                              post.data.date ? (vueExports.openBlock(), vueExports.createBlock("span", { key: 0 }, vueExports.toDisplayString(post.data.date), 1)) : vueExports.createCommentVNode("", true)
                            ], 4),
                            vueExports.createVNode("h3", {
                              class: "font-bold text-base leading-snug",
                              style: vueExports.unref(surfaceTextStyle)
                            }, vueExports.toDisplayString(post.data.title), 5),
                            post.data.excerpt ? (vueExports.openBlock(), vueExports.createBlock("p", {
                              key: 0,
                              class: "text-sm line-clamp-2",
                              style: vueExports.unref(surfaceTextMutedStyle)
                            }, vueExports.toDisplayString(post.data.excerpt), 5)) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode("div", { class: "flex items-center justify-between gap-2 mt-auto pt-2" }, [
                              vueExports.unref(visibleTags)(post.data.tags ?? []).length > 1 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 0,
                                class: "flex flex-wrap gap-x-1.5 gap-y-1",
                                style: {
                                  color: vueExports.unref(surfacePrimary)
                                }
                              }, [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(visibleTags)(post.data.tags ?? []).slice(1), (tag) => {
                                  return vueExports.openBlock(), vueExports.createBlock("span", {
                                    key: tag,
                                    class: "text-xs px-2 py-0.5 rounded-full",
                                    style: {
                                      backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHexOrDefault)})`,
                                      color: vueExports.unref(surfacePrimary)
                                    }
                                  }, vueExports.toDisplayString(tag), 5);
                                }), 128))
                              ], 4)) : vueExports.createCommentVNode("", true),
                              post.data.author ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                key: 1,
                                class: "text-xs shrink-0 flex items-center gap-1.5",
                                style: vueExports.unref(surfaceTextMutedStyle)
                              }, [
                                vueExports.createVNode("span", {
                                  class: "w-1.5 h-1.5 rounded-full inline-block",
                                  style: { backgroundColor: vueExports.unref(surfacePrimary) }
                                }, null, 4),
                                vueExports.createTextVNode(" " + vueExports.toDisplayString(post.data.author), 1)
                              ], 4)) : (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 2,
                                class: "flex-1"
                              }))
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["class", "href", "style"]);
                    }), 128))
                  ]),
                  vueExports.unref(totalPages) > 1 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 1,
                    class: "flex justify-center gap-2 mt-10"
                  }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(totalPages), (p) => {
                      return vueExports.openBlock(), vueExports.createBlock("button", {
                        key: p,
                        class: "w-8 h-8 rounded-full text-sm transition-colors",
                        style: p === vueExports.unref(page) ? { backgroundColor: vueExports.unref(bgPrimary), color: vueExports.unref(bgHex) ?? "var(--bg-page)" } : { ...vueExports.unref(surfaceStyle), ...vueExports.unref(surfaceTextMutedStyle) },
                        onClick: ($event) => page.value = p
                      }, vueExports.toDisplayString(p), 13, ["onClick"]);
                    }), 128))
                  ])) : vueExports.createCommentVNode("", true)
                ], 2)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/PostFeed.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const BlocksPostFeed = Object.assign(_sfc_main$7, { __name: "BlocksPostFeed" });
const _sfc_main$6 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "PostList",
  __ssrInlineRender: true,
  props: {
    background: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    surfaceColor: { default: null },
    heading: { default: "Posts" },
    showHeading: { type: Boolean, default: true },
    collectionId: { default: "" },
    filterTag: { default: "" },
    maxItems: { default: 5 }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const slug = vueExports.inject(portfolioSlugKey, "");
    const config = useRuntimeConfig();
    const baseURL = config.apiUrl;
    const { maxContentWidth } = useLayoutSettings();
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
    const { resolveTextColor } = useActivePalette();
    const autoTextColor = vueExports.computed(
      () => props.background ? resolveTextColor(props.background) : null
    );
    const textColorStyle = vueExports.computed(() => autoTextColor.value ? { color: autoTextColor.value } : {});
    const textMutedStyle = vueExports.computed(
      () => autoTextColor.value ? { color: autoTextColor.value, opacity: "0.6" } : { color: "var(--text-secondary)" }
    );
    const borderStyle = vueExports.computed(() => ({
      borderTop: `1px solid ${autoTextColor.value ? `color-mix(in srgb, ${autoTextColor.value} 15%, transparent)` : "var(--border)"}`
    }));
    const { data } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(
      () => `portfolio-${slug}-posts-${props.collectionId || "default"}`,
      () => {
        const url = props.collectionId ? `/api/portfolios/${slug}/collections/by-id/${props.collectionId}` : `/api/portfolios/${slug}/collections/posts`;
        return $fetch(url, { baseURL });
      },
      "$GdQ8SztNfm"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const hasDetailPage = !!getCollectionType("posts")?.pageTemplate;
    const posts = vueExports.computed(() => {
      const all = data.value?.items ?? [];
      const filtered = props.filterTag ? all.filter((p) => p.data.tags?.includes(props.filterTag)) : all;
      return props.maxItems ? filtered.slice(0, props.maxItems) : filtered;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksBlockWrapper = __nuxt_component_0;
      const _component_EditorInlineTextField = __nuxt_component_1;
      if (vueExports.unref(posts).length) {
        _push(ssrRenderComponent_1(_component_BlocksBlockWrapper, vueExports.mergeProps({ class: "px-8 py-16" }, {
          background: __props.background,
          backgroundImage: __props.backgroundImage,
          backgroundOpacity: __props.backgroundOpacity,
          backgroundFixed: __props.backgroundFixed,
          overlayEnabled: __props.overlayEnabled,
          overlayType: __props.overlayType,
          overlayColor: __props.overlayColor,
          overlayColor2: __props.overlayColor2,
          overlayDegree: __props.overlayDegree,
          overlayOpacity: __props.overlayOpacity
        }, _attrs), {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass_1([vueExports.unref(maxWidthClass), "mx-auto"])}"${_scopeId}>`);
              if (__props.showHeading) {
                _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                  "field-key": "heading",
                  tag: "h2",
                  class: "text-3xl font-bold mb-8",
                  style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<h2 class="text-3xl font-bold mb-8" style="${ssrRenderStyle_1({
                        ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                        fontFamily: "var(--font-heading)"
                      })}"${_scopeId2}>${ssrInterpolate_1(__props.heading)}</h2>`);
                    } else {
                      return [
                        vueExports.createVNode("h2", {
                          class: "text-3xl font-bold mb-8",
                          style: {
                            ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                            fontFamily: "var(--font-heading)"
                          }
                        }, vueExports.toDisplayString(__props.heading), 5)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex flex-col"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(posts), (post, i) => {
                ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(hasDetailPage ? "a" : "div"), {
                  key: post.id,
                  class: ["flex items-baseline justify-between gap-4 py-3 transition-opacity hover:opacity-80", { "cursor-pointer": hasDetailPage }],
                  style: i > 0 ? vueExports.unref(borderStyle) : {},
                  href: hasDetailPage ? `/p/${vueExports.unref(slug)}/posts/${post.id}` : void 0
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="font-medium text-sm leading-snug" style="${ssrRenderStyle_1(vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" })}"${_scopeId2}>${ssrInterpolate_1(post.data.title)}</span>`);
                      if (post.data.date) {
                        _push3(`<span class="text-xs shrink-0 tabular-nums" style="${ssrRenderStyle_1(vueExports.unref(textMutedStyle))}"${_scopeId2}>${ssrInterpolate_1(post.data.date)}</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        vueExports.createVNode("span", {
                          class: "font-medium text-sm leading-snug",
                          style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                        }, vueExports.toDisplayString(post.data.title), 5),
                        post.data.date ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 0,
                          class: "text-xs shrink-0 tabular-nums",
                          style: vueExports.unref(textMutedStyle)
                        }, vueExports.toDisplayString(post.data.date), 5)) : vueExports.createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }), _parent2, _scopeId);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              return [
                vueExports.createVNode("div", {
                  class: ["mx-auto", vueExports.unref(maxWidthClass)]
                }, [
                  __props.showHeading ? (vueExports.openBlock(), vueExports.createBlock(_component_EditorInlineTextField, {
                    key: 0,
                    "field-key": "heading",
                    tag: "h2",
                    class: "text-3xl font-bold mb-8",
                    style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("h2", {
                        class: "text-3xl font-bold mb-8",
                        style: {
                          ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                          fontFamily: "var(--font-heading)"
                        }
                      }, vueExports.toDisplayString(__props.heading), 5)
                    ]),
                    _: 1
                  }, 8, ["style"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode("div", { class: "flex flex-col" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(posts), (post, i) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(hasDetailPage ? "a" : "div"), {
                        key: post.id,
                        class: ["flex items-baseline justify-between gap-4 py-3 transition-opacity hover:opacity-80", { "cursor-pointer": hasDetailPage }],
                        style: i > 0 ? vueExports.unref(borderStyle) : {},
                        href: hasDetailPage ? `/p/${vueExports.unref(slug)}/posts/${post.id}` : void 0
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode("span", {
                            class: "font-medium text-sm leading-snug",
                            style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                          }, vueExports.toDisplayString(post.data.title), 5),
                          post.data.date ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 0,
                            class: "text-xs shrink-0 tabular-nums",
                            style: vueExports.unref(textMutedStyle)
                          }, vueExports.toDisplayString(post.data.date), 5)) : vueExports.createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["class", "style", "href"]);
                    }), 128))
                  ])
                ], 2)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/PostList.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const BlocksPostList = Object.assign(_sfc_main$6, { __name: "BlocksPostList" });
const sharedFields = [
  { key: "heading", label: "Heading", type: "inline-text" },
  { key: "showHeading", label: "Show heading", type: "switch" },
  {
    key: "collectionId",
    label: "Collection",
    type: "collection-select",
    collectionType: "posts"
  },
  {
    key: "filterTag",
    label: "Filter by tag",
    type: "text",
    placeholder: "Leave empty to show all"
  }
];
const postCardsDefinition = {
  type: "post-cards",
  label: "Post cards",
  icon: "i-lucide-layout-grid",
  component: BlocksPostCards,
  allowedCollections: ["posts"],
  defaultContent: {
    heading: "Posts",
    showHeading: true,
    collectionId: "",
    filterTag: "",
    pageSize: 6,
    ...styleDefaults
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [
        {
          label: "Settings",
          fields: [
            ...sharedFields,
            {
              key: "pageSize",
              label: "Posts per page",
              type: "slider",
              min: 2,
              max: 12,
              step: 2,
              unit: ""
            }
          ]
        }
      ]
    },
    styleTab
  ]
};
const postFeedDefinition = {
  type: "post-feed",
  label: "Post feed",
  icon: "i-lucide-stretch-horizontal",
  component: BlocksPostFeed,
  allowedCollections: ["posts"],
  defaultContent: {
    heading: "Posts",
    showHeading: true,
    collectionId: "",
    filterTag: "",
    pageSize: 6,
    ...styleDefaults
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [
        {
          label: "Settings",
          fields: [
            ...sharedFields,
            {
              key: "pageSize",
              label: "Posts per page",
              type: "slider",
              min: 2,
              max: 12,
              step: 2,
              unit: ""
            }
          ]
        }
      ]
    },
    styleTab
  ]
};
const postListDefinition = {
  type: "post-list",
  label: "Post list",
  icon: "i-lucide-list",
  component: BlocksPostList,
  allowedCollections: ["posts"],
  defaultContent: {
    heading: "Posts",
    showHeading: true,
    collectionId: "",
    filterTag: "",
    maxItems: 5,
    ...styleDefaults
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [
        {
          label: "Settings",
          fields: [
            ...sharedFields,
            {
              key: "maxItems",
              label: "Max items",
              type: "slider",
              min: 1,
              max: 20,
              step: 1,
              unit: ""
            }
          ]
        }
      ]
    },
    styleTab
  ]
};
const _sfc_main$5 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Demo",
  __ssrInlineRender: true,
  props: {
    textField: { default: "" },
    textareaField: { default: "" },
    urlField: { default: "" },
    inlineTextField: { default: "Inline text (click to edit)" },
    inlineRichField: { default: "" },
    selectField: { default: "option-a" },
    checkboxField: { type: Boolean, default: false },
    fontField: { default: "" },
    colorField: { default: "#6c8fff" },
    themeColorField: { default: null },
    imageField: { default: null },
    fileField: { default: null },
    listField: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EditorInlineTextField = __nuxt_component_1;
      const _component_EditorInlineRichField = __nuxt_component_3$1;
      _push(`<section${ssrRenderAttrs_1(vueExports.mergeProps({
        class: "px-8 py-12 flex flex-col gap-6",
        style: __props.themeColorField ? { backgroundColor: `var(--palette-${__props.themeColorField})` } : {}
      }, _attrs))}><p class="text-xs uppercase tracking-widest font-semibold opacity-40">Demo Block</p><div>`);
      _push(ssrRenderComponent_1(_component_EditorInlineTextField, {
        "field-key": "inlineTextField",
        tag: "h2",
        class: "text-3xl font-bold"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate_1(__props.inlineTextField)}`);
          } else {
            return [
              vueExports.createTextVNode(vueExports.toDisplayString(__props.inlineTextField), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="rich-text">`);
      _push(ssrRenderComponent_1(_component_EditorInlineRichField, {
        "field-key": "inlineRichField",
        placeholder: "Rich text field (click to edit)",
        html: "",
        class: "w-full"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.inlineRichField) {
              _push2(`<div${_scopeId}>${vueExports.unref(sanitizeHtml)(__props.inlineRichField) ?? ""}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.inlineRichField ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                innerHTML: vueExports.unref(sanitizeHtml)(__props.inlineRichField)
              }, null, 8, ["innerHTML"])) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 gap-4 text-sm">`);
      if (__props.textField) {
        _push(`<div class="flex flex-col gap-1"><span class="text-xs opacity-50">text</span><span>${ssrInterpolate_1(__props.textField)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.textareaField) {
        _push(`<div class="flex flex-col gap-1"><span class="text-xs opacity-50">textarea</span><span class="whitespace-pre-wrap">${ssrInterpolate_1(__props.textareaField)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.urlField) {
        _push(`<div class="flex flex-col gap-1"><span class="text-xs opacity-50">url</span><a${ssrRenderAttr_1("href", __props.urlField)} class="underline break-all">${ssrInterpolate_1(__props.urlField)}</a></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.selectField) {
        _push(`<div class="flex flex-col gap-1"><span class="text-xs opacity-50">select</span><span>${ssrInterpolate_1(__props.selectField)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col gap-1"><span class="text-xs opacity-50">checkbox</span><span>${ssrInterpolate_1(__props.checkboxField ? "true" : "false")}</span></div>`);
      if (__props.fontField) {
        _push(`<div class="flex flex-col gap-1"><span class="text-xs opacity-50">font</span><span style="${ssrRenderStyle_1({ fontFamily: __props.fontField })}">${ssrInterpolate_1(__props.fontField)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.colorField) {
        _push(`<div class="flex items-center gap-2"><span class="text-xs opacity-50">color</span><span class="size-5 rounded border border-default inline-block" style="${ssrRenderStyle_1({ backgroundColor: __props.colorField })}"></span><span>${ssrInterpolate_1(__props.colorField)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.themeColorField) {
        _push(`<div class="flex items-center gap-2"><span class="text-xs opacity-50">theme-color</span><span class="size-5 rounded border border-default inline-block" style="${ssrRenderStyle_1({ backgroundColor: `var(--palette-${__props.themeColorField})` })}"></span><span>${ssrInterpolate_1(__props.themeColorField)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.imageField) {
        _push(`<div class="flex flex-col gap-1"><span class="text-xs opacity-50">image</span><img${ssrRenderAttr_1("src", __props.imageField)} alt="" class="max-h-48 rounded object-cover"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.fileField) {
        _push(`<div class="flex flex-col gap-1"><span class="text-xs opacity-50">file</span><a${ssrRenderAttr_1("href", __props.fileField)} class="underline text-sm break-all">${ssrInterpolate_1(__props.fileField.split("/").at(-1))}</a></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.listField?.length) {
        _push(`<div class="flex flex-col gap-2"><span class="text-xs opacity-50">list</span><!--[-->`);
        ssrRenderList_1(__props.listField, (item, i) => {
          _push(`<div class="flex gap-3 text-sm"><span class="opacity-50">${ssrInterpolate_1(i + 1)}.</span><span>${ssrInterpolate_1(item.label)}</span>`);
          if (item.url) {
            _push(`<a${ssrRenderAttr_1("href", item.url)} class="underline opacity-60">${ssrInterpolate_1(item.url)}</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Demo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const BlocksDemo = Object.assign(_sfc_main$5, { __name: "BlocksDemo" });
const demoDefinition = {
  type: "demo",
  label: "Demo",
  icon: "i-lucide-blocks",
  component: BlocksDemo,
  defaultContent: {
    textField: "Hello world",
    textareaField: "Line one\nLine two",
    urlField: "https://example.com",
    inlineTextField: "Inline text (click to edit)",
    inlineRichField: '<p>Rich text — <strong>bold</strong>, <em>italic</em>, <a href="#">link</a></p>',
    selectField: "option-a",
    checkboxField: false,
    fontField: "Inter",
    colorField: "#6c8fff",
    themeColorField: null,
    imageField: null,
    fileField: null,
    listField: [
      { id: crypto.randomUUID(), label: "First item", url: "https://example.com" },
      { id: crypto.randomUUID(), label: "Second item", url: "" }
    ]
  },
  tabs: [
    {
      label: "Text",
      icon: "i-lucide-type",
      sections: [
        {
          label: "Sidebar fields",
          fields: [
            { key: "textField", label: "Text", type: "text", placeholder: "Single-line text" },
            {
              key: "textareaField",
              label: "Textarea",
              type: "textarea",
              placeholder: "Multi-line text"
            },
            { key: "urlField", label: "URL", type: "url", placeholder: "https://" }
          ]
        },
        {
          label: "Inline fields (edit in preview)",
          fields: [
            { key: "inlineTextField", label: "Inline text", type: "inline-text" },
            { key: "inlineRichField", label: "Inline rich", type: "inline-rich" }
          ]
        }
      ]
    },
    {
      label: "Choices",
      icon: "i-lucide-sliders-horizontal",
      sections: [
        {
          fields: [
            {
              key: "selectField",
              label: "Select",
              type: "select",
              options: [
                { label: "Option A", value: "option-a" },
                { label: "Option B", value: "option-b" },
                { label: "Option C", value: "option-c" }
              ]
            },
            { key: "checkboxField", label: "Checkbox", type: "checkbox" },
            { key: "fontField", label: "Font", type: "font" },
            { key: "colorField", label: "Color", type: "color" },
            { key: "themeColorField", label: "Theme color", type: "theme-color" }
          ]
        }
      ]
    },
    {
      label: "Media",
      icon: "i-lucide-image",
      sections: [
        {
          fields: [
            { key: "imageField", label: "Image", type: "image" },
            { key: "fileField", label: "File", type: "file" }
          ]
        }
      ]
    },
    {
      label: "List",
      icon: "i-lucide-list",
      sections: [
        {
          fields: [
            {
              key: "listField",
              label: "Items",
              type: "list",
              itemLabel: "Item",
              defaultItem: () => ({ id: crypto.randomUUID(), label: "New item", url: "" }),
              itemFields: [
                { key: "label", label: "Label", placeholder: "Item label", inline: true },
                { key: "url", label: "URL", placeholder: "https://", type: "url" }
              ]
            }
          ]
        }
      ]
    }
  ]
};
const _sfc_main$4 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Accordion",
  __ssrInlineRender: true,
  props: {
    background: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    surfaceColor: { default: null },
    heading: { default: "FAQ" },
    showHeading: { type: Boolean, default: true },
    items: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const { maxContentWidth } = useLayoutSettings();
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
    const { autoTextColor, textPrimaryStyle, textMutedStyle } = useBlockBackground(
      () => props.background
    );
    const borderColorStyle = vueExports.computed(() => ({
      borderColor: autoTextColor.value ? `color-mix(in srgb, ${autoTextColor.value} 15%, transparent)` : "color-mix(in srgb, var(--text-primary) 12%, transparent)"
    }));
    const inEditor = Boolean(vueExports.inject(inlineEditorKey, null));
    const openSet = vueExports.ref(/* @__PURE__ */ new Set([0]));
    function toggle(index) {
      if (inEditor) return;
      if (openSet.value.has(index)) {
        openSet.value.delete(index);
      } else {
        openSet.value.add(index);
      }
    }
    function isOpen(index) {
      return inEditor || openSet.value.has(index);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksBlockWrapper = __nuxt_component_0;
      const _component_EditorInlineTextField = __nuxt_component_1;
      const _component_UIcon = _sfc_main$d$1;
      const _component_EditorInlineRichField = __nuxt_component_3$1;
      _push(ssrRenderComponent_1(_component_BlocksBlockWrapper, vueExports.mergeProps({ class: "px-8 py-12" }, {
        background: __props.background,
        backgroundImage: __props.backgroundImage,
        backgroundOpacity: __props.backgroundOpacity,
        backgroundFixed: __props.backgroundFixed,
        overlayEnabled: __props.overlayEnabled,
        overlayType: __props.overlayType,
        overlayColor: __props.overlayColor,
        overlayColor2: __props.overlayColor2,
        overlayDegree: __props.overlayDegree,
        overlayOpacity: __props.overlayOpacity
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass_1([[vueExports.unref(maxWidthClass)], "mx-auto"])}"${_scopeId}>`);
            if (__props.showHeading) {
              _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                "field-key": "heading",
                tag: "h2",
                class: "text-3xl font-bold mb-8",
                style: vueExports.unref(textPrimaryStyle)
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h2 class="text-3xl font-bold mb-8" style="${ssrRenderStyle_1({ ...vueExports.unref(textPrimaryStyle), fontFamily: "var(--font-heading)" })}"${_scopeId2}>${ssrInterpolate_1(__props.heading)}</h2>`);
                  } else {
                    return [
                      vueExports.createVNode("h2", {
                        class: "text-3xl font-bold mb-8",
                        style: { ...vueExports.unref(textPrimaryStyle), fontFamily: "var(--font-heading)" }
                      }, vueExports.toDisplayString(__props.heading), 5)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="divide-y" style="${ssrRenderStyle_1(vueExports.unref(borderColorStyle))}"${_scopeId}><!--[-->`);
            ssrRenderList_1(__props.items, (item, index) => {
              _push2(`<div style="${ssrRenderStyle_1(vueExports.unref(borderColorStyle))}"${_scopeId}>`);
              ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref(inEditor) ? "div" : "button"), {
                class: ["w-full flex items-center justify-between py-4 text-left gap-4", vueExports.unref(inEditor) ? "cursor-default" : "cursor-pointer"],
                onClick: ($event) => toggle(index)
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent_1(_component_EditorInlineTextField, {
                      "field-key": `items.${index}.question`,
                      tag: "span",
                      class: "font-semibold flex-1 text-base",
                      style: vueExports.unref(textPrimaryStyle)
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate_1(item.question)}`);
                        } else {
                          return [
                            vueExports.createTextVNode(vueExports.toDisplayString(item.question), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent_1(_component_UIcon, {
                      name: "i-lucide-chevron-down",
                      class: ["w-5 h-5 shrink-0 transition-transform duration-200", { "rotate-180": isOpen(index) }],
                      style: vueExports.unref(textMutedStyle)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      vueExports.createVNode(_component_EditorInlineTextField, {
                        "field-key": `items.${index}.question`,
                        tag: "span",
                        class: "font-semibold flex-1 text-base",
                        style: vueExports.unref(textPrimaryStyle)
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(vueExports.toDisplayString(item.question), 1)
                        ]),
                        _: 2
                      }, 1032, ["field-key", "style"]),
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-lucide-chevron-down",
                        class: ["w-5 h-5 shrink-0 transition-transform duration-200", { "rotate-180": isOpen(index) }],
                        style: vueExports.unref(textMutedStyle)
                      }, null, 8, ["class", "style"])
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
              if (isOpen(index)) {
                _push2(`<div class="pb-5"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_EditorInlineRichField, {
                  "field-key": `items.${index}.answer`,
                  placeholder: "Write your answer...",
                  class: "rich-text",
                  style: vueExports.unref(textMutedStyle),
                  html: ""
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (item.answer) {
                        _push3(`<div${_scopeId2}>${vueExports.unref(sanitizeHtml)(item.answer) ?? ""}</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        item.answer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          innerHTML: vueExports.unref(sanitizeHtml)(item.answer)
                        }, null, 8, ["innerHTML"])) : vueExports.createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                class: ["mx-auto", [vueExports.unref(maxWidthClass)]]
              }, [
                __props.showHeading ? (vueExports.openBlock(), vueExports.createBlock(_component_EditorInlineTextField, {
                  key: 0,
                  "field-key": "heading",
                  tag: "h2",
                  class: "text-3xl font-bold mb-8",
                  style: vueExports.unref(textPrimaryStyle)
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode("h2", {
                      class: "text-3xl font-bold mb-8",
                      style: { ...vueExports.unref(textPrimaryStyle), fontFamily: "var(--font-heading)" }
                    }, vueExports.toDisplayString(__props.heading), 5)
                  ]),
                  _: 1
                }, 8, ["style"])) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("div", {
                  class: "divide-y",
                  style: vueExports.unref(borderColorStyle)
                }, [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.items, (item, index) => {
                    return vueExports.openBlock(), vueExports.createBlock("div", {
                      key: item.id ?? index,
                      style: vueExports.unref(borderColorStyle)
                    }, [
                      (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(inEditor) ? "div" : "button"), {
                        class: ["w-full flex items-center justify-between py-4 text-left gap-4", vueExports.unref(inEditor) ? "cursor-default" : "cursor-pointer"],
                        onClick: ($event) => toggle(index)
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_EditorInlineTextField, {
                            "field-key": `items.${index}.question`,
                            tag: "span",
                            class: "font-semibold flex-1 text-base",
                            style: vueExports.unref(textPrimaryStyle)
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(vueExports.toDisplayString(item.question), 1)
                            ]),
                            _: 2
                          }, 1032, ["field-key", "style"]),
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-lucide-chevron-down",
                            class: ["w-5 h-5 shrink-0 transition-transform duration-200", { "rotate-180": isOpen(index) }],
                            style: vueExports.unref(textMutedStyle)
                          }, null, 8, ["class", "style"])
                        ]),
                        _: 2
                      }, 1032, ["class", "onClick"])),
                      vueExports.createVNode(vueExports.Transition, {
                        "enter-active-class": "transition-all duration-200 ease-out",
                        "enter-from-class": "opacity-0 -translate-y-1",
                        "enter-to-class": "opacity-100 translate-y-0",
                        "leave-active-class": "transition-all duration-150 ease-in",
                        "leave-from-class": "opacity-100 translate-y-0",
                        "leave-to-class": "opacity-0 -translate-y-1"
                      }, {
                        default: vueExports.withCtx(() => [
                          isOpen(index) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            class: "pb-5"
                          }, [
                            vueExports.createVNode(_component_EditorInlineRichField, {
                              "field-key": `items.${index}.answer`,
                              placeholder: "Write your answer...",
                              class: "rich-text",
                              style: vueExports.unref(textMutedStyle),
                              html: ""
                            }, {
                              default: vueExports.withCtx(() => [
                                item.answer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: 0,
                                  innerHTML: vueExports.unref(sanitizeHtml)(item.answer)
                                }, null, 8, ["innerHTML"])) : vueExports.createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["field-key", "style"])
                          ])) : vueExports.createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024)
                    ], 4);
                  }), 128))
                ], 4)
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Accordion.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BlocksAccordion = Object.assign(_sfc_main$4, { __name: "BlocksAccordion" });
const accordionDefinition = {
  type: "accordion",
  label: "Accordion",
  icon: "i-lucide-chevrons-up-down",
  component: BlocksAccordion,
  defaultContent: {
    heading: "Frequently Asked Questions",
    showHeading: true,
    ...styleDefaults,
    items: [
      {
        id: crypto.randomUUID(),
        question: "What services do you offer?",
        answer: "<p>I offer web design, development, and consulting services tailored to your needs.</p>"
      },
      {
        id: crypto.randomUUID(),
        question: "How long does a project take?",
        answer: "<p>Timelines vary by scope, but most projects take between two and eight weeks from kickoff to delivery.</p>"
      },
      {
        id: crypto.randomUUID(),
        question: "How do I get started?",
        answer: "<p>Just reach out via the contact form and we'll schedule a call to discuss your project.</p>"
      }
    ]
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [
        {
          label: "Content",
          fields: [
            { key: "showHeading", label: "Show heading", type: "switch" },
            {
              key: "heading",
              label: "Heading",
              type: "inline-text",
              placeholder: "FAQ",
              showIf: { key: "showHeading", value: true }
            },
            {
              key: "items",
              label: "Questions",
              type: "list",
              itemLabel: "Question",
              defaultItem: () => ({
                id: crypto.randomUUID(),
                question: "New question",
                answer: "<p>Your answer here.</p>"
              }),
              itemFields: [
                { key: "question", label: "Question", placeholder: "Your question", inline: true },
                { key: "answer", label: "Answer", type: "textarea", placeholder: "Your answer" }
              ]
            }
          ]
        }
      ]
    },
    styleTab
  ]
};
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = (() => {
  console.error(intervalError);
});
const _sfc_main$3 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Testimonial",
  __ssrInlineRender: true,
  props: {
    background: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    surfaceColor: { default: null },
    heading: { default: "What people say" },
    showHeading: { type: Boolean, default: true },
    autoplay: { type: Boolean, default: false },
    items: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const { maxContentWidth } = useLayoutSettings();
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
    const { resolvePrimary } = useActivePalette();
    const { autoTextColor, textColorStyle } = useBlockBackground(() => props.background);
    const {
      surfaceHex,
      surfaceStyle,
      surfaceTextColor,
      surfaceTextStyle,
      surfaceTextMutedStyle,
      surfacePrimary
    } = useBlockSurface(() => props.surfaceColor);
    const quoteIconStyle = vueExports.computed(
      () => surfaceTextColor.value ? { color: surfaceTextColor.value, opacity: "0.25" } : { color: "var(--primary)", opacity: "1" }
    );
    const bgPrimary = vueExports.computed(() => resolvePrimary(props.background));
    const inEditor = Boolean(vueExports.inject(inlineEditorKey, null));
    const current = vueExports.ref(0);
    let timer = null;
    function prev() {
      current.value = (current.value - 1 + props.items.length) % props.items.length;
    }
    function next() {
      current.value = (current.value + 1) % props.items.length;
    }
    function startAutoplay() {
      if (!props.autoplay || inEditor || (props.items?.length ?? 0) < 2) return;
      timer = setInterval();
    }
    function stopAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
    vueExports.watch(
      () => props.autoplay,
      (val) => {
        stopAutoplay();
        if (val) startAutoplay();
      }
    );
    vueExports.watch(
      () => props.items?.length,
      (len) => {
        if (current.value >= (len ?? 0)) current.value = 0;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksBlockWrapper = __nuxt_component_0;
      const _component_EditorInlineTextField = __nuxt_component_1;
      const _component_UIcon = _sfc_main$d$1;
      const _component_EditorInlineRichField = __nuxt_component_3$1;
      _push(ssrRenderComponent_1(_component_BlocksBlockWrapper, vueExports.mergeProps({ class: "px-8 py-12" }, {
        background: __props.background,
        backgroundImage: __props.backgroundImage,
        backgroundOpacity: __props.backgroundOpacity,
        backgroundFixed: __props.backgroundFixed,
        overlayEnabled: __props.overlayEnabled,
        overlayType: __props.overlayType,
        overlayColor: __props.overlayColor,
        overlayColor2: __props.overlayColor2,
        overlayDegree: __props.overlayDegree,
        overlayOpacity: __props.overlayOpacity
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass_1([[vueExports.unref(maxWidthClass)], "mx-auto"])}"${_scopeId}>`);
            if (__props.showHeading) {
              _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                "field-key": "heading",
                tag: "h2",
                class: "text-3xl font-bold mb-10 text-center",
                style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h2 class="text-3xl font-bold mb-10 text-center" style="${ssrRenderStyle_1({
                      ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                      fontFamily: "var(--font-heading)"
                    })}"${_scopeId2}>${ssrInterpolate_1(__props.heading)}</h2>`);
                  } else {
                    return [
                      vueExports.createVNode("h2", {
                        class: "text-3xl font-bold mb-10 text-center",
                        style: {
                          ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                          fontFamily: "var(--font-heading)"
                        }
                      }, vueExports.toDisplayString(__props.heading), 5)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(inEditor)) {
              _push2(`<div class="flex flex-col gap-6"${_scopeId}><!--[-->`);
              ssrRenderList_1(__props.items, (item, index) => {
                _push2(`<div class="rounded-2xl p-8" style="${ssrRenderStyle_1(vueExports.unref(surfaceStyle))}"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UIcon, {
                  name: "i-lucide-quote",
                  class: "w-8 h-8 mb-4",
                  style: vueExports.unref(quoteIconStyle)
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent_1(_component_EditorInlineRichField, {
                  "field-key": `items.${index}.quote`,
                  placeholder: "Write a testimonial...",
                  class: "rich-text text-lg leading-relaxed mb-6",
                  style: vueExports.unref(surfaceTextStyle),
                  html: ""
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (item.quote) {
                        _push3(`<div${_scopeId2}>${vueExports.unref(sanitizeHtml)(item.quote) ?? ""}</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        item.quote ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          innerHTML: vueExports.unref(sanitizeHtml)(item.quote)
                        }, null, 8, ["innerHTML"])) : vueExports.createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
                if (item.avatar) {
                  _push2(`<img${ssrRenderAttr_1("src", item.avatar)}${ssrRenderAttr_1("alt", item.author)} class="w-10 h-10 rounded-full object-cover shrink-0"${_scopeId}>`);
                } else {
                  _push2(`<div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold" style="${ssrRenderStyle_1({
                    backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})`,
                    color: vueExports.unref(surfacePrimary)
                  })}"${_scopeId}>${ssrInterpolate_1(item.author?.charAt(0) ?? "?")}</div>`);
                }
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                  "field-key": `items.${index}.author`,
                  tag: "p",
                  class: "font-semibold text-sm",
                  style: vueExports.unref(surfaceTextStyle),
                  "data-placeholder": item.author
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate_1(item.author)}`);
                    } else {
                      return [
                        vueExports.createTextVNode(vueExports.toDisplayString(item.author), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                  "field-key": `items.${index}.role`,
                  tag: "p",
                  class: "text-sm",
                  style: vueExports.unref(surfaceTextMutedStyle),
                  "data-placeholder": item.role
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate_1(item.role)}`);
                    } else {
                      return [
                        vueExports.createTextVNode(vueExports.toDisplayString(item.role), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else if (__props.items && __props.items.length) {
              _push2(`<div${_scopeId}><div class="relative"${_scopeId}><div class="overflow-hidden"${_scopeId}><div class="flex transition-transform duration-500 ease-in-out" style="${ssrRenderStyle_1({ transform: `translateX(-${vueExports.unref(current) * 100}%)` })}"${_scopeId}><!--[-->`);
              ssrRenderList_1(__props.items, (item, index) => {
                _push2(`<div class="w-full shrink-0 px-1"${_scopeId}><div class="rounded-2xl p-8" style="${ssrRenderStyle_1(vueExports.unref(surfaceStyle))}"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UIcon, {
                  name: "i-lucide-quote",
                  class: "w-8 h-8 mb-4",
                  style: vueExports.unref(quoteIconStyle)
                }, null, _parent2, _scopeId));
                if (item.quote) {
                  _push2(`<div class="rich-text text-lg leading-relaxed mb-6" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextStyle))}"${_scopeId}>${vueExports.unref(sanitizeHtml)(item.quote) ?? ""}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
                if (item.avatar) {
                  _push2(`<img${ssrRenderAttr_1("src", item.avatar)}${ssrRenderAttr_1("alt", item.author)} class="w-10 h-10 rounded-full object-cover shrink-0"${_scopeId}>`);
                } else {
                  _push2(`<div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold" style="${ssrRenderStyle_1({
                    backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})`,
                    color: vueExports.unref(surfacePrimary)
                  })}"${_scopeId}>${ssrInterpolate_1(item.author?.charAt(0) ?? "?")}</div>`);
                }
                _push2(`<div${_scopeId}><p class="font-semibold text-sm" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextStyle))}"${_scopeId}>${ssrInterpolate_1(item.author)}</p><p class="text-sm" style="${ssrRenderStyle_1(vueExports.unref(surfaceTextMutedStyle))}"${_scopeId}>${ssrInterpolate_1(item.role)}</p></div></div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
              if (__props.items.length > 1) {
                _push2(`<button class="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-opacity hover:opacity-80" style="${ssrRenderStyle_1({ ...vueExports.unref(surfaceStyle), ...vueExports.unref(surfaceTextStyle) })}" aria-label="Previous"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UIcon, {
                  name: "i-lucide-chevron-left",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.items.length > 1) {
                _push2(`<button class="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-opacity hover:opacity-80" style="${ssrRenderStyle_1({ ...vueExports.unref(surfaceStyle), ...vueExports.unref(surfaceTextStyle) })}" aria-label="Next"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UIcon, {
                  name: "i-lucide-chevron-right",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (__props.items.length > 1) {
                _push2(`<div class="flex justify-center gap-2 mt-6"${_scopeId}><!--[-->`);
                ssrRenderList_1(__props.items, (_2, i) => {
                  _push2(`<button class="w-2 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle_1({
                    backgroundColor: i === vueExports.unref(current) ? vueExports.unref(bgPrimary) : vueExports.unref(autoTextColor) ? `color-mix(in srgb, ${vueExports.unref(autoTextColor)} 20%, transparent)` : "color-mix(in srgb, var(--text-primary) 20%, transparent)",
                    transform: i === vueExports.unref(current) ? "scale(1.25)" : "scale(1)"
                  })}"${ssrRenderAttr_1("aria-label", `Go to slide ${i + 1}`)}${_scopeId}></button>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                class: ["mx-auto", [vueExports.unref(maxWidthClass)]]
              }, [
                __props.showHeading ? (vueExports.openBlock(), vueExports.createBlock(_component_EditorInlineTextField, {
                  key: 0,
                  "field-key": "heading",
                  tag: "h2",
                  class: "text-3xl font-bold mb-10 text-center",
                  style: vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" }
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode("h2", {
                      class: "text-3xl font-bold mb-10 text-center",
                      style: {
                        ...vueExports.unref(autoTextColor) ? vueExports.unref(textColorStyle) : { color: "var(--text-primary)" },
                        fontFamily: "var(--font-heading)"
                      }
                    }, vueExports.toDisplayString(__props.heading), 5)
                  ]),
                  _: 1
                }, 8, ["style"])) : vueExports.createCommentVNode("", true),
                vueExports.unref(inEditor) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 1,
                  class: "flex flex-col gap-6"
                }, [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.items, (item, index) => {
                    return vueExports.openBlock(), vueExports.createBlock("div", {
                      key: item.id ?? index,
                      class: "rounded-2xl p-8",
                      style: vueExports.unref(surfaceStyle)
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-lucide-quote",
                        class: "w-8 h-8 mb-4",
                        style: vueExports.unref(quoteIconStyle)
                      }, null, 8, ["style"]),
                      vueExports.createVNode(_component_EditorInlineRichField, {
                        "field-key": `items.${index}.quote`,
                        placeholder: "Write a testimonial...",
                        class: "rich-text text-lg leading-relaxed mb-6",
                        style: vueExports.unref(surfaceTextStyle),
                        html: ""
                      }, {
                        default: vueExports.withCtx(() => [
                          item.quote ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            innerHTML: vueExports.unref(sanitizeHtml)(item.quote)
                          }, null, 8, ["innerHTML"])) : vueExports.createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["field-key", "style"]),
                      vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                        item.avatar ? (vueExports.openBlock(), vueExports.createBlock("img", {
                          key: 0,
                          src: item.avatar,
                          alt: item.author,
                          class: "w-10 h-10 rounded-full object-cover shrink-0"
                        }, null, 8, ["src", "alt"])) : (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 1,
                          class: "w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold",
                          style: {
                            backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})`,
                            color: vueExports.unref(surfacePrimary)
                          }
                        }, vueExports.toDisplayString(item.author?.charAt(0) ?? "?"), 5)),
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode(_component_EditorInlineTextField, {
                            "field-key": `items.${index}.author`,
                            tag: "p",
                            class: "font-semibold text-sm",
                            style: vueExports.unref(surfaceTextStyle),
                            "data-placeholder": item.author
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(vueExports.toDisplayString(item.author), 1)
                            ]),
                            _: 2
                          }, 1032, ["field-key", "style", "data-placeholder"]),
                          vueExports.createVNode(_component_EditorInlineTextField, {
                            "field-key": `items.${index}.role`,
                            tag: "p",
                            class: "text-sm",
                            style: vueExports.unref(surfaceTextMutedStyle),
                            "data-placeholder": item.role
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(vueExports.toDisplayString(item.role), 1)
                            ]),
                            _: 2
                          }, 1032, ["field-key", "style", "data-placeholder"])
                        ])
                      ])
                    ], 4);
                  }), 128))
                ])) : __props.items && __props.items.length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 2,
                  onMouseenter: stopAutoplay,
                  onMouseleave: startAutoplay
                }, [
                  vueExports.createVNode("div", { class: "relative" }, [
                    vueExports.createVNode("div", { class: "overflow-hidden" }, [
                      vueExports.createVNode("div", {
                        class: "flex transition-transform duration-500 ease-in-out",
                        style: { transform: `translateX(-${vueExports.unref(current) * 100}%)` }
                      }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.items, (item, index) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key: item.id ?? index,
                            class: "w-full shrink-0 px-1"
                          }, [
                            vueExports.createVNode("div", {
                              class: "rounded-2xl p-8",
                              style: vueExports.unref(surfaceStyle)
                            }, [
                              vueExports.createVNode(_component_UIcon, {
                                name: "i-lucide-quote",
                                class: "w-8 h-8 mb-4",
                                style: vueExports.unref(quoteIconStyle)
                              }, null, 8, ["style"]),
                              item.quote ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 0,
                                class: "rich-text text-lg leading-relaxed mb-6",
                                style: vueExports.unref(surfaceTextStyle),
                                innerHTML: vueExports.unref(sanitizeHtml)(item.quote)
                              }, null, 12, ["innerHTML"])) : vueExports.createCommentVNode("", true),
                              vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                                item.avatar ? (vueExports.openBlock(), vueExports.createBlock("img", {
                                  key: 0,
                                  src: item.avatar,
                                  alt: item.author,
                                  class: "w-10 h-10 rounded-full object-cover shrink-0"
                                }, null, 8, ["src", "alt"])) : (vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: 1,
                                  class: "w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold",
                                  style: {
                                    backgroundColor: `color-mix(in srgb, ${vueExports.unref(surfacePrimary)} 15%, ${vueExports.unref(surfaceHex) ?? "var(--bg-surface)"})`,
                                    color: vueExports.unref(surfacePrimary)
                                  }
                                }, vueExports.toDisplayString(item.author?.charAt(0) ?? "?"), 5)),
                                vueExports.createVNode("div", null, [
                                  vueExports.createVNode("p", {
                                    class: "font-semibold text-sm",
                                    style: vueExports.unref(surfaceTextStyle)
                                  }, vueExports.toDisplayString(item.author), 5),
                                  vueExports.createVNode("p", {
                                    class: "text-sm",
                                    style: vueExports.unref(surfaceTextMutedStyle)
                                  }, vueExports.toDisplayString(item.role), 5)
                                ])
                              ])
                            ], 4)
                          ]);
                        }), 128))
                      ], 4)
                    ]),
                    __props.items.length > 1 ? (vueExports.openBlock(), vueExports.createBlock("button", {
                      key: 0,
                      class: "absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-opacity hover:opacity-80",
                      style: { ...vueExports.unref(surfaceStyle), ...vueExports.unref(surfaceTextStyle) },
                      "aria-label": "Previous",
                      onClick: prev
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-lucide-chevron-left",
                        class: "w-4 h-4"
                      })
                    ], 4)) : vueExports.createCommentVNode("", true),
                    __props.items.length > 1 ? (vueExports.openBlock(), vueExports.createBlock("button", {
                      key: 1,
                      class: "absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-opacity hover:opacity-80",
                      style: { ...vueExports.unref(surfaceStyle), ...vueExports.unref(surfaceTextStyle) },
                      "aria-label": "Next",
                      onClick: next
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-lucide-chevron-right",
                        class: "w-4 h-4"
                      })
                    ], 4)) : vueExports.createCommentVNode("", true)
                  ]),
                  __props.items.length > 1 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "flex justify-center gap-2 mt-6"
                  }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.items, (_2, i) => {
                      return vueExports.openBlock(), vueExports.createBlock("button", {
                        key: i,
                        class: "w-2 h-2 rounded-full transition-all duration-300",
                        style: {
                          backgroundColor: i === vueExports.unref(current) ? vueExports.unref(bgPrimary) : vueExports.unref(autoTextColor) ? `color-mix(in srgb, ${vueExports.unref(autoTextColor)} 20%, transparent)` : "color-mix(in srgb, var(--text-primary) 20%, transparent)",
                          transform: i === vueExports.unref(current) ? "scale(1.25)" : "scale(1)"
                        },
                        "aria-label": `Go to slide ${i + 1}`,
                        onClick: ($event) => current.value = i
                      }, null, 12, ["aria-label", "onClick"]);
                    }), 128))
                  ])) : vueExports.createCommentVNode("", true)
                ], 32)) : vueExports.createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Testimonial.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const BlocksTestimonial = Object.assign(_sfc_main$3, { __name: "BlocksTestimonial" });
const testimonialDefinition = {
  type: "testimonial",
  label: "Testimonials",
  icon: "i-lucide-quote",
  component: BlocksTestimonial,
  defaultContent: {
    heading: "What people say",
    showHeading: true,
    autoplay: false,
    ...styleDefaults,
    items: [
      {
        id: crypto.randomUUID(),
        quote: "<p>Working with them was an absolute pleasure. The attention to detail and speed of delivery exceeded every expectation we had.</p>",
        author: "Sarah Johnson",
        role: "CEO at Acme",
        avatar: null
      },
      {
        id: crypto.randomUUID(),
        quote: "<p>Truly outstanding work. They took our rough idea and turned it into something we are genuinely proud to show off.</p>",
        author: "Marcus Lee",
        role: "Founder at Spark",
        avatar: null
      },
      {
        id: crypto.randomUUID(),
        quote: "<p>Fast, communicative, and the quality speaks for itself. We will definitely be working together again.</p>",
        author: "Priya Nair",
        role: "Product Lead at Loop",
        avatar: null
      }
    ]
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [
        {
          fields: [
            { key: "showHeading", label: "Show heading", type: "switch" },
            {
              key: "heading",
              label: "Heading",
              type: "inline-text",
              placeholder: "What people say",
              showIf: { key: "showHeading", value: true }
            },
            {
              key: "items",
              label: "Testimonials",
              type: "list",
              itemLabel: "Testimonial",
              defaultItem: () => ({
                id: crypto.randomUUID(),
                quote: "<p>Your testimonial here.</p>",
                author: "Full Name",
                role: "Role at Company",
                avatar: null
              }),
              itemFields: [
                {
                  key: "quote",
                  label: "Quote",
                  type: "textarea",
                  placeholder: "Their words...",
                  inline: true
                },
                { key: "author", label: "Author", placeholder: "Full Name", inline: true },
                { key: "role", label: "Role / Company", placeholder: "CEO at Acme", inline: true },
                { key: "avatar", label: "Avatar URL", type: "url", placeholder: "https://..." }
              ]
            }
          ]
        }
      ]
    },
    {
      label: "Settings",
      icon: "i-lucide-settings-2",
      sections: [
        {
          fields: [{ key: "autoplay", label: "Autoplay", type: "switch" }]
        }
      ]
    },
    styleTab
  ]
};
const _sfc_main$2 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Skills",
  __ssrInlineRender: true,
  props: {
    background: { default: null },
    backgroundImage: { default: null },
    backgroundOpacity: { default: 100 },
    backgroundFixed: { type: Boolean, default: false },
    overlayEnabled: { type: Boolean, default: false },
    overlayType: { default: "solid" },
    overlayColor: { default: null },
    overlayColor2: { default: null },
    overlayDegree: { default: 180 },
    overlayOpacity: { default: 40 },
    surfaceColor: { default: null },
    heading: { default: "Skills & Expertise" },
    showHeading: { type: Boolean, default: true },
    columns: { default: "2" },
    skills: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const { maxContentWidth } = useLayoutSettings();
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[maxContentWidth.value]);
    const { resolveColor, resolvePrimary, resolveSecondary } = useActivePalette();
    const bgHex = vueExports.computed(() => props.background ? resolveColor(props.background) : null);
    const bgPrimary = vueExports.computed(() => resolvePrimary(props.background));
    const bgSecondary = vueExports.computed(() => resolveSecondary(props.background));
    const { textPrimaryStyle, textMutedStyle } = useBlockBackground(() => props.background);
    const trackStyle = vueExports.computed(() => ({
      backgroundColor: `color-mix(in srgb, ${bgPrimary.value} 12%, ${bgHex.value ?? "var(--bg-surface)"})`
    }));
    const barGradient = vueExports.computed(
      () => `linear-gradient(to right, ${bgPrimary.value}, color-mix(in srgb, ${bgPrimary.value} 75%, ${bgSecondary.value}))`
    );
    const inEditor = Boolean(vueExports.inject(inlineEditorKey, null));
    const grouped = vueExports.computed(() => {
      const map = /* @__PURE__ */ new Map();
      (props.skills ?? []).forEach((item, i) => {
        const cat = item.category?.trim() || "General";
        if (!map.has(cat)) map.set(cat, []);
        map.get(cat).push({ item, flatIndex: i });
      });
      return [...map.entries()];
    });
    const hasCategories = vueExports.computed(
      () => grouped.value.length > 1 || grouped.value[0]?.[0] !== "General"
    );
    const delayMap = vueExports.computed(() => {
      const m = /* @__PURE__ */ new Map();
      let counter = 0;
      for (const [, entries] of grouped.value) {
        for (const entry of entries) {
          m.set(entry.flatIndex, counter * 60);
          counter++;
        }
      }
      return m;
    });
    const wrapperRef = vueExports.ref(null);
    const animated = vueExports.ref(inEditor);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksBlockWrapper = __nuxt_component_0;
      const _component_EditorInlineTextField = __nuxt_component_1;
      _push(ssrRenderComponent_1(_component_BlocksBlockWrapper, vueExports.mergeProps({
        ref_key: "wrapperRef",
        ref: wrapperRef,
        class: "px-8 py-12"
      }, {
        background: __props.background,
        backgroundImage: __props.backgroundImage,
        backgroundOpacity: __props.backgroundOpacity,
        backgroundFixed: __props.backgroundFixed,
        overlayEnabled: __props.overlayEnabled,
        overlayType: __props.overlayType,
        overlayColor: __props.overlayColor,
        overlayColor2: __props.overlayColor2,
        overlayDegree: __props.overlayDegree,
        overlayOpacity: __props.overlayOpacity
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass_1([[vueExports.unref(maxWidthClass)], "mx-auto"])}"${_scopeId}>`);
            if (__props.showHeading) {
              _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                "field-key": "heading",
                tag: "h2",
                class: "text-3xl font-bold mb-10",
                style: vueExports.unref(textPrimaryStyle)
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h2 class="text-3xl font-bold mb-10" style="${ssrRenderStyle_1({ ...vueExports.unref(textPrimaryStyle), fontFamily: "var(--font-heading)" })}"${_scopeId2}>${ssrInterpolate_1(__props.heading)}</h2>`);
                  } else {
                    return [
                      vueExports.createVNode("h2", {
                        class: "text-3xl font-bold mb-10",
                        style: { ...vueExports.unref(textPrimaryStyle), fontFamily: "var(--font-heading)" }
                      }, vueExports.toDisplayString(__props.heading), 5)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="${ssrRenderClass_1([__props.columns === "2" ? "grid grid-cols-1 sm:grid-cols-2" : "flex flex-col", "gap-x-12 gap-y-10"])}"${_scopeId}><!--[-->`);
            ssrRenderList_1(vueExports.unref(grouped), ([category, entries]) => {
              _push2(`<div${_scopeId}>`);
              if (vueExports.unref(hasCategories)) {
                _push2(`<p class="text-xs font-semibold uppercase tracking-widest mb-4" style="${ssrRenderStyle_1(vueExports.unref(textMutedStyle))}"${_scopeId}>${ssrInterpolate_1(category)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex flex-col gap-4"${_scopeId}><!--[-->`);
              ssrRenderList_1(entries, (entry) => {
                _push2(`<div${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_EditorInlineTextField, {
                  "field-key": `skills.${entry.flatIndex}.name`,
                  tag: "span",
                  class: "text-sm font-medium",
                  style: vueExports.unref(textPrimaryStyle),
                  "data-placeholder": entry.item.name
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate_1(entry.item.name)}`);
                    } else {
                      return [
                        vueExports.createTextVNode(vueExports.toDisplayString(entry.item.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<span class="text-xs tabular-nums font-medium ml-3 shrink-0" style="${ssrRenderStyle_1(vueExports.unref(textMutedStyle))}"${_scopeId}>${ssrInterpolate_1(entry.item.level ?? 0)}% </span></div><div class="w-full h-1.5 rounded-full overflow-hidden" style="${ssrRenderStyle_1(vueExports.unref(trackStyle))}"${_scopeId}><div class="h-full rounded-full" style="${ssrRenderStyle_1({
                  width: vueExports.unref(animated) ? (Number(entry.item.level) || 0) + "%" : "0%",
                  background: vueExports.unref(barGradient),
                  transition: vueExports.unref(animated) ? `width 0.75s cubic-bezier(0.4, 0, 0.2, 1) ${vueExports.unref(delayMap).get(entry.flatIndex) ?? 0}ms` : "none"
                })}"${_scopeId}></div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                class: ["mx-auto", [vueExports.unref(maxWidthClass)]]
              }, [
                __props.showHeading ? (vueExports.openBlock(), vueExports.createBlock(_component_EditorInlineTextField, {
                  key: 0,
                  "field-key": "heading",
                  tag: "h2",
                  class: "text-3xl font-bold mb-10",
                  style: vueExports.unref(textPrimaryStyle)
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode("h2", {
                      class: "text-3xl font-bold mb-10",
                      style: { ...vueExports.unref(textPrimaryStyle), fontFamily: "var(--font-heading)" }
                    }, vueExports.toDisplayString(__props.heading), 5)
                  ]),
                  _: 1
                }, 8, ["style"])) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("div", {
                  class: ["gap-x-12 gap-y-10", __props.columns === "2" ? "grid grid-cols-1 sm:grid-cols-2" : "flex flex-col"]
                }, [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(grouped), ([category, entries]) => {
                    return vueExports.openBlock(), vueExports.createBlock("div", { key: category }, [
                      vueExports.unref(hasCategories) ? (vueExports.openBlock(), vueExports.createBlock("p", {
                        key: 0,
                        class: "text-xs font-semibold uppercase tracking-widest mb-4",
                        style: vueExports.unref(textMutedStyle)
                      }, vueExports.toDisplayString(category), 5)) : vueExports.createCommentVNode("", true),
                      vueExports.createVNode("div", { class: "flex flex-col gap-4" }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(entries, (entry) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key: entry.item.id ?? entry.flatIndex
                          }, [
                            vueExports.createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                              vueExports.createVNode(_component_EditorInlineTextField, {
                                "field-key": `skills.${entry.flatIndex}.name`,
                                tag: "span",
                                class: "text-sm font-medium",
                                style: vueExports.unref(textPrimaryStyle),
                                "data-placeholder": entry.item.name
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(entry.item.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["field-key", "style", "data-placeholder"]),
                              vueExports.createVNode("span", {
                                class: "text-xs tabular-nums font-medium ml-3 shrink-0",
                                style: vueExports.unref(textMutedStyle)
                              }, vueExports.toDisplayString(entry.item.level ?? 0) + "% ", 5)
                            ]),
                            vueExports.createVNode("div", {
                              class: "w-full h-1.5 rounded-full overflow-hidden",
                              style: vueExports.unref(trackStyle)
                            }, [
                              vueExports.createVNode("div", {
                                class: "h-full rounded-full",
                                style: {
                                  width: vueExports.unref(animated) ? (Number(entry.item.level) || 0) + "%" : "0%",
                                  background: vueExports.unref(barGradient),
                                  transition: vueExports.unref(animated) ? `width 0.75s cubic-bezier(0.4, 0, 0.2, 1) ${vueExports.unref(delayMap).get(entry.flatIndex) ?? 0}ms` : "none"
                                }
                              }, null, 4)
                            ], 4)
                          ]);
                        }), 128))
                      ])
                    ]);
                  }), 128))
                ], 2)
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Skills.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BlocksSkills = Object.assign(_sfc_main$2, { __name: "BlocksSkills" });
const skillsDefinition = {
  type: "skills",
  label: "Skills",
  icon: "i-lucide-bar-chart-2",
  component: BlocksSkills,
  defaultContent: {
    heading: "Skills & Expertise",
    showHeading: true,
    columns: "2",
    ...styleDefaults,
    skills: [
      { id: crypto.randomUUID(), name: "JavaScript", level: "90", category: "Languages" },
      { id: crypto.randomUUID(), name: "TypeScript", level: "85", category: "Languages" },
      { id: crypto.randomUUID(), name: "Python", level: "70", category: "Languages" },
      { id: crypto.randomUUID(), name: "Vue.js", level: "90", category: "Frameworks" },
      { id: crypto.randomUUID(), name: "React", level: "75", category: "Frameworks" },
      { id: crypto.randomUUID(), name: "Node.js", level: "80", category: "Frameworks" },
      { id: crypto.randomUUID(), name: "Figma", level: "85", category: "Design" },
      { id: crypto.randomUUID(), name: "UI / UX", level: "75", category: "Design" }
    ]
  },
  tabs: [
    {
      label: "Content",
      icon: "i-lucide-text",
      sections: [
        {
          label: "Content",
          fields: [
            { key: "showHeading", label: "Show heading", type: "switch" },
            {
              key: "heading",
              label: "Heading",
              type: "inline-text",
              placeholder: "Skills & Expertise",
              showIf: { key: "showHeading", value: true }
            },
            {
              key: "skills",
              label: "Skills",
              type: "list",
              itemLabel: "Skill",
              defaultItem: () => ({
                id: crypto.randomUUID(),
                name: "New Skill",
                level: "75",
                category: ""
              }),
              itemFields: [
                { key: "name", label: "Name", placeholder: "e.g. JavaScript", inline: true },
                {
                  key: "level",
                  label: "Level",
                  type: "select",
                  options: [
                    { label: "Beginner — 20%", value: "20" },
                    { label: "Elementary — 40%", value: "40" },
                    { label: "Intermediate — 60%", value: "60" },
                    { label: "Advanced — 75%", value: "75" },
                    { label: "Proficient — 85%", value: "85" },
                    { label: "Expert — 95%", value: "95" },
                    { label: "Master — 100%", value: "100" }
                  ]
                },
                { key: "category", label: "Category", placeholder: "e.g. Languages" }
              ]
            }
          ]
        },
        {
          label: "Layout",
          fields: [
            {
              key: "columns",
              label: "Columns",
              type: "select",
              options: [
                { label: "1 column", value: "1" },
                { label: "2 columns", value: "2" }
              ]
            }
          ]
        }
      ]
    },
    styleTab
  ]
};
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Separator",
  __ssrInlineRender: true,
  props: {
    label: { default: "" },
    icon: { default: "" },
    avatar: { default: "" },
    size: { default: "md" },
    color: { default: null },
    labelFont: { default: null },
    maxWidth: { default: "full" }
  },
  setup(__props) {
    const props = __props;
    const { resolveColor } = useActivePalette();
    const resolvedColor = vueExports.computed(() => props.color ? resolveColor(props.color) : null);
    const wrapperStyle = vueExports.computed(() => {
      const c = resolvedColor.value;
      if (!c) return {};
      return {
        "--sep-color": c,
        "--sep-border-color": `color-mix(in srgb, ${c} 40%, transparent)`
      };
    });
    const labelStyle = vueExports.computed(() => ({
      ...resolvedColor.value ? { color: resolvedColor.value } : {},
      ...props.labelFont ? { fontFamily: props.labelFont } : {}
    }));
    const iconStyle = vueExports.computed(() => resolvedColor.value ? { color: resolvedColor.value } : {});
    const maxWidthClass = vueExports.computed(() => MAX_CONTENT_WIDTH_CLASS[props.maxWidth]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USeparator = _sfc_main$h;
      const _component_UIcon = _sfc_main$d$1;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({
        class: "px-8 py-6",
        style: vueExports.unref(wrapperStyle)
      }, _attrs))}><div class="${ssrRenderClass_1([vueExports.unref(maxWidthClass), "mx-auto [&_.separator-border]:border-(--sep-border-color,inherit)"])}">`);
      _push(ssrRenderComponent_1(_component_USeparator, {
        label: __props.label || void 0,
        icon: !__props.avatar && __props.icon ? __props.icon : void 0,
        avatar: __props.avatar ? { src: __props.avatar } : void 0,
        size: __props.size,
        ui: {
          border: vueExports.unref(resolvedColor) ? "border-[var(--sep-border-color)]" : "",
          label: "text-sm",
          icon: "shrink-0 size-5"
        }
      }, vueExports.createSlots({ _: 2 }, [
        __props.label && (vueExports.unref(resolvedColor) || __props.labelFont) ? {
          name: "default",
          fn: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span style="${ssrRenderStyle_1(vueExports.unref(labelStyle))}"${_scopeId}>${ssrInterpolate_1(__props.label)}</span>`);
            } else {
              return [
                vueExports.createVNode("span", { style: vueExports.unref(labelStyle) }, vueExports.toDisplayString(__props.label), 5)
              ];
            }
          }),
          key: "0"
        } : void 0,
        !__props.avatar && __props.icon && vueExports.unref(resolvedColor) ? {
          name: "icon",
          fn: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: __props.icon,
                class: "shrink-0 size-5",
                style: vueExports.unref(iconStyle)
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: __props.icon,
                  class: "shrink-0 size-5",
                  style: vueExports.unref(iconStyle)
                }, null, 8, ["name", "style"])
              ];
            }
          }),
          key: "1"
        } : void 0
      ]), _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Separator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BlocksSeparator = Object.assign(_sfc_main$1, { __name: "BlocksSeparator" });
const separatorDefinition = {
  type: "separator",
  label: "Separator",
  icon: "i-lucide-minus",
  component: BlocksSeparator,
  defaultContent: {
    label: "",
    icon: "",
    avatar: "",
    size: "xs",
    color: null,
    labelFont: null,
    maxWidth: "full"
  },
  sections: [
    {
      label: "Content",
      fields: [
        { key: "label", label: "Label", type: "text", placeholder: "Optional label text" },
        { key: "icon", label: "Icon", type: "text", placeholder: "e.g. i-lucide-star" },
        { key: "avatar", label: "Image", type: "image" }
      ]
    },
    {
      label: "Style",
      fields: [
        {
          key: "size",
          label: "Size",
          type: "select",
          options: [
            { label: "XS", value: "xs" },
            { label: "SM", value: "sm" },
            { label: "MD", value: "md" },
            { label: "LG", value: "lg" },
            { label: "XL", value: "xl" }
          ]
        },
        { key: "color", label: "Color", type: "theme-color" },
        {
          key: "labelFont",
          label: "Label font",
          type: "font",
          showIf: { key: "label", value: "truthy" }
        },
        {
          key: "maxWidth",
          label: "Max width",
          type: "select",
          options: MAX_CONTENT_WIDTH_OPTIONS
        }
      ]
    }
  ]
};
const blockDefinitions = [
  heroDefinition,
  textDefinition,
  projectsDefinition,
  projectListDefinition,
  postCardsDefinition,
  postFeedDefinition,
  postListDefinition,
  experiencesDefinition,
  // demoDefinition,
  accordionDefinition,
  testimonialDefinition,
  skillsDefinition,
  separatorDefinition
];
const allBlockDefinitions = [
  headerDefinition,
  footerDefinition,
  heroDefinition,
  textDefinition,
  projectsDefinition,
  projectListDefinition,
  postCardsDefinition,
  postFeedDefinition,
  postListDefinition,
  experiencesDefinition,
  demoDefinition,
  accordionDefinition,
  testimonialDefinition,
  skillsDefinition,
  separatorDefinition
];
function usePageEditor() {
  const pendingNewBlocks = useState("editor-pending-new-blocks", () => []);
  const currentPageId = useState("editor-current-page-id", () => null);
  const pendingDeletions = useState("editor-pending-deletions", () => /* @__PURE__ */ new Set());
  const pendingContentEdits = useState(
    "editor-pending-content-edits",
    () => ({})
  );
  const pendingNameEdits = useState(
    "editor-pending-name-edits",
    () => ({})
  );
  function setCurrentPage(pageId) {
    currentPageId.value = pageId;
  }
  function addPendingBlock(type, content) {
    const newBlock = {
      id: `pending-${Date.now()}-${Math.random()}`,
      pageId: currentPageId.value ?? "",
      type,
      name: null,
      sortOrder: 0,
      content,
      styles: {},
      isVisible: true,
      isMandatory: false,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    pendingNewBlocks.value = [...pendingNewBlocks.value, newBlock];
    return newBlock;
  }
  function queueDeletion(blockId) {
    pendingDeletions.value = /* @__PURE__ */ new Set([...pendingDeletions.value, blockId]);
  }
  function setBlockContent(blockId, content) {
    pendingContentEdits.value = { ...pendingContentEdits.value, [blockId]: content };
  }
  function setBlockField(blockId, path, value, currentContent) {
    const existing = pendingContentEdits.value[blockId] ?? currentContent;
    const merged = setPath({ ...currentContent, ...existing }, path, value);
    pendingContentEdits.value = { ...pendingContentEdits.value, [blockId]: merged };
  }
  function setBlockName(blockId, name, liveBlock) {
    if (liveBlock) liveBlock.name = name;
    pendingNameEdits.value = { ...pendingNameEdits.value, [blockId]: name };
  }
  function resetPending() {
    pendingNewBlocks.value = [];
    pendingContentEdits.value = {};
    pendingNameEdits.value = {};
    pendingDeletions.value = /* @__PURE__ */ new Set();
  }
  const hasPendingChanges = vueExports.computed(
    () => pendingNewBlocks.value.length > 0 || Object.keys(pendingContentEdits.value).length > 0 || Object.keys(pendingNameEdits.value).length > 0 || pendingDeletions.value.size > 0
  );
  return {
    pendingNewBlocks,
    pendingDeletions,
    pendingContentEdits,
    pendingNameEdits,
    hasPendingChanges,
    addPendingBlock,
    queueDeletion,
    setBlockContent,
    setBlockField,
    setBlockName,
    setCurrentPage,
    resetPending
  };
}
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Renderer",
  __ssrInlineRender: true,
  props: {
    block: {}
  },
  setup(__props) {
    const props = __props;
    const component = vueExports.computed(() => {
      const def = allBlockDefinitions.find((d) => d.type === props.block.type);
      return def?.component ?? null;
    });
    const { pendingContentEdits } = usePageEditor();
    const blockProps = vueExports.computed(() => {
      const pending = pendingContentEdits.value[props.block.id];
      return pending ? { ...props.block.content, ...pending } : props.block.content;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.block.isVisible !== false) {
        _push(`<!--[-->`);
        if (vueExports.unref(component)) {
          ssrRenderVNode(_push, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref(component)), vueExports.unref(blockProps), null), _parent);
        } else {
          _push(`<div class="px-8 py-4 text-sm opacity-50">Unknown block type: ${ssrInterpolate_1(__props.block.type)}</div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Renderer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main, { __name: "BlocksRenderer" });

export { __nuxt_component_3 as _, allBlockDefinitions as a, blockDefinitions as b, getPath as g, setPath as s, usePageEditor as u };
//# sourceMappingURL=Renderer-BaU1WY6M.mjs.map
