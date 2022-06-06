
import validJSONFromString from './util/formatting-valid-json.js';
import { CSS_TRANSISTION_DELAY } from './util/constants';
import smoothScroll from './util/smooth-scroll';
import { getHashParam } from './util/get-param';
import { elData } from './util/store';
import updateHistoryState from './util/plugin/update-history-state.js';


const VERSION = "2.3.0";
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
			historyType: 'replace',
			loadLocationHash: true,
			afterOpen: () => { },
			afterClose: () => { },
			afterInit: () => { }
		};
	}

	static remove(element) {
		$(element).each(function () {

			const instance = elData(this, `${DATA_NAME}_instance`);

			$(instance.onElem).off(`click.${EVENT_NAME} ${EVENT_NAME}`);
			$(window).off(`popstate.${EVENT_NAME}`);

			elData(this, `${DATA_NAME}_params`, null, true);
			elData(this, `${DATA_NAME}_instance`, null, true);
		})
	}

	constructor(element, options, index) {

		const _ = this;
		const dataOptions = validJSONFromString(
			$(element).data(EVENT_NAME + '-options')
		);

		_.element = element;
		_.onElem = element;
		_.index = index;

		elData(
			element,
			`${DATA_NAME}_params`,
			$.extend({},Collapse.defaults, options, dataOptions)
		);
		_.params = elData(element, `${DATA_NAME}_params`);

		_.toggling = false;
		_.prevID = '#';
		_.initiallyLoaded = false;

		_.init();

		return this;
	}

	init() {
		const _ = this;

		_.collapseBodyNoID();
		_.setDisplay();
		_.loadContentFromHash();
		_.collapseEvents();
		_.params.afterInit(_.element);
		setTimeout(() => {_.initiallyLoaded = true}, 1000);
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

				$cBody.attr({ 'id': id });

				const hrefAttr = $btn[0].nodeName.toUpperCase() === 'BUTTON' ? 'data-href' : 'href';
				$btn.attr({
					[hrefAttr]: `#${id}`,
					'aria-controls': id
				});
			}

			$btn.attr({ 'aria-expanded': $btn.attr('aria-expanded') || false })
		});
	}

	collapseEvents() {
		const _ = this;
		_.onElem = _.params.toggleClickBindOn == 'group' ? _.element :
			//default to group anyway if the body isn't specified
			(_.params.toggleClickBindOn == 'body' ? 'body' : 'group')
			;

		$(_.onElem).on(`click.${EVENT_NAME} ${EVENT_NAME}`, _.params.elemsBtn, function (e) {
			e.preventDefault();

			if (_.toggling) { return; }

			const $this = $(this);
			const collapseID = $this.attr('href') || $this.attr('data-href');

			_._toggleAction(collapseID);
		});

		$(window).on(`popstate.${EVENT_NAME}`, (e) => {
			if (_.params.historyType === 'push') {
				_.loadContentFromHash(false, false);
				e.preventDefault();
			}
		})
	}

	loadContentFromHash(noAnimation = true, history = true) {
		const _ = this;

		const { useLocationHash, loadLocationHash, useHashFilter, openCss } = _.params;

		if (useLocationHash || loadLocationHash) {

			const hash = (useHashFilter ? (getHashParam(useHashFilter) || '') : location.hash);
			
			//if there are multiples
			const hashes = hash.split('=');

			for (let i = 0, l = hashes.length; i < l; i++) {
				const elID = '#' + hashes[i].split('&')[0].replace(/#/g, '');

				_._toggleAction(elID, noAnimation, history);
			}

			// if it's the last tab, then the 
			// location hash will not exist on the element
			// so just look for an open one
			if (_.prevID !== '#' && _.initiallyLoaded) {
				const $prevTab = $(_.element).find(_.prevID);

				if ($prevTab.length) {
					const isOpen = $prevTab.hasClass(openCss);

					if (isOpen) {
						_._toggleAction(_.prevID, false, history);
					}
				}
			}
		}

	}


	_toggleAction(collapseID, noAnimation = false, history = true) {
		const _ = this;
		if (collapseID === '#') return;

		const $collapsibleItem = $(_.element).find(collapseID);
		const { openCss, openNoAnimateCss, togglingCss, toggleGroup, useHashFilter } = _.params;

		if (!$collapsibleItem.length) { return; }

		const close = $collapsibleItem.hasClass(openCss);
		const btnElems = `[data-href="${collapseID}"],a[href="${collapseID}"]`;
		const $btnElems = $(_.onElem).find(btnElems); 

		$collapsibleItem.addClass(noAnimation ? (openCss + " " + openNoAnimateCss) : togglingCss);
		$btnElems.addClass(togglingCss);

		if (toggleGroup) {
			_._toggleGroup($btnElems,$collapsibleItem);
		}

		if (close) {
			_._closeItem($btnElems, $collapsibleItem)
		} else {
			_._openItem($btnElems, $collapsibleItem);
		}

		history && updateHistoryState(_, collapseID.substring(1), close, _.prevID.substring(1));


		_.prevID = collapseID;
	}

	_toggleGroup($btnElems,$clickedItem) {
		const _ = this;
		const rmClasses = `${_.params.togglingCss} ${_.params.openCss} ${_.params.openingCss} ${_.params.openNoAnimateCss}`;
		 
		$(_.onElem).find(`button[data-href="${_.prevID}"],a[href="${_.prevID}"]`)
			.removeClass(rmClasses).attr('aria-expanded', false);
	 

		$(_.onElem).find(_.params.elemsBody).not($clickedItem).each(function () {

			const $this = $(this);

			if ($this.hasClass(_.params.openCss)) {

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
				.css({ height: '' });

			$btnElems
				.removeClass(rmClasses)
				.attr('aria-expanded', false);

			_.params.afterClose($btnElems, $collapsibleItem);

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
				.css({ height: '' });

			$btnElems
				.addClass(_.params.openCss)
				.removeClass(rmClasses)
				.attr('aria-expanded', true);

			_.params.afterOpen($btnElems, $collapsibleItem);

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

		smoothScroll(top, _.params.scrollSpeed)
	}
}