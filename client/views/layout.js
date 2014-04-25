Template.layout.events({
  'click .add-post': function(event) {
    event.preventDefault();
    Router.setRegion('lightbox', 'postAdd');
  },
  'click .logout': function() {
    Meteor.logout();
  }
});

Template.layout.rendered = function() {
  // close menu on ESC
  $(document).on("keyup", function(e) {
    if(e.keyCode === 27) {
      $("#layout").removeClass('menu-open');
    }
  });
};