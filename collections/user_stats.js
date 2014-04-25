UserStats = new Meteor.Collection('userStats');

UserStats.allow({
  // todo
  insert: function(userId) {
    return (userId) ? true : false;
  },
  update: function(userId) {
    return (userId) ? true : false;
  }
});