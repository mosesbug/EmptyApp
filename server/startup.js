Meteor.startup(function(){
	//Recordings.remove({});
	Languages.insert({name: "English"});
	Languages.insert({name: "German"});
	Languages.insert({name: "Chinese"});
	Languages.insert({name: "Spanish"});
	Languages.insert({name: "French"});

	Schools.insert({name: "Brandeis University"});
	Schools.insert({name: "Harvard University"});
	Schools.insert({name: "Boston University"});
	Schools.insert({name: "Massachusetts Institute of Technology"});


})
