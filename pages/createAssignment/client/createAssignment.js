Template.makeQuestions.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    //questions: 1,
    showQuestion: false,
    audio: false,
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

	"change .js-audio": function(event, instance){
		event.preventDefault();
		const c= instance.state.get("audio");
		if (c==false){
			instance.state.set("audio", true);
		} else{
			instance.state.set("audio", false);
		}
	}

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
	},

	showAudio: function(){
		return this.metadata.showAudio
	},

	audio: function(){
		const instance= Template.instance();
		return instance.state.get("audio")
	},

	questionAudio: function(q){
		return q.metadata.audio
	}



});

 Template.createAssignment.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    //questions: 1,
    showAudio: false,
  });
});

  Template.createAssignment.helpers({
  	showAudio: function(){
  		const instance= Template.instance();
		return instance.state.get("showAudio")
  	}
  });

   Template.createAssignment.events({
	"change .js-audio": function(event, instance){
		event.preventDefault();
		const c = instance.state.get("showAudio");
		console.dir(c);
		if(c==true){
		instance.state.set("showAudio", false);
		} else{
			instance.state.set("showAudio", true);
		}

	},

});
