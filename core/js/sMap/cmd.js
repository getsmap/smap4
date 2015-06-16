/**
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
		sMap.layer.hideAllLayers(false);
	},

	removealllayers: function() {
		sMap.layer.hideAllLayers(true);
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