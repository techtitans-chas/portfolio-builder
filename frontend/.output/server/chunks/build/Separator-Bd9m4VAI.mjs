import { ac as useComponentProps, a8 as useAppConfig, ak as useForwardProps, $ as reactivePick, p as createReusableTemplate, a5 as tv, j as _sfc_main$d, h as _sfc_main$b, b as Primitive } from './server.mjs';
import { o as vueExports, f as ssrRenderComponent_1, e as ssrRenderClass_1, i as ssrRenderSlot_1, a as ssrInterpolate_1 } from '../routes/renderer.mjs';

var BaseSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "BaseSeparator",
  props: {
    orientation: {
      type: String,
      required: false,
      default: "horizontal"
    },
    decorative: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const ORIENTATIONS = ["horizontal", "vertical"];
    function isValidOrientation(orientation) {
      return ORIENTATIONS.includes(orientation);
    }
    const computedOrientation = vueExports.computed(() => isValidOrientation(props.orientation) ? props.orientation : "horizontal");
    const ariaOrientation = vueExports.computed(() => computedOrientation.value === "vertical" ? props.orientation : void 0);
    const semanticProps = vueExports.computed(() => props.decorative ? { role: "none" } : {
      "aria-orientation": ariaOrientation.value,
      "role": "separator"
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-orientation": computedOrientation.value
      }, semanticProps.value), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "data-orientation"
      ]);
    };
  }
});
var BaseSeparator_default = BaseSeparator_vue_vue_type_script_setup_true_lang_default;
var Separator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Separator",
  props: {
    orientation: {
      type: String,
      required: false,
      default: "horizontal"
    },
    decorative: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(BaseSeparator_default, vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var Separator_default = Separator_vue_vue_type_script_setup_true_lang_default;
const theme = {
  "slots": {
    "root": "flex items-center align-center text-center",
    "border": "",
    "container": "font-medium text-default flex",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xs",
    "label": "text-sm"
  },
  "variants": {
    "color": {
      "primary": {
        "border": "border-primary"
      },
      "secondary": {
        "border": "border-secondary"
      },
      "success": {
        "border": "border-success"
      },
      "info": {
        "border": "border-info"
      },
      "warning": {
        "border": "border-warning"
      },
      "error": {
        "border": "border-error"
      },
      "neutral": {
        "border": "border-default"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex-row",
        "border": "w-full",
        "container": "whitespace-nowrap"
      },
      "vertical": {
        "root": "h-full flex-col",
        "border": "h-full",
        "container": ""
      }
    },
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "position": {
      "start": "",
      "center": "",
      "end": ""
    },
    "type": {
      "solid": {
        "border": "border-solid"
      },
      "dashed": {
        "border": "border-dashed"
      },
      "dotted": {
        "border": "border-dotted"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "position": "start",
      "class": {
        "container": "me-3"
      }
    },
    {
      "orientation": "horizontal",
      "position": "center",
      "class": {
        "container": "mx-3"
      }
    },
    {
      "orientation": "horizontal",
      "position": "end",
      "class": {
        "container": "ms-3"
      }
    },
    {
      "orientation": "vertical",
      "position": "start",
      "class": {
        "container": "mb-2"
      }
    },
    {
      "orientation": "vertical",
      "position": "center",
      "class": {
        "container": "my-2"
      }
    },
    {
      "orientation": "vertical",
      "position": "end",
      "class": {
        "container": "mt-2"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "border": "border-t"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "border": "border-t-[2px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "border": "border-t-[3px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "border": "border-t-[4px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "border": "border-t-[5px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "border": "border-s"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "border": "border-s-[2px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "border": "border-s-[3px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "border": "border-s-[4px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "border": "border-s-[5px]"
      }
    }
  ],
  "defaultVariants": {
    "color": "neutral",
    "size": "xs",
    "type": "solid"
  }
};
const _sfc_main = {
  __name: "USeparator",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    label: { type: String, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    type: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    position: { type: null, required: false, default: "center" },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    decorative: { type: Boolean, required: false }
  },
  setup(__props) {
    const _props = __props;
    const slots = vueExports.useSlots();
    const props = useComponentProps("separator", _props);
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "as", "decorative", "orientation"));
    const [DefineContainer, ReuseContainer] = createReusableTemplate();
    const hasContent = vueExports.computed(() => !!(props.label || props.icon || props.avatar || slots.default));
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.separator || {} })({
      color: props.color,
      orientation: props.orientation,
      size: props.size,
      position: props.position,
      type: props.type
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineContainer), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="container" class="${ssrRenderClass_1(ui.value.container({ class: vueExports.unref(props).ui?.container }))}"${_scopeId}>`);
            ssrRenderSlot_1(_ctx.$slots, "default", { ui: ui.value }, () => {
              if (vueExports.unref(props).label) {
                _push2(`<span data-slot="label" class="${ssrRenderClass_1(ui.value.label({ class: vueExports.unref(props).ui?.label }))}"${_scopeId}>${ssrInterpolate_1(vueExports.unref(props).label)}</span>`);
              } else if (vueExports.unref(props).icon) {
                _push2(ssrRenderComponent_1(_sfc_main$d, {
                  name: vueExports.unref(props).icon,
                  "data-slot": "icon",
                  class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                }, null, _parent2, _scopeId));
              } else if (vueExports.unref(props).avatar) {
                _push2(ssrRenderComponent_1(_sfc_main$b, vueExports.mergeProps({
                  size: vueExports.unref(props).ui?.avatarSize || ui.value.avatarSize()
                }, vueExports.unref(props).avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: vueExports.unref(props).ui?.avatar })
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                "data-slot": "container",
                class: ui.value.container({ class: vueExports.unref(props).ui?.container })
              }, [
                vueExports.renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                  vueExports.unref(props).label ? (vueExports.openBlock(), vueExports.createBlock("span", {
                    key: 0,
                    "data-slot": "label",
                    class: ui.value.label({ class: vueExports.unref(props).ui?.label })
                  }, vueExports.toDisplayString(vueExports.unref(props).label), 3)) : vueExports.unref(props).icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                    key: 1,
                    name: vueExports.unref(props).icon,
                    "data-slot": "icon",
                    class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                  }, null, 8, ["name", "class"])) : vueExports.unref(props).avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                    key: 2,
                    size: vueExports.unref(props).ui?.avatarSize || ui.value.avatarSize()
                  }, vueExports.unref(props).avatar, {
                    "data-slot": "avatar",
                    class: ui.value.avatar({ class: vueExports.unref(props).ui?.avatar })
                  }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                ])
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(Separator_default), vueExports.mergeProps(vueExports.unref(rootProps), {
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] })
      }), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (hasContent.value && vueExports.unref(props).position === "start") {
              _push2(ssrRenderComponent_1(vueExports.unref(ReuseContainer), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-slot="border" class="${ssrRenderClass_1(ui.value.border({ class: vueExports.unref(props).ui?.border }))}"${_scopeId}></div>`);
            if (hasContent.value && vueExports.unref(props).position === "center") {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent_1(vueExports.unref(ReuseContainer), null, null, _parent2, _scopeId));
              _push2(`<div data-slot="border" class="${ssrRenderClass_1(ui.value.border({ class: vueExports.unref(props).ui?.border }))}"${_scopeId}></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            if (hasContent.value && vueExports.unref(props).position === "end") {
              _push2(ssrRenderComponent_1(vueExports.unref(ReuseContainer), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              hasContent.value && vueExports.unref(props).position === "start" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseContainer), { key: 0 })) : vueExports.createCommentVNode("", true),
              vueExports.createVNode("div", {
                "data-slot": "border",
                class: ui.value.border({ class: vueExports.unref(props).ui?.border })
              }, null, 2),
              hasContent.value && vueExports.unref(props).position === "center" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                vueExports.createVNode(vueExports.unref(ReuseContainer)),
                vueExports.createVNode("div", {
                  "data-slot": "border",
                  class: ui.value.border({ class: vueExports.unref(props).ui?.border })
                }, null, 2)
              ], 64)) : vueExports.createCommentVNode("", true),
              hasContent.value && vueExports.unref(props).position === "end" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseContainer), { key: 2 })) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/Separator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Separator-Bd9m4VAI.mjs.map
