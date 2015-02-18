/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.GetFeatureInfo = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["featuredeleted"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : ["addtomenu", "addtoolbutton","showlayer","hidelayer","addlayer"],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.GetFeatureInfo.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.GetFeatureInfo.prototype.EVENT_TRIGGERS.concat(
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
		if(!this.infocontrol){
			this.addControl();
			this.addInfoLayer();
			this.addDeleteControl();
		}
		//this.infocontrol.activate();
		
		var selmodule = this.getModule("Select");
		selmodule.deactivate();
		if (!this.dialogDiv){
			this.dialogDiv = this.makeDialogContent();
			this.dialogDiv = this.makeDialog(this.dialogDiv);
		}
		this.dialogDiv.dialog("open");
		this.toggleDelete();
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		this.infocontrol.deactivate();
		this.deletecontrol.deactivate();
		var selmodule = this.getModule("Select");
		selmodule.activate();
		if (this.dialogDiv && this.dialogDiv.dialog("isOpen") === true) {
			return this.dialogDiv.dialog("close");
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
			hoverText : this.lang.buttonText,
			iconCSS : "ui-icon-plus", 
			tagID : "button-getfeatureinfo"
		});
	},
	/**
	 * gets the module with modulename
	 * @param modulname
	 * @returns
	 */
	getModule : function(modulename){
		var m = sMap.moduleController.modules;
		for (var i=0;i<m.length;i++){
			if (m[i].MODULE_NAME == modulename) {
				return m[i];
			}
		}
	},
	/**
	 * Adds the WMSGetFeatureInfo control to the map. Adds the layer to get the information from
	 */
	addControl : function(){
		var getinfoLayerExists = this.map.getLayersByName(this.getInfoLayer).length == 1 ? true : false;
		if (!getinfoLayerExists){
			sMap.events.triggerEvent("showlayer", this, {
			    layerName : this.getInfoLayer
			});
			sMap.events.triggerEvent("hidelayer", this, {
			    layerName : this.getInfoLayer
			});
		}
		var getinfolayer = this.map.getLayersByName(this.getInfoLayer),
			self = this,
			infocontrol = new OpenLayers.Control.WMSGetFeatureInfo({
			url: getinfolayer.URL,
			layers : getinfolayer,
            queryVisible: false,
            infoFormat: "text/plain",
            eventListeners: {
                getfeatureinfo: function(event) {
                	self.addInfoFeatures(event);
                }
            }
        });
        this.map.addControl(infocontrol);
        this.infocontrol = infocontrol;
	},
	/**
	 * Adds the infoLayer to the map
	 */
	addInfoLayer : function() {
		var infoLayerExists = this.map.getLayersByName(this.infoLayerConfig.name).length == 1 ? true : false;
		if (!infoLayerExists){
			var s = this.infoLayerConfig.style;
			this.infoLayer = new OpenLayers.Layer.Vector(this.infoLayerConfig.name, {
				styleMap : new OpenLayers.StyleMap({
						"default": new OpenLayers.Style( s["default"] ),
						"select": new OpenLayers.Style( s["select"] ),
						"temporary": new OpenLayers.Style( s["temporary"] )
				}),
				projection: new OpenLayers.Projection(this.map.projection),
				selectable: true,
				displayInLayerSwitcher: this.infoLayerConfig.displayInLayerSwitcher
			});
			sMap.config.layers.overlays.push(this.infoLayerConfig);
			sMap.events.triggerEvent("addlayer", this, {
				layer : this.infoLayer
			});
			this.infoLayer.setZIndex(this.zIndex);
			this.showHideInfoLayer();
		}
	},
	/**
	 * Tests if info layer has features and shows it if it has otherwise it will be hidden
	 */
	showHideInfoLayer: function(){
		if (this.infoLayer.features.length>0 && !this.infoLayer.visibility){
			sMap.events.triggerEvent("showlayer", this, {
				layerName : this.infoLayer.name
			});
		}
		if (this.infoLayer.features.length==0 && this.infoLayer.visibility){
			sMap.events.triggerEvent("hidelayer", this, {
				layerName : this.infoLayer.name
			});
		}
	},
	/**
	 * Adds features to the infolayer
	 */
	addInfoFeatures : function(event){
		var lonlat = this.map.getLonLatFromPixel(event.xy),
			text = "Ingen data",
			zeros = Math.pow(10, this.decimals);
		if (event.text.indexOf('no results') == -1) {	//Interpret the text response
	        var lines = event.text.split('\n');
	        for (var lcv = 0; lcv < (lines.length); lcv++) {
	            var vals = lines[lcv].replace(/^\s*/,'').replace(/\s*$/,'').replace(/ = /,"=").replace(/'/g,'').split('=');
	            if (vals[1] == "") {
	                vals[1] = "Unknown";
	            }
	            if (vals[0].indexOf(this.attributeName) != -1 ) {
	                text = Math.round(vals[1]*zeros)/zeros + " m";  //Bug in OL 2.11. Labels fail when numeric data. " m" is a workaround
	            }
	        }
	    }
		var geometry = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat),
			attributes = {info:text},
			feature = new OpenLayers.Feature.Vector(geometry,attributes),
			addlabels = $("#gfi-addlabels").prop('checked');
		if (!addlabels){
			this.clearPoints();
		}
		this.infoLayer.addFeatures([feature]);
		this.listPoints();
		this.showHideInfoLayer();
	},
	/**
	 * Clear all info points
	 */
	clearPoints : function(){
		this.infoLayer.removeAllFeatures();
		this.listPoints();
	},
	/**
	* Add deletecontrol
	*/
	addDeleteControl : function(){
		var del = new OpenLayers.Control.DeleteFeature(this.infoLayer, {
			title: "Tar bort punkter"
		});
		this.map.addControl(del);
		this.deletecontrol = del;
	},
	/**
	 * toggle deletecontrol
	 */
	toggleDelete : function(){
		var state = $("#gfi-digidiv :radio:checked").attr('id');
		if (state==="gfi-del"){
			this.infocontrol.deactivate();
			this.deletecontrol.activate();
		}
		else
		{
			this.infocontrol.activate();
			this.deletecontrol.deactivate();
		}
	},
	 featuredeleted : function(){
		if (this.infoLayer){
			this.listPoints();
		}
	 },
	 /**
	 * List all points in the infolayer and add to the dialog
	 */
	listPoints : function(){
		var textrow,
			listdiv = $("#gfi-list"),
			zeros = Math.pow(10, this.decimals);
//		if (listdiv.html()!=""){
			listdiv.html("");  //Clear the previous results
			for (var i = 0;i < this.infoLayer.features.length;i++){
				var f = this.infoLayer.features[i];
				textrow=Math.round(f.geometry.y*zeros)/zeros + "," +Math.round(f.geometry.x*zeros)/zeros + "," +f.attributes.info.replace('m','') + "<BR>";
				listdiv.append(textrow);
			}
//		}
	},
	/**
	 * Make a dialogDiv with description, options and a list button
	 */
	makeDialogContent : function() {
		var self = this,
			dialogDiv = $("<div id='GetFeatureInfoDialogDiv' class='getFeatureInfoDiv' />"),
			infoText = $("<span>"+this.lang.descriptionText+"</span>");
		infoText.css({
			"width" : "170px",
			"display" : "inline"		
		});
		dialogDiv.append(infoText);
		var cbAddLabels = $("<div id='gfi-addlabelsdiv'><label for='gfi-addlabels'>"+this.lang.addPointsText+"</label><input id='gfi-addlabels' type='checkbox' name='gfiAdd' checked /></div>");
		dialogDiv.append(cbAddLabels);
		var divhtml = "<span id='gfi-digidiv'> <input type='radio' id='gfi-dig' name='radio' checked='checked' value='dig'><label for='gfi-dig'>"+this.lang.addButtonText+"</label>"+
					   "<input type='radio' id='gfi-del' name='radio'><label for='gfi-del' value='del'>"+this.lang.deleteButtonText+"</label></span>",
						digidiv = $(divhtml);
		digidiv.buttonset();
		digidiv.change(function(){
			self.toggleDelete();
		});
		dialogDiv.append(digidiv);
		var clearbutton = $("<button id='gfi-clear'>"+this.lang.clearButtonText+"</button>");
		clearbutton.click(function() {
			self.clearPoints();
		});
		clearbutton.button();
		dialogDiv.append(clearbutton);
		if (this.listButton){
			// var button = $("<button id='gfi-listpoints'>"+this.lang.listButtonText+"</button>");
			// button.click(function() {
				// self.listPoints();
			// });
			// button.button();
			// dialogDiv.append(button);
			var listdiv = $("<div id='gfi-list' class='gfi-list' />");
			dialogDiv.append(listdiv);
		}
		return dialogDiv;
	},
	/**
	 * Make the dialog to which all html is added.
	 */
	makeDialog : function(dialogDiv) {
		var self = this;
		dialogDiv.dialog({
			autoOpen : false,
			title : this.lang.headerText,
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
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.GetFeatureInfo"
	
});