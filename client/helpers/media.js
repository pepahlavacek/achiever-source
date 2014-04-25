// Local (client-only) collection
Images = new Meteor.Collection(null);

addImage = function(image) {
  Images.insert(image);
};

clearImages = function() {
  Images.remove({});
};