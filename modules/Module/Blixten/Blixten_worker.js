var configLayers = null;


function getLayerConfig(key, value) {
	var keyArr = key.split("."),
		matches = [],
		val, t,
		layers = configLayers.overlays.concat( configLayers.baselayers || [] );
	
	for (var i=0, len=layers.length; i<len; i++) {
		t = layers[i];
		if (keyArr.length) {
			try {
				val = eval("t." + key);
			} catch(e) {}
		}
		if (val) {
			if (val.toUpperCase() === value.toUpperCase()) {
				matches.push( t );
			}
		}
	}
	if (matches.length) {
		return matches[0];
	}
	else {
		return null;
	}
};

function doTheWork(layerNames) {
	layerNames = layerNames || [];
	
	var layersDict = {},
		layersArr = [];
	
	var t, layerName;
	
	for (var i=0,len=layerNames.length; i<len; i++) {
		layerName = layerNames[i];
		t = getLayerConfig("name", layerName);
		
		var fullWmsName = t.params.layers;
		var wmsNameArr = fullWmsName.split(","),
			wmsName = null;
		for (var j=0,lenj=wmsNameArr.length; j<lenj; j++) {
			wmsName = wmsNameArr[j];
			layersDict[wmsName] = t;
		}
		if ( layersArr.indexOf(fullWmsName) === -1 ) {
			layersArr.push(fullWmsName);
		}
	}	
	return {
		layersDict: layersDict,
		layersArr: layersArr
	}
};


self.addEventListener('message', function(e) {
	configLayers = e.data.configLayers;
	
	var t = doTheWork(e.data.layerNames); // {layersDict: layersDict, layersArr: layersArr}
	self.postMessage(t);
}, false);