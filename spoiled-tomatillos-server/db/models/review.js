'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: DataTypes.STRING,
    rating: DataTypes.DOUBLE
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, {foreignKey: 'id', sourceKey: 'userId'});
    Review.belongsTo(models.Movie, {foreignKey: 'id', sourceKey: 'movieId'});
    Review.hasMany(models.ReviewComment,
      {as: 'Comments', sourceKey: 'id', foreignKey: 'reviewId'});
  };
  return Review;
};