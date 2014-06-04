var sMap = {
		config : {},
		db : {},
		moduleConfig : {}
};



sMap.langDict = {
	"sv-SE": {
		errNoBaseNorOverlays: "Config-filen innehåller inga lager (varken overlays eller baselayers).",
		errMapNotInit: "Kartan kunde inte initieras.",
		errWebParamLayerNotFound: "Lagret som angavs i URL:en finns inte.",
		errBaselayerDoesNotExist: "Kan inte ändra till angivet baslager eftersom det inte finns.",
		tooManyStyleSheets: "Det är för många stylesheets <link /> inlänkade från index-filen - IE klarar max 31 st.",
		warnLangNotSupportedByFramework: "Angivet språk stöds inte av alla sMap-moduler och/eller sMap.langDict (se sMap.js)."
	},
	"en": {
		errNoBaseNorOverlays: "The config file does not contain any layers (neither overlays nor baselayers).",
		errMapNotInit: "The map could not be initialized",
		errWebParamLayerNotFound: "The layer in the URL does not exist.",
		errBaselayerDoesNotExist: "Cannot set baselayer since it does not exist.",
		tooManyStyleSheets: "There are too many stylesheets <link /> linked in from the index file - IE can take a max. of 31 stylesheets.",
		warnLangNotSupportedByFramework: "The language is not supported by all sMap-modules and/or sMap.langDict (see sMap.js)."
	}
		
		
};