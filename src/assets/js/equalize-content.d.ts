import type { Selector } from "cash-dom";
import type PluginBase from './shared';
import type { StringPluginArgChoices } from './shared';

export interface IEqualizeContentOptions {
    equalizeItem: Selector;
	startWidth?: number; 
	stopWidth?: number;
	timerDelay?: number;
	useHeight?: boolean;
	useMargin?: boolean;
	aligningCss?: string;
	resizeCss?: string;
	fuzzy?: number;
}

declare class EqualizeContent extends PluginBase {
    constructor(options?: IEqualizeContentOptions | StringPluginArgChoices);
    static defaults: IEqualizeContentOptions;
}

declare module 'cash-dom' {
    export interface Cash {
        equalizeContent(options?: IEqualizeContentOptions | StringPluginArgChoices): Cash;
    }
}

export default EqualizeContent;