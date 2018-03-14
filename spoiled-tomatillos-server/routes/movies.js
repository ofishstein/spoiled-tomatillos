const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

/* GET users listing. */
router.get('/:movie_id', function(req, res) {
  session.Movie
    .findAll({
      where: {id: req.params['movie_id']},
      include: ['Reviews']
    })
    .then(movie => {
      res.send(movie);
    });

});

module.exports = router;
