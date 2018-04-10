'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    seen: {
      allowNull: true,
      type: DataTypes.DATE
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('FOLLOWER', 'RECOMMENDATION')
    }
  }, {});
  Notification.associate = function(models) {
    Notification.belongsTo(models.User,
      {sourceKey: 'id', foreignKey: 'userId', as: 'User'});
    Notification.belongsTo(models.Follower,
      {sourceKey: 'id', foreignKey: 'followshipId', as: 'Follower'});
    Notification.belongsTo(models.Recommendation,
      {sourceKey: 'id', foreignKey: 'recommendationId', as: 'Recommendation'});
  };
  return Notification;
};
