Template.register.events({
  'submit .form-register': function(event){
    event.preventDefault();
    var emailVar = $('[name=js-email]').val();
    var passwordVar = $('[name=js-password]').val();
    var typeVar = $('[name=usertype]').val();
    console.dir(emailVar);
    console.dir(passwordVar);
    console.dir(typeVar);


    Accounts.createUser({
      email: emailVar,
      password: passwordVar,
      profile: {
          userType: typeVar
      }
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
