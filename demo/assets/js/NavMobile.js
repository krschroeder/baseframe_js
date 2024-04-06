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

/***/ "./src/assets/js/NavMobile.ts":
/*!************************************!*\
  !*** ./src/assets/js/NavMobile.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NavMobile)\n/* harmony export */ });\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ \"cash-dom\");\n/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/helpers */ \"./src/assets/js/util/helpers.ts\");\n/* harmony import */ var _fn_trapFocus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fn/trapFocus */ \"./src/assets/js/fn/trapFocus.ts\");\n/* harmony import */ var _fn_transition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fn/transition */ \"./src/assets/js/fn/transition.ts\");\n/* harmony import */ var _core_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/constants */ \"./src/assets/js/core/constants.ts\");\n/* harmony import */ var _core_Store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/Store */ \"./src/assets/js/core/Store.ts\");\n\n\n\n\n\n\nconst VERSION = \"3.0.0\";\nconst DATA_NAME = 'NavMobile';\nconst EVENT_NAME = 'navMobile';\nconst DEFAULTS = {\n    enableBtn: '#mobile-nav-btn',\n    ariaLabel: 'Toggle site navigation',\n    subMenuText: 'toggle menu for',\n    insertToggleBtnAfter: 'a',\n    slideDuration: 400,\n    outerElement: document.body,\n    outsideClickClose: true,\n    animateHeight: true,\n    cssPrefix: 'menu',\n    menuBtnCss: 'i i-arrow-b',\n    menuBtnSkip: false,\n    afterNavItemOpen: _util_helpers__WEBPACK_IMPORTED_MODULE_1__.noop,\n    afterNavItemClose: _util_helpers__WEBPACK_IMPORTED_MODULE_1__.noop,\n    afterOpen: _util_helpers__WEBPACK_IMPORTED_MODULE_1__.noop,\n    afterClose: _util_helpers__WEBPACK_IMPORTED_MODULE_1__.noop,\n    doTrapFocus: true,\n    trapFocusElem: null,\n    stopPropagation: true,\n    bkptEnable: null\n};\nclass NavMobile {\n    $element;\n    params;\n    menuOpened;\n    allowClick;\n    cssList;\n    static get version() { return VERSION; }\n    static defaults = DEFAULTS;\n    #transition = (0,_fn_transition__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n    constructor(element, options) {\n        const s = this;\n        const dataOptions = (0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.getDataOptions)(element, EVENT_NAME);\n        s.$element = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element);\n        s.params = cash_dom__WEBPACK_IMPORTED_MODULE_0___default().extend({}, NavMobile.defaults, options, dataOptions);\n        const { cssPrefix, menuBtnCss } = s.params;\n        s.cssList = {\n            menuOuterOpen: `${cssPrefix}--outer-open`,\n            menuHasUL: `${cssPrefix}__has-ul`,\n            menuOpen: `${cssPrefix}--open`,\n            menuOpening: `${cssPrefix}--is-opening`,\n            menuClosing: `${cssPrefix}--is-closing`,\n            menuToggling: `${cssPrefix}--toggling`,\n            menuBtnCss: `${cssPrefix}__btn-nav ${menuBtnCss}`\n        };\n        //run the methods\n        s.addChildNavCss();\n        s.handleEvents();\n        s.checkIfEnabled();\n        const elemID = element.id || element.className;\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.params.enableBtn).attr({\n            'aria-controls': elemID,\n            'aria-label': s.params.ariaLabel\n        });\n        return s;\n    }\n    handleEvents() {\n        const s = this;\n        const css = s.cssList;\n        const $enableBtn = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.params.enableBtn);\n        $enableBtn\n            .attr({ 'aria-expanded': 'false' })\n            .on(`click.${EVENT_NAME} ${EVENT_NAME}`, function (e) {\n            if (!s.allowClick)\n                return;\n            s.#menuToggle();\n            e.stopPropagation();\n            e.preventDefault();\n        });\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document).on(`keydown.${EVENT_NAME}`, (e) => {\n            if (e.code === _core_constants__WEBPACK_IMPORTED_MODULE_4__.KEYS.esc && s.$element.hasClass(css.menuOpen) && s.allowClick) {\n                s.#menuToggle();\n                if ($enableBtn.length) {\n                    $enableBtn[0].focus();\n                }\n            }\n        });\n        s.#navToggle();\n        s.#outsideClickClose();\n    }\n    #menuToggle() {\n        const s = this;\n        const p = s.params;\n        const css = s.cssList;\n        let trappedFocus = null;\n        const $enableBtn = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(p.enableBtn);\n        const $elemParent = s.$element.parent();\n        const doClose = s.menuOpened;\n        const cssMenuState = `${doClose ? css.menuClosing : css.menuOpening} ${css.menuToggling}`;\n        s.#transition(() => {\n            s.menuOpened = !doClose;\n            s.$element.addClass(cssMenuState);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(p.enableBtn).attr({ 'aria-expanded': !doClose + '' });\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(p.outerElement)\n                .toggleClass(css.menuOuterOpen, !doClose)\n                .addClass(cssMenuState);\n            if (doClose) {\n                $elemParent\n                    .find(`.${css.menuOpen}`)\n                    .removeClass(css.menuOpen)\n                    .find(\"[style]\").css({ 'display': null });\n                trappedFocus && trappedFocus.remove();\n            }\n            else {\n                if (p.doTrapFocus) {\n                    trappedFocus = (0,_fn_trapFocus__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(p.trapFocusElem || s.$element, { nameSpace: EVENT_NAME });\n                }\n            }\n        }, () => {\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(p.outerElement).removeClass(cssMenuState);\n            s.$element.removeClass(cssMenuState);\n            if (!doClose) {\n                s.$element.addClass(css.menuOpen);\n            }\n            s.params[doClose ? 'afterClose' : 'afterOpen'](s.$element, cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(p.outerElement), $enableBtn);\n        }, p.slideDuration);\n    }\n    #navToggle() {\n        const s = this;\n        const css = s.cssList;\n        s.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, `.${css.menuBtnCss.replace(/\\s/g, '.')}`, function (e) {\n            const p = s.params;\n            const css = s.cssList;\n            const $li = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).closest(`.${css.menuHasUL}`);\n            const doClose = $li.hasClass(css.menuOpen);\n            const $ul = $li.find('ul').first();\n            //exit because were in desktop view\n            if (!s.allowClick) {\n                return;\n            }\n            const cssMenuState = `${css.menuToggling} ${doClose ? css.menuClosing : css.menuOpening}`;\n            s.allowClick = doClose;\n            s.#transition(() => {\n                $li.addClass(cssMenuState).toggleClass(css.menuOpen, !doClose);\n                $ul.addClass(cssMenuState).toggleClass(css.menuOpen, !doClose);\n                if (p.animateHeight) {\n                    const openHeight = ($ul.length ? $ul[0].scrollHeight : 0);\n                    const height = doClose ? 0 : openHeight;\n                    $ul.css({ height: doClose ? openHeight : 0 });\n                    setTimeout(() => {\n                        $ul.css({ height });\n                    }, 0);\n                }\n            }, () => {\n                $li.removeClass(cssMenuState).toggleClass(css.menuOpen, !doClose);\n                $ul.removeClass(cssMenuState).toggleClass(css.menuOpen, !doClose);\n                $ul.css({ height: null });\n                if (doClose) {\n                    s.params.afterNavItemClose($li);\n                }\n                else {\n                    s.params.afterNavItemOpen($li);\n                }\n                s.allowClick = true;\n            }, p.slideDuration);\n            e.stopPropagation();\n        });\n        s.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, 'a', function (e) {\n            //prohibit closing if an anchor is clicked\n            if (s.params.stopPropagation) {\n                e.stopPropagation();\n            }\n        });\n    }\n    #outsideClickClose() {\n        const s = this;\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on(`click.${EVENT_NAME}`, function (e) {\n            if (s.params.outsideClickClose) {\n                if (!s.menuOpened) {\n                    return;\n                } //lets just exit then..\n                const menuClicked = e.target ? s.$element.has(e.target).length > 0 : false;\n                //if the menu item is not clicked and its opened\n                //the menu button shouldn't register because propogation is prevented to the body\n                if (!menuClicked && s.menuOpened) {\n                    s.#menuToggle();\n                }\n            }\n        });\n    }\n    addChildNavCss() {\n        const s = this;\n        const p = s.params;\n        const css = s.cssList;\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('li', s.$element).has('ul').each(function () {\n            const $this = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this);\n            let skipUl = false;\n            if (typeof p.menuBtnSkip === 'function' &&\n                // condition in function must return false\n                p.menuBtnSkip(this)) {\n                skipUl = true;\n            }\n            if (!$this.next('button').length && !skipUl) {\n                const $el = $this.find(p.insertToggleBtnAfter).first();\n                $el.addClass(css.menuHasUL);\n                if ($el.length) {\n                    if ($el[0].parentNode.isSameNode(this)) {\n                        // make sure the <el> is a direct child of <li>\n                        $el.after(cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('<button>').attr({\n                            class: css.menuBtnCss,\n                            type: 'button',\n                            'aria-label': p.subMenuText + ' ' + $el.text().trim()\n                        }));\n                    }\n                }\n            }\n        });\n    }\n    checkIfEnabled() {\n        const s = this;\n        let resizeTimer;\n        //basically if the navigational button is visible then\n        //we can allow the click to open the navigation\n        //this is so it doesn't clash with any other plugins\n        //and allows for the control of this click via CSS\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).on(`resize.${EVENT_NAME} ${EVENT_NAME}`, function (e) {\n            clearTimeout(resizeTimer);\n            resizeTimer = setTimeout(() => {\n                const $enableBtn = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.params.enableBtn);\n                s.allowClick = typeof s.params.bkptEnable === 'number' ?\n                    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).width() <= s.params.bkptEnable :\n                    ($enableBtn.length ? (0,_util_helpers__WEBPACK_IMPORTED_MODULE_1__.isVisible)($enableBtn[0]) : false);\n            }, e.type === EVENT_NAME ? 0 : 200);\n        }).trigger(EVENT_NAME);\n    }\n    static remove(element, plugin) {\n        cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(element).each(function () {\n            const s = plugin || (0,_core_Store__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this, DATA_NAME);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(s.params.enableBtn).off(`click.${EVENT_NAME} ${EVENT_NAME}`);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document).off(`keydown.${EVENT_NAME}`);\n            s.$element\n                .off(`click.${EVENT_NAME} ${EVENT_NAME}`)\n                .off(`click.${EVENT_NAME} ${EVENT_NAME}`);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off(`click.${EVENT_NAME}`);\n            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).off(`resize.${EVENT_NAME} ${EVENT_NAME}`);\n            (0,_core_Store__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this, DATA_NAME, null);\n        });\n    }\n}\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/NavMobile.ts?");

/***/ }),

/***/ "./src/assets/js/core/Store.ts":
/*!*************************************!*\
  !*** ./src/assets/js/core/Store.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst storeMap = new WeakMap();\nconst Store = (storeElem, key, value) => {\n    const storeRecord = storeMap.get(storeElem) || storeMap.set(storeElem, {});\n    const keyExists = Reflect.has(storeRecord, key);\n    if (keyExists) {\n        const valueIsNull = value === null;\n        if (valueIsNull) {\n            delete storeRecord[key];\n            return null;\n        }\n        if (value) {\n            storeRecord[key] = value;\n        }\n    }\n    else {\n        if (value && value !== null) {\n            storeRecord[key] = value;\n        }\n    }\n    return storeRecord[key];\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Store);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/core/Store.ts?");

/***/ }),

/***/ "./src/assets/js/core/constants.ts":
/*!*****************************************!*\
  !*** ./src/assets/js/core/constants.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   KEYS: () => (/* binding */ KEYS),\n/* harmony export */   PHOTO_RGX: () => (/* binding */ PHOTO_RGX)\n/* harmony export */ });\nconst KEYS = {\n    esc: 'Escape',\n    left: 'ArrowLeft',\n    right: 'ArrowRight',\n    down: 'ArrowDown',\n    up: 'ArrowUp',\n    enter: 'Enter',\n    shift: 'Shift',\n    space: 'Space',\n    tab: 'Tab'\n};\nconst PHOTO_RGX = /\\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg)((#|\\?).*)?$|(\\?|&|&amp;)(image|ext\\=\\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg))?$/i;\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/core/constants.ts?");

/***/ }),

/***/ "./src/assets/js/fn/transition.ts":
/*!****************************************!*\
  !*** ./src/assets/js/fn/transition.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst transition = () => {\n    let inTransition = false;\n    let tto = null;\n    let currEndTransitionFn = () => { };\n    return (startFn, endFn, duration = 300) => {\n        if (inTransition) {\n            currEndTransitionFn();\n            clearTimeout(tto);\n        }\n        startFn();\n        currEndTransitionFn = endFn;\n        inTransition = true;\n        tto = setTimeout(() => {\n            currEndTransitionFn();\n            inTransition = false;\n        }, duration);\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (transition);\n\n\n//# sourceURL=webpack://baseframe-js/./src/assets/js/fn/transition.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/assets/js/NavMobile.ts");
/******/ 	
/******/ })()
;