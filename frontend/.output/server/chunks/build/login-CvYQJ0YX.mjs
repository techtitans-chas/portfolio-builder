import { _ as __nuxt_component_0 } from './AppLogo-0DVehps_.mjs';
import { _ as _sfc_main$1 } from './Card-uQKN-I-u.mjs';
import { _ as _sfc_main$2 } from './Form-JEaegfpv.mjs';
import { _ as _sfc_main$3 } from './FormField-9wkfNHPa.mjs';
import { _ as _sfc_main$4 } from './Input-DWHPzDmy.mjs';
import { a8 as useRoute, f as _sfc_main$8, _ as __nuxt_component_0$1, K as navigateTo } from './server.mjs';
import { _ as _sfc_main$5 } from './Alert-Nv5RlKkm.mjs';
import { defineComponent, reactive, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { z } from 'zod';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import '@vueuse/core';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const schema = z.object({
      email: z.email("Invalid email address"),
      password: z.string().min(1, "Password is required")
    });
    const { fetcher } = useApi();
    const route = useRoute();
    const state = reactive({ email: "", password: "" });
    const showPassword = ref(false);
    const isLoading = ref(false);
    const error = ref(null);
    async function onSubmit() {
      error.value = null;
      isLoading.value = true;
      try {
        await fetcher("/api/auth/sign-in/email", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ email: state.email, password: state.password })
        });
        const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/admin";
        await navigateTo(redirect);
      } catch {
        error.value = "Invalid email or password.";
      } finally {
        isLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLogo = __nuxt_component_0;
      const _component_UCard = _sfc_main$1;
      const _component_UForm = _sfc_main$2;
      const _component_UFormField = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_UButton = _sfc_main$8;
      const _component_UAlert = _sfc_main$5;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center px-4 py-12" }, _attrs))}><div class="w-full max-w-md"><div class="mb-8 text-center">`);
      _push(ssrRenderComponent(_component_AppLogo, { class: "mx-auto mb-4 h-10 w-auto" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold">Sign in</h1><p class="text-muted mt-1 text-sm">Welcome back</p></div>`);
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
                    label: "Email",
                    name: "email"
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
                    label: "Password",
                    name: "password"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          type: unref(showPassword) ? "text" : "password",
                          placeholder: "Your password",
                          autocomplete: "current-password",
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
                            placeholder: "Your password",
                            autocomplete: "current-password",
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
                  if (unref(error)) {
                    _push3(ssrRenderComponent(_component_UAlert, {
                      color: "error",
                      description: unref(error)
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
                        _push4(` Sign in `);
                      } else {
                        return [
                          createTextVNode(" Sign in ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex flex-col items-center gap-1 text-center text-sm"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/reset-password",
                    class: "text-muted hover:text-primary hover:underline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Forgot your password? `);
                      } else {
                        return [
                          createTextVNode(" Forgot your password? ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-muted"${_scopeId2}> Don&#39;t have an account? `);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/register",
                    class: "text-primary font-medium hover:underline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Create one `);
                      } else {
                        return [
                          createTextVNode(" Create one ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</p></div>`);
                } else {
                  return [
                    createVNode(_component_UFormField, {
                      label: "Email",
                      name: "email"
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
                    }),
                    createVNode(_component_UFormField, {
                      label: "Password",
                      name: "password"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          type: unref(showPassword) ? "text" : "password",
                          placeholder: "Your password",
                          autocomplete: "current-password",
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
                        createTextVNode(" Sign in ")
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    createVNode("div", { class: "flex flex-col items-center gap-1 text-center text-sm" }, [
                      createVNode(_component_NuxtLink, {
                        to: "/reset-password",
                        class: "text-muted hover:text-primary hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Forgot your password? ")
                        ]),
                        _: 1
                      }),
                      createVNode("p", { class: "text-muted" }, [
                        createTextVNode(" Don't have an account? "),
                        createVNode(_component_NuxtLink, {
                          to: "/register",
                          class: "text-primary font-medium hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Create one ")
                          ]),
                          _: 1
                        })
                      ])
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
                    label: "Email",
                    name: "email"
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
                  }),
                  createVNode(_component_UFormField, {
                    label: "Password",
                    name: "password"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(state).password,
                        "onUpdate:modelValue": ($event) => unref(state).password = $event,
                        type: unref(showPassword) ? "text" : "password",
                        placeholder: "Your password",
                        autocomplete: "current-password",
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
                      createTextVNode(" Sign in ")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode("div", { class: "flex flex-col items-center gap-1 text-center text-sm" }, [
                    createVNode(_component_NuxtLink, {
                      to: "/reset-password",
                      class: "text-muted hover:text-primary hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Forgot your password? ")
                      ]),
                      _: 1
                    }),
                    createVNode("p", { class: "text-muted" }, [
                      createTextVNode(" Don't have an account? "),
                      createVNode(_component_NuxtLink, {
                        to: "/register",
                        class: "text-primary font-medium hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Create one ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["schema", "state"])
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
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CvYQJ0YX.mjs.map
