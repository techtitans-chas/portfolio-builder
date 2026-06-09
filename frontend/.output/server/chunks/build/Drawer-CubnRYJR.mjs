import { a3 as tryOnBeforeUnmount, q as createSharedComposable, a6 as unrefElement, r as defaultWindow, aB as useVModel, X as onKeyStroke, o as createGlobalState, ao as useMounted, ac as useComponentProps, a8 as useAppConfig, ak as useForwardProps$1, $ as reactivePick, aq as usePortal, a5 as tv, F as FieldGroupReset, V as VisuallyHidden_default } from './server.mjs';
import { o as vueExports, v as vue, m as ssrRenderVNode, f as ssrRenderComponent_1, i as ssrRenderSlot_1, a as ssrInterpolate_1, e as ssrRenderClass_1 } from '../routes/renderer.mjs';
import { i as es5, p as pointerDownOutside } from './overlay-BWwBD9XH.mjs';

//#region src/shared/createContext.ts
/**
* @param providerComponentName - The name(s) of the component(s) providing the context.
*
* There are situations where context can come from multiple components. In such cases, you might need to give an array of component names to provide your context, instead of just a single string.
*
* @param contextName The description for injection key symbol.
*/
function createContext(providerComponentName, contextName) {
	const symbolDescription = typeof providerComponentName === "string" && !contextName ? `${providerComponentName}Context` : contextName;
	const injectionKey = Symbol(symbolDescription);
	/**
	* @param fallback The context value to return if the injection fails.
	*
	* @throws When context injection failed and no fallback is specified.
	* This happens when the component injecting the context is not a child of the root component providing the context.
	*/
	const injectContext = (fallback) => {
		const context = vueExports.inject(injectionKey, fallback);
		if (context) return context;
		if (context === null) return context;
		throw new Error(`Injection \`${injectionKey.toString()}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(", ")}` : `\`${providerComponentName}\``}`);
	};
	const provideContext = (contextValue) => {
		vueExports.provide(injectionKey, contextValue);
		return contextValue;
	};
	return [injectContext, provideContext];
}

//#region src/shared/getActiveElement.ts
function getActiveElement() {
	let activeElement = document.activeElement;
	if (activeElement == null) return null;
	while (activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null) activeElement = activeElement.shadowRoot.activeElement;
	return activeElement;
}

//#region src/shared/nullish.ts
function isNullish(value) {
	return value === null || value === void 0;
}

//#region src/shared/renderSlotFragments.ts
function renderSlotFragments(children) {
	if (!children) return [];
	return children.flatMap((child) => {
		if (child.type === vueExports.Fragment) return renderSlotFragments(child.children);
		return [child];
	});
}

//#region src/ConfigProvider/ConfigProvider.vue?vue&type=script&setup=true&lang.ts
const [injectConfigProviderContext] = /*#__PURE__*/ createContext("ConfigProvider");

//#region src/shared/useBodyScrollLock.ts
const useBodyLockStackCount = createSharedComposable(() => {
	const map = vueExports.ref(/* @__PURE__ */ new Map());
	vueExports.ref();
	const locked = vueExports.computed(() => {
		for (const value of map.value.values()) if (value) return true;
		return false;
	});
	injectConfigProviderContext({ scrollBody: vueExports.ref(true) });
	vueExports.watch(locked, (val, oldVal) => {
		return;
	}, {
		immediate: true,
		flush: "sync"
	});
	return map;
});
function useBodyScrollLock(initialState) {
	const id = Math.random().toString(36).substring(2, 7);
	const map = useBodyLockStackCount();
	map.value.set(id, initialState);
	const locked = vueExports.computed({
		get: () => map.value.get(id) ?? false,
		set: (value) => map.value.set(id, value)
	});
	tryOnBeforeUnmount(() => {
		map.value.delete(id);
	});
	return locked;
}

//#region src/shared/useEmitAsProps.ts
/**
* The `useEmitAsProps` function is a TypeScript utility that converts emitted events into props for a
* Vue component.
* @param emit - The `emit` parameter is a function that is used to emit events from a component. It
* takes two parameters: `name` which is the name of the event to be emitted, and `...args` which are
* the arguments to be passed along with the event.
* @returns The function `useEmitAsProps` returns an object that maps event names to functions that
* call the `emit` function with the corresponding event name and arguments.
*/
function useEmitAsProps(emit) {
	const vm = vueExports.getCurrentInstance();
	const events = vm?.type.emits;
	const result = {};
	if (!events?.length) console.warn(`No emitted event found. Please check component: ${vm?.type.__name}`);
	events?.forEach((ev) => {
		result[vueExports.toHandlerKey(vueExports.camelize(ev))] = (...arg) => emit(ev, ...arg);
	});
	return result;
}

//#region src/shared/useForwardExpose.ts
function useForwardExpose() {
	const instance = vueExports.getCurrentInstance();
	const currentRef = vueExports.ref();
	const currentElement = vueExports.computed(() => resolveCurrentElement());
	vueExports.onUpdated(() => {
		if (currentElement.value !== resolveCurrentElement()) vueExports.triggerRef(currentRef);
	});
	function resolveCurrentElement() {
		return currentRef.value && "$el" in currentRef.value && ["#text", "#comment"].includes(currentRef.value.$el.nodeName) ? currentRef.value.$el.nextElementSibling : unrefElement(currentRef);
	}
	const localExpose = Object.assign({}, instance.exposed);
	const ret = {};
	for (const key in instance.props) Object.defineProperty(ret, key, {
		enumerable: true,
		configurable: true,
		get: () => instance.props[key]
	});
	if (Object.keys(localExpose).length > 0) for (const key in localExpose) Object.defineProperty(ret, key, {
		enumerable: true,
		configurable: true,
		get: () => localExpose[key]
	});
	Object.defineProperty(ret, "$el", {
		enumerable: true,
		configurable: true,
		get: () => instance.vnode.el
	});
	instance.exposed = ret;
	function forwardRef(ref$1) {
		currentRef.value = ref$1;
		if (!ref$1) return;
		Object.defineProperty(ret, "$el", {
			enumerable: true,
			configurable: true,
			get: () => ref$1 instanceof Element ? ref$1 : ref$1.$el
		});
		if (!(ref$1 instanceof Element) && !Object.hasOwn(ref$1, "$el")) {
			const childExposed = ref$1.$.exposed;
			const merged = Object.assign({}, ret);
			for (const key in childExposed) Object.defineProperty(merged, key, {
				enumerable: true,
				configurable: true,
				get: () => childExposed[key]
			});
			instance.exposed = merged;
		}
	}
	return {
		forwardRef,
		currentRef,
		currentElement
	};
}

//#region src/shared/useForwardProps.ts
/**
* The `useForwardProps` function in TypeScript takes in a set of props and returns a computed value
* that combines default props with assigned props from the current instance.
* @param {T} props - The `props` parameter is an object that represents the props passed to a
* component.
* @returns computed value that combines the default props, preserved props, and assigned props.
*/
function useForwardProps(props) {
	const vm = vueExports.getCurrentInstance();
	const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
		const defaultValue = (vm?.type.props[curr]).default;
		if (defaultValue !== void 0) prev[curr] = defaultValue;
		return prev;
	}, {});
	const refProps = vueExports.toRef(props);
	return vueExports.computed(() => {
		const preservedProps = {};
		const assignedProps = vm?.vnode.props ?? {};
		Object.keys(assignedProps).forEach((key) => {
			preservedProps[vueExports.camelize(key)] = assignedProps[key];
		});
		return Object.keys({
			...defaultProps,
			...preservedProps
		}).reduce((prev, curr) => {
			if (refProps.value[curr] !== void 0) prev[curr] = refProps.value[curr];
			return prev;
		}, {});
	});
}

//#region src/shared/useForwardPropsEmits.ts
/**
* The function `useForwardPropsEmits` takes in props and an optional emit function, and returns a
* computed object that combines the parsed props and emits as props.
* @param {T} props - The `props` parameter is of type `T`, which is a generic type that extends the
* parameters of the `useForwardProps` function. It represents the props object that is passed to the
* `useForwardProps` function.
* @param [emit] - The `emit` parameter is a function that can be used to emit events. It takes two
* arguments: `name`, which is the name of the event to be emitted, and `args`, which are the arguments
* to be passed along with the event.
* @returns a computed property that combines the parsed
* props and emits as props.
*/
function useForwardPropsEmits(props, emit) {
	const parsedProps = useForwardProps(props);
	const emitsAsProps = emit ? useEmitAsProps(emit) : {};
	return vueExports.computed(() => ({
		...parsedProps.value,
		...emitsAsProps
	}));
}

//#region src/shared/useHideOthers.ts
/**
* The `useHideOthers` function is a TypeScript function that takes a target element reference and
* hides all other elements in ARIA when the target element is present, and restores the visibility of the
* hidden elements when the target element is removed.
* @param {MaybeElementRef} target - The `target` parameter is a reference to the element that you want
* to hide other elements when it is clicked or focused.
*/
function useHideOthers(target) {
	let undo;
	vueExports.watch(() => unrefElement(target), (el) => {
		let isInsideClosedPopover = false;
		try {
			isInsideClosedPopover = !!el?.closest("[popover]:not(:popover-open)");
		} catch {}
		if (el && !isInsideClosedPopover) undo = es5.hideOthers(el);
		else if (undo) undo();
	});
	vueExports.onUnmounted(() => {
		if (undo) undo();
	});
}

//#region src/shared/useId.ts
let count = 0;
/**
* The `useId` function generates a unique identifier using a provided deterministic ID or a default
* one prefixed with "reka-", or the provided one via `useId` props from `<ConfigProvider>`.
* @param {string | null | undefined} [deterministicId] - The `useId` function you provided takes an
* optional parameter `deterministicId`, which can be a string, null, or undefined. If
* `deterministicId` is provided, the function will return it. Otherwise, it will generate an id using
* the `useId` function obtained
*/
function useId(deterministicId, prefix = "reka") {
	let id;
	if ("useId" in vue) id = vueExports.useId?.();
	else {
		const configProviderContext = injectConfigProviderContext({ useId: void 0 });
		id = configProviderContext.useId?.() ?? `${++count}`;
	}
	return prefix ? `${prefix}-${id}` : id;
}

//#region src/shared/useStateMachine.ts
/**
* The `useStateMachine` function is a TypeScript function that creates a state machine and returns the
* current state and a dispatch function to update the state based on events.
* @param initialState - The `initialState` parameter is the initial state of the state machine. It
* represents the starting point of the state machine's state.
* @param machine - The `machine` parameter is an object that represents a state machine. It should
* have keys that correspond to the possible states of the machine, and the values should be objects
* that represent the possible events and their corresponding next states.
* @returns The `useStateMachine` function returns an object with two properties: `state` and
* `dispatch`.
*/
function useStateMachine(initialState, machine) {
	const state = vueExports.ref(initialState);
	function reducer(event) {
		const nextState = machine[state.value][event];
		return nextState ?? state.value;
	}
	const dispatch = (event) => {
		state.value = reducer(event);
	};
	return {
		state,
		dispatch
	};
}

//#region src/Presence/usePresence.ts
function usePresence(present, node) {
	const stylesRef = vueExports.ref({});
	const prevAnimationNameRef = vueExports.ref("none");
	const prevPresentRef = vueExports.ref(present);
	const initialState = present.value ? "mounted" : "unmounted";
	let timeoutId;
	const ownerWindow = node.value?.ownerDocument.defaultView ?? defaultWindow;
	const { state, dispatch } = useStateMachine(initialState, {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	vueExports.watch(present, async (currentPresent, prevPresent) => {
		const hasPresentChanged = prevPresent !== currentPresent;
		await vueExports.nextTick();
		if (hasPresentChanged) {
			const prevAnimationName = prevAnimationNameRef.value;
			const currentAnimationName = getAnimationName(node.value);
			if (currentPresent) {
				dispatch("MOUNT");
			} else if (currentAnimationName === "none" || currentAnimationName === "undefined" || stylesRef.value?.display === "none") {
				dispatch("UNMOUNT");
			} else {
				/**
				* When `present` changes to `false`, we check changes to animation-name to
				* determine whether an animation has started. We chose this approach (reading
				* computed styles) because there is no `animationrun` event and `animationstart`
				* fires after `animation-delay` has expired which would be too late.
				*/
				const isAnimating = prevAnimationName !== currentAnimationName;
				if (prevPresent && isAnimating) {
					dispatch("ANIMATION_OUT");
				} else {
					dispatch("UNMOUNT");
				}
			}
		}
	}, { immediate: true });
	/**
	* Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
	* event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
	* make sure we only trigger ANIMATION_END for the currently active animation.
	*/
	const handleAnimationEnd = (event) => {
		const currentAnimationName = getAnimationName(node.value);
		const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
		state.value === "mounted" ? "enter" : "leave";
		if (event.target === node.value && isCurrentAnimation) {
			dispatch("ANIMATION_END");
			if (!prevPresentRef.value) {
				const currentFillMode = node.value.style.animationFillMode;
				node.value.style.animationFillMode = "forwards";
				timeoutId = ownerWindow?.setTimeout(() => {
					if (node.value?.style.animationFillMode === "forwards") node.value.style.animationFillMode = currentFillMode;
				});
			}
		}
		if (event.target === node.value && currentAnimationName === "none") dispatch("ANIMATION_END");
	};
	const handleAnimationStart = (event) => {
		if (event.target === node.value) prevAnimationNameRef.value = getAnimationName(node.value);
	};
	const watcher = vueExports.watch(node, (newNode, oldNode) => {
		if (newNode) {
			stylesRef.value = getComputedStyle(newNode);
			newNode.addEventListener("animationstart", handleAnimationStart);
			newNode.addEventListener("animationcancel", handleAnimationEnd);
			newNode.addEventListener("animationend", handleAnimationEnd);
		} else {
			dispatch("ANIMATION_END");
			if (timeoutId !== void 0) ownerWindow?.clearTimeout(timeoutId);
			oldNode?.removeEventListener("animationstart", handleAnimationStart);
			oldNode?.removeEventListener("animationcancel", handleAnimationEnd);
			oldNode?.removeEventListener("animationend", handleAnimationEnd);
		}
	}, { immediate: true });
	const stateWatcher = vueExports.watch(state, () => {
		const currentAnimationName = getAnimationName(node.value);
		prevAnimationNameRef.value = state.value === "mounted" ? currentAnimationName : "none";
	});
	vueExports.onUnmounted(() => {
		watcher();
		stateWatcher();
	});
	const isPresent = vueExports.computed(() => ["mounted", "unmountSuspended"].includes(state.value));
	return { isPresent };
}
function getAnimationName(node) {
	return node ? getComputedStyle(node).animationName || "none" : "none";
}

//#region src/Presence/Presence.ts
var Presence_default = /*#__PURE__*/ vueExports.defineComponent({
	name: "Presence",
	props: {
		present: {
			type: Boolean,
			required: true
		},
		forceMount: { type: Boolean }
	},
	slots: {},
	setup(props, { slots, expose }) {
		const { present, forceMount } = vueExports.toRefs(props);
		const node = vueExports.ref();
		const { isPresent } = usePresence(present, node);
		expose({ present: isPresent });
		let children = slots.default({ present: isPresent.value });
		children = renderSlotFragments(children || []);
		const instance = vueExports.getCurrentInstance();
		if (children && children?.length > 1) {
			const componentName = instance?.parent?.type.name ? `<${instance.parent.type.name} />` : "component";
			throw new Error([
				`Detected an invalid children for \`${componentName}\` for  \`Presence\` component.`,
				"",
				"Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
				"You can apply a few solutions:",
				["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((line) => `  - ${line}`).join("\n")
			].join("\n"));
		}
		return () => {
			if (forceMount.value || present.value || isPresent.value) return vueExports.h(slots.default({ present: isPresent.value })[0], { ref: (v) => {
				const el = unrefElement(v);
				if (typeof el?.hasAttribute === "undefined") return el;
				if (el?.hasAttribute("data-reka-popper-content-wrapper")) node.value = el.firstElementChild;
				else node.value = el;
				return el;
			} });
			else return null;
		};
	}
});

//#region src/Primitive/Slot.ts
const Slot = /*#__PURE__*/ vueExports.defineComponent({
	name: "PrimitiveSlot",
	inheritAttrs: false,
	setup(_, { attrs, slots }) {
		return () => {
			if (!slots.default) return null;
			const children = renderSlotFragments(slots.default());
			const firstNonCommentChildrenIndex = children.findIndex((child) => child.type !== vueExports.Comment);
			if (firstNonCommentChildrenIndex === -1) return children;
			const firstNonCommentChildren = children[firstNonCommentChildrenIndex];
			delete firstNonCommentChildren.props?.ref;
			const mergedProps = firstNonCommentChildren.props ? vueExports.mergeProps(attrs, firstNonCommentChildren.props) : attrs;
			const cloned = vueExports.cloneVNode({
				...firstNonCommentChildren,
				props: {}
			}, mergedProps);
			if (children.length === 1) return cloned;
			children[firstNonCommentChildrenIndex] = cloned;
			return children;
		};
	}
});

//#region src/Primitive/Primitive.ts
const SELF_CLOSING_TAGS = [
	"area",
	"img",
	"input"
];
const Primitive = /*#__PURE__*/ vueExports.defineComponent({
	name: "Primitive",
	inheritAttrs: false,
	props: {
		asChild: {
			type: Boolean,
			default: false
		},
		as: {
			type: [String, Object],
			default: "div"
		}
	},
	setup(props, { attrs, slots }) {
		const asTag = props.asChild ? "template" : props.as;
		if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag)) return () => vueExports.h(asTag, attrs);
		if (asTag !== "template") return () => vueExports.h(props.as, attrs, { default: slots.default });
		return () => vueExports.h(Slot, attrs, { default: slots.default });
	}
});

//#region src/Dialog/DialogRoot.vue?vue&type=script&setup=true&lang.ts
const [injectDialogRootContext, provideDialogRootContext] = /*#__PURE__*/ createContext("DialogRoot");
var DialogRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	inheritAttrs: false,
	__name: "DialogRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = vueExports.ref();
		const contentElement = vueExports.ref();
		const { modal } = vueExports.toRefs(props);
		provideDialogRootContext({
			open,
			modal,
			openModal: () => {
				open.value = true;
			},
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			contentId: "",
			titleId: "",
			descriptionId: "",
			triggerElement,
			contentElement
		});
		return (_ctx, _cache) => {
			return vueExports.renderSlot(_ctx.$slots, "default", {
				open: vueExports.unref(open),
				close: () => open.value = false
			});
		};
	}
});

//#endregion
//#region src/Dialog/DialogRoot.vue
var DialogRoot_default = DialogRoot_vue_vue_type_script_setup_true_lang_default;

/**
* Listens for `pointerdown` outside a DOM subtree. We use `pointerdown` rather than `pointerup`
* to mimic layer dismissing behaviour present in OS.
* Returns props to pass to the node we want to check for outside events.
*/
function usePointerDownOutside(onPointerDownOutside, element, enabled = true) {
	element?.value?.ownerDocument ?? globalThis?.document;
	const isPointerInsideDOMTree = vueExports.ref(false);
	vueExports.ref(() => {});
	vueExports.watchEffect((cleanupFn) => {
		return;
	});
	return { onPointerDownCapture: () => {
		if (!vueExports.toValue(enabled)) return;
		isPointerInsideDOMTree.value = true;
	} };
}
/**
* Listens for when focus happens outside a DOM subtree.
* Returns props to pass to the root (node) of the subtree we want to check.
*/
function useFocusOutside(onFocusOutside, element, enabled = true) {
	element?.value?.ownerDocument ?? globalThis?.document;
	const isFocusInsideDOMTree = vueExports.ref(false);
	vueExports.watchEffect((cleanupFn) => {
		return;
	});
	return {
		onFocusCapture: () => {
			if (!vueExports.toValue(enabled)) return;
			isFocusInsideDOMTree.value = true;
		},
		onBlurCapture: () => {
			if (!vueExports.toValue(enabled)) return;
			isFocusInsideDOMTree.value = false;
		}
	};
}

//#region src/DismissableLayer/DismissableLayer.vue?vue&type=script&setup=true&lang.ts
const context = /*#__PURE__*/ vueExports.reactive({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
});
var DismissableLayer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DismissableLayer",
	props: {
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false,
			default: false
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
		"interactOutside",
		"dismiss"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement: layerElement } = useForwardExpose();
		const ownerDocument = vueExports.computed(() => layerElement.value?.ownerDocument ?? globalThis.document);
		const layers = vueExports.computed(() => context.layersRoot);
		const index = vueExports.computed(() => {
			return layerElement.value ? Array.from(layers.value).indexOf(layerElement.value) : -1;
		});
		const isBodyPointerEventsDisabled = vueExports.computed(() => {
			return context.layersWithOutsidePointerEventsDisabled.size > 0;
		});
		const isPointerEventsEnabled = vueExports.computed(() => {
			const localLayers = Array.from(layers.value);
			const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
			const highestLayerWithOutsidePointerEventsDisabledIndex = localLayers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
			return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex;
		});
		const pointerDownOutside = usePointerDownOutside(async (event) => {
			const isPointerDownOnBranch = [...context.branches].some((branch) => branch?.contains(event.target));
			if (!isPointerEventsEnabled.value || isPointerDownOnBranch) return;
			emits("pointerDownOutside", event);
			emits("interactOutside", event);
			await vueExports.nextTick();
			if (!event.defaultPrevented) emits("dismiss");
		}, layerElement);
		const focusOutside = useFocusOutside((event) => {
			const isFocusInBranch = [...context.branches].some((branch) => branch?.contains(event.target));
			if (isFocusInBranch) return;
			emits("focusOutside", event);
			emits("interactOutside", event);
			if (!event.defaultPrevented) emits("dismiss");
		}, layerElement);
		onKeyStroke("Escape", (event) => {
			const isHighestLayer = index.value === layers.value.size - 1;
			if (!isHighestLayer) return;
			emits("escapeKeyDown", event);
			if (!event.defaultPrevented) emits("dismiss");
		});
		vueExports.watchEffect((cleanupFn) => {
			if (!layerElement.value) return;
			if (props.disableOutsidePointerEvents) {
				if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
					context.originalBodyPointerEvents = ownerDocument.value.body.style.pointerEvents;
					ownerDocument.value.body.style.pointerEvents = "none";
				}
				context.layersWithOutsidePointerEventsDisabled.add(layerElement.value);
			}
			layers.value.add(layerElement.value);
			cleanupFn(() => {
				if (props.disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1 && !isNullish(context.originalBodyPointerEvents)) ownerDocument.value.body.style.pointerEvents = context.originalBodyPointerEvents;
			});
		});
		vueExports.watchEffect((cleanupFn) => {
			cleanupFn(() => {
				if (!layerElement.value) return;
				layers.value.delete(layerElement.value);
				context.layersWithOutsidePointerEventsDisabled.delete(layerElement.value);
			});
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				ref: vueExports.unref(forwardRef),
				"as-child": _ctx.asChild,
				as: _ctx.as,
				"data-dismissable-layer": "",
				style: vueExports.normalizeStyle({ pointerEvents: isBodyPointerEventsDisabled.value ? isPointerEventsEnabled.value ? "auto" : "none" : void 0 }),
				onFocusCapture: vueExports.unref(focusOutside).onFocusCapture,
				onBlurCapture: vueExports.unref(focusOutside).onBlurCapture,
				onPointerdownCapture: vueExports.unref(pointerDownOutside).onPointerDownCapture
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"as",
				"style",
				"onFocusCapture",
				"onBlurCapture",
				"onPointerdownCapture"
			]);
		};
	}
});

//#endregion
//#region src/DismissableLayer/DismissableLayer.vue
var DismissableLayer_default = DismissableLayer_vue_vue_type_script_setup_true_lang_default;

//#region src/FocusScope/stack.ts
const useFocusStackState = createGlobalState(() => {
	const stack = vueExports.ref([]);
	return stack;
});
function createFocusScopesStack() {
	/** A stack of focus scopes, with the active one at the top */
	const stack = useFocusStackState();
	return {
		add(focusScope) {
			const activeFocusScope = stack.value[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value.unshift(focusScope);
		},
		remove(focusScope) {
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value[0]?.resume();
		}
	};
}
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}

//#region src/FocusScope/utils.ts
const AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
const AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
const EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
/**
* Attempts focusing the first element in a list of candidates.
* Stops when focus has actually moved.
*/
function focusFirst(candidates, { select = false } = {}) {
	const previouslyFocusedElement = getActiveElement();
	for (const candidate of candidates) {
		focus(candidate, { select });
		if (getActiveElement() !== previouslyFocusedElement) return true;
	}
}
/**
* Returns the first and last tabbable elements inside a container.
*/
function getTabbableEdges(container) {
	const candidates = getTabbableCandidates(container);
	const first = findVisible(candidates, container);
	const last = findVisible(candidates.reverse(), container);
	return [first, last];
}
/**
* Returns a list of potential tabbable candidates.
*
* NOTE: This is only a close approximation. For example it doesn't take into account cases like when
* elements are not visible. This cannot be worked out easily by just reading a property, but rather
* necessitate runtime knowledge (computed styles, etc). We deal with these cases separately.
*
* See: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
* Credit: https://github.com/discord/focus-layers/blob/master/src/util/wrapFocus.tsx#L1
*/
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
		const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
		if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
/**
* Returns the first visible element in a list.
* NOTE: Only checks visibility up to the `container`.
*/
function findVisible(elements, container) {
	for (const element of elements) if (!isHidden(element, { upTo: container })) return element;
}
function isHidden(node, { upTo }) {
	if (getComputedStyle(node).visibility === "hidden") return true;
	while (node) {
		if (upTo !== void 0 && node === upTo) return false;
		if (getComputedStyle(node).display === "none") return true;
		node = node.parentElement;
	}
	return false;
}
function isSelectableInput(element) {
	return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
	if (element && element.focus) {
		const previouslyFocusedElement = getActiveElement();
		element.focus({ preventScroll: true });
		if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
	}
}

//#region src/FocusScope/FocusScope.vue?vue&type=script&setup=true&lang.ts
var FocusScope_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "FocusScope",
	props: {
		loop: {
			type: Boolean,
			required: false,
			default: false
		},
		trapped: {
			type: Boolean,
			required: false,
			default: false
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
	emits: ["mountAutoFocus", "unmountAutoFocus"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { currentRef, currentElement } = useForwardExpose();
		vueExports.ref(null);
		const focusScopesStack = createFocusScopesStack();
		const focusScope = /*#__PURE__*/ vueExports.reactive({
			paused: false,
			pause() {
				this.paused = true;
			},
			resume() {
				this.paused = false;
			}
		});
		vueExports.watchEffect((cleanupFn) => {
			return;
		});
		vueExports.watchEffect(async (cleanupFn) => {
			const container = currentElement.value;
			await vueExports.nextTick();
			if (!container) return;
			focusScopesStack.add(focusScope);
			const previouslyFocusedElement = getActiveElement();
			const hasFocusedCandidate = container.contains(previouslyFocusedElement);
			if (!hasFocusedCandidate) {
				const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
				container.addEventListener(AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
				container.dispatchEvent(mountEvent);
				if (!mountEvent.defaultPrevented) {
					focusFirst(getTabbableCandidates(container), { select: true });
					if (getActiveElement() === previouslyFocusedElement) focus(container);
				}
			}
			cleanupFn(() => {
				container.removeEventListener(AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
				const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
				const unmountEventHandler = (ev) => {
					emits("unmountAutoFocus", ev);
				};
				container.addEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
				container.dispatchEvent(unmountEvent);
				setTimeout(() => {
					if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });
					container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
					focusScopesStack.remove(focusScope);
				}, 0);
			});
		});
		function handleKeyDown(event) {
			if (!props.loop && !props.trapped) return;
			if (focusScope.paused) return;
			const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
			const focusedElement = getActiveElement();
			if (isTabKey && focusedElement) {
				const container = event.currentTarget;
				const [first, last] = getTabbableEdges(container);
				const hasTabbableElementsInside = first && last;
				if (!hasTabbableElementsInside) {
					if (focusedElement === container) event.preventDefault();
				} else if (!event.shiftKey && focusedElement === last) {
					event.preventDefault();
					if (props.loop) focus(first, { select: true });
				} else if (event.shiftKey && focusedElement === first) {
					event.preventDefault();
					if (props.loop) focus(last, { select: true });
				}
			}
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				ref_key: "currentRef",
				ref: currentRef,
				tabindex: "-1",
				"as-child": _ctx.asChild,
				as: _ctx.as,
				onKeydown: handleKeyDown
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as-child", "as"]);
		};
	}
});

//#endregion
//#region src/FocusScope/FocusScope.vue
var FocusScope_default = FocusScope_vue_vue_type_script_setup_true_lang_default;

function getOpenState(open) {
	return open ? "open" : "closed";
}

//#region src/Dialog/DialogContentImpl.vue?vue&type=script&setup=true&lang.ts
var DialogContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DialogContentImpl",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		trapFocus: {
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
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectDialogRootContext();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		rootContext.titleId ||= useId(void 0, "reka-dialog-title");
		rootContext.descriptionId ||= useId(void 0, "reka-dialog-description");
		vueExports.onMounted(() => {
			rootContext.contentElement = contentElement;
			if (getActiveElement() !== document.body) rootContext.triggerElement.value = getActiveElement();
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(FocusScope_default), {
				"as-child": "",
				loop: "",
				trapped: props.trapFocus,
				onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
				onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(DismissableLayer_default), vueExports.mergeProps({
					id: vueExports.unref(rootContext).contentId,
					ref: vueExports.unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
					role: "dialog",
					"aria-describedby": vueExports.unref(rootContext).descriptionId,
					"aria-labelledby": vueExports.unref(rootContext).titleId,
					"data-state": vueExports.unref(getOpenState)(vueExports.unref(rootContext).open.value)
				}, _ctx.$attrs, {
					onDismiss: _cache[0] || (_cache[0] = ($event) => vueExports.unref(rootContext).onOpenChange(false)),
					onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
					onFocusOutside: _cache[2] || (_cache[2] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[3] || (_cache[3] = ($event) => emits("interactOutside", $event)),
					onPointerDownOutside: _cache[4] || (_cache[4] = ($event) => emits("pointerDownOutside", $event))
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"as",
					"as-child",
					"disable-outside-pointer-events",
					"aria-describedby",
					"aria-labelledby",
					"data-state"
				])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});

//#endregion
//#region src/Dialog/DialogContentImpl.vue
var DialogContentImpl_default = DialogContentImpl_vue_vue_type_script_setup_true_lang_default;

//#region src/Dialog/DialogContentModal.vue?vue&type=script&setup=true&lang.ts
var DialogContentModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DialogContentModal",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		trapFocus: {
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
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectDialogRootContext();
		const emitsAsProps = useEmitAsProps(emits);
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(DialogContentImpl_default, vueExports.mergeProps({
				...props,
				...vueExports.unref(emitsAsProps)
			}, {
				ref: vueExports.unref(forwardRef),
				"trap-focus": vueExports.unref(rootContext).open.value,
				"disable-outside-pointer-events": true,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					if (!event.defaultPrevented) {
						event.preventDefault();
						vueExports.unref(rootContext).triggerElement.value?.focus();
					}
				}),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					if (isRightClick) event.preventDefault();
				}),
				onFocusOutside: _cache[2] || (_cache[2] = (event) => {
					event.preventDefault();
				})
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]);
		};
	}
});

//#endregion
//#region src/Dialog/DialogContentModal.vue
var DialogContentModal_default = DialogContentModal_vue_vue_type_script_setup_true_lang_default;

//#region src/Dialog/DialogContentNonModal.vue?vue&type=script&setup=true&lang.ts
var DialogContentNonModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DialogContentNonModal",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		trapFocus: {
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
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const emitsAsProps = useEmitAsProps(emits);
		useForwardExpose();
		const rootContext = injectDialogRootContext();
		const hasInteractedOutsideRef = vueExports.ref(false);
		const hasPointerDownOutsideRef = vueExports.ref(false);
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(DialogContentImpl_default, vueExports.mergeProps({
				...props,
				...vueExports.unref(emitsAsProps)
			}, {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					if (!event.defaultPrevented) {
						if (!hasInteractedOutsideRef.value) vueExports.unref(rootContext).triggerElement.value?.focus();
						event.preventDefault();
					}
					hasInteractedOutsideRef.value = false;
					hasPointerDownOutsideRef.value = false;
				}),
				onInteractOutside: _cache[1] || (_cache[1] = (event) => {
					if (!event.defaultPrevented) {
						hasInteractedOutsideRef.value = true;
						if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.value = true;
					}
					const target = event.target;
					const targetIsTrigger = vueExports.unref(rootContext).triggerElement.value?.contains(target);
					if (targetIsTrigger) event.preventDefault();
					if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) event.preventDefault();
				})
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Dialog/DialogContentNonModal.vue
var DialogContentNonModal_default = DialogContentNonModal_vue_vue_type_script_setup_true_lang_default;

//#region src/Dialog/DialogContent.vue?vue&type=script&setup=true&lang.ts
var DialogContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DialogContent",
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
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectDialogRootContext();
		const emitsAsProps = useEmitAsProps(emits);
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(rootContext).open.value }, {
				default: vueExports.withCtx(() => [vueExports.unref(rootContext).modal.value ? (vueExports.openBlock(), vueExports.createBlock(DialogContentModal_default, vueExports.mergeProps({
					key: 0,
					ref: vueExports.unref(forwardRef)
				}, {
					...props,
					...vueExports.unref(emitsAsProps),
					..._ctx.$attrs
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (vueExports.openBlock(), vueExports.createBlock(DialogContentNonModal_default, vueExports.mergeProps({
					key: 1,
					ref: vueExports.unref(forwardRef)
				}, {
					...props,
					...vueExports.unref(emitsAsProps),
					..._ctx.$attrs
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});

//#endregion
//#region src/Dialog/DialogContent.vue
var DialogContent_default = DialogContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Dialog/DialogDescription.vue?vue&type=script&setup=true&lang.ts
var DialogDescription_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DialogDescription",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "p"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectDialogRootContext();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { id: vueExports.unref(rootContext).descriptionId }), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});

//#endregion
//#region src/Dialog/DialogDescription.vue
var DialogDescription_default = DialogDescription_vue_vue_type_script_setup_true_lang_default;

//#region src/Dialog/DialogOverlayImpl.vue?vue&type=script&setup=true&lang.ts
var DialogOverlayImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DialogOverlayImpl",
	props: {
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
		const rootContext = injectDialogRootContext();
		useBodyScrollLock(true);
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
				style: { "pointer-events": "auto" }
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-state"
			]);
		};
	}
});

//#endregion
//#region src/Dialog/DialogOverlayImpl.vue
var DialogOverlayImpl_default = DialogOverlayImpl_vue_vue_type_script_setup_true_lang_default;

//#region src/Dialog/DialogOverlay.vue?vue&type=script&setup=true&lang.ts
var DialogOverlay_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DialogOverlay",
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
		const rootContext = injectDialogRootContext();
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.unref(rootContext)?.modal.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), {
				key: 0,
				present: _ctx.forceMount || vueExports.unref(rootContext).open.value
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(DialogOverlayImpl_default, vueExports.mergeProps(_ctx.$attrs, {
					ref: vueExports.unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, ["as", "as-child"])]),
				_: 3
			}, 8, ["present"])) : vueExports.createCommentVNode("v-if", true);
		};
	}
});

//#endregion
//#region src/Dialog/DialogOverlay.vue
var DialogOverlay_default = DialogOverlay_vue_vue_type_script_setup_true_lang_default;

//#region src/Teleport/Teleport.vue?vue&type=script&setup=true&lang.ts
var Teleport_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "Teleport",
	props: {
		to: {
			type: null,
			required: false,
			default: "body"
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const isMounted = useMounted();
		return (_ctx, _cache) => {
			return vueExports.unref(isMounted) || _ctx.forceMount ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Teleport, {
				key: 0,
				to: _ctx.to,
				disabled: _ctx.disabled,
				defer: _ctx.defer
			}, [vueExports.renderSlot(_ctx.$slots, "default")], 8, [
				"to",
				"disabled",
				"defer"
			])) : vueExports.createCommentVNode("v-if", true);
		};
	}
});

//#endregion
//#region src/Teleport/Teleport.vue
var Teleport_default = Teleport_vue_vue_type_script_setup_true_lang_default;

//#region src/Dialog/DialogPortal.vue?vue&type=script&setup=true&lang.ts
var DialogPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DialogPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Teleport_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Dialog/DialogPortal.vue
var DialogPortal_default = DialogPortal_vue_vue_type_script_setup_true_lang_default;

//#region src/Dialog/DialogTitle.vue?vue&type=script&setup=true&lang.ts
var DialogTitle_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DialogTitle",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "h2"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectDialogRootContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { id: vueExports.unref(rootContext).titleId }), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});

//#endregion
//#region src/Dialog/DialogTitle.vue
var DialogTitle_default = DialogTitle_vue_vue_type_script_setup_true_lang_default;

//#region src/Dialog/DialogTrigger.vue?vue&type=script&setup=true&lang.ts
var DialogTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DialogTrigger",
	props: {
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
		const rootContext = injectDialogRootContext();
		const { forwardRef, currentElement } = useForwardExpose();
		rootContext.contentId ||= useId(void 0, "reka-dialog-content");
		vueExports.onMounted(() => {
			rootContext.triggerElement.value = currentElement.value;
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, {
				ref: vueExports.unref(forwardRef),
				type: _ctx.as === "button" ? "button" : void 0,
				"aria-haspopup": "dialog",
				"aria-expanded": vueExports.unref(rootContext).open.value || false,
				"aria-controls": vueExports.unref(rootContext).open.value ? vueExports.unref(rootContext).contentId : void 0,
				"data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
				onClick: vueExports.unref(rootContext).onOpenToggle
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"type",
				"aria-expanded",
				"aria-controls",
				"data-state",
				"onClick"
			]);
		};
	}
});

//#endregion
//#region src/Dialog/DialogTrigger.vue
var DialogTrigger_default = DialogTrigger_vue_vue_type_script_setup_true_lang_default;

(function(){var t;try{if(typeof document<"u"){var a=document.createElement("style");a.nonce=(t=document.head.querySelector("meta[property=csp-nonce]"))==null?void 0:t.content,a.appendChild(document.createTextNode('[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32,.72,0,1);animation-duration:.5s;animation-timing-function:cubic-bezier(.32,.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform, 100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform, 100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform, 100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform, 100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top],[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height, 0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left],[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height, 0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(.32,.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32,.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true]):after{content:"";position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]:after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]:after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]:after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]:after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not([data-state=closed]){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:hover,[data-vaul-handle]:active{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover: hover) and (pointer: fine){[data-vaul-drawer]{-webkit-user-select:none;user-select:none}}@media (pointer: fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{0%{transform:translate3d(0,var(--initial-transform, 100%),0)}to{transform:translateZ(0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform, 100%),0)}}@keyframes slideFromTop{0%{transform:translate3d(0,calc(var(--initial-transform, 100%) * -1),0)}to{transform:translateZ(0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform, 100%) * -1),0)}}@keyframes slideFromLeft{0%{transform:translate3d(calc(var(--initial-transform, 100%) * -1),0,0)}to{transform:translateZ(0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform, 100%) * -1),0,0)}}@keyframes slideFromRight{0%{transform:translate3d(var(--initial-transform, 100%),0,0)}to{transform:translateZ(0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform, 100%),0,0)}}')),document.head.appendChild(a);}}catch(r){console.error("vite-plugin-css-injected-by-js",r);}})();
const rt = "undefined" < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ut = (e) => typeof e < "u";
function st(e) {
  return JSON.parse(JSON.stringify(e));
}
function $e(e, n, s, i = {}) {
  var t, w, d;
  const {
    clone: v = false,
    passive: D = false,
    eventName: $,
    deep: T = false,
    defaultValue: r,
    shouldEmit: l
  } = i, h = vueExports.getCurrentInstance(), m = s || (h == null ? void 0 : h.emit) || ((t = h == null ? void 0 : h.$emit) == null ? void 0 : t.bind(h)) || ((d = (w = h == null ? void 0 : h.proxy) == null ? void 0 : w.$emit) == null ? void 0 : d.bind(h == null ? void 0 : h.proxy));
  let u = $;
  n || (n = "modelValue"), u = u || `update:${n.toString()}`;
  const L = (a) => v ? typeof v == "function" ? v(a) : st(a) : a, H = () => ut(e[n]) ? L(e[n]) : r, p = (a) => {
    l ? l(a) && m(u, a) : m(u, a);
  };
  if (D) {
    const a = H(), c = vueExports.ref(a);
    let f = false;
    return vueExports.watch(
      () => e[n],
      (y) => {
        f || (f = true, c.value = L(y), vueExports.nextTick(() => f = false));
      }
    ), vueExports.watch(
      c,
      (y) => {
        !f && (y !== e[n] || T) && p(y);
      },
      { deep: T }
    ), c;
  } else
    return vueExports.computed({
      get() {
        return H();
      },
      set(a) {
        p(a);
      }
    });
}
const [ee, ct] = createContext("DrawerRoot"), Ee = /* @__PURE__ */ new WeakMap();
function C(e, n, s = false) {
  if (!e || !(e instanceof HTMLElement) || !n)
    return;
  const i = {};
  Object.entries(n).forEach(([t, w]) => {
    if (t.startsWith("--")) {
      e.style.setProperty(t, w);
      return;
    }
    i[t] = e.style[t], e.style[t] = w;
  }), !s && Ee.set(e, i);
}
function ie(e, n) {
  const s = window.getComputedStyle(e), i = s.transform || s.webkitTransform || s.mozTransform;
  let t = i.match(/^matrix3d\((.+)\)$/);
  return t ? Number.parseFloat(t[1].split(", ")[_(n) ? 13 : 12]) : (t = i.match(/^matrix\((.+)\)$/), t ? Number.parseFloat(t[1].split(", ")[_(n) ? 5 : 4]) : null);
}
function vt(e) {
  return 8 * (Math.log(e + 1) - 2);
}
function _(e) {
  switch (e) {
    case "top":
    case "bottom":
      return true;
    case "left":
    case "right":
      return false;
    default:
      return e;
  }
}
function de(e, n) {
  if (!e)
    return () => {
    };
  const s = e.style.cssText;
  return Object.assign(e.style, n), () => {
    e.style.cssText = s;
  };
}
function ft(...e) {
  return (...n) => {
    for (const s of e)
      typeof s == "function" && s(...n);
  };
}
const O = {
  DURATION: 0.5,
  EASE: [0.32, 0.72, 0, 1]
}, _e = 0.4, pt = 0.25, gt = 100, Be = 8, re = 16, Ce = 26, Oe = "vaul-dragging";
function mt({
  activeSnapPoint: e,
  snapPoints: n,
  drawerRef: s,
  overlayRef: i,
  fadeFromIndex: t,
  onSnapPointChange: w,
  direction: d
}) {
  const v = vueExports.ref(void 0);
  vueExports.onMounted(() => {
  }), vueExports.onBeforeUnmount(() => {
  });
  const $ = vueExports.computed(
    () => (n.value && e.value === n.value[n.value.length - 1]) ?? null
  ), T = vueExports.computed(
    () => n.value && n.value.length > 0 && ((t == null ? void 0 : t.value) || (t == null ? void 0 : t.value) === 0) && !Number.isNaN(t == null ? void 0 : t.value) && n.value[(t == null ? void 0 : t.value) ?? -1] === e.value || !n.value
  ), r = vueExports.computed(
    () => {
      var p;
      return ((p = n.value) == null ? void 0 : p.findIndex((a) => a === e.value)) ?? null;
    }
  ), l = vueExports.computed(
    () => {
      var p;
      return ((p = n.value) == null ? void 0 : p.map((a) => {
        const c = typeof a == "string";
        let f = 0;
        if (c && (f = Number.parseInt(a, 10)), _(d.value)) {
          const P = c ? f : v.value ? a * v.value.innerHeight : 0;
          return v.value ? d.value === "bottom" ? v.value.innerHeight - P : -v.value.innerHeight + P : P;
        }
        const y = c ? f : v.value ? a * v.value.innerWidth : 0;
        return v.value ? d.value === "right" ? v.value.innerWidth - y : -v.value.innerWidth + y : y;
      })) ?? [];
    }
  ), h = vueExports.computed(
    () => {
      var p;
      return r.value !== null ? (p = l.value) == null ? void 0 : p[r.value] : null;
    }
  ), m = (p) => {
    var c, f, y, P;
    const a = ((c = l.value) == null ? void 0 : c.findIndex((x) => x === p)) ?? null;
    vueExports.nextTick(() => {
      var x;
      w(a, l.value), C((x = s.value) == null ? void 0 : x.$el, {
        transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
        transform: _(d.value) ? `translate3d(0, ${p}px, 0)` : `translate3d(${p}px, 0, 0)`
      });
    }), l.value && a !== l.value.length - 1 && a !== (t == null ? void 0 : t.value) ? C((f = i.value) == null ? void 0 : f.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      opacity: "0"
    }) : C((y = i.value) == null ? void 0 : y.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      opacity: "1"
    }), e.value = a !== null ? ((P = n.value) == null ? void 0 : P[a]) ?? null : null;
  };
  vueExports.watch(
    [e, l, n],
    () => {
      var p;
      if (e.value) {
        const a = ((p = n.value) == null ? void 0 : p.findIndex((c) => c === e.value)) ?? -1;
        l.value && a !== -1 && typeof l.value[a] == "number" && m(l.value[a]);
      }
    },
    {
      immediate: true
      // if you want to run the effect immediately as well
    }
  );
  function u({
    draggedDistance: p,
    closeDrawer: a,
    velocity: c,
    dismissible: f
  }) {
    var j, G, z;
    if (t.value === void 0)
      return;
    const y = d.value === "bottom" || d.value === "right" ? (h.value ?? 0) - p : (h.value ?? 0) + p, P = r.value === t.value - 1, x = r.value === 0, W = p > 0;
    if (P && C((j = i.value) == null ? void 0 : j.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`
    }), c > 2 && !W) {
      f ? a() : m(l.value[0]);
      return;
    }
    if (c > 2 && W && l && n.value) {
      m(l.value[n.value.length - 1]);
      return;
    }
    const te = (G = l.value) == null ? void 0 : G.reduce((M, g) => typeof M != "number" || typeof g != "number" ? M : Math.abs(g - y) < Math.abs(M - y) ? g : M), V = _(d.value) ? window.innerHeight : window.innerWidth;
    if (c > _e && Math.abs(p) < V * 0.4) {
      const M = W ? 1 : -1;
      if (M > 0 && $) {
        m(l.value[(((z = n.value) == null ? void 0 : z.length) ?? 0) - 1]);
        return;
      }
      if (x && M < 0 && f && a(), r.value === null)
        return;
      m(l.value[r.value + M]);
      return;
    }
    m(te);
  }
  function L({ draggedDistance: p }) {
    var c;
    if (h.value === null)
      return;
    const a = d.value === "bottom" || d.value === "right" ? h.value - p : h.value + p;
    (d.value === "bottom" || d.value === "right") && a < l.value[l.value.length - 1] || (d.value === "top" || d.value === "left") && a > l.value[l.value.length - 1] || C((c = s.value) == null ? void 0 : c.$el, {
      transform: _(d.value) ? `translate3d(0, ${a}px, 0)` : `translate3d(${a}px, 0, 0)`
    });
  }
  function H(p, a) {
    if (!n.value || typeof r.value != "number" || !l.value || t.value === void 0)
      return null;
    const c = r.value === t.value - 1;
    if (r.value >= t.value && a)
      return 0;
    if (c && !a)
      return 1;
    if (!T.value && !c)
      return null;
    const y = c ? r.value + 1 : r.value - 1, P = c ? l.value[y] - l.value[y - 1] : l.value[y + 1] - l.value[y], x = p / Math.abs(P);
    return c ? 1 - x : x;
  }
  return {
    isLastSnapPoint: $,
    shouldFade: T,
    getPercentageDragged: H,
    activeSnapPointIndex: r,
    onRelease: u,
    onDrag: L,
    snapPointsOffset: l
  };
}
function Te() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
let Q = null;
function wt(e) {
  const { isOpen: n, modal: s, nested: i, hasBeenOpened: t, preventScrollRestoration: w, noBodyStyles: d } = e, v = vueExports.ref(""), D = vueExports.ref(0);
  function $() {
    if (Te() && Q === null && n.value && !d.value) {
      Q = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        height: document.body.style.height
      };
      const { scrollX: r, innerHeight: l } = window;
      document.body.style.setProperty("position", "fixed", "important"), Object.assign(document.body.style, {
        top: `${-D.value}px`,
        left: `${-r}px`,
        right: "0px",
        height: "auto"
      }), setTimeout(() => {
        requestAnimationFrame(() => {
          const h = l - window.innerHeight;
          h && D.value >= l && (document.body.style.top = `-${D.value + h}px`);
        });
      }, 300);
    }
  }
  function T() {
    if (Te() && Q !== null && !d.value) {
      const r = -Number.parseInt(document.body.style.top, 10), l = -Number.parseInt(document.body.style.left, 10);
      Object.assign(document.body.style, Q), window.requestAnimationFrame(() => {
        if (w.value && v.value !== window.location.href) {
          v.value = window.location.href;
          return;
        }
        window.scrollTo(l, r);
      }), Q = null;
    }
  }
  return vueExports.onMounted(() => {
    function r() {
      D.value = window.scrollY;
    }
    r(), window.addEventListener("scroll", r), vueExports.onUnmounted(() => {
      window.removeEventListener("scroll", r);
    });
  }), vueExports.watch([n, t, v], () => {
    i.value || !t.value || (n.value ? (window.matchMedia("(display-mode: standalone)").matches || $(), s.value || setTimeout(() => {
      T();
    }, 500)) : T());
  }), { restorePositionSetting: T };
}
function ht(e, n) {
  return e && e.value ? e : n;
}
function yt(e) {
  const {
    emitDrag: n,
    emitRelease: s,
    emitClose: i,
    emitOpenChange: t,
    open: w,
    dismissible: d,
    nested: v,
    modal: D,
    shouldScaleBackground: $,
    setBackgroundColorOnScale: T,
    scrollLockTimeout: r,
    closeThreshold: l,
    activeSnapPoint: h,
    fadeFromIndex: m,
    direction: u,
    noBodyStyles: L,
    handleOnly: H,
    preventScrollRestoration: p
  } = e, a = vueExports.ref(w.value ?? false), c = vueExports.ref(false), f = vueExports.ref(false), y = vueExports.ref(false), P = vueExports.ref(null), x = vueExports.ref(null), W = vueExports.ref(null), te = vueExports.ref(null), V = vueExports.ref(null), j = vueExports.ref(false), G = vueExports.ref(null), z = vueExports.ref(0), M = vueExports.ref(false);
  vueExports.ref(0);
  const g = vueExports.ref(null);
  vueExports.ref(0);
  const pe = vueExports.computed(() => {
    var o;
    return ((o = g.value) == null ? void 0 : o.$el.getBoundingClientRect().height) || 0;
  }), U = ht(
    e.snapPoints,
    vueExports.ref(void 0)
  ), Ne = vueExports.computed(() => {
    var o;
    return U && (((o = U.value) == null ? void 0 : o.length) ?? 0) > 0;
  }), Ae = vueExports.ref(null), {
    activeSnapPointIndex: ge,
    onRelease: xe,
    snapPointsOffset: He,
    onDrag: Ue,
    shouldFade: me,
    getPercentageDragged: Le
  } = mt({
    snapPoints: U,
    activeSnapPoint: h,
    drawerRef: g,
    fadeFromIndex: m,
    overlayRef: P,
    onSnapPointChange: Me,
    direction: u
  });
  function Me(o, R) {
    U.value && o === R.length - 1 && (x.value = /* @__PURE__ */ new Date());
  }
  wt({
    isOpen: a,
    modal: D,
    nested: v,
    hasBeenOpened: c,
    noBodyStyles: L,
    preventScrollRestoration: p
  });
  function ne() {
    return (window.innerWidth - Ce) / window.innerWidth;
  }
  function we(o, R) {
    var k;
    if (!o)
      return false;
    let b = o;
    const B = (k = window.getSelection()) == null ? void 0 : k.toString(), E = g.value ? ie(g.value.$el, u.value) : null, A = /* @__PURE__ */ new Date();
    if (b.hasAttribute("data-vaul-no-drag") || b.closest("[data-vaul-no-drag]"))
      return false;
    if (u.value === "right" || u.value === "left")
      return true;
    if (x.value && A.getTime() - x.value.getTime() < 500)
      return false;
    if (E !== null && (u.value === "bottom" ? E > 0 : E < 0))
      return true;
    if (B && B.length > 0)
      return false;
    if (V.value && A.getTime() - V.value.getTime() < r.value && E === 0 || R)
      return V.value = A, false;
    for (; b; ) {
      if (b.scrollHeight > b.clientHeight) {
        if (b.scrollTop !== 0)
          return V.value = /* @__PURE__ */ new Date(), false;
        if (b.getAttribute("role") === "dialog")
          return true;
      }
      b = b.parentNode;
    }
    return true;
  }
  function ke(o) {
    !d.value && !U.value || g.value && !g.value.$el.contains(o.target) || (f.value = true, W.value = /* @__PURE__ */ new Date(), o.target.setPointerCapture(o.pointerId), z.value = _(u.value) ? o.clientY : o.clientX);
  }
  function Ie(o) {
    var R, b, B, E, A, k;
    if (g.value && f.value) {
      const X = u.value === "bottom" || u.value === "right" ? 1 : -1, ae = (z.value - (_(u.value) ? o.clientY : o.clientX)) * X, le = ae > 0, ye = U.value && !d.value && !le;
      if (ye && ge.value === 0)
        return;
      const ce = Math.abs(ae), Se = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      let q = ce / pe.value;
      const De = Le(ce, le);
      if (De !== null && (q = De), ye && q >= 1 || !j.value && !we(o.target, le))
        return;
      if ((R = g == null ? void 0 : g.value) == null || R.$el.classList.add(Oe), j.value = true, C((b = g.value) == null ? void 0 : b.$el, {
        transition: "none"
      }), C((B = P.value) == null ? void 0 : B.$el, {
        transition: "none"
      }), U.value && Ue({ draggedDistance: ae }), le && !U.value) {
        const Y = vt(ae), oe = Math.min(Y * -1, 0) * X;
        C((E = g.value) == null ? void 0 : E.$el, {
          transform: _(u.value) ? `translate3d(0, ${oe}px, 0)` : `translate3d(${oe}px, 0, 0)`
        });
        return;
      }
      const qe = 1 - q;
      if ((me.value || m.value && ge.value === m.value - 1) && (n(q), C(
        (A = P.value) == null ? void 0 : A.$el,
        {
          opacity: `${qe}`,
          transition: "none"
        },
        true
      )), Se && P.value && $.value) {
        const Y = Math.min(ne() + q * (1 - ne()), 1), oe = 8 - q * 8, be = Math.max(0, 14 - q * 14);
        C(
          Se,
          {
            borderRadius: `${oe}px`,
            transform: _(u.value) ? `scale(${Y}) translate3d(0, ${be}px, 0)` : `scale(${Y}) translate3d(${be}px, 0, 0)`,
            transition: "none"
          },
          true
        );
      }
      if (!U.value) {
        const Y = ce * X;
        C((k = g.value) == null ? void 0 : k.$el, {
          transform: _(u.value) ? `translate3d(0, ${Y}px, 0)` : `translate3d(${Y}px, 0, 0)`
        });
      }
    }
  }
  function he() {
    var b;
    if (!g.value)
      return;
    const o = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]"), R = ie(g.value.$el, u.value);
    C(g.value.$el, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`
    }), C((b = P.value) == null ? void 0 : b.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      opacity: "1"
    }), $.value && R && R > 0 && a.value && C(
      o,
      {
        borderRadius: `${Be}px`,
        overflow: "hidden",
        ..._(u.value) ? {
          transform: `scale(${ne()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
          transformOrigin: "top"
        } : {
          transform: `scale(${ne()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
          transformOrigin: "left"
        },
        transitionProperty: "transform, border-radius",
        transitionDuration: `${O.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${O.EASE.join(",")})`
      },
      true
    );
  }
  function K(o) {
    g.value && (i(), o || (a.value = false), window.setTimeout(() => {
      U.value && (h.value = U.value[0]);
    }, O.DURATION * 1e3));
  }
  vueExports.watchEffect(() => {
    if (!a.value && $.value && rt) ;
  }), vueExports.watch(w, () => {
    a.value = w.value, w.value || K();
  });
  function We(o) {
    if (!f.value || !g.value)
      return;
    g.value.$el.classList.remove(Oe), j.value = false, f.value = false, te.value = /* @__PURE__ */ new Date();
    const R = ie(g.value.$el, u.value);
    if (!we(o.target, false) || !R || Number.isNaN(R) || W.value === null)
      return;
    const b = te.value.getTime() - W.value.getTime(), B = z.value - (_(u.value) ? o.clientY : o.clientX), E = Math.abs(B) / b;
    if (E > 0.05 && (y.value = true, window.setTimeout(() => {
      y.value = false;
    }, 200)), U.value) {
      const k = u.value === "bottom" || u.value === "right" ? 1 : -1;
      xe({
        draggedDistance: B * k,
        closeDrawer: K,
        velocity: E,
        dismissible: d.value
      }), s(true);
      return;
    }
    if (u.value === "bottom" || u.value === "right" ? B > 0 : B < 0) {
      he(), s(true);
      return;
    }
    if (E > _e) {
      K(), s(false);
      return;
    }
    const A = Math.min(
      g.value.$el.getBoundingClientRect().height ?? 0,
      window.innerHeight
    );
    if (R >= A * l.value) {
      K(), s(false);
      return;
    }
    s(true), he();
  }
  vueExports.watch(a, (o) => {
    o && (x.value = /* @__PURE__ */ new Date()), t(o);
  }, { immediate: true });
  function Ve(o) {
    var B, E;
    const R = o ? (window.innerWidth - re) / window.innerWidth : 1, b = o ? -16 : 0;
    G.value && window.clearTimeout(G.value), C((B = g.value) == null ? void 0 : B.$el, {
      transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      transform: `scale(${R}) translate3d(0, ${b}px, 0)`
    }), !o && ((E = g.value) != null && E.$el) && (G.value = window.setTimeout(() => {
      var k, X;
      const A = ie((k = g.value) == null ? void 0 : k.$el, u.value);
      C((X = g.value) == null ? void 0 : X.$el, {
        transition: "none",
        transform: _(u.value) ? `translate3d(0, ${A}px, 0)` : `translate3d(${A}px, 0, 0)`
      });
    }, 500));
  }
  function je(o) {
    var A;
    if (o < 0)
      return;
    const R = _(u.value) ? window.innerHeight : window.innerWidth, b = (R - re) / R, B = b + o * (1 - b), E = -16 + o * re;
    C((A = g.value) == null ? void 0 : A.$el, {
      transform: _(u.value) ? `scale(${B}) translate3d(0, ${E}px, 0)` : `scale(${B}) translate3d(${E}px, 0, 0)`,
      transition: "none"
    });
  }
  function ze(o) {
    var E;
    const R = _(u.value) ? window.innerHeight : window.innerWidth, b = o ? (R - re) / R : 1, B = o ? -16 : 0;
    o && C((E = g.value) == null ? void 0 : E.$el, {
      transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      transform: _(u.value) ? `scale(${b}) translate3d(0, ${B}px, 0)` : `scale(${b}) translate3d(${B}px, 0, 0)`
    });
  }
  return {
    open: w,
    isOpen: a,
    modal: D,
    keyboardIsOpen: M,
    hasBeenOpened: c,
    drawerRef: g,
    drawerHeightRef: pe,
    overlayRef: P,
    handleRef: Ae,
    isDragging: f,
    dragStartTime: W,
    isAllowedToDrag: j,
    snapPoints: U,
    activeSnapPoint: h,
    hasSnapPoints: Ne,
    pointerStart: z,
    dismissible: d,
    snapPointsOffset: He,
    direction: u,
    shouldFade: me,
    fadeFromIndex: m,
    shouldScaleBackground: $,
    setBackgroundColorOnScale: T,
    onPress: ke,
    onDrag: Ie,
    onRelease: We,
    closeDrawer: K,
    onNestedDrag: je,
    onNestedRelease: ze,
    onNestedOpenChange: Ve,
    emitClose: i,
    emitDrag: n,
    emitRelease: s,
    emitOpenChange: t,
    nested: v,
    handleOnly: H,
    noBodyStyles: L
  };
}
const St = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DrawerRoot",
  props: {
    activeSnapPoint: { default: void 0 },
    closeThreshold: { default: pt },
    shouldScaleBackground: { type: Boolean, default: void 0 },
    setBackgroundColorOnScale: { type: Boolean, default: true },
    scrollLockTimeout: { default: gt },
    fixed: { type: Boolean, default: void 0 },
    dismissible: { type: Boolean, default: true },
    modal: { type: Boolean, default: true },
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: void 0 },
    nested: { type: Boolean, default: false },
    direction: { default: "bottom" },
    noBodyStyles: { type: Boolean },
    handleOnly: { type: Boolean, default: false },
    preventScrollRestoration: { type: Boolean },
    snapPoints: { default: void 0 },
    fadeFromIndex: { default: void 0 }
  },
  emits: ["drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"],
  setup(e, { expose: n, emit: s }) {
    const i = e, t = s;
    vueExports.useSlots();
    const w = vueExports.computed(() => i.fadeFromIndex ?? (i.snapPoints && i.snapPoints.length - 1)), d = $e(i, "open", t, {
      defaultValue: i.defaultOpen,
      passive: i.open === void 0
    }), v = $e(i, "activeSnapPoint", t, {
      passive: i.activeSnapPoint === void 0
    }), D = {
      emitDrag: (m) => t("drag", m),
      emitRelease: (m) => t("release", m),
      emitClose: () => t("close"),
      emitOpenChange: (m) => {
        t("update:open", m), setTimeout(() => {
          t("animationEnd", m);
        }, O.DURATION * 1e3);
      }
    }, { closeDrawer: $, hasBeenOpened: T, modal: r, isOpen: l } = ct(
      yt({
        ...D,
        ...vueExports.toRefs(i),
        activeSnapPoint: v,
        fadeFromIndex: w,
        open: d
      })
    );
    function h(m) {
      if (d.value !== void 0) {
        D.emitOpenChange(m);
        return;
      }
      l.value = m, m ? T.value = true : $();
    }
    return n({
      open: l
    }), (m, u) => (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogRoot_default), {
      open: vueExports.unref(l),
      modal: vueExports.unref(r),
      "onUpdate:open": h
    }, {
      default: vueExports.withCtx(() => [
        vueExports.renderSlot(m.$slots, "default", { open: vueExports.unref(l) })
      ]),
      _: 3
    }, 8, ["open", "modal"]));
  }
}), _t = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DrawerRootNested",
  props: {
    activeSnapPoint: {},
    closeThreshold: {},
    shouldScaleBackground: { type: Boolean },
    setBackgroundColorOnScale: { type: Boolean },
    scrollLockTimeout: {},
    fixed: { type: Boolean },
    dismissible: { type: Boolean },
    modal: { type: Boolean },
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    nested: { type: Boolean },
    direction: {},
    noBodyStyles: { type: Boolean },
    handleOnly: { type: Boolean },
    preventScrollRestoration: { type: Boolean },
    snapPoints: {},
    fadeFromIndex: {}
  },
  emits: ["drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"],
  setup(e, { emit: n }) {
    const s = e, i = n, { onNestedDrag: t, onNestedOpenChange: w, onNestedRelease: d } = ee();
    function v() {
      w(false);
    }
    function D(r) {
      t(r);
    }
    function $(r) {
      r && w(r), i("update:open", r);
    }
    const T = useForwardPropsEmits(s, i);
    return (r, l) => (vueExports.openBlock(), vueExports.createBlock(St, vueExports.mergeProps(vueExports.unref(T), {
      nested: "",
      onClose: v,
      onDrag: D,
      onRelease: vueExports.unref(d),
      "onUpdate:open": $
    }), {
      default: vueExports.withCtx(() => [
        vueExports.renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["onRelease"]));
  }
}), Bt = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DrawerOverlay",
  setup(e) {
    const { overlayRef: n, hasSnapPoints: s, isOpen: i, shouldFade: t } = ee();
    return (w, d) => (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
      ref_key: "overlayRef",
      ref: n,
      "data-vaul-overlay": "",
      "data-vaul-snap-points": vueExports.unref(i) && vueExports.unref(s) ? "true" : "false",
      "data-vaul-snap-points-overlay": vueExports.unref(i) && vueExports.unref(t) ? "true" : "false"
    }, null, 8, ["data-vaul-snap-points", "data-vaul-snap-points-overlay"]));
  }
}), Dt = () => () => {
};
function bt() {
  const { direction: e, isOpen: n, shouldScaleBackground: s, setBackgroundColorOnScale: i, noBodyStyles: t } = ee(), w = vueExports.ref(null), d = vueExports.ref(document.body.style.backgroundColor);
  function v() {
    return (window.innerWidth - Ce) / window.innerWidth;
  }
  vueExports.watchEffect((D) => {
    if (n.value && s.value) {
      w.value && clearTimeout(w.value);
      const $ = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      if (!$)
        return;
      ft(
        i.value && !t.value ? de(document.body, { background: "black" }) : Dt,
        de($, {
          transformOrigin: _(e.value) ? "top" : "left",
          transitionProperty: "transform, border-radius",
          transitionDuration: `${O.DURATION}s`,
          transitionTimingFunction: `cubic-bezier(${O.EASE.join(",")})`
        })
      );
      const T = de($, {
        borderRadius: `${Be}px`,
        overflow: "hidden",
        ..._(e.value) ? {
          transform: `scale(${v()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
        } : {
          transform: `scale(${v()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
        }
      });
      D(() => {
        T(), w.value = window.setTimeout(() => {
          d.value ? document.body.style.background = d.value : document.body.style.removeProperty("background");
        }, O.DURATION * 1e3);
      });
    }
  }, { flush: "pre" });
}
const Ct = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DrawerContent",
  setup(e) {
    const {
      open: n,
      isOpen: s,
      snapPointsOffset: i,
      hasSnapPoints: t,
      drawerRef: w,
      onPress: d,
      onDrag: v,
      onRelease: D,
      modal: $,
      emitOpenChange: T,
      dismissible: r,
      keyboardIsOpen: l,
      closeDrawer: h,
      direction: m,
      handleOnly: u
    } = ee();
    bt();
    const L = vueExports.ref(false), H = vueExports.computed(() => i.value && i.value.length > 0 ? `${i.value[0]}px` : "0");
    function p(f) {
      if (!$.value || f.defaultPrevented) {
        f.preventDefault();
        return;
      }
      l.value && (l.value = false), r.value ? T(false) : f.preventDefault();
    }
    function a(f) {
      u.value || d(f);
    }
    function c(f) {
      u.value || v(f);
    }
    return vueExports.watchEffect(() => {
      t.value && window.requestAnimationFrame(() => {
        L.value = true;
      });
    }), (f, y) => (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogContent_default), {
      ref_key: "drawerRef",
      ref: w,
      "data-vaul-drawer": "",
      "data-vaul-drawer-direction": vueExports.unref(m),
      "data-vaul-delayed-snap-points": L.value ? "true" : "false",
      "data-vaul-snap-points": vueExports.unref(s) && vueExports.unref(t) ? "true" : "false",
      style: vueExports.normalizeStyle({ "--snap-point-height": H.value }),
      onPointerdown: a,
      onPointermove: c,
      onPointerup: vueExports.unref(D),
      onPointerDownOutside: p,
      onOpenAutoFocus: y[0] || (y[0] = vueExports.withModifiers(() => {
      }, ["prevent"])),
      onEscapeKeyDown: y[1] || (y[1] = (P) => {
        vueExports.unref(r) || P.preventDefault();
      })
    }, {
      default: vueExports.withCtx(() => [
        vueExports.renderSlot(f.$slots, "default")
      ]),
      _: 3
    }, 8, ["data-vaul-drawer-direction", "data-vaul-delayed-snap-points", "data-vaul-snap-points", "style", "onPointerup"]));
  }
}), $t = ["data-vaul-drawer-visible"], Ot = {
  "data-vaul-handle-hitarea": "",
  "aria-hidden": "true"
}, Tt = 250, Pt = 120, Nt = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DrawerHandle",
  props: {
    preventCycle: { type: Boolean, default: false }
  },
  setup(e) {
    const n = e, { onPress: s, onDrag: i, handleRef: t, handleOnly: w, isOpen: d, snapPoints: v, activeSnapPoint: D, isDragging: $, dismissible: T, closeDrawer: r } = ee(), l = vueExports.ref(null), h = vueExports.ref(false);
    function m() {
      if (h.value) {
        H();
        return;
      }
      window.setTimeout(() => {
        u();
      }, Pt);
    }
    function u() {
      if ($.value || n.preventCycle || h.value) {
        H();
        return;
      }
      if (H(), !v.value || v.value.length === 0) {
        T.value || r();
        return;
      }
      const c = D.value === v.value[v.value.length - 1];
      if (c && T.value) {
        r();
        return;
      }
      const f = v.value.findIndex((P) => P === D.value);
      if (f === -1)
        return;
      const y = c ? 0 : f + 1;
      D.value = v.value[y];
    }
    function L() {
      l.value = window.setTimeout(() => {
        h.value = true;
      }, Tt);
    }
    function H() {
      l.value && window.clearTimeout(l.value), h.value = false;
    }
    function p(c) {
      w.value && s(c), L();
    }
    function a(c) {
      w.value && i(c);
    }
    return (c, f) => (vueExports.openBlock(), vueExports.createElementBlock("div", {
      ref_key: "handleRef",
      ref: t,
      "data-vaul-drawer-visible": vueExports.unref(d) ? "true" : "false",
      "data-vaul-handle": "",
      "aria-hidden": "true",
      onClick: m,
      onPointercancel: H,
      onPointerdown: p,
      onPointermove: a
    }, [
      vueExports.createElementVNode("span", Ot, [
        vueExports.renderSlot(c.$slots, "default")
      ])
    ], 40, $t));
  }
});

const theme = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default ring ring-default flex focus:outline-none",
    "handle": [
      "shrink-0 !bg-accented",
      "transition-opacity"
    ],
    "container": "w-full flex flex-col gap-4 p-4 overflow-y-auto",
    "header": "",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "body": "flex-1",
    "footer": "flex flex-col gap-1.5"
  },
  "variants": {
    "direction": {
      "top": {
        "content": "mb-24 flex-col-reverse",
        "handle": "mb-4"
      },
      "right": {
        "content": "flex-row rtl:flex-row-reverse",
        "handle": "!ml-4"
      },
      "bottom": {
        "content": "mt-24 flex-col",
        "handle": "mt-4"
      },
      "left": {
        "content": "flex-row-reverse rtl:flex-row",
        "handle": "!mr-4"
      }
    },
    "inset": {
      "true": {
        "content": "rounded-lg after:hidden overflow-hidden [--initial-transform:calc(100%+1.5rem)]"
      }
    },
    "snapPoints": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "direction": [
        "top",
        "bottom"
      ],
      "class": {
        "content": "h-auto max-h-[96%]",
        "handle": "!w-12 !h-1.5 mx-auto"
      }
    },
    {
      "direction": [
        "top",
        "bottom"
      ],
      "snapPoints": true,
      "class": {
        "content": "h-full"
      }
    },
    {
      "direction": [
        "right",
        "left"
      ],
      "class": {
        "content": "w-auto max-w-[calc(100%-2rem)]",
        "handle": "!h-12 !w-1.5 mt-auto mb-auto"
      }
    },
    {
      "direction": [
        "right",
        "left"
      ],
      "snapPoints": true,
      "class": {
        "content": "w-full"
      }
    },
    {
      "direction": "top",
      "inset": true,
      "class": {
        "content": "inset-x-4 top-4"
      }
    },
    {
      "direction": "top",
      "inset": false,
      "class": {
        "content": "inset-x-0 top-0 rounded-b-lg"
      }
    },
    {
      "direction": "bottom",
      "inset": true,
      "class": {
        "content": "inset-x-4 bottom-4"
      }
    },
    {
      "direction": "bottom",
      "inset": false,
      "class": {
        "content": "inset-x-0 bottom-0 rounded-t-lg"
      }
    },
    {
      "direction": "left",
      "inset": true,
      "class": {
        "content": "inset-y-4 left-4"
      }
    },
    {
      "direction": "left",
      "inset": false,
      "class": {
        "content": "inset-y-0 left-0 rounded-r-lg"
      }
    },
    {
      "direction": "right",
      "inset": true,
      "class": {
        "content": "inset-y-4 right-4"
      }
    },
    {
      "direction": "right",
      "inset": false,
      "class": {
        "content": "inset-y-0 right-0 rounded-l-lg"
      }
    }
  ]
};
const _sfc_main = {
  __name: "UDrawer",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    inset: { type: Boolean, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    handle: { type: Boolean, required: false, default: true },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    nested: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    activeSnapPoint: { type: [Number, String, null], required: false },
    closeThreshold: { type: Number, required: false },
    shouldScaleBackground: { type: Boolean, required: false },
    setBackgroundColorOnScale: { type: Boolean, required: false },
    scrollLockTimeout: { type: Number, required: false },
    fixed: { type: Boolean, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    modal: { type: Boolean, required: false, default: true },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    direction: { type: String, required: false, default: "bottom" },
    noBodyStyles: { type: Boolean, required: false },
    handleOnly: { type: Boolean, required: false },
    preventScrollRestoration: { type: Boolean, required: false },
    snapPoints: { type: Array, required: false }
  },
  emits: ["close:prevent", "drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const props = useComponentProps("drawer", _props);
    const appConfig = useAppConfig();
    const rootProps = useForwardProps$1(reactivePick(props, "activeSnapPoint", "closeThreshold", "shouldScaleBackground", "setBackgroundColorOnScale", "scrollLockTimeout", "fixed", "dismissible", "modal", "open", "defaultOpen", "nested", "direction", "noBodyStyles", "handleOnly", "preventScrollRestoration", "snapPoints"), emits);
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = vueExports.toRef(() => props.content);
    const contentEvents = vueExports.computed(() => {
      if (!props.dismissible) {
        const events = ["interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside
      };
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.drawer || {} })({
      direction: props.direction,
      inset: props.inset,
      snapPoints: props.snapPoints && props.snapPoints.length > 0
    }));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref(props).nested ? vueExports.unref(_t) : vueExports.unref(St)), vueExports.mergeProps(vueExports.unref(rootProps), _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent_1(vueExports.unref(DialogTrigger_default), {
                "as-child": "",
                class: vueExports.unref(props).class
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "default")
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(vueExports.unref(DialogPortal_default), vueExports.unref(portalProps), {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(FieldGroupReset), null, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (vueExports.unref(props).overlay) {
                          _push4(ssrRenderComponent_1(vueExports.unref(Bt), {
                            "data-slot": "overlay",
                            class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent_1(vueExports.unref(Ct), vueExports.mergeProps({
                          "data-slot": "content",
                          class: ui.value.content({ class: [!slots.default && vueExports.unref(props).class, vueExports.unref(props).ui?.content] })
                        }, contentProps.value, vueExports.toHandlers(contentEvents.value)), {
                          default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (vueExports.unref(props).handle) {
                                _push5(ssrRenderComponent_1(vueExports.unref(Nt), {
                                  "data-slot": "handle",
                                  class: ui.value.handle({ class: vueExports.unref(props).ui?.handle })
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (!vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content) {
                                _push5(ssrRenderComponent_1(vueExports.unref(VisuallyHidden_default), null, {
                                  default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      if (!vueExports.unref(props).title && !slots.title) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), null, null, _parent6, _scopeId5));
                                      } else if (!!slots.content) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), null, {
                                          default: vueExports.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                                                _push7(`${ssrInterpolate_1(vueExports.unref(props).title)}`);
                                              }, _push7, _parent7, _scopeId6);
                                            } else {
                                              return [
                                                vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 3
                                        }, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      if (!vueExports.unref(props).description && !slots.description) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), null, null, _parent6, _scopeId5));
                                      } else if (!!slots.content) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), null, {
                                          default: vueExports.withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                                                _push7(`${ssrInterpolate_1(vueExports.unref(props).description)}`);
                                              }, _push7, _parent7, _scopeId6);
                                            } else {
                                              return [
                                                vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 3
                                        }, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                    } else {
                                      return [
                                        !vueExports.unref(props).title && !slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 1 }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                            ])
                                          ]),
                                          _: 3
                                        })) : vueExports.createCommentVNode("", true),
                                        !vueExports.unref(props).description && !slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 3 }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                            ])
                                          ]),
                                          _: 3
                                        })) : vueExports.createCommentVNode("", true)
                                      ];
                                    }
                                  }),
                                  _: 3
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              ssrRenderSlot_1(_ctx.$slots, "content", {}, () => {
                                _push5(`<div data-slot="container" class="${ssrRenderClass_1(ui.value.container({ class: vueExports.unref(props).ui?.container }))}"${_scopeId4}>`);
                                if (!!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description)) {
                                  _push5(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(props).ui?.header }))}"${_scopeId4}>`);
                                  ssrRenderSlot_1(_ctx.$slots, "header", {}, () => {
                                    if (vueExports.unref(props).title || !!slots.title) {
                                      _push5(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), {
                                        "data-slot": "title",
                                        class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                      }, {
                                        default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                                              _push6(`${ssrInterpolate_1(vueExports.unref(props).title)}`);
                                            }, _push6, _parent6, _scopeId5);
                                          } else {
                                            return [
                                              vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 3
                                      }, _parent5, _scopeId4));
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    if (vueExports.unref(props).description || !!slots.description) {
                                      _push5(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), {
                                        "data-slot": "description",
                                        class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                      }, {
                                        default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                                              _push6(`${ssrInterpolate_1(vueExports.unref(props).description)}`);
                                            }, _push6, _parent6, _scopeId5);
                                          } else {
                                            return [
                                              vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 3
                                      }, _parent5, _scopeId4));
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                  }, _push5, _parent5, _scopeId4);
                                  _push5(`</div>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (!!slots.body) {
                                  _push5(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(props).ui?.body }))}"${_scopeId4}>`);
                                  ssrRenderSlot_1(_ctx.$slots, "body", {}, null, _push5, _parent5, _scopeId4);
                                  _push5(`</div>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (!!slots.footer) {
                                  _push5(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(props).ui?.footer }))}"${_scopeId4}>`);
                                  ssrRenderSlot_1(_ctx.$slots, "footer", {}, null, _push5, _parent5, _scopeId4);
                                  _push5(`</div>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</div>`);
                              }, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                vueExports.unref(props).handle ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Nt), {
                                  key: 0,
                                  "data-slot": "handle",
                                  class: ui.value.handle({ class: vueExports.unref(props).ui?.handle })
                                }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                !vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 1 }, {
                                  default: vueExports.withCtx(() => [
                                    !vueExports.unref(props).title && !slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 1 }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                        ])
                                      ]),
                                      _: 3
                                    })) : vueExports.createCommentVNode("", true),
                                    !vueExports.unref(props).description && !slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 3 }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                        ])
                                      ]),
                                      _: 3
                                    })) : vueExports.createCommentVNode("", true)
                                  ]),
                                  _: 3
                                })) : vueExports.createCommentVNode("", true),
                                vueExports.renderSlot(_ctx.$slots, "content", {}, () => [
                                  vueExports.createVNode("div", {
                                    "data-slot": "container",
                                    class: ui.value.container({ class: vueExports.unref(props).ui?.container })
                                  }, [
                                    !!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                      key: 0,
                                      "data-slot": "header",
                                      class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                                    }, [
                                      vueExports.renderSlot(_ctx.$slots, "header", {}, () => [
                                        vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                          key: 0,
                                          "data-slot": "title",
                                          class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                        }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                            ])
                                          ]),
                                          _: 3
                                        }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                        vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                          key: 1,
                                          "data-slot": "description",
                                          class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                        }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                            ])
                                          ]),
                                          _: 3
                                        }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                      ])
                                    ], 2)) : vueExports.createCommentVNode("", true),
                                    !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                      key: 1,
                                      "data-slot": "body",
                                      class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                                    }, [
                                      vueExports.renderSlot(_ctx.$slots, "body")
                                    ], 2)) : vueExports.createCommentVNode("", true),
                                    !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                      key: 2,
                                      "data-slot": "footer",
                                      class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                                    }, [
                                      vueExports.renderSlot(_ctx.$slots, "footer")
                                    ], 2)) : vueExports.createCommentVNode("", true)
                                  ], 2)
                                ])
                              ];
                            }
                          }),
                          _: 3
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.unref(props).overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Bt), {
                            key: 0,
                            "data-slot": "overlay",
                            class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                          }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode(vueExports.unref(Ct), vueExports.mergeProps({
                            "data-slot": "content",
                            class: ui.value.content({ class: [!slots.default && vueExports.unref(props).class, vueExports.unref(props).ui?.content] })
                          }, contentProps.value, vueExports.toHandlers(contentEvents.value)), {
                            default: vueExports.withCtx(() => [
                              vueExports.unref(props).handle ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Nt), {
                                key: 0,
                                "data-slot": "handle",
                                class: ui.value.handle({ class: vueExports.unref(props).ui?.handle })
                              }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                              !vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 1 }, {
                                default: vueExports.withCtx(() => [
                                  !vueExports.unref(props).title && !slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 1 }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : vueExports.createCommentVNode("", true),
                                  !vueExports.unref(props).description && !slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 3 }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : vueExports.createCommentVNode("", true)
                                ]),
                                _: 3
                              })) : vueExports.createCommentVNode("", true),
                              vueExports.renderSlot(_ctx.$slots, "content", {}, () => [
                                vueExports.createVNode("div", {
                                  "data-slot": "container",
                                  class: ui.value.container({ class: vueExports.unref(props).ui?.container })
                                }, [
                                  !!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                    key: 0,
                                    "data-slot": "header",
                                    class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                                  }, [
                                    vueExports.renderSlot(_ctx.$slots, "header", {}, () => [
                                      vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                        key: 0,
                                        "data-slot": "title",
                                        class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                      vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                        key: 1,
                                        "data-slot": "description",
                                        class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                    ])
                                  ], 2)) : vueExports.createCommentVNode("", true),
                                  !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                    key: 1,
                                    "data-slot": "body",
                                    class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                                  }, [
                                    vueExports.renderSlot(_ctx.$slots, "body")
                                  ], 2)) : vueExports.createCommentVNode("", true),
                                  !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                    key: 2,
                                    "data-slot": "footer",
                                    class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                                  }, [
                                    vueExports.renderSlot(_ctx.$slots, "footer")
                                  ], 2)) : vueExports.createCommentVNode("", true)
                                ], 2)
                              ])
                            ]),
                            _: 3
                          }, 16, ["class"])
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(FieldGroupReset), null, {
                      default: vueExports.withCtx(() => [
                        vueExports.unref(props).overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Bt), {
                          key: 0,
                          "data-slot": "overlay",
                          class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                        }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                        vueExports.createVNode(vueExports.unref(Ct), vueExports.mergeProps({
                          "data-slot": "content",
                          class: ui.value.content({ class: [!slots.default && vueExports.unref(props).class, vueExports.unref(props).ui?.content] })
                        }, contentProps.value, vueExports.toHandlers(contentEvents.value)), {
                          default: vueExports.withCtx(() => [
                            vueExports.unref(props).handle ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Nt), {
                              key: 0,
                              "data-slot": "handle",
                              class: ui.value.handle({ class: vueExports.unref(props).ui?.handle })
                            }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                            !vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 1 }, {
                              default: vueExports.withCtx(() => [
                                !vueExports.unref(props).title && !slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 1 }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                    ])
                                  ]),
                                  _: 3
                                })) : vueExports.createCommentVNode("", true),
                                !vueExports.unref(props).description && !slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 3 }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                    ])
                                  ]),
                                  _: 3
                                })) : vueExports.createCommentVNode("", true)
                              ]),
                              _: 3
                            })) : vueExports.createCommentVNode("", true),
                            vueExports.renderSlot(_ctx.$slots, "content", {}, () => [
                              vueExports.createVNode("div", {
                                "data-slot": "container",
                                class: ui.value.container({ class: vueExports.unref(props).ui?.container })
                              }, [
                                !!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: 0,
                                  "data-slot": "header",
                                  class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, "header", {}, () => [
                                    vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                      key: 0,
                                      "data-slot": "title",
                                      class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                        ])
                                      ]),
                                      _: 3
                                    }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                    vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                      key: 1,
                                      "data-slot": "description",
                                      class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                        ])
                                      ]),
                                      _: 3
                                    }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                  ])
                                ], 2)) : vueExports.createCommentVNode("", true),
                                !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: 1,
                                  "data-slot": "body",
                                  class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, "body")
                                ], 2)) : vueExports.createCommentVNode("", true),
                                !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: 2,
                                  "data-slot": "footer",
                                  class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, "footer")
                                ], 2)) : vueExports.createCommentVNode("", true)
                              ], 2)
                            ])
                          ]),
                          _: 3
                        }, 16, ["class"])
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTrigger_default), {
                key: 0,
                "as-child": "",
                class: vueExports.unref(props).class
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 8, ["class"])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(vueExports.unref(DialogPortal_default), vueExports.unref(portalProps), {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(FieldGroupReset), null, {
                    default: vueExports.withCtx(() => [
                      vueExports.unref(props).overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Bt), {
                        key: 0,
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                      }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                      vueExports.createVNode(vueExports.unref(Ct), vueExports.mergeProps({
                        "data-slot": "content",
                        class: ui.value.content({ class: [!slots.default && vueExports.unref(props).class, vueExports.unref(props).ui?.content] })
                      }, contentProps.value, vueExports.toHandlers(contentEvents.value)), {
                        default: vueExports.withCtx(() => [
                          vueExports.unref(props).handle ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Nt), {
                            key: 0,
                            "data-slot": "handle",
                            class: ui.value.handle({ class: vueExports.unref(props).ui?.handle })
                          }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                          !vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 1 }, {
                            default: vueExports.withCtx(() => [
                              !vueExports.unref(props).title && !slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 1 }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : vueExports.createCommentVNode("", true),
                              !vueExports.unref(props).description && !slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 3 }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : vueExports.createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : vueExports.createCommentVNode("", true),
                          vueExports.renderSlot(_ctx.$slots, "content", {}, () => [
                            vueExports.createVNode("div", {
                              "data-slot": "container",
                              class: ui.value.container({ class: vueExports.unref(props).ui?.container })
                            }, [
                              !!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 0,
                                "data-slot": "header",
                                class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, "header", {}, () => [
                                  vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                  vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                ])
                              ], 2)) : vueExports.createCommentVNode("", true),
                              !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 1,
                                "data-slot": "body",
                                class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, "body")
                              ], 2)) : vueExports.createCommentVNode("", true),
                              !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 2,
                                "data-slot": "footer",
                                class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, "footer")
                              ], 2)) : vueExports.createCommentVNode("", true)
                            ], 2)
                          ])
                        ]),
                        _: 3
                      }, 16, ["class"])
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/Drawer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Drawer-CubnRYJR.mjs.map
