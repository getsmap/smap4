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
			"ADMINISTRATIV INDELNING": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				color: "#FFFFFF",
				textBox: "",
				tooltip: " ADMINISTRATIV INDELNING <br> &nbsp; > Kvarter <br> &nbsp; > Delområde <br>	&nbsp; > Stadsdel <br> &nbsp; > Stadsområde <br>&nbsp; > Nyckelkodsområde <br> &nbsp; > Adress <br> ",
				subheaders: {
					"Fastighet": {
					hideCheckbox: true
					},
					
					"Kvarter": {
					hideCheckbox: true
					},
							
					"Delområde": {
					hideCheckbox: true
					},
					
					"Stadsdel": {
					hideCheckbox: true
					},

					"Stadsområde": {
					hideCheckbox: true
					},
					
					"Nyckelkodsområde": {
					hideCheckbox: true
					},
					
					"Adress": {
					hideCheckbox: true
					},
					
					"Gemensamhetsanläggning": {
					hideCheckbox: true
					},
							
					"Ledningsrätt": {
					hideCheckbox: true
					},
							
					"Servitut": {
					hideCheckbox: true
					}
				}
			},
			
			"NATUR, REKREATION MED MERA": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				tooltip: " NATUR REKREATION MM <br> &nbsp; > Naturvårdsplan <br> &nbsp; > Naturreservat <br> &nbsp; > Existerande torg och små parker <br> &nbsp; > Bristområden för park och natur <br> &nbsp; > Ramsarområden  <br> &nbsp; > Fornminnen ",
				color: "#FFFFFF"
				//textBox: "antagen av kommunfullmäktiget 30 september 2013",
				//tooltip: " BEFOLKNING <br> &nbsp; > Befolkning (/ha) <br> &nbsp; > Befolkning (/25 ha) ",
			},
			
			
			
			"BEFOLKNING": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				color: "#FFFFFF",
				textBox: "antagen av kommunfullmäktiget 30 september 2013",
				tooltip: " BEFOLKNING <br> &nbsp; > Befolkning (/ha) <br> &nbsp; > Befolkning (/25 ha) ",
				subheaders: {	
					"Befolkning (/ha)": {
					hideCheckbox: true	
					},
					
					"Befolkning (/25 ha)": {
					hideCheckbox: true	
					}
				}
			},
			
			"FASTIGHETSKARTA & PRIMÄRKARTA": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				color: "#FFFFFF",
				textBox: "",
				tooltip: " FASTIGHETSKARTA & PRIMÄRKARTA <br> <i> Fastighetskarta </i> <br> &nbsp; > Fastighet <br> &nbsp; > Gemensamhetsanläggning <br> &nbsp; > Ledningsrätt <br> &nbsp; > Servitut <br>  <i> Primärkarta </i> <br> &nbsp; > Byggnad <br> &nbsp; > Gränspunkt <br> &nbsp; > Väglinje, Strandlinje <br> &nbsp; > Bladindelning Sweref99 13 30 <br>",
				subheaders: {
					"Fastighetskarta": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Fastighetskarta </i> <br> &nbsp; > Fastighet <br> &nbsp; > Gemensamhetsanläggning <br> &nbsp; > Ledningsrätt <br> &nbsp; > Servitut <br>  "
					},
					"Primärkarta": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Primärkarta </i> <br> &nbsp; > Byggnad <br> &nbsp; > Gränspunkt <br> &nbsp; > Väglinje, Strandlinje<br> &nbsp; > Bladindelning 2000 <br> &nbsp; > Bladindelning Sweref99 13 30",
						subheaders: {
							"Byggnad": {
							hideCheckbox: true	
							},						
							"Gränspunkt": {
							hideCheckbox: true
							},							
							"Väglinje": {
							hideCheckbox: true
							},													
							"Bladindelning Sweref99 13 30": {
							hideCheckbox: true
							}							
						}
					}
				}
			},
						
			"MILJÖ, RISK OCH SÄKERHET": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				color: "#FFFFFF",
				//tooltip: " MILJÖ, RISK OCH SÄKERHET <br> &nbsp; > Uppmärksamhetsavstånd kring farliga verksamheter <br> &nbsp; > Skyddsområde för grundvattentäkt <br> &nbsp; > Tågbuller <br> &nbsp; > Vägbuller  <br> &nbsp; > Troligt förorenad mark  <br> &nbsp; > Bekräftat förorenad mark  <br> &nbsp; > Luftföroreningar  <br> &nbsp; > Radon  ",
				textBox: "",
				subheaders: {
					"Tillsynsobjekt": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						//tooltip: " MILJÖ, RISK OCH SÄKERHET <br> &nbsp; > Uppmärksamhetsavstånd kring farliga verksamheter <br> &nbsp; > Skyddsområde för grundvattentäkt <br> &nbsp; > Tågbuller <br> &nbsp; > Vägbuller  <br> &nbsp; > Troligt förorenad mark  <br> &nbsp; > Bekräftat förorenad mark  <br> &nbsp; > Luftföroreningar  <br> &nbsp; > Radon  ",
						textBox: ""
					},
					"Miljöövervakning": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						//tooltip: " MILJÖ, RISK OCH SÄKERHET <br> &nbsp; > Uppmärksamhetsavstånd kring farliga verksamheter <br> &nbsp; > Skyddsområde för grundvattentäkt <br> &nbsp; > Tågbuller <br> &nbsp; > Vägbuller  <br> &nbsp; > Troligt förorenad mark  <br> &nbsp; > Bekräftat förorenad mark  <br> &nbsp; > Luftföroreningar  <br> &nbsp; > Radon  ",
						textBox: ""
					}					
				}
			},	

			
			"NÄRINGSLIV": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				color: "#FFFFFF",
				textBox: "",
				tooltip: " NÄRINGSLIV <br> &nbsp; > Samtlig näringslivsverksamhet <br> &nbsp; > A Jordbruk <br> &nbsp; > B+C Tillverkning <br> &nbsp; > D+E Energi, vatten, avfall m.m <br> &nbsp; > F Byggverksamhet <br> &nbsp; > G Handel & reparation <br> &nbsp; > H Transport & magasinering <br> &nbsp; > I Hotell & restaurang <br> &nbsp; > J Information & kommunikation <br> &nbsp; > K Finans & försäkring <br> &nbsp; > L Fastighetsverksamhet <br> &nbsp; > M Juridik, ekonomi, vetenskap & &nbsp; teknik <br> &nbsp; > N Uthyrning, fastighetsservice, resetjänster m.m <br> &nbsp; > O Offentlig sektor <br> &nbsp; > P Utbildning <br> &nbsp; > Q Vård, omsorg, sociala tjänster <br> &nbsp; > R+S Kultur, fritid & serviceverksamhet",
				subheaders: {	
					"Samtlig näringslivsverksamhet": {
					hideCheckbox: true	
					},
					
					"A Jordbruk": {
					hideCheckbox: true
					},
					
					"B+C Tillverkning": {
					hideCheckbox: true
					},
					
					"D+E Energi, vatten, avfall m.m": {
					hideCheckbox: true	
					},
					
					"F Byggverksamhet": {
					hideCheckbox: true
					},
					
					"G Handel & reparation": {
					hideCheckbox: true
					},
					
					"H Transport & magasinering": {
					hideCheckbox: true	
					},
					
					"I Hotell & restaurang": {
					hideCheckbox: true
					},
					
					"J Information & kommunikation": {
					hideCheckbox: true
					},
					
					"K Finans & försäkring": {
					hideCheckbox: true	
					},
					
					"L Fastighetsverksamhet": {
					hideCheckbox: true
					},
					
					"M Juridik, ekonomi, vetenskap & teknik": {
					hideCheckbox: true
					},
					
					"N Uthyrning, fastighetsservice, resetjänster m.m": {
					hideCheckbox: true
					},
					
					"O Offentlig sektor": {
					hideCheckbox: true
					},
					
					"P Utbildning": {
					hideCheckbox: true	
					},
					
					"Q Vård, omsorg, sociala tjänster": {
					hideCheckbox: true
					},
					
					"R+S Kultur, fritid & serviceverksamhet": {
					hideCheckbox: true
					}
				}
			},
			
			"PLANERA & BYGGA": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				color: "#FFFFFF",
				textBox: "",
				tooltip: " PLANERA & BYGGA <br>  <i> Planera </i> <br> &nbsp; > Fastighetsindelningsbest. <br> &nbsp; > Detaljplan <br> &nbsp; > Bestämmelser från detaljplaner <br> &nbsp; > Pågående detaljplan <br> &nbsp; > Sammanhållen bebyggelse <br> &nbsp; > Översiktsplan 2005 <br> <i> Bygga </i> <br> &nbsp; > Fixpunkt <br> &nbsp; > Polygonpunkt <br> &nbsp; > Exploateringsområde bostad <br> &nbsp; > Exploateringsområde verksamhet <br> &nbsp; > Miljöbyggprogram syd <br> &nbsp; > Nybyggnadskarta <br> <i> Förvalta </i> <br> &nbsp; > Markinnehav <br> &nbsp; > Skötselansvar stadsfastighet <br> &nbsp; > Skötselansvar hamn <br><i> Bostadsbyggnadsregister </i> <br> &nbsp; > Bygglov Bostad 2011- <br> &nbsp; > Bygglov Bostad mellan 2008-2010<br> &nbsp; > Bygglov bostad övrigt 2011- <br> &nbsp; >Bygglov bostad övrigt mellan 2008-2010 <br> &nbsp; > Detaljplan bostad 2011- <br> &nbsp; > Detaljplan bostad mellan 2008-2010 <br> <i> Byinventering </i> <br> &nbsp; > By <br> &nbsp; > Inventering <br> &nbsp; > Landskapskaraktär <br> &nbsp; > Socken <br> ",
				subheaders: {	
					"Bostadsbyggnadsregister": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Bostadsbyggnadsregister </i> <br> &nbsp; > Bygglov Bostad 2011- <br> &nbsp; > Bygglov Bostad mellan 2008-2010 <br> &nbsp; > Bygglov bostad övrigt 2011- <br> &nbsp; > Bygglov bostad övrigt mellan 2008-2010 <br> &nbsp; > Detaljplan bostad 2011- <br> &nbsp; > Detaljplan bostad mellan 2008-2010",
						subheaders: {
							"Bygglov bostad 2011-": {
							hideCheckbox: true
							},
							
							"Bygglov bostad mellan 2008-2010": {
							hideCheckbox: true
							},
							
							"Bygglov bostad övrigt 2011-": {
							hideCheckbox: true	
							},
							
							"Bygglov bostad övrigt mellan 2008-2010": {
							hideCheckbox: true
							},
							
							"Detaljplan bostad 2011-": {
							hideCheckbox: true	
							},
							
							"Detaljplan bostad mellan 2008-2010": {
							hideCheckbox: true
							}
						}
					},
					
					"Bygga": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Bygga </i> <br> &nbsp; > Fixpunkt <br> &nbsp; > Polygonpunkt <br> &nbsp; > Exploateringsområde bostad <br> &nbsp; > Exploateringsområde verksamhet <br> &nbsp; > Miljöbyggprogram syd <br> &nbsp; > Nybyggnadskarta <br> ",
						subheaders: {
							"Exploateringsområde bostad": {
							hideCheckbox: true	
							},
							
							"Exploateringsområde verksamhet": {
							hideCheckbox: true	
							},
							
							"Miljöbyggprogram syd": {
							hideCheckbox: true
							},
							
							"Nybyggnadskarta": {
							hideCheckbox: true
							}
						}
					},
										
					"Byinventering": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Byinventering </i> <br> &nbsp; > By <br> &nbsp; > Inventering <br> &nbsp; > Landskapskaraktär <br> &nbsp; > Socken",
						subheaders: {
							"By": {
							hideCheckbox: true	
							},
							
							"Inventering": {
							hideCheckbox: true
							},
							
							"Landskapskaraktär": {
							hideCheckbox: true
							},
					
							"Socken": {
							hideCheckbox: true
							}
						}
					},
					
					"Förvalta": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Förvalta </i> <br> &nbsp; > Markinnehav <br> &nbsp; > Skötselansvar stadsfastighet <br> &nbsp; > Skötselansvar hamn",
						subheaders: {
							"Markinnehav": {
							hideCheckbox: true
							},
							
							"Skötselansvar stadsfastighet": {
							hideCheckbox: true
							},
							
							"Skötselansvar hamn": {
							hideCheckbox: true
							}
							
						}
					},
					
					"Planera": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Planera </i> <br> &nbsp; > Fastighetsindelningsbest. <br> &nbsp; > Detaljplan <br> &nbsp; > Bestämmelser från detaljplaner <br> &nbsp; > Pågående detaljplan <br> &nbsp; > Sammanhållen bebyggelse <br> &nbsp; > Översiktsplan 2005 ",
						subheaders: {
							"Fastighetsplan": {
							hideCheckbox: true
							},
							
							"Detaljplan": {
							hideCheckbox: true
							},
							
							"Pågående detaljplan": {
							hideCheckbox: true
							},
							
							"Översiktsplan": {
							hideCheckbox: true
							}
						}
					}
				}	
			},
			
			"SKOLA": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				color: "#FFFFFF",
				textBox: "",
				tooltip: "Skola <br> &nbsp; > Förskola <br> &nbsp; > Grundskola <br> &nbsp; > Gymnasieskola <br> &nbsp; > Högskola & universitet <br> &nbsp; > Övrig skola",
				subheaders: {	
					"Förskola": {
					hideCheckbox: true	
					},
					
					"Grundskola": {
					hideCheckbox: true
					},
					
					"Gymnasieskola": {
					hideCheckbox: true
					},
					
					"Högskola & universitet": {
					hideCheckbox: true
					},
					
					"Övrig skola": {
						hideCheckbox: true
					}
				}
			},


			"TEKNISK FÖRSÖRJNING, VA": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				tooltip: " TEKNISK FÖRSÖRJNING, VA <br> &nbsp; > Gasledning <br> &nbsp; > Kraftledningar <br> &nbsp; > Fjärrvärmeledningar <br> &nbsp; > Avloppssystem <br> &nbsp; > Avrinningområden  <br> &nbsp; > Dikningsföretag  <br> &nbsp; > Återvinningsstationer ",
				color: "#FFFFFF"
				//textBox: "antagen av kommunfullmäktiget 30 september 2013",
				//tooltip: " BEFOLKNING <br> &nbsp; > Befolkning (/ha) <br> &nbsp; > Befolkning (/25 ha) ",
			},
			
			
			"TRAFIK": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				color: "#FFFFFF",
				textBox: "",
				tooltip: " TRAFIK <br> &nbsp; > Busstation <br> &nbsp; > Busshållsplats <br> &nbsp; > Busslinjer <br> &nbsp; > Cykelväg <br> &nbsp; > Tågstation <br> &nbsp; > Miljözon för tung trafik ",
				subheaders: {	
					"Busstation": {
					hideCheckbox: true
					},
					
					"Busshållsplats": {
					hideCheckbox: true	
					},
					
					"Cykelväg": {
					hideCheckbox: true
					},
									
					"Tågstation": {
					hideCheckbox: true
					}
				}
			},

"ÖVERSIKTSPLAN FÖR MALMÖ": {
				//url: "http://www.malmo.se/",
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				tooltip: "Enligt plan- och bygglagen (PBL) ska varje kommun ha en aktuell översiktsplan. Översiktsplanen är vägledande vid beslut om användning av mark- och vattenområden och anger hur den existerande stadsmiljön ska utvecklas. Den redovisar en långsiktig inriktning för kommunens utveckling och är inte juridiskt bindande. Översiktsplanen är antagen av kommunfullmäktige 22 maj 2014.",
				expand: false,
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

			
			
			"ARKIV": {
				hideCheckbox: true,
				startVisible : true,
				cssClass: "mainheader",
				color: "#FFFFFF",
				textBox: "",
				tooltip: " ARKIV <br> &nbsp; <i> Bladindelning </i> <br> &nbsp; <i> Fastighet </i> <br> &nbsp; > Fastighet 2010-12-20 <br> &nbsp; > Fastighet 2005-12-13 <br> &nbsp; > Fastighet 2001-10-09 <br> &nbsp; <i> Fotokarta </i> <br> &nbsp; > Fotokarta 2012 <br> &nbsp; > Fotokarta 2011 <br> &nbsp; > Fotokarta 2010 <br> &nbsp;  > Fotokarta 2007 <br> &nbsp; > Fotokarta 2004 <br> &nbsp; > Fotokarta 2001 <br> &nbsp;  > Fotokarta 1998",
				subheaders: {				
					"Bladindelning": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Bladindelning 2000 </i>",
						subheaders: {
							"Bladindelning 2000": {
							hideCheckbox: true
							}
						}
					},
					
					"Karta": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						//tooltip: " <i> Bladindelning 2000 </i>",
						subheaders: {
							"Karta": {
							hideCheckbox: true
							}
						}
					},
					
					"Fastighet": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Fastighet </i> <br> &nbsp; > Fastighet 2010-12-20 <br> &nbsp; > Fastighet 2005-12-13 <br> &nbsp; > Fastighet 2001-10-09",
						subheaders: {
							"Fastighet 2010-12-20": {
							hideCheckbox: true	
							},
													
							"Fastighet 2005-12-13": {
							hideCheckbox: true	
							},
							
							"Fastighet 2001-10-09": {
							hideCheckbox: true	
							}
						}
					},
					
					"Planer": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: ""
						//tooltip: " <i> Fastighet </i> <br> &nbsp; > Fastighet 2010-12-20 <br> &nbsp; > Fastighet 2005-12-13 <br> &nbsp; > Fastighet 2001-10-09",
						
					},

					
					"Fotokarta": {
						hideCheckbox: true,
						startVisible : true,
						cssClass: "subheader",
						color: "#FFFFFF",
						textBox: "",
						tooltip: " <i> Fotokarta </i> <br> &nbsp; > Fotokarta 2012 <br> &nbsp; > Fotokarta 2011 <br> &nbsp; > Fotokarta 2010 <br> &nbsp; > Fotokarta 2007 <br> &nbsp; > Fotokarta 2004 <br> &nbsp; > Fotokarta 2001 <br> &nbsp; > Fotokarta 1998",
						subheaders: {
						"Fotokarta 2012": {
						hideCheckbox: true	
						},
						
						"Fotokarta 2011": {
						hideCheckbox: true	
						},
						
						"Fotokarta 2010": {
						hideCheckbox: true	
						},
						
						"Fotokarta 2007": {
						hideCheckbox: true	
						},
						
						"Fotokarta 2004": {
						hideCheckbox: true	
						},
						
						"Fotokarta 2001": {
						hideCheckbox: true	
						},
						
						"Fotokarta 1998": {
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
	
	jqTheme: "gray-flat",
	// jqTheme: "full-gray",
	//jqTheme: "flashy-gray",
	//jqTheme: "gray-blue",
	//jqTheme: "orange",
	
	version : "4.0.0",
	projection : "EPSG:3008",
	resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], // EPSG:3008
	//resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483], // EPSG:3008
	
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
	
//	proxyHost: "http://kartor.smap.se/cgi-bin/proxy/proxy.py?url=",
//	proxyHost: "http://localhost/cgi-bin/proxy.py?url=",
//	proxyHost : "http://xyz.malmo.se/myproxy/proxy.py?url=",
//	proxyHost : "../../cgi-bin/proxy/proxy.py?url=",
	proxyHost : "http://sbkvmgeoserver.malmo.se/cgi-bin/proxy/proxy.py?url=",

	iFrame : false,
	
	rootURL : document.URL.split("?")[0],
	//defaultWebParams : "defaultParam=5",
	
		layers : {
		
		overlays : [
		
						
			{
				displayName : 'Kvarter',
				name: "sma_sum_kvarter_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/administrativindelning/kvarter.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_sum_kvarter_p",
				category : ["ADMINISTRATIV INDELNING"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${name}"],
				params : {
					sld: "http://161.52.9.230/sld/polygon.xml",
					layers: "malmows:SMA_SUM_KVARTER_P",
					//styles: "polygon",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Kvarter</div>" +
					"<div class='popup-text1'>${name}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/administrativindelning/kvarterhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/administrativindelning/kvarter.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Delområde',
				name: "sma_delomrade_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/administrativindelning/delomraden.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_delomrade_p",
				category : ["ADMINISTRATIV INDELNING"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${delomr}"],
				params : {
					layers: "malmows:SMA_DELOMR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Delområde</div>" +
					"<div class='popup-text1'>${delomr}</div>" +
					"<BR>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>",
					selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/administrativindelning/delomradenhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/Administrativindelning/delomraden.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Stadsdel (gäller tom juni 2013)',
				name: "sma_stadsdel_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/administrativindelning/stadsdelar.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_stadsdel_p",
				category : ["ADMINISTRATIV INDELNING"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${sdfname}"],				
				params : {
					layers: "malmows:SMA_STADSDEL_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Stadsdel</div>" +
					"<div class='popup-text1'>${sdfname}</div>",
					selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/administrativindelning/stadsdelarhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/administrativindelning/stadsdelar.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Stadsområde',
				name: "sma_stadsomrade_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/administrativindelning/stadsdelar.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_stadomraden_p",
				category : ["ADMINISTRATIV INDELNING"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${sdfname}"],				
				params : {
					layers: "malmows:SMA_STADSOMRADEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Stadsområde</div>" +
					"<div class='popup-text1'>${sdf_namn}</div>",
					selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/administrativindelning/stadsdelarhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/administrativindelning/stadsdelar.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Församling',
				name: "sma_forsamling_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/administrativindelning/stadsdelar.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_forsamling_p",
				category : ["ADMINISTRATIV INDELNING"],
				displayInLayerSwitcher: true,
				//URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				URL: "http://kartor.malmo.se/geoserver/wms?",
				selectAttributes: ["${forsamling}"],				
				params : {
					layers: "malmows:SMA_FORSAMLING_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Församling</div>" +
					"<div class='popup-text1'>${forsamling}</div>",
					selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://kartor.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:SMA_FORSAMLING_P&version=1.1.1&format=image/png&rule=6"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/geoserver/wms?request=GetLegendGraphic&layer=malmows:SMA_FORSAMLING_P&version=1.1.1&format=image/png&rule=6"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Nyckelkodsområde',
				name: "sma_nyckelkodsomraden_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/administrativindelning/nyckelkodsomraden.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_nyckelkodsomraden_p",
				category : ["ADMINISTRATIV INDELNING"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${iv_siffr}"],
				params : {
					layers: "malmows:SMA_STATISTIK_IV_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Nyckelkodsområde</div>" +
					"<div class='popup-text1'>${iv_siffr}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/administrativindelning/nyckelkodsomradenhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/administrativindelning/nyckelkodsomraden.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Adress ',
				name: "adresser_administrativindelning",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/administrativindelning/adresser.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=adresser",
				category : ["ADMINISTRATIV INDELNING"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${objektnamn}"],
				params : {
					layers: "malmows:SMA_MALMO_ADRESSREGISTER_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 450,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Adress</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'>${postnr} ${postort}</div><br>" +
					"<div class='popup-text1'>Fastighet: ${fastighet}</div>" +
					"<div class='popup-text1'>Stadsområde: ${stadsomr}</div>" +
					//"<div class='popup-text1'>Stadsdel: ${sdfname}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</div>" +
					"<div class='popup-text1'>Församling: ${forsamling}</div>" +
					"<div class='popup-text1'>Nyckelkodsområde: ${iv_siffr}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
					selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/administrativindelning/adresserhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/administrativindelning/adresser.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	//graphicWidth: 40,
										//graphicHeigth: 40,
										//externalGraphic: 'http://161.52.9.230/bilder/administrativindelning/select.png'
										externalGraphic: 'http://161.52.9.230/bilder/Generell_select/kvadrat_medium_turkos.png'
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
				displayName : 'Befolkning (/ha)',
				name: "sma_befolkning_p100",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/befolkning/befolkning100.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_befolkning_p100",
				category : ["BEFOLKNING"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${sum_km}"],
				params : {
					layers: "malmows:STAT_NATTBEFOLKNING_100M_RUTA_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Befolkning (1 ha) </div>" +
					"<div class='popup-text1'>Antal personer: ${sum_km}</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/befolkning/befolkninghoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/befolkning/befolkning.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Befolkning (/25 ha)',
				name: "sma_befolkning_p500",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/befolkning/befolkning500.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_befolkning_p500",
				category : ["BEFOLKNING"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${sum_km}"],
				params : {
					layers: "malmows:STAT_NATTBEFOLKNING_500M_RUTA_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Befolkning (25 ha)</div>" +
					"<div class='popup-text1'>Antal personer: ${sum_km}</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/befolkning/befolkninghoover500.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/befolkning/befolkning500.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Fastighet',
				name: "sma_sum_fastyta_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/administrativindelning/fastigheter.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_sum_fastyta_p",
				category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Fastighetskarta"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				// report: {
					// IDattribute: "fnr",
					// linkURL: "http://localhost/?layer=fastighet&object="
				// },
				selectAttributes: ["${fastighet}"],
				params : {
					layers: "malmows:SMA_TRAKT_TEXT_P,malmows:SMA_FASTYTA_3D_P,malmows:SMA_SUM_FASTYTA_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 170,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Fastighet</div>" +
					"<div class='popup-text1'>${fastighet}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/verksamhetsatlas/asp/fir_sok.asp?FNR=${fnr}' target='_blank'>Visa information</a></div>" +		
					"<div class='text1'>Visa bygglov flyttad till 'Visa information'</div>" +		
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>",
					selectable : true,
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/administrativindelning/fastigheterhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/administrativindelning/fastigheter.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Fastighet (ej text)',
				name: "sma_sum_fastyta_p_ej_text",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Baskarta/fastigheter.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_sum_fastyta_p",
				category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Fastighetskarta"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${fastighet}"],
				params : {
					layers: "malmows:SMA_FASTYTA_3D_P,malmows:SMA_SUM_FASTYTA_P_EJ_TEXT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 170,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Fastighet</div>" +
					"<div class='popup-text1'>${fastighet}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/verksamhetsatlas/asp/fir_sok.asp?FNR=${fnr}' target='_blank'>Visa information</a></div>" +		
					"<div class='text1'>Visa bygglov flyttad till 'Visa information'</div>" +		
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>",
				selectable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Baskarta/fastigheterhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Baskarta/fastigheter.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Gränspunkt',
				name: "granspunkt",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Baskarta/granspunkt.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=granspunkt",
				category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Fastighetskarta"],
				displayInLayerSwitcher: true,
				selectAttributes: ["${pnamn}"],				
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				report: {
					IDattribute: "pnamn",
					linkURL: "http://sbkspace.malmo.se/select/select.aspx?layer=fixpunkt&object="
				},
				params : {
					layers: "malmows:MATENHETEN_GRANSPUNKTER_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Gränspunkt</div>" +
					"<div class='popup-text1'>${pnamn}</div>" +
					"<br>" +
					"<div class='popup-text1'><a class='popup-text1' href='http://sbkspace.malmo.se/punktDB/stomnat.aspx?pnr=${pnamn}' target='_blank'>Visa punktinformation</a></div>" +
					"<div class='popup-text1'><a class='popup-text1' href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/baskarta/granspunkthoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/baskarta/granspunkt.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'Gemensamhetsanläggning',
				name: "sma_gemensamhetsanlaggningar_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Rattigheter/gemensamhetsanlaggningar.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_gemensamhetsanlaggningar_p",
				category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Fastighetskarta"],
				displayInLayerSwitcher: true,
				selectAttributes: ["${ga_beteckning}"],
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				params : {
					layers: "malmows:SDE_STAT_GA_YTOR_P,malmows:SDE_STAT_GA_LINJER_L,malmows:SDE_STAT_GA_PUNKTER_PT,malmows:SDE_STAT_GA_CONCAT_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Gemensamhetsanläggning</div>" +
					"<div class='popup-text1'>${ga_beteckning}</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/Rattigheter/GAhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/Rattigheter/gemensamhetsanlaggningar.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Ledningsrätt',
				name: "sma_ledningsratt_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Rattigheter/ledningsratt.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_ledningsratt_p",
				category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Fastighetskarta"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${akt_lopnr}"],
				params : {
					layers: "malmows:SDE_STAT_RATTIGHETS_YTOR_LEDNR_P,malmows:SDE_STAT_RATTIGHETS_LINJER_LEDNR_L,malmows:SDE_STAT_RATTIGHETS_PUNKTER_LEDNR_PT,malmows:SDE_STAT_RATTIGHETS_LEDNR_CONCAT_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Ledningsrätt</div>" +
					"<div class='popup-text1'>${akt_lopnr}</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/Rattigheter/ledningsratthoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/Rattigheter/ledningsratt.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Servitut',
				name: "sma_servitut_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Rattigheter/servitut.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_servitut_p",
				category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Fastighetskarta"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${akt_lopnr}"],
				params : {
					layers: "malmows:SDE_STAT_RATTIGHETS_YTOR_SERV_P,malmows:SDE_STAT_RATTIGHETS_LINJER_SERV_L,malmows:SDE_STAT_RATTIGHETS_PUNKTER_SERV_PT,malmows:SDE_STAT_RATTIGHETS_SERV_CONCAT_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Servitut</div>" +
					"<div class='popup-text1'>${akt_lopnr}</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/Rattigheter/servituthoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/Rattigheter/servitut.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	//symbolizer: {}
									symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
							        }
						        })
						]
					}
				}
			},
			
			
			{
				displayName : 'Byggnad',
				name: "sma_bk_byggnader",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Baskarta/byggnader.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_bk_byggnader",
				category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Primärkarta"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${fid}"],
				params : {
					//layers: "malmows:SDE_GEO_BYGGNADSLINJER_FILTRERAD_L,malmows:SDE_GEO_BYGGNADSYTA_FILTRERAD_P,malmows:SDE_GEO_BYGGNADER_KARTOGRAFISK_FILTRERAD_L",
					layers: "malmows:SDE_GEO_BYGGNADSYTA_FILTRERAD_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Byggnad från primärkarta</div>" +
					"<div class='popup-text1'>Area: ${shape_area} kvm</div>",
				selectable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Baskarta/byggnaderhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Baskarta/byggnader.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Väglinje, Strandlinje',
				name: "sma_bk_vag_linjer",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Baskarta/vaglinjer.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_bk_vag_linjer",
				category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Primärkarta"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				params : {
					layers: "malmows:SDE_GEO_VAGLINJER_FILTRERAD_L,malmows:SMA_STRANDLINJE_L, malmows:SMA_MALMO_VAG_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 250,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Väglinje</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				selectable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Baskarta/vaghoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Baskarta/vag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Primärkartan övriga objekt',
				name: "sma_ovriga_primkarta",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=sma_ovriga_primkarta",
				category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Primärkarta"],
				displayInLayerSwitcher: true,
				URL: "http://sbkvmgeoserver.malmo.se/geoserver/malmows/wms?",
				params : {
					layers: "malmows:SDE_GEO_OVRIG_PRIMKARTA_L,malmows:SDE_GEO_TRAD_FILTRERAD_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					//maxExtent: new OpenLayers.Bounds(100000,6150000,135000,6170000),
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 250,
					ratio: 1,
					singleTile : false
				},
				popup :
					"<div class='popup-header1'>Väglinje</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				selectable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://kartor.malmo.se/wwwroot_data/bilder/kartsymboler/pk_ovriga_objekthoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/wwwroot_data/bilder/kartsymboler/pk_ovriga_objekt.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Bladindelning Sweref99 1330',
				name: "sma_arkiv_bladindelning_sr991330",
				layerType : "wms",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_arkiv_bladindelning_sr991330",
				category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Primärkarta"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${name_2000}"],
				params : {
					layers: "malmows:SMA_ARKIV_BLADINDELNING_SR991330_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Bladindelning Sweref99 1330</div>" +
					"<div class='popup-text1'>${name}</div>",					
				selectable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Arkiv/bladindelningsr991330_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Arkiv/bladindelningsr991330.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				// displayName : 'Adress',
				// name: "adresserbaskarta",
				// layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Baskarta/adresser.html",
				// dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=adresser",
				// category : ["FASTIGHETSKARTA & PRIMÄRKARTA","Primärkarta"],
				// displayInLayerSwitcher: true,
				// URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				// selectAttributes: ["${objektnamn}"],
				// params : {
					// layers: "malmows:SMA_MALMO_ADRESSREGISTER_PT",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// opacity: "0.85",
					// zIndex: 450,
					// ratio: 1,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>Adress</div>" +
					// "<div class='popup-text1'>${objektnamn}</div>" +
					// "<div class='popup-text1'>${postnr} ${postort}</div><br>" +
					// "<div class='popup-text1'>Fastighet: ${fastighet}</div>" +
					// "<div class='popup-text1'>Stadsdel: ${sdfname}</div>" +
					// "<div class='popup-text1'>Delområde: ${delomr}</div>" +
					// "<div class='popup-text1'>Församling: ${forsamling}</div>" +
					// "<div class='popup-text1'>Nyckelkodsområde: ${iv_siffr}</div>" +
					// "<br>" +
					// "<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					// "<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				// selectable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'area',
				// startVisible : false,
				// legend : {
					// hover: {
						// url: "http://161.52.9.230/Bilder/baskarta/adresserhoover.png"
					// }
				// },		
				// copyright : [],
				// style: {
					// "default": {externalGraphic: "http://161.52.9.230/Bilder/administrativindelning/adresser.png"},
					// "select": {
						// rules: [
						        // new OpenLayers.Rule({
						        	// filter: new OpenLayers.Filter.Comparison({
						        		// type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	// }),
						        	//if a feature matches the above filter, use this style
						        	// symbolizer: {
								    	// externalGraphic: 'http://161.52.9.230/bilder/Generell_select/kvadrat_medium_turkos.png'
							        // }
						        // }),
						        // new OpenLayers.Rule({
						        	// elseFilter: true,
						           	//if a feature matches the above filter, use this style
						        	// symbolizer: {}
						        // })
						// ]
					// }
				// }
			// },
			
			// {
				// displayName : "Vit bakgrund",
				// name : "malmo_karta_vit_overlay",
				// dialogContent: "http://161.52.9.230/metadata/baskarta/vitbakgrund.html",
				// dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=malmo_karta_vit_overlay",
				// category : ["GEODATA", "Baskarta"],
				// displayInLayerSwitcher: true,
				// URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				// layer : "malmo_karta_verksamhet_vit",
				// layerType : "tilecache",
				// params : {},
				// options : {
					// resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415,0.066146208],
					// maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					// buffer : 0,
					// transitionEffect : null,
					// format : "image/jpg",
					// zIndex: 51,
					// isBaseLayer : false,
					// opacity: "1.0",
					// attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				// },
				// selectable : false,
				// geomType : 'polygon',
				// startVisible : false,
				// legend : {
					// hover: {
						// url: "http://161.52.9.230/bilder/baskarta/vitbakgrundhoover.png"
					// }
				// },		
				// copyright : [],
				// style: {
					// "default": {externalGraphic: "http://161.52.9.230/bilder/baskarta/vitbakgrund.png"}
				// }
			// },						

			{
				displayName : 'Avfall',
				name: "miljoreda_avfall",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "avfall"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_AVFALL_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Avfall</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_AVFALL_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_AVFALL_PT&RULE=0"}
				}
			},
			
			{
				displayName : 'Djur',
				name: "miljoreda_djur",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "djur"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_AVFALL_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Djur</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_DJUR_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_DJUR_PT&RULE=0"}
				}
			},

			{
				displayName : 'Enskilda avlopp',
				name: "miljoreda_enskilda_avlopp",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "enskilda_avlopp"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_ENSKILDA_AVLOPP_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Enskilda avlopp</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_ENSKILDA_AVLOPP_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_ENSKILDA_AVLOPP_PT&RULE=0"}
				}
			},

			{
				displayName : 'Förskolor',
				name: "miljoreda_forskolor",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "forskola"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_FORSKOLA_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Förskolor</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_FORSKOLA_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_FORSKOLA_PT&RULE=0"}
				}
		},

			{
				displayName : 'Hälsa och lokaler',
				name: "miljoreda_halsa_lokaler",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "halsa_lokaler"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_HALSA_LOKALER_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Hälsa och lokaler</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_HALSA_LOKALER_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_HALSA_LOKALER_PT&RULE=0"}
				}
			},			

			{
				displayName : 'Kemikalier',
				name: "miljoreda_kemikalier",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "kemikalier"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_KEMIKALIER_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Kemikalier</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_KEMIKALIER_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_KEMIKALIER_PT&RULE=0"}
				}
			},
			
			{
				displayName : 'Köldmedia',
				name: "miljoreda_koldmedia",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "koldmedia"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: " 	MILJOREDA_KOLDMEDIA_PT ",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Köldmedia</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_KOLDMEDIA_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_KOLDMEDIA_PT&RULE=0"}
				}
			},

			{
				displayName : 'Köldmedia, övrigt',
				name: "miljoreda_koldmedia_ovrigt",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "koldmedia_ovrigt"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_KOLDMEDIA_OVRIGT_PT ",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Köldmedia, övrigt</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_KOLDMEDIA_OVRIGT_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_KOLDMEDIA_OVRIGT_PT&RULE=0"}
				}
			},

			{
				displayName : 'Livsmedel',
				name: "miljoreda_livsmedel",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "livsmedel"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_LIVSMEDEL_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Livsmedel, övrigt</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Typ: ${typ}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_LIVSMEDEL_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_LIVSMEDEL_PT&RULE=0"}
				}
			},

			{
				displayName : 'Lokaler, övrigt',
				name: "miljoreda_lokaler_ovrigt",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "lokaler_ovrigt"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_LOKALER_OVRIGT_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Lokaler, övrigt</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_LOKALER_OVRIGT_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_LOKALER_OVRIGT_PT&RULE=0"}
				}
			},
			

			{
				displayName : 'Läkemedel',
				name: "miljoreda_lakemedel",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "lakemedel"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_LAKEMEDEL_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Läkemedel</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_LAKEMEDEL_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_LAKEMEDEL_PT&RULE=0"}
				}
			},

			{
				displayName : 'Miljöfarlig verksamhet',
				name: "miljoreda_miljofarlig_verksamhet",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "miljofarlig_verksamhet"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_MILJOFARLIG_VERKSAMHET_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Miljöfarlig verksamhet</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_MILJOFARLIG_VERKSAMHET_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_MILJOFARLIG_VERKSAMHET_PT&RULE=0"}
				}
			},

			{
				displayName : 'Miljötillsyn, övrigt',
				name: "miljoreda_miljotillsyn_ovrigt",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "miljotillsyn_ovrigt"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_MILJOTILLSYN_OVRIGT_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Miljötillsyn, övrigt</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_MILJOTILLSYN_OVRIGT_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_MILJOTILLSYN_OVRIGT_PT&RULE=0"}
				}
			},

			{
				displayName : 'Motorford. och infrastrukt.',
				name: "miljoreda_motorfordon_infrastruktur",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "motorfordon_infrastruktur"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_MOTORFORDON_INFRASTRUKTUR_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Motorford. och infrastrukt.</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_MOTORFORDON_INFRASTRUKTUR_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_MOTORFORDON_INFRASTRUKTUR_PT&RULE=0"}
				}
			},
			
			{
				displayName : 'Pcb',
				name: "miljoreda_pcb",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "pcb"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_PCB_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Pcb</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_PCB_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_PCB_PT&RULE=0"}
				}
			},

			{
				displayName : 'Skolor',
				name: "miljoreda_skolor",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "skolor"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_SKOLOR_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Skolor</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_SKOLOR_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_SKOLOR_PT&RULE=0"}
				}
			},

			{
				displayName : 'Vatten och avlopp',
				name: "miljoreda_vatten_avlopp",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "vatten_avlopp"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_VATTEN_AVLOPP_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Vatten och avlopp</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_VATTEN_AVLOPP_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_VATTEN_AVLOPP_PT&RULE=0"}
				}
			},

			{
				displayName : 'Värmepumpar',
				name: "miljoreda_varmepump",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljotillsyn",
				//dialogContent: "http://xyz.malmo.se/metadata/statistikmetadata.aspx?id=bp15&img=http://xyz.malmo.se/arcgisoutput/statistik_befprog_Mapserver/wms/default0.png",
				category : ["MILJÖ, RISK OCH SÄKERHET","Tillsynsobjekt"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "atlas_typ",
				    value: "varmepumpar"
				}),
				params : {
					layers: "malmows:MILJO_MILJOREDA_ALLA_PT",
					styles: "MILJOREDA_VARMEPUMP_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Värmepumpar</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
				hover: {
						url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=80&HEIGHT=30&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_VARMEPUMP_PT&RULE=0"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_VARMEPUMP_PT&RULE=0"}
				}
			},
			
			
			
			{
				displayName : 'Uppmärksamhetsområden för farlig verksamhet',
				name: "ul_ovr_ul_uppmarksamhetsomr_farlig_verksamhet",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/uppmarksamhetsomr_farlig_verksamhet/html/uppmarksamhet_farlig_verksamhet.htm",
				category : ["MILJÖ, RISK OCH SÄKERHET","Miljöövervakning"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/uppmarksamhetsomr_farlig_verksamhet/html/bilder/legend_farligverks_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/uppmarksamhetsomr_farlig_verksamhet/html/bilder/legend_farligverks_liten.png"}
				}
			},
			{
				displayName : 'Skyddsområde för grundvattentäkt',
				name: "ul_bestammelser_skyddsomrade_grundvattentakt",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/skyddsomrade_grundvattentakt/html/skyddsomrade_grundvattentakt.htm",
				category : ["MILJÖ, RISK OCH SÄKERHET","Miljöövervakning"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/skyddsomrade_grundvattentakt/html/bilder/legend_grundvatten_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/skyddsomrade_grundvattentakt/html/bilder/legend_grundvatten_liten.png"}
				}
			},		
			{
				displayName : 'Buller - tåg',
				name: "op_ul_natur_tagbuller",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/tag_buller.htm",
				category : ["MILJÖ, RISK OCH SÄKERHET","Miljöövervakning"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_karta_tagbuller_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 150,
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/bilder/legend_buller_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/bilder/legend_buller_liten.png"}
				}
			},						
		
			{
				displayName : 'Buller - väg',
				name: "op_ul_natur_vagbuller",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/vag_buller.htm",
				category : ["MILJÖ, RISK OCH SÄKERHET","Miljöövervakning"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_karta_vagbuller_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 150,
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/bilder/legend_buller_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Buller/html/bilder/legend_buller_liten.png"}
				}
			},						

						{
				displayName : 'Troligt förorenad mark',
				name: "ul_risk_markfororeningar",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/fororenad_mark_mifo/html/fororenad_mark_mifo.htm",
				category : ["MILJÖ, RISK OCH SÄKERHET","Miljöövervakning"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/fororenad_mark_mifo/html/bilder/legend_mifo_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/fororenad_mark_mifo/html/bilder/legend_mifo_liten.png"}
				}
			},				

			
			{
				displayName : 'Bekräftat förorenad mark',
				name: "ul_risk_markfororeningar_bekraftade",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/bekraftat_fororenad_mark/html/bekraftat_fororenad_mark.htm",
				category : ["MILJÖ, RISK OCH SÄKERHET","Miljöövervakning"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/bekraftat_fororenad_mark/html/bilder/legend_bekraftat_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/bekraftat_fororenad_mark/html/bilder/legend_bekraftat_liten.png"}
				}
			},				
			
			
			{
				displayName : 'Luftföroreningar',
				name: "op_ul_natur_luftfororening",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/luftfororening/html/luftfororening.html",
				category : ["MILJÖ, RISK OCH SÄKERHET","Miljöövervakning"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_karta_luft_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 150,
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/luftfororening/html/bilder/legend_luftfororening_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/luftfororening/html/bilder/legend_luftfororening_liten.png"}
				}
			},						

			{
				displayName : 'Radon',
				name: "radon",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/miljo/radon.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=radon",
				category : ["MILJÖ, RISK OCH SÄKERHET","Miljöövervakning"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				params : {
					layers: "malmows:MILJO_RADON_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Radon</div>" +
					"<div class='popup-text1'>${omrade_text}</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/miljo/radonhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/miljo/radon.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Luftförorening',
				name: "miljo_luftfororening",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljo_luftfororening",
				category : ["MILJÖ"],
				displayInLayerSwitcher: true,
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_karta_luft_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 150,
					isBaseLayer : false,
					opacity: "0.65",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/miljo/luftfororeningarhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/miljo/luftfororeningar.png"}
				}
			},						
					
						
			{
				displayName : 'Tågbuller',
				name: "miljo_tagbuller",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljo_tagbuller",
				category : ["MILJÖ"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_karta_tagbuller_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 150,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/miljo/tagbullerhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/miljo/tagbuller.png"}
				}
			},						
			
			{
				displayName : 'Vägbuller',
				name: "miljo_vagbuller",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=miljo_vagbuller",
				category : ["MILJÖ"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_karta_vagbuller_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					zIndex: 150,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/miljo/tagbullerhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/miljo/tagbuller.png"}
				}
			},								
*/
					
			
			{
				displayName : 'Naturvårdsplan',
				name: "ul_natur_naturvardsplan",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/naturvardsplan/html/naturvardsplan.htm",
				category : ["NATUR, REKREATION MED MERA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_BESTAMMELSER_VARDEFULLA_NATUROMRADEN_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.95",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/naturvardsplan/html/bilder/legend_naturvardsplan_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/naturvardsplan/html/bilder/legend_naturvardsplan_liten.png"}
				}
			},						

			{
				displayName : 'Naturreservat',
				name: "ul_natur_naturreservat",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/naturreservat/html/naturreservat.htm",
				category : ["NATUR, REKREATION MED MERA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_NATUR_NATURRESERVAT_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.95",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/naturreservat/html/bilder/legend_naturres_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/naturreservat/html/bilder/legend_naturres_liten.png"}
				}
			},								

			{
				displayName : 'Existerande torg och små parker',
				name: "ul_ovr_ul_exist_parker_torg",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/parker_torg_under_5ha/html/parker_torg_under_5ha.htm",
				category : ["NATUR, REKREATION MED MERA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_OVR_UL_EXIST_SMA_PARKER_TORG_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.95",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/parker_torg_under_5ha/html/bilder/legend_parker_text.png"
					}
				},	

				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/parker_torg_under_5ha/html/bilder/legend_parker_liten.png"}
				}
			},	
			{
				displayName : 'Bristområden för park och natur',
				name: "malmo_op_ul_natur_bristomraden_park_p",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/bristomraden_park/html/bristomraden_park.htm",
				category : ["NATUR, REKREATION MED MERA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_NATUR_BRISTOMRADEN_PARK_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.95",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/bristomraden_park/html/bilder/legend_brist_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/bristomraden_park/html/bilder/legend_brist_liten.png"}
				}
			},		
			
			{
				displayName : 'Ramsarområden',
				name: "ul_natur_ramsas_omraden",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/Ramsar_omraden/html/Ramsar_omraden.htm",
				category : ["NATUR, REKREATION MED MERA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_NATUR_RAMSAR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.95",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/Ramsar_omraden/html/bilder/legend_ramsar_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/natur/Ramsar_omraden/html/bilder/legend_ramsar_liten.png"}
				}
			},								
			{
				displayName : 'Geologiska förhållanden',
				name: "ul_ovr_ul_geologi",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/geologiska_forhallanden/html/geologiska_forhallanden.htm",
				category : ["NATUR, REKREATION MED MERA"],
				displayInLayerSwitcher: true,
				URL: "http://sbkvmgeoserver.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:layer_group_geologi_jordlager",
					format: "image/jpeg",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.65",
					ratio: 1,
					transitionEffect: 'none',					
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/geologiska_forhallanden/html/bilder/legend_geologi_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/geologiska_forhallanden/html/bilder/legend_geologi_liten.png"}
				}
			},	

			{
				displayName : 'Borrhål',
				name: "geologi_borrhal",
				layerType : "wms",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=geologi_borrhal",
				category : ["NATUR, REKREATION MED MERA"],
				displayInLayerSwitcher: true,
				URL: "http://sbkvmgeoserver.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:malmo_geologi_borrhal_pt",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.75",
					ratio: 1,
					transitionEffect: 'none',					
					zIndex: 399,
					singleTile : true					
				},
				popup :
					"<div class='popup-header1'>Borrhål</div>" +
					"<div class='popup-text1'>${punktnr}</div><BR>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/website/asp/geo_borrhal.asp?PUNKTNR=${punktnr}' target='_blank'>Visa information</a></div>",
					
				selectable : true, getFeatureInfo: {geometryName: "geom"},	
				blixtable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'polygon',
				startVisible : false,
				copyright : [],
				legend : {
					hover: {
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/geologiska_forhallanden/html/bilder/legend_geologi_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/alla.png"}
				}
			},	
			
			
			{
				displayName : 'Fornminnen',
				name: "ul_ovr_ul_fornminnen",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fornminnen/html/fornminnen.htm",
				category : ["NATUR, REKREATION MED MERA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fornminnen/html/bilder/legend_fornminnen_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fornminnen/html/bilder/legend_fornminnen_liten.png"}
				}
			},	

			
			{
				displayName : 'Samtlig näringslivsverksamhet',
				name: "samtliganaringsliv",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/cfar.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
				    property: "bransch_typ",
				    value: ""
				}),	
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_ALLA_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/allahoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/alla.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'A Jordbruk',
				name: "ajordbruk",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ajordbruk.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "A"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_A_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Ajordbrukhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Ajordbruk.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'B+C Tillverkning',
				name: "bctillverkning",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/BCtillverkning.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "BC"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_BC_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/BCtillverkninghoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/BCtillverkning.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'D+E Energi, vatten, avfall m.m',
				name: "deenergivattenavfallmm",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/deenergi.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "DE"
				}),	
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_DE_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/DEenergihoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/DEenergi.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'F Byggverksamhet',
				name: "fbyggverksamhet",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/fbyggverksamhet.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "F"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_F_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Fbyggverksamhethoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Fbyggverksamhet.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'G Handel & reparation',
				name: "ghandelreparationer",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ghandel.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "G"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_G_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Ghandelhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Ghandel.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'H Transport & magasinering',
				name: "htransportmagasinering",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/htransport.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "H"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_H_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Htransporthoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Htransport.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'I Hotell & restaurang',
				name: "ihotellrestaurang",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/ihotell.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "I"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_I_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Ihotellhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Ihotell.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'J Information & kommunikation',
				name: "jinformationkommunikation",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/jinformation.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "J"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_J_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Jinformationhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Jinformation.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'K Finans & försäkring',
				name: "kfinansforsakring",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/kfinans.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "K"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_K_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Kfinanshoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Kfinans.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'L Fastighetsverksamhet',
				name: "lfastighetsverksamhet",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/Lfastighetsverksamhet.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "L"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_L_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Lfastighetsverksamhethoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Lfastighetsverksamhet.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'M Juridik, ekonomi, vetenskap & teknik',
				name: "mjuridikekonomivetenskapteknik",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/Mjuridik.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "M"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_M_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Mjuridikhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Mjuridik.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'N Uthyrning, fastighetsservice, resetjänster m.m',
				name: "nuthyrningfastighetsserviceresetjanstermm",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/Nuthyrning.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "N"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_N_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Nuthyrninghoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Nuthyrning.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'O Offentlig sektor',
				name: "ooffentligsektor",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/Ooffentligsektor.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "O"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_O_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Ooffentligsektorhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Ooffentligsektor.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'P Utbildning',
				name: "putbildning",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/PUtbildning.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "P"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_P_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Putbildninghoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Putbildning.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'Q Vård, omsorg, sociala tjänster',
				name: "qvardomsorgsocialatjanster",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/Qvard.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "Q"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_Q_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/Qvardhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/Qvard.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'R+S Kultur, fritid & serviceverksamhet',
				name: "rskulturfritidserviceverksamhet",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/nk/RSKultur.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=naringsliv",
				category : ["NÄRINGSLIV"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${foretagsnamn}","${besoksadress}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.EQUAL_TO,
				    property: "bransch_typ",
				    value: "RS"
				}),
				params : {
					layers: "malmows:NK_CFAR_PT",
					styles: "MALMO_SMA_NK_CFAR_RS_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Näringsliv</div>" +
					"<div class='popup-text1'>Företag: ${foretagsnamn}</a></div>" +
					"<div class='popup-text1'>Firma/Benämning: ${firma}</a></div>" +
					"<div class='popup-text1'>Besöksadress: ${besoksadress}</a></div>" +
					"<div class='popup-text1'>Telefon: ${telefon}</a></div>" +
					"<div class='popup-text1'>Antal anställda: ${storleksklass}</a></div>" +
					"<div class='popup-text1'>Cfar nr: ${cfarnr}</a></div>" +
					"<div class='popup-text1'>Bransch 1: ${bransch1}</a></div>" +
					"<div class='popup-text1'>Bransch 2: ${bransch2}</a></div>" +
					"<div class='popup-text1'>Bransch 3: ${bransch3}</a></div>" +
					"<div class='popup-text1'>SNI Bransch: ${bransch_typ}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Delområde: ${delomrade}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/naringsliv/RSkulturhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/naringsliv/RSkultur.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'Fastighetsindelningsbestämmelse',
				name: "sma_fastighetsplaner_p",
				layerType : "wms",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_fastighetsplaner_p",
				category : ["PLANERA & BYGGA","Planera", "Detaljplaner"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				params : {
					layers: "malmows:SDE_KLM_FP_GRANS_FILTRERAD_L,malmows:SDE_KLM_FP_PLAN_PUNKT_FILTRERAD_PT,malmows:SDE_KLM_FP_BETECKN_PKT_FILTRERAD_PT", 
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : false
				},
				selectable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/planera/fastighetsplanerhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/planera/fastighetsplaner.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Detaljplan',
				name: "sma_planomr_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/planera/planer.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_planomr_p",
				category : ["PLANERA & BYGGA","Planera", "Detaljplaner"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${plan_visa}-${plan2_visa}-${plan3_visa}"],
				params : {
					//layers: "malmows:SMA_PLANOMR_P",
					layers: "malmows:SMA_DP_ADP_YTOR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.8",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Detaljplan</div>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/asp/Planer/Planer_lmv.asp?PLAN=${plan}' target='_blank'>${plan}, Läs mer...</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</div>",
					selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/planera/planerhoover.png"
					}
				},
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/planera/planer.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Bestämmelser från detaljplaner',
				name: "sma_bestammelse_dp",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/planera/planer.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_bestammelse_dp",
				category : ["PLANERA & BYGGA","Planera"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				//selectAttributes: ["${plan_visa}-${plan2_visa}-${plan3_visa}"],
				params : {
					layers: "malmows:SDE_KLM_EGENSKAPS_YTA_FILTRERAD_P,malmows:SDE_KLM_EGENSKAP_GRANS_FILTRERAD_L,malmows:SDE_KLM_ANVANDNINGS_GRANS_FILTRERAD_L",
					//layers: "malmows:SDE_KLM_ANVANDNINGS_GRANS_FILTRERAD_L,malmows:SDE_KLM_EGENSKAP_GRANS_FILTRERAD_L",
					//layers: "malmows:SDE_KLM_EGENSKAPS_YTA_FILTRERAD_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.9",
					zIndex: 549,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Detaljplan</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>${plan_visa}, Läs mer</div>" +
					"<div class='popup-text1'><a href='${url2}' target='_blank'>${plan2_visa}, Läs mer</div>" +				
					"<div class='popup-text1'><a href='${url3}' target='_blank'>${plan3_visa}, Läs mer</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</div>",
					selectable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/planera/Bestammelserdetaljplanhoover.png"
					}
				},
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/planera/Bestammelserdetaljplan.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Pågående detaljplan',
				name: "sma_pagaende_plan_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/planera/pagaendeplaner.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_pagaende_plan_p",
				category : ["PLANERA & BYGGA","Planera"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${plan}"],
				params : {
					layers: "malmows:SMA_PAGAENDE_PLANER_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Pågående detaljplan</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>${plan} Visa</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/planera/pagaendeplanerhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/planera/pagaendeplaner.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Pågående planprogram',
				name: "sma_pagaende_planprogram_p",
				layerType : "wms",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_pagaende_planprogram_p",
				category : ["PLANERA & BYGGA","Planera"],
				displayInLayerSwitcher: true,
				URL: "http://sbkvmgeoserver.sbkmalmo.local:8080/geoserver/malmows/wms?",
				selectAttributes: ["${plan}"],
				params : {
					layers: "malmows:SMA_PAGAENDE_PLANPROGRAM_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.55",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Pågående planprogram</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>${plan} Visa...</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://sbkvmgeoserver.sbkmalmo.local/bilder/planera/Pagaendeplanprogramhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://sbkvmgeoserver.sbkmalmo.local/bilder/planera/Pagaendeplanprogram.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Sammanhållen bebyggelse',
				name: "ul_bestammelser_sammanhallen_bebyggelse",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/bestammelser/sammanhallen_bebyggelse/html/sammanhallen_bebyggelse.htm",
				category : ["PLANERA & BYGGA","Planera"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/bestammelser/sammanhallen_bebyggelse/html/bilder/legend_sammanhallenbebyg_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/bestammelser/sammanhallen_bebyggelse/html/bilder/legend_sammanhallenbebyg_liten.png"}
				}
			},						

/*			
			{
				displayName : 'Översiktsplan 2005',
				name: "oversiktsplan_2005",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=oversiktsplan_2005",
				category : ["PLANERA & BYGGA","Planera"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_op2005_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
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
						url: "http://161.52.9.230/bilder/planera/oversiktsplanhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/planera/oversiktsplan.png"}
				}
			},							

*/
			{
				displayName : 'Fixpunkt',
				name: "fixpunkt",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/stomnat/Fixpunkt.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=fixpunkt",
				category : ["PLANERA & BYGGA","Bygga"],
				displayInLayerSwitcher: true,
				URL: 'http://161.52.9.230:8080/geoserver/malmows/wms?',
				selectAttributes: ["${punktnamn}", "Punktnr: ${punktnamn}"],
				report: {
					IDattribute: "punktnamn",
					linkURL: "http://sbkspace.malmo.se/select/select.aspx?layer=fixpunkt&object="
				},
				params : {
					layers: 'malmows:MAT_FIXPUNKTER_HOJD_PT',
					format: 'image/png',
					transparent: 'true'
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Fixpunkt</div>" +
					"<div class='popup-text1'>${punktnamn}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/punktDB/stomnat.aspx?pnr=${punktnamn}' target='_blank'>Visa punktinformation</a></div>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${e};${n}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${e}&posy=${n}' target='_blank'>Visa gatuvy</div>",			
	
					selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/stomnat/fixpunkthoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/stomnat/fixpunkt.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
								filter: new OpenLayers.Filter.Comparison({
								type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'Polygonpunkt',
				name: "polygonpunkt",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/stomnat/Polygonpunkt.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=polygonpunkt",
				category : ["PLANERA & BYGGA","Bygga"],
				displayInLayerSwitcher: true,
				URL: 'http://161.52.9.230:8080/geoserver/malmows/wms?',
				
				selectAttributes: ["${punktnamn}", "Punktnr: ${punktnamn}"],
				report: {
					IDattribute: "punktnamn",
					linkURL: "http://sbkspace.malmo.se/select/select.aspx?layer=polygonpunkt&object="
				},
				params : {
					 layers: 'malmows:MAT_STOMPUNKTER_PLAN_PT', 
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Polygonpunkt</div>" +
					"<div class='popup-text1'>${punktnamn}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/punktDB/stomnat.aspx?pnr=${punktnamn}' target='_blank'>Visa punktinformation</a></div>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${e};${n}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${e}&posy=${n}' target='_blank'>Visa gatuvy</div>",			
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/stomnat/polygonpunkthoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/stomnat/polygonpunkt.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'Exploateringsområde bostad',
				name: "fk_exploateringsomraden_p_bostader",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bygga/exploateringsomraden.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=fk_exploateringsomraden_p_bostader",
				category : ["PLANERA & BYGGA","Bygga"],
				displayInLayerSwitcher: true,
				URL: "http://fkmap.malmo.se/wms?",
				//URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${Text}"],
				params : {
					//layers: "malmows:FK_EXPLOATERINGSOMRADEN_P",
					layers: "fkkartan:FKVY_EXPLBOSTADER",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Exploateringsområde bostad</div>" +
					"<div class='popup-text1'>Text: ${Text}</div>" +
					"<div class='popup-text1'>Typ: ${Typ}</div>" +
					"<div class='popup-text1'>Projekttyp: ${Projekttyp}</div>" +
					"<div class='popup-text1'>Projektledare: ${Projektledare}</div>" +
					"<div class='popup-text1'>Projektstatus: ${Projektstatus}</div>",
					//"<div class='popup-text1'><a href='${url_snedbild}' target='_blank'>Visa snedbild</a></div>",
				selectable : true, getFeatureInfo: {geometryName: "SHAPE"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Bygga/exploateringbostadhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Bygga/exploateringbostad.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Exploateringsområde verksamhet',
				name: "fk_exploateringsomraden_p_verksamheter",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bygga/exploateringsomraden.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=fk_exploateringsomraden_p_verksamheter",
				category : ["PLANERA & BYGGA","Bygga"],
				displayInLayerSwitcher: true,
				URL: "http://fkmap.malmo.se/wms?",
				//URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${Text}"],
				params : {
					//layers: "malmows:FK_EXPLOATERINGSOMRADEN_P",
					layers: "fkkartan:FKVY_EXPLVERKSAMHETER",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Exploateringsområde verksamhet</div>" +
					"<div class='popup-text1'>Text: ${Text}</div>" +
					"<div class='popup-text1'>Typ: ${Typ}</div>" +
					"<div class='popup-text1'>Projekttyp: ${Projekttyp}</div>" +
					"<div class='popup-text1'>Projektledare: ${Projektledare}</div>" +
					"<div class='popup-text1'>Projektstatus: ${Projektstatus}</div>",
					//"<div class='popup-text1'><a href='${url_snedbild}' target='_blank'>Visa snedbild</a></div>",
				selectable : true, getFeatureInfo: {geometryName: "SHAPE"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Bygga/exploateringverksamheterhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Bygga/exploateringverksamheter.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Miljöbyggprogram syd',
				name: "mbps_syd",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bygga/exploateringsomraden.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=malmo_sma_fk_mbps_p",
				category : ["PLANERA & BYGGA","Bygga"],
				displayInLayerSwitcher: true,
				URL: "http://fkmap.malmo.se/wms?",
				//URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${ArendeTyp}"],
				params : {
					//layers: "malmows:FK_EXPLOATERINGSOMRADEN_P",
					layers: "fk:XFKVY_MBPS_STADSATLAS",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
	popup :
					"<div class='popup-header1'>Mijöbyggprogram Syd</div>" +
					"<div class='popup-text1'>${ArendeTyp}</div>",
				selectable : true, getFeatureInfo: {geometryName: "SHAPE"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Bygga/miljobyggprogramsydhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Bygga/miljobyggprogramsyd.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				// displayName : 'Miljöbyggprogram syd',
				// name: "malmo_sma_fk_mbps_p",
				// layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bygga/miljobyggprogramsyd.html",
				// dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=malmo_sma_fk_mbps_p",
				// category : ["PLANERA & BYGGA","Bygga"],
				// displayInLayerSwitcher: true,
				// URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				// params : {
					// layers: "malmows:FK_MBPS_P",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// opacity: "0.75",
					// zIndex: 150,
					// ratio: 1,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>MILJÖBYGGPROGRAM SYD</div>" +
					// "<div class='popup-text1'>TYP: ${typ_forklaring}</div>" +
					// "<div class='popup-text1'><a href='${url_snedbild}' target='_blank'>Visa snedbild</a></div>",
				// selectable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'area',
				// startVisible : false,
				// legend : {
					// hover: {
						// url: "http://161.52.9.230/Bilder/Bygga/miljobyggprogramsydhoover.png"
					// }
				// },		
				// copyright : [],
				// style: {
					// "default": {externalGraphic: "http://161.52.9.230/Bilder/Bygga/miljobyggprogramsyd.png"},
					// "select": {
						// rules: [
						        // new OpenLayers.Rule({
						        	// filter: new OpenLayers.Filter.Comparison({
						        		// type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	// }),
						        	//if a feature matches the above filter, use this style
						        	// symbolizer: {
							        	// fillColor: "#00FFFF",
										// fillOpacity: 0.3,
							        	// strokeColor: "#00FFFF",
							        	// strokeWidth: 3
							        // }
						        // }),
						        // new OpenLayers.Rule({
						        	// elseFilter: true,
						        	//if a feature matches the above filter, use this style
						        	// symbolizer: {}
						        // })
						// ]
					// }
				// }
			// },
				
/* 			{
				displayName : 'Nybyggnadskarta',
				name: "sma_nybyggnadskarta_pt",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bygga/nybyggnadskarta.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_nybyggnadskarta_pt",
				category : ["PLANERA & BYGGA","Bygga"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${mainid}","${arbordnr}"],
				params : {
					layers: "malmows:SMA_TELLUS2_NYB_KART_MAIN_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
				
					"<div class='popup-header1'>Nybyggnadskarta</div>" +
					"<a class='popup-text1'>Objekt-ID: ${mainid}</a><br>" +
					"<a class='popup-text1'>Arbetsordernummer: ${arbordnr}</a><br>" +
					"<a class='popup-text1'>Förfrågandenummer: ${forfrnr}</a><br>" +
					"<a class='popup-text1'>Fastighetsbeteckning: ${fastbet}</a><br>" +
					"<a class='popup-text1'>Avslutad: ${avslutad}</a><br>" +
					"<br>" +
					"<a class='popup-text1' href='http://space.malmo.se/klmfor/NybKartMainUpdatePage.aspx?mMainID=${mainid}' target='_blank'>Visa nbk-information</a><br>" +
					"<br>" +
					"<a class='popup-text1' href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a><br>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Bygga/nybyggnadskartahoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Bygga/nybyggnadskarta.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
			}, */
			{
				displayName : 'Avslutade',
				name: "sma_nybyggnadskarta_avs_pt",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bygga/nybyggnadskarta.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_nybyggnadskarta_pt",
				category : ["PLANERA & BYGGA","Bygga","Nybyggnadskarta"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:SMA_TELLUS2_NYBYGGKARTOR_AVS_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :				
					"<div class='popup-header1'>Nybyggnadskarta avslutade</div>" +
					"<a class='popup-text1'>Arbetsordernummer: ${arbordnr}</a><br>" +
					"<a class='popup-text1'>Fastighetsbeteckning: ${fastbet}</a><br>" +
					"<a class='popup-text1'>Avslutad: ${avslutad}</a><br>" +
					"<br>" +
					"<a class='popup-text1' href='http://sbkspace.malmo.se/nbk/nbkspara.aspx?id=${id}' target='_blank'>Visa nbk-information</a><br>" +
					"<br>" +
					"<a class='popup-text1' href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a><br>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230:8080/geoserver/wms?request=GetLegendGraphic&layer=malmows:SMA_TELLUS2_NYBYGGKARTOR_AVS_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230:8080/geoserver/wms?request=GetLegendGraphic&layer=malmows:SMA_TELLUS2_NYBYGGKARTOR_AVS_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/kvadrat_medium_turkos.png'
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
				displayName : 'Pågående',
				name: "sma_nybyggnadskarta_pg_pt",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bygga/nybyggnadskarta.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_nybyggnadskarta_pt",
				category : ["PLANERA & BYGGA","Bygga","Nybyggnadskarta"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${fid}"],
				params : {
					layers: "malmows:SMA_TELLUS2_NYBYGGKARTOR_PG_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
				
					"<div class='popup-header1'>Nybyggnadskarta pågående</div>" +
					"<a class='popup-text1'>Arbetsordernummer: ${arbordnr}</a><br>" +
					"<a class='popup-text1'>Fastighetsbeteckning: ${fastbet}</a><br>" +
					"<br>" +
					"<a class='popup-text1' href='http://sbkspace.malmo.se/nbk/nbkspara.aspx?id=${id}' target='_blank'>Visa nbk-information</a><br>" +
					"<br>" +
					"<a class='popup-text1' href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a><br>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'point',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230:8080/geoserver/wms?request=GetLegendGraphic&layer=malmows:SMA_TELLUS2_NYBYGGKARTOR_PG_PT&version=1.1.1&format=image/png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230:8080/geoserver/wms?request=GetLegendGraphic&layer=malmows:SMA_TELLUS2_NYBYGGKARTOR_PG_PT&version=1.1.1&format=image/png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/kvadrat_medium_turkos.png'
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
				displayName : 'Markinnehav',
				name: "sma_sum_fastyta_markinnehav_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Förvalta/markinnehav.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_sum_fastyta_markinnehav_p",
				category : ["PLANERA & BYGGA","Förvalta"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${fastighet}"],	
				params : {
					layers: "malmows:SMA_SUM_FASTYTA_MARKINNEHAV_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Malmö kommuns markinnehav</div>" +
					"<div class='popup-text1'>Fastighet: ${fastighet}</div>" +
					"<div class='popup-text1'>Upplåten med tomträtt: ${tomtr}</div>" + 
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/verksamhetsatlas/asp/fir_sok.asp?FNR=${fnr}' target='_blank'>Visa fastighetsinformation</div>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Förvalta/markinnehavhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Förvalta/markinnehav.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Skötselansvar stadsfastighet',
				name: "skotselansvar_stadsfast",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bygga/exploateringsomraden.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=skotselansvar_stadsfast",
				category : ["PLANERA & BYGGA","Förvalta"],
				displayInLayerSwitcher: true,
				URL: "http://fkmap.malmo.se/wms?",
				selectAttributes: ["${Kund1Namn}"],
				//URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				params : {
					//layers: "malmows:FK_EXPLOATERINGSOMRADEN_P",
					layers: "fk:FKVY_INTERNAUPPLATELSER",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Skötselansvar Stadsfastighet</div>" +
					"<div class='popup-text1'>Produktnummer: ${ProduktNr}</div>" +
					"<div class='popup-text1'>Produktadress: ${ProduktAdress}</div>" +
					"<div class='popup-text1'>Kund: ${Kund1Namn}</div>",
				selectable : true, getFeatureInfo: {geometryName: "SHAPE"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Förvalta/skotselansvarfkhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Förvalta/skotselansvarfk.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Skötselansvar hamn',
				name: "skotselansvar_hamnen",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bygga/exploateringsomraden.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=skotselansvar_hamnen",
				category : ["PLANERA & BYGGA","Förvalta"],
				displayInLayerSwitcher: true,
				URL: "http://fkmap.malmo.se/wms?",
				//URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${Kund1Namn}"],
				params : {
					//layers: "malmows:FK_EXPLOATERINGSOMRADEN_P",
					layers: "fk:XFKVY_FKHAMNEN",
					styles: "XFKVY_FKHAMNEN_ATLAS",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Skötselansvar Hamn</div>" +
					"<div class='popup-text1'>Produktnummer: ${ProduktNr}</div>" +
					"<div class='popup-text1'>Produktadress: ${ProduktAdress}</div>" +
					"<div class='popup-text1'>Kund: ${Kund1Namn}</div>",
				selectable : true, getFeatureInfo: {geometryName: "SHAPE"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Förvalta/skotselansvarhamnhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Förvalta/skotselansvarhamn.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				// displayName : 'Skötselansvar',
				// name: "malmo_sma_fk_skotselansvar_p",
				// layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Förvalta/skotselansvar.html",
				// dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=malmo_sma_fk_skotselansvar_p",
				// category : ["PLANERA & BYGGA","Förvalta"],
				// displayInLayerSwitcher: true,
				// URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				//URL: "http://fkmap.malmo.se/fk/wms?",
				// params : {
					// layers: "malmows:FK_SKOTSELANSVAR_P",
					//styles: "XFKVY_FKFORVALTNING_ATLAS",
					//layers: "XFKVY_FKFORVALTNING",
					// format: "image/png",
					// transparent: "true"
				// }, 
				// options : {
					// isBaseLayer: false,
					// opacity: "0.55",
					// zIndex: 150,
					// ratio: 1,
					// singleTile : true
				// },
				// popup :
					// "<div class='popup-header1'>SKÖTSELANSVAR</div>" +
					// "<div class='popup-text1'>Skötselansvar: ${typ_visa}</div>" +
					// "<div class='popup-text1'><a href='${url_snedbild}' target='_blank'>Visa snedbild</div>",
				// selectable : true, getFeatureInfo: {geometryName: "geom"},
				// geomType : 'area',
				// startVisible : false,
				// legend : {
					// hover: {
						// url: "http://161.52.9.230/Bilder/Förvalta/skotselansvarhoover.png"
					// }
				// },		
				// copyright : [],
				// style: {
					// "default": {externalGraphic: "http://161.52.9.230/Bilder/Förvalta/skotselansvar2.png"},
					// "select": {
						// rules: [
						        // new OpenLayers.Rule({
						        	// filter: new OpenLayers.Filter.Comparison({
						        		// type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	// }),
						        	//if a feature matches the above filter, use this style
						        	// symbolizer: {
							        	// fillColor: "#00FFFF",
										// fillOpacity: 0.3,
							        	// strokeColor: "#00FFFF",
							        	// strokeWidth: 3
							        // }
						        // }),
						        // new OpenLayers.Rule({
						        	// elseFilter: true,
						        	//if a feature matches the above filter, use this style
						        	// symbolizer: {}
						        // })
						// ]
					// }
				// }
			// },
			
						
						
			{
				displayName : 'Bygglov bostad',
				name: "bygglovbostad",
				layerType : "wms",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=bygglovbostad",
				category : ["PLANERA & BYGGA","Bostadsbyggnadsregister"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${objectid}","${fastighetsbeteckning}"],
					
				params : {
					layers: "malmows:PLAN_BOSTAD_BYGGLOV_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Bygglov bostad</div>" +
					"<div class='popup-text1'>Objekt-ID: ${objectid}</div>" +
					"<div class='popup-text1'>Fastighetsbeteckning: ${fastighetsbeteckning}</div>" +
					"<div class='popup-text1'>Typ: ${typ}</div>" +
					"<div class='popup-text1'>Detaljplan: ${dp_namn}</div>" +
					"<div class='popup-text1'>Diarienummer: ${by_nr}</div>" +
					"<div class='popup-text1'>Sökande: ${sokande}</div>" +
					"<div class='popup-text1'>Bygglov inkom: ${bygglov_inkom}</div>" +
					"<div class='popup-text1'>Handläggare: ${handl__by}</div>" +
					"<div class='popup-text1'>Bygglov: ${by_beslut}</div>" +
					"<div class='popup-text1'>Bygganmälan inkom: ${bygganmalan_inkom}</div>" +
					"<div class='popup-text1'>Handläggare: ${handl__ba}</div>" +
					"<div class='popup-text1'>Kontrollplan: ${kontrollplan}</div>" +
					"<div class='popup-text1'>Byggstart: ${byggstart}</div>" +
					"<div class='popup-text1'>Utstakad: ${utstakning}</div>" +
					"<div class='popup-text1'>Färdigställd: ${fardigstalld}</div>" +
					"<div class='popup-text1'>Upplåtelse: ${upplatelseform}</div>" +
					"<div class='popup-text1'>Antal bostäder: ${antal_byggda}</div>" +
					"<div class='popup-text1'>Ettor: ${ettor}</div>" +
					"<div class='popup-text1'>Tvåor: ${tvaor}</div>" +
					"<div class='popup-text1'>Treor: ${treor}</div>" +
					"<div class='popup-text1'>Fyror: ${fyror}</div>" +
					"<div class='popup-text1'>Femmor: ${femmor}</div>" +
					"<div class='popup-text1'>Sexor: ${sexor}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/bostad_dp_bl/default.aspx' target='_blank'>Visa bostadsbyggnadsregister</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${by_easting};${by_northing}' target='_blank'>Visa snedbild</div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${by_easting}&posy=${by_northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/BLefter2010hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/BLefter2010.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
			
/*				{
				displayName : 'Bygglov bostad mellan 2008-2012',
				name: "bygglovbostadmellan2008_2012",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bostadsbyggnadsregister/Blbinnan2011.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=bygglovbostadmellan2008_2010",
				category : ["PLANERA & BYGGA","Bostadsbyggnadsregister"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${objectid}","${fastighetsbeteckning}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.LESS_THAN,
				    property: "fardigstalld_visakarta",
				    value: 2013
				}),		
				params : {
					layers: "malmows:PLAN_BOSTAD_BYGGLOV_PT",
					styles: "MALMO_PLAN_BOSTAD_BYGGLOV_I_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Bygglov bostad mellan 2008-2010</div>" +
					"<div class='popup-text1'>Objekt-id: ${objectid}</div>" +
					"<div class='popup-text1'>Fastighetsbeteckning: ${fastighetsbeteckning}</div>" +
					"<div class='popup-text1'>Typ: ${typ}</div>" +
					"<div class='popup-text1'>Detaljplan: ${dp_namn}</div>" +
					"<div class='popup-text1'>Diarienummer: ${by_nr}</div>" +
					"<div class='popup-text1'>Sökande: ${sokande}</div>" +
					"<div class='popup-text1'>Bygglov inkom: ${bygglov_inkom}</div>" +
					"<div class='popup-text1'>Handläggare: ${handl__by}</div>" +
					"<div class='popup-text1'>Bygglov: ${by_beslut}</div>" +
					"<div class='popup-text1'>Bygganmälan inkom: ${bygganmalan_inkom}</div>" +
					"<div class='popup-text1'>Handläggare: ${handl__ba}</div>" +
					"<div class='popup-text1'>Kontrollplan: ${kontrollplan}</div>" +
					"<div class='popup-text1'>Byggstart: ${byggstart}</div>" +
					"<div class='popup-text1'>Utstakad: ${utstakning}</div>" +
					"<div class='popup-text1'>Färdigställd: ${fardigstalld}</div>" +
					"<div class='popup-text1'>Upplåtelse: ${upplatelseform}</div>" +
					"<div class='popup-text1'>Antal bostäder: ${antal_byggda}</div>" +
					"<div class='popup-text1'>Ettor: ${ettor}</div>" +
					"<div class='popup-text1'>Tvåor: ${tvaor}</div>" +
					"<div class='popup-text1'>Treor: ${treor}</div>" +
					"<div class='popup-text1'>Fyror: ${fyror}</div>" +
					"<div class='popup-text1'>Femmor: ${femmor}</div>" +
					"<div class='popup-text1'>Sexor: ${sexor}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/bostad_dp_bl/default.aspx' target='_blank'>Visa bostadsbyggnadsregister</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${by_easting};${by_northing}' target='_blank'>Visa snedbild</div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${by_easting}&posy=${by_northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/BLinnan2010hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/BLinnan2010.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'Bygglov bostad övrigt 2011-',
				name: "bygglovbostadovrigt2011",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bostadsbyggnadsregister/Blboe2011.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=bygglovbostadovrigt2011",
				category : ["PLANERA & BYGGA","Bostadsbyggnadsregister"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${objectid}","${fastighetsbeteckning}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
				    property: "fardigstalld_visakarta",
				    value: 2011
				}),	
				params : {
					layers: "malmows:PLAN_BOSTAD_BYGGLOV_OVRIGA_PT",
					styles: "MALMO_PLAN_BOSTAD_BYGGLOV_OVRIGA_E_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Bygglov bostad övrigt 2011-</div>" +
					"<div class='popup-text1'>Objekt-ID: ${objectid}</div>" +
					"<div class='popup-text1'>Fastighetsbeteckning: ${fastighetsbeteckning}</div>" +
					"<div class='popup-text1'>Typ: ${typ}</div>" +
					"<div class='popup-text1'>Detaljplan: ${dp_namn}</div>" +
					"<div class='popup-text1'>Diarienummer: ${by_nr}</div>" +
					"<div class='popup-text1'>Sökande: ${sokande}</div>" +
					"<div class='popup-text1'>Bygglov inkom: ${bygglov_inkom}</div>" +
					"<div class='popup-text1'>Handläggare: ${handl__by}</div>" +
					"<div class='popup-text1'>Bygglov: ${by_beslut}</div>" +
					"<div class='popup-text1'>Bygganmälan inkom: ${bygganmalan_inkom}</div>" +
					"<div class='popup-text1'>Handläggare: ${handl__ba}</div>" +
					"<div class='popup-text1'>Kontrollplan: ${kontrollplan}</div>" +
					"<div class='popup-text1'>Byggstart: ${byggstart}</div>" +
					"<div class='popup-text1'>Utstakad: ${utstakning}</div>" +
					"<div class='popup-text1'>Färdigställd: ${fardigstalld}</div>" +
					"<div class='popup-text1'>Upplåtelse: ${upplatelseform}</div>" +
					"<div class='popup-text1'>Antal bostäder: ${antal_byggda}</div>" +
					"<div class='popup-text1'>Ettor: ${ettor}</div>" +
					"<div class='popup-text1'>Tvåor: ${tvaor}</div>" +
					"<div class='popup-text1'>Treor: ${treor}</div>" +
					"<div class='popup-text1'>Fyror: ${fyror}</div>" +
					"<div class='popup-text1'>Femmor: ${femmor}</div>" +
					"<div class='popup-text1'>Sexor: ${sexor}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/bostad_dp_bl/default.aspx' target='_blank'>Visa bostadsbyggnadsregister</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${by_easting};${by_northing}' target='_blank'>Visa snedbild</div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${by_easting}&posy=${by_northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/BLOefter2010hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/BLOefter2010.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'Bygglov bostad övrigt mellan 2008-2010',
				name: "bygglovbostadovrigtmellan2008_2010",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bostadsbyggnadsregister/Blboinnan2011.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=bygglovbostadovrigtmellan2008_2010",
				category : ["PLANERA & BYGGA","Bostadsbyggnadsregister"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${objectid}","${fastighetsbeteckning}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.LESS_THAN,
				    property: "fardigstalld_visakarta",
				    value: 2011
				}),
				params : {
					layers: "malmows:PLAN_BOSTAD_BYGGLOV_OVRIGA_PT",
					styles: "MALMO_PLAN_BOSTAD_BYGGLOV_OVRIGA_I_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Bygglov bostad övrigt mellan 2008-2010</div>" +
					"<div class='popup-text1'>Objekt-ID: ${objectid}</div>" +
					"<div class='popup-text1'>Fastighetsbeteckning: ${fastighetsbeteckning}</div>" +
					"<div class='popup-text1'>Typ: ${typ}</div>" +
					"<div class='popup-text1'>Detaljplan: ${dp_namn}</div>" +
					"<div class='popup-text1'>Diarienummer: ${by_nr}</div>" +
					"<div class='popup-text1'>Sökande: ${sokande}</div>" +
					"<div class='popup-text1'>Bygglov inkom: ${bygglov_inkom}</div>" +
					"<div class='popup-text1'>Handläggare: ${handl__by}</div>" +
					"<div class='popup-text1'>Bygglov: ${by_beslut}</div>" +
					"<div class='popup-text1'>Bygganmälan inkom: ${bygganmalan_inkom}</div>" +
					"<div class='popup-text1'>Handläggare: ${handl__ba}</div>" +
					"<div class='popup-text1'>Kontrollplan: ${kontrollplan}</div>" +
					"<div class='popup-text1'>Byggstart: ${byggstart}</div>" +
					"<div class='popup-text1'>Utstakad: ${utstakning}</div>" +
					"<div class='popup-text1'>Färdigställd: ${fardigstalld}</div>" +
					"<div class='popup-text1'>Upplåtelse: ${upplatelseform}</div>" +
					"<div class='popup-text1'>Antal bostäder: ${antal_byggda}</div>" +
					"<div class='popup-text1'>Ettor: ${ettor}</div>" +
					"<div class='popup-text1'>Tvåor: ${tvaor}</div>" +
					"<div class='popup-text1'>Treor: ${treor}</div>" +
					"<div class='popup-text1'>Fyror: ${fyror}</div>" +
					"<div class='popup-text1'>Femmor: ${femmor}</div>" +
					"<div class='popup-text1'>Sexor: ${sexor}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/bostad_dp_bl/default.aspx' target='_blank'>Visa bostadsbyggnadsregister</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${by_easting};${by_northing}' target='_blank'>Visa snedbild</div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${by_easting}&posy=${by_northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/BLOinnan2010hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/BLOinnan2010.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'Detaljplan bostad 2013-',
				name: "detaljplanbostad2013",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bostadsbyggnadsregister/DPbe2011.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=detaljplanbostad2011",
				category : ["PLANERA & BYGGA","Bostadsbyggnadsregister"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${objectid}","${plannamn}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
				    property: "lagakraft_visakarta",
				    value: 2013
				}),	
				params : {
					layers: "malmows:PLAN_BOSTAD_PLANER_PT",
					styles: "MALMO_SMA_PLAN_BOSTAD_PLANERA_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Detaljplan bostad 2011-</div>" +
					"<div class='popup-text1'>Objekt-ID: ${objectid}</div>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Byggherre: ${byggherreavtal}</div>" +
					"<div class='popup-text1'>Plannamn: ${plannamn}</div>" +
					"<div class='popup-text1'>Detaljplan: ${dp_namn}</div>" +
					"<div class='popup-text1'>Småhus: ${smahus}</div>" +
					"<div class='popup-text1'>Flerbostadshus: ${flerbostadshus_antal_lgh}</div>" +
					"<div class='popup-text1'>Kommentar: ${kommentar_plan_byggst}</div>" +
					"<div class='popup-text1'>Markägare: ${markagare}</div>" +
					"<div class='popup-text1'>Anmäld: ${anmald_sbn}</div>" +
					"<div class='popup-text1'>Planhandläggare: ${planhandlaggare}</div>" +
					"<div class='popup-text1'>Beställare: ${bestallare}</div>" +
					"<div class='popup-text1'>Antagen/godkänd: ${antagen_godkand_sbn}</div>" +
					"<div class='popup-text1'>Antagen kommunalfullmäktige: ${antagen_kf}</div>" +
					"<div class='popup-text1'>Överklagad: ${overklagad}</div>" +
					"<div class='popup-text1'>Lagakraft: ${lagakraft}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/bostad_dp_bl/default.aspx' target='_blank'>Visa bostadsbyggnadsregister</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${dp_easting};${dp_northing}' target='_blank'>Visa snedbild</div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${by_easting}&posy=${by_northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/DPefter2010hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/DPefter2010.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'Detaljplan bostad mellan 2008-2012',
				name: "detaljplanbostadmellan2008_2012",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Bostadsbyggnadsregister/DPbinnan2011.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=detaljplanbostadmellan2008_2010",
				category : ["PLANERA & BYGGA","Bostadsbyggnadsregister"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${objectid}","${plannamn}"],
				filter: new OpenLayers.Filter.Comparison({
					version: "1.1.0",
					type: OpenLayers.Filter.Comparison.LESS_THAN,
				    property: "lagakraft_visakarta",
				    value: 2013
				}),
				params : {
					layers: "malmows:PLAN_BOSTAD_PLANER_PT",
					styles: "MALMO_PLAN_BOSTAD_PLANER_I_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Detaljplan bostad mellan 2008-2010</div>" +
					"<div class='popup-text1'>Objekt-ID: ${objectid}</div>" +
					"<div class='popup-text1'>Stadsdel: ${stadsdel}</div>" +
					"<div class='popup-text1'>Byggherre: ${byggherreavtal}</div>" +
					"<div class='popup-text1'>Plannamn: ${plannamn}</div>" +
					"<div class='popup-text1'>Detaljplan: ${dp_namn}</div>" +
					"<div class='popup-text1'>Småhus: ${smahus}</div>" +
					"<div class='popup-text1'>Flerbostadshus: ${flerbostadshus_antal_lgh}</div>" +
					"<div class='popup-text1'>Kommentar: ${kommentar_plan_byggst}</div>" +
					"<div class='popup-text1'>Markägare: ${markagare}</div>" +
					"<div class='popup-text1'>Anmäld: ${anmald_sbn}</div>" +
					"<div class='popup-text1'>Planhandläggare: ${planhandlaggare}</div>" +
					"<div class='popup-text1'>Beställare: ${bestallare}</div>" +
					"<div class='popup-text1'>Antagen/godkänd: ${antagen_godkand_sbn}</div>" +
					"<div class='popup-text1'>Antagen kommunalfullmäktige: ${antagen_kf}</div>" +
					"<div class='popup-text1'>Överklagad: ${overklagad}</div>" +
					"<div class='popup-text1'>Lagakraft: ${lagakraft}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/bostad_dp_bl/default.aspx' target='_blank'>Visa bostadsbyggnadsregister</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${dp_easting};${dp_northing}' target='_blank'>Visa snedbild</div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${by_easting}&posy=${by_northing}' target='_blank'>Visa gatuvy</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/DPinnan2010hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Bostadsbyggnadsregister/DPinnan2010.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'By',
				name: "byar",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/byinventering/byar.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=byar",
				category : ["PLANERA & BYGGA","Byinventering"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${bynamn}"],
				params : {
					layers: "malmows:PLAN_BYINV_BYAR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>By</div>" +
					"<div class='popup-text1'>${bynamn}</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Byinventering/byarhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Byinventering/byar.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Inventering',
				name: "inventering",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/byinventering/inventering.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=inventering",
				category : ["PLANERA & BYGGA","Byinventering"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${koord_id}"],
				params : {
					layers: "malmows:PLAN_BYINV_PUNKTER_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-text1'>ID: ${koord_id}</div>" +	
					"<div class='popup-text1'>Namn: ${namn}</div>" +					
					"<div class='popup-text1'>Funktion: ${funktion}</div>" +					
					"<div class='popup-text1'>By: ${by}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://sbkspace.malmo.se/byinvent/default.aspx?mID=${koord_id}' target='_blank'>Visa foto och information</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",
					selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Byinventering/inventeringhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Byinventering/inventering.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
								    	externalGraphic: 'http://161.52.9.230/bilder/Generell_select/cirkel_medium_turkos.png'
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
				displayName : 'Landskapskaraktär',
				name: "landskapskarakt",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/byinventering/landskapskaraktar.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=landskapskarakt",
				category : ["PLANERA & BYGGA","Byinventering"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${landskapstyp}"],
				params : {
					layers: "malmows:PLAN_BYINV_LANDSKAPSKARAKTAR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Landskapskaraktär</div>" +
					"<div class='popup-text1'>${landskapstyp}</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Byinventering/landskapskaraktarerhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Byinventering/landskapskaraktarer.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Socken',
				name: "socknar",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/byinventering/socknar.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=socknar",
				category : ["PLANERA & BYGGA","Byinventering"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${socken}"],
				params : {
					layers: "malmows:PLAN_BYINV_SOCKNAR_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Socken</div>" +
					"<div class='popup-text1'>${socken}</div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Byinventering/socknarhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Byinventering/socknar.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Kommunal förskola',
				name: "kommunal_forskola",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/skola/forskola.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=forskola",
				category : ["SKOLA"],
				displayInLayerSwitcher: true,
				URL: 'http://kartor.malmo.se/geoserver/malmows/wms?',	
				selectAttributes: ["${namn}"],
				params : {
					layers: "malmows:V_POI_EXTENS_FORSKOLOR_KOMMUNAL_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
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
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",	
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
				displayName : 'Fristående förskola',
				name: "ickekom_forskola",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/skola/forskola.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=forskola",
				category : ["SKOLA"],
				displayInLayerSwitcher: true,
				URL: 'http://kartor.malmo.se/geoserver/malmows/wms?',	
				selectAttributes: ["${namn}"],
				params : {
					layers: "malmows:V_POI_EXTENS_FORSKOLOR_PRIVAT_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
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
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",	
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
				displayName : 'Öppen förskola',
				name: "oppen_forskola",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/skola/forskola.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/statistikmetadata.aspx?id=oppen_forskola&img=http://161.52.9.230/bilder/skola/forskola_oppen.png",
				category : ["SKOLA"],
				displayInLayerSwitcher: true,
				URL: 'http://kartor.malmo.se/geoserver/malmows/wms?',	
				selectAttributes: ["${namn}"],
				params : {
					layers: "malmows:V_POI_EXTENS_FORSKOLOR_OPPEN_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Öppen förskola</div>" +
					"<div class='popup-text1'>${namn}</div>" +
					"<div class='popup-text1'><a href='${url}' target='_blank'>${plan} Läs mer</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${stadsomr}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",	
					selectable : true,
				geomType : 'point',
				getFeatureInfo: {geometryName: "geom"},
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/skola/forskola_oppen.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/skola/forskola_oppen.png"},
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
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=grundskola",
				category : ["SKOLA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
				selectAttributes: ["${id}"],
				params : {
					layers: "malmows:POI_EXTENS_XLS_GRUNDSKOLA_PT",
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
					"<div class='popup-header1'>${objektnamn}</div>" +
					"<div class='popup-text1'>Årskurs: ${arskurs}</div>" +
					"<div class='popup-text1'>${typ}</div>" +
					"<br>" +
					"<div class='popup-text1'>${adress}</div>" +
					"<div class='popup-text1'>${postnr}</div>" +
					"<div class='popup-text1'>${ort}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='${function(p){if (p.url && p.url.length >= 4 && p.url.substring(0, 4).toUpperCase() === \"HTTP\") {return p.url} else {return \"http://\"+p.url} }}' target='_blank'>Läs mer</a></div>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</div>",
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
			},
			
			{
				displayName : 'Gymnasieskola',
				name: "gymnasieskola",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/skola/gymnasieskola.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=gymnasieskola",
				category : ["SKOLA"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",	
				selectAttributes: ["${objektnamn}"],
				params : {
					layers: "malmows:POI_SKOLOR_GYMNASIESKOLA",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Gymnasieskola</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${URL}' target='_blank'>${plan} Läs mer</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",			
				selectable : true,
				geomType : 'area',
				getFeatureInfo: {geometryName: "geom"},
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/skola/gymnasieskolahoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/skola/gymnasieskola.png"},
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
				displayName : 'Högskola & universitet',
				name: "hogskolaochuniversitet",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/skola/hogskola.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=hogskolaochuniversitet",
				category : ["SKOLA"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",	
				selectAttributes: ["${objektnamn}"],
				params : {
					layers: "malmows:POI_SKOLOR_HOGSKOLOR_UNIVERISIT",
					format: "image/png",
					transparent: "true"
				},
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Högskola & universitet</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${URL}' target='_blank'>${plan} Läs mer</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",	
				selectable : true,
				geomType : 'area',
				getFeatureInfo: {geometryName: "geom"},
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/skola/hogskolahoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/skola/hogskola.png"},
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
				displayName : 'Övrig skola',
				name: "ovrigskola",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/skola/ovrigskola.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=ovrigskola",
				category : ["SKOLA"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",	
				selectAttributes: ["${objektnamn}"],
				params : {
					layers: "malmows:POI_SKOLOR_OVR",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Övrig skola</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<div class='popup-text1'><a href='${URL}' target='_blank'>${plan} Läs mer</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${easting}&posy=${northing}' target='_blank'>Visa gatuvy</div>",	
				selectable : true,
				geomType : 'area',
				getFeatureInfo: {geometryName: "geom"},
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/skola/ovrigskolahoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/skola/ovrigskola.png"},
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
				displayName : 'Gasledning',
				name: "ul_bestammelser_gasledning",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/bestammelser/gasledning/html/gasledning.htm",
				category : ["TEKNISK FÖRSÖRJNING, VA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/bestammelser/gasledning/html/bilder/legend_gasledn_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/bestammelser/gasledning/html/bilder/legend_gasledn_liten.png"}
				}
			},			

			{
				displayName : 'Kraftledningar',
				name: "ul_bestammelser_kraftledningar",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/bestammelser/kraftledningar/html/kraftledningar.htm",
				category : ["TEKNISK FÖRSÖRJNING, VA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/bestammelser/kraftledningar/html/bilder/legend_kraftledn_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/bestammelser/kraftledningar/html/bilder/legend_kraftledn_liten.png"}
				}
			},			
			
			{
				displayName : 'Fjärrvärmeledningar',
				name: "ul_ovr_ul_fjarrvarmeledningar",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fjarrvarme/html/fjarrvarme.htm",
				category : ["TEKNISK FÖRSÖRJNING, VA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fjarrvarme/html/bilder/legend_fjarrvarme_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Fjarrvarme/html/bilder/legend_fjarrvarme_liten.png"}
				}
			},
			
			{
				displayName : 'Avloppssystem',
				name: "ul_ovr_ul_avloppssystem",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avloppssystem/html/avloppssystem.htm",
				category : ["TEKNISK FÖRSÖRJNING, VA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avloppssystem/html/bilder/legend_avloppssystem_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avloppssystem/html/bilder/legend_avloppssystem_liten.png"}
				}
			},			
			
			{
				displayName : 'Avrinningsområden',
				name: "ul_va_avrinningsomraden",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avrinningsomraden/html/dikningsföretag.htm",
				category : ["TEKNISK FÖRSÖRJNING, VA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avrinningsomraden/html/bilder/legend_avrinning_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/avrinningsomraden/html/bilder/legend_avrinning_liten.png"}
				}
			},			

			{
				displayName : 'Dikningsföretag',
				name: "ul_va_dikningsforetag",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/Dikningsforetag_med_batnadsomraden/html/dikningsföretag.htm",
				category : ["TEKNISK FÖRSÖRJNING, VA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/Dikningsforetag_med_batnadsomraden/html/bilder/legend_dikning_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/Dikningsforetag_med_batnadsomraden/html/bilder/legend_dikning_liten.png"}
				}
			},						

			{
				displayName : 'Återvinningsstationer',
				name: "ul_va_atervinningsstationer",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/atervinningsstationer/html/atervinningsstationer.htm",
				category : ["TEKNISK FÖRSÖRJNING, VA"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/atervinningsstationer/html/bilder/legend_atervinning_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/VA_avfall/atervinningsstationer/html/bilder/legend_atervinning_liten.png"}
				}
			},

			
			{
				displayName : 'Busstation',
				name: "busstation",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/kommunikation/Busstation.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=busstation",
				category : ["TRAFIK"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${objektnamn}"],
				params : {
					layers: "malmows:POI_BUSS_STATION_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Busstation</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://www.skanetrafiken.se?id=ctl00_travelPlannerRegion_TravelPlanner_inpPointFr' target='_blank'>Skånetrafiken</a></div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/kommunikation/busstationhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/kommunikation/busstationNY.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
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
				displayName : 'Busshållplats',
				name: "busshallplats",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/kommunikation/Busshallsplats.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=busshallplats",
				category : ["TRAFIK"],
				displayInLayerSwitcher: true,
				URL: 'http://193.17.67.229/geoserver/wms?',
				selectAttributes: ["${caption}"],
				params : {
					layers: "common:poi_hallplatser1330_malmo",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Busshållsplats</div>" +
					"<div class='popup-text1'>${caption}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://www.skanetrafiken.se?id=ctl00_travelPlannerRegion_TravelPlanner_inpPointFr' target='_blank'>Skånetrafiken</a></div>",
				selectable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/kommunikation/busshallsplatshoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/kommunikation/busshallsplats.png"},
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
				displayName : 'Busslinjer',
				name: "ul_ovr_ul_busslinjer",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Busslinjer/html/busslinjer.htm",
				category : ["TRAFIK"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Busslinjer/html/bilder/legend_busslinjer_text.png"
					}
				},	

				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/ovriga_underlag/Busslinjer/html/bilder/legend_busslinjer_liten.png"}
				}
			},
			
			{
				displayName : 'Cykelväg',
				name: "cykelvag",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/kommunikation/cykelvag.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=cykelvag",
				category : ["TRAFIK"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				params : {
					layers: "malmows:GK_CYKELVAG_L",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 250,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Cykelväg</div>" +
					"<div class='popup-text1'>${objectid}</div>",
				selectable : false, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/kommunikation/cykelvaghoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/kommunikation/cykelvag.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Tågstation',
				name: "tagstation",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/kommunikation/Tagstation.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=tagstation",
				category : ["TRAFIK"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${objektnamn}"],
				params : {
					layers: "malmows:POI_TAG_STATION_PT",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 350,
					ratio: 1,
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Tågstation</div>" +
					"<div class='popup-text1'>${objektnamn}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://www.skanetrafiken.se?id=ctl00_travelPlannerRegion_TravelPlanner_inpPointFr' target='_blank'>Skånetrafiken</a></div>",
				selectable : true, getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/Kommunikation/tagstationhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/Kommunikation/tagstationNY.png"},
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
				displayName : 'Miljözon för tung trafik',
				name: "ul_risk_miljozon_tung_trafik",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Miljozon_tung_trafik/html/miljozon.htm",
				category : ["TRAFIK"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
					layers: "malmows:OP_UL_RISK_MILJOZON_TUNG_TRAFIK_P_AUG2013",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "1.0",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Miljozon_tung_trafik/html/bilder/legend_miljozon_text.png"
					}
				},	
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/4_underlag/risk_och_sakerhet/Miljozon_tung_trafik/html/bilder/legend_miljozon_liten.png"}
				}
			},	

			{
				displayName : 'Planstrategi karta',
				name: "ps_karta",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/1_planstrategi/planstrategi_karta/html/planstrategi_karta.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planstrategi"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				//URL: document.location.protocol + "//xyz.malmo.se/data_e/tilecache/malmo/",
				URL: document.location.protocol + "//kartor.malmo.se/wwwroot_data/tilecache/malmo/",
				//layer : "malmo_op2012_planstrategi_nov2012_verksamhet",
				layer : "malmo_op2012_planstrategi_nov2012_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 51,
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483],
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
						url: "http://kartor.malmo.se/op_data_aug_2013/1_planstrategi/planstrategi_karta/html/bilder/malmo_op_ps_karta_text.jpg" //"img/legend/malmo_op_vit.png"
					}
					
				},				
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/1_planstrategi/planstrategi_karta/html/bilder/malmo_op_ps_karta.jpg"}
				}
			},


			
			{
				displayName: 'Blandad stadsbebyggelse',
				name: "pr_bebyggelsa_blandad_stadsbebyggelse",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/blandad_stadsbebyggelse.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Bebyggelse"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/bilder/Legend_mini_blandad_stadsb_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/blandad_stadsbebyggelse/html/bilder/Legend_mini_blandad_stadsb.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/sarskilda_verksamhetsomr/html/sarskilda_verksamhetsomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Bebyggelse"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/sarskilda_verksamhetsomr/html/bilder/legend_verksh_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/1_bebyggelse/sarskilda_verksamhetsomr/html/bilder/legend_verksh_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/2_tathet/html/tathet.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Bebyggelse"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/2_tathet/html/bilder/Legend_mini_tathet_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/2_tathet/html/bilder/legend_mini_tathet.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/odlingslandskap/html/odlingslandskap.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Natur, rekreation, odling"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/odlingslandskap/html/bilder/Legend_mini_odling_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/odlingslandskap/html/bilder/legend_odling_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/park_natur/html/park_natur.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Natur, rekreation, odling"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/park_natur/html/bilder/legend_park_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/park_natur/html/bilder/legend_park_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/sarskilda_fritidsomr_begravnpl/html/sarskilda_fritidsomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Natur, rekreation, odling"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/sarskilda_fritidsomr_begravnpl/html/bilder/legend_fritid_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/sarskilda_fritidsomr_begravnpl/html/bilder/legend_fritid_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/grona_strak_och_kopplingar/html/grona_kopplingar.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Natur, rekreation, odling"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/grona_strak_och_kopplingar/html/bilder/legend_mini_gronastrakokopplingar_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/3_natur_rekreation_odling/grona_strak_och_kopplingar/html/bilder/legend_mini_gronastrakokopplingar.jpg"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/4_handel/html/handel.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Handel"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/4_handel/html/bilder/legend_handel_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/4_handel/html/bilder/legend_handel_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/kulturhistoriskt_vardefulla_miljoer/html/kulturhistoriskt_vardefulla_miljoer.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/kulturhistoriskt_vardefulla_miljoer/html/bilder/Legend_mini_vardefull_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/kulturhistoriskt_vardefulla_miljoer/html/bilder/Legend_mini_vardefull.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/sluten_kvartersstad/html/sluten_kvartersstad.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/sluten_kvartersstad/html/bilder/Legend_mini_sluten_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/sluten_kvartersstad/html/bilder/Legend_mini_sluten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/oppen_kvartersstad/html/oppen_kvartersstad.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/oppen_kvartersstad/html/bilder/Legend_mini_oppen_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/oppen_kvartersstad/html/bilder/Legend_mini_oppen.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/grannskapsenheter/html/grannskapsenheter.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/grannskapsenheter/html/bilder/Legend_mini_grannskap_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/grannskapsenheter/html/bilder/Legend_mini_grannskap.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/storskaliga_bostadsomr/html/storskaliga_bostadsomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/storskaliga_bostadsomr/html/bilder/Legend_mini_storskalig_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/storskaliga_bostadsomr/html/bilder/Legend_mini_storskalig.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/smaskalig_bebyggelse/html/smaskalig_bebyggelse.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/smaskalig_bebyggelse/html/bilder/Legend_mini_smaskalig_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/smaskalig_bebyggelse/html/bilder/Legend_mini_smaskalig.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/institutioner/html/institutioner.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/institutioner/html/bilder/Legend_mini_institutioner_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/institutioner/html/bilder/Legend_mini_institutioner.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/byar_och_storre_gardar/html/byar_storre_gardar.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Kulturmiljöer och bef. stadskaraktär"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/byar_och_storre_gardar/html/bilder/Legend_mini_landskap_byar_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/5_kulturhistoriskt_vardefull_miljo_stadskaraktar/byar_och_storre_gardar/html/bilder/Legend_mini_landskap_byar.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/utredningsomr_kustskydd/html/utredningsomr_kustskydd.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Hav, kust, vatten"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/utredningsomr_kustskydd/html/bilder/Legend_mini_kustskydd_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/utredningsomr_kustskydd/html/bilder/Legend_mini_kustskydd.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/strandskydd/html/strandskydd.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Hav, kust, vatten"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/strandskydd/html/bilder/Legend_mini_strandskydd_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/strandskydd/html/bilder/Legend_mini_strandskydd.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/3m_niva/html/tremetersgrans.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Hav, kust, vatten"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/3m_niva/html/bilder/Legend_mini_3m_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/6_hav_kust_vatten/3m_niva/html/bilder/Legend_mini_3m.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/1_fotgangarzoner/html/fotgangarzoner.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/1_fotgangarzoner/html/bilder/legend_fotg_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/1_fotgangarzoner/html/bilder/legend_fotg_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/2_huvudcykelstrak/html/trafik_cykel_huvud.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/2_huvudcykelstrak/html/bilder/legend_cykel_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/2_huvudcykelstrak/html/bilder/legend_cykel_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/3_kollektivtrafik/html/trafik_kollektiv_stomlinjer.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/3_kollektivtrafik/html/bilder/legend_kolltr_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/3_kollektivtrafik/html/bilder/legend_kolltr_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/4_huvudgator_trafikleder/html/trafik_gator_och_vagar.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/4_huvudgator_trafikleder/html/bilder/legend_huvudgator_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/4_huvudgator_trafikleder/html/bilder/legend_huvudgator_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/5_godsspar/html/godsspar.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/5_godsspar/html/bilder/legend_godsspar_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/5_godsspar/html/bilder/legend_godsspar_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/6_farligt_gods/html/farligtgods.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Trafik"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/6_farligt_gods/html/bilder/legends_farligtgods_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/7_trafik/6_farligt_gods/html/bilder/legends_farligtgods_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/vindkraft/html/vindkraft.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Teknisk försörjning"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/vindkraft/html/bilder/legend_vindkraft_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/vindkraft/html/bilder/legend_vindkraft_liten.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/biogasanlaggningar/html/biogasanlaggningar.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Teknisk försörjning"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/biogasanlaggningar/html/bilder/Legend_mini_biogas_med_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/biogasanlaggningar/html/bilder/Legend_mini_biogas.png"},
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
										externalGraphic: 'http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/biogasanlaggningar/html/bilder/triangel.png'
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/avfall/html/avfall.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Teknisk försörjning"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/avfall/html/bilder/legend_avfall_text.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/avfall/html/bilder/legend_avfall_liten.png"},
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
										externalGraphic: 'http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/avfall/html/bilder/avfallselect1.png'
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
										externalGraphic: 'http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/avfall/html/bilder/avfallselect2.png'
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
				// dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/va/html/va.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Teknisk försörjning"],
				// displayInLayerSwitcher: true,
				// URL: "http://kartor.malmo.se/geoserver/wms?",
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
						// url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/va/html/bilder/Legend_mini_va_med_text.png"
					// }
				// },		
				// style: {
					// "default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/8_teknisk_forsorjning/va/html/bilder/Legend_mini_va.png"}
				// }
			// },		
									
			{
				displayName : 'Amiralsgatan i Rosengård',
				name: "pr_so_amiralsgatan_rosengard",
				layerType : "wms",
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/amiralsgatan_rosengard/html/amiralsgatan_rosengard.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/amiralsgatan_rosengard/html/bilder/Legend_mini_amiralsgatan_rosengard_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/amiralsgatan_rosengard/html/bilder/Legend_mini_amiralsgatan_rosengard.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/annetorps_industriomrade/html/annetorps_industriomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/annetorps_industriomrade/html/bilder/Legend_mini_annetorps_industriomrade_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/annetorps_industriomrade/html/bilder/Legend_mini_annetorps_industriomrade.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/bunkeflostrand_ingvalla/html/bunkeflostrand_ingvalla.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/bunkeflostrand_ingvalla/html/bilder/Legend_mini_bunkeflostrand_ingvalla_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/bunkeflostrand_ingvalla/html/bilder/Legend_mini_bunkeflostrand_ingvalla.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/elinegard/html/elinegard.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/elinegard/html/bilder/Legend_mini_elinegard_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/elinegard/html/bilder/Legend_mini_elinegard.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fortuna_hemgarden/html/fortuna_hemgarden.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fortuna_hemgarden/html/bilder/Legend_mini_fortuna_hemgarden_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fortuna_hemgarden/html/bilder/Legend_mini_fortuna_hemgarden.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosieby_station/html/fosieby_station.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosieby_station/html/bilder/Legend_mini_fosieby_station_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosieby_station/html/bilder/Legend_mini_fosieby_station.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosiestraket/html/fosiestraket.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosiestraket/html/bilder/Legend_mini_fosiestraket_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/fosiestraket/html/bilder/Legend_mini_fosiestraket.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/glostorps_vang/html/glostorps_vang.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/glostorps_vang/html/bilder/Legend_mini_glostorps_vang_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/glostorps_vang/html/bilder/Legend_mini_glostorps_vang.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/hyllievang/html/hyllievang.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/hyllievang/html/bilder/Legend_mini_hyllievang_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/hyllievang/html/bilder/Legend_mini_hyllievang.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/jarnvagsverkstaderna/html/jarnvagsverkstaderna.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/jarnvagsverkstaderna/html/bilder/Legend_mini_jarnvagsverkstaderna_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/jarnvagsverkstaderna/html/bilder/Legend_mini_jarnvagsverkstaderna.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/klagshamn/html/klagshamn.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/klagshamn/html/bilder/Legend_mini_klagshamn_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/klagshamn/html/bilder/Legend_mini_klagshamn.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/kvarnby_husie_mosse/html/kvarnby_husie_mosse.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/kvarnby_husie_mosse/html/bilder/Legend_mini_kvarnby_husie_mosse_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/kvarnby_husie_mosse/html/bilder/Legend_mini_kvarnby_husie_mosse.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/limhamns_hamn_norra_on/html/limhamns_hamn.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/limhamns_hamn_norra_on/html/bilder/Legend_mini_limhamns_hamn_norra_on_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/limhamns_hamn_norra_on/html/bilder/Legend_mini_limhamns_hamn_norra_on.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/malmo_hamn/html/malmo_hamn.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/malmo_hamn/html/bilder/Legend_mini_malmo_hamn_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/malmo_hamn/html/bilder/Legend_mini_malmo_hamn.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/medeon/html/medeon_sjukhusomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/medeon/html/bilder/Legend_mini_medeon_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/medeon/html/bilder/Legend_mini_medeon.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/norra_sorgenfri/html/norra_sorgenfri.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/norra_sorgenfri/html/bilder/Legend_mini_norra_sorgenfri_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/norra_sorgenfri/html/bilder/Legend_mini_norra_sorgenfri.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/nyhamnen/html/nyhamnen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/nyhamnen/html/bilder/Legend_mini_nyhamnen_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/nyhamnen/html/bilder/Legend_mini_nyhamnen.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/oxie/html/oxie.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/oxie/html/bilder/Legend_mini_oxie_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/oxie/html/bilder/Legend_mini_oxie.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/petersborg/html/petersborg.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/petersborg/html/bilder/Legend_mini_petersborg_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/petersborg/html/bilder/Legend_mini_petersborg.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/pildammsvagen/html/pildammsvagen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/pildammsvagen/html/bilder/Legend_mini_pildammsvagen_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/pildammsvagen/html/bilder/Legend_mini_pildammsvagen.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/segeomradet/html/segeomradet.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/segeomradet/html/bilder/Legend_mini_segeomradet_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/segeomradet/html/bilder/Legend_mini_segeomradet.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/sofielunds_industriomrade/html/sofielunds_industriomr.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/sofielunds_industriomrade/html/bilder/Legend_mini_sofielunds_industriomr_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/sofielunds_industriomrade/html/bilder/Legend_mini_sofielunds_industriomr.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/tygelsjo/html/tygelsjo.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/tygelsjo/html/bilder/Legend_mini_tygelsjo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/tygelsjo/html/bilder/Legend_mini_tygelsjo.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/varvsstaden/html/varvsstaden.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/varvsstaden/html/bilder/Legend_mini_varvstaden_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/varvsstaden/html/bilder/Legend_mini_varvstaden.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vintrie/html/vintrie.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vintrie/html/bilder/Legend_mini_vintri_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vintrie/html/bilder/Legend_mini_vintrie.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vastra_klagstorp/html/vastra_klagstorp.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Planeringsriktlinjer","Särskilda geografiska områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vastra_klagstorp/html/bilder/Legend_mini_vastra_klagstorp_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/2_planeringsriktlinjer/9_sarskilda_geografiska_omraden/vastra_klagstorp/html/bilder/Legend_mini_vastra_klagstorp.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/kulturmiljo_alnarp.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Kulturmiljövård"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/kulturmiljo_malmo.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Kulturmiljövård"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/kulturmiljo_foteviken.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Kulturmiljövård"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/kulturmiljo_sallerup.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Kulturmiljövård"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kulturmiljo/html/bilder/Legend_mini_kulturmiljo.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/naturvard_backlandskapet.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Naturvård"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/bilder/Legend_mini_naturvard_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/bilder/Legend_mini_naturvard.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/naturvard_maklappen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Naturvård"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/bilder/Legend_mini_naturvard_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/naturvard/html/bilder/Legend_mini_naturvard.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/natura2000_limhamns_kalkbrott.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Natura 2000-områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/natura2000_tygelsjo_gessie.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Natura 2000-områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/natura2000_falsterbo.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Natura 2000-områden"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/natura_2000/html/bilder/Legend_mini_natura2000.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kustzon/html/kustzonen_kustzonen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Kustzonen"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kustzon/html/bilder/Legend_mini_kustzon_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/kustzon/html/bilder/Legend_mini_kustzon.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e6_trelleborg_stromstad.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e6_01_vastkustvagen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e6_01_spillepengen.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e20_malmo_goteborg_stockholm.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e22_trelleborg_norrkoping.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/vag_e65_malmo_ystad.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Väg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vag/html/bilder/Legend_mini_ri_vag.png"},
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
				// dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_arlov_malmo.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				// displayInLayerSwitcher: true,
				// URL: "http://kartor.malmo.se/geoserver/wms?",
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
				// dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_arlov_malmo.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				// displayInLayerSwitcher: true,
				// URL: "http://kartor.malmo.se/geoserver/wms?",
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_malmo_godsbangard.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_godsbangard_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_godsbangard.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_tagstationer.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_tagstation_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_tagstation.png"},
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
										externalGraphic: 'http://kartor.malmo.se/wwwroot_data/bilder/kartsymboler/tagstation.png'
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
				// URL: "http://kartor.malmo.se/geoserver/wms?",
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_arlov_malmo.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_arlov_malmo_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_arlov_malmo.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_godsstraket.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_svagertorp_ystad.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_ostervarn_bragarp.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_jarnvag.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/jarnvag_europabanan.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Järnväg"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_europabanan_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/jarnvag/html/bilder/Legend_mini_europabanan.png"},
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
				// URL: "http://kartor.malmo.se/geoserver/wms?",
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/farled_farled18.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Farled"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/farled_farled202.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Farled"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/farled_farled231.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Farled"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/farled_farled232.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Farled"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/farled/html/bilder/Legend_mini_farled.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/bilder/Legend_mini_hamn_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/bilder/Legend_mini_hamn.png"},
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
				// dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				// displayInLayerSwitcher: true,
				// URL: "http://kartor.malmo.se/geoserver/wms?",
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
				// dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				// displayInLayerSwitcher: true,
				// URL: "http://kartor.malmo.se/geoserver/wms?",
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
				// dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				// displayInLayerSwitcher: true,
				// URL: "http://kartor.malmo.se/geoserver/wms?",
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
				// dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				// displayInLayerSwitcher: true,
				// URL: "http://kartor.malmo.se/geoserver/wms?",
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
				// dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/hamn/html/ri_malmo_hamn.htm",
				// category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Malmö hamn"],
				// displayInLayerSwitcher: true,
				// URL: "http://kartor.malmo.se/geoserver/wms?",
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/yrkesfisket_havsomr_hollviken.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Yrkesfisket"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/yrkesfisket_havsomr_lillgrund.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Yrkesfisket"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/yrkesfisket_havsomr_utposten_kroken.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Yrkesfisket"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/yrkesfisket_limhamns_fiskehamn.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Yrkesfisket"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/yrkesfiske/html/bilder/Legend_mini_fiske.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vardefulla_amnen/html/vardefulla_amnen_kvarnby.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Värdefulla ämnen och material"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vardefulla_amnen/html/bilder/Legend_mini_vardefull_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/vardefulla_amnen/html/bilder/Legend_mini_vardefull.png"},
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
				dialogContent: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/forsvaret/html/forsvaret_malmo_ovningsfalt.htm",
				category : ["ÖVERSIKTSPLAN FÖR MALMÖ","Riksintressen","Försvar - samrådsområde"],
				displayInLayerSwitcher: true,
				URL: "http://kartor.malmo.se/geoserver/wms?",
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
						url: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/forsvaret/html/bilder/Legend_mini_forsvar_med_text.png"
					}
				},		
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/op_data_aug_2013/3_riksintressen/forsvaret/html/bilder/Legend_mini_forsvar.png"},
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
				displayName : 'Bladindelning 2000',
				name: "sma_arkiv_bladindelning_2000",
				layerType : "wms",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_arkiv_bladindelning_2000",
				category : ["ARKIV", "Bladindelning"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${name_2000}"],
				params : {
					layers: "malmows:SMA_ARKIV_BLADINDELNING_4000_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Bladindelning 2000</div>" +
					"<div class='popup-text1'>${name_2000}</div>",					
				selectable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Arkiv/bladindelning2000_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Arkiv/bladindelning2000.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Fastighet 2010-12-20',
				name: "sma_arkiv_fastigheter_2010_12_20_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Baskarta/fastigheter_arkiv_2010_12_20.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_arkiv_fastigheter_2010_12_20_p",
				category : ["ARKIV", "Fastighet"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${fastighet}"],
				params : {
					layers: "malmows:SMA_ARKIV_FASTIGHETER_3D_2010_12_20_P,malmows:SMA_ARKIV_FASTIGHETER_2010_12_20_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Fastighet 2010-12-20</div>" +
					"<div class='popup-text1'>${fastighet}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>",					
					selectable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Baskarta/fastigheter_arkiv_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Baskarta/fastigheter_arkiv.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Fastighet 2005-12-13',
				name: "sma_arkiv_fastigheter_2005_12_13_p",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Baskarta/fastigheter_arkiv_2005_12_13.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_arkiv_fastigheter_2005_12_13_p",
				category : ["ARKIV", "Fastighet"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${fastighet}"],
				params : {
					layers: "malmows:SMA_ARKIV_FASTIGHETER_2005_12_13_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Fastighet 2005-12-13</div>" +
					"<div class='popup-text1'>${fastighet}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>",					
					selectable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Baskarta/fastigheter_arkiv_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Baskarta/fastigheter_arkiv.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Fastighet 2001-10-09',
				name: "sma_arkiv_fastigheter_2001_10_09",
				layerType : "wms",
				//dialogContent: "http://161.52.9.230/metadata/Baskarta/fastigheter_arkiv_2001_10_09.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=sma_arkiv_fastigheter_2001_10_09",
				category : ["ARKIV", "Fastighet"],
				displayInLayerSwitcher: true,
				URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
				selectAttributes: ["${fastighet}"],
				params : {
					layers: "malmows:SMA_ARKIV_FASTIGHETER_2001_10_09_P",
					format: "image/png",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: false,
					opacity: "0.85",
					zIndex: 150,
					ratio: 1,
					transitionEffect: 'resize',
					singleTile : true
				},
				popup :
					"<div class='popup-header1'>Fastighet 2001-10-09</div>" +
					"<div class='popup-text1'>${fastighet}</div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</a></div>",					
					selectable : true, 
				getFeatureInfo: {geometryName: "geom"},
				geomType : 'area',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/Bilder/Baskarta/fastigheter_arkiv_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/Bilder/Baskarta/fastigheter_arkiv.png"},
					"select": {
						rules: [
						        new OpenLayers.Rule({
						        	filter: new OpenLayers.Filter.Comparison({
						        		type: OpenLayers.Filter.Comparison.EQUAL_TO
						        	}),
						        	// if a feature matches the above filter, use this style
						        	symbolizer: {
							        	fillColor: "#00FFFF",
										fillOpacity: 0.3,
							        	strokeColor: "#00FFFF",
							        	strokeWidth: 3
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
				displayName : 'Fotokarta 2012',
				name: "ol_fotokarta_2012",
				//dialogContent: "http://161.52.9.230/metadata/baskarta/fotokarta_2011.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=ol_fotokarta_2012",
				category : ["ARKIV", "Fotokarta"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_ortofoto_2012_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 60,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/baskarta/fotokarta_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/baskarta/fotokarta.png"}
				}
			},

			{
				displayName : 'Malmö 1757',
				name: "hist_karta_1757_malmo",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1757_malmo",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1757_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1757.png"}
				}
		},


		{
				displayName : 'Förnyad plan 1811',
				name: "1811_fornyad_plan",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1811_fornyad_plan",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1811_fornyad_plan",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1811_fornyad_plan.PNG"}
				}
		},

		{
				displayName : 'Rekognosceringskarta 1812',
				name: "1812_rek_karta",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1812_rek_kartan",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:rekognosceringskarta_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1812_rek_kartan.PNG"}
				}
		},
		
		{
				displayName : 'Malmö 1853',
				name: "1853_malmo",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1853_malmo",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1853_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1853_malmo.PNG"}
				}
		},

		
			{
				displayName : 'Plan af Malmö - 1860-talet',
				name: "hist_karta_plan_utv_1860",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1860_talet_plan_utvidgning",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1860_talet_plan_utvidgning",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1860_talet.png"}
				}
		},

		{
				displayName : 'Malmö 1871',
				name: "malmo_1871",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1871_malmo",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_kart_1871_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1871_malmo.png"}
				}
		},		
		
		{
				displayName : 'Malmö 1875',
				name: "malmo_1875",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1875_malmo",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_kart_1875_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1875_malmo.png"}
				}
		},
		
		{
				displayName : 'Malmö 1878',
				name: "malmo_1878",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1878_malmo",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1878_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1878_malmo.png"}
				}
		},				

		{
				displayName : 'Malmö 1897',
				name: "malmo_1897",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1897_malmo",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1897_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1897_malmo.png"}
				}
		},				

		{
				displayName : 'Förslag slottsparken 1897',
				name: "forslag_slottsparken_1897",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1897_forslag_slottsparken",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1897_forslag_slottsparken",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1897_forslag_slottsparken.png"}
				}
		},				

		{
				displayName : 'Förslag stadsplan 1903',
				name: "forslag_stadsplan_1903",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1903_forslag_stadsplan",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1903_forslag_stadsplan",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1903_forslag_stadsplan.png"}
				}
		},				

		{
				displayName : 'Häradskartan 1912',
				name: "haradskartan_1912_overlay",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1912_haradskartan",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:haradskartan",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1912_haradskartan.PNG"}
				}
		},			


		{
				displayName : 'Pharus plan 1914',
				name: "pharus_plan_1914",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1914_pharus_plan",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1914_pharus_plan",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1914_pharus_plan.png"}
				}
		},			
		
		{
				displayName : 'Översiktsplan 1913',
				name: "oversiktsplan_1913",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1913_oversiktsplan",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1913_oversiktsplan",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1913_oversiktsplan.PNG"}
				}
		},			

		{
				displayName : 'Malmö 1917',
				name: "malmo_1917",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1917_malmo",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1917_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1917_malmo.PNG"}
				}
		},


				{
				displayName : 'Bulltofta 1926',
				name: "bulltofta_1926",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1926_bulltofta",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1926_bulltofta",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1926_bulltofta.png"}
				}
		},				

		{
				displayName : 'Spårvägar 1931',
				name: "sparvagar_1931",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1931_sparvagar",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1931_sparvagar",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1931_sparvagar.PNG"}
				}
		},				

				{
				displayName : 'Malmö 1947',
				name: "malmo_1947",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1947_malmo",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1947_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1947_malmo.PNG"}
				}
		},			

		{
				displayName : 'Malmö 1974',
				name: "malmo_1974",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_1974_malmo",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_1974_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_1974_malmo.PNG"}
				}
		},			

		{
				displayName : 'Stadsbuss 2000',
				name: "stadsbuss_2000",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_2000_stadsbuss",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_2000_linjekarta_stadsbussar",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_2000_buss.PNG"}
				}
		},			

		
		{
				displayName : 'Malmö 2004',
				name: "malmo_2004",
				layerType : "wms",
				displayInLayerSwitcher: true,
				dialogContent: "http://kartor.malmo.se/metadata/metadata.aspx?id=hist_karta_2004_malmo",
				category : ["ARKIV", "Karta"],
				URL: "http://kartor.malmo.se/geoserver/wms?",
				params : {
						layers: "malmows:hist_karta_2004_malmo",
						format: "image/gif",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: false,
					opacity: "1.0",
					zIndex: 51,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : false
				},
				style: {
					"default": {externalGraphic: "http://kartor.malmo.se/metadata/legender/hist_karta_2004_malmo.png"}
				}
		},

			
			{
				displayName : 'Fotokarta 2011',
				name: "ol_fotokarta_2011",
				//dialogContent: "http://161.52.9.230/metadata/baskarta/fotokarta_2011.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=ol_fotokarta_2011",
				category : ["ARKIV", "Fotokarta"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_ortofoto_2011_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 60,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/baskarta/fotokarta_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/baskarta/fotokarta.png"}
				}
			},
			
			{
				displayName : 'Fotokarta 2010',
				name: "ol_fotokarta_2010",
				//dialogContent: "http://161.52.9.230/metadata/baskarta/fotokarta_2010.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=ol_fotokarta_2010",
				category : ["ARKIV", "Fotokarta"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_ortofoto_2010_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 60,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/baskarta/fotokarta_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/baskarta/fotokarta.png"}
				}
			},	
			
			{
				displayName : 'Fotokarta 2007',
				name: "ol_fotokarta_2007",
				//dialogContent: "http://161.52.9.230/metadata/baskarta/fotokarta_2007.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=ol_fotokarta_2007",
				category : ["ARKIV", "Fotokarta"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_ortofoto_2007_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 60,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/baskarta/fotokarta_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/baskarta/fotokarta.png"}
				}
			},	
			
			{
				displayName : 'Fotokarta 2004',
				name: "ol_fotokarta_2004",
				//dialogContent: "http://161.52.9.230/metadata/baskarta/fotokarta_2004.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=ol_fotokarta_2004",
				category : ["ARKIV", "Fotokarta"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_ortofoto_2004_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 60,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/baskarta/fotokarta_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/baskarta/fotokarta.png"}
				}
			},
			
			{
				displayName : 'Fotokarta 2001',
				name: "ol_fotokarta_2001",
				dialogContent: "http://161.52.9.230/metadata/baskarta/fotokarta_2001.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=ol_fotokarta_2001",
				category : ["ARKIV", "Fotokarta"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_ortofoto_2001_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 60,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/baskarta/fotokarta_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/baskarta/fotokarta.png"}
				}
			},	
			
			{
				displayName : 'Fotokarta 1998',
				name: "ol_fotokarta_1998",
				//dialogContent: "http://161.52.9.230/metadata/baskarta/fotokarta_1998.html",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=ol_fotokarta_1998",
				category : ["ARKIV", "Fotokarta"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_ortofoto_1998_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					zIndex: 60,
					isBaseLayer : false,
					opacity: "0.85",
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				selectable : false,
				geomType : 'polygon',
				startVisible : false,
				legend : {
					hover: {
						url: "http://161.52.9.230/bilder/baskarta/fotokarta_hoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/baskarta/fotokarta.png"}
				}
			},

			{
				displayName : 'Tidigare översiktsplan',
				name: "oversiktsplan_2005",
				dialogContent: "http://sbkspace.malmo.se/metadata/metadata.aspx?id=oversiktsplan_2005",
				category : ["ARKIV", "Planer"],
				displayInLayerSwitcher: true,
				//tooltip: "Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum Lorem lopsum",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_op2005_verksamhet",
				layerType : "tilecache",
				params : {},
				options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
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
						url: "http://161.52.9.230/bilder/planera/oversiktsplanhoover.png"
					}
				},		
				copyright : [],
				style: {
					"default": {externalGraphic: "http://161.52.9.230/bilder/planera/oversiktsplan.png"}
				}
			}			

		],
																											
			baselayers : [
					
		{
				displayName : 'Stadskarta',
				name: "stadskartan",
				layerType : "wms",
				category : "Karta",
				//URL: "http://kartor.malmo.se/arcgis/services/atlas_malmo_karta/MapServer/WMSServer",
				URL: "http://kartor.malmo.se/arcgis/services/malmokarta_ej_adress_wms/MapServer/WMSServer",
				params : {
						//layers: "0,2,3,4,5,7,8,9,11,12,13,14,15,16,17,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,45,46,48,50,52,54,56,57,59,60,62,63,65,66,67,69,70,72,73,75,76,77,78,79,80,81",
						//layers: "0,2,3,4,5,7,8,9,11,12,13,14,15,16,17,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,45,46,80,81,82,83",
						layers: "0",
						format: "image/png",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: true,
					//opacity: "0.85",
					zIndex: 50,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : true
				}
		},		

		{
				displayName : 'Stadskarta, nedtonad',
				name: "stadskartan_nedtonad",
				layerType : "wms",
				category : "Karta",
				//URL: "http://kartor.malmo.se/arcgis/services/atlas_malmo_karta/MapServer/WMSServer",
				URL: "http://kartor.malmo.se/arcgis/services/malmokarta_sv_wms/MapServer/WMSServer",
				params : {
						//layers: "0,2,3,4,5,7,8,9,11,12,13,14,15,16,17,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,45,46,48,50,52,54,56,57,59,60,62,63,65,66,67,69,70,72,73,75,76,77,78,79,80,81",
						//layers: "0,2,3,4,5,7,8,9,11,12,13,14,15,16,17,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,45,46,80,81,82,83",
						layers: "0",
						format: "image/png",
						transparent: "true",
						version: "1.1.1"
				}, 				
				options : {
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					isBaseLayer: true,
					//opacity: "0.85",
					zIndex: 50,
					buffer : 0,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
					//attribution : "© Malmö Stadsbyggnadskontor",
					singleTile : true
				}
		},		
/*							
			{
				displayName : "Stadskarta",
				name : "stadskartan",  // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_karta_verksamhet",
				//layer : "malmo_karta_verksamhet_2014",
				layerType : "tilecache",
				category : "Karta",
					options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					//maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					//maxExtent: new OpenLayers.Bounds(100000,6150000,135000,6170000),
					maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
					zIndex: 50,
					//opacity: "0.7",
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret 2013, Malmö stad</a>"
					
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},
*/
			
			/*
			{
				displayName : "Stadskarta",
				name : "stadskartan",  // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				 URL: "http://sbkvmgeoserver:8080/geoserver/gwc/service/tms/",
				 layerType : "TMS",
				 category : "Karta",
				 options : {
						layername: "malmows:topo_op_group",
						type: "png",
						buffer : 0,
						antialias : true,
						transitionEffect : "null",
						isBaseLayer : true,
						tileOrigin : new OpenLayers.LonLat(97000,6148000), 
						resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483],
						maxExtent: new OpenLayers.Bounds(97000,6148000,139000,6175000),
						zIndex: 50,
						attribution : "© Malmö stadsbyggnadskontor (Malmö stad), © Lantmäteriet (Omgivande kommuner) "
				 }
			},
*/			
			
			{
				displayName : "Höjdkarta 2010",
				name : "hojdkarta",  
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_terrangmodell_verksamhet",
				layerType : "tilecache",
				category : "Karta",
					options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					zIndex: 50,
					buffer : 0,
					transitionEffect : 'resize',
					format : "image/jpg",
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
					
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},
/*
			{
				displayName : "Topogr karta, jan 2014",
				 name : "topografisk_webbkarta_tms",
				 URL: "http://sbkvmgeoserver:8080/geoserver/gwc/service/tms/",
				 layerType : "TMS",
				 category : "Karta",
				 options : {
						layername: "malmows:topowebbkartan",
						type: "png",
						buffer : 0,
						transitionEffect : "null",
						isBaseLayer : true,
						tileOrigin : new OpenLayers.LonLat(97000,6148000), 
						resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483],
						maxExtent: new OpenLayers.Bounds(97000,6148000,150000,6185000),
						zIndex: 50,
						attribution : "© Lantmäteriet"
				 }
			},

			{
				displayName : "Topogr karta, nedtonad, jan 2014",
				 name : "topografisk_webbkarta_nedtonad_tms",
				 URL: "http://sbkvmgeoserver:8080/geoserver/gwc/service/tms/",
				 layerType : "TMS",
				 category : "Karta",
				 options : {
						layername: "malmows:topowebbkartan_nedtonad",
						type: "png",
						buffer : 0,
						transitionEffect : "null",
						isBaseLayer : true,
						tileOrigin : new OpenLayers.LonLat(97000,6148000), 
						resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483],
						maxExtent: new OpenLayers.Bounds(97000,6148000,150000,6185000),
						zIndex: 50,
						attribution : "© Lantmäteriet"
				 }
			},
*/
			
			{
				displayName : "Häradskartan 1912",
				name : "haradskartan_1912",  // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_haradskartan_1912_verksamhet",
				layerType : "tilecache",
				category : "Karta",
				
					options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					zIndex: 50,
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
					
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},			

			{
				displayName : "Rekognosceringsk. 1812",
				name : "reko_kartan_1812",  // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_reko_kartan_1812_verksamhet",
				layerType : "tilecache",
				category : "Karta",
				
					options : {
					resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
					zIndex: 50,
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
					
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},						


/*		
			{
				displayName : "Skånekarta 2010",
				name : "skanekartan",  // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				URL: document.location.protocol + "//fkmap3.malmo.se/tilecache-static/",
				//URL: document.location.protocol + "//http://tilecache.smap.se/",
				layer : "skanekartan",
				//layer : "skane_karta_sr99_1330",
				layerType : "tilecache",
				category : "Karta",
				options : {
					//resolutions : [67.733504, 50.800128, 33.866752, 25.400064, 16.933376, 12.700032, 8.466688, 4.233344, 2.116672, 1.058336, 0.529168, 0.26458483, 0.132292415, 0.066146208],
					resolutions : [64, 48, 32, 24, 16, 12, 8, 4, 2, 1], 
					maxExtent: new OpenLayers.Bounds(110000,6151000,138100,6170100),
					zIndex: 50,
					buffer : 0,
					transitionEffect : null,
					format : "image/png",
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
			},			
*/	
			{
				displayName : "Vit bakgrund",
				name : "malmo_karta_vit",
				URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
				layer : "malmo_karta_verksamhet_vit",
				layerType : "tilecache",
				category : "Karta",
				options : {
				resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415,0.1058336,0.066146208,0.026458483],
				maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
				zIndex: 50,
				buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					isBaseLayer : true
				},
				copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
			},		

		{
				displayName : 'Malmö 2014',
				name: "malmo_orto_2014",
				layerType : "wms",
				category : "Fotokarta",
				URL: "http://kartor.malmo.se/geoserver/malmows/wms?",
				params : {
					layers: "malmows:malmo_orto",  //senaste orto ska heta malmo_orto 
					format: "image/jpeg",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: true,
					opacity: "0.85",
					zIndex: 50,
					ratio: 1,
					transitionEffect: 'resize',
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Lantmäteriet</a>",
					singleTile : true
				},
				geomType : 'area',
				startVisible : false
		},				
			
			
		{
			displayName : "Malmö 2013",
			name : "malmo_orto",
			URL: document.location.protocol + "//kartor.malmo.se/wwwroot_data/tilecache/malmo/",
			layer : "malmo_ortofoto_2013_verksamhet",
			layerType : "tilecache",
			category : "Fotokarta",
			options : {
			resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415,0.066146208],
			maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
			zIndex: 50,
			buffer : 0,
			transitionEffect : null,
			format : "image/jpg",
			attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
			isBaseLayer : true
			},
			copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
		},		

			
		{
			displayName : "Malmö 2012",
			name : "malmo_orto_2012",
			URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
			layer : "malmo_ortofoto_2012_verksamhet",
			layerType : "tilecache",
			category : "Fotokarta",
			options : {
			resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415],
			maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
			zIndex: 50,
			buffer : 0,
			transitionEffect : null,
			format : "image/jpg",
			attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Lantmäteriet</a>",
			isBaseLayer : true
			},
			copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
		},		
			
		{
			displayName : "Malmö 2011",
			name : "malmo_orto_2011",
			URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
			layer : "malmo_ortofoto_2011_verksamhet",
			layerType : "tilecache",
			category : "Fotokarta",
			options : {
			resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415],
			maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
			zIndex: 50,
			buffer : 0,
			transitionEffect : null,
			format : "image/jpg",
			attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Lantmäteriet</a>",
			isBaseLayer : true
			},
			copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
		},		

			{
			displayName : "Malmö 2010",
			name : "malmo_orto_2010",
			URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
			layer : "malmo_ortofoto_2010_verksamhet",
			layerType : "tilecache",
			category : "Fotokarta",
			options : {
			resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415],
			maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
			zIndex: 50,
			buffer : 0,
			transitionEffect : null,
			format : "image/jpg",
			attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>",
			isBaseLayer : true
			},
			copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
		},		
			
		{
			displayName : "Malmö 2007",
			name : "malmo_orto_2007",
			URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
			layer : "malmo_ortofoto_2007_verksamhet",
			layerType : "tilecache",
			category : "Fotokarta",
			options : {
			resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415],
			maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
			zIndex: 50,
			buffer : 0,
			transitionEffect : null,
			format : "image/jpg",
			attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Lantmäteriet</a>",
			isBaseLayer : true
			},
			copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
		},	

		{
			displayName : "Malmö 2004",
			name : "malmo_orto_2004",
			URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
			layer : "malmo_ortofoto_2004_verksamhet",
			layerType : "tilecache",
			category : "Fotokarta",
			options : {
			resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415],
			maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
			zIndex: 50,
			buffer : 0,
			transitionEffect : null,
			format : "image/jpg",
			attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Lantmäteriet</a>",
			isBaseLayer : true
			},
			copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
		},		
		
		{
			displayName : "Malmö 2001",
			name : "malmo_orto_2001",
			URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
			layer : "malmo_ortofoto_2001_verksamhet",
			layerType : "tilecache",
			category : "Fotokarta",
			options : {
			resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415],
			maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
			zIndex: 50,
			buffer : 0,
			transitionEffect : null,
			format : "image/jpg",
			attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Lantmäteriet</a>",
			isBaseLayer : true
			},
			copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
		},		

		{
			displayName : "Malmö 1998",
			name : "malmo_orto_1998",
			URL: document.location.protocol + "//161.52.9.230/tilecache/malmo/",
			layer : "malmo_ortofoto_1998_verksamhet",
			layerType : "tilecache",
			category : "Fotokarta",
			options : {
			resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415],
			maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
			zIndex: 50,
			buffer : 0,
			transitionEffect : null,
			format : "image/jpg",
			attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Lantmäteriet</a>",
			isBaseLayer : true
			},
			copyright : [ "Lantmäteriet", "http://www.lantmateriet.se" ]
		},	

		{
				displayName : 'Malmö 1973',
				name: "malmo_orto_1973",
				layerType : "wms",
				category : "Fotokarta",
				URL: "http://kartor.malmo.se/geoserver/malmows/wms?",
				params : {
					layers: "malmows:malmo_orto_1973",
					format: "image/jpeg",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: true,
					opacity: "0.85",
					zIndex: 50,
					ratio: 1,
					transitionEffect: 'resize',
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Lantmäteriet</a>",
					singleTile : true
				},
				geomType : 'area',
				startVisible : false
		},				
		
		{
				displayName : 'Malmö 1960',
				name: "malmo_orto_1960",
				layerType : "wms",
				category : "Fotokarta",
				URL: "http://kartor.malmo.se/geoserver/malmows/wms",
				params : {
					layers: "malmows:malmo_orto_1960",
					format: "image/jpeg",
					transparent: "true"
				}, 
				options : {
					isBaseLayer: true,
					opacity: "0.85",
					zIndex: 50,
					ratio: 1,
					transitionEffect: 'resize',
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Lantmäteriet</a>",
					singleTile : true
				},
				geomType : 'area',
				startVisible : false
			},
		

		{
			displayName : "Malmö 1938-1947",
			name : "orto1940",
			URL : document.location.protocol + '//kartor.malmo.se/wwwroot_data/tilecache/malmo/',
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
		},		
		
		//		{
//			 displayName : "Ulf TMS",
//			 name : "ulf_tms",
//			 URL: "http://161.52.9.230:8080/geoserver/gwc/service/tms/",
//			 layerType : "TMS",
//			 category : "Karta",
//			 options : {
//					layername: "malmows:SMA_ARKIV_FASTIGHETER_2005_12_13_P",
//					type: "png",
//					buffer : 0,
//					transitionEffect : "resize",
//					isBaseLayer : true,
//					tileOrigin : new OpenLayers.LonLat(110000,6151000), 
//					//resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415],
//					//maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
//					attribution : "<a href='http://www.kristianstad.se' target='_blank'>© Kristianstads kommun</a>"
//			 }
//		},

//		{
//			 //glöm inte att plocka bort matrixIDs i början av filen
//			 displayName : "Ulf WMTS",
//			 name : "ulf_wmts",
//			 url: "http://161.52.9.230:8080/geoserver/gwc/service/wmts/",
//			 layerType : "WMTS",
//			 category : "Karta",
//			 options : {
//					layername: "malmows:SMA_ARKIV_FASTIGHETER_2005_12_13_P",
//					type: "png",
//					buffer : 0,
//					transitionEffect : "resize",
//					isBaseLayer : true,
//					matrixSet: "epsg_3008_v",
//					matrixIds: matrixIds,
//					topLeftCorner: new OpenLayers.LonLat(110000.0,6185680.0),
//					//TileMatrixSet: "epsg_3008_v",
//					//tileOrigin : new OpenLayers.LonLat(110000,6151000), 
//					//resolutions : [67.733504,50.800128,33.866752,25.400064,16.933376,12.700032,8.466688,4.233344,2.116672,1.058336,0.529168,0.26458483,0.132292415],
//					//maxExtent: new OpenLayers.Bounds(110000,6151000,128100,6169100),
//					attribution : "<a href='http://www.kristianstad.se' target='_blank'>© Kristianstads kommun</a>"
//			 }
//		},

	
		{
				displayName : "Skåne 2010",
				name : "skane_fotokarta_2010",  // ska ej vara årtal på "name", om vi har med årtal kommer gamla länkar inte funka om vi byter till nytt ortofoto
				URL: document.location.protocol + "//fkmap.malmo.se/tilecache/",
				layer : "skaneorto2",
				layerType : "tilecache",
				category : "Fotokarta",
				options : {
					resolutions : [64, 48, 32, 24, 16, 12, 8, 4, 2, 1, 0.5, 0.25], 
					maxExtent: new OpenLayers.Bounds(100000,6130000,170000,6190000),
					zIndex: 50,
					buffer : 0,
					transitionEffect : null,
					format : "image/jpg",
					isBaseLayer : true,
					attribution : "<a href='mailto:stadsatlas@malmo.se?subject=Stadsatlas'>© Stadsbyggnadskontoret, Malmö stad</a>"
				},
				copyright : [ "Malmö stadsbyggnadskontor", "mailto:stadsatlas@malmo.se?subject=Stadsatlas" ]
		}

		]
	},

	
	modules : 
	[
	 	{
			init : sMap.Module.Toolbar,
			config : {
				side: "right"
			}
		},
		{
			init: sMap.Module.LinkTo,
			config: {
				displayName: "Hjälp",
				toolbarIndex: 1,
				content: "http://161.52.9.230/dokument/hjalp/hjalp.htm",
				dialog: {
					title: "Hjälp",
					width: "720",
					height: "600",
					resizable: false
				}
			}
		},
		{
			init : sMap.Module.SPrint,
			config : {
				toolbarIndex: 2,
				addToToolsMenu: false
			}
		},
		{
			init : sMap.Module.ToolsMenu,
			config : {
				toolbarIndex : 3,
				menuBtns : [					
		            {
		            	menuId : "simple",
		            	lblText : "Verktyg",
		            	toolbarIndex : 4/* ,
		            	marginRight: 210 */
		            },
					{
						menuId : "adv",
						lblText : "Visa",
						toolbarIndex : 5
					}
				]
			}
		},
		{
			init : sMap.Module.FeatureRequester,
			config : {
			}
		},
		{
			init : sMap.Module.Select,
			config : {
				addSelectWithKey: true,
				dialogIfMany: true,
				multiple: true,
				forceOne: false
			}
		},
		{
			init : sMap.Module.SelectResult,
			config : {
				selectOnDblClick : true,
				report: true,
				addToToolsMenu: "adv",
				_noListenMods: ["BlixtenPopup2"]
			}
		},
		{
			init : sMap.Module.Popup,
			config : {
				allowDrag: false
			}
		},
		{
			init : sMap.Module.CustomLayers,
			config : {
				layers: {
					"Produkter": [
						{
							displayName: "Lagerkartan med åäö",
							params: "ol=sma_befolkning_p100,sma_delomrade_p,sma_nyckelkodsomraden_p&bl=stadskartan"
						},
						{
							displayName: "Superkartan",
							params: "center=118171.904,6164167.5257285&zoom=7&ol=sma_stadsomrade_p&bl=malmo_orto_2014"
						}
					]
				}
			}
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
				zoomLevel : 8,
				startText : "Ange adress eller plats",
				dropDownOption: false,
//				autoCompleteScriptUrl : "http://xyz.malmo.se/WS/mKarta/autocomplete_v.ashx?",
//				searchScriptUrl : "http://xyz.malmo.se/WS/mKarta/sokexakt_v.ashx",
				autoCompleteScriptUrl : "http://kartor.malmo.se/WS/search-1.0/autocomplete_v.ashx?",
				searchScriptUrl : "http://kartor.malmo.se/WS/search-1.0/sokexakt_v.ashx",
				displayName : "Sökning",
				encSpace: "%2b",
				poiLayer: {
					popup: "<div class='popup-header1'>${name}</div>" +
						"<a class='popup-text1' href='${url}' target='_blank'>Visa information</a><br>" +
						"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${easting};${northing}' target='_blank'>Visa snedbild</div></a>" +
						"<div class='popup-text2'>&nbsp;</div>" + 
						"<div class='popup-text2'>${stadsomr}</div>" + 						
						"<div class='popup-text2'>${delomr}</div>" +
						"<div class='popup-text2'>${fast}</div>" +
						"<div class='popup-text2'>${forsamling}</div>" +
						"<div class='popup-text2'>${valkrets}</div>" +
						"<div class='popup-text2'>${valdistr_c}</div>" +
						"<div class='popup-text2'>${iv_siffr}</div>"
					}
			
			
			
			
				// toolbarIndex : 6,
				// dropDownOption: false,
				//autoCompleteScriptUrl : "../../../../cgi-bin/proxy/proxy.py?url=" + "http://xyz.malmo.se/WS/mKarta/autocomplete_v.ashx?",
				// autoCompleteScriptUrl : "http://sbkvmgeoserver.malmo.se/cgi-bin/proxy/proxy.py?url=" + "http://xyz.malmo.se/WS/mKarta/autocomplete_v.ashx?",
				// searchScriptUrl : "http://xyz.malmo.se/WS/mKarta/sokexakt_v.ashx",
				// poiLayer: {
					// popup: "<div class='popup-header1'>${name}</div>" +
						// "<a class='popup-text1' href='${url}' target='_blank'>Visa information</a><br>" +
						// "<a class='popup-text1' href='${url_snedbild}' target='_blank'>Visa snedbild</a><br>" +
						// "<div class='popup-text2'>&nbsp;</div>" + 
						// "<div class='popup-text2'>${stadsomr}</div>" + 						
						// "<div class='popup-text2'>${delomr}</div>" +
						// "<div class='popup-text2'>${fast}</div>" +
						// "<div class='popup-text2'>${forsamling}</div>" +
						// "<div class='popup-text2'>${valkrets}</div>" +
						// "<div class='popup-text2'>${valdistr_c}</div>" +
						// "<div class='popup-text2'>${iv_siffr}</div>"
					// }
			}
		},
		{
			init : sMap.Module.MeasureDialog,
			config : {
				dialogStartPosition : [240, 100],
				addToToolsMenu: "simple",
				decimals_m : 1
			
			}
		},
/*
		{
			init : sMap.Module.RedirectClick,
			config : {
				displayName : 'Visa Gatuvy',
				url: "http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${x}&posy=${y}",
				overrideName: "gatuvy",
				btnLabel: "Gatuvy",
//				btnHover: "Verktyg för att se gatuvy",
				buttonId: "redirect-gatuvy",
				buttonCss: "ui-icon-arrowstop-1-e",
				toolbarIndex : 2,
				mouseMoveText: "Klicka i kartan för att se gatuvy"				
			}
		},
*/
		{
			init : sMap.Module.RedirectClick,
			config : {
				displayName : 'Gatuvy',
				addToToolsMenu: "adv",
				url: "http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${x}&posy=${y}",
				overrideName: "gatuvy2",
				btnLabel: "Gatuvy2",
//				btnHover: "Verktyg för att se gatuvy",
				buttonId: "redirect-gatuvy2",
				buttonCss: "ui-icon-arrowstop-1-e",
				mouseMoveText: "Klicka i kartan för att se gatuvy"				
			}
		},

		{
			init : sMap.Module.RedirectClick,			
			config : {
				displayName : 'Snedbild',
				addToToolsMenu: "adv",
				url: "http://kartor.malmo.se/urbex/index.htm?p=true&xy=${x};${y}",
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
				displayName: "Fler kartor",
				content: "http://www.malmo.se/kartor",
				addToToolsMenu: "adv",
				dialog: false
			}
		},
		
		
		{
			init : sMap.Module.Pizza,
			config : {}
		},
/* 		{
			init : sMap.Module.Print,
			config : {
				addToToolsMenu: "simple",
				webContentRoot: "rest/1.0/map-dev/",
				publicExportFolder: "http://xyz.malmo.se/data_e/smap_export/",
				privateExportFolder: "E:/data_e/smap_export/",
				printScriptsFolderPath: "http://xyz.malmo.se/WS/rest-1.0/print/" // "http://localhost/cgi-bin/proxy.py?url="+
			}
		}, */
		
		{
			init : sMap.Module.Draw,
			config : {
				addToToolsMenu: "simple"
			}
		},

		{
			init : sMap.Module.Opacity,
			config : {
				addToToolsMenu: "simple"
			}
		},
		{
			init : sMap.Module.CopyLink,
			config : {
				addToToolsMenu: "simple"
			}
		},
/*
		{
			init : sMap.Module.Email,
			config : {
				eMailURL: "http://kartor.smap.se/cgi-bin/email/smapSendEmail.py?",
				eMailTo: "toEmail=",
				eMailSubject: "subject=",
				eMailMsg: "msg=",
				addToToolsMenu: "simple"
			}
		},
*/
		{
			init : sMap.Module.RedirectClick,			
			config : {
				displayName : 'Registrering NBK',
				addToToolsMenu: "simple",
				url: "http://sbkspace.malmo.se/nbk/nbkinsert.aspx?easting=${x}&northing=${y}",
				buttonId: "redirect-nbk",
				buttonCss: "ui-icon-pencil",
				mouseMoveText: "Klicka i kartan för att registrera nbk"
			}
		},
		{
			init : sMap.Module.RedirectClick,			
			config : {
				displayName : 'Registrering DP',
				addToToolsMenu: "simple",
				url: "http://sbkspace.malmo.se/sbkplan/editPlan.aspx?easting=${x}&northing=${y}",
				buttonId: "redirect-dp",
				buttonCss: "ui-icon-pencil",
				mouseMoveText: "Klicka i kartan för att registrera dp"
			}
		},
		/* {
			init : sMap.Module.ExtractClick,
			config : {
				addToToolsMenu: "simple", //"adv"
				displayName : 'Registrering NBK',
				extractLayerConfig: {
					name: "extractclick_fastighet",
					layerType : "wms",
					displayInLayerSwitcher: false,
					URL: "http://161.52.9.230:8080/geoserver/malmows/wms?",
					params : {
						layers: "malmows:SMA_TRAKT_P,malmows:SMA_FASTYTA_3D_P,malmows:SMA_SUM_FASTYTA_P",
						format: "image/png",
						transparent: "true"
					},
					options : {
						isBaseLayer: false,
						opacity: "0",
						zIndex: 150,
						ratio: 1,
						transitionEffect: 'resize',
						singleTile : true
					},
					getFeatureInfo: {geometryName: "geom"}
				}
			}
		}, */
		
/* 		{
			init: sMap.Module.Blixten,
			config: {
				margin: 406,
				addToToolsMenu: "adv"
			}
		}, */


		{
			init: sMap.Module.Blixten,
			config: {
				//toolbarIndex: 0,
				addToToolsMenu: "simple",
				margin: 406,
				useProxy: true
			}
		},
		{
			init: sMap.Module.BlixtenPopup2,
			config: {
				categories: planApp.categories
			}
		},

		
		
/*		 {
			init : sMap.Module.ConfigSelector,
			config : {
				toolbarIndex : 0,
				addToToolsMenu : false,
				dropDownItems : {
					
					"FASTPLAN": {
				   		file : "configs/atlas_v_higgins5.js",
				   		name : "Fastighet & detaljplan",
				   		ol   : "sma_sum_fastyta_p,sma_planomr_p",
				   		bl   : "stadskartan"
					},
					"BASKARTA1": {
				   		name : "Baskarta ( > 1:4000 )",
				   		file : "configs/atlas_v_higgins5.js",
				   		ol   : "sma_bk_byggnader,sma_sum_fastyta_p_baskarta,granspunkt,sma_bk_vag_linjer",
				   		bl   : "malmo_karta_vit"
				    },
					"SKANEKARTA": {
				   		name : "Skånekarta",
				   		file : "configs/atlas_v_higgins5.js",
				   		ol   : "",
				   		bl   : "skanekartan"
				   	},
					"STADSKARTA": {
				   		file : "configs/atlas_v_higgins5.js",
				   		name : "Stadskarta",
				   		ol   : "",
				   		bl   : "stadskartan"
				   	}
				}
			}
		}, 
*/		

		{
			init : sMap.Module.MiljoReda,
			config : {}
		},
		{
			init : sMap.Module.ScaleSelector,
			config : {
			}
		},
	
		{
			init : sMap.Module.LayerTree,
			config : {
				showFadedLinks: false,
				addPrintButton: false,
				showFadedCheckboxes: false,
				showCheckboxAfterTextIcon: false,
				enableTooltip: true,
				folderIcon: null, //"img/folder_page.gif",
				width: 400,
				right: true,
				addPrintLegendButton: false,
				categories: planApp.categories
			}
		}
		,

		{
			init : sMap.Module.Report,
			config : {
				addToToolsMenu: "simple",
				overviewBaseLayerName: "stadskartan",
				labels: {
				    "sv-SE": {
				        labelButton: "Skapa lägeskarta"
				    },
				    "en": {
				        labelButton: "Create a typical Swedish Lägeskarta"
				    }
				}
			}
		}
		,				
		
		/*
		{
			init: sMap.Module.Loading,
			config: {
				showBackground: true
			}
		}
		,
*/
		{
			init: sMap.Module.IntroDialog,
			config: {
				dialogOptions: {
					title: "Malmö Stadsatlas",
					width: 140,
					height: 200
				},
				contentHtml: 
					"<p>Plan och Byggatlas<br>Välkommen!</p><br>Internet Explorer 9,10,11, Google Chrome, Firefox rekommenderas" 
					
			}
		}
		
	]
};


if ($.browser.msie && parseInt($.browser.version) < 8) {
	var _ols = config.layers.overlays,
		t = null;
	for (var i=0,len=_ols.length; i<len; i++) {
		t = _ols[i] || {};
		if (t.params && t.params.format && t.params.format === "image/png") {
			t.params.format = "image/gif";
		}
	}
}

//Fix for Johans Mac which cannot connect to sbkvmgeoserver
/*if (navigator.userAgent.search(/mac/gi) !== -1) {
	var ls = config.layers.overlays,
	t = null;
	for (var i=0,len=ls.length; i<len; i++) {
		t = ls[i];
		if (t.URL)
			t.URL = t.URL.replace("sbkvmgeoserver", "161.52.9.230");
	}	
}*/

//$(document).ready(function() {
//	var toolBarTitleLbl = $("<div id='toolbarlabel'> Remove this in config file </div>");
//	$("#toolbar-maindiv").append(toolBarTitleLbl);
//	toolBarTitleLbl.position({
//		my: "center",
//		at: "center",
//		of: "#toolbar-maindiv"
//	});
//	toolBarTitleLbl.css("left", "");
//	toolBarTitleLbl.css("right", "50px");
//});



if (document.domain === "localhost") {
	config.proxyHost = "../../cgi-bin/proxy/proxy.py?url=";
}