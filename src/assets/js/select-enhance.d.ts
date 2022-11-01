import type { Cash } from "cash-dom";
import type PluginBase from './shared';
import type { StringPluginArgChoices } from './shared';

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

declare class SelectEnhance extends PluginBase<ISelectEnhanceOptions> {
    constructor(options?: ISelectEnhanceOptions | StringPluginArgChoices);
    static defaults: ISelectEnhanceOptions;
}

declare global {
    interface Cash {
        selectEnhance(options?: ISelectEnhanceOptions | StringPluginArgChoices): Cash;
    }
}

export default SelectEnhance;