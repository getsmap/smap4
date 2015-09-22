/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Draw = OpenLayers.Class(sMap.Module, {
	
	/**
	 * Holds the currently selected feature.
	 */
	selectedFeature: null,
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["selected", "unselected","creatingwebparams","afterapplyingwebparams","layervisible"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : ["addtoolbutton","showlink","addlayer","select","unselect"],
	
	toolbarIndex : null,
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Draw.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Draw.prototype.EVENT_TRIGGERS.concat(
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
		if (!this.dialogDiv){
			this.dialogDiv = this.makeDialogContent();
			this.dialogDiv = this.makeDialog(this.dialogDiv);
		}
		this.dialogDiv.dialog("open");
		// Call the activate function of the parent class
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
		
		if (this.panel) {
			this.deactivateButtonsAndControls();
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
		var eventChooser = this.addToToolsMenu ? "addtomenu" : "addtoolbutton";

		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			iconCSS : "btndraw",
			label : this.lang.buttonText,
			tagID : "button-draw",
			menuId : this.addToToolsMenu
		});
	},
	/**
	 * Set the zIndex when showing a new layer
	 */
	layervisible: function(e) {
		if (this.editLayer){
			this.editLayer.setZIndex(this.zIndex);
			if (e.layer.name == this.editLayer.name && e.layer.visibility){
				$("#draw-cbvisible").prop('checked', true);
			}
		}
	},
	/**
	 * Create a color picker.
	 */
	addColorPicker: function(parent) {
		var button = $("<button id='draw-buttoncolorselect'>"+this.lang.btnColor+"</button>"),
			div = $("<div id='draw-divcolorselect' />"),
			colors = this.colors;
		for (var i=0,len=colors.length; i<len; i++) {
			var hex = colors[i],
				c = $("<span />");
			c.css({
				"background-color": hex
			});
			div.append(c);
			c.click(function() {
				// select color
				var color = self.colorToHex($(this).css("background-color"));
				button.css({
					"background": color,
					"color": "#000"
				});
				self.editLayer.styleMap.styles.temporary.defaultStyle.fillColor = color;
				self.editLayer.styleMap.styles.temporary.defaultStyle.strokeColor = color;
				self.editLayer.styleMap.styles.temporary.defaultStyle.fontColor = color;
				if(self.selectedFeature) {
					self.selectedFeature.attributes.color = color;
					sMap.events.triggerEvent("updatelinkentries", this, {});
					self.editLayer.redraw();
				}
			});
		}
		div.height(Math.ceil(colors.length/4)*22); //Adjust the div height to contain all color samples
		var self = this;
		
		button.click(function() {
			$("#draw-divcolorselect").show();
		});
		var defaultColor = this.defaultColor;//editLayer.styleMap.styles.temporary.defaultStyle.fillColor;
		button.css({
			"background-color": defaultColor
		});
		div.hover(function(){$(this).show();},
				function(){$(this).hide();});
		button.mouseleave(function() {
			$("#draw-divcolorselect").hide();
		});
		parent.append(button).append(div);
		div.hide();

		return div;
	},
	/**
	 * Returns the hexadecimal value of rgb color
	 * @param rgb
	 * @returns
	 */
	colorToHex : function (rgb) {
		if (rgb.substr(0, 1) === '#') {
	        return rgb;
	    }
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		return "#" +
		  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
	},
	 /**
	  * Create s graphic size input
	  */
	  addSizeInput : function(parent) {
		var self=this,
			tempStyle = self.editLayer.styleMap.styles.temporary.defaultStyle;
		var input = $("<span id='draw-graphicsize-label'>Storl.</span><input id='draw-graphicsize' type='text' value='"+this.defaultPointRadius+"'></input>");
		input.keyup(function(){
			if(!isNaN(this.value)){
				if (tempStyle.externalGraphic != "") {tempStyle.pointRadius = this.value;}//symbols and texts
				if (tempStyle.strokeOpacity == 0.9) {tempStyle.pointRadius = this.value / sMap.map.getResolution();}// points without external graphic (circle with radius)
				if (tempStyle.strokeOpacity == 0) {tempStyle.fontSize = this.value * 2;}; //Only texts
				tempStyle.strokeWidth = (tempStyle.strokeOpacity == 1) ? this.value : tempStyle.strokeWidth; //Lines and polys this.value, points current value
				if(self.selectedFeature) {
					self.selectedFeature.attributes.size = this.value;
					self.selectedFeature.attributes.sw = (self.selectedFeature.attributes.so == 1) ? this.value : self.selectedFeature.attributes.sw; //lines, polys, symbols
					self.selectedFeature.attributes.fontsize = (self.selectedFeature.attributes.so == 0) ? this.value * 2 : self.selectedFeature.attributes.fontsize; //texts
					sMap.events.triggerEvent("updatelinkentries", this, {});
					self.editLayer.redraw();
				}
			}else{
				alert("Endast siffror!");
			}
		});
		parent.append(input);
		return input;
	  },
	/**
	 * Create a symbol picker.
	 */
	addSymbolPicker: function(parent) {
		var self = this;
		var button = $("<button id='draw-buttonsymbolselect'>"+this.lang.btnSymbol+"</button>"),
			divselected = $("<div id='draw-divsymbolseleced' />"),
			div = $("<div id='draw-divsymbolselect' />"),
			ds = this.defaultSymbol;
		divselected.css({
				"background-image": "url("+ds.url+")",
				"size" : ds.size,
				"width" : ds.size,
				"height" : ds.size
			});
		var selcat = $("<select id='draw-selcat'><option value='standard'>Standard</option><option value='trafik'>Trafik</option></select>");
		selcat.change(function(){
			self.addSymbols(div);
		});
		parent.append(selcat);
		button.button();
		button.find('span.ui-button-text').addClass('smallbutton');
		button.click(function() {
			$("#draw-divsymbolselect").show();
		});
		div.hover(function(){$(this).show();},
				function(){$(this).hide();});
		button.mouseleave(function() {
			$("#draw-divsymbolselect").hide();
		});
		parent.append(button).append(div).append(divselected);
		div.hide();
		button.hide();
		divselected.hide();
		selcat.hide();
		return div;
	},
	addSymbols : function(div){
		var self = this;
		div.empty();
		var cat = $("#draw-selcat").val(),
			divselected = $("#draw-divsymbolseleced"),
			symbols = this.symbols, size = {},height={}, width={}, rowheight=0, rowlength=0, divheight=0, maxrowlength=111;
		for (var sk in symbols){
			if (symbols[sk].cat==cat){
				var src = symbols[sk].url,
					image = $("<img />"),
					compsize = 0;
				height[src] = symbols[sk].height ? symbols[sk].height : (symbols[sk].size ? symbols[sk].size : this.defaultSymbolSize);
				width[src] = symbols[sk].width ? symbols[sk].width : (symbols[sk].size ? symbols[sk].size : this.defaultSymbolSize);
				compsize = width[src]>height[src] ? width[src] : height[src];
				size[src] = symbols[sk].size ? symbols[sk].size : (compsize ? compsize : this.defaultSymbolSize);
				image.prop("src",src);
				image.css({"height":height[src],"width":width[src]});
				div.append(image);
				rowheight = (height[src]+2 > rowheight) ? height[src]+2 : rowheight;
				if((rowlength+width[src]+2)<maxrowlength){
					rowlength += width[src]+2;
				}else{ //new row
					divheight += rowheight;
					rowheight = height[src]+2;
					rowlength = width[src]+2;
				}
				image.click(function(){
					var symbol = $(this).prop("src");
					divselected.css({
						"background-image": "url("+symbol+")",
						"size" : size[symbol],
						"width" : width[symbol],
						"height" : height[symbol]
					});
					$("#draw-graphicsize").val(size[symbol]/2);
					self.setPointTempStyle();
					if(self.selectedFeature) {
						self.selectedFeature.attributes.eg = symbol;
						sMap.events.triggerEvent("updatelinkentries", this, {});
						self.editLayer.redraw();
					}
				});
			}
		}
		div.height(divheight+rowheight);
	},
	/**
	 * Set temporary style when drawing points with external graphic
	 */
	setPointTempStyle : function(){
		this.showSymbolPicker();
		this.hideColorPicker();
		var divselected = $("#draw-divsymbolseleced"),
			backgroundImg = divselected[0].style.backgroundImage,
			symbol= "",
			size = sMap.util.takeAwayPx(divselected[0].style.size),
			tempstyle = this.editLayer.styleMap.styles.temporary.defaultStyle;
		if (backgroundImg.substring(4,5)=='"'){
			symbol = (sMap.util.rightStrip(backgroundImg,2)).substring(5); //FF has extra "" in string like: url("...")
		}else{
			symbol = (sMap.util.rightStrip(backgroundImg,1)).substring(4); //and the others like: url(...)
		}
		var key = null;
		for (var sk in this.symbols){
			if (this.symbols[sk].url == symbol){
				key = sk;
			}
		}
		$("#draw-graphicsize").val(size/2);//this.defaultSymbolSize/2
		if (symbol!=""){
			tempstyle.externalGraphic = symbol;
			tempstyle.pointRadius = $("#draw-graphicsize").val();//size/2;
			tempstyle.fillOpacity = 1;
			tempstyle.strokeOpacity = this.defaultStrokeOpacity;
			tempstyle.label = "";//null;
			tempstyle.graphicYOffset = this.symbols[key].offsety ? this.symbols[key].offsety : null;
			tempstyle.graphicXOffset = this.symbols[key].offsetx ? this.symbols[key].offsetx : null;
			tempstyle.fontSize = this.defaultFontSize;
		}
	},
	/**
	 * Set temporary style when drawing textpoints
	 */
	setTextTempStyle : function(){
		this.hideSymbolPicker();
		this.showColorPicker();
		var tempstyle = this.editLayer.styleMap.styles.temporary.defaultStyle;
		$("#draw-graphicsize").val(this.defaultFontSize/2);
		tempstyle.externalGraphic = this.blankSymbol;
		tempstyle.fillOpacity = 1;
		tempstyle.strokeOpacity = 0;
		tempstyle.label =  "Text";
		tempstyle.labelAlign = "cm";
		tempstyle.fontColor =  tempstyle.strokeColor;
		tempstyle.pointRadius = $("#draw-graphicsize").val();//10;
		tempstyle.fontSize = $("#draw-graphicsize").val() * 2;
	},
	/**
	 * Restore temporary style when drawing lines and polys with no external graphic
	 */
	restoreTempStyle : function(){
		this.hideSymbolPicker();
		this.showColorPicker();
		var tempstyle = this.editLayer.styleMap.styles.temporary.defaultStyle;
		$("#draw-graphicsize").val(this.defaultStrokeWidth);
		tempstyle.externalGraphic = "";
		tempstyle.fillOpacity = this.defaultFillOpacity;
		tempstyle.strokeOpacity = this.defaultStrokeOpacity;
		tempstyle.strokeWidth = $("#draw-graphicsize").val();
		tempstyle.graphicYOffset = null;
		tempstyle.graphicXOffset = null;
		tempstyle.label = "";
		tempstyle.labelAlign = null;
		tempstyle.pointRadius = this.defaultPointRadius;
		tempstyle.graphicName = this.defaultGraphicName;
		tempstyle.fontSize = this.defaultFontSize;
	},
	/**
	 * Set temporary style when drawing points with no external graphic
	 */
	setGraphicTempStyle : function(){
		this.hideSymbolPicker();
		this.showColorPicker();
		var tempstyle = this.editLayer.styleMap.styles.temporary.defaultStyle;
		$("#draw-graphicsize").val(200);
		tempstyle.externalGraphic = "";
		tempstyle.fillOpacity = this.defaultFillOpacity;
		tempstyle.strokeOpacity = 0.9;
		tempstyle.strokeWidth = this.defaultStrokeWidth;
		tempstyle.graphicYOffset = null;
		tempstyle.graphicXOffset = null;
		tempstyle.label = "";
		tempstyle.labelAlign = null;
		tempstyle.pointRadius = $("#draw-graphicsize").val()/ sMap.map.getResolution();
		tempstyle.graphicName = this.defaultGraphicName;
		tempstyle.fontSize = this.defaultFontSize;
	},
	/**
	 * Shows the symbolpicker
	 */
	showSymbolPicker : function(){
		var divselected = $("#draw-divsymbolseleced"),
			btn = $("#draw-buttonsymbolselect"),
			selcat = $("#draw-selcat"),
			symbolselect = $("#draw-divsymbolselect");
		divselected.show();
		btn.show();
		selcat.show();
		this.addSymbols(symbolselect);
	},
	/**
	 * Hides the symbolpicker
	 */
	hideSymbolPicker : function(){
		var divselected = $("#draw-divsymbolseleced"),
			selcat = $("#draw-selcat"),
			btn = $("#draw-buttonsymbolselect");
		divselected.hide();
		btn.hide();
		selcat.hide();
	},
	/**
	 * Shows the colorpicker
	 */
	showColorPicker : function(){
		var btn = $("#draw-buttoncolorselect");
		btn.show();
	},
	/**
	 * Hides the colorpicker
	 */
	hideColorPicker : function(){
		var btn = $("#draw-buttoncolorselect");
		btn.hide();
	},
	/**
	 * Make a dialogDiv and append the panel and the div which
	 * displays the description
	 */
	makeDialogContent : function() {
		var dialogDiv = $("<div id='drawDialogDiv' class='mxDiv' />");	
		var mxEditBtnsDiv = this.makeEditButtons(); // the edit buttons
		this.addColorPicker(mxEditBtnsDiv);
		this.addSymbolPicker(mxEditBtnsDiv);
		this.addSizeInput(mxEditBtnsDiv);
		dialogDiv.append(mxEditBtnsDiv);
		var self = this;
		var cbAddMeasure = $("<span id='draw-lbaddmeasure' title='"+this.lang.addMeasureTitle+"'>"+this.lang.addMeasureLabel+"</span><input id='draw-cbaddmeasure' type='checkbox'/>");
		cbAddMeasure.change(function(){
			if(self.selectedFeature) {
				self.alterMeasureText(self.selectedFeature);
				sMap.events.triggerEvent("updatelinkentries", this, {});
				self.editLayer.redraw();
			}
		});
		dialogDiv.append(cbAddMeasure);
		var cbVisible = $("<span id='draw-lbvisible' title='"+this.lang.lblVisibleTitle+"'>"+this.lang.lblVisible+"</span><input id='draw-cbvisible' type='checkbox' checked/>");
		cbVisible.change(function(){
			if (self.editLayer.visibility){
				sMap.events.triggerEvent("hidelayer", self, {
					layerName : self.editLayer.name
				});
			}else{
				sMap.events.triggerEvent("showlayer", self, {
					layerName : self.editLayer.name
				});
			}
		});
		dialogDiv.append(cbVisible);
		var mxDescDiv = this.makeDescrDiv(); // the describe field
		dialogDiv.append(mxDescDiv);
		var mxButtonDiv = this.makeButtons();
		dialogDiv.append(mxButtonDiv);
		var resultdiv = $('<div name="draw-result" id="draw-result" ></div>');
		dialogDiv.append(resultdiv);
		return dialogDiv;
	},
	
	/**
	 * Make the div with copylink, load and save buttons.
	 * @return {div}
	 */
	makeButtons : function() {
		var self = this;
		var mxButtonDiv = $("<div id='mxButtonDiv' />");
		
		if (this.useLoadSave){
			var loadbutton = $("<button id='draw-load' title='"+this.lang.btnLoadHoverText+"'>"+this.lang.btnLoad+"</button>");
			loadbutton.click(function() {
				self.loadObjects();
			});
			loadbutton.button();
			mxButtonDiv.append(loadbutton);
			var savebutton = $("<button id='draw-save' title='"+this.lang.btnSaveHoverText+"'>"+this.lang.btnSave+"</button>");
			savebutton.click(function() {
				self.confirmSave();
			});
			savebutton.button();
			mxButtonDiv.append(savebutton);
			var confirm = $("<div id='draw-conf-dialog' title='"+this.lang.comfirmDlgTitle+"'>"+this.lang.confirmText+"</div>");
			confirm.dialog({
				autoOpen: false,
				modal: true,
				buttons : {
					"Spara" : function() {
						self.saveObjects();
						$(this).dialog("close");
					},
					"Avbryt" : function() {
						$(this).dialog("close");
					}
				}
			});
			var importbutton = $("<button id='draw-import' title='"+this.lang.btnImportHoverText+"'>"+this.lang.btnImport+"</button>");
			importbutton.click(function() {
				var idialog = $("#draw-import-dialog");
				idialog.dialog("open");
			});
			importbutton.button();
			mxButtonDiv.append(importbutton);
			var importdia = $("<div id='draw-import-dialog' title='"+this.lang.importDlgTitle+"'>"+this.lang.importText+"<iframe id='draw-import-iframe' src="+this.importFilePath+" style=\"width: 250px; border-width: 0px;\"></iframe></div>");
			importdia.dialog({
				autoOpen: false,
				modal: true,
				close : function( event, ui ) {
					$("#draw-import-iframe").prop("src",self.importFilePath);
					},
				buttons : {
					"Importera!" : function() {
						self.importGeoJSON();
						$(this).dialog("close");
					},
					"Avbryt" : function() {
						$(this).dialog("close");
					}
				}
			});
		} else {
			var button = $("<button id='draw-opencopylink'>"+this.lang.btnCopylink+"</button>");
			button.click(function() {
				sMap.events.triggerEvent("showlink", this, {});
			});
			button.button();
			mxButtonDiv.append(button);
		}
		var clearbutton = $("<button id='draw-clear' title='"+this.lang.btnClearHoverText+"'>"+this.lang.btnClear+"</button>");
		clearbutton.click(function() {
			self.confirmClear();
		});
		clearbutton.button();
		mxButtonDiv.append(clearbutton);
		var confirm = $("<div id='draw-clear-dialog' title='"+this.lang.comfirmDlgTitle+"'>"+this.lang.confirmClearText+"</div>");
		confirm.dialog({
			autoOpen: false,
			modal: true,
			buttons : {
				"Rensa" : function() {
					self.editLayer.removeAllFeatures();
					$(this).dialog("close");
				},
				"Avbryt" : function() {
					$(this).dialog("close");
				}
			}
		});
		return mxButtonDiv;
	},
	/**
	* Opens the confirm dialog
	*/
	confirmSave : function(){
		var conf = $("#draw-conf-dialog");
		conf.dialog("open");
	},
	/**
	* Opens the confirm clear dialog
	*/
	confirmClear : function(){
		var conf = $("#draw-clear-dialog");
		conf.dialog("open");
		$('#draw-clear').removeClass('ui-state-focus');
	},
	/**
	 * Make edit buttons. Editing is actually activated from this function.
	 * @return {div}
	 *     Div containing the buttons.
	 */
	makeEditButtons : function() {
		
		var buttons = this.buttons;
		this.initiateMarkerEditing(buttons);
		
		var mxEditBtnsDiv = $("<div id='mxEditBtnsDiv' />");
		var mxEditLbl = $("<div id='mxEditLbl' />");
		
		// Append text and the help link to the "label".
		var infoText = $("<span>"+ this.lang.helpText+"</span>");
		infoText.css({
			"width" : "170px",
			"display" : "inline"		
		});
		mxEditLbl.append(infoText);
		
		mxEditBtnsDiv.append(mxEditLbl);
		mxEditBtnsDiv.append(this.panel);
		
		return mxEditBtnsDiv;
	},
	
	/**
	 * Add the editing control and the editLayer. An event function
	 * will be executed on feature creation, modification and erasing.
	 */
	initiateMarkerEditing : function(buttons) {
		this.addEditLayer();
		if (!this.panel) {
			this.drawEditToolbar(buttons,null);
		}
		this.bindFeatureCompleteEvents();

	},
	/**
	 * Adds the editLayer to the map
	 */
	addEditLayer : function() {
		var editlayerExists = this.map.getLayersByName(this.drawLayerConfig.name).length == 1 ? true : false;
		if (!editlayerExists){
			var s = this.drawLayerConfig.style;
			var context = {
                getSize: function(feature) {
					if (feature.attributes["eg"] || feature.attributes["gn"]=="cross"){ // text and symbols
						return feature.attributes["size"];
					}
					else{ 
						return feature.attributes["size"] / sMap.map.getResolution(); //Points. Lines and polys don't show point radius
					}
                }
            };
			this.editLayer = new OpenLayers.Layer.Vector(this.drawLayerConfig.name, {
				styleMap : new OpenLayers.StyleMap({
						"default": new OpenLayers.Style( s["default"], {context: context}),
						"select": new OpenLayers.Style( s["select"] ),
						"temporary": new OpenLayers.Style( s["temporary"])
				}),
				projection: new OpenLayers.Projection(this.map.projection),
				selectable: true,
				displayInLayerSwitcher: this.drawLayerConfig.displayInLayerSwitcher
			});
			sMap.config.layers.overlays.push(this.drawLayerConfig);
			sMap.events.triggerEvent("addlayer", this, {
				layer : this.editLayer
			});
			this.showHideEditLayer();
		}
	},
	
	/**
	 * Paths for buttons
	 */
	srcIconTextOff: "img/editTools/text_off.png",
	srcIconPointOff: "img/editTools/point_off.png",
	srcIconLineOff: "img/editTools/line_off.png",
	srcIconPolygonOff: "img/editTools/polygon_off.png",
	srcIconBoxOff: "img/editTools/box_off.png",
	srcIconCircleOff: "img/editTools/circle_off.png",
	srcIconModifyOff: "img/editTools/modify_off.png",
	srcIconDeleteOff: "img/editTools/delete_off.png",
	srcIconMoveOff: "img/editTools/move_feature_off.png",
	
	srcIconTextOn: "img/editTools/text_on.png",
	srcIconPointOn: "img/editTools/point_on.png",
	srcIconLineOn: "img/editTools/line_on.png",
	srcIconPolygonOn: "img/editTools/polygon_on.png",
	srcIconBoxOn: "img/editTools/box_on.png",
	srcIconCircleOn: "img/editTools/circle_on.png",
	srcIconModifyOn: "img/editTools/modify_on.png",
	srcIconDeleteOn: "img/editTools/delete_on.png",
	srcIconMoveOn: "img/editTools/move_feature_on.png",
	
	/**
	 * 
	 * @param img
	 * @param state
	 * @returns
	 */
	renderButton: function(img, state) {
		state = state || false;
		
		var oldState = "_off",
			newState = "_on";
		
		var src = img.attr("src");
		if (state !== true) {
			oldState = "_on";
			newState = "_off";
		}
		img.attr("src", src.replace(oldState, newState));
		
	},
	
	/**
	 * Draw the edit buttons
	 */
	drawEditToolbar : function(buttons, options) {
		options = options || {};
		
		var self = this;
		
		this.panel = $("<div id='draw-panel' />");
		
		var buttonText = $("<div class='draw-button' id='draw-btn-text' title='"+this.lang.hoverTextText+"'><img src='"+this.srcIconTextOff+"'></img></div>"),
			buttonPoint = $("<div class='draw-button' id='draw-btn-point' title='"+this.lang.hoverTextPoint+"'><img src='"+this.srcIconPointOff+"'></img></div>"),
			buttonLine = $("<div class='draw-button' id='draw-btn-line' title='"+this.lang.hoverTextLine+"'><img src='"+this.srcIconLineOff+"'></img></div>"),
			buttonPolygon = $("<div class='draw-button' id='draw-btn-polygon' title='"+this.lang.hoverTextPolygon+"'><img src='"+this.srcIconPolygonOff+"'></img></div>"),
			buttonBox = $("<div class='draw-button' id='draw-btn-box' title='"+this.lang.hoverTextBox+"'><img src='"+this.srcIconBoxOff+"'></img></div>"),
			buttonCircle = $("<div class='draw-button' id='draw-btn-circle' title='"+this.lang.hoverTextCircle+"'><img src='"+this.srcIconCircleOff+"'></img></div>"),
			buttonModify = $("<div class='draw-button' id='draw-btn-modify' title='"+this.lang.hoverTextModify+"'><img src='"+this.srcIconModifyOff+"'></img></div>"),
			buttonMove = $("<div class='draw-button' id='draw-btn-move' title='"+this.lang.hoverTextMove+"'><img src='"+this.srcIconMoveOff+"'></img></div>"),
			buttonDelete = $("<div class='draw-button' id='draw-btn-delete' title='"+this.lang.hoverTextDelete+"'><img src='"+this.srcIconDeleteOff+"'></img></div>");

		this.buttons = {
			text: buttonText,
			point: buttonPoint,
			line: buttonLine,
			polygon: buttonPolygon,
			box: buttonBox,
			circle: buttonCircle,
			modify: buttonModify,
			move: buttonMove,
			"delete": buttonDelete
		};
		
		var onButtonClick = function() {
			var type = $(this).attr("id").split("-")[2]; // because id looks like this: "draw-btn-point"
			if (!$(this).data("active")) {
				// Activate
				self.deactivateButtonsAndControls($(this));
				$(this).data("active", true);
				self.renderButton($(this).find("img"), true);
				self.controls[type].activate();
			}
			else {
				// Deactivate
				$(this).data("active", false);
				self.renderButton($(this).find("img"), false);
				self.controls[type].deactivate();
			}
		};
		
		/**
		 * Make controls to fill the panel
		 */
		var drawPolygon = new OpenLayers.Control.DrawFeature(
			this.editLayer, OpenLayers.Handler.Polygon, {
				multi: true
		});
		drawPolygon.events.register("activate", this, function(e) {this.restoreTempStyle();});
		var drawPoint = new OpenLayers.Control.DrawFeature(
			  this.editLayer, OpenLayers.Handler.Point, {
				  multi: false
		});
		drawPoint.events.register("activate", this, function(e) {this.setPointTempStyle();this.map.getControlsByClass("sMap.Module.Select")[0].deactivate();});
		var drawText = new OpenLayers.Control.DrawFeature(
				  this.editLayer, OpenLayers.Handler.Point, {
					  multi: false
			});
		drawText.events.register("activate", this, function(e) {
			this.setTextTempStyle();
			this.map.getControlsByClass("sMap.Module.Select")[0].deactivate();
			});
		var drawLine = new OpenLayers.Control.DrawFeature(
				this.editLayer, OpenLayers.Handler.Path, {
					multi: true
		});
		drawLine.events.register("activate", this, function(e) {this.restoreTempStyle();});
		var drawBox = new OpenLayers.Control.DrawFeature(
			this.editLayer, OpenLayers.Handler.RegularPolygon, {  //RegularPolygon
				multi: true,
				handlerOptions: {
					sides: 4,
					irregular: true
				}
			});
		drawBox.events.register("activate", this, function(e) {this.restoreTempStyle();});
		var drawCircle = new OpenLayers.Control.DrawFeature(
			this.editLayer, OpenLayers.Handler.Point, {
				multi: false
		});
		drawCircle.events.register("activate", this, function(e) {this.setGraphicTempStyle();this.map.getControlsByClass("sMap.Module.Select")[0].deactivate();});
		var move = new OpenLayers.Control.DragFeature(this.editLayer, {
			onComplete : function(f){
				self.alterMeasureText(f);
				self.editLayer.redraw();
				sMap.events.triggerEvent("updatelinkentries", this, {});
			}
		});
		var modify = new OpenLayers.Control.ModifyFeature(this.editLayer, {
			vertexRenderIntent : "select",
			displayClass: "olControlModifyFeature",
			mode: OpenLayers.Control.ModifyFeature.RESHAPE // | OpenLayers.Control.ModifyFeature.RESIZE
		});
		modify.events.register("activate", this, function(e) {this.map.getControlsByClass("sMap.Module.Select")[0].deactivate();});
		modify.events.register("deactivate", this, function(e) {this.map.getControlsByClass("sMap.Module.Select")[0].activate();});
		var del = new OpenLayers.Control.DeleteFeature(this.editLayer, {
		});
		var style = new OpenLayers.Control.Button({
			title: this.lang.hoverTextStyle,
			type : OpenLayers.Control.TYPE_BUTTON,
			trigger: function() {
				if (self.selectedFeature){
					self.styleFeature([self.selectedFeature]);
				}
			},
			displayClass: "olControlSaveFeatures"
		});
		var save = new OpenLayers.Control.Button({
			title: this.lang.hoverTextSave,
			type : OpenLayers.Control.TYPE_BUTTON,
			trigger: function() {
		    	self.saveEdits();
			},
			displayClass: "olControlSaveFeatures"
		});
		this.controls = {
				text : drawText,
				point : drawPoint,
				line : drawLine,
				polygon : drawPolygon,
				box : drawBox,
				circle : drawCircle,
				move : move,
				modify : modify,
				"delete" : del,
				style : style,
				save : save
		};
		var toBeAdded = [];
		for (var type in this.useButtons) {
			if (this.useButtons[type] === true) {
				var ctrl = this.controls[type];
				var button = this.buttons[type];
				toBeAdded.push(ctrl);
				button.click(onButtonClick)
					.mouseenter(function() {
						self.renderButton($(this).find("img"), true);	
					}).mouseleave(function() {
						if ( !$(this).data("active")) {
							self.renderButton($(this).find("img"), false);		
					}
				});
				this.panel.append(button);
			}
		}
		if (toBeAdded.length) {
			this.map.addControls(toBeAdded);
		}
		
		for (var i=0,len=toBeAdded.length; i<len; i++) {
			var c = toBeAdded[i];
			c.events.register("activate", this, function(e) {
				this.unselectFeatures();
			});
		}
	},
	
	/**
	 * This is called upon completion of a feature (after creation, modification or erasing).
	 * Catch the event type through e.type.
	 * @param e
	 * @return
	 */
	bindFeatureCompleteEvents : function() {
		this.editLayer.events.register("beforefeatureadded", this, function(e) {
			var feature = e.feature,
				tempstyle = this.editLayer.styleMap.styles.temporary.defaultStyle;
			if (Object.keys(feature.attributes).length==0){  //only newly added features
				feature.attributes.info = tempstyle.label ? tempstyle.label : "";//"";
				feature.attributes.text = tempstyle.label ? tempstyle.label : "";//"";
				feature.attributes.color = tempstyle.fillColor;
				feature.attributes.fo = tempstyle.fillOpacity;
				feature.attributes.so = tempstyle.strokeOpacity;
				feature.attributes.gn = tempstyle.graphicName;
				feature.attributes.size = $("#draw-graphicsize").val();
				feature.attributes.fontsize = tempstyle.fontSize ? tempstyle.fontSize : this.defaultFontSize;
				feature.attributes.la = "cm";
				feature.attributes.sw = tempstyle.strokeWidth;
				feature.attributes.eg = tempstyle.externalGraphic;
				feature.attributes.measure = false;
				feature.attributes.editable = true;
				feature.attributes.orgid = feature.id;
			}
		});
		this.editLayer.events.register("featureadded", this, function(e) {
			var feature = e.feature;
			this.showHideEditLayer();
			if (feature.state=="Insert"){ //only newly added features
				this.alterMeasureText(feature);
				this.selectFeature(feature);
			}
			sMap.events.triggerEvent("updatelinkentries", this, {});
			this.editLayer.redraw();
			OpenLayers.Event.stop(e);
			if (this.autoDeactivateTool){
				this.deactivateButtonsAndControls();
			}
			window.setTimeout(function(){sMap.map.getControlsByClass("sMap.Module.Select")[0].activate();},2000);
		});
		this.editLayer.events.register("beforefeaturemodified", this, function(e) {
			this.checkEditable(e);
			this.selectFeature(e.feature);
		});
		this.editLayer.events.register("featuremodified", this, function(e) {
			this.unselectFeatures();
			this.alterMeasureText(e.feature);
			sMap.events.triggerEvent("updatelinkentries", this, {});
		});
		this.editLayer.events.register("beforefeatureremoved", this, function(e) {
			this.checkEditable(e);
		});
		this.editLayer.events.register("featureremoved", this, function(e) {
			this.showHideEditLayer();
			this.unselectFeatures();
			sMap.events.triggerEvent("updatelinkentries", this, {});
		});
	},
	/**
	 * Modifies the measure and text attributes of the feature
	 * @param feature
	 */
	alterMeasureText : function(feature) {
		if (feature.attributes.so > 0){ //Textpoints should not be affected
			var cb = $("#draw-cbaddmeasure").prop('checked'),
				as = feature.attributes;
			if (!cb) {
				as.measure = false;
				as.text = "";
			} else {
				as.measure = true;
				this.addMeasureText(feature);
			}
		}
	},
	addMeasureText : function(f){
		if (f.geometry.id.indexOf("Polygon")>0){
			f.attributes.text = Math.round(f.geometry.components[0].getArea()) + " m2";
		}
		if (f.geometry.id.indexOf("MultiLineString")>0){
			f.attributes.text = Math.round(f.geometry.components[0].getLength()) + " m";
			f.attributes.la = "lb";
		}
		if (f.geometry.id.indexOf("Point")>0 && f.attributes.eg==""){
			f.attributes.text =  "r="+f.attributes.size + " m";
		}
		if (f.geometry.id.indexOf("Point")>0 && f.attributes.eg!=""){
			var decConst = Math.pow(10, this.decimals); 
			f.attributes.text =  "N:"+Math.round(f.geometry.y*decConst)/decConst + ", E:"+Math.round(f.geometry.x*decConst)/decConst;
			f.attributes.la = "lb";
			f.attributes.color = "#000000";
		}
	},
	checkEditable : function(e){
		if (!e.feature.attributes.editable){
//			alert("Feature not editable");
//			return false;
		}
	},
	/**
	 * Selects the input feature
	 * @param feature
	 */
	selectFeature : function(feature){
		var featureclone = feature.clone();
		var c = feature.geometry.getCentroid();
		var px = this.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(c.x, c.y));
		featureclone.layerName = this.drawLayerConfig.name;
		sMap.events.triggerEvent("select", this, {
			features:[featureclone],
			xy : new OpenLayers.Pixel(px.x, px.y)
		});
	},
	/**
	 * Tests if edit layer has features and shows it if it has otherwise it will be hidden
	 */
	showHideEditLayer: function(){
		if (this.editLayer.features.length>0 && !this.editLayer.visibility){
			sMap.events.triggerEvent("showlayer", this, {
				layerName : this.editLayer.name
			});
		}
		if (this.editLayer.features.length==0 && this.editLayer.visibility){
			sMap.events.triggerEvent("hidelayer", this, {
				layerName : this.editLayer.name
			});
		}
	},
	/**
	 * Unselects all features
	 */
	unselectFeatures : function(){
		sMap.events.triggerEvent("unselect", this, {});
	},
	/**
	 * Listener for the select modules event selected
	 * @param e
	 */
	selected: function(e) {
		var f = e.selectedFeatures.length ? e.selectedFeatures[0] : null;
		if (f && this.editLayer && f.layerName == this.drawLayerConfig.name) {
			if (f.attributes.editable||this.editLinkFeatures) {
				this.selectedFeature = this.editLayer.getFeatureById(f.attributes.orgid);
				this.addButtonsToPopup();
				$("#mxDescrEntry").prop("disabled", false);
				this.updateTextField(f.attributes.info);
				$("#mxDescrEntry").focus();
				$("#mxDescrEntry").select();
				$("#draw-buttoncolorselect").css({
					"background-color": f.attributes.color
				});
				this.editLayer.styleMap.styles.temporary.defaultStyle.fillColor = f.attributes.color;
				this.editLayer.styleMap.styles.temporary.defaultStyle.strokeColor = f.attributes.color;
				this.editLayer.styleMap.styles.temporary.defaultStyle.fontColor = f.attributes.color;
				$("#draw-graphicsize").val(f.attributes.size);
				if (f.attributes.eg && f.attributes.eg!=this.blankSymbol){
					this.showSymbolPicker(); 
					this.hideColorPicker();
					$("#draw-divsymbolseleced").css({"background-image": "url("+f.attributes.eg+")"});
				}else{
					this.hideSymbolPicker();
					this.showColorPicker();
				}
				if (f.attributes.measure){ 
					$("#draw-cbaddmeasure").prop('checked', true);
				} else {
					$("#draw-cbaddmeasure").prop('checked', false);
				}
			}
		}
	},
	/**
	 * Listener for the select modules event unselected
	 * @param e
	 */
	unselected: function(e) {
		if (this.editLayer){
			$("#mxDescrEntry").prop("disabled", true);
			this.updateTextField(this.lang.descrEntryText);
			this.selectedFeature = null;
			sMap.events.triggerEvent("updatelinkentries", this, {});
			this.editLayer.redraw();
		}
	},
	
	/**
	 * Gets the selected feature from the selectLayer
	 * @returns OpenLayers.Feature.Vector
	 */
	getSelectedFeature : function() {
		var feature = null;
		if (selectLayer.features.length>0) {
			feature = selectLayer.features[0];
		}
		return feature;
	},
	/**
	 * Updates the textarea for the description in the dialog
	 * @text {String} the text to update with
	 */
	updateTextField : function(text) {
		text = text || "";
		$("#mxDescrEntry").val(text);
		$("#mxDescrEntry").focus();
	},
	/**
	 * Make the div where you can write the content of the feature.
	 * @return
	 */
	makeDescrDiv : function() {

		var mxDescrDiv = $("<div id='mxDescrDiv' />");
		var mxDescrLbl = $("<div id='mxDescrLbl' class='mxLbl' />");
		mxDescrLbl.text(this.lang.descrLblText);
		
		var mxDescrEntry = $("<textarea id='mxDescrEntry' />");
		mxDescrDiv.append(mxDescrLbl);
		mxDescrDiv.append(mxDescrEntry);
		mxDescrEntry.prop("disabled", true);
		mxDescrEntry.text(this.lang.descrEntryText);
		
		var self = this;
		mxDescrEntry.keyup(function(e) {
			self.selectedFeature.attributes.info = this.value;
			if (self.selectedFeature.attributes.so == 0) self.selectedFeature.attributes.text = this.value;  //Only text is supposed to have 0 stroke opacity
			$("#draw-text").text( $(this).val() );
			sMap.events.triggerEvent("updatelinkentries", this, {});
		});
		return mxDescrDiv;
	},
	
	/**
	 * Deactivate all edit buttons except the one which just became active.
	 * And measure controls.
	 * @param control {OpenLayers.Control} The control (button) that just became active.
	 * @returns {void}
	 */
	deactivateButtonsAndControls: function(except) {
		var self = this,
			buttons = null;
		if (except) {
			buttons = except.siblings();
		}
		else {
			buttons = this.panel.children();
		}
		buttons.each(function() {
			$(this).data("active", false);
			var type = $(this).attr("id").split("-")[2];
			self.controls[type].deactivate();
			self.renderButton($(this).find("img"), false);
		});
	},
	
	/**
	 * Make the dialog to which all html is added.
	 */
	makeDialog : function(dialogDiv) {

		var self = this;
		sMap.util.createDialog(dialogDiv, {
			titleText : this.lang.headerText,
			position : this.dialogStartPosition,
			width : this.width,
			height : this.height,
			onClose : function() {
				// Deactivate controls
				self.deactivate.call(self);
			},
			onOpen : null
		});
		return dialogDiv;
	},
	/**
	 * Define what shall happen when u click on the popup buttons.
	 * This function has to run AFTER the popup (and popup-buttons)
	 * exist.
	 * 
	 * @param feature
	 * @return
	 */
	defineClickPopupButton : function(feature) {
		var self = this;
		$("#btnEditObject").click(function(e) {
			self.dialogDiv.dialog("open");
			$("#mxDescrEntry").focus();
			e.preventDefault();
		});
		$("#mxBtnErase").click(function(e) {
			var feature = self.getSelectedFeature() || null;
			if (feature!=null) {
				var drawFeature = self.editLayer.getFeatureById(feature.attributes.orgid);
				self.editLayer.destroyFeatures([drawFeature]);
				self.unselectFeatures();
			}
		});
	},
	/**
	 * Adds the edit and delete buttons to the popup
	 */
	addButtonsToPopup : function() {
		var feature = this.getSelectedFeature() || null;
		if (feature && feature.popup) {
			
			var btnEditObject = "<div id='btnEditObject' class='smapBtn'>"+this.lang.popupBtnEdit+"</div>";
			var mxBtnErase = "<div id='mxBtnErase' class='smapBtn'>"+this.lang.popupBtnDelete+"</div>";
			
			var html = feature.popup.contentHTML || "";
			// Don't add if button already exists in the html.
			if (html.search("btnEditObject")==-1) {
				var contDiv = "<div id='btnCont' class='btnCont'>" + btnEditObject + mxBtnErase + "</div>";

				html = html + contDiv;
				feature.popup.setContentHTML(html);
				
				feature.popup.updateSize();
				
				// Set button container width to same as the popup's width.
				var w = $(".olFramedCloudPopupContent").width();
				
				// Add some pixels to the popup height to give place for buttons.
				// Note! The same amount is taken away from height when they disappear.
				// This is done in function removeButtonsFromPopup
				this.addPopupSize(35);
				$("#btnCont").width(w);
				this.defineClickPopupButton(feature);
				
			}
		}
	},
	/**
	 * Fix the popup size after adding the button. This has to
	 * done each time the popup is opened (every time the button
	 * is added).
	 * @param popup {OpenLayers.Popup}
	 * @return
	 */
	addPopupSize : function(pixels) {
		var h = $(".olFramedCloudPopupContent").height();
		$(".olFramedCloudPopupContent").height(h + pixels);
		var feature = this.getSelectedFeature();
		feature.popup.updateSize();
		feature.popup.draw();
	},
	saveObjects : function(){
		var url = this.savePath;
		var featureString = this.createFeatureString();
		// if (!featureString) {
			// alert("Inga features!");
		// }
		$.ajax({
			url : url,
			headers: {
				"Content Type": "application/x-www-form-urlencoded"
			},
			data : {
				"action" : "save",
				"data" : featureString
			},
			type : "POST",
			error: function(request,error) {
				alert("Fel! Kontakta ansvarig" + request + error);
			},
			success : function(result){
				$('#draw-result').html(result);
				if (result.indexOf("inloggad")>0||result.indexOf("inga")>0){
					$('#draw-result').html(result);
				}else{
					$('#draw-result').children().css("color", "#023f88" );
				}
			}	
		});
		return false;
	},
	creatingwebparams : function(){
		// Remove drawLayer from the OL-params
		var index = $.inArray( this.drawLayerConfig.name, sMap.db.webParams.OL || [] );
		if (index > -1) {
			sMap.db.webParams.OL.splice(index, 1);
		}
		var featureString = this.createFeatureString();
		if (featureString) {
			sMap.db.webParams.features = featureString;
		}
	},
	createFeatureString : function() {
		// Check if any draw objects have been added.
		var editLayer = this.editLayer,
			markerFeatures=""; // Store all features in the editLayer as one continuous string, separated by an "F".
		
		if (editLayer) {
			var features = editLayer.features;
			/*
			 * The splitSign is used to separate many WKT strings and their texts.
			 * Note that if user adds a text which is same as splitSign, this will
			 * lead to a problem... so it has to be chosen carefully. Note also that
			 * if you change it here - it also has to be changed in MapConfig where
			 * the splitSign is used to retrieve the features again.
			 */
			var splitSign = "$$",
				commaSign = "££", // to replace "," in WKT-strings and text.
				newRowSign = "¤¤";
			
			// Getting each feature f from the editLayer, one by one.
			// And round each features coords (long and lat) to 0 decimals.
			var f = null, info=null, infos="", text=null, texts="", style="", styles="", size=null, sizes="";
			var decConst = Math.pow(10, this.decimals); // Create constant for calculating the rounding
			for (var i=0,len=features.length; i<len; i++) {
				f = features[i];
				if (f.attributes.info||f.attributes.info==""){ //to check if its an user created feature and not an edit vertice
					// Round all vertices to user defined number of decimals.
					var nodes = f.geometry.getVertices();
					for (var k=0,klen=nodes.length; k<klen; k++) {
						var n = nodes[k];
						n.x = Math.round(n.x * decConst) / decConst;
						n.y = Math.round(n.y * decConst) / decConst;
					}
					// End of rounding
					
					// Replace the comma in the WKT-string since this could cause problems when
					// sending over platforms, although decodeURLComponent would work in theory.
					var wkt = f.geometry.toString();
//						wktArr = null,
//						geomStart = null,
//						geomEnd = null;
//					
					var markerWkt = encodeURIComponent(wkt);
					
					// Add a feature separator.
					markerFeatures = markerFeatures + markerWkt + splitSign;
					
					// Retrieve the feature pop-up text.
					info = f.attributes.info ? f.attributes.info.replace(/,/g, commaSign) : "";
					info = info.replace(/\n/g, newRowSign);
					info = encodeURIComponent(info);
					infos = infos + info + splitSign;
					
					// Check if the text attribute contains any text - if so, add text to url. 
					//text = f.attributes.text ? "1" : "0"; // 2:text=measure, 1: true, 0: false
					if (f.attributes.text){
						if (f.attributes.measure){
							text = "2";
						}else{
							text = "1";
						}
					}
					else{
						text = "0";
					}
					texts = texts + text + splitSign;
					
					//Check if feature has a external graphic and not text else add color index
					var index = 0;
					if (f.attributes.eg && text!=1){
						for (var j in this.symbols){
							if (f.attributes.eg==this.symbols[j].url){
								index = j;
							}
						}
						style = "s" + index;
					}
					else{
						for (var k=0;k<this.colors.length;k++){
							if (f.attributes.color == this.colors[k]){
								index = k;
							}
							else {
								index = f.attributes.color;
							}
						}
						style = "c" + index;
					}
					styles = styles + style + splitSign;
					
					// Check if feature has external graphics (point or text), add size to url.
					if (text == "1") {
						size = f.attributes.fontsize;
					}else{
						if(f.attributes.eg=="" && f.attributes.so==1){
							size = f.attributes.sw;
						}else{
							size = f.attributes.size;
						}
					}
					sizes = sizes + size + splitSign;
				}
			}

			// Add the var 'features' to sMap.db.webParams that is uset to create webparams
			if (markerFeatures!="") {
				var len = splitSign.length;
				markerFeatures =
						sMap.util.rightStrip(markerFeatures, len) + "," +
						sMap.util.rightStrip(infos, len) + "," +
						sMap.util.rightStrip(texts, len) + "," +
						sMap.util.rightStrip(styles, len) + "," +
						sMap.util.rightStrip(sizes, len);
				
				markerFeatures = $.base64.encode(markerFeatures).replace(/=/g, "%3D"); // "=" disappears when in URL
				
			}
		}
		return markerFeatures;
	},	
	loadObjects : function(){
		var self = this;
		var url = this.savePath;
		$.ajax({
			url : url,
			data : {
				"action" : "load"
			},
			type : "POST",
			error: function(request,error) {
				alert("Fel! Kontakta ansvarig");
			},
			success : function(result){
				if (result.indexOf("inloggad")>0||result.indexOf("inga")>0){
					$('#draw-result').html(result);
					$('#draw-result').children().css("color", "#ff0000" );
				}else{
					$('#draw-result').html("<b>Dina objekt är laddade!</b>");
					self.drawTheFeatures.call(self, result);
				}
			}	
		});
		return false;
	},
	/**
	 * Import objects from GeoJSON
	 */
	importGeoJSON : function(){
		var self = this;
		var url = this.importPath;
		$.ajax({
			url : url,
			type : "GET",
			error: function(request,error) {
				alert("Fel! Kontakta ansvarig");
			},
			success : function(result){
				if(!$.isArray(result)) {
					result = [result];
				}
				for (var j=0;j<result.length;j++){
					var ljson = result[j];
					if (ljson.indexOf){
						$('#draw-result').html(ljson);
						$('#draw-result').children().css("color", "#ff0000" );
					}else{
						$('#draw-result').html("Laddat fil");
						var olFormat = new OpenLayers.Format.GeoJSON();
						var fs = olFormat.read(ljson);
						var currentGtype = "";
						for (var i = 0;i<fs.length;i++){
							var f = fs[i];
							var gtype = ljson.features[i].geometry.type;
							var fp=ljson.features[i].properties;
							fp.typ = fp.typ ? fp.typ : "shape";
							if (currentGtype!=gtype){
								currentGtype=gtype;
								if (gtype == "Point"){
									if (ljson.name=="ritlager_t" || fp.typ=="ritlager_t"){
										self.setTextTempStyle();
									}else if (ljson.name=="ritlager_c" || fp.typ=="ritlager_c"){
										self.setGraphicTempStyle();
									}else{
										self.setPointTempStyle();
									}
								}
								else{
									self.restoreTempStyle();
								}
							}
							f.attributes = {};
							if (fp.typ!="acad_label"){
								self.editLayer.addFeatures([f]);
								if (fp){
									f.attributes.color = fp.color ? self.importColor(fp.color) : f.attributes.color;
									f.attributes.fo = fp.color ? fp.color.split(",")[3]/100 : f.attributes.fo;
									f.attributes.gn = fp.gn ? fp.gn : f.attributes.gn;
									f.attributes.info = fp.info ? fp.info : "";
									f.attributes.text = fp.text ? fp.text : "";
									f.attributes.size = fp.size ? fp.size : f.attributes.size;
									if (ljson.name=="ritlager_p" || fp.typ=="ritlager_p"){  // Punkter
										f.attributes.la = "lb";
										f.attributes.sw = 0.3;
										f.attributes.fo = 1;
									}
									if (!(ljson.name=="ritlager_t" || fp.typ=="ritlager_t")){  // Alla utom texter
										f.attributes.eg = fp.eg ? fp.eg : "";
									}
								}
							}
						}
					}
				}
				self.editLayer.redraw();
			}	
		});
		return false;
	},
	importColor : function(icolor){
			var rgb = icolor.split(",");	
			return "#" +
		  ("0" + parseInt(rgb[0],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2);
	},
	/**
	 * All previous code in afterapplyingwebparams has been moved 
	 * to the function drawTheFeatures().
	 * Instead a check is done to see if the features should
	 * be fetched from database.
	 * 
	 * 
	 *
	 */
	
	afterapplyingwebparams : function(){
		var startfeatures = sMap.db.startingWebParamsObject.FEATURES;
		if (startfeatures=="short"){
			this.fetchFromDb(sMap.db.startingWebParamsObject.ID);
		}
		else{
			this.drawTheFeatures(startfeatures);
		}
	},
	/**
	 * Fetch a previously saved long string for the features.
	 * 
	 * @param shortenId {String}
	 * 			The id to match in db.
	 * 
	 *
	 */
	
	fetchFromDb : function(shortenId){
		var self = this;
		var url = sMap.config.proxyHost ? sMap.config.proxyHost + this.fetchFromDbPath : this.fetchFromDbPath;
		$.ajax({
			url : url,
			data : {
				"get_id" : shortenId
			},
			type : "POST",
			error: function(request,error) {
				alert("Fel! Kontakta ansvarig");
			},
			success : function(result){
					self.drawTheFeatures.call(self, result);
			}	
		});
		return false;
	},
	
	
	drawTheFeatures : function(drawParam){
		var startfeatures = drawParam;
		if (startfeatures && startfeatures.length>=1) {
			startfeatures = startfeatures.replace(/%3D/g, "="); // The hack (because "=" disappears from URL)
			var str = startfeatures || "";
			var strend = str.substring(str.length-1,str.length);  // If the string ends with a newline character this must be romoved. /K-M
			if (strend=="\n"){str=str.substr(0,str.length-1);}
			var decodedStr = $.base64.decode(str);
			var params = decodedStr.split(",");
			
			var wkts = params[0];
			var infos = params[1];
			var texts = params[2];
			var styles = params[3] ? params[3] : "0";
			var sizes = params[4];
			
			var splitSign = "$$"; // Separates many WKT:s and texts in the URL. Has to corresponds with splitSign in SMap.WebParams.
			var commaSignRegExp = /££/g; // to replace "," in WKT-strings and text. Has to corresponds with splitSign in SMap.WebParams.
			var newRowSignRegExp = /¤¤/g; // solves the problem at Malmo.se where \n is interpreted in sitevision -> error.
			
			// Note - these 2 variables are declared earlier and they must not be declared again here.
			var featureWktArr = (wkts.search(splitSign)!=-1) ? wkts.split(splitSign) : [wkts];
			var infoArr = (infos.search(splitSign)!=-1) ? infos.split(splitSign) : [infos];
			var textArr = (texts.search(splitSign)!=-1) ? texts.split(splitSign) : [texts];
			var styleArr = (styles.search(splitSign)!=-1) ? styles.split(splitSign) : [styles];
			var sizeArr = (sizes.search(splitSign)!=-1) ? sizes.split(splitSign) : [sizes];
			
			var info=null;
			for (var i=0; i<featureWktArr.length; i++) {
				// Decode the wkt and its pop-up text.
				featureWktArr[i] = decodeURIComponent(featureWktArr[i]).replace(commaSignRegExp, ",");
				
				// Put back comma (",") and new row sign ("\n").
				info = infoArr[i] ? decodeURIComponent(infoArr[i]) : null;
				if (info) {
					info = info.replace(commaSignRegExp, ",");
					info = info.replace(newRowSignRegExp, "\n");
				}
				infoArr[i] = info;
			}

			this.addEditLayer();
			this.addFeatures(featureWktArr, infoArr, textArr, styleArr, sizeArr);
			// Create dialog if the features should be editable
			if (!this.dialogDiv && this.editLinkFeatures){
				this.dialogDiv = this.makeDialogContent();
				this.dialogDiv = this.makeDialog(this.dialogDiv);
			}
			//Select (if configured) the last feature added
			if (this.selectLinkFeatures){
				this.selectFeature(this.editLayer.features[this.editLayer.features.length-1]);
			}
			this.showHideEditLayer();
		}
	},
		
	/**
	 * Add a feature with the given geometry and also add
	 * a pop-up which is open from start for the last feature in the array.
	 * 
	 * @param featureWktArr {Array(String)} Geometry in the "Well Known Text" (WKT)
	 * @param infoArr {Array(String)} The pop-up text. Index should match with corresponding feature.
	 * @param textArr {Array(Integer)} 1 = Textpoint 0 = Symbolpoint
	 * @return Nothing. A feature in given geometry is added to the poiLayer. The last feature's pop-up starts open.
	 */
	addFeatures : function(featureWktArr, infoArr, textArr, styleArr, sizeArr) {

		// Fetch the markerLayer.
		var markerLayer = this.editLayer;
		
		var feature=null, wkt=null, info=null, text=null, style=null, size=null;
		for (var i=0; i<featureWktArr.length; i++) {
			wkt = featureWktArr[i];
			info = infoArr[i] ? infoArr[i] : "";
			text = textArr[i] ? textArr[i] : "0";
			style = styleArr[i] ? styleArr[i] : "0";
			size = sizeArr[i] ? sizeArr[i] : this.defaultPointRadius;
			var gtype = wkt.substring(0,wkt.indexOf("("));
				geom = new OpenLayers.Geometry.fromWKT(wkt);
			feature = new OpenLayers.Feature.Vector(geom);

			// Add default attributes to feature
			feature.attributes.info = info;
			feature.attributes.eg = "";
			feature.attributes.gn = this.defaultGraphicName;
			feature.attributes.size = size;
			feature.attributes.fontsize = this.defaultFontSize;
			feature.attributes.sw = this.defaultStrokeWidth;
			feature.attributes.so = this.defaultStrokeOpacity;
			feature.attributes.fo = this.defaultFillOpacity;
			feature.attributes.color = this.defaultColor;
			feature.attributes.la = "cm";

			// Add external graphic or color to the features attributes
			var index=style.substring(1);
			if (style.substring(0,1)=="s"){   //symbol
				feature.attributes.eg = this.symbols[index].url;
				feature.attributes.fo = 1;
			}
			if (style.substring(0,1)=="c"){		//color
				if (style.substring(1,2)=="#"){ //hexvalue
					feature.attributes.color = index;
				}else{							//color index
					feature.attributes.color = this.colors[index];
				}
				if (gtype=="POINT"){  //Points with radius
					feature.attributes.so = 0.9;
				}else{  //lines and polys
					feature.attributes.sw = size;
				}
			}
			
			// Add text attribute to feature.
			var textstring = "";
			if (parseInt(text)==1) {
				textstring = info;
				feature.attributes.sw = this.defaultStrokeWidth;
				if (gtype=="POINT"){
					feature.attributes.eg = this.blankSymbol;
					feature.attributes.so = 0;
					feature.attributes.fo = 1;
					feature.attributes.fontsize = size;
					feature.attributes.size = size/2;
				}
			}
			feature.attributes.text = textstring;
			
			//Add measure attribute and override the text attribute with the measure text
			if (parseInt(text)==2) { 
				feature.attributes.measure=true;
				this.addMeasureText(feature);
			}else{
				feature.attributes.measure=false;
			}
			
			markerLayer.addFeatures([feature]);
			markerLayer.features[i].attributes.orgid = markerLayer.features[i].id;
		}
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Draw"
	
});