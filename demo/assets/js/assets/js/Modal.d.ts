import type { Cash, Selector } from "cash-dom";
import type { LocationHashTracking, StringPluginArgChoices } from './types';
type ModalObj = {
    $backdrop: Cash;
    $content: Cash;
    contentAppended: boolean;
    $dialog: Cash;
    $dialogContent: Cash;
    $closeBtn: Cash;
    id: string;
    $modal: Cash;
    close: () => void;
    show: boolean;
};
export interface IModalDefaults extends LocationHashTracking {
    src: Selector;
    modalID: string | null;
    enableEvent: string;
    appendTo: Selector;
    ariaLabelledby: string | null;
    ariaLabel: string | null;
    cssPrefix: string;
    closeBtnIconCss: string;
    closeBtnLabel: string;
    closeOutDelay: number;
    backDropClose: boolean;
    fromDOM: boolean;
    modalCss: string | null;
    onOpenOnce(modalObj: ModalObj): void;
    onOpen(modalObj: ModalObj): void;
    onClose(modalObj: ModalObj): void;
    afterClose(modalObj: ModalObj): void;
}
export interface IModalOptions extends Partial<IModalDefaults> {
    modalID: string | null;
}
export default class Modal {
    element: HTMLElement;
    params: IModalDefaults;
    modalID: string;
    modalObj: ModalObj;
    modalEvent: string;
    trappedFocus: any;
    enabledElem: Element | null;
    openedOnce: boolean;
    static defaults: IModalDefaults;
    constructor(element: HTMLAnchorElement | HTMLElement | HTMLButtonElement, options: IModalOptions | StringPluginArgChoices);
    static get version(): string;
    static remove(element: Cash, plugin?: Modal): void;
    handleEvents(): void;
    setDisplayAndEvents(): void;
    getModalObj(): {
        $backdrop: Cash;
        $content: Cash;
        contentAppended: boolean;
        $dialog: Cash;
        $dialogContent: Cash;
        $closeBtn: Cash;
        id: string;
        $modal: Cash;
        close: () => void;
        show: boolean;
    };
    enableModal(): void;
    close(): void;
    loadFromUrl(): void;
}
declare module 'cash-dom' {
    interface Cash {
        modal(options: IModalOptions | StringPluginArgChoices): Cash;
    }
}
export {};
