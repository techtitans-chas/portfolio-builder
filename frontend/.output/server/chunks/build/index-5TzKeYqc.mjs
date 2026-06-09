import { _ as __nuxt_component_0 } from './PageStructure-DGuBBy_1.mjs';
import { e as _sfc_main$8, j as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$2 } from './Modal-BBL-Wwu5.mjs';
import { _ as _sfc_main$3 } from './Badge-GvDWvg1z.mjs';
import { _ as _sfc_main$4 } from './Input-B_IU2Xmo.mjs';
import { _ as _sfc_main$5 } from './Alert-CsIjDkc0.mjs';
import { g as getCollectionType, c as collectionTypes } from './collectionTypes-6EiXkZ_r.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { u as useCollections } from './useCollections-Be_EdGTg.mjs';
import { _ as __nuxt_component_4 } from './ConfirmModal-C3jTAYcv.mjs';
import { o as vueExports, f as ssrRenderComponent_1, g as ssrRenderList_1, a as ssrInterpolate_1, e as ssrRenderClass_1 } from '../routes/renderer.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "AddCollectionModal",
  __ssrInlineRender: true,
  props: {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  },
  emits: /* @__PURE__ */ vueExports.mergeModels(["added"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const open = vueExports.useModel(__props, "open");
    const { fetcher } = useApi();
    const { collections } = useCollections();
    const selectedType = vueExports.ref("");
    const customName = vueExports.ref("");
    const saving = vueExports.ref(false);
    const errorMessage = vueExports.ref("");
    const selectedTypeDef = vueExports.computed(() => collectionTypes.find((ct) => ct.type === selectedType.value));
    const alreadyHasType = vueExports.computed(() => collections.value.some((c) => c.type === selectedType.value));
    const existingNames = vueExports.computed(() => collections.value.map((c) => c.name.trim().toLowerCase()));
    const nameToSubmit = vueExports.computed(() => {
      if (!alreadyHasType.value) return selectedTypeDef.value?.label ?? "";
      return customName.value.trim();
    });
    const nameError = vueExports.computed(() => {
      if (!alreadyHasType.value || !customName.value.trim()) return "";
      if (existingNames.value.includes(customName.value.trim().toLowerCase())) {
        return "A collection with this name already exists.";
      }
      return "";
    });
    const canSubmit = vueExports.computed(() => {
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
    vueExports.watch(open, (val) => {
      if (val) reset();
    });
    vueExports.watch(selectedType, () => {
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
      _push(ssrRenderComponent_1(_component_UModal, vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Add collection"
      }, _attrs), {
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><p class="text-sm text-muted"${_scopeId}> Choose a collection type to add to your portfolio. Once added, the associated blocks will become available in the page builder. </p><div class="grid grid-cols-1 gap-2"${_scopeId}><!--[-->`);
            ssrRenderList_1(vueExports.unref(collectionTypes), (ct) => {
              _push2(`<button type="button" class="${ssrRenderClass_1([
                vueExports.unref(selectedType) === ct.type ? "border-primary bg-primary/5" : "border-default hover:bg-muted/30",
                "flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors text-left"
              ])}"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: ct.icon,
                class: "size-5 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`<div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><p class="font-medium text-sm"${_scopeId}>${ssrInterpolate_1(ct.label)}</p>`);
              if (vueExports.unref(collections).some((c) => c.type === ct.type)) {
                _push2(ssrRenderComponent_1(_component_UBadge, {
                  variant: "soft",
                  size: "xs",
                  color: "neutral"
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` added `);
                    } else {
                      return [
                        vueExports.createTextVNode(" added ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex items-center gap-1 mt-1 flex-wrap"${_scopeId}><span class="text-xs text-muted"${_scopeId}>Blocks:</span><!--[-->`);
              ssrRenderList_1(ct.allowedBlocks, (block) => {
                _push2(ssrRenderComponent_1(_component_UBadge, {
                  key: block,
                  variant: "soft",
                  size: "sm"
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate_1(block)}`);
                    } else {
                      return [
                        vueExports.createTextVNode(vueExports.toDisplayString(block), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div></button>`);
            });
            _push2(`<!--]--></div>`);
            if (vueExports.unref(alreadyHasType)) {
              _push2(`<div class="space-y-1"${_scopeId}><p class="text-sm font-medium"${_scopeId}>Collection name</p><p class="text-xs text-muted"${_scopeId}> You already have a ${ssrInterpolate_1(vueExports.unref(selectedTypeDef)?.label)} collection. Give this one a unique name. </p>`);
              _push2(ssrRenderComponent_1(_component_UInput, {
                modelValue: vueExports.unref(customName),
                "onUpdate:modelValue": ($event) => vueExports.isRef(customName) ? customName.value = $event : null,
                placeholder: `e.g. Articles, Blog posts…`,
                autofocus: "",
                onKeydown: add
              }, null, _parent2, _scopeId));
              if (vueExports.unref(nameError)) {
                _push2(`<p class="text-xs text-error"${_scopeId}>${ssrInterpolate_1(vueExports.unref(nameError))}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (vueExports.unref(errorMessage)) {
              _push2(ssrRenderComponent_1(_component_UAlert, {
                color: "error",
                variant: "soft",
                description: vueExports.unref(errorMessage)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-4" }, [
                vueExports.createVNode("p", { class: "text-sm text-muted" }, " Choose a collection type to add to your portfolio. Once added, the associated blocks will become available in the page builder. "),
                vueExports.createVNode("div", { class: "grid grid-cols-1 gap-2" }, [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(collectionTypes), (ct) => {
                    return vueExports.openBlock(), vueExports.createBlock("button", {
                      key: ct.type,
                      type: "button",
                      class: [
                        "flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors text-left",
                        vueExports.unref(selectedType) === ct.type ? "border-primary bg-primary/5" : "border-default hover:bg-muted/30"
                      ],
                      onClick: ($event) => selectedType.value = ct.type
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: ct.icon,
                        class: "size-5 shrink-0"
                      }, null, 8, ["name"]),
                      vueExports.createVNode("div", { class: "flex-1 min-w-0" }, [
                        vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                          vueExports.createVNode("p", { class: "font-medium text-sm" }, vueExports.toDisplayString(ct.label), 1),
                          vueExports.unref(collections).some((c) => c.type === ct.type) ? (vueExports.openBlock(), vueExports.createBlock(_component_UBadge, {
                            key: 0,
                            variant: "soft",
                            size: "xs",
                            color: "neutral"
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(" added ")
                            ]),
                            _: 1
                          })) : vueExports.createCommentVNode("", true)
                        ]),
                        vueExports.createVNode("div", { class: "flex items-center gap-1 mt-1 flex-wrap" }, [
                          vueExports.createVNode("span", { class: "text-xs text-muted" }, "Blocks:"),
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(ct.allowedBlocks, (block) => {
                            return vueExports.openBlock(), vueExports.createBlock(_component_UBadge, {
                              key: block,
                              variant: "soft",
                              size: "sm"
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createTextVNode(vueExports.toDisplayString(block), 1)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ])
                      ])
                    ], 10, ["onClick"]);
                  }), 128))
                ]),
                vueExports.unref(alreadyHasType) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "space-y-1"
                }, [
                  vueExports.createVNode("p", { class: "text-sm font-medium" }, "Collection name"),
                  vueExports.createVNode("p", { class: "text-xs text-muted" }, " You already have a " + vueExports.toDisplayString(vueExports.unref(selectedTypeDef)?.label) + " collection. Give this one a unique name. ", 1),
                  vueExports.createVNode(_component_UInput, {
                    modelValue: vueExports.unref(customName),
                    "onUpdate:modelValue": ($event) => vueExports.isRef(customName) ? customName.value = $event : null,
                    placeholder: `e.g. Articles, Blog posts…`,
                    autofocus: "",
                    onKeydown: vueExports.withKeys(add, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  vueExports.unref(nameError) ? (vueExports.openBlock(), vueExports.createBlock("p", {
                    key: 0,
                    class: "text-xs text-error"
                  }, vueExports.toDisplayString(vueExports.unref(nameError)), 1)) : vueExports.createCommentVNode("", true)
                ])) : vueExports.createCommentVNode("", true),
                vueExports.unref(errorMessage) ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                  key: 1,
                  color: "error",
                  variant: "soft",
                  description: vueExports.unref(errorMessage)
                }, null, 8, ["description"])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        footer: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-2 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UButton, {
              variant: "ghost",
              onClick: ($event) => open.value = false
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    vueExports.createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UButton, {
              loading: vueExports.unref(saving),
              disabled: !vueExports.unref(canSubmit),
              onClick: add
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add collection`);
                } else {
                  return [
                    vueExports.createTextVNode("Add collection")
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
                  onClick: ($event) => open.value = false
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("Cancel")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                vueExports.createVNode(_component_UButton, {
                  loading: vueExports.unref(saving),
                  disabled: !vueExports.unref(canSubmit),
                  onClick: add
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("Add collection")
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
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/collections/AddCollectionModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "AdminCollectionsAddCollectionModal" });
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { fetcher } = useApi();
    const { collections } = useCollections();
    const addModalOpen = vueExports.ref(false);
    const deleteModalOpen = vueExports.ref(false);
    const collectionToDelete = vueExports.ref(null);
    const deleting = vueExports.ref(false);
    const deleteError = vueExports.ref("");
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
      _push(ssrRenderComponent_1(_component_AdminLayoutPageStructure, {
        title: "Collections",
        description: "Manage your content collections. Adding a collection unlocks the associated blocks in the page builder."
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-lg grid gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UButton, {
              "trailing-icon": "i-lucide-plus",
              class: "w-full flex justify-center",
              onClick: ($event) => addModalOpen.value = true
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add collection`);
                } else {
                  return [
                    vueExports.createTextVNode("Add collection")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!vueExports.unref(collections).length) {
              _push2(`<div class="py-12 text-center text-muted text-sm"${_scopeId}> No collections yet. Add one to get started. </div>`);
            } else {
              _push2(`<div class="divide-y divide-default border border-default rounded-md"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(collections), (collection) => {
                _push2(`<div class="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UIcon, {
                  name: vueExports.unref(getCollectionType)(collection.type)?.icon ?? "i-lucide-database",
                  class: "size-4 shrink-0 text-muted-foreground"
                }, null, _parent2, _scopeId));
                _push2(`<div class="flex-1 min-w-0"${_scopeId}><p class="font-medium truncate"${_scopeId}>${ssrInterpolate_1(collection.name)}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate_1(collection.type)}</p></div><div class="flex items-center gap-1 shrink-0"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UButton, {
                  size: "xs",
                  variant: "ghost",
                  to: `/admin/collections/${collection.id}`
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Manage items `);
                    } else {
                      return [
                        vueExports.createTextVNode(" Manage items ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent_1(_component_UButton, {
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
              vueExports.createVNode("div", { class: "max-w-lg grid gap-4" }, [
                vueExports.createVNode(_component_UButton, {
                  "trailing-icon": "i-lucide-plus",
                  class: "w-full flex justify-center",
                  onClick: ($event) => addModalOpen.value = true
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createTextVNode("Add collection")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                !vueExports.unref(collections).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  class: "py-12 text-center text-muted text-sm"
                }, " No collections yet. Add one to get started. ")) : (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 1,
                  class: "divide-y divide-default border border-default rounded-md"
                }, [
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(collections), (collection) => {
                    return vueExports.openBlock(), vueExports.createBlock("div", {
                      key: collection.id,
                      class: "flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: vueExports.unref(getCollectionType)(collection.type)?.icon ?? "i-lucide-database",
                        class: "size-4 shrink-0 text-muted-foreground"
                      }, null, 8, ["name"]),
                      vueExports.createVNode("div", { class: "flex-1 min-w-0" }, [
                        vueExports.createVNode("p", { class: "font-medium truncate" }, vueExports.toDisplayString(collection.name), 1),
                        vueExports.createVNode("p", { class: "text-xs text-muted" }, vueExports.toDisplayString(collection.type), 1)
                      ]),
                      vueExports.createVNode("div", { class: "flex items-center gap-1 shrink-0" }, [
                        vueExports.createVNode(_component_UButton, {
                          size: "xs",
                          variant: "ghost",
                          to: `/admin/collections/${collection.id}`
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Manage items ")
                          ]),
                          _: 1
                        }, 8, ["to"]),
                        vueExports.createVNode(_component_UButton, {
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
      _push(ssrRenderComponent_1(_component_AdminCollectionsAddCollectionModal, {
        open: vueExports.unref(addModalOpen),
        "onUpdate:open": ($event) => vueExports.isRef(addModalOpen) ? addModalOpen.value = $event : null,
        onAdded
      }, null, _parent));
      _push(ssrRenderComponent_1(_component_AdminConfirmModal, {
        open: vueExports.unref(deleteModalOpen),
        "onUpdate:open": ($event) => vueExports.isRef(deleteModalOpen) ? deleteModalOpen.value = $event : null,
        title: "Delete collection",
        description: `Delete "${vueExports.unref(collectionToDelete)?.name}"? All items in this collection will be permanently removed.`,
        "confirm-label": "Delete",
        loading: vueExports.unref(deleting),
        "error-message": vueExports.unref(deleteError),
        onConfirm: confirmDelete,
        onCancel: ($event) => deleteModalOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/collections/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-5TzKeYqc.mjs.map
