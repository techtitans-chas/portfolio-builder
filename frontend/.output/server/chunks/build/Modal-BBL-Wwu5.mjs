import { p as pointerDownOutside, e as DialogRoot_default, a as DialogContent_default, f as DialogTitle_default, b as DialogDescription_default, D as DialogClose_default, g as DialogTrigger_default, d as DialogPortal_default, c as DialogOverlay_default } from './overlay-BWwBD9XH.mjs';
import { ac as useComponentProps, an as useLocale, a8 as useAppConfig, ak as useForwardProps, $ as reactivePick, aq as usePortal, p as createReusableTemplate, a5 as tv, V as VisuallyHidden_default, e as _sfc_main$8, F as FieldGroupReset } from './server.mjs';
import { o as vueExports, f as ssrRenderComponent_1, i as ssrRenderSlot_1, a as ssrInterpolate_1, e as ssrRenderClass_1 } from '../routes/renderer.mjs';

const theme = {
  "slots": {
    "overlay": "fixed inset-0",
    "content": "bg-default divide-y divide-default flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-(--ui-header-height)",
    "wrapper": "",
    "body": "flex-1 p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
        "content": "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]"
      }
    },
    "fullscreen": {
      "true": {
        "content": "inset-0"
      },
      "false": {
        "content": "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default"
      }
    },
    "overlay": {
      "true": {
        "overlay": "bg-elevated/75"
      }
    },
    "scrollable": {
      "true": {
        "overlay": "overflow-y-auto",
        "content": "relative"
      },
      "false": {
        "content": "fixed",
        "body": "overflow-y-auto"
      }
    }
  },
  "compoundVariants": [
    {
      "scrollable": true,
      "fullscreen": false,
      "class": {
        "overlay": "grid place-items-center p-4 sm:py-8"
      }
    },
    {
      "scrollable": false,
      "fullscreen": false,
      "class": {
        "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden"
      }
    }
  ]
};
const _sfc_main = {
  __name: "UModal",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    scrollable: { type: Boolean, required: false },
    transition: { type: Boolean, required: false, default: true },
    fullscreen: { type: Boolean, required: false },
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
    const props = useComponentProps("modal", _props);
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
        pointerDownOutside: (e) => pointerDownOutside(e, { scrollable: props.scrollable })
      };
    });
    const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.modal || {} })({
      transition: props.transition,
      fullscreen: props.fullscreen,
      overlay: props.overlay,
      scrollable: props.scrollable
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(DialogRoot_default), vueExports.mergeProps(vueExports.unref(rootProps), _attrs), {
        default: vueExports.withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(vueExports.unref(DefineContentTemplate), null, {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(DialogContent_default), vueExports.mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && vueExports.unref(props).class, vueExports.unref(props).ui?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, vueExports.toHandlers(contentEvents.value)), {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!vueExports.unref(props).title && !slots.title || !vueExports.unref(props).description && !slots.description || !!slots.content) {
                          _push4(ssrRenderComponent_1(vueExports.unref(VisuallyHidden_default), null, {
                            default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (!vueExports.unref(props).title && !slots.title) {
                                  _push5(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), null, null, _parent5, _scopeId4));
                                } else if (!!slots.content) {
                                  _push5(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), null, {
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
                                if (!vueExports.unref(props).description && !slots.description) {
                                  _push5(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), null, null, _parent5, _scopeId4));
                                } else if (!!slots.content) {
                                  _push5(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), null, {
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
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot_1(_ctx.$slots, "content", { close }, () => {
                          if (!!slots.header || (vueExports.unref(props).title || !!slots.title) || (vueExports.unref(props).description || !!slots.description) || (vueExports.unref(props).close || !!slots.close)) {
                            _push4(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(props).ui?.header }))}"${_scopeId3}>`);
                            ssrRenderSlot_1(_ctx.$slots, "header", { close }, () => {
                              if (vueExports.unref(props).title || !!slots.title || vueExports.unref(props).description || !!slots.description) {
                                _push4(`<div data-slot="wrapper" class="${ssrRenderClass_1(ui.value.wrapper({ class: vueExports.unref(props).ui?.wrapper }))}"${_scopeId3}>`);
                                if (vueExports.unref(props).title || !!slots.title) {
                                  _push4(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), {
                                    "data-slot": "title",
                                    class: ui.value.title({ class: vueExports.unref(props).ui?.title })
                                  }, {
                                    default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                                          _push5(`${ssrInterpolate_1(vueExports.unref(props).title)}`);
                                        }, _push5, _parent5, _scopeId4);
                                      } else {
                                        return [
                                          vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                } else {
                                  _push4(`<!---->`);
                                }
                                if (vueExports.unref(props).description || !!slots.description) {
                                  _push4(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), {
                                    "data-slot": "description",
                                    class: ui.value.description({ class: vueExports.unref(props).ui?.description })
                                  }, {
                                    default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                                      if (_push5) {
                                        ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                                          _push5(`${ssrInterpolate_1(vueExports.unref(props).description)}`);
                                        }, _push5, _parent5, _scopeId4);
                                      } else {
                                        return [
                                          vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(props).description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent4, _scopeId3));
                                } else {
                                  _push4(`<!---->`);
                                }
                                _push4(`</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              ssrRenderSlot_1(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                              if (vueExports.unref(props).close || !!slots.close) {
                                _push4(ssrRenderComponent_1(vueExports.unref(DialogClose_default), { "as-child": "" }, {
                                  default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot_1(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        if (vueExports.unref(props).close) {
                                          _push5(ssrRenderComponent_1(_sfc_main$8, vueExports.mergeProps({
                                            icon: vueExports.unref(props).closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": vueExports.unref(t)("modal.close")
                                          }, typeof vueExports.unref(props).close === "object" ? vueExports.unref(props).close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: vueExports.unref(props).ui?.close })
                                          }), null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          vueExports.unref(props).close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                                            key: 0,
                                            icon: vueExports.unref(props).closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": vueExports.unref(t)("modal.close")
                                          }, typeof vueExports.unref(props).close === "object" ? vueExports.unref(props).close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: vueExports.unref(props).ui?.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : vueExports.createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.body) {
                            _push4(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(props).ui?.body }))}"${_scopeId3}>`);
                            ssrRenderSlot_1(_ctx.$slots, "body", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.footer) {
                            _push4(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(props).ui?.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot_1(_ctx.$slots, "footer", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
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
                                        "aria-label": vueExports.unref(t)("modal.close")
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
                            !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 1,
                              "data-slot": "body",
                              class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "body", { close })
                            ], 2)) : vueExports.createCommentVNode("", true),
                            !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 2,
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(DialogContent_default), vueExports.mergeProps({
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
                                      "aria-label": vueExports.unref(t)("modal.close")
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
                          !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 1,
                            "data-slot": "body",
                            class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "body", { close })
                          ], 2)) : vueExports.createCommentVNode("", true),
                          !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 2,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "footer", { close })
                          ], 2)) : vueExports.createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
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
                        if (vueExports.unref(props).scrollable) {
                          _push4(ssrRenderComponent_1(vueExports.unref(DialogOverlay_default), {
                            "data-slot": "overlay",
                            class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                          }, {
                            default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent_1(vueExports.unref(ReuseContentTemplate), null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(vueExports.unref(ReuseContentTemplate))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!--[-->`);
                          if (vueExports.unref(props).overlay) {
                            _push4(ssrRenderComponent_1(vueExports.unref(DialogOverlay_default), {
                              "data-slot": "overlay",
                              class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(ssrRenderComponent_1(vueExports.unref(ReuseContentTemplate), null, null, _parent4, _scopeId3));
                          _push4(`<!--]-->`);
                        }
                      } else {
                        return [
                          vueExports.unref(props).scrollable ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                            key: 0,
                            "data-slot": "overlay",
                            class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(vueExports.unref(ReuseContentTemplate))
                            ]),
                            _: 1
                          }, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                            vueExports.unref(props).overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                              key: 0,
                              "data-slot": "overlay",
                              class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                            }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode(vueExports.unref(ReuseContentTemplate))
                          ], 64))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(FieldGroupReset), null, {
                      default: vueExports.withCtx(() => [
                        vueExports.unref(props).scrollable ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                          key: 0,
                          "data-slot": "overlay",
                          class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(vueExports.unref(ReuseContentTemplate))
                          ]),
                          _: 1
                        }, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                          vueExports.unref(props).overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                            key: 0,
                            "data-slot": "overlay",
                            class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                          }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode(vueExports.unref(ReuseContentTemplate))
                        ], 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(vueExports.unref(DefineContentTemplate), null, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(DialogContent_default), vueExports.mergeProps({
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
                                    "aria-label": vueExports.unref(t)("modal.close")
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
                        !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 1,
                          "data-slot": "body",
                          class: ui.value.body({ class: vueExports.unref(props).ui?.body })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "body", { close })
                        ], 2)) : vueExports.createCommentVNode("", true),
                        !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 2,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: vueExports.unref(props).ui?.footer })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "footer", { close })
                        ], 2)) : vueExports.createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                ]),
                _: 2
              }, 1024),
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
                      vueExports.unref(props).scrollable ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                        key: 0,
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(vueExports.unref(ReuseContentTemplate))
                        ]),
                        _: 1
                      }, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                        vueExports.unref(props).overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                          key: 0,
                          "data-slot": "overlay",
                          class: ui.value.overlay({ class: vueExports.unref(props).ui?.overlay })
                        }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                        vueExports.createVNode(vueExports.unref(ReuseContentTemplate))
                      ], 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 16)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_0c4e5d558bbbd0ce3bc597d918a8198d/node_modules/@nuxt/ui/dist/runtime/components/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Modal-BBL-Wwu5.mjs.map
