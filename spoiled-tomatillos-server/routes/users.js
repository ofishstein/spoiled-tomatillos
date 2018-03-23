const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const authCheck = require('./auth');

/* GET user.
 * Return the profile information for the user at the given id.*/
router.get('/', authCheck, function(req, res) {
  // TODO handle searching here.
});

router.get('/settings', authCheck, function(req, res) {
  let u = req.user.get({plain: true});
  delete u.password;
  res.send(u);
});


router.get('/:user_id', authCheck, function(req, res) {
  session.User
    .findAll({
      where: {id: req.params['user_id']},
      include: ['Reviews',
                'ReviewComments',
                'Watchlists',
                'WatchlistComments',
                'RecommendationsSent',
                'RecommendationsReceived']
    })
    .then(profile => {
      res.send(profile);
    });

});

router.get('/:user_id/following', authCheck, function(req, res) {
  // TODO: Get users that the user at the id follows
});

router.get('/:user_id/followers', authCheck, function(req, res) {
  // TODO: Get users that the user at the id is followed by
});

router.get('/:user_id/is-following', authCheck, function(req, res) {
  // TODO: Is the logged in user following the user at the given ID.
});

router.get('/:user_id/watchlists', authCheck, function(req, res) {
  // TODO: Get users watchlist
});

router.get('/:user_id/reviews', authCheck, function(req, res) {
  // TODO: Get users reviews
});




/* PUT user */
router.put('/:user_id', authCheck, function(req, res) {
  delete req.body.password;
  req.user.update(req.body).then(() => {
    res.sendStatus(200);
  });
});

router.put('/settings', authCheck, function(req, res) {
  //TODO: Handle putting user settings.
});

router.put('/:user_id/follow', authCheck, function(req, res) {
  //TODO: Current logged in user follows user at user_id
});

router.put('/:user_id/unfollow', authCheck, function(req, res) {
  //TODO: Current logged in user unfollows user at user_id
});

router.delete('/:user_id'. authCheck, function(req, res) {
  // TODO: delete the user iff user_id == logged in user or logged in user is admin
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
