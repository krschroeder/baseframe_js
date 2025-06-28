import type { WinSetTimeout, StringPluginArgChoices } from './types';

import $be, { type BaseElem } from "base-elem-js";
import { getDataOptions, setParams } from "./util/helpers";
import Store from "./core/Store";
 


interface INavDesktopCss {
	hasUL: string;
	noUl: string;
	elemEdge: string;
	hovered: string;
	leaving: string;
}
export interface INavDesktopDefaults {
	stopWidth: number;
	delay: number;
	outerElem: HTMLElement;
	cssPrefix: string;
	navLeavingDelay: number;
	hoverCss: string;
}

export interface INavDesktopOptions extends Partial<INavDesktopDefaults> {}

const 
    VERSION = "2.0.0",
    DATA_NAME = 'NavDesktop',
    EVENT_NAME = 'navDesktop',
    DEFAULTS: INavDesktopDefaults = {
        stopWidth: 768,
        delay: 800,
        navLeavingDelay: 800,
        outerElem: document.body,
        cssPrefix: 'menu',
        hoverCss: 'hover' 
    }
;

export default class NavDesktop {

	public element: HTMLElement;
	public params: INavDesktopDefaults;
	public cssList: INavDesktopCss;
	public stayHover: WinSetTimeout;
	public navLeaving: WinSetTimeout;

	public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

	constructor(element: HTMLElement, options: INavDesktopOptions | StringPluginArgChoices) {
		const s = this;

		s.stayHover;
		s.navLeaving;
		s.element = element;

		const dataOptions = getDataOptions(element, EVENT_NAME);
	 
		s.params = setParams(NavDesktop.defaults, options, dataOptions);
		const { cssPrefix } = s.params;
		 
		s.cssList = {
			hasUL:      `${cssPrefix}__has-ul`,
			noUl:       `${cssPrefix}__no-ul`,
			elemEdge:   `${cssPrefix}__on-edge`,
			hovered:    `${cssPrefix}--hover`,
			leaving:    `${cssPrefix}--leaving`,
		};

		s.#addCssToElems();
		s.#handleEvents();

		return s;
	}

	static remove(element: BaseElem, plugin?: NavDesktop) {

		$be(element).each((elem) => {
			const s: NavDesktop = plugin || Store(elem, DATA_NAME);
			const $el = $be(s.element);

			$el.find('ul').off([`mouseover.${EVENT_NAME}`, `focusin.${EVENT_NAME}`, `focusout.${EVENT_NAME}`]);
			$el.off(`mouseout.${EVENT_NAME}`);

			Store(elem, DATA_NAME, null);
		});
	}

	#addCssToElems() {
		const s = this;
		const css = s.cssList;
        const $els = $be('li', s.element);
        
        $els.each((elem, i) => {
            const $el = $be(elem);
            const $uls = $el.find('ul');
            const ulCss = $uls.hasEls ? css.hasUL : css.noUl;
            
            $el.addClass(ulCss);
        })
	}

	#handleEvents() {
		const 
            s = this,
            css = s.cssList,
		    p = s.params,
            $rootUl = $be(s.element).findOne('ul'),
            $outerElem = $be(p.outerElem),
            $element = $be(s.element),
            $allEls = $element.find('li, ul'),
            allEls = $allEls.toArray() as HTMLElement[]
        ;

		let prevEvent = null;

		const evtTracker = (elem: HTMLElement, e: MouseEvent, cb) => {
			const currEvent = e.type;
            const target = e.target as HTMLElement;
           
			const containsOrISElem = elem.isSameNode(target) || elem.contains(target);
            
			if (!prevEvent || (prevEvent !== currEvent && containsOrISElem)) {

				prevEvent = currEvent;
				cb();
			}
		}
     
		$rootUl.on([`mouseover.${EVENT_NAME}`,`focusin.${EVENT_NAME}`], (ev: MouseEvent, elem: HTMLElement) => {
         
			evtTracker(elem, ev, () => {
                const $li = $be(elem); 
				const $liParents = $li.parents('li'); 
                
                $allEls.rmClass([p.hoverCss, css.elemEdge]);
				$liParents.addClass(p.hoverCss);
				$li.addClass(p.hoverCss);
				s.#edgeDetector(ev.target as HTMLElement); 
                
				s.navLeaving && clearTimeout(s.navLeaving);
				s.stayHover && clearTimeout(s.stayHover);

				$outerElem.addClass(css.hovered).rmClass(css.leaving);

			});

		}, allEls);

        $rootUl.on([`mouseout.${EVENT_NAME}`, `focusout.${EVENT_NAME}`], (ev: MouseEvent, elem: HTMLElement) => {
			 
			evtTracker(elem, ev, () => {
				s.stayHover = setTimeout(() => {
					$element.find(`.${p.hoverCss}`).rmClass([p.hoverCss, css.elemEdge]);
					$element.find(`.${css.elemEdge}`).rmClass(css.elemEdge);
					$outerElem
						.rmClass(css.hovered)
						.addClass(css.leaving);

					s.navLeaving = setTimeout(() => {
						$outerElem.rmClass(css.leaving);
					}, p.navLeavingDelay);
				},
				p.delay);
			});
		}, allEls);
	}

	#edgeDetector(elem: HTMLElement) {
		const s = this;
		const css = s.cssList;
        const li = elem.closest('li');
		const { innerWidth, pageXOffset } = window;

		if (s.params.stopWidth < innerWidth) {

            const ul = $be.findOne('ul', s.element);

			if (ul) {
                
				const 
                    ulRects = $be.elemRects(ul),
					offsetLeft = ulRects.left + pageXOffset,
					ulWidth = ul.scrollWidth,
					fullyVisible = (offsetLeft + ulWidth <= innerWidth)
                ;
                   
				if (!fullyVisible) {
                    
					li.classList.add(css.elemEdge);
				}
			}
		}
	}
}

 

export interface NavDesktopPlugin {
    navDesktop(options?: INavDesktopOptions | StringPluginArgChoices): BaseElem;
}
 
declare module 'base-elem-js' {
    interface BaseElem extends NavDesktopPlugin {}
}