import validJSONFromString from './util/formatting-valid-json';
import { elData } from './util/store';
import trapFocus from './util/trap-focus';
import generateGUID from './util/guid-generate.js';
import { CSS_TRANSISTION_DELAY } from './util/constants';
import getType from './util/helpers';
import { getHashParam } from './util/get-param'
import updateHistoryEntry from './util/plugin/update-history-state';


const VERSION = '1.0.0';
const EVENT_NAME = 'modal';
const DATA_NAME = 'Modal';

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

    static get defaults() {
        return {
            cssPrefix: 'modal',
            closeOutDelay: 250,
            backDropClose: true,
            modalCss: null,
            ariaLabelledby: null,
            ariaLabel: null,
            appendTo: document.body,
            src: null,
            modalID: null,
            fromDOM: true,
            useHashFilter: null,
            loadLocationHash: true,
			useLocationHash: true,
			historyType: 'replace',
            onOpen: () => {},
            afterClose: () => {}
        };
    }

    static remove(element) {

		$(element).each(function () {

			const 
                instance = elData(this, `${DATA_NAME}_instance`),
			    params = elData(this, `${DATA_NAME}_params`),
                modalObj = instance.getModalObj(),
                {$backdrop, $closeBtn} = modalObj
            ;
            
            $closeBtn.off(`click.${EVENT_NAME}Dismiss`);
            if (params.backDropClose) $backdrop.off(`click.${EVENT_NAME}Dismiss`);
            $(document)
                .off(`keydown.${EVENT_NAME}Dismiss`)
                .off(`${EVENT_NAME}Dismiss`);

			elData(this, `${DATA_NAME}_params`, null, true);
			elData(this, `${DATA_NAME}_instance`, null, true);
		});
	}

    constructor($element, options) {
        const _ = this;
        
        _.element = $element[0];

        const dataOptions = validJSONFromString(
            $element.data(DATA_NAME + '-options')
        );
       
        elData(
            $element,
            `${DATA_NAME}_params`,
            $.extend({}, Modal.defaults, options, dataOptions)
        );

        _.params = elData($element, `${DATA_NAME}_params`);
        _.modalObj = null;
        // state
        _.trappedFocus = null;
        _.enabledElem = null;

        if (!_.params.modalID) {
            let idPartIfParamSrc, autoGen = false;

            if (_.params.src && getType(src) !== 'string') {
                idPartIfParamSrc = generateGUID();
                autoGen = true;
            } 
            
            _.params.modalID = 'modal_' + (idPartIfParamSrc || _.element.hash || _.element.dataset.modalSrc).replace('#', '');

            if (_.params.useLocationHash && autoGen) {
                console.warn('If loading from a location hash please make sure to specify an ID not auto generated. This won\'t work should the page get reloaded.');
            }
        }
         
        _.clickEnable();
        _.loadLocationHash();

        return this;
    }

    getModalObj() {
        
        const _ = this;
        const {ariaLabel, ariaLabelledby, modalCss} = _.params;

        if (!_.modalObj) {

            const
                // just a few conditionals here
                modalID = _.params.modalID,
                modalAttr = {
                    class: 'modal' + (modalCss ? ' ' + modalCss : ''),
                    'aria-label': (ariaLabel || _.element.dataset.ariaLabel) || null,
                    'aria-labelledby': (ariaLabelledby || _.element.dataset.ariaLabelledby) || null,
                    id: modalID
                },
                closeBtnAttrs = { class: 'modal__btn-dismiss', type: 'button', 'aria-label': 'Close' },
                $closeBtn = $('<button>').attr(closeBtnAttrs).append('<i class="ico i-close"></i>'),
                $dialogContent = $('<div/>').attr({ class: 'modal__dialog-content' }),
                $dialog = $('<div/>').attr({ class: 'modal__dialog' }).append($closeBtn, $dialogContent),
                $backdrop = $('<div/>').attr({ class: 'modal__backdrop' }),
                $modal = $('<div/>').attr(modalAttr).append($backdrop, $dialog),
                $content = $(_.params.src || _.element.hash || _.element.dataset.modalSrc)
            ;

            _.modalObj = { 
                $backdrop,
                $content, 
                contentAppended: false,
                $dialog,
                $dialogContent, 
                $closeBtn, 
                id: modalID, 
                $modal, 
                show: false
            };
        }

        return _.modalObj; 
    }

    enableModal() {
        
        const _ = this,
            modalObj = _.getModalObj(),
            {$backdrop, $closeBtn, $content, $modal} = modalObj,
            {appendTo, backDropClose, cssPrefix, fromDOM, onOpen} = _.params
        ;

        _.enabledElem = document.activeElement;
        
        if (fromDOM) {
            $content.after(
                $('<span/>').attr({ 
                    class: cssPrefix + '-content-placemarker', 
                    id: modalObj.id + '_marker' 
                })
            );
        }
    
        if (!modalObj.contentAppended) {
    
            modalObj.$dialogContent.append($content);
            $.extend(modalObj, {contentAppended: true});
        }
    
        $(appendTo).append($modal);
        
        // attach events after appended to DOM
        $closeBtn.on(`click.${EVENT_NAME}Dismiss`, () => _.disableModal());
        if (backDropClose) $backdrop.on(`click.${EVENT_NAME}Dismiss`, () => _.disableModal());

        hasCb(onOpen, modalObj);
    
        $modal.attr({
            role: 'dialog',
            'aria-modal': 'true'
        })
    
        setTimeout(() => { 
            $modal.addClass(cssPrefix + '--show');
           
            _.trappedFocus = trapFocus($modal);
            $.extend(modalObj, {show: true});
        }, CSS_TRANSISTION_DELAY);
        
    
        $(document.body).addClass(cssPrefix + '-open').css({
            overflow: 'hidden',
            'padding-right': '0px'
        });
    
    
        $(window).trigger('modalEnabled');
    }

    disableModal() {
        
        const _ = this,
            modalObj = _.getModalObj(),
            {$backdrop, $closeBtn, $content, $modal} = modalObj,
            {afterClose, backDropClose, cssPrefix, closeOutDelay, fromDOM, onClose} = _.params
        ;

        hasCb(onClose, modalObj); 

        $modal.addClass(cssPrefix + '--dismissing');
        $modal.removeClass(cssPrefix + '--show'); 

        // detach events
        $closeBtn.off(`click.${EVENT_NAME}Dismiss`);
        if (backDropClose) $backdrop.off(`click.${EVENT_NAME}Dismiss`);
        $(document)
            .off(`keydown.${EVENT_NAME}Dismiss`)
            .off(`${EVENT_NAME}Dismiss`);
        
        setTimeout(() => {
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
                $('#' + modalObj.id + '_marker').after($content).remove();
                $.extend(modalObj, {contentAppended: false});
            }
            
            hasCb(afterClose, modalObj);
            $modal.remove();
            $.extend(modalObj, {show: false});

        }, CSS_TRANSISTION_DELAY + closeOutDelay);
    }

    clickEnable() {
        const _ = this;

        $(_.element).on(`click.${EVENT_NAME}`, function (e) { 
            _.setDisplayAndEvents();
            e.preventDefault();
        });
    }

    setDisplayAndEvents() {
        
        const _ = this;
        const modalObj = _.getModalObj();
        !modalObj.show && _.enableModal();
        
        $(document).on(`keydown.${EVENT_NAME}Dismiss`, function (e) {
            e.code == 'Escape' && _.disableModal();
            e.preventDefault();
        });

        $(document).on(`${EVENT_NAME}Dismiss`, _.disableModal);
    }

    loadLocationHash() {
        const _ = this;
        const modalObj = _.getModalObj();
        const { useLocationHash, loadLocationHash, useHashFilter } = _.params;

		if (useLocationHash || loadLocationHash) {
            const hash = getHashParam(useHashFilter) || location.hash.replace(/#/g, '');
            if (useHashFilter && modalObj.id === hash) {
                _.setDisplayAndEvents();
            }
		}
    }
}