import { _ as __nuxt_component_1 } from './AppLogo-Bplyd4QI.mjs';
import { _ as _sfc_main$1 } from './Card-EP3E58RR.mjs';
import { _ as _sfc_main$2 } from './FormField-Bwoy2x8u.mjs';
import { _ as _sfc_main$3 } from './Input-B_IU2Xmo.mjs';
import { e as _sfc_main$8, _ as __nuxt_component_0$1, j as _sfc_main$d, aw as useRuntimeConfig } from './server.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { o as vueExports, d as ssrRenderAttrs_1, f as ssrRenderComponent_1 } from '../routes/renderer.mjs';
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
import '../_/shared.cjs.prod.mjs';
import 'node:stream';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { fetcher } = useApi();
    const email = vueExports.ref("");
    const submitted = vueExports.ref(false);
    const isLoading = vueExports.ref(false);
    async function onSubmit() {
      isLoading.value = true;
      try {
        const frontendUrl = useRuntimeConfig().public.frontendUrl;
        await fetcher("/api/auth/request-password-reset", {
          method: "POST",
          body: JSON.stringify({
            email: email.value,
            redirectTo: `${frontendUrl}/reset-password/confirm`
          })
        });
      } catch {
      } finally {
        submitted.value = true;
        isLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_1;
      const _component_UCard = _sfc_main$1;
      const _component_UFormField = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_UButton = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UIcon = _sfc_main$d;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({ class: "flex min-h-screen items-center justify-center px-4 py-12" }, _attrs))}><div class="w-full max-w-md"><div class="mb-8 text-center">`);
      _push(ssrRenderComponent_1(_component_AppLogo, { class: "mx-auto mb-4 h-10 w-auto" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold">Reset your password</h1><p class="text-muted mt-1 text-sm">Enter your email and we&#39;ll send you a reset link.</p></div>`);
      if (!vueExports.unref(submitted)) {
        _push(ssrRenderComponent_1(_component_UCard, null, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form class="space-y-4"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UFormField, {
                label: "Email",
                name: "email"
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent_1(_component_UInput, {
                      modelValue: vueExports.unref(email),
                      "onUpdate:modelValue": ($event) => vueExports.isRef(email) ? email.value = $event : null,
                      type: "email",
                      placeholder: "you@example.com",
                      autocomplete: "email",
                      required: "",
                      class: "w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(email),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(email) ? email.value = $event : null,
                        type: "email",
                        placeholder: "you@example.com",
                        autocomplete: "email",
                        required: "",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent_1(_component_UButton, {
                type: "submit",
                class: "w-full justify-center",
                loading: vueExports.unref(isLoading)
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Send reset link `);
                  } else {
                    return [
                      vueExports.createTextVNode(" Send reset link ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p class="text-muted text-center text-sm"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_NuxtLink, {
                to: "/login",
                class: "text-primary font-medium hover:underline"
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Back to sign in `);
                  } else {
                    return [
                      vueExports.createTextVNode(" Back to sign in ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</p></form>`);
            } else {
              return [
                vueExports.createVNode("form", {
                  class: "space-y-4",
                  onSubmit: vueExports.withModifiers(onSubmit, ["prevent"])
                }, [
                  vueExports.createVNode(_component_UFormField, {
                    label: "Email",
                    name: "email"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(email),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(email) ? email.value = $event : null,
                        type: "email",
                        placeholder: "you@example.com",
                        autocomplete: "email",
                        required: "",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UButton, {
                    type: "submit",
                    class: "w-full justify-center",
                    loading: vueExports.unref(isLoading)
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(" Send reset link ")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  vueExports.createVNode("p", { class: "text-muted text-center text-sm" }, [
                    vueExports.createVNode(_component_NuxtLink, {
                      to: "/login",
                      class: "text-primary font-medium hover:underline"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Back to sign in ")
                      ]),
                      _: 1
                    })
                  ])
                ], 32)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="text-center">`);
        _push(ssrRenderComponent_1(_component_UIcon, {
          name: "i-lucide-mail",
          class: "text-primary mx-auto mb-4 h-12 w-12"
        }, null, _parent));
        _push(`<h2 class="mb-2 text-xl font-bold">Check your inbox</h2><p class="text-muted mb-8 text-sm"> If an account exists for that email, you&#39;ll receive a reset link shortly. </p>`);
        _push(ssrRenderComponent_1(_component_UButton, {
          to: "/login",
          variant: "outline",
          class: "w-full justify-center"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to sign in `);
            } else {
              return [
                vueExports.createTextVNode(" Back to sign in ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CMBSDqjk.mjs.map
