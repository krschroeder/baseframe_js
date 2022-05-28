import { isVisible } from "./helpers";

const defaultProps = {
    focusFirst: true,
    nameSpace: 'trapFocus',
    focusable: ['button', 'a', 'input', 'select', 'textarea', '[tabindex]']
};

const canFocusEls = (i, el) => isVisible(el, true) && el.tabIndex !== -1;

const trapFocus = (modalEl, props) => {

    const { focusFirst, focusable, nameSpace } = $.extend({}, defaultProps, props);
    const $trapElem = $(modalEl);  
    const focusableJoined = typeof focusable === 'string' ? focusable : focusable.join(',');
    const $firstFocusable = $trapElem.find(focusableJoined).filter(canFocusEls);

    let firstFocusable = $firstFocusable.length ? $firstFocusable[0] : null;

    if (focusFirst && firstFocusable) {

        firstFocusable.focus();
    }
    
    $(document.body).on(`keydown.${nameSpace}`, function (e) {
         
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
            if (document.activeElement.isSameNode(firstFocusable)) {
                lastFocusable.focus(); 
                e.preventDefault();
            }
        } else { 
            // if tab key is pressed
            if (document.activeElement.isSameNode(lastFocusable)) { 
                firstFocusable.focus(); 
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