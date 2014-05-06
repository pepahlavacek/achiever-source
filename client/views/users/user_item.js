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
  },
  'click .make-admin': function(e) {
    e.preventDefault();
    Meteor.call('makeAdmin', this._id, function(error, id) {
      if (error) {
        console.log(error.reason);
      }
    });
  },
  'click .make-manager': function(e) {
    e.preventDefault();
    Meteor.call('makeManager', this._id, function(error, id) {
      if (error) {
        console.log(error.reason);
      }
    });
  },
  'click .revoke-manager': function(e) {
    e.preventDefault();
    Meteor.call('revokeManager', this._id, function(error, id) {
      if (error) {
        console.log(error.reason);
      }
    });
  },
  'click .revoke-admin': function(e) {
    e.preventDefault();
    Meteor.call('revokeAdmin', this._id, function(error, id) {
      if (error) {
        console.log(error.reason);
      }
    });
  }
});

Template.userItem.helpers({
  'userRoles': function() {
    console.log('roles', this);

    return Roles.getRolesForUser(this._id);
//    return 'bal';
  },
  'hasRole': function(role) {
    return _.contains(this.roles, role);
  }
});