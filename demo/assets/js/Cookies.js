/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/fn/Cookies.ts":
/*!*************************************!*\
  !*** ./src/assets/js/fn/Cookies.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Cookies = {\n    get(name) {\n        const arg = name + \"=\";\n        const alen = arg.length;\n        const clen = document.cookie.length;\n        let i = 0;\n        while (i < clen) {\n            let j = i + alen;\n            if (document.cookie.substring(i, j) == arg) {\n                return getCookieVal(j);\n            }\n            i = document.cookie.indexOf(\" \", i) + 1;\n            if (i == 0)\n                break;\n        }\n        return \"\";\n    },\n    set(name, value, props = {}) {\n        const d = new Date();\n        d.setTime(d.getTime() + ((props.expires || 0) * 60 * 1000));\n        const expires = props.expires ? d.toUTCString() : null;\n        document.cookie = name + \"=\" + encodeURI(value) +\n            ((expires) ? \"; expires=\" + expires : \"\") +\n            \"; path=\" + (props.path ? props.path : \"/\") +\n            ((props.domain) ? \"; domain=\" + props.domain : \"\") +\n            ((props.sameSite) ? \"; sameSite=\" + props.sameSite : \"\") +\n            ((props.secure || props.sameSite && props.sameSite.toLowerCase() === \"none\") ? \"; secure\" : \"\");\n    },\n    remove(name, path, domain) {\n        if (this.get(name)) {\n            document.cookie = name + \"=\" +\n                ((path) ? \"; path=\" + path : \"\") +\n                ((domain) ? \"; domain=\" + domain : \"\") +\n                \"; expires=Thu, 01-Jan-70 00:00:01 GMT\";\n        }\n    },\n};\n//utility\nfunction getCookieVal(offset) {\n    let endstr = document.cookie.indexOf(\";\", offset);\n    if (endstr == -1) {\n        endstr = document.cookie.length;\n    }\n    return decodeURI(document.cookie.substring(offset, endstr));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cookies);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/fn/Cookies.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/js/fn/Cookies.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;