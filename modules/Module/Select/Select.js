/**
 * @author Johan Lahti
 * @copyright Malmö stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Select = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 * 
	 * 
	 * "select": Will render one or more features as selected.
	 *     - add {Boolean} (default false) If true, old selected features will not be unselected
	 *     					before selecting new features.
	 *     - dialog {Boolean} (default false). If true, a dialog will be created if more than one
	 *     					feature was fetched. If false, all fetched features will be selected.
	 * "unselect": Will render a feature as unselected. If no feature
	 *     in the event object, all features in the selection array will be unselected.
	 * "getfeatures": Requests all visible layers (or input layers) and collects all
	 *     features matching the filter or bounds.
	 * "fetchandselectfeatures": Triggers "getfeatures" and then selects found features.
	 *     Takes a filter or bounding box as input.
	 */
	EVENT_LISTENERS : ["select", "unselect", "fetchselectfeatures", "layerhidden", "afterprint", "fetchedfeatures", "selectboxmode","selectclickmode"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 * 
	 * - selected: When one (1) feature have been selected (triggered when user
	 *        selects one selectable feature OR only one feature is returned from request.
	 * - fetchedfeatures: Triggered when feature(s) have been fetched after request.
	 *         @returns:
	 *             @param e {Object} Containing these params (in addition to the standard ones):
	 *                 e.features {Object} All features keyed by layer name.
	 *                            E.g. {"fastigheter" : [feature1, feature2, ...], "byggnader" : [...]}
	 * 
	 */
	EVENT_TRIGGERS : ["selected", "unselected", "beforeselect", "beforeunselect", "getfeatures",  "fetchselectfeatures"],
	
	handlers : {},
	
	/**
	 * @property clickedOnDialogRow {Boolean}
	 *     A hack to keep track of when user has clicked on a row in the
	 *     select choice dialog, so that unselect is not triggered on hover out.
	 */
	clickedOnDialogRow : false,
	
	/**
	 * @property selectLayer {OpenLayers.Layer.Vector}
	 * 		The layer which is used for rendering WFS and vector features.
	 */
	selectLayer : null,
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Select.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Select.prototype.EVENT_TRIGGERS.concat(
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
		
		// Bind click to triggering of event "fetchselectfeatures".
		switch (this.handlerType) {
		case ("box"):
			this.bindBox();
			break;
		default:
			this.bindClick();
		}
		
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		if (this.addSelectWithKey) {
			var nav = this.map.getControlsByClass("OpenLayers.Control.Navigation")[0];
			nav.enableZoomBox();
		}
		
		// Don't request features on map click.
		for (var name in this.handlers) {
			this.handlers[name].deactivate();
		}
		
		// Call the deactivate function of the parent class
		return sMap.Module.prototype.deactivate.apply(
	            this, arguments
	        );
	},
	
	destroy : function() {
		
		// Destroy select layer
		this.map.removeLayer(this.selectLayer);
		this.selectLayer.destroy();
		
		// Destroy dialog
		var dialog = $("#select-selectdialog");
		if (dialog.length) {
			dialog.dialog("destroy");
			dialog.empty().remove();
			dialog = null;
		}
		
		
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		// When allowing to select multiple features - disable shift zoom
		// since this will not allow multiple select.
//		if (this.addSelectWithKey) {
//			var nav = this.map.getControlsByClass("OpenLayers.Control.Navigation")[0];
//			nav.disableZoomBox();
//		}
		
		this.addSelectLayer();
	},
	
	
	afterprint: function(e) {
		this.selectLayer.setZIndex(this.zIndex);
	},
	
	/**
	 * When a layer is hidden – unselect any selected features
	 * if they belong to this layer.
	 * @param e
	 */
	layerhidden: function(e) {
		sMap.events.triggerEvent("unselect", this, {});
	},
	
	addSelectLayer : function() {
		// Add select layer
		this.selectLayer = new OpenLayers.Layer.Vector("selectLayer", {
			styleMap : new OpenLayers.StyleMap({
				"default" : new OpenLayers.Style(this.defaultStyle),
				"select" : new OpenLayers.Style(this.selectStyle)
			}),
			rendererOptions: {yOrdering: true, zIndexing: true}
		});
		this.map.addLayer(this.selectLayer);
		this.selectLayer.setZIndex(this.zIndex);
		
		// Store styleMap since it will be overridden when adding features,
		// and we want it back after that.
		this.selectLayerStyleMap = {};
		OpenLayers.Util.applyDefaults(this.selectLayerStyleMap, this.selectLayer.styleMap);
	},
	
	selectclickmode : function(e){
		this.bindClick();
	},
	
	bindClick : function() {
		if (this.handlers.box) {
			this.handlers.box.deactivate();
		}
		this.handlers.click = this.handlers.click ||
					new OpenLayers.Handler.Click(this,
				{click: this.onClick}, this.handlerOptions.click );
		this.handlers.click.activate();
		
	},
	
	selectboxmode : function(e){
		this.bindBox();
	},
	
	bindBox : function() {
		if (this.handlers.click) {
			this.handlers.click.deactivate();
		}
		this.handlers.box = this.handlers.box ||
					new OpenLayers.Handler.ModBox(this,
				{done: this.onBoxEnd}, this.handlerOptions.box );
		this.handlers.box.activate();
	},
	
	/**
	 * On click inside the map...
	 * @param e {Object}
	 * @returns {void}
	 */
	onClick : function(e) {
		var x = e.xy.x,
			y = e.xy.y,
			r = this.clickRadius;
		var shiftKeyPressed = e.shiftKey,
			addSelectWithKey = this.addSelectWithKey,
			dialogIfMany = this.dialogIfMany;
		
		/**
		 * Before the selection occurrs. This event might be
		 * unnecessary since "fetchselectfeatures" would work fine.
		 * However, "beforeselect" is triggered a little earlier
		 * and also has a more appropriate name.
		 */
		sMap.events.triggerEvent("beforeselect", this, {
			xy : e.xy,
			add : (addSelectWithKey && shiftKeyPressed),
			dialog : !shiftKeyPressed//dialogIfMany show dialog if shiftkey is not pressed
		});
		
		
		var pxSW = new OpenLayers.Pixel(x-r, y+r),
			pxNE = new OpenLayers.Pixel(x+r, y-r);
		var lonLatSW = this.map.getLonLatFromViewPortPx(pxSW),
			lonLatNE = this.map.getLonLatFromViewPortPx(pxNE);
		var bounds = new OpenLayers.Bounds(lonLatSW.lon, lonLatSW.lat, lonLatNE.lon, lonLatNE.lat);
		
		sMap.events.triggerEvent("fetchselectfeatures", this, {
			bounds : bounds,
			add : (addSelectWithKey && shiftKeyPressed),
			dialog : dialogIfMany //!shiftKeyPressed//dialogIfMany show dialog if shiftkey is not pressed
		});
	},
	
	onBoxEnd : function(box) {
		var shiftKeyPressed = this.handlers.box.dragHandler.keyMaskPressed,
			bounds = null,
			addSelectWithKey = this.addSelectWithKey,
			dialogIfMany = this.dialogIfMany;

		if (box.CLASS_NAME == "OpenLayers.Pixel") {
			// Make the point into a bounds based on click radius.
			var r = this.clickRadius;
			var pxSW = new OpenLayers.Pixel(box.x-r, box.y+r),
				pxNE = new OpenLayers.Pixel(box.x+r, box.y-r);
			var lonLatSW = this.map.getLonLatFromViewPortPx(pxSW),
				lonLatNE = this.map.getLonLatFromViewPortPx(pxNE);
			bounds = new OpenLayers.Bounds(lonLatSW.lon, lonLatSW.lat, lonLatNE.lon, lonLatNE.lat);
		}
		else if (box.CLASS_NAME == "OpenLayers.Bounds") {
			var pxSW = new OpenLayers.Pixel(box.left, box.bottom),
				pxNE = new OpenLayers.Pixel(box.right, box.top);
			var lonLatSW = this.map.getLonLatFromViewPortPx(pxSW),
				lonLatNE = this.map.getLonLatFromViewPortPx(pxNE);
			bounds = new OpenLayers.Bounds(lonLatSW.lon, lonLatSW.lat, lonLatNE.lon, lonLatNE.lat);
		}
		sMap.events.triggerEvent("fetchselectfeatures", this, {
			bounds : bounds,
			add : (addSelectWithKey && shiftKeyPressed),
			dialog : dialogIfMany //!shiftKeyPressed//dialogIfMany show dialog if shiftkey is not pressed
		});
		
	},
	
	/**
	 * Get all features matching the input filter or bounds and then select
	 * them. If no parameter layers is sent in, only visible layers will be requested. Note
	 * that only layers in the config.overlays array will be requested.
	 * @param e
	 *     - filter {OpenLayers.Filter} {Optional}
	 *     - bounds {Array} {Optional} [s, w, n, w]
	 *     - layers {Array ({String})} An array containing layer names of
	 *              the layers that will be requested.
	 *     - add {Boolean} (default false) If true, old selected features will not be unselected
	 *     					before selecting new features.
	 *     - dialog {Boolean} (default false). If true, a dialog will be created if more than one
	 *     					feature was fetched. If false, all fetched features will be selected.
	 * @returns {void}
	 */
	fetchselectfeatures : function(e) {
		this.add = e.add;
		this.useDialog = e.dialog || false;
		
		// When features have been fetched - select it/them but ONLY
		// if fetchselectfeatures was triggered.
		// Get the features. The listener, just defined above, will respond.
		sMap.events.triggerEvent("getfeatures", this, {
			options: {
				filter : e.filter || null,
				bounds : e.bounds || null,
				select: true // select features after fetch
			}
		});
	},
	
	fetchedfeatures: function(evt) {
		var features = evt.features;
		if (evt.select && features.length) {
			if (this.forceOne && this.forceOne === true) {
				// Get the nearest feature from the click.
				features = [sMap.util.getNearestFeature(features, evt.bounds.getCenterLonLat())];
			}
			
			sMap.events.triggerEvent("select", this, {
				features : features,
				add : this.add,
				dialog : this.useDialog
			});
		}
		else {
			sMap.events.triggerEvent("unselect", this, {});
		}
	},
	
	/**
	 * Select one or more features. If more than one
	 * a select dialog will be created.
	 * @param e {Object}
	 *     - features {Object} || {Array( {OpenLayers.Feature.Vector} )}
	 *             If Object, the array of features is keyed by layer name.
	 * @returns {void}
	 */
	select : function(e) {
		var features = e.features;
		
		if (!features.length) {
			return false;
		}
		
		if (e.add === true) {
			/**
			 * Features will be added to current selection (shift/ctrl-click).
			 * Features that are already selected and about to 
			 * be selected again will be unselected ("toggled").
			 */
			var featuresDict = this.toggleSelection(features);
			features = featuresDict.select; // These guys will be selected
			sMap.events.triggerEvent("unselect", this, {
				features : featuresDict.unselect // These guys will be unselected
			});
		}
		else {
			// We don't want to add features to old selection if add!==true
			sMap.events.triggerEvent("unselect", this, {
				doNotDestroy: e.doNotDestroy
			});
		}
		// Else - just add the feature(s) right off...
		if ($("#select-selectdialog").length) {
			$("#select-selectdialog").dialog("close");				
		}
		
		if (e.dialog === true && features.length > 1) {
			// Create a dialog where user has to pick one feature.
			this.createChoiceDialog(features, {
				add : e.add
			});
		}
		else {
			this.selectFeatures(features, {
				add : e.add
			});
		}
		debug.log("Number of selected features: " + this.selectLayer.features.length);
	},
	
	
	/**
	 * Creates two arrays:
	 * - select
	 * - unselect
	 * 
	 * Removes features which are already selected from the select array
	 * and adds them to a new array of features which should be unselected.
	 * @param features {Array({OpenLayers.Feature.Vector})}
	 * @returns {Object}
	 *     - select -> {Array({OpenLayers.Feature.Vector})}
	 *     - unselect -> {Array({OpenLayers.Feature.Vector})}
	 */
	toggleSelection : function(features) {
		var selectArr = [],
			unselectArr = [],
			f = null,
			selectedFeatures = this.selectLayer.features;
		for (var i=0,len=selectedFeatures.length; i<len; i++) {
			f = selectedFeatures[i];
		}

		for (var i=0,len=features.length; i<len; i++) {
			f = features[i];
			//var popup = f.popup || null;
			
			var index = this.featureInArray(selectedFeatures, f);
			if (index === -1) {
				selectArr.push(f);
				//f.popup = popup;
			}
			else {
				unselectArr.push(f);
				//f.popup = popup;
			}
		}
		
		
		return {
			select : selectArr,
			unselect : unselectArr
		};
	},
	
	/**
	 * Checks if feature f is present in an array of features.
	 * The comparison is made using function "featureIsSame".
	 * 
	 * @param features {Array({OpenLayers.Feature.Vector})}
	 * @param f {OpenLayers.Feature.Vector}
	 * @returns {Integer} -1 is not present. Otherwise returns the index
	 *     where feature was found.
	 */
	featureInArray : function(features, f) {
		var oldF;
		for (var i=0,len=features.length; i<len; i++) {
			oldF = features[i];
			
			// Check if features are the same -> here defined as "geometry and attributes are the same".
			if (this.featureIsSame(oldF, f)) {
				return i;
			}
		}
		return -1;
	},
	/**
	 * Checks if two features are same by comparing their geometry
	 * and data properties. If both are matching, returns true. Otherwise
	 * false.
	 * @param oldF {OpenLayers.Feature.Vector}
	 * @param f {OpenLayers.Feature.Vector}
	 * @returns {Boolean}
	 */
	featureIsSame : function(oldF, f) {
		var result = false;
		if (oldF.geometry && oldF.data && f.geometry && f.data) {
			result = (oldF.geometry.toString() == f.geometry.toString() && oldF.data.toString() == f.data.toString() );
		}
		return result;
	},
	
	/**
	 * Unselect one or more features. If no parameter features is
	 * sent in all currently selected features will be unselected.
	 * @param e {Object}
	 *     - features {Array( {OpenLayers.Feature} )} Optional.
	 * @returns {void}
	 */
	unselect : function(e) {
		var features = e.features,
			doNotDestroy = e.doNotDestroy || false;
			selectLayer = this.selectLayer;
		if (!features) {
			// Unselect ALL features (if any).
			features = selectLayer.features;
		}
		if (features.length) {
			// Unselect all features in the array
			// Make a copy of the features array so that we are not
			// iterating over the array we are modifying.
			var f = null,
				_features = features.slice();
			
			/**
			 * If you want to retrieve the features that were unselected you should
			 * listen to this event instead of "unselected" since the features will
			 * be destroyed (if you don't send in doNotDestroy==true).
			 */
			sMap.events.triggerEvent("beforeunselect", this, {
				features : features // The feature(s) that will be unselected.
			});
			
			for (var i=0,len=_features.length; i<len; i++) {
				f = _features[i];
				var popup = f.popup || null;
				this.renderAsUnselected(f, {
					doNotDestroy : doNotDestroy
				});
				f.popup = popup;
			}
			
			sMap.events.triggerEvent("unselected", this, {
				features : features, // The feature(s) that were unselected.
				selectedFeatures : this.selectLayer.features // Remaining selected features after features have been unselected.
			});
		}
	},
	/**
	 * Render a feature as unselected (removes it from selectLayer).
	 * @param f {OpenLayers.Feature.Vector}
	 * @param options {Object}
	 *     - doNotDestroy {Boolean} If true, feature f and lf will not be destroyed, only removed.
	 * @returns {void}
	 */
	renderAsUnselected : function(f, options) {
		options = options || {};
		var doNotDestroy = options.doNotDestroy || false;
		
		if (f) {
			var selectLayer = this.selectLayer;
			// Remove feature from selection arrays (for draw layer and for select module).
			//OpenLayers.Util.removeItem(this.selectedFeatures, f); // select module

			
			
			//var defStyle = selectLayer.name=="selectLayer" && f.oldStyle ? f.oldStyle : selectLayer.styleMap.styles["default"].defaultStyle;
			f.layer = selectLayer;
			
			// Destroy features in select layer. The problem here is that the feature we've got
			// is not the same feature as in the selectLayer. Therefore we need to find the
			// feature's twin and remove this one. This is done by comparing geometry and
			// data properties of the features.
			var layersFeatures = selectLayer.features;
			for (var i=0,len=layersFeatures.length; i<len; i++) {
				var lf = layersFeatures[i];
				if (!lf || !f) {
					// If one of the features don't exist - a feature might have disappeared
					// from selectLayer after checking its length... In this case, break.
					break; 
				}
				if ( this.featureIsSame(lf, f) ) {
					
					if (doNotDestroy === true) {
						selectLayer.removeFeatures([lf]);
					}
					else {
						//selectLayer.removeFeatures([lf]);
						selectLayer.destroyFeatures([lf]); // destroy feature in layer
						f.destroy(); // destroy feature sent in to this function
					}
				}
			}
		}
	},
	
	/**
	 * Select all features in the array. Viable options are:
	 * - add {Boolean} Add features to current selection.
	 * - dialog {Boolean} Show a dialog (if more than one feature
	 *        in array) where user is forced to pick one feature to
	 *        select.
	 * 
	 * @param features {Array({OpenLayers.Feature.Vector})} Containing features to be selected.
	 * @returns  {void}
	 */
	selectFeatures : function(features, options) {
		options = options || {};
		
		if (features.length==0) {
			return;
		}
		
		var add = options.add || false;
		
		//this.selectLayer.features = this.selectLayer.features.concat(features);
		// Render feature(s) as selected.
		for (var i=0,len=features.length; i<len; i++) {
			// Add to selected features array
			this.renderAsSelected( features[i] );
			//features[i].selectid = OpenLayers.Util.createUniqueID("sMap.Select.ID_");
		}
		// The point of sending along the parameter selectedFeatures
		// is that e.g. a pop-up should not be created
		// if more than one feature is selected at the same time.
		// Hack: selectedEvent allows to specify a custom name of the selected event.
		sMap.events.triggerEvent(this.selectedEvent || "selected", this, {
			features : features, // newly selected features
			selectedFeatures : this.selectLayer.features, // all selected features
			// 'add' let's listener know if the selection was added to previous
			// selection without comparing the arrays above.
			add : add,
			xy: options.xy || (this.handlers.click && this.handlers.click.evt && this.handlers.click.active ? this.handlers.click.evt.xy : null)
		});
	},
	/**
	 * Render a feature as selected by adding it to the selectLayer.
	 * The style of the feature is fetched from the configuration
	 * file's property "style". 
	 * @param feature {OpenLayers.Feature.Vector}
	 * @returns {void}
	 */
	renderAsSelected : function(feature) {
		
		var selectLayer = this.selectLayer;
		
		// Old style (unselected style) must be saved for WMS layers since it will otherwise
		// be derived from selectLayer when unselected.
		feature.oldStyle = {};
		OpenLayers.Util.applyDefaults(feature.oldStyle, feature.style);
		
		var t = sMap.cmd.getLayerConfig(feature.layerName);
		var _selectStyle = $.extend({}, this.selectStyle);
		var selectStyle = $.extend(_selectStyle, (t && t.style && t.style.select ? t.style.select : {})); //this.selectLayer.styleMap.styles["select"].defaultStyle);
		
		// If selectStyle contains externalGraphic – make sure this is kept at select.
//		if (feature.oldStyle.externalGraphic) {
//			selectStyle.externalGraphic = feature.oldStyle.externalGraphic;
//		}
		selectStyle.graphicZIndex = this.zIndex;
		
		
		if (selectStyle.rules) {
			var tempSelStyle = new OpenLayers.Style(selectStyle);
			tempSelStyle.addRules(selectStyle.rules);
			var tempStyleObj = tempSelStyle.createSymbolizer(feature);
			$.extend(selectStyle, tempStyleObj || {});
			tempSelStyle = null;
		}
		
		
		
//		var rules = selectStyle.rules,
//			rule = null,
//			symbolizer = null,
//			applies = false;
//		if (rules && rules.length) {
//			for (var i=0,len=rules.length; i<len; i++) {
//				rule = rules[i];
//				applies = rule.evaluate(feature);
//				if (applies) {
//					symbolizer = rule.symbolizer || null;
//					selectStyle = symbolizer || selectStyle;
////					$.extend(selectStyle, symbolizer); // extend or just assign, what to do?
//					break;
//				}
//			}
//		}
		feature.style = selectStyle;
		selectLayer.addFeatures([feature]);
		selectLayer.setZIndex(this.zIndex);
		selectLayer.drawFeature( feature, selectStyle );
	},
	
	
	/**
	 * Takes an array of layer configs and removes all layers that
	 * are either invisible or not added to the map.
	 * 
	 * @param arr {Array( {Object} )}
	 * @returns {void}
	 */
	getVisibleLayersConfig : function(arr) {
		var visible =  [];
		for (var i=0,len=arr.length; i<len; i++) {
			var layer = this.map.getLayersByName(arr[i].name)[0];
			if (layer && layer.CLASS_NAME == "OpenLayers.Layer.WMS" && layer.calculateInRange() && layer.getVisibility() === true) {
				visible.push(arr[i]);
			}
		}
		return visible;
	},

	/**
	 * 
	 * Send in an array of features to this method and it will either
	 * create a choice-dialog (if no. features > 1) or select the
	 * feature (if no. feature == 1). If array does not contain any
	 * features, nothing will happen. This function could be called
	 * from outside also to programmatically force select (or select-dialog...).
	 * 
	 * @param features {Array( Object | OpenLayers.Feature.Vector )}
	 *     An array of features.
	 * @param options {Object} Optional.
	 *     -
	 */
	createChoiceDialog : function(features, options) {
		var self = this;
		options = options || {};
		
		this.clickedOnDialogRow = false;
		
		this.fDict = {};
		// If any features were found... get the one(s) nearest to the click....
		if (features.length) {	
			
			//------ 1st: Create popup content. ------------------------
			// Add features in order - with the features nearest click position first.
			
			var dialogDiv = $("#select-selectdialog");
			
			var pos = sMap.util.getMapOrigo();
			var x = pos.left + 50,
				y = pos.top + 3,
				createDialog = false;
			
			if (!dialogDiv.length) {
				dialogDiv = $("<div id='select-selectdialog'></div>");
				createDialog=true;
			}
			else {
				dialogDiv.children().remove();
			}
			var len = (this.maxLength > features.length) ? features.length : this.maxLength,
				rows=0,
				selectedFeatures = this.selectLayer.features;
			var table = $("<table />");
			dialogDiv.append(table);
			for (var i=0; i<len; i++) {
				var f = features[i];
				var name = f.layerName,
					rowId = OpenLayers.Util.createUniqueID("selectrowfeature_");
				this.fDict[rowId] = f;
				
				var t = sMap.cmd.getLayerConfig(name),
					style;
				if (t) {
					style = t.style || null;
					if (style) {
						style = style["default"];
					}
					else {
						style = t.defaultStyle;						
					}
				}
				var iconURL = style ? style.externalGraphic : null;
				
				var rowTag = $("<tr id='"+rowId+"' unselectable='on' class='unselectable selectdialog-rowtag'><td class='selectmany-td-first'><img src='"+iconURL+"'></img></td><td>"+t.displayName + "</td></tr>");
				table.append(rowTag);
				rows += 1;
				
				/**
				 * Define hover and click for each row.
				 */
				$(rowTag).hover(function(e) {
					// Add hover effect.
					$(this).addClass("selectdialog-rowtag-hover");
					// Select the feature we are hovering.
					var rowId = $(this).attr("id");
					var f = self.fDict[rowId];
					
					/**
					 * When selecting one object we want to use xy of the clicked location.
					 * However, here want to use the center point of the feature. Otherwise
					 * the popup ends up at the same place for each feature.
					 */
					var c = f.geometry.getCentroid();
					var px = self.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(c.x, c.y));
					self.selectFeatures([f], {
						add : options.add,
						xy: new OpenLayers.Pixel(px.x, px.y)
					});
					if (self.fitBoundsIfNotContained) {
						// Zoom to the feature's extent IF it's not contained in viewport.
						var bounds = f.geometry.getBounds(),
							viewportBounds = self.map.getExtent();
						var contains = viewportBounds.containsBounds(bounds);
						if (contains === false) {
							// Zoom to feature's extent
							self.map.zoomToExtent(bounds);
						}
					}
					
				}, function(e, ui) {
					// Unselect feature
					$(this).removeClass("selectdialog-rowtag-mousedown");
					$(this).removeClass("selectdialog-rowtag-hover");
					
					
					var rowId = $(this).attr("id");
					var f = self.fDict[rowId];
					if (self.clickedOnDialogRow !== true) {
						self.unselect({
							features : [f],
							doNotDestroy : true // If destroyed it cannot be selected again.
						});
					}
				});
				$(rowTag).click(function(e) {
					// Close dialog on click.
					self.clickedOnDialogRow = true;
					
					$(this).removeClass("selectdialog-rowtag-mousedown");
					$("#select-selectdialog").dialog("close");
					
					// Destroy all other features connected to the dialog
					// except the selected one, to clean up memory.
					$(this).siblings().each(function() {
						var rowId = $(this).attr("id");
						var f = self.fDict[rowId];
						f.destroy();
					});
					
					
					
				});
				$(rowTag).mousedown(function(e) {
					$(this).addClass("selectdialog-rowtag-mousedown");
				});	
			}
			
			if (createDialog===true) {
				sMap.util.createDialog(dialogDiv, {
					title : this.lang.chooseFeature,
					width: "auto",
					close: function() {
						$(this).dialog("destroy");
					},
					height: "auto",
					minHeight : 100,
					maxHeight: 400,
					position : [x, y],
					modal: false
				});
				$("#select-selectdialog").parent().attr("id", "select-dialogparent");
			}
			
			$(document).ready(function() {
				$("#select-selectdialog").dialog("open");
				
				// Adapt the dialog size and its contents to the
				// common minimum appropriate size
				
				// Get the widest rowTag
//				var rowTagMaxWidth=0, tempW=0;
//				$(dialogDiv).children().each(function() {
//					tempW = $(this).outerWidth();
//					rowTagMaxWidth = tempW > rowTagMaxWidth ? tempW : rowTagMaxWidth; // store the highest record
//				});
//				
//				var w = rowTagMaxWidth + 50; // derive width from row div
//				
//				dialogDiv.width(w); // set dialog div's width
//				$("#select-selectdialog").dialog("option", "width", w + 4);
//				
//				// Set a maximum rows limit so the dialog won't be to high.
//				var maxRows = 8;
//				rows = rows<=maxRows ? rows : maxRows;
//				var h = rows * (sMap.util.trimCSS(rowTag.css("height"))+2+2);
//
//				dialogDiv.height(h);
//				$("#select-selectdialog").dialog("option", "height", h + 30);
//				
//				// Make sure all rows have equal length so they will
//				// all fill the dialog width.
//				dialogDiv.children().each(function() {
//					$(this).css({
//						"width" : w + "px"
//					});
//				});
				
			});
			dialogDiv.css("overflow-x", "hidden");
		}
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Select"
	
});