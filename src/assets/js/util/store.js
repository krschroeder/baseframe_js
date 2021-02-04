

const mapData = (() => {

	const storeData = new Map();
	let id = 1;

	return {
		expose(what){
			if (!what) console.log(storeData);
			if (what === 'ret') {
				return storeData;
			}
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

			const element = _element[0] || _element;

			if (!element || typeof element.keyStore === 'undefined') {
				return null;
			}

			const store = element.keyStore.filter((el) => el.keyStore === keyStore);

			return store.length ? storeData.get(store[0].id) : null;

		},
		delete(_element, keyStore) {

			const element = _element[0] || _element;

			if (typeof element.keyStore === 'undefined') {
				return
			}

			const keyProperties = element.keyStore;

			if (keyProperties.keyStore === keyStore) {
				storeData.delete(keyProperties.id);
				delete element.keyStore;

				return;
			}

			for (let i = 0, l = keyProperties.length; i < l; i++){
				let currKey = keyProperties[i];
				
				if (currKey.keyStore === keyStore){
					 
					storeData.delete(currKey.id);
					keyProperties.splice(i,1);
					 
				}
			}
		}
	}
})()

const Store = {
	set(element, keyStore, data) {
		mapData.set(element, keyStore, data)
	},
	get(element, keyStore) {
		return mapData.get(element, keyStore)
	},
	remove(element, keyStore) {
		mapData.delete(element, keyStore)
	}
};

function installStoreToLibrary(expose = false){
	if (expose) {
		Store.expose = (p) => mapData.expose(p)
	}

	$.extend({
		store : Store
	});
}


export default installStoreToLibrary;
export { Store };