/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "$"
const external_$_namespaceObject = $;
var external_$_default = /*#__PURE__*/__webpack_require__.n(external_$_namespaceObject);
;// CONCATENATED MODULE: ./src/assets/js/util/parseObjectFromString.ts
const parseObjectFromString = (options) => {
    let retObj = null;
    if (typeof options === 'string') {
        retObj = JSON.parse(options.replace(/:\s*"([^"]*)"/g, function (match, p1) {
            return ': "' + p1.replace(/:/g, '@colon@') + '"';
        }).replace(/:\s*'([^']*)'/g, function (match, p1) {
            return ': "' + p1.replace(/:/g, '@colon@') + '"';
        }).replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
            .replace(/@colon@/g, ':'));
    }
    return retObj;
};
/* harmony default export */ const util_parseObjectFromString = (parseObjectFromString);

;// CONCATENATED MODULE: ./src/assets/js/util/helpers.ts
// 
// General purposed helpers
// 


function getType(val) {
    if (typeof val === 'undefined')
        return 'undefined';
    if (typeof val === 'object' && !val)
        return 'null';
    return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
// visibilty
const isVisible = (el, visibility = false) => {
    const vis = el.offsetParent !== null ||
        !!(el.offsetWidth ||
            el.offsetHeight ||
            el.getClientRects().length);
    if (visibility) {
        return external_$_default()(el).css('visibility') !== 'hidden' && vis;
    }
    else {
        return vis;
    }
};
const getDataOptions = (el, evtName) => util_parseObjectFromString(el.dataset[evtName + 'Options']);
const docTop = () => document.documentElement.scrollTop || document.body.scrollTop || 0;
const noop = () => { };
const isHidden = (el) => !isVisible(el);
// string manipulation
const kebabCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
const camelCase = (str) => str.replace(/-./g, x => x.toUpperCase()[1]);
const capitalize = (str) => str.charAt(0).toLowerCase() + str.substring(1);
// device
const isMobileOS = () => /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);

;// CONCATENATED MODULE: ./src/assets/js/core/Store.ts
const storeMap = new WeakMap();
const Store = (storeElem, key, value) => {
    const storeRecord = storeMap.get(storeElem) || storeMap.set(storeElem, {});
    const keyExists = Reflect.has(storeRecord, key);
    if (keyExists) {
        const valueIsNull = value === null;
        if (valueIsNull) {
            delete storeRecord[key];
            return null;
        }
        if (value) {
            storeRecord[key] = value;
        }
    }
    else {
        if (value && value !== null) {
            storeRecord[key] = value;
        }
    }
    return storeRecord[key];
};
/* harmony default export */ const core_Store = (Store);

;// CONCATENATED MODULE: ./src/assets/js/core/libraryExtend.ts



const checkIfParamsExist = (setParams, params, notify = true) => {
    for (let k in params) {
        if (!({}).hasOwnProperty.call(setParams, k)) {
            notify && console.log(k, 'is not a property that can be used');
            delete params[k];
        }
    }
    return params;
};
const extendPlugin = (Plugin, notify, Lib) => {
    const DataName = Plugin.name;
    const pluginName = capitalize(DataName);
    Plugin.Constructor = Plugin;
    Lib.fn.extend({
        [pluginName]: function (params) {
            const s = this;
            return s.each(function (index) {
                const instance = core_Store(this, DataName);
                if (!instance) {
                    const plugin = new Plugin(this, params, index);
                    core_Store(this, DataName, plugin);
                }
                else {
                    const canUpdate = instance.handleUpdate && typeof instance.handleUpdate === 'function';
                    if (typeof params === 'string') {
                        if (params === 'remove') {
                            Plugin.remove(this);
                        }
                        if (params === 'update' && canUpdate) {
                            instance.handleUpdate();
                        }
                        return;
                    }
                    checkIfParamsExist(instance.params, params, notify);
                    Lib.extend(instance.params, params);
                    if (canUpdate) {
                        instance.handleUpdate();
                    }
                    notify && console.log(`Params updated`, instance.params);
                }
            });
        }
    });
};
const libraryExtend = (Plugins, notify = false, Lib = (external_$_default())) => {
    if (Plugins instanceof Array) {
        for (let i = 0, l = Plugins.length; i < l; i++) {
            extendPlugin(Plugins[i], notify, Lib);
        }
    }
    else {
        extendPlugin(Plugins, notify, Lib);
    }
};
/* harmony default export */ const core_libraryExtend = (libraryExtend);

;// CONCATENATED MODULE: ./src/assets/js/fn/smoothScroll.ts


// We need to throttle the checking of the previous scroll for a bug in IOS
// that says the previous pixel is the same as the current pixel.
// Q: Why do we need to check if the current pixel is the same as the previous?
// A: Because it could indicate that the element cannot be completely scrolled to
//    and as a result we need to break this JS scroll 
const checkIterationAmt = 3;
let activeScroll = false;
function smoothScroll(elemYPos, _speed = 100, afterScroll, afterScrollArgs = []) {
    // If an active scroll is going exit until it's done
    if (activeScroll)
        return;
    const speed = _speed / 1000;
    activeScroll = true;
    let prevScroll = null, animation = null, userBreakScroll = false, pxToCheckIteration = 0;
    const targetIsAbove = elemYPos < docTop();
    external_$_default()(window).on('wheel.smoothScroll', () => { userBreakScroll = true; });
    document.body.style.scrollBehavior = 'auto';
    const scrollDone = () => {
        if (typeof afterScroll === 'function') {
            afterScroll.apply(null, afterScrollArgs);
        }
        window.cancelAnimationFrame(animation);
        activeScroll = false;
        external_$_default()(window).off('wheel.smoothScroll');
        document.body.style.scrollBehavior = null;
    };
    (function smoothScrollInner() {
        const currentScroll = docTop();
        if (prevScroll === currentScroll || userBreakScroll) {
            scrollDone();
            return;
        }
        if (pxToCheckIteration === checkIterationAmt) {
            prevScroll = currentScroll;
            pxToCheckIteration = 0;
        }
        else {
            pxToCheckIteration++;
        }
        const isAtTarget = Math.floor(currentScroll - elemYPos) === 0;
        const isPastTarget = targetIsAbove ? prevScroll < currentScroll : prevScroll > currentScroll;
        if (!isAtTarget || !isPastTarget) {
            animation = window.requestAnimationFrame(smoothScrollInner);
            window.scroll(0, currentScroll + ((elemYPos - currentScroll) * speed));
        }
        else {
            scrollDone();
            return;
        }
    })();
}

;// CONCATENATED MODULE: ./src/assets/js/fn/transition.ts
const ensureTransitionDelay = 100;
const transition = () => {
    let inTransition = false;
    let sto = null;
    let eto = null;
    let currEndTransitionFn = () => { };
    return (startFn, endFn, duration = 300) => {
        if (inTransition) {
            currEndTransitionFn();
            clearTimeout(sto);
            clearTimeout(eto);
        }
        sto = setTimeout(() => {
            startFn();
        }, ensureTransitionDelay);
        currEndTransitionFn = endFn;
        inTransition = true;
        eto = setTimeout(() => {
            currEndTransitionFn();
            inTransition = false;
        }, duration + ensureTransitionDelay);
    };
};
/* harmony default export */ const fn_transition = (transition);

;// CONCATENATED MODULE: ./src/assets/js/core/UrlState.ts

const EVENT_NAME = 'UrlState';
const urlStateMap = new Map([
    ['search', new URLSearchParams(location.search.replace('?', ''))],
    ['hash', new URLSearchParams(location.hash.replace('#', ''))]
]);
const toUrl = (state = 'replace') => {
    let vals = '';
    const hash = urlStateMap.get('hash').toString();
    const search = urlStateMap.get('search').toString();
    (search !== '') ? vals += '?' + search : vals += location.href.split(/(\?|\#)/)[0];
    if (hash !== '')
        vals += '#' + hash;
    // clean-up
    vals = vals.replace(/(\=\&)+/g, '&').replace(/\=$/, '');
    state === "replace" ? history.replaceState(null, '', vals) : history.pushState(null, '', vals);
};
const setHashVal = (value, state) => {
    const params = urlStateMap.get('hash');
    for (const key of params.keys()) {
        params.delete(key);
    }
    if (value !== null)
        params.set(value, '');
    if (state) {
        toUrl(state);
    }
};
const set = (type, paramName, value, state) => {
    if (type === 'hashVal') {
        console.warn(`use 'setHashVal' method for setting only the hash val`);
        return;
    }
    const params = urlStateMap.get(type);
    if (value === null) {
        params.has(paramName) && params.delete(paramName);
    }
    else {
        const isArray = Array.isArray(value);
        const adjustedVal = isArray ? `[${value.join(',')}]` : value;
        params.set(paramName, adjustedVal);
    }
    if (state) {
        toUrl(state);
    }
};
const get = (type, paramName) => {
    const params = urlStateMap.get(type);
    if (type === 'hashVal') {
        return location.hash.replace('#', '');
    }
    if (params.has(paramName)) {
        const rawVal = params.get(paramName).trim();
        if (rawVal.slice(0, 1) === '[' && rawVal.slice(-1) === ']') {
            const valSplits = rawVal.slice(1, -1).split(',');
            return valSplits.map(el => !(/\D/).test(el) ? +el : el);
        }
        else {
            return rawVal;
        }
    }
    return null;
};
const refresh = (on = true) => {
    if (on) {
        external_$_default()(window).off(`popstate.${EVENT_NAME}`).on(`popstate.${EVENT_NAME}`, () => {
            urlStateMap.set('search', new URLSearchParams(location.search.replace('?', '')));
            urlStateMap.set('hash', new URLSearchParams(location.hash.replace('#', '')));
        });
    }
    else {
        external_$_default()(window).off(`popstate.${EVENT_NAME}`);
    }
};
// print URL params
const print = (type, options) => {
    const params = urlStateMap.get(type), defaultOptions = { pattern: 'normal', brackets: true }, { pattern, brackets } = Object.assign(defaultOptions, options), bkts = brackets ? '[]' : '';
    if (pattern === 'repeat') {
        return [...params.keys()].map((key) => {
            const val = get(type, key);
            if (Array.isArray(val)) {
                return val.map(el => `${key}${bkts}=${encodeURIComponent(el)}`).join('&');
            }
            return `${key}=${val}`;
        }).join('&');
    }
    return params.toString();
};
// run refresh initially
refresh();
const UrlState = {
    refresh,
    print,
    toUrl,
    set,
    setHashVal,
    get
};
/* harmony default export */ const core_UrlState = (UrlState);

;// CONCATENATED MODULE: ./src/assets/js/Collapse.ts






;
const VERSION = "4.0.0";
const DATA_NAME = 'Collapse';
const Collapse_EVENT_NAME = 'collapse';
const DEFAULTS = {
    cssPrefix: 'collapse',
    toggleDuration: 500,
    toggleGroup: false,
    moveToTopOnOpen: false,
    moveToTopOffset: 0,
    scrollSpeed: 100,
    urlFilterType: 'hash',
    historyType: 'replace',
    locationFilter: null,
    loadLocation: true,
    afterOpen: noop,
    afterClose: noop,
    afterInit: noop
};
class Collapse {
    $element;
    params;
    toggling;
    $btnElems;
    $activeItem;
    initLoaded;
    static defaults = DEFAULTS;
    #transition = fn_transition();
    constructor(element, options, index) {
        const s = this;
        s.$element = external_$_default()(element);
        const dataOptions = getDataOptions(element, Collapse_EVENT_NAME);
        s.params = external_$_default().extend({}, Collapse.defaults, options, dataOptions);
        s.toggling = false;
        s.$btnElems = s.$element.find(`.${s.params.cssPrefix}__btn`).attr({ 'aria-expanded': 'false' });
        s.$activeItem = null;
        s.initLoaded = false;
        // init
        s.loadFromUrl();
        s.handleEvents();
        s.params.afterInit(s.$element);
        core_Store(element, DATA_NAME, s);
        return s;
    }
    static get version() {
        return VERSION;
    }
    static remove(element, plugin) {
        external_$_default()(element).each(function () {
            const s = plugin || core_Store(this, DATA_NAME);
            s.$element.off(`click.${Collapse_EVENT_NAME} ${Collapse_EVENT_NAME}`);
            external_$_default()(window).off(`popstate.${Collapse_EVENT_NAME}`);
            // delete the Store item
            core_Store(this, DATA_NAME, null);
        });
    }
    handleEvents() {
        const s = this;
        const { cssPrefix } = s.params;
        s.$element.on(`click.${Collapse_EVENT_NAME} ${Collapse_EVENT_NAME}`, `.${cssPrefix}__btn`, function (e) {
            const elemId = external_$_default()(this).attr('aria-controls') || this.hash.substring(1);
            s.toggleAction(elemId);
            e.preventDefault();
        });
        external_$_default()(window).on(`popstate.${Collapse_EVENT_NAME}`, (e) => {
            if (s.params.historyType === 'push') {
                s.loadFromUrl();
                s.initLoaded = true;
                e.preventDefault();
            }
        });
    }
    loadFromUrl() {
        const s = this;
        const p = s.params;
        const loadElem = (filterEl) => {
            const cssOpen = `${p.cssPrefix}--open`;
            const $tryElem = s.$element.find('#' + filterEl);
            if ($tryElem.length) {
                s.$activeItem = $tryElem;
                s.$activeItem.addClass(cssOpen);
                s.$btnElems
                    .filter((i, el) => external_$_default()(el).attr('aria-controls') === filterEl)
                    .attr({ 'aria-expanded': 'true' });
            }
        };
        if (p.locationFilter !== null || p.loadLocation) {
            const filterEl = core_UrlState.get(p.urlFilterType, p.locationFilter);
            const cssOpen = `${p.cssPrefix}--open`;
            s.$element.find(`.${p.cssPrefix}__body.${cssOpen}`).removeClass(cssOpen);
            s.$btnElems.attr({ 'aria-expanded': 'false' });
            if (filterEl) {
                if (Array.isArray(filterEl)) {
                    filterEl.forEach(loadElem);
                }
                else {
                    loadElem(filterEl);
                }
            }
        }
    }
    toggleAction(currElemID) {
        const s = this;
        if (s.toggling || currElemID === null)
            return;
        const { cssPrefix } = s.params;
        const p = s.params;
        s.$activeItem = s.$element.find('#' + currElemID);
        if (s.$activeItem.length) {
            const cssOpen = `${cssPrefix}--open`, cssToggling = `${cssPrefix}--toggling`, cssOpening = `${cssPrefix}--opening`, cssClosing = `${cssPrefix}--closing`, cssBodyOpen = `.${cssPrefix}__body.${cssOpen}`;
            const $currOpenItems = s.$element.find(cssBodyOpen);
            const $itemsToClose = $currOpenItems.filter((i, el) => p.toggleGroup || el.id === currElemID);
            const activeAlreadyOpen = s.$activeItem.hasClass(cssOpen);
            s.#transition(() => {
                s.toggling = true;
                s.$btnElems.each(function () {
                    const $btn = external_$_default()(this);
                    const isCurrent = $btn.attr('aria-controls') === currElemID;
                    const expanded = isCurrent && $btn.attr('aria-expanded') === 'false';
                    if (p.toggleGroup) {
                        $btn.attr({ 'aria-expanded': expanded + '' });
                    }
                    else {
                        if (isCurrent) {
                            $btn.attr({ 'aria-expanded': expanded + '' });
                        }
                    }
                });
                $itemsToClose.each(function () {
                    external_$_default()(this).css({ height: this.scrollHeight });
                });
                setTimeout(() => {
                    $itemsToClose
                        .removeClass(cssOpen)
                        .addClass(`${cssToggling} ${cssClosing}`)
                        .css({ height: 0 });
                }, 0);
                if (!activeAlreadyOpen) {
                    s.$activeItem
                        .addClass(`${cssToggling} ${cssOpening}`)
                        .css({ height: s.$activeItem[0].scrollHeight });
                }
            }, () => {
                s.toggling = false;
                $itemsToClose
                    .removeClass(`${cssToggling} ${cssClosing}`)
                    .css({ height: null });
                s.params.afterClose(s.$btnElems, $itemsToClose);
                if (!activeAlreadyOpen) {
                    s.$activeItem
                        .addClass(cssOpen)
                        .removeClass(`${cssToggling} ${cssOpening}`)
                        .css({ height: null });
                }
                // Update History in URL
                const paramList = [...s.$element.find(cssBodyOpen)].map((el) => el.id);
                const paramVal = paramList.length === 1 ? paramList[0] : paramList.length > 0 ? paramList : null;
                core_UrlState.set(p.urlFilterType, p.locationFilter, paramVal, p.historyType);
                s.params.afterOpen(s.$btnElems, s.$activeItem);
                s.moveToTopOnOpen();
            });
        }
    }
    moveToTopOnOpen() {
        const s = this;
        const { cssPrefix, moveToTopOffset, moveToTopOnOpen, scrollSpeed } = s.params;
        if (s.$activeItem) {
            const $item = s.$activeItem.parent(`.${cssPrefix}__item`) || s.$activeItem;
            if ($item.length && moveToTopOnOpen) {
                // get the compiler to stop from throwing 
                // an error it'll never throw by setting to 'any'
                const elemOffsetTop = $item.offset().top;
                const top = elemOffsetTop - moveToTopOffset;
                smoothScroll(top, scrollSpeed);
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/assets/js/LazyLoad.ts



const LazyLoad_VERSION = '2.0.1';
const LazyLoad_DATA_NAME = 'LazyLoad';
const LazyLoad_EVENT_NAME = 'lazyLoad';
const LazyLoad_DEFAULTS = {
    imgSrcName: 'src',
    bgSrcName: 'bgSrc',
    loadImgs: true,
    inEvt: null,
    outEvt: null,
    force: false,
    observerID: null,
    unobserve: true,
    observerOpts: { rootMargin: '48px' }
};
const lazyElemObservers = new Map();
const lazyElemObserver = (s) => {
    const { observerOpts } = s.params;
    return new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            const { inEvt, outEvt, force, unobserve, loadImgs } = s.params;
            const lazyElem = entry.target;
            if (lazyElem instanceof HTMLElement) {
                if (entry.isIntersecting && isVisible(lazyElem) || force) {
                    loadImgs && s.imgAndBg(s, lazyElem);
                    typeof inEvt === 'function' && inEvt(lazyElem, entry);
                    unobserve && s.lazyElemObserver.unobserve(lazyElem);
                }
                else {
                    typeof outEvt === 'function' && outEvt(lazyElem, entry);
                }
            }
        });
    }, observerOpts);
};
class LazyLoad {
    element;
    params;
    lazyElemObserver;
    static get version() { return LazyLoad_VERSION; }
    static get pluginName() { return LazyLoad_DATA_NAME; }
    static defaults = LazyLoad_DEFAULTS;
    constructor(element, options) {
        const s = this;
        const dataOptions = getDataOptions(element, LazyLoad_EVENT_NAME);
        s.element = element;
        s.lazyElemObserver;
        s.params = external_$_default().extend({}, LazyLoad.defaults, options, dataOptions);
        s.handleEvents();
        return s;
    }
    static remove(element, plugin) {
        external_$_default()(element).each(function () {
            const s = plugin || core_Store(this, LazyLoad_DATA_NAME);
            lazyElemObservers.delete(s.params.observerID);
            s.lazyElemObserver.unobserve(this);
            core_Store(this, LazyLoad_DATA_NAME, null);
        });
    }
    imgAndBg(s, lazyElem) {
        const { imgSrcName, bgSrcName } = s.params;
        const src = lazyElem.dataset[imgSrcName];
        const bgImg = lazyElem.dataset[bgSrcName];
        if (lazyElem.loading === 'lazy') {
            lazyElem.loading = 'eager';
        }
        if (src) {
            lazyElem.src = src;
        }
        if (bgImg) {
            lazyElem.style.backgroundImage = `url("${bgImg}")`;
            lazyElem.removeAttribute('data-bg-src');
        }
    }
    handleEvents() {
        const s = this;
        const { observerID } = s.params;
        if (observerID && !lazyElemObservers.has(observerID)) {
            lazyElemObservers.set(observerID, lazyElemObserver(s));
            s.lazyElemObserver = lazyElemObservers.get(observerID);
        }
        else {
            s.lazyElemObserver = lazyElemObserver(s);
        }
        if (!observerID) {
            console.warn(`It recommended to set an 'observerID', so the element group can leverage the same one.`, s.element);
        }
        s.lazyElemObserver.observe(s.element);
    }
}

;// CONCATENATED MODULE: ./src/assets/js/fn/trapFocus.ts


;
const defaultProps = {
    focusFirst: true,
    nameSpace: 'trapFocus',
    focusable: ['button', 'a', 'input', 'select', 'textarea', '[tabindex]']
};
;
const canFocusEls = (i, el) => {
    const baseFocusableRules = isVisible(el, true) && el.tabIndex !== -1;
    const nodeName = el.nodeName.toUpperCase();
    if ((nodeName === 'BUTTON' || nodeName === 'INPUT')) {
        return baseFocusableRules && !el.disabled;
    }
    return baseFocusableRules && el.style.pointerEvents !== 'none';
};
const trapFocus = (modalEl, props) => {
    const { focusFirst, focusable, nameSpace } = external_$_default().extend({}, defaultProps, props);
    const $trapElem = external_$_default()(modalEl);
    const focusableJoined = typeof focusable === 'string' ? focusable : focusable.join(',');
    const $firstFocusable = $trapElem.find(focusableJoined).filter(canFocusEls);
    let firstFocusable = $firstFocusable.length ? $firstFocusable[0] : null;
    if (focusFirst && firstFocusable) {
        firstFocusable.focus();
    }
    external_$_default()(document.body).on(`keydown.${nameSpace}`, function (e) {
        const $focusable = $trapElem.find(focusableJoined).filter(canFocusEls);
        if (!$focusable.length)
            return;
        const activeEl = document.activeElement;
        const lastFocusable = $focusable[$focusable.length - 1];
        const isTabPressed = e.key === 'Tab';
        firstFocusable = $focusable[0];
        if (!isTabPressed) {
            return;
        }
        if (activeEl.nodeName.toUpperCase() === 'BODY') {
            // somehow we lost focus
            // this can happen if the last element is disabled if it was focused
            // so re-assign to the first element
            firstFocusable && firstFocusable.focus();
            e.preventDefault();
        }
        if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (activeEl &&
                firstFocusable &&
                document.activeElement.isSameNode(firstFocusable)) {
                lastFocusable && lastFocusable.focus();
                e.preventDefault();
            }
        }
        else {
            // if tab key is pressed
            if (activeEl &&
                lastFocusable &&
                activeEl.isSameNode(lastFocusable)) {
                firstFocusable && firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
    return {
        remove: () => {
            external_$_default()(document.body).off(`keydown.${nameSpace}`);
        }
    };
};
/* harmony default export */ const fn_trapFocus = (trapFocus);

;// CONCATENATED MODULE: ./src/assets/js/fn/hyperScript.ts

const getCssAttr = (styleStr, find, rm) => {
    const styleProp = styleStr.indexOf(find) !== -1 ? styleStr.split(find)[1] : null;
    if (!styleProp)
        return null;
    const rmIndex = styleProp.indexOf(rm);
    return rmIndex !== -1 ? styleProp.substring(0, rmIndex) : styleProp;
};
const hyperScript = (selector, props = {}) => {
    const tagName = selector.split(/(\#|\.)/)[0], className = getCssAttr(selector, '.', '#'), idName = getCssAttr(selector, '#', '.'), baseObj = { class: className, id: idName };
    let text = '';
    if (props.text) {
        text = props.text;
        external_$_default().extend(props, { text: null });
    }
    const $elem = external_$_default()(`<${tagName}>`).attr(Object.assign(baseObj, props));
    text && $elem.text(text);
    return $elem;
};
/* harmony default export */ const fn_hyperScript = (hyperScript);

;// CONCATENATED MODULE: ./src/assets/js/Modal.ts







const Modal_VERSION = '1.2.0';
const Modal_EVENT_NAME = 'modal';
const Modal_DATA_NAME = 'Modal';
const Modal_DEFAULTS = {
    enableEvent: 'click',
    appendTo: document.body,
    ariaLabelledby: null,
    ariaLabel: null,
    cssPrefix: 'modal',
    closeBtnIconCss: 'ico i-close',
    closeBtnLabel: 'Close',
    closeOutDelay: 250,
    backDropClose: true,
    fromDOM: false,
    modalCss: null,
    modalID: null,
    src: '',
    urlFilterType: 'hash',
    historyType: 'replace',
    locationFilter: 'modal',
    loadLocation: true,
    onOpenOnce: noop,
    onOpen: noop,
    onClose: noop,
    afterClose: noop
};
const hasCb = (cb, modalObj) => {
    if (cb && typeof cb === 'function') {
        cb(modalObj);
    }
};
class Modal {
    element;
    params;
    modalID;
    modalObj;
    modalEvent;
    trappedFocus;
    enabledElem;
    openedOnce;
    static defaults = Modal_DEFAULTS;
    constructor(element, options) {
        const s = this;
        s.element = element;
        const dataOptions = getDataOptions(element, Modal_EVENT_NAME);
        s.params = external_$_default().extend({}, Modal.defaults, options, dataOptions);
        s.modalID = s.params.modalID;
        s.modalObj = s.getModalObj();
        s.modalEvent = Modal_EVENT_NAME + '_' + s.modalID;
        s.trappedFocus;
        s.enabledElem;
        s.openedOnce = false;
        s.handleEvents();
        s.loadFromUrl();
        core_Store(element, Modal_DATA_NAME, s);
        return s;
    }
    static get version() {
        return Modal_VERSION;
    }
    static remove(element, plugin) {
        external_$_default()(element).each(function () {
            const s = plugin || core_Store(this, Modal_DATA_NAME);
            const params = s.params;
            const { $backdrop, $closeBtn } = s.modalObj;
            s.modalObj.show && s.modalObj.close();
            external_$_default()(s.element).off(`${s.params.enableEvent}.${s.modalEvent}`);
            $closeBtn.off(`click.${s.modalEvent}Dismiss`);
            if (params.backDropClose)
                $backdrop.off(`click.${s.modalEvent}Dismiss`);
            external_$_default()(document)
                .off(`keydown.${s.modalEvent}Dismiss`)
                .off(`${s.modalEvent}Dismiss`);
            external_$_default()(window).off(`popstate.${s.modalEvent} ${s.modalEvent}`);
            core_Store(this, Modal_DATA_NAME, null);
        });
    }
    handleEvents() {
        const s = this;
        external_$_default()(s.element).on(`${s.params.enableEvent}.${s.modalEvent}`, function (e) {
            s.setDisplayAndEvents();
            e.preventDefault();
        });
    }
    setDisplayAndEvents() {
        const s = this;
        s.enableModal();
        external_$_default()(document).on(`keydown.${s.modalEvent}Dismiss`, function (e) {
            const ekey = e.code || e.originalEvent.key; //cash-dom || jquery
            if (ekey === 'Escape') {
                s.close();
                e.preventDefault();
            }
        });
        external_$_default()(document).on(`${s.modalEvent}Dismiss`, s.close);
    }
    getModalObj() {
        const s = this, p = s.params, $closeBtn = fn_hyperScript(`button.${p.cssPrefix}__btn-dismiss`, {
            type: 'button',
            'aria-label': p.closeBtnLabel
        }).append(fn_hyperScript(`i.${p.closeBtnIconCss}`)), $dialogContent = fn_hyperScript(`div.${p.cssPrefix}__dialog-content`), $dialog = fn_hyperScript(`div.${p.cssPrefix}__dialog`).append($closeBtn, $dialogContent), $backdrop = fn_hyperScript(`div.${p.cssPrefix}__backdrop`), $modal = fn_hyperScript(`div`, {
            class: p.cssPrefix + (p.modalCss ? ' ' + p.modalCss : ''),
            'aria-label': (p.ariaLabel || s.element.dataset.ariaLabel) || null,
            'aria-labelledby': (p.ariaLabelledby || s.element.dataset.ariaLabelledby) || null,
            id: s.modalID
        }).append($backdrop, $dialog), $content = external_$_default()(s.params.src || s.element.hash || s.element.dataset.modalSrc);
        return {
            $backdrop,
            $content,
            contentAppended: false,
            $dialog,
            $dialogContent,
            $closeBtn,
            id: s.modalID,
            $modal,
            close: () => s.close(),
            show: false
        };
    }
    enableModal() {
        const s = this;
        const { $backdrop, $closeBtn, $content, $modal } = s.modalObj;
        const p = s.params;
        s.enabledElem = document.activeElement;
        if (p.fromDOM) {
            $content.after(fn_hyperScript(`span.${p.cssPrefix}-content-placemarker#${s.modalObj.id}_marker`));
        }
        if (!s.modalObj.contentAppended) {
            s.modalObj.$dialogContent.append($content);
            external_$_default().extend(s.modalObj, { contentAppended: true });
        }
        external_$_default()(p.appendTo).append($modal);
        // attach events after appended to DOM
        $closeBtn.on(`click.${s.modalEvent}Dismiss`, () => s.close());
        if (p.backDropClose)
            $backdrop.on(`click.${s.modalEvent}Dismiss`, () => s.close());
        hasCb(p.onOpen, s.modalObj);
        if (!s.openedOnce) {
            hasCb(p.onOpenOnce, s.modalObj);
            s.openedOnce = true;
        }
        $modal.attr({
            role: 'dialog',
            'aria-modal': 'true'
        });
        setTimeout(() => {
            $modal.addClass(p.cssPrefix + '--show');
            s.trappedFocus = fn_trapFocus($modal, { nameSpace: camelCase(s.modalID) });
            external_$_default().extend(s.modalObj, { show: true });
        }, 0);
        external_$_default()(document.body).addClass(p.cssPrefix + '-open').css({
            overflow: 'hidden',
            'padding-right': '0px'
        });
        core_UrlState.set(p.urlFilterType, p.locationFilter, s.modalID, p.historyType);
    }
    close() {
        const s = this;
        const { $backdrop, $closeBtn, $content, $modal } = s.modalObj;
        const p = s.params;
        hasCb(p.onClose, s.modalObj);
        $modal.addClass(p.cssPrefix + '--dismissing');
        $modal.removeClass(p.cssPrefix + '--show');
        // detach events
        $closeBtn.off(`click.${s.modalEvent}Dismiss`);
        if (p.backDropClose)
            $backdrop.off(`click.${s.modalEvent}Dismiss`);
        external_$_default()(document)
            .off(`keydown.${s.modalEvent}Dismiss`)
            .off(`${s.modalEvent}Dismiss`);
        core_UrlState.set(p.urlFilterType, p.locationFilter, null, p.historyType);
        setTimeout(() => {
            $modal.attr({
                role: 'dialog',
                'aria-modal': ''
            }).removeClass(p.cssPrefix + '--dismissing').css({
                display: ''
            });
            external_$_default()(document.body).removeClass(p.cssPrefix + '-open').css({
                overflow: '',
                'padding-right': ''
            });
            s.trappedFocus.remove();
            if (s.enabledElem && s.enabledElem instanceof HTMLElement) {
                s.enabledElem.focus();
            }
            if (p.fromDOM) {
                external_$_default()('#' + s.modalObj.id + '_marker').after($content).remove();
                external_$_default().extend(s.modalObj, { contentAppended: false });
            }
            hasCb(p.afterClose, s.modalObj);
            $modal.remove();
            external_$_default().extend(s.modalObj, { show: false });
        }, p.closeOutDelay);
    }
    loadFromUrl() {
        const s = this;
        const p = s.params;
        if (p.locationFilter !== null || p.loadLocation) {
            const filterEl = core_UrlState.get(p.urlFilterType, p.locationFilter);
            if (filterEl === s.modalID) {
                s.modalObj.show ? s.close() : s.setDisplayAndEvents();
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/assets/js/Tabs.ts





const Tabs_VERSION = "1.5.0";
const Tabs_DATA_NAME = 'Tabs';
const Tabs_EVENT_NAME = 'tabs';
const Tabs_DEFAULTS = {
    tabsEvent: 'click',
    cssPrefix: 'tabs',
    locationFilter: null,
    urlFilterType: 'hash',
    historyType: 'push',
    loadLocation: true,
    addIDtoPanel: true,
    ariaLabel: true,
    tabChange: () => { },
    onInit: () => { }
};
const getTabIDFromEl = (el) => {
    return (el instanceof HTMLButtonElement ? el.dataset.href : el.hash)?.replace(/^\#/, '') || '';
};
class Tabs {
    static get version() {
        return Tabs_VERSION;
    }
    $element;
    params;
    $tabsNav;
    $tabsNavClickElems;
    tabsNavClickElems;
    $tabsBody;
    $tabsBodyPanels;
    prevTabId;
    initTabId;
    initDefaultContent;
    static defaults = Tabs_DEFAULTS;
    #transition = fn_transition();
    constructor(element, options) {
        const s = this;
        const dataOptions = getDataOptions(element, Tabs_EVENT_NAME);
        s.$element = external_$_default()(element);
        s.params = external_$_default().extend({}, Tabs.defaults, options, dataOptions);
        const p = s.params;
        s.$tabsNav = s.$element.find(`.${p.cssPrefix}__nav`).first();
        s.$tabsBody = s.$element.find(`.${p.cssPrefix}__body`).first();
        const tabsBody = s.$tabsBody[0];
        s.$tabsBodyPanels = s.$tabsBody.find(`.${p.cssPrefix}__panel`)
            // ensure they're the children of the body
            // must be direct child
            .filter((i, el) => el.parentElement.isSameNode(tabsBody));
        s.$tabsNavClickElems = s.$tabsNav.find('a, button');
        s.tabsNavClickElems = [...s.$tabsNavClickElems];
        s.prevTabId = null;
        s.initDefaultContent = s.$tabsBodyPanels.eq(0).data('tab-id');
        //init
        s.setAriaAttrs();
        s.handleEvents();
        s.loadDefaultContent();
        s.loadFromUrl();
        s.params.onInit(s.$tabsNav, s.$tabsBody);
        return s;
    }
    loadDefaultContent() {
        const s = this;
        const tabId = s.initDefaultContent;
        const clickElem = s.getClickElemFromTabId(tabId);
        s.changeTabElements(clickElem, tabId, false);
    }
    loadFromUrl() {
        const s = this;
        const p = s.params;
        if (p.locationFilter !== null || p.loadLocation) {
            const tabId = core_UrlState.get(p.urlFilterType, p.locationFilter);
            if (tabId) {
                const clickElem = s.getClickElemFromTabId(tabId);
                clickElem && s.changeTabElements(clickElem, tabId, false);
            }
        }
    }
    getClickElemFromTabId(tabId) {
        const $clickElem = this.$tabsNavClickElems.filter((i, el) => getTabIDFromEl(el) === tabId);
        if ($clickElem.length) {
            return $clickElem[0];
        }
        return null;
    }
    setAriaAttrs() {
        const s = this;
        const p = s.params;
        s.$tabsNavClickElems.each(function () {
            const tabId = getTabIDFromEl(this);
            const $tabBodyItem = s.$tabsBodyPanels.filter((i, el) => el.dataset.tabId === tabId);
            external_$_default()(this).attr({
                'aria-selected': 'false',
                'role': 'tab',
                'aria-controls': tabId
            });
            $tabBodyItem.attr({
                'aria-label': p.ariaLabel ? this.textContent : null,
                'role': 'tabpanel',
                tabindex: '-1'
            });
            if (p.addIDtoPanel) {
                $tabBodyItem.attr({ 'id': tabId });
            }
        });
    }
    handleEvents() {
        const s = this;
        s.$tabsNav.on(`${s.params.tabsEvent}.${Tabs_EVENT_NAME} ${Tabs_EVENT_NAME}`, "a, button", function (e) {
            const clickElem = this;
            const tabId = getTabIDFromEl(clickElem);
            s.changeTabElements(clickElem, tabId);
            e.preventDefault();
        });
        s.$tabsNav.on('keydown.' + Tabs_EVENT_NAME, function (e) {
            const target = e.target;
            const index = s.tabsNavClickElems.findIndex(el => el.isSameNode(target));
            const next = e.key === 'ArrowRight' || e.key === 'ArrowDown';
            const prev = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
            if (index !== -1 && (next || prev)) {
                const changeIndex = next ? index + 1 : index - 1;
                const nextBtn = s.tabsNavClickElems[changeIndex];
                if (nextBtn) {
                    // $(target).attr({'tabindex': '-1'});
                    const tabId = getTabIDFromEl(nextBtn);
                    s.changeTabElements(nextBtn, tabId);
                    external_$_default()(nextBtn)[0].focus();
                }
                e.preventDefault();
            }
        });
        external_$_default()(window).on(`popstate.${Tabs_EVENT_NAME} ${Tabs_EVENT_NAME}`, (e) => {
            if (s.params.historyType === 'push') {
                s.loadFromUrl();
                e.preventDefault();
            }
        });
    }
    changeTabElements(clickElem, tabId, updateUrl = true) {
        const s = this;
        const p = s.params;
        let hasTab = false;
        const cssOpen = `${p.cssPrefix}__panel--open`, cssToggling = `${p.cssPrefix}__panel--toggling`, cssOpening = `${p.cssPrefix}__panel--opening`, cssClosing = `${p.cssPrefix}__panel--closing`;
        s.#transition(() => {
            s.$tabsBodyPanels.each(function () {
                const thisTabId = this.dataset.tabId;
                if (thisTabId === tabId) {
                    external_$_default()(this)
                        .addClass(`${cssToggling} ${cssOpening}`)
                        .attr({ 'aria-hidden': null, tabindex: '0' });
                    hasTab = true;
                }
                if (s.prevTabId && s.prevTabId === thisTabId) {
                    external_$_default()(this)
                        .addClass(`${cssToggling} ${cssClosing}`)
                        .attr({ 'aria-hidden': 'true', tabindex: '-1' });
                }
            });
            if (hasTab) {
                s.params.tabChange(tabId, s.prevTabId, s.$tabsNav, s.$tabsBody);
                s.prevTabId = tabId;
                s.$tabsNavClickElems
                    .attr({ 'aria-selected': 'false', tabindex: '-1' })
                    .parent('li').removeClass(`${p.cssPrefix}__nav-li--active`);
                external_$_default()(clickElem)
                    .attr({ 'aria-selected': 'true', tabindex: '0' })
                    .parent('li').addClass(`${p.cssPrefix}__nav-li--active`);
                if (updateUrl) {
                    const paramVal = s.initDefaultContent === tabId ? null : tabId;
                    if (p.urlFilterType === 'hashVal') {
                        core_UrlState.setHashVal(paramVal, p.historyType);
                    }
                    else {
                        core_UrlState.set(p.urlFilterType, p.locationFilter, paramVal, p.historyType);
                    }
                }
            }
        }, () => {
            s.$tabsBodyPanels.each(function () {
                const isTab = this.dataset.tabId === tabId;
                external_$_default()(this)
                    .toggleClass(cssOpen, isTab)
                    .removeClass(`${cssToggling} ${cssOpening} ${cssClosing}`);
            });
        });
    }
    static remove(element, plugin) {
        external_$_default()(element).each(function () {
            const s = plugin || core_Store(this, Tabs_DATA_NAME);
            const params = s.params;
            s.$tabsNav.off(`${params.tabsEvent}.${Tabs_EVENT_NAME} ${Tabs_EVENT_NAME}`);
            s.$tabsNav.off('keydown.' + Tabs_EVENT_NAME);
            s.$tabsNav.find('a, button').attr({ tabndex: null });
            external_$_default()(window).off(`popstate.${Tabs_EVENT_NAME} ${Tabs_EVENT_NAME}`);
            core_Store(this, Tabs_DATA_NAME, null);
        });
    }
}

;// CONCATENATED MODULE: ./src/assets/js/Toastr.ts



const Toastr_VERSION = "1.0.0";
const Toastr_DATA_NAME = 'Toastr';
const Toastr_EVENT_NAME = 'toastr';
const Toastr_DEFAULTS = {
    duration: 3000,
    appendTo: document.body,
    animationDuration: 500,
    content: '',
    outerCss: 'toastr',
    enabledCss: 'toastr--enabled',
    dismissCss: 'toastr--dismiss',
    btnDismissCss: 'toastr__btn-dismiss',
    closeIconCss: 'ico i-close',
    ariaLive: 'polite',
    closeTextCopy: 'Dismiss',
    cssGroupKey: 'std',
    oneOnly: false
};
const toastContainers = new Map();
let currentlyToastingGlobal = false;
class Toastr {
    static get version() { return Toastr_VERSION; }
    static Defaults = Toastr_DEFAULTS;
    static DismissedEventName = 'toastDismissed';
    toastrFinallyTimer;
    currentlyToasting;
    toasterBodyBuilt;
    $element;
    $toastrBody;
    $toastrWrap;
    params;
    constructor(element, options) {
        const s = this;
        const dataOptions = getDataOptions(element, Toastr_EVENT_NAME);
        //state
        s.$element = external_$_default()(element);
        s.toastrFinallyTimer = null;
        s.$toastrBody = null;
        s.$toastrWrap = null;
        s.currentlyToasting = false;
        s.params = external_$_default().extend({}, Toastr.Defaults, options, dataOptions);
        s.$element.on(`click.${Toastr_EVENT_NAME} ${Toastr_EVENT_NAME}`, () => s.launch());
        return s;
    }
    dismiss() {
        const s = this;
        const { animationDuration, dismissCss } = s.params;
        s.toastrFinallyTimer && clearTimeout(s.toastrFinallyTimer);
        s.$toastrWrap.addClass(dismissCss);
        setTimeout(() => {
            const $toatrContainer = s.getToasterContainer();
            s.$toastrWrap.removeClass(dismissCss).detach();
            if (!$toatrContainer.children('div').length) {
                s.getToasterContainer().detach();
            }
            s.currentlyToasting = false;
            currentlyToastingGlobal = false;
        }, animationDuration);
    }
    setContent(content, updateNow = false) {
        const s = this;
        external_$_default().extend(s.params, { content });
        if (updateNow) {
            s.updateContent(s.params.content);
        }
    }
    launch() {
        const s = this;
        const { content, dismissCss, duration, enabledCss, oneOnly } = s.params;
        if (!s.currentlyToasting) {
            if (currentlyToastingGlobal && oneOnly) {
                return;
            }
            if (!s.toasterBodyBuilt) {
                s.buildElems();
            }
            s.$toastrWrap.removeClass(`${dismissCss} ${enabledCss}`);
            s.updateContent(content);
            external_$_default()(document.body).append(s.getToasterContainer().append(s.$toastrWrap));
            setTimeout(() => s.$toastrWrap.addClass(enabledCss), 0);
            // Auto remove if not dismissed
            s.toastrFinallyTimer = setTimeout(() => s.dismiss(), duration);
            s.currentlyToasting = true;
            currentlyToastingGlobal = true;
        }
    }
    getToasterContainer() {
        const { cssGroupKey, outerCss } = this.params;
        const toasterWrapCss = `${outerCss}-wrap ${outerCss}-wrap--${cssGroupKey}`;
        if (!toastContainers.has(toasterWrapCss)) {
            toastContainers.set(toasterWrapCss, external_$_default()('<div/>').attr({
                class: toasterWrapCss
            }));
        }
        return toastContainers.get(toasterWrapCss);
    }
    buildElems() {
        const s = this;
        const { ariaLive, btnDismissCss, closeIconCss, closeTextCopy, outerCss } = s.params;
        s.$toastrBody = external_$_default()('<div>').attr({ class: s.params.outerCss + '__body' });
        s.$toastrWrap = external_$_default()('<div>').attr({ class: outerCss, role: 'alert', 'aria-live': ariaLive }).append(s.$toastrBody, external_$_default()('<button>').attr({ type: 'button', class: btnDismissCss }).append(external_$_default()('<i>').attr({ class: closeIconCss }).append(external_$_default()('<span>').attr({ class: 'sr-only' }).text(closeTextCopy))));
        s.toasterBodyBuilt = true;
        // click event to dismiss
        s.$toastrWrap.on('click', 'button', () => s.dismiss());
    }
    updateContent(content) {
        const s = this;
        if (s.$toastrBody) {
            s.$toastrBody.empty();
            if ('string' === typeof content) {
                s.$toastrBody.html(content);
            }
            else {
                s.$toastrBody.append(content);
            }
        }
    }
    static setContent(element, content, updateNow = false) {
        external_$_default()(element).each(function () {
            const s = core_Store(this, Toastr_DATA_NAME);
            external_$_default().extend(s.params, { content });
            if (updateNow) {
                s.updateContent(s.params.content);
            }
        });
    }
    static remove(element, plugin) {
        external_$_default()(element).each(function () {
            const s = plugin || core_Store(this, Toastr_DATA_NAME);
            s.$element.off(`click.${Toastr_EVENT_NAME} ${Toastr_EVENT_NAME}`);
            core_Store(this, Toastr_DATA_NAME, null);
        });
    }
}

;// CONCATENATED MODULE: ./src/assets/js/AccessibleMenu.ts




const KEYS = {
    esc: 'Escape',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    down: 'ArrowDown',
    up: 'ArrowUp',
    enter: 'Enter',
    shift: 'Shift',
    space: 'Space',
    tab: 'Tab'
};
const AccessibleMenu_VERSION = "1.3.0";
const AccessibleMenu_DATA_NAME = 'AccessibleMenu';
const AccessibleMenu_EVENT_NAME = 'accessibleMenu';
const AccessibleMenu_DEFAULTS = {
    keyDirections: ['horizontal', 'vertical', 'vertical'],
    focusCss: 'focus',
    focusInElems: 'a, [tabindex]',
    focusLeaveElems: 'a, [tabindex], select, button'
};
const visible = (i, el) => isVisible(el);
class AccessibleMenu {
    element;
    $element;
    params;
    static get version() { return AccessibleMenu_VERSION; }
    static defaults = AccessibleMenu_DEFAULTS;
    constructor(element, options) {
        const s = this;
        const dataOptions = getDataOptions(element, AccessibleMenu_EVENT_NAME);
        s.element = element;
        s.$element = external_$_default()(element);
        s.params = external_$_default().extend({}, AccessibleMenu.defaults, options, dataOptions);
        s.handleEvents();
        return s;
    }
    static remove(element, plugin) {
        external_$_default()(element).each(function () {
            const s = plugin || core_Store(this, AccessibleMenu_DATA_NAME);
            s.$element.off('focusin.' + AccessibleMenu_EVENT_NAME);
            s.$element.off('mouseleave.' + AccessibleMenu_EVENT_NAME);
            s.$element.off('blur.' + AccessibleMenu_EVENT_NAME);
            s.$element.off('keydown.' + AccessibleMenu_EVENT_NAME);
            core_Store(this, AccessibleMenu_DATA_NAME, null);
        });
    }
    prev(props) {
        const s = this;
        const p = props;
        const l = p.$ulParents.length - 1;
        const key = p.e.key;
        if (key === KEYS.left && p.keyDirections[l] === "horizontal" ||
            key === KEYS.up && p.keyDirections[l] === "vertical" ||
            key === KEYS.left && p.keyDirections[l] === "vertical" &&
                (l > 1 && p.keyDirections[l - 1] === "vertical" && external_$_default()(p.activeElem).parent('li').index() === 0)) {
            s.#focusListItem(p.activeElem, p.$ulParents, p.focusCss, true, p.focusInElems);
            p.e.preventDefault();
        }
    }
    next(props) {
        const s = this;
        const p = props;
        const l = p.$ulParents.length - 1;
        const atRootUl = p.$ulParents.length === 1;
        const key = p.e.key;
        if (
        //go to sibling <li>
        key === KEYS.right && p.keyDirections[l] === "horizontal" ||
            key === KEYS.down && p.keyDirections[l] === "vertical") {
            const isLastAtRoolLevel = atRootUl && external_$_default()(p.activeElem).closest('li').last();
            const $currentLi = external_$_default()(p.activeElem).closest('li');
            const isLastListItem = !$currentLi.next('li').length;
            if (isLastAtRoolLevel && isLastListItem) {
                s.#escapeFromUlAtRootNext(s.params.focusLeaveElems, p.$ulParents, p.activeElem);
            }
            else {
                s.#focusListItem(p.activeElem, p.$ulParents, p.focusCss, false, p.focusInElems);
                p.e.preventDefault();
            }
        }
        if (
        //go to the nestled <li>
        key === KEYS.right && p.keyDirections[l] === "vertical" ||
            key === KEYS.down && p.keyDirections[l] === "horizontal") {
            s.#focusNestledListItem(p.activeElem, p.focusCss, p.focusInElems);
            p.e.preventDefault();
        }
    }
    handleEvents() {
        const s = this;
        let to = null;
        external_$_default()(s.element).on('focusin.' + AccessibleMenu_EVENT_NAME, this.params.focusInElems, function (e) {
            to && clearTimeout(to);
            external_$_default()(this).parent('li').addClass('focus')
                .siblings('li').removeClass('focus');
        }).on('mouseleave.' + AccessibleMenu_EVENT_NAME, function () {
            external_$_default()(this).find('li.focus').removeClass('focus');
        }).on('focusout.' + AccessibleMenu_EVENT_NAME, function () {
            to = setTimeout(() => {
                external_$_default()(this).find('li.focus').removeClass('focus');
            }, 200);
        });
        external_$_default()(s.element).on('keydown.' + AccessibleMenu_EVENT_NAME, function (e) {
            const { focusCss, keyDirections, focusInElems } = s.params;
            const activeElem = document.activeElement;
            const $ulParents = external_$_default()(activeElem).parents('ul');
            const props = { e, $ulParents, activeElem, focusCss, keyDirections, focusInElems };
            s.#escapeKey(e, $ulParents, focusCss, focusInElems);
            s.prev(props);
            s.next(props);
        });
    }
    #escapeKey(e, $ulParents, focusCss, focusInElems) {
        if (e.key == KEYS.esc) {
            if ($ulParents.length > 1) {
                const $anchor = $ulParents.eq(0).closest('li').find(focusInElems).filter(visible);
                $anchor[0].focus();
                $anchor.parent('li').addClass(focusCss);
            }
            e.preventDefault();
        }
    }
    #focusListItem(activeElem, $ulParents, focusCss, prev, focusInElems) {
        const $aeLi = external_$_default()(activeElem).parent('li');
        const $el = $aeLi[prev ? 'prev' : 'next']('li').filter(visible);
        if ($el.length) {
            $el.addClass(focusCss).siblings('li').removeClass(focusCss);
            $el.find(focusInElems)[0].focus();
        }
        else {
            if ($ulParents.length > 1) {
                const $anchor = $ulParents.eq(0).parent('li').find('a').filter(visible);
                if ($anchor.length) {
                    $anchor[0].focus();
                    $anchor.parent('li').eq(0).addClass(focusCss);
                }
            }
        }
    }
    #focusNestledListItem(activeElem, focusCss, focusInElems) {
        const $el = external_$_default()(activeElem).parent('li').find('li').filter(visible);
        if ($el.length) {
            $el.addClass(focusCss).siblings('li').removeClass(focusCss);
            $el.find(focusInElems).filter(visible)[0].focus();
        }
    }
    #escapeFromUlAtRootNext(focusLeaveElems, $ulParents, activeElem) {
        const $rootUl = $ulParents.eq(0);
        const focusableElems = document.querySelectorAll(focusLeaveElems);
        let atCurrElem = false;
        for (let i = 0, l = focusableElems.length; i < l; i++) {
            const elem = focusableElems[i];
            if (!atCurrElem && activeElem.isSameNode(elem)) {
                atCurrElem = true;
            }
            if (atCurrElem && !$rootUl.has(elem).length) {
                if (elem instanceof HTMLElement) {
                    elem.focus();
                    break;
                }
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/assets/js/NavDesktop.ts



const NavDesktop_VERSION = "2.0.0";
const NavDesktop_DATA_NAME = 'NavDesktop';
const NavDesktop_EVENT_NAME = 'navDesktop';
const NavDesktop_DEFAULTS = {
    stopWidth: 768,
    delay: 800,
    navLeavingDelay: 800,
    outerElem: document.body,
    cssPrefix: 'menu',
    hoverCss: 'hover'
};
class NavDesktop {
    element;
    params;
    cssList;
    stayHover;
    navLeaving;
    static defaults = NavDesktop_DEFAULTS;
    static get version() {
        return NavDesktop_VERSION;
    }
    constructor(element, options) {
        const s = this;
        s.stayHover;
        s.navLeaving;
        s.element = element;
        const dataOptions = getDataOptions(element, NavDesktop_EVENT_NAME);
        s.params = external_$_default().extend({}, NavDesktop.defaults, options, dataOptions);
        const { cssPrefix } = s.params;
        s.cssList = {
            // menuOuterOpen: `${cssPrefix}--outer-open`,
            menuHasUL: `${cssPrefix}__has-ul`,
            menuNoUl: `${cssPrefix}__no-ul`,
            menuElemEdge: `${cssPrefix}__elem-on-edge`,
            menuHovered: `${cssPrefix}--hover`,
            menuLeaving: `${cssPrefix}--leaving`,
        };
        s.addCssToElems();
        s.handleEvents();
        return s;
    }
    static remove(element, plugin) {
        external_$_default()(element).each(function () {
            const s = plugin || core_Store(this, NavDesktop_DATA_NAME);
            const $el = external_$_default()(s.element);
            $el.find('ul').off(`mouseover.${NavDesktop_EVENT_NAME} focusin.${NavDesktop_EVENT_NAME} focusout.${NavDesktop_EVENT_NAME}`);
            $el.off(`mouseout.${NavDesktop_EVENT_NAME}`);
            core_Store(this, NavDesktop_DATA_NAME, null);
        });
    }
    addCssToElems() {
        const s = this;
        const css = s.cssList;
        external_$_default()('li', s.element)
            .addClass(css.menuNoUl)
            .has('ul').each(function () {
            external_$_default()(this).removeClass(css.menuNoUl);
            if (!external_$_default()(this).hasClass(css.menuHasUL)) {
                external_$_default()(this).addClass(css.menuHasUL);
            }
        });
    }
    handleEvents() {
        const s = this;
        let prevEvent = null;
        const evtTracker = (elem, e, cb) => {
            const currEvent = e.type;
            const containsOrISElem = elem.isSameNode(e.target) ? true : !!external_$_default()(e.target).parents(elem).length;
            if (!prevEvent || (prevEvent !== currEvent && containsOrISElem)) {
                prevEvent = currEvent;
                cb();
            }
        };
        external_$_default()(s.element).find('ul').on(`mouseover.${NavDesktop_EVENT_NAME} focusin.${NavDesktop_EVENT_NAME}`, 'li, ul', function (e) {
            const li = this;
            const css = s.cssList;
            const p = s.params;
            evtTracker(li, e, () => {
                s.edgeDetector(li);
                const $liLiParents = external_$_default()(li).parents('li');
                li.classList.add(p.hoverCss);
                $liLiParents.addClass(p.hoverCss);
                external_$_default()(li).find(`.${p.hoverCss}`).removeClass(p.hoverCss);
                external_$_default()(li).siblings('li').removeClass(p.hoverCss);
                $liLiParents.length === 0 &&
                    external_$_default()(s.element).find(`.${p.hoverCss}`).removeClass(p.hoverCss);
                s.navLeaving && clearTimeout(s.navLeaving);
                s.stayHover && clearTimeout(s.stayHover);
                external_$_default()(p.outerElem).addClass(css.menuHovered).removeClass(css.menuLeaving);
            });
        }).on(`mouseout.${NavDesktop_EVENT_NAME} focusout.${NavDesktop_EVENT_NAME}`, 'li, ul', function (e) {
            const liOrUl = this;
            const p = s.params;
            const css = s.cssList;
            evtTracker(liOrUl, e, () => {
                s.stayHover = setTimeout(() => {
                    external_$_default()(s.element).find(`.${p.hoverCss}`).removeClass(`${p.hoverCss} ${css.menuElemEdge}`);
                    external_$_default()(s.element).find(`.${css.menuElemEdge}`).removeClass(css.menuElemEdge);
                    external_$_default()(p.outerElem)
                        .removeClass(css.menuHovered)
                        .addClass(css.menuLeaving);
                    s.navLeaving = setTimeout(() => {
                        external_$_default()(p.outerElem).removeClass(css.menuLeaving);
                    }, p.navLeavingDelay);
                }, p.delay);
            });
        });
    }
    edgeDetector(liOrUl) {
        const s = this;
        const { stopWidth } = s.params;
        const css = s.cssList;
        const dw = external_$_default()(window).width();
        if (stopWidth < dw) {
            const $uls = external_$_default()(liOrUl).find('ul');
            if ($uls.length) {
                const ul = $uls[0], l = external_$_default()(ul).offset().left, uw = ul.scrollWidth, fullyVisible = (l + uw <= dw);
                if (!fullyVisible) {
                    liOrUl.classList.add(css.menuElemEdge);
                }
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/assets/js/core/constants.ts
const constants_KEYS = {
    esc: 'Escape',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    down: 'ArrowDown',
    up: 'ArrowUp',
    enter: 'Enter',
    shift: 'Shift',
    space: 'Space',
    tab: 'Tab'
};
const PHOTO_RGX = /\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$|(\?|&|&amp;)(image|ext\=\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg))?$/i;

;// CONCATENATED MODULE: ./src/assets/js/NavMobile.ts






const NavMobile_VERSION = "3.0.0";
const NavMobile_DATA_NAME = 'NavMobile';
const NavMobile_EVENT_NAME = 'navMobile';
const NavMobile_DEFAULTS = {
    enableBtn: '#mobile-nav-btn',
    ariaLabel: 'Toggle site navigation',
    subMenuText: 'toggle menu for',
    insertToggleBtnAfter: 'a',
    slideDuration: 400,
    outerElement: document.body,
    outsideClickClose: true,
    animateHeight: true,
    cssPrefix: 'menu',
    menuBtnCss: 'i i-arrow-b',
    menuBtnSkip: false,
    afterNavItemOpen: noop,
    afterNavItemClose: noop,
    afterOpen: noop,
    afterClose: noop,
    doTrapFocus: true,
    trapFocusElem: null,
    stopPropagation: true,
    bkptEnable: null
};
class NavMobile {
    $element;
    params;
    menuOpened;
    allowClick;
    cssList;
    static get version() { return NavMobile_VERSION; }
    static defaults = NavMobile_DEFAULTS;
    #transition = fn_transition();
    constructor(element, options) {
        const s = this;
        const dataOptions = getDataOptions(element, NavMobile_EVENT_NAME);
        s.$element = external_$_default()(element);
        s.params = external_$_default().extend({}, NavMobile.defaults, options, dataOptions);
        const { cssPrefix, menuBtnCss } = s.params;
        s.cssList = {
            menuOuterOpen: `${cssPrefix}--outer-open`,
            menuHasUL: `${cssPrefix}__has-ul`,
            menuOpen: `${cssPrefix}--open`,
            menuOpening: `${cssPrefix}--is-opening`,
            menuClosing: `${cssPrefix}--is-closing`,
            menuToggling: `${cssPrefix}--toggling`,
            menuBtnCss: `${cssPrefix}__btn-nav ${menuBtnCss}`
        };
        //run the methods
        s.addChildNavCss();
        s.handleEvents();
        s.checkIfEnabled();
        const elemID = element.id || element.className;
        external_$_default()(s.params.enableBtn).attr({
            'aria-controls': elemID,
            'aria-label': s.params.ariaLabel
        });
        return s;
    }
    handleEvents() {
        const s = this;
        const css = s.cssList;
        const $enableBtn = external_$_default()(s.params.enableBtn);
        $enableBtn
            .attr({ 'aria-expanded': 'false' })
            .on(`click.${NavMobile_EVENT_NAME} ${NavMobile_EVENT_NAME}`, function (e) {
            if (!s.allowClick)
                return;
            s.#menuToggle();
            e.stopPropagation();
            e.preventDefault();
        });
        external_$_default()(document).on(`keydown.${NavMobile_EVENT_NAME}`, (e) => {
            if (e.code === constants_KEYS.esc && s.$element.hasClass(css.menuOpen) && s.allowClick) {
                s.#menuToggle();
                if ($enableBtn.length) {
                    $enableBtn[0].focus();
                }
            }
        });
        s.#navToggle();
        s.#outsideClickClose();
    }
    #menuToggle() {
        const s = this;
        const p = s.params;
        const css = s.cssList;
        let trappedFocus = null;
        const $enableBtn = external_$_default()(p.enableBtn);
        const $elemParent = s.$element.parent();
        const doClose = s.menuOpened;
        const cssMenuState = `${doClose ? css.menuClosing : css.menuOpening} ${css.menuToggling}`;
        s.#transition(() => {
            s.menuOpened = !doClose;
            s.$element.addClass(cssMenuState);
            external_$_default()(p.enableBtn).attr({ 'aria-expanded': !doClose + '' });
            external_$_default()(p.outerElement)
                .toggleClass(css.menuOuterOpen, !doClose)
                .addClass(cssMenuState);
            if (doClose) {
                $elemParent
                    .find(`.${css.menuOpen}`)
                    .removeClass(css.menuOpen)
                    .find("[style]").css({ 'display': null });
                trappedFocus && trappedFocus.remove();
            }
            else {
                if (p.doTrapFocus) {
                    trappedFocus = fn_trapFocus(p.trapFocusElem || s.$element, { nameSpace: NavMobile_EVENT_NAME });
                }
            }
        }, () => {
            external_$_default()(p.outerElement).removeClass(cssMenuState);
            s.$element.removeClass(cssMenuState);
            if (!doClose) {
                s.$element.addClass(css.menuOpen);
            }
            s.params[doClose ? 'afterClose' : 'afterOpen'](s.$element, external_$_default()(p.outerElement), $enableBtn);
        }, p.slideDuration);
    }
    #navToggle() {
        const s = this;
        const css = s.cssList;
        s.$element.on(`click.${NavMobile_EVENT_NAME} ${NavMobile_EVENT_NAME}`, `.${css.menuBtnCss.replace(/\s/g, '.')}`, function (e) {
            const p = s.params;
            const css = s.cssList;
            const $li = external_$_default()(this).closest(`.${css.menuHasUL}`);
            const doClose = $li.hasClass(css.menuOpen);
            const $ul = $li.find('ul').first();
            //exit because were in desktop view
            if (!s.allowClick) {
                return;
            }
            const cssMenuState = `${css.menuToggling} ${doClose ? css.menuClosing : css.menuOpening}`;
            s.allowClick = doClose;
            s.#transition(() => {
                $li.addClass(cssMenuState).toggleClass(css.menuOpen, !doClose);
                $ul.addClass(cssMenuState).toggleClass(css.menuOpen, !doClose);
                if (p.animateHeight) {
                    const openHeight = ($ul.length ? $ul[0].scrollHeight : 0);
                    const height = doClose ? 0 : openHeight;
                    $ul.css({ height: doClose ? openHeight : 0 });
                    setTimeout(() => {
                        $ul.css({ height });
                    }, 0);
                }
            }, () => {
                $li.removeClass(cssMenuState).toggleClass(css.menuOpen, !doClose);
                $ul.removeClass(cssMenuState).toggleClass(css.menuOpen, !doClose);
                $ul.css({ height: null });
                if (doClose) {
                    s.params.afterNavItemClose($li);
                }
                else {
                    s.params.afterNavItemOpen($li);
                }
                s.allowClick = true;
            }, p.slideDuration);
            e.stopPropagation();
        });
        s.$element.on(`click.${NavMobile_EVENT_NAME} ${NavMobile_EVENT_NAME}`, 'a', function (e) {
            //prohibit closing if an anchor is clicked
            if (s.params.stopPropagation) {
                e.stopPropagation();
            }
        });
    }
    #outsideClickClose() {
        const s = this;
        external_$_default()(document.body).on(`click.${NavMobile_EVENT_NAME}`, function (e) {
            if (s.params.outsideClickClose) {
                if (!s.menuOpened) {
                    return;
                } //lets just exit then..
                const menuClicked = e.target ? s.$element.has(e.target).length > 0 : false;
                //if the menu item is not clicked and its opened
                //the menu button shouldn't register because propogation is prevented to the body
                if (!menuClicked && s.menuOpened) {
                    s.#menuToggle();
                }
            }
        });
    }
    addChildNavCss() {
        const s = this;
        const p = s.params;
        const css = s.cssList;
        external_$_default()('li', s.$element).has('ul').each(function () {
            const $this = external_$_default()(this);
            let skipUl = false;
            if (typeof p.menuBtnSkip === 'function' &&
                // condition in function must return false
                p.menuBtnSkip(this)) {
                skipUl = true;
            }
            if (!$this.next('button').length && !skipUl) {
                const $el = $this.find(p.insertToggleBtnAfter).first();
                $el.addClass(css.menuHasUL);
                if ($el.length) {
                    if ($el[0].parentNode.isSameNode(this)) {
                        // make sure the <el> is a direct child of <li>
                        $el.after(external_$_default()('<button>').attr({
                            class: css.menuBtnCss,
                            type: 'button',
                            'aria-label': p.subMenuText + ' ' + $el.text().trim()
                        }));
                    }
                }
            }
        });
    }
    checkIfEnabled() {
        const s = this;
        let resizeTimer;
        //basically if the navigational button is visible then
        //we can allow the click to open the navigation
        //this is so it doesn't clash with any other plugins
        //and allows for the control of this click via CSS
        external_$_default()(window).on(`resize.${NavMobile_EVENT_NAME} ${NavMobile_EVENT_NAME}`, function (e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const $enableBtn = external_$_default()(s.params.enableBtn);
                s.allowClick = typeof s.params.bkptEnable === 'number' ?
                    external_$_default()(window).width() <= s.params.bkptEnable :
                    ($enableBtn.length ? isVisible($enableBtn[0]) : false);
            }, e.type === NavMobile_EVENT_NAME ? 0 : 200);
        }).trigger(NavMobile_EVENT_NAME);
    }
    static remove(element, plugin) {
        external_$_default()(element).each(function () {
            const s = plugin || core_Store(this, NavMobile_DATA_NAME);
            external_$_default()(s.params.enableBtn).off(`click.${NavMobile_EVENT_NAME} ${NavMobile_EVENT_NAME}`);
            external_$_default()(document).off(`keydown.${NavMobile_EVENT_NAME}`);
            s.$element
                .off(`click.${NavMobile_EVENT_NAME} ${NavMobile_EVENT_NAME}`)
                .off(`click.${NavMobile_EVENT_NAME} ${NavMobile_EVENT_NAME}`);
            external_$_default()(document.body).off(`click.${NavMobile_EVENT_NAME}`);
            external_$_default()(window).off(`resize.${NavMobile_EVENT_NAME} ${NavMobile_EVENT_NAME}`);
            core_Store(this, NavMobile_DATA_NAME, null);
        });
    }
}

;// CONCATENATED MODULE: ./src/assets/js/fn/throttleResize.ts

const throttledResize = (callback, _namespace = 'throttledResize', manualTrigger = false, delay = 100) => {
    let _throttledResize = null;
    const namespace = _namespace !== '' ? `.${_namespace}` : '';
    //must pass in a function for the first argument else exit the script
    if (typeof callback !== 'function') {
        console.error('first parameter should be a function');
        return;
    }
    external_$_default()(window).on(`resize${namespace}${manualTrigger && ' ' + _namespace}`, (e) => {
        clearTimeout(_throttledResize);
        _throttledResize = setTimeout(callback, delay, e);
    });
    if (manualTrigger) {
        setTimeout(callback, 0);
    }
};
/* harmony default export */ const throttleResize = (throttledResize);

;// CONCATENATED MODULE: ./src/assets/js/Parallax.ts




const Parallax_VERSION = "2.0.0";
const Parallax_DATA_NAME = 'Parallax';
const Parallax_EVENT_NAME = 'parallax';
const Parallax_DEFAULTS = {
    speed: 7,
    zSpeed: 5,
    cssPrefix: 'parallax',
    axis: 'y',
    scrollAxis: 'y',
    zAxis: false,
    relativeElem: false,
    bgFill: false,
    rootMargin: 0,
    scrollMaxPxStop: 5000,
    zScrollMaxPxStop: 2000,
    minWidth: null,
    maxWidth: null
};
class Parallax {
    params;
    zInitOffset;
    index;
    instanceEvent;
    $window;
    $element;
    element;
    elementOffset;
    $relElem;
    winHeight;
    winWidth;
    elemHeight;
    elemWidth;
    speed;
    zSpeed;
    fillAmount;
    bgFill;
    bgFillProp;
    axis;
    zAxis;
    scrollMaxPxStop;
    zScrollMaxPxStop;
    rootMargin;
    lastZSpeed;
    lastCssInProps;
    minWidthIfSet;
    maxWidthIfSet;
    effectCleared;
    cssPrevDir;
    static get version() { return Parallax_VERSION; }
    static defaults = Parallax_DEFAULTS;
    constructor(element, options, index) {
        const s = this;
        const dataOptions = getDataOptions(element, Parallax_EVENT_NAME);
        s.$window = external_$_default()(window);
        s.$element = external_$_default()(element);
        s.element = element;
        s.params = external_$_default().extend({}, Parallax.defaults, options, dataOptions);
        s.zInitOffset = 0;
        s.index = index;
        s.instanceEvent = Parallax_EVENT_NAME + index;
        s.$relElem = s.#relElem;
        s.cssPrevDir = '';
        //props to get updated on resize
        s.updatableProps();
        s.handleEvents();
        return s;
    }
    handleEvents() {
        const s = this;
        throttleResize(() => {
            s.updatableProps();
            // $(window).trigger(s.instanceEvent);
            s.parallax(s);
        }, `${s.instanceEvent}_resize`, true);
        external_$_default()(window).on(`scroll.${s.instanceEvent} ${s.instanceEvent}`, () => {
            window.requestAnimationFrame(() => {
                s.parallax(s);
            });
        }).trigger(s.instanceEvent);
    }
    handleUpdate() {
        const s = this;
        s.updatableProps();
        external_$_default()(window).trigger(s.instanceEvent);
    }
    updatableProps() {
        const s = this;
        const speed = s.#speed, zSpeed = s.#zSpeed, { cssPrefix } = s.params, speedCss = `${cssPrefix}--${s.params.axis}-${zSpeed > 0 ? 'pos' : 'neg'}`, zSpeedCss = s.params.zAxis ? ` ${cssPrefix}--z-${zSpeed > 0 ? 'pos' : 'neg'}` : '', newCssDir = `${speedCss}${zSpeedCss}`, rm = s.params.rootMargin;
        //reset to get new measurements
        s.$element.css({
            'transform': null,
            height: null,
            width: null
        })
            .removeClass(s.cssPrevDir)
            .addClass(newCssDir);
        s.cssPrevDir = newCssDir;
        s.winHeight = s.$window.height();
        s.winWidth = s.$window.width();
        s.elemHeight = s.$relElem[0].scrollHeight;
        s.elemWidth = s.$relElem[0].scrollWidth;
        s.speed = speed;
        s.zSpeed = zSpeed;
        s.fillAmount = s.#fillAmount;
        s.bgFill = s.params.bgFill;
        s.axis = s.params.axis;
        s.bgFillProp = s.axis === 'y' ? 'height' : 'width';
        s.zAxis = s.params.zAxis;
        s.$relElem = s.#relElem;
        s.scrollMaxPxStop = s.params.scrollMaxPxStop;
        s.zScrollMaxPxStop = s.params.zScrollMaxPxStop;
        s.lastZSpeed = 0;
        s.rootMargin = typeof s.params.rootMargin === 'number' ? [rm, rm] : rm;
        s.minWidthIfSet = s.params.minWidth ? s.winWidth > s.params.minWidth : true;
        s.maxWidthIfSet = s.params.maxWidth ? s.winWidth < s.params.maxWidth : true;
        s.elementOffset = s.getElementRects();
        s.$element.css(s.lastCssInProps);
    }
    getElementRects() {
        const s = this;
        const elPos = s.$element.offset(), top = elPos.top, left = elPos.left, bottom = top + s.elemHeight, right = left + s.elemWidth;
        return {
            top,
            left,
            bottom,
            right
        };
    }
    parallax(s) {
        const { scrollAxis } = s.params, [rootMStart, rootMEnd] = s.rootMargin, withinMinAndMaxIfSet = (s.minWidthIfSet && s.maxWidthIfSet), scrollVertical = scrollAxis === 'y', offset = (scrollVertical ? s.elementOffset.top : s.elementOffset.left), winSide = (scrollVertical ? s.winHeight : s.winWidth) - rootMStart, scrollDir = (scrollVertical ? window.scrollY : window.scrollX), pixelStart = (offset > winSide ? (winSide - offset) + scrollDir : offset + (scrollDir - offset));
        if (s.isInView(scrollVertical, pixelStart, scrollDir, rootMEnd) && withinMinAndMaxIfSet) {
            const speed = (pixelStart * s.speed), zSpeed = (pixelStart * s.zSpeed), speedPx = (speed < s.zScrollMaxPxStop) ? speed : s.zScrollMaxPxStop, zSpeedPx = s.params.zAxis ? ((s.lastZSpeed < s.zScrollMaxPxStop) ? zSpeed : s.lastZSpeed) : 0, translateParams = s.axis === 'y' ? `0, ${speedPx}px, ${zSpeedPx}px` : `${speedPx}px, 0, ${zSpeedPx}px`;
            const cssProps = {
                transform: `translate3d(${translateParams})`,
                [s.bgFillProp]: s.bgFill ? `calc(100% + ${s.fillAmount}px)` : null
            };
            s.lastZSpeed = zSpeedPx;
            s.lastCssInProps = cssProps;
            s.$element.css(cssProps);
        }
    }
    isInView(scrollVertical, pixelStart, scrollDir, rootMargin) {
        const s = this;
        const elemOffsetEnd = scrollVertical ? s.elementOffset.bottom : s.elementOffset.right;
        return scrollDir + rootMargin <= elemOffsetEnd && pixelStart >= 0;
    }
    //getters
    get #fillAmount() {
        const s = this;
        const saY = s.params.scrollAxis === 'y';
        const winSide = s.params.axis === 'y' ? s.winHeight : (s.winWidth + (saY ? 0 : s.elemWidth));
        return (winSide * Math.abs(s.speed));
    }
    get #speed() {
        const s = this;
        return s.params.speed / 100;
    }
    get #zSpeed() {
        const s = this;
        return s.params.zSpeed / 100;
    }
    get #relElem() {
        const s = this;
        return s.params.relativeElem ?
            s.$element.closest(s.params.relativeElem) :
            s.$element;
    }
    static remove(element, plugin) {
        external_$_default()(element).each(function () {
            const s = plugin || core_Store(this, Parallax_DATA_NAME);
            external_$_default()(window).off(`scroll.${s.instanceEvent} resize.${s.instanceEvent} ${s.instanceEvent}_resize ${s.instanceEvent}`);
            s.$element.css({
                'transform': null,
                height: null,
                width: null
            }).removeClass(s.cssPrevDir);
            core_Store(this, Parallax_DATA_NAME, null);
        });
    }
}

;// CONCATENATED MODULE: ./src/assets/js/SelectEnhance.ts




const SelectEnhance_VERSION = "2.4.1";
const SelectEnhance_EVENT_NAME = 'selectEnhance';
const SelectEnhance_DATA_NAME = 'SelectEnhance';
const SelectEnhance_DEFAULTS = {
    cssPrefix: 'select-enhance',
    mobileNative: false,
    emptyValAsPlaceholder: true,
    focusIn: noop,
    focusOut: noop,
    beforeChange: noop,
    afterChange: noop,
    blurDuration: 250,
    typeAheadDuration: 500,
    observeSelectbox: true
};
// wrap the select first
const mobileOS = isMobileOS();
// helper
const getSelectedOptNode = ($el) => $el.find('option').filter(function () { return this.selected; })[0];
// global private state props
let to, $currSelectEnhance = null, listPosTop = true, registerEventScroll = false, currSelectInstance = null;
class SelectEnhance {
    $select;
    select;
    params;
    index;
    id;
    selectId;
    isReadOnly;
    $label;
    $selectEnhance;
    $textInput;
    textInput;
    $selectList;
    optionSet;
    optionsShown;
    selectboxObserver;
    selectListBoxInFullView;
    keyedInput;
    static defaults = SelectEnhance_DEFAULTS;
    static get version() {
        return SelectEnhance_VERSION;
    }
    constructor(element, options, index) {
        const s = this;
        s.index = index;
        s.$select = external_$_default()(element);
        s.select = element;
        s.id = s.$select.attr('id') || s.$select.attr('name') || 'select_enhance_' + index;
        s.selectId = s.id + '_enhance';
        s.$label = external_$_default()(`label[for="${s.id}"]`);
        s.optionSet = new WeakMap();
        s.optionsShown = false;
        s.selectboxObserver;
        s.selectListBoxInFullView = true;
        s.keyedInput = "";
        s.isReadOnly = typeof s.$select.attr('readonly') === "string";
        if (s.select.multiple) {
            console.warn(`The SelectEnhance plugin doesn't support multiple selections.`);
        }
        if (s.$label.length) {
            s.$label.attr({ id: s.selectId + '_lbl' });
        }
        const dataOptions = getDataOptions(element, SelectEnhance_EVENT_NAME);
        s.params = external_$_default().extend({}, SelectEnhance.defaults, options, dataOptions);
        s.setUpSelectHtml();
        if (mobileOS && s.params.mobileNative || s.isReadOnly) {
            s.mobileOnlyIfNavite();
        }
        else {
            // 
            // attach events
            // 
            if (s.params.observeSelectbox) {
                s.selectInputMutationObserver();
            }
            s.eventLabelClick();
            s.eventKeyboardSearch();
            s.eventShowOptions();
            s.eventOptionClick();
            s.eventSelectToggle();
            s.eventArrowKeys();
            s.observeSelectListBoxInFullView();
            SelectEnhance.eventScrollGetListPosition();
        }
        return s;
    }
    mobileOnlyIfNavite() {
        const s = this;
        let prevElSelectedVal = getSelectedOptNode(s.$select);
        s.$select.on('mouseup.' + SelectEnhance_EVENT_NAME, 'option', function (e) {
            if (!this.isSameNode(prevElSelectedVal)) {
                s.params.beforeChange(s.$select);
            }
        }).on('change.' + SelectEnhance_EVENT_NAME, function (e) {
            s.params.afterChange(s.$select);
            prevElSelectedVal = getSelectedOptNode(s.$select);
        });
    }
    // Events 
    blurSelect() {
        const s = this;
        s.$selectEnhance.addClass(s.params.cssPrefix + '--blurring');
        s.$selectEnhance.removeClass(s.params.cssPrefix + '--focused');
        s.$textInput.attr({ 'aria-expanded': 'false' });
        setTimeout(() => {
            s.$selectEnhance.removeClass(s.params.cssPrefix + '--blurring');
            $currSelectEnhance = null;
            currSelectInstance = null;
            s.optionsShown = false;
            s.params.focusOut(s.$select);
        }, s.params.blurDuration);
    }
    setSelectionState($btn, doBlur = true) {
        const s = this;
        const { cssPrefix } = s.params;
        const selectedOpt = s.optionSet.get($btn[0]);
        const newSelectedState = !selectedOpt.selected;
        s.params.beforeChange(s.$select);
        selectedOpt.selected = true;
        s.params.afterChange(s.$select);
        s.$selectEnhance.find('.' + cssPrefix + '__list-btn[aria-selected]').attr({ 'aria-selected': 'false' });
        $btn.attr({ 'aria-selected': newSelectedState + '' });
        s.$textInput.attr({ 'aria-activedescendant': $btn[0].id });
        // add a class whether there is an input value or not
        s.$selectEnhance.toggleClass(cssPrefix + '--empty-val', !selectedOpt.value.trim());
        s.select.dispatchEvent(new Event('change'));
        if (s.params.emptyValAsPlaceholder && selectedOpt.value.trim() === '') {
            s.$textInput.val('').attr({ placeholder: selectedOpt.text });
        }
        else {
            s.$textInput.val(selectedOpt.text);
        }
        if (doBlur) {
            s.textInput.focus();
            s.blurSelect();
        }
        else {
            $btn[0].focus();
        }
    }
    eventLabelClick() {
        const s = this;
        s.$label.on('click.' + SelectEnhance_EVENT_NAME, function (e) {
            e.preventDefault();
            if (!s.select.disabled) {
                s.textInput.focus();
            }
        });
    }
    showOptions(s) {
        if (s.select.disabled) {
            return;
        }
        const { cssPrefix } = s.params;
        s.optionsShown = true;
        s.$selectEnhance.toggleClass(cssPrefix + '--focused');
        s.$textInput.attr({ 'aria-expanded': 'true' });
        const $selectedBtn = s.$selectEnhance.find('.' + cssPrefix + '__list-btn[aria-selected="true"]');
        if ($selectedBtn.length) {
            $selectedBtn[0].focus();
        }
        $currSelectEnhance = s.$selectEnhance;
        currSelectInstance = s;
        SelectEnhance.getListPosition();
        s.params.focusIn(s.$select);
    }
    eventShowOptions() {
        const s = this;
        const { cssPrefix } = s.params;
        s.$selectEnhance.on('click.' + SelectEnhance_EVENT_NAME, '.' + cssPrefix + '__enable-text', (e) => {
            if (s.select.disabled) {
                return;
            }
            s.showOptions(s);
        });
        // Only works on keydown event
        s.$textInput.on('keydown.' + SelectEnhance_EVENT_NAME, function (e) {
            if ((e.key === constants_KEYS.down || e.key === constants_KEYS.up) && !s.optionsShown) {
                s.showOptions(s);
                e.preventDefault();
            }
        });
        s.$selectList.on('keypress.' + SelectEnhance_EVENT_NAME, '.' + cssPrefix + '__list-btn', function (e) {
            if (e.key === constants_KEYS.enter ||
                e.code === constants_KEYS.space && s.keyedInput.trim() === '') {
                s.setSelectionState(external_$_default()(document.activeElement));
                s.blurSelect();
                s.textInput.focus();
                e.preventDefault();
            }
        });
        s.$textInput.on('keypress.' + SelectEnhance_EVENT_NAME, function (e) {
            if (e.key !== constants_KEYS.tab || e.shiftKey && e.key !== constants_KEYS.tab) {
                e.preventDefault();
            }
            if (e.key === constants_KEYS.enter ||
                e.code === constants_KEYS.space && s.keyedInput.trim() === '' ||
                e.ctrlKey && e.altKey && e.shiftKey && constants_KEYS.space === e.code) {
                s.showOptions(s);
            }
        });
    }
    eventOptionClick() {
        const s = this;
        s.$selectEnhance.on('click.' + SelectEnhance_EVENT_NAME, '.' + s.params.cssPrefix + '__list-btn', function (e) {
            e.preventDefault();
            s.$selectEnhance.removeClass(s.params.cssPrefix + '--focused');
            s.$textInput.attr({ 'aria-expanded': 'false' });
            s.setSelectionState(external_$_default()(this));
        });
    }
    eventSelectToggle() {
        const s = this;
        s.$selectEnhance.on('focusin.' + SelectEnhance_EVENT_NAME, function (e) {
            const closeEvent = 'click.close_' + s.selectId + SelectEnhance_EVENT_NAME;
            external_$_default()(document.body).off(closeEvent).on(closeEvent, function (e) {
                setTimeout(() => {
                    const ae = document.activeElement;
                    const aeIsInSelectEnhance = (ae && !s.$selectEnhance.has(ae).length);
                    if (aeIsInSelectEnhance || s.$selectEnhance[0].isSameNode(ae)) {
                        s.blurSelect();
                        external_$_default()(document.body).off(closeEvent);
                    }
                }, 100);
            });
        });
    }
    eventKeyboardSearch() {
        const s = this;
        let keyInputTo = null;
        let changedTo = null;
        let keyedFound = [];
        s.$selectEnhance.on('keypress.' + SelectEnhance_EVENT_NAME, function (e) {
            if (s.select.disabled) {
                return;
            }
            const keyCurr = (e.key.length === 1 ? e.key : '');
            s.keyedInput += keyCurr;
            clearTimeout(keyInputTo);
            keyInputTo = setTimeout(() => {
                s.keyedInput = "";
            }, s.params.typeAheadDuration);
            if (s.keyedInput.trim()) {
                const rgx = RegExp('^' + s.keyedInput.trim(), 'i');
                keyedFound = [].slice.call(s.select.getElementsByTagName('option')).filter((el) => rgx.test(el.text));
                if (keyedFound.length) {
                    clearTimeout(changedTo);
                    changedTo = setTimeout(() => {
                        s.setSelectionState(s.optionSet.get(keyedFound[0]), false);
                    }, 100);
                }
            }
        });
    }
    eventArrowKeys() {
        const s = this;
        s.$selectEnhance.on('keydown.navigate_' + SelectEnhance_EVENT_NAME, function (e) {
            if (s.select.disabled) {
                return;
            }
            if (e.key === constants_KEYS.down) {
                if (!s.textInput.isSameNode(document.activeElement)) {
                    e.preventDefault();
                }
                s.nextOptionButton('next');
            }
            if (e.key === constants_KEYS.up) {
                e.preventDefault();
                s.nextOptionButton('prev');
            }
            if (e.key === constants_KEYS.esc && $currSelectEnhance) {
                s.blurSelect();
                s.textInput.focus();
            }
        });
    }
    //  build the HTML for it
    setUpSelectHtml() {
        const s = this;
        const $selectEnhance = external_$_default()('<div />').attr({
            class: s.params.cssPrefix,
            id: s.selectId + '_wrap'
        });
        const $textInput = external_$_default()('<input>').attr({
            type: 'text',
            class: s.params.cssPrefix + '__enable-text',
            role: "combobox",
            'aria-controls': s.selectId + '_listbox',
            'aria-labelledby': s.selectId + '_lbl',
            'aria-autocomplete': 'list',
            'aria-expanded': 'false',
            id: s.selectId + '_input'
        });
        s.$select.wrap($selectEnhance);
        // jQuery, elements need to be bound to the DOM before they
        // can have events attached to them. So this is the solution
        s.$selectEnhance = s.$select.parent();
        if (mobileOS && s.params.mobileNative || s.isReadOnly) {
            // exit if its a mobile device after wrapping for styling
            return;
        }
        $textInput.insertAfter(s.$select);
        s.$select.attr({ tabindex: '-1', 'aria-hidden': 'true' });
        // jQuery, elements need to be bound to the DOM before they
        // can have events attached to them. So this is the solution
        s.$textInput = s.$select.parent().find('#' + s.selectId + '_input');
        s.textInput = s.$textInput[0];
        SelectEnhance.buildOptionsList(s);
    }
    static buildOptionsList(s, $selectList) {
        const { cssPrefix } = s.params;
        const optGroup = s.select.getElementsByTagName('optgroup');
        const hasOptGroup = !!optGroup.length;
        const $optGroupWm = new WeakMap();
        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];
                $optGroupWm.set(group, external_$_default()('<div/>').attr({
                    class: cssPrefix + '__optgroup',
                    role: 'group',
                    label: group.label || ""
                }).append(external_$_default()('<span>').attr({
                    class: cssPrefix + '__optgroup-label',
                    'aria-hidden': 'true'
                }).text(group.label || "")));
            }
        }
        const options = s.select.getElementsByTagName('option');
        s.$selectList = $selectList ? $selectList : external_$_default()('<div>').attr({
            class: cssPrefix + '__list',
            role: 'listbox',
            id: s.selectId + '_listbox',
            'aria-label': s.$label.text() || ''
        });
        const optId = s.selectId || 'select_' + s.index;
        for (let i = 0, l = options.length; i < l; i++) {
            const opt = options[i];
            const id = optId + i;
            if (opt.hidden)
                continue;
            const valCssStatus = opt.value === '' ? ' ' + cssPrefix + '__list-btn--empty' : '';
            const attrs = {
                // type: 'button',
                tabIndex: '0',
                role: 'option', id,
                'data-value': opt.value,
                'aria-selected': opt.selected + '',
                disabled: opt.disabled ? 'disabled' : null,
                class: cssPrefix + '__list-btn' + valCssStatus
            };
            const $btn = external_$_default()('<div/>').attr(attrs).text(opt.textContent);
            s.optionSet.set($btn[0], opt);
            s.optionSet.set(opt, $btn);
            // append to list or optgroup
            hasOptGroup && opt.parentElement.nodeName.toUpperCase() === 'OPTGROUP' ?
                $optGroupWm.get(opt.parentElement).append($btn) :
                s.$selectList.append($btn);
            if (opt.selected) {
                s.$textInput.attr({ 'aria-activedescendant': id });
                s.$selectEnhance.toggleClass(cssPrefix + '--empty-val', !opt.value.trim());
                if (s.params.emptyValAsPlaceholder && opt.value.trim() === '') {
                    s.$textInput.val('');
                    s.$textInput.attr({ placeholder: opt.text });
                }
                else {
                    s.$textInput.val(opt.text);
                }
            }
        }
        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];
                s.$selectList.append($optGroupWm.get(group));
            }
        }
        s.$selectList.insertAfter(s.$textInput);
    }
    nextOptionButton(dir) {
        const s = this;
        const ae = document.activeElement;
        const $btnList = s.$selectList.find('.' + s.params.cssPrefix + '__list-btn');
        const btnLength = $btnList.length;
        if (btnLength && s.textInput.isSameNode(ae)) {
            $btnList.eq(dir === 'next' ? 0 : btnLength - 1)[0].focus();
            return;
        }
        for (let i = 0; i < btnLength; i++) {
            const el = $btnList[i];
            let prevNextIndex = 0;
            if (ae.isSameNode(el)) {
                if (dir === 'next') {
                    const isLast = i === btnLength - 1;
                    prevNextIndex = isLast ? i : i + 1;
                }
                else {
                    const isFirst = i === 0;
                    prevNextIndex = isFirst ? i : i - 1;
                }
                $btnList.eq(prevNextIndex)[0].focus();
                break;
            }
        }
    }
    selectInputMutationObserver() {
        const s = this;
        const selectNode = s.select;
        const config = { attributes: true, childList: true, subtree: true };
        // Callback function to execute when mutations are observed
        const callback = function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (let i = 0, l = mutationsList.length; i < l; i++) {
                const mutation = mutationsList[i];
                if (mutation.type === 'childList') {
                    SelectEnhance.refreshOptions(s.select);
                }
                else if (mutation.type === 'attributes') {
                    s.$selectEnhance.toggleClass(s.params.cssPrefix + '--disabled', s.select.disabled);
                }
            }
        };
        // Create an observer instance linked to the callback function
        s.selectboxObserver = new MutationObserver(callback);
        // Start observing the target node for configured mutations
        s.selectboxObserver.observe(selectNode, config);
        // Later, you can stop observing
        // s.selectboxObserver.disconnect();
    }
    static eventScrollGetListPosition() {
        if (!registerEventScroll) {
            external_$_default()(window).on('scroll.' + SelectEnhance_EVENT_NAME, () => {
                to && clearTimeout(to);
                to = setTimeout(SelectEnhance.getListPosition, 100);
            });
            registerEventScroll = true;
        }
    }
    observeSelectListBoxInFullView() {
        const s = this;
        if (window.IntersectionObserver) {
            const selectIntersectionObserver = new IntersectionObserver(function (selects) {
                s.selectListBoxInFullView = selects[0].intersectionRatio === 1;
            }, { threshold: [0, 1] });
            s.$selectList[0] && selectIntersectionObserver.observe(s.$selectList[0]);
        }
    }
    static getListPosition() {
        if (currSelectInstance) {
            const s = currSelectInstance;
            const selWrapPosTop = s.$selectEnhance.offset().top;
            const selListHeight = s.$selectList.height();
            const listPosAndHeight = s.$selectEnhance.offset().top +
                s.$selectEnhance.height() +
                selListHeight;
            const winPosAndHeight = window.scrollY + external_$_default()(window).height();
            if (listPosAndHeight > winPosAndHeight &&
                selWrapPosTop > selListHeight &&
                !s.selectListBoxInFullView) {
                s.$selectEnhance.addClass(s.params.cssPrefix + '--pos-bottom');
                listPosTop = false;
            }
            else {
                s.$selectEnhance.removeClass(s.params.cssPrefix + '--pos-bottom');
                listPosTop = true;
            }
        }
    }
    static refreshOptions(element) {
        external_$_default()(element).each(function () {
            const s = core_Store(this, `${SelectEnhance_DATA_NAME}_instance`);
            if (s) {
                s.$selectList.empty();
                s.optionSet = new WeakMap();
                SelectEnhance.buildOptionsList(s, s.$selectList);
            }
            else {
                console.warn(`No instance of a selectbox`, element);
            }
        });
    }
    static remove(element, plugin) {
        external_$_default()(element).each(function () {
            const s = plugin || core_Store(this, SelectEnhance_DATA_NAME);
            s.$selectEnhance.off('keydown.' + SelectEnhance_EVENT_NAME);
            s.$selectEnhance.off('keydown.navigate_' + SelectEnhance_EVENT_NAME);
            s.$selectEnhance.off('click.' + SelectEnhance_EVENT_NAME);
            s.$selectEnhance.off('focusout.' + SelectEnhance_EVENT_NAME);
            s.$selectEnhance.off('blur.' + SelectEnhance_EVENT_NAME);
            s.$label.off('click.' + SelectEnhance_EVENT_NAME);
            external_$_default()(document.body).off('click.close_' + s.selectId + SelectEnhance_EVENT_NAME);
            // the window event will just stay
            s.$select.insertAfter(s.$selectEnhance);
            s.$select.attr({ tabindex: null, 'aria-hidden': null });
            s.$select.off('mouseup.' + SelectEnhance_EVENT_NAME);
            s.$select.off('change.' + SelectEnhance_EVENT_NAME);
            if (s.selectboxObserver) {
                s.selectboxObserver.disconnect();
            }
            s.$selectEnhance.remove();
            core_Store(this, SelectEnhance_DATA_NAME, null);
        });
    }
}

;// CONCATENATED MODULE: ./src/demo/assets/js/demo.ts













core_libraryExtend([
    AccessibleMenu,
    Collapse,
    LazyLoad,
    Modal,
    NavDesktop,
    NavMobile,
    Parallax,
    SelectEnhance,
    Tabs,
    Toastr
], true);
external_$_default()('select').selectEnhance();
const $collapseGroup = external_$_default()('.collapse-group-1');
$collapseGroup.on('click', '.collapse__header h2', function (e) {
    const $btn = external_$_default()(this).parent().find('button');
    if ($btn.length) {
        $btn[0]?.click();
    }
}).collapse({
    moveToTopOnOpen: false,
    toggleGroup: true,
    locationFilter: 'collapse'
});
throttleResize(() => {
    const inMobile = external_$_default()('#mobile-nav-btn').width() !== 0; //hidden if zero
    $collapseGroup.collapse({
        moveToTopOnOpen: inMobile,
    });
}, 'collapse', true);
external_$_default()('#main-nav')
    .navMobile({ enableBtn: '#mobile-nav-btn' })
    .navDesktop()
    .accessibleMenu();
external_$_default()('#example-nav')
    .navMobile({ enableBtn: '#mobile-nav-btn-example' })
    .navDesktop()
    .accessibleMenu({
    keyDirections: ['horizontal', 'vertical', 'vertical']
});
// Parallax
external_$_default()('#jsBtnSCrollHorizontal').on('click', function () {
    external_$_default()('main').toggleClass('body-content--scroll-x');
    external_$_default()('.do-parallax--hz').parallax('update');
});
external_$_default()('.do-parallax').parallax({ speed: 25, bgFill: true });
// Tabs
external_$_default()(".tabs-outer").tabs({ locationFilter: 'tabs' });
external_$_default()(".tabs-inner").tabs({ locationFilter: 'tabs-inner' });
// Lazy Load
external_$_default()('img[loading="lazy"]').lazyLoad({
    observerID: 'imgLazy',
    observerOpts: { rootMargin: '100px' }
});
//a bunch of paragraphs to style right!
external_$_default()('.lazy-highlight').lazyLoad({
    observerID: 'p',
    loadImgs: false,
    unobserve: false,
    inEvt: (el) => {
        setTimeout(() => { el.style.background = '#ccc'; }, 1000);
    },
    outEvt: (el) => {
        setTimeout(() => { el.style.background = ''; }, 1000);
    }
});
// TOASTR
{
    const toastRandomMsgs = [
        'I boast about my toast.',
        'The hostess with the toastess',
        'toast is best, when its not burnt',
        'The fire is quite toasty',
        'Lets toast, to toast!'
    ];
    const randomToastMsg = () => {
        return toastRandomMsgs[Math.floor(Math.random() * toastRandomMsgs.length)];
    };
    // Example 1: standard way
    external_$_default()('#toastr-1').toastr({
        content: 'Toast is good for breakfast',
        duration: 7000
    });
    const $toastr2 = external_$_default()('#toastr-2');
    if ($toastr2.length) {
        // Example 2: extend perhaps in Cash then call on click
        const toastr2 = new Toastr($toastr2[0], {
            content: 'Toast is good for breakfast',
            duration: 5000
        });
        $toastr2.on('click', function () {
            setTimeout(() => {
                toastr2.setContent(randomToastMsg(), true);
            }, 2500);
        });
    }
    // Example 3,4: somewhere else on the page
    external_$_default()('#toastr-3').toastr({
        content: randomToastMsg(),
        duration: 5000,
        cssGroupKey: 'bottom'
    });
    external_$_default()('#toastr-4').toastr({
        content: randomToastMsg(),
        duration: 5000,
        cssGroupKey: 'bottom'
    });
}
//  Modal
{
    external_$_default()('.btn-modal').modal({
        modalID: 'from-dom'
    });
    external_$_default()('#btn-gen-content').modal({
        locationFilter: 'modal',
        src: external_$_default()('<div>').attr({ class: 'gen-content' }),
        fromDOM: false,
        modalID: 'gen-content',
        onOpenOnce(modalObj) {
            modalObj.$dialogContent.on('click', '.dismiss', modalObj.close);
            modalObj.$dialogContent.append(`
            <h2>Some generated Content</h2>
            <p>Ullamco <a href="#">link</a> laboris nisi ut aliquid ex ea commodi consequat. Sed haec quis possit intrepidus aestimare tellus. Quam diu etiam furor <a href="#">iste tuus</a> nos eludet? Curabitur est gravida et libero vitae dictum.</p>
            <button type="button" class="button dismiss">Dimiss</button>
        `);
        }
    });
    // quick and dirty image carousel
    const $picGroup = external_$_default()('.pic-group');
    $picGroup.each(function (index) {
        const src = external_$_default()('<img>').attr({ src: this.dataset.imgSrc || '', loading: 'lazy' });
        const modalID = 'pic-group_' + index;
        let imgIndex = index;
        external_$_default()(this).modal({
            src,
            modalID,
            modalCss: 'modal--gallery',
            locationFilter: 'gallery',
            fromDOM: false,
            onOpenOnce(modalObj) {
                const $img = modalObj.$dialogContent.find('img');
                modalObj.$dialogContent.append(`
                    <footer class="pic-group-nav">
                        <button type="button" class="prev-btn">Previous</button>
                        <button type="button" class="next-btn">Next</button>
                    </footer>
                `);
                modalObj.$dialogContent.on('click', 'button', function (e) {
                    if (this.classList.contains('prev-btn')) {
                        imgIndex = imgIndex === 0 ? $picGroup.length - 1 : imgIndex - 1;
                    }
                    else {
                        imgIndex = imgIndex === $picGroup.length - 1 ? 0 : imgIndex + 1;
                    }
                    if (imgIndex > 0 && $picGroup.length) {
                        $img.attr({ src: $picGroup[imgIndex].dataset.imgSrc || '' });
                    }
                });
            },
            onOpen(modalObj) {
                const $img = modalObj.$dialogContent.find('img');
                external_$_default()(window).on('keyup.gallery', function (e) {
                    const arrowRight = e.key === 'ArrowRight';
                    const arrowLeft = e.key === 'ArrowLeft';
                    if (e.key === 'Escape') {
                        modalObj.close();
                    }
                    if (arrowLeft) {
                        imgIndex = imgIndex === 0 ? $picGroup.length - 1 : imgIndex - 1;
                    }
                    if (arrowRight) {
                        imgIndex = imgIndex === $picGroup.length - 1 ? 0 : imgIndex + 1;
                    }
                    if (arrowLeft || arrowRight) {
                        if (imgIndex > 0 && $picGroup.length) {
                            $img.attr({ src: $picGroup[imgIndex].dataset.imgSrc || '' });
                        }
                    }
                });
            },
            onClose() {
                external_$_default()(window).off('keyup.gallery');
            }
        });
    });
}

/******/ })()
;