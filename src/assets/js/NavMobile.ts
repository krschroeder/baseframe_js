// import type { BaseElem, SelectorRoot } from "cash-dom";
import type { StringPluginArgChoices } from './types';
import $be, {type BaseElem, type SelectorRoot} from "base-elem-js";
// import $ from 'cash-dom';
import {  getDataOptions, isFunc, noop, reflow, setParams } from './util/helpers';
 
import focusTrap, { type ITrapFocusRemove } from './fn/focusTrap';
import { KEYS } from "./core/constants";
import Store from "./core/Store";
import type { EventName } from 'base-elem-js';
import { body } from './util/helpers';
import { debounceResize } from './fn/debounce';

type SubmenuBtnSkipFn = (elem: HTMLElement) => boolean;

interface NavMobileCssList {
	outerOpen: string;
	hasUl: string;
    noUl: string;
	open: string;
	opening: string;
	closing: string;
	toggling: string;
	btn: string;
}

export interface INavMobileDefaults {
	enableBtn: HTMLElement | string;
	ariaLabel: string;
	tgBtnText: string;
	insertBtnAfter: string;
	slideDuration: number;
	outerElement: HTMLElement | string;
	outsideClickClose: boolean;
	cssPrefix: string;
	menuBtnCss: string,
	menuBtnSkip: SubmenuBtnSkipFn | boolean;
	doTrapFocus: boolean;
	trapFocusElem: SelectorRoot | null;
	stopPropagation: boolean;
	bkptEnable: number | null;
	animateHeight: boolean;
	afterNavItemOpen: (li: HTMLLIElement[]) => void;
	afterNavItemClose: (li: HTMLLIElement[]) => void;
	afterOpen(element: HTMLElement, outerElement: HTMLElement[], enableBtn: HTMLElement);
	afterClose(element: HTMLElement, outerElement: HTMLElement[], enableBtn: HTMLElement);
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
	tgBtnText: 'toggle menu for',
	insertBtnAfter: 'a',
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

const { isVisible, make, useTransition } = $be.static;

export default class NavMobile {

	public $element: BaseElem;
    public element: HTMLElement;
	public params: INavMobileDefaults;
	public menuOpened: boolean;
	public allowClick: boolean;
	public cssList: NavMobileCssList;
    public $enableBtn: BaseElem;
    public enableBtn: HTMLElement;
   
	public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

	#transition = useTransition();
	
	constructor(element: HTMLElement, options: INavMobileOptions | StringPluginArgChoices) {
		const s = this;
		const dataOptions = getDataOptions(element, EVENT_NAME);

		s.$element = $be(element);
        s.element = element;
		s.params = setParams(NavMobile.defaults, options, dataOptions);
        s.$enableBtn = $be(s.params.enableBtn);
		s.enableBtn = s.$enableBtn.elem[0] as HTMLElement;

		const {cssPrefix, menuBtnCss} = s.params;
		s.cssList = {
			outerOpen:  `${cssPrefix}--outer-active`,
			open:       `${cssPrefix}--active`,
            opening:    `${cssPrefix}--starting`,
			closing:    `${cssPrefix}--ending`,
			toggling:   `${cssPrefix}--toggling`,
			hasUl:      `${cssPrefix}__has-ul`,
            noUl:       `${cssPrefix}__no-ul`,
			btn:        `${cssPrefix}__btn-tg ${menuBtnCss}`
		};
		//run the methods
		s.#addCssAndBtn();
		s.#handleEvents();
		s.#checkIfEnabled();

		const elemID = element.id || element.className;

        s.$enableBtn.attr({
			'aria-controls': elemID,
			'aria-label': s.params.ariaLabel
		});

		return s;
	}

	#handleEvents() {
		const s = this;
        const p = s.params;
		const css = s.cssList;
		const $enableBtn = $be(p.enableBtn);
		
		
		$enableBtn
			.attr({ 'aria-expanded': 'false' })
			.on([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`], function (e: MouseEvent) {

			if (!s.allowClick) return;

			s.#menuToggle();

			e.stopPropagation();
			e.preventDefault();
		});

		$be(document).on(`keydown.${EVENT_NAME}`, (e: KeyboardEvent) => {

			if (
                e.code === KEYS.esc && 
                s.$element.hasClass(css.open) && 
                s.allowClick
            ) {
				s.#menuToggle();
                 
				if ($enableBtn.hasEls) {
					($enableBtn.elem[0] as HTMLElement).focus();
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
		const $elemParent = s.$element.find(elem => elem.parentElement);
		const doClose = s.menuOpened;
		const cssMenuState = [doClose ? css.closing : css.opening, css.toggling];

        const $outerElem = $be(p.outerElement);

		s.#transition(() => {
			 
			s.menuOpened = !doClose;

			s.$element.addClass(cssMenuState);
			$be(p.enableBtn).attr({ 'aria-expanded': !doClose + '' });
			$outerElem
				.tgClass(css.outerOpen, !doClose)
				.addClass(cssMenuState);

			if (doClose) {

				$elemParent
					.find(`.${css.open}`)
					.rmClass(css.open)
					.find("[style]").css({'display': null});
				
				trappedFocus && (trappedFocus as ITrapFocusRemove).remove();
			} else {
				if (p.doTrapFocus) {
					trappedFocus = focusTrap(p.trapFocusElem || s.$element, { nameSpace: EVENT_NAME });
				}
			}
		},() => {
			$outerElem.rmClass(cssMenuState);
			s.$element.rmClass(cssMenuState);

			if (!doClose) {
				s.$element.addClass(css.open);
			}

            const fn = doClose ? p.afterClose : p.afterOpen;

			fn(s.element, $outerElem.toArray() as HTMLElement[], s.enableBtn);
			 
		}, p.slideDuration);
	}

	#navToggle() {
		const s = this;
        const p = s.params;
		const css = s.cssList;

		s.$element.on([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`], function (ev: KeyboardEvent, elem: HTMLElement) {

            const ulElem = elem.closest(`.${css.hasUl}`) as HTMLElement;

			//exit because were in desktop view
			if (!s.allowClick || !ulElem) return;
            
			const $li = $be(ulElem);
			const $ul = $li.find('ul').get(0);
			const close = $li.hasClass(css.open);
		
			const cssMenuState = [css.toggling, close ? css.closing : css.opening];
			
			s.allowClick = close;

			s.#transition(() => {

				$li.addClass(cssMenuState).tgClass(css.open, !close);
				$ul.addClass(cssMenuState).tgClass(css.open, !close);

				if (p.animateHeight) {
					const openHeight = ($ul.hasEls ? ($ul.elem[0] as HTMLUListElement).scrollHeight : 0);
					const height = close ? 0 : openHeight;
					
					$ul.css({ height: (close ? openHeight : 0) + 'px' })
                        .each(elem => reflow(elem))
                        .css({ height: height + 'px' });
				}
			},
			() => {
				$li.rmClass(cssMenuState).tgClass(css.open, !close);
				$ul.rmClass(cssMenuState).tgClass(css.open, !close).css({ height: null });

                const li = $li.toArray() as HTMLLIElement[];

				if (close) p.afterNavItemClose(li);
				else p.afterNavItemOpen(li);
				
				s.allowClick = true;
			}, p.slideDuration);

			ev.stopPropagation();

		},`.${css.btn.replace(/\s/g, '.')}`);

		s.$element.on([`click.${EVENT_NAME}`,`[${EVENT_NAME}]`], (ev: MouseEvent, elem) => {
			//prohibit closing if an anchor is clicked
			if (s.params.stopPropagation) {
				
				ev.stopPropagation();
			}
		},'a');
	}

	#outsideClickClose() {
		const s = this;
		$be(document.body).on(`click.${EVENT_NAME}`, (e: MouseEvent) => {
			if (s.params.outsideClickClose) {
				if (!s.menuOpened) return
				const menuClicked = (s.$element.elem[0] as HTMLElement).contains(e.target as HTMLElement);
			
				if (!menuClicked && s.menuOpened) {
					s.#menuToggle();
				}
			}
		});
	}

    #addCssAndBtn() {
		const s = this;
        const p = s.params;
		const css = s.cssList;
        const $lis = $be('li', s.element);
        
        $lis.each((elem, i) => {
            const $li = $be(elem);
            const $uls = $li.findBy('tag','ul');
            const ulCss = $uls.hasEls ? css.hasUl : css.noUl;
            const nextElem = elem.nextElementSibling as HTMLElement;
             
            $li.addClass(ulCss);
            
            if (!$uls.hasEls) return;

            const menuBtnSkip = isFunc(p.menuBtnSkip) ? 
                (p.menuBtnSkip as SubmenuBtnSkipFn)(elem) : 
                p.menuBtnSkip
            ;

            if (!menuBtnSkip) {
                const $afterEl = $li.find(p.insertBtnAfter).get(0);
                const btnAlreadySet = nextElem ? $be(nextElem).hasClass(css.btn): false;

                if (!btnAlreadySet) {
                    const btn = make(`button.${css.btn}`,{
                        type: 'button',
                        ariaLabel: p.tgBtnText
                    });
                    
                    $afterEl.insert(btn,'after');
                }
			}
        });
	}

	#checkIfEnabled() {
		const s = this;
        const p = s.params;
        //basically if the navigational button is visible then
		//we can allow the click to open the navigation
		//this is so it doesn't clash with any other plugins
		//and allows for the control of this click via CSS

        debounceResize(() => {
            const bkptEnIsNum = typeof p.bkptEnable === 'number';

            s.allowClick = bkptEnIsNum ?
                window.innerWidth <= p.bkptEnable :
                s.$enableBtn.hasEls ? 
                    isVisible(s.$enableBtn.elem[0] as HTMLElement) : 
                    false
            ;
        }, EVENT_NAME, true, 200);
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

export interface NavMobilePlugin {
    navMobile(options: INavMobileOptions | StringPluginArgChoices): BaseElem;
}
 
declare module 'base-elem-js' {
    interface BaseElem extends NavMobilePlugin {}
}