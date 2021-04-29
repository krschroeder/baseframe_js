import $ from 'cash-dom';

import {isVisible} from './helpers';
 
const $visible = function ($el) {

	return $el.filter(function() {
		if (isVisible(this)) {
			return true;
		}
	});
}


export const installVisible = () => {
	$.fn.visible = function() {
		return $visible(this);
	};
}

export default $visible;