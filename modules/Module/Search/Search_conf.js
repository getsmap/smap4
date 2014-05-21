sMap.moduleConfig.Search = {
		
		activateFromStart : true,
		
		noInput : false, //If set to true - do not add searchbox to GUI.
		
		
		/**
		 * Custom encoding of space character for autocomplete script. Default is %20 (since using encodeURIComponent() )
		 */
		encSpace: null,
		
		
		/**
		 * If module class name specified the container module will create a default visual
		 * interface (typically a button) for interacting with the module (typically activate/deactivate).
		 */
		
		/**
		 * Variables 'startText', 'autoCompleteScriptUrl' and searchScriptUrl' 
		 * are NOT used if dropDownOption is set to true!
		 * Instead values from the object dropDownItems (below) will be used).
		 * 
		 */
		
		startText : "Ange adress eller plats",
		autoCompleteScriptUrl : "http://kartor.smap.se/cgi-bin/search/sok.py?",
		searchScriptUrl : "http://kartor.smap.se/cgi-bin/search/sokexakt.py",
		
		/**
		 * If no zoomlevel is sent in as a CGI-parameter, the value below will be used. 
		 * This value will also be used when searching inside the application.
		 * 
		 */
		zoomLevel : 9,
		
		poiLayer : {
			name : "poiLayer",
			displayName : "", // Fetched from lang object
			layerType: "vector",
			geomType : "point",
			selectable : true,
			displayInLayerSwitcher : false,
			defaultStyle: {
				externalGraphic : "img/location.png",
				graphicWidth : 18,
		        graphicHeight : 18,
		        graphicXOffset: -9,
		        graphicYOffset: -9
			},
			rmBtn : true, //Remove-button in popup.
			popup : "<div class='popup-header1'>${name}</div>",
			popupCoordinates : "<div class='popup-header1'>Koordinat</div>" +
					"<div class='search-popup1'>${code1}:</div>" +
					"<div class='search-popup'> ${east1}, ${north1}</div>" +
					"<div class='search-popup1'>${code2}:</div>" +
					"<div class='search-popup'> ${east2}, ${north2}</div>" +
					"<div class='search-popup1'>${code3}:</div>" +
					"<div class='search-popup'> ${east3}, ${north3}</div>" +
					"<div class='search-popup1'>${code4}:</div>" +
					"<div class='search-popup'> ${east4}, ${north4}</div>" +
					"<div class='search-popup1'>${code5}:</div>" +
					"<div class='search-popup'> ${east5}, ${north5}</div>"
	    },
	    
	    //search via sMap.config.proxyHost (boolean)
	    useProxy : true,
	    
	    /**
		 * Below are options for including a drop-down, with different search criterias.
		 * 
		 * 	- dropDownOption {Boolean}
		 * 		whether or not to include a drop-down
		 * 
		 * - selId {String}
		 * 		id of the drop-down (<select>)
		 * 
		 * - appendAsOwnDiv {Boolean}
		 * 		If true, puts the drop-down in a div underneath the searchBox.
		 * 		The div is toggled via an icon-only button in the toolbar, and gets hidden
		 * 		when the searchBox gains focus.
		 * 
		 * - appendToBox {Boolean}
		 * 		If true, puts the drop-down (or the icon-only button mentioned above under 'appendAsOwnDiv')
		 * 		close beside searchBox.
		 * 
		 * - dropDownIndex {Number}
		 * 		Toolbarindex for drop-down (or the icon-only button mentioned above under 'appendAsOwnDiv').
		 * 		If appendToBox is set to true, the dropDownIndex will be ignored.
		 * 
		 * - dropDownItems {Object}
		 * 		Paths to searchscripts etc. for the different categories.
		 * 
		 */
	    
	    dropDownOption : true,
	    selId : "search-dropdownmenu",
		appendAsOwnDiv : true, 
		appendToBox : true,
		searchCatCoords : true,
		epsgCodes : ["EPSG:3006", "EPSG:3008", "EPSG:4326", "EPSG:3021", "EPSG:900913"],
		dropDownIndex : 10,
		dropDownItems : {
		    	"Koordinater": {
			   		"dropDownName" : "Koordinater",
			   		"searchBoxText" : "Sök koordinater",
			   		"autocompleteScript" : "http://kartor.smap.se/cgi-bin/search/sok.py?",
					"searchScript" : "http://kartor.smap.se/cgi-bin/search/sokexakt.py"
		   		},
				"Adresser": {
			   		"dropDownName" : "Adresser",
			   		"searchBoxText" : "Ange adress",
			   		"autocompleteScript" : "http://kartor.smap.se/cgi-bin/search/sok.py?",
			   		"searchScript" : "http://kartor.smap.se/cgi-bin/search/sokexakt.py"
			   	},
			   	"Fastigheter": {
			   		"dropDownName" : "Fastigheter",
			   		"searchBoxText" : "Ange fastighet",
			   		"autocompleteScript" : "http://kartor.smap.se/cgi-bin/search/sok.py?",
			   		"searchScript" : "http://kartor.smap.se/cgi-bin/search/sokexakt.py"
			   	}
		}
};