if(Meteor.isClient){
Template.register.events({
  'submit .form-register': function(event){
    event.preventDefault();
    var emailVar = $('[name=js-name]').val();
    var passwordVar = $('[name=js-password]').val();
    //const typeVar = $('js-select').val();
    console.log("Form submitted.");
    Accounts.createUser({
      email: emailVar,
      password: passwordVar

       });

       Router.go('home');

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
