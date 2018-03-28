'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: DataTypes.STRING,
    rating: DataTypes.DOUBLE,
    flagged: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, {as: 'User', sourceKey: 'id', foreignKey: 'userId'});
    Review.belongsTo(models.Movie, {as: 'Movie', sourceKey: 'id', foreignKey: 'movieId'});
    Review.hasMany(models.ReviewComment,
      {as: 'Comments', sourceKey: 'id', foreignKey: 'reviewId'});
  };
  return Review;
};
