var ViewId = Backbone.Model.extend({
	defaults : {
		conceptId : "",
		el : undefined,
	},
	
	initialize : function(initValues, classParams) {
	},
	
	getValue : function() {
		return this.get("el");
	},
	
	setValue : function(value) {
		this.set("el", value);
	},
});


var ViewIdList = Backbone.Collection.extend({
	model : ViewId,
    
	findViewIdFromConceptId : function(conceptIdToFind) {
		var results = this.where({conceptId : conceptIdToFind});
		if (results.length == 0) {
			return undefined;
		} else {
			return results[0];
		}
	},
	
	getValue : function(conceptId) {
		var ob = this.findViewIdFromConceptId(conceptId);
		if(ob) {
			return ob.get('el');
		} else {
			return undefined;
		}
	},
	
	setValue : function(conceptId, ele) {
		var ob = this.findViewIdFromConceptId(conceptId);
		if (ob) {
			ob.set('el', ele);
		} else {
			this.add({conceptId : conceptId, el: ele});
		}
	},
});

var viewidList = new ViewIdList;	
