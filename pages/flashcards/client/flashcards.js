
Template.flashcards.helpers({
	flashcards:function(){
		console.log(this._id);
		return Flashcards.find({courseId: this._id});
	},

})

Template.flashcardSet.helpers({
	flashcards:function(){
		console.log(this._id);
		return Flashcards.find({courseId: this._id});
	},
})


Template.createFlashcards.events({


	 "click .js-submit": function(event){
	 	event.preventDefault();
	 	console.log("worked");
		const name = $(".js-setName").val();
		const instructions = $(".js-instructions").val();
		const wordOne = $(".js-wordOne").val();
		const wordTwo = $(".js-wordTwo").val();

		const pair = {wordOne:wordOne, wordTwo:wordTwo}


		const flashcardSet = {courseId:this._id, name:name, instructions:instructions, pair:pair};

		console.dir(flashcardSet);

		Flashcards.insert(flashcardSet);

		Router.go("/flashcards/{{_id}}");
	},
})