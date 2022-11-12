import type { Selector  } from 'cash-dom';

import $ from 'cash-dom';
import elemData from './elemData';

type StoreElem = ArrayLike<HTMLElement> | HTMLElement;
interface IStoreData {
	keyStore: string;
	id: number;
	data: any;
}

export interface IStore {
    set(element: StoreElem, keyStore: string, data: any): void;
    get(element: StoreElem, keyStore: string): any;
    remove(element: StoreElem, keyStore: string): void;
}

export declare function store<T>(dataName: string, data?: T): void | T;
export declare function removeStore<T>(dataName: string): void;
export declare function staticRemoveStore<T>(elem: Selector, dataName: string): void;

declare module 'cash-dom' {

    interface Cash {
        store: typeof store;
        removeStore: typeof removeStore;
    }

    interface CashStatic {
        store: IStore;
        removeStore: typeof staticRemoveStore;
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
export let storeFnInstalled = false;
export const setStoreFnInstalled = () => storeFnInstalled = true;

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




export default installStoreToLibrary;
export { mapData, Store };