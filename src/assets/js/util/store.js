import { camelCase } from "./helpers";
 


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


function installStoreToLibrary(expose = false) {
	if (expose) {
		Store.expose = (p) => mapData.expose(p)
	}

	$.extend({ store: Store });

	$.fn.store = function (dName, data) {
		return elData(this, dName, data);
	}

	$.fn.removeStore = function (dName) {
		Store.remove(this, dName);
	}
}

function installStoreAsDataToLibrary(expose = false) {
	if (expose) {
		Store.expose = (p) => mapData.expose(p)
	}

	$.extend({ store: Store });
	$.extend({ data: asData });
	$.extend({ removeData: (el,dName) => {
			if (el.length) {
				el.each(function(){
					Store.remove(this, dName);
				});
			} else {
				Store.remove(el, dName);
			}
		} 
	});

	$.fn.data = function (dName, data) {
	 
		//return asData(this, dName, data);

		if (this.length) {
			this.each(function(){
				
				return asData(this, dName, data);
			});
		} else {
			return  asData(this, dName, data);
		}
	}

	$.fn.removeData = function (dName) {
		Store.remove(this, dName);
	}
}

function asData(el, dName, data) {

	const storedData = elData(el, dName, data);
	if (storedData) {
		// get stored data first
		return storedData;
	}

	const dataSet = el.dataset ? el.dataset[camelCase(dName)] : null;


	if (dataSet && (typeof data === 'undefined' || data === null)) {
		return dataSet;
	}
}

let storeFnInstalled = false;
let storeInstallChecked = false;

function elData(el, dName, data) {
    
    if (!storeInstallChecked) {
        storeFnInstalled = !!$.store; 

        storeInstallChecked = true;
    }

    const dataArgs = [el, dName, data].filter(arg => !!arg);
    let ret = null;
    
    if (storeFnInstalled) {
        ret = dataArgs.length === 2 ? $.store.get(...dataArgs) : $.store.set(...dataArgs);
       
    } else {
        ret = $(el).data(...dataArgs.slice(1));
    }

    return ret;
}

export default installStoreToLibrary;
export { Store, installStoreAsDataToLibrary, elData };