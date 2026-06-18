 
import type { LocationTracking, StringPluginArgChoices } from './types';

import $be, {type BaseElem, type EventName, type SelectorRoot} from "base-elem-js";
import Store from "./core/Store";
import UrlState from "./core/UrlState";
import focusTrap from './fn/focusTrap';
import { camelCase, getDataOptions, reflow, setParams } from './util/helpers';
import { noop } from './util/helpers';
import loadFromUrl from './util/loadfromUrl';
 

type DialogElement = HTMLAnchorElement | HTMLElement | HTMLButtonElement;

// type DialogObj = {
//     backdrop: HTMLDivElement;
//     content: HTMLElement[];
//     contentAppended: boolean; //state
//     dialog: HTMLDivElement; //modal dialog
//     dialogContent: HTMLDivElement; // modal dialog content
//     closeBtn: HTMLButtonElement;
//     id: string,
//     modal: HTMLDivElement; //outermost element
//     close: () => void, //disable modal fn
//     show: boolean //state
// }

// export interface IDialogCss {
//     show: string;
//     dismissing: string;
//     open: string;
//     btnDismiss: string;
//     dialog: string;
//     dialogContent: string;
//     backdrop: string;
//     marker: string;
// }

 

// export interface IDialogOptions extends Partial<IDialogDefaults> {
//     modalID: string | null;
// }

const VERSION = '1.2.0';
const EVENT_NAME = 'dialog';
const DATA_NAME = 'Dialog';

const { make, useCssAnimate } = $be;

type DialogAppendMethod = 'append' | 'prepend' | 'before' | 'after';

interface DialogDefaults extends LocationTracking {
    animateDur: number;
    appendTo: HTMLElement;
    useWrap: boolean;
    appendMethod: DialogAppendMethod;
    removeWithClose?: boolean;
    cssPrefix?: string;
    dialogCss?: string;
}

interface IDialogOptions extends Partial<DialogDefaults> {}


const DEFAULTS: DialogDefaults = {
    animateDur: 600,
    appendTo: document.body,
    useWrap: true,
    appendMethod: 'append',
    removeWithClose: false,
    cssPrefix: 'dialog',
    dialogCss: null,
    urlFilterType: 'hash',
    historyType: 'replace',
    locationFilter: 'modal',
    loadLocation: true,
}

export default class Dialog {

    public params: DialogDefaults;
    public dialogEl: HTMLDialogElement;
    public dialogWrap: HTMLDivElement;
    public dialogElInner: HTMLDivElement;
    public btnClose: HTMLButtonElement;
    public dialogAppendEl: HTMLDialogElement | HTMLDivElement;
    public $dialogEl: BaseElem;
    public $dialogElInner: BaseElem;
    public $btnClose: BaseElem;
    private cssAnimate: ReturnType<typeof useCssAnimate>[0];

    public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

    constructor(
        element: DialogElement,
        options: Partial<DialogDefaults> | StringPluginArgChoices = {}
    ) {
        const s         = this;
        const dataOptions = getDataOptions(element, EVENT_NAME);
        const params = setParams(Dialog.defaults, options, dataOptions);
        const { cssPrefix, dialogCss } = params;

        s.params        = params;
        s.dialogEl      = make(`dialog.${cssPrefix} ${dialogCss}`) as HTMLDialogElement;
        s.dialogWrap    = make(`div.${cssPrefix}-wrap ${cssPrefix}-wrap--${dialogCss}`);
        s.dialogElInner = make(`div.${cssPrefix}__inner`);
        s.btnClose      = make(`button.${cssPrefix}__btn-close`, { ariaLabel: 'Close'});

        s.$dialogEl         = $be(s.dialogEl);
        s.$dialogElInner    = $be(s.dialogElInner);
        s.$btnClose         = $be(s.btnClose);
        s.dialogAppendEl    = s.params.useWrap ? s.dialogWrap : s.dialogEl;

        [s.cssAnimate]      = useCssAnimate([s.params.appendTo, s.dialogEl, s.dialogWrap], `${cssPrefix}-`);

        if (s.params.useWrap) {
            s.dialogWrap.append(s.dialogEl);
        }

        s.$dialogElInner.insert(s.btnClose).insert(element);
        s.$dialogEl
            .addClass(dialogCss)
            .css({ '--dialog-tg-dur': s.params.animateDur + 'ms' })
            .insert(s.dialogElInner);

        $be(s.params.appendTo).insert(s.dialogAppendEl, s.params.appendMethod);

        s.$btnClose.on(`click.${EVENT_NAME}`, s.close);
        s.$dialogEl
            .on(`click.${EVENT_NAME}`, s.#handleBackdropClick)
            .on(`keydown.${EVENT_NAME}`, s.#handleEscapeClose);

        Store(element, DATA_NAME, s);

		return s;
    }

    #handleBackdropClick = (ev: MouseEvent) => {
        if (ev.target === this.dialogEl) {
            this.close();
        }
    };

    #handleEscapeClose = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
            ev.preventDefault();
            this.close();
        }
    };

    public close = () => {
        this.cssAnimate(false, this.params.animateDur, () => {
            this.dialogEl.close();
            if (this.params.removeWithClose) {
                this.dialogAppendEl.remove();
            }
        });
    };

    public showModal(cb?: () => void) {
        this.dialogEl.showModal();
        this.cssAnimate(true, this.params.animateDur);

        if (cb && typeof cb === 'function') cb();
    }

    public show(cb?: () => void) {
        this.dialogEl.show();
        this.cssAnimate(true, this.params.animateDur);

        if (cb && typeof cb === 'function') cb();
    }

    public static remove(element: DialogElement, plugin?: Dialog) {
        $be(element).each((elem) => {
            const s: Dialog = plugin || Store(elem, DATA_NAME);
            
            s.$btnClose.off(`click.${EVENT_NAME}`);
            s.$dialogEl.off([`click.${EVENT_NAME}`, `keydown.${EVENT_NAME}`]);
            s.dialogAppendEl.remove();
            // delete the Store item
            Store(elem, DATA_NAME, null);
        })
    }
}

export interface DialogPlugin {
    modal(options: IDialogOptions | StringPluginArgChoices): BaseElem;
}
 
declare module 'base-elem-js' {
    interface BaseElem extends DialogPlugin {}
}