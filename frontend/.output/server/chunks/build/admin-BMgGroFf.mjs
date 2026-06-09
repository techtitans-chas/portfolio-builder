import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2$1 } from './Main-DmrC9lpa.mjs';
import { d as _export_sfc, c as __nuxt_component_2$1, ac as useComponentProps, ap as useNuxtApp, a8 as useAppConfig, a5 as tv, b as Primitive, ay as useState, ad as useDebounceFn, ag as useEventListener, av as useRoute, an as useLocale, p as createReusableTemplate, ak as useForwardProps, $ as reactivePick, N as isArrayOfArray, h as _sfc_main$b, i as _sfc_main$c, j as _sfc_main$d, C as get, f as _sfc_main$9$1, Y as pickLinkProps, g as _sfc_main$a$1, Z as reactiveOmit, e as _sfc_main$8$1, a7 as useActiveElement, aj as useForwardExpose, aa as useCollection, a0 as refAutoReset, V as VisuallyHidden_default, O as isClient, P as Presence_default, aB as useVModel, au as useResizeObserver, U as navigateTo, l as createContext, D as getActiveElement, a6 as unrefElement } from './server.mjs';
import { p as provideDashboardContext, u as useDashboard$1, b as useResizable, _ as _sfc_main$9, a as _sfc_main$1$2 } from './DashboardSidebarToggle-DCHr3Kp6.mjs';
import { g as defu } from '../nitro/nitro.mjs';
import { _ as _sfc_main$8 } from './Modal-BBL-Wwu5.mjs';
import { _ as _sfc_main$7 } from './Drawer-CubnRYJR.mjs';
import { _ as __nuxt_component_1 } from './AppLogo-Bplyd4QI.mjs';
import { g as useKbd, c as AccordionTrigger_default, a as AccordionItem_default, d as _sfc_main$2$2, _ as _sfc_main$e, A as AccordionContent_default, b as AccordionRoot_default, u as useArrowNavigation } from './Tooltip-B9bIxuPZ.mjs';
import { e as useForwardPropsEmits, u as useDirection } from './PopperArrow-CVyIWJ6M.mjs';
import { m as useId, h as DismissableLayer_default } from './overlay-BWwBD9XH.mjs';
import { _ as _sfc_main$a } from './Badge-GvDWvg1z.mjs';
import { g as getCollectionType } from './collectionTypes-6EiXkZ_r.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { u as useCurrentUser } from './useCurrentUser-0x7hmjnh.mjs';
import { u as useCollections } from './useCollections-Be_EdGTg.mjs';
import { f as ssrRenderComponent_1, o as vueExports, i as ssrRenderSlot_1, d as ssrRenderAttrs_1, e as ssrRenderClass_1, a as ssrInterpolate_1, m as ssrRenderVNode, g as ssrRenderList_1 } from '../routes/renderer.mjs';
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
import '../_/shared.cjs.prod.mjs';
import 'node:stream';

function getOpenState(open) {
  return open ? "open" : "closed";
}
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
const LINK_SELECT = "navigationMenu.linkSelect";
const EVENT_ROOT_CONTENT_DISMISS = "navigationMenu.rootContentDismiss";
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = (void 0).createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
    const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
    if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
    return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function focusFirst(candidates) {
  const previouslyFocusedElement = getActiveElement();
  return candidates.some((candidate) => {
    if (candidate === previouslyFocusedElement) return true;
    candidate.focus();
    return getActiveElement() !== previouslyFocusedElement;
  });
}
function removeFromTabOrder(candidates) {
  candidates.forEach((candidate) => {
    candidate.dataset.tabindex = candidate.getAttribute("tabindex") || "";
    candidate.setAttribute("tabindex", "-1");
  });
  return () => {
    candidates.forEach((candidate) => {
      const prevTabIndex = candidate.dataset.tabindex;
      candidate.setAttribute("tabindex", prevTabIndex);
    });
  };
}
function whenMouse(handler) {
  return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
const [injectNavigationMenuContext, provideNavigationMenuContext] = /* @__PURE__ */ createContext(["NavigationMenuRoot", "NavigationMenuSub"], "NavigationMenuContext");
var NavigationMenuRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "NavigationMenuRoot",
  props: {
    modelValue: {
      type: String,
      required: false,
      default: void 0
    },
    defaultValue: {
      type: String,
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    orientation: {
      type: String,
      required: false,
      default: "horizontal"
    },
    delayDuration: {
      type: Number,
      required: false,
      default: 200
    },
    skipDelayDuration: {
      type: Number,
      required: false,
      default: 300
    },
    disableClickTrigger: {
      type: Boolean,
      required: false,
      default: false
    },
    disableHoverTrigger: {
      type: Boolean,
      required: false,
      default: false
    },
    disablePointerLeaveClose: {
      type: Boolean,
      required: false
    },
    unmountOnHide: {
      type: Boolean,
      required: false,
      default: true
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "nav"
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? "",
      passive: props.modelValue === void 0
    });
    const previousValue = vueExports.ref("");
    const { forwardRef, currentElement: rootNavigationMenu } = useForwardExpose();
    const indicatorTrack = vueExports.ref();
    const viewport = vueExports.ref();
    const activeTrigger = vueExports.ref();
    const { getItems, CollectionSlot } = useCollection({
      key: "NavigationMenu",
      isProvider: true
    });
    const { delayDuration, skipDelayDuration, dir: propDir, disableClickTrigger, disableHoverTrigger, unmountOnHide } = vueExports.toRefs(props);
    const dir = useDirection(propDir);
    const isDelaySkipped = refAutoReset(false, skipDelayDuration);
    const computedDelay = vueExports.computed(() => {
      const isOpen = modelValue.value !== "";
      if (isOpen || isDelaySkipped.value) return 150;
      else return delayDuration.value;
    });
    const debouncedFn = useDebounceFn((val) => {
      if (typeof val === "string") {
        previousValue.value = modelValue.value;
        modelValue.value = val;
      }
    }, computedDelay);
    vueExports.watchEffect(() => {
      if (!modelValue.value) return;
      const items = getItems().map((i) => i.ref);
      activeTrigger.value = items.find((item) => item.id.includes(modelValue.value));
    });
    useEventListener(rootNavigationMenu, EVENT_ROOT_CONTENT_DISMISS, onItemDismiss);
    provideNavigationMenuContext({
      isRootMenu: true,
      modelValue,
      previousValue,
      baseId: useId(void 0, "reka-navigation-menu"),
      disableClickTrigger,
      disableHoverTrigger,
      dir,
      unmountOnHide,
      orientation: props.orientation,
      rootNavigationMenu,
      indicatorTrack,
      activeTrigger,
      onIndicatorTrackChange: (val) => {
        indicatorTrack.value = val;
      },
      viewport,
      onViewportChange: (val) => {
        viewport.value = val;
      },
      onTriggerEnter: (val) => {
        debouncedFn(val);
      },
      onTriggerLeave: () => {
        isDelaySkipped.value = true;
        debouncedFn("");
      },
      onContentEnter: () => {
        debouncedFn();
      },
      onContentLeave: () => {
        if (!props.disablePointerLeaveClose) debouncedFn("");
      },
      onItemSelect: (val) => {
        previousValue.value = modelValue.value;
        modelValue.value = val;
      },
      onItemDismiss
    });
    function onItemDismiss() {
      previousValue.value = modelValue.value;
      modelValue.value = "";
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionSlot), null, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          ref: vueExports.unref(forwardRef),
          as: _ctx.as,
          "as-child": _ctx.asChild,
          "data-orientation": _ctx.orientation,
          dir: vueExports.unref(dir),
          "data-reka-navigation-menu": ""
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
          _: 3
        }, 8, [
          "as",
          "as-child",
          "data-orientation",
          "dir"
        ])]),
        _: 3
      });
    };
  }
});
var NavigationMenuRoot_default = NavigationMenuRoot_vue_vue_type_script_setup_true_lang_default;
const [injectNavigationMenuItemContext, provideNavigationMenuItemContext] = /* @__PURE__ */ createContext("NavigationMenuItem");
var NavigationMenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "NavigationMenuItem",
  props: {
    value: {
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
      default: "li"
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const { getItems } = useCollection({ key: "NavigationMenu" });
    const context = injectNavigationMenuContext();
    const value = useId(props.value);
    const triggerRef$1 = vueExports.ref();
    const focusProxyRef = vueExports.ref();
    const contentId = makeContentId(context.baseId, value);
    let restoreContentTabOrderRef = () => ({});
    const wasEscapeCloseRef = vueExports.ref(false);
    async function handleContentEntry(side = "start") {
      const el = (void 0).getElementById(contentId);
      if (el) {
        restoreContentTabOrderRef();
        const candidates = getTabbableCandidates(el);
        if (candidates.length) focusFirst(side === "start" ? candidates : candidates.reverse());
      }
    }
    function handleContentExit() {
      const el = (void 0).getElementById(contentId);
      if (el) {
        const candidates = getTabbableCandidates(el);
        if (candidates.length) restoreContentTabOrderRef = removeFromTabOrder(candidates);
      }
    }
    provideNavigationMenuItemContext({
      value,
      contentId,
      triggerRef: triggerRef$1,
      focusProxyRef,
      wasEscapeCloseRef,
      onEntryKeyDown: handleContentEntry,
      onFocusProxyEnter: handleContentEntry,
      onContentFocusOutside: handleContentExit,
      onRootContentClose: handleContentExit
    });
    function handleClose() {
      context.onItemDismiss();
      triggerRef$1.value?.focus();
    }
    function handleKeydown(ev) {
      const currentFocus = getActiveElement();
      if (ev.keyCode === 32 || ev.key === "Enter") if (context.modelValue.value === value) {
        handleClose();
        ev.preventDefault();
        return;
      } else {
        ev.target.click();
        ev.preventDefault();
        return;
      }
      const itemsArray = getItems().filter((i) => i.ref.parentElement?.hasAttribute("data-menu-item")).map((i) => i.ref);
      if (!itemsArray.includes(currentFocus)) return;
      const newSelectedElement = useArrowNavigation(ev, currentFocus, void 0, {
        itemsArray,
        loop: false
      });
      if (newSelectedElement) newSelectedElement?.focus();
      ev.preventDefault();
      ev.stopPropagation();
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "data-menu-item": "",
        onKeydown: vueExports.withKeys(handleKeydown, [
          "up",
          "down",
          "left",
          "right",
          "home",
          "end",
          "space"
        ])
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, ["as-child", "as"]);
    };
  }
});
var NavigationMenuItem_default = NavigationMenuItem_vue_vue_type_script_setup_true_lang_default;
var NavigationMenuContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "NavigationMenuContentImpl",
  props: {
    disableOutsidePointerEvents: {
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
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { getItems } = useCollection({ key: "NavigationMenu" });
    const { forwardRef, currentElement } = useForwardExpose();
    const menuContext = injectNavigationMenuContext();
    const itemContext = injectNavigationMenuItemContext();
    const triggerId = makeTriggerId(menuContext.baseId, itemContext.value);
    const contentId = makeContentId(menuContext.baseId, itemContext.value);
    const prevMotionAttributeRef = vueExports.ref(null);
    const motionAttribute = vueExports.computed(() => {
      const values = getItems().map((i) => i.ref.id.split("trigger-")[1]);
      if (menuContext.dir.value === "rtl") values.reverse();
      const index = values.indexOf(menuContext.modelValue.value);
      const prevIndex = values.indexOf(menuContext.previousValue.value);
      const isSelected = itemContext.value === menuContext.modelValue.value;
      const wasSelected = prevIndex === values.indexOf(itemContext.value);
      if (!isSelected && !wasSelected) return prevMotionAttributeRef.value;
      const attribute = (() => {
        if (index !== prevIndex) {
          if (isSelected && prevIndex !== -1) return index > prevIndex ? "from-end" : "from-start";
          if (wasSelected && index !== -1) return index > prevIndex ? "to-start" : "to-end";
        }
        return null;
      })();
      prevMotionAttributeRef.value = attribute;
      return attribute;
    });
    function handleFocusOutside(ev) {
      emits("focusOutside", ev);
      emits("interactOutside", ev);
      const target = ev.detail.originalEvent.target;
      if (target.hasAttribute("data-navigation-menu-trigger")) ev.preventDefault();
      if (!ev.defaultPrevented) {
        itemContext.onContentFocusOutside();
        const target$1 = ev.target;
        if (menuContext.rootNavigationMenu?.value?.contains(target$1)) ev.preventDefault();
      }
    }
    function handlePointerDownOutside(ev) {
      emits("pointerDownOutside", ev);
      if (!ev.defaultPrevented) {
        const target = ev.target;
        const isTrigger = getItems().some((i) => i.ref.contains(target));
        const isRootViewport = menuContext.isRootMenu && menuContext.viewport.value?.contains(target);
        if (isTrigger || isRootViewport || !menuContext.isRootMenu) ev.preventDefault();
      }
    }
    vueExports.watchEffect((cleanupFn) => {
      const content = currentElement.value;
      if (menuContext.isRootMenu && content) {
        const handleClose = () => {
          menuContext.onItemDismiss();
          itemContext.onRootContentClose();
          if (content.contains(getActiveElement())) itemContext.triggerRef.value?.focus();
        };
        content.addEventListener(EVENT_ROOT_CONTENT_DISMISS, handleClose);
        cleanupFn(() => content.removeEventListener(EVENT_ROOT_CONTENT_DISMISS, handleClose));
      }
    });
    function handleEscapeKeyDown(ev) {
      emits("escapeKeyDown", ev);
      if (!ev.defaultPrevented) {
        menuContext.onItemDismiss();
        itemContext.triggerRef?.value?.focus();
        itemContext.wasEscapeCloseRef.value = true;
      }
    }
    function handleKeydown(ev) {
      if (ev.target.closest("[data-reka-navigation-menu]") !== menuContext.rootNavigationMenu.value) return;
      const isMetaKey = ev.altKey || ev.ctrlKey || ev.metaKey;
      const isTabKey = ev.key === "Tab" && !isMetaKey;
      const candidates = getTabbableCandidates(ev.currentTarget);
      if (isTabKey) {
        const focusedElement = getActiveElement();
        const index = candidates.findIndex((candidate) => candidate === focusedElement);
        const isMovingBackwards = ev.shiftKey;
        const nextCandidates = isMovingBackwards ? candidates.slice(0, index).reverse() : candidates.slice(index + 1, candidates.length);
        if (focusFirst(nextCandidates)) ev.preventDefault();
        else {
          itemContext.focusProxyRef.value?.focus();
          return;
        }
      }
      const newSelectedElement = useArrowNavigation(ev, getActiveElement(), void 0, {
        itemsArray: candidates,
        loop: false,
        enableIgnoredElement: true
      });
      newSelectedElement?.focus();
    }
    function handleDismiss() {
      const rootContentDismissEvent = new Event(EVENT_ROOT_CONTENT_DISMISS, {
        bubbles: true,
        cancelable: true
      });
      currentElement.value?.dispatchEvent(rootContentDismissEvent);
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DismissableLayer_default), vueExports.mergeProps({
        id: vueExports.unref(contentId),
        ref: vueExports.unref(forwardRef),
        "aria-labelledby": vueExports.unref(triggerId),
        "data-motion": motionAttribute.value,
        "data-state": vueExports.unref(getOpenState)(vueExports.unref(menuContext).modelValue.value === vueExports.unref(itemContext).value),
        "data-orientation": vueExports.unref(menuContext).orientation
      }, props, {
        onKeydown: handleKeydown,
        onEscapeKeyDown: handleEscapeKeyDown,
        onPointerDownOutside: handlePointerDownOutside,
        onFocusOutside: handleFocusOutside,
        onDismiss: handleDismiss
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "id",
        "aria-labelledby",
        "data-motion",
        "data-state",
        "data-orientation"
      ]);
    };
  }
});
var NavigationMenuContentImpl_default = NavigationMenuContentImpl_vue_vue_type_script_setup_true_lang_default;
var NavigationMenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "NavigationMenuContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
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
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(reactiveOmit(props, "forceMount"), emits);
    const { forwardRef } = useForwardExpose();
    const menuContext = injectNavigationMenuContext();
    const itemContext = injectNavigationMenuItemContext();
    const open = vueExports.computed(() => itemContext.value === menuContext.modelValue.value);
    const isLastActiveValue = vueExports.computed(() => {
      if (menuContext.viewport.value) {
        if (!menuContext.modelValue.value && menuContext.previousValue.value) return menuContext.previousValue.value === itemContext.value;
      }
      return false;
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.Teleport, {
        to: vueExports.unref(isClient) && vueExports.unref(menuContext).viewport.value ? vueExports.unref(menuContext).viewport.value : "body",
        disabled: vueExports.unref(isClient) && vueExports.unref(menuContext).viewport.value ? !vueExports.unref(menuContext).viewport.value : true
      }, [vueExports.createVNode(vueExports.unref(Presence_default), {
        present: _ctx.forceMount || open.value || isLastActiveValue.value,
        "force-mount": !vueExports.unref(menuContext).unmountOnHide.value
      }, {
        default: vueExports.withCtx(({ present }) => [vueExports.createVNode(NavigationMenuContentImpl_default, vueExports.mergeProps({
          ref: vueExports.unref(forwardRef),
          "data-state": vueExports.unref(getOpenState)(open.value),
          style: { pointerEvents: !open.value && vueExports.unref(menuContext).isRootMenu ? "none" : void 0 }
        }, {
          ..._ctx.$attrs,
          ...vueExports.unref(forwarded)
        }, {
          hidden: !present,
          onPointerenter: _cache[0] || (_cache[0] = ($event) => vueExports.unref(menuContext).onContentEnter(vueExports.unref(itemContext).value)),
          onPointerleave: _cache[1] || (_cache[1] = ($event) => vueExports.unref(whenMouse)(() => vueExports.unref(menuContext).onContentLeave())($event)),
          onPointerDownOutside: _cache[2] || (_cache[2] = ($event) => emits("pointerDownOutside", $event)),
          onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
          onInteractOutside: _cache[4] || (_cache[4] = ($event) => emits("interactOutside", $event))
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 2
        }, 1040, [
          "data-state",
          "style",
          "hidden"
        ])]),
        _: 3
      }, 8, ["present", "force-mount"])], 8, ["to", "disabled"]);
    };
  }
});
var NavigationMenuContent_default = NavigationMenuContent_vue_vue_type_script_setup_true_lang_default;
var NavigationMenuIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "NavigationMenuIndicator",
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
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const menuContext = injectNavigationMenuContext();
    const indicatorStyle = vueExports.ref();
    const isHorizontal = vueExports.computed(() => menuContext.orientation === "horizontal");
    const isVisible = vueExports.computed(() => !!menuContext.modelValue.value);
    const { activeTrigger } = menuContext;
    function handlePositionChange() {
      if (!activeTrigger.value) return;
      indicatorStyle.value = {
        size: isHorizontal.value ? activeTrigger.value.offsetWidth : activeTrigger.value.offsetHeight,
        position: isHorizontal.value ? activeTrigger.value.offsetLeft : activeTrigger.value.offsetTop
      };
    }
    vueExports.watchEffect(() => {
      if (!menuContext.modelValue.value) return;
      handlePositionChange();
    });
    useResizeObserver(activeTrigger, handlePositionChange);
    useResizeObserver(menuContext.indicatorTrack, handlePositionChange);
    return (_ctx, _cache) => {
      return vueExports.unref(menuContext).indicatorTrack.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Teleport, {
        key: 0,
        to: vueExports.unref(menuContext).indicatorTrack.value
      }, [vueExports.createVNode(vueExports.unref(Presence_default), { present: _ctx.forceMount || isVisible.value }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
          ref: vueExports.unref(forwardRef),
          "aria-hidden": "true",
          "data-state": isVisible.value ? "visible" : "hidden",
          "data-orientation": vueExports.unref(menuContext).orientation,
          "as-child": props.asChild,
          as: _ctx.as,
          style: { ...indicatorStyle.value ? {
            "--reka-navigation-menu-indicator-size": `${indicatorStyle.value.size}px`,
            "--reka-navigation-menu-indicator-position": `${indicatorStyle.value.position}px`
          } : {} }
        }, _ctx.$attrs), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "data-state",
          "data-orientation",
          "as-child",
          "as",
          "style"
        ])]),
        _: 3
      }, 8, ["present"])], 8, ["to"])) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var NavigationMenuIndicator_default = NavigationMenuIndicator_vue_vue_type_script_setup_true_lang_default;
var NavigationMenuLink_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "NavigationMenuLink",
  props: {
    active: {
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
      default: "a"
    }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { CollectionItem } = useCollection({ key: "NavigationMenu" });
    useForwardExpose();
    async function handleClick(ev) {
      const linkSelectEvent = new CustomEvent(LINK_SELECT, {
        bubbles: true,
        cancelable: true,
        detail: { originalEvent: ev }
      });
      emits("select", linkSelectEvent);
      if (!linkSelectEvent.defaultPrevented && !ev.metaKey) {
        const rootContentDismissEvent = new CustomEvent(EVENT_ROOT_CONTENT_DISMISS, {
          bubbles: true,
          cancelable: true
        });
        ev.target?.dispatchEvent(rootContentDismissEvent);
      }
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionItem), null, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          as: _ctx.as,
          "data-active": _ctx.active ? "" : void 0,
          "aria-current": _ctx.active ? "page" : void 0,
          "as-child": props.asChild,
          onClick: handleClick
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "as",
          "data-active",
          "aria-current",
          "as-child"
        ])]),
        _: 3
      });
    };
  }
});
var NavigationMenuLink_default = NavigationMenuLink_vue_vue_type_script_setup_true_lang_default;
var NavigationMenuList_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "NavigationMenuList",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "ul"
    }
  },
  setup(__props) {
    const props = __props;
    const menuContext = injectNavigationMenuContext();
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        ref: vueExports.unref(forwardRef),
        style: { "position": "relative" }
      }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps(_ctx.$attrs, {
          "as-child": props.asChild,
          as: _ctx.as,
          "data-orientation": vueExports.unref(menuContext).orientation
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "as-child",
          "as",
          "data-orientation"
        ])]),
        _: 3
      }, 512);
    };
  }
});
var NavigationMenuList_default = NavigationMenuList_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1 = ["aria-owns"];
var NavigationMenuTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "NavigationMenuTrigger",
  props: {
    disabled: {
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
      default: "button"
    }
  },
  setup(__props) {
    const props = __props;
    const menuContext = injectNavigationMenuContext();
    const itemContext = injectNavigationMenuItemContext();
    const { CollectionItem } = useCollection({ key: "NavigationMenu" });
    const { forwardRef, currentElement: triggerElement } = useForwardExpose();
    const triggerId = vueExports.ref("");
    const contentId = vueExports.ref("");
    const hasPointerMoveOpenedRef = refAutoReset(false, 300);
    const wasClickCloseRef = vueExports.ref(false);
    const open = vueExports.computed(() => itemContext.value === menuContext.modelValue.value);
    function handlePointerEnter() {
      if (menuContext.disableHoverTrigger.value) return;
      wasClickCloseRef.value = false;
      itemContext.wasEscapeCloseRef.value = false;
    }
    function handlePointerMove(ev) {
      if (menuContext.disableHoverTrigger.value) return;
      if (ev.pointerType === "mouse") {
        if (props.disabled || wasClickCloseRef.value || itemContext.wasEscapeCloseRef.value || hasPointerMoveOpenedRef.value) return;
        menuContext.onTriggerEnter(itemContext.value);
        hasPointerMoveOpenedRef.value = true;
      }
    }
    function handlePointerLeave(ev) {
      if (menuContext.disableHoverTrigger.value) return;
      if (ev.pointerType === "mouse") {
        if (props.disabled) return;
        menuContext.onTriggerLeave();
        hasPointerMoveOpenedRef.value = false;
      }
    }
    function handleClick(event) {
      if ((!("pointerType" in event) || event.pointerType === "mouse") && menuContext.disableClickTrigger.value) return;
      if (hasPointerMoveOpenedRef.value) return;
      if (open.value) menuContext.onItemSelect("");
      else menuContext.onItemSelect(itemContext.value);
      wasClickCloseRef.value = open.value;
    }
    function handleKeydown(ev) {
      const verticalEntryKey = menuContext.dir.value === "rtl" ? "ArrowLeft" : "ArrowRight";
      const entryKey = {
        horizontal: "ArrowDown",
        vertical: verticalEntryKey
      }[menuContext.orientation];
      if (open.value && ev.key === entryKey) {
        itemContext.onEntryKeyDown();
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
    function setFocusProxyRef(node) {
      if (!node) return void 0;
      itemContext.focusProxyRef.value = unrefElement(node);
      return void 0;
    }
    function handleVisuallyHiddenFocus(ev) {
      const content = (void 0).getElementById(itemContext.contentId);
      const prevFocusedElement = ev.relatedTarget;
      const wasTriggerFocused = prevFocusedElement === triggerElement.value;
      const wasFocusFromContent = content?.contains(prevFocusedElement);
      if (wasTriggerFocused || !wasFocusFromContent) itemContext.onFocusProxyEnter(wasTriggerFocused ? "start" : "end");
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createElementBlock(vueExports.Fragment, null, [vueExports.createVNode(vueExports.unref(CollectionItem), null, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
          id: triggerId.value,
          ref: vueExports.unref(forwardRef),
          disabled: _ctx.disabled,
          "data-disabled": _ctx.disabled ? "" : void 0,
          "data-state": vueExports.unref(getOpenState)(open.value),
          "data-navigation-menu-trigger": "",
          "aria-expanded": open.value,
          "aria-controls": contentId.value,
          "as-child": props.asChild,
          as: _ctx.as
        }, _ctx.$attrs, {
          onPointerenter: handlePointerEnter,
          onPointermove: handlePointerMove,
          onPointerleave: handlePointerLeave,
          onClick: handleClick,
          onKeydown: handleKeydown
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "id",
          "disabled",
          "data-disabled",
          "data-state",
          "aria-expanded",
          "aria-controls",
          "as-child",
          "as"
        ])]),
        _: 3
      }), open.value ? (vueExports.openBlock(), vueExports.createElementBlock(vueExports.Fragment, { key: 0 }, [vueExports.createVNode(vueExports.unref(VisuallyHidden_default), {
        ref: setFocusProxyRef,
        "aria-hidden": "true",
        tabindex: 0,
        onFocus: handleVisuallyHiddenFocus
      }), vueExports.unref(menuContext).viewport ? (vueExports.openBlock(), vueExports.createElementBlock("span", {
        key: 0,
        "aria-owns": contentId.value
      }, null, 8, _hoisted_1)) : vueExports.createCommentVNode("v-if", true)], 64)) : vueExports.createCommentVNode("v-if", true)], 64);
    };
  }
});
var NavigationMenuTrigger_default = NavigationMenuTrigger_vue_vue_type_script_setup_true_lang_default;
var NavigationMenuViewport_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "NavigationMenuViewport",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    align: {
      type: String,
      required: false,
      default: "center"
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
    const { forwardRef, currentElement } = useForwardExpose();
    const menuContext = injectNavigationMenuContext();
    const { activeTrigger, rootNavigationMenu, modelValue } = menuContext;
    const size = vueExports.ref();
    const position = vueExports.ref();
    const open = vueExports.computed(() => !!menuContext.modelValue.value);
    vueExports.watch(currentElement, () => {
      menuContext.onViewportChange(currentElement.value);
    });
    const content = vueExports.ref();
    vueExports.watch([modelValue, open], () => {
      vueExports.nextTick(() => {
        if (!currentElement.value) return;
        requestAnimationFrame(() => {
          const el = currentElement.value?.querySelector("[data-state=open]");
          content.value = el;
        });
      });
    }, { immediate: true });
    function updatePosition() {
      if (content.value && activeTrigger.value && rootNavigationMenu.value) {
        const bodyWidth = (void 0).documentElement.offsetWidth;
        const bodyHeight = (void 0).documentElement.offsetHeight;
        const rootRect = rootNavigationMenu.value.getBoundingClientRect();
        const rect = activeTrigger.value.getBoundingClientRect();
        const { offsetWidth, offsetHeight } = content.value;
        const startPositionLeft = rect.left - rootRect.left;
        const startPositionTop = rect.top - rootRect.top;
        let posLeft = null;
        let posTop = null;
        switch (props.align) {
          case "start":
            posLeft = startPositionLeft;
            posTop = startPositionTop;
            break;
          case "end":
            posLeft = startPositionLeft - offsetWidth + rect.width;
            posTop = startPositionTop - offsetHeight + rect.height;
            break;
          default:
            posLeft = startPositionLeft - offsetWidth / 2 + rect.width / 2;
            posTop = startPositionTop - offsetHeight / 2 + rect.height / 2;
        }
        const screenOffset = 10;
        if (posLeft + rootRect.left < screenOffset) posLeft = screenOffset - rootRect.left;
        const rightOffset = posLeft + rootRect.left + offsetWidth;
        if (rightOffset > bodyWidth - screenOffset) {
          posLeft -= rightOffset - bodyWidth + screenOffset;
          if (posLeft < screenOffset - rootRect.left) posLeft = screenOffset - rootRect.left;
        }
        if (posTop + rootRect.top < screenOffset) posTop = screenOffset - rootRect.top;
        const bottomOffset = posTop + rootRect.top + offsetHeight;
        if (bottomOffset > bodyHeight - screenOffset) {
          posTop -= bottomOffset - bodyHeight + screenOffset;
          if (posTop < screenOffset - rootRect.top) posTop = screenOffset - rootRect.top;
        }
        posLeft = Math.round(posLeft);
        posTop = Math.round(posTop);
        position.value = {
          left: posLeft,
          top: posTop
        };
      }
    }
    useResizeObserver(content, () => {
      if (content.value) {
        size.value = {
          width: content.value.offsetWidth,
          height: content.value.offsetHeight
        };
        updatePosition();
      }
    });
    useResizeObserver([globalThis.document?.body, rootNavigationMenu], () => {
      updatePosition();
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), {
        present: _ctx.forceMount || open.value,
        "force-mount": !vueExports.unref(menuContext).unmountOnHide.value,
        onAfterLeave: _cache[2] || (_cache[2] = () => {
          size.value = void 0;
          position.value = void 0;
        })
      }, {
        default: vueExports.withCtx(({ present }) => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps(_ctx.$attrs, {
          ref: vueExports.unref(forwardRef),
          as: _ctx.as,
          "as-child": _ctx.asChild,
          "data-state": vueExports.unref(getOpenState)(open.value),
          "data-orientation": vueExports.unref(menuContext).orientation,
          style: {
            pointerEvents: !open.value && vueExports.unref(menuContext).isRootMenu ? "none" : void 0,
            ["--reka-navigation-menu-viewport-width"]: size.value ? `${size.value?.width}px` : void 0,
            ["--reka-navigation-menu-viewport-height"]: size.value ? `${size.value?.height}px` : void 0,
            ["--reka-navigation-menu-viewport-left"]: position.value ? `${position.value?.left}px` : void 0,
            ["--reka-navigation-menu-viewport-top"]: position.value ? `${position.value?.top}px` : void 0
          },
          hidden: !present,
          onPointerenter: _cache[0] || (_cache[0] = ($event) => vueExports.unref(menuContext).onContentEnter(vueExports.unref(menuContext).modelValue.value)),
          onPointerleave: _cache[1] || (_cache[1] = ($event) => vueExports.unref(whenMouse)(() => vueExports.unref(menuContext).onContentLeave())($event))
        }), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 2
        }, 1040, [
          "as",
          "as-child",
          "data-state",
          "data-orientation",
          "style",
          "hidden"
        ])]),
        _: 3
      }, 8, ["present", "force-mount"]);
    };
  }
});
var NavigationMenuViewport_default = NavigationMenuViewport_vue_vue_type_script_setup_true_lang_default;
const theme$3 = {
  "base": "fixed inset-0 flex overflow-hidden"
};
const _sfc_main$5 = {
  __name: "UDashboardGroup",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    storage: { type: String, required: false, default: "cookie" },
    storageKey: { type: String, required: false, default: "dashboard" },
    storageOptions: { type: Object, required: false },
    persistent: { type: Boolean, required: false, default: true },
    unit: { type: String, required: false, default: "%" }
  },
  setup(__props) {
    const _props = __props;
    const props = useComponentProps("dashboardGroup", _props);
    const nuxtApp = useNuxtApp();
    const appConfig = useAppConfig();
    const ui = vueExports.computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.dashboardGroup || {} }));
    const sidebarOpen = vueExports.ref(false);
    const sidebarCollapsed = vueExports.ref(false);
    provideDashboardContext({
      storage: props.storage,
      storageKey: props.storageKey,
      storageOptions: props.storageOptions,
      persistent: props.persistent,
      unit: props.unit,
      sidebarOpen,
      toggleSidebar: () => {
        nuxtApp.hooks.callHook("dashboard:sidebar:toggle");
      },
      sidebarCollapsed,
      collapseSidebar: (collapsed) => {
        nuxtApp.hooks.callHook("dashboard:sidebar:collapse", collapsed);
      },
      toggleSearch: () => {
        nuxtApp.hooks.callHook("dashboard:search:toggle");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: vueExports.unref(props).as,
        class: ui.value({ class: [vueExports.unref(props).ui?.base, vueExports.unref(props).class] })
      }, _attrs), {
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
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/DashboardGroup.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const theme$2 = {
  "slots": {
    "root": "relative hidden lg:flex flex-col min-h-svh min-w-16 w-(--width) shrink-0",
    "header": "h-(--ui-header-height) shrink-0 flex items-center gap-1.5 px-4",
    "body": "flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2",
    "footer": "shrink-0 flex items-center gap-1.5 px-4 py-2",
    "toggle": "",
    "handle": "",
    "content": "lg:hidden",
    "overlay": "lg:hidden"
  },
  "variants": {
    "menu": {
      "true": {
        "header": "sm:px-6",
        "body": "sm:px-6",
        "footer": "sm:px-6"
      }
    },
    "side": {
      "left": {
        "root": "border-e border-default"
      },
      "right": {
        "root": ""
      }
    },
    "toggleSide": {
      "left": {
        "toggle": ""
      },
      "right": {
        "toggle": "ms-auto"
      }
    }
  }
};
function useRuntimeHook(name, fn) {
  const nuxtApp = useNuxtApp();
  const unregister = nuxtApp.hook(name, fn);
  vueExports.onScopeDispose(unregister);
}
const _sfc_main$4 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UDashboardSidebar",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    mode: { type: null, required: false, default: "slideover" },
    menu: { type: null, required: false },
    toggle: { type: [Boolean, Object], required: false, default: true },
    toggleSide: { type: String, required: false, default: "left" },
    autoClose: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    id: { type: String, required: false },
    side: { type: String, required: false, default: "left" },
    minSize: { type: Number, required: false, default: 10 },
    maxSize: { type: Number, required: false, default: 20 },
    defaultSize: { type: Number, required: false, default: 15 },
    resizable: { type: Boolean, required: false, default: false },
    collapsible: { type: Boolean, required: false, default: false },
    collapsedSize: { type: Number, required: false, default: 0 }
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {},
    "collapsed": { type: Boolean, ...{ default: false } },
    "collapsedModifiers": {}
  }),
  emits: ["update:open", "update:collapsed"],
  setup(__props) {
    const _props = __props;
    const slots = vueExports.useSlots();
    const props = useComponentProps("dashboardSidebar", _props);
    const open = vueExports.useModel(__props, "open", { type: Boolean, ...{ default: false } });
    const collapsed = vueExports.useModel(__props, "collapsed", { type: Boolean, ...{ default: false } });
    const route = useRoute();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const dashboardContext = useDashboard$1({
      storageKey: "dashboard",
      unit: "%",
      sidebarOpen: vueExports.ref(false),
      sidebarCollapsed: vueExports.ref(false)
    });
    const id = `${dashboardContext.storageKey}-sidebar-${props.id || vueExports.useId()}`;
    const { el, size, collapse, isCollapsed, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, vueExports.toRef(() => ({ ...dashboardContext, ...props })), { collapsed });
    const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
    const [DefineResizeHandleTemplate, ReuseResizeHandleTemplate] = createReusableTemplate();
    useRuntimeHook("dashboard:sidebar:toggle", () => {
      open.value = !open.value;
    });
    useRuntimeHook("dashboard:sidebar:collapse", (value) => {
      isCollapsed.value = value;
    });
    vueExports.watch(open, () => dashboardContext.sidebarOpen.value = open.value, { immediate: true });
    vueExports.watch(isCollapsed, () => dashboardContext.sidebarCollapsed.value = isCollapsed.value, { immediate: true });
    vueExports.watch(() => route.fullPath, () => {
      if (!props.autoClose) return;
      open.value = false;
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.dashboardSidebar || {} })({
      side: props.side
    }));
    const Menu = vueExports.computed(() => ({
      slideover: _sfc_main$2$1,
      modal: _sfc_main$8,
      drawer: _sfc_main$7
    })[props.mode]);
    const menuProps = vueExports.toRef(() => defu(props.menu, {}, props.mode === "modal" ? { fullscreen: true, transition: false } : props.mode === "slideover" ? { side: "left" } : {}));
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
                _push2(ssrRenderComponent_1(_sfc_main$9, vueExports.mergeProps(typeof vueExports.unref(props).toggle === "object" ? vueExports.unref(props).toggle : {}, {
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
              vueExports.renderSlot(_ctx.$slots, "toggle", {
                open: open.value,
                toggle: toggleOpen,
                ui: ui.value
              }, () => [
                vueExports.unref(props).toggle ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9, vueExports.mergeProps({ key: 0 }, typeof vueExports.unref(props).toggle === "object" ? vueExports.unref(props).toggle : {}, {
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
      _push(ssrRenderComponent_1(vueExports.unref(DefineResizeHandleTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "resize-handle", {
              onMouseDown: vueExports.unref(onMouseDown),
              onTouchStart: vueExports.unref(onTouchStart),
              onDoubleClick: vueExports.unref(onDoubleClick),
              ui: ui.value
            }, () => {
              if (vueExports.unref(props).resizable) {
                _push2(ssrRenderComponent_1(_sfc_main$1$2, {
                  "aria-controls": id,
                  "data-slot": "handle",
                  class: ui.value.handle({ class: vueExports.unref(props).ui?.handle }),
                  onMousedown: vueExports.unref(onMouseDown),
                  onTouchstart: vueExports.unref(onTouchStart),
                  onDblclick: vueExports.unref(onDoubleClick)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "resize-handle", {
                onMouseDown: vueExports.unref(onMouseDown),
                onTouchStart: vueExports.unref(onTouchStart),
                onDoubleClick: vueExports.unref(onDoubleClick),
                ui: ui.value
              }, () => [
                vueExports.unref(props).resizable ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$1$2, {
                  key: 0,
                  "aria-controls": id,
                  "data-slot": "handle",
                  class: ui.value.handle({ class: vueExports.unref(props).ui?.handle }),
                  onMousedown: vueExports.unref(onMouseDown),
                  onTouchstart: vueExports.unref(onTouchStart),
                  onDblclick: vueExports.unref(onDoubleClick)
                }, null, 8, ["class", "onMousedown", "onTouchstart", "onDblclick"])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      if (vueExports.unref(props).side === "right") {
        _push(ssrRenderComponent_1(vueExports.unref(ReuseResizeHandleTemplate), null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({
        id,
        ref_key: "el",
        ref: el
      }, _ctx.$attrs, {
        "data-collapsed": vueExports.unref(isCollapsed),
        "data-dragging": vueExports.unref(isDragging),
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] }),
        style: { "--width": `${vueExports.unref(size) || 0}${vueExports.unref(dashboardContext).unit}` }
      }))}>`);
      if (!!slots.header) {
        _push(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(props).ui?.header }))}">`);
        ssrRenderSlot_1(_ctx.$slots, "header", {
          collapsed: vueExports.unref(isCollapsed),
          collapse: vueExports.unref(collapse)
        }, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(props).ui?.body }))}">`);
      ssrRenderSlot_1(_ctx.$slots, "default", {
        collapsed: vueExports.unref(isCollapsed),
        collapse: vueExports.unref(collapse)
      }, null, _push, _parent);
      _push(`</div>`);
      if (!!slots.footer) {
        _push(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(props).ui?.footer }))}">`);
        ssrRenderSlot_1(_ctx.$slots, "footer", {
          collapsed: vueExports.unref(isCollapsed),
          collapse: vueExports.unref(collapse)
        }, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (vueExports.unref(props).side === "left") {
        _push(ssrRenderComponent_1(vueExports.unref(ReuseResizeHandleTemplate), null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent_1(vueExports.unref(Menu), vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: vueExports.unref(t)("dashboardSidebar.title"),
        description: vueExports.unref(t)("dashboardSidebar.description")
      }, menuProps.value, {
        ui: {
          overlay: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay }),
          content: ui.value.content({ class: vueExports.unref(props).ui?.content })
        }
      }), {
        content: vueExports.withCtx((contentData, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "content", contentData, () => {
              if (!!slots.header || vueExports.unref(props).mode !== "drawer") {
                _push2(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(props).ui?.header, menu: true }))}"${_scopeId}>`);
                if (vueExports.unref(props).mode !== "drawer" && vueExports.unref(props).toggleSide === "left") {
                  _push2(ssrRenderComponent_1(vueExports.unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                ssrRenderSlot_1(_ctx.$slots, "header", {
                  collapsed: false,
                  collapse: () => {
                  }
                }, null, _push2, _parent2, _scopeId);
                if (vueExports.unref(props).mode !== "drawer" && vueExports.unref(props).toggleSide === "right") {
                  _push2(ssrRenderComponent_1(vueExports.unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(props).ui?.body, menu: true }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "default", {
                collapsed: false,
                collapse: () => {
                }
              }, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
              if (!!slots.footer) {
                _push2(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(props).ui?.footer, menu: true }))}"${_scopeId}>`);
                ssrRenderSlot_1(_ctx.$slots, "footer", {
                  collapsed: false,
                  collapse: () => {
                  }
                }, null, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "content", contentData, () => [
                !!slots.header || vueExports.unref(props).mode !== "drawer" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  "data-slot": "header",
                  class: ui.value.header({ class: vueExports.unref(props).ui?.header, menu: true })
                }, [
                  vueExports.unref(props).mode !== "drawer" && vueExports.unref(props).toggleSide === "left" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseToggleTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                  vueExports.renderSlot(_ctx.$slots, "header", {
                    collapsed: false,
                    collapse: () => {
                    }
                  }),
                  vueExports.unref(props).mode !== "drawer" && vueExports.unref(props).toggleSide === "right" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseToggleTemplate), { key: 1 })) : vueExports.createCommentVNode("", true)
                ], 2)) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("div", {
                  "data-slot": "body",
                  class: ui.value.body({ class: vueExports.unref(props).ui?.body, menu: true })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "default", {
                    collapsed: false,
                    collapse: () => {
                    }
                  })
                ], 2),
                !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 1,
                  "data-slot": "footer",
                  class: ui.value.footer({ class: vueExports.unref(props).ui?.footer, menu: true })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "footer", {
                    collapsed: false,
                    collapse: () => {
                    }
                  })
                ], 2)) : vueExports.createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const theme$1 = {
  "base": "hidden lg:flex",
  "variants": {
    "side": {
      "left": "",
      "right": ""
    }
  }
};
const _sfc_main$3 = {
  __name: "UDashboardSidebarCollapse",
  __ssrInlineRender: true,
  props: {
    color: { type: null, required: false, default: "neutral" },
    variant: { type: null, required: false, default: "ghost" },
    side: { type: String, required: false, default: "left" },
    ui: { type: Object, required: false },
    label: { type: String, required: false },
    activeColor: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    class: { type: null, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    as: { type: null, required: false },
    type: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    exactActiveClass: { type: String, required: false },
    viewTransition: { type: Boolean, required: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useComponentProps("dashboardSidebarCollapse", _props);
    const buttonProps = useForwardProps(reactiveOmit(props, "icon", "side", "class"));
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const { sidebarCollapsed, collapseSidebar } = useDashboard$1({ sidebarCollapsed: vueExports.ref(false), collapseSidebar: () => {
    } });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.dashboardSidebarCollapse || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(_sfc_main$8$1, vueExports.mergeProps({
        ...vueExports.unref(buttonProps),
        "icon": vueExports.unref(props).icon || (vueExports.unref(sidebarCollapsed) ? vueExports.unref(appConfig).ui.icons.panelOpen : vueExports.unref(appConfig).ui.icons.panelClose),
        "aria-label": vueExports.unref(sidebarCollapsed) ? vueExports.unref(t)("dashboardSidebarCollapse.expand") : vueExports.unref(t)("dashboardSidebarCollapse.collapse"),
        ..._ctx.$attrs
      }, {
        class: ui.value({ class: [vueExports.unref(props).ui?.base, vueExports.unref(props).class], side: vueExports.unref(props).side }),
        onClick: ($event) => vueExports.unref(collapseSidebar)?.(!vueExports.unref(sidebarCollapsed))
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebarCollapse.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative flex gap-1.5 [&>div]:min-w-0",
    "list": "isolate min-w-0",
    "label": "w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2.5 py-1.5",
    "item": "min-w-0",
    "link": "group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "linkLeadingIcon": "shrink-0 size-5",
    "linkLeadingAvatar": "shrink-0",
    "linkLeadingAvatarSize": "2xs",
    "linkLeadingChipSize": "sm",
    "linkTrailing": "group ms-auto inline-flex gap-1.5 items-center",
    "linkTrailingBadge": "shrink-0",
    "linkTrailingBadgeSize": "sm",
    "linkTrailingIcon": "size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
    "childList": "isolate",
    "childLabel": "text-xs text-highlighted",
    "childItem": "",
    "childLink": "group relative size-full flex items-start text-start text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "childLinkWrapper": "min-w-0",
    "childLinkIcon": "size-5 shrink-0",
    "childLinkLabel": "truncate",
    "childLinkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
    "childLinkDescription": "text-muted",
    "separator": "px-2 h-px bg-border",
    "viewportWrapper": "absolute top-full left-0 flex w-full",
    "viewport": "relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left,right] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-1",
    "content": "",
    "indicator": "absolute left-0 data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-2 w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200",
    "arrow": "relative top-[50%] size-2.5 rotate-45 border border-default bg-default z-1 rounded-xs"
  },
  "variants": {
    "color": {
      "primary": {
        "link": "focus-visible:before:ring-primary",
        "childLink": "focus-visible:before:ring-primary"
      },
      "secondary": {
        "link": "focus-visible:before:ring-secondary",
        "childLink": "focus-visible:before:ring-secondary"
      },
      "success": {
        "link": "focus-visible:before:ring-success",
        "childLink": "focus-visible:before:ring-success"
      },
      "info": {
        "link": "focus-visible:before:ring-info",
        "childLink": "focus-visible:before:ring-info"
      },
      "warning": {
        "link": "focus-visible:before:ring-warning",
        "childLink": "focus-visible:before:ring-warning"
      },
      "error": {
        "link": "focus-visible:before:ring-error",
        "childLink": "focus-visible:before:ring-error"
      },
      "neutral": {
        "link": "focus-visible:before:ring-inverted",
        "childLink": "focus-visible:before:ring-inverted"
      }
    },
    "highlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": "",
      "link": ""
    },
    "orientation": {
      "horizontal": {
        "root": "items-center justify-between",
        "list": "flex items-center",
        "item": "py-2",
        "link": "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
        "childList": "grid p-2",
        "childLink": "px-3 py-2 gap-2 before:inset-x-px before:inset-y-0",
        "childLinkLabel": "font-medium",
        "content": "absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto"
      },
      "vertical": {
        "root": "flex-col",
        "link": "flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0",
        "childLabel": "px-1.5 py-0.5",
        "childLink": "p-1.5 gap-1.5 before:inset-y-px before:inset-x-0"
      }
    },
    "contentOrientation": {
      "horizontal": {
        "viewportWrapper": "justify-center",
        "content": "data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]"
      },
      "vertical": {
        "viewport": "sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left) rtl:left-auto rtl:right-[calc(100%-var(--reka-navigation-menu-viewport-left)-var(--reka-navigation-menu-viewport-width))]"
      }
    },
    "active": {
      "true": {
        "childLink": "before:bg-elevated text-highlighted",
        "childLinkIcon": "text-default"
      },
      "false": {
        "link": "text-muted",
        "linkLeadingIcon": "text-dimmed",
        "childLink": [
          "hover:before:bg-elevated/50 text-default hover:text-highlighted",
          "transition-colors before:transition-colors"
        ],
        "childLinkIcon": [
          "text-dimmed group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    },
    "highlight": {
      "true": ""
    },
    "level": {
      "true": ""
    },
    "collapsed": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "contentOrientation": "horizontal",
      "class": {
        "childList": "grid-cols-2 gap-2"
      }
    },
    {
      "orientation": "horizontal",
      "contentOrientation": "vertical",
      "class": {
        "childList": "gap-1",
        "content": "w-60"
      }
    },
    {
      "orientation": "vertical",
      "collapsed": false,
      "class": {
        "childList": "ms-5 border-s border-default",
        "childItem": "ps-1.5 -ms-px",
        "content": "data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden"
      }
    },
    {
      "orientation": "vertical",
      "collapsed": true,
      "class": {
        "link": "px-1.5",
        "linkLabel": "hidden",
        "linkTrailing": "hidden",
        "content": "shadow-sm rounded-sm min-h-6 p-1"
      }
    },
    {
      "orientation": "horizontal",
      "highlight": true,
      "class": {
        "link": [
          "after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "orientation": "vertical",
      "highlight": true,
      "level": true,
      "class": {
        "link": [
          "after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill",
      "class": {
        "link": [
          "hover:text-highlighted hover:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill",
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:text-highlighted",
        "linkLeadingIcon": "group-data-[state=open]:text-default"
      }
    },
    {
      "disabled": false,
      "variant": "pill",
      "highlight": true,
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:before:bg-elevated/50"
      }
    },
    {
      "disabled": false,
      "variant": "pill",
      "highlight": false,
      "active": false,
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:before:bg-elevated/50"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-primary",
        "linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-secondary",
        "linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-success",
        "linkLeadingIcon": "text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-info",
        "linkLeadingIcon": "text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-warning",
        "linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-error",
        "linkLeadingIcon": "text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-highlighted",
        "linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
      }
    },
    {
      "variant": "pill",
      "active": true,
      "highlight": false,
      "class": {
        "link": "before:bg-elevated"
      }
    },
    {
      "variant": "pill",
      "active": true,
      "highlight": true,
      "disabled": false,
      "class": {
        "link": [
          "hover:before:bg-elevated/50",
          "before:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link",
      "class": {
        "link": [
          "hover:text-highlighted",
          "transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link",
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:text-highlighted",
        "linkLeadingIcon": "group-data-[state=open]:text-default"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-primary",
        "linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-secondary",
        "linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-success",
        "linkLeadingIcon": "text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-info",
        "linkLeadingIcon": "text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-warning",
        "linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-error",
        "linkLeadingIcon": "text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-highlighted",
        "linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
      }
    },
    {
      "highlightColor": "primary",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-primary"
      }
    },
    {
      "highlightColor": "secondary",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-secondary"
      }
    },
    {
      "highlightColor": "success",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-success"
      }
    },
    {
      "highlightColor": "info",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-info"
      }
    },
    {
      "highlightColor": "warning",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-warning"
      }
    },
    {
      "highlightColor": "error",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-error"
      }
    },
    {
      "highlightColor": "neutral",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "highlightColor": "primary",
    "variant": "pill"
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UNavigationMenu",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    type: { type: null, required: false, default: "multiple" },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    trailingIcon: { type: null, required: false },
    externalIcon: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    items: { type: null, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    collapsed: { type: Boolean, required: false },
    tooltip: { type: [Boolean, Object], required: false },
    popover: { type: [Boolean, Object], required: false },
    highlight: { type: Boolean, required: false },
    highlightColor: { type: null, required: false },
    content: { type: Object, required: false },
    contentOrientation: { type: null, required: false, default: "horizontal" },
    arrow: { type: Boolean, required: false },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    delayDuration: { type: Number, required: false, default: 0 },
    disableClickTrigger: { type: Boolean, required: false },
    disableHoverTrigger: { type: Boolean, required: false },
    skipDelayDuration: { type: Number, required: false },
    disablePointerLeaveClose: { type: Boolean, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true },
    disabled: { type: Boolean, required: false },
    collapsible: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const props = useComponentProps("navigationMenu", _props);
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(vueExports.computed(() => ({
      as: props.as,
      delayDuration: props.delayDuration,
      skipDelayDuration: props.skipDelayDuration,
      orientation: props.orientation,
      disableClickTrigger: props.disableClickTrigger,
      disableHoverTrigger: props.disableHoverTrigger,
      disablePointerLeaveClose: props.disablePointerLeaveClose,
      unmountOnHide: props.unmountOnHide
    })), emits);
    const accordionProps = useForwardProps(reactivePick(props, "collapsible", "disabled", "type", "unmountOnHide"), emits);
    const contentProps = vueExports.toRef(() => props.content);
    const tooltipProps = vueExports.toRef(() => defu(typeof props.tooltip === "boolean" ? {} : props.tooltip, { ...props.orientation === "vertical" && { delayDuration: 0, content: { side: "right" } } }));
    const popoverProps = vueExports.toRef(() => defu(typeof props.popover === "boolean" ? {} : props.popover, { mode: "hover", content: { side: "right", align: "start", alignOffset: 2 } }));
    const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
      props: {
        item: Object,
        index: Number,
        level: Number,
        listIndex: Number
      }
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.navigationMenu || {} })({
      orientation: props.orientation,
      contentOrientation: props.orientation === "vertical" ? void 0 : props.contentOrientation,
      collapsed: props.collapsed,
      color: props.color,
      variant: props.variant,
      highlight: props.highlight,
      highlightColor: props.highlightColor || props.color
    }));
    const lists = vueExports.computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    function getItemValue(item, index, level, listIndex) {
      const prefix = lists.value.length > 1 ? `group-${listIndex}-` : "";
      return get(item, props.valueKey) ?? (level > 0 ? `${prefix}item-${level}-${index}` : `${prefix}item-${index}`);
    }
    function getAccordionDefaultValue(list, level = 0, listIndex = 0) {
      const indexes = list.reduce((acc, item, index) => {
        if (item.defaultOpen || item.open) {
          acc.push(getItemValue(item, index, level, listIndex));
        }
        return acc;
      }, []);
      return props.type === "single" ? indexes[0] : indexes;
    }
    function onLinkTrailingClick(e, item) {
      if (!item.children?.length) {
        return;
      }
      if (props.orientation === "horizontal") {
        e.preventDefault();
      } else if (props.orientation === "vertical" && !props.collapsed) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineLinkTemplate), null, {
        default: vueExports.withCtx(({ item, active, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, item.slot || "item", {
              item,
              index,
              active,
              ui: ui.value
            }, () => {
              ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                item,
                active,
                index,
                ui: ui.value
              }, () => {
                if (item.avatar) {
                  _push2(ssrRenderComponent_1(_sfc_main$b, vueExports.mergeProps({
                    size: item.ui?.linkLeadingAvatarSize || vueExports.unref(props).ui?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
                  }, item.avatar, {
                    "data-slot": "linkLeadingAvatar",
                    class: ui.value.linkLeadingAvatar({ class: [vueExports.unref(props).ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active, disabled: !!item.disabled })
                  }), null, _parent2, _scopeId));
                } else if (item.icon && item.chip) {
                  _push2(ssrRenderComponent_1(_sfc_main$c, vueExports.mergeProps({
                    size: item.ui?.linkLeadingChipSize || vueExports.unref(props).ui?.linkLeadingChipSize || ui.value.linkLeadingChipSize(),
                    inset: ""
                  }, typeof item.chip === "object" ? item.chip : {}, { "data-slot": "linkLeadingChip" }), {
                    default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent_1(_sfc_main$d, {
                          name: item.icon,
                          "data-slot": "linkLeadingIcon",
                          class: ui.value.linkLeadingIcon({ class: [vueExports.unref(props).ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                        }, null, _parent3, _scopeId2));
                      } else {
                        return [
                          vueExports.createVNode(_sfc_main$d, {
                            name: item.icon,
                            "data-slot": "linkLeadingIcon",
                            class: ui.value.linkLeadingIcon({ class: [vueExports.unref(props).ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                          }, null, 8, ["name", "class"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else if (item.icon) {
                  _push2(ssrRenderComponent_1(_sfc_main$d, {
                    name: item.icon,
                    "data-slot": "linkLeadingIcon",
                    class: ui.value.linkLeadingIcon({ class: [vueExports.unref(props).ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              if (vueExports.unref(get)(item, vueExports.unref(props).labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"]) {
                _push2(`<span data-slot="linkLabel" class="${ssrRenderClass_1(ui.value.linkLabel({ class: [vueExports.unref(props).ui?.linkLabel, item.ui?.linkLabel] }))}"${_scopeId}>`);
                ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                  item,
                  active,
                  index
                }, () => {
                  _push2(`${ssrInterpolate_1(vueExports.unref(get)(item, vueExports.unref(props).labelKey))}`);
                }, _push2, _parent2, _scopeId);
                if (item.target === "_blank" && vueExports.unref(props).externalIcon !== false) {
                  _push2(ssrRenderComponent_1(_sfc_main$d, {
                    name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                    "data-slot": "linkLabelExternalIcon",
                    class: ui.value.linkLabelExternalIcon({ class: [vueExports.unref(props).ui?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon], active })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.badge || item.badge === 0 || vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || vueExports.unref(props).orientation === "vertical" && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"]) {
                ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed ? vueExports.unref(AccordionTrigger_default) : "span"), {
                  as: vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed ? "span" : void 0,
                  "data-slot": "linkTrailing",
                  class: ui.value.linkTrailing({ class: [vueExports.unref(props).ui?.linkTrailing, item.ui?.linkTrailing] }),
                  onClick: (e) => onLinkTrailingClick(e, item)
                }, {
                  default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                        item,
                        active,
                        index,
                        ui: ui.value
                      }, () => {
                        if (item.badge || item.badge === 0) {
                          _push3(ssrRenderComponent_1(_sfc_main$a, vueExports.mergeProps({
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.linkTrailingBadgeSize || vueExports.unref(props).ui?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
                          }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            "data-slot": "linkTrailingBadge",
                            class: ui.value.linkTrailingBadge({ class: [vueExports.unref(props).ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
                          }), null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        if (vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || vueExports.unref(props).orientation === "vertical" && item.children?.length) {
                          _push3(ssrRenderComponent_1(_sfc_main$d, {
                            name: item.trailingIcon || vueExports.unref(props).trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                            "data-slot": "linkTrailingIcon",
                            class: ui.value.linkTrailingIcon({ class: [vueExports.unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, _parent3, _scopeId2));
                        } else if (item.trailingIcon) {
                          _push3(ssrRenderComponent_1(_sfc_main$d, {
                            name: item.trailingIcon,
                            "data-slot": "linkTrailingIcon",
                            class: ui.value.linkTrailingIcon({ class: [vueExports.unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                          item,
                          active,
                          index,
                          ui: ui.value
                        }, () => [
                          item.badge || item.badge === 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a, vueExports.mergeProps({
                            key: 0,
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.linkTrailingBadgeSize || vueExports.unref(props).ui?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
                          }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            "data-slot": "linkTrailingBadge",
                            class: ui.value.linkTrailingBadge({ class: [vueExports.unref(props).ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true),
                          vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || vueExports.unref(props).orientation === "vertical" && item.children?.length ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 1,
                            name: item.trailingIcon || vueExports.unref(props).trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                            "data-slot": "linkTrailingIcon",
                            class: ui.value.linkTrailingIcon({ class: [vueExports.unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, 8, ["name", "class"])) : item.trailingIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                            key: 2,
                            name: item.trailingIcon,
                            "data-slot": "linkTrailingIcon",
                            class: ui.value.linkTrailingIcon({ class: [vueExports.unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }), _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, item.slot || "item", {
                item,
                index,
                active,
                ui: ui.value
              }, () => [
                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                  item,
                  active,
                  index,
                  ui: ui.value
                }, () => [
                  item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                    key: 0,
                    size: item.ui?.linkLeadingAvatarSize || vueExports.unref(props).ui?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
                  }, item.avatar, {
                    "data-slot": "linkLeadingAvatar",
                    class: ui.value.linkLeadingAvatar({ class: [vueExports.unref(props).ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active, disabled: !!item.disabled })
                  }), null, 16, ["size", "class"])) : item.icon && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                    key: 1,
                    size: item.ui?.linkLeadingChipSize || vueExports.unref(props).ui?.linkLeadingChipSize || ui.value.linkLeadingChipSize(),
                    inset: ""
                  }, typeof item.chip === "object" ? item.chip : {}, { "data-slot": "linkLeadingChip" }), {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_sfc_main$d, {
                        name: item.icon,
                        "data-slot": "linkLeadingIcon",
                        class: ui.value.linkLeadingIcon({ class: [vueExports.unref(props).ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                      }, null, 8, ["name", "class"])
                    ]),
                    _: 2
                  }, 1040, ["size"])) : item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                    key: 2,
                    name: item.icon,
                    "data-slot": "linkLeadingIcon",
                    class: ui.value.linkLeadingIcon({ class: [vueExports.unref(props).ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                ]),
                vueExports.unref(get)(item, vueExports.unref(props).labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] ? (vueExports.openBlock(), vueExports.createBlock("span", {
                  key: 0,
                  "data-slot": "linkLabel",
                  class: ui.value.linkLabel({ class: [vueExports.unref(props).ui?.linkLabel, item.ui?.linkLabel] })
                }, [
                  vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                    item,
                    active,
                    index
                  }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, vueExports.unref(props).labelKey)), 1)
                  ]),
                  item.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                    key: 0,
                    name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                    "data-slot": "linkLabelExternalIcon",
                    class: ui.value.linkLabelExternalIcon({ class: [vueExports.unref(props).ui?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon], active })
                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                ], 2)) : vueExports.createCommentVNode("", true),
                item.badge || item.badge === 0 || vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || vueExports.unref(props).orientation === "vertical" && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"] ? (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed ? vueExports.unref(AccordionTrigger_default) : "span"), {
                  key: 1,
                  as: vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed ? "span" : void 0,
                  "data-slot": "linkTrailing",
                  class: ui.value.linkTrailing({ class: [vueExports.unref(props).ui?.linkTrailing, item.ui?.linkTrailing] }),
                  onClick: (e) => onLinkTrailingClick(e, item)
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                      item,
                      active,
                      index,
                      ui: ui.value
                    }, () => [
                      item.badge || item.badge === 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a, vueExports.mergeProps({
                        key: 0,
                        color: "neutral",
                        variant: "outline",
                        size: item.ui?.linkTrailingBadgeSize || vueExports.unref(props).ui?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
                      }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                        "data-slot": "linkTrailingBadge",
                        class: ui.value.linkTrailingBadge({ class: [vueExports.unref(props).ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
                      }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true),
                      vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || vueExports.unref(props).orientation === "vertical" && item.children?.length ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                        key: 1,
                        name: item.trailingIcon || vueExports.unref(props).trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                        "data-slot": "linkTrailingIcon",
                        class: ui.value.linkTrailingIcon({ class: [vueExports.unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                      }, null, 8, ["name", "class"])) : item.trailingIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                        key: 2,
                        name: item.trailingIcon,
                        "data-slot": "linkTrailingIcon",
                        class: ui.value.linkTrailingIcon({ class: [vueExports.unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                      }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                    ])
                  ]),
                  _: 2
                }, 1032, ["as", "class", "onClick"])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(DefineItemTemplate), null, {
        default: vueExports.withCtx(({ item, index, level = 0, listIndex = 0 }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref(props).orientation === "vertical" && !vueExports.unref(props).collapsed ? vueExports.unref(AccordionItem_default) : vueExports.unref(NavigationMenuItem_default)), vueExports.mergeProps({ as: "li" }, vueExports.unref(props).orientation === "vertical" && !vueExports.unref(props).collapsed ? { disabled: !!item.disabled } : {}, {
              value: getItemValue(item, index, level, listIndex)
            }), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (vueExports.unref(props).orientation === "vertical" && item.type === "label" && !vueExports.unref(props).collapsed) {
                    _push3(`<div data-slot="label" class="${ssrRenderClass_1(ui.value.label({ class: [vueExports.unref(props).ui?.label, item.ui?.label, item.class] }))}"${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(vueExports.unref(ReuseLinkTemplate), {
                      item,
                      index
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (item.type !== "label") {
                    _push3(ssrRenderComponent_1(_sfc_main$9$1, vueExports.mergeProps(vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed && item.type === "trigger" ? {} : vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                      default: vueExports.withCtx(({ active, ...slotProps }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? vueExports.unref(NavigationMenuTrigger_default) : vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed && !slotProps.href ? vueExports.unref(AccordionTrigger_default) : vueExports.unref(NavigationMenuLink_default)), {
                            "as-child": "",
                            active: active || item.active,
                            disabled: item.disabled,
                            onSelect: item.onSelect
                          }, {
                            default: vueExports.withCtx((_2, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (vueExports.unref(props).orientation === "vertical" && vueExports.unref(props).collapsed && item.children?.length && (!!vueExports.unref(props).popover || !!item.popover)) {
                                  _push5(ssrRenderComponent_1(_sfc_main$2$2, vueExports.mergeProps({ ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                                    ui: { content: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] }) }
                                  }), {
                                    content: vueExports.withCtx(({ close }, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                          item,
                                          active: active || item.active,
                                          index,
                                          ui: ui.value,
                                          close
                                        }, () => {
                                          _push6(`<ul data-slot="childList" class="${ssrRenderClass_1(ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] }))}"${_scopeId5}><li data-slot="childLabel" class="${ssrRenderClass_1(ui.value.childLabel({ class: [vueExports.unref(props).ui?.childLabel, item.ui?.childLabel] }))}"${_scopeId5}>${ssrInterpolate_1(vueExports.unref(get)(item, vueExports.unref(props).labelKey))}</li><!--[-->`);
                                          ssrRenderList_1(item.children, (childItem, childIndex) => {
                                            _push6(`<li data-slot="childItem" class="${ssrRenderClass_1(ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] }))}"${_scopeId5}>`);
                                            _push6(ssrRenderComponent_1(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                              default: vueExports.withCtx(({ active: childActive, ...childSlotProps }, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(ssrRenderComponent_1(vueExports.unref(NavigationMenuLink_default), {
                                                    "as-child": "",
                                                    active: childActive,
                                                    onSelect: childItem.onSelect
                                                  }, {
                                                    default: vueExports.withCtx((_3, _push8, _parent8, _scopeId7) => {
                                                      if (_push8) {
                                                        _push8(ssrRenderComponent_1(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                          "data-slot": "childLink",
                                                          class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                        }), {
                                                          default: vueExports.withCtx((_4, _push9, _parent9, _scopeId8) => {
                                                            if (_push9) {
                                                              if (childItem.icon) {
                                                                _push9(ssrRenderComponent_1(_sfc_main$d, {
                                                                  name: childItem.icon,
                                                                  "data-slot": "childLinkIcon",
                                                                  class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                                }, null, _parent9, _scopeId8));
                                                              } else {
                                                                _push9(`<!---->`);
                                                              }
                                                              _push9(`<span data-slot="childLinkLabel" class="${ssrRenderClass_1(ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive }))}"${_scopeId8}>${ssrInterpolate_1(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey))} `);
                                                              if (childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false) {
                                                                _push9(ssrRenderComponent_1(_sfc_main$d, {
                                                                  name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                  "data-slot": "childLinkLabelExternalIcon",
                                                                  class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                }, null, _parent9, _scopeId8));
                                                              } else {
                                                                _push9(`<!---->`);
                                                              }
                                                              _push9(`</span>`);
                                                            } else {
                                                              return [
                                                                childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                                  key: 0,
                                                                  name: childItem.icon,
                                                                  "data-slot": "childLinkIcon",
                                                                  class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                                vueExports.createVNode("span", {
                                                                  "data-slot": "childLinkLabel",
                                                                  class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                                }, [
                                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                                  childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                                    key: 0,
                                                                    name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                    "data-slot": "childLinkLabelExternalIcon",
                                                                    class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                                ], 2)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent8, _scopeId7));
                                                      } else {
                                                        return [
                                                          vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                            "data-slot": "childLink",
                                                            class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                          }), {
                                                            default: vueExports.withCtx(() => [
                                                              childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                                key: 0,
                                                                name: childItem.icon,
                                                                "data-slot": "childLinkIcon",
                                                                class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                              vueExports.createVNode("span", {
                                                                "data-slot": "childLinkLabel",
                                                                class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                              }, [
                                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                                childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                                  key: 0,
                                                                  name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                  "data-slot": "childLinkLabelExternalIcon",
                                                                  class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                              ], 2)
                                                            ]),
                                                            _: 2
                                                          }, 1040, ["class"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                      "as-child": "",
                                                      active: childActive,
                                                      onSelect: childItem.onSelect
                                                    }, {
                                                      default: vueExports.withCtx(() => [
                                                        vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                          "data-slot": "childLink",
                                                          class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                        }), {
                                                          default: vueExports.withCtx(() => [
                                                            childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                              key: 0,
                                                              name: childItem.icon,
                                                              "data-slot": "childLinkIcon",
                                                              class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                            vueExports.createVNode("span", {
                                                              "data-slot": "childLinkLabel",
                                                              class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                            }, [
                                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                              childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                                key: 0,
                                                                name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                "data-slot": "childLinkLabelExternalIcon",
                                                                class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                            ], 2)
                                                          ]),
                                                          _: 2
                                                        }, 1040, ["class"])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["active", "onSelect"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            _push6(`</li>`);
                                          });
                                          _push6(`<!--]--></ul>`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                            item,
                                            active: active || item.active,
                                            index,
                                            ui: ui.value,
                                            close
                                          }, () => [
                                            vueExports.createVNode("ul", {
                                              "data-slot": "childList",
                                              class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                                            }, [
                                              vueExports.createVNode("li", {
                                                "data-slot": "childLabel",
                                                class: ui.value.childLabel({ class: [vueExports.unref(props).ui?.childLabel, item.ui?.childLabel] })
                                              }, vueExports.toDisplayString(vueExports.unref(get)(item, vueExports.unref(props).labelKey)), 3),
                                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                                return vueExports.openBlock(), vueExports.createBlock("li", {
                                                  key: childIndex,
                                                  "data-slot": "childItem",
                                                  class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] })
                                                }, [
                                                  vueExports.createVNode(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                                    default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                                      vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                        "as-child": "",
                                                        active: childActive,
                                                        onSelect: childItem.onSelect
                                                      }, {
                                                        default: vueExports.withCtx(() => [
                                                          vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                            "data-slot": "childLink",
                                                            class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                          }), {
                                                            default: vueExports.withCtx(() => [
                                                              childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                                key: 0,
                                                                name: childItem.icon,
                                                                "data-slot": "childLinkIcon",
                                                                class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                              vueExports.createVNode("span", {
                                                                "data-slot": "childLinkLabel",
                                                                class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                              }, [
                                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                                childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                                  key: 0,
                                                                  name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                  "data-slot": "childLinkLabelExternalIcon",
                                                                  class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                              ], 2)
                                                            ]),
                                                            _: 2
                                                          }, 1040, ["class"])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["active", "onSelect"])
                                                    ]),
                                                    _: 2
                                                  }, 1040)
                                                ], 2);
                                              }), 128))
                                            ], 2)
                                          ])
                                        ];
                                      }
                                    }),
                                    default: vueExports.withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent_1(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                          "data-slot": "link",
                                          class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                        }), {
                                          default: vueExports.withCtx((_4, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent_1(vueExports.unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                                  item,
                                                  active: active || item.active,
                                                  index
                                                }, null, 8, ["item", "active", "index"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                            "data-slot": "link",
                                            class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                          }), {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, 8, ["item", "active", "index"])
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else if (vueExports.unref(props).orientation === "vertical" && vueExports.unref(props).collapsed && (!!vueExports.unref(props).tooltip || !!item.tooltip) || vueExports.unref(props).orientation === "horizontal" && !!item.tooltip) {
                                  _push5(ssrRenderComponent_1(_sfc_main$e, vueExports.mergeProps({
                                    text: vueExports.unref(get)(item, vueExports.unref(props).labelKey)
                                  }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                                    default: vueExports.withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent_1(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                          "data-slot": "link",
                                          class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                        }), {
                                          default: vueExports.withCtx((_4, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent_1(vueExports.unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                                  item,
                                                  active: active || item.active,
                                                  index
                                                }, null, 8, ["item", "active", "index"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                            "data-slot": "link",
                                            class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                          }), {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, 8, ["item", "active", "index"])
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(ssrRenderComponent_1(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                    "data-slot": "link",
                                    class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: vueExports.unref(props).orientation === "horizontal" || level > 0 })
                                  }), {
                                    default: vueExports.withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(ReuseLinkTemplate), {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                            item,
                                            active: active || item.active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                }
                              } else {
                                return [
                                  vueExports.unref(props).orientation === "vertical" && vueExports.unref(props).collapsed && item.children?.length && (!!vueExports.unref(props).popover || !!item.popover) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$2$2, vueExports.mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                                    ui: { content: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] }) }
                                  }), {
                                    content: vueExports.withCtx(({ close }) => [
                                      vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                        item,
                                        active: active || item.active,
                                        index,
                                        ui: ui.value,
                                        close
                                      }, () => [
                                        vueExports.createVNode("ul", {
                                          "data-slot": "childList",
                                          class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                                        }, [
                                          vueExports.createVNode("li", {
                                            "data-slot": "childLabel",
                                            class: ui.value.childLabel({ class: [vueExports.unref(props).ui?.childLabel, item.ui?.childLabel] })
                                          }, vueExports.toDisplayString(vueExports.unref(get)(item, vueExports.unref(props).labelKey)), 3),
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                            return vueExports.openBlock(), vueExports.createBlock("li", {
                                              key: childIndex,
                                              "data-slot": "childItem",
                                              class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] })
                                            }, [
                                              vueExports.createVNode(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                                default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                                  vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                    "as-child": "",
                                                    active: childActive,
                                                    onSelect: childItem.onSelect
                                                  }, {
                                                    default: vueExports.withCtx(() => [
                                                      vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                        "data-slot": "childLink",
                                                        class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                      }), {
                                                        default: vueExports.withCtx(() => [
                                                          childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                            key: 0,
                                                            name: childItem.icon,
                                                            "data-slot": "childLinkIcon",
                                                            class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                          vueExports.createVNode("span", {
                                                            "data-slot": "childLinkLabel",
                                                            class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                          }, [
                                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                              key: 0,
                                                              name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                              "data-slot": "childLinkLabelExternalIcon",
                                                              class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                          ], 2)
                                                        ]),
                                                        _: 2
                                                      }, 1040, ["class"])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["active", "onSelect"])
                                                ]),
                                                _: 2
                                              }, 1040)
                                            ], 2);
                                          }), 128))
                                        ], 2)
                                      ])
                                    ]),
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                        "data-slot": "link",
                                        class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                      }), {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                            item,
                                            active: active || item.active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ]),
                                        _: 2
                                      }, 1040, ["class"])
                                    ]),
                                    _: 2
                                  }, 1040, ["ui"])) : vueExports.unref(props).orientation === "vertical" && vueExports.unref(props).collapsed && (!!vueExports.unref(props).tooltip || !!item.tooltip) || vueExports.unref(props).orientation === "horizontal" && !!item.tooltip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e, vueExports.mergeProps({
                                    key: 1,
                                    text: vueExports.unref(get)(item, vueExports.unref(props).labelKey)
                                  }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                        "data-slot": "link",
                                        class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                      }), {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                            item,
                                            active: active || item.active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ]),
                                        _: 2
                                      }, 1040, ["class"])
                                    ]),
                                    _: 2
                                  }, 1040, ["text"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({ key: 2 }, slotProps, {
                                    "data-slot": "link",
                                    class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: vueExports.unref(props).orientation === "horizontal" || level > 0 })
                                  }), {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                        item,
                                        active: active || item.active,
                                        index
                                      }, null, 8, ["item", "active", "index"])
                                    ]),
                                    _: 2
                                  }, 1040, ["class"]))
                                ];
                              }
                            }),
                            _: 2
                          }), _parent4, _scopeId3);
                          if (vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"])) {
                            _push4(ssrRenderComponent_1(vueExports.unref(NavigationMenuContent_default), vueExports.mergeProps(contentProps.value, {
                              "data-slot": "content",
                              class: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] })
                            }), {
                              default: vueExports.withCtx((_2, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                    item,
                                    active: active || item.active,
                                    index,
                                    ui: ui.value
                                  }, () => {
                                    _push5(`<ul data-slot="childList" class="${ssrRenderClass_1(ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] }))}"${_scopeId4}><!--[-->`);
                                    ssrRenderList_1(item.children, (childItem, childIndex) => {
                                      _push5(`<li data-slot="childItem" class="${ssrRenderClass_1(ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] }))}"${_scopeId4}>`);
                                      _push5(ssrRenderComponent_1(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                        default: vueExports.withCtx(({ active: childActive, ...childSlotProps }, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent_1(vueExports.unref(NavigationMenuLink_default), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: vueExports.withCtx((_3, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(ssrRenderComponent_1(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                    "data-slot": "childLink",
                                                    class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                  }), {
                                                    default: vueExports.withCtx((_4, _push8, _parent8, _scopeId7) => {
                                                      if (_push8) {
                                                        if (childItem.icon) {
                                                          _push8(ssrRenderComponent_1(_sfc_main$d, {
                                                            name: childItem.icon,
                                                            "data-slot": "childLinkIcon",
                                                            class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                          }, null, _parent8, _scopeId7));
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`<div data-slot="childLinkWrapper" class="${ssrRenderClass_1(ui.value.childLinkWrapper({ class: [vueExports.unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] }))}"${_scopeId7}><p data-slot="childLinkLabel" class="${ssrRenderClass_1(ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive }))}"${_scopeId7}>${ssrInterpolate_1(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey))} `);
                                                        if (childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false) {
                                                          _push8(ssrRenderComponent_1(_sfc_main$d, {
                                                            name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                            "data-slot": "childLinkLabelExternalIcon",
                                                            class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                          }, null, _parent8, _scopeId7));
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`</p>`);
                                                        if (childItem.description) {
                                                          _push8(`<p data-slot="childLinkDescription" class="${ssrRenderClass_1(ui.value.childLinkDescription({ class: [vueExports.unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive }))}"${_scopeId7}>${ssrInterpolate_1(childItem.description)}</p>`);
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`</div>`);
                                                      } else {
                                                        return [
                                                          childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                            key: 0,
                                                            name: childItem.icon,
                                                            "data-slot": "childLinkIcon",
                                                            class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                          vueExports.createVNode("div", {
                                                            "data-slot": "childLinkWrapper",
                                                            class: ui.value.childLinkWrapper({ class: [vueExports.unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                          }, [
                                                            vueExports.createVNode("p", {
                                                              "data-slot": "childLinkLabel",
                                                              class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                            }, [
                                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                              childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                                key: 0,
                                                                name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                "data-slot": "childLinkLabelExternalIcon",
                                                                class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                            ], 2),
                                                            childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                              key: 0,
                                                              "data-slot": "childLinkDescription",
                                                              class: ui.value.childLinkDescription({ class: [vueExports.unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                            }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                          ], 2)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                      "data-slot": "childLink",
                                                      class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: vueExports.withCtx(() => [
                                                        childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          "data-slot": "childLinkIcon",
                                                          class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                        vueExports.createVNode("div", {
                                                          "data-slot": "childLinkWrapper",
                                                          class: ui.value.childLinkWrapper({ class: [vueExports.unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                        }, [
                                                          vueExports.createVNode("p", {
                                                            "data-slot": "childLinkLabel",
                                                            class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                          }, [
                                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                              key: 0,
                                                              name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                              "data-slot": "childLinkLabelExternalIcon",
                                                              class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                          ], 2),
                                                          childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                            key: 0,
                                                            "data-slot": "childLinkDescription",
                                                            class: ui.value.childLinkDescription({ class: [vueExports.unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                          }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                        ], 2)
                                                      ]),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          } else {
                                            return [
                                              vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                "as-child": "",
                                                active: childActive,
                                                onSelect: childItem.onSelect
                                              }, {
                                                default: vueExports.withCtx(() => [
                                                  vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                    "data-slot": "childLink",
                                                    class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                  }), {
                                                    default: vueExports.withCtx(() => [
                                                      childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                        key: 0,
                                                        name: childItem.icon,
                                                        "data-slot": "childLinkIcon",
                                                        class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                      }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                      vueExports.createVNode("div", {
                                                        "data-slot": "childLinkWrapper",
                                                        class: ui.value.childLinkWrapper({ class: [vueExports.unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                      }, [
                                                        vueExports.createVNode("p", {
                                                          "data-slot": "childLinkLabel",
                                                          class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                        }, [
                                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                          childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                            key: 0,
                                                            name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                            "data-slot": "childLinkLabelExternalIcon",
                                                            class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                        ], 2),
                                                        childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                          key: 0,
                                                          "data-slot": "childLinkDescription",
                                                          class: ui.value.childLinkDescription({ class: [vueExports.unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                        }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                      ], 2)
                                                    ]),
                                                    _: 2
                                                  }, 1040, ["class"])
                                                ]),
                                                _: 2
                                              }, 1032, ["active", "onSelect"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                      _push5(`</li>`);
                                    });
                                    _push5(`<!--]--></ul>`);
                                  }, _push5, _parent5, _scopeId4);
                                } else {
                                  return [
                                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                      item,
                                      active: active || item.active,
                                      index,
                                      ui: ui.value
                                    }, () => [
                                      vueExports.createVNode("ul", {
                                        "data-slot": "childList",
                                        class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                                      }, [
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                          return vueExports.openBlock(), vueExports.createBlock("li", {
                                            key: childIndex,
                                            "data-slot": "childItem",
                                            class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] })
                                          }, [
                                            vueExports.createVNode(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                              default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                                vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                  "as-child": "",
                                                  active: childActive,
                                                  onSelect: childItem.onSelect
                                                }, {
                                                  default: vueExports.withCtx(() => [
                                                    vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                      "data-slot": "childLink",
                                                      class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: vueExports.withCtx(() => [
                                                        childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          "data-slot": "childLinkIcon",
                                                          class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                        vueExports.createVNode("div", {
                                                          "data-slot": "childLinkWrapper",
                                                          class: ui.value.childLinkWrapper({ class: [vueExports.unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                        }, [
                                                          vueExports.createVNode("p", {
                                                            "data-slot": "childLinkLabel",
                                                            class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                          }, [
                                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                              key: 0,
                                                              name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                              "data-slot": "childLinkLabelExternalIcon",
                                                              class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                          ], 2),
                                                          childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                            key: 0,
                                                            "data-slot": "childLinkDescription",
                                                            class: ui.value.childLinkDescription({ class: [vueExports.unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                          }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                        ], 2)
                                                      ]),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["active", "onSelect"])
                                              ]),
                                              _: 2
                                            }, 1040)
                                          ], 2);
                                        }), 128))
                                      ], 2)
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? vueExports.unref(NavigationMenuTrigger_default) : vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed && !slotProps.href ? vueExports.unref(AccordionTrigger_default) : vueExports.unref(NavigationMenuLink_default)), {
                              "as-child": "",
                              active: active || item.active,
                              disabled: item.disabled,
                              onSelect: item.onSelect
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.unref(props).orientation === "vertical" && vueExports.unref(props).collapsed && item.children?.length && (!!vueExports.unref(props).popover || !!item.popover) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$2$2, vueExports.mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                                  ui: { content: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] }) }
                                }), {
                                  content: vueExports.withCtx(({ close }) => [
                                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                      item,
                                      active: active || item.active,
                                      index,
                                      ui: ui.value,
                                      close
                                    }, () => [
                                      vueExports.createVNode("ul", {
                                        "data-slot": "childList",
                                        class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                                      }, [
                                        vueExports.createVNode("li", {
                                          "data-slot": "childLabel",
                                          class: ui.value.childLabel({ class: [vueExports.unref(props).ui?.childLabel, item.ui?.childLabel] })
                                        }, vueExports.toDisplayString(vueExports.unref(get)(item, vueExports.unref(props).labelKey)), 3),
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                          return vueExports.openBlock(), vueExports.createBlock("li", {
                                            key: childIndex,
                                            "data-slot": "childItem",
                                            class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] })
                                          }, [
                                            vueExports.createVNode(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                              default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                                vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                  "as-child": "",
                                                  active: childActive,
                                                  onSelect: childItem.onSelect
                                                }, {
                                                  default: vueExports.withCtx(() => [
                                                    vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                      "data-slot": "childLink",
                                                      class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: vueExports.withCtx(() => [
                                                        childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          "data-slot": "childLinkIcon",
                                                          class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                        vueExports.createVNode("span", {
                                                          "data-slot": "childLinkLabel",
                                                          class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                        }, [
                                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                          childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                            key: 0,
                                                            name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                            "data-slot": "childLinkLabelExternalIcon",
                                                            class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                        ], 2)
                                                      ]),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["active", "onSelect"])
                                              ]),
                                              _: 2
                                            }, 1040)
                                          ], 2);
                                        }), 128))
                                      ], 2)
                                    ])
                                  ]),
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                      "data-slot": "link",
                                      class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                    }), {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, null, 8, ["item", "active", "index"])
                                      ]),
                                      _: 2
                                    }, 1040, ["class"])
                                  ]),
                                  _: 2
                                }, 1040, ["ui"])) : vueExports.unref(props).orientation === "vertical" && vueExports.unref(props).collapsed && (!!vueExports.unref(props).tooltip || !!item.tooltip) || vueExports.unref(props).orientation === "horizontal" && !!item.tooltip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e, vueExports.mergeProps({
                                  key: 1,
                                  text: vueExports.unref(get)(item, vueExports.unref(props).labelKey)
                                }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                      "data-slot": "link",
                                      class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                    }), {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, null, 8, ["item", "active", "index"])
                                      ]),
                                      _: 2
                                    }, 1040, ["class"])
                                  ]),
                                  _: 2
                                }, 1040, ["text"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({ key: 2 }, slotProps, {
                                  "data-slot": "link",
                                  class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: vueExports.unref(props).orientation === "horizontal" || level > 0 })
                                }), {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"]))
                              ]),
                              _: 2
                            }, 1064, ["active", "disabled", "onSelect"])),
                            vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(NavigationMenuContent_default), vueExports.mergeProps({ key: 0 }, contentProps.value, {
                              "data-slot": "content",
                              class: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] })
                            }), {
                              default: vueExports.withCtx(() => [
                                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                  item,
                                  active: active || item.active,
                                  index,
                                  ui: ui.value
                                }, () => [
                                  vueExports.createVNode("ul", {
                                    "data-slot": "childList",
                                    class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                                  }, [
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                      return vueExports.openBlock(), vueExports.createBlock("li", {
                                        key: childIndex,
                                        "data-slot": "childItem",
                                        class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] })
                                      }, [
                                        vueExports.createVNode(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                          default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                            vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                  "data-slot": "childLink",
                                                  class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                }), {
                                                  default: vueExports.withCtx(() => [
                                                    childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                      key: 0,
                                                      name: childItem.icon,
                                                      "data-slot": "childLinkIcon",
                                                      class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                    vueExports.createVNode("div", {
                                                      "data-slot": "childLinkWrapper",
                                                      class: ui.value.childLinkWrapper({ class: [vueExports.unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                    }, [
                                                      vueExports.createVNode("p", {
                                                        "data-slot": "childLinkLabel",
                                                        class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                      }, [
                                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                        childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                          key: 0,
                                                          name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                          "data-slot": "childLinkLabelExternalIcon",
                                                          class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                      ], 2),
                                                      childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                        key: 0,
                                                        "data-slot": "childLinkDescription",
                                                        class: ui.value.childLinkDescription({ class: [vueExports.unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                      }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                    ], 2)
                                                  ]),
                                                  _: 2
                                                }, 1040, ["class"])
                                              ]),
                                              _: 2
                                            }, 1032, ["active", "onSelect"])
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ], 2);
                                    }), 128))
                                  ], 2)
                                ])
                              ]),
                              _: 2
                            }, 1040, ["class"])) : vueExports.createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed) {
                    _push3(ssrRenderComponent_1(vueExports.unref(AccordionContent_default), {
                      "data-slot": "content",
                      class: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] })
                    }, {
                      default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(vueExports.unref(AccordionRoot_default), vueExports.mergeProps({
                            ...vueExports.unref(accordionProps),
                            defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
                          }, {
                            as: "ul",
                            "data-slot": "childList",
                            class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                          }), {
                            default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList_1(item.children, (childItem, childIndex) => {
                                  _push5(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                                    key: childIndex,
                                    item: childItem,
                                    index: childIndex,
                                    level: level + 1,
                                    "list-index": listIndex,
                                    "data-slot": "childItem",
                                    class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, childItem.ui?.childItem] })
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                    return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                      key: childIndex,
                                      item: childItem,
                                      index: childIndex,
                                      level: level + 1,
                                      "list-index": listIndex,
                                      "data-slot": "childItem",
                                      class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, childItem.ui?.childItem] })
                                    }, null, 8, ["item", "index", "level", "list-index", "class"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(vueExports.unref(AccordionRoot_default), vueExports.mergeProps({
                              ...vueExports.unref(accordionProps),
                              defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
                            }, {
                              as: "ul",
                              "data-slot": "childList",
                              class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                            }), {
                              default: vueExports.withCtx(() => [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                  return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                    key: childIndex,
                                    item: childItem,
                                    index: childIndex,
                                    level: level + 1,
                                    "list-index": listIndex,
                                    "data-slot": "childItem",
                                    class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, childItem.ui?.childItem] })
                                  }, null, 8, ["item", "index", "level", "list-index", "class"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1040, ["class"])
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
                    vueExports.unref(props).orientation === "vertical" && item.type === "label" && !vueExports.unref(props).collapsed ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      "data-slot": "label",
                      class: ui.value.label({ class: [vueExports.unref(props).ui?.label, item.ui?.label, item.class] })
                    }, [
                      vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                        item,
                        index
                      }, null, 8, ["item", "index"])
                    ], 2)) : item.type !== "label" ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9$1, vueExports.mergeProps({ key: 1 }, vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed && item.type === "trigger" ? {} : vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                      default: vueExports.withCtx(({ active, ...slotProps }) => [
                        (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? vueExports.unref(NavigationMenuTrigger_default) : vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed && !slotProps.href ? vueExports.unref(AccordionTrigger_default) : vueExports.unref(NavigationMenuLink_default)), {
                          "as-child": "",
                          active: active || item.active,
                          disabled: item.disabled,
                          onSelect: item.onSelect
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.unref(props).orientation === "vertical" && vueExports.unref(props).collapsed && item.children?.length && (!!vueExports.unref(props).popover || !!item.popover) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$2$2, vueExports.mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                              ui: { content: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] }) }
                            }), {
                              content: vueExports.withCtx(({ close }) => [
                                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                  item,
                                  active: active || item.active,
                                  index,
                                  ui: ui.value,
                                  close
                                }, () => [
                                  vueExports.createVNode("ul", {
                                    "data-slot": "childList",
                                    class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                                  }, [
                                    vueExports.createVNode("li", {
                                      "data-slot": "childLabel",
                                      class: ui.value.childLabel({ class: [vueExports.unref(props).ui?.childLabel, item.ui?.childLabel] })
                                    }, vueExports.toDisplayString(vueExports.unref(get)(item, vueExports.unref(props).labelKey)), 3),
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                      return vueExports.openBlock(), vueExports.createBlock("li", {
                                        key: childIndex,
                                        "data-slot": "childItem",
                                        class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] })
                                      }, [
                                        vueExports.createVNode(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                          default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                            vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                  "data-slot": "childLink",
                                                  class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                }), {
                                                  default: vueExports.withCtx(() => [
                                                    childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                      key: 0,
                                                      name: childItem.icon,
                                                      "data-slot": "childLinkIcon",
                                                      class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                    vueExports.createVNode("span", {
                                                      "data-slot": "childLinkLabel",
                                                      class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                    }, [
                                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                      childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                        key: 0,
                                                        name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                        "data-slot": "childLinkLabelExternalIcon",
                                                        class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                      }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                    ], 2)
                                                  ]),
                                                  _: 2
                                                }, 1040, ["class"])
                                              ]),
                                              _: 2
                                            }, 1032, ["active", "onSelect"])
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ], 2);
                                    }), 128))
                                  ], 2)
                                ])
                              ]),
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                  "data-slot": "link",
                                  class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                }), {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"])
                              ]),
                              _: 2
                            }, 1040, ["ui"])) : vueExports.unref(props).orientation === "vertical" && vueExports.unref(props).collapsed && (!!vueExports.unref(props).tooltip || !!item.tooltip) || vueExports.unref(props).orientation === "horizontal" && !!item.tooltip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e, vueExports.mergeProps({
                              key: 1,
                              text: vueExports.unref(get)(item, vueExports.unref(props).labelKey)
                            }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                  "data-slot": "link",
                                  class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                }), {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"])
                              ]),
                              _: 2
                            }, 1040, ["text"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({ key: 2 }, slotProps, {
                              "data-slot": "link",
                              class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: vueExports.unref(props).orientation === "horizontal" || level > 0 })
                            }), {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                  item,
                                  active: active || item.active,
                                  index
                                }, null, 8, ["item", "active", "index"])
                              ]),
                              _: 2
                            }, 1040, ["class"]))
                          ]),
                          _: 2
                        }, 1064, ["active", "disabled", "onSelect"])),
                        vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(NavigationMenuContent_default), vueExports.mergeProps({ key: 0 }, contentProps.value, {
                          "data-slot": "content",
                          class: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] })
                        }), {
                          default: vueExports.withCtx(() => [
                            vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                              item,
                              active: active || item.active,
                              index,
                              ui: ui.value
                            }, () => [
                              vueExports.createVNode("ul", {
                                "data-slot": "childList",
                                class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                              }, [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                  return vueExports.openBlock(), vueExports.createBlock("li", {
                                    key: childIndex,
                                    "data-slot": "childItem",
                                    class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] })
                                  }, [
                                    vueExports.createVNode(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                      default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                        vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                          "as-child": "",
                                          active: childActive,
                                          onSelect: childItem.onSelect
                                        }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                              "data-slot": "childLink",
                                              class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                            }), {
                                              default: vueExports.withCtx(() => [
                                                childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                  key: 0,
                                                  name: childItem.icon,
                                                  "data-slot": "childLinkIcon",
                                                  class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                vueExports.createVNode("div", {
                                                  "data-slot": "childLinkWrapper",
                                                  class: ui.value.childLinkWrapper({ class: [vueExports.unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                }, [
                                                  vueExports.createVNode("p", {
                                                    "data-slot": "childLinkLabel",
                                                    class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                  }, [
                                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                    childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                      key: 0,
                                                      name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                      "data-slot": "childLinkLabelExternalIcon",
                                                      class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                  ], 2),
                                                  childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                    key: 0,
                                                    "data-slot": "childLinkDescription",
                                                    class: ui.value.childLinkDescription({ class: [vueExports.unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                  }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                ], 2)
                                              ]),
                                              _: 2
                                            }, 1040, ["class"])
                                          ]),
                                          _: 2
                                        }, 1032, ["active", "onSelect"])
                                      ]),
                                      _: 2
                                    }, 1040)
                                  ], 2);
                                }), 128))
                              ], 2)
                            ])
                          ]),
                          _: 2
                        }, 1040, ["class"])) : vueExports.createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1040)) : vueExports.createCommentVNode("", true),
                    vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(AccordionContent_default), {
                      key: 2,
                      "data-slot": "content",
                      class: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] })
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(vueExports.unref(AccordionRoot_default), vueExports.mergeProps({
                          ...vueExports.unref(accordionProps),
                          defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
                        }, {
                          as: "ul",
                          "data-slot": "childList",
                          class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                        }), {
                          default: vueExports.withCtx(() => [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                              return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                key: childIndex,
                                item: childItem,
                                index: childIndex,
                                level: level + 1,
                                "list-index": listIndex,
                                "data-slot": "childItem",
                                class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, childItem.ui?.childItem] })
                              }, null, 8, ["item", "index", "level", "list-index", "class"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1040, ["class"])
                      ]),
                      _: 2
                    }, 1032, ["class"])) : vueExports.createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }), _parent2, _scopeId);
          } else {
            return [
              (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(props).orientation === "vertical" && !vueExports.unref(props).collapsed ? vueExports.unref(AccordionItem_default) : vueExports.unref(NavigationMenuItem_default)), vueExports.mergeProps({ as: "li" }, vueExports.unref(props).orientation === "vertical" && !vueExports.unref(props).collapsed ? { disabled: !!item.disabled } : {}, {
                value: getItemValue(item, index, level, listIndex)
              }), {
                default: vueExports.withCtx(() => [
                  vueExports.unref(props).orientation === "vertical" && item.type === "label" && !vueExports.unref(props).collapsed ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    "data-slot": "label",
                    class: ui.value.label({ class: [vueExports.unref(props).ui?.label, item.ui?.label, item.class] })
                  }, [
                    vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                      item,
                      index
                    }, null, 8, ["item", "index"])
                  ], 2)) : item.type !== "label" ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$9$1, vueExports.mergeProps({ key: 1 }, vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed && item.type === "trigger" ? {} : vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                    default: vueExports.withCtx(({ active, ...slotProps }) => [
                      (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? vueExports.unref(NavigationMenuTrigger_default) : vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed && !slotProps.href ? vueExports.unref(AccordionTrigger_default) : vueExports.unref(NavigationMenuLink_default)), {
                        "as-child": "",
                        active: active || item.active,
                        disabled: item.disabled,
                        onSelect: item.onSelect
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.unref(props).orientation === "vertical" && vueExports.unref(props).collapsed && item.children?.length && (!!vueExports.unref(props).popover || !!item.popover) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$2$2, vueExports.mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                            ui: { content: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] }) }
                          }), {
                            content: vueExports.withCtx(({ close }) => [
                              vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                item,
                                active: active || item.active,
                                index,
                                ui: ui.value,
                                close
                              }, () => [
                                vueExports.createVNode("ul", {
                                  "data-slot": "childList",
                                  class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                                }, [
                                  vueExports.createVNode("li", {
                                    "data-slot": "childLabel",
                                    class: ui.value.childLabel({ class: [vueExports.unref(props).ui?.childLabel, item.ui?.childLabel] })
                                  }, vueExports.toDisplayString(vueExports.unref(get)(item, vueExports.unref(props).labelKey)), 3),
                                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                    return vueExports.openBlock(), vueExports.createBlock("li", {
                                      key: childIndex,
                                      "data-slot": "childItem",
                                      class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] })
                                    }, [
                                      vueExports.createVNode(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                        default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                          vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                            "as-child": "",
                                            active: childActive,
                                            onSelect: childItem.onSelect
                                          }, {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                "data-slot": "childLink",
                                                class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                              }), {
                                                default: vueExports.withCtx(() => [
                                                  childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                    key: 0,
                                                    name: childItem.icon,
                                                    "data-slot": "childLinkIcon",
                                                    class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                  vueExports.createVNode("span", {
                                                    "data-slot": "childLinkLabel",
                                                    class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                  }, [
                                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                    childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                      key: 0,
                                                      name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                      "data-slot": "childLinkLabelExternalIcon",
                                                      class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                  ], 2)
                                                ]),
                                                _: 2
                                              }, 1040, ["class"])
                                            ]),
                                            _: 2
                                          }, 1032, ["active", "onSelect"])
                                        ]),
                                        _: 2
                                      }, 1040)
                                    ], 2);
                                  }), 128))
                                ], 2)
                              ])
                            ]),
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                "data-slot": "link",
                                class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                              }), {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                    item,
                                    active: active || item.active,
                                    index
                                  }, null, 8, ["item", "active", "index"])
                                ]),
                                _: 2
                              }, 1040, ["class"])
                            ]),
                            _: 2
                          }, 1040, ["ui"])) : vueExports.unref(props).orientation === "vertical" && vueExports.unref(props).collapsed && (!!vueExports.unref(props).tooltip || !!item.tooltip) || vueExports.unref(props).orientation === "horizontal" && !!item.tooltip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e, vueExports.mergeProps({
                            key: 1,
                            text: vueExports.unref(get)(item, vueExports.unref(props).labelKey)
                          }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps(slotProps, {
                                "data-slot": "link",
                                class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                              }), {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                    item,
                                    active: active || item.active,
                                    index
                                  }, null, 8, ["item", "active", "index"])
                                ]),
                                _: 2
                              }, 1040, ["class"])
                            ]),
                            _: 2
                          }, 1040, ["text"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({ key: 2 }, slotProps, {
                            "data-slot": "link",
                            class: ui.value.link({ class: [vueExports.unref(props).ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: vueExports.unref(props).orientation === "horizontal" || level > 0 })
                          }), {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                item,
                                active: active || item.active,
                                index
                              }, null, 8, ["item", "active", "index"])
                            ]),
                            _: 2
                          }, 1040, ["class"]))
                        ]),
                        _: 2
                      }, 1064, ["active", "disabled", "onSelect"])),
                      vueExports.unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(NavigationMenuContent_default), vueExports.mergeProps({ key: 0 }, contentProps.value, {
                        "data-slot": "content",
                        class: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] })
                      }), {
                        default: vueExports.withCtx(() => [
                          vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                            item,
                            active: active || item.active,
                            index,
                            ui: ui.value
                          }, () => [
                            vueExports.createVNode("ul", {
                              "data-slot": "childList",
                              class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                            }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                return vueExports.openBlock(), vueExports.createBlock("li", {
                                  key: childIndex,
                                  "data-slot": "childItem",
                                  class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, item.ui?.childItem] })
                                }, [
                                  vueExports.createVNode(_sfc_main$9$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                    default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                      vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                        "as-child": "",
                                        active: childActive,
                                        onSelect: childItem.onSelect
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                            "data-slot": "childLink",
                                            class: ui.value.childLink({ class: [vueExports.unref(props).ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                          }), {
                                            default: vueExports.withCtx(() => [
                                              childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                key: 0,
                                                name: childItem.icon,
                                                "data-slot": "childLinkIcon",
                                                class: ui.value.childLinkIcon({ class: [vueExports.unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                              vueExports.createVNode("div", {
                                                "data-slot": "childLinkWrapper",
                                                class: ui.value.childLinkWrapper({ class: [vueExports.unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                              }, [
                                                vueExports.createVNode("p", {
                                                  "data-slot": "childLinkLabel",
                                                  class: ui.value.childLinkLabel({ class: [vueExports.unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                }, [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(childItem, vueExports.unref(props).labelKey)) + " ", 1),
                                                  childItem.target === "_blank" && vueExports.unref(props).externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                    key: 0,
                                                    name: typeof vueExports.unref(props).externalIcon === "string" ? vueExports.unref(props).externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                    "data-slot": "childLinkLabelExternalIcon",
                                                    class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                ], 2),
                                                childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                  key: 0,
                                                  "data-slot": "childLinkDescription",
                                                  class: ui.value.childLinkDescription({ class: [vueExports.unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                              ], 2)
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ]),
                                        _: 2
                                      }, 1032, ["active", "onSelect"])
                                    ]),
                                    _: 2
                                  }, 1040)
                                ], 2);
                              }), 128))
                            ], 2)
                          ])
                        ]),
                        _: 2
                      }, 1040, ["class"])) : vueExports.createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1040)) : vueExports.createCommentVNode("", true),
                  vueExports.unref(props).orientation === "vertical" && item.children?.length && !vueExports.unref(props).collapsed ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(AccordionContent_default), {
                    key: 2,
                    "data-slot": "content",
                    class: ui.value.content({ class: [vueExports.unref(props).ui?.content, item.ui?.content] })
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(vueExports.unref(AccordionRoot_default), vueExports.mergeProps({
                        ...vueExports.unref(accordionProps),
                        defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
                      }, {
                        as: "ul",
                        "data-slot": "childList",
                        class: ui.value.childList({ class: [vueExports.unref(props).ui?.childList, item.ui?.childList] })
                      }), {
                        default: vueExports.withCtx(() => [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                            return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                              key: childIndex,
                              item: childItem,
                              index: childIndex,
                              level: level + 1,
                              "list-index": listIndex,
                              "data-slot": "childItem",
                              class: ui.value.childItem({ class: [vueExports.unref(props).ui?.childItem, childItem.ui?.childItem] })
                            }, null, 8, ["item", "index", "level", "list-index", "class"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1040, ["class"])
                    ]),
                    _: 2
                  }, 1032, ["class"])) : vueExports.createCommentVNode("", true)
                ]),
                _: 2
              }, 1040, ["value"]))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(NavigationMenuRoot_default), vueExports.mergeProps({
        ...vueExports.unref(rootProps),
        ...vueExports.unref(props).orientation === "horizontal" ? {
          modelValue: vueExports.unref(props).modelValue,
          defaultValue: vueExports.unref(props).defaultValue
        } : {},
        ..._ctx.$attrs
      }, {
        "data-collapsed": vueExports.unref(props).collapsed,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(props).ui?.root, vueExports.unref(props).class] })
      }), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "list-leading", {}, null, _push2, _parent2, _scopeId);
            _push2(`<!--[-->`);
            ssrRenderList_1(lists.value, (list, listIndex) => {
              _push2(`<!--[-->`);
              ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref(props).orientation === "vertical" ? vueExports.unref(AccordionRoot_default) : vueExports.unref(NavigationMenuList_default)), vueExports.mergeProps({ ref_for: true }, vueExports.unref(props).orientation === "vertical" && !vueExports.unref(props).collapsed ? {
                ...vueExports.unref(accordionProps),
                modelValue: vueExports.unref(props).modelValue,
                defaultValue: vueExports.unref(props).defaultValue ?? getAccordionDefaultValue(list, 0, listIndex)
              } : {}, {
                as: "ul",
                "data-slot": "list",
                class: ui.value.list({ class: vueExports.unref(props).ui?.list })
              }), {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList_1(list, (item, index) => {
                      _push3(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                        key: `list-${listIndex}-${index}`,
                        item,
                        index,
                        "list-index": listIndex,
                        "data-slot": "item",
                        class: ui.value.item({ class: [vueExports.unref(props).ui?.item, item.ui?.item] })
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(list, (item, index) => {
                        return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                          key: `list-${listIndex}-${index}`,
                          item,
                          index,
                          "list-index": listIndex,
                          "data-slot": "item",
                          class: ui.value.item({ class: [vueExports.unref(props).ui?.item, item.ui?.item] })
                        }, null, 8, ["item", "index", "list-index", "class"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
              if (vueExports.unref(props).orientation === "vertical" && listIndex < lists.value.length - 1) {
                _push2(`<div data-slot="separator" class="${ssrRenderClass_1(ui.value.separator({ class: vueExports.unref(props).ui?.separator }))}"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
            ssrRenderSlot_1(_ctx.$slots, "list-trailing", {}, null, _push2, _parent2, _scopeId);
            if (vueExports.unref(props).orientation === "horizontal") {
              _push2(`<div data-slot="viewportWrapper" class="${ssrRenderClass_1(ui.value.viewportWrapper({ class: vueExports.unref(props).ui?.viewportWrapper }))}"${_scopeId}>`);
              if (vueExports.unref(props).arrow) {
                _push2(ssrRenderComponent_1(vueExports.unref(NavigationMenuIndicator_default), {
                  "data-slot": "indicator",
                  class: ui.value.indicator({ class: vueExports.unref(props).ui?.indicator })
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div data-slot="arrow" class="${ssrRenderClass_1(ui.value.arrow({ class: vueExports.unref(props).ui?.arrow }))}"${_scopeId2}></div>`);
                    } else {
                      return [
                        vueExports.createVNode("div", {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: vueExports.unref(props).ui?.arrow })
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent_1(vueExports.unref(NavigationMenuViewport_default), {
                "data-slot": "viewport",
                class: ui.value.viewport({ class: vueExports.unref(props).ui?.viewport })
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "list-leading"),
              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(lists.value, (list, listIndex) => {
                return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                  key: `list-${listIndex}`
                }, [
                  (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(props).orientation === "vertical" ? vueExports.unref(AccordionRoot_default) : vueExports.unref(NavigationMenuList_default)), vueExports.mergeProps({ ref_for: true }, vueExports.unref(props).orientation === "vertical" && !vueExports.unref(props).collapsed ? {
                    ...vueExports.unref(accordionProps),
                    modelValue: vueExports.unref(props).modelValue,
                    defaultValue: vueExports.unref(props).defaultValue ?? getAccordionDefaultValue(list, 0, listIndex)
                  } : {}, {
                    as: "ul",
                    "data-slot": "list",
                    class: ui.value.list({ class: vueExports.unref(props).ui?.list })
                  }), {
                    default: vueExports.withCtx(() => [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(list, (item, index) => {
                        return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                          key: `list-${listIndex}-${index}`,
                          item,
                          index,
                          "list-index": listIndex,
                          "data-slot": "item",
                          class: ui.value.item({ class: [vueExports.unref(props).ui?.item, item.ui?.item] })
                        }, null, 8, ["item", "index", "list-index", "class"]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1040, ["class"])),
                  vueExports.unref(props).orientation === "vertical" && listIndex < lists.value.length - 1 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    "data-slot": "separator",
                    class: ui.value.separator({ class: vueExports.unref(props).ui?.separator })
                  }, null, 2)) : vueExports.createCommentVNode("", true)
                ], 64);
              }), 128)),
              vueExports.renderSlot(_ctx.$slots, "list-trailing"),
              vueExports.unref(props).orientation === "horizontal" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "viewportWrapper",
                class: ui.value.viewportWrapper({ class: vueExports.unref(props).ui?.viewportWrapper })
              }, [
                vueExports.unref(props).arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(NavigationMenuIndicator_default), {
                  key: 0,
                  "data-slot": "indicator",
                  class: ui.value.indicator({ class: vueExports.unref(props).ui?.indicator })
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode("div", {
                      "data-slot": "arrow",
                      class: ui.value.arrow({ class: vueExports.unref(props).ui?.arrow })
                    }, null, 2)
                  ]),
                  _: 1
                }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                vueExports.createVNode(vueExports.unref(NavigationMenuViewport_default), {
                  "data-slot": "viewport",
                  class: ui.value.viewport({ class: vueExports.unref(props).ui?.viewport })
                }, null, 8, ["class"])
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/NavigationMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
function useDashboard() {
  const isSidebarOpen = useState("dashboard-sidebar-open", () => false);
  return { isSidebarOpen };
}
const chainedShortcutRegex = /^[^-]+.*-.*[^-]+$/;
const combinedShortcutRegex = /^[^_]+.*_.*[^_]+$/;
const shiftableKeys = ["arrowleft", "arrowright", "arrowup", "arrowright", "tab", "escape", "enter", "backspace"];
function convertKeyToCode(key) {
  if (/^[a-z]$/i.test(key)) {
    return `Key${key.toUpperCase()}`;
  }
  if (/^\d$/.test(key)) {
    return `Digit${key}`;
  }
  if (/^f\d+$/i.test(key)) {
    return key.toUpperCase();
  }
  const specialKeys = {
    space: "Space",
    enter: "Enter",
    escape: "Escape",
    tab: "Tab",
    backspace: "Backspace",
    delete: "Delete",
    arrowup: "ArrowUp",
    arrowdown: "ArrowDown",
    arrowleft: "ArrowLeft",
    arrowright: "ArrowRight"
  };
  return specialKeys[key.toLowerCase()] || key;
}
function defineShortcuts(config, options = {}) {
  const chainedInputs = vueExports.ref([]);
  const clearChainedInput = () => {
    chainedInputs.value.splice(0, chainedInputs.value.length);
  };
  const debouncedClearChainedInput = useDebounceFn(clearChainedInput, options.chainDelay ?? 800);
  const { macOS } = useKbd();
  const activeElement = useActiveElement();
  const layoutIndependent = options.layoutIndependent ?? false;
  const shiftableCodes = shiftableKeys.map((k) => convertKeyToCode(k));
  const onKeyDown = (e) => {
    if (!e.key) {
      return;
    }
    const useCode = layoutIndependent || e.altKey;
    const alphabetKey = useCode ? /^Key[A-Z]$/i.test(e.code) : /^[a-z]{1}$/i.test(e.key);
    const shiftableKey = useCode ? shiftableCodes.includes(e.code) : shiftableKeys.includes(e.key.toLowerCase());
    let chainedKey;
    chainedInputs.value.push(layoutIndependent ? e.code : e.key);
    if (chainedInputs.value.length >= 2) {
      chainedKey = chainedInputs.value.slice(-2).join("-");
      for (const shortcut of shortcuts.value.filter((s) => s.chained)) {
        if (shortcut.key !== chainedKey) {
          continue;
        }
        if (shortcut.enabled) {
          e.preventDefault();
          shortcut.handler(e);
        }
        clearChainedInput();
        return;
      }
    }
    for (const shortcut of shortcuts.value.filter((s) => !s.chained)) {
      if (layoutIndependent) {
        if (e.code !== shortcut.key) {
          continue;
        }
      } else if (shortcut.altKey && e.altKey) {
        if (e.code !== convertKeyToCode(shortcut.key)) {
          continue;
        }
      } else {
        if (e.key.toLowerCase() !== shortcut.key) {
          continue;
        }
      }
      if (e.metaKey !== shortcut.metaKey) {
        continue;
      }
      if (e.ctrlKey !== shortcut.ctrlKey) {
        continue;
      }
      if (e.altKey !== shortcut.altKey) {
        continue;
      }
      if ((alphabetKey || shiftableKey || shortcut.shiftKey || e.shiftKey && (e.metaKey || e.ctrlKey)) && e.shiftKey !== shortcut.shiftKey) {
        continue;
      }
      if (shortcut.enabled) {
        e.preventDefault();
        shortcut.handler(e);
      }
      clearChainedInput();
      return;
    }
    debouncedClearChainedInput();
  };
  const usingInput = vueExports.computed(() => {
    const tagName = activeElement.value?.tagName;
    const contentEditable = activeElement.value?.contentEditable;
    const usingInput2 = !!(tagName === "INPUT" || tagName === "TEXTAREA" || contentEditable === "true" || contentEditable === "plaintext-only");
    if (usingInput2) {
      return activeElement.value?.name || true;
    }
    return false;
  });
  const shortcuts = vueExports.computed(() => {
    return Object.entries(vueExports.toValue(config)).map(([key, shortcutConfig]) => {
      if (!shortcutConfig) {
        return null;
      }
      let shortcut;
      if (key.includes("-") && key !== "-" && !key.includes("_") && !key.match(chainedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`);
      }
      if (key.includes("_") && key !== "_" && !key.match(combinedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`);
      }
      const chained = key.includes("-") && key !== "-" && !key.includes("_");
      if (chained) {
        if (layoutIndependent) {
          const parts = key.split("-").map((p) => convertKeyToCode(p));
          shortcut = {
            key: parts.join("-"),
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false
          };
        } else {
          shortcut = {
            key: key.toLowerCase(),
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false
          };
        }
      } else {
        const keySplit = key.toLowerCase().split("_").map((k) => k);
        let baseKey = keySplit.filter((k) => !["meta", "command", "ctrl", "shift", "alt", "option"].includes(k)).join("_");
        if (layoutIndependent) {
          baseKey = convertKeyToCode(baseKey);
        }
        shortcut = {
          key: baseKey,
          metaKey: keySplit.includes("meta") || keySplit.includes("command"),
          ctrlKey: keySplit.includes("ctrl"),
          shiftKey: keySplit.includes("shift"),
          altKey: keySplit.includes("alt") || keySplit.includes("option")
        };
      }
      shortcut.chained = chained;
      if (!macOS.value && shortcut.metaKey && !shortcut.ctrlKey) {
        shortcut.metaKey = false;
        shortcut.ctrlKey = true;
      }
      if (typeof shortcutConfig === "function") {
        shortcut.handler = shortcutConfig;
      } else if (typeof shortcutConfig === "object") {
        shortcut = { ...shortcut, handler: shortcutConfig.handler };
      }
      if (!shortcut.handler) {
        console.trace("[Shortcut] Invalid value");
        return null;
      }
      let enabled = true;
      if (!shortcutConfig.usingInput) {
        enabled = !usingInput.value;
      } else if (typeof shortcutConfig.usingInput === "string") {
        enabled = usingInput.value === shortcutConfig.usingInput;
      }
      shortcut.enabled = enabled;
      return shortcut;
    }).filter(Boolean);
  });
  return useEventListener("keydown", onKeyDown);
}
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Ribbon",
  __ssrInlineRender: true,
  async setup(__props) {
    const { apiBase } = useApi();
    const { clear } = useCurrentUser();
    const { collections } = useCollections();
    const { isSidebarOpen } = useDashboard();
    defineShortcuts({
      o: () => isSidebarOpen.value = !isSidebarOpen.value
    });
    async function logout() {
      try {
        const response = await fetch(`${apiBase}/api/auth/sign-out`, {
          method: "POST",
          credentials: "include",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({})
        });
        if (!response.ok) {
          const errorText = await response.text().catch(() => "");
          console.error("Sign-out failed", response.status, errorText);
        }
      } catch (error) {
        console.error("Sign-out failed", error);
      }
      clear();
      await navigateTo("/");
    }
    const collectionLinks = vueExports.computed(
      () => collections.value.map((c) => ({
        label: c.name,
        icon: getCollectionType(c.type)?.icon ?? "i-lucide-database",
        to: `/admin/collections/${c.id}`
      }))
    );
    const topLinks = vueExports.computed(
      () => [
        { label: "General", type: "label" },
        { label: "Page builder", icon: "i-lucide-layout-dashboard", to: "/admin" },
        { label: "Media", icon: "i-lucide-image", to: "/admin/media-gallery" },
        { label: "Collections", type: "label" },
        {
          label: "Manage collections",
          icon: "i-lucide-settings-2",
          to: "/admin/collections"
        },
        ...collectionLinks.value,
        { label: "Site", type: "label" },
        { label: "Site settings", icon: "i-lucide-info", to: "/admin/site-settings" }
        // { label: 'Contact form', icon: 'i-lucide-mail', to: '/admin/contact-form', badge: '4' },
      ]
    );
    const bottomLinks = [
      { label: "Account", icon: "i-lucide-settings", to: "/admin/my-account" },
      { label: "Logout", icon: "i-lucide-log-out", onSelect: () => logout() }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardSidebar = _sfc_main$4;
      const _component_AppLogo = __nuxt_component_1;
      const _component_UDashboardSidebarCollapse = _sfc_main$3;
      const _component_UNavigationMenu = _sfc_main$2;
      const _component_UColorModeButton = _sfc_main$1$1;
      _push(ssrRenderComponent_1(_component_UDashboardSidebar, vueExports.mergeProps({
        id: "admin-sidebar",
        open: vueExports.unref(isSidebarOpen),
        "onUpdate:open": ($event) => vueExports.isRef(isSidebarOpen) ? isSidebarOpen.value = $event : null,
        collapsible: "",
        ui: { header: "border-b border-default" }
      }, _attrs), {
        header: vueExports.withCtx(({ collapsed }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!collapsed) {
              _push2(`<span class="truncate text-sm font-medium flex-1"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_AppLogo, null, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(_component_UDashboardSidebarCollapse, {
              class: collapsed ? "mx-auto" : "ml-auto"
            }, null, _parent2, _scopeId));
          } else {
            return [
              !collapsed ? (vueExports.openBlock(), vueExports.createBlock("span", {
                key: 0,
                class: "truncate text-sm font-medium flex-1"
              }, [
                vueExports.createVNode(_component_AppLogo)
              ])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(_component_UDashboardSidebarCollapse, {
                class: collapsed ? "mx-auto" : "ml-auto"
              }, null, 8, ["class"])
            ];
          }
        }),
        default: vueExports.withCtx(({ collapsed }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UNavigationMenu, {
              collapsed,
              items: vueExports.unref(topLinks),
              orientation: "vertical",
              tooltip: "",
              popover: ""
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt-auto flex flex-col gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UColorModeButton, {
              label: collapsed ? void 0 : "Toggle theme"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UNavigationMenu, {
              collapsed,
              items: bottomLinks,
              orientation: "vertical",
              tooltip: ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode(_component_UNavigationMenu, {
                collapsed,
                items: vueExports.unref(topLinks),
                orientation: "vertical",
                tooltip: "",
                popover: ""
              }, null, 8, ["collapsed", "items"]),
              vueExports.createVNode("div", { class: "mt-auto flex flex-col gap-1" }, [
                vueExports.createVNode(_component_UColorModeButton, {
                  label: collapsed ? void 0 : "Toggle theme"
                }, null, 8, ["label"]),
                vueExports.createVNode(_component_UNavigationMenu, {
                  collapsed,
                  items: bottomLinks,
                  orientation: "vertical",
                  tooltip: ""
                }, null, 8, ["collapsed"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/layout/Ribbon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "AdminLayoutRibbon" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UMain = _sfc_main$6;
  const _component_UDashboardGroup = _sfc_main$5;
  const _component_ClientOnly = __nuxt_component_2$1;
  const _component_AdminLayoutRibbon = __nuxt_component_3;
  _push(ssrRenderComponent_1(_component_UMain, _attrs, {
    default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent_1(_component_UDashboardGroup, null, {
          default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent_1(_component_ClientOnly, null, {}, _parent3, _scopeId2));
              ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
            } else {
              return [
                vueExports.createVNode(_component_ClientOnly, null, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_AdminLayoutRibbon)
                  ]),
                  _: 1
                }),
                vueExports.renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          vueExports.createVNode(_component_UDashboardGroup, null, {
            default: vueExports.withCtx(() => [
              vueExports.createVNode(_component_ClientOnly, null, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_AdminLayoutRibbon)
                ]),
                _: 1
              }),
              vueExports.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          })
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { admin as default };
//# sourceMappingURL=admin-BMgGroFf.mjs.map
