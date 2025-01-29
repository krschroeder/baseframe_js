import type { Cash } from "cash-dom";
import type { StringPluginArgChoices } from './types';

import $ from 'cash-dom';
import Store from "./core/Store";
import { KEYS } from "./core/constants";
import { isMobileOS, getDataOptions, noop } from "./util/helpers";

export interface ISelectEnhanceDefaults {
    cssPrefix: string;
    cssListModifer: string;
    mobileNative: boolean;
    emptyValAsPlaceholder: boolean;
    blurDuration: number;
    typeAheadDuration: number;
    observeSelectbox: boolean;
    focusIn($select: Cash);
    focusOut($select: Cash);
    beforeChange($select: Cash);
    afterChange($select: Cash);
}

export interface ISelectEnhanceOptions extends Partial<ISelectEnhanceDefaults> {}

const VERSION = "3.0.0";
const EVENT_NAME = 'selectEnhance';
const DATA_NAME = 'SelectEnhance';
const DEFAULTS: ISelectEnhanceDefaults = {
    cssPrefix: 'select-enhance',
    cssListModifer: null,
    mobileNative: false,
    emptyValAsPlaceholder: true,
    focusIn: noop,
    focusOut: noop,
    beforeChange: noop,
    afterChange: noop,
    blurDuration: 250,
    typeAheadDuration: 500,
    observeSelectbox: true
};

// TOOD:
// - Search with Keyboard

// wrap the select first
const mobileOS = isMobileOS();

// helper
const getSelectedOptNode = ($el) => $el.find('option').filter(function () { return this.selected })[0];

let currSelectEnhance:HTMLDivElement | null = null;

export default class SelectEnhance {

    public $select: Cash;
    public select: HTMLSelectElement;
    public params: ISelectEnhanceDefaults;
    public index: number;
    public id: string;
    public selectId: string;
    public isReadOnly: boolean;
    public $label: Cash;
    public $selectEnhance: Cash;
    public selectEnhance: HTMLDivElement;
    public $textInput: Cash;
    public textInput: HTMLInputElement;
    public $selectList: Cash;
    public selectList: HTMLDivElement;
    public optionSet: WeakMap<object, any>;
    public listPosTop: boolean;
    public optionsShown: boolean;
    public selectboxObserver: MutationObserver;
    public selectListBoxInFullView: boolean;
    private keyedInput: string;
    private posTimeout: ReturnType<typeof setTimeout>;
    private bodyCloseEvt: string
    public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;
    

    constructor(element: HTMLSelectElement, options: ISelectEnhanceOptions | StringPluginArgChoices, index: number) {
        const s = this;

        s.index = index;
        s.$select = $(element);
        s.select = element;
        s.id = s.$select.attr('id') || s.$select.attr('name') || 'select_enhance_' + index;
        s.selectId = s.id + '_enhance';
        s.$label = $(`label[for="${s.id}"]`);
        s.optionSet = new WeakMap();
        s.optionsShown = false;
        s.listPosTop = false;
        s.selectboxObserver;
        s.selectListBoxInFullView = true;
        s.keyedInput = "";
        s.posTimeout =  null;
        s.bodyCloseEvt = 'click.close_' + s.selectId + EVENT_NAME;
        s.isReadOnly = typeof s.$select.attr('readonly') === "string";

        if (s.select.multiple) {
            console.warn(`The SelectEnhance plugin doesn't support multiple selections.`)
        }

        if (s.$label.length) {
            s.$label.attr({ id: s.selectId + '_lbl' });
        }

        const dataOptions = getDataOptions(element, EVENT_NAME);
        
        s.params = $.extend({}, SelectEnhance.defaults, options, dataOptions)


        s.setUpSelectHtml();

        if (mobileOS && s.params.mobileNative || s.isReadOnly) {

            s.mobileOnlyIfNavite();

        } else {

            // 
            // attach events
            // 

            if (s.params.observeSelectbox) {
                s.selectInputMutationObserver();
            }
            s.eventLabelClick();
            s.eventKeyboardSearch();
            s.eventShowOptions();
            s.eventOptionClick();
            s.eventArrowKeys();
            s.eventResizeClose();
            s.observeSelectListBoxInFullView();
        }

        return s;
    }

    mobileOnlyIfNavite() {
        const s = this;

        let prevElSelectedVal = getSelectedOptNode(s.$select);

        s.$select.on('mouseup.' + EVENT_NAME, 'option', function (e) {

            if (!this.isSameNode(prevElSelectedVal)) {
                s.params.beforeChange(s.$select);
            }

        }).on('change.' + EVENT_NAME, function (e) {
            s.params.afterChange(s.$select);
            prevElSelectedVal = getSelectedOptNode(s.$select);
        });
    }

    showOptions() {
        const s = this;
        if (s.select.disabled || s.optionsShown) { return }
        s.optionsShown = true; 

        currSelectEnhance = s.selectEnhance;
        const {cssPrefix} = s.params;
        const $selectedBtn = s.$selectList.find('[aria-selected="true"]');

        document.body.append(s.selectList);
        s.$selectEnhance.toggleClass(cssPrefix + '--focused');
        s.$textInput.attr({ 'aria-expanded': 'true' });

        s.getListPosition();
        s.eventScrollGetListPosition(true);
        s.eventOutsideClickClose();
        
        
        if ($selectedBtn.length) {
            $selectedBtn[0].focus();
        }

        s.params.focusIn(s.$select);
    }

    closeOptions(focusBack: boolean = true) {
        const s = this;
        const { cssPrefix} = s.params;
        
        s.optionsShown = false;

        s.$selectEnhance
            .addClass(cssPrefix + '--blurring')
            .removeClass(cssPrefix + '--focused');

        s.$textInput.attr({ 'aria-expanded': 'false' });
        
        s.$selectList
            .addClass(cssPrefix + '__list--blurring')
            .removeClass(cssPrefix + '__list--focused');

        // remove the close event on the body
        $(document.body).off(s.bodyCloseEvt);

        setTimeout(() => {
            s.$selectEnhance.removeClass(cssPrefix + '--blurring ' + cssPrefix + '--pos-above')

            s.$selectList.detach()
                .removeClass(
                    cssPrefix + '__list--blurring ' + 
                    cssPrefix + '__list--focused' +
                    cssPrefix + '__list--pos-above'
                );
            s.params.focusOut(s.$select);
          
            if (focusBack && s.selectEnhance.isSameNode(currSelectEnhance)) {
                s.textInput.focus();
            }
            s.eventScrollGetListPosition(true);

        }, s.params.blurDuration);

    }

    setSelectionState(optionBtn: HTMLDivElement, doBlur = true) {
        const s = this;
        const { cssPrefix } = s.params;
        const selectedOpt = s.optionSet.get(optionBtn);

        if (!selectedOpt) return;

        const newSelectedState = !selectedOpt.selected;

        s.params.beforeChange(s.$select);

        selectedOpt.selected = true;

        s.params.afterChange(s.$select); 
        s.$selectList.find('.' + cssPrefix + '__list-btn[aria-selected]').attr({ 'aria-selected': 'false' });

        $(optionBtn).attr({ 'aria-selected': newSelectedState + '' });
        s.$textInput.attr({ 'aria-activedescendant': optionBtn.id });

        // add a class whether there is an input value or not
        s.$selectEnhance.toggleClass(cssPrefix + '--empty-val', !selectedOpt.value.trim());
        s.select.dispatchEvent(new Event('change'));

        if (s.params.emptyValAsPlaceholder && selectedOpt.value.trim() === '') {
            s.$textInput.val('').attr({ placeholder: selectedOpt.text });
        } else {
            s.$textInput.val(selectedOpt.text);
        }

        if (doBlur) {
                
            s.closeOptions();
        } else {
            optionBtn.focus();
        }
    }
    
    // Events 

    eventLabelClick() {
        const s = this;

        s.$label.on('click.' + EVENT_NAME, function (e) {
            e.preventDefault();
            if (!s.select.disabled) {
                s.textInput.focus();
            }
        })
    }

    eventResizeClose() {
        const s = this;
        $(window).on('resize.' + EVENT_NAME, () => {
            if (s.optionsShown) s.closeOptions();
        });
    }

    eventShowOptions() {
        const s = this;
        const { cssPrefix } = s.params;

        s.$selectEnhance.on('click.' + EVENT_NAME, '.' + cssPrefix + '__enable-text', (e: MouseEvent) => {
            if (s.select.disabled) { return }
            s.showOptions();
            
        });

        // Only works on keydown event
        s.$textInput.on('keydown.' + EVENT_NAME, function (e: KeyboardEvent) {
            if (e.key === KEYS.down || e.key === KEYS.up) {
                
                s.showOptions();
                e.preventDefault();
            }
        });

        s.$textInput.on('keypress.' + EVENT_NAME, function (e: KeyboardEvent) {
            
            if (e.key !== KEYS.tab || e.shiftKey && e.key !== KEYS.tab) {
                e.preventDefault();
            }

            if (
                e.key === KEYS.enter || //enter key
                e.code === KEYS.space && s.keyedInput.trim() === '' || // space key
                e.ctrlKey && e.altKey && e.shiftKey && KEYS.space === e.code
            ) {
                s.showOptions();    console.log('whha')
            }
        });
    }

    eventOptionClick() {
        const s = this;
        const { cssPrefix } = s.params;

        const newSelectedOption = (elem: HTMLDivElement) => {
            s.setSelectionState(document.activeElement as HTMLDivElement);
            s.$selectEnhance.removeClass(cssPrefix + '--focused');
            setTimeout(() => s.closeOptions(), 200);
        }
        // mouse click
        s.$selectList.on('click.' + EVENT_NAME, '.' + cssPrefix + '__list-btn', function (e:MouseEvent) {

            newSelectedOption(this);
            e.preventDefault();
        });

         // Kyeboard click
         s.$selectList.on('keypress.' + EVENT_NAME, '.' + cssPrefix + '__list-btn' , function(e: KeyboardEvent) {
            if (
                e.key === KEYS.enter ||
                e.code === KEYS.space && s.keyedInput.trim() === ''
            ) {
                newSelectedOption(document.activeElement as HTMLDivElement);
                e.preventDefault();
            }
        });
    }

    eventOutsideClickClose() {
        const s = this;
        setTimeout(() => {

            $(document.body).off(s.bodyCloseEvt).on(s.bodyCloseEvt, function (e) {
                const ae = document.activeElement;
                
                if (ae && !s.$selectList.has(ae).length) {
                    s.closeOptions(); 
                }
            });
        },100);
    }

    eventKeyboardSearch() {
        const s = this;

        let keyInputTo: ReturnType<typeof setTimeout> | null = null;
        let changedTo: ReturnType<typeof setTimeout> | null = null;
        let keyedFound: HTMLOptionElement;

        function keyboardSearch (e:KeyboardEvent) {
            if (s.select.disabled) { return }
            const keyCurr = (e.key.length === 1 ? e.key : '');
            
            s.keyedInput += keyCurr;

            clearTimeout(keyInputTo);
            keyInputTo = setTimeout(() => {
                s.keyedInput = ""; 
            }, s.params.typeAheadDuration);

            if (s.keyedInput.trim()) {

                const rgx = RegExp(s.keyedInput.trim(), 'i'); 

                keyedFound = Array.from(s.select.options).find( (el) => rgx.test(el.text));

                if (keyedFound) {

                    clearTimeout(changedTo);
                    changedTo = setTimeout(() => {
                        s.setSelectionState(s.optionSet.get(keyedFound), false);
                         
                    }, 100);
                }
            }
        }
    
        s.$selectEnhance.on('keypress.' + EVENT_NAME, keyboardSearch);
        s.$selectList.on('keypress.' + EVENT_NAME, keyboardSearch);
    }

    eventArrowKeys() {

        const s = this;
        s.$selectEnhance.on('keydown.navigate_' + EVENT_NAME, function (e) {
            if (s.select.disabled || !s.optionsShown) { return }

            if (e.key === KEYS.down) {
                if (!s.textInput.isSameNode(document.activeElement)) {

                    e.preventDefault();
                }
                s.nextOptionButton('next');
            }

            if (e.key === KEYS.esc ) {
                s.closeOptions();
            }

            if (e.key === KEYS.tab ) {
                s.closeOptions(false);
            }
        })

        s.$selectList.on('keydown.navigate_' + EVENT_NAME, function (e) {
             
            if (s.select.disabled || !s.optionsShown) { return }

            if (e.key === KEYS.down) {
                if (!s.textInput.isSameNode(document.activeElement)) {

                    e.preventDefault();
                }
                s.nextOptionButton('next');
            }

            if (e.key === KEYS.up) {
                e.preventDefault();
                s.nextOptionButton('prev');
            }

            if (e.key === KEYS.esc ) {
                s.closeOptions();

            }
        });
    }

    //  build the HTML for it

    setUpSelectHtml() {
        const s = this;


        const $selectEnhance = $('<div />').attr({
            class: s.params.cssPrefix,
            id: s.selectId + '_wrap'
        });

        const $textInput = $('<input>').attr({
            type: 'text',
            class: s.params.cssPrefix + '__enable-text',
            role: "combobox",
            'aria-controls': s.selectId + '_listbox',
            'aria-labelledby': s.selectId + '_lbl',
            'aria-autocomplete': 'list',
            'aria-expanded': 'false',
            id: s.selectId + '_input'
        });


        s.$select.wrap($selectEnhance);

        // jQuery, elements need to be bound to the DOM before they
        // can have events attached to them. So this is the solution
        s.$selectEnhance = s.$select.parent();
        s.selectEnhance = s.$selectEnhance[0] as HTMLDivElement;
       
        if (mobileOS && s.params.mobileNative || s.isReadOnly) {
            // exit if its a mobile device after wrapping for styling
            return;
        }

        $textInput.insertAfter(s.$select);
        s.$select.attr({ tabindex: '-1', 'aria-hidden': 'true' });

        // jQuery, elements need to be bound to the DOM before they
        // can have events attached to them. So this is the solution
        s.$textInput = s.$select.parent().find('#' + s.selectId + '_input');
        s.textInput = s.$textInput[0] as HTMLInputElement;
        SelectEnhance.buildOptionsList(s);
    }

    static buildOptionsList(s: SelectEnhance, $selectList?: Cash) {

        const { cssListModifer, cssPrefix } = s.params;
        const optGroup = s.select.getElementsByTagName('optgroup');
        const hasOptGroup = !!optGroup.length;
        const $optGroupWm = new WeakMap();
        const modifierCss =  " " + (cssListModifer ? cssPrefix + '__list--' + cssListModifer : '');

        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];

                $optGroupWm.set(group, $('<div/>').attr({
                    class: cssPrefix + '__optgroup',
                    role: 'group',
                    label: group.label || ""
                }).append($('<span>').attr({
                    class: cssPrefix + '__optgroup-label',
                    'aria-hidden': 'true'
                }).text(group.label || "")));
            }
        }

        const options = s.select.options;
 
        s.$selectList = $selectList ? $selectList : $('<div>').attr({
            class: cssPrefix + '__list' + modifierCss,
            role: 'listbox',
            id: s.selectId + '_listbox',
            'aria-label': s.$label.text() || ''
        });

        s.selectList = s.$selectList[0] as HTMLDivElement;

        const optId = s.selectId || 'select_' + s.index;

        for (let i = 0, l = options.length; i < l; i++) {
            const option = options[i];
            const id = optId + i;

            if (option.hidden) continue;

            const valCssStatus = option.value === '' ? ' ' + cssPrefix + '__list-btn--empty' : '';

            const attrs = {
                // type: 'button',
                tabIndex: '0',
                role: 'option', id,
                'data-value': option.value,
                'aria-selected': option.selected + '',
                disabled: option.disabled ? 'disabled' : null,
                class: cssPrefix + '__list-btn' + valCssStatus
            };
            const optionBtn: HTMLDivElement = $('<div/>').attr(attrs).text(option.textContent)[0] as HTMLDivElement;

            s.optionSet.set(optionBtn, option);
            s.optionSet.set(option, optionBtn);
            // append to list or optgroup

            hasOptGroup && option.parentElement.nodeName.toUpperCase() === 'OPTGROUP' ?
                $optGroupWm.get(option.parentElement).append(optionBtn) :
                s.$selectList.append(optionBtn)
                ;

            if (option.selected) {
                s.$textInput.attr({ 'aria-activedescendant': id });
                s.$selectEnhance.toggleClass(cssPrefix + '--empty-val', !option.value.trim());

                if (s.params.emptyValAsPlaceholder && option.value.trim() === '') {
                    s.$textInput.val('');
                    s.$textInput.attr({ placeholder: option.text });
                } else {
                    s.$textInput.val(option.text);
                }

            }
        }

        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];
                s.$selectList.append($optGroupWm.get(group))
            }
        }
    }

    nextOptionButton(dir: 'next' | 'prev') {

        const s = this;
        const ae = document.activeElement;
        const $btnList = s.$selectList.find('.' + s.params.cssPrefix + '__list-btn');
        const btnLength = $btnList.length;

        if (btnLength && s.textInput.isSameNode(ae)) {
            $btnList.eq(dir === 'next' ? 0 : btnLength - 1)[0].focus();
            return;
        }
         
        for (let i = 0; i < btnLength; i++) {
            const el: HTMLDivElement = $btnList[i] as HTMLDivElement;
            let prevNextIndex = 0;

            if (ae.isSameNode(el)) {

                if (dir === 'next') {
                    const isLast = i === btnLength - 1;
                    prevNextIndex = isLast ? i : i + 1;
                } else {
                    const isFirst = i === 0;
                    prevNextIndex = isFirst ? i : i - 1;
                }
                $btnList.eq(prevNextIndex)[0].focus();

                break;
            }
        }
    }

    selectInputMutationObserver() {
        const s = this;

        const selectNode = s.select;
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (let i = 0, l = mutationsList.length; i < l; i++) {
                const mutation = mutationsList[i];
                if (mutation.type === 'childList') {

                    SelectEnhance.refreshOptions(s.select);
                }
                else if (mutation.type === 'attributes') {
                    s.$selectEnhance.toggleClass(
                        s.params.cssPrefix + '--disabled',
                        s.select.disabled
                    );
                }
            }
        };

        // Create an observer instance linked to the callback function
        s.selectboxObserver = new MutationObserver(callback);
        // Start observing the target node for configured mutations
        s.selectboxObserver.observe(selectNode, config);
    }

    eventScrollGetListPosition(init: boolean = true) {
        const s = this;
        const evt = 'scroll.' + EVENT_NAME;

        if (init) {
            
            $(window).off(evt).on(evt, () => {
                s.posTimeout && clearTimeout(s.posTimeout);
                s.posTimeout = setTimeout(() => s.getListPosition(), 100);
            });
        } else {
            $(window).off(evt);
        }
    }

    observeSelectListBoxInFullView() {
        const s = this;

        if (window.IntersectionObserver) {
            const selectIntersectionObserver = new IntersectionObserver(function (selects) {

                s.selectListBoxInFullView = selects[0].intersectionRatio === 1;

            }, { threshold: [0, 1] });

            s.$selectList[0] && selectIntersectionObserver.observe(s.$selectList[0]);
        }
    }

    getListPosition() {
        const s = this;

        if (s.optionsShown) {
            const 
                {cssPrefix} = s.params,
                selWrapOffset = s.$selectEnhance.offset(),
                selWrapHeight = s.selectEnhance.scrollHeight,
                selWrapPosTop = selWrapOffset.top,
                selWrapPosBot = selWrapPosTop + selWrapHeight,
                selWrapWidth = s.selectEnhance.offsetWidth,
                selListHeight = s.selectList.offsetHeight,
                {innerHeight, scrollY}  = window,
                scrollYBot = scrollY + innerHeight,

                isSpaceAbove = selWrapPosTop - scrollY > selListHeight,
                isSpaceBelow = scrollYBot - selWrapPosBot > selListHeight,

                // If space below use that, else if no space at all prefer space below
                canPlaceBelow = isSpaceBelow ? true : isSpaceAbove ? false: true
            ;

            s.$selectEnhance.toggleClass(cssPrefix + '--pos-above', !canPlaceBelow);
            s.$selectList
                .css({ 
                    left: selWrapOffset.left, 
                    top: canPlaceBelow ? selWrapPosBot : selWrapPosTop - selListHeight, 
                    width: selWrapWidth 
                })
                .toggleClass(cssPrefix + '__list--focused', s.optionsShown)
                .toggleClass(cssPrefix + '__list--pos-above', !canPlaceBelow);
        }
    }

    static refreshOptions(element) {
        $(element).each(function () {
            const s: SelectEnhance = Store(this, DATA_NAME);

            if (s) {

                s.$selectList.empty();
                s.optionSet = new WeakMap(); 
                SelectEnhance.buildOptionsList(s, s.$selectList);
            } else {
                console.warn(`No instance of a selectbox`, element);
            }
        });
    }

    static remove(element: Cash, plugin?: SelectEnhance) {

        $(element).each(function () {
            const s: SelectEnhance = plugin || Store(this, DATA_NAME);

            s.$selectEnhance
                .off('keydown.' + EVENT_NAME)
                .off('keydown.navigate_' + EVENT_NAME)
                .off('click.' + EVENT_NAME)
                .off('focusout.' + EVENT_NAME)
                .off('blur.' + EVENT_NAME);

            s.$label.off('click.' + EVENT_NAME);
            $(document.body).off(s.bodyCloseEvt);
            $(window).off('resize.' + EVENT_NAME);
            // the window event will just stay
            s.$select.insertAfter(s.$selectEnhance);
            
            s.$select
                .attr({ tabindex: null, 'aria-hidden': null })
                .off('mouseup.' + EVENT_NAME)
                .off('change.' + EVENT_NAME);

            if (s.selectboxObserver) {
                s.selectboxObserver.disconnect();
            }
            s.$selectEnhance.remove();

            Store(this, DATA_NAME, null);
        });
    }
}

declare module 'cash-dom' {
    interface Cash {
        selectEnhance(options?: ISelectEnhanceOptions | StringPluginArgChoices): Cash;
    }
}