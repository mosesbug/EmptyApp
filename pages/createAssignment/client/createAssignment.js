Template.makeQuestions.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    //questions: 1,
    showQuestion: false,
  });
});

  Template.makeQuestions.events({
	"click .js-add-question": function(event, instance){
		event.preventDefault();
		const c = instance.state.get("showQuestion");
		console.dir(c);
		instance.state.set("showQuestion", true);
		const b= instance.state.get("questions");
		instance.state.set("questions", 1+b);

	},

});


  Template.makeQuestions.helpers({
	questionNumber: function(){
		
		return Questions.find({"metadata.assignment": this._id}).count()+1;
		
	},
	showQuestion: function(){
		const instance= Template.instance();
		return instance.state.get("showQuestion")
	},

	greater: function(a,b){
		return (a>b);
	},

	assignment: function(){
		return Assignments.findOne({}, {sort:{$natural:-1}});
	},

	questions: function(){
		return Questions.find({"metadata.assignment": this._id})
	}



});
