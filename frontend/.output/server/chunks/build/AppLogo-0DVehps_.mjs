import { d as _export_sfc, a5 as ssrRenderAttrs_1, aO as vueExports } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({ class: "text-5xl font-extrabold" }, _attrs))}>Starta</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "AppLogo" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AppLogo-0DVehps_.mjs.map
