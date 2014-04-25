Template.badgeAdd.events({
  'click .close': function() {
    Router.clearRegion('lightbox');
  },
  'submit form': function(e) {
    e.preventDefault();

    var badge = {
      title: $(event.target).find('[name=title]').val(),
      userId: Session.get('currentUser')
    };

    Meteor.call('badge', badge, function(error, id) {
      if (error) {
        throwError(error.reason);
      } else {
        $(e.target).find('[name=title]').val('');
        Router.clearRegion('lightbox');
      }
    });
  }
});

Template.badgeAdd.rendered = function() {
  $("html,body").css('overflow', 'hidden');
};

Template.badgeAdd.destroyed = function() {
  $("html,body").css('overflow', '');
  Session.set('currentPost', null);
};

Template.badgeAdd.user = function() {
  return Meteor.users.findOne({ _id: Session.get('currentUser')});
};
