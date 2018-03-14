const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

/* GET users listing. */
router.get('/movies', function(req, res) {
  reqStrings = "%" + req.query.q + "%"
  console.log(reqStrings)
  response = {}
  session.Movie
    .findAll({
      where: {
        title: {
          [session.Sequelize.Op.like]: reqStrings
        }
      },
    })
    .then(movies => {
      res.send(movies)
    });
});


router.get('/users', function(req, res) {
  session.User
    .findAll({
      where: {
        [session.Sequelize.Op.or]: {
          username: {
            [session.Sequelize.Op.like]: reqStrings
          },
          email: {
            [session.Sequelize.Op.like]: reqStrings
          }
        }
      }
    })
    .then(users => {
      res.send(users)
    })
});

module.exports = router;
