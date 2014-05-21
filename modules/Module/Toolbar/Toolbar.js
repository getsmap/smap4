/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Toolbar = OpenLayers.Class(sMap.Module, {
	
	buttonsConfig : {},
	
	appendIsPresent : false,
	
	functionIsBound : false,
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["addtoolbutton", "addtoolbuttontogglegroup", "addtoolbuttonradiogroup", "addtoolentry", "removeitem", "addselect"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Toolbar.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Toolbar.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
		$(this.div).empty().remove();
		this.div = null;
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
		var self = this;
		
		// Call "destroy" on each module instance connected to the button.
		$(this.toolbarDiv).children().find(".toolbar-button").each(function() {
			var CLASS_NAME = $(this).data("caller");
			var module = self.map.getControlsByClass(CLASS_NAME)[0];
			if (module) {
				module.destroy();
			}
		});
		
		// Empty the toolbar div and the non-used this.div.
		$(this.toolbarDiv).empty().remove();
		$(this.div).remove();
		sMap.events.triggerEvent("removetoolbardiv", this, {});
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draw the non-default content.
     * @returns
     */
	drawContent : function() {
		sMap.events.triggerEvent("addtoolbardiv", this, {
			height : this.height
		});
		this.toolbarDiv = $("<div id='toolbar-maindiv' />");
		$("#toolbarDiv").append(this.toolbarDiv).css({
			"line-height" : this.height + "px"
		});
		this.toolbarDiv.outerHeight(this.height);
		this.toolbarDiv.addClass("ui-widget-header");
		this.toolbarDiv.css({
			"height" : ($("#toolbarDiv").height()-2) + "px"
		});
		
		if (this.addLogotype){
			var logoDiv = $("<div id='toolbar-logo' class='toolbar-logo' ></div>");
			var link = $("<img src='"+ this.logoImgURL +"' alt='" + this.lang.logoAltText + "' width='"+this.logoWidth+"' onclick='window.open(\""+this.logoLinkURL+"\",\"homepage\");'>");
			logoDiv.append(link);
			this.toolbarDiv.append(logoDiv);
		}
		if (this.title){
			var titleDiv = $("<div id='toolbar-title' class='toolbar-title'></div>");
			titleDiv.html(this.title);
			if (this.titleCss) {
				titleDiv.css(this.titleCss);				
			}
			this.toolbarDiv.append(titleDiv);
		}
	},

	
	/******** LISTENERS **************************************************************************************/
	
	/**
	 * Listener to the event "addtoolbutton".
	 * Adds a button to the toolbar which will call one or two
	 * methods sent in as parameters. If no parameters are sent
	 * in, the button will try to use the methods "activate" and
	 * "deactivate".
	 * 
	 *  @param e {Object}
	 *      - on {Function} The function called when button is turned on.
	 *      - off {Function} The function called 
	 *  
	 * @returns
	 */
	addtoolbutton : function(e) {
		this._addtoolbutton(e);
		this.redrawPosition();
	},
	
	/**
	 * Listener to the event "addselect".
	 * Adds a <select> to the toolbar. 
	 * 
	 * @param e {Object}
	 *  
	 * @returns
	 */
	
	addselect : function(e) {
		this._addselect(e);
		this.redrawPosition();
	},
	
	addtoolentry : function(e) {
		var entry = $("<input class='toolbar-entry' type='text' />");
		entry.data("index", e.index);
		var margin = e.margin || (this.toolbarDiv.children().length==0 ? this.buttonMarginInitial : this.buttonMargin);
		
		this.toolbarDiv.append(entry);
		if (this.side=="left") {
			entry.css({
				"margin-left" : margin+"px",
				"margin-right" : margin+"px"
			});
		}
		else {
			entry.css({
				"margin-right" : margin+"px",
				"margin-left" : margin+"px"
			});
		}
		entry.css("width", e.width +"px" || entry.css("width"));
		if (e.tagID) {
			entry.prop("id", e.tagID);
		}
		this.redrawPosition();
		//this.onTagAdded(entry);
		this.fixCSS();
	},
	
	/**
	 * Add many buttons into a button group. The
	 * buttons will not interfer with each other.
	 * They are only VISUALLY grouped together.
	 * @param e {Object}
	 * @returns {void}
	 */
	addtoolbuttontogglegroup : function(e) {
		this._addtoolbuttontogglegroup(e);
		this.redrawPosition();
		this.fixCSS();
	},
	/**
	 * Add many buttons into a button group. Apart from
	 * "addtoolbuttontogglegroup" the buttons here will
	 * work as radiobuttons. This means, pressing one button
	 * in the group will lead to a deactivation of all other
	 * buttons in the group.
	 * @param e {Object}
	 * @returns {void}
	 */
	addtoolbuttonradiogroup : function(e) {
		this._addtoolbuttonradiogroup(e);
		this.redrawPosition();
		this.fixCSS();
	},
	
	/**
	 * Remove an item (button, input or button set) from the toolbar
	 * and reposition the remaining items.
	 * @param e {Object}
	 *     - item {jQuery Object}
	 *     - doNotRedrawPosition {Boolean} If true, the position of the remaining
	 *     		buttons will not be redrawn.
	 * @returns {void}
	 */
	removeitem : function(e) {
		var item = e.item;
		if (item[0].tagName.toUpperCase() == "label") {
			var tagID = item.prop("for");
			item.siblings("#"+tagID).button("destroy").empty().remove();
		}
		else if (item.is("input:checkbox")) {
			var tagID = item.prop("id");
			var label = item.siblings("label[for='"+tagID+"']");
			item.button("destroy");
			label.empty().remove();
		}
		else if (item.is("div.ui-buttonset")) {
			item.buttonset("destroy");
		}
		item.empty().remove();
		
		if (e.doNotRedrawPosition !== true) {
			this.redrawPosition();
		}
		this.fixCSS();
	},
	
	/******** END LISTENERS **************************************************************************************/
	
	/**
	 * NEW function redrawPosition. Should replace the OLD eventually (if the NEW works).
	 * Redraw the position of the buttons so that each
	 * button's position corresponds to its number (index)
	 * given in the configuration of the button.
	 */
	redrawPosition : function() {
		var self = this,
			buttons = self.toolbarDiv.children("div.ui-buttonset, input:text, label, select");
		
		if (buttons.length <= 1) {
			return false;
		}
		
		var btnIndexes = [];
		$.each(buttons, function(k,val){
			var tempSelf = $(this);
			//Do not include buttons w/o a toolbarIndex.
			if( typeof tempSelf.data("index") === "undefined" ){
				return true;
			}
			var temp = {};
			//If the search-dropdown (or the icon-only button for searchoptions-div, see Search_conf.js for details)
			//should be positioned close to searchBox - increment toolbarIndex for each button (apart from the searchBox and search-dropdown/icon-only),
			//that initially has the same index as searchBox.
			if( self.appendIsPresent === tempSelf.data("index") && typeof tempSelf.data("append") === "undefined") {
				tempSelf.data("index", self.appendIsPresent + 1);
			}
			//Store the index in buttons-array plus toolbarIndex
			temp["arrPlace"] = k;
			temp["sortIndex"] = tempSelf.data("index");
			btnIndexes.push(temp);
		});
		
		//Sort btnIndexes-array by toolbarIndex.
		btnIndexes.sort(function(a,b){ return parseFloat(a.sortIndex) - parseFloat(b.sortIndex)});
		//Add each button to toolbar.
		$.each(btnIndexes, function(k,val){
			var arrIndex = this["arrPlace"];
			self.toolbarDiv.append($(buttons[arrIndex]));
		});
	},
	
	/**
	 * OLD function redrawPosition. Should be deleted eventually (if the new one works).
	 * Redraw the position of the buttons so that each
	 * button's position corresponds to its number (index)
	 * given in the configuration of the button.
	 */
	/*redrawPosition : function() {
		var buttons = this.toolbarDiv.children("div.ui-buttonset, input:text, label, select");
		if (buttons.length <= 1) {
			return false;
		}
		//for (var i=0,len=buttons.length; i<len; i++) {
		for (var i=buttons.length-1; i>=0; i--) {
			var b = $(buttons[i]);
			var index = b.data("index");
			
			if (index != i) {
				// If index is not the desired...
				
				// There is no way a button can be moved to an index higher than the no. of buttons...
				// ...so just add the button to the last.
				if (index >= (buttons.length)) {
					this.toolbarDiv.append(b);
				}
				var tag = $(buttons[index]);
				
				// If a button replaces a button which has the same index - increment index
				// for the sibling to avoid future conflicts.
				//if (tag.data("index")===index) {
				//	tag.data("index", index+1);
				//}
				
				if (tag.length && tag[0].tagName.toUpperCase()=="LABEL") {
					// Don't append the button in between "<input/><label/>" (jquery button syntax).
					tag = tag.prev();
				}
				if (tag.length && tag[0] != b[0]) {
					// Move the item
					
					//INVALID!?!? (KB)
					// Hack: There seems to be a bug or at least complication in jquery for safari
					// when adding the input tag using insertBefore, but not when using insertAfter.
					//if (b[0].tagName=="INPUT" && OpenLayers.Util.getBrowserName()=="safari") {
						//b.insertAfter( tag.prev() );
					//}
					// If the search-dropdown (or the icon-only button for searchoptions-div,
					// see Search_conf.js for details) will be positioned close to searchBox.
					if (b[0].id != "searchBox" && b.data("append") == true && index == tag.data("index")){
						b.insertAfter( tag );
					}
					else {
						b.insertBefore( tag );
					}
				}	
			}
			buttons = this.toolbarDiv.children("div.ui-buttonset, input:text, label, select");
		}
	},*/
	
	/**
	 * Iterate through all items of the toolbar and fix the CSS for
	 * each item. A change to CSS only applies if the browser has a
	 * rule defined in the fixTagCSS method.
	 * @returns {void}
	 */
	fixCSS : function() {
		var items = $("#toolbar-maindiv").children("input:text, label, div.ui-buttonset");
		var self = this;
		items.each(function() {
			self.fixTagCSS.call(self, $(this));
		});
	},
	
	/**
	 * Change CSS for an item in the toolbar:
	 * 		- button
	 * 		- button set or
	 * 		- text entry
	 * @param tag {jQuery Tag}
	 * @returns  {void}
	 */
	fixTagCSS : function(tag) {
		// If IE7 add top CSS so that buttons gets an OK position
		// (line-height did not work for IE7)
		if (sMap.db.browser.msie) {
			var tagIsEntry = tag.length ? tag[0].tagName.toUpperCase() == "INPUT" : false;
			var entryExists = this.toolbarDiv.find("input:text").length > 0;
			
			// --- For all versions of IE -------------------------
			if (tagIsEntry) {
				tag.css("top", "2px");
			}
			
			// --- For specific versions of IE ---------------------
			if (parseInt(sMap.db.browser.version) == 7) {
				if (tag.button && tag.buttonLabel) {
					tag = tag.buttonLabel;
				}
				else {
					/* No need for entryExists check of using float: left on all entries
					if (entryExists) {
						// Move button/buttonset upwards
						//tag.css("top", "-4px");
					}
					else {
						tag.css("top", "3px");
					}*/
					tag.css("top", "3px");
				}
				if (tagIsEntry) {
					tag.css("top", "1px");
				}
			}
			else if (parseInt(sMap.db.browser.version) == 8) {
				/* No need for entryExists check of using float: left on all entries
				if (tagIsEntry) {
					tag.css("top", "1px");
				}
				*/
			}
		}
	},
	
	
	
	/**
	 * Add a toolbar button with label and icon.
	 * 
	 * Required properties:
	 * 
	 * @param iconCSS {String} (required) A CSS-class name which has a URL pointing at an image.
	 * 			This syntax is a bit annoying but jquery button cannot take simply a URL to an icon.
	 * 			The CSS class should be present in your module's css.
	 * @param label {String} (required) Label of the button.
	 * @param caller {sMap.Module} The caller class instance
	 * @param tagID {String} (required)
	 * 
	 * Optional parameters:
	 * @param options {Object}
	 *  - on {Function} Function called when turning button on. If not provided, "activate" will be called.
	 *  - off {Function} Function called when turning button off. If not provided, "deactivate" will be called.
	 *  - bindActivation {Boolean} If false, don't bind listener to module's events "activate" and "deactivate".
	 *  - toggle {Boolean} If false, don't allow deactivation of button by clicking on it. Default is true.
	 *  - index {Integer} The position of the button 0 <.
	 *  - appendToSearch {Boolean} Position the button close to searchBox (will override index if set to true).
	 *  
	 */
	
	_addtoolbutton : function(config) {
		config.toggle = config.toggle==undefined ? true : config.toggle;
		
		if (config.bindActivation!==false && !(config.on || config.off)) {
			config.bindActivation = true;
		}
		var self = this;
		
		var b = this.makeButton(config);
		var button = b.button,
			buttonLabel = b.buttonLabel;
		
		buttonLabel.data("index", config.index);
		
		button.attr("unselectable", "on").addClass("unselectable");
		buttonLabel.attr("unselectable", "on").addClass("unselectable");
		
		if (config.appendToSearch == true){
			var sBindex = $("#searchBox").data("index");
			buttonLabel.data("index", sBindex);
			buttonLabel.data("append", true);
			$("#searchBox").data("append", true);
			self.appendIsPresent = sBindex;
			var margin = 2;
		}
		else{
			var margin = this.toolbarDiv.children().length==0 ? this.buttonMarginInitial : this.buttonMargin;
		}
		
		margin = config.margin || margin;
		
		this.toolbarDiv.append(button).append(buttonLabel);
		button.button({
			text: !config.label ? false : true, // decide whether text should be disabled
			icons : {
				primary : config.iconCSS
			}
		});
		if (this.side=="left") {
			$(button).css({
				"left" : margin + "px"
			});
			$(buttonLabel).css({
				"margin-left" : margin + "px"
			});
		}
		else {
			$(button).css({
				"right" : margin + "px"
			});
			$(buttonLabel).css({
				"margin-right" : margin + "px",
				"float": "right"
			});
			//Adding the search-input screws up things in the GUI, so we must do some tweaks.
			if ($.browser.msie && parseInt($.browser.version) < 8) {
//				if( this.toolbarDiv.find("input:text").length > 0 ){
//					$(buttonLabel).css({
//						"margin-top": "-25px"
//					});
//				}
			}
//			else if ( $.browser.mozilla && this.toolbarDiv.find("input:text").length > 0 ) {
//				$(buttonLabel).css({
//					"top": "-36px"
//				});
//			}
			else {
				// Needs some hands-on when adding float right, but not for IE7 surprisingly.
				$(buttonLabel).css({
					"margin-top": "3px"
				});
			}
		}
		//this.onTagAdded(b);
		this.fixCSS();
	},
	
	/**
	 * Add a dropdown (<select>) to the toolbar.
	 * 
	 * @param config {Object}
	 *  - selectObject {jQuery Object} The <select> object.
	 *  - index {Integer} The position of the button 0 <. 
	 *  - appendToSearch {Boolean} Position the dropdown close to searchBox (will override index if set to true).
	 *  - caller {sMap.Module} The caller class instance
	 */
	
	_addselect : function(config){
		var g = config.selectObject;
		g.attr("unselectable", "on").addClass("unselectable");
		
		var caller = config.caller;
		g.data("caller", caller.CLASS_NAME);
		
		if (config.appendToSearch == true){
			var sBindex = $("#searchBox").data("index");
			g.data("index", sBindex);
			g.data("append", true);
			var margin = 2;
		}
		else{
			var margin = this.toolbarDiv.children().length==0 ? this.buttonMarginInitial : this.buttonMargin;
			g.data("index", config.index);
		}
		this.toolbarDiv.append(g);
		if (this.side=="left") {
			$(g).css({
				"margin-left" : margin + "px"
			});
		}
		else {
			$(g).css({
				"margin-right" : margin + "px"
			});
		}
		
		this.fixCSS();
	},
	
	/**
	 * 
	 * @param config
	 * @returns
	 */
	makeButton : function(config) {
		var caller = config.caller;
		var hoverText = config.hoverText? config.hoverText : "";
		var button = $("<input type='checkbox' id='"+config.tagID+"' />"),
			buttonLabel = $("<label for='"+config.tagID+"' title='"+hoverText+"'>"+config.label+"</label>");
		button.data("funcOn", config.on || caller.activate);
		button.data("funcOff", config.off || caller.deactivate);
		button.data("caller", caller.CLASS_NAME);
		
		// Bind listener which activates/deactivates button CSS when module
		// is activated/deactivated.
		// TODO: Bind to the defined on/off function (if defined) instead of
		// activate/deactivate.
		if (config.bindActivation===true && caller.events) {
			caller.events.register("activate", this, function() {
				this.renderButtonAsActive(button);
			});
			caller.events.register("deactivate", this, function() {
				var buttonIsActive = button.prop("checked");
				if (buttonIsActive) {
					this.renderButtonAsInactive(button);
				}
			});
		}
		var self = this;
		button.click(function(e) {
			if ( !$(this).prop("checked")) {
				// Deactivate button only if toggle is allowed (if toggle is not false).
				// If no success in deactivating - don't render the button as inactive.
				if (config.toggle!==false) {
					var success = $(this).data("funcOff").call(caller);
					if (!success) {
						self.renderButtonAsActive( $(this) );
					}
					else{
						self.renderButtonAsInactive( $(this) );
					}
				}
			}
			else {
				// Activate button. If no success - don't render the button as active.
				var success = $(this).data("funcOn").call(caller);
				if (!success) {
					self.renderButtonAsInactive( $(this) );
				}
				else{
					self.renderButtonAsActive( $(this) );
				}
			}
		});
		return {
			button: button,
			buttonLabel: buttonLabel
		};
	},
	
	
	renderButtonAsActive : function(button) {
		button.prop("checked", true);
		var tagID = button.prop("id");
		var label = button.siblings("label[for='"+tagID+"']");
		label.addClass(this.toolbarButtonActiveCSSClass); // next() refers to the button GUI (the label tag of the button)
	},
	
	renderButtonAsInactive : function(button) {
		button.prop("checked", false);
		var tagID = button.prop("id");
		var label = button.siblings("label[for='"+tagID+"']");
		label.removeClass(this.toolbarButtonActiveCSSClass);
		label.removeClass("ui-state-focus"); // focus/hover stays after deactivating
	},
	
	_addtoolbuttontogglegroup : function(config) {
		var configs = config.buttons,
			group = $("<div />"),
			b = null,
			t = null;
		
		var margin = this.toolbarDiv.children().length==0 ? this.buttonMarginInitial : this.buttonMargin;
		this.toolbarDiv.append(group);
		for (var i=0,len=configs.length; i<len; i++) {
			t = configs[i];
			t.caller = config.caller;
			b = this.makeButton(t);
			group.append(b.button).append(b.buttonLabel);
			b.button.button({
				text: !t.label ? false : true, // decide whether text should be disabled
				icons : {
					primary : t.iconCSS
				}
			});
		}
		group.buttonset();
		
		group.data("index", config.index);

		$(group).css({
			"position" : "relative",
			"display" : "inline"
		});
		
		if (this.side=="left") {
			$(group).css({
				"margin-left" : margin + "px"
			});
		}
		else {
			$(group).css({
				"margin-right" : margin + "px"
			});
		}
		//this.onTagAdded(group);
		this.fixCSS();

	},
	
	_addtoolbuttonradiogroup : function(config) {
		var configs = config.buttons,
			group = $("<div />"),
			b = null,
			t = null;
		
		var margin = this.toolbarDiv.children().length==0 ? this.buttonMarginInitial : this.buttonMargin;
		this.toolbarDiv.append(group);
		for (var i=0,len=configs.length; i<len; i++) {
			t = configs[i];
			t.caller = config.caller;
			b = this.makeRadioButton(t);
			group.append(b.button).append(b.buttonLabel);
			b.button.button({
				text: !t.label ? false : true, // decide whether text should be disabled
				icons : {
					primary : t.iconCSS || null
				}
			});
		}
		group.buttonset();
		group.data("index", config.index);
		$(group).css({
			"position" : "relative",
			"display" : "inline"
		});
		if (this.side=="left") {
			$(group).css({
				"margin-left" : margin + "px"
			});
		}
		else {
			$(group).css({
				"margin-right" : margin + "px"
			});
		}
		//this.onTagAdded(group);
		this.fixCSS();
	},
	
	makeRadioButton : function(config) {
		var button = $("<input type='radio' id='"+config.tagID+"' name='radio' />"),
			buttonLabel = $("<label for='"+config.tagID+"'>" + config.label + "</label>");
		
		var caller = config.caller;
		button.data("funcOn", config.on || caller.activate);
		button.data("funcOff", config.off || caller.deactivate);
		button.data("caller", caller.CLASS_NAME);
		
		// Bind listener which activates/deactivates button CSS when module
		// is activated/deactivated.
		// TODO: Bind to the defined on/off function (if defined) instead of
		// activate/deactivate.
		if (config.bindActivation===true && caller.events) {
			caller.events.register("activate", this, function() {
				var buttonIsActive = button.prop("checked")===true;
				if (buttonIsActive) {
					this.renderButtonAsActive(button);
				}
			});
			caller.events.register("deactivate", this, function() {
				var buttonIsActive = button.prop("checked")===true;
				if (buttonIsActive) {
					this.renderButtonAsInactive(button);
				}
			});
		}
		var self = this;
		button.click(function(e) {
			var theOtherButtons = button.parent().find("input[checked!=true]");
			theOtherButtons.each(function() {
				$(this).prop("checked", false).removeClass("ui-state-active");
				$(this).data("funcOff").call(caller);
			});
			if ( $(this).prop("checked")===true) {
				// Deactivate button only if toggle is allowed (if toggle is not false)
				if (config.toggle!==false) {
					$(this).data("funcOn").call(caller);
				}
			}
		});
		return {
			button: button,
			buttonLabel: buttonLabel
		};
		
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Toolbar"
	
});




