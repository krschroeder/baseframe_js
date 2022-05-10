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
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
__webpack_require__.r(__webpack_exports__);
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
/******/ 	return __webpack_exports__;
/******/ })()
;
});