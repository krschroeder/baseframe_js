// 
// General purposed helpers
// 
import $ from 'cash-dom';

import { CSS_TRANSISTION_DELAY } from "./constants";


export default function getType(val: any): string {
    if (typeof val === 'undefined') return 'undefined';
    if (typeof val === 'object' && !val) return 'null';
    return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

// visibilty
export const isVisible = (el: HTMLElement, visibility = false): boolean => {
    const vis = el.offsetParent !== null ||
        !!(el.offsetWidth ||
            el.offsetHeight ||
            el.getClientRects().length);

    if (visibility) {
        return $(el).css('visibility') !== 'hidden' && vis;
    } else {

        return vis;
    }
}

export const transitionElem = (fn: (...any)=> void, duration: number = 0): void => {
    
    if (typeof fn !== 'function') {
        throw new Error(`first parameter must be a function`);
    }

    setTimeout(fn, CSS_TRANSISTION_DELAY + duration)
}

export const noop = () => { };

export const isHidden = (el) => !isVisible(el);

// string manipulation
export const kebabCase = (string: string): string => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
export const camelCase = (string: string): string => string.replace(/-./g, x => x.toUpperCase()[1]);

// device
export const isMobileOS = (): boolean => /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
