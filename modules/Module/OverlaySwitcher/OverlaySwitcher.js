/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.OverlaySwitcher = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["layervisible","layerhidden"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : ["showlayer","hidelayer"],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.OverlaySwitcher.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.OverlaySwitcher.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		this.idDelim = sMap.moduleConfig.OverlaySwitcher.idDelim;
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
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
		
	},
	layervisible : function(e) {
		this.toggleCheckbox(e.layer.name);
	},
	layerhidden : function(e) {
		this.toggleCheckbox(e.layer.name);
	},
	/**
	 * Make the overlay checkboxBar containing all the
	 * layer rows.
	 */
	addRowsHtml : function(checkboxBar) {
		/* 
		 * Add a checkbox for each overlay and decide whether
		 * it should begin as checked or unchecked (visible or non-visible).
		 */
		
		var idDelim = this.idDelim;
		
		for (var i=0; i<sMap.config.layers.overlays.length; i++) {
			var t = sMap.config.layers.overlays[i];
			if (t) {
				var layerName = t.name;
				var displayName = t.displayName || "Namnlöst lager";
				//var imageUrl = t.markerImage || null;
				var imageUrl = (t.style && t.style["default"] && t.style["default"].externalGraphic) ? t.style["default"].externalGraphic : null;
				var label = $("<span id='overlay-checkbox-text" + idDelim + layerName + "' class='overlay-checkbox-text'>"+displayName+"</span>");

				// Add the marker image to the overlay checkboxbar and start hidden.
				
				var imageId = layerName + "Img";
				var image = null;
				
				if (imageUrl) {
					image = $("<img src='"+imageUrl+"' class='overlaySwitcher-image' id='"+imageId+"'></img>");
					// Set the legend image to same width and height as given in the map SMap.js
				}
				else {

					image = $("<img class='overlaySwitcher-image' id='"+imageId+"'></img>");

					src = this.getGeomTypeImageURL(t.geomType);
					image.css({
						"width" : "10px",
						"height" : "10px"
					});
					image.prop("src", src);
				}
				
				var legendIcon=null;
				if (t.dialogContent) {
					legendIcon = this.makeLegendIcon(t);
				}
				
				// The only way to alter the visibility of an overlay from start
				// is to change t.startVisible. This is e.g. used when initiating
				// the map with URL-parameters, then: t.startVisible = true .
				var checked = null;
				
				if (t.startVisible) {
					checked = "checked='checked' ";	
					image.show();
				}
				else {
					checked = "";
					image.hide();
				}
				
				var checkbox = $("<input type='checkbox' class='overlay-checkbox-box' id='checkbox" + idDelim + layerName+"' value='"+displayName+"' "+checked + "/>");
				var checkboxDivId = "overlay-checkbox-div" + idDelim + layerName;
				var checkboxDiv = $("<div id='"+checkboxDivId+"' class='overlay-checkbox-div' />");
				checkboxDiv.append(checkbox);
				checkboxDiv.append(label);
				checkboxDiv.append(image);
				if (legendIcon) {
					checkboxDiv.append(legendIcon);
				}
				checkboxBar.append(checkboxDiv);
			}
		}
	},
	
	getGeomTypeImageURL : function(geomType) {
		var imageDict = {
				point : "img/geometries/point.png",
				line : "img/geometries/line.png",
				polygon : "img/geometries/polygon.png"
		};
		var href = imageDict[geomType];
		return href;
	},
	
	/**
	 * Toogle checkbox,label and image identified by layerName.
	 * @param layerName {String} Used to identify the checkbox and image.
	 * 
	 */
	toggleCheckbox : function(layerName) {
		var checkboxDiv = $("#" + "overlay-checkbox-div" + this.idDelim + layerName);
		var checkbox = checkboxDiv.find("input");
		var label = checkboxDiv.find("span");
		var iconId = layerName + "Img";
		var icon = checkboxDiv.find("#"+iconId);
		icon.toggle();
		if (label.length>0){
			if (label[0].style.fontWeight=="bold"){
				label.css("font-weight", "normal");
			}
			else{
				label.css("font-weight", "bold");
			}
		}
		checkbox.prop("checked", !checkbox.prop("checked"));
	},
	
	/**
	 * Define what shall happen on click on overlay label and checkbox.
	 * @param checkboxDiv {jQuery div} The div ("row") which contains the checkbox and label etc.
	 * @param dontChangeIcon {Boolean}
	 * @return
	 */
	defineClick : function(checkboxDiv, toggleIcon) {
		var self = this;
		
		var idDelim = sMap.moduleConfig.OverlaySwitcher.idDelim;//this.idDelim;
		var autoOpenLegend = this.conf.autoOpenLegend ? this.conf.autoOpenLegend : false;
		$(checkboxDiv).click(function(e) {
			
			var layerName = $(this).prop("id").split(idDelim)[3];
			var checkboxId = "checkbox" + idDelim + layerName;
			var checkbox = $(this).find("input[id="+checkboxId+"]");

			// If target is the checkbox (input) - the check will be undone.
			// It will be toggled after the showlayer/hidelayer event.
			var checked=null;

			if (e.target.tagName.toLowerCase()=="input") {
				checked = !checkbox.prop("checked");
				// The checkbox has to be replaced because otherwise its
				// check-mode can't be changed ( due to OpenLayers.Event.stop(e)
				// which stops this event from happening ).
				checkbox.replaceWith(checkbox.clone().prop("checked", checked));
			}
			else {
				checked = checkbox.prop("checked");	
			}
			var legendDialogId = layerName + "ImgDialog";
			var isOpen = $("#"+legendDialogId).length ? $("#"+legendDialogId).dialog("isOpen") : false;
			if (checked) {
				sMap.events.triggerEvent("hidelayer", this, {
				    layerName : layerName
				});
				if (isOpen===true) {
					self.toggleLegend(layerName);
				}
			}
			else {
				sMap.events.triggerEvent("showlayer", this, {
				    layerName : layerName
				});
				if (isOpen===false && autoOpenLegend) {
					self.toggleLegend(layerName);
				}
			}
		});
	},
	/**
	 * Add a button (label) to the overlay-switcher which unchecks all layers.
	 */
	addBtnUnCheckAll : function(checkboxBar, label) {
		// Create an unselect all button and append it to the checkbox bar.
		var btnUnselectAll = $("<div id='overlay-btnUnselectAll' />");
		btnUnselectAll.text(label);
		var self = this;
		btnUnselectAll.click(function() {
			self.unCheckAllLayers(checkboxBar);
		});
		checkboxBar.append(btnUnselectAll);
	},
	/**
	 * Unchecks all boxes in the overlay-switcher and turns the
	 * visibility off for all layers.
	 */
	unCheckAllLayers : function(checkboxBar) {
		var self = this;
		checkboxBar.children().each(function() {
			var layerName = $(this).prop("id").split(sMap.moduleConfig.OverlaySwitcher.idDelim)[3] || null;
			var cBox = $(this).find("input");
			if (layerName && cBox.prop("checked")) {
				sMap.events.triggerEvent("hidelayer", this, {
				    layerName : layerName
				});
			}
			// Close the dialog windows.
			var legendCBox = $(this).find("img");
			if (legendCBox.length==2) {
				var legendDialogId = layerName + "ImgDialog";
				var isOpen = $("#"+legendDialogId).length ? $("#"+legendDialogId).dialog("isOpen") : false;
				if (isOpen===true) {
					self.toggleLegend(layerName);
				}
			}
		});
	},
	
//	getlegendDialog : function(layerName) {
//		var legendDivId = layerName + "ImgDialog";
//		var dialog = $("#"+legendDivId).length ? $("#"+legendDivId) : null;
//		return dialog;
//	},

	/**
	 * Toggles the legend of the layer when clicking on
	 * the layers legend image.
	 * @param layerName {String}
	 * @returns {void}
	 *     Instance of this class (SMap.MultiAccordion) (referring to 'this')
	 */
	toggleLegend : function(layerName) {
		var t = sMap.cmd.getLayerConfig(layerName);
		if (t.dialogContent){
			var legendDivId = layerName + "ImgDialog";
			
			var imageInDialog = $("#"+legendDivId);
	
			var src = "img/tableFaded.gif"; // default legend image
			var srcSelected = "img/table.gif"; // default legend image selected
			
			// Create dialog if it does not exist
			if (!imageInDialog.length) {
				imageInDialog = this.makeLegendDialog(layerName);
			}
			
			var iconLegend = $("#overlay-legend-icon-" + layerName);//t.name
			var isOpen = imageInDialog.dialog("isOpen");
			
			var newIconURL=null;
			if (isOpen===true) {
				// close dialog
				imageInDialog.dialog("close");
				// Make legend icon normal
				newIconURL = src;
				
			}
			else {
				// open the dialog
				imageInDialog.dialog("open");
				
				// Make legend icon selected (dark)
				newIconURL = srcSelected;
			}
			iconLegend.prop("src", newIconURL);
		}
	},
	
//	getDialogSize : function(dialogDiv) {
//		var outerWidth = dialogDiv.find("img").outerWidth();
//		var outerHeight = dialogDiv.find("img").outerHeight();
//		
//		outerWidth = (!outerWidth || outerWidth==0) ? 100 : outerWidth;
//		outerHeight = (!outerHeight || outerHeight==0) ? 100 : outerHeight;
//		
//		p = {x : (outerWidth + 50), y : (outerHeight + 50)};
//		
//		return p;
//	},
	
	makeLegendDialog : function(layerName) {
		var t = sMap.cmd.getLayerConfig(layerName);
		
		var dialogContent = t.dialogContent,
			layerName = t.name,
			displayName = t.displayName,
			posLeft = sMap.util.getMapPosition().x + 5,
			posTop = sMap.util.getMapPosition().y + 5;
			position = [posLeft, posTop],
			width = this.conf.legendWidth - 20,
			height = this.conf.legendHeight - 50;
	
		var legendDivId = layerName + "ImgDialog";
		var legendDiv = $("<div id='"+legendDivId+"' />");
		if (dialogContent.substring(0, 4) == "http") {
			// Create an iframe and put the URL into it
			dialogContent = $('<iframe width=' + width + ' height=' + height +
					' frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" src='+dialogContent+'></iframe>');
		}
		legendDiv.append(dialogContent);
		legendDiv.css("padding", "0");
		legendDiv.dialog({
			title: this.lang.titleDialogWindow + displayName,
			position: position,
			width: this.conf.legendWidth,
			height: this.conf.legendHeight,
			modal: false,
			autoOpen: false,
			close: function(e) {
				var iconLegend = $("#overlay-legend-icon-" + t.name);
				iconLegend.prop("src", "img/tableFaded.gif"); // default legend icon
			},
			resizeStart: function() {
				$(this).children().hide();
				$(this).parent().css({
					"filter": "alpha(opacity=70)",
			    	"opacity": "0.7"
				});
			},
			resizeStop: function(e, ui) {
				$(this).parent().css({
					"filter": "alpha(opacity=100)",
			    	"opacity": "1"
				});
				$(this).children().show();
			}
		});

		return legendDiv;
	},
	makeLegendIcon : function(t) {
		var src = "img/tableFaded.gif"; // default legend image
		var legendIconId = "overlay-legend-icon-" + t.name;
		
		var legendDivId = t.name + "ImgDialog";
		
		var legendIcon = $("<img id='" + legendIconId + "' />"); // container for checkbox and label
		legendIcon.addClass("overlaySwitcher overlay-legend-icon");
		legendIcon.prop("src", src);
		legendIcon.css({
			"width" : "16px",
			"height" : "16px"
		});		
		
		var self = this;
		var layerName = t.name;
		legendIcon.click(function(e) {
			self.toggleLegend(layerName);
			OpenLayers.Event.stop(e); // prevent toggling of layer.
		});
		
		return legendIcon;
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.OverlaySwitcher"
	
});