sMap.moduleConfig.Report = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		/**
		 * If you want a different baselayer (or other layer...) for the overview map
		 * then specify the layer name here.
		 */
		overviewBaseLayerName: null,
		
		addToToolsMenu: false,
		
		// ----------------------------------------------------------------------------
		// There are two ways to specify the zoom level for the overview map.
		//      1) zoomOverview gives a fixed number (always the same zoom level)
		//      2) zoomOverviewRelative will be added to the current zoom level, it is
		//          therefore probably a negative number.
		// Note! zoomOverview overrides zoomOverviewRelative
		// ----------------------------------------------------------------------------
		//zoomOverview: 1,
		zoomOverviewRelative: -3,
		
		dialogOptions: {
		    title: "Skapa lägeskarta"
		},
		
		// Optional HTML to prepend or append to the final report.
		preHtml: '<h1 style="text-align: center;">Lägeskarta</h1>',
		postHtml: null,
		
		// This displayNames will be shown in the report, before the value.
		// The key used here is from the input tag's name attribute. E.g. name="report-descript".
		// If formLabels is null, no label will be used, only the value will be extracted.
		formLabels: {
		    "report-descript": "<label><strong>Ärende:</strong>&nbsp</label>",
		    "report-descript2": "<label><strong>Ärendenummer:</strong>&nbsp</label>",
		    "report-descript3": "<label><strong>Fastighet:</strong>&nbsp</label>",
		    "report-descript4": "<label><strong>Adress:</strong>&nbsp</label>"
		},
		
		formHtml: '<form>' +
				'<table>' +
                    '<tr><td><label for="report-descript">Ärende</label></td><td><input type="text" name="report-descript" id="report-descript"></input></td></tr>' +
                    '<tr><td><label for="report-descript2">Ärendenummer</label></td><td><input type="text" name="report-descript2" id="report-descript2"></input></td></tr>' +
                    '<tr><td><label for="report-descript3">Fastighet</label></td><td><input type="text" name="report-descript3" id="report-descript3"></input></td></tr>' +
                    '<tr><td><label for="report-descript4">Adress</label></td><td><input type="text" name="report-descript4" id="report-descript4"></input></td></tr>' +
				'</table>' +
			'</form>'
};