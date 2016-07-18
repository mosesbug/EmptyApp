Template.posts.helpers({
	commentsdata: function(){
		return Comments.find({},{sort:{createdAt:-1}, limit:30000});},


	posts: function(){
		return Recordings.find();
	}
	
	



})

Template.posts.events({
	"click .js-submit-comment": function(event){
	   event.preventDefault();
	   //console.dir(event);
	   const comment_text = $(".js-user-comment").val();
	   if (comment_text=="") {
	   	window.alert("you must enter a comment!");
	   	return;
	   }
	   const comment_obj =
	   {text: comment_text,
	    createdAt: new Date(),
	    createdBy: Meteor.userId(),
	    userEmail: Meteor.user().emails[0].address};
	    //console.dir(comment_obj);
	    Comments.insert(comment_obj);
	    $(".js-user-comment").val("");
	    //Router.go('/');
	    console.log("If you can make this again you are damn good for now")
	},

	"click .js-create-post": function(event){
		Router.go('/createPost');
	}
});

Template.commentRow.events({
	"click .js-delete-comment": function(event){
		console.log("clicked on the x");
		console.dir(this);
		Comments.remove(this.comment._id);
	},
})
