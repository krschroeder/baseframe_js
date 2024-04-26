
// type Selector = string;
type SelectorRoot = Document | HTMLElement;

const isClassRgx = /^\.[a-z0-9\_-]+$/;
const isIdRgx = /^\#[a-z0-9\_-]+$/;
const isTagRgx = /^\w+$/;

const SelectorEngine = (selector: string, root: SelectorRoot = document, one: boolean = false) => {
    
    if (typeof selector === 'string') {
        
        const rootIsDoc = root instanceof Document;
        
        if (isClassRgx.test(selector)) {
             
            const elems = root.getElementsByClassName(selector.substring(1));
            return one ? elems.length ? elems[0] : null : Array.from(elems);
        }

        if (isIdRgx.test(selector) && rootIsDoc) {
            return root.getElementById(selector.substring(1));
        }

        if (isTagRgx.test(selector)) {
            const elems = root.getElementsByTagName(selector);
            return one ? elems.length ? elems[0] : null : Array.from(elems);
        }
        
        return one ? 
            root.querySelector(selector) : 
            Array.from(root.querySelectorAll(selector))
        ;
    }

    return selector;
}

 


 

 

export default SelectorEngine;