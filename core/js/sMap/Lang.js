/* Copyright (c) 2006-2011 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/BaseTypes.js
 * @requires OpenLayers/Console.js
 */

/**
 * Namespace: sMap.Lang
 * Internationalization namespace.  Contains dictionaries in various languages
 *     and methods to set and get the current language.
 */
sMap.Lang = {
    
    /** 
     * Property: code
     * {String}  Current language code to use in OpenLayers.  Use the
     *     <setCode> method to set this value and the <getCode> method to
     *     retrieve it.
     */
    code: null,
    
    /**
     * Holds the languages keyed by module name and then another
     * object keyed by language code. E.g.:
     * 
     * lang = {
     * 		"Email" : {
     * 			"sv-SE" : {
     * 				"buttonPress" : "Tryck här",
     * 				"labelLookHere" : "Titta hit!"
     * 			},
     * 			"en" : {
     * 				"buttonPress" : "Press here",
     * 				"labelLookHere" : "Look here!"
     * 			}
     * 		}
     * }
     * 
     */
    lang : {},
    
    /** 
     * APIProperty: defaultCode
     * {String} Default language to use when a specific language can't be
     *     found.  Default is "en".
     */
    defaultCode: "sv-SE",
        
    /**
     * APIFunction: getCode
     * Get the current language code.
     *
     * Returns:
     * The current language code.
     */
    getCode: function() {
        if(!sMap.Lang.code) {
        	sMap.Lang.code = this.defaultCode;
        	//sMap.Lang.setCode();
        }
        return sMap.Lang.code;
    },
    
    /**
     * APIFunction: setCode
     * Set the language code for string translation.  This code is used by
     *     the <sMap.Lang.translate> method.
     *
     * Parameters-
     * code - {String} These codes follow the IETF recommendations at
     *     http://www.ietf.org/rfc/rfc3066.txt.  If no value is set, the
     *     browser's language setting will be tested.  If no <sMap.Lang>
     *     dictionary exists for the code, the <OpenLayers.String.defaultLang>
     *     will be used.
     */
    setCode: function(code) {
        var lang;
        
        // Hack for IE because jQuery async = false seems not to
        // work for loading the config script in IE and therefore
        // lang is set before the config has been loaded. Crazy...or?
        if (!sMap.config || !sMap.config.modules) {
        	lang = code || sMap.Lang.defaultCode;
        	sMap.Lang.code = lang;
        	return;
        }
        // End of hack
        
        if(!code) {
            code = (OpenLayers.Util.getBrowserName() == "msie") ?
                navigator.userLanguage : navigator.language;
        }
        var parts = code.split('-');
        parts[0] = parts[0].toLowerCase();
        
        var notSupportingArr = this.frameworkSupportsLang(parts[0]);
        if (notSupportingArr.length == 0) {
        	lang = parts[0];
        }
        // check for regional extensions
        if(parts[1]) {
            var testLang = parts[0] + '-' + parts[1].toUpperCase();
            notSupportingArr = this.frameworkSupportsLang(testLang);
            if (notSupportingArr.length == 0) {
            	lang = testLang;
            }
        }
        if (notSupportingArr.length) {
        	debug.warn(sMap.langDict[sMap.Lang.defaultCode].warnLangNotSupportedByFramework +
        			" Code: "+code+" is not supported by: "+notSupportingArr.join(", "));
        	lang = sMap.Lang.defaultCode;
        }
        if(!lang) {
        	OpenLayers.Console.warn(
                'Failed to find sMap.Lang.lang.' + parts.join("-") +
                ' dictionary, falling back to default language'
            );
            lang = sMap.Lang.defaultCode;
        }
        
        debug.log("Now using lang code: "+lang);
        sMap.Lang.code = lang;
    },
    
    /**
     * Check if the language (code) is supported by all modules
     * and by the framework core.
     * @property langCode {String} E.g. sv-SE or en
     * @returns {Array} The modules or sMap-core that does not support the language. This
     * means if the array is empty - the language is fully supported.
     */
    frameworkSupportsLang : function(langCode) {
    	 /**
         * Check if all modules support this language.
         * Otherwise, fall back on default language.
         */
    	
        var modules = sMap.config.modules || [];
    	
    	var dict,
    		modNameLast,
    		CLASS_NAME,
    		moduleNameArr,
    		notSupporting = [];
        for (var i=0,len=modules.length; i<len; i++) {
        	// In case of long module name (e.g. "sMap.Module.OverlaySwitcher.SimpleSwitcher")
        	// Get the sub-level of lang.
        	dict = sMap.Lang.lang;
        	CLASS_NAME = modules[i].init.prototype.CLASS_NAME;
        	MODULE_NAME = CLASS_NAME.replace("sMap.Module.", "");
        	moduleNameArr = MODULE_NAME.split("."); // in case of multiple module name like ClassName.SubClassName
        	for (var i=0,len=moduleNameArr.length; i<len; i++) {
        		dict = dict[moduleNameArr[i]]; // Get the last component of class name
        	}
        	if (typeof dict[langCode] != "object") {
        		notSupporting.push(CLASS_NAME);
        	}
        }
        // Also check if sMap.langDict supports this language
        if (!sMap.langDict[langCode] instanceof Object) {
        	notSupporting.push("SMAP-CORE");
        }
        return notSupporting;
    },

    /**
     * APIMethod: translate
     * Looks up a key from a dictionary based on the current language string.
     *     The value of <getCode> will be used to determine the appropriate
     *     dictionary.  Dictionaries are stored in <sMap.Lang>.
     *
     * Parameters:
     * key - {String} The key for an i18n string value in the dictionary.
     * context - {Object} Optional context to be used with
     *     <OpenLayers.String.format>.
     * 
     * Returns:
     * {String} A internationalized string.
     */
    translate: function(key, context) {
        var dictionary = sMap.Lang.lang[sMap.Lang.getCode()];
        var message = dictionary && dictionary[key];
        if(!message) {
            // Message not found, fall back to message key
            message = key;
        }
        if(context) {
            message = OpenLayers.String.format(message, context);
        }
        return message;
    },
    
    
    
    
    translateModules : function(code) {
    	if (code && typeof(code)=="string") {
    		sMap.Lang.setCode(code);
    	}
    	code = sMap.Lang.getCode();
    	sMap.moduleController.removeModules();
    	sMap.moduleController.addModules();
    }
    
};


/**
 * APIMethod: OpenLayers.i18n
 * Alias for <sMap.Lang.translate>.  Looks up a key from a dictionary
 *     based on the current language string. The value of
 *     <sMap.Lang.getCode> will be used to determine the appropriate
 *     dictionary.  Dictionaries are stored in <sMap.Lang>.
 *
 * Parameters:
 * key - {String} The key for an i18n string value in the dictionary.
 * context - {Object} Optional context to be used with
 *     <OpenLayers.String.format>.
 * 
 * Returns:
 * {String} A internationalized string.
 */
OpenLayers.i18n = sMap.Lang.translate;
