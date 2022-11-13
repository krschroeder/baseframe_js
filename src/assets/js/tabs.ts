import type { Cash } from "cash-dom";
import type { LocationHashTrackingHistory, StringPluginArgChoices } from './types/shared';

import $ from 'cash-dom';
import parseObjectFromString from './util/parse-object-from-string';
import { getHashParam } from './util/get-param';
import updateHistoryState from './util/plugin/update-history-state';
import elemData from "./util/elemData";
import { KEYS } from './util/constants';

type tabDirection = 'horizontal' | 'vertical';
type tabDefaultContent = number | 'none';

export interface ITabsOptions extends LocationHashTrackingHistory {
	defaultContent?: tabDefaultContent;
	tabsEvent?: string;
	activeCss?: string;
	tabsBodyCss?: string;
	tabsBodyItemCss?: string;
	tabsBodyItemShowCss?: string;
	tabsHeadCss?: string;
	tabbing?: boolean;
	tabDirection?: tabDirection;
	addIDtoPanel?: boolean;
	beforeChange?(prevTabId: string, tabsList: Cash, tabsBody: Cash): void;
	afterChange?(prevTabId: string, tabsList: Cash, tabsBody: Cash): void;
	onInit?(tabsList: Cash, tabsBody: Cash): void
}


export interface ITabsDefaults extends LocationHashTrackingHistory {
	defaultContent: tabDefaultContent;
	tabsEvent: string;
	activeCss: string;
	tabsBodyCss: string;
	tabsBodyItemCss: string;
	tabsBodyItemShowCss: string;
	tabsHeadCss: string;
	tabbing: boolean;
	tabDirection: tabDirection;
	addIDtoPanel: boolean;
	beforeChange(prevTabId: string, tabsList: Cash, tabsBody: Cash): void;
	afterChange(prevTabId: string, tabsList: Cash, tabsBody: Cash): void;
	onInit(tabsList: Cash, tabsBody: Cash): void
}

const VERSION = "1.4.0";
const DATA_NAME = 'Tabs';
const EVENT_NAME = 'tabs';
const DEFAULTS: ITabsDefaults = {
	defaultContent: 0,
	tabsEvent: 'click',
	activeCss: 'tab--active',
	tabsBodyCss: 'tabs__body',
	tabsBodyItemCss: 'tabs__body-item',
	tabsBodyItemShowCss: 'tabs__body-item--show',
	tabsHeadCss: 'tabs__nav',
	useHashFilter: null,
	useLocationHash: true,
	historyType: 'push',
	loadLocationHash: true,
	addIDtoPanel: true,
	tabbing: true,
	tabDirection: 'horizontal',
	beforeChange: () => { },
	afterChange: () => { },
	onInit: () => { }
};

const getTabIDFromEl = (el): string => {
	return $(el).attr(el.nodeName.toUpperCase() === 'BUTTON' ? 'data-href' : 'href')?.replace(/^\#/, '') || '';
}

export default class Tabs {

	static get version() { return VERSION; }
	static get pluginName() { return DATA_NAME; }

	public $element: Cash;
	public params: ITabsDefaults;
	public $tabsList: Cash;
	public $tabsBody: Cash;
	public prevTabId: string;
	public initTabId: string;
	public tabFocus: number;
	public initDefaultContent: tabDefaultContent;
	public static Defaults = DEFAULTS;

	constructor(element: HTMLElement, options: ITabsDefaults | StringPluginArgChoices) {
		const _ = this;

		const dataOptions = parseObjectFromString($(element).data(EVENT_NAME + '-options'));
		const instanceOptions = $.extend({}, Tabs.Defaults, options, dataOptions);
		//state
		_.$element = $(element);

		elemData(element,`${DATA_NAME}_params`, instanceOptions);

		_.params = elemData(element, `${DATA_NAME}_params`);
		_.$tabsList = _.$element.find(`.${_.params.tabsHeadCss}`).first();
		_.$tabsBody = _.$element.find(`.${_.params.tabsBodyCss}`).first();

		_.prevTabId = '#';
		_.tabFocus = 0;
		_.initDefaultContent = _.params.defaultContent;

		//init
		_.ADA_Attributes();
		_.tabsChangeEvent();
		_.changeTabElements(_.getTabFromHash(), true);
		_.tabbing();

		$(window).on(`popstate.${EVENT_NAME}`, (e) => {
			if (_.params.historyType === 'push') {

				_.changeTabElements(_.getTabFromHash(), true);
				e.preventDefault();
			}
		})

		_.params.onInit(_.$tabsList, _.$tabsBody);

		return this;
	}

	getTabFromHash() {
		const _ = this;
		const { useHashFilter, tabsBodyItemCss, defaultContent } = _.params;

		let defaultTab: string | null = '';

		if (useHashFilter) {
			defaultTab = getHashParam(useHashFilter);
		} else {
			defaultTab = location.hash.split('&').filter(tabHref => {
				if (tabHref.indexOf('=') === -1) {
					if (_.$tabsBody.find(`.${tabsBodyItemCss}[data-tab-id="${tabHref}"]`).length) {
						return tabHref;
					}
				}
			})[0];
		}

		return defaultTab || getTabIDFromEl(_.$tabsList.find('a, button')[defaultContent]);
	}

	tabbing() {
		const _ = this;

		const { tabbing, tabDirection } = _.params;
		const { right, left, up, down } = KEYS;

		_.$tabsList.on('keydown.' + EVENT_NAME, function (e) {

			// if the param gets dynamically updated
			// lets check here
			if (!tabbing) return;

			let back: string = left,
				forward: string = right;

			if (tabDirection === 'horizontal') {
				back = left;
				forward = right;
			} else if (tabDirection === 'vertical') {
				back = up;
				forward = down;
			} else {
				console.warn(`Please specify 'horizontal' or 'vertical' for a tab direction`);
			}

			// rebuild the list per-chance any get removed dynamically or added
			const $tabs = _.$tabsList.find('a, button');

			if (e.code === forward || e.code === back) {
				$tabs[_.tabFocus]?.setAttribute('tabindex', '-1');

				if (tabDirection === 'vertical') {
					e.preventDefault();
				}

				if (e.code === forward) {
					_.tabFocus++;
					// If we're at the end, go to the start
					if (_.tabFocus >= $tabs.length) {
						_.tabFocus = 0;
					}
					// Move left
				} else if (e.code === back) {
					_.tabFocus--;
					// If we're at the start, move to the end
					if (_.tabFocus < 0) {
						_.tabFocus = $tabs.length - 1;
					}
				}

				$tabs[_.tabFocus]?.setAttribute('tabindex', '0');
				$tabs[_.tabFocus]?.focus();
			}
		});
	}

	ADA_Attributes() {
		const _ = this;
		const { tabsBodyItemCss, addIDtoPanel } = _.params;

		_.$tabsList.find("a, button").each(function () {

			const tabHref = getTabIDFromEl(this);
			const $tabBodyItem = _.$tabsBody.find(`.${tabsBodyItemCss}[data-tab-id="${tabHref}"]`);

			$(this).attr({
				'aria-selected': 'false',
				'role': 'tab',
				'aria-controls': tabHref
			});

			$tabBodyItem.attr({
				'aria-labelledby': tabHref,
				'role': 'tabpanel'
			});

			if (addIDtoPanel) {
				$tabBodyItem.attr({ 'id': tabHref });
			}
		});
	}

	tabsChangeEvent() {
		const _ = this;

		_.$tabsList.on(`${_.params.tabsEvent}.${EVENT_NAME} ${EVENT_NAME}`, "a, button", function (e) {
			const tabId = getTabIDFromEl(this);

			_.changeTabElements(tabId);
			e.preventDefault();
		});
	}

	changeTabElements(tabId, init = false) {

		if (tabId === 'none') return;

		const _ = this;
		const {
			activeCss,
			tabsBodyCss,
			tabsBodyItemCss,
			tabsBodyItemShowCss
		} = _.params;


		const $tabSelectedItem = _.$tabsBody.find(`.${tabsBodyItemCss}[data-tab-id="${tabId}"]`);

		if ($tabSelectedItem.length) {

			_.params.beforeChange(_.prevTabId, _.$tabsList, _.$tabsBody);

			const isInItsBody = $tabSelectedItem.closest(`.${tabsBodyCss}`)[0]?.isSameNode(_.$tabsBody[0] || null);

			if (!isInItsBody) return;

			const $tabs = _.$tabsList.find("a, button");
			let removeIdFormHash = false;

			$tabs.attr({ 'aria-selected': 'false', tabindex: '-1' });
			_.$tabsList.find('.' + activeCss).removeClass(activeCss);

			$(`.${tabsBodyItemCss}`, _.$tabsBody).each(function () {

				const isItsBodyItem = $(this).closest(`.${tabsBodyCss}`)[0]?.isSameNode(_.$tabsBody[0] || null);

				if (isItsBodyItem) {
					$(this).removeClass(tabsBodyItemShowCss).attr({ 'aria-hidden': 'true' });
				}
			});

			const $selected = _.$tabsList.find(`a[href="#${tabId}"], button[data-href="#${tabId}"]`);

			$selected.attr({ 'aria-selected': 'true', tabindex: '0' })
				.addClass(activeCss)
				// if we have a list item
				.closest('li').addClass(activeCss);

			$tabs.each(function (i) {
				if (this.classList.contains(activeCss)) {
					_.tabFocus = i;
				}

				if (getTabIDFromEl(this) === tabId && i === _.initDefaultContent) {
					removeIdFormHash = true;
				}
			})

			_.$tabsBody.find(`.${tabsBodyItemCss}[data-tab-id="${tabId}"]`)
				.addClass(tabsBodyItemShowCss)
				.attr({ 'aria-hidden': 'false' });

			_.params.afterChange(tabId, _.$tabsList, _.$tabsBody);


			if (init) {
				_.initTabId = tabId;
			} else {
				updateHistoryState(_.params, tabId, removeIdFormHash, _.prevTabId);
			}

			_.prevTabId = tabId;
		}
	}

	static remove(element) {
		$(element).each(function () {
			const params = elemData(this, `${DATA_NAME}_params`);
			const instance = elemData(this, `${DATA_NAME}_instance`);

			instance.$tabsList.off(`${params.tabsEvent}.${EVENT_NAME} ${EVENT_NAME}`);
			instance.$tabsList.off('keydown.' + EVENT_NAME);
			instance.$tabsList.find('a, button').attr({ tabindex: null })
			$(window).off(`popstate.${EVENT_NAME}`);

			elemData(this, `${DATA_NAME}_params`, null, true);
			elemData(this, `${DATA_NAME}_instance`, null, true);
		})
	}
}

declare module 'cash-dom' {
    interface Cash {
        tabs(options?: ITabsOptions | StringPluginArgChoices): Cash;
    }
}