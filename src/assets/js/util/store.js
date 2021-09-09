

const mapData = (() => {

	const storeData = new WeakMap();
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
	
			if (typeof storeData.get(element) === 'undefined') {

				storeData.set(element,[{
					keyStore,
					id,
					data
				}]);
				id++;

			} else {

				const elemPropArr = storeData.get(element);

				let match = false;

				for (let i = 0, l = elemPropArr.length; i < l; i++){
					let currKey = elemPropArr[i];
					
					if (currKey.keyStore === keyStore){
						$.extend(currKey,{data});
						match = true;
						break;
					}
				}

				if (!match) {
					elemPropArr.push({
						keyStore,
						id,
						data
					});
					id++;
				}
			}
		},
		get(_element, keyStore) {

			const element = _element[0] || _element;
			
			if (!element || typeof storeData.get(element) === 'undefined') {
				return null;
			}
			
			const store = storeData.get(element).filter((el) => el.keyStore === keyStore);

			return store.length ? store[0].data : null;

		},
		delete(_element, keyStore) {

			const element = _element[0] || _element;

			if (!element || typeof storeData.get(element) === 'undefined') {
				return
			}

			const elemPropArr = storeData.get(element);

			for (let i = 0, l = elemPropArr.length; i < l; i++){
				let currKey = elemPropArr[i];
				
				if (currKey.keyStore === keyStore){
					
					elemPropArr.splice(i,1);
					 
					if (elemPropArr.length === 0) {
						storeData.delete(element);
					}
					break;
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