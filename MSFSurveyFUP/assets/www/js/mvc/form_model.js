FormModel = Backbone.Model.extend({
	defaults : {
		name : undefined,
		nameReadable : undefined,
		description : undefined,
		descriptors : [],
		global : {validation: {validateOnNextPage: true}},
		pages : []
	},
	
	initialize : function() {
		this.defaultGlobal();
		this.on("change:global", function() {
			this.defaultGlobal();
		}, this);
	},
	
	defaultGlobal : function() {
		var currentGlobal = this.get('global');
		for (var prop in this.defaults.global) {
			if(!currentGlobal[prop]) {
				currentGlobal[prop] = {};
			}
			_.defaults(currentGlobal[prop], this.defaults.global[prop]);
		}
	},
	
	getGlobalVariable : function(category, variable) {
		var global = this.get('global');
		if(!global[category]) {
			return undefined;
		} else {
			var category = global[category];
			return category[variable];
		}
	},
	
	setGlobalVariable : function(category, variable, value) {
		var global = this.get('global');
		if(!global[category]) {
			global[category] = {}
		}
		var category = global[category];
		category[variable] = value;
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