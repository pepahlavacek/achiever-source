UI.registerHelper("formatTime", function(time) {
  return moment().format("MM/DD/YYYY HH:MM:SS");
});

UI.registerHelper("fromNow", function(time) {
  return moment(time).fromNow();
});

UI.registerHelper("teamIcon", function(team) {
  if (team === 'engineering') {
    return 'fa-wrench'
  } else if (team === 'product') {
    return 'fa-pencil'
  } else if (team === 'sales') {
    return 'fa-dollar'
  } else if (team === 'marketing') {
    return 'fa-bullhorn'
  } else if (team === 'success') {
    return 'fa-star'
  }
});

UI.registerHelper("teams", function() {
  return [
    { label: "Customer Success", value: 'success' },
    { label: "Engineering", value: 'engineering' },
    { label: "Product", value: 'product' },
    { label: "Sales", value: 'sales' },
    { label: "Marketing", value: 'marketing' },
    { label: "Operations", value: 'operations' }
  ];
});

UI.registerHelper('isSelected', function(a, b) {
  console.log(this, a, b)
  return (a === b) ? ' selected' : '';
});


UI.registerHelper("canEdit", function() {
  if(this.userId === Meteor.userId()) {
    return true;
  } else {
    return false;
  }
});