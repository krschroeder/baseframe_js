import type { Cash } from 'cash-dom';
import type { StringPluginArgChoices } from './types';

import $ from 'cash-dom';
import { getDataOptions } from "./util/helpers";
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
	static get version() {
		return VERSION;
	}

	constructor(element: HTMLElement, options: INavDesktopOptions | StringPluginArgChoices) {
		const s = this;

		s.stayHover;
		s.navLeaving;
		s.element = element;

		const dataOptions = getDataOptions(element, EVENT_NAME);
	 
		s.params = $.extend({}, NavDesktop.defaults, options, dataOptions)
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

	static remove(element: Cash, plugin?: NavDesktop) {

		$(element).each(function () {
			const s: NavDesktop = plugin || Store(this, DATA_NAME);
			const $el = $(s.element);

			$el.find('ul').off(`mouseover.${EVENT_NAME} focusin.${EVENT_NAME} focusout.${EVENT_NAME}`);
			$el.off(`mouseout.${EVENT_NAME}`);

			Store(this, DATA_NAME, null);
		});
	}

	addCssToElems() {
		const s = this;
		const css = s.cssList;

		$('li', s.element)
		.addClass(css.menuNoUl)
		.has('ul').each(function () {

			$(this).removeClass(css.menuNoUl);

			if (!$(this).hasClass(css.menuHasUL)) {
				$(this).addClass(css.menuHasUL);
			}
		});
	}

	handleEvents() {
		const s = this;
		let prevEvent = null;

		const evtTracker = (elem, e: MouseEvent, cb) => {
			const currEvent = e.type;
			const containsOrISElem = elem.isSameNode(e.target) ? true : !!$(e.target as HTMLElement).parents(elem).length;

			if (!prevEvent || (prevEvent !== currEvent && containsOrISElem)) {

				prevEvent = currEvent;
				cb();
			}
		}

		$(s.element).find('ul').on(`mouseover.${EVENT_NAME} focusin.${EVENT_NAME}`, 'li, ul', function (e) {

			const li = this;
			const css = s.cssList;
			const p = s.params;
			
			evtTracker(li, e, () => {
				s.edgeDetector(li);

				const $liLiParents = $(li).parents('li');

				li.classList.add(p.hoverCss);
				$liLiParents.addClass(p.hoverCss);

				$(li).find(`.${p.hoverCss}`).removeClass(p.hoverCss);
				$(li).siblings('li').removeClass(p.hoverCss)

				$liLiParents.length === 0 &&
					$(s.element).find(`.${p.hoverCss}`).removeClass(p.hoverCss);

				s.navLeaving && clearTimeout(s.navLeaving);
				s.stayHover && clearTimeout(s.stayHover);

				$(p.outerElem).addClass(css.menuHovered).removeClass(css.menuLeaving)

			});

		}).on(`mouseout.${EVENT_NAME} focusout.${EVENT_NAME}`, 'li, ul', function (e) {

			const liOrUl: HTMLElement = this;
			const p = s.params;
			const css = s.cssList;
			evtTracker(liOrUl, e, () => {
				s.stayHover = setTimeout(() => {
					$(s.element).find(`.${p.hoverCss}`).removeClass(`${p.hoverCss} ${css.menuElemEdge}`);
					$(s.element).find(`.${css.menuElemEdge}`).removeClass(css.menuElemEdge);
					$(p.outerElem)
						.removeClass(css.menuHovered)
						.addClass(css.menuLeaving);

					s.navLeaving = setTimeout(() => {
						$(p.outerElem).removeClass(css.menuLeaving);
					}, p.navLeavingDelay);
				},
				p.delay);
			});
		});
	}

	edgeDetector(liOrUl: HTMLElement) {
		const s = this;
		const { stopWidth } = s.params;
		const css = s.cssList;
		const dw = $(window).width();

		if (stopWidth < dw) {

			const $uls = $(liOrUl).find('ul');

			if ($uls.length) {
				const 
					ul = $uls[0],
					l = $(ul).offset().left,
					uw = ul.scrollWidth,
					fullyVisible = (l + uw <= dw);
				
				if (!fullyVisible) {
					liOrUl.classList.add(css.menuElemEdge);
				}
			}
		}
	}
}

declare module 'cash-dom' {
	export interface Cash {
		navDesktop(options?: INavDesktopOptions | StringPluginArgChoices): Cash;
	}
}