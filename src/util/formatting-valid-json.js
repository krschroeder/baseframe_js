export default function validJSONFromString(options){
	if(typeof options == 'string'){
		options = JSON.parse(
			formattingValidJSON(options)
		);
	}
	return options;
}

function formattingValidJSON(str){
	// From https://stackoverflow.com/questions/9637517/parsing-relaxed-json-without-eval
	return str
	.replace(/:\s*"([^"]*)"/g, function(match, p1) {
		return ': "' + p1.replace(/:/g, '@colon@') + '"';
	})
	.replace(/:\s*'([^']*)'/g, function(match, p1) {
		return ': "' + p1.replace(/:/g, '@colon@') + '"';
	})
	.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
	.replace(/@colon@/g, ':')
}
