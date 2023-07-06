import type { Cash, Selector } from "cash-dom";
import type { StringPluginArgChoices } from './types/shared';

import $ from 'cash-dom';
import parseObjectFromString from './util/parse-object-from-string';
import elemData from "./util/elem-data";
import { CSS_TRANSISTION_DELAY } from "./util/constants";

export interface IToasterDefaults {
    duration?: number;
    ariaLive?: 'off' | 'polite' | 'assertive';
    animationDuration?: number;
    appendTo?: Selector;
    content: Selector;
    outerCss?: string;
    closeIconCss?: string;
    closeTextCopy?: string;
    enabledCss?: string;
    dismissCss?: string;
    btnDismissCss?: string;
    cssGroupKey?: string;
    oneOnly?: boolean;
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
    static get pluginName() { return DATA_NAME; }
    public static Defaults = DEFAULTS;
    public static DismissedEventName = 'toastDismissed';

    private toastrFinallyTimer: ReturnType<typeof setTimeout>;
    private currentlyToasting: boolean;
    private toasterBodyBuilt: boolean;

    public $element: Cash;
    public $toastrBody: Cash;
    public $toastrWrap: Cash;
    public params: IToasterDefaults;

    constructor(element: HTMLElement, options: IToasterDefaults | StringPluginArgChoices) {
        const _ = this;

        const dataOptions = parseObjectFromString($(element).data(EVENT_NAME + '-options'));
        const instanceOptions = $.extend({}, Toastr.Defaults, options, dataOptions);
        //state
        _.$element = $(element);
        _.toastrFinallyTimer = null;
        _.$toastrBody = null;
        _.$toastrWrap = null;

        _.currentlyToasting = false;

        elemData(element, `${DATA_NAME}_params`, instanceOptions);

        _.params = elemData(element, `${DATA_NAME}_params`);
        _.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, () => _.launch());
    }

    dismiss() {
        const _ = this;
        const { animationDuration, dismissCss } = _.params;

        _.toastrFinallyTimer && clearTimeout(_.toastrFinallyTimer);
        _.$toastrWrap.addClass(dismissCss);

        setTimeout(() => {
            const $toatrContainer = _.getToasterContainer();
            _.$toastrWrap.removeClass(dismissCss).detach();

            if (!$toatrContainer.children('div').length) {
                _.getToasterContainer().detach();
            }
            _.currentlyToasting = false;
            currentlyToastingGlobal = false;

        }, animationDuration);
    }

    setContent(content, updateNow = false) {
        const _ = this;

        $.extend(_.params, { content });

        if (updateNow) {
            _.updateContent(_.params.content)
        }
    }

    launch() {
        const _ = this;

        const { content, dismissCss, duration, enabledCss, oneOnly } = _.params;

        if (!_.currentlyToasting) {

            if (currentlyToastingGlobal && oneOnly) {
                return;
            }

            if (!_.toasterBodyBuilt) {
                _.buildElems();
            }

            _.$toastrWrap.removeClass(`${dismissCss} ${enabledCss}`);

            _.updateContent(content);

            $(document.body).append(
                _.getToasterContainer().append(_.$toastrWrap)
            );

            setTimeout(() => _.$toastrWrap.addClass(enabledCss), CSS_TRANSISTION_DELAY);
            // Auto remove if not dismissed
            _.toastrFinallyTimer = setTimeout(() => _.dismiss(), duration + CSS_TRANSISTION_DELAY);    
            _.currentlyToasting = true;
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
        const _ = this;
        const { ariaLive, btnDismissCss, closeIconCss, closeTextCopy, outerCss } = _.params;

        _.$toastrBody = $('<div>').attr({ class: _.params.outerCss + '__body' });
        _.$toastrWrap = $('<div>').attr({ class: outerCss, role: 'alert', 'aria-live': ariaLive }).append(
            _.$toastrBody,
            $('<button>').attr({ type: 'button', class: btnDismissCss }).append(
                $('<i>').attr({ class: closeIconCss }).append(
                    $('<span>').attr({ class: 'sr-only' }).text(closeTextCopy)
                )
            )
        );

        _.toasterBodyBuilt = true;
        // click event to dismiss
        _.$toastrWrap.on('click', 'button', () => _.dismiss());
    }

    private updateContent(content: Selector) {
        const _ = this;

        if (_.$toastrBody) {

            _.$toastrBody.empty();

            if ('string' === typeof content) {
                _.$toastrBody.html(content);
            } else {
                _.$toastrBody.append(content);
            }
        }
    }

    static setContent(element, content, updateNow = false) {
        $(element).each(function () {
            const params = elemData(this, `${DATA_NAME}_params`);

            $.extend(params, { content });

            if (updateNow) {
                const _ = elemData(this, `${DATA_NAME}_instance`);
                _.updateContent(params.content)
            }
        });
    }

    static remove(element) {
        $(element).each(function () {
            const instance = elemData(this, `${DATA_NAME}_instance`);

            instance.$element.off(`click.${EVENT_NAME} ${EVENT_NAME}`);

            elemData(this, `${DATA_NAME}_params`, null, true);
            elemData(this, `${DATA_NAME}_instance`, null, true);
        })
    }
}

declare module 'cash-dom' {
    interface Cash {
        toastr(options?: IToasterDefaults | StringPluginArgChoices): Cash;
    }
}