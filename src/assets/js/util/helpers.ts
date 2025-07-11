import type { StringPluginArgChoices } from '../types';
import $be from 'base-elem-js';
import parseObjectFromString from './parseObjectFromString';

const { merge, toType, isArr, isStr, oa, af } = $be;

// region DOM shortcuts
const 
    d       = document,
    body    = d.body,
    root    = d.documentElement,
    isFunc = (fn: unknown) => toType(fn) === 'function',
    reflow = (elem: HTMLElement) => elem.offsetHeight,
    docTop = () => document.documentElement.scrollTop || document.body.scrollTop || 0,
    noop = () => {}
;


// region plugin helpers
const setParams = <T>(
    defaults: T, 
    options: Partial<T> | StringPluginArgChoices, 
    dataOptions: Partial<T>
): T => {
    const useOptions = toType(options) === 'object' ? options: {};
    return merge([true], {}, defaults, useOptions, dataOptions) as T;
}

const getDataOptions = (el: HTMLElement, evtName: string) => parseObjectFromString(el.dataset[evtName + 'Options']);

 

// region string manipulation
const kebabCase = (str: string): string => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
const camelCase = (str: string): string => str.replace(/-./g, x => x.toUpperCase()[1]);
const lowercaseFirstLetter = (str: string): string => str.charAt(0).toLowerCase() + str.substring(1);

// region device
const isMobileOS = (): boolean => /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);



export {
    d, 
    body,
    root,
    oa, 
    af, 
    isArr, 
    isFunc,
    isStr,
    reflow,
    docTop,
    noop,
    setParams,
    getDataOptions,
    kebabCase,
    camelCase,
    lowercaseFirstLetter,
    isMobileOS
}

export default {};