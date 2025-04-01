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
	$liRoot: BaseElem,
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
		const l = p.$liRoot.elem.length - 1;
		const key = p.e.key;
		if (
			key === KEYS.left && p.keyDirections[l] === "horizontal" ||
			key === KEYS.up && p.keyDirections[l] === "vertical" ||
			key === KEYS.left && p.keyDirections[l] === "vertical" &&
			(l > 1 && p.keyDirections[l - 1] === "vertical" && s.#getIndex(p.activeElem.closest('li')) === 0)
		) {
			s.#focusListItem(p.activeElem, p.$liRoot, p.focusCss, true, p.focusInElems);
			p.e.preventDefault();
		}
	}
	
	next(props: prevNextArgs): void {
		const 
            s = this,
		    p = props,
		    l = p.$liRoot.elem.length - 1,
		    atRootUl = p.$liRoot.elem.length === 1,
		    key = p.e.key,
            keyIsRight = key === KEYS.right && p.keyDirections[l],
            keyIsDown = key === KEYS.down && p.keyDirections[l]
        ;
        
        //go to sibling <li>
		if (keyIsRight === "horizontal" || keyIsDown === "vertical") {

            
            const 
                activeLi = p.activeElem.closest('li'),
                isLastLi = s.#getIndex(activeLi) === l,
                isLastAtRoolLevel = atRootUl && isLastLi;
            // console.log('downnn yo', l, activeLi, isLastLi, isLastAtRoolLevel);
	
			if (isLastAtRoolLevel && isLastLi) {
				s.#escapeFromUlAtRootNext(s.params.focusLeaveElems, p.$liRoot, p.activeElem);
				 
			} else {
				s.#focusListItem(p.activeElem, p.$liRoot, p.focusCss, false, p.focusInElems);
				p.e.preventDefault();
			}
		}
	
        //go to the nestled <li>
		if (keyIsRight === "vertical" || keyIsDown === "horizontal") {
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

		s.$element.on(`keydown.${EVENT_NAME}`, (e: KeyboardEvent) => {

			const { focusCss, keyDirections, focusInElems } = s.params;
			const activeElem = document.activeElement;
            const $liRoot = $be(activeElem as HTMLElement).parents('li', s.element);
			const props: prevNextArgs = { e, $liRoot, activeElem, focusCss, keyDirections, focusInElems };

			s.#escapeKey(e, $liRoot, focusCss, focusInElems);
			s.prev(props);
			s.next(props);
		});
	}

	#escapeKey(e: KeyboardEvent, $liRoot: BaseElem, focusCss: string, focusInElems: string): void {
		if (e.key == KEYS.esc) {
	
			if ($liRoot.elem.length > 1) {
				// const $anchor = $liRoot.eq(0).closest('li').find(focusInElems).filter(visible);
                const $anchor = $liRoot.find('a', bes.isVisible);
				if ($anchor.hasElems()) ($anchor.elem[0] as HTMLAnchorElement).focus();
				$anchor.find(elem => elem.closest('li')).addClass(focusCss);
			}
			e.preventDefault();
		}
	}
	
	#focusListItem(
		activeElem: Element | null,
		$liRoot: BaseElem,
		focusCss: string,
		prev: boolean,
		focusInElems: string
	): void {
		 
        const currLi = (activeElem as HTMLElement).closest('li');
        const $nextLi = $be((prev ? currLi.previousElementSibling : currLi.nextElementSibling) as HTMLLIElement);
        const $anchor = $nextLi.find('a', bes.isVisible);


        if ($nextLi.hasElems()) {
            $be(currLi).rmClass(focusCss);
            $nextLi.addClass(focusCss);

            ($anchor.elem[0] as HTMLAnchorElement).focus();
		} else {
            if ($liRoot.hasElems()) {
                const $anchor = $liRoot.find('a', bes.isVisible);
                if ($anchor.hasElems()) {
                    ($anchor.elem[0] as HTMLAnchorElement).focus();
                    $anchor.find(elem => elem.closest('li')).addClass(focusCss);
                }
            }
        }
	}
	
	#focusNestledListItem(
		activeElem: Element | null, 
		focusCss: string,
		focusInElems: string
	): void {
		// const $el = $be(activeElem).parent('li').find('li').filter(visible);
        const $parentActiveLi = $be(activeElem as HTMLElement).find((elem) => elem.closest('li'));
        const $li = $parentActiveLi.find('li', bes.isVisible);
	
		if ($li.hasElems()) {
			// $li.addClass(focusCss).siblings('li').rmClass(focusCss);
			// $li.find(focusInElems).filter(visible)[0].focus();
            $li.rmClass(focusCss);
            $parentActiveLi.addClass(focusCss);
            ($li.find(focusInElems, bes.isVisible).elem[0] as HTMLElement).focus();
		}
	}
	
	#escapeFromUlAtRootNext(focusLeaveElems: string, $liRoot: BaseElem, activeElem: Element | null):void {
        const s = this;
        const { focusInElems } = s.params;
		const $rootUl = $liRoot.get(0);
		const focusableElems = document.querySelectorAll(focusLeaveElems);
		let atCurrElem = false;
	
		for (let i = 0, l = focusableElems.length; i < l; i++) {
			const currElem = focusableElems[i];
			if (!atCurrElem && activeElem?.isSameNode(currElem)) {
				atCurrElem = true;
			}
			// if (atCurrElem && !$rootUl.has(elem).length) {
            if (
                atCurrElem && 
                !$rootUl.find(focusInElems,(elem) => elem === currElem).hasElems()
            ) {
				 
				if (currElem instanceof HTMLElement) {
					currElem.focus();
					break;
				}
			}
		}
	}
}

declare module 'base-elem-js' {
	export interface BaseElem {
		accessibleMenu(options?: IAccessibleMenuOptions | StringPluginArgChoices): BaseElem;
	}
}