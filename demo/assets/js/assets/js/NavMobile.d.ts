import type { Cash, Selector } from "cash-dom";
import type { StringPluginArgChoices } from './types';
type submenuBtnSkipFn = (elem: HTMLElement) => boolean;
interface NavMobileCssList {
    menuOuterOpen: string;
    menuHasUL: string;
    menuOpen: string;
    menuOpening: string;
    menuClosing: string;
    menuToggling: string;
    menuBtnCss: string;
}
export interface INavMobileDefaults {
    enableBtn: Selector;
    ariaLabel: string;
    subMenuText: string;
    insertToggleBtnAfter: string;
    slideDuration: number;
    outerElement: string;
    outsideClickClose: boolean;
    cssPrefix: string;
    menuBtnCss: string;
    menuBtnSkip: submenuBtnSkipFn | boolean;
    doTrapFocus: boolean;
    trapFocusElem: Selector | null;
    stopPropagation: boolean;
    bkptEnable: number | null;
    animateHeight: boolean;
    afterNavItemOpen: ($li: Cash) => void;
    afterNavItemClose: ($li: Cash) => void;
    afterOpen($element: Cash, outerElement: Cash, enableBtn: Cash): any;
    afterClose($element: Cash, outerElement: Cash, enableBtn: Cash): any;
}
export interface INavMobileOptions extends Partial<INavMobileDefaults> {
    enableBtn: Selector;
}
export default class NavMobile {
    #private;
    $element: Cash;
    params: INavMobileDefaults;
    menuOpened: boolean;
    allowClick: boolean;
    cssList: NavMobileCssList;
    static get version(): string;
    static defaults: {
        enableBtn: string;
        ariaLabel: string;
        subMenuText: string;
        insertToggleBtnAfter: string;
        slideDuration: number;
        outerElement: HTMLElement;
        outsideClickClose: boolean;
        animateHeight: boolean;
        cssPrefix: string;
        menuBtnCss: string;
        menuBtnSkip: boolean;
        afterNavItemOpen: () => void;
        afterNavItemClose: () => void;
        afterOpen: () => void;
        afterClose: () => void;
        doTrapFocus: boolean;
        trapFocusElem: any;
        stopPropagation: boolean;
        bkptEnable: any;
    };
    constructor(element: HTMLElement, options: INavMobileOptions | StringPluginArgChoices);
    handleEvents(): void;
    addChildNavCss(): void;
    checkIfEnabled(): void;
    static remove(element: Cash, plugin?: NavMobile): void;
}
declare module 'cash-dom' {
    interface Cash {
        navMobile(options: INavMobileOptions | StringPluginArgChoices): Cash;
    }
}
export {};
