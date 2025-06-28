
import type { LocationTracking, PrimaryClickElems, StringPluginArgChoices } from './types';
import $be, { type BaseElem, type EventName } from "base-elem-js";
import { getDataOptions, setParams } from "./util/helpers";
 
import Store from "./core/Store";
import UrlState from "./core/UrlState";
import loadFromUrl from './util/loadfromUrl';


type tabDefaultContent = string;

export interface ITabsDefaults extends LocationTracking {
	tabsEvent: string;
	cssPrefix: string;	 
	addIDtoPanel: boolean;
	ariaLabel: boolean;
	defaultContent: number;
	tabChange(tabId: string, prevTabId: string, tabsList: HTMLElement, tabsBody: HTMLElement): void;
	onInit(tabsList: HTMLElement, tabsBody: HTMLElement): void
}

export interface ITabsOptions extends Partial<ITabsDefaults> {};

// const { findOne, useTransition } = $be.static;

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
	public tabsNav: HTMLElement;
	public $tabsNav: BaseElem;
	public $tabsNavBtns: BaseElem;
	public tabsNavBtns: PrimaryClickElems[];
    public tabsBody: HTMLElement;
	public $tabsBody: BaseElem;
	public $tabsBodyPanels: BaseElem;
	public prevTabId: string;
	public initTabId: string;
	public initDefaultContent: tabDefaultContent;
	
	public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

	#transition = $be.useTransition();

	constructor(element: HTMLElement, options: ITabsOptions | StringPluginArgChoices) {
		const 
            s = this,
		    dataOptions = getDataOptions(element, EVENT_NAME),
		    p = setParams(Tabs.defaults, options, dataOptions),
            $element = $be(element)
        ;
		
        s.$element = $element;
		s.params = p; 
		s.tabsNav =  $be.findOne(`.${p.cssPrefix}__nav`, element);
		s.tabsBody = $be.findOne(`.${p.cssPrefix}__body`, element);
        s.$tabsNav = $be(s.tabsNav);
		s.$tabsBody = $be(s.tabsBody);
		s.$tabsBodyPanels = s.$tabsBody.find(`.${p.cssPrefix}__panel`, elem => elem.parentElement === s.tabsBody);
		s.$tabsNavBtns = s.$tabsNav.find('a, button');
		s.tabsNavBtns = s.$tabsNavBtns.toArray() as PrimaryClickElems[];
		s.prevTabId = null;
		s.initDefaultContent = s.$tabsBodyPanels.get(p.defaultContent).attr('data-tab-id');
		 	 
		//init
		s.#setAriaAttrs();
		s.#handleEvents();
		s.#defaultContent();
        s.#loadFromUrl();
	
		s.params.onInit(s.tabsNav, s.tabsBody);

		return s;
	}

    #loadFromUrl() {
        const s = this;
        const p = s.params;

        loadFromUrl(p as LocationTracking, (id) => {
            if (id) {
				const clickElem = s.#findTabButtonById(id);
				if (clickElem) s.changeTab(clickElem, id, false);
			}
        });
    }

	#defaultContent() {
		const s = this;
		const tabId = s.initDefaultContent; 
		const clickElem = s.#findTabButtonById(tabId);

		s.changeTab(clickElem, tabId, false);
	}

	#findTabButtonById(tabId: string):PrimaryClickElems | null {
        const clickElem = this.tabsNavBtns.find((el: PrimaryClickElems) => getTabIDFromEl(el) === tabId);
		
        if (clickElem) return clickElem as PrimaryClickElems;
		return null;
	}

	#setAriaAttrs() {
		const s = this;
		const p = s.params;

		s.$tabsNavBtns.each((elem) => {

			const tabId = getTabIDFromEl(elem as PrimaryClickElems);
			const $tabBodyItem = s.$tabsBodyPanels.filter(elem => elem.dataset.tabId === tabId);

			$be(elem).attr({
				'aria-selected': 'false',
				'role': 'tab',
				'aria-controls': tabId
			});

			$tabBodyItem.attr({
				'aria-label':  p.ariaLabel ? elem.textContent : null,
				'role': 'tabpanel',
				tabindex: '-1'
			});

			if (p.addIDtoPanel) {
				$tabBodyItem.attr({ 'id': tabId });
			}
		});
	}

	#handleEvents() {
		const s = this;

		s.$tabsNav.on([`${s.params.tabsEvent}.${EVENT_NAME}`,`[${EVENT_NAME}]`] as EventName[], (ev: MouseEvent, elem) => {
			const clickElem = elem as PrimaryClickElems; 
			const tabId = getTabIDFromEl(clickElem);
		
			s.changeTab(clickElem, tabId);
			ev.preventDefault();
		}, "a, button");


		s.$tabsNav.on(`keydown.${EVENT_NAME}`, function (e:KeyboardEvent) {
			const target = e.target as PrimaryClickElems;
			const index = s.tabsNavBtns.findIndex(el => el.isSameNode(target));
			const next = e.key === 'ArrowRight' || e.key === 'ArrowDown';
			const prev = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
			 
			if (index !== -1 && (next || prev)) {
				 
				const changeIndex = next ? index + 1 : index - 1;
				const nextBtn = s.tabsNavBtns[changeIndex];
				
				if (nextBtn) {
					 
					const tabId = getTabIDFromEl(nextBtn);
					s.changeTab(nextBtn,tabId);
					 
                    nextBtn.focus();
				}

				e.preventDefault();
			}
		});

		$be(window).on(`popstate.${EVENT_NAME} ${EVENT_NAME}`, (e) => {
			if (s.params.historyType === 'push') {

				s.#loadFromUrl();
				e.preventDefault();
			}
		})
	}

	changeTab(clickElem: PrimaryClickElems, tabId: string, updateUrl = true) {
        
        const s = this;

        if (tabId === s.prevTabId) return;

        const
		    p = s.params,
            cssPrefix 	= `${p.cssPrefix}__panel--`,
            cssOpen 	= `${cssPrefix}open`,
            cssToggling = `${cssPrefix}toggling`,
            cssOpening 	= `${cssPrefix}opening`,
            cssClosing 	= `${cssPrefix}closing`
		;

		let hasTab = false;
		
		const start = () => {
			s.$tabsBodyPanels.each((elem) => {
				const thisTabId = elem.dataset.tabId;

				if (thisTabId === tabId) {
					
					$be(elem)
						.addClass([cssToggling,cssOpening])
						.attr({ 'aria-hidden': null, tabindex: '0'});

					hasTab = true;
				} 
				
				if (s.prevTabId && s.prevTabId === thisTabId) {
					$be(elem)
						.addClass([cssToggling,cssClosing])
						.attr({ 'aria-hidden': 'true', tabindex: '-1'});
				}
			});

			if (hasTab) {
				const cssActive = `${p.cssPrefix}__nav-li--active`;
				s.params.tabChange(tabId, s.prevTabId, s.tabsNav, s.tabsBody);
				s.prevTabId = tabId;
				
				s.$tabsNavBtns
					.attr({ 'aria-selected': 'false', tabindex: '-1' })
					.find(elem => elem.closest('li')).rmClass(cssActive);

				$be(clickElem)
					.attr({ 'aria-selected': 'true', tabindex: '0' })
					.find(elem => elem.closest('li')).addClass(cssActive);
		
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
		end =() => {
			s.$tabsBodyPanels.each((elem) => {
				const isTab = elem.dataset.tabId === tabId;

				$be(elem)
					.tgClass(cssOpen, isTab)
					.rmClass([cssToggling,cssOpening,cssClosing])
			})
		};

        s.#transition(start, end);
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

export interface TabsPlugin {
    tabs(options?: ITabsOptions | StringPluginArgChoices): BaseElem;
}

declare module 'base-elem-js' {
    interface BaseElem extends TabsPlugin {}
}