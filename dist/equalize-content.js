!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var a in n)("object"==typeof exports?exports:e)[a]=n[a]}}(self,(function(){return function(){"use strict";var e={225:function(e,t,n){function a(e){return"string"==typeof e&&(e=JSON.parse(e.replace(/:\s*"([^"]*)"/g,(function(e,t){return': "'+t.replace(/:/g,"@colon@")+'"'})).replace(/:\s*'([^']*)'/g,(function(e,t){return': "'+t.replace(/:/g,"@colon@")+'"'})).replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g,'"$2": ').replace(/@colon@/g,":"))),e}n.d(t,{default:function(){return a}})},814:function(e,t,n){function a(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}n.d(t,{elData:function(){return s}});var i,o;i=new WeakMap,o=1;function s(e,t,n){var r,i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=[e,t,n].filter((function(e){return!!e}));return i?$(e).removeData(t):(r=$(e)).data.apply(r,a(o.slice(1)))}}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,n),i.exports}n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};return function(){n.r(a),n.d(a,{default:function(){return l}});var e=n(225),t=n(814);function r(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function i(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}var o="EqualizeContent",s="equalizeContent",l=function(){function n(a,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var i=this;i.element=a;var l=(0,e.default)($(a).data(s+"-options"));return(0,t.elData)(a,"".concat(o,"_params"),$.extend(n.defaults,r,l)),i.params=(0,t.elData)(a,"".concat(o,"_params")),i.elementHeight=i.params.useHeight?"height":"min-height",i.$equalizeItems=$(i.params.equalizeItem,i.element),i.aligningCSS=$(i.element).hasClass(i.params.aligningCss),i.winWidth=$(window).width(),i.matches=[],i.matchesMade=0,i.init(i.element,i.params),i}return i(n,null,[{key:"remove",value:function(e){$(e).each((function(){var e=(0,t.elData)(this,"".concat(o,"_instance")),n=$(e.element);$(window).off("resize.".concat(s," ").concat(s)),n.find("img").off("load.".concat(s)),e.$equalizeItems.css(e.elementHeight,""),(0,t.elData)(this,"".concat(o,"_params"),null,!0),(0,t.elData)(this,"".concat(o,"_instance"),null,!0)}))}},{key:"version",get:function(){return"2.0.2"}},{key:"pluginName",get:function(){return o}},{key:"defaults",get:function(){return{equalizeItem:".equalize",startWidth:0,stopWidth:480,timerDelay:100,useHeight:!1,useMargin:!1,aligningCss:"flex-l",resizeCss:"in-resize",fuzzy:1}}}]),i(n,[{key:"init",value:function(){var e,t=this;$(window).on("resize.".concat(s," ").concat(s),(function(n){clearTimeout(e),e=setTimeout((function(){t.equalize()}),t.params.timerDelay)})),t.imgsLoadedReEqualize(),t.equalize()}},{key:"imgsLoadedReEqualize",value:function(){var e=$("img",this.element).length-1,t=0;0!==e&&$("img",this.element).on("load.".concat(s),(function(){t++,e===t&&$(window).trigger(s)}))}},{key:"buildMatchArray",value:function(){var e=this;e.matchesMade=0,e.matches=[],e.$equalizeItems.css(e.elementHeight,"").each((function(t){var n=$(this),a=Math.floor(n.offset().top),r=n.outerHeight(),i=!0;e.params.useMargin&&(r+=parseFloat(n.css("margin-top")),r+=parseFloat(n.css("margin-bottom"))),e.matchesMade+=1;for(var o=0,s=e.matches.length;o<s;o+=1)if(e.getYPos(e.matches[o].ypos,a)){i=!1,e.matches[o].elems.push(t),e.matches[o].tallest<r&&(e.matches[o].tallest=r);break}(0===e.matches.length||i)&&e.matches.push({ypos:a,elems:[t],tallest:r})}))}},{key:"getYPos",value:function(e,t){return e===t||Math.abs(e-t)<=this.params.fuzzy}},{key:"assignHeightsToElems",value:function(){var e=this;if(e.matchesMade+1!==e.matches.length){e.$equalizeItems.addClass(e.params.resizeCss);for(var t=function(t,n){e.matches[t].elems.forEach((function(n){e.$equalizeItems.eq(n).css(e.elementHeight,e.matches[t].tallest)}))},n=0,a=e.matches.length;n<a;n+=1)t(n);e.$equalizeItems.removeClass(e.params.resizeCss)}}},{key:"equalize",value:function(){var e=this;e.winWidth=$(window).width();var t=e.params,n=t.startWidth,a=t.stopWidth,r=t.resizeCss,i=t.aligningCss;e.$equalizeItems.length&&(e.winWidth>a&&e.winWidth>n?($(e.element).addClass(r),e.aligningCSS||$(e.element).addClass(i),e.buildMatchArray(),e.assignHeightsToElems(),$(e.element).removeClass(r),e.aligningCSS||$(e.element).removeClass(i)):e.$equalizeItems.css(e.elementHeight,""))}}]),n}()}(),a}()}));