import { _ as __nuxt_component_1 } from './AppLogo-Bplyd4QI.mjs';
import { _ as _sfc_main$1 } from './Card-EP3E58RR.mjs';
import { _ as _sfc_main$2 } from './Form-DjodbAs7.mjs';
import { _ as _sfc_main$3 } from './FormField-Bwoy2x8u.mjs';
import { _ as _sfc_main$4 } from './Input-B_IU2Xmo.mjs';
import { av as useRoute, e as _sfc_main$8, _ as __nuxt_component_0$1, U as navigateTo } from './server.mjs';
import { _ as _sfc_main$5 } from './Alert-CsIjDkc0.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { o as vueExports, d as ssrRenderAttrs_1, f as ssrRenderComponent_1 } from '../routes/renderer.mjs';
import { o as object, s as string, e as email } from '../_/schemas.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const schema = object({
      email: email("Invalid email address"),
      password: string().min(1, "Password is required")
    });
    const { fetcher } = useApi();
    const route = useRoute();
    const state = vueExports.reactive({ email: "", password: "" });
    const showPassword = vueExports.ref(false);
    const isLoading = vueExports.ref(false);
    const error = vueExports.ref(null);
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
      const _component_AppLogo = __nuxt_component_1;
      const _component_UCard = _sfc_main$1;
      const _component_UForm = _sfc_main$2;
      const _component_UFormField = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_UButton = _sfc_main$8;
      const _component_UAlert = _sfc_main$5;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({ class: "flex min-h-screen items-center justify-center px-4 py-12" }, _attrs))}><div class="w-full max-w-md"><div class="mb-8 text-center">`);
      _push(ssrRenderComponent_1(_component_AppLogo, { class: "mx-auto mb-4 h-10 w-auto text-6xl rounded-sm" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold">Sign in</h1><p class="text-muted mt-1 text-sm">Welcome back</p></div>`);
      _push(ssrRenderComponent_1(_component_UCard, null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UForm, {
              schema: vueExports.unref(schema),
              state: vueExports.unref(state),
              class: "space-y-4",
              onSubmit
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "Email",
                    name: "email"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(state).email,
                          "onUpdate:modelValue": ($event) => vueExports.unref(state).email = $event,
                          type: "email",
                          placeholder: "you@example.com",
                          autocomplete: "email",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(state).email,
                            "onUpdate:modelValue": ($event) => vueExports.unref(state).email = $event,
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
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "Password",
                    name: "password"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(state).password,
                          "onUpdate:modelValue": ($event) => vueExports.unref(state).password = $event,
                          type: vueExports.unref(showPassword) ? "text" : "password",
                          placeholder: "Your password",
                          autocomplete: "current-password",
                          class: "w-full"
                        }, {
                          trailing: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent_1(_component_UButton, {
                                variant: "ghost",
                                size: "sm",
                                icon: vueExports.unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                "aria-label": vueExports.unref(showPassword) ? "Hide password" : "Show password",
                                onClick: ($event) => showPassword.value = !vueExports.unref(showPassword)
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(state).password,
                            "onUpdate:modelValue": ($event) => vueExports.unref(state).password = $event,
                            type: vueExports.unref(showPassword) ? "text" : "password",
                            placeholder: "Your password",
                            autocomplete: "current-password",
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
                  }, _parent3, _scopeId2));
                  if (vueExports.unref(error)) {
                    _push3(ssrRenderComponent_1(_component_UAlert, {
                      color: "error",
                      description: vueExports.unref(error)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    type: "submit",
                    class: "w-full justify-center",
                    loading: vueExports.unref(isLoading)
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Sign in `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Sign in ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex flex-col items-center gap-1 text-center text-sm"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_NuxtLink, {
                    to: "/reset-password",
                    class: "text-muted hover:text-primary hover:underline"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Forgot your password? `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Forgot your password? ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-muted"${_scopeId2}> Don&#39;t have an account? `);
                  _push3(ssrRenderComponent_1(_component_NuxtLink, {
                    to: "/register",
                    class: "text-primary font-medium hover:underline"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Create one `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Create one ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</p></div>`);
                } else {
                  return [
                    vueExports.createVNode(_component_UFormField, {
                      label: "Email",
                      name: "email"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(state).email,
                          "onUpdate:modelValue": ($event) => vueExports.unref(state).email = $event,
                          type: "email",
                          placeholder: "you@example.com",
                          autocomplete: "email",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "Password",
                      name: "password"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(state).password,
                          "onUpdate:modelValue": ($event) => vueExports.unref(state).password = $event,
                          type: vueExports.unref(showPassword) ? "text" : "password",
                          placeholder: "Your password",
                          autocomplete: "current-password",
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
                        vueExports.createTextVNode(" Sign in ")
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    vueExports.createVNode("div", { class: "flex flex-col items-center gap-1 text-center text-sm" }, [
                      vueExports.createVNode(_component_NuxtLink, {
                        to: "/reset-password",
                        class: "text-muted hover:text-primary hover:underline"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Forgot your password? ")
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode("p", { class: "text-muted" }, [
                        vueExports.createTextVNode(" Don't have an account? "),
                        vueExports.createVNode(_component_NuxtLink, {
                          to: "/register",
                          class: "text-primary font-medium hover:underline"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Create one ")
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
              vueExports.createVNode(_component_UForm, {
                schema: vueExports.unref(schema),
                state: vueExports.unref(state),
                class: "space-y-4",
                onSubmit
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UFormField, {
                    label: "Email",
                    name: "email"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(state).email,
                        "onUpdate:modelValue": ($event) => vueExports.unref(state).email = $event,
                        type: "email",
                        placeholder: "you@example.com",
                        autocomplete: "email",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UFormField, {
                    label: "Password",
                    name: "password"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(state).password,
                        "onUpdate:modelValue": ($event) => vueExports.unref(state).password = $event,
                        type: vueExports.unref(showPassword) ? "text" : "password",
                        placeholder: "Your password",
                        autocomplete: "current-password",
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
                      vueExports.createTextVNode(" Sign in ")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  vueExports.createVNode("div", { class: "flex flex-col items-center gap-1 text-center text-sm" }, [
                    vueExports.createVNode(_component_NuxtLink, {
                      to: "/reset-password",
                      class: "text-muted hover:text-primary hover:underline"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Forgot your password? ")
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode("p", { class: "text-muted" }, [
                      vueExports.createTextVNode(" Don't have an account? "),
                      vueExports.createVNode(_component_NuxtLink, {
                        to: "/register",
                        class: "text-primary font-medium hover:underline"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Create one ")
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
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-C9q-2fuK.mjs.map
