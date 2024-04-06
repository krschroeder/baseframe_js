import { Cash } from "cash-dom";
import type { StringPluginArgChoices } from './types';
type Axis = 'x' | 'y';
export interface IParallaxDefaults {
    speed: number;
    zSpeed: number;
    axis: Axis;
    cssPrefix: string;
    scrollAxis: Axis;
    zAxis: boolean;
    relativeElem: false | Cash;
    bgFill: boolean;
    rootMargin: number | [number, number];
    minWidth: number | null;
    maxWidth: number | null;
    scrollMaxPxStop: number;
    zScrollMaxPxStop: number;
}
interface IElementInView {
    top: number;
    left: number;
    bottom: number;
    right: number;
}
export interface IParallaxOptions extends Partial<IParallaxDefaults> {
}
export default class Parallax {
    #private;
    params: IParallaxDefaults;
    zInitOffset: number;
    index: number;
    instanceEvent: string;
    $window: Cash;
    $element: Cash;
    element: HTMLElement;
    elementOffset: IElementInView;
    $relElem: Cash;
    winHeight: number;
    winWidth: number;
    elemHeight: number;
    elemWidth: number;
    speed: number;
    zSpeed: number;
    fillAmount: number;
    bgFill: boolean;
    bgFillProp: 'height' | 'width';
    axis: Axis;
    zAxis: boolean;
    scrollMaxPxStop: number;
    zScrollMaxPxStop: number;
    rootMargin: [number, number];
    lastZSpeed: number;
    lastCssInProps: Record<string, string>;
    minWidthIfSet: boolean;
    maxWidthIfSet: boolean;
    effectCleared: boolean;
    cssPrevDir: string;
    static get version(): string;
    static defaults: IParallaxDefaults;
    constructor(element: HTMLElement, options: IParallaxOptions | StringPluginArgChoices, index: number);
    handleEvents(): void;
    handleUpdate(): void;
    updatableProps(): void;
    getElementRects(): IElementInView;
    parallax(s: Parallax): void;
    isInView(scrollVertical: boolean, pixelStart: number, scrollDir: number, rootMargin: number): boolean;
    static remove(element: Cash, plugin?: Parallax): void;
}
declare module 'cash-dom' {
    interface Cash {
        parallax(options?: IParallaxOptions | StringPluginArgChoices): Cash;
    }
}
export {};
