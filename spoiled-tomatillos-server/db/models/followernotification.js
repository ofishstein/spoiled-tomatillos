'use strict';
module.exports = (sequelize, DataTypes) => {
  const FollowerNotification = sequelize.define('FollowerNotification', {
    seen: {
      allowNull: true,
      type: DataTypes.DATE
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      default: 'FOLLOWER'
    }
  }, {});
  FollowerNotification.associate = function(models) {
    FollowerNotification.belongsTo(models.User,
      {sourceKey: 'id', foreignKey: 'userId', as: 'User'});
    FollowerNotification.belongsTo(models.Follower,
      {sourceKey: 'id', foreignKey: 'followshipId', as: 'Follower'});
  };
  return FollowerNotification;
};
