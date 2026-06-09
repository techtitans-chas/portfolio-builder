import { _ as __nuxt_component_0 } from './PageStructure-DGuBBy_1.mjs';
import { j as _sfc_main$d, e as _sfc_main$8, U as navigateTo } from './server.mjs';
import { _ as _sfc_main$9 } from './Modal-BBL-Wwu5.mjs';
import { _ as _sfc_main$7 } from './Separator-Bd9m4VAI.mjs';
import { _ as _sfc_main$6 } from './Alert-CsIjDkc0.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { _ as _sfc_main$3 } from './Form-DjodbAs7.mjs';
import { _ as _sfc_main$4 } from './FormField-Bwoy2x8u.mjs';
import { _ as _sfc_main$5 } from './Input-B_IU2Xmo.mjs';
import { u as useCurrentUser } from './useCurrentUser-0x7hmjnh.mjs';
import { u as useUnsavedChanges } from './useUnsavedChanges-CbDvifmB.mjs';
import { u as useServerFeatures } from './useServerFeatures-DOIxALfL.mjs';
import { o as vueExports, f as ssrRenderComponent_1, b as ssrRenderAttr_1, g as ssrRenderList_1, e as ssrRenderClass_1, s as ssrIncludeBooleanAttr } from '../routes/renderer.mjs';
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
import './overlay-BWwBD9XH.mjs';
import '../_/shared.cjs.prod.mjs';
import 'node:stream';

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
  const uploading = vueExports.ref(false);
  const error = vueExports.ref("");
  const success = vueExports.ref("");
  const showDefaultPicker = vueExports.ref(false);
  const fileInput = vueExports.ref(null);
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
const _sfc_main$2 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "AvatarModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    currentImage: {},
    storageEnabled: { type: Boolean }
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ vueExports.mergeModels(["success"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = vueExports.useModel(__props, "open");
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
      _push(ssrRenderComponent_1(_component_UModal, vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Change Avatar",
        description: "Upload your own image or pick a default avatar."
      }, _attrs), {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-5"${_scopeId}>`);
            if (props.storageEnabled) {
              _push2(`<!--[--><input type="file"${ssrRenderAttr_1("accept", vueExports.unref(allowedTypes))} class="hidden"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UButton, {
                variant: "outline",
                class: "w-full justify-center",
                loading: vueExports.unref(uploading),
                disabled: vueExports.unref(uploading),
                icon: "i-lucide-upload",
                onClick: vueExports.unref(openFilePicker)
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Upload image `);
                  } else {
                    return [
                      vueExports.createTextVNode(" Upload image ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p class="text-xs text-muted text-center"${_scopeId}>JPG, PNG, GIF or WebP · max 10 MB</p>`);
              _push2(ssrRenderComponent_1(_component_USeparator, { label: "or choose a default" }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent_1(_component_UAlert, {
                color: "warning",
                variant: "soft",
                icon: "i-lucide-cloud-off",
                title: "Custom uploads unavailable",
                description: "File storage is not configured on this server. You can still pick a default avatar below."
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent_1(_component_USeparator, { label: "choose a default" }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            }
            _push2(`<div class="grid grid-cols-6 gap-2"${_scopeId}><!--[-->`);
            ssrRenderList_1(vueExports.unref(defaultAvatars), (path) => {
              _push2(`<button type="button" class="${ssrRenderClass_1([
                props.currentImage === path ? "border-primary" : "border-transparent hover:border-muted-foreground",
                "w-full aspect-square rounded-full overflow-hidden border-2 transition-colors focus:outline-none"
              ])}"${ssrIncludeBooleanAttr(vueExports.unref(uploading)) ? " disabled" : ""}${ssrRenderAttr_1("aria-label", `Select default avatar`)}${_scopeId}><img${ssrRenderAttr_1("src", path)} alt="" class="w-full h-full object-cover"${_scopeId}></button>`);
            });
            _push2(`<!--]--></div>`);
            if (vueExports.unref(avatarSuccess)) {
              _push2(ssrRenderComponent_1(_component_UAlert, {
                color: "success",
                variant: "soft",
                description: vueExports.unref(avatarSuccess)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(avatarError)) {
              _push2(ssrRenderComponent_1(_component_UAlert, {
                color: "error",
                variant: "soft",
                description: vueExports.unref(avatarError)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-5" }, [
                props.storageEnabled ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                  vueExports.createVNode("input", {
                    ref_key: "fileInput",
                    ref: fileInput,
                    type: "file",
                    accept: vueExports.unref(allowedTypes),
                    class: "hidden",
                    onChange: vueExports.unref(onFileInputChange)
                  }, null, 40, ["accept", "onChange"]),
                  vueExports.createVNode(_component_UButton, {
                    variant: "outline",
                    class: "w-full justify-center",
                    loading: vueExports.unref(uploading),
                    disabled: vueExports.unref(uploading),
                    icon: "i-lucide-upload",
                    onClick: vueExports.unref(openFilePicker)
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(" Upload image ")
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled", "onClick"]),
                  vueExports.createVNode("p", { class: "text-xs text-muted text-center" }, "JPG, PNG, GIF or WebP · max 10 MB"),
                  vueExports.createVNode(_component_USeparator, { label: "or choose a default" })
                ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                  vueExports.createVNode(_component_UAlert, {
                    color: "warning",
                    variant: "soft",
                    icon: "i-lucide-cloud-off",
                    title: "Custom uploads unavailable",
                    description: "File storage is not configured on this server. You can still pick a default avatar below."
                  }),
                  vueExports.createVNode(_component_USeparator, { label: "choose a default" })
                ], 64)),
                vueExports.createVNode("div", { class: "grid grid-cols-6 gap-2" }, [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(defaultAvatars), (path) => {
                    return vueExports.openBlock(), vueExports.createBlock("button", {
                      key: path,
                      type: "button",
                      class: [
                        "w-full aspect-square rounded-full overflow-hidden border-2 transition-colors focus:outline-none",
                        props.currentImage === path ? "border-primary" : "border-transparent hover:border-muted-foreground"
                      ],
                      disabled: vueExports.unref(uploading),
                      "aria-label": `Select default avatar`,
                      onClick: ($event) => vueExports.unref(selectDefault)(path)
                    }, [
                      vueExports.createVNode("img", {
                        src: path,
                        alt: "",
                        class: "w-full h-full object-cover"
                      }, null, 8, ["src"])
                    ], 10, ["disabled", "onClick"]);
                  }), 128))
                ]),
                vueExports.unref(avatarSuccess) ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                  key: 2,
                  color: "success",
                  variant: "soft",
                  description: vueExports.unref(avatarSuccess)
                }, null, 8, ["description"])) : vueExports.createCommentVNode("", true),
                vueExports.unref(avatarError) ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                  key: 3,
                  color: "error",
                  variant: "soft",
                  description: vueExports.unref(avatarError)
                }, null, 8, ["description"])) : vueExports.createCommentVNode("", true)
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
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AvatarModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "AdminAvatarModal" });
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DeleteAccountModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    userEmail: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ vueExports.mergeModels(["confirm", "cancel"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = vueExports.useModel(__props, "open");
    const emailInput = vueExports.ref("");
    const emailMatches = vueExports.computed(
      () => emailInput.value.trim().toLowerCase() === props.userEmail.toLowerCase()
    );
    vueExports.watch(open, (isOpen) => {
      if (!isOpen) emailInput.value = "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$9;
      const _component_UAlert = _sfc_main$6;
      const _component_UFormField = _sfc_main$4;
      const _component_UInput = _sfc_main$5;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent_1(_component_UModal, vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Delete account",
        description: "This action is permanent and cannot be undone. All your data — portfolio, pages, blocks, collections, and media — will be deleted immediately."
      }, _attrs), {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UAlert, {
              color: "error",
              variant: "soft",
              icon: "i-lucide-triangle-alert",
              description: "Your account and all associated data will be permanently deleted. You will be logged out immediately."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UFormField, {
              label: `Type your email address to confirm: ${__props.userEmail}`,
              name: "email-confirm"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UInput, {
                    modelValue: vueExports.unref(emailInput),
                    "onUpdate:modelValue": ($event) => vueExports.isRef(emailInput) ? emailInput.value = $event : null,
                    type: "email",
                    placeholder: "Enter your email address",
                    class: "w-full",
                    autocomplete: "off"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(emailInput),
                      "onUpdate:modelValue": ($event) => vueExports.isRef(emailInput) ? emailInput.value = $event : null,
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
              vueExports.createVNode("div", { class: "space-y-4" }, [
                vueExports.createVNode(_component_UAlert, {
                  color: "error",
                  variant: "soft",
                  icon: "i-lucide-triangle-alert",
                  description: "Your account and all associated data will be permanently deleted. You will be logged out immediately."
                }),
                vueExports.createVNode(_component_UFormField, {
                  label: `Type your email address to confirm: ${__props.userEmail}`,
                  name: "email-confirm"
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(emailInput),
                      "onUpdate:modelValue": ($event) => vueExports.isRef(emailInput) ? emailInput.value = $event : null,
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
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-2 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UButton, {
              variant: "ghost",
              onClick: ($event) => {
                emit("cancel");
                open.value = false;
              }
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    vueExports.createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UButton, {
              color: "error",
              disabled: !vueExports.unref(emailMatches),
              onClick: ($event) => emit("confirm")
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delete my account `);
                } else {
                  return [
                    vueExports.createTextVNode(" Delete my account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "flex justify-end gap-2 w-full" }, [
                vueExports.createVNode(_component_UButton, {
                  variant: "ghost",
                  onClick: ($event) => {
                    emit("cancel");
                    open.value = false;
                  }
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode(" Cancel ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                vueExports.createVNode(_component_UButton, {
                  color: "error",
                  disabled: !vueExports.unref(emailMatches),
                  onClick: ($event) => emit("confirm")
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode(" Delete my account ")
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
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/DeleteAccountModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$1, { __name: "AdminDeleteAccountModal" });
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "my-account",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { user, fetch: fetchUser } = useCurrentUser();
    const { fetcher } = useApi();
    [__temp, __restore] = vueExports.withAsyncContext(() => fetchUser()), await __temp, __restore();
    const form = vueExports.reactive({ name: "" });
    vueExports.watch(
      user,
      (u) => {
        if (u) form.name = u.name ?? "";
      },
      { immediate: true }
    );
    const { markSaved } = useUnsavedChanges(form);
    const successMessage = vueExports.ref("");
    const errorMessage = vueExports.ref("");
    const saving = vueExports.ref(false);
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
    const avatarModalOpen = vueExports.ref(false);
    const displayedImage = vueExports.computed(() => user.value?.image ?? null);
    function onAvatarSuccess(imageUrl) {
      if (user.value) user.value.image = imageUrl;
    }
    const { features, fetchFeatures } = useServerFeatures();
    [__temp, __restore] = vueExports.withAsyncContext(() => fetchFeatures()), await __temp, __restore();
    const deleteModalOpen = vueExports.ref(false);
    const deleting = vueExports.ref(false);
    const deleteError = vueExports.ref("");
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
      _push(ssrRenderComponent_1(_component_AdminLayoutPageStructure, vueExports.mergeProps({
        title: "My Account",
        description: "Configure settings for your user account."
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-md"${_scopeId}><div class="flex items-center gap-4 mb-8"${_scopeId}><div class="w-20 h-20 rounded-full overflow-hidden bg-muted border border-muted flex items-center justify-center shrink-0"${_scopeId}>`);
            if (vueExports.unref(displayedImage)) {
              _push2(`<img${ssrRenderAttr_1("src", vueExports.unref(displayedImage))} alt="Profile image" class="w-full h-full object-cover"${_scopeId}>`);
            } else {
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-user",
                class: "w-8 h-8 text-muted-foreground"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div><div${_scopeId}><p class="font-medium"${_scopeId}>Profile Image</p><p class="text-sm text-muted mb-2"${_scopeId}>JPG, PNG, GIF or WebP · max 10 MB</p>`);
            _push2(ssrRenderComponent_1(_component_UButton, {
              size: "sm",
              variant: "outline",
              icon: "i-lucide-pencil",
              onClick: ($event) => avatarModalOpen.value = true
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Change avatar `);
                } else {
                  return [
                    vueExports.createTextVNode(" Change avatar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent_1(_component_AdminAvatarModal, {
              open: vueExports.unref(avatarModalOpen),
              "onUpdate:open": ($event) => vueExports.isRef(avatarModalOpen) ? avatarModalOpen.value = $event : null,
              "current-image": vueExports.unref(displayedImage),
              "storage-enabled": vueExports.unref(features).storage,
              onSuccess: onAvatarSuccess
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UForm, {
              class: "max-w-md space-y-4",
              onSubmit: save
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
                          "model-value": vueExports.unref(user)?.email,
                          type: "email",
                          disabled: "",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            "model-value": vueExports.unref(user)?.email,
                            type: "email",
                            disabled: "",
                            class: "w-full"
                          }, null, 8, ["model-value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, {
                    label: "Name",
                    name: "name"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).name,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event,
                          placeholder: "Your name",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).name,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event,
                            placeholder: "Your name",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(` Save changes `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Save changes ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UFormField, {
                      label: "Email",
                      name: "email"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          "model-value": vueExports.unref(user)?.email,
                          type: "email",
                          disabled: "",
                          class: "w-full"
                        }, null, 8, ["model-value"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "Name",
                      name: "name"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).name,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event,
                          placeholder: "Your name",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        vueExports.createTextVNode(" Save changes ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_USeparator, { class: "mt-8 mb-6" }, null, _parent2, _scopeId));
            _push2(`<div class="max-w-m"${_scopeId}><h2 class="font-medium mb-1"${_scopeId}>Password</h2><p class="text-muted text-sm mb-3"${_scopeId}>Send a password reset link to your email address.</p>`);
            _push2(ssrRenderComponent_1(_component_UButton, {
              to: "/reset-password",
              variant: "outline"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Reset password`);
                } else {
                  return [
                    vueExports.createTextVNode("Reset password")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent_1(_component_USeparator, { class: "mt-8 mb-6" }, null, _parent2, _scopeId));
            _push2(`<div class="max-w-md"${_scopeId}><h2 class="font-medium mb-1 text-red-600 dark:text-red-400"${_scopeId}>Danger zone</h2><p class="text-muted text-sm mb-3"${_scopeId}> Permanently delete your account and all associated data. This cannot be undone. </p>`);
            if (vueExports.unref(deleteError)) {
              _push2(ssrRenderComponent_1(_component_UAlert, {
                color: "error",
                variant: "soft",
                description: vueExports.unref(deleteError),
                class: "mb-3"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(_component_UButton, {
              color: "error",
              variant: "outline",
              onClick: ($event) => deleteModalOpen.value = true
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delete account `);
                } else {
                  return [
                    vueExports.createTextVNode(" Delete account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_AdminDeleteAccountModal, {
              open: vueExports.unref(deleteModalOpen),
              "onUpdate:open": ($event) => vueExports.isRef(deleteModalOpen) ? deleteModalOpen.value = $event : null,
              "user-email": vueExports.unref(user)?.email ?? "",
              onConfirm: confirmDeleteAccount,
              onCancel: ($event) => deleteError.value = ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "max-w-md" }, [
                vueExports.createVNode("div", { class: "flex items-center gap-4 mb-8" }, [
                  vueExports.createVNode("div", { class: "w-20 h-20 rounded-full overflow-hidden bg-muted border border-muted flex items-center justify-center shrink-0" }, [
                    vueExports.unref(displayedImage) ? (vueExports.openBlock(), vueExports.createBlock("img", {
                      key: 0,
                      src: vueExports.unref(displayedImage),
                      alt: "Profile image",
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src"])) : (vueExports.openBlock(), vueExports.createBlock(_component_UIcon, {
                      key: 1,
                      name: "i-lucide-user",
                      class: "w-8 h-8 text-muted-foreground"
                    }))
                  ]),
                  vueExports.createVNode("div", null, [
                    vueExports.createVNode("p", { class: "font-medium" }, "Profile Image"),
                    vueExports.createVNode("p", { class: "text-sm text-muted mb-2" }, "JPG, PNG, GIF or WebP · max 10 MB"),
                    vueExports.createVNode(_component_UButton, {
                      size: "sm",
                      variant: "outline",
                      icon: "i-lucide-pencil",
                      onClick: ($event) => avatarModalOpen.value = true
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Change avatar ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                vueExports.createVNode(_component_AdminAvatarModal, {
                  open: vueExports.unref(avatarModalOpen),
                  "onUpdate:open": ($event) => vueExports.isRef(avatarModalOpen) ? avatarModalOpen.value = $event : null,
                  "current-image": vueExports.unref(displayedImage),
                  "storage-enabled": vueExports.unref(features).storage,
                  onSuccess: onAvatarSuccess
                }, null, 8, ["open", "onUpdate:open", "current-image", "storage-enabled"]),
                vueExports.createVNode(_component_UForm, {
                  class: "max-w-md space-y-4",
                  onSubmit: vueExports.withModifiers(save, ["prevent"])
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UFormField, {
                      label: "Email",
                      name: "email"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          "model-value": vueExports.unref(user)?.email,
                          type: "email",
                          disabled: "",
                          class: "w-full"
                        }, null, 8, ["model-value"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, {
                      label: "Name",
                      name: "name"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).name,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event,
                          placeholder: "Your name",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        vueExports.createTextVNode(" Save changes ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ]),
                  _: 1
                }),
                vueExports.createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                vueExports.createVNode("div", { class: "max-w-m" }, [
                  vueExports.createVNode("h2", { class: "font-medium mb-1" }, "Password"),
                  vueExports.createVNode("p", { class: "text-muted text-sm mb-3" }, "Send a password reset link to your email address."),
                  vueExports.createVNode(_component_UButton, {
                    to: "/reset-password",
                    variant: "outline"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode("Reset password")
                    ]),
                    _: 1
                  })
                ]),
                vueExports.createVNode(_component_USeparator, { class: "mt-8 mb-6" }),
                vueExports.createVNode("div", { class: "max-w-md" }, [
                  vueExports.createVNode("h2", { class: "font-medium mb-1 text-red-600 dark:text-red-400" }, "Danger zone"),
                  vueExports.createVNode("p", { class: "text-muted text-sm mb-3" }, " Permanently delete your account and all associated data. This cannot be undone. "),
                  vueExports.unref(deleteError) ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                    key: 0,
                    color: "error",
                    variant: "soft",
                    description: vueExports.unref(deleteError),
                    class: "mb-3"
                  }, null, 8, ["description"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode(_component_UButton, {
                    color: "error",
                    variant: "outline",
                    onClick: ($event) => deleteModalOpen.value = true
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(" Delete account ")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  vueExports.createVNode(_component_AdminDeleteAccountModal, {
                    open: vueExports.unref(deleteModalOpen),
                    "onUpdate:open": ($event) => vueExports.isRef(deleteModalOpen) ? deleteModalOpen.value = $event : null,
                    "user-email": vueExports.unref(user)?.email ?? "",
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
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/my-account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=my-account-DSae_Mzl.mjs.map
