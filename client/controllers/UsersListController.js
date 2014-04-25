UsersListController = RouteController.extend({
  template: 'usersList',
  before: function () {

  },
  data: function () {
    var data = {};
    data.users = Meteor.users.find();
    return data;
  }
});


