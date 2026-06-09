import { _ as _sfc_main$1 } from './Modal-BBL-Wwu5.mjs';
import { _ as _sfc_main$2 } from './Alert-CsIjDkc0.mjs';
import { e as _sfc_main$8 } from './server.mjs';
import { o as vueExports, f as ssrRenderComponent_1, a as ssrInterpolate_1 } from '../routes/renderer.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "ConfirmModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    title: {},
    description: {},
    confirmLabel: {},
    confirmColor: {},
    loading: { type: Boolean },
    errorMessage: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ vueExports.mergeModels(["confirm", "cancel"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const open = vueExports.useModel(__props, "open");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$1;
      const _component_UAlert = _sfc_main$2;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent_1(_component_UModal, vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: __props.title ?? "Are you sure?",
        description: __props.description
      }, _attrs), vueExports.createSlots({
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-2 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UButton, {
              variant: "ghost",
              onClick: ($event) => {
                emit("cancel");
                open.value = false;
              }
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
              color: __props.confirmColor ?? "error",
              loading: __props.loading,
              onClick: ($event) => emit("confirm")
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate_1(__props.confirmLabel ?? "Confirm")}`);
                } else {
                  return [
                    vueExports.createTextVNode(vueExports.toDisplayString(__props.confirmLabel ?? "Confirm"), 1)
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
                  onClick: ($event) => {
                    emit("cancel");
                    open.value = false;
                  }
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("Cancel")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                vueExports.createVNode(_component_UButton, {
                  color: __props.confirmColor ?? "error",
                  loading: __props.loading,
                  onClick: ($event) => emit("confirm")
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode(vueExports.toDisplayString(__props.confirmLabel ?? "Confirm"), 1)
                  ]),
                  _: 1
                }, 8, ["color", "loading", "onClick"])
              ])
            ];
          }
        }),
        _: 2
      }, [
        __props.errorMessage ? {
          name: "body",
          fn: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent_1(_component_UAlert, {
                color: "error",
                variant: "soft",
                description: __props.errorMessage
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UAlert, {
                  color: "error",
                  variant: "soft",
                  description: __props.errorMessage
                }, null, 8, ["description"])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/ConfirmModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main, { __name: "AdminConfirmModal" });

export { __nuxt_component_4 as _ };
//# sourceMappingURL=ConfirmModal-C3jTAYcv.mjs.map
