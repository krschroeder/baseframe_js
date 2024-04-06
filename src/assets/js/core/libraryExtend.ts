import $ from 'cash-dom';
import { capitalize } from '../util/helpers';
import store from './Store';
import type PluginBaseClass from '../types';

const checkIfParamsExist = (setParams, params, notify = true) => {
    for (let k in params) {
        if (!({}).hasOwnProperty.call(setParams, k)) {
            notify && console.log(k, 'is not a property that can be used');
            delete params[k];
        }
    }
    return params;
};


const extendPlugin = <T extends PluginBaseClass>(Plugin: T, notify:boolean, Lib) => {
  
    const DataName = Plugin.name;
    const pluginName = capitalize(DataName);

    Plugin.Constructor = Plugin;
    
    Lib.fn.extend({
        [pluginName]: function (params) {
            const s = this;

            return s.each(function (index) {

                const instance = store(this, DataName);

                if (!instance) {
                    const plugin = new Plugin(this, params, index);
                    store(this, DataName, plugin);

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
                    Lib.extend(instance.params, params);

                    if (canUpdate) {
                        instance.handleUpdate();
                    }
                    
                    notify && console.log(`Params updated`, instance.params)
                }
            });
        }
    });
}

const libraryExtend = <T extends PluginBaseClass>(Plugins: T | T[], notify = false, Lib: any = $) => {

    if (Plugins instanceof Array) {
        for (let i = 0, l = Plugins.length; i < l; i++) {

            extendPlugin(Plugins[i], notify, Lib)
        }
    } else {
        extendPlugin(Plugins, notify, Lib)
    }
}

export default libraryExtend;