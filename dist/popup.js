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
/* harmony export */   "KEYS": function() { return /* binding */ KEYS; },
/* harmony export */   "PHOTO_RGX": function() { return /* binding */ PHOTO_RGX; },
/* harmony export */   "CSS_TRANSISTION_DELAY": function() { return /* binding */ CSS_TRANSISTION_DELAY; }
/* harmony export */ });
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
/* harmony export */   "isVisible": function() { return /* binding */ isVisible; },
/* harmony export */   "camelCase": function() { return /* binding */ camelCase; }
/* harmony export */ });
/* unused harmony exports default, IE_Event, isHidden, kebabCase, isMobileOS */
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
  var _$$extend = $.extend(defaultProps, props),
      focusFirst = _$$extend.focusFirst,
      focusable = _$$extend.focusable,
      nameSpace = _$$extend.nameSpace;

  var $trapElem = $(modalEl);
  var firstFocusable = null;
  $(document.body).on("keydown.".concat(nameSpace), function (e) {
    var focusableJoined = typeof focusable === 'string' ? focusable : focusable.join(',');
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
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });

  if (focusFirst && firstFocusable) {
    firstFocusable.focus();
  }

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
/* harmony export */   "default": function() { return /* binding */ Popup; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(225);
/* harmony import */ var _util_guid_generate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(994);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(134);
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(180);
/* harmony import */ var _util_get_param__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(534);
/* harmony import */ var _util_plugin_update_history_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(683);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(814);
/* harmony import */ var _util_trap_focus_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(505);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }











var VERSION = "1.4.0";
var DATA_NAME = 'Popup';
var EVENT_NAME = 'popup';
var INSTANCE_NAME = "".concat(DATA_NAME, "_instance");

var getPopupSrc = function getPopupSrc($elem) {
  return $elem.data('popup-src') || $elem.attr('href') || null;
};

var getTitleSrc = function getTitleSrc($elem) {
  return $elem.data('popup-title') || $elem.attr('title') || '';
};

var Popup = /*#__PURE__*/function () {
  _createClass(Popup, null, [{
    key: "version",
    get: function get() {
      return VERSION;
    }
  }, {
    key: "pluginName",
    get: function get() {
      return DATA_NAME;
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        popupID: null,
        src: null,
        title: null,
        caption: null,
        popupOuterClass: "",
        titleElem: 'h3',
        titleCss: '',
        clickOutsideClose: true,
        fadeOut: 500,
        fadeIn: 400,
        zIndex: 2000,
        vhDivisor: 2,
        firstAnchorFocus: true,
        setTopPosition: null,
        isImage: false,
        isJsArray: false,
        escapeClose: true,
        group: true,
        showGroupAmount: false,
        groupOfHTML: '/',
        launch: false,
        photoRegex: _util_constants__WEBPACK_IMPORTED_MODULE_1__.PHOTO_RGX,
        closeText: "<i class=\"icon-close\"><span class=\"sr-only\">Close</span></i>",
        prevBtnHTML: "<i class=\"icon-arrow-l\"><span class=\"sr-only\">Previous</span></i>",
        nextBtnHTML: "<i class=\"icon-arrow-r\"><span class=\"sr-only\">Next</span></i>",
        loadingHTML: "<div class=\"popup__loader\"></div>",
        appendPopupTo: 'body',
        showPopup: 'popup--show-popup',
        enableEvent: 'click',
        useHashFilter: null,
        loadLocationHash: true,
        useLocationHash: true,
        historyType: 'replace',
        trapPopupFocus: true,
        afterLoaded: function afterLoaded() {},
        afterClose: function afterClose() {},
        onClose: function onClose() {}
      };
    }
  }]);

  function Popup(element, options, index) {
    _classCallCheck(this, Popup);

    var _ = this;

    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_4__.default)($(element).data(EVENT_NAME + '-options'));
    var popupID = 'popup_' + (0,_util_guid_generate_js__WEBPACK_IMPORTED_MODULE_0__.default)();
    var src = getPopupSrc($(element));
    var caption = $(element).data('popup-caption') || '';
    var title = getTitleSrc($(element));
    var instanceDefaults = {
      popupID: popupID,
      src: src,
      caption: caption,
      title: title
    };
    _.$element = $(element);
    (0,_util_store__WEBPACK_IMPORTED_MODULE_2__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, Popup.defaults, instanceDefaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_2__.elData)(element, "".concat(DATA_NAME, "_params"));

    if (_.params.useLocationHash && popupID === _.params.popupID) {
      console.warn('If loading from a location hash please make sure to specify an ID not auto generated. This won\'t work should the page get reloaded.');
    } //Content


    _.$popup = null;
    _.elemGrabbedLocation = $('<span/>').attr({
      id: 'popup_content_loc_orig_' + popupID
    });
    _.contentFromDOM = false;
    _.currentElem = null;
    _.currentSrc = null;
    _.$listElems = _.params.isJsArray ? _.params.src : null;
    _.groupAmountElem = null; //click elem

    _.$domClickElem = null;
    _.domElemClicked = false;
    _.popupEventName = EVENT_NAME + _.params.popupID; //for groups

    _.groupCount = 0;
    _.groupIndex = 0; //location hash  

    _.isOpen = false;
    _.isOpenHash = '';
    _.historyID = '#' + _.params.popupID + (index === 0 ? '' : '_' + index);
    _.loadedFromHash = false; // trapping focus

    _.trappedFocus = null;

    _.initLoadEvents();

    return this;
  }

  _createClass(Popup, [{
    key: "initLoadEvents",
    value: function initLoadEvents() {
      var _ = this;

      var _$params = _.params,
          launch = _$params.launch,
          useHashFilter = _$params.useHashFilter,
          loadLocationHash = _$params.loadLocationHash;

      _.$element.on("".concat(_.params.enableEvent, ".").concat(_.popupEventName, " ").concat(_.popupEventName), function (e) {
        e.preventDefault();
        (0,_util_plugin_update_history_state__WEBPACK_IMPORTED_MODULE_5__.default)(_, _.historyID.substring(1));
        _.isOpen ? _.close() : _.loadPopup(this);
      });

      $(window).on("popstate.".concat(_.popupEventName, " ").concat(_.popupEventName), function (e) {
        var _$params2 = _.params,
            useLocationHash = _$params2.useLocationHash,
            useHashFilter = _$params2.useHashFilter;

        if (useLocationHash && _.params.historyType === 'push') {
          if (_.historyID === _.isOpenHash || _.historyID === (useHashFilter ? (0,_util_get_param__WEBPACK_IMPORTED_MODULE_6__.getHashParam)(useHashFilter) : location.hash)) {
            _.isOpen ? _.close() : _.loadPopup(_.$element);
          }
        }

        e.preventDefault();
      });

      if (launch) {
        _.loadPopup(document.activeElement);
      }

      if (loadLocationHash && _.historyID === (useHashFilter ? '#' + (0,_util_get_param__WEBPACK_IMPORTED_MODULE_6__.getHashParam)(useHashFilter) : location.hash)) {
        _.loadPopup(_.$element);

        _.loadedFromHash = true;
      }
    }
  }, {
    key: "loadPopup",
    value: function loadPopup() {
      var clickElem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var _ = this;

      var _$params3 = _.params,
          escapeClose = _$params3.escapeClose,
          useHashFilter = _$params3.useHashFilter;

      if (clickElem) {
        _.$domClickElem = $(clickElem);
        _.domElemClicked = true;
      }

      _.isOpenHash = useHashFilter ? (0,_util_get_param__WEBPACK_IMPORTED_MODULE_6__.getHashParam)(useHashFilter) : location.hash;

      _.addToDOM();

      _.closeHandlers();

      if (escapeClose) {
        _.escapeClose();
      }

      _.isOpen = true;
    }
  }, {
    key: "addToDOM",
    value: function addToDOM() {
      var _ = this;

      var _$params4 = _.params,
          fadeIn = _$params4.fadeIn,
          appendPopupTo = _$params4.appendPopupTo,
          firstAnchorFocus = _$params4.firstAnchorFocus,
          trapPopupFocus = _$params4.trapPopupFocus;

      _.createPopup();

      $(appendPopupTo).append(_.$popup);

      if (firstAnchorFocus) {
        setTimeout(function () {
          var $firstAnchor = _.$popup.find('button, a, input, select, textarea, [tabindex]').filter(function (i, el) {
            return (0,_util_helpers__WEBPACK_IMPORTED_MODULE_7__.isVisible)(el) && el.tabIndex !== -1;
          }).eq(0);

          $firstAnchor.length ? $firstAnchor[0].focus() : _.$popup.find('.popup__btn-close')[0].focus();
        }, fadeIn + 100);
      }

      if (trapPopupFocus) {
        setTimeout(function () {
          _.trappedFocus = (0,_util_trap_focus_js__WEBPACK_IMPORTED_MODULE_3__.default)(_.$popup, {
            nameSpace: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_7__.camelCase)(_.params.popupID)
          });
        }, fadeIn + 100);
      }

      _.animationIn();
    }
  }, {
    key: "determineContent",
    value: function determineContent() {
      var _ = this;

      var _$params5 = _.params,
          isJsArray = _$params5.isJsArray,
          group = _$params5.group; //if grabbed content from before

      _.placeContentBack(); //testing to see if its simple a class or ID selector


      var domElemRgx = /^(\#|\.)/;
      var currentElem,
          src,
          title,
          caption = '',
          isDomSelector = false;

      if (isJsArray) {
        currentElem = _.$listElems[_.groupIndex];
        src = currentElem.src;
        title = currentElem.title || '';
        caption = currentElem.caption || '';
        _.groupCount = _.$listElems.length;
      } else {
        _.$listElems = $(typeof group === 'string' ? group : _.params.src);

        if (_.domElemClicked) {
          for (var i = 0, l = _.$listElems.length; i < l; i++) {
            if (_.$listElems[i].isSameNode(_.$domClickElem[0])) {
              _.groupIndex = i;
              break;
            }
          }

          _.domElemClicked = false;
        }

        currentElem = _.$listElems.eq(_.groupIndex);
        src = getPopupSrc(currentElem);

        if (!src) {
          src = currentElem;
          isDomSelector = true;
        } else {
          isDomSelector = domElemRgx.test(src);
        }

        _.groupCount = _.$listElems.length;
        title = getTitleSrc(currentElem);
        caption = currentElem.data('popup-caption');
      }

      _.currentElem = currentElem;
      _.currentSrc = src;
      _.contentFromDOM = isDomSelector && !isJsArray || !isJsArray && _typeof(src) === 'object';
      _.params.title = title;
      _.params.caption = caption;
      if (_.contentFromDOM) $(src).after(_.elemGrabbedLocation);
    }
  }, {
    key: "placeContent",
    value: function placeContent() {
      var _ = this;

      var _$params6 = _.params,
          caption = _$params6.caption,
          isJsArray = _$params6.isJsArray,
          titleElem = _$params6.titleElem,
          titleCss = _$params6.titleCss,
          title = _$params6.title,
          showGroupAmount = _$params6.showGroupAmount,
          loadingHTML = _$params6.loadingHTML,
          isImage = _$params6.isImage;
      var currentElem = _.currentElem;
      var src = _.currentSrc;

      var $popupContentBody = _.$popup.find(".popup__content-body");

      var isImg = isImage || _.params.photoRegex.test(src) || (!isJsArray ? currentElem.data('popup-type') === "image" : currentElem.nodeName === 'img');

      _.$popup.find(".popup__title").html(title ? "<".concat(titleElem, " class=\"").concat(titleCss, "\">").concat(title, "</").concat(titleElem, ">") : '');

      _.$popup.find(".popup__caption").html(caption); //wipe the current body contents


      $popupContentBody.html("");

      if (isImg) {
        var imgNode = new Image();
        var $loader = $('<div/>').attr({
          "class": 'popup__loader-outer'
        }).html(loadingHTML);
        imgNode.src = src;
        imgNode.alt = title || "";

        if (!imgNode.complete) {
          imgNode.style.opacity = "0";
          $popupContentBody.append($loader);
        }

        $popupContentBody.append(imgNode);
        var $imgNode = $(imgNode);
        $imgNode.on("load.".concat(EVENT_NAME), function () {
          $loader.remove();
          $imgNode.removeAttr("style");
          $popupContentBody.css({
            'min-height': $imgNode.height()
          });
        });
      } else {
        $popupContentBody.append($(src)).css({
          'min-height': '0px'
        });
      }

      if (showGroupAmount) {
        _.groupAmountElem.html("<span>".concat(_.groupIndex + 1, "</span> \n\t\t\t\t<span class=\"popup__group-divisor\">").concat(_.params.groupOfHTML, "</span> \n\t\t\t\t<span>").concat(_.groupCount, "</span>"));
      }
    }
  }, {
    key: "createPopup",
    value: function createPopup() {
      var _ = this;

      var _$params7 = _.params,
          caption = _$params7.caption,
          closeText = _$params7.closeText,
          group = _$params7.group,
          groupOfHTML = _$params7.groupOfHTML,
          prevBtnHTML = _$params7.prevBtnHTML,
          nextBtnHTML = _$params7.nextBtnHTML,
          popupID = _$params7.popupID,
          popupOuterClass = _$params7.popupOuterClass,
          showGroupAmount = _$params7.showGroupAmount,
          title = _$params7.title,
          titleElem = _$params7.titleElem,
          zIndex = _$params7.zIndex;

      _.determineContent();

      var $groupControls = null;

      if (_.groupCount > 1 && (typeof group === 'string' || group)) {
        var btnPrev = $("<button>").attr({
          type: "button",
          "class": "btn--popup btn--popup-prev"
        }).append(prevBtnHTML),
            btnNext = $("<button>").attr({
          type: "button",
          "class": "btn--popup btn--popup-next"
        }).append(nextBtnHTML);
        $groupControls = $("<div/>").attr({
          "class": "popup__controls"
        }).append(btnPrev, btnNext);
      }

      if (showGroupAmount) {
        _.groupAmountElem = $('<div/>').attr({
          "class": 'popup__group-count'
        });

        _.groupAmountElem.html("".concat(_.groupIndex + 1, " ").concat(groupOfHTML, " ").concat(_.groupCount));
      } else {
        _.groupAmountElem = null;
      }

      var $title = $("<div id=\"".concat(popupID, "-title\" class=\"popup__title\"><").concat(titleElem, ">").concat(title, "</").concat(titleElem, "></div>")),
          $caption = $("<div id=\"".concat(popupID, "-caption\" class=\"popup__caption\">").concat(caption, "</div>")),
          $overlay = $('<div/>').attr({
        "class": 'popup__overlay'
      }),
          $src = $('<div/>').attr({
        "class": 'popup__content'
      }),
          $body = $('<div/>').attr({
        "class": 'popup__content-body'
      }),
          $closeBtn = closeText ? $("<button/>").attr({
        "class": "popup__btn-close",
        type: "button"
      }).html(closeText) : '',
          $srcAll = $src.append($closeBtn, $title, $body, $caption, $groupControls, _.groupAmountElem),
          $popupStructure = $('<div/>').attr({
        "class": "popup ".concat(popupOuterClass),
        id: popupID,
        role: 'dialog',
        tabindex: '-1',
        'aria-labelledby': popupID + "-title",
        style: "z-index: ".concat(zIndex)
      }).append($overlay, $srcAll);
      _.$popup = $popupStructure;

      _.placeContent();

      _.groupControls();

      _.params.afterLoaded(_.$element, popupID);
    }
  }, {
    key: "toggleGroup",
    value: function toggleGroup(prevCond, nextCond) {
      var _ = this;

      var ct = _.groupCount - 1;
      var cr = _.groupIndex;

      if (nextCond) {
        cr = cr === ct ? cr = 0 : cr += 1;
      }

      if (prevCond) {
        cr = cr === 0 ? cr = ct : cr -= 1;
      }

      _.groupIndex = cr;

      _.determineContent();

      _.placeContent();
    }
  }, {
    key: "groupControls",
    value: function groupControls() {
      var _ = this;

      if (_.groupCount > 1) {
        $(document).on("keydown.".concat(_.popupEventName, "groupcontrols"), function (e) {
          var ev = e || window.event;
          var key = ev.key;

          if (key == _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.LEFT || key == _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.RIGHT) {
            _.toggleGroup(key == _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.LEFT, key == _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.RIGHT);
          }
        });

        _.$popup.on("click.".concat(_.popupEventName), '.btn--popup-prev', function () {
          _.toggleGroup(true, false);
        }).on("click.".concat(_.popupEventName), '.btn--popup-next', function () {
          _.toggleGroup(false, true);
        });
      }
    }
  }, {
    key: "animationIn",
    value: function animationIn() {
      var _ = this;

      var _$params8 = _.params,
          vhDivisor = _$params8.vhDivisor,
          setTopPosition = _$params8.setTopPosition,
          fadeIn = _$params8.fadeIn,
          showPopup = _$params8.showPopup;
      var $popup = _.$popup; //set setTopPosition then use that, else use the default options which set in the middle

      var times = vhDivisor === 0 ? 0 : $(window).height() / vhDivisor;
      var topPos = setTopPosition || setTopPosition === 0 ? typeof setTopPosition === 'function' ? setTopPosition() : setTopPosition : Math.max(0, times + document.querySelector('html').scrollTop);
      var $popupContent = $popup.find('.popup__content');
      $popup.css({
        display: ''
      });
      $popupContent.css({
        position: 'absolute',
        top: topPos
      }); //hide the overflow on the body until we stahp the animationIn in

      $('body').css({
        'overflow-x': 'hidden'
      });
      setTimeout(function () {
        _.$popup.addClass(showPopup);

        $popupContent.addClass(showPopup);
      }, _util_constants__WEBPACK_IMPORTED_MODULE_1__.CSS_TRANSISTION_DELAY);
      setTimeout(function () {
        //remove after the fade-in
        $('body').css({
          'overflow-x': ''
        });
      }, fadeIn);
    }
  }, {
    key: "closeHandlers",
    value: function closeHandlers() {
      var _ = this;

      var closeElems = _.params.clickOutsideClose ? '.popup__overlay,.popup__btn-close' : '.popup__btn-close';

      _.$popup.on("click.".concat(_.popupEventName), closeElems, function (e) {
        e.preventDefault();

        _.closeEvent();
      });
    }
  }, {
    key: "escapeClose",
    value: function escapeClose() {
      var _ = this;

      $(document).on("keydown.".concat(_.popupEventName), function (ev) {
        var e = ev || window.event;
        var key = e.key;

        if (key === _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.ESC) {
          _.closeEvent();
        }
      });
    }
  }, {
    key: "closeEvent",
    value: function closeEvent() {
      var _ = this;

      (0,_util_plugin_update_history_state__WEBPACK_IMPORTED_MODULE_5__.default)(_, _.historyID.substring(1), true);

      _.close();
    }
  }, {
    key: "close",
    value: function close() {
      var refocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var _ = this;

      var _$params9 = _.params,
          showPopup = _$params9.showPopup,
          fadeOut = _$params9.fadeOut,
          trapPopupFocus = _$params9.trapPopupFocus;
      var popupID = '#' + _.params.popupID;

      _.$popup.removeClass(showPopup);

      _.params.onClose(_.$element, popupID); //detach


      $(document).off("keydown.".concat(_.popupEventName));
      $(document).off("keydown.".concat(_.popupEventName, "groupcontrols"));

      if (trapPopupFocus && _.trappedFocus) {
        _.trappedFocus.remove();

        _.trappedFocus = null;
      }

      setTimeout(function () {
        _.params.afterClose(_.$element, popupID);

        _.isOpen = false;

        _.placeContentBack();

        $(popupID).remove();

        if (refocus) {
          $(_.$domClickElem)[0].focus();
        }

        _.isOpenHash = '';
      }, fadeOut + 1);
    }
  }, {
    key: "placeContentBack",
    value: function placeContentBack() {
      var _ = this;

      if (_.contentFromDOM) {
        $(_.elemGrabbedLocation).after($(_.currentSrc));

        _.elemGrabbedLocation.remove();

        _.contentFromDOM = false;
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      Popup.remove(this.element);
    }
  }], [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var params = (0,_util_store__WEBPACK_IMPORTED_MODULE_2__.elData)(this, "".concat(DATA_NAME, "_params"));
        (0,_util_store__WEBPACK_IMPORTED_MODULE_2__.elData)(this, INSTANCE_NAME, null, true);
        var popupEventName = EVENT_NAME + params.popupID;
        $(this).off("".concat(params.enableEvent, ".").concat(popupEventName));
        $(this).off("".concat(popupEventName));
        $(document).off("keydown.".concat(popupEventName, "groupcontrols"));
        $(document).off("keydown.".concat(popupEventName));
        (0,_util_store__WEBPACK_IMPORTED_MODULE_2__.elData)(this, "".concat(DATA_NAME, "_params"), null, true);
        (0,_util_store__WEBPACK_IMPORTED_MODULE_2__.elData)(this, "".concat(DATA_NAME, "_instance"), null, true);
      });
    }
  }, {
    key: "close",
    value: function close(element) {
      var refocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_2__.elData)(element, INSTANCE_NAME) || element;

      if (instance) {
        instance.close(refocus);
      }
    }
  }, {
    key: "show",
    value: function show(element) {
      var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_2__.elData)(element, INSTANCE_NAME);

      if (instance) {
        instance.loadPopup(element);
      }
    }
  }]);

  return Popup;
}();


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});