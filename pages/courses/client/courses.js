Template.courses.helpers({
	courses:function(){
		return Courses.find({},{sort:{className:1}});
	},
})

Template.showcourse.helpers({
	course:function(){
		return Courses.find({className: this.className});
	},

	checkMyCourse: function(){
		var numOfClass = Meteor.user().profile.classes.length;
		for(i=0; i<numOfClass; i++) {

		if(Meteor.user() && Meteor.user().profile.classes[i]._id=== this._id ) {
			return true;
		}

	}

		return false;

	},

	checkStudentCourse: function(){
		var numOfClass = Meteor.user().profile.classes.length;
		for(i=0; i<numOfClass; i++) {

		if(Meteor.user() && Meteor.user().profile.classes[i]._id=== this._id ) {
			return true;
		}

	}

		return false;

	},
})

Template.showcourse.events({
	"click .js-join": function(event){
		event.preventDefault();

			var numClasses = Meteor.user().profile.classes.length;
			for(i = 0; i < numClasses; i++) {
				if(Meteor.user().profile.classes[i]._id===this._id) {
					console.log("you've already added the class")
					Router.go("/coursePage/"+this._id);
					throw new UserException("Invalid");

				}

			}


		Meteor.users.update(Meteor.userId(), {$push: {"profile.classes": this }});

		console.log("updated successfully");





	 	Router.go("/coursePage/"+this._id);


	},

	"click #js-remove": function(event){
		event.preventDefault();
		console.log("Clicked the remove button");

		if(Meteor.user() && Meteor.userId() === this.instructor._id ) {
			
			var r = confirm("You are about to delete this course. Are you sure?");
			if (r == true) {
				x = "You pressed OK!";
				Courses.remove({_id: this._id});
				Router.go("/courses");
			} else {
				x = "You pressed Cancel!";
			}
		
		} else {
			console.log("you don't have access to delete this class");
			window.alert("You don't have access to delete this class.");
		}



	}

})
