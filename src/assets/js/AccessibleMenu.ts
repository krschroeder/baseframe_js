import $be  from "base-elem-js";
import type { BaseElem } from "base-elem-js";
import type { WinSetTimeout, StringPluginArgChoices } from './types';

import { KEYS } from "./core/constants";
import Store 		from "./core/Store";
import { 
    getDataOptions, 
    setParams 
}                   from "./util/helpers";


type keyDirections = 'horizontal' | 'vertical';

export interface IAccessibleMenuDefaults {
	keyDirections: keyDirections[];
	focusCss: string;
	focusInElems: string;
	focusLeaveElems: string;
}

export interface IAccessibleMenuOptions extends Partial<IAccessibleMenuDefaults> {}

const { isVisible } = $be.static;
const 
    VERSION             = "1.3.0",
    DATA_NAME           = 'AccessibleMenu',
    EVENT_NAME          = 'accessibleMenu',
    DEFAULTS: IAccessibleMenuDefaults = {
        keyDirections:  ['horizontal', 'vertical', 'vertical'],
        focusCss:       'focus',
        focusInElems:   'a, [tabindex]',
        focusLeaveElems: 'a, [tabindex], select, button'
    }
;


export default class AccessibleMenu {
	
    public static defaults = DEFAULTS;
    public static version = VERSION;
    public static pluginName = DATA_NAME;
	public element: HTMLElement;
	public $element: BaseElem;
	public params: IAccessibleMenuDefaults;
	public $aeLiParents: BaseElem = null;
	public activeElem: HTMLElement | null = null;
	public focusInElems: string = '';
	
	constructor(element, options: IAccessibleMenuOptions | StringPluginArgChoices) {
		const s = this;
		const dataOptions = getDataOptions(element, EVENT_NAME);

		s.element = element;
		s.$element = $be(element);
		s.params = setParams(AccessibleMenu.defaults, options, dataOptions);

		s.#handleEvents();

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
	
	#prev(e: KeyboardEvent): void {
		const 
            s = this,
		    p = s.params,
		    l = s.$aeLiParents.elem.length - 1,
		    key = e.key,
            dirs = p.keyDirections
        ;
		if (
			key === KEYS.left   && dirs[l] === "horizontal" ||
			key === KEYS.up     && dirs[l] === "vertical" ||
			key === KEYS.left   && dirs[l] === "vertical" &&
			(l > 1 && dirs[l - 1] === "vertical" && s.$aeLiParents.hasEls)
		) {
			s.#focusListItem(true);
			e.preventDefault();
		}
	}
	
	#next(e: KeyboardEvent): void {
		const 
            s = this,
            p = s.params,
		    l = s.$aeLiParents.elem.length - 1,
		    atRootUl = s.$aeLiParents.elem.length === 1,
		    key = e.key,
            keyIsRight = key === KEYS.right && p.keyDirections[l],
            keyIsDown = key === KEYS.down && p.keyDirections[l] 
        ;
       
        //go to sibling <li>
		if (keyIsRight === "horizontal" || keyIsDown === "vertical") {

            const 
                activeLi = s.activeElem.closest('li'),
                $sliblingLis = $be(activeLi).siblings('li',true),
                isLastLi = $sliblingLis.elem.at(-1) === activeLi,
                isLastAtRoolLevel = atRootUl && isLastLi
            ;
	
			if (isLastAtRoolLevel && isLastLi) {
               
                s.#focusFirstElem(s.$aeLiParents);
				 
			} else {
               
				s.#focusListItem(false);
				e.preventDefault();
			}
		}
	
        //go to the nestled <li>
		if (keyIsRight === "vertical" || keyIsDown === "horizontal") {
            const $nestledUl = $be(s.activeElem.closest('li')).findOne('ul')
            
            s.#focusFirstElem($nestledUl);
            e.preventDefault();
		}
	}

	#handleEvents() {
		const 
            s = this,
            p = s.params,
            $lis = s.$element.findBy('tag', 'li'),
            lis = $lis.toArray() as HTMLLIElement[]
        ;
      
		let focusOutDelay: WinSetTimeout = null;
       
		s.$element.on(`focusin.${EVENT_NAME}`, (e: KeyboardEvent, elem: HTMLLIElement) => {
            s.activeElem = document.activeElement as HTMLElement;
			focusOutDelay && clearTimeout(focusOutDelay);
    
            $be(s.activeElem.closest('li'))
                .addClass(p.focusCss)
                .siblings('li').rmClass(p.focusCss);
            
		}, lis)
        .on(`focusout.${EVENT_NAME}`, () => {
            focusOutDelay = setTimeout(() => $lis.rmClass(p.focusCss), 200)
        })
        .on(`mouseleave.${EVENT_NAME}`, () => {
            $lis.rmClass(p.focusCss);
		})
        s.$element.on(`keydown.${EVENT_NAME}`, (e: KeyboardEvent) => {
            s.$aeLiParents = $be(s.activeElem).parents('li', s.element);
           
			if (e.key == KEYS.esc) s.#focusFirstElem(s.$aeLiParents);
        
			s.#prev(e);
			s.#next(e);
		});
	}

    #focusFirstElem($focusWrapEl: BaseElem, prev: boolean = false, index: number = 0) {
        if (!$focusWrapEl.hasEls) return;

        const 
            s = this,
            p = s.params,
            $focusEls = $focusWrapEl.find(p.focusInElems, isVisible)
        ;
        
        if ($focusEls.hasEls) {
            const focusEl = $focusEls.elem[index] as HTMLElement;
             
            $be(focusEl.closest('li')).tgClass(p.focusCss, !prev);
            focusEl.focus();
        }
    }
	
	#focusListItem(prev: boolean): void {
		const 
            s = this,
            p = s.params,
            currLi = s.activeElem.closest('li'),
            siblingLi = (prev ? currLi.previousElementSibling : currLi.nextElementSibling) as HTMLLIElement,
            $currLi = $be(currLi),
            $siblingLi = $be(siblingLi)
        ;
       
        if ($siblingLi.hasEls) {
            s.#focusFirstElem($siblingLi, prev);
            
		} else {
            // go to the parent <li> if there is no sibling <li>
            const nth = s.$aeLiParents.size > 2 ? -2 : 0;
            $currLi.rmClass(p.focusCss);
            s.#focusFirstElem($be(s.$aeLiParents.elem.at(nth)), prev);
        }
	}
}

export interface AccessibleMenuPlugin {
	accessibleMenu(options?: IAccessibleMenuOptions | StringPluginArgChoices): BaseElem;
}
 
declare module 'base-elem-js' {
    interface BaseElem extends AccessibleMenuPlugin {}
}