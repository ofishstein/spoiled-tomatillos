const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

// GET METHODS
router.get('/:review_id', function(req, res) {
  session.findById(req.params['review_id'])
    .then(review => {
      res.send(review);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

// POST METHODS
router.post('/:review_id/flag', authCheck, function(req, res) {
  session.Review.findById(req.params['review_id'])
    .then(review => {
      review.update({flagged: true})
      .then(() => { res.sendStatus(200); })
      .catch(error => {
        console.log(error);
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
        console.log(error);
        res.sendStatus(500);
      });
    });
})

// PUT METHODS
router.put('/:review_id', authCheck, function(req, res) {
  session.Review.findById(req.params['review_id'])
    .then(reviews => {
      if (reviews.length == 1) {
        // If there is only one review in the db matching then proceed
        review = reviews[0];
        if (req.user.id !== review.userId && !req.user.isAdmin) {
          res.sendStatus(401);
        } else {
          session.Review.update(res.body)
          .then(() => { res.sendStatus(200); })
          .catch(error => {
            console.log(error);
            res.sendStatus(500);
          });
        }
      } else {
        res.sendStatus(400);
      }
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
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
        console.log(error);
        res.sendStatus(500);
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  })
});


module.exports = router;
