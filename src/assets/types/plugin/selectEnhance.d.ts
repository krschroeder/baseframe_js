import type { Cash, Selector } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { StringPluginArgChoices } from '../shared';

export interface ISelectEnhanceOptions {
    cssPrefix?: string;
    mobileNative?: boolean;
    emptyValAsPlaceholder?: boolean; 
    blurDuration?: number;
    typeAheadDuration?: number;
    observeSelectbox?: boolean;
    focusIn?($element: Cash);
    focusOut?($element: Cash);
    beforeChange?($element: Cash);
    afterChange?($element: Cash);
}

declare class SelectEnhance implements BaseFramePluginBase<ISelectEnhanceOptions> {
    constructor(options?: ISelectEnhanceOptions | StringPluginArgChoices);
    static remove(element: Selector): void;
    static defaults: ISelectEnhanceOptions;
    static pluginName: string;
    static version: string;
}

export default SelectEnhance;