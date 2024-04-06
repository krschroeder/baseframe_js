import type { Cash } from "cash-dom";
import type { StringPluginArgChoices } from './types';
export interface ISelectEnhanceDefaults {
    cssPrefix: string;
    mobileNative: boolean;
    emptyValAsPlaceholder: boolean;
    blurDuration: number;
    typeAheadDuration: number;
    observeSelectbox: boolean;
    focusIn($select: Cash): any;
    focusOut($select: Cash): any;
    beforeChange($select: Cash): any;
    afterChange($select: Cash): any;
}
export interface ISelectEnhanceOptions extends Partial<ISelectEnhanceDefaults> {
}
export default class SelectEnhance {
    $select: Cash;
    select: HTMLSelectElement;
    params: ISelectEnhanceDefaults;
    index: number;
    id: string;
    selectId: string;
    isReadOnly: boolean;
    $label: Cash;
    $selectEnhance: Cash;
    $textInput: Cash;
    textInput: HTMLInputElement;
    $selectList: Cash;
    optionSet: WeakMap<object, any>;
    optionsShown: boolean;
    selectboxObserver: MutationObserver;
    selectListBoxInFullView: boolean;
    keyedInput: string;
    static defaults: ISelectEnhanceDefaults;
    static get version(): string;
    constructor(element: HTMLSelectElement, options: ISelectEnhanceOptions | StringPluginArgChoices, index: number);
    mobileOnlyIfNavite(): void;
    blurSelect(): void;
    setSelectionState($btn: Cash, doBlur?: boolean): void;
    eventLabelClick(): void;
    showOptions(s: SelectEnhance): void;
    eventShowOptions(): void;
    eventOptionClick(): void;
    eventSelectToggle(): void;
    eventKeyboardSearch(): void;
    eventArrowKeys(): void;
    setUpSelectHtml(): void;
    static buildOptionsList(s: SelectEnhance, $selectList?: Cash): void;
    nextOptionButton(dir: 'next' | 'prev'): void;
    selectInputMutationObserver(): void;
    static eventScrollGetListPosition(): void;
    observeSelectListBoxInFullView(): void;
    static getListPosition(): void;
    static refreshOptions(element: any): void;
    static remove(element: Cash, plugin?: SelectEnhance): void;
}
declare module 'cash-dom' {
    interface Cash {
        selectEnhance(options?: ISelectEnhanceOptions | StringPluginArgChoices): Cash;
    }
}
