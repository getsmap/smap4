/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license Apache 2 license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Export = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.Export.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Export.prototype.EVENT_TRIGGERS.concat(
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
			this.dialogDiv = this.makeExportDialog();
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
		if (this.exportExtentLayer) {
			this.exportExtentLayer.destroyFeatures();
			this.map.removeLayer(this.exportExtentLayer);	
			this.exportExtentLayer.destroy();
			this.exportExtentLayer = null;
		}
		$('#export_result').prop('src', "about:blank");
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
			iconCSS : "ui-icon-arrowthickstop-1-s",
			label : this.lang.buttonText,
			hoverText : this.lang.hoverText,
			tagID : "button-export",
			menuId : this.addToToolsMenu
		});
	}, 
	/**
	 * Make the dialog to which all html is added.
	 */
	makeExportDialog : function() {
		var dialogDiv = $("<div id='exportDialogDiv' />");
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
		
		dialogDiv.append(this.lang.lblRoutine+"<BR />");
		var selectRoutine = $("<select id='export-selectRoutine' />");
		for (var key in this.exportRoutines){
			var format = this.exportRoutines[key];
			var option = $("<option value="+key+" >"+format.name+"</option>");
			selectRoutine.append(option);
		}
		dialogDiv.append(selectRoutine);
		dialogDiv.append("<BR />");
		
		dialogDiv.append("<BR />"+this.lang.lblCRS+"<BR />");
		var selectCRS = $("<select id='export-crsSelectTag' />");
		for (var i=0;i<this.crsList.length;i++){
			var crs = this.crsList[i];
			var option = $("<option value="+crs.code+" >"+crs.name+"</option>");
			selectCRS.append(option);
		}
		dialogDiv.append(selectCRS);
		dialogDiv.append("<BR /><BR />");
		
		var extbtn = $("<button id='export-extent'>"+this.lang.btnExtent+"</button>");
		extbtn.button();
		extbtn.click(function() {
			self.toggleDraw();
		});
		dialogDiv.append(extbtn);
		dialogDiv.append("<BR /><BR />");
		
		var button = $("<button id='export-submit'>"+this.lang.btnExport+"</button>");
		button.click(function() {
			self.exportData();
		});
		button.button();
		dialogDiv.append(button);
		var iframe = $('<iframe name="export_result" id="export_result" src="about:blank" frameborder="0" scrolling="no" width=210 height=100></iframe>');
		dialogDiv.append(iframe);
	},
	/**
	 * Adds a vector layer for export extent with an OL drawfeature control
	 */
	addExportExtentLayer : function(){
		if (!this.exportExtentLayer) {
			this.exportExtentLayer = new OpenLayers.Layer.Vector("export_extentlayer", {
				styleMap: new OpenLayers.StyleMap({
					"default": new OpenLayers.Style({
						fillOpacity: 0,
						fillColor: "#FFF",
						strokeWidth: 1,
						strokeOpacity: 1,
						strokeColor: "#F00"
					}),
					"temporary": new OpenLayers.Style({
						fillOpacity: 0,
						fillColor: "#FFF",
						strokeWidth: 1,
						strokeOpacity: 1,
						strokeColor: "#F00"
					})
				})
			});
			this.map.addLayer(this.exportExtentLayer);
			this.exportExtentLayer.events.register("featureadded", this, function(e) {
				this.toggleDraw();
			});
			this.drawPolygon = new OpenLayers.Control.DrawFeature(
					this.exportExtentLayer, OpenLayers.Handler.RegularPolygon, {
						handlerOptions: {
                            sides: 4,
                            irregular: true
                        }
				});
			this.map.addControl(this.drawPolygon);
		}
	},
	/**
	 * Toggles the OL drawfeature control
	 */
	toggleDraw : function(){
		this.addExportExtentLayer();
		if (this.drawPolygon.active){
			this.drawPolygon.deactivate();
		}
		else{
			this.drawPolygon.activate();
			this.clearDraw();
		}
	},
	/**
	 * Clears all drawed features
	 */
	clearDraw : function(){
		this.exportExtentLayer.removeAllFeatures();
	},
	/**
	 * Assemble and open the export URL
	 */
	exportData : function(){
		var map = this.map,
			extent = map.getExtent(),
			routine = this.exportRoutines[$("#export-selectRoutine").val()],
			url = routine.url + "L=";
		if (routine.layerlist){
			url += routine.layerlist;
		}
		if (routine.addVisibleLayers){
			var t = {},
				visibleLayerNames = "",
				layercount = 0,
				layer = {};
			for (var i=0;i<map.layers.length;i++){
				layer = map.layers[i];
				t = sMap.cmd.getLayerConfig(layer.name);
				if (layer.visibility && layer.displayInLayerSwitcher && !layer.isBaseLayer && layer.CLASS_NAME != "OpenLayers.Layer.Vector"){
					if (layercount > 0){
						visibleLayerNames += ",";
					}
					visibleLayerNames += t.getFeatureInfo.layers ? t.getFeatureInfo.layers : layer.name;//layer.name;//t.resource ? t.resource.replace(",","+") + "+" : "";  //replace
					layercount++;
				}
			}
			if (visibleLayerNames){
				url += visibleLayerNames;
			}
			if (layercount > this.maxlayers) {
				alert('För många lager! Det går endast att exportera ' + this.maxlayers + ' lager samtidigt');
				return;
			}
		}
		if (routine.addBaseLayer){
			if (routine.emptyBaseLayer){
				url += "&BL=";
			} else{
			url += "&BL="+map.baseLayer.name;
			}
		}
		if(this.exportExtentLayer && this.exportExtentLayer.features.length>0){
			extent = this.exportExtentLayer.features[0].geometry.bounds;
		}
		url += "&B=" + extent.left;
		url += "," + extent.bottom;
		url += "," + extent.right;
		url += "," + extent.top;
		url += "&C=" + $("#export-crsSelectTag").val();
		$('#export_result').prop('src', url);
	},
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Export"
	
});