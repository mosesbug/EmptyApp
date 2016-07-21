Recordings.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  }

});

Meteor.users.allow({
    'update': function () {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    }
  });
