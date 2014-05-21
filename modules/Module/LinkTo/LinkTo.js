/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.LinkTo = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.LinkTo.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.LinkTo.prototype.EVENT_TRIGGERS.concat(
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
	
	showIt: function() {
		var self = this;
		if (!this.dialog) {
			window.open(this.content, "_blank");			
		}
		else {
			if (!this.theDialog) {
				var t = this.dialog instanceof Object ? this.dialog : {},
						d = $("<div />");
				var options = {
						title: "Dialog",
						width: "auto",
						autoOpen: true,
						height: "auto",
						close: function() {
							$(this).dialog("destroy");
							$(this).empty().remove();
							self.theDialog = null;
						}	
				};
				if (this.content) {
					var c = this.content;
					if (typeof c === "string" && (c.substring(0, 7) === "http://" || c.substring(0, 8) === "https://")) {
						// A URL – wrap it into an iframe.
						var iframe = $('<iframe width="700" height="99%" frameborder="0" marginheight="0" marginwidth="0" top="0px" left="0px"></iframe>');
						iframe.attr("src", c);
						d.append(iframe);
					}
					else {
						// HTML
						d.append(c);
					}
				}			
				$.extend(options, t);
				this.theDialog = d;
				d.dialog(options);
//			d.css("padding", "0 0.1em !important");				
			}
			else {
				this.theDialog.dialog("open");
			}
			
		}
	},
	
	hideIt: function() {
		if (this.theDialog) {
			this.theDialog.dialog("close");			
		}
	},
	
    /**
     * Called when all modules are initialized, i.e. after initialize.
     * All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		var self = this;
		
		var eventChooser = "addtoolbutton";
		if (this.addToToolsMenu) {
			eventChooser = "addtomenu";
		}
		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			label : this.displayName,
			hoverText : this.hoverText,
			iconCSS : "ui-icon-extlink",
			tagID : sMap.util.createUniqueId("linkto-button-"),
			left: this.left,
			right: this.right,
			menuId : this.addToToolsMenu,
			toggle: false,
			on: this.showIt
//			,off: this.hideIt
		});
	}, 
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.LinkTo"
	
});