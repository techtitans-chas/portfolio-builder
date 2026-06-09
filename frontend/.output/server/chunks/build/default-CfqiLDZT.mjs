import { d as _export_sfc, e as _sfc_main$8, ac as useComponentProps, av as useRoute, an as useLocale, a8 as useAppConfig, p as createReusableTemplate, H as getSlotChildrenText, a5 as tv, f as _sfc_main$9, b as Primitive } from './server.mjs';
import { g as defu } from '../nitro/nitro.mjs';
import { _ as _sfc_main$a } from './Container-BZ5KCJ-R.mjs';
import { _ as _sfc_main$5, a as _sfc_main$1$1, b as _sfc_main$2$1 } from './Main-DmrC9lpa.mjs';
import { _ as _sfc_main$7 } from './Modal-BBL-Wwu5.mjs';
import { _ as _sfc_main$6 } from './Drawer-CubnRYJR.mjs';
import { _ as __nuxt_component_1 } from './AppLogo-Bplyd4QI.mjs';
import { f as ssrRenderComponent_1, o as vueExports, i as ssrRenderSlot_1, a as ssrInterpolate_1, e as ssrRenderClass_1 } from '../routes/renderer.mjs';
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
import './overlay-BWwBD9XH.mjs';
import './usePrefix-DEbZTxVe.mjs';
import '../_/shared.cjs.prod.mjs';
import 'node:stream';

const theme$1 = {
  "slots": {
    "root": "bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50",
    "container": "flex items-center justify-between gap-3 h-full",
    "left": "lg:flex-1 flex items-center gap-1.5",
    "center": "hidden lg:flex",
    "right": "flex items-center justify-end lg:flex-1 gap-1.5",
    "title": "shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5",
    "toggle": "lg:hidden",
    "content": "lg:hidden",
    "overlay": "lg:hidden",
    "header": "px-4 sm:px-6 h-(--ui-header-height) shrink-0 flex items-center justify-between gap-3",
    "body": "p-4 sm:p-6 overflow-y-auto"
  },
  "variants": {
    "toggleSide": {
      "left": {
        "toggle": "-ms-1.5"
      },
      "right": {
        "toggle": "-me-1.5"
      }
    }
  }
};
const _sfc_main$4 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UHeader",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    as: { type: null, required: false, default: "header" },
    title: { type: String, required: false, default: "Nuxt UI" },
    to: { type: String, required: false, default: "/" },
    mode: { type: null, required: false, default: "modal" },
    menu: { type: null, required: false },
    toggle: { type: [Boolean, Object], required: false, default: true },
    toggleSide: { type: String, required: false, default: "right" },
    autoClose: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: ["update:open"],
  setup(__props) {
    const _props = __props;
    const slots = vueExports.useSlots();
    const props = useComponentProps("header", _props);
    const open = vueExports.useModel(__props, "open", { type: Boolean, ...{ default: false } });
    const route = useRoute();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const [DefineLeftTemplate, ReuseLeftTemplate] = createReusableTemplate();
    const [DefineRightTemplate, ReuseRightTemplate] = createReusableTemplate();
    const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
    const ariaLabel = vueExports.computed(() => {
      const slotText = slots.title && getSlotChildrenText(slots.title());
      return (slotText || props.title || "Nuxt UI").trim();
    });
    vueExports.watch(() => route.fullPath, () => {
      if (!props.autoClose) return;
      open.value = false;
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.header || {} })());
    const Menu = vueExports.computed(() => ({
      slideover: _sfc_main$2$1,
      modal: _sfc_main$7,
      drawer: _sfc_main$6
    })[props.mode]);
    const menuProps = vueExports.toRef(() => defu(props.menu, {}, props.mode === "modal" ? { fullscreen: true, transition: false } : {}));
    function toggleOpen() {
      open.value = !open.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineToggleTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "toggle", {
              open: open.value,
              toggle: toggleOpen,
              ui: ui.value
            }, () => {
              if (vueExports.unref(props).toggle) {
                _push2(ssrRenderComponent_1(_sfc_main$8, vueExports.mergeProps({
                  color: "neutral",
                  variant: "ghost",
                  "aria-label": open.value ? vueExports.unref(t)("header.close") : vueExports.unref(t)("header.open"),
                  icon: open.value ? vueExports.unref(appConfig).ui.icons.close : vueExports.unref(appConfig).ui.icons.menu
                }, typeof vueExports.unref(props).toggle === "object" ? vueExports.unref(props).toggle : {}, {
                  "data-slot": "toggle",
                  class: ui.value.toggle({ class: vueExports.unref(props).ui?.toggle, toggleSide: vueExports.unref(props).toggleSide }),
                  onClick: toggleOpen
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "toggle", {
                open: open.value,
                toggle: toggleOpen,
                ui: ui.value
              }, () => [
                vueExports.unref(props).toggle ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                  key: 0,
                  color: "neutral",
                  variant: "ghost",
                  "aria-label": open.value ? vueExports.unref(t)("header.close") : vueExports.unref(t)("header.open"),
                  icon: open.value ? vueExports.unref(appConfig).ui.icons.close : vueExports.unref(appConfig).ui.icons.menu
                }, typeof vueExports.unref(props).toggle === "object" ? vueExports.unref(props).toggle : {}, {
                  "data-slot": "toggle",
                  class: ui.value.toggle({ class: vueExports.unref(props).ui?.toggle, toggleSide: vueExports.unref(props).toggleSide }),
                  onClick: toggleOpen
                }), null, 16, ["aria-label", "icon", "class"])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(DefineLeftTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="left" class="${ssrRenderClass_1(ui.value.left({ class: vueExports.unref(props).ui?.left }))}"${_scopeId}>`);
            if (vueExports.unref(props).toggleSide === "left") {
              _push2(ssrRenderComponent_1(vueExports.unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot_1(_ctx.$slots, "left", {}, () => {
              _push2(ssrRenderComponent_1(_sfc_main$9, {
                to: vueExports.unref(props).to,
                "aria-label": ariaLabel.value,
                "data-slot": "title",
                class: ui.value.title({ class: vueExports.unref(props).ui?.title })
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                      _push3(`${ssrInterpolate_1(vueExports.unref(props).title)}`);
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                "data-slot": "left",
                class: ui.value.left({ class: vueExports.unref(props).ui?.left })
              }, [
                vueExports.unref(props).toggleSide === "left" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseToggleTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                vueExports.renderSlot(_ctx.$slots, "left", {}, () => [
                  vueExports.createVNode(_sfc_main$9, {
                    to: vueExports.unref(props).to,
                    "aria-label": ariaLabel.value,
                    "data-slot": "title",
                    class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                      ])
                    ]),
                    _: 3
                  }, 8, ["to", "aria-label", "class"])
                ])
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(DefineRightTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="right" class="${ssrRenderClass_1(ui.value.right({ class: vueExports.unref(props).ui?.right }))}"${_scopeId}>`);
            ssrRenderSlot_1(_ctx.$slots, "right", {}, null, _push2, _parent2, _scopeId);
            if (vueExports.unref(props).toggleSide === "right") {
              _push2(ssrRenderComponent_1(vueExports.unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                "data-slot": "right",
                class: ui.value.right({ class: vueExports.unref(props).ui?.right })
              }, [
                vueExports.renderSlot(_ctx.$slots, "right"),
                vueExports.unref(props).toggleSide === "right" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseToggleTemplate), { key: 0 })) : vueExports.createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: vueExports.unref(props).as
      }, _ctx.$attrs, {
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] })
      }), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "top", {}, null, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent_1(_sfc_main$a, {
              "data-slot": "container",
              class: ui.value.container({ class: vueExports.unref(props).ui?.container })
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(ReuseLeftTemplate), null, null, _parent3, _scopeId2));
                  _push3(`<div data-slot="center" class="${ssrRenderClass_1(ui.value.center({ class: vueExports.unref(props).ui?.center }))}"${_scopeId2}>`);
                  ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div>`);
                  _push3(ssrRenderComponent_1(vueExports.unref(ReuseRightTemplate), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(ReuseLeftTemplate)),
                    vueExports.createVNode("div", {
                      "data-slot": "center",
                      class: ui.value.center({ class: vueExports.unref(props).ui?.center })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "default")
                    ], 2),
                    vueExports.createVNode(vueExports.unref(ReuseRightTemplate))
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            ssrRenderSlot_1(_ctx.$slots, "bottom", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "top"),
              vueExports.createVNode(_sfc_main$a, {
                "data-slot": "container",
                class: ui.value.container({ class: vueExports.unref(props).ui?.container })
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(ReuseLeftTemplate)),
                  vueExports.createVNode("div", {
                    "data-slot": "center",
                    class: ui.value.center({ class: vueExports.unref(props).ui?.center })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "default")
                  ], 2),
                  vueExports.createVNode(vueExports.unref(ReuseRightTemplate))
                ]),
                _: 3
              }, 8, ["class"]),
              vueExports.renderSlot(_ctx.$slots, "bottom")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(Menu), vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: vueExports.unref(t)("header.title"),
        description: vueExports.unref(t)("header.description")
      }, menuProps.value, {
        ui: {
          overlay: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay }),
          content: ui.value.content({ class: vueExports.unref(props).ui?.content })
        }
      }), {
        content: vueExports.withCtx((contentData, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "content", contentData, () => {
              if (vueExports.unref(props).mode !== "drawer") {
                _push2(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(props).ui?.header }))}"${_scopeId}>`);
                _push2(ssrRenderComponent_1(vueExports.unref(ReuseLeftTemplate), null, null, _parent2, _scopeId));
                _push2(ssrRenderComponent_1(vueExports.unref(ReuseRightTemplate), null, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(props).ui?.body }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "body", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "content", contentData, () => [
                vueExports.unref(props).mode !== "drawer" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  "data-slot": "header",
                  class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                }, [
                  vueExports.createVNode(vueExports.unref(ReuseLeftTemplate)),
                  vueExports.createVNode(vueExports.unref(ReuseRightTemplate))
                ], 2)) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("div", {
                  "data-slot": "body",
                  class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "body")
                ], 2)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/Header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_UHeader = _sfc_main$4;
  const _component_AppLogo = __nuxt_component_1;
  const _component_UButton = _sfc_main$8;
  _push(ssrRenderComponent_1(_component_UHeader, vueExports.mergeProps({ toggle: false }, _attrs), {
    title: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent_1(_component_AppLogo, {
          class: "text-xl",
          white: "",
          underline: ""
        }, null, _parent2, _scopeId));
      } else {
        return [
          vueExports.createVNode(_component_AppLogo, {
            class: "text-xl",
            white: "",
            underline: ""
          })
        ];
      }
    }),
    right: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent_1(_component_UButton, {
          color: "neutral",
          variant: "ghost",
          to: "/login",
          "aria-label": "Login",
          label: "Login",
          class: "login-link"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent_1(_component_UButton, {
          color: "neutral",
          variant: "solid",
          to: "/register",
          "aria-label": "Register",
          label: "Get started",
          "trailing-icon": "i-lucide-arrow-right",
          class: "font-bold"
        }, null, _parent2, _scopeId));
      } else {
        return [
          vueExports.createVNode(_component_UButton, {
            color: "neutral",
            variant: "ghost",
            to: "/login",
            "aria-label": "Login",
            label: "Login",
            class: "login-link"
          }),
          vueExports.createVNode(_component_UButton, {
            color: "neutral",
            variant: "solid",
            to: "/register",
            "aria-label": "Register",
            label: "Get started",
            "trailing-icon": "i-lucide-arrow-right",
            class: "font-bold"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/layout/Header.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-976e822d"]]), { __name: "LandingLayoutHeader" });
const theme = {
  "slots": {
    "root": "",
    "top": "py-8 lg:py-12",
    "bottom": "py-8 lg:py-12",
    "container": "py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3",
    "left": "flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1",
    "center": "mt-3 lg:mt-0 lg:order-2 flex items-center justify-center",
    "right": "lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3"
  }
};
const _sfc_main$2 = {
  __name: "UFooter",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "footer" },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const _props = __props;
    const slots = vueExports.useSlots();
    const props = useComponentProps("footer", _props);
    const appConfig = useAppConfig();
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.footer || {} })());
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: vueExports.unref(props).as,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.top) {
              _push2(`<div data-slot="top" class="${ssrRenderClass_1(ui.value.top({ class: vueExports.unref(props).ui?.top }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "top", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(_sfc_main$a, {
              "data-slot": "container",
              class: ui.value.container({ class: vueExports.unref(props).ui?.container })
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-slot="right" class="${ssrRenderClass_1(ui.value.right({ class: vueExports.unref(props).ui?.right }))}"${_scopeId2}>`);
                  ssrRenderSlot_1(_ctx.$slots, "right", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div><div data-slot="center" class="${ssrRenderClass_1(ui.value.center({ class: vueExports.unref(props).ui?.center }))}"${_scopeId2}>`);
                  ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div><div data-slot="left" class="${ssrRenderClass_1(ui.value.left({ class: vueExports.unref(props).ui?.left }))}"${_scopeId2}>`);
                  ssrRenderSlot_1(_ctx.$slots, "left", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", {
                      "data-slot": "right",
                      class: ui.value.right({ class: vueExports.unref(props).ui?.right })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "right")
                    ], 2),
                    vueExports.createVNode("div", {
                      "data-slot": "center",
                      class: ui.value.center({ class: vueExports.unref(props).ui?.center })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "default")
                    ], 2),
                    vueExports.createVNode("div", {
                      "data-slot": "left",
                      class: ui.value.left({ class: vueExports.unref(props).ui?.left })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "left")
                    ], 2)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (!!slots.bottom) {
              _push2(`<div data-slot="bottom" class="${ssrRenderClass_1(ui.value.bottom({ class: vueExports.unref(props).ui?.bottom }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "bottom", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !!slots.top ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "top",
                class: ui.value.top({ class: vueExports.unref(props).ui?.top })
              }, [
                vueExports.renderSlot(_ctx.$slots, "top")
              ], 2)) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(_sfc_main$a, {
                "data-slot": "container",
                class: ui.value.container({ class: vueExports.unref(props).ui?.container })
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode("div", {
                    "data-slot": "right",
                    class: ui.value.right({ class: vueExports.unref(props).ui?.right })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "right")
                  ], 2),
                  vueExports.createVNode("div", {
                    "data-slot": "center",
                    class: ui.value.center({ class: vueExports.unref(props).ui?.center })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "default")
                  ], 2),
                  vueExports.createVNode("div", {
                    "data-slot": "left",
                    class: ui.value.left({ class: vueExports.unref(props).ui?.left })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "left")
                  ], 2)
                ]),
                _: 3
              }, 8, ["class"]),
              !!slots.bottom ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 1,
                "data-slot": "bottom",
                class: ui.value.bottom({ class: vueExports.unref(props).ui?.bottom })
              }, [
                vueExports.renderSlot(_ctx.$slots, "bottom")
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_UFooter = _sfc_main$2;
  const _component_UButton = _sfc_main$8;
  const _component_UColorModeButton = _sfc_main$1$1;
  _push(ssrRenderComponent_1(_component_UFooter, _attrs, {
    left: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p class="text-muted text-sm"${_scopeId}>Copyright © ${ssrInterpolate_1((/* @__PURE__ */ new Date()).getFullYear())}</p>`);
      } else {
        return [
          vueExports.createVNode("p", { class: "text-muted text-sm" }, "Copyright © " + vueExports.toDisplayString((/* @__PURE__ */ new Date()).getFullYear()), 1)
        ];
      }
    }),
    right: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent_1(_component_UButton, {
          icon: "i-simple-icons-github",
          color: "neutral",
          variant: "ghost",
          to: "https://github.com/idaohlen",
          target: "_blank",
          "aria-label": "Ida Öhlén"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent_1(_component_UButton, {
          icon: "i-simple-icons-github",
          color: "neutral",
          variant: "ghost",
          to: "https://github.com/martinsodersten",
          target: "_blank",
          "aria-label": "Martin Södersten"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent_1(_component_UColorModeButton, null, null, _parent2, _scopeId));
      } else {
        return [
          vueExports.createVNode(_component_UButton, {
            icon: "i-simple-icons-github",
            color: "neutral",
            variant: "ghost",
            to: "https://github.com/idaohlen",
            target: "_blank",
            "aria-label": "Ida Öhlén"
          }),
          vueExports.createVNode(_component_UButton, {
            icon: "i-simple-icons-github",
            color: "neutral",
            variant: "ghost",
            to: "https://github.com/martinsodersten",
            target: "_blank",
            "aria-label": "Martin Södersten"
          }),
          vueExports.createVNode(_component_UColorModeButton)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/landing/layout/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "LandingLayoutFooter" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_LandingLayoutHeader = __nuxt_component_0;
  const _component_UMain = _sfc_main$5;
  const _component_LandingLayoutFooter = __nuxt_component_2;
  _push(`<!--[-->`);
  _push(ssrRenderComponent_1(_component_LandingLayoutHeader, null, null, _parent));
  _push(ssrRenderComponent_1(_component_UMain, null, {
    default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          vueExports.renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
  _push(ssrRenderComponent_1(_component_LandingLayoutFooter, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CfqiLDZT.mjs.map
