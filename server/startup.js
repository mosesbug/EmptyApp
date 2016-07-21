Meteor.startup(function(){
	//Recordings.remove({});

	if (Languages.find().count() == 0) {
		Languages.insert({name: "English"});
		Languages.insert({name: "German"});
		Languages.insert({name: "Chinese"});
		Languages.insert({name: "Spanish"});
		Languages.insert({name: "French"});
	}


	if (Schools.find().count() == 0) {
		Schools.insert({name: "Brandeis University"});
		Schools.insert({name: "Harvard University"});
		Schools.insert({name: "Boston University"});
		Schools.insert({name: "Massachusetts Institute of Technology"});
	}


})
