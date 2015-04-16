/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.WebParams = OpenLayers.Class({
	
	
	initialize : function(map) {
		this.map = map;
	},
	
	/**
	 * Shortened function name...
	 * @returns {String}
	 */
	getParams : function() {
		return this.getParamsAsString();
	},
	/**
	 * Make CGI-parameters which can recreate the current map.
	 * Other modules can listen to the event "creatingwebparams"
	 * and add their own parameters. They can
	 * access the params from the object sMap.db.webParams
	 * 
	 * @param prependDomain {Boolean} If true - prepend the root URL with a "?"
	 * 		before the params.
	 * @returns {String} key=value&key2=value2
	 */
	getParamsAsString : function(prependDomain) {
		var webParamsObj = this.getParamsAsObject(),
			webParams = "",
			key = null,
			val = null;
		for (key in webParamsObj) {
			val = webParamsObj[key];
			webParams = webParams + "&" + key.toLowerCase()+"="+val;
		}
		webParams = webParams.substring(1); // Remove starting "&"
		
		if (prependDomain === true) {
			webParams = sMap.config.rootURL + "?" + webParams;
		}
		
		return webParams;
	},
	
	/**
	 * Make CGI-parameters which can recreate the current map.
	 * Other modules can listen to the event "creatingwebparams"
	 * and add their own parameters. They can
	 * access the params from the object sMap.db.webParams .
	 * 
	 * @returns {Object} {key : value, key2 : value2}
	 */
	getParamsAsObject : function() {
		
		var obj = {};
		var orgParams = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters());
		
		// Get center
		var p = this.map.getCenter();
		var center = obj.CENTER = [p.lon, p.lat];
		
		// Get zoom
		var zoom = obj.ZOOM = this.map.getZoom();
		
		// Get layers
		var layers = sMap.config.layers.overlays;
		for (var i=0,len=layers.length; i<len; i++) {
			var t = layers[i];
			var layer = t && t.name && this.map.getLayersByName(t.name).length ? this.map.getLayersByName(t.name)[0] : null;
			if (layer && layer.getVisibility()===true) {
				if (!obj.OL) {
					obj.OL = [];
				}
				if ($.inArray(layer.name, obj.OL) == -1) {
					// Append layerName if it does not exist.
					obj.OL.push(layer.name);
				}
			}
		}
		layers = sMap.config.layers.baselayers;
		for (var i=0,len=layers.length; i<len; i++) {
			var t = layers[i];
			var layer = this.map.getLayersByName(t.name)[0];
			if (layer && layer.getVisibility()===true) {
				obj.BL = layer.name;
				break;
			}
		}
	
		// Get width and height of map (if provided)
		if (orgParams.WIDTH) {
			obj.WIDTH = orgParams.WIDTH;
		}
		if (orgParams.HEIGHT) {
			obj.HEIGHT = orgParams.HEIGHT;
		}
		
		// Get language code if it was sent in from start OR if
		// current code is different than default.
		var code = sMap.Lang.getCode();
		if (orgParams.LANG || (code != sMap.Lang.defaultCode)) {
			obj.LANG = code;
		}
		if (orgParams.CONFIG) {
			obj.CONFIG = orgParams.CONFIG;
		}

		sMap.db.webParams = obj;
		
		// Listeners to this event must access the params object through
		// sMap.db.webParams and add its own parameters like:
		// sMap.db.webParams.MYPARAMETER = ["one", "two"];
		// The key does not have to be in upper-case (it will be made automatically below).
		
		sMap.events.triggerEvent("creatingwebparams", this, {} );
		
		// By now all listeners have added their own parameters. Lets make them upper-case.
		sMap.db.webParams = OpenLayers.Util.upperCaseObject(sMap.db.webParams);
		
		return sMap.db.webParams;
	},

	/**
	 * Get the URL the user called the map with the last time.
	 * @returns {Object} {key : value, key2 : value2} 
	 */
	getStartingParamsAsObject : function() {
		return OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters());
	},
	
	/**
	 * Pre-process params in order to:
	 * 	- support older APIs
	 * 
	 * @param params {Object}
	 * @returns {void}
	 */
	processParams: function(params) {
		params = params || {};
		params = $.extend({}, params);
		
		if (params.MAPTYPE) {
			params.BL = params.MAPTYPE;
			delete params.MAPTYPE;
		}
		if (params.OVERLAYS) {
			params.OL = params.OVERLAYS;
			delete params.OVERLAYS;
		}
		if (params.ZOOMLEVEL) {
			params.ZOOM = params.ZOOMLEVEL;
			delete params.ZOOMLEVEL;
		}
		if (params.ADDMARKER) {
			params.FEATURES = params.ADDMARKER.replace(/=/g, "%3D");
			delete params.ADDMARKER;
		}
		return params;
	},
	
	/**
	 * Apply parameters to the map. Modules can listen to the
	 * event "beforeapplyingwebparams" or "afterapplyingwebparams"
	 * and add apply their parameters as they like. 'Before' and 'after'
	 * points to the time before and after applying default parameters
	 * (i.e. parameters defined in this class, like zoom, center).
	 * 
	 * Modules can access the params from the object sMap.db.webParamsObj .
	 * 
	 * @param params {String || Object}
	 *     Params to apply on the map (without reloading it).
	 *     Note! If params is of type "object" keys must be upper-case.
	 */
	applyParams : function(params) {
		params = params || this.getStartingParamsAsObject();
		
		params = this.processParams(params);
		
		if (typeof params == "string") {
			params = OpenLayers.Util.upperCaseObject(params);
		}
		sMap.db.startingWebParamsObject = params;
		sMap.events.triggerEvent("beforeapplyingwebparams", this, {} );
		
		this.applyDefaultParams(params);
		
		sMap.events.triggerEvent("afterapplyingwebparams", this, {
			params: params
		});
	},
	
	/**
	 * Apply default parameters.
	 * 
	 * @param paramsObj {Object}
	 * @returns
	 */
	applyDefaultParams : function(paramsObj, options) {
		paramsObj = paramsObj || this.getParamsAsObject();
		options = options || {};
		
		if (!options.noZoomExtentFallback) {
			this.map.zoomToMaxExtent();
		}

		var zoom = parseInt(paramsObj.ZOOM);
		if (zoom && zoom > 0) {
			this.map.zoomTo(zoom);
		}
		if (paramsObj.LANG) {
			sMap.Lang.setCode(paramsObj.LANG || "sv-SE");
		}
		if (paramsObj.CENTER) {
			if (typeof paramsObj.CENTER === "string") {
				paramsObj.CENTER = paramsObj.CENTER.split(",");
			}
			this.map.setCenter(new OpenLayers.LonLat(parseFloat(paramsObj.CENTER[0]), parseFloat(paramsObj.CENTER[1])), null, false, false);
		}
		
		if (paramsObj.BL) { //&& this.map.getLayersByName(paramsObj.BL).length) {
			this.map.setBaseLayer(paramsObj.BL);
		}
		if (paramsObj.OL) {
			var olArr = paramsObj.OL instanceof Array ? paramsObj.OL : paramsObj.OL.split(","),
				arrLayersToAdd = [];
			if (paramsObj.OL == "all"){
				for (var i=0,len=sMap.config.layers.overlays.length; i<len; i++){
					var t = sMap.config.layers.overlays[i];
					t.startVisible = true;	
					if (paramsObj.BUFFER){
						t.options.buffer = paramsObj.BUFFER;
					}
					arrLayersToAdd.push(t);
				}
			} else {
				for (var i=0,len=olArr.length; i<len; i++) {
					var layerName = olArr[i];
					var t = sMap.cmd.getLayerConfig(layerName);
					if (!t) {
						debug.warn(sMap.lang.errWebParamLayerNotFound);
					}
					else {
						t.startVisible = true;	
						if (paramsObj.BUFFER){
							t.options.buffer = paramsObj.BUFFER;
						}
						arrLayersToAdd.push(t);
					}
				}
			}
			sMap.layer.addOverlays(arrLayersToAdd);
		}
		
		if (this.map.allOverlays===true && !paramsObj.BL && !paramsObj.OL) {
			// Add the first overlay.
			var overlays = sMap.config.layers.overlays;
			if (!overlays || !overlays.length) {
				// No baselayers nor overlays => problem!
				debug.error(sMap.lang.errNoBaseNorOverlays);
				return;
			}
			var t = overlays[0];
			t.startVisible = true;
			sMap.layer.addOverlays([t]);
		}
		
		/*
		 * If no zoom or center provided - zoom to default extent.
		 */
		if (!paramsObj.ZOOM && !paramsObj.CENTER && !options.noZoomExtentFallback) {
			var b = sMap.config.defaultExtent;
			if (b){
				this.map.zoomToExtent(new OpenLayers.Bounds(b.w, b.s, b.e, b.n), false);
			} else {
				this.map.zoomToMaxExtent();
			}
		}
	},
	
	CLASS_NAME : "sMap.WebParams"
	
});




