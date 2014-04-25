Template.userView.events({

});

Template.userView.helpers({

});

monthsTillNow = function(start) {
  if(start) {
    var startDate = moment(start).subtract('year', 1);
    var months = [];
    _.each(_.range(moment(start).month(), moment().month()), function(month) {
      months.push({
        title: moment().month(month).format("MMMM"),
        url: moment().year() + '/' + moment().month(month).format("M"),
        weeks: []
      });
    });

    Session.set('months', months);
  }
};

Template.userView.rendered = function() {
  Deps.autorun(function () {
    var firstPost = _.first(Posts.find({}, { limit: 1, sort: { created_at: 1 }}).fetch());
    if (firstPost) {
      monthsTillNow(firstPost.created_at);
    }
  });

};
