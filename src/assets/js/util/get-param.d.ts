 
declare export const getHashParam: (name: string) => string | null;
declare export const changeHashParam: (key: string, val: string, remove?: boolean, prevVal?: string) => string;

declare const getUrlParam: (name: string, searchStr?: string) => string | null;

export default getUrlParam;