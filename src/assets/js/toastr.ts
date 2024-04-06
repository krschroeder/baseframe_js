import type { Cash, Selector } from "cash-dom";
import type { StringPluginArgChoices } from './types';

import $ from 'cash-dom';
import { getDataOptions } from "./util/helpers";
import Store from "./core/Store";

export interface IToasterDefaults {
    content: string;
    duration: number;
    ariaLive: 'off' | 'polite' | 'assertive';
    animationDuration: number;
    appendTo: Selector;
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

const toastContainers: Map<string, Cash> = new Map();

let currentlyToastingGlobal = false;

export default class Toastr {

    static get version() { return VERSION; }
    public static Defaults = DEFAULTS;
    public static DismissedEventName = 'toastDismissed';

    private toastrFinallyTimer: ReturnType<typeof setTimeout>;
    private currentlyToasting: boolean;
    private toasterBodyBuilt: boolean;

    public $element: Cash;
    public $toastrBody: Cash;
    public $toastrWrap: Cash;
    public params: IToasterDefaults;

    constructor(element: HTMLElement, options: IToasterOptions | StringPluginArgChoices) {
        const s = this;

        const dataOptions = getDataOptions(element, EVENT_NAME);
        
        //state
        s.$element = $(element);
        s.toastrFinallyTimer = null;
        s.$toastrBody = null;
        s.$toastrWrap = null;

        s.currentlyToasting = false;

        s.params = $.extend({}, Toastr.Defaults, options, dataOptions);
        s.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, () => s.launch());

        return s;
    }

    dismiss() {
        const s = this;
        const { animationDuration, dismissCss } = s.params;

        s.toastrFinallyTimer && clearTimeout(s.toastrFinallyTimer);
        s.$toastrWrap.addClass(dismissCss);

        setTimeout(() => {
            const $toatrContainer = s.getToasterContainer();
            s.$toastrWrap.removeClass(dismissCss).detach();

            if (!$toatrContainer.children('div').length) {
                s.getToasterContainer().detach();
            }
            s.currentlyToasting = false;
            currentlyToastingGlobal = false;

        }, animationDuration);
    }

    setContent(content, updateNow = false) {
        const s = this;

        $.extend(s.params, { content });

        if (updateNow) {
            s.updateContent(s.params.content)
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

            s.$toastrWrap.removeClass(`${dismissCss} ${enabledCss}`);

            s.updateContent(content);

            $(document.body).append(
                s.getToasterContainer().append(s.$toastrWrap)
            );

            setTimeout(() => s.$toastrWrap.addClass(enabledCss), 0);
            // Auto remove if not dismissed
            s.toastrFinallyTimer = setTimeout(() => s.dismiss(), duration);    
            s.currentlyToasting = true;
            currentlyToastingGlobal = true;
        }
    }

    private getToasterContainer(): Cash {
        const { cssGroupKey, outerCss } = this.params;

        const toasterWrapCss = `${outerCss}-wrap ${outerCss}-wrap--${cssGroupKey}`;

        if (!toastContainers.has(toasterWrapCss)) {
            toastContainers.set(toasterWrapCss,
                $('<div/>').attr({
                    class: toasterWrapCss
                })
            );
        }

        return toastContainers.get(toasterWrapCss);
    }

    private buildElems() {
        const s = this;
        const { ariaLive, btnDismissCss, closeIconCss, closeTextCopy, outerCss } = s.params;

        s.$toastrBody = $('<div>').attr({ class: s.params.outerCss + '__body' });
        s.$toastrWrap = $('<div>').attr({ class: outerCss, role: 'alert', 'aria-live': ariaLive }).append(
            s.$toastrBody,
            $('<button>').attr({ type: 'button', class: btnDismissCss }).append(
                $('<i>').attr({ class: closeIconCss }).append(
                    $('<span>').attr({ class: 'sr-only' }).text(closeTextCopy)
                )
            )
        );

        s.toasterBodyBuilt = true;
        // click event to dismiss
        s.$toastrWrap.on('click', 'button', () => s.dismiss());
    }

    private updateContent(content: Selector) {
        const s = this;

        if (s.$toastrBody) {

            s.$toastrBody.empty();

            if ('string' === typeof content) {
                s.$toastrBody.html(content);
            } else {
                s.$toastrBody.append(content);
            }
        }
    }

    static setContent(element: Cash, content: string, updateNow = false) {
        $(element).each(function () {
            const s: Toastr = Store(this, DATA_NAME);

            $.extend(s.params, { content });

            if (updateNow) {
                s.updateContent(s.params.content)
            }
        });
    }

    static remove(element: Cash, plugin?: Toastr) {
        $(element).each(function () {
            const s: Toastr = plugin || Store(this, DATA_NAME);

            s.$element.off(`click.${EVENT_NAME} ${EVENT_NAME}`);

            Store(this, DATA_NAME, null);
        })
    }
}

declare module 'cash-dom' {
    interface Cash {
        toastr(options?: IToasterOptions | StringPluginArgChoices): Cash;
    }
}