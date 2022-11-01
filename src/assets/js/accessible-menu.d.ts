import type { Cash, Selector } from "cash-dom";
import type PluginBase from "./shared";
import type { StringPluginArgChoices } from './shared';

type keyDirections = 'horizontal'| 'vertical';

export interface IAccessibleMenuOptions {
    keyDirections?: keyDirections[];
    focusCss?: string;
}

declare class AccessibleMenu extends PluginBase{
    constructor(options?: IAccessibleMenuOptions | StringPluginArgChoices);
    static defaults: IAccessibleMenuOptions;
}

declare module 'cash-dom' {
    export interface Cash {
        accessibleMenu(options?: IAccessibleMenuOptions | StringPluginArgChoices): Cash;
    }
}

export default AccessibleMenu;