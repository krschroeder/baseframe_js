import type { Cash, Selector } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { LocationHashTrackingHistory, StringPluginArgChoices } from '../shared';

export interface ITabsOptions extends LocationHashTrackingHistory {
    defaultContent?: number | 'none';
    tabsEvent?: string;
    activeCss?: string;
    tabsBodyCss?: string;
    tabsBodyItemCss?: string;
    tabsBodyItemShowCss?: string;
    tabsHeadCss?: string;
    tabbing?: boolean;
    tabDirection?: string;
    addIDtoPanel?: boolean;
    beforeChange?(prevTabId: string, tabsList: Cash, tabsBody: Cash);
    afterChange?(prevTabId: string, tabsList: Cash, tabsBody: Cash);
    onInit?(prevTabId: string, tabsList: Cash, tabsBody: Cash)
}

declare class Tabs implements BaseFramePluginBase<ITabsOptions> {
    constructor(options?: ITabsOptions | StringPluginArgChoices);
    static remove(element: Selector): void;
    static defaults: ITabsOptions;
    static pluginName: string;
    static version: string;
}

export default Tabs;