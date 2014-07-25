sMap.moduleConfig.SelectResult = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,


		/*
		Do not listen to select events originating in these 
		modules (give last part of class name: e.g. "MyModule")
		*/
		_noListenMods: [],

		/**
		 * Default properties
		 */
		toolbarIndex : 8,
		addToToolsMenu : false,
		/**
		 * Dialog start position and size
		 */
		dialogStartPosition : [50,170],
		height : 500,
		width: 360,
		/**
		 * Height of the grid
		 */
		gridHeight : 380,
		/**
		 * Column names or headers i is configurates in SelectResult_lang.js file
		 */
		//colNames: ['Lagernamn','Namn','Info'],
		/**
		 * Columns in the grid. The first one must be layername. It's hidden and used to group the features in the grid.
		 * The other columns get their values from the attributes listed in the layers config selectAttributes. example:
		 * selectAttributes :  ["${Name}","<a href='http://${Link}' target=_blank>${Link}</a>"],
		 * The ordering is important. col[1] get the value of selectAttributes[0] etc.
		 */
		colModel: [
		           {name:'layername',index:'layername',width:150},
		           {name:'name',index:'name',width:150,sortable:false},
		           {name:'info',index:'info',width:100,sortable:false}
		],
		/**
		 * Max number of rows in grid
		 */
		rowNum: 50,
		/**
		 * zoomlevel to use when zooming just one point feature
		 */
		pointZoomLevel : 7,
		/**
		 * selectOnDblClick, select feature and open popup when doubleclicking on row. Causes some confusion in other modules.
		 *  Disabled default.
		 */
		selectOnDblClick : false
		/**
		 * The layer config can also have a attribute; report. If so a button will appear under the grid witch opens the link with 
		 * the selected features IDs attached as a string like linkURL+IDattribute[0],IDattrubute[1],
		 * This functionality i not perfect yet. Button triggers event "createreport"
		 * 	report: {
			    	linkURL : "myReport.aspx?ID=",
			    	IDattribute : "Name"
			    },
		 */
};