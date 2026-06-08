import { _ as __nuxt_component_0 } from './PageStructure-K8uU1ezD.mjs';
import { _ as _sfc_main$1 } from './Form-JEaegfpv.mjs';
import { b as _sfc_main$2, a as _sfc_main$1$1, _ as __nuxt_component_11 } from './MediaPickerModal-CIxpt8n3.mjs';
import { _ as _sfc_main$3 } from './FormField-9wkfNHPa.mjs';
import { _ as _sfc_main$4 } from './Input-DWHPzDmy.mjs';
import { _ as _sfc_main$5 } from './Separator-CgixisDT.mjs';
import { _ as _sfc_main$6 } from './Alert-Nv5RlKkm.mjs';
import { f as _sfc_main$8 } from './server.mjs';
import { defineComponent, withAsyncContext, reactive, watch, ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withModifiers, isRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useCurrentUser } from './useCurrentUser-0x7hmjnh.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { u as useUnsavedChanges } from './useUnsavedChanges-CbDvifmB.mjs';
import './PageWrapper-dRmsqRwL.mjs';
import './DashboardSidebarToggle-uAAQWn-6.mjs';
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
import 'consola';
import './Container-CXQFSuFJ.mjs';
import './MediaGrid-DBtVJH5B.mjs';
import './PopperArrow-CVyIWJ6M.mjs';
import '@vueuse/shared';
import '@floating-ui/vue';
import './overlay-BWwBD9XH.mjs';
import 'aria-hidden';
import './Modal-D9bZkufO.mjs';
import './useServerFeatures-DOIxALfL.mjs';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'perfect-debounce';
import 'tailwind-variants';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "site-settings",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { portfolio, fetch: fetchUser, clear: clearUser } = useCurrentUser();
    const { fetcher } = useApi();
    [__temp, __restore] = withAsyncContext(() => fetchUser()), await __temp, __restore();
    const form = reactive({
      isPublished: false,
      title: "",
      slug: "",
      description: "",
      ogImageUrl: "",
      seoTitle: "",
      seoDescription: "",
      logoLight: "",
      logoDark: ""
    });
    watch(
      portfolio,
      (p) => {
        if (!p) return;
        const seoMeta = p.seoMeta;
        const themeSettings = p.themeSettings;
        form.isPublished = p.isPublished ?? false;
        form.title = p.title ?? "";
        form.slug = p.slug ?? "";
        form.description = p.description ?? "";
        form.ogImageUrl = p.ogImageUrl ?? "";
        form.seoTitle = seoMeta?.seoTitle ?? "";
        form.seoDescription = seoMeta?.seoDescription ?? "";
        form.logoLight = themeSettings?.logoLight ?? "";
        form.logoDark = themeSettings?.logoDark ?? "";
      },
      { immediate: true }
    );
    const { markSaved } = useUnsavedChanges(form);
    const successMessage = ref("");
    const errorMessage = ref("");
    const saving = ref(false);
    const ogImagePickerOpen = ref(false);
    const logoLightPickerOpen = ref(false);
    const logoDarkPickerOpen = ref(false);
    async function save() {
      if (!portfolio.value?.id) return;
      saving.value = true;
      successMessage.value = "";
      errorMessage.value = "";
      const existingThemeSettings = portfolio.value.themeSettings;
      try {
        await fetcher(`/api/portfolios/${portfolio.value.id}/settings`, {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({
            isPublished: form.isPublished,
            title: form.title || null,
            slug: form.slug || null,
            description: form.description || null,
            ogImageUrl: form.ogImageUrl || null,
            seoMeta: {
              seoTitle: form.seoTitle || null,
              seoDescription: form.seoDescription || null
            },
            themeSettings: {
              ...existingThemeSettings,
              logoLight: form.logoLight || null,
              logoDark: form.logoDark || null
            }
          })
        });
        clearUser();
        await fetchUser();
        markSaved();
        successMessage.value = "Settings saved.";
      } catch (e) {
        errorMessage.value = e instanceof Error ? e.message : "Failed to save settings.";
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminLayoutPageStructure = __nuxt_component_0;
      const _component_UForm = _sfc_main$1;
      const _component_USwitch = _sfc_main$2;
      const _component_UFormField = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_UTextarea = _sfc_main$1$1;
      const _component_USeparator = _sfc_main$5;
      const _component_UAlert = _sfc_main$6;
      const _component_UButton = _sfc_main$8;
      const _component_AdminMediaPickerModal = __nuxt_component_11;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AdminLayoutPageStructure, {
        title: "Site settings",
        description: "Configure your portfolio."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UForm, {
              class: "max-w-md space-y-4",
              onSubmit: save
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USwitch, {
                    modelValue: unref(form).isPublished,
                    "onUpdate:modelValue": ($event) => unref(form).isPublished = $event,
                    label: "Publish site",
                    description: "Your portfolio will be publicly available."
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Portfolio title",
                    name: "title"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          placeholder: "My Portfolio",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).title,
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            placeholder: "My Portfolio",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "URL",
                    name: "slug"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(form).slug,
                          "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                          placeholder: "my-portfolio",
                          class: "w-full",
                          ui: { base: "pl-21", leading: "pointer-events-none" }
                        }, {
                          leading: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-muted text-sm"${_scopeId4}>folio.app/p/</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "text-muted text-sm" }, "folio.app/p/")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).slug,
                            "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                            placeholder: "my-portfolio",
                            class: "w-full",
                            ui: { base: "pl-21", leading: "pointer-events-none" }
                          }, {
                            leading: withCtx(() => [
                              createVNode("span", { class: "text-muted text-sm" }, "folio.app/p/")
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Description",
                    name: "description"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UTextarea, {
                          modelValue: unref(form).description,
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          placeholder: "A short description of your portfolio.",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UTextarea, {
                            modelValue: unref(form).description,
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            placeholder: "A short description of your portfolio.",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_USeparator, { class: "mt-8 mb-6" }, null, _parent3, _scopeId2));
                  _push3(`<h2 class="font-medium mb-2"${_scopeId2}>Logo</h2>`);
                  _push3(ssrRenderComponent(_component_UAlert, {
                    color: "neutral",
                    variant: "subtle",
                    title: "SVG or transparent PNG recommended.",
                    description: "Dark mode falls back to light logo if not set."
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="grid grid-cols-2 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Light mode",
                    name: "logoLight"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col gap-2 w-full"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UButton, {
                          icon: unref(form).logoLight ? "i-lucide-image" : "i-lucide-plus",
                          color: "neutral",
                          variant: "outline",
                          class: "w-full",
                          onClick: ($event) => logoLightPickerOpen.value = true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(form).logoLight ? "Change logo" : "Choose logo")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(form).logoLight ? "Change logo" : "Choose logo"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(form).logoLight) {
                          _push4(`<div class="relative rounded-md overflow-hidden border border-default bg-white flex items-center justify-center h-20 w-full"${_scopeId3}><img${ssrRenderAttr("src", unref(form).logoLight)} alt="" class="max-h-full max-w-full object-contain p-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UButton, {
                            icon: "i-lucide-x",
                            color: "neutral",
                            variant: "solid",
                            size: "xs",
                            class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                            "aria-label": "Remove light logo",
                            onClick: ($event) => unref(form).logoLight = ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                            createVNode(_component_UButton, {
                              icon: unref(form).logoLight ? "i-lucide-image" : "i-lucide-plus",
                              color: "neutral",
                              variant: "outline",
                              class: "w-full",
                              onClick: ($event) => logoLightPickerOpen.value = true
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(form).logoLight ? "Change logo" : "Choose logo"), 1)
                              ]),
                              _: 1
                            }, 8, ["icon", "onClick"]),
                            unref(form).logoLight ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "relative rounded-md overflow-hidden border border-default bg-white flex items-center justify-center h-20 w-full"
                            }, [
                              createVNode("img", {
                                src: unref(form).logoLight,
                                alt: "",
                                class: "max-h-full max-w-full object-contain p-2"
                              }, null, 8, ["src"]),
                              createVNode(_component_UButton, {
                                icon: "i-lucide-x",
                                color: "neutral",
                                variant: "solid",
                                size: "xs",
                                class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                                "aria-label": "Remove light logo",
                                onClick: ($event) => unref(form).logoLight = ""
                              }, null, 8, ["onClick"])
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Dark mode",
                    name: "logoDark"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col gap-2 w-full"${_scopeId3}>`);
                        if (unref(form).logoDark) {
                          _push4(`<div class="relative rounded-md overflow-hidden border border-default bg-gray-900 flex items-center justify-center h-20 w-full"${_scopeId3}><img${ssrRenderAttr("src", unref(form).logoDark)} alt="" class="max-h-full max-w-full object-contain p-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UButton, {
                            icon: "i-lucide-x",
                            color: "neutral",
                            variant: "solid",
                            size: "xs",
                            class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                            "aria-label": "Remove dark logo",
                            onClick: ($event) => unref(form).logoDark = ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_component_UButton, {
                          icon: unref(form).logoDark ? "i-lucide-image" : "i-lucide-plus",
                          color: "neutral",
                          variant: "outline",
                          class: "w-full",
                          onClick: ($event) => logoDarkPickerOpen.value = true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(form).logoDark ? "Change logo" : "Choose logo")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(form).logoDark ? "Change logo" : "Choose logo"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                            unref(form).logoDark ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "relative rounded-md overflow-hidden border border-default bg-gray-900 flex items-center justify-center h-20 w-full"
                            }, [
                              createVNode("img", {
                                src: unref(form).logoDark,
                                alt: "",
                                class: "max-h-full max-w-full object-contain p-2"
                              }, null, 8, ["src"]),
                              createVNode(_component_UButton, {
                                icon: "i-lucide-x",
                                color: "neutral",
                                variant: "solid",
                                size: "xs",
                                class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                                "aria-label": "Remove dark logo",
                                onClick: ($event) => unref(form).logoDark = ""
                              }, null, 8, ["onClick"])
                            ])) : createCommentVNode("", true),
                            createVNode(_component_UButton, {
                              icon: unref(form).logoDark ? "i-lucide-image" : "i-lucide-plus",
                              color: "neutral",
                              variant: "outline",
                              class: "w-full",
                              onClick: ($event) => logoDarkPickerOpen.value = true
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(form).logoDark ? "Change logo" : "Choose logo"), 1)
                              ]),
                              _: 1
                            }, 8, ["icon", "onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_USeparator, { class: "mt-8 mb-6" }, null, _parent3, _scopeId2));
                  _push3(`<h2 class="font-medium mb-2"${_scopeId2}>SEO</h2>`);
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "SEO title",
                    name: "seoTitle"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(form).seoTitle,
                          "onUpdate:modelValue": ($event) => unref(form).seoTitle = $event,
                          placeholder: "SEO title",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).seoTitle,
                            "onUpdate:modelValue": ($event) => unref(form).seoTitle = $event,
                            placeholder: "SEO title",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "SEO description",
                    name: "seoDescription"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UTextarea, {
                          modelValue: unref(form).seoDescription,
                          "onUpdate:modelValue": ($event) => unref(form).seoDescription = $event,
                          placeholder: "SEO description",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UTextarea, {
                            modelValue: unref(form).seoDescription,
                            "onUpdate:modelValue": ($event) => unref(form).seoDescription = $event,
                            placeholder: "SEO description",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "OG image",
                    name: "ogImageUrl",
                    description: "Image shown when your portfolio is shared on social media. Recommended size: 1200×630."
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col gap-2 w-full"${_scopeId3}>`);
                        if (unref(form).ogImageUrl) {
                          _push4(`<div class="relative rounded-md overflow-hidden border border-default aspect-video bg-muted w-full"${_scopeId3}><img${ssrRenderAttr("src", unref(form).ogImageUrl)} alt="" class="w-full h-full object-cover"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UButton, {
                            icon: "i-lucide-x",
                            color: "neutral",
                            variant: "solid",
                            size: "xs",
                            class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                            "aria-label": "Remove OG image",
                            onClick: ($event) => unref(form).ogImageUrl = ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_component_UButton, {
                          icon: unref(form).ogImageUrl ? "i-lucide-image" : "i-lucide-plus",
                          color: "neutral",
                          variant: "outline",
                          class: "w-full",
                          onClick: ($event) => ogImagePickerOpen.value = true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(form).ogImageUrl ? "Change image" : "Choose image")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(form).ogImageUrl ? "Change image" : "Choose image"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                            unref(form).ogImageUrl ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "relative rounded-md overflow-hidden border border-default aspect-video bg-muted w-full"
                            }, [
                              createVNode("img", {
                                src: unref(form).ogImageUrl,
                                alt: "",
                                class: "w-full h-full object-cover"
                              }, null, 8, ["src"]),
                              createVNode(_component_UButton, {
                                icon: "i-lucide-x",
                                color: "neutral",
                                variant: "solid",
                                size: "xs",
                                class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                                "aria-label": "Remove OG image",
                                onClick: ($event) => unref(form).ogImageUrl = ""
                              }, null, 8, ["onClick"])
                            ])) : createCommentVNode("", true),
                            createVNode(_component_UButton, {
                              icon: unref(form).ogImageUrl ? "i-lucide-image" : "i-lucide-plus",
                              color: "neutral",
                              variant: "outline",
                              class: "w-full",
                              onClick: ($event) => ogImagePickerOpen.value = true
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(form).ogImageUrl ? "Change image" : "Choose image"), 1)
                              ]),
                              _: 1
                            }, 8, ["icon", "onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(successMessage)) {
                    _push3(ssrRenderComponent(_component_UAlert, {
                      color: "success",
                      variant: "soft",
                      description: unref(successMessage)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(errorMessage)) {
                    _push3(ssrRenderComponent(_component_UAlert, {
                      color: "error",
                      variant: "soft",
                      description: unref(errorMessage)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    loading: unref(saving)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Save changes`);
                      } else {
                        return [
                          createTextVNode("Save changes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USwitch, {
                      modelValue: unref(form).isPublished,
                      "onUpdate:modelValue": ($event) => unref(form).isPublished = $event,
                      label: "Publish site",
                      description: "Your portfolio will be publicly available."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UFormField, {
                      label: "Portfolio title",
                      name: "title"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          placeholder: "My Portfolio",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "URL",
                      name: "slug"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(form).slug,
                          "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                          placeholder: "my-portfolio",
                          class: "w-full",
                          ui: { base: "pl-21", leading: "pointer-events-none" }
                        }, {
                          leading: withCtx(() => [
                            createVNode("span", { class: "text-muted text-sm" }, "folio.app/p/")
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "Description",
                      name: "description"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UTextarea, {
                          modelValue: unref(form).description,
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          placeholder: "A short description of your portfolio.",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                    createVNode("h2", { class: "font-medium mb-2" }, "Logo"),
                    createVNode(_component_UAlert, {
                      color: "neutral",
                      variant: "subtle",
                      title: "SVG or transparent PNG recommended.",
                      description: "Dark mode falls back to light logo if not set."
                    }),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode(_component_UFormField, {
                        label: "Light mode",
                        name: "logoLight"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                            createVNode(_component_UButton, {
                              icon: unref(form).logoLight ? "i-lucide-image" : "i-lucide-plus",
                              color: "neutral",
                              variant: "outline",
                              class: "w-full",
                              onClick: ($event) => logoLightPickerOpen.value = true
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(form).logoLight ? "Change logo" : "Choose logo"), 1)
                              ]),
                              _: 1
                            }, 8, ["icon", "onClick"]),
                            unref(form).logoLight ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "relative rounded-md overflow-hidden border border-default bg-white flex items-center justify-center h-20 w-full"
                            }, [
                              createVNode("img", {
                                src: unref(form).logoLight,
                                alt: "",
                                class: "max-h-full max-w-full object-contain p-2"
                              }, null, 8, ["src"]),
                              createVNode(_component_UButton, {
                                icon: "i-lucide-x",
                                color: "neutral",
                                variant: "solid",
                                size: "xs",
                                class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                                "aria-label": "Remove light logo",
                                onClick: ($event) => unref(form).logoLight = ""
                              }, null, 8, ["onClick"])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormField, {
                        label: "Dark mode",
                        name: "logoDark"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                            unref(form).logoDark ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "relative rounded-md overflow-hidden border border-default bg-gray-900 flex items-center justify-center h-20 w-full"
                            }, [
                              createVNode("img", {
                                src: unref(form).logoDark,
                                alt: "",
                                class: "max-h-full max-w-full object-contain p-2"
                              }, null, 8, ["src"]),
                              createVNode(_component_UButton, {
                                icon: "i-lucide-x",
                                color: "neutral",
                                variant: "solid",
                                size: "xs",
                                class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                                "aria-label": "Remove dark logo",
                                onClick: ($event) => unref(form).logoDark = ""
                              }, null, 8, ["onClick"])
                            ])) : createCommentVNode("", true),
                            createVNode(_component_UButton, {
                              icon: unref(form).logoDark ? "i-lucide-image" : "i-lucide-plus",
                              color: "neutral",
                              variant: "outline",
                              class: "w-full",
                              onClick: ($event) => logoDarkPickerOpen.value = true
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(form).logoDark ? "Change logo" : "Choose logo"), 1)
                              ]),
                              _: 1
                            }, 8, ["icon", "onClick"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                    createVNode("h2", { class: "font-medium mb-2" }, "SEO"),
                    createVNode(_component_UFormField, {
                      label: "SEO title",
                      name: "seoTitle"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(form).seoTitle,
                          "onUpdate:modelValue": ($event) => unref(form).seoTitle = $event,
                          placeholder: "SEO title",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "SEO description",
                      name: "seoDescription"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UTextarea, {
                          modelValue: unref(form).seoDescription,
                          "onUpdate:modelValue": ($event) => unref(form).seoDescription = $event,
                          placeholder: "SEO description",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "OG image",
                      name: "ogImageUrl",
                      description: "Image shown when your portfolio is shared on social media. Recommended size: 1200×630."
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                          unref(form).ogImageUrl ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative rounded-md overflow-hidden border border-default aspect-video bg-muted w-full"
                          }, [
                            createVNode("img", {
                              src: unref(form).ogImageUrl,
                              alt: "",
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src"]),
                            createVNode(_component_UButton, {
                              icon: "i-lucide-x",
                              color: "neutral",
                              variant: "solid",
                              size: "xs",
                              class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                              "aria-label": "Remove OG image",
                              onClick: ($event) => unref(form).ogImageUrl = ""
                            }, null, 8, ["onClick"])
                          ])) : createCommentVNode("", true),
                          createVNode(_component_UButton, {
                            icon: unref(form).ogImageUrl ? "i-lucide-image" : "i-lucide-plus",
                            color: "neutral",
                            variant: "outline",
                            class: "w-full",
                            onClick: ($event) => ogImagePickerOpen.value = true
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(form).ogImageUrl ? "Change image" : "Choose image"), 1)
                            ]),
                            _: 1
                          }, 8, ["icon", "onClick"])
                        ])
                      ]),
                      _: 1
                    }),
                    unref(successMessage) ? (openBlock(), createBlock(_component_UAlert, {
                      key: 0,
                      color: "success",
                      variant: "soft",
                      description: unref(successMessage)
                    }, null, 8, ["description"])) : createCommentVNode("", true),
                    unref(errorMessage) ? (openBlock(), createBlock(_component_UAlert, {
                      key: 1,
                      color: "error",
                      variant: "soft",
                      description: unref(errorMessage)
                    }, null, 8, ["description"])) : createCommentVNode("", true),
                    createVNode(_component_UButton, {
                      type: "submit",
                      loading: unref(saving)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Save changes")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UForm, {
                class: "max-w-md space-y-4",
                onSubmit: withModifiers(save, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_USwitch, {
                    modelValue: unref(form).isPublished,
                    "onUpdate:modelValue": ($event) => unref(form).isPublished = $event,
                    label: "Publish site",
                    description: "Your portfolio will be publicly available."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UFormField, {
                    label: "Portfolio title",
                    name: "title"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(form).title,
                        "onUpdate:modelValue": ($event) => unref(form).title = $event,
                        placeholder: "My Portfolio",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormField, {
                    label: "URL",
                    name: "slug"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(form).slug,
                        "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                        placeholder: "my-portfolio",
                        class: "w-full",
                        ui: { base: "pl-21", leading: "pointer-events-none" }
                      }, {
                        leading: withCtx(() => [
                          createVNode("span", { class: "text-muted text-sm" }, "folio.app/p/")
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormField, {
                    label: "Description",
                    name: "description"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UTextarea, {
                        modelValue: unref(form).description,
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        placeholder: "A short description of your portfolio.",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                  createVNode("h2", { class: "font-medium mb-2" }, "Logo"),
                  createVNode(_component_UAlert, {
                    color: "neutral",
                    variant: "subtle",
                    title: "SVG or transparent PNG recommended.",
                    description: "Dark mode falls back to light logo if not set."
                  }),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode(_component_UFormField, {
                      label: "Light mode",
                      name: "logoLight"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                          createVNode(_component_UButton, {
                            icon: unref(form).logoLight ? "i-lucide-image" : "i-lucide-plus",
                            color: "neutral",
                            variant: "outline",
                            class: "w-full",
                            onClick: ($event) => logoLightPickerOpen.value = true
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(form).logoLight ? "Change logo" : "Choose logo"), 1)
                            ]),
                            _: 1
                          }, 8, ["icon", "onClick"]),
                          unref(form).logoLight ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative rounded-md overflow-hidden border border-default bg-white flex items-center justify-center h-20 w-full"
                          }, [
                            createVNode("img", {
                              src: unref(form).logoLight,
                              alt: "",
                              class: "max-h-full max-w-full object-contain p-2"
                            }, null, 8, ["src"]),
                            createVNode(_component_UButton, {
                              icon: "i-lucide-x",
                              color: "neutral",
                              variant: "solid",
                              size: "xs",
                              class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                              "aria-label": "Remove light logo",
                              onClick: ($event) => unref(form).logoLight = ""
                            }, null, 8, ["onClick"])
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "Dark mode",
                      name: "logoDark"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                          unref(form).logoDark ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "relative rounded-md overflow-hidden border border-default bg-gray-900 flex items-center justify-center h-20 w-full"
                          }, [
                            createVNode("img", {
                              src: unref(form).logoDark,
                              alt: "",
                              class: "max-h-full max-w-full object-contain p-2"
                            }, null, 8, ["src"]),
                            createVNode(_component_UButton, {
                              icon: "i-lucide-x",
                              color: "neutral",
                              variant: "solid",
                              size: "xs",
                              class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                              "aria-label": "Remove dark logo",
                              onClick: ($event) => unref(form).logoDark = ""
                            }, null, 8, ["onClick"])
                          ])) : createCommentVNode("", true),
                          createVNode(_component_UButton, {
                            icon: unref(form).logoDark ? "i-lucide-image" : "i-lucide-plus",
                            color: "neutral",
                            variant: "outline",
                            class: "w-full",
                            onClick: ($event) => logoDarkPickerOpen.value = true
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(form).logoDark ? "Change logo" : "Choose logo"), 1)
                            ]),
                            _: 1
                          }, 8, ["icon", "onClick"])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                  createVNode("h2", { class: "font-medium mb-2" }, "SEO"),
                  createVNode(_component_UFormField, {
                    label: "SEO title",
                    name: "seoTitle"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(form).seoTitle,
                        "onUpdate:modelValue": ($event) => unref(form).seoTitle = $event,
                        placeholder: "SEO title",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormField, {
                    label: "SEO description",
                    name: "seoDescription"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UTextarea, {
                        modelValue: unref(form).seoDescription,
                        "onUpdate:modelValue": ($event) => unref(form).seoDescription = $event,
                        placeholder: "SEO description",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UFormField, {
                    label: "OG image",
                    name: "ogImageUrl",
                    description: "Image shown when your portfolio is shared on social media. Recommended size: 1200×630."
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                        unref(form).ogImageUrl ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "relative rounded-md overflow-hidden border border-default aspect-video bg-muted w-full"
                        }, [
                          createVNode("img", {
                            src: unref(form).ogImageUrl,
                            alt: "",
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"]),
                          createVNode(_component_UButton, {
                            icon: "i-lucide-x",
                            color: "neutral",
                            variant: "solid",
                            size: "xs",
                            class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                            "aria-label": "Remove OG image",
                            onClick: ($event) => unref(form).ogImageUrl = ""
                          }, null, 8, ["onClick"])
                        ])) : createCommentVNode("", true),
                        createVNode(_component_UButton, {
                          icon: unref(form).ogImageUrl ? "i-lucide-image" : "i-lucide-plus",
                          color: "neutral",
                          variant: "outline",
                          class: "w-full",
                          onClick: ($event) => ogImagePickerOpen.value = true
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(form).ogImageUrl ? "Change image" : "Choose image"), 1)
                          ]),
                          _: 1
                        }, 8, ["icon", "onClick"])
                      ])
                    ]),
                    _: 1
                  }),
                  unref(successMessage) ? (openBlock(), createBlock(_component_UAlert, {
                    key: 0,
                    color: "success",
                    variant: "soft",
                    description: unref(successMessage)
                  }, null, 8, ["description"])) : createCommentVNode("", true),
                  unref(errorMessage) ? (openBlock(), createBlock(_component_UAlert, {
                    key: 1,
                    color: "error",
                    variant: "soft",
                    description: unref(errorMessage)
                  }, null, 8, ["description"])) : createCommentVNode("", true),
                  createVNode(_component_UButton, {
                    type: "submit",
                    loading: unref(saving)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Save changes")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminMediaPickerModal, {
        open: unref(ogImagePickerOpen),
        "onUpdate:open": ($event) => isRef(ogImagePickerOpen) ? ogImagePickerOpen.value = $event : null,
        "images-only": "",
        "selected-url": unref(form).ogImageUrl || null,
        onSelect: (url) => unref(form).ogImageUrl = url
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminMediaPickerModal, {
        open: unref(logoLightPickerOpen),
        "onUpdate:open": ($event) => isRef(logoLightPickerOpen) ? logoLightPickerOpen.value = $event : null,
        "images-only": "",
        "selected-url": unref(form).logoLight || null,
        onSelect: (url) => unref(form).logoLight = url
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminMediaPickerModal, {
        open: unref(logoDarkPickerOpen),
        "onUpdate:open": ($event) => isRef(logoDarkPickerOpen) ? logoDarkPickerOpen.value = $event : null,
        "images-only": "",
        "selected-url": unref(form).logoDark || null,
        onSelect: (url) => unref(form).logoDark = url
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/site-settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=site-settings-LXwnemV1.mjs.map
