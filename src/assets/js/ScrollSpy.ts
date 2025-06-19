import { d, getDataOptions, setParams } from "./util/helpers";
import type { LocationTracking , StringPluginArgChoices } from './types';
import $be, { type BaseElem, type SelectorRoot, type EventName } from "base-elem-js";
import Store from "./core/Store";
import UrlState from "./core/UrlState";
import smoothScroll from "./fn/smoothScroll";
import loadFromUrl from "./util/loadfromUrl";


export interface IScrollSpyDefaults extends LocationTracking {
    observerOptions: IntersectionObserverInit;
    cssPrefix: string;
    spyNavElems: 'a' | 'button';
    setActiveCssToLi: boolean,
    scrollBehavior: ScrollOptions["behavior"];
    scrollDuration: number;
    spyBody: SelectorRoot | string;
    spyElems: string;
    callback?: ScrollSpyCallBack;
}

export interface IScrollSpyOptions extends Partial<IScrollSpyDefaults> {
    spyBody: SelectorRoot | string;
}

type ScrollSpyCallBack = (topMostEntries: HTMLElement[], navEntries: HTMLElement[]) => void;

const VERSION = "1.0.1";
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
    scrollBehavior: 'smooth',
    scrollDuration: 500,
    setActiveCssToLi: true,
    locationFilter: null,
	urlFilterType: 'hash',
	historyType: 'push',
	loadLocation: true
}

const { isVisible } = $be.static;


export default class ScrollSpy {

    #pairedElems: Map<HTMLElement, HTMLElement> = new Map();
    inViewEntries: Set<HTMLElement> = new Set();
    backUpInViewEntry: HTMLElement;
    #lastSpyElem: HTMLElement | null = null;
    #observer: IntersectionObserver | null = null;
    public params: IScrollSpyOptions;
    public element: HTMLElement;
    public $spyBody: BaseElem;
    public spyContents: HTMLElement[];

    public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

    constructor(element: HTMLElement, options: IScrollSpyOptions) {
        const s = this;
        const dataOptions = getDataOptions(element, EVENT_NAME);
        s.element = element;

        s.params = setParams(ScrollSpy.defaults, options, dataOptions);
        s.$spyBody = $be(s.params.spyBody);
        s.spyContents = s.$spyBody.find(s.params.spyElems, elem => isVisible(elem) && !!elem.id).toArray() as HTMLElement[];


        if (s.spyContents.length > 0) {
            $be(element).addClass(`${s.params.cssPrefix}-nav`);
            s.$spyBody.addClass(`${s.params.cssPrefix}-body`);

            s.#lastSpyElem = s.spyContents[s.spyContents.length - 1];
            s.backUpInViewEntry = s.#getInitialBackUpInViewEntry();
            s.#pairElementsToNavEls();
            s.#handleEvents();

        } else {
            console.warn(
                `there is nothing to spy, check your 'spyBody' for those elements`,
                s.params.spyBody
            );
        }

        return s;
    }

    #handleEvents() {
        const s = this;
        const p = s.params;

        const observerProcess = (entries: IntersectionObserverEntry[]) => {
            s.#setInViewEntries(entries);
            s.#spyElements();
        }
        loadFromUrl(p as LocationTracking, (id) => {
            s.scrollToElement(id, 'instant');
        })
        // s.loadFromUrl();
        s.#observer = new IntersectionObserver(observerProcess, p.observerOptions);

        for (const elem of s.spyContents) {
            s.#observer.observe(elem);
        }

        $be(s.element).on(`click.${EVENT_NAME}`, (ev, elem) =>  {
            const clickElem = elem as (HTMLAnchorElement | HTMLButtonElement);
            const paramVal = (clickElem.nodeName === 'A' ? (clickElem as HTMLAnchorElement).hash : clickElem.dataset.hash).replace(/^\#/,'');
            const $bodyElem = s.scrollToElement(paramVal, p.scrollBehavior);

            if ($bodyElem.hasEls) {
 
                if (typeof p.urlFilterType === 'string') {
                    if (p.locationFilter) {

                        if (p.urlFilterType === 'hashVal') { 
                            UrlState.setHashVal(paramVal, p.historyType);
                        } else if (p.urlFilterType === 'hash' || p.urlFilterType === 'search') {
                            UrlState.set(p.urlFilterType, p.locationFilter, paramVal, p.historyType);
                        }
                    }
                }

                ev.preventDefault();
            }
        }, p.spyNavElems as EventName);
    }

    scrollToElement(elemId: string, behavior: ScrollOptions["behavior"]) {
        const 
            s = this,
            p = s.params,
            scrollRoot = p.observerOptions.root as HTMLElement || window,
            observerOffsetTop = parseFloat(p.observerOptions.rootMargin.split(' ')[0]) || 0,
            $bodyElem = $be(elemId ? '#'+ elemId : d.body)
        ;

        if ($bodyElem.hasEls) {
            const top = ($bodyElem.elemRects().top + window.pageYOffset) - observerOffsetTop;
            
            if (behavior === 'smooth') {
                smoothScroll(top, p.scrollDuration);
            } else {
                scrollRoot.scrollTo({
                    top,
                    behavior
                });
            }
        }

        return $bodyElem;
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

        $be(s.element).find(spyNavElems).each((elem) => {
            const clickEl = elem as HTMLAnchorElement | HTMLButtonElement;
            const hash = elem.nodeName === 'A' ? (clickEl as HTMLAnchorElement).hash : (clickEl as HTMLButtonElement).dataset.hash;

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
        if (clickElem) {
            clickElem.classList[type](`${cssPrefix}-nav__active`);
            target.classList[type](`${cssPrefix}-body__active`);
        }
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
                        const remainingBodyScroll = d.body.scrollHeight - window.scrollY;
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

    static remove(element: BaseElem, plugin?: ScrollSpy) {

        $be(element).each(function () {
            
            const s: ScrollSpy = plugin || Store(this, DATA_NAME);
            
            for (const elem of s.spyContents) {
                s.#toggleActiveCss(elem, 'remove');
            }

            $be(s.element)
                .off(`click.${EVENT_NAME}`)
                .rmClass(`${s.params.cssPrefix}-nav`);
            s.$spyBody.rmClass(`${s.params.cssPrefix}-body`);
            s.#observer.disconnect();
            Store(this, DATA_NAME, null);
        });
    }
}

export interface ScrollSpyPlugin {
   scrollSpy(options?: IScrollSpyOptions | StringPluginArgChoices): BaseElem;
}
 
declare module 'base-elem-js' {
    interface BaseElem extends ScrollSpyPlugin {}
}