import { elData } from "./util/store";
import validJSONFromString from './util/formatting-valid-json';
import { KEYS } from "./util/constants";
import { isMobileOS } from "./util/helpers";
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role


const VERSION = "1.0.0";
const EVENT_NAME = 'selectEnhance';
const DATA_NAME = 'SelectEnhance';

// TODO
// Unwrap, remove event stuff
// refresh the list with a method

const DEFAULTS = {
    cssPrefix : 'select-enhance',
    mobileNative: true,
    blurDuration: 250,
    typeAheadDuration: 500
};

// wrap the select first
const mobileOS = isMobileOS();

// global private state props
let to = null,
    $currSelectEnhance = null,
    listPosTop = true,
    registerEventScroll = false,
    currSelectInstance = null
;
 

//TODO: clean-up of events in case needs re-inited

export default class SelectEnhance {


    static get version() {
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	static get defaults() {
		return DEFAULTS
	}

    constructor(element, options, index) {
		const _ = this;

        _.index = index; 
		_.$element = $(element);
        _.selectId = _.$element.attr('id') + '_enhance' || 'select_enhance_' + index;
        _.$selectEnhance = null;
        _.$enableBtn = null;
        _.$selectList = null;
        _.optionSet = new WeakMap();

		const dataOptions = validJSONFromString(
			$(element).data(DATA_NAME + '-options')
		);

		elData(
			element,
			`${DATA_NAME}_params`,
			$.extend(SelectEnhance.defaults, options, dataOptions)
		);
		_.params = elData(element, `${DATA_NAME}_params`);


         _.setUpSelectHtml();
      
        if (mobileOS && _.params.mobileNative) {
            return;
        }
      
        // 
        // attach events
        // 
    
        _.eventKeyboardSearch();
        _.eventShowOptions();
        _.eventOptionClick();
        _.eventFocuOut();
        _.eventArrowKeys();
        
        SelectEnhance.eventScrollGetListPosition();

		return this;
	}

    // Events 
    eventKeyboardSearch() {
        const _ = this;

        let keyInputTo = null,
            keyedInput = "",
            keyedFound = []
        ;

        _.$selectEnhance.on('keydown.' + EVENT_NAME, function (e) {
            const keyCurr = (e.key.length === 1 ? e.key : '');
            
            keyedInput+= keyCurr;
            
            clearTimeout(keyInputTo);
            keyInputTo = setTimeout(() => {
                keyedInput = "";
            }, _.params.typeAheadDuration);

            if (keyedInput.trim()) {

                const rgx = RegExp('^' + keyedInput.trim(), 'i');
            
                keyedFound = [].slice.call(
                    _.$element.find('option').filter((i, el) => rgx.test(el.text) === true)
                );

                if (keyedFound.length){
                    keyedFound[0].selected = true;
                    
                    _.setSelectionState(_.optionSet.get(keyedFound[0]));
                } 
            }
        });
    }

    eventShowOptions(){
        const _ = this;
        
        _.$selectEnhance.on('click.' + EVENT_NAME, '.' + _.params.cssPrefix + '__enable-btn', function (e) {

            _.$selectEnhance.toggleClass(_.params.cssPrefix + '--focused')
                .attr({'aria-expanded' : true});

            $currSelectEnhance = _.$selectEnhance;
            currSelectInstance = _;

            SelectEnhance.getListPosition();
        });
    }

    blurSelect() {
        const _ = this;

        _.$selectEnhance.addClass(_.params.cssPrefix + '--blurring');

        setTimeout(() => {
            _.$selectEnhance.removeClass(_.params.cssPrefix + '--blurring');
        }, _.params.blurDuration);
    }

    setSelectionState($btn) {
        const _ = this;

         // update the selected
         _.$selectEnhance
            .find('button[aria-selected]')
            .attr({ 'aria-selected': null});
            
        $btn.attr({ 'aria-selected': true });
        _.$selectList.attr({ 'aria-activedescendant': $btn[0].id});

        _.$element[0].dispatchEvent(new (Event || IE_Event)('change'));
        _.$enableBtn.text($btn.text())[0].focus();
        
        _.blurSelect();

        $currSelectEnhance = null;
        currSelectInstance = null;
    }

    eventOptionClick(){
        const _ = this;

        _.$selectEnhance.on('click.' + EVENT_NAME, '.' + _.params.cssPrefix + '__list-btn', function (e) {
            e.preventDefault();//stop Marketo from being Marketo     
            
            _.$element.val(_.optionSet.get(this).value);
            _.$selectEnhance
                .attr({'aria-expanded': false})
                .removeClass(_.params.cssPrefix + '--focused');

            _.setSelectionState($(this))
        });
    }

    eventFocuOut(){
        const _ = this;

        _.$selectEnhance.on('focusout.' + EVENT_NAME, function (e) {
            // in setTimeout because the activeElement is temporarily
            // given back to the document.body it seems
            setTimeout(() => {

                if (!$(this).has(document.activeElement).length) {
                    _.blurSelect();

                    $(this).removeClass(_.params.cssPrefix + '--focused')
                        .attr({'aria-expanded': false});
                    $currSelectEnhance = null;
                    currSelectInstance = null;
                }

            }, 100);
        });
    }

    eventArrowKeys() {

        const _ = this;
        
        _.$selectEnhance.on('keydown.' + EVENT_NAME, function (e) {

            if (e.key === KEYS.DOWN) {
                e.preventDefault();
                setTimeout(() => { _.nextOptionButton('next') }, 100);
            }

            if (e.key === KEYS.UP) {
                e.preventDefault();
                setTimeout(() => { _.nextOptionButton('prev') }, 100);
            }

            if (e.key === KEYS.ESC && $currSelectEnhance) {

                $currSelectEnhance.removeClass(_.params.cssPrefix + '--focused');
                $currSelectEnhance.attr({'aria-expanded': false})
                _.$enableBtn[0].focus();

                $currSelectEnhance = null;
                currSelectInstance = null;
            }
        });
    }

    //  build the HTML for it

    setUpSelectHtml() {
        const _ = this;

        _.$element.each(function () {
            _.$selectEnhance = $('<div />').attr({ 
                class: _.params.cssPrefix, 
                role: "combobox", 
                'aria-expanded' : false,
                'aria-owns': _.selectId + '_listbox',
                'aria-haspopup': 'listbox',
                id: _.selectId + '_combobox'
            });

            _.$enableBtn =  $('<button>').attr({ 
                type: 'button', 
                class: _.params.cssPrefix + '__enable-btn',
                role: "textbox",
                'aria-controls': _.selectId + '_listbox',
                id: _.selectId + '_input'
            });

            _.$element.wrap(_.$selectEnhance);

            if (mobileOS && _.params.mobileNative) {
                // exit if its a mobile device after wrapping for styling
                return;
            }
            
            _.$selectEnhance.append(_.$enableBtn);
            _.$element.attr({ tabindex: '-1', 'aria-hidden': true });


            SelectEnhance.buildOptionsList(_);
        })
    }


    static buildOptionsList(_) {

        const { cssPrefix } = _.params;

        const optGroup = _.$element[0].getElementsByTagName('optgroup');
        const hasOptGroup = !!optGroup.length;
        const $optGroupWm = new WeakMap();

        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];

                $optGroupWm.set(group, $('<div/>').attr({
                    class: cssPrefix + '__optgroup',
                    role:'group', 
                    label: group.label || ""
                }));
            }
        }
        
        const options = _.$element[0].getElementsByTagName('option');
        _.$selectList = $('<div>').attr({ 
            class: cssPrefix + '__list', 
            role: 'listbox',
            id: _.selectId + '_listbox',
            'aria-labelledby': 'Lbl' + _.selectId || ''
        });

        const optId = _.selectId || 'select_' + index;
       

        for (let i = 0, l = options.length; i < l; i++) {
            const opt = options[i];
            const id = optId + i;

            const attrs = {
                role: 'option', id,
                'aria-selected': opt.selected ? 'true' : null,
                title: opt.value,
                class: cssPrefix + '__list-btn'
            };
            const $btn = $('<button/>').attr(attrs).text(opt.textContent);
            
            _.optionSet.set($btn[0], opt);
            _.optionSet.set(opt, $btn);
            // append to list or optgroup

            hasOptGroup && opt.parentElement.nodeName.toUpperCase() === 'OPTGROUP' ? 
                $optGroupWm.get(opt.parentElement).append($btn) : 
                _.$selectList.append($btn)
            ;

            if (opt.selected) {
                _.$selectList.attr({ 'aria-activedescendant': id });
                _.$enableBtn.text(opt.textContent);  
            }
        }

        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];
                _.$selectList.append($optGroupWm.get(group))
            }
        }  
        
        _.$selectEnhance.append(_.$selectList);
    }


    // helpers

    nextOptionButton(dir) {

        const _ = this;
        const ae = document.activeElement;
        const $btnList = _.$selectList.find('button');
        const l = $btnList.length;

        if (_.$enableBtn[0].isSameNode(ae)) {
            $btnList.eq(dir === 'next' ? 0 : l - 1)[0].focus();
            return;
        }
 
        for (let i = 0; i < l; i++) {
            const el = $btnList[i];

            if (ae.isSameNode(el)) {

                if (dir === 'next') {

                    const isLast = i === l - 1;
                    $btnList.eq(isLast ? 0 : i + 1)[0].focus();
                } else {
                    const isFirst = i === 0;
                    $btnList.eq(isFirst ? l - 1 : i - 1)[0].focus();
                }

                break;
            }
        }
    }

    static eventScrollGetListPosition() {

        if (!registerEventScroll) {
            $(window).on('scroll.' + EVENT_NAME, () => {
                to && clearTimeout(to);

                to = setTimeout(SelectEnhance.getListPosition, 100);
            });

            registerEventScroll = true;
        }
    }

    static getListPosition() {
        const _ = currSelectInstance;
        if (_?.$selectEnhance) {
          
            const selWrapPosTop = _.$selectEnhance.offset().top;
            const selListHeight = _.$selectList.height();

            const listPosAndHeight = _.$selectEnhance.offset().top + 
                _.$selectEnhance.height() + 
                selListHeight
            ;
            const winPosAndHeight = window.scrollY + $(window).height();

            if (listPosAndHeight > winPosAndHeight && selWrapPosTop > selListHeight) {
                _.$selectEnhance.addClass(_.params.cssPrefix + '--pos-bottom');
                listPosTop = false;

            } else {
                _.$selectEnhance.removeClass(_.params.cssPrefix + '--pos-bottom');

                listPosTop = true;
            }
        }
    }

    static refreshOptions(element) {
        $(element).each(function () {
            const instance = elData(this, `${DATA_NAME}_instance`);    
          
            if (instance) {

                instance.$selectList.remove();
                instance.optionSet = new WeakMap();
                SelectEnhance.buildOptionsList(instance);
            } else {
                console.warn(`No instance of a selectbox`, element);
            }
        });
    }

    static remove(element) {

		$(element).each(function () {
			const instance = elData(this, `${DATA_NAME}_instance`);
            
            instance.$selectEnhance.off('keydown.' + EVENT_NAME);
            instance.$selectEnhance.off('click.' + EVENT_NAME);
            instance.$selectEnhance.off('focusout.' + EVENT_NAME);
            // the window event will just stay
            instance.$element.insertAfter(instance.$selectEnhance);
            instance.$element.attr({tabindex: null, 'aria-hidden': null});
            instance.$selectEnhance.remove();

			elData(this, `${DATA_NAME}_params`, null, true);
			elData(this, `${DATA_NAME}_instance`, null, true);
		});
	}
    
}


function IE_Event(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
}


