(function() {
  "use strict";
  Template.commentAdd.events({
    'submit form': function(event) {
      event.preventDefault();

      var comment = {
        body: $(event.target).find('[name=body]').val(),
        postId: Session.get('currentPost')
      };

      Meteor.call('comment', comment, function(error, id) {
        if (error) {
          throwError(error.reason);
        } else {
          $(event.target).find('input,textarea').val('');
        }
      });
    }
  });

})();