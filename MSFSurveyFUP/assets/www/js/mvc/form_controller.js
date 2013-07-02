FormApp.once('registerServices', function() {
FormService = _.extend({
	views : [],
	
	initialize : function() {
		FormService.listenTo(FormApp, 'backbutton', FormService.backButtonPressed);
	},
	
	viewValueChange : function(sourceView) {
		var conceptId = sourceView.model.get('conceptId');
		var value = sourceView.getValue();
		//console.log('FormService registered viewValueChange: ' + conceptId + ' - Value = ' + value);
		ObsService.setObs(conceptId, value);
	},

	
	registerView : function(view) {
		//console.log('register view ' + view.id);
		
		this.views.push(view);
		this.addListeners(view);
		
		var conceptId = view.model.get('conceptId');
		if (conceptId && view.hasValue) {
			var value = ObsService.getObs(conceptId);
			
			if (value) {
				view.setValue(value);
			}
		}
	},
	
	unregisterView : function(view) {
		view.off('viewValueChange');
		
		var index = this.views.indexOf(view);
		this.views.splice(index, 1);
	},
	
	addListeners : function(view) {
		if(view.hasValue) {
			view.on('viewValueChange', FormService.viewValueChange);
		}

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
		encounterToSave.pageIndex = PageService.getActivePageIndex();
		
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
		var popupvars = {headerText : "Confirmation de sauvegarde de formulaire",
		titleText : "Voulez-vous sauvegarder le formulaire et quitter?",
		bodyHTML : "<p>Les formulaires peuvent être modifiés ultérieurement.</p>" +
				"<a href='#' data-role='button' data-inline='true' data-rel='back' data-theme='c'>Annuler</a>" +
				"<a id='saveButton' href='#' data-role='button' data-inline='true' data-theme='e' style='float:right;'>Sauver</a>"};

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
	},
	
	backButtonPressed : function() {
		if (PageService.isFirstPageActive()) {
			var popupvars = {headerText : "Confirmation de sortie de formulaire",
							titleText : "Etes vous sûr de vouloir quitter ce formulaire?",
							bodyHTML : "<p>Toutes les réponses seront effacées.</p>" +
									"<a href='#' data-role='button' data-inline='true' data-rel='back' data-theme='c'>Annuler</a>" +
									"<a id='exitButton' href='#' data-role='button' data-inline='true' data-theme='e' style='float:right;'>Sortie</a>"};
			
			var popup = $(_.template($("#tmpl-genericpopup").html(), popupvars, {variable : "data"}));
			popup.find("#exitButton").on("click", function() {
				document.location.href = "home.html";
			});
			PageService.showPopup(popup);
		} else {
			PageService.prevPage();
		}
	}
}, Backbone.Events);
FormApp.registerService('FormService', FormService);

ObsService = _.extend({
	setObs : function(conceptId, value) {
		console.log('set obs ' + conceptId + ' to ' + value);
		ret = obsList.setValue(conceptId, value);
		return ret;
	},

	getObs : function(conceptId) {
		//console.log('get obs ' + conceptId);
		return obsList.getValue(conceptId);
	},
	
	initializeValues : function() {
		obsList.trigger('initialize');
	}
}, Backbone.Events);
FormApp.registerService('ObsService', ObsService);

PageService = _.extend({
	pageModels : undefined,
	activeIndex : -1,
	
	initialize : function() {
		this.on('pageshow', this.updatePageIndex);
	},
	
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
	
	setActivePageIndex : function(pageIndex, options) {
		if (pageIndex >= this.pageModels.length) {
			alert('PageIndex exceeds number of pages!');
			return;
		}

		if (pageIndex < 0) {
			alert('PageIndex cannot be less than 0!');
			return;
		}
		
		var pageModel = this.pageModels.at(pageIndex);
		var pageView = pageModel.pageView;
		
		$.mobile.changePage(pageView.$el, options);
	},
	
	getActivePageModel : function() {
		try {
			return this.pageModels.at(this.getActivePageIndex());
		} catch(err) {
			return undefined;
		}
	},
	
	getActivePageView : function() {
		try {
			return this.pageModels.at(this.getActivePageIndex()).pageView;
		} catch(err) {
			return undefined;
		}
	},
	
	prevPage : function() {
		this.setActivePageIndex(this.activeIndex - 1, {transition:"slide",reverse:true});
	},
	
	nextPage : function(force) {
		var pageView = this.pageModels.at(this.activeIndex).pageView;
		
		if (Form.getGlobalVariable('validation', 'validateOnNextPage') && !force) {
			var errors = ValidationService.validatePage(pageView);
			if (errors && errors.length > 0) {
				return;
			}
		}
		
		this.setActivePageIndex(this.activeIndex + 1, {transition:"slide",reverse:false});
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
	},
	
	getIndexOfPage : function(page) {		
		var pageModel;
		for (var i = 0; i < PageService.pageModels.length; i++) {
			pageModel = PageService.pageModels.at(i);
			if (pageModel && page == pageModel || (pageModel.pageView && (page == pageModel || pageModel.pageView.$el[0] == page[0]))) {
				return i;
			}
		}
		
		return -1;
	},
	
	updatePageIndex : function() {
		PageService.activeIndex = PageService.getIndexOfPage($.mobile.activePage);
	}
	
}, Backbone.Events);
FormApp.registerService('PageService', PageService);

EvaluationService = _.extend({
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
}, Backbone.Events);
FormApp.registerService('EvaluationService', EvaluationService);

ViewService = _.extend({
	viewClasses : new (Backbone.Collection.extend({
		model : Backbone.Model.extend({
			idAttribute: "viewClassName",
			defaults : {
				"viewClassName" : undefined,
				"constructor" : undefined, //this is the View object with which one makes individual views
				"validators" : []
			},
			initialize : function() {
				
			}
		})
	})),
	
	registerViewClass : function(viewClassName, viewConstructor, validators) {
		var processedViewConstructor = viewConstructor.extend({"className" : viewClassName});
		ViewService.viewClasses.add({"viewClassName" : viewClassName, "viewConstructor" : processedViewConstructor, "validators" : validators});
	},
	
	getViewClass : function(viewClassName) {
		return ViewService.viewClasses.get(viewClassName);
	}
}, Backbone.Events);
FormApp.registerService('ViewService', ViewService);

ValidationService = _.extend({
	validatePage : function(pageView) {
		var viewsWithErrors =[];
		var formViews = pageView.$el.find(".formview:not(.viewhidden, .viewhidden *)"); //don't include any hidden views!
		
		var view;
		var viewErrors;
		for (var i = 0; i < formViews.length; i++) {
			view = $(formViews[i]).itemView();
			viewErrors = ValidationService.validateView(view);
			if (viewErrors && viewErrors.length > 0) {
				viewsWithErrors.push({'view' : view, errors : viewErrors});
			}
		}
		
		if (viewsWithErrors.length > 0) {
			pageView.content.$el.find('.errorheader').remove();
			pageView.content.$el.prepend(_.template($("#tmpl-errorheader").html(), {'errors' : viewsWithErrors}));
			$.mobile.silentScroll(0);
		} else {
			pageView.content.$el.find('.errorheader').remove();
		}
		
		return viewsWithErrors;
	},

	validateView : function(view) {
		var validationErrors = [];
		
		var validators = ViewService.getViewClass(view.className).get('validators');
		for(var i = 0; i < validators.length; i++) {
			try {
				validationErrors = validationErrors.concat(validators[i](view));
			} catch(err) {
				if (view.model != undefined) {
					console.error("Error executing validator on view " + view.model.get('conceptId') + ":" + JSON.stringify(err));
				}
			}
		}
		
		view.error(validationErrors.length > 0, validationErrors);
		
		return validationErrors;
	},
	
	_standardBounds : function(view) {
		var errors = [];
		
		var bounds = view.model.get('bounds');
		var value = view.getValue();
		if (bounds && value !== undefined && value !== '') {
			var stringValue = value.toString();
			
			 if (bounds.maxValue != undefined && value > bounds.maxValue) {
				 errors.push("La VALEUR ne doit pas dépasse " + bounds.maxValue); //Answer VALUE must be less than or equal to 
			 }
			 if (bounds.minValue != undefined && value < bounds.minValue) {
				 errors.push("La VALEUR doit être d'au moins " + bounds.minValue); //Answer VALUE must be more than or equal to
			 }

			 if (bounds.maxLength != undefined && stringValue.length > bounds.maxLength) {
				 errors.push("La LONGUEUR de la réponse ne doit pas dépasser " + bounds.maxLength + " caractères."); //Answer LENGTH must be less than or equal to x characters
			 }
			 if (bounds.minLength != undefined && stringValue.length < bounds.minLength) {
				 errors.push("La LONGUEUR de la réponse doit être d'au moins " + bounds.minLength + " caractères."); //Answer LENGTH must be more than or equal to x characters
			 }

			 if (bounds.exactLength != undefined && stringValue.length != bounds.exactLength) {
				 errors.push("La LONGUEUR de la réponse doit être exactement " + bounds.exactLength + " characters."); //Answer LENGTH must be exactly x characters.
			 }
			 
			 if (bounds.precisionExact != undefined) {
				 if (isNaN(parseFloat(stringValue)) || !isFinite(stringValue)) {
					 errors.push("La réponse doit être un nombre");//NEEDSTRANSLATION
				 } else if (bounds.precisionExact == 0 && Math.floor(value) != value) {
					 //Nothing past the decimal place
					 errors.push("La réponse doit être un nombre entier");//NEEDSTRANSLATION
				 } else if (bounds.precisionExact > 0 && ((stringValue.indexOf(".") != stringValue.length - bounds.precisionExact - 1) || (stringValue.indexOf(".") < 0))) {
					 errors.push("La valeur doit avoir avoir " + bounds.precisionExact + " chiffres après la virgule."); //NEEDSTRANSLATION
				 }
			 }
		}
		
		return errors;
	}, 
	
	_standardRequired : function(view) {
		var value = view.getValue();
		var errors = [];
		
		if (view.model.get('required') && view.hasValue && (value === undefined || value === '')) {
			errors.push("La réponse à cette question est obligatoire."); //This field is required, please enter a value.
		}
		return errors;
	},
	
	_standardValidators : function(view) {
		var errors = [];
		
		var validators = view.model.get('validators');
		if (validators) {
			for (var i = 0; i < validators.length; i++) {
				if (!EvaluationService.executeViewCondition(validators[i], view)) {
					errors.push(validators[i].errorMessage);
				}
			}
		}
		return errors;
	},
	
	_checkboxgroupRequired : function(view) {
		var errors = [];
		
		if (view.model.get('checkboxgroupBounds')) {
			var checkboxgroupBounds = view.model.get('checkboxgroupBounds');
			var checkBoxes = view.$el.find("input");
			var checked = checkBoxes.filter(":checked");
			var unchecked = checkBoxes.not(":checked");
			
			if (checkboxgroupBounds.minSelections && checked.length < checkboxgroupBounds.minSelections) {
				errors.push("S'il vous plaît assurez un minimum de " + checkboxgroupBounds.minSelections + " sélections.");
			}
			
			if (checkboxgroupBounds.maxSelections && checked.length > checkboxgroupBounds.maxSelections) {
				errors.push("S'il vous plaît assurez un maximum de " + checkboxgroupBounds.maxSelections + " sélections.");
			}
		}
		
		
		return errors;
	},
	
	_rankingRequired : function(view) {
		var errors = [];

		if (view.model.get('rankingBounds')) {
			var rankingBounds = view.model.get('rankingBounds');
			var childrenModels = view.model.childrenModels;
			var numberOfValuesSet = 0;
			
			for (var i = 0; i < childrenModels.length; i++) {
				if (ObsService.getObs(childrenModels.at(i).get('conceptId'))) {
					numberOfValuesSet++;
				}
			}
			
			if (rankingBounds.minSelections && numberOfValuesSet < rankingBounds.minSelections) {
				errors.push("S'il vous plaît rang d'un minimum de " + rankingBounds.minSelections + " sélections.");
			}
			
			if (rankingBounds.maxSelections && numberOfValuesSet > rankingBounds.maxSelections) {
				errors.push("S'il vous plaît rang d'un maximum de " + rankingBounds.maxSelections + " sélections.");
			}
		}
		
		return errors;
	}
}, Backbone.Events);
FormApp.registerService('ValidationService', ValidationService);

UiService = _.extend({
	initialize : function() {
		$(window).on('resize', UiService.positionFooter);
		this.listenToOnce(PageService, 'pageshow', UiService.positionFooter);
	},
	
	positionFooter : function() {
		var page = PageService.getActivePageView();
		
		if (!page) {
			return;
		}
		
		var content = page.content.$el;
		
		var headerHeight = page.header.$el.outerHeight();
		var contentHeight = content.outerHeight();
		var footerHeight = page.footer.$el.outerHeight();

		var pageHeight = headerHeight + contentHeight + footerHeight;

		var contentMargin = content.outerHeight() - content.height();
		var targetContentHeight = window.innerHeight - headerHeight
				- footerHeight - contentMargin;
		
		$("[formpage=true] :jqmData(role='content')").css("min-height", targetContentHeight + "px");
	}
}, Backbone.Events);
FormApp.registerService('UiService', UiService);

});