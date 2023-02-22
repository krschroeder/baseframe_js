import $ from 'cash-dom';
import elemData from './elem-data';
import getType, { camelCase } from "./helpers";
import Store, { mapData, setStoreFnInstalled } from './store';

export declare function store<T>(dataName: string, data?: T): void | T;
export declare function removeStore<T>(dataName: string): void;

function installStoreAsDataToLibrary(expose = false) {

	if ('jQuery' in window) {
		return;
	}

	setStoreFnInstalled();

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

// helper
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

declare module 'cash-dom' {

    interface Cash {
        //data already exists
        removeData: typeof removeStore;
    }

	// no static props ... yet :-( 
}

export default installStoreAsDataToLibrary;