'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define('Recommendation', {
    message: DataTypes.STRING
  }, {});
  Recommendation.associate = function(models) {
    Recommendation.belongsTo(models.User,
      {as: 'Recommender', sourceKey: 'id', foreignKey: 'recommenderId'});
    Recommendation.belongsTo(models.User,
      {as: 'Recommendee', sourceKey: 'id', foreignKey: 'recommendeeId'});
    Recommendation.belongsTo(models.Movie,
      {as: 'Movie', sourceKey: 'id', foreignKey: 'movieId'});
  };
  return Recommendation;
};
