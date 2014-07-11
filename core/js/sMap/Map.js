sMap.Map = OpenLayers.Class({
	
	
	/**
	 * The initially supported event types. These will be triggered
	 * during the time span of initialization of sMap - if they apply.
	 * Note! If no baselayers/overlays/modules exist, "overlaysloaded"/"modulesadded" will never be triggered.
	 * Only event "maploaded" will always be triggered independent of the configuration file's settings.
	 * 
	 * These are the EVENT_TRIGGERS:
	 * 
	 *  *modulesadded* When all modules have been added to the map from sMap.ModuleController.
	 *          Will be triggered only once during the sMap.Map instance's life-time. When
	 *          "modulesadded" is triggered, in practice it means that all visual elements have
	 *          been drawn and the module is "loaded". Therefore, no "modulesloaded" event is needed.
	 *  
	 *  *layersadded* When all layers have been added ( using map.addLayer() ) from sMap.Layer.
	 *          Usually there are a few seconds between triggering of events "layersadded" and
	 *          "layersloaded". Only triggered once.
	 *          
	 *  *layersloaded* When all data in all layers have been loaded ("layerloaded" is triggered for
	 *          each layer by OL). Will only be triggered when layers are added to the map, both during
	 *          initialization and later. It can be triggered many times.
	 *          
	 *  *maploaded* When these smap-events have been triggered: "modulesadded","layersloaded". It is
	 *          always triggered (also when no modules and/or layers are to be loaded), and never
	 *          triggered more than once in the life-time of the sMap.Map instance.
	 *          
	 *  *creatingwebparams* When webparameters are created modules can bind to this event in order to
	 *          add their own parameters. The webParams are accessed from sMap.db.webParams .
	 *  
	 *  *beforeapplyingwebparams* Before web parameters are applied on the map, modules have a chance
	 *          to change, or apply their own, web parameters. The webParams are accessed from sMap.db.webParams .
	 *  
	 *  *afterapplyingwebparams* Modules could also apply their parameters AFTER the default parameters have
	 *          been applied. For instance if they want to zoom to another place then given by default zoom/center.
	 *          The webParams are accessed from sMap.db.webParams .
	 *  *layervisible* When a layer became visible using events *addlayer*, *addlayerwithconfig* or *showlayer* this
	 *  		event will be triggered. Also when layers are added through CGI-parameter OL this event will be triggered.
	 *  *layerhidden* When a layer became invisible using events *removelayer* or *hidelayer*, this event will be
	 *  		triggered.
	 *  *beforemodulesactivated* Triggered before modules having activateFromStart == true will be activated.
	 *  *aftermodulesactivated* Triggered after modules having activateFromStart == true have all been activated.
	 * 
	 * 
	 */
	EVENT_TRIGGERS : ["modulesadded", "beforemodulesactivated", "aftermodulesactivated", "layersadded", "layersstartedloading", "layersloaded", "maploaded",
	                  "creatingwebparams", "beforeapplyingwebparams", "afterapplyingwebparams", "layervisible", "layerhidden"],
	
	EVENT_LISTENERS : ["addmodules", "removemodules", "translatemodules", "activate", "deactivate",
	                   "showlayer", "hidelayer", "setbaselayer", "addlayerwithconfig", "addlayer", "removelayer",
	                   "addsidedivleft", "addsidedivright", "addtoolbardiv",
	                   "removesidedivleft", "removesidedivright", "removetoolbardiv"],
	
	
	/**
	 * jQuery UI themes to choose from. The config parameter <jqTheme> specifies which theme to use.
	 * If nothing specified, default will be full-gray. 
	 */
	jqThemes: {
		"flashy-gray": "lib/jquery-ui-1.8.18.custom/css/flashy-gray/jquery-ui-1.8.18.custom.css",
		"full-gray": "lib/jquery-ui-1.8.18.custom/css/full-gray/jquery-ui-1.10.1.custom.min.css",
		"full-gray-flat": "lib/jquery-ui-1.8.18.custom/css/full-gray-flat/jquery-ui-1.10.3.custom.min.css",
		"gray-flat": "lib/jquery-ui-1.8.18.custom/css/gray-flat/jquery-ui-1.10.3.custom.min.css",
		"gray-blue": "lib/jquery-ui-1.8.18.custom/css/gray-blue/jquery-ui-1.10.1.custom.min.css",
		"orange": "lib/jquery-ui-1.8.18.custom/css/orange/jquery-ui-1.10.1.custom.min.css",
		"kristianstad": "lib/jquery-ui-1.8.18.custom/css/kristianstad/jquery-ui-1.10.2.custom.min.css"
	},                   

	/**
	 * Starting point of the whole application. Probably called from a file called index.html.
	 * @param mapTag {HTML-tag} The HTML-tag where the map will be living. Typically body, or a div.
	 * @param config {optional}
	 * @returns
	 */
	initialize : function(mapTag, config) {
		this.mapTag = mapTag || null; // required
		
		
		this.addLibs();
		
		/*
		 * Get the configuration file. If no path/URL provided in the parameters,
		 * use a default path.
		 */
		var config = null;
		var webParamsObj = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters());
		
		var configURL = webParamsObj.CONFIG || "configs/config.js"; // default path in case no parameter value for config.
		if (configURL.search(/\//gi) === -1) {
			// Add the starting "configs/" folder name if no folder specified.
			configURL = "configs/"+configURL;
		}
		if (configURL) {
			$.ajax({
				url: configURL,
				dataType: "script",
				async: true,
				context: this,
				success: function() {
					config = window.config;
					this.onConfigLoaded(webParamsObj, config);
				},
				error: function(a,b,c) {
					if (b === "parsererror") {
						debug.error("Config-filen lästes in men kunde inte tolkas p g a ett fel i den.");
					}
					debug.error(a + ":" + b + ":" + c);
				}
			});
		}
		
	},
	
	addLibs: function() {
		var js = [{src: 'lib/heartcode-canvasloader-min.js', constraint: function() {
			if ($.browser.msie && parseInt( $.browser.version ) < 9) {
				return false;
			}
			else {
				return true;
			}
		}}],
			s = null,
			t;
		for (var i=0,len=js.length; i<len; i++) {
			t = js[i];
			if (t.constraint && t.constraint() === false) {
				// Don't add
				continue;
			}
			else {
				s = document.createElement("script");
				s.type = "text/javascript";
				s.src = t.src;
				$("head").append(s);				
			}
		}
	},
	
	onConfigLoaded: function(webParamsObj, config) {
		var self = this;
		/**
		 * If config is sent in as a parameter - let it override default config.
		 * If not config was sent in, use default config.
		 * If this sMap.config is not an object - alert user that config is not valid.
		 * If divID is not a string - alert user.
		 */
		if (config instanceof Object) {
			sMap.config = config;
		}
		if (!sMap.config instanceof Object) {
			debug.warn("You have not specified a valid config object for the map.");
		}
		this.config = sMap.config;
		sMap.db.browser = $.browser;
		sMap.events = new sMap.Events(this, null, null);
		this.addSmapEventTypes();
		
		var ok = this.validateConfig(sMap.config);
		// Add proxy
		if (config.proxyHost) {
			OpenLayers.ProxyHost = config.proxyHost;
		}
		var langCode = webParamsObj.LANG || sMap.Lang.getCode();
		sMap.langCode = langCode;
		sMap.lang = sMap.langDict[langCode];
		sMap.Lang.setCode(langCode);
		
		if (ok===true) {
			// Allow for a customizing function to be called here, defined in the config file.
			if (config.onConfigLoaded && typeof(config.onConfigLoaded) === "function") {
				config.onConfigLoaded(config, init);
			}
			else {
				init.call(this);
			}
		}
		else {
			debug.error(sMap.lang.errMapNotInit); // Don't proceed.
		}
		
		function init() {
			// Add a jquery ui theme
			config.jqTheme = config.jqTheme || "full-gray"; // default theme is "full-gray"
			var url = self.jqThemes[config.jqTheme];
			if ($.browser.msie && parseInt($.browser.version) <= 8 && document.createStyleSheet) {
				document.createStyleSheet(url);
			}
			else {
				var link = $('<link rel="stylesheet" type="text/css"></link>');
				link.attr("href", url);
				$("head").append(link);
			}
			
			/**
			 * Create a legend URL for each overlay.
			 */
			var overlays = sMap.config.layers.overlays;
			for (var i=0,len=overlays.length; i<len; i++) {
				var t = overlays[i];
				if (!(t instanceof Object)) {
					alert("Det verkar som att det finns ett komma för mycket i config-filens overlays-vektor");
				}
				if (t.layerType.toUpperCase() == "WMS") {
					self.createLegendURL(t);
				}
			}
			self.main();			
		};
		
	},
	
	/**
	 * 
	 * @param t {Object} Config object for overlay.
	 * @returns {void}
	 */
	createLegendURL: function(t) {
		// Add a legend image path if not provided
		if (!t.style) {
			t.style = {};
		}
		if (!t.style["default"]) {
			t.style["default"] = {};
		}
		if (t.style["default"].externalGraphic === undefined) {
			t.style["default"].externalGraphic = OpenLayers.Util.urlAppend(t.URL,
					"request=GetLegendGraphic&format=image/png&width=20&height=20&layer=" + t.params.layers);
		}
		t.style.select = t.style.select || {};
		
		// If you don't want to use this legend for select, set style.select.externalGraphic to null . Doesn't work. Set dontUseDefaultExternalGraphic : true //K-M
		if (!t.dontUseDefaultExternalGraphic){
			if (t.style.select.externalGraphic == undefined) {
				t.style.select.externalGraphic = t.style["default"].externalGraphic;
			}
		}
	},
	
	main : function() {		
		
		// Add projection definitions
		this.addProjectionDefs();
		
		/**
		 * Set layersLoaded and modulesAdded to false if there are layers to load
		 * and modules to add. The event mapLoaded will be triggered when these 
		 * are set to true, i.e. when:
		 * - all layers have been added and loaded ("layersloaded")
		 * - all modules have been added ("modulesadded")
		 */
		sMap.events.layersLoaded = (config.layers.overlays.length || config.layers.baselayers.length) ? false : true;
		sMap.events.modulesAdded = (config.modules.length) ? false : true;
		
		sMap.events.register("layersloaded", this, function(e) {
			sMap.events.layersLoaded = true;
			this.checkIfMapLoaded();
		});
		sMap.events.register("modulesadded", this, function(e) {
			sMap.events.modulesAdded = true;
			this.checkIfMapLoaded();
		});

		
		// For debugging
		
		/*$.each(this.EVENT_TRIGGERS, function(i, val) {
			debug.log("listening to event "+val);
			sMap.events.register(val, self, function(e) {
				debug.log(e.type);
			});
		});*/
		
		this.createDivs(this.mapTag);
		this.createMap(this.config);
		
		// Instantiate help classes
		sMap.webParams = new sMap.WebParams(this.map);
		sMap.layer = new sMap.Layer(this.map);
		
		sMap.divController = new sMap.DivController(this.map);
		
		// Do clever things on resize
		sMap.divController.bindOnWindowResize();
		
		sMap.moduleController = new sMap.ModuleController(this.map);
		
		// Add baselayers
		sMap.layer.addBaselayers(sMap.config.layers.baselayers);
		// Add overlays
		sMap.layer.addOverlays(sMap.config.layers.overlays);
		
		// Trigger layers added - but not loaded!
		sMap.events.triggerEvent("layersadded", this, {});
		
		//Add modules specified in config.
		sMap.moduleController.addModules(this.config.modules);
		
		// Apply web parameters
		sMap.webParams.applyParams();
		
		sMap.events.mapInitiated = true;
		
		// Add controls
		//sMap.moduleController.addControls(this.config.controls);
		
	},
	
	addSmapEventTypes : function() {
	    var triggers = this.EVENT_TRIGGERS,
	    	listeners = this.EVENT_LISTENERS;
		if (listeners.length) {
			for (var i=0,len=listeners.length; i<len; i++) {
				sMap.events.addEventType(listeners[i]);
				var func = sMap.cmd[ listeners[i] ];
				if (!func) {
					var msg = this.CLASS_NAME + " has EVENT_LISTENER(S) "+listeners[i]+" registered\nbut no method with same name.";
					debug.warn(msg);
				}
				else {
					sMap.events.register(listeners[i], this, func);
				}
			}
		}
		if (triggers.length) {
			for (var i=0,len=triggers.length; i<len; i++) {
				sMap.events.addEventType(triggers[i]);
			}
		}
    },
    
    // Here follow event listener methods.
    
    /**
     * 
     * @param e
     * @returns
     */
    addmodule : function(e) {
    	e.config = e.config || null;
    	this.moduleController.addModule(e.module, e.config);
    },
    removemodule : function(e) {
    	sMap.moduleController.removeModule(e.module);
    },
    
    
	
	/**
	 * Check if maploaded should be triggered. Should only be triggered
	 * once, during start up. 
	 * @returns void
	 */
	checkIfMapLoaded : function() {
		if (sMap.events.mapLoaded===true) {
			return;
		}
		if (sMap.events.layersLoaded===true && sMap.events.modulesAdded===true) {
			sMap.events.mapLoaded = true; // Remember that maploaded has been triggered.
			// Trigger maploaded with a little delay so we are even more certain all processes have finished.
			sMap.events.triggerEvent("maploaded", this, {});
			if ($.browser.msie && parseInt( $.browser.version ) < 8) {
                $(".smap-init-loading").empty().remove();
			}
			else {
			    $(".smap-init-loading").addClass("invisible");
                $(".smap-init-loading").empty();
                setTimeout(function() {
                    $(".smap-init-loading").empty().remove();
                    $(window).resize();
                }, 1000);
			}
		}
	},
	
	/**
	 * To do: Validate the config object. If any severe errors appear, don't continue execution.
	 * If warnings, add warnings to console.
	 * @param config
	 * @returns {Boolean}
	 */
	validateConfig : function(config) {
		var ok = false;
		
		// Also validate index-file since some errors originates from there...
		
		// IE cannot take more than 31 stylesheets <link />. Even IE8 and higher!
		var nrOfStyleSheets = document.getElementsByTagName("link").length;
		if ( nrOfStyleSheets > 31) {
			debug.error(sMap.lang.tooManyStyleSheets);
			ok = false;
		}
		else {
			ok = true;
		}
		
		var overlays = config.layers.overlays,
			baselayers = config.layers.baselayers;
		
		// Cannot execute map without any layers.
		if ( (!overlays || !overlays.length) && (!baselayers || !baselayers.length) ) {
			debug.error(sMap.lang.errNoBaseNorOverlays);
			ok = false;
		}
		for (var i=0,len=overlays.length; i<len; i++) {
			var t = overlays[i];
			if (!(t instanceof Object)) {
				alert("Det verkar som att det finns ett komma för mycket i config-filens overlays-vektor");
			}
			if (!t.name) {
				var dispName = encodeURIComponent(t.displayName);
				debug.warn("Layer with index "+i+" does not have a name in its config. Using the displayName instead: \""+dispName+"\"");
				t.name = dispName;
			}
		}
		for (var i=0,len=baselayers.length; i<len; i++) {
			var t = baselayers[i];
			if (!(t instanceof Object)) {
				alert("Det verkar som att det finns ett komma för mycket i config-filens baselayers-vektor");
			}
			if (!t.name) {
				debug.warn("Layer does not have a name in its config. Using the displayName instead: "+t.displayName);
				t.name = encodeURIComponent( t.displayName );
			}
		}
		
		// Validate and correct the modules config.
		var modules = config.modules;
		for (var i=0,len=modules.length; i<len; i++) {
			var t = modules[i];
			// In case init is a string - parse it.
			t.init = t.init && typeof(t.init) == "string" ? eval(t.init) : t.init;
		}
		
		/**
		 * Adapt some paths depending on IP. If there is no IP, set to null,
		 */
		// Proxy
		if (config.proxyHost && config.proxyHost instanceof Object && config.proxyHost[document.domain]) {
			config.proxyHost = config.proxyHost[document.domain] || null;
		}
		
		return ok;
	},
	
	
	createDivs : function(mapTag) {
		var mapDiv = $("<div id='mapDiv' />"), // unselectable='on' class='unselectable'
			smapDiv = $("<div id='smapDiv' />"),
			container = $('<div id="smap-map-container" />');
		$(mapTag).append(smapDiv);
		smapDiv.append( container );
		container.append(mapDiv);
	},
	
	/**
	 * Create a basic map.
	 * @param divID
	 * @param config
	 * @returns {void}
	 */
	createMap : function(config) {
	
		var maxExtent = config.maxExtent,
			resolutions = config.resolutions;
		this.map = new OpenLayers.Map("mapDiv", {
			projection: config.projection,
			displayProjection: config.displayProjection,
			resolutions : resolutions,
			maxResolution: config.maxResolution || "auto",
			numZoomLevels: config.numZoomLevels || "auto",
			zoomMethod: config.zoomMethod === null ? null : OpenLayers.Easing.Quad.easeOut,
			controls: [
			           new OpenLayers.Control.Attribution()
			           ],
			units: config.units,
			maxExtent : maxExtent instanceof Object ? new OpenLayers.Bounds(maxExtent.w, maxExtent.s,
					maxExtent.e, maxExtent.n) : "auto"
		});
		this.map.addControl(new OpenLayers.Control.Navigation({handleRightClicks: true, documentDrag: true, zoomBoxEnabled: true}));
		//var nav = this.map.getControlsByClass("OpenLayers.Control.Navigation")[0];
		//nav.disableZoomBox();
		
		
		//nav.zoomBoxEnabled = false;
		//nav.zoomBoxKeyMask = null;
		//var zoomBox = nav.zoomBox;
		//zoomBox.keyMask = null;
		//zoomBox.handler.keyMask = null;
		
		$(this.map.viewPortDiv).add("#mapDiv").addClass("smapCursorHand");
		
		sMap.map = this.map;
	},
	/**
	 * Add the projection definitions manually instead
	 * of trying to load from a file, which has been
	 * a bit problematic. If you want support for another
	 * projection, add the Proj4 string for it here,
	 * keyed by the EPSG-code found at: http://spatialreference.org/ 
	 */
	addProjectionDefs : function() {
		// For some reason I can't keep the proj defs in a separate file (at least for EPSG:3008).
		Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
		Proj4js.defs["EPSG:3857"] = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";
		Proj4js.defs["GOOGLE"] = Proj4js.defs["EPSG:3857"];
		Proj4js.defs["EPSG:900913"] = Proj4js.defs["EPSG:3857"];
		Proj4js.defs["EPSG:3008"] = "+proj=tmerc +lat_0=0 +lon_0=13.5 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
		Proj4js.defs["EPSG:3006"] = "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
		//Proj4js.defs["EPSG:3021"] = "+proj=tmerc +lat_0=0 +lon_0=15.80827777777778 +k=1 +x_0=1500000 +y_0=0 +ellps=bessel +units=m +no_defs";  //Wrong parameters?
		Proj4js.defs["EPSG:3021"] = "+proj=tmerc +lat_0=0 +lon_0=15.8062845294444 +k=1.00000561024+x_0=1500064.274 +y_0=-667.711 +ellps=GRS80 +units=m";
	},
	
	CLASS_NAME : "sMap.Map"
	
});



