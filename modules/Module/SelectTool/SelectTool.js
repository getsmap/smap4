/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license Apache 2 license
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
		if (!this.dialogDiv){
			this.dialogDiv = this.makeSelectDialog();
			this.addDialogContent(this.dialogDiv);
		}
		this.dialogDiv.dialog("open");
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		if (this.dialogDiv && this.dialogDiv.dialog("isOpen") === true) {
			return this.dialogDiv.dialog("close");
		} else {
			sMap.events.triggerEvent("selectclickmode", this, {});
			$("#sel-click").prop("checked", true).button('refresh');
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
		var eventChooser = this.addToToolsMenu ? "addtomenu" : "addtoolbutton";

		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			label : eventChooser=="addtomenu" ? this.lang.buttonText : null,
			hoverText : this.lang.hoverText,
			iconCSS : "btnselectbox", //"ui-icon-arrowthick-1-nw",
			tagID : "button-selecttool"
		});
	}, 
	/**
	 * Make the dialog to which all html is added.
	 */
	makeSelectDialog : function() {
		var dialogDiv = $("<div id='selectDialogDiv' />");
		this.dialogDiv = dialogDiv;
		var self = this;
		dialogDiv.dialog({
			autoOpen : false,
			title : this.lang.dialogTitle,
			position : this.dialogStartPosition,
			width : this.width,
			height : this.height,
			resizable : true,
			close : function() {
				// Deactivate module
				self.deactivate.call(self);
			},
			open : null
		});

		return dialogDiv;
	},
	/**
	 * Construct the dialog content
	 * @param dialogDiv
	 */
	addDialogContent : function(dialogDiv) {
		var self = this;
		var helptext = $("<div>"+this.lang.helptext+"</div><br />");
		dialogDiv.append(helptext);
		var divhtml = "<span id='sel-digidiv'> <input type='radio' id='sel-click' name='radio' checked='checked' value='sel'><label for='sel-click'>"+this.lang.clickButtonText+"</label>"+
		   "<input type='radio' id='sel-box' name='radio'><label for='sel-box' value='box'>"+this.lang.boxButtonText+"</label></span>",
			digidiv = $(divhtml);
		digidiv.buttonset();
		digidiv.change(function(){
			self.toggleSelect();
		});
		dialogDiv.append(digidiv);
		var clearbutton = $("<button id='sel-clear'>"+this.lang.clearButtonText+"</button>");
		clearbutton.click(function() {
			sMap.events.triggerEvent("unselect", self, {});
		});
		clearbutton.button();
		dialogDiv.append(clearbutton);
	},
	toggleSelect: function(){
		var state = $("#sel-digidiv :radio:checked").attr('id');
		if (state==="sel-click"){
			sMap.events.triggerEvent("selectclickmode", self, {});
		}
		else
		{
			sMap.events.triggerEvent("selectboxmode", self, {});
		}
	},
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.SelectTool"
	
});