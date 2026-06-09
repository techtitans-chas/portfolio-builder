import { aO as vueExports, an as useComponentProps, aj as useAppConfig, ag as tv, v as formErrorsInjectionKey, x as formInputsInjectionKey, M as inputIdInjectionKey, w as formFieldInjectionKey, a7 as ssrRenderComponent_1, b as Primitive, a6 as ssrRenderClass_1, a9 as ssrRenderSlot_1, a3 as ssrInterpolate_1, a4 as ssrRenderAttr_1, au as useForwardExpose } from './server.mjs';

var Label_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Label",
  props: {
    for: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "label"
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { onMousedown: _cache[0] || (_cache[0] = (event) => {
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }) }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var Label_default = Label_vue_vue_type_script_setup_true_lang_default;
const theme = {
  "slots": {
    "root": "",
    "wrapper": "",
    "labelWrapper": "flex content-center items-center justify-between gap-1",
    "label": "block font-medium text-default",
    "container": "relative",
    "description": "text-muted",
    "error": "mt-2 text-error",
    "hint": "text-muted",
    "help": "mt-2 text-muted"
  },
  "variants": {
    "size": {
      "xs": {
        "root": "text-xs"
      },
      "sm": {
        "root": "text-xs"
      },
      "md": {
        "root": "text-sm"
      },
      "lg": {
        "root": "text-sm"
      },
      "xl": {
        "root": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "orientation": {
      "vertical": {
        "container": "mt-1"
      },
      "horizontal": {
        "root": "flex justify-between place-items-baseline gap-2"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main = {
  __name: "UFormField",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    name: { type: String, required: false },
    errorPattern: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    help: { type: String, required: false },
    error: { type: [Boolean, String], required: false, default: void 0 },
    hint: { type: String, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    eagerValidation: { type: Boolean, required: false },
    validateOnInputDelay: { type: Number, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const _props = __props;
    const slots = vueExports.useSlots();
    const props = useComponentProps("formField", _props);
    const appConfig = useAppConfig();
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.formField || {} })({
      size: props.size,
      required: props.required,
      orientation: props.orientation
    }));
    const formErrors = vueExports.inject(formErrorsInjectionKey, null);
    const error = vueExports.computed(() => props.error || formErrors?.value?.find((error2) => error2.name === props.name || props.errorPattern && error2.name?.match(props.errorPattern))?.message);
    const id = vueExports.ref(vueExports.useId());
    const ariaId = id.value;
    const formInputs = vueExports.inject(formInputsInjectionKey, void 0);
    vueExports.watch(id, () => {
      if (formInputs && props.name) {
        formInputs.value[props.name] = { id: id.value, pattern: props.errorPattern };
      }
    }, { immediate: true });
    vueExports.provide(inputIdInjectionKey, id);
    vueExports.provide(formFieldInjectionKey, vueExports.computed(() => ({
      error: error.value,
      name: props.name,
      size: props.size,
      eagerValidation: props.eagerValidation,
      validateOnInputDelay: props.validateOnInputDelay,
      errorPattern: props.errorPattern,
      hint: props.hint,
      description: props.description,
      help: props.help,
      ariaId
    })));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: vueExports.unref(props).as,
        "data-orientation": vueExports.unref(props).orientation,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="wrapper" class="${ssrRenderClass_1(ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper }))}"${_scopeId}>`);
            if (vueExports.unref(props).label || !!slots.label) {
              _push2(`<div data-slot="labelWrapper" class="${ssrRenderClass_1(ui.value.labelWrapper({ class: vueExports.unref(props).ui?.labelWrapper }))}"${_scopeId}>`);
              _push2(ssrRenderComponent_1(vueExports.unref(Label_default), {
                for: id.value,
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
              if (vueExports.unref(props).hint || !!slots.hint) {
                _push2(`<span${ssrRenderAttr_1("id", `${vueExports.unref(ariaId)}-hint`)} data-slot="hint" class="${ssrRenderClass_1(ui.value.hint({ class: vueExports.unref(props).ui?.hint }))}"${_scopeId}>`);
                ssrRenderSlot_1(_ctx.$slots, "hint", {
                  hint: vueExports.unref(props).hint
                }, () => {
                  _push2(`${ssrInterpolate_1(vueExports.unref(props).hint)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(props).description || !!slots.description) {
              _push2(`<p${ssrRenderAttr_1("id", `${vueExports.unref(ariaId)}-description`)} data-slot="description" class="${ssrRenderClass_1(ui.value.description({ class: vueExports.unref(props).ui?.description }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "description", {
                description: vueExports.unref(props).description
              }, () => {
                _push2(`${ssrInterpolate_1(vueExports.unref(props).description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="${ssrRenderClass_1([(vueExports.unref(props).label || !!slots.label || vueExports.unref(props).description || !!slots.description) && ui.value.container({ class: vueExports.unref(props).ui?.container })])}"${_scopeId}>`);
            ssrRenderSlot_1(_ctx.$slots, "default", { error: error.value }, null, _push2, _parent2, _scopeId);
            if (vueExports.unref(props).error !== false && (typeof error.value === "string" && error.value || !!slots.error)) {
              _push2(`<div${ssrRenderAttr_1("id", `${vueExports.unref(ariaId)}-error`)} data-slot="error" class="${ssrRenderClass_1(ui.value.error({ class: vueExports.unref(props).ui?.error }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "error", { error: error.value }, () => {
                _push2(`${ssrInterpolate_1(error.value)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else if (vueExports.unref(props).help || !!slots.help) {
              _push2(`<div${ssrRenderAttr_1("id", `${vueExports.unref(ariaId)}-help`)} data-slot="help" class="${ssrRenderClass_1(ui.value.help({ class: vueExports.unref(props).ui?.help }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "help", {
                help: vueExports.unref(props).help
              }, () => {
                _push2(`${ssrInterpolate_1(vueExports.unref(props).help)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper })
              }, [
                vueExports.unref(props).label || !!slots.label ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  "data-slot": "labelWrapper",
                  class: ui.value.labelWrapper({ class: vueExports.unref(props).ui?.labelWrapper })
                }, [
                  vueExports.createVNode(vueExports.unref(Label_default), {
                    for: id.value,
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
                  }, 8, ["for", "class"]),
                  vueExports.unref(props).hint || !!slots.hint ? (vueExports.openBlock(), vueExports.createBlock("span", {
                    key: 0,
                    id: `${vueExports.unref(ariaId)}-hint`,
                    "data-slot": "hint",
                    class: ui.value.hint({ class: vueExports.unref(props).ui?.hint })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "hint", {
                      hint: vueExports.unref(props).hint
                    }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).hint), 1)
                    ])
                  ], 10, ["id"])) : vueExports.createCommentVNode("", true)
                ], 2)) : vueExports.createCommentVNode("", true),
                vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                  key: 1,
                  id: `${vueExports.unref(ariaId)}-description`,
                  "data-slot": "description",
                  class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "description", {
                    description: vueExports.unref(props).description
                  }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                  ])
                ], 10, ["id"])) : vueExports.createCommentVNode("", true)
              ], 2),
              vueExports.createVNode("div", {
                class: [(vueExports.unref(props).label || !!slots.label || vueExports.unref(props).description || !!slots.description) && ui.value.container({ class: vueExports.unref(props).ui?.container })]
              }, [
                vueExports.renderSlot(_ctx.$slots, "default", { error: error.value }),
                vueExports.unref(props).error !== false && (typeof error.value === "string" && error.value || !!slots.error) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  id: `${vueExports.unref(ariaId)}-error`,
                  "data-slot": "error",
                  class: ui.value.error({ class: vueExports.unref(props).ui?.error })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "error", { error: error.value }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(error.value), 1)
                  ])
                ], 10, ["id"])) : vueExports.unref(props).help || !!slots.help ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 1,
                  id: `${vueExports.unref(ariaId)}-help`,
                  "data-slot": "help",
                  class: ui.value.help({ class: vueExports.unref(props).ui?.help })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "help", {
                    help: vueExports.unref(props).help
                  }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).help), 1)
                  ])
                ], 10, ["id"])) : vueExports.createCommentVNode("", true)
              ], 2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/FormField.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { Label_default as L, _sfc_main as _ };
//# sourceMappingURL=FormField-9wkfNHPa.mjs.map
