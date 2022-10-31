import type { Cash } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { LocationHashTrackingHistory, StringPluginArgChoices } from '../shared';

export interface ICollapseOptions extends LocationHashTrackingHistory {
    cssPrefix?: string;
    toggleClickBindOn?: 'group' | 'body';
    toggleDuration?: number;
    toggleGroup?: boolean;
    moveToTopOnOpen?: boolean;
    moveToTopOffset?: number;
    scrollSpeed?: number;
    afterOpen?($btnElems: Cash, $collapsibleItem: Cash): void;
    afterClose?($btnElems: Cash, $collapsibleItem: Cash): void;
    afterInit?(element: HTMLElement): void;
}

declare class Collapse implements BaseFramePluginBase<ICollapseOptions> {
    constructor(options?: ICollapseOptions | StringPluginArgChoices);
    static remove(element: Selector): void;
    static defaults: ICollapseOptions;
    static pluginName: string;
    static version: string;
}

export default Collapse;