/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.MiljoReda = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["selected", "unselected", "afterapplyingwebparams"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],

	options: {
		idSeparator: ";",
		key: "objid",

		layer: {
			format: new OpenLayers.Format.GeoJSON(),
			layerType: "VECTOR",
			protocol: new OpenLayers.Protocol.WFS({
				url: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wfs",
				featureType: "MILJO_MILJOREDA_ALLA_PT",
				featureNS: "malmows",
				geometryName: "geom",
				outputFormat: "JSON",
				readFormat: new OpenLayers.Format.GeoJSON()
			}),
			displayName: "Miljoreda",
			name: "miljoreda_layer",
			selectable : true,
			geomType : 'area',
			style: {
				"default": {externalGraphic: "http://sbkvmgeoserver.malmo.se:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&LAYER=malmows:MILJO_MILJOREDA_ALLA_PT&STYLE=MILJOREDA_AVFALL_PT&RULE=0"}
			},
			options: {
				isBaseLayer: false,
				opacity: 1,
				zIndex: 350,
				ratio: 1,
				singleTile : true
			},
			popup :
					"<div class='popup-header1'>Avfall</div>" +
					"<div class='popup-text1'>Objid: ${objid}</a></div>" +
					"<div class='popup-text1'>Grupp: ${grupp}</a></div>" +
					"<div class='popup-text1'>Sökbegrepp: ${sokbegrepp}</a></div>" +
					"<div class='popup-text1'>Attributkod: ${attributkod}</a></div>" +
					"<div class='popup-text1'>Huvudrubrik: ${huvudrubrik}</a></div>" +
					"<div class='popup-text1'>Underrubrik: ${underrubrik}</a></div>" +
					"<div class='popup-text1'>Namn1: ${namn1}</a></div>" +
					"<div class='popup-text1'>Adress1: ${adress1}</a></div>" +
					"<div class='popup-text1'>Handläggare: ${handlaggare}</a></div>" +
					"<div class='popup-text1'>Provningsplikt: ${provningsplikt}</a></div>" +
					"<br>" +
					"<div class='popup-text1'>Stadsområde: ${sof_namn}</div>" +
					"<div class='popup-text1'>Delområde: ${delomr}</a></div>" +
					"<br>" +
					"<div class='popup-text1'><a href='http://kartor.malmo.se/urbex/index.htm?p=true&xy=${ykordinat};${xkordinat}' target='_blank'>Visa snedbild</a></div>" +
					"<div class='popup-text1'><a href='http://sbkvmgeoserver.malmo.se/cyclomedia/index.html?posx=${ykordinat}&posy=${xkordinat}' target='_blank'>Visa gatuvy</div>"

			
		}

	},
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.MiljoReda.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
		);
		this.EVENT_TRIGGERS =
			sMap.Module.MiljoReda.prototype.EVENT_TRIGGERS.concat(
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

	selected: function(e) {
		var fs = e.selectedFeatures || [];

		var f, props,
			arr = [];
		for (var i=0,len=fs.length; i<len; i++) {
			f = fs[i];
			props = f.attributes || {};
			arr.push(props[this.options.key]);
		}

		// Set the global variable that some unkown magical desktop application can read
		// window.EDPget = arr.join(this.options.idSeparator); // Does not work in old ECMA script
		// document.getElementById('EDPget').value = arr.join(this.options.idSeparator);
		// window.EDPget = outString;

		var outString = arr.join(this.options.idSeparator);

		var $edpGetTag = $("#EDPget");
		if (!$edpGetTag.length) {
			$edpGetTag = $('<input style="display:none !important;" id="EDPget" value="" />').appendTo($("body"));
		}
		$edpGetTag.val(outString);

		// console.log(window.EDPget);

	},

	unselected: function(e) {
		this.selected(e);
	},

	afterapplyingwebparams: function(e) {
		var p = e.params;
		if (p.ID) {
			// var arr = p.ID instanceof Array ? p.ID : p.ID.split(this.options.idSeparator);

			// Process params again since ol's OpenLayers.Util.getParameters cracks up when using ";" in param value
			var s = location.search.substring(1);
			var ss = s.split("&");
			var keyVal;
			var newParams = {};
			for (var i = 0; i < ss.length; i++) {
				keyVal = ss[i].split("=");
				newParams[keyVal[0].toUpperCase()] = keyVal[1];
			}
			// Done! We now have the params…
			var arr = newParams.ID.split(this.options.idSeparator);



			// TODO: Should we:
			// 	a) Create a new layer where only these features are visible (using a WMS-filter)
			// 	b) Show all miljöreda layers and select the specified features
			// 	c) Show only the layer(s) which holds given ID:s and select the specified features
			
			// Create a filter which shows the specified features
			
			var filters = [];
			for (var i=0,len=arr.length; i<len; i++) {
				filters.push(
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: this.options.key,
						value: parseInt(arr[i])
					})
				);
			}
			var filter = new OpenLayers.Filter.Logical({
					type: OpenLayers.Filter.Logical.OR,
					filters: filters
			});
			var writer = new OpenLayers.Format.Filter.v1_1_0();
			filter = new OpenLayers.Format.XML().write(writer.write(filter));
			var t = this.options.layer;
			// t.params.filter = filter;
			

			this._layer = new OpenLayers.Layer.Vector(t.name);
			this._layer.zIndex = 900;
			this._layer.displayName = t.displayName;
			this._layer.selectable = t.selectable;
			sMap.config.layers.overlays.push(this.options.layer);
			this.map.addLayer(this._layer);


			$.ajax({
				url: sMap.config.proxyHost ? sMap.config.proxyHost + t.protocol.url : t.protocol.url,
				context: this,
				dataType: "text",
				type: "POST",
				data: {
					typeName: t.protocol.featureNS+":"+t.protocol.featureType,
					service: "WFS",
					version: "1.1.0",
					request: "GetFeature",
					srsName: this.map.projection,
					format: "text/geojson",
					maxFeatures: 10000,
					filter: filter,
					outputFormat: "json"
				},
				success: function(data) {
					var olFormat = t.format;
					var fs = olFormat.read(data);
					// if (t.shiftCoords) {
					// 	for (i=0,len=fs.length; i<len; i++) {
					// 		// Due to new (?) standards (adopted by OL but not WFS), lat comes before long in geojson.
					// 		f = fs[i];
					// 		x = f.geometry.x;
					// 		y = f.geometry.y;
					// 		f.geometry.x = y;
					// 		f.geometry.y = x;
					// 	}							
					// }
					// if (t.transformFrom) {
					// 	var fromepsg = new OpenLayers.Projection(t.transformFrom),
					// 		toepsg = new OpenLayers.Projection(this.map.projection);
					// 	for (i=0,len=fs.length; i<len; i++) {
					// 		// transform with proj4js
					// 		f = fs[i];
					// 		f.geometry.transform(fromepsg,toepsg);
					// 	}							
					// }
					this._layer.addFeatures(fs);
					sMap.events.triggerEvent("vectorloaded", this, {
						layerName: this._layer.name
					});
				},
				error: function(a,b,c) {},
				complete: function() {}
			});

			// t.filter = filter;

			// this._layer = new OpenLayers.Layer.Vector(t.name, {
			// 	strategies: [new OpenLayers.Strategy.BBOX()],
			// 	protocol: t.protocol
			// });
			// this._layer.filter = filter;
			
			// this._layer.zIndex = 900;

			// this._layer.displayName = t.displayName;
			// this._layer.selectable = t.selectable;

			// // this._layer = new OpenLayers.Layer.WMS(
			// // 	t.name,
			// // 	t.URL,
			// // 	t.params,
			// // 	t.options
			// // );
			// sMap.config.layers.overlays.push(this.options.layer);
			// this.map.addLayer(this._layer);

			// sMap.events.triggerEvent("addlayerwithconfig", this, {
			// 	config: this.options.layer
			// });
			
			//sMap.cmd.addlayer({layer: this._layer});
		}
	},
	
	/**
	 * Called when all modules are initialized, i.e. after initialize.
	 * All initial HTML should be produced from here.
	 * @returns {void}
	 */
	drawContent : function() {},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.MiljoReda"
	
});


