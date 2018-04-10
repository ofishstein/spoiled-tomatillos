const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const authCheck = require('./auth');

// Get all notifications for logged in user
router.get('/', authCheck, (req, res) => {
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
          // console.log('\n\nrNOTIFICATION LENGTH: '+rNotifications.length);
          response = {notifications: fNotifications.concat(rNotifications)};
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
                  response['unseenCount'] = followerUnseen+recUnseen;
                  // console.log('\n\nnotifications COUNT = '+response['notifications'].length);
                  res.json(response);
                });
            });
        });
    });
});

module.exports = router;