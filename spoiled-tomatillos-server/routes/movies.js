const express = require('express');
const router = express.Router();

const db = require('../db/db.js')
const session = db.get_session()

/* GET users listing. */
router.get('/:movie_id', function(req, res) {
  session.movies
    .findAll({
      where: {id: req.params['movie_id']},
      include: [{model: session.reviews}]
    })
    .then(movie => {
      res.send(movie)
    })

});

module.exports = router;
