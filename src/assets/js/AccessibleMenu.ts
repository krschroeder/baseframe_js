import $be  from "base-elem-js";
import type { BaseElem } from "base-elem-js";
import type { StringPluginArgChoices } from './types';
import Store 		from "./core/Store";
import { 
    getDataOptions, 
    setParams 
}                   from "./util/helpers";
import { KEYS }     from './core/constants';


const { addClass, isVisible, rmClass } = $be.static;

type keyDirections = 'horizontal' | 'vertical';


export interface IAccessibleMenuDefaults {
	keyDirections: keyDirections[];
	focusCss: string;
	focusInElems: string;
	focusLeaveElems: string;
}

export interface IAccessibleMenuOptions extends Partial<IAccessibleMenuDefaults> {}

const bes = $be.static;

const 
    VERSION = "1.3.0",
    DATA_NAME = 'AccessibleMenu',
    EVENT_NAME = 'accessibleMenu',
    DEFAULTS: IAccessibleMenuDefaults = {
        keyDirections: ['horizontal', 'vertical', 'vertical'],
        focusCss: 'focus',
        focusInElems: 'a, [tabindex]',
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
	
	prev(e: KeyboardEvent): void {
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
	
	next(e: KeyboardEvent): void {
		const 
            s = this,
            p = s.params,
		    l = s.$aeLiParents.elem.length - 1,
		    atRootUl = s.$aeLiParents.elem.length === 1,
		    key = e.key,
            keyIsRight = key === KEYS.right && p.keyDirections[l],
            keyIsDown = key === KEYS.down && p.keyDirections[l] 
        ;

        // console.log('next keys', keyIsRight, keyIsDown)
       
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

	handleEvents() {
		const 
            s = this,
            p = s.params,
            $lis = s.$element.findBy('tag', 'li'),
            lis = $lis.toArray() as HTMLLIElement[]
        ;
      
		let focusOutDelay: ReturnType<typeof setTimeout> | null = null;
        let prevLi = null;

		// s.$element.on(`focusin.${EVENT_NAME}`, (e: KeyboardEvent, elem: HTMLLIElement) => {
            
		// 	focusOutDelay && clearTimeout(focusOutDelay);
           
        //     if (prevLi) rmClass(prevLi, p.focusCss);
        //     addClass(elem, p.focusCss);
        //     prevLi = elem;
        //     console.log('prev li', prevLi)
            
		// }, lis)
        // .on(`focusout.${EVENT_NAME}`, () => {
        //     focusOutDelay = setTimeout(() => $lis.rmClass(p.focusCss), 200)
        // })
        // .on(`mouseleave.${EVENT_NAME}`, () => {
        //     $lis.rmClass(p.focusCss);
		// })
        s.$element.on(`keydown.${EVENT_NAME}`, (e: KeyboardEvent) => {
			 
			s.activeElem = document.activeElement as HTMLElement;
            s.$aeLiParents = $be(s.activeElem).parents('li', s.element);

			if (e.key == KEYS.esc) {
                s.#focusFirstElem(s.$aeLiParents);
            }

			s.prev(e);
			s.next(e);
		});
	}

    #focusFirstElem($focusWrapEl: BaseElem, index: number = 0) {
        if (!$focusWrapEl.hasEls) return;

        const 
            s = this,
            p = s.params,
            $focusEls = $focusWrapEl.find(p.focusInElems, isVisible)
        ;

        if ($focusEls.hasEls) {
            const focusEl = $focusEls.elem[index] as HTMLElement;
            // s.$aeLiParents.rmClass(p.focusCss);
            $be(focusEl.closest('li')).addClass(p.focusCss);
            focusEl.focus();
        }
    }
	
	#focusListItem(prev: boolean): void {
		const 
            s = this,
            p = s.params,
            currLi = (s.activeElem as HTMLElement).closest('li'),
            $targetLi = $be((prev ? currLi.previousElementSibling : currLi.nextElementSibling) as HTMLLIElement)
        ;

        if ($targetLi.hasEls) {
            s.#focusFirstElem($targetLi);
            
		} else {
            const $prevUlEl = $be(currLi.closest('li'));
            s.#focusFirstElem($prevUlEl);
        }
	}
}

declare module 'base-elem-js' {
	export interface BaseElem {
		accessibleMenu(options?: IAccessibleMenuOptions | StringPluginArgChoices): BaseElem;
	}
}