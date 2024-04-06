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

/***/ "./src/assets/js/Parallax.ts":
/*!***********************************!*\
  !*** ./src/assets/js/Parallax.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Parallax)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Store */ \"./src/assets/js/core/Store.ts\");\n/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/helpers */ \"./src/assets/js/util/helpers.ts\");\n/* harmony import */ var _fn_throttleResize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fn/throttleResize */ \"./src/assets/js/fn/throttleResize.ts\");\n\n\n\n\nconst VERSION = \"2.0.0\";\nconst DATA_NAME = 'Parallax';\nconst EVENT_NAME = 'parallax';\nconst DEFAULTS = {\n    speed: 7,\n    zSpeed: 5,\n    cssPrefix: 'parallax',\n    axis: 'y',\n    scrollAxis: 'y',\n    zAxis: false,\n    relativeElem: false,\n    bgFill: false,\n    rootMargin: 0,\n    scrollMaxPxStop: 5000,\n    zScrollMaxPxStop: 2000,\n    minWidth: null,\n    maxWidth: null\n};\nclass Parallax {\n    params;\n    zInitOffset;\n    index;\n    instanceEvent;\n    $window;\n    $element;\n    element;\n    elementOffset;\n    $relElem;\n    winHeight;\n    winWidth;\n    elemHeight;\n    elemWidth;\n    speed;\n    zSpeed;\n    fillAmount;\n    bgFill;\n    bgFillProp;\n    axis;\n    zAxis;\n    scrollMaxPxStop;\n    zScrollMaxPxStop;\n    rootMargin;\n    lastZSpeed;\n    lastCssInProps;\n    minWidthIfSet;\n    maxWidthIfSet;\n    effectCleared;\n    cssPrevDir;\n    static get version() { return VERSION; }\n    static defaults = DEFAULTS;\n    constructor(element, options, index) {\n        const s = this;\n        const dataOptions = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_2__.getDataOptions)(element, EVENT_NAME);\n        s.$window = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window);\n        s.$element = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element);\n        s.element = element;\n        s.params = cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Parallax.defaults, options, dataOptions);\n        s.zInitOffset = 0;\n        s.index = index;\n        s.instanceEvent = EVENT_NAME + index;\n        s.$relElem = s.#relElem;\n        s.cssPrevDir = '';\n        //props to get updated on resize\n        s.updatableProps();\n        s.handleEvents();\n        return s;\n    }\n    handleEvents() {\n        const s = this;\n        (0,_fn_throttleResize__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(() => {\n            s.updatableProps();\n            // $(window).trigger(s.instanceEvent);\n            s.parallax(s);\n        }, `${s.instanceEvent}_resize`, true);\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).on(`scroll.${s.instanceEvent} ${s.instanceEvent}`, () => {\n            window.requestAnimationFrame(() => {\n                s.parallax(s);\n            });\n        }).trigger(s.instanceEvent);\n    }\n    handleUpdate() {\n        const s = this;\n        s.updatableProps();\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).trigger(s.instanceEvent);\n    }\n    updatableProps() {\n        const s = this;\n        const speed = s.#speed, zSpeed = s.#zSpeed, { cssPrefix } = s.params, speedCss = `${cssPrefix}--${s.params.axis}-${zSpeed > 0 ? 'pos' : 'neg'}`, zSpeedCss = s.params.zAxis ? ` ${cssPrefix}--z-${zSpeed > 0 ? 'pos' : 'neg'}` : '', newCssDir = `${speedCss}${zSpeedCss}`, rm = s.params.rootMargin;\n        //reset to get new measurements\n        s.$element.css({\n            'transform': null,\n            height: null,\n            width: null\n        })\n            .removeClass(s.cssPrevDir)\n            .addClass(newCssDir);\n        s.cssPrevDir = newCssDir;\n        s.winHeight = s.$window.height();\n        s.winWidth = s.$window.width();\n        s.elemHeight = s.$relElem[0].scrollHeight;\n        s.elemWidth = s.$relElem[0].scrollWidth;\n        s.speed = speed;\n        s.zSpeed = zSpeed;\n        s.fillAmount = s.#fillAmount;\n        s.bgFill = s.params.bgFill;\n        s.axis = s.params.axis;\n        s.bgFillProp = s.axis === 'y' ? 'height' : 'width';\n        s.zAxis = s.params.zAxis;\n        s.$relElem = s.#relElem;\n        s.scrollMaxPxStop = s.params.scrollMaxPxStop;\n        s.zScrollMaxPxStop = s.params.zScrollMaxPxStop;\n        s.lastZSpeed = 0;\n        s.rootMargin = typeof s.params.rootMargin === 'number' ? [rm, rm] : rm;\n        s.minWidthIfSet = s.params.minWidth ? s.winWidth > s.params.minWidth : true;\n        s.maxWidthIfSet = s.params.maxWidth ? s.winWidth < s.params.maxWidth : true;\n        s.elementOffset = s.getElementRects();\n        s.$element.css(s.lastCssInProps);\n    }\n    getElementRects() {\n        const s = this;\n        const elPos = s.$element.offset(), top = elPos.top, left = elPos.left, bottom = top + s.elemHeight, right = left + s.elemWidth;\n        return {\n            top,\n            left,\n            bottom,\n            right\n        };\n    }\n    parallax(s) {\n        const { scrollAxis } = s.params, [rootMStart, rootMEnd] = s.rootMargin, withinMinAndMaxIfSet = (s.minWidthIfSet && s.maxWidthIfSet), scrollVertical = scrollAxis === 'y', offset = (scrollVertical ? s.elementOffset.top : s.elementOffset.left), winSide = (scrollVertical ? s.winHeight : s.winWidth) - rootMStart, scrollDir = (scrollVertical ? window.scrollY : window.scrollX), pixelStart = (offset > winSide ? (winSide - offset) + scrollDir : offset + (scrollDir - offset));\n        if (s.isInView(scrollVertical, pixelStart, scrollDir, rootMEnd) && withinMinAndMaxIfSet) {\n            const speed = (pixelStart * s.speed), zSpeed = (pixelStart * s.zSpeed), speedPx = (speed < s.zScrollMaxPxStop) ? speed : s.zScrollMaxPxStop, zSpeedPx = s.params.zAxis ? ((s.lastZSpeed < s.zScrollMaxPxStop) ? zSpeed : s.lastZSpeed) : 0, translateParams = s.axis === 'y' ? `0, ${speedPx}px, ${zSpeedPx}px` : `${speedPx}px, 0, ${zSpeedPx}px`;\n            const cssProps = {\n                transform: `translate3d(${translateParams})`,\n                [s.bgFillProp]: s.bgFill ? `calc(100% + ${s.fillAmount}px)` : null\n            };\n            s.lastZSpeed = zSpeedPx;\n            s.lastCssInProps = cssProps;\n            s.$element.css(cssProps);\n        }\n    }\n    isInView(scrollVertical, pixelStart, scrollDir, rootMargin) {\n        const s = this;\n        const elemOffsetEnd = scrollVertical ? s.elementOffset.bottom : s.elementOffset.right;\n        return scrollDir + rootMargin <= elemOffsetEnd && pixelStart >= 0;\n    }\n    //getters\n    get #fillAmount() {\n        const s = this;\n        const saY = s.params.scrollAxis === 'y';\n        const winSide = s.params.axis === 'y' ? s.winHeight : (s.winWidth + (saY ? 0 : s.elemWidth));\n        return (winSide * Math.abs(s.speed));\n    }\n    get #speed() {\n        const s = this;\n        return s.params.speed / 100;\n    }\n    get #zSpeed() {\n        const s = this;\n        return s.params.zSpeed / 100;\n    }\n    get #relElem() {\n        const s = this;\n        return s.params.relativeElem ?\n            s.$element.closest(s.params.relativeElem) :\n            s.$element;\n    }\n    static remove(element, plugin) {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element).each(function () {\n            const s = plugin || (0,_core_Store__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this, DATA_NAME);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).off(`scroll.${s.instanceEvent} resize.${s.instanceEvent} ${s.instanceEvent}_resize ${s.instanceEvent}`);\n            s.$element.css({\n                'transform': null,\n                height: null,\n                width: null\n            }).removeClass(s.cssPrevDir);\n            (0,_core_Store__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this, DATA_NAME, null);\n        });\n    }\n}\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/Parallax.ts?");

/***/ }),

/***/ "./src/assets/js/core/Store.ts":
/*!*************************************!*\
  !*** ./src/assets/js/core/Store.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst storeMap = new WeakMap();\nconst Store = (storeElem, key, value) => {\n    const storeRecord = storeMap.get(storeElem) || storeMap.set(storeElem, {});\n    const keyExists = Reflect.has(storeRecord, key);\n    if (keyExists) {\n        const valueIsNull = value === null;\n        if (valueIsNull) {\n            delete storeRecord[key];\n            return null;\n        }\n        if (value) {\n            storeRecord[key] = value;\n        }\n    }\n    else {\n        if (value && value !== null) {\n            storeRecord[key] = value;\n        }\n    }\n    return storeRecord[key];\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Store);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/core/Store.ts?");

/***/ }),

/***/ "./src/assets/js/fn/throttleResize.ts":
/*!********************************************!*\
  !*** ./src/assets/js/fn/throttleResize.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n\nconst throttledResize = (callback, _namespace = 'throttledResize', manualTrigger = false, delay = 100) => {\n    let _throttledResize = null;\n    const namespace = _namespace !== '' ? `.${_namespace}` : '';\n    //must pass in a function for the first argument else exit the script\n    if (typeof callback !== 'function') {\n        console.error('first parameter should be a function');\n        return;\n    }\n    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).on(`resize${namespace}${manualTrigger && ' ' + _namespace}`, (e) => {\n        clearTimeout(_throttledResize);\n        _throttledResize = setTimeout(callback, delay, e);\n    });\n    if (manualTrigger) {\n        setTimeout(callback, 0);\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (throttledResize);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/fn/throttleResize.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/Parallax.ts");
/******/ 	
/******/ })()
;