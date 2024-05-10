import type { Cash, Selector } from "cash-dom";
import type { StringPluginArgChoices } from './types';

import $ from 'cash-dom';
import { isVisible, getDataOptions, noop } from './util/helpers';
 
import trapFocus, { type ITrapFocusRemove } from './fn/trapFocus';
import transition from "./fn/transition";
import { KEYS } from "./core/constants";
import Store from "./core/Store";

type submenuBtnSkipFn = (elem: HTMLElement) => boolean;

interface NavMobileCssList {
	menuOuterOpen: string;
	menuHasUL: string;
	menuOpen: string;
	menuOpening: string;
	menuClosing: string;
	menuToggling: string;
	menuBtnCss: string;
}

export interface INavMobileDefaults {
	enableBtn: Selector;
	ariaLabel: string;
	subMenuText: string;
	insertToggleBtnAfter: string;
	slideDuration: number;
	outerElement: string;
	outsideClickClose: boolean;
	cssPrefix: string;
	menuBtnCss: string,
	menuBtnSkip: submenuBtnSkipFn | boolean;
	doTrapFocus: boolean;
	trapFocusElem: Selector | null;
	stopPropagation: boolean;
	bkptEnable: number | null;
	animateHeight: boolean;
	afterNavItemOpen: ($li: Cash) => void;
	afterNavItemClose: ($li: Cash) => void;
	afterOpen($element: Cash, outerElement: Cash, enableBtn: Cash);
	afterClose($element: Cash, outerElement: Cash, enableBtn: Cash);
}

export interface INavMobileOptions extends Partial<INavMobileDefaults> {
	enableBtn: Selector;
}

const VERSION = "3.0.0";
const DATA_NAME = 'NavMobile';
const EVENT_NAME = 'navMobile';
const DEFAULTS = {
	enableBtn: '#mobile-nav-btn',
	ariaLabel: 'Toggle site navigation',
	subMenuText: 'toggle menu for',
	insertToggleBtnAfter: 'a',
	slideDuration: 400,
	outerElement: document.body,
	outsideClickClose: true,
	animateHeight: true,
	cssPrefix: 'menu',
	menuBtnCss: 'i i-arrow-b',
	menuBtnSkip: false,
	afterNavItemOpen: noop,
	afterNavItemClose: noop,
	afterOpen: noop,
	afterClose: noop,
	doTrapFocus: true,
	trapFocusElem: null,
	stopPropagation: true,
	bkptEnable: null
};

export default class NavMobile {

	public $element: Cash;
	public params: INavMobileDefaults;
	public menuOpened: boolean;
	public allowClick: boolean;
	public cssList: NavMobileCssList;

	public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

	#transition = transition();
	
	constructor(element: HTMLElement, options: INavMobileOptions | StringPluginArgChoices) {
		const s = this;
		const dataOptions = getDataOptions(element, EVENT_NAME);

		s.$element = $(element);
		s.params = $.extend({}, NavMobile.defaults, options, dataOptions);
		
		const {cssPrefix, menuBtnCss} = s.params;
		s.cssList = {
			menuOuterOpen: `${cssPrefix}--outer-open`,
			menuHasUL: `${cssPrefix}__has-ul`,
			menuOpen: `${cssPrefix}--open`,
			menuOpening: `${cssPrefix}--is-opening`,
			menuClosing: `${cssPrefix}--is-closing`,
			menuToggling: `${cssPrefix}--toggling`,
			menuBtnCss:  `${cssPrefix}__btn-nav ${menuBtnCss}`
		};
		//run the methods
		s.addChildNavCss();
		s.handleEvents();
		s.checkIfEnabled();

		const elemID = element.id || element.className;

		$(s.params.enableBtn).attr({
			'aria-controls': elemID,
			'aria-label': s.params.ariaLabel
		});

		return s;
	}

	handleEvents() {
		const s = this;
		const css = s.cssList;
		const $enableBtn = $(s.params.enableBtn);
		
		
		$enableBtn
			.attr({ 'aria-expanded': 'false' })
			.on(`click.${EVENT_NAME} ${EVENT_NAME}`, function (e: MouseEvent) {

			if (!s.allowClick) return;

			s.#menuToggle();

			e.stopPropagation();
			e.preventDefault();
		});

		$(document).on(`keydown.${EVENT_NAME}`, (e: KeyboardEvent) => {

			if (e.code === KEYS.esc && s.$element.hasClass(css.menuOpen) && s.allowClick) {
				s.#menuToggle();

				if ($enableBtn.length) {

					($enableBtn as any)[0].focus();
				}
			}
		});

		s.#navToggle();
		s.#outsideClickClose();
	}

	#menuToggle() {
		const s = this;
		const p = s.params;
		const css = s.cssList;

		let trappedFocus: ITrapFocusRemove | null = null;
		const $enableBtn = $(p.enableBtn);
		const $elemParent = s.$element.parent();
		
		const doClose = s.menuOpened;
		const cssMenuState = `${doClose ? css.menuClosing : css.menuOpening} ${css.menuToggling}`;
		s.#transition(() => {
			 
			s.menuOpened = !doClose;

			s.$element.addClass(cssMenuState);
			$(p.enableBtn).attr({ 'aria-expanded': !doClose + '' });
			$(p.outerElement)
				.toggleClass(css.menuOuterOpen, !doClose)
				.addClass(cssMenuState);

			if (doClose) {

				$elemParent
					.find(`.${css.menuOpen}`)
					.removeClass(css.menuOpen)
					.find("[style]").css({'display': null});
				
				trappedFocus && (trappedFocus as ITrapFocusRemove).remove();
			} else {
				if (p.doTrapFocus) {
					trappedFocus = trapFocus(p.trapFocusElem || s.$element, { nameSpace: EVENT_NAME });
				}
			}
		},() => {
			$(p.outerElement).removeClass(cssMenuState);
			s.$element.removeClass(cssMenuState);

			if (!doClose) {
				s.$element.addClass(css.menuOpen);
			}

			s.params[doClose ? 'afterClose' : 'afterOpen'](s.$element, $(p.outerElement), $enableBtn);
			 
		}, p.slideDuration);
	}

	#navToggle() {
		const s = this;
		const css = s.cssList;
		s.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, `.${css.menuBtnCss.replace(/\s/g, '.')}`, function (e: KeyboardEvent) {

			const p = s.params;
			const css = s.cssList;

			const $li = $(this).closest(`.${css.menuHasUL}`);
			const doClose = $li.hasClass(css.menuOpen);
			const $ul = $li.find('ul').first();

			//exit because were in desktop view
			if (!s.allowClick) { return; }
		
			const cssMenuState = `${css.menuToggling} ${doClose ? css.menuClosing : css.menuOpening}`;
			
			s.allowClick = doClose;

			s.#transition(() => {

				$li.addClass(cssMenuState).toggleClass(css.menuOpen, !doClose);
				$ul.addClass(cssMenuState).toggleClass(css.menuOpen, !doClose);

				if (p.animateHeight) {
					const openHeight = ($ul.length ? ($ul[0] as HTMLUListElement).scrollHeight : 0);
					const height = doClose ? 0 : openHeight;
					
					$ul.css({ height: doClose ? openHeight : 0 });

					setTimeout(() => {
						$ul.css({ height });
					},0);
				}
			},
			() => {
				$li.removeClass(cssMenuState).toggleClass(css.menuOpen, !doClose);
				$ul.removeClass(cssMenuState).toggleClass(css.menuOpen, !doClose);
				$ul.css({ height: null });

				if (doClose) {
					s.params.afterNavItemClose($li);
				} else {
					s.params.afterNavItemOpen($li);
				}
				s.allowClick = true;
			}, p.slideDuration);

			e.stopPropagation();

		});

		s.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, 'a', function (e: MouseEvent) {
			//prohibit closing if an anchor is clicked
			if (s.params.stopPropagation) {
				
				e.stopPropagation();
			}
		});
	}

	#outsideClickClose() {
		const s = this;
		$(document.body).on(`click.${EVENT_NAME}`, function (e: MouseEvent) {
			if (s.params.outsideClickClose) {
				if (!s.menuOpened) { return; }//lets just exit then..
				 
				const menuClicked = e.target ?s.$element.has((e as any).target).length > 0: false;
				//if the menu item is not clicked and its opened
				//the menu button shouldn't register because propogation is prevented to the body
				if (!menuClicked && s.menuOpened) {
					s.#menuToggle();
				}
			}
		});

	}

	addChildNavCss() {
		const s = this;
		const p = s.params;
		const css = s.cssList;
		$('li', s.$element).has('ul').each(function () {
			const $this = $(this);
			let skipUl = false;

			if (
				typeof p.menuBtnSkip === 'function' &&
				// condition in function must return false
				(p.menuBtnSkip as submenuBtnSkipFn)(this)
			) {
				skipUl = true;
			}


			if (!$this.next('button').length && !skipUl) {
				const $el = $this.find(p.insertToggleBtnAfter).first();

				$el.addClass(css.menuHasUL);

				if ($el.length) {
					if (($el as any)[0].parentNode.isSameNode(this)) {
						// make sure the <el> is a direct child of <li>
						$el.after(
							$('<button>').attr({
								class: css.menuBtnCss,
								type: 'button',
								'aria-label': p.subMenuText + ' ' + $el.text().trim()
							})
						);
					}
				}
			}
		});
	}

	checkIfEnabled() {
		const s = this;

		let resizeTimer;

		//basically if the navigational button is visible then
		//we can allow the click to open the navigation
		//this is so it doesn't clash with any other plugins
		//and allows for the control of this click via CSS
		$(window).on(`resize.${EVENT_NAME} ${EVENT_NAME}`, function (e) {

			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				const $enableBtn: Cash = $(s.params.enableBtn);

				s.allowClick = typeof s.params.bkptEnable === 'number' ?
					$(window).width() <= s.params.bkptEnable :
					($enableBtn.length ? isVisible(<any>$enableBtn[0]) : false)
				;

			}, e.type === EVENT_NAME ? 0 : 200);
		}).trigger(EVENT_NAME);
	}

	static remove(element: Cash, plugin?: NavMobile) {

		$(element).each(function () {
			const s: NavMobile = plugin || Store(this, DATA_NAME);


			$(s.params.enableBtn).off(`click.${EVENT_NAME} ${EVENT_NAME}`);
			$(document).off(`keydown.${EVENT_NAME}`);
			s.$element
				.off(`click.${EVENT_NAME} ${EVENT_NAME}`)
				.off(`click.${EVENT_NAME} ${EVENT_NAME}`);

			$(document.body).off(`click.${EVENT_NAME}`);
			$(window).off(`resize.${EVENT_NAME} ${EVENT_NAME}`);

			Store(this, DATA_NAME, null);
		});
	}

}

declare module 'cash-dom' {
	interface Cash {
		navMobile(options: INavMobileOptions | StringPluginArgChoices): Cash;
	}
}