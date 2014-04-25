Meteor.methods({
  approve: function(userId) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new achievement");

    return Meteor.users.update({ _id: userId}, { $set: { approved: true, approved_at: new Date().getTime() }});
  },
  makeAdmin: function(userId) {
    Roles.addUsersToRoles(userId, ['admin']);
  }
});

Meteor.users.allow({
  update: adminOrManager,
  remove: adminOnly
});