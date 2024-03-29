const qsArrayFormat = /(^\[)((?:(?!\]$)(.|\n|))*)(\]$)/;//begins with '[' and ends with ']';

const qsToObject = (qs: string = location.search.substring(1)): Record<string,any> => {

   if (qs) {
      const jsonStr: string = '{' +
         decodeURI(qs)
            .split('&').map((el) => {
               const kv = el.split('=');
               return `"${kv[0]}":"${(kv[1] ? kv[1] : '')}"`;
            }).join(',')
         + '}';

      try {
         const jsonObj: Record<string,any> = JSON.parse(jsonStr, (key, value) => {

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

      } catch(e){
         // log the error silently
         console.warn('Malformed data when parsing', e);
         return {}
      }

   } else {
      return {};
   }
};

export default qsToObject;