import { ak as useAsyncData, aO as vueExports, aH as useRuntimeConfig, aA as useNuxtApp, aJ as useState, ax as useHead, a5 as ssrRenderAttrs_1, a7 as ssrRenderComponent_1, a9 as ssrRenderSlot_1, a6 as ssrRenderClass_1, aa as ssrRenderStyle_1, a4 as ssrRenderAttr_1, a3 as ssrInterpolate_1, j as _sfc_main$d, a8 as ssrRenderList_1 } from './server.mjs';
import { u as useColorMode, _ as _sfc_main$4, b as _sfc_main$2$1, a as _sfc_main$1$1 } from './Main-CoIIuktv.mjs';
import { g as getDefaultExportFromCjs } from '../_/shared.cjs.prod.mjs';

var Sortable_min$1 = {exports: {}};

/*! Sortable 1.15.7 - MIT | git://github.com/SortableJS/Sortable.git */
var Sortable_min = Sortable_min$1.exports;

(function (module, exports) {
	!function(t,e){module.exports=e();}(Sortable_min,function(){function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}function i(t,e,n){return (e=function(t){t=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return ("string"===e?String:Number)(t);e=n.call(t,e||"default");if("object"!=typeof e)return e;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return "symbol"==typeof t?t:t+""}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:true,configurable:true,writable:true}):t[e]=n,t}function a(){return (a=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n,o=arguments[e];for(n in o)!{}.hasOwnProperty.call(o,n)||(t[n]=o[n]);}return t}).apply(null,arguments)}function r(e,t){var n,o=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),o.push.apply(o,n)),o}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),true).forEach(function(t){i(e,t,n[t]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t));});}return e}function l(t,e){if(null==t)return {};var n,o=function(t,e){if(null==t)return {};var n,o={};for(n in t)if({}.hasOwnProperty.call(t,n)){if(-1!==e.indexOf(n))continue;o[n]=t[n];}return o}(t,e);if(Object.getOwnPropertySymbols)for(var i=Object.getOwnPropertySymbols(t),r=0;r<i.length;r++)n=i[r],-1===e.indexOf(n)&&{}.propertyIsEnumerable.call(t,n)&&(o[n]=t[n]);return o}function e(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return o(t,e);var n={}.toString.call(t).slice(8,-1);return "Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t){return (s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function t(t){}var y=t(),w=t(),c=t(),u=t()&&!t()&&!t(),d=t(),n=t()&&t(),h={capture:false,passive:false};function f(t,e,n){t.addEventListener(e,n,!y&&h);}function p(t,e,n){t.removeEventListener(e,n,!y&&h);}function g(t,e){if(e&&(">"===e[0]&&(e=e.substring(1)),t))try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return}}function m(t){return t.host&&t!==document&&t.host.nodeType&&t.host!==t?t.host:t.parentNode}function P(t,e,n,o){if(t){n=n||document;do{if(null!=e&&(">"!==e[0]||t.parentNode===n)&&g(t,e)||o&&t===n)return t}while(t!==n&&(t=m(t)))}return null}var v,b=/\s+/g;function k(t,e,n){var o;t&&e&&(t.classList?t.classList[n?"add":"remove"](e):(o=(" "+t.className+" ").replace(b," ").replace(" "+e+" "," "),t.className=(o+(n?" "+e:"")).replace(b," ")));}function R(t,e,n){var o=t&&t.style;if(o){if(void 0===n)return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(t,""):t.currentStyle&&(n=t.currentStyle),void 0===e?n:n[e];o[e=!(e in o||-1!==e.indexOf("webkit"))?"-webkit-"+e:e]=n+("string"==typeof n?"":"px");}}function D(t,e){var n="";if("string"==typeof t)n=t;else do{var o=R(t,"transform");}while(o&&"none"!==o&&(n=o+" "+n),!e&&(t=t.parentNode));var i=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return i&&new i(n)}function E(t,e,n){if(t){var o=t.getElementsByTagName(e),i=0,r=o.length;if(n)for(;i<r;i++)n(o[i],i);return o}return []}function O(){var t=document.scrollingElement;return t||document.documentElement}function X(t,e,n,o,i){if(t.getBoundingClientRect||t===window){var r,a,l,s,c,u,d=t!==window&&t.parentNode&&t!==O()?(a=(r=t.getBoundingClientRect()).top,l=r.left,s=r.bottom,c=r.right,u=r.height,r.width):(l=a=0,s=window.innerHeight,c=window.innerWidth,u=window.innerHeight,window.innerWidth);if((e||n)&&t!==window&&(i=i||t.parentNode,!y))do{if(i&&i.getBoundingClientRect&&("none"!==R(i,"transform")||n&&"static"!==R(i,"position"))){var h=i.getBoundingClientRect();a-=h.top+parseInt(R(i,"border-top-width")),l-=h.left+parseInt(R(i,"border-left-width")),s=a+r.height,c=l+r.width;break}}while(i=i.parentNode);return o&&t!==window&&(o=(e=D(i||t))&&e.a,t=e&&e.d,e&&(s=(a/=t)+(u/=t),c=(l/=o)+(d/=o))),{top:a,left:l,bottom:s,right:c,width:d,height:u}}}function Y(t,e,n){for(var o=M(t,true),i=X(t)[e];o;){var r=X(o)[n];if(!(r<=i))return o;if(o===O())break;o=M(o,false);}return  false}function B(t,e,n,o){for(var i=0,r=0,a=t.children;r<a.length;){if("none"!==a[r].style.display&&a[r]!==Ht.ghost&&(o||a[r]!==Ht.dragged)&&P(a[r],n.draggable,t,false)){if(i===e)return a[r];i++;}r++;}return null}function F(t,e){for(var n=t.lastElementChild;n&&(n===Ht.ghost||"none"===R(n,"display")||e&&!g(n,e));)n=n.previousElementSibling;return n||null}function j(t,e){var n=0;if(!t||!t.parentNode)return  -1;for(;t=t.previousElementSibling;)"TEMPLATE"===t.nodeName.toUpperCase()||t===Ht.clone||e&&!g(t,e)||n++;return n}function S(t){var e=0,n=0,o=O();if(t)do{var i=D(t),r=i.a,i=i.d;}while(e+=t.scrollLeft*r,n+=t.scrollTop*i,t!==o&&(t=t.parentNode));return [e,n]}function M(t,e){if(!t||!t.getBoundingClientRect)return O();var n=t,o=false;do{if(n.clientWidth<n.scrollWidth||n.clientHeight<n.scrollHeight){var i=R(n);if(n.clientWidth<n.scrollWidth&&("auto"==i.overflowX||"scroll"==i.overflowX)||n.clientHeight<n.scrollHeight&&("auto"==i.overflowY||"scroll"==i.overflowY)){if(!n.getBoundingClientRect||n===document.body)return O();if(o||e)return n;o=true;}}}while(n=n.parentNode);return O()}function _(t,e){return Math.round(t.top)===Math.round(e.top)&&Math.round(t.left)===Math.round(e.left)&&Math.round(t.height)===Math.round(e.height)&&Math.round(t.width)===Math.round(e.width)}function C(e,n){return function(){var t;v||(1===(t=arguments).length?e.call(this,t[0]):e.apply(this,t),v=setTimeout(function(){v=void 0;},n));}}function H(t,e,n){t.scrollLeft+=e,t.scrollTop+=n;}function T(t){var e=window.Polymer,n=window.jQuery||window.Zepto;return e&&e.dom?e.dom(t).cloneNode(true):n?n(t).clone(true)[0]:t.cloneNode(true)}function x(t,e){R(t,"position","absolute"),R(t,"top",e.top),R(t,"left",e.left),R(t,"width",e.width),R(t,"height",e.height);}function A(t){R(t,"position",""),R(t,"top",""),R(t,"left",""),R(t,"width",""),R(t,"height","");}function L(n,o,i){var r={};return Array.from(n.children).forEach(function(t){var e;P(t,o.draggable,n,false)&&!t.animated&&t!==i&&(e=X(t),r.left=Math.min(null!==(t=r.left)&&void 0!==t?t:1/0,e.left),r.top=Math.min(null!==(t=r.top)&&void 0!==t?t:1/0,e.top),r.right=Math.max(null!==(t=r.right)&&void 0!==t?t:-1/0,e.right),r.bottom=Math.max(null!==(t=r.bottom)&&void 0!==t?t:-1/0,e.bottom));}),r.width=r.right-r.left,r.height=r.bottom-r.top,r.x=r.left,r.y=r.top,r}var K="Sortable"+(new Date).getTime();function N(){var e,o=[];return {captureAnimationState:function(){o=[],this.options.animation&&[].slice.call(this.el.children).forEach(function(t){var e,n;"none"!==R(t,"display")&&t!==Ht.ghost&&(o.push({target:t,rect:X(t)}),e=I({},o[o.length-1].rect),!t.thisAnimationDuration||(n=D(t,true))&&(e.top-=n.f,e.left-=n.e),t.fromRect=e);});},addAnimationState:function(t){o.push(t);},removeAnimationState:function(t){o.splice(function(t,e){for(var n in t)if(t.hasOwnProperty(n))for(var o in e)if(e.hasOwnProperty(o)&&e[o]===t[n][o])return Number(n);return  -1}(o,{target:t}),1);},animateAll:function(t){var c=this;if(!this.options.animation)return clearTimeout(e),void("function"==typeof t&&t());var u=false,d=0;o.forEach(function(t){var e=0,n=t.target,o=n.fromRect,i=X(n),r=n.prevFromRect,a=n.prevToRect,l=t.rect,s=D(n,true);s&&(i.top-=s.f,i.left-=s.e),n.toRect=i,n.thisAnimationDuration&&_(r,i)&&!_(o,i)&&(l.top-i.top)/(l.left-i.left)==(o.top-i.top)/(o.left-i.left)&&(t=l,s=r,r=a,a=c.options,e=Math.sqrt(Math.pow(s.top-t.top,2)+Math.pow(s.left-t.left,2))/Math.sqrt(Math.pow(s.top-r.top,2)+Math.pow(s.left-r.left,2))*a.animation),_(i,o)||(n.prevFromRect=o,n.prevToRect=i,e=e||c.options.animation,c.animate(n,l,i,e)),e&&(u=true,d=Math.max(d,e),clearTimeout(n.animationResetTimer),n.animationResetTimer=setTimeout(function(){n.animationTime=0,n.prevFromRect=null,n.fromRect=null,n.prevToRect=null,n.thisAnimationDuration=null;},e),n.thisAnimationDuration=e);}),clearTimeout(e),u?e=setTimeout(function(){"function"==typeof t&&t();},d):"function"==typeof t&&t(),o=[];},animate:function(t,e,n,o){var i,r;o&&(R(t,"transition",""),R(t,"transform",""),i=(r=D(this.el))&&r.a,r=r&&r.d,i=(e.left-n.left)/(i||1),r=(e.top-n.top)/(r||1),t.animatingX=!!i,t.animatingY=!!r,R(t,"transform","translate3d("+i+"px,"+r+"px,0)"),this.forRepaintDummy=t.offsetWidth,R(t,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),R(t,"transform","translate3d(0,0,0)"),"number"==typeof t.animated&&clearTimeout(t.animated),t.animated=setTimeout(function(){R(t,"transition",""),R(t,"transform",""),t.animated=false,t.animatingX=false,t.animatingY=false;},o));}}}var W=[],z={initializeByDefault:true},G={mount:function(e){for(var t in z)!z.hasOwnProperty(t)||t in e||(e[t]=z[t]);W.forEach(function(t){if(t.pluginName===e.pluginName)throw "Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),W.push(e);},pluginEvent:function(e,n,o){var t=this;this.eventCanceled=false,o.cancel=function(){t.eventCanceled=true;};var i=e+"Global";W.forEach(function(t){n[t.pluginName]&&(n[t.pluginName][i]&&n[t.pluginName][i](I({sortable:n},o)),n.options[t.pluginName]&&n[t.pluginName][e]&&n[t.pluginName][e](I({sortable:n},o)));});},initializePlugins:function(n,o,i,t){for(var e in W.forEach(function(t){var e=t.pluginName;(n.options[e]||t.initializeByDefault)&&((t=new t(n,o,n.options)).sortable=n,t.options=n.options,n[e]=t,a(i,t.defaults));}),n.options){var r;n.options.hasOwnProperty(e)&&(void 0!==(r=this.modifyOption(n,e,n.options[e]))&&(n.options[e]=r));}},getEventProperties:function(e,n){var o={};return W.forEach(function(t){"function"==typeof t.eventProperties&&a(o,t.eventProperties.call(n[t.pluginName],e));}),o},modifyOption:function(e,n,o){var i;return W.forEach(function(t){e[t.pluginName]&&t.optionListeners&&"function"==typeof t.optionListeners[n]&&(i=t.optionListeners[n].call(e[t.pluginName],o));}),i}};function U(t){var e=t.sortable,n=t.rootEl,o=t.name,i=t.targetEl,r=t.cloneEl,a=t.toEl,l=t.fromEl,s=t.oldIndex,c=t.newIndex,u=t.oldDraggableIndex,d=t.newDraggableIndex,h=t.originalEvent,f=t.putSortable,p=t.extraEventProperties;if(e=e||n&&n[K]){var g,m=e.options,t="on"+o.charAt(0).toUpperCase()+o.substr(1);!window.CustomEvent||y||w?(g=document.createEvent("Event")).initEvent(o,true,true):g=new CustomEvent(o,{bubbles:true,cancelable:true}),g.to=a||n,g.from=l||n,g.item=i||n,g.clone=r,g.oldIndex=s,g.newIndex=c,g.oldDraggableIndex=u,g.newDraggableIndex=d,g.originalEvent=h,g.pullMode=f?f.lastPutMode:void 0;var v,b=I(I({},p),G.getEventProperties(o,e));for(v in b)g[v]=b[v];n&&n.dispatchEvent(g),m[t]&&m[t].call(e,g);}}function q(t,e){var n=(o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{}).evt,o=l(o,V);G.pluginEvent.bind(Ht)(t,e,I({dragEl:$,parentEl:Q,ghostEl:J,rootEl:tt,nextEl:et,lastDownEl:nt,cloneEl:ot,cloneHidden:it,dragStarted:vt,putSortable:ut,activeSortable:Ht.active,originalEvent:n,oldIndex:rt,oldDraggableIndex:lt,newIndex:at,newDraggableIndex:st,hideGhostForTarget:Yt,unhideGhostForTarget:Bt,cloneNowHidden:function(){it=true;},cloneNowShown:function(){it=false;},dispatchSortableEvent:function(t){Z({sortable:e,name:t,originalEvent:n});}},o));}var V=["evt"];function Z(t){U(I({putSortable:ut,cloneEl:ot,targetEl:$,rootEl:tt,oldIndex:rt,oldDraggableIndex:lt,newIndex:at,newDraggableIndex:st},t));}var $,Q,J,tt,et,nt,ot,it,rt,at,lt,st,ct,ut,dt,ht,ft,pt,gt,mt,vt,bt,yt,wt,Dt,Et=false,St=false,_t=[],Ct=false,Tt=false,xt=[],Ot=false,Mt=[],At="undefined"!=typeof document,Nt=d,It=w||y?"cssFloat":"float",Pt=At&&!n&&!d&&"draggable"in document.createElement("div"),kt=function(){if(At){if(y)return  false;var t=document.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}}(),Rt=function(t,e){var n=R(t),o=parseInt(n.width)-parseInt(n.paddingLeft)-parseInt(n.paddingRight)-parseInt(n.borderLeftWidth)-parseInt(n.borderRightWidth),i=B(t,0,e),r=B(t,1,e),a=i&&R(i),l=r&&R(r),s=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+X(i).width,t=l&&parseInt(l.marginLeft)+parseInt(l.marginRight)+X(r).width;if("flex"===n.display)return "column"===n.flexDirection||"column-reverse"===n.flexDirection?"vertical":"horizontal";if("grid"===n.display)return n.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(i&&a.float&&"none"!==a.float){e="left"===a.float?"left":"right";return !r||"both"!==l.clear&&l.clear!==e?"horizontal":"vertical"}return i&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||o<=s&&"none"===n[It]||r&&"none"===n[It]&&o<s+t)?"vertical":"horizontal"},Xt=function(t){function l(r,a){return function(t,e,n,o){var i=t.options.group.name&&e.options.group.name&&t.options.group.name===e.options.group.name;if(null==r&&(a||i))return  true;if(null==r||false===r)return  false;if(a&&"clone"===r)return r;if("function"==typeof r)return l(r(t,e,n,o),a)(t,e,n,o);e=(a?t:e).options.group.name;return  true===r||"string"==typeof r&&r===e||r.join&&-1<r.indexOf(e)}}var e={},n=t.group;n&&"object"==s(n)||(n={name:n}),e.name=n.name,e.checkPull=l(n.pull,true),e.checkPut=l(n.put),e.revertClone=n.revertClone,t.group=e;},Yt=function(){!kt&&J&&R(J,"display","none");},Bt=function(){!kt&&J&&R(J,"display","");};At&&!n&&document.addEventListener("click",function(t){if(St)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),St=false},true);function Ft(t){if($){t=t.touches?t.touches[0]:t;var e=(i=t.clientX,r=t.clientY,_t.some(function(t){var e=t[K].options.emptyInsertThreshold;if(e&&!F(t)){var n=X(t),o=i>=n.left-e&&i<=n.right+e,e=r>=n.top-e&&r<=n.bottom+e;return o&&e?a=t:void 0}}),a);if(e){var n,o={};for(n in t)t.hasOwnProperty(n)&&(o[n]=t[n]);o.target=o.rootEl=e,o.preventDefault=void 0,o.stopPropagation=void 0,e[K]._onDragOver(o);}}var i,r,a;}function jt(t){$&&$.parentNode[K]._isOutsideThisEl(t.target);}function Ht(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));this.el=t,this.options=e=a({},e),t[K]=this;var n,o,i={group:null,sort:true,disabled:false,store:null,handle:null,draggable:/^[uo]l$/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:false,invertedSwapThreshold:null,removeCloneOnHide:true,direction:function(){return Rt(t,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:true,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent);},dropBubble:false,dragoverBubble:false,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:false,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:false,fallbackClass:"sortable-fallback",fallbackOnBody:false,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:false!==Ht.supportPointer&&"PointerEvent"in window&&(!u||d),emptyInsertThreshold:5};for(n in G.initializePlugins(this,t,i),i)n in e||(e[n]=i[n]);for(o in Xt(e),this)"_"===o.charAt(0)&&"function"==typeof this[o]&&(this[o]=this[o].bind(this));this.nativeDraggable=!e.forceFallback&&Pt,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?f(t,"pointerdown",this._onTapStart):(f(t,"mousedown",this._onTapStart),f(t,"touchstart",this._onTapStart)),this.nativeDraggable&&(f(t,"dragover",this),f(t,"dragenter",this)),_t.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),a(this,N());}function Lt(t,e,n,o,i,r,a,l){var s,c,u=t[K],d=u.options.onMove;return !window.CustomEvent||y||w?(s=document.createEvent("Event")).initEvent("move",true,true):s=new CustomEvent("move",{bubbles:true,cancelable:true}),s.to=e,s.from=t,s.dragged=n,s.draggedRect=o,s.related=i||e,s.relatedRect=r||X(e),s.willInsertAfter=l,s.originalEvent=a,t.dispatchEvent(s),c=d?d.call(u,s,a):c}function Kt(t){t.draggable=false;}function Wt(){Ot=false;}function zt(t){return setTimeout(t,0)}function Gt(t){return clearTimeout(t)}Ht.prototype={constructor:Ht,_isOutsideThisEl:function(t){this.el.contains(t)||t===this.el||(bt=null);},_getDirection:function(t,e){return "function"==typeof this.options.direction?this.options.direction.call(this,t,e,$):this.options.direction},_onTapStart:function(e){if(e.cancelable){var n=this,o=this.el,t=this.options,i=t.preventOnFilter,r=e.type,a=e.touches&&e.touches[0]||e.pointerType&&"touch"===e.pointerType&&e,l=(a||e).target,s=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||l,c=t.filter;if(!function(t){Mt.length=0;var e=t.getElementsByTagName("input"),n=e.length;for(;n--;){var o=e[n];o.checked&&Mt.push(o);}}(o),!$&&!(/mousedown|pointerdown/.test(r)&&0!==e.button||t.disabled)&&!s.isContentEditable&&(this.nativeDraggable||!u||!l||"SELECT"!==l.tagName.toUpperCase())&&!((l=P(l,t.draggable,o,false))&&l.animated||nt===l)){if(rt=j(l),lt=j(l,t.draggable),"function"==typeof c){if(c.call(this,e,l,this))return Z({sortable:n,rootEl:s,name:"filter",targetEl:l,toEl:o,fromEl:o}),q("filter",n,{evt:e}),void(i&&e.preventDefault())}else if(c=c&&c.split(",").some(function(t){if(t=P(s,t.trim(),o,false))return Z({sortable:n,rootEl:t,name:"filter",targetEl:l,fromEl:o,toEl:o}),q("filter",n,{evt:e}),true}))return void(i&&e.preventDefault());t.handle&&!P(s,t.handle,o,false)||this._prepareDragStart(e,a,l);}}},_prepareDragStart:function(t,e,n){var o,i=this,r=i.el,a=i.options,l=r.ownerDocument;n&&!$&&n.parentNode===r&&(o=X(n),tt=r,Q=($=n).parentNode,et=$.nextSibling,nt=n,ct=a.group,dt={target:Ht.dragged=$,clientX:(e||t).clientX,clientY:(e||t).clientY},gt=dt.clientX-o.left,mt=dt.clientY-o.top,this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,$.style["will-change"]="all",o=function(){q("delayEnded",i,{evt:t}),Ht.eventCanceled?i._onDrop():(i._disableDelayedDragEvents(),!c&&i.nativeDraggable&&($.draggable=true),i._triggerDragStart(t,e),Z({sortable:i,name:"choose",originalEvent:t}),k($,a.chosenClass,true));},a.ignore.split(",").forEach(function(t){E($,t.trim(),Kt);}),f(l,"dragover",Ft),f(l,"mousemove",Ft),f(l,"touchmove",Ft),a.supportPointer?(f(l,"pointerup",i._onDrop),this.nativeDraggable||f(l,"pointercancel",i._onDrop)):(f(l,"mouseup",i._onDrop),f(l,"touchend",i._onDrop),f(l,"touchcancel",i._onDrop)),c&&this.nativeDraggable&&(this.options.touchStartThreshold=4,$.draggable=true),q("delayStart",this,{evt:t}),!a.delay||a.delayOnTouchOnly&&!e||this.nativeDraggable&&(w||y)?o():Ht.eventCanceled?this._onDrop():(a.supportPointer?(f(l,"pointerup",i._disableDelayedDrag),f(l,"pointercancel",i._disableDelayedDrag)):(f(l,"mouseup",i._disableDelayedDrag),f(l,"touchend",i._disableDelayedDrag),f(l,"touchcancel",i._disableDelayedDrag)),f(l,"mousemove",i._delayedDragTouchMoveHandler),f(l,"touchmove",i._delayedDragTouchMoveHandler),a.supportPointer&&f(l,"pointermove",i._delayedDragTouchMoveHandler),i._dragStartTimer=setTimeout(o,a.delay)));},_delayedDragTouchMoveHandler:function(t){t=t.touches?t.touches[0]:t;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag();},_disableDelayedDrag:function(){$&&Kt($),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents();},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;p(t,"mouseup",this._disableDelayedDrag),p(t,"touchend",this._disableDelayedDrag),p(t,"touchcancel",this._disableDelayedDrag),p(t,"pointerup",this._disableDelayedDrag),p(t,"pointercancel",this._disableDelayedDrag),p(t,"mousemove",this._delayedDragTouchMoveHandler),p(t,"touchmove",this._delayedDragTouchMoveHandler),p(t,"pointermove",this._delayedDragTouchMoveHandler);},_triggerDragStart:function(t,e){e=e||"touch"==t.pointerType&&t,!this.nativeDraggable||e?this.options.supportPointer?f(document,"pointermove",this._onTouchMove):f(document,e?"touchmove":"mousemove",this._onTouchMove):(f($,"dragend",this),f(tt,"dragstart",this._onDragStart));try{document.selection?zt(function(){document.selection.empty();}):window.getSelection().removeAllRanges();}catch(t){}},_dragStarted:function(t,e){var n;Et=false,tt&&$?(q("dragStarted",this,{evt:e}),this.nativeDraggable&&f(document,"dragover",jt),n=this.options,t||k($,n.dragClass,false),k($,n.ghostClass,true),Ht.active=this,t&&this._appendGhost(),Z({sortable:this,name:"start",originalEvent:e})):this._nulling();},_emulateDragOver:function(){if(ht){this._lastX=ht.clientX,this._lastY=ht.clientY,Yt();for(var t=document.elementFromPoint(ht.clientX,ht.clientY),e=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(ht.clientX,ht.clientY))!==e;)e=t;if($.parentNode[K]._isOutsideThisEl(t),e)do{if(e[K])if(e[K]._onDragOver({clientX:ht.clientX,clientY:ht.clientY,target:t,rootEl:e})&&!this.options.dragoverBubble)break}while(e=m(t=e));Bt();}},_onTouchMove:function(t){if(dt){var e=this.options,n=e.fallbackTolerance,o=e.fallbackOffset,i=t.touches?t.touches[0]:t,r=J&&D(J,true),a=J&&r&&r.a,l=J&&r&&r.d,e=Nt&&Dt&&S(Dt),a=(i.clientX-dt.clientX+o.x)/(a||1)+(e?e[0]-xt[0]:0)/(a||1),l=(i.clientY-dt.clientY+o.y)/(l||1)+(e?e[1]-xt[1]:0)/(l||1);if(!Ht.active&&!Et){if(n&&Math.max(Math.abs(i.clientX-this._lastX),Math.abs(i.clientY-this._lastY))<n)return;this._onDragStart(t,true);}J&&(r?(r.e+=a-(ft||0),r.f+=l-(pt||0)):r={a:1,b:0,c:0,d:1,e:a,f:l},r="matrix(".concat(r.a,",").concat(r.b,",").concat(r.c,",").concat(r.d,",").concat(r.e,",").concat(r.f,")"),R(J,"webkitTransform",r),R(J,"mozTransform",r),R(J,"msTransform",r),R(J,"transform",r),ft=a,pt=l,ht=i),t.cancelable&&t.preventDefault();}},_appendGhost:function(){if(!J){var t=this.options.fallbackOnBody?document.body:tt,e=X($,true,Nt,true,t),n=this.options;if(Nt){for(Dt=t;"static"===R(Dt,"position")&&"none"===R(Dt,"transform")&&Dt!==document;)Dt=Dt.parentNode;Dt!==document.body&&Dt!==document.documentElement?(Dt===document&&(Dt=O()),e.top+=Dt.scrollTop,e.left+=Dt.scrollLeft):Dt=O(),xt=S(Dt);}k(J=$.cloneNode(true),n.ghostClass,false),k(J,n.fallbackClass,true),k(J,n.dragClass,true),R(J,"transition",""),R(J,"transform",""),R(J,"box-sizing","border-box"),R(J,"margin",0),R(J,"top",e.top),R(J,"left",e.left),R(J,"width",e.width),R(J,"height",e.height),R(J,"opacity","0.8"),R(J,"position",Nt?"absolute":"fixed"),R(J,"zIndex","100000"),R(J,"pointerEvents","none"),Ht.ghost=J,t.appendChild(J),R(J,"transform-origin",gt/parseInt(J.style.width)*100+"% "+mt/parseInt(J.style.height)*100+"%");}},_onDragStart:function(t,e){var n=this,o=t.dataTransfer,i=n.options;q("dragStart",this,{evt:t}),Ht.eventCanceled?this._onDrop():(q("setupClone",this),Ht.eventCanceled||((ot=T($)).removeAttribute("id"),ot.draggable=false,ot.style["will-change"]="",this._hideClone(),k(ot,this.options.chosenClass,false),Ht.clone=ot),n.cloneId=zt(function(){q("clone",n),Ht.eventCanceled||(n.options.removeCloneOnHide||tt.insertBefore(ot,$),n._hideClone(),Z({sortable:n,name:"clone"}));}),e||k($,i.dragClass,true),e?(St=true,n._loopId=setInterval(n._emulateDragOver,50)):(p(document,"mouseup",n._onDrop),p(document,"touchend",n._onDrop),p(document,"touchcancel",n._onDrop),o&&(o.effectAllowed="move",i.setData&&i.setData.call(n,o,$)),f(document,"drop",n),R($,"transform","translateZ(0)")),Et=true,n._dragStartId=zt(n._dragStarted.bind(n,e,t)),f(document,"selectstart",n),vt=true,window.getSelection().removeAllRanges(),u&&R(document.body,"user-select","none"));},_onDragOver:function(n){var o,i,r,t,e,a=this.el,l=n.target,s=this.options,c=s.group,u=Ht.active,d=ct===c,h=s.sort,f=ut||u,p=this,g=false;if(!Ot){if(void 0!==n.preventDefault&&n.cancelable&&n.preventDefault(),l=P(l,s.draggable,a,true),O("dragOver"),Ht.eventCanceled)return g;if($.contains(n.target)||l.animated&&l.animatingX&&l.animatingY||p._ignoreWhileAnimating===l)return A(false);if(St=false,u&&!s.disabled&&(d?h||(i=Q!==tt):ut===this||(this.lastPutMode=ct.checkPull(this,u,$,n))&&c.checkPut(this,u,$,n))){if(r="vertical"===this._getDirection(n,l),o=X($),O("dragOverValid"),Ht.eventCanceled)return g;if(i)return Q=tt,M(),this._hideClone(),O("revert"),Ht.eventCanceled||(et?tt.insertBefore($,et):tt.appendChild($)),A(true);var m=F(a,s.draggable);if(m&&(S=n,c=r,x=X(F((E=this).el,E.options.draggable)),E=L(E.el,E.options,J),!(c?S.clientX>E.right+10||S.clientY>x.bottom&&S.clientX>x.left:S.clientY>E.bottom+10||S.clientX>x.right&&S.clientY>x.top)||m.animated)){if(m&&(t=n,e=r,C=X(B((_=this).el,0,_.options,true)),_=L(_.el,_.options,J),e?t.clientX<_.left-10||t.clientY<C.top&&t.clientX<C.right:t.clientY<_.top-10||t.clientY<C.bottom&&t.clientX<C.left)){var v=B(a,0,s,true);if(v===$)return A(false);if(D=X(l=v),false!==Lt(tt,a,$,o,l,D,n,false))return M(),a.insertBefore($,v),Q=a,N(),A(true)}else if(l.parentNode===a){var b,y,w,D=X(l),E=$.parentNode!==a,S=(S=$.animated&&$.toRect||o,x=l.animated&&l.toRect||D,_=(e=r)?S.left:S.top,t=e?S.right:S.bottom,C=e?S.width:S.height,v=e?x.left:x.top,S=e?x.right:x.bottom,x=e?x.width:x.height,!(_===v||t===S||_+C/2===v+x/2)),_=r?"top":"left",C=Y(l,"top","top")||Y($,"top","top"),v=C?C.scrollTop:void 0;if(bt!==l&&(y=D[_],Ct=false,Tt=!S&&s.invertSwap||E),0!==(b=function(t,e,n,o,i,r,a,l){var s=o?t.clientY:t.clientX,c=o?n.height:n.width,t=o?n.top:n.left,o=o?n.bottom:n.right,n=false;if(!a)if(l&&wt<c*i){if(Ct=!Ct&&(1===yt?t+c*r/2<s:s<o-c*r/2)?true:Ct)n=true;else if(1===yt?s<t+wt:o-wt<s)return -yt}else if(t+c*(1-i)/2<s&&s<o-c*(1-i)/2)return function(t){return j($)<j(t)?1:-1}(e);if((n=n||a)&&(s<t+c*r/2||o-c*r/2<s))return t+c/2<s?1:-1;return 0}(n,l,D,r,S?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,Tt,bt===l)))for(var T=j($);(w=Q.children[T-=b])&&("none"===R(w,"display")||w===J););if(0===b||w===l)return A(false);yt=b;var x=(bt=l).nextElementSibling,E=false,S=Lt(tt,a,$,o,l,D,n,E=1===b);if(false!==S)return 1!==S&&-1!==S||(E=1===S),Ot=true,setTimeout(Wt,30),M(),E&&!x?a.appendChild($):l.parentNode.insertBefore($,E?x:l),C&&H(C,0,v-C.scrollTop),Q=$.parentNode,void 0===y||Tt||(wt=Math.abs(y-X(l)[_])),N(),A(true)}}else {if(m===$)return A(false);if((l=m&&a===n.target?m:l)&&(D=X(l)),false!==Lt(tt,a,$,o,l,D,n,!!l))return M(),m&&m.nextSibling?a.insertBefore($,m.nextSibling):a.appendChild($),Q=a,N(),A(true)}if(a.contains($))return A(false)}return  false}function O(t,e){q(t,p,I({evt:n,isOwner:d,axis:r?"vertical":"horizontal",revert:i,dragRect:o,targetRect:D,canSort:h,fromSortable:f,target:l,completed:A,onMove:function(t,e){return Lt(tt,a,$,o,t,X(t),n,e)},changed:N},e));}function M(){O("dragOverAnimationCapture"),p.captureAnimationState(),p!==f&&f.captureAnimationState();}function A(t){return O("dragOverCompleted",{insertion:t}),t&&(d?u._hideClone():u._showClone(p),p!==f&&(k($,(ut||u).options.ghostClass,false),k($,s.ghostClass,true)),ut!==p&&p!==Ht.active?ut=p:p===Ht.active&&ut&&(ut=null),f===p&&(p._ignoreWhileAnimating=l),p.animateAll(function(){O("dragOverAnimationComplete"),p._ignoreWhileAnimating=null;}),p!==f&&(f.animateAll(),f._ignoreWhileAnimating=null)),(l===$&&!$.animated||l===a&&!l.animated)&&(bt=null),s.dragoverBubble||n.rootEl||l===document||($.parentNode[K]._isOutsideThisEl(n.target),t||Ft(n)),!s.dragoverBubble&&n.stopPropagation&&n.stopPropagation(),g=true}function N(){at=j($),st=j($,s.draggable),Z({sortable:p,name:"change",toEl:a,newIndex:at,newDraggableIndex:st,originalEvent:n});}},_ignoreWhileAnimating:null,_offMoveEvents:function(){p(document,"mousemove",this._onTouchMove),p(document,"touchmove",this._onTouchMove),p(document,"pointermove",this._onTouchMove),p(document,"dragover",Ft),p(document,"mousemove",Ft),p(document,"touchmove",Ft);},_offUpEvents:function(){var t=this.el.ownerDocument;p(t,"mouseup",this._onDrop),p(t,"touchend",this._onDrop),p(t,"pointerup",this._onDrop),p(t,"pointercancel",this._onDrop),p(t,"touchcancel",this._onDrop),p(document,"selectstart",this);},_onDrop:function(t){var e=this.el,n=this.options;at=j($),st=j($,n.draggable),q("drop",this,{evt:t}),Q=$&&$.parentNode,at=j($),st=j($,n.draggable),Ht.eventCanceled||(Ct=Tt=Et=false,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),Gt(this.cloneId),Gt(this._dragStartId),this.nativeDraggable&&(p(document,"drop",this),p(e,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),u&&R(document.body,"user-select",""),R($,"transform",""),t&&(vt&&(t.cancelable&&t.preventDefault(),n.dropBubble||t.stopPropagation()),J&&J.parentNode&&J.parentNode.removeChild(J),(tt===Q||ut&&"clone"!==ut.lastPutMode)&&ot&&ot.parentNode&&ot.parentNode.removeChild(ot),$&&(this.nativeDraggable&&p($,"dragend",this),Kt($),$.style["will-change"]="",vt&&!Et&&k($,(ut||this).options.ghostClass,false),k($,this.options.chosenClass,false),Z({sortable:this,name:"unchoose",toEl:Q,newIndex:null,newDraggableIndex:null,originalEvent:t}),tt!==Q?(0<=at&&(Z({rootEl:Q,name:"add",toEl:Q,fromEl:tt,originalEvent:t}),Z({sortable:this,name:"remove",toEl:Q,originalEvent:t}),Z({rootEl:Q,name:"sort",toEl:Q,fromEl:tt,originalEvent:t}),Z({sortable:this,name:"sort",toEl:Q,originalEvent:t})),ut&&ut.save()):at!==rt&&0<=at&&(Z({sortable:this,name:"update",toEl:Q,originalEvent:t}),Z({sortable:this,name:"sort",toEl:Q,originalEvent:t})),Ht.active&&(null!=at&&-1!==at||(at=rt,st=lt),Z({sortable:this,name:"end",toEl:Q,originalEvent:t}),this.save())))),this._nulling();},_nulling:function(){q("nulling",this),tt=$=Q=J=et=ot=nt=it=dt=ht=vt=at=st=rt=lt=bt=yt=ut=ct=Ht.dragged=Ht.ghost=Ht.clone=Ht.active=null;var e=this.el;Mt.forEach(function(t){e.contains(t)&&(t.checked=true);}),Mt.length=ft=pt=0;},handleEvent:function(t){switch(t.type){case "drop":case "dragend":this._onDrop(t);break;case "dragenter":case "dragover":$&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault();}(t));break;case "selectstart":t.preventDefault();}},toArray:function(){for(var t,e=[],n=this.el.children,o=0,i=n.length,r=this.options;o<i;o++)P(t=n[o],r.draggable,this.el,false)&&e.push(t.getAttribute(r.dataIdAttr)||function(t){var e=t.tagName+t.className+t.src+t.href+t.textContent,n=e.length,o=0;for(;n--;)o+=e.charCodeAt(n);return o.toString(36)}(t));return e},sort:function(t,e){var n={},o=this.el;this.toArray().forEach(function(t,e){e=o.children[e];P(e,this.options.draggable,o,false)&&(n[t]=e);},this),e&&this.captureAnimationState(),t.forEach(function(t){n[t]&&(o.removeChild(n[t]),o.appendChild(n[t]));}),e&&this.animateAll();},save:function(){var t=this.options.store;t&&t.set&&t.set(this);},closest:function(t,e){return P(t,e||this.options.draggable,this.el,false)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];var o=G.modifyOption(this,t,e);n[t]=void 0!==o?o:e,"group"===t&&Xt(n);},destroy:function(){q("destroy",this);var t=this.el;t[K]=null,p(t,"mousedown",this._onTapStart),p(t,"touchstart",this._onTapStart),p(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(p(t,"dragover",this),p(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable");}),this._onDrop(),this._disableDelayedDragEvents(),_t.splice(_t.indexOf(this.el),1),this.el=t=null;},_hideClone:function(){it||(q("hideClone",this),Ht.eventCanceled||(R(ot,"display","none"),this.options.removeCloneOnHide&&ot.parentNode&&ot.parentNode.removeChild(ot),it=true));},_showClone:function(t){"clone"===t.lastPutMode?it&&(q("showClone",this),Ht.eventCanceled||($.parentNode!=tt||this.options.group.revertClone?et?tt.insertBefore(ot,et):tt.appendChild(ot):tt.insertBefore(ot,$),this.options.group.revertClone&&this.animate($,ot),R(ot,"display",""),it=false)):this._hideClone();}},At&&f(document,"touchmove",function(t){(Ht.active||Et)&&t.cancelable&&t.preventDefault();}),Ht.utils={on:f,off:p,css:R,find:E,is:function(t,e){return !!P(t,e,t,false)},extend:function(t,e){if(t&&e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},throttle:C,closest:P,toggleClass:k,clone:T,index:j,nextTick:zt,cancelNextTick:Gt,detectDirection:Rt,getChild:B,expando:K},Ht.get=function(t){return t[K]},Ht.mount=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];(e=e[0].constructor===Array?e[0]:e).forEach(function(t){if(!t.prototype||!t.prototype.constructor)throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(t));t.utils&&(Ht.utils=I(I({},Ht.utils),t.utils)),G.mount(t);});},Ht.create=function(t,e){return new Ht(t,e)};var Ut,qt,Vt,Zt,$t,Qt,Jt=[],te=!(Ht.version="1.15.7");function ee(){Jt.forEach(function(t){clearInterval(t.pid);}),Jt=[];}function ne(){clearInterval(Qt);}var oe,ie=C(function(n,t,e,o){if(t.scroll){var i,r=(n.touches?n.touches[0]:n).clientX,a=(n.touches?n.touches[0]:n).clientY,l=t.scrollSensitivity,s=t.scrollSpeed,c=O(),u=false;qt!==e&&(qt=e,ee(),Ut=t.scroll,i=t.scrollFn,true===Ut&&(Ut=M(e,true)));var d=0,h=Ut;do{var f=h,p=X(f),g=p.top,m=p.bottom,v=p.left,b=p.right,y=p.width,w=p.height,D=void 0,E=void 0,S=f.scrollWidth,_=f.scrollHeight,C=R(f),T=f.scrollLeft,p=f.scrollTop,E=f===c?(D=y<S&&("auto"===C.overflowX||"scroll"===C.overflowX||"visible"===C.overflowX),w<_&&("auto"===C.overflowY||"scroll"===C.overflowY||"visible"===C.overflowY)):(D=y<S&&("auto"===C.overflowX||"scroll"===C.overflowX),w<_&&("auto"===C.overflowY||"scroll"===C.overflowY)),T=D&&(Math.abs(b-r)<=l&&T+y<S)-(Math.abs(v-r)<=l&&!!T),p=E&&(Math.abs(m-a)<=l&&p+w<_)-(Math.abs(g-a)<=l&&!!p);if(!Jt[d])for(var x=0;x<=d;x++)Jt[x]||(Jt[x]={});Jt[d].vx==T&&Jt[d].vy==p&&Jt[d].el===f||(Jt[d].el=f,Jt[d].vx=T,Jt[d].vy=p,clearInterval(Jt[d].pid),0==T&&0==p||(u=true,Jt[d].pid=setInterval(function(){o&&0===this.layer&&Ht.active._onTouchMove($t);var t=Jt[this.layer].vy?Jt[this.layer].vy*s:0,e=Jt[this.layer].vx?Jt[this.layer].vx*s:0;"function"==typeof i&&"continue"!==i.call(Ht.dragged.parentNode[K],e,t,n,$t,Jt[this.layer].el)||H(Jt[this.layer].el,e,t);}.bind({layer:d}),24))),d++;}while(t.bubbleScroll&&h!==c&&(h=M(h,false)));te=u;}},30),n=function(t){var e=t.originalEvent,n=t.putSortable,o=t.dragEl,i=t.activeSortable,r=t.dispatchSortableEvent,a=t.hideGhostForTarget,t=t.unhideGhostForTarget;e&&(i=n||i,a(),e=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e,e=document.elementFromPoint(e.clientX,e.clientY),t(),i&&!i.el.contains(e)&&(r("spill"),this.onSpill({dragEl:o,putSortable:n})));};function re(){}function ae(){}re.prototype={startIndex:null,dragStart:function(t){t=t.oldDraggableIndex;this.startIndex=t;},onSpill:function(t){var e=t.dragEl,n=t.putSortable;this.sortable.captureAnimationState(),n&&n.captureAnimationState();t=B(this.sortable.el,this.startIndex,this.options);t?this.sortable.el.insertBefore(e,t):this.sortable.el.appendChild(e),this.sortable.animateAll(),n&&n.animateAll();},drop:n},a(re,{pluginName:"revertOnSpill"}),ae.prototype={onSpill:function(t){var e=t.dragEl,t=t.putSortable||this.sortable;t.captureAnimationState(),e.parentNode&&e.parentNode.removeChild(e),t.animateAll();},drop:n},a(ae,{pluginName:"removeOnSpill"});var le,se,ce,ue,de,he=[],fe=[],pe=false,ge=false,me=false;function ve(n,o){fe.forEach(function(t,e){e=o.children[t.sortableIndex+(n?Number(e):0)];e?o.insertBefore(t,e):o.appendChild(t);});}function be(){he.forEach(function(t){t!==ce&&t.parentNode&&t.parentNode.removeChild(t);});}return Ht.mount(new function(){function t(){for(var t in this.defaults={scroll:true,forceAutoScrollFallback:false,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:true},this)"_"===t.charAt(0)&&"function"==typeof this[t]&&(this[t]=this[t].bind(this));}return t.prototype={dragStarted:function(t){t=t.originalEvent;this.sortable.nativeDraggable?f(document,"dragover",this._handleAutoScroll):this.options.supportPointer?f(document,"pointermove",this._handleFallbackAutoScroll):t.touches?f(document,"touchmove",this._handleFallbackAutoScroll):f(document,"mousemove",this._handleFallbackAutoScroll);},dragOverCompleted:function(t){t=t.originalEvent;this.options.dragOverBubble||t.rootEl||this._handleAutoScroll(t);},drop:function(){this.sortable.nativeDraggable?p(document,"dragover",this._handleAutoScroll):(p(document,"pointermove",this._handleFallbackAutoScroll),p(document,"touchmove",this._handleFallbackAutoScroll),p(document,"mousemove",this._handleFallbackAutoScroll)),ne(),ee(),clearTimeout(v),v=void 0;},nulling:function(){$t=qt=Ut=te=Qt=Vt=Zt=null,Jt.length=0;},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,true);},_handleAutoScroll:function(e,n){var o,i=this,r=(e.touches?e.touches[0]:e).clientX,a=(e.touches?e.touches[0]:e).clientY,t=document.elementFromPoint(r,a);$t=e,n||this.options.forceAutoScrollFallback||w||y||u?(ie(e,this.options,t,n),o=M(t,true),!te||Qt&&r===Vt&&a===Zt||(Qt&&ne(),Qt=setInterval(function(){var t=M(document.elementFromPoint(r,a),true);t!==o&&(o=t,ee()),ie(e,i.options,t,n);},10),Vt=r,Zt=a)):this.options.bubbleScroll&&M(t,true)!==O()?ie(e,this.options,M(t,false),false):ee();}},a(t,{pluginName:"scroll",initializeByDefault:true})}),Ht.mount(ae,re),Ht.mount(new function(){function t(){this.defaults={swapClass:"sortable-swap-highlight"};}return t.prototype={dragStart:function(t){t=t.dragEl;oe=t;},dragOverValid:function(t){var e=t.completed,n=t.target,o=t.onMove,i=t.activeSortable,r=t.changed,a=t.cancel;i.options.swap&&(t=this.sortable.el,i=this.options,n&&n!==t&&(t=oe,oe=false!==o(n)?(k(n,i.swapClass,true),n):null,t&&t!==oe&&k(t,i.swapClass,false)),r(),e(true),a());},drop:function(t){var e,n,o=t.activeSortable,i=t.putSortable,r=t.dragEl,a=i||this.sortable,l=this.options;oe&&k(oe,l.swapClass,false),oe&&(l.swap||i&&i.options.swap)&&r!==oe&&(a.captureAnimationState(),a!==o&&o.captureAnimationState(),n=oe,t=(e=r).parentNode,l=n.parentNode,t&&l&&!t.isEqualNode(n)&&!l.isEqualNode(e)&&(i=j(e),r=j(n),t.isEqualNode(l)&&i<r&&r++,t.insertBefore(n,t.children[i]),l.insertBefore(e,l.children[r])),a.animateAll(),a!==o&&o.animateAll());},nulling:function(){oe=null;}},a(t,{pluginName:"swap",eventProperties:function(){return {swapItem:oe}}})}),Ht.mount(new function(){function t(o){for(var t in this)"_"===t.charAt(0)&&"function"==typeof this[t]&&(this[t]=this[t].bind(this));o.options.avoidImplicitDeselect||(o.options.supportPointer?f(document,"pointerup",this._deselectMultiDrag):(f(document,"mouseup",this._deselectMultiDrag),f(document,"touchend",this._deselectMultiDrag))),f(document,"keydown",this._checkKeyDown),f(document,"keyup",this._checkKeyUp),this.defaults={selectedClass:"sortable-selected",multiDragKey:null,avoidImplicitDeselect:false,setData:function(t,e){var n="";he.length&&se===o?he.forEach(function(t,e){n+=(e?", ":"")+t.textContent;}):n=e.textContent,t.setData("Text",n);}};}return t.prototype={multiDragKeyDown:false,isMultiDrag:false,delayStartGlobal:function(t){t=t.dragEl;ce=t;},delayEnded:function(){this.isMultiDrag=~he.indexOf(ce);},setupClone:function(t){var e=t.sortable,t=t.cancel;if(this.isMultiDrag){for(var n=0;n<he.length;n++)fe.push(T(he[n])),fe[n].sortableIndex=he[n].sortableIndex,fe[n].draggable=false,fe[n].style["will-change"]="",k(fe[n],this.options.selectedClass,false),he[n]===ce&&k(fe[n],this.options.chosenClass,false);e._hideClone(),t();}},clone:function(t){var e=t.sortable,n=t.rootEl,o=t.dispatchSortableEvent,t=t.cancel;this.isMultiDrag&&(this.options.removeCloneOnHide||he.length&&se===e&&(ve(true,n),o("clone"),t()));},showClone:function(t){var e=t.cloneNowShown,n=t.rootEl,t=t.cancel;this.isMultiDrag&&(ve(false,n),fe.forEach(function(t){R(t,"display","");}),e(),de=false,t());},hideClone:function(t){var e=this,n=(t.sortable,t.cloneNowHidden),t=t.cancel;this.isMultiDrag&&(fe.forEach(function(t){R(t,"display","none"),e.options.removeCloneOnHide&&t.parentNode&&t.parentNode.removeChild(t);}),n(),de=true,t());},dragStartGlobal:function(t){t.sortable;!this.isMultiDrag&&se&&se.multiDrag._deselectMultiDrag(),he.forEach(function(t){t.sortableIndex=j(t);}),he=he.sort(function(t,e){return t.sortableIndex-e.sortableIndex}),me=true;},dragStarted:function(t){var e,n=this,t=t.sortable;this.isMultiDrag&&(this.options.sort&&(t.captureAnimationState(),this.options.animation&&(he.forEach(function(t){t!==ce&&R(t,"position","absolute");}),e=X(ce,false,true,true),he.forEach(function(t){t!==ce&&x(t,e);}),pe=ge=true)),t.animateAll(function(){pe=ge=false,n.options.animation&&he.forEach(function(t){A(t);}),n.options.sort&&be();}));},dragOver:function(t){var e=t.target,n=t.completed,t=t.cancel;ge&&~he.indexOf(e)&&(n(false),t());},revert:function(t){var n,o,e=t.fromSortable,i=t.rootEl,r=t.sortable,a=t.dragRect;1<he.length&&(he.forEach(function(t){r.addAnimationState({target:t,rect:ge?X(t):a}),A(t),t.fromRect=a,e.removeAnimationState(t);}),ge=false,n=!this.options.removeCloneOnHide,o=i,he.forEach(function(t,e){e=o.children[t.sortableIndex+(n?Number(e):0)];e?o.insertBefore(t,e):o.appendChild(t);}));},dragOverCompleted:function(t){var e,n=t.sortable,o=t.isOwner,i=t.insertion,r=t.activeSortable,a=t.parentEl,l=t.putSortable,t=this.options;i&&(o&&r._hideClone(),pe=false,t.animation&&1<he.length&&(ge||!o&&!r.options.sort&&!l)&&(e=X(ce,false,true,true),he.forEach(function(t){t!==ce&&(x(t,e),a.appendChild(t));}),ge=true),o||(ge||be(),1<he.length?(o=de,r._showClone(n),r.options.animation&&!de&&o&&fe.forEach(function(t){r.addAnimationState({target:t,rect:ue}),t.fromRect=ue,t.thisAnimationDuration=null;})):r._showClone(n)));},dragOverAnimationCapture:function(t){var e=t.dragRect,n=t.isOwner,t=t.activeSortable;he.forEach(function(t){t.thisAnimationDuration=null;}),t.options.animation&&!n&&t.multiDrag.isMultiDrag&&(ue=a({},e),e=D(ce,true),ue.top-=e.f,ue.left-=e.e);},dragOverAnimationComplete:function(){ge&&(ge=false,be());},drop:function(t){var o,i,r,a,n,e,l,s=t.originalEvent,c=t.rootEl,u=t.parentEl,d=t.sortable,h=t.dispatchSortableEvent,f=t.oldIndex,t=t.putSortable,p=t||this.sortable;s&&(o=this.options,i=u.children,me||(o.multiDragKey&&!this.multiDragKeyDown&&this._deselectMultiDrag(),k(ce,o.selectedClass,!~he.indexOf(ce)),~he.indexOf(ce)?(he.splice(he.indexOf(ce),1),le=null,U({sortable:d,rootEl:c,name:"deselect",targetEl:ce,originalEvent:s})):(he.push(ce),U({sortable:d,rootEl:c,name:"select",targetEl:ce,originalEvent:s}),s.shiftKey&&le&&d.el.contains(le)?(r=j(le),a=j(ce),~r&&~a&&r!==a&&function(){for(var e,t=r<a?(e=r,a):(e=a,r+1),n=o.filter;e<t;e++)~he.indexOf(i[e])||P(i[e],o.draggable,u,false)&&(n&&("function"==typeof n?n.call(d,s,i[e],d):n.split(",").some(function(t){return P(i[e],t.trim(),u,false)}))||(k(i[e],o.selectedClass,true),he.push(i[e]),U({sortable:d,rootEl:c,name:"select",targetEl:i[e],originalEvent:s})));}()):le=ce,se=p)),me&&this.isMultiDrag&&(ge=false,(u[K].options.sort||u!==c)&&1<he.length&&(n=X(ce),e=j(ce,":not(."+this.options.selectedClass+")"),!pe&&o.animation&&(ce.thisAnimationDuration=null),p.captureAnimationState(),pe||(o.animation&&(ce.fromRect=n,he.forEach(function(t){var e;t.thisAnimationDuration=null,t!==ce&&(e=ge?X(t):n,t.fromRect=e,p.addAnimationState({target:t,rect:e}));})),be(),he.forEach(function(t){i[e]?u.insertBefore(t,i[e]):u.appendChild(t),e++;}),f===j(ce)&&(l=false,he.forEach(function(t){t.sortableIndex!==j(t)&&(l=true);}),l&&(h("update"),h("sort")))),he.forEach(function(t){A(t);}),p.animateAll()),se=p),(c===u||t&&"clone"!==t.lastPutMode)&&fe.forEach(function(t){t.parentNode&&t.parentNode.removeChild(t);}));},nullingGlobal:function(){this.isMultiDrag=me=false,fe.length=0;},destroyGlobal:function(){this._deselectMultiDrag(),p(document,"pointerup",this._deselectMultiDrag),p(document,"mouseup",this._deselectMultiDrag),p(document,"touchend",this._deselectMultiDrag),p(document,"keydown",this._checkKeyDown),p(document,"keyup",this._checkKeyUp);},_deselectMultiDrag:function(t){if(!(void 0!==me&&me||se!==this.sortable||t&&P(t.target,this.options.draggable,this.sortable.el,false)||t&&0!==t.button))for(;he.length;){var e=he[0];k(e,this.options.selectedClass,false),he.shift(),U({sortable:this.sortable,rootEl:this.sortable.el,name:"deselect",targetEl:e,originalEvent:t});}},_checkKeyDown:function(t){t.key===this.options.multiDragKey&&(this.multiDragKeyDown=true);},_checkKeyUp:function(t){t.key===this.options.multiDragKey&&(this.multiDragKeyDown=false);}},a(t,{pluginName:"multiDrag",utils:{select:function(t){var e=t.parentNode[K];e&&e.options.multiDrag&&!~he.indexOf(t)&&(se&&se!==e&&(se.multiDrag._deselectMultiDrag(),se=e),k(t,e.options.selectedClass,true),he.push(t));},deselect:function(t){var e=t.parentNode[K],n=he.indexOf(t);e&&e.options.multiDrag&&~n&&(k(t,e.options.selectedClass,false),he.splice(n,1));}},eventProperties:function(){var n=this,o=[],i=[];return he.forEach(function(t){var e;o.push({multiDragElement:t,index:t.sortableIndex}),e=ge&&t!==ce?-1:ge?j(t,":not(."+n.options.selectedClass+")"):j(t),i.push({multiDragElement:t,index:e});}),{items:e(he),clones:[].concat(fe),oldIndicies:o,newIndicies:i}},optionListeners:{multiDragKey:function(t){return "ctrl"===(t=t.toLowerCase())?t="Control":1<t.length&&(t=t.charAt(0).toUpperCase()+t.substr(1)),t}}})}),Ht}); 
} (Sortable_min$1));

var Sortable_minExports = Sortable_min$1.exports;
const Sortable = /*@__PURE__*/getDefaultExportFromCjs(Sortable_minExports);

const inlineEditorKey = /* @__PURE__ */ Symbol();
const _sfc_main$3 = /* @__PURE__ */ vueExports.defineComponent({
  ...{ inheritAttrs: false },
  __name: "HeaderWidget",
  __ssrInlineRender: true,
  props: {
    widget: {},
    inEditor: { type: Boolean },
    showLogoImg: { type: [Boolean, null] },
    logoUrl: {},
    logoSizeStyle: {},
    logoStacked: { type: Boolean },
    logoTitleSizeClass: {},
    siteName: {},
    showTitle: { type: Boolean },
    homeUrl: {},
    textStyle: {},
    navLinks: {},
    navLinkClass: {},
    navLinkStyle: {},
    navGapStyle: {},
    mutedTextStyle: {},
    resolvedCtaButtons: {},
    ctaButtonClass: { type: Function },
    ctaButtonStyle: { type: Function },
    ctaGapStyle: {},
    socialLinks: {},
    showColorModeToggle: { type: Boolean }
  },
  setup(__props) {
    const SOCIAL_ICONS = {
      twitter: "i-simple-icons-x",
      instagram: "i-simple-icons-instagram",
      linkedin: "i-simple-icons-linkedin",
      github: "i-simple-icons-github",
      youtube: "i-simple-icons-youtube",
      tiktok: "i-simple-icons-tiktok",
      facebook: "i-simple-icons-facebook",
      dribbble: "i-simple-icons-dribbble",
      behance: "i-simple-icons-behance"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_UColorModeButton = _sfc_main$1$1;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps(_ctx.$attrs, {
        "data-widget": __props.widget,
        class: ["flex items-center shrink-0", __props.inEditor ? "cursor-grab active:cursor-grabbing select-none" : ""],
        draggable: __props.inEditor ? "true" : "false"
      }, _attrs))}>`);
      if (__props.widget === "logo") {
        _push(`<a${ssrRenderAttr_1("href", __props.inEditor ? void 0 : __props.homeUrl)} class="${ssrRenderClass_1([[
          __props.logoStacked ? "flex-col items-center gap-1.5" : "flex-row items-center gap-2.5",
          __props.inEditor && "pointer-events-none"
        ], "flex shrink-0"])}">`);
        if (__props.showLogoImg) {
          _push(`<img${ssrRenderAttr_1("src", __props.logoUrl)}${ssrRenderAttr_1("alt", __props.siteName)} class="max-w-48 object-contain" style="${ssrRenderStyle_1(__props.logoSizeStyle)}">`);
        } else {
          _push(`<!---->`);
        }
        if (__props.showTitle && __props.siteName) {
          _push(`<span class="${ssrRenderClass_1([__props.logoTitleSizeClass, "font-bold leading-none"])}" style="${ssrRenderStyle_1(__props.textStyle)}">${ssrInterpolate_1(__props.siteName)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</a>`);
      } else if (__props.widget === "nav" && __props.navLinks.length) {
        _push(`<nav class="${ssrRenderClass_1([__props.inEditor && "pointer-events-none", "flex text-sm"])}" style="${ssrRenderStyle_1(__props.navGapStyle)}"><!--[-->`);
        ssrRenderList_1(__props.navLinks, (link) => {
          _push(`<a${ssrRenderAttr_1("href", __props.inEditor ? void 0 : link.url)} class="${ssrRenderClass_1(__props.navLinkClass)}" style="${ssrRenderStyle_1(__props.navLinkStyle)}">${ssrInterpolate_1(link.label)}</a>`);
        });
        _push(`<!--]--></nav>`);
      } else if (__props.widget === "cta" && __props.resolvedCtaButtons.length) {
        _push(`<div class="${ssrRenderClass_1([__props.inEditor && "pointer-events-none", "flex items-center"])}" style="${ssrRenderStyle_1(__props.ctaGapStyle)}"><!--[-->`);
        ssrRenderList_1(__props.resolvedCtaButtons, (btn) => {
          _push(`<a${ssrRenderAttr_1("href", __props.inEditor ? void 0 : btn.url)} class="${ssrRenderClass_1(__props.ctaButtonClass(btn.style))}" style="${ssrRenderStyle_1(__props.ctaButtonStyle(btn.style))}">${ssrInterpolate_1(btn.label)}</a>`);
        });
        _push(`<!--]--></div>`);
      } else if (__props.widget === "socials" && __props.socialLinks.length) {
        _push(`<div class="${ssrRenderClass_1([__props.inEditor && "pointer-events-none", "flex items-center gap-2"])}" style="${ssrRenderStyle_1(__props.mutedTextStyle)}"><!--[-->`);
        ssrRenderList_1(__props.socialLinks, (s) => {
          _push(`<a${ssrRenderAttr_1("href", __props.inEditor ? void 0 : s.url)}${ssrRenderAttr_1("target", __props.inEditor ? void 0 : "_blank")} rel="noopener noreferrer" class="hover:opacity-70 transition-opacity">`);
          _push(ssrRenderComponent_1(_component_UIcon, {
            name: SOCIAL_ICONS[s.platform] ?? "i-lucide-link",
            class: "size-4"
          }, null, _parent));
          _push(`</a>`);
        });
        _push(`<!--]--></div>`);
      } else if (__props.widget === "toggle" && __props.showColorModeToggle) {
        _push(`<div class="${ssrRenderClass_1(__props.inEditor && "pointer-events-none")}" style="${ssrRenderStyle_1(__props.textStyle)}">`);
        _push(ssrRenderComponent_1(_component_UColorModeButton, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/HeaderWidget.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const HeaderWidget = Object.assign(_sfc_main$3, { __name: "BlocksHeaderWidget" });
function useThemes() {
  const { $themes } = useNuxtApp();
  return $themes;
}
function useActivePalette() {
  const activeThemeId = useState("active-theme-id", () => null);
  const activeThemeMode = useState("active-theme-mode", () => "light");
  const allThemes = useThemes();
  const activeTheme = vueExports.computed(
    () => allThemes.value.find((t) => t.id === activeThemeId.value) ?? allThemes.value[0] ?? null
  );
  const isDark = vueExports.computed(() => activeThemeMode.value === "dark");
  const palette = vueExports.computed(() => activeTheme.value?.palette ?? []);
  function resolveColor(key) {
    if (!key) return null;
    const entry = palette.value.find((p) => p.key === key);
    if (!entry) return null;
    return (isDark.value ? entry.dark : entry.light) ?? null;
  }
  function hexLuminance(hex) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    const toLinear = (c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }
  function resolvePrimary(key) {
    if (key) {
      const entry = palette.value.find((p) => p.key === key);
      const override = isDark.value ? entry?.primaryDark : entry?.primaryLight;
      if (override) return override;
    }
    return isDark.value ? activeTheme.value?.dark.primary ?? "var(--primary)" : activeTheme.value?.light.primary ?? "var(--primary)";
  }
  function resolveSecondary(key) {
    if (key) {
      const entry = palette.value.find((p) => p.key === key);
      const override = isDark.value ? entry?.secondaryDark : entry?.secondaryLight;
      if (override) return override;
    }
    return isDark.value ? activeTheme.value?.dark.secondary ?? "var(--secondary)" : activeTheme.value?.light.secondary ?? "var(--secondary)";
  }
  function resolveTextColor(key) {
    if (!key) return null;
    const entry = palette.value.find((p) => p.key === key);
    if (!entry) return null;
    const defined = isDark.value ? entry.textDark : entry.textLight;
    if (defined) return defined;
    const bg = isDark.value ? entry.dark : entry.light;
    if (!bg || !bg.startsWith("#")) return null;
    return hexLuminance(bg) > 0.179 ? "#1a1a1a" : "#ffffff";
  }
  return {
    activeThemeId,
    activeThemeMode,
    palette,
    resolveColor,
    resolveTextColor,
    resolvePrimary,
    resolveSecondary
  };
}
function useHeaderSlots(orders, visibility, onReorder) {
  function filterVisible(order) {
    const v = visibility.value;
    return order.filter((w) => {
      if (w === "logo") return v.showLogo;
      if (w === "nav") return v.showNav;
      if (w === "cta") return v.showCta;
      if (w === "socials") return v.showSocials;
      if (w === "toggle") return v.showColorModeToggle;
      return true;
    });
  }
  function buildZones(o) {
    const seen = /* @__PURE__ */ new Set();
    const dedup = (order) => filterVisible([...order].filter((w) => !seen.has(w) && (seen.add(w), true)));
    if (o.layout === "stacked") {
      const top = dedup(o.topOrder);
      const left = dedup(o.leftOrder);
      const center = dedup(o.centerOrder);
      const right = dedup(o.rightOrder);
      return { top, left, center, right };
    } else {
      const left = dedup(o.leftOrder);
      const center = dedup(o.centerOrder);
      const right = dedup(o.rightOrder);
      const top = filterVisible(o.topOrder.filter((w) => !seen.has(w)));
      return { top, left, center, right };
    }
  }
  const zones = vueExports.reactive(buildZones(orders.value));
  const isDragging = vueExports.ref(false);
  vueExports.watch(orders, ({ leftOrder, centerOrder, rightOrder, topOrder, layout }) => {
    if (isDragging.value) return;
    const seen = /* @__PURE__ */ new Set();
    const dedup = (order) => filterVisible([...order].filter((w) => !seen.has(w) && (seen.add(w), true)));
    if (layout === "stacked") {
      zones.top = dedup([...topOrder]);
      zones.left = dedup([...leftOrder]);
      zones.center = dedup([...centerOrder]);
      zones.right = dedup([...rightOrder]);
    } else {
      zones.left = dedup([...leftOrder]);
      zones.center = dedup([...centerOrder]);
      zones.right = dedup([...rightOrder]);
      zones.top = filterVisible([...topOrder].filter((w) => !seen.has(w)));
    }
  });
  vueExports.watch(visibility, (newVis) => {
    if (isDragging.value) return;
    const o = orders.value;
    const allOrdered = /* @__PURE__ */ new Set([...o.leftOrder, ...o.centerOrder, ...o.rightOrder, ...o.topOrder]);
    const widgetToShow = [
      { widget: "logo", visKey: "showLogo" },
      { widget: "nav", visKey: "showNav" },
      { widget: "cta", visKey: "showCta" },
      { widget: "socials", visKey: "showSocials" },
      { widget: "toggle", visKey: "showColorModeToggle" }
    ];
    const extraRight = [];
    for (const { widget, visKey } of widgetToShow) {
      if (newVis[visKey] && !allOrdered.has(widget)) {
        extraRight.push(widget);
      }
    }
    const effectiveOrders = extraRight.length ? { ...o, rightOrder: [...o.rightOrder, ...extraRight] } : o;
    const rebuilt = buildZones(effectiveOrders);
    zones.left = rebuilt.left;
    zones.center = rebuilt.center;
    zones.right = rebuilt.right;
    zones.top = rebuilt.top;
    if (extraRight.length) {
      onReorder?.({
        leftOrder: zones.left,
        centerOrder: zones.center,
        rightOrder: zones.right,
        topOrder: zones.top,
        layout: orders.value.layout
      });
    }
  });
  const sortables = [];
  const elToZone = /* @__PURE__ */ new Map();
  function initSortable(el, zone) {
    elToZone.set(el, zone);
    const instance = Sortable.create(el, {
      group: "header-widgets",
      animation: 150,
      ghostClass: "header-sortable-ghost",
      chosenClass: "header-sortable-chosen",
      dragClass: "header-sortable-drag",
      onStart() {
        isDragging.value = true;
      },
      onEnd(evt) {
        isDragging.value = false;
        function readZone(zoneKey) {
          const el2 = [...elToZone.entries()].find(([, k]) => k === zoneKey)?.[0];
          if (!el2) return [...zones[zoneKey]];
          return [...el2.querySelectorAll("[data-widget]")].map((node) => node.dataset.widget).filter(Boolean);
        }
        const fromZone = elToZone.get(evt.from);
        const toZone = elToZone.get(evt.to);
        if (!fromZone || !toZone) return;
        vueExports.nextTick(() => {
          zones.left = readZone("left");
          zones.center = readZone("center");
          zones.right = readZone("right");
          zones.top = readZone("top");
          onReorder?.({
            leftOrder: zones.left,
            centerOrder: zones.center,
            rightOrder: zones.right,
            topOrder: zones.top,
            layout: orders.value.layout
          });
        });
      }
    });
    sortables.push(instance);
  }
  function destroySortables() {
    sortables.forEach((s) => s.destroy());
    sortables.length = 0;
    elToZone.clear();
  }
  const slotOrder = vueExports.computed(() => ({
    leftOrder: [...zones.left],
    centerOrder: [...zones.center],
    rightOrder: [...zones.right],
    topOrder: [...zones.top]
  }));
  return { zones, slotOrder, initSortable, destroySortables, isDragging };
}
const MIN_X_PADDING = 16;
const _sfc_main$2 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    siteName: { default: "" },
    homeUrl: { default: "/" },
    navLinks: { default: () => [] },
    ctaButtons: { default: () => [] },
    socialLinks: { default: () => [] },
    showColorModeToggle: { type: Boolean, default: false },
    layout: { default: "single" },
    position: { default: "static" },
    leftOrder: { default: () => ["logo", "nav"] },
    centerOrder: { default: () => [] },
    rightOrder: { default: () => ["cta"] },
    topOrder: { default: () => ["logo"] },
    logoUrl: { default: null },
    logoUrlDark: { default: null },
    logoSize: { default: "md" },
    logoStacked: { type: Boolean, default: false },
    brandingDisplay: { default: "logo-and-title" },
    background: { default: null },
    navStyle: { default: null },
    ctaStyle: { default: null },
    padding: { default: 16 },
    borderWidth: { default: 1 },
    maxWidth: { default: "7xl" },
    showLogo: { type: Boolean, default: true },
    showNav: { type: Boolean, default: true },
    showCta: { type: Boolean, default: true },
    showSocials: { type: Boolean, default: false },
    mobileMenuTitle: { default: "" },
    mobileMenuBg: { default: null },
    mobileBackground: { default: null },
    isEditor: { type: Boolean, default: false },
    onSlotReorder: { type: Function, default: void 0 },
    cta: { default: null }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const inlineEditor = vueExports.inject(inlineEditorKey, null);
    const inEditor = vueExports.computed(() => props.isEditor || !!inlineEditor);
    const { resolveColor, resolveTextColor, resolvePrimary, resolveSecondary } = useActivePalette();
    const paddingStyle = vueExports.computed(() => {
      const p = props.padding ?? 16;
      const x = Math.max(p, MIN_X_PADDING);
      return {
        paddingTop: `${p}px`,
        paddingBottom: `${p}px`,
        paddingLeft: `${x}px`,
        paddingRight: `${x}px`
      };
    });
    const bgColor = vueExports.computed(() => props.background ? resolveColor(props.background) : null);
    const bgStyle = vueExports.computed(
      () => bgColor.value ? { backgroundColor: bgColor.value } : { backgroundColor: "var(--bg-nav)" }
    );
    function hexLuminance(hex) {
      const h = hex.replace("#", "");
      const r = parseInt(h.slice(0, 2), 16) / 255;
      const g = parseInt(h.slice(2, 4), 16) / 255;
      const b = parseInt(h.slice(4, 6), 16) / 255;
      const toLinear = (c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    }
    const autoTextColor = vueExports.computed(
      () => props.background ? resolveTextColor(props.background) : null
    );
    const bgPrimary = vueExports.computed(() => resolvePrimary(props.background));
    const bgSecondary = vueExports.computed(() => resolveSecondary(props.background));
    const textStyle = vueExports.computed(
      () => autoTextColor.value ? { color: autoTextColor.value } : { color: "var(--text-primary)" }
    );
    const zoneOutlineColor = vueExports.computed(() => {
      const auto = autoTextColor.value;
      if (!auto?.startsWith("#")) return "rgba(128,128,128,0.25)";
      return hexLuminance(auto) > 0.5 ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.18)";
    });
    const mutedTextStyle = vueExports.computed(
      () => autoTextColor.value ? { color: autoTextColor.value, opacity: "0.7" } : { color: "var(--text-secondary)", opacity: "1" }
    );
    const mobileMenuBgStyle = vueExports.computed(() => {
      const hex = props.mobileBackground ? resolveColor(props.mobileBackground) : null;
      return hex ? { backgroundColor: hex } : { backgroundColor: "var(--bg-mobile-menu)" };
    });
    const mobileMenuTextColor = vueExports.computed(
      () => props.mobileBackground ? resolveTextColor(props.mobileBackground) : null
    );
    const mobileMenuTextStyle = vueExports.computed(
      () => mobileMenuTextColor.value ? { color: mobileMenuTextColor.value } : { color: "var(--text-primary)" }
    );
    const mobileMenuMutedStyle = vueExports.computed(
      () => mobileMenuTextColor.value ? { color: mobileMenuTextColor.value, opacity: "0.7" } : { color: "var(--text-secondary)", opacity: "1" }
    );
    const LOGO_HEIGHTS = { xs: 24, sm: 32, md: 40, lg: 52, xl: 68 };
    const LOGO_HEIGHTS_STACKED = { xs: 40, sm: 56, md: 72, lg: 96, xl: 128 };
    const logoHeightPx = vueExports.computed(() => {
      const map = props.logoStacked ? LOGO_HEIGHTS_STACKED : LOGO_HEIGHTS;
      return map[props.logoSize ?? "md"] ?? 40;
    });
    const logoSizeStyle = vueExports.computed(() => ({ height: `${logoHeightPx.value}px`, width: "auto" }));
    const logoTitleSizeClass = vueExports.computed(() => {
      const s = props.logoSize ?? "md";
      if (s === "xs") return "text-sm";
      if (s === "sm") return "text-base";
      if (s === "lg") return "text-xl";
      if (s === "xl") return "text-2xl";
      return "text-lg";
    });
    const resolvedLogoUrl = vueExports.computed(() => {
      if (!props.logoUrlDark) return props.logoUrl ?? null;
      const text = autoTextColor.value;
      const useDark = text?.startsWith("#") ? hexLuminance(text) > 0.179 : false;
      return useDark ? props.logoUrlDark : props.logoUrl ?? props.logoUrlDark;
    });
    const navColorResolved = vueExports.computed(() => bgPrimary.value);
    const NAV_DEFAULTS = {
      variant: "ghost",
      radius: "md",
      size: "sm",
      spacing: 4,
      uppercase: false,
      letterSpacing: 0
    };
    const CTA_DEFAULTS = {
      variant: "solid",
      radius: "md",
      size: "sm",
      spacing: 4,
      uppercase: false,
      letterSpacing: 0
    };
    const navStyleResolved = vueExports.computed(() => ({ ...NAV_DEFAULTS, ...props.navStyle }));
    const ctaStyleResolved = vueExports.computed(() => ({ ...CTA_DEFAULTS, ...props.ctaStyle }));
    function radiusClass(r) {
      if (r === "none") return "rounded-none";
      if (r === "sm") return "rounded-sm";
      if (r === "lg") return "rounded-lg";
      if (r === "full") return "rounded-full";
      return "rounded-md";
    }
    function sizeClass(s) {
      if (s === "xs") return { text: "text-xs", pad: "px-2 py-0.5" };
      if (s === "md") return { text: "text-base", pad: "px-3 py-1.5" };
      if (s === "lg") return { text: "text-lg", pad: "px-4 py-2" };
      return { text: "text-sm", pad: "px-2.5 py-1" };
    }
    function buttonTextStyle(style) {
      return {
        ...style.uppercase ? { textTransform: "uppercase" } : {},
        ...style.letterSpacing > 0 ? { letterSpacing: `${(style.letterSpacing * 0.0625).toFixed(4)}em` } : {}
      };
    }
    const navRadiusClass = vueExports.computed(() => radiusClass(navStyleResolved.value.radius));
    const navSizeClass = vueExports.computed(() => sizeClass(navStyleResolved.value.size));
    const navLinkClass = vueExports.computed(() => {
      const v = navStyleResolved.value.variant;
      const r = navRadiusClass.value;
      const { text, pad } = navSizeClass.value;
      const base = `nav-link ${text} ${pad} transition-colors ${r}`;
      if (v === "solid") return `${base} font-medium`;
      if (v === "soft") return `${base}`;
      if (v === "outline") return `${base} border`;
      if (v === "link")
        return `nav-link ${text} transition-opacity hover:opacity-70 underline-offset-4 hover:underline`;
      return `${base} nav-link-ghost`;
    });
    const navGapStyle = vueExports.computed(() => ({ gap: `${navStyleResolved.value.spacing}px` }));
    const navLinkStyle = vueExports.computed(() => {
      const v = navStyleResolved.value.variant;
      const primary = navColorResolved.value;
      const text = autoTextColor.value ?? "var(--text-primary)";
      const extraStyle = buttonTextStyle(navStyleResolved.value);
      if (v === "solid") {
        const navTextColor = props.background ? resolveTextColor(props.background) ?? (hexLuminance(primary) > 0.179 ? "#1a1a1a" : "#ffffff") : hexLuminance(primary) > 0.179 ? "#1a1a1a" : "#ffffff";
        return { backgroundColor: primary, color: navTextColor, ...extraStyle };
      }
      if (v === "soft") {
        return {
          backgroundColor: `color-mix(in srgb, ${primary} 15%, transparent)`,
          color: primary,
          ...extraStyle
        };
      }
      if (v === "outline") {
        return { borderColor: primary, color: primary, ...extraStyle };
      }
      if (v === "link") {
        return { color: primary, ...extraStyle };
      }
      return {
        color: text,
        "--nav-ghost-hover": `color-mix(in srgb, ${text} 12%, transparent)`,
        ...extraStyle
      };
    });
    const MAX_WIDTH_CLASSES = {
      full: "w-full",
      sm: "max-w-sm mx-auto w-full",
      md: "max-w-md mx-auto w-full",
      lg: "max-w-lg mx-auto w-full",
      xl: "max-w-xl mx-auto w-full",
      "2xl": "max-w-2xl mx-auto w-full",
      "3xl": "max-w-3xl mx-auto w-full",
      "4xl": "max-w-4xl mx-auto w-full",
      "5xl": "max-w-5xl mx-auto w-full",
      "6xl": "max-w-6xl mx-auto w-full",
      "7xl": "max-w-7xl mx-auto w-full"
    };
    const innerMaxWidthClass = vueExports.computed(() => MAX_WIDTH_CLASSES[props.maxWidth ?? "7xl"] ?? "w-full");
    const borderStyle = vueExports.computed(() => {
      const w = props.borderWidth ?? 1;
      if (w === 0) return { borderBottomWidth: "0px" };
      return {
        borderBottomWidth: `${w}px`,
        borderColor: "color-mix(in srgb, var(--text-primary) 12%, transparent)"
      };
    });
    const showLogoImg = vueExports.computed(
      () => !!props.logoUrl && props.brandingDisplay !== "title-only"
    );
    const showTitle = vueExports.computed(() => props.brandingDisplay !== "logo-only");
    const resolvedCtaButtons = vueExports.computed(() => {
      if (props.ctaButtons.length > 0) return props.ctaButtons;
      if (props.cta)
        return [
          {
            id: "legacy",
            label: props.cta.label,
            url: props.cta.url,
            style: props.cta.style ?? "filled"
          }
        ];
      return [];
    });
    const ctaRadiusClass = vueExports.computed(() => radiusClass(ctaStyleResolved.value.radius));
    const ctaSizeClass = vueExports.computed(() => sizeClass(ctaStyleResolved.value.size));
    const ctaGapStyle = vueExports.computed(() => ({ gap: `${ctaStyleResolved.value.spacing}px` }));
    function ctaButtonStyle(style) {
      const secondary = bgSecondary.value;
      const extraStyle = buttonTextStyle(ctaStyleResolved.value);
      if (style === "outline")
        return {
          border: `1.5px solid ${secondary}`,
          backgroundColor: "transparent",
          color: secondary,
          ...extraStyle
        };
      if (style === "ghost")
        return { backgroundColor: "transparent", color: secondary, border: "none", ...extraStyle };
      const filledText = hexLuminance(secondary) > 0.179 ? "#1a1a1a" : "#ffffff";
      return { backgroundColor: secondary, color: filledText, border: "none", ...extraStyle };
    }
    function ctaButtonClass(style) {
      const { text, pad } = ctaSizeClass.value;
      const r = ctaRadiusClass.value;
      return `${pad} ${r} ${text} font-medium transition-opacity ` + (style === "filled" ? "hover:opacity-90" : "hover:opacity-70");
    }
    const slotOrders = vueExports.computed(() => ({
      leftOrder: props.leftOrder,
      centerOrder: props.centerOrder,
      rightOrder: props.rightOrder,
      topOrder: props.topOrder,
      layout: props.layout ?? "single"
    }));
    const slotVisibility = vueExports.computed(() => ({
      showLogo: props.showLogo ?? true,
      showNav: props.showNav ?? true,
      showCta: props.showCta ?? true,
      showSocials: props.showSocials ?? false,
      showColorModeToggle: props.showColorModeToggle ?? false
    }));
    const { zones, slotOrder, initSortable, destroySortables } = useHeaderSlots(
      slotOrders,
      slotVisibility,
      props.onSlotReorder
    );
    __expose({ slotOrder });
    const zoneRefs = {
      top: vueExports.useTemplateRef("zone-top"),
      left: vueExports.useTemplateRef("zone-left"),
      center: vueExports.useTemplateRef("zone-center"),
      right: vueExports.useTemplateRef("zone-right")
    };
    vueExports.watch(
      inEditor,
      (active) => {
        destroySortables();
        if (!active) return;
        vueExports.nextTick(() => {
          for (const [zone, ref2] of Object.entries(zoneRefs)) {
            if (ref2.value) initSortable(ref2.value, zone);
          }
        });
      },
      { immediate: true }
    );
    vueExports.watch(
      () => props.layout,
      () => {
        if (!inEditor.value) return;
        destroySortables();
        vueExports.nextTick(() => {
          for (const [zone, ref2] of Object.entries(zoneRefs)) {
            if (ref2.value) initSortable(ref2.value, zone);
          }
        });
      }
    );
    const mobileMenuOpen = vueExports.ref(false);
    const isMounted = vueExports.ref(false);
    const hasMobileMenu = vueExports.computed(
      () => props.showNav && props.navLinks.length > 0 || props.showCta && resolvedCtaButtons.value.length > 0 || props.showSocials && props.socialLinks.length > 0
    );
    const SOCIAL_ICONS = {
      twitter: "i-simple-icons-x",
      instagram: "i-simple-icons-instagram",
      linkedin: "i-simple-icons-linkedin",
      github: "i-simple-icons-github",
      youtube: "i-simple-icons-youtube",
      tiktok: "i-simple-icons-tiktok",
      facebook: "i-simple-icons-facebook",
      dribbble: "i-simple-icons-dribbble",
      behance: "i-simple-icons-behance"
    };
    const widgetProps = vueExports.computed(() => ({
      inEditor: inEditor.value,
      showLogoImg: showLogoImg.value,
      logoUrl: resolvedLogoUrl.value,
      logoSizeStyle: logoSizeStyle.value,
      logoStacked: props.logoStacked ?? false,
      logoTitleSizeClass: logoTitleSizeClass.value,
      siteName: props.siteName,
      showTitle: showTitle.value,
      homeUrl: props.homeUrl,
      textStyle: textStyle.value,
      mutedTextStyle: mutedTextStyle.value,
      navLinks: props.navLinks,
      navLinkClass: navLinkClass.value,
      navLinkStyle: navLinkStyle.value,
      navGapStyle: navGapStyle.value,
      resolvedCtaButtons: resolvedCtaButtons.value,
      ctaButtonClass,
      ctaButtonStyle,
      ctaGapStyle: ctaGapStyle.value,
      socialLinks: props.socialLinks,
      showColorModeToggle: props.showColorModeToggle
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$d;
      const _component_USlideover = _sfc_main$2$1;
      _push(`<!--[--><header class="${ssrRenderClass_1([__props.position === "sticky" ? "sticky top-0 z-10 w-full" : "relative"])}" style="${ssrRenderStyle_1({ ...vueExports.unref(bgStyle), ...vueExports.unref(borderStyle), ...vueExports.unref(paddingStyle) })}"><div class="${ssrRenderClass_1(vueExports.unref(innerMaxWidthClass))}"><div class="flex items-center justify-between min-h-9 @4xl:hidden"><a${ssrRenderAttr_1("href", vueExports.unref(inEditor) ? void 0 : __props.homeUrl)} class="${ssrRenderClass_1([[
        props.logoStacked ? "flex-col items-center gap-1.5" : "flex-row items-center gap-2.5",
        vueExports.unref(inEditor) && "pointer-events-none"
      ], "flex shrink-0"])}">`);
      if (vueExports.unref(showLogoImg)) {
        _push(`<img${ssrRenderAttr_1("src", vueExports.unref(resolvedLogoUrl))}${ssrRenderAttr_1("alt", props.siteName)} class="max-w-48 object-contain" style="${ssrRenderStyle_1({ "height": "32px", "width": "auto" })}">`);
      } else {
        _push(`<!---->`);
      }
      if (vueExports.unref(showTitle) && props.siteName) {
        _push(`<span class="font-bold leading-none text-base" style="${ssrRenderStyle_1(vueExports.unref(textStyle))}">${ssrInterpolate_1(props.siteName)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</a>`);
      if (vueExports.unref(hasMobileMenu) && !vueExports.unref(inEditor)) {
        _push(`<button class="flex items-center justify-center w-9 h-9 rounded-md transition-colors hover:bg-black/10" style="${ssrRenderStyle_1(vueExports.unref(textStyle))}" aria-label="Open menu">`);
        _push(ssrRenderComponent_1(_component_UIcon, {
          name: "i-lucide-menu",
          class: "size-5"
        }, null, _parent));
        _push(`</button>`);
      } else if (vueExports.unref(hasMobileMenu) && vueExports.unref(inEditor)) {
        _push(`<div class="flex items-center justify-center w-9 h-9 rounded-md opacity-50" style="${ssrRenderStyle_1(vueExports.unref(textStyle))}">`);
        _push(ssrRenderComponent_1(_component_UIcon, {
          name: "i-lucide-menu",
          class: "size-5"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden @4xl:block">`);
      if (__props.layout === "stacked") {
        _push(`<!--[--><div class="flex justify-center mb-2"><div class="${ssrRenderClass_1([vueExports.unref(inEditor) && "rounded px-2 min-w-16", "flex items-center gap-3 min-h-9"])}" style="${ssrRenderStyle_1(vueExports.unref(inEditor) ? { outline: `1px dashed ${vueExports.unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList_1(vueExports.unref(zones).top, (widget) => {
          _push(ssrRenderComponent_1(HeaderWidget, vueExports.mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, vueExports.unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div></div><div class="grid items-center gap-4" style="${ssrRenderStyle_1({ "grid-template-columns": "1fr auto 1fr" })}"><div class="${ssrRenderClass_1([vueExports.unref(inEditor) && "rounded px-2", "flex items-center gap-3 min-h-9"])}" style="${ssrRenderStyle_1(vueExports.unref(inEditor) ? { outline: `1px dashed ${vueExports.unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList_1(vueExports.unref(zones).left, (widget) => {
          _push(ssrRenderComponent_1(HeaderWidget, vueExports.mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, vueExports.unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div><div class="${ssrRenderClass_1([vueExports.unref(inEditor) && "rounded px-2 min-w-16", "flex items-center gap-3 justify-center min-h-9"])}" style="${ssrRenderStyle_1(vueExports.unref(inEditor) ? { outline: `1px dashed ${vueExports.unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList_1(vueExports.unref(zones).center, (widget) => {
          _push(ssrRenderComponent_1(HeaderWidget, vueExports.mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, vueExports.unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div><div class="${ssrRenderClass_1([vueExports.unref(inEditor) && "rounded px-2", "flex items-center gap-3 justify-end min-h-9"])}" style="${ssrRenderStyle_1(vueExports.unref(inEditor) ? { outline: `1px dashed ${vueExports.unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList_1(vueExports.unref(zones).right, (widget) => {
          _push(ssrRenderComponent_1(HeaderWidget, vueExports.mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, vueExports.unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div></div><!--]-->`);
      } else {
        _push(`<div class="grid items-center gap-4" style="${ssrRenderStyle_1({ "grid-template-columns": "1fr auto 1fr" })}"><div class="${ssrRenderClass_1([vueExports.unref(inEditor) && "rounded px-2", "flex items-center gap-3 min-h-9"])}" style="${ssrRenderStyle_1(vueExports.unref(inEditor) ? { outline: `1px dashed ${vueExports.unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList_1(vueExports.unref(zones).left, (widget) => {
          _push(ssrRenderComponent_1(HeaderWidget, vueExports.mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, vueExports.unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div><div class="${ssrRenderClass_1([vueExports.unref(inEditor) && "rounded px-2 min-w-16", "flex items-center gap-3 justify-center min-h-9"])}" style="${ssrRenderStyle_1(vueExports.unref(inEditor) ? { outline: `1px dashed ${vueExports.unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList_1(vueExports.unref(zones).center, (widget) => {
          _push(ssrRenderComponent_1(HeaderWidget, vueExports.mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, vueExports.unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div><div class="${ssrRenderClass_1([vueExports.unref(inEditor) && "rounded px-2", "flex items-center gap-3 justify-end min-h-9"])}" style="${ssrRenderStyle_1(vueExports.unref(inEditor) ? { outline: `1px dashed ${vueExports.unref(zoneOutlineColor)}` } : {})}"><!--[-->`);
        ssrRenderList_1(vueExports.unref(zones).right, (widget) => {
          _push(ssrRenderComponent_1(HeaderWidget, vueExports.mergeProps({
            key: widget,
            widget
          }, { ref_for: true }, vueExports.unref(widgetProps)), null, _parent));
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</div></div></header>`);
      if (vueExports.unref(isMounted)) {
        _push(ssrRenderComponent_1(_component_USlideover, {
          open: vueExports.unref(mobileMenuOpen),
          "onUpdate:open": ($event) => vueExports.isRef(mobileMenuOpen) ? mobileMenuOpen.value = $event : null,
          side: "right",
          class: "@4xl:hidden"
        }, {
          content: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-col h-full overflow-y-auto" style="${ssrRenderStyle_1(vueExports.unref(mobileMenuBgStyle))}"${_scopeId}><div class="flex items-center justify-between px-4 py-3 border-b shrink-0" style="${ssrRenderStyle_1({
                borderColor: vueExports.unref(mobileMenuTextColor) ? `color-mix(in srgb, ${vueExports.unref(mobileMenuTextColor)} 12%, transparent)` : "var(--color-default-200)"
              })}"${_scopeId}><span class="font-semibold text-sm" style="${ssrRenderStyle_1(vueExports.unref(mobileMenuTextStyle))}"${_scopeId}>${ssrInterpolate_1(props.mobileMenuTitle || "Menu")}</span><button class="flex items-center justify-center w-8 h-8 rounded-md transition-opacity hover:opacity-70" style="${ssrRenderStyle_1(vueExports.unref(mobileMenuTextStyle))}" aria-label="Close menu"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UIcon, {
                name: "i-lucide-x",
                class: "size-4"
              }, null, _parent2, _scopeId));
              _push2(`</button></div><div class="flex flex-col gap-6 p-4 flex-1"${_scopeId}>`);
              if (props.showNav && props.navLinks.length || props.showCta && vueExports.unref(resolvedCtaButtons).length) {
                _push2(`<nav class="flex flex-col gap-1"${_scopeId}><!--[-->`);
                ssrRenderList_1(props.navLinks, (link) => {
                  _push2(`<a${ssrRenderAttr_1("href", link.url)} class="px-3 py-2 rounded-md text-sm transition-opacity hover:opacity-70" style="${ssrRenderStyle_1([
                    vueExports.unref(mobileMenuTextStyle),
                    props.showNav ? null : { display: "none" }
                  ])}"${_scopeId}>${ssrInterpolate_1(link.label)}</a>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList_1(vueExports.unref(resolvedCtaButtons), (btn) => {
                  _push2(`<a${ssrRenderAttr_1("href", btn.url)} class="px-3 py-2 rounded-md text-sm transition-opacity hover:opacity-70" style="${ssrRenderStyle_1([
                    vueExports.unref(mobileMenuTextStyle),
                    props.showCta ? null : { display: "none" }
                  ])}"${_scopeId}>${ssrInterpolate_1(btn.label)}</a>`);
                });
                _push2(`<!--]--></nav>`);
              } else {
                _push2(`<!---->`);
              }
              if (props.showSocials && props.socialLinks.length) {
                _push2(`<div class="flex items-center gap-3"${_scopeId}><!--[-->`);
                ssrRenderList_1(props.socialLinks, (s) => {
                  _push2(`<a${ssrRenderAttr_1("href", s.url)} target="_blank" rel="noopener noreferrer" class="hover:opacity-70 transition-opacity" style="${ssrRenderStyle_1(vueExports.unref(mobileMenuMutedStyle))}"${_scopeId}>`);
                  _push2(ssrRenderComponent_1(_component_UIcon, {
                    name: SOCIAL_ICONS[s.platform] ?? "i-lucide-link",
                    class: "size-5"
                  }, null, _parent2, _scopeId));
                  _push2(`</a>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                vueExports.createVNode("div", {
                  class: "flex flex-col h-full overflow-y-auto",
                  style: vueExports.unref(mobileMenuBgStyle)
                }, [
                  vueExports.createVNode("div", {
                    class: "flex items-center justify-between px-4 py-3 border-b shrink-0",
                    style: {
                      borderColor: vueExports.unref(mobileMenuTextColor) ? `color-mix(in srgb, ${vueExports.unref(mobileMenuTextColor)} 12%, transparent)` : "var(--color-default-200)"
                    }
                  }, [
                    vueExports.createVNode("span", {
                      class: "font-semibold text-sm",
                      style: vueExports.unref(mobileMenuTextStyle)
                    }, vueExports.toDisplayString(props.mobileMenuTitle || "Menu"), 5),
                    vueExports.createVNode("button", {
                      class: "flex items-center justify-center w-8 h-8 rounded-md transition-opacity hover:opacity-70",
                      style: vueExports.unref(mobileMenuTextStyle),
                      "aria-label": "Close menu",
                      onClick: ($event) => mobileMenuOpen.value = false
                    }, [
                      vueExports.createVNode(_component_UIcon, {
                        name: "i-lucide-x",
                        class: "size-4"
                      })
                    ], 12, ["onClick"])
                  ], 4),
                  vueExports.createVNode("div", { class: "flex flex-col gap-6 p-4 flex-1" }, [
                    props.showNav && props.navLinks.length || props.showCta && vueExports.unref(resolvedCtaButtons).length ? (vueExports.openBlock(), vueExports.createBlock("nav", {
                      key: 0,
                      class: "flex flex-col gap-1"
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(props.navLinks, (link) => {
                        return vueExports.withDirectives((vueExports.openBlock(), vueExports.createBlock("a", {
                          key: link.url,
                          href: link.url,
                          class: "px-3 py-2 rounded-md text-sm transition-opacity hover:opacity-70",
                          style: vueExports.unref(mobileMenuTextStyle),
                          onClick: ($event) => mobileMenuOpen.value = false
                        }, vueExports.toDisplayString(link.label), 13, ["href", "onClick"])), [
                          [vueExports.vShow, props.showNav]
                        ]);
                      }), 128)),
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(resolvedCtaButtons), (btn) => {
                        return vueExports.withDirectives((vueExports.openBlock(), vueExports.createBlock("a", {
                          key: btn.id,
                          href: btn.url,
                          class: "px-3 py-2 rounded-md text-sm transition-opacity hover:opacity-70",
                          style: vueExports.unref(mobileMenuTextStyle),
                          onClick: ($event) => mobileMenuOpen.value = false
                        }, vueExports.toDisplayString(btn.label), 13, ["href", "onClick"])), [
                          [vueExports.vShow, props.showCta]
                        ]);
                      }), 128))
                    ])) : vueExports.createCommentVNode("", true),
                    props.showSocials && props.socialLinks.length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 1,
                      class: "flex items-center gap-3"
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(props.socialLinks, (s) => {
                        return vueExports.openBlock(), vueExports.createBlock("a", {
                          key: s.id,
                          href: s.url,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          class: "hover:opacity-70 transition-opacity",
                          style: vueExports.unref(mobileMenuMutedStyle)
                        }, [
                          vueExports.createVNode(_component_UIcon, {
                            name: SOCIAL_ICONS[s.platform] ?? "i-lucide-link",
                            class: "size-5"
                          }, null, 8, ["name"])
                        ], 12, ["href"]);
                      }), 128))
                    ])) : vueExports.createCommentVNode("", true)
                  ])
                ], 4)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BlocksHeader = Object.assign(_sfc_main$2, { __name: "BlocksHeader" });
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  props: {
    siteName: { default: "" },
    links: { default: () => [] },
    copyrightText: { default: "" }
  },
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs_1(vueExports.mergeProps({
        class: "px-8 py-8 border-t",
        style: {
          backgroundColor: "var(--bg-nav)",
          color: "var(--text-secondary)",
          borderColor: "color-mix(in srgb, var(--text-primary) 12%, transparent)"
        }
      }, _attrs))}><div class="max-w-5xl mx-auto flex flex-col @sm:flex-row items-center justify-between gap-4"><span class="font-semibold text-sm" style="${ssrRenderStyle_1({ color: "var(--text-primary)" })}">${ssrInterpolate_1(__props.siteName)}</span>`);
      if (__props.links.length) {
        _push(`<nav class="flex gap-6 text-sm"><!--[-->`);
        ssrRenderList_1(__props.links, (link) => {
          _push(`<a${ssrRenderAttr_1("href", link.url)} class="hover:opacity-80 transition-opacity">${ssrInterpolate_1(link.label)}</a>`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-sm">${ssrInterpolate_1(__props.copyrightText || `© ${vueExports.unref(year)} ${__props.siteName}`)}</span></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blocks/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BlocksFooter = Object.assign(_sfc_main$1, { __name: "BlocksFooter" });
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "PortfolioLayout",
  __ssrInlineRender: true,
  props: {
    cssVars: {},
    portfolioMode: {},
    siteName: {},
    homeUrl: {},
    navLinks: {},
    headerContent: {},
    footerContent: {},
    isEditor: { type: Boolean },
    googleFontsUrl: {},
    logoUrl: {},
    logoUrlDark: {},
    onSlotReorder: { type: Function }
  },
  emits: ["select-header", "select-footer"],
  setup(__props, { expose: __expose }) {
    const props = __props;
    const headerRef = vueExports.useTemplateRef("headerBlock");
    __expose({ headerRef });
    useHead(
      vueExports.computed(() => ({
        link: props.googleFontsUrl ? [{ rel: "stylesheet", href: props.googleFontsUrl }] : []
      }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlocksHeader = BlocksHeader;
      const _component_UMain = _sfc_main$4;
      const _component_BlocksFooter = BlocksFooter;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({
        class: "portfolio-root @container min-h-screen",
        style: {
          ...__props.cssVars,
          backgroundColor: "var(--bg-page)",
          color: "var(--text-primary)",
          fontFamily: __props.cssVars["--font-body"] ?? void 0
        }
      }, _attrs))}>`);
      if (__props.isEditor) {
        _push(`<div class="relative after:absolute after:inset-0 after:pointer-events-none after:ring-2 after:ring-inset after:ring-transparent hover:after:ring-primary/60 after:transition-shadow after:duration-150">`);
        _push(ssrRenderComponent_1(_component_BlocksHeader, vueExports.mergeProps({ ref: "headerBlock" }, __props.headerContent, {
          "site-name": __props.headerContent?.siteName || __props.siteName,
          "home-url": __props.homeUrl,
          "nav-links": __props.navLinks,
          "logo-url": __props.logoUrl,
          "logo-url-dark": __props.logoUrlDark,
          "mobile-menu-bg": __props.cssVars["--bg-mobile-menu"] ?? null,
          "show-color-mode-toggle": __props.portfolioMode === "both" && !!__props.headerContent?.showColorModeToggle,
          "is-editor": true,
          "on-slot-reorder": __props.onSlotReorder
        }), null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent_1(_component_BlocksHeader, vueExports.mergeProps(__props.headerContent, {
          "site-name": __props.headerContent?.siteName || __props.siteName,
          "home-url": __props.homeUrl,
          "nav-links": __props.navLinks,
          "logo-url": __props.logoUrl,
          "logo-url-dark": __props.logoUrlDark,
          "mobile-menu-bg": __props.cssVars["--bg-mobile-menu"] ?? null,
          "show-color-mode-toggle": __props.portfolioMode === "both" && !!__props.headerContent?.showColorModeToggle
        }), null, _parent));
      }
      _push(ssrRenderComponent_1(_component_UMain, null, {
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
      if (__props.isEditor) {
        _push(`<div class="relative cursor-pointer after:absolute after:inset-0 after:pointer-events-none after:ring-2 after:ring-inset after:ring-transparent hover:after:ring-primary/60 after:transition-shadow after:duration-150">`);
        _push(ssrRenderComponent_1(_component_BlocksFooter, vueExports.mergeProps(__props.footerContent, {
          "site-name": __props.footerContent?.siteName || __props.siteName,
          links: __props.navLinks
        }), null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent_1(_component_BlocksFooter, vueExports.mergeProps(__props.footerContent, {
          "site-name": __props.footerContent?.siteName || __props.siteName,
          links: __props.navLinks
        }), null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PortfolioLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "PortfolioLayout" });
function sanitizeHtml(html) {
  return html;
}
function visibleTags(tags) {
  return tags.filter((t) => !t.startsWith("::"));
}
const portfolioSlugKey = /* @__PURE__ */ Symbol();
const MAX_CONTENT_WIDTH_OPTIONS = [
  { label: "Small (48rem)", value: "sm" },
  { label: "Medium (56rem)", value: "md" },
  { label: "Large (64rem)", value: "lg" },
  { label: "Extra large (80rem)", value: "xl" },
  { label: "Full width", value: "full" }
];
const MAX_CONTENT_WIDTH_CLASS = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-none"
};
function useLayoutSettings() {
  const maxContentWidth = useState("layout-max-content-width", () => "sm");
  return { maxContentWidth };
}
function usePortfolio(slug, themeOverride) {
  const config = useRuntimeConfig();
  const colorMode = useColorMode();
  const baseURL = config.apiUrl;
  const { data: portfolioData, error: portfolioError } = useAsyncData(
    `portfolio-${slug}`,
    () => $fetch(`/api/portfolios/${slug}`, { baseURL })
  );
  const { data: pagesData } = useAsyncData(
    `portfolio-${slug}-pages`,
    () => $fetch(`/api/portfolios/${slug}/pages`, { baseURL })
  );
  const allThemesRef = useThemes();
  const { data: layoutBlocksData } = useAsyncData(
    `portfolio-${slug}-layout-blocks`,
    () => $fetch(`/api/portfolios/${slug}/pages/home/blocks`, { baseURL })
  );
  const portfolio = vueExports.computed(() => portfolioData.value?.portfolio ?? null);
  const publishedPages = vueExports.computed(() => pagesData.value?.pages ?? []);
  const dbThemeSettings = vueExports.computed(
    () => portfolio.value?.themeSettings
  );
  const themeSettings = vueExports.computed(
    () => themeOverride?.value ? { ...dbThemeSettings.value, ...themeOverride.value } : dbThemeSettings.value
  );
  const allThemes = vueExports.computed(() => allThemesRef.value ?? []);
  const selectedTheme = vueExports.computed(
    () => allThemes.value.find((t) => t.id === themeSettings.value?.themeId) ?? allThemes.value[0] ?? null
  );
  const portfolioMode = vueExports.computed(() => themeSettings.value?.mode ?? "light");
  const isDark = vueExports.computed(() => {
    if (portfolioMode.value === "dark") return true;
    if (portfolioMode.value === "light") return false;
    return colorMode.value === "dark";
  });
  const { activeThemeId, activeThemeMode } = useActivePalette();
  vueExports.watchEffect(
    () => {
      activeThemeId.value = selectedTheme.value?.id ?? null;
    },
    { flush: "sync" }
  );
  vueExports.watchEffect(
    () => {
      activeThemeMode.value = isDark.value ? "dark" : "light";
    },
    { flush: "sync" }
  );
  const { maxContentWidth: activeMaxContentWidth } = useLayoutSettings();
  vueExports.watchEffect(
    () => {
      activeMaxContentWidth.value = themeSettings.value?.maxContentWidth ?? "sm";
    },
    { flush: "sync" }
  );
  function buildCssVars(colors, theme, dark) {
    const vars = {
      "--bg-page": colors.bgPage,
      "--bg-surface": colors.bgSurface,
      "--bg-nav": colors.bgNav,
      "--bg-mobile-menu": colors.bgMobileMenu ?? colors.bgSurface,
      "--primary": colors.primary,
      "--secondary": colors.secondary,
      "--text-primary": colors.textPrimary,
      "--text-secondary": colors.textSecondary,
      "--border": colors.border ?? (dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")
    };
    for (const entry of theme.palette ?? []) {
      const color = dark ? entry.dark : entry.light;
      if (color) vars[`--palette-${entry.key}`] = color;
    }
    return vars;
  }
  const selectedFonts = vueExports.computed(() => themeSettings.value?.fonts ?? null);
  const logoLight = vueExports.computed(() => themeSettings.value?.logoLight ?? null);
  const logoDark = vueExports.computed(() => themeSettings.value?.logoDark ?? null);
  const activeLogo = vueExports.computed(() => {
    if (isDark.value) return logoDark.value ?? logoLight.value;
    return logoLight.value ?? logoDark.value;
  });
  const googleFontsUrl = vueExports.computed(() => {
    const fonts = selectedFonts.value;
    if (!fonts) return null;
    const families = [.../* @__PURE__ */ new Set([fonts.heading, fonts.body])].map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700`).join("&");
    return `https://fonts.googleapis.com/css2?${families}&display=swap`;
  });
  const cssVars = vueExports.computed(() => {
    const colorVars = selectedTheme.value ? buildCssVars(
      isDark.value ? selectedTheme.value.dark : selectedTheme.value.light,
      selectedTheme.value,
      isDark.value
    ) : {};
    const fonts = selectedFonts.value;
    if (!fonts) return colorVars;
    return {
      ...colorVars,
      "--font-heading": `"${fonts.heading}", sans-serif`,
      "--font-body": `"${fonts.body}", sans-serif`
    };
  });
  const navLinks = vueExports.computed(
    () => publishedPages.value.filter((p) => p.showInMenu).map((p) => ({ label: p.title, url: `/p/${slug}/${p.slug}` }))
  );
  const layoutBlocks = vueExports.computed(() => layoutBlocksData.value?.blocks ?? []);
  const headerBlock = vueExports.computed(() => layoutBlocks.value.find((b) => b.type === "header") ?? null);
  const footerBlock = vueExports.computed(() => layoutBlocks.value.find((b) => b.type === "footer") ?? null);
  return {
    portfolioError,
    portfolio,
    publishedPages,
    portfolioMode,
    cssVars,
    googleFontsUrl,
    navLinks,
    headerBlock,
    footerBlock,
    baseURL,
    activeLogo,
    logoLight,
    logoDark
  };
}

export { BlocksFooter as B, MAX_CONTENT_WIDTH_CLASS as M, __nuxt_component_0 as _, BlocksHeader as a, MAX_CONTENT_WIDTH_OPTIONS as b, useLayoutSettings as c, usePortfolio as d, useThemes as e, inlineEditorKey as i, portfolioSlugKey as p, sanitizeHtml as s, useActivePalette as u, visibleTags as v };
//# sourceMappingURL=usePortfolio-CUdxQeA9.mjs.map
