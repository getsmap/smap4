/**
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
	
});