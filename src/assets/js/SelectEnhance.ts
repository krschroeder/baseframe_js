import type { Cash } from "cash-dom";
import type { StringPluginArgChoices } from './types';

import $ from 'cash-dom';
 

import Store from "./core/Store";
import { KEYS } from "./core/constants";
import { isMobileOS, getDataOptions, noop } from "./util/helpers";

export interface ISelectEnhanceDefaults {
    cssPrefix: string;
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

const VERSION = "2.4.1";
const EVENT_NAME = 'selectEnhance';
const DATA_NAME = 'SelectEnhance';
const DEFAULTS: ISelectEnhanceDefaults = {
    cssPrefix: 'select-enhance',
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

// wrap the select first
const mobileOS = isMobileOS();

// helper
const getSelectedOptNode = ($el) => $el.find('option').filter(function () { return this.selected })[0];

// global private state props
let to: ReturnType<typeof setTimeout>,
    $currSelectEnhance = null,
    listPosTop = true,
    registerEventScroll = false,
    currSelectInstance: SelectEnhance | null = null
    ;


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
    public $textInput: Cash;
    public textInput: HTMLInputElement;
    public $selectList: Cash;
    public optionSet: WeakMap<object, any>;
    public optionsShown: boolean;
    public selectboxObserver: MutationObserver;
    public selectListBoxInFullView: boolean;
    public keyedInput: string;

    static defaults = DEFAULTS;
    static get version() { return VERSION;}
    static get pluginName() { return EVENT_NAME; }
    

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
        s.selectboxObserver;
        s.selectListBoxInFullView = true;
        s.keyedInput = "";

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
            s.eventSelectToggle();
            s.eventArrowKeys();
            s.observeSelectListBoxInFullView();
            SelectEnhance.eventScrollGetListPosition();
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

    // Events 

    blurSelect() {
        const s = this;

        s.$selectEnhance.addClass(s.params.cssPrefix + '--blurring');
        s.$selectEnhance.removeClass(s.params.cssPrefix + '--focused')

        s.$textInput.attr({ 'aria-expanded': 'false' });

        setTimeout(() => {
            s.$selectEnhance.removeClass(s.params.cssPrefix + '--blurring');

            $currSelectEnhance = null;
            currSelectInstance = null;
            s.optionsShown = false;

            s.params.focusOut(s.$select);
        }, s.params.blurDuration);

    }

    setSelectionState($btn: Cash, doBlur = true) {
        const s = this;
        const { cssPrefix } = s.params;

        const selectedOpt = s.optionSet.get($btn[0]);
        const newSelectedState = !selectedOpt.selected;

        s.params.beforeChange(s.$select);

        selectedOpt.selected = true;

        s.params.afterChange(s.$select); 
        s.$selectEnhance.find('.' + cssPrefix + '__list-btn[aria-selected]').attr({ 'aria-selected': 'false' });

        $btn.attr({ 'aria-selected': newSelectedState + '' });
        s.$textInput.attr({ 'aria-activedescendant': $btn[0].id });

        // add a class whether there is an input value or not
        s.$selectEnhance.toggleClass(cssPrefix + '--empty-val', !selectedOpt.value.trim());
        s.select.dispatchEvent(new Event('change'));

        if (s.params.emptyValAsPlaceholder && selectedOpt.value.trim() === '') {
            s.$textInput.val('').attr({ placeholder: selectedOpt.text });
        } else {
            s.$textInput.val(selectedOpt.text);
        }

        if (doBlur) {
            
            s.textInput.focus();
                
            s.blurSelect();
            
        } else {
            $btn[0].focus();
        }
    }

    eventLabelClick() {
        const s = this;

        s.$label.on('click.' + EVENT_NAME, function (e) {
            e.preventDefault();
            if (!s.select.disabled) {
                s.textInput.focus();
            }
        })
    }

    showOptions(s: SelectEnhance) {

        if (s.select.disabled) { return }
        const {cssPrefix} = s.params;

        s.optionsShown = true;
        s.$selectEnhance.toggleClass(cssPrefix + '--focused');
        s.$textInput.attr({ 'aria-expanded': 'true' });

        const $selectedBtn = s.$selectEnhance.find('.' + cssPrefix + '__list-btn[aria-selected="true"]');

        if ($selectedBtn.length) {
            $selectedBtn[0].focus();
        }

        $currSelectEnhance = s.$selectEnhance;
        currSelectInstance = s;

        SelectEnhance.getListPosition();

        s.params.focusIn(s.$select);
    }

    eventShowOptions() {
        const s = this;
        const { cssPrefix } = s.params;

        s.$selectEnhance.on('click.' + EVENT_NAME, '.' + cssPrefix + '__enable-text', (e: MouseEvent) => {
            if (s.select.disabled) { return }
            s.showOptions(s)
        });

        // Only works on keydown event
        s.$textInput.on('keydown.' + EVENT_NAME, function (e: KeyboardEvent) {
            if ((e.key === KEYS.down || e.key === KEYS.up) && !s.optionsShown) {
                s.showOptions(s);
                e.preventDefault();
            }
        });

        s.$selectList.on('keypress.' + EVENT_NAME, '.' + cssPrefix + '__list-btn' , function(e: KeyboardEvent) {
            if (
                e.key === KEYS.enter ||
                e.code === KEYS.space && s.keyedInput.trim() === ''
            ) {
                s.setSelectionState($(document.activeElement));
                
                s.blurSelect();
                s.textInput.focus();
                e.preventDefault();
            }
        });

        s.$textInput.on('keypress.' + EVENT_NAME, function (e: KeyboardEvent) {
            
            if (e.key !== KEYS.tab || e.shiftKey && e.key !== KEYS.tab) {
                e.preventDefault();
            }

            if (
                e.key === KEYS.enter ||
                e.code === KEYS.space && s.keyedInput.trim() === '' ||
                e.ctrlKey && e.altKey && e.shiftKey && KEYS.space === e.code
            ) {

                s.showOptions(s);
            }
        });
    }

    eventOptionClick() {
        const s = this;
        
        s.$selectEnhance.on('click.' + EVENT_NAME, '.' + s.params.cssPrefix + '__list-btn', function (e:MouseEvent) {

            e.preventDefault();
             
            s.$selectEnhance.removeClass(s.params.cssPrefix + '--focused');
            s.$textInput.attr({ 'aria-expanded': 'false' });

            s.setSelectionState($(this));

        });
    }

    eventSelectToggle() {
        const s = this;
        s.$selectEnhance.on('focusin.' + EVENT_NAME, function (e) {

            const closeEvent = 'click.close_' + s.selectId + EVENT_NAME;

            $(document.body).off(closeEvent).on(
                closeEvent, function (e) {
                    setTimeout(() => {
                        const ae = document.activeElement;
                        const aeIsInSelectEnhance = (ae && !s.$selectEnhance.has(ae).length);

                        if (aeIsInSelectEnhance || (s.$selectEnhance[0] as HTMLElement).isSameNode(ae)) {
                            s.blurSelect();

                            $(document.body).off(closeEvent);

                        }
                    }, 100);
                });

        });
    }

    eventKeyboardSearch() {
        const s = this;

        let keyInputTo: ReturnType<typeof setTimeout> | null = null;
        let changedTo: ReturnType<typeof setTimeout> | null = null;
        let keyedFound = [];

        s.$selectEnhance.on('keypress.' + EVENT_NAME, function (e:KeyboardEvent) {
            if (s.select.disabled) { return }
            const keyCurr = (e.key.length === 1 ? e.key : '');
            
            s.keyedInput += keyCurr;

            clearTimeout(keyInputTo);
            keyInputTo = setTimeout(() => {
                s.keyedInput = ""; 
            }, s.params.typeAheadDuration);

            if (s.keyedInput.trim()) {

                const rgx = RegExp('^'+s.keyedInput.trim(), 'i'); 

                keyedFound = [].slice.call(s.select.getElementsByTagName('option')).filter( (el) => rgx.test(el.text))

                if (keyedFound.length) {

                    clearTimeout(changedTo);
                    changedTo = setTimeout(() => {
                        s.setSelectionState(s.optionSet.get(keyedFound[0]), false);
                         
                    }, 100);
                }
            }
        });
    }

    eventArrowKeys() {

        const s = this;

        s.$selectEnhance.on('keydown.navigate_' + EVENT_NAME, function (e) {
             
            if (s.select.disabled) { return }

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

            if (e.key === KEYS.esc && $currSelectEnhance) {
                s.blurSelect();
                s.textInput.focus();
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

        const { cssPrefix } = s.params;
        const optGroup = s.select.getElementsByTagName('optgroup');
        const hasOptGroup = !!optGroup.length;
        const $optGroupWm = new WeakMap();

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

        const options = s.select.getElementsByTagName('option');
 
        s.$selectList = $selectList ? $selectList : $('<div>').attr({
            class: cssPrefix + '__list',
            role: 'listbox',
            id: s.selectId + '_listbox',
            'aria-label': s.$label.text() || ''
        });

        const optId = s.selectId || 'select_' + s.index;

        for (let i = 0, l = options.length; i < l; i++) {
            const opt = options[i];
            const id = optId + i;

            if (opt.hidden) continue;

            const valCssStatus = opt.value === '' ? ' ' + cssPrefix + '__list-btn--empty' : '';

            const attrs = {
                // type: 'button',
                tabIndex: '0',
                role: 'option', id,
                'data-value': opt.value,
                'aria-selected': opt.selected + '',
                disabled: opt.disabled ? 'disabled' : null,
                class: cssPrefix + '__list-btn' + valCssStatus
            };
            const $btn: Cash = $('<div/>').attr(attrs).text(opt.textContent);

            s.optionSet.set($btn[0], opt);
            s.optionSet.set(opt, $btn);
            // append to list or optgroup

            hasOptGroup && opt.parentElement.nodeName.toUpperCase() === 'OPTGROUP' ?
                $optGroupWm.get(opt.parentElement).append($btn) :
                s.$selectList.append($btn)
                ;

            if (opt.selected) {
                s.$textInput.attr({ 'aria-activedescendant': id });
                s.$selectEnhance.toggleClass(cssPrefix + '--empty-val', !opt.value.trim());

                if (s.params.emptyValAsPlaceholder && opt.value.trim() === '') {
                    s.$textInput.val('');
                    s.$textInput.attr({ placeholder: opt.text });
                } else {
                    s.$textInput.val(opt.text);
                }

            }
        }

        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];
                s.$selectList.append($optGroupWm.get(group))
            }
        }
        s.$selectList.insertAfter(s.$textInput);

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

        // Later, you can stop observing
        // s.selectboxObserver.disconnect();

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
        const s = this;

        if (window.IntersectionObserver) {
            const selectIntersectionObserver = new IntersectionObserver(function (selects) {

                s.selectListBoxInFullView = selects[0].intersectionRatio === 1;

            }, { threshold: [0, 1] });

            s.$selectList[0] && selectIntersectionObserver.observe(s.$selectList[0]);
        }
    }

    static getListPosition() {
        if (currSelectInstance) {
            const s = currSelectInstance;

            const selWrapPosTop = (s.$selectEnhance as any).offset().top;
            const selListHeight = s.$selectList.height();

            const listPosAndHeight = (s.$selectEnhance as any).offset().top +
                s.$selectEnhance.height() +
                selListHeight
                ;
            const winPosAndHeight = window.scrollY + $(window).height();

            if (
                listPosAndHeight > winPosAndHeight &&
                selWrapPosTop > selListHeight &&
                !s.selectListBoxInFullView
            ) {
                s.$selectEnhance.addClass(s.params.cssPrefix + '--pos-bottom');
                listPosTop = false;

            } else {
                s.$selectEnhance.removeClass(s.params.cssPrefix + '--pos-bottom');

                listPosTop = true;
            }
        }
    }

    static refreshOptions(element) {
        $(element).each(function () {
            const s: SelectEnhance = Store(this, `${DATA_NAME}_instance`);

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

            s.$selectEnhance.off('keydown.' + EVENT_NAME);
            s.$selectEnhance.off('keydown.navigate_' + EVENT_NAME);
            s.$selectEnhance.off('click.' + EVENT_NAME);
            s.$selectEnhance.off('focusout.' + EVENT_NAME);
            s.$selectEnhance.off('blur.' + EVENT_NAME);
            s.$label.off('click.' + EVENT_NAME);
            $(document.body).off('click.close_' + s.selectId + EVENT_NAME);
            // the window event will just stay
            s.$select.insertAfter(s.$selectEnhance);
            s.$select.attr({ tabindex: null, 'aria-hidden': null });
            s.$select.off('mouseup.' + EVENT_NAME);
            s.$select.off('change.' + EVENT_NAME);

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