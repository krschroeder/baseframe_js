
const _getParam = (name ,
   searchStr = window.location.search,
   start = '?&',
   end = '([^&#]*)|&|#|$'
)  => {

   name = name.replace(/[\[\]]/g, '\\$&');

   const regex = new RegExp(`[${start}]${name}(=${end})`);
   const results = regex.exec(searchStr);

   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2]);
}

const getUrlParam = (name , searchStr = window.location.search)  => {
   return _getParam(name, searchStr);
}

export const getHashParam = (name: string): string | null => {
   return _getParam(name, location.hash, '#&', '([^&;]*)|&|#|$');
}

export default getUrlParam;
