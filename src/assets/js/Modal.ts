 
import type { LocationTracking, StringPluginArgChoices } from './types';

import $be, {type BaseElem, type EventName, type SelectorRoot} from "base-elem-js";
import Store from "./core/Store";
import UrlState from "./core/UrlState";
import focusTrap from './fn/focusTrap';
import { camelCase, getDataOptions, reflow, setParams } from './util/helpers';
import { noop } from './util/helpers';
import loadFromUrl from './util/loadfromUrl';
 

type ModalObj = {
    backdrop: HTMLDivElement;
    content: HTMLElement[];
    contentAppended: boolean; //state
    dialog: HTMLDivElement; //modal dialog
    dialogContent: HTMLDivElement; // modal dialog content
    closeBtn: HTMLButtonElement;
    id: string,
    modal: HTMLDivElement; //outermost element
    close: () => void, //disable modal fn
    show: boolean //state
}

export interface IModalCss {
    show: string;
    dismissing: string;
    open: string;
    btnDismiss: string;
    dialog: string;
    dialogContent: string;
    backdrop: string;
    marker: string;
}

export interface IModalDefaults extends LocationTracking {
    src: SelectorRoot | string;
    modalID: string | null;
    enableEvent: string;
    appendTo: SelectorRoot;
    ariaLabelledby: string | null;
    ariaLabel: string | null;
    cssPrefix: string;
    closeBtnIconCss: string;
    closeBtnLabel: string;
    closeOutDelay: number;
    backDropClose: boolean;
    fromDOM: boolean;
    modalCss: string | null;
    focusInDelay: number | null;
    onOpenOnce(components: ModalObj): void;
    onOpen(components: ModalObj): void;
    onClose(components: ModalObj): void;
    afterClose(components: ModalObj): void;
}

export interface IModalOptions extends Partial<IModalDefaults> {
    modalID: string | null;
}

const bes = $be.static;

const VERSION = '1.2.0';
const EVENT_NAME = 'modal';
const DATA_NAME = 'Modal';
const DEFAULTS: IModalDefaults = {
    enableEvent: 'click',
    appendTo: document.body,
    ariaLabelledby: null,
    ariaLabel: null,
    cssPrefix: 'modal',
    closeBtnIconCss: 'ico i-close',
    closeBtnLabel: 'Close',
    closeOutDelay: 250,
    focusInDelay: 0,
    backDropClose: true,
    fromDOM: false,
    modalCss: null,
    modalID: null,
    src: '',
    urlFilterType: 'hash',
    historyType: 'replace',
    locationFilter: 'modal',
    loadLocation: true,

    onOpenOnce: noop,
    onOpen: noop,
    onClose: noop,
    afterClose: noop
};

const hasCb = (cb, components) => {
    if (cb && typeof cb === 'function') {
        cb(components);
    }
}

export default class Modal {

    public element: HTMLElement;
    public params: IModalDefaults;
    public modalID: string;
    public components: ModalObj;
    public modalEvent: string;
    public focusTrapped: ReturnType<typeof focusTrap>;
    public enabledElem: Element | null;
    public openedOnce: boolean;
    public domMarker: HTMLElement | null;
    public cssList: IModalCss;
    public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

    constructor(element: HTMLAnchorElement | HTMLElement | HTMLButtonElement, options: IModalOptions | StringPluginArgChoices) {
        const s = this;

        s.element = element;

        const dataOptions = getDataOptions(element, EVENT_NAME);
        const params = setParams(Modal.defaults, options, dataOptions);
        const { cssPrefix } = params;

        s.params = params;
        s.modalID = s.params.modalID;
        s.modalEvent = EVENT_NAME + '_' + s.modalID;
        s.focusTrapped;
        s.enabledElem;
        s.openedOnce = false;
        s.cssList = {
            show:           cssPrefix + '--show',
            dismissing:     cssPrefix + '--dismissing',
            open:           cssPrefix + '-open',
            btnDismiss:     cssPrefix + '__btn-dismiss',
            dialog:         cssPrefix + '__dialog',
            dialogContent:  cssPrefix + '__dialog-content',
            backdrop:       cssPrefix + '__backdrop',
            marker:         cssPrefix + '-content-placemarker'
        };
        s.components = s.#createComponents();
        s.domMarker = bes.make(`span.${s.cssList.marker}-content-placemarker#${s.modalID}__marker`);
        
        s.#handleEvents();
        
        loadFromUrl(s.params as LocationTracking, (id) => {
            if (id === s.modalID) {
                s.components.show ? s.close() : s.#setDisplayAndEvents();
            }
        })
        
        Store(element, DATA_NAME, s);

		return s;
    }


    static remove(element: BaseElem, plugin?: Modal) {

        $be(element).each((elem) => {

            const s: Modal = plugin || Store(elem, DATA_NAME);
            const params = s.params;
            const { backdrop, closeBtn } = s.components;

            s.components.show && s.components.close();
            $be(s.element).off(`${s.params.enableEvent}.${s.modalEvent}` as EventName);
            $be(closeBtn).off(`click.${s.modalEvent}Dismiss`);
            if (params.backDropClose) $be(backdrop).off(`click.${s.modalEvent}Dismiss`);
            $be(document).off([`keydown.${s.modalEvent}Dismiss`,`[${s.modalEvent}Dismiss]`]);
            $be(window).off([`popstate.${s.modalEvent}`,`[${s.modalEvent}]`]);
            
            Store(elem, DATA_NAME, null);
        });
    }

    #handleEvents() {
        const s = this;

        $be(s.element).on(`${s.params.enableEvent}.${s.modalEvent}` as EventName, (e) => {
            s.#setDisplayAndEvents();
            e.preventDefault();
        });
    }

    #setDisplayAndEvents() {
        const s = this;
        s.#enableModal();

        $be(document).on(`keydown.${s.modalEvent}Dismiss`, function (e) {
            const ekey = e.code || e.originalEvent.key; //cash-dom || jquery
            if (ekey === 'Escape') {
                s.close();
                e.preventDefault();
            }
        });

        $be(document).on(`[${s.modalEvent}Dismiss]`, s.close);
    }

    #createComponents() {
        const { make } = bes;
        const 
            s               = this,
            p               = s.params,
            css             = s.cssList,
            rootCss         = p.cssPrefix + (p.modalCss ? ' ' + p.modalCss : ''),
            ariaLabelledby  = (p.ariaLabelledby || s.element.dataset.ariaLabelledby) || null,
            modal           = make(`div.${rootCss}`, {
                                id: s.modalID,
                                ariaLabel: (p.ariaLabel || s.element.dataset.ariaLabel) || null 
                            }),
            closeBtn        = make(`button.${css.btnDismiss}`, { 
                                type: 'button', 
                                ariaLabel: p.closeBtnLabel 
                            }, `<i class="${p.closeBtnIconCss}"></i>`),
            dialogContent   = make(`div.${css.dialogContent}`),
            dialog          = make(`div.${css.dialog}`),
            backdrop        = make(`div.${css.backdrop}`),
            $content        = $be(
                s.params.src || 
                (<HTMLAnchorElement>s.element).hash || 
                s.element.dataset.modalSrc
            );
        ;
        
        // typescript doesn't like setting this in the object above
        modal.setAttribute('aria-labelledby',ariaLabelledby);
        
        $be(dialog).insert([closeBtn, dialogContent]);
        $be(modal).insert([backdrop, dialog]);

        return { 
            backdrop,
            content: $content.elem as HTMLElement[],
            contentAppended: false,
            dialog,
            dialogContent,
            closeBtn,
            id: s.modalID, 
            modal,
            close: () => s.close(),
            show: false
        };
    }

    #enableModal() {

        const s = this;
        const { backdrop, closeBtn, content, modal } = s.components;
        const p = s.params;
        const $modal = $be(modal);

        s.enabledElem = document.activeElement;
        
        if (p.fromDOM) {
            $be(content).insert(s.domMarker,'after');
        }

        if (!s.components.contentAppended) {
             
            $be(s.components.dialogContent).insert(content);
            bes.oa(s.components, { contentAppended: true });
        } 

        $be(p.appendTo).insert(modal);

        // attach events after appended to DOM
        $be(closeBtn).on(`click.${s.modalEvent}Dismiss`, () => s.close());
        if (p.backDropClose) $be(backdrop).on(`click.${s.modalEvent}Dismiss`, () => s.close());

        hasCb(p.onOpen, s.components);

        if (!s.openedOnce) {
            hasCb(p.onOpenOnce, s.components);
            s.openedOnce = true;
        }

        $modal
            .attr({ role: 'dialog', 'aria-modal': 'true'})
            .each(elem => reflow(elem))
            .addClass(s.cssList.show)
        ;
        bes.oa(s.components, { show: true });

        if (p.focusInDelay !== null) {
            setTimeout(() => {
                s.focusTrapped = focusTrap($modal, { nameSpace: camelCase(s.modalID) });
            }, p.focusInDelay);
        }

        $be(p.appendTo).addClass(s.cssList.open).css({
            overflow: 'hidden',
            paddingRight: '0px'
        });

        if (p.urlFilterType !== 'none') {
            UrlState.set(p.urlFilterType, p.locationFilter, s.modalID, p.historyType);
        }
    }

    close() {

        const s = this;
        const p = s.params;
        const { backdrop, closeBtn, content, modal } = s.components;
        const $modal = $be(modal);
        
        hasCb(p.onClose, s.components);

        $modal
            .addClass(s.cssList.dismissing)
            .rmClass(s.cssList.show);

        // detach events
        $be(closeBtn).off(`click.${s.modalEvent}Dismiss`);

        if (p.backDropClose) $be(backdrop).off(`click.${s.modalEvent}Dismiss`);
        
        $be(document).off([
            `keydown.${s.modalEvent}Dismiss`, 
            `${s.modalEvent}Dismiss`
        ] as EventName[]);
           
        
        if (p.urlFilterType !== 'none') {
            UrlState.set(p.urlFilterType, p.locationFilter, null, p.historyType);
        }

        setTimeout(() => {
            $modal.attr({
                role: 'dialog',
                'aria-modal': ''
            }).rmClass(s.cssList.dismissing).css({
                display: ''
            });

            $be(p.appendTo).rmClass(s.cssList.open).css({
                overflow: null,
                paddingRight: null
            });

            if (p.focusInDelay !== null) {
                s.focusTrapped.remove();
            }

            if (s.enabledElem && s.enabledElem instanceof HTMLElement) {
                s.enabledElem.focus();
            }

            if (p.fromDOM) {
                $be(s.domMarker).insert(content, 'after').remove();
                bes.oa(s.components, { contentAppended: false });
            }

            hasCb(p.afterClose, s.components);
            $modal.remove();
            bes.oa(s.components, { show: false });

        }, p.closeOutDelay);
    }
}

export interface ModalPlugin {
    modal(options: IModalOptions | StringPluginArgChoices): BaseElem;
}
 
declare module 'base-elem-js' {
    interface BaseElem extends ModalPlugin {}
}