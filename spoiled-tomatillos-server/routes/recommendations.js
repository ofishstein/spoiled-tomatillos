const express = require('express');
const router = express.Router();
const logger = require('../logger');

const db = require('../db/db.js');
const session = db.get_session();
const authCheck = require('./auth');
const adminCheck = require('./adminCheck');

/**
 * Check if the first user is following the second user
 */
function isFollowing(user1, user2, yesCase, noCase) {
  return session.Follower.findOne({
    where: {
      followerId: user1,
      followeeId: user2
    }
  }).then(followObj => {
    followObj === null ? noCase() : yesCase();
  });
}

/**
 * Check if two users are friends
 */
function areFriends(user1, user2, yesCase, noCase) {
  return isFollowing(user1, user2, () => {
    isFollowing(user2, user1, yesCase, noCase);
  },
  noCase);
}

router.get('/:rec_id', function(req, res, next) {
  session.Recommendation.findById(req.params['rec_id'])
    .then(rec => {
      if (rec === null) {
        next();
        return;
      }
      res.send(rec);
    })
    .catch(err => {
      logger.warn('Error getting recommendation by id', error);
      res.sendStatus(500);
    });
});

/**
 * Post recommendations to the database as logged in user
 */
router.post('/', authCheck, function(req, res) {
  let errs = [];
  let recs = req.body.map(rec => {
    rec['recommenderId'] = req.user.id;
    return new Promise(done => {
      areFriends(rec['recommenderId'], rec['recommendeeId'],
        () => {
          session.Recommendation
            .build(rec)
            .save()
            .then(done)
            .catch(error => {
              errs.push({'status': 500, 'err': error});
              done();
            });
        },
        () => {
          logger.warn('Are not friends!')
          errs.push({status: 401, err: 'not friends'});
          done();
        });
    });
  });

  Promise.all(recs).then(() => {
    if (errs.length === 0) {
      res.sendStatus(200);
    }
    else {
      res.sendStatus(errs[0].status);
    }
  });
});


router.delete('/:rec_id', authCheck, function(req, res) {
  session.Recommendation.findById(req.params['rec_id'])
  .then(rec => {
    if (rec === null) {
      res.sendStatus(404);
      return;
    }

    if (req.user.id !== rec.recommenderId && !req.user.isAdmin) {
      res.sendStatus(401);
    } else {
      session.Recommendation.destroy({
        where: {id: req.params['rec_id']}
      })
      .then(() => res.sendStatus(200))
      .catch(error => {
        logger.warn('Error deleting recommendation by id', error);
        res.sendStatus(500);
      });
    }
  });
});


module.exports = router;
// POST METHODS
