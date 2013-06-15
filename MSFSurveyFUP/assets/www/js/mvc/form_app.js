Form = new FormModel;

//Ensure that the footer always stays on the bottom
window.positionFooter = function(event) {
	var content = $.mobile.activePage.children(":jqmData(role='content')");
	content.css("min-height", "0px");

	// var headerHeight =
	// $.mobile.activePage.children(":jqmData(role='header')").outerHeight();
	var headerHeight = $.mobile.activePage.children("[pageheader]")
			.outerHeight();
	var contentHeight = content.outerHeight();
	var footerHeight = $.mobile.activePage.children(":jqmData(role='footer')")
			.outerHeight();

	var pageHeight = headerHeight + contentHeight + footerHeight;
	if (pageHeight < window.innerHeight) {
		var contentMargin = content.outerHeight() - content.height();
		var targetContentHeight = window.innerHeight - headerHeight
				- footerHeight - contentMargin;
		content.css("min-height", targetContentHeight + "px");
	}
}

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

loadFromJSONForm = function(formFilePath) {
	$.get(formFilePath, undefined, undefined, "json")
		.success(function(data, textStatus, jqXHR) {
			var loadFormTime = new Date().getTime();
			
			console.log(formFilePath);
			console.log(textStatus);
			console.log(data.length);
			
			Form.set(data);
			Body = new BodyView({
				el : $("body")
			});
	
			PageService.setPageModels(Form.get('pages'));
			PageService.renderPages();
			PageService.setActivePageIndex(0);
	
			FormService.ready();
			var loadFormTime = loadFormTime - new Date().getTime();
			console.log("Time for load form: " + loadFormTime);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error(textStatus + ":\n" + jqXHR.responseText)
		});
}

init = function() {
	var initStart = new Date().getTime();
	$(document).on('pageshow', positionFooter);
	$(window).on('resize', positionFooter);

	encounter = getParameterByName('encounter') || sessionStorage.encounter;
	sessionStorage.encounter = "";
	formFilePath = getParameterByName('formFilePath') || sessionStorage.formFilePath;
	sessionStorage.formFilePath = "";
	
	if(sessionStorage["testIterationsRemaining"]) {
		loadjscssfile('js/mvc/form_test.js');
	}
	
	if (encounter) {
		cordova.exec(function(data) {
			encounter = data;
			obsList.set(encounter.obs);
			loadFromJSONForm(formFilePath);
		}, undefined, "MSF", "getEncounter", [encounter]);
	} else {
		loadFromJSONForm(formFilePath);
	}
	console.log("Time for init: " + initStart);
};

initialized = false;
$(document).on('deviceready', function() {
	$(document).ready(function() {
		if (!initialized) {
			initialized = true;
			init();
		}
	});
});