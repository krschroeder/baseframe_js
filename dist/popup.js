!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o=e();for(var n in o)("object"==typeof exports?exports:t)[n]=o[n]}}(self,(function(){return function(){"use strict";var t={225:function(t,e,o){function n(t){return"string"==typeof t&&(t=JSON.parse(t.replace(/:\s*"([^"]*)"/g,(function(t,e){return': "'+e.replace(/:/g,"@colon@")+'"'})).replace(/:\s*'([^']*)'/g,(function(t,e){return': "'+e.replace(/:/g,"@colon@")+'"'})).replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g,'"$2": ').replace(/@colon@/g,":"))),t}o.d(e,{default:function(){return n}})},534:function(t,e,o){o.d(e,{getHashParam:function(){return n}});var n=function(t){return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location.search,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"?&",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"([^&#]*)|&|#|$";t=t.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[".concat(o,"]").concat(t,"(=").concat(n,")")).exec(e);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null}(t,location.hash,"#&","([^&;]*)|&|#|$")}},994:function(t,e){var o=void 0!==window.crypto&&void 0!==window.crypto.getRandomValues?function(){var t=new Uint16Array(8);window.crypto.getRandomValues(t);var e=function(t){for(var e=t.toString(16);e.length<4;)e="0"+e;return e};return e(t[0])+e(t[1])+"-"+e(t[2])+"-"+e(t[3])+"-"+e(t[4])+"-"+e(t[5])+e(t[6])+e(t[7])}:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))};e.default=o},134:function(t,e,o){o.d(e,{photoRegex:function(){return n},CSS_TRANSISTION_DELAY:function(){return a}});var n=/\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$|(\?|&|&amp;)(image|ext\=\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg))?$/i,a=100},282:function(t,e,o){var n=o(534);e.default=function(t,e){var o=t.params.useHashFilter,a=window.location.hash,p=e;if(o){var r="".concat(o,"=").concat(e),c="".concat(o,"=").concat((0,n.getHashParam)(o));p=""!==a?a.match(c)?a.replace(c,r):"".concat(a,"&").concat(r):r}return""===p&&(p="#"),"#"+p.replace(/#/g,"")}},814:function(t,e,o){function n(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?a(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,n=new Array(e);o<e;o++)n[o]=t[o];return n}o.d(e,{elData:function(){return c}});var p,r;p=new WeakMap,r=1;function c(t,e,o){var a,p=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=[t,e,o].filter((function(t){return!!t}));return p?$(t).removeData(e):(a=$(t)).data.apply(a,n(r.slice(1)))}}},e={};function o(n){var a=e[n];if(void 0!==a)return a.exports;var p=e[n]={exports:{}};return t[n](p,p.exports,o),p.exports}o.d=function(t,e){for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return function(){o.r(n),o.d(n,{default:function(){return h}});var t=o(225),e=o(994),a=o(134),p=o(534),r=o(282),c=o(814);function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function l(t,e,o){return e&&i(t.prototype,e),o&&i(t,o),t}var s="Popup",d="popup",m="".concat(s,"_instance"),f=function(t){return t.data("popup-src")||t.attr("href")||null},v=function(t){return t.data("popup-title")||t.attr("title")||""},h=function(){function o(n,a,p){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o);var r=this,u=(0,t.default)($(n).data("popup-options")),i="popup_"+(0,e.default)(),l={popupID:i,src:f($(n)),caption:$(n).data("popup-caption")||"",title:v($(n))};return r.$element=$(n),(0,c.elData)(n,"".concat(s,"_params"),$.extend(o.defaults,l,a,u)),r.params=(0,c.elData)(n,"".concat(s,"_params")),r.params.useLocationHash&&i===r.params.popupID&&console.warn("If loading from a location hash please make sure to specify an ID not auto generated. This won't work should the page get reloaded."),r.key={ARROWLEFT:"ArrowLeft",ARROWRIGHT:"ArrowRight",ESCAPE:"Escape"},r.$popup=null,r.elemGrabbedLocation=$("<span/>").attr({id:"orig-loc_"+i}),r.contentFromDOM=!1,r.currentElem=null,r.currentSrc=null,r.$listElems=r.params.isJsArray?r.params.src:null,r.groupAmountElem=null,r.$domClickElem=null,r.domElemClicked=!1,r.popupEventName=d+r.params.popupID,r.groupCount=0,r.groupIndex=0,r.isOpen=!1,r.isOpenHash="",r.historyID="#"+r.params.popupID+(0===p?"":"__"+p),r.loadedFromHash=!1,r.initLoadEvents(),this}return l(o,null,[{key:"remove",value:function(t){$(t).each((function(){var t=(0,c.elData)(this,"".concat(s,"_params"));(0,c.elData)(this,m,null,!0);var e=d+t.popupID;$(this).off("".concat(t.enableEvent,".").concat(e)),$(this).off("".concat(e)),$(document).off("keydown.".concat(e,"groupcontrols")),$(document).off("keydown.".concat(e)),(0,c.elData)(this,"".concat(s,"_params"),null,!0),(0,c.elData)(this,"".concat(s,"_instance"),null,!0)}))}},{key:"version",get:function(){return"1.0.8"}},{key:"pluginName",get:function(){return s}},{key:"defaults",get:function(){return{popupID:null,src:null,title:null,caption:null,popupOuterClass:"",titleElem:"h3",titleCss:"",clickOutsideClose:!0,fadeOut:500,fadeIn:400,zIndex:2e3,vhDivisor:2,firstAnchorFocus:!0,setTopPosition:null,isImage:!1,isJsArray:!1,escapeClose:!0,group:!0,showGroupAmount:!1,groupOfHTML:"/",launch:!1,photoRegex:a.photoRegex,closeText:'<i class="icon-close"><span class="sr-only">Close</span></i>',prevBtnHTML:'<i class="icon-arrow-l"><span class="sr-only">Previous</span></i>',nextBtnHTML:'<i class="icon-arrow-r"><span class="sr-only">Next</span></i>',loadingHTML:'<div class="popup__loader"></div>',appendPopupTo:"body",showPopup:"popup--show-popup",enableEvent:"click",useHashFilter:null,loadLocationHash:!0,useLocationHash:!0,afterLoaded:function(){},afterClose:function(){},onClose:function(){}}}}]),l(o,[{key:"getHistoryEntry",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this,o=t?"":e.historyID;return(0,r.default)(e,o)}},{key:"initLoadEvents",value:function(){var t=this,e=t.params,o=e.launch,n=e.useHashFilter,a=e.loadLocationHash;t.$element.on("".concat(t.params.enableEvent,".").concat(t.popupEventName," ").concat(t.popupEventName),(function(e){var o=t.params.useLocationHash;e.preventDefault(),o&&window.history.pushState(null,null,t.getHistoryEntry()),t.isOpen?t._close():t.loadPopup(this)})),$(window).on("popstate.".concat(t.popupEventName," ").concat(t.popupEventName),(function(e){var o=t.params,n=o.useLocationHash,a=o.useHashFilter;n&&(t.historyID!==t.isOpenHash&&t.historyID!==(a?(0,p.getHashParam)(a):location.hash)||(t.isOpen?t._close():t.loadPopup(t.$element))),e.preventDefault()})),o&&t.loadPopup(document.activeElement),a&&t.historyID===(n?(0,p.getHashParam)(n):location.hash)&&(t.loadPopup(t.$element),t.loadedFromHash=!0)}},{key:"loadPopup",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this,o=e.params,n=o.escapeClose,a=o.useHashFilter;t&&(e.$domClickElem=$(t),e.domElemClicked=!0),e.isOpenHash=a?(0,p.getHashParam)(a):location.hash,e.addToDOM(),e.closeHandlers(),n&&e.escapeClose(),e.isOpen=!0}},{key:"addToDOM",value:function(){var t=this,e=t.params,o=e.fadeIn,n=e.appendPopupTo,a=e.firstAnchorFocus;t.createPopup(),$(n).append(t.$popup),a&&setTimeout((function(){var e=t.$popup.find("[tabindex], a, input, textarea").not("[tabindex='-1'],.popup__btn-close").eq(0);e.length?e[0].focus():t.$popup.find(".popup__btn-close")[0].focus()}),o+100),t.animationIn()}},{key:"determineContent",value:function(){var t=this,e=t.params,o=e.isJsArray,n=e.group;t.placeContentBack();var a,p,r,c,i=!1;if(o)p=(a=t.$listElems[t.groupIndex]).src,r=a.title,c=a.caption,t.groupCount=t.$listElems.length;else{if(t.$listElems=$("string"==typeof n?n:t.params.src),t.domElemClicked){for(var l=0,s=t.$listElems.length;l<s;l++)if(t.$listElems[l].isSameNode(t.$domClickElem[0])){t.groupIndex=l;break}t.domElemClicked=!1}a=t.$listElems.eq(t.groupIndex),(p=f(a))?i=/^(\#|\.)/.test(p):(p=a,i=!0),t.groupCount=t.$listElems.length,r=v(a),c=a.data("popup-caption")}t.currentElem=a,t.currentSrc=p,t.contentFromDOM=i&&!o||!o&&"object"===u(p),t.contentFromDOM&&$(p).after(t.elemGrabbedLocation),r&&(t.params.title=r),c&&(t.params.caption=c)}},{key:"placeContent",value:function(){var t=this,e=t.params,o=e.caption,n=e.isJsArray,a=e.titleElem,p=e.titleCss,r=e.title,c=e.showGroupAmount,u=e.popupID,i=e.loadingHTML,l=e.isImage,s=t.currentElem,m=t.currentSrc,f=t.$popup.find(".popup__content-body"),v=l||t.params.photoRegex.test(m)||(n?"img"===s.nodeName:"image"===s.data("popup-type"));if(t.$popup.find("#".concat(u,"__title")).html(r?"<".concat(a,' class="').concat(p,'">').concat(r,"</").concat(a,">"):""),t.$popup.find("#".concat(u,"__caption")).html(o),f.html(""),v){var h=new Image,g=$("<div/>").attr({class:"popup__loader-outer"}).html(i);h.src=m,h.alt=r||"",h.complete||(h.style.opacity="0",f.append(g)),f.append(h);var y=$(h);y.on("load.".concat(d),(function(){g.remove(),y.removeAttr("style"),f.css({"min-height":y.height()})}))}else f.append($(m)).css({"min-height":"0px"});c&&t.groupAmountElem.html("<span>".concat(t.groupIndex+1,'</span> \n\t\t\t\t<span class="popup__group-divisor">').concat(t.params.groupOfHTML,"</span> \n\t\t\t\t<span>").concat(t.groupCount,"</span>"))}},{key:"createPopup",value:function(){var t=this,e=t.params,o=e.popupID,n=e.group,a=e.prevBtnHTML,p=e.nextBtnHTML,r=e.showGroupAmount;t.determineContent();var c=null;if(t.groupCount>1&&("string"==typeof n||n)){var u=$("<button>").attr({type:"button",class:"btn--popup btn--popup-prev"}).append(a),i=$("<button>").attr({type:"button",class:"btn--popup btn--popup-next"}).append(p);c=$("<div/>").attr({class:"popup__controls"}).append(u,i)}r?(t.groupAmountElem=$("<div/>").attr({class:"popup__group-count"}),t.groupAmountElem.html("".concat(t.groupIndex+1," ").concat(t.params.groupOfHTML," ").concat(t.groupCount))):t.groupAmountElem=null;var l='<div id="'.concat(o,'-title" class="popup__title">').concat(t.params.title,"</div>"),s='<div id="'.concat(o,'-caption" class="popup__caption">').concat(t.params.caption,"</div>"),d=$("<div/>").attr({class:"popup__overlay"}),m=$("<div/>").attr({class:"popup__content"}),f=$("<div/>").attr({class:"popup__content-body"}),v=t.params.closeText?$("<a/>").attr({class:"popup__btn-close",href:"#"}).html(t.params.closeText):"",h=m.append(v,l,f,s,c,t.groupAmountElem),g=$("<div/>").attr({class:"popup ".concat(t.params.popupOuterClass),id:o,role:"dialog",tabindex:"-1","aria-labelledby":o+"-title",style:"z-index: ".concat(t.params.zIndex)}).append(d,h);t.$popup=g,t.placeContent(),t.groupControls(),t.params.afterLoaded(t.$element,o)}},{key:"toggleGroup",value:function(t,e){var o=this,n=o.groupCount-1,a=o.groupIndex;e&&(a=a===n?a=0:a+=1),t&&(a=0===a?a=n:a-=1),o.groupIndex=a,o.determineContent(),o.placeContent()}},{key:"groupControls",value:function(){var t=this;t.groupCount>1&&($(document).on("keydown.".concat(t.popupEventName,"groupcontrols"),(function(e){var o=(e||window.event).key;o!=t.key.ARROWLEFT&&o!=t.key.ARROWRIGHT||t.toggleGroup(o==t.key.ARROWLEFT,o==t.key.ARROWRIGHT)})),t.$popup.on("click.".concat(t.popupEventName),".btn--popup-prev",(function(){t.toggleGroup(!0,!1)})).on("click.".concat(t.popupEventName),".btn--popup-next",(function(){t.toggleGroup(!1,!0)})))}},{key:"animationIn",value:function(){var t=this,e=t.params,o=e.vhDivisor,n=e.setTopPosition,p=e.fadeIn,r=e.showPopup,c=t.$popup,u=0===o?0:$(window).height()/o,i=n||0===n?"function"==typeof n?n():n:Math.max(0,u+document.querySelector("html").scrollTop),l=c.find(".popup__content");c.css({display:""}),l.css({position:"absolute",top:i}),$("body").css({"overflow-x":"hidden"}),setTimeout((function(){t.$popup.addClass(r),l.addClass(r)}),a.CSS_TRANSISTION_DELAY),setTimeout((function(){$("body").css({"overflow-x":""})}),p)}},{key:"closeHandlers",value:function(){var t=this,e=t.params.clickOutsideClose?".popup__overlay,.popup__btn-close":".popup__btn-close";t.$popup.on("click.".concat(t.popupEventName),e,(function(e){e.preventDefault(),t._closeEvent()}))}},{key:"escapeClose",value:function(){var t=this;$(document).on("keydown.".concat(t.popupEventName),(function(e){(e||window.event).key===t.key.ESCAPE&&t._closeEvent()}))}},{key:"_closeEvent",value:function(){var t=this;t.params.useLocationHash&&window.history.pushState(null,null,t.getHistoryEntry(!0)),t._close()}},{key:"_close",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=this,o=e.params,n=o.showPopup,a=o.fadeOut,p="#"+e.params.popupID;e.$popup.removeClass(n),e.params.onClose(e.$element,p),$(document).off("keydown.".concat(e.popupEventName)),$(document).off("keydown.".concat(e.popupEventName,"groupcontrols")),setTimeout((function(){e.params.afterClose(e.$element,p),e.isOpen=!1,e.placeContentBack(),$(p).remove(),t&&$(e.$domClickElem)[0].focus(),e.isOpenHash=""}),a+1)}},{key:"placeContentBack",value:function(){var t=this;t.contentFromDOM&&($(t.elemGrabbedLocation).after($(t.currentSrc)),t.elemGrabbedLocation.remove(),t.contentFromDOM=!1)}},{key:"remove",value:function(){o.remove(this.element)}}],[{key:"close",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=(0,c.elData)(t,m)||t;o&&o._close(e)}},{key:"show",value:function(t){var e=(0,c.elData)(t,m);e&&e.loadPopup(t)}}]),o}()}(),n}()}));