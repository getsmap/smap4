(function() {
	var Core = sMap.Module.SPrint.Core;

	/**
	 * @constructor
	 */
	var PrintControlDialog = function(core) {

		this.core = core;
		this.dialog = $('<div></div>');

		// load markup from remote source
		this.dialog.load('modules/Module/SPrint/PrintControlDialog.html', Core.bind(this, this.init));
	};

	PrintControlDialog.prototype.setCurrentScale = function() {
		var scale = this.map.getScale(),
			res = this.map.getResolution();
		var scaleRes = parseInt(Math.round(scale)) + ":" + res;
		$(".sprint-selectscale").val( scaleRes ).change();
	};
	
	PrintControlDialog.prototype.acceptCopyright = function(print, printFormat) {
		print = print || false;
		var service = print ? "Print_" : "Export_";
		
		var self = this;
		// Vill man ha dialogen ta bort detta och lägg till det nedan
		self.print(service, printFormat, {
			orientation: $(".sprint-orientation:visible:checked").val() || "Portrait",
			format: $(".sprint-paperformat:visible").val() || "A4"
		});
		
		// $("<div>"+this.core.module.printCopyrightNotice+"</div>").dialog({
			// title: "Användarvillkor",
			// autoOpen: true,
			// modal: true,
			// close: function() {
				// $(this).dialog("destroy").empty().remove();
				
			// },
			// buttons: [
			          // {
			        	  // text: "Nej",
			        	  // click: function() {
				        	  	// $(this).dialog("close");
				          	// }
			          // },
			          // {
			        	  // text: "Jag accepterar",
			        	  // click: function() {
			        	  		// $(this).dialog("close");
				        	  	// self.print(service, printFormat, {
				        	  		// orientation: $(".sprint-orientation:visible:checked").val() || "Portrait",
									// format: $(".sprint-paperformat:visible").val() || "A4"
				        	  	// });
			          		// }
			          // }
			// ]
		// });
	};
	
	/**
	 * Stuff to be done after markup has been remotely loaded
	 */
	PrintControlDialog.prototype.init = function() {
		var self = this;
		
		this.map = this.core.module.map;
		
		OpenLayers.DOTS_PER_INCH = this.core.module.DOTS_PER_INCH || OpenLayers.DOTS_PER_INCH;
		
		// Bind change in format and orientation to change in preview extent box.
		this.dialog.find("input[name='sprint_Export_radLandscape'], input[name='sprint_Print_radLandscape'], " +
				"#sprint_Export_slctPrintFormat, #sprint_Print_slctPrintFormat").change(function() {
			self.showExtent();
		});
		
		// Johan was here: Allow to click on the label
		var onLabelClick = function() {
			$(this).prev().click();
		};
		this.dialog.find("input[type='checkbox'], input[type='radio']").each(function() {
			$(this).next().click(onLabelClick);
		});
		
		this.dialog.dialog({
			title : 'Utskrift',
			width : 370,
			position : {my: "right", at : "right" },
			resizable : false,
			closeOnEscape : false,
			open : function(e, ui) {
				self.updateScales();
				self.showExtent();
				self.setCurrentScale();
				//self.map.events.register("zoomend", self, self.setCurrentScale);
				//self.map.events.register("changebaselayer", self, self.updateScales);
				self.map.events.register("zoomend", self, self.showExtent);
				self.map.events.register("moveend", self, self.showExtent);
				
				// $(".ui-dialog-titlebar-close", ui.dialog).hide();
			},
			beforeClose : Core.bind(this, this.beforeDialogclose),
			close : Core.bind(this, this.onDialogclose),
			autoOpen: false
		});

		this.tabs = $('#SPrintTabs').tabs({
			activate: function( event, ui ) {
				self.showExtent();
				self.setCurrentScale();
			}
		});

		var that = this;
		$("#sprint_Print_chkUseMask").click(function() {
			that.toggleMaskEditing();
		});
		if(!this.core.module.usePrintMask){
			$("#sprint_Print_chkUseMask").hide();
			$("#sprint_Print_chkUseMaskLbl").hide();
		}
		$("#sprint_Print_btnDraw").button();
		$("#sprint_Print_btnDraw").click(function() {
			that.toggleDraw();
		});
		$("#sprint_Print_btnDraw").hide();
		$("#sprint_Print_btnClear").button();
		$("#sprint_Print_btnClear").click(function() {
			that.clearDraw();
		});
		$("#sprint_Print_btnClear").hide();
		$("#sprint_Print_btnPrint").button();
		$("#sprint_Print_btnPrint").click(function() {
			that.acceptCopyright(true, "PDF");
		});
		$("#sprint_Export_btnExport").button();
		$("#sprint_Export_btnExport").click(function() {
			that.acceptCopyright(false, $("#sprint_Export_slctImageFormat").val());
		});
		$("#sprint_Export_btnPreview").button();
		$("#sprint_Export_btnPreview").click(function() {
			that.print("Export_", "PDF", {
				orientation: $(".sprint-orientation:visible:checked").val() || "Portrait"
			});
		});
		this.updateScales();
		
		var curScale = this.getCurrentScale(),
			res = this.map.getResolution(); 
		
		$(".sprint-selectscale").val(curScale+":"+res);
		$(".sprint-selectscale").change(function() {
			var val = $(this).val();
			if (typeof(val) === "string" && val.length > 0) {
				self.showExtent( parseInt( val.split(":")[0] ) );
			}
		});
		
		// Fix IE issue with indexof
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function(obj, start) {
			     for (var i = (start || 0), j = this.length; i < j; i++) {
			         if (this[i] === obj) { return i; }
			     }
			     return -1;
			};
		}
	};
	
	PrintControlDialog.prototype.updateScales = function() {
		$(".sprint-selectscale").empty();
		var scale, option, res,
			resolutions = this.core.module.printResolutions || this.map.resolutions || [];//this.map.baseLayer.resolutions || this.map.resolutions || [];
		for (var i=0,len=resolutions.length; i<len; i++) {
			res = resolutions[i];
			scale = parseInt( Math.round(sMap.util.getScaleFromResolution(res)) );
			option = $('<option value="'+scale+':'+res+'">1:'+scale+'</option>');
			$(".sprint-selectscale").each(function() {
				$(this).append(option.clone());
			});
		}
		//this.setCurrentScale(); // set scale also
	};
	/*
	 * Toggles draw and clear buttons for print mask
	 */
	PrintControlDialog.prototype.toggleMaskEditing = function(){
		if ($("#sprint_Print_btnDraw").is(":visible")) {
			$("#sprint_Print_btnDraw").hide();
			$("#sprint_Print_btnClear").hide();
			this.maskEditingLayer.setVisibility(false);
		}else{
			$("#sprint_Print_btnDraw").show();
			$("#sprint_Print_btnClear").show();
			this.addMaskEditingLayer();
		}
	};
	/*
	 * Adds a vector layer for mask editing with an OL drawfeature control
	 */
	PrintControlDialog.prototype.addMaskEditingLayer = function(){
		if (!this.maskEditingLayer) {
			this.maskEditingLayer = new OpenLayers.Layer.Vector("sprint_maskeditlayer", {
				styleMap: new OpenLayers.StyleMap({
					"default": new OpenLayers.Style({
						fillOpacity: 0,
						fillColor: "#FFF",
						strokeWidth: 1,
						strokeOpacity: 1,
						strokeColor: "#F00"
					}),
					"temporary": new OpenLayers.Style({
						fillOpacity: 0,
						fillColor: "#FFF",
						strokeWidth: 1,
						strokeOpacity: 1,
						strokeColor: "#F00"
					})
				})
			});
			this.map.addLayer(this.maskEditingLayer);
			this.maskEditingLayer.events.register("featureadded", this, function(e) {
				this.toggleDraw();
				this.centerAndFitExtent(e.feature);
			});
			this.drawPolygon = new OpenLayers.Control.DrawFeature(
					this.maskEditingLayer, OpenLayers.Handler.Polygon, {
						title: "Rita",
						multi: true
				});
			this.map.addControl(this.drawPolygon);
		}
		else{
			this.maskEditingLayer.setVisibility(true);
		}
		
	};
	/*
	 * Toggles the OL drawfeature control
	 */
	PrintControlDialog.prototype.toggleDraw = function(){
		if (this.drawPolygon.active){
			this.drawPolygon.deactivate();
		}
		else{
			this.drawPolygon.activate();
		}
	};
	/*
	 * Clears all drawed features
	 */
	PrintControlDialog.prototype.clearDraw = function(){
		this.maskEditingLayer.removeAllFeatures();
	};
	/*
	 * Adds a vector layer when printing. The layer contains the extent feature minus the drawed features in a white style
	 */
	PrintControlDialog.prototype.addMaskLayer = function(){
		if (this.maskEditingLayer.features.length>0){
			if (!this.maskLayer) {
				this.maskLayer = new OpenLayers.Layer.Vector("sprint_masklayer", {
					styleMap: new OpenLayers.StyleMap({
						"default": new OpenLayers.Style({
							fillOpacity: 1,
							fillColor: "#ffffff",
							strokeWidth: 1,
							strokeOpacity: 1,
							strokeColor: "#ffffff"
						})
					})
				});
				this.map.addLayer(this.maskLayer);
			}
			var P = OpenLayers.Geometry.Point,
				ext = this.map.maxExtent,
				geomPolygon = new OpenLayers.Geometry.Polygon(
				[new OpenLayers.Geometry.LinearRing(
					[new P(ext.left, ext.bottom), new P(ext.right, ext.bottom), new P(ext.right, ext.top), new P(ext.left, ext.top), new P(ext.left, ext.bottom)] 
				)]
			);
			var extPolygon = new OpenLayers.Feature.Vector(geomPolygon);
			var maskFeature = this.subtract(extPolygon, this.maskEditingLayer.features); //this.extentLayer.features[0]
			this.maskLayer.addFeatures([maskFeature]);
		}
	};
	
	PrintControlDialog.prototype.subtract = function(bigFeature, smallFeatures) {
	    var newPolygon = new OpenLayers.Geometry.Polygon(bigFeature.geometry.components);
	    var newFeature = new OpenLayers.Feature.Vector(newPolygon);
	    //Add Inner DONUT HOLES!
	    for (var i = 0; i<smallFeatures.length;i++){
	    	newPolygon.addComponent(smallFeatures[i].geometry.components[0].components[0]);
	    }

	    return newFeature;
	};
	PrintControlDialog.prototype.centerAndFitExtent = function(feature) {
		var bounds = feature.geometry.getBounds(),
			c = bounds.getCenterLonLat(),
			fw = bounds.getWidth(),
			fh = bounds.getHeight();
		this.map.setCenter([c.lon,c.lat]);
		var format = $(".sprint-paperformat:visible").val() || "A4",
			portrait = $(".sprint-orientation:visible:checked").val(),
			isPrint = $("#sprint_Print_btnPrint").is(":visible") ? "p" : "x";
		portrait = portrait.toUpperCase() === "PORTRAIT" ? "p" : "l"; //p or l
		var layout = this.core.module.layoutSizes[format + "_" + portrait + "_" + isPrint];
		var scalex = fw*72/(layout.w*0.0254);
		var scaley = fh*72/(layout.h*0.0254);
		var maxscale = (scalex > scaley) ? scalex : scaley;
		var scale, res, scaleres,
			resolutions = this.core.module.printResolutions || this.map.resolutions || [];//this.map.baseLayer.resolutions || this.map.resolutions || [];
		for (var i=0,len=resolutions.length; i<len; i++) {
			res = resolutions[i];
			scale = parseInt( Math.round(sMap.util.getScaleFromResolution(res)) );
			if (scale>maxscale){
				scaleres = scale+':'+res;
			}
		}
		$(".sprint-selectscale").val(scaleres).change();
	};
	PrintControlDialog.prototype.showExtent = function(scale) {
		if (!scale || typeof(scale) !== "number") {
			scale = this.printScale || this.map.getScale();
		}
		this.printScale = scale;
		
		var format,
			portrait = true,
			isPrint = $("#sprint_Print_btnPrint").is(":visible");
		portrait = $(".sprint-orientation:visible:checked").val();
		portrait = portrait && typeof(portrait) === "string" ? portrait.toUpperCase() === "PORTRAIT" : true; // convert to boolean
		format = $(".sprint-paperformat:visible").val() || "A4";
		
		if (!this.extentLayer) {
			this.extentLayer = new OpenLayers.Layer.Vector("sprint_extentlayer", {
				styleMap: new OpenLayers.StyleMap({
					"default": new OpenLayers.Style({
						fillOpacity: 0.1,
						fillColor: "#00F",
						strokeWidth: 1,
						strokeOpacity: .8,
						strokeColor: "#00F"
					})
				})
			});
			this.map.addLayer(this.extentLayer);
		}
		else {
			this.extentLayer.destroyFeatures(); // clean layer
		}
		
		var pxWidth, pxHeight, ls = this.core.module.layoutSizes;
		switch(format) {
		case "A2":
			if (isPrint) {
				if (portrait === true) {
					pxWidth = ls.A2_p_p.w * (96/72);
					pxHeight = ls.A2_p_p.h * (96/72);					
				}
				else {
					// Landscape
					pxWidth = ls.A2_l_p.w * (96/72);
					pxHeight = ls.A2_l_p.h * (96/72);
				}
			}
			else {
				// Export
				if (portrait === true) {
					pxWidth = ls.A2_p_x.w * (96/72);
					pxHeight = ls.A2_p_x.h * (96/72);					
				}
				else {
					// Landscape
					pxWidth = ls.A2_l_x.w * (96/72);
					pxHeight = ls.A2_l_x.h * (96/72);	
				}
			}
			break;
		case "A3":
			if (isPrint) {
				if (portrait === true) {
					pxWidth = ls.A3_p_p.w * (96/72);
					pxHeight = ls.A3_p_p.h * (96/72);					
				}
				else {
					// Landscape
					pxWidth = ls.A3_l_p.w * (96/72);
					pxHeight = ls.A3_l_p.h * (96/72);
				}
			}
			else {
				// Export
				if (portrait === true) {
					pxWidth = ls.A3_p_x.w * (96/72);
					pxHeight = ls.A3_p_x.h * (96/72);					
				}
				else {
					// Landscape
					pxWidth = ls.A3_l_x.w * (96/72);
					pxHeight = ls.A3_l_x.h * (96/72);	
				}
			}
			break;
		case "A4":
			if (isPrint) {
				if (portrait === true) {
					pxWidth = ls.A4_p_p.w * (96/72);
					pxHeight = ls.A4_p_p.h * (96/72);					
				}
				else {
					// Landscape
					pxWidth = ls.A4_l_p.w * (96/72);
					pxHeight = ls.A4_l_p.h * (96/72);
				}
			}
			else {
				// Export
				if (portrait === true) {
					pxWidth = ls.A4_p_x.w * (96/72);
					pxHeight = ls.A4_p_x.h * (96/72);					
				}
				else {
					// Landscape
					pxWidth = ls.A4_l_x.w * (96/72);
					pxHeight = ls.A4_l_x.h * (96/72);	
				}
			}
			break;
		case "A5":
			if (isPrint) {
				if (portrait === true) {
					pxWidth = ls.A5_p_p.w * (96/72);
					pxHeight = ls.A5_p_p.h * (96/72);					
				}
				else {
					// Landscape
					pxWidth = ls.A5_l_p.w * (96/72);
					pxHeight = ls.A5_l_p.h * (96/72);
				}
			}
			else {
				// Export
				if (portrait === true) {
					pxWidth = ls.A5_p_x.w * (96/72);
					pxHeight = ls.A5_p_x.h * (96/72);					
				}
				else {
					// Landscape
					pxWidth = ls.A5_l_x.w * (96/72);
					pxHeight = ls.A5_l_x.h * (96/72);	
				}
			}
			break;
		}
		
		var scaleFactor = scale / this.map.getScale();
		pxWidth *= scaleFactor;
		pxHeight *= scaleFactor;
		
		
//		if (portrait !== true) {
//			// Switch width and height (landscape format)
//			var _w = pxWidth;
//			pxWidth = pxHeight;
//			pxHeight = _w;
//		}
		
		
		var P = OpenLayers.Geometry.Point,
			center = this.map.getCenter();
		var pxCenter = this.map.getViewPortPxFromLonLat(center);
		var pxLeft = pxCenter.x - pxWidth/2,
			pxRight = pxCenter.x + pxWidth/2,
			pxTop = pxCenter.y - pxHeight/2,
			pxBottom = pxCenter.y + pxHeight/2;
		var nw = this.map.getLonLatFromPixel(new OpenLayers.Pixel(pxLeft, pxTop)),
			se = this.map.getLonLatFromPixel(new OpenLayers.Pixel(pxRight, pxBottom));
		var geomPolygon = new OpenLayers.Geometry.Polygon(
			[new OpenLayers.Geometry.LinearRing(
					[new P(nw.lon, nw.lat), new P(se.lon, nw.lat), new P(se.lon, se.lat), new P(nw.lon, se.lat), new P(nw.lon, nw.lat)] 
			)]
		);
		var polygon = new OpenLayers.Feature.Vector(geomPolygon);
		this.extentLayer.addFeatures([polygon]);
	};
	
	/** private: method[layout]	
	 *  :param service: ``String`` 
	 */
	PrintControlDialog.prototype.layout = function(service, options) {
		options = options || {};
		
		var format = options.format || "A4";
		var orientation = options.orientation ? options.orientation : "Portrait";  // "Portrait" or "Landscape"
		var arrow = "NoArrow";
		var bar = "NoBar";
		
		format = format || $("#sprint_" + service + "slctPrintFormat").val();
		orientation = orientation || $("input[name=sprint_" + service + "radLandscape]:radio:checked").val();
		if ($("#sprint_" + service + "chkNorthArrow:checked").val() !== undefined) 
		{ 
			arrow = "Arrow"; 
		}
		if ($("#sprint_" + service + "chkScaleBar:checked").val() !== undefined) 
		{ 
			bar = "Bar"; 
		}
		return [format, orientation, arrow, bar].join("_");
	};
	
	PrintControlDialog.prototype.getCurrentScale = function() {
		return parseInt(Math.round( OpenLayers.Util.getScaleFromResolution(sMap.map.resolutions[sMap.map.zoom], sMap.map.getUnits()) ));
	};

	/**
	 * api: method[printingstuff] :param map: ``OpenLayers.Map`` The map to
	 * print. :param pages: ``Array`` of :class:`PrintControlDialog.PrintPage`
	 * or :class:`PrintControlDialog.PrintPage` page(s) to print.
	 * :param service: ``String`` 
	 * 
	 * Sends the print command to the print service and opens a new window with
	 * the resulting PDF.
	 */
	PrintControlDialog.prototype.print = function(service, printformat, options) {
		options = options || {};
		
		sMap.events.triggerEvent("beforeprint", this, {});
		
		var onSuccess = options.onSuccess || null,
		    onError = options.onError || null,
		    onComplete = options.onComplete || null,
		    orientation = options.orientation || "Portrait"; // portrait or landscape
		
		if ($("#sprint_Print_chkUseMask:checked").val() !== undefined) {
			this.addMaskLayer();
		}
		if (this.maskEditingLayer) {
			this.maskEditingLayer.setVisibility(false);			
		}
		if (this.extentLayer) {
			this.map.removeLayer(this.extentLayer);			
		}
		this.service = service;  //K-M
		var that = this;
		var map = options.map || this.core.module.map;
		
		sMap.cmd.loading(true, {
			bg: true
		});

		var jsonData = $.extend({
			units : map.getUnits(),
			srs : map.baseLayer.projection.getCode(),
			layout : this.layout(service, options),
			dpi : options.dpi || $("#sprint_" + service + "slctResolution:visible").val() || 96
		}, null);
		
		if (service == "Print_") {
			jsonData = $.extend({
				mapTitle : $("#sprint_txtHeader").val(),
				comment : $("#sprint_txtAreaDescription").val()
			}, jsonData);
		}

		var encodedLayers = [];

		// ensure that the baseLayer is the first one in the encoded list
		var layers = options.layers || map.layers.concat();
		layers.sort(that.compare);  //K-M
		layers.splice(layers.indexOf(map.baseLayer), 1);
		layers.unshift(map.baseLayer);
		var attribution = [];

		$.each(layers, function(index, layer) {

			if (layer.getVisibility() === true) {
				var enc = that.encodeLayer(layer);
				enc && encodedLayers.push(enc);
				
				if (layer.attribution) {
					attribution.push($(layer.attribution).text());
				}
			}
		});
		jsonData.layers = encodedLayers;
		
		var scale, res; 
		if (options.scale && options.resolution) {
			scale = options.scale;
			res = options.resolution;
		}
		else {
			var scaleRes = $(".sprint-selectscale:visible").val(); //this.getCurrentScale();
			scale = parseInt(scaleRes.split(":")[0]);
			res = parseFloat(scaleRes.split(":")[1]);			
		}

		$.extend({
		    distinct : function(anArray) {
		       var result = [];
		       $.each(anArray, function(i,v){
		           if ($.inArray(v, result) == -1) result.push(v);
		       });
		       return result;
		    }
		});
		var encodedPages = [];
		encodedPages.push($.extend({
			center : [ map.center.lon, map.center.lat ],
			scale : scale,
			rotation : 0,
			clientResolution : res, //map.resolutions[map.zoom],
			copy: $.distinct(attribution).join(", ")
		}, null));
		
		if (service == "Export_" && printformat != "PDF") {
			encodedPages[0] = $.extend({
				printformat: printformat
			}, encodedPages[0]);
		}
		
		jsonData.pages = encodedPages;
		
		var serviceName = service.substring(0,service.length - 1).toLowerCase();
		if ($("#sprint_Print_chkPdfUrl:checked").val() !== undefined) {
			var spec = JSON.stringify(jsonData),
				url = location.protocol + '//' + location.host + "/print-servlet/" + serviceName + "/print.pdf?spec=" + spec;
				url = url.replace(/å/g,'%E5');
				url = url.replace(/ä/g,'%E4');
				url = url.replace(/ö/g,'%F6');
				url = url.replace(/Å/g,'%C5');
				url = url.replace(/Ä/g,'%C4');
				url = url.replace(/Ö/g,'%D6');
				url = url.replace(/©/g,'%A9');
			$("<div><div id='print-dialog-pdflink' class='ui-dialog-content ui-widget-content' scrolltop='0' scrollleft='0' style='width: auto; min-height: 0px; height: auto;'><input type='text' readonly value='"+url+"' /></div></div>").dialog({
				title: "Länk till pdf",
				autoOpen: true,
				modal: true,
				close: function() {
					$(this).dialog("destroy").empty().remove();
				}
			});
			sMap.cmd.loading(false)
		}else {
			$.ajax({
				type: "POST",
				url : "/print-servlet/" + serviceName + "/create.json",
				timeout: options.timeout || 30000, // in ms
				data : JSON.stringify(jsonData),
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				context: this,
				success : function(response) {
					var url = response.getURL;
					if (onSuccess) {
						onSuccess.call(this, url);
					}
					else {
						that.download(url);					
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					if (onError) {
						onError.call(this, jqXHR, textStatus, errorThrown);
					}
					else {
						alert("printexception " + textStatus + ": " + errorThrown);
					}
					
				},
				complete: function() {
					sMap.cmd.loading(false);
					if (onComplete) {
						onComplete.call(this);
					}
				}
			});
		}
		// Remove the mask
		if (this.maskLayer) {
			this.maskLayer.destroyFeatures();
			this.map.removeLayer(this.maskLayer);	
			this.maskLayer.destroy();
			this.maskLayer = null;
		}
		// Put it back again
		if (this.extentLayer) {
			this.map.addLayer(this.extentLayer);			
		}
		if (this.maskEditingLayer) {
			this.maskEditingLayer.setVisibility(true);			
		}
	};
	/**
	 * private: method[compare]  Used to sort layers based on index
	 * :param a: OpenLayers.Layer{object}
	 * :param b: OpenLayers.Layer{object}
	 * Used to sort layers based on zindex  //K-M
	 */
	PrintControlDialog.prototype.compare = function (a,b) {
		  if (a.getZIndex() < b.getZIndex())
		     return -1;
		  if (a.getZIndex() > b.getZIndex())
		    return 1;
		  return 0;
	};
	/** private: method[download]
	* :param url: ``String``
	*/
	PrintControlDialog.prototype.download = function(url) {
            if ($.browser.opera) {
                // Make sure that Opera don't replace the content tab with
                // the pdf
                window.open(url);
            } else {
                // This avoids popup blockers for all other browsers
                window.location.href = url;
            }
	    };

	/**
	 * private: method[encodeLayer] :param layer: ``OpenLayers.Layer`` :return:
	 * ``Object``
	 * 
	 * Encodes a layer for the print service.
	 */
	PrintControlDialog.prototype.encodeLayer = function(layer) {
		var that = this; 
		var encLayer;
		for ( var c in that.encoders.layers) {
			if (OpenLayers.Layer[c] && layer instanceof OpenLayers.Layer[c]) {
				encLayer = that.encoders.layers[c].call(that, layer);
				break;
			}
		}
		// only return the encLayer object when we have a type. Prevents a
		// fallback on base encoders like HTTPRequest.
		return (encLayer && encLayer.type) ? encLayer : null;
	};

	/**
	 * private: property[encoders] ``Object`` Encoders for all print content
	 */
	PrintControlDialog.prototype.encoders = {
		"layers" : {
			"Layer" : function(layer) {
				var enc = {};
				if (layer.options && layer.options.maxScale) {
					enc.minScaleDenominator = layer.options.maxScale;
				}
				if (layer.options && layer.options.minScale) {
					enc.maxScaleDenominator = layer.options.minScale;
				}
				return enc;
			},
			"WMS" : function(layer) {
				var t = sMap.cmd.getLayerConfig(layer.name);  //K-M
				var enc = this.encoders.layers.HTTPRequest.call(this, layer);
				$.extend(enc, {
					type : 'WMS',
					layers : [ layer.params.LAYERS ].join(",").split(","),
					format : layer.params.FORMAT,
					styles : [ layer.params.STYLES ].join(",").split(",")
				});
				var param;
				for ( var p in layer.params) {
					param = p.toLowerCase();
					if (!layer.DEFAULT_PARAMS[param]
							&& "layers,styles,width,height,srs".indexOf(param) == -1) {
						if (!enc.customParams) {
							enc.customParams = {};
						}
						enc.customParams[p] = layer.params[p];
					}
				}
				enc.baseURL = t.printURL ? t.printURL : enc.baseURL;  //K-M Special to change service when printing
				enc.format = t.printFormat ? t.printFormat : enc.format;  //K-M
				enc.layers = t.printLayers ? [t.printLayers] : enc.layers;  //K-M
				if (t.printParamDPI){
					enc.customParams.DPI = $("#sprint_" + this.service + "slctResolution").val();  //K-M
				}
				return enc;
			},
			"OSM" : function(layer) {
				var enc = this.encoders.layers.TileCache.call(this, layer);
				return $.extend(enc, {
					type : 'OSM',
					baseURL : enc.baseURL.substr(0, enc.baseURL.indexOf("$")),
					extension : "png"
				});
			},
			"TMS" : function(layer) {
				var enc = this.encoders.layers.TileCache.call(this, layer);
				return $.extend(enc, {
					type : 'TMS',
					format : layer.type
				});
			},
			"TileCache" : function(layer) {
				var enc = this.encoders.layers.HTTPRequest.call(this, layer);
				return $.extend(enc, {
					type : 'TileCache',
					layer : layer.layername,
					maxExtent : layer.maxExtent.toArray(),
					tileSize : [ layer.tileSize.w, layer.tileSize.h ],
					extension : layer.extension,
					resolutions : layer.serverResolutions || layer.resolutions
				});
			},
			"WMTS" : function(layer) {
				var enc = this.encoders.layers.HTTPRequest.call(this, layer);
				return $
						.extend(
								enc,
								{
									type : 'WMTS',
									layer : layer.layer,
									version : layer.version,
									requestEncoding : layer.requestEncoding,
									tileOrigin : [ layer.tileOrigin.lon,
											layer.tileOrigin.lat ],
									tileSize : [ layer.tileSize.w,
											layer.tileSize.h ],
									style : layer.style,
									formatSuffix : layer.formatSuffix,
									dimensions : layer.dimensions,
									params : layer.params,
									maxExtent : (layer.tileFullExtent != null) ? layer.tileFullExtent
											.toArray()
											: layer.maxExtent.toArray(),
									matrixSet : layer.matrixSet,
									zoomOffset : layer.zoomOffset,
									resolutions : layer.serverResolutions
											|| layer.resolutions
								});
			},
			"KaMapCache" : function(layer) {
				var enc = this.encoders.layers.KaMap.call(this, layer);
				return $.extend(enc, {
					type : 'KaMapCache',
					// group param is mandatory when using KaMapCache
					group : layer.params['g'],
					metaTileWidth : layer.params['metaTileSize']['w'],
					metaTileHeight : layer.params['metaTileSize']['h']
				});
			},
			"KaMap" : function(layer) {
				var enc = this.encoders.layers.HTTPRequest.call(this, layer);
				return $.extend(enc, {
					type : 'KaMap',
					map : layer.params['map'],
					extension : layer.params['i'],
					// group param is optional when using KaMap
					group : layer.params['g'] || "",
					maxExtent : layer.maxExtent.toArray(),
					tileSize : [ layer.tileSize.w, layer.tileSize.h ],
					resolutions : layer.serverResolutions || layer.resolutions
				});
			},
			"HTTPRequest" : function(layer) {
				var enc = this.encoders.layers.Layer.call(this, layer);
				return $
						.extend(
								enc,
								{
									baseURL : this
											.getAbsoluteUrl(layer.url instanceof Array ? layer.url[0]
													: layer.url),
									opacity : (layer.opacity != null) ? layer.opacity
											: 1.0,
									singleTile : layer.singleTile
								});
			},
			"Image" : function(layer) {
				var enc = this.encoders.layers.Layer.call(this, layer);
				return $.extend(enc, {
					type : 'Image',
					baseURL : this.getAbsoluteUrl(layer.getURL(layer.extent)),
					opacity : (layer.opacity != null) ? layer.opacity : 1.0,
					extent : layer.extent.toArray(),
					pixelSize : [ layer.size.w, layer.size.h ],
					name : layer.name
				});
			},
			"Vector" : function(layer) {
				if (!layer.features.length) {
					return;
				}

				var encFeatures = [];
				var encStyles = {};
				var features = layer.features;
				var featureFormat = new OpenLayers.Format.GeoJSON();
				var styleFormat = new OpenLayers.Format.JSON();
				var nextId = 1;
				var styleDict = {};
				var feature, style, dictKey, dictItem, styleName;
				for ( var i = 0, len = features.length; i < len; ++i) {
					feature = features[i];
					style = feature.style
							|| layer.style
							|| layer.styleMap.createSymbolizer(feature,
									feature.renderIntent);
					dictKey = styleFormat.write(style);
					dictItem = styleDict[dictKey];
					if (dictItem) {
						// this style is already known
						styleName = dictItem;
					} else {
						// new style
						if (style.fillColor) {
							style.fillColor = this.to16Bit(style.fillColor);
						}
						if (style.strokeColor) {
							style.strokeColor = this.to16Bit(style.strokeColor);
						}
						if (style.fontColor) {
							style.fontColor = this.to16Bit(style.fontColor);
						}
						styleDict[dictKey] = styleName = nextId++;
						if (style.externalGraphic) {
							// Replaced Ext.applyIf not same as extend
							style.externalGraphic = this.getAbsoluteUrl(style.externalGraphic);
							encStyles[styleName] = $.extend({
								externalGraphic : style.externalGraphic
							}, style);
						} else {
							encStyles[styleName] = style;
						}
					}
					var featureGeoJson = featureFormat.extract.feature.call(
							featureFormat, feature);
					
					delete featureGeoJson.properties.style;

					featureGeoJson.properties = OpenLayers.Util.extend({
						_gx_style : styleName
					}, featureGeoJson.properties);

					encFeatures.push(featureGeoJson);
				}
				var enc = this.encoders.layers.Layer.call(this, layer);
				return $.extend(enc, {
					type : 'Vector',
					styles : encStyles,
					styleProperty : '_gx_style',
					geoJson : {
						type : "FeatureCollection",
						features : encFeatures
					},
					name : layer.name,
					opacity : (layer.opacity != null) ? layer.opacity : 1.0
				});
			},
			"Markers" : function(layer) {
				var features = [];
				for ( var i = 0, len = layer.markers.length; i < len; i++) {
					var marker = layer.markers[i];
					var geometry = new OpenLayers.Geometry.Point(
							marker.lonlat.lon, marker.lonlat.lat);
					var style = {
						externalGraphic : marker.icon.url,
						graphicWidth : marker.icon.size.w,
						graphicHeight : marker.icon.size.h,
						graphicXOffset : marker.icon.offset.x,
						graphicYOffset : marker.icon.offset.y
					};
					var feature = new OpenLayers.Feature.Vector(geometry, {},
							style);
					features.push(feature);
				}
				var vector = new OpenLayers.Layer.Vector(layer.name);
				vector.addFeatures(features);
				var output = this.encoders.layers.Vector.call(this, vector);
				vector.destroy();
				return output;
			}
		},
		"legends" : {
			"gx_wmslegend" : function(legend, scale) {
				var enc = this.encoders.legends.base.call(this, legend);
				var icons = [];
				for ( var i = 1, len = legend.items.getCount(); i < len; ++i) {
					var url = legend.items.get(i).url;
					if (legend.useScaleParameter === true
							&& url.toLowerCase().indexOf(
									'request=getlegendgraphic') != -1) {
						var split = url.split("?");
						var params = {};
						(function() {
							var match, pl = /\+/g, // Regex for replacing
							// addition symbol with a
							// space
							search = /([^&=]+)=?([^&]*)/g, decode = function(s) {
								return decodeURIComponent(s.replace(pl, " "));
							};
							// ,query = window.location.search.substring(1);

							while (match = search.exec(split[1]))
								urlParams[decode(match[1])] = decode(match[2]);
						})();

						// var params = Ext.urlDecode(split[1]);
						params['SCALE'] = scale;
						url = split[0] + "?" + $.param(params);
					}
					icons.push(this.getAbsoluteUrl(url));
				}
				enc[0].classes[0] = {
					name : "",
					icons : icons
				};
				return enc;
			},
			"gx_urllegend" : function(legend) {
				var enc = this.encoders.legends.base.call(this, legend);
				enc[0].classes.push({
					name : "",
					icon : this.getAbsoluteUrl(legend.items.get(1).url)
				});
				return enc;
			},
			"base" : function(legend) {
				return [ {
					name : legend.getLabel(),
					classes : []
				} ];
			}
		}
	};
	
	/**
	 * private: method[to16Bit] :param color: ``String`` :return:
	 * ``String``
	 * 
	 * Converts the provided 8-bit color to 16-bit. Only 8-bit colors will be converted.
	 */
	PrintControlDialog.prototype.to16Bit = function(color) {
		var bit8ColorRegex = new RegExp("^#([0-9a-f]{3})$");
		if (color.match(bit8ColorRegex)) {
			var colorParts = [color.substring(1,2), color.substring(2,3), color.substring(3,4)];
			color = "#" + colorParts.join("0") + "0";
		}
		return color;
	};

	/**
	 * private: method[getAbsoluteUrl] :param url: ``String`` :return:
	 * ``String``
	 * 
	 * Converts the provided url to an absolute url.
	 */
	PrintControlDialog.prototype.getAbsoluteUrl = function(url) {
		var a;
		var version = parseInt($.browser.version, 10);
		if ($.browser.msie && (version === 6 || version === 7|| version === 8)) {
			a = document.createElement("<a href='" + url + "'/>");
			a.style.display = "none";
			document.body.appendChild(a);
			a.href = a.href;
			document.body.removeChild(a);
		} else {
			a = document.createElement("a");
			a.href = url;
		}
		return a.href;
	};
	/*
	 * Turn off mask editing before close of the dialog
	 */
	PrintControlDialog.prototype.beforeDialogclose = function(e) {
		if (this.maskEditingLayer && this.maskEditingLayer.visibility){
			$('#sprint_Print_chkUseMask').prop('checked', false);
			this.toggleMaskEditing();
		}
	};
	PrintControlDialog.prototype.onDialogclose = function(e) {
		this.core.module.deactivate();
		//this.core.dialogCloseClicked = true;
		
		// unbind update extent event(s)
		this.map.events.unregister("zoomend", this, this.showExtent);
		//this.map.events.unregister("zoomend", this, this.setCurrentScale);
		//this.map.events.unregister("changebaselayer", this, this.updateScales);
		this.map.events.unregister("moveend", this, this.showExtent);
		
		// Destroy the extent layer
		this.extentLayer.destroyFeatures();
		this.map.removeLayer(this.extentLayer);
		this.extentLayer.destroy();
		this.extentLayer = null;
		
		return true;
	};

	sMap.Module.SPrint.PrintControlDialog = PrintControlDialog;

}());