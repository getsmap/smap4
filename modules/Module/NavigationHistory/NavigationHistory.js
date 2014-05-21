/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.NavigationHistory = OpenLayers.Class(sMap.Module, {

    /**
     * APIProperty: previous
     * {<OpenLayers.Control>} A button type control whose trigger method restores
     *     the previous state managed by this control.
     */
    previous: null,
    
    /**
     * APIProperty: previousOptions
     * {Object} Set this property on the options argument of the constructor
     *     to set optional properties on the <previous> control.
     */
    previousOptions: null,
    
    /**
     * APIProperty: next
     * {<OpenLayers.Control>} A button type control whose trigger method restores
     *     the next state managed by this control.
     */
    next: null,

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
	 * The events triggered from this module. Modules should not
	 * listen and trigger the same event. Instead it should be solved
	 * by calling an internal method within the module when the event
	 * is triggered.
	 */
	EVENT_TRIGGERS : ["addtoolbuttoncontainer"],
	
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.NavigationHistory.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.NavigationHistory.prototype.EVENT_TRIGGERS.concat(
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
		this.setMap(sMap.map);
		//var active = this.activateOL();
		//var active = OpenLayers.Control.NavigationHistory.prototype.activate();
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
		// Remember - if you are using handlers - they also need to be deactivated.
		// If the parent class is using handlers they should be deactivated by the
		// return statement (see below) and not needed to be called from here.
		//this.handlers["click"].deactivate();
		
		// Events which are not bound to sMap.events need to be unregistered here.
		// sMap.events are taken care of in base-class Module. However, only
		// if listeners are defined as methods with same name as the event.
		if (this.map.events.length) {
			//this.map.events.unregister("movestart", this, this.onMoveStart);
			//this.map.events.unregister("moveend", this, this.onMoveEnd);
		}
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
	
	/**
	 * 
	 * @returns void
	 */
	drawContent : function() {
//		sMap.events.triggerEvent("addtoolbutton",{
//			on: this.zoomPrevious,
//			index: 5
//		});
//		sMap.events.triggerEvent("addtoolbutton",{
//			on: this.zoomNext,
//			index: 6
//		});
		sMap.events.triggerEvent("addtoolbuttoncontainer",{
			radio:true,
			buttons:[
			         {
			        	tooltip:this.lang.tooltipPrev,
			        	img:"img/navigation_history_prev.png",
			        	imgDisabled:"img/navigation_history_prev_dis.png",
			        	on: this.zoomPrevious,
			 			index: 5
			         },
			         {
			        	 tooltip:this.lang.tooltipNext,
				        img:"img/navigation_history_next.png",
				        imgDisabled:"img/navigation_history_next_dis.png",
			        	on: this.zoomNext,
			 			index: 6
			         }
			]
		});
		var mainDiv = $("<div id='NavigationHistory-mainDiv' />");
		$(this.div).append(mainDiv);
		var btnDiv = $("<input type='button' value='"+this.lang.tooltipPrev+"' />");
		mainDiv.append(btnDiv);
		btnDiv.click(this.zoomPrevious);
	},
	/**
	 * Zoom previous
	 */
	zoomPrevious : function(){
		this.previousTrigger();
	},
	/**
	 * Zoom next
	 */
	zoomNext : function(){
		this.nextTrigger();
	},

	 /** 
     * Method: setMap
     * Set the map property for the control and <previous> and <next> child
     *     controls.
     *
     * Parameters:
     * map - {<OpenLayers.Map>} 
     */
    setMap: function(map) {
        this.map = map;
        this.next.setMap(map);
        this.previous.setMap(map);
    },
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.NavigationHistory"
	
});
