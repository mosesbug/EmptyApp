Template.login.events({
  'submit .form-login': function(event){
    event.preventDefault();
    var emailVar = $('[name=loginEmail]').val();
    var passwordVar = $('[name=loginPassword]').val();
    console.log("Form submitted");
    Meteor.loginWithPassword(emailVar, passwordVar);
    Router.go('home');
  }
});
