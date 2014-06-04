

sMap.DivController = OpenLayers.Class({
	
	initialize : function(map) {
		this.map = map;
		if (sMap.config.minWidth) {
			$("#smapDiv").css("min-width", sMap.config.minWidth+"px");
		}
	},
	
	/**
	 * When the browser window is resized - resize all divs in the map that
	 * are part of the sMap-core. Modules need to take care of their own
	 * resizing. Divs part of the core are: smapDiv, mapDiv, toolbarDiv,
	 * sideDivLeft, sideDivRight.
	 * @returns {void}
	 */
	bindOnWindowResize : function() {
		
		/**
		 * JL: Allow elements to adjust when divs have been positioned.
		 */
		sMap.events.register("maploaded", this, function() {
			$(window).resize();
			$(window).resize(); // One extra for Chrome
			
			if ($.browser.msie && parseInt($.browser.version) < 8) {
				// Resize not working in IE7 otherwise
				setTimeout("$(window).resize()", 100);
			}

		});
		
		var self = this;
		
		// On window resize - do this.
		$(window).resize(function(e) {
			var mapDiv = $("#mapDiv"),
				smapDiv = $("#smapDiv"),
				sideDivLeft = $("#sideDivLeft"),
				sideDivRight = $("#sideDivRight"),
				toolbarDiv = $("#toolbarDiv");
			var availWidth = smapDiv.innerWidth(),
				availHeight = smapDiv.innerHeight();
			
			/**
			 * Check size of divs
			 */
			var checkSize = function() {
				var needToResize = false;
				var calcHeight = mapDiv.outerHeight() + toolbarDiv.outerHeight(),
					calcWidth = mapDiv.outerWidth() + (sideDivLeft.is(":visible") ? sideDivLeft.outerWidth() : 0)
					 + (sideDivRight.is(":visible") ? sideDivRight.outerWidth() : 0);
				if (availHeight !== calcHeight) {
					needToResize = true;
				}
				if (availWidth !== calcWidth) {
					needToResize = true;
				}
				return needToResize;
			};
			
			/**
			 * Resize divs
			 */
			var doResize = function() {
				
				// Available height for everything filling up below toolbarDiv.
				var height = availHeight - toolbarDiv.outerHeight();
				$(sideDivLeft).outerHeight(height);
				$(sideDivRight).outerHeight(height);
				$(mapDiv).outerHeight(height);
				
				var mapDivWidth = availWidth - ((sideDivLeft.is(":visible") ? sideDivLeft.outerWidth() : 0) 
						+ (sideDivRight.is(":visible") ? sideDivRight.outerWidth() : 0));
				sideDivRight.css("left", mapDivWidth+"px");
				mapDiv.outerWidth(mapDivWidth);
				self.map.updateSize();
				
				// Adjust mapDivs position if not already done (bug in Chrome).
				if (toolbarDiv.length) {
					var height = toolbarDiv.data("height");
					mapDiv.css("top", height+"px");
				}
				
				/**
				 * Trigger event after window was resized so that modules can adapt their
				 * size AFTER the change has happened.
				 */
				//sMap.events.triggerEvent("afterwindowresized", self, {});
			};
			var needToResize = checkSize();
			if (needToResize===true) {
				doResize();
			}
		});
	},
	
	addToolbarDiv : function(e) {
		if ( $("#toolbarDiv").length) return;
		
		var toolbarDiv = $("<div id='toolbarDiv' />"),
			outerHeight = e.height || 20;
			//outerWidth = $("#smapDiv").innerWidth();
		
		toolbarDiv.data("height", outerHeight); // Store so that resize can move mapdiv down if not already done.
		
		// Decrease the height of all other children of smapDiv.
		var divsToReposition = [ $("#mapDiv"), $("#sideDivLeft"), $("#sideDivRight") ];
		for (var i=0,len=divsToReposition.length; i<len; i++) {
			var div = divsToReposition[i];
			if (div.length) {
				$(div).css({
					"top" : sMap.util.trimCSS($(div).css("top")) + outerHeight+"px",
					"height" : $(div).height() - outerHeight+"px"
				});
			}
		}
		$("#smapDiv").append(toolbarDiv);
		
		// Set height
		$(window).resize(); // Make it possible for modules to adapt to the change
		toolbarDiv.outerHeight(outerHeight);
	},
	
	removeToolbarDiv : function(e) {
		if ( $("#toolbarDiv").length==0) return;
		
		// Calc free space in y-dimension.
		var outerHeight = $("#toolbarDiv").outerHeight();
		$("#toolbarDiv").empty().remove();
		
		// Let the other divs fill the free space.
		var divsToReposition = [ $("#mapDiv"), $("#sideDivLeft"), $("#sideDivRight") ];
		for (var i=0,len=divsToReposition.length; i<len; i++) {
			var div = divsToReposition[i];
			if (div.length) {
				$(div).css({
					"top" : sMap.util.trimCSS($(div).css("top")) - outerHeight+"px"
				});
				$(div).outerHeight( $(div).outerHeight() + outerHeight);
			}
		}
		
		$("#smapDiv").children().each(function() {
			
		});
		$(window).resize(); // Make it possible for modules to adapt to the change
		this.map.updateSize();
	},
	
	removeSideDivLeft : function(e) {
		if ( $("#sideDivLeft").length==0) return;
		
		var outerWidth = $("#sideDivLeft").outerWidth();
		
		$("#sideDivLeft").empty().remove();
		
		// Give the remaining width to the map's div.
		$("#mapDiv").width( $("#mapDiv").width() + outerWidth);
		$("#mapDiv").css({
			"position" : "absolute",
			"left" : "0px"
		});
		$(window).resize(); // Make it possible for modules to adapt to the change
	},
	
	removeSideDivRight : function(e) {
		var sideDivRight = $("#sideDivRight");
		if ( sideDivRight.length==0) return;
		
		var outerWidth = sideDivRight.outerWidth();
		
		sideDivRight.empty().remove();
		
		// Give the remaining width to the map's div.
		$("#mapDiv").width( $("#mapDiv").width() + outerWidth);
		$(window).resize(); // Make it possible for modules to adapt to the change			
	},
	
	hideSideDivRight : function(e) {
		var sideDivRight = $("#sideDivRight");
		if ( sideDivRight.length==0) return;
		var outerWidth = sideDivRight.outerWidth();		
		sideDivRight.hide();
		
		// Give the remaining width to the map's div.
		$("#mapDiv").width( $("#mapDiv").width() + outerWidth);
		$(window).resize(); // Make it possible for modules to adapt to the change
	},
	
	/**
	 * 
	 * @param e {Object}
	 * 	- width {Integer} (Optional) Width of side div in px.
	 * 	- height {Integer} (Optional) Height of side div in px. If not provided, it will
	 * 		automatically adapt (recommended).
	 * @returns {void}
	 */
	addSideDivRight : function(e) {
		if ( $("#sideDivRight").length ) return;
		
		var sideDivRight = $("<div id='sideDivRight' />");
		$("#smapDiv").append(sideDivRight);
		// Calculate the maximum height the div can have and the position from the top.
		var remainingHeight=$("#smapDiv").outerHeight(), // Remaining height for the div
			top = 0;
		if ( $("#toolbarDiv").length ) {
			var h = $("#toolbarDiv").outerHeight();
			remainingHeight -= h;
			top += h;
		}
		var width = e.width || 200,
			height = e.height || remainingHeight;
		
		var sideDivLeft = $("#sideDivLeft");
		
		var mapDivWidth = $("#mapDiv").width();
		var newMapDivWidth = mapDivWidth - width;
		$("#mapDiv").width( newMapDivWidth );
		
		var left = (sideDivLeft.length ? sideDivLeft.outerWidth() : 0) + $("#mapDiv").outerWidth();
		
		sideDivRight.css({
			"position" : "absolute",
			"left" : left+"px",
			"top" : top+"px"
		});
		
		// Set outer width and height of the div.
		sideDivRight.outerWidth(width);
		sideDivRight.outerHeight(height);
		if (sMap.events.mapInitiated) {
			$(window).resize(); // Make it possible for modules to adapt to the change
			this.map.updateSize();			
		}
	},
	
	addSideDivLeft : function(e) {
		if ( $("#sideDivLeft").length ) return;
		
		var sideDivLeft = $("<div id='sideDivLeft' />");
		$("#smapDiv").append(sideDivLeft);
		// Calculate the maximum height the div can have and the position from the top.
		var remainingHeight=$("#smapDiv").outerHeight(), // Remaining height for the div
			top = 0;
		if ( $("#toolbarDiv").length ) {
			var h = $("#toolbarDiv").outerHeight();
			remainingHeight -= h;
			top += h;
		}
		var width = e.width || 200,
			height = e.height || remainingHeight;
		sideDivLeft.css({
			"position" : "absolute",
			"left" : "0px",
			"top" : top+"px"
		});
		
		// Set outer width and height of the div.
		sideDivLeft.outerWidth(width);
		sideDivLeft.outerHeight(height);
		
		// Adjust other divs' position accordingly.
		$("#mapDiv").css({
			"left" : sMap.util.trimCSS($("#mapDiv").css("left")) + width +"px"
		});
		
		var mapDivWidth = $("#mapDiv").width();
		var newMapDivWidth = mapDivWidth - width;
		debug.log($("#mapDiv").width() + "->"+newMapDivWidth);
		$("#mapDiv").width( newMapDivWidth );
		
		if ( $("#sideDivRight").length ) {
			$("#sideDivRight").css({
				"left" : sMap.util.trimCSS($("#sideDivRight").css("left")) + width +"px"
			});
		}
		if (sMap.events.mapInitiated) {
			$(window).resize(); // Make it possible for modules to adapt to the change
			this.map.updateSize();			
		}
	},
	
	CLASS_NAME : "sMap.DivController"
	
});
