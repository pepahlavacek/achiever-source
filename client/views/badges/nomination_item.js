Template.nominationItem.helpers({
  getUser: function(userId) {
    var user = Meteor.users.findOne({ _id: userId });
    return user.profile.name;
  }
});