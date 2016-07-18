Template.courses.helpers({
	courses:function(){
		console.log("worked");
		return Courses.find();
	},
})