const express = require('express');
const router = express.Router();
const logger = require('../logger');

const db = require('../db/db.js');
const session = db.get_session();
const authCheck = require('./auth');

// Get all notifications for logged in user
router.get('/', authCheck, (req, res) => {
  session.FollowerNotification
    .count({
      where: {userId: req.user.id, seen: null}
    })
    .then((followerUnseen) => {
      session.RecommendationNotification
        .count({
          where: {userId: req.user.id, seen: null}
        })
        .then((recUnseen) => {
          session.FollowerNotification
            .findAll({
              where: {userId: req.user.id},
              attributes: {exclude: ['userId', 'updatedAt']},
              include:
                {
                  association: 'Follower',
                  attributes: ['followerId'],
                  include: {
                    association: 'FollowerUser',
                    attributes: ['id', 'username', 'profileImageUrl']
                  }
                }
            })
            .then((fNotifications) => {
              session.RecommendationNotification
                .findAll({
                  where: {userId: req.user.id},
                  attributes: {exclude: ['userId', 'updatedAt']},
                  include:
                    {
                      association: 'Recommendation',
                      attributes: ['message'],
                      include: [
                        {
                          association: 'Recommender',
                          attributes: ['id', 'username', 'profileImageUrl']
                        },
                        {
                          association: 'Movie',
                          attributes: ['id', 'title', 'poster']
                        }
                      ]
                    }
                })
                .then((rNotifications) => {
                  response = {notifications: fNotifications.concat(rNotifications)};
                  response['unseenCount'] = followerUnseen + recUnseen;

                  const fNotifIds = fNotifications.map((notif) => notif.id);
                  const rNotifIds = rNotifications.map((notif) => notif.id);

                  session.FollowerNotification
                    .update(
                      {seen: session.Sequelize.fn('NOW')},
                      {
                        where: {
                          id: {
                            [session.Sequelize.Op.in]: fNotifIds
                          }
                        }
                      })
                    .then(fUpdated => {
                      if (fUpdated.toString() !== fNotifIds.length.toString()) {
                        logger.warn('Not all follower notifications updated to seen');
                      }
                      session.RecommendationNotification
                        .update(
                          {seen: session.Sequelize.fn('NOW')},
                          {
                            where: {
                              id: {
                                [session.Sequelize.Op.in]: rNotifIds
                              }
                            }
                          })
                        .then(rUpdated => {
                          if (rUpdated.toString() !== rNotifIds.length.toString()) {
                            logger.warn('Not all recommendation notifications updated to seen');
                          }
                        })
                        .then(() => {
                          res.json(response);
                        });
                    });
                });
            });
        });
    });
});

// get the total number of unseen notifications for the current user
router.get('/unseenCount', authCheck, function(req, res) {
  session.FollowerNotification
    .count({
      where: {userId: req.user.id, seen: null}
    })
    .then((followerUnseen) => {
      session.RecommendationNotification
        .count({
          where: {userId: req.user.id, seen: null}
        })
        .then((recUnseen) => {
          res.json(followerUnseen+recUnseen);
        });
    });
});

module.exports = router;