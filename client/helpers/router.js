Router.configure({
  notFoundTemplate: '404', // this will render,
  disableProgressSpinner: true,
  layoutTemplate: "layout",
  loadingTemplate: "loading"
});

Router.map(function () {
  /**
   * Login Page
   */
  this.route('login', {
    path: '/login',
    template: 'login'
  });

  // error - pending approval
  this.route('approvalPending', {
    path: '/pending',
    template: 'approvalPending',
    loginRequired: 'login'
  });
  /**
   * Posts Page
   */
  this.route('posts', {
    path: '/',
    loginRequired: 'login',
    controller: 'PostsListController'
  });

  // posts by Week
  this.route('postsWeek', {
    path: '/week/:year/:week',
    controller: 'PostsListController',
    loginRequired: 'login'
  });

  // posts by Month
  this.route('postsMonth', {
    path: '/month/:year/:month',
    controller: 'PostsListController',
    loginRequired: 'login'
  });

  // add post
  this.route('posts/add', {
    path: '/posts/add',
    controller: 'PostsListController',
    loginRequired: 'login',
    yieldTemplates: {
      'postAdd': { to: 'lightbox' }
    }
  });

  // post by ID
  this.route('post', {
    path: '/posts/:_id',
    controller: 'PostsListController',
    loginRequired: 'login',
    yieldTemplates: {
      postView: { to: 'lightbox' }
    },
    before: function() {
      Session.set('currentPost', this.params._id);
    },
    waitOn: function() {
      return [ Meteor.subscribe("posts"), Meteor.subscribe('post', Session.get('currentPost')) ];
    },
    data: function () {
      return Posts.findOne({_id: this.params._id});
    }
  });


  // list users
  this.route('users', {
    path: '/users',
    controller: 'UsersListController',
    loginRequired: 'login'
  });

  this.route('user', {
    path: '/users/:_id',
    controller: "UserViewController",
    loginRequired: 'login'
  });

});


mustBeAdmin = function(pause) {
  if(!Roles.userIsInRole(Meteor.userId(), 'admin')) {
    this.render('errorAdmin');
  }
};


// check if the account is approved before singing in
Router.onBeforeAction(function(pause) {
  var user = Meteor.user();
  if(!_.isUndefined(user.approved)) {
    if(!user.approved) {
      this.render('approvalPending');
      pause();
      return;
    }
  } else {
    this.render('loading');
    pause();
    return;
  }
}, {
  except: ['login']
});



Router.onBeforeAction(mustBeAdmin, {only: ['adminDashboard', 'users']});
Router.onBeforeAction('loading');