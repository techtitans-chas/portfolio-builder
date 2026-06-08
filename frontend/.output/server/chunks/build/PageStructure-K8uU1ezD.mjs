import { _ as __nuxt_component_0$1 } from './PageWrapper-dRmsqRwL.mjs';
import { _ as _sfc_main$4 } from './Container-CXQFSuFJ.mjs';
import { defineComponent, mergeProps, withCtx, renderSlot, createVNode, useSlots, shallowRef, computed, unref, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { U as useComponentProps, N as useAppConfig, M as tv, b as Primitive, S as Slot, f as _sfc_main$8 } from './server.mjs';

const theme$2 = {
  "slots": {
    "root": "flex flex-col lg:grid lg:grid-cols-10 lg:gap-10",
    "left": "lg:col-span-2",
    "center": "lg:col-span-8",
    "right": "lg:col-span-2 order-first lg:order-last"
  },
  "variants": {
    "left": {
      "true": ""
    },
    "right": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "left": true,
      "right": true,
      "class": {
        "center": "lg:col-span-6"
      }
    },
    {
      "left": false,
      "right": false,
      "class": {
        "center": "lg:col-span-10"
      }
    }
  ]
};
const _sfc_main$3 = {
  __name: "UPage",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const _props = __props;
    const slots = useSlots();
    const props = useComponentProps("page", _props);
    const appConfig = useAppConfig();
    const hasLeft = shallowRef(!!slots.left);
    const hasRight = shallowRef(!!slots.right);
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.page || {} })({
      left: hasLeft.value,
      right: hasRight.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: unref(props).as,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.left) {
              _push2(ssrRenderComponent(unref(Slot), {
                "data-slot": "left",
                class: ui.value.left({ class: unref(props).ui?.left })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "left", {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "left")
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-slot="center" class="${ssrRenderClass(ui.value.center({ class: unref(props).ui?.center }))}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            if (!!slots.right) {
              _push2(ssrRenderComponent(unref(Slot), {
                "data-slot": "right",
                class: ui.value.right({ class: unref(props).ui?.right })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "right", {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "right")
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !!slots.left ? (openBlock(), createBlock(unref(Slot), {
                key: 0,
                "data-slot": "left",
                class: ui.value.left({ class: unref(props).ui?.left })
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "left")
                ]),
                _: 3
              }, 8, ["class"])) : createCommentVNode("", true),
              createVNode("div", {
                "data-slot": "center",
                class: ui.value.center({ class: unref(props).ui?.center })
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2),
              !!slots.right ? (openBlock(), createBlock(unref(Slot), {
                key: 1,
                "data-slot": "right",
                class: ui.value.right({ class: unref(props).ui?.right })
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "right")
                ]),
                _: 3
              }, 8, ["class"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/Page.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const theme$1 = {
  "slots": {
    "root": "relative border-b border-default py-8",
    "container": "",
    "wrapper": "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4",
    "headline": "mb-2.5 text-sm font-semibold text-primary flex items-center gap-1.5",
    "title": "text-3xl sm:text-4xl text-pretty font-bold text-highlighted",
    "description": "text-lg text-pretty text-muted",
    "links": "flex flex-wrap items-center gap-1.5"
  },
  "variants": {
    "title": {
      "true": {
        "description": "mt-4"
      }
    }
  }
};
const _sfc_main$2 = {
  __name: "UPageHeader",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    headline: { type: String, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    links: { type: Array, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const _props = __props;
    const slots = useSlots();
    const props = useComponentProps("pageHeader", _props);
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.pageHeader || {} })({
      title: !!props.title || !!slots.title
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: unref(props).as,
        "data-slot": "root",
        class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(props).headline || !!slots.headline) {
              _push2(`<div data-slot="headline" class="${ssrRenderClass(ui.value.headline({ class: unref(props).ui?.headline }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "headline", {}, () => {
                _push2(`${ssrInterpolate(unref(props).headline)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))}"${_scopeId}><div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))}"${_scopeId}>`);
            if (unref(props).title || !!slots.title) {
              _push2(`<h1 data-slot="title" class="${ssrRenderClass(ui.value.title({ class: unref(props).ui?.title }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate(unref(props).title)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</h1>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(props).links?.length || !!slots.links) {
              _push2(`<div data-slot="links" class="${ssrRenderClass(ui.value.links({ class: unref(props).ui?.links }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "links", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList(unref(props).links, (link, index) => {
                  _push2(ssrRenderComponent(_sfc_main$8, mergeProps({
                    key: index,
                    color: "neutral",
                    variant: "outline"
                  }, { ref_for: true }, link), null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(props).description || !!slots.description) {
              _push2(`<div data-slot="description" class="${ssrRenderClass(ui.value.description({ class: unref(props).ui?.description }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                _push2(`${ssrInterpolate(unref(props).description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              unref(props).headline || !!slots.headline ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "headline",
                class: ui.value.headline({ class: unref(props).ui?.headline })
              }, [
                renderSlot(_ctx.$slots, "headline", {}, () => [
                  createTextVNode(toDisplayString(unref(props).headline), 1)
                ])
              ], 2)) : createCommentVNode("", true),
              createVNode("div", {
                "data-slot": "container",
                class: ui.value.container({ class: unref(props).ui?.container })
              }, [
                createVNode("div", {
                  "data-slot": "wrapper",
                  class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
                }, [
                  unref(props).title || !!slots.title ? (openBlock(), createBlock("h1", {
                    key: 0,
                    "data-slot": "title",
                    class: ui.value.title({ class: unref(props).ui?.title })
                  }, [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      createTextVNode(toDisplayString(unref(props).title), 1)
                    ])
                  ], 2)) : createCommentVNode("", true),
                  unref(props).links?.length || !!slots.links ? (openBlock(), createBlock("div", {
                    key: 1,
                    "data-slot": "links",
                    class: ui.value.links({ class: unref(props).ui?.links })
                  }, [
                    renderSlot(_ctx.$slots, "links", {}, () => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(props).links, (link, index) => {
                        return openBlock(), createBlock(_sfc_main$8, mergeProps({
                          key: index,
                          color: "neutral",
                          variant: "outline"
                        }, { ref_for: true }, link), null, 16);
                      }), 128))
                    ])
                  ], 2)) : createCommentVNode("", true)
                ], 2),
                unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "description",
                  class: ui.value.description({ class: unref(props).ui?.description })
                }, [
                  renderSlot(_ctx.$slots, "description", {}, () => [
                    createTextVNode(toDisplayString(unref(props).description), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "default")
              ], 2)
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
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/PageHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme = {
  "base": "mt-8 pb-24 space-y-12"
};
const _sfc_main$1 = {
  __name: "UPageBody",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useComponentProps("pageBody", _props);
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.pageBody || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: unref(props).as,
        class: ui.value({ class: [unref(props).ui?.base, unref(props).class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/@nuxt+ui@4.8.0_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@tiptap+e_529dc020edabc129a8ce32f8d84280e8/node_modules/@nuxt/ui/dist/runtime/components/PageBody.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageStructure",
  __ssrInlineRender: true,
  props: {
    title: {},
    category: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminLayoutPageWrapper = __nuxt_component_0$1;
      const _component_UContainer = _sfc_main$4;
      const _component_UPage = _sfc_main$3;
      const _component_UPageHeader = _sfc_main$2;
      const _component_UPageBody = _sfc_main$1;
      _push(ssrRenderComponent(_component_AdminLayoutPageWrapper, mergeProps({ title: __props.title }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UPage, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UPageHeader, {
                          title: __props.title,
                          description: __props.description ? __props.description : void 0
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UPageBody, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                renderSlot(_ctx.$slots, "default")
                              ];
                            }
                          }),
                          _: 3
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UPageHeader, {
                            title: __props.title,
                            description: __props.description ? __props.description : void 0
                          }, null, 8, ["title", "description"]),
                          createVNode(_component_UPageBody, null, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "default")
                            ]),
                            _: 3
                          })
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UPage, null, {
                      default: withCtx(() => [
                        createVNode(_component_UPageHeader, {
                          title: __props.title,
                          description: __props.description ? __props.description : void 0
                        }, null, 8, ["title", "description"]),
                        createVNode(_component_UPageBody, null, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "default")
                          ]),
                          _: 3
                        })
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UContainer, null, {
                default: withCtx(() => [
                  createVNode(_component_UPage, null, {
                    default: withCtx(() => [
                      createVNode(_component_UPageHeader, {
                        title: __props.title,
                        description: __props.description ? __props.description : void 0
                      }, null, 8, ["title", "description"]),
                      createVNode(_component_UPageBody, null, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      })
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/layout/PageStructure.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "AdminLayoutPageStructure" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=PageStructure-K8uU1ezD.mjs.map
