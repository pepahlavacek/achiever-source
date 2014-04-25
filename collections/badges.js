Badges = new Meteor.Collection('badges');

Nominations = new Meteor.Collection('nominations');

Badges.allow({ // switch to admin role
  insert: adminOrManager
});

Nominations.allow({
  insert: isApproved
});

Meteor.methods({
  badge: function(badgeAttributes) {
    var user = Meteor.user();
    var profile = Meteor.users.findOne({ _id: badgeAttributes.userId });
    var badge = _.extend(_.pick(badgeAttributes, 'title', 'userId'), {
      profile: profile.profile,
      awardedBy: user._id,
      created_at: new Date().getTime()
    });

    var badgeId = Badges.insert(badge);

    createNotification(badgeId, 'add_badge', 'all', badge);
    UserStats.upsert({ userId: badgeAttributes.userId, year: new Date().getFullYear(), month: new Date().getMonth()+1 },  { $inc: { badges: 1 } });

    return badgeId;
  },
  nomination: function(nominationAttributes) {
    var user = Meteor.user();
    var profile = Meteor.users.findOne({ _id: nominationAttributes.userId });

    var nomination = _.extend(_.pick(nominationAttributes, 'title', 'userId'), {
      profile: profile.profile,
      awardedBy: user._id,
      created_at: new Date().getTime()
    });

    var nominationId = Nominations.insert(nomination);
    UserStats.upsert({ userId: nominationAttributes.userId, year: new Date().getFullYear(), month: new Date().getMonth()+1 },  { $inc: { nominations: 1 } });

    return nominationId;
  }
});