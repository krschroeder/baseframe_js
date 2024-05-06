
// type Selector = string;
type SelectorRoot = Document | HTMLElement;
type HTMLCollections = HTMLCollectionOf<HTMLElement> | NodeListOf<HTMLElement>;

interface SelectorObj {
    elems: HTMLElement | HTMLElement[];
    fn: typeof SelectorEngine;
}

const isClassRgx = /^\.[a-z0-9\_-]+$/;
const isIdRgx = /^\#[a-z0-9\_-]+$/;
const isTagRgx = /^\w+$/;


const retSelectorObj = (elems:HTMLElement | HTMLCollections, one: boolean): SelectorObj => {

    if (one) {
        return {
            elems: elems instanceof HTMLElement ? elems : elems.item(0),
            fn: SelectorEngine
        }
    }

    return {
        elems: elems instanceof HTMLElement ? elems : Array.from(elems),
        fn: SelectorEngine
    }
}

const SelectorEngine = (selector: string, root: SelectorRoot = document, one: boolean = false) => {
    
    if (typeof selector === 'string') {
        
        const rootIsDoc = root instanceof Document;
        
        if (isClassRgx.test(selector)) {
             
            const elems = root.getElementsByClassName(selector.substring(1)) as HTMLCollectionOf<HTMLElement>;
            return retSelectorObj(elems, one)
        }

        if (isIdRgx.test(selector) && rootIsDoc) {
            const elems = root.getElementById(selector.substring(1));
            return retSelectorObj(elems, one);
        }

        if (isTagRgx.test(selector)) {
            const elems = root.getElementsByTagName(selector) as HTMLCollectionOf<HTMLElement>;
            retSelectorObj(elems, one);
        }
        
        const elems = one ? 
            root.querySelector(selector) as HTMLElement : 
            root.querySelectorAll(selector) as NodeListOf<HTMLElement>
        ;

        retSelectorObj(elems, one);
    }

    return selector;
}

 


 

 

export default SelectorEngine;