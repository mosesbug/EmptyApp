Template.showAssignment.helpers({
	

	submissions: function(){
		return Submissions.find({"metadata.assignment": this._id});
	}
})


Template.showSubmission.helpers({

	feedback: function(){

		console.log(this.metadata.assignment);
		return Feedback.find({"id": this._id});
	},
	

	assignments: function(){
		return Assignments.find({"_id": this.metadata.assignment});
	}
})

Template.showSubmission.events({

	"click .js-feedback": function(event){
		event.preventDefault();
		console.log("worked");
		const comment = $(".js-feedbackText").val();
		const id = this._id;

		const feedbackComment = {comment:comment, id:id}

		console.log(feedbackComment);

		Feedback.insert(feedbackComment);
	}
})