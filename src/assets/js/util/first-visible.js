import {isVisible} from './helpers';

const $firstVisible = ($el) => {
	let $retEl = $();
	for (let i in $el) {
		if (i !=="length" && {}.hasOwnProperty.call($el,i)) {
			 
			if (isVisible($el[i])) {
                console.log('vis',$el[i])
				$retEl = $($el[i]);
				break;
			}
		}
	}
	return $retEl;
}

export default $firstVisible;