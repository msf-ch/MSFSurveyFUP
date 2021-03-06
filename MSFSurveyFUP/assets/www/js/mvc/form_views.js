FormApp.once('initViewClasses', function() {
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
		showIf : undefined, // {conceptIds : ["conceptId1", "conceptId2"], condition : "conceptId1 > conceptId2"} 
							//shows view if conceptId1 is more than conceptId2 (evaluated at form init and upon value changes)
		hideIf : undefined, // {conceptIds : ["conceptId1", "conceptId2"], condition : "conceptId1 > conceptId2"}
							//hides view if conceptId1 is more than conceptId2 (evaluated at form init and upon value changes)
		validators : undefined, // [{conceptIds : ["conceptId1"], condition : "value > conceptId1 && value == view.getValue()", errorMessage : ""}]
								// condition script can use variables view (the view object) and value (the value of the view object)
		bounds : undefined, // {minValue : 0, maxValue : 1, minLength : 0, maxLength : 1, exactLength : 1}
		dateBounds : undefined, //{maxDate : [4-digit year, month, day], minDate : [4-digit year, month, day], dateFormat : "", dateOrder : ""}
		rankingBounds : undefined, //{minSelections: 0}
		checkboxgroupBounds : undefined, //{minSelections: 0}
		horizontalMode : false,
		required : true
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
	},
	
	generateView : function(element, params) {
		if(this.view) {
			this.destroyView();
		}
		var viewType = undefined;
		var parent = undefined;
		if (params) {
			viewType = params.viewType;
			parent = params.parent;
		}
		
		if(!viewType) {
			viewType = this.get('viewType');
		}
		
		var viewClass = new ViewService.getViewClass(viewType).get('viewConstructor');
		this.view = new viewClass({model : this,
			el : element, "parent" : parent});
		
		this.view.render();
		
		return this.view;
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
FormItemViewModelList = Backbone.Collection.extend({
	model : FormItemViewModel
});

FormItemView = Backbone.View.extend({
	template : undefined,
	
	registered : false,
	
	customPropertyDescriptors : {
	},
	
	//set model by passing {model : modelObject} to constructor
	initialize : function(options) {
		this.model = options.model;
		this.$el.data('form-item-view', this);
		
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
	
	renderDefault : function() {
		this.$el.attr('id', this.id).attr('formview', this.model.get('viewType')).data('form-item-view', this).addClass('formview');
		
		this.$el.html(this.template({model : this.model, view : this}));
		if (this.registered) {
			this.decorate();
		}
	},
	
	decorate : function() {
		this.$el.trigger('create');
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
		
		this.trigger('viewShown', this);
	},
	
	hide : function() {
		//don't do anything if it's already hidden or if a parent has been hidden
		if (!this.$el.is(".viewhidden") && this.$el.parents(".viewhidden").length == 0) {
			this.setValue(undefined);
			this.error(false);
			this.defaultValueChanged();
			
			this.$el.addClass('viewhidden');
			
			//Hide children
			if (this.model.get('children')) {
				var formItems = this.$el.find("div:form-item");
				var formView;
				for (var i = 0; i < formItems.length; i++) {
					formView = $(formItems[i]).itemView();
					
					formView.setValue(undefined);
					formView.error(false);
					formView.defaultValueChanged();
				}
			}
			
			this.trigger('viewHidden', this);
		}
	},
	
	error : function(showError, messages) {
		this.$el.children(".errorfield").remove();
		
		if (showError) {
			this.$el.addClass('viewwitherror');
			var errorHtml = _.template($("#tmpl-errormsg").html(),
					{model : this.model, view : this, errors : messages});
			this.$el.prepend(errorHtml);
		} else {
			this.$el.removeClass('viewwitherror');
		}
	},
	
	hasValue : true
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
		var input = this.$el.find("input");
		if (input.val() != value) {
			input.val(value);
		}
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
		var selected = this.$el.find("input:checked");
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

SelectView = TextView.extend({
	template : _.template($("#tmpl-selectview").html()),
	
	events : {
		"change select" : "defaultValueChanged"
	},
	
	render : function() {
		this.renderDefault();
	},
	
	getValue : function() {
		var value = this.$el.find("select").val();
		return value;
	},
	
	setValue : function(value) {
		var select = this.$el.find("select");
		select.val(value);
		select.selectmenu('refresh');
	}
});

CheckGroupView = FormItemView.extend({
	hasValue : false,
	
	template : _.template($("#tmpl-checkgroupview").html()),
	
	render : function() {		
		this.renderDefault();
		
		var fieldset = this.$el.find('fieldset');
		var childModel;
		for (var i = 0; i < this.model.childrenModels.length; i++) {
			childModel = this.model.childrenModels.at(i);

			var newElement = $("<div></div>").appendTo(fieldset);
			childModel.generateView(newElement, {viewType: 'checkbox'});
		}
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
	
	events : {
		"change input" : "defaultValueChanged"
	},
	
	render : function() {
		this.renderDefault();
		var mobiscrollParams = {lang: 'fr', display: 'bubble'};
		var dateBounds = this.model.get('dateBounds');
		if (dateBounds) {
			if (dateBounds.maxDate) {
				if (dateBounds.maxDate.toLowerCase() == "today") {
					mobiscrollParams.maxDate = new Date();
				} else {
					mobiscrollParams.maxDate = new Date(dateBounds.maxDate);
				}
			}
			if (dateBounds.minDate) {
				if (dateBounds.minDate.toLowerCase() == "today") {
					mobiscrollParams.minDate = new Date();
				} else {
					mobiscrollParams.minDate = new Date(dateBounds.minDate);
				}
			}
			if (dateBounds.dateFormat) {
				mobiscrollParams.maxDate = dateBounds.dateFormat;
			}
			if (dateBounds.dateOrder) {
				mobiscrollParams.dateOrder = dateBounds.dateOrder;
			}
		}
		this.$el.find('input').mobiscroll().date(mobiscrollParams);
	}
});

RankingView = FormItemView.extend({
	hasValue : false,
	
	template : _.template($("#tmpl-rankingview").html()),
	
	rankedRowTemplate : _.template($("#tmpl-rankedrow").html()),
	
	unrankedRowTemplate : _.template($("#tmpl-unrankedrow").html()),
	
	events : {
		"click [unranked] tr" : "addItem",
		"click a[action='moveup']:not(.ui-disabled)" : "moveUp",
		"click a[action='movedown']:not(.ui-disabled)" : "moveDown",
		"click a[action='delete']:not(.ui-disabled)" : "deleteItem",
	},
	
	items : undefined,
	
	ItemsCollection : Backbone.Collection.extend({
		model : Backbone.Model.extend({
			idAttribute : "conceptId",
			defaults : {"conceptId" : undefined, "isValueSet" : false }
		}),
		
		setRank : function(conceptId, newIndex) {
			var itemToMove = this.get(conceptId);
			var oldIndex = this.getRank(conceptId);
			
			//if removing...
			if (newIndex == undefined || newIndex < 0) {
				if(!itemToMove.get('isValueSet')) {
					//don't do anything if it's already removed
					return;
				}
				
				newIndex = this.indexOfLastSetValue();
				itemToMove.set('isValueSet', false);
			} else {
				itemToMove.set('isValueSet', true);
			}
			
			//move the item
			this.remove(itemToMove);
			this.add(itemToMove, {at : newIndex});
			
			if(itemToMove.get('isValueSet')) {
				itemToMove.get('rankedRow').hide().fadeIn('slow', function() {
					$(this).css('display', '');
				});
			} else {
				itemToMove.get('unrankedRow').hide().fadeIn('slow', function() {
					$(this).css('display', '');
				});
			}
			
			this.trigger('rearranged', [oldIndex, newIndex]);
		},
		
		getRank : function(conceptId) {
			var item = this.get(conceptId);
			if (item.get('isValueSet')) {
				return this.indexOf(item);
			} else {
				return undefined;
			}
		},
		
		indexOfLastSetValue : function() {
			var i = this.length - 1;
			for (; i >= 0; i--) {
				if (this.at(i).get('isValueSet')) {
					break;
				}
			}
			//returns -1 if no values set
			return i;
		}
	}),
	
	initialize2 : function() {
		this.items = new this.ItemsCollection;
		
		this.listenTo(this.items, 'change:isValueSet', this.valueSetChanged);
		this.listenTo(this.items, "rearranged", this.rearranged);
	},
	
	render : function() {
		this.renderDefault();
		var rankedTbody = this.$el.find("div[ranked] tbody");
		var unrankedTbody = this.$el.find("div[unranked] tbody");
		
		for (var i = 0; i < this.model.childrenModels.length; i++) {
			var childModel = this.model.childrenModels.at(i);
			var conceptId = childModel.get('conceptId');
			
			var formViewElement = $("<div></div>").appendTo(this.$el);
			var formView = childModel.generateView(formViewElement, {viewType: 'rankingitem', parent : this});
			
			var rankedRow = $("<tr></tr>", {"conceptId" : conceptId}).appendTo(rankedTbody);
			rankedRow.html(this.rankedRowTemplate({item : childModel}));
			
			var unrankedRow = $("<tr></tr>", {"conceptId" : conceptId}).appendTo(unrankedTbody);
			unrankedRow.html(this.unrankedRowTemplate({item : childModel}));
			
			this.items.add({"conceptId" : conceptId,
							"formView" : formView,
							"rankedRow" : rankedRow,
							"unrankedRow" : unrankedRow});
		}
		
		this.refresh();
		this.$el.find("tr").css('display', ''); //fixes a bug with JQuery mobile's rendering of tables
	},
	
	refresh : function() {
		var rankedTable = this.$el.find("[ranked] > table");
		var unrankedTable = this.$el.find("[unranked] > table");
		
		var rankedTbody = rankedTable.children("tbody");
		var unrankedTbody = unrankedTable.children("tbody");
		
		for (var i = this.items.length - 1; i >= 0; i--) {
			var element = this.items.at(i);
			if(element.get('isValueSet')) {
				var rank = this.items.getRank(element.get('conceptId')) + 1;
				element.get('rankedRow').prependTo(rankedTbody).find("span.ranknumber").html(rank);
				element.get("rankedRow").removeClass('hidden');
				element.get("unrankedRow").addClass('hidden');
			} else {
				element.get("rankedRow").addClass('hidden');
				element.get("unrankedRow").removeClass('hidden');
			}
		}
		
		var visibleItems = rankedTbody.add(unrankedTbody).find("tr:not(.hidden)");
		visibleItems.removeClass("alt").filter(":odd").addClass("alt");
		
		var visibleRankedItems = visibleItems.filter("div[ranked] tr");
		visibleRankedItems.find("a[action]").removeClass('ui-disabled');
		visibleRankedItems.first().find("a[action='moveup']").addClass('ui-disabled');
		visibleRankedItems.last().find("a[action='movedown']").addClass('ui-disabled');
		
		if (visibleRankedItems.length > 0) {
			rankedTable.children("tfoot").hide();
		} else {
			rankedTable.children("tfoot").show();
		}
		
		if (unrankedTable.find("tbody tr:not(.hidden)").length > 0) {
			unrankedTable.children("thead").show();
		} else {
			unrankedTable.children("thead").hide();
		}
		
		if(this.registered) {
			//this.$el.find("table").table('refresh');
		}
	},
	
	valueSetChanged : function(model, isValueSet, list) {
//		if (isValueSet) {
//			model.get("rankedRow").fadeIn('fast').removeClass('hidden');
//			model.get("unrankedRow").fadeOut('fast', function(){ $(this).addClass('hidden');});
//		} else {
//			model.get("rankedRow").fadeOut('fast', function(){ $(this).addClass('hidden');});
//			model.get("unrankedRow").fadeIn('fast').removeClass('hidden');
//		}
	},
	
	rearranged : function(options) {
		var startIndex = 0;
		var endIndex = this.items.length - 1;
		
		if (options) {
			endIndex = options[1];
			if (options[0] != undefined) {
				startIndex = options[0];
			} else {
				//If you're adding a new element (options[0] == undefined), only update that element
				startIndex = endIndex;
			}
		}
		
		for (var i = Math.min(startIndex, endIndex); i <= Math.max(startIndex, endIndex); i++) {
			this.items.at(i).get('formView').defaultValueChanged();
		}
		
		this.refresh();
	},
	
	addItem : function(event) {
		var conceptId = $(event.srcElement).parents("tr").attr('conceptId');
		var item = this.items.get(conceptId);
		
		//get the index of the last ranked item
		var lastValue = this.items.indexOfLastSetValue();
		
		//make sure everything hasn't been ranked... this shouldn't ever really be an issue
		if (lastValue < this.items.length - 1) {
			this.items.setRank(conceptId, lastValue+1);
		}
	},
	
	deleteItem : function(item) {
		var conceptId = $(event.srcElement).parents("tr").attr('conceptId');
		
		this.items.setRank(conceptId, undefined);
	},
	
	moveDown : function(item) {
		var conceptId = $(event.srcElement).parents("tr").attr('conceptId');
		var oldRank = this.items.getRank(conceptId);
		
		this.items.setRank(conceptId, Math.min(oldRank + 1, this.items.length - 1));
	},
	
	moveUp : function(item) {
		var conceptId = $(event.srcElement).parents("tr").attr('conceptId');
		var oldRank = this.items.getRank(conceptId);
		
		this.items.setRank(conceptId, Math.max(oldRank - 1, 0));
	}
});

RankingItemView = FormItemView.extend({ 
	template : _.template($("#tmpl-rankingitemview").html()),
	
	render : function() {
		this.renderDefault();
		this.$el.hide();
	},
	
	getValue : function() {
		var value = this.options.parent.items.getRank(this.model.get('conceptId'));
		if (value == undefined || value < 0) {
			return undefined;
		} else {
			return value + 1;
		}
	}, 
	
	setValue : function(value) {
		if (value == undefined || value == "") {
			value = 0;
		}
		this.options.parent.items.setRank(this.model.get('conceptId'), value - 1);
	}
});

GPSAcquireView = FormItemView.extend({
	template : _.template($("#tmpl-gpsacquireview").html()),
	
	events : {
		"click a[action='gpsacquire']" : "acquireGPS"
	},
	
	initialize2 : function() {
		this.acquireGPS();
	},
	
	render : function() {
		this.renderDefault();
	},
	
	acquireGPS : function() {
		var _this = this;
		navigator.geolocation.getCurrentPosition(
				function(position) {
					_this.acquireSuccess(position);
				},
				function() {
					_this.acquireFail(error);
				},
				{ maximumAge: (5 * 60 * 1000), //OK within 5 minutes
					timeout: (5 * 60 * 1000), //Give it 5 minutes
					enableHighAccuracy: true }
				);
	},
	
	acquireSuccess : function(position) {
		this.value = position;
		this.defaultValueChanged();
	},
	
	acquireFail : function(error) {
		this.value = error;
		this.defaultValueChanged();
	},
	
	getValue : function() {
		return JSON.stringify(this.value);
	},
	
	setValue : function(val) {
		try {
			this.value = JSON.parse(val);
		} catch (err) {
			this.value = undefined;
		}
		
		this.render();
	}
});

HTMLView = FormItemView.extend({
	hasValue : false,
	
	template : _.template($("#tmpl-html").html()),
	
	events : {
	},
	
	render : function() {
		this.renderDefault();
	},
	
	getValue : function() {
		return undefined;
	},
	
	setValue : function(val) {
	}
});

SubmitPageView = FormItemView.extend({
	hasValue : false,
	
	template : _.template($("#tmpl-submitpage2").html()),
	
	initialize2 : function() {
		this.listenTo(this.$el.parents("div:form-page").pageView(), 'pagebeforeshow', this.renderBeforeShow);
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

});


