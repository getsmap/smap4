sMap.moduleConfig.EPOI = {
		
		/**
		 * The database to connect to
		 */
		db: "http://",
		
		workspace: "sandbox",

		iconEraserPath: "img/eraser_cross.gif", //draw_eraser.png",
//		imgSrc: "/sMap/modules/Module/EPOI/img/editToolsIcons/",
		imgArr: ["point_off.png", "point_on.png", "line_off.png", "line_on.png", "polygon_off.png", "polygon_on.png"],
		imgSrc: "http://geoserver.smap.se/~cleber/epoi/modules/Module/EPOI/img/editToolsIcons/",
		/**
		 * Here are specified which buttons should be included in the
		 * editing toolbar.
		 */
		buttons : {
			line : true,	
			point : true,
			polygon : true
//			modify : true
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
		WFShost: "http://localhost", //"http://geoserver.smap.se",  // "http://www.smap.se",  //"192.168.250.228", 
		WFSport: "80",
		WFSService:  "http://localhost:80/geoserver/wfs/", //"http://geoserver.smap.se:80/geoserver/wfs/", // 
		
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
		 * The column holding the geometry.
		 */
		geometryName : "the_geom",
		
		/**
		 * This is the URL for the CALENDAR IMG
		 * 
		 */
		btnImageURL : "/sMap/lib/jquery-1.4.2/development-bundle/ui/images/calendar.gif",
//		btnImageURL : "/epoi/modules/Module/EPOI/img/calendar.gif",
		
		/**
		 * This array contains the configuration for all tables that
		 * the user can choose from for editing. In each table there
		 * is a property "attributes" (or something...) that contains
		 * configuration for all columns in the table. This is there
		 * so that the module can create a GUI adapted for the
		 * column type and possibly restrict the accepted inputs. For
		 * example a data column will produce a date-picker GUI and
		 * a range column will create a slider etc...
		 * 
		 */		

		/**
		 * The layername found in Geoserver (contained in a workspace)
		 * The name of the table in PostGIS - has to be the same
		 * both in GeoServer and PostGIS.
		 */
		featureTypes : "",
		
 		optionOpen: "<option>",
 		optionClose: "</option>"
 		
 
 			
};