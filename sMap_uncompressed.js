var sMap = {
		config : {},
		db : {},
		moduleConfig : {}
};



sMap.langDict = {
	"sv-SE": {
		errNoBaseNorOverlays: "Config-filen innehåller inga lager (varken overlays eller baselayers).",
		errMapNotInit: "Kartan kunde inte initieras.",
		errWebParamLayerNotFound: "Lagret som angavs i URL:en finns inte.",
		errBaselayerDoesNotExist: "Kan inte ändra till angivet baslager eftersom det inte finns.",
		tooManyStyleSheets: "Det är för många stylesheets <link /> inlänkade från index-filen - IE klarar max 31 st.",
		warnLangNotSupportedByFramework: "Angivet språk stöds inte av alla sMap-moduler och/eller sMap.langDict (se sMap.js)."
	},
	"en": {
		errNoBaseNorOverlays: "The config file does not contain any layers (neither overlays nor baselayers).",
		errMapNotInit: "The map could not be initialized",
		errWebParamLayerNotFound: "The layer in the URL does not exist.",
		errBaselayerDoesNotExist: "Cannot set baselayer since it does not exist.",
		tooManyStyleSheets: "There are too many stylesheets <link /> linked in from the index file - IE can take a max. of 31 stylesheets.",
		warnLangNotSupportedByFramework: "The language is not supported by all sMap-modules and/or sMap.langDict (see sMap.js)."
	}
		
		
};/**
 * ********************************************************************************************
 * - CORE METHODS -
 * These are core methods. All communication to and from the modules should
 * happen via these methods. They work as a proxy for other methods inside
 * the core. Methods which don't return anything will be (should!) be called
 * through events (new events can be added to sMap.Map.EVENT_LISTENERS). The name
 * of the method must be the same as the event. E.g. the event "translatemodules"
 * requires a method named "translatemodules" - and should also take a parameter e.
 * This parameter contains information passed from the trigger (caller) of the event,
 * and by default, e.caller will be the calling module instance.
 * ********************************************************************************************
 * 
 *
 */

sMap.cmd = {
	
		
	/**
	 * ********************************************************************************************
	 * These methods are triggered via sMap.events. The names have
	 * to correspond to the event names defined in sMap.Map.EVENT_LISTENERS
	 * ********************************************************************************************
	 */
	
	addtoolbardiv : function(e) {
		sMap.divController.addToolbarDiv(e);
	},
	removetoolbardiv : function(e) {
		sMap.divController.removeToolbarDiv(e);
	},
	addsidedivright : function(e) {
		sMap.divController.addSideDivRight(e);
	},
	removesidedivright : function(e) {
		sMap.divController.removeSideDivRight(e);
	},
	
	addsidedivleft : function(e) {
		sMap.divController.addSideDivLeft(e);
	},
	removesidedivleft : function(e) {
		sMap.divController.removeSideDivLeft(e);
	},
	
	/**
	 * Add all modules defined in config.modules or if
	 * e.modules 
	 * @param e
	 *     - modules {Array({Object})} An array of module config objects
	 *       containing at least the key "init".
	 * @returns
	 */
	addmodules : function(e) {
		e.modules = e.modules || null;
		sMap.moduleController.addModules(e.modules);
	},
	
	removemodules : function(e) {
		sMap.moduleController.removeModules(e.modules);
	},
	
	translatemodules : function(e) {
		e.lang = e.lang || null;
		sMap.Lang.translateModules(e.lang);
	},
	
	/**
	 * Activate a module.
	 */
	activate: function(e) {
		var module = sMap.map.getControlsByClass(e.module).length ? sMap.map.getControlsByClass(e.module)[0] : null;
		if (module) {
			module.activate();
		}
	},
	/**
	 * Deactivate a module.
	 */
	deactivate: function(e) {
		var module = sMap.map.getControlsByClass(e.module).length ? sMap.map.getControlsByClass(e.module)[0] : null;
		if (module) {
			module.deactivate();
		}
	},
	
	
	/**
	 * For layers...
	 */
	
	/**
	 * Create and add a layer with configuration specified in
	 * the standard sMap way (see specifications for sMap overlays
	 * and baselayers).
	 * @param e {Object}
	 *     - config {Object} Config for the layer (overlay or baselayer)
	 */
	addlayerwithconfig : function(e) {
		sMap.layer.addLayerWithConfig(e.config);
	},
	
	/**
	 * 
	 * @param e {Object}
	 *     - layer {OpenLayers.Layer}
	 * @returns {void}
	 */
	addlayer : function(e) {
		sMap.layer.addLayer(e.layer);
	},
	
	/**
	 * Remove a layer.
	 * @param e {Object}
	 *     - layer {OpenLayers.Layer}
	 * @returns {void}
	 */
	removelayer : function(e) {
		sMap.layer.removeLayer(e.layer);
	},
	
	
	/**
	 * @param e {Object}
	 *     - layerName {String}
	 * @returns {void}
	 */
	showlayer : function(e) {
		sMap.layer.showLayer(e.layerName);
	},
	
	/**
	 * 
	 * @param e {Object}
	 *     - layerName {String}
	 * @returns {void}
	 */
	hidelayer : function(e) {
		sMap.layer.hideLayer(e.layerName);
	},
	
	hidealllayers: function() {
		sMap.layer.hideAllLayers();
	},
	
	/**
	 * Change baselayer
	 * @param e
	 *     - layerName {String}
	 * @returns
	 */
	setbaselayer : function(e) {
		sMap.layer.setBaseLayer(e.layerName);
	},
	
	
	/**
	 * ********************************************************************************************
	 * These methods can be called directly. The reason why they are not
	 * triggered with events listeners is because they have to return
	 * something.
	 * ********************************************************************************************
	 */
		
	/**
	 * Get config for layer with name layerName.
	 * @param layerName {String}
	 * @returns {OpenLayers.Layer} || {null}
	 */
	getLayerConfig : function(layerName) {
		//var layers = sMap.config.layers.overlays.concat( sMap.config.layers.baselayers );
		var arr = sMap.cmd.getLayerConfigsBy( "name", layerName );
		if (arr) {
			return arr[0];
		}
		else {
			return arr; // null
		}
	},
	
	/**
	 * DEPRECATED. Get the layer config for an overlay matching
	 * the given key and value.
	 * @param key {String}
	 * @param val {String, Number, Object, Boolean} or anything that supports compare ("==")
	 * @returns {Object || null}
	 */
//	getLayerConfigBy: function(key, val) {
//		var layers = sMap.config.layers.overlays.concat( sMap.config.layers.baselayers ),
//			t = null;
//		for (var i=0,len=layers.length; i<len; i++) {
//			t = layers[i];
//			if (t[key] === val) {
//				return t;
//			}
//		}
//		return null;
//	},
	
	/**
	 * Finds all layer configs matching the key and value
	 * condition given. Also nested objects are supported
	 * for keys like: "params.layers".
	 * @property key {Any}
	 * @property value {Any}
	 * @returns {Array} Array of any matching layer configs for the query.
	 */
	getLayerConfigsBy: function(key, value) {
		var keyArr = key.split("."),
			matches = [],
			layers = sMap.config.layers.overlays.concat( sMap.config.layers.baselayers || [] );
		
		for (var i=0, len=layers.length; i<len; i++) {
			var t = layers[i];
			var val = null;
			if (keyArr.length) {
				try {
					val = eval("t." + key);
				} catch(e) {}
			}
			if (val) {
				if (val.toUpperCase() === value.toUpperCase()) {
					matches.push( t );
				}
			}
		}
		return matches;
	},
	
	/**
	 * Get CGI-parameters, defining the current map, as an object.
	 * When calling this method the event "creatingwebparams" will be
	 * triggered so that modules can add their own params to the string
	 * before it is returned.
	 * @returns {Object}
	 */
	getParamsAsObject : function() {
		return sMap.webParams.getParamsAsObject();
	},
	
	/**
	 * Get that CGI-parameters as a string - with or without the root URL.
	 * @param prependDomain {Boolean} If true, prepend the sMap.config.rootURL.
	 * @returns {String}
	 */
	getParamsAsString: function(prependDomain) {
		return sMap.webParams.getParamsAsString(prependDomain);
	},
	
	/**
	 * @returns {Object} The parameters used for map initialization.
	 */
	getStartingParamsAsObject : function() {
		return sMap.webParams.getStartingParamsAsObject();
	},
	
	
	
	loading: function(show, config) {
		config = config || {};
		
		if ($.browser.msie && parseInt($.browser.version) < 8) {
			return;
		}
		
		var self = this;
		if ($.browser.msie && parseInt($.browser.version) < 9) {
			// loading indicator is not supported by IE < 9 
			return false;
		}
		
		if (show && show === true) {
			this.aboutToShow = true;
			if (!this.loader) {
				if (CanvasLoader) {
					var cl = new CanvasLoader('mapDiv');
					this.loader = cl;
					cl.setDiameter(88); // default is 40
					cl.setDensity(55); // default is 40
					cl.setRange(0.7); // default is 1.3
					cl.setSpeed(3); // default is 2					
				}
				else {
					return false;
				}
			}
			if (config.color) {
				this.loader.setColor(config.color);
			}
			else {
				this.loader.setColor('#444444');
			}
			this.loader.show(); // Hidden by default				
			if (config.bg && config.bg === true) {
				if (!this.loaderBg) {
					this.loaderBg = $('<div id="smap-loader-bg" />');
					$("body").append(this.loaderBg);
				}
				this.loaderBg.show();
				setTimeout(function() {
					self.loaderBg.addClass("smap-loaderbg-visible");
				}, 1);
			}
		}
		else {
			// This parameter prevents "blinking" occurring when two
			// events hide and show right after each other.
			this.aboutToShow = false;
			if (this.loader) {
				setTimeout(function() {
					if (config.fast) {
						self.loader.hide();
						self.loaderBg.removeClass("smap-loaderbg-visible");
						self.loaderBg.hide();
					}
					else {
						if (!self.aboutToShow) {
							self.loader.hide();
							if (self.loaderBg) {
								self.loaderBg.removeClass("smap-loaderbg-visible");
								setTimeout(function() {
									self.loaderBg.hide();
								}, 400);
							}
						}
					}
				}, 400);
			}
		}
	}
	
	/**
	 * TODO: Make this into a module that listens to events:
	 * 	- showloading
	 * 	- hideloading
	 * 
	 * Show/hide the loading icon. Can be configured
	 * with config object:
	 *  - div {jQuery-tag}
	 *  - text {String} Optional text to show next to the loading icon.
	 * @param show {Boolean} Show (true) or hide (false) the icon.
	 * @param config {Object}
	 * @requires An image at the URL the function is pointing at.
	 * @returns {void}
	 */
	/*_loading: function(show, config) {
		config = config || {};
		
		//sMap.db.loadingIconCount = sMap.db.loadingIconCount || 0;
		
		var onResize = function() {
			var loader = $("#smap-loader");
			var div = loader.parent();
			var left = div.width()/2 - loader.width()/2,
			top = div.height()/2 - loader.height()/2;
			loader.css({
				"left": left+"px",
				"top": top+"px"
			});
		};
		
		var loader = $("#smap-loader");
		//var bg = $("#smap-loader-bg");
		var textTag = loader.find("span");
		
		if (show===true) {
			//sMap.db.loadingIconCount += 1;
			if (!loader.length) {
				var div = config.div || $("#mapDiv"),
					url = config.url || "img/ajax-loader.gif";
				
				loader = $("<div id='smap-loader' />"); // the loader icon and text container
				//bg = $("<div id='smap-loader-bg' />"); // background
				div.append(loader);
				
				var icon = $("<img />");
				icon.prop("src", url);
				loader.append(icon);
				$(window).resize(onResize); // Bind to window resize
				onResize();
			}
			if (config.text) {
				if (!textTag.length) {
					textTag = $("<span />");
					loader.prepend(textTag);
				}
				textTag.text(config.text);
			}
			//bg.show();
			loader.show();
		}
		else {
			//sMap.db.loadingIconCount -= 1;
			//if (sMap.db.loadingIconCount <= 0) { 
				//bg.hide();
				loader.hide();
			//}
		}
	}*/
};

sMap.DivController = OpenLayers.Class({
	
	initialize : function(map) {
		this.map = map;
		if (sMap.config.minWidth) {
			$("#smapDiv").css("min-width", sMap.config.minWidth+"px");
		}
	},
	
	/**
	 * When the browser window is resized - resize all divs in the map that
	 * are part of the sMap-core. Modules need to take care of their own
	 * resizing. Divs part of the core are: smapDiv, mapDiv, toolbarDiv,
	 * sideDivLeft, sideDivRight.
	 * @returns {void}
	 */
	bindOnWindowResize : function() {
		
		/**
		 * JL: Allow elements to adjust when divs have been positioned.
		 */
		sMap.events.register("maploaded", this, function() {
			$(window).resize();
			$(window).resize(); // One extra for Chrome
			
			if ($.browser.msie && parseInt($.browser.version) < 8) {
				// Resize not working in IE7 otherwise
				setTimeout("$(window).resize()", 100);
			}

		});
		
		var self = this;
		
		// On window resize - do this.
		$(window).resize(function(e) {
			var mapDiv = $("#mapDiv"),
				smapDiv = $("#smapDiv"),
				sideDivLeft = $("#sideDivLeft"),
				sideDivRight = $("#sideDivRight"),
				toolbarDiv = $("#toolbarDiv");
			var availWidth = smapDiv.innerWidth(),
				availHeight = smapDiv.innerHeight();
			
			/**
			 * Check size of divs
			 */
			var checkSize = function() {
				var needToResize = false;
				var calcHeight = mapDiv.outerHeight() + toolbarDiv.outerHeight(),
					calcWidth = mapDiv.outerWidth() + (sideDivLeft.is(":visible") ? sideDivLeft.outerWidth() : 0)
					 + (sideDivRight.is(":visible") ? sideDivRight.outerWidth() : 0);
				if (availHeight !== calcHeight) {
					needToResize = true;
				}
				if (availWidth !== calcWidth) {
					needToResize = true;
				}
				return needToResize;
			};
			
			/**
			 * Resize divs
			 */
			var doResize = function() {
				
				// Available height for everything filling up below toolbarDiv.
				var height = availHeight - toolbarDiv.outerHeight();
				$(sideDivLeft).outerHeight(height);
				$(sideDivRight).outerHeight(height);
				$(mapDiv).outerHeight(height);
				
				var mapDivWidth = availWidth - ((sideDivLeft.is(":visible") ? sideDivLeft.outerWidth() : 0) 
						+ (sideDivRight.is(":visible") ? sideDivRight.outerWidth() : 0));
				sideDivRight.css("left", mapDivWidth+"px");
				mapDiv.outerWidth(mapDivWidth);
				self.map.updateSize();
				
				// Adjust mapDivs position if not already done (bug in Chrome).
				if (toolbarDiv.length) {
					var height = toolbarDiv.data("height");
					mapDiv.css("top", height+"px");
				}
				
				/**
				 * Trigger event after window was resized so that modules can adapt their
				 * size AFTER the change has happened.
				 */
				//sMap.events.triggerEvent("afterwindowresized", self, {});
			};
			var needToResize = checkSize();
			if (needToResize===true) {
				doResize();
			}
		});
	},
	
	addToolbarDiv : function(e) {
		if ( $("#toolbarDiv").length) return;
		
		var toolbarDiv = $("<div id='toolbarDiv' />"),
			outerHeight = e.height || 20;
			//outerWidth = $("#smapDiv").innerWidth();
		
		toolbarDiv.data("height", outerHeight); // Store so that resize can move mapdiv down if not already done.
		
		// Decrease the height of all other children of smapDiv.
		var divsToReposition = [ $("#mapDiv"), $("#sideDivLeft"), $("#sideDivRight") ];
		for (var i=0,len=divsToReposition.length; i<len; i++) {
			var div = divsToReposition[i];
			if (div.length) {
				$(div).css({
					"top" : sMap.util.trimCSS($(div).css("top")) + outerHeight+"px",
					"height" : $(div).height() - outerHeight+"px"
				});
			}
		}
		$("#smapDiv").append(toolbarDiv);
		
		// Set height
		$(window).resize(); // Make it possible for modules to adapt to the change
		toolbarDiv.outerHeight(outerHeight);
	},
	
	removeToolbarDiv : function(e) {
		if ( $("#toolbarDiv").length==0) return;
		
		// Calc free space in y-dimension.
		var outerHeight = $("#toolbarDiv").outerHeight();
		$("#toolbarDiv").empty().remove();
		
		// Let the other divs fill the free space.
		var divsToReposition = [ $("#mapDiv"), $("#sideDivLeft"), $("#sideDivRight") ];
		for (var i=0,len=divsToReposition.length; i<len; i++) {
			var div = divsToReposition[i];
			if (div.length) {
				$(div).css({
					"top" : sMap.util.trimCSS($(div).css("top")) - outerHeight+"px"
				});
				$(div).outerHeight( $(div).outerHeight() + outerHeight);
			}
		}
		
		$("#smapDiv").children().each(function() {
			
		});
		$(window).resize(); // Make it possible for modules to adapt to the change
		this.map.updateSize();
	},
	
	removeSideDivLeft : function(e) {
		if ( $("#sideDivLeft").length==0) return;
		
		var outerWidth = $("#sideDivLeft").outerWidth();
		
		$("#sideDivLeft").empty().remove();
		
		// Give the remaining width to the map's div.
		$("#mapDiv").width( $("#mapDiv").width() + outerWidth);
		$("#mapDiv").css({
			"position" : "absolute",
			"left" : "0px"
		});
		$(window).resize(); // Make it possible for modules to adapt to the change
	},
	
	removeSideDivRight : function(e) {
		var sideDivRight = $("#sideDivRight");
		if ( sideDivRight.length==0) return;
		
		var outerWidth = sideDivRight.outerWidth();
		
		sideDivRight.empty().remove();
		
		// Give the remaining width to the map's div.
		$("#mapDiv").width( $("#mapDiv").width() + outerWidth);
		$(window).resize(); // Make it possible for modules to adapt to the change			
	},
	
	hideSideDivRight : function(e) {
		var sideDivRight = $("#sideDivRight");
		if ( sideDivRight.length==0) return;
		var outerWidth = sideDivRight.outerWidth();		
		sideDivRight.hide();
		
		// Give the remaining width to the map's div.
		$("#mapDiv").width( $("#mapDiv").width() + outerWidth);
		$(window).resize(); // Make it possible for modules to adapt to the change
	},
	
	/**
	 * 
	 * @param e {Object}
	 * 	- width {Integer} (Optional) Width of side div in px.
	 * 	- height {Integer} (Optional) Height of side div in px. If not provided, it will
	 * 		automatically adapt (recommended).
	 * @returns {void}
	 */
	addSideDivRight : function(e) {
		if ( $("#sideDivRight").length ) return;
		
		var sideDivRight = $("<div id='sideDivRight' />");
		$("#smapDiv").append(sideDivRight);
		// Calculate the maximum height the div can have and the position from the top.
		var remainingHeight=$("#smapDiv").outerHeight(), // Remaining height for the div
			top = 0;
		if ( $("#toolbarDiv").length ) {
			var h = $("#toolbarDiv").outerHeight();
			remainingHeight -= h;
			top += h;
		}
		var width = e.width || 200,
			height = e.height || remainingHeight;
		
		var sideDivLeft = $("#sideDivLeft");
		
		var mapDivWidth = $("#mapDiv").width();
		var newMapDivWidth = mapDivWidth - width;
		$("#mapDiv").width( newMapDivWidth );
		
		var left = (sideDivLeft.length ? sideDivLeft.outerWidth() : 0) + $("#mapDiv").outerWidth();
		
		sideDivRight.css({
			"position" : "absolute",
			"left" : left+"px",
			"top" : top+"px"
		});
		
		// Set outer width and height of the div.
		sideDivRight.outerWidth(width);
		sideDivRight.outerHeight(height);
		if (sMap.events.mapInitiated) {
			$(window).resize(); // Make it possible for modules to adapt to the change
			this.map.updateSize();			
		}
	},
	
	addSideDivLeft : function(e) {
		if ( $("#sideDivLeft").length ) return;
		
		var sideDivLeft = $("<div id='sideDivLeft' />");
		$("#smapDiv").append(sideDivLeft);
		// Calculate the maximum height the div can have and the position from the top.
		var remainingHeight=$("#smapDiv").outerHeight(), // Remaining height for the div
			top = 0;
		if ( $("#toolbarDiv").length ) {
			var h = $("#toolbarDiv").outerHeight();
			remainingHeight -= h;
			top += h;
		}
		var width = e.width || 200,
			height = e.height || remainingHeight;
		sideDivLeft.css({
			"position" : "absolute",
			"left" : "0px",
			"top" : top+"px"
		});
		
		// Set outer width and height of the div.
		sideDivLeft.outerWidth(width);
		sideDivLeft.outerHeight(height);
		
		// Adjust other divs' position accordingly.
		$("#mapDiv").css({
			"left" : sMap.util.trimCSS($("#mapDiv").css("left")) + width +"px"
		});
		
		var mapDivWidth = $("#mapDiv").width();
		var newMapDivWidth = mapDivWidth - width;
		debug.log($("#mapDiv").width() + "->"+newMapDivWidth);
		$("#mapDiv").width( newMapDivWidth );
		
		if ( $("#sideDivRight").length ) {
			$("#sideDivRight").css({
				"left" : sMap.util.trimCSS($("#sideDivRight").css("left")) + width +"px"
			});
		}
		if (sMap.events.mapInitiated) {
			$(window).resize(); // Make it possible for modules to adapt to the change
			this.map.updateSize();			
		}
	},
	
	CLASS_NAME : "sMap.DivController"
	
});
sMap.Events = OpenLayers.Class(OpenLayers.Events, {
	
	initialize : function() {
		OpenLayers.Events.prototype.initialize.apply(this, arguments);
	},
	
    /**
     * Make sure an object cannot bind the same function more than
     * once to the same event type.
     * 
     * @param type {String}
     * @param obj {Object}
     * @param func {Function}
     * @returns {Boolean}
     */
    funcBoundToEvent : function(type, obj, func) {
    	var listeners = this.listeners[type],
    		regFunc = null,
    		func = func.toString(),
    		className = obj.CLASS_NAME ? obj.CLASS_NAME : null,
    		regObj = null,
    		regClassName = null,
    		sameFuncs = null;
    	for (var i=0,len=listeners.length; i<len; i++) {
    		regFunc = listeners[i].func;
    		regObj = listeners[i].obj;
    		regClassName = regObj.CLASS_NAME ? regObj.CLASS_NAME : null;
    		sameFuncs = regFunc.toString() == func;
    		if (className && regClassName && className === regClassName
    				&& sameFuncs) {
    			return true;
    		}
    	}
    	return false;
    },
	
	/**
     * APIMethod: triggerEvent
     * Trigger a specified registered event.  
     * 
     * Parameters:
     * type - {String} 
     * evt - {Event}
     *
     * Returns:
     * {Boolean} The last listener return.  If a listener returns false, the
     *     chain of listeners will stop getting called.
     */
    triggerEvent: function (type, callerObj, evt) {
        var listeners = this.listeners[type];

        // fast path
        if(!listeners || listeners.length == 0) {
            return undefined;
        }

        // prep evt object with object & div references
        if (evt == null) {
            evt = {};
        }
        evt.object = this.object;
        evt.element = this.element;
        if(!evt.type) {
            evt.type = type;
        }
        evt.caller = callerObj;        
    
        // execute all callbacks registered for specified type
        // get a clone of the listeners array to
        // allow for splicing during callbacks
        listeners = listeners.slice();
        var continueChain;
        for (var i=0, len=listeners.length; i<len; i++) {
            var callback = listeners[i];
            // bind the context to callback.obj
            continueChain = callback.func.apply(callback.obj, [evt]);

            if ((continueChain != undefined) && (continueChain == false)) {
                // if callback returns false, execute no more callbacks.
                break;
            }
        }
        // don't fall through to other DOM elements
        if (!this.fallThrough) {           
            OpenLayers.Event.stop(evt, true);
        }
        return continueChain;
    },
	
	CLASS_NAME : "sMap.Events"
});/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes.js
 * @requires OpenLayers/Console.js
 */

/**
 * Namespace: sMap.Lang
 * Internationalization namespace.  Contains dictionaries in various languages
 *     and methods to set and get the current language.
 */
sMap.Lang = {
    
    /** 
     * Property: code
     * {String}  Current language code to use in OpenLayers.  Use the
     *     <setCode> method to set this value and the <getCode> method to
     *     retrieve it.
     */
    code: null,
    
    /**
     * Holds the languages keyed by module name and then another
     * object keyed by language code. E.g.:
     * 
     * lang = {
     * 		"Email" : {
     * 			"sv-SE" : {
     * 				"buttonPress" : "Tryck här",
     * 				"labelLookHere" : "Titta hit!"
     * 			},
     * 			"en" : {
     * 				"buttonPress" : "Press here",
     * 				"labelLookHere" : "Look here!"
     * 			}
     * 		}
     * }
     * 
     */
    lang : {},
    
    /** 
     * APIProperty: defaultCode
     * {String} Default language to use when a specific language can't be
     *     found.  Default is "en".
     */
    defaultCode: "sv-SE",
        
    /**
     * APIFunction: getCode
     * Get the current language code.
     *
     * Returns:
     * The current language code.
     */
    getCode: function() {
        if(!sMap.Lang.code) {
        	sMap.Lang.code = this.defaultCode;
        	//sMap.Lang.setCode();
        }
        return sMap.Lang.code;
    },
    
    /**
     * APIFunction: setCode
     * Set the language code for string translation.  This code is used by
     *     the <sMap.Lang.translate> method.
     *
     * Parameters-
     * code - {String} These codes follow the IETF recommendations at
     *     http://www.ietf.org/rfc/rfc3066.txt.  If no value is set, the
     *     browser's language setting will be tested.  If no <sMap.Lang>
     *     dictionary exists for the code, the <OpenLayers.String.defaultLang>
     *     will be used.
     */
    setCode: function(code) {
        var lang;
        
        // Hack for IE because jQuery async = false seems not to
        // work for loading the config script in IE and therefore
        // lang is set before the config has been loaded. Crazy...or?
        if (!sMap.config || !sMap.config.modules) {
        	lang = code || sMap.Lang.defaultCode;
        	sMap.Lang.code = lang;
        	return;
        }
        // End of hack
        
        if(!code) {
            code = (OpenLayers.Util.getBrowserName() == "msie") ?
                navigator.userLanguage : navigator.language;
        }
        var parts = code.split('-');
        parts[0] = parts[0].toLowerCase();
        
        var notSupportingArr = this.frameworkSupportsLang(parts[0]);
        if (notSupportingArr.length == 0) {
        	lang = parts[0];
        }
        // check for regional extensions
        if(parts[1]) {
            var testLang = parts[0] + '-' + parts[1].toUpperCase();
            notSupportingArr = this.frameworkSupportsLang(testLang);
            if (notSupportingArr.length == 0) {
            	lang = testLang;
            }
        }
        if (notSupportingArr.length) {
        	debug.warn(sMap.langDict[sMap.Lang.defaultCode].warnLangNotSupportedByFramework +
        			" Code: "+code+" is not supported by: "+notSupportingArr.join(", "));
        	lang = sMap.Lang.defaultCode;
        }
        if(!lang) {
        	OpenLayers.Console.warn(
                'Failed to find sMap.Lang.lang.' + parts.join("-") +
                ' dictionary, falling back to default language'
            );
            lang = sMap.Lang.defaultCode;
        }
        
        debug.log("Now using lang code: "+lang);
        sMap.Lang.code = lang;
    },
    
    /**
     * Check if the language (code) is supported by all modules
     * and by the framework core.
     * @property langCode {String} E.g. sv-SE or en
     * @returns {Array} The modules or sMap-core that does not support the language. This
     * means if the array is empty - the language is fully supported.
     */
    frameworkSupportsLang : function(langCode) {
    	 /**
         * Check if all modules support this language.
         * Otherwise, fall back on default language.
         */
    	
        var modules = sMap.config.modules || [];
    	
    	var dict,
    		modNameLast,
    		CLASS_NAME,
    		moduleNameArr,
    		notSupporting = [];
        for (var i=0,len=modules.length; i<len; i++) {
        	// In case of long module name (e.g. "sMap.Module.OverlaySwitcher.SimpleSwitcher")
        	// Get the sub-level of lang.
        	dict = sMap.Lang.lang;
        	CLASS_NAME = modules[i].init.prototype.CLASS_NAME;
        	MODULE_NAME = CLASS_NAME.replace("sMap.Module.", "");
        	moduleNameArr = MODULE_NAME.split("."); // in case of multiple module name like ClassName.SubClassName
        	for (var i=0,len=moduleNameArr.length; i<len; i++) {
        		dict = dict[moduleNameArr[i]]; // Get the last component of class name
        	}
        	if (typeof dict[langCode] != "object") {
        		notSupporting.push(CLASS_NAME);
        	}
        }
        // Also check if sMap.langDict supports this language
        if (!sMap.langDict[langCode] instanceof Object) {
        	notSupporting.push("SMAP-CORE");
        }
        return notSupporting;
    },

    /**
     * APIMethod: translate
     * Looks up a key from a dictionary based on the current language string.
     *     The value of <getCode> will be used to determine the appropriate
     *     dictionary.  Dictionaries are stored in <sMap.Lang>.
     *
     * Parameters:
     * key - {String} The key for an i18n string value in the dictionary.
     * context - {Object} Optional context to be used with
     *     <OpenLayers.String.format>.
     * 
     * Returns:
     * {String} A internationalized string.
     */
    translate: function(key, context) {
        var dictionary = sMap.Lang.lang[sMap.Lang.getCode()];
        var message = dictionary && dictionary[key];
        if(!message) {
            // Message not found, fall back to message key
            message = key;
        }
        if(context) {
            message = OpenLayers.String.format(message, context);
        }
        return message;
    },
    
    
    
    
    translateModules : function(code) {
    	if (code && typeof(code)=="string") {
    		sMap.Lang.setCode(code);
    	}
    	code = sMap.Lang.getCode();
    	sMap.moduleController.removeModules();
    	sMap.moduleController.addModules();
    }
    
};


/**
 * APIMethod: OpenLayers.i18n
 * Alias for <sMap.Lang.translate>.  Looks up a key from a dictionary
 *     based on the current language string. The value of
 *     <sMap.Lang.getCode> will be used to determine the appropriate
 *     dictionary.  Dictionaries are stored in <sMap.Lang>.
 *
 * Parameters:
 * key - {String} The key for an i18n string value in the dictionary.
 * context - {Object} Optional context to be used with
 *     <OpenLayers.String.format>.
 * 
 * Returns:
 * {String} A internationalized string.
 */
OpenLayers.i18n = sMap.Lang.translate;
	
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
			debug.error(sMap.lang.errBaselayerDoesNotExist+" layerName: "+layerName);
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
		// Make the map resizable.
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
			smapDiv = $("<div id='smapDiv' />");
		
		$(mapTag).append(smapDiv);
		smapDiv.append(mapDiv);
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





sMap.ModuleController = OpenLayers.Class({
	
	toBeActivated : 0,
	modulesAdded : false,
	modules : [],
	controlsToBeActivated: [],
	
	initialize : function(map) {
		this.map = map;
		
	},
	
	/**
	 * Get the configuration object for the module (default location is in same
	 * folder as other module files). The add all modules one by one, attaching the
	 * configuration object, bound as "this.config".
	 * @param modules {Array || <sMap.Module.initialize> } An array with all modules' constructor method}. 
	 * @returns void
	 */
	addModules : function(modules) {
		modules = modules || sMap.config.modules;
		
		for (var i=0,len=modules.length; i<len; i++) {
			var t = modules[i];
			var className = typeof t.init == "String" ? t.init : t.init.prototype.CLASS_NAME;
	    	this.addModule(className, t.config);
		}
		
		/*
		 * When all modules have been added the ones which should be
		 * activated should so be.
		 */
		sMap.events.register("modulesadded", this, function(e) {
			var controls = this.controlsToBeActivated;
			sMap.events.triggerEvent("beforemodulesactivated", this, {
				modules: this.controlsToBeActivated
			});
			// Iterate through all controls that should be activated
			for (var i=0,len=controls.length; i<len; i++) {
				controls[i].activate();
			}
			sMap.events.triggerEvent("aftermodulesactivated", this, {
				modules: this.controlsToBeActivated
			});
		});
		
		/**
		 * Trigger event "modulesadded".
		 */
		sMap.events.triggerEvent("modulesadded", this, {});
		sMap.events.modulesAdded = true;
	},
	
	/**
	 * Remove and destroy given modules.
	 * @returns void
	 */
	removeModules : function(modules) {
		for (var i=0,len=modules.length; i<len; i++) {
			this.removeModule(modules[i]);
		}
	},
	
	/**
	 * Get config from the config file of the module.
	 * @param constructor
	 * @returns {Object} Config object from file.
	 */
	getFileConfig : function(constructor) {
		var className = typeof constructor == "string" ? constructor : constructor.prototype.CLASS_NAME;
		var classNameArr = className.split(".");
    	var moduleName = classNameArr[classNameArr.length-1];
		var url = "modules/Module/" + moduleName + "/" + moduleName +"_conf.js";
		
		/**
		 * Get the configuration for this module.
		 * Use synched GET request so that for-loop
		 * won't proceed until the response has come.
		 */
    	$.ajax({
    		type : "GET",
    		dataType : "script",
    		async : false,
    		url : url
    	});
    	
    	return module_config;
	},
	
	/**
	 * Add a module to the map.
	 * @param constructor {Function} In OL-classes it has the name "initialize".
	 * @param config {Object} Optional. If not provided, config will automatically be loaded.
	 * @returns
	 */
	addModule : function(constructor, config) {
		var className = typeof constructor == "string" ? constructor : constructor.prototype.CLASS_NAME;
		if (typeof constructor == "string") {
			constructor = eval(constructor);
		}
		if (!className) {
			debug.error("Module "+className+" does not exist.");
			return;
		}
		// Don't add the module if it has already been added.
//		var ctrlExists = this.map.getControlsByClass(className).length ? true : false;
//		if (ctrlExists===true) {
//			return;
//		}
		var ctrl = new constructor(config);
		this.map.addControl(ctrl);
		if (config.initType == "control") {
			return;
		}
		/**
		 * sMap always sets OL's property autoActivate to false.
		 * Instead 
		 */
		
		if (ctrl.activateFromStart===true) {
			this.controlsToBeActivated.push(ctrl);
		}
		this.modules.push(ctrl);
		
	},
	
	/**
	 * Remove module from map and call destroy.
	 * @param module {sMap.Module}
	 * @returns void
	 */
	removeModule : function(module) {
		this.map.removeControl(module);
		module.destroy();
	},
	
	
	CLASS_NAME : "sMap.ModuleController"
});/**
 * Contains utility function used by sMap core and sMap modules.
 */



sMap.util = {
		
		/**
		 * 
		 * @param resolution
		 * @returns
		 */
		getScaleFromResolution: function(resolution) {
			var units = sMap.map.getUnits();  // sMap.map.baseLayer.units;
			scale = OpenLayers.Util.getScaleFromResolution(resolution, units);
			return scale;
		},
		
		/**
		 * Create a unique id. The nbr makes sure it is unique.
		 * @param prefix {String} Optional.
		 * @returns {String} A unique ID.
		 */
		createUniqueId: function(prefix) {
			this.nbr = !this.nbr 
			
			
			prefix = prefix || "";
			this.nbr = typeof this.nbr === "undefined" ? 0 : this.nbr + 1;
			return prefix + this.nbr;
		},
		
		/**
		 * Don't allow events going through the given element to the
		 * the map on these events:
		 * 
		 * @param tag {HTML Object}
		 * @returns {void}
		 */
		disableMapInteraction: function(tag) {
			$(tag).dblclick(function(e) {
				OpenLayers.Event.stop(e);
			});
			$(tag).mousedown(function(e) {
				OpenLayers.Event.stop(e);
			});
			$(tag).click(function(e) {
				OpenLayers.Event.stop(e);
			});
		},
		
		/**
	     * Method: getNearestFeature
	     * Return the feature closest to the clicked position.
	     * 
	     * Parameters:
	     * features - {Array(<OpenLayers.Feature.Vector>)}
	     * clickPosition - {<OpenLayers.LonLat>}
	     */
	    getNearestFeature: function(features, clickPosition) {
	        if(features.length) {
	            var point = new OpenLayers.Geometry.Point(clickPosition.lon,
	                clickPosition.lat);
	            var feature, resultFeature, dist;
	            var minDist = Number.MAX_VALUE;
	            for(var i=0; i<features.length; ++i) {
	                feature = features[i];
	                if(feature.geometry) {
	                    dist = point.distanceTo(feature.geometry, {edge: false});
	                    if(dist < minDist) {
	                        minDist = dist;
	                        resultFeature = feature;
	                        if(minDist == 0) {
	                            break;
	                        }
	                    }
	                }
	            }
	            return resultFeature;
	        }
	    },
		
		/**
		 * Replace all attribute keys found in curly brackets ${...} by
		 * the attribute value corresponding to the key. This method is
		 * used by Popup and BlixtenPopup modules.
		 * 
		 * @param attributes {Object} The feature's attributes.
		 * @param text {String} The text, which might contain some attribute keys.
		 * @returns {String}
		 */
		extractAttributes : function(attributes, text) {
			function extractAttribute(a, txt) {
				var index = txt.search(/\${/g);
				if (index !== -1) {
					var extractedAttribute = "";
					
					// Find the end of the attribute
					var attr = text.substring(index + 2);
					var endIndex = 0;
					if (attr.substring(0, 8) === "function") {
						endIndex = sMap.util.getFunctionEnd(attr);
					}
					else {
						endIndex = attr.search(/\}/g);
						
					}
					attr = attr.substring(0, endIndex);
					
					if (attr.substring(0, 8) === "function") {
						var theFunc = attr.replace("function", "function f");
						eval(theFunc);
//						alert(typeof f);
						extractedAttribute = f.call(this, a);
					}
					else {
						// Replace ${...} by the extracted attribute.
						extractedAttribute = a[attr] || ""; // If attribute does not exist – use empty string "".						
					}
					txt = txt.replace("${"+attr+"}", extractedAttribute);
				}
				return txt;
			}
			
			// Extract attributes until there are no left to extract.
			var index = text.search(/\${/g);
			while (index !== -1) {
				text = extractAttribute(attributes, text);			
				index = text.search(/\${/g);
			}
			return text;
		},
		
		getFunctionEnd: function(text) {
			var p = 1,
	            found = false,
	            startIndex = text.search(/\{/g); // get starting "{"
	        text = text.substring(startIndex+1);
	        var i=0;            
	        for (i=0,len=text.length; i<len; i++) {
	        	if (text.charAt(i) === "{") {
	        		p += 1;
	        	}
	        	else if (text.charAt(i) === "}") {
	        		p -= 1;
	        	}
	        	if (p === 0) {
	        		found = true;
	        		i = i + startIndex + 2;
	        		break;
	        	}
	        }
	        if (!found) {
	        	i = -1;
	        }
	        return i;
	    },
		
		/**
		 * Add a question mark to the URL IF it does not exist.
		 * Note! You might be better using OpenLayers.Util.urlAppend
		 * @param url {String}
		 * @returns {String}
		 */
		addQMark: function(url) {
			if (url.indexOf(url.length - 1) != "?") {
				url += "?";
			}
			return url;
		},
		/**
		 * Add a slash to the path if it does not already exist.
		 * Note! You might be better using OpenLayers.Util.urlAppend
		 * @param path {String}
		 * @returns {String}
		 */
		addSlash: function(path) {
			if (path.indexOf(path.length - 1) != "/") {
				path += "/";
			}
			return path;
		},
		
		/**
		 * Get the geometry type of the input feature:
		 * 	- point
		 *  - line
		 *  - polygon
		 *  
		 * @param feature geometry {OpenLayers.Geometry}
		 * @returns {String} "point", "line", "polygon" || {null} (if no match was found)
		 */
		getGeomType : function(geometry) {
			var area = geometry.getArea(),
				length = geometry.getLength();
			if ( area==0 && length==0) {
				// point
				return "point";
			}
			else if ( area==0 && length > 0) {
				return "line";
			}
			else if ( area > 0 && length > 0) {
				return "polygon";
			}
			else {
				return null;
			}
			
			
		},
		
		/**
		 * Get the map's starting pixel (upper-left) in relation
		 * to the document.
		 * @returns {Object}
		 *     - left {Integer} Distance in px from left.
		 *     - top {Integer} Distance in px from top.
		 */
		getMapOrigo : function() {
			return $("#mapDiv").position();
		},
		
		/**
		 * Trim and parse css values: px, em or pt.
		 * @param str {String} E.g. "5px" -> 5.0
		 * @returns {Float}
		 */
		trimCSS : function(str) {
			str = str.replace("px", "").replace("em", "").replace("pt", "");
			return parseFloat(str);
		},
		
		/**
		 * Convert parameters object to string. Keys will be made into lower-case
		 * @param obj {Object} Key value pairs that will be converted to URL parameters {String}
		 * @returns {String} URL parameters string.
		 */
		paramsObjToString : function(obj) {
			var params = "";
			for (var k in obj) {
				var val = obj[k];
				params = params + "&"+k+"="+val;
			}
			params = params.substring(1);
			return params;
		},
		
		/**
		 * TODO: Replace this by $.inArray which does the same thing.
		 * Give support for indexOf for IE.
		 * @param arr {Array}
		 * @param item {Any supported type} Item in the array.
		 * @returns {Integer}
		 */
		indexOf : function(arr, item) {
			if (navigator.appName == 'Microsoft Internet Explorer') {
				for (var i=0,len=arr.length; i<len; i++) {
					if (arr[i]==item) {
						return i;
					}
				}
				return -1;
			}
			else {
				return arr.indexOf(item);
			}
		},
		
		/**
		 * Get the parameter value in the URL.
		 * @param url {String} The URL
		 * @param param {String} The parameter in the URL. E.g. 'width'
		 * @return {String}
		 *     Parameter value. If param not in url -> returns null. If param in URL but no value -> returns "".
		 */
		getParameterValueFromURL : function(url, param) {
			url = url.toLowerCase();
			param = param.toLowerCase();
			
			var val = null;
			
			var paramExists = url.search(param + "=");
			if (paramExists!=-1) {
				var urlR = url.split(param + "=")[1];
				val = urlR.split("&")[0];
			}
			return val;
		},
		
		infoDialog : function(div, config) {
			var defaultConfig={
				resizable: true
			};
			
			$.extend(defaultConfig, config);
			var theDialog = div.dialog(defaultConfig);
			return theDialog;
		},
		
		
		/**
		 * Binds a jQuery dialog to input div with desired settings.
		 * @param div {jQuery-div} The div to which the dialog will be bound.
		 * @param config {Object} Containing dialog settings of which these are required:
		 *     - width
		 *     - height
		 * @returns void
		 */
		createDialog : function(div, config) {
			config = config || {};
			
			// Put default values for config attributes.
			
			var defConfig = {
					titleText: "",
					position: [68,40],
					minWidth: 50,
					minHeight: 50,
					modal: false,
					draggable: true
			};
			config = $.extend(true, defConfig, config);
			
			// Initiate the dialog - but start closed.
			div.dialog( {
				autoOpen : false,
				title : config.title || config.titleText,
				closeOnEscape: config.closeOnEscape===false ? false : true,
				bgiframe : true,
				width : config.width,
				height : config.height,
				minWidth : config.minWidth,
				minHeight : config.minHeight,
				maxHeight : config.maxHeight,
				modal : config.modal,
				resizable : config.resizable,
				draggable : config.draggable,
				position: config.position, // problems in IE7 - don't know why!!!
				//zIndex: 1004,
				buttons : config.buttons,
				dragStart: function(e, ui) {
					/*$(this).parent().css({
						"filter" : "alpha(opacity=70)",
						"opacity" : "0.7"
					});
					$(this).hide(); // hide the content when dragging.*/
				},
				dragStop : function(e, ui) {
					/*$(this).parent().css({
						"filter" : "alpha(opacity=100)",
						"opacity" : "1"
					});
					$(this).show();*/
					if (config.dragStop!=null) {
						config.dragStop.call(e, ui);
					}
				},
				focus : config.onFocus,
				close : config.onClose,
				show: config.onShow,
				open : function(e, ui) {
					// After adding relative width and height to the sMap core divs
					// an issue occurred in IE7 when a dialog opens - everything becomes white.
					// This solves things (hopefully there are no severe side-effects to expect :P)
					if ($.browser.msie) {
						$("#smapDiv").hide().show();
					}
					if (config.onOpen) {
						config.onOpen(e, ui);
					}
				}
			});
		},
		/**
		 * Take away "px" from the string and parse int.
		 * @param numberPx {String} A string, e.g. '128px'
		 */
		takeAwayPx : function(numberPx) {
			var nr = null;
			if (numberPx && numberPx.length) {
				var nrAsTxt = numberPx.substring(0, numberPx.length-2);
				nr = parseInt(nrAsTxt);
			}
			return nr;
		},
		/**
		 * Take away a specified amount of right-most characters in the input text string and return it.
		 * @param text {String} The input string to be processed.
		 * @param nr {Integer] The number of chars to take away from the right of the string.
		 * @return
		 */
		rightStrip : function(text, nr) {
			var newText = null;
			if (text.length >= nr) {
				newText = text.substring(0, text.length-nr);
			}
			else {
				newText = text;
			}	
			return newText;
		},
		/**
		 * Return a (re)projected point.
		 * 
		 * TODO: This function should be made deprecated since OpenLayers.Geometry
		 * instances "make the beef" like this: geom.transform(fromProj, toProj).
		 * 
		 * @param sourceEPSG {String} EPSG code for the source projection. E.g. "EPSG:3008"
		 * @param destEPSG {String} EPSG code for the source projection. E.g. "EPSG:4326"
		 * @param x {Number} x or lon or "easting"
		 * @param y {Number} y or lat or "northing"
		 * @return {Object} Projected point. x and y are stored as: p.x and p.y
		 */
		projectPoint : function(sourceEPSG, destEPSG, x, y) {
			sourceEPSG = sourceEPSG.toUpperCase();
			destEPSG = destEPSG.toUpperCase();
			
			var p = new Proj4js.Point(x, y);
			var projSource = new Proj4js.Proj(sourceEPSG); // source projection
			var projDest = new Proj4js.Proj(destEPSG); // destination projection
			Proj4js.transform(projSource, projDest, p);
			return p;
		},
		
		/**
		 * Show a text that follows the cursor.
		 * 
		 * @param html {String}
		 * @returns {void}
		 */
		showMouseMoveText: function(html) {
			var className = "util-cursordiv";
			var mapX, mapY;
			this.onMouseMove = this.onMouseMove || function(e) {
				$("."+className).css({
					"left" : e.pageX - mapX + 14 + "px",
					"top" : e.pageY - mapY + 20 + "px"
				}).show();
			};
			var d = $("<div class='"+className+"'><p></p></div>");
			d.find("p").append(html);
			$("#smapDiv").append(d);
			d.hide();
			
			var p = sMap.util.getMapPosition();
			mapX = p.x;
			mapY = p.y;
			$("#smapDiv, .olMapViewport").mousemove(this.onMouseMove);
		},
		
		/**
		 * Remove the div that follows the cursor.
		 * 
		 * @returns {void}
		 */
		hideMouseMoveText: function() {
			var className = "util-cursordiv";
			$("."+className).empty().remove();
			$("#smapDiv").unbind("mousemove", this.onMouseMove);
		},
		
		/**
		 * Returns the pixel of the top-left-most pixel of the pageDiv (which contains the map).
		 * This is used by tool windows to get a suitable initial position, independent on
		 * surrounding divs (around the map).
		 * 
		 * @return {} Keys: x, y -> Values: int, int
		 */
		getMapPosition : function() {
			var pageDivCSSLeftPx = $("#sideDivLeft").length ? $("#sideDivLeft").width() + "px" : "0px",
				pageDivCSSTopPx = $("#pageDiv").css("top"); // deriving top from map gives error in IE
			
			var pageDivCSSLeft = sMap.util.takeAwayPx(pageDivCSSLeftPx),
				pageDivCSSTop = sMap.util.takeAwayPx(pageDivCSSTopPx),
				toolbarTop = $("#toolbar").length>0 ? $("#toolbar").height() : 0;
			
			var viewPortTop = pageDivCSSTop + toolbarTop;
			return {"x" : pageDivCSSLeft, "y" : viewPortTop};
		},
		
		
		addDialogMinimizeButton: function(dialogDiv, options) {
			options = options || {};
			
			options.untoggleOnClose = !options.untoggleOnClose ? true : options.untoggleOnClose; // default true
			
			var btnMini = $('<a class="ui-dialog-titlebar-minimize ui-corner-all" role="button"><span class="ui-icon ui-icon-triangle-1-n">minimize</span></a>');
			dialogDiv.prev().find(".ui-dialog-title").after(btnMini);
			dialogDiv.isVisible = true;
			var oldHeight = null,
				oldPadding = null;
			var resizable = dialogDiv.dialog("option", "resizable");
			var toggleDialog = function() {
				if (dialogDiv.isVisible) {
					// Flip it up – hide it!
					oldHeight = dialogDiv.dialog("option", "height");
					
					if ( ($.browser.msie && parseInt($.browser.version) < 8) !== true) {
						oldPadding = dialogDiv.css("padding");
						dialogDiv.data("oldPadding", oldPadding);
						dialogDiv.css("padding", "0.01em");
					}
					
					dialogDiv.hide(0, function() {
						dialogDiv.dialog("option", "height", 0);
						dialogDiv.dialog("option", "resizable", false);
						btnMini.find("span").removeClass("ui-icon-triangle-1-n").addClass("ui-icon-triangle-1-s");
					});
					
					dialogDiv.parent().css("opacity", "0.8").find(".ui-dialog-buttonpane").hide();
				}
				else {
					// Flip it down – show it!
					dialogDiv.show(0, function() {
						dialogDiv.dialog("option", "height", oldHeight);
						oldPadding = dialogDiv.data("oldPadding");
						if (oldPadding) {
							dialogDiv.css("padding", oldPadding);
						}
						if (resizable) {
							dialogDiv.dialog("option", "resizable", true);							
						}
						btnMini.find("span").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-n");
					});
					dialogDiv.parent().css("opacity", "1").find(".ui-dialog-buttonpane").show();
				}
				dialogDiv.isVisible = !dialogDiv.isVisible;
			};
			var onMouseEnter = function() {
				$(this).addClass("ui-state-hover");
			};
			var onMouseLeave = function() {
				$(this).removeClass("ui-state-hover");
			};
			dialogDiv.prev().dblclick(toggleDialog);
			btnMini.click(toggleDialog).mouseenter(onMouseEnter).mouseleave(onMouseLeave);
			dialogDiv.toggleDialog = toggleDialog;
			
			// -- Make the dialog untoggle on close
			if (options.untoggleOnClose) {
				var onClose = function() {
					if (!dialogDiv.isVisible) {
						toggleDialog();
					}
				};
				dialogDiv.bind("dialogclose", onClose);
			}
			
			
			dialogDiv.on("dialogdragstart", function() {
				$(this).children().hide();
				$(this).parent().css({
					"filter": "alpha(opacity=70)",
			    	"opacity": "0.7"
				});
			});
			dialogDiv.on("dialogdragstop", function() {
				$(this).parent().css({
					"filter": "alpha(opacity=100)",
			    	"opacity": "1"
				});
				$(this).children().show();
			});
			
			
		}
};/**
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
	applyDefaultParams : function(paramsObj) {
		paramsObj = paramsObj || this.getParamsAsObject();
		
		this.map.zoomToMaxExtent();

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
			for (var i=0,len=olArr.length; i<len; i++) {
				var layerName = olArr[i];
				var t = sMap.cmd.getLayerConfig(layerName);
				if (!t) {
					debug.warn(sMap.lang.errWebParamLayerNotFound);
				}
				else {
					t.startVisible = true;					
					arrLayersToAdd.push(t);
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
		if (!paramsObj.ZOOM && !paramsObj.CENTER) {
			var b = sMap.config.defaultExtent;
			if (b)
				this.map.zoomToExtent(new OpenLayers.Bounds(b.w, b.s, b.e, b.n), false);
			else
				this.map.zoomToMaxExtent();
		}
	},
	
	CLASS_NAME : "sMap.WebParams"
	
});






OpenLayers.Control.DeleteFeature = OpenLayers.Class(OpenLayers.Control, {
	initialize: function(layer, options) {
		OpenLayers.Control.prototype.initialize.apply(this, [options]);
		this.layer = layer;
		this.handler = new OpenLayers.Handler.Feature(
		  this, layer, {click: this.clickFeature}
		);
	},
	clickFeature: function(feature) {
	    // if feature doesn't have a fid, destroy it
	   if (feature.fid == undefined) {
		   this.layer.destroyFeatures([feature]);
	   }
	   else {
	      feature.state = OpenLayers.State.DELETE;
	      this.layer.events.triggerEvent("afterfeaturemodified", 
	      {feature: feature});
	      feature.renderIntent = "select";
	      this.layer.drawFeature(feature);
	    }
		sMap.events.triggerEvent("featuredeleted", this, {});
	},
	setMap: function(map) {
	    this.handler.setMap(map);
	    OpenLayers.Control.prototype.setMap.apply(this, arguments);
	},
	
	CLASS_NAME: "OpenLayers.Control.DeleteFeature"


});

OpenLayers.Handler.ModDrag = OpenLayers.Class(OpenLayers.Handler.Drag, {
	
	
	/**
     * Constructor: OpenLayers.Handler.Drag
     * Returns OpenLayers.Handler.Drag
     * 
     * Parameters:
     * control - {<OpenLayers.Control>} The control that is making use of
     *     this handler.  If a handler is being used without a control, the
     *     handlers setMap method must be overridden to deal properly with
     *     the map.
     * callbacks - {Object} An object containing a single function to be
     *     called when the drag operation is finished. The callback should
     *     expect to recieve a single argument, the pixel location of the event.
     *     Callbacks for 'move' and 'done' are supported. You can also speficy
     *     callbacks for 'down', 'up', and 'out' to respond to those events.
     * options - {Object} 
     */
    initialize: function(control, callbacks, options) {
		OpenLayers.Util.extend(this, options);
        OpenLayers.Handler.Drag.prototype.initialize.apply(this, arguments);
    },
	
	/**
     * Method: dragstart
     * This private method is factorized from mousedown and touchstart methods
     *
     * Parameters:
     * evt - {Event} The event
     *
     * Returns:
     * {Boolean} Let the event propagate.
     */
    dragstart: function (evt) {
        var propagate = true;
        this.dragging = false;
        
        if (OpenLayers.Event.isLeftClick(evt) ||
                OpenLayers.Event.isSingleTouch(evt) ) {
            this.started = true;
            this.start = evt.xy;
            this.last = evt.xy;
            OpenLayers.Element.addClass(
                this.map.viewPortDiv, "olDragDown"
            );
            this.down(evt);
            this.callback("down", [evt.xy]);

            OpenLayers.Event.stop(evt);

            if(!this.oldOnselectstart) {
                this.oldOnselectstart = document.onselectstart ?
                    document.onselectstart : OpenLayers.Function.True;
            }
            document.onselectstart = OpenLayers.Function.False;

            propagate = !this.stopDown;
        } else {
            this.started = false;
            this.start = null;
            this.last = null;
        }
        return propagate;
    },
    
    mousedown: function(evt) {
    	// JL: Mod - keep track of if keyMask button was pressed.
        this.keyMaskPressed = this.checkModifiers(evt) == 1 ? true : false;
    	
        return this.dragstart(evt);
    },

	CLASS_NAME : "OpenLayers.Handler.ModDrag"
});

OpenLayers.Handler.ModBox = OpenLayers.Class(OpenLayers.Handler.Box, {
	
	/**
     * Constructor: OpenLayers.Handler.Box
     *
     * Parameters:
     * control - {<OpenLayers.Control>} 
     * callbacks - {Object} An object with a "done" property whose value is a
     *     callback to be called when the box drag operation is finished.  
     *     The callback should expect to recieve a single argument, the box 
     *     bounds or a pixel. If the box dragging didn't span more than a 5 
     *     pixel distance, a pixel will be returned instead of a bounds object.
     * options - {Object} 
     */
    initialize: function(control, callbacks, options) {
		OpenLayers.Util.extend(this, options);
		OpenLayers.Handler.Box.prototype.initialize.apply(this, arguments);
		
        this.dragHandler = new OpenLayers.Handler.ModDrag(
            this,
            {
                down: this.startBox, 
                move: this.moveBox, 
                out: this.removeBox,
                up: this.endBox
            },
            {keyMask: this.keyMask}
        );
    },
	
	CLASS_NAME : "OpenLayers.Handler.ModBox"
	
	
});/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 * @requires OpenLayers/Console.js
 */

/**
 * Class: OpenLayers.Control
 * Controls affect the display or behavior of the map. They allow everything
 * from panning and zooming to displaying a scale indicator. Controls by 
 * default are added to the map they are contained within however it is
 * possible to add a control to an external div by passing the div in the
 * options parameter.
 * 
 * Example:
 * The following example shows how to add many of the common controls
 * to a map.
 * 
 * > var map = new OpenLayers.Map('map', { controls: [] });
 * >
 * > map.addControl(new OpenLayers.Control.PanZoomBar());
 * > map.addControl(new OpenLayers.Control.MouseToolbar());
 * > map.addControl(new OpenLayers.Control.LayerSwitcher({'ascending':false}));
 * > map.addControl(new OpenLayers.Control.Permalink());
 * > map.addControl(new OpenLayers.Control.Permalink('permalink'));
 * > map.addControl(new OpenLayers.Control.MousePosition());
 * > map.addControl(new OpenLayers.Control.OverviewMap());
 * > map.addControl(new OpenLayers.Control.KeyboardDefaults());
 *
 * The next code fragment is a quick example of how to intercept 
 * shift-mouse click to display the extent of the bounding box
 * dragged out by the user.  Usually controls are not created
 * in exactly this manner.  See the source for a more complete 
 * example:
 *
 * > var control = new OpenLayers.Control();
 * > OpenLayers.Util.extend(control, {
 * >     draw: function () {
 * >         // this Handler.Box will intercept the shift-mousedown
 * >         // before Control.MouseDefault gets to see it
 * >         this.box = new OpenLayers.Handler.Box( control, 
 * >             {"done": this.notice},
 * >             {keyMask: OpenLayers.Handler.MOD_SHIFT});
 * >         this.box.activate();
 * >     },
 * >
 * >     notice: function (bounds) {
 * >         OpenLayers.Console.userError(bounds);
 * >     }
 * > }); 
 * > map.addControl(control);
 * 
 */
sMap.Module = OpenLayers.Class({
	
	/**
	 * Modules location in relation to smap root.
	 */
	modulesLocation : "modules/Module/",
	
	/**
	 * The folder of this module
	 */
	ROOT : null,
	
    /** 
     * Property: id 
     * {String} 
     */
    id: null,
    
    /** 
     * Property: map 
     * {<OpenLayers.Map>} this gets set in the addControl() function in
     * OpenLayers.Map 
     */
    map: null,

    /** 
     * Property: div 
     * {DOMElement} 
     */
    div: null,

    /** 
     * Property: type
     * {Number} Controls can have a 'type'. The type determines the type of
     * interactions which are possible with them when they are placed in an
     * <OpenLayers.Control.Panel>. 
     */
    type: null, 

    /** 
     * Property: allowSelection
     * {Boolean} By deafault, controls do not allow selection, because
     * it may interfere with map dragging. If this is true, OpenLayers
     * will not prevent selection of the control.
     * Default is false.
     */
    allowSelection: false,  

    /** 
     * Property: displayClass 
     * {string}  This property is used for CSS related to the drawing of the
     * Control. 
     */
    displayClass: "",
    
    /**
    * Property: title  
    * {string}  This property is used for showing a tooltip over the  
    * Control.  
    */ 
    title: "",

    /**
     * APIProperty: autoActivate
     * {Boolean} Activate the control when it is added to a map.  Default is
     *     false.
     */
    autoActivate: false,
    /**
     * sMap specific property replacing autoActivate
     */
    activateFromStart : false,

    /** 
     * Property: active 
     * {Boolean} The control is active.
     */
    active: null,

    /** 
     * Property: handler 
     * {<OpenLayers.Handler>} null
     */
    handler: null,
    
    
    /**
     * APIProperty: eventListeners
     * {Object} If set as an option at construction, the eventListeners
     *     object will be registered with <OpenLayers.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,

    /** 
     * Property: events
     * {<OpenLayers.Events>} Events instance for triggering control specific
     *     events.
     */
    events: null,
    
    /**
     * Constant: EVENT_TYPES
     * {Array(String)} Supported application event types.  Register a listener
     *     for a particular event with the following syntax:
     * (code)
     * control.events.register(type, obj, listener);
     * (end)
     *
     * Listeners will be called with a reference to an event object.  The
     *     properties of this event depends on exactly what happened.
     *
     * All event objects have at least the following properties:
     * object - {Object} A reference to control.events.object (a reference
     *      to the control).
     * element - {DOMElement} A reference to control.events.element (which
     *      will be null unless documented otherwise).
     *
     * Supported map event types:
     * activate - Triggered when activated.
     * deactivate - Triggered when deactivated.
     */
    EVENT_TYPES: ["activate", "deactivate"],
    
    
    /**
	 * The smap-events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["modulesadded"],
	
	/**
	 * The smap-events triggered from this module. Modules should not
	 * listen and trigger the same event. Instead it should be solved
	 * by calling an internal method within the module when the event
	 * is triggered.
	 */
	EVENT_TRIGGERS : [],

    /**
     * Constructor: OpenLayers.Control
     * Create an OpenLayers Control.  The options passed as a parameter
     * directly extend the control.  For example passing the following:
     * 
     * > var module = new OpenLayers.Module({div: myDiv});
     *
     * Overrides the default div attribute value of null.
     * 
     * Parameters:
     * options - {Object} 
     */
    initialize: function(options) {
        // We do this before the extend so that instances can override
        // className in options.
        //this.displayClass = this.CLASS_NAME.replace("OpenLayers.", "ol").replace(/\./g, "");
        
		
	
        this.MODULE_NAME = this.getModuleName(); // Store the last part of the class name
        this.ROOT = this.modulesLocation + this.MODULE_NAME + "/";
        
        // Get the configuration from file and extend it with
        // config given as parameter.
        var fileConfig = this.getFileConfig();
		$.extend(true, fileConfig, options);
		$.extend(true, this, fileConfig);
        
        this.addSmapEventTypes();
        
        // Add control events (events bound to this module).
        this.events = new OpenLayers.Events(this, null, this.EVENT_TYPES);
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }
        this.storeLang();
    },
    
    getFileConfig : function() {
    	return sMap.moduleConfig[this.MODULE_NAME] || {};
    },
    
    /**
     * Add event types to sMap.events so that other modules can
     * bind to these events via sMap core. Also bind a function
     * with the same name as the event. Note that the creator
     * of the module must keep same name for event and function,
     * otherwise comes a warning.
     * 
     * @returns void
     */
    addSmapEventTypes : function() {
	    var triggers = this.EVENT_TRIGGERS,
	    	listeners = this.EVENT_LISTENERS;
		if (listeners.length) {
			for (var i=0,len=listeners.length; i<len; i++) {
				sMap.events.addEventType(listeners[i]);
				var func = this[ listeners[i] ];
				if (!func) {
					var msg = "Module "+this.CLASS_NAME+" has EVENT_LISTENER(S) "+listeners[i]+" registered\nbut no method with same name.";
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
    
    /**
     * sMap-module-method
     * 
     * Returns the class name without "sMap.Module.". E.g.
     * "sMap.Module.MyModule" -> "MyModule" or
     * "sMap.Module.MyModule.MySubModule" -> "MyModule.MySubModule"
     * @returns {String}
     */
    getModuleName : function() {
    	var MODULE_NAME = this.CLASS_NAME.replace("sMap.Module.", "");
    	return MODULE_NAME;
    },
    
    /**
     * sMap-module-method
     * 
     * Get the lang dictionary for currently used language.
     * Store as this.lang. The subclass can then access all
     * texts through e.g.: this.lang.buttonLabel
     * @returns
     */
    storeLang : function() {
    	this.langCode = sMap.Lang.getCode(); // this.langCode || 
    	
    	var langArr = this.MODULE_NAME.split(".");
    	var langContainer = sMap.Lang.lang;
    	for (var i=0,len=langArr.length; i<len; i++) {
    		langContainer = langContainer[langArr[i]];
    	}
		this.lang = langContainer[this.langCode];
    	
    },

    /**
     * Method: destroy
     * The destroy method is used to perform any clean up before the control
     * is dereferenced.  Typically this is where event listeners are removed
     * to prevent memory leaks.
     */
    destroy: function () {
    	// Remove this modules' (controls') events: "activate" and "deactivate".
    	if(this.events) {
            if(this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
            this.events = null;
        }
        this.eventListeners = null;
    	
    	/**
    	 * Remove module's listeners. Note!!! This only works if the listener
    	 * function has the same name as the event. E.g. a listener to the event
    	 * "onlayersloaded" requires a method with the name onlayersloaded.
    	 */
    	var smap_events = this.EVENT_LISTENERS;
    	//events.concat(this.EVENT_TRIGGERS);
    	
    	if (smap_events.length) {
    		for (var i=0,len=smap_events.length; i<len; i++) {
    			var eventName = smap_events[i];
    			var func = this[ eventName ];
    			sMap.events.unregister(eventName, this, func);
    		}
    	}
        // eliminate circular references
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
        if(this.handlers) {
            for(var key in this.handlers) {
                if(this.handlers.hasOwnProperty(key) &&
                   typeof this.handlers[key].destroy == "function") {
                    this.handlers[key].destroy();
                }
            }
            this.handlers = null;
        }
        if (this.map) {
            this.map.removeControl(this);
            this.map = null;
        }
    },

    /** 
     * Method: setMap
     * Set the map property for the control. This is done through an accessor
     * so that subclasses can override this and take special action once 
     * they have their map variable set. 
     *
     * Parameters:
     * map - {<OpenLayers.Map>} 
     */
    setMap: function(map) {
        this.map = map;
        if (this.handler) {
            this.handler.setMap(map);
        }
    },
    
    /**
     * sMap-module-method
     * 
     * Draw the visual components of the module.
     * @returns
     */
    drawContent : function() {
    	return true;
    },
    
    modulesadded : function(e) {
    	if (this.drawContent) {
    		this.drawContent();
    	}
    },
    
    /**
     * Method: draw (modified for sMap-module)
     * The draw method is called when the control is ready to be displayed
     * on the page.  If a div has not been created one is created.  Controls
     * with a visual component will almost always want to override this method 
     * to customize the look of control. 
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>} The top-left pixel position of the control
     *      or null.
     *
     * Returns:
     * {DOMElement} A reference to the DIV DOMElement containing the control
     */
    draw: function (px) {
        this.drawThisDiv();
        return this.div;
    },
    
    /**
     * sMap-module-method renamed from OL original "draw".
     * 
     * Create the standard div (this.div).
     * This code was previously witin this.draw
     * but has been moved so that we can support the
     * method drawContent.
     * @param px
     * @returns
     */
    drawThisDiv : function(px) {
    	if (this.div == null) {
            this.div = OpenLayers.Util.createDiv(this.id);
            this.div.className = this.displayClass;
            if (!this.allowSelection) {
                this.div.className += " olControlNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = OpenLayers.Function.False; 
            }
        }
        if (px != null) {
            this.position = px.clone();
        }
        this.moveTo(this.position);
        $(this.div).attr("z-index", "1000");
        
        return this.div;
    	
    },

    /**
     * Method: moveTo
     * Sets the left and top style attributes to the passed in pixel 
     * coordinates.
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     */
    moveTo: function (px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px";
        }
    },

    /**
     * Method: activate
     * Explicitly activates a control and it's associated
     * handler if one has been set.  Controls can be
     * deactivated by calling the deactivate() method.
     * 
     * Returns:
     * {Boolean}  True if the control was successfully activated or
     *            false if the control was already active.
     */
    activate: function () {
        if (this.active) {
            return false;
        }
        if (this.handler) {
            this.handler.activate();
        }
        this.active = true;
        if(this.map) {
            OpenLayers.Element.addClass(
                this.map.viewPortDiv,
                this.displayClass.replace(/ /g, "") + "Active"
            );
        }
        this.events.triggerEvent("activate");
        return true;
    },
    
    /**
     * Method: deactivate
     * Deactivates a control and it's associated handler if any.  The exact
     * effect of this depends on the control itself.
     * 
     * Returns:
     * {Boolean} True if the control was effectively deactivated or false
     *           if the control was already inactive.
     */
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            if(this.map) {
                OpenLayers.Element.removeClass(
                    this.map.viewPortDiv,
                    this.displayClass.replace(/ /g, "") + "Active"
                );
            }
            this.events.triggerEvent("deactivate");
            return true;
        }
        return false;
    },

    CLASS_NAME: "sMap.Module"
});

/**
 * Constant: OpenLayers.Control.TYPE_BUTTON
 */
OpenLayers.Control.TYPE_BUTTON = 1;

/**
 * Constant: OpenLayers.Control.TYPE_TOGGLE
 */
OpenLayers.Control.TYPE_TOGGLE = 2;

/**
 * Constant: OpenLayers.Control.TYPE_TOOL
 */
OpenLayers.Control.TYPE_TOOL   = 3;
/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */


var params = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters());
if ( params.CONFIG && params.CONFIG.search("aldreboende") !== -1) {
	document.domain = "malmo.se";
}

var showWithIds = function(param) {
	param = param || null;
	
	var mod = sMap.map.getControlsByClass("sMap.Module.Aldreboenden")[0];
	// IE7 (and maybe 8) bug fix.
	if ( $.browser.msie ) {
		sMap.aldreboendeTempIds = param;
		setTimeout('var mod=sMap.map.getControlsByClass("sMap.Module.Aldreboenden")[0];mod.showWithIds.call(mod, sMap.aldreboendeTempIds);delete sMap["aldreboendeTempIds"];', 200);
	}
	else {
		mod.showWithIds.call(mod, param);
	}
};
if (parent && params.CONFIG && params.CONFIG.search("aldreboende") !== -1) {
	parent.showWithIds = showWithIds;
}
sMap.Module.Aldreboenden = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The URL to the service returning geodata for nursing homes.
	 */
	urlService: location.protocol+"//webapps05.malmo.se/aldreboenden/api/1.0/nursing_homes", //document.location.href.split("?")[0].replace("index.html", "") + "modules/Module/Aldreboenden/temp/nursing_homes.jsonp",
	
	/**
	 * Fields to fetch from the geodata/json service.
	 */
	attributes: ["id", "name", "url", "permalink", "photos", "geo_position_x", "geo_position_y"],
	
	/**
	 * IDs in list (selected by user to be compared).
	 */
	inList: [],
	
	styles: {
		"default": {
			graphicWidth:19,
			graphicHeight: 41,
			externalGraphic: "img/legend/icon_pil_rod.png",
			graphicXOffset: -9,
			graphicYOffset: -31,
			fillOpacity: 1,
			strokeOpacity: 1,
			cursor: "pointer"
		},
		"select": {
			graphicWidth: 19,
			graphicHeight: 41,
			externalGraphic: "img/legend/icon_pil_rod.png",
			graphicXOffset: -9,
			graphicYOffset: -31,
			fillOpacity: 1,
			strokeOpacity: 1,
			cursor: "pointer"
		}
	},
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["popupadded"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Aldreboenden.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Aldreboenden.prototype.EVENT_TRIGGERS.concat(
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
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
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
		
		// For debugging – creates the cookie if it does not exist.
		//if (!$.cookie("nursing_homes_compare")) {
		//$.cookie("nursing_homes_compare", "1|2|50", { expires: 1 });
		//}
		
		//window.showWithIds = this.showWithIds;
		
		var defStyle = new OpenLayers.Style();
		this.layer = new OpenLayers.Layer.Vector("aldreboenden", {
			rendererOptions: {yOrdering: true},
			styleMap: new OpenLayers.StyleMap({
				"default": new OpenLayers.Style( $.extend({}, defStyle.defaultStyle, this.styles["default"] ) ),
				"select": new OpenLayers.Style( $.extend({}, defStyle.defaultStyle, this.styles["select"] ) )
//				"temporary": new OpenLayers.Style(this.styles["default"])
			}),
			selectable: true,
			popupHTML:
					"<span class='aldreboenden-popup'>" +
						"<a href='${permalink}' target='_top'><h3>${name}</h3></a>" +
						"<div>" +
							"<div class='aldreboenden-popup-divleft'>" +
								"<a target='_top' href='${img_large}'><img src='${img_thumbnail}'></img></a>" +
							"</div>" +
							"<div style='display: inline;' class='aldreboenden-popup-divright'>" +
								"<div class='aldreboenden-popup-headerlink'>" +
									"<a style='display: inline;' href='${permalink}' target='_top'>Visa boendet</a>" +
								"</div>" +
								"<div style='display: inline;'>" +
									"<input class='aldreboenden-thepopupcheckbox' type='checkbox'></input>" +
									"<label class='aldreboenden-checkboxlabel'>Lägg till i Min lista</label>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</span>"
		});
		// Add layer like this so that SimpleSelect module captures the event layervisible.
		sMap.events.triggerEvent("addlayer", this, {
			layer: this.layer
		});
		
		/**
		 * Get the IDs of the nursing homes and call the
		 * service for corresponding points and attributes.
		 */
		var params = sMap.cmd.getStartingParamsAsObject();
		var startingIds = params.IDS || null;
		
		this.fetchInitialData(startingIds); // only called once (during initialization)
		
		this.updateList(); // Update inList with latest data from cookie
		
		// IE7 bug fix - redraw when this tab becomes visible
		$(parent.document).find("a[href='#tab-element-map']").click(function() {
			var layer = sMap.map.getLayersByName("aldreboenden")[0];
			layer.redraw();
		});
		
	},
	
	/**
	 * Remove all features from the layer and add only
	 * features with an ID given by the ids array. If ids
	 * is undefined, null or false - all features will be
	 * added. If array is empty, all features
	 * will be removed (if any).
	 *  
	 * 
	 * @param ids {Array}
	 * 		Containing features of type {OpenLayers.Feature.Vector}
	 */
	showWithIds: function(ids) {
		ids = ids || null;
		
		if (!this.layer) {
			alert("no layer found");
			return;
		}
		
		if (this.layer.features.length) {
			sMap.events.triggerEvent("unselect", this, {});
			this.layer.removeAllFeatures(); // Always start with an empty layer
		}
		if (ids && ids instanceof Array && ids.length == 0) {
			this.map.zoomToMaxExtent();
			// All features should be removed, and that's it.
			return;
		}
		
		if (!ids) {
			if (this.features && this.features.length) {
				// Add all features if no IDs are sent in.
				this.layer.addFeatures(this.features);	
			}
		}
		else {
			// Make sure all items are integers.
			ids = $.map(ids, function(item) {
				return parseInt(item);
			});
			var f = null,
				fs = this.features || [],
				newFs = [];
			if (fs && fs.length) {
				for (var i=0,len=fs.length; i<len; i++) {
					f = fs[i];
					if ( $.inArray(f.attributes.nursing_id, ids) != -1) {
						// feature's ID exists in array - add it to the layer
						newFs.push(f);
					}
				}
				this.layer.addFeatures(newFs);
			}
		}
		
		// Zoom to extent of features
		if (this.layer.features.length) {
			this.map.zoomToExtent(this.layer.getDataExtent());
		}
	},
	
	/**
	 * Bind events and stuff
	 * @param e {Object}
	 */
	popupadded: function(e) {
		var self = this;
		var closeBox = $(e.popup.contentDiv).parent().find(".olPopupCloseBox");
		var right = sMap.util.trimCSS(closeBox.css("right")),
			top = sMap.util.trimCSS(closeBox.css("top")),
			offsetX = -12,
			offsetY = -8;
		if ( $.browser.msie && parseFloat($.browser.version) < 9 ) {
			offsetX += 6;
			offsetY += 6;
		}
		
		closeBox.css({
			right: (right + offsetX)+"px",
			top: (top + offsetY)+"px"
		});
		
		this.updateList(); // Update with data from cookie that might have been added from "the Application"
		// Bind click on labels to check of its checkbox.
		$(".aldreboenden-checkboxlabel").click(function() {
			var checked = $(".aldreboenden-thepopupcheckbox").prop("checked");
			$(".aldreboenden-thepopupcheckbox").prop("checked", !checked);
			$(".aldreboenden-thepopupcheckbox").change();
		}).parent().css({
			"white-space": "nowrap"
		});
		// IE7 did not understand $(..).prev() so I used a specific class for the checkbox.
		$(".aldreboenden-thepopupcheckbox").change(function() {
			var isChecked = $(this).prop("checked");
			self.onCheckChange(isChecked);
		});
		var f = this.getSelectedFeature();
		//debug.log("This feature's id is: "+f.attributes.nursing_id);
		var checked = $.inArray( f.attributes.nursing_id, this.inList ) != -1;
		$(".aldreboenden-popup").find("input[type='checkbox']").prop("checked", checked);
		
		var popup = e.popup;
		popup.minSize = new OpenLayers.Size( 300, 120);
		popup.maxSize = new OpenLayers.Size( 300, 250);
		popup.updateSize();
	},
	
	/**
	 * 
	 * @param isChecked
	 */
	onCheckChange: function(isChecked) {
		isChecked = isChecked || false;
		var f = this.getSelectedFeature();
		if (isChecked) {
			// Checkbox -> unchecked: point removed from list
			this.changeList(f.attributes.nursing_id, true);
			this.updateCookie();
		}
		else {
			// Checkbox -> checked: point added to list
			this.changeList(f.attributes.nursing_id, false);
			this.updateCookie();
		}
		// Let the parent application know that a change happened.
		//if (parent) {
		//document.domain = "malmo.se";
		parent.incomingUpdate();
		//debug.log("Called: parent.incomingUpdate()");
		//}
		
	},
	
	/**
	 * Return the currently selected feature in this module's layer.
	 * @returns {OpenLayers.Layer.Vector}
	 */
	getSelectedFeature: function() {
		return this.layer.selectedFeatures.length ? this.layer.selectedFeatures[0] : null;
	},
	
	
	/**
	 * Stores IDs from this.inList in the cookie so that
	 * the application containing this map can know if
	 * houses have been added to list or not. The opposite
	 * is done by updateList.
	 * @return {void}
	 */
	updateCookie: function() {
		// Skriv kaka
//		if ($.cookie('nursing_homes_compare')) {
		// If the cookie holds an empty string it returns null – therefore I cannot make this "cookie exists" check here.
		$.cookie('nursing_homes_compare', this.inList.join("|"), { expires: 365, domain: "malmo.se", path: "/" }); // Add this 3rd parameter when using with "the Application": { expires: 365, domain: "malmo.se", path: "/" };
		//debug.log("Current data in cookie: " + $.cookie('nursing_homes_compare') );
//		}
	},
	
	/**
	 * Update the list with the latest content in the cookie.
	 * The list (inList) is the array containing all IDs
	 * that are currently in the comparing list of the user.
	 * The opposite is done by updateCookie.
	 */
	updateList: function() {
		// Read the cookie and store in inList.
		var val = $.cookie("nursing_homes_compare");
		//debug.log("Current data in cookie: " + val );
		if (!val) {
			val = "";
			this.inList = []; // reset
		}
		else {
		
			// Make all items into integers (not strings).
			var list = val.split("|");
			this.inList = $.map(list, function(item) {
				return parseInt(item);
			});
		}
	},
	
	/**
	 * Update the inList array with a new ID.
	 * @param nursingId {Integer}
	 * @param change {Boolean} true: add, false: remove
	 * @return {void}
	 */
	changeList: function(nursingId, change) {
		change = change || false;
		
		nursingId = parseInt(nursingId);
		
		if (change === true && $.inArray(nursingId, this.inList) == -1) {
			// Add to array if it does not already exist.
			this.inList.push( nursingId );
		}
		else {
			// Remove nursingId from array.
			var index = $.inArray(nursingId, this.inList);
			this.inList.splice(index, 1);
		}
	},
	
	/**
	 * 
	 */
	fetchInitialData: function(startingIds) {
		
		$.ajax({
			url: this.urlService,
			context: this,
			data: {
				fields: this.attributes.join(",")
			},
			dataType: "jsonp",
			cache: true,
			jsonpCallback: "foo",
			success: function(obj) {
				this.fetchFeatures(obj.nursing_homes);
				this.showWithIds(startingIds); // Show only features holding an ID in this array
			}
		});
	},
	
	/**
	 * Read the JSON object and add create and add features (points)
	 * to the layer. Store attributes in each feature.
	 * @param arr {Array} Array of objects.
	 */
	fetchFeatures: function(arr) {
		var t, geom, f,
			attributes = {},
			fs = [];
		
		for (var i=0,len=arr.length; i<len; i++) {
			t = arr[i];
			t.nursing_id = t.id; // Change name of id to avoid overriding feature id.
			
			attributes = {};
			$.extend(attributes, t);
			attributes.img_thumbnail = t.photos.thumbnail.url;
			attributes.img_large = t.photos.large.url;
			attributes.name = decodeURIComponent(t.name);
			if ( $.inArray(t.nursing_id, this.inList ) != -1 ) {
				// If it exists in compare list – remember as checked.
				attributes.inlist = true;
			}
			else {
				// If not in list – remember as non-checked.
				attributes.inlist = false;
			}
			geom = new OpenLayers.Geometry.Point(t.geo_position_x, t.geo_position_y);
			f = new OpenLayers.Feature.Vector(geom, attributes);
			fs.push(f);
		}
		this.features = fs;
		
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Aldreboenden"
	
});sMap.moduleConfig.Aldreboenden = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false
};
sMap.Lang.lang.Aldreboenden = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : { 
		labelText : "Press here"
	}
	
};/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.BaselayerSwitcher = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 * 
	 * "switchbaselayerbutton" : changes baselayerbutton.
     *    - layerName {String} The layername that has been turned on.
	 */
	EVENT_LISTENERS : ["setbaselayer"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 * 
	 * "setbaselayer" : Triggers the event in the core that changes baselayer.
     *    - layerName {String} The layername to be turned on.
	 */
	EVENT_TRIGGERS : ["setbaselayer"],

	cats : null,
	
	initialize : function(options) {
		options = options || {};
		this.dropDownOnSingle = options.dropDownOnSingle;
		this.buttonWidth = options.buttonWidth;
		this.dropDownWidth = options.dropDownWidth;
		this.EVENT_LISTENERS =
			sMap.Module.BaselayerSwitcher.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.BaselayerSwitcher.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		this.delim = "___"; // delimiter for id:s
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
	drawContent : function() {
		$(this.div).empty().remove();
		delete this.div;
		this.div = $("<div />");
		$("#mapDiv").append(this.div);
		if (this.map.allOverlays===true) {
			return false;
		}
		this.addBaselayerSwitcher();
		
		//Test if it works: setTimeout('sMap.events.triggerEvent("setbaselayer", this, {layerName: "Orto2010"});', "1000"); 
	},
	
	
	setbaselayer: function(e) {
		if (e.caller === this) {
			return true;
		}
		this.switchBaseLayerButton(e.layerName);
		
	},
	
	/**
	 * Replaces the following chars so that they work out as key
	 * in dict: space, comma, point (end of line).
	 * @param text {String} The string you want to alter
	 * @param decode {Boolean}
	 * 		False -> encode (replace "." "," and space with accepted chars)
	 * 		True -> decode (restore the string to its original with ., and space)
	 * 
	 */
	replaceOddChars : function(text, decode) {
		if (decode===true) {
			text = text.replace(/_/g, " ");
			text = text.replace(/ZZ/g, "\.");
			text = text.replace(/CoMMa/g, "\,");
		}
		else {
			text = text.replace(/ /g, "_");
			text = text.replace(/\./g, "ZZ");
			text = text.replace(/\,/g, "CoMMa");
		}
		return text;
	},
	
	/**
	 * Add the switcher.
	 */
	addBaselayerSwitcher : function() {
		
		var buttonDiv = $("<div id='baselayerDiv' class='baselayerDiv' />");
		$(this.div).append(buttonDiv);
		
		$(this.div).css({
			"position" : "absolute",
			"top" : "5px",
			"right" : "8px",
			"height" : "auto",
			"z-index" : "1007" // must be one unit higher than overlays switcher so that btns can be clicked
		});
		
		// Store all baselayers config in an ass. array keyed by category name.
		var cats = {};
		for (var i=0,len=sMap.config.layers.baselayers.length; i<len; i++) {
			var t = sMap.config.layers.baselayers[i];
			var idCat = this.replaceOddChars(t["category"]);
			
			if (!cats[idCat]) {
				cats[idCat] = [];
			}
			cats[idCat].push(t);
		}
		
		this.cats = cats;
		
		// Make a button for each category with same text as category.
		var b=null;
		var toggleDropDown = this.toggleDropDown;
		var delim = this.delim;
		
		// ---- Make the drop down if it should be made -----
		
		for (var cat in cats) {
			
			b = $("<div class='ui-widget-content ui-state-default baselayer-button' />");
			var bId = "bLayerSwitcher" + this.delim + cat;
			b.attr("id", bId);
			
			var labelCat = this.replaceOddChars(cat, true);
			b.text(labelCat);
			b.prop("z-index", "1008");
			
			buttonDiv.prepend(b);
			
			// Make drop-down inputs if more than 1 layer per category
			// or if dropDownOnSingle is true.
			var catsArr = cats[cat];
			if (catsArr.length>1 || (catsArr.length==1 && this.dropDownOnSingle===true)) {
				var dropDownDiv = this.makeDropDown(cat, catsArr);
				
				$(this.div).append(dropDownDiv);
				
				dropDownDiv.prop("z-index", "1007");
				dropDownDiv.hide(); // drop down should start hidden
			}
		}
		
		var w = this.buttonWidth;
		var nrOfBtns=0;
		buttonDiv.find("div").each(function() {
			$(this).width(w);
			nrOfBtns += 1;
		});
		
		this.buttonOuterWidth = w + 2; // button width + total padding (if any) and border (if any...)
		
		buttonDiv.width(nrOfBtns * this.buttonOuterWidth + 10);
		// Set the width to the container div explicitly.
		$(this.div).width(nrOfBtns * this.buttonOuterWidth + 10);
		
		//}

		
		// ---- Decide the position of drop-down from right. -----
		
		var getButtonPosition = this.getButtonPosition;
		var getDropDownDiv = this.getDropDownDiv;
		var delim = this.delim;
		var self = this;
		
		var n = 0; // Keep track of button number
		buttonDiv.children().each(function() {
			var b = $(this);
			var right = self.getButtonPosition(b, n);
			var cat = $(this).prop("id").split(delim)[1];
			var dropDownDiv = getDropDownDiv(cat);
			dropDownDiv.css("right", right+"px");
			n+=1;

		});
		
		
		var self = this;
		var getDropDownDiv = this.getDropDownDiv;
		// ----- Now that the buttons and drop downs are made -
		// - lets define click and hover interactions for buttons. -----
		buttonDiv.find("div").each(function() {
			$(this).click(function(e) {
				self.pressButton.call(self, this);
			});
			var cat = $(this).prop("id").split(delim)[1];
			var div = getDropDownDiv(cat);
			
			if (div.length) {
				// Show drop down on hover and hide on hover out.
				$(this).mouseenter(function() {
					bId = $(this).prop("id");
					var cat = bId.split(delim)[1];
					
					if ($(this).hasClass("baselayer-button-clicked")===true) {
						$(this).addClass("dropDownHover");
					}
					else {
						$(this).addClass("dropDownHover-notClicked");
					}
					toggleDropDown(cat, true);
				});
				$(this).mouseleave(function() {
					var cat = $(this).prop("id").split(delim)[1];
					$(this).removeClass("dropDownHover");
					$(this).removeClass("dropDownHover-notClicked");
					toggleDropDown(cat, false);
				});
			}
		});
		
		// ---- And define what interaction should be disabled... -----
		$(this.div).dblclick(function(e) {
			OpenLayers.Event.stop(e);
		});
		$(this.div).mousedown(function(e) {
			OpenLayers.Event.stop(e);
		});
			
		
		// Set the initial configuration of the buttons.
		// If a parameter was sent in - this baselayer's
		// radio button and category button should be marked.
		// Otherwise, the default buttons should be marked.
		// BaseLayer is also set at this time.
		var layerName=null;
		if (!sMap.cmd.getStartingParamsAsObject().BL) {
			layerName = this.map.baseLayer.name;
			var b = this.getButton(layerName);
			this.pressButton.call(this, b);
			$(b).removeClass("dropDownHover");
		}
		else {
			layerName = sMap.cmd.getStartingParamsAsObject().BL;
			var b = this.getButton(layerName);
			this.markButton(b);
		}
		
		this.pressRadioButton(layerName);
		$(b).removeClass("dropDownHover");
		//Trigga eventet setbaselayer
		sMap.events.triggerEvent("setbaselayer", this, {
		    layerName : layerName
		});

	},
	
	
	/**
	 * @param cat {String}
	 *     The category (i.e. label) for the baselayer button.
	 * @return {HTML div}
	 *     The drop down div
	 */
	getDropDownDiv : function(cat) {
		var idCat = cat.replace(/ /, "_");
		var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
		var dropDownDiv = $("#bLayerDropDown" + ctrl.delim + idCat);
		return dropDownDiv;
	},
	
	toggleDropDown : function(categoryName, change) {
		var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
		var delim = ctrl.delim;

		var dropDownDivID = "bLayerDropDown" + delim + categoryName;
		var dropDownDiv = $("#"+dropDownDivID);
		if (change===true) {
			dropDownDiv.show();
			
		}
		else if (change===false) {
			dropDownDiv.hide();
		}
		delim=null, ctrl=null;
	},
	
	/**
	 * Returns the category button which controls the layer with
	 * given layerName.
	 * @param layerName {String}
	 *     The baselayer name
	 */
	getButton : function(layerName) {
		var cat = null;
		var button = null;
		
		for (var i=0,len=sMap.config.layers.baselayers.length; i<len; i++) {
			var t = sMap.config.layers.baselayers[i];
			if (layerName.toLowerCase()==t.name.toLowerCase()) {
				cat = t.category;
				break;
			}
		}
		
		if (cat!=null) {
			var bId = "bLayerSwitcher" + this.delim + this.replaceOddChars(cat);
			button = $("#"+bId);
		}
		
		return button;
	},

	
	/**
	 * Trigger press on this button. Called on click but
	 * can be called programmatically as well.
	 * @param b {HTML div}
	 *     The button user clicked on.
	 */
	pressButton : function(b) {
		
		this.markButton(b);
		
		var cat = $(b).prop("id").split(this.delim)[1];
		var idCat = this.replaceOddChars(cat);
		var catsArr = this.cats[idCat];
		
		var layerName = catsArr[0].name; // default layer for this category to be visible on click
		
		//var layer = this.map.getLayersByName(layerName)[0];
		//this.map.setBaseLayer(layer);
		//Trigga eventet setbaselayer
		sMap.events.triggerEvent("setbaselayer", this, {
		    layerName : layerName
		});
		// Unselect all radio buttons.
		var allInputs = $(this.div).find("[id*=bLayerInput]");
		allInputs.each(function(){
			$(this).prop("checked", false);
		});
		
		// If drop down exists for this button - change selected input.
		if (catsArr.length>1 || (catsArr.length==1 && this.dropDownOnSingle===true)) {
			this.pressRadioButton(layerName);
			$(b).addClass("dropDownHover");
		}
	},
	
	markButton : function(b) {
		// "Unselect" other buttons
		$(b).siblings().each(function() {
			$(this).removeClass("baselayer-button-clicked");
			$(this).removeClass("ui-state-active");
			
			$(this).removeClass("dropDownHover");
		});
		// "Select" clicked button.
		$(b).addClass("baselayer-button-clicked");
		$(b).addClass("ui-state-active");
		$(b).removeClass("dropDownHover-notClicked");
	},
	
	/**
	 * Change the selected input radio button in the drop-down programmatically.
	 * @param layerName {String}
	 *     The layer name for the layer who's radio button should be selected.
	 *     Nothing else will be triggered by calling this method, such as
	 *     event handlers... so you have to change the base layer yourself
	 *     if you want to do that.
	 */
	pressRadioButton : function(layerName) {
		var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
		var allInputs = $(ctrl.div).find("[id*=bLayerInput]");
		allInputs.each(function(){
			$(this).prop("checked", false);
		});
		var inputTagID = "bLayerInput" + ctrl.delim + layerName;
		var inputTag = $("#"+inputTagID);
		inputTag.prop("checked", true);
		
		var b = ctrl.getButton(layerName);
		$(b).addClass("dropDownHover");
		$(b).removeClass("dropDownHover-notClicked");
		
	},
	
	/**
	 * Make a drop down tag which appears on base layer button hover.
	 * @param cat, catsArr
	 */
	makeDropDown : function(cat, catsArr) {
		var t=null, rowDiv=null, labelTag=null, inputTag;
		var dropDownDiv=$("<div class='bLayerSwitcher-dropDown' />");
		dropDownDiv.prop("id", "bLayerDropDown" + this.delim + cat);
		
		
		for (var i=0,len=catsArr.length; i<len; i++) {
			t = catsArr[i];
			
			rowDiv = $("<div />");
			//rowDiv.addClass("bLayerSwitcher-dropDown-rowDiv");
			rowDiv.prop("id", "bLayerRow" + this.delim + t.name);
			
			labelTag = $("<span />");
			labelTag.html(t.displayName);
			labelTag.prop("id", "bLayerLabel" + this.delim + t.name);
			
			inputTag = $("<input type='radio' />");
			inputTag.prop("id", "bLayerInput" + this.delim + t.name);
			
			rowDiv.append(inputTag);
			rowDiv.append(labelTag);

			rowDiv.click(function(e) {
				var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
				var layerName = $(this).prop("id").split(ctrl.delim)[1];
				ctrl.pressRadioButton(layerName);
				//Trigga eventet setbaselayer
				sMap.events.triggerEvent("setbaselayer", this, {
				    layerName : layerName
				});
				//ctrl.map.setBaseLayer(ctrl.map.getLayersByName(layerName)[0]);
				var b = ctrl.getButton(layerName);
				ctrl.markButton(b);
			});
			dropDownDiv.append(rowDiv);
		}
		
		// Keep drop down visible on hover but hide on hover out.
		dropDownDiv.mouseenter(function() {
			var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
			var cat = $(this).prop("id").split(ctrl.delim)[1];
			var b = $("#bLayerSwitcher" + ctrl.delim + cat);
			
			if (b.hasClass("baselayer-button-clicked")===true) {
				b.addClass("dropDownHover");
				
			}
			else {
				b.addClass("dropDownHover-notClicked");
			}
			
			$(this).show();
			
		});
		dropDownDiv.mouseleave(function() {
			var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
			var cat = $(this).prop("id").split(ctrl.delim)[1];
			var b = $("#bLayerSwitcher" + ctrl.delim + cat);
			b.removeClass("dropDownHover");
			b.removeClass("dropDownHover-notClicked");
			$(this).hide();
		});
		
		return dropDownDiv;
	},
	
	/**
	 * Get the position of the button from the right. This
	 * is used for positioning the drop-down div.
	 * @param {div} The baselayer button
	 * @param {Integer}
	 *     The number of buttons to the right of this button.
	 */
	getButtonPosition : function(b, buttonNr) {
		
		var bPadding = sMap.util.takeAwayPx(b.css("padding-left")) + sMap.util.takeAwayPx(b.css("padding-right"));
		
		var bRight = (buttonNr) * this.buttonOuterWidth;

		var totalRight = bRight;
		
		return totalRight;
		
		
	},
	/**
	 * Listener to the event "switchbaselayerbutton".
	 * Switch the baselayerbutton to the one that is
	 * sent in as a parameter. It doesn't change the baselayer.
	 * If the layer doesn't exist nothing happens.
	 * 
	 *  @param layerName {String}
	 *  @returns {void}
	 */
	switchBaseLayerButton : function(layerName) {
		var b = this.getButton(layerName);
		this.markButton(b);
		this.pressRadioButton(layerName);
//		$(b).removeClass("dropDownHover");
	},

	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.BaselayerSwitcher"
	
});sMap.moduleConfig.BaselayerSwitcher = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false,
		
		/**
		 * Width of the buttons.
		 */
		buttonWidth: 90
};sMap.Lang.lang.BaselayerSwitcher = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : {
		labelText : "Press here"
	}
	
};/**
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
			url = "http://geoserver.smap.se/geoserver/wfs";
			var layersString = layersArr.join();
			$.extend(paramsObj, {typename: layersString});
			$.ajax({
				url: sMap.config.proxyHost + encodeURIComponent(url),
				type: "POST",
				dataType: "text",
				data: paramsObj,
				context: self,
				error: function(qXHR, textStatus, errorThrown) {
					debug.log("Erroneous response from WMS-request: "+textStatus);
				},
				success: function(data) {
					var format = new OpenLayers.Format.GeoJSON();
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
	
});sMap.moduleConfig.Blixten = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		/**
		 * Buffer settings
		 */
		defaultBuffer: 200,
		minBuffer: 100, // If you put 0 it will become 1.
		maxBuffer: 500,
		step: 100,
		
		dialogPosition: [50, 100],
		
		zIndex: 697,
		
		styles: {
			"default": {
				"strokeDashstyle": "solid",
				"pointRadius": 10,
				"fillColor": "#00f",
				"strokeColor": "#fff",
				"strokeWidth": 1,
				"strokeOpacity": 1,
				"fillOpacity": 0.4,
				"graphicZIndex": 697
			},
			"select": {
				"strokeDashstyle": "solid",
				"pointRadius": 10,
				"fillColor": "#00f",
				"strokeColor": "#fff",
				"strokeWidth": 1,
				"strokeOpacity": 1,
				"fillOpacity": 0.4,
				"graphicZIndex": 697
			},
			"temporary": {
				"strokeDashstyle": "solid",
				"pointRadius": 10,
				"fillColor": "#00f",
				"strokeColor": "#fff",
				"strokeWidth": 1,
				"strokeOpacity": 1,
				"fillOpacity": 0.4,
				"graphicZIndex": 697
			}
		}
};
sMap.Lang.lang.Blixten = {
	"sv-SE" : {
		toolButtonText : "Sök i kartan",
		dialogTitle: "Sök i kartan",
		introText1: "<p>Sök i kartan” hämtar information inom en angiven cirkel. Sökningen träffar alla översiktsplanelager och riksintressen.</p>" + 
			"<p>Därutöver hämtas följande underlag: naturvårdsplan, naturreservat uppmärksamhetsavstånd kring farliga verksamheter, skyddsområde för grundvattentäkt, gasledning, kraftledningar.</p>" +
			"<p>Ställ in önskad radie och klicka därefter i kartan.</p>",
		introText2: "",
		introText3: "",
		labelRadius: "Sökradie",
		bufferUnit: "m",
		
		legendShowAll: "2. Sök",
		labelBoxSearch: "Klicka i kartan!",
		
		legendClick: "2. Sökmetod",
		labelClick: "Välj sökmetod nedan. Klicka sedan i kartan för att söka. Resultatet visas i ett nytt fönster.",
		textLoading: "Var vänlig vänta. Sökning pågår."
	},
	en : { 
		textLoading: "Searching for objects..."
	}
	
};/**
 * @author Johan Lahti
 * @copyright Malmö stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.BlixtenPopup2 = OpenLayers.Class(sMap.Module, {
	
	prefix: "blixtenpopup-",
	delim: "__",
	
	/**
	 * nameField: The field that holds feature specific info.
	 * If this field is not empty this feature will be represented
	 * by its own row in the "object div".
	 */
	nameField: "namn",
	
	/**
	 * urlField
	 */
	urlField: "url",
	
	/**
	 * tooltipField
	 */
	tooltipField: "tooltip",
	
	
	/**
	 * Stores the found features from a blixten request.
	 */
	foundFeatures: [], 
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["blixtenrequest", "blixtenfeaturesfound", "fetchedfeatures"],
	
	fetchedfeatures: function(e) {
		var blixtenInst = this.map.getControlsByClass("sMap.Module.Blixten")[0];
		if (blixtenInst.active === true) {
			if (!e.features.length)
				return false;
			sMap.events.triggerEvent("blixtenfeaturesfound", this, {
				features: e.features
			});
			setTimeout('$(".blixtenpopup-row-left:eq(0)").click();', 20);			
		}
		
		
	},
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.BlixtenPopup2.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.BlixtenPopup2.prototype.EVENT_TRIGGERS.concat(
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
		
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
//		this.showDialog();
		this.preProcessLayerConfig();
	},
	
	preProcessLayerConfig: function() {
		var i, t, geomType, style,
			arr = sMap.config.layers.overlays;
		for (i=0,len=arr.length; i<len; i++) {
			t = arr[i];
			geomType = t.geomType || "polygon";
			switch (geomType) {
				case "point":
					style = {
						strokeWidth: 12,
						strokeColor: "#000",
						strokeOpacity: .20
					}
					break;
				case "line":
					style = {
						strokeWidth: 12,
						strokeColor: "#000",
						strokeOpacity: .20
					}
					break;
				case "polygon":
					style = {
						strokeWidth: 12,
						strokeColor: "#000",
						fillOpacity: 0,
						strokeOpacity: .20
					}
					break;
//				case "mixed":
//					style = {
//						strokeWidth: 4,
//						strokeColor: "#0f0",
//						fillOpacity: 0,
//						strokeOpacity: 0.9
//					}
				default:
					style = {
						strokeWidth: 12,
						strokeColor: "#000",
						fillOpacity: 0,
						strokeOpacity: .20
					}
			}
			if (t.style.select) {
				delete t.style.select.rules;				
			}
			delete t.style.rules;
			t.style = t.style || {};
			$.extend(true, t.style["default"], style);
			$.extend(true, t.style["default"], style);
			$.extend(true, t.style["select"], style);
			$.extend(true, t.style["select"], style);
		}
	},
	
	showDialog: function() {
		
		if (!this.dialogDiv) {
			this.makeDialog();
		}
		this.removeRows();
		this.dialogDiv.dialog("open");
	},
	
	hideDialog: function() {
		if (this.dialogDiv) {
			this.dialogDiv.dialog("close");
		}
	},
	
	destroyFeatures: function(features) {
		for (var i=0,len=features.length; i<len; i++) {
			features[i].destroy();
		}
	},
	
	/**
	 * Update size of dialog content.
	 * 
	 * @param width {Integer}
	 * @param height {Integer}
	 * @returns {void}
	 */
	updateSize: function() {
		var width = this.dialogDiv.dialog("option", "width");
			height = this.dialogDiv.dialog("option", "height");
		
		// Get the width change and add it to the right div.
		var dw = width - (this.oldWidth || width);
		var w = this.rightDiv.width() + dw;
		this.rightDiv.width(w);
		
		// Get the height change and add it to all divs.
		var dh = height - this.oldHeight;
		
		var h1 = this.leftDiv.height() + dh,
			h2 = this.rightDiv.height() + dh,
			h3 = this.rowsDiv.height() + dh,
			h4 = this.attrDiv.height() + dh;
		
		this.leftDiv.height(h1);
		this.rightDiv.height(h2);
		this.rowsDiv.height(h3);
		this.attrDiv.height(h4);
		
		// Store width and height for next resize.
		this.oldWidth = width;
		this.oldHeight = height;
	},
	
	makeDialog: function() {
		// Adapt dialog size according to document size.
		var w = $(window).width() * 0.5;
		var h = parseInt(w/1.5);
		var maxHeight = 800,
			maxWidth = 800,
			minHeight = 400,
			minWidth = 600;
		maxHeight = $(window).height()-50 < maxHeight ? $(window).height()-50 : maxHeight; // limit maxHeight to ca document's height
		w = w > maxWidth ? maxWidth : w;
		h = h > maxHeight ? maxHeight : h;
		w = w < minWidth ? minWidth : w;
		h = h < minHeight ? minHeight : h;
		
		// Calculate dialogs position (bottom-right corner, with margin).
		var left = $(window).width() - w - 30,
			top = ($(window).height() - h) / 2;
		
		this.dialogDiv = $("<div id='"+this.prefix+"dialogdiv' />");
		var self = this;
		this.dialogDiv.dialog({
			title: this.lang.dialogTitle,
			resizable: true,
			autoOpen: false,
			position: [left, top],
			width: w, //652,
			height: h, //402,
			resizeStart: function() {
				$(this).children().hide();
				$(this).parent().css({
					"filter": "alpha(opacity=70)",
			    	"opacity": "0.7"
				});
			},
			resizeStop: function(e, ui) {
				$(this).parent().css({
					"filter": "alpha(opacity=100)",
					"opacity": "1"
				});
				$(this).children().show();
//				var w = ui.size.width,
//					h = ui.size.height;
				// Use a timeout so that the DOM is ready (document.ready does not fix it).
				var code = "var mod = sMap.map.getControlsByClass('" + self.CLASS_NAME + "')[0];mod.updateSize();";
				setTimeout(code, 200);
			},
			close: function() {
				sMap.events.triggerEvent("unselect", this, {}); // Will destroy features in the select layer
				self.destroyFeatures(self.foundFeatures);
				self.foundFeatures = [];
				self.attrDiv.parent().find("iframe").remove();
				sMap.cmd.hidealllayers();
			}
		});
		
		sMap.util.addDialogMinimizeButton(this.dialogDiv);
		
		// Store width and height for next resize.
		this.oldWidth = w;
		this.oldHeight = h;
		
		// Deactivate draw point tool when hovering the popup dialog and 
		// activate again when cursor leaves the dialog.
		this.dialogDiv.parent().mouseenter(function(e) {
			var ctrls = self.map.getControlsByClass("OpenLayers.Control.DrawFeature");
			if (ctrls.length) {
				ctrls[0].deactivate();
				// Bugg fix - select layer's z-index moves backwards again.
				var layers = self.map.getLayersByName("selectLayer");
				if (layers.length) {
					layers[0].setZIndex(699);
				}
			}
		});
		this.dialogDiv.parent().mouseleave(function(e) {
			var ctrls = self.map.getControlsByClass("OpenLayers.Control.DrawFeature");
			if (ctrls.length) {
				ctrls[0].activate();
			}
		});
		
		// -- Fill dialog with HTML --
		
		// Create two divs - left and right divs.
		this.leftDiv = $("<div id='"+this.prefix+"leftdiv' unselectable='on' class='blixtenpopup-div unselectable' />");
		this.rightDiv = $("<div id='"+this.prefix+"rightdiv' class='blixtenpopup-div' />");
		
		// This is the container of the rows that user can click on.
		this.rowsDiv = $("<div id='"+this.prefix+"rowsdiv-bottom' />");
		this.leftDiv.append(this.rowsDiv);
		
		function onDivClick(e) {
			if (e.target == this) {
				self.unselectAllRows();
				sMap.events.triggerEvent("unselect", this, {
					doNotDestroy: true
				});
				self.attrDiv.empty();
				self.attrDiv.parent().find("iframe").remove();
			}
		};		
		this.rowsDiv.click(onDivClick);
		
		this.dialogDiv.append( this.leftDiv ).append( this.rightDiv );
		this.attrDiv = $("<div id='"+this.prefix+"attrdiv' />");
		this.rightDiv.append(this.attrDiv);
		$("#blixtenpopup-rightdiv").width(w-226).height(h-34);
		$("#blixtenpopup-leftdiv").height(h-34);
		$("#blixtenpopup-attrdiv").height(h-56);
	},
	
	/**
	 * @property attributes {Object}
	 * @property popupHTML {String}
	 */
	showAttributes: function(attributes, popupHTML) {
		this.attrDiv.empty();
		this.attrDiv.parent().find("iframe").remove();
		//popupHTML = sMap.util.extractAttributes(attributes, popupHTML);
		this.attrDiv.html(popupHTML);
		this.attrDiv.show();
	},
	
	/**
	 * @property fids {Array(String)} Array of feature IDs.
	 * @returns {Array(OpenLayers.Feature.Vector)}
	 */
	getFeaturesWithFids: function(fids) {
		var f = null,
			features = this.foundFeatures,
			matchingFs = [];
		for (var i=0,len=features.length; i<len; i++) {
			f = features[i];
			
			// Iterate through all fids and see if any of them match
			// this feature's fid.
			for (var j=0,lenj=fids.length; j<lenj; j++) {
				if ( f.fid == fids[j] ) {
					matchingFs.push(f);
				}
			}
		}
		return matchingFs;
	},
	
	
	onRowClick: function() {
		
		var self = sMap.map.getControlsByClass("sMap.Module.BlixtenPopup2")[0];
		sMap.events.triggerEvent("unselect", self, {
			doNotDestroy: true
		});
		
		// Select the row and show info from the feature's nameField
		self.unselectAllRows();
		$(this).addClass(self.prefix+"rowselected");
		
		// Get all features and select them. Extract HTML from one
		// of the features and show it.
		var fids = $(this).data("fids"),
			content = null,
			features = null;
		if (fids) {
			features = self.getFeaturesWithFids(fids);
			var f = features[0];
			content = f.attributes[self.urlField];
			var layerName = f.layerName;
			if (layerName) {
				sMap.cmd.hidealllayers();
				sMap.events.triggerEvent("showlayer", this, {
					layerName: layerName
				});
			}
		}
		else {
			content = options.content || "Inget innehåll";
		}
		self.showInfo(content);
		sMap.events.triggerEvent("select", self, {
			features: features,
			doNotDestroy: true
		});
		return true;
	},
	
	makeRow: function(t, options) {
		var row = $("<div unselectable='on' class='unselectable "+options.className+"' />");
		
		// Store all fids in a array.
//		var fids = [];
//		for (var i=0,len=arr.length; i<len; i++) {
//			fids.push( arr[i].fids );
//		}
		var fids = t.fids;
		
		row.data("fids", fids); // Store configs so we can get and select the features on row click
		row.text(options.label);
		row.css(options.css);
		row.click(this.onRowClick);
		return row;
	},
	
	showInfo: function(content) {
		if (content.substring(0, 4) == "http") {
			// We are dealing with a URL.
			this.attrDiv.hide(); // Avoid interference with iframe scrolling
			this.attrDiv.empty();
			this.attrDiv.parent().find("iframe").remove();
			
			var iFrame = $("<iframe scrolling='1' border='none' frameborder='0' width='100%' height='100%' />"); // scrolling='no'
			iFrame.attr("src", content);
			this.attrDiv.parent().append(iFrame);
		}
		else {
			this.showAttributes( {}, content);
			
		}
	},
	
	/**
	 * @params t {Object}
	 * @return {void}
	 */
	addRow: function(t) {
		// Get the color from the category that this layer belongs to.
		var headerLevel = 1; // The header level that decides the color (0: main header, 1: sub, …)
		var headerText = t.blixtenPopupHeader || (t.category && t.category.length > headerLevel ? t.category[headerLevel] : null);
		var mainCatConfig = {};
		if (headerText) {
			mainCatConfig = t.category && headerText ? this.categories.headers[headerText] || {} : {};
			
		}
		
		var row = this.makeRow(t, {
			className: this.prefix+"row-left",
//			key: this.nameField,
			label: t.displayName,
			css: t.css || {
				"background-color": mainCatConfig.color
			},
			content: t.content || null // If the row does not get its info from a feature, specify it in the content property
		});
		if (!headerText) {
			this.rowsDiv.append(row); // If row does not belong to any header
			return;
		}
		
		// Put the row below the correct header. If the header does not exist, create it.
		var header = this.rowsDiv.find("#"+this.prefix+"rowheader-"+this._encodeHeader(headerText));
		if (!header.length) {
			header = $("<div class='"+this.prefix+"row-left "+this.prefix+"rowheader' id='"+this.prefix+"rowheader-"+encodeURIComponent(headerText)+"'>"+headerText+"</div>");
			this.rowsDiv.append(header);
		}
		// Avoid reversing the layer order by simply adding rows using header.after()
		var lastRow = header.nextUntil(".blixtenpopup-rowheader").last();
		if (!lastRow.length) {
			header.after(row);
		}
		else {
			// put the row at the end
			lastRow.after(row);			
		}
		row.height(row.height());			
	},
	
	_decodeHeader: function(text) {
		decodeURIComponent(text.replace(/_-pr-_/gi, "%"));
	},
	
	_encodeHeader: function(text) {
		encodeURIComponent(text).replace(/%/gi, "_-pr-_");
	},
	
	startingInfo: "<p>Tryck på en rad till vänster för att få mer information om varje enskilt objekt.</p>",
	
	/**
	 * Add items
	 * @property layersDict {Object} Object of layer configs keyed by layer name.
	 * @returns {void}
	 */
	addItems: function(layersDict) {
		var t = null;
		this.removeRows();
		this.showInfo(this.startingInfo);
		for (var layerName in layersDict) {
			t = layersDict[layerName];
			if (t.hasNameField) {
				this.addRow(t);
			}
		}
		this.addHoverEffect();
	},
	
	
	/**
	 * Unselect all rows.
	 */
	unselectAllRows: function() {
		var theClass = this.prefix+"rowselected";
		$("."+theClass).each(function() {
			$(this).removeClass(theClass);
		});
	},
	
	removeRows: function() {
		this.rowsDiv.empty();
	},
	
	
	/**
	 * Add a hover effect to rows.
	 */
	addHoverEffect: function() {
		var self = this;
		$("."+this.prefix+"row-left:not(."+this.prefix+"rowheader)").mouseenter(function() {
			$(this).addClass(self.rowHoverClass);
		});
		$("."+this.prefix+"row-left:not(."+this.prefix+"rowheader)").mouseleave(function() {
			$(this).removeClass(self.rowHoverClass);
		});
		
	},
	
	// --------------- Event listeners --------------------------------------------------------------------
	
	/**
	 * Empty the leftDiv and attrDiv and
	 * close the dialog. Closing the dialog
	 * will in turn trigger "unselect" and
	 * thereby destruction of selected features.
	 */
	blixtenrequest: function(e) {
		if (this.treeDiv) {
			var nodeRoot = this.treeDiv.dynatree("getRoot");
			nodeRoot.removeChildren();
		}
		if (this.attrDiv) {
			this.attrDiv.empty();
			this.attrDiv.parent().find("iframe").remove();
		}
		this.hideDialog();
	},
	
	/**
	 * Event listener. When one or more features are selected
	 * the tree will be filled with content based on the features'
	 * categories and their layer's name.
	 */
	blixtenfeaturesfound: function(e) {
		
		var features = e.features,
			configArr = [],
			f = null,
			layerName = null,
			layersDict = {},
			t = null;
		this.foundFeatures = features;
		
		this.showDialog();
		
		for (var i=0,len=features.length; i<len; i++) {
			f = features[i];
			// -- Debug - remove later
			f.attributes[this.nameField] = f.attributes[this.nameField] || "Ett lager";
			f.attributes[this.urlField] = f.attributes[this.urlField]; // || "http://malmo.se/assets-2.0/img/malmo-stad-logo.png";
			f.attributes[this.tooltipField] = f.attributes[this.tooltipField] || "Some tooltip";
			
			// -- Debug - end
			
			
			layerName = f.layerName;
			if (layerName) {
				// Get the config object for the feature's layer
				t = layersDict[layerName] || sMap.cmd.getLayerConfig(layerName);
				t.fids = t.fids || [];
				
				t = $.extend({}, t); // Clone the config object
				t.fids.push(f.fid);
				
				// Use this URL to fill the popup-iframe.
				if (t.dialogContent) {
					f.attributes[this.urlField] = t.dialogContent;
				}
				// Check if the feature has any feature specific info. In that case
				// register this.
				if (f.attributes[this.urlField] && f.attributes[this.urlField] != "") {
					t.hasNameField = true;
					
				}
				layersDict[layerName] = layersDict[layerName] || t;
			}
		}
		this.addItems( layersDict );
		
//		this.dialogDiv.prev().dblclick(function() {
//			$(this).next().dialog("close");
//			sMap.events.triggerEvent("addtoolbutton", this, {
//				index : 2,
//				label : "Sökresultat",
//				iconCSS : "ui-icon-info",
//				tagID : "button-blixtenpopup-results",
//				bindActivation: false,
//				on: function() {
//					$("#blixtenpopup-dialogdiv").dialog("close");
//					sMap.events.triggerEvent("removeitem", this, {
//						item: $("#button-blixtenpopup-results"),
//						doNotRedrawPosition: true
//					});
//				}
////				left: this.left,
////				right: this.right,
////				margin: this.margin
//			});
//		});
		
		
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.BlixtenPopup2"
	
});sMap.moduleConfig.BlixtenPopup2 = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		rowHoverClass: "blixtenpopup-hover",
		
		
		dialogPosition: ["right", "bottom"]
};
sMap.Lang.lang.BlixtenPopup2 = {
	"sv-SE" : {
		dialogTitle: "Sökresultat",
		tooltipFile: "Klicka på texten för mer information.",
		headerTop: "Generella riktlinjer",
		headerBottom: "Områdesspecifika riktlinjer"
	},
	en : {
		dialogTitle: "Search results",
		tooltipFile: "Click on the text for more info.",
		headerTop: "Generic specifications",
		headerBottom: "Specific specifications"
	}
	
};/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.ConfigSelector = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["afterapplyingwebparams"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.ConfigSelector.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.ConfigSelector.prototype.EVENT_TRIGGERS.concat(
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
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
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
		this.addDropDown();
	}, 
	/**
    * Add a drop-down menu for different configs to the toolbar.
    */
   	addDropDown : function() {
		var self = this,
//			toolbar = $("#toolbar-maindiv"),
			dropDownItems = this.dropDownItems,
			options = "<option value='def'>" + this.lang.defaultSelecttext + "</option>";
		
		for (var theme in dropDownItems){
			options = options + "<option value='" + theme + "'>" + dropDownItems[theme].name + "</option>";
		}
		var dropDownMenu = $("<select name='themes' id='configSelectorDdl'>" + options + "</select>");
		//toolbar.append(dropDownMenu);
		sMap.events.triggerEvent("addselect", self, {
				   selectObject : dropDownMenu,
				   index : self.toolbarIndex
		});
		//onChange of the dropDown
		$('#configSelectorDdl').change(function() {
			var selectedTheme = $(this).find("option:selected").val();
			if (selectedTheme!="def"){
				self.changeConfig(selectedTheme);
			}
			else{
				self.afterapplyingwebparams();
			}
		});
	},
	/**
	 * Change the config file and reload the map
	 * @param theme
	 */
	changeConfig : function(theme) {
		var params = sMap.cmd.getParamsAsObject(),
			oldOLarr = params.OL ? params.OL : [];
		if (this.dropDownItems[theme].file){
			params.CONFIG = this.dropDownItems[theme].file;
		}
		if (!this.keepZoom){
			params.CENTER = null;
			params.ZOOM = null;
		}
		if (this.dropDownItems[theme].bl){
			params.BL = this.dropDownItems[theme].bl;
		}
		else if (!this.keepBackground){
			params.BL = null;
		}
		if (this.dropDownItems[theme].ol  || this.dropDownItems[theme].ol == ""){
			params.OL = this.dropDownItems[theme].ol;
		}
		else if (!this.keepOverlays){
			params.OL = null;
		}
		if (!this.keepFeatures){
			params.FEATURES = null;
		}
		if (!this.keepOpacities){
			params.OP = null;
		}
		else {
			var newOLarr = params.OL ? params.OL.split(",") : [],
				OParr = params.OP ? params.OP : [],
				newOP =	OParr.length > 0 ? OParr[0] : null;
			for (var i =0;i<newOLarr.length;i++){
				var found = false;
				for (var j = 0;j<oldOLarr.length;j++){
					if (newOLarr[i] == oldOLarr[j]){
						newOP += "," + OParr[j+1];
						found = true;
					}
				}
				if (!found){
					newOP += ",100";
				}
			}
			params.OP = newOP;
		}
		var	webParams = "",
			key = null,
			val = null;
		for (key in params) {
			val = params[key];
			if (val){
				webParams = webParams + "&" + key.toLowerCase()+"="+val;
			}
		}
		webParams = webParams.substring(1); // Remove starting "&"
		
		webParams = sMap.config.rootURL + "?" + webParams;
		
		document.location = webParams;
	},
	/**
	 * Change the selector to the value that contains the config-file and ol-string
	 * @param config
	 */
	setDropDown : function(config){
		var ddl = $("#configSelectorDdl"),
			ol = sMap.db.startingWebParamsObject.OL ? sMap.db.startingWebParamsObject.OL : "",
			items = this.dropDownItems;
		for (var theme in items){
			var itemOL = items[theme].ol ? items[theme].ol : "";
			if (items[theme].file == config && (itemOL == ol || (items[theme].ol==null))){
				ddl.val(theme);
			}
		}
	},
	afterapplyingwebparams : function(){
		var config = sMap.db.startingWebParamsObject.CONFIG;
		if (config) {
			this.setDropDown(config);
		}
	},
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.ConfigSelector"
	
});sMap.moduleConfig.ConfigSelector = {
		/**
		 * Module for switching config file. 
		 * Listeners:
		 * afterapplyingwebparams
		 * Sets the current config option from the web params
		 */
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		/**
		 * Available config files and their corresponding theme names
		 * optional could overlays "ol" and backgroundlayer "bl" be specified. 
		 * These will override ol and bl specified by the user in the current map
		 */
		dropDownItems : {
			// "plan3": {
		   		// file : "configs/test_3008.js",
		   		// name : "Planerade bostäder",
		   		// ol   : ""
		   	// },
			// "gsdggsdg": {
		   		// file : "configs/atlas_v_higgins5.js",
		   		// name : "stadskartaaaaa",
		   		// ol   : "",
		   		// bl   : "stadskartan"
		   	// }
		},
		/**
		 * Toolbarindex
		 */
		toolbarIndex : 15,
		/**
		 * Keep zoom and center in new theme
		 */
		keepZoom : true,
		/**
		 * Keep backgroundlayer in new theme. Overridden if bl specified in dropDownItems
		 */
		keepBackground : true,
		/**
		 * Keep overlays in new theme. Overridden if ol specified in dropDownItems
		 */
		keepOverlays : true,
		/**
		 * Keep opacity values for the overlays
		 */
		keepOpacities : false,
		/**
		 * Keep drawn features in new theme
		 */
		keepFeatures : true
};sMap.Lang.lang.ConfigSelector = {
		"sv-SE" : {
			defaultSelecttext : "Snabbval....."
		},
		en		: {
			defaultSelecttext : "Select map"
		}
};﻿/**
 * @author Kristian Bergstrand
 * @copyright Helsingborgs stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.CopyLink = OpenLayers.Class(sMap.Module, {
	
	/**
	 * EVENT_LISTENERS:
	 * 		*updatelinkentries* 
	 * 		Updates the URL entry if visible. 
	 * 		If not visible nothing will happen.
	 * 
	 * 		*showlink* 
	 * 		Shows the drop-down containing the URL entry. The URL
	 * 		is updated at the same time. Triggering this event can also
	 * 		be used for updating the URL entry but if you do not want to
	 * 		activate the module if not active you should use *updatelinkentries*.
	 */
	EVENT_LISTENERS : ["updatelinkentries", "showlink"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.CopyLink.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.CopyLink.prototype.EVENT_TRIGGERS.concat(
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
		if (this.active===true && this.linkDiv && this.linkDiv.length) {
			// If activated when already active - just update the entry.
			this.updatelinkentries();
			return;
		}
			
		/**
		 * Originally I was using this.div and appended everything to this.
		 * However, it was not possible to select the text in the input field
		 * then. Therefore, this.div is nulled from beginning.
		 */
		$(this.div).empty().remove();
		this.div = null;
	
		if ($(this.div).children().length==0) {
			var self = this;
			
			// Make the linkDiv and append to this.div
			this.linkDiv = this.makeCopyLinkDiv("copylink-maindiv");
			$("#mapDiv").append(this.linkDiv);
			
			this.map.events.register("moveend", this, function() {
				self.updatelinkentries();
			});
			this.map.events.register("zoomend", this, function() {
				self.updatelinkentries();
			});
		}
		$(this.linkDiv).show();
		self.updatelinkentries();

		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		$(this.linkDiv).hide();
		
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

		$(this.linkDiv).empty().remove();
		//this.handler["moveend"].deactivate();
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		var eventChooser = "addtoolbutton";
		if (this.addToToolsMenu){
			eventChooser = "addtomenu";
		}
		
		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			label : this.labelButton ? this.lang.labelText : null,
			hoverText : this.lang.labelText,
			iconCSS : "btncopylink",
			tagID : "button-copylink",
			left: this.left,
			right: this.right,
			menuId : this.addToToolsMenu
		});
	},
	
	/**
	 * This forces the module to activate and is useful
	 * when other modules want to show a link reproducing
	 * the current map.
	 * @param e {Object} Has no importance here.
	 */
	showlink: function(e) {
		return this.activate(e);
	},
	
	/**
	 * 	This function adds a new "row": A container-div holds a header and
	 * 	a <input type='text'> field for the link.  
	 * 
	 * @param linkLbl {String}
	 * @param linkEntry {String}
	 * 
	 * @returns linkDiv {Object} jQuery-object
	 */
	
	copyLinkRow : function(linkEntry,linkLbl) {
		var self = this,
			linkDiv = this.linkDiv;
			linkEntryContainer = $("<div class='copylink-subdiv'></div>"),
			linkLabel = $("<div class='copylink-labels'>"+ linkLbl +"</div>"),
			linkEntry = $("<input type='text' id='"+linkEntry+"' class='copylink-entries' />"); // the class here is used when updating with the latest URL
			
		// Select all text on click		
		linkEntry.click(function(e) {
			$(this).select();
		});
		
		//Display a warning if url.length>2083
		linkEntry.select(function(e) {
			var url = e.target.value;
			if (url.length>2083) {
				alert(self.lang.tooLongURL);
			}
		});
		linkEntryContainer.append(linkLabel).append(linkEntry);
		linkDiv.append(linkEntryContainer);

		return linkDiv;
	},
	
	/**
	 * If shortenOption is set in CopyLink_conf.js.
	 * Calls right function to shorten
	 * 
	 */
	
	chooseShortener : function(name){
		if (name == "toDb"){
			this.shortenLinks();
		}
		else if (name == "bitLy"){
			this.sMaply();
		}
		else{
			alert("error!");
		}
	},
	
	/**
	 * If shortenOption is set in CopyLink_conf.js.
	 * Creates a spinner to be shown during ajax-request.
	 * 
	 * @param targetElement {String}
	 * 		id of the element to which the spinner will be appended.
	 *  
	 * @returns spinner {Object}
	 */
	
	createSpinner : function(targetElement) {
		var target = document.getElementById(targetElement);
		
		if( !this.spinAnimation ){
			var opts = {
			    lines: 8, // The number of lines to draw
			    length: 4, // The length of each line
			    width: 2, // The line thickness
			    radius: 4, // The radius of the inner circle
			    color: '#000', // #rgb or #rrggbb
			    speed: 1, // Rounds per second
			    trail: 60, // Afterglow percentage
			    left: 1,
			    shadow: false // Whether to render a shadow
			};
			
			//Instantiate the spinner
			var spinner = new Spinner(opts);
		}
		else{
			var spinner = this.spinAnimation;
			$("#"+targetElement).empty().show();
		}
		//Add to target and start spinning
		spinner.spin(target);
		
		//make the spinner global, then return it
		this.spinAnimation = spinner;
		return spinner;
	},
	
	/**
	 * If shortenOption is set in CopyLink_conf.js.
	 * This function shortens the current url to the map using bit.ly.
	 * Note that shortening via bit.ly can not be done on localhost!
	 * 
	 * @returns {}
	 */
	
	sMaply : function() {
		var self = this,
			msgDiv = $("#copylink-shortenmsg"),
			longUrl = sMap.cmd.getParamsAsString(true);
		
		if (window.location.host == "localhost" || window.location.host == "localhost:8888"){
			longUrl = "http://www.google.se"; 
			alert("Shortening via bit.ly can not be done on localhost! Instead " + longUrl + " will be used for test!"); 
		}
		var url = sMap.config.proxyHost ? sMap.config.proxyHost + self.bitLyPath : self.bitLyPath;
		var spinner = self.createSpinner('copylink-shortenmsg');
		$.ajax({
			url : url,
			data : {
				"longUrl" : encodeURIComponent(longUrl)
			},
			type : "POST",
			error: function(request,error) {
				if (spinner){
		    		spinner.stop();
		    	}
				msgDiv.text(self.lang.failureMsg);
			},
			success : function(data){
				var shortUrl = data;
				sMap.events.triggerEvent("updatelinkentries", self, {
					url : shortUrl
				});
				if (spinner){
		    		spinner.stop();
		    	}
				msgDiv.text(self.lang.successMsg).show().delay(3000).fadeOut('fast', function() {msgDiv.empty();});
			}
		});
		
	},
	
	/**
	 * Shortens part of the current url to the map and saves to db.
	 * Parameter "features" (drawn objects) in the query-string gets shorten.
	 * 
	 * 
	 * @returns {}
	 */
	shortenLinks : function() {
		var self = this,
			msgDiv = $("#copylink-shortenmsg"),
			params = sMap.cmd.getParamsAsObject(true),
			longString = params.FEATURES;
		
		if (!longString){
			msgDiv.text(self.lang.noFeaturesMsg).show().delay(3000).fadeOut();
			return;
		}
		
		var spinner = self.createSpinner('copylink-shortenmsg');
		
		var url = sMap.config.proxyHost ? sMap.config.proxyHost + self.saveToDbPath : self.saveToDbPath;
		$.ajax({
			url : url,
			data : {
				"longString" : longString
			},
			type : "POST",
			error: function(request,error) {
				if (spinner){
		    		spinner.stop();
		    	}
				msgDiv.text(self.lang.failureMsg);
			},
			success : function(data){
				params["FEATURES"] = "short";
				params["id"] = data;
				var shortUrl = "";
				$.each(params, function (key, value){
					shortUrl = shortUrl + "&" + key.toLowerCase()+"="+value;
				});
				shortUrl = shortUrl.substring(1); // Remove starting "&"
				shortUrl = sMap.config.rootURL + "?" + shortUrl;
				
				sMap.events.triggerEvent("updatelinkentries", self, {
					url : shortUrl
				});
				if (spinner){
		    		spinner.stop();
		    	}
				msgDiv.text(self.lang.successMsg).show().delay(3000).fadeOut('fast', function() {msgDiv.empty();});
			}
		});
	
	},
	
	/**
	 * 	Creates main-div with a "close-button" and interaction hacks.
	 * 	Calls copyLinkRow for creation of rows according to _conf.js.  
	 * 
	 * @param linkDivID {String}
	 *		Name of the main-div.
	 * 
	 * @returns linkDiv {Object} jQuery-object
	 */

	makeCopyLinkDiv : function(linkDivID) {
		var self = this,
			linkDiv = $("<div id='"+linkDivID+"' />"),
			myCats = this.cats; // all categories in CopyLink_conf.js
			
		linkDiv.addClass("ui-widget-content");
		self.linkDiv = linkDiv;
		var linkClose = $("<input id='copylink-btn' type='button' value='"+ self.lang.closeBtn +"' />");
		linkClose.button();
		$.each(myCats, function(i,val){
			if( val == true){
				var text = self.lang[i];
				self.copyLinkRow(i,text);
			}
		});
		
		linkDiv.append(linkClose);
		
		// If shorten links...see CopyLink_conf.js for details
		if (self.shortenOption == "toDb" || self.shortenOption == "bitLy") {
			
			var shortenDiv = $("<div id='copylink-shortendiv'></div>"),
				shortenBtn = $("<input id='copylink-shortenbtn' type='button' value='"+ self.lang.shortenURLBtn +"' />");
			shortenBtn.button();
			var shortenMsgDiv = $("<div id='copylink-shortenmsg'></div>");
			
			shortenBtn.click(function(e) {
				self.chooseShortener(self.shortenOption);
			});
		
			shortenDiv.append(shortenBtn).append(shortenMsgDiv);
			linkDiv.append(shortenDiv);
		}
		
		// Disable map interaction
		sMap.util.disableMapInteraction(linkDiv);
		
		// "Hack" to take away the disabled right click when hovering linkEntry.
		$(linkDiv).hover(function() {
				self.map.viewPortDiv.oncontextmenu = OpenLayers.Function.True;
		}, function() {
				self.map.viewPortDiv.oncontextmenu = OpenLayers.Function.False;
		});
		
		// "Close" window on close-button click.
		linkClose.click(function(e) {
			self.deactivate();
		});
		
	return linkDiv;
	},
	
	/**
	 * Listener to "updatelinkentries".
	 * Updates the link entry field (class 'copylink-entries').
	 * 
	 * @param e {Object} No parameters.
	 * @returns {void}
	 */
	updatelinkentries : function(e) {
		if ($(".copylink-entries").length>0 && $(".copylink-entries").is(":visible")) {
			var url = null;
			if(e !== undefined){
				url = e.url;
			}
			else{
			url = sMap.cmd.getParamsAsString(true);
			}
			// Replace URL with a info text if URL length > 2048 literals.
			if (url && url.length>2048) {
				url = this.lang.tooLongURL;
			}
			var linkEntry = $(".copylink-entries");
			linkEntry.each(function() {
				if (this.tagName.toLowerCase()=="input") {
					if ($(this).prop('id') == "copyLink"){
						$(this).val(url);
					}
					else{
						$(this).val('<iFrame width="500" height="500" frameborder="0" scrolling="no" src="' + url + '"></iFrame>');
					}
				}
				else {
					$(this).text(url);
				}
			});
		}
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.CopyLink"	
});sMap.moduleConfig.CopyLink = {
		/**
		 * Label the button with text
		 */
		labelButton : true,
		/**
		 * The different categories, to add to the copyDiv.
		 */
		cats : {
			copyLink : true, // Simply a link to the map
			embedLink : true // iFrame-code with src set to the current link to the map
		},
		
		/**
		 * Possible values for "shortenOption" below: "toDb"/"bitLy". 
		 * If set to any of these, a button for shortening the URL is added, plus:
		 *		- "toDb" shortens the "features"-parameter of the URL, and saves it to a SQlite-database.
		 *			"saveToDbPath" is the path to script for saving long part of the URL.
		 *
		 *		- "bitLy" shortens the whole URL via bit.ly.
		 * 			"bitLyPath" is the path to script for shortening via bit.ly
		 * 
		 */
		
		shortenOption : "toDb", 
		saveToDbPath : "http://www.smap.se/cgi-bin/shorten/sMap_save.py", 
		//fetchFromDbPath : Path to script for retrieving long part of the URL. Set in Draw_conf.js!
		bitLyPath : "http://www.smap.se/cgi-bin/shorten/sMaply.py",

		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false
};﻿sMap.Lang.lang.CopyLink = {
	"sv-SE" : {
		labelText : "Kopiera länk",
		copyLink : "Länk till karta (högerklicka och kopiera):",
		embedLink : "Bädda in på egen sida (högerklicka och kopiera):",
		closeBtn : "Stäng",
		tooLongURL: "Din länk är för lång för vissa webbläsare - ta bort ett eller flera ritade objekt.",
		shortenURLBtn : "Förkorta länkar",
		noFeaturesMsg : "Inget ritat, därför ingen förkortning!",
		failureMsg : "Internt fel, kontakta ansvarig",
		successMsg : "Klar"
	},
	en : {
		labelText : "Copy link",
		copyLink : "Link to current map (rightclick and copy)",
		embedLink : "Embed in own page (rightclick and copy)",
		closeBtn : "Close",
		tooLongURL: "Your URL is too long for some browsers - please remove some features.",
		shortenURLBtn : "Shorten links",
		noFeaturesMsg : "Nothing drawn, therefore no shortening!",
		failureMsg : "Internal error, contact administrator",
		successMsg : "Complete"
	}
};/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Draw = OpenLayers.Class(sMap.Module, {
	
	/**
	 * Holds the currently selected feature.
	 */
	selectedFeature: null,
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["selected", "unselected","creatingwebparams","afterapplyingwebparams","layervisible"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : ["addtoolbutton","showlink","addlayer","select","unselect"],
	
	toolbarIndex : null,
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Draw.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Draw.prototype.EVENT_TRIGGERS.concat(
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
			this.dialogDiv = this.makeDialogContent();
			this.dialogDiv = this.makeDialog(this.dialogDiv);
		}
		this.dialogDiv.dialog("open");
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		if (this.dialogDiv && this.dialogDiv.dialog("isOpen") === true) {
			return this.dialogDiv.dialog("close");
		}
		
		if (this.panel) {
			this.deactivateButtonsAndControls();
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
	drawContent : function() {
		var eventChooser = this.addToToolsMenu ? "addtomenu" : "addtoolbutton";

		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			iconCSS : "btndraw",
			label : this.lang.buttonText,
			tagID : "button-draw",
			menuId : this.addToToolsMenu
		});
	},
	/**
	 * Set the zIndex when showing a new layer
	 */
	layervisible: function(e) {
		if (this.editLayer){
			this.editLayer.setZIndex(this.zIndex);
		}
	},
	/**
	 * Create a color picker.
	 */
	addColorPicker: function(parent) {
		var button = $("<button id='draw-buttoncolorselect'>"+this.lang.btnColor+"</button>"),
			div = $("<div id='draw-divcolorselect' />"),
			colors = this.colors;
		for (var i=0,len=colors.length; i<len; i++) {
			var hex = colors[i],
				c = $("<span />");
			c.css({
				"background-color": hex
			});
			div.append(c);
			c.click(function() {
				// select color
				var color = self.colorToHex($(this).css("background-color"));
				button.css({
					"background": color,
					"color": "#000"
				});
				self.editLayer.styleMap.styles.temporary.defaultStyle.fillColor = color;
				self.editLayer.styleMap.styles.temporary.defaultStyle.strokeColor = color;
			});
		}
		div.height(Math.ceil(colors.length/4)*22); //Adjust the div height to contain all color samples
		var self = this;
		
		button.click(function() {
			$("#draw-divcolorselect").show();
		});
		var defaultColor = this.editLayer.styleMap.styles.temporary.defaultStyle.fillColor;
		button.css({
			"background-color": defaultColor
		});
		div.hover(function(){$(this).show();},
				function(){$(this).hide();});
		button.mouseleave(function() {
			$("#draw-divcolorselect").hide();
		});
		parent.append(button).append(div);
		div.hide();

		return div;
	},
	/**
	 * Returns the hexadecimal value of rgb color
	 * @param rgb
	 * @returns
	 */
	colorToHex : function (rgb) {
		if (rgb.substr(0, 1) === '#') {
	        return rgb;
	    }
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		return "#" +
		  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
	},
	/**
	 * Create a symbol picker.
	 */
	addSymbolPicker: function(parent) {
		var button = $("<button id='draw-buttonsymbolselect'>"+this.lang.btnSymbol+"</button>"),
			divselected = $("<div id='draw-divsymbolseleced' />"),
			div = $("<div id='draw-divsymbolselect' />"),
			s = $("<span id='draw-spannoimage'/>");
		s.text(this.lang.lblNoImage);
		div.append(s);
		s.click(function(){
			divselected.css({
				"background-image": "none"
			});
			self.restoreTempStyle();
		});
		var symbols = this.symbols, size = {},height={}, width={};
		for (var i=0,len=symbols.length; i<len; i++) {
			var src = symbols[i].url,
				image = $("<img />"),
				compsize = 0;
			height[src] = symbols[i].height ? symbols[i].height : (symbols[i].size ? symbols[i].size : this.defaultSymbolSize);
			width[src] = symbols[i].width ? symbols[i].width : (symbols[i].size ? symbols[i].size : this.defaultSymbolSize);
			compsize = width[src]>height[src] ? width[src] : height[src];
			size[src] = symbols[i].size ? symbols[i].size : (compsize ? compsize : this.defaultSymbolSize);
			image.prop("src",src);
			image.css({"height":height[src],"width":width[src]});
			div.append(image);
			image.click(function(){
				var symbol = $(this).prop("src");
				divselected.css({
					"background-image": "url("+symbol+")",
					"size" : size[symbol],
					"width" : width[symbol],
					"height" : height[symbol]
				});
				self.setPointTempStyle();
			});
		}
		div.height(this.symbolPickerHeight);
		var self = this;
		
		button.click(function() {
			$("#draw-divsymbolselect").show();
		});
		div.hover(function(){$(this).show();},
				function(){$(this).hide();});
		button.mouseleave(function() {
			$("#draw-divsymbolselect").hide();
		});

		parent.append(button).append(div).append(divselected);
		div.hide();
		button.hide();
		return div;
	},
	/**
	 * Set temporary style when drawing points with external graphic
	 */
	setPointTempStyle : function(){
		var divselected = $("#draw-divsymbolseleced"),
			backgroundImg = divselected[0].style.backgroundImage,
			symbol= "",
			size = sMap.util.takeAwayPx(divselected[0].style.size);
		if (backgroundImg.substring(4,5)=='"'){
			symbol = (sMap.util.rightStrip(backgroundImg,2)).substring(5); //FF has extra "" in string like: url("...")
		}else{
			symbol = (sMap.util.rightStrip(backgroundImg,1)).substring(4); //and the others like: url(...)
		}
		var index = null;
		for (var i = 0; i < this.symbols.length;i++){
			if (this.symbols[i].url == symbol){
				index = i;
			}
		}
		if (symbol!=""){
			this.editLayer.styleMap.styles.temporary.defaultStyle.externalGraphic = symbol;
			this.editLayer.styleMap.styles.temporary.defaultStyle.pointRadius = size/2;
			this.editLayer.styleMap.styles.temporary.defaultStyle.fillOpacity = 1;
			this.editLayer.styleMap.styles.temporary.defaultStyle.graphicYOffset = this.symbols[index].offsety ? this.symbols[index].offsety : null;
			this.editLayer.styleMap.styles.temporary.defaultStyle.graphicXOffset = this.symbols[index].offsetx ? this.symbols[index].offsetx : null;
		};
	},
	/**
	 * Restore temporary style when drawing lines, polys and points with no external graphic
	 */
	restoreTempStyle : function(){
		this.editLayer.styleMap.styles.temporary.defaultStyle.externalGraphic = null;
		this.editLayer.styleMap.styles.temporary.defaultStyle.pointRadius = this.defaultPointRadius;
		this.editLayer.styleMap.styles.temporary.defaultStyle.fillOpacity = this.defaultFillOpacity;
		this.editLayer.styleMap.styles.temporary.defaultStyle.graphicYOffset = null;
		this.editLayer.styleMap.styles.temporary.defaultStyle.graphicXOffset = null;
	},
	/**
	 * Shows the symbolpicker
	 */
	showSymbolPicker : function(){
		var divselected = $("#draw-divsymbolseleced"),
			btn = $("#draw-buttonsymbolselect");
		divselected.show();
		btn.show();
	},
	/**
	 * Hides the symbolpicker
	 */
	hideSymbolPicker : function(){
		var divselected = $("#draw-divsymbolseleced"),
			btn = $("#draw-buttonsymbolselect");
		divselected.hide();
		btn.hide();
	},
	/**
	 * Make a dialogDiv and append the panel and the div which
	 * displays the description
	 */
	makeDialogContent : function() {
		var dialogDiv = $("<div id='drawDialogDiv' class='mxDiv' />");	
		var mxEditBtnsDiv = this.makeEditButtons(); // the edit buttons
		this.addColorPicker(mxEditBtnsDiv);
		this.addSymbolPicker(mxEditBtnsDiv);
		dialogDiv.append(mxEditBtnsDiv);
		var mxDescDiv = this.makeDescrDiv(); // the describe field
		dialogDiv.append(mxDescDiv);
		var mxButtonDiv = this.makeButtons();
		dialogDiv.append(mxButtonDiv);
		return dialogDiv;
	},
	/**
	 * Make the div with copylink button.
	 * @return {div}
	 */
	makeButtons : function() {
		var mxButtonDiv = $("<div id='mxButtonDiv' />");
		var button = $("<button id='draw-opencopylink'>"+this.lang.btnCopylink+"</button>");
		button.click(function() {
			sMap.events.triggerEvent("showlink", this, {});
		});
		button.button();
		mxButtonDiv.append(button);
		return mxButtonDiv;
	},
	/**
	 * Make edit buttons. Editing is actually activated from this function.
	 * @return {div}
	 *     Div containing the buttons.
	 */
	makeEditButtons : function() {
		
		var buttons = this.buttons;
		this.initiateMarkerEditing(buttons);
		
		var mxEditBtnsDiv = $("<div id='mxEditBtnsDiv' />");
		var mxEditLbl = $("<div id='mxEditLbl' />");
		var mxEditStyle = $("<div id='mxEditStyle' />");
		
		// Append text and the help link to the "label".
		var infoText = $("<span>"+ this.lang.helpText+"</span>");
		infoText.css({
			"width" : "170px",
			"display" : "inline"		
		});
		mxEditLbl.append(infoText);
		
		mxEditBtnsDiv.append(mxEditLbl);
		mxEditBtnsDiv.append(this.panel);
		
		return mxEditBtnsDiv;
	},
	
	/**
	 * Add the editing control and the editLayer. An event function
	 * will be executed on feature creation, modification and erasing.
	 */
	initiateMarkerEditing : function(buttons) {
		this.addEditLayer();
		if (!this.panel) {
			this.drawEditToolbar(buttons,null);
		}
		this.bindFeatureCompleteEvents();

	},
	/**
	 * Adds the editLayer to the map
	 */
	addEditLayer : function() {
		var editlayerExists = this.map.getLayersByName(this.drawLayerConfig.name).length == 1 ? true : false;
		if (!editlayerExists){
			var s = this.drawLayerConfig.style;
			this.editLayer = new OpenLayers.Layer.Vector(this.drawLayerConfig.name, {
				styleMap : new OpenLayers.StyleMap({
						"default": new OpenLayers.Style( s["default"] ),
						"select": new OpenLayers.Style( s["select"] ),
						"temporary": new OpenLayers.Style( s["temporary"] )
				}),
				projection: new OpenLayers.Projection(this.map.projection),
				selectable: true,
				displayInLayerSwitcher: this.drawLayerConfig.displayInLayerSwitcher
			});
			sMap.config.layers.overlays.push(this.drawLayerConfig);
			sMap.events.triggerEvent("addlayer", this, {
				layer : this.editLayer
			});
			this.showHideEditLayer();
		}
	},
	
	/**
	 * Paths for buttons
	 */
	srcIconPointOff: "img/editTools/point_off.png",
	srcIconLineOff: "img/editTools/line_off.png",
	srcIconPolygonOff: "img/editTools/polygon_off.png",
	srcIconModifyOff: "img/editTools/polygon_off.png",
	srcIconDeleteOff: "img/editTools/delete_off.png",
	srcIconMoveOff: "img/editTools/polygon_off.png",
	
	srcIconPointOn: "img/editTools/point_on.png",
	srcIconLineOn: "img/editTools/line_on.png",
	srcIconPolygonOn: "img/editTools/polygon_on.png",
	srcIconModifyOn: "img/editTools/polygon_on.png",
	srcIconDeleteOn: "img/editTools/delete_on.png",
	srcIconMoveOn: "img/editTools/polygon_on.png",
	
	/**
	 * 
	 * @param img
	 * @param state
	 * @returns
	 */
	renderButton: function(img, state) {
		state = state || false;
		
		var oldState = "_off",
			newState = "_on";
		
		var src = img.attr("src");
		if (state !== true) {
			oldState = "_on";
			newState = "_off";
		}
		img.attr("src", src.replace(oldState, newState));
		
	},
	
	/**
	 * Draw the edit buttons
	 */
	drawEditToolbar : function(buttons, options) {
		options = options || {};
		
		var self = this;
		
		this.panel = $("<div id='draw-panel' />");
		
		var buttonPoint = $("<div class='draw-button' id='draw-btn-point'><img src='"+this.srcIconPointOff+"'></img></div>"),
			buttonLine = $("<div class='draw-button' id='draw-btn-line'><img src='"+this.srcIconLineOff+"'></img></div>"),
			buttonPolygon = $("<div class='draw-button' id='draw-btn-polygon'><img src='"+this.srcIconPolygonOff+"'></img></div>"),
			buttonModify = $("<div class='draw-button' id='draw-btn-modify'><img src='"+this.srcIconModifyOff+"'></img></div>"),
			buttonMove = $("<div class='draw-button' id='draw-btn-move'><img src='"+this.srcIconMoveOff+"'></img></div>"),
			buttonDelete = $("<div class='draw-button' id='draw-btn-delete'><img src='"+this.srcIconDeleteOff+"'></img></div>");
//		this.panel.append(buttonPoint).append(buttonLine).append(buttonPolygon).append(buttonModify).append(buttonDelete);
		this.buttons = {
			point: buttonPoint,
			line: buttonLine,
			polygon: buttonPolygon,
			modify: buttonModify,
			move: buttonMove,
			"delete": buttonDelete
		};
		
		var onButtonClick = function() {
			var type = $(this).attr("id").split("-")[2]; // because id looks like this: "draw-btn-point"
			if (!$(this).data("active")) {
				// Activate
				self.deactivateButtonsAndControls($(this));
				$(this).data("active", true);
				self.renderButton($(this).find("img"), true);
				self.controls[type].activate();
			}
			else {
				// Deactivate
				$(this).data("active", false);
				self.renderButton($(this).find("img"), false);
				self.controls[type].deactivate();
			}
		};
		
		/**
		 * Make controls to fill the panel
		 */
		var drawPolygon = new OpenLayers.Control.DrawFeature(
			this.editLayer, OpenLayers.Handler.Polygon, {
				title: this.lang.hoverTextPolygon,
				multi: true
		});
		drawPolygon.events.register("activate", this, function(e) {this.restoreTempStyle();});
		var drawPoint = new OpenLayers.Control.DrawFeature(
			  this.editLayer, OpenLayers.Handler.Point, {
				  title: this.lang.hoverTextPoint,
				  multi: false
		});
		drawPoint.events.register("activate", this, function(e) {this.setPointTempStyle();this.showSymbolPicker();});
		drawPoint.events.register("deactivate", this, function(e) {this.hideSymbolPicker();});
		var drawLine = new OpenLayers.Control.DrawFeature(
				this.editLayer, OpenLayers.Handler.Path, {
					title: this.lang.hoverTextLine,
					multi: true
		});
		drawLine.events.register("activate", this, function(e) {this.restoreTempStyle();});
		var move = new OpenLayers.Control.DragFeature(this.editLayer, {
			title: this.lang.hoverTextMove,
			onComplete : function(){
				sMap.events.triggerEvent("updatelinkentries", this, {});
			}
		});
		var modify = new OpenLayers.Control.ModifyFeature(this.editLayer, {
			title: this.lang.hoverTextModify,
			vertexRenderIntent : "select",
			displayClass: "olControlModifyFeature"
		});
		var del = new OpenLayers.Control.DeleteFeature(this.editLayer, {
			title: this.lang.hoverTextDelete
		});

		var style = new OpenLayers.Control.Button({
			title: this.lang.hoverTextStyle,
			type : OpenLayers.Control.TYPE_BUTTON,
			trigger: function() {
				if (self.selectedFeature){
					self.styleFeature([self.selectedFeature]);
				}
			},
			displayClass: "olControlSaveFeatures"
		});
		var save = new OpenLayers.Control.Button({
			title: this.lang.hoverTextSave,
			type : OpenLayers.Control.TYPE_BUTTON,
			trigger: function() {
		    	self.saveEdits();
			},
			displayClass: "olControlSaveFeatures"
		});
		this.controls = {
				point : drawPoint,
				line : drawLine,
				polygon : drawPolygon,
				move : move,
				modify : modify,
				"delete" : del,
				style : style,
				save : save
		};
		var toBeAdded = [];
		for (var type in this.useButtons) {
			if (this.useButtons[type] === true) {
				var ctrl = this.controls[type];
				var button = this.buttons[type];
				toBeAdded.push(ctrl);
				button.click(onButtonClick)
					.mouseenter(function() {
						self.renderButton($(this).find("img"), true);	
					}).mouseleave(function() {
						if ( !$(this).data("active")) {
							self.renderButton($(this).find("img"), false);		
					}
				});
				this.panel.append(button);
			}
		}
		if (toBeAdded.length) {
			this.map.addControls(toBeAdded);
		}
		
		for (var i=0,len=toBeAdded.length; i<len; i++) {
			var c = toBeAdded[i];
			c.events.register("activate", this, function(e) {
//				var ctrl = e.object;
//				var className = ctrl.handler.CLASS_NAME.split(".")[2].toLowerCase();
//				var type = dict[className];
//				var button = this.buttons[type];
//				this.deactivateButtonsAndControls( button );
				this.unselectFeatures();
			});
		}
	},
	/**
	 * Styles the features that are sent in to the function according to current tempStyle
	 */
	styleFeature : function(feature){
		var f = feature,
			tempstyle = this.editLayer.styleMap.styles.temporary.defaultStyle,
			color = tempstyle.fillColor,
			symbol = tempstyle.externalGraphic,
			offsety = tempstyle.graphicYOffset,
			offsetx = tempstyle.graphicXOffset,
			size = tempstyle.pointRadius,
			opacity = tempstyle.fillOpacity,
			defaultstyle = this.editLayer.styleMap.styles["default"].defaultStyle;
		if (true){  //tempstyle.fillColor!=defaultstyle.fillColor||tempstyle.externalGraphic
			for (var i=0;i<f.length;i++){
				var newStyle = {};
				if (symbol){
					newStyle = {
							pointRadius : size,
							fillOpacity : opacity,
							externalGraphic : symbol,
							graphicYOffset : offsety,
							graphicXOffset : offsetx,
							cursor : "pointer"
						};
				}
				if (!symbol) {
					newStyle = {
							pointRadius : size,
							fillColor : color,
							fillOpacity : opacity,
							graphicName: this.defaultGraphicName,
							strokeWidth : this.defaultStrokeWidth,
							strokeColor : color,
							strokeOpacity : this.defaultStrokeOpacity,
							cursor : "pointer"
						};
				}
				f[i].style = newStyle;
			};
			this.editLayer.redraw();
		}
	},
	
	/**
	 * This is called upon completion of a marker (after creation, modification or erasing).
	 * Catch the event type through e.type.
	 * @param e
	 * @return
	 */
	bindFeatureCompleteEvents : function() {
		this.editLayer.events.register("featureadded", this, function(e) {
			if (this.autoDeactivateTool){
				this.deactivateButtonsAndControls();
			}
			var feature = e.feature;
			this.showHideEditLayer();
			this.styleFeature([feature]);
			feature.attributes.info = "";
			feature.attributes.editable = true;
			feature.attributes.orgid = feature.id;
			this.selectFeature(feature);
			sMap.events.triggerEvent("updatelinkentries", this, {});
			OpenLayers.Event.stop(e);
		});
		this.editLayer.events.register("beforefeaturemodified", this, function(e) {
			this.checkEditable(e);
			this.selectFeature(e.feature);
		});
		this.editLayer.events.register("featuremodified", this, function(e) {
			this.unselectFeatures();
			sMap.events.triggerEvent("updatelinkentries", this, {});
		});
		this.editLayer.events.register("beforefeatureremoved", this, function(e) {
			this.checkEditable(e);
		});
		this.editLayer.events.register("featureremoved", this, function(e) {
			this.showHideEditLayer();
			this.unselectFeatures();
			sMap.events.triggerEvent("updatelinkentries", this, {});
		});
	},
	checkEditable : function(e){
		if (!e.feature.attributes.editable){
//			alert("Feature not editable");
//			return false;
		}
	},
	/**
	 * Selects the input feature
	 * @param feature
	 */
	selectFeature : function(feature){
		var featureclone = feature.clone();
		featureclone.layerName = this.drawLayerConfig.name;
		sMap.events.triggerEvent("select", this, {
			features:[featureclone]
		});
	},
	/**
	 * Tests if edit layer has features and shows it if it has otherwise it will be hidden
	 */
	showHideEditLayer: function(){
		if (this.editLayer.features.length>0 && !this.editLayer.visibility){
			sMap.events.triggerEvent("showlayer", this, {
				layerName : this.editLayer.name
			});
		}
		if (this.editLayer.features.length==0 && this.editLayer.visibility){
			sMap.events.triggerEvent("hidelayer", this, {
				layerName : this.editLayer.name
			});
		}
	},
	/**
	 * Unselects all features
	 */
	unselectFeatures : function(){
		sMap.events.triggerEvent("unselect", this, {});
	},
	/**
	 * Listener for the select modules event selected
	 * @param e
	 */
	selected: function(e) {
		var f = e.selectedFeatures.length ? e.selectedFeatures[0] : null;
		if (f) {
			if (f.attributes.editable||this.editLinkFeatures) {
				this.selectedFeature = this.editLayer.getFeatureById(f.attributes.orgid);
				this.addButtonsToPopup();
				$("#mxDescrEntry").prop("disabled", false);
				$("#mxDescrEntry").focus();
				this.updateTextField(f.attributes.info);
			}
		}
	},
	/**
	 * Listener for the select modules event unselected
	 * @param e
	 */
	unselected: function(e) {
		$("#mxDescrEntry").prop("disabled", true);
		this.updateTextField(this.lang.descrEntryText);
		this.selectedFeature = null;
		sMap.events.triggerEvent("updatelinkentries", this, {});
	},
	
	/**
	 * Gets the selected feature from the selectLayer
	 * @returns OpenLayers.Feature.Vector
	 */
	getSelectedFeature : function() {
		var feature = null;
		if (selectLayer.features.length>0) {
			feature = selectLayer.features[0];
		}
		return feature;
	},
	/**
	 * Updates the textarea for the description in the dialog
	 * @text {String} the text to update with
	 */
	updateTextField : function(text) {
		text = text || "";
		$("#mxDescrEntry").val(text);
		$("#mxDescrEntry").focus();
	},
	/**
	 * Make the div where you can write the content of the marker.
	 * @return
	 */
	makeDescrDiv : function() {
		self = this;
		
		var mxDescrDiv = $("<div id='mxDescrDiv' />");
		var mxDescrLbl = $("<div id='mxDescrLbl' class='mxLbl' />");
		mxDescrLbl.text(this.lang.descrLblText);
		
		var mxDescrEntry = $("<textarea id='mxDescrEntry' />");
		mxDescrDiv.append(mxDescrLbl);
		mxDescrDiv.append(mxDescrEntry);
		mxDescrEntry.prop("disabled", true);
		mxDescrEntry.text(this.lang.descrEntryText);
		
		var self = this;
		mxDescrEntry.keyup(function(e) {
			self.selectedFeature.attributes.info = this.value;
			$("#draw-text").text( $(this).val() );
			sMap.events.triggerEvent("updatelinkentries", this, {});
		});
		return mxDescrDiv;
	},
	
	/**
	 * Deactivate all edit buttons except the one which just became active.
	 * And measure controls.
	 * @param control {OpenLayers.Control} The control (button) that just became active.
	 * @returns {void}
	 */
	deactivateButtonsAndControls: function(except) {
		var self = this,
			buttons = null;
		if (except) {
			buttons = except.siblings();
		}
		else {
			buttons = this.panel.children();
		}
		buttons.each(function() {
			$(this).data("active", false);
			var type = $(this).attr("id").split("-")[2];
			self.controls[type].deactivate();
			self.renderButton($(this).find("img"), false);
		});
	},
	
	/**
	 * Make the dialog to which all html is added.
	 */
	makeDialog : function(dialogDiv) {

		var self = this;
		sMap.util.createDialog(dialogDiv, {
			titleText : this.lang.headerText,
			position : this.dialogStartPosition,
			width : this.width,
			height : this.height,
			onClose : function() {
				// Deactivate controls
				self.deactivate.call(self);
			},
			onOpen : null
		});
		return dialogDiv;
	},
	/**
	 * Define what shall happen when u click on the popup buttons.
	 * This function has to run AFTER the popup (and popup-buttons)
	 * exist.
	 * 
	 * @param feature
	 * @return
	 */
	defineClickPopupButton : function(feature) {
		var self = this;
		$("#btnEditObject").click(function(e) {
			self.dialogDiv.dialog("open");
			$("#mxDescrEntry").focus();
			e.preventDefault();
		});
		$("#mxBtnErase").click(function(e) {
			var feature = self.getSelectedFeature() || null;
			if (feature!=null) {
				var drawFeature = self.editLayer.getFeatureById(feature.attributes.orgid);
				self.editLayer.destroyFeatures([drawFeature]);
				self.unselectFeatures();
			}
		});
	},
	/**
	 * Adds the edit and delete buttons to the popup
	 */
	addButtonsToPopup : function() {
		var feature = this.getSelectedFeature() || null;
		if (feature && feature.popup) {
			
			var btnEditObject = "<div id='btnEditObject' class='smapBtn'>"+this.lang.popupBtnEdit+"</div>";
			var mxBtnErase = "<div id='mxBtnErase' class='smapBtn'>"+this.lang.popupBtnDelete+"</div>";
			
			var html = feature.popup.contentHTML || "";
			// Don't add if button already exists in the html.
			if (html.search("btnEditObject")==-1) {
				var contDiv = "<div id='btnCont' class='btnCont'>" + btnEditObject + mxBtnErase + "</div>";

				html = html + contDiv;
				feature.popup.setContentHTML(html);
				
				feature.popup.updateSize();
				
				// Set button container width to same as the popup's width.
				var w = $(".olFramedCloudPopupContent").width();
				
				// Add some pixels to the popup height to give place for buttons.
				// Note! The same amount is taken away from height when they disappear.
				// This is done in function removeButtonsFromPopup
				this.addPopupSize(35);
				$("#btnCont").width(w);
				this.defineClickPopupButton(feature);
				
			}
		}
	},
	/**
	 * Fix the popup size after adding the button. This has to
	 * done each time the popup is opened (every time the button
	 * is added).
	 * @param popup {OpenLayers.Popup}
	 * @return
	 */
	addPopupSize : function(pixels) {
		var h = $(".olFramedCloudPopupContent").height();
		$(".olFramedCloudPopupContent").height(h + pixels);
		var feature = this.getSelectedFeature();
		feature.popup.updateSize();
		feature.popup.draw();
	},
	
	creatingwebparams : function(){
		// Remove drawLayer from the OL-params
		var index = $.inArray( this.drawLayerConfig.name, sMap.db.webParams.OL || [] );
		if (index > -1) {
			sMap.db.webParams.OL.splice(index, 1);
		}
		// Check if any draw objects have been added.
		var editLayer = this.editLayer,
			markerFeatures=""; // Store all features in the editLayer as one continuous string, separated by an "F".
		
		if (editLayer) {
			var features = editLayer.features;
			/*
			 * The splitSign is used to separate many WKT strings and their texts.
			 * Note that if user adds a text which is same as splitSign, this will
			 * lead to a problem... so it has to be chosen carefully. Note also that
			 * if you change it here - it also has to be changed in MapConfig where
			 * the splitSign is used to retrieve the features again.
			 */
			var splitSign = "$$",
				commaSign = "££", // to replace "," in WKT-strings and text.
				newRowSign = "¤¤";
			
			// Getting each feature f from the editLayer, one by one.
			// And round each features coords (long and lat) to 0 decimals.
			var f = null, markerText=null, markerTexts="", measureText=null, measureTexts="", style="", styles="";
			var decConst = Math.pow(10, this.decimals); // Create constant for calculating the rounding
			for (var i=0,len=features.length; i<len; i++) {
				f = features[i];
				if (f.attributes.info||f.attributes.info==""){ //to check if its an user created feature and not an edit vertice
					// Round all vertices to user defined number of decimals.
					var nodes = f.geometry.getVertices();
					for (var k=0,klen=nodes.length; k<klen; k++) {
						var n = nodes[k];
						n.x = Math.round(n.x * decConst) / decConst;
						n.y = Math.round(n.y * decConst) / decConst;
					}
					// End of rounding
					
					// Replace the comma in the WKT-string since this could cause problems when
					// sending over platforms, although decodeURLComponent would work in theory.
					var wkt = f.geometry.toString(),
						wktArr = null,
						geomStart = null,
						geomEnd = null;
					
					var markerWkt = encodeURIComponent(wkt);
					
					// Add a feature separator.
					markerFeatures = markerFeatures + markerWkt + splitSign;
					
					// Retrieve the marker pop-up text.
					markerText = f.attributes.info ? f.attributes.info.replace(/,/g, commaSign) : "";
					markerText = markerText.replace(/\n/g, newRowSign);
					markerText = encodeURIComponent(markerText);
					markerTexts = markerTexts + markerText + splitSign;
					
					// Check if it has measure attribute contains any text - if so, add measurement to url. 
					measureText = f.attributes.measurement ? "1" : "0"; // 1: true, 0: false
					measureTexts = measureTexts + measureText + splitSign;
					
					//Check if feature has a style - if so, add style to url
					if (f.style){
						var index = 0;
						if (f.style.externalGraphic){
							for (var j=0;j<this.symbols.length;j++){
								if (f.style.externalGraphic==this.symbols[j].url){
									index = j;
								}
							}
							style = "s" + index;
						}
						else{
							/*var fcarr = this.extractRGB(f.style.strokeColor),
								pcarr = [];
							for (var k=0;k<this.colors.length;k++){
								pcarr = this.extractRGB(this.colors[k]);
								if ((fcarr[0] === pcarr[0]) && (fcarr[1] === pcarr[1]) && (fcarr[2] === pcarr[2])){
									index = k;
								}
							}
							style = "c" + index;*/
							for (var k=0;k<this.colors.length;k++){
								if (f.style.strokeColor == this.colors[k]){
									index = k;
								}
							}
							style = "c" + index;
						}
					}
					else {
						style = 0;
					}
					styles = styles + style + splitSign;
				}
			}

			// Add the var 'features' to sMap.db.webParams that is uset to create webparams
			if (markerFeatures!="") {
				var len = splitSign.length;
				markerFeatures =
						sMap.util.rightStrip(markerFeatures, len) + "," +
						sMap.util.rightStrip(markerTexts, len) + "," +
						sMap.util.rightStrip(measureTexts, len) + "," +
						sMap.util.rightStrip(styles, len);
				
				markerFeatures = $.base64.encode(markerFeatures).replace(/=/g, "%3D"); // "=" disappears when in URL
				sMap.db.webParams.features = markerFeatures;
			}
		}
	},
	extractRGB : function(colstr){
		if (colstr){
			var n = colstr.indexOf("(")+1,
				m = colstr.indexOf(",",n),
				r = parseInt(colstr.substring(n,m)),
				g = 0,
				b = 0;
			n = m+1;
			m = colstr.indexOf(",",n);
			g = parseInt(colstr.substring(n,m));
			n = m+1;
			m = colstr.indexOf(")");
			b = parseInt(colstr.substring(n,m));
			var rgbArr = [r,g,b];
			return rgbArr;
		}
	},
	
	/**
	 * Fetch a previously saved long string for the features.
	 * 
	 * @param shortenId {String}
	 * 			The id to match in db.
	 * 
	 *
	 */
	
	fetchFromDb : function(shortenId){
		var self = this;
		var url = sMap.config.proxyHost ? sMap.config.proxyHost + this.fetchFromDbPath : this.fetchFromDbPath;
		$.ajax({
			url : url,
			data : {
				"get_id" : shortenId
			},
			type : "POST",
			error: function(request,error) {
				alert("Fel! Kontakta ansvarig");
			},
			success : function(result){
				self.drawTheFeatures.call(self, result);
			}	
		});
		return false;
	},
	
	
	drawTheFeatures : function(drawParam){
			var startfeatures = drawParam;
			if (startfeatures && startfeatures.length>=1) {
				startfeatures = startfeatures.replace(/%3D/g, "="); // The hack (because "=" disappears from URL)
	        	var str = startfeatures || "";
				var strend = str.substring(str.length-1,str.length);  // If the string ends with a newline character this must be romoved. /K-M
				if (strend=="\n"){str=str.substr(0,str.length-1);}
	        	var decodedStr = $.base64.decode(str);
	        	var params = decodedStr.split(",");
	        	
	        	var wkts = params[0];
	        	var texts = params[1];
	        	var measurements = params[2];
	        	var styles = params[3] ? params[3] : "0";
	        	
	        	var splitSign = "$$"; // Separates many WKT:s and texts in the URL. Has to corresponds with splitSign in SMap.WebParams.
	        	var commaSignRegExp = /££/g; // to replace "," in WKT-strings and text. Has to corresponds with splitSign in SMap.WebParams.
	        	var newRowSignRegExp = /¤¤/g; // solves the problem at Malmo.se where \n is interpreted in sitevision -> error.
	        	
	        	// Note - these 2 variables are declared earlier and they must not be declared again here.
	        	var markerWktArr = (wkts.search(splitSign)!=-1) ? wkts.split(splitSign) : [wkts];
	        	var markerTextArr = (texts.search(splitSign)!=-1) ? texts.split(splitSign) : [texts];
	        	var measureArr = (measurements.search(splitSign)!=-1) ? measurements.split(splitSign) : [measurements];
	        	var styleArr = (styles.search(splitSign)!=-1) ? styles.split(splitSign) : [styles];
	        	
	        	var wkt=null, markerText=null;
	        	for (var i=0; i<markerWktArr.length; i++) {
	        		// Decode the wkt and its pop-up text.
	        		markerWktArr[i] = decodeURIComponent(markerWktArr[i]).replace(commaSignRegExp, ",");
	        		
	        		// Put back comma (",") and new row sign ("\n").
	        		markerText = markerTextArr[i] ? decodeURIComponent(markerTextArr[i]) : null;
		        	if (markerText) {
	        			markerText = markerText.replace(commaSignRegExp, ",");
		        		markerText = markerText.replace(newRowSignRegExp, "\n");
		        	}
		        	markerTextArr[i] = markerText;
	        	}
	        	this.markerWktArr = markerWktArr;
	        	this.markerTextArr = markerTextArr;
	        	this.measureArr = measureArr;
	        	
	    		this.addEditLayer();
	    		this.addMarkers(this.markerWktArr, this.markerTextArr, this.measureArr, styleArr);
	    		// Create dialog if the features should be editable
	    		if (!this.dialogDiv && this.editLinkFeatures){
	    			this.dialogDiv = this.makeDialogContent();
	    			this.dialogDiv = this.makeDialog(this.dialogDiv);
	    		}
	    		//Select (if configured) the last feature added
				if (this.selectLinkFeatures){
					this.selectFeature(this.editLayer.features[this.editLayer.features.length-1]);
				}
				this.showHideEditLayer();
	        }
		},
		
		/**
		 * All previous code in afterapplyingwebparams has been moved 
		 * to the function drawTheFeatures().
		 * Instead a check is done to see if the features should
		 * be fetched from database.
		 * 
		 * 
		 *
		 */
		
		afterapplyingwebparams : function(){
			var startfeatures = sMap.db.startingWebParamsObject.FEATURES;
			if (startfeatures=="short"){
				this.fetchFromDb(sMap.db.startingWebParamsObject.ID);
			}
			else{
				this.drawTheFeatures(startfeatures);
			}
		},
		
		/**
		 * Add a marker with the given geometry and also add
		 * a pop-up which is open from start for the last feature in the array.
		 * 
		 * @param markerWktArr {Array(String)} Geometry in the "Well Known Text" (WKT)
		 * @param markerTextArr {Array(String)} The pop-up text. Index should match with corresponding feature.
		 * @return Nothing. A marker in given geometry is added to the poiLayer. The last feature's pop-up starts open.
		 */
		addMarkers : function(markerWktArr, markerTextArr, measureArr, styleArr) {

			// Fetch the markerLayer.
			var markerLayer = this.editLayer;
			
			var marker=null, wkt=null, markerText=null, measurement=null, style=null;
			for (var i=0; i<markerWktArr.length; i++) {
				wkt = markerWktArr[i];
				markerText = markerTextArr[i] ? markerTextArr[i] : "";
				measureText = measureArr[i] ? measureArr[i] : "0";
				style = styleArr[i] ? styleArr[i] : "0";
				var geom = new OpenLayers.Geometry.fromWKT(wkt);
				marker = new OpenLayers.Feature.Vector(geom);
				
				marker.attributes.info = markerText;

				// Add measurements to feature.
				if (parseInt(measureText)==1) {
					// Measure the feature and store the information in the feature.
					var measurement = markerEditingCtrl.measureFeatureToString.call(markerEditingCtrl, marker);
					marker.attributes["measurement"] = measurement;
					
					// Add the headers to make it appear in the popup.
					var measureHeader = ["div", null, "measurement", "popup-measure"];
					if (marker.popUpHeaders && marker.popUpHeaders.length>0) {
						marker.popUpHeaders.push(measureHeader);
					}
					else {
						marker.popUpHeaders = [measureHeader];
					}
				}
				if (style!=0){
					var newStyle = null, index=parseInt(style.substring(1));
					if (style.substring(0,1)=="s"){   //symbol
						newStyle = {
								pointRadius : this.symbols[index].size ? this.symbols[index].size/2 : this.defaultSymbolSize/2,
								fillOpacity : 1,
								externalGraphic : this.symbols[index].url,
								graphicYOffset : this.symbols[index].offsety ? this.symbols[index].offsety : null,
								graphicXOffset : this.symbols[index].offsetx ? this.symbols[index].offsetx : null,
								cursor : "pointer"
						};
					}
					if (style.substring(0,1)=="c"){		//color
						newStyle = {
								pointRadius : this.defaultPointRadius,
								fillColor : this.colors[index],
								fillOpacity : this.defaultFillOpacity,
								graphicName: this.defaultGraphicName,
								strokeWidth : this.defaultStrokeWidth,
								strokeColor : this.colors[index],
								strokeOpacity : this.defaultStrokeOpacity,
								cursor : "pointer"
						};
					}
					marker.style = newStyle;
				}
				markerLayer.addFeatures([marker]);
				markerLayer.features[i].attributes.orgid = markerLayer.features[i].id;
			}
		},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Draw"
	
});sMap.moduleConfig.Draw = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		/**
		 * The order in the toolbar compared the other tools
		 */
		toolbarIndex : 1,
		/**
		 * Adds the tool button to menu or as a stand alone button
		 */
		addToToolsMenu : false,
		/**
		 * The number of decimals that the coordinates should be rounded to.
		 * This will differ depending on the coordinate system. E.g. WGS84
		 * will require more decimals than a meter-based projection.
		 */
		decimals: 0,
		/**
		 * Dialog size and position
		 */
		dialogStartPosition : [300, 100],
		width : 240,
		height : 400,
		/**
		 * Witch edit buttons will be available
		 */
		useButtons : {
				"point" : true,
				"line" : true,
				"polygon" : true,
				"move" : false, // sometimes activates by simple click and not only drag, must drag to release feature
				"modify" : false, //not checking for feature.editable
				"delete" : false,  //not checking for feature.editable
				"style" : false  //not functioning for point symbols, select feature and color and use button to change color
			},
		/**
		 * Deactivate drawing tool after finishing sketch?
		 */
		autoDeactivateTool : true,
		/**
		 * Should features opened in link be selected?
		 */
		selectLinkFeatures : true,
		/**
		 * Should features opened in link be editable?
		 */
		editLinkFeatures : false,
		/**
		 * The available colors in the color picker
		 * as hexadecimal values. 
		 */
		colors: [
		         "#ffffff",
		         "#c0c0c0",
		         "#808080",
		         "#000000",
		         "#ff0000",
		         "#800000",
		         "#ffff00",
		         "#808000",
		         "#00ff00",
		         "#008000",
		         "#00ffff",
		         "#008080",
		         "#0000ff",
		         "#000080",
		         "#ff00ff",
		         "#800080",
		         "#ff5b00",
		         "#ff1493",
		         "#4b0082",
		         "#adff2f"
		],
		/**
		 * The available symbols in the symbol picker
		 * Syntax {url:""[, size: , width: , height: , offsety: , offsetx: ]}
		 * If no size is given the defaultSymbolsSize i used
		 */
       symbols : [
				{url:"http://www.smap.se/mapsymbols/camping_mini.png", size : 20},
				{url:"http://www.smap.se/mapsymbols/hotell_mini.png"},
				{url:"http://www.smap.se/mapsymbols/stuga_mini.png", size : 20},
				{url:"http://www.smap.se/mapsymbols/vandrarhem_mini.png", size : 20},
				{url:"http://www.smap.se/mapsymbols/overnatt_mini.png"},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Transport/Buss.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Transport/Busshallplats.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Transport/Flyg.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Transport/Parkering.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Transport/Tag.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Kultur/Konsert.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Kultur/Museum.png", size : 38, width: 33, height : 38, offsety:-33},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Kultur/Teater.png", size : 38, width: 33, height : 38, offsety:-33},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Utbildning/Forskola.png", size : 38, width: 33, height : 38, offsety:-33},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Utbildning/Grundskola.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Utbildning/Gymnasium.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Utbildning/EftergymnUtb.png", size : 37, width: 33, height : 37, offsety:-32}
	           ],
	    /**
	     * Adjust the height of the symbol picker to contain all symbols
	     */
	    symbolPickerHeight : 200,
		/**
		 * Default style values for the vector features
		 */
		defaultSymbolSize : 20,
		defaultFillOpacity : 0.3,
		defaultPointRadius : 6,
		defaultGraphicName : "square",
		defaultStrokeWidth : 4,
		defaultStrokeOpacity : 1,
		/**
		 * Configuration for the draw layer
		 */
		drawLayerConfig : {
			name : "theDrawLayer",
			displayName:"Ritalager",
			layerType: "vector",
			geomType : 'point',
			selectable : true,
			displayInLayerSwitcher : false,
			legend: {
				url: "img/icon_edit.png" // the icon seen in the select preview dialog
			},
			popup : "<span id='draw-text' class='popup-text1'>${info}</span>",
			/**
			 * The styleMap for the editable layer.
			 * 
			 * See: http://docs.openlayers.org/library/feature_styling.html 
			 */
			style : {
				"default" : {
					pointRadius : 6,
					fillColor : "#ff5b00",
					fillOpacity : 0.3,
					graphicName: "square",
					strokeWidth : 4,
					strokeColor : "#ff5b00",
					strokeOpacity : 1,
					cursor : "pointer",
					externalGraphic : "img/geometries/polygon.png"
				},
				"temporary" : {
					pointRadius : 6,
					fillColor : "#ff5b00",
					fillOpacity : 0.3,
					graphicName: "square",
					strokeWidth : 4,
					strokeColor : "#ff5b00",
					strokeOpacity : 1,
					cursor : "pointer"
				},
				"select" : {
					pointRadius : 6,
					fillColor : "#00FFFF",
					fillOpacity : 0.3, // Make it invisible (meaning only original icon is visible)
					strokeOpacity : 1,
					graphicName: "circle",
					strokeWidth : 4,
					strokeColor : "#00FFFF",
					cursor : "pointer"
				}
			}
		},
		/**
		 * Makes the drawlayer to be drawn over the overlays
		 */
		zIndex: 697,
		/**
		 * Path for fetching features from DB
		 */
		fetchFromDbPath : "http://www.smap.se/cgi-bin/shorten/sMap_show.py"
};
sMap.Lang.lang.Draw = {
	"sv-SE" : {
		buttonText : "Rita",
		headerText : "Ritaverktyg",
		helpText : "Välj verktyg nedan och markera i kartan. Avsluta med dubbelklick.",
		moreHelpLinkText : "Hjälp",
		hoverTextPoint : "Punkt",
		hoverTextLine : "Linje",
		hoverTextPolygon : "Yta",
		hoverTextMove : "Flytta",
		hoverTextModify : "Ändra",
		hoverTextDelete : "Radera",
		descrLblText: "Beskriv markering",
		descrEntryText: "Skapa eller markera ett objekt för att ändra texten",
		popupBtnEdit: "Redigera",
		popupBtnDelete : "Radera",
		btnColor: "Välj färg",
		btnSymbol: "Välj symbol",
		lblNoImage : "Ingen bild",
		btnCopylink : "Skapa länk till karta"	
	},
	en : { 
		buttonText : "Draw",
		headerText : "Draw tools",
		helpText : "Select a tool and draw in the map. Finish with doubleclick.",
		moreHelpLinkText : "Help",
		hoverTextPoint : "Point",
		hoverTextLine : "Line",
		hoverTextPolygon : "Area",
		hoverTextMove : "Move",
		hoverTextModify : "Edit",
		hoverTextDelete : "Delete",
		descrLblText: "Describe object",
		descrEntryText: "Create or mark an object to change text",
		popupBtnEdit: "Edit",
		popupBtnDelete : "Delete",
		btnColor: "Color",
		btnSymbol: "Symbol",
		lblNoImage : "No image",
		btnCopylink : "Create link to map"
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Email = OpenLayers.Class(sMap.Module, {
	
	_working: false, // Don't allow sending mail when busy
	
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
			sMap.Module.Email.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Email.prototype.EVENT_TRIGGERS.concat(
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
		
		this.createEpostDialog();
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		
		if(this.ePostDialog && this.ePostDialog.dialog){
			$("#email").validationEngine("hideAll");
			this.ePostDialog.dialog("destroy");
			this.ePostDialog.empty().remove();
			this.ePostDialog = null;
			
		}
		
		// Call the deactivate method of the parent class
		return sMap.Module.prototype.deactivate.apply(this, arguments);
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
		if (this.addToToolsMenu){
			sMap.events.triggerEvent("addtomenu", this, {
				index : this.toolbarIndex,
				label : this.lang.labelBtnEpost,
				iconCSS : "icon-epost", // "ui-icon-mail-closed",
				tagID : "button-epost",
				menuId : this.addToToolsMenu
			});
		}
		else {
			sMap.events.triggerEvent("addtoolbutton", this, {
				index : this.toolbarIndex,
				label : this.lang.labelBtnEpost,
				iconCSS : "icon-epost", // "ui-icon-mail-closed",
				tagID : "button-epost"
			});
		}
	}, 
	
	createEpostDialog : function(){
		var self = this;
		var ePostDialog = $("<div class='ePost-dialogDiv' id='email-dialog' />");
		this.ePostDialog = ePostDialog;
		$("body").append(ePostDialog);
		
		this.createEpostForm();

		var width = this.ePostDialog.outerWidth() < 300 ? 300 : this.ePostDialog.outerWidth();
		this.ePostDialog.outerWidth(width);
		
		sMap.util.createDialog(this.ePostDialog, {
			modal : false,
			draggable : true,
			resizable: false,
			width : 271,
			height: "auto",
			position : "center",
			titleText : this.lang.ePostDialogTitle,
			closeOnEscape: false,
			onOpen: function(events) {
				// Remove the close button
				//$(events.target).parent().find(".ui-dialog-titlebar-close").hide();
			},
			buttons: [
			          {
			        	  text: this.lang.sendButton,
			        	  click: function() {
			        	  	self.validateEmail();
			        	  	var elements = $("#epostform");
			        	  	var id = elements.find("id");
			        	  	var valid = elements.find("valid");
			        	  	var valueMissing = elements.attr("valueMissing");
			        	  	self.sendEmail();
			          	}
			          }
			          
			          ]
		});
		
		this.ePostDialog.dialog("open");
		
		$("input[id='email']").focusout(function(){
			self.validateEmail();
		});
		
		var closeBtn = $(".ui-dialog-titlebar-close");
		
		closeBtn.click(function(){
			self.deactivate();
		});
	},
	
	createEpostForm : function() {
		var epostForm = $("<form id='epostform' method='post' action='submit.action' />");
		this.ePostDialog.append(epostForm);
		
		var ePostFieldSet = $("<fieldset />");
		epostForm.append(ePostFieldSet);
		
//		var labelLegend = $("<legend id='addresses'>"+this.lang.labelAddresses+"</legend>");
//		ePostFieldSet.append(labelLegend);
		
		var labelTo = $("<label for='epostto'>"+this.lang.labelTo+"</label>");
		ePostFieldSet.append(labelTo);
		
		var receiverTo = $("<input type='email' id='epostto' class='validate[required, custom[email]]' name='email'>");
		this.receiverTo  = receiverTo;
		ePostFieldSet.append(receiverTo);
		
//		var msgFieldSet = $("<fieldset />");
//		this.msgFieldSet = msgFieldSet;
//		epostForm.append(msgFieldSet);
		
//		var labelMsgLegend = $("<legend id='addresses'>"+this.lang.labelMsg+"</legend>");
//		msgFieldSet.append(labelMsgLegend);
		
		var labelSubject = $("<label for='epostsubject'>"+this.lang.labelSubject+"</label>");
		ePostFieldSet.append(labelSubject);
		
		var subject = $("<input type='text' id='epostsubject' value='"+this.lang.subjText+"'>");
		ePostFieldSet.append(subject);
		
		var labelMessage = $("<label for='epostmsg'>"+this.lang.labelMsg+"</label>");
		ePostFieldSet.append(labelMessage);
		
		var messageTo = $("<textarea id='epostmsg' class='text ui-widget-content ui-corner-all'></textarea>");
		messageTo.text(sMap.cmd.getParamsAsString(true));
		ePostFieldSet.append(messageTo);
		
//		this.addSendBtn();
	},
	
	destroyEpostDialog : function(){
		if(this.ePostDialog){
			this.ePostDialog.dialog("destroy");
			this.ePostDialog.empty().remove();
			this.ePostDialog = null;
		}
	},
	
	/**
	 * Method: addSendBtn 
	 * @param {void}
	 * @return {void}
	 * This method add the send button to the form.
	 */
	addSendBtn : function(){
		var self = this;
		var btnPanel = $("<div id='epost-btnpanel' align='right' />"),
			sendBtn = $("<button id='epost-sendbtn'><b>"+this.lang.sendButton+"</b></button>");
		btnPanel.append(sendBtn);
		this.ePostDialog.append(btnPanel);
		
		sendBtn.click(function(){
			self.validateEmail();
			var elements = $("#epostform");
			var id = elements.find("id");
			var valid = elements.find("valid");
			var valueMissing = elements.attr("valueMissing");
			self.sendEmail();
			self.ePostDialog.dialog("close");
			self.deactivate();
		});
		sendBtn.button();
	},
	
	validateEmail : function(){
		var valid = $("#epostform").validationEngine();
	},
	
	sendEmail : function(){
		if (this._working) {
			return false;
		}
		
		sMap.cmd.loading(true, {
			text: this.lang.sending
		});
		var d = this.ePostDialog;
		var toEmail = d.find("#epostto").val(),
			subject = d.find("#epostsubject").val(),
			msg = d.find("#epostmsg").val();
		
		this._working = true;
		$.ajax({
			type: "POST",
			url: sMap.config.proxyHost + this.eMailURL,
			context: this,
			data: {
				toEmail: toEmail,
				subject: subject,
				msg: msg
			},
			dataType: "text",
			error: function(jqXHR, textStatus, errorThrown) {
				// this means the module's this
				debug.log(textStatus);
			},
			success: function(data, textStatus, jqXHR) {
				this.ePostDialog.dialog("close");
				this.deactivate();
				alert("Mailet har skickats!");
			},
			error: function(a, text, c) {
				alert("Ett fel har uppstått. Error: "+text);
			},
			complete: function() {
				sMap.cmd.loading(false);
				this._working = false;
			}
		});
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Email"
	
});sMap.moduleConfig.Email = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		eMailURL : "http://kartor.smap.se/cgi-bin/email/smapSendEmail.py?",
		eMailTo : "toEmail=",
		eMailSubject : "subject=",
		eMailMsg : "msg="
};
sMap.Lang.lang.Email = {
	"sv-SE" : {
		labelText : "Tryck här",
		labelBtnEpost : "E-Post",
		ePostDialogTitle : "E-Post",
		labelTo : "Mottagarens e-postadress:",
		labelCC : "Kopia ",
		labelFrom : "Från",
		labelSubject : "Ämne:",
		labelMsg : "Meddelande:",
		sendButton : "Skicka",
		requiredField : "Krävs!",
		labelAddresses : "E-postadresser",
		subjText : "Länk från sMap",
		sending: "Skickar"
	},
	en : { 
		labelText : "Press here",
		labelBtnEpost : "E-Mail",
		ePostDialogTitle : "E-Mail",
		labelTo : "To",
		labelCC : "CC",
		labelFrom : "From",
		labelSubject : "Subject",
		labelMsg : "Message",
		sendButton : "Send",
		requiredField : "Required!",
		labelAddresses : "Email addresses",
		subjText : "Link from sMap",
		sending: "Skickar"
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.ExtractClick = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.ExtractClick.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.ExtractClick.prototype.EVENT_TRIGGERS.concat(
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
		sMap.events.triggerEvent("unselect", this, {});
		sMap.util.showMouseMoveText(this.lang.mouseMoveText);
		sMap.events.triggerEvent("deactivate", this, {
			module: "sMap.Module.Select"
		});
		this.addClickControl();
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		if (this.dialog) {
			this.dialog.dialog("destroy");
			this.dialog.empty().remove();			
		}
		
		// Unbind events
		sMap.util.hideMouseMoveText();
		
		// Activate select again
		sMap.events.triggerEvent("activate", this, {
			module: "sMap.Module.Select"
		});
		
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
		var eventChooser = "addtoolbutton";
		if (this.addToToolsMenu) {
			eventChooser = "addtomenu";
		}
		
		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			label : this.displayName,
			hoverText : this.hoverText,
			iconCSS : "ui-icon-pencil",
			tagID : "btn-extractclick",
			left: this.left,
			right: this.right,
			menuId : this.addToToolsMenu
		});
	},
	
	addClickControl: function() {
		var self = this;
		
		this.handler = new OpenLayers.Handler.Point(this, {
			done: function(geom) {
				sMap.util.hideMouseMoveText();
				// Request the WMS-service
				sMap.cmd.loading(true);
				var r = this.radius || 1;
				var bounds = new OpenLayers.Bounds(geom.x-r, geom.y-r, geom.x+r, geom.y+r);
				var p = this.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(geom.x, geom.y));
				var data = {
					service: "WFS",
					srsName: this.map.projection,
					typeName: this.wfsName,
					version: this.wfsVersion,
					request: "GetFeature",
					format: "text/geojson",
					outputFormat: "json",
					maxFeatures: 1,
					bbox: bounds.toBBOX()
				};
//				var params = "";
//				for (var key in data) {
//					params = params+"&"+key+"="+data[key];
//				}
				
//				params = params.substring(1);
				
				var def = $.Deferred();
				def.done(function(arr) {
					// Extend attributes from features.
					var i, attributes = {};
					for (i=0,len=arr.length; i<len; i++) {
						$.extend(attributes, arr[i].attributes);
					}
					self.onFeaturesFound(attributes);
				});
				def.fail(function(text) {
					alert("Ett fel uppstod i kommunikationen med tjänsten.\nMeddelande: "+text);
				});
				
				var i, ws, requests=0, features=[],
					wfsNames = this.wfsNames;
				for (i=0,len=wfsNames.length; i<len; i++) {
					data.typeName = wfsNames[i];
					requests += 1;
					$.ajax({
						type: "POST",
						url: sMap.config.proxyHost + this.wfsService,
						data: data,
						dataType: "text",
						context: this,
						success: function(text) {
							var format = new OpenLayers.Format.GeoJSON();
							var fs = format.read(text);
							features = features.concat(fs[0]); // Use only the first feature in the array.
							requests -= 1;
							if (requests <= 0) {
								sMap.cmd.loading(false);
								def.resolve(features);
							}
						},
						error: function(text) {
							sMap.cmd.loading(false);
							def.reject(text);
						},
						complete: function() {
						}
					});
				}
			}
			
		}, {persist : true});
		this.handler.activate();
	},
	
	
	/**
	 * Called when features were found.
	 * 
	 * @param attributes {Object}
	 * @returns {void}
	 */
	onFeaturesFound: function(attributes) {
		attributes = attributes || {};
		
		var self = this.map.getControlsByClass("sMap.Module.ExtractClick")[0];
		if (!fs || !fs.length) {
			return;
		}
		if (self.dialog) {
			try {
				self.dialog.dialog("destroy");
				self.dialog = null;
			}
			catch(e) {
				self.dialog = null;
			}
		}
		
		// Extract FNR from the feature and relocate user to a new URL.
		var fnr = attributes.fnr,
			fastighetsNamn = attributes.fastighet,
			easting = attributes.easting || this.clickedLonLat.lon,
			northing = attributes.northing || this.clickedLonLat.lat;
//			gdp = attributes.northing,
//			pdp = attributes.northing;
		
		if (!fnr) {
			alert("Hittade inget fastighetsnummer för platsen");
			return;
		}
		var url = self.redirectUrl.charAt(self.redirectUrl.length-1) !== "?" ? self.redirectUrl+"?" : self.redirectUrl;
		url = url + "fnr=" + fnr;
		if (!self.dialog) {
			var d = $("<div id='extract-click-dialog' />");
			self.dialog = d;
			d.dialog({
				title: "Skapa FNR",
				autoOpen: false,
				width: 315,
				height: "auto",
				modal: false,
				close: function() {
					if ($(this).dialog) {
						$(this).dialog("destroy").empty().remove();
						self.dialog = null;
						self.deactivate();						
					}
				},
				buttons: [{
					"text": self.lang.labelContinue,
					"click": function() {
						var url = "http://sbkspace.malmo.se/nbk/nbkinsert.aspx?mNorthing="+northing+
							"&mEasting="+easting+"&fnr="+fnr + "&gdp="+gdp + "&pdp="+pdp;
						window.open(url, "_blank");
					}
				}]
			});
		}
		var html = '<form><table>' +
			'<tr><td>Fastighet</td><td><input disabled id="ec-fastighet" type="text" value="'+(fastighetsNamn || "-")+'"></input></td></tr>' +
			'<tr><td>Easting</td><td><input disabled id="ec-easting" type="text" value="'+easting+'"></input></td></tr>' +
			'<tr><td>Northing</td><td><input disabled id="ec-northing" type="text" value="'+northing+'"></input></td></tr>' +
			'<tr><td>Gällande detaljplan</td><td><input disabled id="ec-cur_dp_plan" type="text" value="'+gdp+'"></input></td></tr>' +
			'<tr><td>Pågående detaljplan</td><td><input disabled id="ec-dev_dp_plan" type="text" value="'+pdp+'"></input></td></tr>' +
			'</table></form>';
		
		self.dialog.append(html);
		self.dialog.dialog("open");	
	},
	
	CLASS_NAME : "sMap.Module.ExtractClick"
	
});sMap.moduleConfig.ExtractClick = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		wfsService: "http://xyz.malmo.se/geoserver/wfs",
		wfsNames: ["malmows:SMA_SUM_FASTYTA_P", "malmows:SMA_PAGAENDE_PLANER_P", "malmows:SMA_PLANOMR_P"], //"malmows:SMA_TRAKT_P,malmows:SMA_FASTYTA_3D_P,malmows:SMA_SUM_FASTYTA_P",
		wfsVersion: "1.0.0",
		
		radius: 1,
		
		//redirectUrl: "http://sbkspace.malmo.se/website/startwebb/meny_atlas.htm",
		redirectUrl: "http://sbkspace.malmo.se/nbk/nbkinsert.aspx",
		displayName: "", // button label
		
		/**
		 * Config for the WMS-layer to extract data from.
		 */
		extractLayerConfig: null
		
};
sMap.Lang.lang.ExtractClick = {
	"sv-SE" : {
		btnText: "Skapa fastighetspunkt",
		mouseMoveText : "Klicka i kartan för att lägga till en punkt.",
		labelContinue: "Gå vidare"
	},
	en : {
		btnText: "Create building point",
		mouseMoveText : "Click somewhere on the map to add a point.",
		labelContinue: "Continue"
	}
	
};/**
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
				outputformat: "GML2",//t.outputFormat || "GML2",
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
	
});sMap.moduleConfig.FeatureRequester = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false,
		
		maxFeatures : 20
};
sMap.Lang.lang.FeatureRequester = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : {
		labelText : "Press here"
	}
	
};/**
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
		this.listPoints();
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
	
});sMap.moduleConfig.GetFeatureInfo = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		/**
		 * Default properties
		 */
		toolbarIndex : 8,
		addToToolsMenu : true,
		/**
		 * Dialog start position and size
		 */
		dialogStartPosition : [50,200],
		height : 300,
		width: 360,
		/**
		 * automatic removal o fall features in infolayer before new feature is being added?
		 */
		autoclear : true,
		/**
		 * The layer to get information from
		 */
		getInfoLayer:"hojddata",
		/**
		 * Attribute name for the elevation to extract
		 */
		attributeName : "GRAY_INDEX",
		/**
		 * Number of decimals in x,y,elevation
		 */
		decimals : 1,
		/**
		 * Add a button to list all labels with northing, easting, attribute
		 */
		listButton : true,
		/**
		 * Configuration for the info layer
		 */
		infoLayerConfig : {
			name : "theInfoLayer",
			displayName:"Markhöjder",
			layerType: "vector",
			geomType : 'point',
			selectable : true,
			displayInLayerSwitcher : true,
			selectAttributes: ["${info}"],
			popup : "<div class='popup-header1'>Markhöjd</div>" +
				"<span id='info-text' class='popup-text1'>${info} RH2000</span>",
			/**
			 * The styleMap for the info layer.
			 * 
			 * See: http://docs.openlayers.org/library/feature_styling.html 
			 */
			style : {
				"default" : {
					pointRadius : 4,
					fillColor : "#000000",
					fillOpacity : 1,
					graphicName: "cross",
					strokeWidth : 0.3,
					strokeColor : "#000000",
					strokeOpacity : 1,
					cursor : "pointer",
					label:"${info}",
					fontColor:"#000",
					fontSize:"14px",
					fontFamily:"Arial",
					fontWeight:"normal",
					labelAlign:"lb",
					labelXOffset:0,
					labelYOffset:5
				},
				"temporary" : {
					pointRadius : 6,
					fillColor : "#ff5b00",
					fillOpacity : 0.3,
					graphicName: "square",
					strokeWidth : 4,
					strokeColor : "#ff5b00",
					strokeOpacity : 1,
					cursor : "pointer"
				},
				"select" : {
					pointRadius : 6,
					fillColor : "#00FFFF",
					fillOpacity : 0.3, // Make it invisible (meaning only original icon is visible)
					strokeOpacity : 1,
					graphicName: "circle",
					strokeWidth : 4,
					strokeColor : "#00FFFF",
					cursor : "pointer"
				}
			}
		},
		/**
		 * Makes the drawlayer to be drawn over the overlays
		 */
		zIndex: 696
};
sMap.Lang.lang.GetFeatureInfo = {
	"sv-SE" : {
		buttonText : "Markhöjder",
		headerText : "Höjddata RH2000",
		descriptionText : "Med detta verktyget klickar du kartan och får reda på höjdvärdet i RH2000. NNH-data med 2m upplösning.",
		addPointsText : "Behåll gamla punkter",
		clearButtonText : "Radera alla",
		addButtonText : "Lägg till",
		deleteButtonText : "Radera",
		listButtonText : "Lista punkterna"
	},
	en : { 
		buttonText : "Ground elevation",
		headerText : "Elevationdata RH2000",
		descriptionText : "Click in the map and get the elevation in RH2000. NNH-data with 2m resolution",
		addPointsText : "Keep old points",
		clearButtonText : "Clear all",
		addButtonText : "Add point",
		deleteButtonText : "Delete",
		listButtonText : "List points"
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.IntroDialog = OpenLayers.Class(sMap.Module, {
	
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
	
	isIe7: ($.browser.msie && parseInt($.browser.version) < 8),
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.IntroDialog.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.IntroDialog.prototype.EVENT_TRIGGERS.concat(
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
		var dontShow = this.checkboxDontShow && $.cookie('smap_introdialog_dontshowagain') && $.cookie('smap_introdialog_dontshowagain') === "1" ? true : false;
		if (dontShow === true) {
			debug.log("User has cookie smap_introdialog_dontshowagain. Not showing intro dialog");
			return false;
		}
		this._makeDialog();
		this.dialog.dialog("open");
		if (this.checkboxDontShow) {
			this._addCheckbox();
		}
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		this.dialog.dialog("close");
		
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
	drawContent : function() {},
	
	_makeDialog: function() {
		if (!this.dialog) {
			var self = this;
			this.dialog = $("<div id='introdialog-dialog'></div>");
			var options = $.extend(this.defaultDialogOptions, this.dialogOptions);
			
			options.close = function() {
				var isChecked = $("#introdialog-checkboxdiv input").prop("checked");
    	  		if (isChecked === true) {
    	  			// Add cookie
    	  			$.cookie('smap_introdialog_dontshowagain', "1", {expires: 365});
    	  		}
    	  		// destroy dialog and free memory
				$(this).empty().remove();
				delete self.dialog;
				self.dialog = null;
			};
			options.buttons = [
		          {
		        	  text: "Stäng",
		        	  click: function() {
		        	  		$(this).dialog("close");
		          	}
		          }
	          
	          ];
			
			var css = {
				"background": this.dialogBGColor
			};
			this.dialog.dialog(options);
			sMap.util.addDialogMinimizeButton(this.dialog);
			this.dialog.css(css);
			this.dialog.parent().find(".ui-dialog-buttonpane").css(css);
			this.dialog.parent().css(css);
			this.dialog.append(this.contentHtml);
			
		}
	},
	
	_addCheckbox: function() {
		var checkboxDiv = $('<div id="introdialog-checkboxdiv"><input type="checkbox"></input><label>Visa inte information nästa gång</label></div>');
		this.dialog.parent().find(".ui-dialog-buttonset").prepend(checkboxDiv);
		if (!this.isIe7) { 
			checkboxDiv.find("label").click(function() {
				var cb = $(this).prev();
				cb.prop("checked", !cb.prop("checked"));
			});
		}
	},
	
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.IntroDialog"
	
});sMap.moduleConfig.IntroDialog = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : true,
		
		contentHtml: "<div>Override this parameter in the module config</div>",
		
		/**
		 * Create a checkbox that, when checked, will not allow 
		 * the dialog to open again next time.
		 */
		checkboxDontShow: true,
		
		/**
		 * Override some or all the default dialog options.
		 */
		dialogOptions: {},
		
		dialogBGColor: "#efa",
		
		/**
		 * Default options for the dialog.
		 */
		defaultDialogOptions: {
			title: "Välkommen",
			width: "auto",
			minWidth: 370,
			minHeight: 200,
			height: "auto",
			modal: false,
			autoOpen: false,
			position: "center"
		}
};
sMap.Lang.lang.IntroDialog = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : { 
		labelText : "Press here"
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.LinkTo = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.LinkTo.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.LinkTo.prototype.EVENT_TRIGGERS.concat(
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
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
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
	
	showIt: function() {
		var self = this;
		if (!this.dialog) {
			window.open(this.content, "_blank");			
		}
		else {
			if (!this.theDialog) {
				var t = this.dialog instanceof Object ? this.dialog : {},
						d = $("<div />");
				var options = {
						title: "Dialog",
						width: "auto",
						autoOpen: true,
						height: "auto",
						close: function() {
							$(this).dialog("destroy");
							$(this).empty().remove();
							self.theDialog = null;
						}	
				};
				if (this.content) {
					var c = this.content;
					if (typeof c === "string" && (c.substring(0, 7) === "http://" || c.substring(0, 8) === "https://")) {
						// A URL – wrap it into an iframe.
						var iframe = $('<iframe width="700" height="99%" frameborder="0" marginheight="0" marginwidth="0" top="0px" left="0px"></iframe>');
						iframe.attr("src", c);
						d.append(iframe);
					}
					else {
						// HTML
						d.append(c);
					}
				}			
				$.extend(options, t);
				this.theDialog = d;
				d.dialog(options);
//			d.css("padding", "0 0.1em !important");				
			}
			else {
				this.theDialog.dialog("open");
			}
			
		}
	},
	
	hideIt: function() {
		if (this.theDialog) {
			this.theDialog.dialog("close");			
		}
	},
	
    /**
     * Called when all modules are initialized, i.e. after initialize.
     * All initial HTML should be produced from here.
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
			label : this.displayName,
			hoverText : this.hoverText,
			iconCSS : "ui-icon-extlink",
			tagID : sMap.util.createUniqueId("linkto-button-"),
			left: this.left,
			right: this.right,
			menuId : this.addToToolsMenu,
			toggle: false,
			on: this.showIt
//			,off: this.hideIt
		});
	}, 
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.LinkTo"
	
});sMap.moduleConfig.LinkTo = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false
};
sMap.Lang.lang.LinkTo = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : { 
		labelText : "Press here"
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.LayerTree = OpenLayers.Class(sMap.Module, {
	
	// <><><><><><><><> Public properties below (should be set in *_conf.js file) <><><><><><><><><><><><><><>
	width: null, // required!
	showFadedLinks: null,
	showCheckboxAfterTextIcon: null,
	enableTooltip: null,
	folderIcon: null,
	iconSelectableLayer: null,
	iconSelectableLayerActive: null,
	addPrintButton: null,
	printStyleSheetURL: null,
	// <><><><><><><><> Public properties end <><><><><><><><><><><><><><>
	
	
	// <><><><><><><><> Private properties below <><><><><><><><><><><><><><>
	/**
	 * The array with configs to be used for building up the tree.
	 * Each item must be an object containing these keys:
	 * 	- displayName {String}
	 * 	- category {Array} E.g. [1stCat, 2ndCat, 3rdCat] Each category forms a folder.
	 */
	configArr: null,
	/**
	 * Contains all layers added to the tree.
	 */
	layers: [],
	
	/**
	 * Config for categories (folders) in the layer tree.
	 */
	categories: {
		headers: {},
		layers: {}
	},
	// <><><><><><><><> Private properties end <><><><><><><><><><><><><><><><>
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["afterapplyingwebparams", "layerhidden"], //"layervisible"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.LayerTree.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.LayerTree.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
		this.configArr = sMap.config.layers.overlays;
		
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

		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draw the tree based on the config.layers.overlays array.
     * @returns {void}
     */
	drawContent : function() {},
	
	getNameFromSpanID: function(spanID) {
		return spanID.replace("layertree-label-", "");
	},
	
	/**
	 * Event listener. Uncheck a layer's checkbox if it was made
	 * invisible outside of dynatree.
	 * 
	 * @param e {Object}
	 * @returns {void}
	 */
	layerhidden: function(e) {
		if (this.treeDiv) {
			var node = this.treeDiv.dynatree("getTree").getNodeByKey( encodeURIComponent(e.layer.name) );
			if (node) {
				node.select(false);			
			}
		}
	},
	
	/**
	 * Event listener. Check a layer's checkbox if it was made
	 * visible outside of dynatree.
	 * 
	 * @param e {Object}
	 * @returns {void}
	 */
//	layervisible: function(e) {
//		if (this.treeDiv) {
//			var node = this.treeDiv.dynatree("getTree").getNodeByKey( encodeURIComponent(e.layer.name) );
//			if (node) {
//				node.select(true);			
//			}			
//		}
//	},
	
	/**
	 * 
	 * @param nodes
	 * @returns
	 */
	getLayerNamesFromNodes: function(nodes) {
		// Extract layer names from nodes
		var self = this;
		return $.map(nodes, function(node) {
			return self.getLayerNameFromNode.call(self, node);
		});
	},
	
	/**
	 * 
	 * @param node
	 * @returns
	 */
	getLayerNameFromNode: function(node) {
		var span = $(node.span);
		var spanID = span.find(".dynatree-title").attr("id");  // => .dynatree-title
		var name = this.getNameFromSpanID(spanID);
		return name;
		
	},
	
	
	layerConfigs: {},
	
	/**
	 * Cache to speed things up
	 */
	cacheLayerConfigs: function() {
		var i, t,
			arr = sMap.config.layers.overlays || [];
		for (i=0,len=arr.length; i<len; i++) {
			t = arr[i];
			this.layerConfigs[t.name] = t;			
		}
	},
	
	create: function() {
		var self = this,
			sideDiv = null;
		
		this.cacheLayerConfigs();
		
		if (this.right) {
			sMap.events.triggerEvent("addsidedivright", this, {
				width: this.width + 8
			});
			sideDiv = $("#sideDivRight");
		}
		else {
			sMap.events.triggerEvent("addsidedivleft", this, {
				width: this.width + 8
			});
			sideDiv = $("#sideDivLeft");
		}
		this.sideDiv = sideDiv;
		
		this.treeDiv = $("<div id='layertree' />");
		$(this.div).append(this.treeDiv);
		this.treeDiv.css("width", this.width+"px");
		
		/**
		 * Make the layer tree height adaptive to the window size.
		 */
		var onResize = function() {
			var sideDivHeight = $(self.div).parent().innerHeight();
			
			// For some reason the innerHeight does not give enough
			// space for the module's div (this.div). Therefore,
			// I remove another 3 px and it seems not to give scrollbars anymore.
			$(self.div).outerHeight(sideDivHeight-headerHeight-3);
			var marginTop = 50,
				headerHeight = $("#layertree-headerdiv").outerHeight();
			self.treeDiv.outerHeight( sideDivHeight - marginTop );
		};
		$(window).resize(onResize);
		setTimeout('$(window).trigger("resize")', 2000);

		sideDiv.append(this.div);
		$(this.div).addClass("layertree-maindiv");
		
		this.treeDiv.dynatree({
			title: "Geodata",
			debugLevel: 0,
			imagePath: sMap.config.proxyHost,
			autoCollapse: false,
			activeVisible: true,
			noLink: false,
			clickFolderMode: 1,
			fx: { height: "toggle", duration: 200 },
			checkbox: true,
			selectMode: 3, // 3 means checking a folder checks all childrens' checkboxes.
			onDeactivate: function(node) {},
			onActivate: function(node) {},
			/**
			 * This what happens checking/unchecking a checkbox.
			 * @param flag {Boolean} Node became checked or not.
			 * @param node {Object} The node that was checked/unchecked.
			 * @returns {void}
			 */
			onSelect: function(flag, node) {
				
				// Extract the difference between previously selected layers (files)
				// and currently visible layers (files).
				
				var nodes = [];
				function getAllChildrenInNode(node) {
					var children = node.getChildren();
					if (children) {
						// Make an array with the names of layers currently visible.
						$(children).each(function() {
							var theNode = this;
							if (theNode.data.isFolder === true) {
								getAllChildrenInNode(theNode); // Dig deeper into the node
							}
							else {
								// This is a file - push it into the array
								nodes.push(theNode);
							}
						});
					}
					else {
						// This is a file - push it into the array
						nodes.push(node);
					}
				}
				getAllChildrenInNode(node);
				
				// Extract layer names from nodes
				var layerNames = self.getLayerNamesFromNodes.call(self, nodes);
				self.changeVisibility(layerNames, flag);
				
			},
			children: [],
			onClick: function(node, event) {
				var targetIsTitle = $(event.target).hasClass("dynatree-title"),
					targetIsCheckbox = $(event.target).hasClass("dynatree-checkbox");
				var hasCheckbox = $(node.span).find(".dynatree-checkbox").length > 0; //!node.data.isFolder;
				var isChecked = node.isSelected();
				
				if (targetIsTitle) {
					var flag = null;
					//if (node.data.isFolder) {
						// Folder: Check if it's expanded or not. If not -> flag is true, otherwise -> false.
						//flag = node.bExpanded ? false : true;
					//}
					//else {
						// File - toogle checkbox
					
					if (hasCheckbox) {
						flag = !node.isSelected();
						node.select(flag); // select or unselect
					}
					else {
						// For categories without checkbox, a little special solution...
						flag = !node.bExpanded;
					}
					
					var toggle = (!node.bExpanded && flag) || (node.bExpanded && !flag) ? true : false;
					if (toggle) {
						node.toggleExpand();
					}
					
				}
				else if (targetIsCheckbox) {
					if (isChecked && node.bExpanded) {
						// Expand folder
						node.toggleExpand();
					}
					else if (!isChecked && !node.bExpanded) {
						node.toggleExpand();
					}
				}
				
			},
			onDblClick: function(node, event) {
				//node.toggleExpand();
			},
			onCustomRender: function(node) {
				// Add these icons to the node:
				// 	textLink, legend, span (label)
				
				var title = node.data.title,
					name = node.data.key, // name is used as a key for each layer node as a unique identifier. name is always unique - unlike displayName.
					tooltip = node.data.tooltip ? "title='"+node.data.tooltip+"'" : "",
					isFolder = node.data.isFolder;
				var t = self.getLayerConfig(name); //sMap.cmd.getLayerConfigsBy("name", name)[0];
				
				// 1. Create a textLink icon.
				var className = "layertree-texticon";
					textLink = "",
					layersConf = self.categories.layers,
					headersConf = self.categories.headers;
				
				var parent = node.getParent(),
					parentTitle = null;
				if (parent) {
					parentTitle = parent.data.title;
				}
				var configNode = isFolder === true ? self.getHeaderCat(title, parentTitle) : (layersConf && layersConf[title] ? layersConf[title] : {});

				if (!configNode instanceof Object) {
					if (self.showFadedLinks) {
						className += " layertree-notexticon";
						textLink = "<img id='layertree-textlink-"+encodeURIComponent(title)+"' class='"+className+"' src='img/icon_externlank.png'></img>";
					}
				}
				else {
					if (!configNode.url) {
						className += " layertree-notexticon";
					}
					textLink = "<img id='layertree-textlink-"+encodeURIComponent(title)+"' class='"+className+"' src='img/icon_externlank.png'></img>";
				}
				if (self.iconSelectableLayer && t && t.selectable && textLink.length) {
					// Add a little different icon for selectable layers to indicate
					// that they can be selected.
					textLink = $(textLink);
					textLink.attr("src", self.iconSelectableLayer);
					textLink = textLink.appendTo($("<div />")).parent().html();
				}
				// 2. Make a legend with a URL defined in the layer's config property "style.default".
				var legend = "",
					labelID = ""; // ID with html key
				if (t) {
					var legendURL = (t.style && t.style["default"] && t.style["default"].externalGraphic) ? t.style["default"].externalGraphic : null;
					
					var hover = t.legend && t.legend.hover ? t.legend.hover : {};
					legend = "<img class='layertree-legendimg' src='"+legendURL+"' customhoverimg="+(hover.url || "")+"></img>";
					labelID = "id='layertree-label-" + t.name + "'";
				}
				else {
					if (self.folderIcon) {
						// Append a folder icon
						legend = "<img src='"+self.folderIcon+"'></img>";
					}	
				}
				// 3. Make a label
				var className = "dynatree-title";
				if (configNode && configNode.cssClass) {
					className += (" " + configNode.cssClass);
				}
				if (isFolder === true) {
					className += " layertree-folder";
				}
				var tooltipClassName = tooltip.length ? " layertree-tooltip" : ""; // Only tags with a tooltip will get this class.
				var label = "<span "+tooltip+" "+labelID+" class='"+className+tooltipClassName+"'>"+title+"</span>";
				
				var checkbox = "";
				if ( $(node.span).find(".dynatree-checkbox").length == 0 && self.showFadedCheckboxes) {
					// Add a disabled checkbox
					checkbox = "<span class='dynatree-checkbox-faded'></span>";
				}
				return textLink + checkbox + legend + label;
			},
			onExpand: function(flag, node) {
				self.modifyNodes();
			}
		});
		this.addItems();		
		this.treeDiv.height( this.sideDiv.height() - 10 );
		var tree = this.treeDiv.dynatree("getTree");
		tree.renderInvisibleNodes();
		
		// Check all checkboxes that should start checked.
		for (var i=0,len=this.startChecked.length; i<len; i++) {
			tree.selectKey(this.startChecked[i], true);
		}
		this.modifyNodes();
		this.addHeaderDiv();
	},
	
	getLayerConfig: function(name) {
		return this.layerConfigs[name] || null;
	},
	
	/**
	 * Let the core apply webparams before creating the tree.
	 * Thereby any OL-params will result in checked boxes.
	 */
	afterapplyingwebparams: function(e) {
		this.create();
	},
	
	showTooltip: function(e) {
		var title = $(this).attr("title");
		$(this).validationEngine('showPrompt', title, 'load');
	},
	
	hideTooltip: function(e) {
		$(this).validationEngine("hideAll");
	},
	
	/**
	 * 
	 * @param layerNames {Array} Containing the OL-name of each layer that is selected.
	 * @param change {Boolean}
	 * @returns {void}
	 */
	changeVisibility: function(layerNames, change) {
		var name = null;

		for (var i=0,len=layerNames.length; i<len; i++) {
			name = layerNames[i];
			var event = change===true ? "showlayer" : "hidelayer";
			sMap.events.triggerEvent(event, this, {
				layerName: name
			});
		}
	},
	
	addHeaderDiv: function() {
		var div = $("<div id='layertree-headerdiv' />"),
			btnSlide = null;
		div.addClass("ui-widget-header");
		
		if (this.toggleButton) {
			btnSlide = $("<button>"+this.lang.btnSlideLabel+"</button>");   //$("<label>\<\<</label>");
			div.append(btnSlide);
			btnSlide.button(/*{
				icons: {
					primary: "ui-icon-circlesmall-minus"
				}
			}*/);
			var self = this;
			btnSlide.click(function(e) {
				self.toggleSideDiv.call(self, e);
			});
		}
		if (this.turnOffButton) {
			// This button turns off all layers
			btnTurnOff = $("<button>"+this.lang.btnTurnOffLabel+"</button>");   //$("<label>\<\<</label>");
			div.append(btnTurnOff);
			btnTurnOff.button(); //{icons: {primary: "ui-icon-circlesmall-minus"}}
			var self = this;
			btnTurnOff.click(function(e) {
				sMap.cmd.hidealllayers();
			});
		}
		if (this.addPrintLegendButton) {
			if (this.lbButtonToToolsMenu){
				sMap.events.triggerEvent("addtomenu", this, {
					index : this.lbToolbarIndex,
					iconCSS : "ui-icon-print",
					menuId : this.addLegendButtonToToolsMenu,
					label : this.lang.btnPrintLegends,
					tagID : "button-printlegend",
					on: this.printLegends
				});
			}
			else{
				sMap.events.triggerEvent("addtoolbutton", this, {
					index : this.lbToolbarIndex,
					iconCSS : "ui-icon-print",
					label : this.lang.btnPrintLegends,
					tagID : "button-printlegend",
					on: this.printLegends
				});
			}
//			var btnPrintLegends = $("<button id='blixten-btnlayertreeprint'>"+this.lang.btnPrintLegends+"</button>");
//			div.prepend(btnPrintLegends);
//			btnPrintLegends.button();
//			var self = this;
//			btnPrintLegends.click(function() {
//				self.printLegends();
//			});
		}
		// Add a print button
		if (this.addPrintButton) {
			var btnPrint = $("<button id='blixten-btnlayertreeprint'>"+this.lang.btnPrint+"</button>");
			div.prepend(btnPrint);
			btnPrint.button();
			var self = this;
			btnPrint.click(function() {
				self.previewPrintLayers();
			});
		}
		div.css({
			"width": $(this.div).css("width")
		});
		if (this.right) {
			div.addClass("headerdiv-right");
		}
		else {
			div.addClass("headerdiv-left");
		}
		
		$(this.div).prepend(div);
		if (btnSlide && this.startToggled) {
			btnSlide.click();
		}
		
	},
	
	afterVisible: function() {
		if (this.right) {
			
		}
		else {
			$("#mapDiv").css("left", this.sideDiv.outerWidth() + "px");
		}
		$("#mapDiv").width( $("#mapDiv").width() - this.width );			
		
		// Remove the toggle button
		var expandButton = $("#layertree-expandbutton");
		expandButton.empty().remove();				
		$(window).resize();
		$(window).resize(); // Chrome seems to need one more resize...
		this.map.updateSize();
	},
	
	afterHidden: function() {
		var self = this;
		var expandButton = $("<div id='layertree-expandbutton'>+</div>");
		$("#mapDiv").append(expandButton);
		if (this.right) {
			expandButton.addClass("lt-expbutton-right");
		}
		else {
			expandButton.addClass("lt-expbutton-left");
			$("#mapDiv").css("left", "0px");
		}
		$("#mapDiv").width( $("#mapDiv").width() + this.width); // sideDiv.outerWidth()
		
		// Define click for button which can bring the tree back again.
		expandButton.click(function() {
			$(this).hide();
			self.toggleSideDiv();
		});
		$(window).resize(); // Trigger resize so that other elements can adapt.
		$(window).resize();
		this.map.updateSize();
	},
	
	toggleSideDiv: function(e) {
		var sideDiv = this.sideDiv,
			self = this,
			w = this.width;
		if (sideDiv.is(":visible")) {
			// --- Is going to be hidden ---
			if (this.right) {
				sideDiv.animate({"margin-left": w}, this.toggleSpeed, function() {
					$(this).hide();
					self.afterHidden();
				});
			}
			else {
				sideDiv.toggle("slide", function() {
					self.afterHidden();
				});
			}
		}
		else {
			// --- Is going to be shown ---
			if (this.right) {
				//$("#mapDiv").width( $("#mapDiv").width() - this.width)
				sideDiv.show();
				$(window).resize(); // Adapt size to show the sideDiv (which is outside view).
				sideDiv.animate({"margin-left": 0}, this.toggleSpeed, function() {
					self.afterVisible();
				});
			}
			else {
				sideDiv.toggle("slide", function() {
					self.afterVisible();
				});
			}
		}
	},
	
	/**
	 * Called when nodes are rendered. Takes away the
	 * folder and file icons.
	 * @returns {void}
	 */
	modifyNodes: function() {
		var self = this;
		// Remove the folder and file icons.
		$(".dynatree-icon").remove();
		if (!this.showFadedLinks) {
			$(".layertree-notexticon").remove();
		}
		$(".layertree-legendimg").click(function() {
			var name = decodeURIComponent( $(this).siblings(".dynatree-title").attr("id").split("-")[2] );
			var t = self.getLayerConfig(name);
			var node = self.treeDiv.dynatree("getTree").getNodeByKey( encodeURIComponent(t.name) );
			var flag = node.isSelected() ? false : true;
			node.select(flag);
		});
		if (this.showCheckboxAfterTextIcon) {
			$(".layertree-texticon").each(function() {
				var checkbox = $(this).prev(".dynatree-checkbox");
				$(this).insertBefore(checkbox);
			});
		}
		
		// Define click for the "show text"-icon.
		var cbxs = $(".dynatree-checkbox");
		$(".layertree-texticon").not(".layertree-notexticon").unbind("click").click(function(e, ui) {
			self.toggleTextWindow.call(self, e.target);
		});
		cbxs.siblings(".dynatree-title").unbind("mouseover").mouseover(function() {
			$(this).css("text-decoration", "underline");
		}).unbind("mouseout").mouseout(function() {
			$(this).css("text-decoration", "none");
		});
		
		// These are hard-coded stuff for ÖP2012
		$(".mainheader").parent().parent().css({
			"border" : "1px solid #ccc",
			"border-width" : "0px 1px 1px 1px",
			"padding" : "10px"
		});
		$(".mainheader").parent().next().css("margin-top", "5px");
		$(".mainheader:first").parent().parent().css("border-width", "1px 1px 1px 1px");
		
		// These are hard-coded stuff for ÖP2012
		$(".subheader").parent().parent().css({
			"border" : "1px solid #ccc",
			"border-width" : "0px 1px 1px 1px",
			"padding" : "10px"
		});
		$(".subheader").parent().next().css("margin-top", "5px");		
		$(".subheader:first").parent().parent().css("border-width", "1px 1px 1px 1px");
		
		
		// Add hover effect to text-link icons - but not to text links
		// that are faded (those having class "layertree-notexticon") if any.
		$(".layertree-texticon").each(function() {
			if ( !$(this).hasClass("layertree-notexticon") ) {
				$(this).mouseenter(function() {
					$(this).addClass("layertree-texticon-hover");
				});
				$(this).mouseleave(function() {
					$(this).removeClass("layertree-texticon-hover");
				});
			}
		});
		
		if (this.enableTooltip) {
			var edgeOffset = this.right === true ? 42 : 3;
			$(".layertree-tooltip").tipTip({
				defaultPosition: this.right === true ? "left" : "right",
				edgeOffset: edgeOffset
			});
		}
		
		var moveWithCursor = function(e) {
			$('.layertree-legend-hover').css({
				left:  e.pageX+20,
				top:   e.pageY-50,
				display: "block"
			});
		};
		
		var onLegendHover = function() {
			// Only show big image if it has loaded correctly.
			if (this.complete) {
				if (!$.browser.msie && (!this.naturalWidth || this.naturalWidth === 0)) {
					// naturalWidth not supported by IE it seems so only do this check with other browsers.
					return false;
				}
				var img = $(this).clone();
				img.hide();
				img.addClass("layertree-legend-hover");
				var customHoverUrl = img.attr("customhoverimg");
				if (customHoverUrl && customHoverUrl.length > 0) {
					img.attr("src", customHoverUrl);
				}
				
				$("body").append(img);
				$(document).bind("mousemove", moveWithCursor);
			}
		};
		var onLegendHoverOut = function() {
			$(document).unbind("mousemove", moveWithCursor);
			$(".layertree-legend-hover").remove();
		};
		
		// Make the legend image big on hover
		$(".layertree-legendimg").mouseenter(onLegendHover).mouseleave(onLegendHoverOut);
		
		
		this.applyNodesConfig();
		
		
	},
	
	applyNodesConfig: function() {
		// Add a background-color to main headers
		var changeColor = function(t, name) {
			if (t.color) {
				var h = $(".layertree-folder:contains('"+name+"')").parent().parent();
				h.css({
					"background-color": t.color
				});
//				if (t.cssClass)
//					h.addClass(t.cssClass);
				h.find("."+t.cssClass).css("background-color", "none !important");
			}
			if (t.bordercolor){
				var h = $(".layertree-folder:contains('"+name+"')").parent().parent();
				h.css("border-color", t.bordercolor);
			}
		};
		var configHeaders = this.categories.headers,
			name,
			t;
		for (name in configHeaders) {
			t = configHeaders[name];
			changeColor(t, name);
			var subCats = t.subheaders || {};
			for (name in subCats) {
				t = subCats[name];
				changeColor(t, name);
			}
		}
	},
	
	
	
	/**
	 * Returns an appropriate size (adapted to the window)
	 * of the metadata dialogs.
	 * 
	 * @returns {Object}
	 */
	getDialogSize: function() {
		var maxH = 700,
			maxW = 500,
			winH = $(window).height() - 100,
			winW = $(window).width() - 200;
		var h = winH,
			w = winW;
		if (h > maxH) {
			h = maxH;
		}
		if (w > maxW) {
			w = maxW;
		}
		return {
			w: w,
			h: h
		};
		
	},
	
	toggleTextWindow: function(img) {
		img = $(img);
		// Get the label for this node so that we can make out
		// which URL to visit.
		var title = decodeURIComponent( img.attr("id") ).replace("layertree-textlink-", "");
		var configLayers = this.categories.layers || {},
			configHeaders = this.categories.headers || {};
		var configNode = configHeaders[title] || configLayers[title];
		if (!configNode){
			$.each(configHeaders, function(key, value){
				configNode = value.subheaders[title] ? value.subheaders[title] : configNode;
			});
		}
		var content = configNode.url;
		var dialogId = "layertree-textwindow-"+$.base64.encode(title).replace(/=/gi, "").replace(/\+/gi, "").replace(/\-/gi, "");
		var prevDialog = $("#"+dialogId);
		if (prevDialog.length ) {
			prevDialog.dialog("close");
			return;
		}
		
		// Create the textWindow dialog
		var textWindow = $("<div class='layertree-textwindow' id='"+dialogId+"' />");
		
		if (this.iconSelectableLayerActive && this.iconSelectableLayer && img.attr("src") === this.iconSelectableLayer) {
			// Add a little different icon for selectable layers to indicate
			// that they can be selected.
			img.attr("src", this.iconSelectableLayerActive);
		}
		else {
			img.attr("src", "img/icon_externlank_active.png");
		}
		
		var size = this.getDialogSize();
		
		
		
		var nrs = $(".layertree-textwindow").length;
		var center = parseInt($(window).width() / 2 - size.w/2);
		var dialogTitle = this.dialogTitlePrefix ? this.lang.dialogTitlePrefix + title : title;
		var self = this;
		textWindow.dialog({
			title: dialogTitle,
			position: [center+nrs*(-40), 50+nrs*30],
			width: size.w,
			height: size.h,
			modal: false,
			autoOpen: false,
			close: function() {
				$(this).dialog("destroy");
				$(this).empty().remove();
				if (self.iconSelectableLayerActive && self.iconSelectableLayer && img.attr("src") === self.iconSelectableLayerActive) {
					// Add a little different icon for selectable layers to indicate
					// that they can be selected.
					img.attr("src", self.iconSelectableLayer);
				}
				else {
					img.attr("src", "img/icon_externlank.png");
				}
			},
			resizeStart: function() {
				$(this).children().hide();
				$(this).parent().css({
					"filter": "alpha(opacity=70)",
			    	"opacity": "0.7"
				});
			},
			resizeStop: function(e, ui) {
				$(this).parent().css({
					"filter": "alpha(opacity=100)",
			    	"opacity": "1"
				});
				$(this).children().show();
//				var iframe = $(this).find("iframe");
//				iframe.width( $(this).width() - 10);
//				iframe.height( $(this).height() - 10);
			}
		});
		sMap.util.addDialogMinimizeButton(textWindow);
		
		if (this.addPrintLegendButton) {
			// Add a print button in the header
			var btnMiniPrint = $('<button class="ltree-btn-miniprint">Skriv ut</button>');
			textWindow.prev().find(".ui-dialog-title").after(btnMiniPrint);
			// Some cosmetic adjustments.
			textWindow.prev().css({
				"white-space": "nowrap",
				"padding": "0 1em"
			}).find(".ui-dialog-title").css({
				"margin-top": "7px"
			});
		}
		if (this.addPrintLegendButton) {
			btnMiniPrint.button({
				icons: {
					primary: "ui-icon-print"
				}
			});
			btnMiniPrint.click(function() {
				var iframe = $(this).parent().next().find("iframe");
				var src = iframe.attr("src");
				this.miniPrintWin = window.open('', '', 'left=400,top=200,width=600,height=600');
				var self = this;
				var div = $("<div />");
				div.load(config.proxyHost + src, function() {
					if ($.browser.msie && parseInt($.browser.version) <= 9) {
						self.miniPrintWin.document.write( $(this).html() );
					}
					else {
						$(this).appendTo( $(self.miniPrintWin.document.body) );
						self.miniPrintWin.print();
						self.miniPrintWin.close();					
					}
				});
			});
		}
		textWindow.hide(); // Avoid interference with iframe scrolling
		textWindow.empty();
		if (content.substring(0, 4) == "http") {
			// We are dealing with a URL.
			
			var iFrame = $('<iframe width="470" height="290" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0"></iframe>'); // scrolling='no'
			iFrame.attr("src", content);
			textWindow.append(iFrame);
			if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
//				iFrame.css({
//					"overflow": "auto",
//					"-webkit-overflow-scrolling": "touch" 
//				}).addClass("overthrow");
				textWindow.css({
					"overflow": "auto",
					"-webkit-overflow-scrolling": "touch" 
				}).addClass("overthrow");
				iFrame.attr("height", "5000");
				
			}
		}
		else {
			textWindow.html(content);
		}
		textWindow.dialog("open");
	},
	
	addItems: function() {
		var configArr = this.configArr;
		
		var itemsObj = {children: []},
			t = null;
		
		this.startChecked = [];
		
		for (var i=0,len=configArr.length; i<len; i++) {
			t = configArr[i];
			if (!t.displayInLayerSwitcher) {
				continue;
			}
			
			var parent = itemsObj;
			
			var cats = t.category || [];
			for (var j=0,jlen=cats.length; j<jlen; j++) {
				var catName = cats[j];
				var _parent = this.getFolder(parent.children, catName);
				if (_parent) {
					// Use the existing folder
					parent = _parent;
					continue;
				}
				else {
					var ft = this.getHeaderCat(catName, parent.title || null);
					// Create a new folder
					var nodeFolder = {
							title: catName,
							isFolder: true,
							children: [],
							expand: ft.expand || false,
							color: ft.color || null,
							hideCheckbox: ft.hideCheckbox || false,
							tooltip: ft.tooltip || null,
							icon: null //"http://xsbk0236.sbkmalmo.local:8080/sMap/img/table.gif"
					};
					parent.children.push(nodeFolder); // Append new folder as a subfolder of parent.
					parent = nodeFolder; // Let the new nodeFolder be the parent for subfolders or files
				}
			}
			var nodeFile = {
					title: t.displayName,
					key: encodeURIComponent( t.name ),
					hideCheckbox: t.hideCheckbox || false,
					tooltip: t.tooltip || null
					//icon: (t.style && t.style["default"] && t.style["default"].externalGraphic) ? encodeURIComponent( t.style["default"].externalGraphic ) : null,
			};
			
			if (t && t.startVisible) {
				// Append layers which should start checked
				this.startChecked.push(t.name);
			}
			// If a dialogContent property is defined for this layer - store it
			// in the url dict.
			if (!this.categories.layers) {
				this.categories.layers = {};
			}
			if (t.dialogContent) {
				this.categories.layers[t.displayName] = this.categories.layers[t.displayName] || {};
				$.extend(this.categories.layers[t.displayName], {
					url: t.dialogContent,
					hideCheckbox: t.hideCheckbox || false
				});
			}
			
			//this.layers.push(t.name); // Store all names for layers added to the tree.
			
			parent.children.push(nodeFile);
		}
		
		var nodeRoot = this.treeDiv.dynatree("getRoot");
		nodeRoot.addChild(itemsObj.children);
	},
	/**
	 * Help function to addItems
	 * @param arr {Array}
	 * @param catName {String}
	 * @returns {Object || null}
	 */
	getFolder: function(arr, catName) {
		
		for (var i=0,len=arr.length; i<len; i++) {
			var title = arr[i].title;
			if (title == catName) {
				return arr[i];
			}
		}
		return null;
	},
	
	getHeaderCat: function(catName, parentCatName) {
		parentCatName = parentCatName || catName;
		
		var t = null,
			name,
			obj = {},
			theCats = this.categories.headers;
		
		var getTheCat = function(cats) {
			obj = {};
			for (name in cats) {
				obj = cats[name];
				if (name === parentCatName) {
					if (catName === parentCatName) {
						// There is no parent, so return this guy
						return obj;
					}
					else if (obj.subheaders && obj.subheaders[catName] instanceof Object) {
						// Return the parent's child
						obj = obj.subheaders[catName];
						return obj;
					}
				}
			}
			// Dig deeper, into the subcategories
			var result;
			for (name in cats) {
				obj = cats[name];
				var sh = obj instanceof Object ? obj.subheaders : null;
				if (!sh || $.isEmptyObject(sh)) {
					continue;
				}
				result = getTheCat(sh);
				if (result) {
					return result;
				}
				else {
					continue;
				}
			}
			return null; // If nothing found anywhere
			
		};
			
		return getTheCat(theCats) || {};
	},
	
	printLegends: function() {
		var self = this;
		var t,
			arr = sMap.config.layers.overlays,
			src,
			row,
			imagesLoading = 0,
			allRowsAdded = false,
			html = $("<div />"),
			table = $("<table />"),
			isVisible,
			style = '<style type="text/css" media="print">#btn-printwin {display:none;}</style>',
			onLoad = function() {
				imagesLoading -= 1;
				if (allRowsAdded && imagesLoading <= 0 && self.printLegendWin) {
					//self.printLegendWin.focus();
//					self.printLegendWin.print();
//					self.printLegendWin.close();
				}
			};
		html.append(style);
		for (var i=0,len=arr.length; i<len; i++) {
			t = arr[i];
			
			isVisible = this.map.getLayersByName(t.name).length ? this.map.getLayersByName(t.name)[0].getVisibility() : false; 
			if (!isVisible) {
				continue;
			}
			
			src = t.style && t.style["default"].externalGraphic ? t.style["default"].externalGraphic : null;		
			if (t.legend && t.legend.hover && t.legend.hover.url) {
				// This one everrides default external graphic
				src = t.legend.hover.url;
			}
			row = $("<tr><td></td><td>"+t.displayName+"</td></tr>");
			
			if (src) {
				var img = "<img src='"+src+"'></img>";
				row.find("td:first").append(img);
				imagesLoading += 1;
			}
			
			table.append(row);
			row.find("img").css({
				"height": "45px"
			}).on("load", onLoad);
			row.css({
				"font-size": "14px",
				"font-weight": "bold"
			});
			row.find("td").css({
				"border": "1px solid #aaa",
				"padding": "2px 10px"
			});
		}
		if (table.children().length === 0) {
			alert("Inga lager tända");
			return false;
		}
		html.append("<h1>"+this.lang.legendHeader + (sMap.config.mapName ? sMap.config.mapName[sMap.langCode] : "...mapName missing in config") + "</h1>");
		html.append(table);
//		dialog.append(table);
		
		allRowsAdded = true;
		
		if (this.printLegendWin) {
		    this.printLegendWin.focus();
		    this.printLegendWin.close();
		    this.printLegendWin = null;
		}
        this.printLegendWin = window.open('', '', 'left=400,top=200,width=600,height=400');
        this.winIsOpen = true;
        /*this.printLegendWin.onunload = function() {
            self.printLegendWin = null;
            self.winIsOpen = false;
        };*/

        var btnPrint = '<button id="btn-printwin" media="screen" style="padding:10px 20px;margin:20px;cursor:pointer;" '+
        '>Skriv ut</button>';  // onclick="print();return false;"
        
        btnPrint.attr("onclick", "print();");
        
        html.prepend(btnPrint);
		
        this.printLegendWin.document.write(html.html());
		
//		$(this.printLegendWin.document).find("#btn-printwin").click(function() {
//		    self.printLegendWin.print();
//		    //return false;
//		});
		
		// If it takes more than 3 sec to load images (maybe one or more images have a broken source) – print it anyways.
		/*setTimeout(function() {
		    if (self.printLegendWin) {
		        imagesLoading = 0;
			    onLoad();
		    }
		}, 3000);*/
		
	},
	
	/**
	 * Create a print preview dialog with the checked layers
	 * in a list and a checkbox.
	 */
	previewPrintLayers: function() {
		var self = this;
		// Get checked layers containing a dialogContent link.
		var tree = this.treeDiv.dynatree("getTree");
		var nodes = tree.getSelectedNodes(),
			theNodes = [];
		for (var i=0,len=nodes.length; i<len; i++) {
			var n = nodes[i];
			var span = $(n.span);
			if (span.find(".layertree-notexticon").length === 0) {
				// This node has a link – add it to the array.
				var spanID = span.find(".dynatree-title").attr("id");
				var name = self.getNameFromSpanID(spanID);
				var t = self.getLayerConfig(name);
				theNodes.push(t);
			}
		}
		
		// Now, we have all checked nodes' configuration object. Use
		// this to create a new dialog containing these layers.
		if (!this.printDialog) {
			this.printDialog = $("<div id='layertree-dialogprintpreview'><div id='layertree-printpreviewinfo'>"+this.lang.printPreviewInfo+"</div></div>");
			this.printDialog.dialog({
				title: this.lang.btnPrint,
				position: "center",
				width: 275,
				autoOpen: false,
				height: 400,
				resizable: false,
				modal: true,
				close: function() {
					$(this).find("fieldset").find("legend").siblings().remove();
				},
				buttons: [
				          {
				        	text: this.lang.btnPrint,
				        	click: function() {
				        		self.printLayers();
				        		$(this).dialog("close");
				        	}
				          }
				]
			});
			var layersFieldSet = $("<fieldset id='layertree-printfieldset'><legend>"+this.lang.printLegendText+"</legend></fieldset>");
			this.printDialog.append(layersFieldSet);
		}
		if (this.printDialog.dialog("isOpen")) {
			this.printDialog.dialog("close"); // Will empty the dialog
		}
		this.printDialog.dialog("open");
		
		// Add the layers to the dialog
		var t = null,
			fieldSet = this.printDialog.find("fieldset");
		for (var i=0,len=theNodes.length; i<len; i++) {
			t = theNodes[i];
			var row = $("<div class='layertree-printrow' />"),
				checkbox = $("<input type='checkbox' checked='checked' />"),
				label = $("<label>"+t.displayName+"</label>");
			fieldSet.append(row);
			row.append(checkbox).append(label);
			label.click(function() {
				var cb = $(this).prev();
				cb.prop("checked", !cb.prop("checked"));
			});
			row.data("url", t.dialogContent);
		}
	},
	
	printLayers: function() {
		var self = this;
		sMap.cmd.loading(true, {
			text: this.lang.textLoadingPrint
		});
		var rows = $(".layertree-printrow:has(input:checked)");
		var layersToLoad = rows.length;
		var container = $("<div />"); // container for all html docs to be printed.
		var proxy = sMap.config.proxyHost || "";
		rows.each(function() {
			var url = $(this).data("url");
			var site = $("<div />");
			container.append(site);
			site.css("border", "1px solid #ccc");
			site.load(proxy + url, function(response, status, xhr) {
				layersToLoad -= 1;
				if (layersToLoad <= 0) {
					// All layers loaded
					self.onPrintLoadDone(container);
				}
			});
		});
	},
	
	onPrintLoadDone: function(container) {
//		var self = this;
		sMap.cmd.loading(false);
		var win = window.open("", "layertreeprintwin", 'height=500,width=400,location=no,menubar=no,status=no,toolbar=no');
		win.document.write('<link rel="stylesheet" type="text/css" href="'+this.printStyleSheetURL+'"></link>');
		win.document.write(container.html());
		sMap.db.layertreeprintwin = win;
		setTimeout("var win = sMap.db.layertreeprintwin;win.focus();win.print();win.close();sMap.db.layertreeprintwin=null;win=null;", 100);
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.LayerTree"
	
});sMap.moduleConfig.LayerTree = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : true,
		
		/**
		 * The width of the side-div holding the tree.
		 */
		width: 360,
		
		
		/**
		 * If true: Add sideDiv to the right side,
		 * and if false: left side.
		 */
		right: true,
		
		/**
		 * Add a toggle button to the header div of the tree.
		 */
		toggleButton: true,
		
		/**
		 * The toggle speed when pressing the toggle button (in milliseconds or in words like "slow").
		 */
		toggleSpeed: 350,
		
		/**
		 * Make the tree start hidden.
		 */
		startToggled: false,
		
		
		/**
		 * This button turns off all the layers' visibility
		 */
		turnOffButton: true,
		
		
		/**
		 * If URLs below are specified, these icons will be used instead of
		 * the textURL icon. However, only so for selectable layers. Non-selectable
		 * layers will still have the default icon and not use the icons below.
		 */
		iconSelectableLayer: "img/icon_externlank_info.png",
		iconSelectableLayerActive: "img/icon_externlank_active_info.png",
		
		/**
		 * Show a faded icon for the text-link if there is no
		 * dialogContent property specified. If false, no icon will
		 * be shown at all.
		 */
		showFadedLinks: false,
		showFadedCheckboxes: false,
		showCheckboxAfterTextIcon: true,
		enableTooltip: true,
		/**
		 * Use this icon for all folders. Set to null if you don't want any icon.
		 */
		folderIcon: "img/folder_page.gif",
		
		/**
		 * Option to add some text in the dialog title for layers. The text is specified in the lang file.
		 */
		dialogTitlePrefix : false,
		
		/**
		 * Add a print button to the layer tree's header div.
		 * When clicking on it, the checked layers' HTML document
		 * (if any) will be available to print in the print preview
		 * dialog.
		 */
		addPrintButton: false,
		printStyleSheetURL: "http://sbkspace.malmo.se/op/CSS/StyleSheet.css",
		
		/**
		 * Print legend button settings.
		 */
		addPrintLegendButton: true,
		lbButtonToToolsMenu: true,
		lbToolbarIndex: 1
		
};
sMap.Lang.lang.LayerTree = {
	"sv-SE" : {
		header : "",
		expandButton: "Datalager",
		btnSlideLabel: "Göm",
		btnTurnOffLabel: "Släck alla lager",
		btnPrint: "Skriv ut",
		btnPrintLegends: "Skriv ut teckenförklaring",
		printLegendText: "Lager att skriva ut",
		printPreviewInfo: 'Kryssa i de lager som du vill skriva ut och tryck sedan på "Skriv ut".',
		textLoadingPrint: "Förbereder utskrift...",
		dialogTitlePrefix : "Metadata för ",
		legendHeader: "Teckenförklaring för "
	},
	en : {
		header : "",
		expandButton: "Layers",
		btnSlideLabel: "Hide",
		btnTurnOffLabel: "Hide all layers",
		btnPrint: "Print",
		btnPrintLegends: "Print legend",
		printLegendText: "Layers to print",
		printPreviewInfo: 'Check the layers you want to print and then press "Print".',
		textLoadingPrint: "Preparing for printing...",
		dialogTitlePrefix : "Metadata for ",
		legendHeader: "Legend for "
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Legend = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.Legend.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Legend.prototype.EVENT_TRIGGERS.concat(
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
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
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
		this._container = $('<div class="legend-container"><span class="close">&times;</span><h1>Teckenförklaring</h1></div>');
		this._container.on("click", function() {
			return false;
		});
		this._container.find(".close").on("click", function() {
			$(this).parent().hide();
			return false;
		});
		this._container.hide();
		$("#mapDiv").append(this._container);
		this._bindEvents();
	},
	
	_addLegendPic: function(title, src) {
		var imgContainer = $('<div><label>'+title+'</label><img src="'+src+'"></img></div>')
		this._container.find("h1").after(imgContainer);
	},
	
	_removeLegendPic: function(src) {
		this._container.find('img[src="'+src+'"]').parent().remove();
	},
	
	
	_bindEvents: function() {
		
		var onChange = function(e) {
			var layer = e.layer;
			if (layer && layer.name) {
				var t = sMap.cmd.getLayerConfig( layer.name );
				if (!t.legend || !t.legend.hover || !t.legend.hover.url) {
					return;
				}
				var src = t.legend.hover.url;
				if (layer.getVisibility() === true) {
					debug.log("show layer");
					this._addLegendPic( t.displayName, src );
				}
				else {
					debug.log("hide layer");
					this._removeLegendPic( src );
				}
			}
			if (this._container.find("img").length === 0) {
				this._container.hide();
			}
			else {
				this._container.show();
			}
		};
		
		this.map.events.register("addlayer", this, onChange);
		this.map.events.register("changelayer", this, onChange);
		this.map.events.register("removelayer", this, onChange);
		
		
		
		
		
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Legend"
	
});sMap.moduleConfig.Legend = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false
};
sMap.Lang.lang.Legend = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : { 
		labelText : "Press here"
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Loading = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["loading", "loadingdone", "layersstartedloading", "layersloaded"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	/**
	 * Show background when loading. Can be altered when triggering
	 * event "loading" using parameter bg.
	 */
	showBackground: false,
	
	layersstartedloading: function(e) {
		// Don't show "loading layers" if another message is already present.
		if (this.container.is(":visible") !== true) {
			this.loading({
				text: this.lang.loadingLayers,
				many: false,
				bg: false
			});			
		}
	},
	
	layersloaded: function() {
		this.loadingdone({
			text: this.lang.loadingLayers
		});
	},
	
	/**
	 * Keeps track of how many processes are going on.
	 */
	//queue: 0,
	
	animSrc: "img/ajax-loader-circle.gif",
	showBackground: null,
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Loading.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Loading.prototype.EVENT_TRIGGERS.concat(
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
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
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

		var container = $("<div id='loading-spinner-div' />");
		this.container = container;
		
		if (this.showBackground) {
			var background = $("<div id='loading-background' />");
			$("#mapDiv").append(background);
			background.hide();
			this.background = background;
		}
		
		// Append spinner image
		var spinner = $("<img src='"+this.animSrc+"'></img>");
		container.append(spinner);

		
		var textContainer = $("<div id='loading-spinner-text' />");
		this.textContainer = textContainer;
		container.append( textContainer );
		
		$("#mapDiv").append(container);
		
		//spinner.position({ at: 'center', of: '#loading-spinner-div' });
		//textContainer.position({ at: 'bottom', of: '#loading-spinner-div' });
		
		$("#loading-spinner-div").position({ my: 'center', at: 'center', of: '#mapDiv' });
		// Bind events
		$(window).resize(function() {
			$("#loading-spinner-div").position({ my: 'center', at: 'center', of: '#mapDiv' });
		});
		container.hide();
		
		// for debugging
		//sMap.events.triggerEvent("loading", this, {
		//	text: "Hej Hej",
		//	many: true
		//});
	},
	
	show: function() {
		if (this.background) {
			if (this.showBackground === true) {
				this.background.show();				
			}
			else {
				this.background.hide();
			}
		}
		this.container.show();
		$("#loading-spinner-div").position({ my: 'center', at: 'center', of: '#mapDiv' });
	},
	
	hide: function() {
		if (this.background)
			this.background.hide();
		this.container.hide();
	},
	
	
	
	// -----------  EVENTS ------------------------------------------------------
	/**
	 * Adds to the loading queue.
	 * @param e {Object}
	 * 	- text {String} Text to visible to user. Is also used as an "ID"
	 * 			when being removed.
	 * 	- many {Boolean} If true, the same text can be added several times into the loading GUI.
	 */
	loading: function(e) {
		this.showBackground = e.bg || false;
		this.addText(e.text, e.many);
		this.checkStatus();
	},
	/**
	 * Substracts from the loading queue.
	 * @param e {Object}
	 * 	- text {String} (Optional) Same text as when calling "loading".
	 * 	//- all {Boolean} Remove all occurrences of this text.
	 */
	loadingdone: function(e) {
		this.removeText(e.text || null);
		this.checkStatus();
	},
	// ------------- EVENTS END ----------------------------------------------------
	
	/**
	 * Add a tag with given text.
	 * @param text {String}
	 * @param many {Boolean} Allow many loading texts at the same time.
	 */
	addText: function(text, many) {
		var matches = this.textContainer.children(":contains('"+text+"')");
		var textTag = $("<div class='loading-texttag'>"+text+"</div>");
		if (matches.length == 0 || many) {
			// Append only if many is true or no existing matches.
			this.textContainer.append(textTag);
		}
	},
	
	/**
	 * Remove the tag with given text.
	 * @param text {String}
	 */
	removeText: function(text) {
		if (text) {
			var matches = this.textContainer.children(":contains('"+text+"')");
			matches.first().remove();
			
		}
		else {
			this.textContainer.empty();
		}
	},
	
	/**
	 * Check the status of the loader. If no processes going on,
	 * close the dialog. Otherwise open.
	 */
	checkStatus: function() {
		var len = this.textContainer.children().length;
		if (len > 0) {
			this.show();
		}
		else {
			this.hide();
		}
	},
	
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Loading"
	
});sMap.moduleConfig.Loading = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		onlyIcon: true,
		
		showBackground: false
};
sMap.Lang.lang.Loading = {
	"sv-SE" : {
		labelText : "Tryck här",
		loadingLayers: "Laddar lager..."
	},
	en : { 
		labelText : "Press here",
		loadingLayers: "Loading layers..."
	}
	
};/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.MeasureDialog = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["beforeprint"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	/**
	 * Modules that will be deactivated when this activates
	 */
	DEACTIVATE_MODULES: [
	                     "sMap.Module.Blixten"
	                     ],
	
	dialogStartPosition : null,
	
	controls : {},
	
	buttons : {},
	
	panel : null,
	
	/**
	 * Deactivate the measure dialog before printing since the layer cannot be printed.
	 * @returns {void}
	 */
	beforeprint: function() {
		this.deactivate();
	},
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.MeasureDialog.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.MeasureDialog.prototype.EVENT_TRIGGERS.concat(
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
		for (var i=0,len=this.DEACTIVATE_MODULES.length; i<len; i++) {
			var mods = this.map.getControlsByClass(this.DEACTIVATE_MODULES[i]);
			if (mods.length) {
				mods[0].deactivate();
			}
		}
		sMap.events.triggerEvent("deactivate", this, {
			module: "sMap.Module.Select"
		});
		
		// Make the panel
		this.panel = this.makeControls();
		this.dialogDiv = this.makeDialogContent();
		this.dialogDiv = this.makeDialog(this.dialogDiv);
		this.addButtonHoverEffect();
		
		if (this.showMeasureAtCursor===true) {
			this.bindMouseMove.call(this);
		}
		
		this.eggifyIt();
		this.dialogDiv.dialog("open");
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (!this.active) {
			return false;
		}
		if (this.dialogDiv && this.dialogDiv.dialog("isOpen") === true) {
			return this.dialogDiv.dialog("close");
		}
		this.unEggifyIt();
		this.deactivateButtonsAndControls();
		$(this.dialogDiv).empty().remove();
		$("#measure-cursorDiv").hide();
		this.unBindMouseMove.call(this);
		
		sMap.events.triggerEvent("activate", this, {
			module: "sMap.Module.Select"
		});
		
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
		if (this.addToToolsMenu){
			sMap.events.triggerEvent("addtomenu", this, {
				index : this.toolbarIndex,
				iconCSS : "btnmeasure",
				menuId : this.addToToolsMenu,
				label : this.lang.buttonText,
				tagID : "button-measure"
			});
		}
		else{
			sMap.events.triggerEvent("addtoolbutton", this, {
				index : this.toolbarIndex,
				iconCSS : "btnmeasure",
				label : this.lang.buttonText,
				tagID : "button-measure"
			});
		}
	},

	/**
	 * 
	 */
	bindMouseMove : function() {
		
		this.cursorDiv = $("<div id='measure-cursorDiv' />");
		$("#smapDiv").append(this.cursorDiv);
		this.cursorDiv.hide();
		
		var p = sMap.util.getMapPosition();
		this.mapX = p.x;
		this.mapY = p.y;
		
		var self = this;
		this.onMouseMove = function(e) {
			self.cursorDiv.css({
				"left" : e.pageX - self.mapX + 14 + "px",
				"top" : e.pageY - self.mapY + 20 + "px"
			});
		};
		$(this.map.viewPortDiv).mousemove(this.onMouseMove);
	},
	
	unBindMouseMove : function() {
		$(this.map.viewPortDiv).unbind("mousemove", this.onMouseMove);
	},
	
	
	
	
	/**
	 * Toggle the dialog.
	 */
	toggleDialog : function() {
		if (this.active!==true) {
			this.activate();
		}
		var isOpen = this.dialogDiv.dialog("isOpen");
		if (isOpen) {
			this.dialogDiv.dialog("close");
		}
		else {
			this.dialogDiv.dialog("open");
		}
		
		
	},
	
	deactivateButtonsAndControls: function(except) {
		var self = this,
			buttons = null;
		if (except) {
			buttons = except.siblings();
		}
		else {
			buttons = this.panel.children();
		}
		buttons.each(function() {
			$(this).data("active", false);
			var type = $(this).data("type");
			self.controls[type].deactivate();
			self.renderButton($(this).find("img"), false);
		});
	},
	
	
	/**
	 * Deactivate the result div and cursor div
	 */
	deactivateResultDiv: function() {
		this.resultDiv.html("");
		this.resultDiv.css(this.resultDivUnactiveCSS);
		this.toggleCursorDiv("hide");
	},
//	/**
//	 * @param buttonName {String}
//	 *     The button name: "point", "line" or "polygon"
//	 */
//	toggleControl : function(buttonName) {
//		var self = this;
//
//		var ctrl = self.controls[buttonName];
//		
//		// Toggle control
//		if (ctrl.active===true) {
//			// Deactivate button and its control			
//			self.coordinates = null;
//			this.deactivateControls();
//		}
//		else {
//			// Activate button and its control
//			self.deactivateControls();
//			ctrl.activate();
//			self.resultDiv.css(self.resultDivActiveCSS);
//			self.buttons[buttonName].activate();
//			var geometryType = self.getControlType();
//			self.displayMeasure(geometryType, "m", "0");
//		}
//	},
	/**
	 * Get the active tool's type - "point" (0), "line" (1) or "polygon" (2).
	 */
	getControlType : function() {
		var dict = {
				point : 0,
				path : 1,
				polygon : 2
		};
		var toolsType = null;
		for (var cName in this.controls) {
			var c = this.controls[cName];
			if (c.active===true) {
				var className = c.handler.CLASS_NAME.split(".")[2].toLowerCase();
				toolsType = dict[className];
				break;
			}
		}
		return toolsType;
	},	
	
	reportMeasure : function(e) {
		var order = this.getControlType(),
			geometry = e.geometry;
		
		var	measure = e.measure, // distance in map distance units
			units = e.units; // NOTE! OpenLayers changes unit depending on distance.
		
		if (order==0) {
			// Store the current measured coordinates
			this.coordinates = {
					x : geometry.x,
					y : geometry.y
			};
			
			var p = sMap.util.projectPoint(config.projection, this.currentProjection, geometry.x, geometry.y);
			var dec = this.projections[this.currentProjection].decimals;
			this.displayCoordinates(p.x.toFixed(dec), p.y.toFixed(dec));
			
			return;
		}
		else if (units=="m") {
			measure = measure.toFixed(this.decimals_m);
		}
		else {
			measure = measure.toFixed(this.decimals_km);
		}
		
		if (e.type==="measure") {
			// Get the position of the resultDiv
			var p = $("#measure-resultDiv input").offset();
			this.cursorDiv.css("z-index", "5000");
//			this.cursorDiv.appendTo("body");
			this.cursorDiv.animate({
				"left": p.left+"px",
				"top": (p.top)+"px"
			}, 500, function() {
				$(this).fadeOut(300, function() {
					$(this).css("z-index", "1000");
				});
			});
//			this.toggleCursorDiv("hide");
		}
		else {
			this.toggleCursorDiv("show");
		}
		
		this.displayMeasure(order, units, measure);

		this.resultDiv.css(this.resultDivActiveCSS);
		
	},
	
	/**
	 * Toggle cursorDiv. It first checks if the cursor div
	 * option is true.
	 */
	toggleCursorDiv : function(change) {
		if (this.showMeasureAtCursor===true) {
			switch (change) {
			case("show"):
				this.cursorDiv.show();
				break;
			case("hide"):
				this.cursorDiv.hide();
				break;
			default:
				break;
			}
		}	
	},
	
	
	/**
	 * Create the HTML from the measurement of line or polygon.
	 * @param order {Integer} 1 = line, 2 = polygon.
	 * @param units {String} E.g. "m"
	 * @param measure {String} Measurement results as string
	 */
	displayMeasure : function(order, units, measure) {
		
		var html = $("<div />"),
			row = $("<div />");
			lblTag = $("<span />"),
			resultTag = $("<input readonly='readonly' type='text' />");
		
		if (order==0) {
			
			//Allow user to type in coordinates, if coordsSearch equals true in MeasureDialog_conf.js.
			if (this.coordsSearch == true){
				resultTag.removeProp("readonly");
			}
			
			var lblTagLon = lblTag.clone(),
				resultTagLon = resultTag.clone(),
				rowLon = row.clone();
			
			lblTag.text("Latitud:");
			lblTagLon.text("Longitud:");
			resultTagLon.val("");
			units = "";
			measure="";
			rowLon.append(lblTagLon);
			rowLon.append(resultTagLon);
			rowLon.append("<br/>");
			html.append(rowLon);
			
		}
		else if (order==1) {
			lblTag.text(this.lang.labelLenght);
		}
		else if (order==2) {
			lblTag.text(this.lang.labelArea);
			units += "2";
		}
		
		resultTag.val(measure+" "+units);
		
		row.append(lblTag);
		row.append(resultTag);
		html.append(row);
		
		this.resultDiv.html(html);
		if ( this.showMeasureAtCursor===true ) {
			this.displayHtmlAtCursor(html);
		}
	},
	
	displayHtmlAtCursor : function(jQueryHtml) {
		
		// Make content for the cursor result div.
		var newHtml = jQueryHtml.clone();
		$(newHtml).find("input").each(function() {
			var span = $("<span>" + $(this).val() + "</span>");
			$(this).replaceWith(span);
		});
		$(newHtml).children().each(function() {
			$(this).removeClass();
		});
		
		$(this.cursorDiv).html(newHtml);
	},
	
	
	/**
	 * 
	 */
	displayCoordinates : function(x, y) {
		var proj = this.projections[this.currentProjection];
		
		var html = $("<div />"),
			row = $("<div />"),
			row2 = $("<div />"),
			lonTag = $("<span>"+proj.easting+"</span>"),
			latTag = $("<span>"+proj.northing+"</span>"),
			resultLonTag = $("<input readonly='readonly' type='text' value='"+x+"'></input>"),
			resultLatTag = $("<input readonly='readonly' type='text' value='"+y+"'></input>");
		
		//Allow user to type in coordinates, if coordsSearch equals true in MeasureDialog_conf.js.
		if (this.coordsSearch == true){
			resultLonTag.removeProp("readonly");
			resultLatTag.removeProp("readonly");
		}
		
		row.append(lonTag);
		row.append(resultLonTag);
		row2.append(latTag);
		row2.append(resultLatTag);
		
		html.append(row);
		html.append(row2);
		
		this.resultDiv.html(html);
		
	},
	
	/**
	 * @param fromEpsg {String}
	 * @param toEpsg {String}
	 * @param easting {Number}
	 * @param northing {Number}
	 * 
	 */
	projectCoordinate : function(fromEpsg, toEpsg, easting, northing) {
		var p = sMap.util.projectPoint(fromEpsg, toEpsg, easting, northing);
		
		var dec = this.projections[toEpsg].decimals;
		this.displayCoordinates(p.x.toFixed(dec), p.y.toFixed(dec));
	},
	
	/**
	 * If any of the coordinates is out of bounds or not a number, display a message.
	 * 
	 * @param errorType {String}
	 * 		The type of error (out of bounds or not a number ).
	 */
	
	coordsError : function(errorType){
        var self = this,
        	txt = null;
        if (errorType == "NaN"){
        	txt = self.lang.coordsNaN;
        }
        else{
        	txt = self.lang.invalidCoords;
        }
        var errorText = $("<div id='measure-errortext'>" + txt + "</div>"),
        	errorDiv = $("<div id='measure-errordiv' />"),
        	btnClose = $("<div id='measure-errorbtnclose'>" + self.lang.btnCloseTxt +"</div>");
        
        btnClose.click(function() {
        	$("#measure-resultDiv input").each(function(){
				$(this).val("");
			});
        	errorDiv.remove();
        });
        
        errorDiv.append(errorText).append(btnClose);
        $(this.map.viewPortDiv).append(errorDiv);
    },
	
	/**
	 * Get coordinates from input fields. Display proper error messages, if invalid coords.
	 * 
	 */
	
	coordsFromUser : function(){
    	//Allow for both period and comma as decimal-seperator.
		var self = this,
			east = parseFloat( $("#measure-resultDiv input").eq(0).val().replace(",",".") ),
			north = parseFloat( $("#measure-resultDiv input").eq(1).val().replace(",",".") );
		
		//Display an error if any of the coordinates is not a number
		if (isNaN(east) || isNaN(north)){
			self.coordsError("NaN");
			return;
		}
		
		var toEpsg = "EPSG:" + $("#measure-projectSelectTag").find("option:selected").prop("id").split("-")[1]; // the epsg code
		
		var p = sMap.util.projectPoint(toEpsg, config.projection, east, north);
		
		//Display an error if any coordinate is out of bounds.
    	var maximalExtent = sMap.config.maxExtent;
    	if (p.x > maximalExtent.e || p.x < maximalExtent.w || p.y > maximalExtent.n || p.y < maximalExtent.s) {
    		self.coordsError();
			return;
    	}
		
		var pointHandler = this.controls["point"].handler;
		
		var lonLat = new OpenLayers.LonLat(p.x,p.y);
		
		//Move the feature on the layer, but not the one attached to the handler, if more than one feature.
		//else create a new feature and move it.
		if (pointHandler.layer.features.length > 1) {
			pointHandler.layer.features[0].move(lonLat);
		}
		else{
			var pixel = this.map.getPixelFromLonLat(lonLat);
			pointHandler.createFeature(pixel);
			pointHandler.layer.features[0].move(lonLat);
		}
		
		// Store the current measured coordinates
		this.coordinates = {
				x : p.x,
				y : p.y
		};
		
	},
	
	/**
	 * Toggle the projection buttons
	 * @param turnOn {Boolean}
	 */
	toggleProjectionButtons : function(turnOn) {
		var self=this;
		
		//Used for toggling searchcoords-btn, if the option is set tot true
		var searchCoordsBtn = this.btnUserCoords || null;
		
		if (turnOn===true) {
			
			if (searchCoordsBtn != null && searchCoordsBtn.not(':visible')){
				searchCoordsBtn.show();
			}
			
			if ( !$("#measure-projectSelectTag").length ) {

				// Make a header
				
				var header = $("<p id='measure-projHeader' />");
				header.text(this.lang.labelCoord);
				$(this.dialogDiv).append(header);
				
				//Add user search (true/false in MeasureDialog_conf.js).
				if (self.coordsSearch == true){
					
					//search button
					var btnUserCoords = $("<button id='measure-usercoords' title='" + self.lang.btnSearchTitle + "'>" + self.lang.btnSearch + "</button>");
					this.btnUserCoords = btnUserCoords;
					btnUserCoords.click(function(e){
						self.coordsFromUser();
					});
				
					$(this.dialogDiv).append(btnUserCoords);
					
					//search by "return-key"
					btnUserCoords.parent().keypress(function(e) {
					    if (e.keyCode == 13) {
					    	btnUserCoords.click();
					    }
					});
				}
				
				var selectTag = $("<select id='measure-projectSelectTag' />");
				var projections = this.projections;
				var bs = [];
				
				for (var epsg in projections) {
					var name = projections[epsg].name;
					var number = epsg.split(":")[1];
					var selected = this.map.projection == epsg ? "selected" : "";
					var option = $("<option id='measure-"+number+"' " + selected + " >"+name+"</option>");
					selectTag.append(option);
				}

				selectTag.change(function(e) {
					var toEpsg = "EPSG:" + $(this).find("option:selected").prop("id").split("-")[1]; // the epsg code
					self.currentProjection = toEpsg;
					
					if (self.coordinates) {
						self.projectCoordinate(config.projection, toEpsg, self.coordinates.x, self.coordinates.y);//
					}
				});
				
				$(this.dialogDiv).append(selectTag);
			}
			else {
				$("#measure-projectSelectTag").show();
				$("#measure-projHeader").show();
			}
			// Store current projection.
			this.currentProjection = "EPSG:" + $("#measure-projectSelectTag").find(":selected").prop("id").split("-")[1];
			
			// Increase height of dialog
			$(this.dialogDiv).dialog("option", "height", self.height+75);
			
		}
		else {
			if(searchCoordsBtn != null && searchCoordsBtn.is(':visible')){
				searchCoordsBtn.hide();
			}
			$("#measure-projectSelectTag").hide(); //empty().remove(); // empty is faster than remove... acc. to jquery comment.
			$("#measure-projHeader").hide();
			$(this.dialogDiv).dialog("option", "height", self.height);

		}
	},
	
	hackHandlerStyle : function(control) {
		if (this.style) {
			var tempStyle = new OpenLayers.Style(this.style);

			var handler = eval(control.handler.CLASS_NAME);
			
			// Remake the control's handler to include our own style.
			control.handler = new handler(
					control,
					control.callbacks,
					OpenLayers.Util.extend(
							{
								layerOptions : {
									styleMap : tempStyle
								}
							},
							control.handlerOptions
					)
			);
		}
	},
	
	/**
	 * Make the control and the buttons which toggles the controls.
	 */
	makeControls : function() {
		
//		var panel = new OpenLayers.Control.Panel({'displayClass': 'olControlPanelMeasure'});
		
		var panel = $("<div id='measure-panel' />");

		var measureLine = new OpenLayers.Control.Measure(
				OpenLayers.Handler.Path, {
						persist: true,
						immediate: true
				}
		);

		var measurePolygon = new OpenLayers.Control.Measure(
				OpenLayers.Handler.Polygon,
				{	persist : true,
					immediate: true
				}
		);

		this.controls["line"] = measureLine;
		this.controls["polygon"] = measurePolygon;
		
		this.map.addControl(measureLine);
		this.map.addControl(measurePolygon);
		
		var reportMeasure = this.reportMeasure;
		
		var self=this;
		
		this.srcIconPointOff = "img/editTools/point_off.png";
		this.srcIconLineOff = "img/editTools/line_off.png";
		this.srcIconPolygonOff = "img/editTools/polygon_off.png";
		this.srcIconPointOn = "img/editTools/point_on.png";
		this.srcIconLineOn = "img/editTools/line_on.png";
		this.srcIconPolygonOn = "img/editTools/polygon_on.png";
		
		// Make buttons
		var btnDrawLine = $("<div class='measure-button' title='"+this.lang.titleLine+"'><img src='"+this.srcIconLineOff+"'></img></div>"),
			btnDrawPolygon = $("<div class='measure-button' title='"+this.lang.titleArea+"'><img src='"+this.srcIconPolygonOff+"'></img></div>");
		btnDrawLine.data("type", "line");
		btnDrawPolygon.data("type", "polygon");
		panel.append(btnDrawLine).append(btnDrawPolygon);
		
		
		
		// Make buttons
//		var btnDrawLine = new OpenLayers.Control.Button({
//			title: this.lang.titleLine,
//		    displayClass: "btnMeasureLine",
//		    trigger: function() {
//				self.toggleControl("line");
//			}
//		});
//		
//		var btnDrawPolygon = new OpenLayers.Control.Button({
//			title: this.lang.titleArea,
//		    displayClass: "btnMeasurePolygon",
//		    trigger: function() {
//				self.toggleControl("polygon");
//			}
//		});
		
		// Optional - add measure point (show coordinates)
		if (this.point===true) {
			
			var measurePoint = new OpenLayers.Control.Measure(
					OpenLayers.Handler.Point,
					{persist : true}
			);
			this.hackHandlerStyle(measurePoint);
			
			var btnDrawPoint = $("<div class='measure-button' title='"+this.lang.titlePoint+"'><img src='"+this.srcIconPointOff+"'></img></div>");
			btnDrawPoint.data("type", "point");
			panel.prepend(btnDrawPoint);
			
			this.controls["point"] = measurePoint;
			this.map.addControl(measurePoint);
		}
		
		var onActivateChange = function() {
			if (c.handler.CLASS_NAME=="OpenLayers.Handler.Point") {
				// If control "point" is activated or deactivated...
				var isActive = self.controls["point"].active;
				self.toggleProjectionButtons(isActive);
			}
		};
		
		// Update output on these events.
		for (var cName in this.controls) {
			var c = this.controls[cName];
			c.handler.style = this.style ? this.style : c.handler.style; // Set a custom style if defined
			
			c.events.register("measure", this, reportMeasure);
			c.events.register("measurepartial", this, reportMeasure);
			
			c.events.register("activate", c, function(e) {
				onActivateChange();
			});
			c.events.register("deactivate", c, function(e) {
				onActivateChange();
				self.deactivateResultDiv();
			});
		}
		
		this.hackHandlerStyle(measureLine);
		this.hackHandlerStyle(measurePolygon);
		
		
		
		var onButtonClick = function() {
			var type = $(this).data("type");
			if (!$(this).data("active")) {
				// Activate
				self.deactivateButtonsAndControls($(this));
				$(this).data("active", true);
				self.renderButton($(this).find("img"), true);
				self.controls[type].activate();
			}
			else {
				// Deactivate
				$(this).data("active", false);
				self.renderButton($(this).find("img"), false);
				self.controls[type].deactivate();
			}
		};
		
		panel.find("img").each(function() {
			$(this).mouseenter(function() {
				self.renderButton($(this), true);
				
			});
			$(this).mouseleave(function() {
				if ( !$(this).parent().data("active")) {
					self.renderButton($(this), false);		
				}
			});
		});
		panel.find("div").each(function() {
			$(this).click(onButtonClick);
		});
		
		return panel;
	},
	
	renderButton: function(img, state) {
		state = state || false;
		
		var oldState = "_off",
			newState = "_on";
		
		var src = img.attr("src");
		if (state !== true) {
			oldState = "_on";
			newState = "_off";
		}
		img.attr("src", src.replace(oldState, newState));
		
	},
	
	/**
	 * Make a dialogDiv and append the panel and the div which
	 * displays the measure results.
	 */
	makeDialogContent : function() {
		var dialogDiv = $("<div id='measureDialogDiv' />");
		
		var helpDiv = $("<div id='measure-helpDiv' />");

		dialogDiv.append(helpDiv);

		$(helpDiv).text(this.lang.helpText);

		/**
		 * The results are appended to this div.
		 */
		this.resultDiv = $("<div id='measure-resultDiv' />");
		
		dialogDiv.append(this.panel);
		dialogDiv.append(this.resultDiv);
		
		this.resultDiv.css(this.resultDivUnactiveCSS);
		
		this.resultDiv.html("");
		
		return dialogDiv;
	},
	/**
	 * Make the dialog to which all html is added.
	 */
	makeDialog : function(dialogDiv) {

		var self = this;
		sMap.util.createDialog(dialogDiv, {
			titleText : this.lang.headerText,
			position : this.dialogStartPosition,
			width : this.width,
			height : this.height,
			onClose : function() {
				// Deactivate controls
				self.events.triggerEvent("dialogclosed", {
					control : self
				});
				self.deactivate.call(self);
			},
			onOpen : null
		});
		return dialogDiv;
	},
    
	addButtonHoverEffect : function() {
		var map = this.map;
		$(".olControlPanelMeasure").children().each(function() {
			
			$(this).data("allowHover", true); // initially, allow hover effect.
			
			$(this).hover(function(e) {
				// ON HOVER
				
				var cssClass = $(this).prop("class"), // "btnDrawPolygonItemInactive"
					components = cssClass.split("Item"), // ["btnDrawPolygon", "Inactive"]
					allowHover = ($(this).data("allowHover")===true);
				
				if ((components[1])=="Inactive" && allowHover) {
					var activeCssClass = components[0] + "ItemActive";
					$(this).removeClass(cssClass);
					$(this).addClass(activeCssClass);
				}
			}, function(e) {
				// ON HOVER OUT
				
				var cssClass = $(this).prop("class"), // "btnDrawPolygonItemInactive"
					components = cssClass.split("Item"), // ["btnDrawPolygon", "Inactive"]
					allowHover = ($(this).data("allowHover")===true);
				
				// If button was active and just became inactive...
				if (allowHover===true) {
					var inactiveCssClass = components[0] + "ItemInactive";
					$(this).removeClass(cssClass);
					$(this).addClass(inactiveCssClass);
				}
				else if (components[1]=="Inactive") {
					$(this).data("allowHover", true); // allow hover again.
				}
			});
			
			// Don't allow the hover function to take away active class and add inactive class
			// after the button has been activated.
			$(this).click(function(e) {
				
				// Allow hover for all buttons...
				$(".olControlPanelMeasure").children().each(function() {
					$(this).data("allowHover", true);
				});
				
				// But disallow hover for the clicked button - if it became active.
				var cssClass = $(this).prop("class"); // "btnDrawPolygonItemInactive"
				var components = cssClass.split("Item"); // ["btnDrawPolygon", "Inactive"]
				// Button was inactive an became active...
				if (components[1]=="Active") {
					$(this).data("allowHover", false); // don't allow hover after click to activate.
				}
				
				
			});
		});
	},
	
	unEggifyIt: function() {
		$("#toolbar-maindiv").off("dblclick");
	},
	eggifyIt: function() {
		// Hidden egg
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
		// hidden egg end
	},

	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.MeasureDialog"
	
});sMap.moduleConfig.MeasureDialog = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false,
		toolbarIndex : null,
		/**
		 * Adds the tool button to menu or as a stand alone button
		 */
		addToToolsMenu : false,
		/**
		 * Use point measuring, true or false
		 */
		point : true,
		/**
		 * Allow user to search by coordinate (point has to be set to true above).
		 */
		coordsSearch : true,
		/**
		 * Dialog start size and position
		 */
		dialogStartPosition : [240, 100],
		width : 200 + 10,
		height : 190,
		showMeasureAtCursor : true,
		/**
		 * Style for the measure sketch
		 */
		style : {
			//externalGraphic : "img/marker-gold.png",
			//graphicWidth : 15,
			//graphicHeight : 21,
			pointRadius : 7,
			strokeWidth : 2,
			strokeColor : "#00f",
			strokeOpacity : 1,
			fillColor : "#00f",
			fillOpacity : 0.5
		},
		/*
		 * Decimals for length and area in meters and kilometers
		 */
		decimals_m : 0,
		decimals_km : 3,
		/**
		 * Backgrounds for the resultdiv when active and unactive
		 */
		resultDivActiveCSS : {
			"background" : "#dddddd"	
		},
		resultDivUnactiveCSS : {
			"background" : "none"	
		},
		
		/**
		 * These projection will be supported.
		 */
		projections : {
			"EPSG:4326" : {
				name : "WGS84",
				decimals : 5,
				easting : "Longitud:",
				northing : "Latitud:"
			},
			"EPSG:3006" : {
				name : "Sweref99 TM",
				decimals : 1,
				easting : "Easting:",
				northing : "Northing:"
			},
			"EPSG:3008" : {
				name : "Sweref99 1330",
				decimals : 1,
				easting : "Easting:",
				northing : "Northing:"
			},
			"EPSG:3021" : {
				name : "RT90 2.5 V",
				decimals : 0,
				easting : "Easting:",
				northing : "Northing:"
			},
			"EPSG:900913" : {
				name : "Google",
				decimals : 0,
				easting : "Easting:",
				northing : "Northing:"
			}
		}
		
};
sMap.Lang.lang.MeasureDialog = {
	"sv-SE" : {
		buttonText : "Mät",
		buttonHoverText : "Hämta koordinater, mät sträcka eller yta",
		headerText : "Mätverktyg",
		helpText : "Välj mätverktyg nedan och klicka i kartan. För linje och yta - avsluta med dubbelklick.",
		titleLine : "Mät sträcka",
		titleArea : "Mät yta",
		titlePoint : "Visa koordinater för punkt",
		labelLenght : "Längd: ",
		labelArea : "Yta: ",
		labelCoord : "Koordinatsystem",
		btnSearch : "Sök",
		btnSearchTitle : "Sök med koordinater genom att skriva in värden i fälten nedan",
		coordsNaN : "Enbart siffror är giltiga i fälten för koordinater.",
		invalidCoords : "Koordinaterna ligger inte i kartans utsträckning för valt referenssystem.",
		btnCloseTxt : "Stäng"
	},
	en : {
		buttonText : "Measure",
		buttonHoverText : "Get coordinates from point, measure a path or area",
		headerText : "Measure tool",
		helpText : "Choose measure tool and click in the map. For lines and areas - finish with doubleclick.",
		titleLine : "Measure line",
		titleArea : "Measure area",
		titlePoint : "Show coordiantes for point",
		labelLenght : "Length: ",
		labelArea : "Area: ",
		labelCoord : "Coordinate system",
		btnSearch : "Search",
		btnSearchTitle : "Search by coordinates by typing in values in the fields below",
		coordsNaN : "Only numbers are valid in the fields for coordinates.",
		invalidCoords : "The coordinates are out of bounds for the chosen referencesystem.",
		btnCloseTxt : "Close"
	}
	
};﻿/**
 * @author Kristian Bergstrand
 * @copyright Helsinborgs stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.MousePos = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["addscaleandmousepos"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.MousePos.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.MousePos.prototype.EVENT_TRIGGERS.concat(
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
	drawContent : function() {
		var self = this;
		sMap.events.triggerEvent("addscaleandmousepos", self, {
			showScale : self.showScale,
			showMousePos : self.showMousePos,
			mouseChoices : self.mouseChoices
		});
	},
	
	/**
	 * Listener to the event "addscaleandmousepos".
	 * Adds scale (optional) and mouseposition (optional).
	 * 
	 *  @param e {Object}
	 *  	- showScale {String}
	 *  	- showMousePos {String}
	 * 		- mouseChoices {Array} Array of one or more projections
	 * @returns
	 */
	
	addscaleandmousepos : function(e){
		var self = this,
			scale = e.showScale === true ? true : false, 
			mousePos = e.showMousePos === false ? false : true, //If not explicitly set to false, it is  true. 
			mouseProjs = e.mouseChoices,			
			projDiv = $("<div id='mousepos-projdiv' />"), //Div holding the drop-down-list with different projection-options for displaying the mouse position.
			mouseCoords = $("<span id='mousepos-coords' />"),
			projList = $("<select id='projections' />");
		
		projDiv.addClass("ui-widget-content");
		
		//Add scale
		if (scale == true) {
			var scaleNbr = new OpenLayers.Control.Scale();
			self.map.addControl(scaleNbr);
		}
		//Add MouseDisplay
		if (mousePos == true) {
			var i = 0;
			$.each(mouseProjs, function(k,v) {
				var option = $("<option id='proj"+i+"' value='"+k+"' >"+v.displayName+"</option>");
				projList.append(option);
				i++;
			});
			projList.addClass('projection-list');
			projDiv.append(projList).append(mouseCoords);
			
			$(this.div).addClass('mousepos-maindiv');
			$(this.div).append(projDiv);
			
			if ( this.map.getControlsByClass("OpenLayers.Control.ScaleBar").length ){
				$(this.div).css({
					"margin" : "35px"
				});
			}
			
			//$(self.containerDiv).append(self.div);
			
			//onChange of the dropDown
			$('.projection-list').change(function() {
				var selectedProj = $(this).val();
				self.changeProj(selectedProj);
			});
			
			//Fist time; change the dropDown to current projecion for the map.			
			$('.projection-list').val(this.map.projection).trigger("change");
		}
	},
	
	/**
	 * Changes the projection for the mousecoordinates.
	 * This has to be achieved by first removing the control and then adding
	 * a new one with the desired projection.
	 * 		
	 * @param toProj {String}
	 * 		Desired projection for the mousecoordinates.
	 */
	
	changeProj : function(toProj){
		var self = this;
		
		var mousePosControl = self.map.getControlsByClass("OpenLayers.Control.MousePosition")[0];
		//First remove the MousePosition-control, if it already exists.
		if ( mousePosControl && mousePosControl.length ){
			self.map.removeControl(mousePosControl);
		}
		
		//Then add a (new) MousePosition-control with the desired displayProjection
		var displayProj = new OpenLayers.Projection(toProj);
		var parentDiv = document.getElementById("mousepos-coords"); //Container-div.
		self.map.addControl(new OpenLayers.Control.MousePosition({
			"element" : parentDiv,
			"numDigits" : self.mouseChoices[displayProj].decimals,
			"displayProjection" : displayProj})
		);
	
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.MousePos"
	
});﻿sMap.moduleConfig.MousePos = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : true,
		//showScale : false, //Does not work. See Trac (#10)
		containerDiv : "#mapDiv",
		showMousePos : true,
		mouseChoices : {
			"EPSG:3006" : {
				displayName : "Sweref99 TM",
				decimals : 0
			},
			"EPSG:3008" : {
				displayName : "Sweref99 1330",
				decimals : 0
			},
			"EPSG:4326" : {
				displayName : "WGS84",
				decimals : 4
			},
			"EPSG:3021" : {
				displayName : "RT90 2.5 V",
				decimals : 0
			},
			"EPSG:900913" : {
				displayName : "Google",
				decimals : 0
			}
		}
};
sMap.Lang.lang.MousePos = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : {
		labelText : "Press here"
	}
	
};/**
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
	EVENT_LISTENERS : ["layervisible","layerhidden","setbaselayer","delopacityrow","addopacityrow","creatingwebparams","afterapplyingwebparams"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
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
		var layerToAdd = this.map.getLayersByName(e.layer.name);
		this.addopacityrow(layerToAdd);
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
		this.delopacityrow(e.layer.name);
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
		self.delopacityrow(oldBaseLayer);
		
		//Add the new BaseLayer to opacityTool
		var newBaseLayer = self.map.getLayersByName(e.layerName);
		self.addopacityrow(newBaseLayer);
		
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
	
	delopacityrow : function(delLayer){
		var allNamesInGUI = this.allNamesInGUI,
		//If delLayer is an object - fetch the name. Otherwise take the argument as-is.
		delLayer = ( typeof(delLayer) == "object" ) ? delLayer.name : delLayer;
		
		//Find out which layer to delete in allNamesInGUI vector, and delete it.
		var rowIndex = $.inArray(delLayer,allNamesInGUI);
		allNamesInGUI.splice(rowIndex,1);
		
		//Delete the layer in the GUI
		$(".opacity-rowsdiv").find("#"+delLayer).remove();
	},
	
	/**
	 * Listener to the event "addopacityrow".
	 * Add layer(s) to opacityDiv.
	 * 
	 * @param layersToAdd {Array} Array of one or more OpenLayers.Layer.
	 *      
	 * @returns
	 */
	
	addopacityrow : function(layersToAdd) {
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
			
			if (t.displayInLayerSwitcher != true || t.visibility != true || t.name == "selectLayer" || t.name == "poiLayer" || t.name == "theDrawLayer"){
				continue; //Stop and begin a new iteration
			}
			
			//Do not add layer if it's already in the GUI
			var doubleCheck = $.inArray(t.name,allNamesInGUI);
			if (doubleCheck == -1){
				allNamesInGUI.push(t.name);
			}
			else{
				alert("Layer " + t.name + " is already in list!");
				continue; //Stop and begin a new iteration
			}
			
			//decVal is between 0-1 and is used when setting opacity for a layer.
			//E.g. t.setOpacity(decVal);
			
			var layerConfig = sMap.cmd.getLayerConfig(t.name);
			if (!layerConfig || !(layerConfig instanceof Object)) {
				continue;
			}
			var name = layerConfig.displayName,
				theSliderDivId = OpenLayers.Util.createUniqueID(),
				decVal = 1, 
				guiVal = 100;
		
			decVal = t.opacity != null ? t.opacity : decVal;
			guiVal = Math.round(decVal * 100);
			
			var opacityRow = $("<div class='opacity-rows' id='" + t.name + "'><span class='opacity-mapname'>" + name + "</span>" + 
					"<div class='opacity-sliderdiv' id='" + theSliderDivId + "'></div><span class='opacity-values'>" + guiVal + "</span></div>");
			
			opacityRow.children("div#"+theSliderDivId).slider({
				value: guiVal,
				create: function(e, ui){
					t.setOpacity(decVal);
				},
				start: function(e, ui){},
				animate: true,
				slide: function(e, ui) {	
					var internalMapName = $(this).parent().get(0).id;
					var theMap = self.map.getLayersByName(internalMapName)[0];
					theMap.setOpacity(ui.value / 100);
					$(this).parent().children("span.opacity-values").text(ui.value);
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
	
	createContent : function(opacityDiv) {
		var self = this,
			allLayers = this.map.layers,
			opacityDiv = $("<div id='opacity-maindiv' />");
		
		//Create a div for all opacityrows.
		var opacityRowsDiv = $("<div class='opacity-rowsdiv'></div>");
		self.opacityRowsDiv = opacityRowsDiv;
		
		//Add row(s) for layer(s) in vector allLayers.
		self.addopacityrow(allLayers);
		
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
		
		opacityDiv.append(opacityRowsDiv);
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
	
});sMap.moduleConfig.Opacity = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false,
		dialogStartPosition : [150,80],
		height : 268,
		width: 380,
		
		/**
		 * SavePrefChecked - include a checkbox for saving settings (when deactivating the module in GUI).
		 * Set to "checked"/"unchecked" as you prefer. This will be the default state.
		 * Comment out (and don�t forget to remove the previous comma) if you don�t want it. 
		 * 
		 */
		savePrefChecked : "checked"
		
};sMap.Lang.lang.Opacity = {
	"sv-SE" : {
		buttonText : "Transparens",	
		headerText : "Ändra transparens",
		resetButtonText : "Sätt alla på 100",
		prefText : "Spara inställningar när verktyget stängs"
	},
	en : {
		buttonText : "Transparency",	
		headerText : "Change transparency",
		resetButtonText : "Set all sliders to 100",
		prefText : "Save preferences when closing the tool"
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.OverlayToggler = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["layervisible", "layerhidden"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	/**
	 * Keeps track of the layers to mark as active in the overlay-toggler.
	 */
	markAsActive : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.OverlayToggler.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.OverlayToggler.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
	},
	
	renderLayers: function(arr, change) {
		arr = arr || [];
		
		for (var i=0,len=arr.length; i<len; i++) {
			theId = this.nameToId(arr[i]);
			if (change) {
				$("#oltoggler-"+theId).addClass("ui-state-active");				
			}
			else {
				$("#oltoggler-"+theId).removeClass("ui-state-active");
			}
		}
	},
	
	layervisible: function(e) {
		var name = e.layer.name;
		this.renderLayers([name], true);
	},
	layerhidden: function(e) {
		var name = e.layer.name;
		this.renderLayers([name], false);
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		this.div.show();
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		this.div.hide();
		
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
     * Draw the container of the rows.
     * 
     * @returns {void}
     */
	drawContent : function() {
		$(this.div).empty().remove();
		this.div = null;
		this.div = $("<div id='oltoggler-maindiv' />");
		this.container = $("<table id='oltoggler-container' />");
		this.div.append(this.container);
		this.addLayers();
		$("#mapDiv").append(this.div);
		if(this.markAsActive.length){
			this.renderLayers(this.markAsActive, true);
		}
	},
	
	
	addLayers: function() {
		var i, t, ols = sMap.config.layers.overlays || [];
		for (i=0,len=ols.length; i<len; i++) {
			t = ols[i];
			this.addLayer(t);
		}
	},
	
	nameToId: function(name) {
		return encodeURIComponent(name).replace(/%/gi, "_OO_");
	},
	idToName: function(theId) {
		return decodeURIComponent(name.replace(/_OO_/gi, "%"));
	},
	
	
	addLayer: function(t) {
		var rowId = "oltoggler-"+this.nameToId(t.name);
		var src = t.style && t.style["default"] && t.style["default"].externalGraphic ? t.style["default"].externalGraphic : this.defaultLegendUrl;
		var row = $("<tr id='"+rowId+"'><td><img src='"+src+"'></img></td><td>"+t.displayName+"</td></tr>");
		this.container.append(row);
		
		if(this.maxOneOl === true){
			row.click(this.oneOlOnly).mouseenter(this.onRowHover).mouseleave(this.onRowHoverOut);
			if(this.markAsActive.length == 0 && t.startVisible === true){
				this.markAsActive.push(t.name);
			}
			else if(t.startVisible === true){
				sMap.events.triggerEvent("hidelayer", this, {
					layerName: t.name
				});
			}
		}
		else{
			row.click(this.onRowClick).mouseenter(this.onRowHover).mouseleave(this.onRowHoverOut);
			if(t.startVisible === true){
				this.markAsActive.push(t.name);
			}
		}
	},
	
	/**
     * Triggered on row-click, if maxOneOl is set to true in _conf.js-file. 
     * ( Similar to function onRowClick()...could be written better ).
     * 
     */
	oneOlOnly: function() {
		var className = "ui-state-active",
		toggle,
		name = decodeURIComponent($(this).attr("id").replace("oltoggler-", "").replace(/_OO_/gi, "%"));
	
		var theOthers = $(this).siblings();
		$.each(theOthers, function(k,v){
			var otherName = decodeURIComponent($(this).attr("id").replace("oltoggler-", "").replace(/_OO_/gi, "%"));
			var isActive = !$(this).hasClass(className);
			//If not visible, do nothing (isActive is a misleading name...).
			if (isActive !== true) {
				sMap.events.triggerEvent("hidelayer", this, {
					layerName: otherName
				});
			}
		});
	
		// Toggle layer's visibility
		var isActive = !$(this).hasClass(className);
		if (isActive === true) {
			toggle = "showlayer";
		}
		else {
			toggle = "hidelayer";
		}
		sMap.events.triggerEvent(toggle, this, {
			layerName: name
		});
		
	},
	
	onRowClick: function() {
		var className = "ui-state-active",
			toggle,
			name = decodeURIComponent($(this).attr("id").replace("oltoggler-", "").replace(/_OO_/gi, "%"));
		
		// Toggle layer's visibility
		var isActive = !$(this).hasClass(className);
		if (isActive === true) {
			toggle = "showlayer";
		}
		else {
			toggle = "hidelayer";
		}
		sMap.events.triggerEvent(toggle, this, {
			layerName: name
		});
	},
	
	onRowHover: function() {
		$(this).addClass("ui-state-hover");
	},
	onRowHoverOut: function() {
		$(this).removeClass("ui-state-hover");
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.OverlayToggler"
	
});sMap.moduleConfig.OverlayToggler = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : true,
		
		/**
		 * If true, not more than one overlay can be active at the same time.
		 */
		maxOneOl : true,
		
		defaultLegendUrl: "img/eraser_cross.gif"
};
sMap.Lang.lang.OverlayToggler = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : { 
		labelText : "Press here"
	}
	
};/**
 * @author Kristian Bergstrand
 * @copyright Helsingborgs stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Pizza = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.Pizza.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Pizza.prototype.EVENT_TRIGGERS.concat(
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
	
	drawContent : function() {
		this.addMainControls();
		this.addMalmoPizza();
	},

	/**
	 * Add a custom image for panning upon which the actual panning buttons
	 * are added, but they are replaced by transparent images.
	 * 
	 */

	addMainControls : function(){
		var panZoomBar = new OpenLayers.Control.PanZoomBar({
				slideFactor : 150
		});
		this.map.addControl(panZoomBar);
		$(panZoomBar.div).css("cursor", "pointer");
	},

	addMalmoPizza : function(map) {
		var self = this;
			
		// Note that the position settings in the openlayers (hard-coded) library
		// have to be adjusted in order to get a nice position of the pan and zoom icons.
		var panID = OpenLayers.Util.createUniqueID("panbar_");
		var panImg = $("<img unselectable='on' class='unselectable pizza-icon-panbar' id='"+panID+"' src='img/pizzaIcons/icon_panbar_51x51.png' />");
		panImg.css("top", this.divOffsetTop+"px");
		// Prevent click through pizza.
		panImg.click(function(e) {
			OpenLayers.Event.stop(e);
		});
		
		$(this.map.viewPortDiv).append(panImg);
		
		
		/**
		 * This function is called from start and each time the baselayer switches.
		 * The function changes the position of the whole div (pan and zoom) and
		 * moves the pan buttons a bit apart to fit the Malmö "pizza" image.
		 * It also adds transparency to all default pan-icon (not to zoom-icons)
		 * and replaces the "src"-attribute of all zoom icons by custom icons.
		 */
		
		
		this.map.events.register("changebaselayer", this, function() {
			this.changePosition();
		});
		$(window).on("resize", function() {
			setTimeout(function() {
				self.changePosition();
			}, 1);
		});
		this.changePosition();
	},
	
	changePosition: function() {
		var self = this;
		
		/* --------------- USER DEFINED VARIABLES ----------------------------- */
		
		/**
		 * The offset added to the whole div
		 */
		var divOffsetLeft = this.divOffsetLeft, // Moves the whole div from left
			divOffsetTop = this.divOffsetTop; // Moves the whole div from top
		
		/**
		 * The offset added to pan icons.
		 */
		var directions = {
			panup : [0,-3],
			pandown : [0,-3],
			panleft : [-1,-3],
			panright : [1,-3]
		};
		
		/**
		 * Zoom icons are not moved, instead
		 * their icons are replaced by these icons.
		 * The array order has to be preserved.
		 */
		var srcs = ["img/pizzaIcons/zoom-plus-mini.png",
		        "url('img/pizzaIcons/zoombar.png')",
		        "img/pizzaIcons/slider.png",
		        "img/pizzaIcons/zoom-minus-mini.png"];
		
		/**
		 * IE has a bug so we need to hard-code
		 * the slider's CSS-left.
		 */
		var slideCssLeft = "13px";
		
		/* -------------- END OF USER DEFINED VARIABLES ------------------------------- */
		
		var panZoomBar = self.map.getControlsByClass("OpenLayers.Control.PanZoomBar")[0];
		var panZoomDiv = $(panZoomBar.div);

		// Move the whole div
		var dLeft = 4; //sMap.util.takeAwayPx(panZoomDiv.css("left"));
		var dTop = 4; //sMap.util.takeAwayPx(panZoomDiv.css("top"));
		
		panZoomDiv.css("left", dLeft + divOffsetLeft);
		panZoomDiv.css("top", dTop + divOffsetTop);
		
		panZoomDiv.children().each(function(index) {
			$(this).attr("unselectable", "on").addClass("unselectable");
			var divID = $(this).prop("id");
			var dir = divID.split("_");
			dir = dir[dir.length-1];
			if (index <= 3) {
				var left = sMap.util.takeAwayPx($(this).css("left"));
				var top = sMap.util.takeAwayPx($(this).css("top"));
				left += directions[dir][0];
				top += directions[dir][1];
				$(this).css("left", left+"px");
				$(this).css("top", top+"px");	
			}
		});
		
		// Make the 4 pan icons invisible
		panZoomDiv.children().each(function(index) {
			if (index <= 3) {
				$(this).addClass("pizza-panimg-invisible");
			}
		});
		
		// Change icon's src for zoompanel (4 icons).
		var i=0;
		panZoomDiv.children().each(function(index) {
			if (index > 3) {
				// All icons with index > 3 means zoom-icons.
				if (i==1) {
					$(this).css({
						'background-image' : 'url("img/pizzaIcons/zoombar.png")'
					});
					// This applies to the slider which does not carry an "img"-tag.
					/*var style = $(this).prop("style");
					style = sMap.util.changeStyle(style, "background-image", srcs[i]); 
					$(this).prop("style", style);
					$(this).css("left", slideCssLeft);*/ // Note!!! This is a fix for IE! Hard-coded!
				}
				else if (i==2){
					$(this).find("img").prop("src", srcs[i]).addClass("pizza-slider");
					$(this).addClass("pizza-slider");
				}
				else {
					$(this).find("img").prop("src", srcs[i]);
				}
				i+=1;
			}
		});
		panZoomBar.initialize();
		
//		var zoomDivs = panZoomDiv.children(":eq(3)").nextAll();
		
	},
	
	maploaded: function() {
		this.changePosition();
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Pizza"
	
});sMap.moduleConfig.Pizza = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : true,
		divOffsetTop : 7, // Moves the whole div from top
		divOffsetLeft : 6 // Moves the whole div from left
};
sMap.Lang.lang.Pizza = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : {
		labelText : "Press here"
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Popup = OpenLayers.Class(sMap.Module, {
	
	/**
	 * - selected
	 * - unselected
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["selected", "beforeunselect", "unselected", "layerhidden"],
	
	/**
	 * - popupadded: When a popup is added (triggered on select).
	 * 		@param 
	 * 
	 * - popupremoved: When a popup is removed (triggered on unselect).
	 */
	EVENT_TRIGGERS : ["beforepopupadded", "popupadded", "popupremoved"],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Popup.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Popup.prototype.EVENT_TRIGGERS.concat(
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
	 * On select a popup will be created IF one feature
	 * is selected and the feature's layer has a popup configuration.
	 * @param e {Object}
	 * 		- features {Array}
	 * 		- selectedFeatures {Array}
	 * @returns {void}
	 */
	selected : function(e) {
		// Ugly hack for blixten popup so that popup is NEVER created when blixten is active.
		var blixtenInsts = this.map.getControlsByClass("sMap.Module.Blixten");
		if ((blixtenInsts.length && blixtenInsts[0].active) || ($("#blixtenpopup-dialogdiv").length && $("#blixtenpopup-dialogdiv").dialog("isOpen"))) {
			return false;
		}
		
		var features = e.features,
			selectedFeatures = e.selectedFeatures;
		if (selectedFeatures.length == 1) {
			// Only one feature selected - create a popup for the selected feature.
			var f = selectedFeatures[0];
			
			// However - not if there is no config available for the popup.
			var t = sMap.cmd.getLayerConfig(f.layerName || (f.layer ? f.layer.name : null)) || {};
			//Different popup for coordinate-search
			if (f.attributes["specialForCoordinateSearch"] && f.attributes["specialForCoordinateSearch"] === true){
				t.popup = t.popupCoordinates;
			}
			var popupHTML = t.popup || f.layer.popupHTML || null,
				attributes = f.attributes || {};
			if (!popupHTML) {
				return false;
			}
			
			// Make the popup HTML and specify other things for the popup.
			var html = this.makeHTML(attributes, popupHTML);
			
			var lonLat;
			if (sMap.util.getGeomType(f.geometry)=="line") {
				// For lines - get the center-most node since geometry.getCentroid()
				// only gives the first node.
				if (e.xy) {
					lonLat = this.map.getLonLatFromPixel(new OpenLayers.Pixel(e.xy.x, e.xy.y));					
				}
				else {
					var vertices = f.geometry.getVertices();
					var index = parseInt( vertices.length / 2 );
					var c = vertices[index];
					lonLat = new OpenLayers.LonLat(c.x, c.y);
				}
			}
			else {
				if (e.xy) {
					lonLat = this.map.getLonLatFromPixel(new OpenLayers.Pixel(e.xy.x, e.xy.y));
				}
				else {
					var c = f.geometry.getCentroid();
					lonLat = new OpenLayers.LonLat(c.x, c.y); 
				}
			}
			
			if( t.rmBtn === true ){
				var rmHTML = "<button class='popup-rmBtn'>" + this.lang.rmBtnTxt + "</button>";
				html += rmHTML;
			}

			var popup = new OpenLayers.Popup.FramedCloud(
					"popup-"+f.id,
					lonLat,
					null, // contentSize - OpenLayers.Size
					html, // HTML
					// Make the popup attached to the center of the point.
					new OpenLayers.Icon(null, new OpenLayers.Size(18, -10), new OpenLayers.Pixel(-8, 3)), // new OpenLayers.Size(8,-28), new OpenLayers.Pixel(2,23)),
					true, // closebox
					// on close box click
					function(e) {
						// unselect this feature (will destroy the popup)
						sMap.events.triggerEvent("unselect", this, {
							features : [f]
						});
					}
			);
			popup.panMapIfOutOfView = this.panMapIfOutOfView;
			sMap.events.triggerEvent("beforepopupadded", this, {
				popup: popup,
				feature: f
			});
			
			this.map.addPopup(popup);
			
			if( t.rmBtn === true ){
				$(".popup-rmBtn").click(function(){
					sMap.events.triggerEvent("unselect", this, {
						features : [f]
					});
					var poiLayer = sMap.map.getLayersByName("poiLayer")[0] || null;
					if(poiLayer == null || poiLayer.features.length != 1){
						return;
					}
					else{
						sMap.events.triggerEvent("cleanlayer", this, {
							layer : poiLayer
						});
					}
				});
			}
			
			f.popup = popup;
			
			// IE7 Hack - if calling updateSize without delay an error occurrs
			// because contentDiv has not yet been initialized or something.
			if ( $.browser.msie && parseInt($.browser.version) <= 8 ) {
				sMap.db.popupPopup = popup;
				sMap.db.setPopupSize = function() {
					var popup = sMap.db.popupPopup;
					popup.minSize = new OpenLayers.Size( 300, 120);
					popup.maxSize = new OpenLayers.Size(  this.xMaxSize, this.yMaxSize);
					popup.updateSize();
				};
				setTimeout("sMap.db.setPopupSize();", 20);
			}
			else {
				popup.minSize = new OpenLayers.Size( 300, 120);
				popup.maxSize = new OpenLayers.Size( this.xMaxSize, this.yMaxSize);
				$(document).ready(function() {
					popup.updateSize();
				});
			}
			sMap.events.triggerEvent("popupadded", this, {
				popup: popup,
				feature: f
			});
		}
		else if (selectedFeatures.length > 1) {
			// remove popup if more than one features are selected in total.
			var popups = this.map.popups;
			if (popups && popups.length) {
				for (var i=0; i<popups.length; i++) {
					popups[i].destroy();
				}
			}
		}
		
		if (this.minimizeBtn === true){
			var closeBtn = $(".olPopupCloseBox");
			var minimizeBtn = closeBtn.clone();
			minimizeBtn.prop({
				"id" : "minimize",
				"title": this.lang.minimizeBtn
			});
			minimizeBtn.css({
				"right": "20px",
				"position" : "relative",
				"top" : "0px"
			});
			minimizeBtn.removeClass("olPopupCloseBox").addClass("ui-button-icon-primary ui-icon ui-icon-minus");
			minimizeBtn.click(function(e){	
					// Destroy the popup, but keep the feature selected.
					sMap.events.triggerEvent("unselected", this, {
					});
			});
			minimizeBtn.appendTo(closeBtn);
		}
		
		if (this.allowDrag == true && popup) {
			var dragPopup = new OpenLayers.Control.DragPopup(popup);
			this.map.addControl(dragPopup);
			
			popup.moveTo = function() {
				if (dragPopup.down) {
					OpenLayers.Popup.prototype.moveTo.apply(this, arguments);
				} 
				else {
					OpenLayers.Popup.Anchored.prototype.moveTo.apply(this, arguments);
				}
			}
		}
	},
	/**
	 * On unselect all popups in the map will be destroyed.
	 * @param e {Object}
	 * @returns {void}
	 */
	beforeunselect : function(e) {
		var popup = this.map.popups && this.map.popups.length ? this.map.popups[0] : null;
		if (popup) {
			this.map.removePopup(popup);
			popup.destroy();
		}
	},
	
	unselected : function(e) {
		var popup = this.map.popups && this.map.popups.length ? this.map.popups[0] : null;
		if (popup) {
			this.map.removePopup(popup);
			popup.destroy();
		}
	},
	
	layerhidden: function(e) {
		// Find out which layer the current visible
		// popup (if any) belongs to.
		var popup = this.map.popups.length ? this.map.popups[0] : null;
		if (popup) {
			sMap.events.triggerEvent("unselect", this, {});
		}
	},
	
	/**
	 * Make HTML for the popup based on the attributes
	 * @param attributes
	 * @param config {Array} The configuration for the popup. Tells
	 * what parameters should be extracted and their formatting etc.
	 * @returns {void}
	 */
	makeHTML : function(attributes, popupHTML) {
		return sMap.util.extractAttributes(attributes, popupHTML);
		
		/*var t = null,
			html = $("<div />"),
			tags = {
				"div" : "<div />",
				"a" : "<a />",
				"img" : "<img />",
				"span" : "<span />"
			};
		for (var i=0,len=config.length; i<len; i++) {
			t = config[i];
			
			// Make the tag
			var tag = $(tags[t.tag]);
			html.append(tag);
			
			var text = t.text;
			if (text) {
				// Check if any attributes should be extracted.
				text = this.extractAttributes(attributes, text);
				tag.text(text);
			}
			
			
			if (t.tag=="img" && t.src) {
				var src = this.extractAttributes(attributes, t.src);
				tag.attr("src", src);
			}
			// For <a>-tags add the href attribute.
			if (t.href) {
				var href = this.extractAttributes(attributes, t.href);
				if (t.tag!=="a") {
					var _tag = $("<a target='_blank' />");
					_tag.append(tag);
					html.append(_tag);
					tag = _tag;
				}
				tag.attr("href", href);
			}
			
			if (t.before) {
				tag.before(t.before);
			}
			if (t.after) {
				tag.after(t.after);
			}
			// Add CSS
			var css = t.css || "popup-text1"; // set default css if no css is given
			tag.addClass(css);
		}
		return html.html();*/
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {

	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Popup"
	
});sMap.moduleConfig.Popup = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : true,
		
		/**
		 * If true, add a button to popup for "minimizing" (hiding) the popup without
		 * unselecting the feature.
		 */
		
		minimizeBtn : true,
		
		/**
		 * If true, allows popup to be moved around.
		 */
		allowDrag : false,
		/**
		 * Max sizes of the popup
		 */
		xMaxSize : 300,
		yMaxSize : 300,
		/**
		 * Allow the map to pan to fit the popup? true or false
		 */
		panMapIfOutOfView: false
};
sMap.Lang.lang.Popup = {
	"sv-SE" : {
		labelText : "Tryck här",
		minimizeBtn : "Göm popup",
		rmBtnTxt : "Ta bort"
	},
	en : {
		labelText : "Press here",
		minimizeBtn : "Hide popup",
		rmBtnTxt : "Remove"
	}
	
};/**
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
	
});sMap.moduleConfig.Print = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false,
		
		webContentRoot: "/Library/WebServer/Documents/sMap/",
		publicExportFolder: "/Library/WebServer/Documents/temp/print/",
		privateExportFolder: "http://localhost/temp/print/",
		printScriptsFolderPath: "/Library/WebServer/CGI-Executables/WS/print/",
		
		// Style of the layer showing the print extent.
		defaultStyle : {
			pointRadius : 8,
			strokeWidth : 3,
			strokeColor: "#ff0000",
			fillColor: 	"#ff0000",
			strokeOpacity : 1,
			fillOpacity: 0.1
		}
		
		
};
sMap.Lang.lang.Print = {
	"sv-SE" : {
		btnPrint : "Skriv ut",
		btnPrintInMenu : "Skriv ut karta",
		dialogTitle: "Skriv ut/exportera",
		btnExport: "Exportera",
		description: "Rubrik (valfritt)",
		printArea: "Utskriftsområde",
		btnDownload: "",
		downloadTip: "Tryck här för att ladda ner bilden",
		labelText: "Skriv ut eller exportera kartan",
		textLoadingPrint: "Skriver ut...",
		textLoadingExport: "Exporterar..."
	},
	en : {
		btnPrint : "Print",
		btnPrintInMenu : "Print map",
		dialogTitle: "Print/Export",
		btnExport: "Export",
		description: "Header (optional)",
		printArea: "Print extent",
		btnDownload: "",
		downloadTip: "Press here to download the image",
		labelText: "Print or export the map",
		textLoadingPrint: "Printing...",
		textLoadingExport: "Exporting..."
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.RedirectClick = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.RedirectClick.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.RedirectClick.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		this.callbacks = this.callbacks || {};
		
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		// Deactivate all instances of this class
		var ctrls = this.map.getControlsByClass(this.CLASS_NAME);
		for (var i=0,len=ctrls.length; i<len; i++) {
			ctrls[i].deactivate();
		}
		sMap.events.triggerEvent("unselect", this, {});
		sMap.util.showMouseMoveText(this.mouseMoveText);
		sMap.events.triggerEvent("deactivate", this, {
			module: "sMap.Module.Select"
		});
		this.handler.activate();
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		// Unbind events
		sMap.util.hideMouseMoveText();
		this.handler.deactivate();
		sMap.events.triggerEvent("activate", this, {
			module: "sMap.Module.Select"
		});
		
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
		// Add a callback for the draw feature handler.
		$.extend(this.callbacks, {done : this.onDone});
		
		this.handler = new OpenLayers.Handler.Point(this, this.callbacks, {persist : false});
		
		
		var eventChooser = "addtoolbutton";
		if (this.addToToolsMenu) {
			eventChooser = "addtomenu";
		}
		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			label : this.displayName,
			hoverText : this.btnHover,
			iconCSS : this.buttonCss || "ui-icon-pencil",
			tagID : this.buttonId,
			left: this.left,
			right: this.right,
			menuId : this.addToToolsMenu
		});
	},
	
	onDone : function(geometry) {
		var url = this.url;
		if (url) {
			var x = parseInt(geometry.x),
				y = parseInt(geometry.y);
			url = url.replace(/\${x}/g, x).replace(/\${y}/g, y); 
		}
		window.open(url, this.btnLabel);
		this.deactivate();
	},
	
	
	
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.RedirectClick"
	
});



sMap.moduleConfig.RedirectClick = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		displayName: "",
		btnHover: null,
		
		url: null,
		
		overrideName: null, // "snedbild", "gatuvy"
		
		overrides: {
			snedbild: {
				
			},
			gatuvy: {}
		}
		
};
sMap.Lang.lang.RedirectClick = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : { 
		labelText : "Press here"
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Report = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.Report.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Report.prototype.EVENT_TRIGGERS.concat(
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
		this.createDialog();
		if (this.dialog) {
			this.dialog.dialog("open");
		}
		else {
			// Print directly with default values.
			this.createReport();
		}
		var self = this;
		var onSubmit = function() {
			self.createReport(  $(this).serializeArray() );
			return false;
		};
		this.onSubmit = onSubmit;
		this.dialog.find("form").on("submit", this.onSubmit);
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		this.dialog.find("form").off("submit", this.onSubmit);
		if (this.dialog) {
		    this.active = false;
		    this.dialog.dialog("close");
		    this.active = true;
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
	
	createDialog: function() {
		if (!this.formHtml) {
			return false;
		}
		var self = this;
		if (this.dialog) {
			return false;
		}
		this.dialog = $("<div />");
		this.dialog.append(this.formHtml);
		
		var dialogOptions = $.extend({
		    title: "Skapa rapport",
			autoOpen: false,
			open: function() {
			    $(this).find("input, textarea").val(null); // reset
			},
			close: function() {
			    if (self.active) {
			        self.deactivate();
			    }
			},
			buttons: [
			          {
			        	  text: this.lang.labelText,
			        	  click: function() {
			        	  		var data = $(this).find("form").submit();
			        	  		$(this).dialog("close");
			          		}
			          }
			]
		}, this.dialogOptions);
		this.dialog.dialog(dialogOptions);
	},
	
	/**
	 * Extract data from the form, call the print function and
	 * create a new window with everything merged and print it.
	 * 
	 * @param data {Object} Serialized object from the submitted form.
	 * @returns {void}
	 */
	createReport: function(arr) {
		arr = arr || [];
		
		
		sMap.cmd.loading(true, {bg: true});
		var self = this;
		this.winHtml = $("<div />");
		
		var table = $("<table />");
		for (var i=0,len=arr.length; i<len; i++) {
			var obj = arr[i];
			if (this.formLabels && this.formLabels instanceof Object) {
			    labelText = this.formLabels[obj.name] || "";
			}
			if (i % 2 === 0) {
			    // even number
			    row = $("<tr />");
			    table.append(row);
			}
			row.append("<td style='min-width: 300px;'>"+labelText + obj.value + "</td>");
		}
		var btnPrint = $('<button id="btn-print" style="position:absolute;padding:10px;right:40px;top: 20px;">Skriv ut</button>');
		
		this.winHtml.append(btnPrint);
		btnPrint.click(function() {
		    btnPrint.remove();
		    self.reportWin.print();
		    self.reportWin.close();
		});
		if (table) {
			this.winHtml.append(table);
		}
		// If u want a legend – uncomment this code...
//		var legendHtml = this.getLegend();
//		this.winHtml.append(legendHtml);
		
		/**
		 * The window is printed when the map(s) are created (on callback).
		 */
		this.exportMaps();
	},
	
	getLegend: function() {
		var self = this;
		var t,
			arr = sMap.config.layers.overlays,
			src,
			row,
			html = $("<div />"),
			table = $("<table />"),
			isVisible;
		for (var i=0,len=arr.length; i<len; i++) {
			t = arr[i];
			isVisible = this.map.getLayersByName(t.name).length ? this.map.getLayersByName(t.name)[0].getVisibility() : false; 
			if (!isVisible) {
				continue;
			}
			
			src = t.style && t.style["default"].externalGraphic ? t.style["default"].externalGraphic : null;		
			if (t.legend && t.legend.hover && t.legend.hover.url) {
				// This one everrides default external graphic
				src = t.legend.hover.url;
			}
			row = $("<tr><td></td><td>"+t.displayName+"</td></tr>");
			
			if (src) {
//				src = sMap.config.rootURL.replace(/index.html/g, "").replace(/index_dev.html/g, "") + src;
				var img = "<img src='"+src+"'></img>";
				row.find("td:first").append(img);
			}
			table.append(row);
			row.find("img").attr({
				"height": "45",
				"width": "45"
			}); //.load(onLoad);
			row.css({
				"font-size": "14px",
				"font-weight": "bold"
			});
			row.find("td").css({
				"border": "1px solid #aaa",
				"padding": "2px 10px"
			});
		}
		if (table.children().length === 0) {
			return $("<div />");
		}
		// Append header
		//html.append("<h1>"+this.lang.legendHeader + (sMap.config.mapName ? sMap.config.mapName[sMap.langCode] : "...mapName missing in config") + "</h1>");
		html.append(table);
		
		return html;
	},
	
	exportMaps: function() {
		var self = this,
			i = 0, html = "";
			
		var curZoom = this.map.getZoom(),
		    curRes = this.map.getResolutionForZoom(curZoom);
		var zoomOverview = this.zoomOverview,
		    zoomOverviewRelative = this.zoomOverviewRelative;
		
		if (zoomOverviewRelative && !zoomOverview) {
		     zoomOverview = curZoom + zoomOverviewRelative;
		     if (zoomOverview <= 0) {
		        zoomOverview = 0; // not lower than this...
		     }
		}
		resOverview = this.map.getResolutionForZoom(zoomOverview);
		
		if (zoomOverview >= curZoom) {
		    // we have a problem :). Overview map should not be more zoomed out
		    // than the area it depicts.
		    zoomOverview = curZoom;
		}
		
		var ctrls = this.map.getControlsByClass("sMap.Module.SPrint");
		this.printControl = ctrls.length ? ctrls[0] : null;
		
		var makeMap1 = function() {
		    // Call export once
		    var d = $.Deferred();
            self.printControl.core.dialog.print("Export_", "PNG", {
                dpi: 96,
                orientation: "Landscape",
                format: "A5",
                timeout: 20000,
                onSuccess: function(url) {
                    d.resolve(url);
                    //makeMap2();
                },
                onError: function(a,textStatus,c) {
                    d.reject(textStatus);
                },
                onComplete: function() {
                	sMap.cmd.loading(true, {bg: true}); // SPrint hides loading just before this...
                },
                scale: sMap.util.getScaleFromResolution(curRes),
                resolution: curRes
            });
            return d.promise();
		};
		
		var makeMap2 = function() {
		    var d = $.Deferred();
		    
            var extentLayer = new OpenLayers.Layer.Vector("extlayer", {
                styleMap: new OpenLayers.StyleMap({
                    "default": new OpenLayers.Style({
                        fillOpacity: 0,
                        strokeColor: "#0000FF",
                        strokeWidth: 4
                    })
                })
            });
            
            // TODO: get extent from current view is not the same as the exported view...
            var extentFeature = new OpenLayers.Feature.Vector(self.map.getExtent().toGeometry(), {});
            extentLayer.addFeatures([extentFeature]);
            
            setTimeout(function() {
            	// If you want a different baseLayer for the overview map, the parameter overviewBaseLayerName
            	// will make the beef.
            	var overviewBl,
            	changeBl = false;
            	if (self.overviewBaseLayerName) {
            		overviewBl = self.map.getLayersByName(self.overviewBaseLayerName)[0];
            		changeBl = self.map.baseLayer;
            		self.map.setBaseLayer(overviewBl); // for now - change back later
            	}
            	else {
            		overviewBl = self.map.layers.baseLayer;
            	}
                self.printControl.core.dialog.print("Export_", "PNG", {
                    dpi: 96,
                    orientation: "Landscape",
                    format: "A5",
                    timeout: 20000,
                    layers: [overviewBl, extentLayer],  // create image with only baselayer
                    onSuccess: function(url) {
                        d.resolve(url);
                    },
                    onError: function(a,textStatus,c) {
                        d.reject(textStatus);
                    },
                    onComplete: function() {
                    	if (changeBl) {
                    		self.map.setBaseLayer(changeBl); // Change back
                    	}
                    },
                    scale: sMap.util.getScaleFromResolution(resOverview),
                    resolution: resOverview
                });
            
            }, 1000);
            return d.promise();
		    
		};
		var onFail = function(textStatus) {
			sMap.cmd.loading(false);
		    debug.log(textStatus);
            alert("Kunde inte skapa kartbild.\nErrormeddelande: "+textStatus);
		};
		var urls = [];
		makeMap1().done(function(url) {
		    urls = urls.concat(url);
		    makeMap2().done(function(url) {
		    	sMap.cmd.loading(false);
                var rootUrl, img;
                urls = urls.concat(url).reverse(); // Put the overview map in the beginning
                var table = $(
                	"<div style='margin-top: 50px;text-align:center;'>" +
                		"<span style='text-align:center;margin:0;'></span>" +
                		"<span style='text-align:center;margin:0;'></span>" +
                	"</div>");
                for (var i=0,len=urls.length; i<len; i++) {
                    url = urls[i];
                    if (url) {
                        rootUrl = location.href.split("?")[0].replace(location.pathname, "");
                        url = rootUrl + url;
                        img = $('<img width="700px" style="margin-top:20px;" src="'+url+'"></img>');
                        if (i === 0) {
                            img.css("width", "350px");
                        }
                        table.find("span:eq("+i+")").append(img);
                    }
                }
                self.winHtml.append(table);
                
                var h = screen.height < 1000 ? screen.height : 1000; // Limit window height to 1000 or screen height
                self.reportWin = window.open('', '', 'left=200,top=10,width=800,height='+h);
                self.reportWin.focus();
                
                if (self.preHtml) {
                    $(self.reportWin.document.body).prepend(self.preHtml);
                }
                if ($.browser.msie) {
                    self.reportWin.document.write(self.winHtml.html());
                    var btn = $(self.reportWin.document.body).find("#btn-print")[0];
                    window.win = self.reportWin;
                    btn.onclick = function() {
                    	btn.style.display = "none";
                    	window.win.focus();
                    	window.win.document.close();
                    	window.win.print();
                        return false;
                    };
                }
                else {
                    $(self.reportWin.document.body).append(self.winHtml);
                }
                
                if (self.postHtml) {
                    if ($.browser.msie) {
                        self.reportWin.document.write(self.postHtml);
                    }
                    else {
                        $(self.reportWin.document.body).prepend(self.postHtml);
                    }
                    
                }
                
		    }).fail(onFail);
		}).fail(onFail);
	},
	
	
    /**
     * Called when all modules are initialized, i.e. after initialize.
     * All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
	    // Allow extending lang from config
	    var langObj = this.labels instanceof Object ? this.labels[sMap.langCode] : {};
	    $.extend(this.lang, langObj);
	    
	    var btnId = "btn-report",
            nbr = 0;
	    while ( $("#"+btnId).length > 0 ) {
	        nbr += 1;
	        btnId = "btn-report" + nbr;
	    }
	    
		var options = {
				index : this.toolbarIndex,
				hoverText : this.lang.labelButtonHover || "",
				iconCSS : "ui-icon-document",
				label : this.lang.labelButton || "",
				tagID : btnId,
				menuId: this.addToToolsMenu,
				bindActivation: true
		};
		var event = this.addToToolsMenu ? "addtomenu" : "addtoolbutton";
		sMap.events.triggerEvent(event, this, options);
		this.toolbarButton = $("#"+btnId);
	}, 
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Report"
	
});
sMap.moduleConfig.Report = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		/**
		 * If you want a different baselayer (or other layer...) for the overview map
		 * then specify the layer name here.
		 */
		overviewBaseLayerName: null,
		
		addToToolsMenu: false,
		
		// ----------------------------------------------------------------------------
		// There are two ways to specify the zoom level for the overview map.
		//      1) zoomOverview gives a fixed number (always the same zoom level)
		//      2) zoomOverviewRelative will be added to the current zoom level, it is
		//          therefore probably a negative number.
		// Note! zoomOverview overrides zoomOverviewRelative
		// ----------------------------------------------------------------------------
		//zoomOverview: 1,
		zoomOverviewRelative: -3,
		
		dialogOptions: {
		    title: "Skapa lägeskarta"
		},
		
		// Optional HTML to prepend or append to the final report.
		preHtml: '<h1 style="text-align: center;">Lägeskarta</h1>',
		postHtml: null,
		
		// This displayNames will be shown in the report, before the value.
		// The key used here is from the input tag's name attribute. E.g. name="report-descript".
		// If formLabels is null, no label will be used, only the value will be extracted.
		formLabels: {
		    "report-descript": "<label><strong>Ärende:</strong>&nbsp</label>",
		    "report-descript2": "<label><strong>Ärendenummer:</strong>&nbsp</label>",
		    "report-descript3": "<label><strong>Fastighet:</strong>&nbsp</label>",
		    "report-descript4": "<label><strong>Adress:</strong>&nbsp</label>"
		},
		
		formHtml: '<form>' +
				'<table>' +
                    '<tr><td><label for="report-descript">Ärende</label></td><td><input type="text" name="report-descript" id="report-descript"></input></td></tr>' +
                    '<tr><td><label for="report-descript2">Ärendenummer</label></td><td><input type="text" name="report-descript2" id="report-descript2"></input></td></tr>' +
                    '<tr><td><label for="report-descript3">Fastighet</label></td><td><input type="text" name="report-descript3" id="report-descript3"></input></td></tr>' +
                    '<tr><td><label for="report-descript4">Adress</label></td><td><input type="text" name="report-descript4" id="report-descript4"></input></td></tr>' +
				'</table>' +
			'</form>'
};
sMap.Lang.lang.Report = {
	"sv-SE" : {
		labelText : "Skapa",
		labelButton : "Skapa rapport", // Can be extended from config
		legendHeader: "Teckenförklaring "
	},
	en : {
		labelText : "Create",
		labelButton: "Create report",
		legendHeader: "Legend for "
	}
	
};/**
 * @author Karl-Manus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.ScaleBar = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.ScaleBar.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.ScaleBar.prototype.EVENT_TRIGGERS.concat(
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
	drawContent : function() {
		this.map.addControl(new OpenLayers.Control.ScaleBar({maxWidth: 230, minWidth: 190}));
		// Create a half-transparent div behind the scalebar.
		var scaleDiv = $('<div id="scaleDiv" unselectable="on" class="unselectable" />');
		$("#mapDiv").append(scaleDiv); 
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.ScaleBar"
	
});sMap.moduleConfig.ScaleBar = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false
};sMap.Lang.lang.ScaleBar = {
	"sv-SE" : {
		labelText : "Kilometer"
	},
	en : {
		labelText : "Kilometers"
	}
	
};/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.ScaleSelector = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.ScaleSelector.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.ScaleSelector.prototype.EVENT_TRIGGERS.concat(
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
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
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

		var scaleSelectorDiv = $('<div id="scaleSelectorDiv" unselectable="on" class="unselectable" />');
		$(this.map.viewPortDiv).parent().append(scaleSelectorDiv);
		this.createDropDown();   //Where the scale options is stored
		this.bindEventListeners();
	}, 
	
	/**
	 * Method: createDropDown
	 * @param {void}
	 * @return {void}
	 * This method creates and add a drop down menu on the viewPortDiv.
	 */
   	createDropDown : function() {
   		var self = this;
   		var viewPortScalePostion = $("#scaleSelectorDiv"); //$("#toolbar-maindiv");
		var resolutions = this.map.resolutions;
		var scaleOptions = ""; 

		for(var arrIndex in resolutions){
			
			//The default OL DOTS_PER_INCH is 72 therefore it had to be changed to 96 in oder to match 
			//the scale from this map resolution
			OpenLayers.DOTS_PER_INCH = 96;
			
			var scale = parseInt(Math.round( OpenLayers.Util.getScaleFromResolution(resolutions[arrIndex], "m") ));
			scaleOptions =  scaleOptions + "<option value='" + scale + "'>" + "1:" + scale + "</option>";
		}

		var dropDownOptions = $("<select unselectable='on' class='unselectable' name='scales' id='scaleSelectOpt'>" + scaleOptions + "</select>");
		this.dropDownOptions = dropDownOptions;
		this.viewPortScalePostion = viewPortScalePostion;
		$(this.map.viewPortDiv).parent().append(this.dropDownOptions);
		
		//onChange of the dropDown
		$('#scaleSelectOpt.unselectable').change(function() {
			var zoomIndex = self.dropDownOptions[0].selectedIndex;
			self.zoomToLevel(zoomIndex);
		});
		
	},
	
	destroyDropDown : function(){
		this.unbindEventListeners();
		this.viewPortScalePostion.remove(this.dropDownOptions);
	},
	
	/**
	 * Method: bindEventListeners
	 * @param {void}
	 * @return {void}
	 * This method register and bind the "zoomend" event listener to the map
	 * Whenever the user zoom in or out the scale will be update. 
	 */
	bindEventListeners : function(){
		this.map.events.register("zoomend", this, function(){
			if (this.map) {
				var zoom = this.map.getZoom();
				this.changeScaleValue(zoom);				
			}
		});

		this.map.events.register("changebaselayer",this, function(){
			var prevResolution = this.map.resolution;
			this.map.resolutions = this.map.baseLayer.resolutions;
			this.replaceScalesList();
			var result = this.keepPrevScale(prevResolution);
			var indexOf = $.inArray(result, this.map.resolutions);
			if(indexOf < 0){
				
				//Set the ZOOM to the last zoom Level in the map resolution
				//if the indexOf is negative
				indexOf = this.map.resolutions.length-1; 
			}
			this.zoomToLevel(indexOf);
			this.changeScaleValue(indexOf);
//			$("#scaleSelectOpt").val(this.map.resolutions[indexOf]);
		});
	},
	
	keepPrevScale : function(prevResolution){
		var newMapResolutions = this.map.resolutions;
		var tempResolution = 0;
		var result = 0;
		
		for(var i=0, leni=newMapResolutions.length; i<leni; i++){
			tempResolution = newMapResolutions[i];
			if(i==0){
				if(tempResolution == prevResolution){
					var result = tempResolution;
					i=leni;
				}
			}
			else{
				for(var j=1, lenj=newMapResolutions.length; j<lenj; j++){
					tempResolution = newMapResolutions[j];
					if(tempResolution < prevResolution){
						var resultA = newMapResolutions[j]; 	 //less than prevResolution
						var resultB = newMapResolutions[j-1]; //greater solution
						
						var possibleA = Math.abs(resultA - prevResolution);
						var possibleB = Math.abs(resultB - prevResolution);
						
						var closest = Math.min(possibleA, possibleB);
						if(closest == possibleA){
							result = resultA;
						}
						if(closest == possibleB){
							result = resultB;							
						}
						
						j = lenj; //Stops the interaction of SECOND FOR LOOP ( j )
						i = lenj; //Stops the interaction of FIRST  FOR LOOP ( i )
					}
				}
			}
		}
		return result;
	},
	
	replaceScalesList : function(){
		$('#scaleSelectOpt').replaceWith();
		 this.createDropDown();
	},
	
	/**
	 * Method: unbindEventListeners
	 * @param {void}
	 * @return {void}
	 * This is the opposite of the bindEventListener method
	 * It can be used if necessary.
	 */
	unbindEventListeners : function(){
		this.map.events.unregister("zoomend",this, function(){
			
		});
		this.map.events.unregister("changebaselayer",this, function(){
			
		});
	},
	
	/**
	 * Method: zoomToLevel
	 * @param {Interger} numZoomLevel the map will be set 
	 * @return {void}
	 * This method zoom to the level according to the user selection from the scale Drop Down Menu
	 */
	zoomToLevel : function(zoom){
		this.map.zoomTo(zoom);
	},
	
	/**
	 * Method: changeScaleValue
	 * @param {Integer} selectedIndex from the Drop Down Menu
	 * @return {void} 
	 */
	changeScaleValue : function(newIndex){
		var htmlElements = this.dropDownOptions[0];
		htmlElements.selectedIndex = newIndex;
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.ScaleSelector"
	
});sMap.moduleConfig.ScaleSelector = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false
		
};
sMap.Lang.lang.ScaleSelector = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : { 
		labelText : "Press here"
	}
	
};﻿/**
 * @author Kristian Bergstrand
 * @copyright Helsingborgs stad 
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Search = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to.
	 * 
	 * "addmarkerataddress": Adds a marker at an address.
	 * "addmarkeratcoords": Adds a marker at given coordinates.
	 * "decidewhattodo" decides what to do with the query result
	 * 
	 */
	
	EVENT_LISTENERS : ["addmarkerataddress","addmarkeratcoords","decidewhattodo","creatingwebparams","afterapplyingwebparams","cleanlayer"],
	
	/**
	 * The events that are triggered from this module.
	 * 
	 * "searchlayer" Searches a layer for the autocomplete result
	 */
	
	EVENT_TRIGGERS : ["addlayer","addmarkerataddress","addmarkeratcoords","decidewhattodo","searchlayer"],
	
	lastSearchedPoi : null,
	
	lastSearchedCoords : null,
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Search.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Search.prototype.EVENT_TRIGGERS.concat(
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
		var self = this;
		if (self.active===true) {
			return false;
		}
		
		//If no inputfield for search is desired - do not try to add searchcategories
		if (self.noInput === true){
			self.appendAsOwnDiv = false;
			self.dropDownOption = false;
		}
		if (self.dropDownOption === true && self.appendAsOwnDiv===false) {
			self.added();
			var startingCat = $("#search-dropdownmenu").find("option:selected").text();
			self.changeCat(startingCat);
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
		// Remember - if you are using handlers - they also need to be deactivated.
		// If the parent class is using handlers they should be deactivated by the
		// return statement (see below) and not needed to be called from here.
		//this.handlers["click"].deactivate();
		
		
		// Events which are not bound to sMap.events need to be unregistered here.
		// sMap.events are taken care of in base-class Module. However, only
		// if listeners are defined as methods with same name as the event.
		
		$(this.searchInput).empty().remove();
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
	/**
	 * Listener to the event "creatingwebparams".
	 * Adds parameter "poi" or "coords" to webparams, if a poi or a coordinate is marked in the map.
	 * 
	 * @returns
	 */
	
	creatingwebparams : function(){
		var self = this;
		// Remove poiLayer from the OL-params
		var index = $.inArray( self.poiLayer.name, sMap.db.webParams.OL || [] );
		if (index > -1) {
			sMap.db.webParams.OL.splice(index, 1);
		}
		var poiLayer = sMap.map.getLayersByName("poiLayer")[0] || null;
		if(poiLayer == null || poiLayer.features.length != 1){
			return;
		}
		else if( self.lastSearchedPoi != null ){
			sMap.db.webParams.poi = encodeURIComponent(self.lastSearchedPoi);
		}
		else{
			sMap.db.webParams.coords = self.lastSearchedCoords;
		}
		
	},
	
	/**
	 * If the address can´t be found, add a message including the poi.
	 * If altText is specified, use this parameter to output info/error message.
	 * 
	 * @param poi {String}
	 */
	
	addInfoMsg : function(poi,altText){
		var self = this;
        var txt = typeof altText !== "undefined"? altText : self.lang.noPoiPreTxt + poi + self.lang.noPoiPostTxt;
        var noPoiText = $("<div id='search-nopoitext'>" + txt + "</div>");
        
        //Work-around for button name in variable (stackoverflow.com/questions/1464843/jquery-dialog-button-variable)
        var dialog_buttons = {};
        dialog_buttons[this.lang.noPoiBtnClose] = function(){ 
        	$(this).dialog('close'); 
        }
		var dialogConfig = {
				dialogClass : 'noTitleDialog',
				buttons : dialog_buttons	
		};
		sMap.util.infoDialog(noPoiText, dialogConfig);
    },
	
	/**
	 * Binds autocomplete to arbitrary ID.
	 * 
	 * @param searchInput {Object}
	 * 
	 */
	
	bindAutocompleteToId : function(searchInput) {
		// Set watermark text to search field
		searchInput.attr("placeholder", this.startText);
		
		var autoCompleteScriptUrl = null;
		
		if( this.useProxy === true){
			autoCompleteScriptUrl = sMap.config.proxyHost ? sMap.config.proxyHost + encodeURIComponent(this.autoCompleteScriptUrl) : this.autoCompleteScriptUrl;
		}
		else{
			autoCompleteScriptUrl = this.autoCompleteScriptUrl;
		}
			
		searchInput.autocomplete(
				autoCompleteScriptUrl,
				{
					width : 200,
					minChars: 2,
					max : 5000,
					selectFirst : true,                                                                                                                                                                                                                                                                                                                                   
					matchSubset: false,
					encSpace: this.encSpace || null  // default is %20
				}
		);
		searchInput.result(this.resultHandler);
	},
	
	/**
     * Read the respond from the server as a JSON object, clean layer and add a marker.
     * 
     * @param result {Object}
     */
	
	resultHandler : function(result) {
			sMap.events.triggerEvent("decidewhattodo", this, {
			    poi : result.target.value
			});
	},
	
	/**
	 * Decides what to do with the autocomplete result
	 * either read a poi from server and add a marker or search for an object in a layer
	 * @param e
	 * 	- poi {String} the value from the autocomplete
	 */
	decidewhattodo : function(e){
		if (this.searchScriptUrl) {
			sMap.events.triggerEvent("addmarkerataddress", this, {
			    poi : e.poi
			});
		}else{
			sMap.events.triggerEvent("searchlayer", this, {
				layer : this.searchLayer,
				attributes : this.searchAttributes,
				option : "EQUAL_TO",
			    q : e.poi
			});
		}
	},
	
	/**
	 * Handle params.
	 * 
	 *
	 */
	
	afterapplyingwebparams : function(){
		var paramsObj = sMap.cmd.getStartingParamsAsObject();
		
		if (paramsObj.POI) {
			//If both POI and COORDS exists, then POI "wins"
			if (paramsObj.QL && paramsObj.QA) {
				sMap.events.triggerEvent("searchlayer", this, {
					layer : paramsObj.QL,
					attributes : [paramsObj.QA],
					option : "EQUAL_TO",
				    q : paramsObj.POI
				});
			}
			else {
				sMap.events.triggerEvent("addmarkerataddress", this, {
				    poi : paramsObj.POI,
				    zoom : paramsObj.ZOOM || this.zoomLevel
				    //center : paramsObj.CENTER || null    not implemented yet
				});
			}
		}
		else if (!paramsObj.POI && paramsObj.COORDS) {
			var c = paramsObj.COORDS;
			c = c.toString();
			c = c.replace(","," ");
			this.handleCoords(c);
		}
		
		else{
			return; // No POI or COORDS in querystring --> nothing happens.
		}
	},
	
	/**
     * Toggles the searchoptions-div underneath the searchbox.
     * The option appendAsOwnDiv must be set to true in Search_conf.js.
     * 
     */
	
	toggleOptionsDiv : function(e) {
		var self = this;
		
		if( !self.firstTime ){
			var optionsMenuDiv = self.optionsMenuDiv,
				searchInput = $("#searchBox");
					
			var boxOffset = searchInput.offset(),
				boxWidth = searchInput.outerWidth(),
				boxHeight = searchInput.outerHeight();
				
			$(optionsMenuDiv).css({
				"left" : boxOffset.left,
				"position" : "absolute",
				"top" :  boxOffset.top + boxHeight,
				"width" : boxWidth
			});
		
			$("#toolbar-maindiv").append(optionsMenuDiv);
					
			//onChange of the dropDown
			$("#search-dropdownmenu").change(function() {
				var selectedCat = $(this).find("option:selected").text();
				self.changeCat(selectedCat);
			});	
					
			var startingCat = $("#search-dropdownmenu").find("option:selected").text();
			self.changeCat(startingCat);
			self.firstTime = 1;
		}
		$("#search-optionsmenu").toggle();
		return true;
	},
	
	/**
     * The default drawContent function
     * 
     */
	drawContent : function() {
		var self = this;
		if( self.noInput === true ){
			return;
		}
		sMap.events.triggerEvent("addtoolentry", this, {
			index : this.toolbarIndex,
			width : 200,
			margin: 10,
			tagID : "searchBox"
		});
		var searchBox = $("#searchBox");
		
		self.bindAutocompleteToId(searchBox);
		
		//self.handleParams();
		
		if (self.dropDownOption == true) {
			var dropDownItems = self.dropDownItems,
				temp = "";
			
			//Variable temp is used for building part of the drop-down menu
			for (var searchCat in dropDownItems){
				temp = temp + "<option value='" + dropDownItems[searchCat].searchBoxText + "'>" + searchCat + "</option>";
			}
			
			var dropDown = $("<select name='choices' id='search-dropdownmenu'>" + temp + "</select>");
			self.dropDown = dropDown;
			
			if (self.appendAsOwnDiv != true){
				sMap.events.triggerEvent("addselect", self, {
				   selectObject : dropDown,
				   index : self.dropDownIndex,
				   appendToSearch : self.appendToBox
				});
			}
			else{
				sMap.events.triggerEvent("addtoolbutton", self, {
					index : self.dropDownIndex,
					on : self.toggleOptionsDiv,
					off : self.toggleOptionsDiv,
					hoverText : self.lang.hoverBtnText,
					iconCSS : "ui-icon-wrench",
					tagID : "button-searchoptions",
					appendToSearch : self.appendToBox
				});
				var optionsMenuDiv = self.createOptionsMenu();
				var innerDiv = $("<div id='search-innerdiv' class='ui-widget-content' />");
				
				var closeBtn = $("<div id='search-btnclose' class='ui-button-icon-primary ui-icon ui-icon-close' title='" + self.lang.closeTxt + "' />");
				var header = $("<div id='search-header'>" + self.lang.optionsHeader + "</div>");
				
				innerDiv.append(header).append(closeBtn).append(dropDown);

				optionsMenuDiv.append(innerDiv);
				
				searchBox.focus(function(){
					if ( $("#search-optionsmenu").is(":visible") ){
						$("#button-searchoptions").click();
					}
				});
				
				// Hide options on close-button click, and render button-searchoptions as inactive.
				closeBtn.click(function(e) {
					$("#button-searchoptions").click();
				});
			}
		}
	},
	
	/**
	 * Create the container for the menu.
	 * 
	 * @returns optionsMenuDiv {jQuery-object}
	 *      
     */
	
	createOptionsMenu : function() {
		var optionsMenuDiv = $("<div id='search-optionsmenu' />");
		optionsMenuDiv.addClass("ui-widget ui-widget-clearfix").hide();
		
		this.optionsMenuDiv = optionsMenuDiv;
		
	return this.optionsMenuDiv;
	},
	
	/**
     * Creates a poilayer.
     * @returns {Object}
	 *     - poiLayer {OpenLayers.Layer.Vector}
     * 
     */
	
	createPoiLayer : function(){ 
		var t = this.poiLayer;
		t.displayName = this.lang.searchLayerDisplayName;
		var poiLayer = new OpenLayers.Layer.Vector(t.name, {
			styleMap: new OpenLayers.StyleMap({
				"default": new OpenLayers.Style(t.defaultStyle)
			}),
			projection: new OpenLayers.Projection(this.map.projection),
			selectable: t.selectable,
			displayInLayerSwitcher: false
		});
		
		sMap.config.layers.overlays.push(t);
		
		sMap.events.triggerEvent("addlayer", this, {
			layer: poiLayer		
		});
		
	return poiLayer;
	},
	
	/**
	 * Listener to the event "cleanlayer".
	 * Removes feature(s) from layer. 
	 * 
	 *  @param e {Object}
	 *  	- layer {object}
	 *  	- poi {String} (default null)
	 *  	- coords {String} (default null)
	 *
	 * @returns {void}
	 */
	
	cleanlayer : function(e) {
		e.layer.destroyFeatures();
		this.lastSearchedPoi = e.poi || null;
		this.lastSearchedCoords = e.coords || null;
	},
	
	/**
	 * Listener to the event "addmarkerataddress".
	 * Creates a poiLayer (if there isn´t one already), 
	 * and adds a marker at the address.
	 * 
	 *  @param e {Object}
	 *  	- poi {String}
	 *  	- zoom {String}
	 * 		- setCenter {Boolean} (default true)
	 *		- cleanLayer {Boolean} (default true)
	 *		- center {Object} or {String}
	 *
	 * @returns
	 */
	
	addmarkerataddress : function(e) {
		var self = this; 
		var thePoi = e.poi,
			theZoom = e.zoom || self.zoomLevel,
			setCenter = e.setCenter === false ? false : true, //If not explicitly set to false, it is  true. The same holds for cleanLayer.
			cleanLayer = e.cleanLayer === false ? false : true;
			//center = e.center;  
		var poiLayer = self.map.getLayersByName("poiLayer")[0] || null;
		if (!poiLayer){
			var poiLayer = self.createPoiLayer();
		}
		if (self.searchScriptUrl.charAt(self.searchScriptUrl.length-1) === "?") {
			// Prevent double "?"
			self.searchScriptUrl = self.searchScriptUrl.substring(0, self.searchScriptUrl-1);
		}
		var queryUrl = self.searchScriptUrl + "?q=" + encodeURIComponent(thePoi);
		
		function handler(request){
			var map = self.map,
				format = new OpenLayers.Format.GeoJSON(),
				feature = format.read(request.responseText)[0];
			if (!feature || feature.length==0) {
				self.addInfoMsg.call(self, thePoi);
				return; // if it cant read it - escape from function
			}
			else {
				self.lastSearchedCoords = null;
				self.lastSearchedPoi = thePoi; // store the address (and continue)
			}
			var poiLayer = map.getLayersByName("poiLayer")[0] || null;
			if (cleanLayer === true) {
				poiLayer.destroyFeatures();
			}
			if (feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Point"){ //Add not line and polygon features
				poiLayer.addFeatures([feature]);
				poiLayer.setZIndex(699);
			}
			if (setCenter === true) {
                if (feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Polygon"||feature.geometry.CLASS_NAME == "OpenLayers.Geometry.LineString"){
                	sMap.map.zoomToExtent(feature.geometry.getBounds());
                }
                else {
                    sMap.map.setCenter(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y), theZoom);
                }
            }
						
		}
		var request = OpenLayers.Request.GET({
		    url: queryUrl,
		    callback: handler
		});
    },
	
    /**
     * @param fromEPSG {String}
     * @param toEPSG {String}
     * @param x {Number}
     * @param y {Number}
     * @returns {Proj4js.Point}
     */
    
    transformCoords : function(fromEPSG, toEPSG, x, y) {
    	fromEPSG = fromEPSG.toUpperCase();
    	toEPSG = toEPSG.toUpperCase();
    	var p = new Proj4js.Point(x, y);
    	//Problems when the definitions only were in an external file, hence they are declared below.
    	Proj4js.defs["EPSG:3008"] = "+proj=tmerc +lat_0=0 +lon_0=13.5 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
    	Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ";
    	
        var projSource = new Proj4js.Proj(fromEPSG); // source projection
        var projDest = new Proj4js.Proj(toEPSG); // destination projection
        Proj4js.transform(projSource, projDest, p);
        return p;
    },    
    
    /**
	 * Listener to the event "addmarkeratcoords".
	 * Adds a marker at the coords. Only works well for points at the moment.
	 * 
	 *  @param e {Object}
	 *  	- coords {Object} || {String}
	 *  		x,y. E.g. coords="12.7005,56.053".
	 *  		If String, values will be split according to "," in the string. 
	 *      - zoom {String}
	 *      - geomType {String}
	 *      
	 * @returns
	 */	
	
	addmarkeratcoords : function(e) {
    	var self = this,
    		map = self.map;
    	var coords = e.coords, //x,y					
    		theZoom = e.zoom || self.zoomLevel,
    		geomType = e.geomType || "Point",
    		cleanLayer = e.cleanLayer === false ? false : true;
    	
    	var poiLayer = map.getLayersByName("poiLayer")[0] || null;
        if (!poiLayer){
			var poiLayer = self.createPoiLayer();
		}
        if (cleanLayer===true) {
            poiLayer.destroyFeatures();
        }
    	
		coords = typeof(coords)=="string" ? coords.split(",") : coords;
		var east = parseFloat(coords[0]),
	    	north = parseFloat(coords[1]);
    	
    	//Display an error if any coordinate is out of bounds.
    	var maximalExtent = sMap.config.maxExtent;
    	if (east > maximalExtent.e || east < maximalExtent.w || north > maximalExtent.n || north < maximalExtent.s) {
    		self.addInfoMsg.call(self, "eller de koordinater");
    		return;
    	}
    	else {
    		poiCoords = coords.toString();
    		self.lastSearchedPoi = null;
    		self.lastSearchedCoords = poiCoords;// store the coords (and continue)
		}
    	
    	var coordsObj = e.allCoordinates,    	
    		codes = [],
    		t = [];
		$.each(coordsObj, function(key, val){
			codes.push(key);
			t.push(val[0],val[1]);
		});
    	
        var geoJSONObject = {
        	"type": "FeatureCollection",
        	"features": [{
        		"type": "Feature",
        		"geometry": {
        			"type": geomType,
        			"coordinates": [
        			                east,
        			                north
        			                ]
        		},
        		"properties": {
        			"specialForCoordinateSearch" : true,
        			"code1" : codes[0],
        			"east1" : t[0],
        			"north1" : t[1],
        			"code2" : codes[1],
        			"east2" : t[2],
        			"north2" : t[3],
        			"code3" : codes[2],
        			"east3" : t[4],
        			"north3" : t[5],
        			"code4" : codes[3],
        			"east4" : t[6],
        			"north4" : t[7],
        			"code5" : codes[4],
        			"east5" : t[8],
        			"north5" : t[9]
        		}  
        	}]
        };
        
        //Use for test epsg:3008 --> 100191,6214761. Epsg:4326--> 12.7005, 56.053
        
        var format = new OpenLayers.Format.GeoJSON();
        var feature = format.read(geoJSONObject)[0];
       
        if (feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Point"){ //Add not line and polygon features
        	poiLayer.addFeatures([feature]);
            poiLayer.setZIndex(699);
        }
        sMap.map.setCenter(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y), theZoom);
	},			
			
	/**
	 * Add class and event to drop-down menu. The dropDownOption must be set to true in Search_conf.js.
	 */
		
	added : function() {
		var self = this,
		dropDownMenu = $("#search-dropdownmenu");
		dropDownMenu.addClass('search-dropdown');
			
		//onChange of the dropDown
		$('.search-dropdown').change(function() {
			var selectedCat = $(this).find("option:selected").text();
			self.changeCat(selectedCat);
		});
	},
	/**
	 * Check bounds. Display an error if any coordinate is out of bounds.
	 */
	
	checkBounds : function(coordsPair){
    	var maximalExtent = sMap.config.maxExtent;
    	if (coordsPair.x > maximalExtent.e || coordsPair.x < maximalExtent.w || coordsPair.y > maximalExtent.n || coordsPair.y < maximalExtent.s) {
			return false;
    	}
    	else{
    		return true;
    	}
	},
	
	/**
	 * Handle coordinate-search.
	 */
	
	handleCoords : function(userCoordinates){
		var self = this;
		//Allow for both period and comma as decimal-seperator.
		var theCoords = userCoordinates.replace(",",".");
		var eastnorth = theCoords.split(" ");
		var east = parseFloat(eastnorth[0]);
		var north = parseFloat(eastnorth[1]);
			
		//Display an error if any of the coordinates is not a number
		if (isNaN(east) || isNaN(north)){
			self.addInfoMsg("NaN", 'Enbart siffror tillåtna. Prova igen (t.ex " 100191 6214761 ")');
			return;
		}
		
		var epsgCodes = self.epsgCodes;
		var theEpsg = null;
		var diffCoords=[];
		for(var i = 0; i<epsgCodes.length;i++){
			var c = epsgCodes[i];
			var p = sMap.util.projectPoint(c, sMap.config.projection, east, north);
			var boundsTest = this.checkBounds(p);
			//console.log(boundsTest);
			if (boundsTest == true){
				theEpsg = c; //Add the epsg-code as key and the coords as value.
				diffCoords = [p.x,p.y]; //Add the epsg-code as key and the coords as value.
				break;
			}
			else{
				continue;
			}
		}
		//if($.isEmptyObject(resultObj) == true){alert("out of bounds");return;}
		var allCoords = {};
		if(theEpsg == null){
			self.addInfoMsg("OutOfBounds", 'Koordinaterna ligger inte i kartans utsträckning. Prova igen (t.ex " 100191 6214761 ")');
			return;
		}
		else{
			for(var i = 0; i<epsgCodes.length;i++){
				var d = epsgCodes[i];
				var e = sMap.util.projectPoint(sMap.config.projection, d, diffCoords[0], diffCoords[1]);
				var x = e.x.toFixed(2);
				var y = e.y.toFixed(2);
				allCoords[d] = [x,y];
			}
		}
		
		sMap.events.triggerEvent("addmarkeratcoords", this, {
			    coords : diffCoords, //x,y 
			    zoom : this.zoomLevel,
			    epsg : theEpsg,
			    allCoordinates : allCoords
			    //center : paramsObj.CENTER || null    not implemented yet
			});
	},
	
	/**
     *  What happens onchange of the drop-down.
     *  Note that dropDownOption must be set to true in Search_conf.js.
     *  
     *  @param category {String}
     *  
     */
	
	changeCat : function(category) {
		var self = this,
			catOptions = self.dropDownItems[category],
			searchBox = $("#searchBox");
		
		searchBox.val(catOptions.searchBoxText);
		
		//Remove autocomplete and previous event-handlers in namespace "box" (if any).
		searchBox.unautocomplete().off('.box');
		
		//change the paths to searchscripts
		self.autoCompleteScriptUrl = catOptions.autocompleteScript;
		self.searchScriptUrl = catOptions.searchScript;
		if (!catOptions.searchScript && catOptions.searchLayer && catOptions.searchAttributes){
			self.searchLayer = catOptions.searchLayer;
			self.searchAttributes = catOptions.searchAttributes;
		}
		
		/**
	     *  
	     *  If appendAsOwnDiv is set to true in Search_conf.js, bind another handler on:
	     *  	-focus 
	     *  		call click-event of button-searchoptions, only if the div underneath the
	     * 			searchbox is visible.
	     * 
	     *  If (else instantiate autocomplete) searchCatCoords is set to true in Search_conf.js 
	     *  and if category equals "Koordinater", bind handler on:
	     *  	-keypress
	     *  		search when user hits Enter-key.
	     * 
	     */
		
		searchBox.on('focus.box', function() {
			if ($(this).val() == catOptions.searchBoxText) {
				$(this).val("");
	    	}
	    }).on('focusout.box', function() {
			if ($(this).val()=="") {
				$(this).val(catOptions.searchBoxText);
			}
		});
		
		if (self.appendAsOwnDiv == true){
			searchBox.on('focus.box',function(){
				if ( $("#search-optionsmenu").is(":visible") ){
					$("#button-searchoptions").click();
				}
			});
		}

		if(self.searchCatCoords == true && category == "Koordinater"){
			self.addInfoMsg(" ", self.lang.helpTxt);
			searchBox.on('keypress.box',function(e) {
				if(e.keyCode == 13) {
					self.handleCoords($(this).val());
				}
			});
		}
		else{
			$('#searchBox').autocomplete(
				self.autoCompleteScriptUrl,
		    		{
			    		width : 300,
			    		minChars: 2,
						max : 5000,
			    		selectFirst : true,                                                                                                                                                                                                                                                                                                                                   
						matchSubset: false,
						noResultText: self.noResultText
		    		}
		    );
			searchBox.result(self.resultHandler);
		}
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Search"	
});﻿sMap.moduleConfig.Search = {
		
		activateFromStart : true,
		
		noInput : false, //If set to true - do not add searchbox to GUI.
		
		
		/**
		 * Custom encoding of space character for autocomplete script. Default is %20 (since using encodeURIComponent() )
		 */
		encSpace: null,
		
		
		/**
		 * If module class name specified the container module will create a default visual
		 * interface (typically a button) for interacting with the module (typically activate/deactivate).
		 */
		
		/**
		 * Variables 'startText', 'autoCompleteScriptUrl' and searchScriptUrl' 
		 * are NOT used if dropDownOption is set to true!
		 * Instead values from the object dropDownItems (below) will be used).
		 * 
		 */
		
		startText : "Ange adress eller plats",
		autoCompleteScriptUrl : "http://kartor.smap.se/cgi-bin/search/sok.py?",
		searchScriptUrl : "http://kartor.smap.se/cgi-bin/search/sokexakt.py",
		
		/**
		 * If no zoomlevel is sent in as a CGI-parameter, the value below will be used. 
		 * This value will also be used when searching inside the application.
		 * 
		 */
		zoomLevel : 9,
		
		poiLayer : {
			name : "poiLayer",
			displayName : "", // Fetched from lang object
			layerType: "vector",
			geomType : "point",
			selectable : true,
			displayInLayerSwitcher : false,
			defaultStyle: {
				externalGraphic : "img/location.png",
				graphicWidth : 18,
		        graphicHeight : 18,
		        graphicXOffset: -9,
		        graphicYOffset: -9
			},
			rmBtn : true, //Remove-button in popup.
			popup : "<div class='popup-header1'>${name}</div>",
			popupCoordinates : "<div class='popup-header1'>Koordinat</div>" +
					"<div class='search-popup1'>${code1}:</div>" +
					"<div class='search-popup'> ${east1}, ${north1}</div>" +
					"<div class='search-popup1'>${code2}:</div>" +
					"<div class='search-popup'> ${east2}, ${north2}</div>" +
					"<div class='search-popup1'>${code3}:</div>" +
					"<div class='search-popup'> ${east3}, ${north3}</div>" +
					"<div class='search-popup1'>${code4}:</div>" +
					"<div class='search-popup'> ${east4}, ${north4}</div>" +
					"<div class='search-popup1'>${code5}:</div>" +
					"<div class='search-popup'> ${east5}, ${north5}</div>"
	    },
	    
	    //search via sMap.config.proxyHost (boolean)
	    useProxy : true,
	    
	    /**
		 * Below are options for including a drop-down, with different search criterias.
		 * 
		 * 	- dropDownOption {Boolean}
		 * 		whether or not to include a drop-down
		 * 
		 * - selId {String}
		 * 		id of the drop-down (<select>)
		 * 
		 * - appendAsOwnDiv {Boolean}
		 * 		If true, puts the drop-down in a div underneath the searchBox.
		 * 		The div is toggled via an icon-only button in the toolbar, and gets hidden
		 * 		when the searchBox gains focus.
		 * 
		 * - appendToBox {Boolean}
		 * 		If true, puts the drop-down (or the icon-only button mentioned above under 'appendAsOwnDiv')
		 * 		close beside searchBox.
		 * 
		 * - dropDownIndex {Number}
		 * 		Toolbarindex for drop-down (or the icon-only button mentioned above under 'appendAsOwnDiv').
		 * 		If appendToBox is set to true, the dropDownIndex will be ignored.
		 * 
		 * - dropDownItems {Object}
		 * 		Paths to searchscripts etc. for the different categories.
		 * 
		 */
	    
	    dropDownOption : true,
	    selId : "search-dropdownmenu",
		appendAsOwnDiv : true, 
		appendToBox : true,
		searchCatCoords : true,
		epsgCodes : ["EPSG:3006", "EPSG:3008", "EPSG:4326", "EPSG:3021", "EPSG:900913"],
		dropDownIndex : 10,
		dropDownItems : {
		    	"Koordinater": {
			   		"dropDownName" : "Koordinater",
			   		"searchBoxText" : "Sök koordinater",
			   		"autocompleteScript" : "http://kartor.smap.se/cgi-bin/search/sok.py?",
					"searchScript" : "http://kartor.smap.se/cgi-bin/search/sokexakt.py"
		   		},
				"Adresser": {
			   		"dropDownName" : "Adresser",
			   		"searchBoxText" : "Ange adress",
			   		"autocompleteScript" : "http://kartor.smap.se/cgi-bin/search/sok.py?",
			   		"searchScript" : "http://kartor.smap.se/cgi-bin/search/sokexakt.py"
			   	},
			   	"Fastigheter": {
			   		"dropDownName" : "Fastigheter",
			   		"searchBoxText" : "Ange fastighet",
			   		"autocompleteScript" : "http://kartor.smap.se/cgi-bin/search/sok.py?",
			   		"searchScript" : "http://kartor.smap.se/cgi-bin/search/sokexakt.py"
			   	}
		}
};sMap.Lang.lang.Search = {
	"sv-SE" : {
		noPoiBtnClose : "Stäng",
		hoverBtnText : "Sökalternativ",
		closeTxt : "Stäng",
		optionsHeader : "Sökalternativ",
		noPoiPreTxt : "Den adress ( ",
		noPoiPostTxt : " ) som länkar till kartan är felaktigt angiven! Vänligen meddela den som är ansvarig för den sida du aktiverade kartan från.",
		helpTxt : 'Separera med mellanslag, t.ex. "12.70 56.05". Både komma ' +
		'och punkt fungerar som decimalavskiljare. Sök med "enter".',
		searchLayerDisplayName: "Sökning"
	},
	en : {
		noPoiBtnClose : "Close",
		hoverBtnText : "Searchoptions",
		closeTxt : "Close",
		optionsHeader : "Searchoptions",
		noPoiPreTxt : "The address ( ",
		noPoiPostTxt : " ) that links to the map is not correctly written! Please contact the administrator for the page you activated the map from.",
		helpTxt : 'Seperate the coordinates with space, e.g "12.70 56.05". Both comma ' +
		'and period work as decimaldelimiters. Search with "enter".',
		searchLayerDisplayName: "Search result"
	}
	
};/**
 * @author Johan Lahti
 * @copyright Malmö stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Select = OpenLayers.Class(sMap.Module, {
	
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
	 * "select": Will render one or more features as selected.
	 *     - add {Boolean} (default false) If true, old selected features will not be unselected
	 *     					before selecting new features.
	 *     - dialog {Boolean} (default false). If true, a dialog will be created if more than one
	 *     					feature was fetched. If false, all fetched features will be selected.
	 * "unselect": Will render a feature as unselected. If no feature
	 *     in the event object, all features in the selection array will be unselected.
	 * "getfeatures": Requests all visible layers (or input layers) and collects all
	 *     features matching the filter or bounds.
	 * "fetchandselectfeatures": Triggers "getfeatures" and then selects found features.
	 *     Takes a filter or bounding box as input.
	 */
	EVENT_LISTENERS : ["select", "unselect", "fetchselectfeatures", "layerhidden", "afterprint", "fetchedfeatures", "selectboxmode","selectclickmode"],
	
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
	EVENT_TRIGGERS : ["selected", "unselected", "beforeselect", "beforeunselect", "getfeatures",  "fetchselectfeatures"],
	
	handlers : {},
	
	/**
	 * @property clickedOnDialogRow {Boolean}
	 *     A hack to keep track of when user has clicked on a row in the
	 *     select choice dialog, so that unselect is not triggered on hover out.
	 */
	clickedOnDialogRow : false,
	
	/**
	 * @property selectLayer {OpenLayers.Layer.Vector}
	 * 		The layer which is used for rendering WFS and vector features.
	 */
	selectLayer : null,
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Select.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Select.prototype.EVENT_TRIGGERS.concat(
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
		
		// Bind click to triggering of event "fetchselectfeatures".
		switch (this.handlerType) {
		case ("box"):
			this.bindBox();
			break;
		default:
			this.bindClick();
		}
		
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		if (this.addSelectWithKey) {
			var nav = this.map.getControlsByClass("OpenLayers.Control.Navigation")[0];
			nav.enableZoomBox();
		}
		
		// Don't request features on map click.
		for (var name in this.handlers) {
			this.handlers[name].deactivate();
		}
		
		// Call the deactivate function of the parent class
		return sMap.Module.prototype.deactivate.apply(
	            this, arguments
	        );
	},
	
	destroy : function() {
		
		// Destroy select layer
		this.map.removeLayer(this.selectLayer);
		this.selectLayer.destroy();
		
		// Destroy dialog
		var dialog = $("#select-selectdialog");
		if (dialog.length) {
			dialog.dialog("destroy");
			dialog.empty().remove();
			dialog = null;
		}
		
		
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		// When allowing to select multiple features - disable shift zoom
		// since this will not allow multiple select.
//		if (this.addSelectWithKey) {
//			var nav = this.map.getControlsByClass("OpenLayers.Control.Navigation")[0];
//			nav.disableZoomBox();
//		}
		
		this.addSelectLayer();
	},
	
	
	afterprint: function(e) {
		this.selectLayer.setZIndex(this.zIndex);
	},
	
	/**
	 * When a layer is hidden – unselect any selected features
	 * if they belong to this layer.
	 * @param e
	 */
	layerhidden: function(e) {
		sMap.events.triggerEvent("unselect", this, {});
	},
	
	addSelectLayer : function() {
		// Add select layer
		this.selectLayer = new OpenLayers.Layer.Vector("selectLayer", {
			styleMap : new OpenLayers.StyleMap({
				"default" : new OpenLayers.Style(this.defaultStyle),
				"select" : new OpenLayers.Style(this.selectStyle)
			}),
			rendererOptions: {yOrdering: true, zIndexing: true}
		});
		this.map.addLayer(this.selectLayer);
		this.selectLayer.setZIndex(this.zIndex);
		
		// Store styleMap since it will be overridden when adding features,
		// and we want it back after that.
		this.selectLayerStyleMap = {};
		OpenLayers.Util.applyDefaults(this.selectLayerStyleMap, this.selectLayer.styleMap);
	},
	
	selectclickmode : function(e){
		this.bindClick();
	},
	
	bindClick : function() {
		if (this.handlers.box) {
			this.handlers.box.deactivate();
		}
		this.handlers.click = this.handlers.click ||
					new OpenLayers.Handler.Click(this,
				{click: this.onClick}, this.handlerOptions.click );
		this.handlers.click.activate();
		
	},
	
	selectboxmode : function(e){
		this.bindBox();
	},
	
	bindBox : function() {
		if (this.handlers.click) {
			this.handlers.click.deactivate();
		}
		this.handlers.box = this.handlers.box ||
					new OpenLayers.Handler.ModBox(this,
				{done: this.onBoxEnd}, this.handlerOptions.box );
		this.handlers.box.activate();
	},
	
	/**
	 * On click inside the map...
	 * @param e {Object}
	 * @returns {void}
	 */
	onClick : function(e) {
		var x = e.xy.x,
			y = e.xy.y,
			r = this.clickRadius;
		var shiftKeyPressed = e.shiftKey,
			addSelectWithKey = this.addSelectWithKey,
			dialogIfMany = this.dialogIfMany;
		
		/**
		 * Before the selection occurrs. This event might be
		 * unnecessary since "fetchselectfeatures" would work fine.
		 * However, "beforeselect" is triggered a little earlier
		 * and also has a more appropriate name.
		 */
		sMap.events.triggerEvent("beforeselect", this, {
			xy : e.xy,
			add : (addSelectWithKey && shiftKeyPressed),
			dialog : !shiftKeyPressed//dialogIfMany show dialog if shiftkey is not pressed
		});
		
		
		var pxSW = new OpenLayers.Pixel(x-r, y+r),
			pxNE = new OpenLayers.Pixel(x+r, y-r);
		var lonLatSW = this.map.getLonLatFromViewPortPx(pxSW),
			lonLatNE = this.map.getLonLatFromViewPortPx(pxNE);
		var bounds = new OpenLayers.Bounds(lonLatSW.lon, lonLatSW.lat, lonLatNE.lon, lonLatNE.lat);
		
		sMap.events.triggerEvent("fetchselectfeatures", this, {
			bounds : bounds,
			add : (addSelectWithKey && shiftKeyPressed),
			dialog : !shiftKeyPressed//dialogIfMany show dialog if shiftkey is not pressed
		});
	},
	
	onBoxEnd : function(box) {
		var shiftKeyPressed = this.handlers.box.dragHandler.keyMaskPressed,
			bounds = null,
			addSelectWithKey = this.addSelectWithKey,
			dialogIfMany = this.dialogIfMany;

		if (box.CLASS_NAME == "OpenLayers.Pixel") {
			// Make the point into a bounds based on click radius.
			var r = this.clickRadius;
			var pxSW = new OpenLayers.Pixel(box.x-r, box.y+r),
				pxNE = new OpenLayers.Pixel(box.x+r, box.y-r);
			var lonLatSW = this.map.getLonLatFromViewPortPx(pxSW),
				lonLatNE = this.map.getLonLatFromViewPortPx(pxNE);
			bounds = new OpenLayers.Bounds(lonLatSW.lon, lonLatSW.lat, lonLatNE.lon, lonLatNE.lat);
		}
		else if (box.CLASS_NAME == "OpenLayers.Bounds") {
			var pxSW = new OpenLayers.Pixel(box.left, box.bottom),
				pxNE = new OpenLayers.Pixel(box.right, box.top);
			var lonLatSW = this.map.getLonLatFromViewPortPx(pxSW),
				lonLatNE = this.map.getLonLatFromViewPortPx(pxNE);
			bounds = new OpenLayers.Bounds(lonLatSW.lon, lonLatSW.lat, lonLatNE.lon, lonLatNE.lat);
		}
		sMap.events.triggerEvent("fetchselectfeatures", this, {
			bounds : bounds,
			add : (addSelectWithKey && shiftKeyPressed),
			dialog : !shiftKeyPressed//dialogIfMany show dialog if shiftkey is not pressed
		});
		
	},
	
	/**
	 * Get all features matching the input filter or bounds and then select
	 * them. If no parameter layers is sent in, only visible layers will be requested. Note
	 * that only layers in the config.overlays array will be requested.
	 * @param e
	 *     - filter {OpenLayers.Filter} {Optional}
	 *     - bounds {Array} {Optional} [s, w, n, w]
	 *     - layers {Array ({String})} An array containing layer names of
	 *              the layers that will be requested.
	 *     - add {Boolean} (default false) If true, old selected features will not be unselected
	 *     					before selecting new features.
	 *     - dialog {Boolean} (default false). If true, a dialog will be created if more than one
	 *     					feature was fetched. If false, all fetched features will be selected.
	 * @returns {void}
	 */
	fetchselectfeatures : function(e) {
		this.add = e.add;
		this.useDialog = e.dialog || false;
		
		// When features have been fetched - select it/them but ONLY
		// if fetchselectfeatures was triggered.
		// Get the features. The listener, just defined above, will respond.
		sMap.events.triggerEvent("getfeatures", this, {
			options: {
				filter : e.filter || null,
				bounds : e.bounds || null,
				select: true // select features after fetch
			}
		});
	},
	
	fetchedfeatures: function(evt) {
		var features = evt.features;
		if (evt.select && features.length) {
			if (this.forceOne && this.forceOne === true) {
				// Get the nearest feature from the click.
				features = [sMap.util.getNearestFeature(features, evt.bounds.getCenterLonLat())];
			}
			
			sMap.events.triggerEvent("select", this, {
				features : features,
				add : this.add,
				dialog : this.useDialog
			});
		}
		else {
			sMap.events.triggerEvent("unselect", this, {});
		}
	},
	
	/**
	 * Select one or more features. If more than one
	 * a select dialog will be created.
	 * @param e {Object}
	 *     - features {Object} || {Array( {OpenLayers.Feature.Vector} )}
	 *             If Object, the array of features is keyed by layer name.
	 * @returns {void}
	 */
	select : function(e) {
		var features = e.features;
		
		if (!features.length) {
			return false;
		}
		
		if (e.add === true) {
			/**
			 * Features will be added to current selection (shift/ctrl-click).
			 * Features that are already selected and about to 
			 * be selected again will be unselected ("toggled").
			 */
			var featuresDict = this.toggleSelection(features);
			features = featuresDict.select; // These guys will be selected
			sMap.events.triggerEvent("unselect", this, {
				features : featuresDict.unselect // These guys will be unselected
			});
		}
		else {
			// We don't want to add features to old selection if add!==true
			sMap.events.triggerEvent("unselect", this, {
				doNotDestroy: e.doNotDestroy
			});
		}
		// Else - just add the feature(s) right off...
		if ($("#select-selectdialog").length) {
			$("#select-selectdialog").dialog("close");				
		}
		
		if (e.dialog === true && features.length > 1) {
			// Create a dialog where user has to pick one feature.
			this.createChoiceDialog(features, {
				add : e.add
			});
		}
		else {
			this.selectFeatures(features, {
				add : e.add
			});
		}
		debug.log("Number of selected features: " + this.selectLayer.features.length);
	},
	
	
	/**
	 * Creates two arrays:
	 * - select
	 * - unselect
	 * 
	 * Removes features which are already selected from the select array
	 * and adds them to a new array of features which should be unselected.
	 * @param features {Array({OpenLayers.Feature.Vector})}
	 * @returns {Object}
	 *     - select -> {Array({OpenLayers.Feature.Vector})}
	 *     - unselect -> {Array({OpenLayers.Feature.Vector})}
	 */
	toggleSelection : function(features) {
		var selectArr = [],
			unselectArr = [],
			f = null,
			selectedFeatures = this.selectLayer.features;
		for (var i=0,len=selectedFeatures.length; i<len; i++) {
			f = selectedFeatures[i];
		}

		for (var i=0,len=features.length; i<len; i++) {
			f = features[i];
			//var popup = f.popup || null;
			
			var index = this.featureInArray(selectedFeatures, f);
			if (index === -1) {
				selectArr.push(f);
				//f.popup = popup;
			}
			else {
				unselectArr.push(f);
				//f.popup = popup;
			}
		}
		
		
		return {
			select : selectArr,
			unselect : unselectArr
		};
	},
	
	/**
	 * Checks if feature f is present in an array of features.
	 * The comparison is made using function "featureIsSame".
	 * 
	 * @param features {Array({OpenLayers.Feature.Vector})}
	 * @param f {OpenLayers.Feature.Vector}
	 * @returns {Integer} -1 is not present. Otherwise returns the index
	 *     where feature was found.
	 */
	featureInArray : function(features, f) {
		var oldF;
		for (var i=0,len=features.length; i<len; i++) {
			oldF = features[i];
			
			// Check if features are the same -> here defined as "geometry and attributes are the same".
			if (this.featureIsSame(oldF, f)) {
				return i;
			}
		}
		return -1;
	},
	/**
	 * Checks if two features are same by comparing their geometry
	 * and data properties. If both are matching, returns true. Otherwise
	 * false.
	 * @param oldF {OpenLayers.Feature.Vector}
	 * @param f {OpenLayers.Feature.Vector}
	 * @returns {Boolean}
	 */
	featureIsSame : function(oldF, f) {
		var result = false;
		if (oldF.geometry && oldF.data && f.geometry && f.data) {
			result = (oldF.geometry.toString() == f.geometry.toString() && oldF.data.toString() == f.data.toString() );
		}
		return result;
	},
	
	/**
	 * Unselect one or more features. If no parameter features is
	 * sent in all currently selected features will be unselected.
	 * @param e {Object}
	 *     - features {Array( {OpenLayers.Feature} )} Optional.
	 * @returns {void}
	 */
	unselect : function(e) {
		var features = e.features,
			doNotDestroy = e.doNotDestroy || false;
			selectLayer = this.selectLayer;
		if (!features) {
			// Unselect ALL features (if any).
			features = selectLayer.features;
		}
		if (features.length) {
			// Unselect all features in the array
			// Make a copy of the features array so that we are not
			// iterating over the array we are modifying.
			var f = null,
				_features = features.slice();
			
			/**
			 * If you want to retrieve the features that were unselected you should
			 * listen to this event instead of "unselected" since the features will
			 * be destroyed (if you don't send in doNotDestroy==true).
			 */
			sMap.events.triggerEvent("beforeunselect", this, {
				features : features // The feature(s) that will be unselected.
			});
			
			for (var i=0,len=_features.length; i<len; i++) {
				f = _features[i];
				var popup = f.popup || null;
				this.renderAsUnselected(f, {
					doNotDestroy : doNotDestroy
				});
				f.popup = popup;
			}
			
			sMap.events.triggerEvent("unselected", this, {
				features : features, // The feature(s) that were unselected.
				selectedFeatures : this.selectLayer.features // Remaining selected features after features have been unselected.
			});
		}
	},
	/**
	 * Render a feature as unselected (removes it from selectLayer).
	 * @param f {OpenLayers.Feature.Vector}
	 * @param options {Object}
	 *     - doNotDestroy {Boolean} If true, feature f and lf will not be destroyed, only removed.
	 * @returns {void}
	 */
	renderAsUnselected : function(f, options) {
		options = options || {};
		var doNotDestroy = options.doNotDestroy || false;
		
		if (f) {
			var selectLayer = this.selectLayer;
			// Remove feature from selection arrays (for draw layer and for select module).
			//OpenLayers.Util.removeItem(this.selectedFeatures, f); // select module

			
			
			//var defStyle = selectLayer.name=="selectLayer" && f.oldStyle ? f.oldStyle : selectLayer.styleMap.styles["default"].defaultStyle;
			f.layer = selectLayer;
			
			// Destroy features in select layer. The problem here is that the feature we've got
			// is not the same feature as in the selectLayer. Therefore we need to find the
			// feature's twin and remove this one. This is done by comparing geometry and
			// data properties of the features.
			var layersFeatures = selectLayer.features;
			for (var i=0,len=layersFeatures.length; i<len; i++) {
				var lf = layersFeatures[i];
				if (!lf || !f) {
					// If one of the features don't exist - a feature might have disappeared
					// from selectLayer after checking its length... In this case, break.
					break; 
				}
				if ( this.featureIsSame(lf, f) ) {
					
					if (doNotDestroy === true) {
						selectLayer.removeFeatures([lf]);
					}
					else {
						//selectLayer.removeFeatures([lf]);
						selectLayer.destroyFeatures([lf]); // destroy feature in layer
						f.destroy(); // destroy feature sent in to this function
					}
				}
			}
		}
	},
	
	/**
	 * Select all features in the array. Viable options are:
	 * - add {Boolean} Add features to current selection.
	 * - dialog {Boolean} Show a dialog (if more than one feature
	 *        in array) where user is forced to pick one feature to
	 *        select.
	 * 
	 * @param features {Array({OpenLayers.Feature.Vector})} Containing features to be selected.
	 * @returns  {void}
	 */
	selectFeatures : function(features, options) {
		options = options || {};
		
		if (features.length==0) {
			return;
		}
		
		var add = options.add || false;
		
		//this.selectLayer.features = this.selectLayer.features.concat(features);
		// Render feature(s) as selected.
		for (var i=0,len=features.length; i<len; i++) {
			// Add to selected features array
			this.renderAsSelected( features[i] );
			//features[i].selectid = OpenLayers.Util.createUniqueID("sMap.Select.ID_");
		}
		// The point of sending along the parameter selectedFeatures
		// is that e.g. a pop-up should not be created
		// if more than one feature is selected at the same time.
		// Hack: selectedEvent allows to specify a custom name of the selected event.
		sMap.events.triggerEvent(this.selectedEvent || "selected", this, {
			features : features, // newly selected features
			selectedFeatures : this.selectLayer.features, // all selected features
			// 'add' let's listener know if the selection was added to previous
			// selection without comparing the arrays above.
			add : add,
			xy: options.xy || (this.handlers.click && this.handlers.click.evt ? this.handlers.click.evt.xy : null)
		});
	},
	/**
	 * Render a feature as selected by adding it to the selectLayer.
	 * The style of the feature is fetched from the configuration
	 * file's property "style". 
	 * @param feature {OpenLayers.Feature.Vector}
	 * @returns {void}
	 */
	renderAsSelected : function(feature) {
		
		var selectLayer = this.selectLayer;
		
		// Old style (unselected style) must be saved for WMS layers since it will otherwise
		// be derived from selectLayer when unselected.
		feature.oldStyle = {};
		OpenLayers.Util.applyDefaults(feature.oldStyle, feature.style);
		
		var t = sMap.cmd.getLayerConfig(feature.layerName);
		var _selectStyle = $.extend({}, this.selectStyle);
		var selectStyle = $.extend(_selectStyle, (t && t.style && t.style.select ? t.style.select : {})); //this.selectLayer.styleMap.styles["select"].defaultStyle);
		
		// If selectStyle contains externalGraphic – make sure this is kept at select.
//		if (feature.oldStyle.externalGraphic) {
//			selectStyle.externalGraphic = feature.oldStyle.externalGraphic;
//		}
		selectStyle.graphicZIndex = this.zIndex;
		
		
		if (selectStyle.rules) {
			var tempSelStyle = new OpenLayers.Style(selectStyle);
			tempSelStyle.addRules(selectStyle.rules);
			var tempStyleObj = tempSelStyle.createSymbolizer(feature);
			$.extend(selectStyle, tempStyleObj || {});
			tempSelStyle = null;
		}
		
		
		
//		var rules = selectStyle.rules,
//			rule = null,
//			symbolizer = null,
//			applies = false;
//		if (rules && rules.length) {
//			for (var i=0,len=rules.length; i<len; i++) {
//				rule = rules[i];
//				applies = rule.evaluate(feature);
//				if (applies) {
//					symbolizer = rule.symbolizer || null;
//					selectStyle = symbolizer || selectStyle;
////					$.extend(selectStyle, symbolizer); // extend or just assign, what to do?
//					break;
//				}
//			}
//		}
		feature.style = selectStyle;
		selectLayer.addFeatures([feature]);
		selectLayer.setZIndex(this.zIndex);
		selectLayer.drawFeature( feature, selectStyle );
	},
	
	
	/**
	 * Takes an array of layer configs and removes all layers that
	 * are either invisible or not added to the map.
	 * 
	 * @param arr {Array( {Object} )}
	 * @returns {void}
	 */
	getVisibleLayersConfig : function(arr) {
		var visible =  [];
		for (var i=0,len=arr.length; i<len; i++) {
			var layer = this.map.getLayersByName(arr[i].name)[0];
			if (layer && layer.CLASS_NAME == "OpenLayers.Layer.WMS" && layer.calculateInRange() && layer.getVisibility() === true) {
				visible.push(arr[i]);
			}
		}
		return visible;
	},

	/**
	 * 
	 * Send in an array of features to this method and it will either
	 * create a choice-dialog (if no. features > 1) or select the
	 * feature (if no. feature == 1). If array does not contain any
	 * features, nothing will happen. This function could be called
	 * from outside also to programmatically force select (or select-dialog...).
	 * 
	 * @param features {Array( Object | OpenLayers.Feature.Vector )}
	 *     An array of features.
	 * @param options {Object} Optional.
	 *     -
	 */
	createChoiceDialog : function(features, options) {
		var self = this;
		options = options || {};
		
		this.clickedOnDialogRow = false;
		
		this.fDict = {};
		// If any features were found... get the one(s) nearest to the click....
		if (features.length) {	
			
			//------ 1st: Create popup content. ------------------------
			// Add features in order - with the features nearest click position first.
			
			var dialogDiv = $("#select-selectdialog");
			
			var pos = sMap.util.getMapOrigo();
			var x = pos.left + 50,
				y = pos.top + 3,
				createDialog = false;
			
			if (!dialogDiv.length) {
				dialogDiv = $("<div id='select-selectdialog'></div>");
				createDialog=true;
			}
			else {
				dialogDiv.children().remove();
			}
			var len = (this.maxLength > features.length) ? features.length : this.maxLength,
				rows=0,
				selectedFeatures = this.selectLayer.features;
			var table = $("<table />");
			dialogDiv.append(table);
			for (var i=0; i<len; i++) {
				var f = features[i];
				var name = f.layerName,
					rowId = OpenLayers.Util.createUniqueID("selectrowfeature_");
				this.fDict[rowId] = f;
				
				var t = sMap.cmd.getLayerConfig(name),
					style;
				if (t) {
					style = t.style || null;
					if (style) {
						style = style["default"];
					}
					else {
						style = t.defaultStyle;						
					}
				}
				var iconURL = style ? style.externalGraphic : null;
				
				var rowTag = $("<tr id='"+rowId+"' unselectable='on' class='unselectable selectdialog-rowtag'><td class='selectmany-td-first'><img src='"+iconURL+"'></img></td><td>"+t.displayName + "</td></tr>");
				table.append(rowTag);
				rows += 1;
				
				/**
				 * Define hover and click for each row.
				 */
				$(rowTag).hover(function(e) {
					// Add hover effect.
					$(this).addClass("selectdialog-rowtag-hover");
					// Select the feature we are hovering.
					var rowId = $(this).attr("id");
					var f = self.fDict[rowId];
					
					/**
					 * When selecting one object we want to use xy of the clicked location.
					 * However, here want to use the center point of the feature. Otherwise
					 * the popup ends up at the same place for each feature.
					 */
					var c = f.geometry.getCentroid();
					var px = self.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(c.x, c.y));
					self.selectFeatures([f], {
						add : options.add,
						xy: new OpenLayers.Pixel(px.x, px.y)
					});
					if (self.fitBoundsIfNotContained) {
						// Zoom to the feature's extent IF it's not contained in viewport.
						var bounds = f.geometry.getBounds(),
							viewportBounds = self.map.getExtent();
						var contains = viewportBounds.containsBounds(bounds);
						if (contains === false) {
							// Zoom to feature's extent
							self.map.zoomToExtent(bounds);
						}
					}
					
				}, function(e, ui) {
					// Unselect feature
					$(this).removeClass("selectdialog-rowtag-mousedown");
					$(this).removeClass("selectdialog-rowtag-hover");
					
					
					var rowId = $(this).attr("id");
					var f = self.fDict[rowId];
					if (self.clickedOnDialogRow !== true) {
						self.unselect({
							features : [f],
							doNotDestroy : true // If destroyed it cannot be selected again.
						});
					}
				});
				$(rowTag).click(function(e) {
					// Close dialog on click.
					self.clickedOnDialogRow = true;
					
					$(this).removeClass("selectdialog-rowtag-mousedown");
					$("#select-selectdialog").dialog("close");
					
					// Destroy all other features connected to the dialog
					// except the selected one, to clean up memory.
					$(this).siblings().each(function() {
						var rowId = $(this).attr("id");
						var f = self.fDict[rowId];
						f.destroy();
					});
					
					
					
				});
				$(rowTag).mousedown(function(e) {
					$(this).addClass("selectdialog-rowtag-mousedown");
				});	
			}
			
			if (createDialog===true) {
				sMap.util.createDialog(dialogDiv, {
					title : this.lang.chooseFeature,
					width: "auto",
					close: function() {
						$(this).dialog("destroy");
					},
					height: "auto",
					minHeight : 100,
					maxHeight: 400,
					position : [x, y],
					modal: false
				});
				$("#select-selectdialog").parent().attr("id", "select-dialogparent");
			}
			
			$(document).ready(function() {
				$("#select-selectdialog").dialog("open");
				
				// Adapt the dialog size and its contents to the
				// common minimum appropriate size
				
				// Get the widest rowTag
//				var rowTagMaxWidth=0, tempW=0;
//				$(dialogDiv).children().each(function() {
//					tempW = $(this).outerWidth();
//					rowTagMaxWidth = tempW > rowTagMaxWidth ? tempW : rowTagMaxWidth; // store the highest record
//				});
//				
//				var w = rowTagMaxWidth + 50; // derive width from row div
//				
//				dialogDiv.width(w); // set dialog div's width
//				$("#select-selectdialog").dialog("option", "width", w + 4);
//				
//				// Set a maximum rows limit so the dialog won't be to high.
//				var maxRows = 8;
//				rows = rows<=maxRows ? rows : maxRows;
//				var h = rows * (sMap.util.trimCSS(rowTag.css("height"))+2+2);
//
//				dialogDiv.height(h);
//				$("#select-selectdialog").dialog("option", "height", h + 30);
//				
//				// Make sure all rows have equal length so they will
//				// all fill the dialog width.
//				dialogDiv.children().each(function() {
//					$(this).css({
//						"width" : w + "px"
//					});
//				});
				
			});
			dialogDiv.css("overflow-x", "hidden");
		}
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Select"
	
});sMap.moduleConfig.Select = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : true,
		
		fitBoundsIfNotContained: true,
		
		
		defaultStyle : {
			pointRadius : 18,
			//externalGraphic : "img/icon_hjalp.png",
			strokeWidth : 4,
			strokeColor: "#00ffff",
			fillColor: 	"#00ffff",
			strokeOpacity : 1,
			fillOpacity: 0.7,
			graphicZIndex: 499
		},
		selectStyle : {
			pointRadius : 8,
			//externalGraphic : "img/icon_hjalp.png",
			strokeWidth : 4,
			strokeColor: "#00ffff",
			fillColor: 	"#00ffff",
			strokeOpacity : 1,
			fillOpacity: 0.7,
			graphicZIndex: 499
		},
		
		zIndex: 499,
		
		/**
		 * Allow more than one selected feature at the same time.
		 */
		multiple : true,
		
		/**
		 * Select only the closest feature to the click location.
		 */
		forceOne: true,
		
		/**
		 * @property handlerType {String}
		 * Choose the select module's event listener.
		 * Can be either "box" or "click".
		 */
		handlerType : "click",
		/**
		 * @property addSelectWithKey {Boolean}
		 * If true - the keyMask specified in handlerOptions (for the handler
		 * of choice) can be used for adding features to selection.
		 * Note that if addSelectWithKey equals true, zoomBox will not work
		 * when holding the shift key.
		 */
		addSelectWithKey : true,
		/**
		 * @property dialogIfMany {Boolean}
		 * If true, create a dialog if more than one feature was found on request.
		 * In the dialog the user has to choose one feature.
		 */
		dialogIfMany : true,
		
		
		/**
		 * Pressing the keyMask key will add to the selection.
		 */
		handlerOptions : {
			click : {
				keyMask : OpenLayers.Handler.MOD_CTRL
			},
			box : {
				keyMask : OpenLayers.Handler.MOD_CTRL
			}
		},
		
		clickRadius : 8,
		maxLength : 20
		
		
		
};
sMap.Lang.lang.Select = {
	"sv-SE" : {
		chooseFeature: "Välj ett objekt"
	},
	en : {
		chooseFeature: "Select one feature"
	}
	
};/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.SelectResult = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 * 
	 * "select": Repopulates the grid after a new selection from the select module.
	 * "unselect": Repopulates the grid after a new selection from the select module.
	 * "layerhidden" : Repopulates the grid after a layer i s hidden. Not perfect but select modules does the same.
	 * "createreport": Opens a link to a report with the IDs of the selected features.
	 *	 - features {Array(OpenLayers.Feature.Vector)} the selected features
	 */
	EVENT_LISTENERS : ["select","unselect","layerhidden","createreport"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 * 
	 * "select": Triggered when a row in the grid is selected.
	 * 		- features {Array(OpenLayers.Feature.Vector)} the feature associated with the clicked row
	 * 		- add {Boolean} true
	 * "unselect": Triggered when a row in the grid is unselected.
	 * 		- features {Array(OpenLayers.Feature.Vector)} the feature associated with the clicked row
	 * 		- doNotDestroy : true
	 * "selected": Triggered when a row in the grid is doubleclicked. This opens the popup.
	 * 		- features {Array(OpenLayers.Feature.Vector)} the feature associated with the clicked row
	 * 		- selectedFeatures {Array(OpenLayers.Feature.Vector)} the feature associated with the clicked row
	 * "createreport": Triggered by button.
	 * 		- features {Array(OpenLayers.Feature.Vector)} the selected features
	 */
	EVENT_TRIGGERS : ["select","unselect","selected","createreport"],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.SelectResult.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.SelectResult.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
		this.cols=[];
		for (var k = 0;k< this.colModel.length; k++){
			this.cols[k]= this.colModel[k].name;
		}
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		if (!this.dialogDiv){
			this.dialogDiv = this.makeDialogContent();
			this.dialogDiv = this.makeDialog(this.dialogDiv);
			this.createGrid();
			
		}
		if (!(typeof selectLayer == "undefined")){
			this.populateGrid(selectLayer.features);
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

		if (this.addToToolsMenu){
			sMap.events.triggerEvent("addtomenu", this, {
				index : this.toolbarIndex,
				iconCSS : "ui-icon-calculator",
				menuId : this.addToToolsMenu,
				label : this.lang.buttonText,
				tagID : "button-selectresult"
			});
		}
		else
		{
			sMap.events.triggerEvent(eventChooser, this, {
				index : this.toolbarIndex,
				label : eventChooser=="addtomenu" ? this.lang.buttonText : null,
				hoverText : this.lang.buttonText,
				iconCSS : "ui-icon-calculator", 
				tagID : "button-selectresult"
			});
		}
	}, 
	/**
	 * Listener for the select event. Populates the grid.
	 * @param e
	 */
	select : function(e){
		if (e.caller.MODULE_NAME){ // Caller is Select Module and not the resulttable itself
			if (selectLayer.features.length > 1 && this.active!==true){
				this.activate();
			} else{
				this.populateGrid(selectLayer.features);
			}
		}
	},
	/**
	 * Listener for the unselect event. Populates the grid.
	 * @param e
	 */
	unselect : function(e){
		if (e.caller.CLASS_NAME== "OpenLayers.Popup.FramedCloud"){ // When unselecting from the popup
				this.populateGrid(selectLayer.features);
		}
	},
	/**
	 * Listener for the layerhidden event. Populates the grid.
	 * @param e
	 */
	layerhidden : function(e){
		this.populateGrid(selectLayer.features);
	},
	/**
	 * Creates and configures the grid. jgGrid library is used. http://www.trirand.com
	 */
	createGrid : function (){
		var self = this;

		$("#resulttable").jqGrid({
			datatype: "local",
			height: this.gridHeight,
			autowidth : true,
			colNames: this.lang.colNames,
			colModel: this.colModel,
			rowNum : this.rowNum,
			grouping : true,
			groupingView : { 
			     groupField : ['layername'],
			     groupText : ['<b>{0} - {1} '+this.lang.items+'</b>'],
			     groupColumnShow : [false]
			     },
			multiselect:true,
			deselectAfterSort : false, //No effect! Bug in library? Setting sortable : false in colModel.
			onSelectRow: function(rowid,status){
				if (status) {
					sMap.events.triggerEvent("select", this, {
						features : [self.fDict[rowid]],
						add : true // Add to current selection.
					});
				}
				else{
					sMap.events.triggerEvent("unselect", this, {
						features : [self.fDict[rowid]],
						doNotDestroy : true // If destroyed it cannot be selected again.
					});
				}
			},
			onSelectAll : function(rowids,status){
				if (status){
					sMap.events.triggerEvent("unselect", this, {
						doNotDestroy : true // If destroyed it cannot be selected again.
					});
					for (var i=0;i<rowids.length;i++){
						sMap.events.triggerEvent("select", this, {
							features : [self.fDict[rowids[i]]],
							add : true // Add to current selection.
						});
					}
					self.zoomFeatures();
				}
				else {
					sMap.events.triggerEvent("unselect", this, {
						doNotDestroy : true // If destroyed it cannot be selected again.
					});
				}
			},
			ondblClickRow: function(rowid){
				var f = self.fDict[rowid];
				sMap.map.zoomToExtent(f.geometry.getBounds());
				if (self.selectOnDblClick){
					sMap.events.triggerEvent("selected", this, {
						features : [self.fDict[rowid]],
						selectedFeatures : [self.fDict[rowid]]
					});
				}
			},
			onRightClickRow: function(rowid){
			}
		});
	},
	/**
	 * Populates the grid after a new selection
	 * @param f {Array(OpenLayers.Feature.Vector)} the selected features
	 */
	populateGrid : function(f){
		var grid = $("#resulttable"),
			cols = this.cols,
			report = false;
		grid.clearGridData();
		this.fDict = {};
		for (var i = 0;i<f.length; i++){
			var t = sMap.cmd.getLayerConfig(f[i].layerName) || {};
			var selAttrs = t.selectAttributes ? t.selectAttributes : [];
			if (t.report){
				report = true;
			}
			var datarow = {};
			for (var l = 0;l< cols.length; l++){
				if (cols[l]=="layername"){
					datarow[cols[l]] = t.displayName;
				}else{
					if (selAttrs[l-1]){
						datarow[cols[l]] = sMap.util.extractAttributes(f[i].attributes, selAttrs[l-1]);
					}
				}
			}
			grid.jqGrid('addRowData',i+1,datarow);	
			this.fDict[i+1] = f[i];
		}
		grid.jqGrid('groupingGroupBy','layername');			//Group by layername
		for (var j = 0;j<f.length; j++){					//Select all rows
			grid.jqGrid('setSelection',(j+1),false);
		}
		var reportbutton = $("#SelectResultReportButton");	//hide reportbutton if no feature with report
		if (report){
			reportbutton.css("display","inline-block");
			if(sMap.db.browser.msie && (parseInt(sMap.db.browser.version) < 8)){
				reportbutton.css("display","inline");		// inline-block doesn't exist in IE < 8
			}
		}else{
			reportbutton.hide();
		}
		var zoombutton = $("#SelectResultZoomButton");		//hide zoombutton if no feature
		if (f.length>0){
			zoombutton.css("display","inline-block");		// .show() didn´t work in IE. It became display:block instead
			if(sMap.db.browser.msie && (parseInt(sMap.db.browser.version) < 8)){
				zoombutton.css("display","inline");		// inline-block doesn't exist in IE < 8
			}
		}else{
			zoombutton.hide();
		}
		this.resizeGrid();									//Resize the grid to adjust to dialogDiv
	},
	/**
	 * Resizes the grid after resizing of the dialog
	 */
	resizeGrid: function(){
		var grid = $("#resulttable"),
			dialogWidth = $("#SelectResultDialogDiv").innerWidth();
		dialogWidth = dialogWidth > 100 ? dialogWidth : this.width;
		grid.jqGrid('setGridWidth',dialogWidth-30,true);
	},
	/**
	 * Make a dialogDiv with a result table and a report button
	 */
	makeDialogContent : function() {
		var dialogDiv = $("<div id='SelectResultDialogDiv' class='selectresultDiv' />");
		var html = "<table id='resulttable'></table>";
		dialogDiv.html(html);
		var zoombutton = $("<div id='SelectResultZoomButton'>"+this.lang.zoomButtonText+"</div>");
		zoombutton.button();
		dialogDiv.append(zoombutton);
		zoombutton.click(this.zoomFeatures);
		zoombutton.hide();
		zoombutton.width(150);
		var reportbutton = $("<div id='SelectResultReportButton'>"+this.lang.reportButtonText+"</div>");
		reportbutton.button();
		reportbutton.width(150);
		dialogDiv.append(reportbutton);
		reportbutton.click(
				function (){
					sMap.events.triggerEvent("createreport", this, {
						features : selectLayer.features
					});
		});
		reportbutton.hide();
		return dialogDiv;
	},
	/**
	 * listener for the createreport event. This could be done in a separate module instead.
	 * @param e
	 * 		- features {Array(OpenLayers.Feature.Vector)} the selected features
	 */
	createreport : function (e){
		
		
		var f = e.features,
			linkURL = "",
			IDstring = "";
		for (var i = 0;i<f.length; i++){
			var layerName = f[i].layerName;
			var t = sMap.cmd.getLayerConfig(layerName) || {};
			var report = t.report ? t.report : null;
			if (report){
				linkURL = t.report.linkURL;
				IDstring += f[i].attributes[t.report.IDattribute] + ",";
			}
		}
		IDstring = IDstring.substring(0, IDstring.length-1);
		if (linkURL){
			window.open(linkURL+IDstring);
		}
		else {
			alert(this.lang.noSelectedFeaturesText);
		}
	},
	/**
	 * Zoom to all features in selectLayer
	 */
	zoomFeatures : function(){
		// zoom to the features
		var f= selectLayer.features;
		var fbounds = new OpenLayers.Bounds(); 
		for (var i=0; i<f.length;i++){ 
			fbounds.extend(f[i].geometry.getBounds()); 
		}
		if (fbounds.left == fbounds.right){
			sMap.map.setCenter(new OpenLayers.LonLat(fbounds.left, fbounds.top), this.pointZoomLevel);
		}else{
			sMap.map.zoomToExtent(fbounds);
		}
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
			open : null,
			resizeStop : this.resizeGrid	
		});
		return dialogDiv;
	},
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.SelectResult"
	
});sMap.moduleConfig.SelectResult = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		/**
		 * Default properties
		 */
		toolbarIndex : 8,
		addToToolsMenu : false,
		/**
		 * Dialog start position and size
		 */
		dialogStartPosition : [50,150],
		height : 500,
		width: 360,
		/**
		 * Height of the grid
		 */
		gridHeight : 380,
		/**
		 * Column names or headers i is configurates in SelectResult_lang.js file
		 */
		//colNames: ['Lagernamn','Namn','Info'],
		/**
		 * Columns in the grid. The first one must be layername. It's hidden and used to group the features in the grid.
		 * The other columns get their values from the attributes listed in the layers config selectAttributes. example:
		 * selectAttributes :  ["${Name}","<a href='http://${Link}' target=_blank>${Link}</a>"],
		 * The ordering is important. col[1] get the value of selectAttributes[0] etc.
		 */
		colModel: [
		           {name:'layername',index:'layername',width:150},
		           {name:'name',index:'name',width:150,sortable:false},
		           {name:'info',index:'info',width:100,sortable:false}
		],
		/**
		 * Max number of rows in grid
		 */
		rowNum: 50,
		/**
		 * zoomlevel to use when zooming just one point feature
		 */
		pointZoomLevel : 7,
		/**
		 * selectOnDblClick, select feature and open popup when doubleclicking on row. Causes some confusion in other modules.
		 *  Disabled default.
		 */
		selectOnDblClick : false
		/**
		 * The layer config can also have a attribute; report. If so a button will appear under the grid witch opens the link with 
		 * the selected features IDs attached as a string like linkURL+IDattribute[0],IDattrubute[1],
		 * This functionality i not perfect yet. Button triggers event "createreport"
		 * 	report: {
			    	linkURL : "myReport.aspx?ID=",
			    	IDattribute : "Name"
			    },
		 */
};
sMap.Lang.lang.SelectResult = {
		"sv-SE" : {
			buttonText : "Urvalstabell",
			headerText : "Urvalstabell",
			reportButtonText : "Skapa rapport",
			zoomButtonText : "Zooma valda",
			colNames: ['Lagernamn','Namn','Mer info'],
			items : "objekt",
			noSelectedFeaturesText : "Inga objekt valda!"
		},
		en : { 
			buttonText : "Select result",
			headerText : "Select result",
			reportButtonText : "Create report",
			zoomButtonText : "Zoom selected",
			colNames: ['Layername','Name','More info'],
			items : "item(s)",
			noSelectedFeaturesText : "No selected features!"
		}
	
};/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.SelectTool = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.SelectTool.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.SelectTool.prototype.EVENT_TRIGGERS.concat(
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
		sMap.events.triggerEvent("selectboxmode", this, {});
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		sMap.events.triggerEvent("selectclickmode", this, {});
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
			iconCSS : "btnselectbox", 
			tagID : "button-selecttool"
		});
	}, 
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.SelectTool"
	
});sMap.moduleConfig.SelectTool = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		/**
		 * Default properties
		 */
		toolbarIndex : 11,
		addToToolsMenu : false
};
sMap.Lang.lang.SelectTool = {
	"sv-SE" : {
		buttonText : "Välj objekt"
	},
	en : { 
		buttonText : "Select objects"
	}
	
};/**
 * @constructor sMap.Module.SimpleSelect
 * 
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.SimpleSelect = OpenLayers.Class(sMap.Module, {
	
	/**
	 * Allow hover
	 */
	hover: false,
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["layervisible", "layerhidden", "unselect", "select", "unselect"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : ["select", "unselect"],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.SimpleSelect.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.SimpleSelect.prototype.EVENT_TRIGGERS.concat(
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
		this.selectControl.activate();
//		this.map.events.register("addlayer", this, this.layervisible);
//		this.map.events.register("removelayer", this, this.layerhidden);
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		this.selectControl.deactivate();
//		this.map.events.unregister("addlayer", this, this.layervisible);
//		this.map.events.unregister("removelayer", this, this.layerhidden);
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
		var layers = this.getLayers();
		
		this.selectControl = new OpenLayers.Control.SelectFeature([], {
			clickout: true,
			toggle: false,
            multiple: false,
            hover: this.hover,
            toggleKey: "ctrlKey",
            multipleKey: "shiftKey",
            onSelect: this.onSelect,
            onUnselect: this.onUnselect,
            selectedFeatures: [],
            layers: layers
		});
		this.map.addControl( this.selectControl );
	},
	
	getLayers: function() {
		var _layers = this.map.layers,
			layer = null,
			layers = [];
		for (var i=0,len=_layers.length; i<len; i++) {
			layer = _layers[i];
			if (layer.selectable && layer.CLASS_NAME=="OpenLayers.Layer.Vector") {
				layers.push(layer);
			}
		}
		return layers;
	},
	
	
	onSelect: function(feature) {
		this.selectedFeatures.push(feature);
		sMap.events.triggerEvent("selected", this, {
			features: [feature],
			selectedFeatures: this.selectedFeatures
		});
		
	},
	
	onUnselect: function(feature) {
		var features = this.selectedFeatures || [],
			found = false;
		for (var i=0,len=features.length; i<len; i++) {
			if (features[i].fid == feature.fid) {
				found = true;
				break;
			}
		}
		if (found) {
			this.selectedFeatures.splice(i, 1);
		}
		sMap.events.triggerEvent("unselected", this, {
			features: [feature],
			selectedFeatures: this.selectedFeatures
		});
	},
	
	/**
	 * Select one or more features.
	 * @param e {Object}
	 * 	- features {Array} Containing items of {OpenLayers.Feature.Vector}
	 */
	select: function(e) {
		var fs = e.features || [];
		if (fs.length) {
			for (var i=0,len=fs.length; i<len; i++) {
				this.selectControl.select( fs[i] );
			}
		}
	},
	
	/**
	 * If unselect is called from outside, fulfill this command. 
	 */
	unselect: function(e) {
		var features = e.features || this.getSelectedFeatures();
		if (features.length) {
			for (var i=0,len=features.length; i<len; i++) {
				this.selectControl.unselect( features[i] );
			}
		}
		else {
			this.selectControl.unselectAll();
			/**
			 * There are no features to unselect but other modules
			 * might expect "unselected" to triggered after "unselect"
			 * so we need to trigger it without sending any
			 * features along. For instance, when making a layer invisible
			 * the features have already been unselected in the SelectFeature
			 * control. But still we need to trigger unselected (but we cannot
			 * send any features along unless we save them in a separate array
			 * from the SelectFeature's array...).
			 */
			sMap.events.triggerEvent("unselected", this, {
				features: [],
				selectedFeatures: []
			});
		}
	},
	
	layervisible: function(e) {
		var layers = this.getLayers();
		this.selectControl.setLayer(layers);
//		var layer = e.layer;
//		if (layer.selectable) {
//			var layers = this.selectControl.layers;
//			layers.push( layer );
//			this.selectControl.setLayer(layers);
//		}
	},
	
	layerhidden: function(e) {
		var layers = this.getLayers();
		this.selectControl.setLayer(layers);
		
//		var layers = this.selectControl.layers,
//			found = false;
//		for (var i=0,len=layers.length; i<len; i++) {
//			var layer = layers[i];
//			if (layer.name == e.layer.name) {
//				found = true;
//				break;
//			}
//		}
//		// First unselect all features in the layer
//		sMap.events.triggerEvent("unselect", this, {}); // unselect all
//		
//		if (found) {
//			layers.splice(i, 1); // remove layer from array
//		}
//		this.selectControl.setLayer(layers);
	},
	
	getSelectedFeatures: function(options) {
		var layers = this.selectControl.layers || [this.selectControl.layer];
        var layer,
        	selectedFeatures = [];
        for(var l=0; l<layers.length; ++l) {
        	layer = layers[l];
        	selectedFeatures = selectedFeatures.concat(layer.selectedFeatures);
        }
        return selectedFeatures;
    },
	
	
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.SimpleSelect"
	
});sMap.moduleConfig.SimpleSelect = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : true
};
sMap.Lang.lang.SimpleSelect = {
	"sv-SE" : {
		labelText : "Tryck här"
	},
	en : { 
		labelText : "Press here"
	}
	
};/**
 * @author Markus Nilsson
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.SPrint = OpenLayers.Class(sMap.Module, {
	
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
	
	core: null,
	
	initialize : function(options) {
		options = options || {};
		
		this.core = new sMap.Module.SPrint.Core(this);		

		
		this.EVENT_LISTENERS =
			sMap.Module.SPrint.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.SPrint.prototype.EVENT_TRIGGERS.concat(
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
		
		this.core.activate();
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		
		if (this.core.deactivate()){
			// Call the deactivate method of the parent class
			return sMap.Module.prototype.deactivate.apply(
		            this, arguments
		        );
		}
		else {
			return true;
		}
		
	},
	
	destroy : function() {
		// Call the destroy method of the parent class
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
	/**
	 * Toggle the dialog.
	 */
	toggleDialog : function() {
		if (this.active!==true) {
			this.activate();
		}
		this.core.toggleDialog();
	},
	
    /**
     * Called when all modules are initialized, i.e. after initialize.
     * All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		if (this.addToToolsMenu){
			sMap.events.triggerEvent("addtomenu", this, {
				index : this.toolbarIndex,
				iconCSS : "ui-icon-print",
				menuId : this.addToToolsMenu,
				label : this.lang.buttonText,
				tagID : "button-sprint"
			});
		}
		else {
			sMap.events.triggerEvent("addtoolbutton", this, {
				index : this.toolbarIndex,
				iconCSS : "ui-icon-print",
				label : this.lang.buttonText,
				tagID : "button-sprint"
			});
		}
	}, 
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.SPrint"
	
});sMap.moduleConfig.SPrint = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		// For displaying correct scales in the dialog scale selector,
		// default is otherwise 72.
		DOTS_PER_INCH: 96,
		
		printCopyrightNotice: '<div id="print-dialog-userconditions" class="ui-dialog-content ui-widget-content" scrolltop="0" scrollleft="0" style="width: auto; min-height: 0px; height: 183px;">För utdrag från kartan/flygfotot till tryck eller annan publicering, krävs tillstånd från Malmö Stadsbyggnadskontor. Vid frågor om tillstånd, användningsområden eller kartprodukter kontaktas Stadsbyggnadskontorets kartförsäljning: 040-34 24 35 eller <a href="mailto:sbk.sma@malmo.se?subject=Best%E4lla karta">sbk.sma@malmo.se</a>.<br><strong>Accepterar du villkoren?</strong></div>'
};
sMap.Lang.lang.SPrint = {
	"sv-SE" : {
		buttonText : "Skriv ut"
	},
	en : { 
		buttonText : "Print"
	}
	
};(function() {

	/**
	 * Core SPrint functionality
	 * 
	 * Map layers and query methods live here.
	 * 
	 * @constructor
	 */
	var Core = function(module) {
		
		this.module = module;

		this.format = new OpenLayers.Format.GeoJSON();
		this.dialog = new sMap.Module.SPrint.PrintControlDialog(this);
		

	};
	
	Core.host = "XXX"; //This one should probably be set from the config file.	
	
	
	/**
	 * Static method to bind a function to specific scope
	 * 
	 * @param context
	 *            scope to bind method to
	 * @param method
	 *            function to use as a method on the context
	 * @returns {Function}
	 */
	Core.bind = function(context, method) {
		return function() {
			return method.apply(context, arguments);
		};
	};
	
	Core.prototype.activate = function() {
		this.dialog.dialog.dialog("open");
		this.dialogClosed = false;
	};
	
    Core.prototype.deactivate = function() {
    	if (this.dialogClosed === true){
    		// Dialog closed, Don't try to deactivate again.
    		return false;
    	}
    	this.dialogClosed = true;

    	
    	if (this.dialog.dialog.dialog("isOpen")) {
    		this.dialog.dialog.dialog("close");
		}
    	return true;
    };
	
	Core.prototype.toggleDialog = function() {
				
		var isOpen = this.dialog.dialog.dialog("isOpen");
		if (isOpen) {
			this.dialog.dialog.dialog("close");
		}
		else {
			this.dialog.dialog.dialog("open");
		}
	},
	
	/**
	 * Adds the proxy component of the URL if a proxy have been set.
	 * @param url
	 * @returns Url with proxy.
	 */
	Core.prototype.getUrlWithProxy = function(url){
		if ( sMap.config.proxyHost != null ){
			return sMap.config.proxyHost + encodeURIComponent(url);
		}
		else {
			return url;
		}
	};
	
	/**
	 * Method used for showing errors in server AJAX communication. Shows a message box.
	 * @param jqXHR
	 * @param textStatus
	 * @param errorThrown
	 */
	Core.prototype.remoteQueryFail = function(jqXHR, textStatus, errorThrown) {
		var errorText = 'Kommunikation med server misslyckades, felmeddelande: \n'
			+ textStatus + "\n";
		if (jqXHR != null){
			if (jqXHR.status != null){
				errorText += "Status: " + jqXHR.status + "\n";
			}
			if (jqXHR.responseText != null){
				errorText += "Response text: " + jqXHR.responseText + "\n";
			}
		}
		
		alert(errorText);
	};

	/**
	 * Query for schools remotely
	 * 
	 * @param config.data    The data to send...
	 * @param config.context Used for success call.
	 * @param config.success Used for success call.
	 */
	Core.prototype.exampleServerCall = function(config) {
		var wsUrl = Core.host + 'XXX_setThisOne';
		var proxyUrl = this.getUrlWithProxy(wsUrl);

		$.ajax({
			url : proxyUrl,
			dataType : 'text',
			context : this,
			data : config.data,
			cache: false,
			success : function(response) {
				config.success.call(config.context, features);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// If you get an error here it might because of problem with the proxy settings stored in 
				// sMap.config.proxyHost
				this.remoteQueryFail(jqXHR, textStatus, errorThrown);
			}
		});
	};
	
	
	sMap.Module.SPrint.Core = Core;

}());(function() {
	var Core = sMap.Module.SPrint.Core;

	/**
	 * @constructor
	 */
	var PrintControlDialog = function(core) {

		this.core = core;
		this.dialog = $('<div></div>');

		// load markup from remote source
		this.dialog.load('modules/Module/SPrint/PrintControlDialog.html', Core.bind(this, this.init));
	};

	PrintControlDialog.prototype.setCurrentScale = function() {
		var scale = this.map.getScale(),
			res = this.map.getResolution();
		var scaleRes = parseInt(Math.round(scale)) + ":" + res;
		$(".sprint-selectscale").val( scaleRes ).change();
	};
	
	PrintControlDialog.prototype.acceptCopyright = function(print, printFormat) {
		print = print || false;
		var service = print ? "Print_" : "Export_";
		
		var self = this;
		
		
		$("<div>"+this.core.module.printCopyrightNotice+"</div>").dialog({
			title: "Användarvillkor",
			autoOpen: true,
			modal: true,
			close: function() {
				$(this).dialog("destroy").empty().remove();
				
			},
			buttons: [
			          {
			        	  text: "Nej",
			        	  click: function() {
				        	  	$(this).dialog("close");
				          	}
			          },
			          {
			        	  text: "Jag accepterar",
			        	  click: function() {
			        	  		$(this).dialog("close");
				        	  	self.print(service, printFormat, {
				        	  		orientation: $(".sprint-orientation:visible:checked").val() || "Portrait",
									format: $(".sprint-paperformat:visible").val() || "A4"
				        	  	});
			          		}
			          }
			]
		});
		
		
	};
	
	/**
	 * Stuff to be done after markup has been remotely loaded
	 */
	PrintControlDialog.prototype.init = function() {
		var self = this;
		
		this.map = this.core.module.map;
		
		OpenLayers.DOTS_PER_INCH = this.core.module.DOTS_PER_INCH || OpenLayers.DOTS_PER_INCH;
		
		// Bind change in format and orientation to change in preview extent box.
		this.dialog.find("input[name='sprint_Export_radLandscape'], input[name='sprint_Print_radLandscape'], " +
				"#sprint_Export_slctPrintFormat, #sprint_Print_slctPrintFormat").change(function() {
			self.showExtent();
		});
		
		// Johan was here: Allow to click on the label
		var onLabelClick = function() {
			$(this).prev().click();
		};
		this.dialog.find("input[type='checkbox'], input[type='radio']").each(function() {
			$(this).next().click(onLabelClick);
		});
		
		this.dialog.dialog({
			title : 'Utskrift',
			width : 370,
			resizable : false,
			closeOnEscape : false,
			open : function(e, ui) {
				self.updateScales();
				self.showExtent();
				self.setCurrentScale();
				self.map.events.register("zoomend", self, self.setCurrentScale);
				self.map.events.register("changebaselayer", self, self.updateScales);
				self.map.events.register("zoomend", self, self.showExtent);
				self.map.events.register("moveend", self, self.showExtent);
				
				// $(".ui-dialog-titlebar-close", ui.dialog).hide();
			},
			close : Core.bind(this, this.onDialogclose),
			autoOpen: false
		});

		this.tabs = $('#SPrintTabs').tabs({
			activate: function( event, ui ) {
				self.showExtent();
				self.setCurrentScale();
			}
		});

		var that = this;
		$("#sprint_Print_btnPrint").button();
		$("#sprint_Print_btnPrint").click(function() {
			that.acceptCopyright(true, "PDF");
		});
		$("#sprint_Export_btnExport").button();
		$("#sprint_Export_btnExport").click(function() {
			that.acceptCopyright(false, $("#sprint_Export_slctImageFormat").val());
		});
		$("#sprint_Export_btnPreview").button();
		$("#sprint_Export_btnPreview").click(function() {
			that.print("Export_", "PDF", {
				orientation: $(".sprint-orientation:visible:checked").val() || "Portrait"
			});
		});
		this.updateScales();
		
		var curScale = this.getCurrentScale(),
			res = this.map.getResolution(); 
		
		$(".sprint-selectscale").val(curScale+":"+res);
		$(".sprint-selectscale").change(function() {
			var val = $(this).val();
			if (typeof(val) === "string" && val.length > 0) {
				self.showExtent( parseInt( val.split(":")[0] ) );
			}
		});
		
		// Fix IE issue with indexof
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function(obj, start) {
			     for (var i = (start || 0), j = this.length; i < j; i++) {
			         if (this[i] === obj) { return i; }
			     }
			     return -1;
			};
		}
	};
	
	PrintControlDialog.prototype.updateScales = function() {
		$(".sprint-selectscale").empty();
		var scale, option, res,
			resolutions = this.map.baseLayer.resolutions || this.map.resolutions || [];
		for (var i=0,len=resolutions.length; i<len; i++) {
			res = resolutions[i];
			scale = parseInt( Math.round(sMap.util.getScaleFromResolution(res)) );
			option = $('<option value="'+scale+':'+res+'">1:'+scale+'</option>');
			$(".sprint-selectscale").each(function() {
				$(this).append(option.clone());
			});
		}
		this.setCurrentScale(); // set scale also
	};
		
	PrintControlDialog.prototype.showExtent = function(scale) {
		if (!scale || typeof(scale) !== "number") {
			scale = this.printScale || this.map.getScale();
		}
		this.printScale = scale;
		
		var format,
			portrait = true,
			isPrint = $("#sprint_Print_btnPrint").is(":visible");
			pxWidth, pxHeight;
		portrait = $(".sprint-orientation:visible:checked").val();
		portrait = portrait && typeof(portrait) === "string" ? portrait.toUpperCase() === "PORTRAIT" : true; // convert to boolean
		format = $(".sprint-paperformat:visible").val() || "A4";
		
		if (!this.extentLayer) {
			this.extentLayer = new OpenLayers.Layer.Vector("sprint_extentlayer", {
				styleMap: new OpenLayers.StyleMap({
					"default": new OpenLayers.Style({
						fillOpacity: 0.1,
						fillColor: "#00F",
						strokeWidth: 1,
						strokeOpacity: .8,
						strokeColor: "#00F"
					})
				})
			});
			this.map.addLayer(this.extentLayer);
		}
		else {
			this.extentLayer.destroyFeatures(); // clean layer
		}
		
		var pxWidth, pxHeight;
		switch(format) {
		case "A3":
			if (isPrint) {
				if (portrait === true) {
					pxWidth = 758 * (96/72);
					pxHeight = 1067 * (96/72);					
				}
				else {
					// Landscape
					pxWidth = 1107 * (96/72);
					pxHeight = 718 * (96/72);
				}
			}
			else {
				// Export
				if (portrait === true) {
					pxWidth = 842 * (96/72);
					pxHeight = 1191 * (96/72);					
				}
				else {
					// Landscape
					pxWidth = 1191 * (96/72);
					pxHeight = 842 * (96/72);	
				}
			}
			break;
		case "A4":
			if (isPrint) {
				if (portrait === true) {
					pxWidth = 511 * (96/72);
					pxHeight = 718 * (96/72);				
				}
				else {
					// Landscape
					pxWidth = 758 * (96/72);
					pxHeight = 471 * (96/72);
				}
			}
			else {
				// Export
				if (portrait === true) {
					pxWidth = 595 * (96/72);
					pxHeight = 842 * (96/72);				
				}
				else {
					// Landscape
					pxWidth = 842 * (96/72);
					pxHeight = 595 * (96/72);
				}
			}
			break;
		case "A5":
			if (isPrint) {
				if (portrait === true) {
					pxWidth = 337 * (96/72);
					pxHeight = 471 * (96/72);				
				}
				else {
					// Landscape
					pxWidth = 511 * (96/72);
					pxHeight = 297 * (96/72);
				}
			}
			else {
				// Export
				if (portrait === true) {
					pxWidth = 393 * (96/72);
					pxHeight = 538 * (96/72);				
				}
				else {
					// Landscape
					pxWidth = 525 * (96/72);
					pxHeight = 393 * (96/72);
				}
			}
			break;
		}
		
		var scaleFactor = scale / this.map.getScale();
		pxWidth *= scaleFactor;
		pxHeight *= scaleFactor;
		
		
//		if (portrait !== true) {
//			// Switch width and height (landscape format)
//			var _w = pxWidth;
//			pxWidth = pxHeight;
//			pxHeight = _w;
//		}
		
		
		var P = OpenLayers.Geometry.Point,
			center = this.map.getCenter();
		var pxCenter = this.map.getViewPortPxFromLonLat(center);
		var pxLeft = pxCenter.x - pxWidth/2,
			pxRight = pxCenter.x + pxWidth/2,
			pxTop = pxCenter.y - pxHeight/2,
			pxBottom = pxCenter.y + pxHeight/2;
		var nw = this.map.getLonLatFromPixel(new OpenLayers.Pixel(pxLeft, pxTop)),
			se = this.map.getLonLatFromPixel(new OpenLayers.Pixel(pxRight, pxBottom));
		var geomPolygon = new OpenLayers.Geometry.Polygon(
			[new OpenLayers.Geometry.LinearRing(
					[new P(nw.lon, nw.lat), new P(se.lon, nw.lat), new P(se.lon, se.lat), new P(nw.lon, se.lat), new P(nw.lon, nw.lat)] 
			)]
		);
		var polygon = new OpenLayers.Feature.Vector(geomPolygon);
		this.extentLayer.addFeatures([polygon]);
	};
	
	/** private: method[layout]	
	 *  :param service: ``String`` 
	 */
	PrintControlDialog.prototype.layout = function(service, options) {
		options = options || {};
		
		var format = options.format || "A4";
		var orientation = options.orientation ? options.orientation : "Portrait";  // "Portrait" or "Landscape"
		var arrow = "NoArrow";
		var bar = "NoBar";
		
		format = format || $("#sprint_" + service + "slctPrintFormat").val();
		orientation = orientation || $("input[name=sprint_" + service + "radLandscape]:radio:checked").val();
		if ($("#sprint_" + service + "chkNorthArrow:checked").val() !== undefined) 
		{ 
			arrow = "Arrow"; 
		}
		if ($("#sprint_" + service + "chkScaleBar:checked").val() !== undefined) 
		{ 
			bar = "Bar"; 
		}
		return [format, orientation, arrow, bar].join("_");
	};
	
	PrintControlDialog.prototype.getCurrentScale = function() {
		return parseInt(Math.round( OpenLayers.Util.getScaleFromResolution(sMap.map.resolutions[sMap.map.zoom], sMap.map.getUnits()) ));
	};

	/**
	 * api: method[printingstuff] :param map: ``OpenLayers.Map`` The map to
	 * print. :param pages: ``Array`` of :class:`PrintControlDialog.PrintPage`
	 * or :class:`PrintControlDialog.PrintPage` page(s) to print.
	 * :param service: ``String`` 
	 * 
	 * Sends the print command to the print service and opens a new window with
	 * the resulting PDF.
	 */
	PrintControlDialog.prototype.print = function(service, printformat, options) {
		options = options || {};
		
		sMap.events.triggerEvent("beforeprint", this, {});
		
		var onSuccess = options.onSuccess || null,
		    onError = options.onError || null,
		    onComplete = options.onComplete || null,
		    orientation = options.orientation || "Portrait"; // portrait or landscape
		
		if (this.extentLayer) {
			this.map.removeLayer(this.extentLayer);			
		}
		
		this.service = service;  //K-M
		var that = this;
		var map = options.map || this.core.module.map;
		
		sMap.cmd.loading(true, {
			bg: true
		});

		var jsonData = $.extend({
			units : map.getUnits(),
			srs : map.baseLayer.projection.getCode(),
			layout : this.layout(service, options),
			dpi : options.dpi || $("#sprint_" + service + "slctResolution:visible").val() || 96
		}, null);
		
		if (service == "Print_") {
			jsonData = $.extend({
				mapTitle : $("#sprint_txtHeader").val(),
				comment : $("#sprint_txtAreaDescription").val()
			}, jsonData);
		}

		var encodedLayers = [];

		// ensure that the baseLayer is the first one in the encoded list
		var layers = options.layers || map.layers.concat();
		layers.sort(that.compare);  //K-M
		layers.splice(layers.indexOf(map.baseLayer), 1);
		layers.unshift(map.baseLayer);
		var attribution = [];

		$.each(layers, function(index, layer) {

			if (layer.getVisibility() === true) {
				var enc = that.encodeLayer(layer);
				enc && encodedLayers.push(enc);
				
				if (layer.attribution) {
					attribution.push($(layer.attribution).text());
				}
			}
		});
		jsonData.layers = encodedLayers;
		
		var scale, res; 
		if (options.scale && options.resolution) {
			scale = options.scale;
			res = options.resolution;
		}
		else {
			var scaleRes = $(".sprint-selectscale:visible").val(); //this.getCurrentScale();
			scale = parseInt(scaleRes.split(":")[0]);
			res = parseFloat(scaleRes.split(":")[1]);			
		}

		$.extend({
		    distinct : function(anArray) {
		       var result = [];
		       $.each(anArray, function(i,v){
		           if ($.inArray(v, result) == -1) result.push(v);
		       });
		       return result;
		    }
		});
		var encodedPages = [];
		encodedPages.push($.extend({
			center : [ map.center.lon, map.center.lat ],
			scale : scale,
			rotation : 0,
			clientResolution : res, //map.resolutions[map.zoom],
			copy: $.distinct(attribution).join(", ")
		}, null));
		
		if (service == "Export_" && printformat != "PDF") {
			encodedPages[0] = $.extend({
				printformat: printformat
			}, encodedPages[0]);
		}
		
		jsonData.pages = encodedPages;
		
		var serviceName = service.substring(0,service.length - 1).toLowerCase();
		if ($("#sprint_Print_chkPdfUrl:checked").val() !== undefined) {
			var spec = JSON.stringify(jsonData),
				url = location.protocol + '//' + location.host + "/print-servlet/" + serviceName + "/print.pdf?spec=" + spec;
				url = url.replace(/å/g,'%E5');
				url = url.replace(/ä/g,'%E4');
				url = url.replace(/ö/g,'%F6');
				url = url.replace(/Å/g,'%C5');
				url = url.replace(/Ä/g,'%C4');
				url = url.replace(/Ö/g,'%D6');
				url = url.replace(/©/g,'%A9');
			$("<div><div id='print-dialog-pdflink' class='ui-dialog-content ui-widget-content' scrolltop='0' scrollleft='0' style='width: auto; min-height: 0px; height: auto;'><input type='text' readonly value='"+url+"' /></div></div>").dialog({
				title: "Länk till pdf",
				autoOpen: true,
				modal: true,
				close: function() {
					$(this).dialog("destroy").empty().remove();
				}
			});
			sMap.cmd.loading(false)
		}else {
			$.ajax({
				type: "POST",
				url : "/print-servlet/" + serviceName + "/create.json",
				timeout: options.timeout || 20000, // in ms
				data : JSON.stringify(jsonData),
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				context: this,
				success : function(response) {
					var url = response.getURL;
					if (onSuccess) {
						onSuccess.call(this, url);
					}
					else {
						that.download(url);					
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					if (onError) {
						onError.call(this, jqXHR, textStatus, errorThrown);
					}
					else {
						alert("printexception " + textStatus + ": " + errorThrown);
					}
					
				},
				complete: function() {
					sMap.cmd.loading(false);
					if (onComplete) {
						onComplete.call(this);
					}
				}
			});
		}
		// Put it back again
		if (this.extentLayer) {
			this.map.addLayer(this.extentLayer);			
		}
	};
	/**
	 * private: method[compare]  Used to sort layers based on index
	 * :param a: OpenLayers.Layer{object}
	 * :param b: OpenLayers.Layer{object}
	 * Used to sort layers based on zindex  //K-M
	 */
	PrintControlDialog.prototype.compare = function (a,b) {
		  if (a.getZIndex() < b.getZIndex())
		     return -1;
		  if (a.getZIndex() > b.getZIndex())
		    return 1;
		  return 0;
	};
	/** private: method[download]
	* :param url: ``String``
	*/
	PrintControlDialog.prototype.download = function(url) {
            if ($.browser.opera) {
                // Make sure that Opera don't replace the content tab with
                // the pdf
                window.open(url);
            } else {
                // This avoids popup blockers for all other browsers
                window.location.href = url;
            }
	    };

	/**
	 * private: method[encodeLayer] :param layer: ``OpenLayers.Layer`` :return:
	 * ``Object``
	 * 
	 * Encodes a layer for the print service.
	 */
	PrintControlDialog.prototype.encodeLayer = function(layer) {
		var that = this; 
		var encLayer;
		for ( var c in that.encoders.layers) {
			if (OpenLayers.Layer[c] && layer instanceof OpenLayers.Layer[c]) {
				encLayer = that.encoders.layers[c].call(that, layer);
				break;
			}
		}
		// only return the encLayer object when we have a type. Prevents a
		// fallback on base encoders like HTTPRequest.
		return (encLayer && encLayer.type) ? encLayer : null;
	};

	/**
	 * private: property[encoders] ``Object`` Encoders for all print content
	 */
	PrintControlDialog.prototype.encoders = {
		"layers" : {
			"Layer" : function(layer) {
				var enc = {};
				if (layer.options && layer.options.maxScale) {
					enc.minScaleDenominator = layer.options.maxScale;
				}
				if (layer.options && layer.options.minScale) {
					enc.maxScaleDenominator = layer.options.minScale;
				}
				return enc;
			},
			"WMS" : function(layer) {
				var t = sMap.cmd.getLayerConfig(layer.name);  //K-M
				var enc = this.encoders.layers.HTTPRequest.call(this, layer);
				$.extend(enc, {
					type : 'WMS',
					layers : [ layer.params.LAYERS ].join(",").split(","),
					format : layer.params.FORMAT,
					styles : [ layer.params.STYLES ].join(",").split(",")
				});
				var param;
				for ( var p in layer.params) {
					param = p.toLowerCase();
					if (!layer.DEFAULT_PARAMS[param]
							&& "layers,styles,width,height,srs".indexOf(param) == -1) {
						if (!enc.customParams) {
							enc.customParams = {};
						}
						enc.customParams[p] = layer.params[p];
					}
				}
				enc.baseURL = t.printURL ? t.printURL : enc.baseURL;  //K-M Special to change service when printing
				enc.format = t.printFormat ? t.printFormat : enc.format;  //K-M
				enc.layers = t.printLayers ? [t.printLayers] : enc.layers;  //K-M
				if (t.printParamDPI){
					enc.customParams.DPI = $("#sprint_" + this.service + "slctResolution").val();  //K-M
				}
				return enc;
			},
			"OSM" : function(layer) {
				var enc = this.encoders.layers.TileCache.call(this, layer);
				return $.extend(enc, {
					type : 'OSM',
					baseURL : enc.baseURL.substr(0, enc.baseURL.indexOf("$")),
					extension : "png"
				});
			},
			"TMS" : function(layer) {
				var enc = this.encoders.layers.TileCache.call(this, layer);
				return $.extend(enc, {
					type : 'TMS',
					format : layer.type
				});
			},
			"TileCache" : function(layer) {
				var enc = this.encoders.layers.HTTPRequest.call(this, layer);
				return $.extend(enc, {
					type : 'TileCache',
					layer : layer.layername,
					maxExtent : layer.maxExtent.toArray(),
					tileSize : [ layer.tileSize.w, layer.tileSize.h ],
					extension : layer.extension,
					resolutions : layer.serverResolutions || layer.resolutions
				});
			},
			"WMTS" : function(layer) {
				var enc = this.encoders.layers.HTTPRequest.call(this, layer);
				return $
						.extend(
								enc,
								{
									type : 'WMTS',
									layer : layer.layer,
									version : layer.version,
									requestEncoding : layer.requestEncoding,
									tileOrigin : [ layer.tileOrigin.lon,
											layer.tileOrigin.lat ],
									tileSize : [ layer.tileSize.w,
											layer.tileSize.h ],
									style : layer.style,
									formatSuffix : layer.formatSuffix,
									dimensions : layer.dimensions,
									params : layer.params,
									maxExtent : (layer.tileFullExtent != null) ? layer.tileFullExtent
											.toArray()
											: layer.maxExtent.toArray(),
									matrixSet : layer.matrixSet,
									zoomOffset : layer.zoomOffset,
									resolutions : layer.serverResolutions
											|| layer.resolutions
								});
			},
			"KaMapCache" : function(layer) {
				var enc = this.encoders.layers.KaMap.call(this, layer);
				return $.extend(enc, {
					type : 'KaMapCache',
					// group param is mandatory when using KaMapCache
					group : layer.params['g'],
					metaTileWidth : layer.params['metaTileSize']['w'],
					metaTileHeight : layer.params['metaTileSize']['h']
				});
			},
			"KaMap" : function(layer) {
				var enc = this.encoders.layers.HTTPRequest.call(this, layer);
				return $.extend(enc, {
					type : 'KaMap',
					map : layer.params['map'],
					extension : layer.params['i'],
					// group param is optional when using KaMap
					group : layer.params['g'] || "",
					maxExtent : layer.maxExtent.toArray(),
					tileSize : [ layer.tileSize.w, layer.tileSize.h ],
					resolutions : layer.serverResolutions || layer.resolutions
				});
			},
			"HTTPRequest" : function(layer) {
				var enc = this.encoders.layers.Layer.call(this, layer);
				return $
						.extend(
								enc,
								{
									baseURL : this
											.getAbsoluteUrl(layer.url instanceof Array ? layer.url[0]
													: layer.url),
									opacity : (layer.opacity != null) ? layer.opacity
											: 1.0,
									singleTile : layer.singleTile
								});
			},
			"Image" : function(layer) {
				var enc = this.encoders.layers.Layer.call(this, layer);
				return $.extend(enc, {
					type : 'Image',
					baseURL : this.getAbsoluteUrl(layer.getURL(layer.extent)),
					opacity : (layer.opacity != null) ? layer.opacity : 1.0,
					extent : layer.extent.toArray(),
					pixelSize : [ layer.size.w, layer.size.h ],
					name : layer.name
				});
			},
			"Vector" : function(layer) {
				if (!layer.features.length) {
					return;
				}

				var encFeatures = [];
				var encStyles = {};
				var features = layer.features;
				var featureFormat = new OpenLayers.Format.GeoJSON();
				var styleFormat = new OpenLayers.Format.JSON();
				var nextId = 1;
				var styleDict = {};
				var feature, style, dictKey, dictItem, styleName;
				for ( var i = 0, len = features.length; i < len; ++i) {
					feature = features[i];
					style = feature.style
							|| layer.style
							|| layer.styleMap.createSymbolizer(feature,
									feature.renderIntent);
					dictKey = styleFormat.write(style);
					dictItem = styleDict[dictKey];
					if (dictItem) {
						// this style is already known
						styleName = dictItem;
					} else {
						// new style
						if (style.fillColor) {
							style.fillColor = this.to16Bit(style.fillColor);
						}
						if (style.strokeColor) {
							style.strokeColor = this.to16Bit(style.strokeColor);
						}
						if (style.fontColor) {
							style.fontColor = this.to16Bit(style.fontColor);
						}
						styleDict[dictKey] = styleName = nextId++;
						if (style.externalGraphic) {
							// Replaced Ext.applyIf not same as extend
							style.externalGraphic = this.getAbsoluteUrl(style.externalGraphic);
							encStyles[styleName] = $.extend({
								externalGraphic : style.externalGraphic
							}, style);
						} else {
							encStyles[styleName] = style;
						}
					}
					var featureGeoJson = featureFormat.extract.feature.call(
							featureFormat, feature);
					
					delete featureGeoJson.properties.style;

					featureGeoJson.properties = OpenLayers.Util.extend({
						_gx_style : styleName
					}, featureGeoJson.properties);

					encFeatures.push(featureGeoJson);
				}
				var enc = this.encoders.layers.Layer.call(this, layer);
				return $.extend(enc, {
					type : 'Vector',
					styles : encStyles,
					styleProperty : '_gx_style',
					geoJson : {
						type : "FeatureCollection",
						features : encFeatures
					},
					name : layer.name,
					opacity : (layer.opacity != null) ? layer.opacity : 1.0
				});
			},
			"Markers" : function(layer) {
				var features = [];
				for ( var i = 0, len = layer.markers.length; i < len; i++) {
					var marker = layer.markers[i];
					var geometry = new OpenLayers.Geometry.Point(
							marker.lonlat.lon, marker.lonlat.lat);
					var style = {
						externalGraphic : marker.icon.url,
						graphicWidth : marker.icon.size.w,
						graphicHeight : marker.icon.size.h,
						graphicXOffset : marker.icon.offset.x,
						graphicYOffset : marker.icon.offset.y
					};
					var feature = new OpenLayers.Feature.Vector(geometry, {},
							style);
					features.push(feature);
				}
				var vector = new OpenLayers.Layer.Vector(layer.name);
				vector.addFeatures(features);
				var output = this.encoders.layers.Vector.call(this, vector);
				vector.destroy();
				return output;
			}
		},
		"legends" : {
			"gx_wmslegend" : function(legend, scale) {
				var enc = this.encoders.legends.base.call(this, legend);
				var icons = [];
				for ( var i = 1, len = legend.items.getCount(); i < len; ++i) {
					var url = legend.items.get(i).url;
					if (legend.useScaleParameter === true
							&& url.toLowerCase().indexOf(
									'request=getlegendgraphic') != -1) {
						var split = url.split("?");
						var params = {};
						(function() {
							var match, pl = /\+/g, // Regex for replacing
							// addition symbol with a
							// space
							search = /([^&=]+)=?([^&]*)/g, decode = function(s) {
								return decodeURIComponent(s.replace(pl, " "));
							};
							// ,query = window.location.search.substring(1);

							while (match = search.exec(split[1]))
								urlParams[decode(match[1])] = decode(match[2]);
						})();

						// var params = Ext.urlDecode(split[1]);
						params['SCALE'] = scale;
						url = split[0] + "?" + $.param(params);
					}
					icons.push(this.getAbsoluteUrl(url));
				}
				enc[0].classes[0] = {
					name : "",
					icons : icons
				};
				return enc;
			},
			"gx_urllegend" : function(legend) {
				var enc = this.encoders.legends.base.call(this, legend);
				enc[0].classes.push({
					name : "",
					icon : this.getAbsoluteUrl(legend.items.get(1).url)
				});
				return enc;
			},
			"base" : function(legend) {
				return [ {
					name : legend.getLabel(),
					classes : []
				} ];
			}
		}
	};
	
	/**
	 * private: method[to16Bit] :param color: ``String`` :return:
	 * ``String``
	 * 
	 * Converts the provided 8-bit color to 16-bit. Only 8-bit colors will be converted.
	 */
	PrintControlDialog.prototype.to16Bit = function(color) {
		var bit8ColorRegex = new RegExp("^#([0-9a-f]{3})$");
		if (color.match(bit8ColorRegex)) {
			var colorParts = [color.substring(1,2), color.substring(2,3), color.substring(3,4)];
			color = "#" + colorParts.join("0") + "0";
		}
		return color;
	};

	/**
	 * private: method[getAbsoluteUrl] :param url: ``String`` :return:
	 * ``String``
	 * 
	 * Converts the provided url to an absolute url.
	 */
	PrintControlDialog.prototype.getAbsoluteUrl = function(url) {
		var a;
		var version = parseInt($.browser.version, 10);
		if ($.browser.msie && (version === 6 || version === 7|| version === 8)) {
			a = document.createElement("<a href='" + url + "'/>");
			a.style.display = "none";
			document.body.appendChild(a);
			a.href = a.href;
			document.body.removeChild(a);
		} else {
			a = document.createElement("a");
			a.href = url;
		}
		return a.href;
	};

	PrintControlDialog.prototype.onDialogclose = function(e) {
		this.core.module.deactivate();
		//this.core.dialogCloseClicked = true;
		
		// unbind update extent event(s)
		this.map.events.unregister("zoomend", this, this.showExtent);
		this.map.events.unregister("zoomend", this, this.setCurrentScale);
		this.map.events.unregister("changebaselayer", this, this.updateScales);
		this.map.events.unregister("moveend", this, this.showExtent);
		
		// Destroy the extent layer
		this.extentLayer.destroyFeatures();
		this.map.removeLayer(this.extentLayer);
		this.extentLayer.destroy();
		this.extentLayer = null;
		
		return true;
	};

	sMap.Module.SPrint.PrintControlDialog = PrintControlDialog;

}());/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Toolbar = OpenLayers.Class(sMap.Module, {
	
	buttonsConfig : {},
	
	appendIsPresent : false,
	
	functionIsBound : false,
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["addtoolbutton", "addtoolbuttontogglegroup", "addtoolbuttonradiogroup", "addtoolentry", "removeitem", "addselect"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Toolbar.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Toolbar.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
		$(this.div).empty().remove();
		this.div = null;
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
		var self = this;
		
		// Call "destroy" on each module instance connected to the button.
		$(this.toolbarDiv).children().find(".toolbar-button").each(function() {
			var CLASS_NAME = $(this).data("caller");
			var module = self.map.getControlsByClass(CLASS_NAME)[0];
			if (module) {
				module.destroy();
			}
		});
		
		// Empty the toolbar div and the non-used this.div.
		$(this.toolbarDiv).empty().remove();
		$(this.div).remove();
		sMap.events.triggerEvent("removetoolbardiv", this, {});
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draw the non-default content.
     * @returns
     */
	drawContent : function() {
		sMap.events.triggerEvent("addtoolbardiv", this, {
			height : this.height
		});
		this.toolbarDiv = $("<div id='toolbar-maindiv' />");
		$("#toolbarDiv").append(this.toolbarDiv).css({
			"line-height" : this.height + "px"
		});
		this.toolbarDiv.outerHeight(this.height);
		this.toolbarDiv.addClass("ui-widget-header");
		this.toolbarDiv.css({
			"height" : ($("#toolbarDiv").height()-2) + "px"
		});
		
		if (this.addLogotype){
			var logoDiv = $("<div id='toolbar-logo' class='toolbar-logo' ></div>");
			var link = $("<img src='"+ this.logoImgURL +"' alt='" + this.lang.logoAltText + "' width='"+this.logoWidth+"' onclick='window.open(\""+this.logoLinkURL+"\",\"homepage\");'>");
			logoDiv.append(link);
			this.toolbarDiv.append(logoDiv);
		}
		if (this.title){
			var titleDiv = $("<div id='toolbar-title' class='toolbar-title'></div>");
			titleDiv.html(this.title);
			if (this.titleCss) {
				titleDiv.css(this.titleCss);				
			}
			this.toolbarDiv.append(titleDiv);
		}
	},

	
	/******** LISTENERS **************************************************************************************/
	
	/**
	 * Listener to the event "addtoolbutton".
	 * Adds a button to the toolbar which will call one or two
	 * methods sent in as parameters. If no parameters are sent
	 * in, the button will try to use the methods "activate" and
	 * "deactivate".
	 * 
	 *  @param e {Object}
	 *      - on {Function} The function called when button is turned on.
	 *      - off {Function} The function called 
	 *  
	 * @returns
	 */
	addtoolbutton : function(e) {
		this._addtoolbutton(e);
		this.redrawPosition();
	},
	
	/**
	 * Listener to the event "addselect".
	 * Adds a <select> to the toolbar. 
	 * 
	 * @param e {Object}
	 *  
	 * @returns
	 */
	
	addselect : function(e) {
		this._addselect(e);
		this.redrawPosition();
	},
	
	addtoolentry : function(e) {
		var entry = $("<input class='toolbar-entry' type='text' />");
		entry.data("index", e.index);
		var margin = e.margin || (this.toolbarDiv.children().length==0 ? this.buttonMarginInitial : this.buttonMargin);
		
		this.toolbarDiv.append(entry);
		if (this.side=="left") {
			entry.css({
				"margin-left" : margin+"px",
				"margin-right" : margin+"px"
			});
		}
		else {
			entry.css({
				"margin-right" : margin+"px",
				"margin-left" : margin+"px"
			});
		}
		entry.css("width", e.width +"px" || entry.css("width"));
		if (e.tagID) {
			entry.prop("id", e.tagID);
		}
		this.redrawPosition();
		//this.onTagAdded(entry);
		this.fixCSS();
	},
	
	/**
	 * Add many buttons into a button group. The
	 * buttons will not interfer with each other.
	 * They are only VISUALLY grouped together.
	 * @param e {Object}
	 * @returns {void}
	 */
	addtoolbuttontogglegroup : function(e) {
		this._addtoolbuttontogglegroup(e);
		this.redrawPosition();
		this.fixCSS();
	},
	/**
	 * Add many buttons into a button group. Apart from
	 * "addtoolbuttontogglegroup" the buttons here will
	 * work as radiobuttons. This means, pressing one button
	 * in the group will lead to a deactivation of all other
	 * buttons in the group.
	 * @param e {Object}
	 * @returns {void}
	 */
	addtoolbuttonradiogroup : function(e) {
		this._addtoolbuttonradiogroup(e);
		this.redrawPosition();
		this.fixCSS();
	},
	
	/**
	 * Remove an item (button, input or button set) from the toolbar
	 * and reposition the remaining items.
	 * @param e {Object}
	 *     - item {jQuery Object}
	 *     - doNotRedrawPosition {Boolean} If true, the position of the remaining
	 *     		buttons will not be redrawn.
	 * @returns {void}
	 */
	removeitem : function(e) {
		var item = e.item;
		if (item[0].tagName.toUpperCase() == "label") {
			var tagID = item.prop("for");
			item.siblings("#"+tagID).button("destroy").empty().remove();
		}
		else if (item.is("input:checkbox")) {
			var tagID = item.prop("id");
			var label = item.siblings("label[for='"+tagID+"']");
			item.button("destroy");
			label.empty().remove();
		}
		else if (item.is("div.ui-buttonset")) {
			item.buttonset("destroy");
		}
		item.empty().remove();
		
		if (e.doNotRedrawPosition !== true) {
			this.redrawPosition();
		}
		this.fixCSS();
	},
	
	/******** END LISTENERS **************************************************************************************/
	
	/**
	 * NEW function redrawPosition. Should replace the OLD eventually (if the NEW works).
	 * Redraw the position of the buttons so that each
	 * button's position corresponds to its number (index)
	 * given in the configuration of the button.
	 */
	redrawPosition : function() {
		var self = this,
			buttons = self.toolbarDiv.children("div.ui-buttonset, input:text, label, select");
		
		if (buttons.length <= 1) {
			return false;
		}
		
		var btnIndexes = [];
		$.each(buttons, function(k,val){
			var tempSelf = $(this);
			//Do not include buttons w/o a toolbarIndex.
			if( typeof tempSelf.data("index") === "undefined" ){
				return true;
			}
			var temp = {};
			//If the search-dropdown (or the icon-only button for searchoptions-div, see Search_conf.js for details)
			//should be positioned close to searchBox - increment toolbarIndex for each button (apart from the searchBox and search-dropdown/icon-only),
			//that initially has the same index as searchBox.
			if( self.appendIsPresent === tempSelf.data("index") && typeof tempSelf.data("append") === "undefined") {
				tempSelf.data("index", self.appendIsPresent + 1);
			}
			//Store the index in buttons-array plus toolbarIndex
			temp["arrPlace"] = k;
			temp["sortIndex"] = tempSelf.data("index");
			btnIndexes.push(temp);
		});
		
		//Sort btnIndexes-array by toolbarIndex.
		btnIndexes.sort(function(a,b){ return parseFloat(a.sortIndex) - parseFloat(b.sortIndex)});
		//Add each button to toolbar.
		$.each(btnIndexes, function(k,val){
			var arrIndex = this["arrPlace"];
			self.toolbarDiv.append($(buttons[arrIndex]));
		});
	},
	
	/**
	 * OLD function redrawPosition. Should be deleted eventually (if the new one works).
	 * Redraw the position of the buttons so that each
	 * button's position corresponds to its number (index)
	 * given in the configuration of the button.
	 */
	/*redrawPosition : function() {
		var buttons = this.toolbarDiv.children("div.ui-buttonset, input:text, label, select");
		if (buttons.length <= 1) {
			return false;
		}
		//for (var i=0,len=buttons.length; i<len; i++) {
		for (var i=buttons.length-1; i>=0; i--) {
			var b = $(buttons[i]);
			var index = b.data("index");
			
			if (index != i) {
				// If index is not the desired...
				
				// There is no way a button can be moved to an index higher than the no. of buttons...
				// ...so just add the button to the last.
				if (index >= (buttons.length)) {
					this.toolbarDiv.append(b);
				}
				var tag = $(buttons[index]);
				
				// If a button replaces a button which has the same index - increment index
				// for the sibling to avoid future conflicts.
				//if (tag.data("index")===index) {
				//	tag.data("index", index+1);
				//}
				
				if (tag.length && tag[0].tagName.toUpperCase()=="LABEL") {
					// Don't append the button in between "<input/><label/>" (jquery button syntax).
					tag = tag.prev();
				}
				if (tag.length && tag[0] != b[0]) {
					// Move the item
					
					//INVALID!?!? (KB)
					// Hack: There seems to be a bug or at least complication in jquery for safari
					// when adding the input tag using insertBefore, but not when using insertAfter.
					//if (b[0].tagName=="INPUT" && OpenLayers.Util.getBrowserName()=="safari") {
						//b.insertAfter( tag.prev() );
					//}
					// If the search-dropdown (or the icon-only button for searchoptions-div,
					// see Search_conf.js for details) will be positioned close to searchBox.
					if (b[0].id != "searchBox" && b.data("append") == true && index == tag.data("index")){
						b.insertAfter( tag );
					}
					else {
						b.insertBefore( tag );
					}
				}	
			}
			buttons = this.toolbarDiv.children("div.ui-buttonset, input:text, label, select");
		}
	},*/
	
	/**
	 * Iterate through all items of the toolbar and fix the CSS for
	 * each item. A change to CSS only applies if the browser has a
	 * rule defined in the fixTagCSS method.
	 * @returns {void}
	 */
	fixCSS : function() {
		var items = $("#toolbar-maindiv").children("input:text, label, div.ui-buttonset");
		var self = this;
		items.each(function() {
			self.fixTagCSS.call(self, $(this));
		});
	},
	
	/**
	 * Change CSS for an item in the toolbar:
	 * 		- button
	 * 		- button set or
	 * 		- text entry
	 * @param tag {jQuery Tag}
	 * @returns  {void}
	 */
	fixTagCSS : function(tag) {
		// If IE7 add top CSS so that buttons gets an OK position
		// (line-height did not work for IE7)
		if (sMap.db.browser.msie) {
			var tagIsEntry = tag.length ? tag[0].tagName.toUpperCase() == "INPUT" : false;
			var entryExists = this.toolbarDiv.find("input:text").length > 0;
			
			// --- For all versions of IE -------------------------
			if (tagIsEntry) {
				tag.css("top", "2px");
			}
			
			// --- For specific versions of IE ---------------------
			if (parseInt(sMap.db.browser.version) == 7) {
				if (tag.button && tag.buttonLabel) {
					tag = tag.buttonLabel;
				}
				else {
					/* No need for entryExists check of using float: left on all entries
					if (entryExists) {
						// Move button/buttonset upwards
						//tag.css("top", "-4px");
					}
					else {
						tag.css("top", "3px");
					}*/
					tag.css("top", "3px");
				}
				if (tagIsEntry) {
					tag.css("top", "1px");
				}
			}
			else if (parseInt(sMap.db.browser.version) == 8) {
				/* No need for entryExists check of using float: left on all entries
				if (tagIsEntry) {
					tag.css("top", "1px");
				}
				*/
			}
		}
	},
	
	
	
	/**
	 * Add a toolbar button with label and icon.
	 * 
	 * Required properties:
	 * 
	 * @param iconCSS {String} (required) A CSS-class name which has a URL pointing at an image.
	 * 			This syntax is a bit annoying but jquery button cannot take simply a URL to an icon.
	 * 			The CSS class should be present in your module's css.
	 * @param label {String} (required) Label of the button.
	 * @param caller {sMap.Module} The caller class instance
	 * @param tagID {String} (required)
	 * 
	 * Optional parameters:
	 * @param options {Object}
	 *  - on {Function} Function called when turning button on. If not provided, "activate" will be called.
	 *  - off {Function} Function called when turning button off. If not provided, "deactivate" will be called.
	 *  - bindActivation {Boolean} If false, don't bind listener to module's events "activate" and "deactivate".
	 *  - toggle {Boolean} If false, don't allow deactivation of button by clicking on it. Default is true.
	 *  - index {Integer} The position of the button 0 <.
	 *  - appendToSearch {Boolean} Position the button close to searchBox (will override index if set to true).
	 *  
	 */
	
	_addtoolbutton : function(config) {
		config.toggle = config.toggle==undefined ? true : config.toggle;
		
		if (config.bindActivation!==false && !(config.on || config.off)) {
			config.bindActivation = true;
		}
		var self = this;
		
		var b = this.makeButton(config);
		var button = b.button,
			buttonLabel = b.buttonLabel;
		
		buttonLabel.data("index", config.index);
		
		button.attr("unselectable", "on").addClass("unselectable");
		buttonLabel.attr("unselectable", "on").addClass("unselectable");
		
		if (config.appendToSearch == true){
			var sBindex = $("#searchBox").data("index");
			buttonLabel.data("index", sBindex);
			buttonLabel.data("append", true);
			$("#searchBox").data("append", true);
			self.appendIsPresent = sBindex;
			var margin = 2;
		}
		else{
			var margin = this.toolbarDiv.children().length==0 ? this.buttonMarginInitial : this.buttonMargin;
		}
		
		margin = config.margin || margin;
		
		this.toolbarDiv.append(button).append(buttonLabel);
		button.button({
			text: !config.label ? false : true, // decide whether text should be disabled
			icons : {
				primary : config.iconCSS
			}
		});
		if (this.side=="left") {
			$(button).css({
				"left" : margin + "px"
			});
			$(buttonLabel).css({
				"margin-left" : margin + "px"
			});
		}
		else {
			$(button).css({
				"right" : margin + "px"
			});
			$(buttonLabel).css({
				"margin-right" : margin + "px",
				"float": "right"
			});
			//Adding the search-input screws up things in the GUI, so we must do some tweaks.
			if ($.browser.msie && parseInt($.browser.version) < 8) {
//				if( this.toolbarDiv.find("input:text").length > 0 ){
//					$(buttonLabel).css({
//						"margin-top": "-25px"
//					});
//				}
			}
//			else if ( $.browser.mozilla && this.toolbarDiv.find("input:text").length > 0 ) {
//				$(buttonLabel).css({
//					"top": "-36px"
//				});
//			}
			else {
				// Needs some hands-on when adding float right, but not for IE7 surprisingly.
				$(buttonLabel).css({
					"margin-top": "3px"
				});
			}
		}
		//this.onTagAdded(b);
		this.fixCSS();
	},
	
	/**
	 * Add a dropdown (<select>) to the toolbar.
	 * 
	 * @param config {Object}
	 *  - selectObject {jQuery Object} The <select> object.
	 *  - index {Integer} The position of the button 0 <. 
	 *  - appendToSearch {Boolean} Position the dropdown close to searchBox (will override index if set to true).
	 *  - caller {sMap.Module} The caller class instance
	 */
	
	_addselect : function(config){
		var g = config.selectObject;
		g.attr("unselectable", "on").addClass("unselectable");
		
		var caller = config.caller;
		g.data("caller", caller.CLASS_NAME);
		
		if (config.appendToSearch == true){
			var sBindex = $("#searchBox").data("index");
			g.data("index", sBindex);
			g.data("append", true);
			var margin = 2;
		}
		else{
			var margin = this.toolbarDiv.children().length==0 ? this.buttonMarginInitial : this.buttonMargin;
			g.data("index", config.index);
		}
		this.toolbarDiv.append(g);
		if (this.side=="left") {
			$(g).css({
				"margin-left" : margin + "px"
			});
		}
		else {
			$(g).css({
				"margin-right" : margin + "px"
			});
		}
		
		this.fixCSS();
	},
	
	/**
	 * 
	 * @param config
	 * @returns
	 */
	makeButton : function(config) {
		var caller = config.caller;
		var hoverText = config.hoverText? config.hoverText : "";
		var button = $("<input type='checkbox' id='"+config.tagID+"' />"),
			buttonLabel = $("<label for='"+config.tagID+"' title='"+hoverText+"'>"+config.label+"</label>");
		button.data("funcOn", config.on || caller.activate);
		button.data("funcOff", config.off || caller.deactivate);
		button.data("caller", caller.CLASS_NAME);
		
		// Bind listener which activates/deactivates button CSS when module
		// is activated/deactivated.
		// TODO: Bind to the defined on/off function (if defined) instead of
		// activate/deactivate.
		if (config.bindActivation===true && caller.events) {
			caller.events.register("activate", this, function() {
				this.renderButtonAsActive(button);
			});
			caller.events.register("deactivate", this, function() {
				var buttonIsActive = button.prop("checked");
				if (buttonIsActive) {
					this.renderButtonAsInactive(button);
				}
			});
		}
		var self = this;
		button.click(function(e) {
			if ( !$(this).prop("checked")) {
				// Deactivate button only if toggle is allowed (if toggle is not false).
				// If no success in deactivating - don't render the button as inactive.
				if (config.toggle!==false) {
					var success = $(this).data("funcOff").call(caller);
					if (!success) {
						self.renderButtonAsActive( $(this) );
					}
					else{
						self.renderButtonAsInactive( $(this) );
					}
				}
			}
			else {
				// Activate button. If no success - don't render the button as active.
				var success = $(this).data("funcOn").call(caller);
				if (!success) {
					self.renderButtonAsInactive( $(this) );
				}
				else{
					self.renderButtonAsActive( $(this) );
				}
			}
		});
		return {
			button: button,
			buttonLabel: buttonLabel
		};
	},
	
	
	renderButtonAsActive : function(button) {
		button.prop("checked", true);
		var tagID = button.prop("id");
		var label = button.siblings("label[for='"+tagID+"']");
		label.addClass(this.toolbarButtonActiveCSSClass); // next() refers to the button GUI (the label tag of the button)
	},
	
	renderButtonAsInactive : function(button) {
		button.prop("checked", false);
		var tagID = button.prop("id");
		var label = button.siblings("label[for='"+tagID+"']");
		label.removeClass(this.toolbarButtonActiveCSSClass);
		label.removeClass("ui-state-focus"); // focus/hover stays after deactivating
	},
	
	_addtoolbuttontogglegroup : function(config) {
		var configs = config.buttons,
			group = $("<div />"),
			b = null,
			t = null;
		
		var margin = this.toolbarDiv.children().length==0 ? this.buttonMarginInitial : this.buttonMargin;
		this.toolbarDiv.append(group);
		for (var i=0,len=configs.length; i<len; i++) {
			t = configs[i];
			t.caller = config.caller;
			b = this.makeButton(t);
			group.append(b.button).append(b.buttonLabel);
			b.button.button({
				text: !t.label ? false : true, // decide whether text should be disabled
				icons : {
					primary : t.iconCSS
				}
			});
		}
		group.buttonset();
		
		group.data("index", config.index);

		$(group).css({
			"position" : "relative",
			"display" : "inline"
		});
		
		if (this.side=="left") {
			$(group).css({
				"margin-left" : margin + "px"
			});
		}
		else {
			$(group).css({
				"margin-right" : margin + "px"
			});
		}
		//this.onTagAdded(group);
		this.fixCSS();

	},
	
	_addtoolbuttonradiogroup : function(config) {
		var configs = config.buttons,
			group = $("<div />"),
			b = null,
			t = null;
		
		var margin = this.toolbarDiv.children().length==0 ? this.buttonMarginInitial : this.buttonMargin;
		this.toolbarDiv.append(group);
		for (var i=0,len=configs.length; i<len; i++) {
			t = configs[i];
			t.caller = config.caller;
			b = this.makeRadioButton(t);
			group.append(b.button).append(b.buttonLabel);
			b.button.button({
				text: !t.label ? false : true, // decide whether text should be disabled
				icons : {
					primary : t.iconCSS || null
				}
			});
		}
		group.buttonset();
		group.data("index", config.index);
		$(group).css({
			"position" : "relative",
			"display" : "inline"
		});
		if (this.side=="left") {
			$(group).css({
				"margin-left" : margin + "px"
			});
		}
		else {
			$(group).css({
				"margin-right" : margin + "px"
			});
		}
		//this.onTagAdded(group);
		this.fixCSS();
	},
	
	makeRadioButton : function(config) {
		var button = $("<input type='radio' id='"+config.tagID+"' name='radio' />"),
			buttonLabel = $("<label for='"+config.tagID+"'>" + config.label + "</label>");
		
		var caller = config.caller;
		button.data("funcOn", config.on || caller.activate);
		button.data("funcOff", config.off || caller.deactivate);
		button.data("caller", caller.CLASS_NAME);
		
		// Bind listener which activates/deactivates button CSS when module
		// is activated/deactivated.
		// TODO: Bind to the defined on/off function (if defined) instead of
		// activate/deactivate.
		if (config.bindActivation===true && caller.events) {
			caller.events.register("activate", this, function() {
				var buttonIsActive = button.prop("checked")===true;
				if (buttonIsActive) {
					this.renderButtonAsActive(button);
				}
			});
			caller.events.register("deactivate", this, function() {
				var buttonIsActive = button.prop("checked")===true;
				if (buttonIsActive) {
					this.renderButtonAsInactive(button);
				}
			});
		}
		var self = this;
		button.click(function(e) {
			var theOtherButtons = button.parent().find("input[checked!=true]");
			theOtherButtons.each(function() {
				$(this).prop("checked", false).removeClass("ui-state-active");
				$(this).data("funcOff").call(caller);
			});
			if ( $(this).prop("checked")===true) {
				// Deactivate button only if toggle is allowed (if toggle is not false)
				if (config.toggle!==false) {
					$(this).data("funcOn").call(caller);
				}
			}
		});
		return {
			button: button,
			buttonLabel: buttonLabel
		};
		
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Toolbar"
	
});




sMap.moduleConfig.Toolbar = {
		
		activateFromStart : false,
		
		height : 38,
		
		toolbarButtonActiveCSSClass : "ui-state-active", //"toolbar-button-active",
		
		/**
		 * The side from which the buttons should start.
		 * "left" OR "right"
		 */
		side : "left",
		
		/**
		 * Default margin between buttons in the toolbar in px.
		 */
		buttonMargin : 15,
		/**
		 * First button's margin from side
		 */
		buttonMarginInitial : 10,
		addLogotype : false,
		logoImgURL : "http://kartor.kristianstad.se/img/bild/Kristianstad_logo_endastvapen_rgb.gif",
		logoLinkURL : "http://www.kristianstad.se",
		logoWidth : 60,
		title : "" //"<a href='http://www.kristianstad.se' target=_blank>Titel</a>" //text or html to place from left efter logo in toolbar
};
sMap.Lang.lang.Toolbar = {
	"sv-SE" : {
		test: "Test",
		logoAltText : "Länk till hemsidan"
	},
	"en" : {
		test: "Test",
		logoAltText : "Link to homepage"
	}
	
};/**
 * @author Kristian Bergstrand
 * @copyright Helsingborgs stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.ToolsMenu = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["addtomenu", "removebtnfromtoolsmenu"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	// Keeps track of the modules in toolsMenu.
	modulesInToolsMenu : [],
	
	// Add these modules when activating the module.
	addTheseToMenu : [],
	
	// Keeps track of all the toolsMenus.
	toolsMenuDivs : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.ToolsMenu.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.ToolsMenu.prototype.EVENT_TRIGGERS.concat(
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
		var self = this;
		
		// Draw final position for each of the "hover-divs".
		$.each(self.toolsMenuDivs, function(key,val) {
				self.drawToolsMenu(val["menu"], val["id"]);
		});
		
		// Attach modules to the correct toolsMenu.
		$.each(self.addTheseToMenu, function(key,val){
			self.addtooltotoolsmenu(val["btn"],val["config"]);
		});
		
		// Remove state active from start (sohuld only add on hover).
		setTimeout(function() {
			var btns = $(".toolsmenu-mainbutton");
			btns.each(function() {
				$(this).removeClass("ui-state-active");
			});						
		}, 20);
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		
		$(".toolsmenu-dropdown").each(function(){
			$(this).empty().remove();
		});
		
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
     * 
     * @returns
     */
	
	drawContent : function() {
		var self = this,
			toolsMenus = self.menuBtns;
		
		$.each(toolsMenus, function(i,val){
			var theId = "button-toolsmenu" + val["menuId"];
			sMap.events.triggerEvent("addtoolbutton", self, {
				index : val["toolBarIndex"] || 1,
				label : val["lblText"] || self.lang.labelText,
				iconCSS : "ui-icon-triangle-1-s",
				tagID : theId
			});
			var btn = $("label[for='"+theId+"']");
			btn.addClass("toolsmenu-mainbutton");
			if (val.marginRight) {
				btn.css("margin-right", val.marginRight);
			}
			
			// Create "hover-div".
			var hoverDiv = self.createToolsMenu(theId, val["menuId"]);
			hoverDiv.attr("unselectable", "on").addClass("unselectable");
			var menuAndId ={
					menu : hoverDiv,
					id : val["menuId"]
			};
			// Store "hover-div" and internal ID-extension. To be used on activation
			// of the module, when the final position of the "hover-div" will be drawn.
			self.toolsMenuDivs.push(menuAndId);
			
		});
		
		// Reposition the dropdown on resize.
		var self = this;
		$(window).resize(function() {
			setTimeout(function() {
				self.positionDropDowns();
			}, 200);
		});
	},
	
	/**
     * Called when all modules have added tools to toolsMenu(s). 
     * Draws the final position of the "hover-divs".
     * 
     * @param menu {Object}
     * 			"Hover-div" to be appended to the toolsMenu-button (jQuery-object).
     * @param menuID {String}
     * 			The internal suffix for the IDs, to keep track of multiple toolsMenus. 
     * @returns
     */
	drawToolsMenu : function(menu, menuID) {
		var toolsMenuDiv = menu;
		$("#toolbar-maindiv").append(toolsMenuDiv);
	},
	
	/**
	 * Position the dropdowns so that they go below the toggle button.
	 * 
	 * @returns {void}
	 */
	positionDropDowns: function() {
		$(".toolsmenu-dropdown").each(function() {
			var dropDown = $(this);
			var menuID = "button-toolsmenu" + dropDown.attr("id").replace("toolsmenu-dropdown", "");
			var btn = $("label[for='"+menuID+"']");
			var btnOffset = btn.offset(),
				height = btn.outerHeight();
			
			$(dropDown).css({
				"left" : btnOffset.left,
				"position" : "absolute",
				"top" :  btnOffset.top + height -3
			});		
			
		});
		
	},
	
	
	
	/**
	 * Create the container for the menu.
	 * 
	 * @param btnId {String}
	 * 		The id of the toolbar-button (i.e. for the label...jquery-ui syntax).
	 * 			E.g: "button-toolsmenu1"
	 * 
	 * @param menuId {String}
	 * 		The internal suffix for the IDs, to keep track of multiple toolsMenus.
	 * 			E.g: 1
	 * 
	 * @returns toolsMenuDiv {Object}
	 * 		jQuery-object holding the "hover-div".
     */
	
	createToolsMenu : function(btnId, menuId) {
		var self = this,
			toggleDivId = "toolsmenu-dropdown" + menuId;
		
		// Create "hover-div" and specify the btn to which it will be appended.
		// Then add some css-classes and hide it from start.
		var	toolsMenuDiv = $("<div id='" + toggleDivId + "' />"),
			btnArea = $("label[for='" + btnId + "']");
		
		toolsMenuDiv.addClass("toolsmenu-dropdown ui-widget-content ui-state-default");
		var minWidth = $("label[for='"+btnId+"']").width();
		toolsMenuDiv.css("min-width", minWidth+"px");
		toolsMenuDiv.hide();
		
		// Define what should happen on click, hover and mouseleave.
		btnArea.click(function(event){
			if( $("#" + toggleDivId ).is(":visible") ){
				self.renderBtnAsInactive($("#"+btnId));
				$("#" + toggleDivId ).hide();
				event.preventDefault();
			}
			else{
				self.renderBtnAsActive($("#"+btnId));
				$("#" + toggleDivId ).show();
				event.preventDefault();
			}
		});
		
		btnArea.hover(function(){
			self.renderBtnAsActive($("#"+btnId));
			$("#" + toggleDivId ).show();
		},function(){
			toolsMenuDiv.hover(function(){
				self.renderBtnAsActive($("#"+btnId));
				$("#" + toggleDivId ).show();
			},function(){
				self.renderBtnAsInactive($("#"+btnId));
				$("#" + toggleDivId ).hide();
			});
		});	
			
		btnArea.mouseleave(function(event){
			self.renderBtnAsInactive($("#"+btnId));
			$("#" + toggleDivId ).hide();
		});
		
	return toolsMenuDiv;
	},
	
	/**
	 * Draw the position of the buttons so that each
	 * button's position corresponds to its number (index)
	 * given in the configuration of the button.
	 * 
	 * @param menuDiv {Object}
	 * 		Defines which toolsMenu that will be redrawn (jQuery-object).
	 * 
	 * @returns
	 */
	drawPosition : function(menuDiv) {
		var self = this,
			buttonRows = menuDiv.children(".toolsmenu-rows");
		
		if (buttonRows.length <= 1) {
			return false;
		}
		
		for (var i=buttonRows.length-1; i>=0; i--) {
			var buttonRow = $(buttonRows[i]);
			var index = buttonRow.children("label").data("index");
			
			if (index != i) {
				// If index is not the desired...
				
				// There is no way a button can be moved to an index higher than the no. of buttons...
				// ...so just add the button to the last.
				if (index >= (buttonRows.length)) {
					menuDiv.append(buttonRow);
				}
				var tag = $(buttonRows[index]).children("div.ui-buttonset, input:text, label");
				
				// If a button replaces a button which has the same index - increment index
				// for the sibling to avoid future conflicts.
				if (tag.data("index")===index) {
					tag.data("index", index+1);
				}	
			}
			buttonRows = menuDiv.children(".toolsmenu-rows");
		}
	},
	
	/**
	 * Render a button as active.
	 * 
	 * @param button {Object}
	 * 		The toolbar-button to render as active (jQuery object).
	 * 
	 * @returns
	 */
	
	renderBtnAsActive : function(button) {
		button.prop("checked", true);
		var tagID = button.prop("id");
		var label = button.siblings("label[for='"+tagID+"']");
		label.addClass(this.toolbarBtnActiveCSSClass);
	},
	
	/**
	 * Render a button as inactive.
	 * 
	 * @param button {Object}
	 * 		The toolbar-button to render as inactive (jQuery object).
	 * 
	 * @returns
	 */
	
	renderBtnAsInactive : function(button) {
		button.prop("checked", false);
		var tagID = button.prop("id");
		var label = button.siblings("label[for='"+tagID+"']");
		label.removeClass(this.toolbarBtnActiveCSSClass);
	},
	
	/**
	 * Remove a module from the toolsMenu(s), and reposition the remaining modules.
	 * 
	 * @param e {Object}
	 *     - lblToDel {String} 
	 *     		The label for the button to remove from toolsMenu.
	 *     		E.g. "button-copylink"
	 *     	
	 *     - doNotRedrawPosition {Boolean} If true, the position of the remaining
	 *     		buttons will not be redrawn.
	 *     
	 * @returns
	 */
	removebtnfromtoolsmenu : function(e) {
		var self = this,
			lblToDel = e.lblToDel;
		
		//Find which module to delete in modulesInToolsMenu array. Return if not found.
		var modIndex = $.inArray(lblToDel,self.modulesInToolsMenu);
		if ( modIndex == -1){
			return;
		}
		//If found, delete module from array.
		self.modulesInToolsMenu.splice(modIndex,1);
		
		var btnToDel = $(".toolsmenu-dropdown").children(".toolsmenu-rows").find("label[for='"+lblToDel+"']");
		btnToDel.siblings("#"+lblToDel).button("destroy").empty().remove();
		btnToDel.empty().remove();
		
		if (e.doNotRedrawPosition !== true) {
			var menuDivs = $(".toolsmenu-dropdown");
			$.each(menuDivs,function(){
				self.drawPosition($(this));
			});
		}
	},
	
	/**
	 * Make a "jQuery ui" button.
	 * 
	 * @param config
	 *  
	 * @returns {Object}
	 * 		- modBtn {Object} jQuery-ui button.
	 * 		- modBtnLabel {Object} Label for the button.
	 */
	
	makeBtn : function(config) {
		var self = this,
			caller = config.caller,
			hoverText = config.hoverText ? config.hoverText : "";
		
		var modBtn = $("<input type='checkbox' id='"+config.tagID+"' />"),
			modBtnLabel = $("<label for='"+config.tagID+"' title='"+hoverText+"'>"+config.label+"</label>");
		modBtn.data("funcOn", config.on || caller.activate);
		modBtn.data("funcOff", config.off || caller.deactivate);
		modBtn.data("caller", caller.CLASS_NAME);
		modBtnLabel.data("index", config.index);
		
		// Bind listener which activates/deactivates button CSS when module is activated/deactivated.
		// TODO: Bind to the defined on/off function (if defined) instead of activate/deactivate.
		if (config.bindActivation===true && caller.events) {
			caller.events.register("activate", this, function() {
				var btn = modBtn;
				var buttonIsActive = btn.prop("checked") ? true : false;
				if (buttonIsActive) {
					self.renderBtnAsActive(btn);
				}
			});
			caller.events.register("deactivate", this, function() {
				var btn = modBtn;
				var buttonIsActive = btn.prop("checked");
				if (buttonIsActive) {
					self.renderBtnAsInactive(btn);
				}
			});
		}
		
		modBtn.click(function(e) {
			if ( !$(this).prop("checked")) {
				// Deactivate button only if toggle is allowed (if toggle is not false).
				// If no success in deactivating - don't render the button as inactive.
				if (config.toggle!==false) {
					var success = $(this).data("funcOff").call(caller);
					if (!success) {
						self.renderBtnAsActive( $(this) );
					}
					else{
						self.renderBtnAsInactive( $(this) );
					}
				}
			}
			else {
				// Activate button. If no success - don't render the button as active.
				var success = $(this).data("funcOn").call(caller);
				if (!success) {
					self.renderBtnAsInactive( $(this) );
				}
				else{
					self.renderBtnAsActive( $(this) );
				}
			}
		});
		return {
			button: modBtn,
			buttonLabel: modBtnLabel
		};
		
	},
	
	/**
	 * Checks if the module is already in the toolsMenu(s).
	 * 
	 * @param modToAdd {String} Name of the module as specified in config.tagID.
	 *  
	 * @returns modToAdd {String} Name of the module as specified in config.tagID. IF it is not found.
	 * 			false {Boolean} IF it is already in the toolsMenu(s).
	 */
	
	doubleCheck : function(modToAdd){
		var modulesInToolsMenu = this.modulesInToolsMenu,
			check = $.inArray(modToAdd,modulesInToolsMenu);
		if (check!=-1){
			return false;
		}
		else{
			modulesInToolsMenu[modulesInToolsMenu.length]=modToAdd;
			return modToAdd;
		}
	},
	
	/**
	 * Listener to the event "addtomenu".
	 * 
	 * Adds button along with its config to object "addTheseToMenu". When toolsMenu-module is activated, 
	 * these buttons will be appended to the right toolsMenu-dropdown.
	 * The button will call one or two methods sent in as parameters. If no parameters are sent
	 * in, the button will try to use the methods "activate" and "deactivate".
	 * 
	 *  @param e {Object}
	 *      - on {Function} The function called when button is turned on.
	 *      - off {Function} The function called 
	 *  
	 * @returns
	 */
	
	addtomenu : function(config){
		var self = this;
		
		//Check to see if module already exists in a toolsMenu.
		var checkDoubles = self.doubleCheck(config.tagID);
		if(checkDoubles===false){return false;}
		
		config.toggle = config.toggle==undefined ? true : config.toggle;
		if (config.bindActivation!==false && !(config.on || config.off)) {
			config.bindActivation = true;
		}
		
		//Make the button
		var btn = self.makeBtn(config);
		
		// Allows triggering the event when the module is active. May be needed.
		if (self.active === true){
			self.addtooltotoolsmenu(btn,config);
		}
		else{
			var btnAndConfig = {
					"btn" : btn,
					"config" : config
			};
			self.addTheseToMenu.push(btnAndConfig);
		}
	},
	
	/**
	 * Adds a button to the toolsMenu.
	 * 
	 *  @param btn {Object}
	 *  @param config {Object}
	 *  
	 * @returns
	 */
	
	addtooltotoolsmenu : function(btn, config) {
		// Append module to the toolsMenu specified in config.menuId, or append it to first toolsMenu in
		// toolsMenu_conf.js if not specified.
		var toolsMenuDiv = $("#toolsmenu-dropdown"+config.menuId).length ? $("#toolsmenu-dropdown"+config.menuId) : $("#toolsmenu-dropdown"+this.menuBtns[0].menuId);
		
		var modBtn = btn.button,
			modBtnLabel = btn.buttonLabel,
			modRow = $("<div class='toolsmenu-rows' />");
		
		modRow.append(modBtn).append(modBtnLabel);
		toolsMenuDiv.append(modRow);
		modBtn.button({
			text: !config.label ? false : true, // decide whether text should be disabled
			icons : {
				primary : config.iconCSS
			}
		});
		modRow.children(".ui-button").css({
			"display":"block",
			"margin" : "0"
		});
		this.drawPosition(toolsMenuDiv);
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.ToolsMenu"
});sMap.moduleConfig.ToolsMenu = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : true,
		
		toolbarBtnActiveCSSClass : "ui-state-active",
		
		/**
		 * One or more toolsMenu-buttons to be created. By default modules will be placed in the first menu, 
		 * but they can change it, by specifying menu by menuId when triggering "addtomenu". (E.g: menuId : 5). 
		 * 		
		 * The menuIds will be appended to internal ID-syntax, e.g. menuId : 5 will be "#toolsmenu-dropdown5" etc.
		 * Just make sure to make them unique in this config-file. 
		 * 
		 * When setting "lblText" below, the default text ("Fler verktyg"/"Moore tools") will be overridden.
		 * 
		 */ 
		menuBtns : [ 
		             {
		            	 menuId : 5,
		            	 lblText : "sMap++",
		            	 toolBarIndex : 2
		             }/*,
		             {
		            	 menuId : 7,
		            	 //lblText : "MyTools",
		            	 toolBarIndex : 7
		             },
		             {
		            	 menuId : "tools",
		            	 lblText : "sMap--",
		            	 toolBarIndex : 4
		             }*/
		             ]
};
sMap.Lang.lang.ToolsMenu = {
	"sv-SE" : {
		labelText : "Fler verktyg",
		noToolsText : "Inga verktyg"
	},
	en : { 
		labelText : "More tools",
		noToolsText : "No tools"
	}
};