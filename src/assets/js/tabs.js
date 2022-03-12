
import validJSONFromString from './util/formatting-valid-json.js';
import getType from './util/helpers';
import { getHashParam } from './util/get-param';
import updateHistoryState from './util/plugin/update-history-state.js';
import { elData } from './util/store';


const VERSION = "1.1.0";
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

	static remove(element) {
		$(element).each(function () {
			const params = elData(this, `${DATA_NAME}_params`);
			const instance = elData(this, `${DATA_NAME}_instance`);

			instance.$tabsList.off(`${params.tabsEvent}.${EVENT_NAME} ${EVENT_NAME}`);
			$(window).off(`hashchange.${EVENT_NAME}`);

			elData(this, `${DATA_NAME}_params`, null, true);
			elData(this, `${DATA_NAME}_instance`, null, true);
		})
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
			$.extend(Tabs.defaults, options, dataOptions)
		);

		_.params = elData(element, `${DATA_NAME}_params`);
		_.$tabsList = _.$element.find(`.${_.params.tabsHeadCss}`).first();
		_.$tabsBody = _.$element.find(`.${_.params.tabsBodyCss}`).first();

		_.prevTabId = null;

		//init
		_.ADA_Attributes();
		_.tabsChangeEvent();
		_.changeTabElements(_.params.defaultContent);
		_.loadTabContent();

		$(window).on(`hashchange.${EVENT_NAME}`, () => {
			//inside so we can change this parameter
			//if we need too
			if (_.params.useLocationHash) {
				_.loadTabContent();
			}
		});

		_.params.onInit(_.prevTabId, _.$tabsList, _.$tabsBody);

		return this;
	}

	ADA_Attributes() {
		const _ = this;
		const { tabsBodyItemCss, addIDtoPanel } = _.params;

		_.$tabsList.find("a, button").each(function () {

			const tabHref = $(this).attr('href').substr(1);
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

		_.$tabsList.on(`${_.params.tabsEvent}.${EVENT_NAME} ${EVENT_NAME}`, "a,button", function (e) {
			const href = $(this).attr('href') || $(this).attr('data-href');
			const isHashHref = (/\#/).test(href);

			if (isHashHref) {

				const tabId = href.substring(1);

				_.loadTabContent(tabId);
				e.preventDefault();
			}
		});
	}

	loadTabContent(tabId) {
		const _ = this;
		const { loadLocationHash, useHashFilter, useLocationHash } = _.params;
		console.log(_.$element)
		if (loadLocationHash) {

			const hash = (useHashFilter ? (getHashParam(useHashFilter) || '') : location.hash);
			
			_.changeTabElements(hash.replace(/#/g, ''));
			 
		}

		if (!useLocationHash) {
			
			_.changeTabElements(tabId);
		} else {
			updateHistoryState(_, tabId);
		}

	}

	changeTabElements(_tabId) {

		if (_tabId === 'none') return;

		const _ = this;
		const { activeCss, tabsBodyCss, tabsBodyItemCss, tabsBodyItemShowCss } = _.params;

		let tabId = _tabId;
		if (getType(_tabId) === "number") {
			const $tabLi = _.$tabsList.find('li').eq(_tabId);

			if ($tabLi.find('a').length) {

				tabId = $tabLi.find('a').attr('href').substring(1);
			}
			if ($tabLi.find('button').length) {

				tabId = $tabLi.find('button').attr('data-href').substring(1);
			}
		}
			 

		const $tabSelectedItem = _.$tabsBody.find(`.${tabsBodyItemCss}[data-tab-id="${tabId}"]`);

		if ($tabSelectedItem.length) {

			_.params.beforeChange(_.prevTabId, _.$tabsList, _.$tabsBody);

			const isInItsBody = $tabSelectedItem.closest(`.${tabsBodyCss}`)[0].isSameNode(_.$tabsBody[0]);

			if (!isInItsBody) return;

			_.$tabsList.find("a,button").attr({ 'aria-selected': false });
			_.$tabsList.find("li").removeClass(activeCss);

			$(`.${tabsBodyItemCss}`, _.$tabsBody).each(function () {

				const isItsBodyItem = $(this).closest(`.${tabsBodyCss}`)[0].isSameNode(_.$tabsBody[0]);

				if (isItsBodyItem) {
					$(this).removeClass(tabsBodyItemShowCss)
						.attr({ 'aria-hidden': true });
				}
			});

			_.$tabsList.find(`a[href="#${tabId}"],button[data-href="#${tabId}]`)
				.attr({ 'aria-selected': true })
				.closest('li').addClass(activeCss);

			_.$tabsBody.find(`.${tabsBodyItemCss}[data-tab-id="${tabId}"]`)
				.addClass(tabsBodyItemShowCss)
				.attr({ 'aria-hidden': false });

			_.params.afterChange(tabId, _.$tabsList, _.$tabsBody);
			_.prevTabId = tabId;
		}
	}
}