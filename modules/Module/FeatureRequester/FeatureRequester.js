/**
 * @author Johan Lahti
 * @copyright Malmö stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.FeatureRequester = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 * 
	 * 
	 * "select": Will render a feature as selected or create a select-dialog if more than one feature.
	 *     If the parameter "multipleSelect" {Boolean} (default false) is set to true, the selected feature
	 *     will be added to the current selection array (more than one feature will be selected).
	 * "unselect": Will render a feature as unselected. If no feature
	 *     in the event object, all features in the selection array will be unselected.
	 * "getfeatures": Requests all visible layers (or input layers) and collects all
	 *     features matching the filter or bounds.
	 * "fetchandselectfeatures": Triggers "getfeatures" and then selects found features.
	 *     Takes a filter or bounding box as input.
	 */
	EVENT_LISTENERS : ["getfeatures"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 * 
	 * - selected: When one (1) feature have been selected (triggered when user
	 *        selects one selectable feature OR only one feature is returned from request.
	 * - fetchedfeatures: Triggered when feature(s) have been fetched after request.
	 *         @returns:
	 *             @param e {Object} Containing these params (in addition to the standard ones):
	 *                 e.features {Object} All features keyed by layer name.
	 *                            E.g. {"fastigheter" : [feature1, feature2, ...], "byggnader" : [...]}
	 * 
	 */
	EVENT_TRIGGERS : ["fetchedfeatures", "fetchedwfsfeatures", "fetchedvectorfeatures"],
	
	/**
	 * The following ass. arrays stores fetched features from requests.
	 */
	foundFeatures : {},
	foundVectorFeatures : null,
	foundWfsFeatures : null,
	
	maxFeatures: 10,
	
	/**
	 * In case no answer from one or more WFS:s, this variable simply
	 * keeps track of if user has been notified about this - do that
	 * user is not alerted many times.
	 */
	userAlertedNoWFSFound : false,
	
	/**
	 * Stores the names of the layers which are queryable (vector)
	 * or the configuration (WFS layers). It should look like this:
	 * 
	 * this.queryLayers = {
	 * 		"wfs" : [{
	 * 			"layerName" : {The key to this layer's features in this.foundFeatures},
	 * 			"type" : "wfs",
	 * 			"URL" :  {URL to the WFS},
	 * 			"version" : The version of the WFS ("1.0.0" or "1.1.0"),
	 * 			"outputFormat" : "text/xml" or "json" are supported so far,
	 * 			"layers" : The layer name(s). E.g. "somedata:alayer"
	 * 		},
	 * 		{...}],
	 * 		"vector: ["libraries", "anotherLayerName", "layer2"...]
	 * };
	 */
	reqLayers : null,
	
	/**
	 * Keeps track of when all WFS-layers have been
	 * requested (when equals 0). Then the event
	 * "fetchedwfsfeatures" is triggered.
	 */
	wfsCounter : null,
	
	/**
	 * @property requestCounter {Integer}
	 * 
	 * When all requests (WFS and vector) are finalized,
	 * the requestCounter should equal 0, and thereby trigger
	 * the event "fetchedfeatures".
	 * 
	 * Before the requests start this should equal the number of request
	 * types. At the moment there are 2:
	 * - OpenLayers.Layer.WFS (requests WFS for features)
	 * - OpenLayers.Layer.Vector (features already present)
	 * 
	 * This number is, of course, (re)set each time a request is made.
	 * 
	 */
	requestCounter : null,
	
	
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.FeatureRequester.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.FeatureRequester.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
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
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
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
	drawContent : function() {},
	
	
	/**
	 * On trigger, get all features in visible layers matching one or more constraints.
	 * The parameters cannot be combined. To retrieve the fetched features, bind a
	 * listener to "fetchedfeatures" which is triggered when all layers have been
	 * requested and features have been fetched. The features are also stored in
	 * this.foundFeatures object.
	 * 
	 * @param e {Object}
	 *     - bounds {Array} Like this: [s, w, n, e]
	 *     - filter {OpenLayers.Filter}
	 *     - layers {Object} Layers keyed by layer's class names last component 
	 * @returns {void}
	 */
	getfeatures : function(e) {
		if (this.requestOnProcess) {
			return false;
		}
		var layers = e.layers || this.getSelectableLayers();
		
		var layersToRequest = false;
		for (var cName in layers) {
			if (layers[cName].length) {
				layersToRequest = true;
			}
		}
		if (layersToRequest===true) {
			this.requestOnProcess = true;
			this.request(layers, e.options);			
		}
	},
	
	/**
	 * Get the currently visible and selectable layers in the map.
	 * Keyed by class names last component, like:
	 * {WMS: [layer1, layer2], Vector: [layer1, layer2], ...}
	 * 
	 * @returns {Object}
	 */
	getSelectableLayers: function() {
		var layers = sMap.map.layers,
			visibleLayers = {};
		for (var i=0,len=layers.length; i<len; i++) {
			var layer = layers[i];
			if (layer.getVisibility() && layer.calculateInRange() && layer.selectable) {
				var cName = layer.CLASS_NAME.split(".")[2];
				if (!visibleLayers[cName]) {
					visibleLayers[cName] = [];
				}
				visibleLayers[cName].push(layer);
			}
		}
		if (this.requestableLayers && this.requestableLayers.length) {
			// If requestableLayers was specified, filter out layers with a layer name
			// not present in this array.
			var tempDict = {},
				rls = this.requestableLayers,
				classNames = [];
			// Get class names
			for (var cName in visibleLayers) {
				classNames.push(cName);
			}
			for (var j=0; j<classNames.length; j++) {
				var cName = classNames[j];
				var layers = visibleLayers[cName];
				for (var i=0,len=layers.length; i<len; i++) {
					if ($.inArray(layers[i].name, rls) !== -1) {
						if (!tempDict[cName]) {
							tempDict[cName] = [];
						}
						tempDict[cName].push(layers[i]);
					}
				}			
			}
			visibleLayers = tempDict;
		}
		return visibleLayers;
	},
	
	/**
	 * Get config object for the layer names specified in
	 * the array.
	 * @param arr {Array} Containing layer names which has
	 *     a configuration specified in the config.overlays array.
	 * @returns
	 */
	getLayersConfig : function(arr) {
		var configs = [],
			c = null;
		for (var i=0,len=arr.length; i<len; i++) {
			c = sMap.cmd.getLayerConfig(arr[i]);
			if (c.type.toUpperCase() == "WMS") {
				configs.push(c);
			}
		}
		return configs;
	},
	
	countDown : function(options) {
		options = options || {};
		
		this.requestCounter -= 1;
		if (this.requestCounter <= 0) {
		
			if (this.userAlertedNoWFSFound!==true && this.noWfsResponse.length>0) {
				var msg = "";
				for (var i=0,len=this.noWfsResponse.length; i<len; i++) {
					msg += "\n- " + this.noWfsResponse[i];
				}
				alert("Fick inget WFS-svar från följande lager:\n" + msg);
				this.userAlertedNoWFSFound = true;
			}
			
			// When all layers have been requested, for both WFS and vector,
			// then - merge found features from both into the same ass. array
			// and trigger the event 'fetchedfeatures'.
			OpenLayers.Util.extend(this.foundFeatures, this.foundWfsFeatures);
			OpenLayers.Util.extend(this.foundFeatures, this.foundVectorFeatures);
			var flatArrOfFeatures = this.flattenFeaturesObjToArray(this.foundFeatures);
			
			this.requestOnProcess = false; // Allow for more requests
			sMap.events.triggerEvent("fetchedfeatures", this, {
	            features : flatArrOfFeatures,
	            select: options.select || false,
	            bounds: options.bounds
	        });
			
		}
	},
	
	/**
	 * When fetching features they are keyed by layername.
	 * This function merges all arrays into one array
	 * containing all features.
	 * @param featuresDict {Object} Where key is a layer name and value is an array of features.
	 * @returns {Array} All features merged into one big array.
	 */
	flattenFeaturesObjToArray : function(featuresDict) {
		var features = [],
			f = null;
		for (var layerName in featuresDict) {
			var someFeatures = featuresDict[layerName];
			for (var i=0,len=someFeatures.length; i<len; i++) {
				// Store layerName as its own property. We could have added
				// the whole layer, but we don't know if layer exists or is
				// added to the map.
				f = someFeatures[i];
				f.layerName = layerName;
				features.push(f);
			}
		}
		return features;
	},
	
	/**
	 * {Public function}
	 * @param reqLayers {Object}
	 *     key: {String} ("wfs"/"vector"), value: layerName/config
	 * @param bounds {OpenLayers.Bounds}
	 */
	request : function(reqLayers, options) {
		options = options || {};
		
		// Find out how many types of requests must be finished before triggering
		// event 'fetchedfeatures'
		
		this.reqLayers = reqLayers;
		
		this.foundFeatures = {}; // reset found features
		this.foundVectorFeatures = {};
		this.foundWfsFeatures = {}; // stores the vector features keyed by layer name
		
		// Stores layerName of WMS+WFS layers which did not give any response.
		this.noWfsResponse = [];
		
		reqLayers.WMS = reqLayers.WMS || [];
		reqLayers.Vector = reqLayers.Vector || [];
		
		this.wfsCounter = reqLayers.WMS.length || 0; // Keep track of when all wfs layers have been requested
		var v = (!reqLayers.Vector || reqLayers.Vector.length==0 || !options.bounds) ? 0 : 1;
		var w = (!reqLayers.WMS || reqLayers.WMS.length==0) ? 0 : 1;
		this.requestCounter = v + w; // Keep track of when all WFS and Vector layers have been requested.
		
		// Event if counter has reached 0 - don't trigger wfsFeaturesRequested
		// if not all WFS have been requested yet.
		this.requestedAllWFS = false;
		
		// Request supported layer types
		this.requestWMSLayers(reqLayers.WMS, options);
		
		// Note! Filter cannot be used for requesting vector layer. Requires bounds.
		if (options.bounds) {
			this.requestVectorLayers(reqLayers.Vector, options.bounds, options);
		}
	},
	/**
	 * Request all WMS/WFS layers
	 * @param layers {Array} Containing OpenLayers.Layer.WMS
	 * @returns {void}
	 */
	requestWMSLayers: function(layers, options) {
		options = options || {};
		
		var defaults = {
			single: false,
			hover: false
		};
		options = $.extend({}, defaults, options);
		this.typeNameTolayerName = {}; // Reset
		for (var i=0,len=layers.length; i<len; i++) {
			var layer = layers[i];
			var t = sMap.cmd.getLayerConfig(layer.name);
			
			// If a getFeatureInfo object was given - create our
			// own request (GET) with our own URL.
			var c = t.getFeatureInfo || {};
			if (c && c.URL && options.bounds) {
				var url = this.makeURL(c, options.bounds);
				this.requestWFSWithURL(url, options);
			}
			else {
				var protocol = OpenLayers.Protocol.WFS.fromWMSLayer( layer ); // WFS protocol from WMS
				options.geometryName = c.geometryName || "the_geom";
				options.layerName = layer.name; // Store layer name in the options so we can label the response
				options.filter = t.filter;
				this.requestWFSWithProtocol(protocol, options);
			}
		}
		this.requestedAllWFS = true;
	},
	
	makeURL: function(t, bounds) {
		var paramsObj = {
//				layers: t.layers,
				service: t.service || "wfs",
				srs: this.map.projection,
				typename: t.layers, 
				version: t.version || "1.0.0",
				request: "GetFeature",
				outputformat: t.outputFormat || "GML2",
				format: "text/xml",
				bbox: bounds.toBBOX(),
				maxfeatures: this.maxFeatures, //"&maxfeatures="+this.maxFeatures,
				width: this.map.getCurrentSize().w, //"&width=" + this.map.getCurrentSize().w,
				height: this.map.getCurrentSize().h //"&height=" + this.map.getCurrentSize().h
		};
		
		var url = t.URL.charAt(t.URL.length-1)=="?" ? t.URL : t.URL + "?"; // add "?" if needed
		var paramsString = sMap.util.paramsObjToString(paramsObj);		
		return url + paramsString;
	},
	
	/**
	 * @param url {String}
	 */
	requestWFSWithURL: function(url, options) {
		var self = this;
		var fullUrl = sMap.config.proxyHost ? sMap.config.proxyHost + encodeURIComponent(url) : url;
		$.ajax({
			url: fullUrl,
			type: "GET",
			dataType: "text",
			context: this,
			beforeSend: function(xhr) {
				xhr.ieDocumentURI = url;
			},
			success: function(data, textStatus, jqXHR) {
				var reqUrl = jqXHR.responseXML ? (jqXHR.responseXML.documentURI ? decodeURIComponent(jqXHR.responseXML.documentURI.toLowerCase()) : jqXHR.ieDocumentURI) : jqXHR.ieDocumentURI;
				var reqUrlArr = reqUrl.split("?");
				var paramsString = reqUrlArr[ reqUrlArr.length-1 ];
				var params = OpenLayers.Util.upperCaseObject( OpenLayers.Util.getParameters("?"+paramsString) );
				var olFormat = new OpenLayers.Format.GML();
			    if (data.search(/exception/gi) === -1) {
					var features = olFormat.read(data);
					if (features.length) {
						var typeName = params.TYPENAME.toString();
						var ts = sMap.cmd.getLayerConfigsBy("getFeatureInfo.layers", typeName);
						var layerName = ts[0].name;
						this.foundWfsFeatures[ layerName ] = features;
					}
				}
			    else {
			    	debug.log("Server exception from WFS-layer: "+params.TYPENAME);
			    }
			},
			error: function() {},
			complete: function() {
				this.wfsCounter-=1;
				this.checkCount.call(self, options );
			}
		});
	},
	
	/**
	 * Container that stores the OL layer name (as defined in config) that is
	 * corresponding to the typeName (WFS layer name) so that we can label the
	 * response with the correct layer name. E.g.
	 * 		this.typeNameTolayerName[typeName] = options.layerName;
	 * 
	 */
	typeNameTolayerName: {},
	
	/**
     * Method: requestWFSWithProtocol
     * Sends a GetFeature request to the WFS using a protocol.
     * 
     * Parameters:
     * bounds - {<OpenLayers.Bounds>} bounds for the request's BBOX filter
     * options - {Object} additional options for this method.
     * 
     * Supported options include:
     * single - {Boolean} A single feature should be returned.
     *     Note that this will be ignored if the protocol does not
     *     return the geometries of the features.
     * hover - {Boolean} Do the request for the hover handler.
     */
	requestWFSWithProtocol: function(protocol, options) {
        options = options || {};
        
        var filter = options.filter,
        	bounds = options.bounds;
        
        if ( bounds ) {
        	// Create a filter based on the bounds. If a filter was given
        	// it will be ignored and replaced by this new filter.
        	var _filter = new OpenLayers.Filter.Spatial({
        		type: OpenLayers.Filter.Spatial.BBOX, 
        		value: bounds
        	});
        	if (!filter) {
        		filter = _filter;
        	}
        	else {
        		filter = new OpenLayers.Filter.Logical({
        			type: OpenLayers.Filter.Logical.AND,
        			filters: [_filter, filter]
        		});
        	}
        }
        
        // Set the cursor to "wait" to tell the user we're working.
        //OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait");
        
        var self = this;
//        filter.layerName = options.layerName; //protocol.options.featureType;
        var workspace = ""; // Should be like "theworkspace:thelayer"
        protocol.format.geometryName = options.geometryName || "the_geom";
        
        var typeName = protocol.options.featurePrefix + ":" + protocol.options.featureType;
        var exists = false;
        if (options.filter) {
        	if (!this.typeNameTolayerName[typeName]) {
        		this.typeNameTolayerName[typeName] = [];
        	}
        	else {
//        		exists = true;
//        		$.each(this.typeNameTolayerName[typeName], function(i, val) {
//    				if (val[1] === options.layerName) {
//    					exists = true;
//    				}
//        		})
        	}
        	this.typeNameTolayerName[typeName].push([options.filter, options.layerName]);
        	if (exists === true) {
    			self.wfsCounter-=1;
    			return false;
    		}
        }
        else {
        	this.typeNameTolayerName[typeName] = options.layerName;
        }
        
        var response = protocol.read({
            maxFeatures: this.maxFeatures,
            filter: filter,
            callback: function(result) {
        		self.wfsCounter-=1;
                if (result.success()) {
                	
                    var features = result.features || [];
                    if (features && features.length && features[0].geometry) {
                    	/**
                    	 * JL: Extract the service layername from the response. This
                    	 * extraction feels a little risky. Maybe there is a better
                    	 * way to find it? The only alternative I found is to use
                    	 * the feature.fid - but it does not give a complete layer
                    	 * name (it excludes the workspace name).
                    	 */
                    	var text = result.priv.responseText;
                    	var arr = text.split('xsi:schemaLocation="');
                    	var urls = arr[1],
                    		val = "";
                    	urls = urls.split(" ");
                    	for (var k=0;k<urls.length;k++){
                    		var found = urls[k].indexOf("typeName");
                    		if (found>0){
                    			val = urls[k];
                    		}
                    	}
                    	val = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(val));
                    	
                    	var item = this.typeNameTolayerName[val.TYPENAME.replace('"','')],
                    		layerName = null,
                    		f = null;
                    	if (item instanceof Array) {
                    		// Match the features against the filters to see which of the sMap-layers each feature belongs to
                    		var filter = null;
                    		for (var j=0,lenj=features.length; j<lenj; j++) {
                    			f = features[j];
                    			for (var i=0,len=item.length; i<len; i++) {
                    				filter = item[i][0];
                    				if (filter.evaluate(f.attributes)) {
                    					layerName = item[i][1];
                    					if (!self.foundWfsFeatures[layerName]) {
                    						self.foundWfsFeatures[layerName] = [];
                    					}
                    					self.foundWfsFeatures[layerName].push(f);
                    				}
                    			}
                    		}
                    	}
                    	else {
                    		layerName = item;
                    		self.foundWfsFeatures[layerName] = features;
                    	}
//                    	arr = sMap.cmd.getLayerConfigsBy("params.layers", val.TYPENAME );
//                    	var layerName = null;
//                    	if (arr.length) {
//                    		layerName = arr[0].name;
//                    	}
//                    	else {
//                    		arr = sMap.cmd.getLayerConfigsBy("params.layers", val.layerName);
//                    		layerName = "Ej namngivet lager";
//                    	}
                    }
                }
                else {
                	debug.warn("sMap-error: Could not request one of the WMS/WFS-layers. Check proxy and/or" +
                			" the getFeatureInfo property of the layer's config.");
                }
                self.checkCount.call(self, options );
        	},
        	scope: this
        });
    },
    
    checkCount: function(options) {
		
		// Trigger the event - "all WMS layers requested"
		if (this.wfsCounter <= 0 && this.requestedAllWFS === true) {
			sMap.events.triggerEvent("fetchedwfsfeatures", this, {
		        features : this.foundWfsFeatures
		    });
			this.countDown(options);
		}
	},
    
	
	/**
	 * Check if any of the features in the vector layers intersect the
	 * requestFeature. This method is only supported if a bbox is sent in
	 * (not for filter).
	 */
	requestVectorLayers : function(vectorLayers, bounds, options) {
		if (!vectorLayers || vectorLayers.length==0) {
			return false;
		}
		// Make a OL-geometry from the filter (filter has to be of type "BBOX").
		if (!bounds || $.isEmptyObject(bounds)) {
			return false;
		}
		var geom = bounds.toGeometry();
		
		for (var i=0,len=vectorLayers.length; i<len; i++) {
			var foundFeatures = [], // found features for this layer
				layer = vectorLayers[i];
			var features = layer.features || [],
				f = null,
				intersects = null;
			for (var fi=0,fiLen=features.length; fi<fiLen; fi++) {
				f = features[fi].clone();
				intersects = geom.intersects(f.geometry);
				if (intersects===true) {
					foundFeatures.push(f);
				}
			}
			if (foundFeatures.length) {
				this.foundVectorFeatures[layer.name] = foundFeatures;
			}
		}
		// Trigger the event - "all vector layers requested"
		sMap.events.triggerEvent("fetchedvectorfeatures", this, {
            features : this.foundVectorFeatures
        });
		this.countDown(options);
	},

	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.FeatureRequester"
	
});