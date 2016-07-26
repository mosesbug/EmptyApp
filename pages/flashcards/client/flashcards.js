var x;

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

	flashcardPairs:function(){
		console.log("working");
		x = FlashcardPairs.findOne({flashcardId: this._id});
		return x;
	},
})


Template.createFlashcards.events({


	 "click .js-submit": function(event){
	 	event.preventDefault();
	 	console.log("worked");
		const name = $(".js-setName").val();
		const instructions = $(".js-instructions").val();

		const flashcardSet = {courseId:this._id, name:name, instructions:instructions};
		const flashcardId = Flashcards.insert(flashcardSet);
		console.log(flashcardId);


		
		const wordOne = $(".js-wordOne").val();
		const wordTwo = $(".js-wordTwo").val();
		const pair = {flashcardId:flashcardId, wordOne:wordOne, wordTwo:wordTwo}; 
		FlashcardPairs.insert(pair);



		console.dir(flashcardSet);
		console.dir(pair);


		Router.go("/flashcards/{{_id}}");
	},
})

Template.flashcardSet.events({

	 "click .js-submit": function(event){
	 	event.preventDefault();
	 	console.log("worked");
		const guess = $(".js-guess").val();

		if (guess == x.wordTwo) {
			window.alert("Correct!");
			console.log("correct");
		} else {
			window.alert("Incorrect. Try again");
		}

		console.log(guess);


	},
})