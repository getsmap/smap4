/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.LayerTree = OpenLayers.Class(sMap.Module, {
	
	// <><><><><><><><> Public properties below (should be set in *_conf.js file) <><><><><><><><><><><><><><>
	width: null, // required!
	showFadedLinks: null,
	showCheckboxAfterTextIcon: null,
	enableTooltip: null,
	folderIcon: null,
	iconSelectableLayer: null,
	iconSelectableLayerActive: null,
	addPrintButton: null,
	printStyleSheetURL: null,
	// <><><><><><><><> Public properties end <><><><><><><><><><><><><><>
	
	
	// <><><><><><><><> Private properties below <><><><><><><><><><><><><><>
	/**
	 * The array with configs to be used for building up the tree.
	 * Each item must be an object containing these keys:
	 * 	- displayName {String}
	 * 	- category {Array} E.g. [1stCat, 2ndCat, 3rdCat] Each category forms a folder.
	 */
	configArr: null,
	/**
	 * Contains all layers added to the tree.
	 */
	layers: [],
	
	/**
	 * Config for categories (folders) in the layer tree.
	 */
	categories: {
		headers: {},
		layers: {}
	},
	// <><><><><><><><> Private properties end <><><><><><><><><><><><><><><><>
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["afterapplyingwebparams", "layerhidden"], //"layervisible"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.LayerTree.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.LayerTree.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
		this.configArr = sMap.config.layers.overlays;
		
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
     * Draw the tree based on the config.layers.overlays array.
     * @returns {void}
     */
	drawContent : function() {
		$("#mapDiv").addClass("layertree-width");
	},

	checkBox: function(layerName) {
		var theId = "layertree-label-" + layerName;
		var cbLabel = $("#"+theId);
		if (cbLabel.parent().hasClass("dynatree-selected") !== true) {
			cbLabel.click();
		}
	},
	
	getNameFromSpanID: function(spanID) {
		return spanID.replace("layertree-label-", "");
	},
	
	/**
	 * Event listener. Uncheck a layer's checkbox if it was made
	 * invisible outside of dynatree.
	 * 
	 * @param e {Object}
	 * @returns {void}
	 */
	layerhidden: function(e) {
		if (this.treeDiv) {
			var node = this.treeDiv.dynatree("getTree").getNodeByKey( encodeURIComponent(e.layer.name) );
			if (node) {
				node.select(false);			
			}
		}
	},
	
	/**
	 * Event listener. Check a layer's checkbox if it was made
	 * visible outside of dynatree.
	 * 
	 * @param e {Object}
	 * @returns {void}
	 */
//	layervisible: function(e) {
//		if (this.treeDiv) {
//			var node = this.treeDiv.dynatree("getTree").getNodeByKey( encodeURIComponent(e.layer.name) );
//			if (node) {
//				node.select(true);			
//			}			
//		}
//	},
	
	/**
	 * 
	 * @param nodes
	 * @returns
	 */
	getLayerNamesFromNodes: function(nodes) {
		// Extract layer names from nodes
		var self = this;
		return $.map(nodes, function(node) {
			return self.getLayerNameFromNode.call(self, node);
		});
	},
	
	/**
	 * 
	 * @param node
	 * @returns
	 */
	getLayerNameFromNode: function(node) {
		var span = $(node.span);
		var spanID = span.find(".dynatree-title").attr("id");  // => .dynatree-title
		var name = this.getNameFromSpanID(spanID);
		return name;
		
	},
	
	
	layerConfigs: {},
	
	/**
	 * Cache to speed things up
	 */
	cacheLayerConfigs: function() {
		var i, t,
			arr = sMap.config.layers.overlays || [];
		for (i=0,len=arr.length; i<len; i++) {
			t = arr[i];
			this.layerConfigs[t.name] = t;	
		}
	},
	
	create: function() {
		var self = this,
			sideDiv = null;
		
		this.cacheLayerConfigs();
		
		if (this.right) {
			sMap.events.triggerEvent("addsidedivright", this, {
				width: this.width + 8
			});
			sideDiv = $("#sideDivRight");
		}
		else {
			sMap.events.triggerEvent("addsidedivleft", this, {
				width: this.width + 8
			});
			sideDiv = $("#sideDivLeft");
		}
		this.sideDiv = sideDiv;
		
		this.treeDiv = $("<div id='layertree' />");
		$(this.div).append(this.treeDiv);
		// this.treeDiv.css("width", this.width+"px");
		
		/**
		 * Make the layer tree height adaptive to the window size.
		 */
		// var onResize = function() {
		// 	var sideDivHeight = $(self.div).parent().innerHeight();
			
		// 	// For some reason the innerHeight does not give enough
		// 	// space for the module's div (this.div). Therefore,
		// 	// I remove another 3 px and it seems not to give scrollbars anymore.
		// 	$(self.div).outerHeight(sideDivHeight-headerHeight-3);
		// 	var marginTop = 50,
		// 		headerHeight = $("#layertree-headerdiv").outerHeight();
		// 	self.treeDiv.outerHeight( sideDivHeight - marginTop );
		// };
		// $(window).resize(onResize);
		// setTimeout('$(window).trigger("resize")', 2000);

		sideDiv.append(this.div);
		$(this.div).addClass("layertree-maindiv");
		
		this.treeDiv.dynatree({
			title: "Geodata",
			debugLevel: 0,
			imagePath: sMap.config.proxyHost,
			autoCollapse: false,
			activeVisible: true,
			noLink: false,
			clickFolderMode: 1,
			fx: { height: "toggle", duration: 200 },
			checkbox: true,
			selectMode: 3, // 3 means checking a folder checks all childrens' checkboxes.
			onDeactivate: function(node) {},
			onActivate: function(node) {},
			/**
			 * This what happens checking/unchecking a checkbox.
			 * @param flag {Boolean} Node became checked or not.
			 * @param node {Object} The node that was checked/unchecked.
			 * @returns {void}
			 */
			onSelect: function(flag, node) {
				
				// Extract the difference between previously selected layers (files)
				// and currently visible layers (files).
				
				var nodes = [];
				function getAllChildrenInNode(node) {
					var children = node.getChildren();
					if (children) {
						// Make an array with the names of layers currently visible.
						$(children).each(function() {
							var theNode = this;
							if (theNode.data.isFolder === true) {
								getAllChildrenInNode(theNode); // Dig deeper into the node
							}
							else {
								// This is a file - push it into the array
								nodes.push(theNode);
							}
						});
					}
					else {
						// This is a file - push it into the array
						nodes.push(node);
					}
				}
				getAllChildrenInNode(node);
				
				// Extract layer names from nodes
				var layerNames = self.getLayerNamesFromNodes.call(self, nodes);
				self.changeVisibility(layerNames, flag);
				
			},
			children: [],
			onClick: function(node, event) {
				var targetIsTitle = $(event.target).hasClass("dynatree-title"),
					targetIsCheckbox = $(event.target).hasClass("dynatree-checkbox");
				var hasCheckbox = $(node.span).find(".dynatree-checkbox").length > 0; //!node.data.isFolder;
				var isChecked = node.isSelected();
				
				if (targetIsTitle) {
					var flag = null;
					//if (node.data.isFolder) {
						// Folder: Check if it's expanded or not. If not -> flag is true, otherwise -> false.
						//flag = node.bExpanded ? false : true;
					//}
					//else {
						// File - toogle checkbox
					
					if (hasCheckbox) {
						flag = !node.isSelected();
						node.select(flag); // select or unselect
					}
					else {
						// For categories without checkbox, a little special solution...
						flag = !node.bExpanded;
					}
					
					var toggle = (!node.bExpanded && flag) || (node.bExpanded && !flag) ? true : false;
					if (toggle) {
						node.toggleExpand();
					}
					
				}
				else if (targetIsCheckbox) {
					if (isChecked && node.bExpanded) {
						// Expand folder
						node.toggleExpand();
					}
					else if (!isChecked && !node.bExpanded) {
						node.toggleExpand();
					}
				}
				
			},
			onDblClick: function(node, event) {
				//node.toggleExpand();
			},
			onCustomRender: function(node) {
				// Add these icons to the node:
				// 	textLink, legend, span (label)
				
				var title = node.data.title,
					name = node.data.key, // name is used as a key for each layer node as a unique identifier. name is always unique - unlike displayName.
					tooltip = node.data.tooltip ? "title='"+node.data.tooltip+"'" : "",
					isFolder = node.data.isFolder;
				var t = self.getLayerConfig(name); //sMap.cmd.getLayerConfigsBy("name", name)[0];
				
				// 1. Create a textLink icon.
				var className = "layertree-texticon";
					textLink = "",
					layersConf = self.categories.layers,
					headersConf = self.categories.headers;
				
				var parent = node.getParent(),
					parentTitle = null;
				if (parent) {
					parentTitle = parent.data.title;
				}
				var configNode = isFolder === true ? self.getHeaderCat(title, parentTitle) : (layersConf && layersConf[title] ? layersConf[title] : {});

				if (!configNode instanceof Object) {
					if (self.showFadedLinks) {
						className += " layertree-notexticon";
						textLink = "<img id='layertree-textlink-"+encodeURIComponent(title)+"' class='"+className+"' src='img/icon_externlank.png'></img>";
					}
				}
				else {
					if (!configNode.url) {
						className += " layertree-notexticon";
					}
					textLink = "<img id='layertree-textlink-"+encodeURIComponent(title)+"' class='"+className+"' src='img/icon_externlank.png'></img>";
				}
				if (self.iconSelectableLayer && t && t.selectable && textLink.length) {
					// Add a little different icon for selectable layers to indicate
					// that they can be selected.
					textLink = $(textLink);
					textLink.attr("src", self.iconSelectableLayer);
					textLink = textLink.appendTo($("<div />")).parent().html();
				}
				// 2. Make a legend with a URL defined in the layer's config property "style.default".
				var legend = "",
					labelID = ""; // ID with html key
				if (t) {
					var legendURL = (t.style && t.style["default"] && t.style["default"].externalGraphic) ? t.style["default"].externalGraphic : null;
					
					var hover = t.legend && t.legend.hover ? t.legend.hover : {};
					legend = "<img class='layertree-legendimg' src='"+legendURL+"' customhoverimg="+(hover.url || "")+"></img>";
					labelID = "id='layertree-label-" + t.name + "'";
				}
				else {
					if (self.folderIcon) {
						// Append a folder icon
						legend = "<img src='"+self.folderIcon+"'></img>";
					}	
				}
				// 3. Make a label
				var className = "dynatree-title";
				if (configNode && configNode.cssClass) {
					className += (" " + configNode.cssClass);
				}
				if (isFolder === true) {
					className += " layertree-folder";
				}
				var tooltipClassName = tooltip.length ? " layertree-tooltip" : ""; // Only tags with a tooltip will get this class.
				var label = "<span "+tooltip+" "+labelID+" class='"+className+tooltipClassName+"'>"+title+"</span>";
				
				var checkbox = "";
				if ( $(node.span).find(".dynatree-checkbox").length == 0 && self.showFadedCheckboxes) {
					// Add a disabled checkbox
					checkbox = "<span class='dynatree-checkbox-faded'></span>";
				}
				return textLink + checkbox + legend + label;
			},
			onExpand: function(flag, node) {
				self.modifyNodes();
			}
		});
		this.addItems();		
		// this.treeDiv.height( this.sideDiv.height() - 10 );
		var tree = this.treeDiv.dynatree("getTree");
		tree.renderInvisibleNodes();
		
		// Check all checkboxes that should start checked.
		for (var i=0,len=this.startChecked.length; i<len; i++) {
			tree.selectKey(this.startChecked[i], true);
		}
		this.modifyNodes();
		this.addHeaderDiv();
	},
	
	getLayerConfig: function(name) {
		return this.layerConfigs[name] || null;
	},
	
	/**
	 * Let the core apply webparams before creating the tree.
	 * Thereby any OL-params will result in checked boxes.
	 */
	afterapplyingwebparams: function(e) {
		this.create();
	},
	
	showTooltip: function(e) {
		var title = $(this).attr("title");
		$(this).validationEngine('showPrompt', title, 'load');
	},
	
	hideTooltip: function(e) {
		$(this).validationEngine("hideAll");
	},
	
	/**
	 * 
	 * @param layerNames {Array} Containing the OL-name of each layer that is selected.
	 * @param change {Boolean}
	 * @returns {void}
	 */
	changeVisibility: function(layerNames, change) {
		var name = null;

		for (var i=0,len=layerNames.length; i<len; i++) {
			name = layerNames[i];
			var event = change===true ? "showlayer" : "hidelayer";
			sMap.events.triggerEvent(event, this, {
				layerName: name
			});
		}
	},
	
	addHeaderDiv: function() {
		var div = $("<div id='layertree-headerdiv' />"),
			btnSlide = null;
		div.addClass("ui-widget-header");
		
		if (this.toggleButton) {
			btnSlide = $("<button>"+this.lang.btnSlideLabel+"</button>");   //$("<label>\<\<</label>");
			div.append(btnSlide);
			btnSlide.button(/*{
				icons: {
					primary: "ui-icon-circlesmall-minus"
				}
			}*/);
			var self = this;
			btnSlide.click(function(e) {
				self.toggleSideDiv.call(self, e);
				return false;
			});
		}
		if (this.turnOffButton) {
			// This button turns off all layers
			btnTurnOff = $("<button>"+this.lang.btnTurnOffLabel+"</button>");   //$("<label>\<\<</label>");
			div.append(btnTurnOff);
			btnTurnOff.button(); //{icons: {primary: "ui-icon-circlesmall-minus"}}
			var self = this;
			btnTurnOff.click(function(e) {
				sMap.cmd.hidealllayers();
			});
		}
		if (this.addPrintLegendButton) {
			if (this.lbButtonToToolsMenu){
				sMap.events.triggerEvent("addtomenu", this, {
					index : this.lbToolbarIndex,
					iconCSS : "ui-icon-print",
					menuId : this.addLegendButtonToToolsMenu,
					label : this.lang.btnPrintLegends,
					tagID : "button-printlegend",
					on: this.printLegends
				});
			}
			else{
				sMap.events.triggerEvent("addtoolbutton", this, {
					index : this.lbToolbarIndex,
					iconCSS : "ui-icon-print",
					label : this.lang.btnPrintLegends,
					tagID : "button-printlegend",
					on: this.printLegends
				});
			}
//			var btnPrintLegends = $("<button id='blixten-btnlayertreeprint'>"+this.lang.btnPrintLegends+"</button>");
//			div.prepend(btnPrintLegends);
//			btnPrintLegends.button();
//			var self = this;
//			btnPrintLegends.click(function() {
//				self.printLegends();
//			});
		}
		// Add a print button
		if (this.addPrintButton) {
			var btnPrint = $("<button id='blixten-btnlayertreeprint'>"+this.lang.btnPrint+"</button>");
			div.prepend(btnPrint);
			btnPrint.button();
			var self = this;
			btnPrint.click(function() {
				self.previewPrintLayers();
			});
		}
		if (this.right) {
			div.addClass("headerdiv-right");
		}
		else {
			div.addClass("headerdiv-left");
		}
		
		$(this.div).prepend(div);
		if (btnSlide && this.startToggled) {
			btnSlide.click();
		}
		
	},
	
	addToggleButton: function() {
		var self = this;
		var expandButton = $("<div id='layertree-expandbutton'>+</div>");
		$("#mapDiv").append(expandButton);
		if (this.right) {
			expandButton.addClass("lt-expbutton-right");
		}
		else {
			expandButton.addClass("lt-expbutton-left");
			$("#mapDiv").css("left", "0px");
		}
		expandButton.on("click", function() {
			self.toggleSideDiv();
			return false;
		});
	},
	
	removeToggleButton: function() {
		var expandButton = $("#layertree-expandbutton");
		expandButton.empty().remove();				
	},
	
	toggleSideDiv: function(e) {
		var sideDiv = this.sideDiv,
			self = this,
			w = this.width;
		if (sideDiv.is(":visible")) {
			// --- Is going to be hidden ---
			if (this.right) {
				sideDiv.addClass("ltree-hidden");
				setTimeout(function() {
					$("#mapDiv").removeClass("layertree-width");
					self.map.updateSize();
					sideDiv.hide();
					self.addToggleButton();
					$(window).resize();
				}, 300);


				// sideDiv.animate({"margin-left": w}, this.toggleSpeed, function() {
				// 	$(this).hide();
				// 	self.afterHidden();
				// });
			}
		}
		else {
			// --- Is going to be shown ---
			if (this.right) {
				this.removeToggleButton();
				sideDiv.show();
				setTimeout(function() {
					sideDiv.removeClass("ltree-hidden");
					$("#mapDiv").addClass("layertree-width");
					// self.map.updateSize();
					$(window).resize();
				}, 1);
			}
		}
	},
	
	/**
	 * Called when nodes are rendered. Takes away the
	 * folder and file icons.
	 * @returns {void}
	 */
	modifyNodes: function() {
		var self = this;
		// Remove the folder and file icons.
		$(".dynatree-icon").remove();
		if (!this.showFadedLinks) {
			$(".layertree-notexticon").remove();
		}
		$(".layertree-legendimg").click(function() {
			var name = decodeURIComponent( $(this).siblings(".dynatree-title").attr("id").split("-")[2] );
			var t = self.getLayerConfig(name);
			var node = self.treeDiv.dynatree("getTree").getNodeByKey( encodeURIComponent(t.name) );
			var flag = node.isSelected() ? false : true;
			node.select(flag);
		});
		if (this.showCheckboxAfterTextIcon) {
			$(".layertree-texticon").each(function() {
				var checkbox = $(this).prev(".dynatree-checkbox");
				$(this).insertBefore(checkbox);
			});
		}
		
		// Define click for the "show text"-icon.
		var cbxs = $(".dynatree-checkbox");
		$(".layertree-texticon").not(".layertree-notexticon").unbind("click").click(function(e, ui) {
			self.toggleTextWindow.call(self, e.target);
		});
		cbxs.siblings(".dynatree-title").unbind("mouseover").mouseover(function() {
			$(this).css("text-decoration", "underline");
		}).unbind("mouseout").mouseout(function() {
			$(this).css("text-decoration", "none");
		});
		
		// These are hard-coded stuff for ÖP2012
		$(".mainheader").parent().parent().css({
			"border" : "1px solid #ccc",
			"border-width" : "0px 1px 1px 1px",
			"padding" : "10px"
		});
		$(".mainheader").parent().next().css("margin-top", "5px");
		$(".mainheader:first").parent().parent().css("border-width", "1px 1px 1px 1px");
		
		// These are hard-coded stuff for ÖP2012
		$(".subheader").parent().parent().css({
			"border" : "1px solid #ccc",
			"border-width" : "0px 1px 1px 1px",
			"padding" : "10px"
		});
		$(".subheader").parent().next().css("margin-top", "5px");		
		$(".subheader:first").parent().parent().css("border-width", "1px 1px 1px 1px");
		
		
		// Add hover effect to text-link icons - but not to text links
		// that are faded (those having class "layertree-notexticon") if any.
		$(".layertree-texticon").each(function() {
			if ( !$(this).hasClass("layertree-notexticon") ) {
				$(this).mouseenter(function() {
					$(this).addClass("layertree-texticon-hover");
				});
				$(this).mouseleave(function() {
					$(this).removeClass("layertree-texticon-hover");
				});
			}
		});
		
		if (this.enableTooltip) {
			var edgeOffset = this.right === true ? 42 : 3;
			$(".layertree-tooltip").tipTip({
				defaultPosition: this.right === true ? "left" : "right",
				edgeOffset: edgeOffset
			});
		}
		
		var moveWithCursor = function(e) {
			$('.layertree-legend-hover').css({
				left:  e.pageX+20,
				top:   e.pageY-50,
				display: "block"
			});
		};
		
		var onLegendHover = function() {
			// Only show big image if it has loaded correctly.
			if (this.complete) {
				if (!$.browser.msie && (!this.naturalWidth || this.naturalWidth === 0)) {
					// naturalWidth not supported by IE it seems so only do this check with other browsers.
					return false;
				}
				var img = $(this).clone();
				img.hide();
				img.addClass("layertree-legend-hover");
				var customHoverUrl = img.attr("customhoverimg");
				if (customHoverUrl && customHoverUrl.length > 0) {
					img.attr("src", customHoverUrl);
				}
				
				$("body").append(img);
				$(document).bind("mousemove", moveWithCursor);
			}
		};
		var onLegendHoverOut = function() {
			$(document).unbind("mousemove", moveWithCursor);
			$(".layertree-legend-hover").remove();
		};
		
		// Make the legend image big on hover
		$(".layertree-legendimg").mouseenter(onLegendHover).mouseleave(onLegendHoverOut);
		
		
		this.applyNodesConfig();
		
		
	},
	
	applyNodesConfig: function() {
		// Add a background-color to main headers
		var changeColor = function(t, name) {
			if (t.color) {
				var h = $(".layertree-folder:contains('"+name+"')").parent().parent();
				h.css({
					"background-color": t.color
				});
//				if (t.cssClass)
//					h.addClass(t.cssClass);
				h.find("."+t.cssClass).css("background-color", "none !important");
			}
			if (t.bordercolor){
				var h = $(".layertree-folder:contains('"+name+"')").parent().parent();
				h.css("border-color", t.bordercolor);
			}
		};
		var configHeaders = this.categories.headers,
			name,
			t;
		for (name in configHeaders) {
			t = configHeaders[name];
			changeColor(t, name);
			var subCats = t.subheaders || {};
			for (name in subCats) {
				t = subCats[name];
				changeColor(t, name);
			}
		}
	},
	
	
	
	/**
	 * Returns an appropriate size (adapted to the window)
	 * of the metadata dialogs.
	 * 
	 * @returns {Object}
	 */
	getDialogSize: function() {
		var maxH = 700,
			maxW = 500,
			winH = $(window).height() - 100,
			winW = $(window).width() - 200;
		var h = winH,
			w = winW;
		if (h > maxH) {
			h = maxH;
		}
		if (w > maxW) {
			w = maxW;
		}
		return {
			w: w,
			h: h
		};
		
	},
	
	toggleTextWindow: function(img) {
		img = $(img);
		// Get the label for this node so that we can make out
		// which URL to visit.
		var title = decodeURIComponent( img.attr("id") ).replace("layertree-textlink-", "");
		var configLayers = this.categories.layers || {},
			configHeaders = this.categories.headers || {};
		var configNode = configHeaders[title] || configLayers[title];
		if (!configNode){
			$.each(configHeaders, function(key, value){
				configNode = value.subheaders[title] ? value.subheaders[title] : configNode;
			});
		}
		var content = configNode.url;
		var dialogId = "layertree-textwindow-"+$.base64.encode(title).replace(/=/gi, "").replace(/\+/gi, "").replace(/\-/gi, "");
		var prevDialog = $("#"+dialogId);
		if (prevDialog.length ) {
			prevDialog.dialog("close");
			return;
		}
		
		// Create the textWindow dialog
		var textWindow = $("<div class='layertree-textwindow' id='"+dialogId+"' />");
		
		if (this.iconSelectableLayerActive && this.iconSelectableLayer && img.attr("src") === this.iconSelectableLayer) {
			// Add a little different icon for selectable layers to indicate
			// that they can be selected.
			img.attr("src", this.iconSelectableLayerActive);
		}
		else {
			img.attr("src", "img/icon_externlank_active.png");
		}
		
		var size = this.getDialogSize();
		
		
		
		var nrs = $(".layertree-textwindow").length;
		var center = parseInt($(window).width() / 2 - size.w/2);
		var dialogTitle = this.dialogTitlePrefix ? this.lang.dialogTitlePrefix + title : title;
		var self = this;
		textWindow.dialog({
			title: dialogTitle,
			position: [center+nrs*(-40), 50+nrs*30],
			width: size.w,
			height: size.h,
			modal: false,
			autoOpen: false,
			close: function() {
				$(this).dialog("destroy");
				$(this).empty().remove();
				if (self.iconSelectableLayerActive && self.iconSelectableLayer && img.attr("src") === self.iconSelectableLayerActive) {
					// Add a little different icon for selectable layers to indicate
					// that they can be selected.
					img.attr("src", self.iconSelectableLayer);
				}
				else {
					img.attr("src", "img/icon_externlank.png");
				}
			},
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
//				var iframe = $(this).find("iframe");
//				iframe.width( $(this).width() - 10);
//				iframe.height( $(this).height() - 10);
			}
		});
		sMap.util.addDialogMinimizeButton(textWindow);
		
		if (this.addPrintLegendButton) {
			// Add a print button in the header
			var btnMiniPrint = $('<button class="ltree-btn-miniprint">Skriv ut</button>');
			textWindow.prev().find(".ui-dialog-title").after(btnMiniPrint);
			// Some cosmetic adjustments.
			textWindow.prev().css({
				"white-space": "nowrap",
				"padding": "0 1em"
			}).find(".ui-dialog-title").css({
				"margin-top": "7px"
			});
		}
		if (this.addPrintLegendButton) {
			btnMiniPrint.button({
				icons: {
					primary: "ui-icon-print"
				}
			});
			btnMiniPrint.click(function() {
				var iframe = $(this).parent().next().find("iframe");
				var src = iframe.attr("src");
				this.miniPrintWin = window.open('', '', 'left=400,top=200,width=600,height=600');
				var self = this;
				var div = $("<div />");
				div.load(config.proxyHost + src, function() {
					if ($.browser.msie && parseInt($.browser.version) <= 9) {
						self.miniPrintWin.document.write( $(this).html() );
					}
					else {
						$(this).appendTo( $(self.miniPrintWin.document.body) );
						self.miniPrintWin.print();
						self.miniPrintWin.close();					
					}
				});
			});
		}
		textWindow.hide(); // Avoid interference with iframe scrolling
		textWindow.empty();
		if (content.substring(0, 4) == "http") {
			// We are dealing with a URL.
			
			var iFrame = $('<iframe width="470" height="290" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0"></iframe>'); // scrolling='no'
			iFrame.attr("src", content);
			textWindow.append(iFrame);
			if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
//				iFrame.css({
//					"overflow": "auto",
//					"-webkit-overflow-scrolling": "touch" 
//				}).addClass("overthrow");
				textWindow.css({
					"overflow": "auto",
					"-webkit-overflow-scrolling": "touch" 
				}).addClass("overthrow");
				iFrame.attr("height", "5000");
				
			}
		}
		else {
			textWindow.html(content);
		}
		textWindow.dialog("open");
	},
	
	addItems: function() {
		var configArr = this.configArr;
		
		var itemsObj = {children: []},
			t = null;
		
		this.startChecked = [];
		
		for (var i=0,len=configArr.length; i<len; i++) {
			t = configArr[i];
			if (!t.displayInLayerSwitcher) {
				continue;
			}
			
			var parent = itemsObj;
			
			var cats = t.category || [];
			for (var j=0,jlen=cats.length; j<jlen; j++) {
				var catName = cats[j];
				var _parent = this.getFolder(parent.children, catName);
				if (_parent) {
					// Use the existing folder
					parent = _parent;
					continue;
				}
				else {
					var ft = this.getHeaderCat(catName, parent.title || null);
					// Create a new folder
					var nodeFolder = {
							title: catName,
							isFolder: true,
							children: [],
							expand: ft.expand || false,
							color: ft.color || null,
							hideCheckbox: ft.hideCheckbox || false,
							tooltip: ft.tooltip || null,
							icon: null //"http://xsbk0236.sbkmalmo.local:8080/sMap/img/table.gif"
					};
					parent.children.push(nodeFolder); // Append new folder as a subfolder of parent.
					parent = nodeFolder; // Let the new nodeFolder be the parent for subfolders or files
				}
			}
			var nodeFile = {
					title: t.displayName,
					key: encodeURIComponent( t.name ),
					hideCheckbox: t.hideCheckbox || false,
					tooltip: t.tooltip || null
					//icon: (t.style && t.style["default"] && t.style["default"].externalGraphic) ? encodeURIComponent( t.style["default"].externalGraphic ) : null,
			};
			
			if (t && t.startVisible) {
				// Append layers which should start checked
				this.startChecked.push(t.name);
			}
			// If a dialogContent property is defined for this layer - store it
			// in the url dict.
			if (!this.categories.layers) {
				this.categories.layers = {};
			}
			if (t.dialogContent) {
				this.categories.layers[t.displayName] = this.categories.layers[t.displayName] || {};
				$.extend(this.categories.layers[t.displayName], {
					url: t.dialogContent,
					hideCheckbox: t.hideCheckbox || false
				});
			}
			
			//this.layers.push(t.name); // Store all names for layers added to the tree.
			
			parent.children.push(nodeFile);
		}
		
		var nodeRoot = this.treeDiv.dynatree("getRoot");
		nodeRoot.addChild(itemsObj.children);
	},
	/**
	 * Help function to addItems
	 * @param arr {Array}
	 * @param catName {String}
	 * @returns {Object || null}
	 */
	getFolder: function(arr, catName) {
		
		for (var i=0,len=arr.length; i<len; i++) {
			var title = arr[i].title;
			if (title == catName) {
				return arr[i];
			}
		}
		return null;
	},
	
	getHeaderCat: function(catName, parentCatName) {
		parentCatName = parentCatName || catName;
		
		var t = null,
			name,
			obj = {},
			theCats = this.categories.headers;
		
		var getTheCat = function(cats) {
			obj = {};
			for (name in cats) {
				obj = cats[name];
				if (name === parentCatName) {
					if (catName === parentCatName) {
						// There is no parent, so return this guy
						return obj;
					}
					else if (obj.subheaders && obj.subheaders[catName] instanceof Object) {
						// Return the parent's child
						obj = obj.subheaders[catName];
						return obj;
					}
				}
			}
			// Dig deeper, into the subcategories
			var result;
			for (name in cats) {
				obj = cats[name];
				var sh = obj instanceof Object ? obj.subheaders : null;
				if (!sh || $.isEmptyObject(sh)) {
					continue;
				}
				result = getTheCat(sh);
				if (result) {
					return result;
				}
				else {
					continue;
				}
			}
			return null; // If nothing found anywhere
			
		};
			
		return getTheCat(theCats) || {};
	},
	
	printLegends: function() {
		var self = this;
		var t,
			arr = sMap.config.layers.overlays,
			src,
			row,
			imagesLoading = 0,
			allRowsAdded = false,
			html = $("<div />"),
			table = $("<table />"),
			isVisible,
			style = '<style type="text/css" media="print">#btn-printwin {display:none;}</style>',
			onLoad = function() {
				imagesLoading -= 1;
				if (allRowsAdded && imagesLoading <= 0 && self.printLegendWin) {
					//self.printLegendWin.focus();
//					self.printLegendWin.print();
//					self.printLegendWin.close();
				}
			};
		html.append(style);
		for (var i=0,len=arr.length; i<len; i++) {
			t = arr[i];
			
			isVisible = this.map.getLayersByName(t.name).length ? this.map.getLayersByName(t.name)[0].getVisibility() : false; 
			if (!isVisible) {
				continue;
			}
			
			src = t.style && t.style["default"].externalGraphic ? t.style["default"].externalGraphic : null;		
			if (t.legend && t.legend.hover && t.legend.hover.url) {
				// This one everrides default external graphic
				src = t.legend.hover.url;
			}
			row = $("<tr><td></td><td>"+t.displayName+"</td></tr>");
			
			if (src) {
				var img = "<img src='"+src+"'></img>";
				row.find("td:first").append(img);
				imagesLoading += 1;
			}
			
			table.append(row);
			row.find("img").css({
				"height": "45px"
			}).on("load", onLoad);
			row.css({
				"font-size": "14px",
				"font-weight": "bold"
			});
			row.find("td").css({
				"border": "1px solid #aaa",
				"padding": "2px 10px"
			});
		}
		if (table.children().length === 0) {
			alert("Inga lager tända");
			return false;
		}
		html.append("<h1>"+this.lang.legendHeader + (sMap.config.mapName ? sMap.config.mapName[sMap.langCode] : "...mapName missing in config") + "</h1>");
		html.append(table);
//		dialog.append(table);
		
		allRowsAdded = true;
		
		if (this.printLegendWin) {
		    this.printLegendWin.focus();
		    this.printLegendWin.close();
		    this.printLegendWin = null;
		}
        this.printLegendWin = window.open('', '', 'left=400,top=200,width=600,height=400');
        this.winIsOpen = true;
        /*this.printLegendWin.onunload = function() {
            self.printLegendWin = null;
            self.winIsOpen = false;
        };*/

        var btnPrint = '<button id="btn-printwin" media="screen" style="padding:10px 20px;margin:20px;cursor:pointer;" '+
        '>Skriv ut</button>';  // onclick="print();return false;"
        
        btnPrint.attr("onclick", "print();");
        
        html.prepend(btnPrint);
		
        this.printLegendWin.document.write(html.html());
		
//		$(this.printLegendWin.document).find("#btn-printwin").click(function() {
//		    self.printLegendWin.print();
//		    //return false;
//		});
		
		// If it takes more than 3 sec to load images (maybe one or more images have a broken source) – print it anyways.
		/*setTimeout(function() {
		    if (self.printLegendWin) {
		        imagesLoading = 0;
			    onLoad();
		    }
		}, 3000);*/
		
	},
	
	/**
	 * Create a print preview dialog with the checked layers
	 * in a list and a checkbox.
	 */
	previewPrintLayers: function() {
		var self = this;
		// Get checked layers containing a dialogContent link.
		var tree = this.treeDiv.dynatree("getTree");
		var nodes = tree.getSelectedNodes(),
			theNodes = [];
		for (var i=0,len=nodes.length; i<len; i++) {
			var n = nodes[i];
			var span = $(n.span);
			if (span.find(".layertree-notexticon").length === 0) {
				// This node has a link – add it to the array.
				var spanID = span.find(".dynatree-title").attr("id");
				var name = self.getNameFromSpanID(spanID);
				var t = self.getLayerConfig(name);
				theNodes.push(t);
			}
		}
		
		// Now, we have all checked nodes' configuration object. Use
		// this to create a new dialog containing these layers.
		if (!this.printDialog) {
			this.printDialog = $("<div id='layertree-dialogprintpreview'><div id='layertree-printpreviewinfo'>"+this.lang.printPreviewInfo+"</div></div>");
			this.printDialog.dialog({
				title: this.lang.btnPrint,
				position: "center",
				width: 275,
				autoOpen: false,
				height: 400,
				resizable: false,
				modal: true,
				close: function() {
					$(this).find("fieldset").find("legend").siblings().remove();
				},
				buttons: [
				          {
				        	text: this.lang.btnPrint,
				        	click: function() {
				        		self.printLayers();
				        		$(this).dialog("close");
				        	}
				          }
				]
			});
			var layersFieldSet = $("<fieldset id='layertree-printfieldset'><legend>"+this.lang.printLegendText+"</legend></fieldset>");
			this.printDialog.append(layersFieldSet);
		}
		if (this.printDialog.dialog("isOpen")) {
			this.printDialog.dialog("close"); // Will empty the dialog
		}
		this.printDialog.dialog("open");
		
		// Add the layers to the dialog
		var t = null,
			fieldSet = this.printDialog.find("fieldset");
		for (var i=0,len=theNodes.length; i<len; i++) {
			t = theNodes[i];
			var row = $("<div class='layertree-printrow' />"),
				checkbox = $("<input type='checkbox' checked='checked' />"),
				label = $("<label>"+t.displayName+"</label>");
			fieldSet.append(row);
			row.append(checkbox).append(label);
			label.click(function() {
				var cb = $(this).prev();
				cb.prop("checked", !cb.prop("checked"));
			});
			row.data("url", t.dialogContent);
		}
	},
	
	printLayers: function() {
		var self = this;
		sMap.cmd.loading(true, {
			text: this.lang.textLoadingPrint
		});
		var rows = $(".layertree-printrow:has(input:checked)");
		var layersToLoad = rows.length;
		var container = $("<div />"); // container for all html docs to be printed.
		var proxy = sMap.config.proxyHost || "";
		rows.each(function() {
			var url = $(this).data("url");
			var site = $("<div />");
			container.append(site);
			site.css("border", "1px solid #ccc");
			site.load(proxy + url, function(response, status, xhr) {
				layersToLoad -= 1;
				if (layersToLoad <= 0) {
					// All layers loaded
					self.onPrintLoadDone(container);
				}
			});
		});
	},
	
	onPrintLoadDone: function(container) {
//		var self = this;
		sMap.cmd.loading(false);
		var win = window.open("", "layertreeprintwin", 'height=500,width=400,location=no,menubar=no,status=no,toolbar=no');
		win.document.write('<link rel="stylesheet" type="text/css" href="'+this.printStyleSheetURL+'"></link>');
		win.document.write(container.html());
		sMap.db.layertreeprintwin = win;
		setTimeout("var win = sMap.db.layertreeprintwin;win.focus();win.print();win.close();sMap.db.layertreeprintwin=null;win=null;", 100);
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.LayerTree"
	
});