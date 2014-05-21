sMap.moduleConfig.Print = {
		
		/**
		 * If true, calls module's methods "activate" after methods
		 * "initialize" and "drawContent" have been called.
		 */
		activateFromStart : false,
		
		webContentRoot: "/Library/WebServer/Documents/sMap/",
		publicExportFolder: "/Library/WebServer/Documents/temp/print/",
		privateExportFolder: "http://localhost/temp/print/",
		printScriptsFolderPath: "/Library/WebServer/CGI-Executables/WS/print/",
		
		// Style of the layer showing the print extent.
		defaultStyle : {
			pointRadius : 8,
			strokeWidth : 3,
			strokeColor: "#ff0000",
			fillColor: 	"#ff0000",
			strokeOpacity : 1,
			fillOpacity: 0.1
		}
		
		
};