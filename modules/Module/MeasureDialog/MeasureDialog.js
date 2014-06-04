/**
 * @author Karl-Magnus Jönsson
 * @copyright Kristianstads kommun
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.MeasureDialog = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["beforeprint"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	/**
	 * Modules that will be deactivated when this activates
	 */
	DEACTIVATE_MODULES: [
	                     "sMap.Module.Blixten"
	                     ],
	
	dialogStartPosition : null,
	
	controls : {},
	
	buttons : {},
	
	panel : null,
	
	/**
	 * Deactivate the measure dialog before printing since the layer cannot be printed.
	 * @returns {void}
	 */
	beforeprint: function() {
		this.deactivate();
	},
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.MeasureDialog.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.MeasureDialog.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );

		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		for (var i=0,len=this.DEACTIVATE_MODULES.length; i<len; i++) {
			var mods = this.map.getControlsByClass(this.DEACTIVATE_MODULES[i]);
			if (mods.length) {
				mods[0].deactivate();
			}
		}
		sMap.events.triggerEvent("deactivate", this, {
			module: "sMap.Module.Select"
		});
		
		// Make the panel
		this.panel = this.makeControls();
		this.dialogDiv = this.makeDialogContent();
		this.dialogDiv = this.makeDialog(this.dialogDiv);
		this.addButtonHoverEffect();
		
		if (this.showMeasureAtCursor===true) {
			this.bindMouseMove.call(this);
		}
		
		this.eggifyIt();
		this.dialogDiv.dialog("open");
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (!this.active) {
			return false;
		}
		if (this.dialogDiv && this.dialogDiv.dialog("isOpen") === true) {
			return this.dialogDiv.dialog("close");
		}
		this.unEggifyIt();
		this.deactivateButtonsAndControls();
		$(this.dialogDiv).empty().remove();
		$("#measure-cursorDiv").hide();
		this.unBindMouseMove.call(this);
		
		sMap.events.triggerEvent("activate", this, {
			module: "sMap.Module.Select"
		});
		
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
		if (this.addToToolsMenu){
			sMap.events.triggerEvent("addtomenu", this, {
				index : this.toolbarIndex,
				iconCSS : "btnmeasure",
				menuId : this.addToToolsMenu,
				label : this.lang.buttonText,
				tagID : "button-measure"
			});
		}
		else{
			sMap.events.triggerEvent("addtoolbutton", this, {
				index : this.toolbarIndex,
				iconCSS : "btnmeasure",
				label : this.lang.buttonText,
				tagID : "button-measure"
			});
		}
	},

	/**
	 * 
	 */
	bindMouseMove : function() {
		
		this.cursorDiv = $("<div id='measure-cursorDiv' />");
		$("#smapDiv").append(this.cursorDiv);
		this.cursorDiv.hide();
		
		var p = sMap.util.getMapPosition();
		this.mapX = p.x;
		this.mapY = p.y;
		
		var self = this;
		this.onMouseMove = function(e) {
			self.cursorDiv.css({
				"left" : e.pageX - self.mapX + 14 + "px",
				"top" : e.pageY - self.mapY + 20 + "px"
			});
		};
		$(this.map.viewPortDiv).mousemove(this.onMouseMove);
	},
	
	unBindMouseMove : function() {
		$(this.map.viewPortDiv).unbind("mousemove", this.onMouseMove);
	},
	
	
	
	
	/**
	 * Toggle the dialog.
	 */
	toggleDialog : function() {
		if (this.active!==true) {
			this.activate();
		}
		var isOpen = this.dialogDiv.dialog("isOpen");
		if (isOpen) {
			this.dialogDiv.dialog("close");
		}
		else {
			this.dialogDiv.dialog("open");
		}
		
		
	},
	
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
			var type = $(this).data("type");
			self.controls[type].deactivate();
			self.renderButton($(this).find("img"), false);
		});
	},
	
	
	/**
	 * Deactivate the result div and cursor div
	 */
	deactivateResultDiv: function() {
		this.resultDiv.html("");
		this.resultDiv.css(this.resultDivUnactiveCSS);
		this.toggleCursorDiv("hide");
	},
//	/**
//	 * @param buttonName {String}
//	 *     The button name: "point", "line" or "polygon"
//	 */
//	toggleControl : function(buttonName) {
//		var self = this;
//
//		var ctrl = self.controls[buttonName];
//		
//		// Toggle control
//		if (ctrl.active===true) {
//			// Deactivate button and its control			
//			self.coordinates = null;
//			this.deactivateControls();
//		}
//		else {
//			// Activate button and its control
//			self.deactivateControls();
//			ctrl.activate();
//			self.resultDiv.css(self.resultDivActiveCSS);
//			self.buttons[buttonName].activate();
//			var geometryType = self.getControlType();
//			self.displayMeasure(geometryType, "m", "0");
//		}
//	},
	/**
	 * Get the active tool's type - "point" (0), "line" (1) or "polygon" (2).
	 */
	getControlType : function() {
		var dict = {
				point : 0,
				path : 1,
				polygon : 2
		};
		var toolsType = null;
		for (var cName in this.controls) {
			var c = this.controls[cName];
			if (c.active===true) {
				var className = c.handler.CLASS_NAME.split(".")[2].toLowerCase();
				toolsType = dict[className];
				break;
			}
		}
		return toolsType;
	},	
	
	reportMeasure : function(e) {
		var order = this.getControlType(),
			geometry = e.geometry;
		
		var	measure = e.measure, // distance in map distance units
			units = e.units; // NOTE! OpenLayers changes unit depending on distance.
		
		if (order==0) {
			// Store the current measured coordinates
			this.coordinates = {
					x : geometry.x,
					y : geometry.y
			};
			
			var p = sMap.util.projectPoint(config.projection, this.currentProjection, geometry.x, geometry.y);
			var dec = this.projections[this.currentProjection].decimals;
			this.displayCoordinates(p.x.toFixed(dec), p.y.toFixed(dec));
			
			return;
		}
		else if (units=="m") {
			measure = measure.toFixed(this.decimals_m);
		}
		else {
			measure = measure.toFixed(this.decimals_km);
		}
		
		if (e.type==="measure") {
			// Get the position of the resultDiv
			var p = $("#measure-resultDiv input").offset();
			this.cursorDiv.css("z-index", "5000");
//			this.cursorDiv.appendTo("body");
			this.cursorDiv.animate({
				"left": p.left+"px",
				"top": (p.top)+"px"
			}, 500, function() {
				$(this).fadeOut(300, function() {
					$(this).css("z-index", "1000");
				});
			});
//			this.toggleCursorDiv("hide");
		}
		else {
			this.toggleCursorDiv("show");
		}
		
		this.displayMeasure(order, units, measure);

		this.resultDiv.css(this.resultDivActiveCSS);
		
	},
	
	/**
	 * Toggle cursorDiv. It first checks if the cursor div
	 * option is true.
	 */
	toggleCursorDiv : function(change) {
		if (this.showMeasureAtCursor===true) {
			switch (change) {
			case("show"):
				this.cursorDiv.show();
				break;
			case("hide"):
				this.cursorDiv.hide();
				break;
			default:
				break;
			}
		}	
	},
	
	
	/**
	 * Create the HTML from the measurement of line or polygon.
	 * @param order {Integer} 1 = line, 2 = polygon.
	 * @param units {String} E.g. "m"
	 * @param measure {String} Measurement results as string
	 */
	displayMeasure : function(order, units, measure) {
		
		var html = $("<div />"),
			row = $("<div />");
			lblTag = $("<span />"),
			resultTag = $("<input readonly='readonly' type='text' />");
		
		if (order==0) {
			
			//Allow user to type in coordinates, if coordsSearch equals true in MeasureDialog_conf.js.
			if (this.coordsSearch == true){
				resultTag.removeProp("readonly");
			}
			
			var lblTagLon = lblTag.clone(),
				resultTagLon = resultTag.clone(),
				rowLon = row.clone();
			
			lblTag.text("Latitud:");
			lblTagLon.text("Longitud:");
			resultTagLon.val("");
			units = "";
			measure="";
			rowLon.append(lblTagLon);
			rowLon.append(resultTagLon);
			rowLon.append("<br/>");
			html.append(rowLon);
			
		}
		else if (order==1) {
			lblTag.text(this.lang.labelLenght);
		}
		else if (order==2) {
			lblTag.text(this.lang.labelArea);
			units += "2";
		}
		
		resultTag.val(measure+" "+units);
		
		row.append(lblTag);
		row.append(resultTag);
		html.append(row);
		
		this.resultDiv.html(html);
		if ( this.showMeasureAtCursor===true ) {
			this.displayHtmlAtCursor(html);
		}
	},
	
	displayHtmlAtCursor : function(jQueryHtml) {
		
		// Make content for the cursor result div.
		var newHtml = jQueryHtml.clone();
		$(newHtml).find("input").each(function() {
			var span = $("<span>" + $(this).val() + "</span>");
			$(this).replaceWith(span);
		});
		$(newHtml).children().each(function() {
			$(this).removeClass();
		});
		
		$(this.cursorDiv).html(newHtml);
	},
	
	
	/**
	 * 
	 */
	displayCoordinates : function(x, y) {
		var proj = this.projections[this.currentProjection];
		
		var html = $("<div />"),
			row = $("<div />"),
			row2 = $("<div />"),
			lonTag = $("<span>"+proj.easting+"</span>"),
			latTag = $("<span>"+proj.northing+"</span>"),
			resultLonTag = $("<input readonly='readonly' type='text' value='"+x+"'></input>"),
			resultLatTag = $("<input readonly='readonly' type='text' value='"+y+"'></input>");
		
		//Allow user to type in coordinates, if coordsSearch equals true in MeasureDialog_conf.js.
		if (this.coordsSearch == true){
			resultLonTag.removeProp("readonly");
			resultLatTag.removeProp("readonly");
		}
		
		row.append(lonTag);
		row.append(resultLonTag);
		row2.append(latTag);
		row2.append(resultLatTag);
		
		html.append(row);
		html.append(row2);
		
		this.resultDiv.html(html);
		
	},
	
	/**
	 * @param fromEpsg {String}
	 * @param toEpsg {String}
	 * @param easting {Number}
	 * @param northing {Number}
	 * 
	 */
	projectCoordinate : function(fromEpsg, toEpsg, easting, northing) {
		var p = sMap.util.projectPoint(fromEpsg, toEpsg, easting, northing);
		
		var dec = this.projections[toEpsg].decimals;
		this.displayCoordinates(p.x.toFixed(dec), p.y.toFixed(dec));
	},
	
	/**
	 * If any of the coordinates is out of bounds or not a number, display a message.
	 * 
	 * @param errorType {String}
	 * 		The type of error (out of bounds or not a number ).
	 */
	
	coordsError : function(errorType){
        var self = this,
        	txt = null;
        if (errorType == "NaN"){
        	txt = self.lang.coordsNaN;
        }
        else{
        	txt = self.lang.invalidCoords;
        }
        var errorText = $("<div id='measure-errortext'>" + txt + "</div>"),
        	errorDiv = $("<div id='measure-errordiv' />"),
        	btnClose = $("<div id='measure-errorbtnclose'>" + self.lang.btnCloseTxt +"</div>");
        
        btnClose.click(function() {
        	$("#measure-resultDiv input").each(function(){
				$(this).val("");
			});
        	errorDiv.remove();
        });
        
        errorDiv.append(errorText).append(btnClose);
        $(this.map.viewPortDiv).append(errorDiv);
    },
	
	/**
	 * Get coordinates from input fields. Display proper error messages, if invalid coords.
	 * 
	 */
	
	coordsFromUser : function(){
    	//Allow for both period and comma as decimal-seperator.
		var self = this,
			east = parseFloat( $("#measure-resultDiv input").eq(0).val().replace(",",".") ),
			north = parseFloat( $("#measure-resultDiv input").eq(1).val().replace(",",".") );
		
		//Display an error if any of the coordinates is not a number
		if (isNaN(east) || isNaN(north)){
			self.coordsError("NaN");
			return;
		}
		
		var toEpsg = "EPSG:" + $("#measure-projectSelectTag").find("option:selected").prop("id").split("-")[1]; // the epsg code
		
		var p = sMap.util.projectPoint(toEpsg, config.projection, east, north);
		
		//Display an error if any coordinate is out of bounds.
    	var maximalExtent = sMap.config.maxExtent;
    	if (p.x > maximalExtent.e || p.x < maximalExtent.w || p.y > maximalExtent.n || p.y < maximalExtent.s) {
    		self.coordsError();
			return;
    	}
		
		var pointHandler = this.controls["point"].handler;
		
		var lonLat = new OpenLayers.LonLat(p.x,p.y);
		
		//Move the feature on the layer, but not the one attached to the handler, if more than one feature.
		//else create a new feature and move it.
		if (pointHandler.layer.features.length > 1) {
			pointHandler.layer.features[0].move(lonLat);
		}
		else{
			var pixel = this.map.getPixelFromLonLat(lonLat);
			pointHandler.createFeature(pixel);
			pointHandler.layer.features[0].move(lonLat);
		}
		
		// Store the current measured coordinates
		this.coordinates = {
				x : p.x,
				y : p.y
		};
		
	},
	
	/**
	 * Toggle the projection buttons
	 * @param turnOn {Boolean}
	 */
	toggleProjectionButtons : function(turnOn) {
		var self=this;
		
		//Used for toggling searchcoords-btn, if the option is set tot true
		var searchCoordsBtn = this.btnUserCoords || null;
		
		if (turnOn===true) {
			
			if (searchCoordsBtn != null && searchCoordsBtn.not(':visible')){
				searchCoordsBtn.show();
			}
			
			if ( !$("#measure-projectSelectTag").length ) {

				// Make a header
				
				var header = $("<p id='measure-projHeader' />");
				header.text(this.lang.labelCoord);
				$(this.dialogDiv).append(header);
				
				//Add user search (true/false in MeasureDialog_conf.js).
				if (self.coordsSearch == true){
					
					//search button
					var btnUserCoords = $("<button id='measure-usercoords' title='" + self.lang.btnSearchTitle + "'>" + self.lang.btnSearch + "</button>");
					this.btnUserCoords = btnUserCoords;
					btnUserCoords.click(function(e){
						self.coordsFromUser();
					});
				
					$(this.dialogDiv).append(btnUserCoords);
					
					//search by "return-key"
					btnUserCoords.parent().keypress(function(e) {
					    if (e.keyCode == 13) {
					    	btnUserCoords.click();
					    }
					});
				}
				
				var selectTag = $("<select id='measure-projectSelectTag' />");
				var projections = this.projections;
				var bs = [];
				
				for (var epsg in projections) {
					var name = projections[epsg].name;
					var number = epsg.split(":")[1];
					var selected = this.map.projection == epsg ? "selected" : "";
					var option = $("<option id='measure-"+number+"' " + selected + " >"+name+"</option>");
					selectTag.append(option);
				}

				selectTag.change(function(e) {
					var toEpsg = "EPSG:" + $(this).find("option:selected").prop("id").split("-")[1]; // the epsg code
					self.currentProjection = toEpsg;
					
					if (self.coordinates) {
						self.projectCoordinate(config.projection, toEpsg, self.coordinates.x, self.coordinates.y);//
					}
				});
				
				$(this.dialogDiv).append(selectTag);
			}
			else {
				$("#measure-projectSelectTag").show();
				$("#measure-projHeader").show();
			}
			// Store current projection.
			this.currentProjection = "EPSG:" + $("#measure-projectSelectTag").find(":selected").prop("id").split("-")[1];
			
			// Increase height of dialog
			$(this.dialogDiv).dialog("option", "height", self.height+75);
			
		}
		else {
			if(searchCoordsBtn != null && searchCoordsBtn.is(':visible')){
				searchCoordsBtn.hide();
			}
			$("#measure-projectSelectTag").hide(); //empty().remove(); // empty is faster than remove... acc. to jquery comment.
			$("#measure-projHeader").hide();
			$(this.dialogDiv).dialog("option", "height", self.height);

		}
	},
	
	hackHandlerStyle : function(control) {
		if (this.style) {
			var tempStyle = new OpenLayers.Style(this.style);

			var handler = eval(control.handler.CLASS_NAME);
			
			// Remake the control's handler to include our own style.
			control.handler = new handler(
					control,
					control.callbacks,
					OpenLayers.Util.extend(
							{
								layerOptions : {
									styleMap : tempStyle
								}
							},
							control.handlerOptions
					)
			);
		}
	},
	
	/**
	 * Make the control and the buttons which toggles the controls.
	 */
	makeControls : function() {
		
//		var panel = new OpenLayers.Control.Panel({'displayClass': 'olControlPanelMeasure'});
		
		var panel = $("<div id='measure-panel' />");

		var measureLine = new OpenLayers.Control.Measure(
				OpenLayers.Handler.Path, {
						persist: true,
						immediate: true
				}
		);

		var measurePolygon = new OpenLayers.Control.Measure(
				OpenLayers.Handler.Polygon,
				{	persist : true,
					immediate: true
				}
		);

		this.controls["line"] = measureLine;
		this.controls["polygon"] = measurePolygon;
		
		this.map.addControl(measureLine);
		this.map.addControl(measurePolygon);
		
		var reportMeasure = this.reportMeasure;
		
		var self=this;
		
		this.srcIconPointOff = "img/editTools/point_off.png";
		this.srcIconLineOff = "img/editTools/line_off.png";
		this.srcIconPolygonOff = "img/editTools/polygon_off.png";
		this.srcIconPointOn = "img/editTools/point_on.png";
		this.srcIconLineOn = "img/editTools/line_on.png";
		this.srcIconPolygonOn = "img/editTools/polygon_on.png";
		
		// Make buttons
		var btnDrawLine = $("<div class='measure-button' title='"+this.lang.titleLine+"'><img src='"+this.srcIconLineOff+"'></img></div>"),
			btnDrawPolygon = $("<div class='measure-button' title='"+this.lang.titleArea+"'><img src='"+this.srcIconPolygonOff+"'></img></div>");
		btnDrawLine.data("type", "line");
		btnDrawPolygon.data("type", "polygon");
		panel.append(btnDrawLine).append(btnDrawPolygon);
		
		
		
		// Make buttons
//		var btnDrawLine = new OpenLayers.Control.Button({
//			title: this.lang.titleLine,
//		    displayClass: "btnMeasureLine",
//		    trigger: function() {
//				self.toggleControl("line");
//			}
//		});
//		
//		var btnDrawPolygon = new OpenLayers.Control.Button({
//			title: this.lang.titleArea,
//		    displayClass: "btnMeasurePolygon",
//		    trigger: function() {
//				self.toggleControl("polygon");
//			}
//		});
		
		// Optional - add measure point (show coordinates)
		if (this.point===true) {
			
			var measurePoint = new OpenLayers.Control.Measure(
					OpenLayers.Handler.Point,
					{persist : true}
			);
			this.hackHandlerStyle(measurePoint);
			
			var btnDrawPoint = $("<div class='measure-button' title='"+this.lang.titlePoint+"'><img src='"+this.srcIconPointOff+"'></img></div>");
			btnDrawPoint.data("type", "point");
			panel.prepend(btnDrawPoint);
			
			this.controls["point"] = measurePoint;
			this.map.addControl(measurePoint);
		}
		
		var onActivateChange = function() {
			if (c.handler.CLASS_NAME=="OpenLayers.Handler.Point") {
				// If control "point" is activated or deactivated...
				var isActive = self.controls["point"].active;
				self.toggleProjectionButtons(isActive);
			}
		};
		
		// Update output on these events.
		for (var cName in this.controls) {
			var c = this.controls[cName];
			c.handler.style = this.style ? this.style : c.handler.style; // Set a custom style if defined
			
			c.events.register("measure", this, reportMeasure);
			c.events.register("measurepartial", this, reportMeasure);
			
			c.events.register("activate", c, function(e) {
				onActivateChange();
			});
			c.events.register("deactivate", c, function(e) {
				onActivateChange();
				self.deactivateResultDiv();
			});
		}
		
		this.hackHandlerStyle(measureLine);
		this.hackHandlerStyle(measurePolygon);
		
		
		
		var onButtonClick = function() {
			var type = $(this).data("type");
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
		
		panel.find("img").each(function() {
			$(this).mouseenter(function() {
				self.renderButton($(this), true);
				
			});
			$(this).mouseleave(function() {
				if ( !$(this).parent().data("active")) {
					self.renderButton($(this), false);		
				}
			});
		});
		panel.find("div").each(function() {
			$(this).click(onButtonClick);
		});
		
		return panel;
	},
	
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
	 * Make a dialogDiv and append the panel and the div which
	 * displays the measure results.
	 */
	makeDialogContent : function() {
		var dialogDiv = $("<div id='measureDialogDiv' />");
		
		var helpDiv = $("<div id='measure-helpDiv' />");

		dialogDiv.append(helpDiv);

		$(helpDiv).text(this.lang.helpText);

		/**
		 * The results are appended to this div.
		 */
		this.resultDiv = $("<div id='measure-resultDiv' />");
		
		dialogDiv.append(this.panel);
		dialogDiv.append(this.resultDiv);
		
		this.resultDiv.css(this.resultDivUnactiveCSS);
		
		this.resultDiv.html("");
		
		return dialogDiv;
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
				self.events.triggerEvent("dialogclosed", {
					control : self
				});
				self.deactivate.call(self);
			},
			onOpen : null
		});
		return dialogDiv;
	},
    
	addButtonHoverEffect : function() {
		var map = this.map;
		$(".olControlPanelMeasure").children().each(function() {
			
			$(this).data("allowHover", true); // initially, allow hover effect.
			
			$(this).hover(function(e) {
				// ON HOVER
				
				var cssClass = $(this).prop("class"), // "btnDrawPolygonItemInactive"
					components = cssClass.split("Item"), // ["btnDrawPolygon", "Inactive"]
					allowHover = ($(this).data("allowHover")===true);
				
				if ((components[1])=="Inactive" && allowHover) {
					var activeCssClass = components[0] + "ItemActive";
					$(this).removeClass(cssClass);
					$(this).addClass(activeCssClass);
				}
			}, function(e) {
				// ON HOVER OUT
				
				var cssClass = $(this).prop("class"), // "btnDrawPolygonItemInactive"
					components = cssClass.split("Item"), // ["btnDrawPolygon", "Inactive"]
					allowHover = ($(this).data("allowHover")===true);
				
				// If button was active and just became inactive...
				if (allowHover===true) {
					var inactiveCssClass = components[0] + "ItemInactive";
					$(this).removeClass(cssClass);
					$(this).addClass(inactiveCssClass);
				}
				else if (components[1]=="Inactive") {
					$(this).data("allowHover", true); // allow hover again.
				}
			});
			
			// Don't allow the hover function to take away active class and add inactive class
			// after the button has been activated.
			$(this).click(function(e) {
				
				// Allow hover for all buttons...
				$(".olControlPanelMeasure").children().each(function() {
					$(this).data("allowHover", true);
				});
				
				// But disallow hover for the clicked button - if it became active.
				var cssClass = $(this).prop("class"); // "btnDrawPolygonItemInactive"
				var components = cssClass.split("Item"); // ["btnDrawPolygon", "Inactive"]
				// Button was inactive an became active...
				if (components[1]=="Active") {
					$(this).data("allowHover", false); // don't allow hover after click to activate.
				}
				
				
			});
		});
	},
	
	unEggifyIt: function() {
		$("#toolbar-maindiv").off("dblclick");
	},
	eggifyIt: function() {
		// Hidden egg
		$("#toolbar-maindiv").off("dblclick").on("dblclick", function(e) {
			if (e.altKey) {
				var img = $("<img src='img/apic.png' width='300' height='300'></img>");
				img.css({
					"position": "absolute",
					"z-index": "2000",
					"right": "-300px",
					"top": "100px",
					"opacity": "0"
				});
				$("#mapDiv").append(img);
				img.animate({
					"right": "1px",
					"opacity": "1"
				}, 500, function() {
					$(this).animate({
						"right": "-300px",
						"opacity": "0"
					}, 500, function() {
						$(this).empty().remove();
					});
				});
				
			}
		});
		// hidden egg end
	},

	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.MeasureDialog"
	
});