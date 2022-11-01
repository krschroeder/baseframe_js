import type { Cash, Selector } from "cash-dom";
import type PluginBase from './shared';
import type { LocationHashTrackingHistory, StringPluginArgChoices } from './shared';

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
    beforeChange?(prevTabId: string, tabsList: Cash, tabsBody: Cash): void;
    afterChange?(prevTabId: string, tabsList: Cash, tabsBody: Cash): void;
    onInit?(tabsList: Cash, tabsBody: Cash): void
}

declare class Tabs extends PluginBase<ITabsOptions> {
    constructor(options?: ITabsOptions | StringPluginArgChoices);
    static defaults: ITabsOptions;
}

declare module 'cash-dom' {
    interface Cash {
        tabs(options?: ITabsOptions | StringPluginArgChoices): Cash;
    }
}

export default Tabs;