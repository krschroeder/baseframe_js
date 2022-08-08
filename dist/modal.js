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

/***/ 180:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSS_TRANSISTION_DELAY": function() { return /* binding */ CSS_TRANSISTION_DELAY; }
/* harmony export */ });
/* unused harmony exports KEYS, PHOTO_RGX */
var KEYS = {
  ESC: 'Escape',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  ENTER: 'Enter',
  SHIFT: 'Shift',
  SPACE: 32,
  //use keyCode
  TAB: 'Tab'
};
var PHOTO_RGX = /\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$|(\?|&|&amp;)(image|ext\=\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg))?$/i;
var CSS_TRANSISTION_DELAY = 100;

/***/ }),

/***/ 225:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ validJSONFromString; }
/* harmony export */ });
function validJSONFromString(options) {
  if (typeof options == 'string') {
    options = JSON.parse(formattingValidJSON(options));
  }

  return options;
}

function formattingValidJSON(str) {
  // From https://stackoverflow.com/questions/9637517/parsing-relaxed-json-without-eval
  return str.replace(/:\s*"([^"]*)"/g, function (match, p1) {
    return ': "' + p1.replace(/:/g, '@colon@') + '"';
  }).replace(/:\s*'([^']*)'/g, function (match, p1) {
    return ': "' + p1.replace(/:/g, '@colon@') + '"';
  }).replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ').replace(/@colon@/g, ':');
}

/***/ }),

/***/ 534:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeHashParam": function() { return /* binding */ changeHashParam; },
/* harmony export */   "getHashParam": function() { return /* binding */ getHashParam; }
/* harmony export */ });
/* unused harmony exports qsToObject, objectToQs */
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
      if (value === 'false') return false; // set as number, +'' evalutes to 0... we don't want that

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
      // if we only have a value
      // then remove that as a key
      delete hashObj[val];
    }
  } else {
    if (key) {
      $.extend(hashObj, _defineProperty({}, key, val));
    } else {
      // if we don't have a key
      // assign the value to the key,
      // and then it's value is blank
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

/***/ }),

/***/ 994:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

var hasCrypto = typeof window.crypto !== 'undefined' && typeof window.crypto.getRandomValues !== 'undefined';
var generateGUID = hasCrypto ? function () {
  // If we have a cryptographically secure PRNG, use that
  // https://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
  var buf = new Uint16Array(8);
  window.crypto.getRandomValues(buf);

  var S4 = function S4(num) {
    var ret = num.toString(16);

    while (ret.length < 4) {
      ret = "0" + ret;
    }

    return ret;
  };

  return S4(buf[0]) + S4(buf[1]) + "-" + S4(buf[2]) + "-" + S4(buf[3]) + "-" + S4(buf[4]) + "-" + S4(buf[5]) + S4(buf[6]) + S4(buf[7]);
} : function () {
  // Otherwise, just use Math.random
  // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
/* harmony default export */ __webpack_exports__["default"] = (generateGUID);

/***/ }),

/***/ 134:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getType; },
/* harmony export */   "isVisible": function() { return /* binding */ isVisible; },
/* harmony export */   "noop": function() { return /* binding */ noop; },
/* harmony export */   "camelCase": function() { return /* binding */ camelCase; }
/* harmony export */ });
/* unused harmony exports IE_Event, isHidden, kebabCase, isMobileOS */
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

/***/ }),

/***/ 683:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

    if (!historyType || historyType === 'replace') {
      // if we don't have this parameter then
      // we just replace the state
      history.replaceState(null, null, updatedQs);
    } else if (historyType === 'push') {
      history.pushState(null, null, updatedQs);
    } else {
      console.warn("Please specifiy either 'push' or 'replace' for the state");
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (updateHistoryState);

/***/ }),

/***/ 814:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "elData": function() { return /* binding */ elData; }
/* harmony export */ });
/* unused harmony exports Store, installStoreAsDataToLibrary */
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var mapData = function () {
  var storeData = new WeakMap();
  var id = 1;
  return {
    expose: function expose(what) {
      if (!what) console.log(storeData);

      if (what === 'ret') {
        return storeData;
      }
    },
    set: function set(_element, keyStore, data) {
      var element = _element[0] || _element;

      if (!element) {
        throw new Error("The element doesn't exist in the DOM");
      }

      if (typeof storeData.get(element) === 'undefined') {
        storeData.set(element, [{
          keyStore: keyStore,
          id: id,
          data: data
        }]);
        id++;
      } else {
        var elemPropArr = storeData.get(element);
        var match = false;

        for (var i = 0, l = elemPropArr.length; i < l; i++) {
          var currKey = elemPropArr[i];

          if (currKey.keyStore === keyStore) {
            $.extend(currKey, {
              data: data
            });
            match = true;
            break;
          }
        }

        if (!match) {
          elemPropArr.push({
            keyStore: keyStore,
            id: id,
            data: data
          });
          id++;
        }
      }
    },
    get: function get(_element, keyStore) {
      var element = _element[0] || _element;

      if (!element || typeof storeData.get(element) === 'undefined') {
        return null;
      }

      var store = storeData.get(element).filter(function (el) {
        return el.keyStore === keyStore;
      });
      return store.length ? store[0].data : null;
    },
    "delete": function _delete(_element, keyStore) {
      var element = _element[0] || _element;

      if (!element || typeof storeData.get(element) === 'undefined') {
        return;
      }

      var elemPropArr = storeData.get(element);

      for (var i = 0, l = elemPropArr.length; i < l; i++) {
        var currKey = elemPropArr[i];

        if (currKey.keyStore === keyStore) {
          elemPropArr.splice(i, 1);

          if (elemPropArr.length === 0) {
            storeData["delete"](element);
          }

          break;
        }
      }
    }
  };
}();

var Store = {
  set: function set(element, keyStore, data) {
    mapData.set(element, keyStore, data);
  },
  get: function get(element, keyStore) {
    return mapData.get(element, keyStore);
  },
  remove: function remove(element, keyStore) {
    mapData["delete"](element, keyStore);
  }
}; // one state var to check if its installed the Store method

var storeFnInstalled = false;

function installStoreToLibrary() {
  var expose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  storeFnInstalled = true;

  if (expose) {
    Store.expose = function (p) {
      return mapData.expose(p);
    };
  }

  $.extend({
    store: Store
  });

  $.fn.store = function (dataName, data) {
    return elData(this, dataName, data);
  };

  $.fn.removeStore = function (dataName) {
    Store.remove(this, dataName);
  };
}

function installStoreAsDataToLibrary() {
  var expose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (window.jQuery) {
    return;
  }

  storeFnInstalled = true;

  if (expose) {
    Store.expose = function (p) {
      return mapData.expose(p);
    };

    $.extend({
      exposeData: Store.expose
    });
  }

  $.fn.data = function (dataName, data) {
    var retVal = null;
    this.each(function () {
      retVal = asData(this, dataName, data) || retVal;
    });
    return retVal;
  };

  $.fn.removeData = function (dataName) {
    //jquery params can be a string or an array
    this.each(function () {
      if (getType(dataName) === 'string') {
        Store.remove(this, dataName);
      }

      if (getType(dataName) === 'array') {
        dataName.forEach(function (d) {
          Store.remove(d, dataName);
        });
      }
    });
  };
}

function asData(el, dataName, data) {
  var storedData = elData(el, dataName, data);

  if (storedData) {
    // get stored data first
    return storedData;
  }

  var dataSet = el.dataset ? el.dataset[camelCase(dataName)] : null;

  if (dataSet) {
    return dataSet;
  }
} // retrieves data via the jQuery method or with the Store methods


function elData(el, dataName, data) {
  var _$;

  var remove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var dataArgs = [el, dataName, data].filter(function (arg) {
    return !!arg;
  });
  return storeFnInstalled ? remove ? Store.remove(el, dataName) : dataArgs.length === 2 ? Store.get.apply(Store, _toConsumableArray(dataArgs)) : Store.set.apply(Store, _toConsumableArray(dataArgs)) : remove ? $(el).removeData(dataName) : (_$ = $(el)).data.apply(_$, _toConsumableArray(dataArgs.slice(1)));
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (installStoreToLibrary)));


/***/ }),

/***/ 505:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Modal; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(225);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
/* harmony import */ var _util_trap_focus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(505);
/* harmony import */ var _util_guid_generate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(994);
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(180);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(134);
/* harmony import */ var _util_get_param__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(534);
/* harmony import */ var _util_plugin_update_history_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(683);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }










var VERSION = '1.0.1';
var EVENT_NAME = 'modal';
var DATA_NAME = 'Modal';
var DEFAULTS = {
  enableEvent: 'click',
  appendTo: document.body,
  ariaLabelledby: null,
  ariaLabel: null,
  cssPrefix: 'modal',
  closeBtnIconCss: 'ico i-close',
  closeOutDelay: 250,
  backDropClose: true,
  fromDOM: true,
  modalCss: null,
  modalID: null,
  src: null,
  useHashFilter: null,
  loadLocationHash: true,
  useLocationHash: true,
  onOpenOnce: _util_helpers__WEBPACK_IMPORTED_MODULE_4__.noop,
  onOpen: _util_helpers__WEBPACK_IMPORTED_MODULE_4__.noop,
  afterClose: _util_helpers__WEBPACK_IMPORTED_MODULE_4__.noop
};

var hasCb = function hasCb(cb, modalObj) {
  if (cb && typeof cb === 'function') {
    cb(modalObj);
  }
};

var Modal = /*#__PURE__*/function () {
  _createClass(Modal, null, [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var _ = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance")),
            params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_params")),
            _$modalObj = _.modalObj,
            $backdrop = _$modalObj.$backdrop,
            $closeBtn = _$modalObj.$closeBtn;

        _.modalObj.show && disableModal();
        $(_.element).off("".concat(_.params.enableEvent, ".").concat(_.modalEvent));
        $closeBtn.off("click.".concat(_.modalEvent, "Dismiss"));
        if (params.backDropClose) $backdrop.off("click.".concat(_.modalEvent, "Dismiss"));
        $(document).off("keydown.".concat(_.modalEvent, "Dismiss")).off("".concat(_.modalEvent, "Dismiss"));
        $(window).off("popstate.".concat(_.modalEvent, " ").concat(_.modalEvent));
        (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_params"), null, true);
        elata(this, "".concat(DATA_NAME, "_instance"), null, true);
      });
    }
  }, {
    key: "version",
    get: function get() {
      return VERSION;
    }
  }, {
    key: "pluginName",
    get: function get() {
      return DATA_NAME;
    }
  }]);

  function Modal($element, options) {
    _classCallCheck(this, Modal);

    var _ = this;

    _.element = $element[0];
    var dataOptions = (0,_util_formatting_valid_json__WEBPACK_IMPORTED_MODULE_5__.default)($element.data(DATA_NAME + '-options'));
    var instanceOptions = $.extend({}, Modal.defaults, options, dataOptions);
    (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)($element, "".concat(DATA_NAME, "_params"), instanceOptions);
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)($element, "".concat(DATA_NAME, "_params"));

    if (!_.params.modalID) {
      var idPartIfParamSrc,
          autoGen = false;

      if (_.params.src && (0,_util_helpers__WEBPACK_IMPORTED_MODULE_4__.default)(_.params.src) !== 'string') {
        idPartIfParamSrc = (0,_util_guid_generate_js__WEBPACK_IMPORTED_MODULE_2__.default)();
        autoGen = true;
      }

      _.modalID = (_.element.hash || _.element.dataset.modalSrc || autoGen && idPartIfParamSrc).replace('#', '');

      if (_.params.useLocationHash && autoGen) {
        console.warn('If loading from a location hash please make sure to specify an ID not auto generated. This won\'t work should the page get reloaded.');
      }
    } else {
      _.modalID = _.params.modalID;
    }

    _.modalObj = _.getModalObj();
    _.modalEvent = EVENT_NAME + '_' + _.modalID;
    _.trappedFocus = null;
    _.enabledElem = null;
    _.openedOnce = false;

    _.clickEnable();

    _.loadLocationHash();

    return this;
  }

  _createClass(Modal, [{
    key: "clickEnable",
    value: function clickEnable() {
      var _ = this;

      $(_.element).on("".concat(_.params.enableEvent, ".").concat(_.modalEvent), function (e) {
        _.setDisplayAndEvents();

        e.preventDefault();
      });
    }
  }, {
    key: "setDisplayAndEvents",
    value: function setDisplayAndEvents() {
      var _ = this;

      _.enableModal();

      $(document).on("keydown.".concat(_.modalEvent, "Dismiss"), function (e) {
        if (e.code === 'Escape' || //cash-dom
        e.originalEvent.key === 'Escape' //jquery
        ) {
            _.disableModal();

            e.preventDefault();
          }
      });
      $(document).on("".concat(_.modalEvent, "Dismiss"), _.disableModal);
    }
  }, {
    key: "getModalObj",
    value: function getModalObj() {
      var _ = this,
          _$params = _.params,
          ariaLabel = _$params.ariaLabel,
          ariaLabelledby = _$params.ariaLabelledby,
          closeBtnIconCss = _$params.closeBtnIconCss,
          modalCss = _$params.modalCss,
          modalID = _.modalID,
          modalAttr = {
        "class": 'modal' + (modalCss ? ' ' + modalCss : ''),
        'aria-label': ariaLabel || _.element.dataset.ariaLabel || null,
        'aria-labelledby': ariaLabelledby || _.element.dataset.ariaLabelledby || null,
        id: modalID
      },
          closeBtnAttrs = {
        "class": 'modal__btn-dismiss',
        type: 'button',
        'aria-label': 'Close'
      },
          $closeBtn = $('<button>').attr(closeBtnAttrs).append("<i class=\"".concat(closeBtnIconCss, "\"></i>")),
          $dialogContent = $('<div/>').attr({
        "class": 'modal__dialog-content'
      }),
          $dialog = $('<div/>').attr({
        "class": 'modal__dialog'
      }).append($closeBtn, $dialogContent),
          $backdrop = $('<div/>').attr({
        "class": 'modal__backdrop'
      }),
          $modal = $('<div/>').attr(modalAttr).append($backdrop, $dialog),
          $content = $(_.params.src || _.element.hash || _.element.dataset.modalSrc);

      return {
        $backdrop: $backdrop,
        $content: $content,
        contentAppended: false,
        $dialog: $dialog,
        $dialogContent: $dialogContent,
        $closeBtn: $closeBtn,
        id: modalID,
        $modal: $modal,
        disableModal: function disableModal() {
          return _.disableModal();
        },
        show: false
      };
    }
  }, {
    key: "enableModal",
    value: function enableModal() {
      var _ = this,
          _$modalObj2 = _.modalObj,
          $backdrop = _$modalObj2.$backdrop,
          $closeBtn = _$modalObj2.$closeBtn,
          $content = _$modalObj2.$content,
          $modal = _$modalObj2.$modal,
          _$params2 = _.params,
          appendTo = _$params2.appendTo,
          backDropClose = _$params2.backDropClose,
          cssPrefix = _$params2.cssPrefix,
          fromDOM = _$params2.fromDOM,
          onOpen = _$params2.onOpen,
          onOpenOnce = _$params2.onOpenOnce;

      _.enabledElem = document.activeElement;

      if (fromDOM) {
        $content.after($('<span/>').attr({
          "class": cssPrefix + '-content-placemarker',
          id: _.modalObj.id + '_marker'
        }));
      }

      if (!_.modalObj.contentAppended) {
        _.modalObj.$dialogContent.append($content);

        $.extend(_.modalObj, {
          contentAppended: true
        });
      }

      $(appendTo).append($modal); // attach events after appended to DOM

      $closeBtn.on("click.".concat(_.modalEvent, "Dismiss"), function () {
        return _.disableModal();
      });
      if (backDropClose) $backdrop.on("click.".concat(_.modalEvent, "Dismiss"), function () {
        return _.disableModal();
      });
      hasCb(onOpen, _.modalObj);

      if (!_.openedOnce) {
        hasCb(onOpenOnce, _.modalObj);
        _.openedOnce = true;
      }

      $modal.attr({
        role: 'dialog',
        'aria-modal': 'true'
      });
      setTimeout(function () {
        $modal.addClass(cssPrefix + '--show');
        _.trappedFocus = (0,_util_trap_focus__WEBPACK_IMPORTED_MODULE_1__.default)($modal, {
          nameSpace: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_4__.camelCase)(_.modalID)
        });
        $.extend(_.modalObj, {
          show: true
        });
      }, _util_constants__WEBPACK_IMPORTED_MODULE_3__.CSS_TRANSISTION_DELAY);
      $(document.body).addClass(cssPrefix + '-open').css({
        overflow: 'hidden',
        'padding-right': '0px'
      });
      (0,_util_plugin_update_history_state__WEBPACK_IMPORTED_MODULE_6__.default)(_, _.modalID);
    }
  }, {
    key: "disableModal",
    value: function disableModal() {
      var _ = this,
          _$modalObj3 = _.modalObj,
          $backdrop = _$modalObj3.$backdrop,
          $closeBtn = _$modalObj3.$closeBtn,
          $content = _$modalObj3.$content,
          $modal = _$modalObj3.$modal,
          _$params3 = _.params,
          afterClose = _$params3.afterClose,
          backDropClose = _$params3.backDropClose,
          cssPrefix = _$params3.cssPrefix,
          closeOutDelay = _$params3.closeOutDelay,
          fromDOM = _$params3.fromDOM,
          onClose = _$params3.onClose;

      hasCb(onClose, _.modalObj);
      $modal.addClass(cssPrefix + '--dismissing');
      $modal.removeClass(cssPrefix + '--show'); // detach events

      $closeBtn.off("click.".concat(_.modalEvent, "Dismiss"));
      if (backDropClose) $backdrop.off("click.".concat(_.modalEvent, "Dismiss"));
      $(document).off("keydown.".concat(_.modalEvent, "Dismiss")).off("".concat(_.modalEvent, "Dismiss"));
      (0,_util_plugin_update_history_state__WEBPACK_IMPORTED_MODULE_6__.default)(_, _.modalID, true);
      setTimeout(function () {
        $modal.attr({
          role: 'dialog',
          'aria-modal': ''
        }).removeClass(cssPrefix + '--dismissing').css({
          display: ''
        });
        $(document.body).removeClass(cssPrefix + '-open').css({
          overflow: '',
          'padding-right': ''
        });

        _.trappedFocus.remove();

        _.enabledElem.focus();

        if (fromDOM) {
          $('#' + _.modalObj.id + '_marker').after($content).remove();
          $.extend(_.modalObj, {
            contentAppended: false
          });
        }

        hasCb(afterClose, _.modalObj);
        $modal.remove();
        $.extend(_.modalObj, {
          show: false
        });
      }, _util_constants__WEBPACK_IMPORTED_MODULE_3__.CSS_TRANSISTION_DELAY + closeOutDelay);
    }
  }, {
    key: "loadLocationHash",
    value: function loadLocationHash() {
      var _ = this;

      var _$params4 = _.params,
          useLocationHash = _$params4.useLocationHash,
          loadLocationHash = _$params4.loadLocationHash,
          useHashFilter = _$params4.useHashFilter;

      var loadIfHashMatches = function loadIfHashMatches() {
        if (useLocationHash || loadLocationHash) {
          var hash = (0,_util_get_param__WEBPACK_IMPORTED_MODULE_7__.getHashParam)(useHashFilter) || location.hash.replace(/#/g, '');

          if (useHashFilter && _.modalObj.id === hash) {
            _.modalObj.show ? _.disableModal() : _.setDisplayAndEvents();
          }
        }
      };

      loadIfHashMatches();
      $(window).on("popstate.".concat(_.modalEvent, " ").concat(_.modalEvent), function (e) {
        if (_.params.historyType === 'push') {
          loadIfHashMatches();
          e.preventDefault();
        }
      });
    }
  }]);

  return Modal;
}();


Modal.defaults = DEFAULTS;
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});