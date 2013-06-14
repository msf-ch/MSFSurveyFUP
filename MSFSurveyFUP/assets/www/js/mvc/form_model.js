FormModel = Backbone.Model.extend({
	defaults : {
		name : undefined,
		nameReadable : undefined,
		description : undefined,
		descriptors : [],
		global : {},
		pages : []
	},
	
	initialize : function() {
	}
});

Encounter = Backbone.Model.extend({
	defaults : {
		obs : [],
		lastSaved : undefined,
		formName : "",
		formNameReadable : "",
		descriptors : [],
		completed : true,
		lastPage : undefined
	}
});