import { Selector } from 'cash-dom';

declare abstract class PluginBase {
	static version: string;
	static pluginName: string;
	static remove(element: Selector): void;
}

export interface LocationHashTracking {
	useHashFilter?: string;
	useLocationHash?: boolean;
	loadLocationHash?: boolean;
}

export interface LocationHashTrackingHistory extends LocationHashTracking {
	historyType?: 'push' | 'push' | 'replace';
}

export type StringPluginArgChoices = 'remove';

export default PluginBase;