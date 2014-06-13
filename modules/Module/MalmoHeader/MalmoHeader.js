/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.MalmoHeader = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.MalmoHeader.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.MalmoHeader.prototype.EVENT_TRIGGERS.concat(
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
		var headerHtml = 
			'<!--[if IE]><meta content="IE=edge" http-equiv="X-UA-Compatible"/><![endif]-->'+
			'    <!--[if lte IE 8]><script src="//assets.malmo.se/external/v4/html5shiv-printshiv.js" type="text/javascript"></script><![endif]-->'+
			'    <link href="//assets.malmo.se/external/v4/masthead_standalone.css" media="all" rel="stylesheet" type="text/css"/>'+
			'    <!--[if lte IE 8]><link href="//assets.malmo.se/external/v4/legacy/ie8.css" media="all" rel="stylesheet" type="text/css"/><![endif]-->'+
			'    <noscript><link href="//assets.malmo.se/external/v4/icons.fallback.css" rel="stylesheet"></noscript>'+
			'    <link rel="icon" type="image/x-icon" href="//assets.malmo.se/external/v4/favicon.ico"/>'
		$("head").prepend(headerHtml);
		$("body").addClass("mf-v4 no-footer");
		$("body").addClass("test"); // during dev only
		$("body").prepend('<script src="//assets.malmo.se/external/v4/masthead_standalone_without_jquery.js"></script>');
		$("#smapDiv").css({
			"margin-top": "3.7em"
		});
	}, 
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.MalmoHeader"
	
});