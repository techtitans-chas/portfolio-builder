import { aO as vueExports, a5 as ssrRenderAttrs_1, a7 as ssrRenderComponent_1, j as _sfc_main$d, e as _sfc_main$8 } from './server.mjs';
import '../nitro/nitro.mjs';
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
import '../routes/renderer.mjs';
import '../_/shared.cjs.prod.mjs';
import 'node:stream';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "verified",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({ class: "flex min-h-screen items-center justify-center px-4 py-12" }, _attrs))}><div class="w-full max-w-md text-center">`);
      _push(ssrRenderComponent_1(_component_UIcon, {
        name: "i-lucide-circle-check",
        class: "text-primary mx-auto mb-4 h-12 w-12"
      }, null, _parent));
      _push(`<h1 class="mb-2 text-2xl font-bold">Email verified!</h1><p class="text-muted mb-8 text-sm"> Your account is now active. Sign in to start building your portfolio. </p>`);
      _push(ssrRenderComponent_1(_component_UButton, {
        to: "/login",
        class: "w-full justify-center"
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign in `);
          } else {
            return [
              vueExports.createTextVNode(" Sign in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/verified.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verified-Dh9Fk-3f.mjs.map
