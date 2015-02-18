sMap.moduleConfig.SPrint = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */ 
		activateFromStart : false,
		
		// For displaying correct scales in the dialog scale selector,
		// default is otherwise 72.
		DOTS_PER_INCH: 96,
		/**
		 * Path to print servlet
		 */
		 
		/**
		 * Enable a tool for creatinga a mask in the print
		 */
		usePrintMask : true,
		/**
		 * Available print resolutions. Does not care for the resolutions in the map.
		 */
		printResolutions : [ 132.2919, 52.91677, 26.45839, 13.229193, 5.291677, 2.645839, 1.322919, 0.529168, 0.264584 ],
		/**
		 * Pixel sizes in the print layouts [format(A3/A4/A5)]_[portrait or landscape(p/l)_[print or export(p/x)]]
		 */
		layoutSizes : {
			A5_p_p : {w:337,h:471},
			A5_l_p : {w:511,h:297},
			A5_p_x : {w:393,h:538},
			A5_l_x : {w:525,h:393},
			A4_p_p : {w:511,h:718},
			A4_l_p : {w:758,h:471},
			A4_p_x : {w:595,h:842},
			A4_l_x : {w:842,h:595},
			A3_p_p : {w:758,h:1067},
			A3_l_p : {w:1107,h:718},
			A3_p_x : {w:842,h:1191},
			A3_l_x : {w:1191,h:842},
			A2_p_p : {w:1107,h:1560},
			A2_l_p : {w:1600,h:1067},
			A2_p_x : {w:1191,h:1684},
			A2_l_x : {w:1684,h:1191}
		},
		printCopyrightNotice: '<div id="print-dialog-userconditions" class="ui-dialog-content ui-widget-content" scrolltop="0" scrollleft="0" style="width: auto; min-height: 0px; height: 183px;">För utdrag från kartan/flygfotot till tryck eller annan publicering, krävs tillstånd från Malmö Stadsbyggnadskontor. Vid frågor om tillstånd, användningsområden eller kartprodukter kontaktas Stadsbyggnadskontorets kartförsäljning: 040-34 24 35 eller <a href="mailto:sbk.sma@malmo.se?subject=Best%E4lla karta">sbk.sma@malmo.se</a>.<br><strong>Accepterar du villkoren?</strong></div>'
};