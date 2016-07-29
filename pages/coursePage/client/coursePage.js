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

		numSubmitted: function(aId){
			const numSubmitted = Submissions.find({"metadata.assignment":aId}).count();
			return numSubmitted;
		},

		lookupMySubmission: function(aId){
			const metadata = {"metadata.assignment":aId,"metadata.ownerId":Meteor.userId()};
			console.dir(metadata);
			const mySubmission = Submissions.findOne(metadata);
			console.dir(mySubmission); console.log("is my submission");
			return mySubmission._id;
		},

	assignments: function(){
		return Assignments.find({"metadata.course": this._id});
	},

	submitted: function (assignment) {
	// 	var x = 5; //Submissions.find({"ownerId": Meteor.userId(), "assignment": this._id});
	    console.log("submitted fn with assignment = "); console.dir( assignment);
	 	var y= Submissions.findOne({"metadata.ownerId": Meteor.userId(), "metadata.assignment": assignment._id });
		console.dir(y);
	// 	// Meteor.users.findOne({'_id': Meteor.userId()});
	// 	console.dir("hey");
		//console.log(y);


	 	if (y!=null) {
    		return true;
	 	} else {
   		return false;
	 	}

	 }
})

Template.coursePage.events({

	// ******* CREATE FUNCTION

	"click .js-create-assignment": function(event){

		Router.go("/createAssignment/"+this._id);

	},
// ******* REMOVE FUNCTION
		"click .js-remove": function(event){
		event.preventDefault();
		console.log("Clicked the remove button");

		if(Meteor.user() && Meteor.userId() === this.instructor._id ) {

			var r = confirm("You are about to delete this course. Are you sure?");
			if (r == true) {
				x = "You pressed OK!";
				var a = Meteor.users.find().fetch();

				for (var i = a.length - 1; i >= 0; i--) {
				 	var array = a[i].profile.classes;
				 	var array2 = [];
				 	array2.length = array.length;
				 	for (var j = array2.length - 1; j >= 0; j--) {
				 		array2[j]=array[j]._id;
				 	}
				 	var index = array2.indexOf(this._id);
				 	console.log(index);
				 	/*var array1 = array.slice(0, index);
				 	if (index < array.length -1) {
				 		var array2 = array.slice(index + 1, array.length)
					} else {
						var array2 = [];
					}
					array = array1.concat(array2);*/
					array.splice(index, 1)
				 	Meteor.users.update(a[i]._id, {$set: {"profile.classes": array}});
					console.log(a[i].profile.classes)
				}
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
