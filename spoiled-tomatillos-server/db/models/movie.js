'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    imdbId: DataTypes.INTEGER,
    tmdbId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    poster: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    Movie.hasMany(models.Genre,
      {as: 'Genres', sourceKey: 'id', foreignKey: 'movieId'});
    Movie.hasMany(models.Review,
      {as: 'Reviews', sourceKey: 'id', foreignKey: 'movieId'});
    Movie.hasMany(models.DistributionLink,
      {as: 'DistributionLinks', sourceKey: 'id', foreignKey: 'movieId'});
    Movie.hasMany(models.WatchlistItem,
      {as: 'WatchlistItems', sourceKey: 'id', foreignKey: 'movieId'});
    Movie.hasMany(models.AffiliateCode,
      {as: 'AffiliateCodes', sourceKey: 'id', foreignKey: 'movieId'});
  };
  return Movie;
};
