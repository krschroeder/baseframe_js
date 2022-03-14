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

/***/ 693:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ AccessibleMenu; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(225);
/* harmony import */ var _util_visible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(428);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
/* harmony import */ var _util_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(180);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var VERSION = "1.2.0";
var DATA_NAME = 'AccessibleMenu';
var EVENT_NAME = 'accessibleMenu';
var DEFAULTS = {
  keyDirections: ['horizontal', 'vertical', 'vertical'],
  focusCss: 'focus'
};

var escapeKey = function escapeKey(e, $ulParents, focusCss) {
  if (e.key == _util_constants_js__WEBPACK_IMPORTED_MODULE_1__.KEYS.ESC) {
    if ($ulParents.length > 1) {
      var $anchor = (0,_util_visible__WEBPACK_IMPORTED_MODULE_2__.default)($ulParents.eq(0).closest('li').find('a'));
      $anchor[0].focus();
      $anchor.parent('li').addClass(focusCss);
    }

    e.preventDefault();
  }
};

var focusListItem = function focusListItem(activeElem, $ulParents, focusCss, prev) {
  var $aeLi = $(activeElem).parent('li');
  var $el = prev ? (0,_util_visible__WEBPACK_IMPORTED_MODULE_2__.default)($aeLi.prev('li')) : (0,_util_visible__WEBPACK_IMPORTED_MODULE_2__.default)($aeLi.next('li'));

  if ($el.length) {
    $el.addClass(focusCss).siblings('li').removeClass(focusCss);
    $el.find('a')[0].focus();
  } else {
    if ($ulParents.length > 1) {
      var $anchor = (0,_util_visible__WEBPACK_IMPORTED_MODULE_2__.default)($ulParents.eq(0).parent('li').find('a'));

      if ($anchor.length) {
        $anchor[0].focus();
        $anchor.parent('li').eq(0).addClass(focusCss);
      }
    }
  }
};

var focusNestledListItem = function focusNestledListItem(activeElem, focusCss) {
  var $el = (0,_util_visible__WEBPACK_IMPORTED_MODULE_2__.default)($(activeElem).parent('li').find('li'));

  if ($el.length) {
    $el.addClass(focusCss).siblings('li').removeClass(focusCss);
    (0,_util_visible__WEBPACK_IMPORTED_MODULE_2__.default)($el.find('a'))[0].focus();
  }
};

var prev = function prev(e, $ulParents, activeElem, focusCss, keyDirections) {
  var l = $ulParents.length - 1;

  if (e.key === _util_constants_js__WEBPACK_IMPORTED_MODULE_1__.KEYS.LEFT && keyDirections[l] === "horizontal" || e.key === _util_constants_js__WEBPACK_IMPORTED_MODULE_1__.KEYS.UP && keyDirections[l] === "vertical" || e.key === _util_constants_js__WEBPACK_IMPORTED_MODULE_1__.KEYS.LEFT && keyDirections[l] === "vertical" && l > 1 && keyDirections[l - 1] === "vertical" && $(activeElem).parent('li').index() === 0) {
    focusListItem(activeElem, $ulParents, focusCss, true);
    e.preventDefault();
  }
};

var next = function next(e, $ulParents, activeElem, focusCss, keyDirections) {
  var l = $ulParents.length - 1;

  if ( //go to sibling <li>
  e.key === _util_constants_js__WEBPACK_IMPORTED_MODULE_1__.KEYS.RIGHT && keyDirections[l] === "horizontal" || e.key === _util_constants_js__WEBPACK_IMPORTED_MODULE_1__.KEYS.DOWN && keyDirections[l] === "vertical") {
    focusListItem(activeElem, $ulParents, focusCss, false);
    e.preventDefault();
  }

  if ( //go to the nestled <li>
  e.key === _util_constants_js__WEBPACK_IMPORTED_MODULE_1__.KEYS.RIGHT && keyDirections[l] === "vertical" || e.key === _util_constants_js__WEBPACK_IMPORTED_MODULE_1__.KEYS.DOWN && keyDirections[l] === "horizontal") {
    focusNestledListItem(activeElem, focusCss);
    e.preventDefault();
  }
};

var AccessibleMenu = /*#__PURE__*/function () {
  _createClass(AccessibleMenu, null, [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"));
        var $el = $(instance.element);
        $el.off('focusin.' + EVENT_NAME);
        $el.off('mouseleave.' + EVENT_NAME);
        $el.off('blur.' + EVENT_NAME);
        $el.off('keydown.' + EVENT_NAME);
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

  function AccessibleMenu(element, options) {
    _classCallCheck(this, AccessibleMenu);

    var _ = this;

    _.element = element;
    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_3__.default)($(element).data(DATA_NAME + '-options'));
    (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, AccessibleMenu.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"));

    _.init();

    return this;
  }

  _createClass(AccessibleMenu, [{
    key: "init",
    value: function init() {
      var _ = this;

      var to = null;
      $(_.element).on('focusin.' + EVENT_NAME, 'a', function (e) {
        to && clearTimeout(to);
        $(this).parent('li').addClass('focus').siblings('li').removeClass('focus');
      }).on('mouseleave.' + EVENT_NAME, function () {
        $(this).find('li.focus').removeClass('focus');
      }).on('focusout.' + EVENT_NAME, function () {
        var _this = this;

        to = setTimeout(function () {
          $(_this).find('li.focus').removeClass('focus');
        }, 200);
      });
      $(_.element).on('keydown.' + EVENT_NAME, function (e) {
        e = e || window.event;
        var _$params = _.params,
            focusCss = _$params.focusCss,
            keyDirections = _$params.keyDirections;
        var activeElem = document.activeElement;
        var $ulParents = $(activeElem).parents('ul');
        var props = [e, $ulParents, activeElem, focusCss, keyDirections];
        escapeKey(e, $ulParents);
        prev.apply(void 0, props);
        next.apply(void 0, props);
      });
    }
  }]);

  return AccessibleMenu;
}();



/***/ }),

/***/ 544:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(134);
var _this = undefined;


var defaults = {
  delay: 200,
  eventName: 'BackgroundImageLoad',
  bgDataName: 'bg-img'
};

var bgResponsiveLoad = function bgResponsiveLoad() {
  var bgElem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.bg-responsive';
  var options = arguments.length > 1 ? arguments[1] : undefined;
  var _ = _this;
  var params = $.extend(defaults, options);
  var eventName = params.eventName,
      delay = params.delay;
  var resizeThrottle = null;
  $(window).on("resize.".concat(eventName), function () {
    resizeThrottle && clearTimeout(resizeThrottle);
    resizeThrottle = setTimeout(loadVisibleImageElem, delay, bgElem, params);
  });
  loadVisibleImageElem(bgElem, params);
};

function loadVisibleImageElem(bgElem, params) {
  var eventName = params.eventName,
      bgDataName = params.bgDataName;
  $(bgElem).each(function () {
    var $this = $(this);
    var bgImg = $this.data(bgDataName);

    if ((0,_util_helpers__WEBPACK_IMPORTED_MODULE_0__.isVisible)(this) && bgImg) {
      $this.css({
        'background-image': "url(\"".concat(bgImg, "\")")
      });
      $this.removeAttr('data-bg-img');
    }
  });

  if (!$("".concat(bgElem, "[data-").concat(bgDataName, "]")).length) {
    $(window).off("resize.".concat(eventName));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (bgResponsiveLoad);

/***/ }),

/***/ 302:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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



/***/ }),

/***/ 634:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

var cookies = {
  get: function get(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;

    while (i < clen) {
      var j = i + alen;

      if (document.cookie.substring(i, j) == arg) {
        return getCookieVal(j);
      }

      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0) break;
    }

    return "";
  },
  set: function set(name, value) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var d = new Date();
    d.setTime(d.getTime() + (props.expires || 0) * 60 * 1000);
    var expires = props.expires ? d.toUTCString() : null;
    document.cookie = name + "=" + encodeURI(value) + (expires ? "; expires=" + expires : "") + "; path=" + (props.path ? props.path : "/") + (props.domain ? "; domain=" + props.domain : "") + (props.sameSite ? "; sameSite=" + props.sameSite : "") + (props.secure || props.sameSite && props.sameSite.toLowerCase() === "none" ? "; secure" : "");
  },
  remove: function remove(name, path, domain) {
    if (this.get(name)) {
      document.cookie = name + "=" + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
  }
}; //utility

function getCookieVal(offset) {
  var endstr = document.cookie.indexOf(";", offset);

  if (endstr == -1) {
    endstr = document.cookie.length;
  }

  return decodeURI(document.cookie.substring(offset, endstr));
}

/* harmony default export */ __webpack_exports__["default"] = (cookies);

/***/ }),

/***/ 331:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EqualizeContent; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(225);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var VERSION = "2.0.2";
var DATA_NAME = 'EqualizeContent';
var EVENT_NAME = 'equalizeContent';

var EqualizeContent = /*#__PURE__*/function () {
  _createClass(EqualizeContent, null, [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"));
        var $el = $(instance.element);
        $(window).off("resize.".concat(EVENT_NAME, " ").concat(EVENT_NAME));
        $el.find('img').off("load.".concat(EVENT_NAME));
        instance.$equalizeItems.css(instance.elementHeight, '');
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
        equalizeItem: '.equalize',
        startWidth: 0,
        stopWidth: 480,
        timerDelay: 100,
        useHeight: false,
        //instead of using min-height
        useMargin: false,
        aligningCss: 'flex-l',
        resizeCss: 'in-resize',
        fuzzy: 1
      };
    }
  }]);

  function EqualizeContent(element, options) {
    _classCallCheck(this, EqualizeContent);

    var _ = this;

    _.element = element;
    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_1__.default)($(element).data(EVENT_NAME + '-options'));
    (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, EqualizeContent.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"));
    _.elementHeight = _.params.useHeight ? 'height' : 'min-height';
    _.$equalizeItems = $(_.params.equalizeItem, _.element);
    _.aligningCSS = $(_.element).hasClass(_.params.aligningCss);
    _.winWidth = $(window).width();
    _.matches = [];
    _.matchesMade = 0;

    _.init(_.element, _.params);

    return _;
  }

  _createClass(EqualizeContent, [{
    key: "init",
    value: function init() {
      var _ = this;

      var resizeTimer;
      $(window).on("resize.".concat(EVENT_NAME, " ").concat(EVENT_NAME), function (e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          _.equalize();
        }, _.params.timerDelay);
      });

      _.imgsLoadedReEqualize();

      _.equalize();
    }
  }, {
    key: "imgsLoadedReEqualize",
    value: function imgsLoadedReEqualize() {
      var _ = this;

      var $images = $('img', _.element);
      var imgl = $images.length - 1;
      var i = 0;
      if (imgl === 0) return;
      $('img', _.element).on("load.".concat(EVENT_NAME), function () {
        i++;

        if (imgl === i) {
          $(window).trigger(EVENT_NAME);
        }
      });
    }
  }, {
    key: "buildMatchArray",
    value: function buildMatchArray() {
      "use strict";

      var _ = this;

      _.matchesMade = 0;
      _.matches = []; //clear out the array

      _.$equalizeItems.css(_.elementHeight, '').each(function (index) {
        var $this = $(this);
        var thisTop = Math.floor($this.offset().top);
        var thisHeight = $this.outerHeight();
        var noMatch = true;

        if (_.params.useMargin) {
          //the $(elem).outerHeight(true) for using margin produces a bug in
          //chrome around version 64,.. this is the workaround for it.
          thisHeight += parseFloat($this.css('margin-top'));
          thisHeight += parseFloat($this.css('margin-bottom'));
        }

        _.matchesMade += 1;

        for (var i = 0, l = _.matches.length; i < l; i += 1) {
          if (_.getYPos(_.matches[i].ypos, thisTop)) {
            noMatch = false;

            _.matches[i].elems.push(index);

            if (_.matches[i].tallest < thisHeight) {
              _.matches[i].tallest = thisHeight;
            }

            break;
          }
        }

        if (_.matches.length === 0 || noMatch) {
          _.matches.push({
            ypos: thisTop,
            elems: [index],
            tallest: thisHeight
          });
        }
      });
    }
  }, {
    key: "getYPos",
    value: function getYPos(a, b) {
      var _ = this;

      if (a === b || Math.abs(a - b) <= _.params.fuzzy) {
        return true;
      }

      return false;
    }
  }, {
    key: "assignHeightsToElems",
    value: function assignHeightsToElems() {
      var _ = this;

      if (_.matchesMade + 1 !== _.matches.length) {
        _.$equalizeItems.addClass(_.params.resizeCss);

        var _loop = function _loop(i, l) {
          _.matches[i].elems.forEach(function (index) {
            _.$equalizeItems.eq(index).css(_.elementHeight, _.matches[i].tallest);
          });
        };

        for (var i = 0, l = _.matches.length; i < l; i += 1) {
          _loop(i, l);
        }

        _.$equalizeItems.removeClass(_.params.resizeCss);
      }
    }
  }, {
    key: "equalize",
    value: function equalize() {
      var _ = this;

      _.winWidth = $(window).width();
      var _$params = _.params,
          startWidth = _$params.startWidth,
          stopWidth = _$params.stopWidth,
          resizeCss = _$params.resizeCss,
          aligningCss = _$params.aligningCss; //if it doesn't have any elements exit the function

      if (!_.$equalizeItems.length) {
        return;
      }

      if (_.winWidth > stopWidth && _.winWidth > startWidth) {
        $(_.element).addClass(resizeCss);

        if (!_.aligningCSS) {
          $(_.element).addClass(aligningCss);
        }

        _.buildMatchArray();

        _.assignHeightsToElems();

        $(_.element).removeClass(resizeCss);

        if (!_.aligningCSS) {
          $(_.element).removeClass(aligningCss);
        }
      } else {
        _.$equalizeItems.css(_.elementHeight, '');
      }
    }
  }]);

  return EqualizeContent;
}();



/***/ }),

/***/ 197:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

var VERSION = "1.0.0";
var formInputs = {
  version: VERSION,
  radioCheckboxEnableSpacebar: function radioCheckboxEnableSpacebar() {
    var _ = formInputs;
    $(window).on('keydown.radioCheckboxEnableSpacebar radioCheckboxEnableSpacebar', function (ev) {
      var e = ev || window.event;
      var key = e.keyCode || e.which;
      var SPACE = 32;
      var ACTIVE_ELEM = document.activeElement;

      if (key === SPACE && ACTIVE_ELEM.nodeName.toUpperCase() === 'LABEL') {
        ACTIVE_ELEM.click();
        e.preventDefault();
        e.stopPropagation();
      }
    });
    return _;
  },
  init: function init() {
    var _ = formInputs;

    _.radioCheckboxEnableSpacebar();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (formInputs);

/***/ }),

/***/ 285:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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



/***/ }),

/***/ 901:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NavDesktop; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(225);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var VERSION = "1.1.2";
var DATA_NAME = 'NavDesktop';
var EVENT_NAME = 'navDesktop';

var NavDesktop = /*#__PURE__*/function () {
  _createClass(NavDesktop, null, [{
    key: "remove",
    value: function remove(element) {
      $(element).each(function () {
        var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"));
        var $el = $(instance.element);
        $el.find('ul').on("mouseover.".concat(EVENT_NAME));
        $el.off("mouseout.".concat(EVENT_NAME));
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
        stopWidth: 768,
        delay: 800,
        edgeCss: 'ul-on-edge',
        outerElem: 'body',
        ulHasCss: 'has-ul',
        ulNotCss: 'no-ul',
        navHoveredCss: 'desktop-nav-hovered',
        hoverCss: 'hover',
        submenuBtnCss: 'btn-nav--mb-submenu i i-arrow-b'
      };
    }
  }]);

  function NavDesktop(element, options) {
    _classCallCheck(this, NavDesktop);

    var _ = this;

    _.stayHover = null;
    _.element = element;
    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_1__.default)($(element).data(DATA_NAME + '-options'));
    (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, NavDesktop.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"));

    _.addCssToElems();

    _.init();

    return this;
  }

  _createClass(NavDesktop, [{
    key: "addCssToElems",
    value: function addCssToElems() {
      var _ = this;

      var _$params = _.params,
          ulNotCss = _$params.ulNotCss,
          ulHasCss = _$params.ulHasCss;
      $('li', _.element).addClass(ulNotCss).has('ul').each(function () {
        $(this).removeClass(ulNotCss);

        if (!$(this).hasClass(ulHasCss)) {
          $(this).addClass(ulHasCss);
        }
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _ = this;

      var prevEvent = null;

      var evtTracker = function evtTracker(elem, e, cb) {
        var currEvent = e.type;
        var containsOrISElem = elem.isSameNode(e.target) ? true : !!$(e.target).parents(elem).length;

        if (!prevEvent || prevEvent !== currEvent && containsOrISElem) {
          prevEvent = currEvent;
          cb();
        }
      };

      $(_.element).find('ul').on("mouseover.".concat(EVENT_NAME), 'li,ul', function (e) {
        var li = this;
        var _$params2 = _.params,
            outerElem = _$params2.outerElem,
            navHoveredCss = _$params2.navHoveredCss,
            hoverCss = _$params2.hoverCss;
        evtTracker(li, e, function () {
          _.edgeDetector(li);

          var liLiParents = $(li).parents('li');
          li.classList.add(hoverCss);
          liLiParents.addClass(hoverCss);
          $(li).find(".".concat(hoverCss)).removeClass(hoverCss);
          $(li).siblings('li').removeClass(hoverCss);
          liLiParents.length === 0 && $(_.element).find(".".concat(hoverCss)).removeClass(hoverCss);
          _.stayHover && clearTimeout(_.stayHover);
          $(outerElem).addClass(navHoveredCss);
        });
      }).on("mouseout.".concat(EVENT_NAME), 'li,ul', function (e) {
        var li = this;
        var _$params3 = _.params,
            edgeCss = _$params3.edgeCss,
            delay = _$params3.delay,
            navHoveredCss = _$params3.navHoveredCss,
            hoverCss = _$params3.hoverCss,
            outerElem = _$params3.outerElem;
        evtTracker(li, e, function () {
          _.stayHover = setTimeout(function () {
            $(_.element).find(".".concat(hoverCss)).removeClass("".concat(hoverCss, " ").concat(edgeCss));
            $(_.element).find(".".concat(edgeCss)).removeClass(edgeCss);
            $(outerElem).removeClass(navHoveredCss);
          }, delay);
        });
      });
    }
  }, {
    key: "edgeDetector",
    value: function edgeDetector(li) {
      var _ = this;

      var _$params4 = _.params,
          edgeCss = _$params4.edgeCss,
          stopWidth = _$params4.stopWidth;
      var dw = $(window).width();

      if (stopWidth < dw) {
        var $uls = $('ul', li);
        var $ul = $uls.eq(0),
            l = $ul.offset() ? $ul.offset().left : 0,
            uw = $ul.width(),
            fullyVisible = l + uw <= dw;

        if (!fullyVisible) {
          li.classList.add(edgeCss);
        }
      }
    }
  }]);

  return NavDesktop;
}();



/***/ }),

/***/ 734:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NavMobile; },
/* harmony export */   "NavMobileNestled": function() { return /* binding */ NavMobileNestled; }
/* harmony export */ });
/* harmony import */ var _util_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(180);
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(225);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(134);
/* harmony import */ var _util_plugin_nav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(816);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(814);
/* harmony import */ var _util_trap_focus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(505);
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







var VERSION = "1.5.1";
var DATA_NAME = 'NavMobile';
var EVENT_NAME = 'navMobile';

var NavMobile = /*#__PURE__*/function () {
  _createClass(NavMobile, null, [{
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
        doTrapFocus: true,
        trapFocusElem: null,
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

    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_3__.default)($(element).data(EVENT_NAME + '-options')); //props

    _.$element = $(element);
    (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, NavMobile.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, "".concat(DATA_NAME, "_params")); //run the methods

    _.addChildNavClass();

    _.menuButtonClick();

    _.menuNavigationClick();

    _.checkIfEnabled();

    _.outsideClickClose();

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
          slideDuration = _$params.slideDuration,
          doTrapFocus = _$params.doTrapFocus,
          trapFocusElem = _$params.trapFocusElem;
      var trappedFocus = null;

      if (_.menuOpened === true) {
        _.$element.parent().find(".".concat(_.params.menuOpenCss)).removeClass(_.params.menuOpenCss).find("[style]").css('display', '');

        $(outerElement).removeClass(menuOpenCss + ' ' + menuIsClosingCss);
        setTimeout(function () {
          $(outerElement).removeClass(menuIsClosingCss);
        }, slideDuration);
        _.menuOpened = false;
        trappedFocus && trappedFocus.remove();

        _.params.afterClose();
      } else {
        _.$element.addClass(menuOpenCss);

        $(outerElement).addClass(menuOpenCss + ' ' + menuIsOpeningCss);
        setTimeout(function () {
          $(outerElement).removeClass(menuIsOpeningCss);
        }, slideDuration);
        _.menuOpened = true;

        if (doTrapFocus) {
          trappedFocus = (0,_util_trap_focus_js__WEBPACK_IMPORTED_MODULE_2__.default)(trapFocusElem || _.$element, {
            nameSpace: EVENT_NAME
          });
        }

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
          $a.after((0,_util_plugin_nav__WEBPACK_IMPORTED_MODULE_4__.default)(_.params, $a.text()));
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

          $(_.params.enableBtn)[0].focus();
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
    key: "outsideClickClose",
    value: function outsideClickClose() {
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
          _.allowClick = typeof _.params.bkptEnable === 'number' ? $(window).width() <= _.params.bkptEnable : (0,_util_helpers__WEBPACK_IMPORTED_MODULE_5__.isVisible)($(_.params.enableBtn)[0]);
        }, e.type === EVENT_NAME ? 0 : 200);
      }).trigger(EVENT_NAME);
    }
  }], [{
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

/***/ }),

/***/ 319:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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



/***/ }),

/***/ 119:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Popup; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(225);
/* harmony import */ var _util_guid_generate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(994);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(134);
/* harmony import */ var _util_get_param__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(534);
/* harmony import */ var _util_plugin_update_history_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(683);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(814);
/* harmony import */ var _util_trap_focus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(505);
/* harmony import */ var _util_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(180);
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
        photoRegex: _util_helpers__WEBPACK_IMPORTED_MODULE_4__.photoRegex,
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

    var dataOptions = (0,_util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_5__.default)($(element).data(EVENT_NAME + '-options'));
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
    (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, Popup.defaults, instanceDefaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, "".concat(DATA_NAME, "_params"));

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
        (0,_util_plugin_update_history_state__WEBPACK_IMPORTED_MODULE_6__.default)(_, _.historyID.substring(1));
        _.isOpen ? _.close() : _.loadPopup(this);
      });

      $(window).on("popstate.".concat(_.popupEventName, " ").concat(_.popupEventName), function (e) {
        var _$params2 = _.params,
            useLocationHash = _$params2.useLocationHash,
            useHashFilter = _$params2.useHashFilter;

        if (useLocationHash && _.params.historyType === 'push') {
          if (_.historyID === _.isOpenHash || _.historyID === (useHashFilter ? (0,_util_get_param__WEBPACK_IMPORTED_MODULE_7__.getHashParam)(useHashFilter) : location.hash)) {
            _.isOpen ? _.close() : _.loadPopup(_.$element);
          }
        }

        e.preventDefault();
      });

      if (launch) {
        _.loadPopup(document.activeElement);
      }

      if (loadLocationHash && _.historyID === (useHashFilter ? '#' + (0,_util_get_param__WEBPACK_IMPORTED_MODULE_7__.getHashParam)(useHashFilter) : location.hash)) {
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

      _.isOpenHash = useHashFilter ? (0,_util_get_param__WEBPACK_IMPORTED_MODULE_7__.getHashParam)(useHashFilter) : location.hash;

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
            return (0,_util_helpers__WEBPACK_IMPORTED_MODULE_4__.isVisible)(el) && el.tabIndex !== -1;
          }).eq(0);

          $firstAnchor.length ? $firstAnchor[0].focus() : _.$popup.find('.popup__btn-close')[0].focus();
        }, fadeIn + 100);
      }

      if (trapPopupFocus) {
        setTimeout(function () {
          _.trappedFocus = (0,_util_trap_focus_js__WEBPACK_IMPORTED_MODULE_2__.default)(_.$popup, {
            nameSpace: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_4__.camelCase)(_.params.popupID)
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

          if (key == _util_constants_js__WEBPACK_IMPORTED_MODULE_3__.KEYS.LEFT || key == _util_constants_js__WEBPACK_IMPORTED_MODULE_3__.KEYS.RIGHT) {
            _.toggleGroup(key == _util_constants_js__WEBPACK_IMPORTED_MODULE_3__.KEYS.LEFT, key == _util_constants_js__WEBPACK_IMPORTED_MODULE_3__.KEYS.RIGHT);
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
      }, _util_constants_js__WEBPACK_IMPORTED_MODULE_3__.CSS_TRANSISTION_DELAY);
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

        if (key === _util_constants_js__WEBPACK_IMPORTED_MODULE_3__.KEYS.ESC) {
          _.closeEvent();
        }
      });
    }
  }, {
    key: "closeEvent",
    value: function closeEvent() {
      var _ = this;

      (0,_util_plugin_update_history_state__WEBPACK_IMPORTED_MODULE_6__.default)(_, _.historyID.substring(1), true);

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
        var params = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_params"));
        (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, INSTANCE_NAME, null, true);
        var popupEventName = EVENT_NAME + params.popupID;
        $(this).off("".concat(params.enableEvent, ".").concat(popupEventName));
        $(this).off("".concat(popupEventName));
        $(document).off("keydown.".concat(popupEventName, "groupcontrols"));
        $(document).off("keydown.".concat(popupEventName));
        (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_params"), null, true);
        (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(this, "".concat(DATA_NAME, "_instance"), null, true);
      });
    }
  }, {
    key: "close",
    value: function close(element) {
      var refocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, INSTANCE_NAME) || element;

      if (instance) {
        instance.close(refocus);
      }
    }
  }, {
    key: "show",
    value: function show(element) {
      var instance = (0,_util_store__WEBPACK_IMPORTED_MODULE_1__.elData)(element, INSTANCE_NAME);

      if (instance) {
        instance.loadPopup(element);
      }
    }
  }]);

  return Popup;
}();



/***/ }),

/***/ 179:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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



/***/ }),

/***/ 50:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Tabs; }
/* harmony export */ });
/* harmony import */ var _util_formatting_valid_json_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(225);
/* harmony import */ var _util_get_param__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(534);
/* harmony import */ var _util_plugin_update_history_state_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(683);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var VERSION = "1.2.0";
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
    (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"), $.extend({}, Tabs.defaults, options, dataOptions));
    _.params = (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(element, "".concat(DATA_NAME, "_params"));
    _.$tabsList = _.$element.find(".".concat(_.params.tabsHeadCss)).first();
    _.$tabsBody = _.$element.find(".".concat(_.params.tabsBodyCss)).first();
    _.prevTabId = '#'; //init

    _.ADA_Attributes();

    _.tabsChangeEvent();

    _.changeTabElements(_.getTabFromHash(), true);

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
        defaultTab = (0,_util_get_param__WEBPACK_IMPORTED_MODULE_2__.getHashParam)(useHashFilter);
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
    key: "ADA_Attributes",
    value: function ADA_Attributes() {
      var _ = this;

      var _$params2 = _.params,
          tabsBodyItemCss = _$params2.tabsBodyItemCss,
          addIDtoPanel = _$params2.addIDtoPanel;

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

      var _$params3 = _.params,
          activeCss = _$params3.activeCss,
          tabsBodyCss = _$params3.tabsBodyCss,
          tabsBodyItemCss = _$params3.tabsBodyItemCss,
          tabsBodyItemShowCss = _$params3.tabsBodyItemShowCss;

      var $tabSelectedItem = _.$tabsBody.find(".".concat(tabsBodyItemCss, "[data-tab-id=\"").concat(tabId, "\"]"));

      if ($tabSelectedItem.length) {
        _.params.beforeChange(_.prevTabId, _.$tabsList, _.$tabsBody);

        var isInItsBody = $tabSelectedItem.closest(".".concat(tabsBodyCss))[0].isSameNode(_.$tabsBody[0]);
        if (!isInItsBody) return;

        _.$tabsList.find("a, button").attr({
          'aria-selected': false
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

        _.$tabsList.find("a[href=\"#".concat(tabId, "\"], button[data-href=\"#").concat(tabId, "\"]")).attr({
          'aria-selected': true
        }).addClass(activeCss) // if we have a list item
        .closest('li').addClass(activeCss);

        _.$tabsBody.find(".".concat(tabsBodyItemCss, "[data-tab-id=\"").concat(tabId, "\"]")).addClass(tabsBodyItemShowCss).attr({
          'aria-hidden': false
        });

        _.params.afterChange(tabId, _.$tabsList, _.$tabsBody);

        !init && (0,_util_plugin_update_history_state_js__WEBPACK_IMPORTED_MODULE_3__.default)(_, tabId, false, _.prevTabId);
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
        $(window).off("popstate.".concat(EVENT_NAME));
        (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_params"), null, true);
        (0,_util_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DATA_NAME, "_instance"), null, true);
      });
    }
  }]);

  return Tabs;
}();



/***/ }),

/***/ 180:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KEYS": function() { return /* binding */ KEYS; },
/* harmony export */   "CSS_TRANSISTION_DELAY": function() { return /* binding */ CSS_TRANSISTION_DELAY; }
/* harmony export */ });
/* unused harmony export photoRegex */
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
/* harmony default export */ __webpack_exports__["default"] = (getUrlParam);

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
/* harmony export */   "camelCase": function() { return /* binding */ camelCase; },
/* harmony export */   "photoRegex": function() { return /* binding */ photoRegex; }
/* harmony export */ });
/* unused harmony exports IE_Event, isHidden, kebabCase, isMobileOS, CSS_TRANSISTION_DELAY */
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

/***/ 854:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(134);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);



var checkIfParamsExist = function checkIfParamsExist(setParams, params) {
  var notify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  for (var k in params) {
    if (!{}.hasOwnProperty.call(setParams, k)) {
      notify && console.log(k, 'is not a property that can be used');
      delete params[k];
    }
  }

  return params;
};

var libraryExtend = function libraryExtend(Plugins) {
  var notify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var plugins = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.default)(Plugins) === 'array' ? Plugins : [Plugins];

  var _loop = function _loop(i, l) {
    var Plugin = plugins[i];
    var DataName = Plugin.pluginName;
    var pluginName = DataName.charAt(0).toLowerCase() + DataName.substring(1);

    $.fn[pluginName] = function (params) {
      var _ = this;

      return _.each(function (index) {
        var $this = $(this);
        var instance = (0,_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DataName, "_instance"));

        if (!instance) {
          var plugin = new Plugin($this, params, index);
          (0,_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DataName, "_instance"), plugin);
        } else {
          if (typeof params === 'string') {
            if (params === 'remove') {
              Plugin.remove($this);
            }

            return;
          }

          var instanceParams = (0,_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DataName, "_params"));
          checkIfParamsExist(instanceParams, params, notify);
          (0,_store__WEBPACK_IMPORTED_MODULE_0__.elData)(this, "".concat(DataName, "_params"), $.extend(instanceParams, params));
          notify && console.log("Params updated", instanceParams);
        }
      });
    };
  };

  for (var i = 0, l = plugins.length; i < l; i++) {
    _loop(i, l);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (libraryExtend);

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

/* harmony default export */ __webpack_exports__["default"] = (installStoreToLibrary);


/***/ }),

/***/ 105:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

var throttledResize = function throttledResize(callback) {
  var _namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'throttledResize';

  var manualTrigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
  var _throttledResize = null;
  var namespace = _namespace !== '' ? ".".concat(_namespace) : ''; //must pass in a function for the first argument else exit the script

  if (typeof callback !== 'function') {
    console.error('first parameter should be a function');
    return;
  }

  $(window).on("resize".concat(namespace).concat(manualTrigger && ' ' + _namespace), function (e) {
    clearTimeout(_throttledResize);
    _throttledResize = setTimeout(callback, delay, e);
  });

  if (manualTrigger) {
    $(window).trigger(_namespace);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (throttledResize);

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

/***/ }),

/***/ 428:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony export installVisible */
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(134);


var $visible = function $visible($el) {
  return $el.filter(function () {
    if ((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.isVisible)(this)) {
      return true;
    }
  });
};

var installVisible = function installVisible() {
  $.fn.visible = function () {
    return $visible(this);
  };
};
/* harmony default export */ __webpack_exports__["default"] = ($visible);

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
/* harmony export */   "libraryExtend": function() { return /* reexport safe */ _util_lib_extend__WEBPACK_IMPORTED_MODULE_1__.default; },
/* harmony export */   "AccessibleMenu": function() { return /* reexport safe */ _accessible_menu__WEBPACK_IMPORTED_MODULE_3__.default; },
/* harmony export */   "Collapse": function() { return /* reexport safe */ _collapse__WEBPACK_IMPORTED_MODULE_4__.default; },
/* harmony export */   "EqualizeContent": function() { return /* reexport safe */ _equalize_content__WEBPACK_IMPORTED_MODULE_9__.default; },
/* harmony export */   "NavDesktop": function() { return /* reexport safe */ _nav_desktop__WEBPACK_IMPORTED_MODULE_6__.default; },
/* harmony export */   "NavMobile": function() { return /* reexport safe */ _nav_mobile__WEBPACK_IMPORTED_MODULE_7__.default; },
/* harmony export */   "NavMobileNestled": function() { return /* reexport safe */ _nav_mobile__WEBPACK_IMPORTED_MODULE_7__.NavMobileNestled; },
/* harmony export */   "Parallax": function() { return /* reexport safe */ _parallax__WEBPACK_IMPORTED_MODULE_5__.default; },
/* harmony export */   "Popup": function() { return /* reexport safe */ _popup__WEBPACK_IMPORTED_MODULE_2__.default; },
/* harmony export */   "ResponsiveDropDown": function() { return /* reexport safe */ _responsive_dropdowns__WEBPACK_IMPORTED_MODULE_10__.default; },
/* harmony export */   "Tabs": function() { return /* reexport safe */ _tabs__WEBPACK_IMPORTED_MODULE_8__.default; },
/* harmony export */   "LazyLoad": function() { return /* reexport safe */ _lazy_load__WEBPACK_IMPORTED_MODULE_11__.default; },
/* harmony export */   "bgResponsiveLoad": function() { return /* reexport safe */ _bg_responsive_load__WEBPACK_IMPORTED_MODULE_14__.default; },
/* harmony export */   "cookies": function() { return /* reexport safe */ _cookies__WEBPACK_IMPORTED_MODULE_12__.default; },
/* harmony export */   "formInputs": function() { return /* reexport safe */ _form_input__WEBPACK_IMPORTED_MODULE_13__.default; },
/* harmony export */   "getHashParam": function() { return /* reexport safe */ _util_get_param__WEBPACK_IMPORTED_MODULE_15__.getHashParam; },
/* harmony export */   "getUrlParam": function() { return /* reexport safe */ _util_get_param__WEBPACK_IMPORTED_MODULE_15__.default; },
/* harmony export */   "smoothScroll": function() { return /* reexport safe */ _util_smooth_scroll__WEBPACK_IMPORTED_MODULE_16__.default; },
/* harmony export */   "throttledResize": function() { return /* reexport safe */ _util_throttle_resize__WEBPACK_IMPORTED_MODULE_17__.default; }
/* harmony export */ });
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(814);
/* harmony import */ var _util_lib_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(854);
/* harmony import */ var _util_smooth_scroll__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(35);
/* harmony import */ var _util_get_param__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(534);
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(119);
/* harmony import */ var _accessible_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(693);
/* harmony import */ var _collapse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(302);
/* harmony import */ var _parallax__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(319);
/* harmony import */ var _nav_desktop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(901);
/* harmony import */ var _nav_mobile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(734);
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(50);
/* harmony import */ var _equalize_content__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(331);
/* harmony import */ var _responsive_dropdowns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(179);
/* harmony import */ var _lazy_load__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(285);
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(634);
/* harmony import */ var _form_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(197);
/* harmony import */ var _util_throttle_resize__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(105);
/* harmony import */ var _bg_responsive_load__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(544);
//cash dom or jquery are a dependency
//not importing them because it can be either or

















 // this is needed for all to operate
// so I would say this makes sense

/* harmony default export */ __webpack_exports__["default"] = (_util_store__WEBPACK_IMPORTED_MODULE_0__.default);

}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});