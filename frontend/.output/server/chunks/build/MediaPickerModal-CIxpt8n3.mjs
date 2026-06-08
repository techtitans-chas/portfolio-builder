import { aO as vueExports, an as useComponentProps, aj as useAppConfig, av as useForwardProps, $ as reactivePick, at as useFormField, ag as tv, a7 as ssrRenderComponent_1, b as Primitive, a6 as ssrRenderClass_1, j as _sfc_main$d, a9 as ssrRenderSlot_1, a3 as ssrInterpolate_1, aM as useVModel, am as useComponentIcons, a5 as ssrRenderAttrs_1, h as _sfc_main$b, au as useForwardExpose, a8 as ssrRenderList_1, aa as ssrRenderStyle_1, e as _sfc_main$8, a4 as ssrRenderAttr_1, l as createContext, R as looseToNumber, aC as usePrimitiveElement, V as VisuallyHidden_default } from './server.mjs';
import { L as Label_default } from './FormField-9wkfNHPa.mjs';
import { u as useFormControl, b as useMedia, _ as __nuxt_component_2 } from './MediaGrid-DBtVJH5B.mjs';
import { _ as _sfc_main$3 } from './Modal-D9bZkufO.mjs';
import { u as useServerFeatures } from './useServerFeatures-DOIxALfL.mjs';

var VisuallyHiddenInputBubble_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "VisuallyHiddenInputBubble",
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: null,
      required: true
    },
    checked: {
      type: Boolean,
      required: false,
      default: void 0
    },
    required: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    feature: {
      type: String,
      required: false,
      default: "fully-hidden"
    }
  },
  setup(__props) {
    const props = __props;
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const valueState = vueExports.computed(() => props.checked ?? props.value);
    vueExports.watch(valueState, (cur, prev) => {
      if (!currentElement.value) return;
      const input = currentElement.value;
      const inputProto = (void 0).HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, "value");
      const setValue = descriptor.set;
      if (setValue && cur !== prev) {
        const inputEvent = new Event("input", { bubbles: true });
        const changeEvent = new Event("change", { bubbles: true });
        setValue.call(input, cur);
        input.dispatchEvent(inputEvent);
        input.dispatchEvent(changeEvent);
      }
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(VisuallyHidden_default, vueExports.mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement
      }, {
        ...props,
        ..._ctx.$attrs
      }, { as: "input" }), null, 16);
    };
  }
});
var VisuallyHiddenInputBubble_default = VisuallyHiddenInputBubble_vue_vue_type_script_setup_true_lang_default;
var VisuallyHiddenInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "VisuallyHiddenInput",
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: null,
      required: true
    },
    checked: {
      type: Boolean,
      required: false,
      default: void 0
    },
    required: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    feature: {
      type: String,
      required: false,
      default: "fully-hidden"
    }
  },
  setup(__props) {
    const props = __props;
    const isFormArrayEmptyAndRequired = vueExports.computed(() => typeof props.value === "object" && Array.isArray(props.value) && props.value.length === 0 && props.required);
    const parsedValue = vueExports.computed(() => {
      if (typeof props.value === "string" || typeof props.value === "number" || typeof props.value === "boolean" || props.value === null || props.value === void 0) return [{
        name: props.name,
        value: props.value
      }];
      else if (typeof props.value === "object" && Array.isArray(props.value)) return props.value.flatMap((obj, index) => {
        if (typeof obj === "object") return Object.entries(obj).map(([key, value]) => ({
          name: `${props.name}[${index}][${key}]`,
          value
        }));
        else return {
          name: `${props.name}[${index}]`,
          value: obj
        };
      });
      else if (props.value !== null && typeof props.value === "object" && !Array.isArray(props.value)) return Object.entries(props.value).map(([key, value]) => ({
        name: `${props.name}[${key}]`,
        value
      }));
      return [];
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createElementBlock(vueExports.Fragment, null, [vueExports.createCommentVNode(" We render single input if it's required "), isFormArrayEmptyAndRequired.value ? (vueExports.openBlock(), vueExports.createBlock(VisuallyHiddenInputBubble_default, vueExports.mergeProps({ key: _ctx.name }, {
        ...props,
        ..._ctx.$attrs
      }, {
        name: _ctx.name,
        value: _ctx.value
      }), null, 16, ["name", "value"])) : (vueExports.openBlock(true), vueExports.createElementBlock(vueExports.Fragment, { key: 1 }, vueExports.renderList(parsedValue.value, (parsed) => {
        return vueExports.openBlock(), vueExports.createBlock(VisuallyHiddenInputBubble_default, vueExports.mergeProps({ key: parsed.name }, { ref_for: true }, {
          ...props,
          ..._ctx.$attrs
        }, {
          name: parsed.name,
          value: parsed.value
        }), null, 16, ["name", "value"]);
      }), 128))], 2112);
    };
  }
});
var VisuallyHiddenInput_default = VisuallyHiddenInput_vue_vue_type_script_setup_true_lang_default;
const [injectSwitchRootContext, provideSwitchRootContext] = /* @__PURE__ */ createContext("SwitchRoot");
var SwitchRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SwitchRoot",
  props: {
    defaultValue: {
      type: null,
      required: false
    },
    modelValue: {
      type: null,
      required: false,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: false
    },
    id: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false,
      default: "on"
    },
    trueValue: {
      type: null,
      required: false,
      default: () => true
    },
    falseValue: {
      type: null,
      required: false,
      default: () => false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "button"
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { disabled } = vueExports.toRefs(props);
    const modelValue = useVModel(props, "modelValue", emit, {
      defaultValue: props.defaultValue ?? props.falseValue,
      passive: props.modelValue === void 0
    });
    const checked = vueExports.computed(() => modelValue.value === props.trueValue);
    function toggleCheck() {
      if (disabled.value) return;
      modelValue.value = checked.value ? props.falseValue : props.trueValue;
    }
    const { forwardRef, currentElement } = useForwardExpose();
    const isFormControl = useFormControl(currentElement);
    const ariaLabel = vueExports.computed(() => props.id && currentElement.value ? (void 0).querySelector(`[for="${props.id}"]`)?.innerText : void 0);
    provideSwitchRootContext({
      checked,
      toggleCheck,
      disabled
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: vueExports.unref(forwardRef),
        role: "switch",
        type: _ctx.as === "button" ? "button" : void 0,
        value: _ctx.value,
        "aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
        "aria-checked": checked.value,
        "aria-required": _ctx.required,
        "data-state": checked.value ? "checked" : "unchecked",
        "data-disabled": vueExports.unref(disabled) ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as,
        disabled: vueExports.unref(disabled),
        onClick: toggleCheck,
        onKeydown: vueExports.withKeys(vueExports.withModifiers(toggleCheck, ["prevent"]), ["enter"])
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {
          modelValue: vueExports.unref(modelValue),
          checked: checked.value
        }), vueExports.unref(isFormControl) && _ctx.name ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHiddenInput_default), {
          key: 0,
          type: "checkbox",
          name: _ctx.name,
          disabled: vueExports.unref(disabled),
          required: _ctx.required,
          value: _ctx.value,
          checked: checked.value
        }, null, 8, [
          "name",
          "disabled",
          "required",
          "value",
          "checked"
        ])) : vueExports.createCommentVNode("v-if", true)]),
        _: 3
      }, 16, [
        "id",
        "type",
        "value",
        "aria-label",
        "aria-checked",
        "aria-required",
        "data-state",
        "data-disabled",
        "as-child",
        "as",
        "disabled",
        "onKeydown"
      ]);
    };
  }
});
var SwitchRoot_default = SwitchRoot_vue_vue_type_script_setup_true_lang_default;
var SwitchThumb_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SwitchThumb",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const rootContext = injectSwitchRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        "data-state": vueExports.unref(rootContext).checked.value ? "checked" : "unchecked",
        "data-disabled": vueExports.unref(rootContext).disabled.value ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "data-state",
        "data-disabled",
        "as-child",
        "as"
      ]);
    };
  }
});
var SwitchThumb_default = SwitchThumb_vue_vue_type_script_setup_true_lang_default;
const theme$1 = {
  "slots": {
    "root": "relative flex items-start",
    "base": [
      "inline-flex items-center shrink-0 rounded-full border-2 border-transparent focus-visible:outline-2 focus-visible:outline-offset-2 data-[state=unchecked]:bg-accented",
      "transition-[background] duration-200"
    ],
    "container": "flex items-center",
    "thumb": "group pointer-events-none rounded-full bg-default shadow-lg ring-0 transition-transform duration-200 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:-translate-x-0 flex items-center justify-center",
    "icon": [
      "absolute shrink-0 group-data-[state=unchecked]:text-dimmed opacity-0 size-10/12",
      "transition-[color,opacity] duration-200"
    ],
    "wrapper": "ms-2",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "data-[state=checked]:bg-primary focus-visible:outline-primary",
        "icon": "group-data-[state=checked]:text-primary"
      },
      "secondary": {
        "base": "data-[state=checked]:bg-secondary focus-visible:outline-secondary",
        "icon": "group-data-[state=checked]:text-secondary"
      },
      "success": {
        "base": "data-[state=checked]:bg-success focus-visible:outline-success",
        "icon": "group-data-[state=checked]:text-success"
      },
      "info": {
        "base": "data-[state=checked]:bg-info focus-visible:outline-info",
        "icon": "group-data-[state=checked]:text-info"
      },
      "warning": {
        "base": "data-[state=checked]:bg-warning focus-visible:outline-warning",
        "icon": "group-data-[state=checked]:text-warning"
      },
      "error": {
        "base": "data-[state=checked]:bg-error focus-visible:outline-error",
        "icon": "group-data-[state=checked]:text-error"
      },
      "neutral": {
        "base": "data-[state=checked]:bg-inverted focus-visible:outline-inverted",
        "icon": "group-data-[state=checked]:text-highlighted"
      }
    },
    "size": {
      "xs": {
        "base": "w-7",
        "container": "h-4",
        "thumb": "size-3 data-[state=checked]:translate-x-3 data-[state=checked]:rtl:-translate-x-3",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "w-8",
        "container": "h-4",
        "thumb": "size-3.5 data-[state=checked]:translate-x-3.5 data-[state=checked]:rtl:-translate-x-3.5",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "w-9",
        "container": "h-5",
        "thumb": "size-4 data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "w-10",
        "container": "h-5",
        "thumb": "size-4.5 data-[state=checked]:translate-x-4.5 data-[state=checked]:rtl:-translate-x-4.5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "w-11",
        "container": "h-6",
        "thumb": "size-5 data-[state=checked]:translate-x-5 data-[state=checked]:rtl:-translate-x-5",
        "wrapper": "text-base"
      }
    },
    "checked": {
      "true": {
        "icon": "group-data-[state=checked]:opacity-100"
      }
    },
    "unchecked": {
      "true": {
        "icon": "group-data-[state=unchecked]:opacity-100"
      }
    },
    "loading": {
      "true": {
        "icon": "animate-spin"
      }
    },
    "highlight": {
      "true": ""
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75",
        "base": "cursor-not-allowed",
        "label": "cursor-not-allowed",
        "description": "cursor-not-allowed"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "highlight": true,
      "class": {
        "base": "ring ring-primary"
      }
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": {
        "base": "ring ring-secondary"
      }
    },
    {
      "color": "success",
      "highlight": true,
      "class": {
        "base": "ring ring-success"
      }
    },
    {
      "color": "info",
      "highlight": true,
      "class": {
        "base": "ring ring-info"
      }
    },
    {
      "color": "warning",
      "highlight": true,
      "class": {
        "base": "ring ring-warning"
      }
    },
    {
      "color": "error",
      "highlight": true,
      "class": {
        "base": "ring ring-error"
      }
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": {
        "base": "ring ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "size": "md"
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USwitch",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    highlight: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    checkedIcon: { type: null, required: false },
    uncheckedIcon: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    disabled: { type: Boolean, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    value: { type: String, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    trueValue: { type: null, required: false },
    falseValue: { type: null, required: false }
  },
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const slots = vueExports.useSlots();
    const emits = __emit;
    const props = useComponentProps("switch", _props);
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue", "modelValue", "trueValue", "falseValue"), emits);
    const { id: _id, emitFormChange, emitFormInput, size, color, highlight, name, disabled, ariaAttrs } = useFormField(_props);
    const id = _id.value ?? vueExports.useId();
    const attrs = vueExports.useAttrs();
    const forwardedAttrs = vueExports.computed(() => {
      const { "data-state": _, ...rest } = attrs;
      return rest;
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.switch || {} })({
      size: size.value ?? props.size,
      color: color.value ?? props.color,
      highlight: highlight.value ?? props.highlight,
      required: props.required,
      loading: props.loading,
      disabled: disabled.value || props.loading
    }));
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: vueExports.unref(props).as,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="container" class="${ssrRenderClass_1(ui.value.container({ class: vueExports.unref(props).ui?.container }))}"${_scopeId}>`);
            _push2(ssrRenderComponent_1(vueExports.unref(SwitchRoot_default), vueExports.mergeProps({ id: vueExports.unref(id) }, { ...vueExports.unref(rootProps), ...forwardedAttrs.value, ...vueExports.unref(ariaAttrs) }, {
              name: vueExports.unref(name),
              disabled: vueExports.unref(disabled) || vueExports.unref(props).loading,
              "data-slot": "base",
              class: ui.value.base({ class: vueExports.unref(props).ui?.base }),
              "onUpdate:modelValue": onUpdate
            }), {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(SwitchThumb_default), {
                    "data-slot": "thumb",
                    class: ui.value.thumb({ class: vueExports.unref(props).ui?.thumb })
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (vueExports.unref(props).loading) {
                          _push4(ssrRenderComponent_1(_sfc_main$d, {
                            name: vueExports.unref(props).loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, checked: true, unchecked: true })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!--[-->`);
                          if (vueExports.unref(props).checkedIcon) {
                            _push4(ssrRenderComponent_1(_sfc_main$d, {
                              name: vueExports.unref(props).checkedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, checked: true })
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          if (vueExports.unref(props).uncheckedIcon) {
                            _push4(ssrRenderComponent_1(_sfc_main$d, {
                              name: vueExports.unref(props).uncheckedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, unchecked: true })
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--]-->`);
                        }
                      } else {
                        return [
                          vueExports.unref(props).loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: vueExports.unref(props).loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, checked: true, unchecked: true })
                          }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                            vueExports.unref(props).checkedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                              key: 0,
                              name: vueExports.unref(props).checkedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, checked: true })
                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                            vueExports.unref(props).uncheckedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                              key: 1,
                              name: vueExports.unref(props).uncheckedIcon,
                              "data-slot": "icon",
                              class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, unchecked: true })
                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                          ], 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(SwitchThumb_default), {
                      "data-slot": "thumb",
                      class: ui.value.thumb({ class: vueExports.unref(props).ui?.thumb })
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.unref(props).loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                          key: 0,
                          name: vueExports.unref(props).loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, checked: true, unchecked: true })
                        }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                          vueExports.unref(props).checkedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: vueExports.unref(props).checkedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, checked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                          vueExports.unref(props).uncheckedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 1,
                            name: vueExports.unref(props).uncheckedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, unchecked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                        ], 64))
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (vueExports.unref(props).label || !!slots.label || (vueExports.unref(props).description || !!slots.description)) {
              _push2(`<div data-slot="wrapper" class="${ssrRenderClass_1(ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper }))}"${_scopeId}>`);
              if (vueExports.unref(props).label || !!slots.label) {
                _push2(ssrRenderComponent_1(vueExports.unref(Label_default), {
                  for: vueExports.unref(id),
                  "data-slot": "label",
                  class: ui.value.label({ class: vueExports.unref(props).ui?.label })
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot_1(_ctx.$slots, "label", {
                        label: vueExports.unref(props).label
                      }, () => {
                        _push3(`${ssrInterpolate_1(vueExports.unref(props).label)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        vueExports.renderSlot(_ctx.$slots, "label", {
                          label: vueExports.unref(props).label
                        }, () => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).label), 1)
                        ])
                      ];
                    }
                  }),
                  _: 3
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (vueExports.unref(props).description || !!slots.description) {
                _push2(`<p data-slot="description" class="${ssrRenderClass_1(ui.value.description({ class: vueExports.unref(props).ui?.description }))}"${_scopeId}>`);
                ssrRenderSlot_1(_ctx.$slots, "description", {
                  description: vueExports.unref(props).description
                }, () => {
                  _push2(`${ssrInterpolate_1(vueExports.unref(props).description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.createVNode("div", {
                "data-slot": "container",
                class: ui.value.container({ class: vueExports.unref(props).ui?.container })
              }, [
                vueExports.createVNode(vueExports.unref(SwitchRoot_default), vueExports.mergeProps({ id: vueExports.unref(id) }, { ...vueExports.unref(rootProps), ...forwardedAttrs.value, ...vueExports.unref(ariaAttrs) }, {
                  name: vueExports.unref(name),
                  disabled: vueExports.unref(disabled) || vueExports.unref(props).loading,
                  "data-slot": "base",
                  class: ui.value.base({ class: vueExports.unref(props).ui?.base }),
                  "onUpdate:modelValue": onUpdate
                }), {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(vueExports.unref(SwitchThumb_default), {
                      "data-slot": "thumb",
                      class: ui.value.thumb({ class: vueExports.unref(props).ui?.thumb })
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.unref(props).loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                          key: 0,
                          name: vueExports.unref(props).loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, checked: true, unchecked: true })
                        }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                          vueExports.unref(props).checkedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 0,
                            name: vueExports.unref(props).checkedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, checked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                          vueExports.unref(props).uncheckedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 1,
                            name: vueExports.unref(props).uncheckedIcon,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(props).ui?.icon, unchecked: true })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                        ], 64))
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ]),
                  _: 1
                }, 16, ["id", "name", "disabled", "class"])
              ], 2),
              vueExports.unref(props).label || !!slots.label || (vueExports.unref(props).description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper })
              }, [
                vueExports.unref(props).label || !!slots.label ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Label_default), {
                  key: 0,
                  for: vueExports.unref(id),
                  "data-slot": "label",
                  class: ui.value.label({ class: vueExports.unref(props).ui?.label })
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.renderSlot(_ctx.$slots, "label", {
                      label: vueExports.unref(props).label
                    }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).label), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["for", "class"])) : vueExports.createCommentVNode("", true),
                vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "description", {
                    description: vueExports.unref(props).description
                  }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                  ])
                ], 2)) : vueExports.createCommentVNode("", true)
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/Switch.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute start-0 flex items-start",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute end-0 flex items-start",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-sm/4 gap-1",
        "leading": "ps-2 inset-y-1",
        "trailing": "pe-2 inset-y-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-sm/4 gap-1.5",
        "leading": "ps-2.5 inset-y-1.5",
        "trailing": "pe-2.5 inset-y-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-base/5 gap-1.5",
        "leading": "ps-2.5 inset-y-1.5",
        "trailing": "pe-2.5 inset-y-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-base/5 gap-2",
        "leading": "ps-3 inset-y-2",
        "trailing": "pe-3 inset-y-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3 inset-y-2",
        "trailing": "pe-3 inset-y-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "autoresize": {
      "true": {
        "base": "resize-none"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    },
    {
      "fixed": false,
      "size": "xs",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md",
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg",
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UTextarea",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    autoresize: { type: Boolean, required: false },
    autoresizeDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    rows: { type: Number, required: false, default: 3 },
    maxrows: { type: Number, required: false, default: 0 },
    highlight: { type: Boolean, required: false },
    fixed: { type: Boolean, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    modelModifiers: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const props = useComponentProps("textarea", _props);
    const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig = useAppConfig();
    const { emitFormFocus, emitFormBlur, emitFormInput, emitFormChange, size, color, id, name, highlight, disabled, ariaAttrs } = useFormField(_props, { deferInputValidation: true });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.textarea || {} })({
      color: color.value ?? props.color,
      variant: props.variant,
      size: size?.value ?? props.size,
      loading: props.loading,
      highlight: highlight.value ?? props.highlight,
      fixed: props.fixed,
      autoresize: props.autoresize,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing
    }));
    const textareaRef = vueExports.useTemplateRef("textareaRef");
    function updateInput(value) {
      if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number) {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullable) {
        value ||= null;
      }
      if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
        value ||= void 0;
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      autoResize();
      if (!props.modelModifiers?.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (props.modelModifiers?.lazy) {
        updateInput(value);
      }
      if (props.modelModifiers?.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    function autoResize() {
      if (props.autoresize && textareaRef.value) {
        textareaRef.value.rows = props.rows;
        const overflow = textareaRef.value.style.overflow;
        textareaRef.value.style.overflow = "hidden";
        const styles = (void 0).getComputedStyle(textareaRef.value);
        const paddingTop = Number.parseInt(styles.paddingTop);
        const paddingBottom = Number.parseInt(styles.paddingBottom);
        const padding = paddingTop + paddingBottom;
        const lineHeight = Number.parseInt(styles.lineHeight);
        const { scrollHeight } = textareaRef.value;
        const newRows = (scrollHeight - padding) / lineHeight;
        if (newRows > props.rows) {
          textareaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
        }
        textareaRef.value.style.overflow = overflow;
      }
    }
    vueExports.watch(modelValue, () => {
      vueExports.nextTick(autoResize);
    });
    __expose({
      textareaRef,
      autoResize
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: vueExports.unref(props).as,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<textarea${ssrRenderAttrs_1(_temp0 = vueExports.mergeProps({
              id: vueExports.unref(id),
              ref_key: "textareaRef",
              ref: textareaRef,
              value: vueExports.unref(modelValue),
              name: vueExports.unref(name),
              rows: vueExports.unref(props).rows,
              placeholder: vueExports.unref(props).placeholder,
              "data-slot": "base",
              class: ui.value.base({ class: vueExports.unref(props).ui?.base }),
              disabled: vueExports.unref(disabled),
              required: vueExports.unref(props).required
            }, { ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }), "textarea")}${_scopeId}>${ssrInterpolate_1("value" in _temp0 ? _temp0.value : "")}</textarea>`);
            ssrRenderSlot_1(_ctx.$slots, "default", { ui: ui.value }, null, _push2, _parent2, _scopeId);
            if (vueExports.unref(isLeading) || !!vueExports.unref(props).avatar || !!slots.leading) {
              _push2(`<span data-slot="leading" class="${ssrRenderClass_1(ui.value.leading({ class: vueExports.unref(props).ui?.leading }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "leading", { ui: ui.value }, () => {
                if (vueExports.unref(isLeading) && vueExports.unref(leadingIconName)) {
                  _push2(ssrRenderComponent_1(_sfc_main$d, {
                    name: vueExports.unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: vueExports.unref(props).ui?.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!vueExports.unref(props).avatar) {
                  _push2(ssrRenderComponent_1(_sfc_main$b, vueExports.mergeProps({
                    size: vueExports.unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, vueExports.unref(props).avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: vueExports.unref(props).ui?.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(isTrailing) || !!slots.trailing) {
              _push2(`<span data-slot="trailing" class="${ssrRenderClass_1(ui.value.trailing({ class: vueExports.unref(props).ui?.trailing }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                if (vueExports.unref(trailingIconName)) {
                  _push2(ssrRenderComponent_1(_sfc_main$d, {
                    name: vueExports.unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: vueExports.unref(props).ui?.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.createVNode("textarea", vueExports.mergeProps({
                id: vueExports.unref(id),
                ref_key: "textareaRef",
                ref: textareaRef,
                value: vueExports.unref(modelValue),
                name: vueExports.unref(name),
                rows: vueExports.unref(props).rows,
                placeholder: vueExports.unref(props).placeholder,
                "data-slot": "base",
                class: ui.value.base({ class: vueExports.unref(props).ui?.base }),
                disabled: vueExports.unref(disabled),
                required: vueExports.unref(props).required
              }, { ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: vueExports.unref(emitFormFocus)
              }), null, 16, ["id", "value", "name", "rows", "placeholder", "disabled", "required", "onFocus"]),
              vueExports.renderSlot(_ctx.$slots, "default", { ui: ui.value }),
              vueExports.unref(isLeading) || !!vueExports.unref(props).avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                key: 0,
                "data-slot": "leading",
                class: ui.value.leading({ class: vueExports.unref(props).ui?.leading })
              }, [
                vueExports.renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                  vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                    key: 0,
                    name: vueExports.unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: vueExports.unref(props).ui?.leadingIcon })
                  }, null, 8, ["name", "class"])) : !!vueExports.unref(props).avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                    key: 1,
                    size: vueExports.unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, vueExports.unref(props).avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: vueExports.unref(props).ui?.leadingAvatar })
                  }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                ])
              ], 2)) : vueExports.createCommentVNode("", true),
              vueExports.unref(isTrailing) || !!slots.trailing ? (vueExports.openBlock(), vueExports.createBlock("span", {
                key: 1,
                "data-slot": "trailing",
                class: ui.value.trailing({ class: vueExports.unref(props).ui?.trailing })
              }, [
                vueExports.renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                  vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                    key: 0,
                    name: vueExports.unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: vueExports.unref(props).ui?.trailingIcon })
                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                ])
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/Textarea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "MediaPickerModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    selectedUrl: {},
    imagesOnly: { type: Boolean }
  },
  emits: ["update:open", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { features } = useServerFeatures();
    const { allowedTypes, handleFiles, uploadQueue, uploading, clearUploadQueue } = useMedia();
    const fileInput = vueExports.ref(null);
    const showProgress = vueExports.ref(false);
    const title = vueExports.computed(() => props.imagesOnly ? "Choose image" : "Choose file");
    const acceptTypes = vueExports.computed(
      () => props.imagesOnly ? allowedTypes.filter((t) => t.startsWith("image/")) : allowedTypes
    );
    const uploadDone = vueExports.computed(() => showProgress.value && !uploading.value);
    function close() {
      emit("update:open", false);
    }
    function onSelect(url) {
      emit("select", url);
      close();
    }
    function dismissProgress() {
      showProgress.value = false;
      clearUploadQueue();
    }
    async function onFileInput(e) {
      const input = e.target;
      if (!input.files?.length) return;
      showProgress.value = true;
      await handleFiles(input.files);
      input.value = "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$3;
      const _component_AdminMediaGrid = __nuxt_component_2;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent_1(_component_UModal, vueExports.mergeProps({
        open: __props.open,
        title: vueExports.unref(title),
        ui: { content: "max-w-2xl" },
        "onUpdate:open": ($event) => emit("update:open", $event)
      }, _attrs), {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_AdminMediaGrid, {
              "select-mode": "",
              "images-only": __props.imagesOnly,
              "selected-url": __props.selectedUrl,
              onSelect
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_AdminMediaGrid, {
                "select-mode": "",
                "images-only": __props.imagesOnly,
                "selected-url": __props.selectedUrl,
                onSelect
              }, null, 8, ["images-only", "selected-url"])
            ];
          }
        }),
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-3 w-full"${_scopeId}>`);
            if (vueExports.unref(showProgress) && vueExports.unref(uploadQueue).length > 0) {
              _push2(`<div class="rounded-lg border border-default bg-elevated p-3 space-y-2"${_scopeId}><ul class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(uploadQueue), (entry) => {
                _push2(`<li class="space-y-1"${_scopeId}><div class="flex items-center justify-between text-xs"${_scopeId}><span class="truncate max-w-[75%] font-medium"${_scopeId}>${ssrInterpolate_1(entry.file.name)}</span><span class="shrink-0 ml-2 text-muted"${_scopeId}>`);
                if (entry.status === "done") {
                  _push2(ssrRenderComponent_1(_component_UIcon, {
                    name: "i-lucide-check",
                    class: "w-3.5 h-3.5 text-success"
                  }, null, _parent2, _scopeId));
                } else if (entry.status === "error") {
                  _push2(ssrRenderComponent_1(_component_UIcon, {
                    name: "i-lucide-x",
                    class: "w-3.5 h-3.5 text-error"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<span${_scopeId}>${ssrInterpolate_1(entry.progress)}%</span>`);
                }
                _push2(`</span></div><div class="h-1 rounded-full bg-muted overflow-hidden"${_scopeId}><div class="${ssrRenderClass_1([entry.status === "error" ? "bg-error" : "bg-primary", "h-full rounded-full transition-all duration-200"])}" style="${ssrRenderStyle_1({ width: `${entry.progress}%` })}"${_scopeId}></div></div>`);
                if (entry.error) {
                  _push2(`<p class="text-xs text-error"${_scopeId}>${ssrInterpolate_1(entry.error)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul>`);
              if (vueExports.unref(uploadDone)) {
                _push2(`<div class="flex justify-end pt-1"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UButton, {
                  size: "xs",
                  variant: "subtle",
                  color: "neutral",
                  onClick: dismissProgress
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Dismiss `);
                    } else {
                      return [
                        vueExports.createTextVNode(" Dismiss ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-end"${_scopeId}>`);
            if (vueExports.unref(features).storage) {
              _push2(ssrRenderComponent_1(_component_UButton, {
                variant: "outline",
                icon: "i-lucide-upload",
                size: "sm",
                loading: vueExports.unref(uploading),
                disabled: vueExports.unref(uploading),
                onClick: ($event) => vueExports.unref(fileInput)?.click()
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Upload new `);
                  } else {
                    return [
                      vueExports.createTextVNode(" Upload new ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input type="file" multiple${ssrRenderAttr_1("accept", vueExports.unref(acceptTypes).join(","))} class="hidden"${_scopeId}></div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex flex-col gap-3 w-full" }, [
                vueExports.unref(showProgress) && vueExports.unref(uploadQueue).length > 0 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "rounded-lg border border-default bg-elevated p-3 space-y-2"
                }, [
                  vueExports.createVNode("ul", { class: "space-y-2" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(uploadQueue), (entry) => {
                      return vueExports.openBlock(), vueExports.createBlock("li", {
                        key: entry.file.name,
                        class: "space-y-1"
                      }, [
                        vueExports.createVNode("div", { class: "flex items-center justify-between text-xs" }, [
                          vueExports.createVNode("span", { class: "truncate max-w-[75%] font-medium" }, vueExports.toDisplayString(entry.file.name), 1),
                          vueExports.createVNode("span", { class: "shrink-0 ml-2 text-muted" }, [
                            entry.status === "done" ? (vueExports.openBlock(), vueExports.createBlock(_component_UIcon, {
                              key: 0,
                              name: "i-lucide-check",
                              class: "w-3.5 h-3.5 text-success"
                            })) : entry.status === "error" ? (vueExports.openBlock(), vueExports.createBlock(_component_UIcon, {
                              key: 1,
                              name: "i-lucide-x",
                              class: "w-3.5 h-3.5 text-error"
                            })) : (vueExports.openBlock(), vueExports.createBlock("span", { key: 2 }, vueExports.toDisplayString(entry.progress) + "%", 1))
                          ])
                        ]),
                        vueExports.createVNode("div", { class: "h-1 rounded-full bg-muted overflow-hidden" }, [
                          vueExports.createVNode("div", {
                            class: ["h-full rounded-full transition-all duration-200", entry.status === "error" ? "bg-error" : "bg-primary"],
                            style: { width: `${entry.progress}%` }
                          }, null, 6)
                        ]),
                        entry.error ? (vueExports.openBlock(), vueExports.createBlock("p", {
                          key: 0,
                          class: "text-xs text-error"
                        }, vueExports.toDisplayString(entry.error), 1)) : vueExports.createCommentVNode("", true)
                      ]);
                    }), 128))
                  ]),
                  vueExports.unref(uploadDone) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "flex justify-end pt-1"
                  }, [
                    vueExports.createVNode(_component_UButton, {
                      size: "xs",
                      variant: "subtle",
                      color: "neutral",
                      onClick: dismissProgress
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Dismiss ")
                      ]),
                      _: 1
                    })
                  ])) : vueExports.createCommentVNode("", true)
                ])) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("div", { class: "flex justify-end" }, [
                  vueExports.unref(features).storage ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                    key: 0,
                    variant: "outline",
                    icon: "i-lucide-upload",
                    size: "sm",
                    loading: vueExports.unref(uploading),
                    disabled: vueExports.unref(uploading),
                    onClick: ($event) => vueExports.unref(fileInput)?.click()
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(" Upload new ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled", "onClick"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode("input", {
                    ref_key: "fileInput",
                    ref: fileInput,
                    type: "file",
                    multiple: "",
                    accept: vueExports.unref(acceptTypes).join(","),
                    class: "hidden",
                    onChange: onFileInput
                  }, null, 40, ["accept"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/MediaPickerModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_11 = Object.assign(_sfc_main, { __name: "AdminMediaPickerModal" });

export { VisuallyHiddenInput_default as V, __nuxt_component_11 as _, _sfc_main$1 as a, _sfc_main$2 as b };
//# sourceMappingURL=MediaPickerModal-CIxpt8n3.mjs.map
