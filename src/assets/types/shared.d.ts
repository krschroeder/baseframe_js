import {Cash} from 'cash-dom';

interface BaseFramePluginBase<Defaults> {
	version: string;
	pluginName: string;
	remove(element:Cash | HTMLElement): void;
	defaults: Defaults;
}

export type BaseFramePluginArgChoices = 'remove';

export default BaseFramePluginBase;