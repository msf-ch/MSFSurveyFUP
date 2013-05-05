BodyView = Backbone.View.extend({
	events : {
		'pagebeforeshow' : 'pagebeforeshow'
	},
	
	pagebeforeshow : function(event) {
		var page = PageService.getPageFromElement(event.target);
		if (page) {
			page.beforeShow();
		}
	}
});

HeaderModel = Backbone.Model.extend({
	defaults : {
		theme : "b"
	}
});

ContentModel = Backbone.Model.extend({
	defaults : {
		theme : "c"
	},
	
	initialize : function(initValues, classParams) {
		this.set('views', new FormItemViewModelList(initValues.views));
	}
});

FooterModel = Backbone.Model.extend({
	defaults : {
		theme : "c",
		
		footerIconPosition : "top",
		
		footerButton1Text : "Previous",
		footerButton1Theme : "a",
		footerButton1Icon : "arrow-l",
		footerButton1Action : "prev",
		footerButton1Disabled : false,
		

		footerButton2Text : "Help",
		footerButton2Theme : "a",
		footerButton2Icon : "info",
		footerButton2Action : "help",
		footerButton2Disabled : false,
		

		footerButton3Text : "Next",
		footerButton3Theme : "a",
		footerButton3Icon : "arrow-r",
		footerButton3Action : "next",
		footerButton3Disabled : false
	}
});

PageModel = Backbone.Model.extend({
	defaults : {
		theme : "c",
		header : {},
		content : {},
		footer : {}
	},
	
	initialize : function(initValues, classParams) {
		this.set('header', new HeaderModel(initValues.header));
		this.set('content', new ContentModel(initValues.content));
		this.set('footer', new FooterModel(initValues.footer));
	},
	
	generatePageView : function() {
		var element = $("<div></div>").appendTo($("body"));
		this.pageView = new PageView({model : this, el : element});
	}
});

PageView = Backbone.View.extend({
	tagName: "div",
	
	events : {
	},
	
	initialize : function() {
		console.log("PageView initializing");
		this.model = this.options.model;
		
		this.template = $("#tmpl-page").html();
		this.duyhide = this.$el.find("duyhide");

		this.render();
		
		var i = 1;
	},
	
	render : function() {
		this.$el.html(_.template(this.template, {}, {variable : "data"}));
		this.$el.attr('data-role', 'page').attr('data-theme', this.model.get('theme'));
		
		this.header = new Header({el : this.$el.children(":jqmData(role='header')"), page : this, model : this.model.get('header')});
		this.content = new Content({el : this.$el.children(":jqmData(role='content')"), page : this, model : this.model.get('content')});
		this.footer = new Footer({el : this.$el.children(":jqmData(role='footer')"), page : this, model : this.model.get('footer')});
		
		this.header.render();
		this.content.render();
		this.footer.render();

		this.duyhide.hide();
		
		this.$el.page();
		
		
	},
	
	beforeShow : function() {
		this.footer.render();
		this.footer.$el.trigger('create');
	}
});

var Header = Backbone.View.extend({
	initialize : function() {
		console.log("Header initializing");
		this.model = this.options.model;
	},
	
	render : function() {
		this.$el.attr('data-theme', this.model.get('theme'));
		this.$el.html(_.template($("#tmpl-header").html(), this.model.toJSON(), {variable : "data"}));
	}
});

Content = Backbone.View.extend({
	initialize : function() {
		console.log("Content initializing");
		this.model = this.options.model;
		this.viewModels = new FormItemViewModelList([this.model.get('views')]);
	},
	
	render : function() {
		this.$el.attr('data-theme', this.model.get('theme'));
		this.renderModels(this.$el, this.model.get('views'));
	},
	
	renderModels : function(parentElement, modelList) {
		
		a = modelList;
		modelList.each(function(model) {
			model.generateView($("<div></div>").appendTo(parentElement));
		});
		dd = $(this.el).find("AFTER SHOW");
		dd.hide();
		var i = 1;
	}
});

Footer = Backbone.View.extend({
	initialize : function() {
		console.log("Footer initializing");
		this.model = this.options.model;
		
		this.render();
	},
	
	events: {
		"click" : "render",
		"click a[action='prev']" : "prev",
		"click a[action='help']" : "help",
		"click a[action='next']" : "next",
		"click a[action='submit']" : "submit"
	},
	
	render : function() {
		this.$el.attr('data-theme', this.model.get('theme'));
		
		this.$el.html(_.template($("#tmpl-footer").html(), this.model.toJSON(), {variable : "data"}));
		this.$el.children().navbar();
		
		if (this.model.get('footerButton1Disabled')) {
			this.disableButton($(this.$el.find("li > a")[0]));
		}
		
		if (this.model.get('footerButton2Disabled')) {
			this.disableButton($(this.$el.find("li > a")[1]));
		}
		
		if (this.model.get('footerButton3Disabled')) {
			this.disableButton($(this.$el.find("li > a")[2]));
		}
		
		//Disable prev if first page
		if (PageService.getActivePageIndex() == 0) {
			this.disableButton($(this.$el.find("li > a[action='prev']")));
		}
	},
	
	disableButton : function(button) {
		button.addClass('ui-disabled');
	},
	
	enableButton : function(button) {
		button.removeClass('ui-disabled');
	},
	
	isEnabled : function() {
		return !this.$el.is(".ui-disabled");
	},
	
	prev : function(e) {
		console.log('prev button pressed');
		if(this.isEnabled()) {
			PageService.prevPage();
		}
	},
	
	help : function(e) {
		console.log('help button pressed');
		if(this.isEnabled()) {
		}
	},
	
	next : function(e) {
		console.log('next button pressed');
		if(this.isEnabled()) {
			PageService.nextPage();
		}
	},
	
	submit : function(e) {
		console.log('submit button pressed');
		if(this.isEnabled()) {
		}
	}
});

