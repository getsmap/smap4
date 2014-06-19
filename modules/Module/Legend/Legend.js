/**
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
				if (!t || !t.legend || !t.legend.hover || !t.legend.hover.url) {
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
	
});