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

export const CSS_TRANSISTION_DELAY = 100; 