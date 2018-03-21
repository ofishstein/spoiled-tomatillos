const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const authCheck = require('./auth');

/* GET user. */
router.get('/me', authCheck, function(req, res) {
  let u = req.user.get({plain: true});
  delete u.password;
  res.send(u);
});

/* PUT user */
router.put('/me', authCheck, function(req, res) {
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

router.get('/is-logged-in', function(req, res) {
  if (req.isAuthenticated()) {
    var response = req.user;
    response.loggedIn = true;
    res.json(response);
  } else {
    res.json({loggedIn: false});
    //   var respons = {username: 'test', isAdmin: true, loggedIn: true};
    //   res.json(respons);
  }
});

module.exports = router;
