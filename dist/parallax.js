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
/* harmony export */   "default": function() { return /* binding */ Parallax; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(225);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var VERSION = "1.0.0";
var DATA_NAME = 'Parallax';
var EVENT_NAME = 'parallax';

var getEvents = function getEvents(instEvt) {
  return ["scroll.".concat(instEvt), "resize.".concat(instEvt), instEvt].join(' ');
};

var Parallax = /*#__PURE__*/function () {
  _createClass(Parallax, null, [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"));
        $(window).off(getEvents(instance.instanceEvent));
        $(window).off("resize.".concat(instance.instanceEvent, " ").concat(instance.instanceEvent));
        $(this).css(_objectSpread({
          transform: ''
        }, instance.bgFill ? {
          'padding-top': ''
        } : {}));
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
        speed: 7,
        axis: 'y',
        relativeElem: false,
        $heightElem: null,
        initOffset: false,
        bgFill: false,
        outStop: 1,
        scrollMaxPxStop: 5000,
        minWidth: null,
        maxWidth: null
      };
    }
  }]);

  function Parallax(element, options, index) {
    _classCallCheck(this, Parallax);

    var _ = this;

    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_1__.default)($(element).data(EVENT_NAME + '-options'));
    var instanceDefaults = {
      $heightElem: $(element)
    };
    _.$window = $(window);
    _.$element = $(element);
    (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, Parallax.defaults, instanceDefaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"));
    _.requestAnimationFrame = !!window.requestAnimationFrame;
    _.initOffsetSet = false;
    _.initOffset = 0;
    _.index = index;
    _.instanceEvent = EVENT_NAME + index; //props to get updated on resize

    _.updatableProps();

    _.initiallyInView = _.$relElem.offset().top < _.winHeight;

    _.init();

    return this;
  }

  _createClass(Parallax, [{
    key: "init",
    value: function init() {
      var _ = this;

      var EVENTS = getEvents(_.instanceEvent);
      $(window).on(EVENTS, function () {
        if (_.requestAnimationFrame) {
          window.requestAnimationFrame(function () {
            _.parallax(_);
          });
        } else {
          _.parallax(_);
        }
      }).trigger(_.instanceEvent);

      _.resizeUpdates();
    }
  }, {
    key: "updatableProps",
    value: function updatableProps() {
      var _ = this;

      _.winHeight = _.$window.height();
      _.winWidth = _.$window.width();
      _.elemHeight = _.params.$heightElem.height();
      _.speed = _._speed;
      _.bgFillRatio = _._bgFillRatio;
      _.bgFill = _.params.bgFill;
      _.axis = _.params.axis.toUpperCase();
      _.$relElem = _._relElem;
      _.outStop = _.params.outStop;
      _.scrollMaxPxStop = _.params.scrollMaxPxStop;
      _.initOffsetSet = false;
      _.minWidthIfSet = _.params.minWidth ? _.winWidth > _.params.minWidth : true;
      _.maxWidthIfSet = _.params.maxWidth ? _.winWidth < _.params.maxWidth : true;
      _.effectCleared = false;
    }
  }, {
    key: "resizeUpdates",
    value: function resizeUpdates() {
      var _ = this;

      var resizeThrottle = null;
      $(window).on("resize.".concat(_.instanceEvent, " ").concat(_.instanceEvent), function () {
        resizeThrottle && clearTimeout(resizeThrottle);
        resizeThrottle = setTimeout(function () {
          if (!_.initOffsetSet && _.params.initOffset) {
            _.$element.css({
              'transform': ''
            });
          }

          _.updatableProps();
        }, 100);
      }).trigger(_.instanceEvent);
    }
  }, {
    key: "parallax",
    value: function parallax(_) {
      var elemTop = _.$relElem.offset().top;

      var scrollTop = window.pageYOffset;
      var withinMinAndMaxIfSet = _.minWidthIfSet && _.maxWidthIfSet;

      if (_._isScrolledIntoView(elemTop, scrollTop) && withinMinAndMaxIfSet) {
        var speedInZeroInView = scrollTop + _.winHeight - elemTop;
        var speed = speedInZeroInView * _.speed;
        var bgFillRatio = _.bgFillRatio;

        if (!_.initOffsetSet && _.initiallyInView) {
          if (_.params.initOffset) {
            _.initOffset = speed - scrollTop * _.speed;
            _.initOffsetSet = true;
          }
        }

        if (Math.abs(speed) > _.scrollMaxPxStop) return;
        var cssParams = _.axis === 'Y' ? !_.bgFill ? {
          //don't fill it
          'transform': "translate3d(0,".concat(speed - _.initOffset, "px,0)")
        } : {
          //fill the background
          'transform': "translate3d(0,".concat(speed - _.initOffset - bgFillRatio, "px,0)"),
          'padding-top': "".concat(bgFillRatio, "px")
        } : !_.bgFill ? {
          //scroll sideways
          'transform': "translate3d(".concat(speed - _.initOffset, "px,0,0)")
        } : {
          'transform': "translate3d(".concat(speed - _.initOffset - bgFillRatio, "px,0,0)"),
          'padding-left': "".concat(bgFillRatio, "px")
        };

        _.$element.css(cssParams);

        _.effectCleared = true;
      } else {
        if (!_.effectCleared) {
          _.$element.css({
            'transform': '',
            'padding-top': ''
          });

          _.effectCleared = true;
        }
      }
    }
  }, {
    key: "_isScrolledIntoView",
    value: function _isScrolledIntoView(elemTop, scrollTop) {
      var _ = this;

      var elemBottom = _.elemHeight * _.outStop + elemTop;
      var inView = scrollTop < elemBottom && _.winHeight + scrollTop > elemTop;
      return inView;
    } //getters

  }, {
    key: "_bgFillRatio",
    get: function get() {
      var _ = this;

      var pad = 2; //buffer for any potential rounding errors

      var speed = _.speed < 0 ? _.speed * -1 : _.speed;
      return _.winHeight * speed + pad;
    }
  }, {
    key: "_speed",
    get: function get() {
      var _ = this;

      return _.params.speed / 100;
    }
  }, {
    key: "_relElem",
    get: function get() {
      var _ = this;

      return _.params.relativeElem ? _.$element.closest(_.params.relativeElem) : _.$element;
    }
  }]);

  return Parallax;
}();


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});