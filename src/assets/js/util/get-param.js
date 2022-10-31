
const qsArrayFormat = /(^\[)((?:(?!\]$)(.|\n|))*)(\]$)/;//begins with '[' and ends with ']';

export const qsToObject = (qs = location.search.substring(1)) => {

   if (qs) {
      const jsonStr = '{'+ 
         decodeURI(qs)
            .split('&').map((el) => {
               const kv = el.split('=');
               return `"${kv[0]}":"${(kv[1] ? kv[1] : '')}"`;
            }).join(',')
         +'}';

      const jsonObj = JSON.parse(jsonStr, (key, value) => {
            
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


export const objectToQs = (qs) => {
   const strArr = [];

   for (let key in qs) {
      if (({}).hasOwnProperty.call(qs,key)){
         
         let qsKey = qs[key];

         if (qsKey) {
            if (qsKey instanceof Array) {
               qsKey = '[' + qsKey + ']';
            }

            strArr.push(`${key}=${encodeURIComponent((qsKey + '')).replace(/%20/g,'+')}`);
         } else {
            strArr.push(key);
         }
      }
   }

   return strArr.join('&');
}

export const changeHashParam = (key, val, remove = false, prevVal) => {
   const hashObj = qsToObject(location.hash.substring(1));
   
   if (!key && val !== prevVal) {
      delete hashObj[prevVal];
   }
   
   if (remove) {

      if (key) {
         delete hashObj[key];
      }

      if (!key && val) {
         // if we only have a value
         // then remove that as a key
         delete hashObj[val];
      }

   } else {
      if (key) {

         $.extend(hashObj,{[key]: val}); 
      } else {
         // if we don't have a key
         // assign the value to the key,
         // and then it's value is blank
         $.extend(hashObj,{[val]: ''})   
      }
   }
   
   return objectToQs(hashObj);
}

const _getParam = (name, 
    searchStr = window.location.search, 
    start = '?&',
    end = '([^&#]*)|&|#|$'
    ) => {
    
    name = name.replace(/[\[\]]/g, '\\$&');

    const regex = new RegExp(`[${start}]${name}(=${end})`);
    const results = regex.exec(searchStr);
 
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2]);
}

const getUrlParam = (name, searchStr = window.location.search)=>{
   return _getParam(name, searchStr);
}

export const getHashParam = (name) => {
   return _getParam(name,location.hash,'#&','([^&;]*)|&|#|$');
}

export default getUrlParam;
