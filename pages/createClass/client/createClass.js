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


		const course = {className:className, collegeUniversity:collegeUniversity, language:language, description:description, instructorFirst:instructorFirst, instructorLast:instructorLast};

		console.dir(course);
		Courses.insert(course);
		Router.go( "/courses");
	},
})