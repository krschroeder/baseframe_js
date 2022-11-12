import type { StringPluginArgChoices } from './types/shared';

import $ from 'cash-dom';
import validJSONFromString from './util/formatting-valid-json';
import { isVisible } from './util/helpers';
import { elemData } from './util/store';


export interface ILazyLoadOptions {
    observerID: string;
    imgSrcName?: string | 'src';
    bgSrcName?: string | 'bgSrc';
    loadImgs?: boolean;
    inEvt?(lazyElem: HTMLElement, entry: IntersectionObserverEntry): void;
    outEvt?(lazyElem: HTMLElement, entry: IntersectionObserverEntry): void;
    force?: boolean;
    unobserve?: boolean;
    observerOpts?: IntersectionObserverInit;
}

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

const lazyElemObservers = new Map();

const _lazyElemObserver = (_) => {

    const { observerOpts } = _.params;
    return new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            const { inEvt, outEvt, force, unobserve, loadImgs } = _.params;

            const lazyElem = entry.target;
            if (lazyElem instanceof HTMLElement) {
                if (entry.isIntersecting && isVisible(lazyElem) || force) {

                    loadImgs && _.imgAndBg(_, lazyElem);

                    typeof inEvt === 'function' && inEvt(lazyElem, entry);

                    unobserve && _.lazyElemObserver.unobserve(lazyElem);

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
    public static Defaults = DEFAULTS;

    constructor(element: HTMLElement, options: ILazyLoadOptions | StringPluginArgChoices) {

        this.element = element;

        const dataOptions = validJSONFromString($(element).data(EVENT_NAME + '-options'));
        const instanceOptions = $.extend({}, LazyLoad.Defaults, options, dataOptions);

        elemData(element, `${DATA_NAME}_params`, instanceOptions);

        this.lazyElemObserver;
        this.params = elemData(element, `${DATA_NAME}_params`);
        this.lazyLoad();

        return this;
    }

    static get version() {
        return VERSION;
    }

    static get pluginName() {
        return DATA_NAME;
    }

    static remove(element) {

        $(element).each(function () {
            const instance = elemData(this, `${DATA_NAME}_instance`);
            const params = elemData(this, `${DATA_NAME}_params`);

            lazyElemObservers.delete(params.observerID);

            instance.lazyElemObserver.unobserve(this);

            elemData(this, `${DATA_NAME}_params`, null, true);
            elemData(this, `${DATA_NAME}_instance`, null, true);
        });
    }

    imgAndBg(_, lazyElem) {

        const { imgSrcName, bgSrcName } = _.params;
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

    lazyLoad() {
        const _ = this;
        const { observerID } = _.params;

        if (observerID && !lazyElemObservers.has(observerID)) {

            lazyElemObservers.set(observerID, _lazyElemObserver(_));

            _.lazyElemObserver = lazyElemObservers.get(observerID);

        } else {
            _.lazyElemObserver = _lazyElemObserver(_);
        }

        if (!observerID) {
            console.warn(`It recommended to set an 'observerID', so the element group can leverage the same one.`, _.element);
        }

        _.lazyElemObserver.observe(_.element);
    }
}

declare module 'cash-dom' {
    export interface Cash {
        lazyLoad(options?: ILazyLoadOptions | StringPluginArgChoices): Cash;
    }
}