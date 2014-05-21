/**
 * @author Kristian Bergstrand
 * @copyright Helsingborgs stad
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.CopyLink = OpenLayers.Class(sMap.Module, {
	
	/**
	 * EVENT_LISTENERS:
	 * 		*updatelinkentries* 
	 * 		Updates the URL entry if visible. 
	 * 		If not visible nothing will happen.
	 * 
	 * 		*showlink* 
	 * 		Shows the drop-down containing the URL entry. The URL
	 * 		is updated at the same time. Triggering this event can also
	 * 		be used for updating the URL entry but if you do not want to
	 * 		activate the module if not active you should use *updatelinkentries*.
	 */
	EVENT_LISTENERS : ["updatelinkentries", "showlink"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.CopyLink.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.CopyLink.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.extend(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
		
	},
	
	activate : function() {
		if (this.active===true && this.linkDiv && this.linkDiv.length) {
			// If activated when already active - just update the entry.
			this.updatelinkentries();
			return;
		}
			
		/**
		 * Originally I was using this.div and appended everything to this.
		 * However, it was not possible to select the text in the input field
		 * then. Therefore, this.div is nulled from beginning.
		 */
		$(this.div).empty().remove();
		this.div = null;
	
		if ($(this.div).children().length==0) {
			var self = this;
			
			// Make the linkDiv and append to this.div
			this.linkDiv = this.makeCopyLinkDiv("copylink-maindiv");
			$("#mapDiv").append(this.linkDiv);
			
			this.map.events.register("moveend", this, function() {
				self.updatelinkentries();
			});
			this.map.events.register("zoomend", this, function() {
				self.updatelinkentries();
			});
		}
		$(this.linkDiv).show();
		self.updatelinkentries();

		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		$(this.linkDiv).hide();
		
		// Call the deactivate function of the parent class
		return sMap.Module.prototype.deactivate.apply(
	            this, arguments
	        );
	},
	
	destroy : function() {
		// Handler are automatically deactivated and destroyed
		// by the parent class module's destroy method. However,
		// this is only the case if the handlers are stored like
		// below (the example shows how to deactivate them manually):
		// -> this.handlers["click"].deactivate();   // For many handlers...
		// -> this.handler.deactivate();    // For single handler
		// Therefore you should always store handler(s) like in this example.

		$(this.linkDiv).empty().remove();
		//this.handler["moveend"].deactivate();
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		var eventChooser = "addtoolbutton";
		if (this.addToToolsMenu){
			eventChooser = "addtomenu";
		}
		
		sMap.events.triggerEvent(eventChooser, this, {
			index : this.toolbarIndex,
			label : this.labelButton ? this.lang.labelText : null,
			hoverText : this.lang.labelText,
			iconCSS : "btncopylink",
			tagID : "button-copylink",
			left: this.left,
			right: this.right,
			menuId : this.addToToolsMenu
		});
	},
	
	/**
	 * This forces the module to activate and is useful
	 * when other modules want to show a link reproducing
	 * the current map.
	 * @param e {Object} Has no importance here.
	 */
	showlink: function(e) {
		return this.activate(e);
	},
	
	/**
	 * 	This function adds a new "row": A container-div holds a header and
	 * 	a <input type='text'> field for the link.  
	 * 
	 * @param linkLbl {String}
	 * @param linkEntry {String}
	 * 
	 * @returns linkDiv {Object} jQuery-object
	 */
	
	copyLinkRow : function(linkEntry,linkLbl) {
		var self = this,
			linkDiv = this.linkDiv;
			linkEntryContainer = $("<div class='copylink-subdiv'></div>"),
			linkLabel = $("<div class='copylink-labels'>"+ linkLbl +"</div>"),
			linkEntry = $("<input type='text' id='"+linkEntry+"' class='copylink-entries' />"); // the class here is used when updating with the latest URL
			
		// Select all text on click		
		linkEntry.click(function(e) {
			$(this).select();
		});
		
		//Display a warning if url.length>2083
		linkEntry.select(function(e) {
			var url = e.target.value;
			if (url.length>2083) {
				alert(self.lang.tooLongURL);
			}
		});
		linkEntryContainer.append(linkLabel).append(linkEntry);
		linkDiv.append(linkEntryContainer);

		return linkDiv;
	},
	
	/**
	 * If shortenOption is set in CopyLink_conf.js.
	 * Calls right function to shorten
	 * 
	 */
	
	chooseShortener : function(name){
		if (name == "toDb"){
			this.shortenLinks();
		}
		else if (name == "bitLy"){
			this.sMaply();
		}
		else{
			alert("error!");
		}
	},
	
	/**
	 * If shortenOption is set in CopyLink_conf.js.
	 * Creates a spinner to be shown during ajax-request.
	 * 
	 * @param targetElement {String}
	 * 		id of the element to which the spinner will be appended.
	 *  
	 * @returns spinner {Object}
	 */
	
	createSpinner : function(targetElement) {
		var target = document.getElementById(targetElement);
		
		if( !this.spinAnimation ){
			var opts = {
			    lines: 8, // The number of lines to draw
			    length: 4, // The length of each line
			    width: 2, // The line thickness
			    radius: 4, // The radius of the inner circle
			    color: '#000', // #rgb or #rrggbb
			    speed: 1, // Rounds per second
			    trail: 60, // Afterglow percentage
			    left: 1,
			    shadow: false // Whether to render a shadow
			};
			
			//Instantiate the spinner
			var spinner = new Spinner(opts);
		}
		else{
			var spinner = this.spinAnimation;
			$("#"+targetElement).empty().show();
		}
		//Add to target and start spinning
		spinner.spin(target);
		
		//make the spinner global, then return it
		this.spinAnimation = spinner;
		return spinner;
	},
	
	/**
	 * If shortenOption is set in CopyLink_conf.js.
	 * This function shortens the current url to the map using bit.ly.
	 * Note that shortening via bit.ly can not be done on localhost!
	 * 
	 * @returns {}
	 */
	
	sMaply : function() {
		var self = this,
			msgDiv = $("#copylink-shortenmsg"),
			longUrl = sMap.cmd.getParamsAsString(true);
		
		if (window.location.host == "localhost" || window.location.host == "localhost:8888"){
			longUrl = "http://www.google.se"; 
			alert("Shortening via bit.ly can not be done on localhost! Instead " + longUrl + " will be used for test!"); 
		}
		var url = sMap.config.proxyHost ? sMap.config.proxyHost + self.bitLyPath : self.bitLyPath;
		var spinner = self.createSpinner('copylink-shortenmsg');
		$.ajax({
			url : url,
			data : {
				"longUrl" : encodeURIComponent(longUrl)
			},
			type : "POST",
			error: function(request,error) {
				if (spinner){
		    		spinner.stop();
		    	}
				msgDiv.text(self.lang.failureMsg);
			},
			success : function(data){
				var shortUrl = data;
				sMap.events.triggerEvent("updatelinkentries", self, {
					url : shortUrl
				});
				if (spinner){
		    		spinner.stop();
		    	}
				msgDiv.text(self.lang.successMsg).show().delay(3000).fadeOut('fast', function() {msgDiv.empty();});
			}
		});
		
	},
	
	/**
	 * Shortens part of the current url to the map and saves to db.
	 * Parameter "features" (drawn objects) in the query-string gets shorten.
	 * 
	 * 
	 * @returns {}
	 */
	shortenLinks : function() {
		var self = this,
			msgDiv = $("#copylink-shortenmsg"),
			params = sMap.cmd.getParamsAsObject(true),
			longString = params.FEATURES;
		
		if (!longString){
			msgDiv.text(self.lang.noFeaturesMsg).show().delay(3000).fadeOut();
			return;
		}
		
		var spinner = self.createSpinner('copylink-shortenmsg');
		
		var url = sMap.config.proxyHost ? sMap.config.proxyHost + self.saveToDbPath : self.saveToDbPath;
		$.ajax({
			url : url,
			data : {
				"longString" : longString
			},
			type : "POST",
			error: function(request,error) {
				if (spinner){
		    		spinner.stop();
		    	}
				msgDiv.text(self.lang.failureMsg);
			},
			success : function(data){
				params["FEATURES"] = "short";
				params["id"] = data;
				var shortUrl = "";
				$.each(params, function (key, value){
					shortUrl = shortUrl + "&" + key.toLowerCase()+"="+value;
				});
				shortUrl = shortUrl.substring(1); // Remove starting "&"
				shortUrl = sMap.config.rootURL + "?" + shortUrl;
				
				sMap.events.triggerEvent("updatelinkentries", self, {
					url : shortUrl
				});
				if (spinner){
		    		spinner.stop();
		    	}
				msgDiv.text(self.lang.successMsg).show().delay(3000).fadeOut('fast', function() {msgDiv.empty();});
			}
		});
	
	},
	
	/**
	 * 	Creates main-div with a "close-button" and interaction hacks.
	 * 	Calls copyLinkRow for creation of rows according to _conf.js.  
	 * 
	 * @param linkDivID {String}
	 *		Name of the main-div.
	 * 
	 * @returns linkDiv {Object} jQuery-object
	 */

	makeCopyLinkDiv : function(linkDivID) {
		var self = this,
			linkDiv = $("<div id='"+linkDivID+"' />"),
			myCats = this.cats; // all categories in CopyLink_conf.js
			
		linkDiv.addClass("ui-widget-content");
		self.linkDiv = linkDiv;
		var linkClose = $("<input id='copylink-btn' type='button' value='"+ self.lang.closeBtn +"' />");
		linkClose.button();
		$.each(myCats, function(i,val){
			if( val == true){
				var text = self.lang[i];
				self.copyLinkRow(i,text);
			}
		});
		
		linkDiv.append(linkClose);
		
		// If shorten links...see CopyLink_conf.js for details
		if (self.shortenOption == "toDb" || self.shortenOption == "bitLy") {
			
			var shortenDiv = $("<div id='copylink-shortendiv'></div>"),
				shortenBtn = $("<input id='copylink-shortenbtn' type='button' value='"+ self.lang.shortenURLBtn +"' />");
			shortenBtn.button();
			var shortenMsgDiv = $("<div id='copylink-shortenmsg'></div>");
			
			shortenBtn.click(function(e) {
				self.chooseShortener(self.shortenOption);
			});
		
			shortenDiv.append(shortenBtn).append(shortenMsgDiv);
			linkDiv.append(shortenDiv);
		}
		
		// Disable map interaction
		sMap.util.disableMapInteraction(linkDiv);
		
		// "Hack" to take away the disabled right click when hovering linkEntry.
		$(linkDiv).hover(function() {
				self.map.viewPortDiv.oncontextmenu = OpenLayers.Function.True;
		}, function() {
				self.map.viewPortDiv.oncontextmenu = OpenLayers.Function.False;
		});
		
		// "Close" window on close-button click.
		linkClose.click(function(e) {
			self.deactivate();
		});
		
	return linkDiv;
	},
	
	/**
	 * Listener to "updatelinkentries".
	 * Updates the link entry field (class 'copylink-entries').
	 * 
	 * @param e {Object} No parameters.
	 * @returns {void}
	 */
	updatelinkentries : function(e) {
		if ($(".copylink-entries").length>0 && $(".copylink-entries").is(":visible")) {
			var url = null;
			if(e !== undefined){
				url = e.url;
			}
			else{
			url = sMap.cmd.getParamsAsString(true);
			}
			// Replace URL with a info text if URL length > 2048 literals.
			if (url && url.length>2048) {
				url = this.lang.tooLongURL;
			}
			var linkEntry = $(".copylink-entries");
			linkEntry.each(function() {
				if (this.tagName.toLowerCase()=="input") {
					if ($(this).prop('id') == "copyLink"){
						$(this).val(url);
					}
					else{
						$(this).val('<iFrame width="500" height="500" frameborder="0" scrolling="no" src="' + url + '"></iFrame>');
					}
				}
				else {
					$(this).text(url);
				}
			});
		}
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.CopyLink"	
});