const logger = require('../../logger');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: DataTypes.STRING,
    rating: DataTypes.DOUBLE,
    flagged: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  }, {
    hooks: {
      afterCreate: (review, options) => {
        sequelize.models.Movie
          .findOne({
            where: { id: review.movieId },
            attributes: ['rating', 'reviewCount']
          })
          .then(movie => {
            let total = movie.rating * movie.reviewCount;
            total += review.rating;

            sequelize.models.Movie
              .update({
                rating: total / (movie.reviewCount + 1),
                reviewCount: movie.reviewCount + 1
              }, {
                where: { id: review.movieId }
              })
              .then(updated => {})
              .catch(err => {
                logger.warn('Error updating average movie rating', err);
              });
          });
      },
      beforeDestroy: (review, options) => {
        sequelize.models.Movie
          .findOne({
            where: { id: review.movieId },
            attributes: ['rating', 'reviewCount']
          })
          .then(movie => {
            let total = movie.rating * movie.reviewCount;
            total -= review.rating;

            sequelize.models.Movie
              .update({
                rating: total / (movie.reviewCount - 1),
                reviewCount: movie.reviewCount - 1
              }, {
                where: { id: review.movieId }
              })
              .then(updated => {})
              .catch(err => {
                logger.warn('Error updating average movie rating', err);
              });
          });
      }
    }
  });
  Review.associate = function(models) {
    Review.belongsTo(models.User, {as: 'User', sourceKey: 'id', foreignKey: 'userId'});
    Review.belongsTo(models.Movie, {as: 'Movie', sourceKey: 'id', foreignKey: 'movieId'});
    Review.hasMany(models.ReviewComment,
      {as: 'Comments', sourceKey: 'id', foreignKey: 'reviewId'});
  };
  return Review;
};
