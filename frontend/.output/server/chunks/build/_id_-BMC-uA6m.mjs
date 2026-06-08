import { _ as __nuxt_component_0 } from './PageStructure-K8uU1ezD.mjs';
import { _ as _sfc_main$4 } from './Input-DWHPzDmy.mjs';
import { a8 as useRoute, f as _sfc_main$8, e as _sfc_main$d, U as useComponentProps, N as useAppConfig, M as tv, b as Primitive, d as _export_sfc } from './server.mjs';
import { _ as _sfc_main$5 } from './Alert-Nv5RlKkm.mjs';
import { defineComponent, ref, computed, unref, withCtx, isRef, createTextVNode, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, mergeProps, renderSlot, useModel, reactive, watch, withModifiers, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$6 } from './Modal-D9bZkufO.mjs';
import { _ as _sfc_main$7 } from './Tabs-CjxPSbMS.mjs';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { _ as _sfc_main$9 } from './Badge-C0tQ5UcT.mjs';
import { _ as _sfc_main$a } from './FormField-9wkfNHPa.mjs';
import { b as _sfc_main$2$1, a as _sfc_main$1$1, _ as __nuxt_component_11 } from './MediaPickerModal-CIxpt8n3.mjs';
import { g as getCollectionType } from './collectionTypes-6EiXkZ_r.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { _ as __nuxt_component_4 } from './ConfirmModal-D6HutMUe.mjs';
import { VueDraggable } from 'vue-draggable-plus';
import './PageWrapper-dRmsqRwL.mjs';
import './DashboardSidebarToggle-uAAQWn-6.mjs';
import '@vueuse/core';
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
import './Container-CXQFSuFJ.mjs';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'perfect-debounce';
import '@vueuse/shared';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import './overlay-BWwBD9XH.mjs';
import 'aria-hidden';
import './PopperArrow-CVyIWJ6M.mjs';
import '@floating-ui/vue';
import './MediaGrid-DBtVJH5B.mjs';
import './useServerFeatures-DOIxALfL.mjs';

const theme = {
  "base": "animate-pulse rounded-md bg-elevated"
};
const _sfc_main$3 = {
  __name: "USkeleton",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useComponentProps("skeleton", _props);
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.skeleton || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: unref(props).as,
        "aria-busy": "true",
        "aria-label": "loading",
        "aria-live": "polite",
        role: "alert",
        class: ui.value({ class: [unref(props).ui?.base, unref(props).class] })
      }, _attrs), {
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
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/Skeleton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RichField",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    placeholder: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const openPanel = ref(null);
    const linkUrl = ref("");
    const fmt = reactive({
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
    const activeHeading = computed(() => {
      for (const l of [1, 2, 3, 4, 5, 6]) if (fmt[`h${l}`]) return `H${l}`;
      return "H";
    });
    const activeAlign = computed(() => {
      if (fmt.alignCenter) return "i-lucide-align-center";
      if (fmt.alignRight) return "i-lucide-align-right";
      return "i-lucide-align-left";
    });
    const activeList = computed(() => {
      if (fmt.orderedList) return "i-lucide-list-ordered";
      if (fmt.bulletList) return "i-lucide-list";
      if (fmt.blockquote) return "i-lucide-quote";
      return "i-lucide-list";
    });
    function updateFmt() {
      if (!editor.value) return;
      const ed = editor.value;
      fmt.bold = ed.isActive("bold");
      fmt.italic = ed.isActive("italic");
      fmt.strike = ed.isActive("strike");
      fmt.code = ed.isActive("code");
      fmt.underline = ed.isActive("underline");
      for (const l of [1, 2, 3, 4, 5, 6]) fmt[`h${l}`] = ed.isActive("heading", { level: l });
      fmt.bulletList = ed.isActive("bulletList");
      fmt.orderedList = ed.isActive("orderedList");
      fmt.blockquote = ed.isActive("blockquote");
      fmt.alignLeft = ed.isActive({ textAlign: "left" });
      fmt.alignCenter = ed.isActive({ textAlign: "center" });
      fmt.alignRight = ed.isActive({ textAlign: "right" });
      fmt.link = ed.isActive("link");
    }
    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Placeholder.configure({ placeholder: props.placeholder ?? "" })
      ],
      editorProps: { attributes: { class: "outline-none rich-text px-3 py-3 min-h-48 cursor-text" } },
      onUpdate({ editor: ed }) {
        emit("update:modelValue", ed.getHTML());
        updateFmt();
      },
      onSelectionUpdate: updateFmt,
      onFocus: updateFmt
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (!editor.value || editor.value.isFocused) return;
        if (editor.value.getHTML() !== val) editor.value.commands.setContent(val);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border border-default rounded-md overflow-hidden flex flex-col" }, _attrs))} data-v-a5ae91fa><div class="flex flex-wrap items-center gap-0.5 border-b border-default bg-neutral-900 text-white px-1.5 py-1 text-sm select-none relative" data-v-a5ae91fa>`);
      if (unref(openPanel) === "heading") {
        _push(`<div class="absolute top-full mt-1 left-2 z-10 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5" data-v-a5ae91fa><!--[-->`);
        ssrRenderList([1, 2, 3, 4, 5, 6], (lvl) => {
          _push(`<button class="${ssrRenderClass([{ active: unref(fmt)[`h${lvl}`] }, "tiptap-toolbar-btn text-xs font-semibold w-7"])}" data-v-a5ae91fa> H${ssrInterpolate(lvl)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(openPanel) === "list") {
        _push(`<div class="absolute top-full mt-1 left-2 z-10 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5" data-v-a5ae91fa><button class="${ssrRenderClass([{ active: unref(fmt).bulletList }, "tiptap-toolbar-btn"])}" title="Bullet list" data-v-a5ae91fa>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-list",
          class: "size-3.5"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([{ active: unref(fmt).orderedList }, "tiptap-toolbar-btn"])}" title="Numbered list" data-v-a5ae91fa>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-list-ordered",
          class: "size-3.5"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([{ active: unref(fmt).blockquote }, "tiptap-toolbar-btn"])}" title="Blockquote" data-v-a5ae91fa>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-quote",
          class: "size-3.5"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(openPanel) === "align") {
        _push(`<div class="absolute top-full mt-1 left-2 z-10 bg-neutral-900 text-white rounded-lg shadow-xl p-1 flex gap-0.5" data-v-a5ae91fa><button class="${ssrRenderClass([{ active: unref(fmt).alignLeft }, "tiptap-toolbar-btn"])}" title="Align left" data-v-a5ae91fa>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-align-left",
          class: "size-3.5"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([{ active: unref(fmt).alignCenter }, "tiptap-toolbar-btn"])}" title="Align center" data-v-a5ae91fa>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-align-center",
          class: "size-3.5"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([{ active: unref(fmt).alignRight }, "tiptap-toolbar-btn"])}" title="Align right" data-v-a5ae91fa>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-align-right",
          class: "size-3.5"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(openPanel) === "link") {
        _push(`<div class="absolute top-full mt-1 left-2 z-10 bg-neutral-900 text-white rounded-lg shadow-xl p-1.5 flex items-center gap-1 min-w-48" data-v-a5ae91fa><input${ssrRenderAttr("value", unref(linkUrl))} placeholder="https://..." class="flex-1 bg-white/10 rounded px-2 py-0.5 text-xs outline-none placeholder:text-white/40" data-v-a5ae91fa><button class="tiptap-toolbar-btn bg-white/20 hover:bg-white/30 text-xs" data-v-a5ae91fa> Apply </button>`);
        if (unref(fmt).link) {
          _push(`<button class="tiptap-toolbar-btn text-xs text-red-400" data-v-a5ae91fa>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-unlink",
            class: "size-3.5"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="${ssrRenderClass([{ active: unref(fmt).bold }, "tiptap-toolbar-btn font-bold"])}" title="Bold" data-v-a5ae91fa> B </button><button class="${ssrRenderClass([{ active: unref(fmt).italic }, "tiptap-toolbar-btn italic"])}" title="Italic" data-v-a5ae91fa><em data-v-a5ae91fa>I</em></button><button class="${ssrRenderClass([{ active: unref(fmt).underline }, "tiptap-toolbar-btn underline text-xs"])}" title="Underline" data-v-a5ae91fa> U </button><button class="${ssrRenderClass([{ active: unref(fmt).strike }, "tiptap-toolbar-btn line-through text-xs"])}" title="Strikethrough" data-v-a5ae91fa> S </button><button class="${ssrRenderClass([{ active: unref(fmt).code }, "tiptap-toolbar-btn font-mono text-xs"])}" title="Code" data-v-a5ae91fa> &lt;/&gt; </button><div class="tiptap-toolbar-divider" data-v-a5ae91fa></div><button class="${ssrRenderClass([{
        active: unref(openPanel) === "heading" || unref(fmt).h1 || unref(fmt).h2 || unref(fmt).h3 || unref(fmt).h4 || unref(fmt).h5 || unref(fmt).h6
      }, "tiptap-toolbar-btn text-xs font-semibold w-7"])}" title="Headings" data-v-a5ae91fa>${ssrInterpolate(unref(activeHeading))}</button><button class="${ssrRenderClass([{
        active: unref(openPanel) === "list" || unref(fmt).bulletList || unref(fmt).orderedList || unref(fmt).blockquote
      }, "tiptap-toolbar-btn text-xs"])}" title="Lists" data-v-a5ae91fa>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: unref(activeList),
        class: "size-3.5"
      }, null, _parent));
      _push(`</button><button class="${ssrRenderClass([{ active: unref(openPanel) === "align" || unref(fmt).alignCenter || unref(fmt).alignRight }, "tiptap-toolbar-btn text-xs"])}" title="Alignment" data-v-a5ae91fa>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: unref(activeAlign),
        class: "size-3.5"
      }, null, _parent));
      _push(`</button><div class="tiptap-toolbar-divider" data-v-a5ae91fa></div><button class="${ssrRenderClass([{ active: unref(openPanel) === "link" || unref(fmt).link }, "tiptap-toolbar-btn text-xs"])}" title="Link" data-v-a5ae91fa>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-link",
        class: "size-3.5"
      }, null, _parent));
      _push(`</button><button class="tiptap-toolbar-btn text-xs" title="Horizontal rule" data-v-a5ae91fa>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-minus",
        class: "size-3.5"
      }, null, _parent));
      _push(`</button><div class="tiptap-toolbar-divider" data-v-a5ae91fa></div><button class="tiptap-toolbar-btn text-xs" title="Undo" data-v-a5ae91fa>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-undo-2",
        class: "size-3.5"
      }, null, _parent));
      _push(`</button><button class="tiptap-toolbar-btn text-xs" title="Redo" data-v-a5ae91fa>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-redo-2",
        class: "size-3.5"
      }, null, _parent));
      _push(`</button></div>`);
      _push(ssrRenderComponent(unref(EditorContent), { editor: unref(editor) }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/editor/RichField.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-a5ae91fa"]]), { __name: "EditorRichField" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CollectionItemModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    item: {},
    collectionId: {},
    collectionType: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["saved"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useModel(__props, "open");
    const { fetcher } = useApi();
    const typeDef = computed(() => getCollectionType(props.collectionType));
    const isEdit = computed(() => !!props.item);
    const hasDetailPage = computed(() => !!typeDef.value?.pageTemplate);
    const activeTab = ref("fields");
    const form = reactive({
      data: {},
      isPublished: true
    });
    const pageBody = ref("");
    const snapshot = ref("");
    function resetForm() {
      const fields = typeDef.value?.fields ?? [];
      const initialData = {};
      for (const field of fields) {
        initialData[field.key] = props.item?.data[field.key] ?? (field.type === "tags" ? [] : field.type === "boolean" ? false : "");
      }
      form.data = initialData;
      form.isPublished = props.item?.isPublished ?? true;
      pageBody.value = props.item?.pageBody ?? "";
      snapshot.value = JSON.stringify(form);
      activeTab.value = "fields";
    }
    watch(open, (val) => {
      if (val) resetForm();
    });
    const isDirty = computed(() => snapshot.value !== JSON.stringify(form));
    const confirmCloseOpen = ref(false);
    function tryClose() {
      if (isDirty.value) {
        confirmCloseOpen.value = true;
      } else {
        open.value = false;
      }
    }
    function forceClose() {
      confirmCloseOpen.value = false;
      open.value = false;
    }
    const tagInputs = reactive({});
    function addTag(fieldKey) {
      const tag = (tagInputs[fieldKey] ?? "").trim();
      if (!tag) return;
      const current = form.data[fieldKey] ?? [];
      if (!current.includes(tag)) {
        form.data[fieldKey] = [...current, tag];
      }
      tagInputs[fieldKey] = "";
    }
    function removeTag(fieldKey, tag) {
      form.data[fieldKey] = (form.data[fieldKey] ?? []).filter((t) => t !== tag);
    }
    function onTagKeydown(e, fieldKey) {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag(fieldKey);
      }
    }
    const imagePickerField = ref(null);
    const imagePickerOpen = computed({
      get: () => imagePickerField.value !== null,
      set: (val) => {
        if (!val) imagePickerField.value = null;
      }
    });
    const saving = ref(false);
    const errorMessage = ref("");
    async function save() {
      saving.value = true;
      errorMessage.value = "";
      try {
        const payload = {
          data: form.data,
          pageBody: pageBody.value || null,
          isPublished: form.isPublished
        };
        let result;
        if (isEdit.value && props.item) {
          result = await fetcher(`/api/collections/${props.collectionId}/items/${props.item.id}`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(payload)
          });
        } else {
          result = await fetcher(`/api/collections/${props.collectionId}/items`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(payload)
          });
        }
        snapshot.value = JSON.stringify(form);
        emit("saved", result.item);
        open.value = false;
      } catch (e) {
        errorMessage.value = e instanceof Error ? e.message : "Failed to save item.";
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$6;
      const _component_UTabs = _sfc_main$7;
      const _component_EditorRichField = __nuxt_component_2;
      const _component_UInput = _sfc_main$4;
      const _component_UButton = _sfc_main$8;
      const _component_UBadge = _sfc_main$9;
      const _component_UIcon = _sfc_main$d;
      const _component_UFormField = _sfc_main$a;
      const _component_USwitch = _sfc_main$2$1;
      const _component_UTextarea = _sfc_main$1$1;
      const _component_UAlert = _sfc_main$5;
      const _component_AdminMediaPickerModal = __nuxt_component_11;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: open.value,
        title: unref(isEdit) ? "Edit item" : "New item",
        ui: { content: "max-w-lg" },
        "onUpdate:open": (val) => {
          if (!val) tryClose();
        }
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(typeDef)) {
              _push2(`<div class="space-y-4"${_scopeId}>`);
              if (unref(hasDetailPage)) {
                _push2(ssrRenderComponent(_component_UTabs, {
                  items: [
                    { label: "Fields", value: "fields" },
                    { label: "Page", value: "page" }
                  ],
                  "model-value": unref(activeTab),
                  "onUpdate:modelValue": ($event) => activeTab.value = $event
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(activeTab) === "page") {
                _push2(ssrRenderComponent(_component_EditorRichField, {
                  modelValue: unref(pageBody),
                  "onUpdate:modelValue": ($event) => isRef(pageBody) ? pageBody.value = $event : null,
                  placeholder: "Write the page content here…"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(activeTab) === "fields") {
                _push2(`<!--[-->`);
                ssrRenderList(unref(typeDef).fields, (field) => {
                  _push2(`<!--[-->`);
                  if (field.type === "tags") {
                    _push2(`<div${_scopeId}><p class="text-sm font-medium mb-2"${_scopeId}>${ssrInterpolate(field.label)}</p><div class="flex gap-2"${_scopeId}>`);
                    _push2(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(tagInputs)[field.key],
                      "onUpdate:modelValue": ($event) => unref(tagInputs)[field.key] = $event,
                      placeholder: field.placeholder ?? "Add a tag",
                      class: "flex-1",
                      onKeydown: ($event) => onTagKeydown($event, field.key)
                    }, null, _parent2, _scopeId));
                    _push2(ssrRenderComponent(_component_UButton, {
                      variant: "outline",
                      icon: "i-lucide-plus",
                      "aria-label": "Add tag",
                      onClick: ($event) => addTag(field.key)
                    }, null, _parent2, _scopeId));
                    _push2(`</div><p class="text-xs text-muted mt-1"${_scopeId}> Prefix a tag with <code${_scopeId}>::</code> (e.g. <code${_scopeId}>::featured</code>) to use it for filtering only — it won&#39;t be shown publicly. </p>`);
                    if (unref(form).data[field.key]?.length) {
                      _push2(`<div class="flex flex-wrap gap-2 mt-2"${_scopeId}><!--[-->`);
                      ssrRenderList(unref(form).data[field.key], (tag) => {
                        _push2(ssrRenderComponent(_component_UBadge, {
                          key: tag,
                          variant: "soft",
                          class: "gap-1 cursor-default"
                        }, {
                          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                            if (_push3) {
                              _push3(`${ssrInterpolate(tag)} <button type="button" class="ml-1 flex justify-center opacity-60 hover:opacity-100"${ssrRenderAttr("aria-label", `Remove tag ${tag}`)}${_scopeId2}>`);
                              _push3(ssrRenderComponent(_component_UIcon, {
                                name: "i-lucide-x",
                                class: "size-3"
                              }, null, _parent3, _scopeId2));
                              _push3(`</button>`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(tag) + " ", 1),
                                createVNode("button", {
                                  type: "button",
                                  class: "ml-1 flex justify-center opacity-60 hover:opacity-100",
                                  "aria-label": `Remove tag ${tag}`,
                                  onClick: ($event) => removeTag(field.key, tag)
                                }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-lucide-x",
                                    class: "size-3"
                                  })
                                ], 8, ["aria-label", "onClick"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent2, _scopeId));
                      });
                      _push2(`<!--]--></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  } else if (field.type === "boolean") {
                    _push2(ssrRenderComponent(_component_UFormField, {
                      label: field.label,
                      name: field.key
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(_component_USwitch, {
                            modelValue: unref(form).data[field.key],
                            "onUpdate:modelValue": ($event) => unref(form).data[field.key] = $event
                          }, null, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode(_component_USwitch, {
                              modelValue: unref(form).data[field.key],
                              "onUpdate:modelValue": ($event) => unref(form).data[field.key] = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else if (field.type === "textarea") {
                    _push2(ssrRenderComponent(_component_UFormField, {
                      label: field.label,
                      name: field.key
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(_component_UTextarea, {
                            modelValue: unref(form).data[field.key],
                            "onUpdate:modelValue": ($event) => unref(form).data[field.key] = $event,
                            placeholder: field.placeholder,
                            class: "w-full",
                            rows: 3
                          }, null, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode(_component_UTextarea, {
                              modelValue: unref(form).data[field.key],
                              "onUpdate:modelValue": ($event) => unref(form).data[field.key] = $event,
                              placeholder: field.placeholder,
                              class: "w-full",
                              rows: 3
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else if (field.type === "image") {
                    _push2(ssrRenderComponent(_component_UFormField, {
                      label: field.label,
                      name: field.key
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<div class="flex gap-3 items-start"${_scopeId2}><div class="relative w-24 h-16 rounded-md overflow-hidden border border-default bg-muted flex items-center justify-center cursor-pointer hover:border-primary transition-colors shrink-0"${_scopeId2}>`);
                          if (unref(form).data[field.key]) {
                            _push3(`<img${ssrRenderAttr("src", unref(form).data[field.key])} alt="" class="w-full h-full object-cover"${_scopeId2}>`);
                          } else {
                            _push3(ssrRenderComponent(_component_UIcon, {
                              name: "i-lucide-image",
                              class: "text-muted size-5"
                            }, null, _parent3, _scopeId2));
                          }
                          if (unref(form).data[field.key]) {
                            _push3(ssrRenderComponent(_component_UButton, {
                              icon: "i-lucide-x",
                              color: "neutral",
                              variant: "solid",
                              size: "xs",
                              class: "absolute top-0.5 right-0.5 opacity-80 hover:opacity-100",
                              "aria-label": "Remove image",
                              onClick: ($event) => unref(form).data[field.key] = ""
                            }, null, _parent3, _scopeId2));
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div>`);
                          _push3(ssrRenderComponent(_component_UButton, {
                            color: "neutral",
                            variant: "outline",
                            size: "xs",
                            onClick: ($event) => imagePickerField.value = field.key
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`${ssrInterpolate(unref(form).data[field.key] ? "Change image" : "Choose image")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(form).data[field.key] ? "Change image" : "Choose image"), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex gap-3 items-start" }, [
                              createVNode("div", {
                                class: "relative w-24 h-16 rounded-md overflow-hidden border border-default bg-muted flex items-center justify-center cursor-pointer hover:border-primary transition-colors shrink-0",
                                onClick: ($event) => imagePickerField.value = field.key
                              }, [
                                unref(form).data[field.key] ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: unref(form).data[field.key],
                                  alt: "",
                                  class: "w-full h-full object-cover"
                                }, null, 8, ["src"])) : (openBlock(), createBlock(_component_UIcon, {
                                  key: 1,
                                  name: "i-lucide-image",
                                  class: "text-muted size-5"
                                })),
                                unref(form).data[field.key] ? (openBlock(), createBlock(_component_UButton, {
                                  key: 2,
                                  icon: "i-lucide-x",
                                  color: "neutral",
                                  variant: "solid",
                                  size: "xs",
                                  class: "absolute top-0.5 right-0.5 opacity-80 hover:opacity-100",
                                  "aria-label": "Remove image",
                                  onClick: withModifiers(($event) => unref(form).data[field.key] = "", ["stop"])
                                }, null, 8, ["onClick"])) : createCommentVNode("", true)
                              ], 8, ["onClick"]),
                              createVNode(_component_UButton, {
                                color: "neutral",
                                variant: "outline",
                                size: "xs",
                                onClick: ($event) => imagePickerField.value = field.key
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(form).data[field.key] ? "Change image" : "Choose image"), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else {
                    _push2(ssrRenderComponent(_component_UFormField, {
                      label: field.label,
                      name: field.key
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(_component_UInput, {
                            modelValue: unref(form).data[field.key],
                            "onUpdate:modelValue": ($event) => unref(form).data[field.key] = $event,
                            placeholder: field.placeholder,
                            type: field.type === "url" ? "url" : field.type === "number" ? "number" : "text",
                            class: "w-full"
                          }, null, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              modelValue: unref(form).data[field.key],
                              "onUpdate:modelValue": ($event) => unref(form).data[field.key] = $event,
                              placeholder: field.placeholder,
                              type: field.type === "url" ? "url" : field.type === "number" ? "number" : "text",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "type"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(errorMessage)) {
                _push2(ssrRenderComponent(_component_UAlert, {
                  color: "error",
                  variant: "soft",
                  description: unref(errorMessage)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<p class="text-sm text-muted"${_scopeId}>Unknown collection type.</p>`);
            }
          } else {
            return [
              unref(typeDef) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-4"
              }, [
                unref(hasDetailPage) ? (openBlock(), createBlock(_component_UTabs, {
                  key: 0,
                  items: [
                    { label: "Fields", value: "fields" },
                    { label: "Page", value: "page" }
                  ],
                  "model-value": unref(activeTab),
                  "onUpdate:modelValue": ($event) => activeTab.value = $event
                }, null, 8, ["model-value", "onUpdate:modelValue"])) : createCommentVNode("", true),
                unref(activeTab) === "page" ? (openBlock(), createBlock(_component_EditorRichField, {
                  key: 1,
                  modelValue: unref(pageBody),
                  "onUpdate:modelValue": ($event) => isRef(pageBody) ? pageBody.value = $event : null,
                  placeholder: "Write the page content here…"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                unref(activeTab) === "fields" ? (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(typeDef).fields, (field) => {
                  return openBlock(), createBlock(Fragment, {
                    key: field.key
                  }, [
                    field.type === "tags" ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("p", { class: "text-sm font-medium mb-2" }, toDisplayString(field.label), 1),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(_component_UInput, {
                          modelValue: unref(tagInputs)[field.key],
                          "onUpdate:modelValue": ($event) => unref(tagInputs)[field.key] = $event,
                          placeholder: field.placeholder ?? "Add a tag",
                          class: "flex-1",
                          onKeydown: ($event) => onTagKeydown($event, field.key)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "onKeydown"]),
                        createVNode(_component_UButton, {
                          variant: "outline",
                          icon: "i-lucide-plus",
                          "aria-label": "Add tag",
                          onClick: ($event) => addTag(field.key)
                        }, null, 8, ["onClick"])
                      ]),
                      createVNode("p", { class: "text-xs text-muted mt-1" }, [
                        createTextVNode(" Prefix a tag with "),
                        createVNode("code", null, "::"),
                        createTextVNode(" (e.g. "),
                        createVNode("code", null, "::featured"),
                        createTextVNode(") to use it for filtering only — it won't be shown publicly. ")
                      ]),
                      unref(form).data[field.key]?.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-wrap gap-2 mt-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).data[field.key], (tag) => {
                          return openBlock(), createBlock(_component_UBadge, {
                            key: tag,
                            variant: "soft",
                            class: "gap-1 cursor-default"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(tag) + " ", 1),
                              createVNode("button", {
                                type: "button",
                                class: "ml-1 flex justify-center opacity-60 hover:opacity-100",
                                "aria-label": `Remove tag ${tag}`,
                                onClick: ($event) => removeTag(field.key, tag)
                              }, [
                                createVNode(_component_UIcon, {
                                  name: "i-lucide-x",
                                  class: "size-3"
                                })
                              ], 8, ["aria-label", "onClick"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ])) : field.type === "boolean" ? (openBlock(), createBlock(_component_UFormField, {
                      key: 1,
                      label: field.label,
                      name: field.key
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_USwitch, {
                          modelValue: unref(form).data[field.key],
                          "onUpdate:modelValue": ($event) => unref(form).data[field.key] = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 2
                    }, 1032, ["label", "name"])) : field.type === "textarea" ? (openBlock(), createBlock(_component_UFormField, {
                      key: 2,
                      label: field.label,
                      name: field.key
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UTextarea, {
                          modelValue: unref(form).data[field.key],
                          "onUpdate:modelValue": ($event) => unref(form).data[field.key] = $event,
                          placeholder: field.placeholder,
                          class: "w-full",
                          rows: 3
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                      ]),
                      _: 2
                    }, 1032, ["label", "name"])) : field.type === "image" ? (openBlock(), createBlock(_component_UFormField, {
                      key: 3,
                      label: field.label,
                      name: field.key
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex gap-3 items-start" }, [
                          createVNode("div", {
                            class: "relative w-24 h-16 rounded-md overflow-hidden border border-default bg-muted flex items-center justify-center cursor-pointer hover:border-primary transition-colors shrink-0",
                            onClick: ($event) => imagePickerField.value = field.key
                          }, [
                            unref(form).data[field.key] ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: unref(form).data[field.key],
                              alt: "",
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src"])) : (openBlock(), createBlock(_component_UIcon, {
                              key: 1,
                              name: "i-lucide-image",
                              class: "text-muted size-5"
                            })),
                            unref(form).data[field.key] ? (openBlock(), createBlock(_component_UButton, {
                              key: 2,
                              icon: "i-lucide-x",
                              color: "neutral",
                              variant: "solid",
                              size: "xs",
                              class: "absolute top-0.5 right-0.5 opacity-80 hover:opacity-100",
                              "aria-label": "Remove image",
                              onClick: withModifiers(($event) => unref(form).data[field.key] = "", ["stop"])
                            }, null, 8, ["onClick"])) : createCommentVNode("", true)
                          ], 8, ["onClick"]),
                          createVNode(_component_UButton, {
                            color: "neutral",
                            variant: "outline",
                            size: "xs",
                            onClick: ($event) => imagePickerField.value = field.key
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(form).data[field.key] ? "Change image" : "Choose image"), 1)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["label", "name"])) : (openBlock(), createBlock(_component_UFormField, {
                      key: 4,
                      label: field.label,
                      name: field.key
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(form).data[field.key],
                          "onUpdate:modelValue": ($event) => unref(form).data[field.key] = $event,
                          placeholder: field.placeholder,
                          type: field.type === "url" ? "url" : field.type === "number" ? "number" : "text",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "type"])
                      ]),
                      _: 2
                    }, 1032, ["label", "name"]))
                  ], 64);
                }), 128)) : createCommentVNode("", true),
                unref(errorMessage) ? (openBlock(), createBlock(_component_UAlert, {
                  key: 3,
                  color: "error",
                  variant: "soft",
                  description: unref(errorMessage)
                }, null, 8, ["description"])) : createCommentVNode("", true)
              ])) : (openBlock(), createBlock("p", {
                key: 1,
                class: "text-sm text-muted"
              }, "Unknown collection type."))
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_USwitch, {
              modelValue: unref(form).isPublished,
              "onUpdate:modelValue": ($event) => unref(form).isPublished = $event,
              label: "Published"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              onClick: tryClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              loading: unref(saving),
              onClick: save
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Save`);
                } else {
                  return [
                    createTextVNode("Save")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between w-full" }, [
                createVNode(_component_USwitch, {
                  modelValue: unref(form).isPublished,
                  "onUpdate:modelValue": ($event) => unref(form).isPublished = $event,
                  label: "Published"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("div", { class: "flex gap-2" }, [
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    onClick: tryClose
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Cancel")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UButton, {
                    loading: unref(saving),
                    onClick: save
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Save")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        open: unref(confirmCloseOpen),
        "onUpdate:open": ($event) => isRef(confirmCloseOpen) ? confirmCloseOpen.value = $event : null,
        title: "Unsaved changes",
        description: "You have unsaved changes. Are you sure you want to discard them?"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-2 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              onClick: ($event) => confirmCloseOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Keep editing`);
                } else {
                  return [
                    createTextVNode("Keep editing")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "error",
              onClick: forceClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Discard changes`);
                } else {
                  return [
                    createTextVNode("Discard changes")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-end gap-2 w-full" }, [
                createVNode(_component_UButton, {
                  variant: "ghost",
                  onClick: ($event) => confirmCloseOpen.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("Keep editing")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_UButton, {
                  color: "error",
                  onClick: forceClose
                }, {
                  default: withCtx(() => [
                    createTextVNode("Discard changes")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminMediaPickerModal, {
        open: unref(imagePickerOpen),
        "onUpdate:open": ($event) => isRef(imagePickerOpen) ? imagePickerOpen.value = $event : null,
        "images-only": "",
        "selected-url": unref(imagePickerField) ? unref(form).data[unref(imagePickerField)] : null,
        onSelect: (url) => {
          if (unref(imagePickerField)) {
            unref(form).data[unref(imagePickerField)] = url;
            imagePickerField.value = null;
          }
        }
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/collections/CollectionItemModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$1, { __name: "AdminCollectionsCollectionItemModal" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const collectionId = route.params.id;
    const { fetcher } = useApi();
    const collection = ref(null);
    const typeDef = computed(
      () => collection.value ? getCollectionType(collection.value.type) : null
    );
    const items = ref([]);
    const loadingItems = ref(true);
    const fetchError = ref("");
    const searchQuery = ref("");
    const filteredItems = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (!q) return items.value;
      const fields = typeDef.value?.fields ?? [];
      return items.value.filter(
        (item) => fields.some((field) => {
          const val = item.data[field.key];
          if (Array.isArray(val)) return val.some((v) => String(v).toLowerCase().includes(q));
          return String(val ?? "").toLowerCase().includes(q);
        })
      );
    });
    function itemTitle(item) {
      const firstField = typeDef.value?.fields[0];
      if (!firstField) return "Untitled";
      return item.data[firstField.key] || "Untitled";
    }
    const modalOpen = ref(false);
    const selectedItem = ref(null);
    function openCreate() {
      selectedItem.value = null;
      modalOpen.value = true;
    }
    function openEdit(item) {
      selectedItem.value = item;
      modalOpen.value = true;
    }
    function onSaved(saved) {
      const idx = items.value.findIndex((i) => i.id === saved.id);
      if (idx >= 0) {
        items.value[idx] = saved;
      } else {
        items.value.unshift(saved);
      }
    }
    async function onReorder() {
      await Promise.all(
        items.value.map(
          (item, index) => fetcher(`/api/collections/${collectionId}/items/${item.id}`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({ sortOrder: index })
          })
        )
      );
    }
    const togglingId = ref(null);
    async function togglePublished(item) {
      if (togglingId.value) return;
      togglingId.value = item.id;
      try {
        const data = await fetcher(`/api/collections/${collectionId}/items/${item.id}`, {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ isPublished: !item.isPublished })
        });
        const idx = items.value.findIndex((i) => i.id === item.id);
        if (idx >= 0) items.value[idx] = data.item;
      } finally {
        togglingId.value = null;
      }
    }
    const deleteModalOpen = ref(false);
    const itemToDelete = ref(null);
    const deleting = ref(false);
    const deleteError = ref("");
    function openDelete(item) {
      itemToDelete.value = item;
      deleteError.value = "";
      deleteModalOpen.value = true;
    }
    async function confirmDelete() {
      if (!itemToDelete.value) return;
      deleting.value = true;
      deleteError.value = "";
      try {
        await fetcher(`/api/collections/${collectionId}/items/${itemToDelete.value.id}`, {
          method: "DELETE",
          credentials: "include"
        });
        items.value = items.value.filter((i) => i.id !== itemToDelete.value.id);
        deleteModalOpen.value = false;
        itemToDelete.value = null;
      } catch (e) {
        deleteError.value = e instanceof Error ? e.message : "Failed to delete item.";
      } finally {
        deleting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminLayoutPageStructure = __nuxt_component_0;
      const _component_UInput = _sfc_main$4;
      const _component_UButton = _sfc_main$8;
      const _component_UAlert = _sfc_main$5;
      const _component_USkeleton = _sfc_main$3;
      const _component_UIcon = _sfc_main$d;
      const _component_AdminCollectionsCollectionItemModal = __nuxt_component_6;
      const _component_AdminConfirmModal = __nuxt_component_4;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AdminLayoutPageStructure, {
        title: unref(collection)?.name ?? "Collection",
        description: "Manage items in this collection."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-lg grid gap-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(searchQuery),
              "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
              icon: "i-lucide-search",
              placeholder: `Search ${unref(typeDef)?.label.toLowerCase() ?? "items"}`,
              class: "flex-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-lucide-plus",
              onClick: openCreate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`New item`);
                } else {
                  return [
                    createTextVNode("New item")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(fetchError)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "error",
                variant: "soft",
                description: unref(fetchError)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(loadingItems)) {
              _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(3, (i) => {
                _push2(ssrRenderComponent(_component_USkeleton, {
                  key: i,
                  class: "h-12 w-full rounded-md"
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else if (!unref(filteredItems).length) {
              _push2(`<div class="py-12 text-center text-muted text-sm"${_scopeId}>`);
              if (unref(searchQuery)) {
                _push2(`<!--[-->No items match your search.<!--]-->`);
              } else {
                _push2(`<!--[-->No items yet.<!--]-->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="divide-y divide-default border border-default rounded-md"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(VueDraggable), {
                modelValue: unref(items),
                "onUpdate:modelValue": ($event) => isRef(items) ? items.value = $event : null,
                handle: ".collection-item-drag-handle",
                group: { name: `collection-items-${unref(collectionId)}`, pull: false, put: false },
                onEnd: onReorder
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(filteredItems), (item) => {
                      _push3(`<div class="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-lucide-grip-vertical",
                        class: "collection-item-drag-handle text-muted-foreground size-4 shrink-0 cursor-grab active:cursor-grabbing"
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="flex-1 min-w-0"${_scopeId2}><p class="font-medium truncate"${_scopeId2}>${ssrInterpolate(itemTitle(item))}</p></div><div class="flex items-center gap-1 shrink-0"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UButton, {
                        icon: item.isPublished ? "i-lucide-eye" : "i-lucide-eye-off",
                        size: "xs",
                        variant: "ghost",
                        color: item.isPublished ? "primary" : "neutral",
                        loading: unref(togglingId) === item.id,
                        "aria-label": item.isPublished ? "Unpublish item" : "Publish item",
                        onClick: ($event) => togglePublished(item)
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UButton, {
                        icon: "i-lucide-edit",
                        size: "xs",
                        variant: "ghost",
                        "aria-label": "Edit item",
                        onClick: ($event) => openEdit(item)
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UButton, {
                        icon: "i-lucide-trash-2",
                        size: "xs",
                        variant: "ghost",
                        color: "error",
                        "aria-label": "Delete item",
                        onClick: ($event) => openDelete(item)
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredItems), (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
                        }, [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-grip-vertical",
                            class: "collection-item-drag-handle text-muted-foreground size-4 shrink-0 cursor-grab active:cursor-grabbing"
                          }),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "font-medium truncate" }, toDisplayString(itemTitle(item)), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-1 shrink-0" }, [
                            createVNode(_component_UButton, {
                              icon: item.isPublished ? "i-lucide-eye" : "i-lucide-eye-off",
                              size: "xs",
                              variant: "ghost",
                              color: item.isPublished ? "primary" : "neutral",
                              loading: unref(togglingId) === item.id,
                              "aria-label": item.isPublished ? "Unpublish item" : "Publish item",
                              onClick: ($event) => togglePublished(item)
                            }, null, 8, ["icon", "color", "loading", "aria-label", "onClick"]),
                            createVNode(_component_UButton, {
                              icon: "i-lucide-edit",
                              size: "xs",
                              variant: "ghost",
                              "aria-label": "Edit item",
                              onClick: ($event) => openEdit(item)
                            }, null, 8, ["onClick"]),
                            createVNode(_component_UButton, {
                              icon: "i-lucide-trash-2",
                              size: "xs",
                              variant: "ghost",
                              color: "error",
                              "aria-label": "Delete item",
                              onClick: ($event) => openDelete(item)
                            }, null, 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-lg grid gap-4" }, [
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode(_component_UInput, {
                    modelValue: unref(searchQuery),
                    "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                    icon: "i-lucide-search",
                    placeholder: `Search ${unref(typeDef)?.label.toLowerCase() ?? "items"}`,
                    class: "flex-1"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                  createVNode(_component_UButton, {
                    icon: "i-lucide-plus",
                    onClick: openCreate
                  }, {
                    default: withCtx(() => [
                      createTextVNode("New item")
                    ]),
                    _: 1
                  })
                ]),
                unref(fetchError) ? (openBlock(), createBlock(_component_UAlert, {
                  key: 0,
                  color: "error",
                  variant: "soft",
                  description: unref(fetchError)
                }, null, 8, ["description"])) : createCommentVNode("", true),
                unref(loadingItems) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-2"
                }, [
                  (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                    return createVNode(_component_USkeleton, {
                      key: i,
                      class: "h-12 w-full rounded-md"
                    });
                  }), 64))
                ])) : !unref(filteredItems).length ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "py-12 text-center text-muted text-sm"
                }, [
                  unref(searchQuery) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createTextVNode("No items match your search.")
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createTextVNode("No items yet.")
                  ], 64))
                ])) : (openBlock(), createBlock("div", {
                  key: 3,
                  class: "divide-y divide-default border border-default rounded-md"
                }, [
                  createVNode(unref(VueDraggable), {
                    modelValue: unref(items),
                    "onUpdate:modelValue": ($event) => isRef(items) ? items.value = $event : null,
                    handle: ".collection-item-drag-handle",
                    group: { name: `collection-items-${unref(collectionId)}`, pull: false, put: false },
                    onEnd: onReorder
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredItems), (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
                        }, [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-grip-vertical",
                            class: "collection-item-drag-handle text-muted-foreground size-4 shrink-0 cursor-grab active:cursor-grabbing"
                          }),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "font-medium truncate" }, toDisplayString(itemTitle(item)), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-1 shrink-0" }, [
                            createVNode(_component_UButton, {
                              icon: item.isPublished ? "i-lucide-eye" : "i-lucide-eye-off",
                              size: "xs",
                              variant: "ghost",
                              color: item.isPublished ? "primary" : "neutral",
                              loading: unref(togglingId) === item.id,
                              "aria-label": item.isPublished ? "Unpublish item" : "Publish item",
                              onClick: ($event) => togglePublished(item)
                            }, null, 8, ["icon", "color", "loading", "aria-label", "onClick"]),
                            createVNode(_component_UButton, {
                              icon: "i-lucide-edit",
                              size: "xs",
                              variant: "ghost",
                              "aria-label": "Edit item",
                              onClick: ($event) => openEdit(item)
                            }, null, 8, ["onClick"]),
                            createVNode(_component_UButton, {
                              icon: "i-lucide-trash-2",
                              size: "xs",
                              variant: "ghost",
                              color: "error",
                              "aria-label": "Delete item",
                              onClick: ($event) => openDelete(item)
                            }, null, 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "group"])
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(collection)) {
        _push(ssrRenderComponent(_component_AdminCollectionsCollectionItemModal, {
          open: unref(modalOpen),
          "onUpdate:open": ($event) => isRef(modalOpen) ? modalOpen.value = $event : null,
          item: unref(selectedItem),
          "collection-id": unref(collectionId),
          "collection-type": unref(collection).type,
          onSaved
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_AdminConfirmModal, {
        open: unref(deleteModalOpen),
        "onUpdate:open": ($event) => isRef(deleteModalOpen) ? deleteModalOpen.value = $event : null,
        title: "Delete item",
        description: `Delete "${unref(itemToDelete) ? itemTitle(unref(itemToDelete)) : "this item"}"? This cannot be undone.`,
        "confirm-label": "Delete",
        loading: unref(deleting),
        "error-message": unref(deleteError),
        onConfirm: confirmDelete,
        onCancel: ($event) => deleteModalOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/collections/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BMC-uA6m.mjs.map
