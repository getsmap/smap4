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
	EVENT_LISTENERS : ['layertreecreated', 'creatingwebparams'],
	
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

	creatingwebparams: function() {
		// preset-parameter undefined means user have selected the return-to-default item. Delete parameter so it can't end up in CopyLink.
		if (this.preset) {
			if (this.preset === 'undefined') {
				delete sMap.db.webParams.PRESET;
			}
			else {
				sMap.db.webParams.PRESET = this.preset;
			}
		}
	},	

	layertreecreated: function(){
		if (!this.presetChecked) {
			this.checkPresetRadio();
		}

		if (!this.layersSelected) {
			 // Workaround to solve IE-problem where no layers is shown in mapDiv although loaded on page-load. Params now applies later during load.
			if ($.browser.msie) {
				if (sMap.events.mapInitiated) {
					console.log('msie-apply');
					this.applyUrlParams();
				}
				else {
					window.setTimeout( function() {
						console.debug('trigger')
						sMap.events.triggerEvent("layertreecreated", this, {});
					}, 1000);
				}
			}

			else {
				console.log('applyurlparams');
				this.applyUrlParams();
			}
		}
	},

	applyUrlParams: function() {
		// selects layers once based on url-parameters
		this.layersSelected = true;
		var pString = sMap.cmd.getParamsAsString();
		var pObj = this.stringToObject(pString);
		this.applyParams(pObj);
		
	},

	checkPresetRadio: function() {
		// checks radio according to PRESET-parameter in url
		var presetId = sMap.cmd.getParamsAsObject().PRESET;
		if (presetId) {
			this.presetChecked = true;
			$('#' + presetId).prev().prop("checked", true);
			this.preset = presetId;
		}
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
		this.$div = $('<div class="smap-clayers-container" />');
		$("#mapDiv").append(this.$div);
		this._drawHeaders();
		if (this.right) {
			this.$div.css("right", this.right+"px");
		}
	},

	onOptionSpanClick: function(e) {
		$(this).prev().prop("checked", true).change();
	},

	// _getDropDown: function(headerIndex) {
	// 	return this.$div.find(".smap-clayers-dropdown:eq("+headerIndex+")");
	// },

	// _getHeader: function(dropDownIndex) {
	// 	var headerIndex = dropDownIndex - this.$div.find(".smap-clayers-header").length;
	// 	return this.$div.find(".smap-clayers-header:eq("+headerIndex+")");
	// },

	onHeaderOver: function() {
		var $this = $(this);
		var $dropDown = $(".smap-clayers-container").find(".smap-clayers-dropdown:eq("+$this.index()+")");
		$this.addClass("hover");
		$dropDown.addClass("visible");
	},

	onHeaderOut: function() {
		var $this = $(this);
		var $dropDown = $(".smap-clayers-container").find(".smap-clayers-dropdown:eq("+$this.index()+")");
		$this.removeClass("hover");
		$dropDown.removeClass("visible");
	},

	onDropDownOver: function() {
		var $this = $(this);
		var nbr = $(".smap-clayers-container").find(".smap-clayers-header").length;
		var $header = $(".smap-clayers-container").find(".smap-clayers-header:eq("+($this.index()-nbr)+")");
		$header.addClass("hover");
		$this.addClass("visible");
	},

	onDropDownOut: function() {
		var $this = $(this);
		var nbr = $(".smap-clayers-container").find(".smap-clayers-header").length;
		var $header = $(".smap-clayers-container").find(".smap-clayers-header:eq("+($this.index()-nbr)+")");
		$header.removeClass("hover");
		$this.removeClass("visible");
	},

	stringToObject: function(pString) {
		var pArr = pString.split("&");
		var out = {};
		for (var i=0,len=pArr.length; i<len; i++) {
			var keyVal = pArr[i].split("=");
			out[keyVal[0]] = keyVal[1];
		}
		return OpenLayers.Util.upperCaseObject(out);
	},

	applyParams: function(pObj) {
		sMap.cmd.removealllayers();
		sMap.webParams.applyDefaultParams(pObj, {noZoomExtentFallback: true});

		var layTreeInsts = sMap.map.getControlsByClass("sMap.Module.LayerTree");
		if (!layTreeInsts.length) {
			return false;
		}
		var layTreeInst = layTreeInsts[0];
		var opened = layTreeInst.collapseAllHeaders();
		if (pObj && pObj.OL) {
			var olArr = pObj.OL.split(",");
			var arrLayersToAdd = [];
			for (var i=0,len=olArr.length; i<len; i++) {
				var layerName = olArr[i];
				layTreeInst.checkBox(layerName);
			}
		}
		// var bl = sMap.map.baseLayer;
		// if (p.BL) {
		// 	bl = sMap.map.getLayersByName(p.BL)[0];
		// }
		// sMap.map.setBaseLayer( bl );
		
	},

	onChange: function(e) {
		// When a radio button changes - apply the params
		var $this = $(e.target);
		var pString = $this.parent().data("params");
		var pObj = this.stringToObject(pString);
		this.preset = $this.next().attr('id');
		this.presetChecked = true;
		this.applyParams(pObj);
	},

	_drawHeaders: function() {
		var obj = this.layers || {};
		var t, arrOptions, title,
			$header, $dropDown, $option;

		var dropDowns = [];
		var w = 0;
		for (title in obj) {
			arrOptions = obj[title];
			$header = $('<div class="smap-clayers-header">'+title+'</div>');
			this.$div.append($header);
			$header
				.on("mouseenter", this.onHeaderOver)
				.on("mouseleave", this.onHeaderOut);
			$dropDown = $('<div class="smap-clayers-dropdown"></div>');
			$dropDown
				.on("mouseenter", this.onDropDownOver)
				.on("mouseleave", this.onDropDownOut);
			for (var i = 0; i < arrOptions.length; i++) {
				t = arrOptions[i];
				t.id = this.stringToObject(t.params).PRESET;
				$option = $('<div class="smap-clayers-option"><input name="clayers-radios" type="radio"></input><span id="'+t.id+'">'+t.displayName+'</span></div>');
				$option.data("params", t.params);
				$option.find("span").on("click", this.onOptionSpanClick);
				$dropDown.append($option);
				$dropDown.css("left", w+"px");
			}
			dropDowns.push($dropDown);
			w += $header.outerWidth();

		}
		// Append at the last
		for (var i = 0; i < dropDowns.length; i++) {
			this.$div.append(dropDowns[i]);
		}
		this._onChange = $.proxy(this.onChange, this);
		this.$div.find("input[type=radio]").on("change", this._onChange);
	},



































	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.CustomLayers"
	
});