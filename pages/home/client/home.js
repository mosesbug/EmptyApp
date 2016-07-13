if(Meteor.isClient) {
Template.register.events({
  'submit .form-register': function(event){
    event.preventDefault();
    var emailVar = $('[name=js-email]').val();
    var passwordVar = $('[name=js-password]').val();
    console.dir(emailVar);
    console.dir(passwordVar);


    Accounts.createUser({
      email: emailVar,
      password: passwordVar
    }, function(error){
      if(error){
        console.log(error.reason);
        return;
      } else {
        console.log("created Account")
        Router.go('home');
      }

    });

    console.log("accounts createuser...");


  }

});

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
}
