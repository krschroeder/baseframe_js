import type { Cash } from "cash-dom";
import type { LocationHashTracking, PrimaryClickElems, StringPluginArgChoices } from './types';
type tabDefaultContent = string;
export interface ITabsDefaults extends LocationHashTracking {
    tabsEvent: string;
    cssPrefix: string;
    addIDtoPanel: boolean;
    ariaLabel: boolean;
    tabChange(tabId: string, prevTabId: string, tabsList: Cash, tabsBody: Cash): void;
    onInit(tabsList: Cash, tabsBody: Cash): void;
}
export interface ITabsOptions extends Partial<ITabsDefaults> {
}
export default class Tabs {
    #private;
    static get version(): string;
    $element: Cash;
    params: ITabsDefaults;
    $tabsNav: Cash;
    $tabsNavClickElems: Cash;
    tabsNavClickElems: PrimaryClickElems[];
    $tabsBody: Cash;
    $tabsBodyPanels: Cash;
    prevTabId: string;
    initTabId: string;
    initDefaultContent: tabDefaultContent;
    static defaults: ITabsDefaults;
    constructor(element: HTMLElement, options: ITabsOptions | StringPluginArgChoices);
    loadDefaultContent(): void;
    loadFromUrl(): void;
    getClickElemFromTabId(tabId: string): PrimaryClickElems;
    setAriaAttrs(): void;
    handleEvents(): void;
    changeTabElements(clickElem: PrimaryClickElems, tabId: string, updateUrl?: boolean): void;
    static remove(element: Cash, plugin?: Tabs): void;
}
declare module 'cash-dom' {
    interface Cash {
        tabs(options?: ITabsOptions | StringPluginArgChoices): Cash;
    }
}
export {};
