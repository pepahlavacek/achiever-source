Template.comment.events({
  'click .delete': function(event) {
    if(confirm("Are you want to delete this comment?")) {
      Comments.remove({ _id: this._id });
    }
  }
});