/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.ExtractClick = OpenLayers.Class(sMap.Module, {
	
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
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.ExtractClick.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.ExtractClick.prototype.EVENT_TRIGGERS.concat(
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
		sMap.events.triggerEvent("unselect", this, {});
		sMap.util.showMouseMoveText(this.lang.mouseMoveText);
		sMap.events.triggerEvent("deactivate", this, {
			module: "sMap.Module.Select"
		});
		this.addClickControl();
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		if (this.dialog) {
			this.dialog.dialog("destroy");
			this.dialog.empty().remove();			
		}
		
		// Unbind events
		sMap.util.hideMouseMoveText();
		
		// Activate select again
		sMap.events.triggerEvent("activate", this, {
			module: "sMap.Module.Select"
		});
		
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
		var eventChooser = "addtoolbutton";
		if (this.addToToolsMenu) {
			eventChooser = "addtomenu";
		}
		
		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			label : this.displayName,
			hoverText : this.hoverText,
			iconCSS : "ui-icon-pencil",
			tagID : "btn-extractclick",
			left: this.left,
			right: this.right,
			menuId : this.addToToolsMenu
		});
	},
	
	addClickControl: function() {
		var self = this;
		
		this.handler = new OpenLayers.Handler.Point(this, {
			done: function(geom) {
				sMap.util.hideMouseMoveText();
				// Request the WMS-service
				sMap.cmd.loading(true);
				var r = this.radius || 1;
				var bounds = new OpenLayers.Bounds(geom.x-r, geom.y-r, geom.x+r, geom.y+r);
				var p = this.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(geom.x, geom.y));
				var data = {
					service: "WFS",
					srsName: this.map.projection,
					typeName: this.wfsName,
					version: this.wfsVersion,
					request: "GetFeature",
					format: "text/geojson",
					outputFormat: "json",
					maxFeatures: 1,
					bbox: bounds.toBBOX()
				};
//				var params = "";
//				for (var key in data) {
//					params = params+"&"+key+"="+data[key];
//				}
				
//				params = params.substring(1);
				
				var def = $.Deferred();
				def.done(function(arr) {
					// Extend attributes from features.
					var i, attributes = {};
					for (i=0,len=arr.length; i<len; i++) {
						$.extend(attributes, arr[i].attributes);
					}
					self.onFeaturesFound(attributes);
				});
				def.fail(function(text) {
					alert("Ett fel uppstod i kommunikationen med tjänsten.\nMeddelande: "+text);
				});
				
				var i, ws, requests=0, features=[],
					wfsNames = this.wfsNames;
				for (i=0,len=wfsNames.length; i<len; i++) {
					data.typeName = wfsNames[i];
					requests += 1;
					$.ajax({
						type: "POST",
						url: sMap.config.proxyHost + this.wfsService,
						data: data,
						dataType: "text",
						context: this,
						success: function(text) {
							var format = new OpenLayers.Format.GeoJSON();
							var fs = format.read(text);
							features = features.concat(fs[0]); // Use only the first feature in the array.
							requests -= 1;
							if (requests <= 0) {
								sMap.cmd.loading(false);
								def.resolve(features);
							}
						},
						error: function(text) {
							sMap.cmd.loading(false);
							def.reject(text);
						},
						complete: function() {
						}
					});
				}
			}
			
		}, {persist : true});
		this.handler.activate();
	},
	
	
	/**
	 * Called when features were found.
	 * 
	 * @param attributes {Object}
	 * @returns {void}
	 */
	onFeaturesFound: function(attributes) {
		attributes = attributes || {};
		
		var self = this.map.getControlsByClass("sMap.Module.ExtractClick")[0];
		if (!fs || !fs.length) {
			return;
		}
		if (self.dialog) {
			try {
				self.dialog.dialog("destroy");
				self.dialog = null;
			}
			catch(e) {
				self.dialog = null;
			}
		}
		
		// Extract FNR from the feature and relocate user to a new URL.
		var fnr = attributes.fnr,
			fastighetsNamn = attributes.fastighet,
			easting = attributes.easting || this.clickedLonLat.lon,
			northing = attributes.northing || this.clickedLonLat.lat;
//			gdp = attributes.northing,
//			pdp = attributes.northing;
		
		if (!fnr) {
			alert("Hittade inget fastighetsnummer för platsen");
			return;
		}
		var url = self.redirectUrl.charAt(self.redirectUrl.length-1) !== "?" ? self.redirectUrl+"?" : self.redirectUrl;
		url = url + "fnr=" + fnr;
		if (!self.dialog) {
			var d = $("<div id='extract-click-dialog' />");
			self.dialog = d;
			d.dialog({
				title: "Skapa FNR",
				autoOpen: false,
				width: 315,
				height: "auto",
				modal: false,
				close: function() {
					if ($(this).dialog) {
						$(this).dialog("destroy").empty().remove();
						self.dialog = null;
						self.deactivate();						
					}
				},
				buttons: [{
					"text": self.lang.labelContinue,
					"click": function() {
						var url = "http://sbkspace.malmo.se/nbk/nbkinsert.aspx?mNorthing="+northing+
							"&mEasting="+easting+"&fnr="+fnr + "&gdp="+gdp + "&pdp="+pdp;
						window.open(url, "_blank");
					}
				}]
			});
		}
		var html = '<form><table>' +
			'<tr><td>Fastighet</td><td><input disabled id="ec-fastighet" type="text" value="'+(fastighetsNamn || "-")+'"></input></td></tr>' +
			'<tr><td>Easting</td><td><input disabled id="ec-easting" type="text" value="'+easting+'"></input></td></tr>' +
			'<tr><td>Northing</td><td><input disabled id="ec-northing" type="text" value="'+northing+'"></input></td></tr>' +
			'<tr><td>Gällande detaljplan</td><td><input disabled id="ec-cur_dp_plan" type="text" value="'+gdp+'"></input></td></tr>' +
			'<tr><td>Pågående detaljplan</td><td><input disabled id="ec-dev_dp_plan" type="text" value="'+pdp+'"></input></td></tr>' +
			'</table></form>';
		
		self.dialog.append(html);
		self.dialog.dialog("open");	
	},
	
	CLASS_NAME : "sMap.Module.ExtractClick"
	
});