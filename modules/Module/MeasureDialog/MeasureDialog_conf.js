sMap.moduleConfig.MeasureDialog = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false,
		toolbarIndex : null,
		/**
		 * Adds the tool button to menu or as a stand alone button
		 */
		addToToolsMenu : false,
		/**
		 * Use point measuring, true or false
		 */
		point : true,
		/**
		 * Allow user to search by coordinate (point has to be set to true above).
		 */
		coordsSearch : true,
		/**
		 * Dialog start size and position
		 */
		dialogStartPosition : [240, 100],
		width : 200 + 10,
		height : 190,
		showMeasureAtCursor : true,
		/**
		 * Style for the measure sketch
		 */
		style : {
			//externalGraphic : "img/marker-gold.png",
			//graphicWidth : 15,
			//graphicHeight : 21,
			pointRadius : 7,
			strokeWidth : 2,
			strokeColor : "#00f",
			strokeOpacity : 1,
			fillColor : "#00f",
			fillOpacity : 0.5
		},
		/*
		 * Decimals for length and area in meters and kilometers
		 */
		decimals_m : 0,
		decimals_km : 3,
		/**
		 * Backgrounds for the resultdiv when active and unactive
		 */
		resultDivActiveCSS : {
			"background" : "#dddddd"	
		},
		resultDivUnactiveCSS : {
			"background" : "none"	
		},
		
		/**
		 * These projection will be supported.
		 */
		projections : {
			"EPSG:4326" : {
				name : "WGS84",
				decimals : 5,
				easting : "Longitud:",
				northing : "Latitud:"
			},
			"EPSG:3006" : {
				name : "Sweref99 TM",
				decimals : 1,
				easting : "Easting:",
				northing : "Northing:"
			},
			"EPSG:3008" : {
				name : "Sweref99 1330",
				decimals : 1,
				easting : "Easting:",
				northing : "Northing:"
			},
			"EPSG:3021" : {
				name : "RT90 2.5 V",
				decimals : 0,
				easting : "Easting:",
				northing : "Northing:"
			},
			"EPSG:900913" : {
				name : "Google",
				decimals : 0,
				easting : "Easting:",
				northing : "Northing:"
			}
		}
		
};