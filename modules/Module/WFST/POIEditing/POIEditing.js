/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.WFST.POIEditing = OpenLayers.Class(sMap.Module.WFST, {
	
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

	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	/**
	 *Open and close <option> tag for <select> tag 
	 */
	optionOpen: "<option>",
	optionClose: "</option>",
	
	/**
	 * Declared and used for the animation of the drawing button
	 */
	goTop : false,
	goBottom : false,

	/**
	 * Status of the Draw Button default OFF is 0 and ON is 1
	 */
	btnStatus: "off",

	/**
	 * The buttons geometry type point, line or polygon.
	 */ 
	btnGeomType : null,
	
	/**
	 * The feature lastly added to the edit layer.
	 */
	lastAddedFeature: null,
	
	/**
	 * This array keeps track of the id's on the FORM
	 */
	arrFieldID: [],
	
	/**
	 * Used to hold the field that is required in the FORM
	 */
	requiredFields: [],
	
	controltype: "",
	
	dates: [],
	
	varr : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.WFST.POIEditing.prototype.EVENT_LISTENERS.concat(
				sMap.Module.WFST.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.WFST.POIEditing.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.WFST.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.WFST.prototype.initialize.apply(this, [options]);
		
		var newConfig = {};
		OpenLayers.Util.extend(newConfig, sMap.moduleConfig.WFST.POIEditing); // Override the copy of the parent class's settings.
		OpenLayers.Util.extend(newConfig, sMap.moduleConfig.WFST); // Don't override settings in case its used by other modules
		OpenLayers.Util.extend(this, newConfig); // Store in this module.
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		
		var ok = sMap.Module.WFST.prototype.activate.apply(
	            this, arguments);
		
		if(ok){
			this.createEditDialog();
			this.getGeoTablesAttr();
			this.selectedTable();
		}
		
		// Call the activate method of the parent class
		return true; 
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		
		// Destroy the dialog.
		if (this.editDialog && this.editDialog.dialog) {
			$("#input-epoi-descformError").validationEngine("hideAll");
			this.editDialog.dialog("destroy");
			this.editDialog.empty().remove();
			this.editDialog = null;
		}

		this.unbindEventListeners();
		this.deactivateAllDrawCtrl();
		this.destroyEditLayer();
		this.iconEraser(false);
		this.delbtnIsActive = false;
		this.animateDrawBtns(false);
		this.requiredFields = [];
		
		// Call the deactivate method of the parent class
		return sMap.Module.WFST.prototype.deactivate.apply(this, arguments);
	},
	
	destroy : function() {
		// Call the destroy method of the parent class
		return sMap.Module.WFST.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Called when all modules are initialized, i.e. after initialize.
     * All initial HTML should be produced from here.
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
			iconCSS : "icon-poi",
			tagID : "button-poi"
		});

	},
	
	/** Method: bindEventListeners
	 * Bind necessary listeners.
	 * @returns {void}
	 */
	bindEventListeners: function() {
		if(this.editLayer !== null){
			// Bind the adding of a feature to triggering of add description dialog.
			this.editLayer.events.register("sketchcomplete", this, this.openTextDialog);
		}
		
		this.editLayer.events.register("featureselected", this, function(){
			this.openCloseDialog(true);	
			this.confirmationDialog();
			
		});
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
	 * Method: createEditDialog
	 * Create the dialog containing the Editing buttons together
	 * with a edit geometry, edit attributes and delete buttons.
	 * @param (void)
	 * @returns {void}
	 */
	createEditDialog: function() {
		var self = this;
		var editDialog = $("<div class='editpoi-dialogDiv' />");
		this.editDialog = editDialog;
		$("body").append(editDialog);
		
		this.createEditForm();

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
			onOpen: function(e) {
				// Remove the close button
//				$(e.target).parent().find(".ui-dialog-titlebar-close").hide();
				$(e.target).parent().find(".ui-dialog-titlebar-close").bind("click",function(e){
					self.deactivate();
				});
			}
		});
		this.editDialog.dialog("open");	
	},
	
	/**
	 * Method: createEditForm
	 * @param {void}
	 * @return {void}
	 * This method creates a form for the edit dialog
	 */
	createEditForm : function(){
		var poiForm = $("<form id='poi-form' />");
		this.editDialog.append(poiForm);
		
		var dialogFieldSet = $("<fieldset />");
		poiForm.append(dialogFieldSet);
				
		var labelcategory = $("<p></p><label for='poi-style'>"+this.lang.labelCategory+"</label>");

		dialogFieldSet.append(labelcategory);
		
		this.getGeoTablesAttr();
		this.tablesList = [];

		for(var i=0, len=this.categoryOpt.length; i<len; i++){
			this.tablesList.push(this.optionOpen + this.categoryOpt[i] + this.optionClose);
		}
		this.createEditFormButtons(dialogFieldSet);		
	},
	
	/**
	 * Method: createEditFormButtons
	 * @param {Object} jQuery object <fieldset>
	 * @return {void}
	 * This Generate the buttons for the FORM
	 */
	createEditFormButtons: function(dialogFieldSet){
		var self = this;
		var selectField = $("<select id='poi-category' class='text ui-widget-content ui-corner-all'>"+this.tablesList+"</select>");
		dialogFieldSet.append(selectField);
		
		var btnPanel =    $("<div class='poi-edit-btnpanel' id='radio' />"),
		    editattrbtn = $("<input type='checkbox' name='radio' id='epoi-editAttr' />"),
		    lbleditattr = $("<label for='epoi-editAttr'><b>"+this.lang.btnEditAttr+"</b></label>"),
		    editgeombtn = $("<input type='checkbox' name='radio' id='epoi-editGeom' />"),
		    lbleditgeom = $("<label for='epoi-editGeom'><b>"+this.lang.btnEditGeom+"</b></label>"),
		    btnDelete =   $("<input type='checkbox' name='radio' id='poi-btndelete' />"),
		    lblDelete =   $("<label for='poi-btndelete'><b>"+this.lang.btnDelete+"</b></label>");
	
		this.btnPanel = btnPanel;
		
		this.btnPanel.append(editattrbtn);
		this.btnPanel.append(lbleditattr);
		this.btnPanel.append(editgeombtn);
		this.btnPanel.append(lbleditgeom);
		this.btnPanel.append(btnDelete);
		this.btnPanel.append(lblDelete);
		
		this.editDialog.append(btnPanel);
		
		this.btnPanel.buttonset();
		this.btnPanel.addClass("ui-widget-header");
		
		editattrbtn.click(function(e){
			var attrinput = $(this);
			self.editAttributes(e, attrinput);
		});

		editgeombtn.click(function(e){
			var success = 0;
			
			self.deactivateAllDrawCtrl();
			
			if(self.saveStrategy){
				var locateSuccess = $(self.saveStrategy.events.listeners).attr("success");
				if(locateSuccess !== undefined){
					success = locateSuccess.length;//self.saveStrategy.events.listeners.success.length;
				}
			}
			var after = 0;
			
				var locatefeatureunselected = $(self.editLayer.events.listeners.afterfeaturemodified).attr("featureunselected");
				if(locatefeatureunselected !== undefined){
					after = locatefeatureunselected.length;//self.saveStrategy.events.listeners.success.length;
			}
//			var success = self.saveStrategy.events.listeners.success.length;
//			var after = self.editLayer.events.listeners.afterfeaturemodified.length;
			var check = self.checkIfTableSelected();
			
//			self.geombtnIsActive = false;
			self.btnStatus = "off";
			
			if(check !== false){
				if(self.geombtnIsActive !== true){
					var geominput = $(this);
					var geombtnIsActive = geominput.prop("checked"); // Getting the value of  the attribute "checked" (true/false)
					self.geombtnIsActive = geombtnIsActive;
					if(self.geombtnIsActive === true){
						if(success > 0){
							self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
						}
						self.saveStrategy.events.register("success", self, self.onSaveSuccess);
						if(after > 0){
							self.editLayer.events.unregister("featureunselected", self, self.onFeatureModified);
							self.editLayer.events.listeners.afterfeaturemodified = [];
						}
						self.editLayer.events.register("featureunselected", self, self.onFeatureModified);
						var btn = $("#epoi-editGeom").attr("id");
						self.deactivatePrevBtn(btn);
						self.deactivateAllDrawCtrl();
						self.removeDrawtBtnLblDiv();
						self.createDrawButtons();
						self.controltype = "editgeometry";
						self.destroyDialogDiv();
						self.controls.modify.activate();
					}
					
					// Deactivate completly the Delete Button Control.
					self.deactivateDelBtn();
				}
				else {
					self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
					self.destroyDialogDiv();
					self.deactivateAllBtn();
					self.deactivateAllDrawCtrl();
//					self.deactivateModifyControl();
					if(self.select){
						self.select.deactivate();
					}
					self.geombtnIsActive = false;
					
					}
			}
			else{
				self.deactivateAllBtn();
				self.attrbtnIsActive = false;
			}
		});
		
		btnDelete.click(function(e){
			var attrinput = $(this);
			self.deleteFeatures(e, attrinput);
		});
	},
	
	deactivateDelBtn : function(){
		// Deactivate completly the Delete Button Control.
		if(this.delbtnIsActive === true){
			this.iconEraser(false);
			this.delbtnIsActive = false;
		}
	},

	
	/**
	 * Method : editAttributes
	 * @param {object, Boolean} object with the button events. Boolean true if active
	 * @return {void}  
	 * When the button edit attributes is clicked this method is called
	 * in order to retrieve feature info to be edited
	 */
	editAttributes : function(e, attrinput){
		var self = this;
		var success = 0;

		self.deactivateAllDrawCtrl();
		
		if(self.saveStrategy){
			var locateSuccess = $(self.saveStrategy.events.listeners).attr("success");
			if(locateSuccess !== undefined){
				success = locateSuccess.length;//self.saveStrategy.events.listeners.success.length;
			}
		}
		var check = self.checkIfTableSelected();
		var attrbtnIsActive = attrinput.prop("checked"); // Getting the value of  the attribute "checked" (true/false)
		self.attrbtnIsActive = attrbtnIsActive;

		self.geombtnIsActive = false;
		self.btnStatus = "off";
		
		if(check !== false){
			if(self.attrbtnIsActive === true){
				if(success > 0){
					self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
				}
				self.saveStrategy.events.register("success", self, self.onSaveSuccess);
				var btn = $("#epoi-editAttr").attr("id");
				self.deactivatePrevBtn(btn);
				self.removeDrawtBtnLblDiv();
				self.createDrawButtons();
				self.controltype = "editattribute";
				self.destroyDialogDiv();
				self.deactivateAllDrawCtrl();
				self.controls.select.activate();
			}
			else{
				self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
				self.controls.select.deactivate();
			}
		}
		else{
			self.deactivateAllBtn();
			self.attrbtnIsActive = false;
		}
		
		// Deactivate completly the Delete Button Control.
		if(self.delbtnIsActive === true){
			self.iconEraser(false);
			self.delbtnIsActive = false;
		}
		if(self.geombtnIsActive === true){
			self.geombtnIsActive = false;
		}
	},
	
	/**
	 * Method: deleteFeatures
	 * @param {object, Boolean} object with the button events. Boolean true if active
	 * @return {void}  
	 * When the button delete attributes is clicked this method is called
	 * in order to retrieve feature info to be edited
	 */
	deleteFeatures : function(e, attrinput){
		var self = this;
		
		var success = 0;
		
		if(self.saveStrategy){
					var locateSuccess = $(self.saveStrategy.events.listeners).attr("success");
					if(locateSuccess !== undefined){
						success = locateSuccess.length;//self.saveStrategy.events.listeners.success.length;
					}
		}

		var check = self.checkIfTableSelected();
		var delbtnIsActive = attrinput.prop("checked"); // Getting the value of  the attribute "checked" (true/false)
		self.delbtnIsActive = delbtnIsActive;

		self.geombtnIsActive = false;
		self.btnStatus = "off";
		
		if(check !== false){
			if(self.delbtnIsActive === true){
				if(success > 0){
					self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
				}
				self.saveStrategy.events.register("success", self, self.onSaveSuccess);
				var btn = $("#poi-btndelete").attr("id");
				self.deactivatePrevBtn(btn);
				self.removeDrawtBtnLblDiv();
				self.createDrawButtons();
				self.controltype = "deleteobject";
				self.iconEraser(true);
				self.deactivateAllDrawCtrl();
				self.controls.select.activate();
			}
			else{
				self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
				self.deactivateAllDrawCtrl();
				self.destroyDialogDiv();
				self.iconEraser(false);
			}
		}
		else{
			self.deactivateAllBtn();
			self.delbtnIsActive = false;
		}
		
		if(self.geombtnIsActive === true){
			self.geombtnIsActive = false;
		}
	},
	
	/**
	 * Method: onButtonsActivate
	 * @param void
	 * @return void
	 * This deactivate the activated buttons from the edit tool Dialog. 
	 */
	onButtonsActivate: function(){ // Deactivate the buttons not in use
		var self = this;
		var btnAttr = $("#epoi-editAttr");
		if(self.controltype == "editattribute"){
			if(this.attrbtnIsActive===true){
				this.attrbtnIsActive = false;
				btnAttr.attr("checked", false);
				btnAttr.next().removeClass("ui-state-active");
				if(this.select.handlers){
					this.select.deactivate();
				}
			}
		}
		if(self.controltype == "editgeometry"){
			var btnGeom = $("#epoi-editGeom");
			if(this.geombtnIsActive===true){
				this.geombtnIsActive = false;
				btnGeom.attr("checked", false);
				btnGeom.next().removeClass("ui-state-active");
			}
		}
		if(self.controltype == "deleteobject"){
			var btnDelete = $("#poi-btndelete");
			if(self.delbtnIsActive===true){
				this.delbtnIsActive = false;
				btnDelete.attr("checked", false);
				btnDelete.next().removeClass("ui-state-active");
				if(this.select.handler){
					this.select.deactivate();
				}
				this.iconEraser(false);
			}
		}
	},
	
	openCloseDialog : function(opt){
		var self = this;
		if(opt === true){
			if(self.editLayer){
				if(self.editLayer.selectedFeatures.length > 0){
					$(".editpoi-dialogDiv").dialog("close");
				}
			}
			$(".editpoi-dialogDiv").dialog("close");
		}
		else{
			$(".editpoi-dialogDiv").dialog("open");
		}
	},
	
	/**
	 * Method: getOption
	 * @param {void}
	 * @returns {void}
	 * Gets all the options from array in the config file 
	 */
	
	getAllSelectFields : function(){
		var self = this;
		var fieldsOption = [];
		var selectOpt = [];
		
		var geom = this.getGeom();
		
		self.selectedTableOpt;
		
		//Gets all the option in the select fields
		$.each(self.geoTbls, function(index, value){
			var ind = index;
			var val = value;
			if(index == self.featureTypes){
				var choosenTbl = self.geoTbls[index];
				$.each(choosenTbl, function(i, v){
					var idx = i;
					var vale = v;
					if(vale.fieldType == "select"){
					var sortOpt = self.selectOptions[0];	
					var options = $(sortOpt).attr(vale.attrName);
					options = $(options);
					
					//Gets all the option in an array from the language file
						selectOpt.push(vale.attrName)
						for(var j=0, len=options.length; j<len; j++){
							if($.isPlainObject(options[j])){
								var object = options[j].displayValue;
//								alert("HI");
								selectOpt.push(self.optionOpen + object + self.optionClose);
								
							}
							else
								{
								selectOpt.push(self.optionOpen + options[j] + self.optionClose);
								}
						}
						fieldsOption.push(selectOpt);
						selectOpt = [];
					}
					self.fieldsOption = fieldsOption;
				});
			}
		});
	},

	/**
	 * Method: changeBtnImage
	 * @param {Integer, String} Integer(button status) String(address of the image)
	 * @return {void}
	 * This method just change the image of the button based on its previous status
	 * OFF = 0 and ON = 1 
	 */
	changeBtnImage : function(btnStatus, imgAddress){
		var btnContent = $('#btnpt')[0];
			btnContent.src = imgAddress; 
	},
	
	/**
	 * Method: createDrawButtons
	 * @param {void}
	 * @return {void}
	 * This method creates and change the button type according to 
	 * the type of the feature selected.
	 */
	createDrawButtons : function(){
		var self = this;
		this.removeDrawtBtnLblDiv();
		this.btnGeomType = self.getGeom();
		var imgAddress = this.getDrawBtnImg(this.btnGeomType, this.btnStatus);
			if(this.selectedTableOpt != "Välj tabell"){
				this.drawEditLabels(this.btnGeomType);
				var btntypeDiv = $("<div class='editpoi-btntypeDiv' />");
				this.btntypeDiv = btntypeDiv;
				var drawBtnType = $("<img id='btnpt' src='"+imgAddress+"'/>");//<button id='epoi-btnType'></button> 
				self.btntypeDiv.append(drawBtnType);
				self.editDialog.append(self.btntypeDiv);
				
				drawBtnType.click(function(e){
					if(self.btnStatus == "off"){
						self.btnStatus = "on";
					}
					else{
							self.btnStatus = "off";
					}
					var imgAddress = self.getDrawBtnImg(self.btnGeomType, self.btnStatus);
					self.changeBtnImage(self.btnStatus, imgAddress);
//					var success = self.saveStrategy.events.listeners.success.length;
					self.deactivateAllBtn();
//					self.deactivateAllDrawCtrl();
//					self.destroyAllControl();
					self.deactivateDelBtn();
				});
			}//End of IF
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
	 * Method: getDrawBtnImg
	 * @param geomType
	 * @returns {String}
	 * This determine the type of image the control button should used based on the geom type. 
	 */
	getDrawBtnImg : function(geomType, btnStatus){
		var self = this;
		var imgAddress = "";
		if(geomType == "point" || geomType == null){
			if(btnStatus == "off"){
				imgAddress = self.imgSrc + self.imgArr[0]; //Gets the img point_off
				self.deactivateAllDrawCtrl();
			}
			else{
				imgAddress = self.imgSrc + self.imgArr[1]; //Gets the img point_on
				self.controls.point.activate();
				self.controltype = "";
			}
		}
		if(geomType == "line" || geomType == null){
			
			if(btnStatus == "off"){
				imgAddress = self.imgSrc + self.imgArr[2]; //Gets the img line_off
				self.deactivateAllDrawCtrl();
			}
			else{
				imgAddress = self.imgSrc + self.imgArr[3]; //Gets the img line_on
				self.controls.line.activate();
			}
		}
		if(geomType == "polygon" || geomType == null){
			if(btnStatus == "off"){
				imgAddress = self.imgSrc + self.imgArr[4]; //Gets the img polygon_off
				self.deactivateAllDrawCtrl();
			}
			else{
				imgAddress = self.imgSrc + self.imgArr[5]; //Gets the img polygon_on
				self.controls.polygon.activate();
			}
		}
		return imgAddress;
	},
	
	/**
	 * Method: drawEditLabels
	 * This draws the label for each edit button on the ToolsBar
	 * @param geomT {String} type of geom - point, line or polygon.
	 * @returns{void}
	 */
	drawEditLabels: function(geomT) {
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
	 * Method: removeDrawtBtnLblDiv
	 * @param void
	 * @return void
	 * This remove the Edit button and its Label from the Dialog when Table are not selected.
	 */
	removeDrawtBtnLblDiv : function (){
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
	 * Method: 	getGeoTablesAttr
	 * @param {void}
	 * @return {void}
	 * This method is used to get the attributes of tables from the
	 * the config files
	 */
	getGeoTablesAttr : function(){
		var self = this;
		var categoryOpt =   [];
		var allDBTables =   [];
		var tblAttributes = [];
		var objWithFieldType = [];
	
		$.each(self.geotables[0], function(objname, value){
			var objval = objname+":"+value;
			allDBTables.push(objname);
			categoryOpt.push(value[0].displayName);
			self.allDBTables = allDBTables;
			self.categoryOpt = categoryOpt;
			tblAttributes.push(value);
			self.tblAttributes = tblAttributes;
		});
		
		this.catOptCompleted = [];

		for(var i=0, leni=categoryOpt.length; i<leni; i++){
			var temp = categoryOpt[i];
			this.catOptCompleted.push(temp);
			temp = "";
		}
	},
	
	/**
	 * Method: selectedTable
	 * @param void
	 * @returns {void}
	 * This method gets the new selected table information
	 * after user selects it from the Category select field. 
	 */
	selectedTable : function(){
		var self = this;
		var selectedTableOpt = $("select[id='poi-category']").val();
		this.selectedTableOpt = selectedTableOpt;

		if(selectedTableOpt){
			if(this.selectedTableOpt == "Välj tabell"){
				if(self.editLayer){
					if(self.editLayer.features !== null){
						if(self.editLayer.features.length > 0){
							self.editLayer.destroyFeatures();
						}
					}
				}
				this.editLayer.drawn = false; // Avoid Draw features on the MAP when there is no Category
				this.featureTypes = null;
			}
		}
		
		$("select[id='poi-category']").change(function(){
			self.selectedTableOpt = $("#poi-category").val();
			self.changeTable(self.selectedTableOpt);

			if(self.selectedTableOpt == "Välj tabell"){
				self.goTop = false;
				self.goBottom = false;
				self.animateDrawBtns(false);
				self.removeDrawtBtnLblDiv();
				self.deactivateAllDrawCtrl();
				self.deactivateAllBtn();
				self.destroyEditLayer();
				self.deactivateDelBtn();
			}else{
				self.deactivateAllDrawCtrl();
				self.destroyEditLayer();
				self.recreateEditLayer();
				self.bindEventListeners();
				self.deactivateAllBtn();
				self.btnStatus = "off";
				self.createDrawButtons();
				self.goBottom = true;
				self.animateDrawBtns(true);
				self.deactivateDelBtn();
			}

		});		
	},
	
	/**
	 * Method: animateDrawBtns
	 * @param {Boolean} True if wants to animate
	 * @return {void}
	 * This method animates the draws buttons up and down when desired table is selected
	 */
	animateDrawBtns : function(opt){
		var self = this;
		if(opt == true){
			if(self.goBottom === false){
				$(".poi-edit-btnpanel").animate({"top": "-=30px"}, "fast");
				self.goBottom = true;
			}	
			else{
				if(self.goTop === false){
					$(".poi-edit-btnpanel").animate({"top": "+=30px"}, "fast");
					self.goTop = true;
				}
			}
		}
		else{
			if(self.goBottom === false){
				$(".poi-edit-btnpanel").animate({"top": "-=30px"}, "fast");
				self.goBottom = true;
			}	
			else{
				if(self.goTop === true){
					$(".poi-edit-btnpanel").animate({"top": "+=30px"}, "fast");
					self.goTop = false;
				}
			}
		}
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
	 * Change the protocol of the edit layer in the
	 * correct way.
	 * @param schema {String} It is the table to be send in the request by WFS-T to Postgis
	 * @return void
	 * 
	 */
	changeTable: function(selectedTableOpt) {
		var valSelected = selectedTableOpt.toUpperCase();
		var geoTbls = this.geotables[0];
		this.geoTbls = geoTbls;
		var tablesAttr = $(geoTbls);
		var self = this;
		var tblname = [];

		$.each(self.geoTbls, function(obj, value){
			var objvalue = obj +":"+ value[0];
			var dispName = value[0].displayName.toUpperCase();
			if(dispName == valSelected){
				tblname.push(value[0].name);
			}
		});
		this.featureTypes = tblname[0];
		var tableProp = tablesAttr.prop(this.featureTypes);
		
		if(tableProp){
			$.each(tableProp, function(obj, value){
				var objvalue = obj;
				var val = $(value);
				if(val.prop("WFSService")){
					self.WFSService = val.prop("WFSService");
				}
				if(val.prop("WFSService")){
					self.featureNS = val.prop("featureNS");
				}
				if(val.prop("WFSService")){
					self.workspace = val.prop("workspace");
				}
			});
		}
		
	},
	
	/**
	 * Method: getObjWithFieldType
	 * @param {void}
	 * @return {object} Elements of the selected table
	 * Gets all the elements from the table wich contains fieldType
	 */
	getObjWithFieldType : function(){
		var geotbls = this.geotables[0];
		var tables = [];
		var elements = [];
		var selectedGeoTbl = [];
		
		for(var x in geotbls){
			tables.push(geotbls[x]);
		}
		for(var i=0, leni=tables.length; i<leni; i++){
			var temp = tables[i];
			var geomType = temp[0];
			if(geomType.name == this.featureTypes){
				for(j=0, lenj=temp.length; j<lenj; j++){
					elements.push(temp[j]);
				}
			}
		}
		this.elements = elements;
		return this.elements;
	},
	
	/**
	 * Method: getPOIFormFields
	 * @param {void}
	 * @return {void}
	 * This method gets all the field to place in the Edit POI form
	 */
	getPOIFormFields : function(){
		var self = this;
		var inputOk = false,
		    selectOk = false,
		    textareaOk = false,
		    fieldID = "",
		    tblAttributes = [];
		
		var valSelected = this.selectedTableOpt.toUpperCase();
		$.each(this.geotables[0], function(obj, value){
			var dispName = value[0].displayName.toUpperCase();
			if(dispName == valSelected){
				tblAttributes.push(value);
			}
		});
		
		//Gets all the option from Language file.
		this.getAllSelectFields();
				
		var formFields = this.getObjWithFieldType();
		this.formFields = formFields;
		
		var inputOk = false,
		    selectOk = false,
		    textareaOk = false;
		
		for(var i=1, leni=this.formFields.length; i<leni; i++){
			this.tempObjAttrFields =  this.formFields[i];
			
			if(this.tempObjAttrFields.formStatus === true){
				
				if(this.tempObjAttrFields.fieldType == "input"){
					 inputOk = true;
					 selectOk = false;
					 textareaOk = false;
				}
				
				if(this.tempObjAttrFields.fieldType == "select"){
					inputOk = false;
					selectOk = true;
					textareaOk = false;
				}
				
				if(this.tempObjAttrFields.fieldType == "textarea"){
					inputOk = false;
					selectOk = false;
					textareaOk = true;
				}
				
//				if(this.tempObjAttrFields.attrName != "objekttyp"){
//					if(this.tempObjAttrFields.attrName != "the_geom"){
						if(this.tempObjAttrFields.formStatus === true){
							this.arrFieldID.push(this.tempObjAttrFields.fieldType+"-epoi-"+this.tempObjAttrFields.attrName);
						}
//					}
//				}
				
				fieldID = this.tempObjAttrFields.fieldType+"-epoi-"+this.tempObjAttrFields.attrName;
				
				if(this.tempObjAttrFields.fieldType !== undefined){
					if(this.tempObjAttrFields.fieldType != "textarea"){
						//The addFieldlabel is used to create all the labels fields on the FORM 
						//besides the Catergory below.
						var addFieldlabel = $("<p /><label for='"+this.tempObjAttrFields.fieldType+"epoi-"+this.tempObjAttrFields.attrName+"'>"+this.tempObjAttrFields.formDispName+"</label>");
//						this.poiFieldSet.append(addFieldlabel);
						var tr = $("<tr></tr>");
						this.tr = tr;
						var lc = $("<td></td>");
						this.tr.append(lc);
						lc.append(addFieldlabel);
						
					}else{
						//The addFieldlabel is used to create all the labels fields on the FORM 
						//besides the Catergory below.
						var addFieldlabel = $("<p /><label for='"+this.tempObjAttrFields.fieldType+"epoi-"+this.tempObjAttrFields.attrName+"'>"+this.tempObjAttrFields.formDispName+"</label><p />");
//						this.poiFieldSet.append(addFieldlabel);
						var tr = $("<tr></tr>");
						this.tr = tr;
						var lc = $("<td></td>");
						this.tr.append(lc);
						lc.append(addFieldlabel);
					}			
				}
					var  titleDispName = this.formFields[0].displayName // this.tempObjAttrFields.formDispName; 
//					if(titleDispName && this.tempObjAttrFields.attrName == "objekttyp" ){  //Notice the blank space after : colon
//						inputOk = false;
//						var tmp = $("select[id='poi-category']").val();
//						var addseleCat = $("<label for='"+this.tempObjAttrFields.fieldType+"epoi-"+this.tempObjAttrFields.attrName+"'><b>"+tmp+"</b></label>"); //this.optionCategory[0]
//						this.poiFieldSet.append(addseleCat);
//					}
						
					if(inputOk === true){
						var isRequired = this.tempObjAttrFields.validation;
						var arrValidate = isRequired.split("validate[");
						var arrRequired = arrValidate[1].split(",");
						var requiredString = arrRequired[0];
						var requiredFieldArr = requiredString.split("]"); 
						var requiredField = requiredFieldArr[0]; 
						
						var validate = "";
						
						if(requiredField == "required"){
							
							var validate = this.tempObjAttrFields.validation; //"validate[required] text-input required";
							this.requiredFields.push(fieldID);
							if(this.tempObjAttrFields.dataType == "date"){
								validate = this.tempObjAttrFields.validation + " text-input datepicker" ;
							}
							this
						} 
						else
							{
								validate = "";
							}
						
						var addFieldInput = $("<input type='text' name='"+fieldID+"' id='"+fieldID+"' size='"+this.tempObjAttrFields.fieldSize+"' class='"+validate+" text ui-widget-content ui-corner-all'>");
						
						if(self.controltype == "editattribute"){
							if(self.editLayer.selectedFeatures.length > 0){
								self.tempattr = self.editLayer.selectedFeatures[0].attributes;
								$.each(self.tempattr, function(objName, value){
									var tempValue = value;
									var tempObjName = objName;
									if(tempObjName == self.tempObjAttrFields.attrName){
										if(tempValue){  // == self.tempObjAttrFields.defaultValue){
										
											var insertAttrVal = tempValue; 
											addFieldInput.val(insertAttrVal);
											
//											if(self.tempObjAttrFields.defaultValue === null ){
											
//											tempValue = "";
										}
										else{
											
											tempValue = "";
											
//											var insertAttrVal = tempValue; 
//											addFieldInput.val(insertAttrVal);
										}
									}
								});
							}
						}
						if(self.lastAddedFeature){
							var flen = self.lastAddedFeature.geometry.getLength();
							if(this.tempObjAttrFields.attrName == "llength"){
									addFieldInput.val(flen);
								}
						}

//						this.poiFieldSet.append(addFieldInput);
						var fc = $("<td></td>");
						this.tr.append(fc);
						fc.append(addFieldInput);
						this.tblTag.append(this.tr);
						
						if(this.tempObjAttrFields.dataType == "date"){
							this.dates.push(fieldID);
							
							this.createDatePick(this.dates, this.tempObjAttrFields);
							
							if(self.controltype == "editattribute"){
								if(self.editLayer.selectedFeatures.length > 0){
									var tempattr = self.editLayer.selectedFeatures[0].attributes;
									$.each(tempattr, function(objName, value){
										var tempValue = value;
										var tempObjName = objName;
										if(tempObjName == self.tempObjAttrFields.attrName){
											var prevValue = tempValue;
											var arrValues = []; 
											if(prevValue == self.tempObjAttrFields.defaultValue){
												arrValues[""];
											}
											else{
												arrValues = prevValue.split("T");
											}
											var insertAttrVal = arrValues[0];
											addFieldInput.val(insertAttrVal);
										}
									});
								}
							}
							
						}
					}
					
					if(selectOk === true){
						var tempOptions = [];
						var optsLangfile = [];
						this.fieldsOption;
						var changeValBool = null;
						this.changeValBool = changeValBool;
						this.originalID  = null;
						
						var arrfieldID = fieldID.split("-");
						
						for(var n=0,lenn=this.fieldsOption.length; n<lenn; n++){
							tempOptions = this.fieldsOption[n];
							for(var m=1,lenm=tempOptions.length; m<lenm; m++){
								if(arrfieldID[arrfieldID.length-1] == tempOptions[0]){
									optsLangfile.push(tempOptions[m]);
								}
							}
							this.changeValBool = tempOptions[0];
						}
						
						$.each(this.selectOptions[0],function(index, value){
							var isItObj = $.isPlainObject(value[0]);
							if(isItObj){
								
								self.changeValBool = index;
								if(arrfieldID[arrfieldID.length-1] == self.changeValBool){
									self.originalID = fieldID;
								}
							}
									
						});

						var addFieldSelect = $("<select id="+fieldID+" class='text ui-widget-content ui-corner-all'>"+optsLangfile+"</select>");
						
						if(self.controltype == "editattribute"){
							if(self.editLayer.selectedFeatures.length > 0){
								var tempattr = self.editLayer.selectedFeatures[0].attributes;
								$.each(tempattr, function(objName, value){
									var tempValue = value;
									var tempObjName = objName;
									if(tempObjName == self.tempObjAttrFields.attrName){
										var insertAttrVal = tempValue;
										
										
										var retObj = $(self.selectOptions[0]);
										var yesno = $(retObj.attr(tempObjName)); //(tempVal.attrName));
											var isItObj = $.isPlainObject(yesno[0]);
											if(isItObj){
												for(var i=0,leni=yesno.length; i<leni; i++){
													var dispValue = $(yesno[i]).attr("value");
													dispValue = ""+dispValue+"";
													if(dispValue == insertAttrVal){
														insertAttrVal = yesno[i].displayValue;
													}
												}
											}
										
										
										addFieldSelect.val(insertAttrVal);
									}
								});
							}
						}
						
//						this.poiFieldSet.append(addFieldSelect);
						var fc = $("<td></td>");
						this.tr.append(fc);
						fc.append(addFieldSelect);
						this.tblTag.append(this.tr);
						
						if(arrfieldID[arrfieldID.length-1] == self.changeValBool){
							$("select[id='"+fieldID+"']").change(function(){
								var objValue = $("select[id='"+self.originalID+"']").val();
								
							});
						}
						
					}
					
					if(textareaOk === true){
						var addFieldTextArea = $("<textarea id='"+fieldID+"' rows='"+this.tempObjAttrFields.rows+"' cols='"+this.tempObjAttrFields.cols+"' class='text ui-widget-content ui-corner-all'></textarea>");
						if(self.controltype == "editattribute"){
							if(self.editLayer.selectedFeatures.length > 0){
								var tempattr = self.editLayer.selectedFeatures[0].attributes;
								$.each(tempattr, function(objName, value){
									var tempValue = value;
									var tempObjName = objName;
									if(tempObjName == self.tempObjAttrFields.attrName){
										var insertAttrVal = tempValue; 
										addFieldTextArea.val(insertAttrVal);
									}
								});
							}
						}
//						this.poiFieldSet.append(addFieldTextArea);
						var fc = $("<td></td>");
						this.tr.append(fc);
						fc.append(addFieldTextArea);
						this.tblTag.append(this.tr);
					}
			}
		}
		
		this.addSaveCancelBtns();
		
	},
	
	addTitle : function(elem){
		var title = $(elem).attr("displayName"); 
		var formTitle = $("<div id='form-title'><label for='label-for-title'>"+title+"</label></div>");
		$(".poi-dialogDiv").append(formTitle);
//		$(formTitle).css()
		
		
	},
	
	/**
	 * Method: validateFields 
	 * @param {void}
	 * @return {void}
	 * This method add the save and cancel buttons to the edit POI form.
	 */
	validateFields : function(){
		var validate = $("#poiDialog-form").validationEngine(); //Initialize and Attach the Validation Engine to the form
	},
	
	checkEmptyField : function(){
		
		for(var i=0,len=this.requiredFields.length; i<len; i++){
			var tempfields = this.requiredFields;
			var field = $("#"+tempfields[i]+"");
			var t = $(field.selector).validationEngine('validate');

			if(t === true){
				$(field).focus();
				return false;
			}
		}
		return true;
	},

	/**
	 * Method: addSaveCancelBtns 
	 * @param {void}
	 * @return {void}
	 * This method add the save and cancel buttons to the edit POI form.
	 */
	addSaveCancelBtns : function(){
		var self = this; // it is used for button to work with the method click	
		var btnspanel = $("<div id='poi-btnspanel' align='right' />");
		var cancelbtn = $("<p /><button id='poi-cancelbtn'><b>"+this.lang.labelCancelbtn+"</b></button>"),
			submitbtn = $("<button id='poi-submitbtn'><b>"+this.lang.optionButtons+"</b></button>");
			btnspanel.append(cancelbtn).append(submitbtn);
			self.dialogDiv.append(btnspanel);
		
		
		submitbtn.click(function(e){
			
			var result = self.checkEmptyField();
			if(result === true){
				
				var success = 0;
				if(self.saveStrategy){
							var locateSuccess = $(self.saveStrategy.events.listeners).attr("success");
							if(locateSuccess !== undefined){
								success = locateSuccess.length;//self.saveStrategy.events.listeners.success.length;
							}
				}
				
				if(success > 0){
					self.saveStrategy.events.unregister("success", self, self.onSaveSuccess);
				}
				self.saveStrategy.events.register("success", self, self.onSaveSuccess);
				self.retriveAttributes();   //get all attributes to be stored in DB
				self.saveEdits();			//Save feature
				self.dialogDiv.dialog("close");
				self.destroyDialogDiv();
				
				
				if(self.lastAddedFeature){
					self.lastAddedFeature.destroy();
				}
				self.deactivateAllDrawCtrl();
				self.btnStatus = "off";
				self.createDrawButtons();
				self.controls.select.deactivate();
//				self.deactivateSelectControl();
				self.requiredFields = [];
				self.openCloseDialog(false);
				$("#poi-form").validationEngine('hideAll');
				
			}
			else{
				return false;
			}

		});
		
		cancelbtn.click(function(){
			self.destroyDialogDiv();
			if(self.editLayer.selectedFeatures.length > 0){
				self.controls.select.unselectAll();
				self.controls.select.deactivate();
			}
			if(self.lastAddedFeature){
				self.lastAddedFeature.destroy();
				self.lastAddedFeature = null;
			}
			self.deactivateAllDrawCtrl();
			self.btnStatus = "off";
			self.createDrawButtons();
			self.requiredFields = [];
			self.openCloseDialog(false);
			$("#poi-form").validationEngine('hideAll');
		});
		
//		$("button[id='poi-submitbtn']").prop("disabled", true);
	}, 
	
	/**
	 * Method: createPOIDialog
	 * @param {void}
	 * @returns {void}
	 * Create the Dialog containing the form and buttons together
	 * with a submit button and a cancel button.
	 * It is used to edit the Attributes.
	 */
	createPOIDialog : function() {
		var self = this;
		var dialogDiv = $("<div class='poi-dialogDiv'></div>");
		this.dialogDiv = dialogDiv;
		this.dialogDiv.css({
			"background":  "#b5c6fd"	//"url('img/bgsmap.png')"
		});
		
		$("body").append(dialogDiv);
		
		var elem = this.getObjWithFieldType();
		
		this.addTitle(elem);
		
		
		var poiForm = $("<form id='poiDialog-form'></form>");
		dialogDiv.append(poiForm);
		
		var poiFieldSet = $("<fieldset></fieldset>");
		poiForm.append(poiFieldSet);
		
		var tblTag = $("<table id='fields'></table>");
		poiFieldSet.append(tblTag);
		
		sMap.util.createDialog(dialogDiv, {
			modal : true,
			titleText: this.lang.labelText,
			draggable : true,
			width : 491,
			height : "auto", 
			position : "center",
			closeOnEscape : false,
			onOpen: function(e) {
				// Remove the close button
//				$(e.target).parent().find(".ui-dialog-titlebar-close").hide();
				$(e.target).parent().find(".ui-dialog-titlebar-close").bind("click",function(e){
					self.deactivate();
				});
			}
		});
		
		dialogDiv.dialog({ resizable: false });
		
		this.tblTag = tblTag;
		this.poiFieldSet = poiFieldSet;
		this.getPOIFormFields();		
		$(this.tblTag).find("td").css({'padding':'5px'});
		
		$(".poi-dialogDiv").find("div[id='form-title']").css({
			'padding-top': '1.5em',
			'padding-bottom': '1.5em'
		});
		
		dialogDiv.dialog("open");
		this.validateFields(); 		//This initialize and attach validation to the form
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
			this.mousemoveParent.off("mousemove"); // The .unbind was changed to .off
			img.empty().remove();
		}
	},
	
	/**
	 * Method: onControlActivate
	 * @param e
	 * @return void
	 */
	onControlActivate: function(e) {  // This will deactivate Control being in use
		var self = this;
		if (self.select){  
			if(self.editLayer.selectedFeatures.length > 0){
				var feature = self.editLayer.selectedFeatures[0];
					self.select.unselect(feature);
			}
			self.deactivateSelectControl();
		}
		if (self.modifyFeatureCtrl) { 
			if(self.editLayer.selectedFeatures.length > 0){
				var feature = self.editLayer.selectedFeatures[0];
				
				if(self.modifyFeatureCtrl.handlers){
					self.modifyFeatureCtrl.unselectFeature(feature);
					if(self.editLayer.selectedFeatures.length > 0){
						
					}
				}
			}
			self.deactivateModifyControl();
		}
	},
	
	
	/**
	 * Method: onFeatureModified
	 * @param {void}
	 * @return {void}
	 * This method is executed when feature has being modified
	 */
	onFeatureModified: function(){
		this.openCloseDialog(false);
		this.saveEdits();
		this.deactivateAllBtn();
		this.deactivateAllDrawCtrl();
		this.geombtnIsActive = false;
		this.editLayer.events.unregister("featureunselected", this, this.onFeatureModified);
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
			if(tmpvalue !== prevBtn ){
				$(".poi-edit-btnpanel input[id='"+value.id+"']").attr('checked', false);
				$(".poi-edit-btnpanel input[id='"+value.id+"']").next().removeClass("ui-state-active");
			}
		});
	},
	
	/**
	 * Method: deactivateAllBtn
	 * @parm void
	 * @return void
	 * This unckeck the checkbox for the buttons. 
	 */
	deactivateAllBtn : function(){
		$(".poi-edit-btnpanel input[type='checkbox']").each(function(obj, value){
			if(value.checked === true){
				$(".poi-edit-btnpanel input[id='"+value.id+"']").attr('checked', false);
				$(".poi-edit-btnpanel input[id='"+value.id+"']").next().removeClass("ui-state-active");
			}
		});
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
					
//							alert("The Feature will be Deleted!");
							self.editLayer.selectedFeatures[0].attributes.removed = "true";
							self.editLayer.selectedFeatures[0].renderIntent = "delete";
							self.editLayer.selectedFeatures[0].state =  OpenLayers.State.UPDATE;
							self.saveEdits();
							self.onControlActivate(e);
							self.iconEraser(false);
							self.delbtnIsActive = false;
				}
				if(self.attrbtnIsActive === true){
					if(self.controltype == "editattribute"){
//							alert("The Feature will be UPDATE!");
							self.editLayer.selectedFeatures[0].state =  OpenLayers.State.UPDATE;
					}
				}
				if(self.geombtnIsActive === true){
					if(self.controltype == "editgeometry"){
						confirmationDiv.dialog("close");
					}
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
				if(self.controltype == "deleteobject"){
					self.openCloseDialog(false);
				}else{
					self.openCloseDialog(true);
				}
			});
			
			btnNo.click(function(e){
				self.deactivateAllDrawCtrl();
				self.deactivateAllBtn();
				self.iconEraser(false);
				self.delbtnIsActive = false;
				confirmationDiv.dialog("close");
				self.openCloseDialog(false);
				self.editLayer.refresh();
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
		
		if(this.delbtnIsActive === true){
			this.confirmationDiv.dialog("open");
		}
		else{
			$(btnOK).trigger('click');	
		}
	},
	
	/**
	 * Method: openTextDialog
	 * Create a dialog alowing the user add a description for the newly
	 * added feature. This function is listening to the event "addfeature".
	 * @param e {Object}
	 * @returns {void}
	 */
	openTextDialog : function(e) {
		this.openCloseDialog(true);
		var feature = e.feature;
		
		var geomType = sMap.util.getGeomType(feature.geometry).toUpperCase();

		this.lastAddedFeature = feature;
		
		if (geomType == "LINE") {			
			// LINES
			this.destroyDialogDiv();
			this.createPOIDialog();
			this.dialogDiv.dialog("open");
			this.controls.line.deactivate();
		}else		
		if (geomType == "POINT") {			
			// POINTS
			this.destroyDialogDiv();
			this.createPOIDialog();
			this.dialogDiv.dialog("open");
			this.controls.point.deactivate();
		}
		
		else if (geomType == "POLYGON") {			
			// POLYGONS
			this.destroyDialogDiv();
			this.createPOIDialog();
			this.dialogDiv.dialog("open");
			this.controls.polygon.deactivate();
		}
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
		var tempIDs = [];
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
		
//		var fromdate = $("input[id='datepickerfrom']").val(),
//		    untildate = $("input[id='datepickeruntil']").val(),
		
		var attrFromTbl = [];
		
		$.each(self.geoTbls, function(obj, vala){
			var tempObj = obj;
			var tempVal = vala;
			if(tempObj == self.featureTypes){
				attrFromTbl.push(tempVal);
			}
		});
		
		$.each(attrFromTbl[0], function(obj, valb){
			var tempObj = obj;
			var tempVal = valb;
			self.tempVal = tempVal;
			if(tempVal.attrName){
				if(tempVal.formStatus === true){
					if(tempVal.fieldType == "select"){
						var tempID = tempVal.fieldType+"-epoi-"+tempVal.attrName;
						var fieldValue = $("select[id="+tempID+"]").val();
						if(!fieldValue){
							tempIDs.push(tempID);
						}
						
						var retObj = $(self.selectOptions[0]);
						var yesno = $(retObj.attr(tempVal.attrName));
							var isItObj = $.isPlainObject(yesno[0]);
							if(isItObj){
								for(var i=0,leni=yesno.length; i<leni; i++){
									var dispName = $(yesno[i]).attr("displayValue");
									if(dispName == fieldValue){
										fieldValue = yesno[i].value;
										var obj = jQuery.parseJSON('{"'+tempVal.attrName+'":"'+fieldValue+'"}');
										var object = $.extend(feature.attributes, obj);										
									}
								}

							}
							else{
								var obj = jQuery.parseJSON('{"'+tempVal.attrName+'":"'+fieldValue+'"}');
								var object = $.extend(feature.attributes, obj);
							}
						
					}
					if(tempVal.fieldType == "input"){
						var intDpr = [];
						var tempID = tempVal.fieldType+"-epoi-"+tempVal.attrName;
						var fieldValue = $("input[id="+tempID+"]").val();
						if(!fieldValue){
							tempIDs.push(tempID);
							if(fieldValue == "" || tempVal.required === false){
								fieldValue = tempVal.defaultValue;
								var  titleDispName = self.formFields[0].displayName // this.tempObjAttrFields.formDispName; 
//								if(titleDispName && tempVal.attrName == "objekttyp" ){ 
//									fieldValue = titleDispName;
//								}
							} 
						}
						if(tempVal.dataType == "date"){
							fieldValue = fieldValue+"T00:00:00+00:00";
						}
						
						// Delete object if NULL
//						for(var i=0,leni=intDpr.length; i<leni; i++){
//							$(self.formFields).remove(intDpr[i]]);
//						}
						
//						if(fieldValue != null){
							var obj = jQuery.parseJSON('{"'+tempVal.attrName+'":"'+fieldValue+'"}');
							var object = $.extend(feature.attributes, obj);
//						}
						
					}
					if(tempVal.fieldType == "textarea"){
						var tempID = tempVal.fieldType+"-epoi-"+tempVal.attrName;
						var fieldValue = $("textarea[id="+tempID+"]").val();
						if(!fieldValue){
							tempIDs.push(tempID);
						}
						var obj = jQuery.parseJSON('{"'+tempVal.attrName+'":"'+fieldValue+'"}');
						var object = $.extend(feature.attributes, obj);
					}
				}
			}
				
		});		
	},
	
	/**
	 * Method: createDatePick
	 * @returns {void}
	 * When deactivate and re-activate datepicker does not display 
	 * the calendar on the second time around. It can be solved by 
	 * destroy and empty the dialogDiv. Datapicker must be called right 
	 * below and after the its input field line. 
	 */
	createDatePick : function(dates, fields){
		var self = this;
		
		$("#"+dates[0]+"").datepicker({
			minDate: null,
			showWeek: true,
			firstDay: 1,
			showOn: "button",
			buttonImage: this.btnImageURL,
			buttonImageOnly: true,
			dateFormat: 'yy-mm-dd',
			showAnim: 'fold',
			showButtonPanel: true,
			onClose: function(datetext, inst) {
				var untildate = $("#"+dates[1]+"");
				var datecomp = untildate.val();
				
				$("#"+dates[0]+"").validationEngine('validate');
				$("#"+dates[0]+"").focus();
				
			}
		});

		
		$("#"+dates[1]+"").datepicker({
			minDate: null,
			showWeek: true,
			firstDay: 1,
			showOn: "button",
			buttonImage: this.btnImageURL,
			buttonImageOnly: true,
			dateFormat: 'yy-mm-dd',
			showAnim: 'fold',
			showButtonPanel: true,
			onClose: function(datetext, inst) {
				var fromdate = $("#"+dates[0]+"");
				var datecomp = fromdate.val();
				
				$("#"+dates[1]+"").validationEngine('validate');
				
			}
		});
		
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.WFST.POIEditing"
	
});