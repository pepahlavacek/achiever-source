Template.nominationAdd.events({
  'click .close': function() {
    Router.clearRegion('lightbox');
  },
  'submit form': function(e) {
    e.preventDefault();

    var nomination = {
      title: $(event.target).find('[name=title]').val(),
      userId: Session.get('currentUser')
    };

    Meteor.call('nomination', nomination, function(error, id) {
      if (error) {
        throwError(error.reason);
      } else {
        $(e.target).find('[name=title]').val('');
        Router.clearRegion('lightbox');
      }
    });
  }
});

Template.nominationAdd.rendered = function() {
  $("html,body").css('overflow', 'hidden');
};

Template.nominationAdd.destroyed = function() {
  $("html,body").css('overflow', '');
  Session.set('currentPost', null);
};

Template.nominationAdd.user = function() {
  return Meteor.users.findOne({ _id: Session.get('currentUser')});
};
