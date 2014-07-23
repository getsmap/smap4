sMap.moduleConfig.Export = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		/**
		 * The order in the toolbar compared the other tools
		 */
		toolbarIndex : 10,
		/**
		 * Adds the tool button to menu or as a stand alone button
		 */
		addToToolsMenu : false,
		/**
		 * Dialog size and position
		 */
		dialogStartPosition : [300, 100],
		width : 240,
		height : 400,
		/**
		 * Paths to the export scripts and settings for the export routines
		 */
		exportRoutines : {
			visibleLayers : {
				name: "Tända lager, dxf",
				url:"http://sbkqgis/cgi-bin/postgis2dxf.php?",
				addVisibleLayers : true,
				addBaseLayer : false
			},
			basemap : {
				name: "Baskartan, dxf",
				url:"http://sbkqgis/cgi-bin/baskartan2dxf.php?",
				addVisibleLayers : true,
				addBaseLayer : false
			},
			baselayer : {
				name: "Bakgrundskarta, tiff",
				url:"http://sbkqgis/cgi-bin/baselayer2tiff.php?",
				addVisibleLayers : false,
				addBaseLayer : true
			},
			heights : {
				name: "Höjddata, csv",
				url:"http://sbkqgis/cgi-bin/nh2csv.php?",
				addVisibleLayers : false,
				addBaseLayer : false
			},
		},
		/**
		 * Available coordinate reference system
		 */
		crsList : [
           {
        	   name :"SWEREF 99 1330",
        	   code : "EPSG:3008"
           },
           {
        	   name :"SWEREF 99 TM",
        	   code : "EPSG:3006"
           }
		],
		/**
		 * Maximum count of layers to allow export
		 */
		maxlayers : 20
};