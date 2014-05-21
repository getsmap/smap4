/**
 * Contains utility function used by sMap core and sMap modules.
 */



sMap.util = {
		
		/**
		 * 
		 * @param resolution
		 * @returns
		 */
		getScaleFromResolution: function(resolution) {
			var units = sMap.map.getUnits();  // sMap.map.baseLayer.units;
			scale = OpenLayers.Util.getScaleFromResolution(resolution, units);
			return scale;
		},
		
		/**
		 * Create a unique id. The nbr makes sure it is unique.
		 * @param prefix {String} Optional.
		 * @returns {String} A unique ID.
		 */
		createUniqueId: function(prefix) {
			this.nbr = !this.nbr 
			
			
			prefix = prefix || "";
			this.nbr = typeof this.nbr === "undefined" ? 0 : this.nbr + 1;
			return prefix + this.nbr;
		},
		
		/**
		 * Don't allow events going through the given element to the
		 * the map on these events:
		 * 
		 * @param tag {HTML Object}
		 * @returns {void}
		 */
		disableMapInteraction: function(tag) {
			$(tag).dblclick(function(e) {
				OpenLayers.Event.stop(e);
			});
			$(tag).mousedown(function(e) {
				OpenLayers.Event.stop(e);
			});
			$(tag).click(function(e) {
				OpenLayers.Event.stop(e);
			});
		},
		
		/**
	     * Method: getNearestFeature
	     * Return the feature closest to the clicked position.
	     * 
	     * Parameters:
	     * features - {Array(<OpenLayers.Feature.Vector>)}
	     * clickPosition - {<OpenLayers.LonLat>}
	     */
	    getNearestFeature: function(features, clickPosition) {
	        if(features.length) {
	            var point = new OpenLayers.Geometry.Point(clickPosition.lon,
	                clickPosition.lat);
	            var feature, resultFeature, dist;
	            var minDist = Number.MAX_VALUE;
	            for(var i=0; i<features.length; ++i) {
	                feature = features[i];
	                if(feature.geometry) {
	                    dist = point.distanceTo(feature.geometry, {edge: false});
	                    if(dist < minDist) {
	                        minDist = dist;
	                        resultFeature = feature;
	                        if(minDist == 0) {
	                            break;
	                        }
	                    }
	                }
	            }
	            return resultFeature;
	        }
	    },
		
		/**
		 * Replace all attribute keys found in curly brackets ${...} by
		 * the attribute value corresponding to the key. This method is
		 * used by Popup and BlixtenPopup modules.
		 * 
		 * @param attributes {Object} The feature's attributes.
		 * @param text {String} The text, which might contain some attribute keys.
		 * @returns {String}
		 */
		extractAttributes : function(attributes, text) {
			function extractAttribute(a, txt) {
				var index = txt.search(/\${/g);
				if (index !== -1) {
					var extractedAttribute = "";
					
					// Find the end of the attribute
					var attr = text.substring(index + 2);
					var endIndex = 0;
					if (attr.substring(0, 8) === "function") {
						endIndex = sMap.util.getFunctionEnd(attr);
					}
					else {
						endIndex = attr.search(/\}/g);
						
					}
					attr = attr.substring(0, endIndex);
					
					if (attr.substring(0, 8) === "function") {
						var theFunc = attr.replace("function", "function f");
						eval(theFunc);
//						alert(typeof f);
						extractedAttribute = f.call(this, a);
					}
					else {
						// Replace ${...} by the extracted attribute.
						extractedAttribute = a[attr] || ""; // If attribute does not exist – use empty string "".						
					}
					txt = txt.replace("${"+attr+"}", extractedAttribute);
				}
				return txt;
			}
			
			// Extract attributes until there are no left to extract.
			var index = text.search(/\${/g);
			while (index !== -1) {
				text = extractAttribute(attributes, text);			
				index = text.search(/\${/g);
			}
			return text;
		},
		
		getFunctionEnd: function(text) {
			var p = 1,
	            found = false,
	            startIndex = text.search(/\{/g); // get starting "{"
	        text = text.substring(startIndex+1);
	        var i=0;            
	        for (i=0,len=text.length; i<len; i++) {
	        	if (text.charAt(i) === "{") {
	        		p += 1;
	        	}
	        	else if (text.charAt(i) === "}") {
	        		p -= 1;
	        	}
	        	if (p === 0) {
	        		found = true;
	        		i = i + startIndex + 2;
	        		break;
	        	}
	        }
	        if (!found) {
	        	i = -1;
	        }
	        return i;
	    },
		
		/**
		 * Add a question mark to the URL IF it does not exist.
		 * Note! You might be better using OpenLayers.Util.urlAppend
		 * @param url {String}
		 * @returns {String}
		 */
		addQMark: function(url) {
			if (url.indexOf(url.length - 1) != "?") {
				url += "?";
			}
			return url;
		},
		/**
		 * Add a slash to the path if it does not already exist.
		 * Note! You might be better using OpenLayers.Util.urlAppend
		 * @param path {String}
		 * @returns {String}
		 */
		addSlash: function(path) {
			if (path.indexOf(path.length - 1) != "/") {
				path += "/";
			}
			return path;
		},
		
		/**
		 * Get the geometry type of the input feature:
		 * 	- point
		 *  - line
		 *  - polygon
		 *  
		 * @param feature geometry {OpenLayers.Geometry}
		 * @returns {String} "point", "line", "polygon" || {null} (if no match was found)
		 */
		getGeomType : function(geometry) {
			var area = geometry.getArea(),
				length = geometry.getLength();
			if ( area==0 && length==0) {
				// point
				return "point";
			}
			else if ( area==0 && length > 0) {
				return "line";
			}
			else if ( area > 0 && length > 0) {
				return "polygon";
			}
			else {
				return null;
			}
			
			
		},
		
		/**
		 * Get the map's starting pixel (upper-left) in relation
		 * to the document.
		 * @returns {Object}
		 *     - left {Integer} Distance in px from left.
		 *     - top {Integer} Distance in px from top.
		 */
		getMapOrigo : function() {
			return $("#mapDiv").position();
		},
		
		/**
		 * Trim and parse css values: px, em or pt.
		 * @param str {String} E.g. "5px" -> 5.0
		 * @returns {Float}
		 */
		trimCSS : function(str) {
			str = str.replace("px", "").replace("em", "").replace("pt", "");
			return parseFloat(str);
		},
		
		/**
		 * Convert parameters object to string. Keys will be made into lower-case
		 * @param obj {Object} Key value pairs that will be converted to URL parameters {String}
		 * @returns {String} URL parameters string.
		 */
		paramsObjToString : function(obj) {
			var params = "";
			for (var k in obj) {
				var val = obj[k];
				params = params + "&"+k+"="+val;
			}
			params = params.substring(1);
			return params;
		},
		
		/**
		 * TODO: Replace this by $.inArray which does the same thing.
		 * Give support for indexOf for IE.
		 * @param arr {Array}
		 * @param item {Any supported type} Item in the array.
		 * @returns {Integer}
		 */
		indexOf : function(arr, item) {
			if (navigator.appName == 'Microsoft Internet Explorer') {
				for (var i=0,len=arr.length; i<len; i++) {
					if (arr[i]==item) {
						return i;
					}
				}
				return -1;
			}
			else {
				return arr.indexOf(item);
			}
		},
		
		/**
		 * Get the parameter value in the URL.
		 * @param url {String} The URL
		 * @param param {String} The parameter in the URL. E.g. 'width'
		 * @return {String}
		 *     Parameter value. If param not in url -> returns null. If param in URL but no value -> returns "".
		 */
		getParameterValueFromURL : function(url, param) {
			url = url.toLowerCase();
			param = param.toLowerCase();
			
			var val = null;
			
			var paramExists = url.search(param + "=");
			if (paramExists!=-1) {
				var urlR = url.split(param + "=")[1];
				val = urlR.split("&")[0];
			}
			return val;
		},
		
		infoDialog : function(div, config) {
			var defaultConfig={
				resizable: true
			};
			
			$.extend(defaultConfig, config);
			var theDialog = div.dialog(defaultConfig);
			return theDialog;
		},
		
		
		/**
		 * Binds a jQuery dialog to input div with desired settings.
		 * @param div {jQuery-div} The div to which the dialog will be bound.
		 * @param config {Object} Containing dialog settings of which these are required:
		 *     - width
		 *     - height
		 * @returns void
		 */
		createDialog : function(div, config) {
			config = config || {};
			
			// Put default values for config attributes.
			
			var defConfig = {
					titleText: "",
					position: [68,40],
					minWidth: 50,
					minHeight: 50,
					modal: false,
					draggable: true
			};
			config = $.extend(true, defConfig, config);
			
			// Initiate the dialog - but start closed.
			div.dialog( {
				autoOpen : false,
				title : config.title || config.titleText,
				closeOnEscape: config.closeOnEscape===false ? false : true,
				bgiframe : true,
				width : config.width,
				height : config.height,
				minWidth : config.minWidth,
				minHeight : config.minHeight,
				maxHeight : config.maxHeight,
				modal : config.modal,
				resizable : config.resizable,
				draggable : config.draggable,
				position: config.position, // problems in IE7 - don't know why!!!
				//zIndex: 1004,
				buttons : config.buttons,
				dragStart: function(e, ui) {
					/*$(this).parent().css({
						"filter" : "alpha(opacity=70)",
						"opacity" : "0.7"
					});
					$(this).hide(); // hide the content when dragging.*/
				},
				dragStop : function(e, ui) {
					/*$(this).parent().css({
						"filter" : "alpha(opacity=100)",
						"opacity" : "1"
					});
					$(this).show();*/
					if (config.dragStop!=null) {
						config.dragStop.call(e, ui);
					}
				},
				focus : config.onFocus,
				close : config.onClose,
				show: config.onShow,
				open : function(e, ui) {
					// After adding relative width and height to the sMap core divs
					// an issue occurred in IE7 when a dialog opens - everything becomes white.
					// This solves things (hopefully there are no severe side-effects to expect :P)
					if ($.browser.msie) {
						$("#smapDiv").hide().show();
					}
					if (config.onOpen) {
						config.onOpen(e, ui);
					}
				}
			});
		},
		/**
		 * Take away "px" from the string and parse int.
		 * @param numberPx {String} A string, e.g. '128px'
		 */
		takeAwayPx : function(numberPx) {
			var nr = null;
			if (numberPx && numberPx.length) {
				var nrAsTxt = numberPx.substring(0, numberPx.length-2);
				nr = parseInt(nrAsTxt);
			}
			return nr;
		},
		/**
		 * Take away a specified amount of right-most characters in the input text string and return it.
		 * @param text {String} The input string to be processed.
		 * @param nr {Integer] The number of chars to take away from the right of the string.
		 * @return
		 */
		rightStrip : function(text, nr) {
			var newText = null;
			if (text.length >= nr) {
				newText = text.substring(0, text.length-nr);
			}
			else {
				newText = text;
			}	
			return newText;
		},
		/**
		 * Return a (re)projected point.
		 * 
		 * TODO: This function should be made deprecated since OpenLayers.Geometry
		 * instances "make the beef" like this: geom.transform(fromProj, toProj).
		 * 
		 * @param sourceEPSG {String} EPSG code for the source projection. E.g. "EPSG:3008"
		 * @param destEPSG {String} EPSG code for the source projection. E.g. "EPSG:4326"
		 * @param x {Number} x or lon or "easting"
		 * @param y {Number} y or lat or "northing"
		 * @return {Object} Projected point. x and y are stored as: p.x and p.y
		 */
		projectPoint : function(sourceEPSG, destEPSG, x, y) {
			sourceEPSG = sourceEPSG.toUpperCase();
			destEPSG = destEPSG.toUpperCase();
			
			var p = new Proj4js.Point(x, y);
			var projSource = new Proj4js.Proj(sourceEPSG); // source projection
			var projDest = new Proj4js.Proj(destEPSG); // destination projection
			Proj4js.transform(projSource, projDest, p);
			return p;
		},
		
		/**
		 * Show a text that follows the cursor.
		 * 
		 * @param html {String}
		 * @returns {void}
		 */
		showMouseMoveText: function(html) {
			var className = "util-cursordiv";
			var mapX, mapY;
			this.onMouseMove = this.onMouseMove || function(e) {
				$("."+className).css({
					"left" : e.pageX - mapX + 14 + "px",
					"top" : e.pageY - mapY + 20 + "px"
				}).show();
			};
			var d = $("<div class='"+className+"'><p></p></div>");
			d.find("p").append(html);
			$("#smapDiv").append(d);
			d.hide();
			
			var p = sMap.util.getMapPosition();
			mapX = p.x;
			mapY = p.y;
			$("#smapDiv, .olMapViewport").mousemove(this.onMouseMove);
		},
		
		/**
		 * Remove the div that follows the cursor.
		 * 
		 * @returns {void}
		 */
		hideMouseMoveText: function() {
			var className = "util-cursordiv";
			$("."+className).empty().remove();
			$("#smapDiv").unbind("mousemove", this.onMouseMove);
		},
		
		/**
		 * Returns the pixel of the top-left-most pixel of the pageDiv (which contains the map).
		 * This is used by tool windows to get a suitable initial position, independent on
		 * surrounding divs (around the map).
		 * 
		 * @return {} Keys: x, y -> Values: int, int
		 */
		getMapPosition : function() {
			var pageDivCSSLeftPx = $("#sideDivLeft").length ? $("#sideDivLeft").width() + "px" : "0px",
				pageDivCSSTopPx = $("#pageDiv").css("top"); // deriving top from map gives error in IE
			
			var pageDivCSSLeft = sMap.util.takeAwayPx(pageDivCSSLeftPx),
				pageDivCSSTop = sMap.util.takeAwayPx(pageDivCSSTopPx),
				toolbarTop = $("#toolbar").length>0 ? $("#toolbar").height() : 0;
			
			var viewPortTop = pageDivCSSTop + toolbarTop;
			return {"x" : pageDivCSSLeft, "y" : viewPortTop};
		},
		
		
		addDialogMinimizeButton: function(dialogDiv, options) {
			options = options || {};
			
			options.untoggleOnClose = !options.untoggleOnClose ? true : options.untoggleOnClose; // default true
			
			var btnMini = $('<a class="ui-dialog-titlebar-minimize ui-corner-all" role="button"><span class="ui-icon ui-icon-triangle-1-n">minimize</span></a>');
			dialogDiv.prev().find(".ui-dialog-title").after(btnMini);
			dialogDiv.isVisible = true;
			var oldHeight = null,
				oldPadding = null;
			var resizable = dialogDiv.dialog("option", "resizable");
			var toggleDialog = function() {
				if (dialogDiv.isVisible) {
					// Flip it up – hide it!
					oldHeight = dialogDiv.dialog("option", "height");
					
					if ( ($.browser.msie && parseInt($.browser.version) < 8) !== true) {
						oldPadding = dialogDiv.css("padding");
						dialogDiv.data("oldPadding", oldPadding);
						dialogDiv.css("padding", "0.01em");
					}
					
					dialogDiv.hide(0, function() {
						dialogDiv.dialog("option", "height", 0);
						dialogDiv.dialog("option", "resizable", false);
						btnMini.find("span").removeClass("ui-icon-triangle-1-n").addClass("ui-icon-triangle-1-s");
					});
					
					dialogDiv.parent().css("opacity", "0.8").find(".ui-dialog-buttonpane").hide();
				}
				else {
					// Flip it down – show it!
					dialogDiv.show(0, function() {
						dialogDiv.dialog("option", "height", oldHeight);
						oldPadding = dialogDiv.data("oldPadding");
						if (oldPadding) {
							dialogDiv.css("padding", oldPadding);
						}
						if (resizable) {
							dialogDiv.dialog("option", "resizable", true);							
						}
						btnMini.find("span").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-n");
					});
					dialogDiv.parent().css("opacity", "1").find(".ui-dialog-buttonpane").show();
				}
				dialogDiv.isVisible = !dialogDiv.isVisible;
			};
			var onMouseEnter = function() {
				$(this).addClass("ui-state-hover");
			};
			var onMouseLeave = function() {
				$(this).removeClass("ui-state-hover");
			};
			dialogDiv.prev().dblclick(toggleDialog);
			btnMini.click(toggleDialog).mouseenter(onMouseEnter).mouseleave(onMouseLeave);
			dialogDiv.toggleDialog = toggleDialog;
			
			// -- Make the dialog untoggle on close
			if (options.untoggleOnClose) {
				var onClose = function() {
					if (!dialogDiv.isVisible) {
						toggleDialog();
					}
				};
				dialogDiv.bind("dialogclose", onClose);
			}
			
			
			dialogDiv.on("dialogdragstart", function() {
				$(this).children().hide();
				$(this).parent().css({
					"filter": "alpha(opacity=70)",
			    	"opacity": "0.7"
				});
			});
			dialogDiv.on("dialogdragstop", function() {
				$(this).parent().css({
					"filter": "alpha(opacity=100)",
			    	"opacity": "1"
				});
				$(this).children().show();
			});
			
			
		}
};