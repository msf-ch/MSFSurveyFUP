EncounterFile = Backbone.Model.extend({
	defaults : {
		encounter : undefined,
		file : undefined
	}
});

EncounterModel = Backbone.Model.extend({
	defaults : {
		obs : [],
		lastSaved : 0,
		firstSaved : 0,
		formName : "",
		formNameReadable : "",
		formPath : ""
	}
});

EncounterCollection = Backbone.Collection.extend({
	model : EncounterModel
});

EncounterList = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	
	render : function() {
		this.$el.html(_.template($("#tmpl-encounterList").html(), {encounterFiles : this.options.encounterJSON}));
		this.$el.trigger('create');
	}
});
$(document).on('deviceready', function() {
	alert('ready');
	//$("#encounterList").parents(":jqmData(role='page')").on('pageshow', function() {
		cordova.exec(function(result) {
			encounterList = new EncounterList({el : $("#encounterList"), encounterJSON : result});
		}, undefined, "MSF", "getEncounterFiles");
	//});
});