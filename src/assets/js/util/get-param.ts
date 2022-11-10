import $ from 'cash-dom';

const qsArrayFormat = /(^\[)((?:(?!\]$)(.|\n|))*)(\]$)/;//begins with '[' and ends with ']';

export const qsToObject = (qs: string = location.search.substring(1)): object => {

   if (qs) {
      const jsonStr: string = '{' +
         decodeURI(qs)
            .split('&').map((el) => {
               const kv = el.split('=');
               return `"${kv[0]}":"${(kv[1] ? kv[1] : '')}"`;
            }).join(',')
         + '}';

      const jsonObj: object = JSON.parse(jsonStr, (key, value) => {

         if (value === 'true') return true;
         if (value === 'false') return false;
         // set as number, +'' evalutes to 0... we don't want that
         if (value !== "" && typeof +value === 'number' && !isNaN(+value)) return +value;
         // returns an array
         if (qsArrayFormat.test(value) && typeof value === 'string') {
            return value.replace(qsArrayFormat, '$2').split('%2C');
         }
         return value;
      }
      );

      return jsonObj;

   } else {
      return {};
   }
};


export const objectToQs = (paramsObj: object): string => {
   const strArr: string[] = [];
   const obj = {};

   for (let key in paramsObj) {
      if (obj.hasOwnProperty.call(paramsObj, key)) {

         let propVal: string | any[] | number | boolean = paramsObj[key];

         if (propVal) {
            if (propVal instanceof Array) {
               propVal = '[' + propVal + ']';
            }

            strArr.push(`${key}=${encodeURIComponent(propVal + '')}`);
         } else {
            strArr.push(key);
         }
      }
   }

   return strArr.join('&');
}

export const changeHashParam = (
   key: string, 
   val: string, 
   remove: boolean = false, 
   prevKeyOrVal?: string
): string => {

   const hashObj = qsToObject(location.hash.substring(1));

   // if (!key && val !== prevVal) {
   if (prevKeyOrVal && val !== prevKeyOrVal) {
      // if we have a previous value and 
      // it doesn't match the current delete it.
      // Also, the key may be a value, hence the name
      delete hashObj[prevKeyOrVal];
   }

   if (remove) {

      if (key && ({}).hasOwnProperty.call(hashObj, key)) {
         delete hashObj[key];
      }

      // if (!key && val) {
      if (val && ({}).hasOwnProperty.call(hashObj, key)) {
         // if we only have a value
         // then remove that as a key
         delete hashObj[val];
      }

   } else {
      if (key) {

         $.extend(hashObj, { [key]: val });
      } else {
         // if we don't have a key
         // assign the value to the key,
         // and then it's value is blank
         $.extend(hashObj, { [val]: '' })
      }
   }

   return objectToQs(hashObj);
}

const _getParam = (name: string,
   searchStr:string = window.location.search,
   start:string = '?&',
   end:string = '([^&#]*)|&|#|$'
): string | null => {

   name = name.replace(/[\[\]]/g, '\\$&');

   const regex = new RegExp(`[${start}]${name}(=${end})`);
   const results = regex.exec(searchStr);

   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2]);
}

const getUrlParam = (name: string, searchStr = window.location.search): string | null => {
   return _getParam(name, searchStr);
}

export const getHashParam = (name: string): string | null => {
   return _getParam(name, location.hash, '#&', '([^&;]*)|&|#|$');
}

export default getUrlParam;
