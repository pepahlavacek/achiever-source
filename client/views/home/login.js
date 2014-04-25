Template.login.events({
  "click #sign-in-facebook": function(e, tmpl){
    Meteor.loginWithFacebook({
    }, function (error) {
      if (error){
        throwError(error.reason);
      } else {
        Router.go('/');
      }
    });
  }
});