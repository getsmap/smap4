sMap.moduleConfig.MousePos = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : true,
		//showScale : false, //Does not work. See Trac (#10)
		containerDiv : "#mapDiv",
		showMousePos : true,
		mouseChoices : {
			"EPSG:3006" : {
				displayName : "Sweref99 TM",
				decimals : 0
			},
			"EPSG:3008" : {
				displayName : "Sweref99 1330",
				decimals : 0
			},
			"EPSG:4326" : {
				displayName : "WGS84",
				decimals : 4
			},
			"EPSG:3021" : {
				displayName : "RT90 2.5 V",
				decimals : 0
			},
			"EPSG:900913" : {
				displayName : "Google",
				decimals : 0
			}
		}
};