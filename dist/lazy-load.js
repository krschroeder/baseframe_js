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

/***/ 134:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isVisible": function() { return /* binding */ isVisible; }
/* harmony export */ });
/* unused harmony exports default, IE_Event, isHidden, kebabCase, camelCase, isMobileOS */
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
/* harmony export */   "default": function() { return /* binding */ LazyLoad; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(225);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(134);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var ieScript = document.createElement('script');
var isIE = /MSIE \d|Trident.*rv:/.test(navigator.userAgent);
var VERSION = '1.0.0';
var DATA_NAME = 'LazyLoad';
var isLoaded = false;
var scriptAppended = false;
var lazyElemObservers = new Map();

var _lazyElemObserver = function _lazyElemObserver(_) {
  var observerOpts = _.params.observerOpts;
  return new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var _$params = _.params,
          inEvt = _$params.inEvt,
          outEvt = _$params.outEvt,
          force = _$params.force,
          unobserve = _$params.unobserve,
          loadImgs = _$params.loadImgs;
      var lazyElem = entry.target;

      if (entry.isIntersecting && (0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.isVisible)(lazyElem) || force) {
        loadImgs && _.imgAndBg(_, lazyElem);
        typeof inEvt === 'function' && inEvt(lazyElem);
        unobserve && _.lazyElemObserver.unobserve(lazyElem);
      } else {
        typeof outEvt === 'function' && outEvt(lazyElem);
      }
    });
  }, observerOpts);
};

var LazyLoad = /*#__PURE__*/function () {
  _createClass(LazyLoad, null, [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"));
        var params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_params"));
        lazyElemObservers["delete"](params.observerID);
        instance.lazyElemObserver.unobserve(this);
        (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_params"), null, true);
        (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"), null, true);
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
  }, {
    key: "defaults",
    get: function get() {
      return {
        imgSrcName: 'src',
        bgSrcName: 'bgSrc',
        loadImgs: true,
        inEvt: null,
        outEvt: null,
        force: false,
        polyfillSrc: 'https://polyfill.io/v3/polyfill.js?features=IntersectionObserver',
        observerID: null,
        unobserve: true,
        observerOpts: {
          rootMargin: '48px'
        },
        isIE: isIE
      };
    }
  }]);

  function LazyLoad(element, options) {
    _classCallCheck(this, LazyLoad);

    var _ = this;

    _.element = element;
    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_2__.default)($(element).data(DATA_NAME + '-options'));
    (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, LazyLoad.defaults, options, dataOptions));
    _.lazyElemObserver = null;
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"));

    _.lazyLoad();

    return this;
  }

  _createClass(LazyLoad, [{
    key: "lazyLoad",
    value: function lazyLoad() {
      var _ = this;

      if (isIE && !isLoaded) {
        if (!scriptAppended) {
          ieScript.src = _.params.polyfillSrc;
          document.body.appendChild(ieScript);
          scriptAppended = true;
        }

        ieScript.addEventListener('load', function () {
          _.lazyLoadInner();

          isLoaded = true;
        });
      } else {
        _.lazyLoadInner();
      }
    }
  }, {
    key: "imgAndBg",
    value: function imgAndBg(_, lazyElem) {
      var _$params2 = _.params,
          imgSrcName = _$params2.imgSrcName,
          bgSrcName = _$params2.bgSrcName;
      var src = lazyElem.dataset[imgSrcName];
      var bgImg = lazyElem.dataset[bgSrcName];

      if (lazyElem.loading === 'lazy') {
        lazyElem.loading = 'eager';
      }

      if (src) {
        lazyElem.src = src;
      }

      if (bgImg) {
        lazyElem.style.backgroundImage = "url(\"".concat(bgImg, "\")");
        lazyElem.removeAttribute('data-bg-src');
      }
    }
  }, {
    key: "lazyLoadInner",
    value: function lazyLoadInner() {
      var _ = this;

      var observerID = _.params.observerID;

      if (window.IntersectionObserver) {
        if (observerID && !lazyElemObservers.has(observerID)) {
          lazyElemObservers.set(observerID, _lazyElemObserver(_));
          _.lazyElemObserver = lazyElemObservers.get(observerID);
        } else {
          _.lazyElemObserver = _lazyElemObserver(_);
        }

        if (!observerID) {
          console.warn("It recommended to set an 'observerID', so the element group can leverage the same one.", _.element);
        }

        _.lazyElemObserver.observe(_.element[0]);
      } else {
        console.warn("You're window doesn't contain the \"IntersectionObserver\" property, please use a polyfill");
      }
    }
  }]);

  return LazyLoad;
}();


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});