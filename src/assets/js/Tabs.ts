// import type { BaseElem } from "cash-dom";
import type { LocationHashTracking, PrimaryClickElems, StringPluginArgChoices } from './types';

// import $ from 'cash-dom';
import $be, { type BaseElem, type SelectorRoot, type EventName } from "base-elem-js";
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
	defaultContent: number;
	tabChange(tabId: string, prevTabId: string, tabsList: BaseElem, tabsBody: BaseElem): void;
	onInit(tabsList: BaseElem, tabsBody: BaseElem): void
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
	defaultContent: 0,
	tabChange: () => { },
	onInit: () => { }
};

const getTabIDFromEl = (el:PrimaryClickElems): string => {
	return (el instanceof HTMLButtonElement ? el.dataset.href : el.hash)?.replace(/^\#/, '') || '';
}



export default class Tabs {

	
	public $element: BaseElem;
	public params: ITabsDefaults;
	public $tabsNav: BaseElem;
	public $tabsNavClickElems: BaseElem;
	public tabsNavClickElems: PrimaryClickElems[];
	public $tabsBody: BaseElem;
	public $tabsBodyPanels: BaseElem;
	public prevTabId: string;
	public initTabId: string;
	public initDefaultContent: tabDefaultContent;
	
	public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

	#transition = transition();

	constructor(element: HTMLElement, options: ITabsOptions | StringPluginArgChoices) {
		const s = this;
		const dataOptions = getDataOptions(element, EVENT_NAME);
		
		s.$element = $be(element);
		s.params = Object.assign({}, Tabs.defaults, options, dataOptions);
		
		const p = s.params;

		s.$tabsNav = s.$element.find(`.${p.cssPrefix}__nav`).get(0);
		s.$tabsBody = s.$element.find(`.${p.cssPrefix}__body`).get(0);
		
		const tabsBody = s.$tabsBody[0] as HTMLElement;
		s.$tabsBodyPanels = s.$tabsBody.find(`.${p.cssPrefix}__panel`, elem => elem === tabsBody);
		s.$tabsNavClickElems = s.$tabsNav.find('a, button');
		s.tabsNavClickElems = s.$tabsNavClickElems.toArray() as PrimaryClickElems[];
		s.prevTabId = null;
		s.initDefaultContent = s.$tabsBodyPanels.get(p.defaultContent).attr('tab-id');
		 	 
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

		if (p.locationFilter !== null && p.loadLocation && p.urlFilterType !== 'none') {
		
			const tabId = UrlState.get(p.urlFilterType, p.locationFilter) as string;
			 
			if (tabId) {
				const clickElem = s.getClickElemFromTabId(tabId);
				clickElem && s.changeTabElements(clickElem, tabId, false);
			}
		}
	}

	getClickElemFromTabId(tabId: string):PrimaryClickElems | null {
		const $clickElem = this.$tabsNavClickElems.filter((el: PrimaryClickElems) => getTabIDFromEl(el) === tabId);

		if ($clickElem.hasElems()) {
			return $clickElem[0] as PrimaryClickElems;
		}

		return null;
	}

	setAriaAttrs() {
		const s = this;
		const p = s.params;

		s.$tabsNavClickElems.each(function () {

			const tabId = getTabIDFromEl(this as PrimaryClickElems);
			const $tabBodyItem = s.$tabsBodyPanels.filter(elem => elem.dataset.tabId === tabId);

			$be(this).attr({
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

		s.$tabsNav.on([`${s.params.tabsEvent}.${EVENT_NAME}`,`[${EVENT_NAME}]`] as EventName[], (ev: MouseEvent, elem) => {
			const clickElem = elem as PrimaryClickElems; 
			const tabId = getTabIDFromEl(clickElem);
		
			s.changeTabElements(clickElem, tabId);
			ev.preventDefault();
		}, "a, button");


		s.$tabsNav.on(`keydown.${EVENT_NAME}`, function (e:KeyboardEvent) {
			const target = e.target as PrimaryClickElems;
			const index = s.tabsNavClickElems.findIndex(el => el.isSameNode(target));
			const next = e.key === 'ArrowRight' || e.key === 'ArrowDown';
			const prev = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
			 
			if (index !== -1 && (next || prev)) {
				 
				const changeIndex = next ? index + 1 : index - 1;
				const nextBtn = s.tabsNavClickElems[changeIndex];
				
				if (nextBtn) {
					// $be(target).attr({'tabindex': '-1'});
					const tabId = getTabIDFromEl(nextBtn);
					s.changeTabElements(nextBtn,tabId);
					$be(nextBtn)[0].focus();
				}

				e.preventDefault();
			}
		});

		$be(window).on(`popstate.${EVENT_NAME} ${EVENT_NAME}`, (e) => {
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
					
					$be(this)
						.addClass(`${cssToggling} ${cssOpening}`)
						.attr({ 'aria-hidden': null, tabindex: '0'});

					hasTab = true;
				} 
				
				if (s.prevTabId && s.prevTabId === thisTabId) {
					$be(this)
						.addClass(`${cssToggling} ${cssClosing}`)
						.attr({ 'aria-hidden': 'true', tabindex: '-1'});
				}
			});

			if (hasTab) {
				
				s.params.tabChange(tabId, s.prevTabId, s.$tabsNav, s.$tabsBody);
				s.prevTabId = tabId;
				
				s.$tabsNavClickElems
					.attr({ 'aria-selected': 'false', tabindex: '-1' })
					.find(elem => elem.closest('li')).rmClass(`${p.cssPrefix}__nav-li--active`);

				$be(clickElem)
					.attr({ 'aria-selected': 'true', tabindex: '0' })
					.find(elem => elem.closest('li')).addClass(`${p.cssPrefix}__nav-li--active`);
		
				if (updateUrl && p.urlFilterType !== 'none') {
					const paramVal = s.initDefaultContent === tabId ? null : tabId;
					
					if (p.urlFilterType === 'hashVal') { 
						UrlState.setHashVal(paramVal, p.historyType);
					} else if (p.urlFilterType === 'hash' || p.urlFilterType === 'search') {
						UrlState.set(p.urlFilterType, p.locationFilter, paramVal, p.historyType);
					}
				}
			}
		},
		() => {
			s.$tabsBodyPanels.each(function(){
				const isTab = this.dataset.tabId === tabId;

				$be(this)
					.tgClass(cssOpen, isTab)
					.rmClass(`${cssToggling} ${cssOpening} ${cssClosing}`)
			})
		});
	}

	static remove(element: BaseElem, plugin?: Tabs) {
		$be(element).each((elem) => {
			const s: Tabs = plugin || Store(elem, DATA_NAME);
			const params = s.params;

            
			s.$tabsNav.find('a, button').attr({ tabndex: null })
			s.$tabsNav.off([`${params.tabsEvent}.${EVENT_NAME}`,`[${EVENT_NAME}]`, `keydown.${EVENT_NAME}`] as EventName[]);
			$be(window).off([`popstate.${EVENT_NAME}`,`[${EVENT_NAME}]`]);

			Store(elem, DATA_NAME, null);
		})
	}
}

declare module 'base-elem-js' {
    interface BaseElem {
        tabs(options?: ITabsOptions | StringPluginArgChoices): BaseElem;
    }
}