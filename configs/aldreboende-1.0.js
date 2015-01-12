var config = {
	
	version : "4.0.0",
	projection : "EPSG:3008",
	resolutions : [27.781305, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.26458483], // EPSG:3008
	
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
	
//	proxyHost : "http://localhost/cgi-bin/proxy.py?url=",
	proxyHost : "http://xyz.malmo.se/myproxy/proxy.py?url=",
	
	iFrame : false,
	
	rootURL : document.URL.split("?")[0],
	//defaultWebParams : "defaultParam=5",
	
	layers : {
		
		overlays : [],
		
		baselayers : [
			{
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
			}
		]
	},
	
	
	modules : //[sMap.Module.Email, sMap.Module.ModuleTest]
	[
//		{
//			init : sMap.Module.LayerLoaderNotifier,
//			config : {}
//		},
//		{
//			init : sMap.Module.Toolbar,
//			config : {}
//		},
//		{
//			init : sMap.Module.TestModule,
//			config : {}
//		},
//		{
//			init : sMap.Module.FeatureRequester,
//			config : {}
//		},
//		{
//			init : sMap.Module.Select,
//			config : {
//				handlerType: "click",
//				dialogIfMany: false
//			}
//		},
		{
			init : sMap.Module.SimpleSelect,
			config : {}
		},
//		{
//			init : sMap.Module.SelectWMS,
//			config : {}
//		},
		{
			init : sMap.Module.Popup,
			config : {}
		},
//		{
//			init : sMap.Module.BaselayerSwitcher,
//			config : {
//				dropDownOnSingle : false,
//				buttonWidth : 75,
//				dropDownWidth : 130
//			}
//		},
//		{
//			init : sMap.Module.ScaleBar,
//			config : {}
//		},
//		{
//			init : sMap.Module.Search,
//			config : {
//				toolbarIndex : 0,
//				addToToolsMenu : false,
//				dropDownOption: false,
//				autoCompleteScriptUrl : "http://kartor.smap.se/cgi-bin/proxy/proxy.py?url=" + "http://xyz.malmo.se/WS/mKarta/autocomplete.ashx?",
//				searchScriptUrl : "http://xyz.malmo.se/WS/mKarta/sokexakt.ashx"
//			}
//		},
//		{
//			init : sMap.Module.ToolsMenu,
//			config : {
//				toolbarIndex : 1
//			}
//		},
//		{
//			init : sMap.Module.MeasureDialog,
//			config : {
//				toolbarIndex : 2,
//				addToToolsMenu : false
//			}
//		},
//		{
//			init : sMap.Module.CopyLink,
//			config : {
//				toolbarIndex : 0,
//				addToToolsMenu : true
//			}
//		},
		{
			init : sMap.Module.Pizza,
			config : {}
		},
//		{
//			init : sMap.Module.Print,
//			config : {
//				toolbarIndex : 4,
//				addToToolsMenu : false,
//				useProxy: true,
//				webContentRoot: "/var/www/kartor/sMapTest/",
//				publicExportFolder: "http://kartor.smap.se/temp/print/",
//				privateExportFolder: "/var/www/kartor/temp/print/",
//				printScriptsFolderPath: "http://kartor.smap.se/cgi-bin/print/"
//			}
//		},
//		{
//			init : sMap.Module.OverlaySwitcher.SimpleSwitcher,
//			config : {}
//		},
		{
			init : sMap.Module.Aldreboenden,
			config : {}
		}
		
	]          
		
};