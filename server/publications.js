//Meteor.publish("posts", function() {
//  return Posts.find({}, {sort: {created_at: -1}});
//});

checkUserApproved = function(id) {
  var user = Meteor.users.findOne({ _id: id });
  if(!user.approved) {
    return false;
  } else {
    return true;
  }
}
Meteor.publish('users', function(id) {
  return Meteor.users.find({}, { fields: { profile: 1, approved: 1, createdAt: 1, roles: 1 }});
});

Meteor.publish('user', function(id) {
  return Meteor.users.find({ _id: this.userId }, { fields: { profile: 1, approved: 1, createdAt: 1, roles: 1 }});
});

Meteor.publish("thisUser", function() {
  return Meteor.users.find({ _id: this.userId }, { fields: { roles: 1, profile: 1, approved: 1 }});
});


Meteor.reactivePublish('postsFromTo', function(start, end) {
  if (this.userId) {
    var user = Meteor.users.findOne({_id: this.userId}, {reactive: true});
    if (user && user.approved) {
      return Posts.find( {
        $and : [
          { created_at: { $gt: start } },
          { created_at: { $lt: end } }
        ]
      }, {sort: {created_at: -1}});
    }
  }
});

Meteor.publish("post", function(id) {
  if(!checkUserApproved(this.userId)) {
    return false;
  }
  return Posts.find({ _id: id });
});

Meteor.reactivePublish("comments", function() {
  if (this.userId) {
    var user = Meteor.users.findOne({_id: this.userId}, {reactive: true});
    if (user && user.approved) {
      return Comments.find({}, {sort: {created_at: -1}});
    }
  }
});

Meteor.reactivePublish('notifications', function() {
  if (this.userId) {
    var user = Meteor.users.findOne({_id: this.userId}, {reactive: true});
    if (user && user.approved) {
      return Notifications.find({ subscribers: this.userId }, { sort: { created_at: -1 }});
    }
  }
});


Meteor.publish("postsByUser", function(userId) {
  if(!checkUserApproved(this.userId)) {
    return false;
  }
  return Posts.find({ userId: userId }, {sort: {created_at: -1}});
});

Meteor.publish("nominationsByUserAndWeek", function(userId, start) {
  if(!checkUserApproved(this.userId)) {
    return false;
  }
  return Nominations.find({ userId: userId, created_at: { $gte: start } }, {sort: {created_at: -1}});
});

Meteor.publish("badgesByUser", function(userId) {
  if(!checkUserApproved(this.userId)) {
    return false;
  }
  return Badges.find({ userId: userId }, {sort: {created_at: -1}});
});

Meteor.publish("userStatsByUser", function(userId) {
  if(!checkUserApproved(this.userId)) {
    return false;
  }
  return UserStats.find({ userId: userId }, { sort: { year: -1, month: -1 }});
});

Meteor.publish(null, function (){
  return Meteor.roles.find({});
});