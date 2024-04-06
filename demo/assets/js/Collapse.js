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

/***/ "./src/assets/js/Collapse.ts":
/*!***********************************!*\
  !*** ./src/assets/js/Collapse.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Collapse)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/helpers */ \"./src/assets/js/util/helpers.ts\");\n/* harmony import */ var _fn_smoothScroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fn/smoothScroll */ \"./src/assets/js/fn/smoothScroll.ts\");\n/* harmony import */ var _fn_transition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fn/transition */ \"./src/assets/js/fn/transition.ts\");\n/* harmony import */ var _core_UrlState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/UrlState */ \"./src/assets/js/core/UrlState.ts\");\n/* harmony import */ var _core_Store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/Store */ \"./src/assets/js/core/Store.ts\");\n\n\n\n\n\n\n;\nconst VERSION = \"4.0.0\";\nconst DATA_NAME = 'Collapse';\nconst EVENT_NAME = 'collapse';\nconst DEFAULTS = {\n    cssPrefix: 'collapse',\n    toggleDuration: 500,\n    toggleGroup: false,\n    moveToTopOnOpen: false,\n    moveToTopOffset: 0,\n    scrollSpeed: 100,\n    urlFilterType: 'hash',\n    historyType: 'replace',\n    locationFilter: null,\n    loadLocation: true,\n    afterOpen: _util_helpers__WEBPACK_IMPORTED_MODULE_1__.noop,\n    afterClose: _util_helpers__WEBPACK_IMPORTED_MODULE_1__.noop,\n    afterInit: _util_helpers__WEBPACK_IMPORTED_MODULE_1__.noop\n};\nclass Collapse {\n    $element;\n    params;\n    toggling;\n    $btnElems;\n    $activeItem;\n    initLoaded;\n    static defaults = DEFAULTS;\n    #transition = (0,_fn_transition__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n    constructor(element, options, index) {\n        const s = this;\n        s.$element = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element);\n        const dataOptions = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.getDataOptions)(element, EVENT_NAME);\n        s.params = cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Collapse.defaults, options, dataOptions);\n        s.toggling = false;\n        s.$btnElems = s.$element.find(`.${s.params.cssPrefix}__btn`).attr({ 'aria-expanded': 'false' });\n        s.$activeItem = null;\n        s.initLoaded = false;\n        // init\n        s.loadFromUrl();\n        s.handleEvents();\n        s.params.afterInit(s.$element);\n        (0,_core_Store__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(element, DATA_NAME, s);\n        return s;\n    }\n    static get version() {\n        return VERSION;\n    }\n    static remove(element, plugin) {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element).each(function () {\n            const s = plugin || (0,_core_Store__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this, DATA_NAME);\n            s.$element.off(`click.${EVENT_NAME} ${EVENT_NAME}`);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).off(`popstate.${EVENT_NAME}`);\n            // delete the Store item\n            (0,_core_Store__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this, DATA_NAME, null);\n        });\n    }\n    handleEvents() {\n        const s = this;\n        const { cssPrefix } = s.params;\n        s.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, `.${cssPrefix}__btn`, function (e) {\n            const elemId = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('aria-controls') || this.hash.substring(1);\n            s.toggleAction(elemId);\n            e.preventDefault();\n        });\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).on(`popstate.${EVENT_NAME}`, (e) => {\n            if (s.params.historyType === 'push') {\n                s.loadFromUrl();\n                s.initLoaded = true;\n                e.preventDefault();\n            }\n        });\n    }\n    loadFromUrl() {\n        const s = this;\n        const p = s.params;\n        const loadElem = (filterEl) => {\n            const cssOpen = `${p.cssPrefix}--open`;\n            const $tryElem = s.$element.find('#' + filterEl);\n            if ($tryElem.length) {\n                s.$activeItem = $tryElem;\n                s.$activeItem.addClass(cssOpen);\n                s.$btnElems\n                    .filter((i, el) => cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(el).attr('aria-controls') === filterEl)\n                    .attr({ 'aria-expanded': 'true' });\n            }\n        };\n        if (p.locationFilter !== null || p.loadLocation) {\n            const filterEl = _core_UrlState__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(p.urlFilterType, p.locationFilter);\n            const cssOpen = `${p.cssPrefix}--open`;\n            s.$element.find(`.${p.cssPrefix}__body.${cssOpen}`).removeClass(cssOpen);\n            s.$btnElems.attr({ 'aria-expanded': 'false' });\n            if (filterEl) {\n                if (Array.isArray(filterEl)) {\n                    filterEl.forEach(loadElem);\n                }\n                else {\n                    loadElem(filterEl);\n                }\n            }\n        }\n    }\n    toggleAction(currElemID) {\n        const s = this;\n        if (s.toggling || currElemID === null)\n            return;\n        const { cssPrefix } = s.params;\n        const p = s.params;\n        s.$activeItem = s.$element.find('#' + currElemID);\n        if (s.$activeItem.length) {\n            const cssOpen = `${cssPrefix}--open`, cssToggling = `${cssPrefix}--toggling`, cssOpening = `${cssPrefix}--opening`, cssClosing = `${cssPrefix}--closing`, cssBodyOpen = `.${cssPrefix}__body.${cssOpen}`;\n            const $currOpenItems = s.$element.find(cssBodyOpen);\n            const $itemsToClose = $currOpenItems.filter((i, el) => p.toggleGroup || el.id === currElemID);\n            const activeAlreadyOpen = s.$activeItem.hasClass(cssOpen);\n            s.#transition(() => {\n                s.toggling = true;\n                s.$btnElems.each(function () {\n                    const $btn = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this);\n                    const isCurrent = $btn.attr('aria-controls') === currElemID;\n                    const expanded = isCurrent && $btn.attr('aria-expanded') === 'false';\n                    if (p.toggleGroup) {\n                        $btn.attr({ 'aria-expanded': expanded + '' });\n                    }\n                    else {\n                        if (isCurrent) {\n                            $btn.attr({ 'aria-expanded': expanded + '' });\n                        }\n                    }\n                });\n                $itemsToClose.each(function () {\n                    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).css({ height: this.scrollHeight });\n                });\n                setTimeout(() => {\n                    $itemsToClose\n                        .removeClass(cssOpen)\n                        .addClass(`${cssToggling} ${cssClosing}`)\n                        .css({ height: 0 });\n                }, 0);\n                if (!activeAlreadyOpen) {\n                    s.$activeItem\n                        .addClass(`${cssToggling} ${cssOpening}`)\n                        .css({ height: s.$activeItem[0].scrollHeight });\n                }\n            }, () => {\n                s.toggling = false;\n                $itemsToClose\n                    .removeClass(`${cssToggling} ${cssClosing}`)\n                    .css({ height: null });\n                s.params.afterClose(s.$btnElems, $itemsToClose);\n                if (!activeAlreadyOpen) {\n                    s.$activeItem\n                        .addClass(cssOpen)\n                        .removeClass(`${cssToggling} ${cssOpening}`)\n                        .css({ height: null });\n                }\n                // Update History in URL\n                const paramList = [...s.$element.find(cssBodyOpen)].map((el) => el.id);\n                const paramVal = paramList.length === 1 ? paramList[0] : paramList.length > 0 ? paramList : null;\n                _core_UrlState__WEBPACK_IMPORTED_MODULE_4__[\"default\"].set(p.urlFilterType, p.locationFilter, paramVal, p.historyType);\n                s.params.afterOpen(s.$btnElems, s.$activeItem);\n                s.moveToTopOnOpen();\n            });\n        }\n    }\n    moveToTopOnOpen() {\n        const s = this;\n        const { cssPrefix, moveToTopOffset, moveToTopOnOpen, scrollSpeed } = s.params;\n        if (s.$activeItem) {\n            const $item = s.$activeItem.parent(`.${cssPrefix}__item`) || s.$activeItem;\n            if ($item.length && moveToTopOnOpen) {\n                // get the compiler to stop from throwing \n                // an error it'll never throw by setting to 'any'\n                const elemOffsetTop = $item.offset().top;\n                const top = elemOffsetTop - moveToTopOffset;\n                (0,_fn_smoothScroll__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(top, scrollSpeed);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/Collapse.ts?");

/***/ }),

/***/ "./src/assets/js/core/Store.ts":
/*!*************************************!*\
  !*** ./src/assets/js/core/Store.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst storeMap = new WeakMap();\nconst Store = (storeElem, key, value) => {\n    const storeRecord = storeMap.get(storeElem) || storeMap.set(storeElem, {});\n    const keyExists = Reflect.has(storeRecord, key);\n    if (keyExists) {\n        const valueIsNull = value === null;\n        if (valueIsNull) {\n            delete storeRecord[key];\n            return null;\n        }\n        if (value) {\n            storeRecord[key] = value;\n        }\n    }\n    else {\n        if (value && value !== null) {\n            storeRecord[key] = value;\n        }\n    }\n    return storeRecord[key];\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Store);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/core/Store.ts?");

/***/ }),

/***/ "./src/assets/js/core/UrlState.ts":
/*!****************************************!*\
  !*** ./src/assets/js/core/UrlState.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   get: () => (/* binding */ get),\n/* harmony export */   print: () => (/* binding */ print),\n/* harmony export */   refresh: () => (/* binding */ refresh),\n/* harmony export */   set: () => (/* binding */ set),\n/* harmony export */   setHashVal: () => (/* binding */ setHashVal),\n/* harmony export */   toUrl: () => (/* binding */ toUrl)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n\nconst EVENT_NAME = 'UrlState';\nconst urlStateMap = new Map([\n    ['search', new URLSearchParams(location.search.replace('?', ''))],\n    ['hash', new URLSearchParams(location.hash.replace('#', ''))]\n]);\nconst toUrl = (state = 'replace') => {\n    let vals = '';\n    const hash = urlStateMap.get('hash').toString();\n    const search = urlStateMap.get('search').toString();\n    (search !== '') ? vals += '?' + search : vals += location.href.split(/(\\?|\\#)/)[0];\n    if (hash !== '')\n        vals += '#' + hash;\n    // clean-up\n    vals = vals.replace(/(\\=\\&)+/g, '&').replace(/\\=$/, '');\n    state === \"replace\" ? history.replaceState(null, '', vals) : history.pushState(null, '', vals);\n};\nconst setHashVal = (value, state) => {\n    const params = urlStateMap.get('hash');\n    for (const key of params.keys()) {\n        params.delete(key);\n    }\n    if (value !== null)\n        params.set(value, '');\n    if (state) {\n        toUrl(state);\n    }\n};\nconst set = (type, paramName, value, state) => {\n    if (type === 'hashVal') {\n        console.warn(`use 'setHashVal' method for setting only the hash val`);\n        return;\n    }\n    const params = urlStateMap.get(type);\n    if (value === null) {\n        params.has(paramName) && params.delete(paramName);\n    }\n    else {\n        const isArray = Array.isArray(value);\n        const adjustedVal = isArray ? `[${value.join(',')}]` : value;\n        params.set(paramName, adjustedVal);\n    }\n    if (state) {\n        toUrl(state);\n    }\n};\nconst get = (type, paramName) => {\n    const params = urlStateMap.get(type);\n    if (type === 'hashVal') {\n        return location.hash.replace('#', '');\n    }\n    if (params.has(paramName)) {\n        const rawVal = params.get(paramName).trim();\n        if (rawVal.slice(0, 1) === '[' && rawVal.slice(-1) === ']') {\n            const valSplits = rawVal.slice(1, -1).split(',');\n            return valSplits.map(el => !(/\\D/).test(el) ? +el : el);\n        }\n        else {\n            return rawVal;\n        }\n    }\n    return null;\n};\nconst refresh = (on = true) => {\n    if (on) {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).off(`popstate.${EVENT_NAME}`).on(`popstate.${EVENT_NAME}`, () => {\n            urlStateMap.set('search', new URLSearchParams(location.search.replace('?', '')));\n            urlStateMap.set('hash', new URLSearchParams(location.hash.replace('#', '')));\n        });\n    }\n    else {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).off(`popstate.${EVENT_NAME}`);\n    }\n};\n// print URL params\nconst print = (type, options) => {\n    const params = urlStateMap.get(type), defaultOptions = { pattern: 'normal', brackets: true }, { pattern, brackets } = Object.assign(defaultOptions, options), bkts = brackets ? '[]' : '';\n    if (pattern === 'repeat') {\n        return [...params.keys()].map((key) => {\n            const val = get(type, key);\n            if (Array.isArray(val)) {\n                return val.map(el => `${key}${bkts}=${encodeURIComponent(el)}`).join('&');\n            }\n            return `${key}=${val}`;\n        }).join('&');\n    }\n    return params.toString();\n};\n// run refresh initially\nrefresh();\nconst UrlState = {\n    refresh,\n    print,\n    toUrl,\n    set,\n    setHashVal,\n    get\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UrlState);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/core/UrlState.ts?");

/***/ }),

/***/ "./src/assets/js/fn/smoothScroll.ts":
/*!******************************************!*\
  !*** ./src/assets/js/fn/smoothScroll.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ smoothScroll)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/helpers */ \"./src/assets/js/util/helpers.ts\");\n\n\n// We need to throttle the checking of the previous scroll for a bug in IOS\n// that says the previous pixel is the same as the current pixel.\n// Q: Why do we need to check if the current pixel is the same as the previous?\n// A: Because it could indicate that the element cannot be completely scrolled to\n//    and as a result we need to break this JS scroll \nconst checkIterationAmt = 3;\nlet activeScroll = false;\nfunction smoothScroll(elemYPos, _speed = 100, afterScroll, afterScrollArgs = []) {\n    // If an active scroll is going exit until it's done\n    if (activeScroll)\n        return;\n    const speed = _speed / 1000;\n    activeScroll = true;\n    let prevScroll = null, animation = null, userBreakScroll = false, pxToCheckIteration = 0;\n    const targetIsAbove = elemYPos < (0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.docTop)();\n    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).on('wheel.smoothScroll', () => { userBreakScroll = true; });\n    document.body.style.scrollBehavior = 'auto';\n    const scrollDone = () => {\n        if (typeof afterScroll === 'function') {\n            afterScroll.apply(null, afterScrollArgs);\n        }\n        window.cancelAnimationFrame(animation);\n        activeScroll = false;\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).off('wheel.smoothScroll');\n        document.body.style.scrollBehavior = null;\n    };\n    (function smoothScrollInner() {\n        const currentScroll = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.docTop)();\n        if (prevScroll === currentScroll || userBreakScroll) {\n            scrollDone();\n            return;\n        }\n        if (pxToCheckIteration === checkIterationAmt) {\n            prevScroll = currentScroll;\n            pxToCheckIteration = 0;\n        }\n        else {\n            pxToCheckIteration++;\n        }\n        const isAtTarget = Math.floor(currentScroll - elemYPos) === 0;\n        const isPastTarget = targetIsAbove ? prevScroll < currentScroll : prevScroll > currentScroll;\n        if (!isAtTarget || !isPastTarget) {\n            animation = window.requestAnimationFrame(smoothScrollInner);\n            window.scroll(0, currentScroll + ((elemYPos - currentScroll) * speed));\n        }\n        else {\n            scrollDone();\n            return;\n        }\n    })();\n}\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/fn/smoothScroll.ts?");

/***/ }),

/***/ "./src/assets/js/fn/transition.ts":
/*!****************************************!*\
  !*** ./src/assets/js/fn/transition.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst transition = () => {\n    let inTransition = false;\n    let tto = null;\n    let currEndTransitionFn = () => { };\n    return (startFn, endFn, duration = 300) => {\n        if (inTransition) {\n            currEndTransitionFn();\n            clearTimeout(tto);\n        }\n        startFn();\n        currEndTransitionFn = endFn;\n        inTransition = true;\n        tto = setTimeout(() => {\n            currEndTransitionFn();\n            inTransition = false;\n        }, duration);\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (transition);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/fn/transition.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/Collapse.ts");
/******/ 	
/******/ })()
;