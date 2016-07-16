

Template.register.events({
  'submit #loginform': function(event){
    event.preventDefault();
    var emailVar = $('[name=js-email]').val();
    var passwordVar = $('[name=js-password]').val();
    var firstNameVar = $('[name=firstname]').val();
    var lastNameVar = $('[name=lastname]').val();
    var typeVar = $('[name=usertype]').val();
    console.dir(emailVar);
    console.dir(passwordVar);
    console.dir(typeVar);
    console.dir(firstNameVar);
    console.dir(lastNameVar);



    Accounts.createUser({
      email: emailVar,
      password: passwordVar,
      profile: {
        firstName: firstNameVar,
        lastName: lastNameVar,
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
