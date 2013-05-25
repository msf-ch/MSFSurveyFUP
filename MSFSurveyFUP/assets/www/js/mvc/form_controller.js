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
		if (hideIf.condition) {
			view.listenTo(obsList, "initialize changeObsValue:" + hideIf.conceptIds.join(" changeObsValue:"), function(model, value, options) {
				if(ObsService.evaluateConditionSting(hideIf.conceptIds, hideIf.condition)) {
					view.hide();
				} else {
					view.show();
				}
			});
		}
		
		var showIf = view.model.get('showIf');
		if (showIf.condition) {
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
		var script = "";
		for (var i = 0; i < conceptIds.length; i++) {
			script += "var " + conceptIds[i] + "=\"" + this.getObs(conceptIds[i]) + "\";";
		}
		script += "(" + string + ");";
		
		return eval(script);
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


RadioGroupService = {
	// Generic method for showing/hidding an item by given the name and showFlag
	showItem : function(name, showFlag) {
		item = ViewIdService.getViewId(name);
		if (item != undefined) {
			if (showFlag)
				item.show();
			else
				item.hide();
		}
	},
		
//	/*This is for page 2: show/hide the checkbox group depending the value of the Vaccination radio selected */
//	showVaccinesCheckboxGroup : function(showFlag) {
//        this.showItem("vacpolio", showFlag);    		        	   
//        this.showItem("vacrouge", showFlag);    		        	   
//        this.showItem("vacpenta", showFlag);    		        	   
//        this.showItem("vacautre", showFlag);    		        	   
//        this.showItem("vaccinesCheckbox", showFlag);    		        	   
//	},
//
//	/*This is for page 2: show/hide the checkbox group depending the value of the Reaction radio selected */
//	showReactionsCheckboxGroup : function(showFlag) {
//        this.showItem("ppddiarr", showFlag);    		        	   
//        this.showItem("ppdvomis", showFlag);    		        	   
//        this.showItem("ppdrash", showFlag);    		        	   
//        this.showItem("ppdautre", showFlag);    		        	   
//        this.showItem("ppdautreprecise", showFlag);    		        	   
//        this.showItem("reactionsCheckbox", showFlag);    		        	   
//		
//		for (var i = 0; i < obsList.length; i++) {
//			var model = obsList.at(i).attributes;
//			if (model.conceptId == "ppdautre") {
//				if (model.value == true) {
//					this.showItem("ppdautre", showFlag);
//					break;
//				}
//			}
//		}
//	},
//	
//	/*This is for page 3: show/hide the checkbox group depending the value of the Symptomes radio selected */
//	showSymptomesCheckboxGroup : function(showFlag) {
//        this.showItem("fievre", showFlag);    		        	   
//        this.showItem("toux", showFlag);    
//        this.showItem("diarhe", showFlag);    		        	   
//        this.showItem("convuls", showFlag);    
//        this.showItem("poidpert", showFlag);    		        	   
//        this.showItem("abdom", showFlag);    
//        this.showItem("vomis", showFlag);    		        	   
//        this.showItem("respir", showFlag);    
//        this.showItem("urine", showFlag);    		        	   
//        this.showItem("cephal", showFlag);    
//        
//        this.showItem("constip", showFlag);    		        	   
//        this.showItem("oreill", showFlag);    
//        this.showItem("yeux", showFlag);    		        	   
//        this.showItem("appet", showFlag);    
//        this.showItem("brulur", showFlag);    		        	   
//        this.showItem("sang", showFlag);    
//        this.showItem("trauma", showFlag);    		        	   
//        this.showItem("gorge", showFlag);    
//        this.showItem("nonspec", showFlag);    		        	   
//        this.showItem("autre1", showFlag);    
//        this.showItem("autre1precise", showFlag);    		        	   
//        this.showItem("autre2", showFlag);    
//        this.showItem("autre2precise", showFlag);    
//        this.showItem("vacautre", showFlag);    
//        
//        this.showItem("eptemps", showFlag);    		        	   
//        this.showItem("epsoin", showFlag);  
//        this.showItem("symptomesCheckbox", showFlag);  
//	},
//	
//	/*This is for page 3: show/hide the checkbox group depending the value of the Reaction radio selected */
//	showReasonCheckboxGroup : function(showFlag) {
//        this.showItem("nofin", showFlag);    		        	   
//        this.showItem("notransp", showFlag);    
//        this.showItem("notgve", showFlag);    		        	   
//        this.showItem("notime", showFlag);    
//        this.showItem("nocdsl", showFlag);    		        	   
//        this.showItem("nosecur", showFlag);    
//        this.showItem("nomgve", showFlag);    		        	   
//        this.showItem("noautre", showFlag);    
//        this.showItem("noautreprecise", showFlag); 
//        this.showItem("reasonCheckbox", showFlag);  
//	},
//
//	/*This is for page 3: show/hide the checkbox group depending the value of the What Done radio selected */
//	showWhatDoneCheckboxGroup : function(showFlag) {
//        this.showItem("reccds", showFlag);    		        	   
//        this.showItem("rechop", showFlag);    
//        this.showItem("recmed", showFlag);    		        	   
//        this.showItem("recagcom", showFlag);    
//        this.showItem("recparmd", showFlag);    		        	   
//        this.showItem("recmedma", showFlag);    
//        this.showItem("recachmt", showFlag);    		        	   
//        this.showItem("recgueri", showFlag);    
//        this.showItem("recmarab", showFlag);    		        	   
//        this.showItem("recatrad", showFlag);    
//        this.showItem("rechoco", showFlag);    		        	   
//        this.showItem("recautre", showFlag);    
//        this.showItem("recautreprecise", showFlag);
//        this.showItem("whatdoneCheckbox", showFlag);  
//	},
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
//		RadioGroupService.showVaccinesCheckboxGroup(false);
//		RadioGroupService.showReactionsCheckboxGroup(false);
//		
//		RadioGroupService.showSymptomesCheckboxGroup(false);
//		RadioGroupService.showReasonCheckboxGroup(false);
//		RadioGroupService.showWhatDoneCheckboxGroup(false);
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
		
		var ttt = pageModel.attributes.content.toJSON()
				
		if (this.activeIndex == 0) {
			for(var i = 0; i < obsList.length; i++) {
				var model = obsList.at(i).attributes;
				console.log('KEY = ' + model.conceptId + ' VALUE = ' + model.value);
			}
		}
		this.setActivePageIndex(this.activeIndex + 1);
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