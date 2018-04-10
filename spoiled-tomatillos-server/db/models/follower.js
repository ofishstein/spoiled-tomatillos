'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {}, {
    hooks:
      {
        afterCreate: (followship, options) => {
          sequelize.models.Notification
            .findOrCreate({
              where: {
                type: 'FOLLOWER',
                userId: followship.followeeId,
                seen: null,
                recommendationId: null,
                followshipId: followship.id
              }
            })
            .then(() => {});
        }
      }
  });
  Follower.associate = function(models) {
    Follower.belongsTo(models.User,
      {as: 'FollowerUser', foreignKey: 'followerId', sourceKey: 'id'});
    Follower.belongsTo(models.User,
      {as: 'FolloweeUser', foreignKey: 'followeeId', sourceKey: 'id'});
  };
  return Follower;
};
