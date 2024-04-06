// 
// General purposed helpers
// 
import $ from 'cash-dom';
import parseObjectFromString from './parseObjectFromString';

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

export const getDataOptions = (el: HTMLElement, evtName: string) => parseObjectFromString(el.dataset[evtName + 'Options'])

export const docTop = () => document.documentElement.scrollTop || document.body.scrollTop || 0;

export const noop = () => { };

export const isHidden = (el) => !isVisible(el);

// string manipulation
export const kebabCase = (str: string): string => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
export const camelCase = (str: string): string => str.replace(/-./g, x => x.toUpperCase()[1]);
export const capitalize = (str: string): string => str.charAt(0).toLowerCase() + str.substring(1);
// device
export const isMobileOS = (): boolean => /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
