'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {}, {});
  Follower.associate = function(models) {
    Follower.belongsTo(models.User,
      {as: 'FollowerUser', foreignKey: 'followerId', sourceKey: 'id'});
    Follower.belongsTo(models.User,
      {as: 'FolloweeUser', foreignKey: 'followeeId', sourceKey: 'id'});
  };
  return Follower;
};
