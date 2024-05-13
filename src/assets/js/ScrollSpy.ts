import { getDataOptions, isVisible } from "./util/helpers";
import type { Cash, Selector } from "cash-dom";
import type { LocationHashTracking, StringPluginArgChoices } from './types';
import $ from 'cash-dom';
import Store from "./core/Store";
import UrlState from "./core/UrlState";

export interface IScrollSpyDefaults extends LocationHashTracking {
    observerOptions: IntersectionObserverInit;
    cssPrefix: string;
    spyNavElems: 'a' | 'button';
    setActiveCssToLi: boolean,
    spyBody: Selector;
    spyElems: string;
    callback?: ScrollSpyCallBack;
}

export interface IScrollSpyOptions extends Partial<IScrollSpyDefaults> {
    spyBody: Selector;
}

type ScrollSpyCallBack = (topMostEntries: HTMLElement[], navEntries: HTMLElement[]) => void;

const VERSION = "1.0.0";
const DATA_NAME = 'ScrollSpy';
const EVENT_NAME = 'scrollSpy';
const DEFAULTS: IScrollSpyOptions = {
    observerOptions: {
        rootMargin: "0px",
        threshold: 1
    },
    cssPrefix: 'scroll-spy',
    spyNavElems: 'a',
    spyBody: '.scroll-spy-body',
    spyElems: 'h2',
    setActiveCssToLi: true,
    locationFilter: null,
	urlFilterType: 'hash',
	historyType: 'push',
	loadLocation: true
}



export default class ScrollSpy {

    #pairedElems: Map<HTMLElement, HTMLElement> = new Map();
    inViewEntries: Set<HTMLElement> = new Set();
    backUpInViewEntry: HTMLElement;
    #lastSpyElem: HTMLElement | null = null;
    #observer: IntersectionObserver | null = null;
    public params: IScrollSpyOptions;
    public element: HTMLElement;
    public $spyBody: Cash;
    public spyContents: HTMLElement[];

    public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

    constructor(element: HTMLElement, options: IScrollSpyOptions) {
        const s = this;
        const dataOptions = getDataOptions(element, EVENT_NAME);
        s.element = element;

        s.params = $.extend({}, ScrollSpy.defaults, options, dataOptions);
        s.$spyBody = $(s.params.spyBody);
        s.spyContents = Array.from(s.$spyBody.find(s.params.spyElems)).filter((el) => isVisible(el) && (el as HTMLElement).id);


        if (s.spyContents.length > 0) {
            $(element).addClass(`${s.params.cssPrefix}-nav`);
            s.$spyBody.addClass(`${s.params.cssPrefix}-body`);

            s.#lastSpyElem = s.spyContents[s.spyContents.length - 1];
            s.backUpInViewEntry = s.#getInitialBackUpInViewEntry();
            s.#pairElementsToNavEls();
            s.handleEvents();

        } else {
            console.warn(
                `there is nothing to spy, check your 'spyBody' for those elements`,
                s.params.spyBody
            );
        }

        return s;
    }

    handleEvents() {
        const s = this;
        const p = s.params;

        const observerProcess = (entries: IntersectionObserverEntry[]) => {
            s.#setInViewEntries(entries);
            s.#spyElements();
        }
        s.loadFromUrl();
        s.#observer = new IntersectionObserver(observerProcess, p.observerOptions);

        for (const elem of s.spyContents) {
            s.#observer.observe(elem);
        }

        $(s.element).on(`click.${EVENT_NAME}`, p.spyNavElems, function (e) {
            const clickElem = this as HTMLElement;
            const paramVal = (this.nodeName === 'A' ? this.hash : clickElem.dataset.hash).replace(/^\#/,'');
            const $bodyElem = s.scrollToElement(paramVal,'smooth');

            if ($bodyElem.length) {
 
                if (typeof p.urlFilterType === 'string') {
                    if (p.locationFilter) {

                        if (p.urlFilterType === 'hashVal') { 
                            UrlState.setHashVal(paramVal, p.historyType);
                        } else {
                            UrlState.set(p.urlFilterType, p.locationFilter, paramVal, p.historyType);
                        }
                    }
                }

                e.preventDefault();
            }
        });
    }

    scrollToElement(elemId: string, behavior: ScrollOptions["behavior"]) {
        const s = this;
        const p = s.params;
        const scrollRoot = p.observerOptions.root as HTMLElement || window;
        const observerOffsetTop = parseFloat(p.observerOptions.rootMargin.split(' ')[0]) || 0;
        const $bodyElem = $(elemId ? '#'+ elemId : document.body);

        if ($bodyElem.length) {

            scrollRoot.scrollTo({
                top: $bodyElem.offset().top - observerOffsetTop,
                behavior
            });
        }

        return $bodyElem;
    }

    loadFromUrl() {
		const s = this;
		const p = s.params;

		if (p.locationFilter !== null || p.loadLocation) {
		
			const spyId = UrlState.get(p.urlFilterType, p.locationFilter) as string;
			 
			if (spyId) {
                s.scrollToElement(spyId, 'instant');
			}
		}
	}

    #getInitialBackUpInViewEntry() {
        const s = this;
        const sortedByTop = s.spyContents
            .map(el => ({ el, top: el.getBoundingClientRect().top }))
            .sort((a, b) => a.top < b.top ? -1 : 1)

        for (let i = 0, l = sortedByTop.length; i < l; i++) {
            const curr = sortedByTop[i];
            const prev = sortedByTop[i - 1];

            if (curr.top >= 0) {
                if (prev) {
                    return prev.el;
                }
                return curr.el;
            }
        }
    }

    #pairElementsToNavEls() {
        const s = this;
        const { spyNavElems, setActiveCssToLi } = s.params;

        $(s.element).find(spyNavElems).each(function () {
            const clickEl = this as HTMLAnchorElement | HTMLButtonElement;
            const hash = this.nodeName === 'A' ? (clickEl as HTMLAnchorElement).hash : (clickEl as HTMLButtonElement).dataset.hash;

            if (hash) {
                const foundElem = s.spyContents.find((el: HTMLElement) => el.id && el.id === hash.replace('#', ''))

                if (foundElem) {

                    const pairedElem = setActiveCssToLi ? (clickEl.closest('li') || clickEl) : clickEl;
                    s.#pairedElems.set(foundElem, pairedElem);
                    s.#pairedElems.set(clickEl, foundElem);
                }
            }
        });
    }

    #setInViewEntries(entries: IntersectionObserverEntry[]) {
        const s = this;
        for (const entry of entries) {
            const target = entry.target as HTMLElement;

            if (entry.isIntersecting) {
                s.inViewEntries.add(target);
            } else {
                if (s.inViewEntries.has(target)) {

                    s.backUpInViewEntry = target;
                    s.inViewEntries.delete(target);
                    s.#toggleActiveCss(target, 'remove');
                }
            }
        }
    }

    #toggleActiveCss(target: HTMLElement, type: 'remove' | 'add') {
        const s = this;
        const { cssPrefix } = s.params;
        const clickElem = s.#pairedElems.get(target);

        clickElem.classList[type](`${cssPrefix}-nav__active`);
        target.classList[type](`${cssPrefix}-body__active`);
    }

    #spyElements() {
        const s = this;
        const hasInViewEntries = s.inViewEntries.size > 0;
        const topMostEntries: HTMLElement[] = hasInViewEntries ? [] : [s.backUpInViewEntry];

        for (const entry of s.inViewEntries) {

            if (topMostEntries.length) {
                const elTop = entry.getBoundingClientRect().top;

                for (let i = 0, l = topMostEntries.length; i < l; i++) {
                    const tmEntry = topMostEntries[i];
                    const tmElTop = tmEntry.getBoundingClientRect().top;

                    if (elTop < tmElTop && elTop >= 0) {
                        topMostEntries.splice(i, 1, entry);
                        s.#toggleActiveCss(tmEntry, 'remove');
                    }

                    const isLastEntry = s.#lastSpyElem.isSameNode(entry);

                    if (isLastEntry) {
                        const remainingBodyScroll = document.body.scrollHeight - window.scrollY;
                        const canScrollAmount = window.innerHeight;
                        if (canScrollAmount > remainingBodyScroll) {
                            // if we can't get to the last scroll element
                            // then highlight once in the screen
                            topMostEntries.push(entry);
                        }
                    }

                    if (elTop === tmElTop) {
                        topMostEntries.push(entry);
                    }
                }
            } else {
                topMostEntries.push(entry);
            }
        }

        if (hasInViewEntries) {
            s.#toggleActiveCss(s.backUpInViewEntry, 'remove');
        }

        for (const elem of topMostEntries) {
            s.#toggleActiveCss(elem, 'add');
        }

        if (s.params.callback) {
            const navEntries = topMostEntries.map(el => s.#pairedElems.get(el));
            s.params.callback(topMostEntries, navEntries);
        }
    }

    static remove(element: Cash, plugin?: ScrollSpy) {

        $(element).each(function () {
            
            const s: ScrollSpy = plugin || Store(this, DATA_NAME);
            
            for (const elem of s.spyContents) {
                s.#toggleActiveCss(elem, 'remove');
            }

            $(s.element)
                .off(`click.${EVENT_NAME}`)
                .removeClass(`${s.params.cssPrefix}-nav`);
            s.$spyBody.removeClass(`${s.params.cssPrefix}-body`);
            s.#observer.disconnect();
            Store(this, DATA_NAME, null);
        });
    }
}

declare module 'cash-dom' {
    interface Cash {
        scrollSpy(options?: IScrollSpyOptions | StringPluginArgChoices): Cash;
    }
}