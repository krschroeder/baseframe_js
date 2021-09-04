const getBaseClass = (version, data_name, defaults) => {
	
	if(defaults){
		return class {
			static get version(){ return version }
			static get pluginName() { return data_name }
			static get defaults() { return defaults}
		}
	}

	return class {
		static get version(){ return version }
		static get pluginName() { return data_name }
	}
}

export default getBaseClass;