sMap.moduleConfig.AdvSearch = {
		 
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false,
		button : true, //If set to false - do not add button to GUI.
		dialogStartPosition : [50,50],
		height : 250,
		width: 450,
		/**
		 * Is result is a single point this determines the zoomlevel
		 */
		pointZoomLevel : 6,
		/**
		 * Configuration for the attributes of each searchable WFS-layer.
		 * Each row in "searchableAttr" object consists of layername ("name" for the overlay) as key and the attributes as value.
		 * The attributes are defined in a array, where the meaning of the first boolean value 
		 * is whether or not to include an option to search in all defined attributes for the layer.
		 * 
		 * E.g:
		 * 	"hamn" : [true, "NAMN", "STATUS", "NYTT"]
		 * 
		 */
		searchableAttr: {
			"natur" : [true, "namn"],
			"hamn" : [true, "NAMN", "STATUS", "NYTT"]
			//"naturmiljovard" : [false, "VARDE", "AREAM", "LAGRUM"]
		},
		
		subFilter : {
			Comparison : {
				"LIKE" : "Innehåller",
				"EQUAL_TO" : "Lika med",
				"NOT_EQUAL_TO" : "Inte lika med"
				//NOT implemented LESS_THAN,GREATER_THAN,LESS_THAN_OR_EQUAL_TO,GREATER_THAN_OR_EQUAL_TO,BETWEEN	
			}
		//FeatureId : false, //NOT implemented (new OpenLayers.Filter.FeatureId)
		//Logical : [AND,ELSE,OR] //NOT implemented (OR is default and unchangeable right now).
		},
		/**
		 * @property dialogIfMany {Boolean}
		 * If true, create a dialog if more than one feature was found on request.
		 * In the dialog the user has to choose one feature.
		 */
		dialogIfMany : true,
		spinnerOption : true //Show a spinner while waiting for response from server.
};