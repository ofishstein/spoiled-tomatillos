const express = require('express');
const router = express.Router();

const User = require('../db/model/User');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res) {
// you can also build, save and access the object with chaining:
  User
  .build(req.params.user)
  .save()
  .then(() => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log(error)
    res.sendStatus(500);
  })
});

module.exports = router;
