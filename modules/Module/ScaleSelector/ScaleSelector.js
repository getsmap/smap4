/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.ScaleSelector = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.ScaleSelector.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.ScaleSelector.prototype.EVENT_TRIGGERS.concat(
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

		var scaleSelectorDiv = $('<div id="scaleSelectorDiv" unselectable="on" class="unselectable" />');
		$(this.map.viewPortDiv).parent().append(scaleSelectorDiv);
		this.createDropDown();   //Where the scale options is stored
		this.bindEventListeners();
	}, 
	
	/**
	 * Method: createDropDown
	 * @param {void}
	 * @return {void}
	 * This method creates and add a drop down menu on the viewPortDiv.
	 */
   	createDropDown : function() {
   		var self = this;
   		var viewPortScalePostion = $("#scaleSelectorDiv"); //$("#toolbar-maindiv");
		var resolutions = this.map.resolutions;
		var scaleOptions = ""; 

		for (var i=0,len=resolutions.length; i<len; i++) {
		    //(var arrIndex in resolutions){
			
			//The default OL DOTS_PER_INCH is 72 therefore it had to be changed to 96 in oder to match 
			//the scale from this map resolution
			OpenLayers.DOTS_PER_INCH = 96;
			
			var scale = parseInt(Math.round( OpenLayers.Util.getScaleFromResolution(resolutions[i], "m") ));
			scaleOptions =  scaleOptions + "<option value='" + scale + "'>" + "1:" + scale + "</option>";
		}

		var dropDownOptions = $("<select unselectable='on' class='unselectable' name='scales' id='scaleSelectOpt'>" + scaleOptions + "</select>");
		this.dropDownOptions = dropDownOptions;
		this.viewPortScalePostion = viewPortScalePostion;
		$(this.map.viewPortDiv).parent().append(this.dropDownOptions);
		
		//onChange of the dropDown
		$('#scaleSelectOpt.unselectable').change(function() {
			var zoomIndex = self.dropDownOptions[0].selectedIndex;
			self.zoomToLevel(zoomIndex);
		});
		
	},
	
	destroyDropDown : function(){
		this.unbindEventListeners();
		this.viewPortScalePostion.remove(this.dropDownOptions);
	},
	
	/**
	 * Method: bindEventListeners
	 * @param {void}
	 * @return {void}
	 * This method register and bind the "zoomend" event listener to the map
	 * Whenever the user zoom in or out the scale will be update. 
	 */
	bindEventListeners : function(){
		this.map.events.register("zoomend", this, function(){
			if (this.map) {
				var zoom = this.map.getZoom();
				this.changeScaleValue(zoom);				
			}
		});

		this.map.events.register("changebaselayer",this, function(){
			var prevResolution = this.map.resolution;
			this.map.resolutions = this.map.baseLayer.resolutions;
			this.replaceScalesList();
			var result = this.keepPrevScale(prevResolution);
			var indexOf = $.inArray(result, this.map.resolutions);
			if(indexOf < 0){
				
				//Set the ZOOM to the last zoom Level in the map resolution
				//if the indexOf is negative
				indexOf = this.map.resolutions.length-1; 
			}
			this.zoomToLevel(indexOf);
			this.changeScaleValue(indexOf);
//			$("#scaleSelectOpt").val(this.map.resolutions[indexOf]);
		});
	},
	
	keepPrevScale : function(prevResolution){
		var newMapResolutions = this.map.resolutions;
		var tempResolution = 0;
		var result = 0;
		
		for(var i=0, leni=newMapResolutions.length; i<leni; i++){
			tempResolution = newMapResolutions[i];
			if(i==0){
				if(tempResolution == prevResolution){
					var result = tempResolution;
					i=leni;
				}
			}
			else{
				for(var j=1, lenj=newMapResolutions.length; j<lenj; j++){
					tempResolution = newMapResolutions[j];
					if(tempResolution < prevResolution){
						var resultA = newMapResolutions[j]; 	 //less than prevResolution
						var resultB = newMapResolutions[j-1]; //greater solution
						
						var possibleA = Math.abs(resultA - prevResolution);
						var possibleB = Math.abs(resultB - prevResolution);
						
						var closest = Math.min(possibleA, possibleB);
						if(closest == possibleA){
							result = resultA;
						}
						if(closest == possibleB){
							result = resultB;							
						}
						
						j = lenj; //Stops the interaction of SECOND FOR LOOP ( j )
						i = lenj; //Stops the interaction of FIRST  FOR LOOP ( i )
					}
				}
			}
		}
		return result;
	},
	
	replaceScalesList : function(){
		$('#scaleSelectOpt').replaceWith();
		 this.createDropDown();
	},
	
	/**
	 * Method: unbindEventListeners
	 * @param {void}
	 * @return {void}
	 * This is the opposite of the bindEventListener method
	 * It can be used if necessary.
	 */
	unbindEventListeners : function(){
		this.map.events.unregister("zoomend",this, function(){
			
		});
		this.map.events.unregister("changebaselayer",this, function(){
			
		});
	},
	
	/**
	 * Method: zoomToLevel
	 * @param {Interger} numZoomLevel the map will be set 
	 * @return {void}
	 * This method zoom to the level according to the user selection from the scale Drop Down Menu
	 */
	zoomToLevel : function(zoom){
		this.map.zoomTo(zoom);
	},
	
	/**
	 * Method: changeScaleValue
	 * @param {Integer} selectedIndex from the Drop Down Menu
	 * @return {void} 
	 */
	changeScaleValue : function(newIndex){
		var htmlElements = this.dropDownOptions[0];
		htmlElements.selectedIndex = newIndex;
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.ScaleSelector"
	
});