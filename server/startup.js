Meteor.startup(function(){
	//Recordings.remove({});
	//Courses.remove({});
	
	
	if (Languages.find().count() == 0) {
		Languages.insert({name: "English"});
		Languages.insert({name: "German"});
		Languages.insert({name: "Chinese"});
		Languages.insert({name: "Spanish"});
		Languages.insert({name: "French"});
		Languages.insert({name: "Japanese"});
		Languages.insert({name: "Korean"});
		Languages.insert({name: "Arabic"});
		Languages.insert({name: "Greek"});
		Languages.insert({name: "Hebrew"});
		Languages.insert({name: "Biblical Hebrew"});
		Languages.insert({name: "Italian"});
		Languages.insert({name: "Latin"});
		Languages.insert({name: "Russian"});
		Languages.insert({name: "Yiddish"});
	}


	if (Schools.find().count() == 0) {
		Schools.insert({name: "Brandeis University"});
		Schools.insert({name: "Harvard University"});
		Schools.insert({name: "Boston University"});
		Schools.insert({name: "Massachusetts Institute of Technology"});
	}


})
