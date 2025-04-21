import type { StringPluginArgChoices } from '../types';
import $be from 'base-elem-js';
import parseObjectFromString from './parseObjectFromString';

const { merge, toType } = $be.static;

// region DOM shortcuts
const 
    d       = document,
    body    = d.body,
    root    = d.documentElement,
    oa      = Object.assign,
    af      = Array.from,
    isArr   = Array.isArray,
    isStr = (str: any) => typeof str === 'string',
    reflow = (elem: HTMLElement) => elem.offsetHeight,
    docTop = () => document.documentElement.scrollTop || document.body.scrollTop || 0,
    noop = () => {}
;

export {
    d, 
    body,
    root,
    oa, 
    af, 
    isArr, 
    isStr,
    reflow,
    docTop,
    noop
}

export default function getType(val: any): string {
    if (typeof val === 'undefined') return 'undefined';
    if (typeof val === 'object' && !val) return 'null';
    return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

// region plugin helpers
export const setParams = <T>(
    defaults: T, 
    options: Partial<T> | StringPluginArgChoices, 
    dataOptions: Partial<T>
): T => {
    const useOptions = toType(options) === 'object' ? options: {};
    return merge([true], {}, defaults, useOptions, dataOptions) as T;
}

export const getDataOptions = (el: HTMLElement, evtName: string) => parseObjectFromString(el.dataset[evtName + 'Options']);

 

// region string manipulation
export const kebabCase = (str: string): string => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
export const camelCase = (str: string): string => str.replace(/-./g, x => x.toUpperCase()[1]);
export const lowercaseFirstLetter = (str: string): string => str.charAt(0).toLowerCase() + str.substring(1);

// region device
export const isMobileOS = (): boolean => /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
