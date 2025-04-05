// import $ from 'cash-dom';
import $be, { type BaseElem, type SelectorRoot } from 'base-elem-js';
 

const { isVisible } = $be.static;


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
    remove: () => void
};

const canFocusEls = (el:HTMLElement) => {
    
    const baseFocusableRules = isVisible(el) && el.tabIndex !== -1;
    const nodeName = el.nodeName.toUpperCase();
    
    if ((nodeName === 'BUTTON' || nodeName === 'INPUT')) {
        return baseFocusableRules && !(el as HTMLButtonElement).disabled;
    }
    
    return baseFocusableRules && el.style.pointerEvents !== 'none';
}

const trapFocus = (modalEl: SelectorRoot | BaseElem, props?: ITrapFocusProps): ITrapFocusRemove => {

    const { focusFirst, focusable, nameSpace } = Object.assign({}, defaultProps, props);
    const $trapElem = $be(modalEl);  
    const focusableJoined = typeof focusable === 'string' ? focusable : focusable.join(',');
    const $firstFocusable = $trapElem.find(focusableJoined).filter(canFocusEls);

    let firstFocusable = $firstFocusable.elem.length ? $firstFocusable[0] : null;

    if (focusFirst && firstFocusable) {

        firstFocusable.focus();
    }
    
    $be(document.body).on(`keydown.${nameSpace}`, function (e:KeyboardEvent) {
         
        const $focusable = $trapElem.find(focusableJoined).filter(canFocusEls);
        
        if (!$focusable.elem.length) return;
        const activeEl = document.activeElement;
        const lastFocusable = $focusable.elem[$focusable.elem.length - 1] as HTMLElement;
        const isTabPressed = e.key === 'Tab';

        firstFocusable = $focusable[0]; 
        
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
                document.activeElement.isSameNode(firstFocusable)
            ) {
                lastFocusable && lastFocusable.focus(); 
                e.preventDefault();
            }
        } else { 
            // if tab key is pressed
            if (activeEl && 
                lastFocusable && 
                activeEl.isSameNode(lastFocusable)
            ) { 
                firstFocusable && firstFocusable.focus(); 
                e.preventDefault();
            }
        }
    });

    return {
        remove: () => {
            $be(document.body).off(`keydown.${nameSpace}`);
        }
    }
}

export default trapFocus;