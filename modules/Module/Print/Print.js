/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Print = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The layer where the print extent is shown. This layer
	 * is removed on event "beforeprint" and added again on 
	 * "afterprint".
	 */
	layer : null,
	
	/**
	 * The ID of the div that is being printed, containing the
	 * image and an optional header.
	 */
	divID : "print-div",
	
	EVENT_LISTENERS : ["beforeprint", "afterprint"],
	
	/**
	 * 	 - beforeprint: When this event is triggered, other modules can listen
	 *   		to the event and add/remove layers from the map.layers array
	 *   		as they like. Note! If the module likes to keep the layer
	 *   		after printing it has to listen to the "afterprint" event.
	 *   - afterprint: Allow modules to put removed layers back to the map.
	 */
	EVENT_TRIGGERS : ["beforeprint", "afterprint"],
	
	/**
	 * The print dialog window
	 */
	dialogDiv : null,
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Print.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Print.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		this.is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		this.createLayer();
		
		var size = this.map.getSize();
		this.addExtentFeature(size.h-50, size.h-50);
		
		// Open the print window
		this.createDialog();
		
		// Register listeners
		this.map.events.register("moveend", this, this.recenterExtentFeature);
		this.map.events.register("zoomend", this, this.recenterExtentFeature);
		
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		// Unregister events
		this.map.events.unregister("moveend", this, this.recenterExtentFeature);
		this.map.events.unregister("zoomend", this, this.recenterExtentFeature);
		
		if (this.layer) {
			//this.map.removeLayer(layer);
			this.layer.destroy();
			this.layer = null;
		}
		// Close the print window
		if (this.dialogDiv && this.dialogDiv.length) {
			this.dialogDiv.dialog("destroy");
			this.dialogDiv.empty().remove();
			this.dialogDiv = null;
		}
		$("#"+this.divID).empty().remove();
		
		this.loading(false);
		
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
		/**
		 * Only use proxy if useProxy is true. Using a proxy with the
		 * print script sometimes means problems.
		 */
		this.proxyHost = this.useProxy ? (sMap.config.proxyHost || "") : "";
		
		var options = {
				index : this.toolbarIndex,
				hoverText : this.lang.labelText,
				iconCSS : "ui-icon-print",
				label : this.lang.btnPrint,
				tagID : "btn-print",
				menuId: this.addToToolsMenu
		};
		var event = this.addToToolsMenu ? "addtomenu" : "addtoolbutton";
		if (this.addToToolsMenu) {
			options.label = this.lang.btnPrintInMenu;
		}
		sMap.events.triggerEvent(event, this, options);
		
		
	},
	
	/**
	 * Remove layers which we don't want to be printed.
	 * Each module has a responsibility to remove their own
	 * layers which should not be printed. They should listen
	 * to "beforeprint" for removing any layers and "afterprint"
	 * to put the layers back again.
	 * @param e {Object}
	 * @returns {void}
	 */
	beforeprint: function(e) {
		if (this.map.getLayersByName(this.layer.name).length) {
			this.map.removeLayer(this.layer);
		}
	},
	
	/**
	 * When printing/exporting is done - destroy the print-map
	 * and put back the extent layer to the map.
	 * @param e {Object}
	 * @returns {void}
	 */
	afterprint: function(e) {
		this.map.addLayer(this.layer); // Put the extent layer back again.
		this.layer.setZIndex(699);
		$("#"+this.divID).empty().remove();
		this.loading(false);
		this.posting = false;
	},
	
	/**
	 * Notify the user that the map is loading.
	 * @param change {Boolean} true: show, false: hide
	 */
	loading: function(change, text) {
		change = change || false;
		text = text || this.lang.textLoadingPrint;
		
		if (change === true) {
			OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait");
			sMap.cmd.loading(true, {
				text: text
			});
		}
		else {
			OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait");
			sMap.cmd.loading(false);
		}
	},
	
	recenterExtentFeature: function() {
		this.addExtentFeature(this.width, this.height);
	},
	
	/**
	 * Create and add the layers which shows the print extent.
	 * @returns {void}
	 */
	createLayer: function() {
		var styleMap = new OpenLayers.StyleMap({
			"default": this.defaultStyle
		});
		this.layer = new OpenLayers.Layer.Vector("printlayer", {
			styleMap: styleMap
		});
		this.map.addLayer(this.layer);
		this.layer.setZIndex(699);
	},
	
	/**
	 * Add an extent feature to the center of the map
	 * with an extent equal to the given width and height.
	 * 
	 * @param width {Integer}
	 * @param height {Integer}
	 * @returns {void}
	 */
	addExtentFeature: function(width, height) {
		
		this.layer.destroyFeatures();
		
		var size = this.map.getCurrentSize(); // map size
		
		// Extent of map in px
		var mapH = size.h,
			mapW = size.w;
		
		// Feature's width and height in px
		var h = width || size.h - 50;
		var w = height || h; // make it square
		
		// Store width and height of current print area.
		this.width = w;
		this.height = h;
		
		// Calculate the features position from the left in the viewport
		// to make it centered.
		var left = mapW/2 - w/2,
			top = mapH/2 - h/2;
		
		// Now, convert this to lonLat
		var sw = this.map.getLonLatFromViewPortPx( new OpenLayers.Pixel( left, top+h ) ),
			ne = this.map.getLonLatFromViewPortPx( new OpenLayers.Pixel( left+w, top ) );
		
		var bounds = new OpenLayers.Bounds(sw.lon, sw.lat, ne.lon, ne.lat);
		var geom = bounds.toGeometry();
		var feature = new OpenLayers.Feature.Vector(geom);
		this.layer.addFeatures([feature]);
	},
	
	createDialog : function() {
		
		var dialogDiv = $("<div id='print-dialog' />");
		this.dialogDiv = dialogDiv;
		
		var self = this;
		sMap.util.createDialog(dialogDiv, {
			width : 220,
			height : 258,
			resizable: false,
			titleText: this.lang.dialogTitle,
			onClose: function() {
				self.deactivate();
			}
		});
		dialogDiv.dialog("open");
		this.fillDialog();
	},
	
	fillDialog: function() {
		var self = this;
		
		/*
		 * Make tabs for print and export.
		 */
		var tabsContainer = $("<div id='printwindow-tabscontainer' />");
		this.dialogDiv.append(tabsContainer);
		
		var tabs = $("<ul><li><a href='#printwindow-printdiv'>"+this.lang.btnPrint+"</a></li><li><a href='#printwindow-exportdiv'>"+this.lang.btnExport
				+"</a></li></ul>");
		tabsContainer.append(tabs);
		var printDiv = $("<div id='printwindow-printdiv' class='print-tabcontent' />"),
			exportDiv = $("<div id='printwindow-exportdiv' class='print-tabcontent' />");
		tabsContainer.append(printDiv).append(exportDiv);
		tabsContainer.tabs({
			select: function(e, ui) {
				if (ui.tab.hash == "#printwindow-printdiv") {
					self.dialogDiv.dialog("option", "height", 258);
				}
				else {
					self.dialogDiv.dialog("option", "height", 192);
				}
				
			}
		});
		
		/*
		 * Make:
		 * 	- a textarea tag
		 * 	- resize buttons (+/-)
		 * 	- image format select tag
		 */
		// Headers for the inputs
		var descriptionHeader = $("<div id='print-description-header'>"+this.lang.description+"</div>"),
			descriptionTag = $("<input type='text' id='print-description-tag' />"),
			extentHeader = $("<div id='print-extentslider-header'>"+this.lang.printArea+"</div>"),
			extentSlider = $("<div id='print-extentslider' />"),
			btnExport = $("<button id='print-btnexport'>"+this.lang.btnExport+"</button>"),
			btnPrint = $("<button id='print-btnprint'>"+this.lang.btnPrint+"</button>");
			
		// Add to COMMON div
		this.dialogDiv.append(extentHeader).append(extentSlider);
		
		// Add to PRINT div
		printDiv.append(descriptionHeader).append(descriptionTag).append(btnPrint);
		
		// Add to EXPORT div
		exportDiv.append(btnExport);
		
		btnExport.button({
			icons : {
				primary : "ui-icon-document"
			}
		});
		btnPrint.button({
			icons : {
				primary : "ui-icon-print"
			}
		});
		
		var size = this.map.getCurrentSize(); // map size
		extentSlider.slider({
			animate: false,
			max: size.h-50,
			min: 100,
			step: 5,
			value: size.h-50, // Starting value
			slide: function(e, ui) {
				self.addExtentFeature(ui.value, ui.value);
			}
		});
		this.extentSlider = extentSlider;
		
		/**
		 * Define on click
		 */
		
		// Print the extent
		btnPrint.click(function() {
			
			/**
			 * Get URL to current map and make width
			 * and height exactly the same as the extent 
			 * feature.
			 */
			self.loading(self.lang.textLoadingPrint);
			self.preparePrint({
				type: "print"
			});
		});
		btnExport.click(function() {
			
			/**
			 * Get URL to current map and make width
			 * and height exactly the same as the extent 
			 * feature.
			 */
			self.loading(self.lang.textLoadingExport);
			self.preparePrint({
				type: "export"
			});
		});
	},
	
	preparePrint: function(config) {
		
		// Get width and height (they have same value since image is a square)
		var val = this.extentSlider.slider("option", "value");
		$.extend(config, {
			val: val,
			headerText: $("#print-description-tag").val() || null
		});
		this.storeLayers();
		this.createMap(config);
		this.print(config);
	},
	
	/**
	 * Store all layers Array({OpenLayers.Layer}) that
	 * are currently visible.
	 * @returns {void}
	 */
	storeLayers: function() {
		
		/**
		 * The reason for having this event is only so that modules
		 * can remove their own layer(s) to omit them from printed layers.
		 * For example, this module (the print module) removes its own
		 * layer (showing the print extent) at this time. The layer is put
		 * back on "afterprint".
		 */
		sMap.events.triggerEvent("beforeprint", this, {});
		
		var _layers = this.map.layers.slice(0),
			layers = [];
		var BL = null; // Make sure the baselayer is added to the end of the array
		for (var i=0,len=_layers.length; i<len; i++) {
			var layer = _layers[i];
			if (!layer.getVisibility()) {
	        	continue;
	        }
	        if (!layer.calculateInRange()) {
	        	continue;
	        }
	        if (layer.features && !layer.features.length) {
	        	continue;
	        }
	        if (layer.isBaseLayer===true) {
	        	BL = layer;
	        	continue;
	        }
	        if (layer.protocol) {
	        	// Create a new empty vector layer and add the features to it
	        	// since WFS-layers will give problems otherwise (The print box
	        	// is not moving, etc…).
	        	var newLayer = new OpenLayers.Layer.Vector(layer.name, {
//	        		styleMap: new OpenLayers.StyleMap({
//	        		})
	        	});
	        	
	        	// Copy all features to the empty layer.
	        	var fs = layer.features,
	        		newFeatures = [];
	        	for (var j=0,jlen=fs.length; j<jlen; j++) {
	        		newFeatures.push( fs[j].clone() );
	        	}
	        	newLayer.styleMap = layer.styleMap;
	        	newLayer.addFeatures( newFeatures );
	        	layers.push( newLayer );
	        	continue;
	        }
			layers.push(layer.clone());
		}
		if (BL) {
			layers.push(BL.clone());
		}
		sMap.db.printLayers = layers;
	},
	
	/************************************************************************************************************/
	
	createMap: function(config) {
		var mapConfig = sMap.config;
		var maxExtent = mapConfig.maxExtent,
			layers = sMap.db.printLayers,
			mapDiv = $("<div id='print-mapdiv' />");
		$("#smapDiv").append(mapDiv);
		mapDiv.css({
			"width": config.val+"px",
			"height": config.val+"px"
		});
		
		var map = new OpenLayers.Map("print-mapdiv", {
			projection: mapConfig.projection,
			resolutions : mapConfig.resolutions,
			units: "m",
			allOverlays: this.map.allOverlays,
			layers: layers,
			maxExtent : new OpenLayers.Bounds(maxExtent.w, maxExtent.s,
					maxExtent.e, maxExtent.n)
		});
		this.printMap = map;
		if (map.allOverlays!==true) {
			map.setBaseLayer(layers[layers.length-1]); // Make last item in array the baselayer
		}
		this.setZoomAndCenter();
		mapDiv.hide(); // Make it invisible
	},
	
	setZoomAndCenter: function() {
		var paramsObj = sMap.cmd.getParamsAsObject();
		var zoom = paramsObj.ZOOM != undefined ? parseInt(paramsObj.ZOOM) : 0;
		// Fix issue where it zooms in automatically when prining/exporting.
		if (zoom===0) {
			this.printMap.zoomTo(1);
		}
		if (paramsObj.CENTER && paramsObj.CENTER instanceof Array) {
			this.printMap.setCenter(new OpenLayers.LonLat(parseFloat(paramsObj.CENTER[0]), parseFloat(paramsObj.CENTER[1])), zoom);
		}
	},
	
	print: function(config) {
		config = config || {};
		
		var doNotPrint = false; // If layers are not supported fpr printing at all – set this to true.
		
		var layers = this.printMap.layers;
		var nbOfLayers = layers.length;
		var loadEnd = "loadend";
		
		var self = this;
		var onLoadEnd = function(e) {
			nbOfLayers -= 1;
			// Unbind this listener.
			if (e.object) {
				e.object.events.unregister(loadEnd, self, this);
			}
			if (nbOfLayers <= 0) {
				var json = self.getPrintConfig(self.printMap);
				self.postToServer(json, config);
			}
		};
		
		var atLeastOneLayerSupportsEvent = false,
			dontBindEventsArr = ["Google", "Vector"],
			notSupported = [];
		
		for (var i=0,len=layers.length; i<len; i++) {
			var layer = layers[i];
			if (layer.CLASS_NAME == "OpenLayers.Layer.Google") {
				alert("Google-lager stöds inte vid utskrift p.g.a. av dess begränsade API.");
				doNotPrint = true;
			}
			var ns = true;
			if ($.inArray(layer.CLASS_NAME.split(".")[2], dontBindEventsArr) !== -1) {
				notSupported.push(layer.name);
				ns = false; // Keep track of if layer is supported or not
			}
			
			if (ns===false) {
				nbOfLayers -= 1; // Don't wait for this layer to trigger "loadend".
				continue;
			}
			else {
				// When all layers, supporting this event, have been loaded the map
				// will be printed.
				layer.events.register(loadEnd, this, onLoadEnd);
				atLeastOneLayerSupportsEvent = true;
			}
			
			// This solves the problem where map extent changes on print.
			this.printMap.removeLayer(layer);
			this.printMap.addLayer(layer);
		}
		if (doNotPrint) {
			sMap.events.triggerEvent("afterprint", this, {});
			return false;
		}
		
		if (notSupported.length) {
			debug.warn("Module Print says: "+this.lang.layersNotSupported + notSupported.join(", "));
		}
		if (atLeastOneLayerSupportsEvent !== true) {
			onLoadEnd();
		}
	},
	
	/**
	 * If the image creation was a big success, use the image
	 * for some purpose - e.g. printing or exporting...
	 * @param e
	 * @returns
	 */
	onSuccess: function(e) {
		var url = e.url;
		if (e.type === "export") {
			location = e.url;
			
			/*var btnDownload = $("<button id='print-btndownload'>"+this.lang.btnDownload+"</button>");
			$("#printwindow-exportdiv").append(btnDownload);
			btnDownload.button({
				text: false,
				icons: {
					primary: "ui-icon-circle-arrow-s"
				}
			});
			btnDownload.click(function() {
				window.location = url;
			});
			//btnDownload.click();
			//btnDownload.addClass("ui-state-active");
			var tip = $("<div class='print-downloadtip' id='print-downloadtip'>"+this.lang.downloadTip+"</div>"),
				line = $("<div class='print-downloadtip' id='print-downloadtip-line' />");
			$("#printwindow-exportdiv").append(tip).append(line);
			$(".print-downloadtip").hide().slideToggle(500).delay(3000).slideToggle(500);*/
			
			sMap.events.triggerEvent("afterprint", this, {});
		}
		else if (e.type==="print") {
			var image = $("<img id='print-image' />"),
				header = $("<h1 id='print-header'>"+(e.headerText || "")+"</h1>");
			
			var div = $("<div id='"+this.divID+"' />");
			
			
			var WIDTH_A4 = sMap.db.browser.msie ? 640 : 850, // 595
				HEIGHT_A4 = sMap.db.browser.msie ? 550 : 842; //1000; // 842
			var w = e.val;
			var left = parseInt(WIDTH_A4/2 - w/2);
			left = left < 0 ? 0 : left; // Don't make it less than 0 if that would happen... should not happen; 
			
			div.css({
				"font-size": "12px",
				"width": WIDTH_A4+"px",
				"height": HEIGHT_A4+"px",
				"position": "absolute",
				"left": "0px",
				"top": "0px"
				//"border": "1px solid #000"
			});
			header.css({
				"position": "relative",
				"top": "100px",
				"font-family": "arial",
				"font-size": "36px",
				"text-align": "center"
			});
			
			var imgWidth = w > WIDTH_A4 ? WIDTH_A4 : w;
			image.css({
				"position": "absolute",
				"top": "200px",
				"left": left+"px",
				"width": imgWidth+"px"
			});			
			image.load(function(e) {
				
				//if (self.is_chrome) {
					$(window).bind("focus click", function(e) {
						sMap.events.triggerEvent("afterprint", this, {});
						$(window).unbind("focus click");
					});
				//}
				//else {					
				//	sMap.events.triggerEvent("afterprint", this, {});
				//}
				window.print(); // Note! Print is sometimes ignored by chrome.
			});
			$("body").append(div);
			div.append(header).append(image);
			image.attr("src", url);
		}
	},
	
	postToServer: function(json, config) {
		config = config || {};
		
		// Hack: IE seems to post many times...
		if (this.posting) {
			return false;
		}
		this.posting = true;
		
		var	size = this.printMap.getSize(),
			scale = 0; //this.map.resolutions[this.map.zoom];
		var outputPath = this.privateExportFolder + "img.png";
		
		// Remove trailing "/" if given
		if (this.webContentRoot.slice(this.webContentRoot.length-1) == "/") {
			this.webContentRoot = this.webContentRoot.slice(0, this.webContentRoot.length-1);
		}
		
		$.ajax({
			type: 'POST',
			url: this.proxyHost + this.printScriptsFolderPath + "printIt.py",
			context: this,
			data : {
				width : size.w,
				height : size.h,
				layers : json,
				outputPath : outputPath,
				quality : 90,
				headerText : config.headerText || null,
				webContentPath : this.webContentRoot,
				scale : scale
			},
			success: function(text) {
				this.printMap.destroy(); // Important! Otherwise print won't work next time.
				$("#print-mapdiv").empty().remove(); // Remove print-mapdiv
				if (text.search(/error/i)!==-1) {
					$("body").empty().append(text).css({
						"overflow": "auto"
					});
					return false;
				}
				text = text.replace(/\n/g, "");
				var picURL = this.publicExportFolder + text;
				OpenLayers.Util.applyDefaults(config, {
					url: picURL
				});
				this.onSuccess(config);
			}
		});
	},
	
	
	getPrintConfig : function(map) {
		// go through all layers, and collect a list of objects
	    // each object is a tile's URL and the tile's pixel location relative to the viewport

		var layersArr = [];
		
	    var size = map.getSize(); // Used for determining if vector features are within bounds or not.
	    var viewPortBounds = new OpenLayers.Bounds(0, 0, size.w, size.h);
	    
	    var layers = map.layers;
	    
	    for (var index=0,layerLength=layers.length; index<layerLength; index++) {
	    	
	    	// if the layer isn't visible at this range, or is turned off, skip it
	        var layer = layers[index];
	        var layerName = layer.name;
			var t = sMap.cmd.getLayerConfig(layerName) || {};
			
	        if (!layer.getVisibility()) {
	        	continue;
	        }
	        if (!layer.calculateInRange()) {
	        	continue;
	        }
	        var zIndex = layer.zIndex || layer.getZIndex();
	        
	        // Ugly hard-coded hack – but I did not solve it any other way
	        // for some – surely logical – reason.
	        if (layerName == "selectLayer") {
	        	zIndex = "699";
	        }
	        
	        // ---------- Store the layer style ----------------------------------------------------------
	        if (layer.CLASS_NAME=="OpenLayers.Layer.Vector" && layer.features && layer.features.length) {
	        	var s = layer.styleMap.styles["default"].defaultStyle;
	        	var features = layer.features;
	        	var layerConfig = {
	        			url : 				s.externalGraphic || null,
	        			zIndex :			zIndex || null,
	        			layerType :			"vector",
						layerName : 		t.displayName || s.name || null,
						legendImage :		s.externalGraphic || null,
						fillColor : 		s.fillColor || null,
						fillOpacity : 		s.fillOpacity ? parseInt(s.fillOpacity*255) : 255,
						graphicWidth :		s.graphicWidth || null,
						graphicHeight : 	s.graphicHeight || null,
						strokeColor :		s.strokeColor || null,
						strokeOpacity : 	s.strokeOpacity ? parseInt(s.strokeOpacity*255) : 255,
						strokeWidth : 		s.strokeWidth || 1,
						pointRadius :		s.pointRadius || null,
						features : []
	        	};
	        	
	        	var graphicXOffset = s.graphicXOffset ? parseInt(s.graphicXOffset) : 0;
	        	var graphicYOffset = s.graphicYOffset ? parseInt(s.graphicYOffset) : 0;
	        	
	        	// ----- Iterate through all features in this layer and store each feature's position. -----------
	        	var featuresArr = [];
	        	for (var i=0, len=features.length; i<len; i++) {
	        		var f = features[i];
	        		var geometry = f.geometry;
	        		var nodes = geometry.getVertices();
	        		
	        		var geomType = sMap.util.getGeomType(geometry);
	        		
	        		var lenJ = nodes.length;
	        		var nodesArr = []; // Holds the coordinates {Array([x1,y1], [x2,y2])} for each feature
	        		
	        		// Make all nodes into view port pixels instead of lon-lat,
	        		// so that they can be drawn in the image on server-side.
	        		for (var j=0; j<lenJ; j++) {
	        			var n = nodes[j];
	        			var lonLat = new OpenLayers.LonLat(n.x, n.y);
	        			
	        			
	        			// Only store node if within view port.
        				var px = map.getPixelFromLonLat(lonLat);
	        			px = new OpenLayers.Pixel(px.x+graphicXOffset, px.y+graphicYOffset);
        				if (geomType == "point" && !viewPortBounds.containsPixel(px)) {
        					continue;
        					// Note! If checking intersection polylines or polygons PARTLY
        					// outside the print rectangle will sometimes be cut. Therefore, I skip this
        					// check for lines and polygones.
	        			}
        				nodesArr.push([px.x, px.y]);
	        			
	        		}
	        		
	        		// Don't store a node outside view port, in the featuresArr.
	        		if (nodesArr.length==0) {
	        			continue;
	        		}
	        		
	        		// Extend this layers config with specific data for this feature (nodes and geomType).
	        		var featureConfig = {
	        				geomType : 	geomType,
	        				nodes : 	nodesArr
	        		};
	        		featuresArr.push(featureConfig);
	        	}
	        	layerConfig.features = featuresArr;
	        	layersArr.push(layerConfig);
	        	
	        }
	        else {
	        	// iterate through their grid's tiles, collecting each tile's extent and pixel location at this moment
		        var grid = layer.grid || [];
	        	for (var i=0,len=grid.length; i<len; i++) {
	        		var tilerow = grid[i];
	        		for (var j=0,jlen=tilerow.length; j<jlen; j++) {
	        			var tile = tilerow[j];
		                var url      = layer.getURL(tile.bounds),
		                	position = tile.position,
		                	opacity  = layer.opacity ? parseInt(255*layer.opacity) : 255;
		                layersArr.push({
		                	url: url,
		                	zIndex: zIndex,
		                	x: position.x,
		                	y: position.y,
		                	opacity: opacity,
		                	layerType : "tile",
							layerName : t.displayName || layer.name || null,
							legendImage : t.markerImage || null
		                });
		                
		            }
		        }
	        }
	        debug.log(layersArr[index].zIndex);
	    }
	    
	    var layersArr_json = JSON.stringify(layersArr);
	    
	    return layersArr_json;
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Print"
	
});