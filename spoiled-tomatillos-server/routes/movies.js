const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

// GET METHODS
// Handle searching for movies
router.get('/', authCheck, function(req, res) {
 // TODO: handle searching
});

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

router.get('/:movie_id/reviews', authCheck, function(req, res) {
  // TODO: get reviews by movie
});

// POST METHODS

router.post('/', authCheck, function(req, res) {
  // TODO: post a new movie to the db. Must be admin
});

router.post('/:movie_id/review', authCheck, function(req, res) {
 // TODO: Post a new review of the movie at movie_id
});

// PUT METHODS

router.put('/:movie_id', authCheck, function(req, res) {
 // TODO: put a movie to the database at the given id.
});

// DELETE METHODS

router.delete('/:movie_id', authCheck, function(req, res) {
 // TODO: delete a given movie from the db (admin only)
});


module.exports = router;
