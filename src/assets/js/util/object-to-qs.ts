export type QsPattern = 'normal' | 'repeat';

const objectToQs = (paramsObj: object, pattern: QsPattern = 'normal'): string => {
   const strArr: string[] = [];
   const obj = {};

   for (let key in paramsObj) {
      if (obj.hasOwnProperty.call(paramsObj, key)) {

         if (pattern === 'repeat') {
            let propVal: string | any[] | number | boolean = paramsObj[key];

            if (propVal) {
               if (propVal instanceof Array) {
                  propVal = '[' + propVal + ']';
               }

               strArr.push(`${key}=${encodeURIComponent(propVal + '')}`);
            } else {
               strArr.push(key);
            }
         } else if (pattern === 'normal') {
            const keyVal = paramsObj[key];

            if (keyVal instanceof Array) {
               strArr.push(keyVal.map(val => `${key}[]=${encodeURIComponent((val + ''))}`).join('&'));
            } else {
               // string
               strArr.push(`${(key + '')}=${encodeURIComponent(keyVal)}`);
            }
         } else {
            throw Error(`Specify either 'normal' or 'repeat' for a pattern`);
         }
      }
   }
   return strArr.map(entry => entry.replace(/\=$/, '')).join('&');
}

export default objectToQs;