const express = require('express');
const router = express.Router();
const logger = require('../logger');

const db = require('../db/db.js');
const session = db.get_session();
const authCheck = require('./auth');

// GET METHODS
router.get('/:review_id', function(req, res) {
  session.Review.findById(req.params['review_id'])
    .then(review => {
      res.send(review);
    })
    .catch(error => {
      logger.warn('Error getting review by id', error);
      res.sendStatus(500);
    });
});

// POST METHODS
router.post('/:review_id/flag', authCheck, function(req, res) {
  session.Review.findById(req.params['review_id'])
    .then(review => {
      review.update({flagged: true})
        .then(() => { res.sendStatus(200); })
        .catch(error => {
          logger.warn('Error flagging (POST) review by id', error);
          res.sendStatus(500);
        });
    });
});

router.post('/:review_id/unflag', authCheck, function(req, res) {
  if (!req.user.isAdmin) {
    res.sendStatus(401);
    return;
  }

  session.Review.findById(req.params['review_id'])
    .then(review => {
      review.update({flagged: false})
        .then(() => { res.sendStatus(200); })
        .catch(error => {
          logger.warn('Error flagging review (POST) by id', error);
          res.sendStatus(500);
        });
    });
});

// PUT METHODS
router.put('/:review_id', authCheck, function(req, res) {
  // TODO: Change to findOne
  session.Review.findById(req.params['review_id'])
    .then(reviews => {
      if (reviews.length === 1) {
        // If there is only one review in the db matching then proceed (id is unique key??)
        const review = reviews[0];
        if (req.user.id !== review.userId && !req.user.isAdmin) {
          res.sendStatus(401);
        } else {
          session.Review.update(res.body)
            .then(() => { res.sendStatus(200); })
            .catch(error => {
              logger.warn('Error putting review by id (update)', error);
              res.sendStatus(500);
            });
        }
      } else {
        res.sendStatus(400);
      }
    })
    .catch(error => {
      logger.warn('Error putting review by id', error);
      res.sendStatus(500);
    });
});

// DELETE METHODS

router.delete('/:review_id', authCheck, function(req, res) {
  session.Review.findById(req.params['review_id'])
    .then(review => {
      if (req.user.id !== review.userId && !req.user.isAdmin) {
        res.sendStatus(401);
      } else {
        session.Review.destroy({
          where: {id: req.params['review_id']}
        })
          .then(() => { res.sendStatus(200); })
          .catch(error => {
            logger.warn('Error deleting review by id (destroy)', error);
            res.sendStatus(500);
          });
      }
    })
    .catch(error => {
      logger.warn('Error deleting review by id', error);
      res.sendStatus(500);
    });
});


module.exports = router;
