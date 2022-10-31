import { Selector } from 'cash-dom';

interface BaseFramePluginBase<Defaults> {
	static version: string;
	static pluginName: string;
	static remove(element: Selector): void;
	static defaults: Defaults;
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

export default BaseFramePluginBase;