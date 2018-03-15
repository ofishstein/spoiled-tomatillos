const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

/* GET user's profile. */
router.get('/me', (req, res, done) => {
  if (req.isAuthenticated()) {
    return done();
  }
  res.status(401).send('User not logged in');
}, function(req, res) {
  res.send(req.user);
});

/* PUT user's profile */
router.put('/me', (req, res, done) => {
  if (req.isAuthenticated()) {
    return done();
  }
  res.status(401).send('User not logged in');
}, function(req, res) {
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
