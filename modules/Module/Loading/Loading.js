/**
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
	
});