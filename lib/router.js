Router.configure({
	layoutTemplate: 'layout',
});

Router.route('/',{name:"home"});
Router.route('/login',{name:"login"});
Router.route('/signup',{name:"signup"});
Router.route('comments');
Router.route('items');
