/**
 * @author Johan Lahti
 * @copyright Malmö stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.BlixtenPopup2 = OpenLayers.Class(sMap.Module, {
	
	prefix: "blixtenpopup-",
	delim: "__",
	
	/**
	 * nameField: The field that holds feature specific info.
	 * If this field is not empty this feature will be represented
	 * by its own row in the "object div".
	 */
	nameField: "namn",
	
	/**
	 * urlField
	 */
	urlField: "url",
	
	/**
	 * tooltipField
	 */
	tooltipField: "tooltip",
	
	
	/**
	 * Stores the found features from a blixten request.
	 */
	foundFeatures: [], 
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["blixtenrequest", "blixtenfeaturesfound", "fetchedfeatures"],
	
	fetchedfeatures: function(e) {
		var blixtenInst = this.map.getControlsByClass("sMap.Module.Blixten")[0];
		if (blixtenInst.active === true) {
			if (!e.features.length)
				return false;
			sMap.events.triggerEvent("blixtenfeaturesfound", this, {
				features: e.features
			});
			setTimeout('$(".blixtenpopup-row-left:eq(0)").click();', 20);			
		}
		
		
	},
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.BlixtenPopup2.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.BlixtenPopup2.prototype.EVENT_TRIGGERS.concat(
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
		
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
//		this.showDialog();
		this.preProcessLayerConfig();
	},
	
	preProcessLayerConfig: function() {
		var i, t, geomType, style,
			arr = sMap.config.layers.overlays;
		for (i=0,len=arr.length; i<len; i++) {
			t = arr[i];
			if (t.blixtable) {
				geomType = t.geomType || "polygon";
				switch (geomType) {
					case "point":
						style = {
							strokeWidth: 12,
							strokeColor: "#000",
							strokeOpacity: .20
						}
						break;
					case "line":
						style = {
							strokeWidth: 12,
							strokeColor: "#000",
							strokeOpacity: .20
						}
						break;
					case "polygon":
						style = {
							strokeWidth: 12,
							strokeColor: "#000",
							fillOpacity: 0,
							strokeOpacity: .20
						}
						break;
	//				case "mixed":
	//					style = {
	//						strokeWidth: 4,
	//						strokeColor: "#0f0",
	//						fillOpacity: 0,
	//						strokeOpacity: 0.9
	//					}
					default:
						style = {
							strokeWidth: 12,
							strokeColor: "#000",
							fillOpacity: 0,
							strokeOpacity: .20
						}
				}
				if (t.style.select) {
					delete t.style.select.rules;				
				}
				delete t.style.rules;
				t.style = t.style || {};
				$.extend(true, t.style["default"], style);
				$.extend(true, t.style["default"], style);
				$.extend(true, t.style["select"], style);
				$.extend(true, t.style["select"], style);
			}
		}
	},
	
	showDialog: function() {
		
		if (!this.dialogDiv) {
			this.makeDialog();
		}
		this.removeRows();
		this.dialogDiv.dialog("open");
	},
	
	hideDialog: function() {
		if (this.dialogDiv) {
			this.dialogDiv.dialog("close");
		}
	},
	
	destroyFeatures: function(features) {
		for (var i=0,len=features.length; i<len; i++) {
			features[i].destroy();
		}
	},
	
	/**
	 * Update size of dialog content.
	 * 
	 * @param width {Integer}
	 * @param height {Integer}
	 * @returns {void}
	 */
	updateSize: function() {
		var width = this.dialogDiv.dialog("option", "width");
			height = this.dialogDiv.dialog("option", "height");
		
		// Get the width change and add it to the right div.
		var dw = width - (this.oldWidth || width);
		var w = this.rightDiv.width() + dw;
		this.rightDiv.width(w);
		
		// Get the height change and add it to all divs.
		var dh = height - this.oldHeight;
		
		var h1 = this.leftDiv.height() + dh,
			h2 = this.rightDiv.height() + dh,
			h3 = this.rowsDiv.height() + dh,
			h4 = this.attrDiv.height() + dh;
		
		this.leftDiv.height(h1);
		this.rightDiv.height(h2);
		this.rowsDiv.height(h3);
		this.attrDiv.height(h4);
		
		// Store width and height for next resize.
		this.oldWidth = width;
		this.oldHeight = height;
	},
	
	makeDialog: function() {
		// Adapt dialog size according to document size.
		var w = $(window).width() * 0.5;
		var h = parseInt(w/1.5);
		var maxHeight = 800,
			maxWidth = 800,
			minHeight = 400,
			minWidth = 600;
		maxHeight = $(window).height()-50 < maxHeight ? $(window).height()-50 : maxHeight; // limit maxHeight to ca document's height
		w = w > maxWidth ? maxWidth : w;
		h = h > maxHeight ? maxHeight : h;
		w = w < minWidth ? minWidth : w;
		h = h < minHeight ? minHeight : h;
		
		// Calculate dialogs position (bottom-right corner, with margin).
		var left = $(window).width() - w - 30,
			top = ($(window).height() - h) / 2;
		
		this.dialogDiv = $("<div id='"+this.prefix+"dialogdiv' />");
		var self = this;
		this.dialogDiv.dialog({
			title: this.lang.dialogTitle,
			resizable: true,
			autoOpen: false,
			position: [left, top],
			width: w, //652,
			height: h, //402,
			resizeStart: function() {
				$(this).children().hide();
				$(this).parent().css({
					"filter": "alpha(opacity=70)",
			    	"opacity": "0.7"
				});
			},
			resizeStop: function(e, ui) {
				$(this).parent().css({
					"filter": "alpha(opacity=100)",
					"opacity": "1"
				});
				$(this).children().show();
//				var w = ui.size.width,
//					h = ui.size.height;
				// Use a timeout so that the DOM is ready (document.ready does not fix it).
				var code = "var mod = sMap.map.getControlsByClass('" + self.CLASS_NAME + "')[0];mod.updateSize();";
				setTimeout(code, 200);
			},
			close: function() {
				sMap.events.triggerEvent("unselect", this, {}); // Will destroy features in the select layer
				self.destroyFeatures(self.foundFeatures);
				self.foundFeatures = [];
				self.attrDiv.parent().find("iframe").remove();
				sMap.cmd.hidealllayers();
			}
		});
		
		sMap.util.addDialogMinimizeButton(this.dialogDiv);
		
		// Store width and height for next resize.
		this.oldWidth = w;
		this.oldHeight = h;
		
		// Deactivate draw point tool when hovering the popup dialog and 
		// activate again when cursor leaves the dialog.
		this.dialogDiv.parent().mouseenter(function(e) {
			var ctrls = self.map.getControlsByClass("OpenLayers.Control.DrawFeature");
			if (ctrls.length) {
				ctrls[0].deactivate();
				// Bugg fix - select layer's z-index moves backwards again.
				var layers = self.map.getLayersByName("selectLayer");
				if (layers.length) {
					layers[0].setZIndex(699);
				}
			}
		});
		this.dialogDiv.parent().mouseleave(function(e) {
			var ctrls = self.map.getControlsByClass("OpenLayers.Control.DrawFeature");
			if (ctrls.length) {
				ctrls[0].activate();
			}
		});
		
		// -- Fill dialog with HTML --
		
		// Create two divs - left and right divs.
		this.leftDiv = $("<div id='"+this.prefix+"leftdiv' unselectable='on' class='blixtenpopup-div unselectable' />");
		this.rightDiv = $("<div id='"+this.prefix+"rightdiv' class='blixtenpopup-div' />");
		
		// This is the container of the rows that user can click on.
		this.rowsDiv = $("<div id='"+this.prefix+"rowsdiv-bottom' />");
		this.leftDiv.append(this.rowsDiv);
		
		function onDivClick(e) {
			if (e.target == this) {
				self.unselectAllRows();
				sMap.events.triggerEvent("unselect", this, {
					doNotDestroy: true
				});
				self.attrDiv.empty();
				self.attrDiv.parent().find("iframe").remove();
			}
		};		
		this.rowsDiv.click(onDivClick);
		
		this.dialogDiv.append( this.leftDiv ).append( this.rightDiv );
		this.attrDiv = $("<div id='"+this.prefix+"attrdiv' />");
		this.rightDiv.append(this.attrDiv);
		$("#blixtenpopup-rightdiv").width(w-226).height(h-34);
		$("#blixtenpopup-leftdiv").height(h-34);
		$("#blixtenpopup-attrdiv").height(h-56);
	},
	
	/**
	 * @property attributes {Object}
	 * @property popupHTML {String}
	 */
	showAttributes: function(attributes, popupHTML) {
		this.attrDiv.empty();
		this.attrDiv.parent().find("iframe").remove();
		//popupHTML = sMap.util.extractAttributes(attributes, popupHTML);
		this.attrDiv.html(popupHTML);
		this.attrDiv.show();
	},
	
	/**
	 * @property fids {Array(String)} Array of feature IDs.
	 * @returns {Array(OpenLayers.Feature.Vector)}
	 */
	getFeaturesWithFids: function(fids) {
		var f = null,
			features = this.foundFeatures,
			matchingFs = [];
		for (var i=0,len=features.length; i<len; i++) {
			f = features[i];
			
			// Iterate through all fids and see if any of them match
			// this feature's fid.
			for (var j=0,lenj=fids.length; j<lenj; j++) {
				if ( f.fid == fids[j] ) {
					matchingFs.push(f);
				}
			}
		}
		return matchingFs;
	},
	
	
	onRowClick: function() {
		
		var self = sMap.map.getControlsByClass("sMap.Module.BlixtenPopup2")[0];
		sMap.events.triggerEvent("unselect", self, {
			doNotDestroy: true
		});
		
		// Select the row and show info from the feature's nameField
		self.unselectAllRows();
		$(this).addClass(self.prefix+"rowselected");
		
		// Get all features and select them. Extract HTML from one
		// of the features and show it.
		var fids = $(this).data("fids"),
			content = null,
			features = null;
		if (fids) {
			features = self.getFeaturesWithFids(fids);
			var f = features[0];
			content = f.attributes[self.urlField];
			var layerName = f.layerName;
			if (layerName) {
				sMap.cmd.hidealllayers();
				sMap.events.triggerEvent("showlayer", this, {
					layerName: layerName
				});
			}
		}
		else {
			content = options.content || "Inget innehåll";
		}
		self.showInfo(content);
		sMap.events.triggerEvent("select", self, {
			features: features,
			doNotDestroy: true
		});
		return true;
	},
	
	makeRow: function(t, options) {
		var row = $("<div unselectable='on' class='unselectable "+options.className+"' />");
		
		// Store all fids in a array.
//		var fids = [];
//		for (var i=0,len=arr.length; i<len; i++) {
//			fids.push( arr[i].fids );
//		}
		var fids = t.fids;
		
		row.data("fids", fids); // Store configs so we can get and select the features on row click
		row.text(options.label);
		row.css(options.css);
		row.click(this.onRowClick);
		return row;
	},
	
	showInfo: function(content) {
		if (content.substring(0, 4) == "http") {
			// We are dealing with a URL.
			this.attrDiv.hide(); // Avoid interference with iframe scrolling
			this.attrDiv.empty();
			this.attrDiv.parent().find("iframe").remove();
			
			var iFrame = $("<iframe scrolling='1' border='none' frameborder='0' width='100%' height='100%' />"); // scrolling='no'
			iFrame.attr("src", content);
			this.attrDiv.parent().append(iFrame);
		}
		else {
			this.showAttributes( {}, content);
			
		}
	},
	
	/**
	 * @params t {Object}
	 * @return {void}
	 */
	addRow: function(t) {
		// Get the color from the category that this layer belongs to.
		var headerLevel = 1; // The header level that decides the color (0: main header, 1: sub, …)
		var headerText = t.blixtenPopupHeader || (t.category && t.category.length > headerLevel ? t.category[headerLevel] : null);
		var mainCatConfig = {};
		if (headerText) {
			mainCatConfig = t.category && headerText ? this.categories.headers[headerText] || {} : {};
			
		}
		
		var row = this.makeRow(t, {
			className: this.prefix+"row-left",
//			key: this.nameField,
			label: t.displayName,
			css: t.css || {
				"background-color": mainCatConfig.color
			},
			content: t.content || null // If the row does not get its info from a feature, specify it in the content property
		});
		if (!headerText) {
			this.rowsDiv.append(row); // If row does not belong to any header
			return;
		}
		
		// Put the row below the correct header. If the header does not exist, create it.
		var header = this.rowsDiv.find("#"+this.prefix+"rowheader-"+this._encodeHeader(headerText));
		if (!header.length) {
			header = $("<div class='"+this.prefix+"row-left "+this.prefix+"rowheader' id='"+this.prefix+"rowheader-"+this._encodeHeader(headerText)+"'>"+headerText+"</div>");
			this.rowsDiv.append(header);
		}
		// Avoid reversing the layer order by simply adding rows using header.after()
		var lastRow = header.nextUntil(".blixtenpopup-rowheader").last();
		if (!lastRow.length) {
			header.after(row);
		}
		else {
			// put the row at the end
			lastRow.after(row);			
		}
		row.height(row.height());			
	},
	
	_decodeHeader: function(text) {
		decodeURIComponent(text.replace(/--pr--/gi, "%"));
	},
	
	_encodeHeader: function(text) {
		encodeURIComponent(text).replace(/%/gi, "--pr--");
	},
	
	startingInfo: "<p>Tryck på en rad till vänster för att få mer information om varje enskilt objekt.</p>",
	
	/**
	 * Add items
	 * @property layersDict {Object} Object of layer configs keyed by layer name.
	 * @returns {void}
	 */
	addItems: function(layersDict) {
		var t = null;
		this.removeRows();
		this.showInfo(this.startingInfo);
		for (var layerName in layersDict) {
			t = layersDict[layerName];
			if (t.hasNameField) {
				this.addRow(t);
			}
		}
		this.addHoverEffect();
	},
	
	
	/**
	 * Unselect all rows.
	 */
	unselectAllRows: function() {
		var theClass = this.prefix+"rowselected";
		$("."+theClass).each(function() {
			$(this).removeClass(theClass);
		});
	},
	
	removeRows: function() {
		this.rowsDiv.empty();
	},
	
	
	/**
	 * Add a hover effect to rows.
	 */
	addHoverEffect: function() {
		var self = this;
		$("."+this.prefix+"row-left:not(."+this.prefix+"rowheader)").mouseenter(function() {
			$(this).addClass(self.rowHoverClass);
		});
		$("."+this.prefix+"row-left:not(."+this.prefix+"rowheader)").mouseleave(function() {
			$(this).removeClass(self.rowHoverClass);
		});
		
	},
	
	// --------------- Event listeners --------------------------------------------------------------------
	
	/**
	 * Empty the leftDiv and attrDiv and
	 * close the dialog. Closing the dialog
	 * will in turn trigger "unselect" and
	 * thereby destruction of selected features.
	 */
	blixtenrequest: function(e) {
		if (this.treeDiv) {
			var nodeRoot = this.treeDiv.dynatree("getRoot");
			nodeRoot.removeChildren();
		}
		if (this.attrDiv) {
			this.attrDiv.empty();
			this.attrDiv.parent().find("iframe").remove();
		}
		this.hideDialog();
	},
	
	/**
	 * Event listener. When one or more features are selected
	 * the tree will be filled with content based on the features'
	 * categories and their layer's name.
	 */
	blixtenfeaturesfound: function(e) {
		
		var features = e.features,
			configArr = [],
			f = null,
			layerName = null,
			layersDict = {},
			t = null;
		this.foundFeatures = features;
		
		this.showDialog();
		
		for (var i=0,len=features.length; i<len; i++) {
			f = features[i];
			// -- Debug - remove later
			f.attributes[this.nameField] = f.attributes[this.nameField] || "Ett lager";
			f.attributes[this.urlField] = f.attributes[this.urlField]; // || "http://malmo.se/assets-2.0/img/malmo-stad-logo.png";
			f.attributes[this.tooltipField] = f.attributes[this.tooltipField] || "Some tooltip";
			
			// -- Debug - end
			
			
			layerName = f.layerName;
			if (layerName) {
				// Get the config object for the feature's layer
				t = layersDict[layerName] || sMap.cmd.getLayerConfig(layerName);
				t.fids = t.fids || [];
				
				t = $.extend({}, t); // Clone the config object
				t.fids.push(f.fid);
				
				// Use this URL to fill the popup-iframe.
				if (t.dialogContent) {
					f.attributes[this.urlField] = t.dialogContent;
				}
				// Check if the feature has any feature specific info. In that case
				// register this.
				if (f.attributes[this.urlField] && f.attributes[this.urlField] != "") {
					t.hasNameField = true;
					
				}
				layersDict[layerName] = layersDict[layerName] || t;
			}
		}
		this.addItems( layersDict );
		
//		this.dialogDiv.prev().dblclick(function() {
//			$(this).next().dialog("close");
//			sMap.events.triggerEvent("addtoolbutton", this, {
//				index : 2,
//				label : "Sökresultat",
//				iconCSS : "ui-icon-info",
//				tagID : "button-blixtenpopup-results",
//				bindActivation: false,
//				on: function() {
//					$("#blixtenpopup-dialogdiv").dialog("close");
//					sMap.events.triggerEvent("removeitem", this, {
//						item: $("#button-blixtenpopup-results"),
//						doNotRedrawPosition: true
//					});
//				}
////				left: this.left,
////				right: this.right,
////				margin: this.margin
//			});
//		});
		
		
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.BlixtenPopup2"
	
});