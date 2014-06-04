/**
s * @author Cleber Arruda
 * @copyright sMap
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 *   TODO
 *   Line below in the index is required for EDITTOOLS BUTTONS to work with IE9 or prev version
 *   It allows the switch between browsers compatibility 
 *   
 *   <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=6; IE=5" >
 *   <add name="X-UA-Compatible" value="IE=EmulateIE9" />
 */

sMap.Module.EPOI = OpenLayers.Class(sMap.Module.WFSEditing, {
	
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
	 * This array keeps track of the id's on the FORM
	 */
	arrFieldID: [],
	
	/**
	 * This is used for register and unregister the successful transaction
	 * of the saveStrategy.
	 */
	success: 0,
	
	/**
	 * 
	 */
	controltype: "",
	
	delbtnIsActive: false,
	delbtnActive: false,
	geombtnActive: false,
	attrbtnActive: false,
	
	buttons : {},
	
	selectedTableOpt: null,

	/**
	 * "loginapproved": When login (username + password) was approved,
	 * this event is triggered.
	 */
	EVENT_LISTENERS : [],
	
	/**
	 * "initlogin": Create the login dialog for the user to login.
	 * The user cannot interact with the editing tools unless a 
	 * login has been confirmed valid by the server-script.
	 */
	EVENT_TRIGGERS : ["initlogin", "selected"],
	
	toolbarIndex : null,
	
	initialize : function(options) {
		options = options || {};
		
		/**
		 * These arrays need to me merged with the parent class's because
		 * the are overridden in this class.
		 */
		this.EVENT_LISTENERS =
			sMap.Module.EPOI.prototype.EVENT_LISTENERS.concat(
				sMap.Module.WFSEditing.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.EPOI.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.WFSEditing.prototype.EVENT_TRIGGERS
        );
		
		/**
		 * Inherit the config from the parent class and override
		 * with settings in this subclass.
		 */
		var newConfig = {};
		OpenLayers.Util.extend(newConfig, sMap.moduleConfig.WFSEditing); // Don't override settings in case its used by other modules
		OpenLayers.Util.extend(newConfig, sMap.moduleConfig.EPOI); // Override the copy of the parent class's settings.
		OpenLayers.Util.extend(this, newConfig); // Store in this module.
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.WFSEditing.prototype.initialize.apply(this, [options]);
	},
	
	/**
	 * Method: activate
	 * @returns {Boolean}
	 */
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
			this.selectedTable();
		}
		return true;
	},

	/**
	 * Method: deactivate
	 * @returns {}
	 */
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		// Destroy the dialog.
		if (this.editDialog && this.editDialog.dialog) {
			this.editDialog.dialog("destroy");
			this.editDialog.empty().remove();
			this.editDialog = null;
			if(this.editLayer){
//				if(this.editLayer.features){
//					this.editLayer.destroyFeatures();
//					this.editLayer.draw = false;
//					this.featureTypes = null;
//				}
				this.editLayer.destroy();
			}
		}
		if (this.confirmationDiv && this.confirmationDiv.dialog) {
			this.confirmationDiv.dialog("destroy");
			this.confirmationDiv.empty().remove();
			this.confirmationDiv = null;
		}
		
		this.unbindEventListeners();
		this.iconEraser(false); // Remove the delete icon if it exists.
		// Call the deactivate function of the parent class
		return sMap.Module.WFSEditing.prototype.deactivate.apply(
	            this, arguments
	        );
	},
	
	/**
	 * Method: destroy
	 * @returns {}
	 */
	destroy : function() {
		// Handler are automatically deactivated and destroyed
		// by the parent class module's destroy method. However,
		// this is only the case if the handlers are stored like
		// below (the example shows how to deactivate them manually):
		// -> this.handlers["click"].deactivate();   // For many handlers...
		// -> this.handler.deactivate();    // For single handler
		// Therefore you should always store handler(s) like in this example.
		if(!this.confirmationDiv){
			return false;
		}
		else{
			this.confirmationDiv.dialog("destroy");
		}
		if(!this.editDialog){
			return false;
		}
		else{
			this.editDialog.dialog("destroy");
		}
		if(!this.editLayer){
			return false;
		}
		else{
			this.editLayer.destroy();
		}
		
		return sMap.Module.WFSEditing.prototype.destroy.apply(this, arguments);
	},
	
	/**
	 * Method: bindEventListeners
	 * Bind necessary listeners.
	 * @returns {void}
	 */
	bindEventListeners: function() {
		if(this.editLayer !== null){
			// Bind the adding of a feature to triggering of add description dialog.
			this.editLayer.events.register("sketchcomplete", this, this.openTextDialog);
		}

	},

	/**
	 * Method: unbindEventListeners
	 * Unbind listeners
	 * @returns {void}
	 */
	unbindEventListeners: function() {
		if(this.editLayer){
			if(!this.editLayer.events){
				return false;
			}
			else{
				// Bind the adding of a feature to triggering of add description dialog.
				this.editLayer.events.unregister("sketchcomplete", this, this.openTextDialog);
			}
		}
	},

	/**
	 * Method: loginapproved
	 * When log in has been approved, allow user to start
	 * editing and commit to the database.
	 * @param e {Object}
	 * @returns {void}
	 */
	loginapproved: function(e) {
		this.loginApproved = true; // Keeps track of when login has been approved.

	},
	
    /**
     * Method: drawContent
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
			iconCSS : "poiedit-btnedit",
			tagID : "button-poi-io"
		});
		sMap.events.triggerEvent("initlogin", this, {

		});
	},
	
	/**
	 * Method: onMouseMove
	 * @param e
	 * @returns{void}
	 */
	onMouseMove: function(e) {
		$("#poi-iconeraser").css({
			"left": e.pageX+14+"px",
			"top": e.pageY-32+"px"
		});
	},
	
	/**
	 * Method: iconEraser
	 * Show or hide an icon following the cursor when
	 * the delete tool is active.
	 * @param show {Boolean}
	 * @returns {void}
	 */
	iconEraser: function(show) {
		var img = $("#poi-iconeraser");
		this.mousemoveParent = $("#mapDiv");
		if (show===true) {
			var img = $("<img id='poi-iconeraser' />");
			img.attr("src", this.iconEraserPath);
			this.mousemoveParent.append(img);
			this.mousemoveParent.mousemove(this.onMouseMove);
		}
		else {
			this.mousemoveParent.unbind("mousemove");
			img.empty().remove();
		}
	},
	/**
	 * Method: drawControls
	 * @param (void)
	 * @return (void
	 * This constructs the Controls for the Editing Tools.
	 */
	drawControls : function(){
		
		var drawPoints = new OpenLayers.Control.DrawFeature(
			this.editLayer, OpenLayers.Handler.Point, {
				title: this.lang.hoverTextPoint,
				type : OpenLayers.Control.TYPE_TOGGLE,
//			    displayClass: "olControlDrawFeaturePoint",
				multi: false		  
			});
		this.drawPoints = drawPoints;
		this.map.addControl(this.drawPoints);
		
		var drawPolygons = new OpenLayers.Control.DrawFeature(
				this.editLayer, OpenLayers.Handler.Polygon, {
					title: this.lang.hoverTextPolygon,
					type : OpenLayers.Control.TYPE_TOGGLE,
//					displayClass: "olControlDrawFeaturePolygon",
					multi: true 
			});
			this.drawPolygons = drawPolygons;
			this.map.addControl(this.drawPolygons);
			
			var drawLines = new OpenLayers.Control.DrawFeature(
					this.editLayer, OpenLayers.Handler.Path, {
						title: this.lang.hoverTextLine,
						type : OpenLayers.Control.TYPE_TOGGLE,
//						displayClass: "olControlDrawFeaturePath",
						multi: true
			});
			this.drawLines = drawLines;
			this.map.addControl(this.drawLines);
	},
	
	/**
	 * Method: destroyDrawControl
	 * @param {void}
	 * @return {void}
	 * This destroy all the Control for the edit tool.
	 */
	destroyDrawControl: function(){
		if(this.drawLines){
			this.drawLines.destroy();
		}
		if(this.drawPoints){
			this.drawPoints.destroy();
		}
		if(this.drawPolygons){
			this.drawPolygons.destroy();
		}
	},
	
	/**
	 * Method: createSelectControl
	 * @param void
	 * @return void
	 * This construct a control to select the features in order to be edited.
	 */
	createSelectControl: function(){
		var select = new OpenLayers.Control.SelectFeature(this.editLayer, {
						
		});
		this.select = select;
		this.map.addControl(this.select);
		this.select.activate();
		this.editLayer.events.register("featureselected", this, function(){
			
			this.confirmationDialog();
			
		});
	},
	
	/**
	 * Method: deactivateSelectControl
	 * @param {void}
	 * @return void
	 * This deactivate and destroy the select control
	 */
	deactivateSelectControl: function(){
		var self = this;
		if(self.select){
//			self.select.deactivate();
			self.select.destroy();
		}
	},
	
	/**
	 * Method: createModifyFeatureControl
	 * @param void
	 * @return void
	 * This contructs a modify control in order to modify a feature.
	 */
	createModifyFeatureControl: function() {
		var dragFeature = new OpenLayers.Control.ModifyFeature(this.editLayer, {
			clickout: true,
			mode: OpenLayers.Control.ModifyFeature.DRAG,
			selectControl: this.select
		});
		this.dragFeature = dragFeature;
	    this.map.addControl(this.dragFeature);
	    this.dragFeature.activate();
	    
	    this.editLayer.events.register("featureselected", this, function(){
	    	this.confirmationDialog();
	    	var geometry = sMap.util.getGeomType( this.editLayer.selectedFeatures[0].geometry );
	    	if(geometry == "line" || geometry == "polygon"){
	    		dragFeature.mode = OpenLayers.Control.ModifyFeature.RESHAPE;
	    	}
	    	
	    });
	    this.editLayer.events.register("afterfeaturemodified", this, this.onFeatureModified);
	},
	
	/**
	 * Method: deactivateModifyControl
	 * @param {void}
	 * 
	 * This deactivate and destroy the dragFeature control
	 */
	deactivateModifyControl: function(){
		var self = this;
		if(self.dragFeature){
			self.dragFeature.selectControl.deactivate();
			if(self.dragFeature.active === true){
//				self.dragFeature.deactivate();
				self.dragFeature.destroy();
				self.dragFeature.dragControl.destroy();
			}
		}
	},
	
	onFeatureModified: function(){
		this.saveEdits();
    	this.deactivateAllBtn();
//    	this.dragFeature.deactivate();
    	this.deactivateModifyControl();
//    	this.dragFeature.destroy();
    	this.geombtnIsActive = false;
    	this.editLayer.events.unregister("afterfeaturemodified", this, this.onFeatureModified);
    },
	
	/**
	 * Method: createDeleteControl
	 * @param void
	 * @return void
	 * This constructs a control to delete the features.
	 */
	createDeleteControl: function(){
		var deleteFeature = new OpenLayers.Control.DeleteFeature(this.editLayer, {
			title: "Delete Feature",
			type : OpenLayers.Control.TYPE_TOGGLE
		});		this.deleteFeature = deleteFeature;
		this.map.addControl(this.deleteFeature);
	},
	
	/**
	 * Method: deactivateDeleteControl
	 * @param {void}
	 * 
	 * This deactivate and destroy the deleteFeature control
	 */
	deactivateDeleteControl: function(){
		var self = this;
		self.deleteFeature.deactivate();
		self.deleteFeature.destroy();
	},
	
	/**
	 * Method: deactivateAllDrawCtrl
	 * @param void
	 * @return void
	 * This deactivate all the draw controls if active.
	 */
	deactivateAllDrawCtrl : function(){
		var self = this;
		if(self.drawLines.active === true){
			self.drawLines.deactivate();
		}
		if(self.drawPoints.active === true){
			self.drawPoints.deactivate();
		}
		if(self.drawPolygons.active === true){
			self.drawPolygons.deactivate();
		}
	},
	
	/**
	 * Method: createEditDialog
	 * Create the dialog containing the Editing buttons together
	 * with a edit geometry, edit attributes and delete buttons.
	 * @param (void)
	 * @returns {void}
	 */
	createEditDialog: function() {
		var self = this;
		this.optionButtons = ["Skapa", "Spara", "Sicka"];
		var geoTbls = sMap.config.geotables;
		this.geoTbls = geoTbls[0];
		
		var catOpt = [];
		var allDBTables =[];
		$.each(this.geoTbls, function(objname, value){
			var objval = objname+":"+value;
			allDBTables.push(objname);
			catOpt.push(value[0].displayName);
			self.allDBTables = allDBTables;
			self.catOpt = catOpt;
		});
		
		this.catOptCompleted = [];

		for(var i=0, leni=catOpt.length; i<leni; i++){
					var temp = catOpt[i];
					this.catOptCompleted.push(temp);
					temp = "";
				}
				
		if (!this.editDialog || !this.editDialog.dialog)  {
			var editDialog = $("<div class='editpoi-dialogDiv' />");
			this.editDialog = editDialog;
			$("body").append(editDialog);
			
			var poiForm = $("<form id='poi-form' />");
			editDialog.append(poiForm);
			
			var poiFieldSet = $("<fieldset />");
			poiForm.append(poiFieldSet);
			
			this.tblsComplete = [];

			for(var i=0, len=this.catOptCompleted.length; i<len; i++){
				this.tblsComplete.push(this.optionOpen + this.catOptCompleted[i] + this.optionClose);
			}
			
			var labelcategory = $("<p /><label for='poi-style'>"+this.lang.labelCategory+"</label>");
			poiFieldSet.append(labelcategory);

			var dbtables = $("<select id='poi-category' class='text ui-widget-content ui-corner-all'>"+this.tblsComplete+"</select>");
			poiFieldSet.append(dbtables);
			
			var btnPanel = $("<div class='poi-edit-btnpanel' id='radio'/>"),
				editattrbtn = $("<input type='checkbox' name='radio' id='epoi-editAttr' />"),
				lbleditattr = $("<label for='epoi-editAttr'><b>"+this.lang.btnEditAttr+"</b></label>"),
				editgeombtn = $("<input type='checkbox' name='radio' id='epoi-editGeom' />"),
				lbleditgeom = $("<label for='epoi-editGeom'><b>"+this.lang.btnEditGeom+"</b></label>"),
				btnDelete = $("<input type='checkbox' name='radio' id='poi-btndelete' />"),
				lblDelete = $("<label for='poi-btndelete'><b>"+this.lang.btnDelete+"</b></label>");
			
			this.btnPanel = btnPanel;
			
			this.btnPanel.append(editattrbtn);
			this.btnPanel.append(lbleditattr);
			this.btnPanel.append(editgeombtn);
			this.btnPanel.append(lbleditgeom);
			this.btnPanel.append(btnDelete);
			this.btnPanel.append(lblDelete);
				
			editDialog.append(btnPanel);
			
			this.btnPanel.buttonset();
			this.btnPanel.addClass("ui-widget-header");
			
			var width = editDialog.outerWidth() < 300 ? 300 : editDialog.outerWidth();
			editDialog.outerWidth(width);
			
			sMap.util.createDialog(editDialog, {
				modal : false,
				draggable : true,
				resizable: false,
				width : width,
				height: 280,
				//position : "center",
				titleText : this.lang.editDialogTitle,
				closeOnEscape: false,
				onOpen: function(events) {
					// Remove the close button
					$(events.target).parent().find(".ui-dialog-titlebar-close").hide();
				}
			});
			
			editattrbtn.click(function(events){
				var success = self.saveStrategy.events.listeners.success.length;
				var check = self.checkIfTableSelected();
				var attrinput = $(this);
				var attrbtnIsActive = attrinput.attr("checked"); // Getting the value of  the attribute "checked" (true/false)
				self.attrbtnIsActive = attrbtnIsActive;
				if(check !== false){
					if(self.attrbtnIsActive === true){
						if(success > 0){
							self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						}
						self.saveStrategy.events.register("success", self, self.onSaveSuccess);
						var btn = $("#epoi-editAttr").attr("id");
						self.deactivatePrevBtn(btn);
						self.createEditButton();
						self.controltype = "editattribute";
						self.destroyDialogDiv();
						self.onControlActivate(events);
						self.deactivateAllDrawCtrl();
						self.createSelectControl();
					}
					else{
						self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						self.deactivateSelectControl();
//						self.onControlActivate(events);
					}
				}
				else{
					self.deactivateAllBtn();
					self.attrbtnIsActive = false;
				}
				// Deactivate completly the Delete Button Control.
				if(self.delbtnIsActive === true){
//					self.e = e;
//					self.onControlActivate(events);
					self.iconEraser(false);
					self.delbtnIsActive = false;
				}
				if(self.geombtnIsActive === true){
					self.geombtnIsActive = false;
				}

			});


			editgeombtn.click(function(events){
				var success = self.saveStrategy.events.listeners.success.length;
				var check = self.checkIfTableSelected();
				if(check !== false){
					if(self.geombtnIsActive !== true){
						var geominput = $(this);
						var geombtnIsActive = geominput.attr("checked"); // Getting the value of  the attribute "checked" (true/false)
						self.geombtnIsActive = geombtnIsActive;
						if(self.geombtnIsActive === true){
							if(success > 0){
								self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
							}
							self.saveStrategy.events.register("success", self, self.onSaveSuccess);
							var btn = $("#epoi-editGeom").attr("id");
							self.deactivatePrevBtn(btn);
							self.deactivateAllDrawCtrl();
							self.createEditButton();
							self.controltype = "editgeometry";
							self.destroyDialogDiv();
							self.onControlActivate(events);
//							self.createSelectControl();
							self.createModifyFeatureControl();
						}
						
						// Deactivate completly the Delete Button Control.
						if(self.delbtnIsActive === true){
//							self.onControlActivate(events);
							self.iconEraser(false);
//							self.dragFeature.deactivate();
							self.delbtnIsActive = false;
						}
					}
					else {
						self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						self.destroyDialogDiv();
						self.deactivateAllBtn();
						self.deactivateModifyControl();
						if(self.select){
							self.select.deactivate();
						}
						self.geombtnIsActive = false;
						
						}
				}
				else {
					self.destroyDialogDiv();
					if(self.select){
						self.select.deactivate();
					}
					self.deactivateAllBtn();
				}
			});
			
			btnDelete.click(function(events) {
			var success = self.saveStrategy.events.listeners.success.length;
			var check = self.checkIfTableSelected();
			if(check !== false){
					var input = $(this);
					var delbtnIsActive = input.attr("checked"); // Getting the value of  the attribute "checked" (true/false)
					self.delbtnIsActive = delbtnIsActive;
					// If the button became activated – activate the delete control.
					if (self.delbtnIsActive===true) {
						if(success > 0){
							self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						}
						self.saveStrategy.events.register("success", self, self.onSaveSuccess);
						var btn = $("#poi-btndelete").attr("id");
						self.deactivatePrevBtn(btn);
						self.deactivateAllDrawCtrl();
						self.createEditButton();
						self.controltype = "deleteobject";
//						self.destroyDialogDiv();
						self.onControlActivate(events);
						self.iconEraser(true); // show a delete icon following the cursor
//						self.createDeleteControl();
//						self.deleteFeature.activate();
						self.createSelectControl();
					}
					else {
						self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						self.destroyDialogDiv();
						self.iconEraser(false);
						self.select.deactivate();
						self.onControlActivate(events);
					}
					if(self.geombtnIsActive === true){
						self.geombtnIsActive = false;
					}
			}
			else {
				self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
				self.destroyDialogDiv();
				if(self.select){
					self.select.deactivate();
				}
				self.deactivateAllBtn();
				self.delbtnIsActive = false;
			}
		});
			
			
			
//			btnDelete.click(function(events) {
//				var success = self.saveStrategy.events.listeners.success.length;
//				var check = self.checkIfTableSelected();
//				if(check !== false){
//						var input = $(this);
//						var delbtnIsActive = input.attr("checked"); // Getting the value of  the attribute "checked" (true/false)
//						self.delbtnIsActive = delbtnIsActive;
//						// If the button became activated – activate the delete control.
//						if (self.delbtnIsActive===true) {
//							if(success > 0){
//								self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
//							}
//							self.saveStrategy.events.register("success", self, self.onSaveSuccess);
//							var btn = $("#poi-btndelete").attr("id");
//							self.deactivatePrevBtn(btn);
//							self.deactivateAllDrawCtrl();
//							self.createEditButton();
//							self.controltype = "deleteobject";
//							self.destroyDialogDiv();
//							self.onControlActivate(events);
//							self.iconEraser(true); // show a delete icon following the cursor
//							self.createDeleteControl();
//							self.deleteFeature.activate();
//							self.createSelectControl();
//						}
//						else {
//							self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
//							self.destroyDialogDiv();
//							self.iconEraser(false);
//							self.select.deactivate();
//							self.onControlActivate(events);
//						}
//						if(self.geombtnIsActive === true){
//							self.geombtnIsActive = false;
//						}
//				}
//				else {
//					self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
//					self.destroyDialogDiv();
//					if(self.select){
//						self.select.deactivate();
//					}
//					self.deactivateAllBtn();
//					self.delbtnIsActive = false;
//				}
//			});
		}
		this.editDialog.dialog("open");
	},
	
	/**
	 * Method: deactivatePrevBtn
	 * @param prevBtn
	 * @return void
	 * This deactiave previous activated button when another button is clicked.
	 */
	deactivatePrevBtn : function(prevBtn) {
		$(".poi-edit-btnpanel input[type='checkbox']").each(function(obj, value){
			var tmpvalue = value.id;
			if(tmpvalue !== prevBtn )
				{
					$(".poi-edit-btnpanel input[id='"+value.id+"']").attr('checked', false);
					$(".poi-edit-btnpanel input[id='"+value.id+"']").next().removeClass("ui-state-active");
				}
		});
	},
	/**
	 * Method: checkIfTableSelected
	 * @param void
	 * @returns {Boolean}
	 * This check if the user selecte a TABLE to be edited.
	 */
	checkIfTableSelected : function(){
		var self = this;
		var check = false;
		if(self.selectedTableOpt != "Välj tabell"){
			check = true;
		}
		else{
			alert("Välj tabell innan någon åtgärder!");
			self.onButtonsActivate();
			check = false;
		}
		return check;
	},
	
	/**
	 * Method: onControlActivate
	 * @param events
	 * @return void
	 */
	onControlActivate: function(events) {  // This will deactivate Control being in use
		var self = this;
		if (self.select){  //this.attrbtnIsActive
			if(self.editLayer.selectedFeatures.length > 0){
				var feature = self.editLayer.selectedFeatures[0];
					self.select.unselect(feature);
			}
			self.deactivateSelectControl();
		}
		if (self.dragFeature) { 
			if(self.editLayer.selectedFeatures.length > 0){
				var feature = self.editLayer.selectedFeatures[0];
				
				if(self.dragFeature.handlers){
					self.dragFeature.unselectFeature(feature);
					if(self.editLayer.selectedFeatures.length > 0){
						
					}
				}
			}
			self.deactivateModifyControl();
		}
	},
	
	/**
	 * Method: onButtonsActivate
	 * @param void
	 * @return void
	 * This deactivate the activated buttons from the edit tool Dialog. 
	 */
	onButtonsActivate: function(){ // Deactivate the buttons not in use
		var btnAttr = $("#epoi-editAttr");
		if(this.controltype == "editattribute"){
			if(this.attrbtnIsActive===true){
				this.attrbtnIsActive = false;
				btnAttr.attr("checked", false);
				btnAttr.next().removeClass("ui-state-active");
				if(this.select.handlers){
					this.select.deactivate();
				}
			}
		}
		if(this.controltype == "editgeometry"){
			var btnGeom = $("#epoi-editGeom");
			if(this.geombtnIsActive===true){
				this.geombtnIsActive = false;
				btnGeom.attr("checked", false);
				btnGeom.next().removeClass("ui-state-active");
			}
		}
		if(this.controltype == "deleteobject"){
			var btnDelete = $("#poi-btndelete");
			if(this.delbtnIsActive===true){
				this.delbtnIsActive = false;
				btnDelete.attr("checked", false);
				btnDelete.next().removeClass("ui-state-active");
				if(this.select.handler){
					this.select.deactivate();
				}
//				this.deleteFeature.deactivate();
				this.iconEraser(false);
			}
		}
	},
	
	/**
	 * Method: deactivateAllBtn
	 * @parm void
	 * @return void
	 * This unckeck the checkbox for the buttons. 
	 */
	deactivateAllBtn : function(){
		$(".poi-edit-btnpanel input[type='checkbox']").each(function(obj, value){
			if(value.checked === true)
				{
					$(".poi-edit-btnpanel input[id='"+value.id+"']").attr('checked', false);
					$(".poi-edit-btnpanel input[id='"+value.id+"']").next().removeClass("ui-state-active");
				}
		});
	},
	
	/**
	 * Change the protocol of the edit layer in the
	 * correct way.
	 * @param schema {String} It is the table to be send in the request by WFS-T to Postgis
	 * @return void
	 * 
	 */
	changeTable: function(selectedTableOpt) {
		var valSelected = selectedTableOpt.toUpperCase();
//		var schema = this.editLayer.protocol.schema,
		var tblname = [];
		$.each(this.geoTbls, function(obj, value){
			var objvalue = obj +":"+ value[0];
			var dispName = value[0].displayName.toUpperCase();
			if(dispName == valSelected){
				tblname.push(value[0].name);
			}
		});
		this.featureTypes = tblname[0];
//				var arr = schema.split(":");
//				arr[arr.length-1] = this.featureTypes; //featureType;
//				this.featureType = arr[arr.length-1];
//				schema = arr.join(":");
	},
	
	/**
	 * Method: destroyEditLayer
	 * @param {void}
	 * @return {void}
	 * This destroy the edit layer.
	 */
	destroyEditLayer: function() {
		var self = this;
		if(self.editLayer){
			self.saveStrategy.destroy();
			self.editLayer.destroy();
			self.editLayer = null;
		}
	},
	
	recreateEditLayer: function(){
		this.addEditLayer();
		this.drawControls();
		this.bindEventListeners();
	},
	
	/**
	 * Method: confirmationDialog
	 * @param void
	 * @returns {void}
	 * This allows the user to confirm any transaction they are doing.
	 */
	confirmationDialog: function(){
		var self = this;
		var ct = [ "editgeometry", "deleteobject", "editattribute" ];
		var lng = [""+self.lang.btnEditGeom+"?</p>", ""+self.lang.lblmsgdel+"?</p>", ""+self.lang.btnEditAttr+"?</p>"];
		if (!this.confirmationDiv || !this.confirmationDiv.dialog)  {
			var confirmationDiv = $("<div id='epoi-confirmation' />");
			$("body").append(confirmationDiv);
			for(var i=0, leni=ct.length; i<leni; i++){
				if(self.controltype == ct[i]){
					confirmationDiv.append(lng[i]);
				}
			}
			var btnOK = $("<button id='epoi-btnOK'>"+self.lang.btnConfirmationYes+"</button>"),
				btnNo = $("<button id='epoi-btnNo'>"+self.lang.btnConfirmationNo+"</button>");
			confirmationDiv.append(btnOK).append(btnNo);
			
			btnOK.click(function(e){
				if(self.delbtnIsActive === true){
					
//					self.editLayer.selectedFeatures[0].renderIntent = "select";
//					self.editLayer.selectedFeatures[0].state = "Delete";
					
					
//					self.deleteFeature.clickFeature(self.editLayer.selectedFeatures[0]);
//					if(self.editLayer.selectedFeatures[0].state == "Delete") {
							debug.log("The Feature will be Deleted!");
							self.editLayer.selectedFeatures[0].attributes.removed = "true";
							self.editLayer.selectedFeatures[0].renderIntent = "delete";
							self.editLayer.selectedFeatures[0].state =  OpenLayers.State.UPDATE;
							self.saveEdits();
//					}
				}
				if(self.attrbtnIsActive === true){
					if(self.controltype == "editattribute"){
							alert("The Feature will be UPDATE!");
							self.editLayer.selectedFeatures[0].state =  OpenLayers.State.UPDATE;
					}
				}
				if(self.geombtnIsActive === true){
					if(self.controltype == "editgeometry"){
						confirmationDiv.dialog("close");
					}
				}
				if(self.delbtnIsActive === true){	
					self.onControlActivate(e);
					self.iconEraser(false);
//					self.deleteFeature.deactivate();
//					self.deleteFeature.destroy();
					self.delbtnIsActive = false;

				}
				confirmationDiv.dialog("close");
				self.destroyDialogDiv();
				if(self.select){
					if(self.select.handler){
						self.select.unselectAll();
						self.select.deactivate();
					}
				}
				self.deactivateAllBtn();
				if(self.controltype == "editattribute"){
					self.createPOIDialog();
				}
				self.attrbtnIsActive = false;
			});
			
			btnNo.click(function(e){
					self.onControlActivate(e);
					self.onButtonsActivate();
					confirmationDiv.dialog("close");
			});
			
			sMap.util.createDialog(confirmationDiv, {
				modal : true,
				titleText: this.lang.labelText,
				draggable : true,
				width : 200,
				height : 100, 
				position : "center",
				closeOnEscape : false,
				onOpen: function(e) {
					// Remove the close button
					$(e.target).parent().find(".ui-dialog-titlebar-close").hide();
				}
			});
			this.confirmationDiv = confirmationDiv;
		}
		this.confirmationDiv.dialog("open");
		
	},


	/**
	 * Method: openTextDialog
	 * Create a dialog alowing the user add a description for the newly
	 * added feature. This function is listening to the event "addfeature".
	 * @param events {Object}
	 * @returns {void}
	 */
	openTextDialog : function(events) {
		var feature = events.feature;
		
		var geomType = sMap.util.getGeomType(feature.geometry).toUpperCase();

		this.lastAddedFeature = feature;
		
		if (geomType == "LINE") {			
			// LINES
			this.destroyDialogDiv();
			this.createPOIDialog();
			this.dialogDiv.dialog("open");
			this.drawLines.deactivate();
		}else		
		if (geomType == "POINT") {			
			// POINTS
			this.destroyDialogDiv();
			this.createPOIDialog();
			this.dialogDiv.dialog("open");
			this.drawPoints.deactivate();
		}
		
		else if (geomType == "POLYGON") {			
			// POLYGONS
			this.destroyDialogDiv();
			this.createPOIDialog();
			this.dialogDiv.dialog("open");
			this.drawPolygons.deactivate();
		}

	},
	
	/**
	 * Method: selectedTable
	 * @param void
	 * @returns {void}
	 * This method change the table by the user when another 
	 * category is selected 
	 */
	selectedTable : function(){
		var self = this;
		var selectedTableOpt = $("select[id='poi-category']").val();
		this.selectedTableOpt = selectedTableOpt;
		var counttop = false;
		var countbottom = false;
		if(selectedTableOpt){
			if(this.selectedTableOpt == "Välj tabell"){
				if(self.editLayer.features.length > 0){
					self.editLayer.destroyFeatures();
				}
				this.editLayer.drawn = false; // Avoid Draw features on the MAP when there is no Category
				this.featureTypes = null;
			}
		}
		
		$("select[id='poi-category']").change(function(){
			self.selectedTableOpt = $("#poi-category").val();
			self.destroyEditLayer();
			self.destroyDrawControl();
			self.changeTable(self.selectedTableOpt);
			if(self.selectedTableOpt == "Välj tabell"){
				if(countbottom === false){
					$(".poi-edit-btnpanel").animate({"top": "-=30px"}, "fast");
				countbottom = true;
				}
				countbottom = false;
				counttop = false;
				self.removeEditBtnLblDiv();
				return false;
			}else{
				self.recreateEditLayer();
			}
			
			self.deactivateAllBtn();
			self.deactivateAllDrawCtrl();
			self.geombtnIsActive = false;
			
			if(counttop === false){
				$(".poi-edit-btnpanel").animate({"top": "+=30px"}, "fast");
				counttop = true;
			}

			self.createEditButton();
							
			if(self.delbtnIsActive === true){	
//				self.onControlActivate(this.e);
				self.iconEraser(false);
//				self.deleteFeature.deactivate();
				self.delbtnIsActive = false;
			}

		});
	} ,

	createEditButton : function(){
		var self = this;
		this.removeEditBtnLblDiv();
		var geomType = self.getGeom();
		var imgs = this.getImg(geomType);
			if(this.selectedTableOpt != "Välj tabell"){
				this.drawEditLabels(geomType);
				var btntypeDiv = $("<div class='editpoi-btntypeDiv' />");
				this.btntypeDiv = btntypeDiv;
				
				var btnTypePoint = $("<input type='checkbox' id='epoi-btnType' />"),
				    lblBtnPoint = $("<label for='epoi-btnType'><img id='btnpt' src='"+imgs+"'/></label>"),
				    btnTypeLine = $("<input type='checkbox' id='epoi-btnType' />"),
				    lblBtnLine = $("<label for='epoi-btnType'><img id='btnln' src='"+imgs+"'/></label>"),
				    btnTypePolygon = $("<input type='checkbox' id='epoi-btnType' />"),
				    lblBtnPolygon = $("<label for='epoi-btnType'><img id='btnply' src='"+imgs+"'/></label>");
				
				btnTypePoint.click(function(events){
					var success = self.saveStrategy.events.listeners.success.length;
					var attrinput = $(this);
					var btnPointActive = attrinput.attr("checked");
					self.controltype = null;
					if(btnPointActive === true){
						if(success > 0){
							self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						}
						self.saveStrategy.events.register("success", self, self.onSaveSuccess);
						imgs = self.imgSrc + self.imgArr[1];
						$('#btnpt').attr('src', imgs);
						self.drawPoints.activate();
						self.deactivateAllBtn();
						self.onControlActivate(events);
						self.iconEraser(false);
					}
					else{
						self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						imgs = self.imgSrc + self.imgArr[0];
						$('#btnpt').attr('src', imgs);
						self.drawPoints.deactivate();
					}
					self.btntypeDiv.append(btnTypePoint);
					self.btntypeDiv.append(lblBtnPoint);
					self.editDialog.append(self.btntypeDiv);
				});
				
				btnTypeLine.click(function(events){
					var success = self.saveStrategy.events.listeners.success.length;
					var attrinput = $(this);
					var btnLineActive = attrinput.attr("checked");
					self.controltype = null;
					if(btnLineActive === true){
						if(success > 0){
							self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						}
						self.saveStrategy.events.register("success", self, self.onSaveSuccess);
						imgs = self.imgSrc + self.imgArr[3];
						$('#btnln').attr('src', imgs);
						self.drawLines.activate();
						self.deactivateAllBtn();
						self.onControlActivate(events);
						self.iconEraser(false);
					}
					else{
						self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						imgs = self.imgSrc + self.imgArr[2];
						$('#btnln').attr('src', imgs);
						self.drawLines.deactivate();
					}
					self.btntypeDiv.append(btnTypeLine);
					self.btntypeDiv.append(lblBtnLine);
					self.editDialog.append(this.btntypeDiv);
					
				});
				btnTypePolygon.click(function(events){
					var success = self.saveStrategy.events.listeners.success.length;
					var attrinput = $(this);
					var btnPolygonActive = attrinput.attr("checked");
					self.controltype = null;
					if(btnPolygonActive === true){
						if(success > 0){
							self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						}
						self.saveStrategy.events.register("success", self, self.onSaveSuccess);
						imgs = self.imgSrc + self.imgArr[5];
						$('#btnply').attr('src', imgs);
						self.drawPolygons.activate();
						self.deactivateAllBtn();
						self.onControlActivate(events);
						self.iconEraser(false);

					}
					else{
						self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						imgs = self.imgSrc + self.imgArr[4];
						$('#btnply').attr('src', imgs);
						self.drawPolygons.deactivate();
					}
					self.btntypeDiv.append(btnTypePolygon);
					self.btntypeDiv.append(lblBtnPolygon);
					self.editDialog.append(this.btntypeDiv);
					
				});
				if(geomType == "point"){
					self.btntypeDiv.append(btnTypePoint);
					self.btntypeDiv.append(lblBtnPoint);
					self.editDialog.append(this.btntypeDiv);
				}
				if(geomType == "line"){
					this.btntypeDiv.append(btnTypeLine);
					this.btntypeDiv.append(lblBtnLine);
					self.editDialog.append(this.btntypeDiv);
				}
				if(geomType == "polygon"){
					this.btntypeDiv.append(btnTypePolygon);
					this.btntypeDiv.append(lblBtnPolygon);
					self.editDialog.append(this.btntypeDiv);
				}
			
			}//End of IF
	},
	
	/**
	 * Method: drawEditLabels
	 * This draws the label for each edit button on the ToolsBar
	 * @param geomT {String} type of geom - point, line or polygon.
	 * @returns{void}
	 */
	drawEditLabels: function(geomT) {
		var self = this;
		var geom = null;
		var labelDiv = $("<div class='poi-lbl-draw' />");
		this.labelDiv = labelDiv;
		if(geomT == "point"){
			geom = $("<label>"+this.lang.labelDrawPoint+"</label>");
		}
		if(geomT == "line"){
			geom = $("<label>"+this.lang.labelDrawLine+"</label>");
		}
		if(geomT == "polygon"){
			geom = $("<label>"+this.lang.labelDrawPolygon+"</label>");
		}
		this.labelDiv.append(geom);
		this.editDialog.append(labelDiv);
	},

	/**
	 * Method: removeEditBtnLblDiv
	 * @param void
	 * @return void
	 * This remove the Edit button and its Label from the Dialog when Table are not selected.
	 */
	removeEditBtnLblDiv : function (){
		//Remove the btns DIV
		if(this.btntypeDiv ){
			this.btntypeDiv.empty().remove();
			this.btntypeDiv = null;
		}
		//Remove the lbls Div
		if(this.labelDiv ){
			this.labelDiv.empty().remove();
			this.labelDiv = null;
		}
	},
	
	/**
	 * Method: getGeom
	 * @param void
	 * @returns geomType {String} the type of GEOM
	 * This uses the selected table to determine which type of Geom the table have.
	 * Then returns the type of the geom - line, point or polygon.
	 */
	getGeom : function(){
		var self = this;
		var geomType = [];
		var valSelected = self.selectedTableOpt.toUpperCase();
		$.each(this.geoTbls, function(obj, value){
			var dispName = value[0].displayName.toUpperCase();
			if(dispName == valSelected){
				geomType.push(value[0].geomType);
			}
		});
		
		return geomType[0];
	},
	
	/**
	 * Method: getImg
	 * @param geomType
	 * @returns {String}
	 * This determine the type of image the control button should used based on the geom type. 
	 */
	getImg : function(geomType){
		var self = this;
		var imgs = "";
		if(geomType == "point"){
			imgs = self.imgSrc + self.imgArr[0]; //Gets the img point_off
		}
		if(geomType == "line"){
			imgs = self.imgSrc + self.imgArr[2]; //Gets the img line_off
		}
		if(geomType == "polygon"){
			imgs = self.imgSrc + self.imgArr[4]; //Gets the img polygon_off
			
		}
		return imgs;
	},
	
	/**
	 * Method: createPOIDialog
	 * @param void
	 * @returns {void}
	 * Create the Dialog containing the form and buttons together
	 * with a submit button and a cancel button.
	 * It is used to edit the Attributes.
	 */
	createPOIDialog : function() {
		var self = this;
		var dialogDiv = $("<div class='poi-dialogDiv' />");
		this.dialogDiv = dialogDiv;
		
		$("body").append(dialogDiv);
		
		var poiForm = $("<form id='poiDialog-form' />");
		dialogDiv.append(poiForm);
		
		var poiFieldSet = $("<fieldset />");
		poiForm.append(poiFieldSet);

//================================== FORM CREATION START HERE USING CONFIG FILE ===============================================================
		
		var tblAttributes = [];
		var valSelected = self.selectedTableOpt.toUpperCase();
		$.each(this.geoTbls, function(obj, value){
			var dispName = value[0].displayName.toUpperCase();
			if(dispName == valSelected){
				tblAttributes.push(value);
			}
		});
		
		var inputOk = false,
			selectOk = false,
			textareaOk = false,
			citiesOpt = [],
			fieldID = "";
		
		
		var fieldInForm = tblAttributes[0];
		var addFieldsToForm = [];
		
		//Gets all the municipalities from lang file
		for(var i=0, len=this.lang.selectCity.length; i<len; i++){
			citiesOpt.push(this.optionOpen + this.lang.selectCity[i] + this.optionClose);
		}
		
		for(var j=0, lenj=fieldInForm.length; j<lenj; j++){
			var tempObjAttrFields = fieldInForm[j];
			
				if(tempObjAttrFields.fieldType == "input"){
					 inputOk = true;
					 selectOk = false;
					 textareaOk = false;
				}
				
				if(tempObjAttrFields.fieldType == "select"){
					inputOk = false;
					selectOk = true;
					textareaOk = false;
				}
				
				if(tempObjAttrFields.fieldType == "textarea"){
					inputOk = false;
					selectOk = false;
					textareaOk = true;
				}
			
			if(tempObjAttrFields.attrName != "objekttyp"){
				if(tempObjAttrFields.attrName != "the_geom"){
					if(tempObjAttrFields.formStatus === true){
						this.arrFieldID.push(tempObjAttrFields.fieldType+"-epoi-"+tempObjAttrFields.attrName);
					}
				}
			}
			fieldID = tempObjAttrFields.fieldType+"-epoi-"+tempObjAttrFields.attrName;
			this.fieldID = fieldID;
			
		if(tempObjAttrFields.fieldType !== undefined){
			if(tempObjAttrFields.fieldType != "textarea"){
				//The addFieldlabel is used to create all the labels fields on the FORM 
				//besides the Catergory below.
				var addFieldlabel = $("<p /><label for='"+tempObjAttrFields.fieldType+"epoi-"+tempObjAttrFields.attrName+"'>"+tempObjAttrFields.formDispName+"</label>");
				poiFieldSet.append(addFieldlabel);
			}else{
				//The addFieldlabel is used to create all the labels fields on the FORM 
				//besides the Catergory below.
				var addFieldlabel = $("<p /><label for='"+tempObjAttrFields.fieldType+"epoi-"+tempObjAttrFields.attrName+"'>"+tempObjAttrFields.formDispName+"</label><p />");
				poiFieldSet.append(addFieldlabel);
			}			
		}
			var  dispName = tempObjAttrFields.formDispName; 
			if(dispName == "Kategory : "){  //Notice the blank space after : colon
				inputOk = false;
				var tmp = $("select[id='poi-category']").val();
				var addseleCat = $("<label for='"+tempObjAttrFields.fieldType+"epoi-"+tempObjAttrFields.attrName+"'><b>"+tmp+"</b></label>"); //this.optionCategory[0]
				poiFieldSet.append(addseleCat);
			}
			if(tempObjAttrFields.attrName == "from_date"){
				var datefrom = $("<input type='text' id='datepickerfrom' placeholder='yyyy-mm-dd' class='text ui-widget-content ui-corner-all'>");
				if(self.controltype == "editattribute"){
					var tempattr = this.editLayer.selectedFeatures[0].attributes;
					var eachattr = $.each(tempattr, function(objName, value){
						var tempValue = value;
						var tempObjName = objName;
						if(tempObjName == tempObjAttrFields.attrName){
							var insertAttrVal = tempValue; 
							datefrom.val(insertAttrVal);
						}
					});
				}
				poiFieldSet.append(datefrom);
				inputOk = false;
			}
			if(tempObjAttrFields.attrName == "until_date"){
				var dateuntil = $("<input type='text' id='datepickeruntil' placeholder='yyyy-mm-dd' class='text ui-widget-content ui-corner-all'>");
				if(self.controltype == "editattribute"){
					var tempattr = this.editLayer.selectedFeatures[0].attributes;
					var eachattr = $.each(tempattr, function(objName, value){
						var tempValue = value;
						var tempObjName = objName;
						if(tempObjName == tempObjAttrFields.attrName){
							var insertAttrVal = tempValue; 
							dateuntil.val(insertAttrVal);
						}
					});
				}
				poiFieldSet.append(dateuntil);
				inputOk = false;
			}
			
			//This call the a method which creates the calendar.
			this.createDatePick();
			
			if(inputOk === true){
				var addFieldInput = $("<input type='text' id='"+fieldID+"' size='"+tempObjAttrFields.fieldSize+"' class='text ui-widget-content ui-corner-all'>");
				if(self.controltype == "editattribute"){
					var tempattr = this.editLayer.selectedFeatures[0].attributes;
					$.each(tempattr, function(objName, value){
						var tempValue = value;
						var tempObjName = objName;
						if(tempObjName == tempObjAttrFields.attrName){
							var insertAttrVal = tempValue; 
							addFieldInput.val(insertAttrVal);
						}
					});
				}
				poiFieldSet.append(addFieldInput);
			}

			if(selectOk === true){
				var addFieldSelect = $("<select id='"+fieldID+"' class='text ui-widget-content ui-corner-all'>"+citiesOpt+"</select>");
				if(self.controltype == "editattribute"){
					var tempattr = this.editLayer.selectedFeatures[0].attributes;
					var eachattr = $.each(tempattr, function(objName, value){
						var tempValue = value;
						var tempObjName = objName;
						if(tempObjName == tempObjAttrFields.attrName){
							var insertAttrVal = tempValue; 
							addFieldSelect.val(insertAttrVal);
						}
					});
				}
				poiFieldSet.append(addFieldSelect);
			}
			if(textareaOk === true){
				var addFieldTextArea = $("<textarea id='"+fieldID+"' rows='"+tempObjAttrFields.rows+"' cols='"+tempObjAttrFields.cols+"' class='text ui-widget-content ui-corner-all'></textarea>");
				if(self.controltype == "editattribute"){
					var tempattr = this.editLayer.selectedFeatures[0].attributes;
					var eachattr = $.each(tempattr, function(objName, value){
						var tempValue = value;
						var tempObjName = objName;
						if(tempObjName == tempObjAttrFields.attrName){
							var insertAttrVal = tempValue; 
							addFieldTextArea.val(insertAttrVal);
						}
					});
				}
				poiFieldSet.append(addFieldTextArea);
			}
			this.tempObjAttrFields = tempObjAttrFields;
		}
		
		/**
		 * TODO 
		 * The optionButtons must be changed according to the Category the user is 
		 * dealing with. "Skapa", "Spara", "Uppdatera" are the option
		 */
		var btnspanel = $("<div id='poi-btnspanel' align='right' />");
		var cancelbtn = $("<p /><button id='poi-cancelbtn'><b>"+this.lang.labelCancelbtn+"</b></button>"),
			submitbtn = $("<button id='poi-submitbtn'><b>"+this.optionButtons[2]+"</b></button>");
			btnspanel.append(cancelbtn).append(submitbtn);
			dialogDiv.append(btnspanel);
		
		var self = this; // it is used for button to work with the method click	
		
		submitbtn.click(function(){
			self.retriveAttributes();   //get all attributes to be stored in DB
			self.saveEdits();			//Save feature
			alert("THANK YOU! YOU HAVE SUBMIT YOUR REQUEST!");
			self.dialogDiv.dialog("close");
			self.destroyDialogDiv();
			
			
			if(self.lastAddedFeature){
				self.lastAddedFeature.destroy();
			}
//			self.addEditLayer(); // BAD BUG
			self.deactivateAllDrawCtrl();
			self.createEditButton();
			self.deactivateSelectControl();
		});
		
		cancelbtn.click(function(){
			self.destroyDialogDiv();
			if(self.editLayer.selectedFeatures.length > 0){
				self.select.unselectAll();
				self.deactivateSelectControl();
			}
			if(self.lastAddedFeature){
				self.lastAddedFeature.destroy();
				self.lastAddedFeature = null;
			}
			self.deactivateAllDrawCtrl();
			self.createEditButton();
		});

		sMap.util.createDialog(dialogDiv, {
			modal : true,
			titleText: this.lang.labelText,
			draggable : true,
			width : 500,
			height : "auto", 
			position : "center",
			closeOnEscape : false,
			onOpen: function(e) {
				// Remove the close button
				$(e.target).parent().find(".ui-dialog-titlebar-close").hide();
			}
		});

		dialogDiv.dialog("open");

	},
	
	/**
	 * Method: retriveAttributes
	 * @param void
	 * @returns{void}
	 * This method retrieves all the attributes of a feature to be send to
	 * Postgis DB
	 */
	retriveAttributes : function (){
		var self = this;
		/**
		 * Variable used to retrive all attributes to be stored 
		 */
		var feature = null;
		if(self.lastAddedFeature){
			feature = self.lastAddedFeature;
		}
		if(self.editLayer.selectedFeatures[0]){
			feature = self.editLayer.selectedFeatures[0];
		}
		
		var fromdate = $("input[id='datepickerfrom']").val(),
		    untildate = $("input[id='datepickeruntil']").val(),
		    attrFromTbl = [];
		
		$.each(self.geoTbls, function(obj, value){
			var tempObj = obj;
			var tempVal = value;
			if(tempObj == self.featureTypes){
				attrFromTbl.push(tempVal);
			}
		});
		$.each(attrFromTbl[0], function(obj, value){
			var tempObj = obj;
			var tempVal = value;
			if(tempVal.attrName){
				if(tempVal.formStatus === true){
					if(tempVal.fieldType == "select"){
						var fieldValue = $("select[id="+tempVal.fieldType+"-epoi-"+tempVal.attrName+"]").val();
						var obj = jQuery.parseJSON('{"'+tempVal.attrName+'":"'+fieldValue+'"}');
						var object = $.extend(feature.attributes, obj);
					}
					if(tempVal.fieldType == "input"){
						var fieldValue = $("input[id="+tempVal.fieldType+"-epoi-"+tempVal.attrName+"]").val();
						var obj = jQuery.parseJSON('{"'+tempVal.attrName+'":"'+fieldValue+'"}');
						var object = $.extend(feature.attributes, obj);
					}
					if(tempVal.fieldType == "textarea"){
						var fieldValue = $("textarea[id="+tempVal.fieldType+"-epoi-"+tempVal.attrName+"]").val();
						var obj = jQuery.parseJSON('{"'+tempVal.attrName+'":"'+fieldValue+'"}');
						var object = $.extend(feature.attributes, obj);
					}
				}
			}
				
		});		
				
		feature.attributes.objekttyp = this.selectedTableOpt;		
		feature.attributes.from_date = fromdate;						
		feature.attributes.until_date = untildate;					
	},
	
	/**
	 * Method: destroyDialogDiv
	 * @param
	 * @returns {void}
	 * This method destroy and empty the dialogDiv making it ready for further and new entry.
	 */
	destroyDialogDiv : function(){
		// One must destroy and empty the dialog in order to remove all of its content pertaining and
		// be able to create and reopen a new dialog when the dialog is toggled canceled or closed.
		if (this.dialogDiv && this.dialogDiv.dialog) {
			this.dialogDiv.dialog("destroy");
			this.dialogDiv.empty().remove();
			this.dialogDiv = null;
		}
		if (this.confirmationDiv && this.confirmationDiv.dialog) {
			this.confirmationDiv.dialog("destroy");
			this.confirmationDiv.empty().remove();
			this.confirmationDiv = null;
		}
	},
	
	/**
	 * Method: createDatePick
	 * @returns {void}
	 * When deactivate and re-activate datepicker does not display 
	 * the calendar on the second time around. It can be solved by 
	 * destroy and empty the dialogDiv. Datapicker must be called right 
	 * below and after the its input field line. 
	 */
	createDatePick : function(){
		$( "#datepickerfrom" ).datepicker({
			minDate: 0,
			showWeek: true,
			firstDay: 1,
			showOn: "button",
			buttonImage: this.btnImageURL,
			buttonImageOnly: true,
			dateFormat: 'yy-mm-dd',
			showAnim: 'fold',
			showButtonPanel: true,
			onClose: function(datetext, inst) {
				
				var untildate = $("#datepickeruntil");
				var datecomp = untildate.val();
				
				if(datecomp <= datetext){
					//alert("Date was not right");
					/**
					 * TODO 
					 * Fix the numbers
					 */
					datecomp = "9999/99/99"; 
				}
				if(datecomp >= datetext){
					
					$( "#datepickeruntil" ).val("").focus();
				}
			}
			
		});
		//datepickDiv.append(datepickfrom);
		
		$( "#datepickeruntil" ).datepicker({
			minDate: 0,
			showWeek: true,
			firstDay: 1,
			showOn: "button",
			buttonImage: this.btnImageURL,
			buttonImageOnly: true,
			dateFormat: 'yy-mm-dd',
			showAnim: 'fold',
			showButtonPanel: true,
			onClose: function(datetext, inst) {
				var fromdate = $("#datepickerfrom");
				var datecomp = fromdate.val();
				if(datetext <= datecomp){
					alert("The date you enter is not Valid!!!");
					$( "#datepickeruntil" ).val("").focus();
				}
			}
		});
	},
	
	/**
	 * Method: saveEdits
	 * @param {void}
	 * @returns {void} 
	 * Saves the features on the layer with state INSERT, DELETE or UPDATE.
	 */
	saveEdits : function() {
		var f = null;
		if(this.lastAddedFeature){
			f = this.lastAddedFeature;
		}
		if(f == null){
			if(this.editLayer.selectedFeatures[0]){
				f = this.editLayer.selectedFeatures[0];
			}
			else{
				for(var i=0, leni=this.editLayer.features.length; i<leni; i++){
					if(this.editLayer.features[i].state == "Update"){
						f = this.editLayer.features[i];
					}
				}
			}
		}
		if(f !== null){
			if(this.controltype == "editattribute"){
				if(f.state == "Update"){
					f.data = f.attributes;
				}
			}
			
			var geomType = sMap.util.getGeomType(f.geometry);
			this.editLayer.protocol.setFeatureType(this.featureTypes);
			
			this.editLayer.protocol.setFeatureType(this.featureTypes);
			
			// It might not be enough to setFeatureType using the method above.
			// Also need to change the schema.
			var schema = this.editLayer.protocol.schema;
			var arr = schema.split(":");
			arr[arr.length-1] = this.featureTypes;
			this.editLayer.protocol.schema = arr.join(":");
			
			// Finally, save.
			
			this.saveStrategy.save([f]);
		
			this.lastAddedFeature = null;
//			this.editLayer.refresh():
			if(this.editLayer.selectedFeatures.length > 0){
				if(this.editLayer.selectedFeatures[0].renderIntent == "delete"){
					this.editLayer.selectedFeatures[0].destroy();
				}
				else{
						this.select.unselectAll();
				}
			}
		}
//		if(this.dragFeature){
//			this.dragFeature.deactivate();
//		}
	},
		
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	
	CLASS_NAME : "sMap.Module.EPOI"
	
});