// import type { BaseElem } from 'cash-dom';
import type { StringPluginArgChoices } from './types';

// import $ from 'cash-dom';
import $be, { type BaseElem } from "base-elem-js";
import { getDataOptions, setParams } from "./util/helpers";
import Store from "./core/Store";
 


interface INavDesktopCss {
	menuHasUL: string;
	menuNoUl: string;
	menuElemEdge: string;
	menuHovered: string;
	menuLeaving: string;
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

const { findOne, elemRects } = $be.static;

const VERSION = "2.0.0";
const DATA_NAME = 'NavDesktop';
const EVENT_NAME = 'navDesktop';
const DEFAULTS: INavDesktopDefaults = {
	stopWidth: 768,
	delay: 800,
	navLeavingDelay: 800,
	outerElem: document.body,
	cssPrefix: 'menu',
	hoverCss: 'hover' 
};

export default class NavDesktop {

	public element: HTMLElement;
	public params: INavDesktopDefaults;
	public cssList: INavDesktopCss;
	public stayHover: ReturnType<typeof setTimeout>;
	public navLeaving: ReturnType<typeof setTimeout>;

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
			// menuOuterOpen: `${cssPrefix}--outer-open`,
			menuHasUL: `${cssPrefix}__has-ul`,
			menuNoUl: `${cssPrefix}__no-ul`,
			menuElemEdge: `${cssPrefix}__elem-on-edge`,
			menuHovered: `${cssPrefix}--hover`,
			menuLeaving: `${cssPrefix}--leaving`,
		};

		s.addCssToElems();
		s.handleEvents();

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

	addCssToElems() {
		const s = this;
		const css = s.cssList;
        const $li = $be('li', s.element);
        const $ul = $li.find('ul');
		
        $li.addClass(css.menuNoUl);

        if ($ul.hasElems()) {
            $li.find('ul').each((elem) => {
                const $elem = $be(elem);
                $elem.rmClass(css.menuNoUl);

                if (!$elem.hasClass(css.menuHasUL)) {
                    $elem.addClass(css.menuHasUL);
                }
            });
        }
	}

	handleEvents() {
		const s = this;
        const css = s.cssList;
		const p = s.params;
        const $rootUl = $be(s.element).findOne('ul');

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

			const liOrUl = elem as HTMLElement;

			evtTracker(liOrUl, ev, () => {
				s.edgeDetector(liOrUl);
                const $li = $be(liOrUl);
				const $liLiParents = $be(liOrUl).parents('li');

				liOrUl.classList.add(p.hoverCss);
				$liLiParents.addClass(p.hoverCss);
                $be(elem).find('li').rmClass(p.hoverCss);
				$li.find(`.${p.hoverCss}`).rmClass(p.hoverCss);
				 
				if (!$liLiParents.hasElems()) {

                    $be(s.element).find(`.${p.hoverCss}`).rmClass(p.hoverCss);
                }
                
				s.navLeaving && clearTimeout(s.navLeaving);
				s.stayHover && clearTimeout(s.stayHover);

				$be(p.outerElem).addClass(css.menuHovered).rmClass(css.menuLeaving)

			});

		}, 'li, ul');

        $rootUl.on([`mouseout.${EVENT_NAME}`, `focusout.${EVENT_NAME}`], (ev: MouseEvent, elem: HTMLElement) => {

			const liOrUl = elem as HTMLElement;
			 
			evtTracker(liOrUl, ev, () => {
				s.stayHover = setTimeout(() => {
					$be(s.element).find(`.${p.hoverCss}`).rmClass([p.hoverCss, css.menuElemEdge]);
					$be(s.element).find(`.${css.menuElemEdge}`).rmClass(css.menuElemEdge);
					$be(p.outerElem)
						.rmClass(css.menuHovered)
						.addClass(css.menuLeaving);

					s.navLeaving = setTimeout(() => {
						$be(p.outerElem).rmClass(css.menuLeaving);
					}, p.navLeavingDelay);
				},
				p.delay);
			});
		},'li, ul');
	}

	edgeDetector(liOrUl: HTMLElement) {
		const s = this;
		const css = s.cssList;
		const { innerWidth, pageXOffset } = window;

		if (s.params.stopWidth < innerWidth) {

            const ul = findOne('ul', s.element);

			if (ul) {
                
				const 
                    ulRects = elemRects(ul),
					offsetLeft = ulRects.left + pageXOffset,
					ulWidth = ul.scrollWidth,
					fullyVisible = (offsetLeft + ulWidth <= innerWidth);
                   
				if (!fullyVisible) {
					liOrUl.classList.add(css.menuElemEdge);
				}
			}
		}
	}
}

declare module 'base-elem-js' {
	export interface BaseElem {
		navDesktop(options?: INavDesktopOptions | StringPluginArgChoices): BaseElem;
	}
}