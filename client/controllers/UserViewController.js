UserViewController = RouteController.extend({
  template: 'userView',
  layoutTemplate: 'layout',
  before: function () {
    if(this.params._id) {
      Session.set('selectedUserId', this.params._id);
    }

    Meteor.subscribe('user', Session.get('selectedUserId'));
    Meteor.subscribe('postsByUser', Session.get('selectedUserId'));
    Meteor.subscribe('userStatsByUser', Session.get('selectedUserId'));
    Meteor.subscribe('badgesByUser', Session.get('selectedUserId'));
    Meteor.subscribe('nominationsByUserAndWeek', Session.get('selectedUserId'), Session.get('thisWeekStart'));
  },

  data: function () {
    var data = {};

    data.posts = Posts.find({});
    data.stats = UserStats.find({});
    data.user = Meteor.users.findOne({ _id: Session.get('selectedUserId') });
    data.badges = Badges.find({});
    data.nominations = Nominations.find({});
    return data;
  }
});
