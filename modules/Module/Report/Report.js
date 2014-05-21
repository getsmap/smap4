/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Report = OpenLayers.Class(sMap.Module, {
	
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
			sMap.Module.Report.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Report.prototype.EVENT_TRIGGERS.concat(
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
		this.createDialog();
		if (this.dialog) {
			this.dialog.dialog("open");
		}
		else {
			// Print directly with default values.
			this.createReport();
		}
		var self = this;
		var onSubmit = function() {
			self.createReport(  $(this).serializeArray() );
			return false;
		};
		this.onSubmit = onSubmit;
		this.dialog.find("form").on("submit", this.onSubmit);
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		this.dialog.find("form").off("submit", this.onSubmit);
		if (this.dialog) {
		    this.active = false;
		    this.dialog.dialog("close");
		    this.active = true;
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
	
	createDialog: function() {
		if (!this.formHtml) {
			return false;
		}
		var self = this;
		if (this.dialog) {
			return false;
		}
		this.dialog = $("<div />");
		this.dialog.append(this.formHtml);
		
		var dialogOptions = $.extend({
		    title: "Skapa rapport",
			autoOpen: false,
			open: function() {
			    $(this).find("input, textarea").val(null); // reset
			},
			close: function() {
			    if (self.active) {
			        self.deactivate();
			    }
			},
			buttons: [
			          {
			        	  text: this.lang.labelText,
			        	  click: function() {
			        	  		var data = $(this).find("form").submit();
			        	  		$(this).dialog("close");
			          		}
			          }
			]
		}, this.dialogOptions);
		this.dialog.dialog(dialogOptions);
	},
	
	/**
	 * Extract data from the form, call the print function and
	 * create a new window with everything merged and print it.
	 * 
	 * @param data {Object} Serialized object from the submitted form.
	 * @returns {void}
	 */
	createReport: function(arr) {
		arr = arr || [];
		
		
		sMap.cmd.loading(true, {bg: true});
		var self = this;
		this.winHtml = $("<div />");
		
		var table = $("<table />");
		for (var i=0,len=arr.length; i<len; i++) {
			var obj = arr[i];
			if (this.formLabels && this.formLabels instanceof Object) {
			    labelText = this.formLabels[obj.name] || "";
			}
			if (i % 2 === 0) {
			    // even number
			    row = $("<tr />");
			    table.append(row);
			}
			row.append("<td style='min-width: 300px;'>"+labelText + obj.value + "</td>");
		}
		var btnPrint = $('<button id="btn-print" style="position:absolute;padding:10px;right:40px;top: 20px;">Skriv ut</button>');
		
		this.winHtml.append(btnPrint);
		btnPrint.click(function() {
		    btnPrint.remove();
		    self.reportWin.print();
		    self.reportWin.close();
		});
		if (table) {
			this.winHtml.append(table);
		}
		// If u want a legend – uncomment this code...
//		var legendHtml = this.getLegend();
//		this.winHtml.append(legendHtml);
		
		/**
		 * The window is printed when the map(s) are created (on callback).
		 */
		this.exportMaps();
	},
	
	getLegend: function() {
		var self = this;
		var t,
			arr = sMap.config.layers.overlays,
			src,
			row,
			html = $("<div />"),
			table = $("<table />"),
			isVisible;
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
//				src = sMap.config.rootURL.replace(/index.html/g, "").replace(/index_dev.html/g, "") + src;
				var img = "<img src='"+src+"'></img>";
				row.find("td:first").append(img);
			}
			table.append(row);
			row.find("img").attr({
				"height": "45",
				"width": "45"
			}); //.load(onLoad);
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
			return $("<div />");
		}
		// Append header
		//html.append("<h1>"+this.lang.legendHeader + (sMap.config.mapName ? sMap.config.mapName[sMap.langCode] : "...mapName missing in config") + "</h1>");
		html.append(table);
		
		return html;
	},
	
	exportMaps: function() {
		var self = this,
			i = 0, html = "";
			
		var curZoom = this.map.getZoom(),
		    curRes = this.map.getResolutionForZoom(curZoom);
		var zoomOverview = this.zoomOverview,
		    zoomOverviewRelative = this.zoomOverviewRelative;
		
		if (zoomOverviewRelative && !zoomOverview) {
		     zoomOverview = curZoom + zoomOverviewRelative;
		     if (zoomOverview <= 0) {
		        zoomOverview = 0; // not lower than this...
		     }
		}
		resOverview = this.map.getResolutionForZoom(zoomOverview);
		
		if (zoomOverview >= curZoom) {
		    // we have a problem :). Overview map should not be more zoomed out
		    // than the area it depicts.
		    zoomOverview = curZoom;
		}
		
		var ctrls = this.map.getControlsByClass("sMap.Module.SPrint");
		this.printControl = ctrls.length ? ctrls[0] : null;
		
		var makeMap1 = function() {
		    // Call export once
		    var d = $.Deferred();
            self.printControl.core.dialog.print("Export_", "PNG", {
                dpi: 96,
                orientation: "Landscape",
                format: "A5",
                timeout: 20000,
                onSuccess: function(url) {
                    d.resolve(url);
                    //makeMap2();
                },
                onError: function(a,textStatus,c) {
                    d.reject(textStatus);
                },
                onComplete: function() {
                	sMap.cmd.loading(true, {bg: true}); // SPrint hides loading just before this...
                },
                scale: sMap.util.getScaleFromResolution(curRes),
                resolution: curRes
            });
            return d.promise();
		};
		
		var makeMap2 = function() {
		    var d = $.Deferred();
		    
            var extentLayer = new OpenLayers.Layer.Vector("extlayer", {
                styleMap: new OpenLayers.StyleMap({
                    "default": new OpenLayers.Style({
                        fillOpacity: 0,
                        strokeColor: "#0000FF",
                        strokeWidth: 4
                    })
                })
            });
            
            // TODO: get extent from current view is not the same as the exported view...
            var extentFeature = new OpenLayers.Feature.Vector(self.map.getExtent().toGeometry(), {});
            extentLayer.addFeatures([extentFeature]);
            
            setTimeout(function() {
            	// If you want a different baseLayer for the overview map, the parameter overviewBaseLayerName
            	// will make the beef.
            	var overviewBl,
            	changeBl = false;
            	if (self.overviewBaseLayerName) {
            		overviewBl = self.map.getLayersByName(self.overviewBaseLayerName)[0];
            		changeBl = self.map.baseLayer;
            		self.map.setBaseLayer(overviewBl); // for now - change back later
            	}
            	else {
            		overviewBl = self.map.layers.baseLayer;
            	}
                self.printControl.core.dialog.print("Export_", "PNG", {
                    dpi: 96,
                    orientation: "Landscape",
                    format: "A5",
                    timeout: 20000,
                    layers: [overviewBl, extentLayer],  // create image with only baselayer
                    onSuccess: function(url) {
                        d.resolve(url);
                    },
                    onError: function(a,textStatus,c) {
                        d.reject(textStatus);
                    },
                    onComplete: function() {
                    	if (changeBl) {
                    		self.map.setBaseLayer(changeBl); // Change back
                    	}
                    },
                    scale: sMap.util.getScaleFromResolution(resOverview),
                    resolution: resOverview
                });
            
            }, 1000);
            return d.promise();
		    
		};
		var onFail = function(textStatus) {
			sMap.cmd.loading(false);
		    debug.log(textStatus);
            alert("Kunde inte skapa kartbild.\nErrormeddelande: "+textStatus);
		};
		var urls = [];
		makeMap1().done(function(url) {
		    urls = urls.concat(url);
		    makeMap2().done(function(url) {
		    	sMap.cmd.loading(false);
                var rootUrl, img;
                urls = urls.concat(url).reverse(); // Put the overview map in the beginning
                var table = $(
                	"<div style='margin-top: 50px;text-align:center;'>" +
                		"<span style='text-align:center;margin:0;'></span>" +
                		"<span style='text-align:center;margin:0;'></span>" +
                	"</div>");
                for (var i=0,len=urls.length; i<len; i++) {
                    url = urls[i];
                    if (url) {
                        rootUrl = location.href.split("?")[0].replace(location.pathname, "");
                        url = rootUrl + url;
                        img = $('<img width="700px" style="margin-top:20px;" src="'+url+'"></img>');
                        if (i === 0) {
                            img.css("width", "350px");
                        }
                        table.find("span:eq("+i+")").append(img);
                    }
                }
                self.winHtml.append(table);
                
                var h = screen.height < 1000 ? screen.height : 1000; // Limit window height to 1000 or screen height
                self.reportWin = window.open('', '', 'left=200,top=10,width=800,height='+h);
                self.reportWin.focus();
                
                if (self.preHtml) {
                    $(self.reportWin.document.body).prepend(self.preHtml);
                }
                if ($.browser.msie) {
                    self.reportWin.document.write(self.winHtml.html());
                    var btn = $(self.reportWin.document.body).find("#btn-print")[0];
                    window.win = self.reportWin;
                    btn.onclick = function() {
                    	btn.style.display = "none";
                    	window.win.focus();
                    	window.win.document.close();
                    	window.win.print();
                        return false;
                    };
                }
                else {
                    $(self.reportWin.document.body).append(self.winHtml);
                }
                
                if (self.postHtml) {
                    if ($.browser.msie) {
                        self.reportWin.document.write(self.postHtml);
                    }
                    else {
                        $(self.reportWin.document.body).prepend(self.postHtml);
                    }
                    
                }
                
		    }).fail(onFail);
		}).fail(onFail);
	},
	
	
    /**
     * Called when all modules are initialized, i.e. after initialize.
     * All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
	    // Allow extending lang from config
	    var langObj = this.labels instanceof Object ? this.labels[sMap.langCode] : {};
	    $.extend(this.lang, langObj);
	    
	    var btnId = "btn-report",
            nbr = 0;
	    while ( $("#"+btnId).length > 0 ) {
	        nbr += 1;
	        btnId = "btn-report" + nbr;
	    }
	    
		var options = {
				index : this.toolbarIndex,
				hoverText : this.lang.labelButtonHover || "",
				iconCSS : "ui-icon-document",
				label : this.lang.labelButton || "",
				tagID : btnId,
				menuId: this.addToToolsMenu,
				bindActivation: true
		};
		var event = this.addToToolsMenu ? "addtomenu" : "addtoolbutton";
		sMap.events.triggerEvent(event, this, options);
		this.toolbarButton = $("#"+btnId);
	}, 
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Report"
	
});
