 
declare export const getHashParam: (name: string) => string | null;
declare const getUrlParam: (name: string, searchStr?: string) => string | null;

export default getUrlParam;