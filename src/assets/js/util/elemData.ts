import { Store } from "./store";
import { storeFnInstalled } from "./store";

declare global {
	interface Window {
	  	jQuery: any; // 👈️ turn off type checking
	}
}

// retrieves data via the jQuery method or with the Store methods
export default function elemData(el: HTMLElement, dataName: string, data?: any, remove?:boolean) {
	
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