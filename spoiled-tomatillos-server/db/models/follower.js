'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {}, {});
  Follower.associate = function(models) {
    Follower.belongsTo(models.User,
      {as: 'FollowerUser', foreignKey: 'id', sourceKey: 'followerId'});
    Follower.belongsTo(models.User,
      {as: 'FolloweeUser', foreignKey: 'id', sourceKey: 'followeeId'});
  };
  return Follower;
};
