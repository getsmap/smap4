(function() {

	/**
	 * Core SPrint functionality
	 * 
	 * Map layers and query methods live here.
	 * 
	 * @constructor
	 */
	var Core = function(module) {
		
		this.module = module;

		this.format = new OpenLayers.Format.GeoJSON();
		this.dialog = new sMap.Module.SPrint.PrintControlDialog(this);
		

	};
	
	Core.host = "XXX"; //This one should probably be set from the config file.	
	
	
	/**
	 * Static method to bind a function to specific scope
	 * 
	 * @param context
	 *            scope to bind method to
	 * @param method
	 *            function to use as a method on the context
	 * @returns {Function}
	 */
	Core.bind = function(context, method) {
		return function() {
			return method.apply(context, arguments);
		};
	};
	
	Core.prototype.activate = function() {
		this.dialog.dialog.dialog("open");
		var dpi = this.module.defaultDpi || $("#sprint_Print_slctResolution option:first").val();
		$("#sprint_Print_slctResolution").val(dpi);
		$("#sprint_Export_slctResolution").val(dpi);
		this.dialogClosed = false;
	};
	
    Core.prototype.deactivate = function() {
    	if (this.dialogClosed === true){
    		// Dialog closed, Don't try to deactivate again.
    		return false;
    	}
    	this.dialogClosed = true;

    	
    	if (this.dialog.dialog.dialog("isOpen")) {
    		this.dialog.dialog.dialog("close");
		}
    	return true;
    };
	
	Core.prototype.toggleDialog = function() {
				
		var isOpen = this.dialog.dialog.dialog("isOpen");
		if (isOpen) {
			this.dialog.dialog.dialog("close");
		}
		else {
			this.dialog.dialog.dialog("open");
		}
	},
	
	/**
	 * Adds the proxy component of the URL if a proxy have been set.
	 * @param url
	 * @returns Url with proxy.
	 */
	Core.prototype.getUrlWithProxy = function(url){
		if ( sMap.config.proxyHost != null ){
			return sMap.config.proxyHost + encodeURIComponent(url);
		}
		else {
			return url;
		}
	};
	
	/**
	 * Method used for showing errors in server AJAX communication. Shows a message box.
	 * @param jqXHR
	 * @param textStatus
	 * @param errorThrown
	 */
	Core.prototype.remoteQueryFail = function(jqXHR, textStatus, errorThrown) {
		var errorText = 'Kommunikation med server misslyckades, felmeddelande: \n'
			+ textStatus + "\n";
		if (jqXHR != null){
			if (jqXHR.status != null){
				errorText += "Status: " + jqXHR.status + "\n";
			}
			if (jqXHR.responseText != null){
				errorText += "Response text: " + jqXHR.responseText + "\n";
			}
		}
		
		alert(errorText);
	};

	/**
	 * Query for schools remotely
	 * 
	 * @param config.data    The data to send...
	 * @param config.context Used for success call.
	 * @param config.success Used for success call.
	 */
	Core.prototype.exampleServerCall = function(config) {
		var wsUrl = Core.host + 'XXX_setThisOne';
		var proxyUrl = this.getUrlWithProxy(wsUrl);

		$.ajax({
			url : proxyUrl,
			dataType : 'text',
			context : this,
			data : config.data,
			cache: false,
			success : function(response) {
				config.success.call(config.context, features);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// If you get an error here it might because of problem with the proxy settings stored in 
				// sMap.config.proxyHost
				this.remoteQueryFail(jqXHR, textStatus, errorThrown);
			}
		});
	};
	
	
	sMap.Module.SPrint.Core = Core;

}());