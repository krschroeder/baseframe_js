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
/* harmony export */   "default": function() { return /* binding */ ResponsiveDropDown; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(225);
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(180);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(814);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var VERSION = "1.0.0";
var DATA_NAME = 'ResponsiveDropDown';
var EVENT_NAME = 'responsiveDropDown';

var ResponsiveDropDown = /*#__PURE__*/function () {
  _createClass(ResponsiveDropDown, null, [{
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
        clickHeader: '.resp-dd__header',
        toggleBody: '.resp-dd__body',
        closeBtnBottom: true,
        closeBtnText: 'Close',
        openHeaderCss: 'resp-dd--active',
        inMobileCss: 'resp-dd--in-mobile',
        closeBtnDivCss: 'resp-dd__close-btn-area',
        closeBtnCss: '',
        toggleCss: 'resp-dd__body--open',
        togglingCss: 'resp-dd__body--toggling',
        duration: 300,
        mobileBkpt: 768,
        outsideClickElem: 'body'
      };
    }
  }]);

  function ResponsiveDropDown(element, options) {
    _classCallCheck(this, ResponsiveDropDown);

    var _ = this;

    var dataOptions = (0,_util_formatting_valid_json__WEBPACK_IMPORTED_MODULE_2__.default)($(element).data(DATA_NAME + '-options'));
    _.isActive = false;
    _.$element = $(element);
    _.resizeDelay = null;
    _.windowWidth = $(window).width(); //for ios devices to add in the clicking (just adding in cursor pointer style to do so)

    _.styleAdded = false;
    _.is_ios = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) ? true : false;
    (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, ResponsiveDropDown.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, "".concat(DATA_NAME, "_params"));

    _.init();

    return this;
  }

  _createClass(ResponsiveDropDown, [{
    key: "init",
    value: function init() {
      var _ = this;

      _.updateMobileDesktopView();

      _.headerClick();

      _.outsideClickClose();

      _.closeBtn();
    }
  }, {
    key: "outsideClickClose",
    value: function outsideClickClose() {
      var _ = this;

      ResponsiveDropDown.iosOutsideClickSupport();
      $(_.params.outsideClickElem).on("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME, " ").concat(EVENT_NAME, "remove"), function (e) {
        var _$params = _.params,
            inMobileCss = _$params.inMobileCss,
            mobileBkpt = _$params.mobileBkpt,
            openHeaderCss = _$params.openHeaderCss,
            toggleBody = _$params.toggleBody,
            toggleCss = _$params.toggleCss;
        var $thisToggleBody = $(toggleBody, _.$element);
        var isInToggleBody = !!$(e.target).parents($thisToggleBody).length;
        var isToggleBody = $thisToggleBody[0].isSameNode(e.target);
        var isCloseBtn = $(".resp-dd__close-nav")[0].isSameNode(e.target);
        var isRemoveEvt = e.type === "".concat(EVENT_NAME, "remove");

        if (isInToggleBody && !isCloseBtn || isToggleBody) {
          return;
        }

        if (_.isActive || isRemoveEvt) {
          //need to remove the click real fast
          if (_.windowWidth < mobileBkpt || isRemoveEvt) {
            //openHeaderCss
            $(toggleBody, _.$element).removeClass(toggleCss);

            if (isRemoveEvt) {
              _.$element.removeClass(openHeaderCss);

              _.$element.removeClass(inMobileCss);
            } else {
              _.$element.toggleClass(openHeaderCss);
            }

            _.$element.off("click.".concat(EVENT_NAME));

            _.$element.off(EVENT_NAME);

            _.isActive = !_.isActive; //anddd add it back

            setTimeout(function () {
              !isRemoveEvt && _.headerClick();
            }, 100);
          }
        }
      });
    }
  }, {
    key: "closeBtn",
    value: function closeBtn() {
      var _ = this;

      if (_.params.closeBtnBottom) {
        var _$params2 = _.params,
            toggleBody = _$params2.toggleBody,
            closeBtnCss = _$params2.closeBtnCss,
            closeBtnText = _$params2.closeBtnText,
            closeBtnDivCss = _$params2.closeBtnDivCss;
        var closeBtnHTML = "<div class=\"".concat(closeBtnDivCss, "\">\n\t\t\t\t<button type=\"button\" class=\"resp-dd__close-nav ").concat(closeBtnCss, "\">").concat(closeBtnText, "</button>\n\t\t\t</div>");
        $(toggleBody, _.$element).append(closeBtnHTML).find(".".concat(closeBtnDivCss)).on("click.".concat(EVENT_NAME), 'button', function (event) {
          //webform pages need to not submit the form!
          //buttons do that by default. So we prevent it here!
          event.preventDefault();
        });
      }
    }
  }, {
    key: "updateMobileDesktopView",
    value: function updateMobileDesktopView() {
      var _ = this;

      $(window).on("resize.".concat(EVENT_NAME, " ").concat(EVENT_NAME), function (event) {
        var _$params3 = _.params,
            inMobileCss = _$params3.inMobileCss,
            openHeaderCss = _$params3.openHeaderCss,
            mobileBkpt = _$params3.mobileBkpt;
        clearTimeout(_.resizeDelay);
        _.resizeDelay = setTimeout(function () {
          var winWidth = $(window).width();
          var didntActuallyResize = _.windowWidth === winWidth;
          _.windowWidth = winWidth;

          if (didntActuallyResize) {
            if (event.type === "resize") return;
          }

          if (_.windowWidth > mobileBkpt) {
            _.$element.removeClass(inMobileCss).removeClass(openHeaderCss);

            _.isActive = false;
          } else {
            //in mobile
            _.$element.addClass(inMobileCss);
          }
        }, 100);
      }).trigger(EVENT_NAME);
    }
  }, {
    key: "headerClick",
    value: function headerClick() {
      var _ = this;

      var toggling = null;

      _.$element.on("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME), "".concat(_.params.clickHeader, ", .close-dd-nav"), function (event) {
        var _$params4 = _.params,
            toggleBody = _$params4.toggleBody,
            togglingCss = _$params4.togglingCss,
            toggleCss = _$params4.toggleCss,
            openHeaderCss = _$params4.openHeaderCss,
            mobileBkpt = _$params4.mobileBkpt,
            duration = _$params4.duration,
            outsideClickElem = _$params4.outsideClickElem;

        if (_.windowWidth < mobileBkpt) {
          _.$element.addClass(togglingCss);

          toggling && clearTimeout(toggling);
          toggling = setTimeout(function () {
            _.$element.removeClass(togglingCss);
          }, duration);

          if (!_.isActive) {
            _.$element.toggleClass(openHeaderCss);

            _.outsideClickClose();

            setTimeout(function () {
              $(toggleBody, _.$element).addClass(toggleCss);
            }, _util_constants__WEBPACK_IMPORTED_MODULE_0__.CSS_TRANSISTION_DELAY);
            _.isActive = true;
          } else {
            $(toggleBody, _.$element).removeClass(toggleCss);

            _.$element.toggleClass(openHeaderCss);

            $(outsideClickElem).off("click.".concat(EVENT_NAME));
            _.isActive = false;
          }

          event.stopPropagation();
        }
      });
    }
  }], [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_instance"));
        var params = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_params"));
        $(params.outsideClickElem).trigger("".concat(EVENT_NAME, "remove"));
        $(params.outsideClickElem).off("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME, " ").concat(EVENT_NAME, "remove"));
        $(window).off("resize.".concat(EVENT_NAME, " ").concat(EVENT_NAME));
        instance.$element.off("click.".concat(EVENT_NAME, " ").concat(EVENT_NAME));
        instance.$element.find(".".concat(params.closeBtnDivCss)).remove();
        (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_params"), null, true);
        (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_instance"), null, true);
      });
    }
  }, {
    key: "iosOutsideClickSupport",
    value: function iosOutsideClickSupport() {
      var _ = this;

      if (_.is_ios && !_.styleAdded) {
        $(_.params.outsideClickElem).css({
          cursor: 'pointer'
        });
        _.styleAdded = true;
      }
    }
  }]);

  return ResponsiveDropDown;
}();


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});