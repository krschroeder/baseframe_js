import type { BaseElem } from "base-elem-js";
export type StateChangeType = 'push' | 'replace';
export type UrlSearchType   = 'search' | 'hash' | 'hashVal';
export type PlainObject<T> 	= Record<string, T>;
export type StringPluginArgChoices = 'remove' | 'update';
export type PrimaryClickElems = HTMLButtonElement | HTMLAnchorElement;
export type WinSetTimeout = ReturnType<typeof window.setTimeout> | null;

export type PluginBaseClass = {
    version: string;
    pluginName: string;
    remove: (element: BaseElem) => void;
    Constructor?: Function;
    new (...args: any[]);
}

export interface LocationTracking {
	historyType: StateChangeType;
	urlFilterType: UrlSearchType | 'none';
	locationFilter: string | null;
	loadLocation: boolean;
}
 