Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  }
});

createNotification = function(postId, type, subscribers, item) {
  var subs = [];
  if(subscribers === 'all') {
    subs = _.pluck(Meteor.users.find().fetch(), "_id");
  } else if(!subscribers) {
    subs.push(item.userId);
  } else {
    subs = subscribers;
  }

  Notifications.insert({
    type: type,
    postId: postId,
    author: Meteor.user(),
    item: item,
    subscribers: subs,
    notSeen: _.without(subs, Meteor.userId()),
    created_at: new Date().getTime()
  });
};