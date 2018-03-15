'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define('Recommendation', {
    message: DataTypes.STRING
  }, {});
  Recommendation.associate = function(models) {
    Recommendation.belongsTo(models.User,
      {as: 'Recommender', foreignKey: 'id', sourceKey: 'recommenderId'});
    Recommendation.belongsTo(models.User,
      {as: 'Recommendee', foreignKey: 'id', sourceKey: 'recommendeeId'});
    Recommendation.belongsTo(models.Movie,
      {foreignKey: 'id', sourceKey: 'movieId'});
  };
  return Recommendation;
};