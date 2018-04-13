'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {}, {
    hooks:
      {
        afterCreate: (followship, options) => {
          sequelize.models.FollowerNotification
            .findOrCreate({
              where: {
                userId: followship.followeeId,
                seen: null,
                followshipId: followship.id,
                type: 'FOLLOWER'
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
    Follower.hasOne(models.FollowerNotification,
      {as: 'Notification', sourceKey: 'id', foreignKey: 'followshipId'});
  };
  return Follower;
};
