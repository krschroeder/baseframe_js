import type { WinSetTimeout, StringPluginArgChoices } from './types';
import $be, { type BaseElem } from "base-elem-js";

import Store from "./core/Store";
import { KEYS } from "./core/constants";
import { d, isMobileOS, getDataOptions, noop, setParams } from "./util/helpers";
import type { EventName } from 'base-elem-js';
 

export interface ISelectEnhanceDefaults {
    cssPrefix: string;
    cssListModifer: string;
    mobileNative: boolean;
    emptyValAsPlaceholder: boolean;
    blurDuration: number;
    typeAheadDuration: number;
    observeSelectbox: boolean;
    focusIn(select: HTMLSelectElement);
    focusOut(select: HTMLSelectElement);
    beforeChange(select: HTMLSelectElement);
    afterChange(select: HTMLSelectElement);
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


const { make, findBy } = $be;

// wrap the select first
const mobileOS = isMobileOS();

// helper
// const getSelectedOptNode = ($el) => $el.find('option').filter(elem => elem.selected).elem[0];


let currSelectEnhance:HTMLDivElement | null = null;

export default class SelectEnhance {

    public $select: BaseElem;
    public select: HTMLSelectElement;
    public params: ISelectEnhanceDefaults;
    public index: number;
    public id: string;
    public selectId: string;
    public isReadOnly: boolean;
    public $label: BaseElem;
    public $selectEnhance: BaseElem;
    public selectEnhance: HTMLDivElement;
    public $textInput: BaseElem;
    public textInput: HTMLInputElement;
    public $selectList: BaseElem;
    public selectList: HTMLDivElement;
    public optionSet: WeakMap<object, any>;
    public listPosTop: boolean;
    public optionsShown: boolean;
    public selectboxObserver: MutationObserver;
    public selectListBoxInFullView: boolean;
    private keyedInput: string;
    private posTimeout: WinSetTimeout;
    private bodyCloseEvt: string;
    public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;
    

    constructor(element: HTMLSelectElement, options: ISelectEnhanceOptions | StringPluginArgChoices, index: number) {
        const s = this;
        const dataOptions = getDataOptions(element, EVENT_NAME);

        s.index = index;
        s.$select = $be(element);
        s.select = element;
        s.id = s.$select.attr('id') || s.$select.attr('name') || 'select_enhance_' + index;
        s.selectId = s.id + '_enhance';
        s.$label = $be(`label[for="${s.id}"]`);
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

        if (s.$label.hasEls) {
            s.$label.attr({ id: s.selectId + '_lbl' });
        }
        
        s.params = setParams(SelectEnhance.defaults, options, dataOptions);

        s.#setUpSelectHtml();

        if (mobileOS && s.params.mobileNative || s.isReadOnly) {
           
            s.#mobileOnlyIfNavite();

        } else {
            // 
            // attach events
            // 

            if (s.params.observeSelectbox) {
                s.selectInputMutationObserver();
            }
            s.#eventLabelClick();
            s.#eventKeyboardSearch();
            s.#eventShowOptions();
            s.#eventOptionClick();
            s.#eventArrowKeys();
            s.#eventResizeClose();
            s.#inFullView();
        }

        return s;
    }

    #mobileOnlyIfNavite() {
        const s = this;

        let prevElSelectedVal = s.#getSelectedOptNode(s.$select);

        s.$select.on(`mouseup.${EVENT_NAME}`, (ev, elem) => {

            if (!elem === prevElSelectedVal) {
                s.params.beforeChange(s.select);
            }

        }, 'option')
        .on(`change.${EVENT_NAME}`, (ev, elem) => {
            s.params.afterChange(s.select);
            prevElSelectedVal = s.#getSelectedOptNode(s.$select);
        });
    }

    #getSelectedOptNode($el) {
        return $el.find('option').filter(elem => elem.selected).elem[0];
    }

    showOptions() {
        const s = this;
        if (s.select.disabled || s.optionsShown) return;
        s.optionsShown = true; 
        

        currSelectEnhance = s.selectEnhance;
        const {cssPrefix} = s.params;
        const $selectedBtn = s.$selectList.find('[aria-selected="true"]');
        s.$selectList.css({display: null});
        d.body.append(s.selectList);
        s.$selectEnhance.tgClass(cssPrefix + '--focused');
        s.$textInput.attr({ 'aria-expanded': 'true' });

        s.listPosition();
        s.eventScrollGetListPosition(true);
        s.eventOutsideClickClose();
        
        if ($selectedBtn.hasEls) {
            ($selectedBtn.elem[0] as HTMLElement).focus();
        }

        s.params.focusIn(s.select);
    }

    closeOptions(focusBack: boolean = true) {
        const s = this;
        const { cssPrefix} = s.params;
        
        s.optionsShown = false;

        s.$selectEnhance
            .addClass(cssPrefix + '--blurring')
            .rmClass(cssPrefix + '--focused');

        s.$textInput.attr({ 'aria-expanded': 'false' });
        
        s.$selectList
            .addClass(cssPrefix + '__list--blurring')
            .rmClass(cssPrefix + '__list--focused');

        // remove the close event on the body
        $be(d.body).off(s.bodyCloseEvt as EventName);

        setTimeout(() => {
            s.$selectEnhance
                .rmClass([`${cssPrefix}--blurring`, `${cssPrefix}--pos-above`])
                .insert(s.$selectList);
            
            s.$selectList
                .css({display: 'none'})
                .rmClass([
                    `${cssPrefix}__list--blurring`,
                    `${cssPrefix}__list--focused`,
                    `${cssPrefix}__list--pos-above`
                ]);
            s.params.focusOut(s.select);
          
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

        s.params.beforeChange(s.select);

        selectedOpt.selected = true;

        s.params.afterChange(s.select); 
        s.$selectList.find('.' + cssPrefix + '__list-btn[aria-selected]').attr({ 'aria-selected': 'false' });

        $be(optionBtn).attr({ 'aria-selected': 'true' });
        s.$textInput.attr({ 'aria-activedescendant': optionBtn.id });

        // add a class whether there is an input value or not
        s.$selectEnhance.tgClass(cssPrefix + '--empty-val', !selectedOpt.value.trim());
        s.select.dispatchEvent(new Event('change'));

        if (s.params.emptyValAsPlaceholder && selectedOpt.value.trim() === '') {
            s.$textInput.attr({ value: '', placeholder: selectedOpt.text });
        } else {
            s.$textInput.attr({value: selectedOpt.text});
        }

        if (doBlur)s.closeOptions();
        else optionBtn.focus();
    }
    
    // region Events 

    #eventLabelClick() {
        const s = this;

        s.$label.on(`click.${EVENT_NAME}`, (ev: MouseEvent) => {
            ev.preventDefault();
            if (!s.select.disabled) s.textInput.focus();
        });
    }

    #eventResizeClose() {
        const s = this;
        $be(window).on(`resize.${EVENT_NAME}`, () => {
            if (s.optionsShown) s.closeOptions();
        });
    }

    #eventShowOptions() {
        const s = this;

        s.$textInput.on(`click.${EVENT_NAME}`, () => {
            if (s.select.disabled) return;
            s.showOptions();
        })
        .on(`keydown.${EVENT_NAME}`, (ev: KeyboardEvent) => {
            // Only works on keydown event
            if (ev.key === KEYS.down || ev.key === KEYS.up) {
                
                s.showOptions();
                ev.preventDefault();
            }
        }).on(`keypress.${EVENT_NAME}`, (ev: KeyboardEvent) => {
             
            if (
                ev.key !== KEYS.tab || 
                ev.shiftKey && 
                ev.key !== KEYS.tab
            ) {
                ev.preventDefault();
            }

            if (
                ev.code === KEYS.space && s.keyedInput.trim() === '' || // space key
                ev.ctrlKey && ev.altKey && ev.shiftKey && KEYS.space === ev.code
            ) {
                
                s.showOptions();
            }
        });
    }

    #eventOptionClick() {
        const s = this;
        const { cssPrefix } = s.params;

        const selectedOption = (elem: HTMLDivElement) => {
            s.setSelectionState(elem);
            s.$selectEnhance.rmClass(cssPrefix + '--focused');
            setTimeout(() => s.closeOptions(), 200);
        }
        // mouse click
        s.$selectList.on(`click.${EVENT_NAME}`, (ev:MouseEvent, elem) => {
            selectedOption(elem as HTMLDivElement);
            ev.preventDefault();
        }, `.${cssPrefix}__list-btn`)
        // keyboard click
        .on(`keypress.${EVENT_NAME}`, (ev:KeyboardEvent, elem) => {
            if (
                ev.key === KEYS.enter ||
                ev.code === KEYS.space && s.keyedInput.trim() === ''
            ) { 
                selectedOption(elem as HTMLDivElement);
                ev.preventDefault();
            }
        }, `.${cssPrefix}__list-btn`);
    }

    eventOutsideClickClose() {
        const s = this;
        setTimeout(() => {
            const bodyEvt = s.bodyCloseEvt as EventName;
            $be(d.body).off(bodyEvt).on(bodyEvt, (ev: MouseEvent, elem) => {
                const activeElem= d.activeElement;
              
                if (activeElem&& !s.selectList.contains(activeElem as HTMLElement)) {
                    s.closeOptions(); 
                }
            });
        }, 100);
    }

    #eventKeyboardSearch() {
        const s = this;

        let keyInputTo: WinSetTimeout | null = null;
        let changedTo: WinSetTimeout | null = null;
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
    
        s.$selectEnhance.on(`keypress.${EVENT_NAME}`, keyboardSearch);
        s.$selectList.on(`keypress.${EVENT_NAME}`, keyboardSearch);
    }

    #eventArrowKeys() {

        const s = this;
        s.$selectEnhance.on(`keydown.navigate_${EVENT_NAME}`, (ev: KeyboardEvent, elem: HTMLElement) => {
            if (s.select.disabled || !s.optionsShown) { return }

            if (ev.key === KEYS.down) {
                if (!s.textInput.isSameNode(d.activeElement)) {

                    ev.preventDefault();
                }
                s.traverseOptions(elem, 'next');
            }

            if (ev.key === KEYS.esc ) {
                s.closeOptions();
            }

            if (ev.key === KEYS.tab ) {
                s.closeOptions(false);
            }
        })

        s.$selectList.on(`keydown.navigate_${EVENT_NAME}`, (ev: KeyboardEvent, elem) => {
             
            if (s.select.disabled || !s.optionsShown) { return }
            
            const activeElem= d.activeElement as HTMLElement;

            if (ev.key === KEYS.down) {
                if (!s.textInput.isSameNode(activeElem)) {

                    ev.preventDefault();
                }  
                s.traverseOptions(activeElem, 'next');
            }

            if (ev.key === KEYS.up) {
                ev.preventDefault();
                s.traverseOptions(activeElem, 'prev');
            }

            if (ev.key === KEYS.esc ) {
                s.closeOptions();

            }
        });
    }

    // region Build Options

    #setUpSelectHtml() {
        const 
            s = this,
            selectEnhance = make(`div.${s.params.cssPrefix}#${s.selectId}_wrap`),
            textInput = make(`input.${s.params.cssPrefix}__enable-text`,{
                type: 'text',
                role: "combobox",
                ariaExpanded: 'false',
                 
                id: s.selectId + '_input'
            }),
            $selectEnhance = $be(selectEnhance),
            $textInput = $be(textInput)
        ;
        // TS throws error
        const otherAttrs = [
            ['aria-controls',s.selectId + '_listbox'],
            ['aria-owns', s.selectId + '_listbox'],
            ['aria-labelledby', s.selectId + '_lbl'],
            ['aria-autocomplete', 'list'],
            ['aria-activedescendant','']
        ];

        for (const [attr,val] of otherAttrs) {
            textInput.setAttribute(attr,val);
        }
        
        s.$textInput = $textInput;
        s.textInput = textInput;
        s.$selectEnhance = $selectEnhance;
        s.selectEnhance = selectEnhance as HTMLDivElement;
        s.$select
            .attr({ tabindex: '-1', 'aria-hidden': 'true' })
            .insert($selectEnhance, 'after');

        $selectEnhance.insert(s.$select);
 
        if (!(mobileOS && s.params.mobileNative || s.isReadOnly)) {   
            s.$select.insert($textInput, 'after');
            SelectEnhance.buildOptionsList(s);
        }
    }

    static buildOptionsList(s: SelectEnhance, $selectList?: BaseElem) {

        const 
            { cssListModifer, cssPrefix } = s.params,
            optGroup = findBy('tag','optgroup', s.select) as HTMLOptGroupElement[],
            hasOptGroup = !!optGroup.length,
            $optGroupWm = new WeakMap(),
            modifierCss =  " " + (cssListModifer ? cssPrefix + '__list--' + cssListModifer : '')
        ;

        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];
                const optGroupElem = make('div',{
                    className: cssPrefix + '__optgroup',
                    role: 'group',
                    ariaLabel: group.label || "",
                    textContent: group.label || ""
                });
                $optGroupWm.set(group, $be(optGroupElem));
            }
        }

        const options = s.select.options;
 
        s.$selectList = $selectList ? $selectList : $be(make('div',{
            className: cssPrefix + '__list' + modifierCss,
            role: 'listbox',
            id: s.selectId + '_listbox',
            ariaLabel: s.$label.text() || ''
        }));

        s.selectList = s.$selectList.elem[0] as HTMLDivElement;

        const optId = s.selectId || 'select_' + s.index;

        for (let i = 0, l = options.length; i < l; i++) {
            const option = options[i];
            const id = optId + i;

            if (option.hidden) continue;
            const isInOptGrup = option.parentElement.nodeName.toUpperCase() === 'OPTGROUP';
            const valCssStatus = option.value === '' ? ' ' + cssPrefix + '__list-btn--empty' : '';
            const optionBtn = make(`div.${cssPrefix}__list-btn${valCssStatus}`,{
                tabIndex: 0,
                role: 'option', id,
                ariaSelected: option.selected + '',
                // disabled: option.disabled ? 'disabled' : null,
                textContent: option.textContent
            });
            optionBtn.dataset.disabled = option.disabled ? 'disabled' : null,
            optionBtn.dataset.value = option.value;

            s.optionSet.set(optionBtn, option);
            s.optionSet.set(option, optionBtn);
            // append to list or optgroup

            if (hasOptGroup && isInOptGrup) $optGroupWm.get(option.parentElement).insert(optionBtn);
            else s.$selectList.insert(optionBtn);

            if (option.selected) {
                s.$textInput.attr({ 'aria-activedescendant': id });
                s.$selectEnhance.tgClass(cssPrefix + '--empty-val', !option.value.trim());

                if (s.params.emptyValAsPlaceholder && option.value.trim() === '') {
                    s.$textInput.attr({value: ''});
                    s.$textInput.attr({ placeholder: option.text });
                } else s.$textInput.attr({value: option.text});
            }
        }

        if (hasOptGroup) {
            for (let i = 0, l = optGroup.length; i < l; i++) {
                const group = optGroup[i];
                s.$selectList.insert($optGroupWm.get(group))
            }
        }
    }

    traverseOptions(elem: HTMLElement, dir: 'next' | 'prev') {
        
        const parentElem = elem.parentElement;
        const nextOption = (dir === 'next' ? 
            elem.nextElementSibling : 
            elem.previousElementSibling
        ) as HTMLElement;
       
        if (nextOption) nextOption.focus();
        if (!nextOption && parentElem.role === 'group') {
            const nextOptGroup = dir === 'next' ? 
                parentElem.nextElementSibling : 
                parentElem.previousElementSibling
            ;
           
            if (nextOptGroup) {
                if (dir === 'next') {
                    (nextOptGroup.firstElementChild as HTMLElement)?.focus();
                } else (nextOptGroup.lastElementChild as HTMLElement)?.focus();
            }
        }
    }

    // region Mutation Observer
    selectInputMutationObserver() {
        const s = this;
        const selectNode = s.select;
        const config = { attributes: true, childList: true, subtree: true };

        // Create an observer instance linked to the callback function
        s.selectboxObserver = new MutationObserver(function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (let i = 0, l = mutationsList.length; i < l; i++) {
                const mutation = mutationsList[i];
                if (mutation.type === 'childList') {

                    SelectEnhance.refreshOptions(s.select);
                }
                else if (mutation.type === 'attributes') {
                    s.$selectEnhance.tgClass(
                        s.params.cssPrefix + '--disabled',
                        s.select.disabled
                    );
                }
            }
        });
        // Start observing the target node for configured mutations
        s.selectboxObserver.observe(selectNode, config);
    }

    // region List Position
    eventScrollGetListPosition(init: boolean = true) {
        const s = this;
        const evt = `scroll.${EVENT_NAME}`;

        if (init) {
            
            $be(window).off(evt).on(evt, () => {
                s.posTimeout && clearTimeout(s.posTimeout);
                s.posTimeout = setTimeout(() => s.listPosition(), 100);
            });
        } else {
            $be(window).off(evt);
        }
    }

    #inFullView() {
        const s = this;

        if (window.IntersectionObserver) {
            const selectIntersectionObserver = new IntersectionObserver(function (selects) {

                s.selectListBoxInFullView = selects[0].intersectionRatio === 1;

            }, { threshold: [0, 1] });

            s.selectList && selectIntersectionObserver.observe(s.selectList);
        }
    }
    
    listPosition() {
        const s = this;

        if (s.optionsShown) {
            
            const 
                selWrapRects = s.$selectEnhance.elemRects(),
                { cssPrefix } = s.params,
                { innerHeight, scrollY, scrollX } = window,
                selWrapTop = selWrapRects.top + scrollY,
                selWrapPosBot = selWrapTop + selWrapRects.height,
                selWrapWidth = s.selectEnhance.offsetWidth,
                selListHeight = s.selectList.offsetHeight,
                scrollYBot = scrollY + innerHeight,
                isSpaceAbove = selWrapTop - scrollY > selListHeight,
                isSpaceBelow = scrollYBot - selWrapPosBot > selListHeight,

                // If space below use that, else if no space at all prefer space below
                canPlaceBelow = isSpaceBelow ? true : isSpaceAbove ? false: true
            ;

            s.$selectEnhance.tgClass(cssPrefix + '--pos-above', !canPlaceBelow);
            s.$selectList
                .css({ 
                    left: (selWrapRects.left + scrollX) + 'px', 
                    top: (canPlaceBelow ? selWrapPosBot : selWrapTop - selListHeight) + 'px', 
                    width: selWrapWidth + 'px'
                })
                .tgClass(cssPrefix + '__list--focused', s.optionsShown)
                .tgClass(cssPrefix + '__list--pos-above', !canPlaceBelow);
        }
    }

    // region Static Methods
    static refreshOptions(element) {
        $be(element).each((elem) => {
            const s: SelectEnhance = Store(elem, DATA_NAME);

            if (s) {

                s.$selectList.empty();
                s.optionSet = new WeakMap(); 
                SelectEnhance.buildOptionsList(s, s.$selectList);
            } else {
                console.warn(`No instance of a selectbox`, element);
            }
        });
    }

    static remove(element: BaseElem, plugin?: SelectEnhance) {

        $be(element).each((elem) => {
            const s: SelectEnhance = plugin || Store(elem, DATA_NAME);

            s.$selectEnhance.off([
                `keydown.${EVENT_NAME}`,
                `keydown.navigate_${EVENT_NAME}`,
                `click.${EVENT_NAME}`,
                `focusout.${EVENT_NAME}`,
                `blur.${EVENT_NAME}`
            ]);

            s.$label.off(`click.${EVENT_NAME}`);
            $be(d.body).off(s.bodyCloseEvt as EventName);
            $be(window).off(`resize.${EVENT_NAME}`);
            // the window event will just stay
            s.$selectEnhance
                .insert(s.$select, 'after')
                .attr({ tabindex: null, 'aria-hidden': null })
                .off([`mouseup.${EVENT_NAME}`,`change.${EVENT_NAME}`]);

            if (s.selectboxObserver) s.selectboxObserver.disconnect();
            s.$selectEnhance.remove();

            Store(elem, DATA_NAME, null);
        });
    }
}

 

export interface SelectEnhancePlugin {
    selectEnhance(options?: ISelectEnhanceOptions | StringPluginArgChoices): BaseElem;
}

declare module 'base-elem-js' {
    interface BaseElem extends SelectEnhancePlugin {}
}