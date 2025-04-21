// import type { BaseElem, SelectorRoot } from "cash-dom";
import type { StringPluginArgChoices } from './types';
import $be, {type BaseElem, type SelectorRoot} from "base-elem-js";
// import $ from 'cash-dom';
import {  getDataOptions, noop, setParams } from './util/helpers';
 
import trapFocus, { type ITrapFocusRemove } from './fn/trapFocus';
import transition from "./fn/transition";
import { KEYS } from "./core/constants";
import Store from "./core/Store";
import type { EventName } from 'base-elem-js';
import { body } from './util/helpers';

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
	enableBtn: HTMLElement | string;
	ariaLabel: string;
	subMenuText: string;
	insertToggleBtnAfter: string;
	slideDuration: number;
	outerElement: HTMLElement | string;
	outsideClickClose: boolean;
	cssPrefix: string;
	menuBtnCss: string,
	menuBtnSkip: submenuBtnSkipFn | boolean;
	doTrapFocus: boolean;
	trapFocusElem: SelectorRoot | null;
	stopPropagation: boolean;
	bkptEnable: number | null;
	animateHeight: boolean;
	afterNavItemOpen: ($li: BaseElem) => void;
	afterNavItemClose: ($li: BaseElem) => void;
	afterOpen($element: BaseElem, outerElement: BaseElem, enableBtn: BaseElem);
	afterClose($element: BaseElem, outerElement: BaseElem, enableBtn: BaseElem);
}

export interface INavMobileOptions extends Partial<INavMobileDefaults> {
	enableBtn: HTMLElement | string;
}



const VERSION = "3.0.0";
const DATA_NAME = 'NavMobile';
const EVENT_NAME = 'navMobile';
const DEFAULTS: INavMobileDefaults = {
	enableBtn: '#mobile-nav-btn',
	ariaLabel: 'Toggle site navigation',
	subMenuText: 'toggle menu for',
	insertToggleBtnAfter: 'a',
	slideDuration: 400,
	outerElement: body,
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

const { findOne, isVisible, make } = $be.static;

export default class NavMobile {

	public $element: BaseElem;
	public params: INavMobileDefaults;
	public menuOpened: boolean;
	public allowClick: boolean;
	public cssList: NavMobileCssList;
    public $enableBtn: BaseElem;
   
	public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

	#transition = transition();
	
	constructor(element: HTMLElement, options: INavMobileOptions | StringPluginArgChoices) {
		const s = this;
		const dataOptions = getDataOptions(element, EVENT_NAME);

		s.$element = $be(element);
		s.params = setParams(NavMobile.defaults, options, dataOptions);
        s.$enableBtn = $be(s.params.enableBtn);
		
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

        s.$enableBtn.attr({
			'aria-controls': elemID,
			'aria-label': s.params.ariaLabel
		});

		return s;
	}

	handleEvents() {
		const s = this;
		const css = s.cssList;
		const $enableBtn = $be(s.params.enableBtn);
		
		
		$enableBtn
			.attr({ 'aria-expanded': 'false' })
			.on([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`], function (e: MouseEvent) {

			if (!s.allowClick) return;

			s.#menuToggle();

			e.stopPropagation();
			e.preventDefault();
		});

		$be(document).on(`keydown.${EVENT_NAME}`, (e: KeyboardEvent) => {

			if (e.code === KEYS.esc && s.$element.hasClass(css.menuOpen) && s.allowClick) {
				s.#menuToggle();

				if ($enableBtn.hasElems()) {

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
		const $enableBtn = $be(p.enableBtn);
		const $elemParent = s.$element.find(elem => elem.parentElement);
		
		const doClose = s.menuOpened;
		const cssMenuState = [doClose ? css.menuClosing : css.menuOpening, css.menuToggling];
		s.#transition(() => {
			 
			s.menuOpened = !doClose;

			s.$element.addClass(cssMenuState);
			$be(p.enableBtn).attr({ 'aria-expanded': !doClose + '' });
			$be(p.outerElement)
				.tgClass(css.menuOuterOpen, !doClose)
				.addClass(cssMenuState);

			if (doClose) {

				$elemParent
					.find(`.${css.menuOpen}`)
					.rmClass(css.menuOpen)
					.find("[style]").css({'display': null});
				
				trappedFocus && (trappedFocus as ITrapFocusRemove).remove();
			} else {
				if (p.doTrapFocus) {
					trappedFocus = trapFocus(p.trapFocusElem || s.$element, { nameSpace: EVENT_NAME });
				}
			}
		},() => {
			$be(p.outerElement).rmClass(cssMenuState);
			s.$element.rmClass(cssMenuState);

			if (!doClose) {
				s.$element.addClass(css.menuOpen);
			}

            const fn = doClose ? s.params.afterClose : s.params.afterOpen;

			fn(s.$element, $be(p.outerElement), $enableBtn);
			 
		}, p.slideDuration);
	}

	#navToggle() {
		const s = this;
		const css = s.cssList;
		s.$element.on([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`], function (ev: KeyboardEvent, elem: HTMLElement) {

			const p = s.params;
			const css = s.cssList;
            const hasULElem = elem.closest(`.${css.menuHasUL}`) as HTMLElement;
			const $li = $be(hasULElem );
			const doClose = $li.hasClass(css.menuOpen);
			const $ul = $li.find('ul').get(0);

			//exit because were in desktop view
			if (!s.allowClick) { return; }
		
			const cssMenuState = `${css.menuToggling} ${doClose ? css.menuClosing : css.menuOpening}`;
			
			s.allowClick = doClose;

			s.#transition(() => {

				$li.addClass(cssMenuState).tgClass(css.menuOpen, !doClose);
				$ul.addClass(cssMenuState).tgClass(css.menuOpen, !doClose);

				if (p.animateHeight) {
					const openHeight = ($ul.hasElems() ? ($ul[0] as HTMLUListElement).scrollHeight : 0);
					const height = doClose ? 0 : openHeight;
					
					$ul.css({ height: (doClose ? openHeight : 0) + 'px' });

					setTimeout(() => {
						$ul.css({ height: height + 'px' });
					},0);
				}
			},
			() => {
				$li.rmClass(cssMenuState).tgClass(css.menuOpen, !doClose);
				$ul.rmClass(cssMenuState).tgClass(css.menuOpen, !doClose);
				$ul.css({ height: null });

				if (doClose) {
					s.params.afterNavItemClose($li);
				} else {
					s.params.afterNavItemOpen($li);
				}
				s.allowClick = true;
			}, p.slideDuration);

			ev.stopPropagation();

		},`.${css.menuBtnCss.replace(/\s/g, '.')}`);

		s.$element.on([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`], (ev: MouseEvent, elem) => {
			//prohibit closing if an anchor is clicked
			if (s.params.stopPropagation) {
				
				ev.stopPropagation();
			}
		},'a');
	}

	#outsideClickClose() {
		const s = this;
		$be(document.body).on(`click.${EVENT_NAME}`, function (e: MouseEvent) {
			if (s.params.outsideClickClose) {
				if (!s.menuOpened) { return; }//lets just exit then..
				const menuClicked = (s.$element.elem[0] as HTMLElement).contains(e.target as HTMLElement);
				
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
		s.$element.find('li').each((elem: HTMLElement) => {
			const $li = $be(elem);
            const nextElem  = elem.nextElementSibling;
            const hasBtn = nextElem && nextElem.tagName === 'BUTTON' && nextElem.matches(`.${css.menuBtnCss}`);
            if (!$li.find('ul').hasElems()) return;

			let skipUl = false;

			if (typeof p.menuBtnSkip === 'function' && p.menuBtnSkip (elem)) {
				skipUl = true;
			}

			if (!hasBtn && !skipUl) {
				const $el = $li.find(p.insertToggleBtnAfter).get(0);

				$el.addClass(css.menuHasUL);

				if ($el.hasElems()) {
					if (($el.elem[0] as HTMLElement).parentElement === elem) {
						// make sure the <el> is a direct child of <li>
                        const $btn = $be(make(`button.${css.menuBtnCss}`,{
                            type: 'button',
                            ariaLabel: p.subMenuText + ' ' + $el.text().trim()
                        }));
                        
						$el.insert($btn,'after');
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
		$be(window).on([`resize.${EVENT_NAME}`,`[${EVENT_NAME}]`], function (e) {

			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				 
				s.allowClick = typeof s.params.bkptEnable === 'number' ?
					window.innerWidth <= s.params.bkptEnable :
					(s.$enableBtn.hasElems() ? isVisible(s.$enableBtn.elem[0] as HTMLElement) : false)
				;

			}, e.type === EVENT_NAME ? 0 : 200);
		}).trigger(EVENT_NAME);
	}

	static remove(element: BaseElem, plugin?: NavMobile) {

		$be(element).each((elem) => {
			const s: NavMobile = plugin || Store(elem, DATA_NAME);

			$be(document).off(`keydown.${EVENT_NAME}`);
			$be(s.params.enableBtn).off([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`] as EventName[]);
			s.$element.off([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`] as EventName[])
				 

			$be(document.body).off(`click.${EVENT_NAME}`);
			$be(window).off([`resize.${EVENT_NAME}`,`[${EVENT_NAME}]`] as EventName[]);

			Store(elem, DATA_NAME, null);
		});
	}

}

declare module 'base-elem-js' {
	interface BaseElem {
		navMobile(options: INavMobileOptions | StringPluginArgChoices): BaseElem;
	}
}