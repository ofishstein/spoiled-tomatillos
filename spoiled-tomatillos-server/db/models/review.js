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
        sequelize.models.Review
          .findAndCountAll({
            where: { movieId: review.movieId },
            attributes: ['rating']
          })
          .then(result => {
            let total = 0;
            result.rows.forEach(r => {
              total += r.rating;
            });
            const average = total / result.count;

            sequelize.models.Movie
              .update({ rating: average },
                {
                  where: { id: review.movieId }
                })
              .then(updated => {})
              .catch(err => {
                logger.warn('Error updating average movie rating', err);
              });
          });
      },
      afterDestroy: (review, options) => {
        sequelize.models.Review
          .findAndCountAll({
            where: { movieId: review.movieId },
            attributes: ['rating']
          })
          .then(result => {
            let total = 0;
            result.rows.forEach(r => {
              total += r.rating;
            });
            const average = total / result.count;

            sequelize.models.Movie
              .update({ rating: average },
                {
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
