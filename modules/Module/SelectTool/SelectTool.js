/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.SelectTool = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : [],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.SelectTool.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.SelectTool.prototype.EVENT_TRIGGERS.concat(
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
		sMap.events.triggerEvent("selectboxmode", this, {});
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		sMap.events.triggerEvent("selectclickmode", this, {});
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
		var eventChooser = this.addToToolsMenu ? "addtomenu" : "addtoolbutton";

		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			label : eventChooser=="addtomenu" ? this.lang.buttonText : null,
			hoverText : this.lang.buttonText,
			iconCSS : "btnselectbox", 
			tagID : "button-selecttool"
		});
	}, 
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.SelectTool"
	
});