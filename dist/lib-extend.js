!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(self,(function(){return function(){"use strict";var t={134:function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t){return void 0===t?"undefined":"object"!==r(t)||t?{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase():"null"}n.d(e,{default:function(){return o}})},814:function(t,e,n){function r(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,{elData:function(){return u}});var a,i;a=new WeakMap,i=1;function u(t,e,n){var o,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=[t,e,n].filter((function(t){return!!t}));return a?$(t).removeData(e):(o=$(t)).data.apply(o,r(i.slice(1)))}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return function(){n.r(r);var t=n(134),e=n(814),o=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];for(var r in e)({}).hasOwnProperty.call(t,r)||(n&&console.log(r,"is not a property that can be used"),delete e[r]);return e};r.default=function(n){for(var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a="array"===(0,t.default)(n)?n:[n],i=function(t,n){var i=a[t],u=i.pluginName,f=u.charAt(0).toLowerCase()+u.substring(1);$.fn[f]=function(t){return this.each((function(n){var a=$(this);if((0,e.elData)(this,"".concat(u,"_instance"))){if("string"==typeof t)return void("remove"===t&&i.remove(a));var f=(0,e.elData)(this,"".concat(u,"_params"));o(f,t,r),(0,e.elData)(this,"".concat(u,"_params"),$.extend(f,t)),r&&console.log("Params updated",f)}else{var c=new i(a,t,n);(0,e.elData)(this,"".concat(u,"_instance"),c)}}))}},u=0,f=a.length;u<f;u++)i(u,f)}}(),r}()}));