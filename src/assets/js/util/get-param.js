import $visible from "./visible";

export const qsToObject = (qs = location.search.substring(1)) => {

   if (qs && qs.indexOf('=') !== -1) {
      const jsonStr = '{'+ 
         decodeURI(qs)
            .split('&').map((el) => {
               const kv = el.split('=');
               return `"${kv[0]}":"${(kv[1] ? kv[1] : '')}"`;
            }).join(',')
         +'}';

      return JSON.parse(jsonStr, (key, value) => {
            if (value === 'true') return true;
            if (value === 'false') return false;
            if (value !== "" && typeof +value === 'number' && !isNaN(+value)) return +value;
            return value;
         }
      );
   } else {
      return {};
   }
};


export const objectToQs = (qs) => {
   const strArr = [];

   for (let key in qs) {
      if (({}).hasOwnProperty.call(qs,key)){

         if (qs[key]) {

            strArr.push(`${key}=${encodeURIComponent((qs[key] + '')).replace(/%20/g,'+')}`);
         } else {
            strArr.push(key);
         }
      }
   }

   return strArr.join('&');
}

export const changeHashParam = (key, val) => {
   const hashObj = qsToObject(location.hash.substring(1));
   
   return objectToQs($.extend(hashObj,{[key]: val}));
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
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const getUrlParam = (name, searchStr = window.location.search)=>{
   return _getParam(name, searchStr);
}

export const getHashParam = (name) => {
   return _getParam(name,location.hash,'#&','([^&;]*)|&|#|$');
}

export default getUrlParam;
