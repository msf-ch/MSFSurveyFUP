FormModel = Backbone.Model.extend({
	defaults : {
		name : undefined,
		nameReadable : undefined,
		description : undefined,
		fileName : undefined,
		global : {},
		pages : []
	},
	
	initialize : function() {
	}
});