import type { Cash } from 'cash-dom';
import type { StringPluginArgChoices } from './types';
type keyDirections = 'horizontal' | 'vertical';
type prevNextArgs = {
    e: KeyboardEvent;
    $ulParents: Cash;
    activeElem: Element | null;
    focusCss: string;
    keyDirections: keyDirections[];
    focusInElems: string;
};
export interface IAccessibleMenuDefaults {
    keyDirections: keyDirections[];
    focusCss: string;
    focusInElems: string;
    focusLeaveElems: string;
}
export interface IAccessibleMenuOptions extends Partial<IAccessibleMenuDefaults> {
}
export default class AccessibleMenu {
    #private;
    element: HTMLElement;
    $element: Cash;
    params: IAccessibleMenuDefaults;
    static get version(): string;
    static defaults: IAccessibleMenuDefaults;
    constructor(element: any, options: IAccessibleMenuOptions | StringPluginArgChoices);
    static remove(element: Cash, plugin?: AccessibleMenu): void;
    prev(props: prevNextArgs): void;
    next(props: prevNextArgs): void;
    handleEvents(): void;
}
declare module 'cash-dom' {
    interface Cash {
        accessibleMenu(options?: IAccessibleMenuOptions | StringPluginArgChoices): Cash;
    }
}
export {};
