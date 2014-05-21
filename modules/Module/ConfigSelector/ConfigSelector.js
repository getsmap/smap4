/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.ConfigSelector = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["afterapplyingwebparams"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.ConfigSelector.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.ConfigSelector.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		// Call the deactivate method of the parent class
		return sMap.Module.prototype.deactivate.apply(
	            this, arguments
	        );
	},
	
	destroy : function() {
		// Call the destroy method of the parent class
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Called when all modules are initialized, i.e. after initialize.
     * All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		this.addDropDown();
	}, 
	/**
    * Add a drop-down menu for different configs to the toolbar.
    */
   	addDropDown : function() {
		var self = this,
//			toolbar = $("#toolbar-maindiv"),
			dropDownItems = this.dropDownItems,
			options = "<option value='def'>" + this.lang.defaultSelecttext + "</option>";
		
		for (var theme in dropDownItems){
			options = options + "<option value='" + theme + "'>" + dropDownItems[theme].name + "</option>";
		}
		var dropDownMenu = $("<select name='themes' id='configSelectorDdl'>" + options + "</select>");
		//toolbar.append(dropDownMenu);
		sMap.events.triggerEvent("addselect", self, {
				   selectObject : dropDownMenu,
				   index : self.toolbarIndex
		});
		//onChange of the dropDown
		$('#configSelectorDdl').change(function() {
			var selectedTheme = $(this).find("option:selected").val();
			if (selectedTheme!="def"){
				self.changeConfig(selectedTheme);
			}
			else{
				self.afterapplyingwebparams();
			}
		});
	},
	/**
	 * Change the config file and reload the map
	 * @param theme
	 */
	changeConfig : function(theme) {
		var params = sMap.cmd.getParamsAsObject(),
			oldOLarr = params.OL ? params.OL : [];
		if (this.dropDownItems[theme].file){
			params.CONFIG = this.dropDownItems[theme].file;
		}
		if (!this.keepZoom){
			params.CENTER = null;
			params.ZOOM = null;
		}
		if (this.dropDownItems[theme].bl){
			params.BL = this.dropDownItems[theme].bl;
		}
		else if (!this.keepBackground){
			params.BL = null;
		}
		if (this.dropDownItems[theme].ol  || this.dropDownItems[theme].ol == ""){
			params.OL = this.dropDownItems[theme].ol;
		}
		else if (!this.keepOverlays){
			params.OL = null;
		}
		if (!this.keepFeatures){
			params.FEATURES = null;
		}
		if (!this.keepOpacities){
			params.OP = null;
		}
		else {
			var newOLarr = params.OL ? params.OL.split(",") : [],
				OParr = params.OP ? params.OP : [],
				newOP =	OParr.length > 0 ? OParr[0] : null;
			for (var i =0;i<newOLarr.length;i++){
				var found = false;
				for (var j = 0;j<oldOLarr.length;j++){
					if (newOLarr[i] == oldOLarr[j]){
						newOP += "," + OParr[j+1];
						found = true;
					}
				}
				if (!found){
					newOP += ",100";
				}
			}
			params.OP = newOP;
		}
		var	webParams = "",
			key = null,
			val = null;
		for (key in params) {
			val = params[key];
			if (val){
				webParams = webParams + "&" + key.toLowerCase()+"="+val;
			}
		}
		webParams = webParams.substring(1); // Remove starting "&"
		
		webParams = sMap.config.rootURL + "?" + webParams;
		
		document.location = webParams;
	},
	/**
	 * Change the selector to the value that contains the config-file and ol-string
	 * @param config
	 */
	setDropDown : function(config){
		var ddl = $("#configSelectorDdl"),
			ol = sMap.db.startingWebParamsObject.OL ? sMap.db.startingWebParamsObject.OL : "",
			items = this.dropDownItems;
		for (var theme in items){
			var itemOL = items[theme].ol ? items[theme].ol : "";
			if (items[theme].file == config && (itemOL == ol || (items[theme].ol==null))){
				ddl.val(theme);
			}
		}
	},
	afterapplyingwebparams : function(){
		var config = sMap.db.startingWebParamsObject.CONFIG;
		if (config) {
			this.setDropDown(config);
		}
	},
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.ConfigSelector"
	
});