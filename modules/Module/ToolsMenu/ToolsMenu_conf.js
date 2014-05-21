sMap.moduleConfig.ToolsMenu = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : true,
		
		toolbarBtnActiveCSSClass : "ui-state-active",
		
		/**
		 * One or more toolsMenu-buttons to be created. By default modules will be placed in the first menu, 
		 * but they can change it, by specifying menu by menuId when triggering "addtomenu". (E.g: menuId : 5). 
		 * 		
		 * The menuIds will be appended to internal ID-syntax, e.g. menuId : 5 will be "#toolsmenu-dropdown5" etc.
		 * Just make sure to make them unique in this config-file. 
		 * 
		 * When setting "lblText" below, the default text ("Fler verktyg"/"Moore tools") will be overridden.
		 * 
		 */ 
		menuBtns : [ 
		             {
		            	 menuId : 5,
		            	 lblText : "sMap++",
		            	 toolBarIndex : 2
		             }/*,
		             {
		            	 menuId : 7,
		            	 //lblText : "MyTools",
		            	 toolBarIndex : 7
		             },
		             {
		            	 menuId : "tools",
		            	 lblText : "sMap--",
		            	 toolBarIndex : 4
		             }*/
		             ]
};