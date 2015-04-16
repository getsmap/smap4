/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.CustomLayers = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["blswitcher_makearrmakearr"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.CustomLayers.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.CustomLayers.prototype.EVENT_TRIGGERS.concat(
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
		// sMap.events.register("modulesadded", this, function(e) {
		// 	this.init();
		// });
		this.init();
	},

	init: function() {
		if (!$("#baselayerDiv").length) {
			// This module requires baselayer switcher module
			return false;
		}
	},

	blswitcher_makearrmakearr: function(e) {
		var cats = e.cats || {},
			ls = this.layers || {},
			t, arr,
			blSwitcherInst = e.caller;
		this.blSwitcherInst = blSwitcherInst;
		for (var category in ls) {
			arr = ls[ blSwitcherInst.replaceOddChars(category) ];
			for (var i=0,len=arr.length; i<len; i++) {
				t = arr[i];
				t.name = $.trim(t.displayName.replace(/[^\x00-\x7F]/g, "")).replace(/\s/g, "_");
				t.onClick = this.onRowClick;
				t.category = category;
			}
		}

		for (var category in cats) {
			arr = cats[ blSwitcherInst.replaceOddChars(category) ];
			if (ls[category]) {
				cats[category] = cats[category].concat( ls[category] );
			}
		}
		for (var category in ls) {
			if (!cats[category]) {
				cats[category] = ls[category];
			}

		}


		// $.extend(true, cats, ls);
		// var a;
	},


	getConfig: function(layerName) {
		var ls = this.layers || {},
			t, arr;
		for (var category in ls) {
			arr = ls[category];
			for (var i=0,len=arr.length; i<len; i++) {
				t = arr[i];
				if (t.name === layerName) {
					return t;
				}
			}
		}
		return null;
	},

	onRowClick: function(e) {
		var ctrls = sMap.map.getControlsByClass("sMap.Module.BaselayerSwitcher");
		if (!ctrls) {
			return false;
		}
		var ctrl = ctrls[0];
		var self = sMap.map.getControlsByClass("sMap.Module.CustomLayers")[0],
			layTreeInst = sMap.map.getControlsByClass("sMap.Module.LayerTree")[0];
		var layerName = $(this).prop("id").split(ctrl.delim)[1];
		var opened = layTreeInst.collapseAllHeaders();

		if (e !== true) {
			ctrl.pressRadioButton(layerName, false);
			var b = ctrl.getButton(layerName);
			ctrl.markButton(b);
		}

		// -- Parse parameters --

		var t = self.getConfig(layerName);
		var p = t.params;
		var pArr = p.split("&");
		var out = {};
		for (var i=0,len=pArr.length; i<len; i++) {
			var keyVal = pArr[i].split("=");
			out[keyVal[0]] = keyVal[1];
		}
		p = OpenLayers.Util.upperCaseObject(out);
		
		sMap.cmd.hidealllayers();
		sMap.webParams.applyDefaultParams(p);
		
		function delayed() {
			if (p.OL) {
				var olArr = p.OL.split(",");
				var arrLayersToAdd = [];
				for (var i=0,len=olArr.length; i<len; i++) {
					var layerName = olArr[i];
					// var t = sMap.cmd.getLayerConfig(layerName);
					// t.startVisible = true;	
					// if (paramsObj.BUFFER){
					// 	t.options.buffer = paramsObj.BUFFER;
					// }
					// arrLayersToAdd.push(t);
					
					// sMap.cmd.showlayer({layerName: layerName});

					layTreeInst.checkBox(layerName);
				}
			}
			var bl = sMap.map.baseLayer;
			if (p.BL) {
				bl = sMap.map.getLayersByName(p.BL)[0];
			}
			sMap.map.setBaseLayer( bl );
		}

		// if (opened.length) {
		// 	setTimeout(function() {
		// 		delayed();
		// 	}, 1000);
		// }
		// else {
		delayed();
		var $inp = $(this).find("input");
		setTimeout(function() {
			// Bug fix. Input gets unchecked for some reason.
			$inp.prop("checked", true);
		}, 1);

		return false;

	},



	// parseParams: function(p) {
	// 	if (p)
	// },

	// addHeader: function(headerText) {
	// 	var encHeaderText = encodeURIComponent(headerText).replace(/\W/g, '');
	// 	var h = $('<div class="ui-widget-content ui-state-default baselayer-button" id="bLayerSwitcher___'+encHeaderText+'">'+headerText+'</div>');
	// 	$("#baselayerDiv").append(h);
	// 	return h;
	// },

	// addRow: function(t) {
	// 	var h = $("#baselayerDiv .baselayer-button:contains("+t.header+")");
	// 	if (!h.length) {
	// 		h = this.addHeader();
	// 	}
	// 	var r = 






	// },
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.CustomLayers"
	
});