


Template.register.events({
  'submit #loginform': function(event){
    event.preventDefault();
    var emailVar = $('[name=js-email]').val();
    var passwordVar = $('[name=js-password]').val();
    var firstNameVar = $('[name=firstname]').val();
    var lastNameVar = $('[name=lastname]').val();
    var typeVar = $('[name=usertype]').val();

    Accounts.createUser({
      email: emailVar,
      password: passwordVar,
      profile: {
        firstName: firstNameVar,
        lastName: lastNameVar,
        userType: typeVar,
        classes: []
      }
    }, function(error){
      if(error){
        window.alert("Account already exists or one or more fields are empty.");
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
