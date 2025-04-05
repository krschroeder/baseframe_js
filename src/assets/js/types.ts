// import type { Cash } from "cash-dom";
import type { BaseElem } from "base-elem-js";
export type StateChangeType = 'push' | 'replace';
export type UrlSearchType   = 'search' | 'hash' | 'hashVal';
export type PlainObject<T> 	= Record<string, T>;
export type StringPluginArgChoices = 'remove' | 'update';
export type PrimaryClickElems = HTMLButtonElement | HTMLAnchorElement;

export type PluginBaseClass = {
    version: string;
    pluginName: string;
    remove: (element: BaseElem) => void;
    Constructor?: Function;
    new (...args: any[]);
}

export interface LocationHashTracking {
	historyType: StateChangeType;
	urlFilterType: UrlSearchType | 'none';
	locationFilter: string | null;
	loadLocation: boolean;
}
 