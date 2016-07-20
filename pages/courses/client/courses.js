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
		console.log(this._id);

		var numClasses = Meteor.user().profile.classes.length
		for(i = 0; i < numClasses; i++) {
			if(Meteor.user().profile.classes[i]===this._id) {
				console.log("you've already added the class")
				throw new UserException("Invalid");

			}

		}


		Meteor.users.update(Meteor.userId(), {$push: {"profile.classes": this._id }});

		console.log("updated successfully");





		Router.go("/coursePage/"+this._id);


	},

	"click #js-remove": function(event){
		event.preventDefault();
		console.log("Clicked the remove button");

		var r = confirm("Are you sure you would like to delete this class?");
		if (r == true) {
			if(Meteor.user() && Meteor.userId() === this.instructor._id ) {
				Courses.remove({_id: this._id});
				Router.go("/courses");
			} else {
				window.alert("You don't have access to delete this class");
				console.log("you don't have access to delete this class");
			}
		} 


		// if(Meteor.user() && Meteor.userId() === this.instructor._id ) {

		// 	var r = confirm("Are you sure you would like to delete this class?");
		// 	if (r == true) {
		// 		Courses.remove({_id: this._id});
		// 		Router.go("/courses");
		// 		x = "Class deleted.";
		// 	} else {
		// 		x = "Class NOT removed.";
		// 	}

		// } else {
		// 	window.alert("you don't have access to delete this class");
		// 	console.log("you don't have access to delete this class");
		// }



	}

})
