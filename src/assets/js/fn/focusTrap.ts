import $be, { type BaseElem, type SelectorRoot } from 'base-elem-js';
 

interface ITrapFocusProps {
    focusFirst?: boolean,
    nameSpace?: string,
    focusable?: ('button' | 'a' | 'input' | 'select' | 'textarea' | '[tabindex]')[]
};

const defaultProps: ITrapFocusProps = {
    focusFirst: true,
    nameSpace: 'focusTrap',
    focusable: ['button', 'a', 'input', 'select', 'textarea', '[tabindex]']
};

export interface ITrapFocusRemove {
    remove: () => void
};

const canFocusEls = (el:HTMLElement) => {
    
    const baseFocusableRules = $be.isVisible(el) && el.tabIndex !== -1;
    const nodeName = el.nodeName.toUpperCase();
    
    if ((nodeName === 'BUTTON' || nodeName === 'INPUT')) {
        return baseFocusableRules && !(el as HTMLButtonElement).disabled;
    }
    
    return baseFocusableRules && el.style.pointerEvents !== 'none';
}

const focusTrap = (elem: SelectorRoot | BaseElem, props?: ITrapFocusProps): ITrapFocusRemove => {
    const d = document;
    const body = d.body;
    const { focusFirst, focusable, nameSpace } = {...defaultProps, ...props};

    const $trapElem = $be(elem);  
    const focusableJoined = typeof focusable === 'string' ? focusable : focusable.join(',');
    const $firstFocusable = $trapElem.find(focusableJoined).filter(canFocusEls);

    let firstFocusable = $firstFocusable.hasEls ? $firstFocusable.elem[0] as HTMLElement : null;

    if (focusFirst && firstFocusable) {

        firstFocusable.focus();
    }
    
    $be(body).on(`keydown.${nameSpace}`, function (e:KeyboardEvent) {
         
        const $focusable = $trapElem.find(focusableJoined).filter(canFocusEls);
        
        if (!$focusable.hasEls) return;
        const activeEl = d.activeElement;
        const lastFocusable = $focusable.elem[$focusable.size - 1] as HTMLElement;
        const isTabPressed = e.key === 'Tab';

        firstFocusable = $focusable.elem[0] as HTMLElement; 
        
        if (!isTabPressed) {
            return;
        }

        if (activeEl.nodeName.toUpperCase() === 'BODY') {
            // somehow we lost focus
            // this can happen if the last element is disabled if it was focused
            // so re-assign to the first element
            firstFocusable && firstFocusable.focus(); 
            e.preventDefault();
        }

        if (e.shiftKey) { 
            // if shift key pressed for shift + tab combination
            if (activeEl && 
                firstFocusable && 
                d.activeElement === firstFocusable
            ) {
                lastFocusable && lastFocusable.focus(); 
                e.preventDefault();
            }
        } else { 
            // if tab key is pressed
            if (activeEl && 
                lastFocusable && 
                activeEl === lastFocusable
            ) { 
                firstFocusable && firstFocusable.focus(); 
                e.preventDefault();
            }
        }
    });

    return {
        remove: () => {
            $be(body).off(`keydown.${nameSpace}`);
        }
    }
}

export default focusTrap;