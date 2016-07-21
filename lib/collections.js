
Courses = new Meteor.Collection("courses");

MyCourses = new Meteor.Collection("myCourses");







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

Submissions= new FS.Collection('submissions',{
	stores: [
	new FS.Store.FileSystem('submissions', {path: "~/uploads"})
	],
	
});

Submissions.allow({
	insert: function(){
		return true;

	},

	remove: function(){
		return true;
	},


});


