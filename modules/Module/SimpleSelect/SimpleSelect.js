/**
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
	
});