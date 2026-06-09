import { _ as __nuxt_component_1 } from './AppLogo-Bplyd4QI.mjs';
import { av as useRoute, j as _sfc_main$d, e as _sfc_main$8 } from './server.mjs';
import { _ as _sfc_main$1 } from './Card-EP3E58RR.mjs';
import { _ as _sfc_main$2 } from './FormField-Bwoy2x8u.mjs';
import { _ as _sfc_main$3 } from './Input-B_IU2Xmo.mjs';
import { _ as _sfc_main$4 } from './Alert-CsIjDkc0.mjs';
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
  __name: "confirm",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { fetcher } = useApi();
    const token = vueExports.computed(() => route.query.token);
    const newPassword = vueExports.ref("");
    const showPassword = vueExports.ref(false);
    const isLoading = vueExports.ref(false);
    const error = vueExports.ref(null);
    const success = vueExports.ref(false);
    async function onSubmit() {
      if (!token.value) {
        error.value = "Invalid or missing reset token. Please request a new reset link.";
        return;
      }
      error.value = null;
      isLoading.value = true;
      try {
        await fetcher("/api/auth/reset-password", {
          method: "POST",
          body: JSON.stringify({ newPassword: newPassword.value, token: token.value })
        });
        success.value = true;
      } catch {
        error.value = "This reset link is invalid or has expired. Please request a new one.";
      } finally {
        isLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_1;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$8;
      const _component_UCard = _sfc_main$1;
      const _component_UFormField = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_UAlert = _sfc_main$4;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({ class: "flex min-h-screen items-center justify-center px-4 py-12" }, _attrs))}><div class="w-full max-w-md"><div class="mb-8 text-center">`);
      _push(ssrRenderComponent_1(_component_AppLogo, { class: "mx-auto mb-4 h-10 w-auto" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold">Choose a new password</h1></div>`);
      if (vueExports.unref(success)) {
        _push(`<div class="text-center">`);
        _push(ssrRenderComponent_1(_component_UIcon, {
          name: "i-lucide-circle-check",
          class: "text-primary mx-auto mb-4 h-12 w-12"
        }, null, _parent));
        _push(`<h2 class="mb-2 text-xl font-bold">Password updated!</h2><p class="text-muted mb-8 text-sm">You can now sign in with your new password.</p>`);
        _push(ssrRenderComponent_1(_component_UButton, {
          to: "/login",
          class: "w-full justify-center"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Sign in`);
            } else {
              return [
                vueExports.createTextVNode("Sign in")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent_1(_component_UCard, null, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form class="space-y-4"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UFormField, {
                label: "New password",
                name: "newPassword"
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent_1(_component_UInput, {
                      modelValue: vueExports.unref(newPassword),
                      "onUpdate:modelValue": ($event) => vueExports.isRef(newPassword) ? newPassword.value = $event : null,
                      type: vueExports.unref(showPassword) ? "text" : "password",
                      placeholder: "Your new password",
                      autocomplete: "new-password",
                      required: "",
                      class: "w-full"
                    }, {
                      trailing: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(_component_UButton, {
                            variant: "ghost",
                            size: "sm",
                            icon: vueExports.unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                            "aria-label": vueExports.unref(showPassword) ? "Hide password" : "Show password",
                            onClick: ($event) => showPassword.value = !vueExports.unref(showPassword)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_UButton, {
                              variant: "ghost",
                              size: "sm",
                              icon: vueExports.unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                              "aria-label": vueExports.unref(showPassword) ? "Hide password" : "Show password",
                              onClick: ($event) => showPassword.value = !vueExports.unref(showPassword)
                            }, null, 8, ["icon", "aria-label", "onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(newPassword),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(newPassword) ? newPassword.value = $event : null,
                        type: vueExports.unref(showPassword) ? "text" : "password",
                        placeholder: "Your new password",
                        autocomplete: "new-password",
                        required: "",
                        class: "w-full"
                      }, {
                        trailing: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UButton, {
                            variant: "ghost",
                            size: "sm",
                            icon: vueExports.unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                            "aria-label": vueExports.unref(showPassword) ? "Hide password" : "Show password",
                            onClick: ($event) => showPassword.value = !vueExports.unref(showPassword)
                          }, null, 8, ["icon", "aria-label", "onClick"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (vueExports.unref(error)) {
                _push2(ssrRenderComponent_1(_component_UAlert, {
                  color: "error",
                  description: vueExports.unref(error)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent_1(_component_UButton, {
                type: "submit",
                class: "w-full justify-center",
                loading: vueExports.unref(isLoading)
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Set new password `);
                  } else {
                    return [
                      vueExports.createTextVNode(" Set new password ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</form>`);
            } else {
              return [
                vueExports.createVNode("form", {
                  class: "space-y-4",
                  onSubmit: vueExports.withModifiers(onSubmit, ["prevent"])
                }, [
                  vueExports.createVNode(_component_UFormField, {
                    label: "New password",
                    name: "newPassword"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(newPassword),
                        "onUpdate:modelValue": ($event) => vueExports.isRef(newPassword) ? newPassword.value = $event : null,
                        type: vueExports.unref(showPassword) ? "text" : "password",
                        placeholder: "Your new password",
                        autocomplete: "new-password",
                        required: "",
                        class: "w-full"
                      }, {
                        trailing: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UButton, {
                            variant: "ghost",
                            size: "sm",
                            icon: vueExports.unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                            "aria-label": vueExports.unref(showPassword) ? "Hide password" : "Show password",
                            onClick: ($event) => showPassword.value = !vueExports.unref(showPassword)
                          }, null, 8, ["icon", "aria-label", "onClick"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                    ]),
                    _: 1
                  }),
                  vueExports.unref(error) ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                    key: 0,
                    color: "error",
                    description: vueExports.unref(error)
                  }, null, 8, ["description"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode(_component_UButton, {
                    type: "submit",
                    class: "w-full justify-center",
                    loading: vueExports.unref(isLoading)
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(" Set new password ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ], 32)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password/confirm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=confirm-DfNe1OOT.mjs.map
