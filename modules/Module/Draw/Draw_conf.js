sMap.moduleConfig.Draw = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		/**
		 * The order in the toolbar compared the other tools
		 */
		toolbarIndex : 1,
		/**
		 * Adds the tool button to menu or as a stand alone button
		 */
		addToToolsMenu : false,
		/**
		 * The number of decimals that the coordinates should be rounded to.
		 * This will differ depending on the coordinate system. E.g. WGS84
		 * will require more decimals than a meter-based projection.
		 */
		decimals: 0,
		/**
		 * Dialog size and position
		 */
		dialogStartPosition : [300, 100],
		width : 240,
		height : 400,
		/**
		 * Witch edit buttons will be available
		 */
		useButtons : {
				"point" : true,
				"line" : true,
				"polygon" : true,
				"move" : false, // sometimes activates by simple click and not only drag, must drag to release feature
				"modify" : false, //not checking for feature.editable
				"delete" : false,  //not checking for feature.editable
				"style" : false  //not functioning for point symbols, select feature and color and use button to change color
			},
		/**
		 * Deactivate drawing tool after finishing sketch?
		 */
		autoDeactivateTool : true,
		/**
		 * Should features opened in link be selected?
		 */
		selectLinkFeatures : true,
		/**
		 * Should features opened in link be editable?
		 */
		editLinkFeatures : false,
		/**
		 * The available colors in the color picker
		 * as hexadecimal values. 
		 */
		colors: [
		         "#ffffff",
		         "#c0c0c0",
		         "#808080",
		         "#000000",
		         "#ff0000",
		         "#800000",
		         "#ffff00",
		         "#808000",
		         "#00ff00",
		         "#008000",
		         "#00ffff",
		         "#008080",
		         "#0000ff",
		         "#000080",
		         "#ff00ff",
		         "#800080",
		         "#ff5b00",
		         "#ff1493",
		         "#4b0082",
		         "#adff2f"
		],
		/**
		 * The available symbols in the symbol picker
		 * Syntax {url:""[, size: , width: , height: , offsety: , offsetx: ]}
		 * If no size is given the defaultSymbolsSize i used
		 */
       symbols : [
				{url:"http://www.smap.se/mapsymbols/camping_mini.png", size : 20},
				{url:"http://www.smap.se/mapsymbols/hotell_mini.png"},
				{url:"http://www.smap.se/mapsymbols/stuga_mini.png", size : 20},
				{url:"http://www.smap.se/mapsymbols/vandrarhem_mini.png", size : 20},
				{url:"http://www.smap.se/mapsymbols/overnatt_mini.png"},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Transport/Buss.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Transport/Busshallplats.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Transport/Flyg.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Transport/Parkering.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Transport/Tag.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Kultur/Konsert.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Kultur/Museum.png", size : 38, width: 33, height : 38, offsety:-33},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Kultur/Teater.png", size : 38, width: 33, height : 38, offsety:-33},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Utbildning/Forskola.png", size : 38, width: 33, height : 38, offsety:-33},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Utbildning/Grundskola.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Utbildning/Gymnasium.png", size : 37, width: 33, height : 37, offsety:-32},
				{url:"http://www.smap.se/mapsymbols/Ikoner/Utbildning/EftergymnUtb.png", size : 37, width: 33, height : 37, offsety:-32}
	           ],
	    /**
	     * Adjust the height of the symbol picker to contain all symbols
	     */
	    symbolPickerHeight : 200,
		/**
		 * Default style values for the vector features
		 */
		defaultSymbolSize : 20,
		defaultFillOpacity : 0.3,
		defaultPointRadius : 6,
		defaultGraphicName : "square",
		defaultStrokeWidth : 4,
		defaultStrokeOpacity : 1,
		/**
		 * Configuration for the draw layer
		 */
		drawLayerConfig : {
			name : "theDrawLayer",
			displayName:"Ritalager",
			layerType: "vector",
			geomType : 'point',
			selectable : true,
			displayInLayerSwitcher : false,
			legend: {
				url: "img/icon_edit.png" // the icon seen in the select preview dialog
			},
			popup : "<span id='draw-text' class='popup-text1'>${info}</span>",
			/**
			 * The styleMap for the editable layer.
			 * 
			 * See: http://docs.openlayers.org/library/feature_styling.html 
			 */
			style : {
				"default" : {
					pointRadius : 6,
					fillColor : "#ff5b00",
					fillOpacity : 0.3,
					graphicName: "square",
					strokeWidth : 4,
					strokeColor : "#ff5b00",
					strokeOpacity : 1,
					cursor : "pointer",
					externalGraphic : "img/geometries/polygon.png"
				},
				"temporary" : {
					pointRadius : 6,
					fillColor : "#ff5b00",
					fillOpacity : 0.3,
					graphicName: "square",
					strokeWidth : 4,
					strokeColor : "#ff5b00",
					strokeOpacity : 1,
					cursor : "pointer"
				},
				"select" : {
					pointRadius : 6,
					fillColor : "#00FFFF",
					fillOpacity : 0.3, // Make it invisible (meaning only original icon is visible)
					strokeOpacity : 1,
					graphicName: "circle",
					strokeWidth : 4,
					strokeColor : "#00FFFF",
					cursor : "pointer"
				}
			}
		},
		/**
		 * Makes the drawlayer to be drawn over the overlays
		 */
		zIndex: 697,
		/**
		 * Path for fetching features from DB
		 */
		fetchFromDbPath : "http://www.smap.se/cgi-bin/shorten/sMap_show.py"
};