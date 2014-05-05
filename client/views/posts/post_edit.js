Template.postEdit.events({
  'click .close': function() {
    Router.clearRegion('lightbox');
    Router.go('/');
  }
});

AutoForm.hooks({
  updatePostForm: {
    onError: function(operation, error, template) {
      console.log('error', operation, error);
    },
    onSuccess: function(operation, result, template) {
      Router.clearRegion('lightbox');
      Router.go('/');
    }
  }
});


Template.postEdit.editingDoc = function () {
  return Posts.findOne({_id: Session.get("currentPostEdit")});
};

Template.postEdit.rendered = function() {
  $("html,body").css('overflow', 'hidden');
};

Template.postEdit.destroyed = function() {
  $("html,body").css('overflow', '');
  Session.set('currentPostEdit', null);
};