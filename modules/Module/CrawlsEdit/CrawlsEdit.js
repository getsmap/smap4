/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.CrawlsEdit = OpenLayers.Class(sMap.Module.WFSEditing, {
	
	/**
	 * @param loginApproved {Boolean}
	 * When a user submits a valid login this property will be set
	 * to true and the user can interact with the editing tools.
	 */
	loginApproved: true,
	/**
	 * The feature lastly added to the edit layer.
	 */
	lastAddedFeature: null,
	
	/**
	 * The dialog holding the editing buttons.
	 */
	editDialog: null,
	
	/**
	 * "loginapproved": When login (username + password) was approved,
	 * this event is triggered.
	 */
	EVENT_LISTENERS : ["loginapproved"],
	
	/**
	 * "initlogin": Create the login dialog for the user to login.
	 * The user cannot interact with the editing tools unless a 
	 * login has been confirmed valid by the server-script.
	 */
	EVENT_TRIGGERS : ["initlogin"],
	
	toolbarIndex : null,
	
	initialize : function(options) {
		options = options || {};
		
		/**
		 * These arrays need to me merged with the parent class's because
		 * the are overridden in this class.
		 */
		this.EVENT_LISTENERS =
			sMap.Module.CrawlsEdit.prototype.EVENT_LISTENERS.concat(
				sMap.Module.WFSEditing.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.CrawlsEdit.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.WFSEditing.prototype.EVENT_TRIGGERS
        );
		
		/**
		 * Inherit the config from the parent class and override
		 * with settings in this subclass.
		 */
		var newConfig = {};
		OpenLayers.Util.extend(newConfig, sMap.moduleConfig.WFSEditing); // Don't override settings in case its used by other modules
		OpenLayers.Util.extend(newConfig, sMap.moduleConfig.CrawlsEdit); // Override the copy of the parent class's settings.
		OpenLayers.Util.extend(this, newConfig); // Store in this module.
		
		
		//this.styleMap = this.styleMap || sMap.moduleConfig.WFSEditing.styleMap;
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.WFSEditing.prototype.initialize.apply(this, [options]);
		
		
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		if (this.loginApproved !== true) {
			return false;
		}
		
		// Call the activate function of the parent class
		var ok = sMap.Module.WFSEditing.prototype.activate.apply(
	            this, arguments);
		if (ok) {
			this.bindEventListeners();
			this.createEditDialog();
		}
		
		return true;
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		// Destroy the dialog.
		if (this.editDialog && this.editDialog.dialog) {
			this.editDialog.dialog("destroy");
			this.editDialog.empty().remove();
			this.editDialog = null;
		}
		
		this.unbindEventListeners();
		this.iconEraser(false); // Remove the delete icon if it exists.
		
		this.editLayer.destroyFeatures();
		
		// Call the deactivate function of the parent class
		return sMap.Module.WFSEditing.prototype.deactivate.apply(
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
		
		this.editDialog.dialog("destroy");
		
		this.editLayer.destroyFeatures();
		
		return sMap.Module.WFSEditing.prototype.destroy.apply(this, arguments);
	},
	
	/**
	 * 
	 * Bind necessary listeners.
	 * @returns {void}
	 */
	bindEventListeners: function() {
		// Bind the adding of a feature to triggering of add description dialog.
		this.editLayer.events.register("sketchcomplete", this, this.openTextDialog);
	},
	/**
	 * Unbind listeners
	 * @returns {void}
	 */
	unbindEventListeners: function() {
		// Bind the adding of a feature to triggering of add description dialog.
		this.editLayer.events.unregister("sketchcomplete", this, this.openTextDialog);
		
		this.editLayer.destroyFeatures();
	},
	
	/**
	 * When log in has been approved, allow user to start
	 * editing and commit to the database.
	 * @param e {Object}
	 * @returns {void}
	 */
	loginapproved: function(e) {
		this.loginApproved = true; // Keeps track of when login has been approved.
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		/**
		 * Create toolbar button which calls methods activate and
		 * deactivate in this module for toggling editing on and off.
		 */
		sMap.events.triggerEvent("addtoolbutton", this, {
			index : this.toolbarIndex,
			label : this.lang.labelText,
			iconCSS : "crawlsedit-btnedit",
			tagID : "button-crawls-io"
		});
		sMap.events.triggerEvent("initlogin", this, {

		});
		
		this.createDescriptionDialog();
		this.createDescriptionDialogPT();
	},
	
	onMouseMove: function(e) {
		$("#crawls-iconeraser").css({
			"left": e.pageX+14+"px",
			"top": e.pageY-32+"px"
		});
	},
	
	/**
	 * Show or hide an icon following the cursor when
	 * the delete tool is active.
	 * @param show {Boolean}
	 * @returns {void}
	 */
	iconEraser: function(show) {
		var img = $("#crawls-iconeraser");
		this.mousemoveParent = $("#mapDiv");
		if (show===true) {
			var img = $("<img id='crawls-iconeraser' />");
			img.attr("src", this.iconEraserPath);
			this.mousemoveParent.append(img);
			this.mousemoveParent.mousemove(this.onMouseMove);
		}
		else {
			this.mousemoveParent.unbind("mousemove");
			img.empty().remove();
		}
	},
	
	drawEditLabels: function() {
		var parent = $("<div class='crawls-lbl-draw' />");
		var line = $("<label>"+this.lang.labelDrawLine+"</label>"),
			point = $("<label>"+this.lang.labelDrawPoint+"</label>");		
		parent.append(line).append(point);
		this.editDialog.append(parent);
	},
	
	/**
	 * When a control in the panel activates, deactivate delete
	 * controls and button.
	 * @returns {void}
	 */
	onControlActivate: function(e) {
		var btnDelete = $("#crawls-btndelete");
		var isActive = this.selectControl.active;
		if (isActive===true) {
			btnDelete.attr("checked", false);
			btnDelete.next().removeClass("ui-state-active");
			this.selectControl.deactivate();
			this.iconEraser(false);
		}
	},
	
	/**
	 * Create the dialog containing the edit buttons together
	 * with a submit button and a delete button.
	 * @returns {void}
	 */
	createEditDialog: function() {
		var self = this;
		
		if (!this.editDialog || !this.editDialog.dialog)  {
			var editDialog = $("<div id='crawls-editbtn' />");
			this.editDialog = editDialog;
			$("body").append(editDialog);
			
			this.drawEditToolbar(this.buttons);
			this.drawEditLabels();
			
			var panel = this.map.getControlsBy("displayClass", "wfsediting-panel")[0];
			this.editDialog.append(panel.div);
			this.panel = panel; // make it accessible from other methods
			
			// Make the delete control deactivate when other tools are activated.
			var ctrls = panel.controls;
			for (var i=0,len=ctrls.length; i<len; i++) {
				var ctrl = ctrls[i];
				ctrl.events.register("activate", this, this.onControlActivate);
			}
			// Create a delete control
			var delControl = new OpenLayers.Control.DeleteFeature(this.editLayer, {
				title: "Delete Feature",
				type : OpenLayers.Control.TYPE_TOGGLE
			});
			this.map.addControl(delControl);
			
			// This control highlights the feature being hovered so that
			// user knows which feature is about to be deleted (on click).
			var selectControl = new OpenLayers.Control.SelectFeature(this.editLayer);
			this.map.addControl(selectControl);
			
			// Make these accessible from other methods
			this.delControl = delControl;
			this.selectControl = selectControl;
			
			selectControl.onSelect = function(feature) {
				// TODO: Create a confirm dialog. If user presses "Confirm"
				// the feature will be deleted
				alert("Are you sure you want to delete this feature?");
				delControl.clickFeature(feature); // Delete a feature when it's selected.
			};
			
			
			var btnPanel = $("<div id='crawls-edit-btnpanel' />");
			var btnDelete = $('<input type="checkbox" id="crawls-btndelete" />'),
				lblDelete = $('<label for="crawls-btndelete"><b>'+this.lang.btnDelete+'</b></label>'); //$("<button id='crawls-btndelete'>"+this.lang.btnDelete+"</button>"),
				btnSubmit = $("<button id='crawls-btnsubmit'><b>"+this.lang.btnSubmit+"</b></button>");
				
			btnPanel.append(btnDelete).append(lblDelete).append(btnSubmit);
			editDialog.append(btnPanel);
			
			btnPanel.buttonset();
			btnPanel.addClass("ui-widget-header");
			
			var width = btnPanel.outerWidth() < 200 ? 200 : btnPanel.outerWidth();
			btnPanel.outerWidth(width);
			sMap.util.createDialog(editDialog, {
				modal : false,
				draggable : true,
				resizable: false,
				width : width,
				height: 200,
				//position : "center",
				titleText : this.lang.editDialogTitle,
				closeOnEscape: false,
				onOpen: function(e) {
					// Remove the close button
					$(e.target).parent().find(".ui-dialog-titlebar-close").hide();
				}
			});
			
			selectControl.events.register("activate", this, function(e) {
				// Deactivate all controls in the panel when the delete control
				// is activated.
				this.deactivateAllControls();
			});
			
			btnDelete.click(function(e) {
				
				var input = $(this);
				var btnIsActive = input.attr("checked");
				// If the button became activated – activate the delete control.
				if (btnIsActive===true) {
					self.iconEraser(true); // show a delete icon following the cursor
					selectControl.activate();
				}
				else {
					self.iconEraser(false);
					selectControl.deactivate();
				}
			});
			
			btnSubmit.click(function() {
				self.saveEdits();
			});
			
		}
		this.editDialog.dialog("open");
		//this.panel.controls[0].activate();
	},

	countBlink: function(){
		//Call blink just 5 times no recursion problem
		for(var i=0; i<=5; i++){
			this.blink();
	    }
	},
		
	blink: function(){
	
		$("#crawls-btnsubmit")
		.animate({color: '#0000FF', backgroundColor: '#00FFFF'}, 100)
		.animate({color: '#00FF00', backgroundColor: '#FF00FF'}, 100)
		.animate({color: '#FF0000', backgroundColor: '#FFFF00'}, 100)
		.animate({color: '#FFFF00', backgroundColor: '#FF0000'}, 100)
		.animate({color: '#FF00FF', backgroundColor: '#00FF00'}, 100)
		.animate({color: '#00FFFF', backgroundColor: '#0000FF'}, 100);
		
		
				//alert("This is blinking");

	},	
	
	createDescriptionDialog: function() {
				
		var dialogDiv = $("<div />");
		this.descriptionDialog = dialogDiv;
		
		$("body").append(dialogDiv); //same if fetched body.append(dialogDiv);

		var fieldset = $("<fieldset />");
		dialogDiv.append(fieldset);
		
		var descriptionlabel = $('<label for="description">Please Describe the Feature Below :  <font style="color:red; font-weight:bold">* </font></label>');
		fieldset.append(descriptionlabel);
		
		var description = $('<textarea rows="3" cols="40" id="crawls-description" class="text ui-widget-content ui-corner-all" /><br>');
		fieldset.append(description);
		
		var descriptionexample = $('<label for="descriptionexample"><i>(e.g. Route frequently used by my child.)<i></label><br>');
		fieldset.append(descriptionexample);
		var descriptionexample2 = $('<label for="descriptionexample2"><i>(e.g. Tunnel too dark or No traffic light on intersection.)<i></label><p></p>');
		fieldset.append(descriptionexample2);
		
		var agelabel = $('<label for="age">Age of your child :  <font style="color:red; font-weight:bold">* </font></label>');
		fieldset.append(agelabel);
		
		var age = $('<input type="text" id="crawls-age" class="text ui-widget-content ui-corner-all" size="10" /><p></p>');
		fieldset.append(age);
		
		var pointdestinationlabel = $('<label for="pointdestination">POD :  (optional) </label>');
		fieldset.append(pointdestinationlabel);
		
		var pointdestination = $('<select id="crawls-pointdestination" class="text ui-widget-content ui-corner-all"><option>Day Care</option><option>School</option><option>Kiden garden</option><option>Recreation Club</option><option>Other</option></select><p></p>');
		fieldset.append(pointdestination);
		
		var buttonSave = $('<button id="crawls-descr-save">'+this.lang.btnSaveDesc+'</button>'),
			buttonCancel = $('<button id="crawls-descr-cancel">'+this.lang.btnCancelDesc+'</button>');
		fieldset.append(buttonCancel).append(buttonSave);
		fieldset.find("button").button();
		var ifcancellabel = $('<p><label for="buttoncancel"><i>(CANCEL will delete feature and description!)</i></label></p>');
		fieldset.append(ifcancellabel);
		
		var mustfill = $('<p><label for="mustfill"><font style="color:red; font-weight:bold"><i>(All field with * must be filled!)</i></font></label></p>');
		fieldset.append(mustfill);
		
		var self = this;
		buttonSave.click(function() {
		var feature = self.lastAddedFeature;

			var inputdesc = $("#crawls-description");
			var the_desc = inputdesc.val();
			feature.attributes.desc = the_desc;
			
			var inputage = $("#crawls-age");
			var the_age = inputage.val();
			feature.attributes.age = the_age;
			
			var inputpod = $("#crawls-pointdestination");
			var the_pod = inputpod.val();
			feature.attributes.pod = the_pod;
		
			self.descriptionDialog.dialog("close");
			//self.panel.controls[1].activate();

		});

		buttonCancel.click(function() {	
			self.lastAddedFeature.destroy();
			self.descriptionDialog.dialog("close");
		});
		
		sMap.util.createDialog(dialogDiv, {
			modal : true,
			draggable : false,
			width : 350,
			height: 400,
			position : [400,40],
			titleText : this.lang.attributeDialogTitle,
			onOpen: function(e) {
				// Remove the close button
				$(e.target).parent().find(".ui-dialog-titlebar-close").hide();
			}

		});
	},

	createDescriptionDialogPT: function() {
		
		var dialogDiv = $("<div />");
		this.descriptionDialogPT = dialogDiv;
		
		$("body").append(dialogDiv); //same if fetched body.append(dialogDiv);

		var fieldset = $("<fieldset />");
		dialogDiv.append(fieldset);
		
		var descriptionlabel = $('<label for="description">Please Describe the Feature Below :  <font style="color:red; font-weight:bold">* </font></label>');
		fieldset.append(descriptionlabel);
		
		var description = $('<textarea rows="3" cols="40" id="crawls-ptdescription" class="text ui-widget-content ui-corner-all" /><br>');
		fieldset.append(description);
		
		var descriptionexample = $('<label for="descriptionexample"><i>(e.g. Tunnel too dark or No traffic light on intersection.)<i></label><p></p>');
		fieldset.append(descriptionexample);
		
		var buttonSave = $('<button id="crawls-descr-save">'+this.lang.btnSaveDesc+'</button>'),
			buttonCancel = $('<button id="crawls-descr-cancel">'+this.lang.btnCancelDesc+'</button>');
		fieldset.append(buttonCancel).append(buttonSave);
		fieldset.find("button").button();
		var ifcancellabel = $('<p><label for="buttoncancel"><i>(CANCEL will delete feature and description!)</i></label></p>');
		fieldset.append(ifcancellabel);
		
		var mustfill = $('<p><label for="mustfill"><font style="color:red; font-weight:bold"><i>(All field with * must be filled!)</i></font></label></p>');
		fieldset.append(mustfill);
				
		var self = this;
		buttonSave.click(function() {
			var feature = self.lastAddedFeature;
			var input = $("#crawls-ptdescription");
			var the_desc = input.val();
			feature.attributes.desc = the_desc;
			self.descriptionDialogPT.dialog("close");
			self.countBlink();
		});
		buttonCancel.click(function() {
			self.lastAddedFeature.destroy();
			self.descriptionDialogPT.dialog("close");
		});
		 
		
		sMap.util.createDialog(dialogDiv, {
			modal : true,
			draggable : false,
			width : 350,
			height: 400,
			position : [400,40],
			titleText : this.lang.attributeDialogTitle,
			onOpen: function(e) {
				// Remove the close button
				$(e.target).parent().find(".ui-dialog-titlebar-close").hide();
			}

		});
	},	
	
	onSaveSuccess : function(e) {
		
	},
	
	onSaveFailure : function(e) {
		alert("It was a big failure.");
	},
	
	/**
	 * Create a dialog alowing the user add a description for the newly
	 * added feature. This function is listening to the event "addfeature".
	 * @param e {Object}
	 */
	openTextDialog : function(e) {
		var feature = e.feature;
		
		
		var geomType = sMap.util.getGeomType(feature.geometry).toUpperCase();
		
		
		
		this.lastAddedFeature = feature;
			
		if (geomType == "POINT") {			
			// POINT
			this.descriptionDialogPT.find("#crawls-ptdescription").val(null); // Erase previously added text
			this.descriptionDialog.dialog("close");
			this.descriptionDialogPT.dialog("open");			
		}
		else {
			// LINE
			
			// Deactivate draw line tool when a line is completed
			this.panel.controls[0].deactivate();
			
			this.descriptionDialog.find("#crawls-description").val(null); // Erase previously added text
			this.descriptionDialogPT.dialog("close");
			this.descriptionDialog.dialog("open");
		}
	},
	
	onSubmit: function() {
	    doStuffAsynchronously(function () {
	        if (everythingIsOK) {
	            // proceed with submission
	            document.getElementById('formId').submit();
	        }
	    });

	    return false;
	},
	
	saveEdits : function() {
		
		var features = this.editLayer.features; // array
		for (var i=0,len=features.length; i<len; i++) {
			var f = features[i];
			var geomType = sMap.util.getGeomType(f.geometry);
			var featureType = this.featureTypes[geomType];
			this.editLayer.protocol.setFeatureType(featureType);
			
			// It might not be enough to setFeatureType using the method above.
			// Also need to change the schema.
			var schema = this.editLayer.protocol.schema;
			var arr = schema.split(":");
			arr[arr.length-1] = featureType;
			this.editLayer.protocol.schema = arr.join(":");
			
			// Finally, save.
			this.saveStrategy.save([f]);
		}
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.CrawlsEdit"
	
});