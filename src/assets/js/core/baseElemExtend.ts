// import $ from 'cash-dom';
import $be, {type BaseElem} from 'base-elem-js';
import { lowercaseFirstLetter } from '../util/helpers';
import Store from './Store';
import type { PluginBaseClass } from '../types';

const checkIfParamsExist = (setParams, params, notify = true) => {
    for (let k in params) {
        if (!({}).hasOwnProperty.call(setParams, k)) {
            notify && console.log(k, 'is not a property that can be used');
            delete params[k];
        }
    }
    return params;
};


const extendPlugin = <T extends PluginBaseClass>(Plugin: T, notify:boolean) => {
  
    const DataName = Plugin.pluginName;
    const pluginName = lowercaseFirstLetter(DataName);

    Plugin.Constructor = Plugin;
    
    $be.BaseElem.prototype[pluginName] = function (params) {
        const s = this as BaseElem;

        return s.elem.forEach(function (index) {

            const instance = Store(this, DataName);

            if (!instance) {
                const plugin = new Plugin(this, params, index);
                Store(this, DataName, plugin);

            } else {
                const canUpdate = instance.handleUpdate && typeof instance.handleUpdate === 'function';
                if (typeof params === 'string') {

                    if (params === 'remove') {
                        Plugin.remove(this);
                    }

                    if (params === 'update' && canUpdate) {
                        instance.handleUpdate();
                    }

                    return;
                }
                
                checkIfParamsExist(instance.params, params, notify);
                // Lib.extend(instance.params, params);

                if (canUpdate) {
                    instance.handleUpdate();
                }
                
                notify && console.log(`Params updated`, instance.params)
            }
        });
    }
}

const libraryExtend = <T extends PluginBaseClass>(Plugins: T | T[], notify = false) => {

    if (Array.isArray(Plugins)) {
        
        for (const Plugin of Plugins) {

            extendPlugin(Plugin, notify)
        }
    } else {
        extendPlugin(Plugins, notify)
    }
}

export default libraryExtend;