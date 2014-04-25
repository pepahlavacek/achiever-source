(function() {
  "use strict";
  Template.notifications.helpers({
    notifications: function() {
      return Notifications.find({ notSeen: Meteor.userId() }, { sort: { created_at: -1 }});
    },
    notificationCount: function() {
      return Notifications.find({ notSeen: Meteor.userId() }).count();
    }
  });

  Template.notification.events({
    'click a': function() {
      Notifications.update(this._id, { $pull: { notSeen: Meteor.userId() } });
    }
  });

  Template.notification.helpers({
    typeIs: function(type) {
      return this.type === type;
    },
    getUser: function(userId) {
      var user = Meteor.users.findOne({ _id: userId });
      return user.profile.name;
    }
  });

  Template.notification.created = function() {
    var snd = new Audio("/sounds/beep.mp3");
    snd.play();
  };

})();