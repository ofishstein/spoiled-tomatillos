const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
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
