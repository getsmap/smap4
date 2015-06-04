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
		dialogStartPosition : [150, 100],
		width : 280,
		height : 420,

		selCatOptions: ["Standard"], //["Standard", "Trafik"],

		/**
		 * Witch edit buttons will be available
		 */
		useButtons : {
			"text" : true,
			"point" : true,
			"line" : true,
			"polygon" : true,
			"box" : true,
			"circle" : true,
			"move" : true, // sometimes activates by simple click and not only drag, must drag to release feature
			"modify" : true, //not checking for feature.editable
			"delete" : true,  //not checking for feature.editable
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
		editLinkFeatures : true,
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
		* Path to a blank image. Used as externalGrapåhic for textpoints
		*/
		blankSymbol : "http://sbkgeodata.kristianstad.se/img/tom.png",

		/**
		 * The available symbols in the symbol picker
		 * Syntax {url:""[, size: , width: , height: , offsety: , offsetx: ]}
		 * If no size is given the defaultSymbolsSize i used
		 */
		defaultSymbol : {url:"http://sbkgeodata.kristianstad.se/img/location.png", size : 16},
		symbols : {},//[
				// {url:"http://kartor.smap.se/mapsymbols/camping_mini.png", size : 20},
				// {url:"http://kartor.smap.se/mapsymbols/hotell_mini.png"},
				// {url:"http://kartor.smap.se/mapsymbols/stuga_mini.png", size : 20},
				// {url:"http://kartor.smap.se/mapsymbols/vandrarhem_mini.png", size : 20},
				// {url:"http://kartor.smap.se/mapsymbols/overnatt_mini.png"},
				// {url:"http://kartor.smap.se/mapsymbols/Ikoner/Transport/Buss.png", size : 37, width: 33, height : 37, offsety:-32},
				// {url:"http://kartor.smap.se/mapsymbols/Ikoner/Transport/Busshallplats.png", size : 37, width: 33, height : 37, offsety:-32},
				// {url:"http://kartor.smap.se/mapsymbols/Ikoner/Transport/Flyg.png", size : 37, width: 33, height : 37, offsety:-32},
				// {url:"http://kartor.smap.se/mapsymbols/Ikoner/Transport/Parkering.png", size : 37, width: 33, height : 37, offsety:-32},
				// {url:"http://kartor.smap.se/mapsymbols/Ikoner/Transport/Tag.png", size : 37, width: 33, height : 37, offsety:-32},
				// {url:"http://kartor.smap.se/mapsymbols/Ikoner/Kultur/Konsert.png", size : 37, width: 33, height : 37, offsety:-32},
				// {url:"http://kartor.smap.se/mapsymbols/Ikoner/Kultur/Museum.png", size : 38, width: 33, height : 38, offsety:-33},
				// {url:"http://kartor.smap.se/mapsymbols/Ikoner/Kultur/Teater.png", size : 38, width: 33, height : 38, offsety:-33},
				// {url:"http://kartor.smap.se/mapsymbols/Ikoner/Utbildning/Forskola.png", size : 38, width: 33, height : 38, offsety:-33},
				//{url:"http://kartor.smap.se/mapsymbols/Ikoner/Utbildning/Grundskola.png", size : 37, width: 33, height : 37, offsety:-32},
				//{url:"http://kartor.smap.se/mapsymbols/Ikoner/Utbildning/Gymnasium.png", size : 37, width: 33, height : 37, offsety:-32},
				//{url:"http://kartor.smap.se/mapsymbols/Ikoner/Utbildning/EftergymnUtb.png", size : 37, width: 33, height : 37, offsety:-32},
				// {url:"http://sbkgeodata.kristianstad.se/img/skyltar/B2-1.png", size : 20},
				// {url:"http://sbkgeodata.kristianstad.se/img/skyltar/B3-1.png", size : 20},
				// {url:"http://sbkgeodata.kristianstad.se/img/skyltar/C1-1.png", size : 20},
				// {url:"http://sbkgeodata.kristianstad.se/img/location.png", size : 16}
	          // ],
	    /**
	     * Adjust the height of the symbol picker to contain all symbols
	     */
	    symbolPickerHeight : 200,
		/**
		 * Default style values for the vector features
		 */
		defaultColor : "#808080",
		defaultSymbolSize : 20,
		defaultFontSize : 16,
		defaultFillOpacity : 0.3,
		defaultPointRadius : 6,
		defaultGraphicName : "circle",
		defaultStrokeWidth : 2,
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
					pointRadius : "${getSize}",
					fillColor : "${color}",
					fillOpacity : "${fo}",
					graphicName: "${gn}",//"circle",
					strokeWidth : "${sw}",//2,
					strokeColor : "${color}",
					strokeOpacity : "${so}",
					cursor : "pointer",
					externalGraphic : "${eg}",
					label: "${text}",
					title: "${info}",
					labelAlign: "${la}",//"cm",
					fontColor : "${color}",
					fontOpacity : 1,
					fontSize : "${fontsize}"//,
					//rotation : 30
				},
				"temporary" : {
					pointRadius : 6,
					fillColor : "#808080",
					fillOpacity : 0.3,
					graphicName: "circle",
					strokeWidth : 2,
					strokeColor : "#808080",
					strokeOpacity : 1,
					cursor : "pointer"
				},
				"select" : {
					pointRadius : 6,
					fillColor : "#00FFFF",
					fillOpacity : 0.3,
					strokeOpacity : 1,
					graphicName: "circle",
					externalGraphic : null,
					strokeWidth : 4,
					strokeColor : "#00FFFF",
					label : "",
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
		fetchFromDbPath : "http://kartor.smap.se/qgis/shorten/sMap_show.py",
		/**
		 * Use load and save buttons
		 */
		useLoadSave : false,
		/**
		 * Path for saving and loading features from DB new API
		 */
		savePath : "/wkartor/save/",
		/**
		 * Path for saving and loading features from DB new API
		 */
		importFilePath : "/sbkqgis/cgi-bin/fmeimp/index.php",
		/**
		 * Path for saving and loading features from DB new API
		 */
		importPath : "/sbkqgis/cgi-bin/fmeimp/getjson.php"
};