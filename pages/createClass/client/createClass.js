Template.createClass.events({
	 "click .js-create": function(event){
	 	event.preventDefault();
	 	console.log("worked");
		const className = $(".js-className").val();
		const collegeUniversity = $(".js-collegeUniversity").val();
		const language = $(".js-language").val();
		const description = $(".js-description").val();

		//if (Meteor.user())  {}
		console.dir(this.userId)

		// const instructor = Accounts.findOne({'_id': })

		// this.userId, Meteor.user()._id

		const course = {className:className, collegeUniversity:collegeUniversity, language:language, description:description};

		console.dir(course);
		Courses.insert(course);
	},
})