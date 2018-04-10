const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();
const authCheck = require('./auth');

// Get all notifications for logged in user
router.get('/', authCheck, (req, res) => {
  session.Notification
    .count({
      where: {
        userId: req.user.id,
        seen: null
      }
    })
    .then((unseenCount) => {
      session.Notification.findAll({
        where: {
          userId: req.user.id
        },
        include: [
          {
            association: 'Follower',
            attributes: ['followerId'],
            include: {
              association: 'FollowerUser',
              attributes: ['id', 'username', 'profileImageUrl']
            }
          },
          {
            association: 'Recommendation',
            attributes: ['id', 'message'],
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
        ]
      })
        .then((notifications) => {
          const response = {unseenCount: unseenCount, notifications: notifications};
          res.json(response);
        });
    });
});

module.exports = router;