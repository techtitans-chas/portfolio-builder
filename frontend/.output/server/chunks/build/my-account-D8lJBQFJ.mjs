import { _ as __nuxt_component_0 } from './PageStructure-K8uU1ezD.mjs';
import { e as _sfc_main$d, f as _sfc_main$8, K as navigateTo } from './server.mjs';
import { _ as _sfc_main$9 } from './Modal-D9bZkufO.mjs';
import { _ as _sfc_main$7 } from './Separator-CgixisDT.mjs';
import { _ as _sfc_main$6 } from './Alert-Nv5RlKkm.mjs';
import { defineComponent, withAsyncContext, reactive, watch, ref, computed, mergeProps, withCtx, unref, createTextVNode, isRef, createVNode, openBlock, createBlock, createCommentVNode, withModifiers, useModel, Fragment, renderList, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { _ as _sfc_main$3 } from './Form-JEaegfpv.mjs';
import { _ as _sfc_main$4 } from './FormField-9wkfNHPa.mjs';
import { _ as _sfc_main$5 } from './Input-DWHPzDmy.mjs';
import { u as useCurrentUser } from './useCurrentUser-0x7hmjnh.mjs';
import { u as useUnsavedChanges } from './useUnsavedChanges-CbDvifmB.mjs';
import { u as useServerFeatures } from './useServerFeatures-DOIxALfL.mjs';
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
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'perfect-debounce';
import '@vueuse/shared';
import 'tailwind-variants';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import './overlay-BWwBD9XH.mjs';
import 'aria-hidden';

const AVATAR_MAX_FILE_SIZE = 10 * 1024 * 1024;
const AVATAR_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const DEFAULT_AVATARS = [
  "/avatars/avatar-1.webp",
  "/avatars/avatar-2.webp",
  "/avatars/avatar-3.webp",
  "/avatars/avatar-4.webp",
  "/avatars/avatar-5.webp",
  "/avatars/avatar-6.webp"
];
function useAvatarUpload(options = {}) {
  const { fetcher, apiBase } = useApi();
  const uploading = ref(false);
  const error = ref("");
  const success = ref("");
  const showDefaultPicker = ref(false);
  const fileInput = ref(null);
  function clearMessages() {
    error.value = "";
    success.value = "";
  }
  function openFilePicker() {
    fileInput.value?.click();
  }
  async function uploadFile(file) {
    clearMessages();
    if (!AVATAR_ALLOWED_TYPES.includes(file.type)) {
      error.value = "Invalid file type. Please upload a JPG, PNG, GIF, or WebP image.";
      return;
    }
    if (file.size > AVATAR_MAX_FILE_SIZE) {
      error.value = `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is 5 MB.`;
      return;
    }
    uploading.value = true;
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await fetch(`${apiBase}/api/users/me/avatar`, {
        method: "POST",
        credentials: "include",
        body: formData
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body?.errors?.[0]?.detail ?? body?.message ?? response.statusText);
      }
      success.value = "Profile image updated.";
      options.onSuccess?.(body.image);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Upload failed. Please try again.";
    } finally {
      uploading.value = false;
    }
  }
  async function onFileInputChange(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    await uploadFile(file);
    input.value = "";
  }
  async function selectDefault(path) {
    clearMessages();
    uploading.value = true;
    try {
      const data = await fetcher("/api/users/me/avatar", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({ image: path })
      });
      success.value = "Profile image updated.";
      showDefaultPicker.value = false;
      options.onSuccess?.(data.image);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to update avatar. Please try again.";
    } finally {
      uploading.value = false;
    }
  }
  return {
    // state
    uploading,
    error,
    success,
    showDefaultPicker,
    fileInput,
    // constants (convenient for templates)
    defaultAvatars: DEFAULT_AVATARS,
    allowedTypes: AVATAR_ALLOWED_TYPES.join(","),
    // actions
    openFilePicker,
    uploadFile,
    onFileInputChange,
    selectDefault
  };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AvatarModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    currentImage: {},
    storageEnabled: { type: Boolean }
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["success"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useModel(__props, "open");
    const {
      uploading,
      error: avatarError,
      success: avatarSuccess,
      fileInput,
      defaultAvatars,
      allowedTypes,
      openFilePicker,
      onFileInputChange,
      selectDefault
    } = useAvatarUpload({
      onSuccess: (imageUrl) => {
        emit("success", imageUrl);
        open.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$9;
      const _component_UButton = _sfc_main$8;
      const _component_USeparator = _sfc_main$7;
      const _component_UAlert = _sfc_main$6;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Change Avatar",
        description: "Upload your own image or pick a default avatar."
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-5"${_scopeId}>`);
            if (props.storageEnabled) {
              _push2(`<!--[--><input type="file"${ssrRenderAttr("accept", unref(allowedTypes))} class="hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "outline",
                class: "w-full justify-center",
                loading: unref(uploading),
                disabled: unref(uploading),
                icon: "i-lucide-upload",
                onClick: unref(openFilePicker)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Upload image `);
                  } else {
                    return [
                      createTextVNode(" Upload image ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p class="text-xs text-muted text-center"${_scopeId}>JPG, PNG, GIF or WebP · max 10 MB</p>`);
              _push2(ssrRenderComponent(_component_USeparator, { label: "or choose a default" }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "warning",
                variant: "soft",
                icon: "i-lucide-cloud-off",
                title: "Custom uploads unavailable",
                description: "File storage is not configured on this server. You can still pick a default avatar below."
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_USeparator, { label: "choose a default" }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            }
            _push2(`<div class="grid grid-cols-6 gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(defaultAvatars), (path) => {
              _push2(`<button type="button" class="${ssrRenderClass([
                props.currentImage === path ? "border-primary" : "border-transparent hover:border-muted-foreground",
                "w-full aspect-square rounded-full overflow-hidden border-2 transition-colors focus:outline-none"
              ])}"${ssrIncludeBooleanAttr(unref(uploading)) ? " disabled" : ""}${ssrRenderAttr("aria-label", `Select default avatar`)}${_scopeId}><img${ssrRenderAttr("src", path)} alt="" class="w-full h-full object-cover"${_scopeId}></button>`);
            });
            _push2(`<!--]--></div>`);
            if (unref(avatarSuccess)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "success",
                variant: "soft",
                description: unref(avatarSuccess)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(avatarError)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "error",
                variant: "soft",
                description: unref(avatarError)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-5" }, [
                props.storageEnabled ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("input", {
                    ref_key: "fileInput",
                    ref: fileInput,
                    type: "file",
                    accept: unref(allowedTypes),
                    class: "hidden",
                    onChange: unref(onFileInputChange)
                  }, null, 40, ["accept", "onChange"]),
                  createVNode(_component_UButton, {
                    variant: "outline",
                    class: "w-full justify-center",
                    loading: unref(uploading),
                    disabled: unref(uploading),
                    icon: "i-lucide-upload",
                    onClick: unref(openFilePicker)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Upload image ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled", "onClick"]),
                  createVNode("p", { class: "text-xs text-muted text-center" }, "JPG, PNG, GIF or WebP · max 10 MB"),
                  createVNode(_component_USeparator, { label: "or choose a default" })
                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode(_component_UAlert, {
                    color: "warning",
                    variant: "soft",
                    icon: "i-lucide-cloud-off",
                    title: "Custom uploads unavailable",
                    description: "File storage is not configured on this server. You can still pick a default avatar below."
                  }),
                  createVNode(_component_USeparator, { label: "choose a default" })
                ], 64)),
                createVNode("div", { class: "grid grid-cols-6 gap-2" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(defaultAvatars), (path) => {
                    return openBlock(), createBlock("button", {
                      key: path,
                      type: "button",
                      class: [
                        "w-full aspect-square rounded-full overflow-hidden border-2 transition-colors focus:outline-none",
                        props.currentImage === path ? "border-primary" : "border-transparent hover:border-muted-foreground"
                      ],
                      disabled: unref(uploading),
                      "aria-label": `Select default avatar`,
                      onClick: ($event) => unref(selectDefault)(path)
                    }, [
                      createVNode("img", {
                        src: path,
                        alt: "",
                        class: "w-full h-full object-cover"
                      }, null, 8, ["src"])
                    ], 10, ["disabled", "onClick"]);
                  }), 128))
                ]),
                unref(avatarSuccess) ? (openBlock(), createBlock(_component_UAlert, {
                  key: 2,
                  color: "success",
                  variant: "soft",
                  description: unref(avatarSuccess)
                }, null, 8, ["description"])) : createCommentVNode("", true),
                unref(avatarError) ? (openBlock(), createBlock(_component_UAlert, {
                  key: 3,
                  color: "error",
                  variant: "soft",
                  description: unref(avatarError)
                }, null, 8, ["description"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AvatarModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "AdminAvatarModal" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeleteAccountModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    userEmail: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["confirm", "cancel"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useModel(__props, "open");
    const emailInput = ref("");
    const emailMatches = computed(
      () => emailInput.value.trim().toLowerCase() === props.userEmail.toLowerCase()
    );
    watch(open, (isOpen) => {
      if (!isOpen) emailInput.value = "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$9;
      const _component_UAlert = _sfc_main$6;
      const _component_UFormField = _sfc_main$4;
      const _component_UInput = _sfc_main$5;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Delete account",
        description: "This action is permanent and cannot be undone. All your data — portfolio, pages, blocks, collections, and media — will be deleted immediately."
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UAlert, {
              color: "error",
              variant: "soft",
              icon: "i-lucide-triangle-alert",
              description: "Your account and all associated data will be permanently deleted. You will be logged out immediately."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: `Type your email address to confirm: ${__props.userEmail}`,
              name: "email-confirm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(emailInput),
                    "onUpdate:modelValue": ($event) => isRef(emailInput) ? emailInput.value = $event : null,
                    type: "email",
                    placeholder: "Enter your email address",
                    class: "w-full",
                    autocomplete: "off"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(emailInput),
                      "onUpdate:modelValue": ($event) => isRef(emailInput) ? emailInput.value = $event : null,
                      type: "email",
                      placeholder: "Enter your email address",
                      class: "w-full",
                      autocomplete: "off"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode(_component_UAlert, {
                  color: "error",
                  variant: "soft",
                  icon: "i-lucide-triangle-alert",
                  description: "Your account and all associated data will be permanently deleted. You will be logged out immediately."
                }),
                createVNode(_component_UFormField, {
                  label: `Type your email address to confirm: ${__props.userEmail}`,
                  name: "email-confirm"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: unref(emailInput),
                      "onUpdate:modelValue": ($event) => isRef(emailInput) ? emailInput.value = $event : null,
                      type: "email",
                      placeholder: "Enter your email address",
                      class: "w-full",
                      autocomplete: "off"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-2 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              onClick: ($event) => {
                emit("cancel");
                open.value = false;
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "error",
              disabled: !unref(emailMatches),
              onClick: ($event) => emit("confirm")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delete my account `);
                } else {
                  return [
                    createTextVNode(" Delete my account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-end gap-2 w-full" }, [
                createVNode(_component_UButton, {
                  variant: "ghost",
                  onClick: ($event) => {
                    emit("cancel");
                    open.value = false;
                  }
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Cancel ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_UButton, {
                  color: "error",
                  disabled: !unref(emailMatches),
                  onClick: ($event) => emit("confirm")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Delete my account ")
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/DeleteAccountModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$1, { __name: "AdminDeleteAccountModal" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "my-account",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { user, fetch: fetchUser } = useCurrentUser();
    const { fetcher } = useApi();
    [__temp, __restore] = withAsyncContext(() => fetchUser()), await __temp, __restore();
    const form = reactive({ name: "" });
    watch(
      user,
      (u) => {
        if (u) form.name = u.name ?? "";
      },
      { immediate: true }
    );
    const { markSaved } = useUnsavedChanges(form);
    const successMessage = ref("");
    const errorMessage = ref("");
    const saving = ref(false);
    async function save() {
      successMessage.value = "";
      errorMessage.value = "";
      saving.value = true;
      try {
        const data = await fetcher("/api/users/me", {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ name: form.name })
        });
        if (user.value) {
          user.value.name = data.user.name;
        }
        markSaved();
        successMessage.value = "Account updated successfully.";
      } catch {
        errorMessage.value = "Something went wrong. Please try again.";
      } finally {
        saving.value = false;
      }
    }
    const avatarModalOpen = ref(false);
    const displayedImage = computed(() => user.value?.image ?? null);
    function onAvatarSuccess(imageUrl) {
      if (user.value) user.value.image = imageUrl;
    }
    const { features, fetchFeatures } = useServerFeatures();
    [__temp, __restore] = withAsyncContext(() => fetchFeatures()), await __temp, __restore();
    const deleteModalOpen = ref(false);
    const deleting = ref(false);
    const deleteError = ref("");
    async function confirmDeleteAccount() {
      deleting.value = true;
      deleteError.value = "";
      try {
        await fetcher("/api/users/me", {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify({ email: user.value?.email })
        });
        deleteModalOpen.value = false;
        await navigateTo("/?deleted=true");
      } catch {
        deleteError.value = "Something went wrong. Please try again.";
        deleting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminLayoutPageStructure = __nuxt_component_0;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$8;
      const _component_AdminAvatarModal = __nuxt_component_3;
      const _component_UForm = _sfc_main$3;
      const _component_UFormField = _sfc_main$4;
      const _component_UInput = _sfc_main$5;
      const _component_UAlert = _sfc_main$6;
      const _component_USeparator = _sfc_main$7;
      const _component_AdminDeleteAccountModal = __nuxt_component_9;
      _push(ssrRenderComponent(_component_AdminLayoutPageStructure, mergeProps({
        title: "My Account",
        description: "Configure settings for your user account."
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-md"${_scopeId}><div class="flex items-center gap-4 mb-8"${_scopeId}><div class="w-20 h-20 rounded-full overflow-hidden bg-muted border border-muted flex items-center justify-center shrink-0"${_scopeId}>`);
            if (unref(displayedImage)) {
              _push2(`<img${ssrRenderAttr("src", unref(displayedImage))} alt="Profile image" class="w-full h-full object-cover"${_scopeId}>`);
            } else {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-user",
                class: "w-8 h-8 text-muted-foreground"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div><div${_scopeId}><p class="font-medium"${_scopeId}>Profile Image</p><p class="text-sm text-muted mb-2"${_scopeId}>JPG, PNG, GIF or WebP · max 10 MB</p>`);
            _push2(ssrRenderComponent(_component_UButton, {
              size: "sm",
              variant: "outline",
              icon: "i-lucide-pencil",
              onClick: ($event) => avatarModalOpen.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Change avatar `);
                } else {
                  return [
                    createTextVNode(" Change avatar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_AdminAvatarModal, {
              open: unref(avatarModalOpen),
              "onUpdate:open": ($event) => isRef(avatarModalOpen) ? avatarModalOpen.value = $event : null,
              "current-image": unref(displayedImage),
              "storage-enabled": unref(features).storage,
              onSuccess: onAvatarSuccess
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UForm, {
              class: "max-w-md space-y-4",
              onSubmit: save
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
                          "model-value": unref(user)?.email,
                          type: "email",
                          disabled: "",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            "model-value": unref(user)?.email,
                            type: "email",
                            disabled: "",
                            class: "w-full"
                          }, null, 8, ["model-value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Name",
                    name: "name"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Your name",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            placeholder: "Your name",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(` Save changes `);
                      } else {
                        return [
                          createTextVNode(" Save changes ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UFormField, {
                      label: "Email",
                      name: "email"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          "model-value": unref(user)?.email,
                          type: "email",
                          disabled: "",
                          class: "w-full"
                        }, null, 8, ["model-value"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "Name",
                      name: "name"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Your name",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        createTextVNode(" Save changes ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USeparator, { class: "mt-8 mb-6" }, null, _parent2, _scopeId));
            _push2(`<div class="max-w-m"${_scopeId}><h2 class="font-medium mb-1"${_scopeId}>Password</h2><p class="text-muted text-sm mb-3"${_scopeId}>Send a password reset link to your email address.</p>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/reset-password",
              variant: "outline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Reset password`);
                } else {
                  return [
                    createTextVNode("Reset password")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_USeparator, { class: "mt-8 mb-6" }, null, _parent2, _scopeId));
            _push2(`<div class="max-w-md"${_scopeId}><h2 class="font-medium mb-1 text-red-600 dark:text-red-400"${_scopeId}>Danger zone</h2><p class="text-muted text-sm mb-3"${_scopeId}> Permanently delete your account and all associated data. This cannot be undone. </p>`);
            if (unref(deleteError)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "error",
                variant: "soft",
                description: unref(deleteError),
                class: "mb-3"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_UButton, {
              color: "error",
              variant: "outline",
              onClick: ($event) => deleteModalOpen.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delete account `);
                } else {
                  return [
                    createTextVNode(" Delete account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AdminDeleteAccountModal, {
              open: unref(deleteModalOpen),
              "onUpdate:open": ($event) => isRef(deleteModalOpen) ? deleteModalOpen.value = $event : null,
              "user-email": unref(user)?.email ?? "",
              onConfirm: confirmDeleteAccount,
              onCancel: ($event) => deleteError.value = ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-md" }, [
                createVNode("div", { class: "flex items-center gap-4 mb-8" }, [
                  createVNode("div", { class: "w-20 h-20 rounded-full overflow-hidden bg-muted border border-muted flex items-center justify-center shrink-0" }, [
                    unref(displayedImage) ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: unref(displayedImage),
                      alt: "Profile image",
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src"])) : (openBlock(), createBlock(_component_UIcon, {
                      key: 1,
                      name: "i-lucide-user",
                      class: "w-8 h-8 text-muted-foreground"
                    }))
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "font-medium" }, "Profile Image"),
                    createVNode("p", { class: "text-sm text-muted mb-2" }, "JPG, PNG, GIF or WebP · max 10 MB"),
                    createVNode(_component_UButton, {
                      size: "sm",
                      variant: "outline",
                      icon: "i-lucide-pencil",
                      onClick: ($event) => avatarModalOpen.value = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Change avatar ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                createVNode(_component_AdminAvatarModal, {
                  open: unref(avatarModalOpen),
                  "onUpdate:open": ($event) => isRef(avatarModalOpen) ? avatarModalOpen.value = $event : null,
                  "current-image": unref(displayedImage),
                  "storage-enabled": unref(features).storage,
                  onSuccess: onAvatarSuccess
                }, null, 8, ["open", "onUpdate:open", "current-image", "storage-enabled"]),
                createVNode(_component_UForm, {
                  class: "max-w-md space-y-4",
                  onSubmit: withModifiers(save, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UFormField, {
                      label: "Email",
                      name: "email"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          "model-value": unref(user)?.email,
                          type: "email",
                          disabled: "",
                          class: "w-full"
                        }, null, 8, ["model-value"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "Name",
                      name: "name"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Your name",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        createTextVNode(" Save changes ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ]),
                  _: 1
                }),
                createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                createVNode("div", { class: "max-w-m" }, [
                  createVNode("h2", { class: "font-medium mb-1" }, "Password"),
                  createVNode("p", { class: "text-muted text-sm mb-3" }, "Send a password reset link to your email address."),
                  createVNode(_component_UButton, {
                    to: "/reset-password",
                    variant: "outline"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Reset password")
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                createVNode("div", { class: "max-w-md" }, [
                  createVNode("h2", { class: "font-medium mb-1 text-red-600 dark:text-red-400" }, "Danger zone"),
                  createVNode("p", { class: "text-muted text-sm mb-3" }, " Permanently delete your account and all associated data. This cannot be undone. "),
                  unref(deleteError) ? (openBlock(), createBlock(_component_UAlert, {
                    key: 0,
                    color: "error",
                    variant: "soft",
                    description: unref(deleteError),
                    class: "mb-3"
                  }, null, 8, ["description"])) : createCommentVNode("", true),
                  createVNode(_component_UButton, {
                    color: "error",
                    variant: "outline",
                    onClick: ($event) => deleteModalOpen.value = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Delete account ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_AdminDeleteAccountModal, {
                    open: unref(deleteModalOpen),
                    "onUpdate:open": ($event) => isRef(deleteModalOpen) ? deleteModalOpen.value = $event : null,
                    "user-email": unref(user)?.email ?? "",
                    onConfirm: confirmDeleteAccount,
                    onCancel: ($event) => deleteError.value = ""
                  }, null, 8, ["open", "onUpdate:open", "user-email", "onCancel"])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/my-account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=my-account-D8lJBQFJ.mjs.map
