require(['libs/text!header.html', 'libs/text!home.html', 'libs/text!footer.html', 'libs/text!about.html', 'libs/text!contact.html'], function (headerTpl, homeTpl, footerTpl, aboutTpl, contactTpl) {

	var skills = [
		'HTML',
		'CSS',
		'JavaScript',
		'Knockout',
		'Angular',
		'Backbone'
	]
	
	var ApplicationRouter = Backbone.Router.extend({
		routes: {
			"": "home",
			"about": 'about',
			'contact': 'contact'
		},
		initialize: function() {
			this.headerView = new HeaderView();
			this.headerView.render();
			this.footerView = new FooterView();
			this.footerView.render();
		},
		home: function() {
	        var model = {};
	        model.skills = skills;

			this.homeView = new HomeView(model);
			this.homeView.render();
		},
		about: function() {
			this.aboutView = new AboutView();
			this.aboutView.render();
		},

		contact: function() {
			this.contactView = new ContactView();
			this.contactView.render();
		}
	});

	HeaderView = Backbone.View.extend({
		el: "#header",
		templateFileName: "header.html",
		template: headerTpl,

		initialize: function() {
			// $.get(this.templateFileName, function(data){console.log(data);this.template=data});		
		},
		render: function() {
			$(this.el).html(_.template(this.template));
		}
	});

	FooterView = Backbone.View.extend({
		el: "#footer",
		template: footerTpl,

		events: {
			'click .about-us-link': 'goToAbout',
			'click .contact-link': 'goToContact',
			'click .home-link': 'goToHome'
		},

		render: function() {
			this.$el.html(_.template(this.template));
		},

		goToAbout: function(e) {
			e.preventDefault();
			app.navigate('about', true);
		},

		goToContact: function(e) {
			e.preventDefault();
			app.navigate('contact', true);
		},

		goToHome: function(e) {
			e.preventDefault();
			app.navigate('', true);
		}
	});

	HomeView = Backbone.View.extend({
		el: "#content",
		// template: "home.html",
		template: _.template(homeTpl),
		initialize: function(options) {
			this.model = options;
		},

		render: function() {
			$(this.el).html(this.template(this.model));
		},
	});

	AboutView = Backbone.View.extend({
		el: '#content',
		template: aboutTpl,
		render: function() {
			$(this.el).html(_.template(this.template));
		}
	});

	ContactView = Backbone.View.extend({
		el: '#content',
		template: contactTpl,
		render: function() {
			$(this.el).html(_.template(this.template));
		}
	});

	
	app = new ApplicationRouter();

	Backbone.history.start({
		pushState: true		
	});
});


