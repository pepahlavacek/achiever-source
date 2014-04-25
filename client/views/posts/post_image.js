Template.postImage.events({
  'click .delete': function(event) {
    if(confirm("Are you want to remove this image from upload?")) {
      Images.remove(this._id);
    }
  }
});