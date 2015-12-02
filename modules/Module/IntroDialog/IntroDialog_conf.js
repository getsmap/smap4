sMap.moduleConfig.IntroDialog = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : true,
		
		contentHtml: "<div>Override this parameter in the module config</div>",
		
		/**
		 * Create a checkbox that, when checked, will not allow 
		 * the dialog to open again next time.
		 */
		checkboxDontShow: true,
		
		/**
		 * Override some or all the default dialog options.
		 */
		dialogOptions: {},
		
		dialogBGColor: "#efa",
		
		/**
		 * Default options for the dialog.
		 */
		defaultDialogOptions: {
			title: "Välkommen",
			width: "auto",
			minWidth: 370,
			minHeight: 200,
			height: "auto",
			modal: false,
			autoOpen: false,
			position: "center",
			cookieName: 'smap_introdialog_dontshowagain',
			cookieExpiresDays: 365 // null = session cookie
		}
};