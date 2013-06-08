$(function() {
FormItemViewModel = Backbone.Model.extend({
	defaults : {
		viewType : "",
		id : undefined,
		visible : true,
		label : "",
		conceptId : "",
		defaultValue : "",
		options : [],
		children : undefined,
		showIf : undefined, // [conceptId, [values]]
		hideIf : undefined, // [conceptId, [values]]
		obsListeners : undefined, // [conceptId, eventName, action]
		validators : undefined, // [{conceptIds : [], condition : "", errorMessage : ""}]
		bounds : undefined, // {minValue : 0, maxValue : 1, minLength : 0, maxLength : 1, exactLength : 1}
		required : false,
	},
	
	propertyDescriptors : {
		id : {text : "Element ID", defaultValue : undefined, dataType : "text"},
		visible : {text : "Visible by default", defaultValue : true, dataType : "select", options : [true, false]},
		label : {text : "Label", defaultValue : "", dataType : "text"},
		conceptId : {text : "Concept ID", defaultValue : "", dataType : "text"},
	},
	
	initialize : function() {
		var children = this.get('children');
		if(children) {
			this.childrenModels = new FormItemViewModelList;
			this.childrenModels.add(children);
		}
		
		//precompile validators
		var validators = this.get('validators');
		if (validators) {
			for (var i = 0; i < validators.length; i++) {
				validators[i].compiledFunction = EvaluationService.compileObsEvalFunction(validators[i]);
			}
		}
	},
	
	generateView : function(element, params) {
		if(this.view) {
			this.destroyView();
		}
		
		if (params) {
			this.page = params.page;
			var viewType = params.viewType;
		}
		
		if(!viewType) {
			viewType = this.get('viewType');
		}
		
		this.view = new formItemViewCodes[viewType]({model : this,
			el : element});
		this.view.render();
	},
	
	destroyView : function() {
		FormService.unregisterView(this.view);
		this.view.remove();
		this.view = undefined;
	},
	
	rebuildChildren : function() {
		this.set('children', childrenModels.toJSON());
	},
	
	getValidationErrors : function() {
		var errors = [];
		if (this.get('validators')) {
			//check against validators
		}
		var bounds = this.get('bounds');
		var value = this.view.getValue();
		if (bounds && value) { //TRANSLATETHIS
			var stringValue = value.toString();
			 if (bounds.maxValue && value > bounds.maxValue) {
				 errors.push("Answer VALUE must be less than or equal to " + bounds.maxValue);
			 }
			 if (bounds.minValue && value < bounds.minValue) {
				 errors.push("Answer VALUE must be more than or equal to " + bounds.minValue);
			 }

			var stringValue = value.toString();
			 if (bounds.maxLength && stringValue.length > bounds.maxLength) {
				 errors.push("Answer LENGTH must be less than or equal to " + bounds.maxLength + " characters.");
			 }
			 if (bounds.minLength && stringValue.length > bounds.minLength) {
				 errors.push("Answer LENGTH must be more than or equal to " + bounds.minLength + " characters.");
			 }

			 if (bounds.exactLength && stringValue.length > bounds.exactLength) {
				 errors.push("Answer LENGTH must be exactly " + bounds.exactLength + " characters.");
			 }
		}
		
		return errors;
	}
});

//stupid name
FormItemViewModelList = Backbone.Collection.extend({
	model : FormItemViewModel
});

FormItemView = Backbone.View.extend({
	template : undefined,
	
	decorated : false,
	
	registered : false,
	
	page : undefined,
	
	customPropertyDescriptors : {
	},
	
	//set model by passing {model : modelObject} to constructor
	initialize : function(options) {
		this.model = options.model;
		this.$el.data('formview', this);
		
		//generate a unique ID if not specified already
		var id = options.id;
		if (!id) {
			id = this.model.get('id');
			if (!id) {
				id = _.uniqueId(this.model.get('viewType') + "-");
			}
		}
		this.id = id;
		
		if(this.initialize2) {
			this.initialize2.apply(this, arguments);
		}
	},
	
	renderDefault : function(processBeforeCreateFunction) {
		this.$el.attr('id', this.id).attr('formview', this.model.get('viewType')).data('view', this).addClass('formview');
		
		this.$el.html(this.template({model : this.model, view : this}));
		if (this.registered) {
			this.decorate();
		}
	},
	
	decorate : function() {
		this.$el.trigger('create');
		this.decorated = true;
	},
	
	valueChanged : function(view) {
		this.defaultValueChanged();
	},
	
	defaultValueChanged : function() {
		this.trigger('viewValueChange', this);
		this.trigger('save', this);
	},

	render : function() {
	},
	
	getValue : function() {
	},
	
	setValue : function(value) {
	},
	
	show : function() {
		this.$el.removeClass('viewhidden');
	},
	
	hide : function() {
		this.setValue(undefined);
		this.$el.find("[formview]").each(function(index, element) {
			$(element).data('formview').setValue(undefined);
		});
		
		this.$el.find('')
		this.$el.addClass('viewhidden');
	},
	
	error : function(showError, messages) {
		this.$el.children(".errorfield").remove();
		
		if (!showError) {
			this.$el.removeClass('viewwitherror');
		} else {
			this.$el.addClass('viewwitherror');
			var errorHtml = _.template($("#tmpl-errormsg").html(),
					{model : this.model, view : this, errors : messages});
			this.$el.prepend(errorHtml);
		}
	},
	
	validate : function() {
		var validationErrors = this.model.getValidationErrors();
		this.error(validationErrors.length > 0, validationErrors);
		
		return validationErrors;
	}
});

TextView = FormItemView.extend({
	template : _.template($("#tmpl-textview").html()),
	
	events : {
		"keyup input" : "defaultValueChanged",
		"change input" : "defaultValueChanged"
	},
	
	customPropertyDescriptors : {
		minCharacters : {text : "Min characters", value : "", dataType : "number"},
		maxCharacters : {text : "Max characters", value : "", dataType : "number"}
	},
	
	render : function() {
		this.renderDefault();
	},
	
	getValue : function() {
		return this.$el.find("input").val();
	},
	
	setValue : function(value) {
		this.$el.find("input").val(value);
		this.model.defaultValue = value
	}
});

NumberView = TextView.extend({
	template : _.template($("#tmpl-numberview").html()),
	
	events : {
		"change input" : "defaultValueChanged",
		"keyup input" : "defaultValueChanged",
		"keypress input" : "catchNumbers"
	},
	
	catchNumbers: function(e) {
		if ((e.keyCode >=48 && e.keyCode <= 57) || e.keyCode == 110 || e.KeyCode == 190 || e.keyCode == 46) {
			return true; //let it go
		} else {
			return false; //catch it and prevent it from propagating
		}
	},
	
	render : function() {
		this.renderDefault();
	},
});

RadioView = TextView.extend({
	template : _.template($("#tmpl-radioview").html()),
	
	events : {
		"change input" : "defaultValueChanged"
	},
	
	render : function() {
		this.renderDefault();
	},
	
	getValue : function() {
		var selected = this.$el.find(":checked");
		if (selected.length > 0) {
			val = selected.val();
			return val;
		} else {
			return "";
		}
	},
	
	setValue : function(value) {
		var radiobuttons = this.$el.find("input");
		var changedButton = radiobuttons.filter("[value='" + value + "']").attr('checked', true);
		radiobuttons.not(changedButton).attr('checked', false);
		radiobuttons.checkboxradio('refresh');
	}
});

CheckGroupView = FormItemView.extend({
	template : _.template($("#tmpl-checkgroupview").html()),
	
	render : function() {		
		this.renderDefault()
		this.model.childrenModels.each(function(childModel, index, list) {
			var newElement = $("<div></div>").appendTo(this.$el.find('fieldset'));
			childModel.generateView(newElement, {viewType: 'checkbox'});
		}, this);
	}
});

CheckView = FormItemView.extend({ 
	template : _.template($("#tmpl-checkview").html()),
	
	events : {
		"change input" : "defaultValueChanged"
	},
	
	render : function() {
		this.renderDefault();
		this.input = this.$el.find("input");
	},
	
	getValue : function() {
		return this.input.is(":checked");
	},
	
	setValue : function(value) {
		if (value == undefined) {
			value = false;
		}
		this.input.prop('checked', value).checkboxradio('refresh');
	}
});

DateView = TextView.extend({
	template : _.template($("#tmpl-dateview").html()),
	
	render : function() {
		this.renderDefault();
		this.$el.find('input').mobiscroll().date({lang: 'fr', display: 'bubble'});
	}
});

SubmitPageView = FormItemView.extend({
	template : _.template($("#tmpl-submitpage").html()),
	
	initialize2 : function() {
		if(this.model.page) {
			this.listenTo(this.model.page, 'pagebeforeshow', this.renderBeforeShow);
		}
	},
	
	render : function() {
	},
	
	renderBeforeShow : function() {
		template : _.template($("#tmpl-submitpage").html()),
				
		this.$el.attr('id', this.id).attr('formview', this.model.get('viewType'));
		this.$el.html(this.template( {model : this.model, view : this}, {variable : "data"} ));
		
		this.decorate();
	}
});

/* This object sets what view types correspond with what view templates.
 *  A new view template needs to be added here to be used. */

window.formItemViewCodes = {text : TextView,
		number : NumberView,
		radio : RadioView,
		checkboxgroup : CheckGroupView,
		checkbox : CheckView,
		submitpage : SubmitPageView,
		date : DateView};

});
