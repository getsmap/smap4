/**
 * Configuration for the planning map application "Översiktsplanen 2012" for SBK, Malmö stad.
 */
 
//anvisningar för öp. 
//zIndex: 1-999  baselayers        00-99  - öp   
//zIndex: 1000-1999  polygoner    100-199 - öp   
//zIndex: 2000-2999  linjer       200-299 - öp
//zIndex: 3000-3999  punkter      300-399 - öp
//zIndex: 4000-4999  texter       400-499 - öp
  
  
var planApp = {
	
	// Metadata for folders in the layer tree. Also used by
	// BlixtenPopup when displaying HTML content for a category
	// folder on select (when clicking on a folder).
	categories: {
		headers: {
			"ÖVERSIKTSPLAN FÖR MALMÖ": {
				//url: "http://www.malmo.se/",
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				tooltip: "Enligt plan- och bygglagen (PBL) ska varje kommun ha en aktuell översiktsplan. Översiktsplanen är vägledande vid beslut om användning av mark- och vattenområden och anger hur den existerande stadsmiljön ska utvecklas. Den redovisar en långsiktig inriktning för kommunens utveckling och är inte juridiskt bindande. Översiktsplanen är antagen av kommunfullmäktige 22 maj 2014.",
				expand: true,
				subheaders: {
					"Planstrategi": {
						//url: "http://komin.malmo.se/download/18.519344c0136df710e21800018112/%C3%96P2012_Planstrategi_internremiss_3maj2012.pdf",
						hideCheckbox: true,
						startVisible : true,
						tooltip: "Planstrategin är en separat skrift som redovisar en stadsbyggnadsvision för Malmö, övergripande mål och prioriteringar samt strategier inom ett antal olika stadsbyggnadsaspekter. I planstrategin finns även en karta som visar den principiella utbyggnadsstrategin. ",
						cssClass: "subheader",
						color: "#ffffee"
						//tooltip: "This is the Planstrategi"
					},					
					"Planeringsriktlinjer": {
						//url: "http://www.malmo.se/",
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#E3FFC3",
						tooltip: "Planeringsriktlinjerna är konkreta riktlinjer för olika aspekter av stadsplaneringen. De anger vad som särskilt ska beaktas vid detaljplanering, bygglovgivning med mera. Riktlinjer finns dels generellt för tematiska planeringsaspekter, exempelvis bebyggelse, parker, handel och trafik, dels för särskilt utvalda geografiska områden. ",
						textBox: "antagen av kommunfullmäktiget 22 maj 2014",
						subheaders: {
							"Bebyggelse": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							},
							"Täthet": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							},
							"Natur, rekreation, odling": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							},
							"Handel": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							},
							"Kulturmiljöer och bef. stadskaraktär": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							},
							"Hav, kust, vatten": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							},							
							"Trafik": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							},
							"Teknisk försörjning": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							},
							"Särskilda geografiska områden": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							}
						}
					},
					
					"Riksintressen": {
						//url: "http://www.malmo.se/",
						hideCheckbox: true,
						cssClass: "subheader",
						tooltip: "Riksintressena utgörs av geografiska områden som har nationell betydelse för olika samhällsintressen. Det kan exempelvis vara områden med höga natur- eller kulturvärden eller områden för infrastruktur eller olika näringar som är väsentliga att säkerställa ur ett riksperspektiv. Bestämmelserna om riksintresse finns i miljöbalken. Olika statliga verk och myndigheter fastställer riksintressena. I översiktsplanen redovisar kommunen hur riksintressena ska tillgodoses. ",
						color: "#FFEEC3",
						//tooltip: "This is the Översiktsplan",
						subheaders: {
								"Kulturmiljövård": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							    },
								"Naturvård": {
									//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
									hideCheckbox: true
								},
								"Natura 2000-områden": {
									//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
									hideCheckbox: true
								},							
								"Kustzonen": {
									//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
									hideCheckbox: true
								},
								"Väg": {
									//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
									hideCheckbox: true
								},
								"Järnväg": {
									//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
									hideCheckbox: true
								},							
								"Farled": {
									//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
									hideCheckbox: true
								},							
								"Malmö hamn": {
									//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
									hideCheckbox: true
								},
								"Yrkesfisket": {
									//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
									hideCheckbox: true
								},
								"Värdefulla ämnen och material": {
									//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
									hideCheckbox: true
								},		
								"Försvar - samrådsområde": {
									//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
									hideCheckbox: true
								}								
						}
					}
				}
			},
			"UNDERLAG": {
				//url: "http://malmo.se/Medborgare/Stadsplanering--trafik/Stadsplanering--visioner/Oversiktsplaner--strategier.html",
				hideCheckbox: true,
				tooltip: "Underlagskartorna ingår inte i den av kommunfullmäktige antagna översiktsplanen. Underlagen redovisar befintliga förhållanden och uppdateras successivt. ",
				expand: false,
				cssClass: "mainheader",
				//tooltip: "This is the underlag för Översiktsplanen",
				subheaders: {
								"Detaljplaner, fastigheter med mera": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							    },
								"Natur, rekreation med mera": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							    },
								"Trafik": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							    },
								"Miljö, risk och säkerhet": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							    },
								"Teknisk försörjning, VA": {
								//tooltip: "Byggnader är viktiga för stadsutvecklingen...",
								hideCheckbox: true
							    }			
				}
			}
		},
		layers: {}
	}
};

var config = {
	mapName: {
		"sv-SE": "Malmös översiktsplan",
		"en": "The masterplan of Malmö"
	},
	minWidth: 1100,
	version : "4.0.0",
	projection : "EPSG:3008",
	//projection : "EPSG:3006",
	resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
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
		n : 62700006
	},*/
	
	// EPSG:3008
	/*
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
*/

	// EPSG:3008
	maxExtent : {
		w : 97000,
		s : 6148000,
		e : 139000,
		n : 6175000
	},
	defaultExtent : {
		w : 104853,
		s : 6150876,
		e : 131653,
		n : 6171076
	},
	
//	proxyHost: "http://kartor.smap.se/cgi-bin/proxy/proxy.py?url=",
//	proxyHost: "../../cgi-bin/proxy.py?url=",
	proxyHost : "http://xyz.malmo.se/myproxy/proxy.py?url=",
	iFrame : false,

	jqTheme: "gray-flat",
	
	rootURL : document.URL.split("?")[0],
	//defaultWebParams : "defaultParam=5",
	
	layers : {
		
		overlays : [
		            
//			{
//				displayName : 'Vision och mål',
//				name: "vision_och_mal",
//				layerType : null,
//				hideCheckbox: true,
//				dialogContent: "http://malmo.se/op",
//				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Översiktsplan för Malmö ÖP2012"],
//				displayInLayerSwitcher: true,
//				style: {"default": {externalGraphic: "img/draw_eraser.png_____"}}
//			},

			// {
				// displayName : '(Textdokument,pdf)',
				// name: "planstrategi",
				// layerType : "wms",
				// dialogContent: "http://komin.malmo.se/download/18.519344c0136df710e21800018112/%C3%96P2012_Planstrategi_internremiss_3maj2012.pdf",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planstrategi"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_PS_PLANSTRATEGI",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// opacity: "0",
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : false, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'line',
				// startVisible : false,
				// copyright : [],
				// hideCheckbox: true,
				// style: {}
			// },

			{
				displayName : 'Planstrategi karta',
				name: "ps_karta",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/1_planstrategi/planstrategi_karta/html/planstrategi_karta.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planstrategi"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_op2012_planstrategi_NOV2012",
				layerType : "tilecache",
				params : {},
				options : {
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 51,
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				blixtable : true,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/1_planstrategi/planstrategi_karta/html/bilder/malmo_op_ps_karta_text.jpg" //"img/legend/malmo_op_vit.png"
					}
					
				},				
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/1_planstrategi/planstrategi_karta/html/bilder/malmo_op_ps_karta.jpg"}
				}
			},


			
			{
				displayName: 'Blandad stadsbebyggelse',
				name: "pr_bebyggelsa_blandad_stadsbebyggelse",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Bebyggelse"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_BEBYGGELSE_BLANDAD_STADSBEBYGGELSE_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.78",
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/bilder/Legend_mini_blandad_stadsb_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/bilder/Legend_mini_blandad_stadsb.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 1
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#F0905D",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 2
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#A34A33",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Särskilda verksamhetsområden',
				name: "pr_bebyggelsa_sarskilda_verksamhetsomr",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/sarskilda_verksamhetsomr/html/sarskilda_verksamhetsomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Bebyggelse"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_BEBYGGELSE_SARSKILDA_VERKS_OMRADEN_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 126,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/sarskilda_verksamhetsomr/html/bilder/legend_verksh_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/sarskilda_verksamhetsomr/html/bilder/legend_verksh_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 1
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#CD9CBC",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 2
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#95718D",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Täthet',
				name: "pr_tathet_tathet",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/2_tathet/html/tathet.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Bebyggelse"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_TATHET_TATHET_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.65",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 177,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/2_tathet/html/bilder/Legend_mini_tathet_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/2_tathet/html/bilder/legend_mini_tathet.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "tathet",
						        		value: 1
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#000045",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "tathet",
						        		value: 2
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00057D",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
							        }
								}),
								new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "tathet",
						        		value: 3
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#033BA8",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "tathet",
						        		value: 4
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#2259C7",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
									}
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "tathet",
						        		value: 5
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#669AD9",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Odlingslandskap',
				name: "pr_natur_odlingslandskap",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/odlingslandskap/html/odlingslandskap.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Natur, rekreation, odling"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_NATUR_ODLING_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 129,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/odlingslandskap/html/bilder/Legend_mini_odling_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/odlingslandskap/html/bilder/legend_odling_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#B4D79E",
										fillOpacity: 0.85,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Park och natur',
				name: "pr_natur_park",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/park_natur/html/park_natur.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Natur, rekreation, odling"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_NATUR_PARK_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.68",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 129,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/park_natur/html/bilder/legend_park_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/park_natur/html/bilder/legend_park_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 1
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#668E59",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 2
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#264F1C",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Särskilda fritidsområden, begravningsplatser',
				name: "pr_narur_sarskilda_fitid_begr",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/sarskilda_fritidsomr_begravnpl/html/sarskilda_fritidsomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Natur, rekreation, odling"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_NATUR_FRITIDSOMRADEN_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 129,
					singleTile : true
					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/sarskilda_fritidsomr_begravnpl/html/bilder/legend_fritid_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/sarskilda_fritidsomr_begravnpl/html/bilder/legend_fritid_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "Fritid"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#EDD096",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "Begravningsplats"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#B19D83",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Gröna stråk och kopplingar',
				name: "pr_narur_grona_strak_o_koppl",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/grona_strak_och_kopplingar/html/grona_kopplingar.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Natur, rekreation, odling"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					//layers: "malmows:OP_PR_NATUR_STORA_PARKER_P,OP_PR_NATUR_GRONA_KOPPLING_STRAK_CONCAT_L",
					layers: "malmows:OP_PR_NATUR_STORA_PARKER_P_AUG2013,malmows:OP_PR_NATUR_STRAK_P_AUG2013,malmows:OP_PR_NATUR_KOPPLING_L_AUG2013",
					//layers: "malmows:OP_PR_NATUR_STRAK_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.7",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 280,
					singleTile : true
					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/grona_strak_och_kopplingar/html/bilder/legend_mini_gronastrakokopplingar_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/grona_strak_och_kopplingar/html/bilder/legend_mini_gronastrakokopplingar.jpg"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "Befintlig"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#3A9600",
										strokeOpacity: 1.0,
							        	strokeWidth: 6
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "Ska_utvecklas"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#3A9600",
										strokeOpacity: 1.0,
										strokeDashstyle: "dash",
										strokeWidth: 6
							        }
								 }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "befintlig"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#78BD00",
										fillOpacity: 0.0,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 0
									 }	
								}),
						       	new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "ny"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#78BD00",
										fillOpacity: 0.0,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 0
									}
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "strak"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#268C00",
										fillOpacity: 0.8, 
										strokeColor: "#268C00",
										strokeOpacity: 0.8,
							        	strokeWidth: 5
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
				displayName : 'Handel och centrumfunktioner',
				name: "pr_handel_handelsplatser",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/4_handel/html/handel.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Handel"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_HANDEL_HANDELSPLATSER_P_AUG2013", 
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 171,
					singleTile : true
					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/4_handel/html/bilder/legend_handel_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/4_handel/html/bilder/legend_handel_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "City"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#32280F",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4							        
									}
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "Centrumomraden"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#FFFF00",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
										strokeWidth: 4
							        }
								}),
						       	new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "Grannskapscentrum"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#DC143C",
							        	fillOpacity: 0.7,
										strokeColor: "#00FFFF",
										strokeWidth: 4
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "Sarskilda_handelsomraden"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#7A5E22",
							        	fillOpacity: 0.7,
										strokeColor: "#00FFFF",
										strokeWidth: 4
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
				displayName : 'Kulturhistoriskt särskilt värdefulla miljöer',
				name: "ul_sk_kulturhistoriskt_vardefulla_miljoer",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/kulturhistoriskt_vardefulla_miljoer/html/kulturhistoriskt_vardefulla_miljoer.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_STADSKAR_KULTURHIST_VARDEFULL_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 133,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/kulturhistoriskt_vardefulla_miljoer/html/bilder/Legend_mini_vardefull_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/kulturhistoriskt_vardefulla_miljoer/html/bilder/Legend_mini_vardefull.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#C21F1E",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Bef. karaktär sluten kvartersstad',
				name: "ul_sk_sluten_kvartersstad",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/sluten_kvartersstad/html/sluten_kvartersstad.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_STADSKAR_SLUTEN_KVARTERSTAD_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.72",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 132,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/sluten_kvartersstad/html/bilder/Legend_mini_sluten_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/sluten_kvartersstad/html/bilder/Legend_mini_sluten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#8F1500",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Bef. karaktär öppen kvartersstad',
				name: "ul_sk_oppen_kvartersstad",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/oppen_kvartersstad/html/oppen_kvartersstad.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_STADSKAR_OPPEN_KVARTERSTAD_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.72",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 132,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/oppen_kvartersstad/html/bilder/Legend_mini_oppen_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/oppen_kvartersstad/html/bilder/Legend_mini_oppen.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#E61205",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Bef. karaktär grannskapsenheter',
				name: "ul_sk_grannskapsenheter",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/grannskapsenheter/html/grannskapsenheter.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_STADSKAR_GRANNSKAP_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.72",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 132,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/grannskapsenheter/html/bilder/Legend_mini_grannskap_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/grannskapsenheter/html/bilder/Legend_mini_grannskap.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#D86250",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Bef. karaktär storskaliga bostadsområden',
				name: "ul_sk_storskaliga_bostadsomr",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/storskaliga_bostadsomr/html/storskaliga_bostadsomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_STADSKAR_STORSKALIGA_BOSTADSOMR_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.72",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 132,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/storskaliga_bostadsomr/html/bilder/Legend_mini_storskalig_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/storskaliga_bostadsomr/html/bilder/Legend_mini_storskalig.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#FFC15C",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Bef. karaktär småskalig bebyggelse',
				name: "ul_sk_smaskalig_bebyggelse",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/smaskalig_bebyggelse/html/smaskalig_bebyggelse.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_STADSKAR_SMASKALIG_BEBYGGELSE_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.72",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 132,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/smaskalig_bebyggelse/html/bilder/Legend_mini_smaskalig_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/smaskalig_bebyggelse/html/bilder/Legend_mini_smaskalig.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#FFFF92",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Bef. karaktär institutioner',
				name: "ul_sk_institutioner",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/institutioner/html/institutioner.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_STADSKAR_INSTITUTIONER_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.72",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 132,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/institutioner/html/bilder/Legend_mini_institutioner_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/institutioner/html/bilder/Legend_mini_institutioner.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#EE97C3",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Landskapskaraktär och byar',
				name: "ul_landskapskaraktar_byar",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/byar_och_storre_gardar/html/byar_storre_gardar.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_STADSKAR_LANDSKAPSKAR_P_NOV2012,malmows:OP_PR_STADSKAR_BYAR_GARDAR_P_NOV2012",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 132,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/byar_och_storre_gardar/html/bilder/Legend_mini_landskap_byar_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/byar_och_storre_gardar/html/bilder/Legend_mini_landskap_byar.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#A0DD63",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Utredningsområde kustskydd',
				name: "pr_hav_kustskydd",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/utredningsomr_kustskydd/html/utredningsomr_kustskydd.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Hav, kust, vatten"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_HAV_KUST_VATTEN_KUSTSKYDD_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 168,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/utredningsomr_kustskydd/html/bilder/Legend_mini_kustskydd_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/utredningsomr_kustskydd/html/bilder/Legend_mini_kustskydd.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#A8D3D5",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Strandskydd',
				name: "pr_hav_strandskydd",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/strandskydd/html/strandskydd.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Hav, kust, vatten"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_HAV_KUST_VATTEN_STRANDSKYDD_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 168,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/strandskydd/html/bilder/Legend_mini_strandskydd_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/strandskydd/html/bilder/Legend_mini_strandskydd.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),	
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#20B3E9",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : '3 m nivåkurva',
				name: "pr_hav_tremeter",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/3m_niva/html/tremetersgrans.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Hav, kust, vatten"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_HAV_KUST_VATTEN_TREMETER_L_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 268,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'line',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/3m_niva/html/bilder/Legend_mini_3m_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/3m_niva/html/bilder/Legend_mini_3m.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										strokeColor: "#000080",
										strokeOpacity: "1,00",
							        	strokeWidth: 4
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
				displayName : 'Fotgängarzoner',
				name: "pr_trafik_fotgangarzoner",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/1_fotgangarzoner/html/fotgangarzoner.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_TRAFIK_FOTGANGARZON_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 189,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/1_fotgangarzoner/html/bilder/legend_fotg_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/1_fotgangarzoner/html/bilder/legend_fotg_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "id",
						        		value: 1.0
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#0084BC",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "id",
						        		value: 2.0
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
							        }
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "id",
						        		value: 3.0
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#66CDC8",
										fillOpacity: 0.7,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Huvudcykelnät',
				name: "pr_trafik_huvudcykelstrak_nov2012",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/2_huvudcykelstrak/html/trafik_cykel_huvud.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_TRAFIK_CYKEL_HUVUD_L_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 289,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/2_huvudcykelstrak/html/bilder/legend_cykel_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/2_huvudcykelstrak/html/bilder/legend_cykel_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 1
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#005CE6",
										strokeOpacity: 1.0,
							        	strokeWidth: 8
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 2
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#005CE6",
										strokeOpacity: 1.0,
										strokeWidth: 4
							        }
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 3
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#005CE6",
										strokeOpacity: 1.0,
										strokeDashstyle: "dash",
							        	strokeWidth: 8
							        }
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 4
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#005CE6",
										strokeOpacity: "1.0",
										strokeDashstyle: "dash",
							        	strokeWidth: 4
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
				displayName : 'Stomlinjenät för kollektivtrafik',
				name: "pr_trafik_Kollektivtrafik",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/3_kollektivtrafik/html/trafik_kollektiv_stomlinjer.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_TRAFIK_KOLLEKTIV_STOMLINJER_L_AUG2013,malmows:OP_PR_TRAFIK_KOLLEKTIVTRAFIK_TXT_L_AUG2013,malmows:OP_PR_TRAFIK_KOLLEKTVTRAFIK_ORESUNDSFORBINDELSE_P_AUG2013,malmows:OP_PR_TRAFIK_KOLLEKTVTRAFIK_ORESUNDSFORBINDELSETEXT_PT_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					format_options: 'antialiasing:text',
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 287,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/3_kollektivtrafik/html/bilder/legend_kolltr_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/3_kollektivtrafik/html/bilder/legend_kolltr_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 2
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#FFB800",
							        	strokeWidth: 6
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 3
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#FFB800",
										strokeDashstyle: "dash",
							        	strokeWidth: 6
							        }
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 4
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#FF1493",
							        	strokeWidth: 8
							        }
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 5
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#000000",
							        	strokeWidth: 4
							        }
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 6
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#000000",
										strokeDashstyle: "dash",
							        	strokeWidth: 4
							        }
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 7
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#FF1493",
										strokeDashstyle: "dash",
							        	strokeWidth: 8
							        }	
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "namn",
						        		value: 10
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#FF1493",
										fillOpacity: 0.3,
										strokeColor:  "#FF1493",
										strokeOpacity: 0.3,
										strokeWidthe: 5
										
									}	
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 10
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#FF1496",
										strokeOpacity: 0.0,
										strokeWidth: 5
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
				displayName : 'Huvudgator, trafikleder',
				name: "pr_trafik_huvudgator_trafikleder",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/4_huvudgator_trafikleder/html/trafik_gator_och_vagar.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_TRAFIK_HUVUDGATOR_TRAFIKLEDER_L_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 285,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/4_huvudgator_trafikleder/html/bilder/legend_huvudgator_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/4_huvudgator_trafikleder/html/bilder/legend_huvudgator_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 4
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#9370DB",
							        	strokeWidth: 12
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 5
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#9370DB",
										strokeDashstyle: "dash",
							        	strokeWidth: 12
							        }
								}),
								new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 6
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#4B0082",
							        	strokeWidth: 14
							        }
								}),
								new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 7
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#4B0082",
							        	strokeWidth: 8
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
				displayName : 'Godsspår',
				name: "pr_trafik_godsspar",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/5_godsspar/html/godsspar.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_TRAFIK_GODSSPAR_L_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 283,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/5_godsspar/html/bilder/legend_godsspar_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/5_godsspar/html/bilder/legend_godsspar_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 3
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#B22222",
										strokeDashstyle: "dash",
							        	strokeWidth: 16
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 4
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#B22222",
							        	strokeWidth: 16
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
				displayName : 'Farligt gods',
				name: "pr_trafik_farligt_gods",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/6_farligt_gods/html/farligtgods.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_TRAFIK_FARLIGT_GODS_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 183,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/6_farligt_gods/html/bilder/legends_farligtgods_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/6_farligt_gods/html/bilder/legends_farligtgods_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 1
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#D20000",
										fillOpacity: 1.0,
										strokeColor: "#D20000",
										strokeOpacity: 1.0,
							        	strokeWidth: 5
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ_nr",
						        		value: 2
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#FF69B4",
										fillOpacity: 1.0,
										strokeColor: "#FF69B4",
										strokeOpacity: 1.0,
							        	strokeWidth: 5
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
				displayName : 'Vindkraft',
				name: "pr_teknik_vindkraft",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/vindkraft/html/vindkraft.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Teknisk försörjning"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_TEKNIK_VINDKRAFT_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 174,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/vindkraft/html/bilder/legend_vindkraft_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/vindkraft/html/bilder/legend_vindkraft_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "prio",
						        		value: 1
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#B018E7",
										fillOpacity: 0.9,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "prio",
						        		value: 2
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#B018E7",
										fillOpacity: 0.4,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Biogasanläggningar',
				name: "pr_teknik_biogasanlaggningar",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/biogasanlaggningar/html/biogasanlaggningar.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Teknisk försörjning"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_TEKNIK_BIOGASANLAGGNING_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 350,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/biogasanlaggningar/html/bilder/Legend_mini_biogas_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/biogasanlaggningar/html/bilder/Legend_mini_biogas.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	graphicWidth: 40,
										graphicHeigth: 40,
										externalGraphic: 'http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/biogasanlaggningar/html/bilder/triangel.png'
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
*/			
			{
				displayName : 'Återvinning',
				name: "pr_teknik_avfall",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/avfall/html/avfall.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Teknisk försörjning"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_TEKNIK_AVFALL_PT_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 350,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/avfall/html/bilder/legend_avfall_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/avfall/html/bilder/legend_avfall_liten.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "status",
						        		value: "Befintlig"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	graphicWidth: 40,
										graphicHeigth: 40,
										externalGraphic: 'http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/avfall/html/bilder/avfallselect1.png'
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "status",
						        		value: "Föreslagen"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	graphicWidth: 40,
										graphicHeigth: 40,
										externalGraphic: 'http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/avfall/html/bilder/avfallselect2.png'
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

			// {
				// displayName : 'VA',
				// name: "pr_teknik_va",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/va/html/va.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Teknisk försörjning"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_PR_TEKNIK_VA_TUNNEL2000_L",
					// layers: "malmows:PAGANG",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// opacity: "0.85",
					// ratio: 1,
					// transitionEffect: 'resize',					
					// zIndex: 192,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// legend : {
					// hover: {
						// url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/va/html/bilder/Legend_mini_va_med_text.png"
					// }
				// },		
				// style: {
					// "default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/va/html/bilder/Legend_mini_va.png"}
				// }
			// },		
									
			{
				displayName : 'Amiralsgatan i Rosengård',
				name: "pr_so_amiralsgatan_rosengard",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/amiralsgatan_rosengard/html/amiralsgatan_rosengard.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_AMIRALSGATAN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/amiralsgatan_rosengard/html/bilder/Legend_mini_amiralsgatan_rosengard_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/amiralsgatan_rosengard/html/bilder/Legend_mini_amiralsgatan_rosengard.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Annetorps industriområde',
				name: "pr_so_annetorps_industri",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/annetorps_industriomrade/html/annetorps_industriomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_ANNETORP_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/annetorps_industriomrade/html/bilder/Legend_mini_annetorps_industriomrade_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/annetorps_industriomrade/html/bilder/Legend_mini_annetorps_industriomrade.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Bunkeflostrand-Ingvalla',
				name: "pr_so_bunkeflostrand_ingvalla",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/bunkeflostrand_ingvalla/html/bunkeflostrand_ingvalla.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_BUNKEFLO_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/bunkeflostrand_ingvalla/html/bilder/Legend_mini_bunkeflostrand_ingvalla_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/bunkeflostrand_ingvalla/html/bilder/Legend_mini_bunkeflostrand_ingvalla.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Elinegård',
				name: "pr_so_elinegard",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/elinegard/html/elinegard.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_ELINEGARD_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/elinegard/html/bilder/Legend_mini_elinegard_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/elinegard/html/bilder/Legend_mini_elinegard.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Fortuna-Hemgården',
				name: "pr_so_fortuna_hemgarden",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fortuna_hemgarden/html/fortuna_hemgarden.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_FORTUNA_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fortuna_hemgarden/html/bilder/Legend_mini_fortuna_hemgarden_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fortuna_hemgarden/html/bilder/Legend_mini_fortuna_hemgarden.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Fosieby station',
				name: "pr_so_fosieby_station",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosieby_station/html/fosieby_station.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_FOSIEBY_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosieby_station/html/bilder/Legend_mini_fosieby_station_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosieby_station/html/bilder/Legend_mini_fosieby_station.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Fosiestråket',
				name: "pr_so_fosiestraket",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosiestraket/html/fosiestraket.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_FOSIESTRAKET_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosiestraket/html/bilder/Legend_mini_fosiestraket_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosiestraket/html/bilder/Legend_mini_fosiestraket.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Glostorps vång',
				name: "pr_so_glostorps_vang",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/glostorps_vang/html/glostorps_vang.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_GLOSTORPS_VANG_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/glostorps_vang/html/bilder/Legend_mini_glostorps_vang_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/glostorps_vang/html/bilder/Legend_mini_glostorps_vang.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Hyllievång',
				name: "pr_so_hyllievang",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/hyllievang/html/hyllievang.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_HYLLIEVANG_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/hyllievang/html/bilder/Legend_mini_hyllievang_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/hyllievang/html/bilder/Legend_mini_hyllievang.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Järnvägsverkstäderna i Kirseberg',
				name: "pr_so_jarnvagsverkstaderna",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/jarnvagsverkstaderna/html/jarnvagsverkstaderna.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_JARNVAGSVERKS_KIRSEBERG_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/jarnvagsverkstaderna/html/bilder/Legend_mini_jarnvagsverkstaderna_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/jarnvagsverkstaderna/html/bilder/Legend_mini_jarnvagsverkstaderna.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Klagshamn',
				name: "pr_so_klagshamn",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/klagshamn/html/klagshamn.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_KLAGSHAMN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/klagshamn/html/bilder/Legend_mini_klagshamn_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/klagshamn/html/bilder/Legend_mini_klagshamn.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Kvarnby-Husie mosse',
				name: "pr_so_kvarnby_husie_mosse",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/kvarnby_husie_mosse/html/kvarnby_husie_mosse.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_KVARNBY_HUSIE_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/kvarnby_husie_mosse/html/bilder/Legend_mini_kvarnby_husie_mosse_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/kvarnby_husie_mosse/html/bilder/Legend_mini_kvarnby_husie_mosse.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Limhamns hamn-norra Ön',
				name: "pr_so_limhamns_hamn_norra_on",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/limhamns_hamn_norra_on/html/limhamns_hamn.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_LIMHAMN_HAMN_NORRA_ON_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/limhamns_hamn_norra_on/html/bilder/Legend_mini_limhamns_hamn_norra_on_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/limhamns_hamn_norra_on/html/bilder/Legend_mini_limhamns_hamn_norra_on.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Malmö hamn ',   //ta ej bort mellanslag efter hamn, då visas fel metadatadokument (malmö hamn riksintressen)
				name: "pr_so_malmo_hamn",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/malmo_hamn/html/malmo_hamn.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_MALMO_HAMN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/malmo_hamn/html/bilder/Legend_mini_malmo_hamn_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/malmo_hamn/html/bilder/Legend_mini_malmo_hamn.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Medeon-sjukhusområdet',
				name: "pr_so_medeon_sjukhusomradet",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/medeon/html/medeon_sjukhusomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_MEDEON_SJUKHUSOMR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/medeon/html/bilder/Legend_mini_medeon_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/medeon/html/bilder/Legend_mini_medeon.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Norra Sorgenfri',
				name: "pr_so_norra_sorgenfri",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/norra_sorgenfri/html/norra_sorgenfri.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_NORRA_SORGENFRI_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/norra_sorgenfri/html/bilder/Legend_mini_norra_sorgenfri_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/norra_sorgenfri/html/bilder/Legend_mini_norra_sorgenfri.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Nyhamnen',
				name: "pr_so_nyhamnen",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/nyhamnen/html/nyhamnen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_NYHAMNEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/nyhamnen/html/bilder/Legend_mini_nyhamnen_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/nyhamnen/html/bilder/Legend_mini_nyhamnen.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Oxie',
				name: "pr_so_oxie",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/oxie/html/oxie.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_OXIE_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/oxie/html/bilder/Legend_mini_oxie_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/oxie/html/bilder/Legend_mini_oxie.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Petersborg',
				name: "pr_so_petersborg",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/petersborg/html/petersborg.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_PETERSBORG_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/petersborg/html/bilder/Legend_mini_petersborg_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/petersborg/html/bilder/Legend_mini_petersborg.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Pildammsvägen',
				name: "pr_so_pildammsvagen",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/pildammsvagen/html/pildammsvagen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_PILDAMMSVAGEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/pildammsvagen/html/bilder/Legend_mini_pildammsvagen_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/pildammsvagen/html/bilder/Legend_mini_pildammsvagen.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Segeområdet',
				name: "pr_so_segeomradet",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/segeomradet/html/segeomradet.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_SEGEOMRADET_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/segeomradet/html/bilder/Legend_mini_segeomradet_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/segeomradet/html/bilder/Legend_mini_segeomradet.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Sofielunds industriområde',
				name: "pr_so_sofielunds_industriomrade",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/sofielunds_industriomrade/html/sofielunds_industriomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_SOFIELUNDS_INDUSTRIOMR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/sofielunds_industriomrade/html/bilder/Legend_mini_sofielunds_industriomr_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/sofielunds_industriomrade/html/bilder/Legend_mini_sofielunds_industriomr.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Tygelsjö',
				name: "pr_so_tygelsjo",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/tygelsjo/html/tygelsjo.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_TYGELSJO_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/tygelsjo/html/bilder/Legend_mini_tygelsjo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/tygelsjo/html/bilder/Legend_mini_tygelsjo.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Varvsstaden',
				name: "pr_so_varvsstaden",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/varvsstaden/html/varvsstaden.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_VARVSSTADEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/varvsstaden/html/bilder/Legend_mini_varvstaden_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/varvsstaden/html/bilder/Legend_mini_varvstaden.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Vintrie',
				name: "pr_so_vintrie",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vintrie/html/vintrie.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_VINTRIE_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vintrie/html/bilder/Legend_mini_vintri_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vintrie/html/bilder/Legend_mini_vintrie.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Västra Klagstorp',
				name: "pr_so_vastra_klagstorp",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vastra_klagstorp/html/vastra_klagstorp.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_PR_SARSKILDA_OMRADEN_VASTRA_KLAGSTORP_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 195,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vastra_klagstorp/html/bilder/Legend_mini_vastra_klagstorp_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vastra_klagstorp/html/bilder/Legend_mini_vastra_klagstorp.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#696969",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'M:K 77 Alnarp-Burlöv',
				name: "ri_kulturmiljo_alnarp",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/kulturmiljo_alnarp.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Kulturmiljövård"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_KULTURMILJO_ALNARP_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 144,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#FF0000",
										fillOpacity: 0.6,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'M:K 114 Malmö',
				name: "ri_kulturmiljo_malmo",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/kulturmiljo_malmo.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Kulturmiljövård"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_KULTURMILJO_MALMO_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 144,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "namn",
						        		value: "malmo_gammal_dragning"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	fillColor: "#FF0000",
										fillOpacity: 0.0,
										strokeColor: "#001487",
							        	strokeWidth: 4
							        }
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "namn",
						        		value: "malmo"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#FF0000",
										fillOpacity: 0.6,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'M:K 128 Foteviken-Glostorp',
				name: "ri_kulturmiljo_foteviken",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/kulturmiljo_foteviken.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Kulturmiljövård"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_KULTURMILJO_FOTEVIKEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 144,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#FF0000",
										fillOpacity: 0.6,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'M:K 181 Södra Sallerup',
				name: "ri_kulturmiljo_sallerup",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/kulturmiljo_sallerup.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Kulturmiljövård"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_KULTURMILJO_SALLERUP_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 144,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#FF0000",
										fillOpacity: 0.6,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'N 87 Backlandskapet söder om Romeleåsen',
				name: "ri_naturvard_backlandskapet",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/naturvard_backlandskapet.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Naturvård"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_NATURVARD_BACKLANDSK_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 147,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/bilder/Legend_mini_naturvard_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/bilder/Legend_mini_naturvard.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#32F0A0",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'N 91 Måkläppen-Limhamnströskeln',
				name: "ri_naturvard_maklappen",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/naturvard_maklappen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Naturvård"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_NATURVARD_MAKLAPPEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 147,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/bilder/Legend_mini_naturvard_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/bilder/Legend_mini_naturvard.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#32F0A0",
										fillOpacity: 0.7,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Limhamns kalkbrott',
				name: "ri_natura2000_kalkbrott",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/natura2000_limhamns_kalkbrott.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Natura 2000-områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_NATURA2000_KALKBROTTET_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 150,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#4CE600",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Tygelsjö-Gessie',
				name: "ri_natura2000_tygelsjo",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/natura2000_tygelsjo_gessie.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Natura 2000-områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_NATURA2000_TYGELSJO_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 150,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#4CE600",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Falsterbo-Foteviken',
				name: "ri_natura2000_falsterbo",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/natura2000_falsterbo.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Natura 2000-områden"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_NATURA2000_FALSTERBO_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 150,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#4CE600",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Kustzonen',
				name: "ri_kustzonen_kustzonen",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kustzon/html/kustzonen_kustzonen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Kustzonen"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_KUSTZON_KUSTZON_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 135,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kustzon/html/bilder/Legend_mini_kustzon_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/kustzon/html/bilder/Legend_mini_kustzon.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#73B2FF",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'E 6 Trelleborg-Strömstad-riksgränsen',
				name: "ri_vag_e6_riksgransen",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e6_trelleborg_stromstad.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_VAGAR_E6_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 265,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										strokeColor: "#FF0000",
										strokeOpacity: "0.85",
							        	strokeWidth: 4
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
				displayName : 'E 6.01 Västkustvägen i Malmö',
				name: "ri_vag_e6_vastkustvagen",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e6_01_vastkustvagen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_VAGAR_VASTKUST_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 265,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										strokeColor: "#FF0000",
										strokeOpacity: "0.85",
							        	strokeWidth: 4
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
				displayName : 'E 6.01 Trafikplats Spillepengen i Malmö',
				name: "ri_vag_e6_trfkpl_spillepengen",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e6_01_spillepengen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_VAGAR_SPILLEPENGEN_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 265,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										strokeColor: "#FF0000",
										strokeOpacity: "0.85",
							        	strokeWidth: 4
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
				displayName : 'E 20 Malmö-Göteborg-Stockholm',
				name: "ri_vag_e20_sthlm",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e20_malmo_goteborg_stockholm.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_VAGAR_E20_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 265,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										strokeColor: "#FF0000",
										strokeOpacity: "0.85",
							        	strokeWidth: 4
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
				displayName : 'E 22 Trelleborg-Blekinge-Norrköping',
				name: "ri_vag_e22_norrkoping",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e22_trelleborg_norrkoping.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_VAGAR_E22_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 265,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										strokeColor: "#FF0000",
										strokeOpacity: "0.85",
							        	strokeWidth: 4
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
				displayName : 'E 65 Malmö-Ystad',
				name: "ri_vag_e65_ystad",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e65_malmo_ystad.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_VAGAR_E65_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 265,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										strokeColor: "#FF0000",
										strokeOpacity: "0.85",
							        	strokeWidth: 4
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
			
			// {
				// displayName : 'Malmö bangård*',
				// name: "ri_jvg_bangard",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_arlov_malmo.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_RI_JARNVAG_BANGARD_P",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {}
			// },

			// {
				// displayName : 'Arlöv-Malmö C-Lockarp/Lernacken*',
				// name: "ri_jvg_arlov_malmo",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_arlov_malmo.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_RI_JARNVAGAR_ARLOV_MALMO_L",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'line',
				// startVisible : false,
				// copyright : [],
				// style: {}
			// },
			
			{
				displayName : 'Malmö godsbangård',
				name: "ri_jvg_godsbangard",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_malmo_godsbangard.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_JARNVAG_GODSBANGARD_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 162,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_godsbangard_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_godsbangard.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#8B4513",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Tågstationer',
				name: "ri_jvg_befstation",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_tagstationer.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_JARNVAG_BEFSTATION_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 362,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_tagstation_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_tagstation.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	graphicWidth: 60,
										graphicHeigth: 60,
										externalGraphic: 'http://xyz.malmo.se/images/tagstation.png'
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

			// {
				// displayName : 'Planerade stationer*',
				// name: "ri_jvg_planerad_station",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op2012/text/till_anv_test/RI_yrkesfiske.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_RI_JARNVAG_PLANSTATION_PT",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'point',
				// startVisible : false,
				// copyright : [],
				// style: {}
			// },
			
			{
				displayName : 'Arlöv-Malmö C-Lockarp/Lernacken',
				name: "ri_jvg_bangard_arlov",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_arlov_malmo.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					//layers: "malmows:OP_RI_JARNVAG_BANGARD_ARLOV_GEOCOLL",								//Geometrycollection, hittar inte objekt
					//layers: "malmo_op_ri_jvg_arlov_o_bangard",   											//Grupplager, hittar inte objekt
					//layers: "malmows:OP_RI_JARNVAG_DISSOLVE_ARLOV_O_BANGARD_P_TRANSPARENT",				//Dissolve ytlager OK
					layers: "malmows:OP_RI_JARNVAG_BANGARD_P,malmows:OP_RI_JARNVAGAR_ARLOV_MALMO_L",		//Två separata lager, , hittar inte objekt
					
					//layers: "malmows:OP_RI_JARNVAG_DISSOLVE_ARLOV_O_BANGARD_P_TRANSPARENT,malmows:OP_RI_JARNVAG_BANGARD_P,malmows:OP_RI_JARNVAGAR_ARLOV_MALMO_L",		//Separata lager + Dissolve ytlager (ska vara osynligt)

					//layers: "malmo_op_ri_jvg_arlov_o_bangard,malmows:OP_RI_JARNVAG_DISSOLVE_ARLOV_O_BANGARD_P_TRANSPARENT",   											//Grupplager, hittar inte objekt
				// Sista alternativet är bäst, kan man sätta så blixten använder första eller sista lagret? Ännu bättre att kombinera grupplager och dissolve med denna metod
				// problem med teckenförklaring
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 262,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_arlov_malmo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_arlov_malmo.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "namn",
						        		value: "ri_jarnvag_bangard_p"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#A0522D",
										fillOpacity: 0.5,
							        	strokeColor: "#00FFFF",
										strokeWidth: 4
							        }
								 }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "namn",
						        		value: "ri_jarnvagar_arlov_malmo_l"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#A0522D",
							        	strokeWidth: 6
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
				displayName : 'Godsstråket genom Skåne',
				name: "ri_jvg_godsstraket_skane",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_godsstraket.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_JARNVAGAR_GODSSTRAKET_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 262,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'line',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										strokeColor: "#8B4513",
										strokeOpacity: "0.85",
							        	strokeWidth: 4
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
				displayName : 'Svågertorp-Ystad',
				name: "ri_jvg_svagertap_ystad",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_svagertorp_ystad.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_JARNVAGAR_SVAGERTORP_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 262,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'line',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										strokeColor: "#8B4513",
										strokeOpacity: "0.85",
							        	strokeWidth: 4
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
				displayName : 'Östervärn-Brågarp',
				name: "ri_jvg_ostervarn_bragarp",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_ostervarn_bragarp.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_JARNVAGAR_OSTERVARN_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 262,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'line',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										strokeColor: "#8B4513",
										strokeOpacity: "0.85",
							        	strokeWidth: 4
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
				displayName : 'Europabanan (framtida)',
				name: "ri_jvg_framtida_europabanan",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_europabanan.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_JARNVAG_FRAMTIDA_EUROPABANAN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 162,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_europabanan_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_europabanan.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#A900E6",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
			
			// {
				// displayName : 'Tomelillabanan (framtida)*',
				// name: "ri_jvg_farmtida_tomelillabanan",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op2012/text/till_anv_test/RI_yrkesfiske.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_RI_JARNVAG_FRAMTIDA_TOMELILLA_P",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {}
			// },

			{
				displayName : 'Farled 18 Anholt-Svartgrund',
				name: "ri_farled_18",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/farled_farled18.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Farled"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_FARLED_18_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 156,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#00BFFF",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Farled 202 Flintrännan',
				name: "ri_farled_202",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/farled_farled202.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Farled"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_FARLED_202_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 156,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#00BFFF",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Farled 231 Malmö redd-Oljehamnen',
				name: "ri_farled_231",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/farled_farled231.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Farled"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_FARLED_231_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 156,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#00BFFF",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Farled 232 Malmö redd-Frihamnen',
				name: "ri_farled_232",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/farled_farled232.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Farled"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_FARLED_232_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 156,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#00BFFF",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Malmö hamn',
				name: "ri_hamn_hamn_concat",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_HAMN_MALMO_P,malmows:OP_RI_HAMN_JVG_L_AUG2013,malmows:OP_RI_HAMN_JVG_TILLK_L_AUG2013,malmows:OP_RI_HAMN_VAG_BEF_L_AUG2013,malmows:OP_RI_HAMN_VAG_TILLK_L_AUG2013",
					//layers: "malmows:OP_RI_HAMN_MALMO_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 259,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/bilder/Legend_mini_hamn_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/bilder/Legend_mini_hamn.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "ri_hamn_malmo_p"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#8B4513",
										fillOpacity: 0.5,
							        	strokeColor: "#00FFFF",
										strokeOpacity: 1.0,
							        	strokeWidth: 4
							        }
								 }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "ri_hamn_jvg_l"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#A0522D",
							        	strokeWidth: 6
									 }	
								}),
						       	new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "ri_hamn_jvg_tillk_l"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#A0522D",
										strokeDashstyle: "dash",
							        	strokeWidth: 6
									}
						        }),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "ri_hamn_vag_bef_l"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#FF0000",
										strokeWidth: 6
									}
								}),
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO,
						        		property: "typ",
						        		value: "ri_hamn_vag_tillk_l"
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#FF0000",
										strokeDashstyle: "dash",
										strokeWidth: 6
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
			
			// {
				// displayName : 'Järnväg ',
				// name: "ri_hamn_jvg",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_RI_HAMN_JVG_L",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {}
			// },			

			// {
				// displayName : 'Järnväg, framtida',
				// name: "ri_hamn_jvg_framtida",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_RI_HAMN_JVG_TILLK_L",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {}
			// },					
			
			
			// {
				// displayName : 'Väg, befintlig',
				// name: "ri_hamn_vag",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_RI_HAMN_VAG_BEF_L",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {}
			// },		

			// {
				// displayName : 'Väg, framtida',
				// name: "ri_hamn_vag_framtida",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_RI_HAMN_VAG_TILLK_L",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {}
			// },		


			
			// {
				// displayName : 'Hamn ',
				// name: "ri_hamn_hamn",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_RI_HAMN_MALMO_P",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {}
			// },		

			{
				displayName : 'Havsområde 47 Höllviken djup < 3 meter',
				name: "ri_yrkesfisket_hollviken",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/yrkesfisket_havsomr_hollviken.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Yrkesfisket"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_YRKESFISKE_HOLLVIKEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 153,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#0000CD",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Havsområde 48 Lillgrund',
				name: "ri_yrkesfisket_lillgrund",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/yrkesfisket_havsomr_lillgrund.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Yrkesfisket"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_YRKESFISKE_LILLGRUND_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 153,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#0000CD",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Havsområde 49 Utposten, Kroken',
				name: "ri_yrkesfisket_utposten_kroken",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/yrkesfisket_havsomr_utposten_kroken.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Yrkesfisket"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_YRKESFISKE_UTPOSTEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 153,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#0000CD",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Limhamns fiskehamn',
				name: "ri_yrkesfisket_limhamn_fiskehamn",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/yrkesfisket_limhamns_fiskehamn.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Yrkesfisket"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_YRKESFISKE_LIMHAMN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 153,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#0000CD",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'M 1 Kvarnby',
				name: "ri_vardefulla_amnen",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vardefulla_amnen/html/vardefulla_amnen_kvarnby.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Värdefulla ämnen och material"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_VARDEFULLA_AMNEN_VARDEFULLA_AMNEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 141,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vardefulla_amnen/html/bilder/Legend_mini_vardefull_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/vardefulla_amnen/html/bilder/Legend_mini_vardefull.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#9400D3",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Malmö övningsfält',
				name: "ri_forsvaret",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/forsvaret/html/forsvaret_malmo_ovningsfalt.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Försvar - samrådsområde"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_RI_FORSVARET_FORSVARET_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 138,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/forsvaret/html/bilder/Legend_mini_forsvar_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/3_riksintressen/forsvaret/html/bilder/Legend_mini_forsvar.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        		
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
										fillColor: "#8B4513",
										fillOpacity: 0.5,
										strokeColor: "#00FFFF",
							        	strokeWidth: 4
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
				displayName : 'Detaljplaner',
				name: "ul_bestammelser_detaljplaner",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/detaljplaner/html/detaljplaner.htm",
				category : ["UNDERLAG","Detaljplaner, fastigheter med mera"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:SMA_PLANOMR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${plan}  ${plan2}  ${plan3}</div>",
				blixtable : false,
				selectable: true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/detaljplaner/html/bilder/legend_dp_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/detaljplaner/html/bilder/legend_dp_liten.png"}
				}
			},

			// {
				// displayName : 'Områdesbestämmelse',
				// name: "ul_bestammelser_omradesbestammelser",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op2012_pagang.htm",
				// category : ["UNDERLAG","Detaljplaner, fastigheter med mera"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:PAGANG",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// opacity: "0.85",
					// ratio: 1,
					// transitionEffect: 'resize',					
					// zIndex: 199,
					// singleTile : true					
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : false, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {
					// "default": {externalGraphic: "img/legend/malmo_op_vit.png"}
				// }
			// },			
			
			{
				displayName : 'Sammanhållen bebyggelse',
				name: "ul_bestammelser_sammanhallen_bebyggelse",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/sammanhallen_bebyggelse/html/sammanhallen_bebyggelse.htm",
				category : ["UNDERLAG","Detaljplaner, fastigheter med mera"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_BESTAMMELSER_SAMMANHALLEN_BEBYGGELSE_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/sammanhallen_bebyggelse/html/bilder/legend_sammanhallenbebyg_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/sammanhallen_bebyggelse/html/bilder/legend_sammanhallenbebyg_liten.png"}
				}
			},						

			// {
				// displayName : 'Landskapsbildsskydd',
				// name: "ul_bestammelser_landskapsbildsskydd",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op2012_pagang.htm",
				// category : ["UNDERLAG","Detaljplaner, fastigheter med mera"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:PAGANG",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// opacity: "0.85",
					// ratio: 1,
					// transitionEffect: 'resize',					
					// zIndex: 199,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : false, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {
					// "default": {externalGraphic: "img/legend/malmo_op_vit.png"}
				// }
			// },			
			
			{
				displayName : 'Fastigheter',
				name: "ul_ovr_ul_fastigheter",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fastigheter/html/fastigheter.htm",
				category : ["UNDERLAG","Detaljplaner, fastigheter med mera"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:SMA_TRAKT_P,malmows:SMA_FASTYTA_3D_P,malmows:SMA_SUM_FASTYTA_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
				hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fastigheter/html/bilder/legend_fastighet_text.png"
					}
				},	

				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fastigheter/html/bilder/legend_fastighet_liten.png"}
				}
			},
			{
				displayName : 'Markinnehav',
				name: "SMA_SUM_FASTYTA_MARKINNEHAV_P",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/markinnehav/html/markinnehav.htm",
				category : ["UNDERLAG","Detaljplaner, fastigheter med mera"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:SMA_SUM_FASTYTA_MARKINNEHAV_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.55",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/markinnehav/html/bilder/legend_markinnehav_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/markinnehav/html/bilder/legend_markinnehav_liten.png"}
				}
			},
			{
				displayName : 'Tidigare ÖP',
				name: "oversiktsplan_2005",
				dialogContent: "http://xyz.malmo.se/metadata/metadata.aspx?id=oversiktsplan_2005",
				category : ["UNDERLAG","Detaljplaner, fastigheter med mera"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "op2005",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					//maxExtent: new OpenLayers.Bounds(100000,6148850,139000,6173450),
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 55,
					isBaseLayer : false,
					opacity: "0.7",
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
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Gallande_OP/html/bilder/legend_op2000_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Gallande_OP/html/bilder/legend_op2000_liten.png"}
				}
			},
			
			
					
			
			{
				displayName : 'Naturvårdsplan',
				name: "ul_natur_naturvardsplan",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/naturvardsplan/html/naturvardsplan.htm",
				category : ["UNDERLAG","Natur, rekreation med mera"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_BESTAMMELSER_VARDEFULLA_NATUROMRADEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/naturvardsplan/html/bilder/legend_naturvardsplan_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/naturvardsplan/html/bilder/legend_naturvardsplan_liten.png"}
				}
			},						

			{
				displayName : 'Naturreservat',
				name: "ul_natur_naturreservat",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/naturreservat/html/naturreservat.htm",
				category : ["UNDERLAG","Natur, rekreation med mera"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_NATUR_NATURRESERVAT_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/naturreservat/html/bilder/legend_naturres_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/naturreservat/html/bilder/legend_naturres_liten.png"}
				}
			},								

			{
				displayName : 'Existerande torg och små parker',
				name: "ul_ovr_ul_exist_parker_torg",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/parker_torg_under_5ha/html/parker_torg_under_5ha.htm",
				category : ["UNDERLAG","Natur, rekreation med mera"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_OVR_UL_EXIST_SMA_PARKER_TORG_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/parker_torg_under_5ha/html/bilder/legend_parker_text.png"
					}
				},	

				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/parker_torg_under_5ha/html/bilder/legend_parker_liten.png"}
				}
			},	
			{
				displayName : 'Bristområden för park och natur',
				name: "malmo_op_ul_natur_bristomraden_park_p",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/bristomraden_park/html/bristomraden_park.htm",
				category : ["UNDERLAG","Natur, rekreation med mera"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_NATUR_BRISTOMRADEN_PARK_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/bristomraden_park/html/bilder/legend_brist_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/bristomraden_park/html/bilder/legend_brist_liten.png"}
				}
			},		
			
			{
				displayName : 'Ramsarområden',
				name: "ul_natur_ramsas_omraden",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/Ramsar_omraden/html/Ramsar_omraden.htm",
				category : ["UNDERLAG","Natur, rekreation med mera"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_NATUR_RAMSAR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/Ramsar_omraden/html/bilder/legend_ramsar_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/natur/Ramsar_omraden/html/bilder/legend_ramsar_liten.png"}
				}
			},								
			{
				displayName : 'Geologiska förhållanden',
				name: "op_ul_geologiska_forhallanden",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/geologiska_forhallanden/html/geologiska_forhallanden.htm",
				category : ["UNDERLAG","Natur, rekreation med mera"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_op2012_jordarter",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					//maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					maxExtent: new OpenLayers.Bounds(100000,6148850,139000,6173450),
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 55,
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
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/geologiska_forhallanden/html/bilder/legend_geologi_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/geologiska_forhallanden/html/bilder/legend_geologi_liten.png"}
				}
			},
			{
				displayName : 'Fornminnen',
				name: "ul_ovr_ul_fornminnen",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fornminnen/html/fornminnen.htm",
				category : ["UNDERLAG","Natur, rekreation med mera"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_OVR_UL_FORNMINNEN_P_AUG2013,malmows:OP_UL_OVR_UL_FORNMINNEN_PT_NOV2012",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fornminnen/html/bilder/legend_fornminnen_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fornminnen/html/bilder/legend_fornminnen_liten.png"}
				}
			},	

			{
				displayName : 'Busslinjer',
				name: "ul_ovr_ul_busslinjer",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Busslinjer/html/busslinjer.htm",
				category : ["UNDERLAG","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_OVR_UL_BUSSLINJER_L_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 250,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Busslinjer/html/bilder/legend_busslinjer_text.png"
					}
				},	

				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Busslinjer/html/bilder/legend_busslinjer_liten.png"}
				}
			},
{
				displayName : 'Gång- och cykelvägar',
				name: "ul_ovr_ul_gangochcykelvagar",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/GC_vagar/html/GC_vagar.htm",
				category : ["UNDERLAG","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:GK_CYKELVAG_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/GC_vagar/html/bilder/legend_gc_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/GC_vagar/html/bilder/legend_gc_liten.png"}
				}
			},	
{
				displayName : 'Miljözon för tung trafik',
				name: "ul_risk_miljozon_tung_trafik",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Miljozon_tung_trafik/html/miljozon.htm",
				category : ["UNDERLAG","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_RISK_MILJOZON_TUNG_TRAFIK_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Miljozon_tung_trafik/html/bilder/legend_miljozon_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Miljozon_tung_trafik/html/bilder/legend_miljozon_liten.png"}
				}
			},				
			{
				displayName : 'Uppmärksamhetsområden för farlig verksamhet',
				name: "ul_ovr_ul_uppmarksamhetsomr_farlig_verksamhet",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/uppmarksamhetsomr_farlig_verksamhet/html/uppmarksamhet_farlig_verksamhet.htm",
				category : ["UNDERLAG","Miljö, risk och säkerhet"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_RISK_UPPMARKSAMHETSOMR_FARLIG_VERKSAMHET_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/uppmarksamhetsomr_farlig_verksamhet/html/bilder/legend_farligverks_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/uppmarksamhetsomr_farlig_verksamhet/html/bilder/legend_farligverks_liten.png"}
				}
			},
			{
				displayName : 'Skyddsområde för grundvattentäkt',
				name: "ul_bestammelser_skyddsomrade_grundvattentakt",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/skyddsomrade_grundvattentakt/html/skyddsomrade_grundvattentakt.htm",
				category : ["UNDERLAG","Miljö, risk och säkerhet"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_VA_SKYDDSOMRADE_GRUNDVATTENTAKT_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true				
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/skyddsomrade_grundvattentakt/html/bilder/legend_grundvatten_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/skyddsomrade_grundvattentakt/html/bilder/legend_grundvatten_liten.png"}
				}
			},		
			{
				displayName : 'Buller - tåg',
				name: "op_ul_natur_tagbuller",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/tag_buller.htm",
				category : ["UNDERLAG","Miljö, risk och säkerhet"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_op2012_tagbuller2012",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
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
				displayName : 'Buller - väg',
				name: "op_ul_natur_vagbuller",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/vag_buller.htm",
				category : ["UNDERLAG","Miljö, risk och säkerhet"],
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
				displayName : 'Troligt förorenad mark',
				name: "ul_risk_markfororeningar",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/fororenad_mark_mifo/html/fororenad_mark_mifo.htm",
				category : ["UNDERLAG","Miljö, risk och säkerhet"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_RISK_FORORENAD_MARK_MIFO_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/fororenad_mark_mifo/html/bilder/legend_mifo_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/fororenad_mark_mifo/html/bilder/legend_mifo_liten.png"}
				}
			},				

			
			{
				displayName : 'Bekräftat förorenad mark',
				name: "ul_risk_markfororeningar_bekraftade",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/bekraftat_fororenad_mark/html/bekraftat_fororenad_mark.htm",
				category : ["UNDERLAG","Miljö, risk och säkerhet"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_RISK_BEKRAFTAT_FORORENAD_MARK_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/bekraftat_fororenad_mark/html/bilder/legend_bekraftat_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/bekraftat_fororenad_mark/html/bilder/legend_bekraftat_liten.png"}
				}
			},				
			
			
			{
				displayName : 'Luftföroreningar',
				name: "op_ul_natur_luftfororening",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/luftfororening/html/luftfororening.html",
				category : ["UNDERLAG","Miljö, risk och säkerhet"],
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
			
			
			


			//{
			//	displayName : 'Räddningstjänstens insatstid',
			//	name: "ul_risk_raddningstjanst",
			//	layerType : "wms",
			//	dialogContent: "http://xyz.malmo.se/op2012_pagang.htm",
			//	category : ["UNDERLAG","Miljö, risk och säkerhet"],
			//	displayInLayerSwitcher: true,
			//	URL: "http://xyz.malmo.se/geoserver/wms?",
			//	params : {
			//		layers: "malmows:PAGANG",
			//		format: "image/png",
			//		transparent: "true"
			//	}, 
			//	options : {
			//		isBaseLayer: false,
			//		opacity: "0.85",
			//		ratio: 1,
			//		transitionEffect: 'resize',					
			//		zIndex: 199,
			//		singleTile : true
			//	},
			//	popup :
			//		"<div class='popup-header1'>Info</div>" +
			//		"<div class='popup-text1'>${objectid}</div>",
			//	blixtable : false, getFeatureInfo: {geometryName: "geom"},
			//	geomType : 'polygon',
			//	startVisible : false,
			//	copyright : [],
			//	style: {
			//		"default": {externalGraphic: "img/legend/malmo_op_vit.png"}
			//	}
			//},			

			
			
			
				
			
			// {
				// displayName : 'Vattenledningar större än 355 mm',
				// name: "ul_va_vattenledningar_storre",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/vattenledningar_355mm/html/Vattenledningar.htm",
				// category : ["UNDERLAG","Teknisk försörjning, VA"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_UL_VA_VATTENLEDNINGAR_355MM_L",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// opacity: "0.85",
					// ratio: 1,
					// transitionEffect: 'resize',					
					// zIndex: 199,
					// singleTile : true					
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : false, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {
				//	"default": {externalGraphic: "img/legend/malmo_op_vit.png"}
				// }
			// },			

			// {
				// displayName : 'Avloppsledningar 600-900 mm',
				// name: "ul_va_avloppsledningar_600_900",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avloppsledningar_600_900mm/html/avloppsledningar_600_900mm.htm",
				// category : ["UNDERLAG","Teknisk försörjning, VA"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_UL_VA_AVLOPPSLEDNINGAR_600_900MM_L",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// opacity: "0.85",
					// ratio: 1,
					// transitionEffect: 'resize',					
					// zIndex: 199,
					// singleTile : true					
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : false, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {
				//	"default": {externalGraphic: "img/legend/malmo_op_vit.png"}
				// }
			// },			

			// {
				// displayName : 'Trycksatta avloppsledningar',
				// name: "ul_va_trycksatta_avloppsledningar",
				// layerType : "wms",
				// dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/trycksatta avloppsledningar/html/Trycksatta_huvudavloppsledningar.htm",
				// category : ["UNDERLAG","Teknisk försörjning, VA"],
				// displayInLayerSwitcher: true,
				// URL: "http://xyz.malmo.se/geoserver/wms?",
				// params : {
					// layers: "malmows:OP_UL_VA_TRYCKSATTA_AVLOPPSLEDNINGAR_L",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// opacity: "0.85",
					// ratio: 1,
					// transitionEffect: 'resize',					
					// zIndex: 199,
					// singleTile : true					
				// },
				// popup :
					// "<div class='popup-header1'>Info</div>" +
					// "<div class='popup-text1'>${objectid}</div>",
				// blixtable : false, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'polygon',
				// startVisible : false,
				// copyright : [],
				// style: {
				//	"default": {externalGraphic: "img/legend/malmo_op_vit.png"}
				// }
			// },			
			
			{
				displayName : 'Gasledning',
				name: "ul_bestammelser_gasledning",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/gasledning/html/gasledning.htm",
				category : ["UNDERLAG","Teknisk försörjning, VA"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_BESTAMMELSER_GASLEDNING_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/gasledning/html/bilder/legend_gasledn_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/gasledning/html/bilder/legend_gasledn_liten.png"}
				}
			},			

			{
				displayName : 'Kraftledningar',
				name: "ul_bestammelser_kraftledningar",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/kraftledningar/html/kraftledningar.htm",
				category : ["UNDERLAG","Teknisk försörjning, VA"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_BESTAMMELSER_KRAFTLEDNING_L_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 299,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/kraftledningar/html/bilder/legend_kraftledn_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/bestammelser/kraftledningar/html/bilder/legend_kraftledn_liten.png"}
				}
			},			
			
			{
				displayName : 'Fjärrvärmeledningar',
				name: "ul_ovr_ul_fjarrvarmeledningar",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fjarrvarme/html/fjarrvarme.htm",
				category : ["UNDERLAG","Teknisk försörjning, VA"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_OVR_UL_FJARRVARMELEDN_L_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fjarrvarme/html/bilder/legend_fjarrvarme_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fjarrvarme/html/bilder/legend_fjarrvarme_liten.png"}
				}
			},
			
			{
				displayName : 'Avloppssystem',
				name: "ul_ovr_ul_avloppssystem",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avloppssystem/html/avloppssystem.htm",
				category : ["UNDERLAG","Teknisk försörjning, VA"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_VA_AVLOPPSSYSTEM_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avloppssystem/html/bilder/legend_avloppssystem_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avloppssystem/html/bilder/legend_avloppssystem_liten.png"}
				}
			},			
			
			{
				displayName : 'Avrinningsområden',
				name: "ul_va_avrinningsomraden",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avrinningsomraden/html/dikningsföretag.htm",
				category : ["UNDERLAG","Teknisk försörjning, VA"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_VA_AVRINNING_P_NOV2012",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avrinningsomraden/html/bilder/legend_avrinning_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avrinningsomraden/html/bilder/legend_avrinning_liten.png"}
				}
			},			

			{
				displayName : 'Dikningsföretag',
				name: "ul_va_dikningsforetag",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/Dikningsforetag_med_batnadsomraden/html/dikningsföretag.htm",
				category : ["UNDERLAG","Teknisk försörjning, VA"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_VA_DIKNING_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 199,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],				
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/Dikningsforetag_med_batnadsomraden/html/bilder/legend_dikning_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/Dikningsforetag_med_batnadsomraden/html/bilder/legend_dikning_liten.png"}
				}
			},						

			{
				displayName : 'Återvinningsstationer',
				name: "ul_va_atervinningsstationer",
				layerType : "wms",
				dialogContent: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/atervinningsstationer/html/atervinningsstationer.htm",
				category : ["UNDERLAG","Teknisk försörjning, VA"],
				displayInLayerSwitcher: true,
				URL: "http://xyz.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_VA_ATERVINNINGSSTATIONER_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					ratio: 1,
					transitionEffect: 'resize',					
					zIndex: 399,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Info</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/atervinningsstationer/html/bilder/legend_atervinning_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://xyz.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/atervinningsstationer/html/bilder/legend_atervinning_liten.png"}
				}
			}
		],
		
		baselayers : [
			/*{
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
			}*/

			{
				displayName : "Stadskarta s/v",
				name : "karta_sv",  // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				//layer : "malmo_karta_sv",
				layer : "malmo_karta_sv",
				//layer : "malmo_op2012_omnejd_sv",
				//layer : "malmo_op2013_sv_maj2013",
				layerType : "tilecache",
				category : "Karta",
				options : {
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
				displayName : "Stadskarta",
				name : "karta",  // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				//layer : "malmo_karta",
				layer : "malmo_karta",
				layerType : "tilecache",
				category : "Karta",
				options : { 
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					//maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),	
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
				displayName : "Häradskartan&nbsp;1912",
				name : "malmokarta1912",
				URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				layer : "malmo_karta_1912",
				layerType : "tilecache",
				category : "Karta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
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
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
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
				displayName : "Fotokarta 2012",
				name : "orto_2012",  /* ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto  */
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_2012",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},

			{
				displayName : "Fotokarta 2011",
				name : "orto_2011",  /* ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto  */
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_2011",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},

			
			{
				displayName : "Fotokarta 2010",
				name : "orto2010",  /* ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto  */
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_2010",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},
			
			{
				displayName : "Fotokarta 2007",
				name : "orto2007",
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_2007",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},
			
			{
				displayName : "Fotokarta 1938-47",
				name : "orto1940",
				URL : document.location.protocol + '//xyz.malmo.se/data_e/tilecache/malmo/',
				layer : "malmo_ortofoto_1940",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [27.781305, 13.229193, 5.291677, 2.645839], // EPSG:3008
					maxExtent: new OpenLayers.Bounds(104853,6150876,131653,6171076),	
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 50,
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				copyright : [ "Malmö stadsbyggnadskontor", "http://www.malmo.se" ]
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
				side: "right",
				title: "Antagen av kommunfullmäktige 2014-05-22",
				titleCss: {
					"right": "100px"
				}
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
				multiple: false
//				selectedEvent: "blixtenfeaturesfound"
			}
		},
		{
			init : sMap.Module.ScaleSelector,
			config : {
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
			init : sMap.Module.Search,
			config : {
				toolbarIndex : 0,
				dropDownOption: false,
				autoCompleteScriptUrl : "http://xyz.malmo.se/myproxy/proxy.py?url=" + "http://xyz.malmo.se/WS/mKarta/autocomplete.ashx?",
				searchScriptUrl : "http://xyz.malmo.se/WS/mKarta/sokexakt.ashx"
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
			init : sMap.Module.MeasureDialog,
			config : {
				toolbarIndex : 1
			}
		},
		{
			init : sMap.Module.CopyLink,
			config : {
				toolbarIndex: 1,
				shortenOption: null
			}
		},
		/*{
			init : sMap.Module.Login,
			config : {}
		},*/
//		{
//			init : sMap.Module.Opacity,
//			config : {
//				toolbarIndex: 4
//			}
//		},
		{
			init : sMap.Module.Pizza,
			config : {}
		},
		{
			init : sMap.Module.SPrint,
			config : {
				toolbarIndex: 1,
				addToToolsMenu: false
			}
		},
//		{
//			init : sMap.Module.Report,
//			config : {
//				toolbarIndex: 1,
//				addToToolsMenu: false
//			}
//		},
		
		/*{
			init : sMap.Module.OverlaySwitcher.SimpleSwitcher,
			config : {}
		},*/
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
		},
		// {
			// init : sMap.Module.ToolsMenu,
			// config : {
				// toolbarIndex : 3,
				// menuBtns : [ 
		             // {
		            	 // menuId : "toolsmenu-print",
		            	 // lblText : "Skriv ut",
		            	 // toolBarIndex : 2
		             // }]
			// }
		// },
		{
			init : sMap.Module.LayerTree,
			config : {
				showFadedLinks: false,
				addPrintButton: false,
				addPrintLegendButton: false,
				lbButtonToToolsMenu: false,
				lbToolbarIndex: 1,
				showFadedCheckboxes: false,
				showCheckboxAfterTextIcon: false,
				enableTooltip: true,
				folderIcon: null, //"img/folder_page.gif",
				width: 400,
				right: true,
				categories: planApp.categories
			}
		}		
		,
		{
			init: sMap.Module.IntroDialog,
			config: {
				dialogBGColor: "#fff",
				dialogOptions: {
					title: "Välkommen till Malmös översiktsplan.",
					width: 650,
					height: 550
				},
				contentHtml: 
					"<p><b><i>Antagen av kommunfullmäktige 2014-05-22</i></b></p>" +
					"<p>I detta kartverktyg redovisas översiktsplanens kartor med planeringsriktlinjer och ställningstaganden för riksintressen.</p>" +
					"<p>Därtill finns underlagskartor som planeringsförutsättningar. De ingår inte formellt i översiktsplanen utan kan uppdateras successivt och fler kan tillkomma.</p>" +
					"<p>Till översiktsplanen hör också två skrifter: <a target='_blank' href='http://xyz.malmo.se/op_data_aug_2013/1_planstrategi/planstrategi_karta/html/OP2012_planstrategi_antagen_140522.pdf'>Planstrategi</a> och <a target='_blank' href='http://www.malmo.se/download/18.5bb0a05f145db1bc43d6ac6/1401438610253/OP2012_MKB_antagen_140522.pdf'>Miljökonsekvensbeskrivning.</a></p>" +
					"<p>Vi hoppas att du med denna introduktion snabbt kan lära känna funktionerna i applikationen för att få åtkomst till all information: </p>" +
					"<p><b>Tända/släcka lager:</b><br>Klicka på någon av trianglarna i menyn till höger för att öppna underkategorier. Klicka sedan i kryssboxen för det kartlager du vill se. Det går bra att tända flera lager ovanpå varandra. Kartan blir dock mer och mer svårläst ju fler lager som tänds, särskilt i ”utzoomat” läge.</p>" +					
					"<p><b>Läs planeringriktlinjer:</b><br>Klicka på dokument/text-ikonen i menyn för att öppna ett ”pop-up”-fönster med planeringsriktlinjer för det valda lagret.</p>" +
					"<p><b>Sök i kartan:</b><br>Genom verktyget ”Sök i kartan” kan man få fram all ÖP-information som berör en viss plats (förutom vissa underlag). Det går att ställa in sökområdets storlek med en radie från 100 till 500 meter.</p><br>"
					
					
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

