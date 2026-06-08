import { _ as __nuxt_component_0 } from './AppLogo-0DVehps_.mjs';
import { a8 as useRoute, e as _sfc_main$d, f as _sfc_main$8 } from './server.mjs';
import { _ as _sfc_main$1 } from './Card-uQKN-I-u.mjs';
import { _ as _sfc_main$2 } from './FormField-9wkfNHPa.mjs';
import { _ as _sfc_main$3 } from './Input-DWHPzDmy.mjs';
import { _ as _sfc_main$4 } from './Alert-Nv5RlKkm.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, isRef, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'perfect-debounce';
import '@vueuse/core';
import '@vueuse/shared';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "confirm",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { fetcher } = useApi();
    const token = computed(() => route.query.token);
    const newPassword = ref("");
    const showPassword = ref(false);
    const isLoading = ref(false);
    const error = ref(null);
    const success = ref(false);
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
      const _component_AppLogo = __nuxt_component_0;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$8;
      const _component_UCard = _sfc_main$1;
      const _component_UFormField = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_UAlert = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center px-4 py-12" }, _attrs))}><div class="w-full max-w-md"><div class="mb-8 text-center">`);
      _push(ssrRenderComponent(_component_AppLogo, { class: "mx-auto mb-4 h-10 w-auto" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold">Choose a new password</h1></div>`);
      if (unref(success)) {
        _push(`<div class="text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-circle-check",
          class: "text-primary mx-auto mb-4 h-12 w-12"
        }, null, _parent));
        _push(`<h2 class="mb-2 text-xl font-bold">Password updated!</h2><p class="text-muted mb-8 text-sm">You can now sign in with your new password.</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/login",
          class: "w-full justify-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Sign in`);
            } else {
              return [
                createTextVNode("Sign in")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_UCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<form class="space-y-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UFormField, {
                label: "New password",
                name: "newPassword"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(newPassword),
                      "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                      type: unref(showPassword) ? "text" : "password",
                      placeholder: "Your new password",
                      autocomplete: "new-password",
                      required: "",
                      class: "w-full"
                    }, {
                      trailing: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UButton, {
                            variant: "ghost",
                            size: "sm",
                            icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                            "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                            onClick: ($event) => showPassword.value = !unref(showPassword)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UButton, {
                              variant: "ghost",
                              size: "sm",
                              icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                              "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                              onClick: ($event) => showPassword.value = !unref(showPassword)
                            }, null, 8, ["icon", "aria-label", "onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(newPassword),
                        "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                        type: unref(showPassword) ? "text" : "password",
                        placeholder: "Your new password",
                        autocomplete: "new-password",
                        required: "",
                        class: "w-full"
                      }, {
                        trailing: withCtx(() => [
                          createVNode(_component_UButton, {
                            variant: "ghost",
                            size: "sm",
                            icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                            "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                            onClick: ($event) => showPassword.value = !unref(showPassword)
                          }, null, 8, ["icon", "aria-label", "onClick"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(error)) {
                _push2(ssrRenderComponent(_component_UAlert, {
                  color: "error",
                  description: unref(error)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_UButton, {
                type: "submit",
                class: "w-full justify-center",
                loading: unref(isLoading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Set new password `);
                  } else {
                    return [
                      createTextVNode(" Set new password ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</form>`);
            } else {
              return [
                createVNode("form", {
                  class: "space-y-4",
                  onSubmit: withModifiers(onSubmit, ["prevent"])
                }, [
                  createVNode(_component_UFormField, {
                    label: "New password",
                    name: "newPassword"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(newPassword),
                        "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                        type: unref(showPassword) ? "text" : "password",
                        placeholder: "Your new password",
                        autocomplete: "new-password",
                        required: "",
                        class: "w-full"
                      }, {
                        trailing: withCtx(() => [
                          createVNode(_component_UButton, {
                            variant: "ghost",
                            size: "sm",
                            icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                            "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                            onClick: ($event) => showPassword.value = !unref(showPassword)
                          }, null, 8, ["icon", "aria-label", "onClick"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                    ]),
                    _: 1
                  }),
                  unref(error) ? (openBlock(), createBlock(_component_UAlert, {
                    key: 0,
                    color: "error",
                    description: unref(error)
                  }, null, 8, ["description"])) : createCommentVNode("", true),
                  createVNode(_component_UButton, {
                    type: "submit",
                    class: "w-full justify-center",
                    loading: unref(isLoading)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Set new password ")
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
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password/confirm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=confirm-zRq46PRA.mjs.map
