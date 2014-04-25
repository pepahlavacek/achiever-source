PostsListController = RouteController.extend({
  template: 'postsList',
  before: function () {
    if(this.params.year && this.params.week) {
      var thisWeek = moment([this.params.year]).week(this.params.week);
      Session.set('start', thisWeek.startOf("week").unix()*1000);
      Session.set('end', thisWeek.endOf("week").unix()*1000);
      Session.set('title', 'Week of ' + thisWeek.startOf("week").format("MM/DD YYYY"));
    } else if(this.params.year && this.params.month) {
      var thisMonth = moment().year(this.params.year).month(this.params.month-1);
      Session.set('start', thisMonth.startOf("month").unix()*1000);
      Session.set('end', thisMonth.endOf("month").unix()*1000);
      Session.set('title', thisMonth.startOf("month").format("MMMM YYYY"));
    } else {
      Session.set('start', moment().startOf("week").unix()*1000);
      Session.set('end', moment().endOf("week").unix()*1000);
      Session.set('title', 'This Week');
    }

    Session.set('filterUser', null);
    Session.set('filterTest', null);
    Meteor.subscribe('postsFromTo', Session.get('start'), Session.get('end'));
  },
//  waitOn: function () {
//    return Meteor.subscribe('postsFromTo', Session.get('start'), Session.get('end'));
//  },

  data: function () {

    var data = {};

    data.posts = Posts.find({}, { sort: { created_at: -1 }});
    data.users = Meteor.users.find({ approved: true }, { sort: { 'profile.name': 1 }});
    data.title = Session.get('title');

    return data;
  }
});


