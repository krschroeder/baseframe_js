
const storeMap: WeakMap<HTMLElement, Record<string, any>> = new WeakMap();

const Store = (storeElem: HTMLElement, key: string, value?: any): any | null => {

    const storeRecord = storeMap.get(storeElem) || storeMap.set(storeElem, {});
    const keyExists = Reflect.has(storeRecord, key);

    if (keyExists) {
        const valueIsNull = value === null;

        if (valueIsNull) {
            delete storeRecord[key];
            return null;
        }

        if (value) {
            storeRecord[key] = value;
        }

    } else {
        if (value && value !== null) {
            storeRecord[key] = value;
        }
    }

    return storeRecord[key];
}

export default Store;
