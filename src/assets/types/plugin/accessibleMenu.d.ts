import type { Cash } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { BaseFramePluginArgChoices } from '../shared';

type keyDirections = 'horizontal'| 'vertical';

interface IAccessibleMenuOptions {
    keyDirections: keyDirections[];
    focusCss: string;
}

declare class AccessibleMenu implements BaseFramePluginBase<IAccessibleMenuOptions> {
    constructor(options?: IAccessibleMenuOptions | BaseFramePluginArgChoices);
    remove(element: Cash | HTMLElement): void;
    defaults: IAccessibleMenuOptions;
    pluginName: string;
    version: string;
}

export function FnAccessibleMenu(options?: IAccessibleMenuOptions | BaseFramePluginArgChoices): Cash;
