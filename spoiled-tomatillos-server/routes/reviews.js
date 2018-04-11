const express = require('express');
const router = express.Router();
const logger = require('../logger');

const db = require('../db/db.js');
const session = db.get_session();
const authCheck = require('./auth');
const adminCheck = require('./adminCheck');

// GET METHODS
router.get('/:review_id', function(req, res, next) {
  session.Review.findById(req.params['review_id'])
    .then(review => {
      if (review === null) {
        next();
        return;
      }
      res.send(review);
    })
    .catch(/* istanbul ignore next */ error => {
      logger.warn('Error getting review by id', error);
      res.sendStatus(500);
    });
});

// POST METHODS
router.post('/:review_id/flag', authCheck, function(req, res) {
  // TODO: 404 if review id doesn't exist
  session.Review.findById(req.params['review_id'])
    .then(review => {
      review.update({flagged: true})
        .then(() => { res.sendStatus(200); })
        .catch(/* istanbul ignore next */ error => {
          logger.warn('Error flagging (POST) review by id', error);
          res.sendStatus(500);
        });
    });
});

router.post('/:review_id/unflag', adminCheck, function(req, res) {
  // TODO: 404 if review id doesn't exist
  session.Review.findById(req.params['review_id'])
    .then(review => {
      review.update({flagged: false})
        .then(() => { res.sendStatus(200); })
        .catch(/* istanbul ignore next */ error => {
          logger.warn('Error flagging review (POST) by id', error);
          res.sendStatus(500);
        });
    });
});

// PUT METHODS
router.put('/:review_id', authCheck, function(req, res) {
  session.Review.findById(req.params['review_id'])
    .then(review => {
      if (req.user.id !== review.userId && !req.user.isAdmin) {
        logger.info('Unauthenticated user attempted to edit review: id=' + review.id + ', userId=' + req.user.id);
        res.sendStatus(401);
      } else {
        review.update(req.body, {where: {id: review.get('id')}})
          .then(() => { res.send(review.get({plain: true}));})
          .catch(/* istanbul ignore next */ error => {
            logger.warn('Error putting review by id (update)', error);
            res.sendStatus(500);
          });
      }
    })
    .catch(/* istanbul ignore next */ error => {
      logger.warn('Error finding review to PUT by id', error);
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
        review.destroy({
          where: {id: req.params['review_id']}
        })
          .then(() => { res.sendStatus(200); })
          .catch(/* istanbul ignore next */ error => {
            logger.warn('Error deleting review by id (destroy)', error);
            res.sendStatus(500);
          });
      }
    })
    .catch(/* istanbul ignore next */ error => {
      logger.warn('Error deleting review by id', error);
      res.sendStatus(500);
    });
});


module.exports = router;
