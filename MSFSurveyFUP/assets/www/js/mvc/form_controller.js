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
		
		encounterToSave.complete = complete;
		
		cordova.exec(this.submitSuccessCallback, this.submitFailCallback, "MSF", "submit", [encounterToSave]);
	},
	
	saveIncomplete : function() {
		var popupvars = {headerText : "Save form",
		titleText : "Do you want to save this form and exit?",
		bodyHTML : "<p>Forms can be resumed later.</p>" +
				"<a href='#' data-role='button' data-inline='true' data-rel='back' data-theme='c'>Cancel</a>" +
				"<a id='saveButton' href='#' data-role='button' data-inline='true' data-theme='e'>Save</a>"};

		var popup = $(_.template($("#tmpl-genericpopup").html(), popupvars, {variable : "data"}));
		popup.find("#saveButton").on("click", function() {
			FormService.submit(false);
		});
		PageService.showPopup(popup);
	},
	
	submitSuccessCallback : function(args) {
		document.location.href = "home.html";
	},
	
	submitFailCallback : function(args) {
	},
	
	ready : function() {
		$(document).on("backbutton", this.backButtonPressed);
		$(window).on("beforeunload", function() {
			$(document).off("backbutton");
		});
		
		obsList.trigger('initialize');
		Form.trigger('ready');
	},
	
	backButtonPressed : function() {
		if (PageService.isFirstPageActive()) {
			var popupvars = {headerText : "Confirm form exit",
							titleText : "Are you sure you want to leave this form?",
							bodyHTML : "<p>All answers will be discarded.</p>" +
									"<a href='#' data-role='button' data-inline='true' data-rel='back' data-theme='c'>Cancel</a>" +
									"<a id='exitButton' href='#' data-role='button' data-inline='true' data-theme='e'>Exit</a>"};
			
			var popup = $(_.template($("#tmpl-genericpopup").html(), popupvars, {variable : "data"}));
			popup.find("#exitButton").on("click", function() {
				document.location.href = "home.html";
			});
			PageService.showPopup(popup);
		} else {
			PageService.prevPage();
		}
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

PageService = _.extend({
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
	
	getActivePageIndex : function() {
		return this.activeIndex;
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
	
	getActivePageModel : function() {
		return this.pageModels.at(this.getActivePageIndex());
	},
	
	getActivePageView : function() {
		return this.pageModels.at(this.getActivePageIndex()).pageView;
	},
	
	prevPage : function() {
		this.setActivePageIndex(this.activeIndex - 1);
	},
	
	nextPage : function(force) {
		var pageModel = this.pageModels.at(this.activeIndex);
				
		if (this.activeIndex == 0) {
			for(var i = 0; i < obsList.length; i++) {
				var model = obsList.at(i).attributes;
			}
		}
		
		if (Form.getGlobalVariable('validation', 'validateOnNextPage') && !force) {
			var errors = pageModel.pageView.validate();
			if (errors && errors.length > 0) {
				return;
			}
		}
		
		this.setActivePageIndex(this.activeIndex + 1);
	},
	
	getPageFromElement : function(element) {
		var model;
		for(var i = 0; i < this.pageModels.length; i++) {
			model = this.pageModels.at(i);
			if (model.pageView.el == element) {
				return model.pageView;
			}
		}
	},
	
	isFirstPageActive : function() {
		return this.getActivePageIndex() == 0;
	},
	
	isLastPageActive : function() {
		return this.getActivePageIndex() == pageModels.length - 1;
	},
	
	showPopup : function(element, options) {
		var popup = this.getActivePageView().$el.children(".ui-popup-container").children(":jqmData(role='popup')");
		popup.html('').append(element);
		
		popup.trigger('create').popup('open', options);
		return popup;
	},
	
	hidePopup : function() {
		var popup = this.getActivePageView().$el.children(".ui-popup-container").children(":jqmData(role='popup')");
		
		popup.popup('close');
		return popup;
	}
}, Backbone.Events);

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