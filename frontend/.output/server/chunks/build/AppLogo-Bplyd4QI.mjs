import { e as _sfc_main$8, j as _sfc_main$d } from './server.mjs';
import { o as vueExports, f as ssrRenderComponent_1 } from '../routes/renderer.mjs';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "AppLogo",
  __ssrInlineRender: true,
  props: {
    white: { type: Boolean, default: false },
    to: { default: void 0 },
    underline: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      _push(ssrRenderComponent_1(_component_UButton, vueExports.mergeProps({
        to: __props.to ? __props.to : void 0,
        variant: "link",
        color: "primary",
        class: ["app-logo text-3xl", { white: __props.white, "logo-underline": __props.underline }]
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UIcon, {
              name: "i-lucide-lightbulb",
              class: "text-[1em]"
            }, null, _parent2, _scopeId));
            _push2(`<span class="font-extrabold font-display text-[1em] tracking-widest relative top-[0.05em]"${_scopeId}> Starta </span>`);
          } else {
            return [
              vueExports.createVNode(_component_UIcon, {
                name: "i-lucide-lightbulb",
                class: "text-[1em]"
              }),
              vueExports.createVNode("span", { class: "font-extrabold font-display text-[1em] tracking-widest relative top-[0.05em]" }, " Starta ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "AppLogo" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=AppLogo-Bplyd4QI.mjs.map
