import type { Cash, Selector } from "cash-dom";
import type { LocationHashTracking, StringPluginArgChoices } from './types';

import $ from 'cash-dom';

import Store from "./core/Store";
import UrlState from "./core/UrlState";
import trapFocus from './fn/trapFocus';
import { camelCase, getDataOptions } from './util/helpers';
import { noop } from './util/helpers';
import h from "./fn/hyperScript";

type ModalObj = {
    $backdrop: Cash;
    $content: Cash;
    contentAppended: boolean; //state
    $dialog: Cash //modal dialog
    $dialogContent: Cash // modal dialog content
    $closeBtn: Cash
    id: string,
    $modal: Cash, //outermost element
    close: () => void, //disable modal fn
    show: boolean //state
}

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


    constructor(element: HTMLAnchorElement | HTMLElement | HTMLButtonElement, options: IModalOptions | StringPluginArgChoices) {
        const s = this;

        s.element = element;

        const dataOptions = getDataOptions(element, EVENT_NAME);
        
        s.params = $.extend({}, Modal.defaults, options, dataOptions);
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

    static get version() {
        return VERSION;
    }

    static remove(element: Cash, plugin?: Modal) {

        $(element).each(function () {

            const s: Modal = plugin || Store(this, DATA_NAME);
            const params = s.params;
            const { $backdrop, $closeBtn } = s.modalObj;

            s.modalObj.show && s.modalObj.close();
            $(s.element).off(`${s.params.enableEvent}.${s.modalEvent}`);
            $closeBtn.off(`click.${s.modalEvent}Dismiss`);
            if (params.backDropClose) $backdrop.off(`click.${s.modalEvent}Dismiss`);
            $(document)
                .off(`keydown.${s.modalEvent}Dismiss`)
                .off(`${s.modalEvent}Dismiss`);
            $(window).off(`popstate.${s.modalEvent} ${s.modalEvent}`);
            
            Store(this, DATA_NAME, null);
        });
    }

    handleEvents() {
        const s = this;

        $(s.element).on(`${s.params.enableEvent}.${s.modalEvent}`, function (e) {
            s.setDisplayAndEvents();
            e.preventDefault();
        });
    }

    setDisplayAndEvents() {

        const s = this;

        s.enableModal();

        $(document).on(`keydown.${s.modalEvent}Dismiss`, function (e) {
            const ekey = e.code || e.originalEvent.key; //cash-dom || jquery
            if (ekey === 'Escape') {
                s.close();
                e.preventDefault();
            }
        });

        $(document).on(`${s.modalEvent}Dismiss`, s.close);
    }

    getModalObj() {

        const s = this,
            p = s.params,
            $closeBtn = h(`button.${p.cssPrefix}__btn-dismiss`, { 
                type: 'button', 
                'aria-label': p.closeBtnLabel 
            }).append(h(`i.${p.closeBtnIconCss}`)),
            $dialogContent = h(`div.${p.cssPrefix}__dialog-content`),
            $dialog = h(`div.${p.cssPrefix}__dialog`).append($closeBtn, $dialogContent),
            $backdrop = h(`div.${p.cssPrefix}__backdrop`),
            $modal = h(`div`,{
                class: p.cssPrefix + (p.modalCss ? ' ' + p.modalCss : ''),
                'aria-label': (p.ariaLabel || s.element.dataset.ariaLabel) || null,
                'aria-labelledby': (p.ariaLabelledby || s.element.dataset.ariaLabelledby) || null,
                id: s.modalID
            }).append($backdrop, $dialog),
            $content = $(s.params.src || (<HTMLAnchorElement>s.element).hash || s.element.dataset.modalSrc)
        ;

        return {
            $backdrop,
            $content,
            contentAppended: false,
            $dialog,
            $dialogContent,
            $closeBtn,
            id: s.modalID,
            $modal,
            close: () => s.close(),
            show: false
        };
    }

    enableModal() {

        const s = this;
        const { $backdrop, $closeBtn, $content, $modal } = s.modalObj;
        const p = s.params;

        s.enabledElem = document.activeElement;
        
        if (p.fromDOM) {
            $content.after(
                h(`span.${p.cssPrefix}-content-placemarker#${s.modalObj.id}_marker`)
            );
        }

        if (!s.modalObj.contentAppended) {

            s.modalObj.$dialogContent.append($content);
            $.extend(s.modalObj, { contentAppended: true });
        }

        $(p.appendTo).append($modal);

        // attach events after appended to DOM
        $closeBtn.on(`click.${s.modalEvent}Dismiss`, () => s.close());
        if (p.backDropClose) $backdrop.on(`click.${s.modalEvent}Dismiss`, () => s.close());

        hasCb(p.onOpen, s.modalObj);

        if (!s.openedOnce) {
            hasCb(p.onOpenOnce, s.modalObj);
            s.openedOnce = true;
        }

        $modal.attr({
            role: 'dialog',
            'aria-modal': 'true'
        })

        setTimeout(() => {
            $modal.addClass(p.cssPrefix + '--show');

            s.trappedFocus = trapFocus($modal, { nameSpace: camelCase(s.modalID) });
            $.extend(s.modalObj, { show: true });
        },0);


        $(document.body).addClass(p.cssPrefix + '-open').css({
            overflow: 'hidden',
            'padding-right': '0px'
        });

        UrlState.set(p.urlFilterType, p.locationFilter, s.modalID, p.historyType);
       
    }

    close() {

        const s = this;
        const { $backdrop, $closeBtn, $content, $modal } = s.modalObj;
        
        const p = s.params;
        
        hasCb(p.onClose, s.modalObj);

        $modal.addClass(p.cssPrefix + '--dismissing');
        $modal.removeClass(p.cssPrefix + '--show');

        // detach events
        $closeBtn.off(`click.${s.modalEvent}Dismiss`);

        if (p.backDropClose) $backdrop.off(`click.${s.modalEvent}Dismiss`);
        
        $(document)
            .off(`keydown.${s.modalEvent}Dismiss`)
            .off(`${s.modalEvent}Dismiss`);
        
        UrlState.set(p.urlFilterType, p.locationFilter, null, p.historyType);

        setTimeout(() => {
            $modal.attr({
                role: 'dialog',
                'aria-modal': ''
            }).removeClass(p.cssPrefix + '--dismissing').css({
                display: ''
            });

            $(document.body).removeClass(p.cssPrefix + '-open').css({
                overflow: '',
                'padding-right': ''
            });

            s.trappedFocus.remove();

            if (s.enabledElem && s.enabledElem instanceof HTMLElement) {
                s.enabledElem.focus();
            }

            if (p.fromDOM) {
                $('#' + s.modalObj.id + '_marker').after($content).remove();
                $.extend(s.modalObj, { contentAppended: false });
            }

            hasCb(p.afterClose, s.modalObj);
            $modal.remove();
            $.extend(s.modalObj, { show: false });

        }, p.closeOutDelay);
    }

    loadFromUrl() {
        const s = this;
        const p = s.params;

        if (p.locationFilter !== null || p.loadLocation) {
			 
            const filterEl = UrlState.get(p.urlFilterType, p.locationFilter);

            if (filterEl === s.modalID) {
                s.modalObj.show ? s.close() : s.setDisplayAndEvents();
            }
        }
    }
}


declare module 'cash-dom' {
    export interface Cash {
        modal(options: IModalOptions | StringPluginArgChoices): Cash;
    }
}