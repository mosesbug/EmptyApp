Template.createClass.events({
	 "click .js-create": function(event){
	 	event.preventDefault();
	 	console.log("worked");
		const className = $(".js-className").val();
		const collegeUniversity = $(".js-collegeUniversity").val();
		const language = $(".js-language").val();
		const description = $(".js-description").val();

		const instructor = Meteor.users.findOne({'_id': Meteor.userId()});
		const instructorFirst = instructor.profile.firstName;
		const instructorLast = instructor.profile.lastName;

		if (className == "" || collegeUniversity == "" || language == "" || description == "") {
			window.alert("Uh oh, one or more fields are empty!")
		} else {

			const course = {className:className, collegeUniversity:collegeUniversity, language:language, description:description, instructorFirst:instructorFirst, instructorLast:instructorLast, instructor:instructor};

			console.dir(course);

			if(Courses.findOne({className: className })) {
				console.log("the class is already existed");
				throw new UserException("Invalid");
			}

			Courses.insert(course);

			var theCourseObject = Courses.findOne({className: className,
																	 collegeUniversity:collegeUniversity,
																	 language:language,
																	 description:description,
																	 instructorFirst:instructorFirst,
																	 instructorLast:instructorLast,
																	 instructor:instructor
		});


			var numClasses = Meteor.user().profile.classes.length;






		Meteor.users.update(Meteor.userId(), {$push: {'profile.classes': theCourseObject._id }});

		console.log("created a class successfully");





		Router.go("/coursePage/"+this._id);





			Router.go( "/courses");

		}
	},
})


// "click .js-join": function(event){
// 	event.preventDefault();
// 	console.log(this._id);
//
//
// 		var numClasses = Meteor.user().profile.classes.length;
// 		for(i = 0; i < numClasses; i++) {
// 			if(Meteor.user().profile.classes[i]===this._id) {
// 				console.log("you've already added the class")
// 				Router.go("/coursePage/"+this._id);
// 				throw new UserException("Invalid");
//
// 			}
//
// 		}
//
//
// 	Meteor.users.update(Meteor.userId(), {$push: {"profile.classes": this._id }});
//
// 	console.log("created a class successfully");
//
//
//
//
//
// 	Router.go("/coursePage/"+this._id);
