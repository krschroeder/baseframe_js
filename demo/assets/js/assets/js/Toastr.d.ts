import type { Cash, Selector } from "cash-dom";
import type { StringPluginArgChoices } from './types';
export interface IToasterDefaults {
    content: string;
    duration: number;
    ariaLive: 'off' | 'polite' | 'assertive';
    animationDuration: number;
    appendTo: Selector;
    outerCss: string;
    closeIconCss: string;
    closeTextCopy: string;
    enabledCss: string;
    dismissCss: string;
    btnDismissCss: string;
    cssGroupKey: string;
    oneOnly: boolean;
}
export interface IToasterOptions extends Partial<IToasterDefaults> {
    content: string;
}
export default class Toastr {
    static get version(): string;
    static Defaults: IToasterDefaults;
    static DismissedEventName: string;
    private toastrFinallyTimer;
    private currentlyToasting;
    private toasterBodyBuilt;
    $element: Cash;
    $toastrBody: Cash;
    $toastrWrap: Cash;
    params: IToasterDefaults;
    constructor(element: HTMLElement, options: IToasterOptions | StringPluginArgChoices);
    dismiss(): void;
    setContent(content: any, updateNow?: boolean): void;
    launch(): void;
    private getToasterContainer;
    private buildElems;
    private updateContent;
    static setContent(element: Cash, content: string, updateNow?: boolean): void;
    static remove(element: Cash, plugin?: Toastr): void;
}
declare module 'cash-dom' {
    interface Cash {
        toastr(options?: IToasterOptions | StringPluginArgChoices): Cash;
    }
}
