
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
