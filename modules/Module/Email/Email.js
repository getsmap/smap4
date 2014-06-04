/**
 * @author Your Name
 * @copyright Your office or the organisation that pays you
 * @license MIT license
 */

/**
 * @requires sMap/Module.js
 */

sMap.Module.Email = OpenLayers.Class(sMap.Module, {
	
	_working: false, // Don't allow sending mail when busy
	
	/**
	 * The events that this module will listen to. Each event listener
	 * is connected to a method defined in this module, with the same
	 * name as the event. When another module triggers this event, the
	 * method will be called (and other modules which are listening
	 * to the same event).
	 * 
	 * Look at the event listeners as a public API of the module.
	 */
	EVENT_LISTENERS : [],
	
	/**
	 * The events triggered from this module. Note that some modules
	 * both listens to and trigger events.
	 */
	EVENT_TRIGGERS : [],
	
	initialize : function(options) {
		options = options || {};
		
		this.EVENT_LISTENERS =
			sMap.Module.Email.prototype.EVENT_LISTENERS.concat(
				sMap.Module.prototype.EVENT_LISTENERS
        );
		this.EVENT_TRIGGERS =
			sMap.Module.Email.prototype.EVENT_TRIGGERS.concat(
				sMap.Module.prototype.EVENT_TRIGGERS
        );
		
		// This allows your control to be extended by sending in a parameter hash object
		// For example overriding a method in this class or in the parent class (see next step).
		OpenLayers.Util.applyDefaults(this, options);
		// This calls the parent class's constructor and allows to
		// extend it (e.g. override methods).
		sMap.Module.prototype.initialize.apply(this, [options]);
	},
	
	activate : function() {
		if (this.active===true) {
			return false;
		}
		
		this.createEpostDialog();
		
		// Call the activate method of the parent class
		return sMap.Module.prototype.activate.apply(this, arguments);
	},
	
	deactivate : function() {
		if (this.active!==true) {
			return false;
		}
		
		if(this.ePostDialog && this.ePostDialog.dialog){
			$("#email").validationEngine("hideAll");
			this.ePostDialog.dialog("destroy");
			this.ePostDialog.empty().remove();
			this.ePostDialog = null;
			
		}
		
		// Call the deactivate method of the parent class
		return sMap.Module.prototype.deactivate.apply(this, arguments);
	},
	
	destroy : function() {
		// Call the destroy method of the parent class
		return sMap.Module.prototype.destroy.apply(this, arguments);
	},
	
    /**
     * Called when all modules are initialized, i.e. after initialize.
     * All initial HTML should be produced from here.
     * @returns {void}
     */
	drawContent : function() {
		if (this.addToToolsMenu){
			sMap.events.triggerEvent("addtomenu", this, {
				index : this.toolbarIndex,
				label : this.lang.labelBtnEpost,
				iconCSS : "icon-epost", // "ui-icon-mail-closed",
				tagID : "button-epost",
				menuId : this.addToToolsMenu
			});
		}
		else {
			sMap.events.triggerEvent("addtoolbutton", this, {
				index : this.toolbarIndex,
				label : this.lang.labelBtnEpost,
				iconCSS : "icon-epost", // "ui-icon-mail-closed",
				tagID : "button-epost"
			});
		}
	}, 
	
	createEpostDialog : function(){
		var self = this;
		var ePostDialog = $("<div class='ePost-dialogDiv' id='email-dialog' />");
		this.ePostDialog = ePostDialog;
		$("body").append(ePostDialog);
		
		this.createEpostForm();

		var width = this.ePostDialog.outerWidth() < 300 ? 300 : this.ePostDialog.outerWidth();
		this.ePostDialog.outerWidth(width);
		
		sMap.util.createDialog(this.ePostDialog, {
			modal : false,
			draggable : true,
			resizable: false,
			width : 271,
			height: "auto",
			position : "center",
			titleText : this.lang.ePostDialogTitle,
			closeOnEscape: false,
			onOpen: function(events) {
				// Remove the close button
				//$(events.target).parent().find(".ui-dialog-titlebar-close").hide();
			},
			buttons: [
			          {
			        	  text: this.lang.sendButton,
			        	  click: function() {
			        	  	self.validateEmail();
			        	  	var elements = $("#epostform");
			        	  	var id = elements.find("id");
			        	  	var valid = elements.find("valid");
			        	  	var valueMissing = elements.attr("valueMissing");
			        	  	self.sendEmail();
			          	}
			          }
			          
			          ]
		});
		
		this.ePostDialog.dialog("open");
		
		$("input[id='email']").focusout(function(){
			self.validateEmail();
		});
		
		var closeBtn = $(".ui-dialog-titlebar-close");
		
		closeBtn.click(function(){
			self.deactivate();
		});
	},
	
	createEpostForm : function() {
		var epostForm = $("<form id='epostform' method='post' action='submit.action' />");
		this.ePostDialog.append(epostForm);
		
		var ePostFieldSet = $("<fieldset />");
		epostForm.append(ePostFieldSet);
		
//		var labelLegend = $("<legend id='addresses'>"+this.lang.labelAddresses+"</legend>");
//		ePostFieldSet.append(labelLegend);
		
		var labelTo = $("<label for='epostto'>"+this.lang.labelTo+"</label>");
		ePostFieldSet.append(labelTo);
		
		var receiverTo = $("<input type='email' id='epostto' class='validate[required, custom[email]]' name='email'>");
		this.receiverTo  = receiverTo;
		ePostFieldSet.append(receiverTo);
		
//		var msgFieldSet = $("<fieldset />");
//		this.msgFieldSet = msgFieldSet;
//		epostForm.append(msgFieldSet);
		
//		var labelMsgLegend = $("<legend id='addresses'>"+this.lang.labelMsg+"</legend>");
//		msgFieldSet.append(labelMsgLegend);
		
		var labelSubject = $("<label for='epostsubject'>"+this.lang.labelSubject+"</label>");
		ePostFieldSet.append(labelSubject);
		
		var subject = $("<input type='text' id='epostsubject' value='"+this.lang.subjText+"'>");
		ePostFieldSet.append(subject);
		
		var labelMessage = $("<label for='epostmsg'>"+this.lang.labelMsg+"</label>");
		ePostFieldSet.append(labelMessage);
		
		var messageTo = $("<textarea id='epostmsg' class='text ui-widget-content ui-corner-all'></textarea>");
		messageTo.text(sMap.cmd.getParamsAsString(true));
		ePostFieldSet.append(messageTo);
		
//		this.addSendBtn();
	},
	
	destroyEpostDialog : function(){
		if(this.ePostDialog){
			this.ePostDialog.dialog("destroy");
			this.ePostDialog.empty().remove();
			this.ePostDialog = null;
		}
	},
	
	/**
	 * Method: addSendBtn 
	 * @param {void}
	 * @return {void}
	 * This method add the send button to the form.
	 */
	addSendBtn : function(){
		var self = this;
		var btnPanel = $("<div id='epost-btnpanel' align='right' />"),
			sendBtn = $("<button id='epost-sendbtn'><b>"+this.lang.sendButton+"</b></button>");
		btnPanel.append(sendBtn);
		this.ePostDialog.append(btnPanel);
		
		sendBtn.click(function(){
			self.validateEmail();
			var elements = $("#epostform");
			var id = elements.find("id");
			var valid = elements.find("valid");
			var valueMissing = elements.attr("valueMissing");
			self.sendEmail();
			self.ePostDialog.dialog("close");
			self.deactivate();
		});
		sendBtn.button();
	},
	
	validateEmail : function(){
		var valid = $("#epostform").validationEngine();
	},
	
	sendEmail : function(){
		if (this._working) {
			return false;
		}
		
		sMap.cmd.loading(true, {
			text: this.lang.sending
		});
		var d = this.ePostDialog;
		var toEmail = d.find("#epostto").val(),
			subject = d.find("#epostsubject").val(),
			msg = d.find("#epostmsg").val();
		
		this._working = true;
		$.ajax({
			type: "POST",
			url: sMap.config.proxyHost + this.eMailURL,
			context: this,
			data: {
				toEmail: toEmail,
				subject: subject,
				msg: msg
			},
			dataType: "text",
			error: function(jqXHR, textStatus, errorThrown) {
				// this means the module's this
				debug.log(textStatus);
			},
			success: function(data, textStatus, jqXHR) {
				this.ePostDialog.dialog("close");
				this.deactivate();
				alert("Mailet har skickats!");
			},
			error: function(a, text, c) {
				alert("Ett fel har uppstått. Error: "+text);
			},
			complete: function() {
				sMap.cmd.loading(false);
				this._working = false;
			}
		});
	},
	
	// Class name needed when you want to fetch your module...
	// should correspond to the real class name.
	CLASS_NAME : "sMap.Module.Email"
	
});