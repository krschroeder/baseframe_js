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

/***/ "./src/assets/js/Toastr.ts":
/*!*********************************!*\
  !*** ./src/assets/js/Toastr.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Toastr)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/helpers */ \"./src/assets/js/util/helpers.ts\");\n/* harmony import */ var _core_Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/Store */ \"./src/assets/js/core/Store.ts\");\n\n\n\nconst VERSION = \"1.0.0\";\nconst DATA_NAME = 'Toastr';\nconst EVENT_NAME = 'toastr';\nconst DEFAULTS = {\n    duration: 3000,\n    appendTo: document.body,\n    animationDuration: 500,\n    content: '',\n    outerCss: 'toastr',\n    enabledCss: 'toastr--enabled',\n    dismissCss: 'toastr--dismiss',\n    btnDismissCss: 'toastr__btn-dismiss',\n    closeIconCss: 'ico i-close',\n    ariaLive: 'polite',\n    closeTextCopy: 'Dismiss',\n    cssGroupKey: 'std',\n    oneOnly: false\n};\nconst toastContainers = new Map();\nlet currentlyToastingGlobal = false;\nclass Toastr {\n    static get version() { return VERSION; }\n    static Defaults = DEFAULTS;\n    static DismissedEventName = 'toastDismissed';\n    toastrFinallyTimer;\n    currentlyToasting;\n    toasterBodyBuilt;\n    $element;\n    $toastrBody;\n    $toastrWrap;\n    params;\n    constructor(element, options) {\n        const s = this;\n        const dataOptions = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.getDataOptions)(element, EVENT_NAME);\n        //state\n        s.$element = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element);\n        s.toastrFinallyTimer = null;\n        s.$toastrBody = null;\n        s.$toastrWrap = null;\n        s.currentlyToasting = false;\n        s.params = cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Toastr.Defaults, options, dataOptions);\n        s.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, () => s.launch());\n        return s;\n    }\n    dismiss() {\n        const s = this;\n        const { animationDuration, dismissCss } = s.params;\n        s.toastrFinallyTimer && clearTimeout(s.toastrFinallyTimer);\n        s.$toastrWrap.addClass(dismissCss);\n        setTimeout(() => {\n            const $toatrContainer = s.getToasterContainer();\n            s.$toastrWrap.removeClass(dismissCss).detach();\n            if (!$toatrContainer.children('div').length) {\n                s.getToasterContainer().detach();\n            }\n            s.currentlyToasting = false;\n            currentlyToastingGlobal = false;\n        }, animationDuration);\n    }\n    setContent(content, updateNow = false) {\n        const s = this;\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend(s.params, { content });\n        if (updateNow) {\n            s.updateContent(s.params.content);\n        }\n    }\n    launch() {\n        const s = this;\n        const { content, dismissCss, duration, enabledCss, oneOnly } = s.params;\n        if (!s.currentlyToasting) {\n            if (currentlyToastingGlobal && oneOnly) {\n                return;\n            }\n            if (!s.toasterBodyBuilt) {\n                s.buildElems();\n            }\n            s.$toastrWrap.removeClass(`${dismissCss} ${enabledCss}`);\n            s.updateContent(content);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document.body).append(s.getToasterContainer().append(s.$toastrWrap));\n            setTimeout(() => s.$toastrWrap.addClass(enabledCss), 0);\n            // Auto remove if not dismissed\n            s.toastrFinallyTimer = setTimeout(() => s.dismiss(), duration);\n            s.currentlyToasting = true;\n            currentlyToastingGlobal = true;\n        }\n    }\n    getToasterContainer() {\n        const { cssGroupKey, outerCss } = this.params;\n        const toasterWrapCss = `${outerCss}-wrap ${outerCss}-wrap--${cssGroupKey}`;\n        if (!toastContainers.has(toasterWrapCss)) {\n            toastContainers.set(toasterWrapCss, cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').attr({\n                class: toasterWrapCss\n            }));\n        }\n        return toastContainers.get(toasterWrapCss);\n    }\n    buildElems() {\n        const s = this;\n        const { ariaLive, btnDismissCss, closeIconCss, closeTextCopy, outerCss } = s.params;\n        s.$toastrBody = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('<div>').attr({ class: s.params.outerCss + '__body' });\n        s.$toastrWrap = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('<div>').attr({ class: outerCss, role: 'alert', 'aria-live': ariaLive }).append(s.$toastrBody, cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('<button>').attr({ type: 'button', class: btnDismissCss }).append(cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('<i>').attr({ class: closeIconCss }).append(cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('<span>').attr({ class: 'sr-only' }).text(closeTextCopy))));\n        s.toasterBodyBuilt = true;\n        // click event to dismiss\n        s.$toastrWrap.on('click', 'button', () => s.dismiss());\n    }\n    updateContent(content) {\n        const s = this;\n        if (s.$toastrBody) {\n            s.$toastrBody.empty();\n            if ('string' === typeof content) {\n                s.$toastrBody.html(content);\n            }\n            else {\n                s.$toastrBody.append(content);\n            }\n        }\n    }\n    static setContent(element, content, updateNow = false) {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element).each(function () {\n            const s = (0,_core_Store__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, DATA_NAME);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend(s.params, { content });\n            if (updateNow) {\n                s.updateContent(s.params.content);\n            }\n        });\n    }\n    static remove(element, plugin) {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element).each(function () {\n            const s = plugin || (0,_core_Store__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, DATA_NAME);\n            s.$element.off(`click.${EVENT_NAME} ${EVENT_NAME}`);\n            (0,_core_Store__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, DATA_NAME, null);\n        });\n    }\n}\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/Toastr.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/Toastr.ts");
/******/ 	
/******/ })()
;