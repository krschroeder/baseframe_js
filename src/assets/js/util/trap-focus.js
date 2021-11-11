import { isVisible } from "./helpers";

const defaultProps = {
    focusFirst: true,
    nameSpace:  'trapFocus',
    focusableElements: ['button', 'a', 'input', 'select', 'textarea', '[tabindex]']
};

const trapFocus = (modalEl, props) => {

    const {focusFirst, focusableElements,  nameSpace } = $.extend(defaultProps, props);
    const focusableElementsJoined = typeof focusableElements === 'string' ? focusableElements : focusableElements.join(',');
    const $modal = $(modalEl); // select the modal by it's id
  
    const $focusableContent = $modal.find(focusableElementsJoined).filter((i,el) => isVisible(el) && el.tabIndex !== -1);
    const firstFocusableElement = $focusableContent[0]; // get first element to be focused inside modal
    const lastFocusableElement = $focusableContent[$focusableContent.length - 1]; // get last element to be focused inside modal


    $(document).on(`keydown.${nameSpace}`, function(e) {
        const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
            }
        } else { // if tab key is pressed
            if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
            }
        }
    });

    focusFirst && firstFocusableElement.focus(); 

    return {
        remove: () => {
            $(document).off(`keydown.${nameSpace}`);
        }
    }
}

export default trapFocus;