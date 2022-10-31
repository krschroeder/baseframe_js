import type { Cash, Selector } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { StringPluginArgChoices } from '../shared';

export interface INavMobileOptions {
    enableBtn: string;
    ariaLabel?: string;
    slideDuration?: number;
    outerElement?: string;
    outsideClickClose?: boolean;
    hasUlCls?: string;
    menuOuterOpenCss?: string;
    menuOpenCss?: string;
    menuTogglingCss?: string;
    menuIsOpeningCss?: string;
    menuIsClosingCss?: string;
    arrowSubMenuItemCss?: string;
    submenuBtnSkip?: (() => boolean) | boolean; 
    doTrapFocus: boolean;
    trapFocusElem: Selector | null;
    stopPropagation: boolean;
    bkptEnable: number | null;
    afterNavItemOpen?: ($li: Cash) => {};
    afterNavItemClose?: ($li: Cash) => {};
    afterOpen?($element: Cash, outerElement: Cash | HTMLElement, enableBtn: string);
    afterClose?($element: Cash, outerElement: Cash | HTMLElement, enableBtn: string);
}

declare class NavMobile implements BaseFramePluginBase<INavMobileOptions> {
    constructor(options?: INavMobileOptions | StringPluginArgChoices);
    static remove(element: Selector): void;
    static defaults: INavMobileOptions;
    static pluginName: string;
    static version: string;
}

export default NavMobile;

// new NavMobile({submenuBtnSkip: false})