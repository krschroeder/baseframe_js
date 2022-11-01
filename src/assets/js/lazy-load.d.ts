import type PluginBase from './shared';
import type { StringPluginArgChoices } from './shared';

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

declare class LazyLoad extends PluginBase<ILazyLoadOptions> {
    constructor(options?: ILazyLoadOptions | StringPluginArgChoices);
    static defaults: ILazyLoadOptions;
}

declare module 'cash-dom' {
    export interface Cash {
        lazyLoad(options?: ILazyLoadOptions | StringPluginArgChoices): Cash;
    }
}

export default LazyLoad;