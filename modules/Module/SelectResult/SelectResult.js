/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.SelectResult = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 * 
	 * "select": Repopulates the grid after a new selection from the select module.
	 * "unselect": Repopulates the grid after a new selection from the select module.
	 * "layerhidden" : Repopulates the grid after a layer i s hidden. Not perfect but select modules does the same.
	 * "createreport": Opens a link to a report with the IDs of the selected features.
	 *	 - features {Array(OpenLayers.Feature.Vector)} the selected features
	 */
	EVENT_LISTENERS : ["select","unselect","layerhidden","createreport"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 * 
	 * "select": Triggered when a row in the grid is selected.
	 * 		- features {Array(OpenLayers.Feature.Vector)} the feature associated with the clicked row
	 * 		- add {Boolean} true
	 * "unselect": Triggered when a row in the grid is unselected.
	 * 		- features {Array(OpenLayers.Feature.Vector)} the feature associated with the clicked row
	 * 		- doNotDestroy : true
	 * "selected": Triggered when a row in the grid is doubleclicked. This opens the popup.
	 * 		- features {Array(OpenLayers.Feature.Vector)} the feature associated with the clicked row
	 * 		- selectedFeatures {Array(OpenLayers.Feature.Vector)} the feature associated with the clicked row
	 * "createreport": Triggered by button.
	 * 		- features {Array(OpenLayers.Feature.Vector)} the selected features
	 */
	EVENT_TRIGGERS : ["select","unselect","selected","createreport"],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.SelectResult.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.SelectResult.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
		this.cols=[];
		for (var k = 0;k< this.colModel.length; k++){
			this.cols[k]= this.colModel[k].name;
		}
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		if (!this.dialogDiv){
			this.dialogDiv = this.makeDialogContent();
			this.dialogDiv = this.makeDialog(this.dialogDiv);
			this.createGrid();
			
		}
		if (!(typeof selectLayer == "undefined")){
			this.populateGrid(selectLayer.features);
		}
		this.dialogDiv.dialog("open");
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		if (this.dialogDiv && this.dialogDiv.dialog("isOpen") === true) {
			return this.dialogDiv.dialog("close");
		}
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
	drawContent : function() {
		var eventChooser = this.addToToolsMenu ? "addtomenu" : "addtoolbutton";

		if (this.addToToolsMenu){
			sMap.events.triggerEvent("addtomenu", this, {
				index : this.toolbarIndex,
				iconCSS : "ui-icon-calculator",
				menuId : this.addToToolsMenu,
				label : this.lang.buttonText,
				tagID : "button-selectresult"
			});
		}
		else
		{
			sMap.events.triggerEvent(eventChooser, this, {
				index : this.toolbarIndex,
				label : eventChooser=="addtomenu" ? this.lang.buttonText : null,
				hoverText : this.lang.buttonText,
				iconCSS : "ui-icon-calculator", 
				tagID : "button-selectresult"
			});
		}
	}, 
	/**
	 * Listener for the select event. Populates the grid.
	 * @param e
	 */
	select : function(e){
		// Do not listen to selected events originating in modules specified in this._noListenMods
		if (e.caller.MODULE_NAME && $.inArray(e.caller.MODULE_NAME, this._noListenMods) === -1){ // Caller is Select Module and not the resulttable itself
			if (selectLayer.features.length > 1 && this.active!==true){
				this.activate();
			} else{
				this.populateGrid(selectLayer.features);
			}
		}
	},
	/**
	 * Listener for the unselect event. Populates the grid.
	 * @param e
	 */
	unselect : function(e){
		if (e.caller.CLASS_NAME== "OpenLayers.Popup.FramedCloud" || e.caller.CLASS_NAME=="sMap.Module.SelectTool"){ // When unselecting from the popup
				this.populateGrid(selectLayer.features);
		}
	},
	/**
	 * Listener for the layerhidden event. Populates the grid.
	 * @param e
	 */
	layerhidden : function(e){
		this.populateGrid(selectLayer.features);
	},
	/**
	 * Creates and configures the grid. jgGrid library is used. http://www.trirand.com
	 */
	createGrid : function (){
		var self = this;

		$("#resulttable").jqGrid({
			datatype: "local",
			height: this.gridHeight,
			autowidth : true,
			colNames: this.lang.colNames,
			colModel: this.colModel,
			rowNum : this.rowNum,
			grouping : true,
			groupingView : { 
			     groupField : ['layername'],
			     groupText : ['<b>{0} - {1} '+this.lang.items+'</b>'],
			     groupColumnShow : [false]
			     },
			multiselect:true,
			deselectAfterSort : false, //No effect! Bug in library? Setting sortable : false in colModel.
			onSelectRow: function(rowid,status){
				if (status) {
					sMap.events.triggerEvent("select", this, {
						features : [self.fDict[rowid]],
						add : true // Add to current selection.
					});
				}
				else{
					sMap.events.triggerEvent("unselect", this, {
						features : [self.fDict[rowid]],
						doNotDestroy : true // If destroyed it cannot be selected again.
					});
				}
			},
			onSelectAll : function(rowids,status){
				if (status){
					sMap.events.triggerEvent("unselect", this, {
						doNotDestroy : true // If destroyed it cannot be selected again.
					});
					for (var i=0;i<rowids.length;i++){
						sMap.events.triggerEvent("select", this, {
							features : [self.fDict[rowids[i]]],
							add : true // Add to current selection.
						});
					}
					//self.zoomFeatures(); //unwanted behaviour //K-M
				}
				else {
					sMap.events.triggerEvent("unselect", this, {
						doNotDestroy : true // If destroyed it cannot be selected again.
					});
				}
			},
			ondblClickRow: function(rowid){
				var f = self.fDict[rowid];
				sMap.map.zoomToExtent(f.geometry.getBounds());
				if (self.selectOnDblClick){
					sMap.events.triggerEvent("selected", this, {
						features : [self.fDict[rowid]],
						selectedFeatures : [self.fDict[rowid]]
					});
				}
			},
			onRightClickRow: function(rowid){
			}
		});
	},
	/**
	 * Populates the grid after a new selection
	 * @param f {Array(OpenLayers.Feature.Vector)} the selected features
	 */
	populateGrid : function(f){
		var grid = $("#resulttable"),
			cols = this.cols,
			report = false;
		grid.clearGridData();
		this.fDict = {};
		for (var i = 0;i<f.length; i++){
			var t = sMap.cmd.getLayerConfig(f[i].layerName) || {};
			var selAttrs = t.selectAttributes ? t.selectAttributes : [];
			if (t.report){
				report = true;
			}
			var datarow = {};
			for (var l = 0;l< cols.length; l++){
				if (cols[l]=="layername"){
					datarow[cols[l]] = t.displayName;
				}else{
					if (selAttrs[l-1]){
						datarow[cols[l]] = sMap.util.extractAttributes(f[i].attributes, selAttrs[l-1]);
					}
				}
			}
			grid.jqGrid('addRowData',i+1,datarow);	
			this.fDict[i+1] = f[i];
		}
		grid.jqGrid('groupingGroupBy','layername');			//Group by layername
		for (var j = 0;j<f.length; j++){					//Select all rows
			grid.jqGrid('setSelection',(j+1),false);
		}
		var reportbutton = $("#SelectResultReportButton");	//hide reportbutton if no feature with report
		if (report){
			reportbutton.css("display","inline-block");
			if(sMap.db.browser.msie && (parseInt(sMap.db.browser.version) < 8)){
				reportbutton.css("display","inline");		// inline-block doesn't exist in IE < 8
			}
		}else{
			reportbutton.hide();
		}
		var zoombutton = $("#SelectResultZoomButton");		//hide zoombutton if no feature
		if (f.length>0){
			zoombutton.css("display","inline-block");		// .show() didn´t work in IE. It became display:block instead
			if(sMap.db.browser.msie && (parseInt(sMap.db.browser.version) < 8)){
				zoombutton.css("display","inline");		// inline-block doesn't exist in IE < 8
			}
		}else{
			zoombutton.hide();
		}
		this.resizeGrid();									//Resize the grid to adjust to dialogDiv
	},
	/**
	 * Resizes the grid after resizing of the dialog
	 */
	resizeGrid: function(){
		var grid = $("#resulttable"),
			dialogWidth = $("#SelectResultDialogDiv").innerWidth();
		dialogWidth = dialogWidth > 100 ? dialogWidth : this.width;
		grid.jqGrid('setGridWidth',dialogWidth-30,true);
	},
	/**
	 * Make a dialogDiv with a result table and a report button
	 */
	makeDialogContent : function() {
		var dialogDiv = $("<div id='SelectResultDialogDiv' class='selectresultDiv' />");
		var html = "<table id='resulttable'></table>";
		dialogDiv.html(html);
		var zoombutton = $("<div id='SelectResultZoomButton'>"+this.lang.zoomButtonText+"</div>");
		zoombutton.button();
		dialogDiv.append(zoombutton);
		zoombutton.click(this.zoomFeatures);
		zoombutton.hide();
		zoombutton.width(150);
		var reportbutton = $("<div id='SelectResultReportButton'>"+this.lang.reportButtonText+"</div>");
		reportbutton.button();
		reportbutton.width(150);
		dialogDiv.append(reportbutton);
		reportbutton.click(
				function (){
					sMap.events.triggerEvent("createreport", this, {
						features : selectLayer.features
					});
		});
		reportbutton.hide();
		return dialogDiv;
	},
	/**
	 * listener for the createreport event. This could be done in a separate module instead.
	 * @param e
	 * 		- features {Array(OpenLayers.Feature.Vector)} the selected features
	 */
	createreport : function (e){
		
		
		var f = e.features,
			linkURL = "",
			IDstring = "";
		for (var i = 0;i<f.length; i++){
			var layerName = f[i].layerName;
			var t = sMap.cmd.getLayerConfig(layerName) || {};
			var report = t.report ? t.report : null;
			if (report){
				linkURL = t.report.linkURL;
				IDstring += f[i].attributes[t.report.IDattribute] + ",";
			}
		}
		IDstring = IDstring.substring(0, IDstring.length-1);
		if (linkURL){
			window.open(linkURL+IDstring);
		}
		else {
			alert(this.lang.noSelectedFeaturesText);
		}
	},
	/**
	 * Zoom to all features in selectLayer
	 */
	zoomFeatures : function(){
		// zoom to the features
		var f= selectLayer.features;
		var fbounds = new OpenLayers.Bounds(); 
		for (var i=0; i<f.length;i++){ 
			fbounds.extend(f[i].geometry.getBounds()); 
		}
		if (fbounds.left == fbounds.right){
			sMap.map.setCenter(new OpenLayers.LonLat(fbounds.left, fbounds.top), this.pointZoomLevel);
		}else{
			sMap.map.zoomToExtent(fbounds);
		}
	},
	/**
	 * Make the dialog to which all html is added.
	 */
	makeDialog : function(dialogDiv) {
		var self = this;
		dialogDiv.dialog({
			autoOpen : false,
			title : this.lang.headerText,
			position : this.dialogStartPosition,
			width : this.width,
			height : this.height,
			resizable : true,
			close : function() {
				// Deactivate module
				self.deactivate.call(self);
			},
			open : null,
			resizeStop : this.resizeGrid	
		});
		return dialogDiv;
	},
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.SelectResult"
	
});