// import type { BaseElem } from 'cash-dom';
import type { StringPluginArgChoices } from './types';
import $be, {type BaseElem, type EventName} from "base-elem-js";

import { getDataOptions } from "./util/helpers";
import { isVisible } from './util/helpers';
import Store 		from "./core/Store";


const KEYS = {
	esc: 'Escape',
	left: 'ArrowLeft',
	right: 'ArrowRight',
	down: 'ArrowDown',
	up: 'ArrowUp',
	enter: 'Enter',
	shift: 'Shift',
	space: 'Space',
	tab: 'Tab'
}

type keyDirections = 'horizontal' | 'vertical';
type prevNextArgs = {
	e: KeyboardEvent,
	$ulParents: BaseElem,
	activeElem: Element | null,
	focusCss: string,
	keyDirections: keyDirections[];
	focusInElems: string;
};


export interface IAccessibleMenuDefaults {
	keyDirections: keyDirections[];
	focusCss: string;
	focusInElems: string;
	focusLeaveElems: string;
}

export interface IAccessibleMenuOptions extends Partial<IAccessibleMenuDefaults> {}

const VERSION = "1.3.0";
const DATA_NAME = 'AccessibleMenu';
const EVENT_NAME = 'accessibleMenu';
const DEFAULTS: IAccessibleMenuDefaults = {
	keyDirections: ['horizontal', 'vertical', 'vertical'],
	focusCss: 'focus',
	focusInElems: 'a, [tabindex]',
	focusLeaveElems: 'a, [tabindex], select, button'
}

const bes = $be.static;
const af = Array.from;

const visible = (i:number, el:HTMLElement) => isVisible(el);

export default class AccessibleMenu {

	public element: HTMLElement;
	public $element: BaseElem;
	public params: IAccessibleMenuDefaults;

	public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;
	
	constructor(element, options: IAccessibleMenuOptions | StringPluginArgChoices) {
		const s = this;
		
		const dataOptions = getDataOptions(element, EVENT_NAME);
		s.element = element;
		s.$element = $be(element);
		s.params = Object.assign({}, AccessibleMenu.defaults, options, dataOptions);

		s.handleEvents();

		return s;
	}

	static remove(element: BaseElem, plugin?: AccessibleMenu) {

		$be(element).each((elem) => {
			const s: AccessibleMenu = plugin || Store(elem, DATA_NAME);
			 
			s.$element.off([
                `focusin.${EVENT_NAME}`,
			    `mouseleave.${EVENT_NAME}`,
			    `blur.${EVENT_NAME}`,
			    `keydown.${EVENT_NAME}`
            ]);

			Store(elem, DATA_NAME, null);
		});
	}

    #getIndex (elem: HTMLElement) {
        return af(elem.parentElement.children).indexOf(elem);
    }
	
	prev(props: prevNextArgs): void {
		const s = this;
		const p = props;
		const l = p.$ulParents.elem.length - 1;
		const key = p.e.key;
		if (
			key === KEYS.left && p.keyDirections[l] === "horizontal" ||
			key === KEYS.up && p.keyDirections[l] === "vertical" ||
			key === KEYS.left && p.keyDirections[l] === "vertical" &&
			(l > 1 && p.keyDirections[l - 1] === "vertical" && s.#getIndex(p.activeElem.closest('li')) === 0)
		) {
			s.#focusListItem(p.activeElem, p.$ulParents, p.focusCss, true, p.focusInElems);
			p.e.preventDefault();
		}
	}
	
	next(props: prevNextArgs): void {
		const s = this;
		const p = props;
		const l = p.$ulParents.elem.length - 1;
		const atRootUl = p.$ulParents.elem.length === 1;
		const key = p.e.key;
		if (
			//go to sibling <li>
			key === KEYS.right && p.keyDirections[l] === "horizontal" ||
			key === KEYS.down && p.keyDirections[l] === "vertical"
		) {
            const 
                activeLi = p.activeElem.closest('li'),
                isLastLi = s.#getIndex(activeLi) === l,
			    isLastAtRoolLevel = atRootUl && isLastLi;
	
			if (isLastAtRoolLevel && isLastLi) {
				s.#escapeFromUlAtRootNext(s.params.focusLeaveElems, p.$ulParents, p.activeElem);
				 
			} else {
				s.#focusListItem(p.activeElem, p.$ulParents, p.focusCss, false, p.focusInElems);
				p.e.preventDefault();
			}
		}
	
		if (
			//go to the nestled <li>
			key === KEYS.right && p.keyDirections[l] === "vertical" ||
			key === KEYS.down && p.keyDirections[l] === "horizontal"
		) {
	
			s.#focusNestledListItem(p.activeElem, p.focusCss, p.focusInElems);
			p.e.preventDefault();
		}
	}

	handleEvents() {
		const s = this;
		let to: ReturnType<typeof setTimeout> | null = null;
        
        const $lis = s.$element.findBy('tag', 'li');

		s.$element.on(`focusin.${EVENT_NAME}`, (e: KeyboardEvent, elem: HTMLAnchorElement) => {

			to && clearTimeout(to);

            $lis.elem.forEach(el => {
                el === elem ? 
                bes.addClass(el, 'focus') : 
                bes.rmClass(el as HTMLElement, 'focus')
            });
            
		},this.params.focusInElems)
        .on(`mouseleave.${EVENT_NAME}`, (ev, elem) => {
            $lis.rmClass('focus');
			 
		}).on(`focusout.${EVENT_NAME}`, () => {
			to = setTimeout(() => $lis.rmClass('focus'), 200)
		});

		$be(s.element).on(`keydown.${EVENT_NAME}`, (e: KeyboardEvent) => {

			const { focusCss, keyDirections, focusInElems } = s.params;
			const activeElem = document.activeElement;
			const $ulParents: BaseElem = $be(activeElem).parents('ul');
			const props: prevNextArgs = { e, $ulParents, activeElem, focusCss, keyDirections, focusInElems };

			s.#escapeKey(e, $ulParents, focusCss, focusInElems);
			s.prev(props);
			s.next(props);
		});
	}

	#escapeKey(e: KeyboardEvent, $ulParents: BaseElem, focusCss: string, focusInElems: string): void {
		if (e.key == KEYS.esc) {
	
			if ($ulParents.length > 1) {
				const $anchor = $ulParents.eq(0).closest('li').find(focusInElems).filter(visible);
				$anchor[0].focus();
				$anchor.parent('li').addClass(focusCss);
			}
			e.preventDefault();
		}
	}
	
	#focusListItem(
		activeElem: Element | null,
		$ulParents: BaseElem,
		focusCss: string,
		prev: boolean,
		focusInElems: string
	): void {
		const $aeLi = $be(activeElem).parent('li');
		const $el = $aeLi[prev ? 'prev' : 'next']('li').filter(visible);
		
		if ($el.length) {
			$el.addClass(focusCss).siblings('li').rmClass(focusCss);
			$el.find(focusInElems)[0].focus();
		} else {
			if ($ulParents.length > 1) {
	
				const $anchor = $ulParents.eq(0).parent('li').find('a').filter(visible);
				if ($anchor.length) {
	
					$anchor[0].focus();
					$anchor.parent('li').eq(0).addClass(focusCss);
				}
			}
		}
	}
	
	#focusNestledListItem(
		activeElem: Element | null, 
		focusCss: string,
		focusInElems: string
	): void {
		const $el = $be(activeElem).parent('li').find('li').filter(visible);
	
		if ($el.length) {
			$el.addClass(focusCss).siblings('li').rmClass(focusCss);
			$el.find(focusInElems).filter(visible)[0].focus();
		}
	}
	
	#escapeFromUlAtRootNext(focusLeaveElems: string, $ulParents: BaseElem, activeElem: Element | null):void {
		const $rootUl = $ulParents.eq(0);
		const focusableElems = document.querySelectorAll(focusLeaveElems);
		let atCurrElem = false;
	
		for (let i = 0, l = focusableElems.length; i < l; i++) {
			const elem = focusableElems[i];
			if (!atCurrElem && activeElem?.isSameNode(elem)) {
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
}

declare module 'cash-dom' {
	export interface BaseElem {
		accessibleMenu(options?: IAccessibleMenuOptions | StringPluginArgChoices): BaseElem;
	}
}