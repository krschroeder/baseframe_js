/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

//Modified to create multiple entries in case there is more than one plugin acting/using the element as a key
//also uses a Map

const mapData = (() => {

	const storeData = new Map();
	let id = 1;

	return {
		expose(){
			console.log(storeData);	 
		},
		set(_element, keyStore, data) {
			
			const  element = _element[0] || _element;

			if(!element) {
				throw new Error(`The element doesn't exist in the DOM`);
			}
	
			if (typeof element.keyStore === 'undefined') {

				element.keyStore = [{
					keyStore,
					id
				}]

				storeData.set(id, data);
				id++;

			} else {

				const keyProperties = element.keyStore;
				let match = false;

				for (let i = 0, l = keyProperties.length; i < l; i++){
					let currKey = keyProperties[i];
					
					if (currKey.keyStore === keyStore){
						
						storeData.set(currKey.id, data);
						match = true;
						break;
					}
				}

				if (!match) {
					element.keyStore.push({
						keyStore,
						id
					});
					storeData.set(id, data);
					id++;
				}
			}
		},
		get(_element, keyStore) {

			const  element = _element[0] || _element;

			if (!element || typeof element.keyStore === 'undefined') {
				return null;
			}

			const keyProperties = element.keyStore;

			for (let i = 0, l = keyProperties.length; i < l; i++){
				let currKey = keyProperties[i];
				
				if (currKey.keyStore === keyStore){
					return storeData.get(currKey.id);
				}
			}
			
			new Error('Object exists, but didnt return a storeData');
			
			return null;
		},
		delete(element, keyStore) {
			if (typeof element.keyStore === 'undefined') {
				return
			}

			const keyProperties = element.keyStore;

			if (keyProperties.keyStore === keyStore) {
				storeData.delete(keyProperties.id);
				delete element.keyStore
			}
		}
	}
})()

const Data = {
	set(element, keyStore, data) {
		mapData.set(element, keyStore, data)
	},
	get(element, keyStore) {
		return mapData.get(element, keyStore)
	},
	remove(element, keyStore) {
		mapData.delete(element, keyStore)
	},
	expose(){
		mapData.expose()
	}
};

function installStoreToLibrary(){
	$.extend({
		store : Data
	});
}

export default Data;

export {installStoreToLibrary};