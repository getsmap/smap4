sMap.moduleConfig.Blixten = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		/**
		 * Buffer settings
		 */
		defaultBuffer: 200,
		minBuffer: 100, // If you put 0 it will become 1.
		maxBuffer: 500,
		step: 100,
		
		dialogPosition: [50, 100],
		
		zIndex: 697,
		
		styles: {
			"default": {
				"strokeDashstyle": "solid",
				"pointRadius": 10,
				"fillColor": "#00f",
				"strokeColor": "#fff",
				"strokeWidth": 1,
				"strokeOpacity": 1,
				"fillOpacity": 0.4,
				"graphicZIndex": 697
			},
			"select": {
				"strokeDashstyle": "solid",
				"pointRadius": 10,
				"fillColor": "#00f",
				"strokeColor": "#fff",
				"strokeWidth": 1,
				"strokeOpacity": 1,
				"fillOpacity": 0.4,
				"graphicZIndex": 697
			},
			"temporary": {
				"strokeDashstyle": "solid",
				"pointRadius": 10,
				"fillColor": "#00f",
				"strokeColor": "#fff",
				"strokeWidth": 1,
				"strokeOpacity": 1,
				"fillOpacity": 0.4,
				"graphicZIndex": 697
			}
		}
};