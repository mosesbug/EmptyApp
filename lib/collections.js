
Courses = new Meteor.Collection("courses");

MyCourses = new Meteor.Collection("myCourses");

Languages = new Meteor.Collection("languages");

Schools = new Meteor.Collection("schools");

Feedback = new Meteor.Collection("feedback");

Flashcards = new Meteor.Collection("flashcards");

FlashcardPairs = new Meteor.Collection("flashcardPairs");

Submissions= new Meteor.Collection("submissions");





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

Questions= new FS.Collection('questions',{
	stores: [
	new FS.Store.FileSystem('questions', {path: "~/uploads"})
	],
	
});

Questions.allow({
	insert: function(){
		return true;

	},

	remove: function(){
		return true;
	},


});

Answers= new FS.Collection('answers',{
	stores: [
	new FS.Store.FileSystem('answers', {path: "~/uploads"})
	],
	
});

Answers.allow({
	insert: function(){
		return true;

	},

	remove: function(){
		return true;
	},


});



