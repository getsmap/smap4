/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license Apache 2 license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Login2 = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.Login2.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Login2.prototype.EVENT_TRIGGERS.concat(
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
		if (!this.dialogDiv){
			this.dialogDiv = this.makeLoginDialog();
		}
		this.dialogDiv.dialog("open");
		//this.bindBtnSubmit();
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		if (this.dialogDiv && this.dialogDiv.dialog("isOpen") === true) {
			// this.dialogDiv.dialog('close');
		}
		if (this.dialogDiv) {
			this.dialogDiv.dialog('destroy').remove();
			this.dialogDiv = null;
		}
		this.clearCache();
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
		sMap.events.triggerEvent("addtoolbutton", this, {
			index : this.toolbarIndex,
			label : null,
			hoverText : this.lang.buttonText,
			iconCSS : "ui-icon-locked", 
			tagID : "button-login2"
		});
	}, 
	/**
	 * Make the dialog to which all html is added.
	 */
	makeLoginDialog : function(dialogDiv) {
		var dialogDiv = $("<div />");
		this.dialogDiv = dialogDiv;
		var self = this;
		dialogDiv.dialog({
			autoOpen : false,
			title : this.lang.loginTitle,
			position : "center",
			width : 350,
			height : 210,
			resizable : true,
			close : function() {
				// Deactivate module
				self.deactivate.call(self);
			},
			open : null
		});
		var iFrame = $('<iframe id="loginiframe" width="100%" height="145px" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0"></iframe>'); // scrolling='no'
		iFrame.attr("src", this.loginScriptURL);
		dialogDiv.append(iFrame);
		return dialogDiv;
	},
	// bindBtnSubmit : function(){
		// var self = this,
			// iframe = $("#loginiframe"),
			// btn = iframe.contents().find("#loginbtn");
		// btn.button();
		// btn.click(function(){
			// self.clearCache();
		// });
	// },
	/**
	 * clear local cache
	 */
	clearCache : function(){
		var map = this.map,
			layer = {};
		for (var i=0;i<map.layers.length;i++){
			layer = map.layers[i];
			var	t = sMap.cmd.getLayerConfig(layer.name);
			if (!layer.isBaseLayer && layer.CLASS_NAME != "OpenLayers.Layer.Vector"){
				if (t.restricted == "t"){
					layer.redraw(true);
				}
			}
		}
	},
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Login2"
	
});