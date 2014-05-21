/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Login = OpenLayers.Class(sMap.Module, {
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : ["initlogin"],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Login.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Login.prototype.EVENT_TRIGGERS.concat(
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
		if (this.active===true) {
			return false;
		}
		
		this.makeLoginDialog();
		
		// Call the activate function of the parent class
		return sMap.Module.prototype.activate.apply(
	            this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
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
		
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Draws the non-default HTML-content. Called when all modules
     * are initialized. All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		sMap.events.triggerEvent("addtoolbutton", this, {
			index : this.toolbarIndex,
			iconCSS : null, //this.toolImg,
			label : this.lang.labelButtonSubmit,
			tagID : "login-btn"
		});
		
	},
	
	makeLoginDialog : function() {

		var dialogDiv = $("<div />");
		this.dialogDiv = dialogDiv;
		var body = $("body");
		$("body").append(dialogDiv); //same $("<body>")if fetched body.append(dialogDiv);

		var form = $('<form id="login-form" />');
		dialogDiv.append(form);

		var fieldset = $("<fieldset />");
		form.append(fieldset);
		//var legend = $("<legend />");
		//legend.text(this.lang.loginTitle);
		//fieldset.append(legend);
		
		var usernamelabel = $('<label for="username">'+this.lang.labelUsername+'</label>'); //var label = $("<label />");
		fieldset.append(usernamelabel);
	
		var username = $('<input type="text" id="username" class="text ui-widget-content ui-corner-all" />');
		fieldset.append(username);
		
		var passwordlabel = $('<label for="password">'+this.lang.labelPassword+'</label>');
		fieldset.append(passwordlabel);
		
		var password = $('<input type="password" id="password" value="" class="text ui-widget-content ui-corner-all" />');
		fieldset.append(password);
		
		var button =$('<button id="login-buttonsubmit">'+this.lang.labelButtonSubmit+'</button>)');
		fieldset.append(button);
		button.button();
		
		var self = this;
		button.click(function() {
			var inputs = $("#login-form").find("input");
			var username = $(inputs[0]).val(),
				password = $(inputs[1]).val();
			$.post(self.loginScriptURL, {
					username: username,
					password: password
				},
				function(data) {
					/*
					 * 0: OK!
					 * 1: Wrong password
					 * 5: Wrong username
					 * 10: TODO: Wrong username AND password ???
					 */
					if ( parseInt(data) !== 0 ) {
						alert("Fail");
						return false;
					}
					// Make listeners (e.g. other modules) aware that log-in was approved.
					// They can thereby let the user enter an application or such.
					sMap.events.triggerEvent("loginapproved", this, {});
					self.dialogDiv.dialog("destroy");
				},
				"text"
			);
		});
		
		sMap.util.createDialog(dialogDiv, {
			modal : true,
			draggable : false,
			width : 310,
			height: 200,
			position : "center",
			titleText : this.lang.loginTitle,
			closeOnEscape: false,
			onOpen: function(e, ui) {
				// Remove the close button
				$(e.target).parent().find(".ui-dialog-titlebar-close").hide();
			}
		
		});
				
		dialogDiv.dialog("open");
		
	},
	
	initlogin: function(e) {
		this.makeLoginDialog();
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Login"
	
});