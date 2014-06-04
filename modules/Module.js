/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes/Class.js
 * @requires OpenLayers/Console.js
 */

/**
 * Class: OpenLayers.Control
 * Controls affect the display or behavior of the map. They allow everything
 * from panning and zooming to displaying a scale indicator. Controls by 
 * default are added to the map they are contained within however it is
 * possible to add a control to an external div by passing the div in the
 * options parameter.
 * 
 * Example:
 * The following example shows how to add many of the common controls
 * to a map.
 * 
 * > var map = new OpenLayers.Map('map', { controls: [] });
 * >
 * > map.addControl(new OpenLayers.Control.PanZoomBar());
 * > map.addControl(new OpenLayers.Control.MouseToolbar());
 * > map.addControl(new OpenLayers.Control.LayerSwitcher({'ascending':false}));
 * > map.addControl(new OpenLayers.Control.Permalink());
 * > map.addControl(new OpenLayers.Control.Permalink('permalink'));
 * > map.addControl(new OpenLayers.Control.MousePosition());
 * > map.addControl(new OpenLayers.Control.OverviewMap());
 * > map.addControl(new OpenLayers.Control.KeyboardDefaults());
 *
 * The next code fragment is a quick example of how to intercept 
 * shift-mouse click to display the extent of the bounding box
 * dragged out by the user.  Usually controls are not created
 * in exactly this manner.  See the source for a more complete 
 * example:
 *
 * > var control = new OpenLayers.Control();
 * > OpenLayers.Util.extend(control, {
 * >     draw: function () {
 * >         // this Handler.Box will intercept the shift-mousedown
 * >         // before Control.MouseDefault gets to see it
 * >         this.box = new OpenLayers.Handler.Box( control, 
 * >             {"done": this.notice},
 * >             {keyMask: OpenLayers.Handler.MOD_SHIFT});
 * >         this.box.activate();
 * >     },
 * >
 * >     notice: function (bounds) {
 * >         OpenLayers.Console.userError(bounds);
 * >     }
 * > }); 
 * > map.addControl(control);
 * 
 */
sMap.Module = OpenLayers.Class({
	
	/**
	 * Modules location in relation to smap root.
	 */
	modulesLocation : "modules/Module/",
	
	/**
	 * The folder of this module
	 */
	ROOT : null,
	
    /** 
     * Property: id 
     * {String} 
     */
    id: null,
    
    /** 
     * Property: map 
     * {<OpenLayers.Map>} this gets set in the addControl() function in
     * OpenLayers.Map 
     */
    map: null,

    /** 
     * Property: div 
     * {DOMElement} 
     */
    div: null,

    /** 
     * Property: type
     * {Number} Controls can have a 'type'. The type determines the type of
     * interactions which are possible with them when they are placed in an
     * <OpenLayers.Control.Panel>. 
     */
    type: null, 

    /** 
     * Property: allowSelection
     * {Boolean} By deafault, controls do not allow selection, because
     * it may interfere with map dragging. If this is true, OpenLayers
     * will not prevent selection of the control.
     * Default is false.
     */
    allowSelection: false,  

    /** 
     * Property: displayClass 
     * {string}  This property is used for CSS related to the drawing of the
     * Control. 
     */
    displayClass: "",
    
    /**
    * Property: title  
    * {string}  This property is used for showing a tooltip over the  
    * Control.  
    */ 
    title: "",

    /**
     * APIProperty: autoActivate
     * {Boolean} Activate the control when it is added to a map.  Default is
     *     false.
     */
    autoActivate: false,
    /**
     * sMap specific property replacing autoActivate
     */
    activateFromStart : false,

    /** 
     * Property: active 
     * {Boolean} The control is active.
     */
    active: null,

    /** 
     * Property: handler 
     * {<OpenLayers.Handler>} null
     */
    handler: null,
    
    
    /**
     * APIProperty: eventListeners
     * {Object} If set as an option at construction, the eventListeners
     *     object will be registered with <OpenLayers.Events.on>.  Object
     *     structure must be a listeners object as shown in the example for
     *     the events.on method.
     */
    eventListeners: null,

    /** 
     * Property: events
     * {<OpenLayers.Events>} Events instance for triggering control specific
     *     events.
     */
    events: null,
    
    /**
     * Constant: EVENT_TYPES
     * {Array(String)} Supported application event types.  Register a listener
     *     for a particular event with the following syntax:
     * (code)
     * control.events.register(type, obj, listener);
     * (end)
     *
     * Listeners will be called with a reference to an event object.  The
     *     properties of this event depends on exactly what happened.
     *
     * All event objects have at least the following properties:
     * object - {Object} A reference to control.events.object (a reference
     *      to the control).
     * element - {DOMElement} A reference to control.events.element (which
     *      will be null unless documented otherwise).
     *
     * Supported map event types:
     * activate - Triggered when activated.
     * deactivate - Triggered when deactivated.
     */
    EVENT_TYPES: ["activate", "deactivate"],
    
    
    /**
	 * The smap-events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["modulesadded"],
	
	/**
	 * The smap-events triggered from this module. Modules should not
	 * listen and trigger the same event. Instead it should be solved
	 * by calling an internal method within the module when the event
	 * is triggered.
	 */
	EVENT_TRIGGERS : [],

    /**
     * Constructor: OpenLayers.Control
     * Create an OpenLayers Control.  The options passed as a parameter
     * directly extend the control.  For example passing the following:
     * 
     * > var module = new OpenLayers.Module({div: myDiv});
     *
     * Overrides the default div attribute value of null.
     * 
     * Parameters:
     * options - {Object} 
     */
    initialize: function(options) {
        // We do this before the extend so that instances can override
        // className in options.
        //this.displayClass = this.CLASS_NAME.replace("OpenLayers.", "ol").replace(/\./g, "");
        
		
	
        this.MODULE_NAME = this.getModuleName(); // Store the last part of the class name
        this.ROOT = this.modulesLocation + this.MODULE_NAME + "/";
        
        // Get the configuration from file and extend it with
        // config given as parameter.
        var fileConfig = this.getFileConfig();
		$.extend(true, fileConfig, options);
		$.extend(true, this, fileConfig);
        
        this.addSmapEventTypes();
        
        // Add control events (events bound to this module).
        this.events = new OpenLayers.Events(this, null, this.EVENT_TYPES);
        if(this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
        if (this.id == null) {
            this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
        }
        this.storeLang();
    },
    
    getFileConfig : function() {
    	return sMap.moduleConfig[this.MODULE_NAME] || {};
    },
    
    /**
     * Add event types to sMap.events so that other modules can
     * bind to these events via sMap core. Also bind a function
     * with the same name as the event. Note that the creator
     * of the module must keep same name for event and function,
     * otherwise comes a warning.
     * 
     * @returns void
     */
    addSmapEventTypes : function() {
	    var triggers = this.EVENT_TRIGGERS,
	    	listeners = this.EVENT_LISTENERS;
		if (listeners.length) {
			for (var i=0,len=listeners.length; i<len; i++) {
				sMap.events.addEventType(listeners[i]);
				var func = this[ listeners[i] ];
				if (!func) {
					var msg = "Module "+this.CLASS_NAME+" has EVENT_LISTENER(S) "+listeners[i]+" registered\nbut no method with same name.";
					debug.warn(msg);
				}
				else {
					sMap.events.register(listeners[i], this, func);
				}
			}
		}
		if (triggers.length) {
			for (var i=0,len=triggers.length; i<len; i++) {
				sMap.events.addEventType(triggers[i]);
			}
		}
    },
    
    /**
     * sMap-module-method
     * 
     * Returns the class name without "sMap.Module.". E.g.
     * "sMap.Module.MyModule" -> "MyModule" or
     * "sMap.Module.MyModule.MySubModule" -> "MyModule.MySubModule"
     * @returns {String}
     */
    getModuleName : function() {
    	var MODULE_NAME = this.CLASS_NAME.replace("sMap.Module.", "");
    	return MODULE_NAME;
    },
    
    /**
     * sMap-module-method
     * 
     * Get the lang dictionary for currently used language.
     * Store as this.lang. The subclass can then access all
     * texts through e.g.: this.lang.buttonLabel
     * @returns
     */
    storeLang : function() {
    	this.langCode = sMap.Lang.getCode(); // this.langCode || 
    	
    	var langArr = this.MODULE_NAME.split(".");
    	var langContainer = sMap.Lang.lang;
    	for (var i=0,len=langArr.length; i<len; i++) {
    		langContainer = langContainer[langArr[i]];
    	}
		this.lang = langContainer[this.langCode];
    	
    },

    /**
     * Method: destroy
     * The destroy method is used to perform any clean up before the control
     * is dereferenced.  Typically this is where event listeners are removed
     * to prevent memory leaks.
     */
    destroy: function () {
    	// Remove this modules' (controls') events: "activate" and "deactivate".
    	if(this.events) {
            if(this.eventListeners) {
                this.events.un(this.eventListeners);
            }
            this.events.destroy();
            this.events = null;
        }
        this.eventListeners = null;
    	
    	/**
    	 * Remove module's listeners. Note!!! This only works if the listener
    	 * function has the same name as the event. E.g. a listener to the event
    	 * "onlayersloaded" requires a method with the name onlayersloaded.
    	 */
    	var smap_events = this.EVENT_LISTENERS;
    	//events.concat(this.EVENT_TRIGGERS);
    	
    	if (smap_events.length) {
    		for (var i=0,len=smap_events.length; i<len; i++) {
    			var eventName = smap_events[i];
    			var func = this[ eventName ];
    			sMap.events.unregister(eventName, this, func);
    		}
    	}
        // eliminate circular references
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }
        if(this.handlers) {
            for(var key in this.handlers) {
                if(this.handlers.hasOwnProperty(key) &&
                   typeof this.handlers[key].destroy == "function") {
                    this.handlers[key].destroy();
                }
            }
            this.handlers = null;
        }
        if (this.map) {
            this.map.removeControl(this);
            this.map = null;
        }
    },

    /** 
     * Method: setMap
     * Set the map property for the control. This is done through an accessor
     * so that subclasses can override this and take special action once 
     * they have their map variable set. 
     *
     * Parameters:
     * map - {<OpenLayers.Map>} 
     */
    setMap: function(map) {
        this.map = map;
        if (this.handler) {
            this.handler.setMap(map);
        }
    },
    
    /**
     * sMap-module-method
     * 
     * Draw the visual components of the module.
     * @returns
     */
    drawContent : function() {
    	return true;
    },
    
    modulesadded : function(e) {
    	if (this.drawContent) {
    		this.drawContent();
    	}
    },
    
    /**
     * Method: draw (modified for sMap-module)
     * The draw method is called when the control is ready to be displayed
     * on the page.  If a div has not been created one is created.  Controls
     * with a visual component will almost always want to override this method 
     * to customize the look of control. 
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>} The top-left pixel position of the control
     *      or null.
     *
     * Returns:
     * {DOMElement} A reference to the DIV DOMElement containing the control
     */
    draw: function (px) {
        this.drawThisDiv();
        return this.div;
    },
    
    /**
     * sMap-module-method renamed from OL original "draw".
     * 
     * Create the standard div (this.div).
     * This code was previously witin this.draw
     * but has been moved so that we can support the
     * method drawContent.
     * @param px
     * @returns
     */
    drawThisDiv : function(px) {
    	if (this.div == null) {
            this.div = OpenLayers.Util.createDiv(this.id);
            this.div.className = this.displayClass;
            if (!this.allowSelection) {
                this.div.className += " olControlNoSelect";
                this.div.setAttribute("unselectable", "on", 0);
                this.div.onselectstart = OpenLayers.Function.False; 
            }
        }
        if (px != null) {
            this.position = px.clone();
        }
        this.moveTo(this.position);
        $(this.div).attr("z-index", "1000");
        
        return this.div;
    	
    },

    /**
     * Method: moveTo
     * Sets the left and top style attributes to the passed in pixel 
     * coordinates.
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     */
    moveTo: function (px) {
        if ((px != null) && (this.div != null)) {
            this.div.style.left = px.x + "px";
            this.div.style.top = px.y + "px";
        }
    },

    /**
     * Method: activate
     * Explicitly activates a control and it's associated
     * handler if one has been set.  Controls can be
     * deactivated by calling the deactivate() method.
     * 
     * Returns:
     * {Boolean}  True if the control was successfully activated or
     *            false if the control was already active.
     */
    activate: function () {
        if (this.active) {
            return false;
        }
        if (this.handler) {
            this.handler.activate();
        }
        this.active = true;
        if(this.map) {
            OpenLayers.Element.addClass(
                this.map.viewPortDiv,
                this.displayClass.replace(/ /g, "") + "Active"
            );
        }
        this.events.triggerEvent("activate");
        return true;
    },
    
    /**
     * Method: deactivate
     * Deactivates a control and it's associated handler if any.  The exact
     * effect of this depends on the control itself.
     * 
     * Returns:
     * {Boolean} True if the control was effectively deactivated or false
     *           if the control was already inactive.
     */
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            if(this.map) {
                OpenLayers.Element.removeClass(
                    this.map.viewPortDiv,
                    this.displayClass.replace(/ /g, "") + "Active"
                );
            }
            this.events.triggerEvent("deactivate");
            return true;
        }
        return false;
    },

    CLASS_NAME: "sMap.Module"
});

/**
 * Constant: OpenLayers.Control.TYPE_BUTTON
 */
OpenLayers.Control.TYPE_BUTTON = 1;

/**
 * Constant: OpenLayers.Control.TYPE_TOGGLE
 */
OpenLayers.Control.TYPE_TOGGLE = 2;

/**
 * Constant: OpenLayers.Control.TYPE_TOOL
 */
OpenLayers.Control.TYPE_TOOL   = 3;
