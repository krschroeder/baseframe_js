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
/******/ 	var __webpack_modules__ = ({

/***/ 134:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isVisible": function() { return /* binding */ isVisible; }
/* harmony export */ });
/* unused harmony exports default, IE_Event, noop, isHidden, kebabCase, camelCase, isMobileOS */
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 
// General purposed helpers
// 
function getType(val) {
  if (typeof val === 'undefined') return 'undefined';
  if (_typeof(val) === 'object' && !val) return 'null';
  return {}.toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function IE_Event(event, params) {
  params = params || {
    bubbles: false,
    cancelable: false,
    detail: undefined
  };
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
} // visibilty

var isVisible = function isVisible(el) {
  var visibility = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var vis = el.offsetParent !== null || !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);

  if (visibility) {
    return $(el).css('visibility') !== 'hidden' && vis;
  } else {
    return vis;
  }
};
var noop = function noop() {};
var isHidden = function isHidden(el) {
  return !isVisible(el);
}; // string manipulation

var kebabCase = function kebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
};
var camelCase = function camelCase(string) {
  return string.replace(/-./g, function (x) {
    return x.toUpperCase()[1];
  });
}; // device

var isMobileOS = function isMobileOS() {
  return /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(134);

var defaultProps = {
  focusFirst: true,
  nameSpace: 'trapFocus',
  focusable: ['button', 'a', 'input', 'select', 'textarea', '[tabindex]']
};

var canFocusEls = function canFocusEls(i, el) {
  return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isVisible)(el, true) && el.tabIndex !== -1;
};

var trapFocus = function trapFocus(modalEl, props) {
  var _$$extend = $.extend({}, defaultProps, props),
      focusFirst = _$$extend.focusFirst,
      focusable = _$$extend.focusable,
      nameSpace = _$$extend.nameSpace;

  var $trapElem = $(modalEl);
  var focusableJoined = typeof focusable === 'string' ? focusable : focusable.join(',');
  var $firstFocusable = $trapElem.find(focusableJoined).filter(canFocusEls);
  var firstFocusable = $firstFocusable.length ? $firstFocusable[0] : null;

  if (focusFirst && firstFocusable) {
    firstFocusable.focus();
  }

  $(document.body).on("keydown.".concat(nameSpace), function (e) {
    var $focusable = $trapElem.find(focusableJoined).filter(canFocusEls);
    if (!$focusable.length) return;
    var lastFocusable = $focusable[$focusable.length - 1];
    var isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    firstFocusable = $focusable[0];

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement.isSameNode(firstFocusable)) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement.isSameNode(lastFocusable)) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });
  return {
    remove: function remove() {
      $(document.body).off("keydown.".concat(nameSpace));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (trapFocus);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});