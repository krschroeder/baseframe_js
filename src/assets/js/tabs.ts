import type { Cash } from "cash-dom";
import type { LocationHashTracking, PrimaryClickElems, StringPluginArgChoices } from './types';

import $ from 'cash-dom';
import { getDataOptions } from "./util/helpers";
 
import Store from "./core/Store";
import UrlState from "./core/UrlState";
import transition from "./fn/transition";

type tabDefaultContent = string;

export interface ITabsDefaults extends LocationHashTracking {
	tabsEvent: string;
	cssPrefix: string;	 
	addIDtoPanel: boolean;
	ariaLabel: boolean;
	tabChange(tabId: string, prevTabId: string, tabsList: Cash, tabsBody: Cash): void;
	onInit(tabsList: Cash, tabsBody: Cash): void
}

export interface ITabsOptions extends Partial<ITabsDefaults> {}

const VERSION = "1.5.0";
const DATA_NAME = 'Tabs';
const EVENT_NAME = 'tabs';
const DEFAULTS: ITabsDefaults = {
	tabsEvent: 'click',
	cssPrefix: 'tabs',
	locationFilter: null,
	urlFilterType: 'hash',
	historyType: 'push',
	loadLocation: true,
	addIDtoPanel: true,
	ariaLabel: true,
	
	tabChange: () => { },
	onInit: () => { }
};

const getTabIDFromEl = (el:PrimaryClickElems): string => {
	return (el instanceof HTMLButtonElement ? el.dataset.href : el.hash)?.replace(/^\#/, '') || '';
}



export default class Tabs {

	
	public $element: Cash;
	public params: ITabsDefaults;
	public $tabsNav: Cash;
	public $tabsNavClickElems: Cash;
	public tabsNavClickElems: PrimaryClickElems[];
	public $tabsBody: Cash;
	public $tabsBodyPanels: Cash;
	public prevTabId: string;
	public initTabId: string;
	public initDefaultContent: tabDefaultContent;
	
	public static defaults = DEFAULTS;
	static get version() { return VERSION; }
	static get pluginName() { return EVENT_NAME; }

	#transition = transition();

	constructor(element: HTMLElement, options: ITabsOptions | StringPluginArgChoices) {
		const s = this;
		const dataOptions = getDataOptions(element, EVENT_NAME);
		
		s.$element = $(element);
		s.params = $.extend({}, Tabs.defaults, options, dataOptions);
		
		const p = s.params;

		s.$tabsNav = s.$element.find(`.${p.cssPrefix}__nav`).first();
		s.$tabsBody = s.$element.find(`.${p.cssPrefix}__body`).first();
		
		const tabsBody = s.$tabsBody[0] as HTMLElement;
		s.$tabsBodyPanels = s.$tabsBody.find(`.${p.cssPrefix}__panel`)
			// ensure they're the children of the body
			// must be direct child
			.filter((i,el) => el.parentElement.isSameNode(tabsBody));
		s.$tabsNavClickElems = s.$tabsNav.find('a, button');
		s.tabsNavClickElems = [...s.$tabsNavClickElems] as PrimaryClickElems[];
		s.prevTabId = null;
		s.initDefaultContent = s.$tabsBodyPanels.eq(0).data('tab-id');
		 	 
		//init
		s.setAriaAttrs();
		s.handleEvents();
		s.loadDefaultContent();
		s.loadFromUrl();
	
		s.params.onInit(s.$tabsNav, s.$tabsBody);

		return s;
	}

	loadDefaultContent() {
		const s = this;
		const tabId = s.initDefaultContent; 
		const clickElem = s.getClickElemFromTabId(tabId);

		s.changeTabElements(clickElem, tabId, false);
	}

	loadFromUrl() {
		const s = this;
		const p = s.params;

		if (p.locationFilter !== null || p.loadLocation) {
		
			const tabId = UrlState.get(p.urlFilterType, p.locationFilter) as string;
			 
			if (tabId) {
				const clickElem = s.getClickElemFromTabId(tabId);
				clickElem && s.changeTabElements(clickElem, tabId, false);
			}
		}
	}

	getClickElemFromTabId(tabId: string):PrimaryClickElems {
		const $clickElem = this.$tabsNavClickElems.filter((i, el: PrimaryClickElems) => getTabIDFromEl(el) === tabId);

		if ($clickElem.length) {
			return $clickElem[0] as PrimaryClickElems;
		}

		return null;
	}

	setAriaAttrs() {
		const s = this;
		const p = s.params;

		s.$tabsNavClickElems.each(function () {

			const tabId = getTabIDFromEl(this as PrimaryClickElems);
			const $tabBodyItem = s.$tabsBodyPanels.filter((i,el) => el.dataset.tabId === tabId);

			$(this).attr({
				'aria-selected': 'false',
				'role': 'tab',
				'aria-controls': tabId
			});

			$tabBodyItem.attr({
				'aria-label':  p.ariaLabel ? this.textContent : null,
				'role': 'tabpanel',
				tabindex: '-1'
			});

			if (p.addIDtoPanel) {
				$tabBodyItem.attr({ 'id': tabId });
			}
		});
	}

	handleEvents() {
		const s = this;

		s.$tabsNav.on(`${s.params.tabsEvent}.${EVENT_NAME} ${EVENT_NAME}`, "a, button", function (e: MouseEvent) {
			const clickElem = this as PrimaryClickElems; 
			const tabId = getTabIDFromEl(clickElem);
		
			s.changeTabElements(clickElem, tabId);
			e.preventDefault();
		});


		s.$tabsNav.on('keydown.' + EVENT_NAME, function (e:KeyboardEvent) {
			const target = e.target as PrimaryClickElems;
			const index = s.tabsNavClickElems.findIndex(el => el.isSameNode(target));
			const next = e.key === 'ArrowRight' || e.key === 'ArrowDown';
			const prev = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
			 
			if (index !== -1 && (next || prev)) {
				 
				const changeIndex = next ? index + 1 : index - 1;
				const nextBtn = s.tabsNavClickElems[changeIndex];
				
				if (nextBtn) {
					// $(target).attr({'tabindex': '-1'});
					const tabId = getTabIDFromEl(nextBtn);
					s.changeTabElements(nextBtn,tabId);
					$(nextBtn)[0].focus();
				}

				e.preventDefault();
			}
		});

		$(window).on(`popstate.${EVENT_NAME} ${EVENT_NAME}`, (e) => {
			if (s.params.historyType === 'push') {

				s.loadFromUrl();
				e.preventDefault();
			}
		})
	}

	changeTabElements(clickElem: PrimaryClickElems, tabId: string, updateUrl = true) {

		const s = this;
		const p = s.params;
		let hasTab = false;
		

		const 
			cssOpen 	= `${p.cssPrefix}__panel--open`,
			cssToggling = `${p.cssPrefix}__panel--toggling`,
			cssOpening 	= `${p.cssPrefix}__panel--opening`,
			cssClosing 	= `${p.cssPrefix}__panel--closing`
		;
		
		s.#transition(() => {
			s.$tabsBodyPanels.each(function(){
				const thisTabId = this.dataset.tabId;

				if (thisTabId === tabId) {
					
					$(this)
						.addClass(`${cssToggling} ${cssOpening}`)
						.attr({ 'aria-hidden': null, tabindex: '0'});

					hasTab = true;
				} 
				
				if (s.prevTabId && s.prevTabId === thisTabId) {
					$(this)
						.addClass(`${cssToggling} ${cssClosing}`)
						.attr({ 'aria-hidden': 'true', tabindex: '-1'});
				}
			});

			if (hasTab) {
				
				s.params.tabChange(tabId, s.prevTabId, s.$tabsNav, s.$tabsBody);
				s.prevTabId = tabId;
				
				s.$tabsNavClickElems
					.attr({ 'aria-selected': 'false', tabindex: '-1' })
					.parent('li').removeClass(`${p.cssPrefix}__nav-li--active`);

				$(clickElem)
					.attr({ 'aria-selected': 'true', tabindex: '0' })
					.parent('li').addClass(`${p.cssPrefix}__nav-li--active`);
		
				if (updateUrl) {
					const paramVal = s.initDefaultContent === tabId ? null : tabId;
					
					if (p.urlFilterType === 'hashVal') { 
						UrlState.setHashVal(paramVal, p.historyType);
					} else {
						UrlState.set(p.urlFilterType, p.locationFilter, paramVal, p.historyType);
					}
				}
			}
		},
		() => {
			s.$tabsBodyPanels.each(function(){
				const isTab = this.dataset.tabId === tabId;

				$(this)
					.toggleClass(cssOpen, isTab)
					.removeClass(`${cssToggling} ${cssOpening} ${cssClosing}`)
			})
		});
	}

	static remove(element: Cash, plugin?: Tabs) {
		$(element).each(function () {
			const s: Tabs = plugin || Store(this, DATA_NAME);
			const params = s.params;

			s.$tabsNav.off(`${params.tabsEvent}.${EVENT_NAME} ${EVENT_NAME}`);
			s.$tabsNav.off('keydown.' + EVENT_NAME);
			s.$tabsNav.find('a, button').attr({ tabndex: null })
			$(window).off(`popstate.${EVENT_NAME} ${EVENT_NAME}`);

			Store(this, DATA_NAME, null);
		})
	}
}

declare module 'cash-dom' {
    interface Cash {
        tabs(options?: ITabsOptions | StringPluginArgChoices): Cash;
    }
}