import getType from './helpers';

const checkIfParamsExist = (setParams, params, notify = true) => {
    for (let k in params) {
        if (!({}).hasOwnProperty.call(setParams, k)) {
            notify && console.log(k, 'is not a property that can be used');
            delete params[k];
        }
    }
    return params;
};
  

const libraryExtend = (Plugins, notify = false) => {
    
    const plugins = getType(Plugins) === 'array' ? Plugins : [Plugins];
   
    for (let i = 0, l = plugins.length; i < l; i++) {
       
        const Plugin = plugins[i];
        const pluginName = Plugin.pluginName;

        $.fn[pluginName] = function (params) {
            const _ = this;

            return _.each(function (index) {
                const $this = $(this);

                let instance = $.store.get(this, `${pluginName}_instance`);

                if (!instance) {
                    const plugin = new Plugin($this, params, index);

                    $.store.set(this, `${pluginName}_instance`, plugin); 
                
                } else {
                    const instanceParams = $.store.get(this,`${pluginName}_params`);
                
                    checkIfParamsExist(instanceParams, params, notify);

                    $.store.set(this,`${pluginName}_params`, $.extend(instanceParams, params) );
                    notify && console.log(`Params updated`,instanceParams)
                }
            });
        };
    }
}

export default libraryExtend;