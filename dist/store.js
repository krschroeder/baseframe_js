!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(self,(function(){return function(){"use strict";var e={134:function(e,t,n){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e){return void 0===e?"undefined":"object"!==r(e)||e?{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase():"null"}n.d(t,{default:function(){return o},camelCase:function(){return i}});var i=function(e){return e.replace(/-./g,(function(e){return e.toUpperCase()[1]}))}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return function(){n.r(r),n.d(r,{Store:function(){return f},installStoreAsDataToLibrary:function(){return l},elData:function(){return d}});var e=n(134);function t(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var i,u,a=(i=new WeakMap,u=1,{expose:function(e){if(e||console.log(i),"ret"===e)return i},set:function(e,t,n){var r=e[0]||e;if(!r)throw new Error("The element doesn't exist in the DOM");if(void 0===i.get(r))i.set(r,[{keyStore:t,id:u,data:n}]),u++;else{for(var o=i.get(r),a=!1,f=0,c=o.length;f<c;f++){var l=o[f];if(l.keyStore===t){$.extend(l,{data:n}),a=!0;break}}a||(o.push({keyStore:t,id:u,data:n}),u++)}},get:function(e,t){var n=e[0]||e;if(!n||void 0===i.get(n))return null;var r=i.get(n).filter((function(e){return e.keyStore===t}));return r.length?r[0].data:null},delete:function(e,t){var n=e[0]||e;if(n&&void 0!==i.get(n))for(var r=i.get(n),o=0,u=r.length;o<u;o++)if(r[o].keyStore===t){r.splice(o,1),0===r.length&&i.delete(n);break}}}),f={set:function(e,t,n){a.set(e,t,n)},get:function(e,t){return a.get(e,t)},remove:function(e,t){a.delete(e,t)}},c=!1;function l(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];window.jQuery||(c=!0,t&&(f.expose=function(e){return a.expose(e)},$.extend({exposeData:f.expose})),$.fn.data=function(e,t){var n=null;return this.each((function(){n=s(this,e,t)||n})),n},$.fn.removeData=function(t){this.each((function(){"string"===(0,e.default)(t)&&f.remove(this,t),"array"===(0,e.default)(t)&&t.forEach((function(e){f.remove(e,t)}))}))})}function s(t,n,r){var o=d(t,n,r);return o||((t.dataset?t.dataset[(0,e.camelCase)(n)]:null)||void 0)}function d(e,n,r){var o,i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],u=[e,n,r].filter((function(e){return!!e}));return c?i?f.remove(e,n):2===u.length?f.get.apply(f,t(u)):f.set.apply(f,t(u)):i?$(e).removeData(n):(o=$(e)).data.apply(o,t(u.slice(1)))}r.default=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];c=!0,e&&(f.expose=function(e){return a.expose(e)}),$.extend({store:f}),$.fn.store=function(e,t){return d(this,e,t)},$.fn.removeStore=function(e){f.remove(this,e)}}}(),r}()}));