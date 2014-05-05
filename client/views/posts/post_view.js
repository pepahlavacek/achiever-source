Template.postView.events({
  'click .close': function() {
    Router.clearRegion('lightbox');
  },
  'click .like': function(event) {
    event.preventDefault();

    Meteor.call('like', this, function(error, id) {
      if (error) {
        throwError(error.reason);
      }
    });
  }
});

Template.postView.helpers({
  'liked': function() {
    return _.contains(this.likers, Meteor.userId()) ? 'liked' : '';
  },
  'comments': function() {
    return Comments.find({ postId: this._id }, { sort: { created_at: -1 }});
  },
  'post': function() {
    return Posts.findOne({_id: Session.get('currentPost')});
  },
  'markdown': function(text) {
    if(text) {
      return marked(text)
    }
    return '';
  }
});

Template.postView.rendered = function() {
  $("html,body").css('overflow', 'hidden');
};

Template.postView.destroyed = function() {
  $("html,body").css('overflow', '');
  Session.set('currentPost', null);
};