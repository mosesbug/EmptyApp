Template.login.events({
  'submit #loginform': function(event){
    console.log("form clicked");
    event.preventDefault();
    var emailVar = $('[name=username]').val();
    var passwordVar = $('[name=password]').val();
    Meteor.loginWithPassword(emailVar, passwordVar, function(error){
      if(error) {
        console.log("login failed. Try again or create an account");
      }
    });
    Router.go('home');
  }
});

Template.home.helpers({
  allClasses: function(){
    return Courses.find();
  },

//HERE
  name: function(){
    console.log("Hello");
    const instructor = Meteor.users.findOne({'_id': Meteor.userId()});
    const instructorFirst = instructor.profile.firstName;
    return instructorFirst;
  },


  myClasses: function(){
    return Meteor.user().profile.classes;
  },

  myClassesTeacher: function(){
    console.log("myclasses home display works");
    return Courses.find({'instructor._id': Meteor.userId()});
  },

});

Template.myClassesRow.helpers({

  assignmentsSubmitted: function(courseId){
    var assignments = Assignments.find({"metadata.course": courseId});
    var incomplete = 0;
    for (var i = assignments.length - 1; i >= 0; i--) {
      var submission = lookupMySubmission(assignments[i]._id)
      console.log("submission below");
      console.log(submission);
      if (submission = "") {
        incomplete = incomplete + 1;
      }
    }
    return incomplete;
  },
});

Template.registerHelper('checkType', () => {

  if(Meteor.user() && Meteor.user().profile.userType === "teacher") {
      return true;
  }

  return false;

});
