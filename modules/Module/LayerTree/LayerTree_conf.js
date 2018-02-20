sMap.moduleConfig.LayerTree = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : true,
		
		/**
		 * The width of the side-div holding the tree.
		 */
		width: 360,
		
		
		/**
		 * If true: Add sideDiv to the right side,
		 * and if false: left side.
		 */
		right: true,
		
		/**
		 * Add a toggle button to the header div of the tree.
		 */
		toggleButton: true,
		
		/**
		 * The toggle speed when pressing the toggle button (in milliseconds or in words like "slow").
		 */
		toggleSpeed: 350,
		
		/**
		 * Make the tree start hidden.
		 */
		startToggled: false,
		
		
		/**
		 * This button turns off all the layers' visibility
		 */
		turnOffButton: true,
		
		
		/**
		 * If URLs below are specified, these icons will be used instead of
		 * the textURL icon. However, only so for selectable layers. Non-selectable
		 * layers will still have the default icon and not use the icons below.
		 */
		iconSelectableLayer: "img/icon_externlank_info.png",
		iconSelectableLayerActive: "img/icon_externlank_active_info.png",
		
		/**
		 * Show a faded icon for the text-link if there is no
		 * dialogContent property specified. If false, no icon will
		 * be shown at all.
		 */
		showFadedLinks: false,
		showFadedCheckboxes: false,
		showCheckboxAfterTextIcon: true,
		enableTooltip: true,
		/**
		 * Use this icon for all folders. Set to null if you don't want any icon.
		 */
		folderIcon: "img/folder_page.gif",

		/**
		 * In the case of the content parameter is an URL: show content in an iframe
		 * or fetch the source and place the content in the dialog element.
		 */
		contentAsIframe: true,
		
		/**
		 * Option to add some text in the dialog title for layers. The text is specified in the lang file.
		 */
		dialogTitlePrefix : false,
		
		/**
		 * Add a print button to the layer tree's header div.
		 * When clicking on it, the checked layers' HTML document
		 * (if any) will be available to print in the print preview
		 * dialog.
		 */
		addPrintButton: false,
		printStyleSheetURL: "http://sbkspace.malmo.se/op/CSS/StyleSheet.css",
		
		/**
		 * Print legend button settings.
		 */
		addPrintLegendButton: true,
		lbButtonToToolsMenu: true,
		lbToolbarIndex: 1
		
};