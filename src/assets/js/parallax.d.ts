import type { Cash } from "cash-dom";
import type PluginBase from './shared';
import type { StringPluginArgChoices } from './shared';

export interface IParallaxOptions {
    speed?: number;
    axis?: 'x' | 'y';
    relativeElem?: false | Cash;
    $heightElem?: Cash;
    initOffset?: boolean;
    bgFill?: boolean;
    outStop?: number;
    minWidth?: number;
    maxWidth?: number;
    scrollMaxPxStop?: number;
}

declare class Parallax extends PluginBase<IParallaxOptions> {
    constructor(options?: IParallaxOptions | StringPluginArgChoices);
    static defaults: IParallaxOptions;
}

declare module 'cash-dom' {
    interface Cash {
        parallax(options?: IParallaxOptions | StringPluginArgChoices): Cash;
    }
}

export default Parallax;