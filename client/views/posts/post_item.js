Template.postItem.events({
  'click .post .picture, click .post h1': function(event) {
    Session.set('currentPost', this._id);
    Router.setRegion('lightbox', 'postView');
  },
  'click .like': function(event) {
    event.preventDefault();

    Meteor.call('like', this, function(error, id) {
      if (error) {
        throwError(error.reason);
      }
    });
  },
  'click .delete': function(event) {
    if(confirm("Are you want to delete this post?")) {
      Meteor.call('removePost', this);
    }
  }
});

Template.postItem.helpers({
  'liked': function() {
    return _.contains(this.likers, Meteor.userId()) ? 'liked' : '';
  },
  'mainImageUrl': function() {
    if(!_.isEmpty(this.media)) {
      var image = _.findWhere(this.media, { main: true }) || _.first(this.media);
      return image.url + '/w/250';
    } else {
//      return 'http://graph.facebook.com/' + this.author.fbid + '/picture?type=large';
      return false;
    }
  }
});


Template.postItem.rendered = function() {
  $(this.firstNode).addClass('loaded');
};