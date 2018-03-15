const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();


function handleSearch(queries, model, Sequelize, callBack) {
  searchWhere = {where: {[Sequelize.Op.or]: {}}}

  for (var key in queries) {
    searchWhere['where'][Sequelize.Op.or][key] = {
        [Sequelize.Op.like]: '%' + queries[key] + '%'
    };
  }

  model.findAll(searchWhere)
  .then(results => {
    callBack(results);
  });
}

/* GET users listing. */
router.get('/movies', function(req, res) {
  handleSearch(req.query, session.Movie, session.Sequelize, (results) => {
    res.send(results);
  });
});


router.get('/users', function(req, res) {
  handleSearch(req.query, session.User, session.Sequelize, (results) => {
    res.send(results);
  });
});

module.exports = router;
