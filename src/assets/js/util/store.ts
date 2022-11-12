import $ from 'cash-dom';
import getType, { camelCase } from "./helpers";

type StoreElem = ArrayLike<HTMLElement> | HTMLElement;
interface IStoreData {
	keyStore: string;
	id: number;
	data: any;
}

declare global {
	interface Window {
	  	jQuery: any; // 👈️ turn off type checking
	}
}

const mapData = (() => {

	const storeData: WeakMap<object, any> = new WeakMap();
	let id = 1;

	return {
		expose(what: boolean | 'ret'): void | WeakMap<object, any> {
			if (!what) console.log(storeData);
			if (what === 'ret') {
				return storeData;
			}
		},
		set(_element: StoreElem, keyStore:string, data: any) {

			const element: HTMLElement = _element[0] || _element;

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

				const elemPropArr: IStoreData[] = storeData.get(element);

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
					elemPropArr.push({ keyStore, id, data });
					id++;
				}
			}
		},

		get(_element: StoreElem, keyStore: string): any {

			const element: HTMLElement = _element[0] || _element;
			const foundData:IStoreData[] = storeData.get(element);

			if (!element || !foundData) {
				return null;
			}

			const store = foundData.find((el) => el.keyStore === keyStore);

			return store ? store.data : null;
		},

		delete(_element: StoreElem, keyStore: string):void {

			const element: HTMLElement = _element[0] || _element;
			const foundData: IStoreData[] = storeData.get(element);

			if (!element || !foundData) {
				return;
			}

			for (let i = 0, l = foundData.length; i < l; i++) {
				let currKey = foundData[i];

				if (currKey.keyStore === keyStore) {

					foundData.splice(i, 1);

					if (foundData.length === 0) {
						storeData.delete(element);
					}
					break;
				}
			}
		}
	}
})()

const Store = {
	set(element: StoreElem, keyStore: string, data: any) {
		mapData.set(element, keyStore, data)
	},
	get(element: StoreElem, keyStore: string) {
		return mapData.get(element, keyStore)
	},
	remove(element: StoreElem, keyStore: string) {
		mapData.delete(element, keyStore)
	}
};

// one state var to check if its installed the Store method
let storeFnInstalled = false;

function installStoreToLibrary(expose = false) {

	storeFnInstalled = true;

	if (expose) {
		$.extend(Store, {
			expose:(what: boolean | "ret"): void | WeakMap<object,any> => mapData.expose(what)
		});
	}

	$.extend({ store: Store });

	$.fn.extend({store: function (dataName, data) {
		return elemData(this, dataName, data);
	}});

	$.fn.extend({removeStore: function (dataName) {
		Store.remove(this, dataName);
	}});
}

function installStoreAsDataToLibrary(expose = false) {

	if ('jQuery' in window) {
		return;
	}

	storeFnInstalled = true;

	if (expose) {
		$.extend(Store, {
			expose:(what: boolean | "ret"): void | WeakMap<object,any> => mapData.expose(what)
		});

		if ('expose' in Store) {
			$.extend({ exposeData: Store['expose'] });
		}
	}

	$.fn.extend({data(dataName, data) {
		let retVal = null;
		this.each(function () {
			retVal = asData(this, dataName, data) || retVal;
		});

		return retVal;
	}});

	$.fn.extend({removeData(dataName) {
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
	}});
}

function asData(el: HTMLElement, dataName: string, data: any): any {

	const storedData = elemData(el, dataName, data);
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
function elemData(el: HTMLElement, dataName: string, data?: any, remove?:boolean) {
	
	const dataArgs = [el, dataName, data].filter(arg => !!arg);

	if (storeFnInstalled) {
		if (remove) {

			Store.remove(el, dataName);
		} else {

			if (dataArgs.length === 2) {
				return Store.get(...dataArgs as [HTMLElement, string]);

			} else {
				Store.set(...dataArgs as [HTMLElement, string, any]);
			}
		}
	} else {
		if ('jQuery' in window) {
			if (remove) {
				window.jQuery(el).removeData(dataName);
			} else {
				return window.jQuery(el).data(...dataArgs.slice(1))
			}
		}
	}

	return null;
}

export default installStoreToLibrary;
export { Store, installStoreAsDataToLibrary, elemData };