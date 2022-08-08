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
/* harmony export */   "KEYS": function() { return /* binding */ KEYS; }
/* harmony export */ });
/* unused harmony exports PHOTO_RGX, CSS_TRANSISTION_DELAY */
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
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(225);
/* harmony import */ var _util_get_param__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(534);
/* harmony import */ var _util_plugin_update_history_state_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(683);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(180);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var VERSION = "1.3.0";
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
  historyType: 'push',
  loadLocationHash: true,
  addIDtoPanel: true,
  tabbing: true,
  tabDirection: 'horizontal',
  beforeChange: function beforeChange() {},
  afterChange: function afterChange() {},
  onInit: function onInit() {}
};

var getTabIDFromEl = function getTabIDFromEl(el) {
  return $(el).attr(el.nodeName.toUpperCase() === 'BUTTON' ? 'data-href' : 'href').replace(/^\#/, '');
};

var Tabs = /*#__PURE__*/function () {
  _createClass(Tabs, null, [{
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

  function Tabs(element, options, index) {
    _classCallCheck(this, Tabs);

    var _ = this;

    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_2__.default)($(element).data(DATA_NAME + '-options')); //state

    _.$element = $(element);
    (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, Tabs.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"));
    _.$tabsList = _.$element.find(".".concat(_.params.tabsHeadCss)).first();
    _.$tabsBody = _.$element.find(".".concat(_.params.tabsBodyCss)).first();
    _.prevTabId = '#';
    _.tabFocus = 0; //init

    _.ADA_Attributes();

    _.tabsChangeEvent();

    _.changeTabElements(_.getTabFromHash(), true);

    _.tabbing();

    $(window).on("popstate.".concat(EVENT_NAME), function (e) {
      if (_.params.historyType === 'push') {
        _.changeTabElements(_.getTabFromHash(), true);

        e.preventDefault();
      }
    });

    _.params.onInit(_.prevTabId, _.$tabsList, _.$tabsBody);

    return this;
  }

  _createClass(Tabs, [{
    key: "getTabFromHash",
    value: function getTabFromHash() {
      var _ = this;

      var _$params = _.params,
          useHashFilter = _$params.useHashFilter,
          tabsBodyItemCss = _$params.tabsBodyItemCss,
          defaultContent = _$params.defaultContent;
      var defaultTab = '';

      if (useHashFilter) {
        defaultTab = (0,_util_get_param__WEBPACK_IMPORTED_MODULE_3__.getHashParam)(useHashFilter);
      } else {
        defaultTab = location.hash.split('&').filter(function (tabHref) {
          if (tabHref.indexOf('=') === -1) {
            if (_.$tabsBody.find(".".concat(tabsBodyItemCss, "[data-tab-id=\"").concat(tabHref, "\"]")).length) {
              return tabHref;
            }
          }
        })[0];
      }

      return defaultTab || getTabIDFromEl(_.$tabsList.find('a, button')[defaultContent]);
    }
  }, {
    key: "tabbing",
    value: function tabbing() {
      var _ = this;

      var _$params2 = _.params,
          tabbing = _$params2.tabbing,
          tabDirection = _$params2.tabDirection;
      var RIGHT = _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.RIGHT,
          LEFT = _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.LEFT,
          UP = _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.UP,
          DOWN = _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.DOWN;

      _.$tabsList.on('keydown.' + EVENT_NAME, function (e) {
        // if the param gets dynamically updated
        // lets check here
        if (!tabbing) return;
        var back = LEFT,
            forward = RIGHT;

        if (tabDirection === 'horizontal') {
          back = LEFT;
          forward = RIGHT;
        } else if (tabDirection === 'vertical') {
          back = UP;
          forward = DOWN;
        } else {
          console.warn("Please specify 'horizontal' or 'vertical' for a tab direction");
        } // rebuild the list per-chance any get removed dynamically or added


        var $tabs = _.$tabsList.find('a, button');

        if (e.code === forward || e.code === back) {
          $tabs[_.tabFocus].setAttribute('tabindex', -1);

          if (tabDirection === 'vertical') {
            e.preventDefault();
          }

          if (e.code === forward) {
            _.tabFocus++; // If we're at the end, go to the start

            if (_.tabFocus >= $tabs.length) {
              _.tabFocus = 0;
            } // Move left

          } else if (e.code === back) {
            _.tabFocus--; // If we're at the start, move to the end

            if (_.tabFocus < 0) {
              _.tabFocus = $tabs.length - 1;
            }
          }

          $tabs[_.tabFocus].setAttribute('tabindex', 0);

          $tabs[_.tabFocus].focus();
        }
      });
    }
  }, {
    key: "ADA_Attributes",
    value: function ADA_Attributes() {
      var _ = this;

      var _$params3 = _.params,
          tabsBodyItemCss = _$params3.tabsBodyItemCss,
          addIDtoPanel = _$params3.addIDtoPanel;

      _.$tabsList.find("a, button").each(function () {
        var tabHref = getTabIDFromEl(this);

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

      _.$tabsList.on("".concat(_.params.tabsEvent, ".").concat(EVENT_NAME, " ").concat(EVENT_NAME), "a, button", function (e) {
        var tabId = getTabIDFromEl(this);

        _.changeTabElements(tabId);

        e.preventDefault();
      });
    }
  }, {
    key: "changeTabElements",
    value: function changeTabElements(tabId) {
      var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (tabId === 'none') return;

      var _ = this;

      var _$params4 = _.params,
          activeCss = _$params4.activeCss,
          tabsBodyCss = _$params4.tabsBodyCss,
          tabsBodyItemCss = _$params4.tabsBodyItemCss,
          tabsBodyItemShowCss = _$params4.tabsBodyItemShowCss;

      var $tabSelectedItem = _.$tabsBody.find(".".concat(tabsBodyItemCss, "[data-tab-id=\"").concat(tabId, "\"]"));

      if ($tabSelectedItem.length) {
        _.params.beforeChange(_.prevTabId, _.$tabsList, _.$tabsBody);

        var isInItsBody = $tabSelectedItem.closest(".".concat(tabsBodyCss))[0].isSameNode(_.$tabsBody[0]);
        if (!isInItsBody) return;

        _.$tabsList.find("a, button").attr({
          'aria-selected': false,
          tabindex: -1
        });

        _.$tabsList.find('.' + activeCss).removeClass(activeCss);

        $(".".concat(tabsBodyItemCss), _.$tabsBody).each(function () {
          var isItsBodyItem = $(this).closest(".".concat(tabsBodyCss))[0].isSameNode(_.$tabsBody[0]);

          if (isItsBodyItem) {
            $(this).removeClass(tabsBodyItemShowCss).attr({
              'aria-hidden': true
            });
          }
        });

        var $selected = _.$tabsList.find("a[href=\"#".concat(tabId, "\"], button[data-href=\"#").concat(tabId, "\"]"));

        $selected.attr({
          'aria-selected': true,
          tabindex: 0
        }).addClass(activeCss) // if we have a list item
        .closest('li').addClass(activeCss);

        _.$tabsList.find('a,button').each(function (i) {
          if (this.classList.contains(activeCss)) {
            _.tabFocus = i;
          }
        });

        _.$tabsBody.find(".".concat(tabsBodyItemCss, "[data-tab-id=\"").concat(tabId, "\"]")).addClass(tabsBodyItemShowCss).attr({
          'aria-hidden': false
        });

        _.params.afterChange(tabId, _.$tabsList, _.$tabsBody);

        !init && (0,_util_plugin_update_history_state_js__WEBPACK_IMPORTED_MODULE_4__.default)(_, tabId, false, _.prevTabId);
        _.prevTabId = tabId;
      }
    }
  }], [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_params"));
        var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"));
        instance.$tabsList.off("".concat(params.tabsEvent, ".").concat(EVENT_NAME, " ").concat(EVENT_NAME));
        instance.$tabsList.off('keydown.' + EVENT_NAME);
        instance.$tabsList.find('a, button').attr({
          tabindex: null
        });
        $(window).off("popstate.".concat(EVENT_NAME));
        (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_params"), null, true);
        (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"), null, true);
      });
    }
  }]);

  return Tabs;
}();


Tabs.defaults = DEFAULTS;
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});