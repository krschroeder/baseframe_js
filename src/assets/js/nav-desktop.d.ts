import type { Cash, Selector } from "cash-dom";
import type PluginBase from './shared';
import type { StringPluginArgChoices } from './shared';

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

declare class NavDesktop extends PluginBase<INavDesktopOptions> {
    constructor(options?: INavDesktopOptions | StringPluginArgChoices);
    static defaults: INavDesktopOptions;
}

declare module 'cash-dom' {
    export interface Cash {
        navDesktop(options?: INavDesktopOptions | StringPluginArgChoices): Cash;
    }
}

export default NavDesktop;