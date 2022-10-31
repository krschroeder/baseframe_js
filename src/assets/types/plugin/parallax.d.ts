import type { Cash, Selector } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { StringPluginArgChoices } from '../shared';

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

declare class Parallax implements BaseFramePluginBase<IParallaxOptions> {
    constructor(options?: IParallaxOptions | StringPluginArgChoices);
    static remove(element: Selector): void;
    static defaults: IParallaxOptions;
    static pluginName: string;
    static version: string;
}

export default Parallax;