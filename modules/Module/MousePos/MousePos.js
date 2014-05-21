/**
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
	
});