import type { Cash, Selector } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { StringPluginArgChoices } from '../shared';

type keyDirections = 'horizontal'| 'vertical';

export interface IAccessibleMenuOptions {
    keyDirections: keyDirections[];
    focusCss: string;
}

declare class AccessibleMenu implements BaseFramePluginBase<IAccessibleMenuOptions> {
    constructor(options?: IAccessibleMenuOptions | StringPluginArgChoices);
    static remove(element: Selector): void;
    static defaults: IAccessibleMenuOptions;
    static pluginName: string;
    static version: string;
}

export default AccessibleMenu;