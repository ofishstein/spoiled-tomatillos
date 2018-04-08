const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const utils = require('./utils.js');
const authCheck = require('./auth');

// GET METHODS
// Handle searching for movies
router.get('/', function(req, res) {
  utils.handleSearch(req.query, session.Movie, session, (result) => {
    res.send(result);
  });
});

// Helper function for removing extra information from movies
function reformatMovie(movie) {
  let movieObj = Object.assign({}, movie.toJSON());
  utils.rename(movieObj, 'Reviews', 'reviews');
  movieObj['reviews'].forEach(reviewObj => {
    utils.rename(reviewObj, 'User', 'user');
  });
  return movieObj;
}

/* GET users listing. */
router.get('/:movie_id', function(req, res, next) {
  session.Movie
    .findOne({
      where: {id: req.params['movie_id']},
      include: [{
        model: session.Review,
        as: 'Reviews',
        attributes: {'exclude': ['userId', 'flagged']},
        include: [{
          model: session.User,
          as: 'User',
          attributes: ['id', 'username', 'profileImageUrl']
        }]
      }],
      omdb: true
    })
    .then(movie => {
      if (!movie) {
        // Movie does not exist
        next(); // Pass to 404 route
        return; // End this route
      }
      if (req.user) {
        // User is logged in, check if movie in user's watchlist
        session.WatchlistItem.count({where: {userId: req.user.id, movieId: movie.id}})
          .then(count => {
            if (count) {
              console.log('Movie in watchlist');
              movie.set('inWatchlist', true);
            }
            else {
              console.log('Movie not in watchlist');
              movie.set('inWatchlist', false);
            }
            res.send(reformatMovie(movie));
          });
      }
      else {
        console.log('User not logged in');
        movie.set('inWatchlist', false);
        res.send(reformatMovie(movie));
      }
    });
});

router.get('/:movie_id/reviews', function(req, res) {
  session.Review
    .findAll({
      where: {movieId: req.params['movie_id']},
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
  review = req.body; // TODO: Validate fields
  review['movieId'] = req.params['movie_id'];
  review['userId'] = req.user.id;
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
  session.WatchlistItem.create({
    userId: req.user.id,
    movieId: req.params['movie_id']
  })
    .then(() => { res.sendStatus(200); })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.post('/:movie_id/remove-from-watchlist', authCheck, function(req, res) {
  session.WatchlistItem.destroy({
    where: {
      userId: req.user.id,
      movieId: req.params['movie_id']
    }
  })
    .then(() => { res.sendStatus(200); })
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
