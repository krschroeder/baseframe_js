!function(e,o){if("object"==typeof exports&&"object"==typeof module)module.exports=o();else if("function"==typeof define&&define.amd)define([],o);else{var n=o();for(var t in n)("object"==typeof exports?exports:e)[t]=n[t]}}(self,(function(){return function(){"use strict";var e={d:function(o,n){for(var t in n)e.o(n,t)&&!e.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:n[t]})},o:function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{default:function(){return r}});var n=function(){return document.documentElement.scrollTop||document.body.scrollTop||0},t=!1;function r(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];if(!t){t=!0;var l=null,f=o/1e3,u=null,c=!1,d=e<n();$(window).on("wheel.smoothScroll",(function(){c=!0}));var a=function(){r.apply(null,i),window.cancelAnimationFrame(u),t=!1,$(window).off("wheel.smoothScroll")};!function o(){var t=n();l===t||c?a():(l=t,0===Math.floor(t-e)&&(d?l<t:l>t)?a():(u=window.requestAnimationFrame(o),window.scroll(0,t+(e-t)*f)))}()}}return o}()}));