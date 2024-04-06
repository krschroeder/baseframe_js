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

/***/ "./src/assets/js/core/UrlState.ts":
/*!****************************************!*\
  !*** ./src/assets/js/core/UrlState.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   get: () => (/* binding */ get),\n/* harmony export */   print: () => (/* binding */ print),\n/* harmony export */   refresh: () => (/* binding */ refresh),\n/* harmony export */   set: () => (/* binding */ set),\n/* harmony export */   setHashVal: () => (/* binding */ setHashVal),\n/* harmony export */   toUrl: () => (/* binding */ toUrl)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n\nconst EVENT_NAME = 'UrlState';\nconst urlStateMap = new Map([\n    ['search', new URLSearchParams(location.search.replace('?', ''))],\n    ['hash', new URLSearchParams(location.hash.replace('#', ''))]\n]);\nconst toUrl = (state = 'replace') => {\n    let vals = '';\n    const hash = urlStateMap.get('hash').toString();\n    const search = urlStateMap.get('search').toString();\n    (search !== '') ? vals += '?' + search : vals += location.href.split(/(\\?|\\#)/)[0];\n    if (hash !== '')\n        vals += '#' + hash;\n    // clean-up\n    vals = vals.replace(/(\\=\\&)+/g, '&').replace(/\\=$/, '');\n    state === \"replace\" ? history.replaceState(null, '', vals) : history.pushState(null, '', vals);\n};\nconst setHashVal = (value, state) => {\n    const params = urlStateMap.get('hash');\n    for (const key of params.keys()) {\n        params.delete(key);\n    }\n    if (value !== null)\n        params.set(value, '');\n    if (state) {\n        toUrl(state);\n    }\n};\nconst set = (type, paramName, value, state) => {\n    if (type === 'hashVal') {\n        console.warn(`use 'setHashVal' method for setting only the hash val`);\n        return;\n    }\n    const params = urlStateMap.get(type);\n    if (value === null) {\n        params.has(paramName) && params.delete(paramName);\n    }\n    else {\n        const isArray = Array.isArray(value);\n        const adjustedVal = isArray ? `[${value.join(',')}]` : value;\n        params.set(paramName, adjustedVal);\n    }\n    if (state) {\n        toUrl(state);\n    }\n};\nconst get = (type, paramName) => {\n    const params = urlStateMap.get(type);\n    if (type === 'hashVal') {\n        return location.hash.replace('#', '');\n    }\n    if (params.has(paramName)) {\n        const rawVal = params.get(paramName).trim();\n        if (rawVal.slice(0, 1) === '[' && rawVal.slice(-1) === ']') {\n            const valSplits = rawVal.slice(1, -1).split(',');\n            return valSplits.map(el => !(/\\D/).test(el) ? +el : el);\n        }\n        else {\n            return rawVal;\n        }\n    }\n    return null;\n};\nconst refresh = (on = true) => {\n    if (on) {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).off(`popstate.${EVENT_NAME}`).on(`popstate.${EVENT_NAME}`, () => {\n            urlStateMap.set('search', new URLSearchParams(location.search.replace('?', '')));\n            urlStateMap.set('hash', new URLSearchParams(location.hash.replace('#', '')));\n        });\n    }\n    else {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).off(`popstate.${EVENT_NAME}`);\n    }\n};\n// print URL params\nconst print = (type, options) => {\n    const params = urlStateMap.get(type), defaultOptions = { pattern: 'normal', brackets: true }, { pattern, brackets } = Object.assign(defaultOptions, options), bkts = brackets ? '[]' : '';\n    if (pattern === 'repeat') {\n        return [...params.keys()].map((key) => {\n            const val = get(type, key);\n            if (Array.isArray(val)) {\n                return val.map(el => `${key}${bkts}=${encodeURIComponent(el)}`).join('&');\n            }\n            return `${key}=${val}`;\n        }).join('&');\n    }\n    return params.toString();\n};\n// run refresh initially\nrefresh();\nconst UrlState = {\n    refresh,\n    print,\n    toUrl,\n    set,\n    setHashVal,\n    get\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UrlState);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/core/UrlState.ts?");

/***/ }),

/***/ "cash-dom":
/*!********************!*\
  !*** external "$" ***!
  \********************/
/***/ ((module) => {

module.exports = $;

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/core/UrlState.ts");
/******/ 	
/******/ })()
;