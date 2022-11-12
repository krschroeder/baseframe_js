import type { Cash } from "cash-dom";
import type { LocationHashTrackingHistory, StringPluginArgChoices } from './types/shared';

import $ from 'cash-dom';
import parseObjectFromString from './util/parse-object-from-string';
import smoothScroll from './util/smooth-scroll';
import { getHashParam } from './util/get-param';
import elemData from "./util/elemData";
import updateHistoryState from './util/plugin/update-history-state';
import { noop, transitionElem } from './util/helpers';

export interface ICollapseOptions extends LocationHashTrackingHistory {
	cssPrefix?: string;
	toggleClickBindOn?: 'group' | 'body';
	toggleDuration?: number;
	toggleGroup?: boolean;
	moveToTopOnOpen?: boolean;
	moveToTopOffset?: number;
	scrollSpeed?: number;
	afterOpen?($btnElems: Cash, $collapsibleItem: Cash): void;
	afterClose?($btnElems: Cash, $collapsibleItem: Cash): void;
	afterInit?(element: HTMLElement): void;
}

export interface ICollapseDefaults extends LocationHashTrackingHistory {
	cssPrefix: string;
	toggleClickBindOn: 'group' | 'body';
	toggleDuration: number;
	toggleGroup: boolean;
	moveToTopOnOpen: boolean;
	moveToTopOffset: number;
	scrollSpeed: number;
	afterOpen($btnElems: Cash, $collapsibleItem: Cash): void;
	afterClose($btnElems: Cash, $collapsibleItem: Cash): void;
	afterInit(element: HTMLElement): void;
}

const VERSION = "3.1.2";
const DATA_NAME = 'Collapse';
const EVENT_NAME = 'collapse';
const DEFAULTS: ICollapseDefaults = {
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

	public element: HTMLElement;
	public onElem: HTMLElement;
	public index: number;
	public params: ICollapseDefaults;
	public toggling: boolean;
	public prevID: string;
	public initiallyLoaded: boolean;
	public $btnElems: Cash | null;
	public $collapsibleItem: Cash | null;


	public static Defaults = DEFAULTS;

	constructor(element: HTMLElement, options: ICollapseOptions, index: number) {

		const _ = this;

		_.element = element;
		_.onElem = element;
		_.index = index;

		const dataOptions = parseObjectFromString($(element).data(EVENT_NAME + '-options'));
		const instanceOptions = $.extend({}, Collapse.Defaults, options, dataOptions);

		elemData(element, `${DATA_NAME}_params`, instanceOptions);
		_.params = elemData(element, `${DATA_NAME}_params`);

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

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	static remove(element) {
		$(element).each(function () {

			const instance = elemData(this, `${DATA_NAME}_instance`);

			$(instance.onElem).off(`click.${EVENT_NAME} ${EVENT_NAME}`);
			$(window).off(`popstate.${EVENT_NAME}`);

			elemData(this, `${DATA_NAME}_params`, null, true);
			elemData(this, `${DATA_NAME}_instance`, null, true);
		})
	}

	collapseEvents() {
		const _ = this;
		const { cssPrefix, toggleClickBindOn } = _.params;
 
		_.onElem = toggleClickBindOn === 'body' ? document.body : _.element;

		$(_.onElem).on(`click.${EVENT_NAME} ${EVENT_NAME}`, `.${cssPrefix}__btn`, function (e: Event) {

			_.toggleAction(this.hash || this.dataset.href);

			e.preventDefault();
		});

		$(window).on(`popstate.${EVENT_NAME}`, (e: Event) => {
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
			const openingCss = noAnimation ? (`${cssPrefix}--open ${cssPrefix}--no-animate`):`${cssPrefix}--toggling`;

			_.$btnElems = _.getBtnElems(collapseID);
			_.$collapsibleItem.addClass(openingCss);
			_.$btnElems.addClass(`${cssPrefix}--toggling`).attr({'aria-expanded': 'true'});

			_.toggleOpenItems();
			close ? _.closeItems(_.$btnElems, _.$collapsibleItem) : _.openItems();

			history && updateHistoryState(_, collapseID.substring(1), close, _.prevID.substring(1));

			_.prevID = collapseID;
		}
	}


	toggleOpenItems() {
		const _ = this;

		if (!_.params.toggleGroup) return;

		const { cssPrefix } = _.params;

		const $btnElems = _.getBtnElems(_.prevID);

		$(_.element).find(`.${cssPrefix}__body.${cssPrefix}--open`)
			// .not($clickedItem)
			.each(function () {
				_.closeItems($btnElems, $(this));
			});
	}

	closeItems($btnElems: Cash, $openItem: Cash) {
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
			$openItem.removeClass(rmClasses).css({ height: '' });
			$btnElems.removeClass(rmClasses).attr({'aria-expanded': 'false'});

			_.params.afterClose($btnElems, $openItem);

			_.toggling = false;

		}, _.params.toggleDuration);

	}

	openItems() {
		const _ = this;
		const { cssPrefix, toggleDuration } = _.params;

		_.toggling = true;

		if (_.$collapsibleItem) {

			_.$collapsibleItem.addClass(`${cssPrefix}--toggling ${cssPrefix}--opening`);
			const height = _.$collapsibleItem.height();

			_.$collapsibleItem.css({ height: '0px' })

			transitionElem(() => {
				(_.$collapsibleItem as Cash).css({ height: height });
			});


			transitionElem(() => {

				const rmClasses = `${cssPrefix}--toggling ${cssPrefix}--opening ${cssPrefix}--no-animate`;

				(_.$collapsibleItem as Cash).addClass(`${cssPrefix}--open`);
				(_.$collapsibleItem as Cash).removeClass(rmClasses).css({ height: '' });

				if (_.$btnElems) {

					_.$btnElems.addClass(`${cssPrefix}--open`).removeClass(rmClasses);
				}

				_.params.afterOpen(_.$btnElems as Cash, _.$collapsibleItem as Cash);

				_.moveToTopOnOpen();

				_.toggling = false;
			}, toggleDuration);
		}
	}

	moveToTopOnOpen() {
		const _ = this;
		const { cssPrefix, moveToTopOffset, moveToTopOnOpen, scrollSpeed } = _.params;
		
		if (_.$collapsibleItem) {
			const $item: Cash = _.$collapsibleItem.parent(`.${cssPrefix}__item`) || _.$collapsibleItem as Cash;

			if ($item.length && moveToTopOnOpen) {
				// get the compiler to stop from throwing 
				// an error it'll never throw by setting to 'any'
				const elemOffsetTop = ($item as any).offset().top;
				const top = elemOffsetTop - moveToTopOffset;

				smoothScroll(top, scrollSpeed)
			}
		}
	}

	getBtnElems(id) {
		return $(this.onElem).find(`button[data-href="${id}"], a[href="${id}"]`);
	}
}

declare module 'cash-dom' {
    export interface Cash {
        collapse(options?: ICollapseOptions | StringPluginArgChoices): Cash;
    }
}