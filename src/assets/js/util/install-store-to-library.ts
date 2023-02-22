import $ from 'cash-dom';
import Store, { mapData, setStoreFnInstalled } from './store';
import elemData from './elem-data';

import type { IStore } from './store';

export declare function store<T>(dataName: string, data?: T): void | T;
export declare function removeStore<T>(dataName: string): void;

declare module 'cash-dom' {

    interface Cash {
        store: typeof store;
        removeStore: typeof removeStore;
    }

    interface CashStatic {
        store: IStore;
    }
}

function installStoreToLibrary(expose = false) {

	setStoreFnInstalled();

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