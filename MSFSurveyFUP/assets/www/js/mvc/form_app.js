/**
 * Events object for application-level management
 * 
 * Events order
 * 
 * Initialization
 * 	checkLibrariesInitialized
 * 	librariesInitialized
 * 	
 * Initialize services
 * 	initServices
 * 	initServicesComplete
 * 
 * 	initViewClasses
 * 	initViewClassesComplete
 * 	
 * Load data
 * 	loadData
 * 	loadDataComplete
 * 
 * Form creation
 * 	setFormModel
 * 	setFormModelComplete
 * 	
 * 	setPageModels
 * 	setPageModelsComplete
 * 
 * 	renderPages
 * 	renderPagesComplete
 * 
 * 	enterForm
 * 	enterFormComplete
 * 
 * 
 * 
 * Form submission
 *  formSubmit
 *  formSubmitComplete
 */	
FormApp = _.extend({
	start : function() {
		FormApp.timing = {};
		FormApp.listenTo(FormApp, 'all', function(eventName) {
			if (eventName) {
				FormApp.timing[eventName] = new Date().getTime();
				console.log(eventName + 'fired');
			}
		});
		
		FormApp.listenTo(FormApp, 'enterFormComplete', function() {
			for (var prop in FormApp.timing) {
				var time;
				if(FormApp.timing[prop + "Complete"]) {
					time = FormApp.timing[prop + "Complete"] - FormApp.timing[prop];
					console.log(prop + ": " + time);
				}
			}
		});
		
		this.on("librariesInitialized", function() {
			$(document).on("backbutton", function() {
				FormApp.trigger("backbutton");
			});
			$(window).on("beforeunload", function() {
				$(document).off("backbutton");
			});
			
			FormApp.trigger("initPageClasses");
			FormApp.trigger("initPageClassesComplete");
			
			FormApp.trigger("registerServices");
			FormApp.trigger("registerServicesComplete");
			
			FormApp.trigger("initServices");
			FormApp.trigger("initServicesComplete");
			
			FormApp.trigger("initViewClasses");
			FormApp.trigger("initViewClassesComplete");
			
			FormApp.trigger("loadData");
			FormApp.loadData();
		});
		
		this.on("loadDataComplete", function(data) {
			FormApp.trigger("setFormModel")
			Form = new FormModel(data);
			FormApp.trigger("setFormModelComplete", Form);
			
			FormApp.trigger("setPageModels");
			PageService.setPageModels(Form.get('pages'));
			FormApp.trigger("setPageModelsComplete");
			
			FormApp.trigger("renderPages");
			PageService.renderPages();
			FormApp.trigger("renderPagesComplete");
			
			FormApp.trigger("decoratePages");
			PageService.decoratePages();
			FormApp.trigger("decoratePagesComplete");
			
			FormApp.trigger("registerViews");
			FormService.registerViews();
			FormApp.trigger("registerViewsComplete");
			
			FormApp.trigger("initializeObs");
			ObsService.initializeValues();
			FormApp.trigger("initializeObsComplete");
			
			FormApp.trigger("enterForm");
			PageService.setActivePageIndex(0);
			FormApp.trigger("enterFormComplete");
		});
		
		this.detectLibraryInit();
	},
	
	detectLibraryInit : function() {
		this.on("checkLibrariesInitialized", function() { //This gets fired when all initialization parameters are met
			if (FormApp.deviceReady && FormApp.pageShown && !FormApp.initialized) {
				FormApp.initialized = true;
				FormApp.trigger("librariesInitialized");
			}
		});
		
		$(document).one('deviceready', function() {
			FormApp.deviceReady = true;
			FormApp.trigger('checkLibrariesInitialized');
		});

		//Triggered when the loading page (whatever page is in the HTML doc) is shown
		$(document).one('pageshow', function() {
			FormApp.pageShown = true;
			FormApp.trigger('checkLibrariesInitialized');
		});
	},
	
	loadData : function() {
		var initStart = new Date().getTime();

		encounter = getParameterByName('encounter') || sessionStorage.encounter;
		sessionStorage.encounter = "";
		formFilePath = getParameterByName('formFilePath') || sessionStorage.formFilePath;
		sessionStorage.formFilePath = "";
		
		var testIterationsRemaining = sessionStorage["testIterationsRemaining"];
		if(testIterationsRemaining && testIterationsRemaining > 0) {
			loadjscssfile('js/mvc/form_test.js', 'js');
		}
		
		if (encounter) {
			cordova.exec(function(data) {
				encounter = data;
				obsList.set(encounter.obs);
				FormApp.loadFromJSONForm(formFilePath);
			}, undefined, "MSF", "getEncounter", [encounter]);
		} else {
			FormApp.loadFromJSONForm(formFilePath);
		}
		console.log("Time for init: " + initStart);
	},
	
	registerService : function(serviceName, service) {
		FormApp.listenTo(service, 'all', function(eventName) {
			var args = [serviceName + ":" + eventName]; //ie ViewService:registered
			args = args.concat(Array.prototype.splice.call(arguments, 1));
			
			FormApp.trigger.apply(FormApp, args);
		});
		
		if(_.isFunction(service.initialize)) {
			service.listenToOnce(FormApp, 'initServices', service.initialize);
		}
		
		service.trigger('registered');
	},
	
	loadFromJSONForm : function(formFilePath) {
		return $.get(formFilePath, undefined, undefined, "json")
			.done(function(data, textStatus, jqXHR) {
				var loadFormTime = new Date().getTime();
				
				console.log(formFilePath);
				console.log(textStatus);
				console.log(data.length);
				
				FormApp.trigger("loadDataComplete", data);
		
		
				var loadFormTime = loadFormTime - new Date().getTime();
				console.log("Time for load form: " + loadFormTime);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.error("Error with ajax for form file: " + formFilePath);
				console.error(textStatus + ":\n" + jqXHR.responseText);
			});
	}
}, Backbone.Events);


/*
 * JQuery plugins
 */
(function($) {
	//Allow custom CSS selectors ie $(":form-item") to find all form views
	var pseudos = {
		"form-item": function(elm, arg2, arg3) {
			return jQuery.data(elm, 'form-item-view') != undefined;
		},

		"form-page": function(elm, arg2, arg3) {
			return jQuery.data(elm, 'form-page-view') != undefined;
		}
	}
	$.extend($.expr[':'], pseudos);
	
	
	$.fn.itemView = function() {
		return this.data('form-item-view');
	};
	
	$.fn.pageView = function() {
		return this.data('form-page-view');
	};
	
	$.fn.parentPageView = function() {
		return this.parents(":form-page").pageView();
	};
}(jQuery));


/*
 * Utility methods
 */
function loadjscssfile(filename, filetype) {
	if (filetype == "js") { // if filename is a external JavaScript file
		var fileref = document.createElement('script')
		fileref.setAttribute("type", "text/javascript")
		fileref.setAttribute("src", filename)
	} else if (filetype == "css") { // if filename is an external CSS file
		var fileref = document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filename)
	}
	if (typeof fileref != "undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref)
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex
			.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g,
			" "));
}