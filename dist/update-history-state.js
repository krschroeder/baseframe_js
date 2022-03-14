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

/***/ 534:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeHashParam": function() { return /* binding */ changeHashParam; }
/* harmony export */ });
/* unused harmony exports qsToObject, objectToQs, getHashParam */
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var qsToObject = function qsToObject() {
  var qs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : location.search.substring(1);

  if (qs) {
    var jsonStr = '{' + decodeURI(qs).split('&').map(function (el) {
      var kv = el.split('=');
      return "\"".concat(kv[0], "\":\"").concat(kv[1] ? kv[1] : '', "\"");
    }).join(',') + '}';
    var jsonObj = JSON.parse(jsonStr, function (key, value) {
      if (value === 'true') return true;
      if (value === 'false') return false;
      if (value !== "" && typeof +value === 'number' && !isNaN(+value)) return +value;
      return value;
    });
    return jsonObj;
  } else {
    return {};
  }
};
var objectToQs = function objectToQs(qs) {
  var strArr = [];

  for (var key in qs) {
    if ({}.hasOwnProperty.call(qs, key)) {
      if (qs[key]) {
        strArr.push("".concat(key, "=").concat(encodeURIComponent(qs[key] + '').replace(/%20/g, '+')));
      } else {
        strArr.push(key);
      }
    }
  }

  return strArr.join('&');
};
var changeHashParam = function changeHashParam(key, val) {
  var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var prevVal = arguments.length > 3 ? arguments[3] : undefined;
  var hashObj = qsToObject(location.hash.substring(1));

  if (!key && val !== prevVal) {
    delete hashObj[prevVal];
  }

  if (remove) {
    if (key) {
      delete hashObj[key];
    }

    if (!key && val) {
      delete hashObj[val];
    }
  } else {
    if (key) {
      $.extend(hashObj, _defineProperty({}, key, val));
    } else {
      $.extend(hashObj, _defineProperty({}, val, ''));
    }
  }

  return objectToQs(hashObj);
};

var _getParam = function _getParam(name) {
  var searchStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.search;
  var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '?&';
  var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '([^&#]*)|&|#|$';
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp("[".concat(start, "]").concat(name, "(=").concat(end, ")"));
  var results = regex.exec(searchStr);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

var getUrlParam = function getUrlParam(name) {
  var searchStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.search;
  return _getParam(name, searchStr);
};

var getHashParam = function getHashParam(name) {
  return _getParam(name, location.hash, '#&', '([^&;]*)|&|#|$');
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (getUrlParam)));

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
/* harmony import */ var _get_param__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(534);
// import getHistoryEntry from "./get-history-entry";


var updateHistoryState = function updateHistoryState(_, val) {
  var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var prevVal = arguments.length > 3 ? arguments[3] : undefined;
  var _$params = _.params,
      useLocationHash = _$params.useLocationHash,
      historyType = _$params.historyType,
      useHashFilter = _$params.useHashFilter;

  if (useLocationHash) {
    var updatedQs = '#' + (0,_get_param__WEBPACK_IMPORTED_MODULE_0__.changeHashParam)(useHashFilter, val, remove, prevVal);

    if (historyType === 'replace') {
      history.replaceState(null, null, updatedQs);
    } else if (historyType === 'push') {
      history.pushState(null, null, updatedQs);
    } else {
      console.warn("Please specifiy either 'push' or 'replace' for the state");
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (updateHistoryState);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});