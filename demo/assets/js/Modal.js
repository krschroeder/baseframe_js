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

/***/ "./src/assets/js/Modal.ts":
/*!********************************!*\
  !*** ./src/assets/js/Modal.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Modal)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Store */ \"./src/assets/js/core/Store.ts\");\n/* harmony import */ var _core_UrlState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/UrlState */ \"./src/assets/js/core/UrlState.ts\");\n/* harmony import */ var _fn_trapFocus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fn/trapFocus */ \"./src/assets/js/fn/trapFocus.ts\");\n/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/helpers */ \"./src/assets/js/util/helpers.ts\");\n/* harmony import */ var _fn_hyperScript__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fn/hyperScript */ \"./src/assets/js/fn/hyperScript.ts\");\n\n\n\n\n\n\n\nconst VERSION = '1.2.0';\nconst EVENT_NAME = 'modal';\nconst DATA_NAME = 'Modal';\nconst DEFAULTS = {\n    enableEvent: 'click',\n    appendTo: document.body,\n    ariaLabelledby: null,\n    ariaLabel: null,\n    cssPrefix: 'modal',\n    closeBtnIconCss: 'ico i-close',\n    closeBtnLabel: 'Close',\n    closeOutDelay: 250,\n    backDropClose: true,\n    fromDOM: false,\n    modalCss: null,\n    modalID: null,\n    src: '',\n    urlFilterType: 'hash',\n    historyType: 'replace',\n    locationFilter: 'modal',\n    loadLocation: true,\n    onOpenOnce: _util_helpers__WEBPACK_IMPORTED_MODULE_4__.noop,\n    onOpen: _util_helpers__WEBPACK_IMPORTED_MODULE_4__.noop,\n    onClose: _util_helpers__WEBPACK_IMPORTED_MODULE_4__.noop,\n    afterClose: _util_helpers__WEBPACK_IMPORTED_MODULE_4__.noop\n};\nconst hasCb = (cb, modalObj) => {\n    if (cb && typeof cb === 'function') {\n        cb(modalObj);\n    }\n};\nclass Modal {\n    element;\n    params;\n    modalID;\n    modalObj;\n    modalEvent;\n    trappedFocus;\n    enabledElem;\n    openedOnce;\n    static defaults = DEFAULTS;\n    constructor(element, options) {\n        const s = this;\n        s.element = element;\n        const dataOptions = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_4__.getDataOptions)(element, EVENT_NAME);\n        s.params = cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Modal.defaults, options, dataOptions);\n        s.modalID = s.params.modalID;\n        s.modalObj = s.getModalObj();\n        s.modalEvent = EVENT_NAME + '_' + s.modalID;\n        s.trappedFocus;\n        s.enabledElem;\n        s.openedOnce = false;\n        s.handleEvents();\n        s.loadFromUrl();\n        (0,_core_Store__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(element, DATA_NAME, s);\n        return s;\n    }\n    static get version() {\n        return VERSION;\n    }\n    static remove(element, plugin) {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element).each(function () {\n            const s = plugin || (0,_core_Store__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this, DATA_NAME);\n            const params = s.params;\n            const { $backdrop, $closeBtn } = s.modalObj;\n            s.modalObj.show && s.modalObj.close();\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.element).off(`${s.params.enableEvent}.${s.modalEvent}`);\n            $closeBtn.off(`click.${s.modalEvent}Dismiss`);\n            if (params.backDropClose)\n                $backdrop.off(`click.${s.modalEvent}Dismiss`);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document)\n                .off(`keydown.${s.modalEvent}Dismiss`)\n                .off(`${s.modalEvent}Dismiss`);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).off(`popstate.${s.modalEvent} ${s.modalEvent}`);\n            (0,_core_Store__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this, DATA_NAME, null);\n        });\n    }\n    handleEvents() {\n        const s = this;\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.element).on(`${s.params.enableEvent}.${s.modalEvent}`, function (e) {\n            s.setDisplayAndEvents();\n            e.preventDefault();\n        });\n    }\n    setDisplayAndEvents() {\n        const s = this;\n        s.enableModal();\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document).on(`keydown.${s.modalEvent}Dismiss`, function (e) {\n            const ekey = e.code || e.originalEvent.key; //cash-dom || jquery\n            if (ekey === 'Escape') {\n                s.close();\n                e.preventDefault();\n            }\n        });\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document).on(`${s.modalEvent}Dismiss`, s.close);\n    }\n    getModalObj() {\n        const s = this, p = s.params, $closeBtn = (0,_fn_hyperScript__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(`button.${p.cssPrefix}__btn-dismiss`, {\n            type: 'button',\n            'aria-label': p.closeBtnLabel\n        }).append((0,_fn_hyperScript__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(`i.${p.closeBtnIconCss}`)), $dialogContent = (0,_fn_hyperScript__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(`div.${p.cssPrefix}__dialog-content`), $dialog = (0,_fn_hyperScript__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(`div.${p.cssPrefix}__dialog`).append($closeBtn, $dialogContent), $backdrop = (0,_fn_hyperScript__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(`div.${p.cssPrefix}__backdrop`), $modal = (0,_fn_hyperScript__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(`div`, {\n            class: p.cssPrefix + (p.modalCss ? ' ' + p.modalCss : ''),\n            'aria-label': (p.ariaLabel || s.element.dataset.ariaLabel) || null,\n            'aria-labelledby': (p.ariaLabelledby || s.element.dataset.ariaLabelledby) || null,\n            id: s.modalID\n        }).append($backdrop, $dialog), $content = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.params.src || s.element.hash || s.element.dataset.modalSrc);\n        return {\n            $backdrop,\n            $content,\n            contentAppended: false,\n            $dialog,\n            $dialogContent,\n            $closeBtn,\n            id: s.modalID,\n            $modal,\n            close: () => s.close(),\n            show: false\n        };\n    }\n    enableModal() {\n        const s = this;\n        const { $backdrop, $closeBtn, $content, $modal } = s.modalObj;\n        const p = s.params;\n        s.enabledElem = document.activeElement;\n        if (p.fromDOM) {\n            $content.after((0,_fn_hyperScript__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(`span.${p.cssPrefix}-content-placemarker#${s.modalObj.id}_marker`));\n        }\n        if (!s.modalObj.contentAppended) {\n            s.modalObj.$dialogContent.append($content);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend(s.modalObj, { contentAppended: true });\n        }\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(p.appendTo).append($modal);\n        // attach events after appended to DOM\n        $closeBtn.on(`click.${s.modalEvent}Dismiss`, () => s.close());\n        if (p.backDropClose)\n            $backdrop.on(`click.${s.modalEvent}Dismiss`, () => s.close());\n        hasCb(p.onOpen, s.modalObj);\n        if (!s.openedOnce) {\n            hasCb(p.onOpenOnce, s.modalObj);\n            s.openedOnce = true;\n        }\n        $modal.attr({\n            role: 'dialog',\n            'aria-modal': 'true'\n        });\n        setTimeout(() => {\n            $modal.addClass(p.cssPrefix + '--show');\n            s.trappedFocus = (0,_fn_trapFocus__WEBPACK_IMPORTED_MODULE_3__[\"default\"])($modal, { nameSpace: (0,_util_helpers__WEBPACK_IMPORTED_MODULE_4__.camelCase)(s.modalID) });\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend(s.modalObj, { show: true });\n        }, 0);\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document.body).addClass(p.cssPrefix + '-open').css({\n            overflow: 'hidden',\n            'padding-right': '0px'\n        });\n        _core_UrlState__WEBPACK_IMPORTED_MODULE_2__[\"default\"].set(p.urlFilterType, p.locationFilter, s.modalID, p.historyType);\n    }\n    close() {\n        const s = this;\n        const { $backdrop, $closeBtn, $content, $modal } = s.modalObj;\n        const p = s.params;\n        hasCb(p.onClose, s.modalObj);\n        $modal.addClass(p.cssPrefix + '--dismissing');\n        $modal.removeClass(p.cssPrefix + '--show');\n        // detach events\n        $closeBtn.off(`click.${s.modalEvent}Dismiss`);\n        if (p.backDropClose)\n            $backdrop.off(`click.${s.modalEvent}Dismiss`);\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document)\n            .off(`keydown.${s.modalEvent}Dismiss`)\n            .off(`${s.modalEvent}Dismiss`);\n        _core_UrlState__WEBPACK_IMPORTED_MODULE_2__[\"default\"].set(p.urlFilterType, p.locationFilter, null, p.historyType);\n        setTimeout(() => {\n            $modal.attr({\n                role: 'dialog',\n                'aria-modal': ''\n            }).removeClass(p.cssPrefix + '--dismissing').css({\n                display: ''\n            });\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document.body).removeClass(p.cssPrefix + '-open').css({\n                overflow: '',\n                'padding-right': ''\n            });\n            s.trappedFocus.remove();\n            if (s.enabledElem && s.enabledElem instanceof HTMLElement) {\n                s.enabledElem.focus();\n            }\n            if (p.fromDOM) {\n                cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#' + s.modalObj.id + '_marker').after($content).remove();\n                cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend(s.modalObj, { contentAppended: false });\n            }\n            hasCb(p.afterClose, s.modalObj);\n            $modal.remove();\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend(s.modalObj, { show: false });\n        }, p.closeOutDelay);\n    }\n    loadFromUrl() {\n        const s = this;\n        const p = s.params;\n        if (p.locationFilter !== null || p.loadLocation) {\n            const filterEl = _core_UrlState__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(p.urlFilterType, p.locationFilter);\n            if (filterEl === s.modalID) {\n                s.modalObj.show ? s.close() : s.setDisplayAndEvents();\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/Modal.ts?");

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

/***/ "./src/assets/js/fn/hyperScript.ts":
/*!*****************************************!*\
  !*** ./src/assets/js/fn/hyperScript.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n\nconst getCssAttr = (styleStr, find, rm) => {\n    const styleProp = styleStr.indexOf(find) !== -1 ? styleStr.split(find)[1] : null;\n    if (!styleProp)\n        return null;\n    const rmIndex = styleProp.indexOf(rm);\n    return rmIndex !== -1 ? styleProp.substring(0, rmIndex) : styleProp;\n};\nconst hyperScript = (selector, props = {}) => {\n    const tagName = selector.split(/(\\#|\\.)/)[0], className = getCssAttr(selector, '.', '#'), idName = getCssAttr(selector, '#', '.'), baseObj = { class: className, id: idName };\n    let text = '';\n    if (props.text) {\n        text = props.text;\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend(props, { text: null });\n    }\n    const $elem = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`<${tagName}>`).attr(Object.assign(baseObj, props));\n    text && $elem.text(text);\n    return $elem;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hyperScript);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/fn/hyperScript.ts?");

/***/ }),

/***/ "./src/assets/js/fn/trapFocus.ts":
/*!***************************************!*\
  !*** ./src/assets/js/fn/trapFocus.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/helpers */ \"./src/assets/js/util/helpers.ts\");\n\n\n;\nconst defaultProps = {\n    focusFirst: true,\n    nameSpace: 'trapFocus',\n    focusable: ['button', 'a', 'input', 'select', 'textarea', '[tabindex]']\n};\n;\nconst canFocusEls = (i, el) => {\n    const baseFocusableRules = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.isVisible)(el, true) && el.tabIndex !== -1;\n    const nodeName = el.nodeName.toUpperCase();\n    if ((nodeName === 'BUTTON' || nodeName === 'INPUT')) {\n        return baseFocusableRules && !el.disabled;\n    }\n    return baseFocusableRules && el.style.pointerEvents !== 'none';\n};\nconst trapFocus = (modalEl, props) => {\n    const { focusFirst, focusable, nameSpace } = cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend({}, defaultProps, props);\n    const $trapElem = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(modalEl);\n    const focusableJoined = typeof focusable === 'string' ? focusable : focusable.join(',');\n    const $firstFocusable = $trapElem.find(focusableJoined).filter(canFocusEls);\n    let firstFocusable = $firstFocusable.length ? $firstFocusable[0] : null;\n    if (focusFirst && firstFocusable) {\n        firstFocusable.focus();\n    }\n    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on(`keydown.${nameSpace}`, function (e) {\n        const $focusable = $trapElem.find(focusableJoined).filter(canFocusEls);\n        if (!$focusable.length)\n            return;\n        const activeEl = document.activeElement;\n        const lastFocusable = $focusable[$focusable.length - 1];\n        const isTabPressed = e.key === 'Tab';\n        firstFocusable = $focusable[0];\n        if (!isTabPressed) {\n            return;\n        }\n        if (activeEl.nodeName.toUpperCase() === 'BODY') {\n            // somehow we lost focus\n            // this can happen if the last element is disabled if it was focused\n            // so re-assign to the first element\n            firstFocusable && firstFocusable.focus();\n            e.preventDefault();\n        }\n        if (e.shiftKey) {\n            // if shift key pressed for shift + tab combination\n            if (activeEl &&\n                firstFocusable &&\n                document.activeElement.isSameNode(firstFocusable)) {\n                lastFocusable && lastFocusable.focus();\n                e.preventDefault();\n            }\n        }\n        else {\n            // if tab key is pressed\n            if (activeEl &&\n                lastFocusable &&\n                activeEl.isSameNode(lastFocusable)) {\n                firstFocusable && firstFocusable.focus();\n                e.preventDefault();\n            }\n        }\n    });\n    return {\n        remove: () => {\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off(`keydown.${nameSpace}`);\n        }\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trapFocus);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/fn/trapFocus.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/Modal.ts");
/******/ 	
/******/ })()
;