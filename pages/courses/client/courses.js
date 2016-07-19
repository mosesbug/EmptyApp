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

	 	Router.go("/coursePage/"+this._id);


	 	//this is where you add class object to user profile class field
	 	//Meteor.user().profile.c
	},

	"click #js-remove": function(event){
		event.preventDefault();
		console.log("Clicked the remove button");

		if(Meteor.user() && Meteor.userId() === this.instructor._id ) {
			Courses.remove({_id: this._id});
			Router.go("/courses");
		} else {
			console.log("you don't have access to delete this class");
		}



	}

})
