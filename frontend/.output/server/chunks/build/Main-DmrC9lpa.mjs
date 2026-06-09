import { p as pointerDownOutside, e as DialogRoot_default, g as DialogTrigger_default, d as DialogPortal_default, c as DialogOverlay_default, a as DialogContent_default, f as DialogTitle_default, b as DialogDescription_default, D as DialogClose_default } from './overlay-BWwBD9XH.mjs';
import { ac as useComponentProps, a8 as useAppConfig, a5 as tv, b as Primitive, an as useLocale, ak as useForwardProps, Z as reactiveOmit, e as _sfc_main$8, j as _sfc_main$d, $ as reactivePick, aq as usePortal, F as FieldGroupReset, V as VisuallyHidden_default, ay as useState } from './server.mjs';
import { u as usePrefix } from './usePrefix-DEbZTxVe.mjs';
import { o as vueExports, f as ssrRenderComponent_1, i as ssrRenderSlot_1, a as ssrInterpolate_1, e as ssrRenderClass_1 } from '../routes/renderer.mjs';

const theme$1 = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-(--ui-header-height)",
    "wrapper": "",
    "body": "flex-1 overflow-y-auto p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "side": {
      "top": {
        "content": ""
      },
      "right": {
        "content": "max-w-md"
      },
      "bottom": {
        "content": ""
      },
      "left": {
        "content": "max-w-md"
      }
    },
    "inset": {
      "true": {
        "content": "rounded-lg"
      }
    },
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]"
      }
    }
  },
  "compoundVariants": [
    {
      "side": "top",
      "inset": true,
      "class": {
        "content": "max-h-[calc(100%-2rem)] inset-x-4 top-4"
      }
    },
    {
      "side": "top",
      "inset": false,
      "class": {
        "content": "max-h-full inset-x-0 top-0"
      }
    },
    {
      "side": "right",
      "inset": true,
      "class": {
        "content": "w-[calc(100%-2rem)] inset-y-4 right-4"
      }
    },
    {
      "side": "right",
      "inset": false,
      "class": {
        "content": "w-full inset-y-0 right-0"
      }
    },
    {
      "side": "bottom",
      "inset": true,
      "class": {
        "content": "max-h-[calc(100%-2rem)] inset-x-4 bottom-4"
      }
    },
    {
      "side": "bottom",
      "inset": false,
      "class": {
        "content": "max-h-full inset-x-0 bottom-0"
      }
    },
    {
      "side": "left",
      "inset": true,
      "class": {
        "content": "w-[calc(100%-2rem)] inset-y-4 left-4"
      }
    },
    {
      "side": "left",
      "inset": false,
      "class": {
        "content": "w-full inset-y-0 left-0"
      }
    },
    {
      "transition": true,
      "side": "top",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "right",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "bottom",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "left",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out]"
      }
    }
  ]
};
const _sfc_main$2 = {
  __name: "USlideover",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    transition: { type: Boolean, required: false, default: true },
    side: { type: null, required: false, default: "right" },
    inset: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const props = useComponentProps("slideover", _props);
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = vueExports.toRef(() => props.content);
    const contentEvents = vueExports.computed(() => {
      if (!props.dismissible) {
        const events = ["interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside
      };
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.slideover || {} })({
      transition: props.transition,
      side: props.side,
      inset: props.inset
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(DialogRoot_default), vueExports.mergeProps(vueExports.unref(rootProps), _attrs), {
        default: vueExports.withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent_1(vueExports.unref(DialogTrigger_default), {
                "as-child": "",
                class: vueExports.unref(props).class
              }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot_1(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(vueExports.unref(DialogPortal_default), vueExports.unref(portalProps), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(FieldGroupReset), null, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (vueExports.unref(props).overlay) {
                          _push4(ssrRenderComponent_1(vueExports.unref(DialogOverlay_default), {
                            "data-slot": "overlay",
                            class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent_1(vueExports.unref(DialogContent_default), vueExports.mergeProps({
                          "data-side": vueExports.unref(props).side,
                          "data-slot": "content",
                          class: ui.value.content({ class: [!slots.default && vueExports.unref(props).class, vueExports.unref(props).ui?.content] })
                        }, contentProps.value, {
                          onAfterEnter: ($event) => emits("after:enter"),
                          onAfterLeave: ($event) => emits("after:leave")
                        }, vueExports.toHandlers(contentEvents.value)), {
                          default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content) {
                                _push5(ssrRenderComponent_1(vueExports.unref(VisuallyHidden_default), null, {
                                  default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      if (!vueExports.unref(props).title && !slots.title) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), null, null, _parent6, _scopeId5));
                                      } else if (!!slots.content) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), null, {
                                          default: vueExports.withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                                                _push7(`${ssrInterpolate_1(vueExports.unref(props).title)}`);
                                              }, _push7, _parent7, _scopeId6);
                                            } else {
                                              return [
                                                vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      if (!vueExports.unref(props).description && !slots.description) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), null, null, _parent6, _scopeId5));
                                      } else if (!!slots.content) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), null, {
                                          default: vueExports.withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                                                _push7(`${ssrInterpolate_1(vueExports.unref(props).description)}`);
                                              }, _push7, _parent7, _scopeId6);
                                            } else {
                                              return [
                                                vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                    } else {
                                      return [
                                        !vueExports.unref(props).title && !slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 1 }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                            ])
                                          ]),
                                          _: 3
                                        })) : vueExports.createCommentVNode("", true),
                                        !vueExports.unref(props).description && !slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 3 }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                            ])
                                          ]),
                                          _: 3
                                        })) : vueExports.createCommentVNode("", true)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              ssrRenderSlot_1(_ctx.$slots, "content", { close }, () => {
                                if (!!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) || (vueExports.unref(props).close || !!slots.close)) {
                                  _push5(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(props).ui?.header }))}"${_scopeId4}>`);
                                  ssrRenderSlot_1(_ctx.$slots, "header", { close }, () => {
                                    if (vueExports.unref(props).title || !!slots.title || vueExports.unref(props).description || !!slots.description) {
                                      _push5(`<div data-slot="wrapper" class="${ssrRenderClass_1(ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper }))}"${_scopeId4}>`);
                                      if (vueExports.unref(props).title || !!slots.title) {
                                        _push5(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), {
                                          "data-slot": "title",
                                          class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                        }, {
                                          default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                                                _push6(`${ssrInterpolate_1(vueExports.unref(props).title)}`);
                                              }, _push6, _parent6, _scopeId5);
                                            } else {
                                              return [
                                                vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      if (vueExports.unref(props).description || !!slots.description) {
                                        _push5(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), {
                                          "data-slot": "description",
                                          class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                        }, {
                                          default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                                                _push6(`${ssrInterpolate_1(vueExports.unref(props).description)}`);
                                              }, _push6, _parent6, _scopeId5);
                                            } else {
                                              return [
                                                vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      _push5(`</div>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    ssrRenderSlot_1(_ctx.$slots, "actions", {}, null, _push5, _parent5, _scopeId4);
                                    if (vueExports.unref(props).close || !!slots.close) {
                                      _push5(ssrRenderComponent_1(vueExports.unref(DialogClose_default), { "as-child": "" }, {
                                        default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            ssrRenderSlot_1(_ctx.$slots, "close", { ui: ui.value }, () => {
                                              if (vueExports.unref(props).close) {
                                                _push6(ssrRenderComponent_1(_sfc_main$8, vueExports.mergeProps({
                                                  icon: vueExports.unref(props).closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                                  color: "neutral",
                                                  variant: "ghost",
                                                  "aria-label": vueExports.unref(t)("slideover.close")
                                                }, typeof vueExports.unref(props).close === "object" ? vueExports.unref(props).close : {}, {
                                                  "data-slot": "close",
                                                  class: ui.value.close({ class: vueExports.unref(props).ui?.close })
                                                }), null, _parent6, _scopeId5));
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                            }, _push6, _parent6, _scopeId5);
                                          } else {
                                            return [
                                              vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                                vueExports.unref(props).close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                                                  key: 0,
                                                  icon: vueExports.unref(props).closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                                  color: "neutral",
                                                  variant: "ghost",
                                                  "aria-label": vueExports.unref(t)("slideover.close")
                                                }, typeof vueExports.unref(props).close === "object" ? vueExports.unref(props).close : {}, {
                                                  "data-slot": "close",
                                                  class: ui.value.close({ class: vueExports.unref(props).ui?.close })
                                                }), null, 16, ["icon", "aria-label", "class"])) : vueExports.createCommentVNode("", true)
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                  }, _push5, _parent5, _scopeId4);
                                  _push5(`</div>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(props).ui?.body }))}"${_scopeId4}>`);
                                ssrRenderSlot_1(_ctx.$slots, "body", { close }, null, _push5, _parent5, _scopeId4);
                                _push5(`</div>`);
                                if (!!slots.footer) {
                                  _push5(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(props).ui?.footer }))}"${_scopeId4}>`);
                                  ssrRenderSlot_1(_ctx.$slots, "footer", { close }, null, _push5, _parent5, _scopeId4);
                                  _push5(`</div>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                              }, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                !vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 0 }, {
                                  default: vueExports.withCtx(() => [
                                    !vueExports.unref(props).title && !slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 1 }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                        ])
                                      ]),
                                      _: 3
                                    })) : vueExports.createCommentVNode("", true),
                                    !vueExports.unref(props).description && !slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 3 }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                        ])
                                      ]),
                                      _: 3
                                    })) : vueExports.createCommentVNode("", true)
                                  ]),
                                  _: 3
                                })) : vueExports.createCommentVNode("", true),
                                vueExports.renderSlot(_ctx.$slots, "content", { close }, () => [
                                  !!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) || (vueExports.unref(props).close || !!slots.close) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                    key: 0,
                                    "data-slot": "header",
                                    class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                                  }, [
                                    vueExports.renderSlot(_ctx.$slots, "header", { close }, () => [
                                      vueExports.unref(props).title || !!slots.title || vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                        key: 0,
                                        "data-slot": "wrapper",
                                        class: ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper })
                                      }, [
                                        vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                          key: 0,
                                          "data-slot": "title",
                                          class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                        }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                            ])
                                          ]),
                                          _: 3
                                        }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                        vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                          key: 1,
                                          "data-slot": "description",
                                          class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                        }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                            ])
                                          ]),
                                          _: 3
                                        }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                      ], 2)) : vueExports.createCommentVNode("", true),
                                      vueExports.renderSlot(_ctx.$slots, "actions"),
                                      vueExports.unref(props).close || !!slots.close ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogClose_default), {
                                        key: 1,
                                        "as-child": ""
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                            vueExports.unref(props).close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                                              key: 0,
                                              icon: vueExports.unref(props).closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                              color: "neutral",
                                              variant: "ghost",
                                              "aria-label": vueExports.unref(t)("slideover.close")
                                            }, typeof vueExports.unref(props).close === "object" ? vueExports.unref(props).close : {}, {
                                              "data-slot": "close",
                                              class: ui.value.close({ class: vueExports.unref(props).ui?.close })
                                            }), null, 16, ["icon", "aria-label", "class"])) : vueExports.createCommentVNode("", true)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024)) : vueExports.createCommentVNode("", true)
                                    ])
                                  ], 2)) : vueExports.createCommentVNode("", true),
                                  vueExports.createVNode("div", {
                                    "data-slot": "body",
                                    class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                                  }, [
                                    vueExports.renderSlot(_ctx.$slots, "body", { close })
                                  ], 2),
                                  !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                    key: 1,
                                    "data-slot": "footer",
                                    class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                                  }, [
                                    vueExports.renderSlot(_ctx.$slots, "footer", { close })
                                  ], 2)) : vueExports.createCommentVNode("", true)
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.unref(props).overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                            key: 0,
                            "data-slot": "overlay",
                            class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                          }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode(vueExports.unref(DialogContent_default), vueExports.mergeProps({
                            "data-side": vueExports.unref(props).side,
                            "data-slot": "content",
                            class: ui.value.content({ class: [!slots.default && vueExports.unref(props).class, vueExports.unref(props).ui?.content] })
                          }, contentProps.value, {
                            onAfterEnter: ($event) => emits("after:enter"),
                            onAfterLeave: ($event) => emits("after:leave")
                          }, vueExports.toHandlers(contentEvents.value)), {
                            default: vueExports.withCtx(() => [
                              !vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 0 }, {
                                default: vueExports.withCtx(() => [
                                  !vueExports.unref(props).title && !slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 1 }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : vueExports.createCommentVNode("", true),
                                  !vueExports.unref(props).description && !slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 3 }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : vueExports.createCommentVNode("", true)
                                ]),
                                _: 3
                              })) : vueExports.createCommentVNode("", true),
                              vueExports.renderSlot(_ctx.$slots, "content", { close }, () => [
                                !!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) || (vueExports.unref(props).close || !!slots.close) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: 0,
                                  "data-slot": "header",
                                  class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, "header", { close }, () => [
                                    vueExports.unref(props).title || !!slots.title || vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                      key: 0,
                                      "data-slot": "wrapper",
                                      class: ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper })
                                    }, [
                                      vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                        key: 0,
                                        "data-slot": "title",
                                        class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                      vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                        key: 1,
                                        "data-slot": "description",
                                        class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                    ], 2)) : vueExports.createCommentVNode("", true),
                                    vueExports.renderSlot(_ctx.$slots, "actions"),
                                    vueExports.unref(props).close || !!slots.close ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogClose_default), {
                                      key: 1,
                                      "as-child": ""
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          vueExports.unref(props).close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                                            key: 0,
                                            icon: vueExports.unref(props).closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": vueExports.unref(t)("slideover.close")
                                          }, typeof vueExports.unref(props).close === "object" ? vueExports.unref(props).close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: vueExports.unref(props).ui?.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : vueExports.createCommentVNode("", true)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)) : vueExports.createCommentVNode("", true)
                                  ])
                                ], 2)) : vueExports.createCommentVNode("", true),
                                vueExports.createVNode("div", {
                                  "data-slot": "body",
                                  class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, "body", { close })
                                ], 2),
                                !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: 1,
                                  "data-slot": "footer",
                                  class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, "footer", { close })
                                ], 2)) : vueExports.createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1040, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(FieldGroupReset), null, {
                      default: vueExports.withCtx(() => [
                        vueExports.unref(props).overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                          key: 0,
                          "data-slot": "overlay",
                          class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                        }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                        vueExports.createVNode(vueExports.unref(DialogContent_default), vueExports.mergeProps({
                          "data-side": vueExports.unref(props).side,
                          "data-slot": "content",
                          class: ui.value.content({ class: [!slots.default && vueExports.unref(props).class, vueExports.unref(props).ui?.content] })
                        }, contentProps.value, {
                          onAfterEnter: ($event) => emits("after:enter"),
                          onAfterLeave: ($event) => emits("after:leave")
                        }, vueExports.toHandlers(contentEvents.value)), {
                          default: vueExports.withCtx(() => [
                            !vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 0 }, {
                              default: vueExports.withCtx(() => [
                                !vueExports.unref(props).title && !slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 1 }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                    ])
                                  ]),
                                  _: 3
                                })) : vueExports.createCommentVNode("", true),
                                !vueExports.unref(props).description && !slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 3 }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                    ])
                                  ]),
                                  _: 3
                                })) : vueExports.createCommentVNode("", true)
                              ]),
                              _: 3
                            })) : vueExports.createCommentVNode("", true),
                            vueExports.renderSlot(_ctx.$slots, "content", { close }, () => [
                              !!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) || (vueExports.unref(props).close || !!slots.close) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 0,
                                "data-slot": "header",
                                class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, "header", { close }, () => [
                                  vueExports.unref(props).title || !!slots.title || vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                    key: 0,
                                    "data-slot": "wrapper",
                                    class: ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper })
                                  }, [
                                    vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                      key: 0,
                                      "data-slot": "title",
                                      class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                        ])
                                      ]),
                                      _: 3
                                    }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                    vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                      key: 1,
                                      "data-slot": "description",
                                      class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                        ])
                                      ]),
                                      _: 3
                                    }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                  ], 2)) : vueExports.createCommentVNode("", true),
                                  vueExports.renderSlot(_ctx.$slots, "actions"),
                                  vueExports.unref(props).close || !!slots.close ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogClose_default), {
                                    key: 1,
                                    "as-child": ""
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                        vueExports.unref(props).close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                                          key: 0,
                                          icon: vueExports.unref(props).closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                          color: "neutral",
                                          variant: "ghost",
                                          "aria-label": vueExports.unref(t)("slideover.close")
                                        }, typeof vueExports.unref(props).close === "object" ? vueExports.unref(props).close : {}, {
                                          "data-slot": "close",
                                          class: ui.value.close({ class: vueExports.unref(props).ui?.close })
                                        }), null, 16, ["icon", "aria-label", "class"])) : vueExports.createCommentVNode("", true)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)) : vueExports.createCommentVNode("", true)
                                ])
                              ], 2)) : vueExports.createCommentVNode("", true),
                              vueExports.createVNode("div", {
                                "data-slot": "body",
                                class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, "body", { close })
                              ], 2),
                              !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 1,
                                "data-slot": "footer",
                                class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, "footer", { close })
                              ], 2)) : vueExports.createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1040, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTrigger_default), {
                key: 0,
                "as-child": "",
                class: vueExports.unref(props).class
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class"])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(vueExports.unref(DialogPortal_default), vueExports.unref(portalProps), {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(FieldGroupReset), null, {
                    default: vueExports.withCtx(() => [
                      vueExports.unref(props).overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                        key: 0,
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                      }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                      vueExports.createVNode(vueExports.unref(DialogContent_default), vueExports.mergeProps({
                        "data-side": vueExports.unref(props).side,
                        "data-slot": "content",
                        class: ui.value.content({ class: [!slots.default && vueExports.unref(props).class, vueExports.unref(props).ui?.content] })
                      }, contentProps.value, {
                        onAfterEnter: ($event) => emits("after:enter"),
                        onAfterLeave: ($event) => emits("after:leave")
                      }, vueExports.toHandlers(contentEvents.value)), {
                        default: vueExports.withCtx(() => [
                          !vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 0 }, {
                            default: vueExports.withCtx(() => [
                              !vueExports.unref(props).title && !slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 1 }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : vueExports.createCommentVNode("", true),
                              !vueExports.unref(props).description && !slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 3 }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : vueExports.createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : vueExports.createCommentVNode("", true),
                          vueExports.renderSlot(_ctx.$slots, "content", { close }, () => [
                            !!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) || (vueExports.unref(props).close || !!slots.close) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: vueExports.unref(props).ui?.header })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "header", { close }, () => [
                                vueExports.unref(props).title || !!slots.title || vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: 0,
                                  "data-slot": "wrapper",
                                  class: ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper })
                                }, [
                                  vueExports.unref(props).title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                  vueExports.unref(props).description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                ], 2)) : vueExports.createCommentVNode("", true),
                                vueExports.renderSlot(_ctx.$slots, "actions"),
                                vueExports.unref(props).close || !!slots.close ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogClose_default), {
                                  key: 1,
                                  "as-child": ""
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      vueExports.unref(props).close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                                        key: 0,
                                        icon: vueExports.unref(props).closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": vueExports.unref(t)("slideover.close")
                                      }, typeof vueExports.unref(props).close === "object" ? vueExports.unref(props).close : {}, {
                                        "data-slot": "close",
                                        class: ui.value.close({ class: vueExports.unref(props).ui?.close })
                                      }), null, 16, ["icon", "aria-label", "class"])) : vueExports.createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : vueExports.createCommentVNode("", true)
                              ])
                            ], 2)) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode("div", {
                              "data-slot": "body",
                              class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "body", { close })
                            ], 2),
                            !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 1,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "footer", { close })
                            ], 2)) : vueExports.createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1040, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/Slideover.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UColorModeButton",
  __ssrInlineRender: true,
  props: {
    color: { type: null, required: false, default: "neutral" },
    variant: { type: null, required: false, default: "ghost" },
    label: { type: String, required: false },
    activeColor: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    as: { type: null, required: false },
    type: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    exactActiveClass: { type: String, required: false },
    viewTransition: { type: Boolean, required: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useComponentProps("button", _props);
    const { t } = useLocale();
    const colorMode = useColorMode();
    const appConfig = useAppConfig();
    const prefix = usePrefix();
    const buttonProps = useForwardProps(reactiveOmit(props, "icon"));
    const isDark = vueExports.computed({
      get() {
        return colorMode.value === "dark";
      },
      set(_isDark) {
        colorMode.preference = _isDark ? "dark" : "light";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(_sfc_main$8, vueExports.mergeProps({
        ...vueExports.unref(buttonProps),
        "aria-label": isDark.value ? vueExports.unref(t)("colorMode.switchToLight") : vueExports.unref(t)("colorMode.switchToDark"),
        ..._ctx.$attrs
      }, {
        onClick: ($event) => isDark.value = !isDark.value
      }, _attrs), {
        leading: vueExports.withCtx(({ ui }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_sfc_main$d, {
              class: ui.leadingIcon({ class: [vueExports.unref(props).ui?.leadingIcon, vueExports.unref(prefix)("hidden dark:inline-block")] }),
              name: vueExports.unref(appConfig).ui.icons.dark
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_sfc_main$d, {
              class: ui.leadingIcon({ class: [vueExports.unref(props).ui?.leadingIcon, vueExports.unref(prefix)("dark:hidden")] }),
              name: vueExports.unref(appConfig).ui.icons.light
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_sfc_main$d, {
                class: ui.leadingIcon({ class: [vueExports.unref(props).ui?.leadingIcon, vueExports.unref(prefix)("hidden dark:inline-block")] }),
                name: vueExports.unref(appConfig).ui.icons.dark
              }, null, 8, ["class", "name"]),
              vueExports.createVNode(_sfc_main$d, {
                class: ui.leadingIcon({ class: [vueExports.unref(props).ui?.leadingIcon, vueExports.unref(prefix)("dark:hidden")] }),
                name: vueExports.unref(appConfig).ui.icons.light
              }, null, 8, ["class", "name"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/color-mode/ColorModeButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const theme = {
  "base": "min-h-[calc(100vh-var(--ui-header-height))]"
};
const _sfc_main = {
  __name: "UMain",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "main" },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useComponentProps("main", _props);
    const appConfig = useAppConfig();
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.main || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: vueExports.unref(props).as,
        class: ui.value({ class: [vueExports.unref(props).ui?.base, vueExports.unref(props).class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/Main.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$1 as a, _sfc_main$2 as b, useColorMode as u };
//# sourceMappingURL=Main-DmrC9lpa.mjs.map
