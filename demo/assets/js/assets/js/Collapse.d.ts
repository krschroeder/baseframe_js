import type { Cash } from "cash-dom";
import type { LocationHashTracking, StringPluginArgChoices } from './types';
export interface ICollapseDefaults extends LocationHashTracking {
    cssPrefix: string;
    toggleDuration: number;
    toggleGroup: boolean;
    moveToTopOnOpen: boolean;
    moveToTopOffset: number;
    scrollSpeed: number;
    afterOpen($btnElems: Cash, $collapsibleItem: Cash): void;
    afterClose($btnElems: Cash, $collapsibleItem: Cash): void;
    afterInit($element: Cash): void;
}
export interface ICollapseOptions extends Partial<ICollapseDefaults> {
}
export default class Collapse {
    #private;
    $element: Cash;
    params: ICollapseDefaults;
    toggling: boolean;
    $btnElems: Cash | null;
    $activeItem: Cash | null;
    initLoaded: boolean;
    static defaults: ICollapseDefaults;
    constructor(element: HTMLElement, options: ICollapseOptions | StringPluginArgChoices, index?: number);
    static get version(): string;
    static remove(element: Cash, plugin?: Collapse): void;
    handleEvents(): void;
    loadFromUrl(): void;
    toggleAction(currElemID: string): void;
    moveToTopOnOpen(): void;
}
declare module 'cash-dom' {
    interface Cash {
        collapse(options?: ICollapseOptions | StringPluginArgChoices): Cash;
    }
}
