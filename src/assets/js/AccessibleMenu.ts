// import type { BaseElem } from 'cash-dom';
import type { StringPluginArgChoices } from './types';
import $be, {type BaseElem, type EventName} from "base-elem-js";

import { getDataOptions, setParams } from "./util/helpers";
import Store 		from "./core/Store";

const { isVisible } = $be.static;

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
// type prevNextArgs = {
// 	e: KeyboardEvent,
// 	$liRoot: BaseElem,
// 	activeElem: Element | null,
// 	focusCss: string,
// 	keyDirections: keyDirections[];
// 	focusInElems: string;
// };


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
	
    public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;

	public element: HTMLElement;
	public $element: BaseElem;
	public params: IAccessibleMenuDefaults;
	public $liRoot: BaseElem = null;
	public activeElem: Element | null = null;
	public focusInElems: string = '';

	
	constructor(element, options: IAccessibleMenuOptions | StringPluginArgChoices) {
		const s = this;
		
		const dataOptions = getDataOptions(element, EVENT_NAME);
		s.element = element;
		s.$element = $be(element);
		s.params = setParams(AccessibleMenu.defaults, options, dataOptions);

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
	
	prev(e: KeyboardEvent): void {
		const 
            s = this,
		    p = s.params,
		    l = s.$liRoot.elem.length - 1,
		    key = e.key,
            dirs = p.keyDirections
        ;
		if (
			key === KEYS.left && dirs[l] === "horizontal" ||
			key === KEYS.up && dirs[l] === "vertical" ||
			key === KEYS.left && dirs[l] === "vertical" &&
			(l > 1 && dirs[l - 1] === "vertical" && s.#getIndex(s.activeElem.closest('li')) === 0)
		) {
			s.#focusListItem(true);
			e.preventDefault();
		}
	}
	
	next(e: KeyboardEvent): void {
		const 
            s = this,
            p = s.params,
		    l = s.$liRoot.elem.length - 1,
		    atRootUl = s.$liRoot.elem.length === 1,
		    key = e.key,
            keyIsRight = key === KEYS.right && p.keyDirections[l],
            keyIsDown = key === KEYS.down && p.keyDirections[l],
            activeElem = document.activeElement
        ;
        
        //go to sibling <li>
		if (keyIsRight === "horizontal" || keyIsDown === "vertical") {

            const 
                activeLi = activeElem.closest('li'),
                isLastLi = s.#getIndex(activeLi) === l,
                isLastAtRoolLevel = atRootUl && isLastLi
            ;
	
			if (isLastAtRoolLevel && isLastLi) {
				s.#escapeFromUlAtRootNext();
				 
			} else {
				s.#focusListItem(false);
				e.preventDefault();
			}
		}
	
        //go to the nestled <li>
		if (keyIsRight === "vertical" || keyIsDown === "horizontal") {
			s.#focusNestledListItem(activeElem, p.focusCss, p.focusInElems);
			e.preventDefault();
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
            
		}, this.params.focusInElems)
        .on(`mouseleave.${EVENT_NAME}`, (ev, elem) => {
            $lis.rmClass('focus');
			 
		}).on(`focusout.${EVENT_NAME}`, () => {
			to = setTimeout(() => $lis.rmClass('focus'), 200)
		});

		s.$element.on(`keydown.${EVENT_NAME}`, (e: KeyboardEvent) => {
			 
			s.activeElem = document.activeElement;
            s.$liRoot = $be(s.activeElem as HTMLElement).parents('li', s.element);


			s.#escapeKey(e);
			s.prev(e);
			s.next(e);
		});
	}

	#escapeKey(e: KeyboardEvent): void {
        const s = this;

		if (e.key == KEYS.esc) {
	
			if (s.$liRoot.hasElems()) {
                const $anchor = s.$liRoot.find('a', bes.isVisible);
				if ($anchor.hasElems()) ($anchor.elem[0] as HTMLAnchorElement).focus();
				$anchor.find(elem => elem.closest('li')).addClass(s.params.focusCss);
			}
			e.preventDefault();
		}
	}
	
	#focusListItem(prev: boolean): void {
		const 
            s = this,
            p = s.params,
            currLi = (s.activeElem as HTMLElement).closest('li'),
            $nextLi = $be((prev ? currLi.previousElementSibling : currLi.nextElementSibling) as HTMLLIElement),
            $anchor = $nextLi.find('a', bes.isVisible)
        ;

        if ($nextLi.hasElems()) {
            $be(currLi).rmClass(p.focusCss);
            $nextLi.addClass(p.focusCss);

            ($anchor.elem[0] as HTMLAnchorElement).focus();
		} else {
            if (s.$liRoot.hasElems()) {
                const $anchor = s.$liRoot.find('a', bes.isVisible);
                if ($anchor.hasElems()) {
                    ($anchor.elem[0] as HTMLAnchorElement).focus();
                    $anchor.find(elem => elem.closest('li')).addClass(p.focusCss);
                }
            }
        }
	}
	
	#focusNestledListItem(
		activeElem: Element | null, 
		focusCss: string,
		focusInElems: string
	): void {
		
        const $parentActiveLi = $be(activeElem as HTMLElement).find((elem) => elem.closest('li'));
        const $li = $parentActiveLi.find('li', bes.isVisible);
	
		if ($li.hasElems()) {
			
            $li.rmClass(focusCss);
            $parentActiveLi.addClass(focusCss);
            ($li.find(focusInElems, bes.isVisible).elem[0] as HTMLElement).focus();
		}
	}
	
	#escapeFromUlAtRootNext():void {
        const 
            s = this,
            { focusInElems, focusLeaveElems } = s.params,
		    $rootUl = s.$liRoot.get(0),
		    focusableElems = document.querySelectorAll(focusLeaveElems)
        ;

		let atCurrElem = false;
	
		for (let i = 0, l = focusableElems.length; i < l; i++) {
			const currElem = focusableElems[i];
			if (!atCurrElem && s.activeElem?.isSameNode(currElem)) {
				atCurrElem = true;
			}
			
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