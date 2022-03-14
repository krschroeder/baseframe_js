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
/* unused harmony exports KEYS, photoRegex */
var KEYS = {
  ESC: 'Escape',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown'
};
var photoRegex = /\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$|(\?|&|&amp;)(image|ext\=\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg))?$/i;
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

/***/ 35:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/* harmony export */   "default": function() { return /* binding */ Collapse; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(225);
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(180);
/* harmony import */ var _util_smooth_scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(35);
/* harmony import */ var _util_get_param__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(534);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(814);
/* harmony import */ var _util_plugin_update_history_state_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(683);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var VERSION = "2.2.0";
var DATA_NAME = 'Collapse';
var EVENT_NAME = 'collapse';

var Collapse = /*#__PURE__*/function () {
  _createClass(Collapse, null, [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_instance"));
        $(instance.onElem).off("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME));
        $(window).off("popstate.".concat(EVENT_NAME));
        (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_params"), null, true);
        (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_instance"), null, true);
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
        elemsItem: '.collapse__item',
        elemsBtn: '.collapse__btn',
        elemsBody: '.collapse__body',
        openCss: 'collapse--open',
        togglingCss: 'collapse--toggling',
        openingCss: 'collapse--opening',
        closingCss: 'collapse--closing',
        openNoAnimateCss: 'collapse--no-animate',
        toggleClickBindOn: 'group',
        toggleDuration: 500,
        toggleGroup: false,
        moveToTopOnOpen: false,
        moveToTopOffset: 0,
        scrollSpeed: 100,
        useHashFilter: null,
        useLocationHash: true,
        historyType: 'replace',
        loadLocationHash: true,
        afterOpen: function afterOpen() {},
        afterClose: function afterClose() {},
        afterInit: function afterInit() {}
      };
    }
  }]);

  function Collapse(element, options, index) {
    _classCallCheck(this, Collapse);

    var _ = this;

    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_2__.default)($(element).data(EVENT_NAME + '-options'));
    _.element = element;
    _.onElem = element;
    _.index = index;
    (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, Collapse.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, "".concat(DATA_NAME, "_params"));
    _.toggling = false;
    _.prevID = '#';
    _.initiallyLoaded = false;

    _.init();

    return this;
  }

  _createClass(Collapse, [{
    key: "init",
    value: function init() {
      var _ = this;

      _.collapseBodyNoID();

      _.setDisplay();

      _.loadContentFromHash();

      _.collapseEvents();

      _.params.afterInit(_.element);

      setTimeout(function () {
        _.initiallyLoaded = true;
      }, 1000);
    }
  }, {
    key: "setDisplay",
    value: function setDisplay() {
      var _ = this;

      $(_.element).find(_.params.elemsBody).each(function () {
        if ($(this).hasClass(_.params.openCss)) {
          var collapseID = "#".concat($(this).attr('id'));
          var btnElems = "[data-href=\"".concat(collapseID, "\"],a[href=\"").concat(collapseID, "\"]");
          $('body').find(btnElems).addClass(_.params.openCss).attr('aria-expanded', true);
        }
      });
    }
  }, {
    key: "collapseBodyNoID",
    value: function collapseBodyNoID() {
      var _ = this;

      $(_.element).find(_.params.elemsItem).each(function (index) {
        var $cBody = $(this).find(_.params.elemsBody);
        var $btn = $(this).find(_.params.elemsBtn);

        if (!!!$cBody.attr('id')) {
          var _$btn$attr;

          var btnContent = $btn.eq(0).text().slice(0, 20).trim().replace(/\s/g, '-');
          var id = "collapse_".concat(_.index, "-").concat(index, "-").concat(btnContent);
          $cBody.attr({
            'id': id
          });
          var hrefAttr = $btn[0].nodeName.toUpperCase() === 'BUTTON' ? 'data-href' : 'href';
          $btn.attr((_$btn$attr = {}, _defineProperty(_$btn$attr, hrefAttr, "#".concat(id)), _defineProperty(_$btn$attr, 'aria-controls', id), _$btn$attr));
        }

        $btn.attr({
          'aria-expanded': $btn.attr('aria-expanded') || false
        });
      });
    }
  }, {
    key: "collapseEvents",
    value: function collapseEvents() {
      var _ = this;

      _.onElem = _.params.toggleClickBindOn == 'group' ? _.element : //default to group anyway if the body isn't specified
      _.params.toggleClickBindOn == 'body' ? 'body' : 'group';
      $(_.onElem).on("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME), _.params.elemsBtn, function (e) {
        e.preventDefault();

        if (_.toggling) {
          return;
        }

        var $this = $(this);
        var collapseID = $this.attr('href') || $this.attr('data-href');

        _._toggleAction(collapseID);
      });
      $(window).on("popstate.".concat(EVENT_NAME), function (e) {
        if (_.params.historyType === 'push') {
          _.loadContentFromHash(false, false);

          e.preventDefault();
        }
      });
    }
  }, {
    key: "loadContentFromHash",
    value: function loadContentFromHash() {
      var noAnimation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var history = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var _ = this;

      var _$params = _.params,
          useLocationHash = _$params.useLocationHash,
          loadLocationHash = _$params.loadLocationHash,
          useHashFilter = _$params.useHashFilter,
          openCss = _$params.openCss;

      if (useLocationHash || loadLocationHash) {
        var hash = useHashFilter ? (0,_util_get_param__WEBPACK_IMPORTED_MODULE_3__.getHashParam)(useHashFilter) || '' : location.hash; //if there are multiples

        var hashes = hash.split('=');

        for (var i = 0, l = hashes.length; i < l; i++) {
          var elID = '#' + hashes[i].split('&')[0].replace(/#/g, '');

          _._toggleAction(elID, noAnimation, history);
        } // if it's the last tab, then the 
        // location hash will not exist on the element
        // so just look for an open one


        if (_.prevID !== '#' && _.initiallyLoaded) {
          var $prevTab = $(_.element).find(_.prevID);

          if ($prevTab.length) {
            var isOpen = $prevTab.hasClass(openCss);

            if (isOpen) {
              _._toggleAction(_.prevID, false, history);
            }
          }
        }
      }
    }
  }, {
    key: "_toggleAction",
    value: function _toggleAction(collapseID) {
      var noAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var history = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var _ = this;

      if (collapseID === '#') return;
      var $collapsibleItem = $(_.element).find(collapseID);
      var _$params2 = _.params,
          openCss = _$params2.openCss,
          openNoAnimateCss = _$params2.openNoAnimateCss,
          togglingCss = _$params2.togglingCss,
          toggleGroup = _$params2.toggleGroup,
          useHashFilter = _$params2.useHashFilter;

      if (!$collapsibleItem.length) {
        return;
      }

      var close = $collapsibleItem.hasClass(openCss);
      var btnElems = "[data-href=\"".concat(collapseID, "\"],a[href=\"").concat(collapseID, "\"]");
      var $btnElems = $(_.onElem).find(btnElems);
      $collapsibleItem.addClass(noAnimation ? openCss + " " + openNoAnimateCss : togglingCss);
      $btnElems.addClass(togglingCss);

      if (toggleGroup) {
        _._toggleGroup($btnElems, $collapsibleItem);
      }

      if (close) {
        _._closeItem($btnElems, $collapsibleItem);
      } else {
        _._openItem($btnElems, $collapsibleItem);
      }

      history && (0,_util_plugin_update_history_state_js__WEBPACK_IMPORTED_MODULE_4__.default)(_, collapseID.substring(1), close, _.prevID.substring(1));
      _.prevID = collapseID;
    }
  }, {
    key: "_toggleGroup",
    value: function _toggleGroup($btnElems, $clickedItem) {
      var _ = this;

      $(_.onElem).find(_.params.elemsBody).not($clickedItem).each(function () {
        if ($(this).hasClass(_.params.openCss)) {
          var $this = $(this);

          _._closeItem($btnElems, $this);
        }
      });
    }
  }, {
    key: "_closeItem",
    value: function _closeItem($btnElems, $collapsibleItem) {
      var _this = this;

      var _ = this;

      _.toggling = true;
      $collapsibleItem.addClass("".concat(_.params.togglingCss, " ").concat(_.params.closingCss)).css({
        height: $collapsibleItem.height()
      });
      setTimeout(function () {
        $collapsibleItem.css({
          height: '0px'
        });
      }, _util_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_TRANSISTION_DELAY);
      setTimeout(function () {
        var rmClasses = "".concat(_.params.openCss, " ").concat(_.params.togglingCss, " ").concat(_.params.closingCss);
        $collapsibleItem.removeClass(rmClasses).css({
          height: ''
        });
        $btnElems.removeClass(rmClasses).attr('aria-expanded', false);

        _.params.afterClose(_this);

        _.toggling = false;
      }, _.params.toggleDuration + _util_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_TRANSISTION_DELAY);
    }
  }, {
    key: "_openItem",
    value: function _openItem($btnElems, $collapsibleItem) {
      var _this2 = this;

      var _ = this;

      _.toggling = true;
      $collapsibleItem.addClass("".concat(_.params.togglingCss, " ").concat(_.params.openingCss));
      var height = $collapsibleItem.height();
      $collapsibleItem.css({
        height: '0px'
      });
      setTimeout(function () {
        $collapsibleItem.css({
          height: height
        });
      }, _util_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_TRANSISTION_DELAY);
      setTimeout(function () {
        var rmClasses = "".concat(_.params.togglingCss, " ").concat(_.params.openingCss, " ").concat(_.params.openNoAnimateCss);
        $collapsibleItem.addClass("".concat(_.params.openCss));
        $collapsibleItem.removeClass(rmClasses).css({
          height: ''
        });
        $btnElems.addClass(_.params.openCss).removeClass(rmClasses).attr('aria-expanded', true);

        _.params.afterOpen(_this2);

        if (_.params.moveToTopOnOpen) {
          _._moveToTopOnOpen($collapsibleItem);
        }

        _.toggling = false;
      }, _.params.toggleDuration + _util_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_TRANSISTION_DELAY);
    }
  }, {
    key: "_moveToTopOnOpen",
    value: function _moveToTopOnOpen($collapsibleItem) {
      var _ = this;

      var $item = $collapsibleItem.parent(_.params.elemsItem) || $collapsibleItem;
      if (!$item.length) return;
      var elemOffsetTop = $item.offset().top;
      var top = elemOffsetTop - _.params.moveToTopOffset;
      (0,_util_smooth_scroll__WEBPACK_IMPORTED_MODULE_5__.default)(top, _.params.scrollSpeed);
    }
  }]);

  return Collapse;
}();


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});