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
        const DataName = Plugin.pluginName;
        const pluginName = DataName.charAt(0).toLowerCase() + DataName.substring(1);
        
        $.fn[pluginName] = function (params) {
            const _ = this;

            return _.each(function (index) {
                const $this = $(this);

                let instance = $.store.get(this, `${DataName}_instance`);

                if (!instance) {
                    const plugin = new Plugin($this, params, index);

                    $.store.set(this, `${DataName}_instance`, plugin); 
                
                } else {
                    const instanceParams = $.store.get(this,`${DataName}_params`);
                    checkIfParamsExist(instanceParams, params, notify);
                  
                    $.store.set(this,`${DataName}_params`, $.extend(instanceParams, params) );
                    notify && console.log(`Params updated`,instanceParams)
                }
            });
        };
    }
}

export default libraryExtend;