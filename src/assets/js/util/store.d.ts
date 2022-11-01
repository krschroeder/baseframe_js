import type { Selector } from "cash-dom";

declare function installStoreToLibrary(expose: boolean): void;

export declare function store<T>(dataName: string, data?: T): void | T;
export declare function removeStore<T>(dataName: string): void;
export declare function staticRemoveStore<T>(elem: Selector, dataName: string): void;

export interface IStore {
    set(element: Selector, keyStore: string, data: any): void;
    get(element: Selector, keyStore: string): any;
    remove(element: Selector, keyStore: string): void;
}

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

export default installStoreToLibrary;