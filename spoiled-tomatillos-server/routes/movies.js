const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const utils = require('./utils.js');
const logger = require('../logger');
const authCheck = require('./auth');
const adminCheck = require('./adminCheck');

// GET METHODS
// Handle searching for movies
router.get('/', function(req, res) {
  utils.handleSearch(req.query, session.Movie, session, (result) => {
    res.send(result);
  },
  (error, status) /* istanbul ignore next */ => {
    logger.warn('Movie search lookup failed', error);
    res.sendStatus(status);
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
      //console.log(req.user);
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

router.post('/', adminCheck, function(req, res) {
  session.Movie
    .build(req.body)
    .save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      if (error instanceof session.Sequelize.DatabaseError) {
        // Invalid movie body
        logger.warn('Admin attempted to post invalid movie object', error);
        res.sendStatus(400);
        res.end();
      } /* istanbul ignore else */ else {
        // DB error
        logger.warn('DB Error attempting to post new movie', error);
        res.sendStatus(500);
      }
    });
});

router.post('/:movie_id/review', authCheck, function(req, res) {
  let review = req.body;
  review['movieId'] = req.params['movie_id'];
  review['userId'] = req.user.id;
  session.Review
    .build(req.body)
    .save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      if (error instanceof session.Sequelize.DatabaseError) {
        // Invalid review body
        logger.warn('User attempted to post invalid review', error);
        res.sendStatus(400);
      } /* istanbul ignore else */ else {
        // DB error
        logger.warn('DB Error attempting to post new movie', error);
        res.sendStatus(500);
      }
    });
});

// PUT METHODS

router.put('/:movie_id', adminCheck, function(req, res) {
  session.Movie.update(
    req.body,
    { where: {id: req.params['movie_id']} }
  )
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      if (error instanceof session.Sequelize.DatabaseError) {
        // Invalid movie
        logger.warn('Admin attempted to PUT invalid movie', error);
        res.sendStatus(400);
      } /* istanbul ignore else */ else {
        // DB error
        logger.warn('DB Error attempting to post new movie', error);
        res.sendStatus(500);
      }
    });
});

// DELETE METHODS

router.delete('/:movie_id', adminCheck, function(req, res) {
  session.Movie
    .destroy({
      where: {
        id: req.params['movie_id']
      }
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(/* istanbul ignore next */ error => {
      logger.warn('DB error', error);
      res.sendStatus(500);
    });
});


module.exports = router;
