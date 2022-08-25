
import validJSONFromString from './util/formatting-valid-json.js';
import smoothScroll from './util/smooth-scroll';
import { getHashParam } from './util/get-param';
import { elData } from './util/store';
import updateHistoryState from './util/plugin/update-history-state.js';
import { noop, transitionElem } from './util/helpers.js';

const VERSION = "3.1.2";
const DATA_NAME = 'Collapse';
const EVENT_NAME = 'collapse';
const DEFAULTS = {
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
	afterOpen: noop,
	afterClose: noop,
	afterInit: noop
};

export default class Collapse {
	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
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

		_.element = element;
		_.onElem = element;
		_.index = index;

		const dataOptions = validJSONFromString($(element).data(EVENT_NAME + '-options'));
		const instanceOptions = $.extend({}, Collapse.defaults, options, dataOptions);

		elData(element, `${DATA_NAME}_params`, instanceOptions);
		_.params = elData(element, `${DATA_NAME}_params`);

		_.toggling = false;
		_.prevID = '#';
		_.initiallyLoaded = false;
		_.$btnElems = null;
		_.$collapsibleItem = null;

		// init
		_.loadContentFromHash();
		_.collapseEvents();
		_.params.afterInit(_.element);

		return this;
	}

	collapseEvents() {
		const _ = this;
		const { cssPrefix, toggleClickBindOn } = _.params;

		_.onElem = toggleClickBindOn === 'group' ? _.element :
			//default to group anyway if the body isn't specified
			(toggleClickBindOn === 'body' ? document.body : 'group')
			;

		$(_.onElem).on(`click.${EVENT_NAME} ${EVENT_NAME}`, `.${cssPrefix}__btn`, function (e) {

			_.toggleAction(this.hash || this.dataset.href);

			e.preventDefault();
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

		const { cssPrefix, useLocationHash, loadLocationHash, useHashFilter } = _.params;

		if (useLocationHash || loadLocationHash) {

			const hash = (useHashFilter ? (getHashParam(useHashFilter) || '') : location.hash);

			//if there are multiples
			const hashes = hash.split('=');

			for (let i = 0, l = hashes.length; i < l; i++) {
				const elID = '#' + hashes[i].split('&')[0].replace(/#/g, '');

				_.toggleAction(elID, noAnimation, history);
			}

			// if it's the last tab, then the 
			// location hash will not exist on the element
			// so just look for an open one
			if (_.prevID !== '#' && _.initiallyLoaded) {
				const $prevTab = $(_.onElem).find(_.prevID);

				if ($prevTab.length) {
					const isOpen = $prevTab.hasClass(`${cssPrefix}--open`);

					if (isOpen) {
						_.toggleAction(_.prevID, false, history);
					}
				}

				_.initiallyLoaded = true;
			}
		}
	}

	toggleAction(collapseID, noAnimation = false, history = true) {
		const _ = this;

		if (_.toggling || collapseID === '#') return;

		_.$collapsibleItem = $(_.element).find(collapseID);

		if (_.$collapsibleItem.length) {
			const { cssPrefix } = _.params;

			const close = _.$collapsibleItem.hasClass(`${cssPrefix}--open`);
			_.$btnElems = _.getBtnElems(collapseID);

			_.$collapsibleItem.addClass(noAnimation ? 
				(`${cssPrefix}--open ${cssPrefix}--no-animate`) : 
				`${cssPrefix}--toggling`
			);

			_.$btnElems
				.addClass(`${cssPrefix}--toggling`)
				.attr('aria-expanded', true);

			_.toggleOpenItems();
			close ? _.closeItems(_.$btnElems, _.$collapsibleItem) : _.openItems();

			history && updateHistoryState(_, collapseID.substring(1), close, _.prevID.substring(1));

			_.prevID = collapseID;
		}
	}


	toggleOpenItems($clickedItem) {
		const _ = this;

		if (!_.params.toggleGroup) return;

		const { cssPrefix } = _.params;

		const $btnElems = _.getBtnElems(_.prevID);

		$(_.element)
			.find(`.${cssPrefix}__body.${cssPrefix}--open`)
			.not($clickedItem)
			.each(function () {
				_.closeItems($btnElems, $(this));

		});
	}

	closeItems($btnElems, $openItem) {
		const _ = this;
		const { cssPrefix } = _.params;

		_.toggling = true;

		$openItem
			.addClass(`${cssPrefix}--toggling ${cssPrefix}--closing`)
			.css({ height: $openItem.height() })

		transitionElem(() => {
			$openItem.css({ height: '0px' });
		})

		transitionElem(() => {

			const rmClasses = `${cssPrefix}--open ${cssPrefix}--toggling ${cssPrefix}--closing`;
			$openItem
				.removeClass(rmClasses)
				.css({ height: '' });

			$btnElems
				.removeClass(rmClasses)
				.attr('aria-expanded', false);

			_.params.afterClose($btnElems, $openItem);

			_.toggling = false;

		}, _.params.toggleDuration);
 
	}

	openItems() {
		const _ = this;
		const { cssPrefix, toggleDuration } = _.params;

		_.toggling = true;

		_.$collapsibleItem.addClass(`${cssPrefix}--toggling ${cssPrefix}--opening`);
		const height = _.$collapsibleItem.height();

		_.$collapsibleItem.css({ height: '0px' })

		transitionElem(() => {
			_.$collapsibleItem.css({ height: height });
		});


		transitionElem(() => {

			const rmClasses = `${cssPrefix}--toggling ${cssPrefix}--opening ${cssPrefix}--no-animate`;

			_.$collapsibleItem.addClass(`${cssPrefix}--open`);
			_.$collapsibleItem.removeClass(rmClasses)
				.css({ height: '' });

			_.$btnElems
				.addClass(`${cssPrefix}--open`)
				.removeClass(rmClasses);

			_.params.afterOpen(this);
 
			_.moveToTopOnOpen();
		 
			_.toggling = false;
		}, toggleDuration);
	}

	moveToTopOnOpen() {
		const _ = this;
		const { cssPrefix, moveToTopOffset, moveToTopOnOpen, scrollSpeed } = _.params;
		const $item = _.$collapsibleItem.parent(`.${cssPrefix}__item`) || _.$collapsibleItem;

		if ($item.length && moveToTopOnOpen) {
			const elemOffsetTop = $item.offset().top;
			const top = elemOffsetTop - moveToTopOffset;

			smoothScroll(top, scrollSpeed)
		}
	}

	getBtnElems(id) {
		return $(this.onElem).find(`button[data-href="${id}"], a[href="${id}"]`);
	}
}

Collapse.defaults = DEFAULTS;