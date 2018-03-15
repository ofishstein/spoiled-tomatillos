const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const authCheck = require('./auth');

router.get('/', authCheck, function(req, res) {
  let user = req.user;
  let body = user.get({plain: true});
  delete body.password;

  user.getReviews().then((reviews) => {
    user.getPlaylists().then((playlists) => {
      body.reviews = reviews;
      body.playlists = playlists;
      res.status(200).send(body);
    });
  });
});

router.get('/:userId', authCheck, function(req, res) {
  session.User
    .findOne({
      where: {id: req.params['userId']},
      include: ['Reviews', 'Playlists']
    })
    .then((user) => {
      let body = user.get({plain: true});
      delete body.password;
      res.status(200).send(body);
    });
});

module.exports = router;