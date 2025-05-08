import $be from 'base-elem-js';
import type { PluginBaseClass } from '../types';
import { isArr, isStr, lowercaseFirstLetter } from '../util/helpers';
import Store from './Store';
 
const { merge, toType } = $be.static;


const libraryExtend = <T extends PluginBaseClass>(Plugins: T | T[], $lib: any, notify = false) => {

    if (isArr(Plugins)) Plugins.forEach(Plugin => extendPlugin(Plugin, $lib, notify));
    else extendPlugin(Plugins, $lib, notify);
}

const extendPlugin = <T extends PluginBaseClass>(Plugin: T, $lib: any, notify:boolean) => {
    const DataName = Plugin.pluginName;
    const pluginName = lowercaseFirstLetter(DataName);
    const $libExtendTo = $lib.BaseElem ? $lib.BaseElem.prototype : $lib.fn;
    // Plugin.Constructor = Plugin;
    $libExtendTo[pluginName] = function (params) {
        const s = this;

        return s.each((elem, index) => {

            const instance = Store(elem, DataName);

            if (!instance) {
                Store(
                    elem, 
                    DataName, 
                    new Plugin(elem, params, index)
                );

            } else {
                const canUpdate = instance.handleUpdate && toType(instance.handleUpdate) === 'function';

                if (isStr(params)) {
                    if (params === 'remove') Plugin.remove(elem);
                    if (params === 'update' && canUpdate) instance.handleUpdate();

                    return;
                }
                
                checkIfParamsExist(instance.params, params, notify);
                merge(instance.params, params);

                if (canUpdate) instance.handleUpdate();
                if (notify) console.log(`Params updated`, instance.params);
            }
        });
    };
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