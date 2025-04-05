// import type { BaseElem, Selector } from "cash-dom";
import type { StringPluginArgChoices } from './types';

// import $ from 'cash-dom';
import $be, { type BaseElem, type SelectorRoot } from "base-elem-js";
import { getDataOptions } from "./util/helpers";
import Store from "./core/Store";

export interface IToasterDefaults {
    content: string;
    duration: number;
    ariaLive: 'off' | 'polite' | 'assertive';
    animationDuration: number;
    appendTo: SelectorRoot;
    outerCss: string;
    closeIconCss: string;
    closeTextCopy: string;
    enabledCss: string;
    dismissCss: string;
    btnDismissCss: string;
    cssGroupKey: string;
    oneOnly: boolean;
}

export interface IToasterOptions extends Partial<IToasterDefaults>{
    content: string;
}

type ToastrContent = string | HTMLElement | BaseElem | (HTMLElement | BaseElem)[];

const VERSION = "1.0.0";
const DATA_NAME = 'Toastr';
const EVENT_NAME = 'toastr';

const DEFAULTS: IToasterDefaults = {
    duration: 3000,
    appendTo: document.body,
    animationDuration: 500,
    content: '',
    outerCss: 'toastr',
    enabledCss: 'toastr--enabled',
    dismissCss: 'toastr--dismiss',
    btnDismissCss: 'toastr__btn-dismiss',
    closeIconCss: 'ico i-close',
    ariaLive: 'polite',
    closeTextCopy: 'Dismiss',
    cssGroupKey: 'std',
    oneOnly: false
};

const toastContainers: Map<string, BaseElem> = new Map();
const { make } = $be.static;

let currentlyToastingGlobal = false;

export default class Toastr {

    public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;
    
    public static DismissedEventName = 'toastDismissed';

    private toastrFinallyTimer: ReturnType<typeof setTimeout>;ß
    private currentlyToasting: boolean;
    private toasterBodyBuilt: boolean;

    public $element: BaseElem;
    public $toastrBody: BaseElem;
    public $toastrWrap: BaseElem;
    public params: IToasterDefaults;

    constructor(element: HTMLElement, options: IToasterOptions | StringPluginArgChoices) {
        const s = this;

        const dataOptions = getDataOptions(element, EVENT_NAME);
        
        //state
        s.$element = $be(element);
        s.toastrFinallyTimer = null;
        s.$toastrBody = null;
        s.$toastrWrap = null;

        s.currentlyToasting = false;

        s.params = Object.assign({}, Toastr.defaults, options, dataOptions);
        s.$element.on([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`], () => s.launch());

        return s;
    }

    dismiss() {
        const s = this;
        const { animationDuration, dismissCss } = s.params;

        s.toastrFinallyTimer && clearTimeout(s.toastrFinallyTimer);
        s.$toastrWrap.addClass(dismissCss);

        setTimeout(() => {
            const $toatrContainer = s.getToasterContainer();
            s.$toastrWrap.rmClass(dismissCss).remove();

            if (!$toatrContainer.find('div').hasElems()) {
                s.getToasterContainer().remove();
            }
            s.currentlyToasting = false;
            currentlyToastingGlobal = false;

        }, animationDuration);
    }

    setContent(content, updateNow = false) {
        const s = this;

        Object.assign(s.params, { content });

        if (updateNow) {
            s.updateContent(s.params.content);
        }
    }

    launch() {
        const s = this;

        const { content, dismissCss, duration, enabledCss, oneOnly } = s.params;

        if (!s.currentlyToasting) {

            if (currentlyToastingGlobal && oneOnly) {
                return;
            }

            if (!s.toasterBodyBuilt) {
                s.buildElems();
            }

            s.$toastrWrap.rmClass(`${dismissCss} ${enabledCss}`);

            s.updateContent(content);

            $be(document.body).insert(
                s.getToasterContainer().insert(s.$toastrWrap)
            );

            setTimeout(() => s.$toastrWrap.addClass(enabledCss), 0);
            // Auto remove if not dismissed
            s.toastrFinallyTimer = setTimeout(() => s.dismiss(), duration);    
            s.currentlyToasting = true;
            currentlyToastingGlobal = true;
        }
    }

    private getToasterContainer(): BaseElem {
        const { cssGroupKey, outerCss } = this.params;

        const toasterWrapCss = `${outerCss}-wrap ${outerCss}-wrap--${cssGroupKey}`;

        if (!toastContainers.has(toasterWrapCss)) {
            toastContainers.set(toasterWrapCss,
                $be(make(`div.${toasterWrapCss}`))
            );
        }

        return toastContainers.get(toasterWrapCss);
    }

    private buildElems() {
        const s = this;
        const { ariaLive, btnDismissCss, closeIconCss, closeTextCopy, outerCss } = s.params;
        const $btn = $be(make(`button.${btnDismissCss}`,{ type: 'button' }));
        const $icon = $be(make(`i.${closeIconCss}`, `<span class="sr-only">${closeTextCopy}</span>`));
        
        s.$toastrBody = $be(make(`div.${s.params.outerCss}__body`));
        s.$toastrWrap = $be(make(`div.${outerCss}`,{role: 'alert', ariaLive })).insert([
            s.$toastrBody,
            $btn.insert($icon)
        ]);

        s.toasterBodyBuilt = true;
        // click event to dismiss
        s.$toastrWrap.on('click.dismiss', () => s.dismiss(),'button');
    }

    private updateContent(content: ToastrContent) {
        const s = this;

        if (s.$toastrBody) {

            s.$toastrBody.empty();

            if ('string' === typeof content) {
                s.$toastrBody.html(content);
            } else s.$toastrBody.insert(content);
            
        }
    }

    static setContent(element: BaseElem, content: string, updateNow = false) {
        $be(element).each((elem) => {
            const s: Toastr = Store(elem, DATA_NAME);

            Object.assign(s.params, { content });
            if (updateNow) s.updateContent(s.params.content);
        });
    }

    static remove(element: BaseElem, plugin?: Toastr) {
        $be(element).each((elem) => {
            const s: Toastr = plugin || Store(elem, DATA_NAME);

            s.$element.off([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`]);

            Store(elem, DATA_NAME, null);
        })
    }
}

declare module 'base-elem-js' {
    interface BaseElem {
        toastr(options?: IToasterOptions | StringPluginArgChoices): BaseElem;
    }
}