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
		dialogDiv.append("<BR /><BR />"+this.lang.lblExtent+"<BR />");
		var polybtn = $("<button id='export-polyextent' title='"+this.lang.btnPolyTitle+"'>"+this.lang.btnPoly+"</button>");
		polybtn.button();
		polybtn.click(function() {
			self.toggleDraw("poly");
		});
		dialogDiv.append(polybtn);
		var boxbtn = $("<button id='export-boxextent' title='"+this.lang.btnBoxTitle+"'>"+this.lang.btnBox+"</button>");
		boxbtn.button();
		boxbtn.click(function() {
			self.toggleDraw("box");
		});
		dialogDiv.append(boxbtn);
		var copybtn = $("<button id='export-copyextent' title='"+this.lang.btnCopyTitle+"'>"+this.lang.btnCopy+"</button>");
		copybtn.button();
		copybtn.click(function() {
			var sl = self.map.getLayersByName("selectLayer")[0];
			if (sl && sl.features.length>0){
				self.addExportExtentLayer();
				self.clearDraw();
				var sf = sl.features[0].clone();
				sMap.events.triggerEvent("unselect", this, {});
				var f = new OpenLayers.Feature.Vector(sf.geometry);
				self.exportExtentLayer.addFeatures(f);
				//self.exportExtentLayer.redraw();
			}
			else{
				alert('Markera något och klicka sedan på knappen!');
				$('#export-copyextent').removeClass('ui-state-focus');
			}
		});
		dialogDiv.append(copybtn);
		dialogDiv.append("<BR /><BR />");
		
		var button = $("<button id='export-submit'>"+this.lang.btnExport+"</button>");
		button.click(function() {
			self.exportData();
		});
		button.button();
		dialogDiv.append(button);
		var resultdiv = $('<div name="export-result" id="export-result" ></div>');
		//var iframe = $('<iframe name="export-result" id="export-result" src="about:blank" frameborder="0" scrolling="no" width=210 height=100></iframe>');
		dialogDiv.append(resultdiv);
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
						strokeWidth: 2,
						strokeDashstyle: "dash",
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
				}),
				rendererOptions: {yOrdering: true, zIndexing: true}
			});
			this.map.addLayer(this.exportExtentLayer);
			this.exportExtentLayer.setZIndex(this.zIndex);
			this.exportExtentLayer.events.register("featureadded", this, function(e) {
				this.toggleDraw("finished");
			});
			this.drawPolygon = new OpenLayers.Control.DrawFeature(
					this.exportExtentLayer, OpenLayers.Handler.Polygon, {  //RegularPolygon
						title: "Rita",
						multi: false
				});
			this.map.addControl(this.drawPolygon);
			this.drawRegularPolygon = new OpenLayers.Control.DrawFeature(
					this.exportExtentLayer, OpenLayers.Handler.RegularPolygon, {  //RegularPolygon
						title: "Rita",
						multi: false,
						handlerOptions: {
                            sides: 4,
                            irregular: true
                        }
				});
			this.map.addControl(this.drawRegularPolygon);
		}
	},
	/**
	 * Toggles the OL drawfeature control
	 */
	toggleDraw : function(btnclicked){
		this.addExportExtentLayer();
		switch(btnclicked){
			case "poly":
				if (this.drawPolygon.active){
					this.deactivatePoly();
				}else{
					if (this.drawRegularPolygon.active){
							this.deactivateBox();
					}
					this.activatePoly();
					this.clearDraw();
				}
				break;
			case "box":
				if (this.drawRegularPolygon.active){
					this.deactivateBox();
				}else{
					if (this.drawPolygon.active){
						this.deactivatePoly();
					}
					this.activateBox();
					this.clearDraw();
				}
				break;
			case "finished" :
				if (this.drawPolygon.active){
					this.deactivatePoly();
				}
				if (this.drawRegularPolygon.active){
					this.deactivateBox();
				}
				$('#export-copyextent').removeClass('ui-state-focus');
				break;
		}
	},
	activatePoly : function(){
		this.drawPolygon.activate();
		$('#export-polyextent').addClass('ui-state-focus');
	},
	deactivatePoly : function(){
		this.drawPolygon.deactivate();
		$('#export-polyextent').removeClass('ui-state-focus');
	},
	activateBox : function(){
		this.drawRegularPolygon.activate();
		$('#export-boxextent').addClass('ui-state-focus');
	},
	deactivateBox : function(){
		this.drawRegularPolygon.deactivate();
		$('#export-boxextent').removeClass('ui-state-focus');
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
			crs = $("#export-crsSelectTag").val(),
			data = {};//,
		if (routine.layerlist){
			data.L = routine.layerlist;
		}
		if (routine.addVisibleLayers){
			var t = {},
				visibleLayerNames = "",
				layercount = 0,
				layer = {},
				encFeatures = [];
			for (var i=0;i<map.layers.length;i++){
				layer = map.layers[i];
				t = sMap.cmd.getLayerConfig(layer.name);
				if (layer.visibility && layer.displayInLayerSwitcher && !layer.isBaseLayer && layer.CLASS_NAME != "OpenLayers.Layer.Vector"){
					if (layercount > 0){
						visibleLayerNames += ",";
					}
					if (t.exportlayers) {
						visibleLayerNames += t.exportlayers;
					} else {
						if (t.getFeatureInfo){
							visibleLayerNames += t.getFeatureInfo.layers ? t.getFeatureInfo.layers : t.params.layers;
						}
						else{
							visibleLayerNames += t.params.layers ? t.params.layers : layer.name;
						}
					}
					layercount++;
				}else if (layer.visibility && layer.CLASS_NAME == "OpenLayers.Layer.Vector" && (layer.name == "theDrawLayer" || layer.name == "theInfoLayer")&& layer.features.length){ //theDrawLayer vector
					var features = layer.features;
					var featureFormat = new OpenLayers.Format.GeoJSON();
					var feature;
					for ( var j = 0, len = features.length; j < len; ++j) {
						feature = features[j];
						var featureGeoJson = featureFormat.extract.feature.call(
							featureFormat, feature);
						encFeatures.push(featureGeoJson);
					}
				}
			}
			if (encFeatures.length>0){
				data.J = JSON.stringify(encFeatures);
			}
			if (visibleLayerNames){
				data.L = visibleLayerNames;
			}
			if (layercount > this.maxlayers) {
				alert('För många lager! Det går endast att exportera ' + this.maxlayers + ' lager samtidigt');
				return;
			}
		}
		if (routine.format){
			data.FF = routine.format;
		}
		var bp = "";
		if(this.exportExtentLayer && this.exportExtentLayer.features.length>0){
			var newFeature = this.exportExtentLayer.features[0].clone();
			extent = newFeature.geometry.getBounds();
			var fv = newFeature.geometry.getVertices();
			if (fv.length>0){
				for (var i=0;i<fv.length;i++){
					bp += i!=0 ? "," : "";
					if (this.map.projection != crs && routine.addBaseLayer){
						fv[i].transform(this.map.projection,crs);
					}
					bp += Math.round(fv[i].x) + "," + Math.round(fv[i].y);
				}
				data.BP = bp;
			}
		}else{
			if (this.map.projection != crs && routine.addBaseLayer){
				extent.transform(this.map.projection,crs);
			}
			bp += Math.round(extent.left);
			bp += "," + Math.round(extent.bottom);
			bp += "," + Math.round(extent.right);
			bp += "," + Math.round(extent.top);
			data.B = bp;
		}
		if (routine.addBaseLayer){
			if (routine.emptyBaseLayer){
				data.BL = "";
			} else{
				data.BL = map.baseLayer.name;
			}
			var extx = extent.right - extent.left,
				exty = extent.top - extent.bottom,
				maxext = (extx > exty) ? extx : exty,
				q = Math.round(maxext/this.map.getScale()*this.serviceDPI*100/2.54);
			data.Q = q;
		}
		data.C = crs;
		//alert(url);
		//$('#export_result').prop('src', url);
		$.ajax({
			url : this.postURL,
			headers: {
				"Content Type": "application/x-www-form-urlencoded"
			},
			data : data,
			type : "POST",
			error: function(request,error) {
				alert("Fel! Kontakta ansvarig" + request + error);
			},
			success : function(result){
				$('#export-result').html(result);
				if (result.indexOf("inloggad")>0||result.indexOf("inga")>0){
					$('#export-result').html(result);
				}else{
					$('#export-result').children().css("color", "#023f88" );
				}
			}	
		});
	},
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Export"
	
});