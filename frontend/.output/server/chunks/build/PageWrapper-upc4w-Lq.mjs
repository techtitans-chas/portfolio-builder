import { ac as useComponentProps, a8 as useAppConfig, a5 as tv, p as createReusableTemplate, b as Primitive, j as _sfc_main$d } from './server.mjs';
import { u as useDashboard, b as useResizable, a as _sfc_main$1$1, _ as _sfc_main$3 } from './DashboardSidebarToggle-DCHr3Kp6.mjs';
import { o as vueExports, f as ssrRenderComponent_1, i as ssrRenderSlot_1, d as ssrRenderAttrs_1, e as ssrRenderClass_1, a as ssrInterpolate_1 } from '../routes/renderer.mjs';

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
    const id = `${dashboardContext.storageKey}-panel-${props.id || vueExports.useId()}`;
    const { el, size, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, vueExports.toRef(() => ({ ...dashboardContext, ...props })));
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.dashboardPanel || {} })({
      size: !!size.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div${ssrRenderAttrs_1(vueExports.mergeProps({
        id,
        ref_key: "el",
        ref: el
      }, _ctx.$attrs, {
        "data-dragging": vueExports.unref(isDragging),
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] }),
        style: [vueExports.unref(size) ? { "--width": `${vueExports.unref(size)}${vueExports.unref(dashboardContext).unit}` } : void 0]
      }))}>`);
      ssrRenderSlot_1(_ctx.$slots, "default", {}, () => {
        ssrRenderSlot_1(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(props).ui?.body }))}">`);
        ssrRenderSlot_1(_ctx.$slots, "body", {}, null, _push, _parent);
        _push(`</div>`);
        ssrRenderSlot_1(_ctx.$slots, "footer", {}, null, _push, _parent);
      }, _push, _parent);
      _push(`</div>`);
      ssrRenderSlot_1(_ctx.$slots, "resize-handle", {
        onMouseDown: vueExports.unref(onMouseDown),
        onTouchStart: vueExports.unref(onTouchStart),
        onDoubleClick: vueExports.unref(onDoubleClick)
      }, () => {
        if (vueExports.unref(props).resizable) {
          _push(ssrRenderComponent_1(_sfc_main$1$1, {
            "aria-controls": id,
            "data-slot": "handle",
            class: ui.value.handle({ class: vueExports.unref(props).ui?.handle }),
            onMousedown: vueExports.unref(onMouseDown),
            onTouchstart: vueExports.unref(onTouchStart),
            onDblclick: vueExports.unref(onDoubleClick)
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
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/DashboardPanel.vue");
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
    const slots = vueExports.useSlots();
    const props = useComponentProps("dashboardNavbar", _props);
    const appConfig = useAppConfig();
    const dashboardContext = useDashboard({});
    const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.dashboardNavbar || {} })());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineToggleTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "toggle", { ...vueExports.unref(dashboardContext), ui: ui.value }, () => {
              if (vueExports.unref(props).toggle) {
                _push2(ssrRenderComponent_1(_sfc_main$3, vueExports.mergeProps(typeof vueExports.unref(props).toggle === "object" ? vueExports.unref(props).toggle : {}, {
                  side: vueExports.unref(props).toggleSide,
                  "data-slot": "toggle",
                  class: ui.value.toggle({ class: vueExports.unref(props).ui?.toggle, toggleSide: vueExports.unref(props).toggleSide })
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "toggle", { ...vueExports.unref(dashboardContext), ui: ui.value }, () => [
                vueExports.unref(props).toggle ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$3, vueExports.mergeProps({ key: 0 }, typeof vueExports.unref(props).toggle === "object" ? vueExports.unref(props).toggle : {}, {
                  side: vueExports.unref(props).toggleSide,
                  "data-slot": "toggle",
                  class: ui.value.toggle({ class: vueExports.unref(props).ui?.toggle, toggleSide: vueExports.unref(props).toggleSide })
                }), null, 16, ["side", "class"])) : vueExports.createCommentVNode("", true)
              ])
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
            _push2(`<div data-slot="left" class="${ssrRenderClass_1(ui.value.left({ class: vueExports.unref(props).ui?.left }))}"${_scopeId}>`);
            if (vueExports.unref(props).toggleSide === "left") {
              _push2(ssrRenderComponent_1(vueExports.unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot_1(_ctx.$slots, "left", vueExports.unref(dashboardContext), () => {
              ssrRenderSlot_1(_ctx.$slots, "leading", { ...vueExports.unref(dashboardContext), ui: ui.value }, () => {
                if (vueExports.unref(props).icon) {
                  _push2(ssrRenderComponent_1(_sfc_main$d, {
                    name: vueExports.unref(props).icon,
                    "data-slot": "icon",
                    class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`<h1 data-slot="title" class="${ssrRenderClass_1(ui.value.title({ class: vueExports.unref(props).ui?.title }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate_1(vueExports.unref(props).title)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</h1>`);
              ssrRenderSlot_1(_ctx.$slots, "trailing", { ...vueExports.unref(dashboardContext), ui: ui.value }, null, _push2, _parent2, _scopeId);
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            if (!!slots.default) {
              _push2(`<div data-slot="center" class="${ssrRenderClass_1(ui.value.center({ class: vueExports.unref(props).ui?.center }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "default", vueExports.unref(dashboardContext), null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-slot="right" class="${ssrRenderClass_1(ui.value.right({ class: vueExports.unref(props).ui?.right }))}"${_scopeId}>`);
            ssrRenderSlot_1(_ctx.$slots, "right", vueExports.unref(dashboardContext), null, _push2, _parent2, _scopeId);
            if (vueExports.unref(props).toggleSide === "right") {
              _push2(ssrRenderComponent_1(vueExports.unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                "data-slot": "left",
                class: ui.value.left({ class: vueExports.unref(props).ui?.left })
              }, [
                vueExports.unref(props).toggleSide === "left" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseToggleTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                vueExports.renderSlot(_ctx.$slots, "left", vueExports.unref(dashboardContext), () => [
                  vueExports.renderSlot(_ctx.$slots, "leading", { ...vueExports.unref(dashboardContext), ui: ui.value }, () => [
                    vueExports.unref(props).icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                      key: 0,
                      name: vueExports.unref(props).icon,
                      "data-slot": "icon",
                      class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                  ]),
                  vueExports.createVNode("h1", {
                    "data-slot": "title",
                    class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                    ])
                  ], 2),
                  vueExports.renderSlot(_ctx.$slots, "trailing", { ...vueExports.unref(dashboardContext), ui: ui.value })
                ])
              ], 2),
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "center",
                class: ui.value.center({ class: vueExports.unref(props).ui?.center })
              }, [
                vueExports.renderSlot(_ctx.$slots, "default", vueExports.unref(dashboardContext))
              ], 2)) : vueExports.createCommentVNode("", true),
              vueExports.createVNode("div", {
                "data-slot": "right",
                class: ui.value.right({ class: vueExports.unref(props).ui?.right })
              }, [
                vueExports.renderSlot(_ctx.$slots, "right", vueExports.unref(dashboardContext)),
                vueExports.unref(props).toggleSide === "right" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseToggleTemplate), { key: 0 })) : vueExports.createCommentVNode("", true)
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
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/DashboardNavbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "PageWrapper",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1;
      _push(ssrRenderComponent_1(_component_UDashboardPanel, vueExports.mergeProps({
        resizable: "",
        ui: { body: "!p-0" }
      }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardNavbar, { title: __props.title }, {
              leading: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot_1(_ctx.$slots, "left", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    vueExports.renderSlot(_ctx.$slots, "left")
                  ];
                }
              }),
              right: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot_1(_ctx.$slots, "right", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    vueExports.renderSlot(_ctx.$slots, "right")
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot_1(_ctx.$slots, "middle", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    vueExports.renderSlot(_ctx.$slots, "middle")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UDashboardNavbar, { title: __props.title }, {
                leading: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "left")
                ]),
                right: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "right")
                ]),
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "middle")
                ]),
                _: 3
              }, 8, ["title"])
            ];
          }
        }),
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-1 min-h-0 overflow-y-auto"${_scopeId}>`);
            ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex flex-1 min-h-0 overflow-y-auto" }, [
                vueExports.renderSlot(_ctx.$slots, "default")
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
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/layout/PageWrapper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "AdminLayoutPageWrapper" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=PageWrapper-upc4w-Lq.mjs.map
