'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    imdbId: DataTypes.INTEGER,
    tmdbId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    Movie.hasMany(models.Genre,
      {as: 'Genres', foreignKey: 'id', sourceKey: 'movieId'});
    Movie.hasMany(models.Review,
      {as: 'Reviews', foreignKey: 'id', sourceKey: 'movieId'});
    Movie.hasMany(models.DistributionLink,
      {as: 'DistributionLinks', foreignKey: 'id', sourceKey: 'movieId'});
    Movie.hasMany(models.AffiliateCode,
      {as: 'AffiliateCodes', foreignKey: 'id', sourceKey: 'movieId'});
  };
  return Movie;
};