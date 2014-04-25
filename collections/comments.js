Comments = new Meteor.Collection('comments');

Comments.allow({
  insert: function(userId) {
    return (userId) ? true : false;
  },
  remove: adminOrOwner
});

Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new success");

    // pick out the whitelisted keys
    var comment = _.extend(_.pick(commentAttributes, 'body', 'postId'), {
      userId: user._id,
      author: user.profile,
      created_at: new Date().getTime()
    });

    var commentId = Comments.insert(comment, function() {
      Posts.update({ _id: commentAttributes.postId }, { $inc: { commentsCount: 1 }});
      // now create a notification, informing the user that there's been a comment
      createNotification(commentAttributes.postId, 'add_comment', 'all', Posts.findOne({ _id: commentAttributes.postId }));
    });


    return commentId;
  }
});