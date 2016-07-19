Template.courses.helpers({
	courses:function(){
		console.log("worked");
		return Courses.find();
	},
})

Template.showcourse.helpers({
	course:function(){
		console.log("in comments");
		console.log(this);
		return Courses.find({className: this.className});
	}
})

Template.showcourse.events({
	"click .js-join": function(event){
		event.preventDefault();
	 	console.log("worked");

	 	
	 	//this is where you add class object to user profile class field
	 	// Meteor.user().profile.classes += class;

	 	Router.go("/coursePage/"+this._id);


	}
})