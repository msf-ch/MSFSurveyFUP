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
 * 	
 * Load data
 * 	loadData
 * 	loadDataStart
 * 	loadDataComplete
 * 
 * Form creation
 * 	setFormModelStart
 * 	setFormModelComplete
 * 	
 * 	setPageModels
 * 	setPageModelsStart
 * 	setPageModelsComplete
 * 
 * 	renderPages
 * 	renderPagesStart
 * 	renderPagesComplete
 * 
 * 	enterForm
 * 	enterFormStart
 * 	enterFormComplete
 */	
FormApp = _.extend({
	start : function() {
		this.detectLibraryInit();
		
		this.on("librariesInitialized", function() {
			Form = new FormModel;
			Body = new BodyView({
				el : $("body")
			});
			
			FormApp.trigger("initServices");
			FormApp.trigger("loadData");
		});
		
		this.on("loadData", function() {
			FormApp.trigger("loadDataStart");
			FormApp.loadData();
		});
		
		this.on("loadDataComplete", function(data) {
			FormApp.trigger("setFormModelStart")
			Form.set(data);
			FormApp.trigger("setFormModelComplete", Form);
		});
		
		this.on("setFormModelComplete", function(form) {
			FormApp.trigger("setPageModels");
		});
		
		this.on("setPageModels", function(data) {
			FormApp.trigger("setPageModelsStart");
			PageService.setPageModels(Form.get('pages'));
			FormApp.trigger("setPageModelsComplete");
			FormApp.trigger("renderPages");
		});
		
		this.on("renderPages", function(data) {
			FormApp.trigger("renderPagesStart");
			PageService.renderPages();
			FormApp.trigger("renderPagesComplete");
			FormApp.trigger("enterForm");
		});
		
		this.on("enterForm", function() {
			FormApp.trigger("enterFormStart");
			PageService.setActivePageIndex(0);
			FormApp.trigger("enterFormComplete");
		});
		
		this.on("enterFormComplete", function() {
			FormService.ready();
			$(window).on('resize', function() {
				var pageView = PageService.getActivePageView();
				if (pageView) {
					pageView.positionFooter();
				}
			});
		});
	},
	
	detectLibraryInit : function() {
		this.on("checkLibrariesInitialized", function() {
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
//		$(document).on('pageshow', positionFooter);
//		$(window).on('resize', positionFooter);

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
				console.error(textStatus + ":\n" + jqXHR.responseText)
			});
	}
}, Backbone.Events);

FormApp.start();

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