/**
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
	
});