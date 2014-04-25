var assert = require('assert');

suite('Posts', function() {
  test('adds autoValues to post', function(done, server) {
    server.eval(function() {
      Posts.find().observe({
        added: addedNewPost
      });
      function addedNewPost(post) {
        emit('post', post);
      }

      Posts.insert({title: 'Test', team: 'engineering'});

    }).once('post', function(post) {
          assert.equal(post.title, 'Test');
          assert.equal(post.author.username, 'testuser');
          assert.equal(post.likers.length, 0);
          assert.equal(post.likes, 0);
          done();
        });
  });

  test('adds like to post', function(done, server) {
    server.eval(function() {
      Posts.find().observe({
        added: addedNewPost,
        changed: changedPost
      });
      function addedNewPost(post) {
        emit('post', post);
      };
      function changedPost(post) {
        emit('change', post);
      }

      Posts.insert({title: 'Test', team: 'engineering'});
    });

    server.once('post', function(post) {
      server.eval(function(post) {
        Meteor.call("like", post);
      }, post);
    });

    server.once('change', function(post) {
      assert.equal(post.likes, 1);
      assert.equal(post.likers.length, 1);
      done();
    });
  });

  test('passes collection to client', function(done, server, client) {
    server.eval(function() {
      Posts.insert({title: 'Test', team: 'engineering'});
      Posts.insert({title: 'Test 2', team: 'engineering'});
      var collection = Posts.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
          assert.equal(collection.length, 2);
          done();
        });

    client.once('collection', function(collection) {
      assert.equal(Posts.find().fetch().length, 2);
      done();
    });
  });

  test('access granted for approved users', function(done, server, client) {

    server.eval(observeCollection);
    function observeCollection() {
      Posts.find().observe({
        added: function(doc) {
          emit('added', doc);
        }
      });
    }

    server.once('added', function(doc) {
      assert.equal(doc.title, 'hello');
      done();
    });

    client.eval(function() {
      Meteor.user = function() {
        return { _id: '1989', name: 'Test User', approved: true, profile: { fbid: '42', name: 'Test User', username: 'testuser' } };
      }
      Meteor.userId = function() {
        return '1989';
      }

      Posts.insert({title: 'hello', team: 'engineering'});
    });
  });


//  test('access denied for approved users', function(done, server, client) {
//
//    client.eval(function() {
//      Posts.find().observe({
//        removed: function(doc) {
//          emit('remove', doc);
//        }
//      });
//
//      Meteor.user = function() {
//        return { _id: '1990', name: 'Test User 2', approved: false, profile: { fbid: '7', name: 'Test User 2', username: 'testuser2' } };
//      }
//      Meteor.userId = function() {
//        return '1990';
//      }
//
//      Posts.insert({title: 'hello2', team: 'engineering'});
//
//    });
//
//    client.once('remove', function(doc) {
//      assert.equal(doc.title, 'hello2');
//      done();
//    });
//  });

//      Meteor.user = function() {
//        return { _id: '1990', name: 'Test User 2', approved: false, profile: { fbid: '7', name: 'Test User 2', username: 'testuser2' } };
//      }
//      Meteor.userId = function() {
//        return '1990';
//      }

});