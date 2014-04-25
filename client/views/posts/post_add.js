Template.postAdd.events({
  'click .close': function() {
    Router.clearRegion('lightbox');
  },
  'click .upload': function(e) {
    e.preventDefault();

    var chooser = new Chute.Chooser({
      "steps": [
        "selector"
      ],
      "stepOptions": {
        "selector": {
          "title": "Select Images",
          "next": "Upload",
          "services": [
            "upload",
            "facebook",
            "flickr",
            "google",
            "instagram",
            "skydrive",
            "googledrive",
            "youtube"
          ],
          "captions": "optional"
        }
      },
      "album": "auG1ovgq",
      "client_id": "4f0b30a938ecef2020000003"
    });

    chooser.on('complete', function(response){
      _.each(response.data.media, function(image) {
//        addImage(image);
        Images.insert(image);
      });

      chooser.close();
    });

    chooser.show();
  }
});

AutoForm.hooks({
  insertPostForm: {
    before: {
      "submitPost": function(doc) {
        doc.media = Images.find().fetch();
        return doc;
      }
    },
    onError: function(operation, error, template) {
      console.log('error', operation, error);
    },
    onSuccess: function(operation, result, template) {
      clearImages();
      Router.clearRegion('lightbox');
    }
  }
});

Template.postAdd.helpers({
  images: function() {
    return Images.find();
  }
});


Template.postView.rendered = function() {
  $("html,body").css('overflow', 'hidden');
};

Template.postView.destroyed = function() {
  $("html,body").css('overflow', '');
  Session.set('currentPost', null);
};