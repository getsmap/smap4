/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Popup = OpenLayers.Class(sMap.Module, {
	
	/**
	 * - selected
	 * - unselected
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["selected", "beforeunselect", "unselected", "layerhidden"],
	
	/**
	 * - popupadded: When a popup is added (triggered on select).
	 * 		@param 
	 * 
	 * - popupremoved: When a popup is removed (triggered on unselect).
	 */
	EVENT_TRIGGERS : ["beforepopupadded", "popupadded", "popupremoved"],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Popup.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Popup.prototype.EVENT_TRIGGERS.concat(
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
	 * On select a popup will be created IF one feature
	 * is selected and the feature's layer has a popup configuration.
	 * @param e {Object}
	 * 		- features {Array}
	 * 		- selectedFeatures {Array}
	 * @returns {void}
	 */
	selected : function(e) {
		// Ugly hack for blixten popup so that popup is NEVER created when blixten is active.
		var blixtenInsts = this.map.getControlsByClass("sMap.Module.Blixten");
		if ((blixtenInsts.length && blixtenInsts[0].active) || ($("#blixtenpopup-dialogdiv").length && $("#blixtenpopup-dialogdiv").dialog("isOpen"))) {
			return false;
		}
		
		var features = e.features,
			selectedFeatures = e.selectedFeatures;
		if (selectedFeatures.length == 1) {
			// Only one feature selected - create a popup for the selected feature.
			var f = selectedFeatures[0];
			
			// However - not if there is no config available for the popup.
			var t = sMap.cmd.getLayerConfig(f.layerName || (f.layer ? f.layer.name : null)) || {};
			//Different popup for coordinate-search
			if (f.attributes["specialForCoordinateSearch"] && f.attributes["specialForCoordinateSearch"] === true){
				t.popup = t.popupCoordinates;
			}
			var popupHTML = t.popup || f.layer.popupHTML || null,
				attributes = f.attributes || {};
			if (!popupHTML) {
				return false;
			}
			
			// Make the popup HTML and specify other things for the popup.
			var html = this.makeHTML(attributes, popupHTML);
			
			var lonLat;
			if (sMap.util.getGeomType(f.geometry)=="line") {
				// For lines - get the center-most node since geometry.getCentroid()
				// only gives the first node.
				if (e.xy) {
					lonLat = this.map.getLonLatFromPixel(new OpenLayers.Pixel(e.xy.x, e.xy.y));					
				}
				else {
					var vertices = f.geometry.getVertices();
					var index = parseInt( vertices.length / 2 );
					var c = vertices[index];
					lonLat = new OpenLayers.LonLat(c.x, c.y);
				}
			}
			else {
				if (e.xy) {
					lonLat = this.map.getLonLatFromPixel(new OpenLayers.Pixel(e.xy.x, e.xy.y));
				}
				else {
					var c = f.geometry.getCentroid();
					lonLat = new OpenLayers.LonLat(c.x, c.y); 
				}
			}
			
			if( t.rmBtn === true ){
				var rmHTML = "<button class='popup-rmBtn'>" + this.lang.rmBtnTxt + "</button>";
				html += rmHTML;
			}

			var popup = new OpenLayers.Popup.FramedCloud(
					"popup-"+f.id,
					lonLat,
					null, // contentSize - OpenLayers.Size
					html, // HTML
					// Make the popup attached to the center of the point.
					new OpenLayers.Icon(null, new OpenLayers.Size(18, -10), new OpenLayers.Pixel(-8, 3)), // new OpenLayers.Size(8,-28), new OpenLayers.Pixel(2,23)),
					true, // closebox
					// on close box click
					function(e) {
						// unselect this feature (will destroy the popup)
						sMap.events.triggerEvent("unselect", this, {
							features : [f]
						});
					}
			);
			popup.panMapIfOutOfView = this.panMapIfOutOfView;
			sMap.events.triggerEvent("beforepopupadded", this, {
				popup: popup,
				feature: f
			});
			
			this.map.addPopup(popup);
			
			if( t.rmBtn === true ){
				$(".popup-rmBtn").click(function(){
					sMap.events.triggerEvent("unselect", this, {
						features : [f]
					});
					var poiLayer = sMap.map.getLayersByName("poiLayer")[0] || null;
					if(poiLayer == null || poiLayer.features.length != 1){
						return;
					}
					else{
						sMap.events.triggerEvent("cleanlayer", this, {
							layer : poiLayer
						});
					}
				});
			}
			
			f.popup = popup;
			
			// IE7 Hack - if calling updateSize without delay an error occurrs
			// because contentDiv has not yet been initialized or something.
			if ( $.browser.msie && parseInt($.browser.version) <= 8 ) {
				sMap.db.popupPopup = popup;
				sMap.db.setPopupSize = function() {
					var popup = sMap.db.popupPopup;
					popup.minSize = new OpenLayers.Size( 300, 120);
					popup.maxSize = new OpenLayers.Size(  this.xMaxSize, this.yMaxSize);
					popup.updateSize();
				};
				setTimeout("sMap.db.setPopupSize();", 20);
			}
			else {
				popup.minSize = new OpenLayers.Size( 300, 120);
				popup.maxSize = new OpenLayers.Size( this.xMaxSize, this.yMaxSize);
				$(document).ready(function() {
					popup.updateSize();
				});
			}
			sMap.events.triggerEvent("popupadded", this, {
				popup: popup,
				feature: f
			});
		}
		else if (selectedFeatures.length > 1) {
			// remove popup if more than one features are selected in total.
			var popups = this.map.popups;
			if (popups && popups.length) {
				for (var i=0; i<popups.length; i++) {
					popups[i].destroy();
				}
			}
		}
		
		if (this.minimizeBtn === true){
			var closeBtn = $(".olPopupCloseBox");
			var minimizeBtn = closeBtn.clone();
			minimizeBtn.prop({
				"id" : "minimize",
				"title": this.lang.minimizeBtn
			});
			minimizeBtn.css({
				"right": "20px",
				"position" : "relative",
				"top" : "0px"
			});
			minimizeBtn.removeClass("olPopupCloseBox").addClass("ui-button-icon-primary ui-icon ui-icon-minus");
			minimizeBtn.click(function(e){	
					// Destroy the popup, but keep the feature selected.
					sMap.events.triggerEvent("unselected", this, {
					});
			});
			minimizeBtn.appendTo(closeBtn);
		}
		
		if (this.allowDrag == true && popup) {
			var dragPopup = new OpenLayers.Control.DragPopup(popup);
			this.map.addControl(dragPopup);
			
			popup.moveTo = function() {
				if (dragPopup.down) {
					OpenLayers.Popup.prototype.moveTo.apply(this, arguments);
				} 
				else {
					OpenLayers.Popup.Anchored.prototype.moveTo.apply(this, arguments);
				}
			}
		}
	},
	/**
	 * On unselect all popups in the map will be destroyed.
	 * @param e {Object}
	 * @returns {void}
	 */
	beforeunselect : function(e) {
		var popup = this.map.popups && this.map.popups.length ? this.map.popups[0] : null;
		if (popup) {
			this.map.removePopup(popup);
			popup.destroy();
		}
	},
	
	unselected : function(e) {
		var popup = this.map.popups && this.map.popups.length ? this.map.popups[0] : null;
		if (popup) {
			this.map.removePopup(popup);
			popup.destroy();
		}
	},
	
	layerhidden: function(e) {
		// Find out which layer the current visible
		// popup (if any) belongs to.
		var popup = this.map.popups.length ? this.map.popups[0] : null;
		if (popup) {
			sMap.events.triggerEvent("unselect", this, {});
		}
	},
	
	/**
	 * Make HTML for the popup based on the attributes
	 * @param attributes
	 * @param config {Array} The configuration for the popup. Tells
	 * what parameters should be extracted and their formatting etc.
	 * @returns {void}
	 */
	makeHTML : function(attributes, popupHTML) {
		return sMap.util.extractAttributes(attributes, popupHTML);
		
		/*var t = null,
			html = $("<div />"),
			tags = {
				"div" : "<div />",
				"a" : "<a />",
				"img" : "<img />",
				"span" : "<span />"
			};
		for (var i=0,len=config.length; i<len; i++) {
			t = config[i];
			
			// Make the tag
			var tag = $(tags[t.tag]);
			html.append(tag);
			
			var text = t.text;
			if (text) {
				// Check if any attributes should be extracted.
				text = this.extractAttributes(attributes, text);
				tag.text(text);
			}
			
			
			if (t.tag=="img" && t.src) {
				var src = this.extractAttributes(attributes, t.src);
				tag.attr("src", src);
			}
			// For <a>-tags add the href attribute.
			if (t.href) {
				var href = this.extractAttributes(attributes, t.href);
				if (t.tag!=="a") {
					var _tag = $("<a target='_blank' />");
					_tag.append(tag);
					html.append(_tag);
					tag = _tag;
				}
				tag.attr("href", href);
			}
			
			if (t.before) {
				tag.before(t.before);
			}
			if (t.after) {
				tag.after(t.after);
			}
			// Add CSS
			var css = t.css || "popup-text1"; // set default css if no css is given
			tag.addClass(css);
		}
		return html.html();*/
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {

	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Popup"
	
});