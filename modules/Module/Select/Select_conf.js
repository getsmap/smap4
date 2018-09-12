sMap.moduleConfig.Select = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : true,
		
		fitBoundsIfNotContained: true,
		
		
		defaultStyle : {
			pointRadius : 18,
			//externalGraphic : "img/icon_hjalp.png",
			strokeWidth : 4,
			strokeColor: "#00ffff",
			fillColor: 	"#00ffff",
			strokeOpacity : 1,
			fillOpacity: 0.7,
			graphicZIndex: 499
		},
		selectStyle : {
			pointRadius : 8,
			//externalGraphic : "img/icon_hjalp.png",
			strokeWidth : 4,
			strokeColor: "#00ffff",
			fillColor: 	"#00ffff",
			strokeOpacity : 1,
			fillOpacity: 0.7,
			graphicZIndex: 499
		},
		
		zIndex: 499,
		
		/**
		 * Allow more than one selected feature at the same time.
		 */
		multiple : true,
		
		/**
		 * Select only the closest feature to the click location.
		 */
		forceOne: true,
		
		/**
		 * @property handlerType {String}
		 * Choose the select module's event listener.
		 * Can be either "box" or "click".
		 */
		handlerType : "click",
		/**
		 * @property addSelectWithKey {Boolean}
		 * If true - the keyMask specified in handlerOptions (for the handler
		 * of choice) can be used for adding features to selection.
		 * Note that if addSelectWithKey equals true, zoomBox will not work
		 * when holding the shift key.
		 */
		addSelectWithKey : true,
		/**
		 * @property dialogIfMany {Boolean}
		 * If true, create a dialog if more than one feature was found on request.
		 * In the dialog the user has to choose one feature.
		 */
		dialogIfMany : true,
		
		
		/**
		 * Pressing the keyMask key will add to the selection.
		 */
		handlerOptions : {
			click : {
				keyMask : OpenLayers.Handler.MOD_CTRL
			},
			box : {
				keyMask : OpenLayers.Handler.MOD_CTRL
			}
		},
		
		clickRadius : 8,
		maxLength : 20
		
		
		
};