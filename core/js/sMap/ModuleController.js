

sMap.ModuleController = OpenLayers.Class({
	
	toBeActivated : 0,
	modulesAdded : false,
	modules : [],
	controlsToBeActivated: [],
	
	initialize : function(map) {
		this.map = map;
		
	},
	
	/**
	 * Get the configuration object for the module (default location is in same
	 * folder as other module files). The add all modules one by one, attaching the
	 * configuration object, bound as "this.config".
	 * @param modules {Array || <sMap.Module.initialize> } An array with all modules' constructor method}. 
	 * @returns void
	 */
	addModules : function(modules) {
		modules = modules || sMap.config.modules;
		
		for (var i=0,len=modules.length; i<len; i++) {
			var t = modules[i];
			var className = typeof t.init == "String" ? t.init : t.init.prototype.CLASS_NAME;
	    	this.addModule(className, t.config);
		}
		
		/*
		 * When all modules have been added the ones which should be
		 * activated should so be.
		 */
		sMap.events.register("modulesadded", this, function(e) {
			var controls = this.controlsToBeActivated;
			sMap.events.triggerEvent("beforemodulesactivated", this, {
				modules: this.controlsToBeActivated
			});
			// Iterate through all controls that should be activated
			for (var i=0,len=controls.length; i<len; i++) {
				controls[i].activate();
			}
			sMap.events.triggerEvent("aftermodulesactivated", this, {
				modules: this.controlsToBeActivated
			});
		});
		
		/**
		 * Trigger event "modulesadded".
		 */
		sMap.events.triggerEvent("modulesadded", this, {});
		sMap.events.modulesAdded = true;
	},
	
	/**
	 * Remove and destroy given modules.
	 * @returns void
	 */
	removeModules : function(modules) {
		for (var i=0,len=modules.length; i<len; i++) {
			this.removeModule(modules[i]);
		}
	},
	
	/**
	 * Get config from the config file of the module.
	 * @param constructor
	 * @returns {Object} Config object from file.
	 */
	getFileConfig : function(constructor) {
		var className = typeof constructor == "string" ? constructor : constructor.prototype.CLASS_NAME;
		var classNameArr = className.split(".");
    	var moduleName = classNameArr[classNameArr.length-1];
		var url = "modules/Module/" + moduleName + "/" + moduleName +"_conf.js";
		
		/**
		 * Get the configuration for this module.
		 * Use synched GET request so that for-loop
		 * won't proceed until the response has come.
		 */
    	$.ajax({
    		type : "GET",
    		dataType : "script",
    		async : false,
    		url : url
    	});
    	
    	return module_config;
	},
	
	/**
	 * Add a module to the map.
	 * @param constructor {Function} In OL-classes it has the name "initialize".
	 * @param config {Object} Optional. If not provided, config will automatically be loaded.
	 * @returns
	 */
	addModule : function(constructor, config) {
		var className = typeof constructor == "string" ? constructor : constructor.prototype.CLASS_NAME;
		if (typeof constructor == "string") {
			constructor = eval(constructor);
		}
		if (!className) {
			debug.error("Module "+className+" does not exist.");
			return;
		}
		// Don't add the module if it has already been added.
//		var ctrlExists = this.map.getControlsByClass(className).length ? true : false;
//		if (ctrlExists===true) {
//			return;
//		}
		var ctrl = new constructor(config);
		this.map.addControl(ctrl);
		if (config.initType == "control") {
			return;
		}
		/**
		 * sMap always sets OL's property autoActivate to false.
		 * Instead 
		 */
		
		if (ctrl.activateFromStart===true) {
			this.controlsToBeActivated.push(ctrl);
		}
		this.modules.push(ctrl);
		
	},
	
	/**
	 * Remove module from map and call destroy.
	 * @param module {sMap.Module}
	 * @returns void
	 */
	removeModule : function(module) {
		this.map.removeControl(module);
		module.destroy();
	},
	
	
	CLASS_NAME : "sMap.ModuleController"
});