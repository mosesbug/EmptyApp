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
		return Assignments.find({"metadata.course": this._id});
	},

	// submitted: function () {
	// 	var x = 5; //Submissions.find({"ownerId": Meteor.userId(), "assignment": this._id});
	// 	var y = Submissions.find({"metadata.ownerId": Meteor.userId(), "metadata.assignment": this._id});

	// 	// Meteor.users.findOne({'_id': Meteor.userId()});
	// 	console.dir("hey");
	// 	console.log(y);


	// 	if (y) {
 //    		return true;
	// 	} else {
 //    		return false;
	// 	}

	// }
})

Template.coursePage.events({
	"click .js-create-assignment": function(event){

		Router.go("/createAssignment/"+this._id);

	},

		"click .js-remove": function(event){
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
