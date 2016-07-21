Template.showAssignment.helpers({
	

	submissions: function(){
		return Submissions.find({"metadata.assignment": this._id});
	}
})


Template.showSubmission.helpers({
	

	assignments: function(){
		return Assignments.find({"_id": this.metadata.assignment});
	}
})