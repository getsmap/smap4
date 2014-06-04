sMap.moduleConfig.ConfigSelector = {
		/**
		 * Module for switching config file. 
		 * Listeners:
		 * afterapplyingwebparams
		 * Sets the current config option from the web params
		 */
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		/**
		 * Available config files and their corresponding theme names
		 * optional could overlays "ol" and backgroundlayer "bl" be specified. 
		 * These will override ol and bl specified by the user in the current map
		 */
		dropDownItems : {
			// "plan3": {
		   		// file : "configs/test_3008.js",
		   		// name : "Planerade bostäder",
		   		// ol   : ""
		   	// },
			// "gsdggsdg": {
		   		// file : "configs/atlas_v_higgins5.js",
		   		// name : "stadskartaaaaa",
		   		// ol   : "",
		   		// bl   : "stadskartan"
		   	// }
		},
		/**
		 * Toolbarindex
		 */
		toolbarIndex : 15,
		/**
		 * Keep zoom and center in new theme
		 */
		keepZoom : true,
		/**
		 * Keep backgroundlayer in new theme. Overridden if bl specified in dropDownItems
		 */
		keepBackground : true,
		/**
		 * Keep overlays in new theme. Overridden if ol specified in dropDownItems
		 */
		keepOverlays : true,
		/**
		 * Keep opacity values for the overlays
		 */
		keepOpacities : false,
		/**
		 * Keep drawn features in new theme
		 */
		keepFeatures : true
};