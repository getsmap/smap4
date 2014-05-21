/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.IntroDialog = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : [],
	
	isIe7: ($.browser.msie && parseInt($.browser.version) < 8),
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.IntroDialog.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.IntroDialog.prototype.EVENT_TRIGGERS.concat(
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
		var dontShow = this.checkboxDontShow && $.cookie('smap_introdialog_dontshowagain') && $.cookie('smap_introdialog_dontshowagain') === "1" ? true : false;
		if (dontShow === true) {
			debug.log("User has cookie smap_introdialog_dontshowagain. Not showing intro dialog");
			return false;
		}
		this._makeDialog();
		this.dialog.dialog("open");
		if (this.checkboxDontShow) {
			this._addCheckbox();
		}
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		this.dialog.dialog("close");
		
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
     * @returns {void}
     */
	drawContent : function() {},
	
	_makeDialog: function() {
		if (!this.dialog) {
			var self = this;
			this.dialog = $("<div id='introdialog-dialog'></div>");
			var options = $.extend(this.defaultDialogOptions, this.dialogOptions);
			
			options.close = function() {
				var isChecked = $("#introdialog-checkboxdiv input").prop("checked");
    	  		if (isChecked === true) {
    	  			// Add cookie
    	  			$.cookie('smap_introdialog_dontshowagain', "1", {expires: 365});
    	  		}
    	  		// destroy dialog and free memory
				$(this).empty().remove();
				delete self.dialog;
				self.dialog = null;
			};
			options.buttons = [
		          {
		        	  text: "Stäng",
		        	  click: function() {
		        	  		$(this).dialog("close");
		          	}
		          }
	          
	          ];
			
			var css = {
				"background": this.dialogBGColor
			};
			this.dialog.dialog(options);
			sMap.util.addDialogMinimizeButton(this.dialog);
			this.dialog.css(css);
			this.dialog.parent().find(".ui-dialog-buttonpane").css(css);
			this.dialog.parent().css(css);
			this.dialog.append(this.contentHtml);
			
		}
	},
	
	_addCheckbox: function() {
		var checkboxDiv = $('<div id="introdialog-checkboxdiv"><input type="checkbox"></input><label>Visa inte information nästa gång</label></div>');
		this.dialog.parent().find(".ui-dialog-buttonset").prepend(checkboxDiv);
		if (!this.isIe7) { 
			checkboxDiv.find("label").click(function() {
				var cb = $(this).prev();
				cb.prop("checked", !cb.prop("checked"));
			});
		}
	},
	
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.IntroDialog"
	
});