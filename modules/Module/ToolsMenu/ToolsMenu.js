/**
 * @author Kristian Bergstrand
 * @copyright Helsingborgs stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.ToolsMenu = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["addtomenu", "removebtnfromtoolsmenu"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	// Keeps track of the modules in toolsMenu.
	modulesInToolsMenu : [],
	
	// Add these modules when activating the module.
	addTheseToMenu : [],
	
	// Keeps track of all the toolsMenus.
	toolsMenuDivs : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.ToolsMenu.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.ToolsMenu.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		var self = this;
		
		// Draw final position for each of the "hover-divs".
		$.each(self.toolsMenuDivs, function(key,val) {
				self.drawToolsMenu(val["menu"], val["id"]);
		});
		
		// Attach modules to the correct toolsMenu.
		$.each(self.addTheseToMenu, function(key,val){
			self.addtooltotoolsmenu(val["btn"],val["config"]);
		});
		
		// Remove state active from start (sohuld only add on hover).
		setTimeout(function() {
			var btns = $(".toolsmenu-mainbutton");
			btns.each(function() {
				$(this).removeClass("ui-state-active");
			});						
		}, 20);
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		
		$(".toolsmenu-dropdown").each(function(){
			$(this).empty().remove();
		});
		
		// Call the deactivate method of the parent class
		return sMap.Module.prototype.deactivate.apply(
	            this, arguments
		);
	},
	
	destroy : function() {
		// Call the destroy method of the parent class
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Called when all modules are initialized, i.e. after initialize.
     * All initial HTML should be produced from here.
     * 
     * @returns
     */
	
	drawContent : function() {
		var self = this,
			toolsMenus = self.menuBtns;
		
		$.each(toolsMenus, function(i,val){
			var theId = "button-toolsmenu" + val["menuId"];
			sMap.events.triggerEvent("addtoolbutton", self, {
				index : val["toolBarIndex"] || 1,
				label : val["lblText"] || self.lang.labelText,
				iconCSS : "ui-icon-triangle-1-s",
				tagID : theId
			});
			var btn = $("label[for='"+theId+"']");
			btn.addClass("toolsmenu-mainbutton");
			if (val.marginRight) {
				btn.css("margin-right", val.marginRight);
			}
			
			// Create "hover-div".
			var hoverDiv = self.createToolsMenu(theId, val["menuId"]);
			hoverDiv.attr("unselectable", "on").addClass("unselectable");
			var menuAndId ={
					menu : hoverDiv,
					id : val["menuId"]
			};
			// Store "hover-div" and internal ID-extension. To be used on activation
			// of the module, when the final position of the "hover-div" will be drawn.
			self.toolsMenuDivs.push(menuAndId);
			
		});
		
		// Reposition the dropdown on resize.
		var self = this;
		$(window).resize(function() {
			setTimeout(function() {
				self.positionDropDowns();
			}, 200);
		});
	},
	
	/**
     * Called when all modules have added tools to toolsMenu(s). 
     * Draws the final position of the "hover-divs".
     * 
     * @param menu {Object}
     * 			"Hover-div" to be appended to the toolsMenu-button (jQuery-object).
     * @param menuID {String}
     * 			The internal suffix for the IDs, to keep track of multiple toolsMenus. 
     * @returns
     */
	drawToolsMenu : function(menu, menuID) {
		var toolsMenuDiv = menu;
		$("#toolbar-maindiv").append(toolsMenuDiv);
	},
	
	/**
	 * Position the dropdowns so that they go below the toggle button.
	 * 
	 * @returns {void}
	 */
	positionDropDowns: function() {
		$(".toolsmenu-dropdown").each(function() {
			var dropDown = $(this);
			var menuID = "button-toolsmenu" + dropDown.attr("id").replace("toolsmenu-dropdown", "");
			var btn = $("label[for='"+menuID+"']");
			var btnOffset = btn.offset(),
				height = btn.outerHeight();
			
			$(dropDown).css({
				"left" : btnOffset.left,
				"position" : "absolute",
				"top" :  btnOffset.top + height -3
			});		
			
		});
		
	},
	
	
	
	/**
	 * Create the container for the menu.
	 * 
	 * @param btnId {String}
	 * 		The id of the toolbar-button (i.e. for the label...jquery-ui syntax).
	 * 			E.g: "button-toolsmenu1"
	 * 
	 * @param menuId {String}
	 * 		The internal suffix for the IDs, to keep track of multiple toolsMenus.
	 * 			E.g: 1
	 * 
	 * @returns toolsMenuDiv {Object}
	 * 		jQuery-object holding the "hover-div".
     */
	
	createToolsMenu : function(btnId, menuId) {
		var self = this,
			toggleDivId = "toolsmenu-dropdown" + menuId;
		
		// Create "hover-div" and specify the btn to which it will be appended.
		// Then add some css-classes and hide it from start.
		var	toolsMenuDiv = $("<div id='" + toggleDivId + "' />"),
			btnArea = $("label[for='" + btnId + "']");
		
		toolsMenuDiv.addClass("toolsmenu-dropdown ui-widget-content ui-state-default");
		var minWidth = $("label[for='"+btnId+"']").width();
		toolsMenuDiv.css("min-width", minWidth+"px");
		toolsMenuDiv.hide();
		
		// Define what should happen on click, hover and mouseleave.
		btnArea.click(function(event){
			if( $("#" + toggleDivId ).is(":visible") ){
				self.renderBtnAsInactive($("#"+btnId));
				$("#" + toggleDivId ).hide();
				event.preventDefault();
			}
			else{
				self.renderBtnAsActive($("#"+btnId));
				$("#" + toggleDivId ).show();
				event.preventDefault();
			}
		});
		
		btnArea.hover(function(){
			self.renderBtnAsActive($("#"+btnId));
			$("#" + toggleDivId ).show();
		},function(){
			toolsMenuDiv.hover(function(){
				self.renderBtnAsActive($("#"+btnId));
				$("#" + toggleDivId ).show();
			},function(){
				self.renderBtnAsInactive($("#"+btnId));
				$("#" + toggleDivId ).hide();
			});
		});	
			
		btnArea.mouseleave(function(event){
			self.renderBtnAsInactive($("#"+btnId));
			$("#" + toggleDivId ).hide();
		});
		
	return toolsMenuDiv;
	},
	
	/**
	 * Draw the position of the buttons so that each
	 * button's position corresponds to its number (index)
	 * given in the configuration of the button.
	 * 
	 * @param menuDiv {Object}
	 * 		Defines which toolsMenu that will be redrawn (jQuery-object).
	 * 
	 * @returns
	 */
	drawPosition : function(menuDiv) {
		var self = this,
			buttonRows = menuDiv.children(".toolsmenu-rows");
		
		if (buttonRows.length <= 1) {
			return false;
		}
		
		for (var i=buttonRows.length-1; i>=0; i--) {
			var buttonRow = $(buttonRows[i]);
			var index = buttonRow.children("label").data("index");
			
			if (index != i) {
				// If index is not the desired...
				
				// There is no way a button can be moved to an index higher than the no. of buttons...
				// ...so just add the button to the last.
				if (index >= (buttonRows.length)) {
					menuDiv.append(buttonRow);
				}
				var tag = $(buttonRows[index]).children("div.ui-buttonset, input:text, label");
				
				// If a button replaces a button which has the same index - increment index
				// for the sibling to avoid future conflicts.
				if (tag.data("index")===index) {
					tag.data("index", index+1);
				}	
			}
			buttonRows = menuDiv.children(".toolsmenu-rows");
		}
	},
	
	/**
	 * Render a button as active.
	 * 
	 * @param button {Object}
	 * 		The toolbar-button to render as active (jQuery object).
	 * 
	 * @returns
	 */
	
	renderBtnAsActive : function(button) {
		button.prop("checked", true);
		var tagID = button.prop("id");
		var label = button.siblings("label[for='"+tagID+"']");
		label.addClass(this.toolbarBtnActiveCSSClass);
	},
	
	/**
	 * Render a button as inactive.
	 * 
	 * @param button {Object}
	 * 		The toolbar-button to render as inactive (jQuery object).
	 * 
	 * @returns
	 */
	
	renderBtnAsInactive : function(button) {
		button.prop("checked", false);
		var tagID = button.prop("id");
		var label = button.siblings("label[for='"+tagID+"']");
		label.removeClass(this.toolbarBtnActiveCSSClass);
	},
	
	/**
	 * Remove a module from the toolsMenu(s), and reposition the remaining modules.
	 * 
	 * @param e {Object}
	 *     - lblToDel {String} 
	 *     		The label for the button to remove from toolsMenu.
	 *     		E.g. "button-copylink"
	 *     	
	 *     - doNotRedrawPosition {Boolean} If true, the position of the remaining
	 *     		buttons will not be redrawn.
	 *     
	 * @returns
	 */
	removebtnfromtoolsmenu : function(e) {
		var self = this,
			lblToDel = e.lblToDel;
		
		//Find which module to delete in modulesInToolsMenu array. Return if not found.
		var modIndex = $.inArray(lblToDel,self.modulesInToolsMenu);
		if ( modIndex == -1){
			return;
		}
		//If found, delete module from array.
		self.modulesInToolsMenu.splice(modIndex,1);
		
		var btnToDel = $(".toolsmenu-dropdown").children(".toolsmenu-rows").find("label[for='"+lblToDel+"']");
		btnToDel.siblings("#"+lblToDel).button("destroy").empty().remove();
		btnToDel.empty().remove();
		
		if (e.doNotRedrawPosition !== true) {
			var menuDivs = $(".toolsmenu-dropdown");
			$.each(menuDivs,function(){
				self.drawPosition($(this));
			});
		}
	},
	
	/**
	 * Make a "jQuery ui" button.
	 * 
	 * @param config
	 *  
	 * @returns {Object}
	 * 		- modBtn {Object} jQuery-ui button.
	 * 		- modBtnLabel {Object} Label for the button.
	 */
	
	makeBtn : function(config) {
		var self = this,
			caller = config.caller,
			hoverText = config.hoverText ? config.hoverText : "";
		
		var modBtn = $("<input type='checkbox' id='"+config.tagID+"' />"),
			modBtnLabel = $("<label for='"+config.tagID+"' title='"+hoverText+"'>"+config.label+"</label>");
		modBtn.data("funcOn", config.on || caller.activate);
		modBtn.data("funcOff", config.off || caller.deactivate);
		modBtn.data("caller", caller.CLASS_NAME);
		modBtnLabel.data("index", config.index);
		
		// Bind listener which activates/deactivates button CSS when module is activated/deactivated.
		// TODO: Bind to the defined on/off function (if defined) instead of activate/deactivate.
		if (config.bindActivation===true && caller.events) {
			caller.events.register("activate", this, function() {
				var btn = modBtn;
				var buttonIsActive = btn.prop("checked") ? true : false;
				if (buttonIsActive) {
					self.renderBtnAsActive(btn);
				}
			});
			caller.events.register("deactivate", this, function() {
				var btn = modBtn;
				var buttonIsActive = btn.prop("checked");
				if (buttonIsActive) {
					self.renderBtnAsInactive(btn);
				}
			});
		}
		
		modBtn.click(function(e) {
			if ( !$(this).prop("checked")) {
				// Deactivate button only if toggle is allowed (if toggle is not false).
				// If no success in deactivating - don't render the button as inactive.
				if (config.toggle!==false) {
					var success = $(this).data("funcOff").call(caller);
					if (!success) {
						self.renderBtnAsActive( $(this) );
					}
					else{
						self.renderBtnAsInactive( $(this) );
					}
				}
			}
			else {
				// Activate button. If no success - don't render the button as active.
				var success = $(this).data("funcOn").call(caller);
				if (!success) {
					self.renderBtnAsInactive( $(this) );
				}
				else{
					self.renderBtnAsActive( $(this) );
				}
			}
		});
		return {
			button: modBtn,
			buttonLabel: modBtnLabel
		};
		
	},
	
	/**
	 * Checks if the module is already in the toolsMenu(s).
	 * 
	 * @param modToAdd {String} Name of the module as specified in config.tagID.
	 *  
	 * @returns modToAdd {String} Name of the module as specified in config.tagID. IF it is not found.
	 * 			false {Boolean} IF it is already in the toolsMenu(s).
	 */
	
	doubleCheck : function(modToAdd){
		var modulesInToolsMenu = this.modulesInToolsMenu,
			check = $.inArray(modToAdd,modulesInToolsMenu);
		if (check!=-1){
			return false;
		}
		else{
			modulesInToolsMenu[modulesInToolsMenu.length]=modToAdd;
			return modToAdd;
		}
	},
	
	/**
	 * Listener to the event "addtomenu".
	 * 
	 * Adds button along with its config to object "addTheseToMenu". When toolsMenu-module is activated, 
	 * these buttons will be appended to the right toolsMenu-dropdown.
	 * The button will call one or two methods sent in as parameters. If no parameters are sent
	 * in, the button will try to use the methods "activate" and "deactivate".
	 * 
	 *  @param e {Object}
	 *      - on {Function} The function called when button is turned on.
	 *      - off {Function} The function called 
	 *  
	 * @returns
	 */
	
	addtomenu : function(config){
		var self = this;
		
		//Check to see if module already exists in a toolsMenu.
		var checkDoubles = self.doubleCheck(config.tagID);
		if(checkDoubles===false){return false;}
		
		config.toggle = config.toggle==undefined ? true : config.toggle;
		if (config.bindActivation!==false && !(config.on || config.off)) {
			config.bindActivation = true;
		}
		
		//Make the button
		var btn = self.makeBtn(config);
		
		// Allows triggering the event when the module is active. May be needed.
		if (self.active === true){
			self.addtooltotoolsmenu(btn,config);
		}
		else{
			var btnAndConfig = {
					"btn" : btn,
					"config" : config
			};
			self.addTheseToMenu.push(btnAndConfig);
		}
	},
	
	/**
	 * Adds a button to the toolsMenu.
	 * 
	 *  @param btn {Object}
	 *  @param config {Object}
	 *  
	 * @returns
	 */
	
	addtooltotoolsmenu : function(btn, config) {
		// Append module to the toolsMenu specified in config.menuId, or append it to first toolsMenu in
		// toolsMenu_conf.js if not specified.
		var toolsMenuDiv = $("#toolsmenu-dropdown"+config.menuId).length ? $("#toolsmenu-dropdown"+config.menuId) : $("#toolsmenu-dropdown"+this.menuBtns[0].menuId);
		
		var modBtn = btn.button,
			modBtnLabel = btn.buttonLabel,
			modRow = $("<div class='toolsmenu-rows' />");
		
		modRow.append(modBtn).append(modBtnLabel);
		toolsMenuDiv.append(modRow);
		modBtn.button({
			text: !config.label ? false : true, // decide whether text should be disabled
			icons : {
				primary : config.iconCSS
			}
		});
		modRow.children(".ui-button").css({
			"display":"block",
			"margin" : "0"
		});
		this.drawPosition(toolsMenuDiv);
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.ToolsMenu"
});