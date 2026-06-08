import { defineComponent, ref, computed, unref, useSlots, mergeProps, withCtx, openBlock, createBlock, renderSlot, createTextVNode, toDisplayString, createCommentVNode, Fragment, renderList, createVNode, isRef, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { a8 as useRoute, U as useComponentProps, N as useAppConfig, M as tv, b as Primitive, f as _sfc_main$8, d as _export_sfc, e as _sfc_main$d } from './server.mjs';
import { u as usePrefix } from './usePrefix-DEbZTxVe.mjs';
import { _ as _sfc_main$5 } from './Container-CXQFSuFJ.mjs';
import { _ as _sfc_main$4 } from './Alert-Nv5RlKkm.mjs';
import { VueDraggable } from 'vue-draggable-plus';
import { _ as _sfc_main$6 } from './Card-uQKN-I-u.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
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
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'perfect-debounce';
import '@vueuse/core';
import '@vueuse/shared';
import 'tailwind-variants';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const theme = {
  "slots": {
    "root": "relative isolate",
    "container": "flex flex-col lg:grid py-24 sm:py-32 lg:py-40 gap-16 sm:gap-y-24",
    "wrapper": "",
    "header": "",
    "headline": "mb-4",
    "title": "text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted",
    "description": "text-lg sm:text-xl/8 text-muted",
    "body": "mt-10",
    "footer": "mt-10",
    "links": "flex flex-wrap gap-x-6 gap-y-3"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "container": "lg:grid-cols-2 lg:items-center",
        "description": "text-pretty"
      },
      "vertical": {
        "container": "",
        "headline": "justify-center",
        "wrapper": "text-center",
        "description": "text-balance",
        "links": "justify-center"
      }
    },
    "reverse": {
      "true": {
        "wrapper": "order-last"
      }
    },
    "headline": {
      "true": {
        "headline": "font-semibold text-primary flex items-center gap-1.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-6"
      }
    }
  }
};
const _sfc_main$3 = {
  __name: "UPageHero",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    headline: { type: String, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    links: { type: Array, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    reverse: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const _props = __props;
    const slots = useSlots();
    const props = useComponentProps("pageHero", _props);
    const appConfig = useAppConfig();
    const prefix = usePrefix();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.pageHero || {} })({
      orientation: props.orientation,
      reverse: props.reverse,
      title: !!props.title || !!slots.title
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: unref(props).as,
        "data-orientation": unref(props).orientation,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "top", {}, null, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent(_sfc_main$5, {
              "data-slot": "container",
              class: ui.value.container({ class: unref(props).ui?.container })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!!slots.header || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description) || !!slots.body || !!slots.footer || (unref(props).links?.length || !!slots.links)) {
                    _push3(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))}"${_scopeId2}>`);
                    if (!!slots.header || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description)) {
                      _push3(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(props).ui?.header }))}"${_scopeId2}>`);
                      ssrRenderSlot(_ctx.$slots, "header", {}, () => {
                        if (unref(props).headline || !!slots.headline) {
                          _push3(`<div data-slot="headline" class="${ssrRenderClass(ui.value.headline({ class: unref(props).ui?.headline, headline: !slots.headline }))}"${_scopeId2}>`);
                          ssrRenderSlot(_ctx.$slots, "headline", {}, () => {
                            _push3(`${ssrInterpolate(unref(props).headline)}`);
                          }, _push3, _parent3, _scopeId2);
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (unref(props).title || !!slots.title) {
                          _push3(`<h1 data-slot="title" class="${ssrRenderClass(ui.value.title({ class: unref(props).ui?.title }))}"${_scopeId2}>`);
                          ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                            _push3(`${ssrInterpolate(unref(props).title)}`);
                          }, _push3, _parent3, _scopeId2);
                          _push3(`</h1>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (unref(props).description || !!slots.description) {
                          _push3(`<div data-slot="description" class="${ssrRenderClass(ui.value.description({ class: unref(props).ui?.description }))}"${_scopeId2}>`);
                          ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                            _push3(`${ssrInterpolate(unref(props).description)}`);
                          }, _push3, _parent3, _scopeId2);
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                      }, _push3, _parent3, _scopeId2);
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (!!slots.body) {
                      _push3(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(props).ui?.body }))}"${_scopeId2}>`);
                      ssrRenderSlot(_ctx.$slots, "body", {}, null, _push3, _parent3, _scopeId2);
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (!!slots.footer || (unref(props).links?.length || !!slots.links)) {
                      _push3(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(props).ui?.footer }))}"${_scopeId2}>`);
                      ssrRenderSlot(_ctx.$slots, "footer", {}, () => {
                        if (unref(props).links?.length || !!slots.links) {
                          _push3(`<div data-slot="links" class="${ssrRenderClass(ui.value.links({ class: unref(props).ui?.links }))}"${_scopeId2}>`);
                          ssrRenderSlot(_ctx.$slots, "links", {}, () => {
                            _push3(`<!--[-->`);
                            ssrRenderList(unref(props).links, (link, index) => {
                              _push3(ssrRenderComponent(_sfc_main$8, mergeProps({
                                key: index,
                                size: "xl"
                              }, { ref_for: true }, link), null, _parent3, _scopeId2));
                            });
                            _push3(`<!--]-->`);
                          }, _push3, _parent3, _scopeId2);
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                      }, _push3, _parent3, _scopeId2);
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!!slots.default) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  } else if (unref(props).orientation === "horizontal") {
                    _push3(`<div class="${ssrRenderClass(unref(prefix)("hidden lg:block"))}"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    !!slots.header || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description) || !!slots.body || !!slots.footer || (unref(props).links?.length || !!slots.links) ? (openBlock(), createBlock("div", {
                      key: 0,
                      "data-slot": "wrapper",
                      class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
                    }, [
                      !!slots.header || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description) ? (openBlock(), createBlock("div", {
                        key: 0,
                        "data-slot": "header",
                        class: ui.value.header({ class: unref(props).ui?.header })
                      }, [
                        renderSlot(_ctx.$slots, "header", {}, () => [
                          unref(props).headline || !!slots.headline ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "headline",
                            class: ui.value.headline({ class: unref(props).ui?.headline, headline: !slots.headline })
                          }, [
                            renderSlot(_ctx.$slots, "headline", {}, () => [
                              createTextVNode(toDisplayString(unref(props).headline), 1)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          unref(props).title || !!slots.title ? (openBlock(), createBlock("h1", {
                            key: 1,
                            "data-slot": "title",
                            class: ui.value.title({ class: unref(props).ui?.title })
                          }, [
                            renderSlot(_ctx.$slots, "title", {}, () => [
                              createTextVNode(toDisplayString(unref(props).title), 1)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
                            key: 2,
                            "data-slot": "description",
                            class: ui.value.description({ class: unref(props).ui?.description })
                          }, [
                            renderSlot(_ctx.$slots, "description", {}, () => [
                              createTextVNode(toDisplayString(unref(props).description), 1)
                            ])
                          ], 2)) : createCommentVNode("", true)
                        ])
                      ], 2)) : createCommentVNode("", true),
                      !!slots.body ? (openBlock(), createBlock("div", {
                        key: 1,
                        "data-slot": "body",
                        class: ui.value.body({ class: unref(props).ui?.body })
                      }, [
                        renderSlot(_ctx.$slots, "body")
                      ], 2)) : createCommentVNode("", true),
                      !!slots.footer || (unref(props).links?.length || !!slots.links) ? (openBlock(), createBlock("div", {
                        key: 2,
                        "data-slot": "footer",
                        class: ui.value.footer({ class: unref(props).ui?.footer })
                      }, [
                        renderSlot(_ctx.$slots, "footer", {}, () => [
                          unref(props).links?.length || !!slots.links ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "links",
                            class: ui.value.links({ class: unref(props).ui?.links })
                          }, [
                            renderSlot(_ctx.$slots, "links", {}, () => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(props).links, (link, index) => {
                                return openBlock(), createBlock(_sfc_main$8, mergeProps({
                                  key: index,
                                  size: "xl"
                                }, { ref_for: true }, link), null, 16);
                              }), 128))
                            ])
                          ], 2)) : createCommentVNode("", true)
                        ])
                      ], 2)) : createCommentVNode("", true)
                    ], 2)) : createCommentVNode("", true),
                    !!slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : unref(props).orientation === "horizontal" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: unref(prefix)("hidden lg:block")
                    }, null, 2)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "top"),
              createVNode(_sfc_main$5, {
                "data-slot": "container",
                class: ui.value.container({ class: unref(props).ui?.container })
              }, {
                default: withCtx(() => [
                  !!slots.header || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description) || !!slots.body || !!slots.footer || (unref(props).links?.length || !!slots.links) ? (openBlock(), createBlock("div", {
                    key: 0,
                    "data-slot": "wrapper",
                    class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
                  }, [
                    !!slots.header || (unref(props).headline || !!slots.headline) || (unref(props).title || !!slots.title) || (unref(props).description || !!slots.description) ? (openBlock(), createBlock("div", {
                      key: 0,
                      "data-slot": "header",
                      class: ui.value.header({ class: unref(props).ui?.header })
                    }, [
                      renderSlot(_ctx.$slots, "header", {}, () => [
                        unref(props).headline || !!slots.headline ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "headline",
                          class: ui.value.headline({ class: unref(props).ui?.headline, headline: !slots.headline })
                        }, [
                          renderSlot(_ctx.$slots, "headline", {}, () => [
                            createTextVNode(toDisplayString(unref(props).headline), 1)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        unref(props).title || !!slots.title ? (openBlock(), createBlock("h1", {
                          key: 1,
                          "data-slot": "title",
                          class: ui.value.title({ class: unref(props).ui?.title })
                        }, [
                          renderSlot(_ctx.$slots, "title", {}, () => [
                            createTextVNode(toDisplayString(unref(props).title), 1)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
                          key: 2,
                          "data-slot": "description",
                          class: ui.value.description({ class: unref(props).ui?.description })
                        }, [
                          renderSlot(_ctx.$slots, "description", {}, () => [
                            createTextVNode(toDisplayString(unref(props).description), 1)
                          ])
                        ], 2)) : createCommentVNode("", true)
                      ])
                    ], 2)) : createCommentVNode("", true),
                    !!slots.body ? (openBlock(), createBlock("div", {
                      key: 1,
                      "data-slot": "body",
                      class: ui.value.body({ class: unref(props).ui?.body })
                    }, [
                      renderSlot(_ctx.$slots, "body")
                    ], 2)) : createCommentVNode("", true),
                    !!slots.footer || (unref(props).links?.length || !!slots.links) ? (openBlock(), createBlock("div", {
                      key: 2,
                      "data-slot": "footer",
                      class: ui.value.footer({ class: unref(props).ui?.footer })
                    }, [
                      renderSlot(_ctx.$slots, "footer", {}, () => [
                        unref(props).links?.length || !!slots.links ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "links",
                          class: ui.value.links({ class: unref(props).ui?.links })
                        }, [
                          renderSlot(_ctx.$slots, "links", {}, () => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(props).links, (link, index) => {
                              return openBlock(), createBlock(_sfc_main$8, mergeProps({
                                key: index,
                                size: "xl"
                              }, { ref_for: true }, link), null, 16);
                            }), 128))
                          ])
                        ], 2)) : createCommentVNode("", true)
                      ])
                    ], 2)) : createCommentVNode("", true)
                  ], 2)) : createCommentVNode("", true),
                  !!slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : unref(props).orientation === "horizontal" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: unref(prefix)("hidden lg:block")
                  }, null, 2)) : createCommentVNode("", true)
                ]),
                _: 3
              }, 8, ["class"]),
              renderSlot(_ctx.$slots, "bottom")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/PageHero.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DemoSandbox",
  __ssrInlineRender: true,
  setup(__props) {
    const blocks = ref([
      { id: "hero", type: "hero", label: "Hero", icon: "i-lucide-layout-template" },
      { id: "skills", type: "skills", label: "Skills", icon: "i-lucide-bar-chart-2" },
      { id: "testimonial", type: "testimonial", label: "Testimonial", icon: "i-lucide-quote" }
    ]);
    const dragging = ref(false);
    const demoDark = ref(false);
    const skills = [
      { name: "TypeScript", level: 92, category: "Frontend" },
      { name: "Vue / Nuxt", level: 88, category: "Frontend" },
      { name: "Node.js", level: 80, category: "Backend" },
      { name: "PostgreSQL", level: 74, category: "Backend" }
    ];
    const animated = ref(false);
    const sandboxRef = ref(null);
    const t = computed(
      () => demoDark.value ? {
        canvasBg: "#0b1a17",
        headerBg: "#0b1a17",
        headerBorder: "#1a2e28",
        headerText: "#f0faf8",
        headerNav: "#7ab5a8",
        heroBg: "linear-gradient(135deg, #0d2b24 0%, #0b1a17 60%, #0a2020 100%)",
        heroHeading: "#f0faf8",
        heroSub: "#7ab5a8",
        heroBtn1Bg: "#00CC99",
        heroBtn1Color: "#fff",
        heroBtn2Border: "#088b8b",
        heroBtn2Color: "#00CC99",
        skillsBg: "#0b1a17",
        skillsHeading: "#f0faf8",
        skillsLabel: "#d1faf0",
        skillsPct: "#7ab5a8",
        skillsTrack: "#1a3830",
        testimonialBg: "#0d201c",
        testimonialCard: "#132820",
        testimonialCardShadow: "0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)",
        testimonialText: "#9fd4c8",
        testimonialAuthor: "#f0faf8",
        testimonialRole: "#7ab5a8",
        avatarBg: "#1a3830",
        avatarColor: "#00CC99",
        dragHandle: "rgba(11,26,23,0.9)",
        dragHandleBorder: "#1a3830",
        dragHandleColor: "#7ab5a8",
        dragDotFill: "#7ab5a8"
      } : {
        canvasBg: "#ffffff",
        headerBg: "#ffffff",
        headerBorder: "#f1f5f9",
        headerText: "#0f172a",
        headerNav: "#64748b",
        heroBg: "linear-gradient(135deg, #e6fff8 0%, #f4fdfb 60%, #e8faf5 100%)",
        heroHeading: "#0f172a",
        heroSub: "#475569",
        heroBtn1Bg: "#00CC99",
        heroBtn1Color: "#fff",
        heroBtn2Border: "#7de8d0",
        heroBtn2Color: "#088b8b",
        skillsBg: "#ffffff",
        skillsHeading: "#0f172a",
        skillsLabel: "#1e293b",
        skillsPct: "#94a3b8",
        skillsTrack: "#ccf5ec",
        testimonialBg: "#f0fdf9",
        testimonialCard: "#ffffff",
        testimonialCardShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        testimonialText: "#334155",
        testimonialAuthor: "#0f172a",
        testimonialRole: "#94a3b8",
        avatarBg: "#ccf5ec",
        avatarColor: "#088b8b",
        dragHandle: "rgba(255,255,255,0.95)",
        dragHandleBorder: "#e2e8f0",
        dragHandleColor: "#475569",
        dragDotFill: "#94a3b8"
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sandboxRef",
        ref: sandboxRef,
        class: "py-24 px-4"
      }, _attrs))} data-v-9d9812a3><div class="text-center mb-14" data-v-9d9812a3><p class="text-xs font-semibold uppercase tracking-widest mb-3" style="${ssrRenderStyle({ "color": "var(--ui-primary)" })}" data-v-9d9812a3> Interactive Preview </p><h2 class="text-4xl font-bold tracking-tight" data-v-9d9812a3>Your project, built block by block</h2><p class="mt-4 text-lg max-w-xl mx-auto" style="${ssrRenderStyle({ "color": "var(--ui-text-muted)" })}" data-v-9d9812a3> Drag and drop sections to rearrange your layout in real time — no code, no friction. </p></div><div class="max-w-4xl mx-auto" data-v-9d9812a3><div class="rounded-2xl overflow-hidden" style="${ssrRenderStyle({ "box-shadow": "0 25px 60px -12px rgba(0, 0, 0, 0.18),\n            0 0 0 1px rgba(0, 0, 0, 0.06)" })}" data-v-9d9812a3><div class="flex items-center gap-3 px-4 py-3 border-b" style="${ssrRenderStyle({
        backgroundColor: "var(--ui-bg-elevated)",
        borderColor: "var(--ui-border)"
      })}" data-v-9d9812a3><div class="flex gap-1.5 shrink-0" data-v-9d9812a3><div class="w-3 h-3 rounded-full bg-red-400/80" data-v-9d9812a3></div><div class="w-3 h-3 rounded-full bg-yellow-400/80" data-v-9d9812a3></div><div class="w-3 h-3 rounded-full bg-green-400/80" data-v-9d9812a3></div></div><div class="flex-1 mx-2 rounded-md px-3 py-1 text-xs text-center truncate" style="${ssrRenderStyle({
        backgroundColor: "var(--ui-bg)",
        color: "var(--ui-text-muted)",
        border: "1px solid var(--ui-border)"
      })}" data-v-9d9812a3> alexjohnson.app </div><button class="shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors" style="${ssrRenderStyle({
        backgroundColor: unref(demoDark) ? "#1a3830" : "#e6fff8",
        color: unref(demoDark) ? "#00CC99" : "#088b8b"
      })}"${ssrRenderAttr("aria-label", unref(demoDark) ? "Switch to light mode" : "Switch to dark mode")} data-v-9d9812a3>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: unref(demoDark) ? "i-lucide-sun" : "i-lucide-moon",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`</button></div><div class="overflow-y-auto overflow-x-hidden transition-colors duration-300" style="${ssrRenderStyle({ maxHeight: "560px", background: unref(t).canvasBg })}" data-v-9d9812a3><div class="transition-colors duration-300" style="${ssrRenderStyle({
        borderBottom: `1px solid ${unref(t).headerBorder}`,
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: "0",
        background: unref(t).headerBg,
        zIndex: "10"
      })}" data-v-9d9812a3><span style="${ssrRenderStyle({ fontWeight: "700", fontSize: "14px", color: unref(t).headerText })}" data-v-9d9812a3> Alex Johnson </span><div style="${ssrRenderStyle({ display: "flex", gap: "20px", fontSize: "12px", color: unref(t).headerNav })}" data-v-9d9812a3><span data-v-9d9812a3>About</span><span data-v-9d9812a3>Projects</span><span data-v-9d9812a3>Contact</span></div></div>`);
      _push(ssrRenderComponent(unref(VueDraggable), {
        modelValue: unref(blocks),
        "onUpdate:modelValue": ($event) => isRef(blocks) ? blocks.value = $event : null,
        handle: ".demo-drag-handle",
        animation: 200,
        "ghost-class": "demo-ghost",
        "drag-class": "demo-dragging",
        onStart: ($event) => dragging.value = true,
        onEnd: ($event) => dragging.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(blocks), (block) => {
              _push2(`<div class="${ssrRenderClass([{ "cursor-grabbing": unref(dragging) }, "demo-block-wrap group relative"])}" data-v-9d9812a3${_scopeId}><div class="demo-drag-handle" style="${ssrRenderStyle({
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: "20",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 10px",
                background: unref(t).dragHandle,
                border: `1px solid ${unref(t).dragHandleBorder}`,
                borderRadius: "8px",
                fontSize: "11px",
                fontWeight: "500",
                color: unref(t).dragHandleColor,
                cursor: "grab",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                opacity: "0",
                transition: "opacity 150ms",
                userSelect: "none"
              })}" data-v-9d9812a3${_scopeId}><svg width="10" height="14" viewBox="0 0 10 14" fill="none" data-v-9d9812a3${_scopeId}><circle cx="2" cy="2" r="1.5"${ssrRenderAttr("fill", unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle><circle cx="8" cy="2" r="1.5"${ssrRenderAttr("fill", unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle><circle cx="2" cy="7" r="1.5"${ssrRenderAttr("fill", unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle><circle cx="8" cy="7" r="1.5"${ssrRenderAttr("fill", unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle><circle cx="2" cy="12" r="1.5"${ssrRenderAttr("fill", unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle><circle cx="8" cy="12" r="1.5"${ssrRenderAttr("fill", unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle></svg> Drag </div>`);
              if (block.type === "hero") {
                _push2(`<div class="transition-colors duration-300" style="${ssrRenderStyle({ padding: "56px 32px", textAlign: "center", background: unref(t).heroBg })}" data-v-9d9812a3${_scopeId}><h1 style="${ssrRenderStyle({
                  fontSize: "36px",
                  fontWeight: "800",
                  color: unref(t).heroHeading,
                  lineHeight: "1.2",
                  margin: "0 0 12px"
                })}" data-v-9d9812a3${_scopeId}> Alex Johnson </h1><p style="${ssrRenderStyle({
                  fontSize: "15px",
                  color: unref(t).heroSub,
                  maxWidth: "380px",
                  margin: "0 auto 24px",
                  lineHeight: "1.6"
                })}" data-v-9d9812a3${_scopeId}> Full-Stack Developer &amp; Open Source Contributor </p><div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "justify-content": "center" })}" data-v-9d9812a3${_scopeId}><a style="${ssrRenderStyle({
                  padding: "10px 22px",
                  background: unref(t).heroBtn1Bg,
                  color: unref(t).heroBtn1Color,
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "600",
                  textDecoration: "none"
                })}" href="#" data-v-9d9812a3${_scopeId}> View Projects </a><a style="${ssrRenderStyle({
                  padding: "10px 22px",
                  border: `1.5px solid ${unref(t).heroBtn2Border}`,
                  color: unref(t).heroBtn2Color,
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "600",
                  textDecoration: "none"
                })}" href="#" data-v-9d9812a3${_scopeId}> Contact Me </a></div></div>`);
              } else if (block.type === "skills") {
                _push2(`<div class="transition-colors duration-300" style="${ssrRenderStyle({ padding: "40px 32px", background: unref(t).skillsBg })}" data-v-9d9812a3${_scopeId}><h2 style="${ssrRenderStyle({
                  fontSize: "22px",
                  fontWeight: "700",
                  color: unref(t).skillsHeading,
                  margin: "0 0 24px"
                })}" data-v-9d9812a3${_scopeId}> Skills &amp; Expertise </h2><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "1fr 1fr", "gap": "16px 40px" })}" data-v-9d9812a3${_scopeId}><!--[-->`);
                ssrRenderList(skills, (skill) => {
                  _push2(`<div data-v-9d9812a3${_scopeId}><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "6px" })}" data-v-9d9812a3${_scopeId}><span style="${ssrRenderStyle({ fontSize: "13px", fontWeight: "500", color: unref(t).skillsLabel })}" data-v-9d9812a3${_scopeId}>${ssrInterpolate(skill.name)}</span><span style="${ssrRenderStyle({
                    fontSize: "11px",
                    color: unref(t).skillsPct,
                    fontVariantNumeric: "tabular-nums"
                  })}" data-v-9d9812a3${_scopeId}>${ssrInterpolate(skill.level)}% </span></div><div style="${ssrRenderStyle({
                    height: "6px",
                    borderRadius: "9999px",
                    background: unref(t).skillsTrack,
                    overflow: "hidden"
                  })}" data-v-9d9812a3${_scopeId}><div style="${ssrRenderStyle({
                    height: "100%",
                    borderRadius: "9999px",
                    background: "linear-gradient(to right, #00CC99, #088b8b)",
                    transition: "width 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
                    width: unref(animated) ? skill.level + "%" : "0%"
                  })}" data-v-9d9812a3${_scopeId}></div></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else if (block.type === "testimonial") {
                _push2(`<div class="transition-colors duration-300" style="${ssrRenderStyle({ padding: "40px 32px", background: unref(t).testimonialBg })}" data-v-9d9812a3${_scopeId}><h2 style="${ssrRenderStyle({
                  fontSize: "22px",
                  fontWeight: "700",
                  color: unref(t).skillsHeading,
                  margin: "0 0 24px",
                  textAlign: "center"
                })}" data-v-9d9812a3${_scopeId}> What people say </h2><div style="${ssrRenderStyle({
                  background: unref(t).testimonialCard,
                  borderRadius: "16px",
                  padding: "28px 28px 24px",
                  maxWidth: "520px",
                  margin: "0 auto",
                  boxShadow: unref(t).testimonialCardShadow
                })}" data-v-9d9812a3${_scopeId}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="${ssrRenderStyle({ "opacity": "0.3", "margin-bottom": "12px" })}" data-v-9d9812a3${_scopeId}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="#00CC99" data-v-9d9812a3${_scopeId}></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="#00CC99" data-v-9d9812a3${_scopeId}></path></svg><p style="${ssrRenderStyle({
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: unref(t).testimonialText,
                  margin: "0 0 20px"
                })}" data-v-9d9812a3${_scopeId}> &quot;Working with Alex was an absolute pleasure. The attention to detail and clean code made our product launch a huge success.&quot; </p><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "10px" })}" data-v-9d9812a3${_scopeId}><div style="${ssrRenderStyle({
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: unref(t).avatarBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: unref(t).avatarColor,
                  flexShrink: "0"
                })}" data-v-9d9812a3${_scopeId}> S </div><div data-v-9d9812a3${_scopeId}><p style="${ssrRenderStyle({
                  fontSize: "13px",
                  fontWeight: "600",
                  color: unref(t).testimonialAuthor,
                  margin: "0"
                })}" data-v-9d9812a3${_scopeId}> Sarah Chen </p><p style="${ssrRenderStyle({ fontSize: "12px", color: unref(t).testimonialRole, margin: "0" })}" data-v-9d9812a3${_scopeId}> VP of Product at Acme Co </p></div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(blocks), (block) => {
                return openBlock(), createBlock("div", {
                  key: block.id,
                  class: ["demo-block-wrap group relative", { "cursor-grabbing": unref(dragging) }]
                }, [
                  createVNode("div", {
                    class: "demo-drag-handle",
                    style: {
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      zIndex: "20",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "4px 10px",
                      background: unref(t).dragHandle,
                      border: `1px solid ${unref(t).dragHandleBorder}`,
                      borderRadius: "8px",
                      fontSize: "11px",
                      fontWeight: "500",
                      color: unref(t).dragHandleColor,
                      cursor: "grab",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      opacity: "0",
                      transition: "opacity 150ms",
                      userSelect: "none"
                    }
                  }, [
                    (openBlock(), createBlock("svg", {
                      width: "10",
                      height: "14",
                      viewBox: "0 0 10 14",
                      fill: "none"
                    }, [
                      createVNode("circle", {
                        cx: "2",
                        cy: "2",
                        r: "1.5",
                        fill: unref(t).dragDotFill
                      }, null, 8, ["fill"]),
                      createVNode("circle", {
                        cx: "8",
                        cy: "2",
                        r: "1.5",
                        fill: unref(t).dragDotFill
                      }, null, 8, ["fill"]),
                      createVNode("circle", {
                        cx: "2",
                        cy: "7",
                        r: "1.5",
                        fill: unref(t).dragDotFill
                      }, null, 8, ["fill"]),
                      createVNode("circle", {
                        cx: "8",
                        cy: "7",
                        r: "1.5",
                        fill: unref(t).dragDotFill
                      }, null, 8, ["fill"]),
                      createVNode("circle", {
                        cx: "2",
                        cy: "12",
                        r: "1.5",
                        fill: unref(t).dragDotFill
                      }, null, 8, ["fill"]),
                      createVNode("circle", {
                        cx: "8",
                        cy: "12",
                        r: "1.5",
                        fill: unref(t).dragDotFill
                      }, null, 8, ["fill"])
                    ])),
                    createTextVNode(" Drag ")
                  ], 4),
                  block.type === "hero" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "transition-colors duration-300",
                    style: { padding: "56px 32px", textAlign: "center", background: unref(t).heroBg }
                  }, [
                    createVNode("h1", {
                      style: {
                        fontSize: "36px",
                        fontWeight: "800",
                        color: unref(t).heroHeading,
                        lineHeight: "1.2",
                        margin: "0 0 12px"
                      }
                    }, " Alex Johnson ", 4),
                    createVNode("p", {
                      style: {
                        fontSize: "15px",
                        color: unref(t).heroSub,
                        maxWidth: "380px",
                        margin: "0 auto 24px",
                        lineHeight: "1.6"
                      }
                    }, " Full-Stack Developer & Open Source Contributor ", 4),
                    createVNode("div", { style: { "display": "flex", "gap": "12px", "justify-content": "center" } }, [
                      createVNode("a", {
                        style: {
                          padding: "10px 22px",
                          background: unref(t).heroBtn1Bg,
                          color: unref(t).heroBtn1Color,
                          borderRadius: "10px",
                          fontSize: "13px",
                          fontWeight: "600",
                          textDecoration: "none"
                        },
                        href: "#",
                        onClick: withModifiers(() => {
                        }, ["prevent"])
                      }, " View Projects ", 12, ["onClick"]),
                      createVNode("a", {
                        style: {
                          padding: "10px 22px",
                          border: `1.5px solid ${unref(t).heroBtn2Border}`,
                          color: unref(t).heroBtn2Color,
                          borderRadius: "10px",
                          fontSize: "13px",
                          fontWeight: "600",
                          textDecoration: "none"
                        },
                        href: "#",
                        onClick: withModifiers(() => {
                        }, ["prevent"])
                      }, " Contact Me ", 12, ["onClick"])
                    ])
                  ], 4)) : block.type === "skills" ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "transition-colors duration-300",
                    style: { padding: "40px 32px", background: unref(t).skillsBg }
                  }, [
                    createVNode("h2", {
                      style: {
                        fontSize: "22px",
                        fontWeight: "700",
                        color: unref(t).skillsHeading,
                        margin: "0 0 24px"
                      }
                    }, " Skills & Expertise ", 4),
                    createVNode("div", { style: { "display": "grid", "grid-template-columns": "1fr 1fr", "gap": "16px 40px" } }, [
                      (openBlock(), createBlock(Fragment, null, renderList(skills, (skill) => {
                        return createVNode("div", {
                          key: skill.name
                        }, [
                          createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "6px" } }, [
                            createVNode("span", {
                              style: { fontSize: "13px", fontWeight: "500", color: unref(t).skillsLabel }
                            }, toDisplayString(skill.name), 5),
                            createVNode("span", {
                              style: {
                                fontSize: "11px",
                                color: unref(t).skillsPct,
                                fontVariantNumeric: "tabular-nums"
                              }
                            }, toDisplayString(skill.level) + "% ", 5)
                          ]),
                          createVNode("div", {
                            style: {
                              height: "6px",
                              borderRadius: "9999px",
                              background: unref(t).skillsTrack,
                              overflow: "hidden"
                            }
                          }, [
                            createVNode("div", {
                              style: {
                                height: "100%",
                                borderRadius: "9999px",
                                background: "linear-gradient(to right, #00CC99, #088b8b)",
                                transition: "width 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
                                width: unref(animated) ? skill.level + "%" : "0%"
                              }
                            }, null, 4)
                          ], 4)
                        ]);
                      }), 64))
                    ])
                  ], 4)) : block.type === "testimonial" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "transition-colors duration-300",
                    style: { padding: "40px 32px", background: unref(t).testimonialBg }
                  }, [
                    createVNode("h2", {
                      style: {
                        fontSize: "22px",
                        fontWeight: "700",
                        color: unref(t).skillsHeading,
                        margin: "0 0 24px",
                        textAlign: "center"
                      }
                    }, " What people say ", 4),
                    createVNode("div", {
                      style: {
                        background: unref(t).testimonialCard,
                        borderRadius: "16px",
                        padding: "28px 28px 24px",
                        maxWidth: "520px",
                        margin: "0 auto",
                        boxShadow: unref(t).testimonialCardShadow
                      }
                    }, [
                      (openBlock(), createBlock("svg", {
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        style: { "opacity": "0.3", "margin-bottom": "12px" }
                      }, [
                        createVNode("path", {
                          d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",
                          fill: "#00CC99"
                        }),
                        createVNode("path", {
                          d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
                          fill: "#00CC99"
                        })
                      ])),
                      createVNode("p", {
                        style: {
                          fontSize: "14px",
                          lineHeight: "1.7",
                          color: unref(t).testimonialText,
                          margin: "0 0 20px"
                        }
                      }, ' "Working with Alex was an absolute pleasure. The attention to detail and clean code made our product launch a huge success." ', 4),
                      createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "10px" } }, [
                        createVNode("div", {
                          style: {
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: unref(t).avatarBg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px",
                            fontWeight: "700",
                            color: unref(t).avatarColor,
                            flexShrink: "0"
                          }
                        }, " S ", 4),
                        createVNode("div", null, [
                          createVNode("p", {
                            style: {
                              fontSize: "13px",
                              fontWeight: "600",
                              color: unref(t).testimonialAuthor,
                              margin: "0"
                            }
                          }, " Sarah Chen ", 4),
                          createVNode("p", {
                            style: { fontSize: "12px", color: unref(t).testimonialRole, margin: "0" }
                          }, " VP of Product at Acme Co ", 4)
                        ])
                      ])
                    ], 4)
                  ], 4)) : createCommentVNode("", true)
                ], 2);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><p class="text-center text-sm mt-6 flex items-center justify-center gap-2" style="${ssrRenderStyle({ "color": "var(--ui-text-muted)" })}" data-v-9d9812a3>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-grip-vertical",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Hover any block and drag to reorder </p></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/DemoSandbox.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-9d9812a3"]]), { __name: "LandingDemoSandbox" });
const useHealthCheck = () => {
  const { fetcher } = useApi();
  const health = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const checkHealth = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      health.value = await fetcher("/api/health");
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to check health";
      health.value = null;
    } finally {
      isLoading.value = false;
    }
  };
  return {
    health,
    isLoading,
    error,
    checkHealth
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HealthStatus",
  __ssrInlineRender: true,
  setup(__props) {
    const { health, isLoading, error, checkHealth } = useHealthCheck();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$6;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-3" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UCard, { class: "w-full" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-sm font-semibold"${_scopeId}>Backend Status</h3>`);
            _push2(ssrRenderComponent(_component_UButton, {
              loading: unref(isLoading),
              icon: "i-lucide-refresh-cw",
              size: "xs",
              variant: "ghost",
              onClick: unref(checkHealth)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "text-sm font-semibold" }, "Backend Status"),
                createVNode(_component_UButton, {
                  loading: unref(isLoading),
                  icon: "i-lucide-refresh-cw",
                  size: "xs",
                  variant: "ghost",
                  onClick: unref(checkHealth)
                }, null, 8, ["loading", "onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(error)) {
              _push2(`<div class="flex items-center gap-2 text-red-500"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, { name: "i-lucide-alert-circle" }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm"${_scopeId}>${ssrInterpolate(unref(error))}</span></div>`);
            } else if (unref(health)) {
              _push2(`<div class="space-y-2"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(health).status === "healthy" ? "i-lucide-check-circle-2" : "i-lucide-x-circle",
                class: unref(health).status === "healthy" ? "text-green-500" : "text-red-500"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm font-medium"${_scopeId}>${ssrInterpolate(unref(health).status === "healthy" ? "Healthy" : "Unhealthy")}</span></div><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(health).db === "connected" ? "i-lucide-database" : "i-lucide-database-off",
                class: unref(health).db === "connected" ? "text-green-500" : "text-red-500"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm"${_scopeId}>Database: ${ssrInterpolate(unref(health).db)}</span></div><div class="text-xs text-gray-500 space-y-1"${_scopeId}><div${_scopeId}>Service: ${ssrInterpolate(unref(health).service)}</div>`);
              if (unref(health).version) {
                _push2(`<div${_scopeId}>Version: ${ssrInterpolate(unref(health).version)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div${_scopeId}>Last checked: ${ssrInterpolate(new Date(unref(health).timestamp).toLocaleTimeString())}</div></div></div>`);
            } else {
              _push2(`<div class="text-sm text-gray-500"${_scopeId}>Loading...</div>`);
            }
          } else {
            return [
              unref(error) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex items-center gap-2 text-red-500"
              }, [
                createVNode(_component_UIcon, { name: "i-lucide-alert-circle" }),
                createVNode("span", { class: "text-sm" }, toDisplayString(unref(error)), 1)
              ])) : unref(health) ? (openBlock(), createBlock("div", {
                key: 1,
                class: "space-y-2"
              }, [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_UIcon, {
                    name: unref(health).status === "healthy" ? "i-lucide-check-circle-2" : "i-lucide-x-circle",
                    class: unref(health).status === "healthy" ? "text-green-500" : "text-red-500"
                  }, null, 8, ["name", "class"]),
                  createVNode("span", { class: "text-sm font-medium" }, toDisplayString(unref(health).status === "healthy" ? "Healthy" : "Unhealthy"), 1)
                ]),
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_UIcon, {
                    name: unref(health).db === "connected" ? "i-lucide-database" : "i-lucide-database-off",
                    class: unref(health).db === "connected" ? "text-green-500" : "text-red-500"
                  }, null, 8, ["name", "class"]),
                  createVNode("span", { class: "text-sm" }, "Database: " + toDisplayString(unref(health).db), 1)
                ]),
                createVNode("div", { class: "text-xs text-gray-500 space-y-1" }, [
                  createVNode("div", null, "Service: " + toDisplayString(unref(health).service), 1),
                  unref(health).version ? (openBlock(), createBlock("div", { key: 0 }, "Version: " + toDisplayString(unref(health).version), 1)) : createCommentVNode("", true),
                  createVNode("div", null, "Last checked: " + toDisplayString(new Date(unref(health).timestamp).toLocaleTimeString()), 1)
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "text-sm text-gray-500"
              }, "Loading..."))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HealthStatus.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "HealthStatus" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const links = ref([
      {
        label: "Get started",
        to: "/register",
        icon: "i-lucide-rocket"
      }
    ]);
    const route = useRoute();
    const accountDeleted = computed(() => route.query.deleted === "true");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPageHero = _sfc_main$3;
      const _component_UAlert = _sfc_main$4;
      const _component_LandingDemoSandbox = __nuxt_component_2;
      const _component_HealthStatus = __nuxt_component_3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_UPageHero, {
        title: "Build Your Next Project in Minutes",
        description: "Create a stunning, professional project without writing a single line of code. Choose a template, add your work, and share it with the world.",
        links: unref(links),
        class: "[background:linear-gradient(135deg,#00CC99_0%,#088b8b_100%)] m-10 rounded-2xl max-w-7xl mx-auto text-center",
        ui: {
          title: "text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-white",
          description: "text-lg sm:text-xl/8 text-white/80 mt-6"
        }
      }, null, _parent));
      if (unref(accountDeleted)) {
        _push(ssrRenderComponent(_component_UAlert, {
          color: "success",
          variant: "soft",
          icon: "i-lucide-check-circle",
          title: "Account deleted",
          description: "Your account and all associated data have been permanently deleted. We're sorry to see you go.",
          class: "max-w-2xl mx-auto mt-6 px-4"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_LandingDemoSandbox, null, null, _parent));
      _push(ssrRenderComponent(_component_HealthStatus, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DqVUFiFz.mjs.map
