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

/***/ 134:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isVisible": function() { return /* binding */ isVisible; }
/* harmony export */ });
/* unused harmony exports default, IE_Event, isHidden, kebabCase, camelCase, isMobileOS, photoRegex, CSS_TRANSISTION_DELAY */
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

/***/ 816:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

var submenuBtn = function submenuBtn(params, menuText) {
  var $btn = $('<button>').attr({
    "class": params.submenuBtnCss,
    type: 'button'
  });
  $btn.html("<span class=\"sr-only\">toggle submenu for \"".concat(menuText, "\"</span>"));
  return $btn;
};

/* harmony default export */ __webpack_exports__["default"] = (submenuBtn);

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
/* harmony export */   "default": function() { return /* binding */ NavMobile; },
/* harmony export */   "NavMobileNestled": function() { return /* binding */ NavMobileNestled; }
/* harmony export */ });
/* harmony import */ var _util_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(180);
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(225);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(134);
/* harmony import */ var _util_plugin_nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(816);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(814);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var VERSION = "1.3.2";
var DATA_NAME = 'NavMobile';
var EVENT_NAME = 'navMobile';

var NavMobile = /*#__PURE__*/function () {
  _createClass(NavMobile, null, [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_instance"));
        var params = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_params"));
        $(params.enableBtn).off("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME));
        $(document).off("keydown.".concat(EVENT_NAME));
        instance.$element.off("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME)).off("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME));
        $(document.body).off("click.".concat(EVENT_NAME));
        $(window).off("resize.".concat(EVENT_NAME, " ").concat(EVENT_NAME));
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
        enableBtn: '#mobile-nav-btn',
        ariaLabel: 'Toggle site navigation',
        slideDuration: 400,
        outerElement: 'body',
        outsideClickClose: true,
        hasUlCls: 'has-ul',
        menuOpenCss: 'menu-opened',
        menuTogglingCss: 'menu-toggling',
        menuIsOpeningCss: 'menu-is-opening',
        menuIsClosingCss: 'menu-is-closing',
        submenuBtnCss: 'btn-nav--mb-submenu i i-arrow-b',
        afterNavItemOpen: function afterNavItemOpen() {},
        afterNavItemClose: function afterNavItemClose() {},
        afterOpen: function afterOpen() {},
        afterClose: function afterClose() {},
        stopPropagation: true,
        nextLevelBtn: "<i class=\"nav-icon nav-icon--next\" /><span class=\"sr-only\">View menu</span></i>",
        backLevelBtn: "<i class=\"nav-icon nav-icon--back\" >\u2190 <span class=\"sr-only\">Go Back</span></i>",
        navToggleNestled: false,
        bkptEnable: null
      };
    }
  }]);

  function NavMobile(element, options) {
    _classCallCheck(this, NavMobile);

    var _ = this;

    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_2__.default)($(element).data(EVENT_NAME + '-options')); //props

    _.$element = $(element);
    (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend(NavMobile.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, "".concat(DATA_NAME, "_params")); //run the methods

    _.addChildNavClass();

    _.menuButtonClick();

    _.menuNavigationClick();

    _.checkIfEnabled();

    _.doOutsideClick();

    var elemID = element[0].id || element[0].className;
    $(_.params.enableBtn).attr({
      'aria-controls': elemID,
      'aria-label': _.params.ariaLabel
    });
    return this;
  }

  _createClass(NavMobile, [{
    key: "mobileMenuToggle",
    value: function mobileMenuToggle() {
      var _ = this;

      var _$params = _.params,
          enableBtn = _$params.enableBtn,
          outerElement = _$params.outerElement,
          menuOpenCss = _$params.menuOpenCss,
          menuIsOpeningCss = _$params.menuIsOpeningCss,
          menuIsClosingCss = _$params.menuIsClosingCss,
          slideDuration = _$params.slideDuration;

      if (_.menuOpened === true) {
        _.$element.parent().find(".".concat(_.params.menuOpenCss)).removeClass(_.params.menuOpenCss).find("[style]").css('display', '');

        $(outerElement).removeClass(menuOpenCss);
        $(outerElement).addClass(menuIsClosingCss);
        setTimeout(function () {
          $(outerElement).removeClass(menuIsClosingCss);
        }, slideDuration);
        _.menuOpened = false;

        _.params.afterClose();
      } else {
        _.$element.addClass(menuOpenCss);

        $(outerElement).addClass(menuOpenCss);
        $(outerElement).addClass(menuIsOpeningCss);
        setTimeout(function () {
          $(outerElement).removeClass(menuIsOpeningCss);
        }, slideDuration);
        _.menuOpened = true;

        _.params.afterOpen();
      } //update aria-expanded


      $(enableBtn).attr({
        'aria-expanded': _.menuOpened
      });
    }
  }, {
    key: "addChildNavClass",
    value: function addChildNavClass() {
      var _ = this;

      $('li', _.$element).has('ul').each(function () {
        var $this = $(this);

        if (!$this.next('button').length) {
          var $a = $this.find('a').first();
          $a.addClass(_.params.hasUlCls);
          $a.after((0,_util_plugin_nav__WEBPACK_IMPORTED_MODULE_3__.default)(_.params, $a.text()));
        }
      });
    }
  }, {
    key: "menuButtonClick",
    value: function menuButtonClick() {
      var _ = this;

      var ESCAPE = 27;
      $(_.params.enableBtn).on("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME), function (e) {
        if (!_.allowClick) return;

        _.mobileMenuToggle();

        e.stopPropagation();
        e.preventDefault();
      });
      $(document).on("keydown.".concat(EVENT_NAME), function (e) {
        var key = e.keyCode || e.which;

        if (key === ESCAPE && _.$element.hasClass(_.params.menuOpenCss) && _.allowClick) {
          _.mobileMenuToggle();
        }
      });
    }
  }, {
    key: "menuNavigationClick",
    value: function menuNavigationClick() {
      var _ = this;

      if (!_.params.navToggleNestled) {
        _.menuNavToggle();
      } else {
        //non-standards, but alternative behavior
        //of clicking into a link item and seeing only
        //its subnav items with a back button option
        _.menuNavToggleNestled();
      }
    }
  }, {
    key: "menuNavToggle",
    value: function menuNavToggle() {
      var _ = this;

      _.$element.on("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME), '.' + _.params.submenuBtnCss.replace(/\s/g, '.'), function (e) {
        var _$params2 = _.params,
            hasUlCls = _$params2.hasUlCls,
            menuOpenCss = _$params2.menuOpenCss,
            menuTogglingCss = _$params2.menuTogglingCss,
            slideDuration = _$params2.slideDuration;
        var $li = $(this).closest(".".concat(hasUlCls));
        var isOpened = $li.hasClass(menuOpenCss);
        var $ul = $li.find('ul').first(); //exit because were in desktop view

        if (!_.allowClick) {
          return;
        }

        if (!isOpened) {
          _.allowClick = false;
          $ul.addClass(menuTogglingCss);
          var ulHeightBeforeResetToZero = $ul[0].scrollHeight;
          $ul.css({
            height: 0
          });
          setTimeout(function () {
            $ul.css({
              height: ulHeightBeforeResetToZero
            });
          }, _util_constants_js__WEBPACK_IMPORTED_MODULE_0__.CSS_TRANSISTION_DELAY);
          setTimeout(function () {
            $li.addClass(menuOpenCss);
            $ul.removeClass(menuTogglingCss).addClass(menuOpenCss);
            $ul.css({
              height: ''
            });

            _.params.afterNavItemOpen($li);

            _.allowClick = true;
          }, slideDuration);
        } else {
          _.allowClick = false;
          $ul.removeClass(menuOpenCss).addClass(menuTogglingCss).find(".".concat(menuOpenCss)).removeClass(menuOpenCss);
          $ul.css({
            height: $ul[0].scrollHeight
          });
          setTimeout(function () {
            $ul.css({
              height: 0
            });
          }, _util_constants_js__WEBPACK_IMPORTED_MODULE_0__.CSS_TRANSISTION_DELAY);
          setTimeout(function () {
            $li.removeClass(menuOpenCss);
            $ul.removeClass("".concat(menuTogglingCss, " ").concat(menuOpenCss));
            $ul.css({
              height: ''
            });

            _.params.afterNavItemOpen($li);

            _.allowClick = true;
          }, slideDuration);
        }

        e.stopPropagation();
      }).on("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME), 'a', function (e) {
        //prohibit closing if an anchor is clicked
        if (_.params.stopPropagation) {
          e.stopPropagation();
        }
      });
    }
  }, {
    key: "doOutsideClick",
    value: function doOutsideClick() {
      var _ = this;

      $(document.body).on("click.".concat(EVENT_NAME), this, function (e) {
        if (_.params.outsideClickClose) {
          if (!_.menuOpened) {
            return;
          } //lets just exit then..


          var menuClicked = _.$element.has(e.target).length > 0; //if the menu item is not clicked and its opened
          //the menu button shouldn't register because propogation is prevented to the body

          if (!menuClicked && _.menuOpened) {
            _.mobileMenuToggle();
          }
        }
      });
    }
  }, {
    key: "checkIfEnabled",
    value: function checkIfEnabled() {
      var _ = this;

      var resizeTimer; //basically if the navigational button is visible then
      //we can allow the click to open the navigation
      //this is so it doesn't clash with any other plugins
      //and allows for the control of this click via CSS

      $(window).on("resize.".concat(EVENT_NAME, " ").concat(EVENT_NAME), function (e) {
        resizeTimer && clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          _.allowClick = typeof _.params.bkptEnable === 'number' ? $(window).width() <= _.params.bkptEnable : (0,_util_helpers__WEBPACK_IMPORTED_MODULE_4__.isVisible)($(_.params.enableBtn)[0]);
        }, e.type === EVENT_NAME ? 0 : 200);
      }).trigger(EVENT_NAME);
    }
  }]);

  return NavMobile;
}();


var NavMobileNestled = /*#__PURE__*/function (_NavMobile) {
  _inherits(NavMobileNestled, _NavMobile);

  var _super = _createSuper(NavMobileNestled);

  _createClass(NavMobileNestled, null, [{
    key: "pluginName",
    get: function get() {
      return "".concat(EVENT_NAME, "Nestled");
    }
  }]);

  function NavMobileNestled(element, options) {
    _classCallCheck(this, NavMobileNestled);

    return _super.call(this, element, options);
  }

  _createClass(NavMobileNestled, [{
    key: "menuNavToggleNestled",
    value: function menuNavToggleNestled() {
      var _ = this;

      _.$element.find('li').has('ul').each(function () {
        var $nextBtn = $("<button type=\"button\" class=\"btn-nav--mb-next\">".concat(_.params.nextLevelBtn, "</button>"));
        var $backBtn = $("<button type=\"button\" class=\"btn-nav--mb-back\">".concat(_.params.backLevelBtn, "</button>"));
        $(this).append($nextBtn).prepend($backBtn);
      });

      _.$element.on("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME), ".".concat(_.params.hasUlCls, " > a, .").concat(_.params.hasUlCls, " > .btn-nav--mb-next"), function (e) {
        //exit if were not in mobile
        if (!_.allowClick) return;
        var $parentLi = $(this).closest('li');
        !$parentLi.hasClass('show-nav-elem') && e.preventDefault();
        $parentLi.siblings('li').addClass('hide-nav-elem');
        $parentLi.addClass('show-nav-elem');
        e.stopPropagation();
      });

      _.$element.on("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME), ".".concat(_.params.hasUlCls, " > .btn-nav--mb-back"), function () {
        $(this).parent('li').siblings().removeClass('hide-nav-elem').removeClass('show-nav-elem');
        $(this).parent('li').removeClass('show-nav-elem');
      });
    }
  }]);

  return NavMobileNestled;
}(NavMobile);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});