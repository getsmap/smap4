/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.TestModule = OpenLayers.Class(sMap.Module, {
	
	buttonsConfig : {},
	
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
	EVENT_LISTENERS : [],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : ["setbaselayer"],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.TestModule.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.TestModule.prototype.EVENT_TRIGGERS.concat(
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
		alert("I am activating");
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		alert("I am deactivating");
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
		
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draw the non-default content.
     * @returns
     */
	drawContent : function() {
		
		function request() {
			// Trigger the event to ask for the features.
			/*sMap.events.triggerEvent("getfeatures", this, {
				bbox : [118336, 6163990, 130000, 6165000]
			});*/
			/*sMap.events.triggerEvent("fetchselectfeatures", this, {
				bbox : [118336, 6163990, 130000, 6165000],
				dialog : false,
				add : false
				
			});*/
			sMap.events.triggerEvent("unselect", this, {
				bbox : [118336, 6163990, 130000, 6165000],
				dialog : false,
				add : false
			});
		};
		
		/*sMap.events.register("selected", this, function(e) {
			debug.log("Selected: " + e.features.length);
			debug.log("Remaining selected: " + e.selectedFeatures.length);
		});*/
		
		// Register listener to fetch features when done.
		/*sMap.events.register("fetchedfeatures", this, function(e) {
			debug.log(e.features[0].layerName);
		});*/
		
		/*
		 * The correct way of adding a radio button group.
		sMap.events.triggerEvent("addtoolbuttonradiogroup", this, {
			index : 3,
			buttons : [
				       {
				    	   iconCSS : "ui-icon-gear",
				    	   on : this.on1,
				    	   off : this.off1,
				    	   tagID : "radio-test1"
				       },
				       {
				    	   iconCSS : "ui-icon-gear",
				    	   label : "radio-2",
				    	   on : this.on2,
				    	   off : this.off2,
				    	   tagID : "radio-test2"
				       },
				       {
				    	   iconCSS : null,
				    	   label : "radio-3",
				    	   on : this.on3,
				    	   off : this.off3,
				    	   tagID : "radio-test3"
				       }
			]
		});
		*/
		
		/*sMap.events.triggerEvent("addtoolentry", this, {
			index : 0,
			width : 100,
			tagID : "search-entry"
		});
		sMap.events.triggerEvent("addtoolentry", this, {
			index : 3,
			width : 100,
			tagID : "search-entry"
		});
		sMap.events.triggerEvent("addtoolbuttontogglegroup", this, {
			index : 2,
			buttons : [
			       {
			    	   label : "toggle-1",
			    	   on : this.on1,
			    	   off : this.off1,
			    	   tagID : "button-test1"
			       },
			       {
			    	   iconCSS : "ui-icon-gear",
			    	   on : this.on2,
			    	   off : this.off2,
			    	   tagID : "button-test2"
			       },
			       {
			    	   iconCSS : "ui-icon-gear",
			    	   label : "toggle-3",
			    	   on : this.on3,
			    	   off : this.off3,
			    	   tagID : "button-test3"
			       } 
			   ]
		});*/
		
		var aFunc = function(e) {
			sMap.events.triggerEvent("removeitem", this, {
				item : $("#toolbar-maindiv").find("input:text")
			});
		};
		
		//sMap.events.triggerEvent("addsidedivright", this, {
		//	width : 100
		//});
		$("#sideDivRight").click(function() {
			sMap.events.triggerEvent("removesidedivright", this, {});
		});
		
		/*
		OpenLayers.Request.GET({
			url : "http://xyz.malmo.se/ArcGIS/services/malmo_sma_wms/MapServer/WMSServer", //"http://geoserver.smap.se/geoserver/wms",
			params : {
				SERVICE: "WMS",
	            VERSION: "1.3.0",
	            REQUEST: "GetCapabilities"
			},
			callback : function(response) {
				var div = $("<div />"),
					xmlFormat = new OpenLayers.Format.XML(),
					format = new OpenLayers.Format.WMSCapabilities();
				
				// Read the response
				var info = format.read( response.responseXML || xmlFormat.read(response.responseText) );
				
				// Get info about a specific layer
				var layers = info.capability.layers;
				var t = layers[0];
				
				// Get all supported image formats for this layer.
				var formats = t.formats;
				
				// Get legend image properties (URL, width and height).
				var legend = t.styles[0].legend;
				var h = legend.height,
					w = legend.width,
					href = legend.href;
				
				var projObj = t.bbox,
					epsgs = [];
				// Store all available projections for this layer in epsgs.
				for (var epsg in projObj) {
					epsgs.push(epsg);
				}
				// Get bbox for a specific projection
				var bbox = t.bbox[sMap.config.projection].bbox;
				
				
				
			},
			success : function() {
			}
		});
		
		
		$.ajax({
			type : "GET",
			url : "http://xsbk0236.sbkmalmo.local:8080/cgi-bin/proxy.py?url=http://geoserver.smap.se/geoserver/wms",
			dataType : "xml",
			data : {
				SERVICE: "WMS",
	            VERSION: "1.1.1",
	            REQUEST: "GetCapabilities"
			},
			success : function(data) {
				var div = $("<div />"),
					xmlFormat = new OpenLayers.Format.XML(),
					format = new OpenLayers.Format.WMSCapabilities();
				//data = xmlFormat.read(data);
				var arr = format.read(data);
				
				for (var i=0,len=arr.length; i<len; i++) {
					var t = arr[i];
					console.log(t);
				}
			}
		});*/
	},
	
	on1 : function() {
		debug.log("on1");
	},
	on2 : function() {
		debug.log("on2");
	},
	on3 : function() {
		debug.log("on3");
	},
	off1 : function() {
		debug.log("off-1");
	},
	off2 : function() {
		debug.log("off-2");
	},
	off3 : function() {
		debug.log("off-3");
	},
	
	createSingleButton : function() {
		sMap.events.triggerEvent("addtoolbutton", this, {
			icon : "img/icon_print.png",
			label : "Tryck här"
		});
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.TestModule"
	
});




