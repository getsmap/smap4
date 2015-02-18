/**
 * @author Kristian Bergstrand
 * @copyright Helsingborgs stad
 * @license MIT license
 */

/**
 * @requires sMap/modules/Module.js
 * @requires sMap/modules/Module/Select.js
 * @requires sMap/modules/Module/Toolbar.js
 */

sMap.Module.AdvSearch = OpenLayers.Class(sMap.Module, {

	globalLayers : [], // Stores the wfs-layers to search in
	
	namesInGUI : [], // Keeps track of the layers in the advSearch-dialog.
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 * 
	 * "searchlayer" : searches the specifed layer and attribute and shows it in the map
	 */
	EVENT_LISTENERS : ["layervisible","layerhidden","addadvsearchrow","deladvsearchrow","searchlayer","vectorloaded"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : ["showlayer","select"],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.AdvSearch.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.AdvSearch.prototype.EVENT_TRIGGERS.concat(
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
		
		$.fn.toHtmlString = function () {
		    return $('<div></div>').html($(this).clone()).html();
		};
		
		//Create dialog-content and the dialog. Then open the dialog.
		self.advSearchDiv = self.createContent(self.advSearchDiv);
		self.advSearchDiv = self.createAdvSearchDiv(self.advSearchDiv);
		self.updateText();
		self.advSearchDiv.dialog("open");
		
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		var self = this;
		if (!self.active) {
			return false;
		}
		
		//Close and empty everything.
		if (self.advSearchDiv && self.advSearchDiv.dialog("isOpen") === true) {
			return self.advSearchDiv.dialog("close");
		}
		self.namesInGUI = [];
		self.globalLayers = [];
		$(self.advSearchDiv).empty().remove();
		
		// Call the deactivate function of the parent class
		return sMap.Module.prototype.deactivate.apply(
	            this, arguments
	        );
	},
	
	destroy : function() {
		// Handler are automatically deactivated and destroyed
		// by the parent class module's destroy method. However,
		// this is only the case if the handlers are stored like
		// below (the example shows how to deactivate them manually):
		// -> this.handlers["click"].deactivate();   // For many handlers...
		// -> this.handler.deactivate();    // For single handler
		// Therefore you should always store handler(s) like in this example.
		
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		if (this.button){ //You have the option not to add a button
			var self = this,
				eventChooser = "addtoolbutton";
			if (self.addToToolsMenu && self.addToToolsMenu == true){
				eventChooser = "addtomenu";
			}
			
			sMap.events.triggerEvent(eventChooser, self, {
				index : self.toolbarIndex,
				label : self.lang.buttonText,
				iconCSS : "ui-icon-search", 
				tagID : "button-advsearch",
				menuId : 7
			});
		}
	},
	
	/**
	 * Listener to the event "layervisible".
	 * Calls function addSearchRow(), to add the layer to advSearch.
	 * Then calls updateText().
	 * 
	 * @param e {Object}
	 * 		- layer.name {String} Name of the layer that got visible.   
	 * 
	 * @returns
	 */
	
	layervisible : function(e) {
		var self = this;
		//Escape if the module is not active
		if ( !self.active === true ) {
			return;
		}
		
		var layerToAdd = self.map.getLayersByName(e.layer.name);
		self.addSearchRow(layerToAdd);
		self.updateText();
	},
	
	/**
	 * Listener to the event "layerhidden".
	 * Calls function delSearchRow(), to delete the layer from advSearch.
	 * 
	 * @param e {Object}
	 * 		- layer.name {String} Name of the layer that got hidden.
	 * 
	 * @returns
	 */
	
	layerhidden : function(e) {
		//Escape if the module is not active
		if ( !this.active === true ) {
			return;
		}
		
		this.delSearchRow(e.layer.name);
	},
	
	/**
	 * Listener to the event "deladvsearchrow". 
	 * Calls function delSearchRow() if the module is active.
	 * 
	 * @param e {Object}
	 *  	- layer {String} Internal name of the overlay
	 *  
	 * @returns
	 */
	
	deladvsearchrow : function(e){
		//Escape if the module is not active
		if ( !this.active === true ) {
			return;
		}
		
		this.delSearchRow(e.layer);
	},
	
	/**
	 * Listener to the event "addadvsearchrow". 
	 * Calls method addSearchRow() if the module is active.
	 * 
	 * @param e {Object}
	 * 		- layer {String} Internal name of the overlay
	 *  
	 * @returns
	 */
	
	addadvsearchrow : function(e){
		var self = this;
		//Escape if the module is not active
		if ( !self.active === true ) {
			return;
		}
		
		var layerToAdd = self.map.getLayersByName(e.layer);
		self.addSearchRow(layerToAdd);
		self.updateText();
	},
	
	/**
	 * Deletes the layer from advSearch-dialog.
	 * 
	 * @param delLayer {Object} || {String}
	 *  
	 * @returns     
	 */
	
	delSearchRow : function(delLayer){
		var	namesInGUI = this.namesInGUI;
		
		//If delLayer is an object - fetch the name. Otherwise take the argument as-is.
		delLayer = ( typeof(delLayer) == "object" ) ? delLayer.name : delLayer;
		
		//Find which row to delete in namesInGUI array, and delete it.
		var rowIndex = $.inArray(delLayer,namesInGUI);
		
		//If the layer can not be found, return.
		//Otherwise, carry on and remove the layer.
		if ( rowIndex == -1){
			return;
		}

		namesInGUI.splice(rowIndex,1);
		
		//Delete the layer in GUI
		$("#advsearch"+delLayer).remove();
		this.updateText();
	},
	
	/**
     * Handles the searchoptions. Make filters, URLs and finally make requests.
	 * 		
	 * @param lyrs {Object}
	 * 		The layers (keys) and properties (vals) to search.
	 * 
	 * @param option {String}
	 * 		The logic to be applied (EQUAL_TO, LIKE etc.)
	 * 
	 * @param q {String}
	 * 		Searchstring
	 * 
	 * @returns 
	 */
	
	searchHandler : function(lyrs,option,q,bounds) {
		var self = this,
			urls = [];
		self.globalLayers = []; // Reset searchLayers
		
		// Make URLs and request them.
		$.each(lyrs, function(i,val){
			var searchProps = [];
			if (val == self.lang.allText) {
				searchProps = self.searchableAttr[i].slice(1);
			}
			else{
				searchProps = [val];			
			}
			var filter = self.makeFilter(option,searchProps,q);
			var layer = sMap.cmd.getLayerConfig(i);
			var url = self.makeURL(filter,layer,bounds);
			self.globalLayers.push(layer);
			urls.push(url);
		});
		
		self.requestWFSLayers(urls);
	},

	/**
	 * Listener for "searchlayer" event
	 * @param e
	 * 	- layer {String} the layer name(s comma separated) to search in
	 * 	- attributes {Array} the attributes to search in
	 * 	- option {String} the logic to be applied (EQUAL_TO, LIKE etc.)
	 *  - q {String} the query value to search for
	 */

	searchlayer : function(e){
		var layerlist = e.layer.split(',');
		var lyrs = {};
		for (var i=0;i<layerlist.length;i++){
			lyrs[layerlist[i]] = e.attributes;
			sMap.events.triggerEvent("showlayer", this, {
				layerName: layerlist[i]
			});
			var t = sMap.cmd.getLayerConfig(layerlist[i]);
			if (t.layerType.toUpperCase() != "VECTOR"){
				this.searchHandler(lyrs, e.option, e.q, e.bounds);
			}
		}
	},
	/**
	 * Listener for the "vectorloaded" event
	 * If we have query params on the vector layer we get the feature, zoom and select it
	 * @param e
	 *  - layerName {String} the name of vector layer loaded
	 */
	vectorloaded : function(e){
		var ql = sMap.db.startingWebParamsObject.QL,
			qa = sMap.db.startingWebParamsObject.QA, 
			qs = sMap.db.startingWebParamsObject.POI,
			q = parseInt(sMap.db.startingWebParamsObject.POI);
			q = isNaN(q) ? qs : q;
		if (ql && ql==e.layerName && qa && q){
			var layers = sMap.map.getLayersByName(e.layerName);
			var features = layers[0].getFeaturesByAttribute(qa,q);
			if (features && features.length) {
				// zoom to the features
				var fbounds = new OpenLayers.Bounds(); 
				for (var i=0; i<features.length;i++){ 
					fbounds.extend(features[i].geometry.getBounds()); 
				}
				if (fbounds.left == fbounds.right){
					sMap.map.setCenter(new OpenLayers.LonLat(fbounds.left, fbounds.top), this.pointZoomLevel);
				}
				else{
					sMap.map.zoomToExtent(fbounds);
				}
				// clone and select the features
				var selfeatures = [];
				for (var i=0; i<features.length; i++) {
					selfeatures[i] = features[i].clone();
					selfeatures[i].layerName = e.layerName;
					selfeatures[i].layer = layers[0];
				}
				sMap.events.triggerEvent("select", this, {
					features: selfeatures,
					dialog: this.dialogIfMany
				});
			}
		}
	},

	/**
	 * Make WFS filter to call for feature (WFS).
	 * 		
	 * @param subFilter {String}
	 * 		The subclass from OpenLayers.Filter to use (e.g. "EQUAL_TO").
	 * 		
	 * @param property {Array}
	 * 		The property or properties to search.
	 * 
	 * @param fobject {String} 
	 * 		The value to use in the filter
	 * 
	 * @returns FILTER {String} 
	 *		Filter to use in WFS request.
	 */
	
	makeFilter : function(subFilter,property,fobject) {
		var self = this,
			xmlInst = new OpenLayers.Format.XML();
		
		var formatFilterInst = new OpenLayers.Format.Filter({
			version : "1.1.0"
		});
		
		var tempFlt = [];
		//Set correct logic for all searchproperties.
		for(var i=0;i<property.length;i++){
			switch(subFilter) {
			case "EQUAL_TO":
				tempFlt[i] = new OpenLayers.Filter.Comparison({
					type : OpenLayers.Filter.Comparison.EQUAL_TO,
					property : property[i],
					matchCase : false,
					value : fobject
				});
				break;
			case "NOT_EQUAL_TO":
				tempFlt[i] = new OpenLayers.Filter.Comparison({
					type : OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
					property : property[i],
					matchCase : false,
					value : fobject
				});
				break;
			case "LIKE":
				tempFlt[i] = new OpenLayers.Filter.Comparison({
					type : OpenLayers.Filter.Comparison.LIKE,
					property : property[i], 
					//matchCase : false,
					value : "*" + fobject + "*"
				});
				break;
			default:
				alert(self.lang.confError);
			return;
			}
		}
		if (tempFlt.length>1){
			var olFilter = new OpenLayers.Filter.Logical({
		    	type: OpenLayers.Filter.Logical.OR,
		    	filters: tempFlt
		    });
		}
		else{
			var olFilter = tempFlt[0];
		}
		
		var flt = formatFilterInst.write(olFilter);
		var filterExpression = encodeURI(xmlInst.write(flt));
		var FILTER="&filter="+filterExpression;
	return FILTER;
	},
	
	/**
	 * Make URLs to call for feature (WFS).
	 * 
	 * @param filter {String}
	 * 		The filter to use.
	 * 
	 * @param ly {Object} 
	 * 		Config for the layer as in config.js.
	 * 
	 * @returns url {String} 
	 * 		A "queryable" URL to call for feature info.
	 */
	
	makeURL : function(filter,ly,bounds) {
		var t = ly.getFeatureInfo;
		var urlParam = t && t.URL ? t.URL : ly.URL ? ly.URL : ly.protocol.url;
		var url = urlParam.charAt(urlParam.length-1)=="?" ? urlParam : urlParam + "?", // add "?" if needed
			layerName=null,
			LAYERS="",
			SERVICE="",
			SRS="&srs=" + this.map.projection;
			VERSION="",
			REQUEST="",
			OUTPUTFORMAT = t && t.outputFormat ? "&outputFormat=" + t.outputFormat : "&outputFormat=json",
			BBOX = bounds ? "&bbox=" + bounds.toBBOX() : "";
			MAXFEATURES="&maxfeatures=50",
			FILTER = filter, 
			WIDTH = "&width=" + this.map.getCurrentSize().w,
			HEIGHT = "&height=" + this.map.getCurrentSize().h;
			
			var theType = ly.layerType.toLowerCase();
			
			if (theType == "vector" || theType == "wms") {
				REQUEST = "&request=getfeature";
				SERVICE = "&service=WFS";
				LAYERS = t && t.layers ?  "&typename=" + t.layers : ly.params ? "&typename=" + ly.params.layers : "&typename=" + ly.protocol.featureNS + ":" + ly.protocol.featureType;
				VERSION= "&version=1.0.0";//t && t.version ? "&version=" + t.version : (ly.protocol && ly.protocol.version ? "&version=" + ly.protocol.version : "&version=1.0.0");
			}
			
			// Originally WMS getFeatureInfo was planned to be supported...
			// someone can add code to support WMS if desired.
			/*else if (t.type.toLowerCase()=="wms") {
				LAYERS = "&layers=" + t.layers;
			}*/
			var params = LAYERS + SERVICE + SRS + VERSION + REQUEST +
				OUTPUTFORMAT + MAXFEATURES + WIDTH + HEIGHT + FILTER + BBOX;
			params = params.substring(1); // take away first '&'
			url = url + params;
		return url;
	},
	
	/**
	 * Request all URLs, zooms the found features and 
	 * sends them to module Select.
	 * 
	 * @param urls {Array}
	 *     Collection of URLs to call for feature/feature info
	 *     
	 * @returns     
	 */

	requestWFSLayers : function(urls) {
		if (!urls || urls.length==0) {
			return;
		}
		var self = this;
		if (self.spinnerOption == true && self.advSearchDiv){
			//Container for the spinner
			var spinDiv = $("<div id='advsearch-spinnerdiv' />");
			self.advSearchDiv.append(spinDiv);
			var target = document.getElementById('advsearch-spinnerdiv');
			var opts = {
					lines: 12, // The number of lines to draw
					length: 7, // The length of each line
					width: 4, // The line thickness
					radius: 10, // The radius of the inner circle
					color: '#000', // #rgb or #rrggbb
					speed: 1, // Rounds per second
					trail: 60, // Afterglow percentage
					shadow: false // Whether to render a shadow
			};
			//Instantiate the spinner and add it to target.
			var spinner = new Spinner(opts).spin(target);
		}

		var urlNbr = urls.length;
		
		// Do requests to all registered services supplying feature info
		for (var i=0; i<urls.length; i++) {
			var url = urls[i];
			var responseObject = OpenLayers.Request.issue({
				method : "GET",
				url: url,
				success: function(request){
					var features = null, // The features returned by WS and interpreted as OpenLayers.Feature(s)
					    olFormat = null;

					olFormat = new OpenLayers.Format.GeoJSON();
					var received = request.responseXML || request.responseText;
					//Catch parse-exceptions.
					try {
					   	features = olFormat.read(received);
			        } 
					catch(e) {
			        	$("#advsearch-searchfield").val(self.lang.serverError);
					   	if (spinner){
					   		spinner.stop();
					   	}
						return; // if it cant read it - escape from function
			        }
					
					var guiText = null;    

					if (features && features.length) {
						// zoom to the features
						var fbounds = new OpenLayers.Bounds(); 
						for (var i=0; i<features.length;i++){ 
							fbounds.extend(features[i].geometry.getBounds()); 
						}
						if (fbounds.left == fbounds.right){
							sMap.map.setCenter(new OpenLayers.LonLat(fbounds.left, fbounds.top), self.pointZoomLevel);
						}
						else{
							this.sMap.map.zoomToExtent(fbounds);
						}
						// Find the right place for the popup. Otherwise it gets the last clicked position.
						var px = self.map.getViewPortPxFromLonLat(new OpenLayers.LonLat((fbounds.right+fbounds.left)/2, (fbounds.top-fbounds.bottom)/2));
						//To find out the right layer for the response, since it is asynch.
						var rightLayer = null;
						var typeName = features[0].fid.split(".");
						typeName = typeName[0];
							
						$.each(self.globalLayers, function(k,val){
							var tempParam = this.params && this.params.layers ? this.params.layers : null;
							tempParam = this.getFeatureInfo && this.getFeatureInfo.layers ? this.getFeatureInfo.layers : tempParam;
							tempParam = tempParam.indexOf(":")>0 ? tempParam.replace(/:/g,",") : tempParam;
							tempParam = $.inArray(typeName,tempParam.split(","));
							if (tempParam>-1){
								rightLayer = this;
							}
						});
							
						// send the features to the selectcontrol with qlayer
					    for (var i=0; i<features.length; i++) {
					    	features[i].layerName = rightLayer.name;
					    	features[i].layer = rightLayer;
						}
					    	
					    sMap.events.triggerEvent("select", this, {
						    features : features,
						    dialog : this.dialogIfMany,
							xy : px
						});
					    guiText = $("#advsearch-searchfield").val();
					}
					else{
						guiText = guiText == null ? self.lang.noResultText : guiText;
					}
					urlNbr--;
					if (urlNbr == 0){
						if (spinner){
					   		spinner.stop();
					   	}
					   	$("#advsearch-searchfield").val(guiText);
					}
					responseObject = null;
    			},
    			failure:function(request){ 
        			$("#advsearch-searchfield").val(self.lang.serverError);
    			}
    			
			});
		}
	},
	
	/**
	 * Sets correct information text in searchfield.
	 * Disables searchfield, -button and selLogic if no layer has been selected.
	 * 
	 */
	
	updateText : function(){
		var self = this,
			newText = "",
			disabled = "";
		
		if (self.namesInGUI.length == 0){
			newText = self.lang.noLayers;
			disabled = true;
			$("#advsearch-lyrdiv").hide();
		}
		else{
			$("#advsearch-lyrdiv").show();
			var temp=[];
			//Populate temp with all layers selected for searching.
			$(".advsearch-lyrrow").each(function(i){
				var tempSelf = $(this);
				if( $('.advsearch-inclbox:checked', tempSelf).length ){
					temp.push(tempSelf.find("select").prop("id"));
				}
			});
		
			//If no layer is selected for searching, set startText and disable search.
			if (temp.length == 0){
				newText = self.lang.startText;
				disabled = true;
			}
			//Else enable search and set right text for searchfield.
			else{
				newText = self.lang.searchPrefix + " " + temp.join(", ");
				disabled = false;
			}
		}
		
		$("#advsearch-searchfield").val(newText);
		$(".advsearch-search", "#advsearch-godiv").prop('disabled', disabled);
		self.newText = newText;
	},
	
	/**
	 * This function returns the argument (string) with capitalized first letter.
	 * E.g. "foo" will become "Foo".
	 * 
	 * @param string {String} 
	 *  	String to be capitalized
	 *  
	 * @returns {String}    
	 */
	
	capitalise : function(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	
	/**
	 * Add layer(s) to advSearch-dialog.
	 * 
	 * @param layerArr {Array} 
	 *  	Array of OpenLayers.Layer object(s)
	 *  
	 * @returns    
	 */
	
	addSearchRow : function(layerArr){
		var self = this,
			namesInGUI = self.namesInGUI,
			layerTbl = self.layerTbl;
		
		for (var i=0; i<layerArr.length; i++) {
			var t = layerArr[i];
			
			//  Do not add certain layers to advSearch. The criterias are:
			//		a) displayInLayerSwitcher == true && 
			//		b) visibility == true && 
			//		c) name != "selectLayer"
			//		d) name != "poiLayer"
			//		e) name != "theDrawLayer"
			if (t.displayInLayerSwitcher != true || t.isBaseLayer == true || t.visibility != true || t.name == "selectLayer" || t.name == "poiLayer" || t.name == "theDrawLayer"){
				continue; //Stop and begin a new iteration
			}
			
			var tConf = sMap.cmd.getLayerConfig(t.name),
				displayName = tConf.displayName,
				properties = null;
			
			//Find the searchable attr for the right layer.
			//This check is performed before the layer gets added to namesInGUI.
			$.each(this.searchableAttr, function(i,val){
				if (i===t.name && properties == null){
					properties=val;
				}
			});

			if (properties == null){
				alert(self.lang.wrongConf + displayName);
				continue;
			}
				
			//Do not add layer if it is already in the GUI.
			var doubleCheck = $.inArray(t.name,namesInGUI);
			if (doubleCheck == -1){
				namesInGUI.push(t.name);
			}
			else{
				alert(displayName + self.lang.inList);
				continue; //Stop and begin a new iteration
			}

			var select = $("<select id='"+ t.name +"' class='advsearch-selectattr'></select>");
			
			$.each(properties, function(i){
				var option = null;
				if (i==0 && properties[i] == true){
					option = $("<option id='all'>"+self.lang.allText+"</option>");	
				}
				else if (i==0 && properties[i] !== true){
					return;
				}
				else{
					option = $("<option id='"+i+"'>" + properties[i] + "</option>");
				}
				select.append(option);
			});
			
			selectHtml = select.toHtmlString();
			guiName = self.capitalise(t.name);
			var layerRow = $("<tr id='advsearch"+t.name+"' class='advsearch-lyrrow' > <td>" + guiName + "</td> <td>"+selectHtml+"</td> " +
			"<td><input type='checkbox' class='advsearch-inclbox' name='advsearch-inclchoice' value="+t.name+" checked='checked' /></td> </tr>");
			
			layerRow.find("td").children("input:checkbox").change(function(){
				self.updateText();
			});
			
			layerTbl.append(layerRow);
		}
	},
	
	/**
	 * Called when activating the module.
	 * Creates content inside the advSearchDiv, which will later be placed in a dialog.
	 * 
	 * @returns advSearchDiv {Object} jQuery-object with content for the dialog.     
	 */
	
	createContent : function(advSearchDiv) {
		var self = this,
			advSearchDiv = $("<div id='advsearch-maindiv' />");
			selectDiv = $("<div id='advsearch-lyrdiv' />"),
			layerTbl = $("<table id='advsearch-lyrtbl'><tr><th>Lager</th><th>Val</th><th>Inkludera</th></tr></table>");
			selLogic = $("<select id='advsearch-logiclist' class='advsearch-search' />"),
			startText = self.lang.startText,
			matchOptions = self.subFilter.Comparison;
		
		self.layerTbl = layerTbl;
		selectDiv.append(layerTbl);
		advSearchDiv.append(selectDiv);
		
		//Fill the "logic - <select>" and append it to selLogicDiv.
		$.each(matchOptions, function(i,val){
			var optionToAdd = $("<option id='"+i+"' value='"+i+"'>" + val + "</option>");
			selLogic.append(optionToAdd);
		});
		selLogicHtml = selLogic.toHtmlString();
		//Create a searchfield and a "GO" button. 
		var userSearch = $("<div id='advsearch-godiv'><input id='advsearch-searchfield' class='advsearch-search' type='text' /><button id='advsearch-gobtn' class='advsearch-search'>"+self.lang.searchBtnText+"</button><div id='optDiv'><span>" + self.lang.optionTxt + "</span>" + selLogicHtml + "</div></div>");
		var userInput = userSearch.find("#advsearch-searchfield");
		
		//Add row(s) for layer(s) in vector self.map.layers.
		self.addSearchRow(self.map.layers);
				
		// Erase all text when focusing, if the text in the search box is just information text.
		userInput.focus(function(e) {
	    	// On focus - select all text.                             
			if ($(this).val() == self.newText || $(this).val() == self.lang.noResultText ) {
				$(this).val("");
	    	}
	    });	
		
		// Set newText on focusout.
		userInput.focusout(function() {
			if ($(this).val()=="") {
				$(this).val(self.newText);
			}
		});
		
		// OnChange for all <select> in selectDiv (i.e. all "layer - <select>").
		selectDiv.change(function(){
			self.updateText.call(self);
		});
		
		//Retrieve all searchoptions.		
		function beforeSearch() {
			var layersAndProps = {}; //Will hold the desired layers and props to search
				matchOption = $("#advsearch-logiclist").val(), //Logic to be applied
				q = userInput.val(); //Input from user
			
			selectDiv.find("select").each(function(i){
				var selectId = $(this).prop("id"); //Id of the <select>. The same as internal name of the layer.
				layersAndProps[selectId] = $(this).val(); //Add the layer as key and the attr as value.
			});
			if ($.isEmptyObject(layersAndProps)){
				return;
			}
			self.searchHandler(layersAndProps,matchOption,q);		
		}
		
		//Search when user hits Enter-key
		userSearch.keypress(function(e) {
		    if(e.keyCode == 13) {
		    	beforeSearch();
		    }
		});
		
		//Search when user clicks searchBtn 
		userSearch.children("button").click(beforeSearch);
		advSearchDiv.append(userSearch);	
		self.advSearchDiv = advSearchDiv;
		
	return advSearchDiv;
	},
	
	/**
	 * Create the dialog for the advSearchDiv.
	 * 
	 * @returns advSearchDiv {Object} jQuery-object with content in a dialog.
	 */
				
	createAdvSearchDiv : function(advSearchDiv){
		var self = this;
		sMap.util.createDialog(advSearchDiv, {
			titleText : self.lang.headerText,
			position : self.dialogStartPosition,
 			width : self.width,
			height : self.height,
			resizable : true,
			onClose : function() {
				// Deactivate controls
				self.events.triggerEvent("dialogclosed", {
					control : self
				});
				self.deactivate.call(self);
			},
			onOpen : null
		});

	return advSearchDiv;
	},		
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.AdvSearch"
	
});