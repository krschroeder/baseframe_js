import getType, { camelCase } from "./helpers";



const mapData = (() => {

	const storeData = new WeakMap();
	let id = 1;

	return {
		expose(what) {
			if (!what) console.log(storeData);
			if (what === 'ret') {
				return storeData;
			}
		},
		set(_element, keyStore, data) {

			const element = _element[0] || _element;

			if (!element) {
				throw new Error(`The element doesn't exist in the DOM`);
			}

			if (typeof storeData.get(element) === 'undefined') {

				storeData.set(element, [{
					keyStore,
					id,
					data
				}]);
				id++;

			} else {

				const elemPropArr = storeData.get(element);

				let match = false;

				for (let i = 0, l = elemPropArr.length; i < l; i++) {
					let currKey = elemPropArr[i];

					if (currKey.keyStore === keyStore) {
						$.extend(currKey, { data });
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

			for (let i = 0, l = elemPropArr.length; i < l; i++) {
				let currKey = elemPropArr[i];

				if (currKey.keyStore === keyStore) {

					elemPropArr.splice(i, 1);

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

// one state var to check if its installed the Store method
let storeFnInstalled = false;

function installStoreToLibrary(expose = false) {

	storeFnInstalled = true;

	if (expose) {
		Store.expose = (p) => mapData.expose(p)
	}

	$.extend({ store: Store });

	$.fn.store = function (dataName, data) {
		return elData(this, dataName, data);
	}

	$.fn.removeStore = function (dataName) {
		Store.remove(this, dataName);
	}
}

function installStoreAsDataToLibrary(expose = false) {

	if (window.jQuery) {
		return;
	}
	storeFnInstalled = true;

	if (expose) {
		Store.expose = (p) => mapData.expose(p)
		$.extend({ exposeData: Store.expose });
	}

	$.fn.data = function (dataName, data) {
		let retVal = null;
		this.each(function () {
			retVal = asData(this, dataName, data) || retVal;
		});

		return retVal;
	}

	$.fn.removeData = function (dataName) {
		//jquery params can be a string or an array
		this.each(function() {
			if (getType(dataName) === 'string') {
				Store.remove(this, dataName);  
			}

			if (getType(dataName) === 'array') {
				dataName.forEach(d => {
					Store.remove(d, dataName);
				});
			}
		});
	}
}

function asData(el, dataName, data) {

	const storedData = elData(el, dataName, data);
	if (storedData) {
		// get stored data first
		return storedData;
	}

	const dataSet = el.dataset ? el.dataset[camelCase(dataName)] : null;

	if (dataSet) {
		return dataSet;
	}
}

// retrieves data via the jQuery method or with the Store methods
function elData(el, dataName, data) {

	const dataArgs = [el, dataName, data].filter(arg => !!arg);
	let ret = null;

	if (storeFnInstalled) {
		ret = dataArgs.length === 2 ? Store.get(...dataArgs) : Store.set(...dataArgs);

	} else {
		ret = $(el).data(...dataArgs.slice(1));
	}

	return ret;
}

export default installStoreToLibrary;
export { Store, installStoreAsDataToLibrary, elData };