// 
// General purposed helpers
// 

import { CSS_TRANSISTION_DELAY } from "./constants";


export default function getType(val) {
	if (typeof val === 'undefined') return 'undefined';
	if (typeof val === 'object' && !val) return 'null';
	return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

export function IE_Event(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
}

// visibilty
export const isVisible = (el, visibility = false) => {
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
 
export const transitionElem = (fn, duration = 0) => {
    if (typeof fn !== 'function') {
        throw new Error(`first parameter must be a function`);
        return;
    }
    setTimeout(fn, CSS_TRANSISTION_DELAY + duration)
}
   
export const noop = () => {};

export const isHidden = (el) => !isVisible(el);

// string manipulation
export const kebabCase = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
export const camelCase = string => string.replace(/-./g, x => x.toUpperCase()[1]);

// device
export const isMobileOS = () => /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
