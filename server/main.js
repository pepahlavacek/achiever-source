Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    user.profile = options.profile;
  }
  if (user.services && user.services.facebook) {
    user.profile.fbid = user.services.facebook.id;
    user.profile.username = user.services.facebook.username;
  }

  user.approved = false;

  var admins = Meteor.users.find({ roles: 'admin'}).fetch();

  var emails = _.map(admins, function(item) {
    return item.services.facebook.email;
  });
  // send email to admins
  Email.send({
    to: emails,
    from: 'chute-achiever@gmail.com',
    subject: 'New user in Achiever',
    html: "There's a new colleague trying to get in, <strong>" + user.profile.name + "</strong>. You can approve him/her in  <a href='http://chute-achiever.herokuapp.com/users'>Achiever</a>"
  });

  return user;
});

