
Courses = new Meteor.Collection("courses");


Urls= new Meteor.Collection("urls");

Comments= new Meteor.Collection("comments");

Recordings= new FS.Collection('recordings',{
	stores: [
	new FS.Store.FileSystem('recordings', {path: "~/uploads"})
	],
	filter: {
		allow: {
			contentTypes: ['audio/*']
		}
	},
});

Recordings.allow({
	insert: function(){
		return true;

	},

	remove: function(){
		return true;
	},


});

Posts= new FS.Collection('posts',{
	stores: [
	new FS.Store.FileSystem('posts', {path: "~/uploads"})
	],
	
});

Posts.allow({
	insert: function(){
		return true;

	},

	remove: function(){
		return true;
	},


});
