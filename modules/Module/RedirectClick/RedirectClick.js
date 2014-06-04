/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.RedirectClick = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.RedirectClick.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.RedirectClick.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		this.callbacks = this.callbacks || {};
		
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		// Deactivate all instances of this class
		var ctrls = this.map.getControlsByClass(this.CLASS_NAME);
		for (var i=0,len=ctrls.length; i<len; i++) {
			ctrls[i].deactivate();
		}
		sMap.events.triggerEvent("unselect", this, {});
		sMap.util.showMouseMoveText(this.mouseMoveText);
		sMap.events.triggerEvent("deactivate", this, {
			module: "sMap.Module.Select"
		});
		this.handler.activate();
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		// Unbind events
		sMap.util.hideMouseMoveText();
		this.handler.deactivate();
		sMap.events.triggerEvent("activate", this, {
			module: "sMap.Module.Select"
		});
		
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
		// Add a callback for the draw feature handler.
		$.extend(this.callbacks, {done : this.onDone});
		
		this.handler = new OpenLayers.Handler.Point(this, this.callbacks, {persist : false});
		
		
		var eventChooser = "addtoolbutton";
		if (this.addToToolsMenu) {
			eventChooser = "addtomenu";
		}
		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			label : this.displayName,
			hoverText : this.btnHover,
			iconCSS : this.buttonCss || "ui-icon-pencil",
			tagID : this.buttonId,
			left: this.left,
			right: this.right,
			menuId : this.addToToolsMenu
		});
	},
	
	onDone : function(geometry) {
		var url = this.url;
		if (url) {
			var x = parseInt(geometry.x),
				y = parseInt(geometry.y);
			url = url.replace(/\${x}/g, x).replace(/\${y}/g, y); 
		}
		window.open(url, this.btnLabel);
		this.deactivate();
	},
	
	
	
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.RedirectClick"
	
});



