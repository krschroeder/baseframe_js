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

/***/ 534:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHashParam": function() { return /* binding */ getHashParam; }
/* harmony export */ });
/* unused harmony exports qsToObject, objectToQs */
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var qsToObject = function qsToObject() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : location.hash.substring(1);
  var params = {};
  var vars = str.split('&');

  for (var i = 0, l = vars.length; i < l; i++) {
    var pair = vars[i].split('=');
    var _key = pair[0];

    if (pair.length === 1) {
      $.extend(params, _defineProperty({}, _key, ''));
    } else if (pair.length === 2) {
      var val = decodeURIComponent(pair[1].replace(/\+/g, ' '));

      if (val === 'true') {
        val = true;
      } else if (val === 'false') {
        val = false;
      } else if (/^[\d]*$/.test(val)) {
        // if we're a number, 
        // shorthand notation (e.g.: 1e3 = 1000) lets just keep a string, 
        // so when it goes back into the URL its not changed
        val = parseFloat(val);
      }

      $.extend(params, _defineProperty({}, _key, val));
    } else if (pair.length > 2) {
      // multiple assignment = operators... which is a thing for the plugins
      var valMulti = pair.slice(1).map(function (val) {
        return decodeURIComponent(val.replace(/\+/g, ' '));
      }).join('=');
      $.extend(params, _defineProperty({}, _key, valMulti));
    }
  }

  return params;
};
var objectToQs = function objectToQs(qs) {
  var strArr = [];

  for (key in qs) {
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

/***/ 134:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getType; }
/* harmony export */ });
/* unused harmony exports IE_Event, isVisible, isHidden, kebabCase, camelCase, isMobileOS, photoRegex, CSS_TRANSISTION_DELAY */
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
  return el.offsetParent !== null || !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
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
}; // photo

var photoRegex = /\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$|(\?|&|&amp;)(image|ext\=\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg))?$/i;
var CSS_TRANSISTION_DELAY = 100;

/***/ }),

/***/ 282:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _get_param__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(534);


var getHistoryEntry = function getHistoryEntry(_, entry) {
  var useHashFilter = _.params.useHashFilter;
  var hash = window.location.hash;
  var historyEntry = entry;

  if (useHashFilter) {
    var newHash = "".concat(useHashFilter, "=").concat(entry);
    var foundHash = "".concat(useHashFilter, "=").concat((0,_get_param__WEBPACK_IMPORTED_MODULE_0__.getHashParam)(useHashFilter));
    historyEntry = hash !== "" ? hash.match(foundHash) ? hash.replace(foundHash, newHash) : "".concat(hash, "&").concat(newHash) : newHash;
  }

  if (historyEntry === "") historyEntry = "#";
  return '#' + historyEntry.replace(/#/g, '');
};

/* harmony default export */ __webpack_exports__["default"] = (getHistoryEntry);

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
/* harmony export */   "default": function() { return /* binding */ Tabs; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(225);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(134);
/* harmony import */ var _util_get_param__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(534);
/* harmony import */ var _util_plugin_get_history_entry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(282);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var VERSION = "1.0.3";
var DATA_NAME = 'Tabs';
var EVENT_NAME = 'tabs';
var DEFAULTS = {
  defaultContent: 0,
  tabsEvent: 'click',
  activeCss: 'tab--active',
  tabsBodyCss: 'tabs__body',
  tabsBodyItemCss: 'tabs__body-item',
  tabsBodyItemShowCss: 'tabs__body-item--show',
  tabsHeadCss: 'tabs__nav',
  useHashFilter: null,
  useLocationHash: true,
  loadLocationHash: true,
  addIDtoPanel: true,
  beforeChange: function beforeChange() {},
  afterChange: function afterChange() {},
  onInit: function onInit() {}
};

var Tabs = /*#__PURE__*/function () {
  _createClass(Tabs, null, [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_params"));
        var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"));
        instance.$tabsList.off("".concat(params.tabsEvent, ".").concat(EVENT_NAME, " ").concat(EVENT_NAME));
        $(window).off("hashchange.".concat(EVENT_NAME));
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
      return DEFAULTS;
    }
  }]);

  function Tabs(element, options, index) {
    _classCallCheck(this, Tabs);

    var _ = this;

    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_1__.default)($(element).data(DATA_NAME + '-options')); //state

    _.$element = $(element);
    (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend(Tabs.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"));
    _.$tabsList = _.$element.find(".".concat(_.params.tabsHeadCss, " ul")).first();
    _.$tabsBody = _.$element.find(".".concat(_.params.tabsBodyCss)).first();
    _.prevTabId = null; //init

    _.ADA_Attributes();

    _.tabsChangeEvent();

    _.changeTabElements(_.params.defaultContent);

    _.loadTabContent();

    $(window).on("hashchange.".concat(EVENT_NAME), function () {
      //inside so we can change this parameter
      //if we need too
      if (_.params.useLocationHash) {
        _.loadTabContent();
      }
    });

    _.params.onInit(_.prevTabId, _.$tabsList, _.$tabsBody);

    return this;
  }

  _createClass(Tabs, [{
    key: "ADA_Attributes",
    value: function ADA_Attributes() {
      var _ = this;

      var _$params = _.params,
          tabsBodyItemCss = _$params.tabsBodyItemCss,
          addIDtoPanel = _$params.addIDtoPanel;

      _.$tabsList.find("a").each(function () {
        var tabHref = $(this).attr('href').substr(1);

        var $tabBodyItem = _.$tabsBody.find(".".concat(tabsBodyItemCss, "[data-tab-id=\"").concat(tabHref, "\"]"));

        $(this).attr({
          'aria-selected': 'false',
          'role': 'tab',
          'aria-controls': tabHref
        });
        $tabBodyItem.attr({
          'aria-labelledby': tabHref,
          'role': 'tabpanel'
        });

        if (addIDtoPanel) {
          $tabBodyItem.attr({
            'id': tabHref
          });
        }
      });
    }
  }, {
    key: "tabsChangeEvent",
    value: function tabsChangeEvent() {
      var _ = this;

      _.$tabsList.on("".concat(_.params.tabsEvent, ".").concat(EVENT_NAME, " ").concat(EVENT_NAME), "a", function (e) {
        var href = $(this).attr('href');
        var isHashHref = /\#/.test(href);

        if (isHashHref) {
          var tabId = href.substring(1);

          if (_.params.useLocationHash) {
            history.pushState(null, null, (0,_util_plugin_get_history_entry__WEBPACK_IMPORTED_MODULE_2__.default)(_, tabId));
          }

          _.loadTabContent(tabId);

          e.preventDefault();
        }
      });
    }
  }, {
    key: "loadTabContent",
    value: function loadTabContent(tabId) {
      var _ = this;

      var _$params2 = _.params,
          loadLocationHash = _$params2.loadLocationHash,
          useHashFilter = _$params2.useHashFilter,
          useLocationHash = _$params2.useLocationHash;

      if (loadLocationHash) {
        var locationHashArray = (useHashFilter ? (0,_util_get_param__WEBPACK_IMPORTED_MODULE_3__.getHashParam)(useHashFilter) || '' : location.hash).split('=');
        locationHashArray.forEach(function (hash) {
          _.changeTabElements(hash.replace(/#/g, ''));
        });
      }

      if (!useLocationHash) {
        _.changeTabElements(tabId);
      }
    }
  }, {
    key: "changeTabElements",
    value: function changeTabElements(_tabId) {
      if (_tabId === 'none') return;

      var _ = this;

      var _$params3 = _.params,
          activeCss = _$params3.activeCss,
          tabsBodyCss = _$params3.tabsBodyCss,
          tabsBodyItemCss = _$params3.tabsBodyItemCss,
          tabsBodyItemShowCss = _$params3.tabsBodyItemShowCss;
      var tabId = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_4__.default)(_tabId) === "number" ? _.$tabsList.find('li').eq(_tabId).find('a').attr('href').substring(1) : _tabId;

      var $tabSelectedItem = _.$tabsBody.find(".".concat(tabsBodyItemCss, "[data-tab-id=\"").concat(tabId, "\"]"));

      if ($tabSelectedItem.length) {
        _.params.beforeChange(_.prevTabId, _.$tabsList, _.$tabsBody);

        var isInItsBody = $tabSelectedItem.closest(".".concat(tabsBodyCss))[0].isSameNode(_.$tabsBody[0]);
        if (!isInItsBody) return;

        _.$tabsList.find("a").attr({
          'aria-selected': false
        });

        _.$tabsList.find("li").removeClass(activeCss);

        $(".".concat(tabsBodyItemCss), _.$tabsBody).each(function () {
          var isItsBodyItem = $(this).closest(".".concat(tabsBodyCss))[0].isSameNode(_.$tabsBody[0]);

          if (isItsBodyItem) {
            $(this).removeClass(tabsBodyItemShowCss).attr({
              'aria-hidden': true
            });
          }
        });

        _.$tabsList.find("a[href=\"#".concat(tabId, "\"]")).attr({
          'aria-selected': true
        }).closest('li').addClass(activeCss);

        _.$tabsBody.find(".".concat(tabsBodyItemCss, "[data-tab-id=\"").concat(tabId, "\"]")).addClass(tabsBodyItemShowCss).attr({
          'aria-hidden': false
        });

        _.params.afterChange(tabId, _.$tabsList, _.$tabsBody);

        _.prevTabId = tabId;
      }
    }
  }]);

  return Tabs;
}();


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});