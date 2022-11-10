import type { Selector, Cash } from 'cash-dom';

import $ from 'cash-dom';
import { isVisible } from "./helpers";


interface ITrapFocusProps {
    focusFirst?: boolean,
    nameSpace?: string,
    focusable?: ('button' | 'a' | 'input' | 'select' | 'textarea' | '[tabindex]')[]
};

const defaultProps: ITrapFocusProps = {
    focusFirst: true,
    nameSpace: 'trapFocus',
    focusable: ['button', 'a', 'input', 'select', 'textarea', '[tabindex]']
};

export interface ITrapFocusRemove {
    remove(): void
};

const canFocusEls = (i, el) => isVisible(el, true) && el.tabIndex !== -1;

const trapFocus = (modalEl: Selector, props?: ITrapFocusProps): ITrapFocusRemove => {

    const { focusFirst, focusable, nameSpace } = $.extend({}, defaultProps, props);
    const $trapElem = $(modalEl);  
    const focusableJoined = typeof focusable === 'string' ? focusable : focusable.join(',');
    const $firstFocusable = $trapElem.find(focusableJoined).filter(canFocusEls);

    let firstFocusable = $firstFocusable.length ? $firstFocusable[0] : null;

    if (focusFirst && firstFocusable) {

        firstFocusable.focus();
    }
    
    $(document.body).on(`keydown.${nameSpace}`, function (e:KeyboardEvent) {
         
        const $focusable = $trapElem.find(focusableJoined).filter(canFocusEls);
      
        if (!$focusable.length) return;

        const lastFocusable = $focusable[$focusable.length - 1];
        const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        firstFocusable = $focusable[0]; 
        
        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { 
            // if shift key pressed for shift + tab combination
            if (document.activeElement && 
                firstFocusable && 
                document.activeElement.isSameNode(firstFocusable)
            ) {
                lastFocusable && lastFocusable.focus(); 
                e.preventDefault();
            }
        } else { 
            // if tab key is pressed
            if (document.activeElement && 
                lastFocusable && 
                document.activeElement.isSameNode(lastFocusable)
            ) { 
                firstFocusable && firstFocusable.focus(); 
                e.preventDefault();
            }
        }
    });

    return {
        remove: () => {
            $(document.body).off(`keydown.${nameSpace}`);
        }
    }
}

export default trapFocus;