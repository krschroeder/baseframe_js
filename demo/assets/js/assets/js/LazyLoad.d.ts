import type { StringPluginArgChoices } from './types';
import type { Cash } from 'cash-dom';
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
export default class LazyLoad {
    element: HTMLElement;
    params: ILazyLoadDefaults;
    lazyElemObserver: IntersectionObserver;
    static get version(): string;
    static get pluginName(): string;
    static defaults: {
        imgSrcName: string;
        bgSrcName: string;
        loadImgs: boolean;
        inEvt: any;
        outEvt: any;
        force: boolean;
        observerID: any;
        unobserve: boolean;
        observerOpts: {
            rootMargin: string;
        };
    };
    constructor(element: HTMLElement, options: ILazyLoadOptions | StringPluginArgChoices);
    static remove(element: Cash, plugin?: LazyLoad): void;
    imgAndBg(s: any, lazyElem: any): void;
    handleEvents(): void;
}
declare module 'cash-dom' {
    interface Cash {
        lazyLoad(options: ILazyLoadOptions | StringPluginArgChoices): Cash;
    }
}
