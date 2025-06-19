import $be from 'base-elem-js';
import type { PluginBaseClass } from '../types';
import { isArr, isStr, lowercaseFirstLetter } from '../util/helpers';
import Store from './Store';
import type { CashStatic } from 'cash-dom';

type Be = typeof $be;
type LibType = Be | CashStatic | JQueryStatic;

const bes = $be.static;

const libraryExtend = <T extends PluginBaseClass>(Plugins: T | T[], Library: LibType = $be, notify = false) => {

    if (isArr(Plugins)) {
        Plugins.forEach(Plugin => libraryExtend(Plugin, Library, notify));
    } else {
        const 
            dataName      = Plugins.pluginName,
            pluginName    = lowercaseFirstLetter(dataName),
            isBaseElem    = !!(Library as Be).BaseElem,
            $library      = isBaseElem ? (Library as Be).BaseElem.prototype : (Library as CashStatic | JQueryStatic).fn
        ;

        const storeInstanceEach = (elem, index, params) => {
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
            }

            return Instance;
        }

        const pluginFn = function (params) {
            const s = this;
            if (isBaseElem) {
                return s.each((elem, index) => {
                    storeInstanceEach(elem, index, params);
                });
            } else {
                //Cash or jQuery
                return s.each(function(index, elem){
                    storeInstanceEach(elem, index, params);
                })
            }    
        }
        
        
        pluginFn.getInstance = (elem: HTMLElement): typeof Plugins => {
            return Store(elem, dataName);
        }
        // to get it to print the function name
        const o = { [pluginName]: pluginFn};
        $library[pluginName] = o[pluginName];
    }
}



const checkIfParamsExist = (setParams, params, notify = true) => {
    for (let k in params) {
        if (!({}).hasOwnProperty.call(setParams, k)) {
            if (notify) console.warn(`${k} is not a property that can be used`);
            delete params[k];
        }
    }
    if (notify) console.log(`Params updated:`, params);
    return params;
};

export default libraryExtend;