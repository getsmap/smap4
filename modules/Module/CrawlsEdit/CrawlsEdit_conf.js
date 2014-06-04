sMap.moduleConfig.CrawlsEdit = {
		
		
		iconEraserPath: "img/eraser_cross.gif", //draw_eraser.png",
		
		/**
		 * Here are specified which buttons should be included in the
		 * editing toolbar.
		 */
		buttons : {
//			line : true,		
			point : true,
//			polygon : false,
			modify : true
//			del : false,
//			save : false
		},
		
		/**
		 * See: http://docs.openlayers.org/library/feature_styling.html 
		 */
		styleMap : new OpenLayers.StyleMap({
			"default" : new OpenLayers.Style({
				pointRadius : 6,
				fillColor : "#FF5B00",
				fillOpacity : 0.3,
				graphicName: "square",
				strokeWidth : 4,
				strokeColor : "#FF5B00",
				strokeOpacity : 1,
				cursor : "pointer"
			}),
			"temporary" : new OpenLayers.Style({
				pointRadius : 6,
				fillColor : "#FF5B00",
				fillOpacity : 0.3,
				graphicName: "square",
				strokeWidth : 4,
				strokeColor : "#FF5B00",
				strokeOpacity : 1,
				cursor : "pointer"
			}),
			"select" : new OpenLayers.Style({
				pointRadius : 6,
				fillColor : "#ffffff",
				fillOpacity : 0.3,
				graphicName: "square",
				strokeWidth : 4,
				strokeColor : "#00f",
				strokeOpacity : 1,
				cursor : "pointer"
			})
		}),
		
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false,
		
		olLayerName : "theEditLayer",
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		
		WFSVersion : "1.1.0",
		WFShost: "http://localhost", // "http://geoserver.smap.se", // "http://www.smap.se",  //"192.168.250.228", 
		WFSport: "80",
		WFSService: "http://localhost:80/geoserver/wfs/", //"http://geoserver.smap.se:80/geoserver/wfs/",  // 
		
		//WFSService : "http://localhost/geoserver/wfs/",
				
		/**
		 * The URL to the namespace
		 */
		featureNS : "http://sandbox.smap.se", // "http://www2.smap.se/~cleber/", //"http://www2.smap.se/~cleber/",  //"http://localhost/maptest.html",
		/**
		 * The workspace in Geoserver (or mapserver...)
		 */
		workspace : "sandboxws", //"crawls", 
		/**
		 * The layername found in Geoserver (contained in a workspace)
		 * The name of the table in PostGIS - has to be the same
		 * both in GeoServer and PostGIS.
		 */
		featureTypes : {
			point : ["schpoints", //"schpoints",
			         "schroutes"
			         ]
		},
		/**
		 * The column holding the geometry.
		 */
		geometryName : "the_geom"
		
};