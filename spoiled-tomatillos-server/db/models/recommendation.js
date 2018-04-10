'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define('Recommendation', {
    message: DataTypes.STRING
  }, {
    hooks:
      {
        afterCreate: (rec, options) => {
          sequelize.models.Notification
            .findOrCreate({
              where: {
                type: 'RECOMMENDATION',
                userId: rec.recommendeeId,
                seen: null,
                recommendationId: rec.id,
                followshipId: null
              }
            })
            .then(() => {});
        }
      }
  });
  Recommendation.associate = function(models) {
    Recommendation.belongsTo(models.User,
      {as: 'Recommender', sourceKey: 'id', foreignKey: 'recommenderId'});
    Recommendation.belongsTo(models.User,
      {as: 'Recommendee', sourceKey: 'id', foreignKey: 'recommendeeId'});
    Recommendation.belongsTo(models.Movie,
      {sourceKey: 'id', foreignKey: 'movieId'});
  };
  return Recommendation;
};
