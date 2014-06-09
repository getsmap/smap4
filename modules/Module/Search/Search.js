/**
 * @author Kristian Bergstrand
 * @copyright Helsingborgs stad 
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Search = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to.
	 * 
	 * "addmarkerataddress": Adds a marker at an address.
	 * "addmarkeratcoords": Adds a marker at given coordinates.
	 * "decidewhattodo" decides what to do with the query result
	 * 
	 */
	
	EVENT_LISTENERS : ["addmarkerataddress","addmarkeratcoords","decidewhattodo","creatingwebparams","afterapplyingwebparams","cleanlayer"],
	
	/**
	 * The events that are triggered from this module.
	 * 
	 * "searchlayer" Searches a layer for the autocomplete result
	 */
	
	EVENT_TRIGGERS : ["addlayer","addmarkerataddress","addmarkeratcoords","decidewhattodo","searchlayer"],
	
	lastSearchedPoi : null,
	
	lastSearchedCoords : null,
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Search.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Search.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
	},
	
	activate : function() {
		var self = this;
		if (self.active===true) {
			return false;
		}
		
		//If no inputfield for search is desired - do not try to add searchcategories
		if (self.noInput === true){
			self.appendAsOwnDiv = false;
			self.dropDownOption = false;
		}
		if (self.dropDownOption === true && self.appendAsOwnDiv===false) {
			self.added();
			var startingCat = $("#search-dropdownmenu").find("option:selected").text();
			self.changeCat(startingCat);
		}
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}

		// Call the deactivate function of the parent class
		return sMap.Module.prototype.deactivate.apply(
	            this, arguments
	        );
	},
	
	destroy : function() {
		// Remember - if you are using handlers - they also need to be deactivated.
		// If the parent class is using handlers they should be deactivated by the
		// return statement (see below) and not needed to be called from here.
		//this.handlers["click"].deactivate();
		
		
		// Events which are not bound to sMap.events need to be unregistered here.
		// sMap.events are taken care of in base-class Module. However, only
		// if listeners are defined as methods with same name as the event.
		
		$(this.searchInput).empty().remove();
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
	/**
	 * Listener to the event "creatingwebparams".
	 * Adds parameter "poi" or "coords" to webparams, if a poi or a coordinate is marked in the map.
	 * 
	 * @returns
	 */
	
	creatingwebparams : function(){
		var self = this;
		// Remove poiLayer from the OL-params
		var index = $.inArray( self.poiLayer.name, sMap.db.webParams.OL || [] );
		if (index > -1) {
			sMap.db.webParams.OL.splice(index, 1);
		}
		var poiLayer = sMap.map.getLayersByName("poiLayer")[0] || null;
		if(poiLayer == null || poiLayer.features.length != 1){
			return;
		}
		else if( self.lastSearchedPoi != null ){
			sMap.db.webParams.poi = encodeURIComponent(self.lastSearchedPoi);
		}
		else{
			sMap.db.webParams.coords = self.lastSearchedCoords;
		}
		
	},
	
	/**
	 * If the address can´t be found, add a message including the poi.
	 * If altText is specified, use this parameter to output info/error message.
	 * 
	 * @param poi {String}
	 */
	
	addInfoMsg : function(poi,altText){
		var self = this;
        var txt = typeof altText !== "undefined"? altText : self.lang.noPoiPreTxt + poi + self.lang.noPoiPostTxt;
        var noPoiText = $("<div id='search-nopoitext'>" + txt + "</div>");
        
        //Work-around for button name in variable (stackoverflow.com/questions/1464843/jquery-dialog-button-variable)
        var dialog_buttons = {};
        dialog_buttons[this.lang.noPoiBtnClose] = function(){ 
        	$(this).dialog('close'); 
        }
		var dialogConfig = {
				dialogClass : 'noTitleDialog',
				buttons : dialog_buttons	
		};
		sMap.util.infoDialog(noPoiText, dialogConfig);
    },
	
	/**
	 * Binds autocomplete to arbitrary ID.
	 * 
	 * @param searchInput {Object}
	 * 
	 */
	
	bindAutocompleteToId : function(searchInput) {
    	searchInput.attr("placeholder", this.startText);
		
		var autoCompleteScriptUrl = null;
		
		if( this.useProxy === true){
			autoCompleteScriptUrl = sMap.config.proxyHost ? sMap.config.proxyHost + encodeURIComponent(this.autoCompleteScriptUrl) : this.autoCompleteScriptUrl;
		}
		else{
			autoCompleteScriptUrl = this.autoCompleteScriptUrl;
		}
			
		searchInput.autocomplete(
				autoCompleteScriptUrl,
				{
					width : 200,
					minChars: 2,
					max : 5000,
					selectFirst : true,                                                                                                                                                                                                                                                                                                                                   
					matchSubset: false,
					encSpace: this.encSpace || null  // default is %20
				}
		); 
		searchInput.result(this.resultHandler);
	},
	
	/**
     * Read the respond from the server as a JSON object, clean layer and add a marker.
     * 
     * @param result {Object}
     */
	
	resultHandler : function(result) {
			sMap.events.triggerEvent("decidewhattodo", this, {
			    poi : result.target.value
			});
	},
	
	/**
	 * Decides what to do with the autocomplete result
	 * either read a poi from server and add a marker or search for an object in a layer
	 * @param e
	 * 	- poi {String} the value from the autocomplete
	 */
	decidewhattodo : function(e){
		if (this.searchScriptUrl) {
			sMap.events.triggerEvent("addmarkerataddress", this, {
			    poi : e.poi
			});
		}else{
			sMap.events.triggerEvent("searchlayer", this, {
				layer : this.searchLayer,
				attributes : this.searchAttributes,
				option : "EQUAL_TO",
			    q : e.poi
			});
		}
	},
	
	/**
	 * Handle params.
	 * 
	 *
	 */
	
	afterapplyingwebparams : function(){
		var paramsObj = sMap.cmd.getStartingParamsAsObject();
		
		if (paramsObj.POI) {
			//If both POI and COORDS exists, then POI "wins"
			if (paramsObj.QL && paramsObj.QA) {
				sMap.events.triggerEvent("searchlayer", this, {
					layer : paramsObj.QL,
					attributes : [paramsObj.QA],
					option : "EQUAL_TO",
				    q : paramsObj.POI
				});
			}
			else {
				sMap.events.triggerEvent("addmarkerataddress", this, {
				    poi : paramsObj.POI,
				    zoom : paramsObj.ZOOM || this.zoomLevel
				    //center : paramsObj.CENTER || null    not implemented yet
				});
			}
		}
		else if (!paramsObj.POI && paramsObj.COORDS) {
			var c = paramsObj.COORDS;
			c = c.toString();
			c = c.replace(","," ");
			this.handleCoords(c);
		}
		
		else{
			return; // No POI or COORDS in querystring --> nothing happens.
		}
	},
	
	/**
     * Toggles the searchoptions-div underneath the searchbox.
     * The option appendAsOwnDiv must be set to true in Search_conf.js.
     * 
     */
	
	toggleOptionsDiv : function(e) {
		var self = this;
		
		if( !self.firstTime ){
			var optionsMenuDiv = self.optionsMenuDiv,
				searchInput = $("#searchBox");
					
			var boxOffset = searchInput.offset(),
				boxWidth = searchInput.outerWidth(),
				boxHeight = searchInput.outerHeight();
				
			$(optionsMenuDiv).css({
				"left" : boxOffset.left,
				"position" : "absolute",
				"top" :  boxOffset.top + boxHeight,
				"width" : boxWidth
			});
		
			$("#toolbar-maindiv").append(optionsMenuDiv);
					
			//onChange of the dropDown
			$("#search-dropdownmenu").change(function() {
				var selectedCat = $(this).find("option:selected").text();
				self.changeCat(selectedCat);
			});	
					
			var startingCat = $("#search-dropdownmenu").find("option:selected").text();
			self.changeCat(startingCat);
			self.firstTime = 1;
		}
		$("#search-optionsmenu").toggle();
		return true;
	},
	
	/**
     * The default drawContent function
     * 
     */
	drawContent : function() {
		var self = this;
		if( self.noInput === true ){
			return;
		}
		sMap.events.triggerEvent("addtoolentry", this, {
			index : this.toolbarIndex,
			width : 200,
			margin: 10,
			tagID : "searchBox"
		});
		var searchBox = $("#searchBox");
		
		self.bindAutocompleteToId(searchBox);
		
		//self.handleParams();
		
		if (self.dropDownOption == true) {
			var dropDownItems = self.dropDownItems,
				temp = "";
			
			//Variable temp is used for building part of the drop-down menu
			for (var searchCat in dropDownItems){
				temp = temp + "<option value='" + dropDownItems[searchCat].searchBoxText + "'>" + searchCat + "</option>";
			}
			
			var dropDown = $("<select name='choices' id='search-dropdownmenu'>" + temp + "</select>");
			self.dropDown = dropDown;
			
			if (self.appendAsOwnDiv != true){
				sMap.events.triggerEvent("addselect", self, {
				   selectObject : dropDown,
				   index : self.dropDownIndex,
				   appendToSearch : self.appendToBox
				});
			}
			else{
				sMap.events.triggerEvent("addtoolbutton", self, {
					index : self.dropDownIndex,
					on : self.toggleOptionsDiv,
					off : self.toggleOptionsDiv,
					hoverText : self.lang.hoverBtnText,
					iconCSS : "ui-icon-wrench",
					tagID : "button-searchoptions",
					appendToSearch : self.appendToBox
				});
				var optionsMenuDiv = self.createOptionsMenu();
				var innerDiv = $("<div id='search-innerdiv' class='ui-widget-content' />");
				
				var closeBtn = $("<div id='search-btnclose' class='ui-button-icon-primary ui-icon ui-icon-close' title='" + self.lang.closeTxt + "' />");
				var header = $("<div id='search-header'>" + self.lang.optionsHeader + "</div>");
				
				innerDiv.append(header).append(closeBtn).append(dropDown);

				optionsMenuDiv.append(innerDiv);
				
				searchBox.focus(function(){
					if ( $("#search-optionsmenu").is(":visible") ){
						$("#button-searchoptions").click();
					}
				});
				
				// Hide options on close-button click, and render button-searchoptions as inactive.
				closeBtn.click(function(e) {
					$("#button-searchoptions").click();
				});
			}
		}
	},
	
	/**
	 * Create the container for the menu.
	 * 
	 * @returns optionsMenuDiv {jQuery-object}
	 *      
     */
	
	createOptionsMenu : function() {
		var optionsMenuDiv = $("<div id='search-optionsmenu' />");
		optionsMenuDiv.addClass("ui-widget ui-widget-clearfix").hide();
		
		this.optionsMenuDiv = optionsMenuDiv;
		
	return this.optionsMenuDiv;
	},
	
	/**
     * Creates a poilayer.
     * @returns {Object}
	 *     - poiLayer {OpenLayers.Layer.Vector}
     * 
     */
	
	createPoiLayer : function(){ 
		var t = this.poiLayer;
		t.displayName = this.lang.searchLayerDisplayName;
		var poiLayer = new OpenLayers.Layer.Vector(t.name, {
			styleMap: new OpenLayers.StyleMap({
				"default": new OpenLayers.Style(t.defaultStyle)
			}),
			projection: new OpenLayers.Projection(this.map.projection),
			selectable: t.selectable,
			displayInLayerSwitcher: false
		});
		
		sMap.config.layers.overlays.push(t);
		
		sMap.events.triggerEvent("addlayer", this, {
			layer: poiLayer		
		});
		
	return poiLayer;
	},
	
	/**
	 * Listener to the event "cleanlayer".
	 * Removes feature(s) from layer. 
	 * 
	 *  @param e {Object}
	 *  	- layer {object}
	 *  	- poi {String} (default null)
	 *  	- coords {String} (default null)
	 *
	 * @returns {void}
	 */
	
	cleanlayer : function(e) {
		e.layer.destroyFeatures();
		this.lastSearchedPoi = e.poi || null;
		this.lastSearchedCoords = e.coords || null;
	},
	
	/**
	 * Listener to the event "addmarkerataddress".
	 * Creates a poiLayer (if there isn´t one already), 
	 * and adds a marker at the address.
	 * 
	 *  @param e {Object}
	 *  	- poi {String}
	 *  	- zoom {String}
	 * 		- setCenter {Boolean} (default true)
	 *		- cleanLayer {Boolean} (default true)
	 *		- center {Object} or {String}
	 *
	 * @returns
	 */
	
	addmarkerataddress : function(e) {
		var self = this; 
		var thePoi = e.poi,
			theZoom = e.zoom || self.zoomLevel,
			setCenter = e.setCenter === false ? false : true, //If not explicitly set to false, it is  true. The same holds for cleanLayer.
			cleanLayer = e.cleanLayer === false ? false : true;
			//center = e.center;  
		var poiLayer = self.map.getLayersByName("poiLayer")[0] || null;
		if (!poiLayer){
			var poiLayer = self.createPoiLayer();
		}
		if (self.searchScriptUrl.charAt(self.searchScriptUrl.length-1) === "?") {
			// Prevent double "?"
			self.searchScriptUrl = self.searchScriptUrl.substring(0, self.searchScriptUrl-1);
		}
		var queryUrl = self.searchScriptUrl + "?q=" + encodeURIComponent(thePoi);
		
		function handler(request){
			var map = self.map,
				format = new OpenLayers.Format.GeoJSON(),
				feature = format.read(request.responseText)[0];
			if (!feature || feature.length==0) {
				self.addInfoMsg.call(self, thePoi);
				return; // if it cant read it - escape from function
			}
			else {
				self.lastSearchedCoords = null;
				self.lastSearchedPoi = thePoi; // store the address (and continue)
			}
			var poiLayer = map.getLayersByName("poiLayer")[0] || null;
			if (cleanLayer === true) {
				poiLayer.destroyFeatures();
			}
			if (feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Point"){ //Add not line and polygon features
				poiLayer.addFeatures([feature]);
				poiLayer.setZIndex(699);
			}
			if (setCenter === true) {
                if (feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Polygon"||feature.geometry.CLASS_NAME == "OpenLayers.Geometry.LineString"){
                	sMap.map.zoomToExtent(feature.geometry.getBounds());
                }
                else {
                    sMap.map.setCenter(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y), theZoom);
                }
            }
						
		}
		var request = OpenLayers.Request.GET({
		    url: queryUrl,
		    callback: handler
		});
    },
	
    /**
     * @param fromEPSG {String}
     * @param toEPSG {String}
     * @param x {Number}
     * @param y {Number}
     * @returns {Proj4js.Point}
     */
    
    transformCoords : function(fromEPSG, toEPSG, x, y) {
    	fromEPSG = fromEPSG.toUpperCase();
    	toEPSG = toEPSG.toUpperCase();
    	var p = new Proj4js.Point(x, y);
    	//Problems when the definitions only were in an external file, hence they are declared below.
    	Proj4js.defs["EPSG:3008"] = "+proj=tmerc +lat_0=0 +lon_0=13.5 +k=1 +x_0=150000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
    	Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ";
    	
        var projSource = new Proj4js.Proj(fromEPSG); // source projection
        var projDest = new Proj4js.Proj(toEPSG); // destination projection
        Proj4js.transform(projSource, projDest, p);
        return p;
    },    
    
    /**
	 * Listener to the event "addmarkeratcoords".
	 * Adds a marker at the coords. Only works well for points at the moment.
	 * 
	 *  @param e {Object}
	 *  	- coords {Object} || {String}
	 *  		x,y. E.g. coords="12.7005,56.053".
	 *  		If String, values will be split according to "," in the string. 
	 *      - zoom {String}
	 *      - geomType {String}
	 *      
	 * @returns
	 */	
	
	addmarkeratcoords : function(e) {
    	var self = this,
    		map = self.map;
    	var coords = e.coords, //x,y					
    		theZoom = e.zoom || self.zoomLevel,
    		geomType = e.geomType || "Point",
    		cleanLayer = e.cleanLayer === false ? false : true;
    	
    	var poiLayer = map.getLayersByName("poiLayer")[0] || null;
        if (!poiLayer){
			var poiLayer = self.createPoiLayer();
		}
        if (cleanLayer===true) {
            poiLayer.destroyFeatures();
        }
    	
		coords = typeof(coords)=="string" ? coords.split(",") : coords;
		var east = parseFloat(coords[0]),
	    	north = parseFloat(coords[1]);
    	
    	//Display an error if any coordinate is out of bounds.
    	var maximalExtent = sMap.config.maxExtent;
    	if (east > maximalExtent.e || east < maximalExtent.w || north > maximalExtent.n || north < maximalExtent.s) {
    		self.addInfoMsg.call(self, "eller de koordinater");
    		return;
    	}
    	else {
    		poiCoords = coords.toString();
    		self.lastSearchedPoi = null;
    		self.lastSearchedCoords = poiCoords;// store the coords (and continue)
		}
    	
    	var coordsObj = e.allCoordinates,    	
    		codes = [],
    		t = [];
		$.each(coordsObj, function(key, val){
			codes.push(key);
			t.push(val[0],val[1]);
		});
    	
        var geoJSONObject = {
        	"type": "FeatureCollection",
        	"features": [{
        		"type": "Feature",
        		"geometry": {
        			"type": geomType,
        			"coordinates": [
        			                east,
        			                north
        			                ]
        		},
        		"properties": {
        			"specialForCoordinateSearch" : true,
        			"code1" : codes[0],
        			"east1" : t[0],
        			"north1" : t[1],
        			"code2" : codes[1],
        			"east2" : t[2],
        			"north2" : t[3],
        			"code3" : codes[2],
        			"east3" : t[4],
        			"north3" : t[5],
        			"code4" : codes[3],
        			"east4" : t[6],
        			"north4" : t[7],
        			"code5" : codes[4],
        			"east5" : t[8],
        			"north5" : t[9]
        		}  
        	}]
        };
        
        //Use for test epsg:3008 --> 100191,6214761. Epsg:4326--> 12.7005, 56.053
        
        var format = new OpenLayers.Format.GeoJSON();
        var feature = format.read(geoJSONObject)[0];
       
        if (feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Point"){ //Add not line and polygon features
        	poiLayer.addFeatures([feature]);
            poiLayer.setZIndex(699);
        }
        sMap.map.setCenter(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y), theZoom);
	},			
			
	/**
	 * Add class and event to drop-down menu. The dropDownOption must be set to true in Search_conf.js.
	 */
		
	added : function() {
		var self = this,
		dropDownMenu = $("#search-dropdownmenu");
		dropDownMenu.addClass('search-dropdown');
			
		//onChange of the dropDown
		$('.search-dropdown').change(function() {
			var selectedCat = $(this).find("option:selected").text();
			self.changeCat(selectedCat);
		});
	},
	/**
	 * Check bounds. Display an error if any coordinate is out of bounds.
	 */
	
	checkBounds : function(coordsPair){
    	var maximalExtent = sMap.config.maxExtent;
    	if (coordsPair.x > maximalExtent.e || coordsPair.x < maximalExtent.w || coordsPair.y > maximalExtent.n || coordsPair.y < maximalExtent.s) {
			return false;
    	}
    	else{
    		return true;
    	}
	},
	
	/**
	 * Handle coordinate-search.
	 */
	
	handleCoords : function(userCoordinates){
		var self = this;
		//Allow for both period and comma as decimal-seperator.
		var theCoords = userCoordinates.replace(",",".");
		var eastnorth = theCoords.split(" ");
		var east = parseFloat(eastnorth[0]);
		var north = parseFloat(eastnorth[1]);
			
		//Display an error if any of the coordinates is not a number
		if (isNaN(east) || isNaN(north)){
			self.addInfoMsg("NaN", 'Enbart siffror tillåtna. Prova igen (t.ex " 100191 6214761 ")');
			return;
		}
		
		var epsgCodes = self.epsgCodes;
		var theEpsg = null;
		var diffCoords=[];
		for(var i = 0; i<epsgCodes.length;i++){
			var c = epsgCodes[i];
			var p = sMap.util.projectPoint(c, sMap.config.projection, east, north);
			var boundsTest = this.checkBounds(p);
			//console.log(boundsTest);
			if (boundsTest == true){
				theEpsg = c; //Add the epsg-code as key and the coords as value.
				diffCoords = [p.x,p.y]; //Add the epsg-code as key and the coords as value.
				break;
			}
			else{
				continue;
			}
		}
		//if($.isEmptyObject(resultObj) == true){alert("out of bounds");return;}
		var allCoords = {};
		if(theEpsg == null){
			self.addInfoMsg("OutOfBounds", 'Koordinaterna ligger inte i kartans utsträckning. Prova igen (t.ex " 100191 6214761 ")');
			return;
		}
		else{
			for(var i = 0; i<epsgCodes.length;i++){
				var d = epsgCodes[i];
				var e = sMap.util.projectPoint(sMap.config.projection, d, diffCoords[0], diffCoords[1]);
				var x = e.x.toFixed(2);
				var y = e.y.toFixed(2);
				allCoords[d] = [x,y];
			}
		}
		
		sMap.events.triggerEvent("addmarkeratcoords", this, {
			    coords : diffCoords, //x,y 
			    zoom : this.zoomLevel,
			    epsg : theEpsg,
			    allCoordinates : allCoords
			    //center : paramsObj.CENTER || null    not implemented yet
			});
	},
	
	/**
     *  What happens onchange of the drop-down.
     *  Note that dropDownOption must be set to true in Search_conf.js.
     *  
     *  @param category {String}
     *  
     */
	
	changeCat : function(category) {
		var self = this,
			catOptions = self.dropDownItems[category],
			searchBox = $("#searchBox");
		
		searchBox.val(catOptions.searchBoxText);
		
		//Remove autocomplete and previous event-handlers in namespace "box" (if any).
		searchBox.unautocomplete().off('.box');
		
		//change the paths to searchscripts
		self.autoCompleteScriptUrl = catOptions.autocompleteScript;
		self.searchScriptUrl = catOptions.searchScript;
		if (!catOptions.searchScript && catOptions.searchLayer && catOptions.searchAttributes){
			self.searchLayer = catOptions.searchLayer;
			self.searchAttributes = catOptions.searchAttributes;
		}
		
		/**
	     *  
	     *  If appendAsOwnDiv is set to true in Search_conf.js, bind another handler on:
	     *  	-focus 
	     *  		call click-event of button-searchoptions, only if the div underneath the
	     * 			searchbox is visible.
	     * 
	     *  If (else instantiate autocomplete) searchCatCoords is set to true in Search_conf.js 
	     *  and if category equals "Koordinater", bind handler on:
	     *  	-keypress
	     *  		search when user hits Enter-key.
	     * 
	     */
		
		searchBox.on('focus.box', function() {
			if ($(this).val() == catOptions.searchBoxText) {
				$(this).val("");
	    	}
	    }).on('focusout.box', function() {
			if ($(this).val()=="") {
				$(this).val(catOptions.searchBoxText);
			}
		});
		
		if (self.appendAsOwnDiv == true){
			searchBox.on('focus.box',function(){
				if ( $("#search-optionsmenu").is(":visible") ){
					$("#button-searchoptions").click();
				}
			});
		}

		if(self.searchCatCoords == true && category == "Koordinater"){
			self.addInfoMsg(" ", self.lang.helpTxt);
			searchBox.on('keypress.box',function(e) {
				if(e.keyCode == 13) {
					self.handleCoords($(this).val());
				}
			});
		}
		else{
			$('#searchBox').autocomplete(
				self.autoCompleteScriptUrl,
		    		{
			    		width : 300,
			    		minChars: 2,
						max : 5000,
			    		selectFirst : true,                                                                                                                                                                                                                                                                                                                                   
						matchSubset: false,
						noResultText: self.noResultText
		    		}
		    );
			searchBox.result(self.resultHandler);
		}
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Search"	
});