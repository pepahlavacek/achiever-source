Template.timeNavigation.helpers({
  'weeksMenu': function() {

    var months = [];

    _.each(_.range(0,moment().months()+1), function(month) {
      months.push({
        title: moment().month(month).format("MMMM"),
        url: moment().year() + '/' + moment().month(month).format("M"),
        weeks: []
      });
    });

    _.each(_.range(1, moment().weeks()+1), function(item) {
      var startOfWeek = moment().week(item).startOf('week');
      if(months[startOfWeek.month()]) {
        months[startOfWeek.month()].weeks.push({
          title: "Week of " + startOfWeek.format("M/D"),
          url: moment().year() + '/' + item
        });
      }
    });

    _.each(months, function(month) {
      month.weeks.reverse();
    });

    return months.reverse();
  }
});
