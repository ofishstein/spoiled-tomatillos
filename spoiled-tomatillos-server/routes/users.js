const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const authCheck = require('./auth');

/* GET user.
 * Return the profile information for the user at the given id.*/
router.get('/:user_id', function(req, res) {
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

router.get('/:user_id/settings', authCheck, function(req, res) {
  let u = req.user.get({plain: true});
  delete u.password;
  res.send(u);
});


/* PUT user */
router.put('/:user_id', authCheck, function(req, res) {
  delete req.body.password;
  req.user.update(req.body).then(() => {
    res.sendStatus(200);
  });
});

router.post('/create', function(req, res) {
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
