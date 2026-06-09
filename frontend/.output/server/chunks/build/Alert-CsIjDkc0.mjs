import { ac as useComponentProps, an as useLocale, a8 as useAppConfig, a5 as tv, b as Primitive, h as _sfc_main$b, j as _sfc_main$d, e as _sfc_main$8 } from './server.mjs';
import { o as vueExports, f as ssrRenderComponent_1, i as ssrRenderSlot_1, e as ssrRenderClass_1, a as ssrInterpolate_1, g as ssrRenderList_1 } from '../routes/renderer.mjs';

const theme = {
  "slots": {
    "root": "relative overflow-hidden w-full rounded-lg p-4 flex gap-2.5",
    "wrapper": "min-w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium",
    "description": "text-sm opacity-90",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex flex-wrap gap-1.5 shrink-0",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": {
        "root": "bg-primary text-inverted"
      }
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": {
        "root": "bg-secondary text-inverted"
      }
    },
    {
      "color": "success",
      "variant": "solid",
      "class": {
        "root": "bg-success text-inverted"
      }
    },
    {
      "color": "info",
      "variant": "solid",
      "class": {
        "root": "bg-info text-inverted"
      }
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": {
        "root": "bg-warning text-inverted"
      }
    },
    {
      "color": "error",
      "variant": "solid",
      "class": {
        "root": "bg-error text-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": {
        "root": "text-primary ring ring-inset ring-primary/25"
      }
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": {
        "root": "text-secondary ring ring-inset ring-secondary/25"
      }
    },
    {
      "color": "success",
      "variant": "outline",
      "class": {
        "root": "text-success ring ring-inset ring-success/25"
      }
    },
    {
      "color": "info",
      "variant": "outline",
      "class": {
        "root": "text-info ring ring-inset ring-info/25"
      }
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": {
        "root": "text-warning ring ring-inset ring-warning/25"
      }
    },
    {
      "color": "error",
      "variant": "outline",
      "class": {
        "root": "text-error ring ring-inset ring-error/25"
      }
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": {
        "root": "bg-primary/10 text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": {
        "root": "bg-secondary/10 text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "soft",
      "class": {
        "root": "bg-success/10 text-success"
      }
    },
    {
      "color": "info",
      "variant": "soft",
      "class": {
        "root": "bg-info/10 text-info"
      }
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": {
        "root": "bg-warning/10 text-warning"
      }
    },
    {
      "color": "error",
      "variant": "soft",
      "class": {
        "root": "bg-error/10 text-error"
      }
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": {
        "root": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
      }
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": {
        "root": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
      }
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": {
        "root": "bg-success/10 text-success ring ring-inset ring-success/25"
      }
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": {
        "root": "bg-info/10 text-info ring ring-inset ring-info/25"
      }
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": {
        "root": "bg-warning/10 text-warning ring ring-inset ring-warning/25"
      }
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": {
        "root": "bg-error/10 text-error ring ring-inset ring-error/25"
      }
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": {
        "root": "text-inverted bg-inverted"
      }
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": {
        "root": "text-highlighted bg-default ring ring-inset ring-default"
      }
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": {
        "root": "text-highlighted bg-elevated/50"
      }
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": {
        "root": "text-highlighted bg-elevated/50 ring ring-inset ring-accented"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid"
  }
};
const _sfc_main = {
  __name: "UAlert",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    actions: { type: Array, required: false },
    close: { type: [Boolean, Object], required: false },
    closeIcon: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const props = useComponentProps("alert", _props);
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.alert || {} })({
      color: props.color,
      variant: props.variant,
      orientation: props.orientation,
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
            ssrRenderSlot_1(_ctx.$slots, "leading", { ui: ui.value }, () => {
              if (vueExports.unref(props).avatar) {
                _push2(ssrRenderComponent_1(_sfc_main$b, vueExports.mergeProps({
                  size: vueExports.unref(props).ui?.avatarSize || ui.value.avatarSize()
                }, vueExports.unref(props).avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: vueExports.unref(props).ui?.avatar })
                }), null, _parent2, _scopeId));
              } else if (vueExports.unref(props).icon) {
                _push2(ssrRenderComponent_1(_sfc_main$d, {
                  name: vueExports.unref(props).icon,
                  "data-slot": "icon",
                  class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`<div data-slot="wrapper" class="${ssrRenderClass_1(ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper }))}"${_scopeId}>`);
            if (vueExports.unref(props).title || !!slots.title) {
              _push2(`<div data-slot="title" class="${ssrRenderClass_1(ui.value.title({ class: vueExports.unref(props).ui?.title }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate_1(vueExports.unref(props).title)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(props).description || !!slots.description) {
              _push2(`<div data-slot="description" class="${ssrRenderClass_1(ui.value.description({ class: vueExports.unref(props).ui?.description }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                _push2(`${ssrInterpolate_1(vueExports.unref(props).description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(props).orientation === "vertical" && (vueExports.unref(props).actions?.length || !!slots.actions)) {
              _push2(`<div data-slot="actions" class="${ssrRenderClass_1(ui.value.actions({ class: vueExports.unref(props).ui?.actions }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "actions", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList_1(vueExports.unref(props).actions, (action, index) => {
                  _push2(ssrRenderComponent_1(_sfc_main$8, vueExports.mergeProps({
                    key: index,
                    size: "xs"
                  }, { ref_for: true }, action), null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (vueExports.unref(props).orientation === "horizontal" && (vueExports.unref(props).actions?.length || !!slots.actions) || vueExports.unref(props).close) {
              _push2(`<div data-slot="actions" class="${ssrRenderClass_1(ui.value.actions({ class: vueExports.unref(props).ui?.actions, orientation: "horizontal" }))}"${_scopeId}>`);
              if (vueExports.unref(props).orientation === "horizontal" && (vueExports.unref(props).actions?.length || !!slots.actions)) {
                ssrRenderSlot_1(_ctx.$slots, "actions", {}, () => {
                  _push2(`<!--[-->`);
                  ssrRenderList_1(vueExports.unref(props).actions, (action, index) => {
                    _push2(ssrRenderComponent_1(_sfc_main$8, vueExports.mergeProps({
                      key: index,
                      size: "xs"
                    }, { ref_for: true }, action), null, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                }, _push2, _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              ssrRenderSlot_1(_ctx.$slots, "close", { ui: ui.value }, () => {
                if (vueExports.unref(props).close) {
                  _push2(ssrRenderComponent_1(_sfc_main$8, vueExports.mergeProps({
                    icon: vueExports.unref(props).closeIcon || vueExports.unref(appConfig).ui.icons.close,
                    color: "neutral",
                    variant: "link",
                    "aria-label": vueExports.unref(t)("alert.close")
                  }, typeof vueExports.unref(props).close === "object" ? vueExports.unref(props).close : {}, {
                    "data-slot": "close",
                    class: ui.value.close({ class: vueExports.unref(props).ui?.close }),
                    onClick: ($event) => emits("update:open", false)
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                vueExports.unref(props).avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                  key: 0,
                  size: vueExports.unref(props).ui?.avatarSize || ui.value.avatarSize()
                }, vueExports.unref(props).avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: vueExports.unref(props).ui?.avatar })
                }), null, 16, ["size", "class"])) : vueExports.unref(props).icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                  key: 1,
                  name: vueExports.unref(props).icon,
                  "data-slot": "icon",
                  class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
              ]),
              vueExports.createVNode("div", {
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper })
              }, [
                vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  "data-slot": "title",
                  class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                  ])
                ], 2)) : vueExports.createCommentVNode("", true),
                vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                  ])
                ], 2)) : vueExports.createCommentVNode("", true),
                vueExports.unref(props).orientation === "vertical" && (vueExports.unref(props).actions?.length || !!slots.actions) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 2,
                  "data-slot": "actions",
                  class: ui.value.actions({ class: vueExports.unref(props).ui?.actions })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "actions", {}, () => [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(props).actions, (action, index) => {
                      return vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                        key: index,
                        size: "xs"
                      }, { ref_for: true }, action), null, 16);
                    }), 128))
                  ])
                ], 2)) : vueExports.createCommentVNode("", true)
              ], 2),
              vueExports.unref(props).orientation === "horizontal" && (vueExports.unref(props).actions?.length || !!slots.actions) || vueExports.unref(props).close ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "actions",
                class: ui.value.actions({ class: vueExports.unref(props).ui?.actions, orientation: "horizontal" })
              }, [
                vueExports.unref(props).orientation === "horizontal" && (vueExports.unref(props).actions?.length || !!slots.actions) ? vueExports.renderSlot(_ctx.$slots, "actions", { key: 0 }, () => [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(props).actions, (action, index) => {
                    return vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                      key: index,
                      size: "xs"
                    }, { ref_for: true }, action), null, 16);
                  }), 128))
                ]) : vueExports.createCommentVNode("", true),
                vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                  vueExports.unref(props).close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                    key: 0,
                    icon: vueExports.unref(props).closeIcon || vueExports.unref(appConfig).ui.icons.close,
                    color: "neutral",
                    variant: "link",
                    "aria-label": vueExports.unref(t)("alert.close")
                  }, typeof vueExports.unref(props).close === "object" ? vueExports.unref(props).close : {}, {
                    "data-slot": "close",
                    class: ui.value.close({ class: vueExports.unref(props).ui?.close }),
                    onClick: ($event) => emits("update:open", false)
                  }), null, 16, ["icon", "aria-label", "class", "onClick"])) : vueExports.createCommentVNode("", true)
                ])
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/Alert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Alert-CsIjDkc0.mjs.map
