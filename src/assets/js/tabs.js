
import validJSONFromString from './util/formatting-valid-json.js';
import getType from './util/helpers';
import { getHashParam } from './util/get-param';
import updateHistoryState from './util/plugin/update-history-state.js';
import { elData } from './util/store';


const VERSION = "1.2.0";
const DATA_NAME = 'Tabs';
const EVENT_NAME = 'tabs';
const DEFAULTS = {
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
	beforeChange: () => { },
	afterChange: () => { },
	onInit: () => { }
};

const getTabIDFromEl = (el) => $(el).attr(el.nodeName.toUpperCase() === 'BUTTON' ? 'data-href' : 'href').replace(/^\#/,'');

export default class Tabs {

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	static get defaults() {
		return DEFAULTS;
	}

	constructor(element, options, index) {
		const _ = this;

		const dataOptions = validJSONFromString(
			$(element).data(DATA_NAME + '-options')
		);

		//state
		_.$element = $(element);

		elData(
			element,
			`${DATA_NAME}_params`,
			$.extend({},Tabs.defaults, options, dataOptions)
		);

		_.params = elData(element, `${DATA_NAME}_params`);
		_.$tabsList = _.$element.find(`.${_.params.tabsHeadCss}`).first();
		_.$tabsBody = _.$element.find(`.${_.params.tabsBodyCss}`).first(); 

		_.prevTabId = '#';
		 
		//init
		_.ADA_Attributes();
		_.tabsChangeEvent();
		_.changeTabElements( _.getTabFromHash(),true);

		$(window).on(`popstate.${EVENT_NAME}`, (e) => {
			if (_.params.historyType === 'push') {

				_.changeTabElements(_.getTabFromHash(), true);
				e.preventDefault();
			}
		})

		_.params.onInit(_.prevTabId, _.$tabsList, _.$tabsBody);
	
		return this;
	}

	getTabFromHash() {
		const _ = this;
		const { useHashFilter, tabsBodyItemCss, defaultContent} = _.params;
 
		let defaultTab = '';

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

			const isInItsBody = $tabSelectedItem.closest(`.${tabsBodyCss}`)[0].isSameNode(_.$tabsBody[0]);

			if (!isInItsBody) return;

			_.$tabsList.find("a, button").attr({ 'aria-selected': false });
			_.$tabsList.find('.' + activeCss).removeClass(activeCss);

			$(`.${tabsBodyItemCss}`, _.$tabsBody).each(function () {

				const isItsBodyItem = $(this).closest(`.${tabsBodyCss}`)[0].isSameNode(_.$tabsBody[0]);

				if (isItsBodyItem) {
					$(this).removeClass(tabsBodyItemShowCss)
						.attr({ 'aria-hidden': true });
				}
			});

			_.$tabsList.find(`a[href="#${tabId}"], button[data-href="#${tabId}"]`)
				.attr({ 'aria-selected': true })
				.addClass(activeCss)
				// if we have a list item
				.closest('li').addClass(activeCss);

			_.$tabsBody.find(`.${tabsBodyItemCss}[data-tab-id="${tabId}"]`)
				.addClass(tabsBodyItemShowCss)
				.attr({ 'aria-hidden': false });

			_.params.afterChange(tabId, _.$tabsList, _.$tabsBody);

			!init && updateHistoryState(_, tabId, false, _.prevTabId);
			_.prevTabId = tabId;
		}
	}

	static remove(element) {
		$(element).each(function () {
			const params = elData(this, `${DATA_NAME}_params`);
			const instance = elData(this, `${DATA_NAME}_instance`);

			instance.$tabsList.off(`${params.tabsEvent}.${EVENT_NAME} ${EVENT_NAME}`);
			$(window).off(`popstate.${EVENT_NAME}`);

			elData(this, `${DATA_NAME}_params`, null, true);
			elData(this, `${DATA_NAME}_instance`, null, true);
		})
	}

}