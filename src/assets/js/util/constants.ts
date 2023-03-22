
export interface IUsedKeys {
	esc: 'Escape';
	left: 'ArrowLeft';
	right: 'ArrowRight';
	down: 'ArrowDown';
	up: 'ArrowUp';
	enter: 'Enter';
	shift: 'Shift';
	space: 'Space';  
	tab: 'Tab';
}

export const KEYS: IUsedKeys = {
	esc: 'Escape',
	left: 'ArrowLeft',
	right: 'ArrowRight',
	down: 'ArrowDown',
	up: 'ArrowUp',
	enter: 'Enter',
	shift: 'Shift',
	space: 'Space',
	tab: 'Tab'
}

export const PHOTO_RGX = /\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$|(\?|&|&amp;)(image|ext\=\.(gif|png|jp(g|eg)|bmp|ico|webp|jxr|svg))?$/i;

export const CSS_TRANSISTION_DELAY = 100;
