import { e as _sfc_main$d, f as _sfc_main$8, _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as _sfc_main$1 } from './Card-uQKN-I-u.mjs';
import { _ as _sfc_main$2 } from './FormField-9wkfNHPa.mjs';
import { _ as _sfc_main$3 } from './Input-DWHPzDmy.mjs';
import { _ as _sfc_main$4 } from './Alert-Nv5RlKkm.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, isRef, createVNode, createTextVNode, openBlock, createBlock, Fragment, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useApi, A as ApiError } from './useApi-KjbfWxXr.mjs';
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
  __name: "verify-email",
  __ssrInlineRender: true,
  setup(__props) {
    const { fetcher } = useApi();
    const email = ref("");
    const isLoading = ref(false);
    const success = ref(false);
    const error = ref(null);
    async function resendVerification() {
      if (!email.value) return;
      error.value = null;
      isLoading.value = true;
      try {
        await fetcher("/api/auth/send-verification-email", {
          method: "POST",
          body: JSON.stringify({ email: email.value })
        });
        success.value = true;
      } catch (err) {
        if (err instanceof ApiError) {
          error.value = err.message || "Failed to resend. Please try again.";
        } else {
          error.value = "Could not connect to the server. Please try again.";
        }
      } finally {
        isLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_UCard = _sfc_main$1;
      const _component_UFormField = _sfc_main$2;
      const _component_UInput = _sfc_main$3;
      const _component_UAlert = _sfc_main$4;
      const _component_UButton = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center px-4 py-12" }, _attrs))}><div class="w-full max-w-md text-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-mail",
        class: "text-primary mx-auto mb-4 h-12 w-12"
      }, null, _parent));
      _push(`<h1 class="mb-2 text-2xl font-bold">Verify your email</h1><p class="text-muted mb-8 text-sm"> We sent a verification link to your email address. Click the link to activate your account before signing in. </p>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="mb-4 text-sm font-medium"${_scopeId}>Didn&#39;t receive the email?</p>`);
            if (unref(success)) {
              _push2(`<div class="text-sm text-green-600"${_scopeId}> Verification email resent — check your inbox. </div>`);
            } else {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_UFormField, {
                label: "Your email address",
                name: "email",
                class: "mb-3 text-left"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                      type: "email",
                      placeholder: "you@example.com",
                      class: "w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UInput, {
                        modelValue: unref(email),
                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                        type: "email",
                        placeholder: "you@example.com",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(error)) {
                _push2(ssrRenderComponent(_component_UAlert, {
                  color: "error",
                  description: unref(error),
                  class: "mb-3"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_UButton, {
                class: "w-full justify-center",
                loading: unref(isLoading),
                disabled: !unref(email),
                onClick: resendVerification
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Resend verification email `);
                  } else {
                    return [
                      createTextVNode(" Resend verification email ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--]-->`);
            }
          } else {
            return [
              createVNode("p", { class: "mb-4 text-sm font-medium" }, "Didn't receive the email?"),
              unref(success) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-sm text-green-600"
              }, " Verification email resent — check your inbox. ")) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode(_component_UFormField, {
                  label: "Your email address",
                  name: "email",
                  class: "mb-3 text-left"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(email),
                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                      type: "email",
                      placeholder: "you@example.com",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                unref(error) ? (openBlock(), createBlock(_component_UAlert, {
                  key: 0,
                  color: "error",
                  description: unref(error),
                  class: "mb-3"
                }, null, 8, ["description"])) : createCommentVNode("", true),
                createVNode(_component_UButton, {
                  class: "w-full justify-center",
                  loading: unref(isLoading),
                  disabled: !unref(email),
                  onClick: resendVerification
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Resend verification email ")
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"])
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-muted mt-6 text-sm">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-primary font-medium hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Back to sign in `);
          } else {
            return [
              createTextVNode(" Back to sign in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/verify-email.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verify-email-DanzGbi4.mjs.map
