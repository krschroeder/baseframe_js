import { elData } from "./util/store";
import validJSONFromString from './util/formatting-valid-json';
import { KEYS } from "./util/constants";
import { isMobileOS, IE_Event } from "./util/helpers";
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role


const VERSION = "1.3.1";
const EVENT_NAME = 'selectEnhance';
const DATA_NAME = 'SelectEnhance';


const DEFAULTS = {
    cssPrefix : 'select-enhance',
    mobileNative: true,
    focusIn: (el) => {},
    focusOut: (el) => {},
    beforeChange: (el) => {},
    afterChange: (el) => {},
    blurDuration: 250,
    typeAheadDuration: 500,
    observeSelectbox: true
};

// wrap the select first
const mobileOS = isMobileOS();

// helper
const getSelectedOptNode = ($el) => $el.find('option').filter(function() {return this.selected})[0];

// global private state props
let to = null,
    $currSelectEnhance = null,
    listPosTop = true,
    registerEventScroll = false,
    currSelectInstance = null
;
 

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
        _.$label = $(`label[for="${_.$element.attr('id')}"]`);
        _.selectId = _.$element.attr('id') + '_enhance' || 'select_enhance_' + index;
        _.$selectEnhance = null;
        _.$enableBtn = null;
        _.$selectList = null;
        _.optionSet = new WeakMap();
        _.selectboxObserver = null;
        _.selectListBoxInFullView = true;

		const dataOptions = validJSONFromString(
			$(element).data(DATA_NAME + '-options')
		);

		elData(
			element,
			`${DATA_NAME}_params`,
			$.extend({}, SelectEnhance.defaults, options, dataOptions)
		);
		_.params = elData(element, `${DATA_NAME}_params`);


        _.setUpSelectHtml();
      
        if (mobileOS && _.params.mobileNative) {
            
            _.mobileOnlyIfNavite();
           
        } else {
      
            // 
            // attach events
            // 
            
            if (_.params.observeSelectbox) {
                _.selectInputMutationObserver();
            }
            _.eventLabelClick();
            _.eventKeyboardSearch();
            _.eventShowOptions();
            _.eventOptionClick();
            _.eventSelectToggle();
            _.eventArrowKeys();
            _.observeSelectListBoxInFullView();
            SelectEnhance.eventScrollGetListPosition();
        }

		return this;
	}

    mobileOnlyIfNavite() {
        const _ = this;

        let prevElSelectedVal =  getSelectedOptNode(_.$element);
        
            _.$element.on('mouseup.' + EVENT_NAME, 'option', function(e) {

            if (!this.isSameNode(prevElSelectedVal)) {
                _.params.beforeChange(_.$element);
            }

        }).on('change.' + EVENT_NAME, function(e) {
            _.params.afterChange(_.$element);
            prevElSelectedVal =  getSelectedOptNode(_.$element);
        }); 
    }

    // Events 

    blurSelect() {
        const _ = this;

        _.$selectEnhance.addClass(_.params.cssPrefix + '--blurring');
        _.$selectEnhance
            .removeClass(_.params.cssPrefix + '--focused')
            .attr({'aria-expanded': false});

        setTimeout(() => {
            _.$selectEnhance.removeClass(_.params.cssPrefix + '--blurring');

            $currSelectEnhance = null;
            currSelectInstance = null;

        }, _.params.blurDuration);
    }

    setSelectionState($btn, doBlur = true) {
        const _ = this;

        _.params.beforeChange(_.$element);

        _.optionSet.get($btn[0]).selected = true;

        _.params.afterChange(_.$element);

         // update the selected
         _.$selectEnhance
            .find('button[aria-selected]')
            .attr({ 'aria-selected': null});
            
        $btn.attr({ 'aria-selected': true });
        _.$selectList.attr({ 'aria-activedescendant': $btn[0].id});

        _.$element[0].dispatchEvent(new (Event || IE_Event)('change'));

        if (doBlur) {

            _.$enableBtn.text($btn.text())[0].focus();
            _.blurSelect();

        } else {
            $btn[0].focus();
        }   
    }

    eventLabelClick() {
        const _ = this;

        _.$label.on('click.' + EVENT_NAME, function(e){
            e.preventDefault();
            if (!_.$element[0].disabled) {
                _.$enableBtn[0].focus();
            }
        })
    }

    eventShowOptions(){
        const _ = this;
       
        _.$selectEnhance.on('click.' + EVENT_NAME, '.' + _.params.cssPrefix + '__enable-btn', function (e) {
            if (_.$element[0].disabled) { return }

            _.$selectEnhance.toggleClass(_.params.cssPrefix + '--focused')
                .attr({'aria-expanded' : true});
            
            const $selectedBtn = _.$selectEnhance.find('button[aria-selected]');

            if ($selectedBtn.length) {
                $selectedBtn[0].focus();
            }

            $currSelectEnhance = _.$selectEnhance;
            currSelectInstance = _;

            SelectEnhance.getListPosition();
           
        });
    }

    eventOptionClick(){
        const _ = this;

        _.$selectEnhance.on('click.' + EVENT_NAME, '.' + _.params.cssPrefix + '__list-btn', function (e) {
            
            e.preventDefault();  
            
            _.$selectEnhance
                .attr({'aria-expanded': false})
                .removeClass(_.params.cssPrefix + '--focused');

            _.setSelectionState($(this))
        });
    }

    eventSelectToggle(){
        const _ = this;

        _.$selectEnhance.on('focusin.' + EVENT_NAME, function (e) {
            _.params.focusIn(_.$element);
            
            $(document.body).on('click.close_' + _.selectId + EVENT_NAME, function(e){
                setTimeout(() => {
                    const ae = document.activeElement;
                    
                    if (
                        !_.$selectEnhance.has(ae).length || 
                        _.$selectEnhance[0].isSameNode(ae)
                    ) {
                        _.blurSelect();
                        $(document.body).off('click.close_' + _.selectId + EVENT_NAME);
                    
                    }
                }, 100);
            });  
        });
    }

    eventKeyboardSearch() {
        const _ = this;

        let keyInputTo = null,
            keyedInput = "",
            keyedFound = []
        ;

        _.$selectEnhance.on('keydown.' + EVENT_NAME, function (e) {

            if (_.$element[0].disabled) { return }
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
    
                    _.setSelectionState(_.optionSet.get(keyedFound[0]), false);
                } 
            }
        });
    }

    eventArrowKeys() {

        const _ = this;
        
        _.$selectEnhance.on('keydown.navigate_' + EVENT_NAME, function (e) {
            
            if (_.$element[0].disabled) { return }

            if (e.key === KEYS.DOWN) {
                e.preventDefault();
                setTimeout(() => { _.nextOptionButton('next') }, 100);
            }

            if (e.key === KEYS.UP) {
                e.preventDefault();
                setTimeout(() => { _.nextOptionButton('prev') }, 100);
            }

            if (e.key === KEYS.ESC && $currSelectEnhance) {
 
                _.blurSelect();
                _.$enableBtn[0].focus();
            }
        });
    }

    //  build the HTML for it

    setUpSelectHtml() {
        const _ = this;

        
        const $selectEnhance = $('<div />').attr({ 
            class: _.params.cssPrefix, 
            role: "combobox", 
            'aria-expanded' : false,
            'aria-owns': _.selectId + '_listbox',
            'aria-haspopup': 'listbox',
            id: _.selectId + '_combobox'
        });

        const $enableBtn =  $('<button>').attr({ 
            type: 'button', 
            class: _.params.cssPrefix + '__enable-btn',
            role: "textbox",
            'aria-controls': _.selectId + '_listbox',
            id: _.selectId + '_input'
        });

        _.$element.wrap($selectEnhance);

        // jQuery, elements need to be bound to the DOM before they
        // can have events attached to them. So this is the solution
        _.$selectEnhance = _.$element.parent();

        if (mobileOS && _.params.mobileNative) {
            // exit if its a mobile device after wrapping for styling
            return;
        }
        
        $enableBtn.insertAfter(_.$element);
        _.$element.attr({ tabindex: '-1', 'aria-hidden': true }); 

        // jQuery, elements need to be bound to the DOM before they
        // can have events attached to them. So this is the solution
        _.$enableBtn = _.$element.parent().find('#' + _.selectId + '_input');
        
        SelectEnhance.buildOptionsList(_);
    }

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
                    $btnList.eq(isLast ? i : i + 1)[0].focus();
                } else {
                    const isFirst = i === 0;
                    $btnList.eq(isFirst ? i : i - 1)[0].focus();
                }

                break;
            }
        }
    }

    selectInputMutationObserver() {
        const _ = this;

        const selectNode = _.$element[0];
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for(let i = 0, l = mutationsList.length; i < l; i++) {
                const mutation = mutationsList[i];
                if (mutation.type === 'childList') {
                    
                    SelectEnhance.refreshOptions(_.$element[0]);
                }
                else if (mutation.type === 'attributes') {
                    _.$selectEnhance.toggleClass(
                        _.params.cssPrefix + '--disabled', 
                        _.$element[0].disabled
                    );
                }
            }
        };

        // Create an observer instance linked to the callback function
        _.selectboxObserver = new MutationObserver(callback);
        // Start observing the target node for configured mutations
        _.selectboxObserver.observe(selectNode, config);

        // Later, you can stop observing
        // _.selectboxObserver.disconnect();

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
            id: _.selectId + '_listbox'
        });


        const optId = _.selectId || 'select_' + index;
       

        for (let i = 0, l = options.length; i < l; i++) {
            const opt = options[i];
            const id = optId + i;

            const attrs = {
                role: 'option', id,
                'data-value': opt.value,
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
        _.$selectList.insertAfter(_.$enableBtn);
 
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

    observeSelectListBoxInFullView() {
        const _ = this;

        if (window.IntersectionObserver) {
            const selectIntersectionObserver = new IntersectionObserver(function(selects) {

                _.selectListBoxInFullView = selects[0].intersectionRatio === 1
                
            }, { threshold: [0,1] });

            selectIntersectionObserver.observe(_.$selectList[0]);
        }
    }

    static getListPosition() {
        const _ = currSelectInstance;
        if (_ && _.$selectEnhance) {
            
          
            const selWrapPosTop = _.$selectEnhance.offset().top;
            const selListHeight = _.$selectList.height();

            const listPosAndHeight = _.$selectEnhance.offset().top + 
                _.$selectEnhance.height() + 
                selListHeight
            ;
            const winPosAndHeight = window.scrollY + $(window).height();

            if (
                listPosAndHeight > winPosAndHeight && 
                selWrapPosTop > selListHeight && 
                !_.selectListBoxInFullView
            ) {
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
            const _ = elData(this, `${DATA_NAME}_instance`);    
          
            if (_) {

                _.$selectList.remove();
                _.optionSet = new WeakMap();
                SelectEnhance.buildOptionsList(_);
            } else {
                console.warn(`No instance of a selectbox`, element);
            }
        });
    }

    static remove(element) {

		$(element).each(function () {
			const _ = elData(this, `${DATA_NAME}_instance`);
          
            _.$selectEnhance.off('keydown.' + EVENT_NAME);
            _.$selectEnhance.off('keydown.navigate_' + EVENT_NAME);
            _.$selectEnhance.off('click.' + EVENT_NAME);
            _.$selectEnhance.off('focusout.' + EVENT_NAME);
            _.$label.off('click.' + EVENT_NAME);
            $(document.body).off('click.close_' + _.selectId + EVENT_NAME);
            // the window event will just stay
            _.$element.insertAfter(_.$selectEnhance);
            _.$element.attr({tabindex: null, 'aria-hidden': null});
            _.$element.off('mouseup.' + EVENT_NAME);
            _.$element.off('change.' + EVENT_NAME);

            if (_.selectboxObserver) {
                _.selectboxObserver.disconnect();
            }
            _.$selectEnhance.remove();

			elData(this, `${DATA_NAME}_params`, null, true);
			elData(this, `${DATA_NAME}_instance`, null, true);
		});
	}
    
}
