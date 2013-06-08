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