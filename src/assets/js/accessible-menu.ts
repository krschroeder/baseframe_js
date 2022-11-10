import validJSONFromString from './util/formatting-valid-json';
import $visible from './util/visible';
import { elemData } from '../js/util/store';
import { KEYS } from './util/constants';
import $, { Cash } from 'cash-dom';

import type { StringPluginArgChoices } from '../types/shared';

const VERSION = "1.2.1";
const DATA_NAME = 'AccessibleMenu';
const EVENT_NAME = 'accessibleMenu';


type keyDirections = 'horizontal' | 'vertical';
type prevNextArgs = [
	e: KeyboardEvent,
	$ulParents: Cash,
	activeElem: Element | null,
	focusCss: string,
	keyDirections: keyDirections[]
];

export interface IAccessibleMenuOptions {
	keyDirections?: keyDirections[];
	focusCss?: string;
}

export interface IAccessibleMenuDefaults {
	keyDirections: keyDirections[];
	focusCss: string;
	focusInElems: string;
}

const DEFAULTS: IAccessibleMenuDefaults = {
	keyDirections: ['horizontal', 'vertical', 'vertical'],
	focusCss: 'focus',
	focusInElems: 'a, [tabindex]'
}

const escapeKey = (e: KeyboardEvent, $ulParents: Cash, focusCss: string): void => {
	if (e.key == KEYS.ESC) {

		if ($ulParents.length > 1) {
			const $anchor = $visible($ulParents.eq(0).closest('li').find('a'));
			$anchor[0].focus();
			$anchor.parent('li').addClass(focusCss);
		}
		e.preventDefault();
	}
}

const focusListItem = (
	activeElem: Element | null,
	$ulParents: Cash,
	focusCss: string,
	prev: boolean
): void => {
	const $aeLi = $(activeElem).parent('li');
	const $el = prev ? $visible($aeLi.prev('li')) : $visible($aeLi.next('li'));

	if ($el.length) {
		$el.addClass(focusCss).siblings('li').removeClass(focusCss);
		$el.find('a')[0].focus();
	} else {
		if ($ulParents.length > 1) {

			const $anchor = $visible($ulParents.eq(0).parent('li').find('a'));
			if ($anchor.length) {

				$anchor[0].focus();
				$anchor.parent('li').eq(0).addClass(focusCss);
			}
		}
	}
}

const focusNestledListItem = (activeElem: Element | null, focusCss: string): void => {
	const $el = $visible($(activeElem).parent('li').find('li'));

	if ($el.length) {
		$el.addClass(focusCss).siblings('li').removeClass(focusCss);
		$visible($el.find('a'))[0].focus();
	}
}

const prev = (
	e: KeyboardEvent,
	$ulParents: Cash,
	activeElem: Element | null,
	focusCss: string,
	keyDirections: keyDirections[]
): void => {
	const l = $ulParents.length - 1;

	if (
		e.key === KEYS.LEFT && keyDirections[l] === "horizontal" ||
		e.key === KEYS.UP && keyDirections[l] === "vertical" ||
		e.key === KEYS.LEFT && keyDirections[l] === "vertical" &&
		(l > 1 && keyDirections[l - 1] === "vertical" && $(activeElem).parent('li').index() === 0)
	) {
		focusListItem(activeElem, $ulParents, focusCss, true);
		e.preventDefault();
	}
}

const next = (
	e: KeyboardEvent,
	$ulParents: Cash,
	activeElem: Element | null,
	focusCss: string,
	keyDirections: keyDirections[]
): void => {
	const l = $ulParents.length - 1;

	if (
		//go to sibling <li>
		e.key === KEYS.RIGHT && keyDirections[l] === "horizontal" ||
		e.key === KEYS.DOWN && keyDirections[l] === "vertical"
	) {

		focusListItem(activeElem, $ulParents, focusCss, false);
		e.preventDefault();
	}

	if (
		//go to the nestled <li>
		e.key === KEYS.RIGHT && keyDirections[l] === "vertical" ||
		e.key === KEYS.DOWN && keyDirections[l] === "horizontal"
	) {

		focusNestledListItem(activeElem, focusCss);
		e.preventDefault();
	}
}




export default class AccessibleMenu {

	public element: HTMLElement;
	public params: IAccessibleMenuDefaults;
	// public static Defaults: IAccessibleMenuOptions;
	public static Defaults = DEFAULTS;

	constructor(element, options) {
		const _ = this;

		_.element = element;

		const dataOptions = validJSONFromString(
			$(element).data(EVENT_NAME + '-options')
		);

		elemData(
			element,
			`${DATA_NAME}_params`,
			$.extend({}, AccessibleMenu.Defaults, options, dataOptions)
		);
		_.params = elemData(element, `${DATA_NAME}_params`);

		_.init();

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
			const $el = $(instance.element);

			$el.off('focusin.' + EVENT_NAME);
			$el.off('mouseleave.' + EVENT_NAME);
			$el.off('blur.' + EVENT_NAME);
			$el.off('keydown.' + EVENT_NAME);

			elemData(this, `${DATA_NAME}_params`, null, true);
			elemData(this, `${DATA_NAME}_instance`, null, true);
		});
	}

	init() {
		const _ = this;
		let to: ReturnType<typeof setTimeout> | null = null;

		$(_.element).on('focusin.' + EVENT_NAME, this.params.focusInElems, function (e: KeyboardEvent) {

			to && clearTimeout(to);

			$(this).parent('li').addClass('focus')
				.siblings('li').removeClass('focus');

		}).on('mouseleave.' + EVENT_NAME, function () {

			$(this).find('li.focus').removeClass('focus');
		}).on('focusout.' + EVENT_NAME, function () {
			to = setTimeout(() => {

				$(this).find('li.focus').removeClass('focus');
			}, 200)
		});

		$(_.element).on('keydown.' + EVENT_NAME, function (e: KeyboardEvent) {
			// e = e || window.event;
			const { focusCss, keyDirections } = _.params;
			const activeElem = document.activeElement;
			const $ulParents: Cash = $(activeElem).parents('ul');
			const props: prevNextArgs = [e, $ulParents, activeElem, focusCss, keyDirections];

			escapeKey(e, $ulParents, focusCss);
			prev(...props);
			next(...props);
		});
	}
}

declare module 'cash-dom' {
	export interface Cash {
		accessibleMenu(options?: IAccessibleMenuOptions | StringPluginArgChoices): Cash;
	}
}