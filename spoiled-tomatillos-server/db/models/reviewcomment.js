'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReviewComment = sequelize.define('ReviewComment', {
    text: DataTypes.STRING
  }, {});
  ReviewComment.associate = function(models) {
    ReviewComment.belongsTo(models.User,
      {foreignKey: 'id', sourceKey: 'commenterId'});
    ReviewComment.belongsTo(models.Review,
      {foreignKey: 'id', sourceKey: 'reviewId'});
  };
  return ReviewComment;
};