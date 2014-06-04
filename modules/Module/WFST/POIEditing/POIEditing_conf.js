sMap.moduleConfig.WFST.POIEditing = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		iconEraserPath: "img/eraser_cross.gif", //draw_eraser.png",
		imgArr: ["point_off.png", "point_on.png", "line_off.png", "line_on.png", "polygon_off.png", "polygon_on.png"],
		imgSrc: "img/editTools/",
		btnImageURL : "img/calendar.gif",
		formbg: "img/bgsmap.png",
		
		/**
		 * Here are specified which buttons should be included in the
		 * editing toolbar.
		 */
		buttons : {
			line : true,	
			point : true,
			polygon : true
//			modify : true
//			del : false,
//			save : false
		}

};