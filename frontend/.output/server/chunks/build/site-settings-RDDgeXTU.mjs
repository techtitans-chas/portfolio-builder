import { _ as __nuxt_component_0 } from './PageStructure-DGuBBy_1.mjs';
import { _ as _sfc_main$1 } from './Form-DjodbAs7.mjs';
import { b as _sfc_main$2, a as _sfc_main$1$1, _ as __nuxt_component_11 } from './MediaPickerModal-DP0Tm-L3.mjs';
import { _ as _sfc_main$3 } from './FormField-Bwoy2x8u.mjs';
import { _ as _sfc_main$4 } from './Input-B_IU2Xmo.mjs';
import { _ as _sfc_main$5 } from './Separator-Bd9m4VAI.mjs';
import { _ as _sfc_main$6 } from './Alert-CsIjDkc0.mjs';
import { e as _sfc_main$8 } from './server.mjs';
import { u as useCurrentUser } from './useCurrentUser-0x7hmjnh.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { u as useUnsavedChanges } from './useUnsavedChanges-CbDvifmB.mjs';
import { o as vueExports, f as ssrRenderComponent_1, a as ssrInterpolate_1, b as ssrRenderAttr_1 } from '../routes/renderer.mjs';
import './PageWrapper-upc4w-Lq.mjs';
import './DashboardSidebarToggle-DCHr3Kp6.mjs';
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
import './Container-BZ5KCJ-R.mjs';
import './MediaGrid-DqbzX4T2.mjs';
import './PopperArrow-CVyIWJ6M.mjs';
import './overlay-BWwBD9XH.mjs';
import './Modal-BBL-Wwu5.mjs';
import './useServerFeatures-DOIxALfL.mjs';
import '../_/shared.cjs.prod.mjs';
import 'node:stream';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "site-settings",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { portfolio, fetch: fetchUser, clear: clearUser } = useCurrentUser();
    const { fetcher } = useApi();
    [__temp, __restore] = vueExports.withAsyncContext(() => fetchUser()), await __temp, __restore();
    const form = vueExports.reactive({
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
    vueExports.watch(
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
    const successMessage = vueExports.ref("");
    const errorMessage = vueExports.ref("");
    const saving = vueExports.ref(false);
    const ogImagePickerOpen = vueExports.ref(false);
    const logoLightPickerOpen = vueExports.ref(false);
    const logoDarkPickerOpen = vueExports.ref(false);
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
            ...form.title && { title: form.title },
            ...form.slug && { slug: form.slug },
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
      _push(ssrRenderComponent_1(_component_AdminLayoutPageStructure, {
        title: "Site settings",
        description: "Configure your portfolio."
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UForm, {
              class: "max-w-md space-y-4",
              onSubmit: save
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_USwitch, {
                    modelValue: vueExports.unref(form).isPublished,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).isPublished = $event,
                    label: "Publish site",
                    description: "Your portfolio will be publicly available."
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "Portfolio title",
                    name: "title"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).title,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event,
                          placeholder: "My Portfolio",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).title,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event,
                            placeholder: "My Portfolio",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "URL",
                    name: "slug"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).slug,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).slug = $event,
                          placeholder: "my-portfolio",
                          class: "w-full",
                          ui: { base: "pl-8", leading: "pointer-events-none" }
                        }, {
                          leading: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="text-muted text-sm"${_scopeId4}>/p/</span>`);
                            } else {
                              return [
                                vueExports.createVNode("span", { class: "text-muted text-sm" }, "/p/")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).slug,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).slug = $event,
                            placeholder: "my-portfolio",
                            class: "w-full",
                            ui: { base: "pl-8", leading: "pointer-events-none" }
                          }, {
                            leading: vueExports.withCtx(() => [
                              vueExports.createVNode("span", { class: "text-muted text-sm" }, "/p/")
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "Description",
                    name: "description"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UTextarea, {
                          modelValue: vueExports.unref(form).description,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).description = $event,
                          placeholder: "A short description of your website.",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UTextarea, {
                            modelValue: vueExports.unref(form).description,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).description = $event,
                            placeholder: "A short description of your website.",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_USeparator, { class: "mt-8 mb-6" }, null, _parent3, _scopeId2));
                  _push3(`<h2 class="font-medium mb-2"${_scopeId2}>Logo</h2>`);
                  _push3(ssrRenderComponent_1(_component_UAlert, {
                    color: "neutral",
                    variant: "subtle",
                    title: "SVG or transparent PNG recommended.",
                    description: "Dark mode falls back to light logo if not set."
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="grid grid-cols-2 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "Light mode",
                    name: "logoLight"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col gap-2 w-full"${_scopeId3}>`);
                        _push4(ssrRenderComponent_1(_component_UButton, {
                          icon: vueExports.unref(form).logoLight ? "i-lucide-image" : "i-lucide-plus",
                          color: "neutral",
                          variant: "outline",
                          class: "w-full",
                          onClick: ($event) => logoLightPickerOpen.value = true
                        }, {
                          default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate_1(vueExports.unref(form).logoLight ? "Change logo" : "Choose logo")}`);
                            } else {
                              return [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).logoLight ? "Change logo" : "Choose logo"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (vueExports.unref(form).logoLight) {
                          _push4(`<div class="relative rounded-md overflow-hidden border border-default bg-white flex items-center justify-center h-20 w-full"${_scopeId3}><img${ssrRenderAttr_1("src", vueExports.unref(form).logoLight)} alt="" class="max-h-full max-w-full object-contain p-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent_1(_component_UButton, {
                            icon: "i-lucide-x",
                            color: "neutral",
                            variant: "solid",
                            size: "xs",
                            class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                            "aria-label": "Remove light logo",
                            onClick: ($event) => vueExports.unref(form).logoLight = ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          vueExports.createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                            vueExports.createVNode(_component_UButton, {
                              icon: vueExports.unref(form).logoLight ? "i-lucide-image" : "i-lucide-plus",
                              color: "neutral",
                              variant: "outline",
                              class: "w-full",
                              onClick: ($event) => logoLightPickerOpen.value = true
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).logoLight ? "Change logo" : "Choose logo"), 1)
                              ]),
                              _: 1
                            }, 8, ["icon", "onClick"]),
                            vueExports.unref(form).logoLight ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 0,
                              class: "relative rounded-md overflow-hidden border border-default bg-white flex items-center justify-center h-20 w-full"
                            }, [
                              vueExports.createVNode("img", {
                                src: vueExports.unref(form).logoLight,
                                alt: "",
                                class: "max-h-full max-w-full object-contain p-2"
                              }, null, 8, ["src"]),
                              vueExports.createVNode(_component_UButton, {
                                icon: "i-lucide-x",
                                color: "neutral",
                                variant: "solid",
                                size: "xs",
                                class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                                "aria-label": "Remove light logo",
                                onClick: ($event) => vueExports.unref(form).logoLight = ""
                              }, null, 8, ["onClick"])
                            ])) : vueExports.createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "Dark mode",
                    name: "logoDark"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col gap-2 w-full"${_scopeId3}>`);
                        if (vueExports.unref(form).logoDark) {
                          _push4(`<div class="relative rounded-md overflow-hidden border border-default bg-gray-900 flex items-center justify-center h-20 w-full"${_scopeId3}><img${ssrRenderAttr_1("src", vueExports.unref(form).logoDark)} alt="" class="max-h-full max-w-full object-contain p-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent_1(_component_UButton, {
                            icon: "i-lucide-x",
                            color: "neutral",
                            variant: "solid",
                            size: "xs",
                            class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                            "aria-label": "Remove dark logo",
                            onClick: ($event) => vueExports.unref(form).logoDark = ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent_1(_component_UButton, {
                          icon: vueExports.unref(form).logoDark ? "i-lucide-image" : "i-lucide-plus",
                          color: "neutral",
                          variant: "outline",
                          class: "w-full",
                          onClick: ($event) => logoDarkPickerOpen.value = true
                        }, {
                          default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate_1(vueExports.unref(form).logoDark ? "Change logo" : "Choose logo")}`);
                            } else {
                              return [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).logoDark ? "Change logo" : "Choose logo"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          vueExports.createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                            vueExports.unref(form).logoDark ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 0,
                              class: "relative rounded-md overflow-hidden border border-default bg-gray-900 flex items-center justify-center h-20 w-full"
                            }, [
                              vueExports.createVNode("img", {
                                src: vueExports.unref(form).logoDark,
                                alt: "",
                                class: "max-h-full max-w-full object-contain p-2"
                              }, null, 8, ["src"]),
                              vueExports.createVNode(_component_UButton, {
                                icon: "i-lucide-x",
                                color: "neutral",
                                variant: "solid",
                                size: "xs",
                                class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                                "aria-label": "Remove dark logo",
                                onClick: ($event) => vueExports.unref(form).logoDark = ""
                              }, null, 8, ["onClick"])
                            ])) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode(_component_UButton, {
                              icon: vueExports.unref(form).logoDark ? "i-lucide-image" : "i-lucide-plus",
                              color: "neutral",
                              variant: "outline",
                              class: "w-full",
                              onClick: ($event) => logoDarkPickerOpen.value = true
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).logoDark ? "Change logo" : "Choose logo"), 1)
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
                  _push3(ssrRenderComponent_1(_component_USeparator, { class: "mt-8 mb-6" }, null, _parent3, _scopeId2));
                  _push3(`<h2 class="font-medium mb-2"${_scopeId2}>SEO</h2>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "SEO title",
                    name: "seoTitle"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).seoTitle,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).seoTitle = $event,
                          placeholder: "SEO title",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).seoTitle,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).seoTitle = $event,
                            placeholder: "SEO title",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "SEO description",
                    name: "seoDescription"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UTextarea, {
                          modelValue: vueExports.unref(form).seoDescription,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).seoDescription = $event,
                          placeholder: "SEO description",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UTextarea, {
                            modelValue: vueExports.unref(form).seoDescription,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).seoDescription = $event,
                            placeholder: "SEO description",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "OG image",
                    name: "ogImageUrl",
                    description: "Image shown when your portfolio is shared on social media. Recommended size: 1200×630."
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col gap-2 w-full"${_scopeId3}>`);
                        if (vueExports.unref(form).ogImageUrl) {
                          _push4(`<div class="relative rounded-md overflow-hidden border border-default aspect-video bg-muted w-full"${_scopeId3}><img${ssrRenderAttr_1("src", vueExports.unref(form).ogImageUrl)} alt="" class="w-full h-full object-cover"${_scopeId3}>`);
                          _push4(ssrRenderComponent_1(_component_UButton, {
                            icon: "i-lucide-x",
                            color: "neutral",
                            variant: "solid",
                            size: "xs",
                            class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                            "aria-label": "Remove OG image",
                            onClick: ($event) => vueExports.unref(form).ogImageUrl = ""
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent_1(_component_UButton, {
                          icon: vueExports.unref(form).ogImageUrl ? "i-lucide-image" : "i-lucide-plus",
                          color: "neutral",
                          variant: "outline",
                          class: "w-full",
                          onClick: ($event) => ogImagePickerOpen.value = true
                        }, {
                          default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate_1(vueExports.unref(form).ogImageUrl ? "Change image" : "Choose image")}`);
                            } else {
                              return [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).ogImageUrl ? "Change image" : "Choose image"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          vueExports.createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                            vueExports.unref(form).ogImageUrl ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 0,
                              class: "relative rounded-md overflow-hidden border border-default aspect-video bg-muted w-full"
                            }, [
                              vueExports.createVNode("img", {
                                src: vueExports.unref(form).ogImageUrl,
                                alt: "",
                                class: "w-full h-full object-cover"
                              }, null, 8, ["src"]),
                              vueExports.createVNode(_component_UButton, {
                                icon: "i-lucide-x",
                                color: "neutral",
                                variant: "solid",
                                size: "xs",
                                class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                                "aria-label": "Remove OG image",
                                onClick: ($event) => vueExports.unref(form).ogImageUrl = ""
                              }, null, 8, ["onClick"])
                            ])) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode(_component_UButton, {
                              icon: vueExports.unref(form).ogImageUrl ? "i-lucide-image" : "i-lucide-plus",
                              color: "neutral",
                              variant: "outline",
                              class: "w-full",
                              onClick: ($event) => ogImagePickerOpen.value = true
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).ogImageUrl ? "Change image" : "Choose image"), 1)
                              ]),
                              _: 1
                            }, 8, ["icon", "onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (vueExports.unref(successMessage)) {
                    _push3(ssrRenderComponent_1(_component_UAlert, {
                      color: "success",
                      variant: "soft",
                      description: vueExports.unref(successMessage)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (vueExports.unref(errorMessage)) {
                    _push3(ssrRenderComponent_1(_component_UAlert, {
                      color: "error",
                      variant: "soft",
                      description: vueExports.unref(errorMessage)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    type: "submit",
                    loading: vueExports.unref(saving)
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Save changes`);
                      } else {
                        return [
                          vueExports.createTextVNode("Save changes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_USwitch, {
                      modelValue: vueExports.unref(form).isPublished,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).isPublished = $event,
                      label: "Publish site",
                      description: "Your portfolio will be publicly available."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    vueExports.createVNode(_component_UFormField, {
                      label: "Portfolio title",
                      name: "title"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).title,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event,
                          placeholder: "My Portfolio",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "URL",
                      name: "slug"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).slug,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).slug = $event,
                          placeholder: "my-portfolio",
                          class: "w-full",
                          ui: { base: "pl-8", leading: "pointer-events-none" }
                        }, {
                          leading: vueExports.withCtx(() => [
                            vueExports.createVNode("span", { class: "text-muted text-sm" }, "/p/")
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "Description",
                      name: "description"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UTextarea, {
                          modelValue: vueExports.unref(form).description,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).description = $event,
                          placeholder: "A short description of your website.",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                    vueExports.createVNode("h2", { class: "font-medium mb-2" }, "Logo"),
                    vueExports.createVNode(_component_UAlert, {
                      color: "neutral",
                      variant: "subtle",
                      title: "SVG or transparent PNG recommended.",
                      description: "Dark mode falls back to light logo if not set."
                    }),
                    vueExports.createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      vueExports.createVNode(_component_UFormField, {
                        label: "Light mode",
                        name: "logoLight"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                            vueExports.createVNode(_component_UButton, {
                              icon: vueExports.unref(form).logoLight ? "i-lucide-image" : "i-lucide-plus",
                              color: "neutral",
                              variant: "outline",
                              class: "w-full",
                              onClick: ($event) => logoLightPickerOpen.value = true
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).logoLight ? "Change logo" : "Choose logo"), 1)
                              ]),
                              _: 1
                            }, 8, ["icon", "onClick"]),
                            vueExports.unref(form).logoLight ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 0,
                              class: "relative rounded-md overflow-hidden border border-default bg-white flex items-center justify-center h-20 w-full"
                            }, [
                              vueExports.createVNode("img", {
                                src: vueExports.unref(form).logoLight,
                                alt: "",
                                class: "max-h-full max-w-full object-contain p-2"
                              }, null, 8, ["src"]),
                              vueExports.createVNode(_component_UButton, {
                                icon: "i-lucide-x",
                                color: "neutral",
                                variant: "solid",
                                size: "xs",
                                class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                                "aria-label": "Remove light logo",
                                onClick: ($event) => vueExports.unref(form).logoLight = ""
                              }, null, 8, ["onClick"])
                            ])) : vueExports.createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, {
                        label: "Dark mode",
                        name: "logoDark"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                            vueExports.unref(form).logoDark ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 0,
                              class: "relative rounded-md overflow-hidden border border-default bg-gray-900 flex items-center justify-center h-20 w-full"
                            }, [
                              vueExports.createVNode("img", {
                                src: vueExports.unref(form).logoDark,
                                alt: "",
                                class: "max-h-full max-w-full object-contain p-2"
                              }, null, 8, ["src"]),
                              vueExports.createVNode(_component_UButton, {
                                icon: "i-lucide-x",
                                color: "neutral",
                                variant: "solid",
                                size: "xs",
                                class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                                "aria-label": "Remove dark logo",
                                onClick: ($event) => vueExports.unref(form).logoDark = ""
                              }, null, 8, ["onClick"])
                            ])) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode(_component_UButton, {
                              icon: vueExports.unref(form).logoDark ? "i-lucide-image" : "i-lucide-plus",
                              color: "neutral",
                              variant: "outline",
                              class: "w-full",
                              onClick: ($event) => logoDarkPickerOpen.value = true
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).logoDark ? "Change logo" : "Choose logo"), 1)
                              ]),
                              _: 1
                            }, 8, ["icon", "onClick"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    vueExports.createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                    vueExports.createVNode("h2", { class: "font-medium mb-2" }, "SEO"),
                    vueExports.createVNode(_component_UFormField, {
                      label: "SEO title",
                      name: "seoTitle"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).seoTitle,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).seoTitle = $event,
                          placeholder: "SEO title",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "SEO description",
                      name: "seoDescription"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UTextarea, {
                          modelValue: vueExports.unref(form).seoDescription,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).seoDescription = $event,
                          placeholder: "SEO description",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "OG image",
                      name: "ogImageUrl",
                      description: "Image shown when your portfolio is shared on social media. Recommended size: 1200×630."
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                          vueExports.unref(form).ogImageUrl ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            class: "relative rounded-md overflow-hidden border border-default aspect-video bg-muted w-full"
                          }, [
                            vueExports.createVNode("img", {
                              src: vueExports.unref(form).ogImageUrl,
                              alt: "",
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src"]),
                            vueExports.createVNode(_component_UButton, {
                              icon: "i-lucide-x",
                              color: "neutral",
                              variant: "solid",
                              size: "xs",
                              class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                              "aria-label": "Remove OG image",
                              onClick: ($event) => vueExports.unref(form).ogImageUrl = ""
                            }, null, 8, ["onClick"])
                          ])) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode(_component_UButton, {
                            icon: vueExports.unref(form).ogImageUrl ? "i-lucide-image" : "i-lucide-plus",
                            color: "neutral",
                            variant: "outline",
                            class: "w-full",
                            onClick: ($event) => ogImagePickerOpen.value = true
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).ogImageUrl ? "Change image" : "Choose image"), 1)
                            ]),
                            _: 1
                          }, 8, ["icon", "onClick"])
                        ])
                      ]),
                      _: 1
                    }),
                    vueExports.unref(successMessage) ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                      key: 0,
                      color: "success",
                      variant: "soft",
                      description: vueExports.unref(successMessage)
                    }, null, 8, ["description"])) : vueExports.createCommentVNode("", true),
                    vueExports.unref(errorMessage) ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                      key: 1,
                      color: "error",
                      variant: "soft",
                      description: vueExports.unref(errorMessage)
                    }, null, 8, ["description"])) : vueExports.createCommentVNode("", true),
                    vueExports.createVNode(_component_UButton, {
                      type: "submit",
                      loading: vueExports.unref(saving)
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode("Save changes")
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
              vueExports.createVNode(_component_UForm, {
                class: "max-w-md space-y-4",
                onSubmit: vueExports.withModifiers(save, ["prevent"])
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_USwitch, {
                    modelValue: vueExports.unref(form).isPublished,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).isPublished = $event,
                    label: "Publish site",
                    description: "Your portfolio will be publicly available."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  vueExports.createVNode(_component_UFormField, {
                    label: "Portfolio title",
                    name: "title"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(form).title,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event,
                        placeholder: "My Portfolio",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UFormField, {
                    label: "URL",
                    name: "slug"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(form).slug,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).slug = $event,
                        placeholder: "my-portfolio",
                        class: "w-full",
                        ui: { base: "pl-8", leading: "pointer-events-none" }
                      }, {
                        leading: vueExports.withCtx(() => [
                          vueExports.createVNode("span", { class: "text-muted text-sm" }, "/p/")
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UFormField, {
                    label: "Description",
                    name: "description"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UTextarea, {
                        modelValue: vueExports.unref(form).description,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).description = $event,
                        placeholder: "A short description of your website.",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                  vueExports.createVNode("h2", { class: "font-medium mb-2" }, "Logo"),
                  vueExports.createVNode(_component_UAlert, {
                    color: "neutral",
                    variant: "subtle",
                    title: "SVG or transparent PNG recommended.",
                    description: "Dark mode falls back to light logo if not set."
                  }),
                  vueExports.createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    vueExports.createVNode(_component_UFormField, {
                      label: "Light mode",
                      name: "logoLight"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                          vueExports.createVNode(_component_UButton, {
                            icon: vueExports.unref(form).logoLight ? "i-lucide-image" : "i-lucide-plus",
                            color: "neutral",
                            variant: "outline",
                            class: "w-full",
                            onClick: ($event) => logoLightPickerOpen.value = true
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).logoLight ? "Change logo" : "Choose logo"), 1)
                            ]),
                            _: 1
                          }, 8, ["icon", "onClick"]),
                          vueExports.unref(form).logoLight ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            class: "relative rounded-md overflow-hidden border border-default bg-white flex items-center justify-center h-20 w-full"
                          }, [
                            vueExports.createVNode("img", {
                              src: vueExports.unref(form).logoLight,
                              alt: "",
                              class: "max-h-full max-w-full object-contain p-2"
                            }, null, 8, ["src"]),
                            vueExports.createVNode(_component_UButton, {
                              icon: "i-lucide-x",
                              color: "neutral",
                              variant: "solid",
                              size: "xs",
                              class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                              "aria-label": "Remove light logo",
                              onClick: ($event) => vueExports.unref(form).logoLight = ""
                            }, null, 8, ["onClick"])
                          ])) : vueExports.createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "Dark mode",
                      name: "logoDark"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                          vueExports.unref(form).logoDark ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            class: "relative rounded-md overflow-hidden border border-default bg-gray-900 flex items-center justify-center h-20 w-full"
                          }, [
                            vueExports.createVNode("img", {
                              src: vueExports.unref(form).logoDark,
                              alt: "",
                              class: "max-h-full max-w-full object-contain p-2"
                            }, null, 8, ["src"]),
                            vueExports.createVNode(_component_UButton, {
                              icon: "i-lucide-x",
                              color: "neutral",
                              variant: "solid",
                              size: "xs",
                              class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                              "aria-label": "Remove dark logo",
                              onClick: ($event) => vueExports.unref(form).logoDark = ""
                            }, null, 8, ["onClick"])
                          ])) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode(_component_UButton, {
                            icon: vueExports.unref(form).logoDark ? "i-lucide-image" : "i-lucide-plus",
                            color: "neutral",
                            variant: "outline",
                            class: "w-full",
                            onClick: ($event) => logoDarkPickerOpen.value = true
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).logoDark ? "Change logo" : "Choose logo"), 1)
                            ]),
                            _: 1
                          }, 8, ["icon", "onClick"])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  vueExports.createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                  vueExports.createVNode("h2", { class: "font-medium mb-2" }, "SEO"),
                  vueExports.createVNode(_component_UFormField, {
                    label: "SEO title",
                    name: "seoTitle"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UInput, {
                        modelValue: vueExports.unref(form).seoTitle,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).seoTitle = $event,
                        placeholder: "SEO title",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UFormField, {
                    label: "SEO description",
                    name: "seoDescription"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_component_UTextarea, {
                        modelValue: vueExports.unref(form).seoDescription,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).seoDescription = $event,
                        placeholder: "SEO description",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UFormField, {
                    label: "OG image",
                    name: "ogImageUrl",
                    description: "Image shown when your portfolio is shared on social media. Recommended size: 1200×630."
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "flex flex-col gap-2 w-full" }, [
                        vueExports.unref(form).ogImageUrl ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          class: "relative rounded-md overflow-hidden border border-default aspect-video bg-muted w-full"
                        }, [
                          vueExports.createVNode("img", {
                            src: vueExports.unref(form).ogImageUrl,
                            alt: "",
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"]),
                          vueExports.createVNode(_component_UButton, {
                            icon: "i-lucide-x",
                            color: "neutral",
                            variant: "solid",
                            size: "xs",
                            class: "absolute top-1 right-1 opacity-80 hover:opacity-100",
                            "aria-label": "Remove OG image",
                            onClick: ($event) => vueExports.unref(form).ogImageUrl = ""
                          }, null, 8, ["onClick"])
                        ])) : vueExports.createCommentVNode("", true),
                        vueExports.createVNode(_component_UButton, {
                          icon: vueExports.unref(form).ogImageUrl ? "i-lucide-image" : "i-lucide-plus",
                          color: "neutral",
                          variant: "outline",
                          class: "w-full",
                          onClick: ($event) => ogImagePickerOpen.value = true
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).ogImageUrl ? "Change image" : "Choose image"), 1)
                          ]),
                          _: 1
                        }, 8, ["icon", "onClick"])
                      ])
                    ]),
                    _: 1
                  }),
                  vueExports.unref(successMessage) ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                    key: 0,
                    color: "success",
                    variant: "soft",
                    description: vueExports.unref(successMessage)
                  }, null, 8, ["description"])) : vueExports.createCommentVNode("", true),
                  vueExports.unref(errorMessage) ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                    key: 1,
                    color: "error",
                    variant: "soft",
                    description: vueExports.unref(errorMessage)
                  }, null, 8, ["description"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode(_component_UButton, {
                    type: "submit",
                    loading: vueExports.unref(saving)
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode("Save changes")
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
      _push(ssrRenderComponent_1(_component_AdminMediaPickerModal, {
        open: vueExports.unref(ogImagePickerOpen),
        "onUpdate:open": ($event) => vueExports.isRef(ogImagePickerOpen) ? ogImagePickerOpen.value = $event : null,
        "images-only": "",
        "selected-url": vueExports.unref(form).ogImageUrl || null,
        onSelect: (url) => vueExports.unref(form).ogImageUrl = url
      }, null, _parent));
      _push(ssrRenderComponent_1(_component_AdminMediaPickerModal, {
        open: vueExports.unref(logoLightPickerOpen),
        "onUpdate:open": ($event) => vueExports.isRef(logoLightPickerOpen) ? logoLightPickerOpen.value = $event : null,
        "images-only": "",
        "selected-url": vueExports.unref(form).logoLight || null,
        onSelect: (url) => vueExports.unref(form).logoLight = url
      }, null, _parent));
      _push(ssrRenderComponent_1(_component_AdminMediaPickerModal, {
        open: vueExports.unref(logoDarkPickerOpen),
        "onUpdate:open": ($event) => vueExports.isRef(logoDarkPickerOpen) ? logoDarkPickerOpen.value = $event : null,
        "images-only": "",
        "selected-url": vueExports.unref(form).logoDark || null,
        onSelect: (url) => vueExports.unref(form).logoDark = url
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/site-settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=site-settings-RDDgeXTU.mjs.map
