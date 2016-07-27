
Template.createClass.helpers({
	languages:function(){
		return Languages.find({},{sort:{name:1}});
	},

	schools:function(){
		return Schools.find({},{sort:{name:1}});
	}
})


Template.createClass.events({


	 "click .js-create": function(event){
	 	event.preventDefault();
	 	console.log("worked");
		const className = $(".js-className").val();
		const collegeUniversity = $(".js-collegeUniversity").val();
		const language = $(".js-language").val();
		const description = $(".js-description").val();
		const courseCode = $(".js-courseCode").val();

		const instructor = Meteor.users.findOne({'_id': Meteor.userId()});
		//const instructor = Meteor.userId();
		const instructorFirst = instructor.profile.firstName;
		const instructorLast = instructor.profile.lastName;

		if (className == "" || collegeUniversity == "" || language == "" || description == "" || courseCode == "") {
			window.alert("Uh oh, one or more fields are empty!")
		} else {

			const course = {className:className, collegeUniversity:collegeUniversity, language:language, description:description, instructorFirst:instructorFirst, instructorLast:instructorLast, instructor:instructor, courseCode:courseCode};

			console.dir(course);

			if(Courses.findOne({className: className })) {
				console.log("the class is already existed");
				throw new UserException("Invalid");
			}

			Courses.insert(course);

			//Router.go( "/");


			var theCourseObject = Courses.findOne({className: className,
																	 collegeUniversity:collegeUniversity,
																	 language:language,
																	 description:description,
																	 instructorFirst:instructorFirst,
																	 instructorLast:instructorLast,
																	 instructor:instructor
		});


			var numClasses = Meteor.user().profile.classes.length;






		Meteor.users.update(Meteor.userId(), {$push: {'profile.classes': theCourseObject}}); //previously theCourseObject._id

		console.log("created a class successfully");





		//Router.go("/coursePage/"+this._id);





			//Router.go( "/courses");
			Router.go("/");

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
