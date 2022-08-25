import validJSONFromString from './util/formatting-valid-json';
import { elData } from './util/store';
import trapFocus from './util/trap-focus';
import generateGUID from './util/guid-generate.js';
import getType, { camelCase, transitionElem } from './util/helpers';
import { getHashParam } from './util/get-param'
import updateHistoryEntry from './util/plugin/update-history-state';
import { noop } from './util/helpers';


const VERSION = '1.1.0';
const EVENT_NAME = 'modal';
const DATA_NAME = 'Modal';
const DEFAULTS = {
    enableEvent: 'click',
    appendTo: document.body,
    ariaLabelledby: null,
    ariaLabel: null,
    cssPrefix: 'modal',
    closeBtnIconCss: 'ico i-close',
    closeOutDelay: 250,
    backDropClose: true,
    fromDOM: true,
    modalCss: null,
    modalID: null,
    src: null,
    useHashFilter: null,
    loadLocationHash: true,
    useLocationHash: true,
    onOpenOnce: noop,
    onOpen: noop,
    afterClose: noop
};

const hasCb = (cb, modalObj) => {
    if (cb && typeof cb === 'function') {
        cb(modalObj);
    }
}

export default class Modal {

    static get version() {
        return VERSION;
    }

    static get pluginName() {
        return DATA_NAME;
    }

    static remove(element) {

        $(element).each(function () {

            const
                _ = elData(this, `${DATA_NAME}_instance`),
                params = elData(this, `${DATA_NAME}_params`),
                { $backdrop, $closeBtn } = _.modalObj
                ;

            _.modalObj.show && disableModal();
            $(_.element).off(`${_.params.enableEvent}.${_.modalEvent}`);
            $closeBtn.off(`click.${_.modalEvent}Dismiss`);
            if (params.backDropClose) $backdrop.off(`click.${_.modalEvent}Dismiss`);
            $(document)
                .off(`keydown.${_.modalEvent}Dismiss`)
                .off(`${_.modalEvent}Dismiss`);
            $(window).off(`popstate.${_.modalEvent} ${_.modalEvent}`);
            elData(this, `${DATA_NAME}_params`, null, true);
            elData(this, `${DATA_NAME}_instance`, null, true);
        });
    }

    constructor($element, options) {
        const _ = this;

        _.element = $element[0];

        const dataOptions = validJSONFromString($element.data(DATA_NAME + '-options'));
        const instanceOptions = $.extend({}, Modal.defaults, options, dataOptions);

        elData($element, `${DATA_NAME}_params`, instanceOptions);

        _.params = elData($element, `${DATA_NAME}_params`);

        if (!_.params.modalID) {
            let idPartIfParamSrc, autoGen = false;

            if (_.params.src && getType(_.params.src) !== 'string') {
                idPartIfParamSrc = generateGUID();
                autoGen = true;
            }

            _.modalID = (
                _.element.hash || 
                _.element.dataset.modalSrc ||
                (autoGen && idPartIfParamSrc)
            ).replace('#', '');

            if (_.params.useLocationHash && autoGen) {
                console.warn('If loading from a location hash please make sure to specify an ID not auto generated. This won\'t work should the page get reloaded.');
            }
        } else {
            _.modalID = _.params.modalID;
        }

        _.modalObj = _.getModalObj();
        _.modalEvent = EVENT_NAME + '_' + _.modalID;
        _.trappedFocus = null;
        _.enabledElem = null;
        _.openedOnce = false;
        
        _.clickEnable();
        _.loadLocationHash();

        return this;
    }

    clickEnable() {
        const _ = this;

        $(_.element).on(`${_.params.enableEvent}.${_.modalEvent}`, function (e) {
            _.setDisplayAndEvents();
            e.preventDefault();
        });
    }

    setDisplayAndEvents() {

        const _ = this;

        _.enableModal();

        $(document).on(`keydown.${_.modalEvent}Dismiss`, function (e) {
            const ekey = e.code || e.originalEvent.key; //cash-dom || jquery
            if (ekey === 'Escape') {
                _.disableModal();
                e.preventDefault();
            }
        });

        $(document).on(`${_.modalEvent}Dismiss`, _.disableModal);
    }

    getModalObj() {

        const
            _ = this,
            { ariaLabel, ariaLabelledby, closeBtnIconCss, modalCss } = _.params,
            modalID = _.modalID,
            modalAttr = {
                class: 'modal' + (modalCss ? ' ' + modalCss : ''),
                'aria-label': (ariaLabel || _.element.dataset.ariaLabel) || null,
                'aria-labelledby': (ariaLabelledby || _.element.dataset.ariaLabelledby) || null,
                id: modalID
            },
            closeBtnAttrs = { class: 'modal__btn-dismiss', type: 'button', 'aria-label': 'Close' },
            $closeBtn = $('<button>').attr(closeBtnAttrs).append(`<i class="${closeBtnIconCss}"></i>`),
            $dialogContent = $('<div/>').attr({ class: 'modal__dialog-content' }),
            $dialog = $('<div/>').attr({ class: 'modal__dialog' }).append($closeBtn, $dialogContent),
            $backdrop = $('<div/>').attr({ class: 'modal__backdrop' }),
            $modal = $('<div/>').attr(modalAttr).append($backdrop, $dialog),
            $content = $(_.params.src || _.element.hash || _.element.dataset.modalSrc)
            ;

        return {
            $backdrop,
            $content,
            contentAppended: false,
            $dialog,
            $dialogContent,
            $closeBtn,
            id: modalID,
            $modal,
            disableModal: () => _.disableModal(),
            show: false
        };
    }

    enableModal() {

        const _ = this,
            { $backdrop, $closeBtn, $content, $modal } = _.modalObj,
            { appendTo, backDropClose, cssPrefix, fromDOM, onOpen, onOpenOnce } = _.params
            ;

        _.enabledElem = document.activeElement;

        if (fromDOM) {
            $content.after(
                $('<span/>').attr({
                    class: cssPrefix + '-content-placemarker',
                    id: _.modalObj.id + '_marker'
                })
            );
        }

        if (!_.modalObj.contentAppended) {

            _.modalObj.$dialogContent.append($content);
            $.extend(_.modalObj, { contentAppended: true });
        }

        $(appendTo).append($modal);

        // attach events after appended to DOM
        $closeBtn.on(`click.${_.modalEvent}Dismiss`, () => _.disableModal());
        if (backDropClose) $backdrop.on(`click.${_.modalEvent}Dismiss`, () => _.disableModal());

        hasCb(onOpen, _.modalObj);

        if (!_.openedOnce) {
            hasCb(onOpenOnce, _.modalObj);
            _.openedOnce = true;
        }

        $modal.attr({
            role: 'dialog',
            'aria-modal': 'true'
        })

        transitionElem(() => {
            $modal.addClass(cssPrefix + '--show');

            _.trappedFocus = trapFocus($modal, { nameSpace: camelCase(_.modalID) });
            $.extend(_.modalObj, { show: true });
        });


        $(document.body).addClass(cssPrefix + '-open').css({
            overflow: 'hidden',
            'padding-right': '0px'
        });

        updateHistoryEntry(_, _.modalID);
    }

    disableModal() {

        const _ = this,
            { $backdrop, $closeBtn, $content, $modal } = _.modalObj,
            { afterClose, backDropClose, cssPrefix, closeOutDelay, fromDOM, onClose } = _.params
            ;

        hasCb(onClose, _.modalObj);

        $modal.addClass(cssPrefix + '--dismissing');
        $modal.removeClass(cssPrefix + '--show');

        // detach events
        $closeBtn.off(`click.${_.modalEvent}Dismiss`);

        if (backDropClose) $backdrop.off(`click.${_.modalEvent}Dismiss`);
        
        $(document)
            .off(`keydown.${_.modalEvent}Dismiss`)
            .off(`${_.modalEvent}Dismiss`);

        updateHistoryEntry(_, _.modalID, true);

        transitionElem(() => {
            $modal.attr({
                role: 'dialog',
                'aria-modal': ''
            }).removeClass(cssPrefix + '--dismissing').css({
                display: ''
            });

            $(document.body).removeClass(cssPrefix + '-open').css({
                overflow: '',
                'padding-right': ''
            });

            _.trappedFocus.remove();
            _.enabledElem.focus();

            if (fromDOM) {
                $('#' + _.modalObj.id + '_marker').after($content).remove();
                $.extend(_.modalObj, { contentAppended: false });
            }

            hasCb(afterClose, _.modalObj);
            $modal.remove();
            $.extend(_.modalObj, { show: false });

        }, closeOutDelay);
    }

    loadLocationHash() {
        const _ = this;
        const { useLocationHash, loadLocationHash, useHashFilter } = _.params;

        const loadIfHashMatches = () => {

            if (useLocationHash || loadLocationHash) {
                const hash = getHashParam(useHashFilter) || location.hash.replace(/#/g, '');
                if (useHashFilter && _.modalObj.id === hash) {
                    _.modalObj.show ? _.disableModal() : _.setDisplayAndEvents();
                }
            }
        }

        loadIfHashMatches();

        $(window).on(`popstate.${_.modalEvent} ${_.modalEvent}`, (e) => {
            if (_.params.historyType === 'push') {
                loadIfHashMatches();
                e.preventDefault();
            }
        });
    }
}

Modal.defaults = DEFAULTS;