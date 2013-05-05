//Ensure that the footer always stays on the bottom
window.positionFooter = function(event) {
	var content = $.mobile.activePage.children(":jqmData(role='content')");
	content.css("min-height", "0px");
	
	var headerHeight = $.mobile.activePage.children(":jqmData(role='header')").outerHeight();
	var contentHeight = content.outerHeight();
	var footerHeight = $.mobile.activePage.children(":jqmData(role='footer')").outerHeight();
	
	var pageHeight = headerHeight + contentHeight + footerHeight;
	if(pageHeight < window.innerHeight) {
		var contentMargin = content.outerHeight() - content.height();
		var targetContentHeight = window.innerHeight - headerHeight - footerHeight - contentMargin;
		content.css("min-height", targetContentHeight + "px");
	}
}

init = function() {

	$(document).on('pageshow', positionFooter);
	$(window).on('resize', positionFooter);
	Body = new BodyView({el : $("body")});
	
	PageService.setPageModels(formData.pages);
	PageService.renderPages();
	
	PageService.setActivePageIndex(0);
};

initialized = false;
$(document).on('pageinit', function() {
	if (!initialized) {
		initialized = true;
		init();
	}
});