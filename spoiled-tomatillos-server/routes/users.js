const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const op = session.Sequelize.Op;

const authCheck = require('./auth');
const adminCheck = require('./adminCheck');
const omdb = require('./omdb.service');
const utils = require('./utils.js');

// search for users with given 'q'
router.get('/', function(req, res) {
  utils.handleSearch(req.query, session.User, session, results => {
    results.forEach(result => {
      delete result['password'];
    });
    res.send(results);
  })
});

router.get('/settings', authCheck, function(req, res) {
  session.User.findOne({
    where: {id: req.user.id}
  })
    .then(user => {
      delete user.password;
      res.json(user);
    });
});


//Helper function for shaping the data returned by the query
function reformatProfile(profile) {
  profileInfo = Object.assign({}, profile.toJSON());
  utils.rename(profileInfo, 'Followers', 'followers');
  utils.rename(profileInfo, 'Followees', 'following');
  utils.rename(profileInfo, 'Reviews', 'reviews');
  utils.rename(profileInfo, 'WatchlistItems', 'watchlist');
  // ... Make activity feed
  profileInfo['activities'] = [];
  profileInfo['activities'] = profileInfo['activities'].concat(profileInfo['reviews']);
  profileInfo['activities'].forEach(item => {
    item['type'] = 'review';
  });
  ['ReviewComments', 'WatchlistCommentsSent', 'WatchlistCommentsReceived', 'RecommendationsSent', 'RecommendationsReceived'].forEach(key => {
    profileInfo[key].forEach(item => {item['type'] = key});
    utils.aggAndRemove(profileInfo, 'activities', key);
  });
  console.log(profileInfo['activities'])
  utils.mostRecentN(profileInfo, 'activities', 10);

  return profileInfo;
}

router.get('/:user_id', function(req, res) {
  session.User
    .findOne({
      where: {id: req.params['user_id']},
      attributes: {'exclude': ['password', 'movieId']},
      include: [
        {
          model: session.Review,
          as: 'Reviews',
          include: {
            model: session.Movie,
            as: 'Movie',
            attributes: ['title', 'id']
          }
        },
        'ReviewComments',
        {
          model: session.WatchlistItem,
          as: 'WatchlistItems',
          attributes: {
            exclude: ['id', 'userId']
          },
          include: {
            model: session.Movie,
            as: 'Movie',
            attributes: ['title', 'id', 'poster']
          }
        },
        'WatchlistCommentsSent',
        'WatchlistCommentsReceived',
        'RecommendationsSent',
        'RecommendationsReceived',
        'Followers',
        'Followees']
    })
    .then(profile => {
      res.send(reformatProfile(profile));
    });
});

router.get('/:user_id/following', function(req, res) {
  // Get users that the user at the id follows
  session.Follower
    .findAll({
      where: {followerUserId: req.params['user_id']},
      include: {
        model: session.User,
        as: 'FolloweeUser',
        attributes: ['id', 'username', 'profileImageUrl']

      }
    })
    .then(following => {
      res.json(following);
    });
});


router.get('/:user_id/followers', function(req, res) {
  // Get users that the user at the id is followed by
  session.Follower.findAll({
    where: {followeeUserId: req.params['user_id']},
    include: {
      model: session.User,
      as: 'FollowerUser',
      attributes: ['id', 'username', 'profileImageUrl']

    }
  })
    .then(followers => {
      res.json(followers);
    });
});

router.get('/:user_id/is-following', function(req, res) {
  // Is the logged in user following the user at the given ID.
  if (req.isAuthenticated()) {
    session.Follower
      .findOne({
        where: {
          followerUserId: req.user.id,
          followeeUserId: req.params['user_id']
        }
      })
      .then(isFollowing => {
        if (isFollowing) {
          res.json(true);
        } else {
          res.json(false);
        }
      })
  } else {
    res.json(false);
  }
});

router.get('/:user_id/watchlist', function(req, res) {
  // Get users watchlist
  session.WatchlistItems.findAll({
    where: {userId: req.params['user_id']},
    include: ['Movie']
  })
    .then(watchlist => {
      watchlist.forEach(movie => {
        if (movie['poster'] === null) {
          movie['poster'] = omdb.getPosterById(movie['imdbId']);
        }
      });
      res.json(watchlist);
    });
});

router.get('/:user_id/reviews', function(req, res) {
  // Get user's reviews
  session.Review.findAll({
    where: {userId: req.params['user_id']},
    include: ['Movie']
  })
    .then(reviews => {
      reviews.forEach(review => {
        if (review['Movie']['poster'] === null) {
          review['Movie']['poster'] = omdb.getPosterById(review['Movie']['imdbId']);
        }
      });
      res.json(reviews);
    });
});

router.put('/settings', authCheck, function(req, res) {
  // Handle putting user settings.
  session.User.update(req.body, {
    where: { id: req.user.id }
  })
    .then(updated => {
      if (updated === 0) {
        res.sendStatus(500);
      } else {
        session.User.findOne({
          where: {id: req.user.id}
        })
          .then(user => {
            delete user.password;
            res.json(user);
          });
      }
    });
});

router.put('/:user_id/follow', authCheck, function(req, res) {
  // Current logged in user follows user at user_id
  // sends updated is-following status
  if (req.body.follow) {
    session.Follower.findOrCreate({
      where: {
        followerUserId: req.user.id,
        followeeUserId: req.params['user_id']
      }
    }).spread((follower, created) => {
      res.json(true);
    });
  } else {
    session.Follower.destroy({
      where: {
        followerUserId: req.user.id,
        followeeUserId: req.params['user_id']
      }
    }).then(() => {
      res.json(false);
    });
  }
});

router.delete('/:user_id', authCheck, function(req, res) {
  // delete the user iff user_id == logged in user or logged in user is admin
  if (req.user.id !== req.params['user_id'] && !req.user.isAdmin) {
    res.sendStatus(401);
  } else {
    session.User.destroy({
      where: {id: req.params['user_id']}
    })
      .then(() => {
        res.sendStatus(200);
      });
  }
});


// Post a user to the db. Admin only
router.post('/', adminCheck, function(req, res) {
// you can also build, save and access the object with chaining:
  session.User
    .build(req.body)
    .save()
    .then((newUser) => {
      res.json(newUser);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
