import type { Cash } from "cash-dom";
import type PluginBase from './shared';
import type { LocationHashTrackingHistory, StringPluginArgChoices } from './shared';

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

declare class Collapse extends PluginBase {
    constructor(options?: ICollapseOptions | StringPluginArgChoices);
    static defaults: ICollapseOptions;
}

declare module 'cash-dom' {
    export interface Cash {
        collapse(options?: ICollapseOptions | StringPluginArgChoices): Cash;
    }
}

export default Collapse;