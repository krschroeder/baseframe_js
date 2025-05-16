import $be from 'base-elem-js';
import type { PluginBaseClass } from '../types';
import { isArr, isStr, lowercaseFirstLetter } from '../util/helpers';
import Store from './Store';
import type { CashStatic } from 'cash-dom';
 
type Be = typeof $be;
type LibType = Be | CashStatic;

const bes = $be.static;

const libraryExtend = <T extends PluginBaseClass>(Plugins: T | T[], Library: LibType = $be, notify = false) => {

    if (isArr(Plugins)) {
        Plugins.forEach(Plugin => libraryExtend(Plugin, Library, notify));
    } else {
        const dataName      = Plugins.pluginName;
        const pluginName    = lowercaseFirstLetter(dataName);
        const $library      = (Library as Be).BaseElem ? (Library as Be).BaseElem.prototype : (Library as CashStatic).fn;
        
        const o = { [pluginName]: function (params) {
            const s = this;
            return s.each((elem, index) => {
                const Instance = Store(elem, dataName);

                if (!Instance) Store( elem, dataName, new Plugins(elem, params, index));
                else {
                    const canUpdate = Instance.handleUpdate && bes.toType(Instance.handleUpdate) === 'function';

                    if (isStr(params)) {
                        if (params === 'remove') Plugins.remove(elem);
                        if (params === 'update' && canUpdate) Instance.handleUpdate();
                        return;
                    }
                    
                    checkIfParamsExist(Instance.params, params, notify);
                    bes.merge(Instance.params, params);

                    if (canUpdate) Instance.handleUpdate();
                    if (notify) console.log(`Params updated`, Instance.params);
                }
            });
        }};

        $library[pluginName] = o[pluginName];
    }
}

const checkIfParamsExist = (setParams, params, notify = true) => {
    for (let k in params) {
        if (!({}).hasOwnProperty.call(setParams, k)) {
            notify && console.log(k, 'is not a property that can be used');
            delete params[k];
        }
    }
    return params;
};

export default libraryExtend;