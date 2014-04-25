Template.userItem.events({
  'click .approve': function(e) {
    e.preventDefault();

    Meteor.call('approve', this._id, function(error, id) {
      if (error) {
        console.log(error.reason);
      } else {

      }
    });
  },
  'click .add-badge': function(e) {
    e.preventDefault();
    Session.set('currentUser', this._id);
    Router.setRegion('lightbox', 'badgeAdd');
  },
  'click .add-nomination': function(e) {
    e.preventDefault();
    Session.set('currentUser', this._id);
    Router.setRegion('lightbox', 'nominationAdd');
  }
});