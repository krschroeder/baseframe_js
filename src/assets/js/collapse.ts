import type { Cash } from "cash-dom";
import type { LocationHashTracking, StringPluginArgChoices } from './types';

import $ from 'cash-dom';

import { getDataOptions, noop } from './util/helpers';

import smoothScroll from './fn/smoothScroll';
import transition	from "./fn/transition";

import UrlState 	from "./core/UrlState"; 
import Store 		from "./core/Store";

 
export interface ICollapseDefaults extends LocationHashTracking {
	cssPrefix: string;
	toggleDuration: number;
	toggleGroup: boolean;
	moveToTopOnOpen: boolean;
	moveToTopOffset: number;
	scrollSpeed: number;
	afterOpen($btnElems: Cash, $collapsibleItem: Cash): void;
	afterClose($btnElems: Cash, $collapsibleItem: Cash): void;
	afterInit($element: Cash): void;
}

export interface ICollapseOptions extends Partial<ICollapseDefaults> {};

const VERSION = "4.0.0";
const DATA_NAME = 'Collapse';
const EVENT_NAME = 'collapse';
const DEFAULTS: ICollapseDefaults = {
	cssPrefix: 'collapse',
	toggleDuration: 500,
	toggleGroup: false,
	moveToTopOnOpen: false,
	moveToTopOffset: 0,
	scrollSpeed: 100,
	urlFilterType: 'hash',
	historyType: 'replace',
	locationFilter: null,
	loadLocation: true,
	afterOpen: noop,
	afterClose: noop,
	afterInit: noop
};

export default class Collapse {
	 
	public $element: Cash;
	public params: ICollapseDefaults;
	public toggling: boolean;
	public $btnElems: Cash | null;
	public $activeItem: Cash | null;
	public initLoaded: boolean;
	
	public static defaults = DEFAULTS;

	#transition = transition();

	constructor(element: HTMLElement, options: ICollapseOptions | StringPluginArgChoices, index?: number) {

		const s = this;

		s.$element = $(element);

		const dataOptions = getDataOptions(element, EVENT_NAME);
	 
		s.params = $.extend({}, Collapse.defaults, options, dataOptions);
		s.toggling = false;
		s.$btnElems = s.$element.find(`.${s.params.cssPrefix}__btn`).attr({'aria-expanded': 'false'});
		s.$activeItem = null;
		s.initLoaded = false;
		// init
		s.loadFromUrl();
		s.handleEvents();
		s.params.afterInit(s.$element);

		Store(element, DATA_NAME, s);

		return s;
	}

	static get version() {
		return VERSION;
	}

	static remove(element: Cash, plugin?: Collapse) {
		$(element).each(function () {

			const s: Collapse = plugin || Store(this, DATA_NAME);

			s.$element.off(`click.${EVENT_NAME} ${EVENT_NAME}`);
			$(window).off(`popstate.${EVENT_NAME}`);
			// delete the Store item
			Store(this, DATA_NAME, null);
		})
	}

	handleEvents() {
		const s = this;
		const { cssPrefix } = s.params;
 
	 
		s.$element.on(`click.${EVENT_NAME} ${EVENT_NAME}`, `.${cssPrefix}__btn`, function (e: Event) {
			const elemId = $(this).attr('aria-controls') || this.hash.substring(1);
			 
			s.toggleAction(elemId);

			e.preventDefault();
		});

		$(window).on(`popstate.${EVENT_NAME}`, (e: Event) => {
			if (s.params.historyType === 'push') {
				s.loadFromUrl(); 
				s.initLoaded = true;
				e.preventDefault();
			}
		})
	}

	loadFromUrl() {
		const s = this;
		const p = s.params;

		const loadElem = (filterEl: string) => {
			
			const cssOpen = `${p.cssPrefix}--open`;
			const $tryElem = s.$element.find('#' + filterEl);

			if ($tryElem.length) {

				s.$activeItem = $tryElem;
				s.$activeItem.addClass(cssOpen);
				
				s.$btnElems
					.filter((i, el) => $(el).attr('aria-controls') === filterEl)
					.attr({'aria-expanded': 'true'});
			}
		} 
		 
		if (p.locationFilter !== null || p.loadLocation) {
			 
			const filterEl = UrlState.get(p.urlFilterType, p.locationFilter);
			const cssOpen = `${p.cssPrefix}--open`;
			s.$element.find(`.${p.cssPrefix}__body.${cssOpen}`).removeClass(cssOpen);
			s.$btnElems.attr({'aria-expanded': 'false'});

			if (filterEl) {
				if (Array.isArray(filterEl)) {
						
					filterEl.forEach(loadElem);
					
				} else {
					loadElem(filterEl);
				}
					
			}
		}
	}

	toggleAction(currElemID: string) {
		const s = this;

		if (s.toggling || currElemID === null) return;
		
		const { cssPrefix } = s.params;
		const p = s.params;

		s.$activeItem = s.$element.find('#' + currElemID);
		
		if (s.$activeItem.length) {
			
			const 
				cssOpen 	= `${cssPrefix}--open`,
				cssToggling = `${cssPrefix}--toggling`,
				cssOpening 	= `${cssPrefix}--opening`,
				cssClosing 	= `${cssPrefix}--closing`,
				cssBodyOpen = `.${cssPrefix}__body.${cssOpen}`
			;
			const $currOpenItems = s.$element.find(cssBodyOpen);
			const $itemsToClose = $currOpenItems.filter((i, el) =>  p.toggleGroup || el.id === currElemID);
			const activeAlreadyOpen = s.$activeItem.hasClass(cssOpen);

			s.#transition(() => {
				s.toggling = true;
				
				s.$btnElems.each(function(){
					const $btn = $(this);
					const isCurrent = $btn.attr('aria-controls') === currElemID;
					const expanded = isCurrent && $btn.attr('aria-expanded') === 'false';
					
					if (p.toggleGroup) {
						$btn.attr({ 'aria-expanded': expanded + '' });
						
					} else {
						if (isCurrent) {
							$btn.attr({ 'aria-expanded': expanded + '' });
						}
					}
				});

				$itemsToClose.each(function(){
					$(this).css({ height: this.scrollHeight });
				});
				setTimeout(() => {
					$itemsToClose
						.removeClass(cssOpen)
						.addClass(`${cssToggling} ${cssClosing}`)
						.css({ height: 0 });
				},0);

				if (!activeAlreadyOpen) {

					s.$activeItem
						.addClass(`${cssToggling} ${cssOpening}`)
						.css({ height: s.$activeItem[0].scrollHeight })
				}

			},
			() => {
				s.toggling = false;

				$itemsToClose
					.removeClass(`${cssToggling} ${cssClosing}`)
					.css({ height: null });
				
				s.params.afterClose(s.$btnElems, $itemsToClose);
				

				if (!activeAlreadyOpen) {
					s.$activeItem
						.addClass(cssOpen)
						.removeClass(`${cssToggling} ${cssOpening}`)
						.css({ height: null });
				}

				// Update History in URL
				const paramList = [...s.$element.find(cssBodyOpen)].map((el:HTMLElement) => el.id)
				const paramVal = paramList.length === 1 ? paramList[0] : paramList.length > 0 ? paramList : null;

				UrlState.set(p.urlFilterType, p.locationFilter, paramVal, p.historyType);
		
				s.params.afterOpen(s.$btnElems, s.$activeItem);
				s.moveToTopOnOpen();
			});			
		}
	}

	moveToTopOnOpen() {
		const s = this;
		const { cssPrefix, moveToTopOffset, moveToTopOnOpen, scrollSpeed } = s.params;
		
		if (s.$activeItem) {
			const $item: Cash = s.$activeItem.parent(`.${cssPrefix}__item`) || s.$activeItem as Cash;

			if ($item.length && moveToTopOnOpen) {
				// get the compiler to stop from throwing 
				// an error it'll never throw by setting to 'any'
				const elemOffsetTop = ($item as any).offset().top;
				const top = elemOffsetTop - moveToTopOffset;

				smoothScroll(top, scrollSpeed)
			}
		}
	}
}

declare module 'cash-dom' {
    export interface Cash {
        collapse(options?: ICollapseOptions | StringPluginArgChoices): Cash;
	}
}
