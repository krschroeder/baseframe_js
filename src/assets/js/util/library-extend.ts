import $ from 'cash-dom';
import getType from './helpers';
import elemData from './elem-data';
import type PluginBaseClass from '../types/shared';

const checkIfParamsExist = (setParams, params, notify = true) => {
    for (let k in params) {
        if (!({}).hasOwnProperty.call(setParams, k)) {
            notify && console.log(k, 'is not a property that can be used');
            delete params[k];
        }
    }
    return params;
};


const libraryExtend = <T>(Plugins: PluginBaseClass | PluginBaseClass[], notify = false, Lib: any = $) => {

    const plugins: PluginBaseClass[] = getType(Plugins) === 'array' ?
        Plugins as PluginBaseClass[] : [Plugins as PluginBaseClass]
        ;

    for (let i = 0, l = plugins.length; i < l; i++) {

        const Plugin = plugins[i],
            DataName = Plugin.pluginName,
            pluginName = DataName.charAt(0).toLowerCase() + DataName.substring(1)
            ;

        Plugin.Constructor = Plugin;

        Lib.fn.extend({
            [pluginName]: function (params) {
                const _ = this;

                return _.each(function (index) {

                    const instance = elemData(this, `${DataName}_instance`);

                    if (!instance) {
                        const plugin = new Plugin(this, params, index);

                        elemData(this, `${DataName}_instance`, plugin);

                    } else {

                        if (typeof params === 'string') {

                            if (params === 'remove') {
                                Plugin.remove(this);
                            }
                            return;
                        }
                        const instanceParams = elemData(this, `${DataName}_params`);
                        checkIfParamsExist(instanceParams, params, notify);

                        elemData(this, `${DataName}_params`, Lib.extend(instanceParams, params));
                        notify && console.log(`Params updated`, instanceParams)
                    }
                });
            }
        });
    }
}

export default libraryExtend;