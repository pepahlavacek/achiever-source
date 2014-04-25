UI.registerHelper("formatTime", function(time) {
  return moment().format("MM/DD/YYYY HH:MM:SS");
});

UI.registerHelper("fromNow", function(time) {
  return moment(time).fromNow();
});

UI.registerHelper("isBig", function(likes) {
  return (likes > 1) ? 'big' : '';
});

UI.registerHelper("teamIcon", function(team) {
  if(team === 'engineering') {
    return 'fa-wrench'
  } else if(team === 'product') {
    return 'fa-pencil'
  } else if(team === 'sales') {
    return 'fa-dollar'
  } else if(team === 'marketing') {
    return 'fa-bullhorn'
  } else if(team === 'success') {
    return 'fa-star'
  }
});

