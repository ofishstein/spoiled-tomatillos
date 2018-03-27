const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const search = require('search.js')

// GET METHODS
// Handle searching for movies
router.get('/', authCheck, function(req, res) {
  handleSearch(req.query, session.Movie, session, (result) => {
    res.send(result);
  });
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
  session.Review
    .findAll({
      where: {movieId: req.params['movie_id']}
      include: ['Comments']
    })
    .then(reviews => {
      res.send(reviews);
   });
});

// POST METHODS

router.post('/', authCheck, function(req, res) {
  // TODO: check they are admin
  // TODO: validate body
  session.Movie
    .build(req.body)
    .save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(500);
    });
});

router.post('/:movie_id/review', authCheck, function(req, res) {
  session.Review
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

router.post('/:movie_id/add-to-watchlist', authCheck, function(req, res) {
    session.Watchlist.findOrCreate({
      where: {
        userId: req.user.id
      }
    })
    .then(watchlist => {
      session.WatchlistItem.build({
        watchlistId: watchlist.id,
        movieId: req.params['movie_id']});
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

// PUT METHODS

router.put('/:movie_id', authCheck, function(req, res) {
    // TODO: validate body and movie id
    session.Movie.update(
        req.body,
        { where: {id: req.params['movie_id']} }
    )
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

// DELETE METHODS

router.delete('/:movie_id', authCheck, function(req, res) {
    //TODO: Authenticate is admin
  session.Movie
    .destroy({
      where: {
        id: req.params['movie_id']
      }
    })
    .then(() => {
      res.sendStatus(200);
    });
});


module.exports = router;
