'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {}, {});
  Follower.associate = function(models) {
    Follower.belongsTo(models.User,
      {as: 'Follower', foreignKey: 'id', sourceKey: 'followerId'});
    Follower.belongsTo(models.User,
      {as: 'Followee', foreignKey: 'id', sourceKey: 'followeeId'});
  };
  return Follower;
};
