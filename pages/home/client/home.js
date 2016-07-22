Template.login.events({
  'submit #loginform': function(event){
    console.log("form clicked");
    event.preventDefault();
    var emailVar = $('[name=username]').val();
    var passwordVar = $('[name=password]').val();
    console.dir(emailVar);
    console.dir(passwordVar);
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

  myClasses: function(){
    return Meteor.user().profile.classes;
  },

  myClassesTeacher: function(){
    console.log("myclases home dispaly works");
    return Courses.find({'instructor._id': Meteor.userId()});
  },
});

Template.registerHelper('checkType', () => {

  if(Meteor.user() && Meteor.user().profile.userType === "teacher") {
      return true;
  }

  return false;

});
