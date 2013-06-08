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
	el : '#encounterList',
	
	initialize : function() {
	},
	
	render : function(encounters) {
		this.$el.html(_.template($("#tmpl-encounterList").html(), {encounterFiles : encounters}));
		this.$el.trigger('create');
	}
});

FormSelect = Backbone.View.extend({
	el : "#formSelectContainer",
	
	events : {
		'change' : 'change'
	},
	
	initialize : function() {
		var that = this;
		var success = function(forms) {
			that.forms = forms;
			that.render();
			that.change();
		};
		var fail = function(message) {
			alert(message);
		};
		
		cordova.exec(success, fail, "MSF", "getForms", []);
	},
	
	render : function() {
		this.$el.html(_.template($("#tmpl-formSelect").html(), {forms : this.forms}));
		this.$el.trigger('create');
	},
	
	change : function() {
		cordova.exec(function(encounters) {
			encounterList.render(encounters);
		}, function(message) {alert('ERROR: ' + message)}, "MSF", "getEncounters", [{formName : this.$el.find(":checked").attr('value')}]);
	}
});

$(document).on('deviceready', function() {
	$(document).ready(function() {
		encounterList = new EncounterList();
		formSelect = new FormSelect();
	});
});