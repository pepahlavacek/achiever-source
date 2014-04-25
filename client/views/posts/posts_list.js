Template.postsList.helpers({
  'isActiveDisplayType': function(type) {
    if(!Session.get('displayType')) {
      Session.set('displayType', 'wall');
    }
    if(Session.get('displayType') === type) {
      return 'active';
    } else {
      return '';
    }
  },
  'displayType': function() {
    return Session.get('displayType') || 'wall';
  },
  'filterTeam': function() {
    return Session.get('filterTeam') || 'All Teams';
  },
  'filterUser': function() {
    return Session.get('filterUser') || 'Everyone';
  }
});

Template.postsList.events({
  'click a[data-filter]': function(event) {
    event.preventDefault();
    var elem = $(event.target).closest('li');
    Session.set('filterTeam', elem.find('a').html());
    Session.set('filterUser', null);
    $(".post-wrapper").removeClass("filter-hidden");

    $(".post-wrapper:not("+elem.find('a').attr('data-filter')+")").addClass('filter-hidden');
  },
  'click a[data-author-filter]': function(event) {
    event.preventDefault();
    var elem = $(event.target).closest('li');
    Session.set('filterTeam', null);
    Session.set('filterUser', elem.find('span').html());

    $(".post-wrapper").removeClass("filter-hidden");
    if(elem.find('a').attr('data-author-filter') !== '*') {
      $(".post-wrapper[data-author!='" + elem.find('a').attr('data-author-filter') + "']").addClass('filter-hidden');
    }
  },
  'click .toggle-show-list': function(e) {
    e.preventDefault();
    Session.set('displayType','list');
    $(".posts").removeClass("wall").addClass("list");
  },
  'click .toggle-show-wall': function(e) {
    e.preventDefault();
    Session.set('displayType','wall');
    $(".posts").removeClass("list").addClass("wall");
  }
});
