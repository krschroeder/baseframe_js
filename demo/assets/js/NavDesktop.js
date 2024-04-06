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

/***/ "./src/assets/js/NavDesktop.ts":
/*!*************************************!*\
  !*** ./src/assets/js/NavDesktop.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NavDesktop)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/helpers */ \"./src/assets/js/util/helpers.ts\");\n/* harmony import */ var _core_Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/Store */ \"./src/assets/js/core/Store.ts\");\n\n\n\nconst VERSION = \"2.0.0\";\nconst DATA_NAME = 'NavDesktop';\nconst EVENT_NAME = 'navDesktop';\nconst DEFAULTS = {\n    stopWidth: 768,\n    delay: 800,\n    navLeavingDelay: 800,\n    outerElem: document.body,\n    cssPrefix: 'menu',\n    hoverCss: 'hover'\n};\nclass NavDesktop {\n    element;\n    params;\n    cssList;\n    stayHover;\n    navLeaving;\n    static defaults = DEFAULTS;\n    static get version() {\n        return VERSION;\n    }\n    constructor(element, options) {\n        const s = this;\n        s.stayHover;\n        s.navLeaving;\n        s.element = element;\n        const dataOptions = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.getDataOptions)(element, EVENT_NAME);\n        s.params = cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend({}, NavDesktop.defaults, options, dataOptions);\n        const { cssPrefix } = s.params;\n        s.cssList = {\n            // menuOuterOpen: `${cssPrefix}--outer-open`,\n            menuHasUL: `${cssPrefix}__has-ul`,\n            menuNoUl: `${cssPrefix}__no-ul`,\n            menuElemEdge: `${cssPrefix}__elem-on-edge`,\n            menuHovered: `${cssPrefix}--hover`,\n            menuLeaving: `${cssPrefix}--leaving`,\n        };\n        s.addCssToElems();\n        s.handleEvents();\n        return s;\n    }\n    static remove(element, plugin) {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element).each(function () {\n            const s = plugin || (0,_core_Store__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, DATA_NAME);\n            const $el = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.element);\n            $el.find('ul').off(`mouseover.${EVENT_NAME} focusin.${EVENT_NAME} focusout.${EVENT_NAME}`);\n            $el.off(`mouseout.${EVENT_NAME}`);\n            (0,_core_Store__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, DATA_NAME, null);\n        });\n    }\n    addCssToElems() {\n        const s = this;\n        const css = s.cssList;\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('li', s.element)\n            .addClass(css.menuNoUl)\n            .has('ul').each(function () {\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass(css.menuNoUl);\n            if (!cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass(css.menuHasUL)) {\n                cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass(css.menuHasUL);\n            }\n        });\n    }\n    handleEvents() {\n        const s = this;\n        let prevEvent = null;\n        const evtTracker = (elem, e, cb) => {\n            const currEvent = e.type;\n            const containsOrISElem = elem.isSameNode(e.target) ? true : !!cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parents(elem).length;\n            if (!prevEvent || (prevEvent !== currEvent && containsOrISElem)) {\n                prevEvent = currEvent;\n                cb();\n            }\n        };\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.element).find('ul').on(`mouseover.${EVENT_NAME} focusin.${EVENT_NAME}`, 'li, ul', function (e) {\n            const li = this;\n            const css = s.cssList;\n            const p = s.params;\n            evtTracker(li, e, () => {\n                s.edgeDetector(li);\n                const $liLiParents = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(li).parents('li');\n                li.classList.add(p.hoverCss);\n                $liLiParents.addClass(p.hoverCss);\n                cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(li).find(`.${p.hoverCss}`).removeClass(p.hoverCss);\n                cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(li).siblings('li').removeClass(p.hoverCss);\n                $liLiParents.length === 0 &&\n                    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.element).find(`.${p.hoverCss}`).removeClass(p.hoverCss);\n                s.navLeaving && clearTimeout(s.navLeaving);\n                s.stayHover && clearTimeout(s.stayHover);\n                cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(p.outerElem).addClass(css.menuHovered).removeClass(css.menuLeaving);\n            });\n        }).on(`mouseout.${EVENT_NAME} focusout.${EVENT_NAME}`, 'li, ul', function (e) {\n            const liOrUl = this;\n            const p = s.params;\n            const css = s.cssList;\n            evtTracker(liOrUl, e, () => {\n                s.stayHover = setTimeout(() => {\n                    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.element).find(`.${p.hoverCss}`).removeClass(`${p.hoverCss} ${css.menuElemEdge}`);\n                    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.element).find(`.${css.menuElemEdge}`).removeClass(css.menuElemEdge);\n                    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(p.outerElem)\n                        .removeClass(css.menuHovered)\n                        .addClass(css.menuLeaving);\n                    s.navLeaving = setTimeout(() => {\n                        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(p.outerElem).removeClass(css.menuLeaving);\n                    }, p.navLeavingDelay);\n                }, p.delay);\n            });\n        });\n    }\n    edgeDetector(liOrUl) {\n        const s = this;\n        const { stopWidth } = s.params;\n        const css = s.cssList;\n        const dw = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).width();\n        if (stopWidth < dw) {\n            const $uls = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(liOrUl).find('ul');\n            if ($uls.length) {\n                const ul = $uls[0], l = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(ul).offset().left, uw = ul.scrollWidth, fullyVisible = (l + uw <= dw);\n                if (!fullyVisible) {\n                    liOrUl.classList.add(css.menuElemEdge);\n                }\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/NavDesktop.ts?");

/***/ }),

/***/ "./src/assets/js/core/Store.ts":
/*!*************************************!*\
  !*** ./src/assets/js/core/Store.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst storeMap = new WeakMap();\nconst Store = (storeElem, key, value) => {\n    const storeRecord = storeMap.get(storeElem) || storeMap.set(storeElem, {});\n    const keyExists = Reflect.has(storeRecord, key);\n    if (keyExists) {\n        const valueIsNull = value === null;\n        if (valueIsNull) {\n            delete storeRecord[key];\n            return null;\n        }\n        if (value) {\n            storeRecord[key] = value;\n        }\n    }\n    else {\n        if (value && value !== null) {\n            storeRecord[key] = value;\n        }\n    }\n    return storeRecord[key];\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Store);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/core/Store.ts?");

/***/ }),

/***/ "./src/assets/js/util/helpers.ts":
/*!***************************************!*\
  !*** ./src/assets/js/util/helpers.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   camelCase: () => (/* binding */ camelCase),\n/* harmony export */   capitalize: () => (/* binding */ capitalize),\n/* harmony export */   \"default\": () => (/* binding */ getType),\n/* harmony export */   docTop: () => (/* binding */ docTop),\n/* harmony export */   getDataOptions: () => (/* binding */ getDataOptions),\n/* harmony export */   isHidden: () => (/* binding */ isHidden),\n/* harmony export */   isMobileOS: () => (/* binding */ isMobileOS),\n/* harmony export */   isVisible: () => (/* binding */ isVisible),\n/* harmony export */   kebabCase: () => (/* binding */ kebabCase),\n/* harmony export */   noop: () => (/* binding */ noop)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _parseObjectFromString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parseObjectFromString */ \"./src/assets/js/util/parseObjectFromString.ts\");\n// \n// General purposed helpers\n// \n\n\nfunction getType(val) {\n    if (typeof val === 'undefined')\n        return 'undefined';\n    if (typeof val === 'object' && !val)\n        return 'null';\n    return ({}).toString.call(val).match(/\\s([a-zA-Z]+)/)[1].toLowerCase();\n}\n// visibilty\nconst isVisible = (el, visibility = false) => {\n    const vis = el.offsetParent !== null ||\n        !!(el.offsetWidth ||\n            el.offsetHeight ||\n            el.getClientRects().length);\n    if (visibility) {\n        return cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(el).css('visibility') !== 'hidden' && vis;\n    }\n    else {\n        return vis;\n    }\n};\nconst getDataOptions = (el, evtName) => (0,_parseObjectFromString__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(el.dataset[evtName + 'Options']);\nconst docTop = () => document.documentElement.scrollTop || document.body.scrollTop || 0;\nconst noop = () => { };\nconst isHidden = (el) => !isVisible(el);\n// string manipulation\nconst kebabCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\\s+/g, '-').toLowerCase();\nconst camelCase = (str) => str.replace(/-./g, x => x.toUpperCase()[1]);\nconst capitalize = (str) => str.charAt(0).toLowerCase() + str.substring(1);\n// device\nconst isMobileOS = () => /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/util/helpers.ts?");

/***/ }),

/***/ "./src/assets/js/util/parseObjectFromString.ts":
/*!*****************************************************!*\
  !*** ./src/assets/js/util/parseObjectFromString.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst parseObjectFromString = (options) => {\n    let retObj = null;\n    if (typeof options === 'string') {\n        retObj = JSON.parse(options.replace(/:\\s*\"([^\"]*)\"/g, function (match, p1) {\n            return ': \"' + p1.replace(/:/g, '@colon@') + '\"';\n        }).replace(/:\\s*'([^']*)'/g, function (match, p1) {\n            return ': \"' + p1.replace(/:/g, '@colon@') + '\"';\n        }).replace(/(['\"])?([a-z0-9A-Z_]+)(['\"])?\\s*:/g, '\"$2\": ')\n            .replace(/@colon@/g, ':'));\n    }\n    return retObj;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseObjectFromString);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/util/parseObjectFromString.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/NavDesktop.ts");
/******/ 	
/******/ })()
;