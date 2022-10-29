import type { Selector } from "cash-dom";
import type { Cash } from "cash-dom";
import type BaseFramePluginBase from "../shared";
import type { BaseFramePluginArgChoices } from '../shared';

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

interface IModalOptions {

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
    modalID: string;
    src: Selector;
    useHashFilter?: string;
    useLocationHash?: boolean;
    loadLocationHash?: boolean;
    onOpenOnce?(modalObj: ModalObj): void;
    onOpen?(modalObj: ModalObj): void;
    afterClose?(modalObj: ModalObj): void;
}

declare class Modal implements BaseFramePluginBase<IModalOptions> {
    constructor(options?: IModalOptions | BaseFramePluginArgChoices);
    remove(element: Cash | HTMLElement): void;
    defaults: IModalOptions;
    pluginName: string;
    version: string;
}


export function FnModal(options?: IModalOptions | BaseFramePluginArgChoices): Cash;

export { Modal }