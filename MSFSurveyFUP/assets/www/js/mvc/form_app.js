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

init = function() {
	$(document).on('pageshow', positionFooter);
	$(window).on('resize', positionFooter);

	var formFilePath = getParameterByName('formFilePath');
	$.get(formFilePath, undefined, undefined, "text").
	success(function(data, textStatus, jqXHR) {
		var formData = new Function(data).apply(this);
		Form = new FormModel(formData);
		Body = new BodyView({
			el : $("body")
		});

		PageService.renderPages();
		PageService.setActivePageIndex(0);

		FormService.ready();
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error(textStatus + ":\n" + jqXHR.responseText)
	});
	
//	var savedDataFile = getParameterByName('savedDataFile');
//	var savedObs = cordova.exec(this.submitSuccessCallback,
//			this.submitFailCallback, "MSF", "getObs", [ savedDataFile ]);
//	if (savedObs) {
//		obsList.reset(savedObs);
//	}
};

initialized = false;
$(document).on('pageinit', function() {
	if (!initialized) {
		initialized = true;
		init();
	}
});