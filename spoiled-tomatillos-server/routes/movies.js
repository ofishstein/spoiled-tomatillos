const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const utils = require('./utils.js');
const omdb = require('./omdb.service');

// GET METHODS
// Handle searching for movies
router.get('/', authCheck, function(req, res) {
  utils.handleSearch(req.query, session.Movie, session, (result) => {
    res.send(result);
  });
});

// Helper function for removing extra information from movies
function reformatMovie(movie) {
  movieObj = Object.assign({}, movie.toJSON());
  utils.rename(movieObj, 'Reviews', 'reviews');
  movieObj['reviews'].forEach(reviewObj => {
    utils.rename(reviewObj, 'User', 'user');
  });
  return movieObj;
}

// Helper for making OMDb API calls
function expandWithApi(movieObj) {
 // console.log(omdb.getMovieById(movieObj['tmdbId']));
  return movieObj;
}

// Helper for adding in user info
function expandWithUser(movieObj, user, session, done) {
  if (user == undefined) {
    movieObj['inWatchlist'] = false;
    done(true);
  }
  else {
    session.WatchlistItem.findOne({
      where: {
        userId: user.id,
        movieId: movieObj.id
      }
    }).then(found => {
      movieObj['inWatchlist'] = found !== null;
      done(true);
    })
    .catch(error => {
      console.log(error);
      done(false);
    });
  }
}

/* GET users listing. */
router.get('/:movie_id', function(req, res) {
  session.Movie
    .findAll({
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
      }]
    })
    .then(movie => {
      let movieInfo = [];
      movie.forEach(movie => {
        let movieObj = reformatMovie(movie);
        expandWithApi(movieObj);
        expandWithUser(movieObj, req.user, session, (success) => {
          if (success) {
            movieInfo.push(movieObj);
          }
          else {
            res.sendStatus(500);
            return;
          }
        });
      });
      res.send(movieInfo);
    });
});

router.get('/:movie_id/reviews', authCheck, function(req, res) {
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
  review = req.body // TODO: Validate fields
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
    session.Watchlist.findOrCreate({
      where: {
        userId: req.user.id,
        name: req.user.firstName + "'s Watchlist"
      }
    })
    .spread((watchlist, created) => {
      session.WatchlistItem.build({
        watchlistId: watchlist.id,
        movieId: req.params['movie_id']})
      .save()
      .then(() => { res.sendStatus(200); })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);

      });
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
