import { Selector } from 'cash-dom';


export interface LocationHashTracking {
	useHashFilter?: string | null;
	useLocationHash?: boolean;
	loadLocationHash?: boolean;
}

export interface LocationHashTrackingHistory extends LocationHashTracking {
	historyType?: 'push' | 'push' | 'replace';
}

export type StringPluginArgChoices = 'remove';

type PluginBaseClass = {
    version: string;
	pluginName: string;
    remove: (element: Selector) => void;
    Constructor?: Function;
    new (...args: any[]);
}

export default PluginBaseClass;