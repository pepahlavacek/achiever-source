if(Meteor.settings && Meteor.settings.test) {
  Meteor.user = function() {
    return { _id: '1989', name: 'Test User', approved: true, profile: { fbid: '42', name: 'Test User', username: 'testuser' } };
  }
  Meteor.userId = function() {
    return '1989';
  }
}