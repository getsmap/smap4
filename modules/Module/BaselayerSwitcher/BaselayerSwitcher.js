/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.BaselayerSwitcher = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 * 
	 * "switchbaselayerbutton" : changes baselayerbutton.
     *    - layerName {String} The layername that has been turned on.
	 */
	EVENT_LISTENERS : ["setbaselayer"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 * 
	 * "setbaselayer" : Triggers the event in the core that changes baselayer.
     *    - layerName {String} The layername to be turned on.
	 */
	EVENT_TRIGGERS : ["setbaselayer"],

	cats : null,
	
	initialize : function(options) {
		options = options || {};
		this.dropDownOnSingle = options.dropDownOnSingle;
		this.buttonWidth = options.buttonWidth;
		this.dropDownWidth = options.dropDownWidth;
		this.EVENT_LISTENERS =
			sMap.Module.BaselayerSwitcher.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.BaselayerSwitcher.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		this.delim = "___"; // delimiter for id:s
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
		$(this.div).empty().remove();
		delete this.div;
		this.div = $("<div />");
		$("#mapDiv").append(this.div);
		if (this.map.allOverlays===true) {
			return false;
		}
		this.addBaselayerSwitcher();
		
		//Test if it works: setTimeout('sMap.events.triggerEvent("setbaselayer", this, {layerName: "Orto2010"});', "1000"); 
	},
	
	
	setbaselayer: function(e) {
		if (e.caller === this) {
			return true;
		}
		this.switchBaseLayerButton(e.layerName);
		
	},
	
	/**
	 * Replaces the following chars so that they work out as key
	 * in dict: space, comma, point (end of line).
	 * @param text {String} The string you want to alter
	 * @param decode {Boolean}
	 * 		False -> encode (replace "." "," and space with accepted chars)
	 * 		True -> decode (restore the string to its original with ., and space)
	 * 
	 */
	replaceOddChars : function(text, decode) {
		if (decode===true) {
			text = text.replace(/_/g, " ");
			text = text.replace(/ZZ/g, "\.");
			text = text.replace(/CoMMa/g, "\,");
		}
		else {
			text = text.replace(/ /g, "_");
			text = text.replace(/\./g, "ZZ");
			text = text.replace(/\,/g, "CoMMa");
		}
		return text;
	},
	
	/**
	 * Add the switcher.
	 */
	addBaselayerSwitcher : function() {
		
		var buttonDiv = $("<div id='baselayerDiv' class='baselayerDiv' />");
		$(this.div).append(buttonDiv);
		
		$(this.div).css({
			"position" : "absolute",
			"top" : "5px",
			"right" : "8px",
			"height" : "auto",
			"z-index" : "1007" // must be one unit higher than overlays switcher so that btns can be clicked
		});
		
		// Store all baselayers config in an ass. array keyed by category name.
		var cats = {};
		for (var i=0,len=sMap.config.layers.baselayers.length; i<len; i++) {
			var t = $.extend(true, {}, sMap.config.layers.baselayers[i]);
			var idCat = this.replaceOddChars(t["category"]);
			
			if (!cats[idCat]) {
				cats[idCat] = [];
			}
			cats[idCat].push(t);
		}

		sMap.events.triggerEvent("blswitcher_makearrmakearr", this, {cats: cats});
		
		this.cats = cats;
		
		// Make a button for each category with same text as category.
		var b=null;
		var toggleDropDown = this.toggleDropDown;
		var delim = this.delim;
		
		// ---- Make the drop down if it should be made -----
		
		for (var cat in cats) {
			
			b = $("<div class='ui-widget-content ui-state-default baselayer-button' />");
			var bId = "bLayerSwitcher" + this.delim + cat;
			b.attr("id", bId);
			
			var labelCat = this.replaceOddChars(cat, true);
			b.text(labelCat);
			b.prop("z-index", "1008");
			
			buttonDiv.prepend(b);
			
			// Make drop-down inputs if more than 1 layer per category
			// or if dropDownOnSingle is true.
			var catsArr = cats[cat];
			if (catsArr.length>1 || (catsArr.length==1 && this.dropDownOnSingle===true)) {
				var dropDownDiv = this.makeDropDown(cat, catsArr);
				
				$(this.div).append(dropDownDiv);
				
				dropDownDiv.prop("z-index", "1007");
				dropDownDiv.hide(); // drop down should start hidden
			}
		}


		// Make the buttons same width
		var minWidth=0;
		buttonDiv.find("div").each(function() {
			minWidth = Math.max(minWidth,  $(this).width());
		});
		buttonDiv.find("div").each(function() {
			$(this).css("min-width", minWidth);
		});

		// var nrOfBtns = buttonDiv.find("div").length;
		// var w = this.buttonWidth;
		// var nrOfBtns=0;
		// buttonDiv.find("div").each(function() {
		// 	$(this).width(w);
		// 	nrOfBtns += 1;
		// });
		
		// this.buttonOuterWidth = w + 2; // button width + total padding (if any) and border (if any...)
		
		// buttonDiv.width(nrOfBtns * this.buttonOuterWidth + 10);
		// // Set the width to the container div explicitly.
		// $(this.div).width(nrOfBtns * this.buttonOuterWidth + 10);
		
		//}

		
		// ---- Decide the position of drop-down from right. -----
		
		var getButtonPosition = this.getButtonPosition;
		var getDropDownDiv = this.getDropDownDiv;
		var delim = this.delim;
		var self = this;
		
		var n = 0; // Keep track of button number
		buttonDiv.find("div").each(function() {
			var b = $(this);
			var right = self.getButtonPosition(b, n);
			var cat = $(this).prop("id").split(delim)[1];
			var dropDownDiv = getDropDownDiv(cat);
			dropDownDiv.css("right", right+"px");
			n+=1;
		});
		
		
		var self = this;
		var getDropDownDiv = this.getDropDownDiv;
		// ----- Now that the buttons and drop downs are made -
		// - lets define click and hover interactions for buttons. -----
		buttonDiv.find("div").each(function() {
			$(this).click(function(e) {
				self.pressButton.call(self, this);
			});
			var cat = $(this).prop("id").split(delim)[1];
			var div = getDropDownDiv(cat);
			
			if (div.length) {
				// Show drop down on hover and hide on hover out.
				$(this).mouseenter(function() {
					bId = $(this).prop("id");
					var cat = bId.split(delim)[1];
					
					if ($(this).hasClass("baselayer-button-clicked")===true) {
						$(this).addClass("dropDownHover");
					}
					else {
						$(this).addClass("dropDownHover-notClicked");
					}
					toggleDropDown(cat, true);
				});
				$(this).mouseleave(function() {
					var cat = $(this).prop("id").split(delim)[1];
					$(this).removeClass("dropDownHover");
					$(this).removeClass("dropDownHover-notClicked");
					toggleDropDown(cat, false);
				});
			}
		});
		
		// ---- And define what interaction should be disabled... -----
		$(this.div).dblclick(function(e) {
			OpenLayers.Event.stop(e);
		});
		$(this.div).mousedown(function(e) {
			OpenLayers.Event.stop(e);
		});
			
		
		// Set the initial configuration of the buttons.
		// If a parameter was sent in - this baselayer's
		// radio button and category button should be marked.
		// Otherwise, the default buttons should be marked.
		// BaseLayer is also set at this time.
		var layerName=null;
		if (!sMap.cmd.getStartingParamsAsObject().BL) {
			layerName = this.map.baseLayer.name;
			var b = this.getButton(layerName);
			this.pressButton.call(this, b);
			$(b).removeClass("dropDownHover");
		}
		else {
			layerName = sMap.cmd.getStartingParamsAsObject().BL;
			var b = this.getButton(layerName);
			this.markButton(b);
		}
		
		this.pressRadioButton(layerName);
		$(b).removeClass("dropDownHover");
		//Trigga eventet setbaselayer
		sMap.events.triggerEvent("setbaselayer", this, {
		    layerName : layerName
		});

	},
	
	
	/**
	 * @param cat {String}
	 *     The category (i.e. label) for the baselayer button.
	 * @return {HTML div}
	 *     The drop down div
	 */
	getDropDownDiv : function(cat) {
		var idCat = cat.replace(/ /, "_");
		var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
		var dropDownDiv = $("#bLayerDropDown" + ctrl.delim + idCat);
		return dropDownDiv;
	},
	
	toggleDropDown : function(categoryName, change) {
		var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
		var delim = ctrl.delim;

		var dropDownDivID = "bLayerDropDown" + delim + categoryName;
		var dropDownDiv = $("#"+dropDownDivID);
		if (change===true) {
			dropDownDiv.show();
			
		}
		else if (change===false) {
			dropDownDiv.hide();
		}
		delim=null, ctrl=null;
	},
	
	/**
	 * Returns the category button which controls the layer with
	 * given layerName.
	 * @param layerName {String}
	 *     The baselayer name
	 */
	getButton : function(layerName) {
		var cat = null;
		var button = null;
		var t;

		var cats = this.cats;

		var mergedArr = [];
		for (var h in cats) {
			mergedArr = mergedArr.concat(cats[h]);
		}
		for (var i=0,len=mergedArr.length; i<len; i++) {
			t = mergedArr[i];
			if (layerName.toLowerCase()==t.name.toLowerCase()) {
				cat = t.category;
				break;
			}
		}
		
		if (cat!=null) {
			var bId = "bLayerSwitcher" + this.delim + this.replaceOddChars(cat);
			button = $("#"+bId);
		}
		
		return button;
	},

	// getButton : function(layerName) {
	// 	var cat = null;
	// 	var button = null;
	// 	var t;
		
	// 	for (var i=0,len=sMap.config.layers.baselayers.length; i<len; i++) {
	// 		t = sMap.config.layers.baselayers[i];
	// 		if (layerName.toLowerCase()==t.name.toLowerCase()) {
	// 			cat = t.category;
	// 			break;
	// 		}
	// 	}
		
	// 	if (cat!=null) {
	// 		var bId = "bLayerSwitcher" + this.delim + this.replaceOddChars(cat);
	// 		button = $("#"+bId);
	// 	}
		
	// 	return button;
	// },

	
	/**
	 * Trigger press on this button. Called on click but
	 * can be called programmatically as well.
	 * @param b {HTML div}
	 *     The button user clicked on.
	 */
	pressButton : function(b) {
		
		this.markButton(b);
		
		var cat = $(b).prop("id").split(this.delim)[1];
		var idCat = this.replaceOddChars(cat);
		var catsArr = this.cats[idCat];
		
		var layerName = catsArr[0].name; // default layer for this category to be visible on click
		
		sMap.events.triggerEvent("setbaselayer", this, {
			layerName : layerName
		});
		
		// Unselect all radio buttons.
		var allInputs = $(this.div).find("[id*=bLayerInput]");
		allInputs.each(function(){
			$(this).prop("checked", false);
		});
		
		// If drop down exists for this button - change selected input.
		if (catsArr.length>1 || (catsArr.length==1 && this.dropDownOnSingle===true)) {
			this.pressRadioButton(layerName);
			$(b).addClass("dropDownHover");
		}
	},
	
	markButton : function(b) {
		// "Unselect" other buttons
		$(b).siblings().each(function() {
			$(this).removeClass("baselayer-button-clicked");
			$(this).removeClass("ui-state-active");
			
			$(this).removeClass("dropDownHover");
		});
		// "Select" clicked button.
		$(b).addClass("baselayer-button-clicked");
		$(b).addClass("ui-state-active");
		$(b).removeClass("dropDownHover-notClicked");
	},

	getConfig: function(layerName) {
		var ls = this.cats || {},
			t, arr;
		for (var category in ls) {
			arr = ls[category];
			for (var i=0,len=arr.length; i<len; i++) {
				t = arr[i];
				if (t.name === layerName) {
					return t;
				}
			}
		}
		return null;
	},
	
	/**
	 * Change the selected input radio button in the drop-down programmatically.
	 * @param layerName {String}
	 *     The layer name for the layer who's radio button should be selected.
	 *     Nothing else will be triggered by calling this method, such as
	 *     event handlers... so you have to change the base layer yourself
	 *     if you want to do that.
	 */
	pressRadioButton : function(layerName) {
		var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
		var allInputs = $(ctrl.div).find("[id*=bLayerInput]");
		allInputs.each(function(){
			$(this).prop("checked", false);
		});
		var inputTagID = "bLayerInput" + ctrl.delim + layerName;
		var inputTag = $("#"+inputTagID);
		inputTag.prop("checked", true);

		
		var b = ctrl.getButton(layerName);
		$(b).addClass("dropDownHover");
		$(b).removeClass("dropDownHover-notClicked");
		
		var t = ctrl.getConfig(layerName);
		if (t && t.onClick) {
			t.onClick.call(inputTag.parent(), true);
		}
		
	},
	
	/**
	 * Make a drop down tag which appears on base layer button hover.
	 * @param cat, catsArr
	 */
	makeDropDown : function(cat, catsArr) {
		var t=null, rowDiv=null, labelTag=null, inputTag;
		var dropDownDiv=$("<div class='bLayerSwitcher-dropDown' />");
		dropDownDiv.prop("id", "bLayerDropDown" + this.delim + cat);
		
		
		for (var i=0,len=catsArr.length; i<len; i++) {
			t = catsArr[i];
			
			rowDiv = $("<div />");
			//rowDiv.addClass("bLayerSwitcher-dropDown-rowDiv");
			rowDiv.prop("id", "bLayerRow" + this.delim + t.name);
			
			labelTag = $("<span />");
			labelTag.html(t.displayName);
			labelTag.prop("id", "bLayerLabel" + this.delim + t.name);
			
			inputTag = $("<input type='radio' />");
			inputTag.prop("id", "bLayerInput" + this.delim + t.name);
			
			rowDiv.append(inputTag);
			rowDiv.append(labelTag);

			rowDiv.click(t.onClick || function(e) {
				var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
				var layerName = $(this).prop("id").split(ctrl.delim)[1];
				ctrl.pressRadioButton(layerName);
				//Trigga eventet setbaselayer
				sMap.events.triggerEvent("setbaselayer", this, {
				    layerName : layerName
				});
				//ctrl.map.setBaseLayer(ctrl.map.getLayersByName(layerName)[0]);
				var b = ctrl.getButton(layerName);
				ctrl.markButton(b);
			});
			dropDownDiv.append(rowDiv);
		}
		
		// Keep drop down visible on hover but hide on hover out.
		dropDownDiv.mouseenter(function() {
			var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
			var cat = $(this).prop("id").split(ctrl.delim)[1];
			var b = $("#bLayerSwitcher" + ctrl.delim + cat);
			
			if (b.hasClass("baselayer-button-clicked")===true) {
				b.addClass("dropDownHover");
				
			}
			else {
				b.addClass("dropDownHover-notClicked");
			}
			
			$(this).show();
			
		});
		dropDownDiv.mouseleave(function() {
			var ctrl = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher")[0];
			var cat = $(this).prop("id").split(ctrl.delim)[1];
			var b = $("#bLayerSwitcher" + ctrl.delim + cat);
			b.removeClass("dropDownHover");
			b.removeClass("dropDownHover-notClicked");
			$(this).hide();
		});
		
		return dropDownDiv;
	},
	
	/**
	 * Get the position of the button from the right. This
	 * is used for positioning the drop-down div.
	 * @param {div} The baselayer button
	 * @param {Integer}
	 *     The number of buttons to the right of this button.
	 */
	getButtonPosition : function(b, buttonNr) {
		var bPadding = sMap.util.takeAwayPx(b.css("padding-left")) + sMap.util.takeAwayPx(b.css("padding-right"));
		var bRight = (buttonNr) * b.outerWidth();
		var totalRight = bRight;
		return totalRight;
	},
	/**
	 * Listener to the event "switchbaselayerbutton".
	 * Switch the baselayerbutton to the one that is
	 * sent in as a parameter. It doesn't change the baselayer.
	 * If the layer doesn't exist nothing happens.
	 * 
	 *  @param layerName {String}
	 *  @returns {void}
	 */
	switchBaseLayerButton : function(layerName) {
		var b = this.getButton(layerName);
		this.markButton(b);
		this.pressRadioButton(layerName);
//		$(b).removeClass("dropDownHover");
	},

	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.BaselayerSwitcher"
	
});