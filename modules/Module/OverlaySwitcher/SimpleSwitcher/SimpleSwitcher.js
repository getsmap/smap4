/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 * @requires sMap/Module/OverlaySwitcher.js
 */

sMap.Module.OverlaySwitcher.SimpleSwitcher = OpenLayers.Class(sMap.Module.OverlaySwitcher, {
	
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
			sMap.Module.OverlaySwitcher.SimpleSwitcher.prototype.EVENT_LISTENERS.concat(
				sMap.Module.OverlaySwitcher.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.OverlaySwitcher.SimpleSwitcher.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.OverlaySwitcher.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.OverlaySwitcher.prototype.initialize.apply(this, [options]);
		this.conf = sMap.moduleConfig.OverlaySwitcher.SimpleSwitcher;
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		// Call the activate function of the parent class
		return sMap.Module.OverlaySwitcher.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		// Call the deactivate function of the parent class
		return sMap.Module.OverlaySwitcher.prototype.deactivate.apply(
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
		
		return sMap.Module.OverlaySwitcher.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		this.addOverlaySwitcher();
		// z-index must be one unit less than baselayersSwitcher
		// so that those buttons can be clicked
		$(this.div).css("z-index", 1006);
	},
	addOverlaySwitcher : function() {
		
		this.label = this.lang.labelText || "Overlays"; // {String}
		this.maximizerWidth = this.conf.maximizerWidth && typeof(this.conf.maximizerWidth)==typeof(232) ? this.conf.maximizerWidth + "px" : "auto"; // {Integer}
		var dropDownWidthPx = this.conf.dropDownWidth ? this.conf.dropDownWidth + "px" : null;
		
		
		// Create the container for the layers' checkboxes.
		var checkboxBar = $("<div id='checkboxBar' class='overlay-checkbox-bar' />");
		checkboxBar.hide(); // Start hidden
		checkboxBar.addClass("overlaySwitcher");
		
		checkboxBar.width(this.conf.dropDownWidth);
		
		
		// Create the "maximizer button" which toggles the checkboxBar
		var maximizer = $("<div  class='ui-widget-content ui-state-default maximizer'  id='maximizer'>" + this.label + "</div>");
		maximizer.css("width", this.maximizerWidth);
		
		var oldBorder = maximizer.css("border");
		
		// Show the overlay checkboxbar when hovering maximizer button and
		// when hovering the checkboxbar itself.
		maximizer.hover(function() {
				// Add a white border to fill in the space in-between button and overlay bar.
				$(this).addClass("maximizer-dropDown");
				

				$("#checkboxBar").show();
			},function() {
				// take it away
				$(this).removeClass("maximizer-dropDown");
				$("#checkboxBar").hide();
		});
		checkboxBar.hover(function() {
					// Keep the white fill in-between button and overlay bar
					// although leaving maximizer button.
					$("#maximizer").addClass("maximizer-dropDown");
					$(this).show();
			}, function() {
					// Take away the white fill in-between button and overlay bar.
					$("#maximizer").removeClass("maximizer-dropDown");
					$(this).hide();
		});
		
		/* Disable map interaction on these events. */
		maximizer.dblclick(function(e) {
			OpenLayers.Event.stop(e);
		});
		maximizer.mousedown(function(e) {
			OpenLayers.Event.stop(e);
		});
		maximizer.click(function(e) {
			OpenLayers.Event.stop(e);
		});
		checkboxBar.dblclick(function(e) {
			OpenLayers.Event.stop(e);
		});
		checkboxBar.mousedown(function(e) {
			OpenLayers.Event.stop(e);
		});
		// Prevent click going to the map.
		checkboxBar.click(function(e) {
			OpenLayers.Event.stop(e);
		});
		/* End of interaction hack */
		
		// Change CSS for the container
		var divWidth = null;
		
		
		maximizer.css("float", "left");
		//checkboxBar.css("float", "right");
		
		var top = this.conf.top || 5;
		var right = !this.conf.left ? (this.conf.right || 200) : null;
		
		$(this.div).css({
			"position" : "absolute",
			"top" : top + "px",
			"right" : right + "px",
			"font-size" : "12px"
		});
		
		//var bLayerDiv = $("#baselayerDiv");   // Var används denna??
		

		// Append checkboxBar and maximizer to the user interface,
		$(this.div).prepend(maximizer);
		$(this.div).append(checkboxBar);
		
		
		$(this.div).css("width", this.conf.dropDownWidth + 2 + "px"); // dropDownWidth + border (if any) + padding (if any)
		
		this.addRowsHtml(checkboxBar);
		var self = this;
		$(checkboxBar).children().each(function() {
			self.defineClick($(this), true);
		});
		// Add the "uncheck-all-button" at the bottom of overlay-switcher
		if (this.conf.btnUncheckAll) {
			var label = this.lang.uncheckAllText || "Avmarkera alla";
			this.addBtnUnCheckAll(checkboxBar, label);
		}
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.OverlaySwitcher.SimpleSwitcher"
	
});