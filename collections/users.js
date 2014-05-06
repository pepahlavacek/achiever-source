Meteor.methods({
  approve: function(userId) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new achievement");

    return Meteor.users.update({ _id: userId}, { $set: { approved: true, approved_at: new Date().getTime() }});
  },
  makeAdmin: function(userId) {
    if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Roles.addUsersToRoles(userId, 'admin');
    }
  },
  makeManager: function(userId) {
    console.log(Meteor.userId());
    if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Roles.addUsersToRoles(userId, 'manager');
    }
  },
  revokeAdmin: function(userId) {
    if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Roles.removeUsersFromRoles(userId, 'admin');
    }
  },
  revokeManager: function(userId) {
    if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Roles.removeUsersFromRoles(userId, 'manager');
    }
  }
});

Meteor.users.allow({
  update: adminOrManager,
  remove: adminOnly
});