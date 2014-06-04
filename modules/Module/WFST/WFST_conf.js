sMap.moduleConfig.WFST = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		WFSVersion : "1.1.0",
		
		WFShost: "http://geoserver.smap.se",  //"http://localhost", 
		
		WFSport: "80",

//		WFSService:  "http://geoserver.smap.se/geoserver/wfs/", //"http://localhost/geoserver/wfs/",  //"http://geoserver.smap.se:8080/geoserver/wfs/",
		/**
		 * The URL to the namespace
		 */
//		featureNS : "http://www.malmo.se", //"http://sandbox.smap.se",
		/**
		 * The workspace in Geoserver (or mapserver...)
		 */
//		workspace : "malmows",//"sandboxws",  
		/**
		 * The column holding the geometry.
		 */
		geometryName : "the_geom"
			
};