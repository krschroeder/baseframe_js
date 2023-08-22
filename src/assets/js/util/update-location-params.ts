import type { QsPattern } from './object-to-qs';

interface ISearchParamsConfig {
    removeIfNullVal: boolean;
    removeOtherKeys: string | string[] | false;
    pattern: QsPattern;
}

interface IUpdateLocationReturn {
    update(key: string, val: string): string;
    searchParams: URLSearchParams;
}

// probably an over-optimization
const locationParamsCache = new Map();
const updateConfigDefault: ISearchParamsConfig = {
   removeIfNullVal: true,
   removeOtherKeys: false,
   pattern: 'normal'
}



type RequestKeyPairValue = `${string}=${string}`;
type QueryStringPattern = RequestKeyPairValue | `${RequestKeyPairValue}&${RequestKeyPairValue}`;

 
const rgxStrIsArrayPatt = /^\[.*\]$/;

const updateLocationParams = (
   type: 'search' | 'hash' | QueryStringPattern , 
   options?: ISearchParamsConfig,
): IUpdateLocationReturn => {

   const searchStr = (type === 'hash' ? location.hash.substring(1) : type === 'search' ? location.search : type);
   const hasCache = locationParamsCache.has(type);
   const params: URLSearchParams = hasCache ? locationParamsCache.get(type) : new URLSearchParams(searchStr);
   const config = Object.assign({}, updateConfigDefault, options);
   
   !hasCache && locationParamsCache.set(type, params);

   return {
        update(key: string, val: string) {
            if (params.has(key)) {

                if (val) {
                    if (val === null && config.removeIfNullVal) {
                        params.delete(key)
                    } else {
                        if (rgxStrIsArrayPatt.test(val)) {

                        }
                        params.set(key, val);
                    } 
                } 

                return params.get(key);
            } else {
                params.set(key, val);
            }
        },

        searchParams: params
    }
}

const {update, searchParams} = updateLocationParams('foo=yeah&what=yeah&yeah=bar&yeahh=buddy')
 

export default updateLocationParams;