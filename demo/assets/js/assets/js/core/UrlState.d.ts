import type { UrlSearchType, StateChangeType } from "../types";
type UrlPrintPattern = 'repeat' | 'normal';
type UrlPrintOptions = {
    pattern: UrlPrintPattern;
    brackets: boolean;
};
type UrlParamRawValue = string | (number | string)[] | null;
export declare const toUrl: (state?: StateChangeType) => void;
export declare const setHashVal: (value: string | null, state?: StateChangeType) => void;
export declare const set: (type: UrlSearchType, paramName: string, value: UrlParamRawValue, state?: StateChangeType) => void;
export declare const get: (type: UrlSearchType, paramName: string) => UrlParamRawValue;
export declare const refresh: (on?: boolean) => void;
export declare const print: (type: UrlSearchType, options: UrlPrintOptions) => string;
declare const UrlState: {
    refresh: (on?: boolean) => void;
    print: (type: UrlSearchType, options: UrlPrintOptions) => string;
    toUrl: (state?: StateChangeType) => void;
    set: (type: UrlSearchType, paramName: string, value: UrlParamRawValue, state?: StateChangeType) => void;
    setHashVal: (value: string | null, state?: StateChangeType) => void;
    get: (type: UrlSearchType, paramName: string) => UrlParamRawValue;
};
export default UrlState;
