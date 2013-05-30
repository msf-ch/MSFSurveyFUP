FormService = {
	views : [],	
	
	viewValueChange : function(sourceView) {
		var conceptId = sourceView.model.get('conceptId');
		var value = sourceView.getValue();
		console.log('FormService registered viewValueChange: ' + conceptId + ' - Value = ' + value);
		ObsService.setObs(conceptId, value);
		this.model.defaultValue = value;
	},

	
	registerView : function(view) {
		console.log('register view ' + view.id);
		
		this.views.push(view);
		this.addListeners(view);
		
		var conceptId = view.model.get('conceptId');
		ViewIdService.setViewId(conceptId, view.$el);
	},
	
	unregisterView : function(view) {
		view.off('viewValueChange');
		
		var index = this.views.indexOf(view);
		this.views.splice(index, 1);
	},
	
	addListeners : function(view) {
		view.on('viewValueChange', FormService.viewValueChange);

		var hideIf = view.model.get('hideIf');
		if (hideIf && hideIf.condition) {
			view.listenTo(obsList, "initialize changeObsValue:" + hideIf.conceptIds.join(" changeObsValue:"), function(model, value, options) {
				if(ObsService.evaluateConditionSting(hideIf.conceptIds, hideIf.condition)) {
					view.hide();
				} else {
					view.show();
				}
			});
		}
		
		var showIf = view.model.get('showIf');
		if (showIf && showIf.condition) {
			view.listenTo(obsList, "initialize changeObsValue:" + showIf.conceptIds.join(" changeObsValue:"), function(model, value, options) {
				if(ObsService.evaluateConditionSting(showIf.conceptIds, showIf.condition)) {
					view.show();
				} else {
					view.hide();
				}
			});
		}
	},
	
	submit : function() {
		var obs = obsList.toJSON();
		
		cordova.exec(this.submitSuccessCallback, this.submitFailCallback, "MSF", "submit", [obs]);
	},
	
	submitSuccessCallback : function(args) {
	},
	
	submitFailCallback : function(args) {
	},
	
	ready : function() {
		obsList.trigger('initialize');
	}
};

ObsService = {
	setObs : function(conceptId, value) {
		console.log('set obs ' + conceptId + ' to ' + value);
		ret = obsList.setValue(conceptId, value);
		return ret;
	},

	getObs : function(conceptId) {
		console.log('get obs ' + conceptId);
		return obsList.getValue(conceptId);
	},
	
	evaluateConditionSting : function(conceptIds, string) {
		var args = [];
		for (var i = 0; i < conceptIds.length; i++) {
			args[i] = ObsService.getObs(conceptIds[i]);
		}
		var func = new Function(conceptIds, 'return ' + string + ';');
		
		return func.apply(func, args);
	}
};

ViewIdService = {
		setViewId : function(conceptId, ele) {
			return viewidList.setValue(conceptId, ele);
		},

		getViewId : function(conceptId) {
			return viewidList.getValue(conceptId);
		}
	};

var PageService = {
	pageModels : undefined,
	activeIndex : -1,
	
	setPageModels : function(pages) {
		if (!this.pageModels) {
			this.pageModels = new Backbone.Collection(pages, {
				model : PageModel
			});
		} else {
			this.pageModels.reset(pages);
		}
	},
	
	renderPages : function() {
		this.pageModels.each(function(page) {
			page.generatePageView();
		});
	},
	
	setActivePageIndex : function(pageIndex) {
		if (pageIndex + 1 > this.pageModels.length) {
			alert('PageIndex exceeds number of pages!');
			return;
		}

		if (pageIndex < 0) {
			alert('PageIndex cannot be less than 0!');
			return;
		}

		this.activeIndex = pageIndex;
		
		var pageModel = this.pageModels.at(pageIndex);
		var pageView = pageModel.pageView;
		
		$.mobile.changePage(pageView.$el);
	},
	
	prevPage : function(force) {
		if (!force) {
			//check that all requirements are met
		}
		this.setActivePageIndex(this.activeIndex - 1);
	},
	
	nextPage : function(force) {
		if (!force) {
			//check that all requirements are met
		}
		var pageModel = this.pageModels.at(this.activeIndex);
				
		if (this.activeIndex == 0) {
			for(var i = 0; i < obsList.length; i++) {
				var model = obsList.at(i).attributes;
				console.log('KEY = ' + model.conceptId + ' VALUE = ' + model.value);
			}
		}
		
		var errors = pageModel.pageView.validate();
		if (!errors || errors.length == 0) {
			this.setActivePageIndex(this.activeIndex + 1);
		}
	},
	
	getActivePageIndex : function() {
		return this.activeIndex;
	},
	
	getPageFromElement : function(element) {
		var model;
		for(var i = 0; i < this.pageModels.length; i++) {
			model = this.pageModels.at(i);
			if (model.pageView.el == element) {
				return model.pageView;
			}
		}
	}
};

EvaluationService = {
		compileObsEvalFunction : function(obsEvalSerialized) {
			var func = new Function(conceptIds, 'return ' + string + ';');
			func.serialized = obsEvalSerialized;
			
			return func;
		},
		
		executeObsEvalFunction : function(obsEvalFunction) {
			var args = [];
			for (var i = 0; i < conceptIds.length; i++) {
				args[i] = ObsService.getObs(conceptIds[i]);
			}
			return obsEvalFunction.apply(obsEvalFunction, args);
		}
};