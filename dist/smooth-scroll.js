(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ smoothScroll; }
/* harmony export */ });
var docTop = function docTop() {
  return document.documentElement.scrollTop || document.body.scrollTop || 0;
};

var activeScroll = false;
function smoothScroll(elemYPos) {
  var _speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  var afterScroll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var afterScrollArgs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  // If an active scroll is going exit until it's done
  if (activeScroll) return;
  activeScroll = true;
  var prevScroll = null;
  var speed = _speed / 1000;
  var animation = null;
  var userBreakScroll = false;
  var targetIsAbove = elemYPos < docTop();
  $(window).on('wheel.smoothScroll', function () {
    userBreakScroll = true;
  });

  var scrollDone = function scrollDone() {
    afterScroll.apply(null, afterScrollArgs);
    window.cancelAnimationFrame(animation);
    activeScroll = false;
    $(window).off('wheel.smoothScroll');
  };

  (function smoothScrollInner() {
    var currentScroll = docTop();

    if (prevScroll === currentScroll || userBreakScroll) {
      scrollDone();
      return;
    }

    prevScroll = currentScroll;
    var isAtTarget = Math.floor(currentScroll - elemYPos) === 0;
    var isPastTarget = targetIsAbove ? prevScroll < currentScroll : prevScroll > currentScroll;

    if (!isAtTarget || !isPastTarget) {
      animation = window.requestAnimationFrame(smoothScrollInner);
      window.scroll(0, currentScroll + (elemYPos - currentScroll) * speed);
    } else {
      scrollDone();
      return;
    }
  })();
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});