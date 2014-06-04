var map;

function init() {
    
	//var bounds = new OpenLayers.Bounds(110000.0,6151000.0,144679.554048,6185679.554048);
	var bounds = new OpenLayers.Bounds(111159.7109375, 6153288.5, 128038.46875, 6168830.5);
	
    map = new OpenLayers.Map({
        div: "map",
		resolutions: [67.733504, 50.800128, 33.866752, 25.400064,16.933376],
		projection: new OpenLayers.Projection('EPSG:3008'),
		maxExtent: bounds
    });    
	
	var matrixIds =  [];
	
	matrixIds[0] = {
		identifier: "epsg_3008_v:" + 0,
		topLeftCorner: new OpenLayers.LonLat(110000.0,6185680.0)
	};
	matrixIds[1] = {
		identifier: "epsg_3008_v:" + 1,
		topLeftCorner: new OpenLayers.LonLat(110000.0,6177010.0)
	};
	matrixIds[2] = {
		identifier: "epsg_3008_v:" + 2,
		topLeftCorner: new OpenLayers.LonLat(110000.0,6177010.0)
	};
	matrixIds[3] = {
		identifier: "epsg_3008_v:" + 3,
		topLeftCorner: new OpenLayers.LonLat(110000.0,6170507.0)
	};

	matrixIds[4] = {
		identifier: "epsg_3008_v:" + 4,
		topLeftCorner: new OpenLayers.LonLat(110000.0,6172675.0)
	};
	var wms = new OpenLayers.Layer.WMS(
		"Stadsdelar WMS", 'http://sbkvmgeoserver:8080/geoserver/wms', {
			LAYERS: 'malmows:SMA_STADSDEL_P'
		}, {
			isBaseLayer: true
	});
	
    var wmts = new OpenLayers.Layer.WMTS({
        name: "Delområden WMTS",
        url: "http://sbkvmgeoserver:8080/geoserver/gwc/service/wmts/",
        layer: "malmows:SMA_DELOMR_P",
        matrixSet: "epsg_3008_v",
        matrixIds: matrixIds,
        format: "image/png",
        style: "_null",
        opacity: 0.7,
		//tileOrigin: new OpenLayers.LonLat(110000,6169100),
		//tileOrigin: new OpenLayers.LonLat(110000.0,6185679.554048),
        isBaseLayer: false
    });                

    map.addLayers([wms, wmts]);
    map.addControl(new OpenLayers.Control.LayerSwitcher());
	map.addControl(new OpenLayers.Control.MousePosition());
    //map.setCenter(new OpenLayers.LonLat(-13677832, 5213272), 13);
    map.zoomToExtent(bounds);
}
