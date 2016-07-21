
Courses = new Meteor.Collection("courses");

MyCourses = new Meteor.Collection("myCourses");

Languages = new Meteor.Collection("languages");

Schools = new Meteor.Collection("schools");







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

Assignments= new FS.Collection('assignments',{
	stores: [
	new FS.Store.FileSystem('assignments', {path: "~/uploads"})
	],
	
});

Assignments.allow({
	insert: function(){
		return true;

	},

	remove: function(){
		return true;
	},


});
