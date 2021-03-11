import $ from 'cash-dom';
import validJSONFromString from './util/formatting-valid-json.js';

const VERSION = "1.0.0";
const DATA_NAME = 'AccessibleMenu';
const EVENT_NAME = 'accessibleMenu';

const keys = {
	ESC:   27,
	LEFT:  37,
	RIGHT: 39,
	UP:    38,
	DOWN:  40
}

const escapeKey = (e, $ulParents, focusCss) => {
	if (e.keyCode == keys.ESC) {

		if ($ulParents.length > 1) {
			const $anchor = $ulParents.eq(0).parent('li').find('a').first();
			$anchor[0].focus();
			$anchor.parent('li').addClass(focusCss);
		}
		e.preventDefault();
	}
}

const focusListItem = (activeElem, $ulParents, focusCss, prev) => {
	const $aeLi = $(activeElem).parent('li');
	const $el = prev ? $aeLi.prev('li') : $aeLi.next('li');

	if ($el.length) {
		$el.addClass(focusCss).siblings('li').removeClass(focusCss);
		$el.find('a').first()[0].focus();

	} else {
		if ($ulParents.length > 1) {
			const $anchor = $ulParents.eq(0).parent('li').find('a').first();
			$anchor[0].focus();
			$anchor.parent('li').addClass(focusCss);
		}
	}
}


const focusNestledListItem = (activeElem,focusCss) => {
	const $el = $(activeElem).parent('li').find('li').first();

	if ($el.length) {
		$el.addClass(focusCss).siblings('li').removeClass(focusCss);
		$el.find('a').first()[0].focus();
	}
}

const prev = (e, $ulParents, activeElem, focusCss, keyDirections) => {
	const l = $ulParents.length - 1;

	if (
		e.keyCode === keys.LEFT && keyDirections[l] === "horizontal" ||
		e.keyCode === keys.UP && keyDirections[l] === "vertical"
	) {

		focusListItem(activeElem, $ulParents, focusCss, true);
		e.preventDefault();
	}
}

const next = (e, $ulParents, activeElem, focusCss, keyDirections) => {
	const l = $ulParents.length - 1;

	if (
		//go to sibling <li>
		e.keyCode === keys.RIGHT && keyDirections[l] === "horizontal" ||
		e.keyCode === keys.DOWN && keyDirections[l] === "vertical"
	) {

		focusListItem(activeElem, $ulParents,focusCss, false);
		e.preventDefault();
	}

	if (
		//go to the nestled <li>
		e.keyCode === keys.RIGHT && keyDirections[l] === "vertical" ||
		e.keyCode === keys.DOWN && keyDirections[l] === "horizontal"
	) {

		focusNestledListItem(activeElem, $ulParents);
		e.preventDefault();
	}
}
 
export default class AccessibleMenu {

 	static get version(){
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	static get defaults() {
		return {
			keyDirections: ['horizontal', 'vertical', 'vertical'],
			focusCss: 'focus'
		}
	}

	constructor(element, options) {
		const _ = this;

		_.element = element; 

		const dataOptions = validJSONFromString(
			$(element).data(DATA_NAME + '-options')
		);

		$.store.set( 
			element,
			`${DATA_NAME}_params`,
			$.extend(AccessibleMenu.defaults, options, dataOptions)
		);
		_.params = $.store.get(element, `${DATA_NAME}_params`);

		_.init();
	}

	init() {
		const _ = this;
		$(_.element).on('focusin.' + EVENT_NAME, 'a', function (e) {

			$(this).parent('li').addClass('focus')
				.siblings('li').removeClass('focus');
	
		}).on('mouseleave.' + EVENT_NAME, function () {
	
			$(this).find('li.focus').removeClass('focus');
		});
	
		$(_.element).on('keydown.' + EVENT_NAME, function (e) {
			e = e || window.event;
			const {focusCss, keyDirections} = _.params;
			const activeElem = document.activeElement;
			const $ulParents = $(activeElem).parents('ul');
			const props = [e, $ulParents, activeElem, focusCss, keyDirections];
	
			escapeKey(e, $ulParents);
			prev(...props);
			next(...props);
		});
	}

	static remove(element) {
		const $el = $(element);

		$el.off('focusin.' + EVENT_NAME);
		$el.off('mouseleave.' + EVENT_NAME);
		$el.off('keydown.' + EVENT_NAME);

		$.store.remove(element, `${DATA_NAME}_params`);
		$.store.remove(element, `${DATA_NAME}_instance`);
	}
}