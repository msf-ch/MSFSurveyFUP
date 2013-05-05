Default = Backbone.Model.extend({
});

DefaultList = Backbone.Collection.extend({
	model : Default
});

DefaultsService = {
		defaults : new DefaultList,
		
		registerDefaults : function(path, defaults) {
		},
		
		getDefaults : function(componentName, options) {
		}
	};


{
	globalDefaults = {
			theme : "c"
	};
	pageDefaults = {
			
	};
	headerDefaults = {
			title : '????TITLE NOT ENTERED?????'
	};
	contentDefaults = {
			
	};
	footerDefaults = {
			
	};
	
	DefaultsService.registerDefaults('global', globalDefaults);
}

BlankForm = {
	form : {
		global : {
			theme : ''
		},
		pages : [
		         {
		        	 header : {
		        		 title : '',
		        		 theme : ''
		        	 },
		        	 content : {
		        		 views : [
		        		          ]
		        	 },
		        	 footer : {
		        		 theme : ''
		        	 }
		         }
		]
	},
	
	concepts : {
	},
	
	obs : {
	}
}