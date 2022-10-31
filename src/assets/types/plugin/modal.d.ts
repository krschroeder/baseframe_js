import type { Cash, Selector } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { StringPluginArgChoices } from '../shared';

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

declare class Modal implements BaseFramePluginBase<IModalOptions> {
    constructor(options?: IModalOptions | StringPluginArgChoices);
    static remove(element: Selector): void;
    static defaults: IModalOptions;
    static pluginName: string;
    static version: string;
}

export default Modal;