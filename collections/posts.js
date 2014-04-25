Posts = new Meteor.Collection('posts', {
  schema: {
    title: {
      type: String,
      label: "Title",
      max: 140
    },
    team: {
      type: String,
      label: "Team"
    },
    description: {
      type: String,
      label: "Description",
      optional: true
    },
    created_at: {
      type: Number,
      decimal: false,
      autoValue: function() {
        if (this.isInsert) {
          return new Date().getTime();
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date().getTime()};
        } else {
          this.unset();
        }
      },
      denyUpdate: true
    },
    userId: {
      type: String,
      autoValue: function() {
        if (this.isInsert) {
          return Meteor.userId();
        } else if (this.isUpsert) {
          return {$setOnInsert: Meteor.userId()};
        } else {
          this.unset();
        }
      },
      denyUpdate: true
    },
    author: {
      type: Object,
      autoValue: function() {
        var user = Meteor.user();
        if(this.isInsert) {
          return user.profile;
        }
      },
      denyUpdate: true,
      blackbox: true
    },
    commentsCount: {
      type: Number,
      autoValue: function() {
        if (this.isInsert) {
          return 0;
        }
      },
      optional: true
    },
    likes: {
      type: Number,
      autoValue: function() {
        if (this.isInsert) {
          return 0;
        }
      },
      optional: true
    },
    likers: {
      type: [String],
      optional: true,
      autoValue: function() {
        if (this.isInsert) {
          return [];
        }
      }
    },
    media: {
      type: [Object],
      optional: true,
      blackbox: true
    },
    "media.$": {
      type: Object,
      optional: true,
      blackbox: true
    }
  }
});

Meteor.methods({
  submitPost: function(post) {
    var user = Meteor.user();
    var postId = Posts.insert(post);

    createNotification(postId, 'add_post', 'all', post);
    UserStats.upsert({ userId: user._id, year: new Date().getFullYear(), month: new Date().getMonth()+1 },  { $inc: { posts: 1 } });

    return postId;
  },
  removePost: function(post) {
    UserStats.upsert({ userId: post.userId, year: new Date().getFullYear(), month: new Date(this.created_at).getMonth()+1 },  { $inc: { posts: -1 } });
    Posts.remove(post._id);
  },
  like: function(post) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to like");

    var unlikedPost = Posts.findOne({_id: post._id, likers: { $ne: user._id }});
    if(unlikedPost) {
      Posts.update({ _id: post._id, likers: {$ne: user._id} }, {
        $addToSet: {likers: user._id},
        $inc: {likes: 1}
      });
      createNotification(post._id, 'like_post', null, unlikedPost);
      UserStats.upsert({ userId: post.userId, year: new Date().getFullYear(), month: new Date().getMonth()+1 },  { $inc: { likes: 1 } });

    } else {
      Posts.update({ _id: post._id, likers: user._id }, {
        $pull: {likers: user._id},
        $inc: {likes: -1}
      });
      UserStats.upsert({ userId: post.userId, year: new Date().getFullYear(), month: new Date().getMonth()+1 },  { $inc: { likes_taken: 1 } });
    }

  }
});

Posts.allow({
  remove: adminOrOwner,
  insert: isApproved,
  update: adminOrOwner
});
