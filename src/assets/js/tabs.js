import $ from 'cash-dom';
import validJSONFromString from './util/formatting-valid-json.js';
import getType from './util/helpers';

const VERSION = "1.0.0";
const DATA_NAME = 'Tabs';
const EVENT_NAME = 'tabs';

export default class Tabs {

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return EVENT_NAME;
	}

	constructor(element, options, index) {
		const _ = this;

		const dataOptions = validJSONFromString(
			$(element).data(DATA_NAME + '-options')
		);

		_.defaults = {
			defaultContent: 0,
			tabsEvent: 'click',
			activeCls: 'tab--active',
			tabsBodyCls: 'tabs__body',
			tabsBodyItemCls: 'tabs__body-item',
			tabsBodyItemShowCls: 'tabs__body-item--show',
			tabsHeadCls: 'tabs__nav',
			useLocationHash: true,
			loadLocationHash: true,
			addIDtoPanel: true,
			beforeChange: () => {},
			afterChange: () => {},
			onInit: () => { }
		};
		
		_.$element = $(element);

		$.store.set(
			element,
			`${DATA_NAME}_params`,
			$.extend(_.defaults, options, dataOptions)
		);

		_.params = $.store.get(element, `${DATA_NAME}_params`);
		_.$tabsList = _.$element.find(`.${_.params.tabsHeadCls} ul`).first();
		_.$tabsBody = _.$element.find(`.${_.params.tabsBodyCls}`).first();

		_.prevTabId = null;
		//init

		_.ADA_Attributes();
		_.tabsChangeEvent();
		_.changeTabElements(_.params.defaultContent);
		_.loadTabContent();

		$(window).on("hashchange", () => {
			//inside so we can change this parameter
			//if we need too
			if (_.params.useLocationHash) {
				_.loadTabContent();
			}
		});

		_.params.onInit(_.prevTabId, _.$tabsList, _.$tabsBody);
	}

	ADA_Attributes() {
		const _ = this;
		const {tabsBodyItemCls, addIDtoPanel} = _.params;

		_.$tabsList.find("a").each(function () {

			const tabHref = $(this).attr('href').substr(1);
			const $tabBodyItem = _.$tabsBody.find(`.${tabsBodyItemCls}[data-tab-id="${tabHref}"]`);

			$(this).attr({
				'aria-selected': 'false',
				'role': 'tab',
				'aria-controls': tabHref
			});

			$tabBodyItem.attr({
				'tabindex': '0',
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

		_.$tabsList.on(`${_.params.tabsEvent}.${EVENT_NAME} ${EVENT_NAME}`, "a", function (e) {

			const tabId = $(this).attr('href');

			if (_.params.useLocationHash) {
	
				history.pushState(null, null, tabId);
			}
			
			_.loadTabContent(tabId.substring(1));

			e.preventDefault();
		});
	}

	loadTabContent(tabId) {
		const _ = this;
		const locationHashArray = location.hash.split('#');
		
		if (_.params.loadLocationHash) {
			
			if (!locationHashArray.length) return;

			//first value is '' so we skip it
			locationHashArray.slice(1).forEach((hash) => {
				_.changeTabElements(hash);
			});
		}
		
		if (!_.params.useLocationHash) {
			
			_.changeTabElements(tabId);
		}
	}

	changeTabElements(_tabId) {

		const _ = this;
		const { activeCls, tabsBodyCls, tabsBodyItemCls, tabsBodyItemShowCls } = _.params;

		const tabId = getType(_tabId) === "number" ? 
			_.$tabsList.find('li').eq(_tabId).find('a').attr('href').substring(1) :
			_tabId
		;
	
		const $tabSelectedItem = _.$tabsBody.find(`.${tabsBodyItemCls}[data-tab-id="${tabId}"]`);
		
		if ($tabSelectedItem.length) {

			_.params.beforeChange(_.prevTabId, _.$tabsList, _.$tabsBody);

			const isInItsBody = $tabSelectedItem.closest(`.${tabsBodyCls}`)[0].isSameNode(_.$tabsBody[0]);
			
			if (!isInItsBody) return;

			_.$tabsList.find("a").attr({ 'aria-selected': false });
			_.$tabsList.find("li").removeClass(activeCls);

			$(`.${tabsBodyItemCls}`, _.$tabsBody).each(function () {
				
				const isItsBodyItem = $(this).closest(`.${tabsBodyCls}`)[0].isSameNode(_.$tabsBody[0]);

				if ( isItsBodyItem ) { 
					$(this).removeClass(tabsBodyItemShowCls)
						.attr({'aria-hidden': true});
				}
			});

			_.$tabsList.find(`a[href="#${tabId}"]`)
				.attr({ 'aria-selected': true })
				.closest('li').addClass(activeCls);

			_.$tabsBody.find(`.${tabsBodyItemCls}[data-tab-id="${tabId}"]`)
				.addClass(tabsBodyItemShowCls)
				.attr({'aria-hidden': false });

			_.params.afterChange(tabId, _.$tabsList, _.$tabsBody);
			_.prevTabId = tabId;
		}
	}
}