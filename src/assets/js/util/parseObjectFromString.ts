import type { PlainObject } from "types";

const parseObjectFromString = <T>(options: string): PlainObject<T> => {
	
	let retObj = {};

	if(typeof options === 'string'){
		retObj = JSON.parse(
			options.replace(/:\s*"([^"]*)"/g, function(match, p1) {

				return ': "' + p1.replace(/:/g, '@colon@') + '"';

			}).replace(/:\s*'([^']*)'/g, function(match, p1) {
				
				return ': "' + p1.replace(/:/g, '@colon@') + '"';

			}).replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
			.replace(/@colon@/g, ':')
		);
	}

	return retObj;
}

export default parseObjectFromString;