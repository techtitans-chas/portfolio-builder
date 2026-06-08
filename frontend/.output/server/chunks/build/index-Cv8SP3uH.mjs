import { _ as __nuxt_component_0 } from './PageStructure-K8uU1ezD.mjs';
import { f as _sfc_main$8, e as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$2 } from './Modal-D9bZkufO.mjs';
import { _ as _sfc_main$3 } from './Badge-C0tQ5UcT.mjs';
import { _ as _sfc_main$4 } from './Input-DWHPzDmy.mjs';
import { _ as _sfc_main$5 } from './Alert-Nv5RlKkm.mjs';
import { defineComponent, ref, withCtx, createTextVNode, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, isRef, useModel, computed, watch, mergeProps, createCommentVNode, withKeys, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { g as getCollectionType, c as collectionTypes } from './collectionTypes-6EiXkZ_r.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { u as useCollections } from './useCollections-Be_EdGTg.mjs';
import { _ as __nuxt_component_4 } from './ConfirmModal-D6HutMUe.mjs';
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
import './overlay-BWwBD9XH.mjs';
import 'aria-hidden';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AddCollectionModal",
  __ssrInlineRender: true,
  props: {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["added"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const open = useModel(__props, "open");
    const { fetcher } = useApi();
    const { collections } = useCollections();
    const selectedType = ref("");
    const customName = ref("");
    const saving = ref(false);
    const errorMessage = ref("");
    const selectedTypeDef = computed(() => collectionTypes.find((ct) => ct.type === selectedType.value));
    const alreadyHasType = computed(() => collections.value.some((c) => c.type === selectedType.value));
    const existingNames = computed(() => collections.value.map((c) => c.name.trim().toLowerCase()));
    const nameToSubmit = computed(() => {
      if (!alreadyHasType.value) return selectedTypeDef.value?.label ?? "";
      return customName.value.trim();
    });
    const nameError = computed(() => {
      if (!alreadyHasType.value || !customName.value.trim()) return "";
      if (existingNames.value.includes(customName.value.trim().toLowerCase())) {
        return "A collection with this name already exists.";
      }
      return "";
    });
    const canSubmit = computed(() => {
      if (!selectedType.value) return false;
      if (alreadyHasType.value && !customName.value.trim()) return false;
      if (nameError.value) return false;
      return true;
    });
    function reset() {
      selectedType.value = "";
      customName.value = "";
      errorMessage.value = "";
    }
    watch(open, (val) => {
      if (val) reset();
    });
    watch(selectedType, () => {
      customName.value = "";
      errorMessage.value = "";
    });
    async function add() {
      if (!canSubmit.value) return;
      saving.value = true;
      errorMessage.value = "";
      try {
        const result = await fetcher("/api/collections", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ type: selectedType.value, name: nameToSubmit.value })
        });
        emit("added", result.collection);
        open.value = false;
      } catch (e) {
        errorMessage.value = e instanceof Error ? e.message : "Failed to add collection.";
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$2;
      const _component_UIcon = _sfc_main$d;
      const _component_UBadge = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_UAlert = _sfc_main$5;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Add collection"
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><p class="text-sm text-muted"${_scopeId}> Choose a collection type to add to your portfolio. Once added, the associated blocks will become available in the page builder. </p><div class="grid grid-cols-1 gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(collectionTypes), (ct) => {
              _push2(`<button type="button" class="${ssrRenderClass([
                unref(selectedType) === ct.type ? "border-primary bg-primary/5" : "border-default hover:bg-muted/30",
                "flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors text-left"
              ])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: ct.icon,
                class: "size-5 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`<div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><p class="font-medium text-sm"${_scopeId}>${ssrInterpolate(ct.label)}</p>`);
              if (unref(collections).some((c) => c.type === ct.type)) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  variant: "soft",
                  size: "xs",
                  color: "neutral"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` added `);
                    } else {
                      return [
                        createTextVNode(" added ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex items-center gap-1 mt-1 flex-wrap"${_scopeId}><span class="text-xs text-muted"${_scopeId}>Blocks:</span><!--[-->`);
              ssrRenderList(ct.allowedBlocks, (block) => {
                _push2(ssrRenderComponent(_component_UBadge, {
                  key: block,
                  variant: "soft",
                  size: "sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(block)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(block), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div></button>`);
            });
            _push2(`<!--]--></div>`);
            if (unref(alreadyHasType)) {
              _push2(`<div class="space-y-1"${_scopeId}><p class="text-sm font-medium"${_scopeId}>Collection name</p><p class="text-xs text-muted"${_scopeId}> You already have a ${ssrInterpolate(unref(selectedTypeDef)?.label)} collection. Give this one a unique name. </p>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(customName),
                "onUpdate:modelValue": ($event) => isRef(customName) ? customName.value = $event : null,
                placeholder: `e.g. Articles, Blog posts…`,
                autofocus: "",
                onKeydown: add
              }, null, _parent2, _scopeId));
              if (unref(nameError)) {
                _push2(`<p class="text-xs text-error"${_scopeId}>${ssrInterpolate(unref(nameError))}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(errorMessage)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "error",
                variant: "soft",
                description: unref(errorMessage)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("p", { class: "text-sm text-muted" }, " Choose a collection type to add to your portfolio. Once added, the associated blocks will become available in the page builder. "),
                createVNode("div", { class: "grid grid-cols-1 gap-2" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(collectionTypes), (ct) => {
                    return openBlock(), createBlock("button", {
                      key: ct.type,
                      type: "button",
                      class: [
                        "flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors text-left",
                        unref(selectedType) === ct.type ? "border-primary bg-primary/5" : "border-default hover:bg-muted/30"
                      ],
                      onClick: ($event) => selectedType.value = ct.type
                    }, [
                      createVNode(_component_UIcon, {
                        name: ct.icon,
                        class: "size-5 shrink-0"
                      }, null, 8, ["name"]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("p", { class: "font-medium text-sm" }, toDisplayString(ct.label), 1),
                          unref(collections).some((c) => c.type === ct.type) ? (openBlock(), createBlock(_component_UBadge, {
                            key: 0,
                            variant: "soft",
                            size: "xs",
                            color: "neutral"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" added ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center gap-1 mt-1 flex-wrap" }, [
                          createVNode("span", { class: "text-xs text-muted" }, "Blocks:"),
                          (openBlock(true), createBlock(Fragment, null, renderList(ct.allowedBlocks, (block) => {
                            return openBlock(), createBlock(_component_UBadge, {
                              key: block,
                              variant: "soft",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(block), 1)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ])
                      ])
                    ], 10, ["onClick"]);
                  }), 128))
                ]),
                unref(alreadyHasType) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-1"
                }, [
                  createVNode("p", { class: "text-sm font-medium" }, "Collection name"),
                  createVNode("p", { class: "text-xs text-muted" }, " You already have a " + toDisplayString(unref(selectedTypeDef)?.label) + " collection. Give this one a unique name. ", 1),
                  createVNode(_component_UInput, {
                    modelValue: unref(customName),
                    "onUpdate:modelValue": ($event) => isRef(customName) ? customName.value = $event : null,
                    placeholder: `e.g. Articles, Blog posts…`,
                    autofocus: "",
                    onKeydown: withKeys(add, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  unref(nameError) ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-xs text-error"
                  }, toDisplayString(unref(nameError)), 1)) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                unref(errorMessage) ? (openBlock(), createBlock(_component_UAlert, {
                  key: 1,
                  color: "error",
                  variant: "soft",
                  description: unref(errorMessage)
                }, null, 8, ["description"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-2 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              onClick: ($event) => open.value = false
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
            _push2(ssrRenderComponent(_component_UButton, {
              loading: unref(saving),
              disabled: !unref(canSubmit),
              onClick: add
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add collection`);
                } else {
                  return [
                    createTextVNode("Add collection")
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
                  onClick: ($event) => open.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode("Cancel")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_UButton, {
                  loading: unref(saving),
                  disabled: !unref(canSubmit),
                  onClick: add
                }, {
                  default: withCtx(() => [
                    createTextVNode("Add collection")
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/collections/AddCollectionModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "AdminCollectionsAddCollectionModal" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { fetcher } = useApi();
    const { collections } = useCollections();
    const addModalOpen = ref(false);
    const deleteModalOpen = ref(false);
    const collectionToDelete = ref(null);
    const deleting = ref(false);
    const deleteError = ref("");
    function onAdded(collection) {
      collections.value.push(collection);
    }
    function openDelete(collection) {
      collectionToDelete.value = collection;
      deleteError.value = "";
      deleteModalOpen.value = true;
    }
    async function confirmDelete() {
      if (!collectionToDelete.value) return;
      deleting.value = true;
      deleteError.value = "";
      try {
        await fetcher(`/api/collections/${collectionToDelete.value.id}`, {
          method: "DELETE",
          credentials: "include"
        });
        collections.value = collections.value.filter((c) => c.id !== collectionToDelete.value.id);
        deleteModalOpen.value = false;
        collectionToDelete.value = null;
      } catch (e) {
        deleteError.value = e instanceof Error ? e.message : "Failed to delete collection.";
      } finally {
        deleting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminLayoutPageStructure = __nuxt_component_0;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$d;
      const _component_AdminCollectionsAddCollectionModal = __nuxt_component_3;
      const _component_AdminConfirmModal = __nuxt_component_4;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AdminLayoutPageStructure, {
        title: "Collections",
        description: "Manage your content collections. Adding a collection unlocks the associated blocks in the page builder."
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-lg grid gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              "trailing-icon": "i-lucide-plus",
              class: "w-full flex justify-center",
              onClick: ($event) => addModalOpen.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add collection`);
                } else {
                  return [
                    createTextVNode("Add collection")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!unref(collections).length) {
              _push2(`<div class="py-12 text-center text-muted text-sm"${_scopeId}> No collections yet. Add one to get started. </div>`);
            } else {
              _push2(`<div class="divide-y divide-default border border-default rounded-md"${_scopeId}><!--[-->`);
              ssrRenderList(unref(collections), (collection) => {
                _push2(`<div class="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: unref(getCollectionType)(collection.type)?.icon ?? "i-lucide-database",
                  class: "size-4 shrink-0 text-muted-foreground"
                }, null, _parent2, _scopeId));
                _push2(`<div class="flex-1 min-w-0"${_scopeId}><p class="font-medium truncate"${_scopeId}>${ssrInterpolate(collection.name)}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(collection.type)}</p></div><div class="flex items-center gap-1 shrink-0"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  size: "xs",
                  variant: "ghost",
                  to: `/admin/collections/${collection.id}`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Manage items `);
                    } else {
                      return [
                        createTextVNode(" Manage items ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UButton, {
                  icon: "i-lucide-trash-2",
                  size: "xs",
                  variant: "ghost",
                  color: "error",
                  "aria-label": "Delete collection",
                  onClick: ($event) => openDelete(collection)
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-lg grid gap-4" }, [
                createVNode(_component_UButton, {
                  "trailing-icon": "i-lucide-plus",
                  class: "w-full flex justify-center",
                  onClick: ($event) => addModalOpen.value = true
                }, {
                  default: withCtx(() => [
                    createTextVNode("Add collection")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                !unref(collections).length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "py-12 text-center text-muted text-sm"
                }, " No collections yet. Add one to get started. ")) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "divide-y divide-default border border-default rounded-md"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(collections), (collection) => {
                    return openBlock(), createBlock("div", {
                      key: collection.id,
                      class: "flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
                    }, [
                      createVNode(_component_UIcon, {
                        name: unref(getCollectionType)(collection.type)?.icon ?? "i-lucide-database",
                        class: "size-4 shrink-0 text-muted-foreground"
                      }, null, 8, ["name"]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("p", { class: "font-medium truncate" }, toDisplayString(collection.name), 1),
                        createVNode("p", { class: "text-xs text-muted" }, toDisplayString(collection.type), 1)
                      ]),
                      createVNode("div", { class: "flex items-center gap-1 shrink-0" }, [
                        createVNode(_component_UButton, {
                          size: "xs",
                          variant: "ghost",
                          to: `/admin/collections/${collection.id}`
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Manage items ")
                          ]),
                          _: 1
                        }, 8, ["to"]),
                        createVNode(_component_UButton, {
                          icon: "i-lucide-trash-2",
                          size: "xs",
                          variant: "ghost",
                          color: "error",
                          "aria-label": "Delete collection",
                          onClick: ($event) => openDelete(collection)
                        }, null, 8, ["onClick"])
                      ])
                    ]);
                  }), 128))
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AdminCollectionsAddCollectionModal, {
        open: unref(addModalOpen),
        "onUpdate:open": ($event) => isRef(addModalOpen) ? addModalOpen.value = $event : null,
        onAdded
      }, null, _parent));
      _push(ssrRenderComponent(_component_AdminConfirmModal, {
        open: unref(deleteModalOpen),
        "onUpdate:open": ($event) => isRef(deleteModalOpen) ? deleteModalOpen.value = $event : null,
        title: "Delete collection",
        description: `Delete "${unref(collectionToDelete)?.name}"? All items in this collection will be permanently removed.`,
        "confirm-label": "Delete",
        loading: unref(deleting),
        "error-message": unref(deleteError),
        onConfirm: confirmDelete,
        onCancel: ($event) => deleteModalOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/collections/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cv8SP3uH.mjs.map
