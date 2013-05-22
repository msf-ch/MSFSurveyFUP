var FormItemViewModel = Backbone.Model.extend({
	defaults : {
		viewType : "",
		id : undefined,
		visible : true,
		label : "",
		conceptId : "",
		defaultValue : "",
		options : [],
		children : undefined
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
			
			this.listenTo(this.childrenModels, 'change', this.rebuildChildren);
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
		
		FormService.registerView(this.view);
	},
	
	destroyView : function() {
		FormService.unregisterView(this.view);
		this.view.remove();
		this.view = undefined;
	},
	
	rebuildChildren : function() {
		this.set('children', childrenModels.toJSON());
	}
});

//stupid name
var FormItemViewModelList = Backbone.Collection.extend({
	model : FormItemViewModel
});

var FormItemView = Backbone.View.extend({
	customPropertyDescriptors : {
	},
	
	//set model by passing {model : modelObject} to constructor
	initialize : function(options) {
		this.model = options.model;
		
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
	
	renderDefault : function(templateId, processBeforeCreateFunction) {
		this.$el.attr('id', this.id).attr('formview', this.model.get('viewType'));
		this.$el.html(_.template($("#" + templateId).html(), {model : this.model, view : this}, {variable : "data"}));
		if (processBeforeCreateFunction) {
			processBeforeCreateFunction.apply(this, this.$el);
		}
		this.$el.trigger('create');
	},
	
	valueChanged : function(view) {
	},
	
	defaultValueChanged : function() {
		console.log('defaultValueChanged');
		this.trigger('viewValueChange', this);
		this.trigger('save', this);
	},

	render : function() {
	},
	
	getValue : function() {
	},
	
	setValue : function(value) {
	}
});

var TextView = FormItemView.extend({
	events : {
		"keyup input" : "defaultValueChanged",
		"change input" : "defaultValueChanged"
	},
	
	customPropertyDescriptors : {
		minCharacters : {text : "Min characters", value : "", dataType : "number"},
		maxCharacters : {text : "Max characters", value : "", dataType : "number"}
	},
	
	render : function() {
		this.renderDefault("tmpl-textview");
	},
	
	getValue : function() {
		return this.$el.find("input").val();
	},
	
	setValue : function(value) {
		this.$el.find("input").val(value);
		console.log("Value'" + value + "TEST" + "'");
		this.model.defaultValue = value
	}
});

var NumberView = TextView.extend({
	events : {
		"change input" : "defaultValueChanged",
		"keyup input" : "defaultValueChanged",
		"keypress input" : "catchNumbers"
	},
	
	catchNumbers: function(e) {
		if ((e.keyCode >=48 && e.keyCode <= 57) || e.keyCode == 190) {
			return true; //let it go
		} else {
			return false; //catch it and prevent it from propagating
		}
	},
	
	render : function() {
		this.renderDefault("tmpl-numberview");
	},
});

var RadioView = TextView.extend({
	events : {
		"change input" : "defaultValueChanged"
	},
	
	render : function() {
		this.renderDefault("tmpl-radioview");
	},
	
	getValue : function() {
		var selected = this.$el.find(":checked");
		if (selected.length > 0) {
			val = selected.val();
			ci = this.model.get('conceptId');
			
			switch(ci){
			case "vaccinat":
				if (val == 1){
					RadioGroupService.showVaccinesCheckboxGroup(true);
				}else{
					RadioGroupService.showVaccinesCheckboxGroup(false);
				}				
			  break;
			case "ppdreac":
				if (val == 1){
					RadioGroupService.showReactionsCheckboxGroup(true);
				}else{
					RadioGroupService.showReactionsCheckboxGroup(false);
				}				
			  break;
			  
			case "malad":
				if (val == 1){
					RadioGroupService.showSymptomesCheckboxGroup(true);
					epsoin = ObsService.getObs("epsoin");
					if (epsoin == 1){
						RadioGroupService.showReasonCheckboxGroup(true);
						RadioGroupService.showWhatDoneCheckboxGroup(false);
					} else if (epsoin == 2) {
						RadioGroupService.showReasonCheckboxGroup(false);
						RadioGroupService.showWhatDoneCheckboxGroup(true);
					}
				}else{
					RadioGroupService.showSymptomesCheckboxGroup(false);
					RadioGroupService.showReasonCheckboxGroup(false);
					RadioGroupService.showWhatDoneCheckboxGroup(false);
				}				
			  break;
			case "epsoin":
				malad = ObsService.getObs("malad");
				if (malad == 1){
					if (val == 1){
						RadioGroupService.showReasonCheckboxGroup(true);
						RadioGroupService.showWhatDoneCheckboxGroup(false);
						break;
					} else if (val == 2) {
						RadioGroupService.showReasonCheckboxGroup(false);
						RadioGroupService.showWhatDoneCheckboxGroup(true);
						break;
					}
				}
				RadioGroupService.showReasonCheckboxGroup(false);
				RadioGroupService.showWhatDoneCheckboxGroup(false);
			  break;
			}			
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

var CheckGroupView = FormItemView.extend({
	render : function() {		
		this.renderDefault("tmpl-checkgroupview", function() {
			//generate checkboxes before creating
			this.model.childrenModels.each(function(childModel, index, list) {
				var newElement = $("<div></div>").appendTo(this.$el.find('fieldset'));
				childModel.generateView(newElement, {viewType: 'checkbox'});
			}, this);
		});
	}
});

var CheckView = FormItemView.extend({ 
	template : _.template($("#tmpl-checkview").html()),
	
	events : {
		"change input" : "defaultValueChanged"
	},
	
	render : function() {
		this.renderDefault("tmpl-checkview");
		this.input = this.$el.find("input");
	},
	
	getValue : function() {
		var selected = this.input.is(":checked");
		
		ci = this.model.toJSON().conceptId;
		if (ci == "ppdautre")
			if (selected == true) 
				RadioGroupService.showItem("ppdautreprecise", true);
			else
				RadioGroupService.showItem("ppdautreprecise", false);
		
		return selected;
	},
	
	setValue : function(value) {
		var checked;
		if (value) {
			checked = 'checked';
		} else {
			checked = '';
		}
		this.input.attr('checked', value).checkboxradio('refresh');
	}
});

var DateView = TextView.extend({
	render : function() {
		this.renderDefault("tmpl-dateview");
		this.$el.find('input').mobiscroll().date();
	}
});

var SubmitPageView = FormItemView.extend({
	initialize2 : function() {
		if(this.model.page) {
			this.listenTo(this.model.page, 'pagebeforeshow', this.renderBeforeShow);
		}
	},
	
	render : function() {
	},
	
	renderBeforeShow : function() {
		this.$el.attr('id', this.id).attr('formview', this.model.get('viewType'));
		this.$el.html(_.template($("#tmpl-submitpage").html(), {model : this.model, view : this}, {variable : "data"}));
		
		this.$el.trigger('create');
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


