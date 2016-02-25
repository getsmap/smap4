/**
 * @author Kristian Bergstrand
 * @copyright Helsingborgs stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Opacity = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["layervisible","layerhidden","setbaselayer","delopacityrow","addopacityrow", "creatingwebparams","afterapplyingwebparams"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : ["layeropacitychanged"],
	
	/**
	 * "allNamesInGUI" - keeps track of the layers in the opacityTool-dialog.
	 *  Will be populated by "name", as stated in config.js
	 * 
	 */
	
	allNamesInGUI : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Opacity.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Opacity.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);

		//Create a div for all opacityrows.
		var opacityRowsDiv = $("<div class='opacity-rowsdiv'></div>");
		this.opacityRowsDiv = opacityRowsDiv;

		var opacityDiv = $("<div id='opacity-maindiv' />");
		this.opacityDiv = opacityDiv;

		opacityDiv.append(opacityRowsDiv);
		
	},
	
	activate : function() {
		var self = this;
		if (self.active===true) {
			return false;
		}
		
		//Determines which baseLayer is active when activating the opacityTool.
		this.activeBaseLayer = self.map.baseLayer.name;
		
		//Create dialog-content and the dialog. Then open the dialog.
		self.opacityDiv = self.createContent(self.opacityDiv);
		self.opacityDiv = self.createopacitychanger(self.opacityDiv);
		self.opacityDiv.dialog("open");
		
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		var self = this;
		if (!self.active) {
			return false;
		}
		
		if ( this.savePrefChecked && $("#opacity-prefs").is(":checked") == false ){
			var a = self.allNamesInGUI;
			$.each(a, function(){
				var opLayer = self.map.getLayersByName(this)[0];
				opLayer.setOpacity(1);
			});
		}
		
		//Close and empty everything.
		if (self.opacityDiv && self.opacityDiv.dialog("isOpen") === true) {
			return self.opacityDiv.dialog("close");
		}
		self.allNamesInGUI = [];
		$(self.opacityDiv).empty().remove();
		
		// Call the deactivate function of the parent class
		return sMap.Module.prototype.deactivate.apply(
	            this, arguments
	        );
	},
	
	destroy : function() {
		// Handler are automatically deactivated and destroyed
		// by the parent class module's destroy method. However,
		// this is only the case if the handlers are stored like
		// below (the example shows how to deactivate them manually):
		// -> this.handlers["click"].deactivate();   // For many handlers...
		// -> this.handler.deactivate();    // For single handler
		// Therefore you should always store handler(s) like in this example.
		
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		var eventChooser = "addtoolbutton";
		if (this.addToToolsMenu) {
			eventChooser = "addtomenu";
		}
	
		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			label : this.lang.buttonText,
			menuId : this.addToToolsMenu,
			iconCSS : "ui-icon-image",
			tagID : "button-opacity"
		});
	},
	
	/**
	 * Listener to the event "layervisible".
	 * Calls function addopacityrow(), to add the layer to opacityDiv.
	 * 
	 * @param e {Object}
	 * 		- layer.name {String} Name of the layer that got visible.   
	 * 
	 * @returns
	 */
	
	layervisible : function(e) {
		//Escape if the module is not active
		if ( !this.active === true ) {
			return;
		}
		
		//When a layer is checked in overlayswitcher, it will appear in opacityTool as well.
		var layersToAdd = this.map.getLayersByName(e.layer.name);
		this.addopacityrow({layersToAdd: layersToAdd});
	},
	
	/**
	 * Listener to the event "layerhidden".
	 * Calls function delopacityrow(), to delete the layer from opacityDiv.
	 * 
	 * @param e {Object}
	 * 		- layer.name {String} Name of the layer that got hidden.
	 * 
	 * @returns
	 */
	
	layerhidden : function(e) {
		//Escape if the module is not active
		if ( !this.active === true ) {
			return;
		}
		
		//When a layer is unchecked in overlayswitcher, it will disappear in opacityTool as well.
		this.delopacityrow({delLayer: e.layer.name});
	},
	
	/**
	 * Listener to the event "setbaselayer".
	 * Calls functions for removing previous baselayer from opacityDiv and add new baselayer.
	 * 
	 * @param e {Object}
	 * 		- layerName {String} Name of the new baselayer.
	 * 
	 * @returns
	 */
	
	setbaselayer : function(e) {
		var self = this;
		//Escape if the module is not active
		if ( !self.active === true ) {
			return;
		}
		
		//Remove the current BaseLayer from opacityTool
		var oldBaseLayer = self.activeBaseLayer; 
		self.delopacityrow({delLayer: oldBaseLayer});
		
		//Add the new BaseLayer to opacityTool
		var newBaseLayer = self.map.getLayersByName(e.layerName);
		self.addopacityrow({layersToAdd: newBaseLayer});
		
		//Remember the new BaseLayer
		self.activeBaseLayer = e.layerName;
	},
	
	 /**
	 * Listener to the event "delopacityrow".
	 * Deletes the layer from opacityDiv.
	 * 
	 * @param delLayer {Object} || {String}
	 *      
	 * @returns
	 */
	
	delopacityrow : function(e){
		var delLayer = e.delLayer;

		var allNamesInGUI = this.allNamesInGUI,
		//If delLayer is an object - fetch the name. Otherwise take the argument as-is.
		delLayer = typeof(delLayer) == "object" ? delLayer.name : delLayer;
		
		//Find out which layer to delete in allNamesInGUI vector, and delete it.
		var rowIndex = $.inArray(delLayer, allNamesInGUI);
		allNamesInGUI.splice(rowIndex, 1);
		
		//Delete the layer in the GUI
		$(".opacity-rowsdiv").find(".opacityrow-"+delLayer).remove();
	},
	
	/**
	 * Listener to the event "addopacityrow".
	 * Add layer(s) to opacityDiv.
	 * 
	 * @param layersToAdd {Array} Array of one or more OpenLayers.Layer.
	 *      
	 * @returns
	 */
	addopacityrow : function(e) {
		var layersToAdd = e.layersToAdd || [];
		var self = this,
			allNamesInGUI = this.allNamesInGUI,
			opacityRowsDiv = this.opacityRowsDiv;
		
		for (var i=0; i<layersToAdd.length; i++) {
			var t = layersToAdd[i];
			
			//  Don't add certain layers to opacityTool. The criterias are:
			//		a) displayInLayerSwitcher == true && 
			//		b) visibility == true && 
			//		c) name != "selectLayer"
			//		d) name != "poiLayer"
			//		e) name != "theDrawLayer"
			
			if ( (t.options && t.options.splitLayer && t.options.splitLayer.options && t.options.splitLayer.options.dontShowInOpacitySwitcher) || t.displayInLayerSwitcher != true || t.visibility != true || t.name == "selectLayer" || t.name == "poiLayer" || t.name == "theDrawLayer"){
				continue; //Stop and begin a new iteration
			}
			
			//Do not add layer if it's already in the GUI
			var doubleCheck = $.inArray(t.name,allNamesInGUI);
			if (doubleCheck == -1){
				allNamesInGUI.push(t.name);
			}
			else{
				console.log("Layer " + t.name + " is already in list!");
				continue; //Stop and begin a new iteration
			}
			
			//decVal is between 0-1 and is used when setting opacity for a layer.
			//E.g. t.setOpacity(decVal);
			
			var layerConfig = sMap.cmd.getLayerConfig(t.name);
			if (!layerConfig || !(layerConfig instanceof Object)) {
				continue;
			}
			if ( opacityRowsDiv.find(".opacityrow-"+t.name).length > 0) {
				continue;
			}
			var name = layerConfig.displayName,
				theSliderDivId = OpenLayers.Util.createUniqueID(),
				decVal = 1, 
				guiVal = 100;
		
			decVal = t.opacity != null ? t.opacity : decVal;
			guiVal = Math.round(decVal * 100);
			
			var opacityRow = $("<div class='opacity-rows opacityrow-"+t.name+"'><span class='opacity-mapname'>" + name + "</span>" + 
					"<div class='opacity-sliderdiv' id='" + theSliderDivId + "'></div><span class='opacity-values'>" + guiVal + "</span></div>");
			opacityRow.data("layerName", t.name);
			
			opacityRow.children("div#"+theSliderDivId).slider({
				value: guiVal,
				create: function(e, ui){
					t.setOpacity(decVal);
				},
				start: function(e, ui){},
				animate: true,
				slide: function(e, ui) {
					var internalLayerName = $(this).parent().data("layerName");
					var theLayer = self.map.getLayersByName(internalLayerName)[0];
					var oldOpacity = theLayer.opacity;
					var newOpacity = ui.value / 100;
					theLayer.setOpacity(newOpacity);
					$(this).parent().children("span.opacity-values").text(ui.value);
					sMap.events.triggerEvent("layeropacitychanged", this, {
						layer: theLayer,
						oldOpacity: oldOpacity,
						newOpacity: newOpacity

					});
				},
				stop: function(e, ui){
					sMap.events.triggerEvent("updatelinkentries", this, {});
				}
			});
				
			opacityRowsDiv.append(opacityRow);
		}
		
	},
	
	/**
	 * Listener to the event "creatingwebparams".
	 * 
	 * Adds parameter "op" to webparams, which will hold
	 * opacityvalues for the baselayer and overlays.
	 * If all layers are fully visible - i.e. all opacityvalues are 100 -
	 * then the parameter "op" will not be added, since the default 
	 * is that every added layer is fully visible. 
	 * 
	 * @returns
	 */
	
	creatingwebparams : function(){
		var self = this,
			opVals = []; //Holds opacityvalue for each layer.
		
		var bl = sMap.db.webParams.BL ? [sMap.db.webParams.BL] : [];
		var ol = sMap.db.webParams.OL ? sMap.db.webParams.OL : [];
		
		//If only one value
		if (typeof ol == "string"){
			ol = [ol];
		}
		var allOp = bl.concat(ol);
		//Iterate over all layers
		$.each(allOp, function(){
			var t = sMap.map.getLayersByName(this)[0] || {};
			var decVal = t.opacity !== null && t.opacity !== undefined ? t.opacity : 1;
			var paramVal = Math.round(decVal * 100);
			opVals.push(paramVal);
		});
		
		//Iterate over the opacity-values.
		//IF all values equals 100, don´t add URL-parameter.
		var testVals = null;
		$.each(opVals, function(){
			if (this != 100){ 
				testVals = false;
		        return false;
			}
		});
		
		if (testVals != null){		
			sMap.db.webParams.op = opVals;
		}
		
	},
	
	/**
	 * Listener to the event "afterapplyingwebparams".
	 * 
	 * @returns
	 */
	
	afterapplyingwebparams : function(){
		var opacityVals = sMap.db.startingWebParamsObject.OP ? sMap.db.startingWebParamsObject.OP : [];
		if(!opacityVals.length){
			return;
		}
		//If only one value
		if ( typeof opacityVals == "string"){
			opacityVals = [opacityVals];
		}
		var ol = sMap.db.startingWebParamsObject.OL ? sMap.db.startingWebParamsObject.OL : [];
		//If only one value
		if ( typeof ol == "string"){
			ol = [ol];
		}
		var bl = sMap.db.startingWebParamsObject.BL ? [sMap.db.startingWebParamsObject.BL] : [];
		var allLayers = bl.concat(ol);
	
		if (allLayers.length && opacityVals.length) {
			$.each(allLayers, function(i){
				var opLayer = sMap.map.getLayersByName(this)[0];
				opLayer.setOpacity(opacityVals[i]/100);
			});
		}
	},
	
	/**
	 * Called when activating the module.
	 * Creates content inside the opacityDiv, which will later be placed in a dialog.
	 * 
	 * @returns opacityDiv {Object} jquery-object with content for the dialog.
	 */
	
	createContent : function() {
		var self = this,
			allLayers = this.map.layers;

		var opacityDiv = this.opacityDiv;
		var opacityRowsDiv = this.opacityRowsDiv;
		
		//Add row(s) for layer(s) in vector allLayers.
		self.addopacityrow({layersToAdd: allLayers});
		
		//Create a reset button that sets opacity to 1 for all layers.
		var resetButton = $("<div id='opacity-btndiv'><button id='opacity-togglebtn'>" + self.lang.resetButtonText + "</button></div>");
		
		//Click on resetButton --> iterate over all sliders, set them to 100 and set opacity for all layers to 1.
		resetButton.children("button").click(function() {
			$('.opacity-sliderdiv').each(function(index) {
				var tempSelf = $(this);
				tempSelf.slider("value",100);
				tempSelf.slider('option','slide').call(tempSelf,null,{ 
					handle: $('.ui-slider-handle', tempSelf), 
					value: 100
				});
			});
		});
		
		opacityDiv.append(resetButton);
		resetButton.find("button").button();
		
		//If savePrefChecked exists in _conf.js, add a checkbox for remembering settings when deactivating the module.
		if (self.savePrefChecked){
			var prefCheckBox = $("<div id='opacity-prefdiv'><label for='opacity-prefs'>" + self.lang.prefText + "</label><input id='opacity-prefs' type='checkbox' checked='"+this.savePrefChecked+"' name='savePrefs' /></div>");
			resetButton.append(prefCheckBox);
		}
	return opacityDiv;
	},
	
	/**
	 * Creates the dialog for the opacityDiv.
	 * 
	 * @returns opacityDiv {Object} jQuery-object with content in a dialog. 
	 */
				
	createopacitychanger : function(opacityDiv){
		var self = this;
		
		sMap.util.createDialog(opacityDiv, {
			titleText : self.lang.headerText,
			position : self.dialogStartPosition,
 			width : self.width,
			height : self.height,
			resizable : true,
			onClose : function() {
				// Deactivate controls
				self.events.triggerEvent("dialogclosed", {
					control : self
				});
				self.deactivate.call(self);
			},
			onOpen : null
		});
		return opacityDiv;
	},		
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Opacity"
	
});