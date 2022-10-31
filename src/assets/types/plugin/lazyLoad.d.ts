import type { Cash } from "cash-dom";
import type { Selector } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { StringPluginArgChoices } from '../shared';

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

declare class LazyLoad implements BaseFramePluginBase<ILazyLoadOptions> {
    constructor(options?: ILazyLoadOptions | StringPluginArgChoices);
    static remove(element: Selector): void;
    static defaults: ILazyLoadOptions;
    static pluginName: string;
    static version: string;
}

export default LazyLoad;