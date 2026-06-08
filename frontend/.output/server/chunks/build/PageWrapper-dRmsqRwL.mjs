import { defineComponent, mergeProps, withCtx, createVNode, renderSlot, useId, toRef, computed, unref, useSlots, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { U as useComponentProps, N as useAppConfig, M as tv, b as Primitive, e as _sfc_main$d } from './server.mjs';
import { u as useDashboard, b as useResizable, a as _sfc_main$1$1, _ as _sfc_main$3 } from './DashboardSidebarToggle-uAAQWn-6.mjs';
import { createReusableTemplate } from '@vueuse/core';

const theme$1 = {
  "slots": {
    "root": "relative flex flex-col min-w-0 min-h-svh lg:not-last:border-e lg:not-last:border-default shrink-0",
    "body": "flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6",
    "handle": ""
  },
  "variants": {
    "size": {
      "true": {
        "root": "w-full lg:w-(--width)"
      },
      "false": {
        "root": "flex-1"
      }
    }
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UDashboardPanel",
  __ssrInlineRender: true,
  props: {
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    id: { type: String, required: false },
    minSize: { type: Number, required: false, default: 15 },
    maxSize: { type: Number, required: false },
    defaultSize: { type: Number, required: false },
    resizable: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useComponentProps("dashboardPanel", _props);
    const appConfig = useAppConfig();
    const dashboardContext = useDashboard({ storageKey: "dashboard", unit: "%" });
    const id = `${dashboardContext.storageKey}-panel-${props.id || useId()}`;
    const { el, size, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({ ...dashboardContext, ...props })));
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.dashboardPanel || {} })({
      size: !!size.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div${ssrRenderAttrs(mergeProps({
        id,
        ref_key: "el",
        ref: el
      }, _ctx.$attrs, {
        "data-dragging": unref(isDragging),
        "data-slot": "root",
        class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }),
        style: [unref(size) ? { "--width": `${unref(size)}${unref(dashboardContext).unit}` } : void 0]
      }))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(props).ui?.body }))}">`);
        ssrRenderSlot(_ctx.$slots, "body", {}, null, _push, _parent);
        _push(`</div>`);
        ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
      }, _push, _parent);
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "resize-handle", {
        onMouseDown: unref(onMouseDown),
        onTouchStart: unref(onTouchStart),
        onDoubleClick: unref(onDoubleClick)
      }, () => {
        if (unref(props).resizable) {
          _push(ssrRenderComponent(_sfc_main$1$1, {
            "aria-controls": id,
            "data-slot": "handle",
            class: ui.value.handle({ class: unref(props).ui?.handle }),
            onMousedown: unref(onMouseDown),
            onTouchstart: unref(onTouchStart),
            onDblclick: unref(onDoubleClick)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/DashboardPanel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "h-(--ui-header-height) shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5",
    "left": "flex items-center gap-1.5 min-w-0",
    "icon": "shrink-0 size-5 self-center me-1.5",
    "title": "flex items-center gap-1.5 font-semibold text-highlighted truncate",
    "center": "hidden lg:flex",
    "right": "flex items-center shrink-0 gap-1.5",
    "toggle": ""
  },
  "variants": {
    "toggleSide": {
      "left": {
        "toggle": ""
      },
      "right": {
        "toggle": ""
      }
    }
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UDashboardNavbar",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    icon: { type: null, required: false },
    title: { type: String, required: false },
    toggle: { type: [Boolean, Object], required: false, default: true },
    toggleSide: { type: String, required: false, default: "left" },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const _props = __props;
    const slots = useSlots();
    const props = useComponentProps("dashboardNavbar", _props);
    const appConfig = useAppConfig();
    const dashboardContext = useDashboard({});
    const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.dashboardNavbar || {} })());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineToggleTemplate), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "toggle", { ...unref(dashboardContext), ui: ui.value }, () => {
              if (unref(props).toggle) {
                _push2(ssrRenderComponent(_sfc_main$3, mergeProps(typeof unref(props).toggle === "object" ? unref(props).toggle : {}, {
                  side: unref(props).toggleSide,
                  "data-slot": "toggle",
                  class: ui.value.toggle({ class: unref(props).ui?.toggle, toggleSide: unref(props).toggleSide })
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "toggle", { ...unref(dashboardContext), ui: ui.value }, () => [
                unref(props).toggle ? (openBlock(), createBlock(_sfc_main$3, mergeProps({ key: 0 }, typeof unref(props).toggle === "object" ? unref(props).toggle : {}, {
                  side: unref(props).toggleSide,
                  "data-slot": "toggle",
                  class: ui.value.toggle({ class: unref(props).ui?.toggle, toggleSide: unref(props).toggleSide })
                }), null, 16, ["side", "class"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: unref(props).as
      }, _ctx.$attrs, {
        "data-slot": "root",
        class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
      }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="left" class="${ssrRenderClass(ui.value.left({ class: unref(props).ui?.left }))}"${_scopeId}>`);
            if (unref(props).toggleSide === "left") {
              _push2(ssrRenderComponent(unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "left", unref(dashboardContext), () => {
              ssrRenderSlot(_ctx.$slots, "leading", { ...unref(dashboardContext), ui: ui.value }, () => {
                if (unref(props).icon) {
                  _push2(ssrRenderComponent(_sfc_main$d, {
                    name: unref(props).icon,
                    "data-slot": "icon",
                    class: ui.value.icon({ class: unref(props).ui?.icon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`<h1 data-slot="title" class="${ssrRenderClass(ui.value.title({ class: unref(props).ui?.title }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate(unref(props).title)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</h1>`);
              ssrRenderSlot(_ctx.$slots, "trailing", { ...unref(dashboardContext), ui: ui.value }, null, _push2, _parent2, _scopeId);
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            if (!!slots.default) {
              _push2(`<div data-slot="center" class="${ssrRenderClass(ui.value.center({ class: unref(props).ui?.center }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", unref(dashboardContext), null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-slot="right" class="${ssrRenderClass(ui.value.right({ class: unref(props).ui?.right }))}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "right", unref(dashboardContext), null, _push2, _parent2, _scopeId);
            if (unref(props).toggleSide === "right") {
              _push2(ssrRenderComponent(unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                "data-slot": "left",
                class: ui.value.left({ class: unref(props).ui?.left })
              }, [
                unref(props).toggleSide === "left" ? (openBlock(), createBlock(unref(ReuseToggleTemplate), { key: 0 })) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "left", unref(dashboardContext), () => [
                  renderSlot(_ctx.$slots, "leading", { ...unref(dashboardContext), ui: ui.value }, () => [
                    unref(props).icon ? (openBlock(), createBlock(_sfc_main$d, {
                      key: 0,
                      name: unref(props).icon,
                      "data-slot": "icon",
                      class: ui.value.icon({ class: unref(props).ui?.icon })
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                  ]),
                  createVNode("h1", {
                    "data-slot": "title",
                    class: ui.value.title({ class: unref(props).ui?.title })
                  }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createTextVNode(toDisplayString(unref(props).title), 1)
                    ])
                  ], 2),
                  renderSlot(_ctx.$slots, "trailing", { ...unref(dashboardContext), ui: ui.value })
                ])
              ], 2),
              !!slots.default ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "center",
                class: ui.value.center({ class: unref(props).ui?.center })
              }, [
                renderSlot(_ctx.$slots, "default", unref(dashboardContext))
              ], 2)) : createCommentVNode("", true),
              createVNode("div", {
                "data-slot": "right",
                class: ui.value.right({ class: unref(props).ui?.right })
              }, [
                renderSlot(_ctx.$slots, "right", unref(dashboardContext)),
                unref(props).toggleSide === "right" ? (openBlock(), createBlock(unref(ReuseToggleTemplate), { key: 0 })) : createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/DashboardNavbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageWrapper",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1;
      _push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({
        resizable: "",
        ui: { body: "!p-0" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UDashboardNavbar, { title: __props.title }, {
              leading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "left", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "left")
                  ];
                }
              }),
              right: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "right", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "right")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "middle", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "middle")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UDashboardNavbar, { title: __props.title }, {
                leading: withCtx(() => [
                  renderSlot(_ctx.$slots, "left")
                ]),
                right: withCtx(() => [
                  renderSlot(_ctx.$slots, "right")
                ]),
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "middle")
                ]),
                _: 3
              }, 8, ["title"])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-1 min-h-0 overflow-y-auto"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-1 min-h-0 overflow-y-auto" }, [
                renderSlot(_ctx.$slots, "default")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/layout/PageWrapper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "AdminLayoutPageWrapper" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=PageWrapper-dRmsqRwL.mjs.map
