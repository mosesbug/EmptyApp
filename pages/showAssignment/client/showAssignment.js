Template.showAssignment.helpers({
	

	submissions: function(){
		console.log("checked");
		// console.log(Submissions.find({"metadata.assignment": this._id}).fetch());
		console.log(Submissions.find().fetch());
		return Submissions.find({"assignment": this._id});
	},
	
	numSubmissions: function(){
		console.log("checked");
		// console.log(Submissions.find({"metadata.assignment": this._id}).fetch());
		console.log(Submissions.find().fetch());
		return Submissions.find({"assignment": this._id}).count();
	},

	findUser: function(id){
		var user = Meteor.users.findOne({'_id': id});
		return user.profile.firstName+" "+user.profile.lastName;
	},

	questions: function(){
		const x=Questions.find();
		console.dir(x);
		return Questions.find({"metadata.assignment": this._id})
	},

	submitted: function(question){
		var y= Answers.findOne({"metadata.ownerId": Meteor.userId(), "metadata.question": question._id });
		var x= TextAnswers.findOne({"ownerId": Meteor.userId(), "question": question._id})
		if (y!=null||x!=null) {
    		return true;
	 	} else {
   		return false;
	 	}
	 }
})

Template.showAssignment.events({

	"click .js-submit": function(event){
		event.preventDefault();
		console.log("worked");
		const id = Meteor.userId()
		const assignment = this._id;		
		const submission=Submissions.insert({assignment:assignment, ownerId:Meteor.userId()});
		Router.go('showSubmission',{"_id":submission})
	}
})


Template.showSubmission.helpers({


	feedback: function(){

		console.log(this.assignment);
		return Feedback.find({"id": this._id});
	},
	

	assignments: function(){
		console.log("assignments reached");
		console.dir(this);
		return Assignments.find({"_id": this.assignment});
	},

	questions: function(){
		const x=Questions.find();
		console.dir(x);
		return Questions.find({"metadata.assignment": this.assignment})
	},

	answers: function(q){
		console.dir(Answers.find().fetch())
		if(q.metadata.type!="text"){
		return Answers.find({"metadata.question": q._id, "metadata.ownerId":this.ownerId})
		} else{
			return TextAnswers.find({"question": q._id, "ownerId": this.ownerId})
		}
	},

	showAudio: function(q){
		return q.metadata.type!="text";
	}

	
	
})

Template.showSubmission.events({

	"click .js-feedback": function(event){
		event.preventDefault();
		console.log("worked");
		const comment = $(".js-feedbackText").val();
		const id = this._id;

		console.log(this._id);

		const feedbackComment = {comment:comment, id:id}

		console.log(feedbackComment);

		Feedback.insert(feedbackComment);
	}
})

Template.answerQuestion.helpers({

	showText: function(){
		return this.metadata.type=="text"||this.metadata.type=="both"
	},

	showMic: function(){
		return this.metadata.type=="audio"||this.metadata.type=="both"
	}
})
