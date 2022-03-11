import { isVisible } from "./helpers";

const defaultProps = {
    focusFirst: true,
    nameSpace: 'trapFocus',
    focusableElements: ['button', 'a', 'input', 'select', 'textarea', '[tabindex]']
};

const trapFocus = (modalEl, props) => {

    const { focusFirst, focusableElements, nameSpace } = $.extend(defaultProps, props);
    const $modal = $(modalEl);  
     
    let firstFocusableElement = null;

    $(document).on(`keydown.${nameSpace}`, function (e) {

        const focusableElementsJoined = typeof focusableElements === 'string' ? focusableElements : focusableElements.join(',');

        const $focusableContent = $modal.find(focusableElementsJoined)
            .filter((i, el) => isVisible(el) && el.tabIndex !== -1);
 
        if (!$focusableContent.length) return;

        firstFocusableElement = $focusableContent[0]; 
        const lastFocusableElement = $focusableContent[$focusableContent.length - 1];
        const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { 
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); 
                e.preventDefault();
            }
        } else { 
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) { 
                firstFocusableElement.focus(); 
                e.preventDefault();
            }
        }
    });

    if (focusFirst && firstFocusableElement) {
        firstFocusableElement.focus();
    }

    return {
        remove: () => {
            $(document).off(`keydown.${nameSpace}`);
        }
    }
}

export default trapFocus;