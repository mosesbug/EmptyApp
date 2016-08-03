Meteor.methods({
	getInfo: function(tutor){
	Tutors.insert(tutor);
	},

	addAudio: function(audio){
		Recordings.insert(audio);
	},

	
})

