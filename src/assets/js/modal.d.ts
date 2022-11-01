import type { Cash, Selector } from "cash-dom";
import type PluginBase from './shared';
import type { StringPluginArgChoices } from './shared';

type ModalObj = {
    $backdrop: Cash;
    $content: Cash;
    contentAppended: boolean; //state
    $dialog: Cash //modal dialog
    $dialogContent: Cash // modal dialog content
    $closeBtn: Cash
    id: string,
    $modal: Cash, //outermost element
    disableModal: () => void, //disable modal fn
    show: boolean //state
}

export interface IModalOptions {
    src: Selector;
    modalID: string;
    enableEvent?: string;
    appendTo?: Selector;
    ariaLabelledby?: string;
    ariaLabel?: string;
    cssPrefix?: string;
    closeBtnIconCss?: string;
    closeOutDelay?: number;
    backDropClose?: boolean;
    fromDOM?: boolean;
    modalCss?: string;
    useHashFilter?: string;
    useLocationHash?: boolean;
    loadLocationHash?: boolean;
    onOpenOnce?(modalObj: ModalObj): void;
    onOpen?(modalObj: ModalObj): void;
    afterClose?(modalObj: ModalObj): void;
}

declare class Modal extends PluginBase {
    constructor(options?: IModalOptions | StringPluginArgChoices);
    static defaults: IModalOptions;
}

declare module 'cash-dom' {
    export interface Cash {
        modal(options?: IModalOptions | StringPluginArgChoices): Cash;
    }
}

export default Modal;