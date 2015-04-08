	
sMap.Layer = OpenLayers.Class({
	
	layersLoading : 0,
	
	/**
	 * Stores the layerName to keep track of which layers have been
	 * added so that one layer is not added twice.
	 */
	addedLayers : [],
	
	initialize : function(map, options) {
		options = options || {};
		this.map = map;
		this.map.events.register("removelayer", this, function() {
			// Each time a layer is removed all z-indexes will be reset.
			var layers = this.map.layers,
				layer = null;
			for (var i=0,len=layers.length; i<len; i++) {
				layer = layers[i];
				if (layer.zIndex) {
					layer.setZIndex(layer.zIndex);
				}
			}
		});
	},
	
	/**
	 * Standard method for adding a layer to the map.
	 * An array keeps track of which layers have been
	 * added so one layer is not added twice.
	 * @param layer {OpenLayers.Layer}
	 * @returns {void}
	 */
	addLayer : function(layer) {
		var loadStart = "loadstart",
			loadEnd = "loadend",
			notSupportedLayers = ["Google"]; // These layers do not support loadstart/loadend although it exists in EVENT_TYPES
		
		if (!sMap.events.mapInitiated) {
			// Bug-fix: If event registered during start-up (when WMS-layer is in URL), an error occurres.
			notSupportedLayers.push("WMS");
		}
		
		var supportsEvents = $.inArray(layer.CLASS_NAME.split(".")[2], notSupportedLayers) === -1;
		if (layer.protocol) {
			// Hack – otherwise WFS-layer does not become visible.
			supportsEvents = false;
		}
		if (supportsEvents === true) {
			layer.events.register(loadStart, this, function() {
				this.registerLoadingProgress(1);
				if (!this.triggeredStartedLoading) {
					this.triggeredStartedLoading = true;
					sMap.cmd.loading(true, {bg: false});
					sMap.events.triggerEvent("layersstartedloading", this, {
						layer : layer
					});
				}
			});
			var onEventEnd = function(e) {
				this.registerLoadingProgress(-1);
				//e.object.events.unregister(loadEnd, self, onEventEnd);
			};
			layer.events.register(loadEnd, this, onEventEnd);
		}
		else {
			this.registerLoadingProgress(0);
		}
		this.map.addLayer(layer);
		
		// sMap implements zIndex here for ALL layers (not only vectors layers).
		if (layer.zIndex) {
			layer.setZIndex(layer.zIndex);
		}
		this.addedLayers.push(layer.name);
		sMap.events.triggerEvent("layervisible", this, {
			layer: layer
		});
	},
	
	/**
	 * Make a layer based on standard sMap configuration and add
	 * the layer to the map.
	 * 
	 * @param t {Object} See specifications for sMap layers (baselayers and overlays).
	 * @returns {void}
	 */
	addLayerWithConfig : function(t) {
		t = t || {};
		
		if (!t.layerType) {
			return false;
		}
		// Set default options
		t.options = t.options || {};
		t.options.isBaseLayer = t.options.isBaseLayer || false; 
		
		// Don't add layer if already added.
		if ($.inArray(t.name, this.addedLayers) !== -1) {
			return false;
		}
		var layerType = t.layerType ? t.layerType.toUpperCase() : null,
			layer=null;
		
		if (layerType==="WMS") {
			t.options = t.options || {};
			t.options.transitionEffect = t.options.transitionEffect || "resize";
			/**
			 * Spare us from having to specify the filter parameter 
			 * both as a OpenLayers.Filter object and as XML in the config.
			 * The WMS parameter 'filter' is created here (converted to XML).
			 */
			if (t.filter) {
				var writer,
					v = t.filter.version;
				if (!v) {
					writer = new OpenLayers.Format.Filter.v1_1_0();
				}
				else {
					// Pick a filter version
					switch (v) {
					case "1.1.0":
						writer = new OpenLayers.Format.Filter.v1_1_0();
						break;
					case "1.0.0":
						writer = new OpenLayers.Format.Filter.v1_0_0();
						break;
					default:
						writer = new OpenLayers.Format.Filter.v1_1_0();
					}
				}
				t.params.filter = new OpenLayers.Format.XML().write(writer.write(t.filter));
			}
//			var isVersion13 = t.params.version && parseFloat(t.params.version) >= 1.3;
			layer = new OpenLayers.Layer.WMS(
				t.name,
				t.URL,
				t.params,
				t.options
			);
			if (t.params.format == "image/jpeg") {  //Hack. Otherwise if image/jpeg OL sets png.
				layer.params.FORMAT = "image/jpeg";
			}
		}
		else if (layerType==="TILECACHE") {
			t.options = t.options || {};
			t.options.transitionEffect = t.options.transitionEffect || "resize";
			layer = new OpenLayers.Layer.TileCache(
				t.name,
				t.URL,
				t.layer,
				t.options
			);
		}
		else if (layerType==="VECTOR") {
			var geomType = t.geomType ? t.geomType.toUpperCase() : "point";
			var styleMap = this.makeStyleMap(t.style, geomType);
			var options = $.extend(true, {}, (t.options || {}), {
					rendererOptions: {yOrdering: true, zIndexing: true},
					styleMap : styleMap,
					strategies: t.strategies,
					protocol: t.protocol
			});
			options.isBaseLayer = options.isBaseLayer || false; // Make false default for vector layers
			layer = new OpenLayers.Layer.Vector(t.name, options);
			if (!t.protocol) {
				// Fetch data "manually" (not from "WFS" protocol).
				
				var dataFormat = t.format ? t.format.toUpperCase() : null;
				// Assign OpenLayers formats
				var olFormat = null;
				if (dataFormat=="GEOJSON") {
					olFormat = new OpenLayers.Format.GeoJSON();
				}
				else if (dataFormat=="GEORSS") {
					olFormat = new OpenLayers.Format.GeoRSS();
				}
				else if (dataFormat=="WKT") {
					olFormat = new OpenLayers.Format.WKT();
				}
				else {
					if (dataFormat) {
						olFormat = dataFormat;
					}
					else {
						debug.warn("Lagret: " + t.name + " har inget angivet/passande format. Ändra detta i config-filen.");
						return;
					}
				}
				var url = t.URL;
				
				this.map.events.register("zoomend", this, function(e) {
					layer.redraw();
				});
				
				// The events "loadstart" and "loadend" have to be triggered manually.
				var fs, f, i, x, y;
				$.ajax({
					url: config.proxy ? config.proxy + url : url,
					context: this,
					dataType: "text",
					success: function(data) {
						var fs = olFormat.read(data);
						if (t.shiftCoords) {
							for (i=0,len=fs.length; i<len; i++) {
								// Due to new (?) standards (adopted by OL but not WFS), lat comes before long in geojson.
								f = fs[i];
								x = f.geometry.x;
								y = f.geometry.y;
								f.geometry.x = y;
								f.geometry.y = x;
							}							
						}
						if (t.transformFrom) {
							var fromepsg = new OpenLayers.Projection(t.transformFrom),
								toepsg = new OpenLayers.Projection(this.map.projection);
							for (i=0,len=fs.length; i<len; i++) {
								// transform with proj4js
								f = fs[i];
								f.geometry.transform(fromepsg,toepsg);
							}							
						}
						layer.addFeatures(fs);
						sMap.events.triggerEvent("vectorloaded", this, {
							layerName: layer.name
						});
					},
					error: function(a,b,c) {
						debug.log("Layer request error " + b);
					},
					complete: function() {}
				});
				
//				var request = OpenLayers.Request.GET({
//					url: url,
//					callback: function(data) {
//						var features = olFormat.read(data.responseText);
//						layer.addFeatures(features);
//					}
//				});
			}
		}
		else if (layerType=="GOOGLE") {
			layer = new OpenLayers.Layer.Google(t.name, t.options);
		}
		else if (layerType=="OSM") {
			t.options = t.options || {};
			t.options.transitionEffect = t.options.transitionEffect || "resize";
			layer = new OpenLayers.Layer.OSM(t.name);
		}
		else if (layerType=="ARCGISCACHE") {
			layer = new OpenLayers.Layer.ArcGISCache(t.name, t.URL, t.options);
			layer.maxExtent = this.map.maxExtent;
		}
		else if (layerType==="TMS") {
			t.options = t.options || {};
			t.options.transitionEffect = t.options.transitionEffect || "resize";
			layer = new OpenLayers.Layer.TMS(
				t.name,
				t.URL,
				t.options
			);
		}
		else if (layerType==="WMTS") {
			// If tile matrix identifiers differ from zoom levels (0, 1, 2, ...)
		    // then they must be explicitly provided. And if topLeftCorner differs from mapExtent they must also be provided.
			var resolutions = t.options.resolutions ? t.options.resolutions.length : this.map.resolutions.length;
		    var matrixIds = t.matrixIds ? t.matrixIds : new Array(resolutions);
		    if (t.matrixSetTops && t.matrixSetTops.length) {
			    for (var i=0; i<resolutions; ++i) {
			        matrixIds[i] = {identifier: t.matrixSet+":" + i, topLeftCorner: new OpenLayers.LonLat(t.matrixSetLeft, t.matrixSetTops[i])};
			    }
		    }
			layer = new OpenLayers.Layer.WMTS({
				name:t.name,
				url:t.URL,
				layer:t.layer,
				style:t.style,
				matrixSet:t.matrixSet,
				matrixIds: matrixIds,
				format: t.options.format || "image/jpg",
				attribution: t.options.attribution || "",
				transitionEffect : t.options.transitionEffect || "resize",
				buffer : t.options.buffer || 0,
				isBaseLayer : t.options.isBaseLayer || true,
				options: t.options
			});
		}
		else {
			return;
		}
		if (t.displayInLayerSwitcher) {
			layer.displayInLayerSwitcher = true;
			layer.options.displayInLayerSwitcher = true;
		}
		layer.selectable = t.selectable || false;
		this.addLayer(layer);
	},

	/**
	 * Standard method for removing a layer from sMap. Also
	 * removes layer name from the sMap array which keeps track
	 * of which layers have been added to the map.
	 * @param layer
	 * @returns
	 */
	removeLayer : function(layer) {
		var index = this.addedLayers.indexOf(layer.name);
		this.addedLayers.splice(index, 1); // remove layer name from array
		this.map.removeLayer(layer);
		if (layer) {
			// Note! layer cannot be used as a parameter after being destroyed.
			sMap.events.triggerEvent("layerhidden", this, {
				layer: layer
			});
			layer.destroy();
			layer = null;
		}
	},
	/**
	 * Add all overlays where 'startVisible' equals true.
	 * @param overlays {Array({Object})} An array with config for overlays.
	 * @returns {void}
	 */
	addOverlays : function(overlays) {
		for (var i=0,len=overlays.length; i<len; i++) {
			var t = overlays[i];
			if (t.startVisible===true) {
				this.addLayerWithConfig(t);
			}
		}
	},
	
	/**
	 * Call setVisibility(true). If layer does not exist
	 * call this.addLayer. this.showLayer and this.hideLayer
	 * are thought of to be used by a layerSwitcher to toggle
	 * a layer. If layer is already invisible, nothing happens.
	 * 
	 * @param layerName {String}
	 * @returns {void}
	 */
	showLayer : function(layerName) {
		var layer = this.map.getLayersByName(layerName)[0];
		if (!layer) {
			var t = sMap.cmd.getLayerConfig(layerName);
			this.addLayerWithConfig(t);
			layer = this.map.getLayersByName(layerName)[0];
		}
		if (layer.getVisibility() !== true) {
			layer.setVisibility(true);
			layer.visibility = true;
			sMap.events.triggerEvent("layervisible", this, {
				layer : layer
			});
		}
		 
	},
	
	/**
	 * Hide the layer by calling setVisibility(false).
	 * If layer does not exist nothing happens. If
	 * layer is already visible, nothing happens either.
	 * 
	 * @param layerName {String}
	 * @returns {void}
	 */
	hideLayer : function(layerName) {
		var layer = this.map.getLayersByName(layerName)[0];
		if (layer && layer.getVisibility()) {
			layer.setVisibility(false);
			sMap.events.triggerEvent("layerhidden", this, {
				layer : layer
			});
		}
	},
	
	/**
	 * Hide all overlays currently visible.
	 * 
	 * @returns {void}
	 */
	hideAllLayers: function() {
		var overlays = sMap.config.layers.overlays,
			layers = [],
			layer = null,
			layerName = null,
			foundLayers = null,
			t = null;
		for (var i=0,len=overlays.length; i<len; i++) {
			foundLayers = this.map.getLayersByName(overlays[i].name);
			layer = foundLayers.length ? foundLayers[0] : null;
			if (layer && layer.getVisibility() && !layer.isBaseLayer && layer.displayInLayerSwitcher) {
				layers.push(layer.name);
			}
		}
		for (var i=0,len=layers.length; i<len; i++) {
			layerName = layers[i];
			this.hideLayer(layerName);
		}
	},
	
	/**
	 * Change the baselayer to the one with this name.
	 * If the layer does not exist - nothing happens.
	 * @param layerName {String}
	 * @returns {void}
	 */
	setBaseLayer : function(layerName) {
		var layer = this.map.getLayersByName(layerName)[0];
		if (layer) {
			this.map.setBaseLayer(layer);
		}
		else {
			debug.log(sMap.lang.errBaselayerDoesNotExist+" layerName: "+layerName);
		}
	},
	/**
	 * Add all baselayers to the map.
	 * @param baselayers {Array({Object})} An array with config for baselayers.
	 * @returns {void}
	 */
	addBaselayers : function(baselayers) {
		if (!baselayers || !baselayers.length) {
			// allOverlays = true allows having no baselayers in the map.
			// See OpenLayers documentation for more info.
			this.map.allOverlays = true;
			return;
		}
		for (var i=0,len=baselayers.length; i<len; i++) {
			var t = baselayers[i];
			this.addLayerWithConfig(t);
			if (!this.startingBaselayerName) {
				this.startingBaselayerName = t.name;
			}
		}
		this.map.setBaseLayer( this.map.getLayersByName(this.startingBaselayerName )[0]);
	},
	
	/**
	 * Internal method to keep track of whether all layers
	 * have been loaded.
	 * @param incrementor {Integer}
	 * @returns {void}
	 */
	registerLoadingProgress : function(incrementor) {
		this.layersLoading += incrementor;
		if (this.layersLoading <= 0) {
			sMap.events.triggerEvent("layersloaded", this, {});
			sMap.cmd.loading(false);
			//sMap.events.remove("layersloaded");
			sMap.events.layersLoaded = true;
			this.triggeredStartedLoading = false; // reset so that layersstartedloading can be triggered again
		}
	},
	
	/**
	 * 
	 * @param t {Object} An object with one or more of these properties:
	 * 		- default : {Object},
	 * 		- select : {Object},
	 * 		- temporary : {Object}
	 * 		...
	 * @param geomType {String} Either of "point", "line", "polygon".
	 * @returns {OpenLayers.StyleMap}
	 */
	makeStyleMap : function(t, geomType) {
		t = t || {};
		
		geomType = geomType || "point";
		geomType = geomType.toUpperCase();
		
		var defaultStyle = t["default"] || {},
			selectStyle = t["select"] || {},
			_defaultStyle = {},
			_selectStyle = {};
		
		var zIndexObj = {
				POINT : 200,
				LINE : 100,
				POLYGON : 0
		};
			
		if (geomType=="POINT") {
			// Make the styles
			_defaultStyle = {
				pointRadius : 5,
				strokeOpacity : 1,
				strokeWidth: 1,
				fillOpacity : 1,
				fillColor : "#ffffff",
				zIndex : zIndexObj[geomType],
				graphicXOffset : 0,
				graphicYOffset : 0,
				zIndex : zIndexObj[geomType]
			};
			_selectStyle = {
				pointRadius : 7,
				strokeOpacity : 1,
				fillOpacity : 1,
				fillColor : "#33ffff",
				strokeColor : "#33ffff",
				strokeWidth: 2,
				graphicXOffset : 0,
				graphicYOffset : 0,
				zIndex : zIndexObj[geomType]
			};
		}
		
		// LINE
		else if (geomType=="LINE") {
			_defaultStyle = {
				 strokeOpacity: 1,
				 strokeWidth: 2,
				 zIndex : zIndexObj[geomType]
			};
			_selectStyle = {
				strokeWidth: 10,
				strokeColor: "#33ffff",
				zIndex : zIndexObj[geomType]
			};	
		}
		
		// POLYGON
		else if (geomType=="POLYGON") {
			_defaultStyle = {
				 strokeOpacity: 1,
				 fillOpacity : 0.5,
				 strokeWidth: 2,
				 zIndex : zIndexObj[geomType]
			};
			_selectStyle = {
				strokeOpacity: 1,
				fillOpacity : 0.5,
				strokeWidth: 2,
				strokeColor: "#33ffff",
				fillColor : "#33ffff",
				zIndex : zIndexObj[geomType]
			};
		}
		
		// Override defaults with the provided style.
		var def = $.extend({}, _defaultStyle, defaultStyle),
			sel = $.extend({}, _selectStyle, selectStyle);
		var rulesDef = def.rules || null,
			rulesSel = sel.rules || null;
		// We are moving rules to the stylemap's 2nd parameter, so remove these guys
//		delete def["rules"];
//		delete sel["rules"];
		
		var styleMap = new OpenLayers.StyleMap({
				"default" : new OpenLayers.Style(def, rulesDef),
				"select" : new OpenLayers.Style(sel, rulesSel)
		});
		return styleMap;
	},
	
	CLASS_NAME : "sMap.Layer"
		
});

	