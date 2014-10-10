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
			exportRoutines : {
//				visibleLayers : {
//					name: "Tända lager, dxf",
//					url:"http://[servername]/wkartor/export/?",
//					addVisibleLayers : true,
//					addBaseLayer : false
//				},
//				baseMap : {
//					name: "Baskarta, dxf",
//					url:"http://[servername]/wkartor/export/?",
//					layerlist : "adress_,gatunamn_,symbol_,trad_,agaoslagsgrans_,inhagnad_,stodmur_,stig_,hojdkurvor_gen,byggnad_,byggnadssymbol_,byggnadsdetalj_,skarmtak_,vagkant_,jarnvag_,slant_,konstruktion_,idrottsplats_",
//					addVisibleLayers : false,
//					addBaseLayer : false
//				},
//				visibleLayersTiff : {
//					name: "Tända lager, tiff",
//					url:"http://[servername]/wkartor/export/?",
//					addVisibleLayers : true,
//					addBaseLayer : true,
//					emptyBaseLayer : true
//				},
//				visibleLayersBaselayerTiff : {
//					name: "Tända lager + bakgrund, tiff",
//					url:"http://[servername]/wkartor/export/?",
//					addVisibleLayers : true,
//					addBaseLayer : true
//				},
//				baseMaptiff : {
//					name: "Baskarta, tiff",
//					url:"http://[servername]/wkartor/export/?",
//					layerlist : "adress_,gatunamn_,symbol_,trad_,agaoslagsgrans_,inhagnad_,stodmur_,stig_,hojdkurvor_gen,byggnad_,byggnadssymbol_,byggnadsdetalj_,skarmtak_,vagkant_,jarnvag_,slant_,konstruktion_,idrottsplats_",
//					addVisibleLayers : false,
//					addBaseLayer : true,
//					emptyBaseLayer : true
//				},
//				baselayerTiff : {
//					name: "Endast bakgrund, tiff",
//					url:"http://[servername]/wkartor/export/?",
//					addVisibleLayers : false,
//					addBaseLayer : true
//				}
			}
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