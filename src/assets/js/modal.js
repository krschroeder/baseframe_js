import validJSONFromString from './util/formatting-valid-json';
import { elData } from './util/store';
import trapFocus from './util/trap-focus';
 
import { CSS_TRANSISTION_DELAY } from './util/constants';

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
            fromDOM: true,
            onOpen: () => {},
            afterClose: () => {}
        };
    }

    static remove(element) {

		$(element).each(function () {
			const instance = elData(this, `${DATA_NAME}_instance`);
			const params = elData(this, `${DATA_NAME}_params`);

            // TODO

			elData(this, `${DATA_NAME}_params`, null, true);
			elData(this, `${DATA_NAME}_instance`, null, true);
		});
	}

    constructor(element, options, index) {
        const _ = this;
        
        _.$element = $(element);
        _.index = index;

        const dataOptions = validJSONFromString(
            $(element).data(DATA_NAME + '-options')
        );
       
        elData(
            element,
            `${DATA_NAME}_params`,
            $.extend({}, Modal.defaults, options, dataOptions)
        );


        _.params = elData(element, `${DATA_NAME}_params`);
        _.modalObj = null;
        // state
        _.trappedFocus = null;
        _.enabledElem = null;
         
        _.modalEvents();

        return this;
    }

    enableModal($content) {
        
        const _ = this,
            modalObj = _.getModalObj(),
            {$backdrop, $closeBtn, $modal} = modalObj,
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
        $closeBtn.on(`click.${EVENT_NAME}Dismiss`, () => disableModal($content));
        if (backDropClose) $backdrop.on(`click.${EVENT_NAME}Dismiss`, () => disableModal($content));

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

    disableModal($content) {
        
        const _ = this,
            modalObj = _.getModalObj(),
            {$backdrop, $closeBtn, $modal} = modalObj,
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


    getModalObj(elem) {
        
        const _ = this;

        if (!_.modalObj) {
            const
                modalId = 'modal_' + (_.params.src || elem.href || elem.dataset.modalSrc).replace('#', ''),
                modalAttr = {
                    class: 'modal' + (_.params.modalCss ? ' ' + _.params.modalCss : ''),
                    'aria-label': (_.params.ariaLabel || elem.dataset.ariaLabel) || null,
                    'aria-labelledby': (_.params.ariaLabelledby || elem.dataset.ariaLabelledby) || null,
                    id: modalId
                },
                closeBtnAttrs = { class: 'modal__btn-dismiss', type: 'button', 'aria-label': 'Close' },
                $closeBtn = $('<button>').attr(closeBtnAttrs).append('<i class="ico i-close"></i>'),
                $dialogContent = $('<div/>').attr({ class: 'modal__dialog-content' }),
                $dialog = $('<div/>').attr({ class: 'modal__dialog' }).append($closeBtn, $dialogContent),
                $backdrop = $('<div/>').attr({ class: 'modal__backdrop' }),
                $modal = $('<div/>').attr(modalAttr).append($backdrop, $dialog);
            ;

            _.modalObj = { 
                $modal, 
                $dialog,
                $dialogContent, 
                $backdrop, 
                $closeBtn, 
                id: modalId, 
                show: false,
                contentAppended: false
            };
        }

        return _.modalObj; 
    }

    // main

    modalEvents() {
        
        const _ = this;
        const modalObj = _.getModalObj();

        _.$element.on(`click.${EVENT_NAME}`, function (e) { 
            
            const $content = $(_.params.src || this.hash || this.dataset.modalSrc);

            if (!modalObj.show) {

                _.enableModal($content);        
            }

            $(document).on(`keydown.${EVENT_NAME}Dismiss`, function (e) {
                if (e.code == 'Escape') {
                    _.disableModal($content);
                }
            });

            $(document).on(`${EVENT_NAME}Dismiss`, () => {
                _.disableModal($content);
            });
            
            e.preventDefault();
        });
    }
}
