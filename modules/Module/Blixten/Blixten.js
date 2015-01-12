/**
 * @author Johan Lahti
 * @copyright Malmö stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Blixten = OpenLayers.Class(sMap.Module, {
	
	/**
	 * Prefix used for IDs and CSS class names.
	 */
	prefix: "blixten-",
	
	/**
	 * Keeps track of when a request is on going.
	 */
	searching: null,
	
	/**
	 * Buffer settings
	 */
	defaultBuffer: null,
	minBuffer: null,
	maxBuffer: null,
	
	/**
	 * The feature namespace (can only be one!).
	 */
	featureNS: "malmows",
	
	/**
	 * Listeners:
	 * - blixtenrequest: The module starts requesting features inside a polygon (circle).
	 * 			This listener will create the WFS-request and trigger "blixtenresponse"
	 * 			when the response has been processed.
	 * - fetchedfeatures: When the response of the request comes.
	 */
	EVENT_LISTENERS : ["blixtenrequest", "selected", "unselected"],
	
	/**
	 *
	 */
	EVENT_TRIGGERS : ["blixtenrequest", "blixtenfeaturesfound"],
	
	/**
	 * Modules that will be deactivated when this activates
	 */
	DEACTIVATE_MODULES: [
	                     "sMap.Module.MeasureDialog"
	                     ],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Blixten.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Blixten.prototype.EVENT_TRIGGERS.concat(
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
		for (var i=0,len=this.DEACTIVATE_MODULES.length; i<len; i++) {
			var mods = this.map.getControlsByClass(this.DEACTIVATE_MODULES[i]);
			if (mods.length) {
				mods[0].deactivate();
			}
		}
		
		// Hidden egg
		if (!($.browser.msie && parseInt($.browser.version) < 9)) {
			$("#toolbar-maindiv").off("dblclick").on("dblclick", function(e) {
				if (e.altKey) {
					var img = $("<img src='img/apic.png' width='300' height='300'></img>");
					img.css({
						"position": "absolute",
						"z-index": "2000",
						"right": "-300px",
						"top": "100px",
						"opacity": "0"
					});
					$("#mapDiv").append(img);
					img.animate({
						"right": "1px",
						"opacity": "1"
					}, 500, function() {
						$(this).animate({
							"right": "-300px",
							"opacity": "0"
						}, 500, function() {
							$(this).empty().remove();
						});
					});
				}
			});
		}
		// hidden egg end
		
		// Deactivate Select module so that clicking in the map
		// does not trigger a GET request. We only want to
		// use Select programmatically.
		sMap.events.triggerEvent("deactivate", this, {
			module: "sMap.Module.Select"
		});
		
		if ( !this.map.getLayersByName( this.layer.name ).length ) {
			this.map.addLayer(this.layer);
		}
		if (!this.drawPointControl) {
			this.drawPointControl = new OpenLayers.Control.DrawFeature(this.layer, OpenLayers.Handler.Point);
		}
		this.map.addControl(this.drawPointControl);
		this.drawPointControl.activate();
		this.showDialog();
		
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		$("#toolbar-maindiv").off("dblclick"); // remove hidden egg
		this.drawPointControl.deactivate();
		this.map.removeControl(this.drawPointControl);
		this.layer.destroyFeatures();
		
		// Don't remove the feature because we want to see
		// where we searched last time.
//		this.layer.destroyFeatures();
		if (this.dialogDiv.dialog("isOpen")) {
			return this.hideDialog();
		}
		sMap.events.triggerEvent("activate", this, {
			module: "sMap.Module.Select"
		});
		// Call the deactivate function of the parent class
		return sMap.Module.prototype.deactivate.apply(
	            this, arguments
	        );
	},
	
	destroy : function() {
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
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
			label : this.lang.toolButtonText,
			iconCSS : "ui-icon-info",
			tagID : "button-blixten",
			bindActivation: true,
			on: this.activate,
			off: this.deactivate,
			left: this.left,
			right: this.right,
			margin: this.margin,
			menuId: this.addToToolsMenu
		});
		
		// Add layer and draw point tool.
		this.layer = new OpenLayers.Layer.Vector("blixtenlayer", {
			zIndex: this.zIndex,
			styleMap: new OpenLayers.StyleMap({
				"default": new OpenLayers.Style(this.styles["default"]),
				"select": new OpenLayers.Style(this.styles["select"]),
				"temporary": new OpenLayers.Style(this.styles["temporary"])
			}),
			rendererOptions: {yOrdering: true, zIndexing: true}
			
		});
		this.map.addLayer(this.layer);
		this.layer.setZIndex(this.zIndex);
		
		/**
		 * When a feature is added - remove the existing feature if any
		 * and replace the new one with a buffer of the point so that
		 * we get a "real" circle and not just a point with a "buffer style".
		 */
		this.layer.events.register("sketchcomplete", this, function(e) {
			this.loading(true);
			setTimeout(function() {
				self.drawPointControl.deactivate(); // Temporarily deactivate the drawing tool
				self.layer.destroyFeatures();
				self.doRequest(e.feature.geometry);
			}, 100);
			return false; // remove the point feature
		});
		this.radiusUnits = this.defaultBuffer;
		this.changeFeatureRadius();
		
		this.map.events.register("zoomend", this, this.changeFeatureRadius);
		
	},
	
	/**
	 * Notify the user that the map is loading.
	 * @param change {Boolean} true: show, false: hide
	 */
	loading: function(change) {
		change = change || false;
		if (change === true) {
			OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait");
			sMap.cmd.loading(true, {
				text: this.lang.textLoading,
				bg: true
			});
		}
		else {
			OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait");
			sMap.cmd.loading(false, {fast: true});
		}
	},
	
	/**
	 * Do a request for features within the circle area.
	 * @params circle {OpenLayers.Feature.Vector}
	 * @returns {void}
	 */
	doRequest: function(geometry) {
		if (this.searching === true) {
			return; // false;
		}
		
		// Add a lightning animation/image so user understands that the serach has begun
		if (!this.anim && this.useAnimation) {
			this.anim = $("<img src='modules/Module/Blixten/img/Lightning_bolt.gif' id='blixten-anim' />");
			$(this.map.viewPortDiv).append(this.anim);
			var px = this.map.getViewPortPxFromLonLat( new OpenLayers.LonLat( geometry.x, geometry.y ));
			this.anim.css({
				"left": parseInt(px.x)-10 + "px",
				"top": parseInt(px.y)-83 + "px"
			});
		}
		if (this.anim) {
			this.anim.show();
		}
		
		// Get the value of the checkbox.
		var searchOnlyVisible = this.dialogDiv.find("input[type='checkbox']").prop("checked");
		
		var layers = [];
		if (searchOnlyVisible !== true) {
			// Get all WMS-layers in the map.
			
			var layer = null,
				t = null;
			
			// First add all WMS-layers which are not visible, to the map.
			// Then make them invisible.
			var overlays = sMap.config.layers.overlays;
			for (var i=0,len=overlays.length; i<len; i++) {
				t = overlays[i] || {};
				if (t.blixtable && t.layerType.toUpperCase() == "WMS") {
					layer = t.name && this.map.getLayersByName(t.name).length ? this.map.getLayersByName(t.name)[0] : null;
					if (!layer) {
						// Add layer to map and then make it invisible
						sMap.events.triggerEvent("addlayerwithconfig", this, {
							config: t
						});
						layer = this.map.getLayersByName(t.name)[0];
						layer.setVisibility(false);
					}
					layers.push(layer);
				}
			}
		}
		else {
			var _layers = this.getBlixtableLayers();
			_layers = _layers.WMS || []; // Filter selectable WMS-layers.
			for (var i=0,len=_layers.length; i<len; i++) {
				if (_layers[i].blixtable) {
					layers.push(_layers[i]);
				}
			}
		}
		sMap.events.triggerEvent("blixtenrequest", this, {
			geometry: geometry,
			layers: layers
		});
		
		// Add a circle (well almost) where user clicked. Do this while the request have been done.
		var geomCircle = OpenLayers.Geometry.Polygon.createRegularPolygon(geometry, this.radiusUnits, 20, 0);
		var circle = new OpenLayers.Feature.Vector(geomCircle);
		this.layer.addFeatures([circle]);
	},
	
	/**
	 * Get the currently visible and blixtable layers in the map.
	 * Keyed by class names last component, like:
	 * {WMS: [layer1, layer2], Vector: [layer1, layer2], ...}
	 * 
	 * @returns {Object}
	 */
	getBlixtableLayers: function() {
		var layers = sMap.map.layers,
		visibleLayers = {};
		for (var i=0,len=layers.length; i<len; i++) {
			var layer = layers[i];
			if (layer.getVisibility() && layer.calculateInRange() && layer.blixtable) {
				var cName = layer.CLASS_NAME.split(".")[2];
				if (!visibleLayers[cName]) {
					visibleLayers[cName] = [];
				}
				visibleLayers[cName].push(layer);
			}
		}
		return visibleLayers;
	},
	
	/**
	 * Convert map units to pixels.
	 * @param val {Number} Distance in map units to be converted to pixels.
	 * @returns {Integer} Pixels.
	 */
	getPixelRadiusFromUnits: function(val) {
		if (!this.map.getResolution) {
			return null;
		}
		var res = this.map.getResolution();
		if (!res) {
			return null;
		}
		var r = val / res;
		r = r < 1 ? 1 : parseInt( Math.round(r) );
		return r;
	},
	
	/**
	 * Change the style of the layer (this.layer) so that the radius
	 * corresponds to the new radius, stored in this.radiusUnits .
	 */
	changeFeatureRadius: function() {
		// Change the layer style
		
		var radiusPixels = this.getPixelRadiusFromUnits(this.radiusUnits);
		if (!radiusPixels) {
			return false;
		}
		
		var styles = this.layer.styleMap.styles;
		styles["default"].defaultStyle.pointRadius = radiusPixels;
		styles["temporary"].defaultStyle.pointRadius = radiusPixels;
		
	},
	
	/**
	 * Show the blixten-dialog.
	 */
	showDialog: function() {
		if (!this.dialogDiv) {
			this.makeDialog();
		}
		this.dialogDiv.dialog("open");
		return true;
	},
	/**
	 * Close the blixten-dialog.
	 */
	hideDialog: function() {
		this.dialogDiv.dialog("close");
		return true;
	},
	/**
	 * Create the dialogDiv and the dialog.
	 */
	makeDialog: function() {
		this.dialogDiv = $("<div id='"+this.prefix+"dialogdiv' />");
		var self = this;
		this.dialogDiv.dialog({
			title: this.lang.dialogTitle,
			position: this.dialogPosition,
			width: 325,
			height: 364,
			resizable: true,
			close: function() {
				self.layer.setZIndex(self.zIndex);
				self.deactivate();
			}
		});
		sMap.util.addDialogMinimizeButton(this.dialogDiv);
		
		// Fill the dialog
		
		// 1. Intro text
		var labelIntro1 = $("<label class='"+this.prefix+"dialoglabel' id='"+this.prefix+"labelintro1'>"+this.lang.introText1+"</label>"),
			labelIntro2 = $("<label class='"+this.prefix+"dialoglabel' id='"+this.prefix+"labelintro2'>"+this.lang.introText2+"</label>"),
			labelIntro3 = $("<label class='"+this.prefix+"dialoglabel' id='"+this.prefix+"labelintro3'>"+this.lang.introText3+"</label>");
		this.dialogDiv.append(labelIntro1).append(labelIntro2).append(labelIntro3);
		
		// 2. Search radius
		var sliderDiv = $("<fieldset id='"+this.prefix+"sliderdiv' />"),
			labelRadius = $("<legend>"+this.lang.labelRadius+"</legend>"),
			radiusEntry = $("<input size='3' id='"+this.prefix+"radiusentry' disabled />"),
			radiusUnit = $("<label>"+this.lang.bufferUnit+"</label>"),
			slider = $("<div id='"+this.prefix+"sliderradius' />");
		this.dialogDiv.append(sliderDiv);
		sliderDiv.append(labelRadius).append(radiusEntry).append(radiusUnit).append(slider);
		
		radiusEntry.val(this.defaultBuffer);
		
		var self = this;
		slider.slider({
			min: this.minBuffer,
			max: this.maxBuffer,
			range: false,
			step: this.step || null,
			value: radiusEntry.val(),
			slide: function(e, ui) {
				self.radiusUnits = ui.value==0 ? 1 : ui.value;
				radiusEntry.val(self.radiusUnits);
				self.changeFeatureRadius();
			}
		});
//		radiusEntry.change(function(e, ui) {
//			var val = $(this).val();
//			// If step is given - round to the step size using this formula.
//			if (self.step) {
//				val = Math.round( val * (1/self.step) ) * self.step;
//				$(this).val(val);
//			}
//			// Round to max or min if the provided number is out of range.
//			if ( val > self.maxBuffer ) {
//				val = self.maxBuffer;
//				$(this).val(val);
//			}
//			else if ( val < self.minBuffer ) {
//				val = self.minBuffer == 0 ? 1 : self.minBuffer;
//				$(this).val(val);
//			}
//			
//			// If val is 0 -> set it to 1 since we don't want a circle with radius 0.
//			if (val == 0) {
//				val = 1;
//				$(this).val(val);
//			}
//			slider.slider("option", "value", val).change();
//		});
		
		// --- Fix IE's CSS ---
//		if (sMap.db.browser.msie) {
//			this.dialogDiv.find("legend").css({
//				"margin-bottom": "5px"
//			});
//			this.dialogDiv.find("fieldset").css({
//				"padding": "0 7px 5px 7px"
//			});
//		}
		
		// Deactivate draw point tool when hovering the popup dialog and 
		// activate again when cursor leaves the dialog.
		this.dialogDiv.parent().mouseenter(function(e) {
			var ctrls = self.map.getControlsByClass("OpenLayers.Control.DrawFeature");
			if (ctrls.length) {
				ctrls[0].deactivate();
				// Bugg fix - select layer's z-index moves backwards again.
				var layers = self.map.getLayersByName("selectLayer");
				if (layers.length) {
					layers[0].setZIndex(self.zIndex);
				}
			}
		});
		this.dialogDiv.parent().mouseleave(function(e) {
			var ctrls = self.map.getControlsByClass("OpenLayers.Control.DrawFeature");
			if (ctrls.length) {
				ctrls[0].activate();
			}
		});
		
		
		
	},
	
	makeWmsParams: function(geometry) {
		var filter = new OpenLayers.Filter.Spatial({
		        type: OpenLayers.Filter.Spatial.DWITHIN,
		        distanceUnits: 'm',
		        distance: parseInt(this.radiusUnits),
		        value: geometry
		});
		var version = "1.0.0";
		var formatXml = new OpenLayers.Format.XML(),
			filter_1_0 = new OpenLayers.Format.Filter({version: version});
		filterXml = formatXml.write( filter_1_0.write(filter) );
		var params = {
			filter: filterXml,
			service: "WFS",
			version: version,
			request: "getfeature",
			srsName: this.map.projection,
			format: "text/geojson",
			maxFeatures: 10000,
			outputFormat: "json"
		};	
		return params;
	},
	
	counter: 0,
	
	checkCounter: function() {
		if (this.counter <= 0) {
			this.afterFetch(this.responseData);
		}
	},
	
	// --------------- Listeners ----------------------------------------------------------
	
	/**
	 * @params e {Object}
	 * 	- feature {OpenLayers.Feature.Vector}
	 */
	blixtenrequest: function(e) {		
		var geometry = e.geometry,
			layers = e.layers,
			self = this;
		this.searching = true;
		
		if (!layers || !layers.length) {
			// Do not request anything if there are no layers to request.
			//this.layer.destroyFeatures();
			this.afterFetch();
			return;
		}
		this.counter = 1; //layers.length; // reset counter
		this.responseData = [];
		// Request each WMS-service, one by one.
		var layer,
			url,
			t;
		var paramsObj = this.makeWmsParams(geometry);
		
		var layersArr = [],
			layersDict = {}; // Gives easy access to layer config from wms layer name
		
		var onDone = function(layersArr, layersDict) {
			// url = "http://geoserver.smap.se/geoserver/wfs";
			
			var o = layersDict[layersArr[0]];
			url = o.URL.split("?")[0];

			var layersString = layersArr.join();
			$.extend(paramsObj, {typename: layersString});
			$.ajax({
				url: self.useProxy ? sMap.config.proxyHost + encodeURIComponent(url) : url,
				type: "POST",
				dataType: "text",
				data: paramsObj,
				context: self,
				error: function(qXHR, textStatus, errorThrown) {
					debug.log("Erroneous response from WMS-request: "+textStatus);
				},
				success: function(data) {
					var format = new OpenLayers.Format.GeoJSON({
						ignoreExtraDims: true
					});
					var fs = format.read(data);
					
					// Create a layerName for the features so it can be handled by BlixtenPopup
					for (var j=0,len=fs.length; j<len; j++) {
						var f = fs[j];
						var wmsName = this.featureNS+":"+f.fid.split(".")[0];
						var t = layersDict[wmsName];
						f.layerName = t.name;
					}
					this.responseData = this.responseData.concat(fs);
				},
				complete: function() {
					this.counter -= 1;
					this.checkCounter();
				}
			});
		};		
		
		if (window.Worker) {
			var worker = new Worker("modules/Module/Blixten/Blixten_worker.js");
			worker.addEventListener('message', function(e) {
				var t = e.data;
				layersArr = t.layersArr;
				layersDict = t.layersDict;
//				console.log("Worker done!");
				onDone(layersArr, layersDict);
				worker.terminate();
				
			}, false);
			var layerNames = $.map(layers, function(val, i) {
				return val.name;
			});
			
			worker.postMessage({configLayers: $.extend(true, {}, sMap.config.layers), layerNames: layerNames});
		}
		else {
			for (var i=0,len=layers.length; i<len; i++) {
				layer = layers[i];
				t = sMap.cmd.getLayerConfig(layer.name);
				
				var fullWmsName = t.params.layers;
				var wmsNameArr = fullWmsName.split(","),
				wmsName = null;
				for (var j=0,lenj=wmsNameArr.length; j<lenj; j++) {
					wmsName = wmsNameArr[j];
					layersDict[wmsName] = t;
				}
				if ( $.inArray(fullWmsName, layersArr) === -1 ) {
					layersArr.push(fullWmsName);
				}
			}
			onDone(layersArr, layersDict);
		}
	},
	
	selected: function(e) {
		this.layer.setZIndex(this.zIndex);
	},
	unselected: function(e) {
		this.layer.setZIndex(this.zIndex);
	},
	fetchedResult: function() {
		
	},
	
	afterFetch: function(features) {
		this.loading(false);

		this.searching = false;
		if (this.anim) {
			this.anim.hide();
		}
		
		if (!features || !features.length) {
			alert("Hittade inga objekt!");
			this.drawPointControl.activate();
		}
		else {
			sMap.events.triggerEvent("blixtenfeaturesfound", this, {
				features: features
			});
			this.layer.setZIndex(this.zIndex);
		}
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Blixten"
	
});