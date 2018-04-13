'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecommendationNotification = sequelize.define('RecommendationNotification', {
    seen: {
      allowNull: true,
      type: DataTypes.DATE
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      default: 'RECOMMENDATION'
    }
  }, {});
  RecommendationNotification.associate = function(models) {
    RecommendationNotification.belongsTo(models.User,
      {sourceKey: 'id', foreignKey: 'userId', as: 'User'});
    RecommendationNotification.belongsTo(models.Recommendation,
      {sourceKey: 'id', foreignKey: 'recommendationId', as: 'Recommendation'});
  };
  return RecommendationNotification;
};
