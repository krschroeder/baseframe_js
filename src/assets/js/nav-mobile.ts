import type { Cash, Selector } from "cash-dom";
import type { StringPluginArgChoices } from './types/shared';

import $ from 'cash-dom';
import parseObjectFromString from './util/parse-object-from-string';
import getType, { isVisible, transitionElem } from './util/helpers';
import submenuBtn from './util/plugin/nav';
import elemData from "./util/elemData";
import trapFocus, { ITrapFocusRemove } from './util/trap-focus';
import { KEYS } from "./util/constants";

type submenuBtnSkipFn = (elem: HTMLElement) => boolean;

export interface INavMobileOptions {
	enableBtn: Selector;
	ariaLabel?: string;
	slideDuration?: number;
	outerElement?: Selector;
	outsideClickClose?: boolean;
	hasUlCls?: string;
	menuOuterOpenCss?: string;
	menuOpenCss?: string;
	menuTogglingCss?: string;
	menuIsOpeningCss?: string;
	menuIsClosingCss?: string;
	submenuBtnCss?: string;
	submenuBtnSkip?: submenuBtnSkipFn | boolean;
	doTrapFocus?: boolean;
	trapFocusElem?: Selector | null;
	stopPropagation?: boolean;
	bkptEnable?: number | null;
	animateHeight?: boolean;
	afterNavItemOpen?: ($li: Cash) => void;
	afterNavItemClose?: ($li: Cash) => void;
	afterOpen?($element: Cash, outerElement: Cash | HTMLElement, enableBtn: string);
	afterClose?($element: Cash, outerElement: Cash | HTMLElement, enableBtn: string);
}

export interface INavMobileDefaults {
	enableBtn: Selector;
	ariaLabel: string;
	slideDuration: number;
	outerElement: string;
	outsideClickClose: boolean;
	hasUlCls: string;
	menuOuterOpenCss: string;
	menuOpenCss: string;
	menuTogglingCss: string;
	menuIsOpeningCss: string;
	menuIsClosingCss: string;
	submenuBtnCss: string;
	submenuBtnSkip: submenuBtnSkipFn | boolean;
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

declare module 'cash-dom' {
	interface Cash {
		navMobile(options?: INavMobileOptions | StringPluginArgChoices): Cash;
	}
}
const VERSION = "2.0.0";
const DATA_NAME = 'NavMobile';
const EVENT_NAME = 'navMobile';
const DEFAULTS = {
	enableBtn: '#mobile-nav-btn',
	ariaLabel: 'Toggle site navigation',
	slideDuration: 400,
	outerElement: document.body,
	outsideClickClose: true,
	animateHeight: true,
	hasUlCls: 'has-ul',
	menuOuterOpenCss: 'menu-opened',
	menuOpenCss: 'menu-opened',
	menuTogglingCss: 'menu-toggling',
	menuIsOpeningCss: 'menu-is-opening',
	menuIsClosingCss: 'menu-is-closing',
	submenuBtnCss: 'btn-nav--mb-submenu i i-arrow-b',
	submenuBtnSkip: false,
	afterNavItemOpen: () => { },
	afterNavItemClose: () => { },
	afterOpen: () => { },
	afterClose: () => { },
	doTrapFocus: true,
	trapFocusElem: null,
	stopPropagation: true,
	bkptEnable: null
};

export default class NavMobile {

	$element: Cash;
	params: INavMobileDefaults;
	menuOpened: boolean;
	allowClick: boolean;

	static get version() { return VERSION; }
	static get pluginName() { return DATA_NAME; }
	public static Defaults = DEFAULTS;

	constructor(element: HTMLElement, options: INavMobileOptions | StringPluginArgChoices) {
		const _ = this;

		const dataOptions = parseObjectFromString($(element).data(EVENT_NAME + '-options'));
		const instanceOptions = $.extend({}, NavMobile.Defaults, options, dataOptions)
		//props

		_.$element = $(element);

		elemData(element, `${DATA_NAME}_params`, instanceOptions);

		_.params = elemData(element, `${DATA_NAME}_params`);

		//run the methods
		_.addChildNavClass();
		_.buttonClick();
		_.navToggle();
		_.checkIfEnabled();
		_.outsideClickClose();


		const elemID = element.id || element.className;

		$(_.params.enableBtn).attr({
			'aria-controls': elemID,
			'aria-label': _.params.ariaLabel
		});

		return this;
	}

	static remove(element) {

		$(element).each(function () {
			const instance = elemData(this, `${DATA_NAME}_instance`);
			const params = elemData(this, `${DATA_NAME}_params`);

			$(params.enableBtn).off(`click.${EVENT_NAME} ${EVENT_NAME}`);
			$(document).off(`keydown.${EVENT_NAME}`);
			instance.$element
				.off(`click.${EVENT_NAME} ${EVENT_NAME}`)
				.off(`click.${EVENT_NAME} ${EVENT_NAME}`);

			$(document.body).off(`click.${EVENT_NAME}`);
			$(window).off(`resize.${EVENT_NAME} ${EVENT_NAME}`);

			elemData(this, `${DATA_NAME}_params`, null, true);
			elemData(this, `${DATA_NAME}_instance`, null, true);
		});
	}

	menuToggle() {
		const _ = this;
		const {
			enableBtn,
			outerElement,
			menuOpenCss,
			menuOuterOpenCss,
			menuIsOpeningCss,
			menuIsClosingCss,
			slideDuration,
			doTrapFocus,
			trapFocusElem
		} = _.params;

		let trappedFocus: ITrapFocusRemove | null = null;
		const $enableBtn = $(enableBtn);

		if (_.menuOpened) {
			// closing
			_.$element.parent()
				.find(`.${menuOpenCss}`)
				.removeClass(menuOpenCss)
				.find("[style]").css('display', '');

			$(outerElement).removeClass(menuOuterOpenCss).addClass(menuIsClosingCss);

			transitionElem(() => {
				$(outerElement).removeClass(menuIsClosingCss);
			}, slideDuration);

			_.menuOpened = false;

			trappedFocus && (trappedFocus as ITrapFocusRemove).remove();

			_.params.afterClose(_.$element, $(outerElement), $enableBtn);

		} else {
			// opening
			$(outerElement).addClass(menuIsOpeningCss);
			_.$element.addClass(menuIsOpeningCss);

			transitionElem(() => {
				_.$element.removeClass(menuIsOpeningCss).addClass(menuOpenCss);
				$(outerElement).removeClass(menuIsOpeningCss).addClass(menuOuterOpenCss);

			}, slideDuration);

			_.menuOpened = true;

			if (doTrapFocus) {
				trappedFocus = trapFocus(trapFocusElem || _.$element, { nameSpace: EVENT_NAME });
			}

			_.params.afterOpen(_.$element, $(outerElement), $enableBtn);
		}
		//update aria-expanded
		$(enableBtn).attr({ 'aria-expanded': _.menuOpened + '' });
	}

	addChildNavClass() {
		const _ = this;
		const { submenuBtnSkip } = _.params;

		$('li', _.$element).has('ul').each(function () {
			const $this = $(this);
			let skipUl = false;

			if (
				getType(submenuBtnSkip) === 'function' &&
				// condition in function must return false
				(submenuBtnSkip as submenuBtnSkipFn)(this)
			) {
				skipUl = true;
			}


			if (!$this.next('button').length && !skipUl) {
				const $a = $this.find('a').first();

				$a.addClass(_.params.hasUlCls);

				if ($a.length) {
					if (($a as any)[0].parentNode.isSameNode(this)) {
						// make sure the <a> is a direct child of <li>
						$a.after(submenuBtn(_.params, $a.text()))
					}
				}
			}
		});
	}

	buttonClick() {
		const _ = this;

		const $enableBtn = $(_.params.enableBtn);


		$enableBtn.on(`click.${EVENT_NAME} ${EVENT_NAME}`, function (e) {

			if (!_.allowClick) return;

			_.menuToggle();

			e.stopPropagation();
			e.preventDefault();
		});

		$(document).on(`keydown.${EVENT_NAME}`, (e: KeyboardEvent) => {

			if (e.code === KEYS.esc && _.$element.hasClass(_.params.menuOpenCss) && _.allowClick) {
				_.menuToggle();

				if ($enableBtn.length) {

					($enableBtn as any)[0].focus();
				}
			}
		});
	}

	navToggle() {
		const _ = this;
		_.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, `.${_.params.submenuBtnCss.replace(/\s/g, '.')}`, function (e: KeyboardEvent) {

			const {
				animateHeight,
				hasUlCls,
				menuOpenCss,
				menuIsOpeningCss,
				menuIsClosingCss,
				menuTogglingCss,
				slideDuration
			} = _.params;

			const $li = $(this).closest(`.${hasUlCls}`);
			const isOpened = $li.hasClass(menuOpenCss);
			const $ul = $li.find('ul').first();

			//exit because were in desktop view
			if (!_.allowClick) { return; }

			// const toggleCss = isOpened ? menuIsClosingCss : menuIsOpeningCss;
			const actionCss = `${menuTogglingCss} ${isOpened ? menuIsClosingCss : menuIsOpeningCss}`;
			//closing: toggle open-css
			//opening toggle close-css
			if (!isOpened) {

				_.allowClick = false;

				$li.addClass(actionCss);
				$ul.addClass(actionCss);

				if (animateHeight) {
					const ulHeightBeforeResetToZero = $ul.length ? ($ul as any)[0].scrollHeight : 0;
					$ul.css({ height: 0 });


					transitionElem(() => {
						$ul.css({ height: ulHeightBeforeResetToZero });
					});
				}

				setTimeout(() => {
					$li.removeClass(actionCss).addClass(menuOpenCss);
					$ul.removeClass(actionCss).addClass(menuOpenCss);

					$ul.css({ height: '' });

					_.params.afterNavItemOpen($li);

					_.allowClick = true;

				}, slideDuration);

			} else {

				_.allowClick = false;
				$li.addClass(actionCss).removeClass(menuOpenCss);
				$ul.addClass(actionCss).removeClass(menuOpenCss);

				$ul.find(`.${menuOpenCss}`).removeClass(menuOpenCss);

				if ($ul.length) {
					$ul.css({ height: ($ul as any)[0].scrollHeight });
				}

				if (animateHeight) {
					transitionElem(() => {
						$ul.css({ height: 0 });
					});
				}

				transitionElem(() => {
					$li.removeClass(actionCss);
					$ul.removeClass(actionCss);
					$ul.css({ height: '' });

					_.params.afterNavItemClose($li);
					_.allowClick = true;

				}, slideDuration);

			}

			e.stopPropagation();

		});

		_.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, 'a', function (e: MouseEvent) {
			//prohibit closing if an anchor is clicked
			if (_.params.stopPropagation) {
				
				e.stopPropagation();
			}
		});
	}

	outsideClickClose() {
		const _ = this;
		$(document.body).on(`click.${EVENT_NAME}`, function (e: MouseEvent) {
			if (_.params.outsideClickClose) {
				if (!_.menuOpened) { return; }//lets just exit then..
				 
				const menuClicked = e.target ?_.$element.has((e as any).target).length > 0: false;
				//if the menu item is not clicked and its opened
				//the menu button shouldn't register because propogation is prevented to the body
				if (!menuClicked && _.menuOpened) {
					_.menuToggle();
				}
			}
		});

	}

	checkIfEnabled() {
		const _ = this;

		let resizeTimer;

		//basically if the navigational button is visible then
		//we can allow the click to open the navigation
		//this is so it doesn't clash with any other plugins
		//and allows for the control of this click via CSS
		$(window).on(`resize.${EVENT_NAME} ${EVENT_NAME}`, function (e) {

			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				const $enableBtn: Cash = $(_.params.enableBtn);

				_.allowClick = typeof _.params.bkptEnable === 'number' ?
					$(window).width() <= _.params.bkptEnable :
					($enableBtn.length ? isVisible(<any>$enableBtn[0]) : false)
				;

			}, e.type === EVENT_NAME ? 0 : 200);
		}).trigger(EVENT_NAME);
	}
}