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
var VERSION = "1.0.0";
var formInputs = {
  version: VERSION,
  radioCheckboxEnableSpacebar: function radioCheckboxEnableSpacebar() {
    var _ = formInputs;
    $(window).on('keydown.radioCheckboxEnableSpacebar radioCheckboxEnableSpacebar', function (ev) {
      var e = ev || window.event;
      var key = e.keyCode || e.which;
      var SPACE = 32;
      var ACTIVE_ELEM = document.activeElement;

      if (key === SPACE && ACTIVE_ELEM.nodeName.toUpperCase() === 'LABEL') {
        ACTIVE_ELEM.click();
        e.preventDefault();
        e.stopPropagation();
      }
    });
    return _;
  },
  init: function init() {
    var _ = formInputs;

    _.radioCheckboxEnableSpacebar();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (formInputs);
/******/ 	return __webpack_exports__;
/******/ })()
;
});