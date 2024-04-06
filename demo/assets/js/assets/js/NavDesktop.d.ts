import type { Cash } from 'cash-dom';
import type { StringPluginArgChoices } from './types';
interface INavDesktopCss {
    menuHasUL: string;
    menuNoUl: string;
    menuElemEdge: string;
    menuHovered: string;
    menuLeaving: string;
}
export interface INavDesktopDefaults {
    stopWidth: number;
    delay: number;
    outerElem: HTMLElement;
    cssPrefix: string;
    navLeavingDelay: number;
    hoverCss: string;
}
export interface INavDesktopOptions extends Partial<INavDesktopDefaults> {
}
export default class NavDesktop {
    element: HTMLElement;
    params: INavDesktopDefaults;
    cssList: INavDesktopCss;
    stayHover: ReturnType<typeof setTimeout>;
    navLeaving: ReturnType<typeof setTimeout>;
    static defaults: INavDesktopDefaults;
    static get version(): string;
    constructor(element: HTMLElement, options: INavDesktopOptions | StringPluginArgChoices);
    static remove(element: Cash, plugin?: NavDesktop): void;
    addCssToElems(): void;
    handleEvents(): void;
    edgeDetector(liOrUl: HTMLElement): void;
}
declare module 'cash-dom' {
    interface Cash {
        navDesktop(options?: INavDesktopOptions | StringPluginArgChoices): Cash;
    }
}
export {};
