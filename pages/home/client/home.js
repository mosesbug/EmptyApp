Template.login.events({
  'click .form-login': function(event){
    event.preventDefault();
    var emailVar = $('[name=username]').val();
    var passwordVar = $('[name=password]').val();
    console.log("Form submitted");
    Meteor.loginWithPassword(emailVar, passwordVar);
    Router.go('home');
  }
});
