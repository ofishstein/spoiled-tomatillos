const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const op = session.Sequelize.Op;

const authCheck = require('./auth');
const omdb = require('./omdb.service');

// search for users with given 'q'
router.get('/', function(req, res) {
    let keyword = req.query['q'];
    session.User.findAll({
        where: {
            [op.or]: [
                { username: {[op.like]: '%'+keyword+'%'} },
                { firstName: {[op.like]: keyword+'%'} },
                { lastName: {[op.like]: keyword+'%'} },
                { email: {[op.like]: '%'+keyword+'%'} }
            ]
        }
    })
        .then(users => {
            res.json(users);
        });
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


router.get('/:user_id', function(req, res) {
  session.User
    .findOne({
      where: {id: req.params['user_id']},
      include: ['Reviews',
                'ReviewComments',
                'Watchlists',
                'WatchlistComments',
                'RecommendationsSent',
                'RecommendationsReceived']
    })
    .then(profile => {
      delete profile.dataValues.password;

      res.send(profile);
    });
});

router.get('/:user_id/following', function(req, res) {
  // Get users that the user at the id follows
    session.Follower
        .findAll({
            attributes: ['followeeId'],
            where: {followerId: req.params['user_id']},
            include: ['FolloweeUser']
        })
        .then(following => {
            res.json(following);
    });
});


router.get('/:user_id/followers', function(req, res) {
  // Get users that the user at the id is followed by
    session.Follower.findAll({
        attributes: ['followerId'],
        where: {followeeId: req.params['user_id']},
        include: ['FollowerUser']
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
            })
    } else {
        res.json(false);
    }
});

router.get('/:user_id/watchlists', function(req, res) {
    // Get users watchlist
    session.Watchlist.findAll({
        where: {userId: req.params['user_id']},
        include: ['Movie']
    })
        .then(watchlists => {
            // check for any movies in watchlists with imdbId and null poster
            watchlists.forEach(watchlist => {
                watchlist.forEach(movie => {
                    if (movie['poster'] === null) {
                        movie['poster'] = omdb.getPosterById(movie['imdbId']);
                    }
                })
            });
            res.json(watchlists);
        });
});

router.get('/:user_id/reviews', function(req, res) {
    // Get user's reviews
    session.Review.findAll({
        where: {userId: req.params['user_id']},
        include: ['Movie']
    })
        .then(reviews => {
            // check for any movies in watchlists with null poster
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
router.post('/', function(req, res) {
// you can also build, save and access the object with chaining:
  session.User
    .build(req.body)
    .save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
