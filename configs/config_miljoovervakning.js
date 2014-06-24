/**
 * Configuration for the planning map application "Pedagogiska kartor" for SBK, Malmö stad.
 */
 
//anvisningar för pk. 
//zIndex: 1-999  baselayers        00-99  -    
//zIndex: 1000-1999  polygoner    100-199 -    
//zIndex: 2000-2999  linjer       200-299 - 
//zIndex: 3000-3999  punkter      300-399 - 
//zIndex: 4000-4999  texter       400-499 - 
  
  
var planApp = {
	
	// Metadata for folders in the layer tree. Also used by
	// BlixtenPopup when displaying HTML content for a category
	// folder on select (when clicking on a folder).
	categories: {
		headers: {
			"Luftkvalitet": {
				hideCheckbox: true,
				startVisible : true,
				tooltip: "Befolkning",
				expand: false,
				cssClass: "mainheader",
				subheaders: {
					"Befolkningsprognos 2019": {
					hideCheckbox: true
					},
					
					"Befolkning 2013": {
					hideCheckbox: true
					}
				}
			},	
			"Buller": {
				hideCheckbox: true,
				startVisible : true,
				tooltip: "Befolkning",
				expand: false,
				cssClass: "mainheader",
				subheaders: {
					"Befolkningsprognos 2019": {
					hideCheckbox: true
					},
					
					"Befolkning 2013": {
					hideCheckbox: true
					}
				}
			},
			
			"Underlag": {
				hideCheckbox: true,
				tooltip: "Underlag",
				expand: false,
				cssClass: "mainheader",
				subheaders: {
					"Skola": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: "",
						subheaders: {}
					}
				}
			}
		},
		layers: {}
	}
};

var config = {
	mapName: {
		"sv-SE": "Malmö Stadsatlas",
		"en": ""
	},
	
	zoomMethod: null,
	minWidth: 800,
	version : "4.0.0",
	projection : "EPSG:3008",
	//projection : "EPSG:3006",
	//resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
	//resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
	//resolutions : [ 200, 100, 50, 25, 10, 5, 2, 1 ], // EPSG:3006
	resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], // EPSG:3008
	
	// EPSG:3006
	/*maxExtent : {
		w : 335000,
		s : 6130000,
		e : 480000,
		n : 6270000
	},
	defaultExtent : {
		w : 335000,
		s : 6130000,
		e : 480000,
		n : 6270000
	},*/
	
	// EPSG:3008
	maxExtent : {
		w : 104853,
		s : 6150876,
		e : 131653,
		n : 6171076
	},
	defaultExtent : {
		w : 104853,
		s : 6150876,
		e : 131653,
		n : 6171076
	},
	
//	proxyHost : "http://xyz.malmo.se/myproxy/proxy.py?url=",
	// Adapts depending on IP
	proxyHost: {
		"localhost": "../../cgi-bin/proxy/proxy.py?url=",
		"xyz.malmo.se": "http://xyz.malmo.se/myproxy/proxy.py?url=",
		"sbkvmgeoserver.malmo.se": "http://sbkvmgeoserver.malmo.se/cgi-bin/proxy/proxy.py?url=",
		"kartor.smap.se": "http://kartor.smap.se/cgi-bin/proxy/proxy.py?url="
	},
	
//	jqTheme: "orange",
	jqTheme: "gray-flat",
	
	rootURL: "http://www.malmo.se/karta/", //document.URL.split("?")[0],
	//defaultWebParams : "defaultParam=5",
	
	layers : {
		
		overlays : [
			{
				displayName : 'Mätvagnen',
				name: "mo_matvagn",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/metadata/metadata.aspx?id=mo_matvagn&img=http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:miljo_mo_matvagn&version=1.1.1&format=image/png",
				category : ["Luftkvalitet"],
				displayInLayerSwitcher: true,
				URL: 'http://xyz.malmo.se:8081/geoserver/malmows/wms?',	
				selectAttributes: ["${matplatser}"],
				params : {
					layers: "malmows:miljo_mo_matvagn_pt",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Mätvagnen</div>" +
					"<div class='popup-text1'>${matplatser}</div>" +
					"<div class='popup-text1'>${kategori}</div>" +
					"<div class='popup-text1'>${period}</div>" +
					"<div class='popup-text1'>${matningar}</div>" +
					"<div class='popup-text1'>${sammanfattning}</div>" +
					"<div class='popup-text1'><a href='${url1}' target='_blank'>Läs rapport</a></div>" + 
					"<div class='popup-text1'><a href='${url2}' target='_blank'>Läs mer 2</a></div>" +
					"<div class='popup-text1'><a href='${url3}' target='_blank'>Läs mer 3</a></div>" +
					"<div class='popup-text1'><a href='${url4}' target='_blank'>Läs mer 4</a></div>" +
					"<div class='popup-text1'><a href='${url5}' target='_blank'>Läs mer 5</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://xyz.malmo.se/urbex/index.htm?p=true&xy=${east};${north}' target='_blank'>Visa snedbild</a></div>" ,	
					selectable : true,
				geomType : 'point',
				getFeatureInfo: {geometryName: "geom"},
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:miljo_mo_matvagn_pt&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:miljo_mo_matvagn_pt&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#00FFFF",
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 7
							        }
						        }),
						        new OpenLayers.Rule({
						        	elseFilter: true,
						           	// if a feature matches the above filter, use this style
						        	symbolizer: {}
						        })
						]
					}	
				}
			},
			{
				displayName : 'Kvävedioxidhalter förskolor och skolor ute',
				name: "mo_skolor",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/metadata/metadata.aspx?id=mo_skolor",
				category : ["Luftkvalitet"],
				displayInLayerSwitcher: true,
				URL: 'http://xyz.malmo.se:8081/geoserver/malmows/wms?',	
				selectAttributes: ["${namn}"],
				params : {
					layers: "malmows:miljo_mo_skolor_pt",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Förskolor</div>" +
					"<div class='popup-text1'>${matplatser}</div>" +
					"<div class='popup-text1'>${period}</div>" +
					"<div class='popup-text1'>${matningar}</div>" +
					"<div class='popup-text1'>${sammanfattning}</div>" +
					"<div class='popup-text1'><a href='${url_1}' target='_blank'>Läs rapport</a></div>" + 
					"<div class='popup-text1'><a href='${url_2}' target='_blank'>Läs mer</a></div>" +
					"<div class='popup-text1'><a href='${url_3}' target='_blank'>Läs webbsidan</a></div>" +
					"<div class='popup-text1'><a href='${url_4}' target='_blank'>Läs mer</a></div>" +
					"<div class='popup-text1'><a href='${url_5}' target='_blank'>Läs mer</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://xyz.malmo.se/urbex/index.htm?p=true&xy=${east};${north}' target='_blank'>Visa snedbild</a></div>" ,	
					selectable : true,
				geomType : 'point',
				getFeatureInfo: {geometryName: "geom"},
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:miljo_mo_skolor_pt&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:miljo_mo_skolor_pt&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_stor_turkos.png'
							        }
						        }),
						        new OpenLayers.Rule({
						        	elseFilter: true,
						           	// if a feature matches the above filter, use this style
						        	symbolizer: {}
						        })
						]
					}	
				}
			},
			{
				displayName : 'Kvävedioxidkarta',
				name: "miljo_luftfororening",
				dialogContent: "http://xyz.malmo.se/metadata/metadata.aspx?id=miljo_luftfororening",
				category : ["Luftkvalitet"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_op2012_luft2006",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 52,
					isBaseLayer : false,
					opacity: "0.65",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				blixtable : false,
				geomType : 'polygon',
				startVisible : false,
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ],
				//startVisible : true,				
				//blixtable : false
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/luftfororening/html/bilder/legend_luftfororening_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/luftfororening/html/bilder/legend_luftfororening_liten.png"}
				}
			},	
			{
				displayName : 'Tågbuller',
				name: "miljo_tagbuller",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljo_tagbuller",
				category : ["Buller"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_karta_tagbuller_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),	
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 55,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				blixtable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "img/legend/malmo_op_vit.png"
					}
					
				},				
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ],
				//startVisible : true,				
				//blixtable : false
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/bilder/legend_buller_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/bilder/legend_buller_liten.png"}
				}
			},						
		
			{
				displayName : 'Vägbuller',
				name: "miljo_vagbuller",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljo_vagbuller",
				category : ["Buller"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_op2012_vagbuller2012",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 54,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				blixtable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "img/legend/malmo_op_vit.png"
					}
					
				},				
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ],
				//startVisible : true,				
				//blixtable : false
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/bilder/legend_buller_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/bilder/legend_buller_liten.png"}
				}
			},		
			
			{
				displayName : 'Kommunal förskola',
				name: "kommunal_forskola",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/skola/forskola.html",
				dialogContent: "http://xyz.malmo.se/metadata/metadata.aspx?id=forskola",
				category : ["Underlag", "Skola"],
				displayInLayerSwitcher: true,
				URL: 'http://xyz.malmo.se:8081/geoserver/malmows/wms?',	
				selectAttributes: ["${namn}"],
				params : {
					layers: "malmows:V_POI_EXTENS_FORSKOLOR_KOMMUNAL_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.70",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Förskola</div>" +
					"<div class='popup-text1'>${namn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>${plan} Läs mer</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${stadsomr}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://xyz.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/cyclomedia/index.htm?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",	
					selectable : true,
				geomType : 'point',
				getFeatureInfo: {geometryName: "geom"},
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/skola/kommunalforskolahoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/skola/kommunalforskola.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/kvadrat_stor_turkos.png'
							        }
						        }),
						        new OpenLayers.Rule({
						        	elseFilter: true,
						           	// if a feature matches the above filter, use this style
						        	symbolizer: {}
						        })
						]
					}	
				}
			},
			 {
				displayName : 'Icke kommunal förskola',
				name: "ickekom_forskola",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/skola/forskola.html",
				dialogContent: "http://xyz.malmo.se/metadata/metadata.aspx?id=forskola",
				category : ["Underlag", "Skola"],
				displayInLayerSwitcher: true,
				URL: 'http://xyz.malmo.se:8081/geoserver/malmows/wms?',	
				selectAttributes: ["${namn}"],
				params : {
					layers: "malmows:V_POI_EXTENS_FORSKOLOR_PRIVAT_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.70",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Förskola</div>" +
					"<div class='popup-text1'>${namn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>${plan} Läs mer</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${stadsomr}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://xyz.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/cyclomedia/index.htm?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",	
					selectable : true,
				geomType : 'point',
				getFeatureInfo: {geometryName: "geom"},
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/skola/privatforskolahoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/skola/privatforskola.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/kvadrat_stor_turkos.png'
							        }
						        }),
						        new OpenLayers.Rule({
						        	elseFilter: true,
						           	// if a feature matches the above filter, use this style
						        	symbolizer: {}
						        })
						]
					}	
				}
			}, 
			{
				displayName : 'Grundskola',
				name: "grundskola",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/skola/grundskola.html",
				dialogContent: "http://xyz.malmo.se/metadata/metadata.aspx?id=grundskola",
				category : ["Underlag", "Skola"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",	
				selectAttributes: ["${objektnamn}"],
				params : {
					layers: "malmows:POI_SKOLOR_GRUNDSKOLA",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.70",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Grundskola</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${URL}' target='_blank'>${plan} Läs mer</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://xyz.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/cyclomedia/index.htm?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",		
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/skola/grundskolahoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/skola/grundskola.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	symbolizer: {
										//graphicWidth: 22,
										//graphicHeigth: 22,
										externalGraphic: 'http://161.52.9.230/bilder/Generell_select/kvadrat_stor_turkos.png'
							        }
						        }),
						        new OpenLayers.Rule({
						        	elseFilter: true,
						           	// if a feature matches the above filter, use this style
						        	symbolizer: {}
						        })
						]
					}	
				}
			}	
		],
		
		baselayers : [
			
			{
				displayName : "Stadskarta",
				name : "stadskartan",  // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_karta_verksamhet",
				layerType : "tilecache",
				category : "Karta",
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Malmö Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},
			{
				displayName : "Stadskarta s/v",
				name : "karta_sv",  // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				//layer : "malmo_karta_sv",
				layer : "malmo_karta_sv",
				layerType : "tilecache",
				category : "Karta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839],
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 50,
					isBaseLayer : true,
					//opacity: "0.6",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},
			{
				displayName : "Fotokarta 2013",
				name : "orto",  /* ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto  */
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839],
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='http://www.lantmateriet.se' target='_blank'>© Lantmäteriet</a>"
				},
				copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
			},
			{
				displayName : "Fotokarta 2012",
				name : "orto12",  /* ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto  */
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_2012",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839],
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='http://www.lantmateriet.se' target='_blank'>© Lantmäteriet</a>"
				},
				copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
			},
			{
				displayName : "Fotokarta 2011",
				name : "orto11",  /* ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto  */
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_2011",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839],
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='http://www.lantmateriet.se' target='_blank'>© Lantmäteriet</a>"
				},
				copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
			},
			{
				displayName : "Fotokarta 2010",
				name : "orto_2010",  /* ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto  */
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_2010",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839],
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Geodatatcenter Skåne'>© Geodatatcenter Skåne</a>"
				},
				copyright : [ "Geodatatcenter Skåne", "" ]
			},
			{
				displayName : "Fotokarta 2007",
				name : "orto2007",
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_2007",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839],
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='http://www.lantmateriet.se' target='_blank'>© Lantmäteriet</a>"
				},
				copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
			},
			{
				displayName : "Fotokarta 1938-1947",
				name : "orto1940",
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_1940",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839],
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='http://www.lantmateriet.se' target='_blank'>© Lantmäteriet</a>"
				},
				copyright : [  "Lantmäteriet", "http://www.lantmateriet.se"  ]
			}
			
		]
	},
	
	modules : //[sMap.Module.Email, sMap.Module.ModuleTest]
	[
		
//		{
//			init : sMap.Module.LayerLoaderNotifier,
//			config : {}
//		},
		{
			init : sMap.Module.Toolbar,
			config : {
				side: "right"/*,
				title: "Pedagogiska kartor - Upptäck din närmiljö",
				titleCss: {
					"right": "100px"
				}*/
			}
		},
		
//		{
//			init : sMap.Module.MyLegend,
//			config : {}
//		},
//		{
//			init : sMap.Module.TestModule,
//			config : {}
//		},
		{
			init : sMap.Module.FeatureRequester,
			config : {
//				requestableLayers: ["vakant"]
			}
		},
		{
			init : sMap.Module.Select,
			config : {
				addSelectWithKey: false,
				dialogIfMany: true,
				multiple: true,
				forceOne: false,
				fitBoundsIfNotContained: true
			}
		},
		{
			init : sMap.Module.Popup,
			config : {}
		},
		{
			init : sMap.Module.BaselayerSwitcher,
			config : {
				dropDownOnSingle : false,
				buttonWidth : 75,
				dropDownWidth : 130
			}
		},
		{
			init : sMap.Module.ScaleBar,
			config : {}
		},
		 {
			init : sMap.Module.ScaleSelector,
			config : {
			}
		}, 
		{
			init : sMap.Module.Search,
			config : {
				toolbarIndex : 0,
				zoomLevel : 4,
				startText : "Ange adress eller plats",
				dropDownOption: false,
				autoCompleteScriptUrl : "http://xyz.malmo.se/WS/mKarta/autocomplete.ashx?",
				searchScriptUrl : "http://xyz.malmo.se/WS/mKarta/sokexakt.ashx",
				displayName : "Sökning",
				encSpace: "%2b",
				poiLayer: {
					popup: "<div class='popup-header1'>${name}</div>" +
						"<a class='popup-text1' href='${url}' target='_blank'>Läs mer</a><br>" +
						"<div class='popup-text2'>${sdf}</div>" + 						
						"<div class='popup-text2'>${delomr}</div>" + 
						"<div class='popup-text2'>${fast}</div>" +
						"<div class='popup-text2'>${iv_siffr}</div>" +
						"<div class='popup-text2'>${v_siffr}</div>"+
						"<br /><br />"
					}
			}
		},
		/*{
			init : sMap.Module.WFSEditing,
			config : {}
		},
		{
			init : sMap.Module.CrawlsEdit,
			config : {
				toolbarIndex : 4
			}
		},*/
		
		{
			init : sMap.Module.CopyLink,
			config : {
				toolbarIndex: 1,
				addToToolsMenu: "toolsmenu",
				shortenOption: null
			}
		},
		{
			init : sMap.Module.Draw,
			config : {
				addToToolsMenu: "toolsmenu"
			}
		},
		{
			init : sMap.Module.MeasureDialog,
			config : {
				addToToolsMenu: "toolsmenu"
			}
		},
		/* {
			init : sMap.Module.Email,
			config : {
				eMailURL: "http://kartor.smap.se/cgi-bin/email/smapSendEmail.py?",
				eMailTo: "toEmail=",
				eMailSubject: "subject=",
				eMailMsg: "msg=",
				addToToolsMenu: "toolsmenu"
			}
		}, */
		/*{
			init : sMap.Module.Login,
			config : {}
		},
		{
			init : sMap.Module.Opacity,
			config : {
				toolbarIndex: 4
			}
		},*/
		{
			init : sMap.Module.RedirectClick,			
			config : {
				displayName : 'Snedbild',
				//addToToolsMenu: "toolsmenu",
				toolbarIndex: 4,
				url: "http://xyz.malmo.se/urbex/index.htm?p=true&xy=${x};${y}",
				overrideName: "snedbild",
				btnLabel: "Snedbild",
//				btnHover: "Verktyg för att se snedbilder",
				buttonId: "redirect-snedbild",
				buttonCss: "ui-icon-arrowstop-1-s",
				mouseMoveText: "Klicka i kartan för att se snedbild"
			}
		},
		{
			init: sMap.Module.LinkTo,
			config: {
				displayName: "Hjälp",
				toolbarIndex: 1,
				content: "http://xyz.malmo.se/stadsatlas/hjalp/hjalp_statistik.htm",
				dialog: {
					title: "Hjälp",
					width: "720",
					height: "500",
					resizable: false
				}
			}
		},
		{
			init: sMap.Module.LinkTo,
			config: {
				displayName: "Fler kartor",
				toolbarIndex: 7,
				content: "http://www.malmo.se/kartor",
				dialog: false
			}
		},
		{
			init : sMap.Module.Pizza,
			config : {}
		},
		// {
			// init : sMap.Module.Print,
			// config : {
				// toolbarIndex : 1,
				// webContentRoot: "rest/1.0/map-dev/",
				// publicExportFolder: "http://xyz.malmo.se/data_e/smap_export/",
				// privateExportFolder: "E:/data_e/smap_export/",
				// printScriptsFolderPath: "http://xyz.malmo.se/WS/rest-1.0/print/" // "http://localhost/cgi-bin/proxy.py?url="+
			// }
		// },
		{
			init : sMap.Module.SPrint,
			config : {
				toolbarIndex: 1,
				addToToolsMenu: false
			}
		},
/*		{
			init : sMap.Module.Report,
			config : {
				toolbarIndex: 1,
				addToToolsMenu: false
			}
		},
		
		{
			init : sMap.Module.OverlaySwitcher.SimpleSwitcher,
			config : {}
		},
		{
			init: sMap.Module.Blixten,
			config: {
				toolbarIndex: 0,
				margin: 406
			}
		},
		{
			init: sMap.Module.BlixtenPopup2,
			config: {
				categories: planApp.categories
			}
		},*/
		{
			init : sMap.Module.ToolsMenu,
			config : {
				toolbarIndex : 2,
				menuBtns : [ 
		             {
		            	 menuId : "toolsmenu",
		            	 lblText : "Verktyg",
		            	 toolBarIndex : 2
		             }]
			}
		},
		{
			init : sMap.Module.LayerTree,
			config : {
				showFadedLinks: false,
				addPrintButton: false,
				
				addPrintLegendButton: false,
				lbButtonToToolsMenu: true,
				lbToolbarIndex: 1,
				
				showFadedCheckboxes: false,
				showCheckboxAfterTextIcon: false,
				enableTooltip: true,
				folderIcon: null, //"img/folder_page.gif",
				width: 320,
				right: true,
				categories: planApp.categories
			}
		},
		/*{
			init : sMap.Module.Legend,
			config : {}
		},*/
		{
			init: sMap.Module.IntroDialog,
			config: {
				dialogBGColor: "#fff",
				dialogOptions: {
					title: "Välkommen!",
					width: 400,
					height: 300,
					minWidth: 100
				},
				contentHtml: 
					"<p><b><i>Miljöövervakning är under uppbyggnad</i></b></p>" +
					"<p>Här kan ni skriva en inledningstext:</p>" +
					"<p>- Den är helt frivillig </p>" +
					"<p>- stjhy wrtyw wrt wtg</p>" +			
					"<p>- wertb  erwqtqti w</p>" +
					"<p>adiuhg awrt qwetg sdfg wert qwert w tg qwe wet</p>" +			
					"<p>ijhwjebrt werqt qt 536u7  6i4 6574</p>"					
			}
		} 
		
	]
};








// IE7: Change all image/png into image/png8 so it looks a bit
// nicer in our beloved stone-age browser.
if ($.browser.msie && parseInt($.browser.version) < 8) {
	var _ols = config.layers.overlays,
		t = null;
	for (var i=0,len=_ols.length; i<len; i++) {
		t = _ols[i];
		if (t.params && t.params.format && t.params.format === "image/png") {
			t.params.format = "image/png8";
		}
	}
}



