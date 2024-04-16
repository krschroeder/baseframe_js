import type { StringPluginArgChoices } from './types';
import type { Cash } from 'cash-dom';

import $ from 'cash-dom';
import { isVisible, getDataOptions } from './util/helpers';
import Store from "./core/Store";


export interface ILazyLoadDefaults {
    observerID: string;
    imgSrcName: string | 'src';
    bgSrcName: string | 'bgSrc';
    loadImgs: boolean;
    inEvt(lazyElem: HTMLElement, entry: IntersectionObserverEntry): void;
    outEvt(lazyElem: HTMLElement, entry: IntersectionObserverEntry): void;
    force: boolean;
    unobserve: boolean;
    observerOpts: IntersectionObserverInit;
}

export interface ILazyLoadOptions extends Partial<ILazyLoadDefaults> {
    observerID: string;
}

const VERSION = '2.0.1';
const DATA_NAME = 'LazyLoad';
const EVENT_NAME = 'lazyLoad';
const DEFAULTS = {
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

const lazyElemObservers:Map<string, IntersectionObserver> = new Map();

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

                } else {
                    typeof outEvt === 'function' && outEvt(lazyElem, entry);
                }
            }
        });
    }, observerOpts);
}


export default class LazyLoad {

    public element: HTMLElement;
    public params: ILazyLoadDefaults;
    public lazyElemObserver: IntersectionObserver;
    
    public static defaults = DEFAULTS;
    static get version() {return VERSION;}
    static get pluginName() { return EVENT_NAME; }

    constructor(element: HTMLElement, options: ILazyLoadOptions | StringPluginArgChoices) {
        const s = this;
        const dataOptions = getDataOptions(element, EVENT_NAME);
        
        s.element = element;
        s.lazyElemObserver;
        s.params = $.extend({}, LazyLoad.defaults, options, dataOptions);

        s.handleEvents();

        return s;
    }

    static remove(element: Cash, plugin?: LazyLoad) {

        $(element).each(function () {
            const s: LazyLoad = plugin || Store(this, DATA_NAME);
             
            lazyElemObservers.delete(s.params.observerID);
            s.lazyElemObserver.unobserve(this);
            Store(this, DATA_NAME, null);
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

        } else {
            s.lazyElemObserver = lazyElemObserver(s);
        }

        if (!observerID) {
            console.warn(`It recommended to set an 'observerID', so the element group can leverage the same one.`, s.element);
        }

        s.lazyElemObserver.observe(s.element);
    }
}

declare module 'cash-dom' {
    export interface Cash {
        lazyLoad(options: ILazyLoadOptions | StringPluginArgChoices): Cash;
    }
}