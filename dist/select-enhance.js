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
/* unused harmony exports photoRegex, CSS_TRANSISTION_DELAY */
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

/***/ 134:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IE_Event": function() { return /* binding */ IE_Event; },
/* harmony export */   "isMobileOS": function() { return /* binding */ isMobileOS; }
/* harmony export */ });
/* unused harmony exports default, isVisible, isHidden, kebabCase, camelCase, photoRegex, CSS_TRANSISTION_DELAY */
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
}; // photo

var photoRegex = /\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$|(\?|&|&amp;)(image|ext\=\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg))?$/i;
var CSS_TRANSISTION_DELAY = 100;

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
/* harmony export */   "default": function() { return /* binding */ SelectEnhance; }
/* harmony export */ });
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
/* harmony import */ var _util_formatting_valid_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(225);
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(180);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(134);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




 // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role

var VERSION = "1.3.2";
var EVENT_NAME = 'selectEnhance';
var DATA_NAME = 'SelectEnhance';
var DEFAULTS = {
  cssPrefix: 'select-enhance',
  mobileNative: true,
  focusIn: function focusIn(el) {},
  focusOut: function focusOut(el) {},
  beforeChange: function beforeChange(el) {},
  afterChange: function afterChange(el) {},
  blurDuration: 250,
  typeAheadDuration: 500,
  observeSelectbox: true
}; // wrap the select first

var mobileOS = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_2__.isMobileOS)(); // helper

var getSelectedOptNode = function getSelectedOptNode($el) {
  return $el.find('option').filter(function () {
    return this.selected;
  })[0];
}; // global private state props


var to = null,
    $currSelectEnhance = null,
    listPosTop = true,
    registerEventScroll = false,
    currSelectInstance = null;

var SelectEnhance = /*#__PURE__*/function () {
  _createClass(SelectEnhance, null, [{
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

  function SelectEnhance(element, options, index) {
    _classCallCheck(this, SelectEnhance);

    var _ = this;

    _.index = index;
    _.$element = $(element);
    _.$label = $("label[for=\"".concat(_.$element.attr('id'), "\"]"));
    _.selectId = _.$element.attr('id') + '_enhance' || 0;
    _.$selectEnhance = null;
    _.$enableBtn = null;
    _.$selectList = null;
    _.optionSet = new WeakMap();
    _.selectboxObserver = null;
    _.selectListBoxInFullView = true;
    var dataOptions = (0,_util_formatting_valid_json__WEBPACK_IMPORTED_MODULE_3__.default)($(element).data(DATA_NAME + '-options'));
    (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, SelectEnhance.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"));

    _.setUpSelectHtml();

    if (mobileOS && _.params.mobileNative) {
      _.mobileOnlyIfNavite();
    } else {
      // 
      // attach events
      // 
      if (_.params.observeSelectbox) {
        _.selectInputMutationObserver();
      }

      _.eventLabelClick();

      _.eventKeyboardSearch();

      _.eventShowOptions();

      _.eventOptionClick();

      _.eventSelectToggle();

      _.eventArrowKeys();

      _.observeSelectListBoxInFullView();

      SelectEnhance.eventScrollGetListPosition();
    }

    return this;
  }

  _createClass(SelectEnhance, [{
    key: "mobileOnlyIfNavite",
    value: function mobileOnlyIfNavite() {
      var _ = this;

      var prevElSelectedVal = getSelectedOptNode(_.$element);

      _.$element.on('mouseup.' + EVENT_NAME, 'option', function (e) {
        if (!this.isSameNode(prevElSelectedVal)) {
          _.params.beforeChange(_.$element);
        }
      }).on('change.' + EVENT_NAME, function (e) {
        _.params.afterChange(_.$element);

        prevElSelectedVal = getSelectedOptNode(_.$element);
      });
    } // Events 

  }, {
    key: "blurSelect",
    value: function blurSelect() {
      var _ = this;

      _.$selectEnhance.addClass(_.params.cssPrefix + '--blurring');

      _.$selectEnhance.removeClass(_.params.cssPrefix + '--focused').attr({
        'aria-expanded': false
      });

      setTimeout(function () {
        _.$selectEnhance.removeClass(_.params.cssPrefix + '--blurring');

        $currSelectEnhance = null;
        currSelectInstance = null;
      }, _.params.blurDuration);
    }
  }, {
    key: "setSelectionState",
    value: function setSelectionState($btn) {
      var doBlur = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var _ = this;

      _.params.beforeChange(_.$element);

      _.optionSet.get($btn[0]).selected = true;

      _.params.afterChange(_.$element); // update the selected


      _.$selectEnhance.find('button[aria-selected]').attr({
        'aria-selected': null
      });

      $btn.attr({
        'aria-selected': true
      });

      _.$selectList.attr({
        'aria-activedescendant': $btn[0].id
      });

      _.$element[0].dispatchEvent(new (Event || _util_helpers__WEBPACK_IMPORTED_MODULE_2__.IE_Event)('change'));

      if (doBlur) {
        _.$enableBtn.text($btn.text())[0].focus();

        _.blurSelect();
      } else {
        $btn[0].focus();
      }
    }
  }, {
    key: "eventLabelClick",
    value: function eventLabelClick() {
      var _ = this;

      _.$label.on('click.' + EVENT_NAME, function (e) {
        e.preventDefault();

        if (!_.$element[0].disabled) {
          _.$enableBtn[0].focus();
        }
      });
    }
  }, {
    key: "eventShowOptions",
    value: function eventShowOptions() {
      var _ = this;

      _.$selectEnhance.on('click.' + EVENT_NAME, '.' + _.params.cssPrefix + '__enable-btn', function (e) {
        if (_.$element[0].disabled) {
          return;
        }

        _.$selectEnhance.toggleClass(_.params.cssPrefix + '--focused').attr({
          'aria-expanded': true
        });

        var $selectedBtn = _.$selectEnhance.find('button[aria-selected]');

        if ($selectedBtn.length) {
          $selectedBtn[0].focus();
        }

        $currSelectEnhance = _.$selectEnhance;
        currSelectInstance = _;
        SelectEnhance.getListPosition();
      });
    }
  }, {
    key: "eventOptionClick",
    value: function eventOptionClick() {
      var _ = this;

      _.$selectEnhance.on('click.' + EVENT_NAME, '.' + _.params.cssPrefix + '__list-btn', function (e) {
        e.preventDefault();

        _.$selectEnhance.attr({
          'aria-expanded': false
        }).removeClass(_.params.cssPrefix + '--focused');

        _.setSelectionState($(this));
      });
    }
  }, {
    key: "eventSelectToggle",
    value: function eventSelectToggle() {
      var _ = this;

      _.$selectEnhance.on('focusin.' + EVENT_NAME, function (e) {
        _.params.focusIn(_.$element);

        $(document.body).on('click.close_' + _.selectId + EVENT_NAME, function (e) {
          setTimeout(function () {
            var ae = document.activeElement;

            if (!_.$selectEnhance.has(ae).length || _.$selectEnhance[0].isSameNode(ae)) {
              _.blurSelect();

              $(document.body).off('click.close_' + _.selectId + EVENT_NAME);
            }
          }, 100);
        });
      });
    }
  }, {
    key: "eventKeyboardSearch",
    value: function eventKeyboardSearch() {
      var _ = this;

      var keyInputTo = null,
          keyedInput = "",
          keyedFound = [];

      _.$selectEnhance.on('keydown.' + EVENT_NAME, function (e) {
        if (_.$element[0].disabled) {
          return;
        }

        var keyCurr = e.key.length === 1 ? e.key : '';
        keyedInput += keyCurr;
        clearTimeout(keyInputTo);
        keyInputTo = setTimeout(function () {
          keyedInput = "";
        }, _.params.typeAheadDuration);

        if (keyedInput.trim()) {
          var rgx = RegExp('^' + keyedInput.trim(), 'i');
          keyedFound = [].slice.call(_.$element.find('option').filter(function (i, el) {
            return rgx.test(el.text) === true;
          }));

          if (keyedFound.length) {
            _.setSelectionState(_.optionSet.get(keyedFound[0]), false);
          }
        }
      });
    }
  }, {
    key: "eventArrowKeys",
    value: function eventArrowKeys() {
      var _ = this;

      _.$selectEnhance.on('keydown.navigate_' + EVENT_NAME, function (e) {
        if (_.$element[0].disabled) {
          return;
        }

        if (e.key === _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.DOWN) {
          e.preventDefault();
          setTimeout(function () {
            _.nextOptionButton('next');
          }, 100);
        }

        if (e.key === _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.UP) {
          e.preventDefault();
          setTimeout(function () {
            _.nextOptionButton('prev');
          }, 100);
        }

        if (e.key === _util_constants__WEBPACK_IMPORTED_MODULE_1__.KEYS.ESC && $currSelectEnhance) {
          _.blurSelect();

          _.$enableBtn[0].focus();
        }
      });
    } //  build the HTML for it

  }, {
    key: "setUpSelectHtml",
    value: function setUpSelectHtml() {
      var _ = this;

      var $selectEnhance = $('<div />').attr({
        "class": _.params.cssPrefix,
        role: "combobox",
        'aria-expanded': false,
        'aria-owns': _.selectId + '_listbox',
        'aria-haspopup': 'listbox',
        id: _.selectId + '_combobox'
      });
      var $enableBtn = $('<button>').attr({
        type: 'button',
        "class": _.params.cssPrefix + '__enable-btn',
        role: "textbox",
        'aria-controls': _.selectId + '_listbox',
        id: _.selectId + '_input'
      });

      _.$element.wrap($selectEnhance); // jQuery, elements need to be bound to the DOM before they
      // can have events attached to them. So this is the solution


      _.$selectEnhance = _.$element.parent();

      if (mobileOS && _.params.mobileNative) {
        // exit if its a mobile device after wrapping for styling
        return;
      }

      $enableBtn.insertAfter(_.$element);

      _.$element.attr({
        tabindex: '-1',
        'aria-hidden': true
      }); // jQuery, elements need to be bound to the DOM before they
      // can have events attached to them. So this is the solution


      _.$enableBtn = _.$element.parent().find('#' + _.selectId + '_input');
      SelectEnhance.buildOptionsList(_);
    }
  }, {
    key: "nextOptionButton",
    value: function nextOptionButton(dir) {
      var _ = this;

      var ae = document.activeElement;

      var $btnList = _.$selectList.find('button');

      var l = $btnList.length;

      if (_.$enableBtn[0].isSameNode(ae)) {
        $btnList.eq(dir === 'next' ? 0 : l - 1)[0].focus();
        return;
      }

      for (var i = 0; i < l; i++) {
        var el = $btnList[i];

        if (ae.isSameNode(el)) {
          if (dir === 'next') {
            var isLast = i === l - 1;
            $btnList.eq(isLast ? i : i + 1)[0].focus();
          } else {
            var isFirst = i === 0;
            $btnList.eq(isFirst ? i : i - 1)[0].focus();
          }

          break;
        }
      }
    }
  }, {
    key: "selectInputMutationObserver",
    value: function selectInputMutationObserver() {
      var _ = this;

      var selectNode = _.$element[0];
      var config = {
        attributes: true,
        childList: true,
        subtree: true
      }; // Callback function to execute when mutations are observed

      var callback = function callback(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for (var i = 0, l = mutationsList.length; i < l; i++) {
          var mutation = mutationsList[i];

          if (mutation.type === 'childList') {
            SelectEnhance.refreshOptions(_.$element[0]);
          } else if (mutation.type === 'attributes') {
            _.$selectEnhance.toggleClass(_.params.cssPrefix + '--disabled', _.$element[0].disabled);
          }
        }
      }; // Create an observer instance linked to the callback function


      _.selectboxObserver = new MutationObserver(callback); // Start observing the target node for configured mutations

      _.selectboxObserver.observe(selectNode, config); // Later, you can stop observing
      // _.selectboxObserver.disconnect();

    }
  }, {
    key: "observeSelectListBoxInFullView",
    value: function observeSelectListBoxInFullView() {
      var _ = this;

      if (window.IntersectionObserver) {
        var selectIntersectionObserver = new IntersectionObserver(function (selects) {
          _.selectListBoxInFullView = selects[0].intersectionRatio === 1;
        }, {
          threshold: [0, 1]
        });
        selectIntersectionObserver.observe(_.$selectList[0]);
      }
    }
  }], [{
    key: "buildOptionsList",
    value: function buildOptionsList(_) {
      var cssPrefix = _.params.cssPrefix;

      var optGroup = _.$element[0].getElementsByTagName('optgroup');

      var hasOptGroup = !!optGroup.length;
      var $optGroupWm = new WeakMap();

      if (hasOptGroup) {
        for (var i = 0, l = optGroup.length; i < l; i++) {
          var group = optGroup[i];
          $optGroupWm.set(group, $('<div/>').attr({
            "class": cssPrefix + '__optgroup',
            role: 'group',
            label: group.label || ""
          }));
        }
      }

      var options = _.$element[0].getElementsByTagName('option');

      _.$selectList = $('<div>').attr({
        "class": cssPrefix + '__list',
        role: 'listbox',
        id: _.selectId + '_listbox'
      });
      var optId = _.selectId || 'select_' + index;

      for (var _i = 0, _l = options.length; _i < _l; _i++) {
        var opt = options[_i];
        var id = optId + _i;
        var attrs = {
          role: 'option',
          id: id,
          'data-value': opt.value,
          'aria-selected': opt.selected ? 'true' : null,
          "class": cssPrefix + '__list-btn'
        };
        var $btn = $('<button/>').attr(attrs).text(opt.textContent);

        _.optionSet.set($btn[0], opt);

        _.optionSet.set(opt, $btn); // append to list or optgroup


        hasOptGroup && opt.parentElement.nodeName.toUpperCase() === 'OPTGROUP' ? $optGroupWm.get(opt.parentElement).append($btn) : _.$selectList.append($btn);

        if (opt.selected) {
          _.$selectList.attr({
            'aria-activedescendant': id
          });

          _.$enableBtn.text(opt.textContent);
        }
      }

      if (hasOptGroup) {
        for (var _i2 = 0, _l2 = optGroup.length; _i2 < _l2; _i2++) {
          var _group = optGroup[_i2];

          _.$selectList.append($optGroupWm.get(_group));
        }
      }

      _.$selectList.insertAfter(_.$enableBtn);
    }
  }, {
    key: "eventScrollGetListPosition",
    value: function eventScrollGetListPosition() {
      if (!registerEventScroll) {
        $(window).on('scroll.' + EVENT_NAME, function () {
          to && clearTimeout(to);
          to = setTimeout(SelectEnhance.getListPosition, 100);
        });
        registerEventScroll = true;
      }
    }
  }, {
    key: "getListPosition",
    value: function getListPosition() {
      var _ = currSelectInstance;

      if (_ && _.$selectEnhance) {
        var selWrapPosTop = _.$selectEnhance.offset().top;

        var selListHeight = _.$selectList.height();

        var listPosAndHeight = _.$selectEnhance.offset().top + _.$selectEnhance.height() + selListHeight;
        var winPosAndHeight = window.scrollY + $(window).height();

        if (listPosAndHeight > winPosAndHeight && selWrapPosTop > selListHeight && !_.selectListBoxInFullView) {
          _.$selectEnhance.addClass(_.params.cssPrefix + '--pos-bottom');

          listPosTop = false;
        } else {
          _.$selectEnhance.removeClass(_.params.cssPrefix + '--pos-bottom');

          listPosTop = true;
        }
      }
    }
  }, {
    key: "refreshOptions",
    value: function refreshOptions(element) {
      $(element).each(function () {
        var _ = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"));

        if (_) {
          _.$selectList.remove();

          _.optionSet = new WeakMap();
          SelectEnhance.buildOptionsList(_);
        } else {
          console.warn("No instance of a selectbox", element);
        }
      });
    }
  }, {
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var _ = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"));

        _.$selectEnhance.off('keydown.' + EVENT_NAME);

        _.$selectEnhance.off('keydown.navigate_' + EVENT_NAME);

        _.$selectEnhance.off('click.' + EVENT_NAME);

        _.$selectEnhance.off('focusout.' + EVENT_NAME);

        _.$label.off('click.' + EVENT_NAME);

        $(document.body).off('click.close_' + _.selectId + EVENT_NAME); // the window event will just stay

        _.$element.insertAfter(_.$selectEnhance);

        _.$element.attr({
          tabindex: null,
          'aria-hidden': null
        });

        _.$element.off('mouseup.' + EVENT_NAME);

        _.$element.off('change.' + EVENT_NAME);

        if (_.selectboxObserver) {
          _.selectboxObserver.disconnect();
        }

        _.$selectEnhance.remove();

        (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_params"), null, true);
        (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"), null, true);
      });
    }
  }]);

  return SelectEnhance;
}();


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});