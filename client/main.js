Meteor.subscribe('users');
Meteor.subscribe('comments');
Meteor.subscribe('notifications');



Session.set('thisWeekStart', moment().startOf("week").unix()*1000);