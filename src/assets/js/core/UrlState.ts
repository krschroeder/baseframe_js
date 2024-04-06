import type { UrlSearchType, StateChangeType } from "../types";
import $ from 'cash-dom';


type UrlPrintPattern = 'repeat' | 'normal';
type UrlPrintOptions = { pattern: UrlPrintPattern; brackets: boolean };
type UrlParamRawValue = string | (number | string)[] | null;

const EVENT_NAME = 'UrlState';

const urlStateMap: Map<UrlSearchType, URLSearchParams> = new Map([
    ['search', new URLSearchParams(location.search.replace('?', ''))],
    ['hash', new URLSearchParams(location.hash.replace('#', ''))]
]);

export const toUrl = (state: StateChangeType = 'replace'): void => {

    let vals = '';

    const hash = urlStateMap.get('hash').toString();
    const search = urlStateMap.get('search').toString();

    (search !== '') ? vals += '?' + search : vals += location.href.split(/(\?|\#)/)[0];
    if (hash !== '') vals += '#' + hash;
    // clean-up
    vals = vals.replace(/(\=\&)+/g, '&').replace(/\=$/, '');

    state === "replace" ? history.replaceState(null, '', vals) : history.pushState(null, '', vals);
}

export const setHashVal = (value: string | null, state?: StateChangeType): void => {

    const params = urlStateMap.get('hash');

    for (const key of params.keys()) {
        params.delete(key);
    }

    if (value !== null) params.set(value, '');

    if (state) {
        toUrl(state);
    }
}

export const set = (
    type: UrlSearchType,
    paramName: string,
    value: UrlParamRawValue,
    state?: StateChangeType
): void => {
    if (type === 'hashVal') {
        console.warn(`use 'setHashVal' method for setting only the hash val`);
        return;
    }
    const params = urlStateMap.get(type);

    if (value === null) {
        params.has(paramName) && params.delete(paramName);
    } else {
        const isArray = Array.isArray(value);
        const adjustedVal = isArray ? `[${value.join(',')}]` : value;

        params.set(paramName, adjustedVal);
    }

    if (state) {
        toUrl(state);
    }
}

export const get = (type: UrlSearchType, paramName: string): UrlParamRawValue => {
    const params = urlStateMap.get(type);

    if (type === 'hashVal') {
        return location.hash.replace('#', '');
    }

    if (params.has(paramName)) {

        const rawVal = params.get(paramName).trim();
        if (rawVal.slice(0, 1) === '[' && rawVal.slice(-1) === ']') {

            const valSplits = rawVal.slice(1, -1).split(',');
            return valSplits.map(el => !(/\D/).test(el) ? +el : el);
        } else {

            return rawVal;
        }
    }
    return null;
}

export const refresh = (on: boolean = true): void => {

    if (on) {
        $(window).off(`popstate.${EVENT_NAME}`).on(`popstate.${EVENT_NAME}`, () => {

            urlStateMap.set('search', new URLSearchParams(location.search.replace('?', '')));
            urlStateMap.set('hash', new URLSearchParams(location.hash.replace('#', '')));

        });
    } else {
        $(window).off(`popstate.${EVENT_NAME}`);
    }
}

// print URL params
export const print = (type: UrlSearchType, options: UrlPrintOptions): string => {

    const
        params = urlStateMap.get(type),
        defaultOptions = { pattern: 'normal', brackets: true },
        { pattern, brackets } = Object.assign(defaultOptions, options),
        bkts = brackets ? '[]' : ''
        ;

    if (pattern === 'repeat') {
        return [...params.keys()].map((key) => {
            const val = get(type, key);

            if (Array.isArray(val)) {

                return val.map(el => `${key}${bkts}=${encodeURIComponent(el)}`).join('&');
            }

            return `${key}=${val}`;
        }).join('&');
    }

    return params.toString();
}

// run refresh initially
refresh();

const UrlState = {
    refresh,
    print,
    toUrl,
    set,
    setHashVal,
    get
};

export default UrlState;