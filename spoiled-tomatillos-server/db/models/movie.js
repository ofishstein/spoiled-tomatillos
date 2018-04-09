'use strict';

const omdb = require('../../services/omdb.service');
const logger = require('../../logger');

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    imdbId: DataTypes.INTEGER,
    tmdbId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    poster: DataTypes.STRING,
    Title: DataTypes.VIRTUAL,
    Year: DataTypes.VIRTUAL,
    Rated: DataTypes.VIRTUAL,
    Released: DataTypes.VIRTUAL,
    Runtime: DataTypes.VIRTUAL,
    Genre: DataTypes.VIRTUAL,
    Director: DataTypes.VIRTUAL,
    Writer: DataTypes.VIRTUAL,
    Actors: DataTypes.VIRTUAL,
    Plot: DataTypes.VIRTUAL,
    Language: DataTypes.VIRTUAL,
    Country: DataTypes.VIRTUAL,
    Awards: DataTypes.VIRTUAL,
    Ratings: DataTypes.VIRTUAL,
    BoxOffice: DataTypes.VIRTUAL,
    Production: DataTypes.VIRTUAL,
    Website: DataTypes.VIRTUAL,
    inWatchlist: DataTypes.VIRTUAL
  }, {
    hooks: {
      afterFind: (movie, options) => {
        if (!movie) {
          // No changes to movie object
          return;
        }
        if (options['poster']) {
          if (movie['poster']) {
            // Poster already in db, no changes to movie object
            return;
          }
          else {
            return omdb.getPosterById(movie.imdbId).then((body) => {
              return movie.update({...movie, poster: body['Poster']}, {where: {id: movie.id}})
                .then(() => {
                  // Update movie object with added poster info
                  movie.set('poster', body['Poster']);
                })
                .catch((err) => {
                  logger.warn('Movie poster update failed', err);
                });
            })
              .catch((err) => {
                logger.warn('Error getting movie poster from omdb', err);
              });
          }
        }
        if (options['omdb']) {
          return omdb.getMovieById(movie.imdbId).then((body) => {
            if (movie.get('poster')) {
              movie.set(body);
              return;
            }
            return movie.update({...movie, poster: body['Poster']}).then(() => {
              // Updated movie in db
              movie.set(body);
            })
              .catch((err) => {
                logger.warn('Movie poster update failed on getMovieById', err);
              });
          })
            .catch((err) => {
              logger.warn('Error getting movie info from omdb', err);
            });
        }
      }
    }
  });
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
