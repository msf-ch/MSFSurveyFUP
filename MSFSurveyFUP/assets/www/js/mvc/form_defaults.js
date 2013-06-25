//window.formItemViewCodes = {text : TextView,
//		number : NumberView,
//		radio : RadioView,
//		select : SelectView,
//		checkboxgroup : CheckGroupView,
//		checkbox : CheckView,
//		date : DateView,
//		ranking : RankingView,
//		rankingitem : RankingItemView,
//		submitpage : SubmitPageView,
//		gps : GPSAcquireView};
//});


//FormApp.on("")

//window.formItemViewCodes = {text : TextView,
//		number : NumberView,
//		radio : RadioView,
//		select : SelectView,
//		checkboxgroup : CheckGroupView,
//		checkbox : CheckView,
//		date : DateView,
//		ranking : RankingView,
//		rankingitem : RankingItemView,
//		submitpage : SubmitPageView,
//		gps : GPSAcquireView};
//});

FormApp.on("initServices", function() {
	ViewService.registerViewClass("text", TextView, [ValidationService._standardBounds, ViewService._standardRequired, ViewService._standardValidators]);
	ViewService.registerViewClass("number", NumberView, [ValidationService._standardBounds, ViewService._standardRequired, ViewService._standardValidators]);
	ViewService.registerViewClass("radio", RadioView, [ValidationService._standardBounds, ViewService._standardRequired, ViewService._standardValidators]);
	ViewService.registerViewClass("select", SelectView, [ValidationService._standardBounds, ViewService._standardRequired, ViewService._standardValidators]);
	ViewService.registerViewClass("checkboxgroup", CheckGroupView, []);
	ViewService.registerViewClass("checkbox", CheckView, [ViewService._standardRequired, ViewService._standardValidators]);
	ViewService.registerViewClass("date", DateView, [ValidationService._standardBounds, ViewService._standardRequired, ViewService._standardValidators]);
	ViewService.registerViewClass("ranking", RankingView, []);
	ViewService.registerViewClass("rankingitem", RankingItemView, []);
	ViewService.registerViewClass("submitpage", SubmitPageView, []);
	ViewService.registerViewClass("gps", GPSAcquireView, []);
	
	FormApp.trigger("defaultViewClassesRegistered");
});