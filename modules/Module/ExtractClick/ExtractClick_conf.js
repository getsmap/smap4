sMap.moduleConfig.ExtractClick = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		wfsService: "http://xyz.malmo.se/geoserver/wfs",
		wfsNames: ["malmows:SMA_SUM_FASTYTA_P", "malmows:SMA_PAGAENDE_PLANER_P", "malmows:SMA_PLANOMR_P"], //"malmows:SMA_TRAKT_P,malmows:SMA_FASTYTA_3D_P,malmows:SMA_SUM_FASTYTA_P",
		wfsVersion: "1.0.0",
		
		radius: 1,
		
		//redirectUrl: "http://sbkspace.malmo.se/website/startwebb/meny_atlas.htm",
		redirectUrl: "http://sbkspace.malmo.se/nbk/nbkinsert.aspx",
		displayName: "", // button label
		
		/**
		 * Config for the WMS-layer to extract data from.
		 */
		extractLayerConfig: null
		
};