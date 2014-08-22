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
			
			"Bibliotek": {
				hideCheckbox: true,
				tooltip: " Bibliotek",
				expand: false,
				cssClass: "mainheader",
				subheaders: {}
			},
			"Bo & bygga": {
				hideCheckbox: true,
				tooltip: " Offentliga toaletter <br> &nbsp; > Fastigheter <br> &nbsp; > Kvarter",
				expand: false,
				cssClass: "mainheader",
				subheaders: {}
			},
			"Förskola & utbildning": {
				hideCheckbox: true,
				tooltip: " Förskola & utbildning <br> &nbsp; > Planerade förskolor <br> &nbsp; > Kommunala förskolor <br> &nbsp; > Icke kommunala förskolor <br> &nbsp; > Grundskola <br> &nbsp; > Gymnasieskola <br> &nbsp; > Högskola & universitet <br> &nbsp; > Övriga skolor ",
				expand: false,
				cssClass: "mainheader",
				subheaders: {}
			},
			"Idrott & fritid": {
				hideCheckbox: true,
				tooltip: " Idrott & fritid <br> &nbsp; > Bad <br> &nbsp; > Golfbanor <br> &nbsp; > Fritidsgårdar & mötesplatser <br> &nbsp; > Idrottsplatser <br> &nbsp; > Ishallar  <br> &nbsp; > Ridsport  <br> &nbsp; > Sporthallar  <br> &nbsp; > Utegym  <br> &nbsp; > Spontanidrottsplats  <br> &nbsp; > Temalekplatser  <br> &nbsp; > Lekplatser  ",
				expand: false,
				cssClass: "mainheader",
				subheaders: {}
			},
			"Kommun & politik": {
				hideCheckbox: true,
				tooltip: " Kommun & politik <br> <i> Förvaltningar & myndigheter </i> <br> &nbsp; > Förvaltningar & myndigheter <br> &nbsp; > Medborgarkontor <br> <i> Stadsområden & delområden </i> <br> &nbsp; > Delområden <br> &nbsp; > Stadsområden ",
				expand: false,
				cssClass: "mainheader",
				subheaders: {
					"Förvaltningar & myndigheter": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Förvaltningar & myndigheter </i> <br> &nbsp; > Förvaltningar & myndigheter <br> &nbsp; > Medborgarkontor  "
					},
					"Stadsområden & delområden": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Stadsområden & delområden </i> <br> &nbsp; > Delområden <br> &nbsp; > Stadsområden "
					}
				}
			},	
			"Kultur & nöje": {
				hideCheckbox: true,
				tooltip: " Kultur & nöje <br> &nbsp; > Museum & konst <br> &nbsp; > Teater & musik ",
				expand: false,
				cssClass: "mainheader",
				subheaders: {}
			},
			"Miljö & hållbarhet": {
				hideCheckbox: true,
				tooltip: " Miljö & hållbarhet <br> &nbsp; > Återvinningscentral <br> &nbsp; > Återvinningsstation ",
				expand: false,
				cssClass: "mainheader",
				subheaders: {}
			},
			"Omsorg, vård & stöd": {
				hideCheckbox: true,
				tooltip: "Omsorg, vård & stöd <br> &nbsp; > Sjukhus <br> &nbsp; > Ungdomsmottagning <br> &nbsp; > Vårdcentral ",
				expand: false,
				cssClass: "mainheader",
				subheaders: {}
			},
			"Stadsplanering & trafik": {
				hideCheckbox: true,
				tooltip: " Stadsplanering & trafik <br> <i> Skötsel & underhåll </i> <br> &nbsp; > Handikapptoalett <br> &nbsp; > Offentliga toaletter <br> &nbsp; > Offentliga toaletter (avgift) <br> &nbsp; > Skötbord <br> &nbsp; > PinkIn <br> <i> Stadsplanering & visioner </i> <br> &nbsp; > Antagna planer <br> &nbsp; > Pågående planer <br> &nbsp; > Översiktsplan 2005 <br> &nbsp; > Arkitektur från 1500-talet <br> &nbsp; > Arkitektur från 1800-talet <br> &nbsp; > Arkitektur från 1900-talet <br> &nbsp; > Arkitektur från 2000-talet <br> <i> Trafik & hållbart resande </i> <br> &nbsp; > Buss & Tåg <br> &nbsp; > Busstationer <br> &nbsp; > Tågstationer <br> &nbsp; > Cykelpumpar <br> &nbsp; > Cykelvägar ",
				expand: false,
				cssClass: "mainheader",
				subheaders: {
					"Skötsel & underhåll": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Skötsel & underhåll </i> <br> &nbsp; > Handikapptoalett <br> &nbsp; > Offentliga toaletter <br> &nbsp; > Offentliga toaletter (avgift) <br> &nbsp; > Skötbord <br> &nbsp; > PinkIn",
						subheaders: {
							"Offentliga toaletter": {
								hideCheckbox: true
							}
						}
					},
					"Stadsplanering & visioner": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Stadsplanering & visioner </i> <br> &nbsp; > Antagna planer <br> &nbsp; > Pågående planer <br> &nbsp; > Översiktsplan 2005 <br> &nbsp; > Arkitektur från 1500-talet <br> &nbsp; > Arkitektur från 1800-talet <br> &nbsp; > Arkitektur från 1900-talet <br> &nbsp; > Arkitektur från 2000-talet ",
						subheaders: {
							"Planer": {
								hideCheckbox: true
							},
							"Arkitektur": {
								hideCheckbox: true
							}
						}
					},
					"Trafik & hållbart resande": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Trafik & hållbart resande </i> <br> &nbsp; > Hållplatser <br> &nbsp; > Busstationer <br> &nbsp; > Tågstationer <br> &nbsp; > Cykelpumpar <br> &nbsp; > Cykelvägar",
						subheaders: {
							"Buss & Tåg": {
								hideCheckbox: true
							},
							"Cykel": {
								hideCheckbox: true
							}
						}
					}
				}
			},
			"Bränder, olyckor & skador *": {
				hideCheckbox: true,
				tooltip: "Bränder, olyckor & skador är inte synliga från datorer utanför Malmös intranät",
				expand: false,
				cssClass: "mainheader",
				subheaders: {
					"Bränder 2012": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Skötsel & underhåll </i> <br> &nbsp; > Handikapptoalett <br> &nbsp; > Offentliga toaletter <br> &nbsp; > Offentliga toaletter (avgift) <br> &nbsp; > Skötbord <br> &nbsp; > PinkIn",
						subheaders: {}
					},
					"Olyckor 2012": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Skötsel & underhåll </i> <br> &nbsp; > Handikapptoalett <br> &nbsp; > Offentliga toaletter <br> &nbsp; > Offentliga toaletter (avgift) <br> &nbsp; > Skötbord <br> &nbsp; > PinkIn",
						subheaders: {}
					},
					"Skador 2012": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Skötsel & underhåll </i> <br> &nbsp; > Handikapptoalett <br> &nbsp; > Offentliga toaletter <br> &nbsp; > Offentliga toaletter (avgift) <br> &nbsp; > Skötbord <br> &nbsp; > PinkIn",
						subheaders: {
							"Totalt": {
								hideCheckbox: true
							},
							"Trafik": {
								hideCheckbox: true
							},
							"Bostad": {
								hideCheckbox: true
							},
							"Arbete": {
								hideCheckbox: true
							},
							"Idrott": {
								hideCheckbox: true
							}
						}
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
	resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483], // EPSG:3008
	//resolutions : [ 200, 100, 50, 25, 10, 5, 2, 1 ], // EPSG:3006
	
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
		w : 100000,
		s : 6148850,
		e : 139000,
		n : 6173450
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
	
	rootURL: "http://www.malmo.se/karta/", 
	//rootURL : document.URL.split("?")[0],
	//defaultWebParams : "defaultParam=5",
	
	layers : {
		
		overlays : [
			{
				displayName: 'Bibliotek',
				name: "bibliotek",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Bibliotek"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_KULTUR_BIBLIOTEK_PT",
					format: "image/png",
					//buffer: 20,
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>${objekttyp}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>"+
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_KULTUR_BIBLIOTEK_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_KULTUR_BIBLIOTEK_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Fastigheter',
				name: "fastigheter",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Bo & bygga"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${id}"],
				params : {
					layers: "malmows:SMA_TRAKT_P,malmows:SMA_FASTYTA_3D_P,malmows:SMA_SUM_FASTYTA_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Fastighet</div>" +
					"<div class='popup-text1'>${fastighet}</div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/bb_fastighet.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/bb_fastighet.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	//externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Kvarter',
				name: "kvarter",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Bo & bygga"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${id}"],
				params : {
					layers: "malmows:SMA_SUM_KVARTER_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Kvarter</div>" +
					"<div class='popup-text1'>${name}</div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/bb_kvarter.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/bb_kvarter.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	//externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Planerade förskolor',
				name: "planfsk",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Förskola & utbildning"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${id}"],
				params : {
					layers: "malmows:POI_PLANERADE_FORSKOLOR_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 350,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Planerad förskola</div>" +
					"<div class='popup-text1'>${namn}</div>"+
					"<div class='popup-text1'>${adr}</div>"+
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_PLANERADE_FORSKOLOR_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_PLANERADE_FORSKOLOR_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Kommunala förskolor',
				name: "kommunal_forskola",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Förskola & utbildning"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${id}"],
				params : {
					layers: "malmows:V_POI_EXTENS_FORSKOLOR_KOMMUNAL_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 350,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Kommunal förskola</div>" +
					"<div class='popup-text1'>${namn}</div>"+
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_POI_EXTENS_FORSKOLOR_KOMMUNAL_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_POI_EXTENS_FORSKOLOR_KOMMUNAL_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Icke kommunala förskolor',
				name: "ickekom_forskola",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Förskola & utbildning"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${id}"],
				params : {
					layers: "malmows:V_POI_EXTENS_FORSKOLOR_PRIVAT_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 350,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Icke kommunal förskola</div>" +
					"<div class='popup-text1'>${namn}</div>"+
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_POI_EXTENS_FORSKOLOR_PRIVAT_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_POI_EXTENS_FORSKOLOR_PRIVAT_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Grundskola',
				name: "grundskola",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Förskola & utbildning"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${id}"],
				params : {
					layers: "malmows:POI_SKOLOR_GRUNDSKOLA_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>"+
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_SKOLOR_GRUNDSKOLA_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_SKOLOR_GRUNDSKOLA_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Gymnasieskola',
				name: "gymnasieskola",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Förskola & utbildning"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${id}"],
				params : {
					layers: "malmows:POI_SKOLOR_GYMNASIESKOLA_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>"+
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_SKOLOR_GYMNASIESKOLA_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_SKOLOR_GYMNASIESKOLA_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Högskola & universitet',
				name: "hogskola_universitet",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Förskola & utbildning"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${id}"],
				params : {
					layers: "malmows:POI_SKOLOR_HOGSKOLOR_UNIVERISITET_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>"+
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_SKOLOR_HOGSKOLOR_UNIVERISITET_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_SKOLOR_HOGSKOLOR_UNIVERISITET_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Övriga skolor',
				name: "ovrigskola",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Förskola & utbildning"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${id}"],
				params : {
					layers: "malmows:POI_SKOLOR_OVR_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>"+
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_SKOLOR_OVR_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_SKOLOR_OVR_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Bad',
				name: "bad",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: 'http://xyz.malmo.se/geoserver/malmows/wms?',	
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_BAD_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp2}</div>" +
					"<div class='popup-header2'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_BAD_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_BAD_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Golf',
				name: "golf",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_GOLFBANA_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp2}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_GOLFBANA_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_GOLFBANA_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Fritidsgårdar & mötesplatser',
				name: "fritidsgardar",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_FRITIDSGARD_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Fritidsgårdar & mötesplatser</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_FRITIDSGARD_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_FRITIDSGARD_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Idrottsplatser',
				name: "idrottsplatser",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_IDROTTSPLATS_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp2}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_IDROTTSPLATS_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_IDROTTSPLATS_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Ishallar',
				name: "ishallar",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_ISHALL_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp2}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_ISHALL_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_ISHALL_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Ridsport',
				name: "ridsport",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_RIDSPORT_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_RIDSPORT_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_RIDSPORT_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Sporthallar',
				name: "sporthallar",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_SPORTHALL_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_SPORTHALL_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_SPORTHALL_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Utegym',
				name: "utegym",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_UTEGYM_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_UTEGYM_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_UTEGYM_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Spontanidrottsplats',
				name: "spontanip",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_SPONTANIDROTTSPLATS_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>Läs mer</a></div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_SPONTANIDROTTSPLATS_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_SPONTANIDROTTSPLATS_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Temalekplatser',
				name: "temalekplatser",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_TEMALEKPLATS_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text2'>${objektnamn}</div>"+	
					"<br /><a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>" +			
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>"+
					"<div class='popup-text1'>Klicka på bilden för att förstora.</div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_TEMALEKPLATS_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_TEMALEKPLATS_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Lekplatser',
				name: "lekplatser",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Idrott & fritid"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_FRITID_LEKPLATS_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text2'>${objektnamn}</div>"+	
					"<br /><a href='http://xyz.malmo.se/mkarta/hallbartLarande/lekredskap.aspx?lp=${objektnamn}' class='popup-text1' target='_blank'>Bilder</a>"+
					"<br /><a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>" +			
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>"+
					"<div class='popup-text1'>Klicka på bilden för att förstora.</div>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_LEKPLATS_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_FRITID_LEKPLATS_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Förvaltningar & myndigheter',
				name: "forvaltning",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Kommun & politik", "Förvaltningar & myndigheter"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_KOMMUN_POLITIK_FORVALTNING_MYNDIGHET_PT",
					format: "image/png",
					transparent: "true",
					buffer: 20
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp1}</div>" +
					"<div class='popup-header2'>${objekttyp3}</div>" +
					"<div class='popup-text2'>${objektnamn}</div>"+	
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",		
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_KOMMUN_POLITIK_FORVALTNING_MYNDIGHET_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_KOMMUN_POLITIK_FORVALTNING_MYNDIGHET_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Medborgarkontor & medborgarservice',
				name: "medborgarkontor",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Kommun & politik", "Förvaltningar & myndigheter"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_KOMMUN_POLITIK_MEDBORGARKONTOR_PT",
					format: "image/png",
					transparent: "true",
					buffer: 20
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp1}</div>" +
					"<div class='popup-text2'>${objektnamn}</div>"+	
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",		
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_KOMMUN_POLITIK_MEDBORGARKONTOR_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_KOMMUN_POLITIK_MEDBORGARKONTOR_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Delområden',
				name: "delomraden",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Kommun & politik", "Stadsområden & delområden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:SMA_DELOMRADE_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Delområde</div>" +
					"<div class='popup-text2'>${delomr}</div>",					
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/bb_delomrade.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/bb_delomrade.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	//externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Stadsområden',
				name: "stadsomraden",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Kommun & politik", "Stadsområden & delområden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:SMA_STADSOMRADEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Stadsområdesförvaltning</div>" +
					"<div class='popup-text1'>${sdf_namn}</div>" +					
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",					
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/bb_stadsomr.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/bb_stadsomr.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	//externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Stadsdel (gäller tom juni 2013)',
				name: "stadsdel_tom",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Kommun & politik", "Stadsområden & delområden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:SMA_STADSDEL_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Stadsdel</div>" +
					"<div class='popup-text1'>${sdfname}</div>",
					selectable : true, getFeatureInfo: {geometryName: "geom"},
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/bb_stadsomr.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/bb_stadsomr.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	//externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Museum & konst',
				name: "museum",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Kultur & nöje"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_KULTUR_MUSEUM_OCH_KONST_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +					
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_KULTUR_MUSEUM_OCH_KONST_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_KULTUR_MUSEUM_OCH_KONST_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Teater & musik',
				name: "teater_och_musik",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Kultur & nöje"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_KULTUR_TEATER_OCH_MUSIK_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +					
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_KULTUR_TEATER_OCH_MUSIK_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_KULTUR_TEATER_OCH_MUSIK_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Återvinningscentral',
				name: "atervinningscentral",
				category : ["Miljö & hållbarhet"],
				URL: encodeURI('http://xyz.malmo.se/WS/mKarta/overlay.ashx?cat=Återvinningscentral'),
				layerType: "vector",
				format: "geojson",
				startVisible : false,
				copyright: "",
				displayInLayerSwitcher: true,
				popup :
					"<div class='popup-header1'>Återvinningscentral</div>" +
					"<div class='popup-header2'>${namn}</div>" +
					"<div class='popup-text1'>${info}</div>" +
					"<div class='popup-text1'>${address}</div>" +
					"<div class='popup-text1'>${contact}</div>" +
					"<div class='popup-text1'>${tel}</div>" +
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",
				blixtable : false, 
				selectable : true,
				style: {
					"default": {
						externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/atervinningscentral.png",
						graphicWidth : 20,
						graphicHeight : 20,
						graphicXOffset : -10,
						graphicYOffset : -10
					}
				}
			},
			{
				displayName: 'Återvinningsstation',
				name: "atervinningsstation",
				category : ["Miljö & hållbarhet"],
				URL: encodeURI('http://xyz.malmo.se/WS/mKarta/overlay.ashx?cat=Återvinningsstation'),
				layerType: "vector",
				format: "geojson",
				startVisible : false,
				copyright: "",
				displayInLayerSwitcher: true,
				popup :
					"<div class='popup-header1'>Återvinningscentral</div>" +
					"<div class='popup-header2'>${namn}</div>" +
					"<div class='popup-text1'>${info}</div>" +
					"<div class='popup-text1'>${address}</div>" +
					"<div class='popup-text1'>${contact}</div>" +
					"<div class='popup-text1'>${tel}</div>" +
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",
				blixtable : false, 
				selectable : true,
				style: {
					"default": {
						externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/atervinningsstation.png",
						graphicWidth : 20,
						graphicHeight : 20,
						graphicXOffset : -10,
						graphicYOffset : -10
					}
				}
			},
			
			{
				displayName: 'Sjukhus',
				name: "sjukhus",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Omsorg, vård & stöd"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_VARD_SJUKHUS_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +					
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_VARD_SJUKHUS_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_VARD_SJUKHUS_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Ungdomsmottagning',
				name: "ungdomsmottagning",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Omsorg, vård & stöd"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_VARD_UNGDOMSMOTTAGNING_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +					
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_VARD_UNGDOMSMOTTAGNING_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_VARD_UNGDOMSMOTTAGNING_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Vårdcentral',
				name: "vardenheter",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Omsorg, vård & stöd"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_VARD_VARDCENTRAL_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${objekttyp3}</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +					
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_VARD_VARDCENTRAL_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:POI_VARD_VARDCENTRAL_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Antagna planer',
				name: "antagna_planer",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Stadsplanering & visioner", "Planer"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					//layers: "malmows:SMA_PLANOMR_P",
					layers: "malmows:SMA_DP_ADP_YTOR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Detaljplan</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>${plan}, Läs mer</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://xyz.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</div>",
					selectable : true, getFeatureInfo: {geometryName: "geom"},
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/bb_antagnaPlaner.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/bb_antagnaPlaner.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	//externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Pågående planer',
				name: "pagaende_planer",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Stadsplanering & visioner", "Planer"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:SMA_PAGAENDE_PLANER_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Pågående planer</div>" +
					"<div class='popup-text1'>${plan}</div>" +
					"<div class='popup-text1'>${plan2}</div>" +
					"<div class='popup-text1'>${plan3}</div>" +
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",				
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/bb_pagaendePlaner.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/bb_pagaendePlaner.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	//externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Pågående planprogram',
				name: "sma_pagaende_planprogam",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Stadsplanering & visioner", "Planer"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:SMA_PAGAENDE_PLANPROGRAM_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Pågående planprogram</div>" +
					"<div class='popup-text1'>${plan}</div>" +
					"<div class='popup-text1'>${plan2}</div>" +
					"<div class='popup-text1'>${plan3}</div>" +
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>",				
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/bb_pagaendePlanprogram.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/bb_pagaendePlanprogram.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	//externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
			
			
			/*
			{
				displayName : 'Översiktsplan 2005',
				name: "oversiktsplan_2005",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=oversiktsplan_2005",
				category : ["Stadsplanering & trafik", "Stadsplanering & visioner", "Planer"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/Tilecache/malmo/",
				layer : "op2005",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483],
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 99,
					isBaseLayer : false,
					opacity: "1.0",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/oversiktsplanhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/oversiktsplan.png"}
				}
			},			
*/
			{
				displayName: "Arkitektur från 1500-talet",
				name: "arkitektur1500",
				category : ["Stadsplanering & trafik", "Stadsplanering & visioner", "Arkitektur"],
				URL : "http://xyz.malmo.se/WS/arkitektur/arkitektur.ashx?cat=1500",
				layerType: "vector",
				format: "geojson",
				startVisible : false,
				copyright: "",
				displayInLayerSwitcher: true,
				popup :
					"<div class='popup-header1'>Arkitektur från 1500-talet</div>" +
					"<div class='popup-header2'>${namn}</div>" +
					"<div class='popup-text1'>Byggår: ${byggar}</div>" +
					"<div class='popup-text1'>Arkitekt: ${arkitekt}</div>" +
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>"+
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>" ,
				blixtable : false, 
				selectable : true,
				style: {
					"default": {
					externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/ark1500.png",
					graphicWidth : 22,
					graphicHeight : 19,
					graphicXOffset : -10,
					graphicYOffset : -10
					}
				}
			},
			{
				displayName: "Arkitektur från 1800-talet",
				name: "arkitektur1800",
				category : ["Stadsplanering & trafik", "Stadsplanering & visioner", "Arkitektur"],
				URL : "http://xyz.malmo.se/WS/arkitektur/arkitektur.ashx?cat=1800",
				layerType: "vector",
				format: "geojson",
				startVisible : false,
				copyright: "",
				displayInLayerSwitcher: true,
				popup :
					"<div class='popup-header1'>Arkitektur från 1800-talet</div>" +
					"<div class='popup-header2'>${namn}</div>" +
					"<div class='popup-text1'>Byggår: ${byggar}</div>" +
					"<div class='popup-text1'>Arkitekt: ${arkitekt}</div>" +
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>"+
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>" ,
				blixtable : false, 
				selectable : true,
				style: {
					"default": {
					externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/ark1800.png",
					graphicWidth : 22,
					graphicHeight : 19,
					graphicXOffset : -10,
					graphicYOffset : -10
					}
				}
			},
			{
				displayName: "Arkitektur från 1900-talet",
				name: "arkitektur1900",
				category : ["Stadsplanering & trafik", "Stadsplanering & visioner","Arkitektur"],
				URL : "http://xyz.malmo.se/WS/arkitektur/arkitektur.ashx?cat=1900",
				layerType: "vector",
				format: "geojson",
				startVisible : false,
				copyright: "",
				displayInLayerSwitcher: true,
				popup :
					"<div class='popup-header1'>Arkitektur från 1900-talet</div>" +
					"<div class='popup-header2'>${namn}</div>" +
					"<div class='popup-text1'>Byggår: ${byggar}</div>" +
					"<div class='popup-text1'>Arkitekt: ${arkitekt}</div>" +
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>"+
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>" ,
				blixtable : false, 
				selectable : true,
				style: {
					"default": {
					externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/ark1900.png",
					graphicWidth : 22,
					graphicHeight : 19,
					graphicXOffset : -10,
					graphicYOffset : -10
					}
				}
			},
			{
				displayName: "Arkitektur från 2000-talet",
				name: "arkitektur2000",
				category : ["Stadsplanering & trafik", "Stadsplanering & visioner", "Arkitektur"],
				URL : "http://xyz.malmo.se/WS/arkitektur/arkitektur.ashx?cat=2000",
				layerType: "vector",
				format: "geojson",
				startVisible : false,
				copyright: "",
				displayInLayerSwitcher: true,
				popup :
					"<div class='popup-header1'>Arkitektur från 2000-talet</div>" +
					"<div class='popup-header2'>${namn}</div>" +
					"<div class='popup-text1'>Byggår: ${byggar}</div>" +
					"<div class='popup-text1'>Arkitekt: ${arkitekt}</div>" +
					"<a href='${url}' class='popup-text1' target='_blank'>Läs mer</a>"+
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>" ,
				//blixtable : false, 
				selectable : true,
				style: {
					"default": {
					externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/ark2000.png",
					graphicWidth : 22,
					graphicHeight : 19,
					graphicXOffset : -10,
					graphicYOffset : -10
					}
				}
			},
			{
				displayName: 'Hållplatser',
				name: "busshpl",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Trafik & hållbart resande", "Buss & Tåg"],
				displayInLayerSwitcher: true,
				URL: 'http://geoserver.smap.se/geoserver/wms?',
				selectAttributes: ["${fid}"],
				params : {
					layers: 'commonws:skanetrafiken3008', 
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Hållplats</div>" +
					"<div class='popup-text1'>${caption}</div>" +
					"<a href='http://www.skanetrafiken.se' class='popup-text1' target='_blank'>Läs mer</a>",					
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=commonws:skanetrafiken3008&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=commonws:skanetrafiken3008&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Busstationer',
				name: "buss",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Trafik & hållbart resande", "Buss & Tåg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_BUSS_STATION_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Busstation</div>" +
					"<div class='popup-text1'>${objektnamn}</div>",					
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/busstation.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/busstation.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Tågstationer',
				name: "tag",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Trafik & hållbart resande", "Buss & Tåg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:POI_TAG_STATION_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Tågstation</div>" +
					"<div class='popup-text1'>${objektnamn}</div>",					
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/tagstation.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/tagstation.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Cykelpumpar',
				name: "cykelpumpar",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Trafik & hållbart resande", "Cykel"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:GK_CYKELPUMP_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>${typ}</div>",					
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:GK_CYKELPUMP_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:GK_CYKELPUMP_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Cykelvägar',
				name: "cykelvagar",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Trafik & hållbart resande", "Cykel"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:GK_CYKELVAG_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},				
				blixtable : false, 
				selectable : false,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/bilder/kartsymboler/cykelvag.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/cykelvag.png"}
				}
			},
			
			{
				displayName: 'Handikapptoalett',
				name: "handikapp",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Skötsel & underhåll", "Offentliga toaletter"],
				displayInLayerSwitcher: true,
				URL: "http://geoserver.smap.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:V_GK_TOA_HANDIKAPP_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Toalett</div>" +
					"<div class='popup-header3'>${namn}</div>" +
					"<span class='popup-text1'>Avgift: </span><span class='popup-text2'>${avgift}</span>" + 
					"<br /><span class='popup-text1'>Handikapptoalett: </span><span class='popup-text2'>${handikapptoalett}</span>" + 
					"<br /><span class='popup-text1'>Skötbord: </span><span class='popup-text2'>${skotbord}</span>" + 
					"<br /><span class='popup-text1'>April-sept: </span><span class='popup-text2'>${oppettider_1}</span>" + 
					"<br /><span class='popup-text1'>Oktober-mars: </span><span class='popup-text2'>${oppettider_2}</span>" +
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>",
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_GK_TOA_HANDIKAPP_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_GK_TOA_HANDIKAPP_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Offentliga toaletter',
				name: "offentligatoaletter",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Skötsel & underhåll", "Offentliga toaletter"],
				displayInLayerSwitcher: true,
				URL: "http://geoserver.smap.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:V_GK_TOA_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Toalett</div>" +
					"<div class='popup-header3'>${namn}</div>" +
					"<span class='popup-text1'>Avgift: </span><span class='popup-text2'>${avgift}</span>" + 
					"<br /><span class='popup-text1'>Handikapptoalett: </span><span class='popup-text2'>${handikapptoalett}</span>" + 
					"<br /><span class='popup-text1'>Skötbord: </span><span class='popup-text2'>${skotbord}</span>" + 
					"<br /><span class='popup-text1'>April-sept: </span><span class='popup-text2'>${oppettider_1}</span>" + 
					"<br /><span class='popup-text1'>Oktober-mars: </span><span class='popup-text2'>${oppettider_2}</span>" +
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>",				
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_GK_TOA_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_GK_TOA_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Offentliga toaletter (avgift)',
				name: "offentligatoaletterAvgift",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Skötsel & underhåll", "Offentliga toaletter"],
				displayInLayerSwitcher: true,
				URL: "http://geoserver.smap.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:V_GK_TOA_AVGIFT_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Toalett</div>" +
					"<div class='popup-header3'>${namn}</div>" +
					"<span class='popup-text1'>Avgift: </span><span class='popup-text2'>${avgift}</span>" + 
					"<br /><span class='popup-text1'>Handikapptoalett: </span><span class='popup-text2'>${handikapptoalett}</span>" + 
					"<br /><span class='popup-text1'>Skötbord: </span><span class='popup-text2'>${skotbord}</span>" + 
					"<br /><span class='popup-text1'>April-sept: </span><span class='popup-text2'>${oppettider_1}</span>" + 
					"<br /><span class='popup-text1'>Oktober-mars: </span><span class='popup-text2'>${oppettider_2}</span>" +
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>",				
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_GK_TOA_AVGIFT_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_GK_TOA_AVGIFT_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'Skötbord',
				name: "skotbord",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Skötsel & underhåll", "Offentliga toaletter"],
				displayInLayerSwitcher: true,
				URL: "http://geoserver.smap.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:V_GK_TOA_SKOTBORD_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Toalett</div>" +
					"<div class='popup-header3'>${namn}</div>" +
					"<span class='popup-text1'>Avgift: </span><span class='popup-text2'>${avgift}</span>" + 
					"<br /><span class='popup-text1'>Handikapptoalett: </span><span class='popup-text2'>${handikapptoalett}</span>" + 
					"<br /><span class='popup-text1'>Skötbord: </span><span class='popup-text2'>${skotbord}</span>" + 
					"<br /><span class='popup-text1'>April-sept: </span><span class='popup-text2'>${oppettider_1}</span>" + 
					"<br /><span class='popup-text1'>Oktober-mars: </span><span class='popup-text2'>${oppettider_2}</span>" +
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>",				
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_GK_TOA_SKOTBORD_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_GK_TOA_SKOTBORD_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				displayName: 'PinkIn',
				name: "pinkin",
				layerType : "wms",
				//dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["Stadsplanering & trafik", "Skötsel & underhåll", "Offentliga toaletter"],
				displayInLayerSwitcher: true,
				URL: "http://geoserver.smap.se/geoserver/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:V_GK_TOA_PISSOAR_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.90",
					zIndex: 126,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Toalett</div>" +
					"<div class='popup-header3'>${namn}</div>" +
					"<span class='popup-text1'>Avgift: </span><span class='popup-text2'>${avgift}</span>" + 
					"<br /><span class='popup-text1'>Handikapptoalett: </span><span class='popup-text2'>${handikapptoalett}</span>" + 
					"<br /><span class='popup-text1'>Skötbord: </span><span class='popup-text2'>${skotbord}</span>" + 
					"<br /><span class='popup-text1'>April-sept: </span><span class='popup-text2'>${oppettider_1}</span>" + 
					"<br /><span class='popup-text1'>Oktober-mars: </span><span class='popup-text2'>${oppettider_2}</span>" +
					"<br /><a href='${bild}' class='popup-text1' target='_blank'><img class='popup-img1' src='${bild}' /></a>",	
				blixtable : false, 
				selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_GK_TOA_PISSOAR_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://geoserver.smap.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:V_GK_TOA_PISSOAR_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://xyz.malmo.se/rest/2.0/map/img/Generell_select/cirkel_medium_turkos.png'
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
				layer : "malmo_karta",
				layerType : "tilecache",
				category : "Karta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483],
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
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
				displayName : "Häradskartan&nbsp;1912",
				name : "malmokarta1912",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_karta_1912",
				layerType : "tilecache",
				category : "Karta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483],
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
				displayName : "Rekognoscerings-<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kartan&nbsp;1812",
				name : "malmokarta1812",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_karta_1812",
				layerType : "tilecache",
				category : "Karta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483],
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
				displayName : "Fotokarta 2013",
				name : "orto",  /* ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto  */
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483],
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),
					//maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),	
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
				name : "orto_2012",  /* ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto  */
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_2012",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483],
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
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483],
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
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483],
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
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483],
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
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483],
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

		// {
		// 	init : sMap.Module.MalmoHeader,
		// 	config : {}
		// },

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
					/*	"<a class='popup-text1' href='${url}' target='_blank'>Läs mer</a><br>" +  */
						"<a class='popup-text1' href='${url_snedbild}' target='_blank'>Visa snedbild</a><br><br>" +
						"<div class='popup-text2'>${stadsomr}</div>" + 						
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
				content: "http://xyz.malmo.se/stadsatlas/hjalp/hjalp.htm",
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
		}
		/* ,
		{
			init: sMap.Module.IntroDialog,
			config: {
				dialogBGColor: "#fff",
				dialogOptions: {
					title: "Välkommen!",
					width: 400,
					height: 250,
					minWidth: 100
				},
				contentHtml: 
					"<p><b><i>Malmö Stadsatlas</i></b></p>" +
					"<p></p>" +
					"<p></p>" +
					"<p></p>" +			
					"<p></p>"				
			}
		} */
		
	]
};

/**
 * These layers are added to overlays if the IP is valid.
 */
var obsLayers = [
	{
		name : "brand",
		displayName : "Bränder",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/brander.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default20.png",
		category : ["Bränder, olyckor & skador *", "Bränder 2012"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '20', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false,
			zIndex: 350			
		},
		selectable : false,
		geomType : 'point',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "fotgangare",
		displayName : "Fotgängare",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/olyckor.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default23.png",
		category : ["Bränder, olyckor & skador *", "Olyckor 2012"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '23', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "cykel",
		displayName : "Cykel",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/olyckor.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default22.png",
		category : ["Bränder, olyckor & skador *", "Olyckor 2012"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '22', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "motorf",
		displayName : "Motorfordon",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/olyckor.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default21.png",
		category : ["Bränder, olyckor & skador *", "Olyckor 2012"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '21', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_so_tot",
		displayName : "Statistikområde, Totalt",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_tot.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default19.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Totalt"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '19', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_do_tot",
		displayName : "Delområde, Totalt",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_tot.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default18.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Totalt"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '18', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_sd_tot",
		displayName : "Stadsdel, Totalt",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_tot.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default17.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Totalt"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '17', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_trend_tot",
		displayName : "Trend, Totalt",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_tot.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default16.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Totalt"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '16', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false,
			singleTile : true
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	}, 
	{
		name : "s_so_tra",
		displayName : "Statistikområde, Trafik",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_tra.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default15.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Trafik"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '15', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_do_tra",
		displayName : "Delmoråde, Trafik",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_tra.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default14.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Trafik"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '14', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_sd_tra",
		displayName : "Stadsdel, Trafik",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_tra.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default13.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Trafik"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '13', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_trend_tra",
		displayName : "Trend, Trafik",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_tra.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default12.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Trafik"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '12', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false,
			singleTile : true
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	}, 
	{
		name : "s_so_bos",
		displayName : "Statistikområde, Bostad",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_bos.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default11.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Bostad"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '11', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_do_bos",
		displayName : "Delområde, Bostad",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_bos.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default10.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Bostad"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '10', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_sd_bos",
		displayName : "Stadsdel, Bostad",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_bos.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default9.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Bostad"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '9', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_trend_bos",
		displayName : "Trend, Bostad",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_bos.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default8.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Bostad"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '8', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false,
			singleTile : true
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	}, 
	{
		name : "s_so_arb",
		displayName : "Statistikområde, Arbete",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_arb.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default7.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Arbete"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '7', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_do_arb",
		displayName : "Delområde, Arbete",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_arb.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default6.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Arbete"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '6', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_sd_arb",
		displayName : "Stadsdel, Arbete",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_arb.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default5.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Arbete"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '5', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_trend_arb",
		displayName : "Trend, Arbete",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_arb.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default4.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Arbete"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '4', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false,
			singleTile : true
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	}, 
	{
		name : "s_so_idr",
		displayName : "Statistikområde, Idrott",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_idr.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default3.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Idrott"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '3', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_do_idr",
		displayName : "Delområde, Idrott",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_idr.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default2.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Idrott"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '2', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_sd_idr",
		displayName : "Stadsdel, Idrott",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_idr.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default1.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Idrott"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '1', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	},
	{
		name : "s_trend_idr",
		displayName : "Trend, Idrott",
		layerType : "wms",
		dialogContent: "http://xyz.malmo.se/stadsatlas/legend/obs/skador_idr.htm?img=http://xyz.malmo.se/arcgisoutput/malmo_obs_MapServer/wms/default0.png",
		category : ["Bränder, olyckor & skador *", "Skador 2012", "Idrott"],
		displayInLayerSwitcher: true,
		URL: "http://xyz.malmo.se/ArcGIS/services/malmo_obs/MapServer/WMSServer?",
		params : {
			layers: '0', 
			format: 'image/png',
			transparent: 'true',
			SRS: '3008'
		}, 
		options : {
			isBaseLayer: false,
			singleTile : true
		},
		selectable : false,
		geomType : 'polygon',
		startVisible : false,
		copyright : [],
		style: {
			"default": {externalGraphic: "http://xyz.malmo.se/bilder/kartsymboler/noImg.png"}			
		}
	}
];






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

config.onConfigLoaded = function(c, onDone) {
	$.ajax({
		url: "http://xyz.malmo.se/WS/wsMalmo/ipOK.py",
		dataType: "json",
		success: function(data) {
			if (data.valid) {
				c.layers.overlays = c.layers.overlays.concat(obsLayers);				
			}
		},
		error: function(a,text,c) {
			debug.log("Could not fetch IP");
		},
		complete: function() {
			onDone();			
		}
	});
};


// setTimeout(function() {
// 	var func = function() {
// 		$(".toolbar-entry").off("focus", func);
// 		alert("OBS! Det är för närvarande problem med adressdatabasen vilket gör att vissa adresser inte är sökbara.");
// 	}
// 	$(".toolbar-entry").on("focus", func);
// }, 3000);

