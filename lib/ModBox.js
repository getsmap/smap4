

OpenLayers.Handler.ModBox = OpenLayers.Class(OpenLayers.Handler.Box, {
	
	/**
     * Constructor: OpenLayers.Handler.Box
     *
     * Parameters:
     * control - {<OpenLayers.Control>} 
     * callbacks - {Object} An object with a "done" property whose value is a
     *     callback to be called when the box drag operation is finished.  
     *     The callback should expect to recieve a single argument, the box 
     *     bounds or a pixel. If the box dragging didn't span more than a 5 
     *     pixel distance, a pixel will be returned instead of a bounds object.
     * options - {Object} 
     */
    initialize: function(control, callbacks, options) {
		OpenLayers.Util.extend(this, options);
		OpenLayers.Handler.Box.prototype.initialize.apply(this, arguments);
		
        this.dragHandler = new OpenLayers.Handler.ModDrag(
            this,
            {
                down: this.startBox, 
                move: this.moveBox, 
                out: this.removeBox,
                up: this.endBox
            },
            {keyMask: this.keyMask}
        );
    },
	
	CLASS_NAME : "OpenLayers.Handler.ModBox"
	
	
});