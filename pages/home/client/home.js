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

Template.myClassesRow.onCreated(function() {
  event.preventDefault();
  this.state = new ReactiveDict();
  this.state.setDefault({
    //questions: 1,
    incompleteAssignments: 0,
  });
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

  assignments: function(){
    console.log("check loop");
    return Assignments.find({"metadata.course": id});
  },

  assignmentsNotSubmitted: function(courseId){
      
      console.log("gabe is a hard worker")
      const total = Assignments.find({"metadata.course": courseId});
      console.dir(total.fetch());
      const submitted = Submissions.find({"courseId": courseId, "ownerId": Meteor.userId()});
      console.dir(submitted.fetch());
      
        return total.count() - submitted.count();
    
  },

  returnAssignments: function() {
    const instance = Template.instance();
    return instance.state.get("incompleteAssignments");
  },
});

Template.registerHelper('checkType', () => {

  if(Meteor.user() && Meteor.user().profile.userType === "teacher") {
      return true;
  }

  return false;

});
