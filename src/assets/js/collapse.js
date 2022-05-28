
import validJSONFromString from './util/formatting-valid-json.js';
import { CSS_TRANSISTION_DELAY } from './util/constants';
import smoothScroll from './util/smooth-scroll';
import { getHashParam } from './util/get-param';
import { elData } from './util/store';
import updateHistoryState from './util/plugin/update-history-state.js';

const VERSION = "2.2.0";
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
			cssPrefix: 'collapse',
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
			$.extend({}, Collapse.defaults, options, dataOptions)
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
		setTimeout(() => { _.initiallyLoaded = true }, 1000);
	}

	setDisplay() {
		const _ = this;
		const { cssPrefix } = _.params;

		$(_.element).find(`.${cssPrefix}__body`).each(function () {
			if ($(this).hasClass(`.${cssPrefix}--open`)) {

				const collapseID = `#${$(this).attr('id')}`;
				const btnElems = `[data-href="${collapseID}"],a[href="${collapseID}"]`;
				$('body').find(btnElems)
					.addClass(`.${cssPrefix}--open`)
					.attr('aria-expanded', true);
			}
		});
	}

	collapseBodyNoID() {
		const _ = this;
		const { cssPrefix } = _.params;

		$(_.element).find(`.${cssPrefix}`).each(function (index) {

			const $cBody = $(this).find(`.${cssPrefix}__body`);
			const $btn = $(this).find(`.${cssPrefix}__btn`);

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
		const { cssPrefix, toggleClickBindOn } = _.params;

		_.onElem = toggleClickBindOn == 'group' ? _.element :
			//default to group anyway if the body isn't specified
			(toggleClickBindOn == 'body' ? 'body' : 'group')
			;

		$(_.onElem).on(`click.${EVENT_NAME} ${EVENT_NAME}`, `.${cssPrefix}__btn`, function (e) {
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
		const { cssPrefix, openNoAnimateCss, toggleGroup } = _.params;

		if (!$collapsibleItem.length) { return; }

		const close = $collapsibleItem.hasClass(`${cssPrefix}--open`);
		const btnElems = `[data-href="${collapseID}"],a[href="${collapseID}"]`;
		const $btnElems = $(_.onElem).find(btnElems);

		$collapsibleItem.addClass(noAnimation ? (`${cssPrefix}--open ${openNoAnimateCss}`) : `${cssPrefix}--toggling`);
		$btnElems.addClass(`${cssPrefix}--toggling`);

		if (toggleGroup) {
			_._toggleGroup($btnElems, $collapsibleItem);
		}

		if (close) {
			_._closeItem($btnElems, $collapsibleItem)
		} else {
			_._openItem($btnElems, $collapsibleItem);
		}

		history && updateHistoryState(_, collapseID.substring(1), close, _.prevID.substring(1));


		_.prevID = collapseID;
	}

	_toggleGroup($btnElems, $clickedItem) {
		const _ = this;
		const { cssPrefix } = _.params;

		$(_.onElem).find(`.${cssPrefix}__body`).not($clickedItem).each(function () {

			if ($(this).hasClass(`.${cssPrefix}--open`)) {

				const $this = $(this);

				_._closeItem($btnElems, $this);

			}
		});
	}

	_closeItem($btnElems, $collapsibleItem) {
		const _ = this;
		const { cssPrefix } = _.params;

		_.toggling = true;

		$collapsibleItem
			.addClass(`${cssPrefix}--toggling ${cssPrefix}--closing`)
			.css({ height: $collapsibleItem.height() })

		setTimeout(() => {
			$collapsibleItem.css({ height: '0px' });
		}, CSS_TRANSISTION_DELAY);

		setTimeout(() => {

			const rmClasses = `${cssPrefix}--open ${cssPrefix}--toggling ${cssPrefix}--closing`;
			$collapsibleItem
				.removeClass(rmClasses)
				.css({ height: '' });

			$btnElems
				.removeClass(rmClasses)
				.attr('aria-expanded', false);

			_.params.afterClose(this);

			_.toggling = false;

		}, _.params.toggleDuration + CSS_TRANSISTION_DELAY);
	}

	_openItem($btnElems, $collapsibleItem) {
		const _ = this;
		const { cssPrefix, moveToTopOnOpen, toggleDuration } = _.params;

		_.toggling = true;

		$collapsibleItem.addClass(`${cssPrefix}--toggling ${cssPrefix}--opening`);
		const height = $collapsibleItem.height();

		$collapsibleItem.css({ height: '0px' })

		setTimeout(() => {
			$collapsibleItem.css({ height: height });
		}, CSS_TRANSISTION_DELAY);


		setTimeout(() => {

			const rmClasses = `${cssPrefix}--toggling ${cssPrefix}--opening ${cssPrefix}--no-animate`;

			$collapsibleItem.addClass(`${cssPrefix}--open`);
			$collapsibleItem.removeClass(rmClasses)
				.css({ height: '' });

			$btnElems
				.addClass(`${cssPrefix}--open`)
				.removeClass(rmClasses)
				.attr('aria-expanded', true);

			_.params.afterOpen(this);

			if (moveToTopOnOpen) {
				_._moveToTopOnOpen($collapsibleItem);
			}
			_.toggling = false;
		}, toggleDuration + CSS_TRANSISTION_DELAY);
	}

	_moveToTopOnOpen($collapsibleItem) {
		const _ = this;
		const { cssPrefix, moveToTopOffset, scrollSpeed } = _.params;
		const $item = $collapsibleItem.parent(`${cssPrefix}__item`) || $collapsibleItem;

		if (!$item.length) return;

		const elemOffsetTop = $item.offset().top;
		const top = elemOffsetTop - moveToTopOffset;

		smoothScroll(top, scrollSpeed)
	}
}