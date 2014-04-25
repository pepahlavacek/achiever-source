ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};

isLoggedIn = function(userId, doc) {
  return userId ? true : false;
};

isApproved = function(userId, doc) {
  var user = Meteor.user();
  return user.approved;
};


adminOnly = function(userId, doc) {
  if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
    return true;
  }
  return false;
};

adminOrOwner = function(userId, doc) {
  if(doc.userId === userId || Roles.userIsInRole(Meteor.user(), ['admin'])) {
    return true;
  }
  return false;
};

adminOrManager = function(userId, doc) {
  if(Roles.userIsInRole(Meteor.user(), ['admin', 'manager'])) {
    return true;
  }
  return false;
};