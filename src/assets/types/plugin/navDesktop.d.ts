import type { Cash, Selector } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { StringPluginArgChoices } from '../shared';

export interface INavDesktopOptions {
    stopWidth?: number;
    delay?: number;
    edgeCss?: string;
    outerElem?: Selector;
    ulHasCss?: string;
    ulNotCss?: string;
    navHoveredCss?: string;
    navLeavingCss?: string;
    navLeavingDelay?: number;
    hoverCss?: string;
}

declare class NavDesktop implements BaseFramePluginBase<INavDesktopOptions> {
    constructor(options?: INavDesktopOptions | StringPluginArgChoices);
    static remove(element: Selector): void;
    static defaults: INavDesktopOptions;
    static pluginName: string;
    static version: string;
}

export default NavDesktop;