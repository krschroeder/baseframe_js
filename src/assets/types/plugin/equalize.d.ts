import type { Selector } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { StringPluginArgChoices } from '../shared';

export interface IEqualizeOptions {
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

declare class Equalize implements BaseFramePluginBase<IEqualizeOptions> {
    constructor(options?: IEqualizeOptions | StringPluginArgChoices);
    static remove(element: Selector): void;
    static defaults: IEqualizeOptions;
    static pluginName: string;
    static version: string;
}

export default Equalize;