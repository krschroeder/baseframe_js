import validJSONFromString from './util/formatting-valid-json.js';
import $visible from './util/visible';
import { elData } from './util/lib-extend.js';
 

const VERSION = "1.2.0";
const DATA_NAME = 'AccessibleMenu';
const EVENT_NAME = 'accessibleMenu';

const keys = {
	ESC:   'Escape',
	LEFT:  'ArrowLeft',
	RIGHT: 'ArrowRight',
	UP:    'ArrowUp',
	DOWN:  'ArrowDown'
}

const DEFAULTS = {
	keyDirections: ['horizontal', 'vertical', 'vertical'],
	focusCss: 'focus'
}

const escapeKey = (e, $ulParents, focusCss) => {
	if (e.key == keys.ESC) {

		if ($ulParents.length > 1) {
			const $anchor = $visible($ulParents.eq(0).closest('li').find('a')); 
			$anchor[0].focus();
			$anchor.parent('li').addClass(focusCss);
		}
		e.preventDefault();
	} 
}

const focusListItem = (activeElem, $ulParents, focusCss, prev) => {
	const $aeLi = $(activeElem).parent('li');
	const $el = prev ? $visible($aeLi.prev('li')) : $visible($aeLi.next('li'));
	
	if ($el.length) {
		$el.addClass(focusCss).siblings('li').removeClass(focusCss);
		$el.find('a')[0].focus();
	} else {
		if ($ulParents.length > 1 ) { 
			
			const $anchor = $visible($ulParents.eq(0).parent('li').find('a'));
			if ($anchor.length) {

				$anchor[0].focus();
				$anchor.parent('li').eq(0).addClass(focusCss);
			}
		}
	}
}


const focusNestledListItem = (activeElem, focusCss) => { 
	const $el = $visible($(activeElem).parent('li').find('li'));

	if ($el.length) { 
		$el.addClass(focusCss).siblings('li').removeClass(focusCss);
		$visible($el.find('a'))[0].focus();
	}
}

const prev = (e, $ulParents, activeElem, focusCss, keyDirections) => {
	const l = $ulParents.length - 1;

	if (
		e.key === keys.LEFT && keyDirections[l] === "horizontal" ||
		e.key === keys.UP && keyDirections[l] === "vertical"  ||
		e.key === keys.LEFT && keyDirections[l] === "vertical" && 
		(l > 1 && keyDirections[l - 1] === "vertical" && $(activeElem).parent('li').index() === 0) 
	) {
		focusListItem(activeElem, $ulParents, focusCss, true);
		e.preventDefault();
	}
}

const next = (e, $ulParents, activeElem, focusCss, keyDirections) => {
	const l = $ulParents.length - 1;

	if (
		//go to sibling <li>
		e.key === keys.RIGHT && keyDirections[l] === "horizontal" ||
		e.key === keys.DOWN && keyDirections[l] === "vertical"
	) {

		focusListItem(activeElem, $ulParents,focusCss, false);
		e.preventDefault(); 
	}

	if (
		//go to the nestled <li>
		e.key === keys.RIGHT && keyDirections[l] === "vertical" ||
		e.key === keys.DOWN && keyDirections[l] === "horizontal"
	) {

		focusNestledListItem(activeElem, focusCss);
		e.preventDefault();
	}
}


 
export default class AccessibleMenu {

	static get version() {
		return VERSION;
	}

	static get pluginName() {
		return DATA_NAME;
	}

	static get defaults() {
		return DEFAULTS
	}

	constructor(element, options) {
		const _ = this;

		_.element = element; 

		const dataOptions = validJSONFromString(
			$(element).data(DATA_NAME + '-options')
		);

		elData( 
			element,
			`${DATA_NAME}_params`,
			$.extend(AccessibleMenu.defaults, options, dataOptions)
		);
		_.params = elData(element, `${DATA_NAME}_params`); 

		_.init();

		return this;
	}

	init() {
		const _ = this;
		let to = null;

		$(_.element).on('focusin.' + EVENT_NAME, 'a', function (e) {
			
			to && clearTimeout(to);
		 
			$(this).parent('li').addClass('focus')
				.siblings('li').removeClass('focus');
	
		}).on('mouseleave.' + EVENT_NAME, function () {
	
			$(this).find('li.focus').removeClass('focus');
		}).on('focusout.' + EVENT_NAME, function () { 
			to = setTimeout(()=>{
			 
				$(this).find('li.focus').removeClass('focus');
			},200)
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
		$el.off('blur.' + EVENT_NAME);
		$el.off('keydown.' + EVENT_NAME);

		$.store.remove(element, `${DATA_NAME}_params`);
		$.store.remove(element, `${DATA_NAME}_instance`);
	}
}