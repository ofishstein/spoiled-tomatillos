const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

const logger = require('../logger');
const utils = require('./utils');

let authCheck = (req, res, next) => {
  if (req.isAuthenticated() && req.user.id === parseInt(req.params['user_id'])) {
    return next();
  } else {
    res.sendStatus(401);
  }
};

router.get('/api/users/:user_id/watchlist', function(req, res) {
  // get a user's watchlist
  session.User.findOne({
    where: {id: req.params['user_id']},
    attributes: ['id', 'username'],
    include: {
      association: 'WatchlistItems',
      attributes: {exclude: ['id', 'userId', 'movieId', 'updatedAt']},
      include: {
        association: 'Movie',
        attributes: ['title', 'id', 'poster']
      }
    }
  })
    .then(watchlistItems => {
      if (watchlistItems) {
        watchlist = Object.assign({}, watchlistItems.toJSON());
        utils.rename(watchlist, 'WatchlistItems', 'watchlist');
        res.json(watchlist);
      } else {
        res.status(404).send({error: 'userId not found'});
      }
    })
    .catch(error => {
      logger.error(error);
      res.sendStatus(500);
    });
});

// POST METHODS
router.post('/api/users/:user_id/watchlist', authCheck, function(req, res) {
  // Create a watchlist for the logged in user
  session.WatchlistItem
    .build({
      userId: req.user.id,
      movieId: req.body.movieId
    })
    .save()
    .then((watchlistItem) => {
      res.json(watchlistItem);
    })
    .catch(error => {
      logger.error(error);
      if (error.constructor.name === 'ForeignKeyConstraintError') {
        res.status(400).send({error: 'movieId not found'});
        return;
      }
      res.sendStatus(500);
    });
});

// DELETE METHODS

router.delete('/api/users/:user_id/watchlist', authCheck, function(req, res) {
  // delete a movie from user's watchlist
  session.WatchlistItem
    .destroy({
      where: {
        movieId: req.body.movieId,
        userId: req.user.id
      }
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      logger.error(error);
      res.sendStatus(500);
    });
});


module.exports = router;
