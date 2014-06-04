/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.WFST = OpenLayers.Class(sMap.Module, {
	
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
	 *Variables used to separate the features which will be added to the layer  
	 */
	toBeAdded: [],
	toBeDeleted: [],
		
	controls: {},
	
	xtraDiv: null,
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.WFST.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.WFST.prototype.EVENT_TRIGGERS.concat(
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
		
		this.addEditLayer();
		this.createControls();
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		
		if(this.editLayer){
			this.editLayer.destroy();
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

	}, 
	
	/**
	 * Method: onSaveSuccess
	 * @param {void}
	 * @return {void}
	 * This method displays a message when transaction is successfully 
	 * performed 
	 */
	onSaveSuccess : function() {
		this.saveStrategy.events.unregister("success", this, this.onSaveSuccess);		
	},
	
	/**
	 * Method: onSaveFailure
	 * @param {void}
	 * @return {void}
	 * This method displays a message when transaction is not successfully 
	 * performed 
	 */
	onSaveFailure : function(e) {
				
	},
	
	/**
	 * Method: saveEdits
	 * @param {void}
	 * @returns {void} 
	 * Saves the features on the layer with state INSERT, DELETE or UPDATE.
	 */
	saveEdits : function() {
		var f = null;
		if(this.lastAddedFeature){
			f = this.lastAddedFeature;
		}
		if(f == null){
			if(this.editLayer.selectedFeatures[0]){
				f = this.editLayer.selectedFeatures[0];
			}
			else{
				for(var i=0, leni=this.editLayer.features.length; i<leni; i++){
					if(this.editLayer.features[i].state == "Update"){
						f = this.editLayer.features[i];
					}
				}
			}
		}
		if(f !== null){
			if(this.controltype == "editattribute"){
				if(f.state == "Update"){
					f.data = f.attributes;
				}
			}
			
			sMap.util.getGeomType(f.geometry);
			this.editLayer.protocol.setFeatureType(this.featureTypes);
			
			// It might not be enough to setFeatureType using the method above.
			// Also need to change the schema.
			var schema = this.editLayer.protocol.schema;
			var arr = schema.split(":");
			arr[arr.length-1] = this.featureTypes;
			this.editLayer.protocol.schema = arr.join(":");
			
			this.saveStrategy.save([f]);
		
			this.lastAddedFeature = null;
			if(this.editLayer.selectedFeatures.length > 0){
				if(this.editLayer.selectedFeatures[0].renderIntent == "delete"){
					this.editLayer.selectedFeatures[0].destroy();
				}
				else{
						this.controls.select.unselectAll();
				}
			}
		}
	},
	
	/**
	 * Method: createSaveStrategy
	 * @param {void}
	 * @return {void}
	 * This method creates an OL save strategy 
	 */
	createStrategy: function(){
		var saveStrategy = new OpenLayers.Strategy.Save();
		var fixedStrategy = new OpenLayers.Strategy.Fixed();

		this.saveStrategy = saveStrategy;
		this.fixedStrategy = fixedStrategy;
	},
	
	/**
	 * Add a vector layer that can communicated with the server.
	 * @param {void}
	 * @returns {void}
	 * Connect event listeners onSaveSuccess and onSaveFailure.
	 */
	addEditLayer : function() {
		
		this.createStrategy();	
		this.getLayerStyle();
				
		var editLayer = new OpenLayers.Layer.Vector("POI Editing Features", {
			styleMap : this.styleMap, //new OpenLayers.StyleMap("default"),
			strategies: [this.saveStrategy, this.fixedStrategy],
			projection: new OpenLayers.Projection(this.map.projection), //new OpenLayers.Projection("EPSG:4326"),
			extractAttributes: true,
			protocol: new OpenLayers.Protocol.WFS({
				version: this.WFSVersion,
				srsName: this.map.projection,
				url: this.WFSService,
				featureNS : this.featureNS,
				featureType: this.featureTypes,
				geometryName: this.geometryName,
				schema: this.WFSService
						+ "DescribeFeatureType?version="
						+ this.WFSVersion
						+ "&typename="
						+ this.workspace
						+ ":"
						+ this.featureTypes
	        })
	    });
		
		this.editLayer = editLayer;
		if(!this.featureTypes){
			return false;
		}
		else{

			this.map.addLayers([this.editLayer]);
			this.editLayer.events.register("loadend", this, function() {
				var feature = this.editLayer.features;
				for(var i=0, leni=feature.length; i<leni; i++){
					if(feature[i].attributes.removed == "true"){
						this.toBeDeleted.push(feature[i]);
					}
					else{
						this.toBeAdded.push(feature[i]);
					}
				}
				this.editLayer.features = [];
				this.editLayer.addFeatures(this.toBeAdded);
				this.editLayer.removeFeatures(this.toBeDeleted);
				this.toBeDeleted = [];
				this.toBeAdded = [];
			});
			
		}
	},
	
	unregisterListeners: function() {
		for (var i=0,len=this.EVENT_LISTENERS.length; i<len; i++) {
			var eventName = this.EVENT_LISTENERS[i];
			sMap.events.unregister(eventName, this, this[eventName]);
		}
	},

	/**
	 * Method: destroyEditLayer
	 * @param {void}
	 * @return {void}
	 * This destroy the edit layer.
	 */
	destroyEditLayer: function(){
		if(this.editLayer){
			this.unregisterListeners();
			this.editLayer.destroy();
			this.editLayer = null;
		}
	},
	
	/**
	 * Method: recreateEditLayer
	 * @param {void}
	 * @return{void}
	 * This recreate the vector layer, draw controls and 
	 * bind the listeners to this layer.
	 */
	recreateEditLayer: function(){
		this.addEditLayer();
		this.createControls();
	},

	/**
	 * Method: createControls
	 * @param (void)
	 * @return (void
	 * This creates All the Controls for the POIEditing.
	 */
	createControls : function(){
		this.controls = {
			point: new OpenLayers.Control.DrawFeature(
				this.editLayer,
				OpenLayers.Handler.Point,
				{
					title: this.lang.hoverTextPoint,
					type : OpenLayers.Control.TYPE_TOGGLE,
					multi: false
				}),

			line: new OpenLayers.Control.DrawFeature(
				this.editLayer,
				OpenLayers.Handler.Path,
				{
					title: this.lang.hoverTextLine,
					type : OpenLayers.Control.TYPE_TOGGLE,
					multi: true
				}),

			polygon: new OpenLayers.Control.DrawFeature(
				this.editLayer,
				OpenLayers.Handler.Polygon,
				{
					title: this.lang.hoverTextPolygon,
					type : OpenLayers.Control.TYPE_TOGGLE,
					multi: true
				}),
				
			select: new OpenLayers.Control.SelectFeature(this.editLayer),

			modify: new OpenLayers.Control.ModifyFeature(this.editLayer),
			
			drag: new OpenLayers.Control.DragFeature(this.editLayer)
		
		};
		
		for(var key in this.controls) {
            this.map.addControl(this.controls[key]);
        };
	},
	
	/**
	 * Method: destroyAllControl
	 * @param {void}
	 * @return {void}
	 * This method destroy the ALL controls 
	 */
	destroyAllControl : function(){
		if(this.controls.drag){
			if(this.controls.drag.active === true){
				this.controls.drag.destroy();
			}
		}
		if(this.controls.modify){
			if(this.controls.modify.active === true){
				this.controls.modify.destroy();
			}
		}
		if(this.controls.point){
			if(this.controls.point.active === true){
				this.controls.point.destroy();
			}
		}
		if(this.controls.line){
			if(this.controls.line.active === true){
				this.controls.line.destroy();
			}
		}
		if(this.controls.polygon){
			if(this.controls.polygon.active === true){
				this.controls.polygon.destroy();
			}
		}
		this.geombtnIsActive = false;
	},
	
	/**
	 * Method: deactivateAllDrawCtrl
	 * @param void
	 * @return void
	 * This deactivate all the draw controls if active.
	 */
	deactivateAllDrawCtrl : function(){
		if(this.controls.drag){
			if(this.controls.drag.active === true){
				this.controls.drag.deactivate();
			}
		}
		if(this.controls.modify){
			if(this.controls.modify.active === true){
				this.controls.modify.deactivate();
			}
		}
		if(this.controls.point){
			if(this.controls.point.active === true){
				this.controls.point.deactivate();
			}
		}
		if(this.controls.line){
			if(this.controls.line.active === true){
				this.controls.line.deactivate();
			}
		}
		if(this.controls.polygon){
			if(this.controls.polygon.active === true){
				this.controls.polygon.deactivate();
			}
		}
		if(this.controls.select){
			if(this.controls.select.active === true){
				this.controls.select.deactivate();
			}
		}
		
		
	},
	
	getLayerStyle : function(){
		/**
		 * See: http://docs.openlayers.org/library/feature_styling.html 
		 */
		var styleMap = new OpenLayers.StyleMap({
			"default" : new OpenLayers.Style({
				pointRadius : 6,
				fillColor : "#FF5B00",
				fillOpacity : 0.3,
				graphicName: "circle",
				strokeWidth : 3,
				strokeColor : "#FF5B00",
				strokeOpacity : 1,
				cursor : "pointer"
			}),
			"temporary" : new OpenLayers.Style({
				pointRadius : 6,
				fillColor : "#FF5B00",
				fillOpacity : 0.3,
				graphicName: "square",
				strokeWidth : 4,
				strokeColor : "#FF5B00",
				strokeOpacity : 1,
				cursor : "pointer"
			}),
			"select" : new OpenLayers.Style({
				pointRadius : 6,
				fillColor : "#ffffff",
				fillOpacity : 0.3,
				graphicName: "square",
				strokeWidth : 3,
				strokeColor : "#00f",
				strokeOpacity : 1,
				cursor : "pointer"
			})
		});
		
		this.styleMap = styleMap;
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.WFST"
	
});