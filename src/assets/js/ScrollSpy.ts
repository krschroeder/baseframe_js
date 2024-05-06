import { getDataOptions, isVisible } from "./util/helpers";
import type { Cash, Selector } from "cash-dom";
import type { StringPluginArgChoices } from './types';
import $ from 'cash-dom';
import Store from "./core/Store";

export interface IScrollSpyDefaults {
    observerOptions: IntersectionObserverInit;
    cssPrefix: string;
    spyNavElems: 'a' | 'button';
    setActiveCssToLi: boolean,
    spyContents: Selector;
    callback?: ScrollSpyCallBack;
}

export interface IScrollSpyOptions extends Partial<IScrollSpyDefaults> {
    spyContents: Selector;
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
    spyContents: '.spy-contents h2',
    setActiveCssToLi: true
}

 

export default class ScrollSpy {

    #pairedElems: Map<HTMLElement, HTMLElement> = new Map();
    inViewEntries: Set<HTMLElement> = new Set();
    backUpInViewEntry: HTMLElement;
    #lastSpyElem: HTMLElement | null = null;
    #observer: IntersectionObserver | null = null;
    public params: IScrollSpyOptions;
    public element: HTMLElement;
    public spyContents: HTMLElement[];

    public static defaults = DEFAULTS;
	public static version = VERSION;
	public static pluginName = EVENT_NAME; 

    constructor(element: HTMLElement, options: IScrollSpyOptions) {
        const s = this;
        const dataOptions = getDataOptions(element, EVENT_NAME);
        s.params = $.extend({}, ScrollSpy.defaults, options, dataOptions);
        s.spyContents = Array.from($(s.params.spyContents).filter((i, el) => isVisible(el)));

        if (s.spyContents.length > 0) {
           
            s.#lastSpyElem = s.spyContents[s.spyContents.length -1];
            s.backUpInViewEntry = s.#getInitialBackUpInViewEntry();
            s.#pairElementsToNavEls();
            s.handleEvents();

        } else {
            console.warn(
                `there is nothing to spy, check your 'spyContents' for those elements`, 
                s.params.spyContents
            );
        }
    }

    handleEvents() {
        const s = this;
        const { observerOptions, spyNavElems } = s.params;

        const observerProcess = (entries: IntersectionObserverEntry[]) => {
            s.#setInViewEntries(entries);
            s.#spyElements();
        }

        const observer = new IntersectionObserver(observerProcess, observerOptions);

        for (const elem of s.spyContents) {
            observer.observe(elem);
        }

        $(s.element).on(`click.${EVENT_NAME}`,spyNavElems, function(){
            const clickElem = this as HTMLElement;
            const scrollRoot = observerOptions.root as HTMLElement || window;
          

            scrollRoot.scrollTo( {
                top: s.#pairedElems.get(clickElem).getBoundingClientRect().top,
                behavior: 'smooth'
            })
        });

        s.#observer = observer;
    }

    #getInitialBackUpInViewEntry() {
        const s = this;
        const sortedByTop = s.spyContents
            .map(el => ({el, top: el.getBoundingClientRect().top}))
            .sort((a,b) => a.top < b.top ? -1 : 1)

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
                    s.#pairedElems.set(pairedElem, foundElem);
                }
            }
        });
    }

    #setInViewEntries(entries:IntersectionObserverEntry[]) {
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
        const activeCss = `${cssPrefix}--active`;
        const navLink = s.#pairedElems.get(target);
                    
        navLink.classList[type](activeCss);
        target.classList[type](activeCss);
    }

    #spyElements () {
        const s = this;
        const hasInViewEntries = s.inViewEntries.size > 0;
        const topMostEntries:HTMLElement[] = hasInViewEntries ? [] : [s.backUpInViewEntry];
    
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

                if (elTop === tmElTop ) {
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
            
            $(s.element).off(`click.${EVENT_NAME}`);
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