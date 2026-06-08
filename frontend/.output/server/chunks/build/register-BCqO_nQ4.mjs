import { _ as __nuxt_component_0 } from './AppLogo-0DVehps_.mjs';
import { _ as _sfc_main$2 } from './Card-uQKN-I-u.mjs';
import { O as useAsyncData, e as _sfc_main$d, f as _sfc_main$8, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, reactive, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$3 } from './Form-JEaegfpv.mjs';
import { _ as _sfc_main$4 } from './FormField-9wkfNHPa.mjs';
import { _ as _sfc_main$5 } from './Input-DWHPzDmy.mjs';
import { _ as _sfc_main$6 } from './Alert-Nv5RlKkm.mjs';
import { z } from 'zod';
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

z.object({
  status: z.enum(["healthy", "unhealthy"]),
  timestamp: z.string().datetime(),
  service: z.string(),
  version: z.string().optional(),
  features: z.object({
    storage: z.boolean(),
    email: z.boolean()
  }).optional()
});
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  slug: z.string().min(2, "Slug must be at least 2 characters").max(64, "Slug must be 64 characters or fewer").regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
z.object({
  // Server
  PORT: z.string().optional(),
  // Database — required, backend cannot start without it
  DATABASE_URL: z.string().min(1),
  // Auth — required
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().min(1),
  FRONTEND_URL: z.string().min(1),
  // Email — optional, disables email features when absent
  RESEND_API_KEY: z.string().optional(),
  // Cloudflare R2 — all-or-nothing: either all three are set or none
  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET_NAME: z.string().optional(),
  R2_PUBLIC_URL: z.string().optional()
});
z.object({
  // Public API URL used by the browser
  NUXT_PUBLIC_API_URL: z.string().optional(),
  // Server-side API URL (Docker / SSR) — falls back to NUXT_PUBLIC_API_URL
  NUXT_API_URL: z.string().optional(),
  FRONTEND_URL: z.string().optional()
});

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "VerificationSuccessful",
  __ssrInlineRender: true,
  props: {
    email: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$2;
      const _component_UIcon = _sfc_main$d;
      _push(ssrRenderComponent(_component_UCard, mergeProps({ class: "text-center" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-mail-check",
              class: "text-primary mx-auto mb-3 h-10 w-10"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="mb-1 text-lg font-semibold"${_scopeId}>Check your email</h2><div class="text-muted text-sm"${_scopeId}><p${_scopeId}>We sent a verification link to:</p><p${_scopeId}><strong${_scopeId}>${ssrInterpolate(__props.email)}</strong></p><p${_scopeId}>Click the link to activate your account.</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-4" }, [
                createVNode(_component_UIcon, {
                  name: "i-lucide-mail-check",
                  class: "text-primary mx-auto mb-3 h-10 w-10"
                }),
                createVNode("h2", { class: "mb-1 text-lg font-semibold" }, "Check your email"),
                createVNode("div", { class: "text-muted text-sm" }, [
                  createVNode("p", null, "We sent a verification link to:"),
                  createVNode("p", null, [
                    createVNode("strong", null, toDisplayString(__props.email), 1)
                  ]),
                  createVNode("p", null, "Click the link to activate your account.")
                ])
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
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/VerificationSuccessful.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "AuthVerificationSuccessful" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const schema = registerSchema;
    const { fetcher, apiBase } = useApi();
    const { data: registrationClosed } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("registration-status", async () => {
      const res = await fetch(`${apiBase}/api/auth/register`, { method: "POST" });
      return res.status === 503;
    })), __temp = await __temp, __restore(), __temp);
    const state = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      slug: ""
    });
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const isLoading = ref(false);
    const success = ref(false);
    const serverError = ref(null);
    const fieldErrors = ref({});
    async function onSubmit() {
      serverError.value = null;
      fieldErrors.value = {};
      isLoading.value = true;
      try {
        await fetcher("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(state)
        });
        success.value = true;
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 409) {
            const msg = err.message.toLowerCase();
            if (msg.includes("email")) {
              fieldErrors.value.email = err.message;
            } else if (msg.includes("slug") || msg.includes("url")) {
              fieldErrors.value.slug = err.message;
            } else {
              serverError.value = err.message;
            }
          } else if (err.status === 400) {
            const issues = err.data?.issues;
            if (issues) {
              for (const issue of issues) {
                const field = issue.path;
                if (field in state) fieldErrors.value[field] = issue.message;
              }
            }
          } else {
            serverError.value = err.message || "Something went wrong. Please try again.";
          }
        } else {
          serverError.value = "Could not connect to the server. Please try again.";
        }
      } finally {
        isLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      const _component_UCard = _sfc_main$2;
      const _component_UIcon = _sfc_main$d;
      const _component_AuthVerificationSuccessful = __nuxt_component_3;
      const _component_UForm = _sfc_main$3;
      const _component_UFormField = _sfc_main$4;
      const _component_UInput = _sfc_main$5;
      const _component_UButton = _sfc_main$8;
      const _component_UAlert = _sfc_main$6;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center px-4 py-12" }, _attrs))}><div class="w-full max-w-md"><div class="mb-8 text-center">`);
      _push(ssrRenderComponent(_component_AppLogo, { class: "mx-auto mb-4 h-10 w-auto" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold">Create your account</h1><p class="text-muted mt-1 text-sm">Start building your portfolio today</p></div>`);
      if (unref(registrationClosed)) {
        _push(ssrRenderComponent(_component_UCard, { class: "text-center" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="py-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-lock",
                class: "text-muted mx-auto mb-3 h-10 w-10"
              }, null, _parent2, _scopeId));
              _push2(`<p class="font-medium"${_scopeId}>Registration is currently closed.</p></div>`);
            } else {
              return [
                createVNode("div", { class: "py-4" }, [
                  createVNode(_component_UIcon, {
                    name: "i-lucide-lock",
                    class: "text-muted mx-auto mb-3 h-10 w-10"
                  }),
                  createVNode("p", { class: "font-medium" }, "Registration is currently closed.")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (unref(success)) {
        _push(ssrRenderComponent(_component_AuthVerificationSuccessful, {
          email: unref(state).email
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_UCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UForm, {
                schema: unref(schema),
                state: unref(state),
                class: "space-y-4",
                onSubmit
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: "Name",
                      name: "name",
                      error: unref(fieldErrors).name
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInput, {
                            modelValue: unref(state).name,
                            "onUpdate:modelValue": ($event) => unref(state).name = $event,
                            placeholder: "Your name",
                            autocomplete: "name",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              modelValue: unref(state).name,
                              "onUpdate:modelValue": ($event) => unref(state).name = $event,
                              placeholder: "Your name",
                              autocomplete: "name",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: "Email",
                      name: "email",
                      error: unref(fieldErrors).email
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            type: "email",
                            placeholder: "you@example.com",
                            autocomplete: "email",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              modelValue: unref(state).email,
                              "onUpdate:modelValue": ($event) => unref(state).email = $event,
                              type: "email",
                              placeholder: "you@example.com",
                              autocomplete: "email",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: "Portfolio URL",
                      name: "slug",
                      error: unref(fieldErrors).slug
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInput, {
                            modelValue: unref(state).slug,
                            "onUpdate:modelValue": ($event) => unref(state).slug = $event,
                            placeholder: "my-portfolio",
                            class: "w-full",
                            ui: {
                              base: "pl-21",
                              leading: "pointer-events-none"
                            }
                          }, {
                            leading: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="text-muted text-sm"${_scopeId4}>folio.app/u/</span>`);
                              } else {
                                return [
                                  createVNode("span", { class: "text-muted text-sm" }, "folio.app/u/")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              modelValue: unref(state).slug,
                              "onUpdate:modelValue": ($event) => unref(state).slug = $event,
                              placeholder: "my-portfolio",
                              class: "w-full",
                              ui: {
                                base: "pl-21",
                                leading: "pointer-events-none"
                              }
                            }, {
                              leading: withCtx(() => [
                                createVNode("span", { class: "text-muted text-sm" }, "folio.app/u/")
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: "Password",
                      name: "password",
                      error: unref(fieldErrors).password
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInput, {
                            modelValue: unref(state).password,
                            "onUpdate:modelValue": ($event) => unref(state).password = $event,
                            type: unref(showPassword) ? "text" : "password",
                            placeholder: "Min. 8 characters",
                            autocomplete: "new-password",
                            class: "w-full"
                          }, {
                            trailing: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UButton, {
                                  variant: "ghost",
                                  size: "sm",
                                  icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                  "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                                  onClick: ($event) => showPassword.value = !unref(showPassword)
                                }, null, _parent5, _scopeId4));
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
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              modelValue: unref(state).password,
                              "onUpdate:modelValue": ($event) => unref(state).password = $event,
                              type: unref(showPassword) ? "text" : "password",
                              placeholder: "Min. 8 characters",
                              autocomplete: "new-password",
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: "Confirm password",
                      name: "confirmPassword",
                      error: unref(fieldErrors).confirmPassword
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInput, {
                            modelValue: unref(state).confirmPassword,
                            "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                            type: unref(showConfirmPassword) ? "text" : "password",
                            placeholder: "Repeat your password",
                            autocomplete: "new-password",
                            class: "w-full"
                          }, {
                            trailing: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UButton, {
                                  variant: "ghost",
                                  size: "sm",
                                  icon: unref(showConfirmPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                  "aria-label": unref(showConfirmPassword) ? "Hide password" : "Show password",
                                  onClick: ($event) => showConfirmPassword.value = !unref(showConfirmPassword)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UButton, {
                                    variant: "ghost",
                                    size: "sm",
                                    icon: unref(showConfirmPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                    "aria-label": unref(showConfirmPassword) ? "Hide password" : "Show password",
                                    onClick: ($event) => showConfirmPassword.value = !unref(showConfirmPassword)
                                  }, null, 8, ["icon", "aria-label", "onClick"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              modelValue: unref(state).confirmPassword,
                              "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                              type: unref(showConfirmPassword) ? "text" : "password",
                              placeholder: "Repeat your password",
                              autocomplete: "new-password",
                              class: "w-full"
                            }, {
                              trailing: withCtx(() => [
                                createVNode(_component_UButton, {
                                  variant: "ghost",
                                  size: "sm",
                                  icon: unref(showConfirmPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                  "aria-label": unref(showConfirmPassword) ? "Hide password" : "Show password",
                                  onClick: ($event) => showConfirmPassword.value = !unref(showConfirmPassword)
                                }, null, 8, ["icon", "aria-label", "onClick"])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (unref(serverError)) {
                      _push3(ssrRenderComponent(_component_UAlert, {
                        color: "error",
                        description: unref(serverError)
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_UButton, {
                      type: "submit",
                      class: "w-full justify-center",
                      loading: unref(isLoading)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Create account `);
                        } else {
                          return [
                            createTextVNode(" Create account ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<p class="text-muted text-center text-sm"${_scopeId2}> Already have an account? `);
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: "/login",
                      class: "text-primary font-medium hover:underline"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Sign in `);
                        } else {
                          return [
                            createTextVNode(" Sign in ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</p>`);
                  } else {
                    return [
                      createVNode(_component_UFormField, {
                        label: "Name",
                        name: "name",
                        error: unref(fieldErrors).name
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).name,
                            "onUpdate:modelValue": ($event) => unref(state).name = $event,
                            placeholder: "Your name",
                            autocomplete: "name",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }, 8, ["error"]),
                      createVNode(_component_UFormField, {
                        label: "Email",
                        name: "email",
                        error: unref(fieldErrors).email
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            type: "email",
                            placeholder: "you@example.com",
                            autocomplete: "email",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }, 8, ["error"]),
                      createVNode(_component_UFormField, {
                        label: "Portfolio URL",
                        name: "slug",
                        error: unref(fieldErrors).slug
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).slug,
                            "onUpdate:modelValue": ($event) => unref(state).slug = $event,
                            placeholder: "my-portfolio",
                            class: "w-full",
                            ui: {
                              base: "pl-21",
                              leading: "pointer-events-none"
                            }
                          }, {
                            leading: withCtx(() => [
                              createVNode("span", { class: "text-muted text-sm" }, "folio.app/u/")
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }, 8, ["error"]),
                      createVNode(_component_UFormField, {
                        label: "Password",
                        name: "password",
                        error: unref(fieldErrors).password
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).password,
                            "onUpdate:modelValue": ($event) => unref(state).password = $event,
                            type: unref(showPassword) ? "text" : "password",
                            placeholder: "Min. 8 characters",
                            autocomplete: "new-password",
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
                      }, 8, ["error"]),
                      createVNode(_component_UFormField, {
                        label: "Confirm password",
                        name: "confirmPassword",
                        error: unref(fieldErrors).confirmPassword
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).confirmPassword,
                            "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                            type: unref(showConfirmPassword) ? "text" : "password",
                            placeholder: "Repeat your password",
                            autocomplete: "new-password",
                            class: "w-full"
                          }, {
                            trailing: withCtx(() => [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                size: "sm",
                                icon: unref(showConfirmPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                "aria-label": unref(showConfirmPassword) ? "Hide password" : "Show password",
                                onClick: ($event) => showConfirmPassword.value = !unref(showConfirmPassword)
                              }, null, 8, ["icon", "aria-label", "onClick"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                        ]),
                        _: 1
                      }, 8, ["error"]),
                      unref(serverError) ? (openBlock(), createBlock(_component_UAlert, {
                        key: 0,
                        color: "error",
                        description: unref(serverError)
                      }, null, 8, ["description"])) : createCommentVNode("", true),
                      createVNode(_component_UButton, {
                        type: "submit",
                        class: "w-full justify-center",
                        loading: unref(isLoading)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Create account ")
                        ]),
                        _: 1
                      }, 8, ["loading"]),
                      createVNode("p", { class: "text-muted text-center text-sm" }, [
                        createTextVNode(" Already have an account? "),
                        createVNode(_component_NuxtLink, {
                          to: "/login",
                          class: "text-primary font-medium hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Sign in ")
                          ]),
                          _: 1
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UForm, {
                  schema: unref(schema),
                  state: unref(state),
                  class: "space-y-4",
                  onSubmit
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UFormField, {
                      label: "Name",
                      name: "name",
                      error: unref(fieldErrors).name
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).name,
                          "onUpdate:modelValue": ($event) => unref(state).name = $event,
                          placeholder: "Your name",
                          autocomplete: "name",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }, 8, ["error"]),
                    createVNode(_component_UFormField, {
                      label: "Email",
                      name: "email",
                      error: unref(fieldErrors).email
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          type: "email",
                          placeholder: "you@example.com",
                          autocomplete: "email",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }, 8, ["error"]),
                    createVNode(_component_UFormField, {
                      label: "Portfolio URL",
                      name: "slug",
                      error: unref(fieldErrors).slug
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).slug,
                          "onUpdate:modelValue": ($event) => unref(state).slug = $event,
                          placeholder: "my-portfolio",
                          class: "w-full",
                          ui: {
                            base: "pl-21",
                            leading: "pointer-events-none"
                          }
                        }, {
                          leading: withCtx(() => [
                            createVNode("span", { class: "text-muted text-sm" }, "folio.app/u/")
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }, 8, ["error"]),
                    createVNode(_component_UFormField, {
                      label: "Password",
                      name: "password",
                      error: unref(fieldErrors).password
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          type: unref(showPassword) ? "text" : "password",
                          placeholder: "Min. 8 characters",
                          autocomplete: "new-password",
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
                    }, 8, ["error"]),
                    createVNode(_component_UFormField, {
                      label: "Confirm password",
                      name: "confirmPassword",
                      error: unref(fieldErrors).confirmPassword
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).confirmPassword,
                          "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                          type: unref(showConfirmPassword) ? "text" : "password",
                          placeholder: "Repeat your password",
                          autocomplete: "new-password",
                          class: "w-full"
                        }, {
                          trailing: withCtx(() => [
                            createVNode(_component_UButton, {
                              variant: "ghost",
                              size: "sm",
                              icon: unref(showConfirmPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                              "aria-label": unref(showConfirmPassword) ? "Hide password" : "Show password",
                              onClick: ($event) => showConfirmPassword.value = !unref(showConfirmPassword)
                            }, null, 8, ["icon", "aria-label", "onClick"])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                      ]),
                      _: 1
                    }, 8, ["error"]),
                    unref(serverError) ? (openBlock(), createBlock(_component_UAlert, {
                      key: 0,
                      color: "error",
                      description: unref(serverError)
                    }, null, 8, ["description"])) : createCommentVNode("", true),
                    createVNode(_component_UButton, {
                      type: "submit",
                      class: "w-full justify-center",
                      loading: unref(isLoading)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Create account ")
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    createVNode("p", { class: "text-muted text-center text-sm" }, [
                      createTextVNode(" Already have an account? "),
                      createVNode(_component_NuxtLink, {
                        to: "/login",
                        class: "text-primary font-medium hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Sign in ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }, 8, ["schema", "state"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-BCqO_nQ4.mjs.map
