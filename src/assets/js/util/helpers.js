// 
// General purposed helpers
// 


export default function getType(val) {
	if (typeof val === 'undefined') return 'undefined';
	if (typeof val === 'object' && !val) return 'null';
	return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

// visibilty
export const isHidden = (el) => el.offsetParent === null;
export const isVisible = (el) => el.offsetParent !== null;


// photo
export const photoRegex = /\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$|(\?|&|&amp;)(image|ext\=\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg))?$/i;

export const CSS_TRANSISTION_DELAY = 100; 