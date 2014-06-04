var config = {
	
	mapName: {
		"sv-SE": "Normalkartan",
		"en": "The normal map"
	},
	version : "4.0.0",
	//projection : "EPSG:3008",
	projection : "EPSG:3006",
	resolutions : [ 200, 100, 50, 25, 10, 5, 2, 1 ], // EPSG:3006
	//resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483], // EPSG:3008
	
	// EPSG:3006
	maxExtent : {
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
	},
	
	// EPSG:3008
	/*maxExtent : {
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
	},*/
	
	//proxyHost : "http://kartor.smap.se/cgi-bin/proxy/proxy.py?url=",
	proxyHost : "../../cgi-bin/proxy.py?url=",
	
	rootURL : document.URL.split("?")[0],
	
	layers : {
		
		overlays : [
		            {
		            	displayName: "GeoJSON",
		            	name: "geojson",
		            	URL: "example_3006.json",
		            	shiftCoords: true,
		            	layerType: "vector",
		            	format: "geojson",
		            	copyright: "© Hej",
		            	displayInLayerSwitcher: true,
		            	style: {
		            		"default": {
		            			externalGraphic: "img/legend/malmo_op_ps_karta.jpg",
		            			pointRadius: 25,
		            			fillOpacity: 1
		            		}
		            	}
		            },
		            {
		            	displayName: "WKT",
		            	name: "wkt",
		            	URL: "example_3006.wkt",
		            	shiftCoords: false,
		            	layerType: "vector",
		            	format: "wkt",
		            	copyright: "© Hej",
		            	displayInLayerSwitcher: true,
		            	style: {
		            		"default": {
		            			externalGraphic: "img/legend/malmo_op_ps_karta.jpg",
		            			pointRadius: 25,
		            			fillOpacity: 1
		            		}
		            	}
		            }
		            // http://maps.lantmateriet.se/ortofoto-ar/wms/v1?VERSION=1.3.0&SERVICE=WMS&REQUEST=GetMap&EXCEPTIONS=XML&LAYERS=orto_2011&CRS=EPSG:3006&BBOX=6580300,674600,6580812,675112&WIDTH=512&HEIGHT=512&FORMAT=image/png&TRANSPARENT=false&BGCOLOR=0xFFFFFF
		            /*,{
		            	displayName : 'WMS 1.3 ',
						name: "wms-1.3",
						layerType : "wms",
//						category : [],
						displayInLayerSwitcher: true,
						URL: "http://maps.lantmateriet.se/ortofoto-ar/wms/v1",
						params : {
							layers: "orto_2011",
							format: "image/png",
							transparent: "true",
							version: "1.1.0"
						}, 
						options : {
							isBaseLayer: false,
							opacity: 1,
							zIndex: 250,
							ratio: 1,
							transitionEffect: 'resize',
							singleTile : false
						},
						popup :
							"<div class='popup-header1'>Fastighet</div>" +
							"<div class='popup-text1'>${fastighet}</div>" +
							"<br>" +
							"<div class='popup-text1'><a href='http://sbkspace.malmo.se/verksamhetsatlas/asp/fir_sok.asp?FNR=${fnr}' target='_blank'>Visa info...</a></div>" +		
							"<div class='popup-text1'><a href='http://xyz.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>",
						selectable : false,
//						getFeatureInfo: {geometryName: "geom"},
						geomType : 'area',
						startVisible : false,
//						legend : {
//							hover: {
//								url: null
//							}
//						},
						copyright : [],
						style: {}
		            }*/
		],
		
		baselayers : [
			{
				displayName : "Karta",
				name : "Skanekarta",
				URL : "http://tilecache.smap.se/",
				layer : "skane_karta_sr99tm",
				layerType : "tilecache",
				category : "Karta",
				options : {
					buffer : 0,
					transitionEffect : "resize",
					format : "image/jpg",
					isBaseLayer : true
				},
				copyright : [ "Skånes kommuner och Lantmäteriet", "http://www.geodatacenter.se/" ]
			},
			{
				displayName : "Fotokarta 2010",
				name : "Orto2010",
				URL : "http://tilecache.smap.se/",
				layer : "skane_ortofoto_2010_sr99tm",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					buffer : 0,
					transitionEffect : "resize",
					format : "image/jpg",
					isBaseLayer : true
				},
				copyright : [ "Lantmäteriet 2010", "http://www.lantmateriet.se" ]
			}
			/*{
				displayName : "Malmökarta",
				name : "malmokarta", // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_karta",
				layerType : "tilecache",
				category : "Karta",
				options : {
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				}
			}*/
		]
	},
	
	
	modules : //[sMap.Module.Email, sMap.Module.ModuleTest]
	[
		{
			init : sMap.Module.Toolbar,
			config : {}
		},
		{
			init : sMap.Module.FeatureRequester,
			config : {}
		},
		{
			init : sMap.Module.Select,
			config : {}
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
			init : sMap.Module.Search,
			config : {
				//noInput : false, //If set to true - do not add searchbox to GUI.
				toolbarIndex : 2,
				dropDownOption: false,
				useProxy : true, //search via sMap.config.proxyHost (i.e proxyHost above in this file)
				autoCompleteScriptUrl : "http://kartor.smap.se/cgi-bin/search/sok.py?",
				searchScriptUrl : "http://kartor.smap.se/cgi-bin/search/sokexakt.py"
			}
		}
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
//		{
//			init : sMap.Module.ToolsMenu,
//			config : {
//				toolbarIndex : 3
//			}
//		},
//		{
//			init : sMap.Module.MeasureDialog,
//			config : {
//				toolbarIndex : 4
//			}
//		}
		,{
			init : sMap.Module.Report,
			config : {
				addToToolsMenu: false,
				labels: {
				    "sv-SE": {
				        labelButton: "Skriv ut ÖP"
				    },
				    "en": {
				        labelButton: "Skriv ut ÖP"
				    }
				}
			}
		}
		,{
			init : sMap.Module.Report,
			config : {
				addToToolsMenu: false,
				labels: {
				    "sv-SE": {
				        labelButton: "Skapa rapport",
				        labelButtonHover: "Skapa rapport"
				    },
				    "en": {
				        labelButton: "Skapa rapport",
				        labelButtonHover: "Skapa rapport"
				    }
				}
			}
		}
		,{
			init : sMap.Module.SPrint,
			config : {
				toolbarIndex: 1,
				addToToolsMenu: false,
				printCopyrightNotice: '<div id="print-dialog-userconditions" class="ui-dialog-content ui-widget-content" scrolltop="0" scrollleft="0" style="width: auto; min-height: 0px; height: 183px;">För utdrag från kartan/flygfotot till tryck eller annan publicering, krävs tillstånd från Malmö Stadsbyggnadskontor. Vid frågor om tillstånd, användningsområden eller kartprodukter kontaktas Stadsbyggnadskontorets kartförsäljning: 040-34 24 35 eller <a style="outline:none;" href="mailto:sbk.sma@malmo.se?subject=Best%E4lla karta">sbk.sma@malmo.se</a>.<br><strong>Accepterar du villkoren?</strong></div>'
			}
		}
		,{
			init : sMap.Module.CopyLink,
			config : {
				toolbarIndex : 1,
				addToToolsMenu : false
			}
		}
		/*{
			init : sMap.Module.Login,
			config : {}
		},*/
//		{
//			init : sMap.Module.Opacity,
//			config : {
//				toolbarIndex : 2,
//				addToToolsMenu : true
//			}
//		},
//		{
//			init : sMap.Module.MousePos,
//			config : {}
//		},
//		{
//			init : sMap.Module.Pizza,
//			config : {}
//		},
//		{
//			init : sMap.Module.Print,
//			config : {
////				toolbarIndex : 3,
////				webContentRoot: "/home/johan/public_html/sMap/", //"/var/www/kartor/skane/",
////				publicExportFolder: "http://kartor.smap.se/temp/print/",
////				privateExportFolder: "/var/www/kartor/temp/print/",
////				printScriptsFolderPath: "http://kartor.smap.se/cgi-bin/print/"
//			}
//		},
//		{
//			init : sMap.Module.Draw,
//			config : {
//				toolbarIndex : 3
//			}
//		},
//		{
//			init : sMap.Module.ConfigSelector,
//			config : {
//				toolbarIndex : 5
//			}
//		},
		,
		{
			init : sMap.Module.LayerTree,
			config : {}
		}
//		{
//			init : sMap.Module.OverlaySwitcher.SimpleSwitcher,
//			config : {}
//		}
		
	]
	            
	
	
	
	
		
};