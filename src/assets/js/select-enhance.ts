import type { Cash } from "cash-dom";
import type { StringPluginArgChoices } from './types/shared';

import $ from 'cash-dom';
import { elemData } from "./util/store";
import parseObjectFromString from './util/parse-object-from-string';
import { KEYS } from "./util/constants";
import { isMobileOS, noop } from "./util/helpers";
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role

export interface ISelectEnhanceOptions {
    cssPrefix?: string;
    mobileNative?: boolean;
    emptyValAsPlaceholder?: boolean;
    blurDuration?: number;
    typeAheadDuration?: number;
    observeSelectbox?: boolean;
    focusIn?($select: Cash);
    focusOut?($select: Cash);
    beforeChange?($select: Cash);
    afterChange?($select: Cash);
}

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

const VERSION = "2.3.0";
const EVENT_NAME = 'selectEnhance';
const DATA_NAME = 'SelectEnhance';


const DEFAULTS: ISelectEnhanceDefaults = {
    cssPrefix: 'select-enhance',
    mobileNative: true,
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

    static get version() { return VERSION }
    static get pluginName() { return DATA_NAME }
    static Defaults = DEFAULTS;

    constructor(element: HTMLSelectElement, options: ISelectEnhanceOptions, index: number) {
        const _ = this;

        _.index = index;
        _.$select = $(element);
        _.select = element;
        _.id = _.$select.attr('id') || _.$select.attr('name') || 'select_enhance_' + index;
        _.selectId = _.id + '_enhance';
        _.$label = $(`label[for="${_.id}"]`);
        _.optionSet = new WeakMap();
        _.optionsShown = false;
        _.selectboxObserver;
        _.selectListBoxInFullView = true;
        _.keyedInput = "";

        if (_.select.multiple) {
            console.warn(`The SelectEnhance plugin doesn't support multiple selections.`)
        }

        if (_.$label.length) {
            _.$label.attr({ id: _.selectId + '_lbl' });
        }

        const dataOptions = parseObjectFromString(
            $(element).data(EVENT_NAME + '-options')
        );

        elemData(
            element,
            `${DATA_NAME}_params`,
            $.extend({}, SelectEnhance.Defaults, options, dataOptions)
        );
        _.params = elemData(element, `${DATA_NAME}_params`);


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

        let prevElSelectedVal = getSelectedOptNode(_.$select);

        _.$select.on('mouseup.' + EVENT_NAME, 'option', function (e) {

            if (!this.isSameNode(prevElSelectedVal)) {
                _.params.beforeChange(_.$select);
            }

        }).on('change.' + EVENT_NAME, function (e) {
            _.params.afterChange(_.$select);
            prevElSelectedVal = getSelectedOptNode(_.$select);
        });
    }

    // Events 

    blurSelect() {
        const _ = this;

        _.$selectEnhance.addClass(_.params.cssPrefix + '--blurring');
        _.$selectEnhance.removeClass(_.params.cssPrefix + '--focused')

        _.$textInput.attr({ 'aria-expanded': 'false' });

        setTimeout(() => {
            _.$selectEnhance.removeClass(_.params.cssPrefix + '--blurring');

            $currSelectEnhance = null;
            currSelectInstance = null;
            _.optionsShown = false;

            _.params.focusOut(_.$select);
        }, _.params.blurDuration);

    }

    setSelectionState($btn: Cash, doBlur = true) {
        const _ = this;
        const { cssPrefix } = _.params;

        const selectedOpt = _.optionSet.get($btn[0]);
        const newSelectedState = !selectedOpt.selected;

        _.params.beforeChange(_.$select);

        selectedOpt.selected = true;

        _.params.afterChange(_.$select); 
        _.$selectEnhance.find('button[aria-selected]').attr({ 'aria-selected': 'false' });

        $btn.attr({ 'aria-selected': newSelectedState + '' });
        _.$textInput.attr({ 'aria-activedescendant': $btn[0].id });

        // add a class whether there is an input value or not
        _.$selectEnhance.toggleClass(cssPrefix + '--empty-val', !selectedOpt.value.trim());
        _.select.dispatchEvent(new Event('change'));

        if (_.params.emptyValAsPlaceholder && selectedOpt.value.trim() === '') {
            _.$textInput.val('').attr({ placeholder: selectedOpt.text });
        } else {
            _.$textInput.val(selectedOpt.text);
        }

        if (doBlur) {
            
            _.textInput.focus();
                
            _.blurSelect();
            
        } else {
            $btn[0].focus();
        }
    }

    eventLabelClick() {
        const _ = this;

        _.$label.on('click.' + EVENT_NAME, function (e) {
            e.preventDefault();
            if (!_.select.disabled) {
                _.textInput.focus();
            }
        })
    }

    showOptions(_: SelectEnhance) {

        if (_.select.disabled) { return }

        _.optionsShown = true;
        _.$selectEnhance.toggleClass(_.params.cssPrefix + '--focused');
        _.$textInput.attr({ 'aria-expanded': 'true' });

        const $selectedBtn = _.$selectEnhance.find('button[aria-selected="true"]');

        if ($selectedBtn.length) {
            $selectedBtn[0].focus();
        }

        $currSelectEnhance = _.$selectEnhance;
        currSelectInstance = _;

        SelectEnhance.getListPosition();

        _.params.focusIn(_.$select);
    }

    eventShowOptions() {
        const _ = this;

        _.$selectEnhance.on('click.' + EVENT_NAME, '.' + _.params.cssPrefix + '__enable-text', (e: MouseEvent) => {
            if (_.select.disabled) { return }
            _.showOptions(_)
        });

        // Only works on keydown event
        _.$textInput.on('keydown.' + EVENT_NAME, function (e: KeyboardEvent) {
            if ((e.key === KEYS.down || e.key === KEYS.up) && !_.optionsShown) {
                _.showOptions(_);
                e.preventDefault();
            }
        });

        _.$textInput.on('keypress.' + EVENT_NAME, function (e: KeyboardEvent) {

            if (e.key !== KEYS.tab || e.shiftKey && e.key !== KEYS.tab) {
                e.preventDefault();
            }

            if (
                e.key === KEYS.enter ||
                e.keyCode === KEYS.space && _.keyedInput.trim() === '' ||
                e.ctrlKey && e.altKey && e.shiftKey && KEYS.space === e.keyCode
            ) {

                _.showOptions(_);
            }
        });
    }

    eventOptionClick() {
        const _ = this;
        
        _.$selectEnhance.on('click.' + EVENT_NAME, '.' + _.params.cssPrefix + '__list-btn', function (e:MouseEvent) {

            e.preventDefault();
             
            _.$selectEnhance.removeClass(_.params.cssPrefix + '--focused');
            _.$textInput.attr({ 'aria-expanded': 'false' });

            _.setSelectionState($(this));

        });
    }

    eventSelectToggle() {
        const _ = this;
        _.$selectEnhance.on('focusin.' + EVENT_NAME, function (e) {

            const closeEvent = 'click.close_' + _.selectId + EVENT_NAME;

            $(document.body).off(closeEvent).on(
                closeEvent, function (e) {
                    setTimeout(() => {
                        const ae = document.activeElement;
                        const aeIsInSelectEnhance = (ae && !_.$selectEnhance.has(ae).length);

                        if (aeIsInSelectEnhance || (_.$selectEnhance[0] as HTMLElement).isSameNode(ae)) {
                            _.blurSelect();

                            $(document.body).off(closeEvent);

                        }
                    }, 100);
                });

        });
    }

    eventKeyboardSearch() {
        const _ = this;

        let keyInputTo: ReturnType<typeof setTimeout>;
        let keyedFound = [];

        _.$selectEnhance.on('keypress.' + EVENT_NAME, function (e) {

            if (_.select.disabled) { return }
            const keyCurr = (e.key.length === 1 ? e.key : '');

            _.keyedInput += keyCurr;

            if (keyInputTo) {

                clearTimeout(keyInputTo);

                keyInputTo = setTimeout(() => {
                    _.keyedInput = "";
                }, _.params.typeAheadDuration);

                if (_.keyedInput.trim()) {

                    const rgx = RegExp(_.keyedInput.trim(), 'i');

                    keyedFound = [].slice.call(_.select.getElementsByTagName('option')).filter((i, el) => rgx.test(el.text))

                    if (keyedFound.length) {

                        _.setSelectionState(_.optionSet.get(keyedFound[0]), false);
                    }
                }
            }
        });
    }

    eventArrowKeys() {

        const _ = this;

        _.$selectEnhance.on('keydown.navigate_' + EVENT_NAME, function (e) {
             
            if (_.select.disabled) { return }

            if (e.key === KEYS.down) {
                if (!_.textInput.isSameNode(document.activeElement)) {

                    e.preventDefault();
                }
                _.nextOptionButton('next');
            }

            if (e.key === KEYS.up) {
                e.preventDefault();
                _.nextOptionButton('prev');
            }

            if (e.key === KEYS.esc && $currSelectEnhance) {
                _.blurSelect();
                _.textInput.focus();
            }
        });
    }

    //  build the HTML for it

    setUpSelectHtml() {
        const _ = this;


        const $selectEnhance = $('<div />').attr({
            class: _.params.cssPrefix,
            id: _.selectId + '_wrap'
        });

        const $textInput = $('<input>').attr({
            type: 'text',
            class: _.params.cssPrefix + '__enable-text',
            role: "combobox",
            'aria-controls': _.selectId + '_listbox',
            'aria-labelledby': _.selectId + '_lbl',
            'aria-autocomplete': 'list',
            'aria-expanded': 'false',
            id: _.selectId + '_input'
        });


        _.$select.wrap($selectEnhance);

        // jQuery, elements need to be bound to the DOM before they
        // can have events attached to them. So this is the solution
        _.$selectEnhance = _.$select.parent();

        if (mobileOS && _.params.mobileNative) {
            // exit if its a mobile device after wrapping for styling
            return;
        }

        $textInput.insertAfter(_.$select);
        _.$select.attr({ tabindex: '-1', 'aria-hidden': 'true' });

        // jQuery, elements need to be bound to the DOM before they
        // can have events attached to them. So this is the solution
        _.$textInput = _.$select.parent().find('#' + _.selectId + '_input');
        _.textInput = _.$textInput[0] as HTMLInputElement;
        SelectEnhance.buildOptionsList(_);
    }

    static buildOptionsList(_: SelectEnhance) {

        const { cssPrefix } = _.params;
        const optGroup = _.select.getElementsByTagName('optgroup');
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

        const options = _.select.getElementsByTagName('option');

        _.$selectList = $('<div>').attr({
            class: cssPrefix + '__list',
            role: 'listbox',
            id: _.selectId + '_listbox',
            'aria-label': _.$label.text() || ''
        });

        const optId = _.selectId || 'select_' + _.index;

        for (let i = 0, l = options.length; i < l; i++) {
            const opt = options[i];
            const id = optId + i;

            if (opt.hidden) continue;

            const valCssStatus = opt.value === '' ? ' ' + cssPrefix + '__list-btn--empty' : '';

            const attrs = {
                type: 'button',
                role: 'option', id,
                'data-value': opt.value,
                'aria-selected': opt.selected + '',
                disabled: opt.disabled ? 'disabled' : null,
                class: cssPrefix + '__list-btn' + valCssStatus
            };
            const $btn: Cash = $('<button/>').attr(attrs).text(opt.textContent);

            _.optionSet.set($btn[0], opt);
            _.optionSet.set(opt, $btn);
            // append to list or optgroup

            hasOptGroup && opt.parentElement.nodeName.toUpperCase() === 'OPTGROUP' ?
                $optGroupWm.get(opt.parentElement).append($btn) :
                _.$selectList.append($btn)
                ;

            if (opt.selected) {
                _.$textInput.attr({ 'aria-activedescendant': id });
                _.$selectEnhance.toggleClass(cssPrefix + '--empty-val', !opt.value.trim());

                if (_.params.emptyValAsPlaceholder && opt.value.trim() === '') {
                    _.$textInput.val('');
                    _.$textInput.attr({ placeholder: opt.text });
                } else {
                    _.$textInput.val(opt.text);
                }

            }
        }

        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];
                _.$selectList.append($optGroupWm.get(group))
            }
        }
        _.$selectList.insertAfter(_.$textInput);

    }

    nextOptionButton(dir: 'next' | 'prev') {

        const _ = this;
        const ae = document.activeElement;
        const $btnList = _.$selectList.find('button');
        const btnLength = $btnList.length;

        if (btnLength && _.textInput.isSameNode(ae)) {
            $btnList.eq(dir === 'next' ? 0 : btnLength - 1)[0].focus();
            return;
        }
         
        for (let i = 0; i < btnLength; i++) {
            const el: HTMLButtonElement = $btnList[i] as HTMLButtonElement;
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
        const _ = this;

        const selectNode = _.select;
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (let i = 0, l = mutationsList.length; i < l; i++) {
                const mutation = mutationsList[i];
                if (mutation.type === 'childList') {

                    SelectEnhance.refreshOptions(_.select);
                }
                else if (mutation.type === 'attributes') {
                    _.$selectEnhance.toggleClass(
                        _.params.cssPrefix + '--disabled',
                        _.select.disabled
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
            const selectIntersectionObserver = new IntersectionObserver(function (selects) {

                _.selectListBoxInFullView = selects[0].intersectionRatio === 1

            }, { threshold: [0, 1] });

            _.$selectList[0] && selectIntersectionObserver.observe(_.$selectList[0]);
        }
    }

    static getListPosition() {
        if (currSelectInstance) {
            const _ = currSelectInstance;

            const selWrapPosTop = (_.$selectEnhance as any).offset().top;
            const selListHeight = _.$selectList.height();

            const listPosAndHeight = (_.$selectEnhance as any).offset().top +
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
            const _ = elemData(this, `${DATA_NAME}_instance`);

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
            const _ = elemData(this, `${DATA_NAME}_instance`);

            _.$selectEnhance.off('keydown.' + EVENT_NAME);
            _.$selectEnhance.off('keydown.navigate_' + EVENT_NAME);
            _.$selectEnhance.off('click.' + EVENT_NAME);
            _.$selectEnhance.off('focusout.' + EVENT_NAME);
            _.$selectEnhance.off('blur.' + EVENT_NAME);
            _.$label.off('click.' + EVENT_NAME);
            $(document.body).off('click.close_' + _.selectId + EVENT_NAME);
            // the window event will just stay
            _.$select.insertAfter(_.$selectEnhance);
            _.$select.attr({ tabindex: null, 'aria-hidden': null });
            _.$select.off('mouseup.' + EVENT_NAME);
            _.$select.off('change.' + EVENT_NAME);

            if (_.selectboxObserver) {
                _.selectboxObserver.disconnect();
            }
            _.$selectEnhance.remove();

            elemData(this, `${DATA_NAME}_params`, null, true);
            elemData(this, `${DATA_NAME}_instance`, null, true);
        });
    }
}

declare module 'cash-dom' {
    interface Cash {
        selectEnhance(options?: ISelectEnhanceOptions | StringPluginArgChoices): Cash;
    }
}