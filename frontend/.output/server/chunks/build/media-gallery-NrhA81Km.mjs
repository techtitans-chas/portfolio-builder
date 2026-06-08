import { _ as __nuxt_component_0 } from './PageStructure-K8uU1ezD.mjs';
import { _ as _sfc_main$3 } from './Alert-Nv5RlKkm.mjs';
import { b as useMedia, _ as __nuxt_component_2 } from './MediaGrid-DBtVJH5B.mjs';
import { _ as _sfc_main$4 } from './Modal-D9bZkufO.mjs';
import { f as _sfc_main$8, e as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$5 } from './Input-DWHPzDmy.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, computed, createSlots, withKeys, withModifiers, Fragment, renderList, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
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
import '@iconify/utils';
import 'consola';
import './Container-CXQFSuFJ.mjs';
import './PopperArrow-CVyIWJ6M.mjs';
import '@vueuse/shared';
import '@floating-ui/vue';
import './overlay-BWwBD9XH.mjs';
import 'aria-hidden';
import './useApi-KjbfWxXr.mjs';
import 'vue-router';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'perfect-debounce';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MediaPreviewModal",
  __ssrInlineRender: true,
  props: {
    file: {},
    open: { type: Boolean }
  },
  emits: ["update:open", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { files, renameMedia } = useMedia();
    const liveFile = computed(
      () => props.file ? files.value.find((f) => f.id === props.file.id) ?? props.file : null
    );
    function close() {
      emit("update:open", false);
    }
    const renaming = ref(false);
    const renameValue = ref("");
    const renameSaving = ref(false);
    function openRename() {
      renameValue.value = liveFile.value.filename;
      renaming.value = true;
      nextTick(() => {
        (void 0).getElementById("rename-input")?.select();
      });
    }
    async function saveRename() {
      const name = renameValue.value.trim();
      if (!name || !liveFile.value) return;
      renameSaving.value = true;
      await renameMedia(liveFile.value.id, name);
      renameSaving.value = false;
      renaming.value = false;
    }
    function cancelRename() {
      renaming.value = false;
    }
    const copied = ref(false);
    async function copyUrl(url) {
      await (void 0).clipboard.writeText(url).catch(() => {
      });
      copied.value = true;
      setTimeout(() => copied.value = false, 2e3);
    }
    function formatBytes(bytes) {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    }
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString(void 0, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
    function isImage(fileType) {
      return fileType.startsWith("image/");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$4;
      const _component_UIcon = _sfc_main$d;
      const _component_UInput = _sfc_main$5;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        title: unref(liveFile)?.filename ?? "",
        onClose: close,
        "onUpdate:open": ($event) => emit("update:open", $event)
      }, _attrs), createSlots({ _: 2 }, [
        unref(liveFile) ? {
          name: "body",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-4"${_scopeId}>`);
              if (isImage(unref(liveFile).fileType)) {
                _push2(`<div class="rounded-lg overflow-hidden bg-muted flex items-center justify-center max-h-96"${_scopeId}><img${ssrRenderAttr("src", unref(liveFile).url)}${ssrRenderAttr("alt", unref(liveFile).filename)} class="max-w-full max-h-96 object-contain"${_scopeId}></div>`);
              } else {
                _push2(`<div class="flex justify-center py-8"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-lucide-file-text",
                  class: "w-20 h-20 text-muted"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`<dl class="text-sm space-y-1"${_scopeId}><div class="flex gap-2 items-center"${_scopeId}><dt class="text-muted w-24 shrink-0"${_scopeId}>Name</dt><dd class="flex-1 min-w-0"${_scopeId}>`);
              if (unref(renaming)) {
                _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UInput, {
                  id: "rename-input",
                  modelValue: unref(renameValue),
                  "onUpdate:modelValue": ($event) => isRef(renameValue) ? renameValue.value = $event : null,
                  size: "sm",
                  class: "flex-1",
                  onKeyup: [saveRename, cancelRename]
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UButton, {
                  size: "sm",
                  loading: unref(renameSaving),
                  onClick: saveRename
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Save`);
                    } else {
                      return [
                        createTextVNode("Save")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UButton, {
                  size: "sm",
                  variant: "ghost",
                  onClick: cancelRename
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Cancel`);
                    } else {
                      return [
                        createTextVNode("Cancel")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<div class="flex items-center gap-2"${_scopeId}><span class="truncate"${_scopeId}>${ssrInterpolate(unref(liveFile).filename)}</span>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  size: "xs",
                  variant: "ghost",
                  icon: "i-lucide-pencil",
                  onClick: openRename
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</dd></div><div class="flex gap-2"${_scopeId}><dt class="text-muted w-24 shrink-0"${_scopeId}>Type</dt><dd${_scopeId}>${ssrInterpolate(unref(liveFile).fileType)}</dd></div><div class="flex gap-2"${_scopeId}><dt class="text-muted w-24 shrink-0"${_scopeId}>Size</dt><dd${_scopeId}>${ssrInterpolate(formatBytes(unref(liveFile).sizeBytes))}</dd></div><div class="flex gap-2"${_scopeId}><dt class="text-muted w-24 shrink-0"${_scopeId}>Uploaded</dt><dd${_scopeId}>${ssrInterpolate(formatDate(unref(liveFile).createdAt))}</dd></div><div class="flex gap-2 items-center"${_scopeId}><dt class="text-muted w-24 shrink-0"${_scopeId}>URL</dt><dd class="truncate text-xs font-mono"${_scopeId}>${ssrInterpolate(unref(liveFile).url)}</dd></div></dl><div class="flex gap-2 pt-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "outline",
                icon: unref(copied) ? "i-lucide-check" : "i-lucide-copy",
                size: "sm",
                onClick: ($event) => copyUrl(unref(liveFile).url)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(copied) ? "Copied!" : "Copy URL")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(copied) ? "Copied!" : "Copy URL"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                href: unref(liveFile).url,
                target: "_blank",
                variant: "outline",
                icon: "i-lucide-external-link",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Open `);
                  } else {
                    return [
                      createTextVNode(" Open ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                color: "error",
                variant: "outline",
                icon: "i-lucide-trash-2",
                size: "sm",
                class: "ml-auto",
                onClick: ($event) => {
                  emit("delete", unref(liveFile));
                  close();
                }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Delete `);
                  } else {
                    return [
                      createTextVNode(" Delete ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-4" }, [
                  isImage(unref(liveFile).fileType) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-lg overflow-hidden bg-muted flex items-center justify-center max-h-96"
                  }, [
                    createVNode("img", {
                      src: unref(liveFile).url,
                      alt: unref(liveFile).filename,
                      class: "max-w-full max-h-96 object-contain"
                    }, null, 8, ["src", "alt"])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex justify-center py-8"
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-lucide-file-text",
                      class: "w-20 h-20 text-muted"
                    })
                  ])),
                  createVNode("dl", { class: "text-sm space-y-1" }, [
                    createVNode("div", { class: "flex gap-2 items-center" }, [
                      createVNode("dt", { class: "text-muted w-24 shrink-0" }, "Name"),
                      createVNode("dd", { class: "flex-1 min-w-0" }, [
                        unref(renaming) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode(_component_UInput, {
                            id: "rename-input",
                            modelValue: unref(renameValue),
                            "onUpdate:modelValue": ($event) => isRef(renameValue) ? renameValue.value = $event : null,
                            size: "sm",
                            class: "flex-1",
                            onKeyup: [
                              withKeys(saveRename, ["enter"]),
                              withKeys(cancelRename, ["escape"])
                            ]
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UButton, {
                            size: "sm",
                            loading: unref(renameSaving),
                            onClick: saveRename
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save")
                            ]),
                            _: 1
                          }, 8, ["loading"]),
                          createVNode(_component_UButton, {
                            size: "sm",
                            variant: "ghost",
                            onClick: cancelRename
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          })
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode("span", { class: "truncate" }, toDisplayString(unref(liveFile).filename), 1),
                          createVNode(_component_UButton, {
                            size: "xs",
                            variant: "ghost",
                            icon: "i-lucide-pencil",
                            onClick: openRename
                          })
                        ]))
                      ])
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("dt", { class: "text-muted w-24 shrink-0" }, "Type"),
                      createVNode("dd", null, toDisplayString(unref(liveFile).fileType), 1)
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("dt", { class: "text-muted w-24 shrink-0" }, "Size"),
                      createVNode("dd", null, toDisplayString(formatBytes(unref(liveFile).sizeBytes)), 1)
                    ]),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("dt", { class: "text-muted w-24 shrink-0" }, "Uploaded"),
                      createVNode("dd", null, toDisplayString(formatDate(unref(liveFile).createdAt)), 1)
                    ]),
                    createVNode("div", { class: "flex gap-2 items-center" }, [
                      createVNode("dt", { class: "text-muted w-24 shrink-0" }, "URL"),
                      createVNode("dd", { class: "truncate text-xs font-mono" }, toDisplayString(unref(liveFile).url), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2 pt-2" }, [
                    createVNode(_component_UButton, {
                      variant: "outline",
                      icon: unref(copied) ? "i-lucide-check" : "i-lucide-copy",
                      size: "sm",
                      onClick: ($event) => copyUrl(unref(liveFile).url)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(copied) ? "Copied!" : "Copy URL"), 1)
                      ]),
                      _: 1
                    }, 8, ["icon", "onClick"]),
                    createVNode(_component_UButton, {
                      href: unref(liveFile).url,
                      target: "_blank",
                      variant: "outline",
                      icon: "i-lucide-external-link",
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Open ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(_component_UButton, {
                      color: "error",
                      variant: "outline",
                      icon: "i-lucide-trash-2",
                      size: "sm",
                      class: "ml-auto",
                      onClick: ($event) => {
                        emit("delete", unref(liveFile));
                        close();
                      }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Delete ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/MediaPreviewModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "AdminMediaPreviewModal" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MediaUploadModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { uploading, uploadQueue, uploadError, allowedTypes, handleFiles, clearUploadQueue } = useMedia();
    const isDragging = ref(false);
    const fileInput = ref(null);
    async function onFileInput(e) {
      const input = e.target;
      if (!input.files?.length) return;
      const done = await handleFiles(input.files);
      input.value = "";
      if (done) closeModal();
    }
    async function onDrop(e) {
      isDragging.value = false;
      if (!e.dataTransfer?.files?.length) return;
      const done = await handleFiles(e.dataTransfer.files);
      if (done) closeModal();
    }
    function closeModal() {
      clearUploadQueue();
      emit("update:open", false);
    }
    function onModalUpdateOpen(val) {
      if (!val && !uploading.value) closeModal();
    }
    const hasErrors = computed(() => uploadQueue.value.some((e) => e.status === "error"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$4;
      const _component_UIcon = _sfc_main$d;
      const _component_UAlert = _sfc_main$3;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        title: "Upload files",
        "onUpdate:open": onModalUpdateOpen
      }, _attrs), createSlots({
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            if (unref(uploadQueue).length === 0) {
              _push2(`<div class="${ssrRenderClass([
                unref(isDragging) ? "border-primary bg-primary/5" : "border-default hover:border-primary/50",
                "border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors"
              ])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-lucide-upload-cloud",
                class: "w-10 h-10 text-muted"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-center"${_scopeId}><p class="font-medium"${_scopeId}>Drop files here or click to browse</p><p class="text-sm text-muted mt-1"${_scopeId}> Images (JPG, PNG, GIF, WebP, SVG) · Documents (PDF, DOC, DOCX) · Spreadsheets (XLS, XLSX, CSV) · Text · JPG/PNG converted to WebP · max 2 MB for images </p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input type="file" multiple${ssrRenderAttr("accept", unref(allowedTypes).join(","))} class="hidden"${_scopeId}>`);
            if (unref(uploadError)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "error",
                variant: "soft",
                description: unref(uploadError)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(uploadQueue).length > 0) {
              _push2(`<ul class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(unref(uploadQueue), (entry) => {
                _push2(`<li class="space-y-1"${_scopeId}><div class="flex items-center justify-between text-sm"${_scopeId}><span class="truncate max-w-[80%]"${_scopeId}>${ssrInterpolate(entry.file.name)}</span><span class="text-muted shrink-0 ml-2"${_scopeId}>`);
                if (entry.status === "done") {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-check",
                    class: "w-4 h-4 text-success"
                  }, null, _parent2, _scopeId));
                } else if (entry.status === "error") {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-x",
                    class: "w-4 h-4 text-error"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<span${_scopeId}>${ssrInterpolate(entry.progress)}%</span>`);
                }
                _push2(`</span></div><div class="h-1.5 rounded-full bg-muted overflow-hidden"${_scopeId}><div class="${ssrRenderClass([entry.status === "error" ? "bg-error" : "bg-primary", "h-full rounded-full transition-all duration-200"])}" style="${ssrRenderStyle({ width: `${entry.progress}%` })}"${_scopeId}></div></div>`);
                if (entry.error) {
                  _push2(`<p class="text-xs text-error"${_scopeId}>${ssrInterpolate(entry.error)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                unref(uploadQueue).length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: [
                    "border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors",
                    unref(isDragging) ? "border-primary bg-primary/5" : "border-default hover:border-primary/50"
                  ],
                  onClick: ($event) => unref(fileInput)?.click(),
                  onDragover: withModifiers(($event) => isDragging.value = true, ["prevent"]),
                  onDragleave: ($event) => isDragging.value = false,
                  onDrop: withModifiers(onDrop, ["prevent"])
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-lucide-upload-cloud",
                    class: "w-10 h-10 text-muted"
                  }),
                  createVNode("div", { class: "text-center" }, [
                    createVNode("p", { class: "font-medium" }, "Drop files here or click to browse"),
                    createVNode("p", { class: "text-sm text-muted mt-1" }, " Images (JPG, PNG, GIF, WebP, SVG) · Documents (PDF, DOC, DOCX) · Spreadsheets (XLS, XLSX, CSV) · Text · JPG/PNG converted to WebP · max 2 MB for images ")
                  ])
                ], 42, ["onClick", "onDragover", "onDragleave"])) : createCommentVNode("", true),
                createVNode("input", {
                  ref_key: "fileInput",
                  ref: fileInput,
                  type: "file",
                  multiple: "",
                  accept: unref(allowedTypes).join(","),
                  class: "hidden",
                  onChange: onFileInput
                }, null, 40, ["accept"]),
                unref(uploadError) ? (openBlock(), createBlock(_component_UAlert, {
                  key: 1,
                  color: "error",
                  variant: "soft",
                  description: unref(uploadError)
                }, null, 8, ["description"])) : createCommentVNode("", true),
                unref(uploadQueue).length > 0 ? (openBlock(), createBlock("ul", {
                  key: 2,
                  class: "space-y-3"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(uploadQueue), (entry) => {
                    return openBlock(), createBlock("li", {
                      key: entry.file.name,
                      class: "space-y-1"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                        createVNode("span", { class: "truncate max-w-[80%]" }, toDisplayString(entry.file.name), 1),
                        createVNode("span", { class: "text-muted shrink-0 ml-2" }, [
                          entry.status === "done" ? (openBlock(), createBlock(_component_UIcon, {
                            key: 0,
                            name: "i-lucide-check",
                            class: "w-4 h-4 text-success"
                          })) : entry.status === "error" ? (openBlock(), createBlock(_component_UIcon, {
                            key: 1,
                            name: "i-lucide-x",
                            class: "w-4 h-4 text-error"
                          })) : (openBlock(), createBlock("span", { key: 2 }, toDisplayString(entry.progress) + "%", 1))
                        ])
                      ]),
                      createVNode("div", { class: "h-1.5 rounded-full bg-muted overflow-hidden" }, [
                        createVNode("div", {
                          class: ["h-full rounded-full transition-all duration-200", entry.status === "error" ? "bg-error" : "bg-primary"],
                          style: { width: `${entry.progress}%` }
                        }, null, 6)
                      ]),
                      entry.error ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-error"
                      }, toDisplayString(entry.error), 1)) : createCommentVNode("", true)
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 2
      }, [
        unref(uploadQueue).length > 0 ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                disabled: unref(uploading),
                onClick: closeModal
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(hasErrors) ? "Close" : "Done")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(hasErrors) ? "Close" : "Done"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-end" }, [
                  createVNode(_component_UButton, {
                    disabled: unref(uploading),
                    onClick: closeModal
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(hasErrors) ? "Close" : "Done"), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/MediaUploadModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$1, { __name: "AdminMediaUploadModal" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "media-gallery",
  __ssrInlineRender: true,
  setup(__props) {
    const { features } = useServerFeatures();
    const { deleteMedia } = useMedia();
    const uploadModalOpen = ref(false);
    const previewFile = ref(null);
    const previewOpen = ref(false);
    function openPreview(file) {
      previewFile.value = file;
      previewOpen.value = true;
    }
    const deleteTarget = ref(null);
    const deleteOpen = ref(false);
    const deleting = ref(false);
    function requestDelete(file) {
      deleteTarget.value = file;
      deleteOpen.value = true;
    }
    async function confirmDelete() {
      if (!deleteTarget.value) return;
      deleting.value = true;
      await deleteMedia(deleteTarget.value.id);
      deleting.value = false;
      deleteOpen.value = false;
      deleteTarget.value = null;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminLayoutPageStructure = __nuxt_component_0;
      const _component_UAlert = _sfc_main$3;
      const _component_AdminMediaGrid = __nuxt_component_2;
      const _component_AdminMediaPreviewModal = __nuxt_component_3;
      const _component_UModal = _sfc_main$4;
      const _component_UButton = _sfc_main$8;
      const _component_AdminMediaUploadModal = __nuxt_component_6;
      _push(ssrRenderComponent(_component_AdminLayoutPageStructure, mergeProps({
        title: "Media Gallery",
        description: "Upload and manage your portfolio's media files."
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(features).storage) {
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "info",
                variant: "soft",
                icon: "i-lucide-cloud-off",
                title: "File uploads not configured",
                description: "Cloudflare R2 is not set up. You can still use the default images below.",
                class: "mb-6"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_AdminMediaGrid, {
              "can-upload": unref(features).storage,
              onPreview: openPreview,
              onUpload: ($event) => uploadModalOpen.value = true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AdminMediaPreviewModal, {
              open: unref(previewOpen),
              "onUpdate:open": ($event) => isRef(previewOpen) ? previewOpen.value = $event : null,
              file: unref(previewFile),
              onDelete: requestDelete
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UModal, {
              open: unref(deleteOpen),
              "onUpdate:open": ($event) => isRef(deleteOpen) ? deleteOpen.value = $event : null,
              title: "Delete file",
              onClose: ($event) => {
                deleteTarget.value = null;
                deleteOpen.value = false;
              }
            }, {
              body: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-sm"${_scopeId2}> Are you sure you want to delete <strong${_scopeId2}>${ssrInterpolate(unref(deleteTarget)?.filename)}</strong>? This cannot be undone. </p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-sm" }, [
                      createTextVNode(" Are you sure you want to delete "),
                      createVNode("strong", null, toDisplayString(unref(deleteTarget)?.filename), 1),
                      createTextVNode("? This cannot be undone. ")
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-2 justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    variant: "outline",
                    onClick: ($event) => {
                      deleteTarget.value = null;
                      deleteOpen.value = false;
                    }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cancel`);
                      } else {
                        return [
                          createTextVNode("Cancel")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "error",
                    loading: unref(deleting),
                    onClick: confirmDelete
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Delete`);
                      } else {
                        return [
                          createTextVNode("Delete")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-2 justify-end" }, [
                      createVNode(_component_UButton, {
                        variant: "outline",
                        onClick: ($event) => {
                          deleteTarget.value = null;
                          deleteOpen.value = false;
                        }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UButton, {
                        color: "error",
                        loading: unref(deleting),
                        onClick: confirmDelete
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Delete")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AdminMediaUploadModal, {
              open: unref(uploadModalOpen),
              "onUpdate:open": ($event) => isRef(uploadModalOpen) ? uploadModalOpen.value = $event : null
            }, null, _parent2, _scopeId));
          } else {
            return [
              !unref(features).storage ? (openBlock(), createBlock(_component_UAlert, {
                key: 0,
                color: "info",
                variant: "soft",
                icon: "i-lucide-cloud-off",
                title: "File uploads not configured",
                description: "Cloudflare R2 is not set up. You can still use the default images below.",
                class: "mb-6"
              })) : createCommentVNode("", true),
              createVNode(_component_AdminMediaGrid, {
                "can-upload": unref(features).storage,
                onPreview: openPreview,
                onUpload: ($event) => uploadModalOpen.value = true
              }, null, 8, ["can-upload", "onUpload"]),
              createVNode(_component_AdminMediaPreviewModal, {
                open: unref(previewOpen),
                "onUpdate:open": ($event) => isRef(previewOpen) ? previewOpen.value = $event : null,
                file: unref(previewFile),
                onDelete: requestDelete
              }, null, 8, ["open", "onUpdate:open", "file"]),
              createVNode(_component_UModal, {
                open: unref(deleteOpen),
                "onUpdate:open": ($event) => isRef(deleteOpen) ? deleteOpen.value = $event : null,
                title: "Delete file",
                onClose: ($event) => {
                  deleteTarget.value = null;
                  deleteOpen.value = false;
                }
              }, {
                body: withCtx(() => [
                  createVNode("p", { class: "text-sm" }, [
                    createTextVNode(" Are you sure you want to delete "),
                    createVNode("strong", null, toDisplayString(unref(deleteTarget)?.filename), 1),
                    createTextVNode("? This cannot be undone. ")
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "flex gap-2 justify-end" }, [
                    createVNode(_component_UButton, {
                      variant: "outline",
                      onClick: ($event) => {
                        deleteTarget.value = null;
                        deleteOpen.value = false;
                      }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Cancel")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_UButton, {
                      color: "error",
                      loading: unref(deleting),
                      onClick: confirmDelete
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Delete")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open", "onClose"]),
              createVNode(_component_AdminMediaUploadModal, {
                open: unref(uploadModalOpen),
                "onUpdate:open": ($event) => isRef(uploadModalOpen) ? uploadModalOpen.value = $event : null
              }, null, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/media-gallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=media-gallery-NrhA81Km.mjs.map
