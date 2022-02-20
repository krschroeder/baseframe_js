

export const qsToObject = (str = location.hash.substring(1)) => {
   
   const params = {};
   const vars = str.split('&');

   for (let i = 0, l = vars.length; i < l; i++) {
     
      const pair = vars[i].split('=');
      const key  = pair[0];

      if (pair.length === 1) {
         $.extend(params,{[key]: '' });
      }
      else if (pair.length === 2) {
      
         let val = decodeURIComponent(pair[1].replace(/\+/g, ' '));

         if (val === 'true') {

            val = true;

         } else if (val === 'false') {

            val = false;

         } else if ((/^[\d]*$/).test(val)) {
            // if we're a number, 
            // shorthand notation (e.g.: 1e3 = 1000) lets just keep a string, 
            // so when it goes back into the URL its not changed

            val = parseFloat(val);
         }

         $.extend(params,{[key]: val });

      } else if (pair.length > 2) {
         // multiple assignment = operators... which is a thing for the plugins
         const valMulti = pair.slice(1).map((val) => 
               decodeURIComponent(val.replace(/\+/g, ' '))
            ).join('=');

         $.extend(params,{[key]: valMulti });
      }
   }

   return params;
};

export const objectToQs = (qs) => {
   const strArr = [];

   for (key in qs) {
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
