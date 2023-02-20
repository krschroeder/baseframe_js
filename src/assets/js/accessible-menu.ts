import parseObjectFromString from './util/parse-object-from-string';
import $visible from './util/visible';
import elemData from "./util/elemData";
import { KEYS } from './util/constants';
import $, { Cash } from 'cash-dom';

import type { StringPluginArgChoices } from './types/shared';

const VERSION = "1.2.1";
const DATA_NAME = 'AccessibleMenu';
const EVENT_NAME = 'accessibleMenu';


type keyDirections = 'horizontal' | 'vertical';
type prevNextArgs = {
	e: KeyboardEvent,
	$ulParents: Cash,
	activeElem: Element | null,
	focusCss: string,
	keyDirections: keyDirections[];
	focusInElems: string;
};

export interface IAccessibleMenuOptions {
	keyDirections?: keyDirections[];
	focusCss?: string;
	focusInElems?: string;
	focusLeaveElems?: string;
}

export interface IAccessibleMenuDefaults {
	keyDirections: keyDirections[];
	focusCss: string;
	focusInElems: string;
	focusLeaveElems: string;
}

const DEFAULTS: IAccessibleMenuDefaults = {
	keyDirections: ['horizontal', 'vertical', 'vertical'],
	focusCss: 'focus',
	focusInElems: 'a, [tabindex]',
	focusLeaveElems: 'a, [tabindex], select, button'
}

const escapeKey = (e: KeyboardEvent, $ulParents: Cash, focusCss: string, focusInElems: string): void => {
	if (e.key == KEYS.esc) {

		if ($ulParents.length > 1) {
			const $anchor = $visible($ulParents.eq(0).closest('li').find(focusInElems));
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
	prev: boolean,
	focusInElems: string
): void => {
	const $aeLi = $(activeElem).parent('li');
	const $el = prev ? $visible($aeLi.prev('li')) : $visible($aeLi.next('li'));

	if ($el.length) {
		$el.addClass(focusCss).siblings('li').removeClass(focusCss);
		$el.find(focusInElems)[0].focus();
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

const focusNestledListItem = (
	activeElem: Element | null, 
	focusCss: string,
	focusInElems: string
): void => {
	const $el = $visible($(activeElem).parent('li').find('li'));

	if ($el.length) {
		$el.addClass(focusCss).siblings('li').removeClass(focusCss);
		$visible($el.find(focusInElems))[0].focus();
	}
}

const escapeFromUlAtRootNext = (focusLeaveElems: string, $ulParents: Cash, activeElem: Element):void => {
	const $rootUl = $ulParents.eq(0);
	const focusableElems = document.querySelectorAll(focusLeaveElems);
	let atCurrElem = false;

	for (let i = 0, l = focusableElems.length; i < l; i++) {
		const elem = focusableElems[i];
		if (!atCurrElem && activeElem.isSameNode(elem)) {
			atCurrElem = true;
		}
		if (atCurrElem && !$rootUl.has(elem).length) {
			 
			if (elem instanceof HTMLElement) {
				elem.focus();
				break;
			}
		}
	}
}

const prev = (_: AccessibleMenu, props: prevNextArgs): void => {
	const { e, $ulParents, activeElem, focusCss, keyDirections, focusInElems } = props;
	const l = $ulParents.length - 1;

	if (
		e.key === KEYS.left && keyDirections[l] === "horizontal" ||
		e.key === KEYS.up && keyDirections[l] === "vertical" ||
		e.key === KEYS.left && keyDirections[l] === "vertical" &&
		(l > 1 && keyDirections[l - 1] === "vertical" && $(activeElem).parent('li').index() === 0)
	) {
		focusListItem(activeElem, $ulParents, focusCss, true, focusInElems);
		e.preventDefault();
	}
}

const next = (_: AccessibleMenu, props: prevNextArgs): void => {
	const { e, $ulParents, activeElem, focusCss, keyDirections, focusInElems } = props;
	const l = $ulParents.length - 1;
	const atRootUl = $ulParents.length === 1;

	if (
		//go to sibling <li>
		e.key === KEYS.right && keyDirections[l] === "horizontal" ||
		e.key === KEYS.down && keyDirections[l] === "vertical"
	) {
		const isLastAtRoolLevel = atRootUl && $(activeElem).closest('li').last();
		const $currentLi = $(activeElem).closest('li');
		const isLastListItem = !$currentLi.next('li').length;

		if (isLastAtRoolLevel && isLastListItem) {
			escapeFromUlAtRootNext(_.params.focusLeaveElems, $ulParents, activeElem);
			 
		} else {
			focusListItem(activeElem, $ulParents, focusCss, false, focusInElems);
			e.preventDefault();
		}
	}

	if (
		//go to the nestled <li>
		e.key === KEYS.right && keyDirections[l] === "vertical" ||
		e.key === KEYS.down && keyDirections[l] === "horizontal"
	) {

		focusNestledListItem(activeElem, focusCss, focusInElems);
		e.preventDefault();
	}
}


export default class AccessibleMenu {

	public element: HTMLElement;
	public params: IAccessibleMenuDefaults;

	static get version() { return VERSION; }
	static get pluginName() { return DATA_NAME; }
	public static Defaults = DEFAULTS;

	constructor(element, options) {
		const _ = this;

		_.element = element;

		const dataOptions = parseObjectFromString(
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

			const { focusCss, keyDirections, focusInElems } = _.params;
			const activeElem = document.activeElement;
			const $ulParents: Cash = $(activeElem).parents('ul');
			const props: prevNextArgs = { e, $ulParents, activeElem, focusCss, keyDirections, focusInElems };

			escapeKey(e, $ulParents, focusCss, focusInElems);
			prev(_, props);
			next(_, props);
		});
	}
}

declare module 'cash-dom' {
	export interface Cash {
		accessibleMenu(options?: IAccessibleMenuOptions | StringPluginArgChoices): Cash;
	}
}