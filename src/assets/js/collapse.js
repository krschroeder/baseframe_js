import $ from 'cash-dom';
import validJSONFromString from './util/formatting-valid-json.js';
import {CSS_TRANSISTION_DELAY} from './util/helpers';
import smoothScroll from './util/smoothScroll';
import {getHashParam} from './util/get-param';
import getHistoryEntry from './util/plugin/get-history-entry';

const VERSION = "2.1.3";
const DATA_NAME = 'Collapse';
const EVENT_NAME = 'collapse';

export default class Collapse {

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	static get defaults() {
		return {
			elemsItem: '.collapse__item',
			elemsBtn: '.collapse__btn',
			elemsBody: '.collapse__body',
			openCss: 'collapse--open',
			togglingCss: 'collapse--toggling',
			openingCss: 'collapse--opening',
			closingCss: 'collapse--closing',
			openNoAnimateCss: 'collapse--no-animate',
			toggleClickBindOn: 'group',
			toggleDuration: 500,
			toggleGroup: false,
			moveToTopOnOpen: false,
			moveToTopOffset: 0,
			scrollSpeed: 100,
			useHashFilter: null,
			useLocationHash: true,
			loadLocationHash: true,
			afterOpen: () => { },
			afterClose: () => { },
			afterInit: () => { }
		}
	}
	

	constructor(element, options, index) {

		const _ = this;

		const dataOptions = validJSONFromString(
			$(element).data(EVENT_NAME + '-options')
		);

		_.element = element;
		_.onElem = element;
		_.index = index;
			
		$.store.set(
			element,
			`${DATA_NAME}_params`,
			$.extend(Collapse.defaults, options, dataOptions) 
		);
		_.params = $.store.get(element,`${DATA_NAME}_params`);
		
		_.toggling = false;
		_.prevItem = null;
		
		_.init();
	}

	init() {
		const _ = this;

		_.collapseBodyNoID();
		_.setDisplay();
		_.toggleItems();
		_.loadContentFromHash();
		_.params.afterInit(_.element);
	}

	setDisplay() {
		const _ = this;
		$(_.element).find(_.params.elemsBody).each(function () {
			if ($(this).hasClass(_.params.openCss)) {

				const collapseID = `#${$(this).attr('id')}`;
				const btnElems = `[data-href="${collapseID}"],a[href="${collapseID}"]`;
				$('body').find(btnElems)
					.addClass(_.params.openCss)
					.attr('aria-expanded', true);

			}
		});
	}

	collapseBodyNoID() {
		const _ = this;
		$(_.element).find(_.params.elemsItem).each(function (index) {

			const $cBody = $(this).find(_.params.elemsBody);
			const $btn = $(this).find(_.params.elemsBtn);

			if (!!!$cBody.attr('id')) {
				const btnContent = $btn.eq(0).text().slice(0, 20).trim().replace(/\s/g, '-');
				const id = `collapse_${_.index}-${index}-${btnContent}`;
				$cBody.attr({
					'id': id,
					'aria-hidden': true
				})
				$btn.attr({
					href: `#${id}`,
					'aria-controls': id
				});
			}


			$btn.attr({
				'aria-expanded': $btn.attr('aria-expanded') || false,

			})
		});
	}

	toggleItems() {
		const _ = this;
		_.onElem = _.params.toggleClickBindOn == 'group' ? _.element :
			//default to group anyway if the body isn't specified
			(_.params.toggleClickBindOn == 'body' ? 'body' : 'group')
		;

		$(_.onElem).on(`click.${EVENT_NAME} ${EVENT_NAME}`, _.params.elemsBtn, function (e) {
			e.preventDefault();

			if ( _.toggling ) { return;}
			
			const $this = $(this);
			const collapseID = $this.attr('href') || $this.attr('data-href');

			if (_.params.useLocationHash) {

				history.pushState(null, null, getHistoryEntry(_,collapseID));
			}

			_._toggleAction(collapseID);
		});

		$(window).on(`popstate.${EVENT_NAME}`,(e) => {

			const {useLocationHash, useHashFilter} = _.params;

			if (useLocationHash) {

				const hash = (useHashFilter ? (getHashParam(useHashFilter) || '') : location.hash);
				
				// if(hash === "") return;

				_._toggleAction(hash);
				e.preventDefault();
			}
		})
	}

	loadContentFromHash() {
		const _ = this;

		const {loadLocationHash, useHashFilter} = _.params;

		const locationHashArray = (useHashFilter ? (getHashParam(useHashFilter) || '') : location.hash).split('#');
		if (loadLocationHash) {
			
			if (!locationHashArray.length) return;

			//first value is '' so we skip it
			locationHashArray.slice(1).forEach((hash) => {
				_._toggleAction('#'+hash, true);
			});
		}
		
	}


	_toggleAction(collapseID,noAnimation = false) {
		const _ = this; 

		const {openCss, openNoAnimateCss, togglingCss, toggleGroup} = _.params;
		const $collapsibleItem = $(collapseID);

		const CLOSE = $collapsibleItem.hasClass(openCss);
		const btnElems = `[data-href="${collapseID}"],a[href="${collapseID}"]`;
		const $btnElems = $(_.onElem).find(btnElems);

		$collapsibleItem.addClass(noAnimation ? (openCss + " " + openNoAnimateCss): togglingCss);
		$btnElems.addClass(togglingCss);

		if (toggleGroup) {
			_._toggleGroup($collapsibleItem);
		}

		if (CLOSE) {
			_._closeItem($btnElems, $collapsibleItem)
		} else {
			_._openItem($btnElems, $collapsibleItem);
		}
	}

	_toggleGroup($clickedItem) {
		const _ = this;

		$(_.onElem).find(_.params.elemsBody).not($clickedItem).each(function () {

			if ($(this).hasClass(_.params.openCss)) {

				const $this = $(this);
				const thisID = $this.attr('id');
				const $btnElems = $(_.onElem).find(`[data-href="#${thisID}"],a[href="#${thisID}"]`);

				_._closeItem($btnElems, $this);

			}
		});
	}

	_closeItem($btnElems, $collapsibleItem) {
		const _ = this;

		_.toggling = true;

		$collapsibleItem
			.addClass(`${_.params.togglingCss} ${_.params.closingCss}`)
			.css({ height: $collapsibleItem.height() })
		
		setTimeout(() => {
			$collapsibleItem.css({ height: '0px' });
		}, CSS_TRANSISTION_DELAY);

		setTimeout(() => {
			const rmClasses = `${_.params.openCss} ${_.params.togglingCss} ${_.params.closingCss}`;
			$collapsibleItem
				.removeClass(rmClasses)
				.css({ height: '' })
				.attr({'aria-hidden': true});

			$btnElems
				.removeClass(rmClasses)
				.attr('aria-expanded', false);

			_.params.afterClose(this);
			
			_.toggling = false;

		}, _.params.toggleDuration + CSS_TRANSISTION_DELAY);
	}

	_openItem($btnElems, $collapsibleItem) {
		const _ = this;
		
		_.toggling = true;

		$collapsibleItem.addClass(`${_.params.togglingCss} ${_.params.openingCss}`);
		const height = $collapsibleItem.height();
		
		$collapsibleItem.css({ height: '0px' })

		setTimeout(() => {
			$collapsibleItem.css({ height: height });
		}, CSS_TRANSISTION_DELAY);


		setTimeout(() => { 
			const rmClasses = `${_.params.togglingCss} ${_.params.openingCss} ${_.params.openNoAnimateCss}`;

			$collapsibleItem.addClass(`${_.params.openCss}`);
			$collapsibleItem.removeClass(rmClasses)
				.css({height: ''})
				.attr({'aria-hidden': false});

			$btnElems
				.addClass(_.params.openCss)
				.removeClass(rmClasses)
				.attr('aria-expanded', true);

			_.params.afterOpen(this);

			if (_.params.moveToTopOnOpen) {
				_._moveToTopOnOpen($collapsibleItem);
			}
			_.toggling = false;
		}, _.params.toggleDuration + CSS_TRANSISTION_DELAY);
	}

	_moveToTopOnOpen($collapsibleItem) {
		const _ = this;
		const $item = $collapsibleItem.parent(_.params.elemsItem) || $collapsibleItem;
		
		if (!$item.length) return;

		const elemOffsetTop = $item.offset().top;
		const top = elemOffsetTop - _.params.moveToTopOffset;

		smoothScroll(top,_.params.scrollSpeed)
	}
}