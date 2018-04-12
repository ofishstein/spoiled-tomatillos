const express = require('express');
const router = express.Router();
const logger = require('../logger');

const db = require('../db/db.js');
const session = db.get_session();
const op = session.Sequelize.Op;

const authCheck = require('./auth');
const adminCheck = require('./adminCheck');
const omdb = require('../services/omdb.service');
const utils = require('./utils.js');

const userNotFound = {error: 'userId not found'};

// search for users with given 'q'
router.get('/', function(req, res) {
  utils.handleSearch(req.query, session.User, session, results => {
    results.forEach(result => {
      delete result['password'];
    });
    res.send(results);
  },
  (error, status) => {
    console.log(error);
    res.sendStatus(status);
 });
});

router.get('/settings', authCheck, function(req, res) {
  session.User.findOne({
    where: {id: req.user.id}
  })
    .then(user => {
      let response = user.get({plain: true});
      delete response.password;
      res.json(response);
    })
    .catch(/* istanbul ignore next */ error => {
      logger.error(error);
      res.sendStatus(500);
    });
});

// Helper function for adding an to the given activity
function addImg(item, key) {
  if (key === 'RecommendationsSent') {
    item['img'] = item['Recommendee']['profileImageUrl'];
  } else {
    item['img'] = item['Recommender']['profileImageUrl'];
  }
}

//Helper function for shaping the data returned by the query
function reformatProfile(profile) {
  let profileInfo = Object.assign({}, profile.toJSON());
  utils.rename(profileInfo, 'Followers', 'followers');
  utils.rename(profileInfo, 'Following', 'following');
  utils.rename(profileInfo, 'Reviews', 'reviews');
  utils.rename(profileInfo, 'WatchlistItems', 'watchlist');
  // ... Make activity feed
  profileInfo['activities'] = [];
  profileInfo['activities'] = profileInfo['activities'].concat(profileInfo['reviews']);
  profileInfo['activities'].forEach(item => {
    item['img'] = item['Movie']['poster']
    item['type'] = 'review'
  });
  ['RecommendationsSent', 'RecommendationsReceived'].forEach(key => {
    profileInfo[key].forEach(item => {
      item['type'] = key;
      addImg(item, key);
    });
    utils.aggAndRemove(profileInfo, 'activities', key);
  });
  console.log(profileInfo['activities']);
  profileInfo['activities'] = utils.mostRecentN(profileInfo, 'activities', 10);

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
            attributes: ['title', 'id', 'poster']
          }
        },
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
        {
          association: 'RecommendationsSent',
          include: {
            association: 'Recommendee',
            attributes: ['profileImageUrl', 'username', 'id']
          }
        },
        {
          association: 'RecommendationsReceived',
          include: {
            association: 'Recommender',
            attributes: ['profileImageUrl', 'username', 'id']
          }
        },
        {
          attributes: ['followerId'],
          association: 'Followers',
          include: {
            association: 'FollowerUser',
            attributes: ['id', 'username', 'profileImageUrl']
          }
        },
        {
          attributes: ['followeeId'],
          association: 'Following',
          include: {
            association: 'FolloweeUser',
            attributes: ['id', 'username', 'profileImageUrl']
          }
        }]
    })
    .then(profile => {
      if (profile) {
        res.send(reformatProfile(profile));
      } else {
        res.status(404).send(userNotFound);
      }
    });
});

router.get('/:user_id/following', function(req, res) {
  // Get users that the user at the id follows
  session.User
    .findOne({
      attributes: ['id', 'username'],
      where: {id: req.params['user_id']},
      include: {
        attributes: ['followeeId'],
        association: 'Following',
        include: {
          association: 'FolloweeUser',
          attributes: ['id', 'username', 'profileImageUrl']
        }
      }
    })
    .then(following => {
      if (following) {
        res.json(following);
      } else {
        res.status(404).send(userNotFound);
      }
    })
    .catch(/* istanbul ignore next */ error => {
      // Only occurs on db error, unable to test
      logger.error(error);
      res.sendStatus(500);
    });
});


router.get('/:user_id/followers', function(req, res) {
  // Get users that the user at the id is followed by
  // {"id":2,"username":"SeedUser2","Followers":[
  // {"followerId":1,"FollowerUser":{"id":1,"username":"SeedUser1","profileImageUrl":"www.google.com"}}]}
  session.User
    .findOne({
      attributes: ['id', 'username'],
      where: {id: req.params['user_id']},
      include: {
        attributes: ['followerId'],
        association: 'Followers',
        include: {
          association: 'FollowerUser',
          attributes: ['id', 'username', 'profileImageUrl']
        }
      }
    })
    .then(followers => {
      if (followers) {
        res.json(followers);
      } else {
        res.status(404).send(userNotFound);
      }
    })
    .catch(/* istanbul ignore next */ error => {
      // Only occurs on db error, unable to test
      logger.error(error);
      res.sendStatus(500);
    });
});

router.get('/:user_id/is-following', function(req, res) {
  // Is the logged in user following the user at the given ID.
  if (req.isAuthenticated()) {
    session.Follower
      .findOne({
        where: {
          followerId: req.user.id,
          followeeId: req.params['user_id']
        }
      })
      .then(isFollowing => {
        if (isFollowing) {
          res.json(true);
        } else {
          res.json(false);
        }
      });
  } else {
    res.sendStatus(401);
  }
});


router.get('/:user_id/reviews', function(req, res) {
  // Get user's reviews
  session.User.findOne({
    attributes: [],
    where: {id: req.params['user_id']},
    include: {
      attributes: ['text', 'rating'],
      association: 'Reviews',
      include: {
        association: 'Movie',
        attributes: ['id', 'title', 'poster']
      }
    }
  })
    .then(reviews => {
      if (reviews) {
        res.json(reviews);
      } else {
        res.status(404).send(userNotFound);
      }
    })
    .catch(/* istanbul ignore next */ error => {
      // Only occurs on db error, unable to test
      logger.error(error);
      res.sendStatus(500);
    });
});


router.put('/settings', authCheck, function(req, res) {
  // Handle putting user settings.

  // don't allow update isAdmin
  if (req.body.isAdmin) {
    delete req.body.isAdmin;
  }

  session.User.findById(req.user.id)
    .then(user => {
      if (!user) /* istanbul ignore next */ {
        logger.error('Settings put failed', req.body);
        res.sendStatus(500);
      } else {
        user.update(req.body)
          .then(updatedUser => {
            let response = updatedUser.get({plain: true});
            delete response.password;
            logger.info('Settings put succeeded', response);
            res.json(response);
          });
      }
    });
});

router.post('/:user_id/follow', authCheck, function(req, res) {
  // Current logged in user follows user at user_id
  // sends updated is-following status
  if (req.body.follow) {
    session.Follower.findOrCreate({
      where: {
        followerId: req.user.id,
        followeeId: req.params['user_id']
      }
    }).spread((follower, created) => {
      res.json(true);
    });
  } else {
    session.Follower.destroy({
      where: {
        followerId: req.user.id,
        followeeId: req.params['user_id']
      }
    }).then(() => {
      res.json(false);
    })
      .catch(/* istanbul ignore next */ error => {
        logger.error(error);
        res.sendStatus(500);
      });
  }
});

router.delete('/:user_id', authCheck, function(req, res) {
  // delete the user iff user_id == logged in user or logged in user is admin
  if (req.user.id !== parseInt(req.params['user_id']) && !req.user.isAdmin) {
    res.sendStatus(401);
  } else {
    session.User.destroy({
      where: {id: req.params['user_id']}
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(/* istanbul ignore next */ error => {
        logger.error(error);
        res.sendStatus(500);
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
      logger.error(error);
      if (error.constructor.name === 'UniqueConstraintError') {
        res.sendStatus(400).send(error);
      } else /* istanbul ignore next */ {
        res.sendStatus(500);
      }
    });
});

module.exports = router;
