FormService = {
	views : [],	
	
	viewValueChange : function(sourceView) {
		var conceptId = sourceView.model.get('conceptId');
		var value = sourceView.getValue();
		//console.log('FormService registered viewValueChange: ' + conceptId + ' - Value = ' + value);
		ObsService.setObs(conceptId, value);
		this.model.defaultValue = value;
	},

	
	registerView : function(view) {
		//console.log('register view ' + view.id);
		
		this.views.push(view);
		this.addListeners(view);
		
		var conceptId = view.model.get('conceptId');
		var value = ObsService.getObs(conceptId);
		
		if (value) {
			view.setValue(value);
		}
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
				if(EvaluationService.executeObsCondition(hideIf)) {
					view.hide();
				} else {
					view.show();
				}
			});
		}
		
		var showIf = view.model.get('showIf');
		if (showIf && showIf.condition) {
			view.listenTo(obsList, "initialize changeObsValue:" + showIf.conceptIds.join(" changeObsValue:"), function(model, value, options) {
				if(EvaluationService.executeObsCondition(showIf)) {
					view.show();
				} else {
					view.hide();
				}
			});
		}
	},
	
	submit : function(complete) {
		var encounterToSave = {};
		if (encounter) {
			encounterToSave = encounter;
			encounterToSave.obs = undefined;
		}
		encounterToSave.obs = obsList.toJSON();
		encounterToSave.lastSaved = new Date().getTime();
		encounterToSave.formName = Form.get('name');
		encounterToSave.formNameReadable = Form.get('nameReadable');
		encounterToSave.descriptors = [];
		var descriptors = Form.get('descriptors');
		if (descriptors && descriptors.length > 0) {
			for (var i = 0; i < descriptors.length; i++) {
				var generatedDescriptor = {label : descriptors[i].label, conceptId : descriptors[i].conceptId, value : ObsService.getObs(descriptors[i].conceptId)};
				encounterToSave.descriptors.push(generatedDescriptor);
			}
		}
		
//		var encounterToSave = {obs : obsList.toJSON(), lastSaved : new Date().getTime(), formName : Form.get('name'), formNameReadable : Form.get('nameReadable')};
		cordova.exec(this.submitSuccessCallback, this.submitFailCallback, "MSF", "submit", [encounterToSave]);
	},
	
	submitSuccessCallback : function(args) {
		document.location.href = "home.html";
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
		//console.log('get obs ' + conceptId);
		return obsList.getValue(conceptId);
	}
};

PageService = {
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
		if (pageIndex >= this.pageModels.length) {
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
				//console.log('KEY = ' + model.conceptId + ' VALUE = ' + model.value);
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
		compileObsCondition : function(obsEvalSerialized) {
			var func = new Function(obsEvalSerialized.conceptIds, 'return ' + obsEvalSerialized.condition + ';');
			obsEvalSerialized.compiledCondition = func;
			
			return func;
		},
		
		executeObsCondition : function(obsEvalSerialized) {	
			var conceptIdValues = [];
			for (var i = 0; i < obsEvalSerialized.conceptIds.length; i++) {
				conceptIdValues[i] = ObsService.getObs(obsEvalSerialized.conceptIds[i]);
			}
			
			if (!obsEvalSerialized.compiledFunction) {
				//compile
				EvaluationService.compileObsCondition(obsEvalSerialized);
			}
			
			return obsEvalSerialized.compiledCondition.apply(obsEvalSerialized, conceptIdValues);
		},
		
		compileViewCondition : function(viewEvalSerialized, view) {
			var paramNames = ['view', 'value'];
			if (viewEvalSerialized.conceptIds) {
				paramNames = paramNames.concat(viewEvalSerialized.conceptIds);
			}
			
			var func = new Function(paramNames, 'return ' + viewEvalSerialized.condition + ';');
			viewEvalSerialized.compiledCondition = func;
			
			return func;
		},
		
		executeViewCondition : function(viewEvalSerialized, view) {	
			var paramValues = [view, view.getValue()];
			
			if(viewEvalSerialized.conceptIds) {
				for (var i = 0; i < viewEvalSerialized.conceptIds.length; i++) {
					paramValues.push(ObsService.getObs(viewEvalSerialized.conceptIds[i]));
				}
			}
			
			if (!viewEvalSerialized.compiledFunction) {
				//compile
				EvaluationService.compileViewCondition(viewEvalSerialized, view);
			}
			
			return viewEvalSerialized.compiledCondition.apply(viewEvalSerialized, paramValues);
		},
};