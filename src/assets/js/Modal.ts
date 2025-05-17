 
import type { LocationHashTracking, StringPluginArgChoices } from './types';

import $be, {type BaseElem, type EventName, type SelectorRoot} from "base-elem-js";
import Store from "./core/Store";
import UrlState from "./core/UrlState";
import trapFocus from './fn/trapFocus';
import { camelCase, getDataOptions, reflow, setParams } from './util/helpers';
import { noop } from './util/helpers';
 

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

export interface IModalDefaults extends LocationHashTracking {
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
    onOpenOnce(modalObj: ModalObj): void;
    onOpen(modalObj: ModalObj): void;
    onClose(modalObj: ModalObj): void;
    afterClose(modalObj: ModalObj): void;
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

const hasCb = (cb, modalObj) => {
    if (cb && typeof cb === 'function') {
        cb(modalObj);
    }
}

export default class Modal {

    public element: HTMLElement;
    public params: IModalDefaults;
    public modalID: string;
    public modalObj: ModalObj;
    public modalEvent: string;
    public trappedFocus: any;
    public enabledElem: Element | null;
    public openedOnce: boolean;

    public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

    constructor(element: HTMLAnchorElement | HTMLElement | HTMLButtonElement, options: IModalOptions | StringPluginArgChoices) {
        const s = this;

        s.element = element;

        const dataOptions = getDataOptions(element, EVENT_NAME);
        
        s.params = setParams(Modal.defaults, options, dataOptions);
        s.modalID = s.params.modalID;
        s.modalObj = s.getModalObj();
        s.modalEvent = EVENT_NAME + '_' + s.modalID;
        s.trappedFocus;
        s.enabledElem;
        s.openedOnce = false;
        
        s.handleEvents();
        s.loadFromUrl();

        Store(element, DATA_NAME, s);

		return s;
    }


    static remove(element: BaseElem, plugin?: Modal) {

        $be(element).each((elem) => {

            const s: Modal = plugin || Store(elem, DATA_NAME);
            const params = s.params;
            const { backdrop, closeBtn } = s.modalObj;

            s.modalObj.show && s.modalObj.close();
            $be(s.element).off(`${s.params.enableEvent}.${s.modalEvent}` as EventName);
            $be(closeBtn).off(`click.${s.modalEvent}Dismiss`);
            if (params.backDropClose) $be(backdrop).off(`click.${s.modalEvent}Dismiss`);
            $be(document).off([`keydown.${s.modalEvent}Dismiss`,`[${s.modalEvent}Dismiss]`]);
            $be(window).off([`popstate.${s.modalEvent}`,`[${s.modalEvent}]`]);
            
            Store(elem, DATA_NAME, null);
        });
    }

    handleEvents() {
        const s = this;

        $be(s.element).on(`${s.params.enableEvent}.${s.modalEvent}` as EventName, (e) => {
            s.setDisplayAndEvents();
            e.preventDefault();
        });
    }

    setDisplayAndEvents() {

        const s = this;

        s.enableModal();

        $be(document).on(`keydown.${s.modalEvent}Dismiss`, function (e) {
            const ekey = e.code || e.originalEvent.key; //cash-dom || jquery
            if (ekey === 'Escape') {
                s.close();
                e.preventDefault();
            }
        });

        $be(document).on(`[${s.modalEvent}Dismiss]`, s.close);
    }

    getModalObj() {
        const { make } = bes;
        const 
            s               = this,
            p               = s.params,
            rootCss         = p.cssPrefix + (p.modalCss ? ' ' + p.modalCss : ''),
            ariaLabelledby  = (p.ariaLabelledby || s.element.dataset.ariaLabelledby) || null,
            modal           = make(`div.${rootCss}`, {
                                    id: s.modalID,
                                    ariaLabel: (p.ariaLabel || s.element.dataset.ariaLabel) || null 
                                }),
            closeBtn        = make(`button.${p.cssPrefix}__btn-dismiss`, { 
                                    type: 'button', 
                                    ariaLabel: p.closeBtnLabel 
                                }, `<i class="${p.closeBtnIconCss}"></i>`),
            dialogContent   = make(`div.${p.cssPrefix}__dialog-content`),
            dialog          = make(`div.${p.cssPrefix}__dialog`),
            backdrop        = make(`div.${p.cssPrefix}__backdrop`),
            $content        = $be(
                s.params.src || 
                (<HTMLAnchorElement>s.element).hash || 
                s.element.dataset.modalSrc
            )
        ;
        
        // typescript doesn't like setting this in the object above
        modal.setAttribute('aria-labelledby',ariaLabelledby);
        
        $be(dialog).insert([closeBtn, dialogContent]);
        $be(modal).insert([backdrop, dialog]);

        const modalObj: ModalObj = { 
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

        return modalObj;
    }

    enableModal() {

        const s = this;
        const { backdrop, closeBtn, content, modal } = s.modalObj;
        const p = s.params;
        const $modal = $be(modal);

        s.enabledElem = document.activeElement;
        
        if (p.fromDOM) {
            $be(content).insert(
                bes.make(`span.${p.cssPrefix}-content-placemarker`, {id: `${s.modalObj.id}_marker`}),
                'after'
            );
        }

        if (!s.modalObj.contentAppended) {
             
            $be(s.modalObj.dialogContent).insert(content);
            Object.assign(s.modalObj, { contentAppended: true });
        } 

        $be(p.appendTo).insert(modal);

        // attach events after appended to DOM
        $be(closeBtn).on(`click.${s.modalEvent}Dismiss`, () => s.close());
        if (p.backDropClose) $be(backdrop).on(`click.${s.modalEvent}Dismiss`, () => s.close());

        hasCb(p.onOpen, s.modalObj);

        if (!s.openedOnce) {
            hasCb(p.onOpenOnce, s.modalObj);
            s.openedOnce = true;
        }

        $be(modal).attr({
            role: 'dialog',
            'aria-modal': 'true'
        })

        reflow(modal);
        
        setTimeout(() => {
            $modal.addClass(p.cssPrefix + '--show');
            Object.assign(s.modalObj, { show: true });
        },0);

        if (p.focusInDelay !== null) {
            setTimeout(() => {
                s.trappedFocus = trapFocus($modal, { nameSpace: camelCase(s.modalID) });
            }, p.focusInDelay);
        }

        $be(p.appendTo).addClass(p.cssPrefix + '-open').css({
            overflow: 'hidden',
            paddingRight: '0px'
        });

        if (p.urlFilterType !== 'none') {
            UrlState.set(p.urlFilterType, p.locationFilter, s.modalID, p.historyType);
        }
       
    }

    close() {

        const s = this;
        const { backdrop, closeBtn, content, modal } = s.modalObj;
        const p = s.params;

        const $modal = $be(modal);
        
        
        hasCb(p.onClose, s.modalObj);

        $modal.addClass(p.cssPrefix + '--dismissing');
        $modal.rmClass(p.cssPrefix + '--show');

        // detach events
        $be(closeBtn).off(`click.${s.modalEvent}Dismiss`);

        if (p.backDropClose) $be(backdrop).off(`click.${s.modalEvent}Dismiss`);
        
        $be(document)
            .off([
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
            }).rmClass(p.cssPrefix + '--dismissing').css({
                display: ''
            });

            $be(p.appendTo).rmClass(p.cssPrefix + '-open').css({
                overflow: null,
                paddingRight: null
            });

            if (p.focusInDelay !== null) {
                s.trappedFocus.remove();
            }

            if (s.enabledElem && s.enabledElem instanceof HTMLElement) {
                s.enabledElem.focus();
            }

            if (p.fromDOM) {
                $be('#' + s.modalObj.id + '_marker').insert(content, 'after').remove();
                Object.assign(s.modalObj, { contentAppended: false });
            }

            hasCb(p.afterClose, s.modalObj);
            $modal.remove();
            Object.assign(s.modalObj, { show: false });

        }, p.closeOutDelay);
    }

    loadFromUrl() {
        const s = this;
        const p = s.params;

        if (p.locationFilter !== null && p.loadLocation && p.urlFilterType !== 'none') {
			 
            const filterEl = UrlState.get(p.urlFilterType, p.locationFilter);

            if (filterEl === s.modalID) {
                s.modalObj.show ? s.close() : s.setDisplayAndEvents();
            }
        }
    }
}

export interface ModalPlugin {
    modal(options: IModalOptions | StringPluginArgChoices): BaseElem;
}
 
declare module 'base-elem-js' {
    interface BaseElem extends ModalPlugin {}
}