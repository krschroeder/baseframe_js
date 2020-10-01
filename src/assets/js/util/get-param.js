
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

const getUrlParam = (name)=>{
   return _getParam(name);
}

export const getHashParam = (name) => {
   return _getParam(name,location.hash,'#','([^&;]*)|&|#|$');
}

export default getUrlParam;
