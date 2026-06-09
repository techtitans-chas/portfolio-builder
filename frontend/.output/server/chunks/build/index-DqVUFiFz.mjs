import { aO as vueExports, aG as useRoute, a7 as ssrRenderComponent_1, an as useComponentProps, aj as useAppConfig, ag as tv, b as Primitive, a9 as ssrRenderSlot_1, a6 as ssrRenderClass_1, a3 as ssrInterpolate_1, a8 as ssrRenderList_1, e as _sfc_main$8, d as _export_sfc, a5 as ssrRenderAttrs_1, aa as ssrRenderStyle_1, a4 as ssrRenderAttr_1, j as _sfc_main$d } from './server.mjs';
import { u as usePrefix } from './usePrefix-DEbZTxVe.mjs';
import { _ as _sfc_main$5 } from './Container-CXQFSuFJ.mjs';
import { _ as _sfc_main$4 } from './Alert-Nv5RlKkm.mjs';
import { l as lo } from '../_/vue-draggable-plus.mjs';
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
import 'node:util';
import 'node:process';
import 'node:tty';
import '../routes/renderer.mjs';
import '../_/shared.cjs.prod.mjs';
import 'node:stream';

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
    const slots = vueExports.useSlots();
    const props = useComponentProps("pageHero", _props);
    const appConfig = useAppConfig();
    const prefix = usePrefix();
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.pageHero || {} })({
      orientation: props.orientation,
      reverse: props.reverse,
      title: !!props.title || !!slots.title
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: vueExports.unref(props).as,
        "data-orientation": vueExports.unref(props).orientation,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "top", {}, null, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent_1(_sfc_main$5, {
              "data-slot": "container",
              class: ui.value.container({ class: vueExports.unref(props).ui?.container })
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!!slots.header || (vueExports.unref(props).headline || !!slots.headline) || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) || !!slots.body || !!slots.footer || (vueExports.unref(props).links?.length || !!slots.links)) {
                    _push3(`<div data-slot="wrapper" class="${ssrRenderClass_1(ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper }))}"${_scopeId2}>`);
                    if (!!slots.header || (vueExports.unref(props).headline || !!slots.headline) || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description)) {
                      _push3(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(props).ui?.header }))}"${_scopeId2}>`);
                      ssrRenderSlot_1(_ctx.$slots, "header", {}, () => {
                        if (vueExports.unref(props).headline || !!slots.headline) {
                          _push3(`<div data-slot="headline" class="${ssrRenderClass_1(ui.value.headline({ class: vueExports.unref(props).ui?.headline, headline: !slots.headline }))}"${_scopeId2}>`);
                          ssrRenderSlot_1(_ctx.$slots, "headline", {}, () => {
                            _push3(`${ssrInterpolate_1(vueExports.unref(props).headline)}`);
                          }, _push3, _parent3, _scopeId2);
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (vueExports.unref(props).title || !!slots.title) {
                          _push3(`<h1 data-slot="title" class="${ssrRenderClass_1(ui.value.title({ class: vueExports.unref(props).ui?.title }))}"${_scopeId2}>`);
                          ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                            _push3(`${ssrInterpolate_1(vueExports.unref(props).title)}`);
                          }, _push3, _parent3, _scopeId2);
                          _push3(`</h1>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (vueExports.unref(props).description || !!slots.description) {
                          _push3(`<div data-slot="description" class="${ssrRenderClass_1(ui.value.description({ class: vueExports.unref(props).ui?.description }))}"${_scopeId2}>`);
                          ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                            _push3(`${ssrInterpolate_1(vueExports.unref(props).description)}`);
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
                      _push3(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(props).ui?.body }))}"${_scopeId2}>`);
                      ssrRenderSlot_1(_ctx.$slots, "body", {}, null, _push3, _parent3, _scopeId2);
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (!!slots.footer || (vueExports.unref(props).links?.length || !!slots.links)) {
                      _push3(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(props).ui?.footer }))}"${_scopeId2}>`);
                      ssrRenderSlot_1(_ctx.$slots, "footer", {}, () => {
                        if (vueExports.unref(props).links?.length || !!slots.links) {
                          _push3(`<div data-slot="links" class="${ssrRenderClass_1(ui.value.links({ class: vueExports.unref(props).ui?.links }))}"${_scopeId2}>`);
                          ssrRenderSlot_1(_ctx.$slots, "links", {}, () => {
                            _push3(`<!--[-->`);
                            ssrRenderList_1(vueExports.unref(props).links, (link, index) => {
                              _push3(ssrRenderComponent_1(_sfc_main$8, vueExports.mergeProps({
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
                    ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  } else if (vueExports.unref(props).orientation === "horizontal") {
                    _push3(`<div class="${ssrRenderClass_1(vueExports.unref(prefix)("hidden lg:block"))}"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    !!slots.header || (vueExports.unref(props).headline || !!slots.headline) || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) || !!slots.body || !!slots.footer || (vueExports.unref(props).links?.length || !!slots.links) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      "data-slot": "wrapper",
                      class: ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper })
                    }, [
                      !!slots.header || (vueExports.unref(props).headline || !!slots.headline) || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        "data-slot": "header",
                        class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "header", {}, () => [
                          vueExports.unref(props).headline || !!slots.headline ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            "data-slot": "headline",
                            class: ui.value.headline({ class: vueExports.unref(props).ui?.headline, headline: !slots.headline })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "headline", {}, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).headline), 1)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true),
                          vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock("h1", {
                            key: 1,
                            "data-slot": "title",
                            class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true),
                          vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 2,
                            "data-slot": "description",
                            class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true)
                        ])
                      ], 2)) : vueExports.createCommentVNode("", true),
                      !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 1,
                        "data-slot": "body",
                        class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "body")
                      ], 2)) : vueExports.createCommentVNode("", true),
                      !!slots.footer || (vueExports.unref(props).links?.length || !!slots.links) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 2,
                        "data-slot": "footer",
                        class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "footer", {}, () => [
                          vueExports.unref(props).links?.length || !!slots.links ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            "data-slot": "links",
                            class: ui.value.links({ class: vueExports.unref(props).ui?.links })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "links", {}, () => [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(props).links, (link, index) => {
                                return vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                                  key: index,
                                  size: "xl"
                                }, { ref_for: true }, link), null, 16);
                              }), 128))
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true)
                        ])
                      ], 2)) : vueExports.createCommentVNode("", true)
                    ], 2)) : vueExports.createCommentVNode("", true),
                    !!slots.default ? vueExports.renderSlot(_ctx.$slots, "default", { key: 1 }) : vueExports.unref(props).orientation === "horizontal" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 2,
                      class: vueExports.unref(prefix)("hidden lg:block")
                    }, null, 2)) : vueExports.createCommentVNode("", true)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            ssrRenderSlot_1(_ctx.$slots, "bottom", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "top"),
              vueExports.createVNode(_sfc_main$5, {
                "data-slot": "container",
                class: ui.value.container({ class: vueExports.unref(props).ui?.container })
              }, {
                default: vueExports.withCtx(() => [
                  !!slots.header || (vueExports.unref(props).headline || !!slots.headline) || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) || !!slots.body || !!slots.footer || (vueExports.unref(props).links?.length || !!slots.links) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    "data-slot": "wrapper",
                    class: ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper })
                  }, [
                    !!slots.header || (vueExports.unref(props).headline || !!slots.headline) || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      "data-slot": "header",
                      class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "header", {}, () => [
                        vueExports.unref(props).headline || !!slots.headline ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          "data-slot": "headline",
                          class: ui.value.headline({ class: vueExports.unref(props).ui?.headline, headline: !slots.headline })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "headline", {}, () => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).headline), 1)
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true),
                        vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock("h1", {
                          key: 1,
                          "data-slot": "title",
                          class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true),
                        vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 2,
                          "data-slot": "description",
                          class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true)
                      ])
                    ], 2)) : vueExports.createCommentVNode("", true),
                    !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 1,
                      "data-slot": "body",
                      class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "body")
                    ], 2)) : vueExports.createCommentVNode("", true),
                    !!slots.footer || (vueExports.unref(props).links?.length || !!slots.links) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 2,
                      "data-slot": "footer",
                      class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "footer", {}, () => [
                        vueExports.unref(props).links?.length || !!slots.links ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          "data-slot": "links",
                          class: ui.value.links({ class: vueExports.unref(props).ui?.links })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "links", {}, () => [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(props).links, (link, index) => {
                              return vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                                key: index,
                                size: "xl"
                              }, { ref_for: true }, link), null, 16);
                            }), 128))
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true)
                      ])
                    ], 2)) : vueExports.createCommentVNode("", true)
                  ], 2)) : vueExports.createCommentVNode("", true),
                  !!slots.default ? vueExports.renderSlot(_ctx.$slots, "default", { key: 1 }) : vueExports.unref(props).orientation === "horizontal" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 2,
                    class: vueExports.unref(prefix)("hidden lg:block")
                  }, null, 2)) : vueExports.createCommentVNode("", true)
                ]),
                _: 3
              }, 8, ["class"]),
              vueExports.renderSlot(_ctx.$slots, "bottom")
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
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/PageHero.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DemoSandbox",
  __ssrInlineRender: true,
  setup(__props) {
    const blocks = vueExports.ref([
      { id: "hero", type: "hero", label: "Hero", icon: "i-lucide-layout-template" },
      { id: "skills", type: "skills", label: "Skills", icon: "i-lucide-bar-chart-2" },
      { id: "testimonial", type: "testimonial", label: "Testimonial", icon: "i-lucide-quote" }
    ]);
    const dragging = vueExports.ref(false);
    const demoDark = vueExports.ref(false);
    const skills = [
      { name: "TypeScript", level: 92, category: "Frontend" },
      { name: "Vue / Nuxt", level: 88, category: "Frontend" },
      { name: "Node.js", level: 80, category: "Backend" },
      { name: "PostgreSQL", level: 74, category: "Backend" }
    ];
    const animated = vueExports.ref(false);
    const sandboxRef = vueExports.ref(null);
    const t = vueExports.computed(
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
      _push(`<section${ssrRenderAttrs_1(vueExports.mergeProps({
        ref_key: "sandboxRef",
        ref: sandboxRef,
        class: "py-24 px-4"
      }, _attrs))} data-v-9d9812a3><div class="text-center mb-14" data-v-9d9812a3><p class="text-xs font-semibold uppercase tracking-widest mb-3" style="${ssrRenderStyle_1({ "color": "var(--ui-primary)" })}" data-v-9d9812a3> Interactive Preview </p><h2 class="text-4xl font-bold tracking-tight" data-v-9d9812a3>Your project, built block by block</h2><p class="mt-4 text-lg max-w-xl mx-auto" style="${ssrRenderStyle_1({ "color": "var(--ui-text-muted)" })}" data-v-9d9812a3> Drag and drop sections to rearrange your layout in real time — no code, no friction. </p></div><div class="max-w-4xl mx-auto" data-v-9d9812a3><div class="rounded-2xl overflow-hidden" style="${ssrRenderStyle_1({ "box-shadow": "0 25px 60px -12px rgba(0, 0, 0, 0.18),\n            0 0 0 1px rgba(0, 0, 0, 0.06)" })}" data-v-9d9812a3><div class="flex items-center gap-3 px-4 py-3 border-b" style="${ssrRenderStyle_1({
        backgroundColor: "var(--ui-bg-elevated)",
        borderColor: "var(--ui-border)"
      })}" data-v-9d9812a3><div class="flex gap-1.5 shrink-0" data-v-9d9812a3><div class="w-3 h-3 rounded-full bg-red-400/80" data-v-9d9812a3></div><div class="w-3 h-3 rounded-full bg-yellow-400/80" data-v-9d9812a3></div><div class="w-3 h-3 rounded-full bg-green-400/80" data-v-9d9812a3></div></div><div class="flex-1 mx-2 rounded-md px-3 py-1 text-xs text-center truncate" style="${ssrRenderStyle_1({
        backgroundColor: "var(--ui-bg)",
        color: "var(--ui-text-muted)",
        border: "1px solid var(--ui-border)"
      })}" data-v-9d9812a3> alexjohnson.app </div><button class="shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors" style="${ssrRenderStyle_1({
        backgroundColor: vueExports.unref(demoDark) ? "#1a3830" : "#e6fff8",
        color: vueExports.unref(demoDark) ? "#00CC99" : "#088b8b"
      })}"${ssrRenderAttr_1("aria-label", vueExports.unref(demoDark) ? "Switch to light mode" : "Switch to dark mode")} data-v-9d9812a3>`);
      _push(ssrRenderComponent_1(_component_UIcon, {
        name: vueExports.unref(demoDark) ? "i-lucide-sun" : "i-lucide-moon",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(`</button></div><div class="overflow-y-auto overflow-x-hidden transition-colors duration-300" style="${ssrRenderStyle_1({ maxHeight: "560px", background: vueExports.unref(t).canvasBg })}" data-v-9d9812a3><div class="transition-colors duration-300" style="${ssrRenderStyle_1({
        borderBottom: `1px solid ${vueExports.unref(t).headerBorder}`,
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: "0",
        background: vueExports.unref(t).headerBg,
        zIndex: "10"
      })}" data-v-9d9812a3><span style="${ssrRenderStyle_1({ fontWeight: "700", fontSize: "14px", color: vueExports.unref(t).headerText })}" data-v-9d9812a3> Alex Johnson </span><div style="${ssrRenderStyle_1({ display: "flex", gap: "20px", fontSize: "12px", color: vueExports.unref(t).headerNav })}" data-v-9d9812a3><span data-v-9d9812a3>About</span><span data-v-9d9812a3>Projects</span><span data-v-9d9812a3>Contact</span></div></div>`);
      _push(ssrRenderComponent_1(vueExports.unref(lo), {
        modelValue: vueExports.unref(blocks),
        "onUpdate:modelValue": ($event) => vueExports.isRef(blocks) ? blocks.value = $event : null,
        handle: ".demo-drag-handle",
        animation: 200,
        "ghost-class": "demo-ghost",
        "drag-class": "demo-dragging",
        onStart: ($event) => dragging.value = true,
        onEnd: ($event) => dragging.value = false
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList_1(vueExports.unref(blocks), (block) => {
              _push2(`<div class="${ssrRenderClass_1([{ "cursor-grabbing": vueExports.unref(dragging) }, "demo-block-wrap group relative"])}" data-v-9d9812a3${_scopeId}><div class="demo-drag-handle" style="${ssrRenderStyle_1({
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: "20",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 10px",
                background: vueExports.unref(t).dragHandle,
                border: `1px solid ${vueExports.unref(t).dragHandleBorder}`,
                borderRadius: "8px",
                fontSize: "11px",
                fontWeight: "500",
                color: vueExports.unref(t).dragHandleColor,
                cursor: "grab",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                opacity: "0",
                transition: "opacity 150ms",
                userSelect: "none"
              })}" data-v-9d9812a3${_scopeId}><svg width="10" height="14" viewBox="0 0 10 14" fill="none" data-v-9d9812a3${_scopeId}><circle cx="2" cy="2" r="1.5"${ssrRenderAttr_1("fill", vueExports.unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle><circle cx="8" cy="2" r="1.5"${ssrRenderAttr_1("fill", vueExports.unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle><circle cx="2" cy="7" r="1.5"${ssrRenderAttr_1("fill", vueExports.unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle><circle cx="8" cy="7" r="1.5"${ssrRenderAttr_1("fill", vueExports.unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle><circle cx="2" cy="12" r="1.5"${ssrRenderAttr_1("fill", vueExports.unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle><circle cx="8" cy="12" r="1.5"${ssrRenderAttr_1("fill", vueExports.unref(t).dragDotFill)} data-v-9d9812a3${_scopeId}></circle></svg> Drag </div>`);
              if (block.type === "hero") {
                _push2(`<div class="transition-colors duration-300" style="${ssrRenderStyle_1({ padding: "56px 32px", textAlign: "center", background: vueExports.unref(t).heroBg })}" data-v-9d9812a3${_scopeId}><h1 style="${ssrRenderStyle_1({
                  fontSize: "36px",
                  fontWeight: "800",
                  color: vueExports.unref(t).heroHeading,
                  lineHeight: "1.2",
                  margin: "0 0 12px"
                })}" data-v-9d9812a3${_scopeId}> Alex Johnson </h1><p style="${ssrRenderStyle_1({
                  fontSize: "15px",
                  color: vueExports.unref(t).heroSub,
                  maxWidth: "380px",
                  margin: "0 auto 24px",
                  lineHeight: "1.6"
                })}" data-v-9d9812a3${_scopeId}> Full-Stack Developer &amp; Open Source Contributor </p><div style="${ssrRenderStyle_1({ "display": "flex", "gap": "12px", "justify-content": "center" })}" data-v-9d9812a3${_scopeId}><a style="${ssrRenderStyle_1({
                  padding: "10px 22px",
                  background: vueExports.unref(t).heroBtn1Bg,
                  color: vueExports.unref(t).heroBtn1Color,
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "600",
                  textDecoration: "none"
                })}" href="#" data-v-9d9812a3${_scopeId}> View Projects </a><a style="${ssrRenderStyle_1({
                  padding: "10px 22px",
                  border: `1.5px solid ${vueExports.unref(t).heroBtn2Border}`,
                  color: vueExports.unref(t).heroBtn2Color,
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "600",
                  textDecoration: "none"
                })}" href="#" data-v-9d9812a3${_scopeId}> Contact Me </a></div></div>`);
              } else if (block.type === "skills") {
                _push2(`<div class="transition-colors duration-300" style="${ssrRenderStyle_1({ padding: "40px 32px", background: vueExports.unref(t).skillsBg })}" data-v-9d9812a3${_scopeId}><h2 style="${ssrRenderStyle_1({
                  fontSize: "22px",
                  fontWeight: "700",
                  color: vueExports.unref(t).skillsHeading,
                  margin: "0 0 24px"
                })}" data-v-9d9812a3${_scopeId}> Skills &amp; Expertise </h2><div style="${ssrRenderStyle_1({ "display": "grid", "grid-template-columns": "1fr 1fr", "gap": "16px 40px" })}" data-v-9d9812a3${_scopeId}><!--[-->`);
                ssrRenderList_1(skills, (skill) => {
                  _push2(`<div data-v-9d9812a3${_scopeId}><div style="${ssrRenderStyle_1({ "display": "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "6px" })}" data-v-9d9812a3${_scopeId}><span style="${ssrRenderStyle_1({ fontSize: "13px", fontWeight: "500", color: vueExports.unref(t).skillsLabel })}" data-v-9d9812a3${_scopeId}>${ssrInterpolate_1(skill.name)}</span><span style="${ssrRenderStyle_1({
                    fontSize: "11px",
                    color: vueExports.unref(t).skillsPct,
                    fontVariantNumeric: "tabular-nums"
                  })}" data-v-9d9812a3${_scopeId}>${ssrInterpolate_1(skill.level)}% </span></div><div style="${ssrRenderStyle_1({
                    height: "6px",
                    borderRadius: "9999px",
                    background: vueExports.unref(t).skillsTrack,
                    overflow: "hidden"
                  })}" data-v-9d9812a3${_scopeId}><div style="${ssrRenderStyle_1({
                    height: "100%",
                    borderRadius: "9999px",
                    background: "linear-gradient(to right, #00CC99, #088b8b)",
                    transition: "width 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
                    width: vueExports.unref(animated) ? skill.level + "%" : "0%"
                  })}" data-v-9d9812a3${_scopeId}></div></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else if (block.type === "testimonial") {
                _push2(`<div class="transition-colors duration-300" style="${ssrRenderStyle_1({ padding: "40px 32px", background: vueExports.unref(t).testimonialBg })}" data-v-9d9812a3${_scopeId}><h2 style="${ssrRenderStyle_1({
                  fontSize: "22px",
                  fontWeight: "700",
                  color: vueExports.unref(t).skillsHeading,
                  margin: "0 0 24px",
                  textAlign: "center"
                })}" data-v-9d9812a3${_scopeId}> What people say </h2><div style="${ssrRenderStyle_1({
                  background: vueExports.unref(t).testimonialCard,
                  borderRadius: "16px",
                  padding: "28px 28px 24px",
                  maxWidth: "520px",
                  margin: "0 auto",
                  boxShadow: vueExports.unref(t).testimonialCardShadow
                })}" data-v-9d9812a3${_scopeId}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="${ssrRenderStyle_1({ "opacity": "0.3", "margin-bottom": "12px" })}" data-v-9d9812a3${_scopeId}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="#00CC99" data-v-9d9812a3${_scopeId}></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="#00CC99" data-v-9d9812a3${_scopeId}></path></svg><p style="${ssrRenderStyle_1({
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: vueExports.unref(t).testimonialText,
                  margin: "0 0 20px"
                })}" data-v-9d9812a3${_scopeId}> &quot;Working with Alex was an absolute pleasure. The attention to detail and clean code made our product launch a huge success.&quot; </p><div style="${ssrRenderStyle_1({ "display": "flex", "align-items": "center", "gap": "10px" })}" data-v-9d9812a3${_scopeId}><div style="${ssrRenderStyle_1({
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: vueExports.unref(t).avatarBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: vueExports.unref(t).avatarColor,
                  flexShrink: "0"
                })}" data-v-9d9812a3${_scopeId}> S </div><div data-v-9d9812a3${_scopeId}><p style="${ssrRenderStyle_1({
                  fontSize: "13px",
                  fontWeight: "600",
                  color: vueExports.unref(t).testimonialAuthor,
                  margin: "0"
                })}" data-v-9d9812a3${_scopeId}> Sarah Chen </p><p style="${ssrRenderStyle_1({ fontSize: "12px", color: vueExports.unref(t).testimonialRole, margin: "0" })}" data-v-9d9812a3${_scopeId}> VP of Product at Acme Co </p></div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(blocks), (block) => {
                return vueExports.openBlock(), vueExports.createBlock("div", {
                  key: block.id,
                  class: ["demo-block-wrap group relative", { "cursor-grabbing": vueExports.unref(dragging) }]
                }, [
                  vueExports.createVNode("div", {
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
                      background: vueExports.unref(t).dragHandle,
                      border: `1px solid ${vueExports.unref(t).dragHandleBorder}`,
                      borderRadius: "8px",
                      fontSize: "11px",
                      fontWeight: "500",
                      color: vueExports.unref(t).dragHandleColor,
                      cursor: "grab",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      opacity: "0",
                      transition: "opacity 150ms",
                      userSelect: "none"
                    }
                  }, [
                    (vueExports.openBlock(), vueExports.createBlock("svg", {
                      width: "10",
                      height: "14",
                      viewBox: "0 0 10 14",
                      fill: "none"
                    }, [
                      vueExports.createVNode("circle", {
                        cx: "2",
                        cy: "2",
                        r: "1.5",
                        fill: vueExports.unref(t).dragDotFill
                      }, null, 8, ["fill"]),
                      vueExports.createVNode("circle", {
                        cx: "8",
                        cy: "2",
                        r: "1.5",
                        fill: vueExports.unref(t).dragDotFill
                      }, null, 8, ["fill"]),
                      vueExports.createVNode("circle", {
                        cx: "2",
                        cy: "7",
                        r: "1.5",
                        fill: vueExports.unref(t).dragDotFill
                      }, null, 8, ["fill"]),
                      vueExports.createVNode("circle", {
                        cx: "8",
                        cy: "7",
                        r: "1.5",
                        fill: vueExports.unref(t).dragDotFill
                      }, null, 8, ["fill"]),
                      vueExports.createVNode("circle", {
                        cx: "2",
                        cy: "12",
                        r: "1.5",
                        fill: vueExports.unref(t).dragDotFill
                      }, null, 8, ["fill"]),
                      vueExports.createVNode("circle", {
                        cx: "8",
                        cy: "12",
                        r: "1.5",
                        fill: vueExports.unref(t).dragDotFill
                      }, null, 8, ["fill"])
                    ])),
                    vueExports.createTextVNode(" Drag ")
                  ], 4),
                  block.type === "hero" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "transition-colors duration-300",
                    style: { padding: "56px 32px", textAlign: "center", background: vueExports.unref(t).heroBg }
                  }, [
                    vueExports.createVNode("h1", {
                      style: {
                        fontSize: "36px",
                        fontWeight: "800",
                        color: vueExports.unref(t).heroHeading,
                        lineHeight: "1.2",
                        margin: "0 0 12px"
                      }
                    }, " Alex Johnson ", 4),
                    vueExports.createVNode("p", {
                      style: {
                        fontSize: "15px",
                        color: vueExports.unref(t).heroSub,
                        maxWidth: "380px",
                        margin: "0 auto 24px",
                        lineHeight: "1.6"
                      }
                    }, " Full-Stack Developer & Open Source Contributor ", 4),
                    vueExports.createVNode("div", { style: { "display": "flex", "gap": "12px", "justify-content": "center" } }, [
                      vueExports.createVNode("a", {
                        style: {
                          padding: "10px 22px",
                          background: vueExports.unref(t).heroBtn1Bg,
                          color: vueExports.unref(t).heroBtn1Color,
                          borderRadius: "10px",
                          fontSize: "13px",
                          fontWeight: "600",
                          textDecoration: "none"
                        },
                        href: "#",
                        onClick: vueExports.withModifiers(() => {
                        }, ["prevent"])
                      }, " View Projects ", 12, ["onClick"]),
                      vueExports.createVNode("a", {
                        style: {
                          padding: "10px 22px",
                          border: `1.5px solid ${vueExports.unref(t).heroBtn2Border}`,
                          color: vueExports.unref(t).heroBtn2Color,
                          borderRadius: "10px",
                          fontSize: "13px",
                          fontWeight: "600",
                          textDecoration: "none"
                        },
                        href: "#",
                        onClick: vueExports.withModifiers(() => {
                        }, ["prevent"])
                      }, " Contact Me ", 12, ["onClick"])
                    ])
                  ], 4)) : block.type === "skills" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 1,
                    class: "transition-colors duration-300",
                    style: { padding: "40px 32px", background: vueExports.unref(t).skillsBg }
                  }, [
                    vueExports.createVNode("h2", {
                      style: {
                        fontSize: "22px",
                        fontWeight: "700",
                        color: vueExports.unref(t).skillsHeading,
                        margin: "0 0 24px"
                      }
                    }, " Skills & Expertise ", 4),
                    vueExports.createVNode("div", { style: { "display": "grid", "grid-template-columns": "1fr 1fr", "gap": "16px 40px" } }, [
                      (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(skills, (skill) => {
                        return vueExports.createVNode("div", {
                          key: skill.name
                        }, [
                          vueExports.createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "6px" } }, [
                            vueExports.createVNode("span", {
                              style: { fontSize: "13px", fontWeight: "500", color: vueExports.unref(t).skillsLabel }
                            }, vueExports.toDisplayString(skill.name), 5),
                            vueExports.createVNode("span", {
                              style: {
                                fontSize: "11px",
                                color: vueExports.unref(t).skillsPct,
                                fontVariantNumeric: "tabular-nums"
                              }
                            }, vueExports.toDisplayString(skill.level) + "% ", 5)
                          ]),
                          vueExports.createVNode("div", {
                            style: {
                              height: "6px",
                              borderRadius: "9999px",
                              background: vueExports.unref(t).skillsTrack,
                              overflow: "hidden"
                            }
                          }, [
                            vueExports.createVNode("div", {
                              style: {
                                height: "100%",
                                borderRadius: "9999px",
                                background: "linear-gradient(to right, #00CC99, #088b8b)",
                                transition: "width 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
                                width: vueExports.unref(animated) ? skill.level + "%" : "0%"
                              }
                            }, null, 4)
                          ], 4)
                        ]);
                      }), 64))
                    ])
                  ], 4)) : block.type === "testimonial" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 2,
                    class: "transition-colors duration-300",
                    style: { padding: "40px 32px", background: vueExports.unref(t).testimonialBg }
                  }, [
                    vueExports.createVNode("h2", {
                      style: {
                        fontSize: "22px",
                        fontWeight: "700",
                        color: vueExports.unref(t).skillsHeading,
                        margin: "0 0 24px",
                        textAlign: "center"
                      }
                    }, " What people say ", 4),
                    vueExports.createVNode("div", {
                      style: {
                        background: vueExports.unref(t).testimonialCard,
                        borderRadius: "16px",
                        padding: "28px 28px 24px",
                        maxWidth: "520px",
                        margin: "0 auto",
                        boxShadow: vueExports.unref(t).testimonialCardShadow
                      }
                    }, [
                      (vueExports.openBlock(), vueExports.createBlock("svg", {
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        style: { "opacity": "0.3", "margin-bottom": "12px" }
                      }, [
                        vueExports.createVNode("path", {
                          d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",
                          fill: "#00CC99"
                        }),
                        vueExports.createVNode("path", {
                          d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
                          fill: "#00CC99"
                        })
                      ])),
                      vueExports.createVNode("p", {
                        style: {
                          fontSize: "14px",
                          lineHeight: "1.7",
                          color: vueExports.unref(t).testimonialText,
                          margin: "0 0 20px"
                        }
                      }, ' "Working with Alex was an absolute pleasure. The attention to detail and clean code made our product launch a huge success." ', 4),
                      vueExports.createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "10px" } }, [
                        vueExports.createVNode("div", {
                          style: {
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: vueExports.unref(t).avatarBg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px",
                            fontWeight: "700",
                            color: vueExports.unref(t).avatarColor,
                            flexShrink: "0"
                          }
                        }, " S ", 4),
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("p", {
                            style: {
                              fontSize: "13px",
                              fontWeight: "600",
                              color: vueExports.unref(t).testimonialAuthor,
                              margin: "0"
                            }
                          }, " Sarah Chen ", 4),
                          vueExports.createVNode("p", {
                            style: { fontSize: "12px", color: vueExports.unref(t).testimonialRole, margin: "0" }
                          }, " VP of Product at Acme Co ", 4)
                        ])
                      ])
                    ], 4)
                  ], 4)) : vueExports.createCommentVNode("", true)
                ], 2);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><p class="text-center text-sm mt-6 flex items-center justify-center gap-2" style="${ssrRenderStyle_1({ "color": "var(--ui-text-muted)" })}" data-v-9d9812a3>`);
      _push(ssrRenderComponent_1(_component_UIcon, {
        name: "i-lucide-grip-vertical",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Hover any block and drag to reorder </p></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/DemoSandbox.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-9d9812a3"]]), { __name: "LandingDemoSandbox" });
const useHealthCheck = () => {
  const { fetcher } = useApi();
  const health = vueExports.ref(null);
  const isLoading = vueExports.ref(false);
  const error = vueExports.ref(null);
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
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "HealthStatus",
  __ssrInlineRender: true,
  setup(__props) {
    const { health, isLoading, error, checkHealth } = useHealthCheck();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$6;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({ class: "flex items-center gap-3" }, _attrs))}>`);
      _push(ssrRenderComponent_1(_component_UCard, { class: "w-full" }, {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-sm font-semibold"${_scopeId}>Backend Status</h3>`);
            _push2(ssrRenderComponent_1(_component_UButton, {
              loading: vueExports.unref(isLoading),
              icon: "i-lucide-refresh-cw",
              size: "xs",
              variant: "ghost",
              onClick: vueExports.unref(checkHealth)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                vueExports.createVNode("h3", { class: "text-sm font-semibold" }, "Backend Status"),
                vueExports.createVNode(_component_UButton, {
                  loading: vueExports.unref(isLoading),
                  icon: "i-lucide-refresh-cw",
                  size: "xs",
                  variant: "ghost",
                  onClick: vueExports.unref(checkHealth)
                }, null, 8, ["loading", "onClick"])
              ])
            ];
          }
        }),
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vueExports.unref(error)) {
              _push2(`<div class="flex items-center gap-2 text-red-500"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UIcon, { name: "i-lucide-alert-circle" }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm"${_scopeId}>${ssrInterpolate_1(vueExports.unref(error))}</span></div>`);
            } else if (vueExports.unref(health)) {
              _push2(`<div class="space-y-2"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: vueExports.unref(health).status === "healthy" ? "i-lucide-check-circle-2" : "i-lucide-x-circle",
                class: vueExports.unref(health).status === "healthy" ? "text-green-500" : "text-red-500"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm font-medium"${_scopeId}>${ssrInterpolate_1(vueExports.unref(health).status === "healthy" ? "Healthy" : "Unhealthy")}</span></div><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: vueExports.unref(health).db === "connected" ? "i-lucide-database" : "i-lucide-database-off",
                class: vueExports.unref(health).db === "connected" ? "text-green-500" : "text-red-500"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm"${_scopeId}>Database: ${ssrInterpolate_1(vueExports.unref(health).db)}</span></div><div class="text-xs text-gray-500 space-y-1"${_scopeId}><div${_scopeId}>Service: ${ssrInterpolate_1(vueExports.unref(health).service)}</div>`);
              if (vueExports.unref(health).version) {
                _push2(`<div${_scopeId}>Version: ${ssrInterpolate_1(vueExports.unref(health).version)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div${_scopeId}>Last checked: ${ssrInterpolate_1(new Date(vueExports.unref(health).timestamp).toLocaleTimeString())}</div></div></div>`);
            } else {
              _push2(`<div class="text-sm text-gray-500"${_scopeId}>Loading...</div>`);
            }
          } else {
            return [
              vueExports.unref(error) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                class: "flex items-center gap-2 text-red-500"
              }, [
                vueExports.createVNode(_component_UIcon, { name: "i-lucide-alert-circle" }),
                vueExports.createVNode("span", { class: "text-sm" }, vueExports.toDisplayString(vueExports.unref(error)), 1)
              ])) : vueExports.unref(health) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 1,
                class: "space-y-2"
              }, [
                vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: vueExports.unref(health).status === "healthy" ? "i-lucide-check-circle-2" : "i-lucide-x-circle",
                    class: vueExports.unref(health).status === "healthy" ? "text-green-500" : "text-red-500"
                  }, null, 8, ["name", "class"]),
                  vueExports.createVNode("span", { class: "text-sm font-medium" }, vueExports.toDisplayString(vueExports.unref(health).status === "healthy" ? "Healthy" : "Unhealthy"), 1)
                ]),
                vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: vueExports.unref(health).db === "connected" ? "i-lucide-database" : "i-lucide-database-off",
                    class: vueExports.unref(health).db === "connected" ? "text-green-500" : "text-red-500"
                  }, null, 8, ["name", "class"]),
                  vueExports.createVNode("span", { class: "text-sm" }, "Database: " + vueExports.toDisplayString(vueExports.unref(health).db), 1)
                ]),
                vueExports.createVNode("div", { class: "text-xs text-gray-500 space-y-1" }, [
                  vueExports.createVNode("div", null, "Service: " + vueExports.toDisplayString(vueExports.unref(health).service), 1),
                  vueExports.unref(health).version ? (vueExports.openBlock(), vueExports.createBlock("div", { key: 0 }, "Version: " + vueExports.toDisplayString(vueExports.unref(health).version), 1)) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode("div", null, "Last checked: " + vueExports.toDisplayString(new Date(vueExports.unref(health).timestamp).toLocaleTimeString()), 1)
                ])
              ])) : (vueExports.openBlock(), vueExports.createBlock("div", {
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
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HealthStatus.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "HealthStatus" });
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const links = vueExports.ref([
      {
        label: "Get started",
        to: "/register",
        icon: "i-lucide-rocket"
      }
    ]);
    const route = useRoute();
    const accountDeleted = vueExports.computed(() => route.query.deleted === "true");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPageHero = _sfc_main$3;
      const _component_UAlert = _sfc_main$4;
      const _component_LandingDemoSandbox = __nuxt_component_2;
      const _component_HealthStatus = __nuxt_component_3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(_component_UPageHero, {
        title: "Build Your Next Project in Minutes",
        description: "Create a stunning, professional project without writing a single line of code. Choose a template, add your work, and share it with the world.",
        links: vueExports.unref(links),
        class: "[background:linear-gradient(135deg,#00CC99_0%,#088b8b_100%)] m-10 rounded-2xl max-w-7xl mx-auto text-center",
        ui: {
          title: "text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-white",
          description: "text-lg sm:text-xl/8 text-white/80 mt-6"
        }
      }, null, _parent));
      if (vueExports.unref(accountDeleted)) {
        _push(ssrRenderComponent_1(_component_UAlert, {
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
      _push(ssrRenderComponent_1(_component_LandingDemoSandbox, null, null, _parent));
      _push(ssrRenderComponent_1(_component_HealthStatus, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DqVUFiFz.mjs.map
