import type { QsPattern } from './object-to-qs';

import getType from './helpers';
import qsToObject from './qs-to-object';
import objectToQs from './object-to-qs';
import updateObjectProps from './update-object-props';

type SearchSrc = 'hash' | 'location';

const updateSearchParams = (
   searchSrc: SearchSrc = 'hash',
   key: string,
   val?: string,
   removeIfNullVal: boolean = true,
   removeOtherKeys: string | string[] | false = false,
   pattern: QsPattern = 'normal'
): string => {

   const hashObj = qsToObject(location['searchSrc'].substring(1));

   // remove if other params are set and are string
   if (removeOtherKeys && getType(removeOtherKeys) === 'string') {
      updateObjectProps(hashObj, removeOtherKeys as string, null, true);

   }
   // remove if other params are set and string array
   if (removeOtherKeys && getType(removeOtherKeys) === 'array') {
      (removeOtherKeys as string[]).forEach((removeKey) => {

         updateObjectProps(hashObj, removeKey, null, true)

      });
   }
   // main operation
   updateObjectProps(hashObj, key, val, removeIfNullVal)

   return objectToQs(hashObj, pattern);
}

export default updateSearchParams;