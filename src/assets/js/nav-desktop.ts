import type { Selector } from "cash-dom";
import type { StringPluginArgChoices } from './types/shared';

import $ from 'cash-dom';
import parseObjectFromString from './util/parse-object-from-string';
import elemData from "./util/elem-data";


export interface INavDesktopOptions {
	stopWidth?: number;
	delay?: number;
	edgeCss?: string;
	outerElem?: Selector;
	ulHasCss?: string;
	ulNotCss?: string;
	navHoveredCss?: string;
	navLeavingCss?: string;
	navLeavingDelay?: number;
	hoverCss?: string;
}

export interface INavDesktopDefaults {
	stopWidth: number;
	delay: number;
	edgeCss: string;
	outerElem: Selector;
	ulHasCss: string;
	ulNotCss: string;
	navHoveredCss: string;
	navLeavingCss: string;
	submenuBtnCss: string;
	navLeavingDelay: number;
	hoverCss: string;
}

const VERSION = "1.2.1";
const DATA_NAME = 'NavDesktop';
const EVENT_NAME = 'navDesktop';
const DEFAULTS: INavDesktopDefaults = {
	stopWidth: 768,
	delay: 800,
	edgeCss: 'ul-on-edge',
	outerElem: document.body,
	ulHasCss: 'has-ul',
	ulNotCss: 'no-ul',
	navHoveredCss: 'desktop-nav-hovered',
	navLeavingCss: 'desktop-nav-leaving',
	navLeavingDelay: 800,
	hoverCss: 'hover',
	submenuBtnCss: 'btn-nav--mb-submenu i i-arrow-b'
};

export default class NavDesktop {

	public element: HTMLElement;
	public params: INavDesktopDefaults;
	public stayHover: ReturnType<typeof setTimeout>;
	public navLeaving: ReturnType<typeof setTimeout>;

	public static Defaults = DEFAULTS;

	constructor(element: HTMLElement, options: INavDesktopOptions) {
		const _ = this;

		_.stayHover;
		_.navLeaving;
		_.element = element;

		const dataOptions = parseObjectFromString( $(element).data(EVENT_NAME + '-options'));
		const instanceOptions = $.extend({}, NavDesktop.Defaults, options, dataOptions);

		elemData(element,`${DATA_NAME}_params`, instanceOptions);
		
		_.params = elemData(element, `${DATA_NAME}_params`);

		_.addCssToElems();
		_.init();

		return this;
	}

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	static remove(element) {

		$(element).each(function () {
			const instance = elemData(this, `${DATA_NAME}_instance`);
			const $el = $(instance.element);

			$el.find('ul').off(`mouseover.${EVENT_NAME}`);
			$el.off(`mouseout.${EVENT_NAME}`);

			elemData(this, `${DATA_NAME}_params`, null, true);
			elemData(this, `${DATA_NAME}_instance`, null, true);
		});
	}

	addCssToElems() {
		const _ = this;
		const { ulNotCss, ulHasCss } = _.params;

		$('li', _.element)
			.addClass(ulNotCss)
			.has('ul').each(function () {

				$(this).removeClass(ulNotCss);

				if (!$(this).hasClass(ulHasCss)) {
					$(this).addClass(ulHasCss);
				}
			});
	}

	init() {
		const _ = this;
		let prevEvent = null;

		const evtTracker = (elem, e, cb) => {
			const currEvent = e.type;
			const containsOrISElem = elem.isSameNode(e.target) ?
				true :
				!!$(e.target).parents(elem).length
				;

			if (!prevEvent || (prevEvent !== currEvent && containsOrISElem)) {

				prevEvent = currEvent;
				cb();
			}
		}

		$(_.element).find('ul').on(`mouseover.${EVENT_NAME}`, 'li, ul', function (e) {

			const li = this;
			const { outerElem, navHoveredCss, hoverCss, navLeavingCss } = _.params;

			evtTracker(li, e, () => {
				_.edgeDetector(li);

				const liLiParents = $(li).parents('li');

				li.classList.add(hoverCss);
				liLiParents.addClass(hoverCss);

				$(li).find(`.${hoverCss}`).removeClass(hoverCss);
				$(li).siblings('li').removeClass(hoverCss)

				liLiParents.length === 0 &&
					$(_.element).find(`.${hoverCss}`).removeClass(hoverCss);

				_.navLeaving && clearTimeout(_.navLeaving);
				_.stayHover && clearTimeout(_.stayHover);

				$(outerElem).addClass(navHoveredCss).removeClass(navLeavingCss)

			});

		}).on(`mouseout.${EVENT_NAME}`, 'li, ul', function (e) {

			const liOrUl = this;
			const { edgeCss, delay, navHoveredCss, hoverCss, navLeavingCss, navLeavingDelay, outerElem } = _.params;

			evtTracker(liOrUl, e, () => {
				_.stayHover = setTimeout(() => {
					$(_.element).find(`.${hoverCss}`).removeClass(`${hoverCss} ${edgeCss}`);
					$(_.element).find(`.${edgeCss}`).removeClass(edgeCss);
					$(outerElem)
						.removeClass(navHoveredCss)
						.addClass(navLeavingCss);

					_.navLeaving = setTimeout(() => {
						$(outerElem).removeClass(navLeavingCss);
					}, navLeavingDelay);
				},
				delay);
			});
		});
	}

	edgeDetector(liOrUl) {
		const _ = this;
		const { edgeCss, stopWidth } = _.params;
		const dw = $(window).width();

		if (stopWidth < dw) {

			const $uls = $('ul', liOrUl);
			const $ul = $uls.eq(0),
				l = $ul.length && $ul.offset() ? ($ul as any).offset().left : 0,
				uw = $ul.width(),
				fullyVisible = (l + uw <= dw);

			if (!fullyVisible) {
				liOrUl.classList.add(edgeCss);
			}
		}
	}
}

declare module 'cash-dom' {
	export interface Cash {
		navDesktop(options?: INavDesktopOptions | StringPluginArgChoices): Cash;
	}
}