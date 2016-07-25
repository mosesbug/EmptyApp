Template.createAssignment.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    questions: 0,
  });
});

  Template.createAssignment.events({
	"click .js-questions": function(event, instance){
		event.preventDefault();
		const c = instance.state.get("questions");
		console.dir(c);
		instance.state.set("questions", 1+c);
	},

});


  Template.createAssignment.helpers({
	theQuestions: function(){
		const instance= Template.instance();
		return instance.state.get("questions")
		
	},


	greater: function(a,b){
		return (a>b);
	}

});
