/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */


var params = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters());
if ( params.CONFIG && params.CONFIG.search("aldreboende") !== -1) {
	document.domain = "malmo.se";
}

var showWithIds = function(param) {
	param = param || null;
	
	var mod = sMap.map.getControlsByClass("sMap.Module.Aldreboenden")[0];
	// IE7 (and maybe 8) bug fix.
	if ( $.browser.msie ) {
		sMap.aldreboendeTempIds = param;
		setTimeout('var mod=sMap.map.getControlsByClass("sMap.Module.Aldreboenden")[0];mod.showWithIds.call(mod, sMap.aldreboendeTempIds);delete sMap["aldreboendeTempIds"];', 200);
	}
	else {
		mod.showWithIds.call(mod, param);
	}
};
if (parent && params.CONFIG && params.CONFIG.search("aldreboende") !== -1) {
	parent.showWithIds = showWithIds;
}
sMap.Module.Aldreboenden = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The URL to the service returning geodata for nursing homes.
	 */
	urlService: location.protocol+"//webapps05.malmo.se/aldreboenden/api/1.0/nursing_homes", //document.location.href.split("?")[0].replace("index.html", "") + "modules/Module/Aldreboenden/temp/nursing_homes.jsonp",
	
	/**
	 * Fields to fetch from the geodata/json service.
	 */
	attributes: ["id", "name", "url", "permalink", "photos", "geo_position_x", "geo_position_y"],
	
	/**
	 * IDs in list (selected by user to be compared).
	 */
	inList: [],
	
	styles: {
		"default": {
			graphicWidth:19,
			graphicHeight: 41,
			externalGraphic: "img/legend/icon_pil_rod.png",
			graphicXOffset: -9,
			graphicYOffset: -31,
			fillOpacity: 1,
			strokeOpacity: 1,
			cursor: "pointer"
		},
		"select": {
			graphicWidth: 19,
			graphicHeight: 41,
			externalGraphic: "img/legend/icon_pil_rod.png",
			graphicXOffset: -9,
			graphicYOffset: -31,
			fillOpacity: 1,
			strokeOpacity: 1,
			cursor: "pointer"
		}
	},
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["popupadded"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Aldreboenden.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Aldreboenden.prototype.EVENT_TRIGGERS.concat(
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
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
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
		
		// For debugging – creates the cookie if it does not exist.
		//if (!$.cookie("nursing_homes_compare")) {
		//$.cookie("nursing_homes_compare", "1|2|50", { expires: 1 });
		//}
		
		//window.showWithIds = this.showWithIds;
		
		var defStyle = new OpenLayers.Style();
		this.layer = new OpenLayers.Layer.Vector("aldreboenden", {
			rendererOptions: {yOrdering: true},
			styleMap: new OpenLayers.StyleMap({
				"default": new OpenLayers.Style( $.extend({}, defStyle.defaultStyle, this.styles["default"] ) ),
				"select": new OpenLayers.Style( $.extend({}, defStyle.defaultStyle, this.styles["select"] ) )
//				"temporary": new OpenLayers.Style(this.styles["default"])
			}),
			selectable: true,
			popupHTML:
					"<span class='aldreboenden-popup'>" +
						"<a href='${permalink}' target='_top'><h3>${name}</h3></a>" +
						"<div>" +
							"<div class='aldreboenden-popup-divleft'>" +
								"<a target='_top' href='${img_large}'><img src='${img_thumbnail}'></img></a>" +
							"</div>" +
							"<div style='display: inline;' class='aldreboenden-popup-divright'>" +
								"<div class='aldreboenden-popup-headerlink'>" +
									"<a style='display: inline;' href='${permalink}' target='_top'>Visa boendet</a>" +
								"</div>" +
								"<div style='display: inline;'>" +
									"<input class='aldreboenden-thepopupcheckbox' type='checkbox'></input>" +
									"<label class='aldreboenden-checkboxlabel'>Lägg till i Min lista</label>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</span>"
		});
		// Add layer like this so that SimpleSelect module captures the event layervisible.
		sMap.events.triggerEvent("addlayer", this, {
			layer: this.layer
		});
		
		/**
		 * Get the IDs of the nursing homes and call the
		 * service for corresponding points and attributes.
		 */
		var params = sMap.cmd.getStartingParamsAsObject();
		var startingIds = params.IDS || null;
		
		this.fetchInitialData(startingIds); // only called once (during initialization)
		
		this.updateList(); // Update inList with latest data from cookie
		
		// IE7 bug fix - redraw when this tab becomes visible
		$(parent.document).find("a[href='#tab-element-map']").click(function() {
			var layer = sMap.map.getLayersByName("aldreboenden")[0];
			layer.redraw();
		});
		
	},
	
	/**
	 * Remove all features from the layer and add only
	 * features with an ID given by the ids array. If ids
	 * is undefined, null or false - all features will be
	 * added. If array is empty, all features
	 * will be removed (if any).
	 *  
	 * 
	 * @param ids {Array}
	 * 		Containing features of type {OpenLayers.Feature.Vector}
	 */
	showWithIds: function(ids) {
		ids = ids || null;
		
		if (!this.layer) {
			alert("no layer found");
			return;
		}
		
		if (this.layer.features.length) {
			sMap.events.triggerEvent("unselect", this, {});
			this.layer.removeAllFeatures(); // Always start with an empty layer
		}
		if (ids && ids instanceof Array && ids.length == 0) {
			this.map.zoomToMaxExtent();
			// All features should be removed, and that's it.
			return;
		}
		
		if (!ids) {
			if (this.features && this.features.length) {
				// Add all features if no IDs are sent in.
				this.layer.addFeatures(this.features);	
			}
		}
		else {
			// Make sure all items are integers.
			ids = $.map(ids, function(item) {
				return parseInt(item);
			});
			var f = null,
				fs = this.features || [],
				newFs = [];
			if (fs && fs.length) {
				for (var i=0,len=fs.length; i<len; i++) {
					f = fs[i];
					if ( $.inArray(f.attributes.nursing_id, ids) != -1) {
						// feature's ID exists in array - add it to the layer
						newFs.push(f);
					}
				}
				this.layer.addFeatures(newFs);
			}
		}
		
		// Zoom to extent of features
		if (this.layer.features.length) {
			this.map.zoomToExtent(this.layer.getDataExtent());
		}
	},
	
	/**
	 * Bind events and stuff
	 * @param e {Object}
	 */
	popupadded: function(e) {
		var self = this;
		var closeBox = $(e.popup.contentDiv).parent().find(".olPopupCloseBox");
		var right = sMap.util.trimCSS(closeBox.css("right")),
			top = sMap.util.trimCSS(closeBox.css("top")),
			offsetX = -12,
			offsetY = -8;
		if ( $.browser.msie && parseFloat($.browser.version) < 9 ) {
			offsetX += 6;
			offsetY += 6;
		}
		
		closeBox.css({
			right: (right + offsetX)+"px",
			top: (top + offsetY)+"px"
		});
		
		this.updateList(); // Update with data from cookie that might have been added from "the Application"
		// Bind click on labels to check of its checkbox.
		$(".aldreboenden-checkboxlabel").click(function() {
			var checked = $(".aldreboenden-thepopupcheckbox").prop("checked");
			$(".aldreboenden-thepopupcheckbox").prop("checked", !checked);
			$(".aldreboenden-thepopupcheckbox").change();
		}).parent().css({
			"white-space": "nowrap"
		});
		// IE7 did not understand $(..).prev() so I used a specific class for the checkbox.
		$(".aldreboenden-thepopupcheckbox").change(function() {
			var isChecked = $(this).prop("checked");
			self.onCheckChange(isChecked);
		});
		var f = this.getSelectedFeature();
		//debug.log("This feature's id is: "+f.attributes.nursing_id);
		var checked = $.inArray( f.attributes.nursing_id, this.inList ) != -1;
		$(".aldreboenden-popup").find("input[type='checkbox']").prop("checked", checked);
		
		var popup = e.popup;
		popup.minSize = new OpenLayers.Size( 300, 120);
		popup.maxSize = new OpenLayers.Size( 300, 250);
		popup.updateSize();
	},
	
	/**
	 * 
	 * @param isChecked
	 */
	onCheckChange: function(isChecked) {
		isChecked = isChecked || false;
		var f = this.getSelectedFeature();
		if (isChecked) {
			// Checkbox -> unchecked: point removed from list
			this.changeList(f.attributes.nursing_id, true);
			this.updateCookie();
		}
		else {
			// Checkbox -> checked: point added to list
			this.changeList(f.attributes.nursing_id, false);
			this.updateCookie();
		}
		// Let the parent application know that a change happened.
		//if (parent) {
		//document.domain = "malmo.se";
		parent.incomingUpdate();
		//debug.log("Called: parent.incomingUpdate()");
		//}
		
	},
	
	/**
	 * Return the currently selected feature in this module's layer.
	 * @returns {OpenLayers.Layer.Vector}
	 */
	getSelectedFeature: function() {
		return this.layer.selectedFeatures.length ? this.layer.selectedFeatures[0] : null;
	},
	
	
	/**
	 * Stores IDs from this.inList in the cookie so that
	 * the application containing this map can know if
	 * houses have been added to list or not. The opposite
	 * is done by updateList.
	 * @return {void}
	 */
	updateCookie: function() {
		// Skriv kaka
//		if ($.cookie('nursing_homes_compare')) {
		// If the cookie holds an empty string it returns null – therefore I cannot make this "cookie exists" check here.
		$.cookie('nursing_homes_compare', this.inList.join("|"), { expires: 365, domain: "malmo.se", path: "/" }); // Add this 3rd parameter when using with "the Application": { expires: 365, domain: "malmo.se", path: "/" };
		//debug.log("Current data in cookie: " + $.cookie('nursing_homes_compare') );
//		}
	},
	
	/**
	 * Update the list with the latest content in the cookie.
	 * The list (inList) is the array containing all IDs
	 * that are currently in the comparing list of the user.
	 * The opposite is done by updateCookie.
	 */
	updateList: function() {
		// Read the cookie and store in inList.
		var val = $.cookie("nursing_homes_compare");
		//debug.log("Current data in cookie: " + val );
		if (!val) {
			val = "";
			this.inList = []; // reset
		}
		else {
		
			// Make all items into integers (not strings).
			var list = val.split("|");
			this.inList = $.map(list, function(item) {
				return parseInt(item);
			});
		}
	},
	
	/**
	 * Update the inList array with a new ID.
	 * @param nursingId {Integer}
	 * @param change {Boolean} true: add, false: remove
	 * @return {void}
	 */
	changeList: function(nursingId, change) {
		change = change || false;
		
		nursingId = parseInt(nursingId);
		
		if (change === true && $.inArray(nursingId, this.inList) == -1) {
			// Add to array if it does not already exist.
			this.inList.push( nursingId );
		}
		else {
			// Remove nursingId from array.
			var index = $.inArray(nursingId, this.inList);
			this.inList.splice(index, 1);
		}
	},
	
	/**
	 * 
	 */
	fetchInitialData: function(startingIds) {
		
		$.ajax({
			url: this.urlService,
			context: this,
			data: {
				fields: this.attributes.join(",")
			},
			dataType: "jsonp",
			cache: true,
			jsonpCallback: "foo",
			success: function(obj) {
				this.fetchFeatures(obj.nursing_homes);
				this.showWithIds(startingIds); // Show only features holding an ID in this array
			}
		});
	},
	
	/**
	 * Read the JSON object and add create and add features (points)
	 * to the layer. Store attributes in each feature.
	 * @param arr {Array} Array of objects.
	 */
	fetchFeatures: function(arr) {
		var t, geom, f,
			attributes = {},
			fs = [];
		
		for (var i=0,len=arr.length; i<len; i++) {
			t = arr[i];
			t.nursing_id = t.id; // Change name of id to avoid overriding feature id.
			
			attributes = {};
			$.extend(attributes, t);
			attributes.img_thumbnail = t.photos.thumbnail.url;
			attributes.img_large = t.photos.large.url;
			attributes.name = decodeURIComponent(t.name);
			if ( $.inArray(t.nursing_id, this.inList ) != -1 ) {
				// If it exists in compare list – remember as checked.
				attributes.inlist = true;
			}
			else {
				// If not in list – remember as non-checked.
				attributes.inlist = false;
			}
			geom = new OpenLayers.Geometry.Point(t.geo_position_x, t.geo_position_y);
			f = new OpenLayers.Feature.Vector(geom, attributes);
			fs.push(f);
		}
		this.features = fs;
		
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Aldreboenden"
	
});