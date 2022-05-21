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
var throttledResize = function throttledResize(callback) {
  var _namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'throttledResize';

  var manualTrigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
  var _throttledResize = null;
  var namespace = _namespace !== '' ? ".".concat(_namespace) : ''; //must pass in a function for the first argument else exit the script

  if (typeof callback !== 'function') {
    console.error('first parameter should be a function');
    return;
  }

  $(window).on("resize".concat(namespace).concat(manualTrigger && ' ' + _namespace), function (e) {
    clearTimeout(_throttledResize);
    _throttledResize = setTimeout(callback, delay, e);
  });

  if (manualTrigger) {
    $(window).trigger(_namespace);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (throttledResize);
/******/ 	return __webpack_exports__;
/******/ })()
;
});