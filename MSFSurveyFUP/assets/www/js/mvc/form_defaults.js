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
	ViewService.registerViewClass("text", TextView, [ValidationService._standardBounds, ValidationService._standardRequired, ValidationService._standardValidators]);
	ViewService.registerViewClass("number", NumberView, [ValidationService._standardBounds, ValidationService._standardRequired, ValidationService._standardValidators]);
	ViewService.registerViewClass("radio", RadioView, [ValidationService._standardBounds, ValidationService._standardRequired, ValidationService._standardValidators]);
	ViewService.registerViewClass("select", SelectView, [ValidationService._standardBounds, ValidationService._standardRequired, ValidationService._standardValidators]);
	ViewService.registerViewClass("checkboxgroup", CheckGroupView, [ValidationService._checkboxgroupRequired]);
	ViewService.registerViewClass("checkbox", CheckView, [ValidationService._standardRequired, ValidationService._standardValidators]);
	ViewService.registerViewClass("date", DateView, [ValidationService._standardBounds, ValidationService._standardRequired, ValidationService._standardValidators]);
	ViewService.registerViewClass("ranking", RankingView, [ValidationService._rankingRequired]);
	ViewService.registerViewClass("rankingitem", RankingItemView, []);
	ViewService.registerViewClass("submitpage", SubmitPageView, []);
	ViewService.registerViewClass("gps", GPSAcquireView, []);
	
	FormApp.trigger("defaultViewClassesRegistered");
});