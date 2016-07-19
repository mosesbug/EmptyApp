// Template.coursePage.helpers({
// 	courses:function(){
// 		console.log("worked");
// 		return Courses.find();
// 	},
// })

Template.coursePage.helpers({
	//course:function(){
		//console.log("in comments");
		//console.log(this);
		//return Courses.find({className: this.className});
	//},

	assignments: function(){
		return Assignments.find();
	}
})

Template.coursePage.events({
	"click .js-create-assignment": function(event){
		Router.go('/createAssignment'+this._id);
	}
})
