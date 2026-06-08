import { _ as __nuxt_component_0 } from './PageWrapper-dRmsqRwL.mjs';
import { _ as _sfc_main$g, d as _sfc_main$2$2, f as isValueEqualOrExist, b as AccordionRoot_default, a as AccordionItem_default, c as AccordionTrigger_default, A as AccordionContent_default, e as injectAccordionRootContext, i as injectAccordionItemContext } from './Tooltip-DoUsDOvw.mjs';
import { aO as vueExports, W as onBeforeRouteLeave, a7 as ssrRenderComponent_1, c as __nuxt_component_2$1$1, j as _sfc_main$d$1, e as _sfc_main$8$1, aJ as useState, d as _export_sfc, aE as useRequestHeaders, a5 as ssrRenderAttrs_1, aa as ssrRenderStyle_1, a3 as ssrInterpolate_1, a8 as ssrRenderList_1, a6 as ssrRenderClass_1, a4 as ssrRenderAttr_1, a2 as ssrIncludeBooleanAttr, an as useComponentProps, aj as useAppConfig, av as useForwardProps, $ as reactivePick, at as useFormField, ag as tv, b as Primitive, ac as ssrRenderVNode, a9 as ssrRenderSlot_1, au as useForwardExpose, aM as useVModel, Q as isNullish, P as Presence_default, al as useCollection, C as get, l as createContext, az as useMounted } from './server.mjs';
import { _ as _sfc_main$j } from './Modal-D9bZkufO.mjs';
import { L as Label_default, _ as _sfc_main$k } from './FormField-9wkfNHPa.mjs';
import { _ as _sfc_main$i } from './Input-DWHPzDmy.mjs';
import { a as _sfc_main$1$1, b as _sfc_main$2$1, _ as __nuxt_component_11, V as VisuallyHiddenInput_default } from './MediaPickerModal-CIxpt8n3.mjs';
import { _ as _sfc_main$l } from './Separator-CgixisDT.mjs';
import { _ as _sfc_main$m } from './Alert-Nv5RlKkm.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { _ as __nuxt_component_4$1 } from './ConfirmModal-D6HutMUe.mjs';
import { l as lo } from '../_/vue-draggable-plus.mjs';
import { u as useCurrentUser } from './useCurrentUser-0x7hmjnh.mjs';
import { _ as _sfc_main$h, R as RovingFocusItem_default } from './Tabs-CjxPSbMS.mjs';
import { u as usePageEditor, a as allBlockDefinitions, _ as __nuxt_component_3$2, g as getPath, s as setPath, b as blockDefinitions } from './Renderer-BcdheZ52.mjs';
import { u as useCollections } from './useCollections-Be_EdGTg.mjs';
import { a as _sfc_main$1$2, u as useFormControl, c as clamp } from './MediaGrid-DBtVJH5B.mjs';
import { u as useActivePalette, c as useLayoutSettings, d as usePortfolio, p as portfolioSlugKey, _ as __nuxt_component_0$1, e as useThemes, b as MAX_CONTENT_WIDTH_OPTIONS, i as inlineEditorKey } from './usePortfolio-DF7bLLR2.mjs';
import { u as useDirection, f as useSize } from './PopperArrow-CVyIWJ6M.mjs';
import { y as isEqual } from '../nitro/nitro.mjs';
import './DashboardSidebarToggle-uAAQWn-6.mjs';
import './overlay-BWwBD9XH.mjs';
import '../routes/renderer.mjs';
import '../_/shared.cjs.prod.mjs';
import 'node:stream';
import './useServerFeatures-DOIxALfL.mjs';
import './Badge-C0tQ5UcT.mjs';
import '../_/index.mjs';
import './collectionTypes-6EiXkZ_r.mjs';
import './Main-CoIIuktv.mjs';
import './usePrefix-DEbZTxVe.mjs';
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

var AccordionHeader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "AccordionHeader",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "h3"
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectAccordionRootContext();
    const itemContext = injectAccordionItemContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        as: props.as,
        "as-child": props.asChild,
        "data-orientation": vueExports.unref(rootContext).orientation,
        "data-state": vueExports.unref(itemContext).dataState.value,
        "data-disabled": vueExports.unref(itemContext).dataDisabled.value
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "data-orientation",
        "data-state",
        "data-disabled"
      ]);
    };
  }
});
var AccordionHeader_default = AccordionHeader_vue_vue_type_script_setup_true_lang_default;
const [injectCheckboxGroupRootContext] = /* @__PURE__ */ createContext("CheckboxGroupRoot");
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
const [injectCheckboxRootContext, provideCheckboxRootContext] = /* @__PURE__ */ createContext("CheckboxRoot");
var CheckboxRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "CheckboxRoot",
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
    value: {
      type: null,
      required: false,
      default: "on"
    },
    id: {
      type: String,
      required: false
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
    const emits = __emit;
    const { forwardRef, currentElement } = useForwardExpose();
    const checkboxGroupContext = injectCheckboxGroupRootContext(null);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? props.falseValue,
      passive: props.modelValue === void 0
    });
    const disabled = vueExports.computed(() => checkboxGroupContext?.disabled.value || props.disabled);
    const isChecked = vueExports.computed(() => isEqual(modelValue.value, props.trueValue));
    const checkboxState = vueExports.computed(() => {
      if (!isNullish(checkboxGroupContext?.modelValue.value)) return isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
      else {
        if (modelValue.value === "indeterminate") return "indeterminate";
        return isChecked.value;
      }
    });
    function handleClick() {
      if (!isNullish(checkboxGroupContext?.modelValue.value)) {
        const modelValueArray = [...checkboxGroupContext.modelValue.value || []];
        if (isValueEqualOrExist(modelValueArray, props.value)) {
          const index = modelValueArray.findIndex((i) => isEqual(i, props.value));
          modelValueArray.splice(index, 1);
        } else modelValueArray.push(props.value);
        checkboxGroupContext.modelValue.value = modelValueArray;
      } else if (modelValue.value === "indeterminate") modelValue.value = props.trueValue;
      else modelValue.value = isChecked.value ? props.falseValue : props.trueValue;
    }
    const isFormControl = useFormControl(currentElement);
    const ariaLabel = vueExports.computed(() => props.id && currentElement.value ? (void 0).querySelector(`[for="${props.id}"]`)?.innerText : void 0);
    provideCheckboxRootContext({
      disabled,
      state: checkboxState
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(checkboxGroupContext)?.rovingFocus.value ? vueExports.unref(RovingFocusItem_default) : vueExports.unref(Primitive)), vueExports.mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: vueExports.unref(forwardRef),
        role: "checkbox",
        "as-child": _ctx.asChild,
        as: _ctx.as,
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-checked": vueExports.unref(isIndeterminate)(checkboxState.value) ? "mixed" : checkboxState.value,
        "aria-required": _ctx.required,
        "aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
        "data-state": vueExports.unref(getState)(checkboxState.value),
        "data-disabled": disabled.value ? "" : void 0,
        disabled: disabled.value,
        focusable: vueExports.unref(checkboxGroupContext)?.rovingFocus.value ? !disabled.value : void 0,
        onKeydown: vueExports.withKeys(vueExports.withModifiers(() => {
        }, ["prevent"]), ["enter"]),
        onClick: handleClick
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {
          modelValue: vueExports.unref(modelValue),
          state: checkboxState.value
        }), vueExports.unref(isFormControl) && _ctx.name && !vueExports.unref(checkboxGroupContext) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHiddenInput_default), {
          key: 0,
          type: "checkbox",
          checked: !!checkboxState.value,
          name: _ctx.name,
          value: _ctx.value,
          disabled: disabled.value,
          required: _ctx.required
        }, null, 8, [
          "checked",
          "name",
          "value",
          "disabled",
          "required"
        ])) : vueExports.createCommentVNode("v-if", true)]),
        _: 3
      }, 16, [
        "id",
        "as-child",
        "as",
        "type",
        "aria-checked",
        "aria-required",
        "aria-label",
        "data-state",
        "data-disabled",
        "disabled",
        "focusable",
        "onKeydown"
      ]);
    };
  }
});
var CheckboxRoot_default = CheckboxRoot_vue_vue_type_script_setup_true_lang_default;
var CheckboxIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "CheckboxIndicator",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
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
    const { forwardRef } = useForwardExpose();
    const rootContext = injectCheckboxRootContext();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(isIndeterminate)(vueExports.unref(rootContext).state.value) || vueExports.unref(rootContext).state.value === true }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
          ref: vueExports.unref(forwardRef),
          "data-state": vueExports.unref(getState)(vueExports.unref(rootContext).state.value),
          "data-disabled": vueExports.unref(rootContext).disabled.value ? "" : void 0,
          style: { pointerEvents: "none" },
          "as-child": _ctx.asChild,
          as: _ctx.as
        }, _ctx.$attrs), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "data-state",
          "data-disabled",
          "as-child",
          "as"
        ])]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var CheckboxIndicator_default = CheckboxIndicator_vue_vue_type_script_setup_true_lang_default;
function getNextSortedValues(prevValues = [], nextValue, atIndex) {
  const nextValues = [...prevValues];
  nextValues[atIndex] = nextValue;
  return nextValues.sort((a, b) => a - b);
}
function convertValueToPercentage(value, min, max) {
  const maxSteps = max - min;
  const percentPerStep = 100 / maxSteps;
  const percentage = percentPerStep * (value - min);
  return clamp(percentage, 0, 100);
}
function getLabel(index, totalValues) {
  if (totalValues > 2) return `Value ${index + 1} of ${totalValues}`;
  else if (totalValues === 2) return ["Minimum", "Maximum"][index];
  else return void 0;
}
function getClosestValueIndex(values, nextValue) {
  if (values.length === 1) return 0;
  const distances = values.map((value) => Math.abs(value - nextValue));
  const closestDistance = Math.min(...distances);
  return distances.indexOf(closestDistance);
}
function getThumbInBoundsOffset(width, left, direction) {
  const halfWidth = width / 2;
  const halfPercent = 50;
  const offset = linearScale([0, halfPercent], [0, halfWidth]);
  return (halfWidth - offset(left) * direction) * direction;
}
function getStepsBetweenValues(values) {
  return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
  if (minStepsBetweenValues > 0) {
    const stepsBetweenValues = getStepsBetweenValues(values);
    const actualMinStepsBetweenValues = Math.min(...stepsBetweenValues);
    return actualMinStepsBetweenValues >= minStepsBetweenValues;
  }
  return true;
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function getDecimalCount(value) {
  return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
  const rounder = 10 ** decimalCount;
  return Math.round(value * rounder) / rounder;
}
const PAGE_KEYS = ["PageUp", "PageDown"];
const ARROW_KEYS = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight"
];
const BACK_KEYS = {
  "from-left": [
    "Home",
    "PageDown",
    "ArrowDown",
    "ArrowLeft"
  ],
  "from-right": [
    "Home",
    "PageDown",
    "ArrowDown",
    "ArrowRight"
  ],
  "from-bottom": [
    "Home",
    "PageDown",
    "ArrowDown",
    "ArrowLeft"
  ],
  "from-top": [
    "Home",
    "PageUp",
    "ArrowUp",
    "ArrowLeft"
  ]
};
const [injectSliderOrientationContext, provideSliderOrientationContext] = /* @__PURE__ */ createContext(["SliderVertical", "SliderHorizontal"]);
var SliderHorizontal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SliderHorizontal",
  props: {
    dir: {
      type: String,
      required: false
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    inverted: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    "slideEnd",
    "slideStart",
    "slideMove",
    "homeKeyDown",
    "endKeyDown",
    "stepKeyDown"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { max, min, dir, inverted } = vueExports.toRefs(props);
    const { forwardRef, currentElement: sliderElement } = useForwardExpose();
    const rootContext = injectSliderRootContext();
    const offsetPosition = vueExports.ref();
    const rectRef = vueExports.ref();
    const isSlidingFromLeft = vueExports.computed(() => dir?.value !== "rtl" && !inverted.value || dir?.value !== "ltr" && inverted.value);
    function getValueFromPointerEvent(event, slideStart) {
      const rect = rectRef.value || sliderElement.value.getBoundingClientRect();
      const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
      const thumbWidth = rootContext.thumbAlignment.value === "contain" ? thumb.clientWidth : 0;
      if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === "contain") offsetPosition.value = event.clientX - thumb.getBoundingClientRect().left;
      const input = [0, rect.width - thumbWidth];
      const output = isSlidingFromLeft.value ? [min.value, max.value] : [max.value, min.value];
      const value = linearScale(input, output);
      rectRef.value = rect;
      const position = slideStart ? event.clientX - rect.left - thumbWidth / 2 : event.clientX - rect.left - (offsetPosition.value ?? 0);
      return value(position);
    }
    const startEdge = vueExports.computed(() => isSlidingFromLeft.value ? "left" : "right");
    const endEdge = vueExports.computed(() => isSlidingFromLeft.value ? "right" : "left");
    const direction = vueExports.computed(() => isSlidingFromLeft.value ? 1 : -1);
    provideSliderOrientationContext({
      startEdge,
      endEdge,
      direction,
      size: "width"
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(SliderImpl_default, {
        ref: vueExports.unref(forwardRef),
        dir: vueExports.unref(dir),
        "data-orientation": "horizontal",
        style: vueExports.normalizeStyle({ ["--reka-slider-thumb-transform"]: !isSlidingFromLeft.value && vueExports.unref(rootContext).thumbAlignment.value === "overflow" ? "translateX(50%)" : "translateX(-50%)" }),
        onSlideStart: _cache[0] || (_cache[0] = (event) => {
          const value = getValueFromPointerEvent(event, true);
          emits("slideStart", value);
        }),
        onSlideMove: _cache[1] || (_cache[1] = (event) => {
          const value = getValueFromPointerEvent(event);
          emits("slideMove", value);
        }),
        onSlideEnd: _cache[2] || (_cache[2] = () => {
          rectRef.value = void 0;
          offsetPosition.value = void 0;
          emits("slideEnd");
        }),
        onStepKeyDown: _cache[3] || (_cache[3] = (event) => {
          const slideDirection = isSlidingFromLeft.value ? "from-left" : "from-right";
          const isBackKey = vueExports.unref(BACK_KEYS)[slideDirection].includes(event.key);
          emits("stepKeyDown", event, isBackKey ? -1 : 1);
        }),
        onEndKeyDown: _cache[4] || (_cache[4] = ($event) => emits("endKeyDown", $event)),
        onHomeKeyDown: _cache[5] || (_cache[5] = ($event) => emits("homeKeyDown", $event))
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, ["dir", "style"]);
    };
  }
});
var SliderHorizontal_default = SliderHorizontal_vue_vue_type_script_setup_true_lang_default;
var SliderVertical_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SliderVertical",
  props: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    inverted: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    "slideEnd",
    "slideStart",
    "slideMove",
    "homeKeyDown",
    "endKeyDown",
    "stepKeyDown"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { max, min, inverted } = vueExports.toRefs(props);
    const rootContext = injectSliderRootContext();
    const { forwardRef, currentElement: sliderElement } = useForwardExpose();
    const offsetPosition = vueExports.ref();
    const rectRef = vueExports.ref();
    const isSlidingFromBottom = vueExports.computed(() => !inverted.value);
    function getValueFromPointerEvent(event, slideStart) {
      const rect = rectRef.value || sliderElement.value.getBoundingClientRect();
      const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
      const thumbHeight = rootContext.thumbAlignment.value === "contain" ? thumb.clientHeight : 0;
      if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === "contain") offsetPosition.value = event.clientY - thumb.getBoundingClientRect().top;
      const input = [0, rect.height - thumbHeight];
      const output = isSlidingFromBottom.value ? [max.value, min.value] : [min.value, max.value];
      const value = linearScale(input, output);
      const position = slideStart ? event.clientY - rect.top - thumbHeight / 2 : event.clientY - rect.top - (offsetPosition.value ?? 0);
      rectRef.value = rect;
      return value(position);
    }
    const startEdge = vueExports.computed(() => isSlidingFromBottom.value ? "bottom" : "top");
    const endEdge = vueExports.computed(() => isSlidingFromBottom.value ? "top" : "bottom");
    const direction = vueExports.computed(() => isSlidingFromBottom.value ? 1 : -1);
    provideSliderOrientationContext({
      startEdge,
      endEdge,
      direction,
      size: "height"
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(SliderImpl_default, {
        ref: vueExports.unref(forwardRef),
        "data-orientation": "vertical",
        style: vueExports.normalizeStyle({ ["--reka-slider-thumb-transform"]: !isSlidingFromBottom.value && vueExports.unref(rootContext).thumbAlignment.value === "overflow" ? "translateY(-50%)" : "translateY(50%)" }),
        onSlideStart: _cache[0] || (_cache[0] = (event) => {
          const value = getValueFromPointerEvent(event, true);
          emits("slideStart", value);
        }),
        onSlideMove: _cache[1] || (_cache[1] = (event) => {
          const value = getValueFromPointerEvent(event);
          emits("slideMove", value);
        }),
        onSlideEnd: _cache[2] || (_cache[2] = () => {
          rectRef.value = void 0;
          offsetPosition.value = void 0;
          emits("slideEnd");
        }),
        onStepKeyDown: _cache[3] || (_cache[3] = (event) => {
          const slideDirection = isSlidingFromBottom.value ? "from-bottom" : "from-top";
          const isBackKey = vueExports.unref(BACK_KEYS)[slideDirection].includes(event.key);
          emits("stepKeyDown", event, isBackKey ? -1 : 1);
        }),
        onEndKeyDown: _cache[4] || (_cache[4] = ($event) => emits("endKeyDown", $event)),
        onHomeKeyDown: _cache[5] || (_cache[5] = ($event) => emits("homeKeyDown", $event))
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, ["style"]);
    };
  }
});
var SliderVertical_default = SliderVertical_vue_vue_type_script_setup_true_lang_default;
const [injectSliderRootContext, provideSliderRootContext] = /* @__PURE__ */ createContext("SliderRoot");
var SliderRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SliderRoot",
  props: {
    defaultValue: {
      type: Array,
      required: false,
      default: () => [0]
    },
    modelValue: {
      type: [Array, null],
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    orientation: {
      type: String,
      required: false,
      default: "horizontal"
    },
    dir: {
      type: String,
      required: false
    },
    inverted: {
      type: Boolean,
      required: false,
      default: false
    },
    min: {
      type: Number,
      required: false,
      default: 0
    },
    max: {
      type: Number,
      required: false,
      default: 100
    },
    step: {
      type: Number,
      required: false,
      default: 1
    },
    minStepsBetweenThumbs: {
      type: Number,
      required: false,
      default: 0
    },
    thumbAlignment: {
      type: String,
      required: false,
      default: "contain"
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
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
  emits: ["update:modelValue", "valueCommit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { min, max, step, minStepsBetweenThumbs, orientation, disabled, thumbAlignment, dir: propDir } = vueExports.toRefs(props);
    const dir = useDirection(propDir);
    const { forwardRef, currentElement } = useForwardExpose();
    const isFormControl = useFormControl(currentElement);
    const { CollectionSlot } = useCollection({ isProvider: true });
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const currentModelValue = vueExports.computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);
    const valueIndexToChangeRef = vueExports.ref(0);
    const valuesBeforeSlideStartRef = vueExports.ref(currentModelValue.value);
    function handleSlideStart(value) {
      const closestIndex = getClosestValueIndex(currentModelValue.value, value);
      updateValues(value, closestIndex);
    }
    function handleSlideMove(value) {
      updateValues(value, valueIndexToChangeRef.value);
    }
    function handleSlideEnd() {
      const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
      const nextValue = currentModelValue.value[valueIndexToChangeRef.value];
      const hasChanged = nextValue !== prevValue;
      if (hasChanged) emits("valueCommit", vueExports.toRaw(currentModelValue.value));
    }
    function updateValues(value, atIndex, { commit } = { commit: false }) {
      const decimalCount = getDecimalCount(step.value);
      const snapToStep = roundValue(Math.round((value - min.value) / step.value) * step.value + min.value, decimalCount);
      const nextValue = clamp(snapToStep, min.value, max.value);
      const nextValues = getNextSortedValues(currentModelValue.value, nextValue, atIndex);
      if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs.value * step.value)) {
        valueIndexToChangeRef.value = nextValues.indexOf(nextValue);
        const hasChanged = String(nextValues) !== String(modelValue.value);
        if (hasChanged && commit) emits("valueCommit", nextValues);
        if (hasChanged) {
          thumbElements.value[valueIndexToChangeRef.value]?.focus();
          modelValue.value = nextValues;
        }
      }
    }
    const thumbElements = vueExports.ref([]);
    provideSliderRootContext({
      modelValue,
      currentModelValue,
      valueIndexToChangeRef,
      thumbElements,
      orientation,
      min,
      max,
      disabled,
      thumbAlignment
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionSlot), null, {
        default: vueExports.withCtx(() => [(vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(orientation) === "horizontal" ? SliderHorizontal_default : SliderVertical_default), vueExports.mergeProps(_ctx.$attrs, {
          ref: vueExports.unref(forwardRef),
          "as-child": _ctx.asChild,
          as: _ctx.as,
          min: vueExports.unref(min),
          max: vueExports.unref(max),
          dir: vueExports.unref(dir),
          inverted: _ctx.inverted,
          "aria-disabled": vueExports.unref(disabled),
          "data-disabled": vueExports.unref(disabled) ? "" : void 0,
          onPointerdown: _cache[0] || (_cache[0] = () => {
            if (!vueExports.unref(disabled)) valuesBeforeSlideStartRef.value = currentModelValue.value;
          }),
          onSlideStart: _cache[1] || (_cache[1] = ($event) => !vueExports.unref(disabled) && handleSlideStart($event)),
          onSlideMove: _cache[2] || (_cache[2] = ($event) => !vueExports.unref(disabled) && handleSlideMove($event)),
          onSlideEnd: _cache[3] || (_cache[3] = ($event) => !vueExports.unref(disabled) && handleSlideEnd()),
          onHomeKeyDown: _cache[4] || (_cache[4] = ($event) => !vueExports.unref(disabled) && updateValues(vueExports.unref(min), 0, { commit: true })),
          onEndKeyDown: _cache[5] || (_cache[5] = ($event) => !vueExports.unref(disabled) && updateValues(vueExports.unref(max), currentModelValue.value.length - 1, { commit: true })),
          onStepKeyDown: _cache[6] || (_cache[6] = (event, direction) => {
            if (!vueExports.unref(disabled)) {
              const isPageKey = vueExports.unref(PAGE_KEYS).includes(event.key);
              const isSkipKey = isPageKey || event.shiftKey && vueExports.unref(ARROW_KEYS).includes(event.key);
              const multiplier = isSkipKey ? 10 : 1;
              const atIndex = valueIndexToChangeRef.value;
              const value = currentModelValue.value[atIndex];
              const stepInDirection = vueExports.unref(step) * multiplier * direction;
              updateValues(value + stepInDirection, atIndex, { commit: true });
            }
          })
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) }), vueExports.unref(isFormControl) && _ctx.name ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHiddenInput_default), {
            key: 0,
            type: "number",
            value: vueExports.unref(modelValue),
            name: _ctx.name,
            required: _ctx.required,
            disabled: vueExports.unref(disabled),
            step: vueExports.unref(step)
          }, null, 8, [
            "value",
            "name",
            "required",
            "disabled",
            "step"
          ])) : vueExports.createCommentVNode("v-if", true)]),
          _: 3
        }, 16, [
          "as-child",
          "as",
          "min",
          "max",
          "dir",
          "inverted",
          "aria-disabled",
          "data-disabled"
        ]))]),
        _: 3
      });
    };
  }
});
var SliderRoot_default = SliderRoot_vue_vue_type_script_setup_true_lang_default;
var SliderImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SliderImpl",
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
  emits: [
    "slideStart",
    "slideMove",
    "slideEnd",
    "homeKeyDown",
    "endKeyDown",
    "stepKeyDown"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectSliderRootContext();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ "data-slider-impl": "" }, props, {
        onKeydown: _cache[0] || (_cache[0] = (event) => {
          if (event.key === "Home") {
            emits("homeKeyDown", event);
            event.preventDefault();
          } else if (event.key === "End") {
            emits("endKeyDown", event);
            event.preventDefault();
          } else if (vueExports.unref(PAGE_KEYS).concat(vueExports.unref(ARROW_KEYS)).includes(event.key)) {
            emits("stepKeyDown", event);
            event.preventDefault();
          }
        }),
        onPointerdown: _cache[1] || (_cache[1] = (event) => {
          const target = event.target;
          target.setPointerCapture(event.pointerId);
          event.preventDefault();
          if (vueExports.unref(rootContext).thumbElements.value.includes(target)) target.focus();
          else emits("slideStart", event);
        }),
        onPointermove: _cache[2] || (_cache[2] = (event) => {
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) emits("slideMove", event);
        }),
        onPointerup: _cache[3] || (_cache[3] = (event) => {
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
            emits("slideEnd", event);
          }
        })
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var SliderImpl_default = SliderImpl_vue_vue_type_script_setup_true_lang_default;
var SliderRange_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SliderRange",
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
    const rootContext = injectSliderRootContext();
    const orientation = injectSliderOrientationContext();
    useForwardExpose();
    const percentages = vueExports.computed(() => rootContext.currentModelValue.value.map((value) => convertValueToPercentage(value, rootContext.min.value, rootContext.max.value)));
    const offsetStart = vueExports.computed(() => rootContext.currentModelValue.value.length > 1 ? Math.min(...percentages.value) : 0);
    const offsetEnd = vueExports.computed(() => 100 - Math.max(...percentages.value, 0));
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        "data-disabled": vueExports.unref(rootContext).disabled.value ? "" : void 0,
        "data-orientation": vueExports.unref(rootContext).orientation.value,
        "as-child": _ctx.asChild,
        as: _ctx.as,
        style: vueExports.normalizeStyle({
          [vueExports.unref(orientation).startEdge.value]: `${offsetStart.value}%`,
          [vueExports.unref(orientation).endEdge.value]: `${offsetEnd.value}%`
        })
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "data-disabled",
        "data-orientation",
        "as-child",
        "as",
        "style"
      ]);
    };
  }
});
var SliderRange_default = SliderRange_vue_vue_type_script_setup_true_lang_default;
var SliderThumbImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SliderThumbImpl",
  props: {
    index: {
      type: Number,
      required: true
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
    const rootContext = injectSliderRootContext();
    const orientation = injectSliderOrientationContext();
    const { forwardRef } = useForwardExpose();
    const { CollectionItem } = useCollection();
    const value = vueExports.computed(() => rootContext.modelValue?.value?.[props.index]);
    const percent = vueExports.computed(() => value.value === void 0 ? 0 : convertValueToPercentage(value.value, rootContext.min.value ?? 0, rootContext.max.value ?? 100));
    const label = vueExports.computed(() => getLabel(props.index, rootContext.modelValue?.value?.length ?? 0));
    const size = useSize();
    const orientationSize = vueExports.computed(() => size[orientation.size].value);
    const thumbInBoundsOffset = vueExports.computed(() => {
      if (rootContext.thumbAlignment.value === "overflow" || !orientationSize.value) return 0;
      else return getThumbInBoundsOffset(orientationSize.value, percent.value, orientation.direction.value);
    });
    const isMounted = useMounted();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionItem), null, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps(_ctx.$attrs, {
          ref: vueExports.unref(forwardRef),
          role: "slider",
          tabindex: vueExports.unref(rootContext).disabled.value ? void 0 : 0,
          "aria-label": _ctx.$attrs["aria-label"] || label.value,
          "data-disabled": vueExports.unref(rootContext).disabled.value ? "" : void 0,
          "data-orientation": vueExports.unref(rootContext).orientation.value,
          "aria-valuenow": value.value,
          "aria-valuemin": vueExports.unref(rootContext).min.value,
          "aria-valuemax": vueExports.unref(rootContext).max.value,
          "aria-orientation": vueExports.unref(rootContext).orientation.value,
          "as-child": _ctx.asChild,
          as: _ctx.as,
          style: {
            transform: "var(--reka-slider-thumb-transform)",
            position: "absolute",
            [vueExports.unref(orientation).startEdge.value]: `calc(${percent.value}% + ${thumbInBoundsOffset.value}px)`,
            display: !vueExports.unref(isMounted) && value.value === void 0 ? "none" : void 0
          },
          onFocus: _cache[0] || (_cache[0] = () => {
            vueExports.unref(rootContext).valueIndexToChangeRef.value = _ctx.index;
          })
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "tabindex",
          "aria-label",
          "data-disabled",
          "data-orientation",
          "aria-valuenow",
          "aria-valuemin",
          "aria-valuemax",
          "aria-orientation",
          "as-child",
          "as",
          "style"
        ])]),
        _: 3
      });
    };
  }
});
var SliderThumbImpl_default = SliderThumbImpl_vue_vue_type_script_setup_true_lang_default;
var SliderThumb_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SliderThumb",
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
    const props = __props;
    const { getItems } = useCollection();
    const { forwardRef, currentElement: thumbElement } = useForwardExpose();
    const index = vueExports.computed(() => thumbElement.value ? getItems(true).findIndex((i) => i.ref === thumbElement.value) : -1);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(SliderThumbImpl_default, vueExports.mergeProps({ ref: vueExports.unref(forwardRef) }, props, { index: index.value }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["index"]);
    };
  }
});
var SliderThumb_default = SliderThumb_vue_vue_type_script_setup_true_lang_default;
var SliderTrack_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SliderTrack",
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
    const rootContext = injectSliderRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "data-disabled": vueExports.unref(rootContext).disabled.value ? "" : void 0,
        "data-orientation": vueExports.unref(rootContext).orientation.value
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "as-child",
        "as",
        "data-disabled",
        "data-orientation"
      ]);
    };
  }
});
var SliderTrack_default = SliderTrack_vue_vue_type_script_setup_true_lang_default;
const _sfc_main$f = /* @__PURE__ */ vueExports.defineComponent({
  __name: "PageModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    portfolioId: {},
    page: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ vueExports.mergeModels(["saved"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = vueExports.useModel(__props, "open");
    const { fetcher } = useApi();
    const isEdit = vueExports.computed(() => !!props.page);
    const form = vueExports.reactive({
      title: "",
      slug: "",
      seoDescription: "",
      seoTitle: "",
      seoOgImageUrl: "",
      isPublished: false,
      showInMenu: true
    });
    const snapshot = vueExports.ref("");
    function resetForm() {
      const p = props.page;
      form.title = p?.title ?? "";
      form.slug = p?.slug ?? "";
      form.seoDescription = p?.seoDescription ?? "";
      form.seoTitle = p?.seoTitle ?? "";
      form.seoOgImageUrl = p?.seoOgImageUrl ?? null;
      form.isPublished = p?.isPublished ?? false;
      form.showInMenu = p?.showInMenu ?? true;
      snapshot.value = JSON.stringify(form);
    }
    vueExports.watch(open, (val) => {
      if (val) resetForm();
    });
    const isDirty = vueExports.computed(() => snapshot.value !== JSON.stringify(form));
    const slugTouched = vueExports.ref(false);
    vueExports.watch(open, (val) => {
      if (val) slugTouched.value = false;
    });
    vueExports.watch(
      () => form.title,
      (title) => {
        if (isEdit.value || slugTouched.value) return;
        form.slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
    );
    function onSlugInput() {
      slugTouched.value = true;
    }
    const confirmCloseOpen = vueExports.ref(false);
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
    const ogImagePickerOpen = vueExports.ref(false);
    const saving = vueExports.ref(false);
    const errorMessage = vueExports.ref("");
    async function save() {
      saving.value = true;
      errorMessage.value = "";
      try {
        const payload = {
          title: form.title,
          slug: form.slug || void 0,
          seoDescription: form.seoDescription || null,
          seoTitle: form.seoTitle || null,
          seoOgImageUrl: form.seoOgImageUrl || null,
          isPublished: form.isPublished,
          showInMenu: form.showInMenu
        };
        let result;
        if (isEdit.value && props.page) {
          result = await fetcher(`/api/portfolios/${props.portfolioId}/pages/${props.page.id}`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(payload)
          });
        } else {
          result = await fetcher(`/api/portfolios/${props.portfolioId}/pages`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(payload)
          });
        }
        snapshot.value = JSON.stringify(form);
        emit("saved", result.page);
        open.value = false;
      } catch (e) {
        errorMessage.value = e instanceof Error ? e.message : "Failed to save page.";
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$j;
      const _component_UFormField = _sfc_main$k;
      const _component_UInput = _sfc_main$i;
      const _component_UTextarea = _sfc_main$1$1;
      const _component_USeparator = _sfc_main$l;
      const _component_UIcon = _sfc_main$d$1;
      const _component_UButton = _sfc_main$8$1;
      const _component_UAlert = _sfc_main$m;
      const _component_USwitch = _sfc_main$2$1;
      const _component_AdminMediaPickerModal = __nuxt_component_11;
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(_component_UModal, {
        open: open.value,
        title: "Page settings",
        ui: { content: "max-w-xl" },
        "onUpdate:open": (val) => {
          if (!val) tryClose();
        }
      }, {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-5"${_scopeId}><div class="grid grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UFormField, {
              label: "Page title",
              name: "title",
              class: "col-span-2 sm:col-span-1"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UInput, {
                    modelValue: vueExports.unref(form).title,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event,
                    placeholder: "About",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).title,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event,
                      placeholder: "About",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UFormField, {
              label: "Page slug",
              name: "slug",
              class: "col-span-2 sm:col-span-1"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UInput, {
                    modelValue: vueExports.unref(form).slug,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).slug = $event,
                    placeholder: "about",
                    class: "w-full",
                    ui: { base: "ps-4" },
                    onInput: onSlugInput
                  }, {
                    leading: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-muted text-sm"${_scopeId3}>/</span>`);
                      } else {
                        return [
                          vueExports.createVNode("span", { class: "text-muted text-sm" }, "/")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).slug,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).slug = $event,
                      placeholder: "about",
                      class: "w-full",
                      ui: { base: "ps-4" },
                      onInput: onSlugInput
                    }, {
                      leading: vueExports.withCtx(() => [
                        vueExports.createVNode("span", { class: "text-muted text-sm" }, "/")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent_1(_component_UFormField, {
              label: "Page description",
              name: "seoDescription"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UTextarea, {
                    modelValue: vueExports.unref(form).seoDescription,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).seoDescription = $event,
                    placeholder: "A short description of this page.",
                    class: "w-full",
                    rows: 3
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UTextarea, {
                      modelValue: vueExports.unref(form).seoDescription,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).seoDescription = $event,
                      placeholder: "A short description of this page.",
                      class: "w-full",
                      rows: 3
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_USeparator, null, null, _parent2, _scopeId));
            _push2(`<div class="flex gap-5 items-start"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UFormField, {
              label: "OG image",
              name: "seoOgImageUrl",
              class: "shrink-0"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-2"${_scopeId2}><div class="relative w-32 h-[72px] rounded-md overflow-hidden border border-default bg-muted flex items-center justify-center cursor-pointer hover:border-primary transition-colors"${_scopeId2}>`);
                  if (vueExports.unref(form).seoOgImageUrl) {
                    _push3(`<img${ssrRenderAttr_1("src", vueExports.unref(form).seoOgImageUrl)} alt="" class="w-full h-full object-cover"${_scopeId2}>`);
                  } else {
                    _push3(ssrRenderComponent_1(_component_UIcon, {
                      name: "i-lucide-image",
                      class: "text-muted size-6"
                    }, null, _parent3, _scopeId2));
                  }
                  if (vueExports.unref(form).seoOgImageUrl) {
                    _push3(ssrRenderComponent_1(_component_UButton, {
                      icon: "i-lucide-x",
                      color: "neutral",
                      variant: "solid",
                      size: "xs",
                      class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                      "aria-label": "Remove OG image",
                      onClick: ($event) => vueExports.unref(form).seoOgImageUrl = null
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    size: "xs",
                    class: "w-32 flex justify-center",
                    onClick: ($event) => ogImagePickerOpen.value = true
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate_1(vueExports.unref(form).seoOgImageUrl ? "Change" : "Choose")}`);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).seoOgImageUrl ? "Change" : "Choose"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex flex-col gap-2" }, [
                      vueExports.createVNode("div", {
                        class: "relative w-32 h-[72px] rounded-md overflow-hidden border border-default bg-muted flex items-center justify-center cursor-pointer hover:border-primary transition-colors",
                        onClick: ($event) => ogImagePickerOpen.value = true
                      }, [
                        vueExports.unref(form).seoOgImageUrl ? (vueExports.openBlock(), vueExports.createBlock("img", {
                          key: 0,
                          src: vueExports.unref(form).seoOgImageUrl,
                          alt: "",
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src"])) : (vueExports.openBlock(), vueExports.createBlock(_component_UIcon, {
                          key: 1,
                          name: "i-lucide-image",
                          class: "text-muted size-6"
                        })),
                        vueExports.unref(form).seoOgImageUrl ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                          key: 2,
                          icon: "i-lucide-x",
                          color: "neutral",
                          variant: "solid",
                          size: "xs",
                          class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                          "aria-label": "Remove OG image",
                          onClick: vueExports.withModifiers(($event) => vueExports.unref(form).seoOgImageUrl = null, ["stop"])
                        }, null, 8, ["onClick"])) : vueExports.createCommentVNode("", true)
                      ], 8, ["onClick"]),
                      vueExports.createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "outline",
                        size: "xs",
                        class: "w-32 flex justify-center",
                        onClick: ($event) => ogImagePickerOpen.value = true
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).seoOgImageUrl ? "Change" : "Choose"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex-1 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UFormField, {
              label: "SEO title",
              name: "seoTitle"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UInput, {
                    modelValue: vueExports.unref(form).seoTitle,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).seoTitle = $event,
                    placeholder: "About - My Portfolio",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).seoTitle,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).seoTitle = $event,
                      placeholder: "About - My Portfolio",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UFormField, {
              label: "SEO description",
              name: "seoDescription2"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UTextarea, {
                    modelValue: vueExports.unref(form).seoDescription,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).seoDescription = $event,
                    placeholder: "A short description for search engines.",
                    class: "w-full",
                    rows: 3
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UTextarea, {
                      modelValue: vueExports.unref(form).seoDescription,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).seoDescription = $event,
                      placeholder: "A short description for search engines.",
                      class: "w-full",
                      rows: 3
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (vueExports.unref(errorMessage)) {
              _push2(ssrRenderComponent_1(_component_UAlert, {
                color: "error",
                variant: "soft",
                description: vueExports.unref(errorMessage)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-5" }, [
                vueExports.createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  vueExports.createVNode(_component_UFormField, {
                    label: "Page title",
                    name: "title",
                    class: "col-span-2 sm:col-span-1"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(form).title,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event,
                        placeholder: "About",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UFormField, {
                    label: "Page slug",
                    name: "slug",
                    class: "col-span-2 sm:col-span-1"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(form).slug,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).slug = $event,
                        placeholder: "about",
                        class: "w-full",
                        ui: { base: "ps-4" },
                        onInput: onSlugInput
                      }, {
                        leading: vueExports.withCtx(() => [
                          vueExports.createVNode("span", { class: "text-muted text-sm" }, "/")
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                vueExports.createVNode(_component_UFormField, {
                  label: "Page description",
                  name: "seoDescription"
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UTextarea, {
                      modelValue: vueExports.unref(form).seoDescription,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).seoDescription = $event,
                      placeholder: "A short description of this page.",
                      class: "w-full",
                      rows: 3
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                vueExports.createVNode(_component_USeparator),
                vueExports.createVNode("div", { class: "flex gap-5 items-start" }, [
                  vueExports.createVNode(_component_UFormField, {
                    label: "OG image",
                    name: "seoOgImageUrl",
                    class: "shrink-0"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "flex flex-col gap-2" }, [
                        vueExports.createVNode("div", {
                          class: "relative w-32 h-[72px] rounded-md overflow-hidden border border-default bg-muted flex items-center justify-center cursor-pointer hover:border-primary transition-colors",
                          onClick: ($event) => ogImagePickerOpen.value = true
                        }, [
                          vueExports.unref(form).seoOgImageUrl ? (vueExports.openBlock(), vueExports.createBlock("img", {
                            key: 0,
                            src: vueExports.unref(form).seoOgImageUrl,
                            alt: "",
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"])) : (vueExports.openBlock(), vueExports.createBlock(_component_UIcon, {
                            key: 1,
                            name: "i-lucide-image",
                            class: "text-muted size-6"
                          })),
                          vueExports.unref(form).seoOgImageUrl ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                            key: 2,
                            icon: "i-lucide-x",
                            color: "neutral",
                            variant: "solid",
                            size: "xs",
                            class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                            "aria-label": "Remove OG image",
                            onClick: vueExports.withModifiers(($event) => vueExports.unref(form).seoOgImageUrl = null, ["stop"])
                          }, null, 8, ["onClick"])) : vueExports.createCommentVNode("", true)
                        ], 8, ["onClick"]),
                        vueExports.createVNode(_component_UButton, {
                          color: "neutral",
                          variant: "outline",
                          size: "xs",
                          class: "w-32 flex justify-center",
                          onClick: ($event) => ogImagePickerOpen.value = true
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).seoOgImageUrl ? "Change" : "Choose"), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode("div", { class: "flex-1 space-y-4" }, [
                    vueExports.createVNode(_component_UFormField, {
                      label: "SEO title",
                      name: "seoTitle"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).seoTitle,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).seoTitle = $event,
                          placeholder: "About - My Portfolio",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "SEO description",
                      name: "seoDescription2"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UTextarea, {
                          modelValue: vueExports.unref(form).seoDescription,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).seoDescription = $event,
                          placeholder: "A short description for search engines.",
                          class: "w-full",
                          rows: 3
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                vueExports.unref(errorMessage) ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                  key: 0,
                  color: "error",
                  variant: "soft",
                  description: vueExports.unref(errorMessage)
                }, null, 8, ["description"])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between w-full"${_scopeId}><div class="flex gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_USwitch, {
              modelValue: vueExports.unref(form).isPublished,
              "onUpdate:modelValue": ($event) => vueExports.unref(form).isPublished = $event,
              label: "Published"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_USwitch, {
              modelValue: vueExports.unref(form).showInMenu,
              "onUpdate:modelValue": ($event) => vueExports.unref(form).showInMenu = $event,
              label: "Show in menu"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UButton, {
              variant: "ghost",
              onClick: tryClose
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    vueExports.createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UButton, {
              loading: vueExports.unref(saving),
              disabled: !vueExports.unref(form).title.trim(),
              onClick: save
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Save`);
                } else {
                  return [
                    vueExports.createTextVNode("Save")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex items-center justify-between w-full" }, [
                vueExports.createVNode("div", { class: "flex gap-4" }, [
                  vueExports.createVNode(_component_USwitch, {
                    modelValue: vueExports.unref(form).isPublished,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).isPublished = $event,
                    label: "Published"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  vueExports.createVNode(_component_USwitch, {
                    modelValue: vueExports.unref(form).showInMenu,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).showInMenu = $event,
                    label: "Show in menu"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                vueExports.createVNode("div", { class: "flex gap-2" }, [
                  vueExports.createVNode(_component_UButton, {
                    variant: "ghost",
                    onClick: tryClose
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode("Cancel")
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UButton, {
                    loading: vueExports.unref(saving),
                    disabled: !vueExports.unref(form).title.trim(),
                    onClick: save
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode("Save")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent_1(_component_UModal, {
        open: vueExports.unref(confirmCloseOpen),
        "onUpdate:open": ($event) => vueExports.isRef(confirmCloseOpen) ? confirmCloseOpen.value = $event : null,
        title: "Unsaved changes",
        description: "You have unsaved changes. Are you sure you want to discard them?"
      }, {
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-2 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UButton, {
              variant: "ghost",
              onClick: ($event) => confirmCloseOpen.value = false
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Keep editing`);
                } else {
                  return [
                    vueExports.createTextVNode("Keep editing")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UButton, {
              color: "error",
              onClick: forceClose
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Discard changes`);
                } else {
                  return [
                    vueExports.createTextVNode("Discard changes")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex justify-end gap-2 w-full" }, [
                vueExports.createVNode(_component_UButton, {
                  variant: "ghost",
                  onClick: ($event) => confirmCloseOpen.value = false
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("Keep editing")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                vueExports.createVNode(_component_UButton, {
                  color: "error",
                  onClick: forceClose
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("Discard changes")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent_1(_component_AdminMediaPickerModal, {
        open: vueExports.unref(ogImagePickerOpen),
        "onUpdate:open": ($event) => vueExports.isRef(ogImagePickerOpen) ? ogImagePickerOpen.value = $event : null,
        "images-only": "",
        "selected-url": vueExports.unref(form).seoOgImageUrl,
        onSelect: (url) => vueExports.unref(form).seoOgImageUrl = url
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/PageModal.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_3$1 = Object.assign(_sfc_main$f, { __name: "PagebuilderPageModal" });
const MAX_PAGES_PER_PORTFOLIO = 10;
function usePages() {
  const { portfolio } = useCurrentUser();
  const { fetcher } = useApi();
  const pages = useState("portfolio-pages", () => []);
  const pagesLoading = useState("portfolio-pages-loading", () => false);
  const pagesError = useState("portfolio-pages-error", () => "");
  async function fetchPages() {
    const portfolioId = portfolio.value?.id;
    if (!portfolioId) return;
    pagesLoading.value = true;
    pagesError.value = "";
    try {
      const cookieHeader = true ? useRequestHeaders(["cookie"]) : void 0;
      const data = await fetcher(`/api/portfolios/${portfolioId}/pages`, {
        credentials: "include",
        headers: cookieHeader
      });
      pages.value = data.pages;
    } catch (e) {
      pagesError.value = e instanceof Error ? e.message : "Failed to load pages.";
    } finally {
      pagesLoading.value = false;
    }
  }
  return { pages, pagesLoading, pagesError, fetchPages };
}
function useActivePage() {
  const { pages } = usePages();
  const activePageId = useState("active-page-id", () => null);
  vueExports.watch(
    pages,
    (newPages) => {
      if (!activePageId.value && newPages.length > 0) {
        activePageId.value = newPages[0]?.id ?? null;
      }
    },
    { immediate: true }
  );
  const activePage = vueExports.computed(
    () => pages.value.find((p) => p.id === activePageId.value) ?? pages.value[0] ?? null
  );
  return { activePageId, activePage };
}
const _sfc_main$e = /* @__PURE__ */ vueExports.defineComponent({
  __name: "PageControls",
  __ssrInlineRender: true,
  props: {
    portfolioId: {}
  },
  setup(__props) {
    const props = __props;
    const { activePageId, activePage } = useActivePage();
    const { pages, pagesLoading, pagesError } = usePages();
    const { fetcher } = useApi();
    function selectPage(page) {
      activePageId.value = page.id;
    }
    async function onPagesReorder() {
      if (!props.portfolioId) return;
      await fetcher(`/api/portfolios/${props.portfolioId}/pages/reorder`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({ pageIds: pages.value.map((p) => p.id) })
      });
    }
    async function toggleVisibility(page) {
      const original = page.isPublished;
      page.isPublished = !original;
      try {
        await fetcher(`/api/portfolios/${props.portfolioId}/pages/${page.id}`, {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ isPublished: page.isPublished })
        });
      } catch {
        page.isPublished = original;
      }
    }
    async function toggleShowInMenu(page) {
      const original = page.showInMenu;
      page.showInMenu = !original;
      try {
        await fetcher(`/api/portfolios/${props.portfolioId}/pages/${page.id}`, {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ showInMenu: page.showInMenu })
        });
      } catch {
        page.showInMenu = original;
      }
    }
    const deleteModalOpen = vueExports.ref(false);
    const pageToDelete = vueExports.ref(null);
    const deleting = vueExports.ref(false);
    const deleteError = vueExports.ref("");
    function openDeleteModal(page) {
      pageToDelete.value = page;
      deleteError.value = "";
      deleteModalOpen.value = true;
    }
    async function confirmDelete() {
      if (!pageToDelete.value || !props.portfolioId) return;
      deleting.value = true;
      deleteError.value = "";
      try {
        await fetcher(`/api/portfolios/${props.portfolioId}/pages/${pageToDelete.value.id}`, {
          method: "DELETE",
          credentials: "include"
        });
        const deletedId = pageToDelete.value.id;
        pages.value = pages.value.filter((p) => p.id !== deletedId);
        if (activePageId.value === deletedId) {
          activePageId.value = pages.value[0]?.id ?? null;
        }
        deleteModalOpen.value = false;
        pageToDelete.value = null;
      } catch (e) {
        deleteError.value = e instanceof Error ? e.message : "Failed to delete page.";
      } finally {
        deleting.value = false;
      }
    }
    const atPageLimit = vueExports.computed(() => pages.value.length >= MAX_PAGES_PER_PORTFOLIO);
    const pageModalOpen = vueExports.ref(false);
    const pageToEdit = vueExports.ref(null);
    function openAddPage() {
      if (atPageLimit.value) return;
      pageToEdit.value = null;
      pageModalOpen.value = true;
    }
    function openEditPage() {
      pageToEdit.value = activePage.value;
      pageModalOpen.value = true;
    }
    function onPageSaved(page) {
      const idx = pages.value.findIndex((p) => p.id === page.id);
      if (idx !== -1) {
        pages.value = pages.value.map((p) => p.id === page.id ? page : p);
      } else {
        pages.value = [...pages.value, page];
        activePageId.value = page.id;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPopover = _sfc_main$2$2;
      const _component_UButton = _sfc_main$8$1;
      const _component_UIcon = _sfc_main$d$1;
      const _component_PagebuilderPageModal = __nuxt_component_3$1;
      const _component_AdminConfirmModal = __nuxt_component_4$1;
      _push(`<!--[--><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent_1(_component_UPopover, null, {
        content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-1 min-w-52"${_scopeId}><div class="flex items-center justify-between px-2 py-1.5"${_scopeId}><button class="${ssrRenderClass_1([
              vueExports.unref(atPageLimit) ? "text-muted cursor-not-allowed" : "text-primary hover:text-primary/80",
              "flex items-center gap-2 text-sm rounded-md font-medium transition-colors"
            ])}"${ssrIncludeBooleanAttr(vueExports.unref(atPageLimit)) ? " disabled" : ""}${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UIcon, {
              name: "i-lucide-plus",
              class: "size-4 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Add page </button><span class="text-xs text-muted tabular-nums"${_scopeId}>${ssrInterpolate_1(vueExports.unref(pages).length)} / ${ssrInterpolate_1(vueExports.unref(MAX_PAGES_PER_PORTFOLIO))}</span></div><div class="my-1 border-t border-default"${_scopeId}></div>`);
            if (vueExports.unref(pagesLoading)) {
              _push2(`<div class="flex items-center justify-center py-4"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-loader-2",
                class: "size-4 animate-spin text-muted"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (vueExports.unref(pagesError)) {
              _push2(`<p class="px-2 py-2 text-sm text-error"${_scopeId}>${ssrInterpolate_1(vueExports.unref(pagesError))}</p>`);
            } else {
              _push2(ssrRenderComponent_1(vueExports.unref(lo), {
                modelValue: vueExports.unref(pages),
                "onUpdate:modelValue": ($event) => vueExports.isRef(pages) ? pages.value = $event : null,
                handle: ".drag-handle",
                onEnd: onPagesReorder
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList_1(vueExports.unref(pages), (page) => {
                      _push3(`<div class="${ssrRenderClass_1([{ "bg-elevated": page.id === vueExports.unref(activePageId) }, "group flex items-center gap-1.5 w-full px-2 py-1.5 text-sm rounded-md hover:bg-elevated/50 cursor-pointer"])}"${_scopeId2}>`);
                      _push3(ssrRenderComponent_1(_component_UIcon, {
                        name: "i-lucide-grip-vertical",
                        class: "drag-handle size-4 text-muted shrink-0 -ml-1 cursor-grab active:cursor-grabbing"
                      }, null, _parent3, _scopeId2));
                      _push3(`<span class="flex-1 truncate"${_scopeId2}>${ssrInterpolate_1(page.title)}</span><div class="flex -my-0.5"${_scopeId2}>`);
                      _push3(ssrRenderComponent_1(_component_UButton, {
                        icon: page.showInMenu ? "pepicons-pop-list" : "pepicons-pop-list-off",
                        color: "neutral",
                        variant: "ghost",
                        size: "xs",
                        class: [page.showInMenu ? "text-highlighted" : "text-muted", "hover:text-highlighted hover:bg-accented/50"],
                        onClick: ($event) => toggleShowInMenu(page)
                      }, null, _parent3, _scopeId2));
                      if (!page.isMandatory) {
                        _push3(ssrRenderComponent_1(_component_UButton, {
                          icon: page.isPublished ? "i-lucide-globe" : "i-lucide-globe-off",
                          color: "neutral",
                          variant: "ghost",
                          size: "xs",
                          class: [page.isPublished ? "text-highlighted" : "text-muted", "hover:text-highlighted hover:bg-accented/50"],
                          onClick: ($event) => toggleVisibility(page)
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(ssrRenderComponent_1(_component_UButton, {
                        icon: page.isMandatory ? "i-lucide-lock" : "i-lucide-trash",
                        color: "neutral",
                        variant: "ghost",
                        size: "xs",
                        disabled: page.isMandatory,
                        class: "text-muted hover:text-highlighted hover:bg-accented/50",
                        onClick: ($event) => openDeleteModal(page)
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(pages), (page) => {
                        return vueExports.openBlock(), vueExports.createBlock("div", {
                          key: page.id,
                          class: ["group flex items-center gap-1.5 w-full px-2 py-1.5 text-sm rounded-md hover:bg-elevated/50 cursor-pointer", { "bg-elevated": page.id === vueExports.unref(activePageId) }],
                          onClick: ($event) => selectPage(page)
                        }, [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-lucide-grip-vertical",
                            class: "drag-handle size-4 text-muted shrink-0 -ml-1 cursor-grab active:cursor-grabbing"
                          }),
                          vueExports.createVNode("span", { class: "flex-1 truncate" }, vueExports.toDisplayString(page.title), 1),
                          vueExports.createVNode("div", { class: "flex -my-0.5" }, [
                            vueExports.createVNode(_component_UButton, {
                              icon: page.showInMenu ? "pepicons-pop-list" : "pepicons-pop-list-off",
                              color: "neutral",
                              variant: "ghost",
                              size: "xs",
                              class: [page.showInMenu ? "text-highlighted" : "text-muted", "hover:text-highlighted hover:bg-accented/50"],
                              onClick: vueExports.withModifiers(($event) => toggleShowInMenu(page), ["stop"])
                            }, null, 8, ["icon", "class", "onClick"]),
                            !page.isMandatory ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                              key: 0,
                              icon: page.isPublished ? "i-lucide-globe" : "i-lucide-globe-off",
                              color: "neutral",
                              variant: "ghost",
                              size: "xs",
                              class: [page.isPublished ? "text-highlighted" : "text-muted", "hover:text-highlighted hover:bg-accented/50"],
                              onClick: vueExports.withModifiers(($event) => toggleVisibility(page), ["stop"])
                            }, null, 8, ["icon", "class", "onClick"])) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode(_component_UButton, {
                              icon: page.isMandatory ? "i-lucide-lock" : "i-lucide-trash",
                              color: "neutral",
                              variant: "ghost",
                              size: "xs",
                              disabled: page.isMandatory,
                              class: "text-muted hover:text-highlighted hover:bg-accented/50",
                              onClick: vueExports.withModifiers(($event) => openDeleteModal(page), ["stop"])
                            }, null, 8, ["icon", "disabled", "onClick"])
                          ])
                        ], 10, ["onClick"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "p-1 min-w-52" }, [
                vueExports.createVNode("div", { class: "flex items-center justify-between px-2 py-1.5" }, [
                  vueExports.createVNode("button", {
                    class: [
                      "flex items-center gap-2 text-sm rounded-md font-medium transition-colors",
                      vueExports.unref(atPageLimit) ? "text-muted cursor-not-allowed" : "text-primary hover:text-primary/80"
                    ],
                    disabled: vueExports.unref(atPageLimit),
                    onClick: openAddPage
                  }, [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-lucide-plus",
                      class: "size-4 shrink-0"
                    }),
                    vueExports.createTextVNode(" Add page ")
                  ], 10, ["disabled"]),
                  vueExports.createVNode("span", { class: "text-xs text-muted tabular-nums" }, vueExports.toDisplayString(vueExports.unref(pages).length) + " / " + vueExports.toDisplayString(vueExports.unref(MAX_PAGES_PER_PORTFOLIO)), 1)
                ]),
                vueExports.createVNode("div", { class: "my-1 border-t border-default" }),
                vueExports.unref(pagesLoading) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-center py-4"
                }, [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-lucide-loader-2",
                    class: "size-4 animate-spin text-muted"
                  })
                ])) : vueExports.unref(pagesError) ? (vueExports.openBlock(), vueExports.createBlock("p", {
                  key: 1,
                  class: "px-2 py-2 text-sm text-error"
                }, vueExports.toDisplayString(vueExports.unref(pagesError)), 1)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(lo), {
                  key: 2,
                  modelValue: vueExports.unref(pages),
                  "onUpdate:modelValue": ($event) => vueExports.isRef(pages) ? pages.value = $event : null,
                  handle: ".drag-handle",
                  onEnd: onPagesReorder
                }, {
                  default: vueExports.withCtx(() => [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(pages), (page) => {
                      return vueExports.openBlock(), vueExports.createBlock("div", {
                        key: page.id,
                        class: ["group flex items-center gap-1.5 w-full px-2 py-1.5 text-sm rounded-md hover:bg-elevated/50 cursor-pointer", { "bg-elevated": page.id === vueExports.unref(activePageId) }],
                        onClick: ($event) => selectPage(page)
                      }, [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-lucide-grip-vertical",
                          class: "drag-handle size-4 text-muted shrink-0 -ml-1 cursor-grab active:cursor-grabbing"
                        }),
                        vueExports.createVNode("span", { class: "flex-1 truncate" }, vueExports.toDisplayString(page.title), 1),
                        vueExports.createVNode("div", { class: "flex -my-0.5" }, [
                          vueExports.createVNode(_component_UButton, {
                            icon: page.showInMenu ? "pepicons-pop-list" : "pepicons-pop-list-off",
                            color: "neutral",
                            variant: "ghost",
                            size: "xs",
                            class: [page.showInMenu ? "text-highlighted" : "text-muted", "hover:text-highlighted hover:bg-accented/50"],
                            onClick: vueExports.withModifiers(($event) => toggleShowInMenu(page), ["stop"])
                          }, null, 8, ["icon", "class", "onClick"]),
                          !page.isMandatory ? (vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                            key: 0,
                            icon: page.isPublished ? "i-lucide-globe" : "i-lucide-globe-off",
                            color: "neutral",
                            variant: "ghost",
                            size: "xs",
                            class: [page.isPublished ? "text-highlighted" : "text-muted", "hover:text-highlighted hover:bg-accented/50"],
                            onClick: vueExports.withModifiers(($event) => toggleVisibility(page), ["stop"])
                          }, null, 8, ["icon", "class", "onClick"])) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode(_component_UButton, {
                            icon: page.isMandatory ? "i-lucide-lock" : "i-lucide-trash",
                            color: "neutral",
                            variant: "ghost",
                            size: "xs",
                            disabled: page.isMandatory,
                            class: "text-muted hover:text-highlighted hover:bg-accented/50",
                            onClick: vueExports.withModifiers(($event) => openDeleteModal(page), ["stop"])
                          }, null, 8, ["icon", "disabled", "onClick"])
                        ])
                      ], 10, ["onClick"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]))
              ])
            ];
          }
        }),
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              size: "md",
              "trailing-icon": "i-lucide-chevron-down",
              class: "min-w-45 justify-between"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="flex items-center gap-2"${_scopeId2}><span class="text-muted"${_scopeId2}>Page:</span><span${_scopeId2}>${ssrInterpolate_1(vueExports.unref(activePage)?.title ?? "Select page")}</span></span>`);
                } else {
                  return [
                    vueExports.createVNode("span", { class: "flex items-center gap-2" }, [
                      vueExports.createVNode("span", { class: "text-muted" }, "Page:"),
                      vueExports.createVNode("span", null, vueExports.toDisplayString(vueExports.unref(activePage)?.title ?? "Select page"), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UButton, {
                color: "neutral",
                variant: "ghost",
                size: "md",
                "trailing-icon": "i-lucide-chevron-down",
                class: "min-w-45 justify-between"
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode("span", { class: "flex items-center gap-2" }, [
                    vueExports.createVNode("span", { class: "text-muted" }, "Page:"),
                    vueExports.createVNode("span", null, vueExports.toDisplayString(vueExports.unref(activePage)?.title ?? "Select page"), 1)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent_1(_component_UButton, {
        icon: "i-lucide-edit-3",
        color: "neutral",
        variant: "ghost",
        size: "md",
        "aria-label": "Edit page",
        onClick: openEditPage
      }, null, _parent));
      _push(`</div>`);
      if (__props.portfolioId) {
        _push(ssrRenderComponent_1(_component_PagebuilderPageModal, {
          open: vueExports.unref(pageModalOpen),
          "onUpdate:open": ($event) => vueExports.isRef(pageModalOpen) ? pageModalOpen.value = $event : null,
          "portfolio-id": __props.portfolioId,
          page: vueExports.unref(pageToEdit),
          onSaved: onPageSaved
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent_1(_component_AdminConfirmModal, {
        open: vueExports.unref(deleteModalOpen),
        "onUpdate:open": ($event) => vueExports.isRef(deleteModalOpen) ? deleteModalOpen.value = $event : null,
        title: "Delete page",
        description: vueExports.unref(pageToDelete) ? `Are you sure you want to delete '${vueExports.unref(pageToDelete).title}'?` : "",
        "confirm-label": "Delete",
        loading: vueExports.unref(deleting),
        "error-message": vueExports.unref(deleteError),
        onConfirm: confirmDelete,
        onCancel: ($event) => deleteModalOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/PageControls.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __nuxt_component_1$1 = Object.assign(_sfc_main$e, { __name: "PagebuilderPageControls" });
function useSelectedBlock() {
  const selectedBlock = useState("selected-block", () => null);
  function selectBlock(block) {
    selectedBlock.value = block;
  }
  function clearSelection() {
    selectedBlock.value = null;
  }
  return { selectedBlock, selectBlock, clearSelection };
}
const _sfc_main$d = /* @__PURE__ */ vueExports.defineComponent({
  __name: "BlocksView",
  __ssrInlineRender: true,
  emits: ["blockAdded"],
  setup(__props, { emit: __emit }) {
    const { addPendingBlock } = usePageEditor();
    const { selectBlock } = useSelectedBlock();
    const { activeCollectionTypes } = useCollections();
    const emit = __emit;
    const addingType = vueExports.ref(null);
    const availableBlocks = vueExports.computed(
      () => blockDefinitions.filter(
        (d) => !d.allowedCollections || d.allowedCollections.some((type) => activeCollectionTypes.value.has(type))
      )
    );
    function addBlock(type) {
      const definition = blockDefinitions.find((d) => d.type === type);
      const newBlock = addPendingBlock(type, definition?.defaultContent ?? {});
      selectBlock(newBlock);
      emit("blockAdded");
      addingType.value = type;
      setTimeout(() => addingType.value = null, 500);
    }
    function cloneDefinition(def) {
      return { ...def };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8$1;
      _push(ssrRenderComponent_1(vueExports.unref(lo), vueExports.mergeProps({
        "model-value": vueExports.unref(availableBlocks),
        group: { name: "blocks", pull: "clone", put: false },
        clone: cloneDefinition,
        sort: false,
        class: "grid grid-cols-2 overflow-hidden"
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList_1(vueExports.unref(availableBlocks), (block) => {
              _push2(ssrRenderComponent_1(_component_UButton, {
                key: block.type,
                color: "neutral",
                variant: "ghost",
                "aria-label": block.label,
                label: block.label,
                icon: block.icon,
                class: ["flex-col text-xs justify-center aspect-square rounded-none border-r border-b border-[var(--ui-border)] [&:nth-child(2n)]:border-r-0", { "block-added": vueExports.unref(addingType) === block.type }],
                ui: { leadingIcon: "size-6" },
                onClick: ($event) => addBlock(block.type)
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(availableBlocks), (block) => {
                return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                  key: block.type,
                  color: "neutral",
                  variant: "ghost",
                  "aria-label": block.label,
                  label: block.label,
                  icon: block.icon,
                  class: ["flex-col text-xs justify-center aspect-square rounded-none border-r border-b border-[var(--ui-border)] [&:nth-child(2n)]:border-r-0", { "block-added": vueExports.unref(addingType) === block.type }],
                  ui: { leadingIcon: "size-6" },
                  onClick: ($event) => addBlock(block.type)
                }, null, 8, ["aria-label", "label", "icon", "class", "onClick"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/BlocksView.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$d, [["__scopeId", "data-v-8a609928"]]), { __name: "PagebuilderBlocksView" });
const _sfc_main$c = /* @__PURE__ */ vueExports.defineComponent({
  __name: "LayersView",
  __ssrInlineRender: true,
  props: {
    portfolioId: {},
    pageId: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { fetcher } = useApi();
    const {
      pendingNewBlocks,
      pendingDeletions,
      pendingContentEdits,
      queueDeletion,
      setCurrentPage,
      addPendingBlock
    } = usePageEditor();
    const blockToDelete = vueExports.ref(null);
    const confirmDeleteOpen = vueExports.ref(false);
    function requestDelete(block) {
      blockToDelete.value = block;
      confirmDeleteOpen.value = true;
    }
    function confirmDelete() {
      if (!blockToDelete.value) return;
      const id = blockToDelete.value.id;
      if (id.startsWith("pending-")) {
        pendingNewBlocks.value = pendingNewBlocks.value.filter((b) => b.id !== id);
      } else {
        queueDeletion(id);
      }
      blockToDelete.value = null;
      confirmDeleteOpen.value = false;
    }
    function duplicateBlock(block) {
      const content = pendingContentEdits.value[block.id] ?? block.content;
      const newBlock = addPendingBlock(block.type, { ...content });
      const idx = contentBlocks.value.findIndex((b) => b.id === block.id);
      const newOrder = [...contentBlocks.value];
      newOrder.splice(idx + 1, 0, newBlock);
      reorder(newOrder);
      selectBlock(newBlock);
    }
    const dbContentBlocks = vueExports.ref([]);
    const headerBlock = vueExports.ref(null);
    const footerBlock = vueExports.ref(null);
    const loading = vueExports.ref(false);
    const error = vueExports.ref("");
    const visibilityChanges = vueExports.ref({});
    const reorderedIds = vueExports.ref(null);
    const resolvedPageId = vueExports.ref(null);
    const homePageId = vueExports.ref(null);
    async function resolvePageId() {
      if (!props.portfolioId) {
        resolvedPageId.value = null;
        return;
      }
      try {
        const data = await fetcher(`/api/portfolios/${props.portfolioId}/pages`, {
          credentials: "include"
        });
        const allPages = data.pages ?? [];
        const home = allPages.find((p) => p.slug === "home") ?? allPages[0] ?? null;
        homePageId.value = home?.id ?? null;
        resolvedPageId.value = props.pageId ?? home?.id ?? null;
      } catch {
        resolvedPageId.value = null;
        homePageId.value = null;
      }
    }
    async function fetchBlocks() {
      if (!props.portfolioId || !resolvedPageId.value) return;
      loading.value = true;
      error.value = "";
      visibilityChanges.value = {};
      reorderedIds.value = null;
      explicitOrder.value = null;
      try {
        const fetchPage = fetcher(
          `/api/portfolios/${props.portfolioId}/pages/${resolvedPageId.value}/blocks`,
          { credentials: "include" }
        );
        const fetchHome = homePageId.value && homePageId.value !== resolvedPageId.value ? fetcher(`/api/portfolios/${props.portfolioId}/pages/${homePageId.value}/blocks`, {
          credentials: "include"
        }).catch(() => ({ blocks: [] })) : fetchPage;
        const [pageData, homeData] = await Promise.all([fetchPage, fetchHome]);
        const pageBlocks = pageData.blocks ?? [];
        const homeBlocks = homeData.blocks ?? [];
        headerBlock.value = homeBlocks.find((b) => b.type === "header") ?? null;
        footerBlock.value = homeBlocks.find((b) => b.type === "footer") ?? null;
        dbContentBlocks.value = pageBlocks.filter((b) => b.type !== "header" && b.type !== "footer");
      } catch {
        error.value = "Failed to load blocks";
      } finally {
        loading.value = false;
      }
    }
    vueExports.watch(
      () => [props.portfolioId, props.pageId],
      async () => {
        await resolvePageId();
        await fetchBlocks();
      },
      { immediate: true }
    );
    vueExports.watch(resolvedPageId, (id) => setCurrentPage(id), { immediate: true });
    const { selectBlock, selectedBlock } = useSelectedBlock();
    const contentBlocks = vueExports.ref([]);
    const explicitOrder = vueExports.ref(null);
    function applyPendingContent(block) {
      const edits = pendingContentEdits.value[block.id];
      return edits ? { ...block, content: { ...block.content, ...edits } } : block;
    }
    vueExports.watch(
      [dbContentBlocks, pendingNewBlocks, pendingDeletions, pendingContentEdits, resolvedPageId],
      () => {
        const pageNewBlocks = pendingNewBlocks.value.filter((b) => b.pageId === resolvedPageId.value);
        const allBlocks = new Map(
          [...dbContentBlocks.value, ...pageNewBlocks].map((b) => [b.id, applyPendingContent(b)])
        );
        const order = explicitOrder.value;
        if (order) {
          const ordered = order.flatMap((id) => {
            const b = allBlocks.get(id);
            return b && !pendingDeletions.value.has(id) ? [b] : [];
          });
          const inOrder = new Set(order);
          const appended = [...allBlocks.values()].filter(
            (b) => !inOrder.has(b.id) && !pendingDeletions.value.has(b.id)
          );
          contentBlocks.value = [...ordered, ...appended];
        } else {
          contentBlocks.value = [...allBlocks.values()].filter((b) => !pendingDeletions.value.has(b.id));
        }
      },
      { immediate: true, deep: true }
    );
    function toggleVisibility(block) {
      block.isVisible = !block.isVisible;
      visibilityChanges.value[block.id] = block.isVisible;
    }
    function toggleHeaderVisibility() {
      if (!headerBlock.value) return;
      headerBlock.value.isVisible = !headerBlock.value.isVisible;
      visibilityChanges.value[headerBlock.value.id] = headerBlock.value.isVisible;
    }
    function toggleFooterVisibility() {
      if (!footerBlock.value) return;
      footerBlock.value.isVisible = !footerBlock.value.isVisible;
      visibilityChanges.value[footerBlock.value.id] = footerBlock.value.isVisible;
    }
    function onReorder() {
      explicitOrder.value = contentBlocks.value.map((b) => b.id);
      reorderedIds.value = contentBlocks.value.filter((b) => !b.id.startsWith("pending-")).map((b) => b.id);
    }
    function reorder(newList) {
      explicitOrder.value = newList.map((b) => b.id);
      reorderedIds.value = newList.filter((b) => !b.id.startsWith("pending-")).map((b) => b.id);
    }
    const layersChanges = vueExports.computed(() => ({
      visibilityChanges: visibilityChanges.value,
      reorderedIds: reorderedIds.value
    }));
    const liveHeaderBlock = vueExports.computed(
      () => headerBlock.value ? applyPendingContent(headerBlock.value) : null
    );
    const liveFooterBlock = vueExports.computed(
      () => footerBlock.value ? applyPendingContent(footerBlock.value) : null
    );
    __expose({
      layersChanges,
      portfolioId: vueExports.computed(() => props.portfolioId),
      pageId: resolvedPageId,
      homePageId,
      refresh: fetchBlocks,
      contentBlocks,
      dbContentBlocks,
      headerBlock: liveHeaderBlock,
      footerBlock: liveFooterBlock,
      explicitOrder,
      reorder
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d$1;
      const _component_UButton = _sfc_main$8$1;
      const _component_AdminConfirmModal = __nuxt_component_4$1;
      _push(`<div${ssrRenderAttrs_1(_attrs)}><div class="flex flex-col">`);
      if (vueExports.unref(loading)) {
        _push(`<div class="text-sm text-muted py-4 text-center">Loading…</div>`);
      } else if (vueExports.unref(error)) {
        _push(`<div class="text-sm text-error py-2">${ssrInterpolate_1(vueExports.unref(error))}</div>`);
      } else {
        _push(`<!--[-->`);
        if (vueExports.unref(headerBlock)) {
          _push(`<div class="${ssrRenderClass_1([
            vueExports.unref(selectedBlock)?.id === vueExports.unref(headerBlock).id ? "bg-elevated" : "bg-elevated/30 hover:bg-elevated/60",
            "flex items-center gap-1.5 px-2 py-3 text-sm cursor-pointer"
          ])}">`);
          _push(ssrRenderComponent_1(_component_UIcon, {
            name: "i-lucide-panel-top",
            class: "size-4 text-muted shrink-0"
          }, null, _parent));
          _push(`<span class="flex-1 truncate min-w-0"><span class="block truncate">${ssrInterpolate_1(vueExports.unref(headerBlock).name || vueExports.unref(headerBlock).type)}</span>`);
          if (vueExports.unref(headerBlock).name) {
            _push(`<span class="block text-xs text-muted capitalize">${ssrInterpolate_1(vueExports.unref(headerBlock).type)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span><div class="flex -my-0.5">`);
          _push(ssrRenderComponent_1(_component_UButton, {
            icon: vueExports.unref(headerBlock).isVisible ? "i-lucide-eye" : "i-lucide-eye-off",
            color: "neutral",
            variant: "ghost",
            size: "xs",
            class: [vueExports.unref(headerBlock).isVisible ? "text-highlighted" : "text-muted", "hover:text-highlighted hover:bg-accented/50"],
            onClick: toggleHeaderVisibility
          }, null, _parent));
          _push(ssrRenderComponent_1(_component_UButton, {
            icon: "i-lucide-lock",
            color: "neutral",
            variant: "ghost",
            size: "xs",
            class: "text-muted cursor-default",
            disabled: ""
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent_1(vueExports.unref(lo), {
          modelValue: vueExports.unref(contentBlocks),
          "onUpdate:modelValue": ($event) => vueExports.isRef(contentBlocks) ? contentBlocks.value = $event : null,
          handle: ".drag-handle",
          class: "flex flex-col",
          onEnd: onReorder
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList_1(vueExports.unref(contentBlocks), (block) => {
                _push2(`<div class="${ssrRenderClass_1([[
                  vueExports.unref(selectedBlock)?.id === block.id ? "bg-elevated" : "hover:bg-elevated/50",
                  { "opacity-50": !block.isVisible }
                ], "flex items-center gap-1.5 px-2 py-3 text-sm cursor-pointer"])}"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UIcon, {
                  name: "i-lucide-grip-vertical",
                  class: "drag-handle size-4 text-muted shrink-0 -ml-1 cursor-grab active:cursor-grabbing"
                }, null, _parent2, _scopeId));
                _push2(`<span class="flex-1 truncate min-w-0"${_scopeId}><span class="block truncate"${_scopeId}>${ssrInterpolate_1(block.name || block.type)}</span>`);
                if (block.name) {
                  _push2(`<span class="block text-xs text-muted capitalize"${_scopeId}>${ssrInterpolate_1(block.type)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span><div class="flex -my-0.5"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UButton, {
                  icon: block.isVisible ? "i-lucide-eye" : "i-lucide-eye-off",
                  color: "neutral",
                  variant: "ghost",
                  size: "xs",
                  class: [block.isVisible ? "text-highlighted" : "text-muted", "hover:text-highlighted hover:bg-accented/50"],
                  onClick: ($event) => toggleVisibility(block)
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent_1(_component_UButton, {
                  icon: "i-lucide-copy",
                  color: "neutral",
                  variant: "ghost",
                  size: "xs",
                  class: "text-muted hover:text-highlighted hover:bg-accented/50",
                  title: "Duplicate block",
                  onClick: ($event) => duplicateBlock(block)
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent_1(_component_UButton, {
                  icon: "i-lucide-trash",
                  color: "neutral",
                  variant: "ghost",
                  size: "xs",
                  class: vueExports.unref(pendingDeletions).has(block.id) ? "text-error" : "text-muted hover:text-highlighted hover:bg-accented/50",
                  onClick: ($event) => requestDelete(block)
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(contentBlocks), (block) => {
                  return vueExports.openBlock(), vueExports.createBlock("div", {
                    key: block.id,
                    class: ["flex items-center gap-1.5 px-2 py-3 text-sm cursor-pointer", [
                      vueExports.unref(selectedBlock)?.id === block.id ? "bg-elevated" : "hover:bg-elevated/50",
                      { "opacity-50": !block.isVisible }
                    ]],
                    onClick: ($event) => vueExports.unref(selectBlock)(block)
                  }, [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-lucide-grip-vertical",
                      class: "drag-handle size-4 text-muted shrink-0 -ml-1 cursor-grab active:cursor-grabbing"
                    }),
                    vueExports.createVNode("span", { class: "flex-1 truncate min-w-0" }, [
                      vueExports.createVNode("span", { class: "block truncate" }, vueExports.toDisplayString(block.name || block.type), 1),
                      block.name ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 0,
                        class: "block text-xs text-muted capitalize"
                      }, vueExports.toDisplayString(block.type), 1)) : vueExports.createCommentVNode("", true)
                    ]),
                    vueExports.createVNode("div", { class: "flex -my-0.5" }, [
                      vueExports.createVNode(_component_UButton, {
                        icon: block.isVisible ? "i-lucide-eye" : "i-lucide-eye-off",
                        color: "neutral",
                        variant: "ghost",
                        size: "xs",
                        class: [block.isVisible ? "text-highlighted" : "text-muted", "hover:text-highlighted hover:bg-accented/50"],
                        onClick: ($event) => toggleVisibility(block)
                      }, null, 8, ["icon", "class", "onClick"]),
                      vueExports.createVNode(_component_UButton, {
                        icon: "i-lucide-copy",
                        color: "neutral",
                        variant: "ghost",
                        size: "xs",
                        class: "text-muted hover:text-highlighted hover:bg-accented/50",
                        title: "Duplicate block",
                        onClick: vueExports.withModifiers(($event) => duplicateBlock(block), ["stop"])
                      }, null, 8, ["onClick"]),
                      vueExports.createVNode(_component_UButton, {
                        icon: "i-lucide-trash",
                        color: "neutral",
                        variant: "ghost",
                        size: "xs",
                        class: vueExports.unref(pendingDeletions).has(block.id) ? "text-error" : "text-muted hover:text-highlighted hover:bg-accented/50",
                        onClick: vueExports.withModifiers(($event) => requestDelete(block), ["stop"])
                      }, null, 8, ["class", "onClick"])
                    ])
                  ], 10, ["onClick"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        if (vueExports.unref(footerBlock)) {
          _push(`<div class="${ssrRenderClass_1([
            vueExports.unref(selectedBlock)?.id === vueExports.unref(footerBlock).id ? "bg-elevated" : "bg-elevated/30 hover:bg-elevated/60",
            "flex items-center gap-1.5 px-2 py-3 text-sm cursor-pointer"
          ])}">`);
          _push(ssrRenderComponent_1(_component_UIcon, {
            name: "i-lucide-panel-bottom",
            class: "size-4 text-muted shrink-0"
          }, null, _parent));
          _push(`<span class="flex-1 truncate min-w-0"><span class="block truncate">${ssrInterpolate_1(vueExports.unref(footerBlock).name || vueExports.unref(footerBlock).type)}</span>`);
          if (vueExports.unref(footerBlock).name) {
            _push(`<span class="block text-xs text-muted capitalize">${ssrInterpolate_1(vueExports.unref(footerBlock).type)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span><div class="flex -my-0.5">`);
          _push(ssrRenderComponent_1(_component_UButton, {
            icon: vueExports.unref(footerBlock).isVisible ? "i-lucide-eye" : "i-lucide-eye-off",
            color: "neutral",
            variant: "ghost",
            size: "xs",
            class: [vueExports.unref(footerBlock).isVisible ? "text-highlighted" : "text-muted", "hover:text-highlighted hover:bg-accented/50"],
            onClick: toggleFooterVisibility
          }, null, _parent));
          _push(ssrRenderComponent_1(_component_UButton, {
            icon: "i-lucide-lock",
            color: "neutral",
            variant: "ghost",
            size: "xs",
            class: "text-muted cursor-default",
            disabled: ""
          }, null, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent_1(_component_AdminConfirmModal, {
        open: vueExports.unref(confirmDeleteOpen),
        "onUpdate:open": ($event) => vueExports.isRef(confirmDeleteOpen) ? confirmDeleteOpen.value = $event : null,
        title: "Delete block?",
        description: `'${vueExports.unref(blockToDelete)?.name || vueExports.unref(blockToDelete)?.type}' will be removed when you save.`,
        "confirm-label": "Delete",
        onConfirm: confirmDelete,
        onCancel: ($event) => confirmDeleteOpen.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/LayersView.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_2$1 = Object.assign(_sfc_main$c, { __name: "PagebuilderLayersView" });
const theme$2 = {
  "slots": {
    "root": "w-full",
    "item": "border-b border-default last:border-b-0",
    "header": "flex",
    "trigger": "group flex-1 flex items-center gap-1.5 font-medium text-sm py-3.5 focus-visible:outline-primary min-w-0",
    "content": "data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none",
    "body": "text-sm pb-3.5",
    "leadingIcon": "shrink-0 size-5",
    "trailingIcon": "shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200",
    "label": "text-start break-words"
  },
  "variants": {
    "disabled": {
      "true": {
        "trigger": "cursor-not-allowed opacity-75"
      }
    }
  }
};
const _sfc_main$b = {
  __name: "UAccordion",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    items: { type: Array, required: false },
    trailingIcon: { type: null, required: false },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    collapsible: { type: Boolean, required: false, default: true },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    type: { type: String, required: false, default: "single" },
    disabled: { type: Boolean, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const props = useComponentProps("accordion", _props);
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "as", "collapsible", "defaultValue", "disabled", "modelValue", "unmountOnHide"), emits);
    const ui = vueExports.computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.accordion || {} })({
      disabled: props.disabled
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(AccordionRoot_default), vueExports.mergeProps(vueExports.unref(rootProps), {
        type: vueExports.unref(props).type,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList_1(vueExports.unref(props).items, (item, index) => {
              _push2(ssrRenderComponent_1(vueExports.unref(AccordionItem_default), {
                key: vueExports.unref(get)(item, vueExports.unref(props).valueKey) ?? index,
                value: vueExports.unref(get)(item, vueExports.unref(props).valueKey) ?? String(index),
                disabled: item.disabled,
                "data-slot": "item",
                class: ui.value.item({ class: [vueExports.unref(props).ui?.item, item.ui?.item, item.class] })
              }, {
                default: vueExports.withCtx(({ open }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent_1(vueExports.unref(AccordionHeader_default), {
                      as: "div",
                      "data-slot": "header",
                      class: ui.value.header({ class: [vueExports.unref(props).ui?.header, item.ui?.header] })
                    }, {
                      default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(vueExports.unref(AccordionTrigger_default), {
                            "data-slot": "trigger",
                            class: ui.value.trigger({ class: [vueExports.unref(props).ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                          }, {
                            default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                ssrRenderSlot_1(_ctx.$slots, "leading", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => {
                                  if (item.icon) {
                                    _push5(ssrRenderComponent_1(_sfc_main$d$1, {
                                      name: item.icon,
                                      "data-slot": "leadingIcon",
                                      class: ui.value.leadingIcon({ class: [vueExports.unref(props).ui?.leadingIcon, item?.ui?.leadingIcon] })
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                }, _push5, _parent5, _scopeId4);
                                if (vueExports.unref(get)(item, vueExports.unref(props).labelKey) || !!slots.default) {
                                  _push5(`<span data-slot="label" class="${ssrRenderClass_1(ui.value.label({ class: [vueExports.unref(props).ui?.label, item.ui?.label] }))}"${_scopeId4}>`);
                                  ssrRenderSlot_1(_ctx.$slots, "default", {
                                    item,
                                    index,
                                    open
                                  }, () => {
                                    _push5(`${ssrInterpolate_1(vueExports.unref(get)(item, vueExports.unref(props).labelKey))}`);
                                  }, _push5, _parent5, _scopeId4);
                                  _push5(`</span>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                ssrRenderSlot_1(_ctx.$slots, "trailing", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => {
                                  _push5(ssrRenderComponent_1(_sfc_main$d$1, {
                                    name: item.trailingIcon || vueExports.unref(props).trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                                    "data-slot": "trailingIcon",
                                    class: ui.value.trailingIcon({ class: [vueExports.unref(props).ui?.trailingIcon, item.ui?.trailingIcon] })
                                  }, null, _parent5, _scopeId4));
                                }, _push5, _parent5, _scopeId4);
                              } else {
                                return [
                                  vueExports.renderSlot(_ctx.$slots, "leading", {
                                    item,
                                    index,
                                    open,
                                    ui: ui.value
                                  }, () => [
                                    item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, {
                                      key: 0,
                                      name: item.icon,
                                      "data-slot": "leadingIcon",
                                      class: ui.value.leadingIcon({ class: [vueExports.unref(props).ui?.leadingIcon, item?.ui?.leadingIcon] })
                                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                  ]),
                                  vueExports.unref(get)(item, vueExports.unref(props).labelKey) || !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                    key: 0,
                                    "data-slot": "label",
                                    class: ui.value.label({ class: [vueExports.unref(props).ui?.label, item.ui?.label] })
                                  }, [
                                    vueExports.renderSlot(_ctx.$slots, "default", {
                                      item,
                                      index,
                                      open
                                    }, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, vueExports.unref(props).labelKey)), 1)
                                    ])
                                  ], 2)) : vueExports.createCommentVNode("", true),
                                  vueExports.renderSlot(_ctx.$slots, "trailing", {
                                    item,
                                    index,
                                    open,
                                    ui: ui.value
                                  }, () => [
                                    vueExports.createVNode(_sfc_main$d$1, {
                                      name: item.trailingIcon || vueExports.unref(props).trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                                      "data-slot": "trailingIcon",
                                      class: ui.value.trailingIcon({ class: [vueExports.unref(props).ui?.trailingIcon, item.ui?.trailingIcon] })
                                    }, null, 8, ["name", "class"])
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(vueExports.unref(AccordionTrigger_default), {
                              "data-slot": "trigger",
                              class: ui.value.trigger({ class: [vueExports.unref(props).ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.renderSlot(_ctx.$slots, "leading", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => [
                                  item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, {
                                    key: 0,
                                    name: item.icon,
                                    "data-slot": "leadingIcon",
                                    class: ui.value.leadingIcon({ class: [vueExports.unref(props).ui?.leadingIcon, item?.ui?.leadingIcon] })
                                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                ]),
                                vueExports.unref(get)(item, vueExports.unref(props).labelKey) || !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: 0,
                                  "data-slot": "label",
                                  class: ui.value.label({ class: [vueExports.unref(props).ui?.label, item.ui?.label] })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, "default", {
                                    item,
                                    index,
                                    open
                                  }, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, vueExports.unref(props).labelKey)), 1)
                                  ])
                                ], 2)) : vueExports.createCommentVNode("", true),
                                vueExports.renderSlot(_ctx.$slots, "trailing", {
                                  item,
                                  index,
                                  open,
                                  ui: ui.value
                                }, () => [
                                  vueExports.createVNode(_sfc_main$d$1, {
                                    name: item.trailingIcon || vueExports.unref(props).trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                                    "data-slot": "trailingIcon",
                                    class: ui.value.trailingIcon({ class: [vueExports.unref(props).ui?.trailingIcon, item.ui?.trailingIcon] })
                                  }, null, 8, ["name", "class"])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`]) {
                      _push3(ssrRenderComponent_1(vueExports.unref(AccordionContent_default), {
                        "data-slot": "content",
                        class: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] })
                      }, {
                        default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderSlot_1(_ctx.$slots, item.slot || "content", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => {
                              _push4(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: [vueExports.unref(props).ui?.body, item.ui?.body] }))}"${_scopeId3}>`);
                              ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => {
                                _push4(`${ssrInterpolate_1(item.content)}`);
                              }, _push4, _parent4, _scopeId3);
                              _push4(`</div>`);
                            }, _push4, _parent4, _scopeId3);
                          } else {
                            return [
                              vueExports.renderSlot(_ctx.$slots, item.slot || "content", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                vueExports.createVNode("div", {
                                  "data-slot": "body",
                                  class: ui.value.body({ class: [vueExports.unref(props).ui?.body, item.ui?.body] })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                                    item,
                                    index,
                                    open,
                                    ui: ui.value
                                  }, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(item.content), 1)
                                  ])
                                ], 2)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      vueExports.createVNode(vueExports.unref(AccordionHeader_default), {
                        as: "div",
                        "data-slot": "header",
                        class: ui.value.header({ class: [vueExports.unref(props).ui?.header, item.ui?.header] })
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(vueExports.unref(AccordionTrigger_default), {
                            "data-slot": "trigger",
                            class: ui.value.trigger({ class: [vueExports.unref(props).ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, "leading", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, {
                                  key: 0,
                                  name: item.icon,
                                  "data-slot": "leadingIcon",
                                  class: ui.value.leadingIcon({ class: [vueExports.unref(props).ui?.leadingIcon, item?.ui?.leadingIcon] })
                                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                              ]),
                              vueExports.unref(get)(item, vueExports.unref(props).labelKey) || !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                key: 0,
                                "data-slot": "label",
                                class: ui.value.label({ class: [vueExports.unref(props).ui?.label, item.ui?.label] })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, "default", {
                                  item,
                                  index,
                                  open
                                }, () => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, vueExports.unref(props).labelKey)), 1)
                                ])
                              ], 2)) : vueExports.createCommentVNode("", true),
                              vueExports.renderSlot(_ctx.$slots, "trailing", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                vueExports.createVNode(_sfc_main$d$1, {
                                  name: item.trailingIcon || vueExports.unref(props).trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                                  "data-slot": "trailingIcon",
                                  class: ui.value.trailingIcon({ class: [vueExports.unref(props).ui?.trailingIcon, item.ui?.trailingIcon] })
                                }, null, 8, ["name", "class"])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]),
                        _: 2
                      }, 1032, ["class"]),
                      item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`] ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(AccordionContent_default), {
                        key: 0,
                        "data-slot": "content",
                        class: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] })
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.renderSlot(_ctx.$slots, item.slot || "content", {
                            item,
                            index,
                            open,
                            ui: ui.value
                          }, () => [
                            vueExports.createVNode("div", {
                              "data-slot": "body",
                              class: ui.value.body({ class: [vueExports.unref(props).ui?.body, item.ui?.body] })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                                item,
                                index,
                                open,
                                ui: ui.value
                              }, () => [
                                vueExports.createTextVNode(vueExports.toDisplayString(item.content), 1)
                              ])
                            ], 2)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["class"])) : vueExports.createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(props).items, (item, index) => {
                return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(AccordionItem_default), {
                  key: vueExports.unref(get)(item, vueExports.unref(props).valueKey) ?? index,
                  value: vueExports.unref(get)(item, vueExports.unref(props).valueKey) ?? String(index),
                  disabled: item.disabled,
                  "data-slot": "item",
                  class: ui.value.item({ class: [vueExports.unref(props).ui?.item, item.ui?.item, item.class] })
                }, {
                  default: vueExports.withCtx(({ open }) => [
                    vueExports.createVNode(vueExports.unref(AccordionHeader_default), {
                      as: "div",
                      "data-slot": "header",
                      class: ui.value.header({ class: [vueExports.unref(props).ui?.header, item.ui?.header] })
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(vueExports.unref(AccordionTrigger_default), {
                          "data-slot": "trigger",
                          class: ui.value.trigger({ class: [vueExports.unref(props).ui?.trigger, item.ui?.trigger], disabled: item.disabled })
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.renderSlot(_ctx.$slots, "leading", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => [
                              item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [vueExports.unref(props).ui?.leadingIcon, item?.ui?.leadingIcon] })
                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                            ]),
                            vueExports.unref(get)(item, vueExports.unref(props).labelKey) || !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 0,
                              "data-slot": "label",
                              class: ui.value.label({ class: [vueExports.unref(props).ui?.label, item.ui?.label] })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "default", {
                                item,
                                index,
                                open
                              }, () => [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, vueExports.unref(props).labelKey)), 1)
                              ])
                            ], 2)) : vueExports.createCommentVNode("", true),
                            vueExports.renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => [
                              vueExports.createVNode(_sfc_main$d$1, {
                                name: item.trailingIcon || vueExports.unref(props).trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: [vueExports.unref(props).ui?.trailingIcon, item.ui?.trailingIcon] })
                              }, null, 8, ["name", "class"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"])
                      ]),
                      _: 2
                    }, 1032, ["class"]),
                    item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`] ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(AccordionContent_default), {
                      key: 0,
                      "data-slot": "content",
                      class: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] })
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.renderSlot(_ctx.$slots, item.slot || "content", {
                          item,
                          index,
                          open,
                          ui: ui.value
                        }, () => [
                          vueExports.createVNode("div", {
                            "data-slot": "body",
                            class: ui.value.body({ class: [vueExports.unref(props).ui?.body, item.ui?.body] })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-body` : "body", {
                              item,
                              index,
                              open,
                              ui: ui.value
                            }, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(item.content), 1)
                            ])
                          ], 2)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["class"])) : vueExports.createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["value", "disabled", "class"]);
              }), 128))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/Accordion.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const FONT_OPTIONS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Playfair Display",
  "Merriweather",
  "Raleway",
  "Poppins",
  "Source Sans 3"
].map((f) => ({ label: f, value: f }));
const _sfc_main$a = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ThemeView",
  __ssrInlineRender: true,
  props: {
    "selected": { default: null },
    "selectedModifiers": {},
    "fonts": {
      default: () => ({ heading: "Inter", body: "Inter" })
    },
    "fontsModifiers": {},
    "mode": { default: "light" },
    "modeModifiers": {},
    "maxContentWidth": { default: "sm" },
    "maxContentWidthModifiers": {}
  },
  emits: ["update:selected", "update:fonts", "update:mode", "update:maxContentWidth"],
  setup(__props) {
    const selected = vueExports.useModel(__props, "selected");
    const fonts = vueExports.useModel(__props, "fonts");
    const mode = vueExports.useModel(__props, "mode");
    const maxContentWidth = vueExports.useModel(__props, "maxContentWidth");
    const themes = useThemes();
    const themeModeOptions = [
      { label: "Only light mode", value: "light" },
      { label: "Only dark mode", value: "dark" },
      { label: "Enable both", value: "both" }
    ];
    const accordionItems = [
      { label: "Colors", slot: "colors" },
      { label: "Typography", slot: "typography" },
      { label: "Layout", slot: "layout" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAccordion = _sfc_main$b;
      const _component_USelect = _sfc_main$1$2;
      const _component_UIcon = _sfc_main$d$1;
      _push(ssrRenderComponent_1(_component_UAccordion, vueExports.mergeProps({
        items: accordionItems,
        multiple: "",
        "default-value": ["Colors", "Typography", "Layout"],
        class: "-mt-4"
      }, _attrs), {
        colors: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-3 pb-3"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_USelect, {
              modelValue: mode.value,
              "onUpdate:modelValue": ($event) => mode.value = $event,
              items: themeModeOptions,
              "value-key": "value"
            }, null, _parent2, _scopeId));
            _push2(`<div class="grid grid-cols-3 gap-2"${_scopeId}><!--[-->`);
            ssrRenderList_1(vueExports.unref(themes), (theme2) => {
              _push2(`<button type="button"${ssrRenderAttr_1("aria-label", theme2.label)}${ssrRenderAttr_1("title", theme2.label)} class="${ssrRenderClass_1([
                selected.value === theme2.id ? "border border-gray-500 bg-elevated/60" : "border-default bg-transparent hover:bg-elevated/40",
                "relative overflow-visible aspect-square rounded-md border p-1.5 cursor-pointer transition-colors"
              ])}"${_scopeId}>`);
              if (selected.value === theme2.id) {
                _push2(`<div class="absolute bottom-1 right-1 z-10 flex items-center justify-center size-4 rounded-full bg-success text-white"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UIcon, {
                  name: "i-lucide-check",
                  class: "size-2.5"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex w-full h-full gap-1.5"${_scopeId}><div class="h-full w-full rounded" style="${ssrRenderStyle_1({
                backgroundColor: theme2.light.primary,
                outline: `1px solid color-mix(in srgb, ${theme2.light.primary} 80%, black)`
              })}"${_scopeId}></div><div class="h-full w-full rounded" style="${ssrRenderStyle_1({
                backgroundColor: theme2.light.secondary,
                outline: `1px solid color-mix(in srgb, ${theme2.light.secondary} 80%, black)`
              })}"${_scopeId}></div></div></button>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex flex-col gap-3 pb-3" }, [
                vueExports.createVNode(_component_USelect, {
                  modelValue: mode.value,
                  "onUpdate:modelValue": ($event) => mode.value = $event,
                  items: themeModeOptions,
                  "value-key": "value"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                vueExports.createVNode("div", { class: "grid grid-cols-3 gap-2" }, [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(themes), (theme2) => {
                    return vueExports.openBlock(), vueExports.createBlock("button", {
                      key: theme2.id,
                      type: "button",
                      "aria-label": theme2.label,
                      title: theme2.label,
                      class: [
                        "relative overflow-visible aspect-square rounded-md border p-1.5 cursor-pointer transition-colors",
                        selected.value === theme2.id ? "border border-gray-500 bg-elevated/60" : "border-default bg-transparent hover:bg-elevated/40"
                      ],
                      onClick: ($event) => selected.value = theme2.id
                    }, [
                      selected.value === theme2.id ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "absolute bottom-1 right-1 z-10 flex items-center justify-center size-4 rounded-full bg-success text-white"
                      }, [
                        vueExports.createVNode(_component_UIcon, {
                          name: "i-lucide-check",
                          class: "size-2.5"
                        })
                      ])) : vueExports.createCommentVNode("", true),
                      vueExports.createVNode("div", { class: "flex w-full h-full gap-1.5" }, [
                        vueExports.createVNode("div", {
                          class: "h-full w-full rounded",
                          style: {
                            backgroundColor: theme2.light.primary,
                            outline: `1px solid color-mix(in srgb, ${theme2.light.primary} 80%, black)`
                          }
                        }, null, 4),
                        vueExports.createVNode("div", {
                          class: "h-full w-full rounded",
                          style: {
                            backgroundColor: theme2.light.secondary,
                            outline: `1px solid color-mix(in srgb, ${theme2.light.secondary} 80%, black)`
                          }
                        }, null, 4)
                      ])
                    ], 10, ["aria-label", "title", "onClick"]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        typography: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-3 pb-3"${_scopeId}><div class="flex flex-col gap-1"${_scopeId}><label class="text-xs text-muted"${_scopeId}>Heading font</label>`);
            _push2(ssrRenderComponent_1(_component_USelect, {
              "model-value": fonts.value.heading,
              items: vueExports.unref(FONT_OPTIONS),
              "value-key": "value",
              "onUpdate:modelValue": ($event) => fonts.value = { ...fonts.value, heading: $event }
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-1"${_scopeId}><label class="text-xs text-muted"${_scopeId}>Body font</label>`);
            _push2(ssrRenderComponent_1(_component_USelect, {
              "model-value": fonts.value.body,
              items: vueExports.unref(FONT_OPTIONS),
              "value-key": "value",
              "onUpdate:modelValue": ($event) => fonts.value = { ...fonts.value, body: $event }
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex flex-col gap-3 pb-3" }, [
                vueExports.createVNode("div", { class: "flex flex-col gap-1" }, [
                  vueExports.createVNode("label", { class: "text-xs text-muted" }, "Heading font"),
                  vueExports.createVNode(_component_USelect, {
                    "model-value": fonts.value.heading,
                    items: vueExports.unref(FONT_OPTIONS),
                    "value-key": "value",
                    "onUpdate:modelValue": ($event) => fonts.value = { ...fonts.value, heading: $event }
                  }, null, 8, ["model-value", "items", "onUpdate:modelValue"])
                ]),
                vueExports.createVNode("div", { class: "flex flex-col gap-1" }, [
                  vueExports.createVNode("label", { class: "text-xs text-muted" }, "Body font"),
                  vueExports.createVNode(_component_USelect, {
                    "model-value": fonts.value.body,
                    items: vueExports.unref(FONT_OPTIONS),
                    "value-key": "value",
                    "onUpdate:modelValue": ($event) => fonts.value = { ...fonts.value, body: $event }
                  }, null, 8, ["model-value", "items", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        layout: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-3 pb-3"${_scopeId}><div class="flex flex-col gap-1"${_scopeId}><label class="text-xs text-muted"${_scopeId}>Max content width</label>`);
            _push2(ssrRenderComponent_1(_component_USelect, {
              modelValue: maxContentWidth.value,
              "onUpdate:modelValue": ($event) => maxContentWidth.value = $event,
              items: vueExports.unref(MAX_CONTENT_WIDTH_OPTIONS),
              "value-key": "value"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex flex-col gap-3 pb-3" }, [
                vueExports.createVNode("div", { class: "flex flex-col gap-1" }, [
                  vueExports.createVNode("label", { class: "text-xs text-muted" }, "Max content width"),
                  vueExports.createVNode(_component_USelect, {
                    modelValue: maxContentWidth.value,
                    "onUpdate:modelValue": ($event) => maxContentWidth.value = $event,
                    items: vueExports.unref(MAX_CONTENT_WIDTH_OPTIONS),
                    "value-key": "value"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/ThemeView.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$a, { __name: "PagebuilderThemeView" });
const _sfc_main$9 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "LeftSidebar",
  __ssrInlineRender: true,
  props: {
    initialThemeSettings: {},
    portfolioId: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const panelViews = vueExports.ref([{ label: "Blocks" }, { label: "Layers" }, { label: "Theme" }]);
    const currentView = vueExports.ref("0");
    const currentThemeMode = vueExports.ref(
      props.initialThemeSettings?.mode ?? "light"
    );
    const selectedThemeId = vueExports.ref(props.initialThemeSettings?.themeId ?? null);
    const selectedFonts = vueExports.ref(
      props.initialThemeSettings?.fonts ?? { heading: "Inter", body: "Inter" }
    );
    const selectedMaxContentWidth = vueExports.ref(
      props.initialThemeSettings?.maxContentWidth ?? "sm"
    );
    const themeSettings = vueExports.computed(() => ({
      themeId: selectedThemeId.value,
      mode: currentThemeMode.value,
      fonts: selectedFonts.value,
      logoLight: props.initialThemeSettings?.logoLight ?? null,
      logoDark: props.initialThemeSettings?.logoDark ?? null,
      maxContentWidth: selectedMaxContentWidth.value
    }));
    vueExports.watch(
      () => props.initialThemeSettings,
      (settings) => {
        if (!settings) return;
        selectedThemeId.value = settings.themeId ?? null;
        currentThemeMode.value = settings.mode ?? "light";
        selectedFonts.value = settings.fonts ?? { heading: "Inter", body: "Inter" };
        selectedMaxContentWidth.value = settings.maxContentWidth ?? "sm";
      }
    );
    const isThemeDirty = vueExports.computed(
      () => selectedThemeId.value !== (props.initialThemeSettings?.themeId ?? null) || currentThemeMode.value !== (props.initialThemeSettings?.mode ?? "light") || selectedFonts.value.heading !== (props.initialThemeSettings?.fonts?.heading ?? "Inter") || selectedFonts.value.body !== (props.initialThemeSettings?.fonts?.body ?? "Inter") || selectedMaxContentWidth.value !== (props.initialThemeSettings?.maxContentWidth ?? "sm")
    );
    const { activePageId } = useActivePage();
    const { activeThemeId, activeThemeMode } = useActivePalette();
    vueExports.watch(
      selectedThemeId,
      (id) => {
        activeThemeId.value = id;
      },
      { immediate: true }
    );
    vueExports.watch(
      currentThemeMode,
      (mode) => {
        activeThemeMode.value = mode;
      },
      { immediate: true }
    );
    const { maxContentWidth: activeMaxContentWidth } = useLayoutSettings();
    vueExports.watch(
      selectedMaxContentWidth,
      (w) => {
        activeMaxContentWidth.value = w;
      },
      { immediate: true }
    );
    const layersView = vueExports.useTemplateRef("layersView");
    function onBlockAdded() {
      layersView.value?.refresh();
    }
    __expose({ themeSettings, isThemeDirty, layersView });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTabs = _sfc_main$h;
      const _component_PagebuilderBlocksView = __nuxt_component_1;
      const _component_PagebuilderLayersView = __nuxt_component_2$1;
      const _component_PagebuilderThemeView = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({ class: "flex flex-col w-64 shrink-0 border-r border-default" }, _attrs))}><div class="p-3 border-b border-default shrink-0">`);
      _push(ssrRenderComponent_1(_component_UTabs, {
        modelValue: vueExports.unref(currentView),
        "onUpdate:modelValue": ($event) => vueExports.isRef(currentView) ? currentView.value = $event : null,
        color: "success",
        content: false,
        items: vueExports.unref(panelViews),
        class: "w-full"
      }, null, _parent));
      _push(`</div><div class="flex-1 overflow-y-auto">`);
      _push(ssrRenderComponent_1(_component_PagebuilderBlocksView, {
        style: vueExports.unref(currentView) === "0" ? null : { display: "none" },
        onBlockAdded
      }, null, _parent));
      _push(ssrRenderComponent_1(_component_PagebuilderLayersView, {
        style: vueExports.unref(currentView) === "1" ? null : { display: "none" },
        ref_key: "layersView",
        ref: layersView,
        "portfolio-id": __props.portfolioId ?? null,
        "page-id": vueExports.unref(activePageId)
      }, null, _parent));
      _push(`<div class="p-3" style="${ssrRenderStyle_1(vueExports.unref(currentView) === "2" ? null : { display: "none" })}">`);
      _push(ssrRenderComponent_1(_component_PagebuilderThemeView, {
        selected: vueExports.unref(selectedThemeId),
        "onUpdate:selected": ($event) => vueExports.isRef(selectedThemeId) ? selectedThemeId.value = $event : null,
        fonts: vueExports.unref(selectedFonts),
        "onUpdate:fonts": ($event) => vueExports.isRef(selectedFonts) ? selectedFonts.value = $event : null,
        mode: vueExports.unref(currentThemeMode),
        "onUpdate:mode": ($event) => vueExports.isRef(currentThemeMode) ? currentThemeMode.value = $event : null,
        "max-content-width": vueExports.unref(selectedMaxContentWidth),
        "onUpdate:maxContentWidth": ($event) => vueExports.isRef(selectedMaxContentWidth) ? selectedMaxContentWidth.value = $event : null
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/LeftSidebar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$9, { __name: "PagebuilderLeftSidebar" });
const _sfc_main$8 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "PreviewBlock",
  __ssrInlineRender: true,
  props: {
    block: {}
  },
  setup(__props) {
    const props = __props;
    const { setBlockField } = usePageEditor();
    const { selectedBlock } = useSelectedBlock();
    const isSelected = vueExports.computed(() => selectedBlock.value?.id === props.block.id);
    vueExports.provide(inlineEditorKey, {
      get blockId() {
        return props.block.id;
      },
      get blockContent() {
        return props.block.content;
      },
      // Only allow edits when this block is selected — prevents stale Tiptap instances
      // in non-selected blocks from intercepting clicks
      get isActive() {
        return isSelected.value;
      },
      setField(path, value) {
        setBlockField(props.block.id, path, value, props.block.content);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push, _parent);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/PreviewBlock.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$8, { __name: "PagebuilderPreviewBlock" });
const _sfc_main$7 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Preview",
  __ssrInlineRender: true,
  props: {
    portfolioSlug: {},
    portfolioTitle: {},
    pageSlug: {},
    layersView: {},
    liveThemeSettings: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const liveThemeOverride = vueExports.computed(() => props.liveThemeSettings ?? null);
    const { cssVars, portfolioMode, navLinks, googleFontsUrl, logoLight, logoDark } = usePortfolio(
      props.portfolioSlug,
      liveThemeOverride,
      { skipBlocks: true }
    );
    vueExports.provide(portfolioSlugKey, props.portfolioSlug);
    const localBlocks = vueExports.ref([]);
    vueExports.watch(
      () => props.layersView?.contentBlocks,
      (blocks) => {
        if (blocks) localBlocks.value = [...blocks];
      },
      { immediate: true, deep: true }
    );
    const headerBlock = vueExports.computed(() => props.layersView?.headerBlock ?? null);
    const footerBlock = vueExports.computed(() => props.layersView?.footerBlock ?? null);
    const headerContent = vueExports.computed(() => {
      const block = headerBlock.value;
      if (!block) return void 0;
      const pending = pendingContentEdits.value[block.id];
      return pending ? { ...block.content, ...pending } : block.content;
    });
    const footerContent = vueExports.computed(
      () => footerBlock.value?.content
    );
    const { selectedBlock, selectBlock, clearSelection } = useSelectedBlock();
    const blockEls = vueExports.ref({});
    function setBlockRef(id, el) {
      if (el) blockEls.value[id] = el;
    }
    vueExports.watch(selectedBlock, async (block) => {
      if (!block) return;
      await vueExports.nextTick();
      blockEls.value[block.id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    const { addPendingBlock, pendingNewBlocks, queueDeletion, setBlockContent, pendingContentEdits } = usePageEditor();
    const portfolioLayout = vueExports.useTemplateRef("portfolioLayout");
    __expose({ portfolioLayout });
    function onHeaderSlotReorder(slots) {
      const block = headerBlock.value;
      if (!block) return;
      const base = pendingContentEdits.value[block.id] ?? block.content;
      setBlockContent(block.id, { ...base, ...slots });
    }
    const blockToDelete = vueExports.ref(null);
    const confirmDeleteOpen = vueExports.ref(false);
    function requestDelete(block) {
      blockToDelete.value = block;
      confirmDeleteOpen.value = true;
    }
    function confirmDelete() {
      const block = blockToDelete.value;
      if (!block) return;
      if (block.id.startsWith("pending-")) {
        pendingNewBlocks.value = pendingNewBlocks.value.filter((b) => b.id !== block.id);
      } else {
        queueDeletion(block.id);
      }
      if (selectedBlock.value?.id === block.id) clearSelection();
      blockToDelete.value = null;
      confirmDeleteOpen.value = false;
    }
    function duplicateBlock(block) {
      const content = pendingContentEdits.value[block.id] ?? block.content;
      const newBlock = addPendingBlock(block.type, { ...content });
      const idx = localBlocks.value.findIndex((b) => b.id === block.id);
      if (idx !== -1) {
        localBlocks.value.splice(idx + 1, 0, newBlock);
        props.layersView?.reorder([...localBlocks.value]);
      }
      selectBlock(newBlock);
    }
    function isSelected(block) {
      return selectedBlock.value?.id === block.id;
    }
    function onReorder() {
      props.layersView?.reorder([...localBlocks.value]);
    }
    function onBlockDragStart(event, block) {
      const dt = event.dataTransfer;
      if (!dt) return;
      const label = allBlockDefinitions.find((d) => d.type === block.type)?.label ?? block.name ?? block.type ?? "Block";
      const pill = (void 0).createElement("div");
      pill.textContent = label;
      Object.assign(pill.style, {
        position: "fixed",
        top: "-1000px",
        left: "-1000px",
        padding: "6px 14px",
        background: "rgb(1, 193, 106)",
        color: "#fff",
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: "500",
        pointerEvents: "none",
        whiteSpace: "nowrap"
      });
      (void 0).body.appendChild(pill);
      dt.setDragImage(pill, pill.offsetWidth / 2, 20);
      requestAnimationFrame(() => (void 0).body.removeChild(pill));
    }
    function onBlockDropped(event) {
      const idx = event.newIndex ?? localBlocks.value.length - 1;
      const dropped = localBlocks.value[idx];
      if (!("pageId" in dropped)) {
        const def = dropped;
        const newBlock = addPendingBlock(def.type, def.defaultContent ?? {});
        selectBlock(newBlock);
        localBlocks.value.splice(idx, 1, newBlock);
        props.layersView?.reorder([...localBlocks.value]);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PortfolioLayout = __nuxt_component_0$1;
      const _component_UIcon = _sfc_main$d$1;
      const _component_PagebuilderPreviewBlock = __nuxt_component_2;
      const _component_BlocksRenderer = __nuxt_component_3$2;
      const _component_AdminConfirmModal = __nuxt_component_4$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(_component_PortfolioLayout, {
        ref_key: "portfolioLayout",
        ref: portfolioLayout,
        "is-editor": "",
        "css-vars": vueExports.unref(cssVars),
        "portfolio-mode": vueExports.unref(portfolioMode),
        "site-name": __props.portfolioTitle,
        "home-url": __props.pageSlug === "home" ? `/p/${__props.portfolioSlug}` : `/p/${__props.portfolioSlug}/${__props.pageSlug}`,
        "nav-links": vueExports.unref(navLinks),
        "header-content": vueExports.unref(headerContent),
        "footer-content": vueExports.unref(footerContent),
        "google-fonts-url": vueExports.unref(googleFontsUrl),
        "logo-url": vueExports.unref(logoLight),
        "logo-url-dark": vueExports.unref(logoDark),
        "on-slot-reorder": onHeaderSlotReorder,
        onSelectHeader: ($event) => vueExports.unref(headerBlock) && vueExports.unref(selectBlock)(vueExports.unref(headerBlock)),
        onSelectFooter: ($event) => vueExports.unref(footerBlock) && vueExports.unref(selectBlock)(vueExports.unref(footerBlock)),
        onClick: ($event) => $event.target.closest("a") && $event.preventDefault()
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative min-h-64" data-v-625dc9a2${_scopeId}>`);
            if (vueExports.unref(localBlocks).length === 0) {
              _push2(`<div class="absolute inset-0 flex flex-col items-center justify-center gap-3 py-24 text-center pointer-events-none select-none z-10" data-v-625dc9a2${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-layout-template",
                class: "size-10 text-muted opacity-40"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm text-muted opacity-60" data-v-625dc9a2${_scopeId}> Drag a block here<br data-v-625dc9a2${_scopeId}> to start building </p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(vueExports.unref(lo), {
              modelValue: vueExports.unref(localBlocks),
              "onUpdate:modelValue": ($event) => vueExports.isRef(localBlocks) ? localBlocks.value = $event : null,
              group: { name: "blocks", pull: true, put: ["blocks"] },
              animation: 150,
              handle: ".block-drag-handle",
              filter: ".ProseMirror",
              "prevent-on-filter": false,
              "ghost-class": "preview-drop-ghost",
              "fallback-class": "preview-drag-fallback",
              class: "min-h-64 flex flex-col gap-2 py-2",
              onEnd: onReorder,
              onAdd: onBlockDropped
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList_1(vueExports.unref(localBlocks), (block) => {
                    _push3(`<div class="${ssrRenderClass_1([isSelected(block) ? "block-selected" : "block-hoverable", "group/block relative min-h-16 after:absolute after:inset-0 after:pointer-events-none after:transition-[outline] after:duration-150 after:outline-2 after:-outline-offset-2"])}" data-v-625dc9a2${_scopeId2}><div class="block-drag-handle w-8 h-8 flex justify-center items-center absolute top-2 left-1/2 -translate-x-1/2 z-10 cursor-grab active:cursor-grabbing opacity-0 group-hover/block:opacity-100 transition-opacity bg-black/50 rounded p-1" data-v-625dc9a2${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_UIcon, {
                      name: "i-lucide-grip-horizontal",
                      class: "size-4 text-white"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity" data-v-625dc9a2${_scopeId2}><button class="w-7 h-7 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded" title="Duplicate block" data-v-625dc9a2${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_UIcon, {
                      name: "i-lucide-copy",
                      class: "size-3.5 text-white"
                    }, null, _parent3, _scopeId2));
                    _push3(`</button><button class="w-7 h-7 flex items-center justify-center bg-black/50 hover:bg-red-600 rounded" title="Delete block" data-v-625dc9a2${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_UIcon, {
                      name: "i-lucide-trash-2",
                      class: "size-3.5 text-white"
                    }, null, _parent3, _scopeId2));
                    _push3(`</button></div>`);
                    _push3(ssrRenderComponent_1(_component_PagebuilderPreviewBlock, { block }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(_component_BlocksRenderer, { block }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_BlocksRenderer, { block }, null, 8, ["block"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(localBlocks), (block) => {
                      return vueExports.openBlock(), vueExports.createBlock("div", {
                        key: block.id,
                        ref_for: true,
                        ref: (el) => setBlockRef(block.id, el),
                        class: ["group/block relative min-h-16 after:absolute after:inset-0 after:pointer-events-none after:transition-[outline] after:duration-150 after:outline-2 after:-outline-offset-2", isSelected(block) ? "block-selected" : "block-hoverable"],
                        onDragstart: ($event) => onBlockDragStart($event, block),
                        onClick: ($event) => vueExports.unref(selectBlock)(block)
                      }, [
                        vueExports.createVNode("div", { class: "block-drag-handle w-8 h-8 flex justify-center items-center absolute top-2 left-1/2 -translate-x-1/2 z-10 cursor-grab active:cursor-grabbing opacity-0 group-hover/block:opacity-100 transition-opacity bg-black/50 rounded p-1" }, [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-lucide-grip-horizontal",
                            class: "size-4 text-white"
                          })
                        ]),
                        vueExports.createVNode("div", { class: "absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity" }, [
                          vueExports.createVNode("button", {
                            class: "w-7 h-7 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded",
                            title: "Duplicate block",
                            onClick: vueExports.withModifiers(($event) => duplicateBlock(block), ["stop"])
                          }, [
                            vueExports.createVNode(_component_UIcon, {
                              name: "i-lucide-copy",
                              class: "size-3.5 text-white"
                            })
                          ], 8, ["onClick"]),
                          vueExports.createVNode("button", {
                            class: "w-7 h-7 flex items-center justify-center bg-black/50 hover:bg-red-600 rounded",
                            title: "Delete block",
                            onClick: vueExports.withModifiers(($event) => requestDelete(block), ["stop"])
                          }, [
                            vueExports.createVNode(_component_UIcon, {
                              name: "i-lucide-trash-2",
                              class: "size-3.5 text-white"
                            })
                          ], 8, ["onClick"])
                        ]),
                        vueExports.createVNode(_component_PagebuilderPreviewBlock, { block }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_BlocksRenderer, { block }, null, 8, ["block"])
                          ]),
                          _: 2
                        }, 1032, ["block"])
                      ], 42, ["onDragstart", "onClick"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "relative min-h-64" }, [
                vueExports.createVNode(vueExports.Transition, { name: "fade" }, {
                  default: vueExports.withCtx(() => [
                    vueExports.unref(localBlocks).length === 0 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "absolute inset-0 flex flex-col items-center justify-center gap-3 py-24 text-center pointer-events-none select-none z-10"
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-lucide-layout-template",
                        class: "size-10 text-muted opacity-40"
                      }),
                      vueExports.createVNode("p", { class: "text-sm text-muted opacity-60" }, [
                        vueExports.createTextVNode(" Drag a block here"),
                        vueExports.createVNode("br"),
                        vueExports.createTextVNode(" to start building ")
                      ])
                    ])) : vueExports.createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                vueExports.createVNode(vueExports.unref(lo), {
                  modelValue: vueExports.unref(localBlocks),
                  "onUpdate:modelValue": ($event) => vueExports.isRef(localBlocks) ? localBlocks.value = $event : null,
                  group: { name: "blocks", pull: true, put: ["blocks"] },
                  animation: 150,
                  handle: ".block-drag-handle",
                  filter: ".ProseMirror",
                  "prevent-on-filter": false,
                  "ghost-class": "preview-drop-ghost",
                  "fallback-class": "preview-drag-fallback",
                  class: "min-h-64 flex flex-col gap-2 py-2",
                  onEnd: onReorder,
                  onAdd: onBlockDropped
                }, {
                  default: vueExports.withCtx(() => [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(localBlocks), (block) => {
                      return vueExports.openBlock(), vueExports.createBlock("div", {
                        key: block.id,
                        ref_for: true,
                        ref: (el) => setBlockRef(block.id, el),
                        class: ["group/block relative min-h-16 after:absolute after:inset-0 after:pointer-events-none after:transition-[outline] after:duration-150 after:outline-2 after:-outline-offset-2", isSelected(block) ? "block-selected" : "block-hoverable"],
                        onDragstart: ($event) => onBlockDragStart($event, block),
                        onClick: ($event) => vueExports.unref(selectBlock)(block)
                      }, [
                        vueExports.createVNode("div", { class: "block-drag-handle w-8 h-8 flex justify-center items-center absolute top-2 left-1/2 -translate-x-1/2 z-10 cursor-grab active:cursor-grabbing opacity-0 group-hover/block:opacity-100 transition-opacity bg-black/50 rounded p-1" }, [
                          vueExports.createVNode(_component_UIcon, {
                            name: "i-lucide-grip-horizontal",
                            class: "size-4 text-white"
                          })
                        ]),
                        vueExports.createVNode("div", { class: "absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity" }, [
                          vueExports.createVNode("button", {
                            class: "w-7 h-7 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded",
                            title: "Duplicate block",
                            onClick: vueExports.withModifiers(($event) => duplicateBlock(block), ["stop"])
                          }, [
                            vueExports.createVNode(_component_UIcon, {
                              name: "i-lucide-copy",
                              class: "size-3.5 text-white"
                            })
                          ], 8, ["onClick"]),
                          vueExports.createVNode("button", {
                            class: "w-7 h-7 flex items-center justify-center bg-black/50 hover:bg-red-600 rounded",
                            title: "Delete block",
                            onClick: vueExports.withModifiers(($event) => requestDelete(block), ["stop"])
                          }, [
                            vueExports.createVNode(_component_UIcon, {
                              name: "i-lucide-trash-2",
                              class: "size-3.5 text-white"
                            })
                          ], 8, ["onClick"])
                        ]),
                        vueExports.createVNode(_component_PagebuilderPreviewBlock, { block }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_BlocksRenderer, { block }, null, 8, ["block"])
                          ]),
                          _: 2
                        }, 1032, ["block"])
                      ], 42, ["onDragstart", "onClick"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent_1(_component_AdminConfirmModal, {
        open: vueExports.unref(confirmDeleteOpen),
        "onUpdate:open": ($event) => vueExports.isRef(confirmDeleteOpen) ? confirmDeleteOpen.value = $event : null,
        title: "Delete block?",
        description: `'${vueExports.unref(blockToDelete)?.name || vueExports.unref(blockToDelete)?.type}' will be removed when you save.`,
        "confirm-label": "Delete",
        onConfirm: confirmDelete,
        onCancel: ($event) => confirmDeleteOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/Preview.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["__scopeId", "data-v-625dc9a2"]]), { __name: "PagebuilderPreview" });
const _sfc_main$6 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ThemeColorPicker",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { palette, resolveColor } = useActivePalette();
    const open = vueExports.ref(false);
    const activeColor = vueExports.computed(() => resolveColor(props.modelValue));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UPopover = _sfc_main$2$2;
      const _component_UIcon = _sfc_main$d$1;
      _push(ssrRenderComponent_1(_component_UPopover, vueExports.mergeProps({
        open: vueExports.unref(open),
        "onUpdate:open": ($event) => vueExports.isRef(open) ? open.value = $event : null,
        content: { align: "end" }
      }, _attrs), {
        content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2"${_scopeId}><div class="grid grid-cols-3 gap-1.5"${_scopeId}><button type="button" class="${ssrRenderClass_1([!__props.modelValue ? "border-primary" : "border-default", "size-8 rounded border-2 flex items-center justify-center transition-colors hover:border-primary"])}" title="None"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UIcon, {
              name: "i-lucide-ban",
              class: "size-4 text-muted"
            }, null, _parent2, _scopeId));
            _push2(`</button><!--[-->`);
            ssrRenderList_1(vueExports.unref(palette), (entry) => {
              _push2(`<button type="button" class="${ssrRenderClass_1([__props.modelValue === entry.key ? "border-primary" : "border-default", "size-8 rounded border-2 transition-colors hover:border-primary"])}" style="${ssrRenderStyle_1({ backgroundColor: vueExports.unref(resolveColor)(entry.key) ?? void 0 })}"${ssrRenderAttr_1("title", entry.label)}${_scopeId}></button>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "p-2" }, [
                vueExports.createVNode("div", { class: "grid grid-cols-3 gap-1.5" }, [
                  vueExports.createVNode("button", {
                    type: "button",
                    class: ["size-8 rounded border-2 flex items-center justify-center transition-colors hover:border-primary", !__props.modelValue ? "border-primary" : "border-default"],
                    title: "None",
                    onClick: ($event) => {
                      emit("update:modelValue", null);
                      open.value = false;
                    }
                  }, [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-lucide-ban",
                      class: "size-4 text-muted"
                    })
                  ], 10, ["onClick"]),
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(palette), (entry) => {
                    return vueExports.openBlock(), vueExports.createBlock("button", {
                      key: entry.key,
                      type: "button",
                      class: ["size-8 rounded border-2 transition-colors hover:border-primary", __props.modelValue === entry.key ? "border-primary" : "border-default"],
                      style: { backgroundColor: vueExports.unref(resolveColor)(entry.key) ?? void 0 },
                      title: entry.label,
                      onClick: ($event) => {
                        emit("update:modelValue", entry.key);
                        open.value = false;
                      }
                    }, null, 14, ["title", "onClick"]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button type="button" class="size-6 rounded border-2 border-default hover:border-primary transition-colors shrink-0" style="${ssrRenderStyle_1(vueExports.unref(activeColor) ? { backgroundColor: vueExports.unref(activeColor) } : {})}"${ssrRenderAttr_1("title", vueExports.unref(palette).find((p) => p.key === __props.modelValue)?.label ?? "None")}${_scopeId}>`);
            if (!vueExports.unref(activeColor)) {
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-ban",
                class: "size-3.5 text-muted m-auto block"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button>`);
          } else {
            return [
              vueExports.createVNode("button", {
                type: "button",
                class: "size-6 rounded border-2 border-default hover:border-primary transition-colors shrink-0",
                style: vueExports.unref(activeColor) ? { backgroundColor: vueExports.unref(activeColor) } : {},
                title: vueExports.unref(palette).find((p) => p.key === __props.modelValue)?.label ?? "None"
              }, [
                !vueExports.unref(activeColor) ? (vueExports.openBlock(), vueExports.createBlock(_component_UIcon, {
                  key: 0,
                  name: "i-lucide-ban",
                  class: "size-3.5 text-muted m-auto block"
                })) : vueExports.createCommentVNode("", true)
              ], 12, ["title"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/ThemeColorPicker.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$6, { __name: "PagebuilderThemeColorPicker" });
const _sfc_main$5 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ListFieldEditor",
  __ssrInlineRender: true,
  props: {
    field: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const items = vueExports.computed({
      get: () => props.modelValue ?? [],
      set: (val) => emit("update:modelValue", val)
    });
    const expanded = vueExports.ref(null);
    function addItem() {
      const newItem = props.field.defaultItem?.() ?? { id: crypto.randomUUID() };
      const next = [...items.value, newItem];
      emit("update:modelValue", next);
      expanded.value = next.length - 1;
    }
    function removeItem(index) {
      const next = items.value.filter((_, i) => i !== index);
      emit("update:modelValue", next);
      if (expanded.value === index) {
        expanded.value = next.length > 0 ? Math.min(index, next.length - 1) : null;
      } else if (expanded.value !== null && expanded.value > index) {
        expanded.value -= 1;
      }
    }
    function updateItemField(index, key, value) {
      const next = items.value.map((item, i) => i === index ? { ...item, [key]: value } : item);
      emit("update:modelValue", next);
    }
    function getItemField(item, key) {
      return item[key];
    }
    function itemSummary(item) {
      const firstKey = props.field.itemFields?.[0]?.key;
      if (firstKey && typeof item[firstKey] === "string" && item[firstKey]) {
        return item[firstKey];
      }
      return props.field.itemLabel ?? "Item";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d$1;
      const _component_UButton = _sfc_main$8$1;
      const _component_UTextarea = _sfc_main$1$1;
      const _component_USelect = _sfc_main$1$2;
      const _component_UInput = _sfc_main$i;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({ class: "flex flex-col gap-1" }, _attrs))}>`);
      _push(ssrRenderComponent_1(vueExports.unref(lo), {
        modelValue: vueExports.unref(items),
        "onUpdate:modelValue": ($event) => vueExports.isRef(items) ? items.value = $event : null,
        handle: ".list-drag-handle",
        class: "flex flex-col gap-1"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList_1(vueExports.unref(items), (item, index) => {
              _push2(`<div class="border border-default rounded-md overflow-hidden"${_scopeId}><div class="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-elevated/50 select-none"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-grip-vertical",
                class: "list-drag-handle size-3.5 text-muted shrink-0 cursor-grab active:cursor-grabbing",
                onClick: () => {
                }
              }, null, _parent2, _scopeId));
              _push2(`<span class="flex-1 text-xs truncate min-w-0 text-highlighted"${_scopeId}>${ssrInterpolate_1(itemSummary(item))}</span>`);
              _push2(ssrRenderComponent_1(_component_UButton, {
                icon: "i-lucide-trash-2",
                color: "neutral",
                variant: "ghost",
                size: "xs",
                class: "text-muted hover:text-error shrink-0",
                "aria-label": `Remove ${__props.field.itemLabel ?? "item"}`,
                onClick: ($event) => removeItem(index)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: vueExports.unref(expanded) === index ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
                class: "size-3.5 text-muted shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (vueExports.unref(expanded) === index) {
                _push2(`<div class="px-2 pb-2 pt-1 flex flex-col gap-2 border-t border-default"${_scopeId}><!--[-->`);
                ssrRenderList_1(__props.field.itemFields, (subField) => {
                  _push2(`<div class="flex flex-col gap-1"${_scopeId}><label class="text-xs text-muted"${_scopeId}>${ssrInterpolate_1(subField.label)}</label>`);
                  if (subField.type === "textarea") {
                    _push2(ssrRenderComponent_1(_component_UTextarea, {
                      "model-value": getItemField(item, subField.key) ?? "",
                      placeholder: subField.placeholder,
                      size: "sm",
                      autoresize: "",
                      rows: 2,
                      "onUpdate:modelValue": ($event) => updateItemField(index, subField.key, $event)
                    }, null, _parent2, _scopeId));
                  } else if (subField.type === "select") {
                    _push2(ssrRenderComponent_1(_component_USelect, {
                      "model-value": getItemField(item, subField.key) ?? "",
                      items: subField.options ?? [],
                      size: "sm",
                      "onUpdate:modelValue": ($event) => updateItemField(index, subField.key, $event)
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(ssrRenderComponent_1(_component_UInput, {
                      "model-value": getItemField(item, subField.key) ?? "",
                      placeholder: subField.placeholder,
                      type: subField.type === "url" ? "url" : "text",
                      size: "sm",
                      "onUpdate:modelValue": ($event) => updateItemField(index, subField.key, $event)
                    }, null, _parent2, _scopeId));
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(items), (item, index) => {
                return vueExports.openBlock(), vueExports.createBlock("div", {
                  key: item.id ?? index,
                  class: "border border-default rounded-md overflow-hidden"
                }, [
                  vueExports.createVNode("div", {
                    class: "flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-elevated/50 select-none",
                    onClick: ($event) => expanded.value = vueExports.unref(expanded) === index ? null : index
                  }, [
                    vueExports.createVNode(_component_UIcon, {
                      name: "i-lucide-grip-vertical",
                      class: "list-drag-handle size-3.5 text-muted shrink-0 cursor-grab active:cursor-grabbing",
                      onClick: vueExports.withModifiers(() => {
                      }, ["stop"])
                    }, null, 8, ["onClick"]),
                    vueExports.createVNode("span", { class: "flex-1 text-xs truncate min-w-0 text-highlighted" }, vueExports.toDisplayString(itemSummary(item)), 1),
                    vueExports.createVNode(_component_UButton, {
                      icon: "i-lucide-trash-2",
                      color: "neutral",
                      variant: "ghost",
                      size: "xs",
                      class: "text-muted hover:text-error shrink-0",
                      "aria-label": `Remove ${__props.field.itemLabel ?? "item"}`,
                      onClick: vueExports.withModifiers(($event) => removeItem(index), ["stop"])
                    }, null, 8, ["aria-label", "onClick"]),
                    vueExports.createVNode(_component_UIcon, {
                      name: vueExports.unref(expanded) === index ? "i-lucide-chevron-up" : "i-lucide-chevron-down",
                      class: "size-3.5 text-muted shrink-0"
                    }, null, 8, ["name"])
                  ], 8, ["onClick"]),
                  vueExports.unref(expanded) === index ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "px-2 pb-2 pt-1 flex flex-col gap-2 border-t border-default"
                  }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.field.itemFields, (subField) => {
                      return vueExports.openBlock(), vueExports.createBlock("div", {
                        key: subField.key,
                        class: "flex flex-col gap-1"
                      }, [
                        vueExports.createVNode("label", { class: "text-xs text-muted" }, vueExports.toDisplayString(subField.label), 1),
                        subField.type === "textarea" ? (vueExports.openBlock(), vueExports.createBlock(_component_UTextarea, {
                          key: 0,
                          "model-value": getItemField(item, subField.key) ?? "",
                          placeholder: subField.placeholder,
                          size: "sm",
                          autoresize: "",
                          rows: 2,
                          "onUpdate:modelValue": ($event) => updateItemField(index, subField.key, $event)
                        }, null, 8, ["model-value", "placeholder", "onUpdate:modelValue"])) : subField.type === "select" ? (vueExports.openBlock(), vueExports.createBlock(_component_USelect, {
                          key: 1,
                          "model-value": getItemField(item, subField.key) ?? "",
                          items: subField.options ?? [],
                          size: "sm",
                          "onUpdate:modelValue": ($event) => updateItemField(index, subField.key, $event)
                        }, null, 8, ["model-value", "items", "onUpdate:modelValue"])) : (vueExports.openBlock(), vueExports.createBlock(_component_UInput, {
                          key: 2,
                          "model-value": getItemField(item, subField.key) ?? "",
                          placeholder: subField.placeholder,
                          type: subField.type === "url" ? "url" : "text",
                          size: "sm",
                          "onUpdate:modelValue": ($event) => updateItemField(index, subField.key, $event)
                        }, null, 8, ["model-value", "placeholder", "type", "onUpdate:modelValue"]))
                      ]);
                    }), 128))
                  ])) : vueExports.createCommentVNode("", true)
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent_1(_component_UButton, {
        icon: "i-lucide-plus",
        color: "neutral",
        variant: "subtle",
        size: "xs",
        class: "w-full mt-1 flex justify-center",
        onClick: addItem
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Add ${ssrInterpolate_1(__props.field.itemLabel ?? "item")}`);
          } else {
            return [
              vueExports.createTextVNode(" Add " + vueExports.toDisplayString(__props.field.itemLabel ?? "item"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/ListFieldEditor.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$5, { __name: "PagebuilderListFieldEditor" });
const theme$1 = {
  "slots": {
    "root": "relative flex items-start",
    "container": "flex items-center",
    "base": "rounded-sm ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full text-inverted",
    "icon": "shrink-0 size-full",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "focus-visible:outline-primary",
        "indicator": "bg-primary"
      },
      "secondary": {
        "base": "focus-visible:outline-secondary",
        "indicator": "bg-secondary"
      },
      "success": {
        "base": "focus-visible:outline-success",
        "indicator": "bg-success"
      },
      "info": {
        "base": "focus-visible:outline-info",
        "indicator": "bg-info"
      },
      "warning": {
        "base": "focus-visible:outline-warning",
        "indicator": "bg-warning"
      },
      "error": {
        "base": "focus-visible:outline-error",
        "indicator": "bg-error"
      },
      "neutral": {
        "base": "focus-visible:outline-inverted",
        "indicator": "bg-inverted"
      }
    },
    "variant": {
      "list": {
        "root": ""
      },
      "card": {
        "root": "border border-muted rounded-lg"
      }
    },
    "indicator": {
      "start": {
        "root": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "root": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "text-center"
      }
    },
    "size": {
      "xs": {
        "base": "size-3",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "size-3.5",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "size-4",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "size-4.5",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "size-5",
        "container": "h-6",
        "wrapper": "text-base"
      }
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
    },
    "highlight": {
      "true": ""
    },
    "checked": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "size": "xs",
      "variant": "card",
      "class": {
        "root": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": "card",
      "class": {
        "root": "p-3"
      }
    },
    {
      "size": "md",
      "variant": "card",
      "class": {
        "root": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": "card",
      "class": {
        "root": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": "card",
      "class": {
        "root": "p-4.5"
      }
    },
    {
      "color": "primary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-secondary"
      }
    },
    {
      "color": "success",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-success"
      }
    },
    {
      "color": "info",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-info"
      }
    },
    {
      "color": "warning",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-warning"
      }
    },
    {
      "color": "error",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-error"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-inverted"
      }
    },
    {
      "variant": "card",
      "disabled": true,
      "class": {
        "root": "cursor-not-allowed"
      }
    },
    {
      "color": "primary",
      "highlight": true,
      "class": {
        "base": "ring-primary"
      }
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": {
        "base": "ring-secondary"
      }
    },
    {
      "color": "success",
      "highlight": true,
      "class": {
        "base": "ring-success"
      }
    },
    {
      "color": "info",
      "highlight": true,
      "class": {
        "base": "ring-info"
      }
    },
    {
      "color": "warning",
      "highlight": true,
      "class": {
        "base": "ring-warning"
      }
    },
    {
      "color": "error",
      "highlight": true,
      "class": {
        "base": "ring-error"
      }
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": {
        "base": "ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "list",
    "indicator": "start"
  }
};
const _sfc_main$4 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UCheckbox",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    indicator: { type: null, required: false },
    highlight: { type: Boolean, required: false },
    icon: { type: null, required: false },
    indeterminateIcon: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    disabled: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    name: { type: String, required: false },
    value: { type: null, required: false },
    id: { type: String, required: false },
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
    const props = useComponentProps("checkbox", _props);
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue", "modelValue", "trueValue", "falseValue"), emits);
    const { id: _id, emitFormChange, emitFormInput, size, color, highlight, name, disabled, ariaAttrs } = useFormField(_props);
    const id = _id.value ?? vueExports.useId();
    const attrs = vueExports.useAttrs();
    const forwardedAttrs = vueExports.computed(() => {
      const { "data-state": _, ...rest } = attrs;
      return rest;
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.checkbox || {} })({
      size: size.value ?? props.size,
      color: color.value ?? props.color,
      variant: props.variant,
      indicator: props.indicator,
      highlight: highlight.value ?? props.highlight,
      required: props.required,
      disabled: disabled.value
    }));
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: !vueExports.unref(props).variant || vueExports.unref(props).variant === "list" ? vueExports.unref(props).as : vueExports.unref(Label_default),
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="container" class="${ssrRenderClass_1(ui.value.container({ class: vueExports.unref(props).ui?.container }))}"${_scopeId}>`);
            _push2(ssrRenderComponent_1(vueExports.unref(CheckboxRoot_default), vueExports.mergeProps({ id: vueExports.unref(id) }, { ...vueExports.unref(rootProps), ...forwardedAttrs.value, ...vueExports.unref(ariaAttrs) }, {
              name: vueExports.unref(name),
              disabled: vueExports.unref(disabled),
              "data-slot": "base",
              class: ui.value.base({ class: vueExports.unref(props).ui?.base }),
              "onUpdate:modelValue": onUpdate
            }), {
              default: vueExports.withCtx(({ state }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(CheckboxIndicator_default), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: vueExports.unref(props).ui?.indicator })
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (state === "indeterminate") {
                          _push4(ssrRenderComponent_1(_sfc_main$d$1, {
                            name: vueExports.unref(props).indeterminateIcon || vueExports.unref(appConfig).ui.icons.minus,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent_1(_sfc_main$d$1, {
                            name: vueExports.unref(props).icon || vueExports.unref(appConfig).ui.icons.check,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                          }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          state === "indeterminate" ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, {
                            key: 0,
                            name: vueExports.unref(props).indeterminateIcon || vueExports.unref(appConfig).ui.icons.minus,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                          }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, {
                            key: 1,
                            name: vueExports.unref(props).icon || vueExports.unref(appConfig).ui.icons.check,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                          }, null, 8, ["name", "class"]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(CheckboxIndicator_default), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: vueExports.unref(props).ui?.indicator })
                    }, {
                      default: vueExports.withCtx(() => [
                        state === "indeterminate" ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, {
                          key: 0,
                          name: vueExports.unref(props).indeterminateIcon || vueExports.unref(appConfig).ui.icons.minus,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                        }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, {
                          key: 1,
                          name: vueExports.unref(props).icon || vueExports.unref(appConfig).ui.icons.check,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                        }, null, 8, ["name", "class"]))
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (vueExports.unref(props).label || !!slots.label || (vueExports.unref(props).description || !!slots.description)) {
              _push2(`<div data-slot="wrapper" class="${ssrRenderClass_1(ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper }))}"${_scopeId}>`);
              if (vueExports.unref(props).label || !!slots.label) {
                ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(!vueExports.unref(props).variant || vueExports.unref(props).variant === "list" ? vueExports.unref(Label_default) : "p"), {
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
                }), _parent2, _scopeId);
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
                vueExports.createVNode(vueExports.unref(CheckboxRoot_default), vueExports.mergeProps({ id: vueExports.unref(id) }, { ...vueExports.unref(rootProps), ...forwardedAttrs.value, ...vueExports.unref(ariaAttrs) }, {
                  name: vueExports.unref(name),
                  disabled: vueExports.unref(disabled),
                  "data-slot": "base",
                  class: ui.value.base({ class: vueExports.unref(props).ui?.base }),
                  "onUpdate:modelValue": onUpdate
                }), {
                  default: vueExports.withCtx(({ state }) => [
                    vueExports.createVNode(vueExports.unref(CheckboxIndicator_default), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: vueExports.unref(props).ui?.indicator })
                    }, {
                      default: vueExports.withCtx(() => [
                        state === "indeterminate" ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, {
                          key: 0,
                          name: vueExports.unref(props).indeterminateIcon || vueExports.unref(appConfig).ui.icons.minus,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                        }, null, 8, ["name", "class"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, {
                          key: 1,
                          name: vueExports.unref(props).icon || vueExports.unref(appConfig).ui.icons.check,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: vueExports.unref(props).ui?.icon })
                        }, null, 8, ["name", "class"]))
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ]),
                  _: 1
                }, 16, ["id", "name", "disabled", "class"])
              ], 2),
              vueExports.unref(props).label || !!slots.label || (vueExports.unref(props).description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper })
              }, [
                vueExports.unref(props).label || !!slots.label ? (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(!vueExports.unref(props).variant || vueExports.unref(props).variant === "list" ? vueExports.unref(Label_default) : "p"), {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/Checkbox.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative flex items-center select-none touch-none",
    "track": "relative bg-accented overflow-hidden rounded-full grow",
    "range": "absolute rounded-full",
    "thumb": "rounded-full bg-default ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
  },
  "variants": {
    "color": {
      "primary": {
        "range": "bg-primary",
        "thumb": "ring-primary focus-visible:outline-primary/50"
      },
      "secondary": {
        "range": "bg-secondary",
        "thumb": "ring-secondary focus-visible:outline-secondary/50"
      },
      "success": {
        "range": "bg-success",
        "thumb": "ring-success focus-visible:outline-success/50"
      },
      "info": {
        "range": "bg-info",
        "thumb": "ring-info focus-visible:outline-info/50"
      },
      "warning": {
        "range": "bg-warning",
        "thumb": "ring-warning focus-visible:outline-warning/50"
      },
      "error": {
        "range": "bg-error",
        "thumb": "ring-error focus-visible:outline-error/50"
      },
      "neutral": {
        "range": "bg-inverted",
        "thumb": "ring-inverted focus-visible:outline-inverted/50"
      }
    },
    "size": {
      "xs": {
        "thumb": "size-3"
      },
      "sm": {
        "thumb": "size-3.5"
      },
      "md": {
        "thumb": "size-4"
      },
      "lg": {
        "thumb": "size-4.5"
      },
      "xl": {
        "thumb": "size-5"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full",
        "range": "h-full"
      },
      "vertical": {
        "root": "flex-col h-full",
        "range": "w-full"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75 cursor-not-allowed"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "track": "h-[6px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "track": "h-[7px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "track": "h-[8px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "track": "h-[9px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "track": "h-[10px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "track": "w-[6px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "track": "w-[7px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "track": "w-[8px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "track": "w-[9px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "track": "w-[10px]"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary"
  }
};
const _sfc_main$3 = {
  __name: "USlider",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    as: { type: null, required: false },
    size: { type: null, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    tooltip: { type: [Boolean, Object], required: false },
    defaultValue: { type: [Number, Array], required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    name: { type: String, required: false },
    disabled: { type: Boolean, required: false },
    inverted: { type: Boolean, required: false },
    min: { type: Number, required: false, default: 0 },
    max: { type: Number, required: false, default: 100 },
    step: { type: Number, required: false, default: 1 },
    minStepsBetweenThumbs: { type: Number, required: false }
  }, {
    "modelValue": { type: null },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ vueExports.mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const props = useComponentProps("slider", _props);
    const modelValue = vueExports.useModel(__props, "modelValue");
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "as", "orientation", "min", "max", "step", "minStepsBetweenThumbs", "inverted"), emits);
    const { id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(_props);
    const defaultSliderValue = vueExports.computed(() => {
      if (typeof props.defaultValue === "number") {
        return [props.defaultValue];
      }
      return props.defaultValue;
    });
    const sliderValue = vueExports.computed({
      get() {
        if (typeof modelValue.value === "number") {
          return [modelValue.value];
        }
        return modelValue.value ?? defaultSliderValue.value;
      },
      set(value) {
        modelValue.value = value?.length !== 1 ? value : value[0];
      }
    });
    const thumbs = vueExports.computed(() => sliderValue.value?.length ?? 1);
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.slider || {} })({
      disabled: disabled.value,
      size: size.value ?? props.size,
      color: color.value ?? props.color,
      orientation: props.orientation
    }));
    function onChange(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(SliderRoot_default), vueExports.mergeProps({ ...vueExports.unref(rootProps), ...vueExports.unref(ariaAttrs) }, {
        id: vueExports.unref(id),
        modelValue: sliderValue.value,
        "onUpdate:modelValue": [($event) => sliderValue.value = $event, ($event) => vueExports.unref(emitFormInput)()],
        name: vueExports.unref(name),
        disabled: vueExports.unref(disabled),
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] }),
        "default-value": defaultSliderValue.value,
        onValueCommit: onChange
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(vueExports.unref(SliderTrack_default), {
              "data-slot": "track",
              class: ui.value.track({ class: vueExports.unref(props).ui?.track })
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(SliderRange_default), {
                    "data-slot": "range",
                    class: ui.value.range({ class: vueExports.unref(props).ui?.range })
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(SliderRange_default), {
                      "data-slot": "range",
                      class: ui.value.range({ class: vueExports.unref(props).ui?.range })
                    }, null, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList_1(thumbs.value, (thumb) => {
              _push2(`<!--[-->`);
              if (!!vueExports.unref(props).tooltip) {
                _push2(ssrRenderComponent_1(_sfc_main$g, vueExports.mergeProps({
                  text: thumbs.value > 1 ? String(sliderValue.value?.[thumb - 1]) : String(sliderValue.value),
                  "disable-closing-trigger": ""
                }, { ref_for: true }, typeof vueExports.unref(props).tooltip === "object" ? vueExports.unref(props).tooltip : {}), {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent_1(vueExports.unref(SliderThumb_default), {
                        "data-slot": "thumb",
                        class: ui.value.thumb({ class: vueExports.unref(props).ui?.thumb }),
                        "aria-label": thumbs.value === 1 ? "Thumb" : `Thumb ${thumb} of ${thumbs.value}`
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(vueExports.unref(SliderThumb_default), {
                          "data-slot": "thumb",
                          class: ui.value.thumb({ class: vueExports.unref(props).ui?.thumb }),
                          "aria-label": thumbs.value === 1 ? "Thumb" : `Thumb ${thumb} of ${thumbs.value}`
                        }, null, 8, ["class", "aria-label"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent_1(vueExports.unref(SliderThumb_default), {
                  "data-slot": "thumb",
                  class: ui.value.thumb({ class: vueExports.unref(props).ui?.thumb }),
                  "aria-label": thumbs.value === 1 ? "Thumb" : `Thumb ${thumb} of ${thumbs.value}`
                }, null, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              vueExports.createVNode(vueExports.unref(SliderTrack_default), {
                "data-slot": "track",
                class: ui.value.track({ class: vueExports.unref(props).ui?.track })
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(SliderRange_default), {
                    "data-slot": "range",
                    class: ui.value.range({ class: vueExports.unref(props).ui?.range })
                  }, null, 8, ["class"])
                ]),
                _: 1
              }, 8, ["class"]),
              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(thumbs.value, (thumb) => {
                return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: thumb }, [
                  !!vueExports.unref(props).tooltip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$g, vueExports.mergeProps({
                    key: 0,
                    text: thumbs.value > 1 ? String(sliderValue.value?.[thumb - 1]) : String(sliderValue.value),
                    "disable-closing-trigger": ""
                  }, { ref_for: true }, typeof vueExports.unref(props).tooltip === "object" ? vueExports.unref(props).tooltip : {}), {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(vueExports.unref(SliderThumb_default), {
                        "data-slot": "thumb",
                        class: ui.value.thumb({ class: vueExports.unref(props).ui?.thumb }),
                        "aria-label": thumbs.value === 1 ? "Thumb" : `Thumb ${thumb} of ${thumbs.value}`
                      }, null, 8, ["class", "aria-label"])
                    ]),
                    _: 2
                  }, 1040, ["text"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SliderThumb_default), {
                    key: 1,
                    "data-slot": "thumb",
                    class: ui.value.thumb({ class: vueExports.unref(props).ui?.thumb }),
                    "aria-label": thumbs.value === 1 ? "Thumb" : `Thumb ${thumb} of ${thumbs.value}`
                  }, null, 8, ["class", "aria-label"]))
                ], 64);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/Slider.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ButtonStyleModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    modelValue: {},
    label: {}
  },
  emits: ["update:open", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const local = vueExports.ref({ ...props.modelValue });
    vueExports.watch(
      () => props.modelValue,
      (val) => {
        local.value = { ...val };
      },
      { deep: true }
    );
    function update(key, val) {
      local.value = { ...local.value, [key]: val };
      emit("update:modelValue", { ...local.value });
    }
    const VARIANT_OPTIONS = [
      { label: "Ghost", value: "ghost" },
      { label: "Soft", value: "soft" },
      { label: "Solid", value: "solid" },
      { label: "Outline", value: "outline" },
      { label: "Link", value: "link" }
    ];
    const RADIUS_OPTIONS = [
      { label: "None", value: "none" },
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
      { label: "Full", value: "full" }
    ];
    const SIZE_OPTIONS = [
      { label: "Extra small", value: "xs" },
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" }
    ];
    const { resolvePrimary, resolveSecondary } = useActivePalette();
    const primaryColor = vueExports.computed(() => resolvePrimary(null));
    const secondaryColor = vueExports.computed(() => resolveSecondary(null));
    function hexLuminance(hex) {
      const h = hex.replace("#", "");
      const r = parseInt(h.slice(0, 2), 16) / 255;
      const g = parseInt(h.slice(2, 4), 16) / 255;
      const b = parseInt(h.slice(4, 6), 16) / 255;
      const toLinear = (c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    }
    const radiusClass = vueExports.computed(() => {
      const r = local.value.radius;
      if (r === "none") return "rounded-none";
      if (r === "sm") return "rounded-sm";
      if (r === "lg") return "rounded-lg";
      if (r === "full") return "rounded-full";
      return "rounded-md";
    });
    const sizeClass = vueExports.computed(() => {
      const s = local.value.size;
      if (s === "xs") return { text: "text-xs", pad: "px-2 py-0.5" };
      if (s === "md") return { text: "text-base", pad: "px-4 py-2" };
      if (s === "lg") return { text: "text-lg", pad: "px-5 py-2.5" };
      return { text: "text-sm", pad: "px-3 py-1.5" };
    });
    const textTransformStyle = vueExports.computed(
      () => local.value.uppercase ? { textTransform: "uppercase" } : {}
    );
    const letterSpacingStyle = vueExports.computed(
      () => local.value.letterSpacing > 0 ? { letterSpacing: `${(local.value.letterSpacing * 0.0625).toFixed(4)}em` } : {}
    );
    const sharedTextStyle = vueExports.computed(() => ({
      ...textTransformStyle.value,
      ...letterSpacingStyle.value
    }));
    function previewClass(variant) {
      const { text, pad } = sizeClass.value;
      const r = radiusClass.value;
      const base = `${pad} ${r} ${text} font-medium transition-opacity`;
      if (variant === "solid") return `${base} hover:opacity-90`;
      if (variant === "outline") return `${base} border hover:opacity-70`;
      if (variant === "soft") return `${base} hover:opacity-80`;
      if (variant === "link")
        return `${text} underline-offset-4 hover:underline transition-opacity hover:opacity-70`;
      return `${base} hover:opacity-70`;
    }
    function previewStyle(variant, color) {
      const contrastText = hexLuminance(color) > 0.179 ? "#1a1a1a" : "#ffffff";
      if (variant === "solid") return { backgroundColor: color, color: contrastText };
      if (variant === "outline") return { borderColor: color, color, backgroundColor: "transparent" };
      if (variant === "soft")
        return { backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color };
      if (variant === "link") return { color };
      return { color, backgroundColor: "transparent" };
    }
    const gapStyle = vueExports.computed(() => ({ gap: `${local.value.spacing}px` }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$j;
      const _component_USelect = _sfc_main$1$2;
      const _component_USlider = _sfc_main$3;
      const _component_USwitch = _sfc_main$2$1;
      _push(ssrRenderComponent_1(_component_UModal, vueExports.mergeProps({
        open: __props.open,
        title: __props.label ? `Customize ${__props.label}` : "Customize button style",
        ui: { content: "max-w-2xl" },
        "onUpdate:open": ($event) => emit("update:open", $event)
      }, _attrs), {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-6"${_scopeId}><div class="flex flex-col gap-4 w-48 shrink-0"${_scopeId}><div class="flex flex-col gap-1"${_scopeId}><label class="text-xs text-muted"${_scopeId}>Style</label>`);
            _push2(ssrRenderComponent_1(_component_USelect, {
              "model-value": vueExports.unref(local).variant,
              items: VARIANT_OPTIONS,
              size: "sm",
              "onUpdate:modelValue": ($event) => update("variant", $event)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-1"${_scopeId}><label class="text-xs text-muted"${_scopeId}>Corner radius</label>`);
            _push2(ssrRenderComponent_1(_component_USelect, {
              "model-value": vueExports.unref(local).radius,
              items: RADIUS_OPTIONS,
              size: "sm",
              "onUpdate:modelValue": ($event) => update("radius", $event)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-1"${_scopeId}><label class="text-xs text-muted"${_scopeId}>Size</label>`);
            _push2(ssrRenderComponent_1(_component_USelect, {
              "model-value": vueExports.unref(local).size,
              items: SIZE_OPTIONS,
              size: "sm",
              "onUpdate:modelValue": ($event) => update("size", $event)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col gap-1"${_scopeId}><label class="text-xs text-muted"${_scopeId}>Spacing</label><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_USlider, {
              "model-value": vueExports.unref(local).spacing,
              min: 0,
              max: 32,
              step: 1,
              class: "flex-1",
              "onUpdate:modelValue": ($event) => update("spacing", $event ?? 0)
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs text-muted w-8 text-right tabular-nums"${_scopeId}>${ssrInterpolate_1(vueExports.unref(local).spacing)}px</span></div></div><div class="flex flex-col gap-1"${_scopeId}><label class="text-xs text-muted"${_scopeId}>Letter spacing</label><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_USlider, {
              "model-value": vueExports.unref(local).letterSpacing,
              min: 0,
              max: 8,
              step: 0.5,
              class: "flex-1",
              "onUpdate:modelValue": ($event) => update("letterSpacing", $event ?? 0)
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs text-muted w-8 text-right tabular-nums"${_scopeId}>${ssrInterpolate_1(vueExports.unref(local).letterSpacing)}px</span></div></div><div class="flex items-center justify-between"${_scopeId}><label class="text-xs text-muted"${_scopeId}>Uppercase</label>`);
            _push2(ssrRenderComponent_1(_component_USwitch, {
              "model-value": vueExports.unref(local).uppercase,
              size: "sm",
              "onUpdate:modelValue": ($event) => update("uppercase", $event)
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex-1 flex flex-col gap-3 justify-center items-center rounded-lg bg-elevated p-6 min-h-40"${_scopeId}><p class="text-xs text-muted mb-1"${_scopeId}>Preview</p><div class="flex items-center flex-wrap justify-center" style="${ssrRenderStyle_1(vueExports.unref(gapStyle))}"${_scopeId}>`);
            if (vueExports.unref(local).variant !== "link") {
              _push2(`<!--[--><button class="${ssrRenderClass_1(previewClass(vueExports.unref(local).variant))}" style="${ssrRenderStyle_1({ ...previewStyle(vueExports.unref(local).variant, vueExports.unref(primaryColor)), ...vueExports.unref(sharedTextStyle) })}"${_scopeId}> Primary </button><button class="${ssrRenderClass_1(previewClass(vueExports.unref(local).variant))}" style="${ssrRenderStyle_1({ ...previewStyle(vueExports.unref(local).variant, vueExports.unref(secondaryColor)), ...vueExports.unref(sharedTextStyle) })}"${_scopeId}> Secondary </button><!--]-->`);
            } else {
              _push2(`<!--[--><button class="${ssrRenderClass_1(previewClass("link"))}" style="${ssrRenderStyle_1({ color: vueExports.unref(primaryColor), ...vueExports.unref(sharedTextStyle) })}"${_scopeId}> Primary link </button><button class="${ssrRenderClass_1(previewClass("link"))}" style="${ssrRenderStyle_1({ color: vueExports.unref(secondaryColor), ...vueExports.unref(sharedTextStyle) })}"${_scopeId}> Secondary link </button><!--]-->`);
            }
            _push2(`</div>`);
            if (vueExports.unref(local).variant !== "link") {
              _push2(`<div class="flex items-center flex-wrap justify-center mt-2" style="${ssrRenderStyle_1(vueExports.unref(gapStyle))}"${_scopeId}><button class="${ssrRenderClass_1(previewClass(vueExports.unref(local).variant))}" style="${ssrRenderStyle_1({ ...previewStyle(vueExports.unref(local).variant, vueExports.unref(primaryColor)), ...vueExports.unref(sharedTextStyle) })}"${_scopeId}> Button A </button><button class="${ssrRenderClass_1(previewClass(vueExports.unref(local).variant))}" style="${ssrRenderStyle_1({ ...previewStyle(vueExports.unref(local).variant, vueExports.unref(primaryColor)), ...vueExports.unref(sharedTextStyle) })}"${_scopeId}> Button B </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex gap-6" }, [
                vueExports.createVNode("div", { class: "flex flex-col gap-4 w-48 shrink-0" }, [
                  vueExports.createVNode("div", { class: "flex flex-col gap-1" }, [
                    vueExports.createVNode("label", { class: "text-xs text-muted" }, "Style"),
                    vueExports.createVNode(_component_USelect, {
                      "model-value": vueExports.unref(local).variant,
                      items: VARIANT_OPTIONS,
                      size: "sm",
                      "onUpdate:modelValue": ($event) => update("variant", $event)
                    }, null, 8, ["model-value", "onUpdate:modelValue"])
                  ]),
                  vueExports.createVNode("div", { class: "flex flex-col gap-1" }, [
                    vueExports.createVNode("label", { class: "text-xs text-muted" }, "Corner radius"),
                    vueExports.createVNode(_component_USelect, {
                      "model-value": vueExports.unref(local).radius,
                      items: RADIUS_OPTIONS,
                      size: "sm",
                      "onUpdate:modelValue": ($event) => update("radius", $event)
                    }, null, 8, ["model-value", "onUpdate:modelValue"])
                  ]),
                  vueExports.createVNode("div", { class: "flex flex-col gap-1" }, [
                    vueExports.createVNode("label", { class: "text-xs text-muted" }, "Size"),
                    vueExports.createVNode(_component_USelect, {
                      "model-value": vueExports.unref(local).size,
                      items: SIZE_OPTIONS,
                      size: "sm",
                      "onUpdate:modelValue": ($event) => update("size", $event)
                    }, null, 8, ["model-value", "onUpdate:modelValue"])
                  ]),
                  vueExports.createVNode("div", { class: "flex flex-col gap-1" }, [
                    vueExports.createVNode("label", { class: "text-xs text-muted" }, "Spacing"),
                    vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                      vueExports.createVNode(_component_USlider, {
                        "model-value": vueExports.unref(local).spacing,
                        min: 0,
                        max: 32,
                        step: 1,
                        class: "flex-1",
                        "onUpdate:modelValue": ($event) => update("spacing", $event ?? 0)
                      }, null, 8, ["model-value", "onUpdate:modelValue"]),
                      vueExports.createVNode("span", { class: "text-xs text-muted w-8 text-right tabular-nums" }, vueExports.toDisplayString(vueExports.unref(local).spacing) + "px", 1)
                    ])
                  ]),
                  vueExports.createVNode("div", { class: "flex flex-col gap-1" }, [
                    vueExports.createVNode("label", { class: "text-xs text-muted" }, "Letter spacing"),
                    vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                      vueExports.createVNode(_component_USlider, {
                        "model-value": vueExports.unref(local).letterSpacing,
                        min: 0,
                        max: 8,
                        step: 0.5,
                        class: "flex-1",
                        "onUpdate:modelValue": ($event) => update("letterSpacing", $event ?? 0)
                      }, null, 8, ["model-value", "onUpdate:modelValue"]),
                      vueExports.createVNode("span", { class: "text-xs text-muted w-8 text-right tabular-nums" }, vueExports.toDisplayString(vueExports.unref(local).letterSpacing) + "px", 1)
                    ])
                  ]),
                  vueExports.createVNode("div", { class: "flex items-center justify-between" }, [
                    vueExports.createVNode("label", { class: "text-xs text-muted" }, "Uppercase"),
                    vueExports.createVNode(_component_USwitch, {
                      "model-value": vueExports.unref(local).uppercase,
                      size: "sm",
                      "onUpdate:modelValue": ($event) => update("uppercase", $event)
                    }, null, 8, ["model-value", "onUpdate:modelValue"])
                  ])
                ]),
                vueExports.createVNode("div", { class: "flex-1 flex flex-col gap-3 justify-center items-center rounded-lg bg-elevated p-6 min-h-40" }, [
                  vueExports.createVNode("p", { class: "text-xs text-muted mb-1" }, "Preview"),
                  vueExports.createVNode("div", {
                    class: "flex items-center flex-wrap justify-center",
                    style: vueExports.unref(gapStyle)
                  }, [
                    vueExports.unref(local).variant !== "link" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                      vueExports.createVNode("button", {
                        class: previewClass(vueExports.unref(local).variant),
                        style: { ...previewStyle(vueExports.unref(local).variant, vueExports.unref(primaryColor)), ...vueExports.unref(sharedTextStyle) }
                      }, " Primary ", 6),
                      vueExports.createVNode("button", {
                        class: previewClass(vueExports.unref(local).variant),
                        style: { ...previewStyle(vueExports.unref(local).variant, vueExports.unref(secondaryColor)), ...vueExports.unref(sharedTextStyle) }
                      }, " Secondary ", 6)
                    ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                      vueExports.createVNode("button", {
                        class: previewClass("link"),
                        style: { color: vueExports.unref(primaryColor), ...vueExports.unref(sharedTextStyle) }
                      }, " Primary link ", 6),
                      vueExports.createVNode("button", {
                        class: previewClass("link"),
                        style: { color: vueExports.unref(secondaryColor), ...vueExports.unref(sharedTextStyle) }
                      }, " Secondary link ", 6)
                    ], 64))
                  ], 4),
                  vueExports.unref(local).variant !== "link" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "flex items-center flex-wrap justify-center mt-2",
                    style: vueExports.unref(gapStyle)
                  }, [
                    vueExports.createVNode("button", {
                      class: previewClass(vueExports.unref(local).variant),
                      style: { ...previewStyle(vueExports.unref(local).variant, vueExports.unref(primaryColor)), ...vueExports.unref(sharedTextStyle) }
                    }, " Button A ", 6),
                    vueExports.createVNode("button", {
                      class: previewClass(vueExports.unref(local).variant),
                      style: { ...previewStyle(vueExports.unref(local).variant, vueExports.unref(primaryColor)), ...vueExports.unref(sharedTextStyle) }
                    }, " Button B ", 6)
                  ], 4)) : vueExports.createCommentVNode("", true)
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/ButtonStyleModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_12 = Object.assign(_sfc_main$2, { __name: "PagebuilderButtonStyleModal" });
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "RightSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedBlock } = useSelectedBlock();
    const { setBlockContent, setBlockName, pendingContentEdits } = usePageEditor();
    const { collections } = useCollections();
    const pickerFieldKey = vueExports.ref(null);
    const pickerOpen = vueExports.ref(false);
    const pickerImagesOnly = vueExports.ref(true);
    const buttonStyleFieldKey = vueExports.ref(null);
    const buttonStyleLabel = vueExports.ref(void 0);
    const buttonStyleOpen = vueExports.ref(false);
    function openButtonStyleModal(key, label) {
      buttonStyleFieldKey.value = key;
      buttonStyleLabel.value = label;
      buttonStyleOpen.value = true;
    }
    function openPicker(key, imagesOnly = true) {
      pickerFieldKey.value = key;
      pickerImagesOnly.value = imagesOnly;
      pickerOpen.value = true;
    }
    function onImageSelected(url) {
      if (pickerFieldKey.value) setValue(pickerFieldKey.value, url);
      pickerOpen.value = false;
      pickerFieldKey.value = null;
    }
    const editingName = vueExports.ref(false);
    const nameInput = vueExports.ref("");
    vueExports.watch(selectedBlock, (block) => {
      editingName.value = false;
      nameInput.value = block?.name ?? "";
    });
    function startEditingName() {
      nameInput.value = selectedBlock.value?.name ?? "";
      editingName.value = true;
      vueExports.nextTick(() => {
        (void 0).querySelector("#block-name-input")?.focus();
      });
    }
    function commitName() {
      if (!selectedBlock.value) return;
      const trimmed = nameInput.value.trim() || null;
      setBlockName(selectedBlock.value.id, trimmed, selectedBlock.value);
      editingName.value = false;
    }
    const definition = vueExports.computed(
      () => selectedBlock.value ? allBlockDefinitions.find((d) => d.type === selectedBlock.value.type) ?? null : null
    );
    const hasTabs = vueExports.computed(() => !!definition.value?.tabs?.length);
    const tabItems = vueExports.computed(
      () => definition.value?.tabs?.map((t) => ({ label: t.label, icon: t.icon })) ?? []
    );
    const currentTab = vueExports.ref("0");
    vueExports.watch(definition, () => {
      currentTab.value = "0";
    });
    const localContent = vueExports.ref({});
    const localContentBlockId = vueExports.ref(null);
    let isApplyingLocal = false;
    vueExports.watch(
      () => selectedBlock.value?.id,
      (id) => {
        const block = selectedBlock.value;
        if (!block) {
          localContent.value = {};
          localContentBlockId.value = null;
          return;
        }
        const pending = pendingContentEdits.value[block.id] ?? {};
        localContent.value = { ...block.content, ...pending };
        localContentBlockId.value = id ?? null;
      },
      { immediate: true }
    );
    vueExports.watch(
      () => selectedBlock.value?.content,
      (content) => {
        if (!selectedBlock.value) return;
        if (selectedBlock.value.id !== localContentBlockId.value) return;
        if (pendingContentEdits.value[selectedBlock.value.id]) return;
        localContent.value = content ? { ...content } : {};
      },
      { deep: true }
    );
    vueExports.watch(
      () => selectedBlock.value && pendingContentEdits.value[selectedBlock.value.id],
      (pending) => {
        if (isApplyingLocal) return;
        if (!selectedBlock.value) return;
        if (!pending) return;
        localContent.value = { ...localContent.value, ...pending };
      },
      { deep: true }
    );
    const activeSections = vueExports.computed(() => {
      if (!definition.value) return [];
      if (hasTabs.value) {
        const idx = Number(currentTab.value);
        return definition.value.tabs?.[idx]?.sections ?? [];
      }
      return definition.value.sections ?? [];
    });
    function getValue(key) {
      return getPath(localContent.value, key);
    }
    function checkCondition(cond) {
      const val = getValue(cond.key);
      if (cond.value === "truthy") return !!val;
      return val === cond.value;
    }
    function fieldVisible(f) {
      if (f.showIfAll) return f.showIfAll.every(checkCondition);
      if (f.showIf) return checkCondition(f.showIf);
      return true;
    }
    function setValue(key, value) {
      if (!selectedBlock.value) return;
      localContent.value = setPath(localContent.value, key, value);
      isApplyingLocal = true;
      setBlockContent(selectedBlock.value.id, localContent.value);
      isApplyingLocal = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d$1;
      const _component_UInput = _sfc_main$i;
      const _component_UButton = _sfc_main$8$1;
      const _component_UTooltip = _sfc_main$g;
      const _component_PagebuilderThemeColorPicker = __nuxt_component_4;
      const _component_PagebuilderListFieldEditor = __nuxt_component_5;
      const _component_UTextarea = _sfc_main$1$1;
      const _component_UCheckbox = _sfc_main$4;
      const _component_USwitch = _sfc_main$2$1;
      const _component_USlider = _sfc_main$3;
      const _component_USelect = _sfc_main$1$2;
      const _component_AdminMediaPickerModal = __nuxt_component_11;
      const _component_PagebuilderButtonStyleModal = __nuxt_component_12;
      _push(`<!--[--><div class="flex flex-col w-64 shrink-0 border-l border-default">`);
      if (vueExports.unref(selectedBlock) && vueExports.unref(definition)) {
        _push(`<!--[--><div class="p-3 border-b border-default shrink-0 flex items-center gap-2 min-w-0">`);
        _push(ssrRenderComponent_1(_component_UIcon, {
          name: vueExports.unref(definition).icon,
          class: "size-4 text-muted shrink-0"
        }, null, _parent));
        _push(`<div class="flex-1 min-w-0">`);
        if (vueExports.unref(editingName)) {
          _push(ssrRenderComponent_1(_component_UInput, {
            id: "block-name-input",
            modelValue: vueExports.unref(nameInput),
            "onUpdate:modelValue": ($event) => vueExports.isRef(nameInput) ? nameInput.value = $event : null,
            size: "sm",
            placeholder: vueExports.unref(definition).label,
            class: "w-full",
            onBlur: commitName,
            onKeydown: [commitName, ($event) => editingName.value = false]
          }, null, _parent));
        } else {
          _push(`<!--[--><p class="text-sm font-medium truncate">${ssrInterpolate_1(vueExports.unref(selectedBlock).name || vueExports.unref(definition).label)}</p><p class="text-xs text-muted capitalize">${ssrInterpolate_1(vueExports.unref(definition).type)}</p><!--]-->`);
        }
        _push(`</div>`);
        if (!vueExports.unref(selectedBlock).isMandatory) {
          _push(ssrRenderComponent_1(_component_UButton, {
            icon: "i-lucide-pencil",
            color: "neutral",
            variant: "ghost",
            size: "xs",
            class: "text-muted hover:text-highlighted shrink-0",
            "aria-label": "Rename block",
            onClick: startEditingName
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (vueExports.unref(hasTabs)) {
          _push(`<div class="px-3 pt-2 shrink-0 flex gap-0.5"><!--[-->`);
          ssrRenderList_1(vueExports.unref(tabItems), (tab, i) => {
            _push(ssrRenderComponent_1(_component_UTooltip, {
              key: i,
              text: tab.label,
              "delay-duration": 300
            }, {
              default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<button type="button" class="${ssrRenderClass_1([
                    vueExports.unref(currentTab) === String(i) ? "bg-elevated text-highlighted" : "text-muted hover:text-highlighted hover:bg-elevated/60",
                    "flex items-center justify-center size-7 rounded transition-colors"
                  ])}"${_scopeId}>`);
                  _push2(ssrRenderComponent_1(_component_UIcon, {
                    name: tab.icon ?? "i-lucide-layout",
                    class: "size-3.5"
                  }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                } else {
                  return [
                    vueExports.createVNode("button", {
                      type: "button",
                      class: [
                        "flex items-center justify-center size-7 rounded transition-colors",
                        vueExports.unref(currentTab) === String(i) ? "bg-elevated text-highlighted" : "text-muted hover:text-highlighted hover:bg-elevated/60"
                      ],
                      onClick: ($event) => currentTab.value = String(i)
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: tab.icon ?? "i-lucide-layout",
                        class: "size-3.5"
                      }, null, 8, ["name"])
                    ], 10, ["onClick"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex-1 overflow-y-auto p-3 flex flex-col gap-4"><!--[-->`);
        ssrRenderList_1(vueExports.unref(activeSections), (section, si) => {
          _push(`<div class="flex flex-col gap-2">`);
          if (section.fields.filter(
            (f) => f.type !== "inline-text" && f.type !== "inline-rich" && fieldVisible(f)
          ).length) {
            _push(`<!--[-->`);
            if (section.label) {
              _push(`<p class="text-xs font-semibold text-muted uppercase tracking-wide">${ssrInterpolate_1(section.label)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--[-->`);
            ssrRenderList_1(section.fields.filter(
              (f) => f.type !== "inline-text" && f.type !== "inline-rich" && fieldVisible(f)
            ), (field) => {
              _push(`<div class="${ssrRenderClass_1([
                ["theme-color", "checkbox", "switch", "color"].includes(field.type) ? "items-center justify-between" : field.type === "slider" ? "flex-col gap-1" : "flex-col",
                "flex gap-1"
              ])}"><label class="text-xs text-muted">${ssrInterpolate_1(field.label)}</label>`);
              if (field.type === "image" || field.type === "file") {
                _push(`<div class="flex flex-col gap-2">`);
                if (getValue(field.key)) {
                  _push(`<!--[-->`);
                  if (field.type === "image") {
                    _push(`<div class="relative rounded-md overflow-hidden border border-default aspect-video bg-muted"><img${ssrRenderAttr_1("src", getValue(field.key))} alt="" class="w-full h-full object-cover">`);
                    _push(ssrRenderComponent_1(_component_UButton, {
                      icon: "i-lucide-x",
                      color: "neutral",
                      variant: "solid",
                      size: "xs",
                      class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                      "aria-label": "Remove image",
                      onClick: ($event) => setValue(field.key, null)
                    }, null, _parent));
                    _push(`</div>`);
                  } else {
                    _push(`<div class="flex items-center gap-2 px-2 py-1.5 rounded-md border border-default bg-muted text-xs">`);
                    _push(ssrRenderComponent_1(_component_UIcon, {
                      name: "i-lucide-file",
                      class: "size-4 text-muted shrink-0"
                    }, null, _parent));
                    _push(`<span class="flex-1 truncate min-w-0">${ssrInterpolate_1(getValue(field.key).split("/").at(-1))}</span>`);
                    _push(ssrRenderComponent_1(_component_UButton, {
                      icon: "i-lucide-x",
                      color: "neutral",
                      variant: "ghost",
                      size: "xs",
                      class: "shrink-0 text-muted hover:text-highlighted",
                      "aria-label": "Remove file",
                      onClick: ($event) => setValue(field.key, null)
                    }, null, _parent));
                    _push(`</div>`);
                  }
                  _push(`<!--]-->`);
                } else {
                  _push(`<!---->`);
                }
                _push(ssrRenderComponent_1(_component_UButton, {
                  icon: getValue(field.key) ? field.type === "image" ? "i-lucide-image" : "i-lucide-file" : "i-lucide-plus",
                  color: "neutral",
                  variant: "subtle",
                  size: "xs",
                  class: "w-full flex justify-center",
                  onClick: ($event) => openPicker(field.key, field.type === "image")
                }, {
                  default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`${ssrInterpolate_1(getValue(field.key) ? field.type === "image" ? "Change image" : "Change file" : field.type === "image" ? "Choose image" : "Choose file")}`);
                    } else {
                      return [
                        vueExports.createTextVNode(vueExports.toDisplayString(getValue(field.key) ? field.type === "image" ? "Change image" : "Change file" : field.type === "image" ? "Choose image" : "Choose file"), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</div>`);
              } else if (field.type === "theme-color") {
                _push(ssrRenderComponent_1(_component_PagebuilderThemeColorPicker, {
                  "model-value": getValue(field.key) ?? null,
                  "onUpdate:modelValue": ($event) => setValue(field.key, $event)
                }, null, _parent));
              } else if (field.type === "button-style") {
                _push(ssrRenderComponent_1(_component_UButton, {
                  color: "neutral",
                  variant: "subtle",
                  size: "xs",
                  icon: "i-lucide-sliders-horizontal",
                  class: "w-full flex justify-center",
                  onClick: ($event) => openButtonStyleModal(field.key, field.label)
                }, {
                  default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(` Customize button `);
                    } else {
                      return [
                        vueExports.createTextVNode(" Customize button ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              } else if (field.type === "list") {
                _push(ssrRenderComponent_1(_component_PagebuilderListFieldEditor, {
                  field,
                  "model-value": getValue(field.key) ?? [],
                  "onUpdate:modelValue": ($event) => setValue(field.key, $event)
                }, null, _parent));
              } else if (field.type === "textarea") {
                _push(`<div class="flex flex-col gap-0.5">`);
                _push(ssrRenderComponent_1(_component_UTextarea, {
                  "model-value": getValue(field.key) ?? "",
                  placeholder: field.placeholder,
                  size: "sm",
                  rows: 3,
                  maxrows: 5,
                  autoresize: "",
                  class: "overflow-y-auto",
                  "onUpdate:modelValue": ($event) => setValue(field.key, $event)
                }, null, _parent));
                if (field.maxLength) {
                  _push(`<p class="text-xs text-muted text-right tabular-nums">${ssrInterpolate_1((getValue(field.key) ?? "").length)} / ${ssrInterpolate_1(field.maxLength)}</p>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</div>`);
              } else if (field.type === "checkbox") {
                _push(ssrRenderComponent_1(_component_UCheckbox, {
                  "model-value": getValue(field.key) ?? false,
                  "onUpdate:modelValue": ($event) => setValue(field.key, $event)
                }, null, _parent));
              } else if (field.type === "switch") {
                _push(ssrRenderComponent_1(_component_USwitch, {
                  "model-value": getValue(field.key) ?? false,
                  size: "sm",
                  "onUpdate:modelValue": ($event) => setValue(field.key, $event)
                }, null, _parent));
              } else if (field.type === "slider") {
                _push(`<div class="flex items-center gap-2">`);
                _push(ssrRenderComponent_1(_component_USlider, {
                  "model-value": getValue(field.key) ?? field.min ?? 0,
                  min: field.min ?? 0,
                  max: field.max ?? 100,
                  step: field.step ?? 1,
                  class: "flex-1",
                  "onUpdate:modelValue": ($event) => setValue(field.key, $event)
                }, null, _parent));
                _push(`<span class="text-xs text-muted w-10 text-right tabular-nums shrink-0">${ssrInterpolate_1(getValue(field.key) ?? field.min ?? 0)}${ssrInterpolate_1(field.unit !== "" ? field.unit ?? "px" : "")}</span></div>`);
              } else if (field.type === "collection-select") {
                _push(ssrRenderComponent_1(_component_USelect, {
                  "model-value": getValue(field.key) || "__default__",
                  items: [
                    { label: "All (default)", value: "__default__" },
                    ...vueExports.unref(collections).filter((c) => c.type === field.collectionType).map((c) => ({ label: c.name, value: c.id }))
                  ],
                  size: "sm",
                  "onUpdate:modelValue": ($event) => setValue(field.key, $event === "__default__" ? "" : $event)
                }, null, _parent));
              } else if (field.type === "select") {
                _push(ssrRenderComponent_1(_component_USelect, {
                  "model-value": getValue(field.key) ?? "",
                  items: field.options ?? [],
                  size: "sm",
                  "onUpdate:modelValue": ($event) => setValue(field.key, $event)
                }, null, _parent));
              } else if (field.type === "font") {
                _push(ssrRenderComponent_1(_component_USelect, {
                  "model-value": getValue(field.key) ?? "",
                  items: vueExports.unref(FONT_OPTIONS),
                  size: "sm",
                  "onUpdate:modelValue": ($event) => setValue(field.key, $event)
                }, null, _parent));
              } else if (field.type === "color") {
                _push(`<label class="size-6 rounded border-2 border-default hover:border-primary transition-colors shrink-0 cursor-pointer block" style="${ssrRenderStyle_1({ backgroundColor: getValue(field.key) || "#000000" })}"><input type="color"${ssrRenderAttr_1("value", getValue(field.key) ?? "#000000")} class="sr-only"></label>`);
              } else {
                _push(`<div class="flex flex-col gap-0.5">`);
                _push(ssrRenderComponent_1(_component_UInput, {
                  "model-value": getValue(field.key) ?? "",
                  placeholder: field.placeholder,
                  type: field.type === "url" ? "url" : "text",
                  size: "sm",
                  "onUpdate:modelValue": ($event) => setValue(field.key, $event)
                }, null, _parent));
                if (field.maxLength) {
                  _push(`<p class="text-xs text-muted text-right tabular-nums">${ssrInterpolate_1((getValue(field.key) ?? "").length)} / ${ssrInterpolate_1(field.maxLength)}</p>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</div>`);
              }
              _push(`</div>`);
            });
            _push(`<!--]--><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<div class="flex-1 flex items-center justify-center p-4"><p class="text-sm text-muted text-center">Select a block</p></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent_1(_component_AdminMediaPickerModal, {
        open: vueExports.unref(pickerOpen),
        "onUpdate:open": ($event) => vueExports.isRef(pickerOpen) ? pickerOpen.value = $event : null,
        "images-only": vueExports.unref(pickerImagesOnly),
        "selected-url": vueExports.unref(pickerFieldKey) ? getValue(vueExports.unref(pickerFieldKey)) : null,
        onSelect: onImageSelected
      }, null, _parent));
      if (vueExports.unref(buttonStyleFieldKey)) {
        _push(ssrRenderComponent_1(_component_PagebuilderButtonStyleModal, {
          key: vueExports.unref(buttonStyleFieldKey),
          open: vueExports.unref(buttonStyleOpen),
          "onUpdate:open": ($event) => vueExports.isRef(buttonStyleOpen) ? buttonStyleOpen.value = $event : null,
          "model-value": getValue(vueExports.unref(buttonStyleFieldKey)),
          label: vueExports.unref(buttonStyleLabel),
          "onUpdate:modelValue": ($event) => setValue(vueExports.unref(buttonStyleFieldKey), $event)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pagebuilder/RightSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$1, { __name: "PagebuilderRightSidebar" });
const VIEWPORT_MODES = [
  { label: "Desktop", value: "desktop" },
  { label: "Tablet", value: "tablet" },
  { label: "Mobile", value: "mobile" }
];
const VIEWPORT_WIDTHS = {
  desktop: 1280,
  tablet: 768,
  mobile: 375
};
function useElementWidth(key) {
  const el = vueExports.useTemplateRef(key);
  const width = vueExports.ref(0);
  vueExports.watch(el, (next, prev) => {
    if (next) {
      width.value = next.getBoundingClientRect().width;
    }
  });
  return width;
}
function useElementHeight(key) {
  const el = vueExports.useTemplateRef(key);
  const height = vueExports.ref(0);
  vueExports.watch(el, (next, prev) => {
    if (next) {
      height.value = next.getBoundingClientRect().height;
    }
  });
  return height;
}
function usePreviewScale() {
  const activeViewMode = vueExports.ref("desktop");
  const fixedWidth = vueExports.computed(() => VIEWPORT_WIDTHS[activeViewMode.value] ?? 1280);
  const canvasWidth = useElementWidth("previewCanvas");
  const naturalHeight = useElementHeight("previewEl");
  const scale = vueExports.computed(() => Math.min(1, canvasWidth.value / fixedWidth.value || 1));
  const wrapperStyle = vueExports.computed(() => {
    if (scale.value >= 1) return {};
    return { height: `${naturalHeight.value * scale.value}px`, overflow: "hidden" };
  });
  const scaleStyle = vueExports.computed(() => {
    if (scale.value >= 1) {
      return { width: `${fixedWidth.value}px`, margin: "0 auto" };
    }
    return {
      width: `${fixedWidth.value}px`,
      transformOrigin: "top left",
      transform: `scale(${scale.value})`
    };
  });
  return { activeViewMode, wrapperStyle, scaleStyle };
}
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { activeViewMode, wrapperStyle, scaleStyle } = usePreviewScale();
    const { activePage } = useActivePage();
    const { portfolio, fetch: fetchUser, clear: clearUser } = useCurrentUser();
    const { fetcher } = useApi();
    const { fetchPages } = usePages();
    const {
      pendingNewBlocks,
      pendingContentEdits,
      pendingNameEdits,
      pendingDeletions,
      hasPendingChanges,
      resetPending
    } = usePageEditor();
    [__temp, __restore] = vueExports.withAsyncContext(() => fetchUser()), await __temp, __restore();
    [__temp, __restore] = vueExports.withAsyncContext(() => fetchPages()), await __temp, __restore();
    const leftSidebar = vueExports.useTemplateRef("leftSidebar");
    const preview = vueExports.useTemplateRef("preview");
    const initialThemeSettings = vueExports.computed(() => {
      const s = portfolio.value?.themeSettings;
      return s ?? null;
    });
    const saving = vueExports.ref(false);
    const saved = vueExports.ref(false);
    const saveError = vueExports.ref("");
    const isDirty = vueExports.computed(() => {
      const layers = leftSidebar.value?.layersView;
      const layersChanges = layers?.layersChanges;
      return hasPendingChanges.value || !!leftSidebar.value?.isThemeDirty || !!layersChanges?.reorderedIds || Object.keys(layersChanges?.visibilityChanges ?? {}).length > 0;
    });
    onBeforeRouteLeave(() => {
      if (isDirty.value) return confirm("You have unsaved changes. Leave anyway?");
    });
    async function save() {
      if (!portfolio.value?.id) return;
      saving.value = true;
      saveError.value = "";
      try {
        const portfolioId = portfolio.value.id;
        const layers = leftSidebar.value?.layersView;
        const pageId = layers?.pageId ?? null;
        const freshPortfolio = await fetcher(`/api/users/me`, {
          credentials: "include",
          cache: "no-store"
        }).then((d) => d.portfolio);
        const existingThemeSettings = freshPortfolio?.themeSettings ?? null;
        await fetcher(`/api/portfolios/${portfolioId}/settings`, {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({
            themeSettings: {
              ...existingThemeSettings,
              ...leftSidebar.value?.themeSettings ?? {}
            }
          })
        });
        if (pageId) {
          const { visibilityChanges, reorderedIds } = layers.layersChanges;
          const blockPageMap = /* @__PURE__ */ new Map();
          for (const b of layers.dbContentBlocks ?? []) {
            if (b.pageId) blockPageMap.set(b.id, b.pageId);
          }
          const headerBlock = layers.headerBlock;
          const footerBlock = layers.footerBlock;
          if (headerBlock?.pageId) blockPageMap.set(headerBlock.id, headerBlock.pageId);
          if (footerBlock?.pageId) blockPageMap.set(footerBlock.id, footerBlock.pageId);
          const headerSlotOrder = preview.value?.portfolioLayout?.headerRef?.slotOrder;
          const homePageId = layers.homePageId ?? pageId;
          const pageIdFor = (blockId) => blockPageMap.get(blockId) ?? homePageId;
          const newBlocksOnPage = pendingNewBlocks.value.filter((b) => b.pageId === pageId);
          const createdBlocks = await Promise.all(
            newBlocksOnPage.map(async (b) => {
              const content = { ...b.content, ...pendingContentEdits.value[b.id] ?? {} };
              const res = await fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ type: b.type, content })
              });
              return { pendingId: b.id, realId: res.block.id };
            })
          );
          const pendingToReal = new Map(
            createdBlocks.map(({ pendingId, realId }) => [pendingId, realId])
          );
          const explicitOrder = layers.explicitOrder;
          let finalOrderIds = null;
          if (explicitOrder) {
            finalOrderIds = explicitOrder.map((id) => pendingToReal.get(id) ?? id).filter((id) => !id.startsWith("pending-") && !pendingDeletions.value.has(id));
          } else if (reorderedIds) {
            finalOrderIds = reorderedIds.filter((id) => !pendingDeletions.value.has(id));
          }
          await Promise.all([
            // Reorder — uses merged real IDs so new blocks land in the right position
            finalOrderIds ? fetcher(`/api/portfolios/${portfolioId}/pages/${pageId}/blocks/reorder`, {
              method: "PATCH",
              credentials: "include",
              body: JSON.stringify({ blockIds: finalOrderIds })
            }) : Promise.resolve(),
            // Visibility toggles — skip blocks queued for deletion
            ...Object.entries(visibilityChanges).filter(([blockId]) => !pendingDeletions.value.has(blockId)).map(
              ([blockId, isVisible]) => fetcher(
                `/api/portfolios/${portfolioId}/pages/${pageIdFor(blockId)}/blocks/${blockId}`,
                {
                  method: "PATCH",
                  credentials: "include",
                  body: JSON.stringify({ isVisible })
                }
              )
            ),
            // Header slot order — read from component, not pendingContentEdits
            headerBlock && headerSlotOrder ? fetcher(
              `/api/portfolios/${portfolioId}/pages/${pageIdFor(headerBlock.id)}/blocks/${headerBlock.id}`,
              {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify({
                  content: {
                    ...headerBlock.content,
                    ...headerSlotOrder
                  }
                })
              }
            ) : Promise.resolve(),
            // Content edits — skip pending IDs and blocks queued for deletion
            ...Object.entries(pendingContentEdits.value).filter(
              ([blockId]) => !blockId.startsWith("pending-") && !pendingDeletions.value.has(blockId)
            ).map(
              ([blockId, content]) => fetcher(
                `/api/portfolios/${portfolioId}/pages/${pageIdFor(blockId)}/blocks/${blockId}`,
                {
                  method: "PATCH",
                  credentials: "include",
                  body: JSON.stringify({ content })
                }
              )
            ),
            // Name edits — skip pending IDs and blocks queued for deletion
            ...Object.entries(pendingNameEdits.value).filter(
              ([blockId]) => !blockId.startsWith("pending-") && !pendingDeletions.value.has(blockId)
            ).map(
              ([blockId, name]) => fetcher(
                `/api/portfolios/${portfolioId}/pages/${pageIdFor(blockId)}/blocks/${blockId}`,
                {
                  method: "PATCH",
                  credentials: "include",
                  body: JSON.stringify({ name })
                }
              )
            ),
            // Deletions — skip any pending IDs that were never persisted to the DB
            ...[...pendingDeletions.value].filter((id) => !id.startsWith("pending-")).map(
              (blockId) => fetcher(
                `/api/portfolios/${portfolioId}/pages/${pageIdFor(blockId)}/blocks/${blockId}`,
                {
                  method: "DELETE",
                  credentials: "include"
                }
              )
            )
          ]);
        }
        resetPending();
        clearUser();
        await fetchUser();
        leftSidebar.value?.layersView?.refresh();
        saved.value = true;
        setTimeout(() => saved.value = false, 2e3);
      } catch (e) {
        saveError.value = e instanceof Error ? e.message : "Failed to save.";
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminLayoutPageWrapper = __nuxt_component_0;
      const _component_PagebuilderPageControls = __nuxt_component_1$1;
      const _component_UTabs = _sfc_main$h;
      const _component_UTooltip = _sfc_main$g;
      const _component_UIcon = _sfc_main$d$1;
      const _component_UButton = _sfc_main$8$1;
      const _component_PagebuilderLeftSidebar = __nuxt_component_6;
      const _component_ClientOnly = __nuxt_component_2$1$1;
      const _component_PagebuilderPreview = __nuxt_component_8;
      const _component_PagebuilderRightSidebar = __nuxt_component_9;
      _push(ssrRenderComponent_1(_component_AdminLayoutPageWrapper, vueExports.mergeProps({ title: "" }, _attrs), {
        left: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_PagebuilderPageControls, {
              "portfolio-id": vueExports.unref(portfolio)?.id ?? null
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_PagebuilderPageControls, {
                "portfolio-id": vueExports.unref(portfolio)?.id ?? null
              }, null, 8, ["portfolio-id"])
            ];
          }
        }),
        middle: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UTabs, {
              modelValue: vueExports.unref(activeViewMode),
              "onUpdate:modelValue": ($event) => vueExports.isRef(activeViewMode) ? activeViewMode.value = $event : null,
              items: vueExports.unref(VIEWPORT_MODES),
              "default-value": "desktop",
              size: "sm",
              class: "w-56",
              content: false
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UTabs, {
                modelValue: vueExports.unref(activeViewMode),
                "onUpdate:modelValue": ($event) => vueExports.isRef(activeViewMode) ? activeViewMode.value = $event : null,
                items: vueExports.unref(VIEWPORT_MODES),
                "default-value": "desktop",
                size: "sm",
                class: "w-56",
                content: false
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
            ];
          }
        }),
        right: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vueExports.unref(saveError)) {
              _push2(ssrRenderComponent_1(_component_UTooltip, { text: vueExports.unref(saveError) }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent_1(_component_UIcon, {
                      name: "i-lucide-alert-circle",
                      class: "text-error"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-lucide-alert-circle",
                        class: "text-error"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(_component_UButton, {
              color: "neutral",
              variant: "outline",
              "aria-label": "Activate",
              label: "Activate"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UButton, {
              color: vueExports.unref(saved) ? "success" : "neutral",
              variant: "solid",
              "aria-label": "Save",
              label: vueExports.unref(saved) ? "Saved!" : vueExports.unref(isDirty) ? "Save" : "No changes",
              icon: vueExports.unref(saved) ? "i-lucide-check" : void 0,
              loading: vueExports.unref(saving),
              disabled: !vueExports.unref(isDirty) && !vueExports.unref(saving),
              onClick: save
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UTooltip, { text: "View page" }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "primary",
                    variant: "solid",
                    icon: "i-lucide-external-link",
                    "aria-label": "View page",
                    tooltip: "View page",
                    to: vueExports.unref(activePage)?.slug && vueExports.unref(activePage).slug !== "home" ? `/p/${vueExports.unref(portfolio)?.slug}/${vueExports.unref(activePage).slug}` : `/p/${vueExports.unref(portfolio)?.slug}`,
                    target: "_blank"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UButton, {
                      color: "primary",
                      variant: "solid",
                      icon: "i-lucide-external-link",
                      "aria-label": "View page",
                      tooltip: "View page",
                      to: vueExports.unref(activePage)?.slug && vueExports.unref(activePage).slug !== "home" ? `/p/${vueExports.unref(portfolio)?.slug}/${vueExports.unref(activePage).slug}` : `/p/${vueExports.unref(portfolio)?.slug}`,
                      target: "_blank"
                    }, null, 8, ["to"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.unref(saveError) ? (vueExports.openBlock(), vueExports.createBlock(_component_UTooltip, {
                key: 0,
                text: vueExports.unref(saveError)
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UIcon, {
                    name: "i-lucide-alert-circle",
                    class: "text-error"
                  })
                ]),
                _: 1
              }, 8, ["text"])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(_component_UButton, {
                color: "neutral",
                variant: "outline",
                "aria-label": "Activate",
                label: "Activate"
              }),
              vueExports.createVNode(_component_UButton, {
                color: vueExports.unref(saved) ? "success" : "neutral",
                variant: "solid",
                "aria-label": "Save",
                label: vueExports.unref(saved) ? "Saved!" : vueExports.unref(isDirty) ? "Save" : "No changes",
                icon: vueExports.unref(saved) ? "i-lucide-check" : void 0,
                loading: vueExports.unref(saving),
                disabled: !vueExports.unref(isDirty) && !vueExports.unref(saving),
                onClick: save
              }, null, 8, ["color", "label", "icon", "loading", "disabled"]),
              vueExports.createVNode(_component_UTooltip, { text: "View page" }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UButton, {
                    color: "primary",
                    variant: "solid",
                    icon: "i-lucide-external-link",
                    "aria-label": "View page",
                    tooltip: "View page",
                    to: vueExports.unref(activePage)?.slug && vueExports.unref(activePage).slug !== "home" ? `/p/${vueExports.unref(portfolio)?.slug}/${vueExports.unref(activePage).slug}` : `/p/${vueExports.unref(portfolio)?.slug}`,
                    target: "_blank"
                  }, null, 8, ["to"])
                ]),
                _: 1
              })
            ];
          }
        }),
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex h-full w-full min-h-0"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_PagebuilderLeftSidebar, {
              ref_key: "leftSidebar",
              ref: leftSidebar,
              "initial-theme-settings": vueExports.unref(initialThemeSettings),
              "portfolio-id": vueExports.unref(portfolio)?.id ?? null
            }, null, _parent2, _scopeId));
            _push2(`<div class="relative flex-1 overflow-auto bg-muted/30"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_ClientOnly, null, {}, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent_1(_component_PagebuilderRightSidebar, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex h-full w-full min-h-0" }, [
                vueExports.createVNode(_component_PagebuilderLeftSidebar, {
                  ref_key: "leftSidebar",
                  ref: leftSidebar,
                  "initial-theme-settings": vueExports.unref(initialThemeSettings),
                  "portfolio-id": vueExports.unref(portfolio)?.id ?? null
                }, null, 8, ["initial-theme-settings", "portfolio-id"]),
                vueExports.createVNode("div", {
                  ref: "previewCanvas",
                  class: "relative flex-1 overflow-auto bg-muted/30"
                }, [
                  vueExports.createVNode(_component_ClientOnly, null, {
                    default: vueExports.withCtx(() => [
                      vueExports.unref(portfolio) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        style: vueExports.unref(wrapperStyle)
                      }, [
                        vueExports.createVNode("div", {
                          ref: "previewEl",
                          class: "@container",
                          style: vueExports.unref(scaleStyle)
                        }, [
                          vueExports.createVNode(_component_PagebuilderPreview, {
                            ref_key: "preview",
                            ref: preview,
                            "portfolio-slug": vueExports.unref(portfolio).slug,
                            "portfolio-title": vueExports.unref(portfolio).title,
                            "page-slug": vueExports.unref(activePage)?.slug ?? "home",
                            "layers-view": vueExports.unref(leftSidebar)?.layersView,
                            "live-theme-settings": vueExports.unref(leftSidebar)?.themeSettings
                          }, null, 8, ["portfolio-slug", "portfolio-title", "page-slug", "layers-view", "live-theme-settings"])
                        ], 4)
                      ], 4)) : (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 1,
                        class: "flex items-center justify-center h-full text-sm text-muted"
                      }, " No portfolio found "))
                    ]),
                    _: 1
                  })
                ], 512),
                vueExports.createVNode(_component_PagebuilderRightSidebar)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CK_Az38-.mjs.map
